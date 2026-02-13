"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const directoryNav = [
  { href: "/", label: "News" },
  { href: "/supplements", label: "Supplements" },
  { href: "/conditions", label: "Conditions" },
  { href: "/clinics", label: "Clinics" }
];

export function SiteHeader(): JSX.Element {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-[1320px] flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-3 sm:px-5">
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
                <rect x="6.2" y="6.2" width="23.6" height="23.6" rx="5.4" stroke="currentColor" strokeWidth="1.8" />
                <path d="M17.95 12.1V23.9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M12.1 18H23.9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M25.5 6.2L29.8 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <div className="flex flex-col leading-none">
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]"
                style={{ fontFamily: "\"Avenir Next\", \"Neue Haas Grotesk Text Pro\", Inter, sans-serif" }}
              >
                Longevity
              </span>
              <span
                className="text-[1.38rem] font-semibold uppercase tracking-[0.02em] sm:text-[1.52rem]"
                style={{ fontFamily: "\"Avenir Next\", \"Neue Haas Grotesk Display Pro\", Inter, sans-serif" }}
              >
                Leak
              </span>
            </div>
          </Link>
        </div>
        <nav aria-label="Primary" className="order-3 w-full overflow-x-auto sm:order-2 sm:w-auto">
          <ul className="flex min-w-max items-center gap-2 sm:gap-3">
            {directoryNav.map((item) => (
              <li key={item.href}>
                <Link
                  className={`inline-flex h-10 items-center rounded-full border px-4 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${
                    (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))
                      ? "border-[var(--text)] bg-[var(--text)] text-[var(--bg)]"
                      : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]"
                  }`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="order-2 sm:order-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
