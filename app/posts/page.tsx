import type { Metadata } from "next";
import { FeaturedPostCard, PostCard } from "@/components/post-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { layout } from "@/lib/layout";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "News",
  description: "The latest clinical studies, supplement research, and longevity protocols — decoded weekly.",
  alternates: { canonical: "/posts" },
  openGraph: {
    title: "News | Longevity Leak",
    description: "The latest clinical studies, supplement research, and longevity protocols — decoded weekly.",
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
            Clinical studies, supplement research, and longevity protocols — decoded weekly. No noise, no jargon.
          </p>
        </header>

        {featured && <FeaturedPostCard post={featured} />}

        {rest.length > 0 && (
          <section className="mt-4">
            <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
