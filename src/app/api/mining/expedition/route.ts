import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    const { data: player } = await supabase.from("players").select("id").eq("user_id", user.id).single();
    if (!player) return errorResponse("Player not found", 404);
    const now = new Date();
    const endsAt = new Date(now.getTime() + 30 * 60 * 1000);
    const { data: existing, error: existingError } = await supabase.from("player_mining").select("id, expedition_ends_at").eq("player_id", player.id).maybeSingle();
    if (existing?.expedition_ends_at && new Date(existing.expedition_ends_at) > now) {
      return errorResponse("Expedition already in progress", 400);
    }
    if (existing) {
      await supabase.from("player_mining").update({
        expedition_unit_id: null,
        expedition_duration_minutes: 30,
        expedition_started_at: now.toISOString(),
        expedition_ends_at: endsAt.toISOString(),
      }).eq("id", existing.id);
    } else {
      await supabase.from("player_mining").insert({
        player_id: player.id,
        expedition_duration_minutes: 30,
        expedition_started_at: now.toISOString(),
        expedition_ends_at: endsAt.toISOString(),
      });
    }
    return jsonResponse({ started: true, endsAt: endsAt.toISOString(), remainingSeconds: 1800 });
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
}