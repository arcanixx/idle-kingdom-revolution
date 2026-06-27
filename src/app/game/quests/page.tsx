"use client";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/skeleton";
import { useUser } from "@/hooks/use-user";import type { Quest, PlayerQuest } from "@/types/game";
import { useToast } from "@/components/Toast";
import { logger } from "@/lib/logger";

export default function QuestsPage() {
  const { user, loading } = useUser();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [questsLoading, setQuestsLoading] = useState(true);
  const [myQuests, setMyQuests] = useState<Map<number, PlayerQuest>>(new Map());
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      setQuestsLoading(true);
      fetch("/api/player/quests")
        .then(r => r.json())
        .then(d => {
          setQuests(d.quests);
          setMyQuests(new Map(d.myQuests.map((p: PlayerQuest) => [p.quest_id, p])));
        })
        .catch((err) => logger.warn("Failed to fetch quests", "app/game/quests/page.tsx", "useEffect", err))
        .finally(() => setQuestsLoading(false));
    }
  }, [loading, user]);

  async function claimQuest(questId: number) {
    setBusy(true);
    try {
      const r = await fetch("/api/player/quests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questId, status: "claimed" }),
      });
      const d = await r.json();
      if (r.ok) {
        setMyQuests(new Map(myQuests).set(questId, { quest_id: questId, status: "claimed" }));
        toast("Quest claimed!", "success");
      } else {
        const ed = await r.json().catch(() => ({}));
        toast(ed?.error || "Failed to claim quest", "error");
      }
    } catch (err) {
      logger.error("Failed to claim quest", "app/game/quests/page.tsx", "claimQuest", err, { questId });
    }
    setBusy(false);
  }

  function getQuestStatus(q: Quest): string {
    const p = myQuests.get(q.id);
    if (!p) return "available";
    if (p.status === "completed") return "ready";
    if (p.status === "claimed") return "done";
    return p.status;
  }

  return (
    <div className="space-y-6">
      <nav className="text-sm text-muted-foreground mb-2 flex items-center gap-1"><a href="/dashboard" className="hover:text-foreground">Home</a><span>/</span><span className="text-foreground">Quests</span></nav>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quests & Achievements</h1>
      </div>
      {questsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-24" />)}
        </div>
      ) : quests.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <div className="text-5xl opacity-30">🎯</div>
          <p className="text-muted-foreground">No quests available</p>
          <p className="text-sm text-muted-foreground/60">Check back later for new quests and challenges.</p>
        </div>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quests.filter(q => q.quest_type === "daily" || q.quest_type === "story").map(q => {
          const status = getQuestStatus(q);
          return (
            <div key={q.id} className={"rounded-xl border p-4" + (status === "done" ? " border-green-500" : "")}>
              <div>
                <p className="font-semibold">{q.title}</p>
                <p className="text-sm text-muted-foreground">{q.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{q.quest_type} quest</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {status === "ready" ? (
                  <button onClick={() => claimQuest(q.id)} disabled={busy}
                    className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-sm font-medium">
                    Claim</button>
                ) : status === "done" ? (
                  <span className="text-xs text-green-600">Done</span>
                ) : status === "active" ? (
                  <span className="text-xs text-blue-600">In Progress</span>
                ) : (
                  <span className="text-xs text-muted-foreground">Available</span>
                )}
              </div>
          </div>
          );
        })}
      </div>
      )}
    </div>
  );
}

