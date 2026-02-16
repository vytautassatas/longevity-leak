# Product Directives (Longevity Leak)

## Product Standard
- Build the most trusted, evidence-first longevity directory experience.
- Every page should help users make fast, safer, better-informed decisions.
- Prioritize factual clarity and navigation confidence over visual novelty.

## UX/UI Quality Bar
- Design must feel clinical, premium, and highly legible.
- Card layouts must never clip, truncate, or awkwardly wrap critical information.
- Visual hierarchy must be obvious in under 3 seconds: topic, claim, evidence, risk, action.
- Mobile-first behavior is required: strong spacing rhythm, readable type scale, and stable CTA placement.
- Navigation must preserve orientation with clear active states and obvious return paths.
- Components should be responsive by design, not fixed-height hacks.

## Evidence and Risk Communication
- Evidence level and risk level must be explained in plain language where they appear.
- Each page that uses evidence/risk labels must link to a shared methodology explainer.
- Condensed card labels are acceptable only if full interpretation is one click away.
- If data is limited, say so explicitly (for example: "insufficient human evidence").

## Interconnection Rules (Core)
- Supplements, conditions, clinics, and article pages must be deeply interconnected.
- Cross-links must be explicit links, not plain-text mentions.
- Relationship mapping should be centralized in reusable data/helpers, not duplicated in page components.
- No page type should become an information island.

## Interconnection Requirements by Page Type
- Supplement pages must show:
  - related articles
  - related conditions
  - relevant clinics/protocol context when available
- Article pages must show:
  - related supplements
  - related conditions
  - related clinics when discussed or implied by protocol context
- Condition pages must show:
  - relevant supplements
  - relevant articles
  - relevant clinics
- Clinic pages must show:
  - conditions they target
  - supplements/protocols they commonly use (if known)
  - supporting or contextual articles

## Coverage Rules
- Supplements directory must include all supplements mentioned in current article content.
- Conditions directory should cover all major, high-impact health/aging problems used across content.
- New content entries must update directory datasets and relationship mappings in the same change.

## Supplement Dosing Rules
- Supplement entries should include research-based dosing guidance when available:
  - studied dose range and units
  - timing/frequency
  - study duration context
  - key caution notes or contraindication flags
- Dosing copy must be framed as research summary, not medical advice.
- If credible human dosing evidence is missing, state that explicitly.

## Data Integrity Rules
- Keep terminology consistent across cards, detail pages, and article references.
- Avoid conflicting evidence/risk/dosing labels across surfaces for the same supplement.
- Prefer explicit uncertainty over forced certainty.

## SEO and Performance Guardrails
- Prefer static generation for core content pages; avoid runtime data dependencies that delay first render.
- Use one canonical host across metadata, sitemap, and redirects; avoid conflicting app-level and platform-level redirect logic.
- Every indexable page must include:
  - unique title
  - unique meta description
  - canonical URL
  - Open Graph/Twitter metadata aligned with on-page content
- Maintain valid sitemap/robots output and exclude hidden or disabled page types from indexable routes.
- Keep structured data (JSON-LD) aligned with visible content and use appropriate types (WebSite, Article, MedicalEntity, MedicalCondition, MedicalClinic).
- Internal linking is mandatory for discoverability:
  - article -> related supplements/conditions (and clinics when enabled)
  - supplement/condition -> related articles
  - avoid orphan pages with no inbound/outbound contextual links
- Link text should be descriptive and intent-bearing; avoid generic anchor text.
- Content freshness and trust signals should always be visible (publish date, source links, clear evidence/risk framing).
- Performance budget expectations:
  - keep directory/list pages lightweight in client JS
  - optimize image/media payloads
  - preserve readable spacing/type for fast scanning, especially on mobile

## Ongoing Quality Gates
- Required checks before merge:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm test`
  - `npm run build`
- JSON-LD/snapshot changes must be reviewed deliberately on every relevant PR.
- Validate that newly added supplements/conditions/clinics resolve to live links from related pages.
