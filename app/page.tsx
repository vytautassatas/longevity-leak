import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
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
      <main className="mx-auto w-full max-w-5xl px-5 pb-12 pt-12">
        <header className="mb-9 max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-[var(--border)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            WHAT'S NEW
          </p>
          <h1 className="text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">Latest from Longevity Leak</h1>
          <p className="mt-4 text-lg leading-[1.7] text-[var(--muted)]">
            Clinical studies. Zero jargon. The interventions worth your attention.
          </p>
        </header>

        <nav aria-label="Posts" className="grid gap-4 sm:gap-5">
          {posts.map((post) => (
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
