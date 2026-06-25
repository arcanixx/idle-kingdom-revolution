# Asset Checklist

> Stan na: 2026-06-24. Folder `public/assets/` jeszcze nie istnieje — wszystko poniżej jest do zrobienia.
> Odznaczaj `[x]` po wygenerowaniu, obróbce (rembg + WebP) i wrzuceniu do `public/assets/{kategoria}/`.
> Pełne definicje i prompty: zobacz pliki `01_*` do `07_*` w tym folderze.

---

## Jak korzystać z tej checklisty

1. Generujesz asset wg promptu z odpowiedniego pliku (`01_BATTLE_BACKGROUNDS.md` itd.)
2. Po przejściu pipeline'u (`08_WORKFLOW_AND_TOOLS.md`) i wylądowaniu w `public/assets/{kategoria}/` — zaznacz `[x]` tutaj.
3. Jeśli dodajesz coś nowego, czego nie ma w tej liście (np. nową frakcję, nowy boss) — dopisz wiersz tutaj ORAZ zaktualizuj odpowiedni plik `0X_*.md`, żeby dokumentacja i checklist się nie rozjeżdżały.

---

## FAZA 1 (MVP)

- [ ] 7 × Battle Backgrounds (wszystkie, patrz sekcja 1 poniżej)
- [ ] 7 × Unit Portraits BASE (Common, idle) — jeden per frakcja
- [ ] 3 × Item Icons: health_potion, gold_coin, mana_crystal
- [ ] 1 × Boss: Fire Dragon
- [ ] 3 × Emotion Portraits (Human): Happy, Angry, Scared

---

## 1. Battle Backgrounds (`01_BATTLE_BACKGROUNDS.md`)

Rozmiar: 1920×1080 WebP — folder: `public/assets/backgrounds/`

| # | Plik | Frakcja/Lokacja | Status |
|---|------|------------------|--------|
| 1 | plains.webp | Human / Neutral | [ ] |
| 2 | forest.webp | Elf | [ ] |
| 3 | mountains.webp | Neutral | [ ] |
| 4 | desert.webp | Orc | [ ] |
| 5 | ice_land.webp | Undead | [ ] |
| 6 | volcano.webp | Demon | [ ] |
| 7 | dungeon.webp | Celestial / Neutral | [ ] |

**Warianty pogodowe (opcjonalne, faza 2-3):**
- [ ] rain overlay
- [ ] snow overlay
- [ ] fog overlay
- [ ] storm overlay

---

## 2. Unit Portraits (`02_UNIT_PORTRAITS.md`)

Rozmiar: 512×512 WebP — folder: `public/assets/units/{faction}/`
Full-body, kąt kamery 3/4, NOGI WIDOCZNE w każdym wariancie.

Nazewnictwo: `{faction}_{class}_{rarity}_{state}.webp` | Stany: `idle`, `attack`, `hit`

### 2.1. BASE models (referencja, przed rarity) — 1 per frakcja+klasa = 42 łącznie

**Human:**
- [ ] human_warrior_base
- [ ] human_mage_base
- [ ] human_tank_base
- [ ] human_healer_base
- [ ] human_ranger_base
- [ ] human_assassin_base
- [ ] human_support_base

**Elf:**
- [ ] elf_warrior_base
- [ ] elf_ranger_base
- [ ] elf_mage_base
- [ ] elf_healer_base
- [ ] elf_assassin_base
- [ ] elf_support_base
- [ ] elf_tank_base

**Orc** (klasy unikalne — patrz uwaga w `02_UNIT_PORTRAITS.md`):
- [ ] orc_warrior_base
- [ ] orc_tank_base
- [ ] orc_berserker_base
- [ ] orc_shaman_base
- [ ] orc_hunter_base
- [ ] orc_support_base
- [ ] orc_mage_base

**Undead:**
- [ ] undead_warrior_base
- [ ] undead_mage_base
- [ ] undead_tank_base
- [ ] undead_healer_base
- [ ] undead_assassin_base
- [ ] undead_support_base
- [ ] undead_ranger_base

**Demon:**
- [ ] demon_warrior_base
- [ ] demon_mage_base
- [ ] demon_tank_base
- [ ] demon_assassin_base
- [ ] demon_support_base
- [ ] demon_healer_base
- [ ] demon_ranger_base

**Celestial:**
- [ ] celestial_warrior_base
- [ ] celestial_mage_base
- [ ] celestial_healer_base
- [ ] celestial_tank_base
- [ ] celestial_support_base
- [ ] celestial_ranger_base
- [ ] celestial_assassin_base

### 2.2. Rarity variants (idle state) — 6 rarity × 42 base = 252

> Odznaczaj per frakcja+klasa, wszystkie 6 rarity naraz, żeby nie rozpisywać 252 osobnych linii.
> Rarity: Common, Uncommon, Rare, Epic, Legendary, Mythic.

**Human:**
- [ ] human_warrior — all 6 rarity, idle
- [ ] human_mage — all 6 rarity, idle
- [ ] human_tank — all 6 rarity, idle
- [ ] human_healer — all 6 rarity, idle
- [ ] human_ranger — all 6 rarity, idle
- [ ] human_assassin — all 6 rarity, idle
- [ ] human_support — all 6 rarity, idle

**Elf:**
- [ ] elf_warrior — all 6 rarity, idle
- [ ] elf_ranger — all 6 rarity, idle
- [ ] elf_mage — all 6 rarity, idle
- [ ] elf_healer — all 6 rarity, idle
- [ ] elf_assassin — all 6 rarity, idle
- [ ] elf_support — all 6 rarity, idle
- [ ] elf_tank — all 6 rarity, idle

**Orc:**
- [ ] orc_warrior — all 6 rarity, idle
- [ ] orc_tank — all 6 rarity, idle
- [ ] orc_berserker — all 6 rarity, idle
- [ ] orc_shaman — all 6 rarity, idle
- [ ] orc_hunter — all 6 rarity, idle
- [ ] orc_support — all 6 rarity, idle
- [ ] orc_mage — all 6 rarity, idle

**Undead:**
- [ ] undead_warrior — all 6 rarity, idle
- [ ] undead_mage — all 6 rarity, idle
- [ ] undead_tank — all 6 rarity, idle
- [ ] undead_healer — all 6 rarity, idle
- [ ] undead_assassin — all 6 rarity, idle
- [ ] undead_support — all 6 rarity, idle
- [ ] undead_ranger — all 6 rarity, idle

**Demon:**
- [ ] demon_warrior — all 6 rarity, idle
- [ ] demon_mage — all 6 rarity, idle
- [ ] demon_tank — all 6 rarity, idle
- [ ] demon_assassin — all 6 rarity, idle
- [ ] demon_support — all 6 rarity, idle
- [ ] demon_healer — all 6 rarity, idle
- [ ] demon_ranger — all 6 rarity, idle

**Celestial:**
- [ ] celestial_warrior — all 6 rarity, idle
- [ ] celestial_mage — all 6 rarity, idle
- [ ] celestial_healer — all 6 rarity, idle
- [ ] celestial_tank — all 6 rarity, idle
- [ ] celestial_support — all 6 rarity, idle
- [ ] celestial_ranger — all 6 rarity, idle
- [ ] celestial_assassin — all 6 rarity, idle

### 2.3. Attack / Hit states (faza 3 — po idle)

- [ ] Wszystkie powyższe × `attack` state (42 base × 6 rarity)
- [ ] Wszystkie powyższe × `hit` state (42 base × 6 rarity)


### 2.4. Generic Unit Variants (3 different faces per faction+class)

> **Character Identity Types** (see 00_ART_DIRECTION.md): Generic Units are faction members (enemies, allies, troopers).
> Each should have a different face — do NOT reuse the HERO face.
> Generate 3 variants per class using faction templates, NOT the hero BASE as Image Guidance.

**Human:** 3 variants × 7 classes = 21
- [ ] human_warrior — 3 generic faces
- [ ] human_mage — 3 generic faces
- [ ] human_tank — 3 generic faces
- [ ] human_healer — 3 generic faces
- [ ] human_ranger — 3 generic faces
- [ ] human_assassin — 3 generic faces
- [ ] human_support — 3 generic faces

**Elf:** 3 × 7 = 21
- [ ] elf_warrior — 3 generic faces
- [ ] elf_ranger — 3 generic faces
- [ ] elf_mage — 3 generic faces
- [ ] elf_healer — 3 generic faces
- [ ] elf_assassin — 3 generic faces
- [ ] elf_support — 3 generic faces
- [ ] elf_tank — 3 generic faces

**Orc:** 3 × 7 = 21
- [ ] orc_warrior — 3 generic faces
- [ ] orc_tank — 3 generic faces
- [ ] orc_berserker — 3 generic faces
- [ ] orc_shaman — 3 generic faces
- [ ] orc_hunter — 3 generic faces
- [ ] orc_support — 3 generic faces
- [ ] orc_mage — 3 generic faces

**Undead:** 3 × 7 = 21
- [ ] undead_warrior — 3 generic faces
- [ ] undead_mage — 3 generic faces
- [ ] undead_tank — 3 generic faces
- [ ] undead_healer — 3 generic faces
- [ ] undead_assassin — 3 generic faces
- [ ] undead_support — 3 generic faces
- [ ] undead_ranger — 3 generic faces

**Demon:** 3 × 7 = 21
- [ ] demon_warrior — 3 generic faces
- [ ] demon_mage — 3 generic faces
- [ ] demon_tank — 3 generic faces
- [ ] demon_assassin — 3 generic faces
- [ ] demon_support — 3 generic faces
- [ ] demon_healer — 3 generic faces
- [ ] demon_ranger — 3 generic faces

**Celestial:** 3 × 7 = 21
- [ ] celestial_warrior — 3 generic faces
- [ ] celestial_mage — 3 generic faces
- [ ] celestial_healer — 3 generic faces
- [ ] celestial_tank — 3 generic faces
- [ ] celestial_support — 3 generic faces
- [ ] celestial_ranger — 3 generic faces
- [ ] celestial_assassin — 3 generic faces

**Total: 42 (faction+class) × 3 = 126 Generic Unit variants**

---

## 3. Item Icons (`03_ITEM_ICONS.md`)

Rozmiar: 256×256 WebP — folder: `public/assets/items/`

**Bronie:**
- [ ] iron_sword (Common)
- [ ] orcish_war_axe (Uncommon)
- [ ] mythril_blade (Rare)
- [ ] elven_longbow (Rare)
- [ ] flaming_sword (Epic)
- [ ] celestial_blade (Legendary)

**Eliksyry:**
- [ ] health_potion (Common)
- [ ] mana_potion (Uncommon)
- [ ] potion_of_strength (Rare)
- [ ] elixir_of_life (Legendary)

**Tarcze i zbroje:**
- [ ] wooden_shield (Common)
- [ ] chainmail_chest (Common)
- [ ] steel_shield (Uncommon)
- [ ] plate_armor (Rare)
- [ ] dragon_scale_shield (Epic)

**Waluta i klejnoty:**
- [ ] gold_coin
- [ ] silver_coin
- [ ] gem_red
- [ ] gem_blue
- [ ] gem_purple
- [ ] valor_token
- [ ] mana_crystal

**Akcesoria:**
- [ ] leather_backpack (Common)
- [ ] healing_herb (Common)
- [ ] magic_scroll (Uncommon)

---

## 4. Boss Creatures (`04_BOSS_CREATURES.md`)

Rozmiar: 512×512 (1024×1024 dla Epic/Legendary/Mythic) — folder: `public/assets/bosses/`
Stany: `idle`, `attack`, `hit`

| # | Boss | Rarity | idle | attack | hit |
|---|------|--------|------|--------|-----|
| 1 | fire_dragon | Legendary | [ ] | [ ] | [ ] |
| 2 | ice_lich | Epic | [ ] | [ ] | [ ] |
| 3 | earth_elemental | Rare | [ ] | [ ] | [ ] |
| 4 | abyss_demon | Mythic | [ ] | [ ] | [ ] |
| 5 | ancient_treant | Epic | [ ] | [ ] | [ ] |
| 6 | kraken | Legendary | [ ] | [ ] | [ ] |
| 7 | shadow_assassin | Legendary | [ ] | [ ] | [ ] |
| 8 | celestial_avatar | Legendary | [ ] | [ ] | [ ] |

---

## 5. UI Elements (`05_UI_ELEMENTS.md`)

Rozmiar: zmienna — folder: `public/assets/ui/`

**Ramki paneli (6 rarity):**
- [ ] panel_frame_common
- [ ] panel_frame_uncommon
- [ ] panel_frame_rare
- [ ] panel_frame_epic
- [ ] panel_frame_legendary
- [ ] panel_frame_mythic

**Przyciski:**
- [ ] button_gold
- [ ] button_silver
- [ ] button_wood

**Ikony:**
- [ ] heart_icon
- [ ] mana_orb
- [ ] shield_icon
- [ ] sword_crossed

**Paski postępu:**
- [ ] hp_bar_fill
- [ ] mp_bar_fill
- [ ] exp_bar_fill

---

## 6. Emotion Portraits (`06_EMOTION_PORTRAITS.md`)

Rozmiar: 512×512 WebP — folder: `public/assets/portraits/{faction}/`
**Half-body, BEZ NÓG** — to jest inny typ assetu niż sekcja 2 (Unit Portraits). Nie myl folderów.

Nazewnictwo: `{faction}_{class}_{emotion}.webp`

### 6.1. Human (priorytet — robimy jako pierwszą frakcję, faza 1-2)

21 General emotions (Neutral through Pain) + Special states (Mind Controlled through Berserk). See 06_EMOTION_PORTRAITS.md for full list.

- [ ] human_warrior — wszystkie 21 General emotions
- [ ] human_mage — wszystkie 21 General emotions
- [ ] human_tank — wszystkie 21 General emotions
- [ ] human_healer — wszystkie 21 General emotions
- [ ] human_ranger — wszystkie 21 General emotions
- [ ] human_assassin — wszystkie 21 General emotions
- [ ] human_support — wszystkie 21 General emotions

### 6.2. Pozostałe frakcje (faza 3 — pełny zestaw)

- [ ] elf — wszystkie klasy × 21 General emotions
- [ ] orc — wszystkie klasy × 21 General emotions
- [ ] undead — wszystkie klasy × 21 General emotions
- [ ] demon — wszystkie klasy × 21 General emotions
- [ ] celestial — wszystkie klasy × 21 General emotions

---

## 7. Environment Effects (`07_ENVIRONMENT_EFFECTS.md`)

Rozmiar: 256×256 do 512×512 — folder: `public/assets/effects/`

**Pogoda (`effects/weather/`):**
- [ ] rain_overlay
- [ ] snow_overlay
- [ ] fog_overlay
- [ ] storm_overlay
- [ ] leaves_overlay
- [ ] sparks_overlay
- [ ] smoke_overlay

**Magia (`effects/magic/`):**
- [ ] portal_blue
- [ ] portal_purple
- [ ] flash_effect
- [ ] healing_effect
- [ ] fire_effect
- [ ] ice_effect
- [ ] shadow_effect
- [ ] light_effect

**Eventy (`effects/events/`):**
- [ ] festival_sparks
- [ ] harvest_glow

---

## 8. Avatary (crop z portretów, faza 3)

Rozmiar: 128×128 WebP — folder: `public/assets/avatars/{faction}/`
Generowane przez crop z Unit Portraits (sekcja 2), nie osobny prompt.

- [ ] human — 7 klas (crop z BASE lub Common idle)
- [ ] elf — 7 klas
- [ ] orc — 7 klas
- [ ] undead — 7 klas
- [ ] demon — 7 klas
- [ ] celestial — 7 klas

---

## Podsumowanie postępu

| Kategoria | Zrobione / Wszystkie | % |
|-----------|----------------------|---|
| Battle Backgrounds | 0 / 7 | 0% |
| Unit Portraits BASE | 0 / 42 | 0% |
| Unit Portraits (rarity, idle) | 0 / 252 | 0% |
| Unit Portraits (attack+hit) | 0 / 504 | 0% |
| Generic Unit Variants (3 faces) | 0 / 126 | 0% |
| Item Icons | 0 / 21 | 0% |
| Boss Creatures (3 stany) | 0 / 24 | 0% |
| UI Elements | 0 / 16 | 0% |
| Emotion Portraits (Human) -- General | 0 / 147 | 0% |
| Emotion Portraits (pozostałe 5 frakcji) -- General | 0 / 735 | 0% |
| Environment Effects | 0 / 17 | 0% |
| Avatary | 0 / 42 | 0% |

---

## REFERENCE LOCK (BASE Models)

Before any rarity variants are generated, each BASE model must be approved as a style anchor.

**42 BASE models total — one per faction+class combination.**

### Human (7)
- [ ] REF_001 human_warrior_base (Style Anchor - PENDING)
- [ ] REF_002 human_mage_base (Style Anchor - PENDING)
- [ ] REF_003 human_tank_base (Style Anchor - PENDING)
- [ ] REF_004 human_healer_base (Style Anchor - PENDING)
- [ ] REF_005 human_ranger_base (Style Anchor - PENDING)
- [ ] REF_006 human_assassin_base (Style Anchor - PENDING)
- [ ] REF_007 human_support_base (Style Anchor - PENDING)

### Elf (7)
- [ ] REF_008 elf_warrior_base
- [ ] REF_009 elf_ranger_base
- [ ] REF_010 elf_mage_base
- [ ] REF_011 elf_healer_base
- [ ] REF_012 elf_assassin_base
- [ ] REF_013 elf_support_base
- [ ] REF_014 elf_tank_base

### Orc (7)
- [ ] REF_015 orc_warrior_base
- [ ] REF_016 orc_tank_base
- [ ] REF_017 orc_berserker_base
- [ ] REF_018 orc_shaman_base
- [ ] REF_019 orc_hunter_base
- [ ] REF_020 orc_support_base
- [ ] REF_021 orc_mage_base

### Undead (7)
- [ ] REF_022 undead_warrior_base
- [ ] REF_023 undead_mage_base
- [ ] REF_024 undead_tank_base
- [ ] REF_025 undead_healer_base
- [ ] REF_026 undead_assassin_base
- [ ] REF_027 undead_support_base
- [ ] REF_028 undead_ranger_base

### Demon (7)
- [ ] REF_029 demon_warrior_base
- [ ] REF_030 demon_mage_base
- [ ] REF_031 demon_tank_base
- [ ] REF_032 demon_assassin_base
- [ ] REF_033 demon_support_base
- [ ] REF_034 demon_healer_base
- [ ] REF_035 demon_ranger_base

### Celestial (7)
- [ ] REF_036 celestial_warrior_base
- [ ] REF_037 celestial_mage_base
- [ ] REF_038 celestial_healer_base
- [ ] REF_039 celestial_tank_base
- [ ] REF_040 celestial_support_base
- [ ] REF_041 celestial_ranger_base
- [ ] REF_042 celestial_assassin_base

> Zaktualizuj tę tabelę ręcznie po większych partiach (nie musi być 1:1 z każdą sesją).
