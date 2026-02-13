import type { Metadata } from "next";
import Link from "next/link";
import { ConditionCard } from "@/components/directory-card";
import { EvidenceRiskGuide } from "@/components/evidence-risk-guide";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getConditions } from "@/lib/directory";
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
      <main className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-8 sm:px-5 sm:pt-12">
        <header className="directory-shell rounded-3xl p-7 sm:p-10">
          <Link className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--text)]" href="/">
            ← Back to home
          </Link>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Conditions Directory</p>
          <h1 className="mt-4 max-w-4xl text-4xl sm:text-5xl md:text-6xl">Start with the outcome. Then choose interventions.</h1>
          <p className="mt-5 max-w-3xl text-base text-[var(--muted)] sm:text-lg">
            Each condition profile maps top interventions, evidence confidence, and where supplements fit within full-stack clinical strategy.
          </p>
          <p className="mt-5 inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em]">
            {conditions.length} conditions mapped
          </p>
        </header>

        <EvidenceRiskGuide />

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {conditions.map((condition) => (
            <ConditionCard key={condition.slug} condition={condition} />
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
