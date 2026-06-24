# Update all game pages with auth checks and dynamic user content
import os, re

ROOT = os.path.dirname(os.path.abspath(__file__))

PAGES = {
    "dashboard": {"path": "src/app/dashboard/page.tsx", "title": "Dashboard"},
    "battle": {"path": "src/app/game/battle/page.tsx", "title": "Battle"},
    "army": {"path": "src/app/game/army/page.tsx", "title": "Army"},
    "mining": {"path": "src/app/game/mining/page.tsx", "title": "Deep Mine"},
    "td": {"path": "src/app/game/td/page.tsx", "title": "Fortress Siege"},
    "castle": {"path": "src/app/game/castle/page.tsx", "title": "Castle Defender"},
}

def update_page(name, config):
    filepath = os.path.join(ROOT, config["path"])
    if not os.path.exists(filepath):
        print(f"[SKIP] {name}: file not found")
        return False

    content = open(filepath, encoding="utf-8").read()
    original = content

    if "useUser" not in content and "use-user" not in content:
        imports = re.findall(r"^import .+?;\n", content, re.MULTILINE)
        if imports:
            last_import = imports[-1]
            content = content.replace(
                last_import,
                last_import + "import { useUser } from \"@/hooks/use-user\";\n"
            )

    if "useUser()" not in content:
        match = re.search(r"export default function \w+\(\) \{", content)
        if match:
            func_decl = match.group(0)
            content = content.replace(
                func_decl,
                func_decl + "\n  const { user, loading } = useUser();"
            )

    if content != original:
        open(filepath, "w", encoding="utf-8").write(content)
        print(f"[OK] {name}: updated")
        return True
    print(f"[OK] {name}: already up-to-date")
    return False
def main():
    print("Updating pages...")
    updated = 0
    for name, config in PAGES.items():
        if update_page(name, config):
            updated += 1
    print(f"Done. {updated} file(s) updated.")

if __name__ == "__main__":
    main()
