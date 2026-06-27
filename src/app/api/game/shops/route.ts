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
      const { data, error, count } = await supabase.from("shop_items").select("*, game_items(name, item_type, rarity)", { count: "exact" }).order("id").range(offset, offset + limit - 1);
      if (error) return errorResponse(error.message);
      const mapped = (data || []).map((s: any) => ({
        id: s.id, item_id: s.item_id, shop_id: s.shop_id,
        name: s.game_items?.name || s.item_id,
        type: s.game_items?.item_type || "consumable",
        rarity: s.game_items?.rarity || "common",
        price_gold: s.price_gold, price_gems: s.price_gems, price_valor: s.price_valor || 0,
        price_battle_coins: s.price_battle_coins || 0, currency: s.currency,
        stock: s.stock, max_stock: s.max_stock, is_active: s.is_active,
      }));
      return jsonResponse({ data: mapped, total: count || 0, limit, offset });
    }, "game/shops/GET")
  );

