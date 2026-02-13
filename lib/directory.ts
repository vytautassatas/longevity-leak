export type EvidenceLevel = "A" | "B" | "C";

export type SupplementEntry = {
  slug: string;
  name: string;
  focus: string;
  evidenceLevel: EvidenceLevel;
  evidenceSummary: string;
  effectSize: string;
  safety: "Low Risk" | "Moderate Risk" | "Needs Monitoring";
  conditionTags: string[];
  bestFor: string[];
  cautions: string;
  sourceUrls: string[];
  articleRefs: string[];
  updatedAt: string;
};

export type ConditionEntry = {
  slug: string;
  name: string;
  goal: string;
  keywords: string[];
  evidenceLevel: EvidenceLevel;
  topInterventions: string[];
  guidanceSummary: string;
  monitoring: string[];
  sourceUrls: string[];
  updatedAt: string;
};

export type ClinicEntry = {
  slug: string;
  name: string;
  location: string;
  specialization: string;
  evidenceLevel: EvidenceLevel;
  protocolFocus: string[];
  notes: string;
  bestFor: string[];
  sourceUrls: string[];
  updatedAt: string;
};

export type DirectoryDataset = {
  supplements: SupplementEntry[];
  conditions: ConditionEntry[];
  clinics: ClinicEntry[];
};

const supplements: SupplementEntry[] = [
  {
    slug: "apigenin",
    name: "Apigenin",
    focus: "Sleep and stress regulation",
    evidenceLevel: "B",
    evidenceSummary: "Emerging human sleep evidence plus mechanistic support.",
    effectSize: "Modest sleep quality and latency improvements",
    safety: "Low Risk",
    conditionTags: ["sleep", "stress", "recovery"],
    bestFor: ["sleep onset support", "evening calming stacks"],
    cautions: "May potentiate sedatives.",
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=apigenin+sleep+trial"],
    articleRefs: ["apigenin-natural-sleep-aid"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "berberine",
    name: "Berberine",
    focus: "Glucose and metabolic control",
    evidenceLevel: "B",
    evidenceSummary: "Multiple studies support glycemic and cardiometabolic benefits.",
    effectSize: "Moderate glucose and triglyceride improvements",
    safety: "Moderate Risk",
    conditionTags: ["insulin resistance", "weight management", "metabolic syndrome"],
    bestFor: ["metabolic reset protocols"],
    cautions: "Can interact with glucose-lowering drugs.",
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=berberine+metabolic+trial"],
    articleRefs: ["berberine-natural-ozempic-weight-loss"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "coq10",
    name: "CoQ10 (Ubiquinol)",
    focus: "Mitochondrial energy support",
    evidenceLevel: "B",
    evidenceSummary: "Good cardiovascular and fatigue-oriented trial signal.",
    effectSize: "Modest-to-meaningful fatigue support",
    safety: "Low Risk",
    conditionTags: ["fatigue", "mitochondrial decline", "cardiovascular health"],
    bestFor: ["energy restoration", "statin users"],
    cautions: "Formulation quality matters.",
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=coq10+clinical+trial"],
    articleRefs: ["coq10-mitochondrial-energy-aging"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "rapamycin",
    name: "Rapamycin",
    focus: "Healthy aging pathways",
    evidenceLevel: "B",
    evidenceSummary: "Strong translational base with growing human protocols.",
    effectSize: "Protocol-dependent",
    safety: "Needs Monitoring",
    conditionTags: ["frailty", "inflammation", "metabolic health"],
    bestFor: ["clinician-guided anti-aging programs"],
    cautions: "Physician oversight required.",
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=rapamycin+aging+trial"],
    articleRefs: ["rapamycin-pearl-trial-women-benefits", "caloric-restriction-mimetics-2025-review"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "spermidine",
    name: "Spermidine",
    focus: "Autophagy support",
    evidenceLevel: "B",
    evidenceSummary: "Promising cohort and early intervention human data.",
    effectSize: "Modest-to-moderate signal",
    safety: "Low Risk",
    conditionTags: ["cardiovascular", "cognition", "autophagy"],
    bestFor: ["dietary longevity stack"],
    cautions: "Product quality varies.",
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=spermidine+human+trial"],
    articleRefs: ["spermidine-autophagy-cellular-renewal", "spermidine-cardiac-disease-trial"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "fisetin",
    name: "Fisetin",
    focus: "Senolytic protocols",
    evidenceLevel: "C",
    evidenceSummary: "Promising translational biology; sparse definitive human outcomes.",
    effectSize: "Unknown in broad populations",
    safety: "Moderate Risk",
    conditionTags: ["inflammation", "bone density", "cellular senescence"],
    bestFor: ["experimental senolytic cycles"],
    cautions: "Long-term human efficacy uncertain.",
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=fisetin+clinical+trial"],
    articleRefs: ["fisetin-removes-zombie-cells-mayo-clinic", "senolytics-bone-density-mayo-clinic"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "lions-mane",
    name: "Lion's Mane",
    focus: "Cognitive support",
    evidenceLevel: "B",
    evidenceSummary: "Early human cognition studies plus mechanistic support.",
    effectSize: "Short-window focus benefits in early studies",
    safety: "Low Risk",
    conditionTags: ["focus", "working memory", "neuroplasticity"],
    bestFor: ["acute cognitive windows"],
    cautions: "Extraction quality varies.",
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=lion%27s+mane+clinical"],
    articleRefs: ["lions-mane-silicon-valley-nootropic", "silicon-valleys-200-month-memory-upgrade"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "magnesium-l-threonate",
    name: "Magnesium L-Threonate",
    focus: "Brain magnesium delivery",
    evidenceLevel: "B",
    evidenceSummary: "Early clinical evidence for cognition and sleep support.",
    effectSize: "Modest memory and sleep improvements",
    safety: "Low Risk",
    conditionTags: ["memory", "sleep quality", "neuroprotection"],
    bestFor: ["aging cognition protocols"],
    cautions: "Read elemental magnesium dosing carefully.",
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=magnesium+l-threonate+trial"],
    articleRefs: ["magnesium-threonate-brain-health"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "nmn",
    name: "NMN",
    focus: "NAD+ precursor therapy",
    evidenceLevel: "B",
    evidenceSummary: "Growing NAD-pathway evidence with heterogeneous endpoint quality.",
    effectSize: "Biomarker gains; mixed functional outcomes",
    safety: "Moderate Risk",
    conditionTags: ["cellular energy", "cognitive decline", "metabolic resilience"],
    bestFor: ["NAD restoration programs"],
    cautions: "Stability and purity vary by brand.",
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=nmn+human+trial"],
    articleRefs: [
      "nmn-brain-aging-breakthrough",
      "nmn-brain-aging-reversal-study",
      "nmn-reverses-brain-aging-mouse-study",
      "the-nad-plus-uptick-that-cut-afternoon-brain-fog",
      "sirt3-activators-breakthrough-aging"
    ],
    updatedAt: "2026-02-13"
  },
  {
    slug: "nr",
    name: "Nicotinamide Riboside (NR)",
    focus: "NAD+ precursor therapy",
    evidenceLevel: "B",
    evidenceSummary: "Consistent NAD increase in trials, mixed downstream effects.",
    effectSize: "Reliable NAD increase",
    safety: "Low Risk",
    conditionTags: ["cellular energy", "metabolic support"],
    bestFor: ["NAD precursor alternatives"],
    cautions: "Benefits appear context-dependent.",
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=nicotinamide+riboside+trial"],
    articleRefs: ["nad-boosters-human-trial-comparison"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "nicotinamide",
    name: "Nicotinamide",
    focus: "Legacy NAD+ precursor",
    evidenceLevel: "C",
    evidenceSummary: "Biochemically useful but often outperformed by newer precursors.",
    effectSize: "Limited functional signal",
    safety: "Moderate Risk",
    conditionTags: ["nad pathway", "metabolic support"],
    bestFor: ["budget NAD support"],
    cautions: "Dose-dependent tolerability issues.",
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=nicotinamide+nad+study"],
    articleRefs: ["nad-boosters-human-trial-comparison"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "resveratrol",
    name: "Resveratrol",
    focus: "Polyphenol signaling",
    evidenceLevel: "B",
    evidenceSummary: "Metabolic and vascular support with formulation-dependent outcomes.",
    effectSize: "Modest cardiometabolic support",
    safety: "Low Risk",
    conditionTags: ["vascular aging", "cognition", "inflammation"],
    bestFor: ["polyphenol longevity stacks"],
    cautions: "Bioavailability is a major limiter.",
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=resveratrol+aging+trial"],
    articleRefs: ["resveratrol-longevity-clinic-protocol", "the-polyphenol-stack-quietly-winning-in-cognition-clinics"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "quercetin",
    name: "Quercetin",
    focus: "Senolytic adjunct",
    evidenceLevel: "C",
    evidenceSummary: "Commonly used in stacks; standalone outcome data remains limited.",
    effectSize: "Protocol-dependent",
    safety: "Low Risk",
    conditionTags: ["senolytic protocols", "inflammation", "vascular support"],
    bestFor: ["adjunctive senolytic cycles"],
    cautions: "Most strong evidence is combination-based.",
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=quercetin+senolytic"],
    articleRefs: ["fisetin-removes-zombie-cells-mayo-clinic", "resveratrol-longevity-clinic-protocol"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "vitamin-d3",
    name: "Vitamin D3",
    focus: "Immune and cellular aging support",
    evidenceLevel: "A",
    evidenceSummary: "Large-scale evidence supports deficiency correction and broad risk reduction.",
    effectSize: "Strong deficiency correction",
    safety: "Low Risk",
    conditionTags: ["immune resilience", "bone health", "longevity markers"],
    bestFor: ["baseline deficiency correction"],
    cautions: "Monitor blood levels to avoid oversupplementation.",
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=vitamin+d3+trial"],
    articleRefs: ["vitamin-d-immune-system-deficiency", "vitamin-d-telomere-protection-vital"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "omega-3",
    name: "Omega-3",
    focus: "Cardiometabolic and inflammatory support",
    evidenceLevel: "A",
    evidenceSummary: "Extensive clinical evidence supports cardiovascular and inflammatory endpoints.",
    effectSize: "Reliable triglyceride and inflammation improvements",
    safety: "Low Risk",
    conditionTags: ["cardiovascular", "inflammation", "brain health"],
    bestFor: ["foundational prevention"],
    cautions: "Effect sizes depend on EPA/DHA dose.",
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=omega-3+clinical+trial"],
    articleRefs: ["vitamin-d-telomere-protection-vital", "resveratrol-longevity-clinic-protocol"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "polyphenol-stack",
    name: "Polyphenol Stack",
    focus: "Multi-target cognitive support",
    evidenceLevel: "B",
    evidenceSummary: "Stacked polyphenols may benefit cognition clinics across pathways.",
    effectSize: "Modest durable cognition support",
    safety: "Low Risk",
    conditionTags: ["cognition", "vascular function", "metabolic support"],
    bestFor: ["clinic-guided cognition plans"],
    cautions: "Composition varies widely across products.",
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=polyphenol+stack+cognition"],
    articleRefs: ["the-polyphenol-stack-quietly-winning-in-cognition-clinics"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "sirt3-activators",
    name: "SIRT3 Activators",
    focus: "Experimental mitochondrial signaling",
    evidenceLevel: "C",
    evidenceSummary: "Early-stage compounds with promising mechanistic data.",
    effectSize: "Translational-stage",
    safety: "Needs Monitoring",
    conditionTags: ["neurodegeneration", "mitochondrial health", "experimental longevity"],
    bestFor: ["research watchlists"],
    cautions: "Not a mature consumer supplement category.",
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=sirt3+activator+trial"],
    articleRefs: ["sirt3-activators-breakthrough-aging"],
    updatedAt: "2026-02-13"
  }
];

const conditions: ConditionEntry[] = [
  {
    slug: "metabolic-syndrome",
    name: "Metabolic Syndrome",
    goal: "Improve insulin sensitivity and risk markers",
    keywords: ["metabolic syndrome", "insulin resistance", "glucose", "triglycerides", "weight"],
    evidenceLevel: "A",
    topInterventions: ["exercise", "weight reduction", "sleep optimization"],
    guidanceSummary: "Lifestyle plus protocolized coaching outperform single-agent approaches.",
    monitoring: ["A1C", "fasting glucose", "triglyceride:HDL", "waist circumference"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=metabolic+syndrome+intervention+trial"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "obesity-and-adiposity",
    name: "Obesity and Adiposity",
    goal: "Reduce fat mass while preserving lean tissue",
    keywords: ["obesity", "adiposity", "weight loss", "body fat", "appetite"],
    evidenceLevel: "A",
    topInterventions: ["protein-forward nutrition", "resistance training", "sleep/stress management"],
    guidanceSummary: "Sustained outcomes require nutrition adherence and muscle-preserving training.",
    monitoring: ["waist circumference", "body composition", "A1C", "fasting insulin"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=obesity+lifestyle+trial"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "type-2-diabetes-risk",
    name: "Type 2 Diabetes Risk",
    goal: "Delay or prevent progression to diabetes",
    keywords: ["prediabetes", "type 2 diabetes", "glucose control", "insulin"],
    evidenceLevel: "A",
    topInterventions: ["structured activity", "carbohydrate quality", "weight loss"],
    guidanceSummary: "Early intervention can produce durable risk reduction.",
    monitoring: ["A1C", "fasting glucose", "time in range", "fasting insulin"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=prediabetes+prevention+trial"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "cardiovascular-risk",
    name: "Cardiovascular Risk",
    goal: "Lower long-term risk of heart attack and stroke",
    keywords: ["cardiovascular", "heart disease", "vascular", "atherosclerosis"],
    evidenceLevel: "A",
    topInterventions: ["blood pressure control", "lipid optimization", "aerobic and strength training"],
    guidanceSummary: "Best results come from multi-marker risk management.",
    monitoring: ["apoB/LDL-C", "blood pressure", "hs-CRP", "VO2 max"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=cardiovascular+prevention+trial"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "hypertension",
    name: "Hypertension",
    goal: "Bring blood pressure into guideline range",
    keywords: ["hypertension", "high blood pressure", "bp"],
    evidenceLevel: "A",
    topInterventions: ["sodium reduction", "aerobic exercise", "weight reduction"],
    guidanceSummary: "Home BP tracking with diet and exercise is high leverage.",
    monitoring: ["home BP log", "resting heart rate", "kidney function"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=hypertension+lifestyle+trial"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "sleep-disruption-and-insomnia",
    name: "Sleep Disruption and Insomnia",
    goal: "Improve sleep onset, depth, and recovery quality",
    keywords: ["insomnia", "sleep", "sleep quality", "sleep latency", "circadian"],
    evidenceLevel: "B",
    topInterventions: ["regular schedule", "light timing", "CBT-I principles"],
    guidanceSummary: "Behavioral intervention is first-line; compounds are adjunctive.",
    monitoring: ["sleep latency", "night awakenings", "total sleep", "subjective recovery"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=insomnia+cbt+i+trial"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "cognitive-decline-risk",
    name: "Cognitive Decline Risk",
    goal: "Preserve processing speed and memory over time",
    keywords: ["cognitive decline", "memory", "brain fog", "neurodegeneration", "alzheimer"],
    evidenceLevel: "B",
    topInterventions: ["aerobic training", "blood pressure control", "sleep quality"],
    guidanceSummary: "Multi-domain strategies beat supplement-only approaches.",
    monitoring: ["blood pressure", "sleep duration", "executive function screens"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=cognitive+decline+multidomain"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "mood-and-anxiety-load",
    name: "Mood and Anxiety Load",
    goal: "Reduce anxiety burden and stabilize mood",
    keywords: ["anxiety", "stress", "depression", "mood", "cortisol"],
    evidenceLevel: "B",
    topInterventions: ["sleep regularization", "daily aerobic movement", "skills training"],
    guidanceSummary: "Lifestyle and behavioral strategies are foundational.",
    monitoring: ["symptom scores", "sleep quality", "HRV"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=anxiety+lifestyle+trial"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "sarcopenia-and-frailty",
    name: "Sarcopenia and Frailty",
    goal: "Preserve strength and functional independence",
    keywords: ["sarcopenia", "frailty", "muscle loss", "strength decline"],
    evidenceLevel: "A",
    topInterventions: ["progressive resistance training", "higher protein", "mobility work"],
    guidanceSummary: "Strength decline is highly modifiable with training and protein.",
    monitoring: ["grip strength", "chair-rise", "gait speed", "lean mass"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=sarcopenia+resistance+trial"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "osteopenia-and-fragility",
    name: "Osteopenia and Fragility",
    goal: "Increase bone strength and reduce fracture risk",
    keywords: ["osteopenia", "osteoporosis", "bone density", "fracture risk"],
    evidenceLevel: "A",
    topInterventions: ["resistance training", "protein adequacy", "fall prevention"],
    guidanceSummary: "Strength training plus medical follow-up drives largest gains.",
    monitoring: ["DEXA", "grip strength", "fall history", "vitamin D"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=osteopenia+trial"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "chronic-inflammation",
    name: "Chronic Inflammation",
    goal: "Reduce persistent low-grade inflammatory burden",
    keywords: ["inflammation", "inflammatory", "crp", "immune dysregulation"],
    evidenceLevel: "B",
    topInterventions: ["body composition", "sleep optimization", "anti-inflammatory diet"],
    guidanceSummary: "Inflammatory load responds best to multi-domain correction.",
    monitoring: ["hs-CRP", "sleep quality", "waist circumference", "fasting glucose"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=chronic+inflammation+lifestyle"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "mitochondrial-fatigue",
    name: "Mitochondrial Fatigue",
    goal: "Improve cellular energy and persistent fatigue symptoms",
    keywords: ["fatigue", "mitochondrial", "energy", "low energy", "exercise intolerance"],
    evidenceLevel: "B",
    topInterventions: ["graded conditioning", "sleep restoration", "micronutrient correction"],
    guidanceSummary: "Outcomes improve with structured training and recovery.",
    monitoring: ["fatigue scores", "activity tolerance", "sleep", "heart-rate recovery"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=mitochondrial+fatigue+trial"],
    updatedAt: "2026-02-13"
  }
];

const clinics: ClinicEntry[] = [
  {
    slug: "precision-longevity-la",
    name: "Precision Longevity LA",
    location: "Los Angeles, CA",
    specialization: "Metabolic and hormone optimization",
    evidenceLevel: "B",
    protocolFocus: ["comprehensive bloodwork", "CGM-guided nutrition", "sleep diagnostics"],
    notes: "Best for members who want high-frequency biometric tracking.",
    bestFor: ["executives with metabolic risk", "data-heavy adherence"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=continuous+glucose+monitor+lifestyle"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "atlas-age-medicine-nyc",
    name: "Atlas Age Medicine",
    location: "New York, NY",
    specialization: "Executive prevention programs",
    evidenceLevel: "B",
    protocolFocus: ["cardiovascular imaging", "neurocognitive baselining", "lifestyle medicine"],
    notes: "Strong physician access and protocol personalization.",
    bestFor: ["high-touch prevention care", "longitudinal biomarker tracking"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=executive+health+preventive+medicine"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "northstar-longevity-austin",
    name: "Northstar Longevity",
    location: "Austin, TX",
    specialization: "Performance and healthy lifespan",
    evidenceLevel: "C",
    protocolFocus: ["VO2 max testing", "strength diagnostics", "recovery protocols"],
    notes: "Strong coaching operations; independent outcomes data still limited.",
    bestFor: ["athletic longevity", "performance-oriented plans"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=vo2+max+healthy+aging"],
    updatedAt: "2026-02-13"
  }
];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidHttpUrl(value: string): boolean {
  return /^https?:\/\//.test(value);
}

function isValidIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const time = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(time);
}

function ensureNonEmptyStringField(recordName: string, fieldName: string, value: unknown): void {
  if (!isNonEmptyString(value)) {
    throw new Error(`[directory] ${recordName}: "${fieldName}" must be a non-empty string.`);
  }
}

function ensureStringArray(recordName: string, fieldName: string, value: unknown): void {
  if (!Array.isArray(value) || value.length === 0 || !value.every(isNonEmptyString)) {
    throw new Error(`[directory] ${recordName}: "${fieldName}" must be a non-empty string array.`);
  }
}

function ensureUrlArray(recordName: string, urls: unknown): void {
  if (!Array.isArray(urls) || urls.length === 0 || !urls.every((url) => isNonEmptyString(url) && isValidHttpUrl(url))) {
    throw new Error(`[directory] ${recordName}: "sourceUrls" must be a non-empty array of http(s) URLs.`);
  }
}

function ensureIsoDateField(recordName: string, fieldName: string, value: unknown): void {
  if (!isNonEmptyString(value) || !isValidIsoDate(value)) {
    throw new Error(`[directory] ${recordName}: "${fieldName}" must be an ISO date string (YYYY-MM-DD).`);
  }
}

function ensureUniqueSlugs<T extends { slug: string }>(entries: T[], groupName: string): void {
  const seen = new Set<string>();
  for (const entry of entries) {
    if (!isNonEmptyString(entry.slug)) {
      throw new Error(`[directory] ${groupName}: entry has an invalid "slug".`);
    }
    if (seen.has(entry.slug)) {
      throw new Error(`[directory] ${groupName}: duplicate slug "${entry.slug}".`);
    }
    seen.add(entry.slug);
  }
}

function validateSupplementEntries(entries: SupplementEntry[]): void {
  ensureUniqueSlugs(entries, "supplements");
  for (const entry of entries) {
    const recordName = `supplements/${entry.slug}`;
    ensureNonEmptyStringField(recordName, "name", entry.name);
    ensureNonEmptyStringField(recordName, "focus", entry.focus);
    ensureNonEmptyStringField(recordName, "evidenceSummary", entry.evidenceSummary);
    ensureNonEmptyStringField(recordName, "effectSize", entry.effectSize);
    ensureNonEmptyStringField(recordName, "cautions", entry.cautions);
    ensureStringArray(recordName, "conditionTags", entry.conditionTags);
    ensureStringArray(recordName, "bestFor", entry.bestFor);
    ensureUrlArray(recordName, entry.sourceUrls);
    ensureStringArray(recordName, "articleRefs", entry.articleRefs);
    ensureIsoDateField(recordName, "updatedAt", entry.updatedAt);
  }
}

function validateConditionEntries(entries: ConditionEntry[]): void {
  ensureUniqueSlugs(entries, "conditions");
  for (const entry of entries) {
    const recordName = `conditions/${entry.slug}`;
    ensureNonEmptyStringField(recordName, "name", entry.name);
    ensureNonEmptyStringField(recordName, "goal", entry.goal);
    ensureStringArray(recordName, "keywords", entry.keywords);
    ensureNonEmptyStringField(recordName, "guidanceSummary", entry.guidanceSummary);
    ensureStringArray(recordName, "topInterventions", entry.topInterventions);
    ensureStringArray(recordName, "monitoring", entry.monitoring);
    ensureUrlArray(recordName, entry.sourceUrls);
    ensureIsoDateField(recordName, "updatedAt", entry.updatedAt);
  }
}

function validateClinicEntries(entries: ClinicEntry[]): void {
  ensureUniqueSlugs(entries, "clinics");
  for (const entry of entries) {
    const recordName = `clinics/${entry.slug}`;
    ensureNonEmptyStringField(recordName, "name", entry.name);
    ensureNonEmptyStringField(recordName, "location", entry.location);
    ensureNonEmptyStringField(recordName, "specialization", entry.specialization);
    ensureNonEmptyStringField(recordName, "notes", entry.notes);
    ensureStringArray(recordName, "protocolFocus", entry.protocolFocus);
    ensureStringArray(recordName, "bestFor", entry.bestFor);
    ensureUrlArray(recordName, entry.sourceUrls);
    ensureIsoDateField(recordName, "updatedAt", entry.updatedAt);
  }
}

export function validateDirectoryDataset(dataset: DirectoryDataset): void {
  validateSupplementEntries(dataset.supplements);
  validateConditionEntries(dataset.conditions);
  validateClinicEntries(dataset.clinics);
}

validateDirectoryDataset({ supplements, conditions, clinics });

export function getSupplements(): SupplementEntry[] {
  return supplements;
}

export function getSupplementBySlug(slug: string): SupplementEntry | undefined {
  return supplements.find((item) => item.slug === slug);
}

export function getConditions(): ConditionEntry[] {
  return conditions;
}

export function getConditionBySlug(slug: string): ConditionEntry | undefined {
  return conditions.find((item) => item.slug === slug);
}

export function getClinics(): ClinicEntry[] {
  return clinics;
}

export function getClinicBySlug(slug: string): ClinicEntry | undefined {
  return clinics.find((item) => item.slug === slug);
}

export function getSupplementSlugs(): string[] {
  return supplements.map((item) => item.slug);
}

export function getConditionSlugs(): string[] {
  return conditions.map((item) => item.slug);
}

export function getClinicSlugs(): string[] {
  return clinics.map((item) => item.slug);
}

export function getDirectoryCounts(): { supplements: number; conditions: number; clinics: number } {
  return {
    supplements: supplements.length,
    conditions: conditions.length,
    clinics: clinics.length
  };
}

export function getDirectoryLastModified(): string {
  const allDates = [...supplements, ...conditions, ...clinics].map((entry) => entry.updatedAt);
  return allDates.reduce((latest, current) => (current > latest ? current : latest), allDates[0] ?? "1970-01-01");
}
