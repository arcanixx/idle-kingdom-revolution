"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/use-user";

export default function TowerDefensePage() {
  const { user } = useUser();
  const [td, setTd] = useState<any>(null);

  useEffect(() => {
    fetch("/api/td/status").then(r=>r.json()).then(setTd).catch(()=>{});
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">🛡 Tower Defense</h1>
      {td ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-lg border p-4 text-center">
            <p className="text-sm text-muted-foreground">Fortress</p>
            <p className="text-2xl font-bold">Lv.{td.fortressLevel}</p>
          </div>
          <div className="rounded-lg border p-4 text-center">
            <p className="text-sm text-muted-foreground">Highest Wave</p>
            <p className="text-2xl font-bold">{td.highestWave}</p>
          </div>
          <div className="rounded-lg border p-4 text-center">
            <p className="text-sm text-muted-foreground">Current Wave</p>
            <p className="text-2xl font-bold">{td.currentWave}</p>
          </div>
          <div className="rounded-lg border p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Kills</p>
            <p className="text-2xl font-bold">{td.totalKills}</p>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground">Loading tower defense data...</p>
      )}
      <div className="rounded-lg border p-6 text-center">
        <p className="text-muted-foreground mb-4">Tower Defense system coming soon. Place towers to defend against waves of enemies.</p>
        <button disabled className="px-6 py-2 bg-primary/50 text-primary-foreground rounded-lg font-medium cursor-not-allowed">
          Start Wave (Coming Soon)
        </button>
      </div>
    </div>
  );
}