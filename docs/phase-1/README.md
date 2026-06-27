# Phase 1: Core Game Loop — Current Status

> Last updated: 2026-06-27
> See `docs/phase-1/completed.md` for detailed task-by-task breakdown.

## Overview
Phase 1 covers P1-01 (Auth) through P1-16 (Performance). Work is **partially complete** — see checklist below.

## Status Summary

| Area | Status | Key Files |
|------|--------|-----------|
| P1-01 Auth | ✅ Done | (auth)/login, register, proxy.ts, use-user |
| P1-02 Player profile | ✅ Done | /api/player/profile, lib/game/leveling.ts |
| P1-03 Battle engine | ✅ Done | lib/game/battle-engine.ts, /api/battle/* |
| P1-04 Formation grid | 🔄 In progress | Game page exists, /api/army/formation done |
| P1-05 Unit classes | ⏳ Pending | — |
| P1-06 Battle UI | ⏳ Pending | — |
| P1-07 Battle fields | ✅ Done | 4 fields, /api/game/fields |
| P1-08 Army management | 🔄 In progress | /api/player/units, formation editor |
| P1-09 Unit leveling | ✅ Done | lib/game/leveling.ts + tests |
| P1-10 Equipment | ⏳ Pending | — |
| P1-11 Settings | ⏳ Pending | — |
| P1-12 Auto-save | ⏳ Pending | — |
| P1-13 Admin panel | ⏳ Pending | — |
| P1-14 Battle tests | ✅ Done | tests/unit/game/battle-engine.test.ts |
| P1-15 E2E tests | ⏳ Pending | — |
| P1-16 Performance | ⏳ Pending | — |
| P1-006 Logger | ✅ Done | src/lib/logger.ts, 18+ files |

## Recent Fixes (2026-06-27)
- Created SeededRNG (`src/lib/game/rng.ts`) — battle is now deterministic
- Created `POST /api/army/formation` — saves formation to DB
- Created `GET /api/game/quests`, `shops`, `achievements` — catalog endpoints
- Fixed `calcOfflineEarnings` — XP now uses `Math.max(1, highestWave)`
- Added HSTS + Permissions-Policy security headers
- Switched netlify.toml from `--webpack` to Turbopack
- Fixed `playwright.config.ts` — `npm` → `bun`
- Reorganized AI documentation structure (AI_INSTRUCTIONS_GLOBAL/PROJECT, redirect files)

## Remaining Work
- P1-05, P1-06, P1-10, P1-11, P1-12, P1-13, P1-15, P1-16: not started
- Unit/component/E2E tests for remaining areas
- i18n coverage (many UI strings untranslated)
- Components.json style fix (base-nova → new-york)
- Missing @radix-ui dependencies
- README.md update with accurate setup info
