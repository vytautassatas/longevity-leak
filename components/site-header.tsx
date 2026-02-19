"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { layout } from "@/lib/layout";
import { SiteSearch } from "@/components/site-search";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site";

const baseDirectoryNav = [
  { href: "/#latest-research", label: "News" },
  { href: "/supplements", label: "Supplements" },
  { href: "/conditions", label: "Conditions" }
];
const directoryNav = siteConfig.features.clinics ? [...baseDirectoryNav, { href: "/clinics", label: "Clinics" }] : baseDirectoryNav;

export function SiteHeader(): JSX.Element {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur">
      <div className={`${layout.chromeRail} grid min-h-16 grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 py-3 sm:grid-cols-[1fr_auto_1fr]`}>
        <div className="flex items-center justify-self-start">
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
        <div className="flex items-center justify-self-end gap-2">
          <SiteSearch />
          <ThemeToggle />
        </div>
        <nav aria-label="Primary" className="relative col-span-2 w-full sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:w-auto sm:justify-self-center">
          {/* right fade hint — only on mobile to signal scrollability */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-[var(--bg)] to-transparent sm:hidden" aria-hidden="true" />
          <div className="overflow-x-auto [scrollbar-width:thin] [scrollbar-color:var(--border-strong)_transparent] [&::-webkit-scrollbar]:h-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--border-strong)] sm:[&::-webkit-scrollbar]:h-0">
            <ul className="flex min-w-max items-center gap-1.5 pb-2 sm:gap-2 sm:pb-0">
              {directoryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    className={`inline-flex h-8 items-center rounded-full border px-3 text-[10px] font-bold uppercase tracking-[0.1em] transition-colors sm:h-9 sm:px-3.5 sm:text-[11px] sm:tracking-[0.12em] ${
                      (item.href === "/#latest-research" ? pathname === "/" : pathname.startsWith(item.href))
                        ? "border-[var(--text)] bg-[var(--text)] text-[var(--bg)]"
                        : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]"
                    }`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {/* Brands — coming soon, non-interactive */}
              <li>
                <span className="inline-flex h-8 items-center gap-1 rounded-full border border-[var(--border)] px-3 opacity-50 cursor-default sm:h-9 sm:gap-1.5 sm:px-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)] sm:text-[11px] sm:tracking-[0.12em]">Brands</span>
                  <span className="rounded-full bg-[var(--surface-soft)] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-[var(--muted)] border border-[var(--border)]">Soon</span>
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
