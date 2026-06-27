# 02 – Unit Portraits

> Jednostki – hierarchia BASE → RARITY dla każdej kombinacji Frakcja + Klasa.
> Rozmiar: 512×512 WebP (z alpha channel)
> Styl: 3D render fantasy character, PEŁNA POSTAĆ Z NOGAMI (full-body, od głowy do stóp), kąt kamery 3/4 (obrót, nie ucięcie kadru), skupienie na sylwetce i detalach zbroi.
>
> **WAŻNE rozróżnienie:** "3/4 view" w tym dokumencie oznacza KĄT OBROTU KAMERY (postać obrócona ok. 45° do obiektywu), NIE ucięcie kadru w 3/4 wysokości. Postać MUSI mieć widoczne nogi i stopy w każdym wariancie rarity (Base → Mythic). Jeśli model AI (np. Gemini) generuje postać bez nóg, dodaj do promptu explicite: "full body shot from head to feet, feet visible, NOT a cropped portrait, NOT half-body".

> **UWAGA – stany bojowe:**
> - `idle`, `attack`, `hit` to **osobne assety** (różne pozy/sylwetki). Generujemy je TYLKO dla **HERO CHARACTERS** (playable units).
> - **GENERIC UNITS** (enemies, allies, troopers) mają TYLKO stan `idle`. Nie generujemy dla nich `attack` i `hit`.
> - Wszystkie inne efekty wizualne (blood, burn, frozen, poison, death, necromancy) to **overlay'e** nakładane w kodzie/shadere – NIE generujemy osobnych assetów.
> - Szczegóły: patrz `05_REFERENCE/02_COMBAT_VISUAL_STATES.md`.

---

## Hierarchia BASE → RARITY

**KLUCZOWA ZMIANA:** Generujemy **jeden bazowy model** dla każdej kombinacji Frakcja + Klasa, a następnie **7 wariantów rarity** (Base → Mythic) na jego podstawie.

**Korzyści:**
- Spójność twarzy, sylwetki i proporcji
- Gracz widzi progresję tej samej postaci
- Łatwiejsza kontrola jakości

**Przykład – Human Warrior:**

Human Warrior BASE (referencja)
├── Human Warrior Common (prosta zbroja, zwykły miecz)
├── Human Warrior Uncommon (lepsza zbroja, stalowy miecz, delikatne zdobienia)
├── Human Warrior Rare (srebrna zbroja z niebieskimi klejnotami, runy)
├── Human Warrior Epic (złota zbroja z rubinami, aura mocy)
├── Human Warrior Legendary (celestial armor of light, skrzydlaty hełm)
└── Human Warrior Mythic (zbroja z żywych gwiazd, zmieniające się konstelacje)

### WYMÓG SPÓJNOŚCI KSZTAŁTÓW I HERALDYKI W SIATKACH
Podczas generowania siatek, aby uniknąć niespójności (jak zmiana kształtu tarczy lub zamiana lwa na głowę lwa), w prompcie obowiązkowo dodajemy:
- **Ograniczenie kształtu:** "Shield shape is STRICTLY a kite shield in ALL 6 cells. No round shields."
- **Ograniczenie sylwetki herbu:** "The emblem on the shield must be a full-body standing lion in ALL cells, not just a head. Only its depth (flat vs 3D) and material (gold vs starlight) changes."

---

### Hero – definicja i zakres

**Hero** to każda postać w drużynie gracza (party). W typowym idle RPG drużyna liczy 3–5 postaci, każda innej klasy. Wszystkie otrzymują pełną progresję rarity.

| Aspekt | Zasada |
|--------|--------|
| Frakcja | 1 na playthrough (np. Human) |
| Klasy | Tyle, ile miejsc w drużynie (zwykle 3–5 z 7 dostępnych) |
| Rarity | Wszystkie 6 (Common → Mythic) + BASE |
| Stany | idle, attack, hit |
| Płeć | Obie (Male / Female), wybór per postać |
| Wiek | Dostosowany do klasy i frakcji (patrz `00_FOUNDATION/00_ART_DIRECTION.md` → Age Diversity) |

> **Konsekwencja:** Dla JEDNEJ frakcji generujemy hero assets dla WSZYSTKICH 7 klas (gracz może dowolnie składać drużynę).
> **7 klas × 6 rarity × 3 stany × 2 płcie = 252 pliki** na frakcję.
> Tylko 1 frakcja jest aktywna na playthrough. Pozostałe 5 frakcji to Generic Units + NPC.

### Generic Unit – 3 twarze (facial variants)

> **Co to są "3 twarze"?** To 3 różne wyglądy twarzy dla tej samej klasy/frakcji, żeby wrogowie i żołnierze nie wyglądali jak klony.
> To NIE są stany (idle/hit/attack) ani emocje (portrety).

- Każda frakcja + klasa ma **3 warianty twarzy** (Generic 01, 02, 03).
- Tylko Common rarity, tylko stan `idle`.
- Różnią się ONLY seedem w promptcie – reszta (zbroja, broń, motyw) identyczna.
- **Nie używamy** Image Guidance z Hero BASE.
- Folder: `public/assets/units/{faction}/generic/`
- Nazewnictwo: `{faction}_{class}_generic_01.webp` (02, 03)

**Przykład:** `human_warrior_generic_01.webp` = inna twarz niż Hero Human Warrior.

Szczegóły: `07_GENERIC_UNITS.md`

---

## Zasady kompozycji

- **Kadr:** Full body (cała postać z nogami, od głowy do stóp) widziana pod kątem kamery 3/4 (obrót postaci, nie ucięcie kadru).
- **Pozycja:** Centralna, dynamiczna, gotowa do walki.
- **Zajętość kadru:** 75-80% (5-10% marginesu z każdej strony).
- **Tło:** Przezroczyste (alpha channel).
- **Oświetlenie:** Soft studio lighting, warm key light, cool fill light.
- **Detale:** Poziom szczegółowości jak w przykładowym Human Warrior – herb na tarczy, detal na zbroi.

---

## Prompty

### Krok 1 – Generowanie Bazowego Modelu (BASE)

**Cel:** Ustalić twarz, sylwetkę, proporcje i styl dla danej frakcji + klasy.

**Prompt BASE:**

3D render of a fantasy {faction} {class}, base model, neutral stance, full body shot from head to feet, feet visible, NOT a cropped portrait, camera angle: 3/4 turn, simple equipment, soft studio lighting, transparent background, game character portrait, isolated subject, centered, high detail --ar 1:1 --style raw --v 6

**Przykład – Human Warrior BASE:**

3D render of a fantasy human warrior, base model, neutral stance, full body shot from head to feet, feet visible, NOT a cropped portrait, camera angle: 3/4 turn, simple steel armor with lion motif on chest, simple sword and shield with small lion emblem, soft studio lighting, transparent background, game character portrait, isolated subject, centered, high detail --ar 1:1 --style raw --v 6

**UWAGA:** Wygeneruj ten BASE raz, a następnie używaj go jako **Image Guidance (Init Image)** dla wszystkich rarity tej samej klasy/frakcji.

---

### Krok 2 – Generowanie Rarity (Base → Mythic)

**Zasada:** Użyj BASE jako referencji (Image Guidance) z siłą **35-45%** – Leonardo zachowa twarz i sylwetkę, a zmieni tylko ekwipunek, aurę i ozdoby.

**Szablon dla Rarity:**

3D render of a fantasy {faction} {class}, {rarity} quality, {equipment_upgrade}, {aura_effect}, {ornaments}, full body shot from head to feet, feet visible, NOT a cropped portrait, camera angle: 3/4 turn, same character as reference, soft studio lighting, transparent background, game character portrait, isolated subject, centered, high detail --ar 1:1 --style raw --v 6

**Modyfikatory według rarity:**

| Rarity | Detail vs Base | Equipment Upgrade | Aura Effect | Heraldry / Ornaments | Cloth Elements | Constraints |
|--------|---------------|-------------------|-------------|---------------------|----------------|-------------|
| Base | 0% (baseline) | reference character, neutral equipment | none | none | none | plain equipment, no decorations, minimum polygons |
| Common | 5-10% more | simple steel armor, basic weapon | none | minor heraldry improvements | none | no capes, no shield redesign, no visual prestige increase |
| Uncommon | 15-25% more | improved mixed materials (iron/leather/fur) | subtle weapon glow | faction symbol visible on chest/shield | small tabard or shoulder cape | no full cloak, no gemstones |
| Rare | 30-40% more | enchanted silver/blue steel, glowing runes | soft magical aura | painted faction crest, engraved symbols | half-cloak or long tabard | -- |
| Epic | 50-65% more | ornate gold filigree armor with rubies | moderate aura with sparks | gold inlay, gemstone-encrusted crest | full cloak with faction-colored trim | -- |
| Legendary | 75-90% more | celestial armor of light and gold | strong aura with floating particles | divine symbols, halos, light motes | flowing enchanted cloak with particle trail | -- |
| Mythic | 100%+ (max density) | mythic divine armor, constellation engravings | living celestial energy, galaxy particles | ancient cosmic symbols | ethereal floating cloth | everything in motion |

---

## Frakcje – Klasy i Motywy


**KEY CHANGE:** We generate 7 rarity variants in a single 2x4 grid instead of individual images. In prompts we always add: Leave a 20-pixel transparent gap between each character. Do not let weapons, auras, or shields overlap into adjacent cells. Post-processing (cropping) is done by Python script (auto-crop contours), which removes background and crops characters with margin.

| Frakcja | Motyw | Klasy (do wyboru) |
|---------|-------|-------------------|
| Human | Lion | Warrior, Mage, Tank, Healer, Ranger, Assassin, Support |
| Elf | Tree / Leaf | Warrior, Ranger, Mage, Healer, Assassin, Support, Tank |
| Orc | Tusk / Bone | Warrior, Tank, Berserker, Shaman, Hunter, Support, Mage |
| Undead | Skull | Warrior, Mage, Tank, Healer, Assassin, Support, Ranger |
| Demon | Horn | Warrior, Mage, Tank, Assassin, Support, Healer, Ranger |
| Celestial | Star | Warrior, Mage, Healer, Tank, Support, Ranger, Assassin |

**Uwaga:** Orc ma unikalny zestaw 7 klas (zamiast Ranger/Healer/Assassin używa Berserker/Shaman/Hunter) – przy liczeniu łącznej liczby plików (frakcje × klasy × rarity × stany) ta frakcja nie jest 1:1 wymienna z resztą, mimo że liczba klas się zgadza (7).

---

## Struktura plików

public/assets/units/
├── human/
│ ├── human_warrior_common_idle.webp
│ ├── human_warrior_uncommon_idle.webp
│ ├── human_warrior_rare_idle.webp
│ ├── human_warrior_epic_idle.webp
│ ├── human_warrior_legendary_idle.webp
│ ├── human_warrior_mythic_idle.webp
│ ├── human_warrior_common_attack.webp
│ ├── human_warrior_common_hit.webp
│ └── ... (dla każdej rarity)
├── elf/
├── orc/
├── undead/
├── demon/
└── celestial/

**Nazewnictwo:** `{faction}_{class}_{rarity}_{state}.webp`

**Stany:** `idle`, `attack`, `hit`

---
---

## CHARACTER PROPORTION SYSTEM

All units use the same proportion baseline defined in `00_FOUNDATION/00_ART_DIRECTION.md`.

**Human baseline (reference):**
- Head-to-body ratio: 1:7.5 (heroic proportion)
- Weapons: 110-130% realistic size
- Armor: 120% readability scale

**Per-faction offsets:**
- Elf: +0.1 height, more slender
- Orc: +0.2 width, broader silhouette
- Undead: same height, gaunt frame
- Demon: +0.15 height, wider horns add mass
- Celestial: +0.05 height, floating elements add presence

These proportions apply to ALL rarity variants of a given faction+class. See `00_FOUNDATION/00_ART_DIRECTION.md` for full details.

---

## STYLE ANCHOR RULES

Every faction+class combination requires **BASE model approval** before rarity variants can be generated.

1. Generate 4-8 BASE variants for a faction+class.
2. Select the best candidate and approve as **Style Anchor**.
3. Update the REFERENCE LOCK in `05_REFERENCE/01_ASSET_CHECKLIST.md` to Approved: YES.
4. Only then generate rarity variants (Common through Mythic).
5. All variants must use Image Guidance at **35-45%** with the approved BASE.
6. If a variant recognisably diverges from the anchor -> reject and regenerate.

This workflow ensures the 42 BASE models remain the single source of truth for all 252+ rarity variants.

## Uwagi

- **Image Guidance (Init Image) to klucz do spójności.** Zawsze używaj BASE jako referencji.
- **Nie generuj wszystkich rarity naraz.** Zacznij od Common dla wszystkich frakcji (Faza 1), potem dodawaj kolejne rarity (Faza 2 i 3).
- **Jeśli używasz różnych narzędzi** (Leonardo, Midjourney, DALL-E), zawsze używaj tej samej referencji i tych samych parametrów stylu.
- **Warianty attack/hit:** Możesz wygenerować je osobno (dodając "mid-swing" lub "reeling from impact") lub ja mogę je stworzyć w post-processingu przez proste przekształcenia (szybsze na start).
