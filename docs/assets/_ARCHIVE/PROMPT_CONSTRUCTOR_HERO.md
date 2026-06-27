# PROMPT_CONSTRUCTOR_HERO.md

> **UŻYCIE:** Generuj jednostki Hero (Warrior, Mage, Tank itp.) za pomocą tego pliku.
> Pamiętaj o globalnych Złotych Zasadach z `PROMPT_CONSTRUCTOR.md`.

---

## FINALNY SZABLON PROMPTU (legacy)

> Aktualny PoC produkcyjny znajduje się w `17_HUMAN_WARRIOR_POC_V3.md`.
> Dla nowych atlasów Hero używaj najpierw kontraktów z `14_PRODUCTION_SPRITE_ATLAS_CONTRACT.md`, `15_GLOBAL_REFERENCE_FRAME_SYSTEM.md` i `16_PROMPT_MODULE_SYSTEM.md`.

## FINALNY SZABLON PROMPTU (do wklejenia do ChatGPT)

Generate ONE single sprite sheet for a mobile RPG. Image ratio: 3:2. Resolution: 2048x1365. The image is a perfectly geometric 2x3 grid (2 rows, 3 columns, exactly 6 equal rectangular cells). The grid is perfectly symmetric; dividers are perfectly straight.

CRITICAL LAYOUT:
- Background of grid borders: flat medium-grey (#808080).
- Background directly behind each character: flat solid chroma green (#00A651).
- Every character is FULL BODY. Feet must be fully visible.
- Character occupies 70-75% of the cell height.
- CRITICAL: Nothing may cross cell borders. No weapons, wings, shields, or cloaks may overlap into adjacent cells.

CHARACTER LOCK:
Every cell depicts the EXACT SAME adult {faction} {class}. Identical face, identical body proportions, identical pose, identical camera angle.

HERALDRY & SHAPE CONSISTENCY (DO NOT BREAK):
- The shield shape is STRICTLY a "kite shield" (pointed at the bottom) in ALL cells. 
- The heraldic emblem on chestplate and shield is MANDATORY in EVERY cell. It is the same metallic sculpture in every cell, only the material finish changes.

CELL DEFINITIONS (Row 1, Left to Right):
(Insert Rarity Delta Table here - e.g., Human Warrior table from your original file)

STYLE: Stylized fantasy 3D render, crisp textures, game-ready asset, similar to "AFK Arena". Soft studio lighting.

NEGATIVE PROMPT: photorealistic, anime, manga, pixel art, text, watermark, logo, cropped, cut off, missing feet, cropped wings, wings out of frame, weapons overlapping, asymmetric grid, uneven cells, ground shadows, round shield, disc shield, lion head only, halo.

---

## REFERENCE FRAME MODULE

Use this module for new Hero rarity atlases:

```text
REFERENCE FRAME
Every sprite slot contains one invisible Reference Frame.
Every Reference Frame has identical size.
Every Reference Frame has identical position.
Every hero must fit completely inside its own Reference Frame.
The body, armor, shield and weapon always fit inside the Reference Frame.
Only magical effects may extend outside the Reference Frame.
Nothing may ever leave the Sprite Slot.
```

## HERO IDENTITY MODULE

```text
Imagine one finished 3D game character.
Duplicate this exact same model six times.
Each duplicate has exactly the same size.
Do NOT redraw the character.
Do NOT reinterpret the character.
Do NOT rescale the character.
Only equipment and magical effects evolve.
```

## RARITY CONTRACT MODULE

```text
Every rarity inherits everything from the previous rarity.
Nothing disappears.
Nothing is redesigned.
Only additions are allowed.
```

