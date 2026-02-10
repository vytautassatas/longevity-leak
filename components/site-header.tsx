import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader(): JSX.Element {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between px-5">
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
                  d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 19H12.8L15.6 12.6L19.7 23L22.5 17.3H28"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ fontFamily: "Inter, sans-serif" }}>
                Longevity
              </span>
              <span className="text-[1.75rem] font-semibold italic tracking-tight" style={{ fontFamily: "'Newsreader', serif" }}>
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
