"use client";
import { useState } from "react";

const TOWERS = ["Archer","Cannon","Ice","Magic","Poison"];

export default function TDPage() {
  const [wave, setWave] = useState(0);
  const [gold, setGold] = useState(100);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">\uD83C\uDFF0 Fortress Siege</h1>

      <div className="flex gap-4">
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm text-muted-foreground">Wave</p>
          <p className="text-2xl font-bold">{wave}/{10}</p>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm text-muted-foreground">Gold</p>
          <p className="text-2xl font-bold">{gold}</p>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm text-muted-foreground">Passes</p>
          <p className="text-2xl font-bold">3/3</p>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="font-semibold mb-3">Tower Shop</h2>
        <div className="flex gap-2">
          {TOWERS.map((t) => (
            <button
              key={t}
              className="px-4 py-2 rounded-lg border text-sm hover:bg-muted transition-colors"
              onClick={() => setGold(g => Math.max(0, g - 25))}
            >
              {t} (25g)
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="font-semibold mb-2">Battlefield</h2>
        <div className="grid grid-cols-6 gap-1">
          {Array.from({length: 30}).map((_, i) => (
            <div key={i} className="aspect-square rounded border border-dashed bg-muted/20 flex items-center justify-center text-xs text-muted-foreground">
              {i === 2 ? "\uD83C\uDFF0" : i === 15 ? "\uD83C\uDFF0" : ""}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-3">
          <p className="text-xs text-muted-foreground">Path \u2192 6x5 grid</p>
          <button
            onClick={() => wave < 10 && setWave(w => w + 1)}
            className="px-4 py-1 bg-primary text-primary-foreground rounded text-sm font-medium hover:opacity-90"
          >
            Start Wave
          </button>
        </div>
      </div>
    </div>
  );
}
