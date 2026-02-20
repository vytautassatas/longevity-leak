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
  dosing: {
    typicalDailyDose: string;
    timing: string;
    protocolDuration: string;
    notes: string;
  };
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

export type BrandTransparencyScore = "high" | "medium" | "low";
export type BrandEvidenceQualityRating = "A" | "B" | "C" | "D";

export type BrandKeyProduct = {
  name: string;
  supplementSlug?: string;
  description: string;
};

export type BrandEntry = {
  slug: string;
  name: string;
  founded?: number;
  hqCountry: string;
  website: string;
  description: string;
  productCategories: string[];
  manufacturingStandards: string[];
  transparencyScore: BrandTransparencyScore;
  transparencyScoreJustification: string;
  evidenceQualityRating: BrandEvidenceQualityRating;
  evidenceQualityNotes: string;
  keyProducts: BrandKeyProduct[];
  bestFor: string;
  redFlags: string[];
  sourceUrls: string[];
  articleRefs: string[];
  updatedAt: string;
  verified: boolean;
};

export type DirectoryDataset = {
  supplements: SupplementEntry[];
  conditions: ConditionEntry[];
  clinics: ClinicEntry[];
  brands: BrandEntry[];
};

const supplements: SupplementEntry[] = [
  {
    slug: "apigenin",
    name: "Apigenin",
    focus: "Sleep and stress regulation",
    evidenceLevel: "B",
    evidenceSummary: "Human data are limited and partly indirect (e.g., apigenin-rich chamomile preparations), suggesting modest sleep and anxiety support.",
    effectSize: "Small-to-modest sleep and calmness support in selected users",
    safety: "Low Risk",
    conditionTags: ["sleep", "stress", "recovery"],
    bestFor: ["sleep onset support", "evening calming stacks"],
    cautions: "May potentiate sedatives.",
    dosing: {
      typicalDailyDose: "25-100 mg",
      timing: "30-60 minutes before bedtime",
      protocolDuration: "4-12 weeks in sleep-focused protocols",
      notes: "Most studies and protocols start at lower evening doses and titrate based on sleep response."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/21939549/", "https://pubmed.ncbi.nlm.nih.gov/29154054/"],
    articleRefs: ["apigenin-natural-sleep-aid"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "berberine",
    name: "Berberine",
    focus: "Glucose and metabolic control",
    evidenceLevel: "B",
    evidenceSummary: "Meta-analyses support improvements in glycemic and lipid markers, with outcomes influenced by dose, duration, and background therapy.",
    effectSize: "Moderate fasting glucose, A1C, and triglyceride improvements in selected metabolic cohorts",
    safety: "Moderate Risk",
    conditionTags: ["insulin resistance", "weight management", "metabolic syndrome"],
    bestFor: ["metabolic reset protocols"],
    cautions: "Can interact with glucose-lowering drugs.",
    dosing: {
      typicalDailyDose: "900-1500 mg (divided with meals)",
      timing: "Two to three doses with food",
      protocolDuration: "8-24 weeks in metabolic studies",
      notes: "Common research pattern uses ~500 mg two to three times daily with meals."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/36467075/", "https://pubmed.ncbi.nlm.nih.gov/34956436/"],
    articleRefs: ["berberine-natural-ozempic-weight-loss"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "coq10",
    name: "CoQ10 (Ubiquinol)",
    focus: "Mitochondrial energy support",
    evidenceLevel: "B",
    evidenceSummary: "Studies show CoQ10 can reduce fatigue in some groups and may support heart and metabolic markers, especially when baseline stress is higher.",
    effectSize: "Modest-to-meaningful fatigue improvement with selective cardiometabolic support",
    safety: "Low Risk",
    conditionTags: ["fatigue", "mitochondrial decline", "cardiovascular health"],
    bestFor: ["energy restoration", "statin users"],
    cautions: "Formulation quality matters.",
    dosing: {
      typicalDailyDose: "100-300 mg",
      timing: "With a fat-containing meal",
      protocolDuration: "8-16 weeks in fatigue/cardiometabolic studies",
      notes: "Ubiquinol forms are often used at lower mg than ubiquinone due to higher bioavailability."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/36091835/", "https://pubmed.ncbi.nlm.nih.gov/39462324/"],
    articleRefs: ["coq10-mitochondrial-energy-aging"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "rapamycin",
    name: "Rapamycin",
    focus: "Healthy aging pathways",
    evidenceLevel: "B",
    evidenceSummary: "Early human trials and biomarker studies suggest pathway engagement, but long-term risk-benefit and optimal dosing schedules remain unresolved.",
    effectSize: "Biomarker and functional signals in select cohorts; no broad longevity-endpoint confirmation",
    safety: "Needs Monitoring",
    conditionTags: ["frailty", "inflammation", "metabolic health"],
    bestFor: ["clinician-guided anti-aging programs"],
    cautions: "Physician oversight required.",
    dosing: {
      typicalDailyDose: "Not self-directed; protocol-dependent",
      timing: "Intermittent schedules under physician supervision",
      protocolDuration: "Set by specialist with ongoing monitoring",
      notes: "Use in longevity settings is highly protocolized and should not be interpreted as OTC dosing guidance."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/39409408/", "https://pubmed.ncbi.nlm.nih.gov/39760783/"],
    articleRefs: ["rapamycin-pearl-trial-women-benefits", "caloric-restriction-mimetics-2025-review"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "spermidine",
    name: "Spermidine",
    focus: "Autophagy support",
    evidenceLevel: "B",
    evidenceSummary: "Randomized and controlled human trials suggest modest cognitive and cardiometabolic support, with meaningful heterogeneity across protocols.",
    effectSize: "Modest cognitive and metabolic biomarker support",
    safety: "Low Risk",
    conditionTags: ["cardiovascular", "cognition", "autophagy"],
    bestFor: ["dietary longevity stack"],
    cautions: "Product quality varies.",
    dosing: {
      typicalDailyDose: "1-2 mg spermidine equivalent",
      timing: "Daily, usually with food",
      protocolDuration: "3-12 months in observational/intervention protocols",
      notes: "Many human protocols standardize to spermidine content rather than raw extract weight."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/35420556/", "https://pubmed.ncbi.nlm.nih.gov/39685589/"],
    articleRefs: ["spermidine-autophagy-cellular-renewal", "spermidine-cardiac-disease-trial"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "fisetin",
    name: "Fisetin",
    focus: "Senolytic protocols",
    evidenceLevel: "C",
    evidenceSummary: "Preclinical senolytic rationale is strong, while human evidence remains early-stage with limited definitive outcome data.",
    effectSize: "Translational signal with limited clinical outcome confirmation",
    safety: "Moderate Risk",
    conditionTags: ["inflammation", "bone density", "cellular senescence"],
    bestFor: ["experimental senolytic cycles"],
    cautions: "Long-term human efficacy uncertain.",
    dosing: {
      typicalDailyDose: "100-500 mg in cycling protocols",
      timing: "Short pulse cycles rather than continuous daily use",
      protocolDuration: "Intermittent cycles (for example 2-5 days per month)",
      notes: "Human evidence remains limited; cycle design varies widely across experimental protocols."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/38345678/", "https://pubmed.ncbi.nlm.nih.gov/37334898/"],
    articleRefs: ["fisetin-removes-zombie-cells-mayo-clinic", "dasatinib-quercetin-mayo-clinic-senolytics"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "lions-mane",
    name: "Lion's Mane",
    focus: "Cognitive support",
    evidenceLevel: "B",
    evidenceSummary: "Small randomized trials suggest potential cognition and mood benefits, but sample sizes and extract standardization vary.",
    effectSize: "Small-to-moderate signal for memory and mood in short-duration trials",
    safety: "Low Risk",
    conditionTags: ["focus", "working memory", "neuroplasticity"],
    bestFor: ["acute cognitive windows"],
    cautions: "Extraction quality varies.",
    dosing: {
      typicalDailyDose: "500-3000 mg extract",
      timing: "Once daily, often in morning or early afternoon",
      protocolDuration: "8-16 weeks in cognition-focused studies",
      notes: "Dose targets depend strongly on extract standardization and fruiting body vs mycelium source."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/40050440/", "https://pubmed.ncbi.nlm.nih.gov/38582596/"],
    articleRefs: ["lions-mane-silicon-valley-nootropic", "silicon-valleys-200-month-memory-upgrade"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "magnesium-l-threonate",
    name: "Magnesium L-Threonate",
    focus: "Brain magnesium delivery",
    evidenceLevel: "B",
    evidenceSummary: "Randomized data suggest modest cognition and sleep benefits in selected adults, with outcomes influenced by baseline symptom burden.",
    effectSize: "Modest cognition and sleep support in targeted cohorts",
    safety: "Low Risk",
    conditionTags: ["memory", "sleep quality", "neuroprotection"],
    bestFor: ["aging cognition protocols"],
    cautions: "Read elemental magnesium dosing carefully.",
    dosing: {
      typicalDailyDose: "1000-2000 mg compound (about 72-144 mg elemental magnesium)",
      timing: "Split doses, often afternoon/evening",
      protocolDuration: "6-12 weeks in cognition/sleep studies",
      notes: "Research and label doses are usually expressed as total compound weight, not elemental magnesium."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/39252819/", "https://pubmed.ncbi.nlm.nih.gov/37612662/"],
    articleRefs: ["magnesium-threonate-brain-health"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "nmn",
    name: "NMN",
    focus: "NAD+ precursor therapy",
    evidenceLevel: "B",
    evidenceSummary: "Human trials show NAD-pathway and insulin-sensitivity signals, while functional outcomes remain mixed and mostly short-term.",
    effectSize: "Biomarker improvements with variable clinical outcome gains",
    safety: "Moderate Risk",
    conditionTags: ["cellular energy", "cognitive decline", "metabolic resilience"],
    bestFor: ["NAD restoration programs"],
    cautions: "Stability and purity vary by brand.",
    dosing: {
      typicalDailyDose: "250-600 mg",
      timing: "Morning or split morning/noon dosing",
      protocolDuration: "4-12 weeks in most current human studies",
      notes: "Clinical protocols often begin at 250 mg and adjust based on tolerance and biomarker goals."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/40096254/", "https://pubmed.ncbi.nlm.nih.gov/35215405/"],
    articleRefs: [
      "nmn-brain-aging-breakthrough",
      "the-nad-plus-uptick-that-cut-afternoon-brain-fog",
      "sirt3-activators-breakthrough-aging"
    ],
    updatedAt: "2026-02-19"
  },
  {
    slug: "nr",
    name: "Nicotinamide Riboside (NR)",
    focus: "NAD+ precursor therapy",
    evidenceLevel: "B",
    evidenceSummary: "NR consistently raises NAD+ in humans, but downstream metabolic and performance outcomes vary by population and protocol.",
    effectSize: "Reliable NAD+ elevation with context-dependent functional effects",
    safety: "Low Risk",
    conditionTags: ["cellular energy", "metabolic support"],
    bestFor: ["NAD precursor alternatives"],
    cautions: "Benefits appear context-dependent.",
    dosing: {
      typicalDailyDose: "250-1000 mg",
      timing: "Morning with food or split dosing",
      protocolDuration: "6-12 weeks in common intervention studies",
      notes: "Higher ranges are typically used in metabolic/endurance protocols under supervision."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/36103155/", "https://pubmed.ncbi.nlm.nih.gov/33888596/"],
    articleRefs: ["nad-boosters-human-trial-comparison"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "nicotinamide",
    name: "Nicotinamide",
    focus: "Legacy NAD+ precursor",
    evidenceLevel: "C",
    evidenceSummary: "Nicotinamide can support NAD-related biochemistry, but clinical effects are context-dependent and may be less robust than newer precursors in some settings.",
    effectSize: "Reliable pathway support with mixed functional outcomes",
    safety: "Moderate Risk",
    conditionTags: ["nad pathway", "metabolic support"],
    bestFor: ["legacy NAD pathway support"],
    cautions: "Dose-dependent tolerability issues.",
    dosing: {
      typicalDailyDose: "250-1000 mg",
      timing: "With meals",
      protocolDuration: "Variable; often 4-12 weeks in intervention studies",
      notes: "Upper-end doses may increase side-effect risk and should be individualized."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/33561203/", "https://pubmed.ncbi.nlm.nih.gov/34043085/"],
    articleRefs: ["nad-boosters-human-trial-comparison"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "resveratrol",
    name: "Resveratrol",
    focus: "Polyphenol signaling",
    evidenceLevel: "B",
    evidenceSummary: "Resveratrol may improve glucose and inflammation markers, but effects are usually modest and depend on dose and formulation quality.",
    effectSize: "Small-to-modest cardiometabolic biomarker improvements",
    safety: "Low Risk",
    conditionTags: ["vascular aging", "cognition", "inflammation"],
    bestFor: ["polyphenol longevity stacks"],
    cautions: "Bioavailability is a major limiter.",
    dosing: {
      typicalDailyDose: "150-500 mg (trans-resveratrol equivalent)",
      timing: "With meals, frequently alongside fats",
      protocolDuration: "8-24 weeks across cardiometabolic studies",
      notes: "Formulation and absorption enhancers can materially change effective exposure."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/36181953/", "https://pubmed.ncbi.nlm.nih.gov/28732164/"],
    articleRefs: ["resveratrol-longevity-clinic-protocol", "the-polyphenol-stack-quietly-winning-in-cognition-clinics"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "quercetin",
    name: "Quercetin",
    focus: "Senolytic adjunct",
    evidenceLevel: "C",
    evidenceSummary: "Evidence supports anti-inflammatory and blood-pressure effects in selected populations, while senolytic claims remain largely translational.",
    effectSize: "Modest inflammatory and vascular biomarker support; senolytic outcomes unproven",
    safety: "Low Risk",
    conditionTags: ["senolytic protocols", "inflammation", "vascular support"],
    bestFor: ["adjunctive senolytic cycles"],
    cautions: "Most strong evidence is combination-based.",
    dosing: {
      typicalDailyDose: "500-1000 mg",
      timing: "Daily or pulse-cycle depending on protocol",
      protocolDuration: "4-12 weeks (or intermittent senolytic cycles)",
      notes: "Standalone data are limited; many protocols pair quercetin with other agents."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/33212468/", "https://pubmed.ncbi.nlm.nih.gov/32084365/"],
    articleRefs: ["fisetin-removes-zombie-cells-mayo-clinic", "resveratrol-longevity-clinic-protocol"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "vitamin-d3",
    name: "Vitamin D3",
    focus: "Immune and cellular aging support",
    evidenceLevel: "A",
    evidenceSummary: "Best evidence is for deficiency correction and bone-immune support; broad primary-prevention outcomes are mixed.",
    effectSize: "High for deficiency correction; mixed for broad primary-prevention endpoints",
    safety: "Low Risk",
    conditionTags: ["immune resilience", "bone health", "longevity markers"],
    bestFor: ["baseline deficiency correction", "low sun-exposure patterns"],
    cautions: "Monitor blood levels to avoid oversupplementation.",
    dosing: {
      typicalDailyDose: "1000-4000 IU (25-100 mcg), adjusted by blood level",
      timing: "Daily with food containing fat",
      protocolDuration: "Ongoing with periodic lab reassessment",
      notes: "Target and dose should be individualized to 25(OH)D status and clinician guidance."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/30415629/", "https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/"],
    articleRefs: ["vitamin-d-immune-system-deficiency", "vitamin-d-telomere-protection-vital"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "omega-3",
    name: "Omega-3",
    focus: "Cardiometabolic and inflammatory support",
    evidenceLevel: "A",
    evidenceSummary: "Evidence is strongest for triglyceride lowering and selected cardiovascular outcomes in higher-risk groups and higher-dose EPA protocols.",
    effectSize: "Reliable triglyceride lowering; event reduction in selected high-risk populations",
    safety: "Low Risk",
    conditionTags: ["cardiovascular", "inflammation", "brain health"],
    bestFor: ["foundational prevention"],
    cautions: "Effect sizes depend on EPA/DHA dose.",
    dosing: {
      typicalDailyDose: "1000-3000 mg combined EPA+DHA",
      timing: "Daily with meals",
      protocolDuration: "8-24 weeks in many lipid/inflammation studies",
      notes: "Research outcomes are usually linked to EPA+DHA content, not total fish oil capsule weight."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/30415628/", "https://ods.od.nih.gov/factsheets/Omega3FattyAcids/"],
    articleRefs: ["vitamin-d-telomere-protection-vital", "resveratrol-longevity-clinic-protocol"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "polyphenol-stack",
    name: "Polyphenol Stack",
    focus: "Multi-target cognitive support",
    evidenceLevel: "B",
    evidenceSummary: "Multi-polyphenol interventions show potential cognition and vascular support, with effects dependent on composition, dose, and adherence.",
    effectSize: "Modest cognition and endothelial-function support signal",
    safety: "Low Risk",
    conditionTags: ["cognition", "vascular function", "metabolic support"],
    bestFor: ["clinic-guided cognition plans"],
    cautions: "Composition varies widely across products.",
    dosing: {
      typicalDailyDose: "Protocol-dependent stack, commonly 500-1500 mg total polyphenols",
      timing: "Daily with meals",
      protocolDuration: "8-16 weeks minimum in cognition protocols",
      notes: "Use product-specific standardization labels because stack composition is heterogeneous."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/37550457/", "https://pubmed.ncbi.nlm.nih.gov/34924415/"],
    articleRefs: ["the-polyphenol-stack-quietly-winning-in-cognition-clinics"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "sirt3-activators",
    name: "SIRT3 Activators",
    focus: "Experimental mitochondrial signaling",
    evidenceLevel: "C",
    evidenceSummary: "Evidence remains largely preclinical and medicinal-chemistry focused, with no mature human efficacy data for routine supplementation.",
    effectSize: "Preclinical pathway signal only",
    safety: "Needs Monitoring",
    conditionTags: ["neurodegeneration", "mitochondrial health", "experimental longevity"],
    bestFor: ["research watchlists"],
    cautions: "Not a mature consumer supplement category; human safety and efficacy data remain limited.",
    dosing: {
      typicalDailyDose: "No established consumer dose",
      timing: "Research setting only",
      protocolDuration: "Trial-defined",
      notes: "Current evidence is early-stage; dosing should follow study protocols, not self-experimentation."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/34605238/", "https://pubmed.ncbi.nlm.nih.gov/39671732/"],
    articleRefs: ["sirt3-activators-breakthrough-aging"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "metformin",
    name: "Metformin",
    focus: "Insulin sensitivity and metabolic aging support",
    evidenceLevel: "A",
    evidenceSummary: "Landmark and long-term follow-up trials show durable diabetes-prevention benefits, while longevity use remains clinician-guided.",
    effectSize: "Meaningful glycemic and weight-related improvement in insulin-resistant populations",
    safety: "Needs Monitoring",
    conditionTags: ["insulin resistance", "metabolic syndrome", "cardiovascular risk", "weight management"],
    bestFor: ["physician-supervised metabolic risk reduction"],
    cautions: "Prescription medication requiring clinician oversight and renal function monitoring.",
    dosing: {
      typicalDailyDose: "500-2000 mg (often extended-release, individualized)",
      timing: "With meals to improve GI tolerance",
      protocolDuration: "Longitudinal, with periodic lab reassessment",
      notes: "Dose and escalation schedule should be individualized to tolerability, kidney function, and treatment goals."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/11832527/", "https://pubmed.ncbi.nlm.nih.gov/26377054/"],
    articleRefs: [
      "berberine-natural-ozempic-weight-loss",
      "resveratrol-longevity-clinic-protocol",
      "caloric-restriction-mimetics-2025-review"
    ],
    updatedAt: "2026-02-17"
  },
  {
    slug: "vitamin-k2",
    name: "Vitamin K2 (MK-7)",
    focus: "Bone-vascular calcium balance",
    evidenceLevel: "B",
    evidenceSummary: "MK-7 reliably improves vitamin K status biomarkers, while BMD and fracture endpoints remain mixed across trials.",
    effectSize: "Consistent biomarker improvement with variable hard-outcome signal",
    safety: "Low Risk",
    conditionTags: ["bone health", "vascular aging", "vitamin d synergy"],
    bestFor: ["vitamin D protocols", "bone and artery support stacks"],
    cautions: "Can interact with vitamin K-antagonist anticoagulants.",
    dosing: {
      typicalDailyDose: "90-200 mcg (MK-7)",
      timing: "Daily with meals containing fat",
      protocolDuration: "12+ weeks with ongoing maintenance",
      notes: "Often paired with vitamin D3 to support calcium direction toward bone and away from vascular tissue."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/33030563/", "https://pubmed.ncbi.nlm.nih.gov/23525894/"],
    articleRefs: ["vitamin-d-immune-system-deficiency", "vitamin-d-telomere-protection-vital"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "magnesium-glycinate",
    name: "Magnesium Glycinate",
    focus: "Sleep depth and relaxation support",
    evidenceLevel: "B",
    evidenceSummary: "Sleep and stress benefits are most consistent in low-magnesium or higher-stress populations, while effect sizes vary in replete users.",
    effectSize: "Modest sleep quality and relaxation improvements",
    safety: "Low Risk",
    conditionTags: ["sleep", "stress", "muscle tension", "recovery"],
    bestFor: ["evening sleep support", "people sensitive to stimulant load"],
    cautions: "Adjust for kidney function and total daily magnesium intake.",
    dosing: {
      typicalDailyDose: "200-400 mg elemental magnesium equivalent",
      timing: "Evening, often 1-2 hours before bed",
      protocolDuration: "4-12 weeks in sleep and stress-oriented protocols",
      notes: "Elemental magnesium amount varies widely by product, so label interpretation is critical."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/40918053/", "https://pmc.ncbi.nlm.nih.gov/articles/PMC10929570/"],
    articleRefs: ["magnesium-threonate-brain-health", "apigenin-natural-sleep-aid"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "l-theanine",
    name: "L-Theanine",
    focus: "Calm focus and stress buffering",
    evidenceLevel: "B",
    evidenceSummary: "L-theanine can reduce perceived stress and anxiety in many users, with modest focus benefits depending on context.",
    effectSize: "Modest stress/anxiety reduction with supportive focus effects",
    safety: "Low Risk",
    conditionTags: ["focus", "stress", "anxiety", "sleep quality"],
    bestFor: ["coffee-without-jitters protocols", "high-cognitive-load work blocks"],
    cautions: "Can increase sedation when combined with multiple calming agents.",
    dosing: {
      typicalDailyDose: "100-400 mg",
      timing: "Morning/afternoon for focus or evening for calming support",
      protocolDuration: "2-12 weeks in stress and attention studies",
      notes: "Often paired with caffeine in fixed ratios to improve sustained attention while reducing jitter burden."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/40056718/", "https://pubmed.ncbi.nlm.nih.gov/31623400/"],
    articleRefs: ["lions-mane-silicon-valley-nootropic", "the-nad-plus-uptick-that-cut-afternoon-brain-fog"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "alpha-gpc",
    name: "Alpha-GPC",
    focus: "Acetylcholine support for memory and attention",
    evidenceLevel: "B",
    evidenceSummary: "Early human trials show potential cognitive-performance support, but study quality and endpoint consistency remain heterogeneous.",
    effectSize: "Modest attention and processing-speed support in selected cohorts",
    safety: "Moderate Risk",
    conditionTags: ["working memory", "focus", "cognitive performance", "brain fog"],
    bestFor: ["short-window cognitive performance protocols"],
    cautions: "Can cause headaches, GI upset, or overstimulation in sensitive users.",
    dosing: {
      typicalDailyDose: "300-600 mg",
      timing: "Morning or 60-120 minutes before cognitive demand",
      protocolDuration: "4-12 weeks in cognition-focused protocols",
      notes: "Dosing is typically individualized around acute performance windows and tolerance."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/28341761/", "https://pubmed.ncbi.nlm.nih.gov/37575616/"],
    articleRefs: ["lions-mane-silicon-valley-nootropic", "silicon-valleys-200-month-memory-upgrade"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "creatine-monohydrate",
    name: "Creatine Monohydrate",
    focus: "Strength, recovery, and neuroenergetic support",
    evidenceLevel: "A",
    evidenceSummary: "Strong randomized evidence supports strength and lean-mass gains, including older adults, with secondary support for functional performance.",
    effectSize: "Reliable lean-mass and strength improvements; modest broader functional support",
    safety: "Low Risk",
    conditionTags: ["sarcopenia", "fatigue", "exercise performance", "cognitive resilience"],
    bestFor: ["healthy aging strength programs", "high-demand cognitive and physical routines"],
    cautions: "Ensure hydration and individualize use in kidney disease under clinician guidance.",
    dosing: {
      typicalDailyDose: "3-5 g",
      timing: "Daily, often with a meal or post-training",
      protocolDuration: "8-24 weeks in most intervention studies",
      notes: "Daily consistency is generally more important than exact timing for tissue saturation."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/29138605/", "https://pubmed.ncbi.nlm.nih.gov/24576864/"],
    articleRefs: ["coq10-mitochondrial-energy-aging", "silicon-valleys-200-month-memory-upgrade"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "taurine",
    name: "Taurine",
    focus: "Cardiometabolic and cellular stress support",
    evidenceLevel: "B",
    evidenceSummary: "Trials and meta-analyses show taurine can improve selected blood-pressure, lipid, and inflammation markers, with benefits varying by baseline risk.",
    effectSize: "Modest-to-meaningful biomarker improvements in metabolic and vascular contexts",
    safety: "Low Risk",
    conditionTags: ["cardiovascular", "metabolic support", "exercise recovery", "mitochondrial health"],
    bestFor: ["cardiometabolic support stacks", "recovery-focused protocols"],
    cautions: "Adjust protocols when combining with multiple blood pressure or glucose-lowering interventions.",
    dosing: {
      typicalDailyDose: "1-3 g",
      timing: "Once or twice daily with meals",
      protocolDuration: "4-16 weeks in common intervention studies",
      notes: "Clinical protocols often use divided doses to improve tolerability."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/37466109/", "https://pubmed.ncbi.nlm.nih.gov/38433474/"],
    articleRefs: ["spermidine-cardiac-disease-trial", "coq10-mitochondrial-energy-aging"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "curcumin",
    name: "Curcumin",
    focus: "Inflammation and joint-metabolic support",
    evidenceLevel: "B",
    evidenceSummary: "Curcumin can reduce pain and inflammation markers in some trials, but results depend on formulation quality and absorption.",
    effectSize: "Modest reductions in inflammatory markers and joint discomfort",
    safety: "Low Risk",
    conditionTags: ["inflammation", "joint stiffness", "metabolic support", "vascular aging"],
    bestFor: ["anti-inflammatory baseline protocols"],
    cautions: "Bioavailability differs substantially by formulation and may interact with anticoagulants.",
    dosing: {
      typicalDailyDose: "500-1500 mg standardized extract",
      timing: "With meals, often split into two doses",
      protocolDuration: "8-24 weeks in inflammation-focused studies",
      notes: "Absorption-enhanced preparations can materially change effective exposure."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/34586711/", "https://pubmed.ncbi.nlm.nih.gov/38945354/"],
    articleRefs: ["resveratrol-longevity-clinic-protocol", "the-polyphenol-stack-quietly-winning-in-cognition-clinics"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "green-tea-extract-egcg",
    name: "Green Tea Extract (EGCG)",
    focus: "Polyphenol-driven metabolic and vascular support",
    evidenceLevel: "B",
    evidenceSummary: "Meta-analyses suggest modest weight and blood-pressure support, with effect sizes dependent on dose, baseline risk, and adherence.",
    effectSize: "Small-to-modest cardiometabolic support",
    safety: "Moderate Risk",
    conditionTags: ["metabolic syndrome", "vascular function", "oxidative stress", "weight management"],
    bestFor: ["polyphenol-centered prevention plans"],
    cautions: "High-dose extracts may stress liver function in susceptible users.",
    dosing: {
      typicalDailyDose: "200-500 mg EGCG-equivalent",
      timing: "With meals, avoiding fasted high-dose use",
      protocolDuration: "8-16 weeks in metabolic studies",
      notes: "Dose should be individualized and conservative in those with liver risk factors."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/34496754/", "https://pubmed.ncbi.nlm.nih.gov/37405389/"],
    articleRefs: ["the-polyphenol-stack-quietly-winning-in-cognition-clinics", "caloric-restriction-mimetics-2025-review"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "sulforaphane",
    name: "Sulforaphane",
    focus: "Nrf2 activation and detoxification pathways",
    evidenceLevel: "B",
    evidenceSummary: "Controlled trials suggest anti-inflammatory and oxidative-stress pathway effects, though many studies remain short and indication-specific.",
    effectSize: "Modest pathway-level and symptom-level support",
    safety: "Low Risk",
    conditionTags: ["inflammation", "oxidative stress", "detox pathways", "neuroprotection"],
    bestFor: ["antioxidant defense protocols"],
    cautions: "Equivalent sulforaphane yield varies heavily by product and preparation.",
    dosing: {
      typicalDailyDose: "20-60 mg active sulforaphane equivalent",
      timing: "Daily with food",
      protocolDuration: "4-12 weeks in pilot and translational studies",
      notes: "Active yield from glucoraphanin products depends on myrosinase activity and formulation."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/38073212/", "https://pubmed.ncbi.nlm.nih.gov/37379438/"],
    articleRefs: ["caloric-restriction-mimetics-2025-review", "sirt3-activators-breakthrough-aging"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "n-acetylcysteine",
    name: "N-Acetylcysteine (NAC)",
    focus: "Glutathione restoration and oxidative stress support",
    evidenceLevel: "B",
    evidenceSummary: "Evidence supports oxidative-stress and inflammatory-pathway modulation, with strongest use in targeted clinical contexts.",
    effectSize: "Modest-to-meaningful support for oxidative and inflammatory biomarkers",
    safety: "Low Risk",
    conditionTags: ["oxidative stress", "respiratory health", "liver support", "recovery"],
    bestFor: ["high-oxidative-load protocols"],
    cautions: "Can cause GI upset and should be coordinated with existing medication regimens.",
    dosing: {
      typicalDailyDose: "600-1800 mg",
      timing: "Once or twice daily, usually with food",
      protocolDuration: "4-12 weeks in most clinical interventions",
      notes: "Lower starting doses can improve tolerance before escalation."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/37924418/", "https://pubmed.ncbi.nlm.nih.gov/39040530/"],
    articleRefs: ["coq10-mitochondrial-energy-aging", "nmn-brain-aging-breakthrough"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "glycine",
    name: "Glycine",
    focus: "Sleep quality and metabolic recovery support",
    evidenceLevel: "B",
    evidenceSummary: "Small human trials suggest glycine may improve subjective sleep quality and next-day fatigue, with low-to-moderate certainty.",
    effectSize: "Small sleep-quality and next-day recovery support",
    safety: "Low Risk",
    conditionTags: ["sleep", "recovery", "metabolic resilience", "stress regulation"],
    bestFor: ["evening recovery stacks"],
    cautions: "Can increase sedation when layered with multiple sleep-directed compounds.",
    dosing: {
      typicalDailyDose: "3-5 g",
      timing: "30-60 minutes before bedtime",
      protocolDuration: "2-8 weeks in sleep-oriented interventions",
      notes: "Most sleep protocols use pre-bed dosing rather than daytime use."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/22529837/", "https://pubmed.ncbi.nlm.nih.gov/37874350/"],
    articleRefs: ["apigenin-natural-sleep-aid", "magnesium-threonate-brain-health"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "acetyl-l-carnitine",
    name: "Acetyl-L-Carnitine (ALCAR)",
    focus: "Mitochondrial energy transport and cognitive vitality",
    evidenceLevel: "B",
    evidenceSummary: "Meta-analytic and controlled data suggest modest benefits for fatigue and selected cognitive outcomes, with variability by population and dose.",
    effectSize: "Modest fatigue and cognitive-support signal in selected cohorts",
    safety: "Moderate Risk",
    conditionTags: ["mitochondrial fatigue", "cognitive performance", "energy metabolism", "exercise intolerance"],
    bestFor: ["energy-restoration protocols with cognitive goals"],
    cautions: "May cause agitation or GI symptoms in sensitive users.",
    dosing: {
      typicalDailyDose: "500-2000 mg",
      timing: "Morning or split morning/noon dosing",
      protocolDuration: "8-16 weeks in fatigue/cognition studies",
      notes: "Earlier-day dosing is often preferred to avoid sleep disruption."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/31236111/", "https://pubmed.ncbi.nlm.nih.gov/34614671/"],
    articleRefs: ["coq10-mitochondrial-energy-aging", "the-nad-plus-uptick-that-cut-afternoon-brain-fog"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "pqq",
    name: "PQQ (Pyrroloquinoline Quinone)",
    focus: "Mitochondrial biogenesis support",
    evidenceLevel: "C",
    evidenceSummary: "Early human studies suggest support for fatigue and mitochondrial-related endpoints, but larger confirmatory trials are still needed.",
    effectSize: "Modest fatigue and mitochondrial-support signal",
    safety: "Moderate Risk",
    conditionTags: ["mitochondrial health", "fatigue", "oxidative stress", "energy resilience"],
    bestFor: ["experimental mitochondrial stacks"],
    cautions: "Human data depth is still limited and should be interpreted conservatively.",
    dosing: {
      typicalDailyDose: "10-20 mg",
      timing: "Morning with food",
      protocolDuration: "4-12 weeks in preliminary studies",
      notes: "Often stacked with CoQ10 in exploratory protocols."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/36418204/", "https://pubmed.ncbi.nlm.nih.gov/30762592/"],
    articleRefs: ["coq10-mitochondrial-energy-aging", "sirt3-activators-breakthrough-aging"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "astaxanthin",
    name: "Astaxanthin",
    focus: "Lipid-soluble antioxidant and endurance recovery support",
    evidenceLevel: "B",
    evidenceSummary: "Human evidence suggests antioxidant and inflammatory biomarker improvements, with mixed functional outcomes across studies.",
    effectSize: "Small-to-modest oxidative and inflammatory biomarker support",
    safety: "Low Risk",
    conditionTags: ["oxidative stress", "cardiometabolic support", "exercise recovery", "skin and eye aging"],
    bestFor: ["antioxidant support during training and aging"],
    cautions: "Product quality and dose standardization vary across supplements.",
    dosing: {
      typicalDailyDose: "4-12 mg",
      timing: "Daily with meals containing fat",
      protocolDuration: "8-16 weeks in recovery and oxidative stress studies",
      notes: "Fat co-ingestion improves absorption of carotenoid compounds."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/36227542/", "https://pubmed.ncbi.nlm.nih.gov/33315787/"],
    articleRefs: ["resveratrol-longevity-clinic-protocol", "the-polyphenol-stack-quietly-winning-in-cognition-clinics"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "alpha-lipoic-acid",
    name: "Alpha-Lipoic Acid (ALA)",
    focus: "Glucose metabolism and redox support",
    evidenceLevel: "B",
    evidenceSummary: "Alpha-lipoic acid may improve insulin sensitivity and glycemic markers, with larger effects in people with higher baseline metabolic risk.",
    effectSize: "Modest glucose-control and oxidative-stress support",
    safety: "Moderate Risk",
    conditionTags: ["insulin resistance", "neurometabolic support", "oxidative stress", "mitochondrial health"],
    bestFor: ["metabolic resilience protocols"],
    cautions: "Can lower blood glucose and should be coordinated with glucose-lowering medication use.",
    dosing: {
      typicalDailyDose: "300-600 mg",
      timing: "With meals or split dosing",
      protocolDuration: "8-16 weeks in metabolic studies",
      notes: "Lower initial dosing may reduce GI side effects."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/33426497/", "https://pubmed.ncbi.nlm.nih.gov/35185455/"],
    articleRefs: ["berberine-natural-ozempic-weight-loss", "caloric-restriction-mimetics-2025-review"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "citicoline",
    name: "Citicoline (CDP-Choline)",
    focus: "Attention and memory support",
    evidenceLevel: "B",
    evidenceSummary: "Human data suggest potential support for attention and selected cognitive tasks, with variability by population and protocol.",
    effectSize: "Modest attention and memory-task support in selected groups",
    safety: "Low Risk",
    conditionTags: ["focus", "memory", "brain fog", "cognitive endurance"],
    bestFor: ["cognitive performance support stacks"],
    cautions: "Can cause headaches or sleep disruption at higher doses in sensitive users.",
    dosing: {
      typicalDailyDose: "250-500 mg",
      timing: "Morning or early afternoon",
      protocolDuration: "6-12 weeks in cognition studies",
      notes: "Earlier-day use is common to limit risk of sleep disturbance."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/39014710/", "https://pubmed.ncbi.nlm.nih.gov/36774958/"],
    articleRefs: ["lions-mane-silicon-valley-nootropic", "silicon-valleys-200-month-memory-upgrade"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "bacopa-monnieri",
    name: "Bacopa Monnieri",
    focus: "Memory consolidation and stress adaptation",
    evidenceLevel: "B",
    evidenceSummary: "Meta-analyses and controlled trials support modest memory and attention benefits after sustained use.",
    effectSize: "Modest memory and attention improvements over multi-week use",
    safety: "Low Risk",
    conditionTags: ["memory", "stress", "attention", "cognitive aging"],
    bestFor: ["longer-horizon cognition support protocols"],
    cautions: "Can cause GI symptoms and daytime sedation in some users.",
    dosing: {
      typicalDailyDose: "300-450 mg standardized extract",
      timing: "With meals, usually once daily",
      protocolDuration: "8-12 weeks for measurable cognitive effect",
      notes: "Benefits are typically cumulative rather than acute."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/38409878/", "https://pubmed.ncbi.nlm.nih.gov/30097199/"],
    articleRefs: ["lions-mane-silicon-valley-nootropic", "silicon-valleys-200-month-memory-upgrade"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "ashwagandha",
    name: "Ashwagandha",
    focus: "Stress reduction and sleep quality support",
    evidenceLevel: "B",
    evidenceSummary: "Meta-analyses of randomized trials show reductions in stress and anxiety scores, with mostly mild adverse effects.",
    effectSize: "Small-to-moderate improvement in stress/anxiety scales, with some sleep benefit",
    safety: "Moderate Risk",
    conditionTags: ["stress", "anxiety", "sleep quality", "recovery"],
    bestFor: ["stress-heavy schedules with sleep disruption"],
    cautions: "May not be appropriate with thyroid or sedative-sensitive regimens.",
    dosing: {
      typicalDailyDose: "300-600 mg standardized root extract",
      timing: "Once or twice daily, often with evening emphasis",
      protocolDuration: "6-12 weeks in stress-focused trials",
      notes: "Standardization and extract type meaningfully affect comparability across products."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/39348746/", "https://pubmed.ncbi.nlm.nih.gov/36017529/"],
    articleRefs: ["apigenin-natural-sleep-aid", "lions-mane-silicon-valley-nootropic"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "rhodiola-rosea",
    name: "Rhodiola Rosea",
    focus: "Stress adaptation and fatigue resistance",
    evidenceLevel: "B",
    evidenceSummary: "Rhodiola may help fatigue and endurance in some users, but trial quality and effect size are mixed.",
    effectSize: "Modest fatigue/endurance support with heterogeneous certainty",
    safety: "Low Risk",
    conditionTags: ["fatigue", "stress", "work capacity", "mental endurance"],
    bestFor: ["high-load work periods and travel stress"],
    cautions: "May be stimulating in sensitive users when taken late in the day.",
    dosing: {
      typicalDailyDose: "200-400 mg standardized extract",
      timing: "Morning or early afternoon",
      protocolDuration: "2-8 weeks in fatigue and stress studies",
      notes: "Most protocols avoid evening dosing because of mild stimulating effects."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/41080184/", "https://pubmed.ncbi.nlm.nih.gov/22643043/"],
    articleRefs: ["the-nad-plus-uptick-that-cut-afternoon-brain-fog", "coq10-mitochondrial-energy-aging"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "melatonin",
    name: "Melatonin",
    focus: "Circadian alignment and sleep-onset support",
    evidenceLevel: "A",
    evidenceSummary: "Meta-analyses support modest sleep-onset latency reduction and circadian realignment benefits, with outcomes sensitive to dose and timing.",
    effectSize: "Reliable sleep-onset benefit with modest total-sleep-time gains",
    safety: "Moderate Risk",
    conditionTags: ["sleep latency", "circadian disruption", "jet lag", "recovery"],
    bestFor: ["circadian reset protocols", "travel-related sleep disruption"],
    cautions: "Dose timing is critical and overuse may worsen morning grogginess.",
    dosing: {
      typicalDailyDose: "0.3-3 mg",
      timing: "30-90 minutes before target bedtime",
      protocolDuration: "Short cycles or targeted periods, then reassess",
      notes: "Lower doses often achieve circadian goals with fewer next-day side effects."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/38888087/", "https://pubmed.ncbi.nlm.nih.gov/23691095/"],
    articleRefs: ["apigenin-natural-sleep-aid", "magnesium-threonate-brain-health"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "urolithin-a",
    name: "Urolithin A",
    focus: "Mitophagy and muscle-endurance support",
    evidenceLevel: "B",
    evidenceSummary: "Randomized studies show mitochondrial and muscle-function biomarker improvements, with mixed but promising functional outcomes.",
    effectSize: "Modest mitochondrial and endurance-support signal",
    safety: "Low Risk",
    conditionTags: ["mitochondrial fatigue", "muscle endurance", "healthy aging", "recovery"],
    bestFor: ["mitochondrial renewal protocols"],
    cautions: "Long-term outcome data are still maturing across diverse populations.",
    dosing: {
      typicalDailyDose: "500-1000 mg",
      timing: "Once daily with meals",
      protocolDuration: "8-16 weeks in current human interventions",
      notes: "Most available clinical protocols use daily dosing rather than cyclic use."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/40748321/", "https://pubmed.ncbi.nlm.nih.gov/33875565/"],
    articleRefs: ["coq10-mitochondrial-energy-aging", "caloric-restriction-mimetics-2025-review"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "acarbose",
    name: "Acarbose",
    focus: "Post-meal glucose control and metabolic risk reduction",
    evidenceLevel: "A",
    evidenceSummary: "Landmark prevention and follow-up studies support reduced diabetes progression risk alongside reliable post-meal glucose control.",
    effectSize: "Reliable postprandial glucose reduction with meaningful diabetes-progression risk reduction in prediabetes",
    safety: "Needs Monitoring",
    conditionTags: ["prediabetes", "postprandial glucose spikes", "metabolic syndrome"],
    bestFor: ["physician-guided glucose variability protocols"],
    cautions: "Prescription medication; GI side effects and medication interactions require clinical supervision.",
    dosing: {
      typicalDailyDose: "25-100 mg with carbohydrate-containing meals",
      timing: "At the first bite of meals",
      protocolDuration: "Longitudinal with periodic clinical review",
      notes: "Dose titration is typically gradual to improve tolerance."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/12086760/", "https://pubmed.ncbi.nlm.nih.gov/28917545/"],
    articleRefs: ["berberine-natural-ozempic-weight-loss", "caloric-restriction-mimetics-2025-review"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "trimethylglycine",
    name: "Trimethylglycine (TMG)",
    focus: "Methylation and homocysteine support",
    evidenceLevel: "B",
    evidenceSummary: "TMG reliably lowers homocysteine; the clinical payoff depends on baseline risk profile and overall B-vitamin status.",
    effectSize: "Reliable homocysteine reduction with context-dependent downstream benefit",
    safety: "Low Risk",
    conditionTags: ["homocysteine", "cardiovascular risk", "methylation support", "energy metabolism"],
    bestFor: ["methylation-focused lab-driven protocols"],
    cautions: "Should be paired with B-vitamin context in elevated homocysteine protocols.",
    dosing: {
      typicalDailyDose: "500-3000 mg",
      timing: "Once or twice daily with meals",
      protocolDuration: "4-12 weeks before reassessing homocysteine markers",
      notes: "Dose selection is usually individualized to baseline homocysteine and B-vitamin status."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/31210050/", "https://pubmed.ncbi.nlm.nih.gov/24944056/"],
    articleRefs: ["the-nad-plus-uptick-that-cut-afternoon-brain-fog", "vitamin-d-telomere-protection-vital"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "glucosamine-sulfate",
    name: "Glucosamine Sulfate",
    focus: "Joint comfort and cartilage support",
    evidenceLevel: "B",
    evidenceSummary: "Long-term trial and meta-analytic evidence suggest modest symptom relief in osteoarthritis, with heterogeneity across formulations.",
    effectSize: "Modest pain and function improvement in selected OA populations",
    safety: "Low Risk",
    conditionTags: ["joint stiffness", "mobility", "functional movement", "exercise longevity"],
    bestFor: ["long-horizon joint support strategies"],
    cautions: "Response varies and benefit tends to accumulate gradually over months.",
    dosing: {
      typicalDailyDose: "1500 mg",
      timing: "Daily with meals",
      protocolDuration: "8-24 weeks in common musculoskeletal studies",
      notes: "Consistency over time is usually required for detectable benefit."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/30030981/", "https://pubmed.ncbi.nlm.nih.gov/39798572/"],
    articleRefs: ["dasatinib-quercetin-mayo-clinic-senolytics", "fisetin-removes-zombie-cells-mayo-clinic"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "collagen-peptides",
    name: "Collagen Peptides",
    focus: "Tendon, skin, and connective tissue support",
    evidenceLevel: "B",
    evidenceSummary: "Recent meta-analyses show possible skin and connective tissue benefit, but certainty drops in higher-quality independently funded trials.",
    effectSize: "Small-to-modest skin and connective tissue signal with moderate-to-low certainty",
    safety: "Low Risk",
    conditionTags: ["joint support", "skin aging", "recovery", "mobility"],
    bestFor: ["connective tissue resilience routines"],
    cautions: "Protein quality and peptide profile vary across products.",
    dosing: {
      typicalDailyDose: "5-15 g",
      timing: "Daily, often with vitamin C-containing meals",
      protocolDuration: "8-24 weeks in skin and connective tissue studies",
      notes: "Regular daily use is more important than exact dosing time."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/40324552/", "https://pubmed.ncbi.nlm.nih.gov/37432180/"],
    articleRefs: ["dasatinib-quercetin-mayo-clinic-senolytics", "vitamin-d-immune-system-deficiency"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "beetroot-nitrate",
    name: "Beetroot Nitrate",
    focus: "Nitric oxide and vascular performance support",
    evidenceLevel: "B",
    evidenceSummary: "Nitrate supplementation shows consistent blood-pressure and exercise-efficiency support in many adults, especially with protocolized dosing.",
    effectSize: "Modest blood-pressure and endurance-performance benefit",
    safety: "Low Risk",
    conditionTags: ["blood pressure", "vascular function", "exercise tolerance", "endothelial health"],
    bestFor: ["cardiorespiratory fitness and blood-flow programs"],
    cautions: "Effect size depends on nitrate dose and timing relative to activity.",
    dosing: {
      typicalDailyDose: "300-800 mg nitrate equivalent",
      timing: "Daily or 2-3 hours pre-exercise",
      protocolDuration: "2-12 weeks in performance and vascular studies",
      notes: "Nitrate-equivalent labeling is the key metric, not raw powder grams."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/35788174/", "https://pubmed.ncbi.nlm.nih.gov/32730731/"],
    articleRefs: ["resveratrol-longevity-clinic-protocol", "coq10-mitochondrial-energy-aging"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "probiotic-multistrain",
    name: "Probiotic (Multi-Strain)",
    focus: "Microbiome support and digestive symptom reduction",
    evidenceLevel: "B",
    evidenceSummary: "Some multi-strain and strain-specific protocols improve IBS-like GI symptoms, but results are heterogeneous across trials.",
    effectSize: "Modest symptom reduction in selected GI populations",
    safety: "Low Risk",
    conditionTags: ["gut microbiome", "digestive comfort", "immune support", "inflammation"],
    bestFor: ["gut health protocols with diet-first foundation"],
    cautions: "Benefits are strain-specific and product quality is highly variable.",
    dosing: {
      typicalDailyDose: "10-50 billion CFU (strain-dependent)",
      timing: "Daily with or without food per product guidance",
      protocolDuration: "4-12 weeks before symptom reassessment",
      notes: "Choose protocols by named strains and indication rather than CFU count alone."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/37541528/", "https://pubmed.ncbi.nlm.nih.gov/38479936/"],
    articleRefs: ["vitamin-d-immune-system-deficiency", "the-polyphenol-stack-quietly-winning-in-cognition-clinics"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "psyllium-husk",
    name: "Psyllium Husk",
    focus: "Fiber-driven glycemic and lipid support",
    evidenceLevel: "A",
    evidenceSummary: "Meta-analytic evidence supports LDL reduction and bowel benefits, with additional signal for glycemic improvement in selected populations.",
    effectSize: "Reliable bowel and lipid improvements; modest glycemic support",
    safety: "Low Risk",
    conditionTags: ["constipation", "lipid support", "glucose spikes", "gut health"],
    bestFor: ["foundational dietary fiber correction"],
    cautions: "Requires adequate hydration and gradual dose escalation to reduce GI discomfort.",
    dosing: {
      typicalDailyDose: "5-15 g",
      timing: "With meals and substantial water intake",
      protocolDuration: "Ongoing foundational nutrition intervention",
      notes: "Fiber tolerance and hydration status should guide dose progression."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/30239559/", "https://pubmed.ncbi.nlm.nih.gov/41366295/"],
    articleRefs: ["berberine-natural-ozempic-weight-loss", "resveratrol-longevity-clinic-protocol"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "vitamin-b12",
    name: "Vitamin B12",
    focus: "Neurologic function and methylation support",
    evidenceLevel: "A",
    evidenceSummary: "Strong evidence supports correcting deficiency and preventing neurologic and blood-related complications when levels are low.",
    effectSize: "High efficacy in deficiency correction",
    safety: "Low Risk",
    conditionTags: ["neurologic support", "fatigue", "homocysteine", "deficiency correction"],
    bestFor: ["lab-confirmed deficiency and higher-risk dietary patterns"],
    cautions: "B12 status should be interpreted with MMA/homocysteine context when needed.",
    dosing: {
      typicalDailyDose: "250-2000 mcg (route and dose individualized)",
      timing: "Daily or weekly based on protocol",
      protocolDuration: "8-12 weeks then lab-guided maintenance",
      notes: "Dose and route depend on absorption capacity and deficiency severity."
    },
    sourceUrls: ["https://ods.od.nih.gov/factsheets/VitaminB12-HealthProfessional/", "https://pubmed.ncbi.nlm.nih.gov/32819927/"],
    articleRefs: ["the-nad-plus-uptick-that-cut-afternoon-brain-fog", "coq10-mitochondrial-energy-aging"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "lutein-zeaxanthin",
    name: "Lutein + Zeaxanthin",
    focus: "Retinal and visual-processing support",
    evidenceLevel: "B",
    evidenceSummary: "Randomized evidence supports improved macular pigment and selected visual-function outcomes with sustained intake.",
    effectSize: "Modest visual-function and retinal-support benefit with long-term use",
    safety: "Low Risk",
    conditionTags: ["visual aging", "retinal support", "screen strain", "cognitive visual processing"],
    bestFor: ["age-related visual support protocols"],
    cautions: "Benefits are gradual and usually emerge with consistent long-term use.",
    dosing: {
      typicalDailyDose: "10-20 mg lutein + 2-4 mg zeaxanthin",
      timing: "Daily with fat-containing meals",
      protocolDuration: "12-24 weeks for measurable visual outcomes",
      notes: "Macular carotenoids require sustained intake for tissue-level changes."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/32397942/", "https://pubmed.ncbi.nlm.nih.gov/38901412/"],
    articleRefs: ["epigenetic-reprogramming-eye-disease-trial", "nmn-brain-aging-breakthrough"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "zinc",
    name: "Zinc",
    focus: "Immune and enzymatic systems support",
    evidenceLevel: "A",
    evidenceSummary: "High-confidence evidence supports deficiency correction; supplementation can improve selected immune and inflammatory biomarkers in adults.",
    effectSize: "High impact in deficiency states; modest biomarker improvements otherwise",
    safety: "Moderate Risk",
    conditionTags: ["immune resilience", "deficiency correction", "wound recovery", "enzymatic function"],
    bestFor: ["nutrient repletion strategies when intake is low"],
    cautions: "Chronic high-dose intake can impair copper status and should be monitored.",
    dosing: {
      typicalDailyDose: "10-30 mg elemental zinc",
      timing: "With food to reduce nausea",
      protocolDuration: "8-12 weeks before reassessment",
      notes: "Dose selection should consider baseline intake and concurrent copper exposure."
    },
    sourceUrls: ["https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/", "https://pubmed.ncbi.nlm.nih.gov/33356467/"],
    articleRefs: ["vitamin-d-immune-system-deficiency", "vitamin-d-telomere-protection-vital"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "selenium",
    name: "Selenium",
    focus: "Antioxidant enzyme and thyroid support",
    evidenceLevel: "B",
    evidenceSummary: "Selenium clearly helps when intake is low; outside deficiency, benefits are smaller and most consistent in selected thyroid-autoimmunity profiles.",
    effectSize: "High in deficiency correction; modest biomarker improvement in selected thyroid contexts",
    safety: "Moderate Risk",
    conditionTags: ["thyroid support", "oxidative stress", "immune support", "deficiency correction"],
    bestFor: ["low-selenium dietary patterns and targeted repletion plans"],
    cautions: "Narrow therapeutic window; chronic excess can cause adverse effects.",
    dosing: {
      typicalDailyDose: "50-200 mcg",
      timing: "Daily with meals",
      protocolDuration: "8-12 weeks then lab/diet reassessment",
      notes: "Baseline intake and total selenium exposure should guide dosing."
    },
    sourceUrls: ["https://ods.od.nih.gov/factsheets/Selenium-HealthProfessional", "https://pubmed.ncbi.nlm.nih.gov/38243784/"],
    articleRefs: ["sirt3-activators-breakthrough-aging", "coq10-mitochondrial-energy-aging"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "whey-protein-isolate",
    name: "Whey Protein Isolate",
    focus: "Muscle protein synthesis and functional recovery",
    evidenceLevel: "A",
    evidenceSummary: "Recent meta-analyses show whey is most effective when paired with resistance training, with strongest gains in lower-body strength and appendicular muscle metrics.",
    effectSize: "Small-to-moderate strength and lean-mass support, highest when combined with training",
    safety: "Low Risk",
    conditionTags: ["sarcopenia", "protein intake deficit", "frailty", "recovery"],
    bestFor: ["muscle-preservation protocols in adults 40+"],
    cautions: "Dose should be individualized for total protein intake and renal considerations.",
    dosing: {
      typicalDailyDose: "20-40 g per serving",
      timing: "Post-training or distributed across meals",
      protocolDuration: "Ongoing, with periodic nutrition reassessment",
      notes: "Total daily protein target and meal distribution are more important than narrow timing windows."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/39303495/", "https://pubmed.ncbi.nlm.nih.gov/38350303/"],
    articleRefs: ["rapamycin-pearl-trial-women-benefits", "dasatinib-quercetin-mayo-clinic-senolytics"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "essential-amino-acids",
    name: "Essential Amino Acids (EAA)",
    focus: "Anabolic signaling and muscle retention",
    evidenceLevel: "A",
    evidenceSummary: "EAA blends can support strength and function in sarcopenia-oriented programs, particularly when combined with resistance exercise; effects vary by baseline protein intake.",
    effectSize: "Modest muscle-function support, stronger when paired with training",
    safety: "Low Risk",
    conditionTags: ["sarcopenia", "muscle preservation", "recovery", "protein intake deficit"],
    bestFor: ["low appetite or low-protein populations"],
    cautions: "Use within an overall protein plan, not as a complete replacement for dietary protein.",
    dosing: {
      typicalDailyDose: "8-15 g EAA blend",
      timing: "Between meals or peri-training",
      protocolDuration: "8-16 weeks in muscle maintenance protocols",
      notes: "Leucine content and total essential amino profile determine anabolic potency."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/41540398/", "https://pubmed.ncbi.nlm.nih.gov/30273819/"],
    articleRefs: ["rapamycin-pearl-trial-women-benefits", "coq10-mitochondrial-energy-aging"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "hmb",
    name: "HMB (Beta-Hydroxy Beta-Methylbutyrate)",
    focus: "Muscle preservation under stress and aging",
    evidenceLevel: "B",
    evidenceSummary: "Evidence supports preservation of lean mass and selected functional outcomes, especially when paired with resistance training.",
    effectSize: "Modest lean-mass and functional-support benefit",
    safety: "Low Risk",
    conditionTags: ["frailty", "sarcopenia", "recovery", "muscle loss"],
    bestFor: ["deconditioning and recovery phases"],
    cautions: "Works best when paired with adequate protein intake and resistance exercise.",
    dosing: {
      typicalDailyDose: "3 g",
      timing: "Split into 2-3 doses with meals",
      protocolDuration: "8-24 weeks in muscle-focused studies",
      notes: "Effect size is generally larger in less-trained and older populations."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/39391640/", "https://pubmed.ncbi.nlm.nih.gov/29660914/"],
    articleRefs: ["rapamycin-pearl-trial-women-benefits", "spermidine-cardiac-disease-trial"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "citrulline-malate",
    name: "Citrulline Malate",
    focus: "Nitric oxide support and exercise tolerance",
    evidenceLevel: "B",
    evidenceSummary: "Trials suggest modest support for exercise performance and blood-flow-related outcomes, with heterogeneity by training status and dose.",
    effectSize: "Small-to-modest endurance and fatigue-support signal",
    safety: "Low Risk",
    conditionTags: ["endothelial function", "exercise tolerance", "fatigue", "cardiorespiratory fitness"],
    bestFor: ["performance and vascular support protocols"],
    cautions: "Dose timing and total citrulline content vary across products.",
    dosing: {
      typicalDailyDose: "3-8 g citrulline equivalent",
      timing: "30-90 minutes pre-exercise or split daily",
      protocolDuration: "4-12 weeks in performance interventions",
      notes: "Product labels often list total compound weight rather than active citrulline content."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/41076031/", "https://pubmed.ncbi.nlm.nih.gov/31292305/"],
    articleRefs: ["coq10-mitochondrial-energy-aging", "resveratrol-longevity-clinic-protocol"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "beta-alanine",
    name: "Beta-Alanine",
    focus: "Muscle buffering capacity and fatigue resistance",
    evidenceLevel: "B",
    evidenceSummary: "Strongest evidence is for high-intensity exercise capacity improvement through increased carnosine buffering; effects vary by event duration.",
    effectSize: "Modest high-intensity performance benefit",
    safety: "Low Risk",
    conditionTags: ["fatigue resistance", "exercise tolerance", "muscle performance", "conditioning"],
    bestFor: ["high-intensity training blocks"],
    cautions: "Transient paresthesia is common at larger single doses.",
    dosing: {
      typicalDailyDose: "2-6 g",
      timing: "Split doses across the day",
      protocolDuration: "4-12 weeks for tissue carnosine loading",
      notes: "Smaller divided doses improve tolerability and reduce tingling."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/37741729/", "https://pubmed.ncbi.nlm.nih.gov/32219184/"],
    articleRefs: ["coq10-mitochondrial-energy-aging", "the-nad-plus-uptick-that-cut-afternoon-brain-fog"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "boswellia-serrata",
    name: "Boswellia Serrata",
    focus: "Joint comfort and inflammatory pathway support",
    evidenceLevel: "B",
    evidenceSummary: "Controlled trials and meta-analysis show modest pain and function benefits in osteoarthritis-related symptom profiles.",
    effectSize: "Modest joint-pain and function support",
    safety: "Low Risk",
    conditionTags: ["joint stiffness", "mobility", "inflammation", "functional movement"],
    bestFor: ["joint support protocols"],
    cautions: "Standardization and boswellic acid profile drive product variability.",
    dosing: {
      typicalDailyDose: "100-300 mg standardized extract",
      timing: "Once or twice daily with meals",
      protocolDuration: "8-16 weeks in symptom-focused studies",
      notes: "Most protocols rely on standardized extracts rather than crude resin powders."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/37005356/", "https://pubmed.ncbi.nlm.nih.gov/35119758/"],
    articleRefs: ["resveratrol-longevity-clinic-protocol", "the-polyphenol-stack-quietly-winning-in-cognition-clinics"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "ginger-extract",
    name: "Ginger Extract",
    focus: "Digestive comfort and anti-inflammatory support",
    evidenceLevel: "B",
    evidenceSummary: "Meta-analytic evidence supports modest anti-inflammatory and pain-related benefits, with best effects in protocolized dosing windows.",
    effectSize: "Modest inflammatory-marker and symptom support",
    safety: "Low Risk",
    conditionTags: ["digestive discomfort", "inflammation", "joint stiffness", "metabolic support"],
    bestFor: ["food-tolerance and inflammation-aware plans"],
    cautions: "May interact with anticoagulant regimens at higher doses.",
    dosing: {
      typicalDailyDose: "500-1500 mg extract",
      timing: "With meals",
      protocolDuration: "4-12 weeks in common interventions",
      notes: "Standardized gingerol content improves dose comparability."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/33433034/", "https://pubmed.ncbi.nlm.nih.gov/36145415/"],
    articleRefs: ["resveratrol-longevity-clinic-protocol", "spermidine-cardiac-disease-trial"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "aged-garlic-extract",
    name: "Aged Garlic Extract",
    focus: "Vascular support and blood-pressure modulation",
    evidenceLevel: "B",
    evidenceSummary: "Randomized evidence supports blood-pressure and arterial-stiffness improvements, especially in hypertensive or higher-risk groups.",
    effectSize: "Modest blood-pressure and vascular-function support",
    safety: "Low Risk",
    conditionTags: ["hypertension", "cardiovascular risk", "endothelial function", "inflammation"],
    bestFor: ["vascular-risk reduction stacks"],
    cautions: "Can increase bleeding risk when layered with anticoagulants or antiplatelets.",
    dosing: {
      typicalDailyDose: "600-1200 mg",
      timing: "Daily with meals",
      protocolDuration: "8-24 weeks in vascular studies",
      notes: "Standardized aged formulations are preferred over raw garlic extrapolations."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/37225597/", "https://pubmed.ncbi.nlm.nih.gov/31496104/"],
    articleRefs: ["spermidine-cardiac-disease-trial", "resveratrol-longevity-clinic-protocol"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "cocoa-flavanols",
    name: "Cocoa Flavanols",
    focus: "Vascular-cognitive support",
    evidenceLevel: "B",
    evidenceSummary: "Trials and meta-analyses support endothelial and blood-pressure benefits, with effects linked to flavanol dose and intake consistency.",
    effectSize: "Modest endothelial-function and blood-pressure benefit",
    safety: "Low Risk",
    conditionTags: ["endothelial function", "cognitive resilience", "blood flow", "oxidative stress"],
    bestFor: ["polyphenol-first cognition protocols"],
    cautions: "Effective flavanol dose is often higher than typical chocolate intake provides.",
    dosing: {
      typicalDailyDose: "400-800 mg cocoa flavanols",
      timing: "Daily with meals",
      protocolDuration: "8-16 weeks in vascular/cognition studies",
      notes: "Use standardized flavanol products rather than sugar-heavy cocoa foods."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/37656872/", "https://pubmed.ncbi.nlm.nih.gov/35217774/"],
    articleRefs: ["the-polyphenol-stack-quietly-winning-in-cognition-clinics", "silicon-valleys-200-month-memory-upgrade"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "olive-leaf-extract",
    name: "Olive Leaf Extract",
    focus: "Cardiometabolic polyphenol support",
    evidenceLevel: "B",
    evidenceSummary: "Randomized evidence suggests modest blood-pressure and cardiometabolic marker benefits in selected populations.",
    effectSize: "Small-to-modest vascular and metabolic support",
    safety: "Low Risk",
    conditionTags: ["blood pressure", "metabolic syndrome", "oxidative stress", "vascular aging"],
    bestFor: ["Mediterranean-style prevention stacks"],
    cautions: "May potentiate glucose- or blood-pressure-lowering therapies in some users.",
    dosing: {
      typicalDailyDose: "500-1000 mg standardized extract",
      timing: "Once or twice daily with meals",
      protocolDuration: "8-16 weeks in cardiometabolic interventions",
      notes: "Hydroxytyrosol and oleuropein standardization improves product consistency."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/33664098/", "https://pubmed.ncbi.nlm.nih.gov/27451317/"],
    articleRefs: ["the-polyphenol-stack-quietly-winning-in-cognition-clinics", "resveratrol-longevity-clinic-protocol"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "milk-thistle-silymarin",
    name: "Milk Thistle (Silymarin)",
    focus: "Liver enzyme and oxidative-stress support",
    evidenceLevel: "B",
    evidenceSummary: "Silymarin can improve liver enzymes in some groups, but effects vary by liver condition and baseline disease severity.",
    effectSize: "Modest liver-enzyme support in selected hepatic-risk contexts",
    safety: "Low Risk",
    conditionTags: ["liver support", "oxidative stress", "metabolic health", "detox pathways"],
    bestFor: ["liver-risk mitigation protocols"],
    cautions: "Should be coordinated with medication regimens due to potential interaction pathways.",
    dosing: {
      typicalDailyDose: "140-420 mg standardized silymarin",
      timing: "Once or twice daily with meals",
      protocolDuration: "8-16 weeks with biomarker reassessment",
      notes: "Standardized silymarin content is key for reproducibility across products."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/30032484/", "https://pubmed.ncbi.nlm.nih.gov/28131980/"],
    articleRefs: ["caloric-restriction-mimetics-2025-review", "coq10-mitochondrial-energy-aging"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "inulin-prebiotic-fiber",
    name: "Inulin (Prebiotic Fiber)",
    focus: "Microbiome fermentation and metabolic support",
    evidenceLevel: "B",
    evidenceSummary: "Inulin can improve stool regularity, microbiome balance, and selected metabolic markers, but dose increases should be gradual to limit GI side effects.",
    effectSize: "Modest gut and metabolic-support benefits",
    safety: "Low Risk",
    conditionTags: ["gut microbiome", "constipation", "glucose support", "digestive resilience"],
    bestFor: ["diet-first gut ecosystem protocols"],
    cautions: "Rapid dose escalation can increase bloating and GI discomfort.",
    dosing: {
      typicalDailyDose: "3-10 g",
      timing: "With meals and adequate hydration",
      protocolDuration: "4-12 weeks with symptom-guided titration",
      notes: "Gradual dose titration improves tolerance while preserving prebiotic benefits."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/38389996/", "https://pubmed.ncbi.nlm.nih.gov/36743690/"],
    articleRefs: ["vitamin-d-immune-system-deficiency", "the-polyphenol-stack-quietly-winning-in-cognition-clinics"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "potassium-citrate",
    name: "Potassium Citrate",
    focus: "Acid-base and kidney stone risk support",
    evidenceLevel: "A",
    evidenceSummary: "Established clinical use for urinary citrate support and stone-risk reduction in selected settings.",
    effectSize: "Meaningful reduction in kidney stone recurrence risk in indicated populations",
    safety: "Needs Monitoring",
    conditionTags: ["kidney stone risk", "electrolyte balance", "renal support", "hydration protocols"],
    bestFor: ["clinician-guided stone prevention protocols"],
    cautions: "Requires clinical oversight in renal disease and with potassium-sensitive medications.",
    dosing: {
      typicalDailyDose: "10-30 mEq (individualized)",
      timing: "Divided doses with meals",
      protocolDuration: "Longitudinal with laboratory and urinary monitoring",
      notes: "Dose should be guided by urinary chemistry and renal function context."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/9366314/", "https://pubmed.ncbi.nlm.nih.gov/26439475/"],
    articleRefs: ["coq10-mitochondrial-energy-aging", "vitamin-d-immune-system-deficiency"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "phosphatidylserine",
    name: "Phosphatidylserine",
    focus: "Stress reactivity and cognitive support",
    evidenceLevel: "B",
    evidenceSummary: "Small human trials suggest potential cognition and stress-response benefits, but evidence remains mixed across protocols.",
    effectSize: "Modest cognition and stress-response support signal",
    safety: "Low Risk",
    conditionTags: ["cognitive fatigue", "stress load", "attention", "memory support"],
    bestFor: ["high-cognitive-load schedules with stress reactivity"],
    cautions: "May have additive calming effects when combined with multiple sedative-adjacent compounds.",
    dosing: {
      typicalDailyDose: "100-300 mg",
      timing: "Morning or split morning/evening",
      protocolDuration: "4-12 weeks in stress/cognition interventions",
      notes: "Protocol timing can be personalized to daytime stress pattern."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/38767580/", "https://pubmed.ncbi.nlm.nih.gov/34275881/"],
    articleRefs: ["lions-mane-silicon-valley-nootropic", "the-nad-plus-uptick-that-cut-afternoon-brain-fog"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "chromium-picolinate",
    name: "Chromium Picolinate",
    focus: "Insulin signaling and glycemic support",
    evidenceLevel: "B",
    evidenceSummary: "Evidence suggests modest glycemic support in selected insulin-resistant populations, with variable effect size across trials.",
    effectSize: "Small-to-modest glucose and insulin-marker support",
    safety: "Low Risk",
    conditionTags: ["insulin resistance", "postprandial glucose", "metabolic syndrome", "appetite regulation"],
    bestFor: ["adjunctive metabolic support protocols"],
    cautions: "Should be coordinated with existing glucose-lowering therapy plans.",
    dosing: {
      typicalDailyDose: "200-1000 mcg",
      timing: "With meals",
      protocolDuration: "8-16 weeks before biomarker reassessment",
      notes: "Clinical response is variable and strongest in higher baseline dysregulation settings."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/35285809/", "https://pubmed.ncbi.nlm.nih.gov/35671807/"],
    articleRefs: ["berberine-natural-ozempic-weight-loss", "resveratrol-longevity-clinic-protocol"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "myo-inositol",
    name: "Myo-Inositol",
    focus: "Insulin sensitivity and endocrine-metabolic support",
    evidenceLevel: "B",
    evidenceSummary: "Best evidence is in insulin-resistant and PCOS-like profiles, where myo-inositol can improve insulin markers and selected hormone-related outcomes.",
    effectSize: "Modest glucose and hormonal-metabolic support",
    safety: "Low Risk",
    conditionTags: ["insulin resistance", "metabolic flexibility", "hormonal support", "glucose control"],
    bestFor: ["metabolic and endocrine support protocols"],
    cautions: "Best used within a full nutrition and activity plan rather than as standalone therapy.",
    dosing: {
      typicalDailyDose: "2-4 g",
      timing: "Once or twice daily",
      protocolDuration: "8-24 weeks in endocrine-metabolic studies",
      notes: "Dose can be split to improve GI comfort."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/36080199/", "https://pubmed.ncbi.nlm.nih.gov/34941522/"],
    articleRefs: ["berberine-natural-ozempic-weight-loss", "caloric-restriction-mimetics-2025-review"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "calcium-alpha-ketoglutarate",
    name: "Calcium Alpha-Ketoglutarate (Ca-AKG)",
    focus: "Cellular metabolism and healthy aging pathways",
    evidenceLevel: "C",
    evidenceSummary: "Human evidence is still early and exploratory, with stronger support currently from mechanistic and preclinical aging models.",
    effectSize: "Early translational signal; clinical effect size uncertain",
    safety: "Moderate Risk",
    conditionTags: ["healthy aging", "metabolic resilience", "mitochondrial support", "frailty risk"],
    bestFor: ["research-oriented longevity protocols"],
    cautions: "Human clinical endpoint evidence remains early and should be interpreted conservatively.",
    dosing: {
      typicalDailyDose: "1-3 g",
      timing: "Daily with meals",
      protocolDuration: "8-24 weeks in exploratory protocols",
      notes: "Use is best framed as experimental while higher-quality human data mature."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/40865099/", "https://pubmed.ncbi.nlm.nih.gov/40631595/"],
    articleRefs: ["caloric-restriction-mimetics-2025-review", "sirt3-activators-breakthrough-aging"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "l-carnosine",
    name: "L-Carnosine",
    focus: "Anti-glycation and oxidative-stress support",
    evidenceLevel: "B",
    evidenceSummary: "Emerging clinical and metabolic data suggest potential support for glycemic and stress-related markers, with moderate heterogeneity.",
    effectSize: "Modest metabolic and oxidative-support signal",
    safety: "Low Risk",
    conditionTags: ["glycation", "metabolic aging", "oxidative stress", "vascular support"],
    bestFor: ["glycation-aware metabolic protocols"],
    cautions: "Outcome effects are generally modest and should be paired with diet and glucose control.",
    dosing: {
      typicalDailyDose: "500-2000 mg",
      timing: "Once or twice daily with meals",
      protocolDuration: "8-16 weeks in metabolic and oxidative-stress studies",
      notes: "Best interpreted as adjunctive support, not a replacement for glycemic control fundamentals."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/36057289/", "https://pubmed.ncbi.nlm.nih.gov/39380447/"],
    articleRefs: ["berberine-natural-ozempic-weight-loss", "vitamin-d-telomere-protection-vital"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "tauroursodeoxycholic-acid",
    name: "Tauroursodeoxycholic Acid (TUDCA)",
    focus: "Cellular stress response and hepatobiliary support",
    evidenceLevel: "C",
    evidenceSummary: "Early human and translational evidence supports hepatometabolic and stress-response pathway effects, but broad long-term outcomes remain uncertain.",
    effectSize: "Modest hepatometabolic and cellular-stress support signal",
    safety: "Needs Monitoring",
    conditionTags: ["liver support", "cellular stress", "metabolic dysfunction", "biliary support"],
    bestFor: ["clinician-guided advanced metabolic support"],
    cautions: "Use should be supervised due to limited long-term consumer safety data.",
    dosing: {
      typicalDailyDose: "250-1000 mg",
      timing: "With meals, divided if needed",
      protocolDuration: "4-12 weeks in exploratory settings",
      notes: "Intervention should be paired with clinical context and follow-up monitoring."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/32494460/", "https://pubmed.ncbi.nlm.nih.gov/37233865/"],
    articleRefs: ["caloric-restriction-mimetics-2025-review", "coq10-mitochondrial-energy-aging"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "vitamin-c",
    name: "Vitamin C",
    focus: "Antioxidant and immune support",
    evidenceLevel: "A",
    evidenceSummary: "Evidence is strongest for deficiency correction; in replete adults, routine supplementation has little effect on incidence but may modestly reduce cold duration and severity.",
    effectSize: "High in deficiency correction; modest reduction in respiratory-illness duration in selected settings",
    safety: "Low Risk",
    conditionTags: ["immune resilience", "oxidative stress", "deficiency correction", "recovery support"],
    bestFor: ["dietary insufficiency correction and recovery protocols"],
    cautions: "High doses can increase GI side effects and may raise stone risk in susceptible individuals.",
    dosing: {
      typicalDailyDose: "250-1000 mg",
      timing: "With meals, divided at higher doses",
      protocolDuration: "Ongoing with periodic need reassessment",
      notes: "Dose should match dietary intake gaps and individual tolerance."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/38082300/", "https://pubmed.ncbi.nlm.nih.gov/23440782/"],
    articleRefs: ["vitamin-d-immune-system-deficiency", "vitamin-d-telomere-protection-vital"],
    updatedAt: "2026-02-17"
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
    guidanceSummary: "Treat metabolic syndrome with a combined plan for movement, nutrition, sleep, and coaching rather than single-domain changes.",
    monitoring: ["A1C", "fasting glucose", "triglyceride:HDL", "waist circumference"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/41207299/", "https://pubmed.ncbi.nlm.nih.gov/17922167/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "obesity-and-adiposity",
    name: "Obesity and Adiposity",
    goal: "Reduce fat mass while preserving lean tissue",
    keywords: ["obesity", "adiposity", "weight loss", "body fat", "appetite"],
    evidenceLevel: "A",
    topInterventions: ["protein-forward nutrition", "resistance training", "sleep/stress management"],
    guidanceSummary: "Durable adiposity reduction is most likely when calorie control, protein adequacy, resistance training, and behavioral adherence systems are combined and adjusted over months, not weeks.",
    monitoring: ["waist circumference", "body composition", "A1C", "fasting insulin"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/29466592/", "https://pubmed.ncbi.nlm.nih.gov/21836103/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "type-2-diabetes-risk",
    name: "Type 2 Diabetes Risk",
    goal: "Delay or prevent progression to diabetes",
    keywords: ["prediabetes", "type 2 diabetes", "glucose control", "insulin"],
    evidenceLevel: "A",
    topInterventions: ["structured activity", "carbohydrate quality", "weight loss"],
    guidanceSummary: "Early structured intervention centered on weight loss, physical activity, and nutrition quality can produce durable diabetes-risk reduction.",
    monitoring: ["A1C", "fasting glucose", "time in range", "fasting insulin"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/11832527/", "https://pubmed.ncbi.nlm.nih.gov/26377054/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "cardiovascular-risk",
    name: "Cardiovascular Risk",
    goal: "Lower long-term risk of heart attack and stroke",
    keywords: ["cardiovascular", "heart disease", "vascular", "atherosclerosis"],
    evidenceLevel: "A",
    topInterventions: ["blood pressure control", "lipid optimization", "aerobic and strength training"],
    guidanceSummary: "Risk reduction is strongest when blood pressure, atherogenic lipids, glucose, activity, and tobacco exposure are managed together.",
    monitoring: ["apoB/LDL-C", "blood pressure", "hs-CRP", "VO2 max"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/30879339/", "https://pubmed.ncbi.nlm.nih.gov/26551272/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "hypertension",
    name: "Hypertension",
    goal: "Bring blood pressure into guideline range",
    keywords: ["hypertension", "high blood pressure", "bp"],
    evidenceLevel: "A",
    topInterventions: ["sodium reduction", "aerobic exercise", "weight reduction"],
    guidanceSummary: "Home blood-pressure tracking plus sodium reduction, aerobic training, and weight management remains a high-leverage core strategy.",
    monitoring: ["home BP log", "resting heart rate", "kidney function"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/29133356/", "https://pubmed.ncbi.nlm.nih.gov/26551272/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "sleep-disruption-and-insomnia",
    name: "Sleep Disruption and Insomnia",
    goal: "Improve sleep onset, depth, and recovery quality",
    keywords: ["insomnia", "sleep", "sleep quality", "sleep latency", "circadian"],
    evidenceLevel: "B",
    topInterventions: ["regular schedule", "light timing", "CBT-I principles"],
    guidanceSummary: "CBT-I remains first-line, while timing of light and targeted adjunctive compounds can support sleep-onset and recovery.",
    monitoring: ["sleep latency", "night awakenings", "total sleep", "subjective recovery"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/36461882/", "https://pubmed.ncbi.nlm.nih.gov/32950013/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "cognitive-decline-risk",
    name: "Cognitive Decline Risk",
    goal: "Preserve processing speed and memory over time",
    keywords: ["cognitive decline", "memory", "brain fog", "neurodegeneration", "alzheimer"],
    evidenceLevel: "B",
    topInterventions: ["aerobic training", "blood pressure control", "sleep quality"],
    guidanceSummary: "Best results come from a combined plan: regular exercise, blood-pressure control, quality sleep, and ongoing cognitive activity.",
    monitoring: ["blood pressure", "sleep duration", "executive function screens"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/29055814/", "https://pubmed.ncbi.nlm.nih.gov/39875685/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "mood-and-anxiety-load",
    name: "Mood and Anxiety Load",
    goal: "Reduce anxiety burden and stabilize mood",
    keywords: ["anxiety", "stress", "depression", "mood", "cortisol"],
    evidenceLevel: "B",
    topInterventions: ["sleep regularization", "daily aerobic movement", "skills training"],
    guidanceSummary: "Exercise and behavioral therapies can reduce anxiety burden, with strongest effects from consistent adherence rather than short bursts.",
    monitoring: ["symptom scores", "sleep quality", "HRV"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/28819746/", "https://pubmed.ncbi.nlm.nih.gov/39952828/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "sarcopenia-and-frailty",
    name: "Sarcopenia and Frailty",
    goal: "Preserve strength and functional independence",
    keywords: ["sarcopenia", "frailty", "muscle loss", "strength decline"],
    evidenceLevel: "A",
    topInterventions: ["progressive resistance training", "higher protein", "mobility work"],
    guidanceSummary: "Strength decline is highly modifiable with structured resistance training, adequate protein, and routine functional monitoring.",
    monitoring: ["grip strength", "chair-rise", "gait speed", "lean mass"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/30312372/", "https://pubmed.ncbi.nlm.nih.gov/32740889/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "osteopenia-and-fragility",
    name: "Osteopenia and Fragility",
    goal: "Increase bone strength and reduce fracture risk",
    keywords: ["osteopenia", "osteoporosis", "bone density", "fracture risk"],
    evidenceLevel: "A",
    topInterventions: ["resistance training", "protein adequacy", "fall prevention"],
    guidanceSummary: "Combined resistance and impact loading, adequate protein/calcium/vitamin D, and fracture-risk-guided medical follow-up produce the strongest outcomes.",
    monitoring: ["DEXA", "grip strength", "fall history", "vitamin D"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/33367736/", "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/osteoporosis-screening"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "chronic-inflammation",
    name: "Chronic Inflammation",
    goal: "Reduce persistent low-grade inflammatory burden",
    keywords: ["inflammation", "inflammatory", "crp", "immune dysregulation"],
    evidenceLevel: "B",
    topInterventions: ["body composition", "sleep optimization", "anti-inflammatory diet"],
    guidanceSummary: "Lower chronic inflammation through sustained diet quality, regular activity, sleep consistency, and body-composition improvement.",
    monitoring: ["hs-CRP", "sleep quality", "waist circumference", "fasting glucose"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/41211687/", "https://pubmed.ncbi.nlm.nih.gov/27445361/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "mitochondrial-fatigue",
    name: "Mitochondrial Fatigue",
    goal: "Improve cellular energy and persistent fatigue symptoms",
    keywords: ["fatigue", "mitochondrial", "energy", "low energy", "exercise intolerance"],
    evidenceLevel: "B",
    topInterventions: ["graded conditioning", "sleep restoration", "micronutrient correction"],
    guidanceSummary: "Energy-related fatigue improves most when graded conditioning and recovery are combined with targeted metabolic and micronutrient support.",
    monitoring: ["fatigue scores", "activity tolerance", "sleep", "heart-rate recovery"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/36091835/", "https://pubmed.ncbi.nlm.nih.gov/33668309/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "brain-fog-and-cognitive-fatigue",
    name: "Brain Fog and Cognitive Fatigue",
    goal: "Stabilize daytime mental clarity and sustained attention",
    keywords: ["brain fog", "cognitive fatigue", "attention drift", "working memory", "mental stamina"],
    evidenceLevel: "B",
    topInterventions: ["sleep timing discipline", "metabolic stabilization", "targeted nootropic protocols"],
    guidanceSummary: "Brain-fog management is strongest with sleep regularity, glucose stability, and structured cognitive pacing, while reversible drivers such as medication effects, mood load, and apnea are actively screened.",
    monitoring: ["subjective focus scores", "work-block duration", "sleep quality", "resting heart rate"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/39040197/", "https://pubmed.ncbi.nlm.nih.gov/37158780/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "telomere-attrition-risk",
    name: "Telomere Attrition Risk",
    goal: "Slow accelerated cellular aging pressure",
    keywords: ["telomere", "telomere shortening", "cellular aging", "biological age", "telomere attrition"],
    evidenceLevel: "B",
    topInterventions: ["exercise adherence", "inflammation control", "deficiency correction"],
    guidanceSummary: "Lifestyle programs emphasizing physical activity and diet quality show the strongest evidence for slowing telomere attrition trajectories.",
    monitoring: ["vitamin D status", "hs-CRP", "sleep duration", "longitudinal biomarker panels"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/35760212/", "https://pubmed.ncbi.nlm.nih.gov/37478811/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "immune-resilience-gap",
    name: "Immune Resilience Gap",
    goal: "Reduce infection susceptibility and immune volatility",
    keywords: ["immune resilience", "infection risk", "respiratory infection", "immune function", "deficiency"],
    evidenceLevel: "A",
    topInterventions: ["vitamin D optimization", "sleep recovery", "metabolic control"],
    guidanceSummary: "Correcting deficiency states, sleep regularity, and metabolic risk control are the most reproducible foundations for lower respiratory-infection burden.",
    monitoring: ["25(OH)D", "infection frequency", "sleep regularity", "hs-CRP"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/30675873/", "https://pubmed.ncbi.nlm.nih.gov/28202713/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "endothelial-function-decline",
    name: "Endothelial Function Decline",
    goal: "Improve vascular responsiveness and arterial health",
    keywords: ["endothelial dysfunction", "vascular stiffness", "arterial health", "blood flow", "vascular aging"],
    evidenceLevel: "B",
    topInterventions: ["aerobic conditioning", "blood pressure control", "polyphenol-rich nutrition"],
    guidanceSummary: "Endothelial function improves most with regular aerobic training and blood-pressure/metabolic risk control, with additional benefit from diet quality.",
    monitoring: ["blood pressure", "resting heart rate", "lipid profile", "hs-CRP"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/40079841/", "https://pubmed.ncbi.nlm.nih.gov/40818085/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "cellular-senescence-burden",
    name: "Cellular Senescence Burden",
    goal: "Lower inflammatory load linked to senescent cell accumulation",
    keywords: ["senescent cells", "cellular senescence", "senolytic", "zombie cells", "inflammaging"],
    evidenceLevel: "C",
    topInterventions: ["resistance training", "anti-inflammatory nutrition", "protocolized senolytic cycles"],
    guidanceSummary: "Human senolytic evidence is still early and condition-specific, so protocols should stay conservative, prioritize functional monitoring, and avoid extrapolating animal-effect sizes to broad anti-aging claims.",
    monitoring: ["hs-CRP", "functional strength metrics", "recovery markers", "bone health trends"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/30616998/", "https://pubmed.ncbi.nlm.nih.gov/40437670/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "insulin-resistance",
    name: "Insulin Resistance",
    goal: "Improve glucose disposal and fasting insulin profile",
    keywords: ["insulin resistance", "fasting insulin", "homa-ir", "postprandial glucose", "metabolic dysfunction"],
    evidenceLevel: "A",
    topInterventions: ["resistance and interval training", "fiber-forward carbohydrate timing", "sleep correction"],
    guidanceSummary: "Insulin resistance improves most with steady weight loss, regular movement, and better carbohydrate quality and timing.",
    monitoring: ["fasting insulin", "HOMA-IR", "A1C", "waist circumference"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/11832527/", "https://pubmed.ncbi.nlm.nih.gov/27550085/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "dyslipidemia-and-high-apob",
    name: "Dyslipidemia and High ApoB",
    goal: "Lower atherogenic lipid burden and vascular risk",
    keywords: ["dyslipidemia", "apob", "ldl", "triglycerides", "atherogenic lipids"],
    evidenceLevel: "A",
    topInterventions: ["dietary fat quality optimization", "aerobic training", "weight and glucose control"],
    guidanceSummary: "ApoB-centered risk management can sharpen atherogenic risk assessment beyond LDL-C alone and improve intervention targeting.",
    monitoring: ["apoB", "LDL-C", "non-HDL-C", "triglycerides"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/30586774/", "https://pubmed.ncbi.nlm.nih.gov/21487090/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "non-alcoholic-fatty-liver-risk",
    name: "Non-Alcoholic Fatty Liver Risk",
    goal: "Reduce hepatic fat burden and improve liver enzymes",
    keywords: ["fatty liver", "nafld", "masld", "hepatic steatosis", "liver enzymes"],
    evidenceLevel: "A",
    topInterventions: ["weight reduction", "fructose and alcohol reduction", "resistance training"],
    guidanceSummary: "Sustained weight loss and structured exercise can reduce liver fat and improve enzymes, with larger benefits at clinically meaningful weight-loss thresholds.",
    monitoring: ["ALT/AST", "GGT", "waist circumference", "liver imaging"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/19827166/", "https://pubmed.ncbi.nlm.nih.gov/35636454/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "postprandial-glucose-spikes",
    name: "Postprandial Glucose Spikes",
    goal: "Flatten glucose variability after meals",
    keywords: ["postprandial glucose", "glucose spikes", "glycemic variability", "cgm", "meal response"],
    evidenceLevel: "B",
    topInterventions: ["meal composition sequencing", "post-meal walking", "carbohydrate load distribution"],
    guidanceSummary: "Meal sequencing and post-meal walking can meaningfully blunt glucose excursions and reduce daily glycemic variability.",
    monitoring: ["CGM time in range", "post-meal glucose peak", "fasting glucose", "A1C"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/32277270/", "https://pubmed.ncbi.nlm.nih.gov/26704625/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "chronic-stress-overload",
    name: "Chronic Stress Overload",
    goal: "Lower allostatic load and restore recovery bandwidth",
    keywords: ["chronic stress", "allostatic load", "burnout", "cortisol", "recovery deficit"],
    evidenceLevel: "B",
    topInterventions: ["sleep anchoring", "aerobic movement", "structured stress-skills practice"],
    guidanceSummary: "Structured stress-reduction programs and mindfulness-based protocols can lower stress scores when practiced consistently over weeks to months.",
    monitoring: ["sleep regularity", "resting heart rate", "HRV trend", "symptom scales"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/30714811/", "https://pubmed.ncbi.nlm.nih.gov/25818837/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "circadian-misalignment",
    name: "Circadian Misalignment",
    goal: "Realign sleep-wake timing and daytime alertness",
    keywords: ["circadian rhythm", "shift work", "jet lag", "sleep timing", "melatonin rhythm"],
    evidenceLevel: "B",
    topInterventions: ["morning light timing", "consistent wake time", "targeted melatonin use"],
    guidanceSummary: "Morning/shift-timed light exposure, consistent wake anchors, and daytime-aligned eating are core levers for circadian correction.",
    monitoring: ["sleep midpoint", "wake consistency", "daytime alertness", "sleep latency"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/39747347/", "https://pubmed.ncbi.nlm.nih.gov/34860550/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "low-cardiorespiratory-fitness",
    name: "Low Cardiorespiratory Fitness",
    goal: "Improve aerobic capacity and resilience",
    keywords: ["vo2 max", "cardiorespiratory fitness", "aerobic capacity", "exercise tolerance", "conditioning"],
    evidenceLevel: "A",
    topInterventions: ["progressive aerobic training", "zone 2 base work", "interval sessions"],
    guidanceSummary: "Progressive aerobic and interval training protocols consistently improve VO2 metrics and are strong modifiers of long-term health risk.",
    monitoring: ["VO2 max estimate", "resting heart rate", "exercise tolerance", "blood pressure"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/38599681/", "https://pubmed.ncbi.nlm.nih.gov/40501026/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "gut-microbiome-dysbiosis",
    name: "Gut Microbiome Dysbiosis",
    goal: "Improve digestive resilience and gut ecosystem diversity",
    keywords: ["microbiome", "dysbiosis", "gut health", "digestive symptoms", "microbial diversity"],
    evidenceLevel: "B",
    topInterventions: ["high-fiber diet pattern", "fermented food intake", "targeted probiotic use"],
    guidanceSummary: "Dietary substrate quality and diversity are foundational; probiotic effects are strain-specific and best used as targeted adjuncts.",
    monitoring: ["stool regularity", "GI symptom scores", "fiber intake", "food diversity"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/41372103/", "https://pubmed.ncbi.nlm.nih.gov/29757343/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "constipation-and-low-fiber-intake",
    name: "Constipation and Low Fiber Intake",
    goal: "Normalize bowel frequency and improve stool quality",
    keywords: ["constipation", "low fiber", "bowel irregularity", "gut motility", "digestive health"],
    evidenceLevel: "A",
    topInterventions: ["fiber escalation", "hydration structure", "daily movement"],
    guidanceSummary: "Guideline-aligned bowel management starts with gradual fiber and hydration optimization, then escalates to targeted therapies when needed.",
    monitoring: ["bowel frequency", "stool form", "daily fiber grams", "hydration consistency"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/38595176/", "https://pubmed.ncbi.nlm.nih.gov/39034608/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "joint-stiffness-and-mobility-loss",
    name: "Joint Stiffness and Mobility Loss",
    goal: "Reduce pain-limited movement and improve functional range",
    keywords: ["joint stiffness", "mobility", "joint pain", "functional movement", "osteoarthritis symptoms"],
    evidenceLevel: "B",
    topInterventions: ["progressive strength training", "mobility practice", "anti-inflammatory nutrition"],
    guidanceSummary: "Progressive loading, aerobic work, and mobility practice together provide the most durable improvement in joint function and symptom burden.",
    monitoring: ["pain scores", "range of motion", "step count", "functional task tolerance"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/40452037/", "https://pubmed.ncbi.nlm.nih.gov/31908149/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "oxidative-stress-burden",
    name: "Oxidative Stress Burden",
    goal: "Lower redox imbalance and improve recovery capacity",
    keywords: ["oxidative stress", "redox imbalance", "free radicals", "antioxidant defense", "cellular stress"],
    evidenceLevel: "B",
    topInterventions: ["sleep restoration", "polyphenol-rich nutrition", "graduated exercise load"],
    guidanceSummary: "The biggest gains usually come from consistent exercise, better sleep, and nutrition quality rather than single-compound strategies.",
    monitoring: ["hs-CRP", "recovery quality", "sleep duration", "training load response"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/35199237/", "https://pubmed.ncbi.nlm.nih.gov/33668309/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "menopause-transition-support",
    name: "Menopause Transition Support",
    goal: "Reduce symptom burden while preserving metabolic and bone health",
    keywords: ["menopause", "perimenopause", "hot flashes", "sleep disruption", "bone loss"],
    evidenceLevel: "B",
    topInterventions: ["resistance training", "sleep and stress management", "protein and bone-support nutrition"],
    guidanceSummary: "Symptom and quality-of-life gains are strongest when resistance and aerobic training are integrated with weight and sleep management.",
    monitoring: ["sleep quality", "symptom tracking", "body composition", "bone health markers"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/41430672/", "https://pubmed.ncbi.nlm.nih.gov/34240669/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "immunosenescence-risk",
    name: "Immunosenescence Risk",
    goal: "Preserve adaptive immune function with aging",
    keywords: ["immunosenescence", "aging immune system", "immune aging", "infection susceptibility", "inflammaging"],
    evidenceLevel: "B",
    topInterventions: ["deficiency correction", "regular physical activity", "sleep regularization"],
    guidanceSummary: "Immune-aging risk improves most with regular exercise and foundational health behaviors that preserve vaccine and infection resilience.",
    monitoring: ["infection frequency", "sleep quality", "vitamin D status", "inflammatory markers"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/35490790/", "https://pubmed.ncbi.nlm.nih.gov/20121985/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "sleep-apnea-risk",
    name: "Sleep Apnea Risk",
    goal: "Reduce overnight breathing disruption and daytime fatigue load",
    keywords: ["sleep apnea", "snoring", "oxygen desaturation", "daytime sleepiness", "sleep fragmentation"],
    evidenceLevel: "A",
    topInterventions: ["formal sleep testing", "weight reduction", "airway-focused therapy adherence"],
    guidanceSummary: "Objective diagnosis plus adherence to airway therapy is central, and targeted weight-loss/lifestyle protocols can reduce apnea severity.",
    monitoring: ["AHI or equivalent", "daytime sleepiness scores", "blood pressure", "sleep continuity"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/27571048/", "https://pubmed.ncbi.nlm.nih.gov/35452108/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "visceral-adiposity-risk",
    name: "Visceral Adiposity Risk",
    goal: "Reduce abdominal fat burden linked to metabolic and vascular risk",
    keywords: ["visceral fat", "abdominal obesity", "waist circumference", "metabolic risk", "central adiposity"],
    evidenceLevel: "A",
    topInterventions: ["resistance training", "protein-forward energy deficit", "sleep regularization"],
    guidanceSummary: "Exercise volume and adherence, especially aerobic plus resistance programming, consistently reduce waist and visceral fat even when scale weight changes are modest.",
    monitoring: ["waist circumference", "body composition", "fasting insulin", "triglycerides"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/30711119/", "https://pubmed.ncbi.nlm.nih.gov/35383401/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "elevated-resting-heart-rate",
    name: "Elevated Resting Heart Rate",
    goal: "Lower baseline cardiac load and improve autonomic balance",
    keywords: ["resting heart rate", "tachycardic baseline", "cardiac load", "autonomic stress", "recovery strain"],
    evidenceLevel: "B",
    topInterventions: ["aerobic base training", "sleep improvement", "stress reduction protocols"],
    guidanceSummary: "Resting heart rate generally falls with sustained aerobic training and improved cardiorespiratory fitness, making conditioning the primary lever.",
    monitoring: ["resting heart rate", "sleep regularity", "VO2 trends", "blood pressure"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/30513777/", "https://pubmed.ncbi.nlm.nih.gov/16118586/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "low-hrv-recovery-strain",
    name: "Low HRV Recovery Strain",
    goal: "Improve autonomic recovery and stress adaptability",
    keywords: ["low hrv", "heart rate variability", "recovery strain", "autonomic imbalance", "stress recovery"],
    evidenceLevel: "B",
    topInterventions: ["sleep consistency", "zone 2 conditioning", "daily stress-regulation practice"],
    guidanceSummary: "HRV trends improve with consistent aerobic conditioning, sleep regularity, and stress-load management rather than device-only optimization.",
    monitoring: ["HRV trend", "resting heart rate", "sleep duration", "subjective fatigue"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/39015867/", "https://pubmed.ncbi.nlm.nih.gov/40574815/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "post-viral-fatigue-risk",
    name: "Post-Viral Fatigue Risk",
    goal: "Restore capacity after infection-associated energy decline",
    keywords: ["post viral fatigue", "post infection fatigue", "energy crash", "recovery lag", "exercise intolerance"],
    evidenceLevel: "B",
    topInterventions: ["graded activity pacing", "sleep recovery", "micronutrient repletion"],
    guidanceSummary: "Use pacing and gradual activity return to rebuild capacity while reducing the risk of post-exertional crashes.",
    monitoring: ["fatigue scores", "activity tolerance", "sleep continuity", "resting heart rate"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/39218998/", "https://pubmed.ncbi.nlm.nih.gov/40083165/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "micronutrient-insufficiency",
    name: "Micronutrient Insufficiency",
    goal: "Correct low nutrient reserves impacting performance and recovery",
    keywords: ["micronutrient deficiency", "nutrient insufficiency", "vitamin deficiency", "mineral deficiency", "repletion"],
    evidenceLevel: "A",
    topInterventions: ["targeted lab assessment", "diet-quality correction", "protocolized repletion"],
    guidanceSummary: "High-yield management starts with targeted screening and deficiency-specific repletion rather than broad high-dose stacking.",
    monitoring: ["targeted nutrient labs", "symptom response", "diet quality score", "follow-up labs"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/36904074/", "https://pubmed.ncbi.nlm.nih.gov/38280831/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "age-related-vision-decline",
    name: "Age-Related Vision Decline",
    goal: "Preserve visual function and retinal resilience with age",
    keywords: ["vision decline", "macular health", "retinal aging", "contrast sensitivity", "visual function"],
    evidenceLevel: "B",
    topInterventions: ["retinal-support nutrition", "blood pressure control", "glucose stability"],
    guidanceSummary: "Best-supported strategy is systemic risk-factor control plus AREDS-style targeted retinal nutrition in appropriate patients.",
    monitoring: ["visual acuity trend", "contrast sensitivity", "retinal exams", "metabolic markers"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/23644932/", "https://pubmed.ncbi.nlm.nih.gov/39025435/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "elevated-homocysteine-risk",
    name: "Elevated Homocysteine Risk",
    goal: "Lower methylation-associated vascular and neurologic risk load",
    keywords: ["homocysteine", "methylation", "b12 deficiency", "folate status", "vascular risk"],
    evidenceLevel: "B",
    topInterventions: ["b-vitamin repletion", "diet quality upgrade", "metabolic risk control"],
    guidanceSummary: "B-vitamin-based homocysteine lowering is reliable biochemically, while clinical benefit depends on baseline risk context and comprehensive risk control.",
    monitoring: ["homocysteine", "vitamin B12", "folate", "MMA when indicated"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/20937919/", "https://pubmed.ncbi.nlm.nih.gov/22232016/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "protein-intake-deficit",
    name: "Protein Intake Deficit",
    goal: "Restore muscle-preserving protein adequacy",
    keywords: ["low protein intake", "muscle preservation", "sarcopenia risk", "anabolic resistance", "recovery nutrition"],
    evidenceLevel: "A",
    topInterventions: ["daily protein targeting", "resistance training", "meal distribution strategy"],
    guidanceSummary: "Adequate daily protein and meal distribution are core for muscle preservation; benefit is strongest when paired with resistance training.",
    monitoring: ["daily protein grams", "lean mass", "strength metrics", "functional tests"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/35886571/", "https://pubmed.ncbi.nlm.nih.gov/36087703/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "dehydration-electrolyte-imbalance-risk",
    name: "Dehydration and Electrolyte Imbalance Risk",
    goal: "Improve hydration consistency and physiologic stability",
    keywords: ["dehydration", "electrolyte imbalance", "hydration status", "cramping", "heat intolerance"],
    evidenceLevel: "B",
    topInterventions: ["structured fluid intake", "electrolyte repletion", "heat and activity planning"],
    guidanceSummary: "Hydration and electrolyte plans should be individualized to climate, age, medications, and activity load to reduce dizziness, cramps, and performance drop.",
    monitoring: ["hydration consistency", "bodyweight fluctuation", "symptom episodes", "training tolerance"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/34684642/", "https://pubmed.ncbi.nlm.nih.gov/34432569/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "digestive-bloating-and-gut-discomfort",
    name: "Digestive Bloating and Gut Discomfort",
    goal: "Reduce daily GI symptom burden and improve tolerance to nutrient-dense foods",
    keywords: ["bloating", "gas", "digestive discomfort", "gut sensitivity", "meal intolerance"],
    evidenceLevel: "B",
    topInterventions: ["fiber calibration", "food-trigger mapping", "microbiome-supportive dietary structure"],
    guidanceSummary: "Bloating reduction is most consistent with targeted dietary pattern adjustment, trigger tracking, and gradual fiber calibration.",
    monitoring: ["bloating severity", "food tolerance", "bowel regularity", "diet adherence"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/33315591/", "https://pubmed.ncbi.nlm.nih.gov/34376512/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "balance-and-fall-risk",
    name: "Balance and Fall Risk",
    goal: "Reduce fall probability and preserve functional independence",
    keywords: ["fall risk", "balance", "gait instability", "older adults", "functional decline"],
    evidenceLevel: "A",
    topInterventions: ["balance and strength training", "vision and footwear optimization", "home hazard mitigation"],
    guidanceSummary: "Falls are highly modifiable with progressive balance-strength training, medication review, and home-environment risk reduction.",
    monitoring: ["fall events", "single-leg balance", "gait speed", "chair-rise performance"],
    sourceUrls: [
      "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/falls-prevention-older-adults-interventions",
      "https://www.cdc.gov/steadi/about/index.html",
      "https://pubmed.ncbi.nlm.nih.gov/39494462/"
    ],
    updatedAt: "2026-02-17"
  },
  {
    slug: "osteoarthritis-symptom-load",
    name: "Osteoarthritis Symptom Load",
    goal: "Reduce pain and stiffness while preserving movement quality",
    keywords: ["osteoarthritis", "joint pain", "stiffness", "mobility limitation", "knee pain"],
    evidenceLevel: "A",
    topInterventions: ["progressive resistance training", "weight management", "mobility and gait retraining"],
    guidanceSummary: "Exercise and strength-based programs are first-line for pain and function, with weight management and load calibration improving durability.",
    monitoring: ["pain scores", "walking tolerance", "range of motion", "daily activity level"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/31908149/", "https://pubmed.ncbi.nlm.nih.gov/38327570/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "chronic-kidney-function-risk",
    name: "Chronic Kidney Function Risk",
    goal: "Protect renal function trajectory through pressure and metabolic control",
    keywords: ["kidney function", "ckd risk", "egfr decline", "albuminuria", "renal health"],
    evidenceLevel: "A",
    topInterventions: ["blood pressure control", "glucose management", "protein and sodium personalization"],
    guidanceSummary: "Renal-risk reduction relies on integrated pressure, albuminuria, glucose, and medication-aware nutrition planning aligned with current CKD guidance.",
    monitoring: ["eGFR", "urine albumin-creatinine ratio", "blood pressure", "fasting glucose"],
    sourceUrls: ["https://kdigo.org/guidelines/ckd-evaluation-and-management/", "https://pubmed.ncbi.nlm.nih.gov/33338413/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "thyroid-function-variability",
    name: "Thyroid Function Variability",
    goal: "Stabilize thyroid-related symptom burden and metabolic tempo",
    keywords: ["thyroid function", "tsh variability", "hypothyroid symptoms", "energy instability", "metabolic slowdown"],
    evidenceLevel: "B",
    topInterventions: ["medication adherence review", "micronutrient adequacy", "sleep and stress stabilization"],
    guidanceSummary: "Stabilize dosing and follow-up labs first, then adjust treatment with clinician guidance using symptom trends plus confirmed lab changes.",
    monitoring: ["TSH", "free T4", "symptom trend", "resting heart rate"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/32367664/", "https://pubmed.ncbi.nlm.nih.gov/28402245/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "anemia-and-low-ferritin-risk",
    name: "Anemia and Low Ferritin Risk",
    goal: "Restore oxygen-carrying capacity and reduce fatigue burden",
    keywords: ["anemia", "low ferritin", "iron deficiency", "fatigue", "oxygen delivery"],
    evidenceLevel: "A",
    topInterventions: ["cause-directed iron repletion", "dietary iron optimization", "follow-up lab confirmation"],
    guidanceSummary: "Find the cause first, then replete iron in a targeted way and confirm recovery with repeat laboratory testing.",
    monitoring: ["hemoglobin", "ferritin", "transferrin saturation", "fatigue severity"],
    sourceUrls: [
      "https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/",
      "https://www.who.int/publications/i/item/9789240000124",
      "https://pubmed.ncbi.nlm.nih.gov/36017572/"
    ],
    updatedAt: "2026-02-17"
  },
  {
    slug: "gout-and-uric-acid-risk",
    name: "Gout and Uric Acid Risk",
    goal: "Lower flare risk by controlling urate burden",
    keywords: ["gout", "uric acid", "urate", "joint flare", "metabolic urate risk"],
    evidenceLevel: "A",
    topInterventions: ["weight and fructose control", "hydration support", "urate-lowering therapy adherence"],
    guidanceSummary: "Dietary/lifestyle strategy should be paired with treat-to-target urate management to reduce flare frequency and long-term joint burden.",
    monitoring: ["serum uric acid", "flare frequency", "joint symptom days", "kidney function"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/32391934/", "https://pubmed.ncbi.nlm.nih.gov/27457514/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "gastroesophageal-reflux-load",
    name: "Gastroesophageal Reflux Load",
    goal: "Reduce reflux symptom days and protect sleep quality",
    keywords: ["reflux", "gerd", "heartburn", "night reflux", "esophageal irritation"],
    evidenceLevel: "A",
    topInterventions: ["meal timing and portion control", "weight reduction", "trigger-food minimization"],
    guidanceSummary: "Durable reflux control usually requires meal-timing changes, weight and abdominal-pressure reduction, trigger tracking, and stepwise acid-suppression decisions with reassessment for persistent or alarm symptoms.",
    monitoring: ["symptom days per week", "night awakenings", "trigger log", "bodyweight trend"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/34807007/", "https://pubmed.ncbi.nlm.nih.gov/34324432/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "irritable-bowel-symptom-load",
    name: "Irritable Bowel Symptom Load",
    goal: "Lower abdominal pain and improve bowel regularity quality",
    keywords: ["irritable bowel", "ibs symptoms", "abdominal pain", "bloating", "bowel irregularity"],
    evidenceLevel: "B",
    topInterventions: ["targeted diet protocol", "stress management", "fiber and probiotic personalization"],
    guidanceSummary: "IBS control is strongest with structured dietary therapy, especially low-FODMAP style protocols, plus symptom-trigger personalization.",
    monitoring: ["abdominal pain score", "stool pattern", "food tolerance", "symptom-day frequency"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/33315591/", "https://pubmed.ncbi.nlm.nih.gov/34376512/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "arterial-stiffness-risk",
    name: "Arterial Stiffness Risk",
    goal: "Improve vascular elasticity and pressure-wave load",
    keywords: ["arterial stiffness", "vascular elasticity", "pulse pressure", "endothelial aging", "vascular load"],
    evidenceLevel: "B",
    topInterventions: ["aerobic training", "blood pressure optimization", "polyphenol-forward nutrition"],
    guidanceSummary: "Aerobic and resistance training alongside blood-pressure control can improve vascular elasticity and reduce pressure-wave burden.",
    monitoring: ["pulse pressure", "blood pressure", "resting heart rate", "aerobic fitness"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/30520367/", "https://pubmed.ncbi.nlm.nih.gov/39474152/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "low-daily-step-count-risk",
    name: "Low Daily Step Count Risk",
    goal: "Raise baseline movement to reduce all-cause risk burden",
    keywords: ["low step count", "sedentary behavior", "daily movement", "physical inactivity", "activity deficit"],
    evidenceLevel: "A",
    topInterventions: ["step-target progression", "walking blocks after meals", "environment-based movement cues"],
    guidanceSummary: "Baseline daily movement is one of the most scalable longevity levers, with risk reduction observable even below traditional 10k-step targets.",
    monitoring: ["daily steps", "sitting time", "resting heart rate", "activity adherence"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/34417979/", "https://pubmed.ncbi.nlm.nih.gov/37555441/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "kidney-stone-recurrence-risk",
    name: "Kidney Stone Recurrence Risk",
    goal: "Lower recurrence risk by improving hydration and urinary chemistry",
    keywords: ["kidney stone", "nephrolithiasis", "urinary citrate", "stone recurrence", "urologic risk"],
    evidenceLevel: "A",
    topInterventions: ["fluid intake structure", "urinary citrate optimization", "dietary oxalate and sodium control"],
    guidanceSummary: "Recurrence prevention is strongest with sustained hydration, urine-guided sodium/oxalate/protein adjustment, and citrate repletion when indicated.",
    monitoring: ["24-hour urine chemistry", "fluid intake consistency", "serum creatinine", "stone events"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/8230497/", "https://pubmed.ncbi.nlm.nih.gov/9366314/", "https://pubmed.ncbi.nlm.nih.gov/27915395/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "liver-enzyme-elevation-risk",
    name: "Liver Enzyme Elevation Risk",
    goal: "Normalize hepatic stress markers and reduce progression pressure",
    keywords: ["liver enzymes", "alt ast elevation", "hepatic stress", "liver inflammation", "metabolic liver"],
    evidenceLevel: "B",
    topInterventions: ["weight and glucose correction", "alcohol reduction", "metabolic-risk management"],
    guidanceSummary: "Liver enzymes improve most when exercise, weight reduction, alcohol control, and glucose management are sustained together.",
    monitoring: ["ALT/AST", "GGT", "waist circumference", "metabolic panel"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/35176096/", "https://pubmed.ncbi.nlm.nih.gov/29683979/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "reactive-hypoglycemia-and-energy-crash-risk",
    name: "Reactive Hypoglycemia and Energy Crash Risk",
    goal: "Stabilize post-meal energy and reduce glucose volatility",
    keywords: ["reactive hypoglycemia", "energy crash", "post meal glucose", "glycemic variability", "shaky after meals"],
    evidenceLevel: "B",
    topInterventions: ["meal composition sequencing", "protein-fiber preloading", "glycemic-load management"],
    guidanceSummary: "Most people improve with meal composition and timing changes that reduce rapid glucose swings after eating.",
    monitoring: ["post-meal glucose trend", "symptom episodes", "time in range", "meal-response logs"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/28285645/", "https://pubmed.ncbi.nlm.nih.gov/24784832/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "high-glycation-burden",
    name: "High Glycation Burden",
    goal: "Reduce glycation pressure linked to vascular and metabolic aging",
    keywords: ["glycation", "advanced glycation end products", "ages", "metabolic aging", "glucose damage"],
    evidenceLevel: "B",
    topInterventions: ["glucose control", "cooking-method optimization", "polyphenol-rich dietary pattern"],
    guidanceSummary: "Lowering glycation load requires stable glycemia and lower AGE dietary exposure, with sustained pattern change outperforming short-term hacks.",
    monitoring: ["fasting glucose", "A1C", "inflammatory markers", "dietary AGE intake patterns"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/40673231/", "https://pubmed.ncbi.nlm.nih.gov/36472074/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "low-muscle-power-risk",
    name: "Low Muscle Power Risk",
    goal: "Improve force production speed and fall-protective capacity",
    keywords: ["muscle power", "functional speed", "rate of force development", "frailty risk", "slowed movement"],
    evidenceLevel: "A",
    topInterventions: ["power-oriented resistance training", "adequate protein strategy", "neuromuscular skill work"],
    guidanceSummary: "Power-oriented resistance training improves functional speed and independence outcomes beyond strength-only prescriptions in many older cohorts.",
    monitoring: ["sit-to-stand speed", "gait speed", "jump or power proxy tests", "functional task timing"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/38472180/", "https://pubmed.ncbi.nlm.nih.gov/33721573/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "delayed-exercise-recovery-load",
    name: "Delayed Exercise Recovery Load",
    goal: "Reduce prolonged soreness and restore training consistency",
    keywords: ["delayed recovery", "doms", "exercise soreness", "recovery lag", "training inconsistency"],
    evidenceLevel: "B",
    topInterventions: ["progressive load planning", "sleep optimization", "protein and hydration adequacy"],
    guidanceSummary: "Recovery interventions can reduce soreness modestly, but best outcomes still depend on load programming, sleep, and nutrition consistency.",
    monitoring: ["recovery time between sessions", "soreness scores", "training adherence", "sleep duration"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/33493991/", "https://pubmed.ncbi.nlm.nih.gov/29021762/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "daytime-somnolence-and-alertness-drop",
    name: "Daytime Somnolence and Alertness Drop",
    goal: "Improve daytime vigilance and reduce performance dips",
    keywords: ["daytime sleepiness", "somnolence", "alertness drop", "afternoon crash", "wakefulness"],
    evidenceLevel: "B",
    topInterventions: ["sleep quality correction", "circadian timing alignment", "post-meal glucose stability"],
    guidanceSummary: "Persistent daytime sleepiness should trigger sleep-disorder evaluation and circadian correction rather than escalating stimulant use.",
    monitoring: ["daytime alertness ratings", "sleep duration", "sleep fragmentation", "post-meal energy trend"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/27571048/", "https://pubmed.ncbi.nlm.nih.gov/35452108/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "low-dietary-polyphenol-pattern",
    name: "Low Dietary Polyphenol Pattern",
    goal: "Increase dietary phytochemical density for vascular and metabolic resilience",
    keywords: ["polyphenols", "low polyphenol intake", "phytochemical intake", "vascular nutrition", "metabolic resilience"],
    evidenceLevel: "B",
    topInterventions: ["polyphenol-rich food pattern", "fruit and vegetable diversity", "ultra-processed food reduction"],
    guidanceSummary: "Cardiometabolic improvements are more consistent with sustained whole-food polyphenol intake than short, isolated supplement bursts.",
    monitoring: ["food diversity score", "fruit and vegetable servings", "inflammatory markers", "cardiometabolic markers"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/39683599/", "https://pubmed.ncbi.nlm.nih.gov/36796437/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "high-sodium-low-potassium-pattern",
    name: "High Sodium / Low Potassium Pattern",
    goal: "Correct electrolyte dietary balance to reduce pressure and vascular load",
    keywords: ["high sodium", "low potassium", "electrolyte diet", "blood pressure diet", "vascular load"],
    evidenceLevel: "A",
    topInterventions: ["whole-food potassium increase", "sodium reduction", "processed-food displacement"],
    guidanceSummary: "Sodium-potassium balance is a high-impact lever for blood pressure control and vascular risk reduction, especially in processed-food-heavy diets.",
    monitoring: ["blood pressure", "dietary sodium intake", "dietary potassium intake", "fluid status"],
    sourceUrls: [
      "https://www.who.int/publications/i/item/9789241504836",
      "https://www.who.int/publications/i/item/9789241504829",
      "https://pubmed.ncbi.nlm.nih.gov/38507482/"
    ],
    updatedAt: "2026-02-17"
  },
  {
    slug: "cognitive-stress-reactivity-load",
    name: "Cognitive Stress Reactivity Load",
    goal: "Reduce stress-triggered cognitive volatility under high demand",
    keywords: ["cognitive stress", "stress reactivity", "attention instability", "cortisol reactivity", "mental overload"],
    evidenceLevel: "B",
    topInterventions: ["stress-regulation skills", "sleep stabilization", "work-block design and pacing"],
    guidanceSummary: "Stress-related cognitive dips improve most when stress-regulation practice, sleep stability, and workload pacing are implemented together.",
    monitoring: ["focus stability", "perceived stress scale", "sleep quality", "daytime recovery breaks"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/35761477/", "https://pubmed.ncbi.nlm.nih.gov/34536088/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "elevated-lipoprotein-a-risk",
    name: "Elevated Lipoprotein(a) Risk",
    goal: "Improve overall vascular-risk strategy when inherited Lp(a) is high",
    keywords: ["lipoprotein(a)", "lp(a)", "genetic lipid risk", "atherosclerotic risk", "premature cardiovascular risk"],
    evidenceLevel: "A",
    topInterventions: ["apoB lowering strategy", "blood pressure optimization", "lifestyle risk minimization"],
    guidanceSummary: "Lp(a) is largely genetically determined; once elevated, risk reduction depends on aggressive apoB and blood-pressure control plus full-risk-factor optimization.",
    monitoring: ["Lp(a)", "apoB", "blood pressure", "hs-CRP"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/34647487/", "https://pubmed.ncbi.nlm.nih.gov/36036785/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "nocturnal-blood-pressure-non-dipping-risk",
    name: "Nocturnal Blood Pressure Non-Dipping Risk",
    goal: "Restore healthier overnight blood pressure profile",
    keywords: ["non dipping blood pressure", "nighttime hypertension", "ambulatory blood pressure", "sleep blood pressure", "vascular strain"],
    evidenceLevel: "B",
    topInterventions: ["sleep apnea assessment", "timed antihypertensive strategy", "sodium and stress load reduction"],
    guidanceSummary: "Non-dipping patterns often require ambulatory-BP-guided treatment timing, sleep-apnea evaluation, sodium-load reduction, and close follow-up because stroke and renal risk rise when nighttime pressure stays elevated.",
    monitoring: ["24-hour ambulatory BP", "night/day BP ratio", "sleep quality", "resting heart rate"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/41028404/", "https://pubmed.ncbi.nlm.nih.gov/31480717/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "periodontal-inflammation-risk",
    name: "Periodontal Inflammation Risk",
    goal: "Reduce chronic oral inflammation linked to systemic risk load",
    keywords: ["periodontal disease", "gum inflammation", "oral inflammation", "gingivitis", "oral microbiome"],
    evidenceLevel: "A",
    topInterventions: ["regular periodontal care", "daily oral hygiene optimization", "glycemic and smoking risk control"],
    guidanceSummary: "Periodontal disease is linked to systemic inflammatory and cardiovascular risk; consistent dental treatment and oral-hygiene adherence are key risk modifiers.",
    monitoring: ["periodontal assessment", "bleeding on probing", "oral hygiene adherence", "inflammatory markers"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/35946825/", "https://pubmed.ncbi.nlm.nih.gov/37682950/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "hearing-loss-and-cognitive-strain",
    name: "Hearing Loss and Cognitive Strain",
    goal: "Reduce cognitive load related to untreated hearing decline",
    keywords: ["hearing loss", "auditory decline", "cognitive load", "social withdrawal", "listening fatigue"],
    evidenceLevel: "B",
    topInterventions: ["formal audiology screening", "timely hearing support", "social communication optimization"],
    guidanceSummary: "Treating hearing loss can reduce cognitive listening strain and is linked with better long-term cognitive trajectories.",
    monitoring: ["audiometry trend", "listening fatigue", "social engagement", "subjective cognitive effort"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/37583856/", "https://pubmed.ncbi.nlm.nih.gov/33710952/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "chronic-low-back-pain-load",
    name: "Chronic Low Back Pain Load",
    goal: "Lower persistent pain burden while restoring movement confidence",
    keywords: ["chronic low back pain", "back pain", "movement fear", "mobility impairment", "functional pain"],
    evidenceLevel: "A",
    topInterventions: ["graded strength and mobility", "pain-informed activity progression", "sleep and stress support"],
    guidanceSummary: "Functional restoration with graded loading, education, and biopsychosocial support is more durable than rest-centered care.",
    monitoring: ["pain intensity", "movement tolerance", "activity consistency", "sleep impact"],
    sourceUrls: ["https://www.who.int/publications/i/item/9789240081789", "https://pubmed.ncbi.nlm.nih.gov/28192789/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "social-isolation-and-loneliness-risk",
    name: "Social Isolation and Loneliness Risk",
    goal: "Improve social connectedness linked to healthier aging outcomes",
    keywords: ["social isolation", "loneliness", "social connection", "depression risk", "healthy aging"],
    evidenceLevel: "B",
    topInterventions: ["scheduled social routines", "group activity participation", "behavioral support for engagement"],
    guidanceSummary: "Structured social and behavioral interventions can reduce loneliness and improve downstream mood and health outcomes in older adults.",
    monitoring: ["social-contact frequency", "loneliness scale", "mood trend", "activity participation"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/36251294/", "https://pubmed.ncbi.nlm.nih.gov/41573241/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "polypharmacy-and-interaction-risk",
    name: "Polypharmacy and Interaction Risk",
    goal: "Reduce medication-related adverse effects and interaction burden",
    keywords: ["polypharmacy", "drug interaction", "medication burden", "adverse drug events", "deprescribing"],
    evidenceLevel: "A",
    topInterventions: ["structured medication review", "deprescribing where appropriate", "interaction-aware supplement planning"],
    guidanceSummary: "Medication-burden review and deprescribing frameworks are central for reducing adverse events in older adults with complex regimens.",
    monitoring: ["medication count", "interaction alerts", "adverse event frequency", "functional status"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/30693946/", "https://pubmed.ncbi.nlm.nih.gov/32734707/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "post-hospitalization-frailty-recovery-risk",
    name: "Post-Hospitalization Frailty Recovery Risk",
    goal: "Recover function quickly after acute illness or hospitalization",
    keywords: ["post hospitalization", "frailty recovery", "deconditioning", "functional decline", "rehabilitation"],
    evidenceLevel: "A",
    topInterventions: ["early mobility progression", "protein repletion", "home-based strength continuation"],
    guidanceSummary: "Start mobility early and continue a structured home-recovery plan to restore function and reduce long-term decline.",
    monitoring: ["gait speed", "chair-rise performance", "daily activity", "readmission risk"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/31974063/", "https://pubmed.ncbi.nlm.nih.gov/32330558/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "low-grip-strength-risk",
    name: "Low Grip Strength Risk",
    goal: "Improve strength marker associated with frailty and mortality risk",
    keywords: ["low grip strength", "handgrip weakness", "frailty marker", "functional decline", "muscle quality"],
    evidenceLevel: "A",
    topInterventions: ["progressive resistance training", "protein optimization", "functional strength practice"],
    guidanceSummary: "Progressive high-intent resistance training can improve grip-linked functional outcomes and lower frailty trajectory risk.",
    monitoring: ["handgrip strength", "chair-rise test", "gait speed", "lean-mass trend"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/38472180/", "https://pubmed.ncbi.nlm.nih.gov/33721573/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "medication-induced-nutrient-depletion-risk",
    name: "Medication-Induced Nutrient Depletion Risk",
    goal: "Prevent and correct nutrient depletion from chronic medication use",
    keywords: ["drug nutrient depletion", "medication nutrient loss", "micronutrient depletion", "long-term medication risk", "nutrient monitoring"],
    evidenceLevel: "B",
    topInterventions: ["medication-specific nutrient surveillance", "targeted repletion", "diet quality reinforcement"],
    guidanceSummary: "Long-term medication plans should include nutrient surveillance, especially for drug classes with documented depletion risk.",
    monitoring: ["targeted nutrient labs", "symptom trend", "medication timeline", "follow-up nutrient status"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/34293712/", "https://pubmed.ncbi.nlm.nih.gov/35638251/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "high-alcohol-intake-risk",
    name: "High Alcohol Intake Risk",
    goal: "Reduce alcohol-linked cardiometabolic, sleep, and liver burden",
    keywords: ["high alcohol intake", "alcohol use", "drinking risk", "sleep disruption", "liver risk"],
    evidenceLevel: "A",
    topInterventions: ["intake reduction planning", "sleep and stress support", "social trigger management"],
    guidanceSummary: "Reducing alcohol intake improves blood pressure, sleep, and liver-risk markers, with brief interventions effective in many primary-care settings.",
    monitoring: ["weekly alcohol units", "sleep quality", "ALT/AST", "blood pressure"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/15883236/", "https://pubmed.ncbi.nlm.nih.gov/29476653/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "tobacco-and-nicotine-exposure-risk",
    name: "Tobacco and Nicotine Exposure Risk",
    goal: "Lower vascular and respiratory harm from combustible and non-combustible exposure",
    keywords: ["tobacco exposure", "nicotine dependence", "smoking risk", "vaping", "respiratory risk"],
    evidenceLevel: "A",
    topInterventions: ["cessation planning", "behavioral support", "pharmacologic cessation aids when appropriate"],
    guidanceSummary: "Tobacco/nicotine cessation is one of the largest modifiable risk levers for lifespan and healthspan.",
    monitoring: ["tobacco/nicotine use frequency", "resting heart rate", "respiratory symptoms", "blood pressure"],
    sourceUrls: ["https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/tobacco-smoking-cessation-in-adults-including-pregnant-persons-interventions", "https://pubmed.ncbi.nlm.nih.gov/38135881/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "air-pollution-exposure-load",
    name: "Air Pollution Exposure Load",
    goal: "Reduce cardiopulmonary and inflammatory impact from chronic pollutant exposure",
    keywords: ["air pollution", "pm2.5", "environmental exposure", "cardiopulmonary risk", "pollution inflammation"],
    evidenceLevel: "B",
    topInterventions: ["exposure-avoidance planning", "indoor air filtration", "high-pollution day behavior adjustments"],
    guidanceSummary: "Exposure reduction, including indoor filtration and high-AQI-day behavior changes, can improve cardiopulmonary risk profiles.",
    monitoring: ["local AQI exposure", "respiratory symptoms", "blood pressure", "activity-adjustment adherence"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/40767818/", "https://pubmed.ncbi.nlm.nih.gov/30208394/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "orthostatic-intolerance-risk",
    name: "Orthostatic Intolerance Risk",
    goal: "Improve positional tolerance and reduce dizziness-related events",
    keywords: ["orthostatic intolerance", "postural dizziness", "blood pressure drop", "standing intolerance", "near syncope"],
    evidenceLevel: "B",
    topInterventions: ["hydration and sodium strategy", "graded conditioning", "medication review for hypotensive effects"],
    guidanceSummary: "Orthostatic symptom control typically needs fluid-salt strategy, medication review, compression and conditioning tactics, and clinician-guided autonomic evaluation when dizziness, tachycardia, or presyncope persists.",
    monitoring: ["supine-standing blood pressure", "dizziness episodes", "hydration consistency", "activity tolerance"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/30583909/", "https://pubmed.ncbi.nlm.nih.gov/41088986/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "vestibular-dysfunction-and-dizziness-risk",
    name: "Vestibular Dysfunction and Dizziness Risk",
    goal: "Reduce dizziness burden and improve gait confidence",
    keywords: ["vestibular dysfunction", "dizziness", "balance disorder", "vertigo", "gait instability"],
    evidenceLevel: "B",
    topInterventions: ["vestibular rehabilitation", "fall-prevention strength work", "vision and hearing review"],
    guidanceSummary: "Vestibular physical therapy has strong evidence for reducing dizziness burden and improving balance confidence in peripheral vestibular hypofunction.",
    monitoring: ["dizziness severity", "fall incidents", "gait confidence", "vestibular symptom triggers"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/34864777/", "https://pubmed.ncbi.nlm.nih.gov/28483885/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "recurrent-urinary-tract-infection-risk",
    name: "Recurrent Urinary Tract Infection Risk",
    goal: "Lower recurrence frequency while preserving urinary tract function",
    keywords: ["recurrent uti", "urinary tract infection", "urogenital health", "infection recurrence", "urinary symptoms"],
    evidenceLevel: "A",
    topInterventions: ["hydration and voiding hygiene", "risk-factor review", "targeted prophylaxis where indicated"],
    guidanceSummary: "Structured prevention plans using behavioral, non-antibiotic, and selective prophylactic strategies reduce recurrence burden and antibiotic exposure.",
    monitoring: ["UTI episodes per year", "urinary symptom days", "hydration consistency", "culture-confirmed infections"],
    sourceUrls: ["https://www.auanet.org/guidelines-and-quality/guidelines/recurrent-uti", "https://pubmed.ncbi.nlm.nih.gov/31042112/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "chronic-allergic-inflammation-load",
    name: "Chronic Allergic Inflammation Load",
    goal: "Lower persistent allergic burden that degrades sleep and recovery",
    keywords: ["allergic inflammation", "allergic rhinitis", "chronic allergy", "histamine symptoms", "airway irritation"],
    evidenceLevel: "B",
    topInterventions: ["allergen exposure control", "nasal and airway care", "sleep and stress support"],
    guidanceSummary: "Allergic burden is best managed with guideline-based airway care, trigger reduction, and symptom-directed anti-inflammatory therapy.",
    monitoring: ["symptom severity", "sleep disruption", "trigger exposure log", "medication use frequency"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/38685482/", "https://pubmed.ncbi.nlm.nih.gov/39251016/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "heat-stress-vulnerability-risk",
    name: "Heat Stress Vulnerability Risk",
    goal: "Reduce heat-related cardiovascular and hydration strain",
    keywords: ["heat stress", "heat vulnerability", "thermal strain", "dehydration risk", "heat intolerance"],
    evidenceLevel: "B",
    topInterventions: ["hydration-electrolyte planning", "heat-acclimation progression", "activity timing adjustments"],
    guidanceSummary: "Reduce heat risk with personalized hydration, gradual heat acclimation, and schedule changes on high-heat days.",
    monitoring: ["heat symptom episodes", "hydration status", "activity tolerance in heat", "resting heart rate"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/41228151/", "https://pubmed.ncbi.nlm.nih.gov/38732589/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "sedative-sleep-aid-dependency-risk",
    name: "Sedative Sleep Aid Dependency Risk",
    goal: "Reduce dependence on sedative sleep aids while restoring natural sleep quality",
    keywords: ["sleep aid dependence", "sedative use", "insomnia medication", "rebound insomnia", "sleep dependence"],
    evidenceLevel: "B",
    topInterventions: ["CBT-I style sleep retraining", "gradual taper planning", "circadian and behavioral support"],
    guidanceSummary: "Best outcomes come from structured tapering plans paired with CBT-I style sleep retraining and close follow-up.",
    monitoring: ["sleep-aid use frequency", "sleep latency", "night awakenings", "daytime sedation"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/29760253/", "https://pubmed.ncbi.nlm.nih.gov/33508280/"],
    updatedAt: "2026-02-17"
  },
  {
    slug: "financial-and-healthcare-access-stress-risk",
    name: "Financial and Healthcare Access Stress Risk",
    goal: "Reduce treatment interruption and chronic stress linked to access barriers",
    keywords: ["healthcare access", "financial stress", "medication adherence barriers", "care continuity", "social determinants"],
    evidenceLevel: "B",
    topInterventions: ["care-navigation support", "cost-aware treatment planning", "adherence-focused follow-up"],
    guidanceSummary: "Interventions that directly address social and financial barriers can improve care continuity, adherence, and long-term outcomes.",
    monitoring: ["care-visit continuity", "medication adherence", "cost-related nonadherence", "stress scale trend"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/35801145/", "https://pubmed.ncbi.nlm.nih.gov/33656528/"],
    updatedAt: "2026-02-17"
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/32277270/", "https://pubmed.ncbi.nlm.nih.gov/27571048/"],
    updatedAt: "2026-02-17"
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/30879339/", "https://pubmed.ncbi.nlm.nih.gov/29055814/"],
    updatedAt: "2026-02-17"
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/38599681/", "https://pubmed.ncbi.nlm.nih.gov/30312372/"],
    updatedAt: "2026-02-17"
  }
];

const brands: BrandEntry[] = [];

type DirectoryQualitySeverity = "warning" | "error";

type DirectoryQualityIssue = {
  severity: DirectoryQualitySeverity;
  code: string;
  recordName: string;
  detail: string;
};

const trustedEvidenceDomains = new Set<string>([
  "pubmed.ncbi.nlm.nih.gov",
  "pmc.ncbi.nlm.nih.gov",
  "clinicaltrials.gov",
  "cochranelibrary.com",
  "jamanetwork.com",
  "thelancet.com",
  "nejm.org",
  "bmj.com",
  "nature.com",
  "cell.com",
  "science.org",
  "acpjournals.org",
  "annals.org"
]);

const searchStyleQueryParams = new Set<string>(["term", "q", "query", "search"]);
const staleContentWarningDays = 400;
let qualityWarningsAnnounced = false;

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

function getHostname(value: string): string | null {
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function isTrustedEvidenceUrl(value: string): boolean {
  const host = getHostname(value);
  if (!host) return false;

  for (const trustedDomain of trustedEvidenceDomains) {
    if (host === trustedDomain || host.endsWith(`.${trustedDomain}`)) return true;
  }
  return false;
}

function isSearchStyleEvidenceUrl(value: string): boolean {
  try {
    const url = new URL(value);
    for (const key of url.searchParams.keys()) {
      if (searchStyleQueryParams.has(key.toLowerCase())) return true;
    }
    return false;
  } catch {
    return false;
  }
}

function getDayDiffFromNow(isoDate: string): number {
  const nowUtc = new Date();
  const todayUtc = Date.UTC(nowUtc.getUTCFullYear(), nowUtc.getUTCMonth(), nowUtc.getUTCDate());
  const then = Date.parse(`${isoDate}T00:00:00Z`);
  if (!Number.isFinite(then)) return 0;
  return Math.floor((todayUtc - then) / (1000 * 60 * 60 * 24));
}

function collectSourceQualityIssues(
  recordName: string,
  evidenceLevel: EvidenceLevel,
  sourceUrls: string[],
  issues: DirectoryQualityIssue[]
): void {
  const trustedCount = sourceUrls.filter(isTrustedEvidenceUrl).length;
  const searchStyleCount = sourceUrls.filter(isSearchStyleEvidenceUrl).length;

  if (trustedCount === 0) {
    issues.push({
      severity: "error",
      code: "no_trusted_sources",
      recordName,
      detail: "At least one source URL must come from a trusted medical/scientific domain."
    });
  }

  if (searchStyleCount === sourceUrls.length) {
    issues.push({
      severity: "warning",
      code: evidenceLevel === "A" ? "a_level_search_only_sources" : "search_only_sources",
      recordName,
      detail:
        evidenceLevel === "A"
          ? "A-level entry uses search-style source URLs only; add at least one direct study/guideline URL."
          : "Entry uses search-style source URLs only; add at least one direct study/guideline URL."
    });
  }
}

function collectStalenessIssue(recordName: string, updatedAt: string, issues: DirectoryQualityIssue[]): void {
  const ageDays = getDayDiffFromNow(updatedAt);
  if (ageDays > staleContentWarningDays) {
    issues.push({
      severity: "warning",
      code: "stale_updated_at",
      recordName,
      detail: `Entry was updated ${ageDays} days ago; refresh evidence and metadata.`
    });
  }
}

function summarizeIssues(issues: DirectoryQualityIssue[]): string {
  const byCode = new Map<string, number>();
  for (const issue of issues) {
    byCode.set(issue.code, (byCode.get(issue.code) ?? 0) + 1);
  }

  const grouped = [...byCode.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([code, count]) => `${code}=${count}`)
    .join(", ");

  const sample = issues
    .slice(0, 5)
    .map((issue) => `${issue.recordName} (${issue.code})`)
    .join("; ");

  return `${grouped}${sample ? ` | sample: ${sample}` : ""}`;
}

export function getDirectoryQualityIssues(dataset: DirectoryDataset): DirectoryQualityIssue[] {
  const issues: DirectoryQualityIssue[] = [];

  for (const entry of dataset.supplements) {
    const recordName = `supplements/${entry.slug}`;
    collectSourceQualityIssues(recordName, entry.evidenceLevel, entry.sourceUrls, issues);
    collectStalenessIssue(recordName, entry.updatedAt, issues);

    if (entry.evidenceLevel === "A" && entry.articleRefs.length < 2) {
      issues.push({
        severity: "warning",
        code: "a_level_thin_article_coverage",
        recordName,
        detail: "A-level supplement should map to at least two supporting article references."
      });
    }
  }

  for (const entry of dataset.conditions) {
    const recordName = `conditions/${entry.slug}`;
    collectSourceQualityIssues(recordName, entry.evidenceLevel, entry.sourceUrls, issues);
    collectStalenessIssue(recordName, entry.updatedAt, issues);
  }

  for (const entry of dataset.clinics) {
    const recordName = `clinics/${entry.slug}`;
    collectSourceQualityIssues(recordName, entry.evidenceLevel, entry.sourceUrls, issues);
    collectStalenessIssue(recordName, entry.updatedAt, issues);
  }

  for (const entry of dataset.brands) {
    const recordName = `brands/${entry.slug}`;
    collectStalenessIssue(recordName, entry.updatedAt, issues);
  }

  return issues;
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
    ensureNonEmptyStringField(recordName, "dosing.typicalDailyDose", entry.dosing?.typicalDailyDose);
    ensureNonEmptyStringField(recordName, "dosing.timing", entry.dosing?.timing);
    ensureNonEmptyStringField(recordName, "dosing.protocolDuration", entry.dosing?.protocolDuration);
    ensureNonEmptyStringField(recordName, "dosing.notes", entry.dosing?.notes);
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

function validateBrandEntries(entries: BrandEntry[]): void {
  ensureUniqueSlugs(entries, "brands");
  for (const entry of entries) {
    const recordName = `brands/${entry.slug}`;
    ensureNonEmptyStringField(recordName, "name", entry.name);
    ensureNonEmptyStringField(recordName, "hqCountry", entry.hqCountry);
    ensureNonEmptyStringField(recordName, "website", entry.website);
    ensureNonEmptyStringField(recordName, "description", entry.description);
    ensureNonEmptyStringField(recordName, "transparencyScore", entry.transparencyScore);
    ensureNonEmptyStringField(recordName, "transparencyScoreJustification", entry.transparencyScoreJustification);
    ensureNonEmptyStringField(recordName, "evidenceQualityRating", entry.evidenceQualityRating);
    ensureNonEmptyStringField(recordName, "evidenceQualityNotes", entry.evidenceQualityNotes);
    ensureNonEmptyStringField(recordName, "bestFor", entry.bestFor);
    ensureStringArray(recordName, "productCategories", entry.productCategories);
    ensureStringArray(recordName, "manufacturingStandards", entry.manufacturingStandards);
    ensureUrlArray(recordName, entry.sourceUrls);
    ensureIsoDateField(recordName, "updatedAt", entry.updatedAt);
    if (!Array.isArray(entry.keyProducts) || entry.keyProducts.length === 0) {
      throw new Error(`[directory] ${recordName}: "keyProducts" must be a non-empty array.`);
    }
    if (!Array.isArray(entry.redFlags)) {
      throw new Error(`[directory] ${recordName}: "redFlags" must be an array.`);
    }
    if (!Array.isArray(entry.articleRefs)) {
      throw new Error(`[directory] ${recordName}: "articleRefs" must be an array.`);
    }
    if (typeof entry.verified !== "boolean") {
      throw new Error(`[directory] ${recordName}: "verified" must be a boolean.`);
    }
  }
}

export function validateDirectoryDataset(dataset: DirectoryDataset): void {
  validateSupplementEntries(dataset.supplements);
  validateConditionEntries(dataset.conditions);
  validateClinicEntries(dataset.clinics);
  validateBrandEntries(dataset.brands);

  const qualityIssues = getDirectoryQualityIssues(dataset);
  const qualityErrors = qualityIssues.filter((issue) => issue.severity === "error");
  if (qualityErrors.length > 0) {
    throw new Error(`[directory] Quality validation failed: ${summarizeIssues(qualityErrors)}`);
  }

  const qualityWarnings = qualityIssues.filter((issue) => issue.severity === "warning");
  const shouldLogQualityWarnings = process.env.DIRECTORY_QUALITY_WARNINGS === "1" || process.env.NODE_ENV === "development";
  if (qualityWarnings.length > 0 && shouldLogQualityWarnings && !qualityWarningsAnnounced) {
    qualityWarningsAnnounced = true;
    console.warn(`[directory] Quality warnings: ${summarizeIssues(qualityWarnings)}`);
  }
}

validateDirectoryDataset({ supplements, conditions, clinics, brands });

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

export function getBrands(): BrandEntry[] {
  return brands;
}

export function getBrandBySlug(slug: string): BrandEntry | undefined {
  return brands.find((item) => item.slug === slug);
}

export function getBrandSlugs(): string[] {
  return brands.map((item) => item.slug);
}

export function getDirectoryCounts(): { supplements: number; conditions: number; clinics: number; brands: number } {
  return {
    supplements: supplements.length,
    conditions: conditions.length,
    clinics: clinics.length,
    brands: brands.length
  };
}

export function getDirectoryLastModified(): string {
  const allDates = [...supplements, ...conditions, ...clinics, ...brands].map((entry) => entry.updatedAt);
  return allDates.reduce((latest, current) => (current > latest ? current : latest), allDates[0] ?? "1970-01-01");
}
