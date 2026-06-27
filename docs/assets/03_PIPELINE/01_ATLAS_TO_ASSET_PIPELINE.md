# ATLAS_TO_GAME_ASSET_PIPELINE v1.1

Project:
Idle Kingdom Revolution

Purpose:
Defines the production path from generated rarity atlas to game-ready WebP assets.

> **v1.1 change log (2026-06-27):** Updated raw atlas naming to require an
> explicit `_MALE` / `_FEMALE` segment — without it, two atlases for the
> same Race+Faction+Class (different gender only) produce identical
> filenames and become impossible to tell apart before slicing. Also
> updated all `{faction}_{class}_...` patterns to `{race}_{faction}_{class}_...`
> per the Race/Faction split in `00_FOUNDATION/00_ART_DIRECTION.md`, and
> documented the actual cropping script (`SCRIPTS/crop_grid.py`) instead of
> only describing the pipeline in the abstract.

---

## PIPELINE SUMMARY

```text
Final Prompt
  -> Generated PNG Atlas (compressed OK for review, lossless for final cut)
  -> Visual QA
  -> Archive Raw Atlas
  -> Slice into 6 sprites (SCRIPTS/crop_grid.py)
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

Accepted production prompts so far:

- `02_POC/HUMAN_WARRIOR_V3.md` (Race: Human, Faction: Lion Kingdom, Class: Warrior)
- `02_POC/HUMAN_MAGE_V1.md` (Race: Human, Faction: Lion Kingdom, Class: Mage)
- `02_POC/ORC_LION_KINGDOM_TANK_V1.md` (Race isolation test — Race: Orc, Faction: Lion Kingdom, Class: Tank)
- `02_POC/HUMAN_IRON_LEGION_RANGER_V1.md` (Faction isolation test — Race: Human, Faction: Iron Legion, Class: Ranger)

Generation target:

- PNG
- 2048 x 1365 preferred
- 3:2 aspect ratio
- no text
- no labels
- no watermark
- chroma green slot backgrounds

### Compressed review copy vs lossless cutting copy

> Added v1.1, based on a real production constraint: a lossless PNG at this
> resolution runs close to 3 MB, while a web-compressed version of the same
> image at the same resolution can be ~800 KB with no visible detail loss
> for *review* purposes. Some generation/upload tools also start treating a
> very large pasted prompt or file as an attachment rather than inline
> content, which is a separate but related size-consciousness issue (see
> `01_PRODUCTION_SYSTEM/04_KNOWN_IMPROVEMENTS_BACKLOG.md` for the prompt-length
> version of this problem).

It is fine to:

- generate and review the atlas using a **compressed** export (smaller file,
  faster to share/upload, good enough to judge Gate 1-6 in
  `03_PIPELINE/00_QA_ACCEPTANCE_GATES.md`)
- only re-export or re-fetch a **lossless** version of an atlas that has
  already passed QA, immediately before running `SCRIPTS/crop_grid.py` on it

Do NOT slice a compressed copy for final production assets if a lossless
copy is available — compression artifacts around weapon edges, glow, and
heraldry lines will propagate into every sliced sprite and every rarity tier
derived from it. Compressed copies are a review/QA convenience, not a
production source.

### Raw atlas naming (BEFORE slicing)

> **Critical:** the cropping script (`SCRIPTS/crop_grid.py`) does not read
> Race/Faction/Class/Gender from the image — it only crops by grid position
> and outputs generic filenames (`asset_1_01.png`, etc). All identifying
> information must live in the **raw atlas filename**, because that is the
> only place this information exists before slicing. Get this wrong and you
> will not be able to tell two atlases apart once their generic crops are on
> disk.

Required raw atlas filename pattern:

```text
{RACE}_{FACTION}_{CLASS}_{GENDER}_V{version}.png
```

`{GENDER}` MUST be either `MALE` or `FEMALE`, written out in full — not
abbreviated, not omitted. Two atlases that are identical except for gender
will otherwise produce **the same filename**, which is exactly the mistake
this naming rule exists to prevent.

Examples actually in use (`assets/` in repo root, as a working/review
location ahead of formal archiving — see DESTINATION note below):

```text
HUMAN_LION_KINGDOM_WARRIOR_MALE_v3.png
HUMAN_LION_KINGDOM_MAGE_MALE_v1.png
ORC_LION_KINGDOM_TANK_MALE_V1.png
HUMAN_IRON_LEGION_RANGER_FEMALE_V1.png
```

> Note: as of this writing, the actual file on disk for the last example is
> named `HUMAN_IRON_LEGION_FEMALE_V1.png` — missing the `_RANGER_` class
> segment. This is flagged here as a concrete example of why the full
> pattern matters: without `_RANGER_`, this filename alone does not tell you
> which class this atlas is for. Rename it to include the class segment
> before archiving/slicing.

Recommended formal raw archive path (once moved out of the working
`assets/` folder):

```text
raw_assets/atlases/{race}/{faction}/{class}/{gender}/{race}_{faction}_{class}_{gender}_v{NNN}.png
```

Example:

```text
raw_assets/atlases/human/lion_kingdom/warrior/male/human_lion_kingdom_warrior_male_v003.png
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

### Actual tool: `SCRIPTS/crop_grid.py`

```bash
python crop_grid.py <input_image> <output_folder> --rows 2 --cols 3 --margin 40
```

This script:

- splits the image into a 2x3 grid (rows x cols) by pixel division, not by
  detecting Reference Frame boundaries — it trusts that the atlas grid is
  geometrically even (per `01_PRODUCTION_SYSTEM/00_SPRITE_ATLAS_CONTRACT.md`)
- applies a margin (default 40px) inward from each cell edge, to avoid
  capturing the grey atlas separator in each crop
- outputs generic filenames (`asset_1_01.png` ... `asset_2_03.png`) — it
  does **not** know about rarity, race, faction, class, or gender
- does **not** remove the chroma green background — that is a separate step
  (STEP 4 below), not yet automated by this script as of this writing

Because slice order is always left-to-right, top-to-bottom, the mapping from
script output to rarity is fixed and must be applied manually (or by a
follow-up renaming step) after running the script:

| Script output | Rarity |
|----------------|--------|
| `asset_1_01.png` | Common |
| `asset_1_02.png` | Uncommon |
| `asset_1_03.png` | Rare |
| `asset_2_01.png` | Epic |
| `asset_2_02.png` | Legendary |
| `asset_2_03.png` | Mythic |

The output files are individual full-body unit sprites, still on chroma
green background at this point.

---

## STEP 4: REMOVE CHROMA BACKGROUND

Remove flat chroma green `#00A651` after slicing.

The grey separators should never appear inside final sprites — if any grey
is visible after cropping, the margin in `crop_grid.py` was too small for
that particular atlas; increase `--margin` and re-run rather than manually
patching one sprite.

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

## STEP 7: NAMING (final sliced sprites)

Hero naming pattern (updated v1.1 to include Race, per
`00_FOUNDATION/00_ART_DIRECTION.md` → RACE, FACTION, AND CLASS):

```text
{race}_{faction}_{class}_{gender}_{rarity}_{state}.webp
```

Example (Human, Lion Kingdom, Warrior, Male):

```text
human_lion_kingdom_warrior_male_common_idle.webp
human_lion_kingdom_warrior_male_uncommon_idle.webp
human_lion_kingdom_warrior_male_rare_idle.webp
human_lion_kingdom_warrior_male_epic_idle.webp
human_lion_kingdom_warrior_male_legendary_idle.webp
human_lion_kingdom_warrior_male_mythic_idle.webp
```

Example (Orc, Lion Kingdom, Tank, Male — from the Race isolation test):

```text
orc_lion_kingdom_tank_male_common_idle.webp
```

Example (Human, Iron Legion, Ranger, Female — from the Faction isolation test):

```text
human_iron_legion_ranger_female_common_idle.webp
```

> **Lowercase note:** the raw atlas filename (STEP 1) is written in
> UPPERCASE for human readability while working (`HUMAN_LION_KINGDOM_WARRIOR_MALE_v3.png`).
> The final sliced/exported sprite filename is **lowercase** (this has
> always been the convention for final sprites, even before the Race split
> — only the raw-atlas-naming convention is new in v1.1). Keep this
> distinction consistent: raw = UPPERCASE, final = lowercase.

---

## STEP 8: DESTINATION

Recommended final path:

```text
public/assets/units/{race}/{faction}/heroes/{class}/{gender}/
```

Example:

```text
public/assets/units/human/lion_kingdom/heroes/warrior/male/human_lion_kingdom_warrior_male_common_idle.webp
```

> **Working location during PoC/testing (current stage):** raw atlas PNGs
> (compressed review copies) are currently kept directly in `assets/` at the
> repo root — see the four files listed in STEP 1 above. This is fine for
> the PoC/testing stage, where the priority is reviewing the framework, not
> shipping final game assets yet. Once a Race+Faction+Class+Gender
> combination is fully accepted and sliced for real production use, move
> its raw atlas into `raw_assets/atlases/...` (see STEP 1) and its sliced
> WebP sprites into `public/assets/units/...` (this step) — don't leave
> production-ready files sitting in the root `assets/` working folder
> indefinitely.

---

## STEP 9: MANIFEST

Every final sprite should be represented in the asset manifest.

Minimum metadata:

```json
{
  "assetId": "human_lion_kingdom_warrior_male_common_idle",
  "type": "unit",
  "role": "hero",
  "race": "human",
  "faction": "lion_kingdom",
  "class": "warrior",
  "gender": "male",
  "rarity": "common",
  "state": "idle",
  "path": "/assets/units/human/lion_kingdom/heroes/warrior/male/human_lion_kingdom_warrior_male_common_idle.webp",
  "sourceAtlas": "HUMAN_LION_KINGDOM_WARRIOR_MALE_v003.png",
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
- do not slice a compressed review copy when a lossless copy is available
  for the final cut (see STEP 1)
- do not save a raw atlas filename without an explicit `MALE`/`FEMALE`
  segment — two atlases differing only by gender will otherwise collide on
  the same filename
- do not skip the Race segment in either raw atlas names or final sprite
  names — `{faction}_{class}_...` alone is ambiguous once more than one
  Race shares a Faction (see `02_POC/ORC_LION_KINGDOM_TANK_V1.md`) or more
  than one Faction shares a Race (see `02_POC/HUMAN_IRON_LEGION_RANGER_V1.md`)
