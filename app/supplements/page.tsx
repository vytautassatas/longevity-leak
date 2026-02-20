import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceRiskGuide } from "@/components/evidence-risk-guide";
import { SupplementsBrowser } from "@/components/supplements-browser";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSupplements } from "@/lib/directory";
import { layout } from "@/lib/layout";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Supplements Directory",
  description: "Evidence-tracked longevity supplements with safety and effect summaries.",
  alternates: {
    canonical: "/supplements"
  },
  openGraph: {
    title: "Supplements Directory | Longevity Leak",
    description: "Evidence-tracked longevity supplements with safety and effect summaries.",
    type: "website",
    url: `${siteConfig.url}/supplements`
  }
};

export default function SupplementsPage(): JSX.Element {
  const supplements = getSupplements();

  return (
    <>
      <SiteHeader />
      <main className={layout.rails.wide}>
        <header className={layout.hero.shell}>
          <Link className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--text)]" href="/">
            ← Back to home
          </Link>
          <p className={`mt-5 ${layout.hero.eyebrow}`}>Supplements Directory</p>
          <h1 className={layout.hero.title}>Find the right supplement by evidence, safety, and use case.</h1>
          <p className={layout.hero.lead}>
            Every entry maps to article coverage and clinical context. Use filters to quickly narrow to compounds that match your risk tolerance and target outcomes.
          </p>
          <p className={layout.hero.badge}>
            {supplements.length} supplements indexed from current articles
          </p>
        </header>

        <EvidenceRiskGuide className={layout.spacing.section} />

        {supplements.length > 0 ? (
          <SupplementsBrowser className={layout.spacing.section} supplements={supplements} />
        ) : (
          <section className={`${layout.spacing.section} rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6 sm:p-8`}>
            <h2 className="text-xl font-semibold">No supplements published yet</h2>
            <p className="mt-3 text-sm leading-[1.7] text-[var(--muted)]">
              Supplement profiles are being prepared. Browse condition guides and current research while this index is expanded.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-11 items-center rounded-full border border-[var(--border)] px-4 text-sm font-semibold transition-colors hover:border-[var(--border-strong)]"
                href="/conditions"
              >
                Browse conditions
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
