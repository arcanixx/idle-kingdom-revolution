import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";
import { withRateLimit } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  return withRateLimit(request, () =>
    withErrorHandler(async () => {
      const supabase = await createApiClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) return errorResponse("Unauthorized", 401);
      const { data: player } = await supabase.from("players").select("id").eq("user_id", user.id).maybeSingle();
      if (!player) return errorResponse("Player not found", 404);
      const limit = Math.min(parseInt(request.nextUrl.searchParams.get("limit") || "50", 10), 100);
      const offset = parseInt(request.nextUrl.searchParams.get("offset") || "0", 10);
      const { data: achievements, error: aErr, count: aCount } = await supabase
        .from("game_achievements").select("*", { count: "exact" })
        .eq("is_active", true).range(offset, offset + limit - 1);
      const { data: myAchievements, error: mErr } = await supabase
        .from("player_achievements").select("*").eq("player_id", player.id);
      if (aErr) return errorResponse(aErr.message);
      if (mErr) return errorResponse(mErr.message);
      return jsonResponse({ achievements: achievements || [], unlocked: myAchievements || [], total: aCount || 0, limit, offset });
    }, "player/achievements/GET")
  );
};
