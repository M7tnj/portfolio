# DESIGN_NOTES.md — Mostafa Tamiminezhad Portfolio

Creative direction memo, concept decision record, content mapping, and open gaps.
Every personal fact on the site traces to one of the sources listed below. Nothing is invented.

---

## 0. Evidence sources (dossier)

| # | Source | URL | Harvested |
|---|--------|-----|-----------|
| S1 | GitHub profile + profile README + 11 repositories | https://github.com/M7tnj | Full repo list, descriptions, languages, READMEs |
| S2 | ORCID 0000-0001-7219-7613 | https://orcid.org/0000-0001-7219-7613 | Bio, keywords, education/course history, country |
| S3 | LinkedIn | https://linkedin.com/in/mostafa-tamiminezhad | Headline only (page blocks automated access): "AI in Medicine \| Digital Pathology" |
| S4 | YouTube @adatadoc | https://youtube.com/@adatadoc | 10 videos: 9-session Persian bioinformatics course + 2 project/explainer videos, view counts |
| S5 | Instagram @oncology.ai | https://www.instagram.com/oncology.ai | Handle only (page blocks automated access) |

Conflicts resolved by choosing the more specific/recent source (S1 > S2 for repo facts; S2 for education).

---

## 1. Phase 1 — Creative Direction Memo (forensic analysis)

### 1.1 Expertise map (what he is, in ranked order)

1. **Computational biologist / bioinformatician** — self-declared (S1: "passionate biologist, editor and programmer"; S2 keywords: Bioinformatics, Artificial Intelligence, Digital Pathology, Machine Learning).
2. **AI-for-medicine builder** — S3 headline "AI in Medicine | Digital Pathology"; S2 bio: "develops deep learning models that fuse medical imaging and genomics to predict disease outcomes".
3. **R + Python polyglot data scientist** — S1: "I specialize in Data Science, Python, and R"; proven by repo stacks (limma/Bioconductor, scikit-learn, Biopython, keras3/tensorflow).
4. **Educator** — S4: instructed a 9-session bioinformatics course in Persian; also ran DL_fall2022, "our past course for computational biologists" (S1).
5. **Shipper of static clinical tools** — CKDOCRclinic is deployed and live on GitHub Pages (verified HTTP 200).

### 1.2 Signature story (the one strangers should repeat)

**"From virus genomes to patient outcomes."** His repos climb the exact ladder of precision medicine:

- BK polyomavirus **sequence** → k-mer features → calibrated ensemble classifier (CV balanced accuracy **0.896**, `random_state=42`, 37/37 cells verified by full Restart & Run All).
- Kidney **transcriptomes** → limma pipelines → **8,596 DEGs** (kdIRI, GSE58438, matches the paper) and a 7-step reproducible DEG pipeline (KDevelop, HG-U133A).
- **500-patient CKD cohort** → 5 survival models (Cox PH, Random Survival Forest, Gradient Boosting, Neural Network, Attention NN) → live prediction portal in the browser.
- **Population data** → preHeight, an MIT-licensed R package training a neural net on 1985–2019 WHO height data (Lancet DOI 10.1016/S0140-6736(20)31859-6).

And he teaches the bottom of that ladder to others — in Persian — for free.

### 1.3 Era resonance

The resonant era is **now**: open bioinformatics (NCBI, Ensembl, UniProt, AlphaFold in his lecture titles), reproducibility culture (semantic versioning, determinism badges in his READMEs), and browser-first clinical demonstrators. There is **no evidence of nostalgia aesthetics** — the seeded "Windows XP Time Capsule" concept has zero support in the dossier and is discarded.

### 1.4 Personality / tone (from evidence, not invention)

- "loves complexity", "loves solving puzzles and challenges" (S1) → precise, systems-thinking voice.
- Explicit provenance everywhere: GEO accessions, GSM accessions, platform titles, R session info, versioning tables → the site must label every number with its source.
- generosity: full course free on YouTube; MIT licenses → welcoming, non-gatekeeping tone.
- Human side: "walking and exploring nature" (S1) → one quiet human line, not a personality brand.
- Language: English portfolio, Persian course titles preserved with English glosses (S4 is in Persian; hiding that would falsify the record).

### 1.5 Quantifiable material (real numbers on the site, each with a source tag)

| Number | Fact | Source |
|---|---|---|
| 11 | public repositories (+1 profile repo) | S1 |
| 0.896 | BK subtype ensemble (E1 Soft Voting: lda+svm+extra_trees) CV balanced accuracy, v2 | S1 BK-Virus-Subtype-Classification README |
| 0.817 | v1 winner (Extra Trees) CV balanced accuracy | same |
| 4 | BKPyV subtypes classified: Ia · Ib1 · Ib2 · Ic | same |
| 112 | genotype-tagged VP1 reference sequences (Ia, Ib1, Ib2, Ic, II, III, IV) | S1 BK-Virus-VP-Subtyping README |
| 8,596 | DEGs at \|log2FC\|>2, P<0.05 (AKI vs control, GSE58438, matches paper) | S1 kdIRI README |
| 46 / 9 | samples in series / samples used (5 control + 4 AKI) | S1 kdIRI README |
| 500 | patients in CKD cohort | S1 CKDOCRclinic README |
| 5 | survival models (Cox PH, RSF, GBM, NN, Attention NN) | S1 CKDOCRclinic README |
| 25 | patient fields captured by the portal register | S1 CKDOCRclinic README |
| 7 | pipeline steps in KDevelop DEG workflow | S1 KDevelop README |
| k∈{3,4,5} | k-mer vocabularies in classifier preprocessing | S1 BK-Virus-Subtype-Classification README |
| 9 | course sessions instructed (Persian) | S4 |
| 134 | GitHub contributions in the last year | S1 profile |
| 1985–2019 | WHO height data range used by preHeight | S1 preHeight DESCRIPTION |

### 1.6 Asset inventory

- No personal photographs exist in the dossier → per brief, the site uses **original SVG/CSS/Canvas art** (virus capsid geometry, sequence typography, survival-curve forms). No stock photos, no Microsoft/other copyrighted assets.
- Existing live artifact: https://m7tnj.github.io/CKDOCRclinic/ (verified reachable) → link, don't clone.
- Public contact channel: tamiminezhad.m@yahoo.com (declared by him as author/creator/copyright contact in the MIT-licensed preHeight package metadata, S1).

### 1.7 Cliché risks to avoid

- "DNA helix + glowing blue dashboard" generic AI-bio look → countered by an editorial/instrument aesthetic, real numbers, and provenance labels instead of decoration.
- Fake clinical claims → every clinical artifact carries his own "research demonstrator — not for clinical decision-making" disclaimer.
- Gradients-for-the-sake-of-gradients → color is **semantic** (domain-coded, see §3).

---

## 2. Phase 2 — Concept discovery & decision record

### Candidate A — "The Multi-Modal Instrument"

A dark, lab-grade editorial site. One hero showpiece: a particle capsid that morphs between the five modalities of his work (scatter → double helix → capsid → survival curve → monogram). Real numbers everywhere, each tagged with its source. Intro film streams a sequence, runs a classifier, draws a survival curve, then assembles into the hero.

| Criterion | Score /10 | Why |
|---|---|---|
| Expertise fit | 10 | The morph IS his multi-modal claim, literally demonstrated |
| Narrative power | 9 | "sequence → subtype → transcript → outcome → person" is his actual ladder |
| Wow factor | 9 | Morphing particle showpiece + skippable 30s film |
| Honesty | 10 | Only dossier numbers, all tagged |
| Feasibility | 8 | Canvas particles + CSS film; no frameworks; must watch the perf budget |

### Candidate B — "Clinical Console"

The whole site styled as a terminal/PACS console: commands, monospace, scanlines, patients-as-rows.

| Criterion | Score /10 | Why |
|---|---|---|
| Expertise fit | 7 | Fits CKD portal, but flattens the biology + teaching halves |
| Narrative power | 6 | Strong gimmick, weak arc; persona risks reading as "hacker" not "scientist" |
| Wow factor | 6 | Familiar trope (terminal portfolios are a cliché) |
| Honesty | 8 | Safe, but invites fake-patient LARPing |
| Feasibility | 9 | Cheap to build |

### Candidate C — "The Journal"

His portfolio as an interactive review paper: abstract hero, methods (skills), results (projects), figures (visualizations), references (credentials). Extreme typographic rigor, serif science-journal voice.

| Criterion | Score /10 | Why |
|---|---|---|
| Expertise fit | 8 | Matches reproducibility culture |
| Narrative power | 7 | Elegant but quiet; low energy for a 10-second stranger test |
| Wow factor | 5 | Beauty without spectacle |
| Honesty | 10 | Naturally citation-driven |
| Feasibility | 9 | Mostly typographic |

### DECISION: **Candidate A wins (36/50 vs 36 tie in raw sum — A wins on the two criteria that matter most for the brief: 10-second stranger clarity and design-as-proof-of-creativity).**

B's wow is derivative; C's wow under-sells. A also absorbs C's citation discipline (source tags on every figure) and reuses B's monospace for data labels only — not for the whole voice.

Seed concept "Windows XP Time Capsule" → **rejected**: no dossier evidence of that resonance (§1.3).

---

## 3. Phase 3 — Design system

### 3.1 Visual identity

- **Style name:** "Bioluminescent instrument" — dark laboratory navy, paper-white ink, semantic accent colors.
- **Palette:**
  - Background `#070B14` → panels `#0C1322` / `#101A2E`, hairlines `rgba(148,178,255,.14)`
  - Ink `#E9F0FA`, dim ink `#9FB0C8` (AA on panel backgrounds)
  - **Teal `#2DD4BF` = genomics/sequence** · **Violet `#8B5CF6` = ML/models** · **Amber `#F5B84B` = clinical/outcomes** · **Rose `#FB7185` = security/human asides**
- **Type:** Space Grotesk (display), Inter (body), JetBrains Mono (data labels + provenance tags). Google Fonts with full system fallbacks.
- **Texture:** faint instrument grid; no scanlines, no glassmorphism blur stacking.

### 3.2 Content mapping (dossier entry → site element)

| Dossier evidence | Site element | Where |
|---|---|---|
| S1+S2+S3 identity | Hero: name + "Computational biologist — I teach machines to read biology, from virus genomes to patient outcomes" | index |
| Multi-modality (S1, S2 bio) | Showpiece: morphing particle capsid with 5 formations, mouse/touch/keyboard operable | index hero |
| BK classifier 0.817→0.896 | Viz 1: animated "classifier ladder" SVG, hover per model | index |
| Course sessions + views (S4) | Viz 2: syllabus map (interactive timeline, Persian titles + English gloss, view-count bubbles) | teaching |
| Kidney cluster numbers (S1) | Viz 3: "The kidney files" animated metric bars, each tagged to its repo | projects |
| 11 repos with/without READMEs | projects.html: 7 documented case files + 1 course repo + "working repos" strip for undocumented ones (honest) | projects |
| CKDOCRclinic live | Featured case with LIVE badge → external link | index + projects |
| Education timeline (S2) | credentials.html timeline (Oman Medical College foundation → Shiraz BSc Biotechnology → Rice immunology → JHU Python for Genomic Data Science) | credentials |
| ORCID keywords + bio (S2) | credentials "operating statement" block | credentials |
| S3 headline | credentials headline chip "AI in Medicine \| Digital Pathology" | credentials |
| S4 channel + S5 handle | Channels strip (GitHub/LinkedIn/YouTube/Instagram/ORCID) with real URLs | all pages footer |
| "walking and exploring nature" (S1) | single footer line "Off the bench: walking, puzzles, and the occasional phishing teardown" | footer |

### 3.3 Intro film spec (hard requirement compliance)

- ~28 s, 5 scenes (sequence stream → k-mer sort → transcriptome heat → survival draw → assembly into hero). **Skippable** via button + Escape; plays **once per visit** (sessionStorage); ends by dissolving into the hero (assembly, not a cut). `prefers-reduced-motion` → film never mounts; static hero renders directly.

### 3.4 Performance & a11y budget

- Total JS well under 150 KB minified (vanilla ES modules, zero dependencies).
- Only `transform`/`opacity` animated; particle canvas is the sole rAF loop, paused when hidden or after film skip.
- Keyboard: skip-film (Esc), showpiece formations (arrow keys), all nav/focus visible; ARIA labels on canvas, vizzes, and nav; body text AA contrast; `<noscript>` block carries the core facts.

---

## 4. Open gaps ({{UNKNOWN}} log) — designed around, never filled with fiction

1. `{{UNKNOWN: LinkedIn certification list}}` — LinkedIn blocks automated access; only the headline is verifiable. Site shows the ORCID-verified course history instead; operator should paste his cert list later into `assets/js/data.js` (single edit point).
2. `{{UNKNOWN: Instagram @oncology.ai post contents}}` — same block. Site renders the handle as a channel card only; suggested asset: export of top posts (screenshots) to add a "field notes" section.
3. `{{UNKNOWN: YouTube individual video URLs}}` — channel page exposes titles/counts, not per-video links. Cards link to the channel.
4. `{{UNKNOWN: CodeAlpha / VP1-fold / achievements repo contents}}` — READMEs are placeholder-only; listed honestly as "working repos — docs in progress", not described.
5. `{{UNKNOWN: portrait photo}}` — none exists in dossier; site ships original SVG/Canvas art. Suggested asset: a lab-adjacent portrait (WebP, ≤200 KB) dropped into `assets/images/` later.

---

## REVISION 2 — 2026-11-25 (second user pass)

Requests: pro-grade intro film with more biomedical imaging · give the capsid showpiece real value · center the story · cover the full CV record · keep page navigation as pages (no scroll-attached shifting) · more complexity everywhere.

### What changed and why

1. Intro film rebuilt as a canvas scene engine (`intro.js`): seven scenes, ~46 s, film grain + vignette + letterbox + camera zoom + eased captions. New scenes: growing L-system branches (backyard curiosity), a motion.aep keyframe composition (the self-taught motion-design origin), two particle worlds merging (CS ∩ biology), a whole-slide H&E tissue grid with scan sweep and VLM attention bloom ("teaching the microscope to see" — the biomedical-imaging emphasis), sequence rain → k-mer chips → pentamer capsid assembly with orbiting subtypes, KM arms drawing to the median, and the title card with tracking-in name and the full transform chain.
2. Showpiece rebuilt as the Multimodal Instrument (`showpiece.js` + data.js `SHOWPIECE`): six modes — cohort / sequence / capsid / slide / survival / person — each wired to real numbers (500 patients · 25 fields · 5 models; 24-ref corpus · 0.896; 112 VP1 refs · 7 sub-lineages · GenBank PZ670565–PZ670597; H&E → CNN/ViT → VLM; time-to-event goals; 30+ mentees · 9 lectures · 2 prior crafts). Capsid pentamers are hover/click targets exposing VP1 diagnostic regions; Enter types a subtype onto the shell; the slide mode toggles the attention heatmap; a per-mode info panel carries the use case and a deep link. Keyboard: ← → mode, Enter activate.
3. Story page added (`story.html`): eight sourced chapters from `Me.txt` + both CVs, alternating layout, animated SVG scenes (branches, medal orbit, coffee/clapperboard, network wiring, volcano plot, ladder/bubbles, slide scanline, horizon), scroll-progress rail, closing quote card. Static HTML — reads fully without JS.
4. Full record added to credentials.html: 8 publication records with status chips (in press / under review / in progress), 4 awards, 14 certifications & training records, 3 internships, 3 languages, lab affiliations + mentors, plus preDiabet and the re-scoped CodeAlpha/VP1-fold working repos. Kaggle channel added.
5. Teaching page: click-to-load video wall — 6 real lectures embedded via youtube-nocookie after user intent (facade thumbnails from i.ytimg.com; no third-party JS until clicked).
6. Page navigation stays ordinary multi-page links; reveal animations remain inside normal scrolling — no scroll-jacking, per instruction.
7. Integrity kept: zero code comments, all paths relative, `.nojekyll` + branded `404.html` untouched in function, reduced-motion + no-JS fallbacks (noscript reveal override + facts block), JS ~91 KB unminified across 5 modules, no fabricated facts — every new fact traces to `Me.txt`, `Tamiminezhad_Mostafa_CV.pdf`, `CV (1).pdf`, GitHub API, YouTube oEmbed, or the four channel URLs.

### Evidence added this pass

- Publications list, GPA, selected courses, teaching roles, interests, languages, awards (Doctor in Pocket 12/2024, Oman gold medal 09/2018), internships (Code Alpha, Harvard CS50 for Educators, Stanford CCRT), certifications (DataCamp ×2, 365/ADaSci, Harvard CS50, JHU, EMBL-EBI CRISPR, Wellcome Sanger Artemis, Iran TVTO, I3Health tumor boards) — CV 2026 + CV (1).pdf.
- Backyard/olympiad/UAE/coffee/motion-design/iGEM/congress narrative — Me.txt verbatim grounding.
- Real video IDs — youtube.com/oembed for @adatadoc uploads (10 videos harvested).
- Kaggle handle — CV (1).pdf header.
