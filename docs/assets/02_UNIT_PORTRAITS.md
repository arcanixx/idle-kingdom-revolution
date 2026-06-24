# 02 – Unit Portraits

> Jednostki – hierarchia BASE → RARITY dla każdej kombinacji Frakcja + Klasa.
> Rozmiar: 512×512 WebP (z alpha channel)
> Styl: 3D render fantasy character, PEŁNA POSTAĆ Z NOGAMI (full-body, od głowy do stóp), kąt kamery 3/4 (obrót, nie ucięcie kadru), skupienie na sylwetce i detalach zbroi.
>
> **WAŻNE rozróżnienie:** "3/4 view" w tym dokumencie oznacza KĄT OBROTU KAMERY (postać obrócona ok. 45° do obiektywu), NIE ucięcie kadru w 3/4 wysokości. Postać MUSI mieć widoczne nogi i stopy w każdym wariancie rarity (Common → Mythic). Jeśli model AI (np. Gemini) generuje postać bez nóg, dodaj do promptu explicite: "full body shot from head to feet, feet visible, NOT a cropped portrait, NOT half-body".

---

## Hierarchia BASE → RARITY

**KLUCZOWA ZMIANA:** Generujemy **jeden bazowy model** dla każdej kombinacji Frakcja + Klasa, a następnie **6 wariantów rarity** (Common → Mythic) na jego podstawie.

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

### Krok 2 – Generowanie Rarity (Common → Mythic)

**Zasada:** Użyj BASE jako referencji (Image Guidance) z siłą **35-45%** – Leonardo zachowa twarz i sylwetkę, a zmieni tylko ekwipunek, aurę i ozdoby.

**Szablon dla Rarity:**

3D render of a fantasy {faction} {class}, {rarity} quality, {equipment_upgrade}, {aura_effect}, {ornaments}, full body shot from head to feet, feet visible, NOT a cropped portrait, camera angle: 3/4 turn, same character as reference, soft studio lighting, transparent background, game character portrait, isolated subject, centered, high detail --ar 1:1 --style raw --v 6

**Modyfikatory według rarity:**

| Rarity | Equipment Upgrade | Aura Effect | Ornaments |
|--------|-------------------|-------------|-----------|
| Common | simple steel armor, basic weapon | none | minimal |
| Uncommon | improved iron armor with gold trim | subtle glow | simple patterns |
| Rare | enchanted silver armor with blue gems | soft magical glow | runic engravings |
| Epic | ornate golden armor with rubies | moderate aura with sparks | elaborate filigree |
| Legendary | celestial armor of light and gold | strong aura with particles | winged helmet, divine symbols |
| Mythic | armor of living starlight, shifting constellations | intense animated glow, godly aura | reality-warping ornaments |

---

## Frakcje – Klasy i Motywy

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

## Uwagi

- **Image Guidance (Init Image) to klucz do spójności.** Zawsze używaj BASE jako referencji.
- **Nie generuj wszystkich rarity naraz.** Zacznij od Common dla wszystkich frakcji (Faza 1), potem dodawaj kolejne rarity (Faza 2 i 3).
- **Jeśli używasz różnych narzędzi** (Leonardo, Midjourney, DALL-E), zawsze używaj tej samej referencji i tych samych parametrów stylu.
- **Warianty attack/hit:** Możesz wygenerować je osobno (dodając "mid-swing" lub "reeling from impact") lub ja mogę je stworzyć w post-processingu przez proste przekształcenia (szybsze na start).
