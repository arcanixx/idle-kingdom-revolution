import { NextRequest, NextResponse } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler, withValidatedRequest } from "@/lib/api/validation-middleware";
import { BuyItemSchema } from "@/lib/validation/schemas";

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    const supabase = await createApiClient();
    const { data: items, error } = await supabase.from("game_shops").select("*, game_items!inner(*)").eq("is_active", true).order("sort_order");
    if (error) return errorResponse(error.message);
    return jsonResponse({ items: items || [] });
  });
};

export async function POST(request: NextRequest) {
  return withValidatedRequest(request, BuyItemSchema, async (data) => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    const { data: player } = await supabase.from("players").select("id, gold, gems").eq("user_id", user.id).single();
    if (!player) return errorResponse("Player not found", 404);
    const { data: shopItem } = await supabase.from("game_shops").select("*, game_items!inner(*)").eq("id", data.itemId).eq("is_active", true).single();
    if (!shopItem) return errorResponse("Item not found in shop", 404);
    const totalCost = shopItem.price_gold * (data.quantity ?? 1);
    if (player.gold < totalCost) return errorResponse("Not enough gold", 400);
    const { error: deductErr } = await supabase.from("players").update({ gold: player.gold - totalCost }).eq("id", player.id);
    if (deductErr) return errorResponse(deductErr.message, 500);
    const { error: insErr } = await supabase.from("player_inventory").insert({ player_id: player.id, item_id: data.itemId, quantity: (data.quantity ?? 1) });
    if (insErr) return errorResponse(insErr.message, 500);
    return NextResponse.json({ success: true, gold: player.gold - totalCost, item: shopItem.game_items, quantity: (data.quantity ?? 1) });
  });
};

