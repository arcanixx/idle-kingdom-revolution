# 06 - Emotion Portraits

> Portrety do scen fabularnych, tutoriali, dialogów.
> Rozmiar: 512x512 WebP (z alpha channel)
> Styl: 3D render fantasy character portrait, half-body (od pasa w górę, BEZ NÓG), zbliżenie na twarz i górną częć ciała.
>
> **Rozróżnienie od 02_UNIT_PORTRAITS.md:** Ten plik dotyczy WYŁCZNIE portretów dialogowych/fabularnych (sceny story, tutoriale, dialogi) i ZAWSZE jest half-body (bez nóg). Jednostki na mapie/w statystykach (02_UNIT_PORTRAITS.md) są ZAWSZE full-body (z nogami). Nie myl tych dwóch typów assetu przy generowaniu - to dwa osobne foldery (public/assets/units/ vs public/assets/portraits/).

---

## Zasady stylu

- **Kadr:** Half-body (od pasa w górę), twarz zajmuje 40-50% kadru.
- **Tło:** Przezroczyste (alpha channel).
- **Oświetlenie:** Soft studio lighting, z naciskiem na wyraz twarzy.
- **Detale:** Widoczny detal zbroi/ubioru, motyw frakcji.
- **Spójność:** Użyj bazowego modelu jednostki jako referencji (Image Guidance).

---

## Lista emocji

Typy:
- **General** -- generowane dla KAŻDEJ kombinacji frakcja+klasa (szablonowo)
- **Special** -- generowane TYLKO na potrzeby fabuły / eventów (na zgłoszenie)

| # | Emotion | Opis | Prompt modifier | Type |
|---|---------|------|-----------------|------|
| 1 | Neutral | Spokojny, neutralny wyraz | calm neutral expression, standing straight | General |
| 2 | Happy | Uśmiechnięty, ciepły | warm smile, relaxed, slight head tilt | General |
| 3 | Angry | Zły, groźny | furious glare, intense, leaning forward | General |
| 4 | Sad | Smutny, przygnębiony | sad expression, looking down, solemn | General |
| 5 | Surprised | Zaskoczony | wide eyes, mouth slightly open, stepping back | General |
| 6 | Scared | Przestraszony | fearful expression, defensive pose | General |
| 7 | Serious | Poważny, zdeterminowany | serious focused expression, determined | General |
| 8 | Laughing | śmiejący się | joyful laugh, head back, open mouth | General |
| 9 | Suspicious | Podejrzliwy | suspicious squint, tilted head, arms crossed | General |
| 10 | Shocked | W szoku | extreme shock, recoiling, hands to face | General |
| 11 | Confused | Zdezorientowany | confused, furrowed brow, questioning gesture | General |
| 12 | Tired | Zmęczony | exhausted, heavy eyelids, slumped posture | General |
| 13 | Scheming | Knujący, podstępny | sly smirk, half-closed eyes, subtle gesture | General |
| 14 | Heroic | Bohaterski, dumny | heroic pose, proud, chest out, weapon raised | General |
| 15 | Menacing | Groźny, złowrogi | menacing, looming posture, glowing eyes | General |
| 16 | Determined | Zdeterminowany, niezłomny | determined expression, set jaw, focused eyes, ready stance | General |
| 17 | Victorious | Triumfujący, po zwycięstwie | victorious smile, raised fist, proud posture, glowing confidence | General |
| 18 | Defeated | Pokonany, po porażce | defeated posture, head down, slumped shoulders, empty gaze | General |
| 19 | Wounded | Ranny, osłabiony | wincing in pain, clutching wound, strained expression, blood visible | General |
| 20 | Exhausted | Wyczerpany, na skraju sił | barely standing, hollow eyes, limp posture, drenched in sweat | General |
| 21 | Pain | W bólu, trafiony | sharp pain reaction, grimacing, recoiling from impact | General |
| -- | -- | -- | -- | -- |
| 22 | Mind Controlled | Zmanipulowany, nie sobą | blank expression, glowing eyes, unnatural stiff posture, magical aura | Special |
| 23 | Sick | Chory, słaby | pale complexion, sweating, pained expression, feverish look | Special |
| 24 | Poisoned | Zatruty | green/purple tinted skin, sickly sweat, grimacing in discomfort | Special |
| 25 | Frozen | Zamrożony | ice crystals on skin/armor, blue tint, shivering, frozen breath | Special |
| 26 | Stoned | Zamieniony w kamień | grey stone texture, cracked skin, petrified rigid pose | Special |
| 27 | Burned | Spalony | soot and ash on face/armor, red burned skin, pained grimace | Special |
| 28 | Charmed | Oczarowany | dreamy expression, rosy cheeks, heart motif, dazed smile | Special |
| 29 | Cursed | Przeklęty | dark purple aura, shadowy veins, sinister glow in eyes | Special |
| 30 | Blessed | Błogosławiony | golden holy glow, serene expression, warm light from above | Special |
| 31 | Berserk | Szał bojowy | wild eyes, clenched teeth, veins bulging, animalistic rage | Special |

---

## Generowanie -- podział na typy

| Type | Kiedy generować | Dla kogo | Priorytet |
|------|-----------------|----------|-----------|
| General | Zawsze, jako standardowy zestaw | Wszystkie frakcje + klasy | P1 -- generuj w pierwszej kolejności |
| Special | Tylko na zgłoszenie (story, event, quest) | Konkretna frakcja + klasa, tylko potrzebujące | P3 -- generuj na życzenie |

**Zasada:** Nie generuj Special stanów dla wszystkich frakcji/klas. Generuj je tylko wtedy, gdy dana scena fabularna lub event wymaga konkretnego stanu u konkretnej postaci.

---

## Prompty

### Wzorzec

Fantasy 3D render portrait of a {emotion} {faction} {class}, {rarity} quality, {emotion_description}, half-body shot, {pose_hint}, soft studio lighting, warm key light, detailed fantasy armor with faction motif ({faction_motif}), transparent background, game portrait, high detail, 4K --ar 1:1 --style raw --v 6

### Przykłady

**Human Warrior -- Happy:**

Fantasy 3D render portrait of a happy human warrior, common quality, warm smile and relaxed expression, half-body shot, slight head tilt with open hand gesture, soft studio lighting, warm key light, detailed steel armor with golden trim and lion motif on chest, transparent background, game portrait, high detail, 4K --ar 1:1 --style raw --v 6

**Elf Ranger -- Suspicious:**

Fantasy 3D render portrait of a suspicious elf ranger, rare quality, narrowed eyes and skeptical expression, half-body shot, tilted head with arms crossed, soft studio lighting, warm key light, detailed green leather armor with leaf motif and silver trim, transparent background, game portrait, high detail, 4K --ar 1:1 --style raw --v 6

**Demon Mage -- Menacing:**

Fantasy 3D render portrait of a menacing demon mage, epic quality, threatening glare with glowing red eyes, half-body shot, looming posture with hands crackling with fire, soft studio lighting, warm key light, detailed dark robes with horn-shaped crystal ornaments, transparent background, game portrait, high detail, 4K --ar 1:1 --style raw --v 6

---

## Struktura plików

public/assets/portraits/
    human/
        human_warrior_happy.webp
        human_warrior_angry.webp
        human_warrior_sad.webp
        ... (General emotions)
        human_warrior_frozen.webp  (Special -- tylko gdy potrzebne)
        ...
    elf/
        elf_ranger_neutral.webp
        ... (General emotions)
    ...

**Nazewnictwo:** {faction}_{class}_{emotion}.webp

---

## Uwagi

- **Image Guidance (Init Image) to klucz do spójnośćci.** Użyj bazowego modelu jednostki jako referencji.
- **Generuj partiami:** Najpierw General dla Human (najważniejsza frakcja), potem General dla pozostałych. Special stany generuj dopiero na życzenie.
- **Narzędzie:** ChatGPT/DALL-E (szybkie iteracje) lub Leonardo.ai (pełna spójność).
- **Zastosowanie w grze:** Tutoriale, sceny fabularne, eventy, dialogi, powiadomienia.
- **Stan wyjątkowy:** Berserk jest Special, ale ma sens głownie dla Orc i NPC -- nie generuj dla wszystkich frakcji.