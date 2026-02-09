import Link from "next/link";
import { formatDate, type Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }): JSX.Element {
  return (
    <article className="border-b border-[var(--border)] py-6">
      <header className="space-y-2">
        <h2 className="text-3xl font-extrabold leading-[1.2] tracking-tight">
          <Link className="transition-colors hover:text-[var(--accent)]" href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        <p className="excerpt-one-line text-sm text-[var(--muted)]">{post.excerpt}</p>
        <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
        </p>
      </header>
    </article>
  );
}
