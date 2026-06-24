import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    
    const { data: player, error: pErr } = await supabase
      .from("players")
      .select("id, last_online_at, level, xp, gold")
      .eq("user_id", user.id)
      .single();
    if (pErr || !player) return errorResponse("Player not found", 404);

    // Call the existing DB function for offline earnings
    const { data: result, error: funcErr } = await supabase.rfc("claim_offline_earnings", {
      p_player_id: player.id,
    });
    if (funcErr) throw new Error(funcErr.message);

    return jsonResponse({
      earned: result,
      player: { level: player.level, xp: player.xp, gold: player.gold },
    });
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
}
