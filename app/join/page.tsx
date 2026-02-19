import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { layout } from "@/lib/layout";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join Longevity Leak — Newsletter + Blood Tracker",
  description:
    "Know your biological age through bloodwork, not guesswork. Get longevity research in plain language weekly and track your biomarkers against optimal longevity ranges.",
  alternates: { canonical: "/join" },
  openGraph: {
    title: "Join Longevity Leak — Newsletter + Blood Tracker",
    description:
      "Know your biological age through bloodwork, not guesswork. Get longevity research in plain language weekly and track your biomarkers against optimal longevity ranges.",
    type: "website",
    url: `${siteConfig.url}/join`
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Longevity Leak — Newsletter + Blood Tracker",
    description:
      "Know your biological age through bloodwork, not guesswork. Get longevity research in plain language weekly and track your biomarkers against optimal longevity ranges."
  }
};

type BiomarkerCard = {
  name: string;
  predicts: string;
  optimalRange: string;
  standardRange: string;
  conditionSlug?: string;
  supplementSlug?: string;
};

const CORE_5: BiomarkerCard[] = [
  {
    name: "hs-CRP",
    predicts: "Systemic inflammation and cardiovascular event risk",
    optimalRange: "< 0.5 mg/L",
    standardRange: "< 3.0 mg/L (low risk)",
    conditionSlug: "inflammation"
  },
  {
    name: "Fasting Insulin",
    predicts: "Insulin resistance and metabolic syndrome progression",
    optimalRange: "< 5 µIU/mL",
    standardRange: "2–25 µIU/mL",
    conditionSlug: "insulin-resistance"
  },
  {
    name: "HbA1c",
    predicts: "3-month blood glucose average and diabetes trajectory",
    optimalRange: "< 5.3%",
    standardRange: "< 5.7% (normal)",
    conditionSlug: "metabolic-syndrome"
  },
  {
    name: "ApoB",
    predicts: "Atherosclerosis risk more precisely than LDL cholesterol",
    optimalRange: "< 70 mg/dL",
    standardRange: "< 130 mg/dL",
    conditionSlug: "cardiovascular-disease"
  },
  {
    name: "Homocysteine",
    predicts: "Cardiovascular and neurodegenerative disease risk, B-vitamin status",
    optimalRange: "< 8 µmol/L",
    standardRange: "< 15 µmol/L",
    conditionSlug: "cognitive-decline"
  }
];

const ESSENTIAL_5: BiomarkerCard[] = [
  {
    name: "Vitamin D (25-OH)",
    predicts: "Immune function, bone density, and longevity marker status",
    optimalRange: "50–80 ng/mL",
    standardRange: "20–50 ng/mL (sufficient)",
    conditionSlug: "immune-resilience",
    supplementSlug: "vitamin-d3"
  },
  {
    name: "Omega-3 Index",
    predicts: "Cardiac and cognitive protection; EPA+DHA incorporation in red blood cells",
    optimalRange: "> 8%",
    standardRange: "> 4% (adequate)",
    conditionSlug: "cardiovascular-disease",
    supplementSlug: "omega-3"
  },
  {
    name: "TSH / Free T4",
    predicts: "Thyroid function; fatigue, metabolic rate, and cognitive speed",
    optimalRange: "TSH 0.5–2.0 mIU/L (functional target)",
    standardRange: "TSH 0.4–4.0 mIU/L",
    conditionSlug: "fatigue-and-energy-decline"
  },
  {
    name: "Ferritin",
    predicts: "Iron stores; both deficiency and excess accelerate aging and oxidative stress",
    optimalRange: "70–150 ng/mL (men); 50–100 ng/mL (women)",
    standardRange: "12–300 ng/mL (men); 12–150 ng/mL (women)",
    conditionSlug: "fatigue-and-energy-decline"
  },
  {
    name: "Sex Hormones",
    predicts: "Muscle mass, bone density, mood, cognition, and longevity trajectory",
    optimalRange: "Age- and sex-specific functional targets",
    standardRange: "Laboratory reference range varies widely by lab",
    conditionSlug: "hormonal-decline"
  }
];

function BiomarkerCardItem({ marker }: { marker: BiomarkerCard }): JSX.Element {
  const linkSlug = marker.supplementSlug ?? marker.conditionSlug;
  const linkHref = marker.supplementSlug
    ? `/supplements/${marker.supplementSlug}`
    : marker.conditionSlug
    ? `/conditions/${marker.conditionSlug}`
    : null;

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-5">
      <header>
        <h3 className="text-base font-semibold">{marker.name}</h3>
        <p className="mt-1 text-sm leading-[1.6] text-[var(--muted)]">{marker.predicts}</p>
      </header>
      <dl className="mt-auto grid grid-cols-1 gap-1.5 text-sm">
        <div className="flex flex-col gap-0.5">
          <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-500">Optimal range</dt>
          <dd className="font-medium">{marker.optimalRange}</dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Standard lab range</dt>
          <dd className="text-[var(--muted)]">{marker.standardRange}</dd>
        </div>
      </dl>
      {linkHref && linkSlug ? (
        <Link
          className="mt-1 text-xs font-bold text-[var(--muted)] underline underline-offset-2 hover:text-[var(--text)]"
          href={linkHref}
        >
          {marker.supplementSlug ? "View supplement →" : "View condition →"}
        </Link>
      ) : null}
    </article>
  );
}

export default function JoinPage(): JSX.Element {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Join Longevity Leak",
    url: `${siteConfig.url}/join`,
    description:
      "Newsletter and blood tracker app for evidence-based longevity tracking. Know your biological age through biomarker monitoring."
  };

  return (
    <>
      <SiteHeader />
      <main className={layout.rails.wide}>
        <h1 className="sr-only">Join Longevity Leak — Newsletter and Blood Tracker</h1>

        {/* Hero */}
        <section aria-labelledby="join-hero-heading" className={layout.hero.shell}>
          <p className={layout.hero.eyebrow}>Newsletter + App</p>
          <h2 className={layout.hero.title} id="join-hero-heading">
            Know your real biological age.<br className="hidden sm:block" /> Bloodwork, not guesswork.
          </h2>
          <p className={layout.hero.lead}>
            Your chronological age is one number. Your biological age — measured through bloodwork — tells you where your body actually is on the longevity curve. We translate the research into plain language every week, and our tracker shows you exactly what to improve.
          </p>

          <form
            action="#signup-confirm"
            className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            method="GET"
          >
            <label className="sr-only" htmlFor="join-email">Your email address</label>
            <input
              className="h-11 flex-1 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-4 text-[0.95rem] text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              id="join-email"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
            <button
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg border border-[var(--border-strong)] px-6 text-sm font-bold uppercase tracking-[0.12em] transition-all hover:bg-[var(--text)] hover:text-[var(--bg)]"
              type="submit"
            >
              Get early access
            </button>
          </form>
          <p className="mt-3 text-xs text-[var(--muted)]">Free newsletter included. Blood tracker app in early access. No spam, no auto-renewals.</p>
        </section>

        {/* What You Get */}
        <section aria-labelledby="what-you-get-heading" className={layout.spacing.section}>
          <h2 className="text-2xl font-semibold" id="what-you-get-heading">What you get</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Weekly Newsletter */}
            <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                <span aria-hidden="true" className="text-emerald-500 text-lg">📬</span>
              </div>
              <h3 className="text-lg font-semibold">Weekly Newsletter</h3>
              <p className="text-sm leading-[1.7] text-[var(--muted)]">
                Longevity research translated into plain language. Every study is interpreted for what it means for your specific biomarkers — not just abstract statistics.
              </p>
              <ul className="mt-auto space-y-1.5 text-sm text-[var(--muted)]">
                <li className="flex gap-2"><span className="text-emerald-500 shrink-0">✓</span> One study, one clear takeaway</li>
                <li className="flex gap-2"><span className="text-emerald-500 shrink-0">✓</span> What it means for your blood markers</li>
                <li className="flex gap-2"><span className="text-emerald-500 shrink-0">✓</span> Uncertainty stated when evidence is thin</li>
              </ul>
              <span className="mt-2 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-500">
                Available now
              </span>
            </div>

            {/* Blood Tracker App */}
            <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
                <span aria-hidden="true" className="text-amber-500 text-lg">🩸</span>
              </div>
              <h3 className="text-lg font-semibold">Blood Tracker App</h3>
              <p className="text-sm leading-[1.7] text-[var(--muted)]">
                Enter your lab results and see where you stand — not against standard lab ranges, but against optimal longevity ranges validated in aging research. Get your biological age score.
              </p>
              <ul className="mt-auto space-y-1.5 text-sm text-[var(--muted)]">
                <li className="flex gap-2"><span className="text-amber-500 shrink-0">✓</span> Optimal vs. standard range comparison</li>
                <li className="flex gap-2"><span className="text-amber-500 shrink-0">✓</span> Biological age score from your results</li>
                <li className="flex gap-2"><span className="text-amber-500 shrink-0">✓</span> Reminders when to retest</li>
              </ul>
              <span className="mt-2 inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-500">
                Early access
              </span>
            </div>

            {/* Community */}
            <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6 opacity-70">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]">
                <span aria-hidden="true" className="text-[var(--muted)] text-lg">👥</span>
              </div>
              <h3 className="text-lg font-semibold">Community</h3>
              <p className="text-sm leading-[1.7] text-[var(--muted)]">
                Connect with others tracking the same biomarkers. Compare protocols, share what moved your numbers, and follow peer-reviewed discussions.
              </p>
              <ul className="mt-auto space-y-1.5 text-sm text-[var(--muted)]">
                <li className="flex gap-2"><span className="text-[var(--muted)] shrink-0">○</span> Peer tracking groups by marker</li>
                <li className="flex gap-2"><span className="text-[var(--muted)] shrink-0">○</span> Moderated, evidence-only discussion</li>
                <li className="flex gap-2"><span className="text-[var(--muted)] shrink-0">○</span> Monthly expert Q&amp;A</li>
              </ul>
              <span className="mt-2 inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                Coming soon
              </span>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section aria-labelledby="how-it-works-heading" className={layout.spacing.section}>
          <h2 className="text-2xl font-semibold" id="how-it-works-heading">How it works</h2>
          <p className="mt-2 text-[var(--muted)]">Three steps. No new equipment required.</p>
          <ol className="mt-8 grid gap-6 md:grid-cols-3" role="list">
            <li className="flex flex-col gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] text-sm font-bold">
                1
              </div>
              <h3 className="font-semibold">Get your bloodwork done</h3>
              <p className="text-sm leading-[1.7] text-[var(--muted)]">
                Order a panel at any lab — your GP, a direct-access lab, or a longevity clinic. Standard panels typically include most of the 10 key markers.
              </p>
            </li>
            <li className="flex flex-col gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] text-sm font-bold">
                2
              </div>
              <h3 className="font-semibold">Enter your results</h3>
              <p className="text-sm leading-[1.7] text-[var(--muted)]">
                Input your lab values into the tracker. We accept standard units and automatically convert where needed. No wearables, no subscriptions to devices.
              </p>
            </li>
            <li className="flex flex-col gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] text-sm font-bold">
                3
              </div>
              <h3 className="font-semibold">See your biological age and what to improve</h3>
              <p className="text-sm leading-[1.7] text-[var(--muted)]">
                Your results are scored against optimal longevity ranges — not just normal lab ranges. You see where you stand, which markers need attention, and which interventions have evidence behind them.
              </p>
            </li>
          </ol>
        </section>

        {/* The 10 Biomarkers */}
        <section aria-labelledby="biomarkers-heading" className={layout.spacing.section}>
          <h2 className="text-2xl font-semibold" id="biomarkers-heading">The 10 biomarkers we track</h2>
          <p className="mt-2 max-w-2xl text-[var(--muted)]">
            These markers are selected because they have the strongest evidence linking them to biological aging, disease risk, and longevity trajectory. Each has an optimal longevity range that is tighter than standard lab reference ranges.
          </p>
          <p className="mt-3 text-xs text-[var(--muted)]">
            Optimal ranges are research-derived targets, not diagnostic criteria. They do not replace clinical judgment.
          </p>

          <div className={`${layout.spacing.section}`}>
            <h3 className="mb-5 text-base font-bold uppercase tracking-[0.1em] text-[var(--muted)]">Core 5 — Metabolic and Inflammatory</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CORE_5.map((marker) => (
                <BiomarkerCardItem key={marker.name} marker={marker} />
              ))}
            </div>
          </div>

          <div className={`${layout.spacing.section}`}>
            <h3 className="mb-5 text-base font-bold uppercase tracking-[0.1em] text-[var(--muted)]">Essential 5 — Nutrient and Hormonal</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ESSENTIAL_5.map((marker) => (
                <BiomarkerCardItem key={marker.name} marker={marker} />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section aria-labelledby="pricing-heading" className={layout.spacing.section}>
          <h2 className="text-2xl font-semibold" id="pricing-heading">Pricing</h2>
          <p className="mt-2 text-[var(--muted)]">Simple. Start free.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:max-w-3xl">
            {/* Free tier */}
            <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6">
              <header>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Free</p>
                <p className="mt-2 text-3xl font-semibold">$0</p>
                <p className="mt-1 text-sm text-[var(--muted)]">No credit card required</p>
              </header>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><span className="text-emerald-500 shrink-0">✓</span> Weekly research newsletter</li>
                <li className="flex gap-2"><span className="text-emerald-500 shrink-0">✓</span> Full supplement directory access</li>
                <li className="flex gap-2"><span className="text-emerald-500 shrink-0">✓</span> Full conditions directory access</li>
                <li className="flex gap-2 text-[var(--muted)]"><span className="shrink-0">○</span> Blood tracker app (not included)</li>
                <li className="flex gap-2 text-[var(--muted)]"><span className="shrink-0">○</span> Community access (not included)</li>
              </ul>
              <a
                className="mt-auto inline-flex h-11 items-center justify-center rounded-lg border border-[var(--border-strong)] px-6 text-sm font-bold uppercase tracking-[0.12em] transition-all hover:bg-[var(--text)] hover:text-[var(--bg)]"
                href="#join-email"
              >
                Subscribe free →
              </a>
            </div>

            {/* Paid tier */}
            <div className="flex flex-col gap-4 rounded-2xl border-2 border-[var(--border-strong)] bg-[var(--surface-soft)] p-6">
              <header>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Tracker + Community</p>
                <p className="mt-2 text-3xl font-semibold">TBD</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Early access pricing coming soon</p>
              </header>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><span className="text-emerald-500 shrink-0">✓</span> Everything in Free</li>
                <li className="flex gap-2"><span className="text-emerald-500 shrink-0">✓</span> Blood tracker app — enter lab results</li>
                <li className="flex gap-2"><span className="text-emerald-500 shrink-0">✓</span> Biological age score from biomarkers</li>
                <li className="flex gap-2"><span className="text-emerald-500 shrink-0">✓</span> Optimal vs. standard range view</li>
                <li className="flex gap-2"><span className="text-emerald-500 shrink-0">✓</span> Retest reminders</li>
                <li className="flex gap-2 text-[var(--muted)]"><span className="text-[var(--muted)] shrink-0">○</span> Community access (when live)</li>
              </ul>
              <a
                className="mt-auto inline-flex h-11 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--text)] px-6 text-sm font-bold uppercase tracking-[0.12em] text-[var(--bg)] transition-all hover:opacity-80"
                href="#join-email"
              >
                Join the waitlist →
              </a>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          aria-labelledby="final-cta-heading"
          className={`${layout.spacing.section} mb-0 rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] p-9 sm:p-12`}
          id="signup-confirm"
        >
          <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl" id="final-cta-heading">
            Start tracking what actually predicts how you age.
          </h2>
          <p className="mt-4 max-w-xl text-[var(--muted)]">
            Join the newsletter for free. Get early access to the blood tracker when it launches. No spam, no auto-renewals. Unsubscribe any time.
          </p>
          <form
            action="#signup-confirm"
            className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            method="GET"
          >
            <label className="sr-only" htmlFor="final-email">Your email address</label>
            <input
              className="h-11 flex-1 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-4 text-[0.95rem] text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              id="final-email"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
            <button
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg border border-[var(--border-strong)] px-6 text-sm font-bold uppercase tracking-[0.12em] transition-all hover:bg-[var(--text)] hover:text-[var(--bg)]"
              type="submit"
            >
              Get early access
            </button>
          </form>
          <p className="mt-4 text-xs text-[var(--muted)]">
            See the{" "}
            <Link className="underline underline-offset-2 hover:text-[var(--text)]" href="/supplements">
              supplements directory
            </Link>{" "}
            or{" "}
            <Link className="underline underline-offset-2 hover:text-[var(--text)]" href="/conditions">
              conditions directory
            </Link>{" "}
            to explore what we track.
          </p>
        </section>

        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </main>
      <SiteFooter />
    </>
  );
}
