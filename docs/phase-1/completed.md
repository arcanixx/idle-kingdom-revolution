# Phase 1: Core Game Loop — Current State

> Documented '2026-06-24' after initial Phase 1 implementation pass.

## Overview
Phase 1 covers P1-01 (Auth) through P1-16 (Leaderboard/Score). Only P1-01 has received implementation effort so far. Items P1-02 through P1-16 remain untouched.

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

---

## P1-01 — Remaining Items
- [ ] Player profile auto-creation trigger applied to DB (SQL exists, may not be deployed)
- [ ] Netlify deploy + browser testing
- [ ] Redirect to /login when unauthenticated (proxy handles this but needs full test)

---

## P1-02 through P1-16 — Untouched
These sub-phases have not received implementation work:
- P1-02: Game API stubs
- P1-03: Battle system
- P1-04: Army system
- P1-05: Mining system
- P1-06: Tower Defense system
- P1-07: Castle system
- P1-08: Player stats / leveling
- P1-09: Economy / resources
- P1-10: Skill system
- P1-11: Quests & achievements
- P1-12: Inventory & items
- P1-13: Shop / marketplace
- P1-14: Notifications & events
- P1-15: Leaderboard / score
- P1-16: Onboarding / tutorial

---

## Known Issues
- SWC native binary broken on this Win32 machine (uses WASM fallback)
- Build requires --webpack flag (webpack instead of the default Turbopack)
- Workspace root detection picks C:\Users\Administrator\package-lock.json (set outputFileTracingRoot in next.config to silence warning)
- All read/write/edit filesystem tools broken (use bash+python+PowerShell workaround)
- Add (auth) route group to route map properly (currently /login and /register accessible but not under (auth) group route)