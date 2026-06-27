c = open("src/app/layout.tsx", encoding="utf8").read()
old = c

# Add startupCheck import after other imports
import_line = 'import { BottomNav } from "@/components/BottomNav";'
replacement = import_line + '\nimport { startupCheck } from "@/lib/logger";\nstartupCheck();'
c = c.replace(import_line, replacement)

if c != old:
    with open("src/app/layout.tsx", "w", encoding="utf8") as f:
        f.write(c)
    print("Added startupCheck to layout")
else:
    print("No change")
