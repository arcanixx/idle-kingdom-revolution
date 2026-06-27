# PROMPT_CONSTRUCTOR v1.0 – SYSTEM

> **GŁÓWNY SZKIELET:** Ten plik zawiera globalne zasady i spis treści.
> Aby wygenerować konkretny asset, skorzystaj z odpowiedniego pliku poniżej.

---

## SPIS TREŚCI (Podział na konkretne generatory)

1. **`PROMPT_CONSTRUCTOR_HERO.md`** – Generowanie jednostek Hero (Warrior, Mage, Tank...).
2. **`PROMPT_CONSTRUCTOR_ENEMIES.md`** – Generowanie wrogów i Bossów.
3. **`PROMPT_CONSTRUCTOR_PROPS.md`** – Generowanie budynków, drzew, ruin i rzeczy na planszy.
4. **`PROMPT_CONSTRUCTOR_ITEMS.md`** – Generowanie ikon przedmiotów (mikstur, monet).
5. **`PROMPT_CONSTRUCTOR_PORTRAITS.md`** – Generowanie portretów emocji do dialogów.
6. **`PROMPT_CONSTRUCTOR_BACKGROUNDS.md`** – Generowanie tła do walk i map.

---

## GLOBALNE ZŁOTE ZASADY (Stosować do WSZYSTKICH generacji)

### 1. WYPEŁNIENIE KOMÓRKI (dla siatek)
- Postać w każdej komórce musi zajmować **70-75% wysokości komórki**.
- Pozostawia to **25-30% wolnego marginesu** na górze dla skrzydeł i aur. Zapis w prompcie: *"Character occupies 70-75% of the cell height. Leaves 25-30% empty vertical space at the top."*

### 2. CAMERA LOCK (Sztywny kadr)
- W prompcie ZAWSZE dodawaj: *"Identical camera zoom, distance, and angle across all cells. Same focal length. Identical pose, identical 3/4 view."*

### 3. HERB (Spójność heraldyki)
- Herb na napierśniku i tarczy musi być opisany jako: *"MANDATORY in every cell. Only the material evolves (painted → 3D gold → starlight). The shape and pose is strictly identical in all cells."*
- Dodatkowo: *"The shield shape is STRICTLY a 'kite shield' (pointed at the bottom) in ALL cells. No round shields."*

### 4. ZAKAZ ZMIANY MOTYWU NA TARCZY
- *"The heraldic golden lion on the shield is the exact same full-body standing lion pose in EVERY cell. It must be a full lion (head + body + tail), NOT just a lion's head."*

### 5. ZAKAZ AUREOLI (HALO)
- Dla Legendary: używamy tylko skrzydeł i poświaty. Dla Mythic: używamy wirującego pyłu gwiezdnego. **Zakaz tradycyjnej aureoli (halo) w obu przypadkach.**


## PRODUCTION PROMPT MODULES

Po zaakceptowaniu PoC v3 prompty produkcyjne traktujemy jako specyfikacje eksportu assetu, a nie zwykłe opisy obrazka.

Nowy domyślny porządek modułów:

```text
MASTER_VISUAL_SPEC
RENDER_CONTRACT_CHARACTERS
PRODUCTION_SPRITE_ATLAS_CONTRACT
REFERENCE_FRAME_SYSTEM
ASSET_TYPE_TEMPLATE
FACTION_MODULE
CLASS_MODULE
HERALDRY_OR_SYMBOL_LOCK
RARITY_DEFINITIONS
EFFECTS_CONTRACT
QUALITY_CHECK
NEGATIVE_PROMPT
```

Pliki bazowe:

- `14_PRODUCTION_SPRITE_ATLAS_CONTRACT.md`
- `15_GLOBAL_REFERENCE_FRAME_SYSTEM.md`
- `16_PROMPT_MODULE_SYSTEM.md`
- `17_HUMAN_WARRIOR_POC_V3.md`

Najważniejsze pojęcia:

- `Sprite Slot` zastępuje luźne pojęcie `Grid Cell`.
- `Reference Frame` definiuje niewidzialną ramkę spójności.
- Rarity jest addytywne: nic nie znika i nic nie jest projektowane od nowa.
- Heraldyka i symbole frakcji są traktowane jak logo, które można ulepszać materiałem i światłem, ale nie wolno go przeprojektować.
---

## GLOBALNE DEFINICJE FRAKCJI (Kolory i Kształty)

| Frakcja | Motyw | Kolory | Dominujący kształt |
|---------|-------|--------|-------------------|
| Human | Lew | Złoto, Niebieski, Stal | Prostokąty, Tarcze Kite |
| Elf | Liść | Srebro, Zieleń, Biel | Łuki, Liście, Krzywizny |
| Orc | Kość | Brąz, Zieleń, Rdza | Trójkąty, Kolce, Asymetria |
| Undead | Czaszka | Szarość, Trupia Zieleń | Połamane linie, Ostre kąty |
| Demon | Róg | Czerń, Czerwień, Fiolet | Ostre rogi, Płomienie |
| Celestial | Gwiazda | Biel, Złoto, Lazur | Okręgi, Promienie, Halo (tylko dla Celestial) |


