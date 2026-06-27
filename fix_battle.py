c = open("src/app/api/battle/start/route.ts", encoding="utf8").read()
old = c

# Replace the player check + error with auto-creation
c = c.replace(
    "const { data: player, error: pErr } = await supabase\n      .from(\"players\").select(\"id, gold, xp, level, highest_wave, highest_field_id, total_battles, total_wins\").eq(\"user_id\", user.id).maybeSingle();\n    if (pErr || !player) return errorResponse(\"Player not found\", 404);",
    "const { data: player, error: pErr } = await supabase\n      .from(\"players\").select(\"id, gold, xp, level, highest_wave, highest_field_id, total_battles, total_wins\").eq(\"user_id\", user.id).maybeSingle();\n    if (pErr || !player) {\n      if (!pErr) {\n        const { data: newPlayer, error: npErr } = await supabase\n          .from(\"players\").insert({ user_id: user.id, display_name: user.email?.split(\"@\")[0] || \"Adventurer\" }).select(\"id, gold, xp, level, highest_wave, highest_field_id, total_battles, total_wins\").maybeSingle();\n        if (npErr || !newPlayer) return errorResponse(\"Failed to create player\", 500);\n        player = newPlayer;\n      } else {\n        return errorResponse(\"Player lookup failed\", 500);\n      }\n    }"
)

if c != old:
    with open("src/app/api/battle/start/route.ts", "w", encoding="utf8") as f:
        f.write(c)
    print("Fixed battle route with auto-create")
else:
    print("No change")
