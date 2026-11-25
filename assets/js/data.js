export const PROFILE = {
  name: "Mostafa Tamiminezhad",
  shortName: "Mostafa T.",
  role: "Computational Biologist",
  headline: "I teach machines to read biology — from virus genomes to patient outcomes.",
  subline: "bioinformatics · digital pathology · survival modeling · teaching",
  bio: "Research assistant at the Shiraz Transplant Research Center building multi-modal AI for precision medicine: deep learning that fuses pathology slides, genomics and clinical data into predictions a clinician can act on.",
  email: "tamiminezhad.m@yahoo.com",
  orcid: "0000-0001-7219-7613",
  location: "Shiraz, Iran · open to collaboration worldwide",
  human: "Off the bench: walking, puzzles, and the occasional phishing teardown.",
  stats: [
    { value: "9", label: "publications in press, review or progress", source: "CV 2026" },
    { value: "0.896", label: "CV balanced accuracy · BK subtype ensemble", source: "BK-Virus-Subtype-Classification v2" },
    { value: "500", label: "patients in CKD survival cohort", source: "CKDOCRclinic" },
    { value: "30+", label: "students mentored nationwide", source: "Me.txt" },
    { value: "112", label: "VP1 reference sequences curated", source: "BK-Virus-VP-Subtyping" }
  ]
};

export const LINKS = {
  github: { url: "https://github.com/M7tnj", label: "GitHub", handle: "@M7tnj", note: "11 public repositories · 134 contributions last year" },
  linkedin: { url: "https://www.linkedin.com/in/mostafa-tamiminezhad", label: "LinkedIn", handle: "in/mostafa-tamiminezhad", note: "AI in Medicine | Digital Pathology" },
  youtube: { url: "https://www.youtube.com/@adatadoc", label: "YouTube", handle: "@adatadoc", note: "aDataDoc — Persian bioinformatics course + project walkthroughs" },
  instagram: { url: "https://www.instagram.com/oncology.ai", label: "Instagram", handle: "@oncology.ai", note: "AI × oncology field notes" },
  kaggle: { url: "https://www.kaggle.com/mostafatamiminezhad", label: "Kaggle", handle: "mostafatamiminezhad", note: "competition notebooks and datasets" },
  orcid: { url: "https://orcid.org/0000-0001-7219-7613", label: "ORCID", handle: "0000-0001-7219-7613", note: "verified researcher record" }
};

export const PROJECTS = [
  {
    id: "bk-classifier",
    name: "BK-Virus-Subtype-Classification",
    title: "Virus Subtype Classification Pipeline",
    domain: "genomics + ML",
    accent: "teal",
    blurb: "Calibrated SVM-primary classifier for the four BK polyomavirus subtypes (Ia · Ib1 · Ib2 · Ic) on a fingerprint-scored reference corpus, with explicit k-mer preprocessing, fold-safe class balancing and calibrated probabilities for unlabeled sequences.",
    stack: ["Python 3.12", "scikit-learn 1.5.2", "Biopython", "k-mers k∈{3,4,5}", "soft-voting ensemble"],
    metrics: [
      { value: "0.896", label: "CV balanced accuracy — E1 Soft Voting (lda+svm+extra_trees), v2" },
      { value: "0.817", label: "CV balanced accuracy — Extra Trees winner, v1" },
      { value: "4", label: "subtypes classified: Ia · Ib1 · Ib2 · Ic" },
      { value: "37/37", label: "cells verified by full Restart & Run All, 0 errors" }
    ],
    provenance: "random_state=42, bit-reproducible · semantic versioning v2.1.0 (2026-10-23) · 24-reference corpus + 5 unique user-labeled rows",
    outcome: "From 88 raw references deduplicated to a calibrated 4-class model whose decision boundaries across seven model families are published as PCA-plane figures.",
    links: { repo: "https://github.com/M7tnj/BK-Virus-Subtype-Classification" }
  },
  {
    id: "bk-vp1",
    name: "BK-Virus-VP-Subtyping",
    title: "BKV VP1 Subtyping Pipeline",
    domain: "virology + phylogenetics",
    accent: "teal",
    blurb: "De novo sub-lineage identification for BK polyomavirus VP1 fragments without relying on NCBI annotation tags — Neighbor-Joining phylogeny, p-distance matrices, subtype-diagnostic residue scans and confidence-tier calls.",
    stack: ["Python 3.12", "Biopython 1.86", "BLASTn (NCBI)", "NJ trees", "MIT license"],
    metrics: [
      { value: "112", label: "genotype-tagged VP1 reference sequences" },
      { value: "7", label: "sub-lineages covered: Ia, Ib1, Ib2, Ic, II, III, IV" },
      { value: "9", label: "pipeline steps from QC to confidence-tier call" },
      { value: "3", label: "confidence tiers: HIGH / MODERATE / LOW" }
    ],
    provenance: "reference panel includes prototypes Dunlop (V01108.1) and HSCT23 (PV856439) · SYN/NON-SYN diagnostic residues at protein and nucleotide level",
    outcome: "A query sequence enters as raw fragment and leaves with a subtype call, diagnostic residues, novelty scan and an explicit confidence tier.",
    links: { repo: "https://github.com/M7tnj/BK-Virus-VP-Subtyping" }
  },
  {
    id: "ckd-portal",
    name: "CKDOCRclinic",
    title: "CKD Survival Portal",
    domain: "clinical ML · static web",
    accent: "amber",
    blurb: "A fully static portal for a 500-patient chronic kidney disease cohort: five survival models running entirely in the browser, live analytics, and local-first patient registration — deployed on GitHub Pages with no server and no database.",
    stack: ["Vanilla JS", "cohort.json", "localStorage", "GitHub Pages", "light/dark mode"],
    metrics: [
      { value: "500", label: "patients shipped as read-only study rows" },
      { value: "5", label: "survival models: Cox PH · RSF · GBM · NN · Attention NN" },
      { value: "25", label: "patient fields captured at registration" },
      { value: "4+1", label: "portal pages: register · explore · analytics · predict + overview" }
    ],
    provenance: "live at m7tnj.github.io/CKDOCRclinic · Kaplan–Meier with log-rank, Welch t / Mann-Whitney U, ANOVA, C-index, attention-weight interpretability · CSV + Excel export",
    outcome: "Proof that a clinical survival stack can run serverless: predictions, analytics and interpretability all client-side.",
    disclaimer: "Research demonstrator — not for clinical decision-making.",
    links: { repo: "https://github.com/M7tnj/CKDOCRclinic", live: "https://m7tnj.github.io/CKDOCRclinic/" }
  },
  {
    id: "kdevelop",
    name: "KDevelop",
    title: "Kidney Transcriptomic DEG Pipeline",
    domain: "transcriptomics",
    accent: "teal",
    blurb: "Reproducible R pipeline for differential gene expression on the Affymetrix Human Genome U133A array, comparing renal tubular progenitor cells against adult renal proximal tubule epithelial cells.",
    stack: ["R", "GEOquery", "affy::rma()", "limma + eBayes", "hgu133a.db"],
    metrics: [
      { value: "7", label: "pipeline stages: download → RMA → QC → annotate → DEG → collapse → visualize" },
      { value: "6", label: "plot families: volcano · MA · scatter · heatmap · forest · boxplot" },
      { value: "|log2FC|>1", label: "DEG threshold at raw P < 0.05, BH-adjusted FDR reported" }
    ],
    provenance: "QC by PCA, RLE, NUSE and MA plots · cross-hybridizing probes and NA-symbol probes removed before testing",
    outcome: "A pipeline a stranger can re-run cell by cell and land on the same volcano plot.",
    links: { repo: "https://github.com/M7tnj/KDevelop" }
  },
  {
    id: "kdiri",
    name: "kdIRI",
    title: "Acute Kidney Injury DEG Study",
    domain: "transcriptomics",
    accent: "teal",
    blurb: "Limo-precision DEG analysis of the GSE58438 renal ischemia-reperfusion series — 46-sample GEO series distilled to a 9-sample contrast (5 control + 4 AKI) whose 8,596 DEGs match the published paper.",
    stack: ["R 4.6", "limma", "ComplexHeatmap", "WGCNA", "clusterProfiler", "ReactomePA", "STRINGdb", "pROC"],
    metrics: [
      { value: "8,596", label: "DEGs at |log2FC|>2, raw P<0.05 — matches paper" },
      { value: "9", label: "samples used: 5 control + 4 AKI" },
      { value: "46", label: "samples in the GEO series" }
    ],
    provenance: "GSE58438 · GPL11534 · limma model ~0+group, contrast AKI − Control · log2-RMA-scaled values verified",
    outcome: "Reproduction, not just analysis — the README ships the full session info and threshold provenance.",
    links: { repo: "https://github.com/M7tnj/kdIRI" }
  },
  {
    id: "prediabet",
    name: "preDiabet",
    title: "preDiabet — T2D Risk Model",
    domain: "health ML",
    accent: "violet",
    blurb: "A neural-network model that estimates the risk of type 2 diabetes from common clinical data — built to make screening questions cheap enough to ask early.",
    stack: ["Python", "Neural networks", "clinical features"],
    metrics: [
      { value: "2024", label: "built and released" }
    ],
    provenance: "github.com/M7tnj/preDiabet · described in CV technical projects",
    outcome: "One of two neural projects that year, alongside the Doctor in Pocket backend that won Best AI-Driven Startup Idea.",
    links: { repo: "https://github.com/M7tnj/preDiabet" }
  },
  {
    id: "preheight",
    name: "preHeight",
    title: "Neural Height Prediction — R Package",
    domain: "population health ML",
    accent: "violet",
    blurb: "An MIT-licensed R package that trains a neural network on 1985–2019 world height records to predict school-age height for any desired country and year, returned as plots.",
    stack: ["R", "keras3", "TensorFlow", "tidyverse", "ggplot2", "testthat"],
    metrics: [
      { value: "34", label: "years of training data: 1985 → 2019" },
      { value: "v1.0.0", label: "packaged release, MIT license" }
    ],
    provenance: "trained on data published with DOI 10.1016/S0140-6736(20)31859-6 (Lancet)",
    outcome: "From dataset to installable, tested R package with a proper DESCRIPTION and maintainer role.",
    links: { repo: "https://github.com/M7tnj/preHeight" }
  },
  {
    id: "video-sorter",
    name: "7ideo3orter",
    title: "Video Orientation Sorter Toolkit",
    domain: "practical tooling",
    accent: "rose",
    blurb: "Sorts video files into horizontal and vertical folders by reading resolution metadata with ffprobe — one PowerShell flavor for Windows, one Bash flavor for Linux/macOS, square files left untouched.",
    stack: ["PowerShell 5.1+", "Bash", "ffprobe"],
    metrics: [
      { value: "7", label: "video formats supported: mp4 · mkv · mov · avi · wmv · flv · m4v" },
      { value: "3→1", label: "setup steps: Windows → Linux/macOS" }
    ],
    provenance: "width>height → horizontal · height>width → vertical · square or unreadable metadata → skipped, left in place",
    outcome: "A tiny tool with big docs — troubleshooting section included.",
    links: { repo: "https://github.com/M7tnj/7ideo3orter" }
  },
  {
    id: "dl-fall2022",
    name: "DL_fall2022",
    title: "Introduction to Deep Learning — course",
    domain: "teaching",
    accent: "violet",
    blurb: "Our past course for computational biologists: Introduction to Deep Learning, Fall 2022 — notebooks that took biology students from zero to training models.",
    stack: ["Jupyter", "Python"],
    metrics: [
      { value: "2022", label: "Fall semester course for computational biologists" }
    ],
    provenance: "repository description: 'Our past course for computational biologists'",
    outcome: "Two teaching generations: this repo, and the 2026 aDataDoc lecture series on YouTube.",
    links: { repo: "https://github.com/M7tnj/DL_fall2022" }
  }
];

export const WORKING_REPOS = [
  { name: "CodeAlpha", note: "ML · data science · bioinformatics internship notebooks", url: "https://github.com/M7tnj/CodeAlpha" },
  { name: "VP1-fold", note: "in-silico VP1 variant-effect folding experiments", url: "https://github.com/M7tnj/VP1-fold" },
  { name: "achievements", note: "record keeping", url: "https://github.com/M7tnj/achievements" }
];

export const COURSE = {
  channel: "aDataDoc",
  tagline: "Data Doc — a free bioinformatics course, taught in Persian",
  url: "https://www.youtube.com/@adatadoc",
  sessions: [
    { n: 0, fa: "مقدمه دوره | آموزش مقدمات بیوانفورماتیک | معرفی دوره و نقشه راه", en: "Course introduction — bioinformatics fundamentals and the roadmap", views: 21, age: "1 month ago", vid: "sGZGY9UOCgY" },
    { n: 1, fa: "جلسه اول: ترمینولوژی و داده‌های زیستی 🧬 بیوانفورماتیک چیست؟", en: "Session 1 — terminology and biological data: what is bioinformatics?", views: 39, age: "1 month ago", vid: "D32qRK9LfJ0" },
    { n: 2, fa: "جلسه دوم: NCBI Zero to Hero", en: "Session 2 — NCBI Zero to Hero", views: 7, age: "1 month ago", vid: "Smp3s7nyrPk" },
    { n: 3, fa: "جلسه سوم: Ensembl ،UniProt و AlphaFold", en: "Session 3 — Ensembl, UniProt and AlphaFold", views: 17, age: "1 month ago", vid: "I2_UqJX_qKs" },
    { n: 4, fa: "جلسه چهارم: برنامه نویسی در بیوانفورماتیک", en: "Session 4 — programming in bioinformatics: why it is essential, first project", views: 10, age: "1 month ago", vid: "UmH6l0SUG1s" },
    { n: 5, fa: "جلسه پنجم: پایتون 🐍 برای بیوانفورماتیک", en: "Session 5 — Python for bioinformatics", views: 6, age: "1 month ago", vid: "rq-m4_fkLrs" },
    { n: 6, fa: "جلسه ششم، هفتم و هشتم: R و پروژه بیان ژن", en: "Sessions 6–8 — R and the gene expression project", views: 2, age: "4 weeks ago", vid: "OaQZr9eWFDo" },
    { n: 9, fa: "جلسه نهم: جمع بندی و مسیر شغلی", en: "Session 9 — wrap-up and career paths", views: 4, age: "4 weeks ago", vid: "lYyecgUpybA" }
  ],
  extras: [
    { fa: "پروژه دیابت", en: "Diabetes project — hands-on walkthrough", views: 14, age: "2 weeks ago", tag: "project", vid: "DudCcRaemVA" },
    { fa: "120 thousand Microsoft 365 Accounts Hacked | Phishing Explained", en: "Security explainer — how a 120k-account Microsoft 365 phishing attack works", views: 18, age: "3 weeks ago", tag: "explainer", vid: "ANB17_wfnfI" }
  ]
};

export const EDUCATION = [
  { org: "Zand Institute of Higher Education", place: "Shiraz, Iran", what: "B.Sc. Biotechnology — GPA 3.65/4.0", when: "2019–2024", src: "CV 2026", extra: "Medical Biotechnology · Advanced Molecular Biology · Computer & Network · Statistics" },
  { org: "Oman Medical College", place: "Sohar, Muscat, OM", what: "Foundation — medical sciences, after admission to medicine in the UAE", when: "2018–2019", src: "ORCID" },
  { org: "Johns Hopkins University", place: "Baltimore, US", what: "Python for Genomic Data Science (Bioinformatics)", when: "2022–2023", src: "ORCID" },
  { org: "Rice University · Coursera", place: "Houston, Texas, US", what: "Fundamentals of Immunology (specialization)", when: "2020 →", src: "ORCID" }
];

export const PUBLICATIONS = [
  { status: "in press", year: "2026", title: "Transcriptomic and Network Analysis Identifies Regulatory Mechanisms Driving Tubular Progenitor Cell Differentiation for Optimized Kidney Tissue Engineering in Transplantation", authors: "Tamiminezhad, M; Afshari, A.", tag: "kidney tissue engineering" },
  { status: "in press", year: "2026", title: "Human polyomavirus BKV VP1 gene, partial sequences — GeneBank, NCBI, Accession No. PZ670565 to PZ670597", authors: "Sahragard, I; Yaghobi, R; Rouzbeh, J; Afshari, A; Tamiminezhad, M.", tag: "33 deposited sequences" },
  { status: "published", year: "2023", title: "Identification of Metastasis Driver Genes in HR-/HER2+ Breast Cancer Using Data Mining Method — The First International Congress of Cancer Genomics, CGC01_301: 153", authors: "Tamiminezhad, M.", tag: "cancer genomics" },
  { status: "under review", year: "—", title: "DNA Damage Response-Driven Biomarkers and miRNA Regulators in Renal Ischemia–Reperfusion Injury: An Integrated Bioinformatics and Experimental Study", authors: "Karimi, Z; Ghahramani, P; Afshari, A; Tamiminezhad, M.", tag: "AKI biomarkers" },
  { status: "under review", year: "—", title: "The Algorithmic Lens: A Review of Digital Pathology's Evolution and the Translational Impact of Artificial Intelligence in Diagnosis, Prognosis, and Precision Medicine", authors: "Tamiminezhad, M; Sahragard, I; Afshari, A.; Yaghobi, A.", tag: "digital pathology review" },
  { status: "in progress", year: "—", title: "VP1 Genetic Variation and Host-Viral miRNA Signatures in BK Polyomavirus Associated Nephropathy", authors: "Sahragard, I; Geramizadeh, B; Yaghubi, R; Afshari, A; Tamiminezhad, M.", tag: "BKV nephropathy" },
  { status: "in progress", year: "—", title: "Prediction of Kidney Failure and Transplantation Time in Patients with Chronic Kidney Disease: Combining Machine Learning, Transfer Learning and Deep Learning Based on Handwritten Clinical Notebooks", authors: "Tamiminezhad, M; Afshari, A; Sahragard, I; Karimi, Z; Rouzbeh, J; Yaghoubi, R.", tag: "survival · OCR notebooks" },
  { status: "in progress", year: "—", title: "Exploring the Morphological Changes in Pathological Slides from Renal Biopsies, Suspected BK Virus Infection by multimodal VLM Algorithms", authors: "Tamiminezhad, M; Afshari, A; Sahragard, I; Karimi, Z; Rouzbeh, J; Omidi Far, N; Mohammadzadeh, S; Yaghoubi, R.", tag: "VLM · renal biopsy" }
];

export const AWARDS = [
  { year: "12/2024", title: "Best AI-Driven Startup Idea", detail: "co-developed the backend ML model of Doctor in Pocket during a 3-day startup event", src: "CV 2026" },
  { year: "09/2018", title: "Gold Medal — National University of Oman Science Fair", detail: "best performance in the Science Fair Debate Competition", src: "CV 2026" },
  { year: "high school", title: "Biology Olympiad — provincial runner-up", detail: "reached 2nd place at provincial level, several attempts", src: "Me.txt" },
  { year: "2018", title: "International science fairs — innovation & invention + science debate", detail: "tidal-force seawater desalination rig and an energy-independent automatic greenhouse, developed with university professors", src: "Me.txt" }
];

export const CERTS = [
  { year: "2026", title: "Certified Data Scientist and Data Engineer Associate", org: "DataCamp", flag: "USA" },
  { year: "2026", title: "Machine Learning Scientist in Python — Skill Track", org: "DataCamp", flag: "USA" },
  { year: "2025", title: "Advanced Machine Learning and Mathematics Skill Track — 88.5 CPE", org: "365 Data Science & ADaSci", flag: "Belgium" },
  { year: "2025", title: "Advanced SQL", org: "365 Data Science", flag: "—" },
  { year: "2024", title: "CS50 Programming with R and Python", org: "Harvard University", flag: "USA" },
  { year: "2023", title: "Biomedical Image Analysis and Processing in Python", org: "DataCamp", flag: "USA" },
  { year: "2023", title: "RNA-Seq and ChIP-seq Analysis in R", org: "DataCamp", flag: "USA" },
  { year: "2023", title: "Python Programming License", org: "Iran Technical & Vocational Training Organization", flag: "Iran" },
  { year: "2022–2023", title: "Python for Genomic Data Science", org: "Johns Hopkins University", flag: "USA" },
  { year: "2022", title: "Breast Cancer Tumor Board Meetings and Case Presentations", org: "Research To Practice · I3Health", flag: "—" },
  { year: "2021", title: "Teacher Training: The CRISPR Revolution — Genome Editing in Basic Research and Beyond", org: "EMBL-EBI", flag: "EU" },
  { year: "2021", title: "Comprehensive Cancer Research Training Program", org: "Stanford University School of Medicine", flag: "USA" },
  { year: "2021", title: "Handling and Analysis of Genomic Data Using Artemis Software", org: "Wellcome Sanger Institute", flag: "UK" },
  { year: "2020 →", title: "Fundamentals of Immunology (specialization)", org: "Rice University · Coursera", flag: "USA" }
];

export const INTERNSHIPS = [
  { when: "09/2026 →", what: "Machine Learning, Data Science and Bioinformatics", org: "Code Alpha", place: "India" },
  { when: "06–07/2023", what: "CS50 for Educators", org: "Harvard University, Division of Continuing Education", place: "USA" },
  { when: "03/2021", what: "Comprehensive Cancer Research Training Program", org: "Stanford University School of Medicine", place: "USA" }
];

export const LANGS = [
  { name: "Persian", level: "native" },
  { name: "Arabic", level: "native" },
  { name: "English", level: "professional working proficiency · C1 · IELTS 7.0" }
];

export const INTERESTS = ["Computational Biology", "Biomedical Imaging", "Spatial Biology", "Digital Pathology", "Deep Learning"];

export const FOCUS = [
  { title: "Multi-modal AI in neuro-oncology", body: "Fusing WSI pathomic signatures of the tumor microenvironment — cellular context and molecular proxies of cognitive function — with functional neuroimaging (radiomics / fMRI) through deep fusion networks, to quantify tumor-induced neuroplasticity and predict cognitive reserve in glioma patients." },
  { title: "Deep learning for whole-slide imaging", body: "Convolutional and Vision Transformer networks for automated prognosis, grading and molecular feature extraction from high-resolution digital pathology slides — the engine behind the Algorithmic Lens review and the renal-biopsy VLM study." },
  { title: "Scalable computational biomedicine", body: "Reproducible GPU-accelerated pipelines on MLOps practices, cloud compute (AWS / Azure) and containerization — chosen deliberately because funding constraints demand cost-effective, accessible research infrastructure." }
];

export const LAB = {
  centers: ["Shiraz Transplant Research Center", "Shiraz Nephrology Research Center"],
  mentors: [
    { name: "Dr. Ramin Yaghoubi", role: "Full Professor, Shiraz University of Medical Sciences" },
    { name: "Dr. Ilnaz Sahragard", role: "Postdoctoral Researcher, Shiraz University of Medical Sciences" },
    { name: "Dr. Afsoon Afshari", role: "research supervisor" }
  ],
  mission: "Integrate morphological biomarkers with clinical and multi-omics findings to identify disease-progression patterns and predict clinically actionable outcomes — delaying or altering adverse events for CKD and transplant patients."
};

export const KEYWORDS = ["Bioinformatics", "Artificial Intelligence", "Digital Pathology", "Machine Learning"];

export const VIZ = {
  ladder: [
    { model: "Extra Trees", version: "v1 winner", acc: 0.817, note: "LOOCV protocol, single model" },
    { model: "LDA", version: "v2 · tie", acc: 0.896, note: "tie disclosed in README" },
    { model: "E1 Soft Voting", version: "v2 winner", acc: 0.896, note: "lda + svm + extra_trees ensemble" }
  ],
  kidney: [
    { value: 8596, label: "DEGs", sub: "kdIRI · GEO", accent: "teal" },
    { value: 500, label: "patients", sub: "CKDOCRclinic", accent: "amber" },
    { value: 112, label: "VP1 refs", sub: "VP-Subtyping", accent: "teal" },
    { value: 24, label: "corpus refs", sub: "classifier v2", accent: "teal" },
    { value: 25, label: "patient fields", sub: "portal form", accent: "amber" },
    { value: 5, label: "survival models", sub: "5-model stack", accent: "amber" }
  ],
  syllabusNote: "Bubble area = views at harvest time. Fresh course, honest numbers."
};

export const SKILLS = [
  { area: "Bioinformatics", level: 0.95, evidence: "DEG pipelines, phylogenetics, NCBI/Ensembl/UniProt/AlphaFold" },
  { area: "Machine Learning", level: 0.85, evidence: "calibrated ensembles, k-mer features, neural nets" },
  { area: "Digital Pathology & Imaging", level: 0.8, evidence: "WSI CNN/ViT, H&E systematic review, multimodal VLM on renal biopsies" },
  { area: "Survival Analysis", level: 0.8, evidence: "Cox PH, RSF, KM, C-index, attention interpretability" },
  { area: "R / Bioconductor", level: 0.9, evidence: "limma, WGCNA, clusterProfiler, keras3" },
  { area: "Python / ML stack", level: 0.85, evidence: "scikit-learn, TensorFlow, PyTorch, Biopython" },
  { area: "Cloud & MLOps", level: 0.7, evidence: "AWS EC2/S3/Lambda, Azure, Docker, pipelines" },
  { area: "Teaching & communication", level: 0.85, evidence: "30+ mentees, 9-lecture Persian course, congress talks" }
];

export const STORY = [
  {
    year: "before 2018",
    kicker: "the backyard",
    title: "Curiosity, before the word for it",
    body: "In the backyard of the family house: different kinds of insects, planted seeds, careful watching. When the internet arrived at the end of middle school, the search bar became the microscope. High-school textbooks demanded the same page over and over — he went and read Campbell Biology instead, watched Khan Academy and AK Lectures until the ideas moved, and pushed to second place at the provincial Biology Olympiad. The school system measured one kind of study; he was built for another kind.",
    facts: ["Biology Olympiad — provincial runner-up", "Campbell Biology over textbooks", "Khan Academy · AK Lectures as first professors"]
  },
  {
    year: "2018–2019",
    kicker: "the detour",
    title: "Medicine admitted, life interrupted",
    body: "The Konkur went badly — not for lack of mind but because memorizing the same book is a different skill from understanding it. Admission to medicine came through the UAE on grade equivalency, along with an IELTS sprint to clear the English foundation course. He joined a research group and took two projects to the international science fairs: a tidal-force seawater desalination rig and an energy-independent automatic greenhouse, built with university professors. Gold medal for debate at the National University of Oman Science Fair. Then his father's business collapsed, and the family returned to Iran.",
    facts: ["Medicine admission — UAE, via grade equivalency", "Gold Medal — Oman Science Fair debate", "Tidal desalination + autonomous greenhouse projects"]
  },
  {
    year: "2019–2022",
    kicker: "the two crafts",
    title: "Roasting coffee, rendering motion",
    body: "Money had to come from somewhere. He self-taught the whole motion stack — Premiere Pro, After Effects, Maya, Final Cut Pro — and produced promotional films for companies, turning pixels into payroll. At a coffee shop he learned roasting, prep and kitchen mixing fast enough to raise the food quality and steady the finances. A brief enrollment in genetics at Azad University ended when it became clear nobody supports a bachelor's student's research. Two crafts survived: making things move, and making systems run.",
    facts: ["Premiere Pro · After Effects · Maya · Final Cut Pro", "freelance promo videos → family income", "coffee shop: roasting, kitchen, stability"]
  },
  {
    year: "2020–2022",
    kicker: "the rewiring",
    title: "The pandemic as a self-discovery session",
    body: "Biotechnology at Zand Institute in Shiraz came with a plan — build a research group — and then COVID cancelled the classroom. Paid workshops were out of reach, so he built the network himself: LinkedIn outreach, every congress within reach (Genomics Congress 2021 and 2022, the iGEM congress computational-genomics track), and financial-aid learning paths pushed through days of nonstop study — sometimes falling asleep with hands still on the keyboard. Somewhere in that noise the connection appeared: computer science is not beside biology, it is inside it.",
    facts: ["Genomics Congress 2021 · 2022 · iGEM computational track", "financial-aid platforms instead of paid workshops", "asleep at the keyboard, on purpose"]
  },
  {
    year: "2022–2023",
    kicker: "the first question",
    title: "Which genes let a tumor escape?",
    body: "At tumor-board meetings and CME exercises he hunted for a gap that clinicians actually feel. It crystallized: which specific genes let a node-metastasized HER2+/ER−/PR− breast cancer cross biological barriers and form distant metastasis? Four GEO microarray cohorts were integrated and filtered into a 320-sample curated dataset, three clinical categories were grouped, and limma in R surfaced 32 shared differentially expressed genes. The work was presented at the 16th International Breast Cancer Congress (Shahid Beheshti University, Tehran) and the First International Cancer Genomics Congress.",
    facts: ["4 GEO datasets → 320-sample cohort", "32 shared DEGs via limma", "16th Int'l Breast Cancer Congress · CGC01_301:153"]
  },
  {
    year: "2022–2024",
    kicker: "the ladder down",
    title: "Teaching what he wished he'd had",
    body: "At the congress poster sessions the real finding appeared: peers drowning in thesis statistics. So he organized book clubs and workshops for ten-plus students from different universities — literature search, LinkedIn, biostatistics, R/Python, machine learning. Then formal roles: Teaching Assistant and mentor at Zand for Research Skills, LinkedIn for Researchers and Introduction to Bioinformatics; freelance instructor of biostatistics and programming for biologists; the DL_fall2022 deep-learning course; and finally aDataDoc — a nine-session Persian-language bioinformatics course on YouTube, from NCBI to a full gene-expression project. More than thirty students mentored nationwide.",
    facts: ["30+ mentees nationwide", "TA & mentor — Zand Institute", "aDataDoc: 9 sessions, taught in Persian"]
  },
  {
    year: "2024 →",
    kicker: "the lens years",
    title: "Shiraz Transplant Research Center",
    body: "Now a research assistant under Dr. Ramin Yaghoubi, Dr. Ilnaz Sahragard and Dr. Afsoon Afshari, working where imaging, virology and machine learning meet: BK polyomavirus VP1 subtyping and calibrated classification, prediction of kidney failure and transplantation timing from handwritten clinical notebooks, deep phenotyping of the RCC immune landscape on whole-slide IHC, and multimodal VLM algorithms reading renal biopsies suspected of BK infection. Infrastructure limits and funding gaps became design constraints — cloud computing, MLOps and serverless deployments instead of expensive servers. Along the way: Best AI-Driven Startup Idea for the Doctor in Pocket backend.",
    facts: ["VP1 pipelines · 112 reference sequences", "WSI deep phenotyping · multimodal VLM", "Best AI-Driven Startup Idea — Doctor in Pocket"]
  },
  {
    year: "horizon",
    kicker: "the return",
    title: "A clinical decision-support knowledge base",
    body: "The long game: carry these time-to-even predictive frameworks into clinical pipelines — treatment-outcome prediction, trial optimization, transplant readiness — and build a decision-support knowledge base that turns complex computational output into something a clinician in his home country can act on. Every number on this site is a step on that path: sequence → subtype → transcript → image → outcome → person.",
    facts: ["precision medicine in Iran", "transplant-readiness optimization", "sequence → subtype → image → outcome"]
  }
];

export const SHOWPIECE = {
  modes: [
    {
      id: "cohort", label: "COHORT · 500 patients",
      title: "The 500-patient cohort",
      line: "A chronic kidney disease cohort, served serverless — five survival models running entirely in the browser.",
      facts: [["500", "patients as read-only study rows"], ["25", "clinical fields captured at registration"], ["5", "models: Cox PH · RSF · GBM · NN · Attention NN"]],
      link: { href: "https://github.com/M7tnj/CKDOCRclinic", text: "CKDOCRclinic ↗" }
    },
    {
      id: "sequence", label: "SEQUENCE · k-mers",
      title: "From raw bases to features",
      line: "The classifier reads viruses as k-mer vocabularies — k ∈ {3,4,5} — then calibrates the vote of seven model families.",
      facts: [["24", "reference corpus after deduplication"], ["{3,4,5}", "k-mer vocabulary sizes"], ["0.896", "CV balanced accuracy, E1 soft voting"]],
      link: { href: "https://github.com/M7tnj/BK-Virus-Subtype-Classification", text: "classifier v2 ↗" }
    },
    {
      id: "capsid", label: "CAPSID · VP1 · press ⏎",
      title: "VP1, the capsid that decides",
      line: "VP1 is the protein shell the immune system sees — the site of every subtype-diagnostic residue. Press Enter to type a subtype onto the shell.",
      facts: [["112", "genotype-tagged VP1 references"], ["7", "sub-lineages: Ia · Ib1 · Ib2 · Ic · II · III · IV"], ["PZ670565–597", "GenBank deposits, 2026"]],
      link: { href: "https://github.com/M7tnj/BK-Virus-VP-Subtyping", text: "VP1 subtyping pipeline ↗" }
    },
    {
      id: "slide", label: "SLIDE · H&E · press ⏎",
      title: "The algorithmic lens",
      line: "A whole-slide image, tiled. Press Enter to overlay the attention heatmap the VLM sees when it reads renal biopsies.",
      facts: [["H&E", "hematoxylin & eosin, the 1873 stain AI now reads"], ["CNN · ViT", "graders trained on gigapixel slides"], ["VLM", "multimodal reading of BK-suspect biopsies"]],
      link: { href: "story.html", text: "the digital pathology story →" }
    },
    {
      id: "survival", label: "OUTCOME · survival",
      title: "Time-to-event, predicted",
      line: "Handwritten clinical notebooks, OCR'd and fused with labs: the goal is predicting kidney failure and transplantation time before it happens.",
      facts: [["C-index", "concordance across 5 model families"], ["time-to-event", "the clinically honest outcome"], ["2", "clinical goals: organ survival · transplant readiness"]],
      link: { href: "https://github.com/M7tnj/CKDOCRclinic", text: "survival portal ↗" }
    },
    {
      id: "monogram", label: "PERSON · MT",
      title: "The person running the pipeline",
      line: "Motion designer, coffee roaster, lecturer, researcher — the same person, holding every layer of this instrument together.",
      facts: [["30+", "students mentored nationwide"], ["9", "lectures instructed in Persian"], ["2", "crafts before biology: motion & coffee"]],
      link: { href: "story.html", text: "read the full story →" }
    }
  ]
};
