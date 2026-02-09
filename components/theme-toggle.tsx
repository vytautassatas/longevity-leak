"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "longevity-leak-theme";

type Theme = "dark" | "light";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "dark" || stored === "light") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle(): JSX.Element {
  const [theme, setTheme] = useState<Theme>("dark");

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
      className="inline-flex h-10 w-10 items-center justify-center rounded border border-[var(--border)] text-[var(--text)] transition-colors hover:text-[var(--accent)]"
      onClick={toggleTheme}
      type="button"
    >
      {isDark ? (
        <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 3v2m0 14v2M5.64 5.64l1.41 1.41M16.95 16.95l1.41 1.41M3 12h2m14 0h2M5.64 18.36l1.41-1.41M16.95 7.05l1.41-1.41M12 8a4 4 0 100 8 4 4 0 000-8z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </svg>
      ) : (
        <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
          <path
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        </svg>
      )}
    </button>
  );
}
