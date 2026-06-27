# 09 – Asset List Reference

> Pełna lista wszystkich assetów z podziałem na kategorie, ilości i fazy.

---

## Podsumowanie

| Kategoria | Sztuk | Rozmiar | Faza |
|-----------|-------|---------|------|
| Battle Backgrounds | 7 | 1920×1080 | 1 |
| Unit Portraits (Hero: 1 faction × 7 classes × 6 rarity × 3 states × 2 genders) | 252 | 512×512 | 1-3 |
| Item Icons | ~15 | 256×256 | 1-2 |
| Boss Creatures | 6 | 512×512 / 1024×1024 | 1-2 |
| UI Elements | ~8 | zmienna | 2-3 |
| Avatars (crop) | 42 | 128×128 | 3 |
| Emotion Portraits | ~10-15 | 512×512 | 1-3 |
| Environment Effects | ~10 | 256×512 | 2-3 |

---

## Szczegółowa lista

### Battle Backgrounds (7)

| # | Nazwa pliku | Frakcja |
|---|-------------|---------|
| 1 | plains.webp | Human / Neutral |
| 2 | forest.webp | Elf |
| 3 | mountains.webp | Neutral |
| 4 | desert.webp | Orc |
| 5 | ice_land.webp | Undead |
| 6 | volcano.webp | Demon |
| 7 | dungeon.webp | Celestial / Neutral |

### Unit Portraits (Hero: 252 pliki + Generic: 126 + NPC: per story)

**Frakcje (6):** Human, Elf, Orc, Undead, Demon, Celestial
**Klasy (7):** Warrior, Mage, Tank, Healer, Ranger, Assassin, Support
**Rarity (6):** Common, Uncommon, Rare, Epic, Legendary, Mythic
**Stany (3):** idle, attack, hit
**Character Types (3):** Hero (party members, 1 faction active), Generic Unit (3 facial variants per class, Common idle), NPC (unique face)
**Płeć (2):** Male, Female (per character choice)

**Docelowo (na 1 aktywną frakcję):**
- Hero: 7 classes × 6 rarity × 3 states × 2 genders = **252 pliki**
- Generic Unit: 6 factions × 7 classes × 3 faces = **126 plików** (Common, idle)
- NPC: per story demand (unique face, any class/faction)

> **Dlaczego 252, a nie 36?** Bo gracz ma drużynę (party) – może mieć do 7 różnych klas w swoim składzie.
> Każda z nich otrzymuje pełną progresję rarity. Tylko 1 frakcja jest aktywna na playthrough.
> Generic Units (3 twarze = 3 różne wyglądy twarzy) pokrywają pozostałe 5 frakcji + wrogów.

### Item Icons (~15)

| # | Nazwa | Rarity |
|---|-------|--------|
| 1 | iron_sword | Common |
| 2 | mythril_blade | Rare |
| 3 | flaming_sword | Epic |
| 4 | celestial_blade | Legendary |
| 5 | orcish_war_axe | Uncommon |
| 6 | elven_longbow | Rare |
| 7 | health_potion | Common |
| 8 | mana_potion | Uncommon |
| 9 | potion_of_strength | Rare |
| 10 | elixir_of_life | Legendary |
| 11 | wooden_shield | Common |
| 12 | steel_shield | Uncommon |
| 13 | dragon_scale_shield | Epic |
| 14 | gold_coin | Common |
| 15 | mana_crystal | Uncommon |

### Boss Creatures (6)

| # | Boss | Rarity |
|---|------|--------|
| 1 | Fire Dragon | Legendary |
| 2 | Ice Lich | Epic |
| 3 | Earth Elemental | Rare |
| 4 | Abyss Demon | Mythic |
| 5 | Ancient Treant | Epic |
| 6 | Kraken | Legendary |

### Emotion Portraits (podstawowy zestaw – 15 emocji × 1 frakcja)

| # | Emotion | # | Emotion |
|---|---------|---|---------|
| 1 | Neutral | 9 | Suspicious |
| 2 | Happy | 10 | Shocked |
| 3 | Angry | 11 | Confused |
| 4 | Sad | 12 | Tired |
| 5 | Surprised | 13 | Scheming |
| 6 | Scared | 14 | Heroic |
| 7 | Serious | 15 | Menacing |
| 8 | Laughing | | |

---

## Fazy realizacji

**FAZA 1 (MVP):**
- 7 × Battle Backgrounds
- 7 × Unit Portraits (BASE, tylko Common, idle)
- 3 × Item Icons (health_potion, gold_coin, mana_crystal)
- 1 × Boss (Fire Dragon)
- 3 × Emotion Portraits (Happy, Angry, Scared – Human)

**FAZA 2 (Podstawowy zestaw):**
- 7 × Unit Portraits → wszystkie rarity (Common → Mythic, idle)
- 28 × Unit Portraits (4 klasy × 1 frakcja, wszystkie rarity)
- Reszta Item Icons
- 3 × Boss (Ice Lich, Earth Elemental, Abyss Demon)
- UI ramki na 3 rarity
- 10 × Emotion Portraits (podstawowy zestaw dla Human)

**FAZA 3 (Pełnia):**
- Hero (1 faction × 7 classes × 6 rarity × 3 states × 2 genders = 252 pliki)
- Generic Unit Variants (6 factions × 7 classes × 3 faces = 126)
- Wszyscy bossowie (6)
- Wszystkie UI (8)
- Avatary (42)
- Pełen zestaw Emotion Portraits (dla wszystkich frakcji)
- NPC portrety (wg potrzeb fabularnych)
