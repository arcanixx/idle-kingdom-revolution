# SPRITE_SLICING_SPEC v1.0

Project:
Idle Kingdom Revolution

Purpose:
Defines how generated sprite atlases are sliced into individual game assets.

---

## DEFAULT HERO RARITY ATLAS

Default atlas:

- width: 2048 px
- height: 1365 px
- columns: 3
- rows: 2
- slots: 6

Because 2048 / 3 and 1365 / 2 are not clean integers, slicing scripts must account for remainder pixels deterministically.

Recommended slicing approach:

- compute boundaries by ratio, not by rounded fixed slot size
- use integer rounded boundaries
- ensure the final column and final row end exactly at image bounds

---

## SLOT ORDER

```text
Row 1:
[0] Common    [1] Uncommon    [2] Rare

Row 2:
[3] Epic      [4] Legendary   [5] Mythic
```

Canonical rarity order:

```text
common
uncommon
rare
epic
legendary
mythic
```

---

## BOUNDARY RULE

For `cols = 3` and `rows = 2`:

```text
x0 = round(width  * col / cols)
x1 = round(width  * (col + 1) / cols)
y0 = round(height * row / rows)
y1 = round(height * (row + 1) / rows)
```

This avoids losing pixels at the right and bottom edges.

---

## SEPARATOR HANDLING

The atlas uses grey separators for human visual inspection.

When slicing, a small inset may be applied to avoid separator pixels in the output.

Recommended inset:

- 4 to 8 px for 2048 x 1365 atlases
- never inset so much that sword, wings, cloak, or aura are clipped

If separators are thick or uneven, regenerate the atlas instead of using aggressive insets.

---

## BACKGROUND REMOVAL

After slicing, remove the chroma green background from each slot.

Key color:

```text
#00A651
```

Tolerance should be conservative.

Do not remove:

- blue aura
- greenish magic if intentionally present
- transparent glow edges
- anti-aliased sword edges
- wing feather highlights

If the subject contains green effects, prefer a different chroma background in the prompt for that asset family.

---

## CANVAS NORMALIZATION

Keep a consistent transparent canvas across all six sprites in the same rarity family.

The output sprite should not be tightly trimmed per rarity if that changes in-game scale.

Recommended sequence:

1. slice equal slots
2. remove green
3. preserve slot canvas ratio
4. resize all six outputs with the same target size

---

## OUTPUT SIZE

Default final hero sprite size:

```text
512 x 512 WebP with alpha
```

If the source slot is rectangular, fit the full slot into 512 x 512 with transparent padding rather than cropping the subject.

This keeps sword and wings safe.

---

## VALIDATION AFTER SLICING

Every output sprite must pass:

- transparent background
- no grey separator pixels
- no green background remnants at corners
- no cropped subject
- same visual scale across all rarity outputs
- same baseline across all rarity outputs
- file opens in browser and game runtime

---

## FUTURE SCRIPT TARGET

A future script should support:

```text
scripts/assets/slice-rarity-atlas.ts
```

Suggested command shape:

```text
npm run assets:slice -- \
  --input raw_assets/atlases/human/warrior/male/human_warrior_male_rarity_idle_atlas_v001.png \
  --faction human \
  --class warrior \
  --gender male \
  --state idle \
  --out public/assets/units/human/heroes/warrior/male
```

The script should write both WebP files and manifest metadata.
