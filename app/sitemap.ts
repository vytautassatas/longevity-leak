import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const postUrls = getAllPosts().map((post) => ({
    url: `${base}/posts/${post.slug}`,
    lastModified: post.date
  }));

  const tagUrls = getAllTags().map((tag) => ({
    url: `${base}/tags/${tag}`,
    lastModified: new Date().toISOString()
  }));

  return [{ url: base, lastModified: new Date().toISOString() }, ...postUrls, ...tagUrls];
}
