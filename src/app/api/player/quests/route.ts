import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler, withValidatedRequest } from "@/lib/api/validation-middleware";
import { QuestActionSchema } from "@/lib/validation/schemas";
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
      const { data: allQuests, error: qErr, count: qCount } = await supabase
        .from("game_quests").select("*", { count: "exact" })
        .eq("is_active", true).range(offset, offset + limit - 1);
      const { data: myQuests, error: mErr } = await supabase
        .from("player_quests").select("*").eq("player_id", player.id);
      if (qErr) return errorResponse(qErr.message);
      if (mErr) return errorResponse(mErr.message);
      return jsonResponse({ quests: allQuests || [], myQuests: myQuests || [], total: qCount || 0, limit, offset });
    }, "player/quests/GET")
  );
};

export async function POST(request: NextRequest) {
  return withRateLimit(request, () =>
    withValidatedRequest(request, QuestActionSchema, async (data) => {
      const supabase = await createApiClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) return errorResponse("Unauthorized", 401);
      const { data: player } = await supabase.from("players").select("id").eq("user_id", user.id).maybeSingle();
      if (!player) return errorResponse("Player not found", 404);
      const { error: pErr } = await supabase.from("player_quests").update({ status: data.status }).eq("player_id", player.id).eq("quest_id", data.questId);
      if (pErr) return errorResponse(pErr.message, 500);
      return jsonResponse({ success: true });
    }, "player/quests/POST")
  );
};
