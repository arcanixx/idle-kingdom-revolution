import { NextRequest, NextResponse } from "next/server";
import { createApiClient, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);

    const { data: player, error: pErr } = await supabase
      .from("players")
      .select("id, last_online_at, level, xp, gold")
      .eq("user_id", user.id)
      .maybeSingle();

    if (pErr || !player) return errorResponse("Player not found", 404);

    const { data: result, error: funcErr } = await supabase.rpc("claim_offline_earnings", {
      p_player_id: player.id,
    });

    if (funcErr) throw new Error(funcErr.message);

    return NextResponse.json({
      earned: result,
      player: { level: player.level, xp: player.xp, gold: player.gold },
    }, { status: 200 });
  });
}
