import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { startBattle, processTick } from "@/lib/game/battle-engine";
import { calculateLevel } from "@/lib/game/leveling";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    const { fieldId } = await request.json();
    const { data: field, error: fieldError } = await supabase.from("game_battle_fields").select("*").eq("id", fieldId).single();
    if (fieldError || !field) return errorResponse("Field not found", 404);
    const { data: player, error: pErr } = await supabase.from("players").select("*").eq("user_id", user.id).single();
    if (pErr || !player) return errorResponse("Player not found", 404);
    const { data: playerUnits } = await supabase.from("player_units").select("*, game_units!inner(*)").eq("player_id", player.id);
    const battleUnits = (playerUnits || []).slice(0, 6).map((pu) => ({
      id: pu.id, unit_id: pu.unit_id, name: pu.game_units?.name || "Unit",
      class: pu.game_units?.class || "warrior", rarity: pu.game_units?.rarity || "common",
      level: pu.level || 1, xp: pu.xp || 0,
      hp: (pu.game_units?.base_hp || 100) * (1 + (pu.level || 1) * 0.1),
      attack: (pu.game_units?.base_attack || 10) * (1 + (pu.level || 1) * 0.1),
      defense: (pu.game_units?.base_defense || 10) * (1 + (pu.level || 1) * 0.1),
      speed: pu.game_units?.base_speed || 100,
      equipment: {}, power_rating: 0, isActive: true,
    }));
    const formation = { front: [null, null, null], back: [null, null, null] };
    battleUnits.forEach((u, i) => { if (i < 3) formation.front[i] = { unit_id: u.id, row: 0, col: i }; else formation.back[i - 3] = { unit_id: u.id, row: 1, col: i - 3 }; });
    let battle = startBattle(field, battleUnits, formation);
    for (let i = 0; i < 200; i++) { processTick(battle); if (battle.status !== "active") break; }
    const xpGained = battle.status === "victory" ? (field.rewards?.xp || 30) : Math.floor((field.rewards?.xp || 30) * 0.3);
    const goldGained = battle.status === "victory" ? (field.rewards?.gold || 50) : Math.floor((field.rewards?.gold || 50) * 0.2);
    const newTotalXp = (player.xp || 0) + xpGained;
    const newGold = (player.gold || 0) + goldGained;
    const levelInfo = calculateLevel(newTotalXp);
    await supabase.from("players").update({
      gold: newGold, xp: newTotalXp, level: levelInfo.level,
      total_battles: (player.total_battles || 0) + 1,
      total_wins: (player.total_wins || 0) + (battle.status === "victory" ? 1 : 0),
      last_online_at: new Date().toISOString(),
    }).eq("id", player.id);
    return jsonResponse({
      status: battle.status, currentWave: battle.currentWave, totalWaves: battle.totalWaves,
      turn: battle.turn, log: battle.log.slice(-50),
      xpGained, goldGained,
      leveledUp: levelInfo.level > (player.level || 1),
      newLevel: levelInfo.level,
      progress: { xp: levelInfo.currentXp, needed: levelInfo.nextLevelXp, pct: levelInfo.progress },
      unitsSurvived: battle.playerUnits.filter(u => u.isAlive).map(u => u.id),
    });
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
}