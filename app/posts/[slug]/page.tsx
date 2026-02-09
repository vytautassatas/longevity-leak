import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx-components";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatDate, getAllPosts, getRelatedPosts } from "@/lib/posts";
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
  const postUrl = `${siteConfig.url}/posts/${post.slug}`;

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
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1180px] px-5 pb-12 pt-10">
        <Link className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]" href="/">
          ← Back to news
        </Link>

        <article className="news-card mt-6 rounded-2xl border border-[var(--border)] px-5 py-7 sm:px-8 sm:py-9">
          <header className="border-b border-[var(--border)] pb-8">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime} · LONGEVITY LEAK
            </p>
            <h1 className="mt-4 max-w-4xl text-[44px] font-semibold leading-[1.08] tracking-tight sm:text-[58px]">{post.title}</h1>
            <p className="mt-4 max-w-3xl text-[19px] leading-[1.8] text-[var(--muted)]">{post.excerpt}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                className="inline-flex items-center rounded-full border border-[var(--accent)] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-white"
                href={post.study_url}
                rel="noopener noreferrer"
                target="_blank"
              >
                Read the study
              </a>
              <Link
                className="inline-flex items-center rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-[var(--text)]"
                href="/feed.xml"
              >
                Follow via RSS
              </Link>
            </div>
            <nav aria-label="Tags" className="mt-5 flex flex-wrap gap-2">
              {post.tags.filter(Boolean).map((tag) => (
                <Link
                  key={tag}
                  className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                  href={`/tags/${tag.toLowerCase()}`}
                >
                  {tag}
                </Link>
              ))}
            </nav>
          </header>

          <section className="mt-8 max-w-3xl rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-5 sm:p-6">
            <h2 className="text-xl font-extrabold leading-[1.2]">Clinical Brief</h2>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Source</dt>
                <dd className="mt-1 text-[var(--text)]">Peer-reviewed clinical study</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Published</dt>
                <dd className="mt-1 text-[var(--text)]">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Topic</dt>
                <dd className="mt-1 text-[var(--text)]">{post.tags.slice(0, 3).join(" · ")}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Reading Time</dt>
                <dd className="mt-1 text-[var(--text)]">{post.readingTime}</dd>
              </div>
            </dl>
          </section>

          <section className="mt-10 max-w-3xl">
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

          <section className="mt-12 max-w-3xl border-t border-[var(--border)] pt-7">
            <h2 className="text-xl font-extrabold leading-[1.2]">Study Link</h2>
            <p className="mt-3 text-[var(--muted)]">Read the source paper directly.</p>
            <a
              className="mt-4 inline-flex items-center rounded-full border border-[var(--accent)] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-white"
              href={post.study_url}
              rel="noopener noreferrer"
              target="_blank"
            >
              Read the study →
            </a>
          </section>
        </article>

        {relatedPosts.length > 0 && (
          <section className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-extrabold leading-[1.2]">Related posts</h2>
            <ul className="mt-4 grid gap-3">
              {relatedPosts.map((related) => (
                <li key={related.slug} className="rounded-xl border border-[var(--border)] px-4 py-3">
                  <Link className="font-semibold transition-colors hover:text-[var(--accent)]" href={`/posts/${related.slug}`}>
                    {related.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="news-card mt-12 max-w-3xl rounded-2xl border border-[var(--border)] p-5 sm:p-6">
          <h2 className="text-2xl font-extrabold leading-[1.2]">Get the next leak</h2>
          <form action="#" className="mt-4 flex flex-col gap-3 sm:flex-row" method="post">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              className="h-11 flex-1 rounded-full border border-[var(--border)] bg-transparent px-4 text-base outline-none transition-colors focus:border-[var(--accent)]"
              id="email"
              name="email"
              placeholder="you@company.com"
              type="email"
            />
            <button
              className="h-11 rounded-full bg-[var(--accent)] px-5 font-semibold text-white transition-opacity hover:opacity-90"
              type="submit"
            >
              Get the next leak
            </button>
          </form>
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
