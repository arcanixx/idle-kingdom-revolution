"use client";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@/hooks/use-user";
import type { BattleField } from "@/types/game";
import { Skeleton } from "@/components/skeleton";
import { UnitAvatar } from "@/components/UnitAvatar";
import { logger } from "@/lib/logger";
import { useToast } from "@/components/Toast";

interface BattleResult {
  status: "active"|"victory"|"defeat";
  currentWave: number; totalWaves: number; turn: number;
  log: string[]; xpGained: number; goldGained: number;
  leveledUp?: boolean; newLevel?: number;
  progress?: { xp: number; needed: number; pct: number };
  unitsSurvived: string[];
}

export default function BattlePage() {
  const { user } = useUser();
  const [fields, setFields] = useState<BattleField[]>([]);
  const [fieldsLoading, setFieldsLoading] = useState(true);
  const [fieldId, setFieldId] = useState<string | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/game/fields")
      .then(r => r.json())
      .then(d => { const arr = d.data || d; if (Array.isArray(arr)) { setFields(arr); if (arr.length > 0) setFieldId(arr[0].id); } else { setFields([]); } })
      .catch((err) => logger.warn("Failed to fetch fields", "app/game/battle/page.tsx", "useEffect", err))
      .finally(() => setFieldsLoading(false));
  }, []);

  const [result, setResult] = useState<BattleResult | null>(null);
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();

  async function doBattle() {
    setBusy(true); setResult(null);
    try {
      const r = await fetch("/api/battle/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fieldId }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Battle failed");
      setResult(d);
      toast(d.status === "victory" ? "Victory! " + d.goldGained + "g gained" : "Defeat - " + d.goldGained + "g gained", d.status === "victory" ? "success" : "error");
    } catch (e: any) {
      logger.error("Battle failed", "app/game/battle/page.tsx", "doBattle", e, { fieldId });
      setResult({ status: "defeat", currentWave: 0, totalWaves: 0, turn: 0, log: [e.message || "Error"], xpGained: 0, goldGained: 0, unitsSurvived: [] });
    }
    setBusy(false);
  }

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result?.log]);

  const selectedField = fields.find(f => f.id === fieldId);

  return (
    <div className="space-y-6">
      <nav className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
        <a href="/dashboard" className="hover:text-foreground">Home</a>
        <span>/</span>
        <span className="text-foreground">Battle</span>
      </nav>
      <h1 className="text-2xl font-bold">Battle</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Field</p>
          {fieldsLoading ? (
            <Skeleton className="h-10 w-full mt-2" />
          ) : (
            <select className="w-full mt-2 rounded-md border p-2 bg-background" value={fieldId ?? ""} onChange={e => setFieldId(e.target.value)}>
              {fields.map(f => <option key={f.id} value={f.id}>{f.name} (Pow. {f.recommended_power})</option>)}
            </select>
          )}
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Waves</p>
          <p className="text-2xl font-bold mt-1">{selectedField?.wave_count || "?"}</p>
        </div>
        <div className="rounded-lg border bg-card p-4 flex items-end">
          <button onClick={doBattle} disabled={busy || fieldsLoading || fieldId === null} className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium text-lg hover:opacity-90 disabled:opacity-50">
            {busy ? "Fighting..." : "\u2694 Start Battle"}
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className={"rounded-xl border-2 p-6 text-center " + (result.status === "victory" ? "border-green-500 bg-green-50/50 dark:bg-green-950/20" : "border-red-500 bg-red-50/50 dark:bg-red-950/20")}>
            <p className={"text-3xl font-bold " + (result.status === "victory" ? "text-green-600" : "text-red-600")}>
              {result.status === "victory" ? "\uD83C\uDFC6 VICTORY!" : "\uD83D\uDCA5 DEFEAT"}
            </p>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <span>Wave {result.currentWave}/{result.totalWaves}</span>
              <span>Turn {result.turn}</span>
              <span className="text-yellow-600 font-medium">+{result.goldGained}g</span>
              <span className="text-blue-600 font-medium">+{result.xpGained}XP</span>
            </div>
            {result.leveledUp && (
              <div className="mt-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-3">
                <p className="text-yellow-600 font-bold text-xl">Level Up! Now Level {result.newLevel}</p>
              </div>
            )}
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="font-semibold mb-2">Battle Log</h3>
            <div className="font-mono text-sm space-y-1 max-h-64 overflow-y-auto bg-muted/50 rounded-lg p-3">
              {result.log.map((l, i) => (
                <p key={i} className={"text-sm " + (l.includes("VICTORY") ? "text-green-600 font-bold" : l.includes("DEFEAT") ? "text-red-600 font-bold" : l.includes("Wave") ? "text-blue-600 font-semibold" : "text-muted-foreground")}>
                  {i > 0 ? "\u2192 " : ""}{l}
                </p>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="font-semibold mb-2">Surviving Units</h3>
            {result.unitsSurvived.length === 0 ? (
              <p className="text-muted-foreground text-sm">None</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {result.unitsSurvived.map(u => (
                  <span key={u} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">{u}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
