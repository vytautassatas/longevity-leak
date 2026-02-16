"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "longevity-leak-theme";

type Theme = "dark" | "light";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "dark" || stored === "light") return stored;

  return "dark";
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
  const toggleLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      aria-label={toggleLabel}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-all hover:border-[var(--text)] hover:text-[var(--text)]"
      onClick={toggleTheme}
      title={toggleLabel}
      type="button"
    >
      <span className="sr-only">{toggleLabel}</span>
      {isDark ? (
        <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M12 2.5V4.5M12 19.5V21.5M4.5 12H2.5M21.5 12H19.5M5.64 5.64L7.06 7.06M16.94 16.94L18.36 18.36M18.36 5.64L16.94 7.06M7.06 16.94L5.64 18.36"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.75"
          />
        </svg>
      ) : (
        <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 13.1A8.1 8.1 0 1 1 10.9 4a6.45 6.45 0 1 0 9.1 9.1Z"
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
