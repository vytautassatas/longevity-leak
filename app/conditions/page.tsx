import type { Metadata } from "next";
import Link from "next/link";
import { ConditionCard } from "@/components/directory-card";
import { EvidenceRiskGuide } from "@/components/evidence-risk-guide";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getConditions } from "@/lib/directory";
import { layout } from "@/lib/layout";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions Directory",
  description: "Condition-level longevity strategies organized by intervention quality and practical guidance.",
  alternates: {
    canonical: "/conditions"
  },
  openGraph: {
    title: "Conditions Directory | Longevity Leak",
    description: "Condition-level longevity strategies organized by intervention quality and practical guidance.",
    type: "website",
    url: `${siteConfig.url}/conditions`
  }
};

export default function ConditionsPage(): JSX.Element {
  const conditions = getConditions();

  return (
    <>
      <SiteHeader />
      <main className={layout.rails.wide}>
        <header className={layout.hero.shell}>
          <Link className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--text)]" href="/">
            ← Back to home
          </Link>
          <p className={`mt-5 ${layout.hero.eyebrow}`}>Conditions Directory</p>
          <h1 className={layout.hero.title}>Start with the outcome. Then choose interventions.</h1>
          <p className={layout.hero.lead}>
            Each condition profile maps top interventions, evidence confidence, and where supplements fit within full-stack clinical strategy.
          </p>
          <p className={layout.hero.badge}>
            {conditions.length} conditions mapped
          </p>
        </header>

        <EvidenceRiskGuide className={layout.spacing.section} />

        {conditions.length > 0 ? (
          <section className={`${layout.spacing.section} grid gap-6 md:grid-cols-2 lg:gap-8`}>
            {conditions.map((condition) => (
              <ConditionCard key={condition.slug} condition={condition} />
            ))}
          </section>
        ) : (
          <section className={`${layout.spacing.section} rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6 sm:p-8`}>
            <h2 className="text-xl font-semibold">No conditions published yet</h2>
            <p className="mt-3 text-sm leading-[1.7] text-[var(--muted)]">
              Condition profiles are being prepared. Browse supplements and related articles in the meantime.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-11 items-center rounded-full border border-[var(--border)] px-4 text-sm font-semibold transition-colors hover:border-[var(--border-strong)]"
                href="/supplements"
              >
                Browse supplements
              </Link>
              <Link
                className="inline-flex min-h-11 items-center rounded-full border border-[var(--border)] px-4 text-sm font-semibold transition-colors hover:border-[var(--border-strong)]"
                href="/posts"
              >
                Browse news
              </Link>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
