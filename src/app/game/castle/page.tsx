"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/use-user";

export default function CastlePage() {
  const { user } = useUser();
  const [castle, setCastle] = useState<any>(null);

  useEffect(() => {
    fetch("/api/castle/status").then(r=>r.json()).then(setCastle).catch(()=>{});
  }, []);

  const hpPct = castle ? Math.round((castle.hp / castle.maxHp) * 100) : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">🏰 Castle</h1>
      {castle ? (
        <>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground mb-1">Castle HP ({castle.hp}/{castle.maxHp})</p>
            <div className="w-full bg-muted rounded-full h-4">
              <div className="bg-green-600 h-4 rounded-full transition-all" style={{width: hpPct + "%"}} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border p-4 text-center">
              <p className="text-sm text-muted-foreground">Wall Level</p>
              <p className="text-2xl font-bold">{castle.wallLevel}</p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-sm text-muted-foreground">Siege Wave</p>
              <p className="text-2xl font-bold">{castle.siegeWave}/{castle.highestSiege}</p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-sm text-muted-foreground">Castle Level</p>
              <p className="text-2xl font-bold">{castle.castleLevel}</p>
            </div>
          </div>
          <div className="rounded-lg border p-6 text-center">
            <p className="text-muted-foreground mb-4">Defend your castle against siege waves. Each wave brings stronger enemies.</p>
            <div className="flex gap-2 justify-center">
              <button disabled className="px-4 py-2 bg-primary/50 text-primary-foreground rounded-lg text-sm cursor-not-allowed">Repair Wall</button>
              <button disabled className="px-4 py-2 border rounded-lg text-sm cursor-not-allowed opacity-50">Train Guards</button>
              <button disabled className="px-4 py-2 border rounded-lg text-sm cursor-not-allowed opacity-50">Oil Trap</button>
              <button disabled className="px-4 py-2 border rounded-lg text-sm cursor-not-allowed opacity-50">Arrow Slits</button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-muted-foreground">Loading castle data...</p>
      )}
    </div>
  );
}