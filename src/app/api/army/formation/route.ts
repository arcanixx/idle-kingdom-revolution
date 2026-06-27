import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";
import { logger } from "@/lib/logger";

export const POST = async (request: NextRequest) =>
  withErrorHandler(async () => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);

    const { data: player } = await supabase.from("players").select("id").eq("user_id", user.id).single();
    if (!player) return errorResponse("Player not found", 404);

    const body = await request.json();
    const { formations } = body;
    if (!formations || !Array.isArray(formations)) return errorResponse("Invalid formation data", 400);

    await supabase.from("player_units").update({ formation_row: null, formation_col: null }).eq("player_id", player.id);
    for (const f of formations) {
      if (f.unit_id) {
        const { error: uErr } = await supabase.from("player_units").update({ formation_row: f.row ?? null, formation_col: f.col ?? null }).eq("player_id", player.id).eq("unit_id", f.unit_id);
        if (uErr) logger.error("Failed to update unit formation", "api/army/formation/route.ts", "POST", uErr, { unitId: f.unit_id });
      }
    }

    logger.info("Formation saved", "api/army/formation/route.ts", "POST", { userId: user.id, count: formations.length });
    return jsonResponse({ success: true });
  }, "army/formation/POST");
