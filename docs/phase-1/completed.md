# Phase 1: Core Game Loop — Current State

> Documented '2026-06-24' after initial Phase 1 implementation pass.
> Updated '2026-06-24' (same day, later pass) after a documentation/code audit — see "2026-06-24 Audit Update" section near the bottom for what changed and why several items below were corrected.

## Overview
Phase 1 covers P1-01 (Auth) through P1-16 (Leaderboard/Score). P1-01 through roughly P1-07 have received real implementation effort (see corrected "Untouched" list below — the original version of this document undercounted what was actually built).

---



## P1-02/03 Battle System — Done
- [x] Tick-based battle engine (src/lib/game/battle-engine.ts)
- [x] Enemy templates with wave scaling
- [x] Boss fights every 5 waves
- [x] POST /api/battle/start — runs full battle sim
- [x] /game/battle — connected to API, shows real logs + rewards

## P1-02 Game API — Done
- [x] GET /api/game/units — game unit catalog
- [x] GET /api/game/fields — battle fields
- [x] GET /api/game/items — game items
- [x] GET /api/player/profile — player data
- [x] PATCH /api/player/profile — update profile
- [x] GET /api/player/units — player units
- [x] src/lib/supabase/api-helper.ts — reusable API utilities
- [x] src/types/game.ts — Formation, BattleResultData types added

## Schema Fixes
- [x] 003 migration: creates game_units, game_items, game_battle_fields, game_quests tables
- [x] 003 migration: adds RLS, policies, triggers
- [x] 003 migration: offline_earnings_cap_hours column fix
- [x] Remaining schema bug: 001 references missing tables — now fixed

## P1-01 Auth System — Done Items

### Login (/login)
- [x] Email + password form
- [x] Loading state (button shows "Signing in...")
- [x] Error display on failure
- [x] Redirect to /dashboard on success
- [x] Forgot password link (calls supabase.auth.resetPasswordForEmail)
- [x] Guest mode button (uses supabase.auth.signInAnonymously)
- [x] Divider (or separator) between login form and guest option

### Register (/register)
- [x] Email + password + display name form
- [x] Loading state
- [x] Error display
- [x] Success message (check your email)
- [x] Link back to /login

### Dashboard (/dashboard)
- [x] Dynamic welcome (displays user display_name or email)
- [x] Sign out button (calls supabase.auth.signOut, redirects to /)
- [x] useUser hook integration
- [x] Resource cards (Gold, Elixir, Knowledge, Daily Market)
- [x] Game link cards (Battle, Army, Mining, Tower Defense, Castle)

### Auth Infrastructure
- [x] Proxy (src/proxy.ts) handles protected route redirects
- [x] Lazy Supabase client init (useEffect) avoids prerender issues
- [x] middleware.ts removed (Next.js 16 uses proxy.ts natively)
- [x] DB trigger SQL (002_auth_triggers.sql) for auto-creating player_profile
- [x] (auth) route group — CONFIRMED DONE on 2026-06-24 audit. src/app/(auth)/login/ and src/app/(auth)/register/ both exist under the group. The "Known Issues" line below claiming this was still pending was stale and has been removed.

---

## P1-01 — Remaining Items
- [ ] Player profile auto-creation trigger applied to DB (SQL exists, may not be deployed)
- [ ] Netlify deploy + browser testing
- [ ] Redirect to /login when unauthenticated (proxy handles this but needs full test)

---

## P1-02 through P1-16 — Corrected Status (2026-06-24 audit)

The original version of this section listed P1-02 through P1-16 as entirely "untouched." That was not accurate as of this audit — src/app/api/ and src/app/game/ already contain real work for several of these. Corrected status:

- P1-02: Game API stubs — DONE (see above)
- P1-03: Battle system — DONE (see above)
- P1-04: Army system — PARTIAL. Page exists (src/app/game/army/), GET /api/player/units and /api/player/formation exist, but POST /api/army/formation (the save-formation endpoint) is a folder with no route.ts. Likely blocks actually saving a new formation from the UI.
- P1-05: Mining system — PARTIAL. /api/mining/expedition and /api/mining/status exist; page exists.
- P1-06: Tower Defense system — PARTIAL. /api/td/status exists; page exists; /api/td/wave (folder, no route.ts) is missing — likely blocks actually playing a TD wave from the UI.
- P1-07: Castle system — PARTIAL. /api/castle/status exists; page exists; /api/castle/defend (folder, no route.ts) is missing — likely blocks the core castle-defense action.
- P1-08: Player stats / leveling — PARTIAL. src/lib/game/leveling.ts exists with calculateLevel/addXp/calcPower, now unit-tested (tests/unit/game/leveling.test.ts). No dedicated API route audited beyond /api/player/profile.
- P1-09: Economy / resources — PARTIAL. src/lib/game/economy.ts exists (calcRewards, calcOfflineEarnings), now unit-tested (tests/unit/game/economy.test.ts). /api/player/offline-earnings exists.
- P1-10: Skill system (valor trees) — PARTIAL. src/lib/game/valor-trees.ts defines the 3 trees (combat_mastery, economy_mastery, quality_of_life) and /api/player/valor exists. Not yet unit-tested (mostly static data, lower priority than battle/economy/leveling).
- P1-11: Quests & achievements — PARTIAL. /api/player/quests and /api/player/achievements exist; GET /api/game/quests (catalog endpoint, folder exists, no route.ts) is missing.
- P1-12: Inventory & items — PARTIAL. /api/player/inventory and /api/game/items exist.
- P1-13: Shop / marketplace — PARTIAL. /api/shop exists; GET /api/game/shops (folder, no route.ts) is missing — unclear if /api/shop alone covers this or if game/shops was meant to be the catalog vs /api/shop the purchase action. Worth clarifying intent before writing the missing route.
- P1-14: Notifications & events — UNTOUCHED. /api/player/mail exists (mail system) but no dedicated notifications/events system found.
- P1-15: Leaderboard / score — PARTIAL. /api/leaderboard exists; page exists.
- P1-16: Onboarding / tutorial — UNTOUCHED. No dedicated route or component found in this audit.

**Net takeaway:** most Phase 1 sub-systems have a working read path (GET endpoints + pages render) but several are missing the write/action endpoint that makes the page actually playable end-to-end:
- POST .../api/army/formation
- POST .../api/battle/tick (if turn-by-turn ticking from the client is still the intended design, vs. the current full-sim-in-one-call approach in /api/battle/start)
- POST .../api/castle/defend
- POST .../api/td/wave
- GET .../api/game/quests, .../api/game/shops, .../api/game/achievements (catalog endpoints, separate from the player-specific ones that do exist)

These are the most actionable next backend tasks — each one likely unblocks a page that already renders but can't complete its core action yet.

---

## Known Issues
- SWC native binary broken on this Win32 machine (uses WASM fallback)
- Build requires --webpack flag (webpack instead of the default Turbopack)
- Workspace root detection picks C:\Users\Administrator\package-lock.json (set outputFileTracingRoot in next.config to silence warning)
- All read/write/edit filesystem tools broken (use bash+python+PowerShell workaround)
- src/app/(game)/ route group exists but is completely empty (dead folder). Real game pages live under src/app/game/ without a route group. Either delete (game) or move pages into it for consistency — currently just clutter, not a bug.
- vitest was present as a working binary in node_modules/.bin but was NOT declared in package.json or bun.lock until the 2026-06-24 audit fixed this. A fresh `bun install --frozen-lockfile` before that fix would not have installed vitest at all, silently breaking `bun run test` in CI/for new contributors.
- battle-engine.ts's processTick() uses Math.random() directly with no seed or injectable RNG, despite docs/phase-1/README.md describing battle results as "reproducible (same seed) - deterministic." Battles are NOT currently deterministic. If determinism is actually required (e.g. for replay/anti-cheat/testing), the RNG needs to be seeded and threaded through explicitly.
- startBattle() in battle-engine.ts filters player units by `pu.isActive`, but the Unit interface in src/types/game.ts has no `isActive` field. Any real Unit object passed in has `isActive === undefined` (falsy), so it is silently dropped from the battle roster. Either add `isActive` to the Unit type (and make sure it's populated from the DB/store), or remove this check if all units passed to startBattle are already pre-filtered to active ones.
- calcOfflineEarnings() in economy.ts protects `gold` against highestWave <= 0 via Math.max(1, highestWave), but does not apply the same protection to `xp`, which uses raw `highestWave`. A player with highest_wave 0 or negative gets 0 or negative offline xp while still getting positive gold. Likely an oversight — worth a one-line fix (Math.max(1, highestWave) in the xp calculation too) once confirmed unintentional.

## 2026-06-24 Audit Update

During a documentation + code consistency pass, the following was added/fixed:
- Added tests/unit/game/economy.test.ts, leveling.test.ts, battle-engine.test.ts (Vitest) covering the previously-untested deterministic game logic. These also document (via explicit tests, not just comments) the known issues listed above rather than silently working around them.
- Fixed vitest.config.ts to declare the `@` path alias (Vitest doesn't read tsconfig.json paths automatically), so `import ... from "@/lib/game/..."` works in tests.
- Added `typecheck`, `test`, and `test:watch` scripts to package.json. Verified `npm run typecheck` passes cleanly against the current codebase (2026-06-24).
- Added `vitest` as an explicit devDependency (was previously an undeclared, accidentally-working binary — see Known Issues above).
- Updated .github/workflows/ci.yml to run typecheck (blocking) and unit tests (blocking) and a non-blocking `bun pm audit` step, in addition to the pre-existing file-check and webpack build steps.
- Rewrote docs/plan/29_DEPLOYMENT_GUIDE.json: fixed broken JSON syntax (stray escaped quotes in the accounts list), reconciled it against the actual bun-based/Next.js 16 toolchain (it previously assumed npm + create-next-app + shadcn + Playwright, none of which fully match reality), and added a rollback_procedure section (frontend via Netlify instant rollback / git revert, database via Supabase PITR + a pre-migration risk checklist) that did not exist before.
- Corrected the P1-02 through P1-16 status list above, which previously undercounted completed/partial work.
- Corrected this file's claim that the (auth) route group was still pending — it is done.
