c = open("src/app/game/quests/page.tsx", encoding="utf8").read()
old = c

# Add breadcrumbs
c = c.replace("""      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quests & Achievements</h1>
      </div>""", """      <nav className="text-sm text-muted-foreground mb-2 flex items-center gap-1"><a href="/dashboard" className="hover:text-foreground">Home</a><span>/</span><span className="text-foreground">Quests</span></nav>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quests & Achievements</h1>
      </div>""")

# Add empty state after loading
c = c.replace("""      {questsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-24" />)}
        </div>
      ) : (""", """      {questsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-24" />)}
        </div>
      ) : quests.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <div className="text-5xl opacity-30">\U0001F3AF</div>
          <p className="text-muted-foreground">No quests available</p>
          <p className="text-sm text-muted-foreground/60">Check back later for new quests and challenges.</p>
        </div>
      ) : (""")

if c != old:
    with open("src/app/game/quests/page.tsx", "w", encoding="utf8") as f:
        f.write(c)
    print("Updated quests page")
else:
    print("No change")
