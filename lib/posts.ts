import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostFrontmatter = {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  metaDescription: string;
  study_url: string;
  tags: string[];
};

export type Post = PostFrontmatter & {
  content: string;
  readingTime: string;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function sortByDateDesc(a: { date: string }, b: { date: string }): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
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
    ...frontmatter,
    content,
    readingTime: estimateReadingTime(content)
  };
}

export function getAllPosts(): Post[] {
  const posts = getPostSlugs().map((slug) => getPostBySlug(slug));
  return posts.sort(sortByDateDesc);
}

export function getAllTags(): string[] {
  const allTags = getAllPosts().flatMap((post) => post.tags.map((tag) => tag.toLowerCase()));
  return Array.from(new Set(allTags)).sort();
}

export function getPostsByTag(tag: string): Post[] {
  const lowered = tag.toLowerCase();
  return getAllPosts().filter((post) => post.tags.map((t) => t.toLowerCase()).includes(lowered));
}

export function getRelatedPosts(currentPost: Post, limit = 3): Post[] {
  const currentTags = currentPost.tags.map((tag) => tag.toLowerCase());

  return getAllPosts()
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const overlap = post.tags.filter((tag) => currentTags.includes(tag.toLowerCase())).length;
      return { post, overlap };
    })
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .slice(0, limit)
    .map(({ post }) => post);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(date));
}
