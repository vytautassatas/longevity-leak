import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedPostCard, PostCard } from "@/components/post-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDirectoryCounts } from "@/lib/directory";
import { layout } from "@/lib/layout";
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
  const directoryLinks = [
    {
      href: "/supplements",
      label: "Supplements",
      value: `${counts.supplements} tracked`
    },
    {
      href: "/conditions",
      label: "Conditions",
      value: `${counts.conditions} strategies`
    },
    ...(siteConfig.features.clinics
      ? [
          {
            href: "/clinics",
            label: "Clinics",
            value: `${counts.clinics} profiles`
          }
        ]
      : [])
  ];

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
      <main className={layout.rails.wide}>
        <h1 className="sr-only">Longevity Leak News</h1>

        <section className={layout.hero.shell}>
          <p className={layout.hero.eyebrow}>Directory Beta</p>
          <h2 className={layout.hero.title}>Find what works by supplement and condition.</h2>
          <p className={layout.hero.lead}>
            We are building the world&apos;s most trusted longevity directory. Every listing includes intervention context, evidence levels, and source-backed summaries.
          </p>
          <div className={`mt-10 max-w-4xl grid gap-5 ${siteConfig.features.clinics ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            {directoryLinks.map((link) => (
              <Link key={link.href} className="directory-link" href={link.href}>
                <span>{link.label}</span>
                <strong>{link.value}</strong>
              </Link>
            ))}
          </div>
        </section>

        {featuredPost ? <FeaturedPostCard post={featuredPost} /> : null}

        <nav aria-label="Recent Posts" className={`${layout.spacing.section} grid gap-x-8 gap-y-12 md:grid-cols-2`}>
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
