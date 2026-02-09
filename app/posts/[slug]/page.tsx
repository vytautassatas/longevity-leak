import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ThemeToggle } from "@/components/theme-toggle";
import { mdxComponents } from "@/components/mdx-components";
import { formatDate, getAllPosts, getRelatedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getAllPosts().find((item) => item.slug === params.slug);

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

export default function PostPage({ params }: { params: Params }): JSX.Element {
  const posts = getAllPosts();
  const post = posts.find((item) => item.slug === params.slug);

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
    <main className="mx-auto max-w-[660px] px-5 pb-16 pt-8">
      <header className="mb-8 flex items-center justify-between">
        <Link className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]" href="/">
          ← Back
        </Link>
        <ThemeToggle />
      </header>

      <article>
        <header>
          <h1 className="text-5xl font-extrabold leading-[1.2] tracking-tight">{post.title}</h1>
          <p className="mt-4 text-sm uppercase tracking-wide text-[var(--muted)]">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
          </p>
          <nav aria-label="Tags" className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                className="rounded border border-[var(--border)] px-2 py-1 text-xs uppercase tracking-wide text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                href={`/tags/${tag.toLowerCase()}`}
              >
                {tag}
              </Link>
            ))}
          </nav>
        </header>

        <section className="mt-8">
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

        <p className="mt-10">
          <a
            className="inline-flex items-center rounded border border-[var(--accent)] px-4 py-2 font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-white"
            href={post.study_url}
            rel="noopener noreferrer"
            target="_blank"
          >
            Read the study →
          </a>
        </p>
      </article>

      {relatedPosts.length > 0 && (
        <section className="mt-14 border-t border-[var(--border)] pt-8">
          <h2 className="text-2xl font-extrabold leading-[1.2]">Related posts</h2>
          <ul className="mt-4 space-y-3">
            {relatedPosts.map((related) => (
              <li key={related.slug}>
                <Link className="font-semibold transition-colors hover:text-[var(--accent)]" href={`/posts/${related.slug}`}>
                  {related.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-14 border-t border-[var(--border)] pt-8">
        <h2 className="text-2xl font-extrabold leading-[1.2]">Get the next leak</h2>
        <form action="#" className="mt-4 flex flex-col gap-3 sm:flex-row" method="post">
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            className="h-11 flex-1 rounded border border-[var(--border)] bg-transparent px-3 text-base outline-none transition-colors focus:border-[var(--accent)]"
            id="email"
            name="email"
            placeholder="you@company.com"
            type="email"
          />
          <button
            className="h-11 rounded bg-[var(--accent)] px-5 font-semibold text-white transition-opacity hover:opacity-90"
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
  );
}
