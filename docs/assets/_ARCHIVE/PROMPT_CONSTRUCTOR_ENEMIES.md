# PROMPT_CONSTRUCTOR_ENEMIES.md

> **UŻYCIE:** Generuj jednostki wrogów (Generic Units) oraz Bossów.
> Pamiętaj o globalnych Złotych Zasadach z `PROMPT_CONSTRUCTOR.md`.

---

## GENEROWANIE GENERIC UNITS (Wrogowie / Żołnierze)

**Zasada:** Generujemy pojedyncze obrazki, nie siatki. Tylko Common rarity, tylko stan `idle`. Twarz może się zmieniać (zmiana seeda).

### Szablon Promptu dla Generic Unit (pojedynczy obrazek)
Stylized fantasy 3D render of a {faction} {class}, Common quality, generic soldier, full body shot from head to feet, feet visible, 3/4 front view, centered, transparent background, flat solid chroma green background #00A651, {faction_motif} visible on armor, {class_weapon}, no magical effects, soft studio lighting, game character portrait, high readability --ar 1:1 --v 6 --seed {random_seed}

### Przykład – Human Warrior Generic 01:
Stylized fantasy 3D render of a Human Warrior, Common quality, generic soldier, full body shot from head to feet, feet visible, 3/4 front view, centered, transparent background, flat solid chroma green background #00A651, lion motif on chestplate, simple steel armor, longsword and kite shield, no magical effects, soft studio lighting, game character portrait, high readability --ar 1:1 --v 6 --seed 12345

---

## GENEROWANIE BOSSÓW

**Zasada:** Bossowie mają 3 stany (`idle`, `attack`, `hit`) i mogą mieć różne rarity (Common → Mythic). Generujemy je jako pojedyncze obrazki (nie siatki), z większym wypełnieniem kadru (85-95%).

### Szablon Promptu dla Bossów
3D render of a fantasy {boss_name}, {theme} theme, {rarity} boss, {description}, massive scale, intimidating presence, dramatic lighting, flat solid chroma green background #00A651, full body, game boss asset, isolated subject, epic scale --ar 1:1 --v 6

### Przykład – Fire Dragon (Legendary):
3D render of a fantasy fire dragon, fire theme, legendary boss, massive red-scaled dragon with magma cracks in wings, horns, breathing fire, glowing eyes, dramatic lighting, flat solid chroma green background #00A651, full body, game boss asset, isolated subject, epic scale --ar 1:1 --v 6

### Uwagi:
- Dla Epic/Legendary/Mythic bossów generuj w rozdzielczości 1024x1024.
- Aby uzyskać stany `attack` i `hit`, dodaj do promptu: `, mid-swing attack pose` lub `, staggered hit pose`.
