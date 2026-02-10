"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "longevity-leak-theme";

type Theme = "dark" | "light";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "dark" || stored === "light") return stored;

  return "light";
}

export function ThemeToggle(): JSX.Element {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initial = getPreferredTheme();
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = (): void => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  const isDark = theme === "dark";

  return (
    <button
      aria-label="Toggle color theme"
      className="inline-flex h-11 min-w-[7.75rem] px-4 items-center justify-center rounded-full border border-[var(--border)] text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)] transition-all hover:border-[var(--text)] hover:text-[var(--text)]"
      onClick={toggleTheme}
      type="button"
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
