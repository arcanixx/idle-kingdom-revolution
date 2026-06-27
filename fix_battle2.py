c = open("src/app/api/battle/start/route.ts", encoding="utf8").read()
old = c

c = c.replace(
    "const { data: player, error: pErr } = await supabase\n      .from(\"players\").select(\"id, gold, xp, level, highest_wave, highest_field_id, total_battles, total_wins\").eq(\"user_id\", user.id).maybeSingle();",
    "let { data: player, error: pErr } = await supabase\n      .from(\"players\").select(\"id, gold, xp, level, highest_wave, highest_field_id, total_battles, total_wins\").eq(\"user_id\", user.id).maybeSingle();"
)

if c != old:
    with open("src/app/api/battle/start/route.ts", "w", encoding="utf8") as f:
        f.write(c)
    print("Fixed const -> let")
else:
    print("No change")
