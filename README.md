# Idle Kingdom Revolution

Strategic idle game built with Next.js + Supabase + TypeScript.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3 + shadcn/ui
- **State:** Zustand (client) + TanStack Query (server)
- **Backend:** Supabase (PostgreSQL + Auth + Realtime)
- **Testing:** Vitest + React Testing Library
- **CI/CD:** GitHub Actions + Netlify

## Getting Started

```bash
# Install dependencies
bun install

# Run dev server
bun run dev

# Build (use --webpack flag, SWC binary not available on this platform)
bun run build

# Run tests
bun run test
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Project Structure

```
src/
  app/          # App Router pages
    (auth)/     # login, register
    dashboard/  # Main dashboard
    game/       # Game routes: battle, army, mining, td, castle
  lib/          # Shared utilities
    supabase/   # Supabase client, server, auth
  stores/       # Zustand stores
  components/   # Reusable components
tests/          # Test files
supabase/
  migrations/   # Database schema
  seed.sql      # Seed data
```

## Development Notes

- Build requires `--webpack` flag (Turbopack/SWC binary not available on win32-x64-msvc)
- TypeScript errors are ignored during build (`typescript.ignoreBuildErrors: true`)
- Use `bun install` instead of npm/npx to avoid network timeouts

## License

MIT
