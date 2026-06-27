# 03 – Item Icons

> Przedmioty, bronie, eliksyry, tarcze, waluta.
> Rozmiar: 256×256 WebP (z alpha channel)
> Styl: 3D render fantasy item, isolated on transparent background, product shot style.

---

## Zasady stylu

- **Kadr:** Wyśrodkowany, obiekt zajmuje 80-90% kadru.
- **Tło:** Przezroczyste.
- **Oświetlenie:** Soft studio lighting, delikatny połysk.
- **Kąt:** 3/4 widok lub widok z góry (dla eliksyrów).

---

## Kategorie przedmiotów

### Bronie
- Iron Sword (Common)
- Mythril Blade (Rare)
- Flaming Sword (Epic)
- Celestial Blade (Legendary)
- Orcish War Axe (Uncommon)
- Elven Longbow (Rare)

### Eliksyry i mikstury
- Health Potion (Common)
- Mana Potion (Uncommon)
- Potion of Strength (Rare)
- Elixir of Life (Legendary)

### Tarcze i zbroje
- Wooden Shield (Common)
- Steel Shield (Uncommon)
- Dragon Scale Shield (Epic)
- Chainmail Chest (Common)
- Plate Armor (Rare)

### Waluta i klejnoty
- Gold Coin
- Silver Coin
- Gem (Red, Blue, Purple)
- Valor Token
- Mana Crystal

### Akcesoria
- Leather Backpack (Common)
- Healing Herb (Common)
- Magic Scroll (Uncommon)

---

## Prompty

### Wzorzec dla broni

3D render of a fantasy {item}, {material} material, {rarity} quality, {description}, soft studio lighting, transparent background, game item icon, isolated subject, centered, high detail --ar 1:1 --style raw --v 6

**Przykład – Iron Sword (Common):**

3D render of a fantasy sword, iron material, common quality, simple steel blade, leather-wrapped hilt, crossguard with scratches, worn but functional, soft studio lighting, transparent background, game item icon, isolated subject, centered, high detail --ar 1:1 --style raw --v 6

### Wzorzec dla eliksyrów

3D render of a fantasy potion, glass material, {rarity} quality, {color} glowing liquid, {container_shape}, {details}, soft studio lighting, transparent background, game item icon, isolated subject, centered, high detail --ar 1:1 --style raw --v 6

**Przykład – Health Potion (Common):**

3D render of a fantasy potion, glass material, common quality, red glowing liquid, round flask, cork stopper, soft studio lighting, transparent background, game item icon, isolated subject, centered, high detail --ar 1:1 --style raw --v 6

### Wzorzec dla waluty

3D render of a fantasy {item}, {material} material, {details}, game item icon, transparent background, isolated subject, centered --ar 1:1 --style raw --v 6

**Przykład – Gold Coin:**

3D render of a fantasy gold coin, gold material, shiny with crown emblem and text, stacked in small pile, game item icon, transparent background, isolated subject, centered --ar 1:1 --style raw --v 6

---

## Struktura plików

public/assets/items/
├── iron_sword.webp
├── health_potion.webp
├── gold_coin.webp
├── mana_crystal.webp
├── ...

**Nazewnictwo:** `{item_name}.webp` (małe litery, bez spacji)

---

## Uwagi

- **Narzędzie:** Leonardo.ai lub Midjourney (lepsza kontrola nad detalami).
- **Image Guidance:** Możesz użyć jednego przedmiotu jako referencji dla wszystkich (np. Health Potion jako wzorzec stylu dla innych eliksyrów).
- **Wielkość:** Generuj w 512×512, potem przeskaluj do 256×256.
