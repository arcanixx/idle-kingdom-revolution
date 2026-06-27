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
      const { data, error, count } = await supabase.from("game_battle_fields").select("*", { count: "exact" }).order("id").range(offset, offset + limit - 1);
      if (error) return errorResponse(error.message);
      const mapped = (data || []).map((f: Record<string, unknown>) => ({
        id: f.id, name: f.name, description: f.description, difficulty: f.difficulty,
        wave_count: f.wave_count, boss_wave: f.boss_wave, recommended_power: f.recommended_power,
        rewards: f.rewards, is_locked: !f.is_active, icon: f.icon, terrain_type: f.terrain_type,
        chapter_id: f.chapter_id, enemy_pool: f.enemy_pool,
      }));
      return jsonResponse({ data: mapped, total: count || 0, limit, offset });
    }, "game/fields/GET")
  );

