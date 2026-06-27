"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/use-user";
import { Skeleton } from "@/components/skeleton";
import { logger } from "@/lib/logger";

type ItemType = "weapon"|"armor"|"accessory"|"consumable"|"material"|"cosmetic";
interface InventoryItem {
  id: string; name: string; type: ItemType; rarity: string; quantity: number;
}

const rarityColors: Record<string, string> = {
  common: "text-gray-500", uncommon: "text-green-500", rare: "text-blue-500",
  epic: "text-purple-500", legendary: "text-orange-500", mythic: "text-red-500",
};

export default function InventoryPage() {
  const { user } = useUser();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ItemType | "all">("all");

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch("/api/player/inventory")
      .then(r => r.json())
      .then(d => setItems(Array.isArray(d) ? d : d.inventory || []))
      .catch((err) => logger.warn("Failed to load inventory", "app/game/inventory/page.tsx", "useEffect", err))
      .finally(() => setLoading(false));
  }, [user]);

  const types: (ItemType | "all")[] = ["all", "weapon", "armor", "accessory", "consumable", "material", "cosmetic"];
  const filtered = filter === "all" ? items : items.filter(i => i.type === filter);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Inventory</h1>
      <div className="flex gap-2 flex-wrap">
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)} className={"px-3 py-1 rounded-lg text-sm border "+(filter===t?"bg-primary text-primary-foreground":"hover:bg-muted")}>
            {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({length: 8}).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No items found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map(item => (
            <div key={item.id} className="rounded-xl border bg-card p-4 space-y-1">
              <div className="text-2xl">{item.type === "weapon" ? "\u2694" : item.type === "armor" ? "\uD83D\uDEE1" : item.type === "accessory" ? "\uD83D\uDC8D" : item.type === "consumable" ? "\uD83E\uDDEA" : item.type === "material" ? "\uD83E\uDDF1" : "\uD83C\uDF80"}</div>
              <p className="font-medium text-sm truncate">{item.name}</p>
              <p className={"text-xs " + (rarityColors[item.rarity] || "text-muted-foreground")}>{item.rarity}</p>
              <p className="text-xs text-muted-foreground">x{item.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
