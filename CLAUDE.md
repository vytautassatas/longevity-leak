# Product Directives (Longevity Leak)

## UX/UI Quality Bar
- Design for premium, editorial-grade trust by default.
- Prioritize clarity, scanability, and decision support over decorative UI.
- Mobile-first behavior is required: strong spacing rhythm, readable type scales, and stable CTA placement.
- Navigation must always preserve orientation (clear active states and obvious return paths).

## Directory Interconnection Rules
- Supplements, conditions, clinics, and article pages must be interconnected.
- If a user is viewing a supplement page, show related articles for that supplement.
- If a user is viewing an article page, show related supplements tied to that article.
- Cross-links must be explicit links, not plain text mentions.
- Relationship data should be centralized in reusable library helpers, not duplicated in page components.

## Supplements Coverage Rule
- The supplements directory must include all supplements mentioned in current article content.
- New article additions that reference supplements should be reflected in the supplements directory and relationship mappings.

## Ongoing Quality Gates
- Required checks before merge:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm test`
  - `npm run build`
- JSON-LD/snapshot changes must be reviewed deliberately on every relevant PR.
