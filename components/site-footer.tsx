import Link from "next/link";

export function SiteFooter(): JSX.Element {
  return (
    <footer className="mt-16 border-t border-[var(--border)] py-8">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 text-sm text-[var(--muted)]">
        <div className="flex items-start gap-2">
          <svg width="22" height="22" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 text-[var(--text)]">
            <path
              d="M18 4C21.6 8.2 25.4 12.5 25.4 17C25.4 21.3 22 24.8 18 24.8C14 24.8 10.6 21.3 10.6 17C10.6 12.5 14.4 8.2 18 4Z"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 28C11.1 27 12.7 27 14.3 28C15.9 29 17.5 29 19.1 28C20.7 27 22.3 27 23.9 28C25.5 29 27.1 29 28.7 28"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex flex-col">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text)]" style={{ fontFamily: "Inter, sans-serif" }}>Longevity</span>
          <span className="text-[1.45rem] font-semibold italic leading-none text-[var(--text)]" style={{ fontFamily: "Newsreader, serif" }}>Leak</span>
          <p className="mt-2">© 2026 Longevity Leak</p>
          </div>
        </div>
        <Link className="font-bold uppercase tracking-widest hover:text-[var(--text)]" href="/feed.xml" style={{ fontSize: "10px" }}>
          RSS Feed
        </Link>
      </div>
    </footer>
  );
}
