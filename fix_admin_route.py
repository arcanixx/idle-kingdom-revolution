c = open("src/app/api/admin/lookup/route.ts", encoding="utf8").read()
old = c

c = c.replace(
  'const { data: users, error: uErr } = await adminClient.from("users").select("id, email").eq("email", email).maybeSingle();',
  'const { data: userData, error: uErr } = await adminClient.from("users").select("id, email").eq("email", email).maybeSingle();'
)
c = c.replace(
  'if (uErr || !users) return errorResponse("User not found", 404);',
  'if (uErr || !userData) return errorResponse("User not found", 404);'
)
c = c.replace(
  'return jsonResponse({ user: users, player });',
  'return jsonResponse({ user: userData, player });'
)

if c != old:
    with open("src/app/api/admin/lookup/route.ts", "w", encoding="utf8") as f:
        f.write(c)
    print("Fixed variable name conflict")
else:
    print("No change")
