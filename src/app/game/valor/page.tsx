"use client";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/skeleton";
import { useUser } from "@/hooks/use-user";import { TREES } from "@/lib/game/valor-trees";import type { TreeDefinition, PerkDefinition } from "@/lib/game/valor-trees";import type { LearnedPerk } from "@/types/game";
import { useToast } from "@/components/Toast";
import { logger } from "@/lib/logger";

export default function ValorPage() {
  const { user, loading } = useUser();
  const [valorLoading, setValorLoading] = useState(true);
  const [valor, setValor] = useState(0);
  const [learned, setLearned] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [activeTree, setActiveTree] = useState("combat_mastery");

  const learnedKey = (tree: string, perk: string) => tree + "/" + perk;

  useEffect(() => {
    if (!loading && user) {
      fetch("/api/player/valor")
        .then(r => r.json())
        .then(d => {
          setValor(d.valor);
          setLearned(new Set(d.learned.map((l: LearnedPerk) => learnedKey(l.tree_name, l.perk_name))));
          setValorLoading(false);
        })
        .catch((err) => { logger.warn("Failed to fetch valor data", "app/game/valor/page.tsx", "useEffect", err); setValorLoading(false); });
    }
  }, [loading, user]);

  async function learnPerk(treeName: string, perkName: string, cost: number) {
    setBusy(true); setError("");
    try {
      const r = await fetch("/api/player/valor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ treeName, perkName }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Failed");
      setValor(d.valor);
      setLearned(new Set(learned).add(learnedKey(treeName, perkName)));
      toast(perkName + " learned!", "success");
    } catch (e: any) {
      logger.error("Failed to learn perk", "app/game/valor/page.tsx", "learnPerk", e, { treeName, perkName, cost });
      setError(e.message);
      toast(e.message, "error");
    }
    setBusy(false);
  }

  function canUnlock(perk: PerkDefinition, treeName: string): boolean {
    if (learned.has(learnedKey(treeName, perk.id))) return false;
    if (valor < perk.cost) return false;
    return perk.requires.every(r => learned.has(learnedKey(treeName, r)));
  }

  if (loading || valorLoading) return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="flex gap-2 flex-wrap">{[1,2,3].map(i => <Skeleton key={i} className="h-10 w-28 rounded-lg" />)}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
              <nav className="text-sm text-muted-foreground mb-2 flex items-center gap-1"><a href="/dashboard" className="hover:text-foreground">Home</a><span>/</span><span className="text-foreground">Valor</span></nav>
<h1 className="text-2xl font-bold">Valor Skill Trees</h1>
        <p className="text-lg font-semibold text-red-600">{valor} Valor</p>
      </div>
      {error && <div className="rounded-lg border bg-red-50/50 p-3 text-red-600 text-sm">{error}</div>}
      <div className="flex gap-2 flex-wrap">
        {Object.values(TREES).map(tree => (
          <button key={tree.id} onClick={() => setActiveTree(tree.id)}
            className={"px-4 py-2 rounded-lg text-sm font-medium " + (activeTree === tree.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary/10")}>
            {tree.name}
          </button>
        ))}
      </div>
      {Object.values(TREES).filter(t => t.id === activeTree).map(tree => (
        <div key={tree.id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(tree.perks).map(perk => {
            const unlocked = learned.has(learnedKey(tree.id, perk.id));
            const affordable = canUnlock(perk, tree.id);
            return (
              <div key={perk.id} className={"rounded-xl border p-4 " + (unlocked ? "border-green-500 bg-green-50/10" : "")}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{perk.name}</p>
                    <p className="text-sm text-muted-foreground">{perk.description}</p>
                  </div>
                  <p className="text-sm font-mono">{perk.cost} <span className="text-red-500">V</span></p>
                </div>
                {unlocked ? (
                  <p className="text-xs text-green-600 mt-2">Unlocked</p>
                ) : (
                  <button onClick={() => learnPerk(tree.id, perk.id, perk.cost)}
                    disabled={!affordable || busy}
                    className={"w-full mt-2 py-2 rounded-lg text-sm font-medium " + (affordable ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed")}>
                    {affordable ? "Learn (" + perk.cost + " V)" : "Requirements not met"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

