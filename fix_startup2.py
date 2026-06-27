c = open("src/lib/logger.ts", encoding="utf8").read()
old = c

c = c.replace(
    'export function startupCheck(): void {\n'
    '  if (startupDone || typeof window !== \"undefined\") return;\n'
    "  startupDone = true;\n"
    "  setTimeout(async () => {\n"
    "    try {\n"
    '      const ac = new AbortController();\n'
    "      setTimeout(() => ac.abort(), 3000);\n"
    '      const url = \"http://localhost:3000/api/logs?limit=3\" + \"&level=ERROR\";\n'
    "      const r = await fetch(url, { signal: ac.signal });\n"
    "      if (!r.ok) return;\n"
    "      const d = await r.json();\n"
    "      if (d.count > 0) {\n"
    '        console.warn(\"[IKR STARTUP] Found \" + d.count + \" recent error(s) in logs/\");\n'
    "        for (const err of d.errors || []) {\n"
    '          console.warn(\"  [ERROR] \" + err.file + \": \" + err.content.slice(0, 200).replace(/\\n/g, \" \"));\n'
    "        }\n"
    "      } else {\n"
    '        console.info(\"[IKR STARTUP] No recent errors in logs/\");\n'
    "      }\n"
    "    } catch {\n"
    "      // server not ready yet\n"
    "    }\n"
    "  }, 5000);\n"
    "}\n\n",
    'export function startupCheck(): void {\n'
    '  if (startupDone || typeof window !== "undefined") return;\n'
    "  startupDone = true;\n"
    '  console.info("[IKR STARTUP] Checking logs/ for recent errors...");\n'
    "  setTimeout(async () => {\n"
    "    try {\n"
    '      const ac = new AbortController();\n'
    "      setTimeout(() => ac.abort(), 2000);\n"
    "      const r = await fetch(\"/api/logs?limit=3&level=ERROR\", { signal: ac.signal });\n"
    "      if (!r.ok) return;\n"
    "      const d = await r.json();\n"
    "      if (d.count > 0) {\n"
    '        console.warn("[IKR STARTUP] Found " + d.count + " recent error(s) in logs/");\n'
    "        for (const err of d.errors || []) {\n"
    '          console.warn("  [ERROR] " + err.file + ": " + err.content.slice(0, 200).replace(/\\n/g, " "));\n'
    "        }\n"
    "      } else {\n"
    '        console.info("[IKR STARTUP] No recent errors in logs/");\n'
    "      }\n"
    "    } catch {\n"
    "      // server not ready yet\n"
    "    }\n"
    "  }, 2000);\n"
    "}\n\n"
)

if c != old:
    with open("src/lib/logger.ts", "w", encoding="utf8") as f:
        f.write(c)
    print("Fixed startupCheck timing and URL")
else:
    print("No change")
