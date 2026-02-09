import Link from "next/link";
import type { CSSProperties } from "react";
import { formatDate, type Post } from "@/lib/posts";

function panelStyle(seed: string): CSSProperties {
  const hash = seed.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const hueA = hash % 360;
  const hueB = (hash + 90) % 360;

  // Reduced opacity for a more subtle, luxury feel
  return {
    backgroundImage: `radial-gradient(120% 140% at 0% 100%, hsla(${hueA} 82% 56% / 0.12), transparent 48%), radial-gradient(120% 160% at 100% 0%, hsla(${hueB} 88% 64% / 0.08), transparent 56%), var(--card-gradient)`
  };
}

export function FeaturedPostCard({ post }: { post: Post }): JSX.Element {
  return (
    <article className="grid gap-10 border-b border-[var(--border)] py-16 lg:grid-cols-[1.4fr_1fr] lg:items-center">
      <div className="flex min-w-0 flex-col">
        <header className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
          <h2 className="text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            <Link className="transition-opacity hover:opacity-80" href={`/posts/${post.slug}`}>
              {post.title}
            </Link>
          </h2>
          <p className="max-w-2xl text-xl leading-[1.6] text-[var(--muted)] md:text-2xl">{post.excerpt}</p>
        </header>
        <footer className="mt-10 flex items-center justify-between">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--text)]">{post.tags[0] ?? "Study"}</p>
          <Link
            className="rounded-full border border-[var(--border-strong)] px-8 py-3 text-sm font-bold uppercase tracking-[0.16em] transition-all hover:bg-[var(--text)] hover:text-[var(--bg)]"
            href={`/posts/${post.slug}`}
          >
            Read More
          </Link>
        </footer>
      </div>
      <Link
        aria-label={`Read ${post.title}`}
        className="block min-h-[400px] rounded-sm border border-[var(--border)] shadow-sm transition-transform hover:scale-[1.01]"
        href={`/posts/${post.slug}`}
        style={panelStyle(post.slug)}
      />
    </article>
  );
}

export function PostCard({ post }: { post: Post }): JSX.Element {
  return (
    <article className="min-w-0 group">
      <Link
        aria-label={`Read ${post.title}`}
        className="block aspect-[4/2.5] rounded-sm border border-[var(--border)] shadow-sm transition-transform group-hover:scale-[1.02]"
        href={`/posts/${post.slug}`}
        style={panelStyle(post.slug)}
      />
      <header className="space-y-4 pt-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h2 className="text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
          <Link className="transition-opacity hover:opacity-80" href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        <p className="text-lg leading-[1.6] text-[var(--muted)] line-clamp-3">{post.excerpt}</p>
      </header>
      <footer className="mt-6">
        <Link
          className="inline-block rounded-full border border-[var(--border-strong)] px-6 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-all hover:bg-[var(--text)] hover:text-[var(--bg)]"
          href={`/posts/${post.slug}`}
        >
          Read
        </Link>
      </footer>
    </article>
  );
}
