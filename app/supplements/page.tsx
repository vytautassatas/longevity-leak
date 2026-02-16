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

        <SupplementsBrowser className={layout.spacing.section} supplements={supplements} />
      </main>
      <SiteFooter />
    </>
  );
}
