import { getClinics, getConditions, getSupplements, type ClinicEntry, type ConditionEntry, type SupplementEntry } from "@/lib/directory";
import { getAllPosts, type Post } from "@/lib/posts";

type RelationshipGraph = {
  postToSupplements: Map<string, Set<string>>;
  supplementToPosts: Map<string, Set<string>>;
  postToConditions: Map<string, Set<string>>;
  conditionToSupplements: Map<string, Set<string>>;
  supplementToConditions: Map<string, Set<string>>;
  conditionToPosts: Map<string, Set<string>>;
  conditionToClinics: Map<string, Set<string>>;
  clinicToConditions: Map<string, Set<string>>;
  postToClinics: Map<string, Set<string>>;
  clinicToPosts: Map<string, Set<string>>;
};

const supplementAliases: Record<string, string[]> = {
  apigenin: ["chamomile compound"],
  berberine: ["nature's ozempic"],
  coq10: ["ubiquinol", "coenzyme q10"],
  "lions-mane": ["lion's mane", "lions mane"],
  "magnesium-l-threonate": ["magtein", "magnesium threonate", "l-threonate"],
  nmn: ["nad+ precursor"],
  nr: ["nicotinamide riboside"],
  nicotinamide: ["niacinamide"],
  resveratrol: ["trans-resveratrol"],
  quercetin: ["dasatinib + quercetin", "d+q"],
  "vitamin-d3": ["vitamin d", "sunshine vitamin", "cholecalciferol"],
  "omega-3": ["omega 3", "epa", "dha", "fish oil"],
  "polyphenol-stack": ["polyphenol stack"],
  "sirt3-activators": ["sirt3 activator", "sirt3 activators"],
  "creatine-monohydrate": ["creatine"],
  "green-tea-extract-egcg": ["green tea extract", "egcg", "epigallocatechin gallate"],
  "n-acetylcysteine": ["nac"],
  "acetyl-l-carnitine": ["alcar", "acetyl l carnitine", "l-carnitine"],
  pqq: ["pyrroloquinoline quinone"],
  "alpha-lipoic-acid": ["ala", "lipoic acid"],
  citicoline: ["cdp-choline", "cdp choline"],
  "bacopa-monnieri": ["bacopa"],
  ashwagandha: ["withania somnifera"],
  "rhodiola-rosea": ["rhodiola"],
  "urolithin-a": ["urolithin a"],
  acarbose: ["alpha-glucosidase inhibitor"],
  trimethylglycine: ["tmg", "betaine"],
  "glucosamine-sulfate": ["glucosamine"],
  "beetroot-nitrate": ["beetroot", "dietary nitrate"],
  "probiotic-multistrain": ["probiotic", "lactobacillus", "bifidobacterium"],
  "psyllium-husk": ["psyllium", "soluble fiber"],
  "vitamin-b12": ["b12", "cobalamin", "methylcobalamin"],
  "lutein-zeaxanthin": ["lutein", "zeaxanthin", "macular carotenoids"],
  "whey-protein-isolate": ["whey protein", "wpi"],
  "essential-amino-acids": ["eaa", "amino acids"],
  hmb: ["beta-hydroxy beta-methylbutyrate"],
  "citrulline-malate": ["citrulline", "l-citrulline"],
  "beta-alanine": ["beta alanine"],
  "boswellia-serrata": ["boswellia"],
  "ginger-extract": ["ginger root"],
  "aged-garlic-extract": ["garlic extract"],
  "cocoa-flavanols": ["cocoa extract", "flavanols"],
  "olive-leaf-extract": ["olive polyphenols", "hydroxytyrosol", "oleuropein"],
  "milk-thistle-silymarin": ["milk thistle", "silymarin"],
  "inulin-prebiotic-fiber": ["inulin", "prebiotic fiber"],
  "potassium-citrate": ["potassium citrate", "citrate"],
  "phosphatidylserine": ["phosphatidyl serine", "ps"],
  "chromium-picolinate": ["chromium"],
  "myo-inositol": ["inositol"],
  "calcium-alpha-ketoglutarate": ["ca-akg", "akg", "alpha-ketoglutarate"],
  "l-carnosine": ["carnosine"],
  "tauroursodeoxycholic-acid": ["tudca"],
  "vitamin-c": ["ascorbic acid"]
};

const conditionTokenStopwords = new Set(["and", "the", "risk", "load", "with", "for", "into", "from"]);

let cachedGraph: RelationshipGraph | null = null;
let warned = false;

function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toSearchableText(post: Post): string {
  return `${post.title} ${post.excerpt} ${post.metaDescription} ${post.tags.join(" ")} ${post.content}`.toLowerCase();
}

function normalizeTerm(term: string): string {
  return term.trim().toLowerCase();
}

function getTermsForSupplement(supplement: SupplementEntry): string[] {
  const terms = new Set<string>();
  terms.add(normalizeTerm(supplement.name));
  terms.add(normalizeTerm(supplement.slug.replace(/-/g, " ")));
  terms.add(normalizeTerm(supplement.slug));
  for (const alias of supplementAliases[supplement.slug] ?? []) terms.add(normalizeTerm(alias));
  return [...terms].filter((term) => term.length > 0);
}

function getSearchableSupplementText(supplement: SupplementEntry): string {
  return `${supplement.name} ${supplement.focus} ${supplement.conditionTags.join(" ")} ${supplement.bestFor.join(" ")} ${supplement.cautions}`.toLowerCase();
}

function getSearchableClinicText(clinic: ClinicEntry): string {
  return `${clinic.name} ${clinic.location} ${clinic.specialization} ${clinic.protocolFocus.join(" ")} ${clinic.notes} ${clinic.bestFor.join(" ")}`.toLowerCase();
}

function getTermsForCondition(condition: ConditionEntry): string[] {
  const terms = new Set<string>();
  terms.add(normalizeTerm(condition.name));
  terms.add(normalizeTerm(condition.slug.replace(/-/g, " ")));
  for (const keyword of condition.keywords) terms.add(normalizeTerm(keyword));

  const rawText = `${condition.name} ${condition.keywords.join(" ")}`.toLowerCase();
  const tokens = rawText.split(/[^a-z0-9]+/g).filter(Boolean);
  for (const token of tokens) {
    if (token.length < 4 || conditionTokenStopwords.has(token)) continue;
    terms.add(token);
  }

  return [...terms].filter((term) => term.length > 0);
}

function containsTerm(text: string, term: string): boolean {
  if (term.includes(" ")) return text.includes(term);
  const regex = new RegExp(`\\b${escapeRegExp(term)}\\b`, "i");
  return regex.test(text);
}

function buildRelationshipGraph(): RelationshipGraph {
  const supplements = getSupplements();
  const conditions = getConditions();
  const clinics = getClinics();
  const posts = getAllPosts();
  const postSlugs = new Set(posts.map((post) => post.slug));

  const postToSupplements = new Map<string, Set<string>>();
  const supplementToPosts = new Map<string, Set<string>>();
  const postToConditions = new Map<string, Set<string>>();
  const conditionToSupplements = new Map<string, Set<string>>();
  const supplementToConditions = new Map<string, Set<string>>();
  const conditionToPosts = new Map<string, Set<string>>();
  const conditionToClinics = new Map<string, Set<string>>();
  const clinicToConditions = new Map<string, Set<string>>();
  const postToClinics = new Map<string, Set<string>>();
  const clinicToPosts = new Map<string, Set<string>>();

  for (const post of posts) {
    postToSupplements.set(post.slug, new Set<string>());
    postToConditions.set(post.slug, new Set<string>());
    postToClinics.set(post.slug, new Set<string>());
  }

  for (const supplement of supplements) {
    supplementToPosts.set(supplement.slug, new Set<string>());
    supplementToConditions.set(supplement.slug, new Set<string>());
  }

  for (const condition of conditions) {
    conditionToSupplements.set(condition.slug, new Set<string>());
    conditionToPosts.set(condition.slug, new Set<string>());
    conditionToClinics.set(condition.slug, new Set<string>());
  }

  for (const clinic of clinics) {
    clinicToConditions.set(clinic.slug, new Set<string>());
    clinicToPosts.set(clinic.slug, new Set<string>());
  }

  for (const supplement of supplements) {
    const linkedPosts = supplementToPosts.get(supplement.slug);
    if (!linkedPosts) continue;

    for (const articleRef of supplement.articleRefs) {
      if (!postSlugs.has(articleRef)) {
        if (!warned) {
          console.warn(`[relationships] Supplement "${supplement.slug}" references missing post slug "${articleRef}".`);
        }
        continue;
      }
      linkedPosts.add(articleRef);
      postToSupplements.get(articleRef)?.add(supplement.slug);
    }
  }

  for (const condition of conditions) {
    const conditionTerms = getTermsForCondition(condition);

    for (const supplement of supplements) {
      const text = getSearchableSupplementText(supplement);
      if (!conditionTerms.some((term) => containsTerm(text, term))) continue;
      conditionToSupplements.get(condition.slug)?.add(supplement.slug);
      supplementToConditions.get(supplement.slug)?.add(condition.slug);
    }

    for (const clinic of clinics) {
      const text = getSearchableClinicText(clinic);
      if (!conditionTerms.some((term) => containsTerm(text, term))) continue;
      conditionToClinics.get(condition.slug)?.add(clinic.slug);
      clinicToConditions.get(clinic.slug)?.add(condition.slug);
    }
  }

  for (const condition of conditions) {
    const conditionTerms = getTermsForCondition(condition);
    const linkedPostSlugs = conditionToPosts.get(condition.slug);
    if (!linkedPostSlugs) continue;

    const mappedSupplements = conditionToSupplements.get(condition.slug) ?? new Set<string>();
    for (const supplementSlug of mappedSupplements) {
      const supplementPosts = supplementToPosts.get(supplementSlug) ?? new Set<string>();
      for (const postSlug of supplementPosts) linkedPostSlugs.add(postSlug);
    }

    for (const post of posts) {
      const postText = toSearchableText(post);
      if (conditionTerms.some((term) => containsTerm(postText, term))) linkedPostSlugs.add(post.slug);
    }
  }

  for (const condition of conditions) {
    const relatedPostSlugs = conditionToPosts.get(condition.slug) ?? new Set<string>();
    for (const postSlug of relatedPostSlugs) postToConditions.get(postSlug)?.add(condition.slug);
  }

  for (const post of posts) {
    const text = toSearchableText(post);
    const linkedSupplements = postToSupplements.get(post.slug);
    if (!linkedSupplements) continue;

    for (const supplement of supplements) {
      if (linkedSupplements.has(supplement.slug)) continue;
      const terms = getTermsForSupplement(supplement);
      if (!terms.some((term) => containsTerm(text, term))) continue;
      linkedSupplements.add(supplement.slug);
      supplementToPosts.get(supplement.slug)?.add(post.slug);
    }
  }

  for (const clinic of clinics) {
    const relatedConditions = clinicToConditions.get(clinic.slug) ?? new Set<string>();
    const relatedPostSlugs = clinicToPosts.get(clinic.slug);
    if (!relatedPostSlugs) continue;

    for (const conditionSlug of relatedConditions) {
      const conditionPosts = conditionToPosts.get(conditionSlug) ?? new Set<string>();
      for (const postSlug of conditionPosts) relatedPostSlugs.add(postSlug);
    }
  }

  for (const clinic of clinics) {
    const clinicPostSlugs = clinicToPosts.get(clinic.slug) ?? new Set<string>();
    for (const postSlug of clinicPostSlugs) postToClinics.get(postSlug)?.add(clinic.slug);
  }

  if (!warned) {
    for (const supplement of supplements) {
      const linkedPosts = supplementToPosts.get(supplement.slug);
      if (!linkedPosts || linkedPosts.size === 0) {
        console.warn(`[relationships] Supplement "${supplement.slug}" has no linked articles.`);
      }
    }
    warned = true;
  }

  return {
    postToSupplements,
    supplementToPosts,
    postToConditions,
    conditionToSupplements,
    supplementToConditions,
    conditionToPosts,
    conditionToClinics,
    clinicToConditions,
    postToClinics,
    clinicToPosts
  };
}

function getGraph(): RelationshipGraph {
  if (!cachedGraph) cachedGraph = buildRelationshipGraph();
  return cachedGraph;
}

function byNameAsc<T extends { name: string }>(a: T, b: T): number {
  return a.name.localeCompare(b.name);
}

function byDateDesc(a: Post, b: Post): number {
  return b.date.localeCompare(a.date);
}

export function getSupplementsForPostSlug(postSlug: string): SupplementEntry[] {
  const graph = getGraph();
  const slugs = graph.postToSupplements.get(postSlug) ?? new Set<string>();
  const bySlug = new Map(getSupplements().map((item) => [item.slug, item]));

  return [...slugs].map((slug) => bySlug.get(slug)).filter((item): item is SupplementEntry => Boolean(item)).sort(byNameAsc);
}

export function getExplicitSupplementsForPostSlug(postSlug: string): SupplementEntry[] {
  return getSupplements()
    .filter((s) => s.articleRefs.includes(postSlug))
    .sort(byNameAsc);
}

export function getConditionsForSupplements(supplements: SupplementEntry[]): ConditionEntry[] {
  const graph = getGraph();
  const conditionSlugs = new Set<string>();
  for (const supplement of supplements) {
    const slugs = graph.supplementToConditions.get(supplement.slug);
    if (slugs) for (const slug of slugs) conditionSlugs.add(slug);
  }
  const bySlug = new Map(getConditions().map((item) => [item.slug, item]));
  return [...conditionSlugs].map((slug) => bySlug.get(slug)).filter((item): item is ConditionEntry => Boolean(item)).sort(byNameAsc);
}

export function getExplicitConditionsForPostSlug(postSlug: string): ConditionEntry[] {
  return getConditions()
    .filter((c) => c.articleRefs.includes(postSlug))
    .sort(byNameAsc);
}

export function getPostsForSupplementSlug(supplementSlug: string): Post[] {
  const graph = getGraph();
  const slugs = graph.supplementToPosts.get(supplementSlug) ?? new Set<string>();
  const bySlug = new Map(getAllPosts().map((item) => [item.slug, item]));

  return [...slugs].map((slug) => bySlug.get(slug)).filter((item): item is Post => Boolean(item)).sort(byDateDesc);
}

export function getConditionsForSupplementSlug(supplementSlug: string): ConditionEntry[] {
  const graph = getGraph();
  const slugs = graph.supplementToConditions.get(supplementSlug) ?? new Set<string>();
  const bySlug = new Map(getConditions().map((item) => [item.slug, item]));

  return [...slugs].map((slug) => bySlug.get(slug)).filter((item): item is ConditionEntry => Boolean(item)).sort(byNameAsc);
}

export function getSupplementsForConditionSlug(conditionSlug: string): SupplementEntry[] {
  const graph = getGraph();
  const slugs = graph.conditionToSupplements.get(conditionSlug) ?? new Set<string>();
  const bySlug = new Map(getSupplements().map((item) => [item.slug, item]));

  return [...slugs].map((slug) => bySlug.get(slug)).filter((item): item is SupplementEntry => Boolean(item)).sort(byNameAsc);
}

export function getPostsForConditionSlug(conditionSlug: string): Post[] {
  const graph = getGraph();
  const slugs = graph.conditionToPosts.get(conditionSlug) ?? new Set<string>();
  const bySlug = new Map(getAllPosts().map((item) => [item.slug, item]));

  return [...slugs].map((slug) => bySlug.get(slug)).filter((item): item is Post => Boolean(item)).sort(byDateDesc);
}

export function getConditionsForPostSlug(postSlug: string): ConditionEntry[] {
  const graph = getGraph();
  const slugs = graph.postToConditions.get(postSlug) ?? new Set<string>();
  const bySlug = new Map(getConditions().map((item) => [item.slug, item]));

  return [...slugs].map((slug) => bySlug.get(slug)).filter((item): item is ConditionEntry => Boolean(item)).sort(byNameAsc);
}

export function getClinicsForPostSlug(postSlug: string): ClinicEntry[] {
  const graph = getGraph();
  const slugs = graph.postToClinics.get(postSlug) ?? new Set<string>();
  const bySlug = new Map(getClinics().map((item) => [item.slug, item]));

  return [...slugs].map((slug) => bySlug.get(slug)).filter((item): item is ClinicEntry => Boolean(item)).sort(byNameAsc);
}

export function getConditionsForClinicSlug(clinicSlug: string): ConditionEntry[] {
  const graph = getGraph();
  const slugs = graph.clinicToConditions.get(clinicSlug) ?? new Set<string>();
  const bySlug = new Map(getConditions().map((item) => [item.slug, item]));

  return [...slugs].map((slug) => bySlug.get(slug)).filter((item): item is ConditionEntry => Boolean(item)).sort(byNameAsc);
}

export function getPostsForClinicSlug(clinicSlug: string): Post[] {
  const graph = getGraph();
  const slugs = graph.clinicToPosts.get(clinicSlug) ?? new Set<string>();
  const bySlug = new Map(getAllPosts().map((item) => [item.slug, item]));

  return [...slugs].map((slug) => bySlug.get(slug)).filter((item): item is Post => Boolean(item)).sort(byDateDesc);
}

export function getSupplementsForClinicSlug(clinicSlug: string): SupplementEntry[] {
  const graph = getGraph();
  const conditionSlugs = graph.clinicToConditions.get(clinicSlug) ?? new Set<string>();
  const supplementSlugs = new Set<string>();

  for (const conditionSlug of conditionSlugs) {
    const slugs = graph.conditionToSupplements.get(conditionSlug) ?? new Set<string>();
    for (const supplementSlug of slugs) supplementSlugs.add(supplementSlug);
  }

  const bySlug = new Map(getSupplements().map((item) => [item.slug, item]));
  return [...supplementSlugs].map((slug) => bySlug.get(slug)).filter((item): item is SupplementEntry => Boolean(item)).sort(byNameAsc);
}

function getPostBySlugMap(): Map<string, Post> {
  return new Map(getAllPosts().map((post) => [post.slug, post]));
}

function getConditionBySlugMap(): Map<string, ConditionEntry> {
  return new Map(getConditions().map((condition) => [condition.slug, condition]));
}

function getSupplementBySlugMap(): Map<string, SupplementEntry> {
  return new Map(getSupplements().map((supplement) => [supplement.slug, supplement]));
}

function getFirstSharedConditionSlug(conditionSlugs: Set<string>, targetConditionSlugs: Set<string>): string | undefined {
  for (const conditionSlug of conditionSlugs) {
    if (targetConditionSlugs.has(conditionSlug)) return conditionSlug;
  }
  return undefined;
}

export function getSupplementLinkReasonForPost(postSlug: string, supplementSlug: string): string {
  const supplement = getSupplementBySlugMap().get(supplementSlug);
  if (!supplement) return "Linked by model pathway";
  if (supplement.articleRefs.includes(postSlug)) return "Direct article reference";
  return "Keyword match in article";
}

export function getPostLinkReasonForSupplement(supplementSlug: string, postSlug: string): string {
  return getSupplementLinkReasonForPost(postSlug, supplementSlug);
}

export function getConditionLinkReasonForPost(postSlug: string, conditionSlug: string): string {
  const condition = getConditionBySlugMap().get(conditionSlug);
  const post = getPostBySlugMap().get(postSlug);
  if (!condition || !post) return "Condition pathway";

  const postText = toSearchableText(post);
  const hasKeywordMatch = getTermsForCondition(condition).some((term) => containsTerm(postText, term));
  if (hasKeywordMatch) return "Keyword match in article";

  const graph = getGraph();
  const postSupplements = graph.postToSupplements.get(postSlug) ?? new Set<string>();
  const conditionSupplements = graph.conditionToSupplements.get(conditionSlug) ?? new Set<string>();
  for (const supplementSlug of postSupplements) {
    if (conditionSupplements.has(supplementSlug)) return "Condition pathway via related supplement";
  }

  return "Condition pathway";
}

export function getClinicLinkReasonForPost(postSlug: string, clinicSlug: string): string {
  const graph = getGraph();
  const postConditions = graph.postToConditions.get(postSlug) ?? new Set<string>();
  const clinicConditions = graph.clinicToConditions.get(clinicSlug) ?? new Set<string>();
  const sharedConditionSlug = getFirstSharedConditionSlug(postConditions, clinicConditions);
  if (!sharedConditionSlug) return "Condition pathway";

  const conditionName = getConditionBySlugMap().get(sharedConditionSlug)?.name;
  if (!conditionName) return "Condition pathway";
  return `Condition pathway via ${conditionName}`;
}

export function getSupplementLinkReasonForCondition(conditionSlug: string, supplementSlug: string): string {
  const condition = getConditionBySlugMap().get(conditionSlug);
  const supplement = getSupplementBySlugMap().get(supplementSlug);
  if (!condition || !supplement) return "Condition keyword match";

  const searchableText = getSearchableSupplementText(supplement);
  const hasKeywordMatch = getTermsForCondition(condition).some((term) => containsTerm(searchableText, term));
  if (hasKeywordMatch) return "Condition keyword match";
  return "Condition pathway";
}

export function getPostLinkReasonForCondition(conditionSlug: string, postSlug: string): string {
  return getConditionLinkReasonForPost(postSlug, conditionSlug);
}

export function getConditionLinkReasonForClinic(clinicSlug: string, conditionSlug: string): string {
  const clinic = getClinics().find((item) => item.slug === clinicSlug);
  const condition = getConditionBySlugMap().get(conditionSlug);
  if (!clinic || !condition) return "Condition keyword match in clinic profile";

  const clinicText = getSearchableClinicText(clinic);
  const hasKeywordMatch = getTermsForCondition(condition).some((term) => containsTerm(clinicText, term));
  if (hasKeywordMatch) return "Condition keyword match in clinic profile";
  return "Condition pathway";
}

export function getSupplementLinkReasonForClinic(clinicSlug: string, supplementSlug: string): string {
  const graph = getGraph();
  const clinicConditions = graph.clinicToConditions.get(clinicSlug) ?? new Set<string>();
  const supplementConditions = graph.supplementToConditions.get(supplementSlug) ?? new Set<string>();
  const sharedConditionSlug = getFirstSharedConditionSlug(clinicConditions, supplementConditions);
  if (!sharedConditionSlug) return "Condition pathway";

  const conditionName = getConditionBySlugMap().get(sharedConditionSlug)?.name;
  if (!conditionName) return "Condition pathway";
  return `Condition pathway via ${conditionName}`;
}

export function getPostLinkReasonForClinic(clinicSlug: string, postSlug: string): string {
  const graph = getGraph();
  const clinicConditions = graph.clinicToConditions.get(clinicSlug) ?? new Set<string>();
  const postConditions = graph.postToConditions.get(postSlug) ?? new Set<string>();
  const sharedConditionSlug = getFirstSharedConditionSlug(clinicConditions, postConditions);
  if (!sharedConditionSlug) return "Condition pathway";

  const conditionName = getConditionBySlugMap().get(sharedConditionSlug)?.name;
  if (!conditionName) return "Condition pathway";
  return `Condition pathway via ${conditionName}`;
}
