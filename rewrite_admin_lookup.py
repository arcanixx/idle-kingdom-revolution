content = """import { NextRequest } from "next/server";
import { createApiClient, createAdminClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    const supabase = await createApiClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);

    const { data: admin } = await supabase.from("users").select("role").eq("id", user.id).maybeSingle();
    if (!admin?.role || admin.role !== "admin") return errorResponse("Forbidden", 403);

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const id = searchParams.get("id");

    if (!email && !id) return errorResponse("Provide email or id query param", 400);

    const adminClient = createAdminClient();

    if (email) {
      const { data: userData, error: uErr } = await adminClient.from("users").select("id, email").eq("email", email).maybeSingle();
      if (uErr || !userData) return errorResponse("User not found", 404);
      const { data: player } = await adminClient.from("players").select("*").eq("user_id", userData.id).maybeSingle();
      return jsonResponse({ user: userData, player });
    }

    const { data: player } = await adminClient.from("players").select("*").eq("id", id).maybeSingle();
    if (!player) return errorResponse("Player not found", 404);
    const { data: userData } = await adminClient.from("users").select("id, email").eq("id", player.user_id).maybeSingle();
    return jsonResponse({ user: userData || null, player });
  }, "admin/lookup/GET");
}
"""
with open("src/app/api/admin/lookup/route.ts", "w", encoding="utf8") as f:
    f.write(content)
print("Rewritten admin lookup route")
