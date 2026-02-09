import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader(): JSX.Element {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between px-5">
        <div className="flex items-center">
          <Link className="text-2xl font-extrabold tracking-tight" href="/">
            LL
          </Link>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
