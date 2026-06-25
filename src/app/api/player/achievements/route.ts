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
    const { data: achievements } = await supabase.from("game_achievements").select("*").eq("is_active", true);
    const { data: myAchievements } = await supabase.from("player_achievements").select("*").eq("player_id", player.id);
    return jsonResponse({ achievements: achievements || [], unlocked: myAchievements || [] });
  });
};
