import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import matter from "gray-matter";
import ts from "typescript";

const strictMode = process.argv.includes("--strict");
const rootDir = process.cwd();
const postsDir = path.join(rootDir, "content", "posts");
const directoryPath = path.join(rootDir, "lib", "directory.ts");
const require = createRequire(import.meta.url);

const minWordsWarning = 220;
const minWordsError = 80;
const minHeadingWarning = 2;
const minExternalLinksWarning = 2;
const minInternalLinksWarning = 1;

const uncertaintyPattern =
  /\b(limited|mixed|uncertain|insufficient|preclinical|heterogeneous|monitor|risk|caution|contraindicat|needs?\s+monitoring|early[-\s]?stage|unknown)\b/i;
const hypePattern =
  /\b(miracle cure|guaranteed|instantly|overnight|magic bullet|secret trick|no downside|zero risk)\b/i;
const markdownLinkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
const headingPattern = /^#{2,3}\s+/gm;

function loadDirectoryModule() {
  const source = fs.readFileSync(directoryPath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020
    }
  }).outputText;

  const moduleObj = { exports: {} };
  const context = vm.createContext({
    module: moduleObj,
    exports: moduleObj.exports,
    require,
    process,
    console,
    URL,
    Date,
    Set,
    Map,
    Error,
    RegExp
  });

  vm.runInContext(transpiled, context, { filename: directoryPath });
  return moduleObj.exports;
}

function countWords(value) {
  return (value.match(/\b[\w'-]+\b/g) ?? []).length;
}

function getMarkdownLinks(markdown) {
  const links = [];
  for (const match of markdown.matchAll(markdownLinkPattern)) {
    const href = match[1]?.trim();
    if (href) links.push(href);
  }
  return links;
}

function isIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(date);
}

function daysFromNow(isoDate) {
  const now = new Date();
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const dateUtc = Date.parse(`${isoDate}T00:00:00Z`);
  return Math.floor((dateUtc - todayUtc) / (1000 * 60 * 60 * 24));
}

function summarizeByCode(issues) {
  const counts = new Map();
  for (const issue of issues) {
    counts.set(issue.code, (counts.get(issue.code) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function printIssueSamples(label, issues) {
  const sampleSize = Math.min(12, issues.length);
  if (sampleSize === 0) return;

  console.log(`\n${label} (sample ${sampleSize}/${issues.length}):`);
  for (const issue of issues.slice(0, sampleSize)) {
    console.log(`- ${issue.recordName}: [${issue.code}] ${issue.detail}`);
  }
}

function collectPostIssues(fileName, slugSet, issues) {
  const fullPath = path.join(postsDir, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const recordName = `posts/${fileName.replace(/\.mdx$/, "")}`;
  const frontmatter = data ?? {};
  const fileSlug = fileName.replace(/\.mdx$/, "");

  const frontmatterSlug = typeof frontmatter.slug === "string" ? frontmatter.slug.trim() : "";
  const slug = frontmatterSlug || fileSlug;
  const title = typeof frontmatter.title === "string" ? frontmatter.title.trim() : "";
  const date =
    (typeof frontmatter.date === "string" && frontmatter.date.trim()) ||
    (typeof frontmatter.publishDate === "string" && frontmatter.publishDate.trim()) ||
    "";
  const studyUrl =
    (typeof frontmatter.study_url === "string" && frontmatter.study_url.trim()) ||
    (typeof frontmatter.studyUrl === "string" && frontmatter.studyUrl.trim()) ||
    "";
  const hasDescriptionField =
    (typeof frontmatter.excerpt === "string" && frontmatter.excerpt.trim().length > 0) ||
    (typeof frontmatter.description === "string" && frontmatter.description.trim().length > 0) ||
    (typeof frontmatter.metaDescription === "string" && frontmatter.metaDescription.trim().length > 0);
  const taxonomyCount =
    (Array.isArray(frontmatter.tags) ? frontmatter.tags.length : 0) +
    (Array.isArray(frontmatter.keywords) ? frontmatter.keywords.length : 0) +
    (typeof frontmatter.category === "string" && frontmatter.category.trim().length > 0 ? 1 : 0);

  if (!title) {
    issues.push({
      severity: "error",
      code: "post_missing_title",
      recordName,
      detail: "Frontmatter requires a non-empty title."
    });
  }

  if (!frontmatterSlug) {
    issues.push({
      severity: "warning",
      code: "post_missing_slug_frontmatter",
      recordName,
      detail: "Slug is inferred from filename; adding explicit slug is recommended for portability."
    });
  } else if (!slugSet.has(slug)) {
    issues.push({
      severity: "warning",
      code: "post_slug_not_indexed",
      recordName,
      detail: `Slug "${slug}" was not discovered in content/posts.`
    });
  } else if (frontmatterSlug !== fileSlug) {
    issues.push({
      severity: "warning",
      code: "post_slug_filename_mismatch",
      recordName,
      detail: `Frontmatter slug "${frontmatterSlug}" differs from filename slug "${fileSlug}".`
    });
  }

  if (!date || !isIsoDate(date)) {
    issues.push({
      severity: "error",
      code: "post_invalid_date",
      recordName,
      detail: "Frontmatter date must use ISO format (YYYY-MM-DD)."
    });
  } else {
    const futureDays = daysFromNow(date);
    if (futureDays > 1) {
      issues.push({
        severity: "warning",
        code: "post_future_date",
        recordName,
        detail: `Post date is ${futureDays} day(s) in the future. Confirm if this should be scheduled content.`
      });
    }
  }

  if (!hasDescriptionField) {
    issues.push({
      severity: "warning",
      code: "post_missing_description",
      recordName,
      detail: "Include excerpt/description/metaDescription for stronger snippets and social cards."
    });
  }

  if (studyUrl && !/^https?:\/\//.test(studyUrl)) {
    issues.push({
      severity: "warning",
      code: "post_invalid_study_url",
      recordName,
      detail: "study_url should be an absolute http(s) link."
    });
  }

  if (taxonomyCount === 0) {
    issues.push({
      severity: "warning",
      code: "post_missing_taxonomy",
      recordName,
      detail: "Add tags/keywords/category so this content can be discovered in search and related links."
    });
  }

  const wordCount = countWords(content);
  if (wordCount < minWordsError) {
    issues.push({
      severity: "error",
      code: "post_too_short_error",
      recordName,
      detail: `Post body has ${wordCount} words; add context, limitations, and practical guidance.`
    });
  } else if (wordCount < minWordsWarning) {
    issues.push({
      severity: "warning",
      code: "post_too_short_warning",
      recordName,
      detail: `Post body has ${wordCount} words; target ${minWordsWarning}+ words for better depth.`
    });
  }

  const headingCount = (content.match(headingPattern) ?? []).length;
  if (headingCount < minHeadingWarning) {
    issues.push({
      severity: "warning",
      code: "post_thin_structure",
      recordName,
      detail: `Only ${headingCount} section heading(s) found; use sections for readability and scanning.`
    });
  }

  const links = getMarkdownLinks(content);
  const externalLinks = links.filter((href) => /^https?:\/\//.test(href));
  const internalLinks = links.filter((href) => /^\/(posts|supplements|conditions|clinics|tags)\//.test(href));
  const hasTaxonomy =
    (Array.isArray(frontmatter.tags) && frontmatter.tags.length > 0) ||
    (Array.isArray(frontmatter.keywords) && frontmatter.keywords.length > 0) ||
    (typeof frontmatter.category === "string" && frontmatter.category.trim().length > 0);
  const effectiveExternalSources = externalLinks.length + (studyUrl ? 1 : 0);

  if (effectiveExternalSources === 0) {
    issues.push({
      severity: "error",
      code: "post_missing_external_sources",
      recordName,
      detail: "No external source links found in body content or study_url."
    });
  } else if (effectiveExternalSources < minExternalLinksWarning) {
    issues.push({
      severity: "warning",
      code: "post_low_external_sources",
      recordName,
      detail: `Only ${effectiveExternalSources} external source link(s) including study_url; prefer ${minExternalLinksWarning}+ sources.`
    });
  }

  if (internalLinks.length < minInternalLinksWarning && !hasTaxonomy) {
    issues.push({
      severity: "warning",
      code: "post_missing_internal_link",
      recordName,
      detail: "No internal links to posts/supplements/conditions/clinics/tags found and no taxonomy metadata present."
    });
  }

  if (!/(^|\n)##\s+(sources|references)\b/i.test(content)) {
    issues.push({
      severity: "warning",
      code: "post_missing_sources_heading",
      recordName,
      detail: "Use an explicit 'Sources' or 'References' section."
    });
  }

  if (!uncertaintyPattern.test(content)) {
    issues.push({
      severity: "warning",
      code: "post_missing_uncertainty_language",
      recordName,
      detail: "Include limitations/uncertainty language to keep claims evidence-calibrated."
    });
  }

  const hypeMatch = content.match(hypePattern);
  if (hypeMatch) {
    issues.push({
      severity: "warning",
      code: "post_hype_language",
      recordName,
      detail: `Potential hype phrase detected: "${hypeMatch[0]}".`
    });
  }
}

function collectDirectoryContentIssues(directory, postSlugs, issues) {
  const supplements = directory.getSupplements();
  const conditions = directory.getConditions();
  const clinics = directory.getClinics();

  for (const entry of supplements) {
    const recordName = `supplements/${entry.slug}`;

    if (countWords(entry.evidenceSummary) < 12) {
      issues.push({
        severity: "warning",
        code: "supplement_thin_evidence_summary",
        recordName,
        detail: "evidenceSummary is very short; add clearer context and limitations."
      });
    }

    if (entry.sourceUrls.length < 2) {
      issues.push({
        severity: "warning",
        code: "supplement_low_sources",
        recordName,
        detail: "Prefer at least two source URLs for better confidence calibration."
      });
    }

    if (!isIsoDate(entry.updatedAt)) {
      issues.push({
        severity: "error",
        code: "supplement_invalid_updated_at",
        recordName,
        detail: "updatedAt must be an ISO date (YYYY-MM-DD)."
      });
    }

    const futureDays = isIsoDate(entry.updatedAt) ? daysFromNow(entry.updatedAt) : 0;
    if (futureDays > 1) {
      issues.push({
        severity: "warning",
        code: "supplement_future_updated_at",
        recordName,
        detail: `updatedAt is ${futureDays} day(s) in the future.`
      });
    }

    const missingRefs = entry.articleRefs.filter((slug) => !postSlugs.has(slug));
    if (missingRefs.length > 0) {
      issues.push({
        severity: "error",
        code: "supplement_missing_article_ref",
        recordName,
        detail: `Referenced article slug(s) not found: ${missingRefs.join(", ")}.`
      });
    }
  }

  for (const entry of conditions) {
    const recordName = `conditions/${entry.slug}`;

    if (countWords(entry.guidanceSummary) < 14) {
      issues.push({
        severity: "warning",
        code: "condition_thin_guidance_summary",
        recordName,
        detail: "guidanceSummary is short; add practical context and boundaries."
      });
    }

    if (entry.topInterventions.length < 3) {
      issues.push({
        severity: "warning",
        code: "condition_low_interventions",
        recordName,
        detail: "topInterventions should usually include at least three options."
      });
    }

    if (entry.monitoring.length < 3) {
      issues.push({
        severity: "warning",
        code: "condition_low_monitoring_points",
        recordName,
        detail: "monitoring should include at least three follow-up markers."
      });
    }

    if (entry.sourceUrls.length < 2) {
      issues.push({
        severity: "warning",
        code: "condition_low_sources",
        recordName,
        detail: "Prefer at least two source URLs for better confidence calibration."
      });
    }

    if (!isIsoDate(entry.updatedAt)) {
      issues.push({
        severity: "error",
        code: "condition_invalid_updated_at",
        recordName,
        detail: "updatedAt must be an ISO date (YYYY-MM-DD)."
      });
    }
  }

  for (const entry of clinics) {
    const recordName = `clinics/${entry.slug}`;
    if (entry.sourceUrls.length < 2) {
      issues.push({
        severity: "warning",
        code: "clinic_low_sources",
        recordName,
        detail: "Prefer at least two source URLs."
      });
    }

    if (!isIsoDate(entry.updatedAt)) {
      issues.push({
        severity: "error",
        code: "clinic_invalid_updated_at",
        recordName,
        detail: "updatedAt must be an ISO date (YYYY-MM-DD)."
      });
    }
  }
}

try {
  const directory = loadDirectoryModule();
  const postFiles = fs.readdirSync(postsDir).filter((file) => file.endsWith(".mdx"));
  const postSlugs = new Set(postFiles.map((file) => file.replace(/\.mdx$/, "")));
  const issues = [];

  for (const fileName of postFiles) {
    collectPostIssues(fileName, postSlugs, issues);
  }

  collectDirectoryContentIssues(directory, postSlugs, issues);
  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");
  const byCode = summarizeByCode(issues);

  console.log("Content Quality Report");
  console.log(`- Posts: ${postFiles.length}`);
  console.log(`- Supplements: ${directory.getSupplements().length}`);
  console.log(`- Conditions: ${directory.getConditions().length}`);
  console.log(`- Clinics: ${directory.getClinics().length}`);
  console.log(`- Errors: ${errors.length}`);
  console.log(`- Warnings: ${warnings.length}`);

  if (byCode.length > 0) {
    console.log("\nIssue counts by code:");
    for (const [code, count] of byCode) {
      console.log(`- ${code}: ${count}`);
    }
  }

  printIssueSamples("Errors", errors);
  printIssueSamples("Warnings", warnings);

  if (errors.length > 0) process.exit(1);
  if (strictMode && warnings.length > 0) process.exit(1);
} catch (error) {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  console.error(`Content quality report failed:\n${message}`);
  process.exit(1);
}
