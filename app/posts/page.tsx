import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedPostCard, PostCard } from "@/components/post-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { layout } from "@/lib/layout";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "News",
  description: "Clinical longevity research with explicit evidence strength, uncertainty, and safety context.",
  alternates: { canonical: "/posts" },
  openGraph: {
    title: "News | Longevity Leak",
    description: "Clinical longevity research with explicit evidence strength, uncertainty, and safety context.",
    type: "website",
    url: `${siteConfig.url}/posts`
  }
};

export default function PostsPage(): JSX.Element {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <SiteHeader />
      <main className={layout.rails.detail}>
        <header className="border-b border-[var(--border)] pb-10">
          <p className={layout.hero.eyebrow}>Latest Research</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">News</h1>
          <p className={`${layout.hero.lead} mt-4`}>
            Clinical studies, supplement research, and protocol updates with direct evidence and risk framing.
          </p>
        </header>

        {featured ? (
          <>
            <FeaturedPostCard post={featured} />
            {rest.length > 0 && (
              <section className="mt-4">
                <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6 sm:p-8">
            <h2 className="text-xl font-semibold">No research posts published yet</h2>
            <p className="mt-3 max-w-2xl text-sm leading-[1.7] text-[var(--muted)]">
              Start with the directories while editorial content is being prepared.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-11 items-center rounded-full border border-[var(--border)] px-4 text-sm font-semibold transition-colors hover:border-[var(--border-strong)]"
                href="/supplements"
              >
                Browse supplements
              </Link>
              <Link
                className="inline-flex min-h-11 items-center rounded-full border border-[var(--border)] px-4 text-sm font-semibold transition-colors hover:border-[var(--border-strong)]"
                href="/conditions"
              >
                Browse conditions
              </Link>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
