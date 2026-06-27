c = open("src/lib/logger.ts", encoding="utf8").read()
old = c

c = c.replace(
  "const emailTransport: LogTransport = (entry) => {\n  if (entry.level !== \"ERROR\") return;\n  fetch(\"/api/logs\", {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify(entry),\n  }).catch(() => {\n    /* silent fail - don't loop on logger errors */\n  });\n};",
  """const fileTransport: LogTransport = (entry) => {
  if (entry.level === "DEBUG" && currentLevel !== "DEBUG") return;
  fetch("/api/logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  }).catch(() => {
    /* silent fail - don't loop on logger errors */
  });
};"""
)

c = c.replace(
  "const transports: LogTransport[] = [consoleTransport];\nif (currentLevel !== \"DEBUG\") {\n  transports.push(emailTransport);\n}",
  "const transports: LogTransport[] = [consoleTransport, fileTransport];"
)

if c != old:
    with open("src/lib/logger.ts", "w", encoding="utf8") as f:
        f.write(c)
    print("Updated logger.ts")
else:
    print("No change")
