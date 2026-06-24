import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";

export async function GET() {
  try {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    const { data: player } = await supabase.from("players").select("id").eq("user_id", user.id).single();
    if (!player) return errorResponse("Player not found", 404);
    const { data: castle, error } = await supabase.from("player_castle").select("*").eq("player_id", player.id).maybeSingle();
    if (error) return errorResponse(error.message);
    return jsonResponse({
      castleLevel: castle?.castle_level || 1,
      wallLevel: castle?.wall_level || 1,
      hp: castle?.hp || 1000,
      maxHp: castle?.max_hp || 1000,
      siegeWave: castle?.current_siege_wave || 0,
      highestSiege: castle?.highest_siege_wave || 0,
    });
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
}