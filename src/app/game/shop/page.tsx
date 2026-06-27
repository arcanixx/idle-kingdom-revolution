"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/use-user";
import { Skeleton } from "@/components/skeleton";
import { logger } from "@/lib/logger";

interface ShopItem {
  id: string; name: string; item_id: string; price_gold: number; price_gems: number;
  stock: number; currency: string;
}

export default function ShopPage() {
  const { user } = useUser();
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    fetch("/api/game/shops")
      .then(r => r.json())
      .then(d => setItems(Array.isArray(d.data) ? d.data : []))
      .catch((err) => logger.warn("Failed to load shop", "app/game/shop/page.tsx", "useEffect", err))
      .finally(() => setLoading(false));
  }, [user]);

  async function buy(item: ShopItem) {
    setBuying(item.id);
    try {
      const r = await fetch("/api/shop/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: item.item_id, quantity: 1 }),
      });
      if (r.ok) {
        setItems(prev => prev.map(i => i.id === item.id ? { ...i, stock: i.stock - 1 } : i));
      }
    } catch (err) {
      logger.error("Buy failed", "app/game/shop/page.tsx", "buy", err);
    }
    setBuying(null);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Shop</h1>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({length: 8}).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
        </div>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">Shop is empty. Check back later!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.id} className="rounded-xl border bg-card p-4 space-y-2 flex flex-col">
              <p className="font-medium truncate">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                {item.price_gold > 0 ? item.price_gold + "g" : ""}
                {item.price_gold > 0 && item.price_gems > 0 ? " + " : ""}
                {item.price_gems > 0 ? item.price_gems + "\uD83D\uDC8E" : ""}
              </p>
              <p className="text-xs text-muted-foreground">Stock: {item.stock}</p>
              <button onClick={() => buy(item)} disabled={buying === item.id || item.stock <= 0} className="mt-auto rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-sm font-medium hover:opacity-90 disabled:opacity-50">
                {buying === item.id ? "Buying..." : item.stock <= 0 ? "Sold Out" : "Buy"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
