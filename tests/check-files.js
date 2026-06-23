const assert = require("assert");
const fs = require("fs");

console.log("=== Phase 0 Build Check ===");

// Check required files exist
const required = [
  "next.config.ts",
  "tsconfig.json",
  "tailwind.config.ts",
  "postcss.config.mjs",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/lib/supabase/client.ts",
  "src/lib/supabase/server.ts",
  "src/proxy.ts",
  "public/manifest.json",
  "supabase/migrations/001_initial_schema.sql",
  "supabase/seed.sql",
  ".github/workflows/ci.yml",
  ".env.example",
];

let fail = false;
required.forEach((f) => {
  const ok = fs.existsSync(f);
  if (!ok) { console.log("  MISSING: " + f); fail = true; }
});

if (fail) {
  console.log("\nFAIL: Some required files are missing");
  process.exit(1);
} else {
  console.log("ALL REQUIRED FILES PRESENT");
}
