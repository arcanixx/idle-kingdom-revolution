import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { TREES } from "@/lib/game/valor-trees";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    const { data: player } = await supabase.from("players").select("id, valor").eq("user_id", user.id).single();
    if (!player) return errorResponse("Player not found", 404);
    const { data: learned } = await supabase.from("player_valor").select("tree_name, perk_name").eq("player_id", player.id);
    return jsonResponse({
      valor: player.valor,
      learned: learned || [],
      trees: TREES,
    });
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    const { treeName, perkName } = await request.json();
    const tree = TREES[treeName];
    if (!tree) return errorResponse("Invalid tree", 400);
    const perk = tree.perks[perkName];
    if (!perk) return errorResponse("Invalid perk", 400);
    const { data: player } = await supabase.from("players").select("id, valor").eq("user_id", user.id).single();
    if (!player) return errorResponse("Player not found", 404);
    if (player.valor < perk.cost) return errorResponse("Not enough valor", 400);
    // Check if already learned
    const { data: existingArr } = await supabase.from("player_valor").select("id").eq("player_id", player.id).eq("tree_name", treeName).eq("perk_name", perkName);
    if (existingArr?.length > 0) return errorResponse("Perk already learned", 400);
    // Deduct valor and insert
    const { error: updError } = await supabase.from("players").update({ valor: player.valor - perk.cost }).eq("id", player.id);
    if (updError) return errorResponse(updError.message, 500);
    const { error: insError } = await supabase.from("player_valor").insert({
      player_id: player.id,
      tree_name: treeName,
      perk_name: perkName,
    });
    if (insError) return errorResponse(insError.message, 500);
    return jsonResponse({ success: true, valor: player.valor - perk.cost });
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
}
