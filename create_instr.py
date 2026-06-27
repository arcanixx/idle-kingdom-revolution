content = """export async function register() {
  const { startupCheck } = await import("@/lib/logger");
  await startupCheck();
}
"""
with open("src/instrumentation.ts", "w", encoding="utf8") as f:
    f.write(content)
print("Created instrumentation.ts")
