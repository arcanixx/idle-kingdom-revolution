with open("src/components/BottomNav.tsx", "r", encoding="utf8") as f:
    c = f.read()

old = c

c = c.replace("""const navItems = [
  { path: '/dashboard', icon: '\U0001F3E0', label: 'Home' },
  { path: '/battle', icon: '\u2694\uFE0F', label: 'Battle' },
  { path: '/units', icon: '\U0001F482', label: 'Units' },
  { path: '/economy', icon: '\U0001F6D2', label: 'Economy' },
  { path: '/valor', icon: '\U0001F3C5', label: 'Valor' },
];""", """const navItems = [
  { path: '/dashboard', icon: '\U0001F3E0', label: 'Home' },
  { path: '/game/battle', icon: '\u2694\uFE0F', label: 'Battle' },
  { path: '/game/army', icon: '\U0001F482', label: 'Army' },
  { path: '/game/shop', icon: '\U0001F6D2', label: 'Shop' },
  { path: '/game/valor', icon: '\U0001F3C5\uFE0F', label: 'Valor' },
];""")

with open("src/components/BottomNav.tsx", "w", encoding="utf8") as f:
    f.write(c)

print("Fixed!")
