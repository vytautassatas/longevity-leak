import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDirectoryCounts } from "@/lib/directory";
import { layout } from "@/lib/layout";
import { getAllPosts, type Post } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Longevity Leak - Clinical Studies. Zero Jargon." },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description
  }
};

function deduplicatePostsByTitle(posts: Post[]): Post[] {
  const seen = new Map<string, Post>();
  for (const post of posts) {
    const key = post.title.trim().toLowerCase();
    const existing = seen.get(key);
    if (!existing || post.date > existing.date) {
      seen.set(key, post);
    }
  }
  return [...seen.values()].sort((a, b) => (a.date > b.date ? -1 : 1));
}

export default function HomePage(): JSX.Element {
  const allPosts = getAllPosts();
  const dedupedPosts = deduplicatePostsByTitle(allPosts);
  const latestSix = dedupedPosts.slice(0, 6);
  const counts = getDirectoryCounts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description
  };

  return (
    <>
      <SiteHeader />
      <main className={layout.rails.wide}>
        <h1 className="sr-only">Longevity Leak — Evidence-based longevity tracking</h1>

        {/* Hero: Newsletter + App Signup */}
        <section aria-labelledby="hero-heading" className={layout.hero.shell}>
          <p className={layout.hero.eyebrow}>Early Access</p>
          <h2 className={layout.hero.title} id="hero-heading">
            Know your biological age.<br className="hidden sm:block" /> Track what actually moves the needle.
          </h2>
          <p className={layout.hero.lead}>
            Evidence-based longevity tracking — no jargon, no hype. Enter your bloodwork, see where you stand against optimal longevity ranges, and get research translated into plain language every week.
          </p>

          <ul className="mt-6 space-y-2 text-[0.95rem] text-[var(--muted)]" role="list">
            <li className="flex items-start gap-2">
              <span aria-hidden="true" className="mt-0.5 shrink-0 text-emerald-500">✓</span>
              <span>
                <strong className="text-[var(--text)]">{counts.supplements} supplements</strong>{" "}
                tracked with evidence levels, dosing context, and safety framing
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span aria-hidden="true" className="mt-0.5 shrink-0 text-emerald-500">✓</span>
              <span>
                <strong className="text-[var(--text)]">{counts.conditions} conditions</strong>{" "}
                mapped with top interventions and monitoring markers
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span aria-hidden="true" className="mt-0.5 shrink-0 text-emerald-500">✓</span>
              <span>
                <strong className="text-[var(--text)]">Evidence-first methodology</strong> — every claim
                is sourced, calibrated, and uncertainty is stated explicitly
              </span>
            </li>
          </ul>

          <form
            action="/join"
            className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            method="GET"
          >
            <label className="sr-only" htmlFor="hero-email">Your email address</label>
            <input
              className="h-11 flex-1 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-4 text-[0.95rem] text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              id="hero-email"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
            <button
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg border border-[var(--border-strong)] px-6 text-sm font-bold uppercase tracking-[0.12em] transition-all hover:bg-[var(--text)] hover:text-[var(--bg)]"
              type="submit"
            >
              Join the waitlist
            </button>
          </form>

          <p className="mt-3 text-xs text-[var(--muted)]">
            Free newsletter + early access to the blood tracker app. No spam.{" "}
            <Link className="underline underline-offset-2 hover:text-[var(--text)]" href="/join">
              Learn what&apos;s included →
            </Link>
          </p>
        </section>

        {/* Latest Research */}
        <section aria-labelledby="latest-heading" className={layout.spacing.section}>
          <header className="mb-8 flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-semibold" id="latest-heading">Latest Research</h2>
          </header>
          <nav aria-label="Latest research articles" className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {latestSix.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </nav>
        </section>

        {/* Directory Overview */}
        <section aria-labelledby="directory-heading" className={layout.spacing.section}>
          <header className="mb-8">
            <h2 className="text-2xl font-semibold" id="directory-heading">Directory</h2>
            <p className="mt-2 text-[var(--muted)]">
              Browse evidence-ranked supplements and condition protocols.
            </p>
          </header>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              className="flex flex-col gap-1 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6 transition-colors hover:border-[var(--border-strong)]"
              href="/supplements"
            >
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Supplements</span>
              <strong className="mt-1 text-2xl font-semibold">{counts.supplements} tracked</strong>
              <p className="mt-2 text-sm leading-[1.6] text-[var(--muted)]">
                Evidence level, dosing context, safety framing, and condition mapping — for every entry.
              </p>
              <span className="mt-4 text-sm font-bold text-[var(--text)]">Browse supplements →</span>
            </Link>

            <Link
              className="flex flex-col gap-1 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6 transition-colors hover:border-[var(--border-strong)]"
              href="/conditions"
            >
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Conditions</span>
              <strong className="mt-1 text-2xl font-semibold">{counts.conditions} conditions</strong>
              <p className="mt-2 text-sm leading-[1.6] text-[var(--muted)]">
                Start with the outcome. Each entry maps top interventions, monitoring markers, and evidence quality.
              </p>
              <span className="mt-4 text-sm font-bold text-[var(--text)]">Browse conditions →</span>
            </Link>

            {siteConfig.features.brands ? (
              <Link
                className="flex flex-col gap-1 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6 transition-colors hover:border-[var(--border-strong)]"
                href="/brands"
              >
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Brands</span>
                <strong className="mt-1 text-2xl font-semibold">{(counts as Record<string, number>)["brands"] ?? 0} brands</strong>
                <p className="mt-2 text-sm leading-[1.6] text-[var(--muted)]">
                  Editorial brand profiles: manufacturing standards, transparency scores, and evidence quality ratings.
                </p>
                <span className="mt-4 text-sm font-bold text-[var(--text)]">Browse brands →</span>
              </Link>
            ) : (
              <div className="flex flex-col gap-1 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6 opacity-60">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Brands</span>
                <strong className="mt-1 text-2xl font-semibold">Coming soon</strong>
                <p className="mt-2 text-sm leading-[1.6] text-[var(--muted)]">
                  Editorial brand profiles with transparency scores, manufacturing standards, and evidence quality ratings.
                </p>
                <span className="mt-4 text-xs font-bold uppercase tracking-[0.1em] text-[var(--muted)]">In preparation</span>
              </div>
            )}
          </div>
        </section>

        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
          }}
          type="application/ld+json"
        />
      </main>
      <SiteFooter />
    </>
  );
}
