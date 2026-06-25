import { NextRequest, NextResponse } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);

    const { data: player } = await supabase
      .from("players")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!player) return errorResponse("Player not found", 404);

    const { data: mining, error } = await supabase
      .from("player_mining")
      .select("*")
      .eq("player_id", player.id)
      .maybeSingle();

    if (error) return errorResponse(error.message);

    const now = Date.now();
    let expActive = false;
    let remainSec = 0;

    if (mining?.expedition_ends_at) {
      const end = new Date(mining.expedition_ends_at).getTime();
      if (end > now) {
        expActive = true;
        remainSec = Math.floor((end - now) / 1000);
      }
    }

    return jsonResponse({
      mineLevel: mining?.mine_level || 1,
      iron: mining?.iron || 0,
      crystals: mining?.crystals || 0,
      deepCoins: mining?.deep_coins || 0,
      expeditionActive: expActive,
      remainingSeconds: remainSec,
      passesRemaining: Math.max(0, 3 - (mining?.expedition_duration_minutes ? 1 : 0)),
    });
  });
}