import type { Metadata } from "next";
import Link from "next/link";
import { ClinicCard } from "@/components/directory-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getClinics } from "@/lib/directory";
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
  const clinics = getClinics();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-8 sm:px-5 sm:pt-12">
        <header className="directory-shell rounded-3xl p-7 sm:p-10">
          <Link className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--text)]" href="/">
            ← Back to home
          </Link>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Clinics Directory</p>
          <h1 className="mt-4 max-w-4xl text-4xl sm:text-5xl md:text-6xl">Find clinics running serious longevity protocols.</h1>
          <p className="mt-5 max-w-3xl text-base text-[var(--muted)] sm:text-lg">
            Evaluate clinics by specialization, diagnostic depth, and protocol maturity instead of marketing copy.
          </p>
          <p className="mt-5 inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em]">
            {clinics.length} clinic profiles tracked
          </p>
        </header>

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {clinics.map((clinic) => (
            <ClinicCard key={clinic.slug} clinic={clinic} />
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
