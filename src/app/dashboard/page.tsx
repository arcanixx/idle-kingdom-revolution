"use client";
import { useUser } from "@/hooks/use-user";
import { useGameStore } from "@/stores/game-store";
import Link from "next/link";

export default function Dashboard() {
  const { user, loading } = useUser();
  const profile = useGameStore((s) => s.profile);
  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  if (!user) return <div className="flex min-h-screen items-center justify-center"><Link href="/login" className="underline">Sign in</Link></div>;
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="mx-auto max-w-4xl flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Idle Kingdom Revolution</h1>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </div>
      </header>
      <main className="flex-1 mx-auto max-w-4xl w-full p-4 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-lg border p-4"><p className="text-sm text-muted-foreground">Level</p><p className="text-2xl font-bold">{profile?.level ?? 1}</p></div>
          <div className="rounded-lg border p-4"><p className="text-sm text-muted-foreground">Gold</p><p className="text-2xl font-bold">{profile?.currencies?.gold?.toLocaleString() ?? 0}</p></div>
          <div className="rounded-lg border p-4"><p className="text-sm text-muted-foreground">Gems</p><p className="text-2xl font-bold">{profile?.currencies?.gems ?? 0}</p></div>
          <div className="rounded-lg border p-4"><p className="text-sm text-muted-foreground">Highest Wave</p><p className="text-2xl font-bold">{profile?.highest_wave ?? 0}</p></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/game/battle" className="rounded-lg border p-6 text-center hover:bg-muted"><h2 className="text-lg font-semibold">Battle</h2><p className="text-sm text-muted-foreground">Fight on the battlefield</p></Link>
          <Link href="/game/army" className="rounded-lg border p-6 text-center hover:bg-muted"><h2 className="text-lg font-semibold">Army</h2><p className="text-sm text-muted-foreground">Manage your units</p></Link>
          <div className="rounded-lg border p-6 text-center opacity-50"><h2 className="text-lg font-semibold">Quests</h2><p className="text-sm text-muted-foreground">Coming Phase 2</p></div>
          <div className="rounded-lg border p-6 text-center opacity-50"><h2 className="text-lg font-semibold">Mines</h2><p className="text-sm text-muted-foreground">Coming Phase 3</p></div>
        </div>
      </main>
    </div>
  );
}
