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
      const { data: mail, error, count } = await supabase
        .from("player_mail").select("*", { count: "exact" })
        .eq("player_id", player.id).order("created_at", { ascending: false }).range(offset, offset + limit - 1);
      if (error) return errorResponse(error.message);
      return jsonResponse({ mail: mail || [], total: count || 0, limit, offset });
    }, "player/mail/GET")
  );
};
