import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader(): JSX.Element {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-3 px-4 sm:px-5">
        <div className="flex items-center">
          <Link className="flex items-center gap-2 group" href="/">
            <span className="flex items-center justify-center">
              <svg
                width="34"
                height="34"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[var(--text)] transition-transform group-hover:scale-105"
              >
                <path
                  d="M18 4C21.6 8.2 25.4 12.5 25.4 17C25.4 21.3 22 24.8 18 24.8C14 24.8 10.6 21.3 10.6 17C10.6 12.5 14.4 8.2 18 4Z"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 28C9.8 26.9 11.6 26.9 13.4 28C15.2 29.1 17 29.1 18.8 28C20.6 26.9 22.4 26.9 24.2 28C26 29.1 27.8 29.1 29.6 28"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="26.8" cy="11.2" r="1.2" fill="currentColor" />
                <circle cx="29.8" cy="14.2" r="0.9" fill="currentColor" />
              </svg>
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ fontFamily: "Inter, sans-serif" }}>
                Longevity
              </span>
              <span className="text-[1.5rem] font-semibold italic tracking-tight sm:text-[1.75rem]" style={{ fontFamily: "'Newsreader', serif" }}>
                Leak
              </span>
            </div>
          </Link>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
