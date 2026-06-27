"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { logger } from "@/lib/logger";

export default function AdminPage() {
  const [tab, setTab] = useState("inject");
  const [playerId, setPlayerId] = useState("");
  const [resource, setResource] = useState("gold");
  const [amount, setAmount] = useState("1000");
  const [msg, setMsg] = useState("");
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [allPlayers, setAllPlayers] = useState<any[]>([]);
  const [playersLoading, setPlayersLoading] = useState(false);

  useEffect(() => {
    if (tab === "players" && allPlayers.length === 0) {
      setPlayersLoading(true);
      fetch("/api/player/profile?limit=50").then(r => r.json()).then(d => { setAllPlayers(Array.isArray(d) ? d : d.data || []); }).catch(() => {}).finally(() => setPlayersLoading(false));
    }
  }, [tab, allPlayers.length]);

  async function injectResources() {
    setMsg("");
    try {
      const r = await fetch("/api/admin/inject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player_id: playerId, resource, amount: parseInt(amount) }),
      });
      const d = await r.json();
      setMsg(d.error || "Injected!");
    } catch (e: any) {
      logger.error("Admin inject failed", "app/admin/page.tsx", "injectResources", e);
      setMsg(e.message);
    }
  }

  async function lookupPlayer() {
    setLookupResult(null);
    try {
      const q = playerId.includes("@") ? "email=" : "id=";
      const r = await fetch("/api/player/profile?" + q + encodeURIComponent(playerId));
      if (!r.ok) { setLookupResult({ error: "Player not found" }); return; }
      setLookupResult(await r.json());
    } catch (e: any) {
      setLookupResult({ error: e.message });
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8 px-4">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <div className="flex gap-2 flex-wrap">
        {["inject","lookup","players"].map(t => (
          <button key={t} onClick={() => setTab(t)} className={"px-4 py-2 rounded-lg text-sm border capitalize " + (tab===t?"bg-primary text-primary-foreground":"hover:bg-muted")}>
            {t === "inject" ? "Resource Inject" : t === "lookup" ? "Player Lookup" : "All Players"}
          </button>
        ))}
      </div>

      {tab === "inject" && (
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="text-lg font-semibold">Inject Resources</h2>
          <input type="text" placeholder="Player ID" value={playerId} onChange={e2 => setPlayerId(e2.target.value)} className="w-full rounded-md border p-2 bg-background" />
          <select value={resource} onChange={e2 => setResource(e2.target.value)} className="w-full rounded-md border p-2 bg-background">
            <option value="gold">Gold</option>
            <option value="gems">Gems</option>
            <option value="valor">Valor</option>
            <option value="battle_coins">Battle Coins</option>
          </select>
          <input type="number" placeholder="Amount" value={amount} onChange={e2 => setAmount(e2.target.value)} className="w-full rounded-md border p-2 bg-background" />
          <button onClick={injectResources} className="rounded-md bg-primary text-primary-foreground px-4 py-2 font-medium hover:opacity-90">Inject</button>
          {msg && <p className="text-sm">{msg}</p>}
        </div>
      )}

      {tab === "lookup" && (
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="text-lg font-semibold">Player Lookup</h2>
          <input type="text" placeholder="Player ID or email" value={playerId} onChange={e2 => setPlayerId(e2.target.value)} className="w-full rounded-md border p-2 bg-background" />
          <button onClick={lookupPlayer} className="rounded-md bg-primary text-primary-foreground px-4 py-2 font-medium hover:opacity-90">Lookup</button>
          {lookupResult && (
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto max-h-96 overflow-y-auto">{JSON.stringify(lookupResult, null, 2)}</pre>
          )}
        </div>
      )}

      {tab === "players" && (
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="text-lg font-semibold">All Players ({allPlayers.length})</h2>
          {playersLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : allPlayers.length === 0 ? (
            <p className="text-muted-foreground">No players found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 pr-4">Name</th>
                    <th className="pb-2 pr-4">Level</th>
                    <th className="pb-2 pr-4">Gold</th>
                    <th className="pb-2 pr-4">Gems</th>
                    <th className="pb-2 pr-2">Power</th>
                  </tr>
                </thead>
                <tbody>
                  {allPlayers.map((p: any) => (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-2 pr-4 font-medium">{p.display_name || p.id?.slice(0,8)}</td>
                      <td className="py-2 pr-4">{p.level}</td>
                      <td className="py-2 pr-4">{p.gold?.toLocaleString()}</td>
                      <td className="py-2 pr-4">{p.gems}</td>
                      <td className="py-2 pr-2">{p.total_power?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
