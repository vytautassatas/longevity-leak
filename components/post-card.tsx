import Link from "next/link";
import { formatDate, type Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }): JSX.Element {
  return (
    <article className="news-card rounded-2xl border border-[var(--border)] p-6 transition-colors hover:border-[var(--border-strong)]">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h2 className="text-3xl font-extrabold leading-[1.14] tracking-tight">
          <Link className="transition-colors hover:text-white" href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        <p className="text-base leading-[1.7] text-[var(--muted)]">{post.excerpt}</p>
      </header>
      <footer className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs uppercase tracking-wide">
        <p className="text-[var(--muted)]">{post.readingTime}</p>
        <Link className="font-semibold text-[var(--accent)]" href={`/posts/${post.slug}`}>
          Read →
        </Link>
      </footer>
      <nav aria-label="Post tags" className="mt-4 flex flex-wrap gap-2">
        {post.tags.slice(0, 3).map((tag) => (
          <Link
            key={tag}
            className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--muted)] transition-colors hover:text-[var(--text)]"
            href={`/tags/${tag.toLowerCase()}`}
          >
            {tag}
          </Link>
        ))}
      </nav>
    </article>
  );
}
