import glob
import re

# Fix all routes that use .single() on players table
files = [
    "src/app/api/battle/start/route.ts",
    "src/app/api/player/units/route.ts",
    "src/app/api/player/inventory/route.ts",
    "src/app/api/army/formation/route.ts",
    "src/app/api/battle/complete/route.ts",
    "src/app/api/castle/defend/route.ts",
    "src/app/api/castle/status/route.ts",
    "src/app/api/mining/expedition/route.ts",
    "src/app/api/mining/status/route.ts",
    "src/app/api/player/achievements/route.ts",
    "src/app/api/player/formation/route.ts",
    "src/app/api/player/mail/route.ts",
    "src/app/api/player/quests/route.ts",
    "src/app/api/player/valor/route.ts",
    "src/app/api/shop/buy/route.ts",
    "src/app/api/td/status/route.ts",
    "src/app/api/td/wave/route.ts",
]

count = 0
for fp in files:
    try:
        with open(fp, "r", encoding="utf8") as f:
            c = f.read()
        old = c
        # Replace .single() on players table with .maybeSingle()
        c = c.replace('from("players").select("id").eq("user_id", user.id).single()', 'from("players").select("id").eq("user_id", user.id).maybeSingle()')
        # Also fix the pattern in battle/start which has a longer select
        c = c.replace('.select("id, gold, xp, level, highest_wave, highest_field_id, total_battles, total_wins").eq("user_id", user.id).single()', '.select("id, gold, xp, level, highest_wave, highest_field_id, total_battles, total_wins").eq("user_id", user.id).maybeSingle()')
        # Fix pattern in shop/buy
        c = c.replace('.select("id, gold, gems").eq("user_id", user.id).single()', '.select("id, gold, gems").eq("user_id", user.id).maybeSingle()')
        # Fix pattern in battle/start for field query
        c = c.replace('.from("game_battle_fields").select("*").eq("id", data.fieldId).single()', '.from("game_battle_fields").select("*").eq("id", data.fieldId).maybeSingle()')
        if c != old:
            with open(fp, "w", encoding="utf8") as f:
                f.write(c)
            count += 1
            print("Fixed: " + fp.replace("src/app/api/", ""))
    except FileNotFoundError:
        pass

print(f"\nFixed {count} files")
