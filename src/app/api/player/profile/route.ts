import { NextRequest, NextResponse } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler, withValidatedRequest } from "@/lib/api/validation-middleware";
import { ProfileUpdateSchema } from "@/lib/validation/schemas";

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    const { data, error } = await supabase.from("players").select("*").eq("user_id", user.id).single();
    if (error) return errorResponse(error.message);
    return jsonResponse(data);
  });
};

export async function PATCH(request: NextRequest) {
  return withValidatedRequest(request, ProfileUpdateSchema, async (data) => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    const { data: player, error: updErr } = await supabase.from("players").update(data).eq("user_id", user.id).select().single();
    if (updErr) return errorResponse(updErr.message);
    return jsonResponse(player);
  });
};

