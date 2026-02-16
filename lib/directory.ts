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
    dosing: {
      typicalDailyDose: "25-100 mg",
      timing: "30-60 minutes before bedtime",
      protocolDuration: "4-12 weeks in sleep-focused protocols",
      notes: "Most studies and protocols start at lower evening doses and titrate based on sleep response."
    },
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
    dosing: {
      typicalDailyDose: "900-1500 mg (divided with meals)",
      timing: "Two to three doses with food",
      protocolDuration: "8-24 weeks in metabolic studies",
      notes: "Common research pattern uses ~500 mg two to three times daily with meals."
    },
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
    dosing: {
      typicalDailyDose: "100-300 mg",
      timing: "With a fat-containing meal",
      protocolDuration: "8-16 weeks in fatigue/cardiometabolic studies",
      notes: "Ubiquinol forms are often used at lower mg than ubiquinone due to higher bioavailability."
    },
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
    dosing: {
      typicalDailyDose: "Not self-directed; protocol-dependent",
      timing: "Intermittent schedules under physician supervision",
      protocolDuration: "Set by specialist with ongoing monitoring",
      notes: "Use in longevity settings is highly protocolized and should not be interpreted as OTC dosing guidance."
    },
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
    dosing: {
      typicalDailyDose: "1-2 mg spermidine equivalent",
      timing: "Daily, usually with food",
      protocolDuration: "3-12 months in observational/intervention protocols",
      notes: "Many human protocols standardize to spermidine content rather than raw extract weight."
    },
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
    dosing: {
      typicalDailyDose: "100-500 mg in cycling protocols",
      timing: "Short pulse cycles rather than continuous daily use",
      protocolDuration: "Intermittent cycles (for example 2-5 days per month)",
      notes: "Human evidence remains limited; cycle design varies widely across experimental protocols."
    },
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
    dosing: {
      typicalDailyDose: "500-3000 mg extract",
      timing: "Once daily, often in morning or early afternoon",
      protocolDuration: "8-16 weeks in cognition-focused studies",
      notes: "Dose targets depend strongly on extract standardization and fruiting body vs mycelium source."
    },
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
    dosing: {
      typicalDailyDose: "1000-2000 mg compound (about 72-144 mg elemental magnesium)",
      timing: "Split doses, often afternoon/evening",
      protocolDuration: "6-12 weeks in cognition/sleep studies",
      notes: "Research and label doses are usually expressed as total compound weight, not elemental magnesium."
    },
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
    dosing: {
      typicalDailyDose: "250-600 mg",
      timing: "Morning or split morning/noon dosing",
      protocolDuration: "4-12 weeks in most current human studies",
      notes: "Clinical protocols often begin at 250 mg and adjust based on tolerance and biomarker goals."
    },
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
    dosing: {
      typicalDailyDose: "250-1000 mg",
      timing: "Morning with food or split dosing",
      protocolDuration: "6-12 weeks in common intervention studies",
      notes: "Higher ranges are typically used in metabolic/endurance protocols under supervision."
    },
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
    dosing: {
      typicalDailyDose: "250-1000 mg",
      timing: "With meals",
      protocolDuration: "Variable; often 4-12 weeks in intervention studies",
      notes: "Upper-end doses may increase side-effect risk and should be individualized."
    },
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
    dosing: {
      typicalDailyDose: "150-500 mg (trans-resveratrol equivalent)",
      timing: "With meals, frequently alongside fats",
      protocolDuration: "8-24 weeks across cardiometabolic studies",
      notes: "Formulation and absorption enhancers can materially change effective exposure."
    },
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
    dosing: {
      typicalDailyDose: "500-1000 mg",
      timing: "Daily or pulse-cycle depending on protocol",
      protocolDuration: "4-12 weeks (or intermittent senolytic cycles)",
      notes: "Standalone data are limited; many protocols pair quercetin with other agents."
    },
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
    dosing: {
      typicalDailyDose: "1000-4000 IU (25-100 mcg), adjusted by blood level",
      timing: "Daily with food containing fat",
      protocolDuration: "Ongoing with periodic lab reassessment",
      notes: "Target and dose should be individualized to 25(OH)D status and clinician guidance."
    },
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
    dosing: {
      typicalDailyDose: "1000-3000 mg combined EPA+DHA",
      timing: "Daily with meals",
      protocolDuration: "8-24 weeks in many lipid/inflammation studies",
      notes: "Research outcomes are usually linked to EPA+DHA content, not total fish oil capsule weight."
    },
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
    dosing: {
      typicalDailyDose: "Protocol-dependent stack, commonly 500-1500 mg total polyphenols",
      timing: "Daily with meals",
      protocolDuration: "8-16 weeks minimum in cognition protocols",
      notes: "Use product-specific standardization labels because stack composition is heterogeneous."
    },
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
    dosing: {
      typicalDailyDose: "No established consumer dose",
      timing: "Research setting only",
      protocolDuration: "Trial-defined",
      notes: "Current evidence is early-stage; dosing should follow study protocols, not self-experimentation."
    },
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=sirt3+activator+trial"],
    articleRefs: ["sirt3-activators-breakthrough-aging"],
    updatedAt: "2026-02-13"
  },
  {
    slug: "metformin",
    name: "Metformin",
    focus: "Insulin sensitivity and metabolic aging support",
    evidenceLevel: "A",
    evidenceSummary: "Extensive prevention and cardiometabolic evidence; longevity use remains clinician-guided.",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=metformin+prevention+trial"],
    articleRefs: [
      "berberine-natural-ozempic-weight-loss",
      "resveratrol-longevity-clinic-protocol",
      "caloric-restriction-mimetics-2025-review"
    ],
    updatedAt: "2026-02-16"
  },
  {
    slug: "vitamin-k2",
    name: "Vitamin K2 (MK-7)",
    focus: "Bone-vascular calcium balance",
    evidenceLevel: "B",
    evidenceSummary: "Supportive evidence for bone turnover and arterial health, especially alongside vitamin D.",
    effectSize: "Modest-to-meaningful support for calcium handling outcomes",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=vitamin+k2+mk-7+clinical+trial"],
    articleRefs: ["vitamin-d-immune-system-deficiency", "vitamin-d-telomere-protection-vital"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "magnesium-glycinate",
    name: "Magnesium Glycinate",
    focus: "Sleep depth and relaxation support",
    evidenceLevel: "B",
    evidenceSummary: "Magnesium repletion and glycinate forms are commonly used for sleep and stress support.",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=magnesium+glycinate+sleep+trial"],
    articleRefs: ["magnesium-threonate-brain-health", "apigenin-natural-sleep-aid"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "l-theanine",
    name: "L-Theanine",
    focus: "Calm focus and stress buffering",
    evidenceLevel: "B",
    evidenceSummary: "Human studies support attention and perceived stress benefits, especially in caffeine stacks.",
    effectSize: "Modest focus improvement with smoother stress profile",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=l-theanine+randomized+trial"],
    articleRefs: ["lions-mane-silicon-valley-nootropic", "the-nad-plus-uptick-that-cut-afternoon-brain-fog"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "alpha-gpc",
    name: "Alpha-GPC",
    focus: "Acetylcholine support for memory and attention",
    evidenceLevel: "B",
    evidenceSummary: "Clinical and translational data suggest benefits for attention, memory, and cognitive function.",
    effectSize: "Modest memory and processing-speed support",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=alpha-gpc+cognitive+trial"],
    articleRefs: ["lions-mane-silicon-valley-nootropic", "silicon-valleys-200-month-memory-upgrade"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "creatine-monohydrate",
    name: "Creatine Monohydrate",
    focus: "Strength, recovery, and neuroenergetic support",
    evidenceLevel: "A",
    evidenceSummary: "Extensive human evidence for strength and lean-mass gains with emerging healthy aging support.",
    effectSize: "Reliable strength and lean-mass improvements; modest cognition/fatigue support",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=creatine+monohydrate+randomized+trial+older+adults"],
    articleRefs: ["coq10-mitochondrial-energy-aging", "silicon-valleys-200-month-memory-upgrade"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "taurine",
    name: "Taurine",
    focus: "Cardiometabolic and cellular stress support",
    evidenceLevel: "B",
    evidenceSummary: "Growing evidence links taurine status and supplementation with metabolic and vascular health markers.",
    effectSize: "Modest-to-meaningful biomarker improvements in selected populations",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=taurine+supplementation+randomized+trial"],
    articleRefs: ["spermidine-cardiac-disease-trial", "coq10-mitochondrial-energy-aging"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "curcumin",
    name: "Curcumin",
    focus: "Inflammation and joint-metabolic support",
    evidenceLevel: "B",
    evidenceSummary: "Broad human evidence for inflammatory and pain endpoints with formulation-dependent effects.",
    effectSize: "Modest reduction in inflammatory burden and joint discomfort",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=curcumin+randomized+placebo+trial"],
    articleRefs: ["resveratrol-longevity-clinic-protocol", "the-polyphenol-stack-quietly-winning-in-cognition-clinics"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "green-tea-extract-egcg",
    name: "Green Tea Extract (EGCG)",
    focus: "Polyphenol-driven metabolic and vascular support",
    evidenceLevel: "B",
    evidenceSummary: "Human studies suggest supportive effects on oxidative stress, lipid, and metabolic markers.",
    effectSize: "Modest metabolic and vascular support",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=egcg+green+tea+extract+clinical+trial"],
    articleRefs: ["the-polyphenol-stack-quietly-winning-in-cognition-clinics", "caloric-restriction-mimetics-2025-review"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "sulforaphane",
    name: "Sulforaphane",
    focus: "Nrf2 activation and detoxification pathways",
    evidenceLevel: "B",
    evidenceSummary: "Early-to-mid stage clinical evidence supports oxidative stress and inflammatory pathway modulation.",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=sulforaphane+clinical+trial"],
    articleRefs: ["caloric-restriction-mimetics-2025-review", "sirt3-activators-breakthrough-aging"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "n-acetylcysteine",
    name: "N-Acetylcysteine (NAC)",
    focus: "Glutathione restoration and oxidative stress support",
    evidenceLevel: "B",
    evidenceSummary: "Clinical data support glutathione and oxidative stress endpoints in multiple contexts.",
    effectSize: "Modest-to-meaningful support for oxidative stress and recovery markers",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=n-acetylcysteine+randomized+trial"],
    articleRefs: ["coq10-mitochondrial-energy-aging", "nmn-brain-aging-breakthrough"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "glycine",
    name: "Glycine",
    focus: "Sleep quality and metabolic recovery support",
    evidenceLevel: "B",
    evidenceSummary: "Early human data support sleep quality and next-day function improvements.",
    effectSize: "Modest improvements in sleep latency and subjective recovery",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=glycine+sleep+trial"],
    articleRefs: ["apigenin-natural-sleep-aid", "magnesium-threonate-brain-health"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "acetyl-l-carnitine",
    name: "Acetyl-L-Carnitine (ALCAR)",
    focus: "Mitochondrial energy transport and cognitive vitality",
    evidenceLevel: "B",
    evidenceSummary: "Human trials show supportive effects on fatigue and some cognitive endpoints.",
    effectSize: "Modest improvements in fatigue and cognitive function",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=acetyl-l-carnitine+clinical+trial"],
    articleRefs: ["coq10-mitochondrial-energy-aging", "the-nad-plus-uptick-that-cut-afternoon-brain-fog"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "pqq",
    name: "PQQ (Pyrroloquinoline Quinone)",
    focus: "Mitochondrial biogenesis support",
    evidenceLevel: "C",
    evidenceSummary: "Promising translational signal with limited robust long-term human outcomes.",
    effectSize: "Early-stage signal in fatigue and mitochondrial markers",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=pqq+pyrroloquinoline+quinone+trial"],
    articleRefs: ["coq10-mitochondrial-energy-aging", "sirt3-activators-breakthrough-aging"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "astaxanthin",
    name: "Astaxanthin",
    focus: "Lipid-soluble antioxidant and endurance recovery support",
    evidenceLevel: "B",
    evidenceSummary: "Clinical studies suggest antioxidant and exercise recovery support with moderate effect sizes.",
    effectSize: "Modest support for oxidative stress and recovery outcomes",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=astaxanthin+clinical+trial"],
    articleRefs: ["resveratrol-longevity-clinic-protocol", "the-polyphenol-stack-quietly-winning-in-cognition-clinics"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "alpha-lipoic-acid",
    name: "Alpha-Lipoic Acid (ALA)",
    focus: "Glucose metabolism and redox support",
    evidenceLevel: "B",
    evidenceSummary: "Human data support insulin sensitivity and oxidative stress endpoints in selected populations.",
    effectSize: "Modest improvements in glucose and oxidative markers",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=alpha+lipoic+acid+randomized+trial"],
    articleRefs: ["berberine-natural-ozempic-weight-loss", "caloric-restriction-mimetics-2025-review"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "citicoline",
    name: "Citicoline (CDP-Choline)",
    focus: "Attention and memory support",
    evidenceLevel: "B",
    evidenceSummary: "Clinical evidence supports attention and cognitive processing in selected groups.",
    effectSize: "Modest improvements in attention and working memory",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=citicoline+cdp+choline+trial"],
    articleRefs: ["lions-mane-silicon-valley-nootropic", "silicon-valleys-200-month-memory-upgrade"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "bacopa-monnieri",
    name: "Bacopa Monnieri",
    focus: "Memory consolidation and stress adaptation",
    evidenceLevel: "B",
    evidenceSummary: "Multiple trials suggest memory and stress-related benefits with sustained use.",
    effectSize: "Modest memory and anxiety-load improvements",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=bacopa+monnieri+randomized+trial"],
    articleRefs: ["lions-mane-silicon-valley-nootropic", "silicon-valleys-200-month-memory-upgrade"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "ashwagandha",
    name: "Ashwagandha",
    focus: "Stress reduction and sleep quality support",
    evidenceLevel: "B",
    evidenceSummary: "Human trials support reductions in perceived stress with secondary sleep benefits.",
    effectSize: "Modest stress and sleep improvements",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=ashwagandha+randomized+trial+stress"],
    articleRefs: ["apigenin-natural-sleep-aid", "lions-mane-silicon-valley-nootropic"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "rhodiola-rosea",
    name: "Rhodiola Rosea",
    focus: "Stress adaptation and fatigue resistance",
    evidenceLevel: "B",
    evidenceSummary: "Clinical evidence suggests improvements in fatigue and stress perception in demanding settings.",
    effectSize: "Modest improvements in mental fatigue and stress tolerance",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=rhodiola+rosea+clinical+trial"],
    articleRefs: ["the-nad-plus-uptick-that-cut-afternoon-brain-fog", "coq10-mitochondrial-energy-aging"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "melatonin",
    name: "Melatonin",
    focus: "Circadian alignment and sleep-onset support",
    evidenceLevel: "A",
    evidenceSummary: "Strong evidence for sleep-onset support and circadian realignment in selected use cases.",
    effectSize: "Reliable sleep-onset and circadian timing benefit",
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
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=melatonin+insomnia+meta+analysis"],
    articleRefs: ["apigenin-natural-sleep-aid", "magnesium-threonate-brain-health"],
    updatedAt: "2026-02-16"
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
  },
  {
    slug: "brain-fog-and-cognitive-fatigue",
    name: "Brain Fog and Cognitive Fatigue",
    goal: "Stabilize daytime mental clarity and sustained attention",
    keywords: ["brain fog", "cognitive fatigue", "attention drift", "working memory", "mental stamina"],
    evidenceLevel: "B",
    topInterventions: ["sleep timing discipline", "metabolic stabilization", "targeted nootropic protocols"],
    guidanceSummary: "The strongest outcomes come from sleep-metabolic foundations plus selective cognitive support compounds.",
    monitoring: ["subjective focus scores", "work-block duration", "sleep quality", "resting heart rate"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=brain+fog+clinical+trial"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "telomere-attrition-risk",
    name: "Telomere Attrition Risk",
    goal: "Slow accelerated cellular aging pressure",
    keywords: ["telomere", "telomere shortening", "cellular aging", "biological age", "telomere attrition"],
    evidenceLevel: "B",
    topInterventions: ["exercise adherence", "inflammation control", "deficiency correction"],
    guidanceSummary: "Telomere outcomes are most responsive to sustained lifestyle fundamentals and inflammatory burden reduction.",
    monitoring: ["vitamin D status", "hs-CRP", "sleep duration", "longitudinal biomarker panels"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=telomere+attrition+intervention+trial"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "immune-resilience-gap",
    name: "Immune Resilience Gap",
    goal: "Reduce infection susceptibility and immune volatility",
    keywords: ["immune resilience", "infection risk", "respiratory infection", "immune function", "deficiency"],
    evidenceLevel: "A",
    topInterventions: ["vitamin D optimization", "sleep recovery", "metabolic control"],
    guidanceSummary: "Deficiency correction and sleep restoration produce the most consistent immune-function improvements.",
    monitoring: ["25(OH)D", "infection frequency", "sleep regularity", "hs-CRP"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=vitamin+d+acute+respiratory+infection+meta+analysis"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "endothelial-function-decline",
    name: "Endothelial Function Decline",
    goal: "Improve vascular responsiveness and arterial health",
    keywords: ["endothelial dysfunction", "vascular stiffness", "arterial health", "blood flow", "vascular aging"],
    evidenceLevel: "B",
    topInterventions: ["aerobic conditioning", "blood pressure control", "polyphenol-rich nutrition"],
    guidanceSummary: "Vascular function responds to movement, pressure control, and consistent dietary anti-inflammatory patterns.",
    monitoring: ["blood pressure", "resting heart rate", "lipid profile", "hs-CRP"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=endothelial+function+lifestyle+trial"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "cellular-senescence-burden",
    name: "Cellular Senescence Burden",
    goal: "Lower inflammatory load linked to senescent cell accumulation",
    keywords: ["senescent cells", "cellular senescence", "senolytic", "zombie cells", "inflammaging"],
    evidenceLevel: "C",
    topInterventions: ["resistance training", "anti-inflammatory nutrition", "protocolized senolytic cycles"],
    guidanceSummary: "Evidence is still maturing, so senolytic interventions should be paired with conservative risk management.",
    monitoring: ["hs-CRP", "functional strength metrics", "recovery markers", "bone health trends"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=senolytic+human+trial"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "insulin-resistance",
    name: "Insulin Resistance",
    goal: "Improve glucose disposal and fasting insulin profile",
    keywords: ["insulin resistance", "fasting insulin", "homa-ir", "postprandial glucose", "metabolic dysfunction"],
    evidenceLevel: "A",
    topInterventions: ["resistance and interval training", "fiber-forward carbohydrate timing", "sleep correction"],
    guidanceSummary: "Combined movement and nutrition structure consistently outperform supplement-only strategies.",
    monitoring: ["fasting insulin", "HOMA-IR", "A1C", "waist circumference"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=insulin+resistance+lifestyle+trial"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "dyslipidemia-and-high-apob",
    name: "Dyslipidemia and High ApoB",
    goal: "Lower atherogenic lipid burden and vascular risk",
    keywords: ["dyslipidemia", "apob", "ldl", "triglycerides", "atherogenic lipids"],
    evidenceLevel: "A",
    topInterventions: ["dietary fat quality optimization", "aerobic training", "weight and glucose control"],
    guidanceSummary: "ApoB-centered risk management provides cleaner cardiovascular signal than LDL-C alone.",
    monitoring: ["apoB", "LDL-C", "non-HDL-C", "triglycerides"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=apob+cardiovascular+risk+trial"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "non-alcoholic-fatty-liver-risk",
    name: "Non-Alcoholic Fatty Liver Risk",
    goal: "Reduce hepatic fat burden and improve liver enzymes",
    keywords: ["fatty liver", "nafld", "masld", "hepatic steatosis", "liver enzymes"],
    evidenceLevel: "A",
    topInterventions: ["weight reduction", "fructose and alcohol reduction", "resistance training"],
    guidanceSummary: "Modest weight loss and metabolic correction can materially improve liver-fat trajectories.",
    monitoring: ["ALT/AST", "GGT", "waist circumference", "liver imaging"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=nonalcoholic+fatty+liver+lifestyle+trial"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "postprandial-glucose-spikes",
    name: "Postprandial Glucose Spikes",
    goal: "Flatten glucose variability after meals",
    keywords: ["postprandial glucose", "glucose spikes", "glycemic variability", "cgm", "meal response"],
    evidenceLevel: "B",
    topInterventions: ["meal composition sequencing", "post-meal walking", "carbohydrate load distribution"],
    guidanceSummary: "Meal architecture plus movement timing is often higher leverage than single compounds.",
    monitoring: ["CGM time in range", "post-meal glucose peak", "fasting glucose", "A1C"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=postprandial+glucose+intervention+trial"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "chronic-stress-overload",
    name: "Chronic Stress Overload",
    goal: "Lower allostatic load and restore recovery bandwidth",
    keywords: ["chronic stress", "allostatic load", "burnout", "cortisol", "recovery deficit"],
    evidenceLevel: "B",
    topInterventions: ["sleep anchoring", "aerobic movement", "structured stress-skills practice"],
    guidanceSummary: "Recovery architecture matters more than acute hacks for sustained stress reduction.",
    monitoring: ["sleep regularity", "resting heart rate", "HRV trend", "symptom scales"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=chronic+stress+intervention+trial"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "circadian-misalignment",
    name: "Circadian Misalignment",
    goal: "Realign sleep-wake timing and daytime alertness",
    keywords: ["circadian rhythm", "shift work", "jet lag", "sleep timing", "melatonin rhythm"],
    evidenceLevel: "B",
    topInterventions: ["morning light timing", "consistent wake time", "targeted melatonin use"],
    guidanceSummary: "Light, behavior timing, and meal timing are the core levers for circadian correction.",
    monitoring: ["sleep midpoint", "wake consistency", "daytime alertness", "sleep latency"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=circadian+misalignment+intervention+trial"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "low-cardiorespiratory-fitness",
    name: "Low Cardiorespiratory Fitness",
    goal: "Improve aerobic capacity and resilience",
    keywords: ["vo2 max", "cardiorespiratory fitness", "aerobic capacity", "exercise tolerance", "conditioning"],
    evidenceLevel: "A",
    topInterventions: ["progressive aerobic training", "zone 2 base work", "interval sessions"],
    guidanceSummary: "VO2 improvement is one of the strongest all-cause risk modifiers available.",
    monitoring: ["VO2 max estimate", "resting heart rate", "exercise tolerance", "blood pressure"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=vo2+max+training+trial"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "gut-microbiome-dysbiosis",
    name: "Gut Microbiome Dysbiosis",
    goal: "Improve digestive resilience and gut ecosystem diversity",
    keywords: ["microbiome", "dysbiosis", "gut health", "digestive symptoms", "microbial diversity"],
    evidenceLevel: "B",
    topInterventions: ["high-fiber diet pattern", "fermented food intake", "targeted probiotic use"],
    guidanceSummary: "Daily dietary substrate quality drives more durable outcomes than short probiotic bursts alone.",
    monitoring: ["stool regularity", "GI symptom scores", "fiber intake", "food diversity"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=gut+microbiome+diet+trial"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "constipation-and-low-fiber-intake",
    name: "Constipation and Low Fiber Intake",
    goal: "Normalize bowel frequency and improve stool quality",
    keywords: ["constipation", "low fiber", "bowel irregularity", "gut motility", "digestive health"],
    evidenceLevel: "A",
    topInterventions: ["fiber escalation", "hydration structure", "daily movement"],
    guidanceSummary: "Gradual fiber titration with hydration and mobility is usually the highest-yield protocol.",
    monitoring: ["bowel frequency", "stool form", "daily fiber grams", "hydration consistency"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=fiber+constipation+randomized+trial"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "joint-stiffness-and-mobility-loss",
    name: "Joint Stiffness and Mobility Loss",
    goal: "Reduce pain-limited movement and improve functional range",
    keywords: ["joint stiffness", "mobility", "joint pain", "functional movement", "osteoarthritis symptoms"],
    evidenceLevel: "B",
    topInterventions: ["progressive strength training", "mobility practice", "anti-inflammatory nutrition"],
    guidanceSummary: "Strength and range-of-motion training drive more durable function than passive strategies alone.",
    monitoring: ["pain scores", "range of motion", "step count", "functional task tolerance"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=joint+mobility+exercise+trial"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "oxidative-stress-burden",
    name: "Oxidative Stress Burden",
    goal: "Lower redox imbalance and improve recovery capacity",
    keywords: ["oxidative stress", "redox imbalance", "free radicals", "antioxidant defense", "cellular stress"],
    evidenceLevel: "B",
    topInterventions: ["sleep restoration", "polyphenol-rich nutrition", "graduated exercise load"],
    guidanceSummary: "Oxidative load drops most consistently when recovery and nutrition are corrected together.",
    monitoring: ["hs-CRP", "recovery quality", "sleep duration", "training load response"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=oxidative+stress+intervention+trial"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "menopause-transition-support",
    name: "Menopause Transition Support",
    goal: "Reduce symptom burden while preserving metabolic and bone health",
    keywords: ["menopause", "perimenopause", "hot flashes", "sleep disruption", "bone loss"],
    evidenceLevel: "B",
    topInterventions: ["resistance training", "sleep and stress management", "protein and bone-support nutrition"],
    guidanceSummary: "Symptom control and long-term risk management should be handled in one integrated protocol.",
    monitoring: ["sleep quality", "symptom tracking", "body composition", "bone health markers"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=menopause+lifestyle+intervention+trial"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "immunosenescence-risk",
    name: "Immunosenescence Risk",
    goal: "Preserve adaptive immune function with aging",
    keywords: ["immunosenescence", "aging immune system", "immune aging", "infection susceptibility", "inflammaging"],
    evidenceLevel: "B",
    topInterventions: ["deficiency correction", "regular physical activity", "sleep regularization"],
    guidanceSummary: "Immune aging risk is most responsive to foundational lifestyle and micronutrient adequacy.",
    monitoring: ["infection frequency", "sleep quality", "vitamin D status", "inflammatory markers"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=immunosenescence+intervention+trial"],
    updatedAt: "2026-02-16"
  },
  {
    slug: "sleep-apnea-risk",
    name: "Sleep Apnea Risk",
    goal: "Reduce overnight breathing disruption and daytime fatigue load",
    keywords: ["sleep apnea", "snoring", "oxygen desaturation", "daytime sleepiness", "sleep fragmentation"],
    evidenceLevel: "A",
    topInterventions: ["formal sleep testing", "weight reduction", "airway-focused therapy adherence"],
    guidanceSummary: "Objective diagnosis and adherence to airway treatment are central for cardiometabolic risk reduction.",
    monitoring: ["AHI or equivalent", "daytime sleepiness scores", "blood pressure", "sleep continuity"],
    sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/?term=sleep+apnea+lifestyle+trial"],
    updatedAt: "2026-02-16"
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
