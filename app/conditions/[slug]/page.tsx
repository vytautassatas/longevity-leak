import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EvidenceRiskNote } from "@/components/evidence-risk-guide";
import { RelatedLinksPanel } from "@/components/related-links-panel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getConditionBySlug, getConditionSlugs } from "@/lib/directory";
import { layout } from "@/lib/layout";
import {
  getPostLinkReasonForCondition,
  getPostsForConditionSlug,
  getSupplementLinkReasonForCondition,
  getSupplementsForConditionSlug
} from "@/lib/relationships";
import { siteConfig } from "@/lib/site";

type Params = { slug: string };
type MaybePromise<T> = T | Promise<T>;

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getConditionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: MaybePromise<Params> }): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const condition = getConditionBySlug(resolved.slug);

  if (!condition) return { title: "Condition Not Found" };

  const title = `${condition.name} Strategy Profile`;
  const description = `${condition.goal}. Evidence ${condition.evidenceLevel}. ${condition.guidanceSummary}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/conditions/${condition.slug}`
    },
    openGraph: {
      title: `${title} | Longevity Leak`,
      description,
      type: "article",
      url: `${siteConfig.url}/conditions/${condition.slug}`
    }
  };
}

export default async function ConditionDetailPage({ params }: { params: MaybePromise<Params> }): Promise<JSX.Element> {
  const resolved = await Promise.resolve(params);
  const condition = getConditionBySlug(resolved.slug);

  if (!condition) notFound();
  const relatedSupplements = getSupplementsForConditionSlug(condition.slug);
  const relatedPosts = getPostsForConditionSlug(condition.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: condition.name,
    description: condition.guidanceSummary,
    url: `${siteConfig.url}/conditions/${condition.slug}`,
    mainEntityOfPage: `${siteConfig.url}/conditions/${condition.slug}`
  };

  return (
    <>
      <SiteHeader />
      <main className={layout.rails.wide}>
        <header className="directory-shell rounded-3xl p-7 sm:p-10">
          <Link className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--text)]" href="/conditions">
            ← Back to conditions
          </Link>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Condition Strategy</p>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl">{condition.name}</h1>
          <p className="mt-5 max-w-3xl text-base text-[var(--muted)] sm:text-lg">{condition.goal}</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em]">Evidence Level {condition.evidenceLevel}</p>
        </header>

        <EvidenceRiskNote />

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl">Guidance Summary</h2>
          <p className="mt-4">{condition.guidanceSummary}</p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-2xl">Top Interventions</h2>
            <ul className="mt-4 grid gap-2 text-sm">
              {condition.topInterventions.map((item) => (
                <li key={item} className="rounded-lg border border-[var(--border)] px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-2xl">Monitoring Priorities</h2>
            <ul className="mt-4 grid gap-2 text-sm">
              {condition.monitoring.map((item) => (
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
            {condition.sourceUrls.map((url) => (
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
          items={relatedSupplements.map((supplement) => ({
            id: supplement.slug,
            href: `/supplements/${supplement.slug}`,
            eyebrow: `Evidence ${supplement.evidenceLevel} · ${supplement.safety}`,
            title: supplement.name,
            description: supplement.focus,
            reason: getSupplementLinkReasonForCondition(condition.slug, supplement.slug)
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
            reason: getPostLinkReasonForCondition(condition.slug, post.slug)
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
