# REFERENCE_FRAME_SYSTEM v1.0

Project:
Idle Kingdom Revolution

Purpose:
Shared consistency system for generated characters, units, bosses, NPCs, and other repeatable asset families.

---

## CORE IDEA

Every production sprite uses an invisible Reference Frame.

The Reference Frame is not visible in the final image. It is a prompt-level contract that forces consistency between related assets.

For a rarity atlas, every Sprite Slot contains the same Reference Frame in the same position.

---

## REFERENCE FRAME CONTRACT

Every Reference Frame must have identical:

- width
- height
- position
- center point
- baseline
- internal character scale

The character body, armor, shield, and weapon must fit completely inside the Reference Frame.

Only magical effects may extend outside the Reference Frame, and even then they must remain inside the Sprite Slot.

---

## CHARACTER FRAME CONTRACT

Every hero occupies exactly the same invisible character frame.

The frame has identical width and height in every Sprite Slot.

The hero mesh, armor, shield, and sword must fit entirely inside this frame.

Magical effects may extend outside the character frame, but must always remain inside the Sprite Slot.

Every character frame is perfectly centered.

---

## ROW AND COLUMN ALIGNMENT

Every character uses the exact same vertical alignment.

Every character uses the exact same horizontal alignment.

The visible body height must be identical in every row.

The visible body width must be identical in every column.

Rows and columns are production references and must never drift.

---

## EFFECTS CONTRACT

Visual effects must never change the apparent size of the character.

The hero model always remains identical.

Only visual effects expand around the model.

The body, armor, shield, weapon, and face must never become larger because of rarity.

---

## BOSS FRAME RULE

Bosses may use a different Reference Frame from standard heroes.

A boss should not be treated as a normal hero made larger inside the same frame.

Instead, boss prompts should explicitly define a Boss Reference Frame with its own size and safe margins.

This keeps the pipeline consistent while allowing boss silhouettes to feel massive.

---

## PROMPT PHRASE

Use this block in production prompts when consistency matters:

```text
REFERENCE FRAME
Every sprite slot contains one invisible Reference Frame.
Every Reference Frame has identical size.
Every Reference Frame has identical position.
Every subject must fit completely inside its own Reference Frame.
The body, equipment, and primary silhouette always fit inside the Reference Frame.
Only magical effects may extend outside the Reference Frame.
Nothing may ever leave the Sprite Slot.
```
