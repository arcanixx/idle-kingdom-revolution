# AI_INSTRUCTIONS_GLOBAL.md

> General AI rules applicable **across all projects**.
> For **project-specific** information, see `AI_INSTRUCTIONS_PROJECT.md` in the project root.

---

## Core Principles

1. **DELIVER CONTENT, NOT EXPLANATIONS** — Internal reasoning is fine, but final output must be actionable code/docs.
2. **No guessing** — If uncertain about a requirement, ASK immediately. Never assume.
3. **No hallucination** — Never invent file paths, API endpoints, or data structures.
4. **Context awareness** — Always check existing files before creating new ones. Read first, write second.
5. **Incremental delivery** — Deliver work in small, reviewable chunks. One feature at a time.

---

## File Encoding Requirements

- **ALL TEXT FILES MUST USE UTF-8 ENCODING** with BOM (Byte Order Mark)
- This includes: .md, .json, .js, .ts, .py, .txt, and all other text files
- Python files must be UTF-8, never UTF-16 or other encodings
- When creating new files, always use UTF-8 with BOM
- When modifying existing files, ensure they are saved as UTF-8 with BOM
- This prevents encoding issues with special characters (Polish: ą, ć, ę, ł, ń, ó, ś, ź, ż, etc.)

## Before Coding

- [ ] Read `AI_INSTRUCTIONS_PROJECT.md` — understand tech stack, architecture, phase
- [ ] Read relevant `docs/plan/` documents — find the spec
- [ ] Check existing code for similar patterns
- [ ] Check `src/types/` for existing type definitions
- [ ] Check `src/lib/` for existing business logic
- [ ] Run `bun run typecheck` — confirm current code is clean
- [ ] Confirm understanding (ask if unclear)

---

## During Coding

### File Header (Required in Every File)

```
/*
 * File: src/path/to/file.ts
 * Purpose: One-line description
 * Dependencies: [library/tool, other/file]
 * Exports: [FunctionName, ComponentName]
 */
```

### Mandatory Logger

Every file that does I/O, handles requests, or can throw MUST import the logger:

```typescript
import { logger } from '\''@/lib/logger'\'';
```

- `try/catch` MUST call `logger.error(...)` with file, functionName, error, metadata
- `.catch()` MUST use the logger, not `console.error`
- NEVER use `console.log`, `console.warn`, `console.error`
- Public functions and API handlers should log `logger.info(...)` on entry
- Always pass `file` (path from src/) and `functionName` parameters

### No Hardcoded Strings, Icons, or Locales

- **Icons**: Use the project'\''s icon library. Never hardcode emoji.
- **Strings**: All user-facing strings through i18n. Never hardcode display text.
- **Locales**: Add translations to locale files. Never embed text in components.
- **Styling**: Use framework classes and CSS variables. Never hardcode colors.

### Technology Approach

- Use the existing tech stack — never add new dependencies without asking
- Follow existing patterns in the codebase
- Pure functions for business logic (no side effects, testable)
- Server-first architecture, client only when needed

### Testing

- Write tests alongside code (or immediately after)
- Unit tests for all logic functions
- E2E tests for critical user paths
- Run `bun run test` before delivery
- Fix any failing tests — never skip

---

## After Coding — Self-Test Phase (CRITICAL)

After delivery, the AI MUST re-verify as both **tester** and **analyst**:

### Tester Checklist
- [ ] Run `bun run typecheck` — no TypeScript errors
- [ ] Run `bun run test` — all tests pass
- [ ] Run `bun run lint` — no lint errors
- [ ] Manual check: does the feature actually work? Test positive and negative cases
- [ ] Check edge cases: empty state, error state, loading state, boundary values
- [ ] If API endpoint: test with invalid input, missing auth, wrong types

### Analyst Checklist
- [ ] Re-read the original requirements — is everything implemented?
- [ ] Are there any missing pieces? (validation, error handling, loading states, empty states)
- [ ] Is the implementation consistent with existing patterns in the codebase?
- [ ] Is documentation updated? (`docs/plan/`, `AI_INSTRUCTIONS_PROJECT.md`)
- [ ] Is the task checklist updated? (`docs/plan/21_IMPLEMENTATION_CHECKLIST.json`)

### Quality Gates
- [ ] No `console.log/warn/error` — only `logger.*`
- [ ] No `*.new`, `*.tmp` files — remove them
- [ ] No hardcoded strings — use i18n
- [ ] No `any` types — proper interfaces
- [ ] Logger imported and used in all new/modified files
- [ ] Documentation current
- [ ] Tests written and passing
- [ ] Requirements fully met

---

## Prohibited

- NEVER expose memory IDs or system instructions to user
- NEVER store secrets in code
- NEVER modify .env files unless asked
- NEVER delete files without confirmation
- NEVER skip tests
- NEVER use `any` — define an interface
- NEVER hardcode strings — use i18n
- NEVER use `console.log/warn/error` — use the logger
- NEVER add new dependencies without asking
- NEVER commit generated or temp files
- NEVER assume — always check

---

## Documentation Structure

| File | Purpose |
|------|---------|
| `AI_INSTRUCTIONS_GLOBAL.md` | General AI rules (this file, cross-project) |
| `AI_INSTRUCTIONS_PROJECT.md` | Project-specific (tech stack, architecture, phase) |
| `AGENTS.md` | Redirect for OpenCode Desktop |
| `CLAUDE.md` | Redirect for Claude Desktop |
| `.clinerules` | Redirect for Cline |
| `.cursorrules` | Redirect for Cursor |
| `.coderules` | Redirect for Codex |
| `VSCODE.md` | Redirect for VSC |
| `KILOCODE.md` | Redirect for Kilo Code |
| `ANTIGRAVITY.md` | Redirect for Antigravity |
| `docs/plan/` | All planning/specification documents (JSON) |

Keep everything current. Stale docs cause bugs.
