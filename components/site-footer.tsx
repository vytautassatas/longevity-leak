import Link from "next/link";

export function SiteFooter(): JSX.Element {
  return (
    <footer className="mt-16 border-t border-[var(--border)] py-8">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 text-sm text-[var(--muted)]">
        <p>© 2026 Longevity Leak</p>
        <Link className="transition-colors hover:text-[var(--text)]" href="/feed.xml">
          RSS Feed
        </Link>
      </div>
    </footer>
  );
}
