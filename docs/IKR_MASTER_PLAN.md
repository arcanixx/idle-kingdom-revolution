# IKR MASTER PLAN — Idle Kingdom Revolution
> **Cel tego dokumentu**: Precyzyjny plan naprawy projektu od stanu "gra tekstowa z logami"
> do stanu "grywalna idle RPG z wizualną walką". Każda sekcja jest samodzielną instrukcją
> dla dowolnego modelu AI / Claude Desktop / OpenCode.
>
> **Data**: 2026-06-27  
> **Repo**: arcanixx/idle-kingdom-revolution  
> **Wersja planu**: 1.0

---

## STAN AKTUALNY (co istnieje, co nie)

### ✅ Działa
- Auth (login/register via Supabase) — `src/app/(auth)/`
- Player profile CRUD — `src/app/api/player/`
- Battle engine — logika walki w TypeScript — `src/lib/game/battle-engine.ts`
- Battle fields (definicje pól/map) — `src/lib/game/`
- Unit leveling (obliczenia) — `src/lib/game/leveling.ts`
- Testy jednostkowe silnika bitwy — `tests/`
- Supabase schema (migrations) — `supabase/`
- Zustand store (struktura) — `src/stores/game-store.ts`
- i18n (next-intl) — `src/locales/`

### ❌ Brakuje / nie działa
- **Brak jakiegokolwiek visual renderingu gry** (zero Canvas, zero PixiJS)
- Battle UI — walka niewidoczna dla gracza (P1-06 PENDING)
- Formation grid jako interaktywny drag-and-drop (P1-04 IN PROGRESS, niekompletne)
- Unit classes z różnymi statystykami (P1-05 PENDING)
- Equipment system (P1-10 PENDING)
- Auto-save (P1-12 PENDING) — krytyczne dla idle game
- Castle Hub screen — centralny ekran gry
- Asset pipeline — brak sprite sheetów, brak loadera
- Admin panel (P1-13 PENDING)

### 🔴 Krytyczny problem z assets
Aktualny plan generował **3GB** grafik: ~100 hero typów × ~30 stanów × ~100KB/PNG.
To jest całkowicie błędne podejście. **Patrz sekcja ASSETS niżej.**

---

## ARCHITEKTURA DOCELOWA

```
Next.js App (React 19)
│
├── shadcn/ui + Tailwind        → HUD, menu, inventory, sklep, questy (HTML)
│
└── PixiJS 8.x (Canvas/WebGL)  → WSZYSTKO co jest "w grze"
    ├── CastleScene             → ekran główny (clickable zamek)
    ├── BattleScene             → pole bitwy z jednostkami
    ├── FormationScene          → ekran ustawiania formacji  
    └── WorldMapScene           → mapa świata (Phase 2+)
```

**Zasada**: PixiJS renderuje scenę gry. React renderuje UI wokół sceny.
Komunikacja: Zustand store jako shared state między React ↔ PixiJS.

---

## PLAN FAZOWY

### FAZA A — Fundament PixiJS (3-5 dni)
**Priorytet**: Krytyczny. Bez tego nic innego nie ma sensu.

#### A1. Instalacja i integracja PixiJS

```bash
bun add pixi.js@^8.0.0
```

**Plik**: `src/components/game/GameCanvas.tsx`
```typescript
"use client";
// File: src/components/game/GameCanvas.tsx
// Purpose: React wrapper dla PixiJS Application
// Dependencies: pixi.js, react
// Exports: GameCanvas

import { useEffect, useRef } from "react";
import { Application } from "pixi.js";
import { logger } from "@/lib/logger";

interface GameCanvasProps {
  scene: "castle" | "battle" | "formation" | "mining";
  width?: number;
  height?: number;
  className?: string;
}

export function GameCanvas({ scene, width = 800, height = 600, className }: GameCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const app = new Application();
    appRef.current = app;

    (async () => {
      await app.init({
        width,
        height,
        backgroundColor: 0x1a1a2e,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      });

      if (canvasRef.current) {
        canvasRef.current.appendChild(app.canvas);
      }

      // Załaduj scenę
      const { loadScene } = await import(`@/lib/game/scenes/${scene}-scene`);
      await loadScene(app);

      logger.info({
        file: "GameCanvas",
        functionName: "useEffect",
        message: `Scene loaded: ${scene}`,
      });
    })();

    return () => {
      app.destroy(true, { children: true });
    };
  }, [scene, width, height]);

  return (
    <div
      ref={canvasRef}
      className={className}
      style={{ width, height, overflow: "hidden" }}
    />
  );
}
```

#### A2. Asset Loader (KRYTYCZNY — czytaj sekcję ASSETS)

**Plik**: `src/lib/game/asset-loader.ts`
```typescript
// File: src/lib/game/asset-loader.ts
// Purpose: Centralny loader assetów z cache i fallback
// Dependencies: pixi.js
// Exports: assetLoader, loadAtlas, getTexture

import { Assets, Texture } from "pixi.js";
import { logger } from "@/lib/logger";

// SPRITE ATLAS MANIFEST — jeden plik JSON opisuje wszystkie textury
const ATLAS_MANIFEST = {
  bundles: [
    {
      name: "units",
      assets: [
        { alias: "units-atlas", src: "/assets/sprites/units.json" }, // sprite sheet
      ],
    },
    {
      name: "ui",
      assets: [
        { alias: "ui-atlas", src: "/assets/sprites/ui.json" },
      ],
    },
    {
      name: "castle",
      assets: [
        { alias: "castle-bg", src: "/assets/backgrounds/castle.webp" },
      ],
    },
  ],
};

let initialized = false;

export async function initAssets(): Promise<void> {
  if (initialized) return;
  await Assets.init({ manifest: ATLAS_MANIFEST });
  initialized = true;
  logger.info({ file: "asset-loader", functionName: "initAssets", message: "Assets initialized" });
}

export async function loadBundle(bundleName: string): Promise<void> {
  try {
    await Assets.loadBundle(bundleName);
    logger.info({ file: "asset-loader", functionName: "loadBundle", message: `Bundle loaded: ${bundleName}` });
  } catch (error) {
    logger.error({ file: "asset-loader", functionName: "loadBundle", error, metadata: { bundleName } });
    // Fallback do placeholder textures
  }
}

export function getTexture(name: string): Texture {
  try {
    return Assets.get(name) ?? Texture.WHITE;
  } catch {
    return Texture.WHITE; // Placeholder gdy brak assetu
  }
}
```

---

### FAZA B — Battle Visual System (5-7 dni)
**Priorytet**: Krytyczny. To jest "gra".

#### B1. BattleScene

**Plik**: `src/lib/game/scenes/battle-scene.ts`

Zadanie: PixiJS scena z polem bitwy 6×3 (6 kolumn, 3 rzędy per strona).
Struktura siatki:
```
[P3][P2][P1]  |  [E1][E2][E3]
[P3][P2][P1]  |  [E1][E2][E3]
[P3][P2][P1]  |  [E1][E2][E3]
              ^
        środkowa linia (divider)
```

```typescript
// File: src/lib/game/scenes/battle-scene.ts
// Purpose: PixiJS scena pola bitwy
// Dependencies: pixi.js, battle-engine, asset-loader, unit-sprite
// Exports: loadScene

import { Application, Container, Graphics } from "pixi.js";
import { UnitSprite } from "@/lib/game/sprites/unit-sprite";
import { BattleEventEmitter } from "@/lib/game/battle-event-emitter";
import { useGameStore } from "@/stores/game-store";
import { loadBundle } from "@/lib/game/asset-loader";

const CELL_SIZE = 96; // px per komórka
const GRID_COLS = 4;  // kolumny per strona
const GRID_ROWS = 4;  // rzędy

export async function loadScene(app: Application): Promise<void> {
  await loadBundle("units");

  const battleContainer = new Container();
  app.stage.addChild(battleContainer);

  // Tło pola bitwy
  const bg = new Graphics()
    .rect(0, 0, app.screen.width, app.screen.height)
    .fill(0x1a1a2e);
  battleContainer.addChild(bg);

  // Siatka gracza (lewa strona)
  const playerGrid = createGrid(app, "player");
  battleContainer.addChild(playerGrid);

  // Siatka wroga (prawa strona)
  const enemyGrid = createGrid(app, "enemy");
  battleContainer.addChild(enemyGrid);

  // Divider
  const divider = new Graphics()
    .rect(app.screen.width / 2 - 1, 0, 2, app.screen.height)
    .fill(0x444466);
  battleContainer.addChild(divider);

  // Załaduj aktualny stan bitwy z Zustand
  const state = useGameStore.getState();
  // ... (renderuj jednostki z state.currentBattle)

  // Event emitter dla animacji
  BattleEventEmitter.on("attack", handleAttackAnimation);
  BattleEventEmitter.on("death", handleDeathAnimation);
}

function createGrid(app: Application, side: "player" | "enemy"): Container {
  const grid = new Container();
  const offsetX = side === "player" ? 40 : app.screen.width / 2 + 40;
  const offsetY = (app.screen.height - GRID_ROWS * CELL_SIZE) / 2;

  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const cell = new Graphics()
        .rect(col * CELL_SIZE + offsetX, row * CELL_SIZE + offsetY, CELL_SIZE - 4, CELL_SIZE - 4)
        .fill({ color: 0x2a2a4e, alpha: 0.8 });
      grid.addChild(cell);
    }
  }
  return grid;
}

async function handleAttackAnimation(event: AttackEvent): Promise<void> {
  // TODO: animacja ataku — jednostka "skacze" w kierunku celu
}

async function handleDeathAnimation(event: DeathEvent): Promise<void> {
  // TODO: animacja śmierci — fade out + efekt cząsteczkowy
}
```

#### B2. UnitSprite

**Plik**: `src/lib/game/sprites/unit-sprite.ts`

```typescript
// File: src/lib/game/sprites/unit-sprite.ts
// Purpose: PixiJS sprite dla jednostki (animowany, z paskiem HP)
// Dependencies: pixi.js, asset-loader
// Exports: UnitSprite

import { Container, Sprite, Graphics, Text, TextStyle } from "pixi.js";
import { getTexture } from "@/lib/game/asset-loader";
import type { BattleUnit } from "@/types/game";

export class UnitSprite extends Container {
  private sprite: Sprite;
  private hpBar: Graphics;
  private nameText: Text;
  private unit: BattleUnit;

  constructor(unit: BattleUnit) {
    super();
    this.unit = unit;

    // Sprite z atlasu — fallback do placeholder
    const textureName = `unit_${unit.type}_idle`; // np. "unit_warrior_idle"
    this.sprite = new Sprite(getTexture(textureName));
    this.sprite.width = 72;
    this.sprite.height = 72;
    this.sprite.anchor.set(0.5);

    // HP bar
    this.hpBar = new Graphics();
    this.updateHpBar();

    // Nazwa (debug, można wyłączyć w produkcji)
    this.nameText = new Text({
      text: unit.name,
      style: new TextStyle({ fontSize: 10, fill: 0xffffff }),
    });
    this.nameText.anchor.set(0.5, 0);
    this.nameText.y = 38;

    this.addChild(this.sprite, this.hpBar, this.nameText);
  }

  updateHpBar(): void {
    const ratio = this.unit.currentHp / this.unit.maxHp;
    const barWidth = 64;
    const barHeight = 6;

    this.hpBar.clear();
    // Tło
    this.hpBar.rect(-barWidth / 2, -44, barWidth, barHeight).fill(0x330000);
    // HP
    const hpColor = ratio > 0.5 ? 0x00cc44 : ratio > 0.25 ? 0xffaa00 : 0xcc2200;
    this.hpBar.rect(-barWidth / 2, -44, barWidth * ratio, barHeight).fill(hpColor);
  }

  // Animacja ataku — tween w kierunku celu
  async playAttack(targetX: number, targetY: number): Promise<void> {
    // Prosta animacja: move → pause → return
    const originalX = this.x;
    const originalY = this.y;
    const steps = 10;
    const dx = (targetX - originalX) * 0.3;
    const dy = (targetY - originalY) * 0.3;

    for (let i = 0; i < steps; i++) {
      this.x = originalX + (dx * i) / steps;
      this.y = originalY + (dy * i) / steps;
      await new Promise((r) => setTimeout(r, 16));
    }
    await new Promise((r) => setTimeout(r, 100));
    for (let i = steps; i >= 0; i--) {
      this.x = originalX + (dx * i) / steps;
      this.y = originalY + (dy * i) / steps;
      await new Promise((r) => setTimeout(r, 16));
    }
  }

  // Animacja śmierci
  async playDeath(): Promise<void> {
    for (let i = 10; i >= 0; i--) {
      this.alpha = i / 10;
      await new Promise((r) => setTimeout(r, 50));
    }
    this.destroy();
  }
}
```

#### B3. Floating Damage Numbers

**Plik**: `src/lib/game/sprites/floating-text.ts`

```typescript
// File: src/lib/game/sprites/floating-text.ts
// Purpose: Animowany tekst dmg/heal nad jednostką
// Exports: spawnFloatingText

import { Container, Text, TextStyle } from "pixi.js";

export function spawnFloatingText(
  stage: Container,
  x: number,
  y: number,
  value: number,
  type: "damage" | "heal" | "miss"
): void {
  const colors = { damage: 0xff4444, heal: 0x44ff44, miss: 0xaaaaaa };
  const prefixes = { damage: "-", heal: "+", miss: "miss" };

  const text = new Text({
    text: type === "miss" ? "MISS" : `${prefixes[type]}${value}`,
    style: new TextStyle({
      fontSize: type === "miss" ? 14 : 18,
      fontWeight: "bold",
      fill: colors[type],
    }),
  });
  text.x = x;
  text.y = y;
  text.anchor.set(0.5);
  stage.addChild(text);

  // Animacja: float up + fade
  let frame = 0;
  const animate = () => {
    frame++;
    text.y -= 1.5;
    text.alpha = Math.max(0, 1 - frame / 40);
    if (frame < 40) requestAnimationFrame(animate);
    else text.destroy();
  };
  requestAnimationFrame(animate);
}
```

#### B4. BattleEventEmitter — most między engine a PixiJS

**Plik**: `src/lib/game/battle-event-emitter.ts`

```typescript
// File: src/lib/game/battle-event-emitter.ts
// Purpose: Event bus łączący battle-engine (logika) z BattleScene (rendering)
// Exports: BattleEventEmitter, BattleEvents

type AttackEvent = { attackerId: string; targetId: string; damage: number; type: "hit" | "miss" | "crit" };
type DeathEvent = { unitId: string };
type BattleEndEvent = { winner: "player" | "enemy"; rewards: Reward[] };

class EventEmitter {
  private listeners: Record<string, Function[]> = {};

  on(event: string, fn: Function): void {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }

  off(event: string, fn: Function): void {
    this.listeners[event] = (this.listeners[event] ?? []).filter((f) => f !== fn);
  }

  emit(event: string, data?: unknown): void {
    (this.listeners[event] ?? []).forEach((fn) => fn(data));
  }
}

export const BattleEventEmitter = new EventEmitter();
```

Kluczowa zmiana w `battle-engine.ts`: zamiast zwracać wynik, **emituj eventy**:
```typescript
// W battle-engine.ts — każdy krok walki emituje event
BattleEventEmitter.emit("attack", { attackerId, targetId, damage, type: "hit" });
// BattleScene SŁUCHA tych eventów i animuje
```

---

### FAZA C — Auto-Save System (1-2 dni)
**Priorytet**: Wysoki. Gracz bez save = gracz który odchodzi.

**Plik**: `src/lib/game/auto-save.ts`

```typescript
// File: src/lib/game/auto-save.ts
// Purpose: Auto-save stanu gry do Supabase co 30s
// Dependencies: zustand game-store, supabase client
// Exports: startAutoSave, stopAutoSave, forceSave

import { useGameStore } from "@/stores/game-store";
import { createBrowserClient } from "@/lib/supabase/client";
import { logger } from "@/lib/logger";

const SAVE_INTERVAL_MS = 30_000; // 30 sekund
let saveTimer: ReturnType<typeof setInterval> | null = null;
let pendingSave = false;

export function startAutoSave(): void {
  if (saveTimer) return;
  saveTimer = setInterval(forceSave, SAVE_INTERVAL_MS);

  // Zapisz też przed zamknięciem okna
  window.addEventListener("beforeunload", forceSave);
  // I gdy strona traci focus
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") forceSave();
  });

  logger.info({ file: "auto-save", functionName: "startAutoSave", message: "Auto-save started" });
}

export function stopAutoSave(): void {
  if (saveTimer) {
    clearInterval(saveTimer);
    saveTimer = null;
  }
  window.removeEventListener("beforeunload", forceSave);
}

export async function forceSave(): Promise<void> {
  if (pendingSave) return; // Nie nakładaj save'ów
  pendingSave = true;

  try {
    const state = useGameStore.getState();
    const supabase = createBrowserClient();

    const { error } = await supabase
      .from("player_saves")
      .upsert({
        player_id: state.playerId,
        save_data: state.toSerializable(), // metoda zwracająca plain JSON
        saved_at: new Date().toISOString(),
      });

    if (error) throw error;

    useGameStore.getState().setLastSaveTime(Date.now());
    logger.info({ file: "auto-save", functionName: "forceSave", message: "Game saved" });
  } catch (error) {
    logger.error({ file: "auto-save", functionName: "forceSave", error });
    // Queue retry — nie blokuj gry gdy brak internetu
  } finally {
    pendingSave = false;
  }
}
```

Migracja Supabase (`supabase/migrations/`):
```sql
CREATE TABLE player_saves (
  player_id UUID PRIMARY KEY REFERENCES auth.users(id),
  save_data JSONB NOT NULL,
  saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE player_saves ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own saves" ON player_saves
  FOR ALL USING (auth.uid() = player_id);
```

---

### FAZA D — Castle Hub Screen (3-4 dni)
**Priorytet**: Wysoki. Gracz potrzebuje "gdzie iść".

**Plik**: `src/app/game/page.tsx` (główna strona gry, zastępuje routing per-sekcja)

**Koncepcja**: Jeden ekran "Castle View" — widok zamku z boku/z góry.
Kliknięcie na budynek → odpowiednia akcja.

```
[KOPALNIA] [KOSZARY] [ZAMEK] [SKLEP] [TABLICA QUESTÓW]
    ↓           ↓        ↓       ↓            ↓
 /mining     /army    /castle  /shop       /quests
```

Implementacja: PixiJS scena z interaktywnymi budynkami LUB (prostsze na start) SVG + CSS z animacjami hover.

**Dla szybkiego PoC** — SVG Castle Hub:
```typescript
// src/components/game/CastleHub.tsx
"use client";
// Klikalne budynki jako SVG — proste, nie wymaga PixiJS
// Każdy budynek to <g> z onClick → router.push('/game/...')
// Można dodać animacje CSS hover
```

---

### FAZA E — Formation Grid (2-3 dni)
**Priorytet**: Wysoki — gameplay core.

**Podejście**: HTML5 drag-and-drop (nie wymaga PixiJS — działa w React)

**Plik**: `src/components/game/FormationGrid.tsx`

Siatka N×M gdzie:
- Każda komórka to `<div>` z `onDrop` + `onDragOver`
- Karta jednostki to `<div>` z `draggable={true}` + `onDragStart`
- Stan formacji w Zustand → save do Supabase

Wizualnie: ciemne tło, złote obramowanie komórek, miniatura jednostki w środku.

---

### FAZA F — Unit Classes + Equipment (3-4 dni)
**Priorytet**: Średni — po fazach A-E.

**6 klas jednostek** (rozszerzalne):
```typescript
type UnitClass = "warrior" | "archer" | "mage" | "tank" | "healer" | "rogue";

interface UnitClassDefinition {
  class: UnitClass;
  baseStats: { hp: number; atk: number; def: number; spd: number };
  abilities: string[];     // ID umiejętności
  spritePrefix: string;    // np. "unit_warrior" → asset "unit_warrior_idle"
  role: "frontline" | "backline" | "support";
}
```

**Equipment slots**:
```typescript
type EquipmentSlot = "weapon" | "armor" | "helmet" | "accessory";
```

---

## ASSETS — NOWE PODEJŚCIE (WAŻNE!)

### Problem z poprzednim planem

Poprzednie podejście generowało PNG per stan per hero:
```
warrior_idle.png      → 100KB
warrior_attack.png    → 100KB  
warrior_death.png     → 100KB
× 30 hero types = 9000KB = ~9MB per set
× 10 sets = 90MB... i to TYLKO heroes
```
**To jest złe z trzech powodów:**
1. Rozmiar (3GB to nierealne)
2. Spójność stylu (AI generuje różnie za każdym razem)
3. Brak animacji (PNG nie animuje się płynnie)

### Nowe podejście: 3 poziomy assetów

#### Poziom 1: Dev/PoC (TERAZ) — placeholder shapes
Nie potrzeba ŻADNYCH grafik żeby gra działała.
PixiJS + `Graphics` API rysuje placeholder jednostki:
```typescript
// Warrior = czerwony kwadrat z "W"
// Archer = zielony trójkąt z "A"  
// Mage = niebieski krąg z "M"
```
**Koszt**: 0 zł, 0 czasu artystycznego. Gra DZIAŁA i jest grywalna.

#### Poziom 2: Pixel Art Sprite Sheets (DOCELOWO)
**Narzędzie**: Aseprite (~20 USD, lub darmowy build) lub LibreSprite (darmowy).
**Format**: Sprite sheet — jeden PNG z wszystkimi klatkami animacji + JSON atlas.

```
units.png (512×512px):
┌─────────────────────────────┐
│ [idle1][idle2][idle3][idle4] │  ← warrior idle animation
│ [atk1][atk2][atk3]          │  ← warrior attack
│ [die1][die2][die3][die4]     │  ← warrior death  
│ ...kolejne klasy...          │
└─────────────────────────────┘
```

Jeden plik `units.png` = ~200KB zamiast 3GB.

**units.json** (atlas):
```json
{
  "frames": {
    "unit_warrior_idle_0": { "frame": {"x":0,"y":0,"w":64,"h":64} },
    "unit_warrior_idle_1": { "frame": {"x":64,"y":0,"w":64,"h":64} },
    ...
  },
  "meta": { "image": "units.png", "size": {"w":512,"h":512} }
}
```

PixiJS ładuje JEDEN plik JSON + JEDEN PNG → wszystkie animacje gotowe.

#### Poziom 3: Ilustracje portretów (opcjonalnie)
**TYLKO** dla kart hero w UI (nie w grze):
- Generuj AI: 1 portret per hero = ~50KB WebP
- Rozmiar: 200×200px  
- Format: WebP (nie PNG!)
- Użycie: `<img>` w React HUD, NIE w PixiJS

**Promptowanie AI dla portretów** (jednorazowe, nie per-stan):
```
"Fantasy RPG character portrait, [class], dark medieval style,
bust shot facing right, no background, flat art style,
suitable for game UI card, 200x200px"
```
Jeden prompt = jeden obraz = gotowy portret. Koniec.

### Struktura folderów assets (docelowa)

```
public/assets/
├── sprites/
│   ├── units.png         ← jeden sprite sheet wszystkich jednostek
│   ├── units.json        ← atlas (TexturePacker lub Aseprite export)
│   ├── effects.png       ← eksplozje, efekty magii
│   ├── effects.json
│   ├── ui.png            ← ikony UI (serce, miecz, złoto itd)
│   └── ui.json
├── backgrounds/
│   ├── castle.webp       ← tło zamku (~150KB)
│   ├── battlefield-1.webp
│   └── battlefield-2.webp
├── portraits/            ← AI-generowane portrety 200×200 WebP
│   ├── hero_warrior.webp (~50KB)
│   ├── hero_archer.webp
│   └── ...
└── audio/               ← Phase 2+
    ├── battle-music.ogg
    └── sfx/
```

**Łączny rozmiar**: ~2-3MB zamiast 3GB. To jest właściwe podejście.

---

## INSTRUKCJE DLA POSZCZEGÓLNYCH MODELI/AGENTÓW

### Dla Claude Desktop / Claude Code (złożone zadania)
Może wdrażać całe fazy. Daj mu ten dokument + `AI_INSTRUCTIONS_PROJECT.md`.
Nadaje się do: integracja PixiJS, BattleScene, BattleEventEmitter, auto-save.

### Dla mniejszych modeli (DeepSeek, GPT-4o mini, Claude Haiku)
Nadaje się do izolowanych zadań bez szerokiego kontekstu:

**Zadanie A** (izolowane): "Dodaj migrację Supabase dla tabeli player_saves"
→ Podaj fragment z Fazy C. Brak kontekstu gry potrzebny.

**Zadanie B** (izolowane): "Zaimplementuj FloatingText w PixiJS"
→ Podaj kod z B3. To ~40 linii, zero zależności od reszty gry.

**Zadanie C** (izolowane): "Stwórz FormationGrid jako HTML drag-and-drop"
→ Podaj opis z Fazy E + typy z `src/types/game.ts`.

**Zadanie D** (izolowane): "Dodaj unit class definitions jako stałe TypeScript"
→ Podaj interfejsy z Fazy F + listę 6 klas.

**NIE dawaj małym modelom**: integracja PixiJS ↔ React, BattleScene + EventEmitter,
architektura store'ów — to wymaga pełnego kontekstu.

---

## KOLEJNOŚĆ IMPLEMENTACJI (priorytetyzacja)

```
Tydzień 1:
  [A1] PixiJS zainstalowany + GameCanvas wrapper
  [A2] Asset loader z placeholder textures
  [B4] BattleEventEmitter (bridge engine ↔ rendering)
  [C]  Auto-save (Supabase migration + auto-save hook)

Tydzień 2:
  [B1] BattleScene — pole bitwy z siatką
  [B2] UnitSprite — jednostka z HP barem
  [B3] FloatingText — damage numbers
  [B1+B2+B3] Połącz: pełna animowana walka

Tydzień 3:
  [E]  FormationGrid — drag-and-drop ustawianie armii
  [D]  Castle Hub — ekran główny z budynkami
  [F]  Unit classes — 6 typów z różnymi statystykami

Tydzień 4+:
  Equipment system
  Pixel art sprite sheets (zastąp placeholdery)
  Admin panel
  E2E tests
  Performance optimization
```

---

## PLIKI DO STWORZENIA (w tej kolejności)

1. `src/components/game/GameCanvas.tsx`
2. `src/lib/game/asset-loader.ts`
3. `src/lib/game/battle-event-emitter.ts`
4. `src/lib/game/auto-save.ts`
5. `supabase/migrations/YYYYMMDD_player_saves.sql`
6. `src/lib/game/scenes/battle-scene.ts`
7. `src/lib/game/sprites/unit-sprite.ts`
8. `src/lib/game/sprites/floating-text.ts`
9. `src/components/game/FormationGrid.tsx`
10. `src/components/game/CastleHub.tsx`
11. `src/lib/game/unit-classes.ts`
12. `src/types/game.ts` (rozszerzyć o nowe typy)

---

## ZASADY KTÓRYCH MUSI PRZESTRZEGAĆ KAŻDY MODEL

1. **Logger w każdym pliku**: `import { logger } from '@/lib/logger'` — ZERO console.log
2. **Bun only**: `bun add`, `bun run typecheck`, `bun run test`, `bun run lint`
3. **Strict TypeScript**: zero `any`, zawsze explicit return types
4. **File header** na początku każdego pliku (patrz `AI_INSTRUCTIONS_GLOBAL.md`)
5. **Testy** dla każdej nowej logiki biznesowej (unit tests w `tests/`)
6. **PixiJS tylko w `"use client"` komponentach** — nigdy w Server Components
7. **Sprite sheets nie individual PNGs** — nie twórz nowych plików PNG per stan
8. **WebP nie PNG** dla tła i portretów

---

## PYTANIA DO WŁAŚCICIELA PRZED IMPLEMENTACJĄ

Przed Fazą A odpowiedz na te pytania (decyzje architektoniczne):

1. **Rozmiar siatki formacji?** Proponuję 3×3 (9 miejsc). HoMM używał 5×7.
2. **Walka real-time czy turn-based?** Silnik obsługuje tick-based — wizualizować jako:
   a) Płynną animację z timeoutami (real-time feeling)
   b) Klikalne "Next Turn" (turn-based feeling)
3. **Pixel art czy ilustrowany styl?** To decyduje o wyborze artysty/generatora.
4. **Perspektywa pola bitwy?** Side-view (jak Idle Bounty) czy top-down (jak HoMM)?

---

*Ten dokument jest "source of truth" dla Phase 2 implementacji.*
*Aktualizuj go po każdej ukończonej fazie.*
*Wersja: 1.0 | Data: 2026-06-27*
