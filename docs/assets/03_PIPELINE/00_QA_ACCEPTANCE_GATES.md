# POC_ACCEPTANCE_AND_VISUAL_QA v1.0

Project:
Idle Kingdom Revolution

Status:
Human Warrior PoC v3 accepted as the baseline direction for production rarity atlases.

---

## DECISION

The Human Warrior rarity atlas PoC is accepted as a valid production direction.

The accepted parts are:

- stylized fantasy 3D render quality
- six-step rarity progression
- same hero identity across rarity
- blue/gold Lion Kingdom faction read
- kite shield silhouette
- full standing lion heraldry direction
- chroma green slot background
- grey atlas separators
- 2x3 rarity atlas structure

This acceptance means the project can move from prompt discovery into repeatable asset production documentation.

---

## WHAT THE POC PROVES

The PoC proves that GPT-image-2 / ChatGPT image generation can produce a usable rarity atlas when the prompt is written as an asset export specification.

The strongest findings:

- `Reference Frame` language improves consistency.
- `Sprite Slot` language is clearer than generic `grid cell` language.
- Treating heraldry like a logo helps preserve the lion symbol.
- Additive rarity progression creates a readable Common to Mythic curve.
- Chroma green slot backgrounds work better than asking for native transparency at generation time.

---

## KNOWN ISSUES FROM TEST OUTPUTS

The test images are accepted as proof of direction, not as final production assets.

Known issues to reject in final production:

- watermark or generator signature
- any prompt text inside the image
- rarity labels inside the Sprite Slots
- wings too close to slot edges
- aura or particles clipped by the Sprite Slot
- sword crossing or touching slot borders
- row 2 characters appearing taller than row 1
- shield emblem changing into a lion head only
- chest emblem disappearing in Legendary or Mythic
- uneven green background
- uneven atlas separators
- **facing direction not matching the prompt's POSE instruction** (confirmed
  to happen even when the wording is identical to a previously-successful
  atlas — see Gate 6)
- **row 2 baseline sitting slightly higher/smaller than row 1**, the inverse
  of "row 2 appearing taller" above — both directions of drift are possible
  and both are checked under Gate 6

---

## PRODUCTION ACCEPTANCE GATES

A generated atlas is accepted only when it passes all gates below.

### Gate 1: Atlas Format

- [ ] exactly one image
- [ ] 2 rows
- [ ] 3 columns
- [ ] exactly six equal Sprite Slots
- [ ] straight grey dividers
- [ ] no labels
- [ ] no title text
- [ ] no watermark
- [ ] no prompt text

### Gate 2: Slot Safety

- [ ] no character crosses a slot border
- [ ] no sword is cropped
- [ ] no shield is cropped
- [ ] no feet are cropped
- [ ] no wings are cropped
- [ ] no aura is cropped
- [ ] at least 8% horizontal safety margin remains for normal slots
- [ ] at least 12% top safety margin remains for Legendary and Mythic wing slots

### Gate 3: Reference Frame

- [ ] same hero size in all six slots
- [ ] same eye height in all six slots
- [ ] same shoulder height in all six slots
- [ ] same feet baseline in all six slots
- [ ] row 2 does not drift upward
- [ ] visual effects do not make the model appear larger

### Gate 4: Identity Lock

- [ ] same face
- [ ] same hairstyle
- [ ] same beard
- [ ] same pose
- [ ] same camera
- [ ] same body proportions
- [ ] same weapon silhouette
- [ ] same shield silhouette

### Gate 5: Heraldry Lock

- [ ] same standing heraldic lion on shield
- [ ] same standing heraldic lion on chest
- [ ] lion is full-body, not head-only
- [ ] emblem remains visible in Legendary
- [ ] emblem remains visible in Mythic
- [ ] shield remains a kite shield

### Gate 6: Facing Direction and Row Alignment

> Added after the Human Mage PoC run (`02_POC/HUMAN_MAGE_V1.md`) showed that
> the exact same `Facing LEFT` instruction that worked for Human Warrior was
> not honored when generating Human Mage — the model produced a Mage facing
> RIGHT instead. The instruction text was correct in both prompts; the
> generator simply did not apply it consistently. This gate exists so the
> mismatch is caught before slicing, not after hundreds of files have been
> produced and would need manual mirroring.

- [ ] all six heroes face the same direction as specified in the prompt's
      `POSE` section (LEFT by convention — see
      `01_PRODUCTION_SYSTEM/03_HERO_RARITY_ATLAS_FACTORY.md` POSE block)
- [ ] that facing direction matches every other accepted atlas in the same
      Hero family (faction+class+gender) — do not mix LEFT-facing and
      RIGHT-facing atlases within one production set
- [ ] feet baseline in row 2 (Epic/Legendary/Mythic) sits at the same height
      as row 1 (Common/Uncommon/Rare) — a small drift is allowed under the
      Gate 3 "tiny non-critical differences" PASS allowance, but a visible
      drift (character appears to float or sink relative to the other row)
      is a FIX/REGENERATE

**If facing direction is wrong:** prefer regenerating over manually
mirroring the atlas. A horizontally-flipped atlas also flips any
asymmetric details (hair part, scars, heraldry readability, weapon hand),
so mirroring is not a safe shortcut — treat it the same as any other
FIX/REGENERATE case.

---

## PASS / FIX / REJECT

Use this decision model after every generation.

### PASS

Use when the atlas can be sliced and used after normal post-processing.

Allowed minor issues:

- tiny non-critical particle differences
- small material interpretation differences
- slightly richer VFX if still inside the Sprite Slot

### FIX PROMPT AND REGENERATE

Use when the output is close but one prompt constraint failed.

Examples:

- wings too close to edges
- row 2 slightly larger
- chest emblem weak but present
- aura too strong
- green background has slight lighting variation

### REJECT

Use when the atlas would pollute the production asset set.

Examples:

- watermark
- text labels
- broken grid
- cropped body parts
- missing shield
- changed character identity
- wrong shield type
- lion head instead of standing lion

---

## FINAL NOTE

The PoC is accepted because the art direction is now strong enough to standardize.

Future work should focus on repeatability, QA, slicing, naming, and manifest generation rather than endlessly rewriting the Human Warrior prompt.
