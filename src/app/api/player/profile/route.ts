import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    const { data, error } = await supabase.from("players").select("*").eq("user_id", user.id).single();
    if (error) return errorResponse(error.message);
    return jsonResponse(data);
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);
    const body = await request.json();
    const { data, error } = await supabase.from("players").update(body).eq("user_id", user.id).select().single();
    if (error) return errorResponse(error.message);
    return jsonResponse(data);
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
}