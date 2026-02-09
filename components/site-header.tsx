import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader(): JSX.Element {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5">
        <div className="flex items-center gap-6">
          <Link className="text-sm font-semibold tracking-tight" href="/">
            Longevity Leak
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-5 text-sm text-[var(--muted)] sm:flex">
            <Link className="transition-colors hover:text-[var(--text)]" href="/">
              News
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <a
            className="rounded-full border border-[var(--border-strong)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors hover:border-[var(--text)]"
            href="/feed.xml"
          >
            RSS
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
