import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EvidenceRiskNote } from "@/components/evidence-risk-guide";
import { RelatedLinksPanel } from "@/components/related-links-panel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getClinicBySlug, getClinicSlugs } from "@/lib/directory";
import {
  getConditionLinkReasonForClinic,
  getConditionsForClinicSlug,
  getPostLinkReasonForClinic,
  getPostsForClinicSlug,
  getSupplementLinkReasonForClinic,
  getSupplementsForClinicSlug
} from "@/lib/relationships";
import { siteConfig } from "@/lib/site";

type Params = { slug: string };
type MaybePromise<T> = T | Promise<T>;

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getClinicSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: MaybePromise<Params> }): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const clinic = getClinicBySlug(resolved.slug);

  if (!clinic) return { title: "Clinic Not Found" };

  const title = `${clinic.name} Clinic Profile`;
  const description = `${clinic.location}. ${clinic.specialization}. Evidence ${clinic.evidenceLevel}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/clinics/${clinic.slug}`
    },
    openGraph: {
      title: `${title} | Longevity Leak`,
      description,
      type: "article",
      url: `${siteConfig.url}/clinics/${clinic.slug}`
    }
  };
}

export default async function ClinicDetailPage({ params }: { params: MaybePromise<Params> }): Promise<JSX.Element> {
  const resolved = await Promise.resolve(params);
  const clinic = getClinicBySlug(resolved.slug);

  if (!clinic) notFound();
  const relatedConditions = getConditionsForClinicSlug(clinic.slug);
  const relatedSupplements = getSupplementsForClinicSlug(clinic.slug);
  const relatedPosts = getPostsForClinicSlug(clinic.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: clinic.name,
    medicalSpecialty: clinic.specialization,
    address: {
      "@type": "PostalAddress",
      addressLocality: clinic.location
    },
    url: `${siteConfig.url}/clinics/${clinic.slug}`
  };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[980px] px-4 pb-24 pt-8 sm:px-5 sm:pt-12">
        <header className="directory-shell rounded-3xl p-7 sm:p-10">
          <Link className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--text)]" href="/clinics">
            ← Back to clinics
          </Link>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{clinic.location}</p>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl">{clinic.name}</h1>
          <p className="mt-5 max-w-3xl text-base text-[var(--muted)] sm:text-lg">{clinic.specialization}</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em]">Evidence Level {clinic.evidenceLevel}</p>
        </header>

        <EvidenceRiskNote />

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl">Clinic Notes</h2>
          <p className="mt-4">{clinic.notes}</p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-2xl">Protocol Focus</h2>
            <ul className="mt-4 grid gap-2 text-sm">
              {clinic.protocolFocus.map((item) => (
                <li key={item} className="rounded-lg border border-[var(--border)] px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-2xl">Best For</h2>
            <ul className="mt-4 grid gap-2 text-sm">
              {clinic.bestFor.map((item) => (
                <li key={item} className="rounded-lg border border-[var(--border)] px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl">Source Links</h2>
          <ul className="mt-4 grid gap-2">
            {clinic.sourceUrls.map((url) => (
              <li key={url}>
                <a className="text-sm underline-offset-2 hover:underline" href={url} rel="noopener noreferrer" target="_blank">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <RelatedLinksPanel
          className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
          columns={2}
          items={relatedConditions.map((condition) => ({
            id: condition.slug,
            href: `/conditions/${condition.slug}`,
            eyebrow: `Evidence ${condition.evidenceLevel}`,
            title: condition.name,
            description: condition.goal,
            reason: getConditionLinkReasonForClinic(clinic.slug, condition.slug)
          }))}
          title="Related Conditions"
        />

        <RelatedLinksPanel
          className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
          columns={2}
          items={relatedSupplements.map((supplement) => ({
            id: supplement.slug,
            href: `/supplements/${supplement.slug}`,
            eyebrow: `Evidence ${supplement.evidenceLevel} · ${supplement.safety}`,
            title: supplement.name,
            description: supplement.focus,
            reason: getSupplementLinkReasonForClinic(clinic.slug, supplement.slug)
          }))}
          title="Related Supplements"
        />

        <RelatedLinksPanel
          className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
          items={relatedPosts.slice(0, 8).map((post) => ({
            id: post.slug,
            href: `/posts/${post.slug}`,
            eyebrow: post.date,
            title: post.title,
            description: post.excerpt,
            reason: getPostLinkReasonForClinic(clinic.slug, post.slug)
          }))}
          title="Related Articles"
        />

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
