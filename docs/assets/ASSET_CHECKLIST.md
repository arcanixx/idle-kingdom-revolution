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

15 emocji: Neutral, Happy, Angry, Sad, Surprised, Scared, Serious, Laughing, Suspicious, Shocked, Confused, Tired, Scheming, Heroic, Menacing.

- [ ] human_warrior — wszystkie 15 emocji
- [ ] human_mage — wszystkie 15 emocji
- [ ] human_tank — wszystkie 15 emocji
- [ ] human_healer — wszystkie 15 emocji
- [ ] human_ranger — wszystkie 15 emocji
- [ ] human_assassin — wszystkie 15 emocji
- [ ] human_support — wszystkie 15 emocji

### 6.2. Pozostałe frakcje (faza 3 — pełny zestaw)

- [ ] elf — wszystkie klasy × 15 emocji
- [ ] orc — wszystkie klasy × 15 emocji
- [ ] undead — wszystkie klasy × 15 emocji
- [ ] demon — wszystkie klasy × 15 emocji
- [ ] celestial — wszystkie klasy × 15 emocji

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
| Item Icons | 0 / 21 | 0% |
| Boss Creatures (3 stany) | 0 / 24 | 0% |
| UI Elements | 0 / 16 | 0% |
| Emotion Portraits (Human) | 0 / 105 | 0% |
| Emotion Portraits (pozostałe 5 frakcji) | 0 / 525 | 0% |
| Environment Effects | 0 / 17 | 0% |
| Avatary | 0 / 42 | 0% |

> Zaktualizuj tę tabelę ręcznie po większych partiach (nie musi być 1:1 z każdą sesją).
