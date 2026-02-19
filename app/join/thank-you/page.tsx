import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "You're on the list — Longevity Leak",
  description: "Thanks for joining the Longevity Leak waitlist. We'll be in touch.",
  alternates: { canonical: "/join/thank-you" },
  robots: { index: false },
  openGraph: {
    title: "You're on the list — Longevity Leak",
    description: "Thanks for joining the Longevity Leak waitlist.",
    type: "website",
    url: `${siteConfig.url}/join/thank-you`,
  },
};

export default function ThankYouPage(): JSX.Element {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        {/* Icon */}
        <div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-full text-3xl"
          style={{ background: "var(--surface-soft)", border: "1px solid var(--border)" }}
        >
          ✓
        </div>

        <h1
          className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
          style={{ color: "var(--text)" }}
        >
          You&apos;re on the list.
        </h1>

        <p
          className="mt-4 max-w-md text-[0.95rem] leading-[1.75]"
          style={{ color: "var(--muted)" }}
        >
          Thanks for joining. We&apos;ll send you the first issue as soon as early access opens —
          no spam, no auto-renewals. Watch your inbox.
        </p>

        {/* Explore links */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/supplements"
            className="inline-flex h-11 items-center rounded-full border px-5 text-sm font-semibold transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text)]"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            Browse supplements →
          </Link>
          <Link
            href="/conditions"
            className="inline-flex h-11 items-center rounded-full border px-5 text-sm font-semibold transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text)]"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            Browse conditions →
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-full border px-5 text-sm font-semibold transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text)]"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            Latest research →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
