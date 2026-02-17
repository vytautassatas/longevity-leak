import { getConditions, getSupplements } from "@/lib/directory";
import { getAllPosts } from "@/lib/posts";
import type { SearchIndexItem, SearchIndexResponse } from "@/lib/search-types";

function cleanText(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeKeywords(values: string[]): string[] {
  const seen = new Set<string>();
  const normalized: string[] = [];

  for (const value of values) {
    const token = cleanText(value).toLowerCase();
    if (token.length < 2) continue;
    if (seen.has(token)) continue;
    seen.add(token);
    normalized.push(token);
  }

  return normalized;
}

function alphabetical(a: SearchIndexItem, b: SearchIndexItem): number {
  return a.title.localeCompare(b.title, "en", { sensitivity: "base" });
}

export function getSitewideSearchIndex(): SearchIndexResponse {
  const posts = getAllPosts().map<SearchIndexItem>((post) => ({
    id: `article:${post.slug}`,
    type: "article",
    title: cleanText(post.title),
    description: cleanText(post.excerpt || post.metaDescription || "Clinical longevity article."),
    href: `/posts/${post.slug}`,
    slug: post.slug,
    keywords: normalizeKeywords([...post.tags, post.slug.replaceAll("-", " ")]),
    updatedAt: post.date
  }));

  const supplements = getSupplements()
    .map<SearchIndexItem>((supplement) => ({
      id: `supplement:${supplement.slug}`,
      type: "supplement",
      title: cleanText(supplement.name),
      description: cleanText(`${supplement.focus}. ${supplement.evidenceSummary}`),
      href: `/supplements/${supplement.slug}`,
      slug: supplement.slug,
      keywords: normalizeKeywords([
        ...supplement.conditionTags,
        ...supplement.bestFor,
        supplement.focus,
        supplement.safety,
        `evidence ${supplement.evidenceLevel}`
      ]),
      updatedAt: supplement.updatedAt
    }))
    .sort(alphabetical);

  const conditions = getConditions()
    .map<SearchIndexItem>((condition) => ({
      id: `condition:${condition.slug}`,
      type: "condition",
      title: cleanText(condition.name),
      description: cleanText(`${condition.goal}. ${condition.guidanceSummary}`),
      href: `/conditions/${condition.slug}`,
      slug: condition.slug,
      keywords: normalizeKeywords([...condition.keywords, ...condition.topInterventions]),
      updatedAt: condition.updatedAt
    }))
    .sort(alphabetical);

  return {
    generatedAt: new Date().toISOString(),
    items: [...posts, ...supplements, ...conditions]
  };
}
