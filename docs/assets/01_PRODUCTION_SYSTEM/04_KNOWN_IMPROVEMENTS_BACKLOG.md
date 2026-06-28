# KNOWN_IMPROVEMENTS_BACKLOG v1.0

Project:
Idle Kingdom Revolution

Status:
Backlog of prompt-engineering improvements suggested for a *future* framework
revision (e.g. v2 of the production prompt system). None of these are applied
to the current accepted PoCs (`02_POC/HUMAN_LION_KINGDOM_WARRIOR_V3.md`,
`02_POC/HUMAN_LION_KINGDOM_MAGE_V1.md`) yet — those are working and accepted
(framework-wise; specific generated images may still be REJECTED per QA
Gates — see their REVIEW NOTES), so they are not touched just to satisfy a
theoretical improvement without re-testing.

Purpose:
Capture external review feedback (e.g. from other AI models reviewing the
prompt) in one place, so it isn't lost, without forcing an immediate rewrite
of a working system.

---

## SOURCE

External review of `02_POC/HUMAN_WARRIOR_V3.md` (2026-06-27), feedback from
a second AI model asked to critique the prompt. Full original feedback
archived at `docs/warrior.txt` in the project root (outside `docs/assets/`).

---

## ITEMS

### 1. Too many "Never" negations

**Observation:** the prompt uses 30+ negative instructions ("Never redesign",
"Never simplify", "Never replace", "Never remove", "Never rescale", "Never
redraw", "Never reinterpret"...). Image-generation models build an internal
representation rather than executing a logical checklist; a high density of
negations can sometimes draw attention to the exact thing being negated.

**Suggested fix:** aim for roughly 3 positive instructions per 1 negative
instruction, rather than 1 positive to 12 negatives.

**Status:** not applied. The current PoC works well in practice (see
generated atlases, both PASS). Revisit only as part of a deliberate v2 test,
with side-by-side comparison against the current accepted output — don't
change a working prompt on theory alone.

---

### 2. Duplicate concepts spread across many lines

**Observation:** "same hero / same proportions / same body / same scale /
same pose / same camera / same alignment / same framing" all describe one
underlying idea: a Reference Character Lock. Spreading it across many short
lines is duplicative.

**Suggested fix:** consolidate into a single named block, e.g. `REFERENCE
CHARACTER LOCK`, instead of repeating "same X" for each attribute.

**Status:** partially addressed already — `BODY SCALE LOCK` and `GENDER AND
BODY TYPE LOCK` in `01_PRODUCTION_SYSTEM/02_PROMPT_MODULE_SYSTEM.md` already
consolidate some of this. Full consolidation into one mega-block is a v2
candidate, not urgent.

---

### 3. "Imagine one finished 3D game character" framing

**Observation:** most image models don't hold a persistent 3D model in
memory between sprite slots; asking them to "imagine" one and "duplicate"
it may not match how the model actually generates the image.

**Suggested fix:** phrase as a direct instruction about the output instead of
a mental-model metaphor, e.g.:

```text
Generate six instances of the same character model.
The face, proportions, body shape, pose, and camera remain identical.
Only equipment materials and magical effects evolve between rarity tiers.
```

**Status:** worth testing in a v2 prompt as a controlled A/B against the
current `HERO IDENTITY` block. Not applied yet — no evidence the current
phrasing is actually causing a problem (Warrior and Mage outputs both held
identity correctly).

---

### 4. Section ordering — STYLE should come first

**Observation:** style should arguably be established before grid/layout
instructions, since style affects how the model "sees" everything else.

**Suggested order:**

```text
PROJECT
STYLE
OUTPUT
SPRITE ATLAS
BACKGROUND
...
```

**Status:** low-risk, low-priority reordering. Candidate for v2; not worth a
standalone edit to a working, accepted PoC.

---

### 5. Rarity as inheritance chain, not repeated full descriptions

**Observation:** current rarity sections each restate "Everything from
[previous tier]" then add new items. The reviewer suggests modelling this
explicitly as an inheritance chain (Common → Uncommon inherits Common → Rare
inherits Uncommon → ...) before listing only the deltas.

**Status:** this is conceptually already how `RARITY CONTRACT` works in the
current system — the "Everything from X. Add: ..." pattern already used in
`HUMAN_WARRIOR_V3.md` and `HUMAN_MAGE_V1.md` *is* an inheritance chain, just
phrased as repetition instead of using the word "inherits" explicitly. Visual
results confirm additive inheritance is working (nothing disappears across
rarity in either accepted PoC). Low priority — mostly a wording preference,
not a functional gap.

---

### 6. VISUAL PRIORITY ordering block

**Suggested addition** — a block near the top of the prompt establishing
hierarchy of what matters most if something has to be traded off:

```text
Visual Priority (highest → lowest)
1. Reference Frame
2. Body Scale
3. Character Identity
4. Pose
5. Equipment
6. Magic Effects
7. Background
```

**Status:** reasonable idea for v2. The current system achieves a similar
effect implicitly through module *ordering* in
`01_PRODUCTION_SYSTEM/02_PROMPT_MODULE_SYSTEM.md` → MODULE ORDER, but doesn't
state it as an explicit priority ranking. Worth testing whether an explicit
priority block changes generator behavior, but not blocking current work.

---

### 7. Long-term architecture: Asset Spec / Prompt Compiler / Generator Profile

**Observation (biggest suggestion):** as the project has grown from "writing
prompts" to "running an asset production pipeline," the reviewer suggests
splitting the system into three layers:

1. **Asset Specification** — a model-independent description of a Hero
   (race, faction, class, rarity, inheritance rules, Reference Lock) as
   structured data (their suggested format was a YAML-like DSL).
2. **Prompt Compiler** — rules that turn that specification into an actual
   prompt for a specific image generator.
3. **Generator Profile** — per-generator settings/phrasing (ChatGPT Images,
   Midjourney, Flux, SDXL, etc., since each responds differently to the same
   concept).

**Why this is a good idea:** it would make the system resilient to changing
AI generators without rewriting all documentation, and is the natural next
step if scaling to hundreds/thousands of assets (which this project is:
several thousand Hero sprites alone once Race/Faction/Class/gender/rarity
are all multiplied out).

**Why it's not done now:** this is a software-architecture change (an actual
compiler/templating layer, likely code, not just Markdown), not a
documentation restructure. It's a bigger, separate initiative from the
docs/assets/ cleanup and from the Race/Faction split currently being
implemented. Tracked here so it isn't lost, to be scoped as its own project
phase once Race/Faction/Class is stable and a second or third generator
profile is actually needed in practice (e.g. when moving off ChatGPT Images
to another tool).

**Status:** not started. Logged for future scoping, likely after the
Race/Faction/Class restructure (see open item in
`02_POC/HUMAN_LION_KINGDOM_MAGE_V1.md` → REVIEW NOTES) is implemented, since
the Asset Specification layer would need to model Race/Faction/Class as its
core axes anyway — doing the Race/Faction conceptual work first makes the
eventual compiler design easier.

---

### 8. Prompt length hitting tool-level paste limits (practical, not just theoretical)

**Observation (2026-06-27, elevated priority over items 1-7 above):** unlike
items 1-7, which were external review suggestions with no confirmed real
problem yet, this one is a **confirmed practical blocker**. When pasting the
full FINAL PROMPT for `02_POC/ORC_LION_KINGDOM_TANK_V1.md` and
`02_POC/HUMAN_IRON_LEGION_RANGER_V1.md` into the generation tool, the tool
started treating the pasted text as a file attachment instead of inline
prompt content, forcing the prompt to be split and pasted in two parts.
This is a direct consequence of prompt length growing as more modules
(RACE, GENDER AND BODY TYPE LOCK, EFFECT BOUNDARY, weapon-specific silhouette
locks) have been added on top of the original Warrior prompt.

**Why this matters more than items 1-7:** those are quality/clarity
improvements with no confirmed downside in the current prompt. This is a
workflow problem happening today, on the current two newest PoCs, not a
hypothetical future one.

**Possible directions (not yet decided, needs testing before adopting):**

- Apply item 2 (consolidate duplicate "same X" lines into named blocks) and
  item 1 (reduce negative-instruction density) above — both would shorten
  the prompt as a side effect of being clearer, which would also help this
  problem. This is a reason to revisit items 1-2 sooner than "someday in
  v2", since they now serve two goals (clarity AND length) instead of one.
- Check whether the generation tool has a higher paste/inline limit through
  a different input path (e.g. a dedicated "system prompt" or "instructions"
  field instead of the main chat input) before assuming the prompt itself
  must shrink.
- If neither helps enough, this becomes the strongest concrete argument yet
  for item 7's Prompt Compiler direction — a compiler could emit a shorter,
  tool-specific rendering of the same Asset Specification instead of one
  ever-growing monolithic text block that every new module makes longer.

**Status:** not resolved. Tracked here as the most urgent item in this
backlog precisely because it is not theoretical — current workaround is
manually splitting the paste into two parts, which works but is friction
that will get worse as more modules are added (e.g. once Race-specific
face/body description blocks grow, as seen in
`02_POC/ORC_LION_KINGDOM_TANK_V1.md`'s RACE section).

---

## HOW TO USE THIS BACKLOG

When starting a v2 revision of the production prompt system:

1. Read this file top to bottom.
2. Pick items to test — don't apply all of them blindly.
3. Test each change against a known-good PoC (e.g. regenerate Human Warrior
   with the change applied) and compare against the current accepted output
   before adopting it project-wide.
4. If an item is adopted, move its description into
   `01_PRODUCTION_SYSTEM/02_PROMPT_MODULE_SYSTEM.md` as a new module/version
   bump, and mark it `DONE` here with a date and a link to the regenerated
   comparison.
