# AI_INSTRUCTIONS_PROJECT.md

> Strictly **project-specific** information for AI agents working on this project.
> For **general AI rules** (cross-project), see `AI_INSTRUCTIONS_GLOBAL.md`.
> For **detailed planning**, see `docs/plan/`.

---

## Project Identity

| Field | Value |
|-------|-------|
| Name | Idle Kingdom Revolution |
| Code | IKR |
| Phase | 1 (Core Game Loop) — partially implemented |
| Package Manager | **Bun** (NOT npm) |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 + React 19 + TypeScript 5 (strict) |
| Styling | Tailwind CSS + shadcn/ui (base-nova) |
| State | Zustand 5 + TanStack Query 5 (installed, not active) |
| Backend | Supabase (PostgreSQL + Auth + Realtime) |
| Auth | @supabase/ssr (createBrowserClient / createServerClient) |
| Testing | Vitest + @testing-library/react + Playwright |
| Build | Turbopack (default), `next build --webpack` fallback on Windows |
| Deploy | Netlify |
| CI/CD | GitHub Actions (bun-based) |
| i18n | next-intl (locales in src/locales/) |
| Icons | lucide-react (NOT emoji, NOT hardcoded) |
| Logger | @/lib/logger (centralny, 4 poziomy: DEBUG/INFO/WARN/ERROR) |

## Architecture Decisions

- **App Router** — all pages in `src/app/`
- **Route groups**: `(auth)/` for login/register, `game/` for game pages
- **Proxy** instead of middleware: `src/proxy.ts` (Next.js 16 native)
- **Server Components** by default, Client Components (`"use client"`) when interaction needed
- **API Routes** in `src/app/api/` for I/O, auth, mutations
- **Logger**: MUST be in EVERY file. NEVER `console.log`.
- **Battle model**: Client simulates, server verifies via action log
- **Zod**: for request validation only, NOT for logging

## Directory Structure

```
src/
  app/              Next.js App Router
    (auth)/         Login, Register pages
    api/            API route handlers (battle, castle, mining, player, td, shop, game)
    game/           Game pages (battle, army, mining, td, quests, valor, castle, etc.)
  components/       React components
  hooks/            Custom hooks (use-user, use-game-data)
  lib/
    api/            Validation middleware (withErrorHandler, withValidatedRequest)
    game/           Business logic (battle-engine, economy, leveling, valor-trees)
    supabase/       Supabase client factories
    validation/     Zod schemas
  stores/           Zustand stores (game-store)
  types/            TypeScript definitions (game.ts)
docs/
  assets/           Asset generation documentation
  phase-0/          Phase 0 summary
  phase-1/          Phase 1 specs and status
  plan/             33 planning documents (JSON)
```

## Current Phase

**Phase 1: Core Game Loop** (partially implemented)

| Task | Status |
|------|--------|
| P1-01 Auth system | Done |
| P1-02 Player profile | Done |
| P1-03 Battle engine | Done |
| P1-04 Formation grid | In progress |
| P1-05 Unit classes | Pending |
| P1-06 Battle UI | Pending |
| P1-07 Battle fields | Done |
| P1-08 Army management | In progress |
| P1-09 Unit leveling | Done |
| P1-10 Equipment | Pending |
| P1-11 Settings | Pending |
| P1-12 Auto-save | Pending |
| P1-13 Admin panel | Pending |
| P1-14 Battle tests | Done |
| P1-15 E2E tests | Pending |
| P1-16 Performance | Pending |
| P1-006 Logger | Done |

Full checklist: `docs/plan/21_IMPLEMENTATION_CHECKLIST.json`

## Key Rules

1. **Logger in every file**: `import { logger } from '\''@/lib/logger'\''` — see `docs/plan/03_AI_RULES.json` for detailed rules
2. **Bun only**: `bun dev`, `bun run typecheck`, `bun run test`, `bun run lint`
3. **File headers**: Every file needs path, purpose, dependencies, exports
4. **No hardcoded icons**: Use `lucide-react`. No emoji in production code.
5. **No console.log**: Always the logger. Zero exceptions.
6. **Tests after features**: Every new/modified logic needs tests
7. **Docs must stay current**: Update `docs/plan/` when things change
8. **Windows SWC fix**: Use `next build --webpack` if SWC errors

## Naming Conventions

- Files: `kebab-case.ts`
- Components: `PascalCase.tsx`
- Hooks: `camelCase` with `use` prefix
- Stores: `camelCase` with `Store` suffix
- Types: `PascalCase` (no I prefix)
- Constants: `UPPER_SNAKE_CASE`
- DB tables: `snake_case`, plural
- DB columns: `snake_case`

## TypeScript

- `strict: true`, `noImplicitAny: true`, `strictNullChecks: true`
- `@/*` maps to `./src/*`
- All exported functions: explicit return type
- Never `any` — define a proper interface
- `noUnusedLocals: "error"`

## Key Documents in docs/plan/

| File | Content |
|------|---------|
| `00_PROJECT_OVERVIEW.json` | Project scope and goals |
| `03_AI_RULES.json` | AI collaboration rules (detailed) |
| `18_GRAPHICS_ASSET_PLAN.json` | Asset production overview |
| `21_IMPLEMENTATION_CHECKLIST.json` | Task tracking |
| `30_DEVELOPMENT_STANDARDS.json` | Code standards + error handling |

## IDE Redirects

This project uses individual redirect files in root for each AI IDE:
- `AGENTS.md` — OpenCode Desktop
- `CLAUDE.md` — Claude Desktop
- `.clinerules` — Cline
- `.cursorrules` — Cursor
- `.coderules` — Codex
- `VSCODE.md` — VSC
- `KILOCODE.md` — Kilo Code
- `ANTIGRAVITY.md` — Antigravity

All redirect to `AI_INSTRUCTIONS_GLOBAL.md` (general) + `AI_INSTRUCTIONS_PROJECT.md` (this file).
