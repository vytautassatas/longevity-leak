import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteConfig.url}/posts/${post.slug}</link>
        <guid>${siteConfig.url}/posts/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.metaDescription}]]></description>
      </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${siteConfig.name}</title>
      <link>${siteConfig.url}</link>
      <description>${siteConfig.description}</description>
      ${items}
    </channel>
  </rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
