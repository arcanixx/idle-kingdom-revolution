c = open("src/app/admin/page.tsx", encoding="utf8").read()
old = c

c = c.replace("""async function lookupPlayer() {
    setLookupResult(null);
    try {
      const q = playerId.includes("@") ? "email=" : "id=";
      const r = await fetch("/api/player/profile?" + q + encodeURIComponent(playerId));
      if (!r.ok) { setLookupResult({ error: "Player not found" }); return; }
      setLookupResult(await r.json());
    } catch (e: any) {
      setLookupResult({ error: e.message });
    }
  }""", """async function lookupPlayer() {
    setLookupResult(null);
    try {
      const q = playerId.includes("@") ? "email=" : "id=";
      const r = await fetch("/api/admin/lookup?" + q + encodeURIComponent(playerId));
      if (!r.ok) { const d = await r.json().catch(() => ({})); setLookupResult({ error: d.error || "Player not found" }); return; }
      setLookupResult(await r.json());
    } catch (e: any) {
      setLookupResult({ error: e.message });
    }
  }""")

if c != old:
    with open("src/app/admin/page.tsx", "w", encoding="utf8") as f:
        f.write(c)
    print("Updated admin page")
else:
    print("No change")
