import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { layout } from "@/lib/layout";

export default function NotFound(): JSX.Element {
  return (
    <>
      <SiteHeader />
      <main className={layout.rails.wide}>
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-7 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">404</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h1>
          <p className="mt-4 max-w-2xl text-sm leading-[1.7] text-[var(--muted)] sm:text-base">
            This route is unavailable or not currently published. Use the links below to continue browsing evidence-first content.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-11 items-center rounded-full border border-[var(--border)] px-4 text-sm font-semibold transition-colors hover:border-[var(--border-strong)]"
              href="/"
            >
              Home
            </Link>
            <Link
              className="inline-flex min-h-11 items-center rounded-full border border-[var(--border)] px-4 text-sm font-semibold transition-colors hover:border-[var(--border-strong)]"
              href="/posts"
            >
              News
            </Link>
            <Link
              className="inline-flex min-h-11 items-center rounded-full border border-[var(--border)] px-4 text-sm font-semibold transition-colors hover:border-[var(--border-strong)]"
              href="/supplements"
            >
              Supplements
            </Link>
            <Link
              className="inline-flex min-h-11 items-center rounded-full border border-[var(--border)] px-4 text-sm font-semibold transition-colors hover:border-[var(--border-strong)]"
              href="/conditions"
            >
              Conditions
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
