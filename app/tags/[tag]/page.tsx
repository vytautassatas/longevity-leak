import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { layout } from "@/lib/layout";
import { decodeTagParam, encodeTagParam, getAllTags, getPostsByTag } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

type Params = { tag: string };
type MaybePromise<T> = T | Promise<T>;

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getAllTags().map((tag) => ({ tag: encodeTagParam(tag) }));
}

export async function generateMetadata({ params }: { params: MaybePromise<Params> }): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const tag = decodeTagParam(resolvedParams.tag ?? "");
  const encodedTag = encodeTagParam(tag);
  const title = `Posts tagged: ${tag}`;
  const description = `Clinical study breakdowns for ${tag}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/tags/${encodedTag}`
    },
    openGraph: {
      title: `${title} | Longevity Leak`,
      description,
      type: "website",
      url: `${siteConfig.url}/tags/${encodedTag}`
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Longevity Leak`,
      description
    }
  };
}

export default async function TagPage({ params }: { params: MaybePromise<Params> }): Promise<JSX.Element> {
  const resolvedParams = await Promise.resolve(params);
  const tag = decodeTagParam(resolvedParams.tag ?? "");
  const posts = getPostsByTag(tag);

  return (
    <>
      <SiteHeader />
      <main className={layout.rails.wide}>
        <header className="mb-12 border-b border-[var(--border)] pb-12">
          <Link className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--text)]" href="/">
            ← Back to news
          </Link>
          <h1 className="mt-8 text-[2.2rem] font-medium leading-[1.1] tracking-tight sm:text-6xl md:text-7xl">
            Topic: <span className="capitalize text-[var(--muted)]">{tag}</span>
          </h1>
        </header>

        <nav aria-label={`Posts tagged ${tag}`} className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
