import Link from "next/link";
import { formatDate, getTagHref, type Post } from "@/lib/posts";

export function FeaturedPostCard({ post }: { post: Post }): JSX.Element {
  const primaryTag = post.tags.find(Boolean);

  return (
    <article className="border-b border-[var(--border)] py-16">
      <div className="flex min-w-0 flex-col">
        <header className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
          <h2 className="text-4xl font-semibold leading-[1.1] sm:text-5xl md:text-6xl">
            <Link className="transition-opacity hover:opacity-80" href={`/posts/${post.slug}`}>
              {post.title}
            </Link>
          </h2>
          <p className="max-w-2xl text-xl font-normal leading-[1.6] text-[var(--muted)] sm:text-2xl">{post.excerpt}</p>
        </header>
        <footer className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          {primaryTag ? (
            <Link className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--text)] transition-opacity hover:opacity-80" href={getTagHref(primaryTag)}>
              {primaryTag}
            </Link>
          ) : (
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--text)]">Study</p>
          )}
          <Link
            className="inline-flex h-11 items-center rounded-full border border-[var(--border-strong)] px-7 text-sm font-bold uppercase tracking-[0.12em] transition-all hover:bg-[var(--text)] hover:text-[var(--bg)]"
            href={`/posts/${post.slug}`}
          >
            Read More
          </Link>
        </footer>
      </div>
    </article>
  );
}

export function PostCard({ post }: { post: Post }): JSX.Element {
  return (
    <article className="min-w-0 group">
      <header className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h2 className="text-2xl font-semibold leading-[1.2] md:text-3xl">
          <Link className="transition-opacity hover:opacity-80" href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        <p className="text-lg leading-[1.6] text-[var(--muted)] line-clamp-3">{post.excerpt}</p>
      </header>
      <footer className="mt-6">
        <Link
          className="inline-flex h-11 items-center rounded-full border border-[var(--border-strong)] px-6 text-xs font-bold uppercase tracking-[0.14em] transition-all hover:bg-[var(--text)] hover:text-[var(--bg)]"
          href={`/posts/${post.slug}`}
        >
          Read
        </Link>
      </footer>
    </article>
  );
}
