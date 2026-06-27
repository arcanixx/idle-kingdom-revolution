import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withValidatedRequest } from "@/lib/api/validation-middleware";
import { BattleCompleteSchema } from "@/lib/validation/schemas";

interface Player {
  id: string;
  gold: number;
  xp: number;
  highest_wave: number;
  highest_field_id: number;
  total_battles: number;
  total_wins: number;
}

interface BattleUpdates {
  gold?: number;
  xp?: number;
  highest_wave?: number;
  highest_field_id?: number;
  total_battles?: number;
  total_wins?: number;
}

interface BattleLog {
  player_id: string;
  battle_type: string;
  field_id: number;
  result: string;
  waves_cleared: number;
  formation: Record<string, any>;
  rewards: { gold: number; xp: number };
}

export async function POST(request: NextRequest) {
  return withValidatedRequest(request, BattleCompleteSchema, async (data) => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);

    const { data: player } = await supabase
      .from("players").select("id, gold, xp, highest_wave, highest_field_id, total_battles, total_wins").eq("user_id", user.id).maybeSingle();
    if (!player) return errorResponse("Player not found", 404);

    const goldReward = Math.floor(data.wavesCleared * 10);
    const xpReward = Math.floor(data.wavesCleared * 8);
    const isWin = data.result === "victory";

    const updates: BattleUpdates = {
      gold: player.gold + goldReward,
      total_battles: player.total_battles + 1,
    };
    if (isWin) {
      updates.total_wins = player.total_wins + 1;
      updates.highest_wave = Math.max(player.highest_wave, data.wavesCleared);
      updates.highest_field_id = Math.max(player.highest_field_id || 0, Number(data.fieldId) || 0) || 1;
    }

    const { error: pErr } = await supabase.from("players").update(updates).eq("id", player.id);
    if (pErr) return errorResponse(pErr.message, 500);

    const { error: lErr } = await supabase.from("battle_logs").insert({
      player_id: player.id,
      battle_type: "campaign",
      field_id: data.fieldId,
      result: data.result,
      waves_cleared: data.wavesCleared,
      formation: {},
      rewards: { gold: goldReward, xp: xpReward },
      created_at: new Date().toISOString(),
    });

    if (lErr) return errorResponse(lErr.message, 500);

    return jsonResponse({
      success: true,
      rewards: { gold: goldReward, xp: xpReward },
      message: isWin ? "Victory!" : "Battle completed"
    });
  });
}

