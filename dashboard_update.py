c = open("src/app/dashboard/page.tsx", encoding="utf8").read()
old = c

# Expand PlayerData interface
c = c.replace("""interface PlayerData {
  id: string; gold: number; gems: number; valor: number;
  battle_coins: number; level: number; xp: number;
  last_online_at: string;
}""", """interface PlayerData {
  id: string; gold: number; gems: number; valor: number;
  battle_coins: number; level: number; xp: number;
  highest_wave: number; total_power: number;
  pvp_rating: number; pvp_wins: number;
  last_online_at: string;
}""")

# Add more stat cards after the existing 5
c = c.replace("""            <div className="rounded-xl border bg-card p-4">
              <p className="text-2sm text-muted-foreground">Battle Coins</p>
              <p className="text-2xl font-bold text-cyan-600">{player.battle_coins}</p>
            </div>
          </div>""", """            <div className="rounded-xl border bg-card p-4">
              <p className="text-2sm text-muted-foreground">Battle Coins</p>
              <p className="text-2xl font-bold text-cyan-600">{player.battle_coins}</p>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <p className="text-sm text-muted-foreground">Highest Wave</p>
              <p className="text-2xl font-bold">{player.highest_wave || 0}</p>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <p className="text-sm text-muted-foreground">Total Power</p>
              <p className="text-2xl font-bold">{(player.total_power || 0).toLocaleString()}</p>
            </div>
          </div>""")

# Make grid accommodate more items
c = c.replace('<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">', '<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">')

if c != old:
    with open("src/app/dashboard/page.tsx", "w", encoding="utf8") as f:
        f.write(c)
    print("Updated dashboard stats")
else:
    print("No change")
