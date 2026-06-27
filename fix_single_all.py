import glob, re

files = [
    "src/app/api/player/valor/route.ts",
    "src/app/api/player/equip/route.ts",
    "src/app/api/player/unequip/route.ts",
    "src/app/api/player/profile/route.ts",
    "src/app/api/player/offline-earnings/route.ts",
    "src/app/api/battle/complete/route.ts",
    "src/app/api/castle/defend/route.ts",
    "src/app/api/mining/expedition/route.ts",
    "src/app/api/mining/status/route.ts",
    "src/app/api/td/wave/route.ts",
]

count = 0
for fp in files:
    try:
        with open(fp, "r", encoding="utf8") as f:
            c = f.read()
        old = c
        # Replace ALL .single() with .maybeSingle() in each file
        c = c.replace(".single()", ".maybeSingle()")
        if c != old:
            with open(fp, "w", encoding="utf8") as f:
                f.write(c)
            count += 1
            print("Fixed: " + fp.replace("src/app/api/", ""))
    except FileNotFoundError:
        pass

print(f"\nFixed {count} files")
