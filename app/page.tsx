import type { Metadata } from "next";
import Link from "next/link";
import { SubscribeForm } from "@/components/subscribe-form";
import { PostCard } from "@/components/post-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDirectoryCounts } from "@/lib/directory";
import { layout } from "@/lib/layout";
import { getAllPosts, type Post } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

/* ── Newsletter hero: biomarker scroll panel ─────────────────────────── */

const heroScrollKeyframes = `
@keyframes heroScrollUp {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
@keyframes logoMarquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

const HERO_BIOMARKERS = [
  { marker: "HbA1c",              insight: "Optimal: below 5.3% — not 6.5%",                          tag: "CRITICAL",    cat: "Blood sugar"     },
  { marker: "hsCRP",              insight: "Inflammation's hidden damage threshold",                    tag: "HIGH IMPACT", cat: "Inflammation"    },
  { marker: "IGF-1",              insight: "The growth axis that predicts cancer + longevity",          tag: "CRITICAL",    cat: "Hormones"        },
  { marker: "Homocysteine",       insight: "Cardiovascular risk your GP routinely ignores",             tag: "HIGH IMPACT", cat: "Cardiovascular"  },
  { marker: "Vitamin D (25-OH)",  insight: "Deficiency in 40% of adults — optimal ≠ sufficient",       tag: "MEDIUM",      cat: "Micronutrients"  },
  { marker: "Fasting insulin",    insight: "Diabetes risk a decade before glucose spikes",              tag: "CRITICAL",    cat: "Metabolic"       },
  { marker: "ApoB",               insight: "Better cardiac risk predictor than LDL cholesterol",        tag: "HIGH IMPACT", cat: "Lipids"          },
  { marker: "ALT / AST",          insight: "Liver stress signal most panels dismiss too easily",        tag: "MEDIUM",      cat: "Liver"           },
  { marker: "eGFR",               insight: "Kidney function declines silently for years first",         tag: "HIGH IMPACT", cat: "Kidney"          },
  { marker: "Testosterone (free)", insight: "Free T predicts energy, mood & metabolic risk",            tag: "MEDIUM",      cat: "Hormones"        },
  { marker: "TSH + Free T3/T4",   insight: "Thyroid range 'normal' misses early dysfunction",          tag: "HIGH IMPACT", cat: "Thyroid"         },
  { marker: "DHEA-S",             insight: "Adrenal reserve and biological ageing marker",              tag: "MEDIUM",      cat: "Hormones"        },
];

const HERO_AVATARS = [
  { bg: "#4ade80", text: "#052e16", initials: "MK" },
  { bg: "#60a5fa", text: "#1e3a5f", initials: "AR" },
  { bg: "#f472b6", text: "#4a0025", initials: "SL" },
  { bg: "#fb923c", text: "#431407", initials: "JT" },
  { bg: "#a78bfa", text: "#2e1065", initials: "DW" },
];

const HERO_LOGOS = [
  { name: "Peter Attia MD",    style: "font-serif"    },
  { name: "Rhonda Patrick",    style: "font-sans"     },
  { name: "Nature Medicine",   style: "font-serif"    },
  { name: "Andrew Huberman",   style: "font-sans"     },
  { name: "Bryan Johnson",     style: "font-sans"     },
  { name: "David Sinclair",    style: "font-serif"    },
  { name: "Examine.com",       style: "font-mono"     },
  { name: "Mark Hyman MD",     style: "font-sans"     },
];

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

  // Duplicate biomarker list for seamless infinite CSS scroll loop
  const heroScrollCards = [...HERO_BIOMARKERS, ...HERO_BIOMARKERS];

  return (
    <>
      <SiteHeader />
      <h1 className="sr-only">Longevity Leak — Evidence-based longevity tracking</h1>

      {/* ── Hero: full-bleed newsletter signup ───────────────────────────── */}
      <section aria-labelledby="hero-heading" style={{ background: "var(--bg)" }}>
        <style>{heroScrollKeyframes}</style>

        {/*
          Layout: left column drives height naturally.
          Right column is position:absolute so it never inflates the row —
          it simply fills whatever height the left content creates.
        */}
        <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 px-5 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8 xl:grid-cols-[1fr_400px]">

          {/* ── LEFT: copy + form ── */}
          <div className="flex flex-col justify-center py-14 pr-0 lg:py-10 lg:pr-8 xl:py-16 xl:pr-10">

            <span
              className="mb-4 inline-block w-fit rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ borderColor: "var(--border-strong)", color: "var(--muted)", background: "var(--surface-soft)" }}
            >
              Early access open now · Limited spots
            </span>

            <h2
              id="hero-heading"
              className="max-w-xl font-serif text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[2.1rem] xl:text-[3rem]"
              style={{ color: "var(--text)" }}
            >
              Your doctor&apos;s &ldquo;normal&rdquo; results{" "}
              <em className="not-italic" style={{ color: "var(--text)" }}>
                could be shaving years off your life.
              </em>
            </h2>

            <p className="mt-4 max-w-md text-[0.925rem] leading-[1.7] lg:mt-3 lg:text-[0.875rem] xl:mt-4 xl:text-[1rem] xl:leading-[1.78]" style={{ color: "var(--muted)" }}>
              Every week we decode the clinical studies your GP doesn&apos;t have time to
              read — bloodwork, supplements, and longevity protocols. No noise. No jargon.
            </p>

            {/* Form */}
            <SubscribeForm
              className="mt-6 max-w-md lg:mt-5 xl:mt-7"
              inputId="hero-email"
              buttonLabel="Join the waitlist"
              variant="hero"
            />

            <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
              No credit card required. Unsubscribe any time.
            </p>

            {/* Avatar social proof */}
            <div className="mt-5 flex items-center gap-3 lg:mt-4 xl:mt-6">
              <div className="flex">
                {HERO_AVATARS.map((a, i) => (
                  <div
                    key={a.initials}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold"
                    style={{
                      background: a.bg,
                      color: a.text,
                      marginLeft: i === 0 ? 0 : -10,
                      position: "relative",
                      zIndex: HERO_AVATARS.length - i,
                      boxShadow: "0 0 0 2px var(--bg)"
                    }}
                  >
                    {a.initials}
                  </div>
                ))}
              </div>
              <p className="text-[12px] leading-tight" style={{ color: "var(--muted)" }}>
                <span className="font-semibold" style={{ color: "var(--text)" }}>1,988+</span> joined this week
              </p>
            </div>
          </div>

          {/* ── RIGHT: scrolling biomarker cards — absolute so it never inflates height ── */}
          <div
            className="absolute right-0 top-0 hidden h-full w-[340px] lg:block xl:w-[400px]"
            style={{ borderLeft: "1px solid var(--border)", overflow: "hidden" }}
          >
            {/* Top fade */}
            <div
              className="pointer-events-none absolute left-0 top-0 z-20 w-full"
              style={{ height: "80px", background: "linear-gradient(to bottom, var(--bg) 0%, transparent 100%)" }}
            />
            {/* Bottom fade */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 z-20 w-full"
              style={{ height: "80px", background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)" }}
            />
            {/* Scrolling track */}
            <div
              className="flex flex-col gap-2.5 px-5 py-4"
              style={{ animation: "heroScrollUp 36s linear infinite", willChange: "transform" }}
            >
              {heroScrollCards.map((m, i) => (
                <div
                  key={`${m.marker}-${i}`}
                  className="flex items-center justify-between gap-4 rounded-xl px-4 py-3"
                  style={{ border: "1px solid var(--border)", background: "var(--surface-soft)" }}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[0.82rem] font-semibold" style={{ color: "var(--text)" }}>{m.marker}</p>
                      <span
                        className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                        style={{ background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--border-strong)" }}
                      >
                        {m.cat}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] leading-[1.5]" style={{ color: "var(--muted)" }}>{m.insight}</p>
                  </div>
                  <span
                    className="shrink-0 rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                    style={
                      m.tag === "CRITICAL"
                        ? { borderColor: "rgba(239,68,68,0.35)", background: "rgba(239,68,68,0.08)", color: "#ef4444" }
                        : m.tag === "HIGH IMPACT"
                        ? { borderColor: "rgba(234,179,8,0.35)",  background: "rgba(234,179,8,0.08)",  color: "#ca8a04"  }
                        : { borderColor: "var(--border-strong)",   background: "var(--surface)",         color: "var(--muted)" }
                    }
                  >
                    {m.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div style={{ borderBottom: "1px solid var(--border)" }} />
      </section>

      {/* ── Logo marquee strip ───────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden py-5"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}
      >
        {/* Left fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24"
          style={{ background: "linear-gradient(to right, var(--bg) 0%, transparent 100%)" }}
        />
        {/* Right fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24"
          style={{ background: "linear-gradient(to left, var(--bg) 0%, transparent 100%)" }}
        />

        <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--muted)", opacity: 0.5 }}>
          Where the longevity community gathers
        </p>

        {/* Scrolling track — doubled for seamless loop */}
        <div
          className="flex items-center gap-10"
          style={{ animation: "logoMarquee 28s linear infinite", willChange: "transform", width: "max-content" }}
        >
          {[...HERO_LOGOS, ...HERO_LOGOS].map((logo, i) => (
            <span
              key={i}
              className={`shrink-0 text-[0.85rem] font-semibold tracking-tight ${logo.style}`}
              style={{ color: "var(--muted)", opacity: 0.55, whiteSpace: "nowrap" }}
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>

      <main className={layout.rails.wide}>

        {/* Latest Research */}
        <section id="latest-research" aria-labelledby="latest-heading" className={layout.spacing.section}>
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
