# Fix instrumentation.ts - no await since startupCheck is void now
with open("src/instrumentation.ts", "w", encoding="utf8") as f:
    f.write('''export function register() {
  const { startupCheck } = require("@/lib/logger");
  startupCheck();
}
''')
print("Fixed instrumentation.ts")
