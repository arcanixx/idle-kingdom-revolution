# PROMPTS.md – Zbiór zatwierdzonych promptów

> **UWAGA:** Ten plik zawiera **tylko zatwierdzone prompty** (Style Anchors).
> Prompty tymczasowe/testowe NIE są tutaj zapisywane – trzymamy je osobno.

## Struktura pliku

- Każdy prompt ma unikalny identyfikator: `REF_XXX_{FACTION}_{CLASS}_BASE`
- Po zatwierdzeniu BASE jako Style Anchor, prompt jest przenoszony do tego pliku.
- Prompty dla rarity (Common → Mythic) są generowane na podstawie BASE – nie zapisujemy ich tutaj, tylko w `PROMPT_CONSTRUCTOR.md`.

**Obecnie zatwierdzone:**
- `REF_001_HUMAN_WARRIOR_BASE` – zatwierdzony, używany jako Style Anchor.


## Płeć w promptach

- **Hero:** Generuj obie płcie (Male + Female) dla wybranej frakcji + klasy.
- **Generic Unit:** 65% male, 35% female (Orc: 70/30, Celestial: androgyniczne).
- **NPC:** Zgodnie ze scenariuszem.
- **Wiek:** Patrz 00_ART_DIRECTION.md → GENDER REPRESENTATION → Age Diversity.

**Przykład promptu z płcią:**
```
...female, young adult, soft studio lighting...
```
===============================================================================

REF_001_HUMAN_WARRIOR

Generate ONE single sprite sheet for a mobile RPG. Image ratio: 3:2. Resolution: 2048x1365. The image is a perfectly geometric 2x3 grid (2 rows, 3 columns, exactly 6 equal rectangular cells). The grid is perfectly symmetric; dividers are perfectly straight.

CRITICAL LAYOUT:
- Background of grid borders: flat medium-grey (#808080).
- Background directly behind each character: flat solid chroma green (#00A651).
- Every character is FULL BODY. Feet must be fully visible.
- The character occupies 70-75% of the cell height. Leaves 25-30% empty vertical space at the top for wings and auras.
- CRITICAL: Nothing may cross cell borders. No weapons, wings, shields, or cloaks may overlap into adjacent cells.
- Add an extra 10% empty vertical padding at the TOP of each cell for wings and auras. Wings must fit within this padding without being cropped.
- The lion on the shield is a full-body standing lion, NOT a 3D lion's head. Only the material (painted vs 3D gold) changes.

CHARACTER LOCK:
Every cell depicts the EXACT SAME adult human male warrior.
- Identical face, strong jawline, short brown hair, trimmed beard.
- Identical body proportions, heroic build.
- Identical neutral standing pose, facing 3/4 front view to the LEFT.
- Identical camera zoom, distance, and angle across all 6 cells.

HERALDRY & SHAPE CONSISTENCY (DO NOT BREAK):
- The shield shape is STRICTLY a "kite shield" (pointed at the bottom) in ALL 6 cells. NO round shields, NO disc shields.
- The heraldic golden lion emblem on the chestplate is MANDATORY in EVERY cell. It is the same metallic sculpture in every cell, only the material finish changes.
- The heraldic golden lion on the shield is the exact same full-body standing lion pose in EVERY cell. It is NOT a lion's head; it is a full lion. Only the depth (flat vs 3D) and material finish evolves.

CELL DEFINITIONS (Row 1, Left to Right):
1. COMMON: Polished steel plate armor. Matte/painted gold lion on chestplate. Simple steel longsword. Plain blue kite shield with flat painted gold full-body lion. Simple blue tabard. No gold trim. No cape. No magical effects.
2. UNCOMMON: Polished steel armor with subtle gold trim on edges. Kite shield with a thin gold border and a slightly raised 3D full-body lion emblem (same pose). Longsword with a gold crossguard. Simple blue shoulder cape. No aura.
3. RARE: Silver-blue steel armor with blue glowing runes. Kite shield with a thick gold border and a 3D full-body lion with glowing blue eyes. Sword with a blue rune. Half-cloak with gold fringe. Subtle blue aura.

CELL DEFINITIONS (Row 2, Left to Right):
4. EPIC: Ornate gold armor with ruby gems. Gold lion with ruby eyes on chestplate. Kite shield with filigree patterns and a 3D ruby-eyed full-body lion. Sword with gold hilt and rubies. Full flowing blue cloak. Moderate gold aura with sparks. Glowing eyes.
5. LEGENDARY: White-gold celestial armor. Glowing gold lion on chestplate. Kite shield with small angel wings and a radiant lion. Sword of pure light. Large white angel wings of light on back. Strong luminous aura, floating particles. NO halo.
6. MYTHIC: Cosmic night-sky armor. Galaxy-shaped glowing gold lion on chestplate. Kite shield with a swirling galaxy inside it AND the exact same standing lion emblem overlaid in starlight. Sword of starlight with lightning sparks. Large ethereal stardust wings. Cosmic nebula aura. Stardust particles around the head.

STYLE: Stylized fantasy 3D render, crisp textures, game-ready asset, similar to "AFK Arena". Soft studio lighting. High readability.
NEGATIVE PROMPT: photorealistic, anime, manga, pixel art, text, watermark, logo, cropped, cut off, missing feet, cropped wings, wings out of frame, weapons overlapping, asymmetric grid, uneven cells, ground shadows, round shield, disc shield, lion head only, aureola, halo.


===============================================================================
