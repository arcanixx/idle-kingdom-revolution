"use client";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/skeleton";
import { useGameStore } from "@/stores/game-store";
import { useUser } from "@/hooks/use-user";
import { UnitAvatar } from "@/components/UnitAvatar";
import { logger } from "@/lib/logger";
import { useToast } from "@/components/Toast";

interface ArmyUnit {
  id: string; unit_id: string; name: string; class: string;
  faction: string; rarity: string; level: number;
  hp: number; attack: number; defense: number; speed: number;
  power_rating: number;
  formation_row?: number | null; formation_col?: number | null;
}

type FormationCell = { unit_id: string; row: number; col: number } | null;
type FormationState = { front: FormationCell[]; back: FormationCell[] };
const ROWS = ["front","back"] as const;
const ROW_LABELS: Record<string, string> = { front: "Front Line", back: "Back Line" };

const CLASS_COLORS: Record<string, string> = {
  warrior: "border-red-400 bg-red-50",
  ranger: "border-green-400 bg-green-50",
  mage: "border-blue-400 bg-blue-50",
  tank: "border-yellow-400 bg-yellow-50",
  healer: "border-purple-400 bg-purple-50",
  assassin: "border-orange-400 bg-orange-50",
  support: "border-teal-400 bg-teal-50",
};
export default function ArmyPage() {
  const { user } = useUser();
  const storeUnits = useGameStore((s) => s.units) as unknown as ArmyUnit[];
const storeFormation = useGameStore((s) => s.formation);
const storeLoaded = useGameStore((s) => s.isLoaded);
const [units, setUnits] = useState<ArmyUnit[]>([]);
const [formation, setFormation] = useState<FormationState>({ front: [null, null, null, null], back: [null, null, null, null] });
const [selectedId, setSelectedId] = useState<string | null>(null);
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => { setUnits(storeUnits); setLoading(!storeLoaded); }, [storeUnits, storeLoaded]);

  useEffect(() => { if (storeFormation.front) { setFormation({ front: storeFormation.front.map((u,i) => u ? {unit_id: u.id, row: 0, col: i} : null), back: storeFormation.back.map((u,i) => u ? {unit_id: u.id, row: 1, col: i} : null) }); setLoading(false); } }, [storeFormation]);

  async function saveFormation() {
    setSaving(true);
    const f: { unit_id: string; row: number; col: number }[] = [];
    for (const rowKey of ROWS) {
      for (let col = 0; col < 4; col++) {
        const cell = formation[rowKey][col];
        if (cell) f.push({ unit_id: cell.unit_id, row: rowKey === "front" ? 0 : 1, col });
      }
    }
    try {
      const r = await fetch("/api/player/formation", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ formations: f }) });
      if (!r.ok) { logger.warn("Save formation returned error", "app/game/army/page.tsx", "saveFormation", { status: r.status }); toast("Failed to Save Formation", "error"); } else { toast("Formation saved!", "success"); try { await useGameStore.getState().fetchUnits(); await useGameStore.getState().fetchFormation(); } catch {} }
    } catch (err) {
      logger.error("Failed to Save Formation", "app/game/army/page.tsx", "saveFormation", err);
    }
    setSaving(false);
  }

  function place(uId: string) {
    for (let c = 0; c < 4; c++) { if (!formation.front[c]) { setFormation(p => ({...p, front: p.front.map((x,i) => i===c ? {unit_id: uId, row:0, col:c} : x) })); return; } }
    for (let c = 0; c < 4; c++) { if (!formation.back[c]) { setFormation(p => ({...p, back: p.back.map((x,i) => i===c ? {unit_id: uId, row:1, col:c} : x) })); return; } }
  }

  function remove(row: number, col: number) { setFormation(p => ({...p, ["front"]: p.front.map((x,i) => i===col && row===0 ? null : x), ["back"]: p.back.map((x,i) => i===col && row===1 ? null : x) })); }

  function isDeployed(uid: string) { for (const r of ROWS) for (const c of formation[r]) if (c?.unit_id === uid) return true; return false; }

  const totalPower = units.reduce((s, u) => s + u.power_rating, 0);

  if (loading) return <div className="p-8 space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-16" />)}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
                <nav className="text-sm text-muted-foreground mb-2 flex items-center gap-1"><a href="/dashboard" className="hover:text-foreground">Home</a><span>/</span><span className="text-foreground">Army</span></nav>
<h1 className="text-2xl font-bold">Army</h1>
          <p className="text-sm text-muted-foreground">Power: {totalPower.toLocaleString()} | Units: {units.length}</p>
        </div>
        <a href="/game/army/equip" className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-muted transition-colors">Equipment</a><button onClick={saveFormation} disabled={saving} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50">
          {saving ? "Saving..." : "Save Formation"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold mb-3">Formation Grid</h2>
          {ROWS.map((rowKey) => (
            <div key={rowKey} className="mb-3">
              <p className="text-xs text-muted-foreground mb-1">{ROW_LABELS[rowKey]}</p>
              <div className="grid grid-cols-4 gap-2">
                {formation[rowKey].map((cell, col) => (
                  <div key={col} onClick={() => cell ? remove(cell.row, col) : null} className={"aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-center p-1 cursor-pointer transition-colors "+ (cell ? (CLASS_COLORS[units.find(u => u.id === cell.unit_id)?.class || ""] || "border-gray-400 bg-card") : "border-dashed border-muted-foreground/30 hover:border-muted-foreground/60")}>
                    {cell ? (
                      <>
                        <UnitAvatar faction={units.find(u => u.id === cell.unit_id)?.faction} unitClass={units.find(u => u.id === cell.unit_id)?.class} name={units.find(u => u.id === cell.unit_id)?.name} size="sm" />
                        <span className="text-xs font-bold leading-tight">{units.find(u => u.id === cell.unit_id)?.name || cell.unit_id}</span>
                        <span className="text-[10px] text-muted-foreground">Lv.{units.find(u => u.id === cell.unit_id)?.level || 1}</span>
                      </>
                    ) : (
                      <span className="text-xs text-muted-foreground/40">Empty</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground mt-1">Click slot to remove unit. Click a unit below to place it.</p>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="font-semibold mb-3">Available Units</h2>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {units.length === 0 ? (
              <p className="text-muted-foreground text-sm">No units yet. Complete battles to recruit them.</p>
            ) : (
              units.map((u) => (
                <div key={u.id} onClick={() => { setSelectedId(u.id); if (!isDeployed(u.id)) place(u.id); }} className={"p-3 rounded-lg border cursor-pointer transition-colors "+ (isDeployed(u.id) ? "opacity-50 border-dashed" : (selectedId === u.id ? "border-primary bg-primary/5" : "hover:bg-muted"))}>
                  <div className="flex items-center gap-3">
                    <UnitAvatar faction={u.faction} unitClass={u.class} name={u.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{u.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{u.class} | {u.faction} | Lv.{u.level}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-mono">{u.power_rating}</p>
                      {isDeployed(u.id) && <span className="text-[10px] text-green-600">Deployed</span>}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

