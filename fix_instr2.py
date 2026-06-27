with open("src/instrumentation.ts", "w", encoding="utf8") as f:
    f.write('export function register() {\n')
    f.write('  const { startupCheck } = require("@/lib/logger");\n')
    f.write('  startupCheck();\n')
    f.write('}\n')
print("Fixed instrumentation.ts")
