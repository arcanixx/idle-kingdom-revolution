# ASSET_STYLE_BIBLE_MASTER v1.0

> **IMPORTANT:** This document covers the technical implementation details.
> For the high-level design philosophy (race/faction language, proportion system), see **00_ART_DIRECTION.md**.
>
> **v2.0 terminology note (2026-06-27):** "Faction" in this document's
> FACTION VISUAL MOTIFS and SHAPE LANGUAGE tables below refers to what
> `00_ART_DIRECTION.md` now calls **Race** (Human, Elf, Orc, Undead, Demon,
> Celestial). See `00_ART_DIRECTION.md` → RACE, FACTION, AND CLASS for the
> full three-axis model. Section headers below are kept close to their
> original wording but annotated where the distinction matters.

---

Project:
Idle Kingdom Revolution

Purpose:
Single source of truth for all generated visual assets.

---

## CORE VISUAL IDENTITY

Style:
Stylized Fantasy 3D Render

Target:
Looks like a modern mobile fantasy RPG.

Visual inspirations:

* Warcraft
* Hearthstone
* Raid Shadow Legends
* AFK Arena

Not photorealistic.
Not anime.
Not painterly.

---

## ART DIRECTION

Visual readability is more important than realism.

Every asset must remain recognizable at:

* 128x128
* 64x64

Silhouette clarity is mandatory.

---

## CAMERA RULES

Characters:
3/4 front view

Portraits:
Chest-up

Bosses:
3/4 full body

Items:
Centered product-shot view

Backgrounds:
Wide cinematic landscape

---

## LIGHTING RULES

Always use:

Soft studio lighting

Warm key light:
upper-left

Cool fill light:
upper-right

Subtle rim light:
back outline

No hard shadows.

No dramatic movie lighting.

---

## MATERIAL RULES

Metal:
clean fantasy metal

Leather:
stylized fantasy leather

Wood:
clean fantasy wood

Crystal:
glowing internal light

Never:
photorealistic scratches
PBR realism
grunge textures

---

## CHARACTER COMPOSITION

Character occupies:

70-75% of canvas

Always centered.

Never cropped.

15-20% transparent padding.

**KOMPOZYCJA W SIATKACH (GRID):**
Dla generowania siatek wielopostaciowych, postać w każdej komórce musi zajmować **70-75% wysokości komórki**. 
Pozwala to na zachowanie 25% marginesu na górze na skrzydła, aury i atrybuty wizualne, zapobiegając ich ucinaniu (co jest powszechnym błędem AI przy 85-90% wypełnienia).

---

## RENDER STYLE

High detail.

Game-ready.

Fantasy collectible card quality.

Readable shapes.

Strong focal point.

Clean edges.

Transparent background.

---

## NEGATIVE STYLE

Forbidden:

photorealism
anime
manga
pixel art
watercolor
oil painting
comic book
concept sketch
real human photography
dark horror realism

---

## UNIVERSAL NEGATIVE PROMPT

low quality,
blurry,
watermark,
logo,
signature,
cropped,
extra arms,
extra fingers,
multiple characters,
duplicate weapons,
deformed face,
ugly anatomy,
bad hands,
photorealistic,
anime,
pixel art,
concept sketch,
painting,
text,
UI elements

---

## CONSISTENCY PRIORITY

When in doubt:

Consistency > Detail

Readability > Realism

Game Asset > Artwork

Asset Set > Individual Asset


---

## RACE VISUAL MOTIFS

> Renamed from "Faction Visual Motifs" (v2.0) — see terminology note at the
> top of this document. A specific Faction within a Race may reuse these
> motifs (as Lion Kingdom does for Human) or define its own — see
> `00_ART_DIRECTION.md` → FACTION DESIGN GUIDE.

Each race must be recognizable by shape and symbol alone, even without colors.

| Race | Primary Motif | Secondary Motif | Heraldic Symbol |
|---------|---------------|-----------------|-----------------|
| Human | Lion | Crown, Sword | Lion rampant on shield |
| Elf | Tree / Leaf | Silver crescent, Bow | Ancient oak with stars |
| Orc | Tusk / Bone | Axe, Skull | Crossed tusks with axe |
| Undead | Skull | Chains, Scythe | Cracked skull with crown |
| Demon | Horn | Flame, Crystal | Horned skull with fire |
| Celestial | Star | Wing, Halo | Eight-pointed star with eye |

**Rule:** Every unit from a race (using its default/first Faction) must include at least one of these motifs in their design (on armor, weapon, shield, or accessory). This ensures instant race/faction recognition even in small sprites.

---

## SHAPE LANGUAGE

> Renamed header context (v2.0): table below describes **Race**-level shape
> language, same renaming as above.

Each race has a characteristic shape silhouette that must be visible even at 64x64.

| Race | Dominant Shapes | Application |
|---------|-----------------|-------------|
| Human | rectangles, kite shields | Shield shapes, pauldron silhouette |
| Elf | arches, curves, leaves | Helmet visors, cape hems, bow shapes |
| Orc | triangles, spikes | Armor edges, shoulder spikes, axe blades |
| Undead | broken lines | Torn capes, jagged armor, skeletal joints |
| Demon | sharp horns | Crown/coronet, shoulder ornaments, weapon tips |
| Celestial | stars and circles | Halo shapes, orb ornaments, circular gems |

**Rule:** Shape language must be readable in silhouette alone. A unit's race should be identifiable at 64x64 without color information.

---
