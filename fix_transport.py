c = open("src/lib/logger.ts", encoding="utf8").read()
old = c

c = c.replace(
  "const fileTransport: LogTransport = (entry) => {\n  if (entry.level === \"DEBUG\" && currentLevel !== \"DEBUG\") return;\n  fetch(\"/api/logs\", {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify(entry),\n  }).catch(() => {\n    /* silent fail - don't loop on logger errors */\n  });\n};",
  "const fileTransport: LogTransport = (entry) => {\n  if (entry.level === \"DEBUG\" && currentLevel !== \"DEBUG\") return;\n  if (typeof window === \"undefined\") return;\n  try {\n    const payload = JSON.stringify(entry);\n    if (payload.length > 10000) return;\n    fetch(\"/api/logs\", { method: \"POST\", headers: { \"Content-Type\": \"application/json\" }, body: payload })\n      .catch(() => {});\n  } catch {}\n};"
)

if c != old:
    with open("src/lib/logger.ts", "w", encoding="utf8") as f:
        f.write(c)
    print("Fixed fileTransport")
else:
    print("No change")
