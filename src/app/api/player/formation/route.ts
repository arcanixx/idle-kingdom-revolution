import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";
import { logger } from "@/lib/logger";

export const GET = async (request: NextRequest) =>
  withErrorHandler(async () => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    const { data: player } = await supabase.from("players").select("id").eq("user_id", user.id).maybeSingle();
    if (!player) return errorResponse("Player not found", 404);
    const { data, error } = await supabase.from("player_units").select("unit_id, formation_row, formation_col").eq("player_id", player.id).not("formation_row", "is", null).order("formation_row").order("formation_col");
    if (error) return errorResponse(error.message);
    const formation = { front: [null, null, null], back: [null, null, null] };
    (data || []).forEach((pu: any) => {
      const row = pu.formation_row === 0 ? "front" : "back";
      formation[row][pu.formation_col] = { unit_id: pu.unit_id, row: pu.formation_row, col: pu.formation_col } as any;
    });
    logger.info("Formation fetched", "api/player/formation/route.ts", "GET", { userId: user.id });
    return jsonResponse(formation);
  }, "player/formation/GET");

export const PUT = async (request: NextRequest) =>
  withErrorHandler(async () => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    const { data: player } = await supabase.from("players").select("id").eq("user_id", user.id).maybeSingle();
    if (!player) return errorResponse("Player not found", 404);
    const body = await request.json();
    const { formations } = body;
    if (!formations || !Array.isArray(formations)) return errorResponse("Invalid formation data", 400);
    for (const f of formations) {
      if (f.unit_id) {
        await supabase.from("player_units").update({ formation_row: f.row, formation_col: f.col }).eq("player_id", player.id).eq("unit_id", f.unit_id);
      }
    }
    logger.info("Formation updated", "api/player/formation/route.ts", "PUT", { userId: user.id, count: formations.length });
    return jsonResponse({ success: true });
  }, "player/formation/PUT");

