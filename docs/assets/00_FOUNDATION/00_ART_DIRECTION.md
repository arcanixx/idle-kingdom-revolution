# ART DIRECTION -- v2.0

> This document defines **why** each asset looks the way it does.
> Use it alongside `01_STYLE_BIBLE.md` (the "how") and `01_PRODUCTION_SYSTEM/02_PROMPT_MODULE_SYSTEM.md` (the "what").
>
> **v2.0 change (2026-06-27):** introduced the **Race / Faction / Class**
> three-axis model. What this document previously called "Faction" (Human,
> Elf, Orc, Undead, Demon, Celestial) is now called **Race** — it determines
> body, proportions, age, and biology. **Faction** is a new, separate axis
> (e.g. "Lion Kingdom") tied to one Race, determining color palette,
> heraldry, and decoration style. See RACE, FACTION, AND CLASS below for the
> full explanation. Old terminology is preserved in `_ARCHIVE/` history; this
> file is the live version going forward.

---

## GLOBAL STYLE RULES

### Game Style
Stylized Fantasy 3D Rendered 2D -- looks like a modern mobile collectible RPG.

### Never Use
- photorealism
- anime / manga
- pixel art
- realistic skin pores or fabric simulation
- heavy weathering, dirt, grunge
- horror realism / gore
- watercolor / oil painting / comic book
- real human photography

### Always Use
- readable silhouettes (recognizable at 64x64)
- exaggerated heroic proportions (heroic 8-head scale)
- clean materials -- polished metal, stylized leather, magical crystal
- strong faction identity -- motif, shape, color on every unit
- collectible RPG character quality -- card-game polish
- mobile game readability at small sizes

### Priority Ladder
`
Consistency > Detail
Readability > Realism
Game Asset > Artwork
Asset Set > Individual Asset
`

---

## RACE, FACTION, AND CLASS

Idle Kingdom Revolution Heroes are defined along **three independent axes**.
Every Hero is exactly one Race + one Faction + one Class. Getting this
distinction right matters for both lore and asset budget — see WHY THIS
SPLIT MATTERS below.

### The three axes

| Axis | What it is | What it controls visually | Example |
|------|-----------|---------------------------|---------|
| **Race** | The biological/species category | Body proportions, height, build, typical age range, facial structure, skin/material baseline | Human, Elf, Orc, Undead, Demon, Celestial |
| **Faction** | The political/organizational allegiance | Color palette, heraldic symbol, decoration style, armor/robe trim language | Lion Kingdom, Fire Cult, Sea Elves, Iron Legion |
| **Class** | The combat role | Weapon, offhand/focus, armor weight, signature silhouette | Warrior, Mage, Tank, Healer, Ranger, Assassin, Support |

### How they combine

A Hero is fully specified only when all three are named:

```text
Race:    Human
Faction: Lion Kingdom
Class:   Mage
```

This is different from saying just "Human Mage" — the Faction is what tells
you it's blue/gold robes with a lion emblem, rather than some other Human
faction's colors and symbol.

### Your example: Human Fire Mage vs Orc Fire Mage

If "Fire Cult" is a Faction available to multiple Races:

| | Race | Faction | Class | What stays the same | What differs |
|---|------|---------|-------|---------------------|---------------|
| A | Human | Fire Cult | Mage | Fire Cult color palette, fire-themed emblem, robe decoration style | Human body proportions, typical Human height/build/age range |
| B | Orc | Fire Cult | Mage | Fire Cult color palette, fire-themed emblem, robe decoration style | Orc body proportions (wider, shorter legs per RACE PROPORTION SYSTEM below), Orc typical age range |

Both characters read as "Fire Cult" at a glance (same colors, same emblem
language) while still reading as their own Race (different silhouette,
build, height).

### Faction scope — Hero Factions vs Enemy/Lore Factions

Per project decision (2026-06-27), **a Faction belongs to one Race, not
several** for Hero generation purposes — this keeps the asset matrix from
exploding (see WHY THIS SPLIT MATTERS). The "Fire Cult"-style multi-race
example above describes how the *system* is capable of handling a Faction
appearing across Races (useful for enemies/lore), not a requirement that
every Hero Faction must support every Race.

> **Isolation-test exception (2026-06-27):** `02_POC/ORC_LION_KINGDOM_TANK_V1.md`
> deliberately generates an Orc wearing Lion Kingdom colors/heraldry, which
> does not (yet) make lore sense — Lion Kingdom is a Human kingdom. This PoC
> exists purely to isolate the RACE variable: by keeping Faction (color,
> emblem, decoration) completely fixed and changing only Race, any visual
> difference in the output must come from Race, not from an uncontrolled
> Faction change. Treat this PoC as a framework test, not a lore proposal.
> If the result is good, decide separately (in lore/fabuła) whether Orc
> Lion Kingdom Heroes make narrative sense, or whether to discard the
> combination and keep only the test data.

In practice, two different scales of Faction exist:

- **Hero Factions** (e.g. Lion Kingdom) — one Faction per Race, full asset
  treatment: all 7 Classes × 6 rarities × 3 states × 2 genders. This is the
  expensive, full-production case and is what `02_POC/` and
  `01_PRODUCTION_SYSTEM/` are built around today.
- **Enemy / Lore Factions** (e.g. Fire Cult, Sea Elves) — generated with the
  same prompt system, but at much lower volume (closer to Generic Unit
  treatment — a handful of variants, not the full rarity/gender/state
  matrix). These may later turn out to be best handled as visual *overlays*
  on top of an existing Race+Class base rather than fully separate asset
  sets — this is an open implementation question, not yet decided. Do not
  assume Enemy Factions need the same asset count as Hero Factions.

### Why this split matters

Before this split, the term "Faction" was used for what is actually Race
(Human, Elf, Orc...), and there was no separate concept for political/
organizational identity (Lion Kingdom). This caused two problems:

1. **Conceptual confusion** — "Human" is not a faction in the way "Lion
   Kingdom" is; one is a species, the other is an allegiance. Lore that
   wants two different Human kingdoms with different colors/heraldry had no
   home in the old model.
2. **No path to multi-race enemy factions** — a cult or alliance that
   recruits across Races (the Fire Cult example) couldn't be expressed.

### How this affects existing documentation

Everywhere this document (and `01_PRODUCTION_SYSTEM/`) previously said
"Faction" while listing Human/Elf/Orc/Undead/Demon/Celestial, that is now
**Race**. The tables below (RACE PROPORTION SYSTEM, RACE VISUAL LANGUAGE) are
the renamed versions of the old "Faction Proportion Notes" / "Faction Visual
Language" tables — same data, corrected label. A new, separate FACTION DESIGN
GUIDE section defines the Faction axis itself (using Lion Kingdom as the
worked example, since it's the only Faction currently in production use via
`02_POC/HUMAN_WARRIOR_V3.md` and `02_POC/HUMAN_MAGE_V1.md`).

---

## CHARACTER PROPORTION SYSTEM

All units share a common proportion baseline. This prevents style drift between classes and races.

### Human Baseline

| Property | Value | Notes |
|----------|-------|-------|
| Apparent age | 25-40 | Mature, not elderly |
| Build | Athletic | Heroic, not bodybuilder |
| Height | 1.0 (reference scale) | All other races offset from this |
| Head-to-body ratio | 1:7.5 | Heroic proportion (real human ~1:7) |
| Hands | Slightly enlarged | Improves readability of gestures |
| Weapons | 110-130% of realistic size | Readability at small scale |
| Armor volume | 120% of realistic | Silhouette clarity |

### Weapon Scale Rules

Weapons are deliberately oversized to remain readable at mobile portrait size (512x512 and smaller).

| Weapon Type | Scale vs Realistic | Notes |
|-------------|-------------------|-------|
| One-handed swords | 120-130% length | Standard blade, readable profile |
| Two-handed swords | 140-160% length | Grand weapons need extra presence |
| Shields | 110-120% size | Must cover visible torso area |
| Axes / Hammers | 130-150% head size | Impact readability, not reach |
| Bows | 130-140% length | Silhouette arc must be visible |
| Staves / Spears | 150-170% length | Vertical line readability |
| Daggers / Blades | 110-120% length | Small weapons need extra presence |

All weapon scaling follows the same principle: **readability at 64x64 > realistic proportions**.

### Why This Matters

Without a baseline:
- Warrior drifts toward Conan
- Mage drifts toward Harry Potter
- Tank drifts toward Space Marine

The baseline keeps all classes recognisable as part of the **same world**.

### Race Proportion Notes

> Renamed from "Faction Proportion Notes" (v2.0) — this table describes
> **Race**, not Faction. See RACE, FACTION, AND CLASS above.

| Race | Height Offset | Build Notes |
|---------|---------------|-------------|
| Human | 1.0 (baseline) | Athletic, balanced |
| Elf | +0.1 | Taller, more slender, longer limbs |
| Orc | +0.2 | Wider, broader shoulders, shorter legs |
| Undead | 0.0 (same height) | Gaunt, narrower, hollow posture |
| Demon | +0.15 | Taller, muscular, wider horns add visual mass |
| Celestial | +0.05 | Same height, more graceful, floating elements add presence |

---

## GENDER REPRESENTATION

### Hero Characters
- Gracz wybiera płeć na starcie (Male / Female).
- Generujemy obie wersje dla każdej klasy/rasy/frakcji.
- **To podwaja liczbę Hero assetów** – z 18 do 36 (dla jednej rasy+frakcji + klasy), ale to akceptowalne, bo to główna postać.

### Generic Units
- 65% mężczyźni, 35% kobiety.
- Generujemy losowo – nie musimy mieć równych proporcji w każdej klasie, ale ogólnie świat ma być zróżnicowany.

### NPC Characters
- Płeć określona w scenariuszu.
- Generujemy na życzenie, zgodnie z fabułą.

### Wyjątki
- **Orc** – kobiety są rzadsze (30% kobiet, 70% mężczyzn) – zgodnie z lore.
- **Celestial** – płeć jest mniej istotna (istoty boskie) – można generować androgyniczne lub obie.

> **Uwaga (v2.0):** powyższe wyjątki są opisane na poziomie **Race**. Niektóre
> Faction mogą zawężać to jeszcze bardziej w fabule (np. dana Faction
> przyjmuje tylko jedną płeć) — to ustala się przy projektowaniu konkretnej
> Faction (patrz FACTION DESIGN GUIDE), nie zmienia reguł Race powyżej.

### Age Diversity
Wiek postaci powinien być zróżnicowany w zależności od rasy, klasy i płci:

| Klasa | Typowy wiek | Uwagi |
|-------|-------------|-------|
| Warrior | 20–40 | W sile wieku, doświadczony |
| Mage | 30–60 | Magowie starzeją się wolniej, mądrzejsi z wiekiem |
| Tank | 25–45 | Szczyt formy fizycznej |
| Healer | 25–55 | Spokojniejszy, dojrzalszy wygląd |
| Ranger | 20–40 | Zwinność z wiekiem spada, ale doświadczenie rośnie |
| Assassin | 20–35 | Młodzi, szybcy, ostrzejsi rysy |
| Support | 25–50 | Różny wiek, zależnie od roli (bard, strateg, medyk) |

**Różnice międzyrasowe** (renamed from "Różnice międzyfrakcyjne" — v2.0, this is a Race-level table):
- **Elf** – wszystkie klasy +20–30 lat (długowieczni, wyglądają młodziej niż są)
- **Orc** – wszystkie klasy –5–10 lat (krótsza żywotność, szybciej dojrzewają)
- **Celestial** – wiek nie ma znaczenia (istoty pozaczasowe)
- **Undead** – wiek śmierci jest zamrożony (postać wygląda jak w chwili śmierci)

## CHARACTER EVOLUTION RULES

Rarity upgrades must preserve:

- face identity
- hairstyle
- body proportions
- class silhouette
- race identity
- faction identity

Only equipment quality may evolve.

A player should instantly recognize the same character across all rarity tiers.

> **Uwaga:** Stany bojowe (attack, hit) dotyczą TYLKO Hero Characters. Generics mają tylko idle. Wszystkie efekty (blood, burn, frozen itp.) to overlay'e – patrz `05_REFERENCE/02_COMBAT_VISUAL_STATES.md`.

## VISUAL CONSISTENCY PRIORITIES

### Tier 1 (Critical)
Must remain consistent:

- Race Identity
- Faction Identity
- Class Identity
- Shape Language
- Color Palette
- Core Materials
- Heraldry

### Tier 2 (Important)
Should remain consistent when applicable:

- Hair Style
- Face Identity
- Age Range
- Body Build

### Tier 3 (Optional)
May vary without affecting character recognition:

- Facial details (eye shape, nose shape, minor proportions)

---

## RACE VISUAL LANGUAGE

> Renamed from "Faction Visual Language" (v2.0) — this section describes
> **Race**-level defaults (motif, palette, shape language, themes). A
> specific **Faction** within a Race (e.g. Lion Kingdom within Human) may
> use this Race's motif as its starting point, or define its own — see
> FACTION DESIGN GUIDE below. Until a Race has more than one documented
> Faction, treat the Race's default motif/colors/heraldic symbol below as
> that Race's only (default) Faction too — this is exactly what "Lion
> Kingdom" currently is for Human (see FACTION DESIGN GUIDE).

### Human
| Aspect | Definition |
|--------|-----------|
| Motif | Lion |
| Primary colors | Steel, Royal Blue, Gold |
| Shape language | Rectangles, vertical lines, kite shields |
| Materials | Steel, polished metal, blue cloth |
| Heraldic symbol | Lion rampant on shield |
| Themes | Kingdom, Order, Discipline, Honor |

### Elf
| Aspect | Definition |
|--------|-----------|
| Motif | Leaf / Tree |
| Primary colors | White, Silver, Green |
| Shape language | Curves, organic forms, flowing silhouettes |
| Materials | Wood, silver, nature-touched materials |
| Heraldic symbol | Ancient oak with stars |
| Themes | Harmony, Nature, Wisdom |

### Orc
| Aspect | Definition |
|--------|-----------|
| Motif | Tusk / Bone |
| Primary colors | Brown, Dark Green, Rust |
| Shape language | Triangles, heavy asymmetry, massive silhouettes |
| Materials | Bone, iron, leather, crude metal |
| Heraldic symbol | Crossed tusks with axe |
| Themes | Strength, Survival, War |

### Undead
| Aspect | Definition |
|--------|-----------|
| Motif | Skull |
| Primary colors | Grey, Pale Green, Black |
| Shape language | Sharp angles, broken forms, jagged lines |
| Materials | Bone, corrupted metal, tattered cloth |
| Heraldic symbol | Cracked skull with crown |
| Themes | Death, Decay, Necromancy |

### Demon
| Aspect | Definition |
|--------|-----------|
| Motif | Horn |
| Primary colors | Black, Red, Purple |
| Shape language | Aggressive triangles, sharp horns, spikes |
| Materials | Obsidian, dark metal, infernal crystal |
| Heraldic symbol | Horned skull with fire |
| Themes | Chaos, Power, Destruction |

### Celestial
| Aspect | Definition |
|--------|-----------|
| Motif | Star |
| Primary colors | White, Gold, Azure |
| Shape language | Radiating geometry, circles, star motifs |
| Materials | Light metal, celestial crystal, luminous cloth |
| Heraldic symbol | Eight-pointed star with eye |
| Themes | Divinity, Hope, Order |

---

## FACTION DESIGN GUIDE

This section defines the **Faction** axis itself — separate from Race (above)
and Class (below). A Faction is a political/organizational allegiance within
one Race. It is what `02_POC/HUMAN_WARRIOR_V3.md` and `02_POC/HUMAN_MAGE_V1.md`
call "Lion Kingdom".

### Worked example: Lion Kingdom (Human Faction)

| Aspect | Definition |
|--------|-----------|
| Race | Human |
| Name | Lion Kingdom |
| Primary colors | Royal Blue, Gold, polished Steel |
| Heraldic symbol | Standing heraldic lion (full-body, not head-only) |
| Decoration language | Kite shields, tabards, gold trim that thickens with rarity |
| Themes | Kingdom, Order, Discipline, Honor |

Note this currently matches the Human Race defaults in RACE VISUAL LANGUAGE
above exactly — that's expected for a Race's first/default Faction. A
second Human Faction (e.g. a rival human kingdom) would define its own
colors/symbol/themes here while keeping Human Race proportions identical.

### Worked example: Iron Legion (second Human Faction)

> Added 2026-06-27 as the test case for FACTION isolation — see
> `02_POC/HUMAN_IRON_LEGION_RANGER_V1.md`. This is the first Faction that
> proves two Factions can share a Race while looking completely different.

| Aspect | Definition |
|--------|-----------|
| Race | Human |
| Name | Iron Legion |
| Primary colors | Iron Grey, Dark Crimson, Bronze (deliberately distinct from Lion Kingdom's Royal Blue/Gold) |
| Heraldic symbol | Crossed spears behind a closed iron helm (full emblem, not just the helm) |
| Decoration language | Studded leather and riveted plate, banded cloaks, bronze trim that thickens with rarity (parallel to Lion Kingdom's gold trim, different metal) |
| Themes | Discipline, Conquest, Loyalty, Attrition |

Iron Legion uses the same Human Race proportions, age ranges, and build as
Lion Kingdom Heroes — only color, emblem, and decoration differ. This is the
core claim FACTION MODULE makes, and the reason this Faction exists: to test
it with a real second example, not just assert it in prose.

### Faction Design Checklist

When defining a new Faction, specify:

1. **Race** -- which single Race this Faction belongs to (for Hero Factions)
2. **Name** -- Faction label (e.g. "Lion Kingdom", "Fire Cult")
3. **Primary colors** -- 2-3 dominant colours
4. **Secondary colors** -- 1-2 accent colours
5. **Heraldic symbol** -- the emblem locked by Heraldry Lock (see
   `00_FOUNDATION/02_HERALDRY_SYSTEM.md`)
6. **Decoration language** -- how rarity tiers visually escalate (trim,
   gems, cloak length, etc. — see RARITY CONTRACT in `01_PRODUCTION_SYSTEM/`)
7. **Themes** -- 2-4 thematic keywords
8. **Scale** -- Hero Faction (full asset matrix) or Enemy/Lore Faction
   (reduced asset matrix) — see FACTION SCOPE above

> A Faction does NOT redefine Race proportions, age range, or body type —
> those stay governed entirely by Race (see RACE PROPORTION SYSTEM and Age
> Diversity above). A Faction only changes surface-level identity: color,
> symbol, and decoration.

---

## CLASS DESIGN GUIDE

Every class must be readable at a glance by silhouette alone.

### Warrior
| Aspect | Definition |
|--------|-----------|
| Role | Balanced frontline |
| Signature silhouette | Sword + Shield |
| Armor weight | Medium |
| Readability cue | Balanced, classic hero profile |

### Tank
| Aspect | Definition |
|--------|-----------|
| Role | Protection, damage absorption |
| Signature silhouette | Massive shield |
| Armor weight | Heavy |
| Readability cue | Largest armor profile -- widest silhouette |

### Mage
| Aspect | Definition |
|--------|-----------|
| Role | Magic damage |
| Signature silhouette | Staff |
| Armor weight | Light (robes) |
| Readability cue | Visible magical focus (orb, crystal, staff glow) |

### Healer
| Aspect | Definition |
|--------|-----------|
| Role | Support healing |
| Signature silhouette | Staff / Wand + Tome |
| Armor weight | Light |
| Readability cue | Holy symbols, light colours, healing glow |

### Ranger
| Aspect | Definition |
|--------|-----------|
| Role | Ranged physical damage |
| Signature silhouette | Bow |
| Armor weight | Medium-light |
| Readability cue | Long weapon profile, hood/cape |

### Assassin
| Aspect | Definition |
|--------|-----------|
| Role | Burst damage |
| Signature silhouette | Dual blades |
| Armor weight | Light |
| Readability cue | Lean profile, darker tones, compact stance |

### Support
| Aspect | Definition |
|--------|-----------|
| Role | Buffs / utility |
| Signature silhouette | Banner / Tome / Orb |
| Armor weight | Medium |
| Readability cue | Utility equipment visible (banner, floating tome, aura) |

### Orc-Replacement Classes

| Class | Replaces | Role | Signature Silhouette |
|-------|----------|------|---------------------|
| Berserker | Assassin | Melee burst | Dual axes, massive physique, rage aura |
| Shaman | Healer | Magic support | Totem, spirit mask, elemental effects |
| Hunter | Ranger | Ranged damage | Spear, beast pelt, animal companion |

---

## CLASS DIFFERENTIATION RULES

Different classes must be visually distinct from each other.

Every class should be recognizable by silhouette alone — even at 64x64 px, no face visible.

| Class | Weapon | Defining Visual Trait |
|-------|--------|----------------------|
| Warrior | Sword + Shield | Balanced, armored, versatile |
| Tank | Massive Shield + Mace | Heaviest armor, broadest frame |
| Mage | Staff, Magic Focus | Robes, floating elements, glowing aura |
| Healer | Staff, Holy Symbols | Light robes, soft glow, hood |
| Ranger | Bow, Quiver | Light armor, lean build, cloak |
| Assassin | Dual Blades | Slim silhouette, hooded, crouched stance |
| Support | Banner, Orb, Tome | Medium robe, ornamental, positioned back |

**Orc-specific replacements:**

| Orc Class | Replaces | Defining Visual Trait |
|-----------|----------|----------------------|
| Berserker | Assassin | Massive dual axes, muscular, rage aura |
| Shaman | Healer | Totem, spirit mask, bone ornaments |
| Hunter | Ranger | Spear, beast pelt, animal companion |

---

## NEW RACE CREATION RULES

> Renamed from "New Faction Creation Rules" (v2.0) — this checklist defines
> what a brand-new Race needs (Dwarf, Beastmen, Dragonkin, Vampire, etc).
> See NEW FACTION CREATION RULES below for the (shorter) checklist for adding
> a new Faction within an existing Race.

If a new race is ever added, all of the following must be defined before any asset is generated.

### Required Checklist

1. **Name** -- Race label
2. **Default Faction symbol / motif** -- Core iconographic motif for the
   Race's first/default Faction (e.g. Lion, Skull, Star)
3. **Primary colors** -- 2-3 dominant colours (for the default Faction)
4. **Secondary colors** -- 1-2 accent colours
5. **Shape language** -- Geometric identity (rectangles, curves, triangles)
6. **Core materials** -- Signature materials (steel, bone, crystal)
7. **Themes** -- 2-4 thematic keywords (Order, Chaos, Nature)
8. **Body proportions** -- height offset and build notes (see RACE PROPORTION SYSTEM)
9. **Typical age range** -- per class, and any Race-wide age modifier (see Age Diversity)
10. **Gender distribution norms** -- any Race-level exceptions (see GENDER REPRESENTATION)
11. **Architecture style** -- How their buildings look
12. **Weapon style** -- Weapon design language
13. **Armor style** -- Armor design language
14. **Magic style** -- Spell effects visual identity
15. **Background biome** -- Associated environment
16. **Boss identity** -- Unique boss design direction
17. **UI accent color** -- UI colour for Race-themed panels
18. **Emotion portrait style** -- How their emotion portraits differ

> Without this checklist, a new Race **cannot be approved** for asset generation.

---

## NEW FACTION CREATION RULES

> New, narrower checklist (v2.0) for adding a Faction within an *existing*
> Race — e.g. a second Human kingdom, or "Fire Cult" as an Orc/Human Faction.
> This is shorter than NEW RACE CREATION RULES above because Faction does not
> touch body proportions, age, or gender norms — those are inherited from
> the Race unchanged. See the Faction Design Checklist under FACTION DESIGN
> GUIDE above for the full list.

Quick summary — a new Faction needs: Race, Name, primary/secondary colors,
heraldic symbol, decoration language, themes, and scale (Hero vs Enemy/Lore).
See FACTION DESIGN GUIDE above for the complete checklist and worked example.

---

## NEW CLASS CREATION RULES

If a new class is ever added, all of the following must be defined:

### Required Checklist

1. **Combat role** -- What the class does in battle
2. **Weapon type** -- Primary weapon
3. **Armor weight** -- Light / Medium / Heavy
4. **Signature silhouette** -- Readable at 64x64
5. **Animation profile** -- Idle, attack, hit stance notes
6. **Rarity progression path** -- How equipment changes per tier
7. **Portrait characteristics** -- Framing, expression baseline
8. **Emotion profile** -- How this class expresses emotions differently

---

## STYLE ANCHOR RULES

### The Anchor Principle

Every race+faction+class combination starts with a single **BASE model** that becomes the **Style Anchor** for all future variants.

### Rules

1. **No rarity variant may be generated before BASE approval.**
2. The approved BASE becomes the **STYLE ANCHOR**.
3. All future variants must use **Image Guidance at 35-45%** strength.
4. If any variant's style diverges recognisably from the anchor -> **asset is rejected**.
5. Style Anchor approval is documented in `05_REFERENCE/01_ASSET_CHECKLIST.md` (REFERENCE LOCK section).
6. Once approved, Style Anchor DNA **must not change**.

### Workflow

`
Generate 4-8 BASE variants
        |
Select best candidate
        |
Approve as Style Anchor
   (set to YES in REFERENCE LOCK)
        |
Generate all rarity variants
   (using Image Guidance 35-45%)
        |
Review against anchor
   (reject if style drifted)
`

## CHARACTER IDENTITY TYPES

Not every character needs face consistency. Three distinct identity types exist, each with different rules.

---

### HERO CHARACTER

Named playable character that the player controls.

| Property | Rule |
|----------|------|
| Identity | Must remain consistent across ALL rarity tiers |
| Face | Same face, same hairstyle, same age range — always |
| Silhouette | Same class silhouette, same body proportions |
| Purpose | Player recognizes THEIR character instantly |
| Example | Human (Lion Kingdom) Warrior Base → Rare → Epic = the same hero |

**Prompt rule:** Always use Image Guidance from the approved BASE of this specific hero.

---

### GENERIC UNIT

Race+Faction member used as enemy, ally, or background trooper.

| Property | Rule |
|----------|------|
| Identity | May vary — different faces, hair, ages, builds |
| Face | **Not** locked — can be regenerated per instance |
| Must preserve | Race identity, Faction identity, class identity, color palette, heraldry, shape language |
| Purpose | Populate the world with believable Race+Faction members |
| Example | Lion Kingdom Warrior A, Lion Kingdom Warrior B, Lion Kingdom Warrior C — each a different face, but all wear blue/gold with lion crest, all Human build |

**Prompt rule:** Use Race+Faction templates, NOT a specific hero BASE. Vary seed or omit Image Guidance for the face.

---

### NPC CHARACTER

Unique story character that is not playable.

| Property | Rule |
|----------|------|
| Identity | Unique — own face, own hairstyle, own design |
| Face | Locked for THIS character only (not shared with hero or other NPCs) |
| Race / Faction | May belong to any Race/Faction, or be factionless |
| Purpose | Memorable story encounter |
| Examples | Captain Roland (Human, not our Warrior), Blacksmith Bronson, Queen Elyndra |

**Prompt rule:** Generate from scratch with a unique description. Save and lock the approved result as a new Style Anchor.

---

### Quick Decision Guide

```
Is it the player’s character?
  → HERO — lock face identity across all rarities
No — is it a named story character?
  → NPC — generate unique face, lock for this character only
No — is it a race+faction member (enemy/ally/trooper)?
  → GENERIC UNIT — face can vary, keep race+faction identity
```

---

### Why This Matters

Before this distinction, every “Human Warrior” had the same face — which made the world feel small. Now:

- Your **Hero** feels like YOUR character
- **Generic units** make armies look populated (different faces, same race+faction)
- **NPCs** feel like real people, not clones

This is the difference between a project that generates images and a project that builds a scalable universe.

---

*This document is the visual constitution of Idle Kingdom Revolution. Questions of style authority are settled here first.*
