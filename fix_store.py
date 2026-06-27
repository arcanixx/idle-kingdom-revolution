c = open("src/stores/game-store.ts", encoding="utf8").read()
old = c

# Fix fetchUnits - handle { data: [...] } response
c = c.replace(
  'if (Array.isArray(d)) set({ units: d });',
  'if (d?.data && Array.isArray(d.data)) set({ units: d.data }); else if (Array.isArray(d)) set({ units: d });'
)

# Fix fetchInventory - handle { inventory: [...] } response  
c = c.replace(
  'if (Array.isArray(d)) set({ inventory: d });',
  'if (d?.inventory && Array.isArray(d.inventory)) set({ inventory: d.inventory }); else if (Array.isArray(d)) set({ inventory: d });'
)

# Fix fetchFormation - handle different response shapes
c = c.replace(
  'if (d?.front) set({ formation: d });',
  'if (d?.front || d?.data?.front) set({ formation: d.data || d });'
)

if c != old:
    with open("src/stores/game-store.ts", "w", encoding="utf8") as f:
        f.write(c)
    print("Fixed game-store.ts")
else:
    print("No change")
