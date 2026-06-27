import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";

export async function POST(request: NextRequest) {
  return withErrorHandler(async () => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);

    const { data: player } = await supabase
      .from("players").select("id, gold, xp, level").eq("user_id", user.id).single();
    if (!player) return errorResponse("Player not found", 404);

    const { data: td, error: tErr } = await supabase
      .from("player_td_progress").select("*").eq("player_id", player.id).maybeSingle();
    if (tErr) return errorResponse(tErr.message);

    const wave = (td?.current_wave || 1);
    const goldReward = Math.floor(5 + wave * 3);
    const kills = Math.floor(2 + wave * 1.5);
    const success = Math.random() > 0.25;

    if (success) {
      const nextWave = wave + 1;
      const { error: uErr } = await supabase.from("player_td_progress").upsert({
        player_id: player.id,
        current_wave: nextWave,
        highest_wave: Math.max(td?.highest_wave || 1, wave),

        total_kills: (td?.total_kills || 0) + kills,
        last_played_at: new Date().toISOString(),
      }, { onConflict: "player_id" });
      if (uErr) return errorResponse(uErr.message, 500);

      const { error: gErr } = await supabase
        .from("players").update({ gold: player.gold + goldReward }).eq("id", player.id);
      if (gErr) return errorResponse(gErr.message, 500);
    }

    return jsonResponse({
      success,
      wave,
      goldReward: success ? goldReward : 0,
      kills: success ? kills : 0,
      currentWave: success ? wave + 1 : wave,
      highestWave: success ? Math.max(td?.highest_wave || 1, wave) : (td?.highest_wave || 1),
      message: success ? "Wave cleared!" : "Defeated at wave " + wave,
    });
  });
}


