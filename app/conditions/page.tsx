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

        <section className={`${layout.spacing.section} grid gap-6 md:grid-cols-2 lg:gap-8`}>
          {conditions.map((condition) => (
            <ConditionCard key={condition.slug} condition={condition} />
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
