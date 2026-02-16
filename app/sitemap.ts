import type { MetadataRoute } from "next";
import { getClinics, getConditions, getDirectoryLastModified, getSupplements } from "@/lib/directory";
import { getAllPosts, getAllTags, getPostsByTag } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const posts = getAllPosts();
  const siteLastModified = posts[0]?.date ?? "1970-01-01";
  const directoryLastModified = getDirectoryLastModified();
  const showClinics = siteConfig.features.clinics;

  const directoryUrls = ["/supplements", "/conditions", ...(showClinics ? ["/clinics"] : [])].map((path) => ({
    url: `${base}${path}`,
    lastModified: directoryLastModified
  }));
  const supplementUrls = getSupplements().map((entry) => ({
    url: `${base}/supplements/${entry.slug}`,
    lastModified: entry.updatedAt
  }));
  const conditionUrls = getConditions().map((entry) => ({
    url: `${base}/conditions/${entry.slug}`,
    lastModified: entry.updatedAt
  }));
  const clinicUrls = showClinics
    ? getClinics().map((entry) => ({
        url: `${base}/clinics/${entry.slug}`,
        lastModified: entry.updatedAt
      }))
    : [];

  const postUrls = posts.map((post) => ({
    url: `${base}/posts/${post.slug}`,
    lastModified: post.date
  }));

  const tagUrls = getAllTags().map((tag) => ({
    url: `${base}/tags/${tag}`,
    lastModified: getPostsByTag(tag)[0]?.date ?? siteLastModified
  }));

  return [{ url: base, lastModified: siteLastModified }, ...directoryUrls, ...supplementUrls, ...conditionUrls, ...clinicUrls, ...postUrls, ...tagUrls];
}
