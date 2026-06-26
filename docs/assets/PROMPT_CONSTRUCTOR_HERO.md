# PROMPT_CONSTRUCTOR_HERO.md

> **UŻYCIE:** Generuj jednostki Hero (Warrior, Mage, Tank itp.) za pomocą tego pliku.
> Pamiętaj o globalnych Złotych Zasadach z `PROMPT_CONSTRUCTOR.md`.

---

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
