import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";
import { withRateLimit } from "@/lib/rate-limit";

export const POST = async (request: NextRequest) =>
  withRateLimit(request, () =>
    withErrorHandler(async () => {
      const supabase = await createApiClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) return errorResponse("Unauthorized", 401);

      const { itemId, quantity = 1 } = await request.json();
      if (!itemId) return errorResponse("Missing itemId", 400);

      const { data: player } = await supabase.from("players").select("id, gold, gems").eq("user_id", user.id).maybeSingle();
      if (!player) return errorResponse("Player not found", 404);

      const { data: shopItem, error: siErr } = await supabase.from("shop_items").select("*, game_items(name, item_type)").eq("item_id", itemId).single();
      if (siErr || !shopItem) return errorResponse("Item not found in shop", 404);

      const costGold = (shopItem.price_gold || 0) * quantity;
      const costGems = (shopItem.price_gems || 0) * quantity;
      if (player.gold < costGold) return errorResponse("Not enough gold", 400);
      if (player.gems < costGems) return errorResponse("Not enough gems", 400);

      if (shopItem.stock < quantity) return errorResponse("Not enough stock", 400);

      const { error: uErr } = await supabase.from("players").update({
        gold: player.gold - costGold,
        gems: player.gems - costGems,
      }).eq("id", player.id);
      if (uErr) return errorResponse(uErr.message, 500);

      const { data: existing } = await supabase.from("player_inventory").select("id, quantity").eq("player_id", player.id).eq("item_id", itemId).maybeSingle();
      if (existing) {
        await supabase.from("player_inventory").update({ quantity: existing.quantity + quantity }).eq("id", existing.id);
      } else {
        await supabase.from("player_inventory").insert({ player_id: player.id, item_id: itemId, quantity });
      }

      await supabase.from("shop_items").update({ stock: shopItem.stock - quantity }).eq("id", shopItem.id);

      return jsonResponse({ success: true, itemId, quantity, costGold, costGems });
    }, "shop/buy/POST")
  );
