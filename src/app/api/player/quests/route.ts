import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    const { data: player } = await supabase.from("players").select("id").eq("user_id", user.id).single();
    if (!player) return errorResponse("Player not found", 404);
    const { data: allQuests } = await supabase.from("game_quests").select("*").eq("is_active", true);
    const { data: myQuests } = await supabase.from("player_quests").select("*").eq("player_id", player.id);
    return jsonResponse({ quests: allQuests || [], myQuests: myQuests || [] });
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    const { questId, status } = await request.json();
    const { data: player } = await supabase.from("players").select("id").eq("user_id", user.id).single();
    if (!player) return errorResponse("Player not found", 404);
    const { error: pErr } = await supabase.from("player_quests").update({ status }).eq("player_id", player.id).eq("quest_id", questId);
    if (pErr) return errorResponse(pErr.message, 500);
    return jsonResponse({ success: true });
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
}
