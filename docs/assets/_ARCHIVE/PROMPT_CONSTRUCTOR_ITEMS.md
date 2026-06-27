# PROMPT_CONSTRUCTOR_ITEMS.md

> **UŻYCIE:** Generuj ikony przedmiotów (broń, zbroje, mikstury, monety, klejnoty) do ekwipunku i UI.
> Pamiętaj o globalnych Złotych Zasadach z `PROMPT_CONSTRUCTOR.md`.

---

## SZABLON PROMPTU DLA IKON PRZEDMIOTÓW

**Zasada:** Pojedynczy obiekt, centralnie wyśrodkowany, izolowany na zielonym tle (do wycięcia).

### Szablon podstawowy:
3D render of a fantasy {item}, {material} material, {rarity} quality, {description}, soft studio lighting, flat solid chroma green background #00A651, game item icon, isolated subject, centered, high detail --ar 1:1 --v 6

### Przykłady:

**Iron Sword (Common):**
3D render of a fantasy sword, iron material, common quality, simple steel blade, leather-wrapped hilt, crossguard with scratches, worn but functional, soft studio lighting, flat solid chroma green background #00A651, game item icon, isolated subject, centered, high detail --ar 1:1 --v 6

**Health Potion (Common):**
3D render of a fantasy potion, glass material, common quality, red glowing liquid, round flask, cork stopper, soft studio lighting, flat solid chroma green background #00A651, game item icon, isolated subject, centered, high detail --ar 1:1 --v 6

**Gold Coin Stack (Common):**
3D render of a fantasy gold coin stack, gold material, shiny with crown emblem, stacked in small pile, soft studio lighting, flat solid chroma green background #00A651, game item icon, isolated subject, centered, high detail --ar 1:1 --v 6

---

## KATEGORIE PRZEDMIOTÓW (Lista do generowania)

| Kategoria | Przykłady |
|-----------|-----------|
| Bronie | Iron Sword, Mythril Blade, Flaming Sword, Celestial Blade |
| Mikstury | Health Potion, Mana Potion, Potion of Strength, Elixir of Life |
| Tarcze/Zbroje | Wooden Shield, Steel Shield, Dragon Scale Shield, Plate Armor |
| Waluta | Gold Coin, Silver Coin, Gem (Red, Blue, Purple), Mana Crystal |
| Akcesoria | Leather Backpack, Healing Herb, Magic Scroll |

---

### Uwagi:
- Rozmiar docelowy: 256x256 WebP (po wycięciu).
- Używaj zielonego tła dla łatwego wycięcia przez skrypt Python.
