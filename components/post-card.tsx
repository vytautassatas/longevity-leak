import Link from "next/link";
import type { CSSProperties } from "react";
import { formatDate, type Post } from "@/lib/posts";

function panelStyle(seed: string): CSSProperties {
  const hash = seed.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const hueA = hash % 360;
  const hueB = (hash + 90) % 360;

  return {
    backgroundImage: `radial-gradient(120% 140% at 0% 100%, hsla(${hueA} 82% 56% / 0.22), transparent 48%), radial-gradient(120% 160% at 100% 0%, hsla(${hueB} 88% 64% / 0.16), transparent 56%), linear-gradient(150deg, #111317 10%, #050506 72%)`
  };
}

export function FeaturedPostCard({ post }: { post: Post }): JSX.Element {
  return (
    <article className="grid gap-6 border-b border-[var(--border)] py-10 lg:grid-cols-[1.4fr_1fr] lg:items-stretch">
      <div className="flex min-w-0 flex-col">
        <header className="space-y-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
          <h2 className="text-[42px] font-medium leading-[1.1] tracking-tight sm:text-5xl">
            <Link className="transition-colors hover:text-white" href={`/posts/${post.slug}`}>
              {post.title}
            </Link>
          </h2>
          <p className="max-w-2xl text-lg leading-[1.7] text-[var(--muted)]">{post.excerpt}</p>
        </header>
        <footer className="mt-auto flex items-center justify-between pt-8">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{post.tags[0] ?? "Study"}</p>
          <Link
            className="rounded-full border border-[var(--border-strong)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:border-[var(--text)]"
            href={`/posts/${post.slug}`}
          >
            Read
          </Link>
        </footer>
      </div>
      <Link
        aria-label={`Read ${post.title}`}
        className="block min-h-[260px] rounded-sm border border-[var(--border)]"
        href={`/posts/${post.slug}`}
        style={panelStyle(post.slug)}
      />
    </article>
  );
}

export function PostCard({ post }: { post: Post }): JSX.Element {
  return (
    <article className="min-w-0">
      <Link
        aria-label={`Read ${post.title}`}
        className="block aspect-[4/2.15] rounded-sm border border-[var(--border)]"
        href={`/posts/${post.slug}`}
        style={panelStyle(post.slug)}
      />
      <header className="space-y-3 pt-4">
        <h2 className="text-[33px] font-medium leading-[1.2] tracking-tight">
          <Link className="transition-colors hover:text-white" href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        <p className="text-lg leading-[1.7] text-[var(--muted)]">{post.excerpt}</p>
      </header>
      <footer className="mt-5 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <Link
          className="rounded-full border border-[var(--border-strong)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:border-[var(--text)]"
          href={`/posts/${post.slug}`}
        >
          Read
        </Link>
      </footer>
    </article>
  );
}
