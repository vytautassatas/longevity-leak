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
      <main className="mx-auto w-full max-w-[900px] px-5 pb-24 pt-12">
        <Link className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--muted)] transition-colors hover:text-[var(--text)]" href="/">
          ← Back to news
        </Link>

        <article className="mt-10 overflow-hidden">
          <header className="border-b border-[var(--border)] pb-12">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--muted)]">
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime} · LONGEVITY LEAK
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-8 text-xl font-normal leading-[1.6] text-[var(--muted)] sm:text-2xl">
              {post.excerpt}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                className="inline-flex items-center rounded-full bg-[var(--text)] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[var(--bg)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                href={post.study_url}
                rel="noopener noreferrer"
                target="_blank"
              >
                Read Original Study
              </a>
              <Link
                className="inline-flex items-center rounded-full border border-[var(--border-strong)] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] transition-colors hover:bg-[var(--surface-soft)]"
                href="/feed.xml"
              >
                Follow via RSS
              </Link>
            </div>
            <nav aria-label="Tags" className="mt-8 flex flex-wrap gap-3">
              {post.tags.filter(Boolean).map((tag) => (
                <Link
                  key={tag}
                  className="rounded-full bg-[var(--surface-soft)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                  href={`/tags/${tag.toLowerCase()}`}
                >
                  {tag}
                </Link>
              ))}
            </nav>
          </header>

          <section className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-8 sm:p-10">
            <h2 className="text-2xl font-bold uppercase tracking-[0.1em]">Clinical Brief</h2>
            <dl className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Source</dt>
                <dd className="mt-2 text-xl font-medium text-[var(--text)]">Peer-reviewed Clinical Study</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Published</dt>
                <dd className="mt-2 text-xl font-medium text-[var(--text)]">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Primary Topic</dt>
                <dd className="mt-2 text-xl font-medium text-[var(--text)]">{post.tags[0] ?? "Longevity Research"}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Reading Time</dt>
                <dd className="mt-2 text-xl font-medium text-[var(--text)]">{post.readingTime}</dd>
              </div>
            </dl>
          </section>

          <section className="mt-16 prose-xl prose-stone dark:prose-invert">
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

          <section className="mt-24 border-t border-[var(--border)] pt-12">
            <h2 className="text-3xl font-bold tracking-tight">Source Documentation</h2>
            <p className="mt-4 text-xl text-[var(--muted)]">Access the original full-text paper for deeper clinical validation.</p>
            <a
              className="mt-8 inline-flex items-center rounded-full bg-[var(--text)] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[var(--bg)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              href={post.study_url}
              rel="noopener noreferrer"
              target="_blank"
            >
              Read Full Study →
            </a>
          </section>
        </article>

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
                    <h3 className="text-2xl font-medium tracking-tight">{related.title}</h3>
                    <p className="mt-2 text-lg text-[var(--muted)] line-clamp-2">{related.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-24 rounded-3xl bg-[var(--text)] p-10 sm:p-16 text-[var(--bg)]">
          <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">Get the next leak.</h2>
          <p className="mt-4 text-xl opacity-80 max-w-xl">Join 15,000+ researchers and longevity enthusiasts receiving the latest clinical insights.</p>
          <form action="#" className="mt-10 flex flex-col gap-4 sm:flex-row" method="post">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              className="h-14 flex-1 rounded-full border border-white/20 bg-white/10 px-6 text-lg outline-none transition-colors focus:bg-white/20"
              id="email"
              name="email"
              placeholder="Enter your email"
              type="email"
            />
            <button
              className="h-14 rounded-full bg-[var(--bg)] px-10 text-lg font-bold text-[var(--text)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              type="submit"
            >
              Subscribe
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
