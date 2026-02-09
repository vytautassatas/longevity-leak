import type { Metadata } from "next";
import { FeaturedPostCard, PostCard } from "@/components/post-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Longevity Leak - Clinical Studies. Zero Jargon." },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description
  }
};

export default function HomePage(): JSX.Element {
  const posts = getAllPosts();
  const [featuredPost, ...restPosts] = posts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description
  };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1320px] px-5 pb-12 pt-7">
        <h1 className="sr-only">Longevity Leak News</h1>

        {featuredPost ? <FeaturedPostCard post={featuredPost} /> : null}

        <nav aria-label="Posts" className="grid gap-x-6 gap-y-9 pt-8 md:grid-cols-2 xl:grid-cols-3">
          {restPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </nav>

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
