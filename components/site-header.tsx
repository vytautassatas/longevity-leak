import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader(): JSX.Element {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between px-5">
        <div className="flex items-center gap-8">
          <Link className="text-2xl font-extrabold tracking-tight" href="/">
            LL
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-7 text-sm uppercase tracking-[0.12em] text-[var(--muted)] lg:flex">
            <Link className="transition-colors hover:text-[var(--text)]" href="/">Grok</Link>
            <Link className="transition-colors hover:text-[var(--text)]" href="/">API</Link>
            <Link className="transition-colors hover:text-[var(--text)]" href="/">Company</Link>
            <Link className="transition-colors hover:text-[var(--text)]" href="/">Careers</Link>
            <Link className="font-semibold text-[var(--text)]" href="/">News</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <a
            className="rounded-full border border-[var(--border-strong)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:border-[var(--text)]"
            href="/feed.xml"
          >
            Try Leak
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
