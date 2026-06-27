c = open("src/lib/logger.ts", encoding="utf8").read()
old = c

c = c.replace(
    'export async function startupCheck(): Promise<void> {\n'
    '  if (startupDone || typeof window !== "undefined") return;\n'
    "  startupDone = true;\n"
    "  try {\n"
    '    const url = "http://localhost:3000/api/logs?limit=3" + "&level=ERROR";\n'
    "    const r = await fetch(url);\n"
    "    if (!r.ok) return;\n"
    "    const d = await r.json();\n"
    "    if (d.count > 0) {\n"
    '      console.warn("\\u001b[33m[IKR STARTUP] Found " + d.count + " recent error(s) in logs/:\\u001b[0m");\n'
    "      for (const err of d.errors || []) {\n"
    '        console.warn("  \\u001b[31m" + err.file + "\\u001b[0m: " + err.content.slice(0, 200).replace(/\\n/g, " "));\n'
    "      }\n"
    "    } else {\n"
    '      console.info("\\u001b[32m[IKR STARTUP] No recent errors in logs/\\u001b[0m");\n'
    "    }\n"
    "  } catch {\n"
    "    // skip\n"
    "  }\n"
    "}\n\n",
    'export function startupCheck(): void {\n'
    '  if (startupDone || typeof window !== "undefined") return;\n'
    "  startupDone = true;\n"
    "  setTimeout(async () => {\n"
    "    try {\n"
    '      const ac = new AbortController();\n'
    "      setTimeout(() => ac.abort(), 3000);\n"
    '      const url = "http://localhost:3000/api/logs?limit=3" + "&level=ERROR";\n'
    "      const r = await fetch(url, { signal: ac.signal });\n"
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
    "  }, 5000);\n"
    "}\n\n"
)

if c != old:
    with open("src/lib/logger.ts", "w", encoding="utf8") as f:
        f.write(c)
    print("Fixed startupCheck")
else:
    print("No change")
