import { NextRequest, NextResponse } from "next/server";
import { createApiClient, errorResponse } from "@/lib/supabase/api-helper";
import { withValidatedRequest } from "@/lib/api/validation-middleware";
import { BattleStartSchema } from "@/lib/validation/schemas";
import { startBattle, processTick } from "@/lib/game/battle-engine";
import type { BattleField } from "@/types/game";

export async function POST(request: NextRequest) {
  return withValidatedRequest(request, BattleStartSchema, async (data) => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);

    const { data: player, error: pErr } = await supabase
      .from("players").select("id, gold, xp, level, highest_wave, highest_field_id, total_battles, total_wins").eq("user_id", user.id).single();
    if (pErr || !player) return errorResponse("Player not found", 404);

    const { data: fieldRaw, error: fErr } = await supabase
      .from("game_battle_fields").select("*").eq("id", data.fieldId).single();
    if (fErr || !fieldRaw) return errorResponse("Field not found", 404);

    const { data: rawUnits } = await supabase
      .from("player_units").select("*, game_units(*)").eq("player_id", player.id);

    const units = (rawUnits || []).map((pu: any) => {
      const gu = pu.game_units || {};
      const lvl = pu.level || 1;
      return {
        id: pu.unit_id,
        unit_id: pu.unit_id,
        name: gu.name || pu.unit_id,
        class: gu.class || "warrior",
        faction: gu.faction || "human",
        rarity: gu.rarity || "common",
        level: lvl,
        xp: pu.xp || 0,
        hp: Math.floor((gu.base_hp || 100) * (1 + lvl * 0.1)),
        attack: Math.floor((gu.base_attack || 10) * (1 + lvl * 0.1)),
        defense: Math.floor((gu.base_defense || 10) * (1 + lvl * 0.1)),
        speed: gu.base_speed || 100,
        isActive: gu.is_active ?? true,
        equipment: {},
        power_rating: Math.floor(((gu.base_hp || 100) * 0.5 + (gu.base_attack || 10) * 2 + (gu.base_defense || 10) * 1.5) * (1 + lvl * 0.1)),
        formation_row: pu.formation_row,
        formation_col: pu.formation_col,
      };
    });

    const front: (any | null)[] = [null, null, null];
    const back: (any | null)[] = [null, null, null];
    (rawUnits || []).forEach((pu: any) => {
      if (pu.formation_row === 0 && pu.formation_col !== null) {
        front[pu.formation_col] = { unit_id: pu.unit_id, row: 0, col: pu.formation_col };
      }
      if (pu.formation_row === 1 && pu.formation_col !== null) {
        back[pu.formation_col] = { unit_id: pu.unit_id, row: 1, col: pu.formation_col };
      }
    });

    const battleField: BattleField = {
      id: String(data.fieldId),
      name: fieldRaw.name,
      description: fieldRaw.description || "",
      difficulty: fieldRaw.difficulty || 1,
      wave_count: fieldRaw.wave_count || 3,
      boss_wave: fieldRaw.boss_wave || 5,
      recommended_power: fieldRaw.recommended_power || 0,
      rewards: fieldRaw.rewards || { gold: 50, xp: 30 },
      is_locked: !!(fieldRaw.is_active === false),
    };

    const state = startBattle(battleField, units, { front, back });

    while (state.status === "active") {
      processTick(state);
    }

    const goldGained = state.rewards.gold || Math.floor(state.currentWave * 10);
    const xpGained = state.rewards.xp || Math.floor(state.currentWave * 8);
    const isWin = state.status === "victory";
    const unitsSurvived = state.playerUnits.filter(u => u.isAlive).map(u => u.unit_id);

    const { error: uErr } = await supabase.from("players").update({
      gold: player.gold + goldGained,
      xp: player.xp + xpGained,
      total_battles: player.total_battles + 1,
      total_wins: isWin ? player.total_wins + 1 : player.total_wins,
      highest_wave: Math.max(player.highest_wave || 0, state.currentWave),
      highest_field_id: Math.max(player.highest_field_id || 0, Number(data.fieldId) || 0),
    }).eq("id", player.id);
    if (uErr) return errorResponse(uErr.message, 500);

    const { error: lErr } = await supabase.from("battle_logs").insert({
      player_id: player.id,
      battle_type: "campaign",
      field_id: Number(data.fieldId),
      result: state.status,
      waves_cleared: state.currentWave,
      formation: {},
      rewards: { gold: goldGained, xp: xpGained },
      created_at: new Date().toISOString(),
    });
    if (lErr) return errorResponse(lErr.message, 500);

    return NextResponse.json({
      status: state.status,
      currentWave: state.currentWave,
      totalWaves: state.totalWaves,
      turn: state.turn,
      log: state.log,
      xpGained,
      goldGained,
      unitsSurvived,
      leveledUp: false,
      newLevel: player.level,
      progress: { xp: player.xp + xpGained, needed: 100, pct: 0 },
    });
  });
}


