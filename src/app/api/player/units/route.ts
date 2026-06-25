import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    const { data: player } = await supabase.from("players").select("id").eq("user_id", user.id).single();
    if (!player) return errorResponse("Player not found", 404);
    const { data, error } = await supabase.from("player_units").select("*, game_units!inner(*)").eq("player_id", player.id).order("created_at");
    if (error) return errorResponse(error.message);
    if (!data || data.length === 0) return jsonResponse([]);
    const units = data.map((pu) => ({
      id: pu.id,
      unit_id: pu.unit_id,
      name: pu.game_units?.name || pu.unit_id,
      class: pu.game_units?.class || "warrior",
      faction: pu.game_units?.faction || "human",
      rarity: pu.game_units?.rarity || "common",
      level: pu.level || 1,
      xp: pu.xp || 0,
      hp: (pu.game_units?.base_hp || 100) * (1 + (pu.level || 1) * 0.1),
      attack: (pu.game_units?.base_attack || 10) * (1 + (pu.level || 1) * 0.1),
      defense: (pu.game_units?.base_defense || 10) * (1 + (pu.level || 1) * 0.1),
      speed: pu.game_units?.base_speed || 100,
      equipment: {},
      power_rating: Math.floor(((pu.game_units?.base_hp || 100) * 0.5 + (pu.game_units?.base_attack || 10) * 2 + (pu.game_units?.base_defense || 10) * 1.5) * (1 + (pu.level || 1) * 0.1)),
      formation_row: pu.formation_row,
      formation_col: pu.formation_col,
    }));
    return jsonResponse(units);
  });
};
