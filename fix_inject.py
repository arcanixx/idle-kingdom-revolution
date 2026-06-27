c = open("src/app/api/admin/inject/route.ts", encoding="utf8").read()
old = c

c = c.replace(
  'import { createApiClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";',
  'import { createApiClient, createAdminClient, jsonResponse, errorResponse } from "@/lib/supabase/api-helper";'
)

c = c.replace(
  """const { data: admin } = await supabase.from("users").select("role").eq("id", user.id).maybeSingle();
      if (!admin?.role || admin.role !== "admin") return errorResponse("Forbidden", 403);

      const body = await request.json();
      const { player_id, resource, amount } = body;
      if (!player_id || !resource || !amount) return errorResponse("Missing fields", 400);
      if (!["gold", "gems", "valor", "battle_coins"].includes(resource)) return errorResponse("Invalid resource", 400);

      const { data: player } = await supabase.from("players").select(resource).eq("id", player_id).single();
      if (!player) return errorResponse("Player not found", 404);
      const { error } = await supabase.from("players").update({ [resource]: (player[resource] || 0) + amount }).eq("id", player_id);""",
  """const { data: admin } = await supabase.from("users").select("role").eq("id", user.id).maybeSingle();
      if (!admin?.role || admin.role !== "admin") return errorResponse("Forbidden", 403);

      const body = await request.json();
      const { player_id, resource, amount } = body;
      if (!player_id || !resource || !amount) return errorResponse("Missing fields", 400);
      if (!["gold", "gems", "valor", "battle_coins"].includes(resource)) return errorResponse("Invalid resource", 400);

      const adminClient = createAdminClient();
      const { data: player } = await adminClient.from("players").select(resource).eq("id", player_id).maybeSingle();
      if (!player) return errorResponse("Player not found", 404);
      const { error } = await adminClient.from("players").update({ [resource]: (player[resource] || 0) + amount }).eq("id", player_id);"""
)

if c != old:
    with open("src/app/api/admin/inject/route.ts", "w", encoding="utf8") as f:
        f.write(c)
    print("Fixed admin inject")
else:
    print("No change")
