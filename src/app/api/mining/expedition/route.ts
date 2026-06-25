import { NextRequest, NextResponse } from "next/server";
import { createApiClient, errorResponse } from "@/lib/supabase/api-helper";
import { withValidatedRequest } from "@/lib/api/validation-middleware";
import { z } from "zod";

const ExpeditionStartSchema = z.object({
  expeditionUnitId: z.string().optional(),
  durationMinutes: z.number().int().min(5).max(120).default(30),
});

export async function POST(request: NextRequest) {
  return withValidatedRequest(request, ExpeditionStartSchema, async (data) => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);

    const { data: player } = await supabase
      .from("players")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!player) return errorResponse("Player not found", 404);

    const now = new Date();
    const durationMs = (data.durationMinutes || 30) * 60 * 1000;
    const endsAt = new Date(now.getTime() + durationMs);

    const { data: existing } = await supabase
      .from("player_mining")
      .select("id, expedition_ends_at")
      .eq("player_id", player.id)
      .maybeSingle();

    if (existing?.expedition_ends_at && new Date(existing.expedition_ends_at) > now) {
      return errorResponse("Expedition already in progress", 400);
    }

    if (existing) {
      await supabase
        .from("player_mining")
        .update({
          expedition_unit_id: data.expeditionUnitId || null,
          expedition_duration_minutes: (data.durationMinutes || 30),
          expedition_started_at: now.toISOString(),
          expedition_ends_at: endsAt.toISOString(),
        })
        .eq("id", existing.id);
    } else {
      await supabase.from("player_mining").insert({
        player_id: player.id,
        expedition_unit_id: data.expeditionUnitId || null,
        expedition_duration_minutes: (data.durationMinutes || 30),
        expedition_started_at: now.toISOString(),
        expedition_ends_at: endsAt.toISOString(),
      });
    }

    return NextResponse.json({
      started: true,
      endsAt: endsAt.toISOString(),
      remainingSeconds: (data.durationMinutes || 30) * 60,
    });
  });
}