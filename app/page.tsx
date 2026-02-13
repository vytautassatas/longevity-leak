import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedPostCard, PostCard } from "@/components/post-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDirectoryCounts } from "@/lib/directory";
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
  const counts = getDirectoryCounts();
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
      <main className="mx-auto w-full max-w-[1360px] px-4 pb-24 pt-8 sm:px-5 sm:pt-12">
        <h1 className="sr-only">Longevity Leak News</h1>

        <section className="directory-shell rounded-3xl p-7 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Directory Beta</p>
          <h2 className="mt-4 max-w-3xl text-4xl sm:text-5xl md:text-6xl">Find what works by supplement, condition, and clinic.</h2>
          <p className="mt-5 max-w-2xl text-base text-[var(--muted)] sm:text-lg">
            We are building the world&apos;s most trusted longevity directory. Every listing includes intervention context, evidence levels, and source-backed summaries.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Link className="directory-link" href="/supplements">
              <span>Supplements</span>
              <strong>{counts.supplements} tracked</strong>
            </Link>
            <Link className="directory-link" href="/conditions">
              <span>Conditions</span>
              <strong>{counts.conditions} strategies</strong>
            </Link>
            <Link className="directory-link" href="/clinics">
              <span>Clinics</span>
              <strong>{counts.clinics} profiles</strong>
            </Link>
          </div>
        </section>

        {featuredPost ? <FeaturedPostCard post={featuredPost} /> : null}

        <nav aria-label="Recent Posts" className="grid gap-x-12 gap-y-14 pt-12 sm:gap-y-20 sm:pt-16 md:grid-cols-2 xl:grid-cols-3">
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
