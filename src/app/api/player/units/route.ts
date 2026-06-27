import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";
import { withRateLimit } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  return withRateLimit(request, () =>
    withErrorHandler(async () => {
      const supabase = await createApiClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) return errorResponse("Unauthorized", 401);
      const { data: player } = await supabase.from("players").select("id").eq("user_id", user.id).single();
      if (!player) return errorResponse("Player not found", 404);
      const limit = Math.min(parseInt(request.nextUrl.searchParams.get("limit") || "50", 10), 100);
      const offset = parseInt(request.nextUrl.searchParams.get("offset") || "0", 10);
      const { data, error, count } = await supabase
        .from("player_units").select("*, game_units(*)", { count: "exact" })
        .eq("player_id", player.id).order("created_at").range(offset, offset + limit - 1);
      if (error) return errorResponse(error.message);
      const units = (data || []).map((pu: any) => ({
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
        equipment: pu.equipment || { weapon: null, armor: null, accessory: null },
        power_rating: Math.floor(((pu.game_units?.base_hp || 100) * 0.5 + (pu.game_units?.base_attack || 10) * 2 + (pu.game_units?.base_defense || 10) * 1.5) * (1 + (pu.level || 1) * 0.1)),
        isActive: pu.game_units?.is_active ?? true,
        formation_row: pu.formation_row,
        formation_col: pu.formation_col,
      }));
      return jsonResponse({ data: units, total: count || 0, limit, offset });
    }, "player/units/GET")
  );
};


