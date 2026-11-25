# Mostafa Tamiminezhad — Portfolio (static, GitHub Pages ready)

A fully static, dependency-free portfolio for **Mostafa Tamiminezhad** — computational biologist,
AI-in-medicine researcher, digital pathology enthusiast and Persian-language bioinformatics lecturer
([@adatadoc](https://www.youtube.com/@adatadoc)).

Built as an *instrument, not a template*: every number on the site is source-tagged to a real
repository README, the ORCID record, or the YouTube channel — see `DESIGN_NOTES.md` for the full
evidence map.

## What's inside

| Path | Purpose |
|---|---|
| `index.html` | Entry page — skippable ~46 s cinematic intro film in seven scenes (once per visit, Esc to skip), the Multimodal Instrument showpiece, live metric strip, featured work, classifier-accuracy visualization, story teaser, publication teaser |
| `story.html` | The full narrative in eight chapters — backyard curiosity → medicine & bankruptcy → coffee & motion design → pandemic rewiring → first research question → teaching → Shiraz years → horizon — each with an animated SVG scene |
| `projects.html` | All documented repositories as case files with metric rows and provenance, plus "The kidney files" visualization |
| `teaching.html` | The aDataDoc syllabus (9 sessions, Persian titles + English glosses), view-count bubbles, a click-to-load video wall of the real lectures, standalone videos |
| `credentials.html` | 8 publication records with status chips, awards & honors, 14 certifications, internships, languages, lab affiliations, ORCID-verified education timeline, evidence-backed skill map, contact |
| `404.html` | Branded not-found page |
| `.nojekyll` | Tells GitHub Pages to serve files as-is (no Jekyll processing) |
| `assets/css/style.css` | Design system |
| `assets/js/data.js` | **All personal facts live here** — edit this one file to update any fact without touching design code |
| `assets/js/main.js` | Navigation, reveals, page rendering (publications, awards, certifications, video facades, story rail) |
| `assets/js/viz.js` | The three data visualizations (accuracy ladder, kidney metrics, syllabus bubbles) |
| `assets/js/showpiece.js` | The Multimodal Instrument — six data formations with real facts, clickable VP1 pentamers, Enter-key heatmap toggle, per-mode info panel |
| `assets/js/intro.js` | The intro film with skip + Escape + reduced-motion fallback |
| `assets/images/` | Favicon and social preview image |
| `DESIGN_NOTES.md` | Creative direction memo, concept decision record, content mapping, open gaps |

## Local preview

Any static server works. From this folder:

```bash
python3 -m http.server 8080
```

Open <http://localhost:8080>. To rehearse the sub-path deployment, nest the folder:

```bash
mkdir -p _test/portfolio && cp -r . _test/portfolio && cd _test && python3 -m http.server 8080
```

Then check <http://localhost:8080/portfolio/> — all links and assets are relative, so everything must still work.

## Deploy to GitHub Pages (step by step)

1. Create a new repository on GitHub (for example `portfolio`). Keep it **public** so Pages serving is free.
2. Upload **the contents of this folder** to the repository root — `index.html` must sit at the
   repository root, not one level down. Either:
   - drag-and-drop the files in the GitHub web uploader, or
   - from this folder: `git init && git add -A && git commit -m "Portfolio" && git remote add origin https://github.com/M7tnj/<repo>.git && git push -u origin main`
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, set **Source = Deploy from a branch**.
5. Choose branch **main** (or `master`, whichever exists) and folder **/ (root)**, then **Save**.
6. Wait 1–3 minutes for the first build. The site appears at
   `https://m7tnj.github.io/<repo>/` (shown on the Pages settings screen as a green check).
7. Hard-refresh once (Ctrl/Cmd+Shift+R) if styles look stale — Pages caches briefly.
8. Future updates: push (or upload) changed files; Pages redeploys automatically.

Notes:
- All asset/link paths are **relative** (`assets/...`, `index.html`), so the site works at
  `github.io/<repo>/` sub-paths, inside project pages, and locally with zero changes.
- Do not enable Jekyll: `.nojekyll` is already present at the root.
- The intro film plays once per browser session; `prefers-reduced-motion` users never see it.
- YouTube players load only on click, via `youtube-nocookie.com` (privacy-enhanced mode).
- Navigation between pages is ordinary links — no scroll-jacking; each page scrolls normally.

## Updating content

Open `assets/js/data.js` — the single source of truth for profile facts, projects, course sessions,
education, channels and visualization numbers. Add a fact, save, push: done. No build step exists,
so nothing else needs to change.

## Integrity rules respected by this build

- No fabricated biography, dates or numbers; gaps are documented in `DESIGN_NOTES.md` §4.
- The CKD portal card carries its own disclaimer ("research demonstrator — not for clinical
  decision-making"), as the original project does.
- No copyrighted third-party assets; all artwork is original SVG/CSS/Canvas.

## License

Site code: MIT. Personal content, text and data: © Mostafa Tamiminezhad.
