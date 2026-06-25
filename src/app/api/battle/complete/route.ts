import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withValidatedRequest } from "@/lib/api/validation-middleware";
import { BattleCompleteSchema } from "@/lib/validation/schemas";

export async function POST(request: NextRequest) {
  return withValidatedRequest(request, BattleCompleteSchema, async (data) => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);

    const { data: player } = await supabase
      .from("players").select("id, gold, xp, highest_wave, highest_field_id, total_battles, total_wins").eq("user_id", user.id).single();
    if (!player) return errorResponse("Player not found", 404);

    const goldReward = Math.floor(data.wavesCleared * 10);
    const xpReward = Math.floor(data.wavesCleared * 8);
    const isWin = data.result === "victory";

    const updates: any = {
      gold: player.gold + goldReward,
      total_battles: player.total_battles + 1,
    };
    if (isWin) {
      updates.total_wins = player.total_wins + 1;
      updates.highest_wave = Math.max(player.highest_wave, data.wavesCleared);
      updates.highest_field_id = Math.max(player.highest_field_id || 1, data.fieldId);
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
      duration_seconds: 0,
    });
    if (lErr) return errorResponse(lErr.message, 500);

    return jsonResponse({
      result: data.result,
      wavesCleared: data.wavesCleared,
      goldReward,
      xpReward,
      totalBattles: player.total_battles + 1,
      totalWins: isWin ? player.total_wins + 1 : player.total_wins,
    });
  });
}



