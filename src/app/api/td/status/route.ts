import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    const { data: player } = await supabase.from("players").select("id").eq("user_id", user.id).single();
    if (!player) return errorResponse("Player not found", 404);
    const { data: td, error } = await supabase.from("player_td_progress").select("*").eq("player_id", player.id).maybeSingle();
    if (error) return errorResponse(error.message);
    return jsonResponse({ fortressLevel: td?.fortress_level || 1, highestWave: td?.highest_wave || 0, currentWave: td?.current_wave || 0, totalKills: td?.total_kills || 0 });
  });
};
