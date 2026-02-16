import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClinicCard } from "@/components/directory-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getClinics } from "@/lib/directory";
import { layout } from "@/lib/layout";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Clinics Directory",
  description: "Clinic profiles with protocol focus, specialization, and evidence-minded notes.",
  alternates: {
    canonical: "/clinics"
  },
  openGraph: {
    title: "Clinics Directory | Longevity Leak",
    description: "Clinic profiles with protocol focus, specialization, and evidence-minded notes.",
    type: "website",
    url: `${siteConfig.url}/clinics`
  }
};

export default function ClinicsPage(): JSX.Element {
  if (!siteConfig.features.clinics) notFound();
  const clinics = getClinics();

  return (
    <>
      <SiteHeader />
      <main className={layout.rails.wide}>
        <header className={layout.hero.shell}>
          <Link className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--text)]" href="/">
            ← Back to home
          </Link>
          <p className={`mt-5 ${layout.hero.eyebrow}`}>Clinics Directory</p>
          <h1 className={layout.hero.title}>Find clinics running serious longevity protocols.</h1>
          <p className={layout.hero.lead}>
            Evaluate clinics by specialization, diagnostic depth, and protocol maturity instead of marketing copy.
          </p>
          <p className={layout.hero.badge}>
            {clinics.length} clinic profiles tracked
          </p>
        </header>

        <section className={`${layout.spacing.section} ${layout.grids.cards}`}>
          {clinics.map((clinic) => (
            <ClinicCard key={clinic.slug} clinic={clinic} />
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
