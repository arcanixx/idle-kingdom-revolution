"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/hooks/use-user";
import { useGameStore } from "@/stores/game-store";
import { Skeleton } from "@/components/skeleton";
import { UnitAvatar } from "@/components/UnitAvatar";
import { logger } from "@/lib/logger";
import { useToast } from "@/components/Toast";
import { Sword, Shield, HardHat, Gem, ArrowLeft, ArrowRight } from "lucide-react";

interface EquippableItem {
  id: string; name: string; type: string; rarity: string;
  stats: Record<string, number>; quantity: number; description?: string;
}

const SLOT_ICONS: Record<string, any> = {
  weapon: Sword, armor: Shield, helmet: HardHat, accessory: Gem,
};

const SLOT_LABELS: Record<string, string> = {
  weapon: "Weapon", armor: "Armor", helmet: "Helmet", accessory: "Accessory",
};

const RARITY_COLORS: Record<string, string> = {
  common: "text-gray-400", uncommon: "text-green-400", rare: "text-blue-400",
  epic: "text-purple-400", legendary: "text-orange-400", mythic: "text-red-400",
};

export default function EquipPage() {
  const { user } = useUser();
  const units = useGameStore((s) => s.units);
  const inventory = useGameStore((s) => s.inventory);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [localUnits, setLocalUnits] = useState<typeof units>([]);
  const [localInventory, setLocalInventory] = useState<EquippableItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      Promise.all([
        useGameStore.getState().fetchUnits(),
        useGameStore.getState().fetchInventory(),
      ]).catch((err) => logger.error("Failed to load data", "app/game/army/equip/page.tsx", "useEffect", err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  useEffect(() => {
    setLocalUnits(units);
    const items = inventory.map((i) => ({
      id: i.id, name: i.name, type: i.type, rarity: i.rarity,
      stats: i.stats ?? {}, quantity: i.quantity,
    }));
    setLocalInventory(items);
  }, [units, inventory]);

  const selectedUnit = localUnits.find((u) => u.id === selectedUnitId);

  const getEquippedItem = (slot: string): EquippableItem | undefined => {
    if (!selectedUnit) return undefined;
    const itemId = selectedUnit.equipment[slot as keyof typeof selectedUnit.equipment];
    if (!itemId) return undefined;
    return localInventory.find((i) => i.id === itemId);
  };

  const getSlotItems = (slot: string): EquippableItem[] => {
    return localInventory.filter((i) => i.type === slot && i.quantity > 0);
  };

  const handleEquip = async (unitId: string, itemId: string, slot: string) => {
    try {
      const r = await fetch("/api/player/equip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unitId, itemId, slot }),
      });
      if (!r.ok) throw new Error("Equip failed");
      await useGameStore.getState().fetchUnits();
      await useGameStore.getState().fetchInventory();
      toast("Item equipped", "success");
    } catch (err) {
      logger.error("Equip failed", "app/game/army/equip/page.tsx", "handleEquip", err);
      toast("Failed to equip", "error");
    }
  };

  const handleUnequip = async (unitId: string, slot: string) => {
    try {
      const r = await fetch("/api/player/unequip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unitId, slot }),
      });
      if (!r.ok) throw new Error("Unequip failed");
      await useGameStore.getState().fetchUnits();
      await useGameStore.getState().fetchInventory();
      toast("Item unequipped", "success");
    } catch (err) {
      logger.error("Unequip failed", "app/game/army/equip/page.tsx", "handleUnequip", err);
      toast("Failed to unequip", "error");
    }
  };

  if (loading) {
    return <div className="space-y-4 p-4">{[1,2,3].map((i) => <Skeleton key={i} className="h-20" />)}</div>;
  }

  return (
    <div className="space-y-6">
      <nav className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
        <a href="/dashboard" className="hover:text-foreground">Home</a>
        <ArrowRight className="w-3 h-3" />
        <a href="/game/army" className="hover:text-foreground">Army</a>
        <ArrowRight className="w-3 h-3" />
        <span className="text-foreground">Equipment</span>
      </nav>
      <h1 className="text-2xl font-bold">Equipment</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 rounded-xl border bg-card p-4">
          <h2 className="font-semibold mb-3">Units</h2>
          {localUnits.length === 0 ? (
            <p className="text-sm text-muted-foreground">No units available.</p>
          ) : (
            <div className="space-y-2">
              {localUnits.filter((u) => u.isActive).map((u) => (
                <button
                  key={u.id}
                  onClick={() => setSelectedUnitId(u.id)}
                  className={"w-full p-3 rounded-lg border text-left flex items-center gap-3 transition-colors " + (selectedUnitId === u.id ? "border-primary bg-primary/5" : "hover:bg-muted")}
                >
                  <UnitAvatar faction={u.faction} unitClass={u.class} name={u.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.class} Lv.{u.level}</p>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          {!selectedUnit ? (
            <div className="rounded-xl border bg-card p-12 text-center">
              <p className="text-muted-foreground">Select a unit to manage equipment</p>
            </div>
          ) : (
            <>
              <div className="rounded-xl border bg-card p-4">
                <div className="flex items-center gap-3 mb-4">
                  <UnitAvatar faction={selectedUnit.faction} unitClass={selectedUnit.class} name={selectedUnit.name} size="md" />
                  <div>
                    <h2 className="text-lg font-bold">{selectedUnit.name}</h2>
                    <p className="text-sm text-muted-foreground">{selectedUnit.class} | Lv.{selectedUnit.level} | Power {selectedUnit.power_rating}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(SLOT_LABELS).map(([slot, label]) => {
                    const Icon = SLOT_ICONS[slot];
                    const equipped = getEquippedItem(slot);
                    return (
                      <div key={slot} className="rounded-lg border bg-muted/30 p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs font-medium text-muted-foreground">{label}</span>
                        </div>
                        {equipped ? (
                          <div className="space-y-1">
                            <p className="text-sm font-medium truncate">{equipped.name}</p>
                            <p className={"text-xs " + (RARITY_COLORS[equipped.rarity] || "text-muted-foreground")}>
                              {equipped.rarity}
                            </p>
                            {Object.entries(equipped.stats).map(([stat, val]) => (
                              <p key={stat} className="text-xs text-muted-foreground">
                                +{val} {stat}
                              </p>
                            ))}
                            <button
                              onClick={() => handleUnequip(selectedUnit.id, slot)}
                              className="text-xs text-red-400 hover:text-red-300 mt-1"
                            >
                              Unequip
                            </button>
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground">Empty</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-xl border bg-card p-4">
                <h2 className="font-semibold mb-3">Available Items</h2>
                {localInventory.filter((i) =>
                  Object.keys(SLOT_LABELS).includes(i.type) && i.quantity > 0
                ).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No equippable items in inventory.</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {localInventory
                      .filter((i) => Object.keys(SLOT_LABELS).includes(i.type) && i.quantity > 0)
                      .map((item) => {
                        const Icon = SLOT_ICONS[item.type] || Gem;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleEquip(selectedUnit.id, item.id, item.type)}
                            className="p-3 rounded-lg border text-left hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className="w-4 h-4 text-muted-foreground" />
                              <span className="text-[10px] text-muted-foreground uppercase">{item.type}</span>
                            </div>
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            <p className={"text-xs " + (RARITY_COLORS[item.rarity] || "text-muted-foreground")}>
                              {item.rarity}
                            </p>
                            {Object.entries(item.stats).map(([stat, val]) => (
                              <p key={stat} className="text-xs text-muted-foreground">
                                +{val} {stat}
                              </p>
                            ))}
                          </button>
                        );
                      })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

