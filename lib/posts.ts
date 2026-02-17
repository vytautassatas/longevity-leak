import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostFrontmatter = {
  title?: string;
  date?: string;
  publishDate?: string;
  slug?: string;
  excerpt?: string;
  description?: string;
  metaDescription?: string;
  study_url?: string;
  studyUrl?: string;
  tags?: string[];
  keywords?: string[];
  category?: string;
  image?: string;
};

export type Post = {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  metaDescription: string;
  study_url: string;
  tags: string[];
  image?: string;
  content: string;
  readingTime: string;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function toUtcDate(date: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return new Date(date);
  const [, y, m, d] = match;
  return new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
}

function sortByDateDesc(a: { date: string }, b: { date: string }): number {
  return toUtcDate(b.date).getTime() - toUtcDate(a.date).getTime();
}

function normalizeTags(input: unknown): string[] {
  if (!Array.isArray(input)) return [];

  return input
    .filter((tag): tag is string => typeof tag === "string")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

function normalizeStudyUrl(input: unknown): string {
  if (typeof input !== "string") return "";
  const trimmed = input.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return "";
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const frontmatter = data as PostFrontmatter;

  return {
    title: frontmatter.title ?? slug,
    date: frontmatter.date ?? frontmatter.publishDate ?? "1970-01-01",
    slug: frontmatter.slug ?? slug,
    excerpt: frontmatter.excerpt ?? frontmatter.description ?? "",
    metaDescription: frontmatter.metaDescription ?? frontmatter.description ?? "",
    study_url: normalizeStudyUrl(frontmatter.study_url ?? frontmatter.studyUrl),
    tags: normalizeTags(frontmatter.tags).length > 0
      ? normalizeTags(frontmatter.tags)
      : [
          ...normalizeTags(frontmatter.keywords),
          ...(typeof frontmatter.category === "string" && frontmatter.category.trim() ? [frontmatter.category.trim()] : [])
        ],
    image: frontmatter.image,
    content,
    readingTime: estimateReadingTime(content)
  };
}

export function getAllPosts(): Post[] {
  const posts = getPostSlugs().map((slug) => getPostBySlug(slug));
  return posts.sort(sortByDateDesc);
}

export function getAllTags(): string[] {
  const allTags = getAllPosts().flatMap((post) => normalizeTags(post.tags).map((tag) => tag.toLowerCase()));
  return Array.from(new Set(allTags)).sort();
}

export function getPostsByTag(tag: string): Post[] {
  const lowered = tag.toLowerCase();
  return getAllPosts().filter((post) => normalizeTags(post.tags).some((t) => t.toLowerCase() === lowered));
}

export function getRelatedPosts(currentPost: Post, limit = 3): Post[] {
  const currentTags = normalizeTags(currentPost.tags).map((tag) => tag.toLowerCase());

  return getAllPosts()
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const overlap = normalizeTags(post.tags).filter((tag) => currentTags.includes(tag.toLowerCase())).length;
      return { post, overlap };
    })
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      return toUtcDate(b.post.date).getTime() - toUtcDate(a.post.date).getTime();
    })
    .slice(0, limit)
    .map(({ post }) => post);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  }).format(toUtcDate(date));
}
