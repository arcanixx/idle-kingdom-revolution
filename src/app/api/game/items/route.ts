import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createApiClient();
    const { data, error } = await supabase.from("game_items").select("*").eq("is_active", true).order("item_type").order("tier");
    if (error) return errorResponse(error.message);
    return jsonResponse(data);
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
}