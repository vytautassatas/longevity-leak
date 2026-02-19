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

function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}

export function generateStaticParams(): Params[] {
  return getAllTags().map((tag) => ({ tag: encodeTagParam(tag) }));
}

export async function generateMetadata({ params }: { params: MaybePromise<Params> }): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const tag = decodeTagParam(resolvedParams.tag ?? "");
  const displayTag = toTitleCase(tag);
  const encodedTag = encodeTagParam(tag);
  const title = `${displayTag} — Longevity Research`;
  const description = `Browse longevity research articles tagged with ${displayTag}.`;

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
  const displayTag = toTitleCase(tag);
  const posts = getPostsByTag(tag);

  return (
    <>
      <SiteHeader />
      <main className={layout.rails.wide}>
        <header className="mb-12 border-b border-[var(--border)] pb-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-[var(--muted)]">
            <Link className="transition-colors hover:text-[var(--text)]" href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <Link className="transition-colors hover:text-[var(--text)]" href="/#latest-research">News</Link>
            <span aria-hidden="true">›</span>
            <span className="text-[var(--text)]">{displayTag}</span>
          </nav>
          <h1 className="mt-6 text-[2.2rem] font-medium leading-[1.1] tracking-tight sm:text-6xl md:text-7xl">
            {displayTag}
          </h1>
          <p className="mt-4 text-sm text-[var(--muted)]">
            {posts.length} {posts.length === 1 ? "article" : "articles"}
          </p>
        </header>

        <nav aria-label={`Posts tagged ${displayTag}`} className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
