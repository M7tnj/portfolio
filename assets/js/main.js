import { PROFILE, LINKS, PROJECTS, COURSE, EDUCATION, KEYWORDS, WORKING_REPOS, SKILLS, PUBLICATIONS, AWARDS, CERTS, INTERNSHIPS, LANGS, LAB } from "./data.js";
import { initViz } from "./viz.js";

const $ = (sel) => document.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html !== undefined) n.innerHTML = html;
  return n;
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function navInit() {
  const burger = $(".nav-burger");
  const links = $(".nav-links");
  if (!burger || !links) return;
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("open")) {
      links.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      burger.focus();
    }
  });
}

function revealInit() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach((n) => io.observe(n));
  };
  if (document.getElementById("film")) {
    document.addEventListener("mt:loaded", start, { once: true });
    setTimeout(start, 47500);
  } else {
    start();
  }
}

function renderStats() {
  const holder = $("#stat-strip");
  if (!holder) return;
  PROFILE.stats.forEach((s) => {
    const n = el("div", "stat");
    n.innerHTML = `<b>${esc(s.value)}</b><span>${esc(s.label)}</span><i>src · ${esc(s.source)}</i>`;
    holder.appendChild(n);
  });
}

function caseCard(p, featured) {
  const c = el("article", "card reveal");
  const tag = el("span", `case-tag t-${p.accent}`);
  tag.textContent = p.domain;
  c.appendChild(tag);
  const h = el("h3");
  h.innerHTML = `${esc(p.title)}${p.links.live ? '<span class="badge-live">LIVE</span>' : ""}`;
  c.appendChild(h);
  c.appendChild(el("p", null, esc(p.blurb)));
  if (featured) {
    const m = el("div", "metric-row");
    p.metrics.slice(0, 3).forEach((mt) => {
      m.appendChild(el("div", "metric", `<b>${esc(mt.value)}</b><span>${esc(mt.label)}</span>`));
    });
    c.appendChild(m);
  }
  const st = el("div", "stack");
  p.stack.forEach((s) => st.appendChild(el("span", null, esc(s))));
  c.appendChild(st);
  if (p.disclaimer) c.appendChild(el("div", "notice", esc(p.disclaimer)));
  const go = el("div", "go");
  go.innerHTML = `<a href="${p.links.repo}" target="_blank" rel="noopener">Repository ↗</a>${p.links.live ? `<a href="${p.links.live}" target="_blank" rel="noopener">Open the portal ↗</a>` : ""}`;
  c.appendChild(go);
  c.style.setProperty("--d", `${featured ? Math.random() * 0.18 : 0}s`);
  return c;
}

function renderFeatured() {
  const holder = $("#featured");
  if (!holder) return;
  const picks = ["ckd-portal", "bk-classifier", "kdiri"];
  picks.forEach((id) => {
    const p = PROJECTS.find((x) => x.id === id);
    if (p) holder.appendChild(caseCard(p, true));
  });
}

function renderAllProjects() {
  const holder = $("#all-projects");
  if (!holder) return;
  PROJECTS.forEach((p) => {
    const c = caseCard(p, false);
    const st = c.querySelector(".stack");
    const m = el("div", "metric-row");
    p.metrics.forEach((mt) => m.appendChild(el("div", "metric", `<b>${esc(mt.value)}</b><span>${esc(mt.label)}</span>`)));
    c.insertBefore(m, st);
    c.appendChild(el("div", "prov", esc(p.provenance) + (p.links && p.links.repo ? ` · <a href="${p.links.repo}" target="_blank" rel="noopener">${esc(p.name)} ↗</a>` : "")));
    holder.appendChild(c);
  });
  const strip = $("#working-strip");
  if (strip) {
    WORKING_REPOS.forEach((r) => {
      strip.appendChild(el("a", null, `${esc(r.name)} — ${esc(r.note)} ↗`)).setAttribute("href", r.url);
      strip.lastChild.setAttribute("target", "_blank");
      strip.lastChild.setAttribute("rel", "noopener");
    });
  }
}

function renderChannels() {
  const holders = document.querySelectorAll("[data-channels]");
  if (!holders.length) return;
  const icos = { GitHub: "i-gh", LinkedIn: "i-li", YouTube: "i-yt", Instagram: "i-ig", ORCID: "i-or", Kaggle: "i-kg" };
  holders.forEach((h) => {
    Object.values(LINKS).forEach((l) => {
      const a = el("a", "channel reveal");
      a.href = l.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML = `<span class="ico ${icos[l.label] || "i-gh"}">${esc(l.label.slice(0, 2).toUpperCase())}</span><span><b>${esc(l.label)}</b><span>${esc(l.note)}</span><span class="h">${esc(l.handle)} ↗</span></span>`;
      h.appendChild(a);
    });
  });
}

function renderSyllabus() {
  const holder = $("#syllabus");
  if (!holder) return;
  COURSE.sessions.forEach((s) => {
    const n = el("div", "sess reveal");
    n.setAttribute("tabindex", "0");
    n.innerHTML = `<div class="n">${s.n === 0 ? "COURSE INTRO" : "SESSION " + s.n}</div><div class="fa">${esc(s.fa)}</div><div class="en">${esc(s.en)}</div><div class="meta"><span>${esc(s.views)} views</span><span>${esc(s.age)}</span></div>`;
    holder.appendChild(n);
  });
  const extras = $("#extras");
  if (extras) {
    COURSE.extras.forEach((s) => {
      const n = el("div", "sess reveal");
      n.setAttribute("tabindex", "0");
      n.innerHTML = `<div class="n" style="color:var(--rose)">${esc(s.tag.toUpperCase())}</div><div class="fa">${esc(s.fa)}</div><div class="en">${esc(s.en)}</div><div class="meta"><span>${esc(s.views)} views</span><span>${esc(s.age)}</span></div>`;
      extras.appendChild(n);
    });
  }
}

function renderVideos() {
  const holder = $("#videowall");
  if (!holder) return;
  const items = [...COURSE.sessions.slice(0, 4).map((s) => ({ ...s, tag: "session " + s.n })), ...COURSE.extras];
  items.forEach((v) => {
    const wrap = el("div", "vid reveal");
    wrap.innerHTML = `
      <button class="vid-face" type="button" aria-label="Play video: ${esc(v.en)}" style="background-image:url('https://i.ytimg.com/vi/${v.vid}/hqdefault.jpg')">
        <span class="vid-play">▶</span>
        <span class="vid-tag">${esc(v.tag)}</span>
      </button>
      <div class="vid-meta">
        <div class="fa">${esc(v.fa)}</div>
        <div class="en">${esc(v.en)}</div>
        <div class="vm-row"><span>${esc(v.views)} views</span><span>${esc(v.age)}</span></div>
      </div>`;
    const btn = wrap.querySelector(".vid-face");
    btn.addEventListener("click", () => {
      const f = document.createElement("iframe");
      f.src = `https://www.youtube-nocookie.com/embed/${v.vid}?autoplay=1&rel=0`;
      f.title = v.en;
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      f.allowFullscreen = true;
      f.style.cssText = "width:100%;aspect-ratio:16/9;border:0;display:block";
      btn.replaceWith(f);
    });
    holder.appendChild(wrap);
  });
}

function renderEducation() {
  const holder = $("#edu-timeline");
  if (!holder) return;
  EDUCATION.forEach((e) => {
    const n = el("div", "tl-item reveal");
    n.innerHTML = `<div class="when">${esc(e.when)}</div><h3>${esc(e.what)}</h3><div class="org">${esc(e.org)} · ${esc(e.place)}</div>${e.extra ? `<div class="src">${esc(e.extra)}</div>` : ""}<div class="src">verified via ${esc(e.src)}</div>`;
    holder.appendChild(n);
  });
  const kw = $("#keywords");
  if (kw) KEYWORDS.forEach((k) => kw.appendChild(el("span", "kw", esc(k))));
}

function pubCard(p) {
  const c = el("div", "pub reveal");
  c.innerHTML = `
    <div class="pub-top"><span class="status st-${p.status.replace(/\s/g, "-")}">${esc(p.status)}</span><span class="pub-year">${esc(p.year)}</span><span class="pub-tag">${esc(p.tag)}</span></div>
    <h3>${esc(p.title)}</h3>
    <div class="pub-auth">${esc(p.authors)}</div>`;
  return c;
}

function renderPublications() {
  const full = $("#pubs");
  if (full) PUBLICATIONS.forEach((p) => full.appendChild(pubCard(p)));
  const teaser = $("#pub-teaser");
  if (teaser) {
    const picks = [PUBLICATIONS[0], PUBLICATIONS[4], PUBLICATIONS[7]];
    picks.forEach((p) => teaser.appendChild(pubCard(p)));
  }
}

function renderAwards() {
  const holder = $("#awards");
  if (!holder) return;
  AWARDS.forEach((a) => {
    holder.appendChild(el("div", "award reveal", `<span class="when">${esc(a.year)}</span><h3>${esc(a.title)}</h3><p>${esc(a.detail)}</p><div class="src">src · ${esc(a.src)}</div>`));
  });
}

function renderLab() {
  const mission = $("#lab-mission");
  if (mission) mission.textContent = LAB.mission;
  const holder = $("#lab-centers");
  if (!holder) {
    return;
  }
  LAB.centers.forEach((c) => holder.appendChild(el("div", "lab-center", c)));
  const m = el("div", "lab-mentors");
  LAB.mentors.forEach((x) => m.appendChild(el("span", null, esc(x.name))));
  holder.appendChild(m);
}

function renderCerts() {
  const holder = $("#certs");
  if (holder) CERTS.forEach((c) => holder.appendChild(el("div", "cert reveal", `<span class="c-yr">${esc(c.year)}</span><h3>${esc(c.title)}</h3><div class="c-org">${esc(c.org)}</div><span class="c-flag">${esc(c.flag)}</span>`)));
  const inter = $("#internships");
  if (inter) INTERNSHIPS.forEach((c) => inter.appendChild(el("div", "cert reveal", `<span class="c-yr">${esc(c.when)}</span><h3>${esc(c.what)}</h3><div class="c-org">${esc(c.org)}</div><span class="c-flag">${esc(c.place)}</span>`)));
  const langs = $("#langs");
  if (langs) LANGS.forEach((l) => langs.appendChild(el("div", "lang-row", `<b>${esc(l.name)}</b><span>${esc(l.level)}</span>`)));
}

function renderSkills() {
  const holder = $("#skill-map");
  if (!holder) return;
  SKILLS.forEach((s, i) => {
    const row = el("div", null);
    row.style.cssText = "margin-bottom:16px";
    row.innerHTML = `<div style="display:flex;justify-content:space-between;font-size:13.5px;margin-bottom:7px"><span style="color:var(--ink)">${esc(s.area)}</span><span style="font-family:var(--mono);font-size:11px;color:var(--dim)">${esc(s.evidence)}</span></div><div style="height:8px;border-radius:99px;background:rgba(148,178,255,.09);overflow:hidden"><div style="height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,var(--teal),var(--violet));transition:width 1s cubic-bezier(.2,.7,.2,1) ${i * 0.12}s"></div></div>`;
    holder.appendChild(row);
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          SKILLS.forEach((s, i) => {
            holder.children[i].lastElementChild.firstElementChild.style.width = `${Math.round(s.level * 100)}%`;
          });
          io.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  io.observe(holder);
}

function renderHeadlineChips() {
  const holder = $("#cred-chips");
  if (!holder) return;
  holder.innerHTML = `<span class="chip c-teal">LinkedIn headline · AI in Medicine | Digital Pathology</span><span class="chip c-amber">ORCID ${esc(PROFILE.orcid)}</span><span class="chip c-violet">${esc(PROFILE.location)}</span>`;
}

function storyInit() {
  const chapters = document.querySelectorAll(".chapter");
  if (!chapters.length) return;
  chapters.forEach((c, i) => c.id = "ch-" + (i + 1));
  const fill = document.getElementById("rail-fill");
  if (!fill) return;
  const update = () => {
    const box = document.querySelector(".chapters");
    if (!box) return;
    const r = box.getBoundingClientRect();
    const total = r.height - window.innerHeight * 0.4;
    const passed = Math.min(Math.max(-r.top + window.innerHeight * 0.55, 0), Math.max(total, 1));
    fill.style.width = `${(passed / Math.max(total, 1)) * 100}%`;
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

function footerInit() {
  const y = $("#yr");
  if (y) y.textContent = String(new Date().getFullYear());
  const human = $("#human-line");
  if (human) human.textContent = PROFILE.human;
}

navInit();
renderStats();
renderFeatured();
renderAllProjects();
renderChannels();
renderSyllabus();
renderVideos();
renderEducation();
renderPublications();
renderAwards();
renderLab();
renderCerts();
renderSkills();
renderHeadlineChips();
storyInit();
footerInit();
initViz();
revealInit();
