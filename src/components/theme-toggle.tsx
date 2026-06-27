"use client";
import { useEffect, useState } from "react";
import { logger } from "@/lib/logger";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        setDark(true);
        document.documentElement.classList.add("dark");
      }
    } catch (err) {
      logger.error("localStorage not available for theme", "components/theme-toggle.tsx", "useEffect", err);
    }
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    try {
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    } catch (err) {
      logger.error("localStorage write failed for theme", "components/theme-toggle.tsx", "toggle", err);
    }
  }

  return (
    <button onClick={toggle} className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" aria-label="Toggle theme">
      {dark ? "\u2600" : "\uD83C\uDF19"}
    </button>
  );
}

