import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { ThemeToggle } from "@/components/theme-toggle";
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
    <main className="mx-auto max-w-[660px] px-5 pb-14 pt-8">
      <header className="mb-8 flex items-center justify-between gap-4">
        <Link className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]" href="/">
          ← Back
        </Link>
        <ThemeToggle />
      </header>

      <h1 className="text-4xl font-extrabold leading-[1.2] tracking-tight">Posts tagged: {tag}</h1>

      <nav aria-label={`Posts tagged ${tag}`} className="mt-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </nav>
    </main>
  );
}
