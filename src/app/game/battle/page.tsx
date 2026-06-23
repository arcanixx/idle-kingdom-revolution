"use client";
import { useState } from "react";

export default function BattlePage() {
  const [field, setField] = useState(1);
  const [logs, setLogs] = useState<string[]>([]);

  const startBattle = () => {
    setLogs([
      "Battle started on field " + field + "...",
      "Wave 1: 3 enemies approaching",
      "Your formation holds the line",
      "Wave cleared! (+50 gold)",
      "Wave 2: 4 enemies + 1 elite",
      "Battle simulation running...",
    ]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">\u2694 Battle</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Select Field</p>
          <select
            className="w-full mt-2 rounded-md border p-2 bg-background"
            value={field}
            onChange={(e) => setField(Number(e.target.value))}
          >
            <option value={1}>Plains of Beginning (Lv.1)</option>
            <option value={2}>Enchanted Forest (Lv.2)</option>
            <option value={3}>Mountain Pass (Lv.3)</option>
            <option value={4}>Scorching Desert (Lv.4)</option>
            <option value={5}>Ice Wasteland (Lv.5)</option>
          </select>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Difficulty</p>
          <div className="flex gap-2 mt-2">
            {["Easy","Normal","Hard"].map((d) => (
              <button key={d} className="px-3 py-1 rounded border text-sm hover:bg-muted">{d}</button>
            ))}
          </div>
        </div>
        <div className="rounded-lg border p-4 flex items-end">
          <button onClick={startBattle} className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90">
            Start Battle
          </button>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="font-semibold mb-2">Battle Log</h2>
        <div className="space-y-1 font-mono text-sm">
          {logs.length === 0 ? (
            <p className="text-muted-foreground">Select a field and start a battle.</p>
          ) : (
            logs.map((l, i) => (
              <p key={i} className={l.includes("cleared") ? "text-green-600" : "text-foreground"}>
                &gt; {l}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
