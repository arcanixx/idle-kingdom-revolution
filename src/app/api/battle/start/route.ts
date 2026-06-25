import { NextRequest, NextResponse } from "next/server";
import { createApiClient, errorResponse } from "@/lib/supabase/api-helper";
import { withValidatedRequest } from "@/lib/api/validation-middleware";
import { BattleStartSchema } from "@/lib/validation/schemas";

export async function POST(request: NextRequest) {
  return withValidatedRequest(request, BattleStartSchema, async (data): Promise<NextResponse<unknown>> => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);

    // Pobierz ID gracza
    const { data: player, error: pErr } = await supabase
      .from("players")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (pErr || !player) return errorResponse("Player not found", 404);

    // Tutaj logika bitwy - data.fieldId i data.army są już zwalidowane i bezpieczne
    const { data: battleResult, error: battleErr } = await supabase.rpc("start_battle", {
      p_player_id: player.id,
      p_field_id: data.fieldId,
      p_army: data.army,
    });

    if (battleErr) throw new Error(battleErr.message);

    return NextResponse.json(battleResult, {
      status: 200,
      
    });
  });
}