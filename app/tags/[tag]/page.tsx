import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

type Params = { tag: string };
type MaybePromise<T> = T | Promise<T>;

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: MaybePromise<Params> }): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const tag = (resolvedParams.tag ?? "").toLowerCase();
  const title = `Posts tagged: ${tag}`;
  const description = `Clinical study breakdowns for ${tag}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/tags/${tag}`
    },
    openGraph: {
      title: `${title} | Longevity Leak`,
      description,
      type: "website",
      url: `${siteConfig.url}/tags/${tag}`
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
  const tag = (resolvedParams.tag ?? "").toLowerCase();
  const posts = getPostsByTag(tag);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl px-5 pb-12 pt-10">
        <header className="mb-7">
          <Link className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]" href="/">
            ← Back to news
          </Link>
          <h1 className="mt-4 text-5xl font-extrabold leading-[1.1] tracking-tight">Posts tagged: {tag}</h1>
        </header>

        <nav aria-label={`Posts tagged ${tag}`} className="grid gap-4 sm:gap-5">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
