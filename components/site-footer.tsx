import Link from "next/link";

export function SiteFooter(): JSX.Element {
  return (
    <footer className="mt-16 border-t border-[var(--border)] py-8">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 text-sm text-[var(--muted)]">
        <div className="flex flex-col">
          <span className="font-bold uppercase tracking-widest text-[var(--text)]" style={{ fontSize: "10px" }}>Longevity</span>
          <span className="font-semibold italic text-[var(--text)]" style={{ fontFamily: "Newsreader", fontSize: "18px" }}>Leak</span>
          <p className="mt-2">© 2026 Longevity Leak</p>
        </div>
        <Link className="font-bold uppercase tracking-widest hover:text-[var(--text)]" href="/feed.xml" style={{ fontSize: "10px" }}>
          RSS Feed
        </Link>
      </div>
    </footer>
  );
}
