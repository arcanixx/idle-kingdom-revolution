import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";
import { logger } from "@/lib/logger";

const SLOT_ITEM_TYPES: Record<string, string> = { weapon: "weapon", armor: "armor", accessory: "accessory" };

export async function POST(request: NextRequest) {
  return withErrorHandler(async () => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);

    const { unitId, itemId, slot } = await request.json();
    if (!unitId || !itemId || !slot) return errorResponse("Missing unitId, itemId, or slot", 400);
    if (!SLOT_ITEM_TYPES[slot]) return errorResponse("Invalid slot. Must be weapon, armor, helmet, or accessory", 400);

    const { data: player } = await supabase.from("players").select("id").eq("user_id", user.id).maybeSingle();
    if (!player) return errorResponse("Player not found", 404);

    const { data: unit } = await supabase.from("player_units").select("equipment").eq("id", unitId).eq("player_id", player.id).maybeSingle();
    if (!unit) return errorResponse("Unit not found", 404);

    const { data: invItem } = await supabase.from("player_inventory").select("*, game_items(item_type)").eq("player_id", player.id).eq("item_id", itemId).maybeSingle();
    if (!invItem || (invItem.quantity || 0) < 1) return errorResponse("Item not in inventory", 400);

    const itemType = invItem.game_items?.item_type;
    if (itemType !== SLOT_ITEM_TYPES[slot]) return errorResponse("Item type does not match slot", 400);

    const equip = unit.equipment || { weapon: null, armor: null, accessory: null, helmet: null };
    const oldItemId = equip[slot];
    equip[slot] = itemId;

    const { error: eqErr } = await supabase.from("player_units").update({ equipment: equip }).eq("id", unitId).eq("player_id", player.id);
    if (eqErr) return errorResponse(eqErr.message, 500);

    const { error: delErr } = await supabase.from("player_inventory").update({ quantity: invItem.quantity - 1 }).eq("id", invItem.id);
    if (delErr) return errorResponse(delErr.message, 500);

    if (oldItemId) {
      const { data: existing } = await supabase.from("player_inventory").select("id, quantity").eq("player_id", player.id).eq("item_id", oldItemId).maybeSingle();
      if (existing) {
        await supabase.from("player_inventory").update({ quantity: existing.quantity + 1 }).eq("id", existing.id);
      } else {
        await supabase.from("player_inventory").insert({ player_id: player.id, item_id: oldItemId, quantity: 1 });
      }
    }

    logger.info("Equipment changed", "api/player/equip/route.ts", "POST", { userId: user.id, unitId, slot, itemId, oldItemId });
    return jsonResponse({ success: true, slot, itemId, oldItemId });
  });
}
