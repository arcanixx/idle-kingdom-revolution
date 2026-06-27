# 06 - Emotion Portraits



> Portrety do scen fabularnych, tutoriali, dialogów.

> Rozmiar: 512x512 WebP (z alpha channel)

> Styl: 3D render fantasy character portrait, half-body (od pasa w górę, BEZ NÓG), zbliżenie na twarz i górną częć ciała.

>

> **Rozróżnienie od `01_UNIT_PORTRAITS.md`:** Ten plik dotyczy WYŁĄCZNIE portretów dialogowych/fabularnych (sceny story, tutoriale, dialogi) i ZAWSZE jest half-body (bez nóg). Jednostki na mapie/w statystykach (`01_UNIT_PORTRAITS.md`) są ZAWSZE full-body (z nogami). Nie myl tych dwóch typów assetu przy generowaniu - to dwa osobne foldery (public/assets/units/ vs public/assets/portraits/).



---



## Zasady stylu



- **Kadr:** Half-body (od pasa w górę), twarz zajmuje 40-50% kadru.

- **Tło:** Przezroczyste (alpha channel).

- **Oświetlenie:** Soft studio lighting, z naciskiem na wyraz twarzy.

- **Detale:** Widoczny detal zbroi/ubioru, motyw frakcji.

- **Spójność:** Użyj bazowego modelu jednostki jako referencji (Image Guidance).



---



## Lista emocji – podział na priorytety

| Priorytet | Emocje | Opis | Kiedy generować |
|-----------|--------|------|-----------------|
| **Core** (P0) | Neutral, Happy, Angry, Sad, Surprised, Scared, Serious | Podstawowe emocje, zawsze potrzebne | **Generuj od razu** dla wszystkich frakcji+klas |
| **Extended** (P1) | Laughing, Suspicious, Shocked, Confused, Tired, Scheming, Heroic, Menacing, Determined, Victorious, Defeated, Wounded, Exhausted, Pain | Dodatkowe emocje, wzbogacają narrację | **Generuj na życzenie** – trzymaj w checklist jako "do zrobienia" |
| **Special** (P2) | Mind Controlled, Sick, Poisoned, Frozen, Stoned, Burned, Charmed, Cursed, Blessed, Berserk | Stany fabularne/statusowe | **Generuj TYLKO gdy scenariusz tego wymaga** (np. konkretna scena w fabule) |

**Zasada fallback:** Jeśli brak Extended lub Special → pokaż odpowiednik z Core (np. brak `frozen` → pokaż `scared` lub `neutral`).

---

## Generowanie
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



## Fallback Logic

W grze:
- Jeśli brak `happy` (Extended) → pokaż `neutral` (Core).
- Jeśli brak `frozen` (Special) → pokaż `scared` lub `neutral` (Core).
- Zawsze masz Core Emotions dla każdej klasy/frakcji. Reszta to "bonus".

Implementacja w kodzie:

```tsx
function getEmotionAsset(faction: string, cls: string, emotion: string): string {
  const path = `/assets/portraits/$ {faction}/$ {faction}_$ {cls}_$ {emotion}.webp`;
  if (assetExists(path)) return path;
  const coreFallback: Record<string, string> = {
    laughing: "neutral",
    suspicious: "neutral",
    shocked: "surprised",
    confused: "neutral",
    tired: "neutral",
    scheming: "neutral",
    heroic: "happy",
    menacing: "angry",
    determined: "serious",
    victorious: "happy",
    defeated: "sad",
    wounded: "pain",
    exhausted: "tired",
    "mind controlled": "scared",
    sick: "neutral",
    poisoned: "sad",
    frozen: "scared",
    stoned: "neutral",
    burned: "pain",
    charmed: "happy",
    cursed: "angry",
    blessed: "happy",
    berserk: "angry",
  };
  return `/assets/portraits/$ {faction}/$ {faction}_$ {cls}_$ {coreFallback[emotion] || "neutral"}.webp`;
}
```

---

## Uwagi

- **Image Guidance (Init Image) to klucz do spójnośćci.** Użyj bazowego modelu jednostki jako referencji.

- **Generuj partiami:** Najpierw General dla Human (najważniejsza frakcja), potem General dla pozostałych. Special stany generuj dopiero na życzenie.

- **Narzędzie:** ChatGPT/DALL-E (szybkie iteracje) lub Leonardo.ai (pełna spójność).

- **Zastosowanie w grze:** Tutoriale, sceny fabularne, eventy, dialogi, powiadomienia.

- **Stan wyjątkowy:** Berserk jest Special, ale ma sens głownie dla Orc i NPC -- nie generuj dla wszystkich frakcji.
