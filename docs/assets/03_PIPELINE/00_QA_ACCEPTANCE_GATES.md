# POC_ACCEPTANCE_AND_VISUAL_QA v1.1

Project:
Idle Kingdom Revolution

Status:
Production prompt framework accepted as the baseline direction for rarity
atlases (4 PoCs run: Human Lion Kingdom Warrior, Human Lion Kingdom Mage,
Orc Lion Kingdom Tank, Human Iron Legion Ranger). **Individual generated
atlases reviewed so far are NOT yet production-approved** — both atlases
inspected in detail (Warrior, Orc Tank) were found to have a confirmed
Gate 5 defect (lion-head-only at Epic/Legendary) and must be regenerated
before slicing. See `02_POC/HUMAN_LION_KINGDOM_WARRIOR_V3.md` and
`02_POC/ORC_LION_KINGDOM_TANK_V1.md` REVIEW NOTES for details. The prompt
framework itself remains accepted; only the specific generated images are
rejected.

---

## DECISION

The production prompt framework (Reference Frame, Sprite Slot, Body Scale
Lock, Race/Faction/Class modules) is accepted as a valid production
direction.

The accepted parts are:

- stylized fantasy 3D render quality
- six-step rarity progression
- same hero identity across rarity
- Race and Faction as independently controllable axes (empirically
  confirmed 2026-06-27 — see `02_POC/ORC_LION_KINGDOM_TANK_V1.md` and
  `02_POC/HUMAN_IRON_LEGION_RANGER_V1.md` REVIEW NOTES)
- blue/gold Lion Kingdom faction read
- kite shield silhouette (Warrior), tower shield silhouette (Tank), staff
  silhouette (Mage), bow silhouette (Ranger — pending review)
- full standing lion heraldry direction (when not affected by the Gate 5
  defect — see KNOWN ISSUES)
- chroma green slot background
- grey atlas separators
- 2x3 rarity atlas structure

This acceptance means the project can move from prompt discovery into
repeatable asset production documentation. It does NOT mean every generated
atlas is automatically production-ready — each one still needs to pass the
Gates below before slicing.

---

## WHAT THE POC PROVES

The PoC proves that GPT-image-2 / ChatGPT image generation can produce a usable rarity atlas when the prompt is written as an asset export specification.

The strongest findings:

- `Reference Frame` language improves consistency.
- `Sprite Slot` language is clearer than generic `grid cell` language.
- Treating heraldry like a logo helps preserve the lion symbol — though not
  perfectly; see Gate 5 empirical update below.
- Additive rarity progression creates a readable Common to Mythic curve.
- Chroma green slot backgrounds work better than asking for native transparency at generation time.
- **Race and Faction are independently controllable** — confirmed by
  generating an Orc on an unchanged Faction (`02_POC/ORC_LION_KINGDOM_TANK_V1.md`)
  and a new Faction on an unchanged Race
  (`02_POC/HUMAN_IRON_LEGION_RANGER_V1.md`). Neither test required changing
  the RACE AND FACTION MODULE itself to work.

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
- shield emblem changing into a lion head only — **CONFIRMED in 2 of 2
  atlases inspected so far** (2026-06-27), see Gate 5 below
- chest emblem disappearing in Legendary or Mythic
- uneven green background
- uneven atlas separators
- **facing direction not matching the prompt's POSE instruction** (confirmed
  to happen even when the wording is identical to a previously-successful
  atlas — see Gate 6)
- **row 2 baseline sitting slightly higher/smaller than row 1**, the inverse
  of "row 2 appearing taller" above — both directions of drift are possible
  and both are checked under Gate 6
- **cross-atlas Faction color mismatch at matching rarity tiers** — NEW
  (2026-06-27), see Gate 7 below

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
- [ ] same body proportions (race-appropriate — e.g. an Orc atlas should
      show Orc proportions consistently, not drift toward Human mid-atlas)
- [ ] same weapon silhouette
- [ ] same shield silhouette (or class-appropriate offhand, if any)

### Gate 5: Heraldry Lock

> **Empirical update (2026-06-27):** the lion-head-only defect below is no
> longer theoretical — it has now occurred in **2 of 2** generated atlases
> inspected (`02_POC/HUMAN_LION_KINGDOM_WARRIOR_V3.md`: slots 3 and 5;
> `02_POC/ORC_LION_KINGDOM_TANK_V1.md`: slots 4 and 5), in both cases
> clustered around the **Epic/Legendary** tiers rather than spread randomly
> across all six slots. It also occurred despite `lion head only` already
> being present in NEGATIVE PROMPT for the Warrior atlas — i.e. listing it
> as a negative is not sufficient on its own. **Check slots 4 and 5
> specifically and with extra scrutiny on every new atlas**, in addition to
> checking all six. If this pattern holds on a third atlas, escalate to
> changing how Epic/Legendary are described in
> `01_PRODUCTION_SYSTEM/02_PROMPT_MODULE_SYSTEM.md` (e.g. repeating the
> "full standing lion/symbol, never head-only" instruction inside the EPIC
> and LEGENDARY rarity blocks themselves, not only once in the
> FACTION/CHEST EMBLEM sections at the top of the prompt) rather than
> continuing to rely on regeneration alone.

- [ ] same standing heraldic symbol on shield (for whichever Faction this
      atlas uses — lion for Lion Kingdom, crossed-spears-and-helm for Iron
      Legion, etc.)
- [ ] same standing heraldic symbol on chest
- [ ] symbol is full composition, not a fragment (e.g. not head-only for an
      animal emblem)
- [ ] **specifically check Epic and Legendary slots for symbol degradation**
      — empirically the most common location for this defect
- [ ] emblem remains visible in Legendary
- [ ] emblem remains visible in Mythic
- [ ] shield remains the Class-appropriate shape (kite for Warrior, tower
      for Tank, etc. — per `00_FOUNDATION/03_EQUIPMENT_SILHOUETTE_LOCKS.md`),
      not redesigned into a different shield type

### Gate 6: Facing Direction and Row Alignment

> Added after the Human Mage PoC run (`02_POC/HUMAN_LION_KINGDOM_MAGE_V1.md`)
> showed that the exact same `Facing LEFT` instruction that worked for Human
> Warrior was not honored when generating Human Mage — the model produced a
> Mage facing RIGHT instead. The instruction text was correct in both
> prompts; the generator simply did not apply it consistently. This gate
> exists so the mismatch is caught before slicing, not after hundreds of
> files have been produced and would need manual mirroring.

- [ ] all six heroes face the same direction as specified in the prompt's
      `POSE` section (LEFT by convention — see
      `01_PRODUCTION_SYSTEM/03_HERO_RARITY_ATLAS_FACTORY.md` POSE block)
- [ ] that facing direction matches every other accepted atlas in the same
      Hero family (race+faction+class+gender) — do not mix LEFT-facing and
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

### Gate 7: Cross-Atlas Faction Consistency

> Added 2026-06-27 after comparing `02_POC/HUMAN_LION_KINGDOM_WARRIOR_V3.md`
> and `02_POC/ORC_LION_KINGDOM_TANK_V1.md` side by side: both atlases use
> the same Lion Kingdom Faction (same blue/gold palette, same lion), but at
> the **Epic** tier specifically, the shield's background fill color
> differs between the two atlases (Warrior Epic = blue shield fill, Tank
> Epic = gold/amber shield fill). Each atlas was internally consistent with
> itself at every other tier — this is a cross-atlas problem, not a
> within-atlas one, so Gates 3-6 (which all check consistency *within* one
> atlas) would not have caught it. This gate exists specifically to compare
> a newly generated atlas against previously *accepted* atlases of the same
> Faction, not just against itself.

- [ ] base color palette (e.g. Lion Kingdom's blue/gold) matches previously
      accepted atlases of the same Faction, slot-by-slot at matching rarity
      tiers — not just "looks similar", actually compare Common-to-Common,
      Epic-to-Epic, etc. across atlases
- [ ] shield/armor background or base material color at each rarity tier
      matches the equivalent tier in other accepted atlases of the same
      Faction (this is the specific defect found: Epic shield fill color
      mismatched between two Lion Kingdom atlases)
- [ ] heraldic symbol shape, pose, and composition match across atlases of
      the same Faction (overlaps with Gate 5, but checked here specifically
      *across* atlases rather than within one)
- [ ] if a mismatch is found, do not silently pick one atlas as "correct" —
      regenerate whichever atlas deviates from the larger accepted set, or
      if this is only the second atlas in the Faction, treat the
      first-accepted one as the reference and regenerate the second

**Practical workflow note:** Gate 7 only becomes checkable once at least one
other atlas of the same Faction has already been accepted — it cannot be
applied to the very first atlas of a brand-new Faction (there's nothing yet
to compare against). Apply it from the second atlas onward.

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
- heraldic symbol reduced to a fragment (e.g. lion head instead of standing
  lion) — **confirmed real defect, not just theoretical, as of 2026-06-27;
  both atlases reviewed so far were rejected for this reason specifically**
- shield/armor color mismatched against other accepted atlases of the same
  Faction at the same rarity tier (Gate 7)

---

## FINAL NOTE

The PoC is accepted because the art direction is now strong enough to standardize.

Future work should focus on repeatability, QA, slicing, naming, and manifest
generation rather than endlessly rewriting the Human Warrior prompt.

As of 2026-06-27: the framework itself (Reference Frame, Body Scale Lock,
Race/Faction/Class split) is validated across 4 PoCs. The remaining open
work is generator reliability at the Epic/Legendary tiers specifically
(Gate 5) and cross-atlas Faction consistency (Gate 7) — both are QA/
regeneration problems to manage per-atlas, not prompt-framework redesigns.
