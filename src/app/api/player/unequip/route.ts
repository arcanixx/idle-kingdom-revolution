import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  return withErrorHandler(async () => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);

    const { unitId, slot } = await request.json();
    if (!unitId || !slot) return errorResponse("Missing unitId or slot", 400);
    if (!["weapon", "armor", "helmet", "accessory"].includes(slot)) return errorResponse("Invalid slot", 400);

    const { data: player } = await supabase.from("players").select("id").eq("user_id", user.id).maybeSingle();
    if (!player) return errorResponse("Player not found", 404);

    const { data: unit } = await supabase.from("player_units").select("equipment").eq("id", unitId).eq("player_id", player.id).maybeSingle();
    if (!unit) return errorResponse("Unit not found", 404);

    const equip = unit.equipment || { weapon: null, armor: null, helmet: null, accessory: null };
    const oldItemId = equip[slot];
    if (!oldItemId) return jsonResponse({ success: true, message: "Slot already empty" });

    equip[slot] = null;
    const { error: eqErr } = await supabase.from("player_units").update({ equipment: equip }).eq("id", unitId).eq("player_id", player.id);
    if (eqErr) return errorResponse(eqErr.message, 500);

    const { data: existing } = await supabase.from("player_inventory").select("id, quantity").eq("player_id", player.id).eq("item_id", oldItemId).maybeSingle();
    if (existing) {
      await supabase.from("player_inventory").update({ quantity: existing.quantity + 1 }).eq("id", existing.id);
    } else {
      await supabase.from("player_inventory").insert({ player_id: player.id, item_id: oldItemId, quantity: 1 });
    }

    logger.info("Equipment removed", "api/player/unequip/route.ts", "POST", { userId: user.id, unitId, slot, oldItemId });
    return jsonResponse({ success: true, slot, oldItemId });
  });
}
