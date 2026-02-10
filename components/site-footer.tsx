import Link from "next/link";

export function SiteFooter(): JSX.Element {
  return (
    <footer className="mt-16 border-t border-[var(--border)] py-8">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 text-sm text-[var(--muted)]">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text)]" style={{ fontFamily: "Inter, sans-serif" }}>Longevity</span>
          <span className="text-[1.45rem] font-semibold italic leading-none text-[var(--text)]" style={{ fontFamily: "Newsreader, serif" }}>Leak</span>
          <p className="mt-2">© 2026 Longevity Leak</p>
        </div>
        <Link className="font-bold uppercase tracking-widest hover:text-[var(--text)]" href="/feed.xml" style={{ fontSize: "10px" }}>
          RSS Feed
        </Link>
      </div>
    </footer>
  );
}
