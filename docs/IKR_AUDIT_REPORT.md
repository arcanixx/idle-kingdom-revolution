# Idle Kingdom Revolution — Pełny Audyt Projektu
**Data:** 2026-06-25 | **Branch:** DEV | **Audytor:** Claude Sonnet 4.6  
**Perspektywa:** Senior Dev + Senior Tester + UX/UI + Business Analyst

---

## TL;DR — Stan projektu

| Obszar | Status | Priorytet naprawy |
|---|---|---|
| Baza danych (schemat) | 🔴 Krytyczny | P0 |
| i18n / lokalizacja | 🔴 Zły wzorzec | P0 |
| Krytyczne bugi w kodzie | 🔴 4 blokkery | P0 |
| API (kontrakt vs implementacja) | 🟠 Duże rozbieżności | P1 |
| Bezpieczeństwo | 🟠 Istotne luki | P1 |
| Tech stack (docs vs kod) | 🟡 Niezgodność | P1 |
| Testy | 🟡 Minimalne | P1 |
| UX / UI | 🟡 Placeholdery | P2 |
| Code quality | 🟡 Do poprawy | P2 |
| Dokumentacja | 🟡 Przestarzała | P2 |

---

## 🔴 P0 — BLOKERY (naprawić natychmiast)

### 1. Krytyczny bug: `supabase.rfc()` zamiast `.rpc()`
**Plik:** `src/app/api/player/offline-earnings/route.ts:18`  
```ts
// BŁĄD — metoda `.rfc` nie istnieje w @supabase/supabase-js
const { data: result, error: funcErr } = await supabase.rfc("claim_offline_earnings", {
```
**Efekt:** `/api/player/offline-earnings` zwraca 500 przy każdym wywołaniu. Dashboard nie może pokazać ani pobrać offline earnings. **Funkcja jest całkowicie zepsuta.**  
**Naprawa:** `supabase.rfc` → `supabase.rpc`

---

### 2. Krytyczny bug: `Unit.isActive` nie istnieje w typach
**Plik:** `src/lib/game/battle-engine.ts:53`, `src/types/game.ts`  
```ts
// battle-engine.ts sprawdza pole, które NIE istnieje w interfejsie Unit:
if (!pu || !pu.isActive) continue; // isActive === undefined → falsy → ZAWSZE pominięty
```
**Efekt:** W trybie startBattle() z formacją **żaden gracz nie wchodzi do walki**. Bitwy toczą się bez jednostek gracza → zawsze przegrana lub puste logi. Bug jest udokumentowany w `docs/phase-1/completed.md` ale NIE naprawiony.  
**Naprawa:** Dodać `isActive?: boolean` do interfejsu `Unit` w `src/types/game.ts` + upewnić się że API battle/start ustawia je na `true` (robi to już poprawnie).

---

### 3. Krytyczny bug: Schemat DB w migracji 003 zupełnie różny od seed + kodu
**Pliki:** `supabase/migrations/003_game_config_tables.sql` vs `supabase/seed.sql` vs API  

Migration 003 tworzy `game_units` z kolumnami:
```sql
id, name, description, icon, rarity, type, attack, defense, health, cost
```
Ale seed.sql wstawia dane z kolumnami:
```sql
name, name_pl, class, faction, rarity, base_hp, base_attack, base_defense, base_speed,
growth_hp, growth_attack, growth_defense, skill_data
```
API code (`/api/player/units`, `/api/battle/start`) używa:
`pu.game_units?.class`, `base_hp`, `base_attack`, `base_defense`, `base_speed`

**Efekt:** Na świeżej bazie (migration 003 + seed): seed FAIL z powodu brakujących kolumn. Nawet jeśli seed jakoś przeszedł, API zwróci `undefined` dla wszystkich statystyk jednostek → jednostki bez HP/ATK/DEF, domyślnie 100/10/10.  
**Naprawa:** Przepisać migration 003 żeby była zgodna z seed.sql i z tym, czego używa kod.

---

### 4. Krytyczny bug: Migracja 003 — zduplikowany CREATE TABLE + brakujący nawias
**Plik:** `supabase/migrations/003_game_config_tables.sql`  
```sql
-- game_battle_fields pojawia się DWIE RAZY, pierwsza definicja nie ma zamykającego )
CREATE TABLE IF NOT EXISTS public.game_battle_fields (
    ...
    updated_at TIMESTAMPTZ DEFAULT NOW()
  -- BRAKUJE: );
CREATE TABLE IF NOT EXISTS public.game_battle_fields ( -- DUPLIKAT
```
**Efekt:** Migracja nie parsuje się poprawnie. Na świeżym Supabase `supabase db push` się wysypie.

---

### 5. Krytyczny bug: Migration 001 ma FK do tabel, które nie istnieją w momencie jej uruchamiania
**Plik:** `supabase/migrations/001_initial_schema.sql`  
```sql
unit_id TEXT NOT NULL REFERENCES public.game_units(id),  -- game_units tworzone w 003
item_id TEXT NOT NULL REFERENCES public.game_items(id),  -- game_items tworzone w 003
```
**Efekt:** `supabase db push` od zera: 001 fail z powodu brakujących tabel referencyjnych. Projekt nie da się postawić na czystej bazie.  
**Naprawa:** Przenieść `game_units`, `game_items`, `game_battle_fields`, `game_quests` do osobnej migracji `000_game_catalog_tables.sql` lub na początek 001.

---

### 6. Antywzorzec i18n: `name_pl`, `description_pl` w kolumnach tabel
**Dotyczy:** `game_units`, `game_items`, `game_battle_fields`, `game_quests`, `game_achievements`, `game_shops` + seed.sql  

Obecny wzorzec:
```sql
name TEXT NOT NULL,
name_pl TEXT,          -- ← PROBLEM
description TEXT,
description_pl TEXT,  -- ← PROBLEM
```
**Problemy:**
- Każde nowe tłumaczenie (np. DE, FR, UK) = zmiana schematu DB + nowa migracja
- Admin panel musi obsługiwać N pól per tabela
- Duplikacja kolumn zamiast tabeli lokalizacji
- Narusza DRY, utrudnia content management

**Rekomendowane rozwiązanie — JSONB translations (minimalna ingerencja w istniejący schemat):**
```sql
-- Zamiast name_pl, description_pl:
translations JSONB NOT NULL DEFAULT '{"en": {"name": "...", "description": "..."}, "pl": {"name": "...", "description": "..."}}'
```
Alternatywa dla statycznych treści: locale files (`/public/locales/en.json`, `/public/locales/pl.json`) z kluczami po ID encji — wtedy DB nie przechowuje żadnego tekstu UI.

---

## 🟠 P1 — ISTOTNE PROBLEMY

### 7. API Contract vs rzeczywiste endpointy — kompletna niezgodność
`docs/plan/13_API_CONTRACT.json` definiuje zupełnie inną strukturę URL niż jest w kodzie:

| Kontrakt mówi | W kodzie jest |
|---|---|
| `GET /api/profile` | `GET /api/player/profile` |
| `PUT /api/profile` | `PATCH /api/player/profile` |
| `GET /api/army` | `GET /api/player/units` |
| `PUT /api/army/formation` | `PUT /api/player/formation` |
| `GET /api/quests` | `GET /api/player/quests` |
| `POST /api/shop/buy` | brak |
| `POST /api/battle/complete` | brak |
| `POST /api/quests/accept` | brak |
| `POST /api/quests/claim` | brak |
| `GET /api/admin/*` | brak (cały admin) |
| `GET /api/config` | brak |

**Efekt:** Kontrakt API jest de facto bezużyteczny jako dokumentacja — opisuje inny projekt. Frontend musi zgadywać.

---

### 8. Brakujące akcyjne endpointy blokujące gameplay
Strony istnieją ale nie można wykonać głównej akcji:

| Strona | Brakuje |
|---|---|
| `game/army` | `POST /api/army/upgrade` — nie można levelować jednostek |
| `game/castle` | `POST /api/castle/defend` — brakuje `route.ts` |
| `game/td` | `POST /api/td/wave` — brakuje `route.ts` |
| `game/battle` | `POST /api/battle/complete` — brak persystencji najwyższej fali |
| `game/quests` | `POST /api/quests/accept`, `POST /api/quests/claim` — brak |
| `game/shop` | `POST /api/shop/buy` — brak |
| admin | Cały admin panel — brak |

---

### 9. Luka bezpieczeństwa: PATCH /api/player/profile bez whitelist
**Plik:** `src/app/api/player/profile/route.ts`
```ts
// Przyjmuje DOWOLNE pole z body i zapisuje do DB:
const body = await request.json();
await supabase.from("players").update(body).eq("user_id", user.id)...
```
**Efekt:** Gracz może przez curl ustawić sobie `gold: 9999999999`, `level: 999`, `pvp_rating: 9999`, albo nawet próbować nadpisać `user_id` lub inne pola. Nie ma żadnej walidacji ani whitelisty pól.

---

### 10. Security: `typescript: { ignoreBuildErrors: true }` w next.config
**Plik:** `next.config.ts`  
Ukrywa błędy TypeScript podczas builda. CI przechodzi zielono nawet gdy są type errors. W projekcie opartym na TypeScript strict mode to zaprzeczenie całej strategii.

---

### 11. Tech stack — dokumentacja vs rzeczywistość
Plan (docs/plan/01_ARCHITECTURE.json) mówi, co jest zaimplementowane — **to jest niezgodne z prawdą**:

| Docs twierdzą | Rzeczywistość |
|---|---|
| Next.js 15 + Turbopack | Next.js 16 + Webpack (SWC broken) |
| Tailwind CSS 4.x | Tailwind 3.x |
| shadcn/ui | NIE zainstalowane |
| Framer Motion | NIE zainstalowane |
| next-pwa + Serwist | NIE zainstalowane |
| Redis/Upstash (rate limiting) | NIE zainstalowane |
| Playwright (E2E) | NIE zainstalowane |
| MSW (API mocking) | NIE zainstalowane |
| Prettier | NIE zainstalowane |
| `>80% test coverage` | ~5% (tylko 3 pliki game logic) |

---

### 12. PWA: brakujące ikony
**Plik:** `public/manifest.json`
```json
"icons": [
  { "src": "/icon-192.png", ... },
  { "src": "/icon-512.png", ... }
]
```
Pliki `icon-192.png` i `icon-512.png` **NIE ISTNIEJĄ** w `/public/`. PWA nie zainstaluje się poprawnie na żadnym urządzeniu mobilnym. Lighthouse score PWA: 0.

---

### 13. Schema mismatch: game_units.type vs code używa class
Migration 003 definiuje pole `type` z wartościami `'infantry', 'archer', 'cavalry', 'mage', 'siege'`.  
Seed.sql, API code, battle engine i `src/types/game.ts` używają pola `class` z wartościami `'warrior', 'ranger', 'mage', 'tank', 'healer', 'assassin', 'support'`.  
Są to dwa **zupełnie różne** enumeracje opisujące to samo pole. Jedna z nich jest błędna.

---

### 14. game_units.is_active — kolumna nie istnieje
**Plik:** `src/app/api/game/units/route.ts`
```ts
await supabase.from("game_units").select("*").eq("is_active", true)
```
Kolumna `is_active` nie istnieje w migration 003 dla `game_units` (jest w `game_achievements`, `game_shops` — ale nie w `game_units`). Query zwróci pustą tablicę.

---

### 15. Platforma-specyficzna zależność w dependencies (nie devDependencies)
**Plik:** `package.json`
```json
"@next/swc-win32-x64-msvc": "^16.2.9"  // ← w dependencies, nie devDependencies!
```
Ta paczka działa TYLKO na Windows x64. Na Netlify (Linux), w CI (ubuntu-latest) i na Macu — crash podczas instalacji lub ignorowanie. Powinna być albo w `optionalDependencies` albo usunięta (Next.js sam potrafi dobrać SWC binary).

---

### 16. Brak `.env.example` z wszystkimi zmiennymi
Plik `.env.example` istnieje, ale zawiera tylko 2 zmienne. Projekt realnie potrzebuje co najmniej:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
- `SUPABASE_SERVICE_ROLE_KEY` (dla operacji serwerowych admin)
- `NEXT_PUBLIC_APP_URL` (dla redirectów OAuth)

CI buduje bez tych zmiennych (Supabase URL jest `""`) — to może powodować ciche błędy.

---

## 🟡 P2 — CODE QUALITY I UX

### 17. Bug: `setBuy()` zamiast `setBusy()` w valor/page.tsx
**Plik:** `src/app/game/valor/page.tsx:37`
```ts
setBuy(true); // ← niezdefiniowana funkcja, powinna być setBusy(true)
setBuy(false); // ← to samo przy finally
```
Strona Valor rzuci runtime error `setBuy is not a function` przy próbie nauki perka.

---

### 18. Zustand store i TanStack Query — zainstalowane, nieużywane
Obie biblioteki są w package.json i skonfigurowane, ale **żadna strona gry ich nie używa** — każda strona zarządza stanem przez lokalne `useState` + bezpośrednie `fetch()`. Efekty:
- Brak cache'owania request'ów między stronami
- Dane profilu pobirane przy każdej nawigacji od nowa
- `useGameStore` (Zustand) nie jest połączony z żadną stroną gry
- `QueryClientProvider` jest podpięty ale `useQuery`/`useMutation` używane nigdzie

---

### 19. Brak null-check przed `supabase.auth.*` w login/page.tsx
```ts
const [supabase, setSupabase] = useState(null);
// supabase inicjalizowane w useEffect, ale:
async function handleLogin(e) {
  const r = await supabase.auth.signInWithPassword(...)  // crash jeśli supabase === null
}
```
Przy bardzo szybkim kliknięciu "Sign in" przed zakończeniem useEffect → TypeError.

---

### 20. Duplicate ikona w navigation
**Plik:** `src/app/game/layout.tsx`
```ts
{ href: "/game/td", label: "TD", icon: "🏰" },
{ href: "/game/castle", label: "Castle", icon: "🏰" }, // ← IDENTYCZNA ikona
```
TD i Castle mają tę samą ikonę — brak wizualnego rozróżnienia.

---

### 21. Difficulty buttons w battle/page.tsx — dekoracyjne, non-functional
```tsx
{["Easy","Normal","Hard"].map((d,i) => <button key={i} ...>{d}</button>)}
```
Przyciski difficulty nie robią nic — nie ma `onClick`, nie wpływają na bitwę. Mylące dla gracza.

---

### 22. Strona battle — hardcoded FIELDS array (nie z API)
```ts
const FIELDS = [
  { id: 1, name: "Plains of Beginning", level: 1 },
  // ...
];
```
Pola bitewne są hardcoded w komponencie zamiast pobierane z `/api/game/fields`. Gdy admin zmieni pole w DB, UI tego nie zobaczy.

---

### 23. Brak loading skeleton na stronach gry
Strony `army`, `mining`, `quests`, `leaderboard` pokazują pusty ekran podczas ładowania danych lub `Loading army...` plain text. Brak Skeleton/Spinner komponentów.

---

### 24. Lokalne interfejsy zamiast importowania z types/game.ts
Większość stron definiuje własne lokalne interfejsy (`ArmyUnit`, `BattleResult`, `MiningStatus`) zamiast importować z `src/types/game.ts`. Prowadzi to do:
- Duplikacji kodu
- Rozbieżności między typami UI a typami API
- Konieczności zmiany w N miejscach przy refaktorze

---

### 25. Martwe pliki / śmieci w projekcie
```
src/app/(game)/          # Pusty folder route group — dead code
add_players_table.py     # Niezadokumentowany skrypt w root projektu
update_pages.py          # Niezadokumentowany skrypt w root projektu  
update_trigger.py        # Niezadokumentowany skrypt w root projektu
validate_json.js         # Niezadokumentowany skrypt w root projektu
scripts/g.js             # Niezadokumentowany skrypt — cel nieznany
```

---

### 26. calcOfflineEarnings — XP nie chroni przed highestWave ≤ 0
**Plik:** `src/lib/game/economy.ts`
```ts
const rate = Math.max(1, highestWave) * 10; // gold: chronione ✓
const xp = Math.floor(highestWave * 5 * ...)  // xp: NIE chronione ✗
```
Gracz z `highest_wave = 0` → `gold` = 10 (poprawne), `xp` = 0 (poprawne?), ale przy `highest_wave < 0` → negatywne XP. Udokumentowane w `completed.md` ale nie naprawione.

---

### 27. `/api/shop` route.ts — zawartość jest stringiem, nie TypeScript
**Plik:** `src/app/api/shop/route.ts`
Zawartość pliku to literalny string w cudzysłowach, cały kod jest escaped — plik jest prawdopodobnie wynikiem błędnego zapisu (np. przez JSON.stringify). Shop endpoint nie działa.

---

### 28. Brak Content-Security-Policy header
`next.config.ts` dodaje `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` — ale **brak CSP**. Przy grze webowej z dynamiczną zawartością to istotna luka.

---

### 29. Brak soft-delete (`deleted_at`) mimo że docs tego wymagają
Docs (01b_ARCHITECTURE_SUPPLEMENT.json): *"All tables have deleted_at column - never hard delete player data"*. W żadnej tabeli w migracjach nie ma `deleted_at`. GDPR compliance jest też w planach — bez soft delete nie ma prawdziwego "right to erasure" flow.

---

### 30. Brak dark mode
`globals.css` definiuje tylko zmienne dla light mode. Docs planują dark mode. `tailwind.config.ts` nie ma `darkMode: 'class'`. UI jest stuck na białym tle.

---

## 📋 PLAN NAPRAW (priorytetyzowany)

### Batch 1 — P0 Blokery (naprawić przed czymkolwiek innym)

1. **Fix `supabase.rfc` → `.rpc`** w `offline-earnings/route.ts`
2. **Dodać `isActive?: boolean` do `Unit` type** w `src/types/game.ts`
3. **Przepisać migration 003** — zgodna z seed.sql (class, base_hp, base_attack, base_defense, base_speed, faction, skill_data, growth_*); usunąć duplikat CREATE TABLE game_battle_fields
4. **Naprawić kolejność migracji** — przenieść game catalog tables przed FKs w 001 (nowa migracja 000 lub reorder)
5. **Przeprojektować i18n** — decyzja architektoniczna (JSONB vs locale files), następnie migration + seed update

### Batch 2 — P1 Bezpieczeństwo i API

6. **Whitelist pól w PATCH /api/player/profile** — tylko `display_name` i settings
7. **Usunąć `typescript: { ignoreBuildErrors: true }`** — naprawić type errors
8. **Zaktualizować API contract** — dopasować do rzeczywistych endpointów
9. **Implementować brakujące akcyjne endpointy**: `castle/defend`, `td/wave`, `battle/complete`, `quests/accept+claim`, `army/upgrade`
10. **Dodać PWA icons** (icon-192.png, icon-512.png) lub placeholder SVG → PNG
11. **Naprawić `@next/swc-win32-x64-msvc`** — przenieść do `optionalDependencies`
12. **Rozszerzyć `.env.example`** o wszystkie wymagane zmienne

### Batch 3 — P2 Code Quality

13. **Fix `setBuy` → `setBusy`** w valor/page.tsx
14. **Fix null-check supabase** w login/page.tsx
15. **Fix shop/route.ts** — przepisać jako prawidłowy TypeScript
16. **Naprawić ikony w navigation** — unikalne ikony dla TD i Castle
17. **Podłączyć Zustand store** do stron gry (lub zdecydować i usunąć jeśli nieużywany)
18. **Podłączyć TanStack Query** do fetch calls (lub usunąć)
19. **Wyciągnąć typy lokalne** do `src/types/game.ts`
20. **Usunąć martwe pliki**: `src/app/(game)/`, niezadokumentowane .py/.js w root
21. **Fix difficulty buttons** w battle page — albo podpiąć do logiki, albo usunąć
22. **Fix fields w battle page** — pobierać z `/api/game/fields` zamiast hardcode
23. **Fix calcOfflineEarnings XP** — `Math.max(1, highestWave)` dla XP tak jak dla gold
24. **Dodać CSP header** do next.config.ts
25. **Dodać dark mode** — `tailwind.config.ts` + CSS variables

### Batch 4 — Testy (brakujące)

26. Testy jednostkowe: `valor-trees.ts` (brak), `api-helper.ts`
27. Testy integracyjne: kluczowe API routes (battle/start, player/profile)
28. Testy E2E: rejestracja → battle → army (Playwright)
29. Test: Formation save/restore round-trip
30. Test: Offline earnings calculation z edge cases

### Batch 5 — Dokumentacja (synchronizacja)

31. Zaktualizować `01_ARCHITECTURE.json` — rzeczywisty tech stack (Next.js 16, Tailwind 3, brak shadcn/Framer/PWA)
32. Zaktualizować `21_IMPLEMENTATION_CHECKLIST.json` — prawdziwy status tasków
33. Zdecydować co z planowanymi a niezainstalowanymi pakietami (shadcn, Framer, Playwright, Redis) — add to roadmap lub drop
34. `13_API_CONTRACT.json` — przepisać pod rzeczywiste endpointy

---

## 🔍 Dodatkowe obserwacje (do dyskusji)

**Architektura game loop:** Obecna bitwa to full-sim-in-one-call (do 200 ticków w jednym requescie). Przy dużym obciążeniu może timeout'ować (Netlify: 10s limit). Do rozważenia: paginacja wyników lub Supabase Edge Function.

**Gacha system:** Zdefiniowany w docs/plan/19, nie zaimplementowany — ale `game_units` seed ma już jednostki z rarity do legendary. Gracz nie ma jak ich zdobyć bez gachy.

**Seedy unit dla gracza:** Nowy gracz nie dostaje żadnych startowych jednostek (seed.sql nie wstawia do `player_units`). Brakuje triggera/onboarding który daje starter pack.

**Offline earnings cap:** Docs mówią o `offline_earnings_cap_hours` — kolumna istnieje w migration ale nie jest używana w `calcOfflineEarnings()`.

---

*Raport wygenerowany po analizie 47 plików kodu źródłowego, 33 dokumentów planu, 4 migracji SQL i seed data.*
