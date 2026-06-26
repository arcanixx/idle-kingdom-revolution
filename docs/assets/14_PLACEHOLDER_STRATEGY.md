# 14 – Placeholder Strategy

> Jak obsługujemy brakujące assety w trakcie developmentu.

---

## Zasada

**Nie używamy customowych SVG jako placeholderów.** To podwójna praca – potem i tak zastępujesz grafiką.

### Poprawne podejście:

1. **Dev/Test:** Kolorowe bloki z nazwą assetu (np. `[HUMAN_WARRIOR_COMMON]`).
2. **UI:** Ikony z biblioteki (Lucide/Heroicons) – nie generujemy ich jako assetów.
3. **Produkcja:** WebP z alpha dla spriteów (jednostki, bossowie, przedmioty, tła). SVG tylko dla ikon UI (wektorowe).

---

## Implementacja w kodzie

### AssetResolver – komponent mapujący `assetKey` → URL

```tsx
function AssetResolver({ assetKey, type }: { assetKey: string; type: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setSrc(`/placeholders/${type}/${assetKey}.svg`);
      return;
    }
    fetch(`/assets/${type}/${assetKey}.webp`)
      .then((res) => (res.ok ? setSrc(`/assets/${type}/${assetKey}.webp`) : setError(true)))
      .catch(() => setError(true));
  }, [assetKey, type]);

  if (error) return <Placeholder type={type} label={assetKey} />;
  return <img src={src} alt={assetKey} />;
}
```

### Placeholder – kolorowy blok z nazwą

```tsx
function Placeholder({ type, label }: { type: string; label: string }) {
  const colors: Record<string, string> = {
    unit: "bg-blue-500",
    item: "bg-green-500",
    boss: "bg-red-500",
    portrait: "bg-purple-500",
  };
  return (
    <div className={`$ {colors[type] || "bg-gray-500"} w-full h-full flex items-center justify-center text-white text-xs`}>
      {label}
    </div>
  );
}
```
