c = open("src/app/game/inventory/page.tsx", encoding="utf8").read()
old = c

c = c.replace("""      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No items found.</p>""", """      ) : filtered.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <div className="text-5xl opacity-30">\U0001F9F0</div>
          <p className="text-muted-foreground">No items found</p>
          <p className="text-sm text-muted-foreground/60">Items you collect from battles and quests will appear here.</p>
        </div>""")

if c != old:
    with open("src/app/game/inventory/page.tsx", "w", encoding="utf8") as f:
        f.write(c)
    print("Updated inventory empty state")
else:
    print("No change")
