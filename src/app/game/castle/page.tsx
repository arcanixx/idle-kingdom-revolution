"use client";
import { useState } from "react";

export default function CastlePage() {
  const [wallHp, setWallHp] = useState(100);
  const [wave, setWave] = useState(0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Castle Defender</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm text-muted-foreground">Wall HH</p>
          <div className="mt-2 h-4 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{width: wallHp + "%"}} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{wallHp}/100</p>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm text-muted-foreground">Wave</p>
          <p className="text-2xl font-bold">{wave}</p>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm text-muted-foreground">Passes</p>
          <p className="text-2xl font-bold">3/3</p>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="font-semibold mb-2">Castle Defenses</h2>
        <div className="flex gap-2 flex-wrap">
          {["Repair Wall (10g)","Train Guards (15g)","Oil Trap (20g)","Arrow Slits (30g)"].map((d) => (
            <button key={d} className="px-3 py-2 rounded-lg border text-sm hover:bg-muted transition-colors">
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border p-6 text-center">
        <p className="mb-4 text-muted-foreground">Defend your castle against incoming waves of enemies</p>
        <button
          onClick={() => {
            if (wave < 10) {
              setWave(w => w + 1);
              setWallHp(h => Math.max(0, h - Math.floor(Math.random() * 20)));
            }
          }}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90"
        >
          Defend Wave
        </button>
      </div>
    </div>
  );
}
