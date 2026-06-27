"use client";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/skeleton";
import { useUser } from "@/hooks/use-user";import type { Quest, PlayerQuest } from "@/types/game";
import { logger } from "@/lib/logger";

export default function QuestsPage() {
  const { user, loading } = useUser();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [questsLoading, setQuestsLoading] = useState(true);
  const [myQuests, setMyQuests] = useState<Map<number, PlayerQuest>>(new Map());
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quests & Achievements</h1>
      </div>
      {questsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-24" />)}
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

