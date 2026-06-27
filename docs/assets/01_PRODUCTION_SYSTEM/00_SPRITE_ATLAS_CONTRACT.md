# PRODUCTION_SPRITE_ATLAS_CONTRACT v1.0

Project:
Idle Kingdom Revolution

Purpose:
Shared contract for generated production sprite atlases.

This document defines how multi-sprite image outputs must be structured when they are intended for automatic slicing into independent game assets.

---

## CORE PRINCIPLE

A sprite atlas is not an illustration.

A sprite atlas is a production export format.

The image must behave like a clean asset sheet exported from a game engine: predictable, geometric, sliceable, and consistent across every slot.

---

## ATLAS OUTPUT

Default hero rarity atlas:

- one image
- 2048 x 1365
- 3:2 aspect ratio
- 2 rows
- 3 columns
- exactly six sprite slots
- all sprite slots have identical width
- all sprite slots have identical height

The atlas must contain no title text, no labels, no prompt text, no watermark, and no UI decoration.

---

## SPRITE SLOT

Use the term `Sprite Slot` instead of `Grid Cell` in production prompts.

A Sprite Slot is the exact slice region that will become one exported sprite.

Every Sprite Slot must be:

- rectangular
- equal in size
- perfectly aligned
- separated by straight horizontal and vertical dividers
- free from overlap with neighboring slots

No weapon, wing, cloak, aura, particle, shadow, or effect may cross from one Sprite Slot into another.

---

## BACKGROUND CONTRACT

Atlas separators:

- flat neutral grey `#808080`

Inside every Sprite Slot:

- flat chroma green `#00A651`
- exactly one RGB value
- no gradient
- no texture
- no lighting
- no vignette
- no ground shadow

The chroma background exists only to make downstream masking and slicing easier.

---

## PRODUCTION ALIGNMENT

Every Sprite Slot is a production reference.

Rows and columns must never drift.

Every generated subject must preserve identical:

- horizontal center
- vertical center
- camera distance
- focal length
- rotation
- pose baseline
- eye height
- shoulder height
- hip height
- feet baseline

For character atlases, visual effects may become richer by rarity, but they must never make the character model appear larger.

---

## SLICE SAFETY

Before accepting an atlas, verify:

- every slot is equal size
- dividers are straight
- full body is visible
- feet are visible
- weapons are visible
- shields are visible
- wings are visible
- no effects are cropped
- no slot overlaps another slot
- no text appears anywhere in the image

---

## NEGATIVE RULES

Forbidden in production atlases:

- artistic collage layout
- perspective grid
- uneven slots
- diagonal dividers
- overlapping characters
- cropped weapons
- cropped wings
- cropped feet
- prompt text inside the image
- labels inside the image
- UI frames inside the image
- environment backgrounds
- ground shadows
