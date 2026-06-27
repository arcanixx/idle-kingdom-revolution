"use client";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { calculateLevel } from "@/lib/game/leveling";
import { logger } from "@/lib/logger";

interface PlayerData {
  id: string; gold: number; gems: number; valor: number;
  battle_coins: number; level: number; xp: number;
  last_online_at: string;
}

interface OfflineEarnings {
  hours_offline: number; gold_earned: number; capped: boolean;
}

export default function DashboardPage() {
  const { user, loading } = useUser();
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [offlineEarnings, setOfflineEarnings] = useState<OfflineEarnings | null>(null);
  const [claiming, setClaiming] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    if (!loading && user) {
      fetch("/api/player/profile")
        .then(r => r.json())
        .then(d => setPlayer(d))
        .catch((err) => logger.warn("Failed to fetch profile", "app/dashboard/page.tsx", "useEffect", err));

      fetch("/api/player/offline-earnings")
        .then(r => r.json())
        .then(d => setOfflineEarnings(d.earned))
        .catch(() => {});
    }
  }, [loading, user]);

  async function claimEarnings() {
    setClaiming(true);
    try {
      const r = await fetch("/api/player/offline-earnings");
      const d = await r.json();
      if (r.ok) {
        setOfflineEarnings(null);
        setPlayer(d.player);
      }
    } catch (err) {
      logger.error("Failed to claim offline earnings", "app/dashboard/page.tsx", "claimEarnings", err);
    }
    setClaiming(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const levelInfo = player ? calculateLevel(player.xp) : null;

  return (
    <div className="min-h-screen relative bg-slate-900 bg-bg-plains bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
      <div className="relative z-10 space-y-6 px-4 py-8 max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-white/80">Welcome, {loading ? "..." : user?.user_metadata?.display_name || user?.email || "Adventurer"} - Your Kingdom Awaits!</p>
          </div>
          <button onClick={handleLogout} className="text-sm text-muted-foreground hover:text-foreground underline">Sign out</button>
        </div>

        {offlineEarnings && offlineEarnings.hours_offline > 0 && offlineEarnings.gold_earned > 0 && (
          <div className="rounded-lg border bg-yellow-50/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-yellow-800">Offline Earnings</p>
                <p className="text-sm text-muted-foreground">Gained {offlineEarnings.gold_earned} gold over {Math.round(offlineEarnings.hours_offline)} hours</p>
              </div>
              <button onClick={claimEarnings} disabled={claiming || offlineEarnings.gold_earned === 0} className="px-4 py-2 bg-yellow-500 text-yellow-900 rounded-lg font-medium hover:opacity-90 disabled:opacity-50">
                {claiming ? "Claiming..." : "Claim"}
              </button>
            </div>
          </div>
        )}

        {player && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border bg-card p-4">
              <p className="text-2sm text-muted-foreground">Level</p>
              <p className="text-2xl font-bold">{player.level}</p>
              <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{width: (levelInfo?.progress || 0) * 100 + "%"}} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{levelInfo?.currentXp || player.xp} / {levelInfo?.nextLevelXp|| 1} XP</p>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <p className="text-2sm text-muted-foreground">Gold</p>
              <p className="text-2xl font-bold text-yellow-600">{player.gold.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <p className="text-2sm text-muted-foreground">Gems</p>
              <p className="text-2xl font-bold text-purple-600">{player.gems}</p>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <p className="text-2sm text-muted-foreground">Valor</p>
              <p className="text-2xl font-bold text-red-600">{player.valor}</p>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <p className="text-2sm text-muted-foreground">Battle Coins</p>
              <p className="text-2xl font-bold text-cyan-600">{player.battle_coins}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/game/battle" className="rounded-xl border bg-card p-4 hover:bg-accent transition-colors block">
            <p className="font-semibold">Battle</p><p className="text-2sm text-muted-foreground">Conquer your foes</p>
          </Link>
          <Link href="/game/army" className="rounded-xl border bg-card p-4 hover:bg-accent transition-colors block">
            <p className="font-semibold">Army</p><p className="text-2sm text-muted-foreground">Build your forces</p>
          </Link>
          <Link href="/game/mining" className="rounded-xl border bg-card p-4 hover:bg-accent transition-colors block">
            <p className="font-semibold">Mining</p><p className="text-2sm text-muted-foreground">Gather resources</p>
          </Link>
          <Link href="/game/td" className="rounded-xl border bg-card p-4 hover:bg-accent transition-colors block">
            <p className="font-semibold">Tower Defense</p><p className="text-2sm text-muted-foreground">Defend your kingdom</p>
          </Link>
          <Link href="/game/quests" className="rounded-xl border bg-card p-4 hover:bg-accent transition-colors block">
            <p className="font-semibold">Quests</p><p className="text-2sm text-muted-foreground">Complete tasks</p>
          </Link>
          <Link href="/game/valor" className="rounded-xl border bg-card p-4 hover:bg-accent transition-colors block">
            <p className="font-semibold">Valor</p><p className="text-2sm text-muted-foreground">Unlock skills</p>
          </Link>
          <Link href="/game/inventory" className="rounded-xl border bg-card p-4 hover:bg-accent transition-colors block"><p className="font-semibold">Inventory</p><p className="text-2sm text-muted-foreground">Manage items</p></Link><Link href="/game/shop" className="rounded-xl border bg-card p-4 hover:bg-accent transition-colors block"><p className="font-semibold">Shop</p><p className="text-2sm text-muted-foreground">Buy goods</p></Link><Link href="/game/mail" className="rounded-xl border bg-card p-4 hover:bg-accent transition-colors block"><p className="font-semibold">Mail</p><p className="text-2sm text-muted-foreground">Read messages</p></Link><Link href="/settings" className="rounded-xl border bg-card p-4 hover:bg-accent transition-colors block"><p className="font-semibold">Settings</p><p className="text-2sm text-muted-foreground">Account &amp; preferences</p></Link><Link href="/game/castle" className="rounded-xl border bg-card p-4 hover:bg-accent transition-colors block">
            <p className="font-semibold">Castle</p><p className="text-2sm text-muted-foreground">Fortify your keep</p>
          </Link>
        </div>
      </div>
    </div>
  );
}




