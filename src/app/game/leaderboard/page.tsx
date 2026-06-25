"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/use-user";
import { Skeleton } from "@/components/skeleton";

interface LeaderboardEntry {
  id: string;
  display_name: string;
  level: number;
  pvp_rating: number;
}

export default function LeaderboardPage() {
  const { user } = useUser();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("/api/leaderboard?limit=50")
      .then(r => r.json())
      .then(d => { setEntries(d.leaderboard); setTotal(d.total); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <p className="text-sm text-muted-foreground">{total} players</p>
      </div>
      {loading ? (
        <div className="space-y-2">
          {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-12" />)}
        </div>
      ) : entries.length === 0 ? (
        <p className="text-muted-foreground">No leaderboard data yet.</p>
      ) : (
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 text-sm text-muted-foreground">
                <th className="text-left p-3 w-12">#</th>
                <th className="text-left p-3">Name</th>
                <th className="text-center p-3 w-20">Level</th>
                <th className="text-right p-3 w-24">Rating</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <tr key={e.id} className={"border-t text-sm" + (e.id === user?.id ? " bg-primary/5 font-semibold" : "")}>
                  <td className="p-3 text-muted-foreground">{i + 1}</td>
                  <td className="p-3">{e.display_name}</td>
                  <td className="p-3 text-center">{e.level}</td>
                  <td className="p-3 text-right font-mono">{e.pvp_rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
