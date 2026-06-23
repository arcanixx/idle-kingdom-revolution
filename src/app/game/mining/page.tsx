"use client";
import { useState } from "react";

export default function MiningPage() {
  const [depth, setDepth] = useState(1);
  const [expedition, setExpedition] = useState<string>("idle");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">\u26CF Deep Mine</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm text-muted-foreground">Depth Level</p>
          <p className="text-3xl font-bold">{depth}</p>
          <button onClick={() => depth < 10 && setDepth(depth + 1)} className="mt-2 px-3 py-1 rounded border text-sm hover:bg-muted">
            Dig Deeper
          </button>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm text-muted-foreground">Iron</p>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm text-muted-foreground">Crystals</p>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>

      <div className="rounded-lg border p-6 text-center">
        {expedition === "idle" && (
          <div>
            <p className="mb-4 text-muted-foreground">Send a unit on a mining expedition</p>
            <button onClick={() => setExpedition("active")} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90">
              Start Expedition (30m)
            </button>
            <p className="text-xs text-muted-foreground mt-2">Passes remaining: 3/3 today</p>
          </div>
        )}
        {expedition === "active" && (
          <div>
            <p className="text-lg font-semibold">Expedition in progress...</p>
            <p className="text-sm text-muted-foreground mt-2">Your unit is mining at depth {depth}. Come back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}
