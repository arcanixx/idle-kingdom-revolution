import { NextRequest } from "next/server";
import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    const supabase = await createApiClient();
    const { data, error } = await supabase.from("game_items").select("*").eq("is_active", true).order("item_type").order("tier");
    if (error) return errorResponse(error.message);
    return jsonResponse(data);
  });
};
