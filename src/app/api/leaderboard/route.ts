import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";
import { withRateLimit } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  return withRateLimit(request, async () => {
    return withErrorHandler(async () => {
      const supabase = await createApiClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) return jsonResponse({ leaderboard: [], total: 0 });
      const limit = parseInt(request.nextUrl.searchParams.get("limit") || "50", 10);
      const offset = parseInt(request.nextUrl.searchParams.get("offset") || "0", 10);
      const { data: leaderboard, error, count } = await supabase.from("players").select("id, display_name, level, pvp_rating", { count: "exact" }).order("pvp_rating", { ascending: false }).range(offset, offset + limit - 1);
      if (error) return errorResponse(error.message);
      return jsonResponse({ leaderboard: leaderboard || [], total: count || 0, limit, offset });
    });
  });
};
