import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { ThemeToggle } from "@/components/theme-toggle";
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
    <main className="mx-auto max-w-[660px] px-5 pb-14 pt-8">
      <header className="mb-8 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-5xl font-extrabold uppercase leading-[1.2] tracking-tight">LONGEVITY LEAK</h1>
          <p className="mt-3 text-base leading-[1.7] text-[var(--muted)]">
            Clinical studies. Zero jargon. The stuff that actually works.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <nav aria-label="Posts">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </nav>

      <footer className="mt-10 flex items-center justify-between border-t border-[var(--border)] pt-6 text-sm text-[var(--muted)]">
        <p>© 2025 Longevity Leak</p>
        <Link className="underline underline-offset-4" href="/feed.xml">
          RSS
        </Link>
      </footer>

      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
        }}
        type="application/ld+json"
      />
    </main>
  );
}
