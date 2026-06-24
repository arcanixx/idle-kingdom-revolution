"use client";
import { useState } from "react";
import { useUser } from "@/hooks/use-user";

interface BattleResult {
  status: "active"|"victory"|"defeat";
  currentWave: number; totalWaves: number; turn: number;
  log: string[]; xpGained: number; goldGained: number;
  leveledUp?: boolean; newLevel?: number;
  progress?: { xp: number; needed: number; pct: number };
  unitsSurvived: string[];
}

const FIELDS = [
  { id: 1, name: "Plains of Beginning", level: 1 },
  { id: 2, name: "Enchanted Forest", level: 2 },
  { id: 3, name: "Mountain Pass", level: 3 },
  { id: 4, name: "Scorching Desert", level: 4 },
  { id: 5, name: "Ice Wasteland", level: 5 },
];

export default function BattlePage() {
  const { user } = useUser();
  const [fieldId, setFieldId] = useState(1);
  const [result, setResult] = useState<BattleResult | null>(null);
  const [busy, setBusy] = useState(false);

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
    } catch (e: any) {
      setResult({ status: "defeat", currentWave: 0, totalWaves: 0, turn: 0, log: [e.message || "Error"], xpGained: 0, goldGained: 0, unitsSurvived: [] });
    }
    setBusy(false);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Battle</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Field</p>
          <select className="w-full mt-2 rounded-md border p-2 bg-background" value={fieldId} onChange={e => setFieldId(Number(e.target.value))}>
            {FIELDS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Difficulty</p>
          <div className="flex gap-2 mt-2">
            {["Easy","Normal","Hard"].map((d,i) => <button key={i} className="px-3 py-1 rounded border text-sm hover:bg-muted">{d}</button>)}
          </div>
        </div>
        <div className="rounded-lg border p-4 flex items-end">
          <button onClick={doBattle} disabled={busy} className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50">
            {busy ? "Fighting..." : "Start Battle"}
          </button>
        </div>
      </div>
      <div className="rounded-lg border p-4">
        <h2 className="font-semibold mb-2">Battle Log</h2>
        {result ? (
          <div>
            <div className="flex gap-4 mb-2 text-sm">
              <span className={result.status === "victory" ? "text-green-600 font-bold" : "text-red-600 font-bold"}>{result.status.toUpperCase()}</span>
              <span>Wave {result.currentWave}/{result.totalWaves}</span>
              <span className="text-green-600">+{result.goldGained}g</span>
              <span className="text-blue-600">+{result.xpGained}XP</span>
            </div>
            {result.leveledUp && (
              <div className="mt-2 text-center bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-2">
                <p className="text-yellow-600 font-bold text-lg">Level Up! Now Level {result.newLevel}</p>
              </div>
            )}
            {result.progress && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>XP: {result.progress.xp} / {result.progress.needed}</span>
                  <span>{Math.round(result.progress.pct * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: (result.progress.pct * 100) + "%"}} />
                </div>
              </div>
            )}
            <div className="space-y-1 font-mono text-sm max-h-80 overflow-y-auto mt-3">
              {result.log.map((l, i) => <p key={i} className="text-muted-foreground">{'>'} {l}</p>)}
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">Select a field and start a battle.</p>
        )}
      </div>
    </div>
  );
}
