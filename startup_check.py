c = open("src/lib/logger.ts", encoding="utf8").read()
old = c

# Add startup check function at the end before the export
c = c.replace(
  'export const logger = {',
  '''let startupDone = false;

export async function startupCheck(): Promise<void> {
  if (startupDone || typeof window !== "undefined") return;
  startupDone = true;
  try {
    const r = await fetch("http://localhost:3000/api/logs?limit=3&level=ERROR");
    if (!r.ok) return;
    const d = await r.json();
    if (d.count > 0) {
      console.warn("\\u001b[33m[IKR STARTUP] Found " + d.count + " recent error(s) in logs/:\\u001b[0m");
      for (const err of d.errors || []) {
        console.warn("  \\u001b[31m" + err.file + "\\u001b[0m: " + err.content.slice(0, 200).replace(/\\n/g, " "));
      }
    } else {
      console.info("\\u001b[32m[IKR STARTUP] No recent errors in logs/\\u001b[0m");
    }
  } catch {
    // Server might not be ready yet - skip startup check silently
  }
}

export const logger = {'''

if c != old:
    with open("src/lib/logger.ts", "w", encoding="utf8") as f:
        f.write(c)
    print("Added startupCheck to logger.ts")
else:
    print("No change")
