import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceRiskGuide } from "@/components/evidence-risk-guide";
import { SupplementsBrowser } from "@/components/supplements-browser";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSupplements } from "@/lib/directory";
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
      <main className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-8 sm:px-5 sm:pt-12">
        <header className="directory-shell rounded-3xl p-7 sm:p-10">
          <Link className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--text)]" href="/">
            ← Back to home
          </Link>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Supplements Directory</p>
          <h1 className="mt-4 max-w-4xl text-4xl sm:text-5xl md:text-6xl">Find the right supplement by evidence, safety, and use case.</h1>
          <p className="mt-5 max-w-3xl text-base text-[var(--muted)] sm:text-lg">
            Every entry maps to article coverage and clinical context. Use filters to quickly narrow to compounds that match your risk tolerance and target outcomes.
          </p>
          <p className="mt-5 inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em]">
            {supplements.length} supplements indexed from current articles
          </p>
        </header>

        <EvidenceRiskGuide />

        <SupplementsBrowser supplements={supplements} />
      </main>
      <SiteFooter />
    </>
  );
}
