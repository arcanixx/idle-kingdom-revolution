import pathlib, os
base = pathlib.Path("C:/Users/Administrator/GitHub/idle-kingdom-revolution/src")
login = base / "app/(auth)/login/page.tsx"
login.parent.mkdir(parents=True, exist_ok=True)
login.write_text("test content", encoding="utf-8")
print("done")