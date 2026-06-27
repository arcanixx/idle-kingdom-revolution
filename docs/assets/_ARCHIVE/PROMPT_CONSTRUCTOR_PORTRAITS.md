# PROMPT_CONSTRUCTOR_PORTRAITS.md

> **UŻYCIE:** Generuj portrety do scen fabularnych, tutoriali i dialogów (emotion portraits).
> Pamiętaj o globalnych Złotych Zasadach z `PROMPT_CONSTRUCTOR.md`.

---

## ZASADY GENEROWANIA PORTETÓW

- **Kadr:** Half-body (od pasa w górę, BEZ NÓG).
- **Tło:** Przezroczyste (alpha channel) lub zielone do wycięcia.
- **Skupienie:** Wyraz twarzy, górna część zbroi/ubioru, motyw frakcji.
- **Spójność:** Użyj bazowego modelu jednostki jako referencji (Image Guidance), jeśli to możliwe.

---

## SZABLON PROMPTU DLA PORTETÓW EMOCJI
Fantasy 3D render portrait of a {emotion} {faction} {class}, {rarity} quality, {emotion_description}, half-body shot, {pose_hint}, soft studio lighting, warm key light, detailed fantasy armor with faction motif ({faction_motif}), flat solid chroma green background #00A651, game portrait, high detail, 4K --ar 1:1 --v 6

### Przykład – Human Warrior, Happy:
Fantasy 3D render portrait of a happy human warrior, common quality, warm smile and relaxed expression, half-body shot, slight head tilt with open hand gesture, soft studio lighting, warm key light, detailed steel armor with golden trim and lion motif on chest, flat solid chroma green background #00A651, game portrait, high detail, 4K --ar 1:1 --v 6

---

## LISTA EMOCJI (Podział na priorytety)

| Priorytet | Emocje (Core) | Emocje (Extended) | Emocje (Special) |
|-----------|---------------|-------------------|------------------|
| **Zawsze generuj** | Neutral, Happy, Angry, Sad, Surprised, Scared, Serious | Laughing, Suspicious, Shocked, Confused, Tired, Scheming, Heroic, Menacing, Determined, Victorious, Defeated, Wounded, Exhausted, Pain | Mind Controlled, Sick, Poisoned, Frozen, Stoned, Burned, Charmed, Cursed, Blessed, Berserk |

**Zasada fallback:** Jeśli brak Extended lub Special → pokaż odpowiednik z Core (np. brak `frozen` → pokaż `scared` lub `neutral`).

---

### Uwagi:
- Rozmiar docelowy: 512x512 WebP.
- Generuj tylko Core emotions na start (dla wszystkich frakcji). Extended i Special generuj na życzenie.
