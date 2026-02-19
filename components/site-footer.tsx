import Link from "next/link";
import { layout } from "@/lib/layout";
import { siteConfig } from "@/lib/site";

export function SiteFooter(): JSX.Element {
  return (
    <footer className="mt-16 border-t border-[var(--border)] py-10">
      <div className={`${layout.chromeRail} flex flex-col gap-8`}>

        {/* Top row — brand + tagline + social */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

          {/* Brand + tagline */}
          <div className="flex items-start gap-3">
            <svg width="22" height="22" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1 shrink-0 text-[var(--text)]">
              <path
                d="M18 4C21.6 8.2 25.4 12.5 25.4 17C25.4 21.3 22 24.8 18 24.8C14 24.8 10.6 21.3 10.6 17C10.6 12.5 14.4 8.2 18 4Z"
                stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"
              />
              <path
                d="M9.5 28C11.1 27 12.7 27 14.3 28C15.9 29 17.5 29 19.1 28C20.7 27 22.3 27 23.9 28C25.5 29 27.1 29 28.7 28"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text)]" style={{ fontFamily: "Inter, sans-serif" }}>Longevity</span>
              <span className="text-[1.45rem] font-semibold italic leading-none text-[var(--text)]" style={{ fontFamily: "Newsreader, serif" }}>Leak</span>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
                Evidence-first longevity intelligence. No hype, no guesswork — just the research that matters.
              </p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              aria-label="Follow on X (Twitter)"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text)]"
              href="https://x.com/longevityleak"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              aria-label="RSS Feed"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text)]"
              href="/feed.xml"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom row — nav + copyright */}
        <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Footer links" className="flex flex-wrap gap-2">
            <Link className="interactive-chip h-9 px-4 text-xs font-bold uppercase tracking-[0.14em]" href="/#latest-research">
              News
            </Link>
            <Link className="interactive-chip h-9 px-4 text-xs font-bold uppercase tracking-[0.14em]" href="/supplements">
              Supplements
            </Link>
            <Link className="interactive-chip h-9 px-4 text-xs font-bold uppercase tracking-[0.14em]" href="/conditions">
              Conditions
            </Link>
            {siteConfig.features.clinics ? (
              <Link className="interactive-chip h-9 px-4 text-xs font-bold uppercase tracking-[0.14em]" href="/clinics">
                Clinics
              </Link>
            ) : null}
            <Link className="interactive-chip h-9 px-4 text-xs font-bold uppercase tracking-[0.14em]" href="/join">
              Join waitlist
            </Link>
          </nav>
          <p className="text-xs text-[var(--muted)]">© 2026 Longevity Leak</p>
        </div>

      </div>
    </footer>
  );
}
