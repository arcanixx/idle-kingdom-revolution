c = open("src/app/game/mail/page.tsx", encoding="utf8").read()
old = c

c = c.replace("""      ) : mail.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No messages.</p>""", """      ) : mail.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <div className="text-5xl opacity-30">\U0001F4EC</div>
          <p className="text-muted-foreground">No messages</p>
          <p className="text-sm text-muted-foreground/60">When the kingdom sends you news or rewards, they will appear here.</p>
        </div>""")

if c != old:
    with open("src/app/game/mail/page.tsx", "w", encoding="utf8") as f:
        f.write(c)
    print("Updated mail empty state")
else:
    print("No change")
