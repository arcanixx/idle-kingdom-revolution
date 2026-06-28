"use client";

import Link from "next/link";
import { Home, Castle, Swords, Pickaxe, TowerControl, ShoppingBag, ScrollText, Trophy } from "lucide-react";

const buildings = [
  { href: "/game/battle", label: "Battle", icon: Swords, description: "Fight waves of enemies", color: "from-red-500 to-orange-500" },
  { href: "/game/army", label: "Barracks", icon: Castle, description: "Manage your army", color: "from-blue-500 to-indigo-500" },
  { href: "/game/mining", label: "Mine", icon: Pickaxe, description: "Mine resources", color: "from-yellow-500 to-amber-500" },
  { href: "/game/td", label: "Tower Defense", icon: TowerControl, description: "Defend the castle", color: "from-green-500 to-emerald-500" },
  { href: "/game/shop", label: "Shop", icon: ShoppingBag, description: "Buy items and upgrades", color: "from-purple-500 to-pink-500" },
  { href: "/game/quests", label: "Quests", icon: ScrollText, description: "Complete quests", color: "from-cyan-500 to-teal-500" },
  { href: "/game/leaderboard", label: "Leaderboard", icon: Trophy, description: "Compete with others", color: "from-amber-500 to-yellow-500" },
];

export function CastleHub() {
  return (
    <div className="space-y-6">
      <nav className="text-sm text-muted-foreground flex items-center gap-1">
        <Link href="/dashboard" className="hover:text-foreground flex items-center gap-1">
          <Home className="w-3 h-3" /> Home
        </Link>
        <span>/</span>
        <span className="text-foreground">Castle</span>
      </nav>

      <div className="relative rounded-2xl overflow-hidden border bg-gradient-to-b from-slate-900 to-slate-800 p-8 min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <Castle className="w-24 h-24 text-amber-400/60 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Castle Hub</h1>
          <p className="text-slate-400">Choose your destination</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {buildings.map((b) => {
          const Icon = b.icon;
          return (
            <Link
              key={b.href}
              href={b.href}
              className="group rounded-xl border bg-card p-5 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className={"w-12 h-12 rounded-lg bg-gradient-to-br " + b.color + " flex items-center justify-center mb-3"}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm">{b.label}</h3>
              <p className="text-xs text-muted-foreground mt-1">{b.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
