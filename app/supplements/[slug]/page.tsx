import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EvidenceRiskNote } from "@/components/evidence-risk-guide";
import { RelatedLinksPanel } from "@/components/related-links-panel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSupplementBySlug, getSupplementSlugs } from "@/lib/directory";
import { getConditionsForSupplementSlug, getPostLinkReasonForSupplement, getPostsForSupplementSlug } from "@/lib/relationships";
import { siteConfig } from "@/lib/site";

type Params = { slug: string };
type MaybePromise<T> = T | Promise<T>;

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getSupplementSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: MaybePromise<Params> }): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const supplement = getSupplementBySlug(resolved.slug);

  if (!supplement) return { title: "Supplement Not Found" };

  const title = `${supplement.name} Evidence Profile`;
  const description = `${supplement.focus}. Evidence ${supplement.evidenceLevel}. ${supplement.evidenceSummary}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/supplements/${supplement.slug}`
    },
    openGraph: {
      title: `${title} | Longevity Leak`,
      description,
      type: "article",
      url: `${siteConfig.url}/supplements/${supplement.slug}`
    }
  };
}

export default async function SupplementDetailPage({ params }: { params: MaybePromise<Params> }): Promise<JSX.Element> {
  const resolved = await Promise.resolve(params);
  const supplement = getSupplementBySlug(resolved.slug);

  if (!supplement) notFound();
  const relatedPosts = getPostsForSupplementSlug(supplement.slug);
  const relatedConditions = getConditionsForSupplementSlug(supplement.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalEntity",
    name: supplement.name,
    description: supplement.evidenceSummary,
    url: `${siteConfig.url}/supplements/${supplement.slug}`,
    mainEntityOfPage: `${siteConfig.url}/supplements/${supplement.slug}`
  };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[980px] px-4 pb-24 pt-8 sm:px-5 sm:pt-12">
        <header className="directory-shell rounded-3xl p-7 sm:p-10">
          <Link className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--text)]" href="/supplements">
            ← Back to supplements
          </Link>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{supplement.focus}</p>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl">{supplement.name}</h1>
          <p className="mt-5 max-w-3xl text-base text-[var(--muted)] sm:text-lg">{supplement.evidenceSummary}</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em]">Evidence Level {supplement.evidenceLevel}</p>
        </header>

        <EvidenceRiskNote />

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl">Clinical Snapshot</h2>
          <dl className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Effect Size</dt>
              <dd className="mt-2">{supplement.effectSize}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Safety</dt>
              <dd className="mt-2">{supplement.safety}</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-[var(--muted)]">{supplement.cautions}</p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-2xl">Best Fit Profiles</h2>
            <ul className="mt-4 grid gap-2 text-sm">
              {supplement.bestFor.map((item) => (
                <li key={item} className="rounded-lg border border-[var(--border)] px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-2xl">Related Conditions</h2>
            <ul className="mt-4 flex flex-wrap gap-2 text-sm">
              {relatedConditions.length > 0
                ? relatedConditions.map((condition) => (
                    <li key={condition.slug}>
                      <Link className="rounded-full bg-[var(--surface-soft)] px-3 py-1 transition-colors hover:bg-[var(--surface)]" href={`/conditions/${condition.slug}`}>
                        {condition.name}
                      </Link>
                    </li>
                  ))
                : supplement.conditionTags.map((tag) => (
                    <li key={tag} className="rounded-full bg-[var(--surface-soft)] px-3 py-1">
                      {tag}
                    </li>
                  ))}
            </ul>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl">Source Links</h2>
          <ul className="mt-4 grid gap-2">
            {supplement.sourceUrls.map((url) => (
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
          items={relatedPosts.map((item) => ({
            id: item.slug,
            href: `/posts/${item.slug}`,
            eyebrow: item.date,
            title: item.title,
            description: item.excerpt,
            reason: getPostLinkReasonForSupplement(supplement.slug, item.slug)
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
