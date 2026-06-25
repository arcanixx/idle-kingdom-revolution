import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler, withValidatedRequest } from "@/lib/api/validation-middleware";
import { QuestActionSchema } from "@/lib/validation/schemas";

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    const { data: player } = await supabase.from("players").select("id").eq("user_id", user.id).single();
    if (!player) return errorResponse("Player not found", 404);
    const { data: allQuests } = await supabase.from("game_quests").select("*").eq("is_active", true);
    const { data: myQuests } = await supabase.from("player_quests").select("*").eq("player_id", player.id);
    return jsonResponse({ quests: allQuests || [], myQuests: myQuests || [] });
  });
};

export async function POST(request: NextRequest) {
  return withValidatedRequest(request, QuestActionSchema, async (data) => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    const { data: player } = await supabase.from("players").select("id").eq("user_id", user.id).single();
    if (!player) return errorResponse("Player not found", 404);
    const { error: pErr } = await supabase.from("player_quests").update({ status: data.status }).eq("player_id", player.id).eq("quest_id", data.questId);
    if (pErr) return errorResponse(pErr.message, 500);
    return jsonResponse({ success: true });
  });
};
