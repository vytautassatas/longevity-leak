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
                width="32"
                height="32"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[var(--text)] transition-transform group-hover:scale-110"
              >
                <path
                  d="M20 33C25.5228 33 30 28.5228 30 23C30 18.25 24.5 9 20 4C15.5 9 10 18.25 10 23C10 28.5228 14.4772 33 20 33Z"
                  fill="currentColor"
                  fillOpacity="0.1"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 28C22.2091 28 24 26.2091 24 24C24 22.1 21.8 18.4 20 16.4C18.2 18.4 16 22.1 16 24C16 26.2091 17.7909 28 20 28Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <div className="flex flex-col -space-y-1.5">
              <span className="text-xl font-medium tracking-tight uppercase" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: "700", letterSpacing: "0.2em" }}>
                Longevity
              </span>
              <span className="text-3xl font-semibold italic" style={{ fontFamily: "'Newsreader', serif" }}>
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
