# Idle Kingdom Revolution

Idle RPG with tactical formation battles, resource management, and progression systems.

## Tech Stack
- Next.js 16 + TypeScript 5 (strict)
- Tailwind CSS + shadcn/ui
- Supabase (PostgreSQL + Auth + Realtime)
- Zustand 5 + TanStack Query 5
- Vitest + Playwright
- next-intl (i18n)
- lucide-react (icons)

## Prerequisites
- [Bun](https://bun.sh) (v1.2+) — package manager
- Supabase project (local or remote)

## Development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server (Turbopack) |
| `bun run build` | Production build |
| `bun run typecheck` | TypeScript type checking |
| `bun run test` | Run unit tests (Vitest) |
| `bun run test:e2e` | Run E2E tests (Playwright) |
| `bun run lint` | ESLint |

## Project Structure

```
src/
  app/            Next.js App Router
  components/     React components
  hooks/          Custom React hooks
  lib/            Business logic, API helpers, validation
  stores/         Zustand state stores
  types/          TypeScript type definitions
docs/
  plan/           Planning documents (JSON)
  assets/         Asset generation docs
  phase-1/        Phase 1 specs and status
```

## Environment Variables

Copy `.env.example` (if available) or configure:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `NEXT_PUBLIC_LOG_LEVEL` | Logger level (DEBUG/INFO/WARN/ERROR) |

## Build Notes

- Turbopack is the default bundler (Next.js 16 native)
- On Windows with broken SWC, use `bun run build --webpack` as fallback
- Bun is required — do not use npm

## Deployment

The project is configured for Netlify:
- Build command: `bun run build`
- Publish directory: `.next`

## AI Instructions

- `AI_INSTRUCTIONS_GLOBAL.md` — general AI rules (cross-project)
- `AI_INSTRUCTIONS_PROJECT.md` — project-specific info
- IDE-specific redirect files point to the above two
