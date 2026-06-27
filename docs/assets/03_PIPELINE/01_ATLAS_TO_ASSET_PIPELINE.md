# ATLAS_TO_GAME_ASSET_PIPELINE v1.0

Project:
Idle Kingdom Revolution

Purpose:
Defines the production path from generated rarity atlas to game-ready WebP assets.

---

## PIPELINE SUMMARY

```text
Final Prompt
  -> Generated PNG Atlas
  -> Visual QA
  -> Archive Raw Atlas
  -> Slice into 6 sprites
  -> Remove chroma green
  -> Trim / pad consistently
  -> Export WebP
  -> Rename files
  -> Update asset manifest
  -> In-game visual check
```

---

## STEP 1: GENERATE ATLAS

Generate the atlas using the approved production prompt.

For the first production family, use:

- `02_POC/HUMAN_WARRIOR_V3.md`

Generation target:

- PNG
- 2048 x 1365 preferred
- 3:2 aspect ratio
- no text
- no labels
- no watermark
- chroma green slot backgrounds

Save raw files before editing.

Recommended raw path:

```text
raw_assets/atlases/{faction}/{class}/{gender}/{faction}_{class}_{gender}_rarity_idle_atlas_v001.png
```

Example:

```text
raw_assets/atlases/human/warrior/male/human_warrior_male_rarity_idle_atlas_v001.png
```

---

## STEP 2: VISUAL QA

Use `03_PIPELINE/00_QA_ACCEPTANCE_GATES.md` before any slicing.

Do not slice failed atlases.

A rejected atlas remains useful only as prompt feedback.

---

## STEP 3: SLICE ATLAS

Slice order is always left to right, top to bottom:

1. Common
2. Uncommon
3. Rare
4. Epic
5. Legendary
6. Mythic

The output files are individual full-body unit sprites.

---

## STEP 4: REMOVE CHROMA BACKGROUND

Remove flat chroma green `#00A651` after slicing.

The grey separators should never appear inside final sprites.

Final sprites must have transparent background.

Avoid aggressive edge removal that eats glow, sword edges, wing feathers, or shield silhouettes.

---

## STEP 5: NORMALIZE CANVAS

Every sliced rarity sprite in one family should keep the same final canvas size.

Do not trim each rarity differently if that causes in-game scale drift.

Recommended rule:

- slice from atlas first
- remove green background
- keep a consistent transparent canvas per rarity family
- only downscale as a family, not per sprite

This preserves the Reference Frame.

---

## STEP 6: EXPORT WEBP

Default unit output:

- format: WebP
- alpha: yes
- target display size: 512 x 512 or project-selected unit size
- keep source PNG archived

Suggested quality:

- `q=85` for heroes
- `q=80` for generic units
- `q=90` for visual anchors or store/promo assets

---

## STEP 7: NAMING

Hero naming pattern:

```text
{faction}_{class}_{gender}_{rarity}_{state}.webp
```

Example:

```text
human_warrior_male_common_idle.webp
human_warrior_male_uncommon_idle.webp
human_warrior_male_rare_idle.webp
human_warrior_male_epic_idle.webp
human_warrior_male_legendary_idle.webp
human_warrior_male_mythic_idle.webp
```

---

## STEP 8: DESTINATION

Recommended final path:

```text
public/assets/units/{faction}/heroes/{class}/{gender}/
```

Example:

```text
public/assets/units/human/heroes/warrior/male/human_warrior_male_common_idle.webp
```

---

## STEP 9: MANIFEST

Every final sprite should be represented in the asset manifest.

Minimum metadata:

```json
{
  "assetId": "human_warrior_male_common_idle",
  "type": "unit",
  "role": "hero",
  "faction": "human",
  "class": "warrior",
  "gender": "male",
  "rarity": "common",
  "state": "idle",
  "path": "/assets/units/human/heroes/warrior/male/human_warrior_male_common_idle.webp",
  "sourceAtlas": "human_warrior_male_rarity_idle_atlas_v001.png",
  "approved": true
}
```

---

## DO NOT

- do not use an atlas with labels as production input
- do not use an atlas with watermark
- do not crop every rarity independently
- do not resize Mythic differently from Common
- do not remove glow by over-trimming alpha
- do not accept broken heraldry just because the render looks good
