c = open("src/app/settings/page.tsx", encoding="utf8").read()
old = c

c = c.replace("""        <div className="flex items-center justify-between">
          <span className="text-sm">Language</span>
          <select value={lang} onChange={e => setLang(e.target.value)} className="rounded-md border p-1 bg-background">
            <option value="en">English</option>
            <option value="pl">Polski</option>
          </select>
        </div>""", "")

# Remove unused lang state
c = c.replace("""const [saved, setSaved] = useState(false);
  const [lang, setLang] = useState("en");""", """const [saved, setSaved] = useState(false);""")

if c != old:
    with open("src/app/settings/page.tsx", "w", encoding="utf8") as f:
        f.write(c)
    print("Removed language dropdown")
else:
    print("No change")
