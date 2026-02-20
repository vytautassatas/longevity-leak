import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArticleSidebar } from "@/components/article-sidebar";
import { BackToTop } from "@/components/back-to-top";
import { EvidenceRiskNote } from "@/components/evidence-risk-guide";
import { ReadingProgress } from "@/components/reading-progress";
import { SubscribeForm } from "@/components/subscribe-form";
import { mdxComponents } from "@/components/mdx-components";
import { RelatedLinksPanel } from "@/components/related-links-panel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { layout } from "@/lib/layout";
import { formatDate, getAllPosts, getRelatedPosts, getTagHref } from "@/lib/posts";
import {
  getClinicLinkReasonForPost,
  getClinicsForPostSlug,
  getConditionsForSupplements,
  getExplicitSupplementsForPostSlug,
} from "@/lib/relationships";
import { siteConfig } from "@/lib/site";

type Params = { slug: string };
type MaybePromise<T> = T | Promise<T>;

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: MaybePromise<Params> }): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const post = getAllPosts().find((item) => item.slug === resolvedParams.slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const url = `${siteConfig.url}/posts/${post.slug}`;

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: {
      canonical: `/posts/${post.slug}`
    },
    openGraph: {
      title: `${post.title} | Longevity Leak`,
      description: post.metaDescription,
      type: "article",
      url
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Longevity Leak`,
      description: post.metaDescription
    }
  };
}

export default async function PostPage({ params }: { params: MaybePromise<Params> }): Promise<JSX.Element> {
  const resolvedParams = await Promise.resolve(params);
  const posts = getAllPosts();
  const post = posts.find((item) => item.slug === resolvedParams.slug);

  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post, 3);
  const relatedSupplements = getExplicitSupplementsForPostSlug(post.slug);
  const relatedConditions = getConditionsForSupplements(relatedSupplements);
  const relatedClinics = siteConfig.features.clinics ? getClinicsForPostSlug(post.slug) : [];
  const postUrl = `${siteConfig.url}/posts/${post.slug}`;
  const hasStudyUrl = typeof post.study_url === "string" && post.study_url.length > 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: siteConfig.author,
    description: post.metaDescription,
    mainEntityOfPage: postUrl,
    url: postUrl
  };

  return (
    <>
      <ReadingProgress />
      <BackToTop />
      <SiteHeader />
      <main className={layout.rails.wide}>
        <Link className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--text)]" href="/">
          ← Back to news
        </Link>

        <article className="mt-10 overflow-hidden">
          <header className="border-b border-[var(--border)] pb-10">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)] sm:text-sm">
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime} · LONGEVITY LEAK
            </p>
            <h1 className="mt-6 text-[2rem] font-semibold leading-[1.12] sm:text-[2.6rem] md:text-[3.1rem]">
              {post.title}
            </h1>
            <p className="mt-6 text-[1.08rem] font-normal leading-[1.75] text-[var(--muted)] sm:mt-7 sm:text-[1.2rem]">
              {post.excerpt}
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              {hasStudyUrl && (
                <a
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--text)] px-6 py-3 text-sm font-semibold text-[var(--bg)] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto sm:px-8 sm:py-4"
                  href={post.study_url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Read Original Study
                </a>
              )}
              <Link
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[var(--border-strong)] px-6 py-3 text-sm font-semibold transition-colors hover:bg-[var(--surface-soft)] sm:w-auto sm:px-8 sm:py-4"
                href="/feed.xml"
              >
                Follow via RSS
              </Link>
            </div>
            <nav aria-label="Tags" className="mt-8 flex flex-wrap gap-3">
              {post.tags.filter(Boolean).map((tag) => (
                <Link
                  key={tag}
                  className="interactive-chip px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.06em]"
                  href={getTagHref(tag)}
                >
                  {tag}
                </Link>
              ))}
            </nav>
          </header>

          <section className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-7 sm:p-9">
            <h2 className="text-[1.4rem] font-semibold tracking-tight sm:text-[1.6rem]">Clinical Brief</h2>
            <dl className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--muted)]">Source</dt>
                <dd className="mt-2 text-lg font-medium text-[var(--text)] sm:text-xl">Peer-reviewed Clinical Study</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--muted)]">Published</dt>
                <dd className="mt-2 text-lg font-medium text-[var(--text)] sm:text-xl">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--muted)]">Primary Topic</dt>
                <dd className="mt-2 text-lg font-medium text-[var(--text)] sm:text-xl">{post.tags[0] ?? "Longevity Research"}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--muted)]">Reading Time</dt>
                <dd className="mt-2 text-lg font-medium text-[var(--text)] sm:text-xl">{post.readingTime}</dd>
              </div>
            </dl>
          </section>

          <EvidenceRiskNote />

          <div className="mt-14 lg:grid lg:grid-cols-[1fr_340px] lg:gap-10 xl:grid-cols-[1fr_380px]">
            <section className="max-w-none">
              <MDXRemote
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm]
                  }
                }}
                source={post.content}
              />
            </section>

            <ArticleSidebar
              conditions={relatedConditions}
              supplements={relatedSupplements}
            />
          </div>

          {hasStudyUrl && (
            <section className="mt-24 border-t border-[var(--border)] pt-12">
              <h2 className="text-3xl font-bold tracking-tight">Source Documentation</h2>
              <p className="mt-4 text-xl text-[var(--muted)]">Access the original full-text paper for deeper clinical validation.</p>
              <a
                className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--text)] px-6 py-3 text-sm font-semibold text-[var(--bg)] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto sm:px-8 sm:py-4"
                href={post.study_url}
                rel="noopener noreferrer"
                target="_blank"
              >
                Read Full Study →
              </a>
            </section>
          )}
        </article>

        {siteConfig.features.clinics ? (
          <RelatedLinksPanel
            className="mt-24 border-t border-[var(--border)] pt-12"
            columns={2}
            items={relatedClinics.map((clinic) => ({
              id: clinic.slug,
              href: `/clinics/${clinic.slug}`,
              eyebrow: clinic.location,
              title: clinic.name,
              description: clinic.specialization,
              reason: getClinicLinkReasonForPost(post.slug, clinic.slug)
            }))}
            title="Related Clinics"
          />
        ) : null}

        {relatedPosts.length > 0 && (
          <section className="mt-24 border-t border-[var(--border)] pt-12">
            <h2 className="text-3xl font-bold tracking-tight">Further Reading</h2>
            <ul className="mt-8 grid gap-4">
              {relatedPosts.map((related) => (
                <li key={related.slug}>
                  <Link
                    className="block rounded-xl border border-[var(--border)] p-6 transition-all hover:border-[var(--text)] hover:shadow-md"
                    href={`/posts/${related.slug}`}
                  >
                    <h3 className="text-xl font-medium tracking-tight sm:text-2xl">{related.title}</h3>
                    <p className="mt-2 text-base text-[var(--muted)] sm:text-lg line-clamp-2">{related.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-24 rounded-3xl bg-[var(--text)] p-7 text-[var(--bg)] sm:p-16">
          <h2 className="text-3xl font-medium tracking-tight sm:text-5xl">Get the next leak.</h2>
          <p className="mt-4 max-w-xl text-base opacity-80 sm:text-xl">Join 1,988+ readers getting the latest longevity research weekly.</p>
          <SubscribeForm
            buttonLabel="Join the waitlist"
            className="mt-10"
            inputId="article-email"
            placeholder="Enter your email"
            variant="inline"
          />
        </section>

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
