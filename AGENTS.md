# AGENTS.md

This file is the operational guide for contributors and coding agents working in `/Users/satas/Documents/GitHub/longevity-leak`.

## 1) Project Purpose And Product Standard

Longevity Leak is an evidence-first longevity content + directory site.

Core mission:
- Build the most trusted, evidence-first longevity directory experience.
- Help users make faster, safer, better-informed decisions.
- Prioritize factual clarity and navigation confidence over visual novelty.

Product stance:
- Clinical, premium, and highly legible.
- No hype or promise language.
- Explicit uncertainty and risk communication is mandatory.

This repo’s highest-priority directives are defined in `/Users/satas/Documents/GitHub/longevity-leak/CLAUDE.md` and are treated as required standards.

## 2) Tech Stack And Runtime Model

- Framework: Next.js 14 App Router
- Language: TypeScript (strict mode)
- Styling: Tailwind + CSS variables in `/Users/satas/Documents/GitHub/longevity-leak/app/globals.css`
- Content source: MDX files in `/Users/satas/Documents/GitHub/longevity-leak/content/posts`
- Directory data source: typed in-memory dataset in `/Users/satas/Documents/GitHub/longevity-leak/lib/directory.ts`

Key architecture traits:
- Core content pages are statically generated (`dynamicParams = false` on detail routes).
- Canonical host normalization is implemented in both:
  - `/Users/satas/Documents/GitHub/longevity-leak/lib/site.ts`
  - `/Users/satas/Documents/GitHub/longevity-leak/next.config.mjs`
- Optional host redirect is controlled by `NEXT_ENABLE_HOST_CANONICAL_REDIRECT`.
- Clinics surface is feature-flagged by `siteConfig.features.clinics` (currently `false`).

## 3) Information Architecture

Primary route groups:
- Home/news: `/`
- Posts: `/posts/[slug]`
- Tags: `/tags/[tag]`
- Supplements directory + details: `/supplements`, `/supplements/[slug]`
- Conditions directory + details: `/conditions`, `/conditions/[slug]`
- Clinics directory + details: `/clinics`, `/clinics/[slug]` (gated by feature flag)
- Search API: `/api/search`
- Feed: `/feed.xml`
- SEO infra: `/sitemap.xml` via `/Users/satas/Documents/GitHub/longevity-leak/app/sitemap.ts`, robots via `/Users/satas/Documents/GitHub/longevity-leak/app/robots.ts`

## 4) Data Model And Source Of Truth

### Posts
Defined by MDX frontmatter + body in `/Users/satas/Documents/GitHub/longevity-leak/content/posts/*.mdx`.

Consumed by `/Users/satas/Documents/GitHub/longevity-leak/lib/posts.ts`.

Important post fields:
- `title`
- `date` (ISO: `YYYY-MM-DD`; fallback `publishDate`)
- `slug`
- `excerpt`/`description`/`metaDescription`
- `study_url`/`studyUrl`
- `tags` (or `keywords`/`category` fallback)

### Directory entities
Defined in `/Users/satas/Documents/GitHub/longevity-leak/lib/directory.ts`:
- `SupplementEntry`
- `ConditionEntry`
- `ClinicEntry`

Each record requires:
- non-empty core strings
- non-empty arrays where applicable
- valid `sourceUrls` (http/https)
- valid ISO `updatedAt`
- unique slug within each entity group

The dataset is validated on module load (`validateDirectoryDataset({ supplements, conditions, clinics })`).

### Relationship graph
Cross-linking logic lives in `/Users/satas/Documents/GitHub/longevity-leak/lib/relationships.ts`.

Do not duplicate manual relationship heuristics inside page components. Use relationship helpers to preserve consistent linking + reason labels.

## 5) Non-Negotiable Content Standards

All major standards from `CLAUDE.md` apply. Highlights:

- Evidence-calibrated claims only.
- Explicitly state what is known, unknown, and risky.
- Never use hype framing or guaranteed-outcome language.
- Every article should include:
  - title/date/slug metadata
  - summary/excerpt metadata
  - clear section headings
  - sources/references section
  - at least one internal contextual link
  - uncertainty/limitation language
- Every supplement entry should include:
  - best-for context
  - evidence level + summary
  - effect-size framing
  - safety/risk framing
  - dosing context (dose/timing/duration/notes)
  - source URLs + article references
- Every condition entry should include:
  - goal
  - interventions
  - monitoring markers
  - source URLs + evidence framing

## 6) Quality Gates And Validation Commands

### Actual scripts currently available (from `package.json`)
- `npm run lint`
- `npm run quality:content`
- `npm run quality:content:strict`
- `npm run quality:directory`
- `npm run quality:directory:strict`
- `npx tsc --noEmit`
- `npm run build`

### Current mismatch to be aware of
- `.github/workflows/quality.yml` and `.github/pull_request_template.md` still reference:
  - `npm run validate:content`
  - `npm run content:report`
  - `npm test`
- These scripts are not present in current `package.json` (`npm test` currently fails with missing script).

When updating CI or PR guidance, align it to real scripts above.

### Recommended pre-merge runbook
1. `npm run quality:content`
2. `npm run quality:directory`
3. `npm run lint`
4. `npx tsc --noEmit`
5. `npm run build`

For strict review/batch updates:
1. `npm run quality:content:strict`
2. `npm run quality:directory:strict`

## 7) SEO Guardrails

Required SEO invariants:
- Canonical host consistency across metadata, sitemap, and redirects.
- Unique metadata for each indexable page (title + description + canonical).
- Valid sitemap/robots output.
- Structured data must match visible content.
- Internal linking must prevent orphan pages.
- Publish date + source links + evidence/risk signals must remain visible trust signals.

Implemented structured data types:
- Home: `WebSite`
- Post detail: `Article`
- Supplement detail: `MedicalEntity`
- Condition detail: `MedicalCondition`
- Clinic detail: `MedicalClinic`

Key files:
- `/Users/satas/Documents/GitHub/longevity-leak/app/layout.tsx`
- `/Users/satas/Documents/GitHub/longevity-leak/app/sitemap.ts`
- `/Users/satas/Documents/GitHub/longevity-leak/app/robots.ts`
- Detail page route files under `/Users/satas/Documents/GitHub/longevity-leak/app/*/[slug]/page.tsx`

## 8) Search And Discoverability

Sitewide search index is generated in `/Users/satas/Documents/GitHub/longevity-leak/lib/search.ts` and served by `/Users/satas/Documents/GitHub/longevity-leak/app/api/search/route.ts`.

If adding new content surfaces or entity types:
- Ensure they are represented in search index generation where appropriate.
- Preserve descriptive labels and useful keywords for retrieval quality.

## 9) UX/UI Quality Bar

From product directives + current implementation:
- Design should feel clinical/premium, not gimmicky.
- Maintain obvious hierarchy in under 3 seconds: topic, evidence, risk, action.
- Mobile-first readability and spacing are required.
- Avoid card truncation/clipping of critical information.
- Preserve orientation with strong nav active states and clear “back” paths.

Keep evidence/risk explanation discoverable:
- `EvidenceRiskGuide` and `EvidenceRiskNote` in `/Users/satas/Documents/GitHub/longevity-leak/components/evidence-risk-guide.tsx`.

## 10) Contribution Rules By Change Type

### A) Adding or editing an article (`content/posts/*.mdx`)
- Keep ISO date format.
- Include explicit sources section and external links.
- Include at least one internal link (`/posts|/supplements|/conditions|/clinics|/tags/...`).
- Include uncertainty/risk language.
- Run:
  - `npm run quality:content`
  - `npm run lint`
  - `npx tsc --noEmit`

### B) Adding/editing supplement/condition/clinic data (`lib/directory.ts`)
- Keep schema-complete records.
- Maintain `articleRefs` integrity for supplements.
- Use trusted evidence domains where possible.
- Update `updatedAt`.
- Run:
  - `npm run quality:directory`
  - `npm run quality:content`
  - `npm run lint`
  - `npx tsc --noEmit`

### C) Changing relationships (`lib/relationships.ts`)
- Ensure no page type becomes an information island.
- Keep reason-label logic coherent.
- Validate cross-link panels on affected detail pages.
- Run:
  - `npm run quality:content`
  - `npm run quality:directory`
  - `npm run lint`
  - `npx tsc --noEmit`

### D) Changing metadata/SEO/schemas
- Verify canonical URL output and no host drift.
- Verify sitemap/robots output.
- Review JSON-LD changes carefully.
- Run:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`

## 11) Known Pitfalls

- Dynamic route shell globs in zsh need quoting when running direct shell commands (e.g. `'app/posts/[slug]/page.tsx'`).
- CI template/workflow script names are currently out of sync with `package.json`.
- Clinics pages are intentionally hidden when `siteConfig.features.clinics` is `false`; keep this behavior consistent across nav, sitemap, and route rendering.

## 12) Definition Of Done

A change is done only when:
- It preserves or improves evidence clarity, safety framing, and internal navigation confidence.
- It passes relevant quality scripts and type/lint/build checks.
- It keeps SEO metadata + structured data + sitemap/robots coherent.
- It does not create orphaned content or broken relationship pathways.
- It aligns with `CLAUDE.md` product directives.

