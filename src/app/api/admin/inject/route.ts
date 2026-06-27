import { NextRequest } from "next/server";
import { createApiClient, createAdminClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";
import { withRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  return withRateLimit(request, () =>
    withErrorHandler(async () => {
      const supabase = await createApiClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) return errorResponse("Unauthorized", 401);
      const { data: admin } = await supabase.from("users").select("role").eq("id", user.id).maybeSingle();
      if (!admin?.role || admin.role !== "admin") return errorResponse("Forbidden", 403);

      const body = await request.json();
      const { player_id, resource, amount } = body;
      if (!player_id || !resource || !amount) return errorResponse("Missing fields", 400);
      if (!["gold", "gems", "valor", "battle_coins"].includes(resource)) return errorResponse("Invalid resource", 400);

      const adminClient = createAdminClient();
      const { data: player } = await adminClient.from("players").select(resource).eq("id", player_id).maybeSingle();
      if (!player) return errorResponse("Player not found", 404);
      const { error } = await adminClient.from("players").update({ [resource]: (player[resource] || 0) + amount }).eq("id", player_id);
      if (error) return errorResponse(error.message);
      return jsonResponse({ success: true, message: "Injected " + amount + " " + resource });
    }, "admin/inject/POST")
  );
}

