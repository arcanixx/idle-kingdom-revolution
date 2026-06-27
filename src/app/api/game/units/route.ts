import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";
import { withRateLimit } from "@/lib/rate-limit";

export const GET = async (request: NextRequest) =>
  withRateLimit(request, () =>
    withErrorHandler(async () => {
      const supabase = await createApiClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) return errorResponse("Unauthorized", 401);
      const limit = Math.min(parseInt(request.nextUrl.searchParams.get("limit") || "50", 10), 100);
      const offset = parseInt(request.nextUrl.searchParams.get("offset") || "0", 10);
      const { data, error, count } = await supabase.from("game_units").select("*", { count: "exact" }).order("id").range(offset, offset + limit - 1);
      if (error) return errorResponse(error.message);
      return jsonResponse({ data: data || [], total: count || 0, limit, offset });
    }, "game/units/GET")
  );
