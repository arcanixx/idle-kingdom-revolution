import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";

export async function POST(request: NextRequest) {
  return withErrorHandler(async () => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);

    const { data: player } = await supabase
      .from("players").select("id, gold").eq("user_id", user.id).maybeSingle();
    if (!player) return errorResponse("Player not found", 404);

    const { data: castle, error: cErr } = await supabase
      .from("player_castle").select("*").eq("player_id", player.id).maybeSingle();
    if (cErr) return errorResponse(cErr.message);

    const wave = (castle?.current_siege_wave || 0) + 1;
    const goldReward = Math.floor(10 + wave * 5);
    const success = Math.random() > 0.3;

    const { error: uErr } = await supabase.from("player_castle").upsert({
      player_id: player.id,
      castle_level: castle?.castle_level || 1,
      wall_level: castle?.wall_level || 1,
      hp: success ? (castle?.hp || 1000) : Math.max(0, (castle?.hp || 1000) - Math.floor(50 + wave * 10)),
      max_hp: castle?.max_hp || 1000,
      current_siege_wave: success ? wave : (castle?.current_siege_wave || 0),
      highest_siege_wave: Math.max(castle?.highest_siege_wave || 0, wave),
    }, { onConflict: "player_id" });
    if (uErr) return errorResponse(uErr.message, 500);

    if (success) {
      const { error: gErr } = await supabase
        .from("players").update({ gold: player.gold + goldReward }).eq("id", player.id);
    }

    return jsonResponse({
      success,
      wave,
      goldReward: success ? goldReward : 0,
      castleHp: success ? (castle?.hp || 1000) : Math.max(0, (castle?.hp || 1000) - Math.floor(50 + wave * 10)),
      message: success ? "Siege defended!" : "Castle took damage!",
    });
  });
}


