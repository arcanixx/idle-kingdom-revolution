"use client";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/skeleton";
import { useUser } from "@/hooks/use-user";import type { MiningStatus } from "@/types/game";
import { logger } from "@/lib/logger";

export default function MiningPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<MiningStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => { fetchStatus(); }, []);
  useEffect(() => {
    if (!status?.expeditionActive) return;
    const t = setInterval(() => setTimer(s => { if (s <= 1) { fetchStatus(); return 0; } return s - 1; }), 1000);
    return () => clearInterval(t);
  }, [status?.expeditionActive]);

  async function fetchStatus() {
    try {
      const r = await fetch("/api/mining/status");
      const d = await r.json();
      setStatus(d);
      if (d?.remainingSeconds) setTimer(d.remainingSeconds);
    } catch (err) {
      logger.error("Failed to fetch mining status", "app/game/mining/page.tsx", "fetchStatus", err);
    }
    setLoading(false);
  }

  async function startExpedition() {
    setBusy(true);
    try {
      await fetch("/api/mining/expedition", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      await fetchStatus();
    } catch (err) {
      logger.error("Failed to start mining expedition", "app/game/mining/page.tsx", "startExpedition", err);
    }
    setBusy(false);
  }

  const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = s % 60; return m + "m " + (sec < 10 ? "0" : "") + sec + "s"; };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Deep Mine</h1>
      {loading ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-24" />)}
          </div>
          <div className="mt-6">
            <Skeleton className="h-32" />
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-lg border p-4 text-center">
              <p className="text-sm text-muted-foreground">Depth</p>
              <p className="text-3xl font-bold">{status?.mineLevel || 1}</p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-sm text-muted-foreground">Iron</p>
              <p className="text-3xl font-bold">{status?.iron || 0}</p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-sm text-muted-foreground">Crystals</p>
              <p className="text-3xl font-bold">{status?.crystals || 0}</p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-sm text-muted-foreground">Coins</p>
              <p className="text-3xl font-bold">{status?.deepCoins || 0}</p>
            </div>
          </div>
          <div className="rounded-lg border p-6 text-center">
            {status?.expeditionActive ? (
              <div>
                <p className="text-lg font-semibold">Expedition in progress</p>
                <p className="text-2xl font-mono my-2">{fmt(timer)}</p>
                <p className="text-sm text-muted-foreground">Your unit is mining at depth {status.mineLevel}. Check back when timer ends!</p>
              </div>
            ) : (
              <div>
                <p className="mb-4 text-muted-foreground">Send a unit on a 30-minute mining expedition</p>
                <button onClick={startExpedition} disabled={busy} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50">
                  {busy ? "Starting..." : "Start Expedition (30m)"}
                </button>
                <p className="text-xs text-muted-foreground mt-2">Passes: {status?.passesRemaining ?? 3}/3 today</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


