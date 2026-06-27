# 05 – UI Elements

> Elementy interfejsu – ramki, przyciski, paski, ikony.
> Styl: Fantasy UI, metaliczne efekty, klejnoty, ornamenty.

---

## Zasady stylu

- **Styl:** Średniowieczny fantasy, metaliczne obramowania, klejnoty.
- **Tło:** Przezroczyste (alpha channel) dla ramek i przycisków.
- **Kolory:** Zgodne z paletą frakcji lub rarity.

---

## Kategorie UI

### Ramki paneli (dla okienek, ekwipunku, statów)
- Panel Frame (Common) – żelazo, proste nity
- Panel Frame (Uncommon) – srebro, liściaste wzory
- Panel Frame (Rare) – srebro z niebieskimi klejnotami
- Panel Frame (Epic) – złoto z fioletowymi klejnotami
- Panel Frame (Legendary) – celestial gold, świecące
- Panel Frame (Mythic) – boskie złoto, animowane iskry

### Przyciski
- Button Gold (złoto, smocze motywy)
- Button Silver (srebro, wilcze motywy)
- Button Wood (drewno, żelazne okucia)

### Ikony i symbole
- Heart Icon (HP)
- Mana Orb (MP)
- Shield Icon (obrona)
- Sword Crossed (walka)

### Paski postępu
- HP Bar Fill (czerwony, gradient)
- MP Bar Fill (niebieski, gradient)
- EXP Bar Fill (żółty, gradient)

---

## Prompty

### Ramki paneli

Fantasy game UI panel frame, {style} style, {color_scheme}, {description}, transparent background, game UI asset, isolated, high detail --ar 1:1 --style raw --v 6

**Przykład – Panel Frame (Epic):**

Fantasy game UI panel frame, royal gold style, gold and purple color scheme, elaborate decorative borders with gemstones, transparent background, game UI asset, isolated, high detail --ar 1:1 --style raw --v 6

### Przyciski

Fantasy game UI button, medieval style, {color} color scheme, {motif} motifs, metallic shine, transparent background, game UI asset, isolated, high detail --ar 1:1 --style raw --v 6

**Przykład – Button Gold:**

Fantasy game UI button, medieval style, gold and sapphire color scheme, dragon motifs, metallic shine, transparent background, game UI asset, isolated, high detail --ar 1:1 --style raw --v 6

### Ikony

Simple {color} {icon_name} symbol, glossy finish, slight bevel, transparent background, game UI asset --ar 1:1 --style raw --v 6

**Przykład – Heart Icon:**

Simple red heart symbol, glossy finish, slight bevel, transparent background, game UI asset --ar 1:1 --style raw --v 6

---

## Struktura plików

public/assets/ui/
├── panel_frame_common.webp
├── panel_frame_rare.webp
├── panel_frame_epic.webp
├── button_gold.webp
├── heart_icon.webp
├── mana_orb.webp
├── hp_bar_fill.webp
├── ...

**Nazewnictwo:** `{element}_{variant}.webp`

---

## Uwagi

- **Proste elementy** (ikony, paski) lepiej zrobić w SVG lub CSS.
- **Grafiki AI** są potrzebne dla: ramek paneli, dekoracyjnych przycisków, unikalnych elementów.
- **Narzędzie:** Leonardo.ai (lepsza kontrola nad detalami).
