import { VIZ, COURSE } from "./data.js";

const ACC = { teal: "#2dd4bf", violet: "#8b5cf6", amber: "#f5b84b", rose: "#fb7185" };

const tip = document.createElement("div");
tip.className = "tip";
tip.setAttribute("role", "tooltip");
document.body.appendChild(tip);

function showTip(target, html) {
  tip.innerHTML = html;
  tip.classList.add("on");
  const r = target.getBoundingClientRect();
  const tw = tip.offsetWidth;
  let x = r.left + r.width / 2 - tw / 2;
  x = Math.max(12, Math.min(x, window.innerWidth - tw - 12));
  let y = r.top - tip.offsetHeight - 10;
  if (y < 60) y = r.bottom + 10;
  tip.style.left = `${x}px`;
  tip.style.top = `${y}px`;
}

function hideTip() {
  tip.classList.remove("on");
}

function bindTip(node, htmlFn) {
  node.addEventListener("pointerenter", () => showTip(node, htmlFn()));
  node.addEventListener("pointerleave", hideTip);
  node.addEventListener("focus", () => showTip(node, htmlFn()));
  node.addEventListener("blur", hideTip);
}

function observeArm(svg) {
  const box = svg.closest(".viz");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          box.classList.add("armed");
          io.disconnect();
        }
      });
    },
    { threshold: 0.18 }
  );
  io.observe(box);
}

function buildLadder(holder, data) {
  if (!holder) return;
  const W = 660;
  const rowH = 62;
  const H = data.length * rowH + 14;
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Model accuracy ladder for the BK virus subtype classifier");
  const barX = 240;
  const barW = W - barX - 96;
  data.forEach((d, i) => {
    const g = document.createElementNS(NS, "g");
    g.setAttribute("class", "ladder-row");
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "listitem");
    g.style.setProperty("--i", String(i));
    const y = i * rowH + 8;
    const label = document.createElementNS(NS, "text");
    label.setAttribute("x", barX - 14);
    label.setAttribute("y", y + 22);
    label.setAttribute("text-anchor", "end");
    label.setAttribute("fill", "#e9f0fa");
    label.setAttribute("font-size", "14");
    label.setAttribute("font-family", "Space Grotesk, Inter, sans-serif");
    label.textContent = d.model;
    g.appendChild(label);
    const ver = document.createElementNS(NS, "text");
    ver.setAttribute("x", barX - 14);
    ver.setAttribute("y", y + 40);
    ver.setAttribute("text-anchor", "end");
    ver.setAttribute("fill", "#9fb0c8");
    ver.setAttribute("font-size", "11");
    ver.setAttribute("font-family", "JetBrains Mono, monospace");
    ver.textContent = d.version;
    g.appendChild(ver);
    const track = document.createElementNS(NS, "rect");
    track.setAttribute("class", "bar-track");
    track.setAttribute("x", barX);
    track.setAttribute("y", y + 10);
    track.setAttribute("width", barW);
    track.setAttribute("height", 26);
    track.setAttribute("rx", 8);
    g.appendChild(track);
    const fill = document.createElementNS(NS, "rect");
    fill.setAttribute("class", "bar-fill");
    fill.setAttribute("x", barX);
    fill.setAttribute("y", y + 10);
    fill.setAttribute("width", barW * d.acc);
    fill.setAttribute("height", 26);
    fill.setAttribute("rx", 8);
    fill.setAttribute("fill", d.version.includes("winner") ? ACC.violet : ACC.teal);
    fill.setAttribute("opacity", d.version.includes("winner") ? "0.92" : "0.55");
    g.appendChild(fill);
    const val = document.createElementNS(NS, "text");
    val.setAttribute("x", barX + barW * d.acc + 10);
    val.setAttribute("y", y + 28);
    val.setAttribute("fill", d.version.includes("winner") ? ACC.violet : ACC.teal);
    val.setAttribute("font-size", "14");
    val.setAttribute("font-family", "JetBrains Mono, monospace");
    val.textContent = d.acc.toFixed(3);
    g.appendChild(val);
    bindTip(g, () => `<b>${d.model}</b> · ${d.version}<small>${d.note} · CV balanced accuracy ${d.acc.toFixed(3)} — BK-Virus-Subtype-Classification README</small>`);
    svg.appendChild(g);
  });
  holder.appendChild(svg);
  observeArm(svg);
}

function buildKidney(holder, data) {
  if (!holder) return;
  const W = 660;
  const H = 300;
  const pad = { t: 26, b: 64, l: 20, r: 20 };
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Real numbers from the kidney project cluster");
  const n = data.length;
  const slot = (W - pad.l - pad.r) / n;
  const max = Math.max(...data.map((d) => d.value));
  const baseY = H - pad.b;
  const maxH = baseY - pad.t;
  data.forEach((d, i) => {
    const h = Math.sqrt(d.value / max) * maxH;
    const bw = Math.min(64, slot * 0.6);
    const x = pad.l + slot * i + (slot - bw) / 2;
    const g = document.createElementNS(NS, "g");
    g.setAttribute("class", "kidney-col");
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "listitem");
    const val = document.createElementNS(NS, "text");
    val.setAttribute("x", x + bw / 2);
    val.setAttribute("y", baseY - h - 8);
    val.setAttribute("text-anchor", "middle");
    val.setAttribute("fill", ACC[d.accent]);
    val.setAttribute("font-size", "14");
    val.setAttribute("font-family", "JetBrains Mono, monospace");
    val.textContent = d.value.toLocaleString("en-US");
    g.appendChild(val);
    const track = document.createElementNS(NS, "rect");
    track.setAttribute("class", "bar-track");
    track.setAttribute("x", x);
    track.setAttribute("y", pad.t);
    track.setAttribute("width", bw);
    track.setAttribute("height", maxH);
    track.setAttribute("rx", 8);
    g.appendChild(track);
    const fill = document.createElementNS(NS, "rect");
    fill.setAttribute("class", "bar-fill vert");
    fill.setAttribute("x", x);
    fill.setAttribute("y", baseY - h);
    fill.setAttribute("width", bw);
    fill.setAttribute("height", h);
    fill.setAttribute("rx", 8);
    fill.setAttribute("fill", ACC[d.accent]);
    fill.setAttribute("opacity", "0.85");
    g.appendChild(fill);
    const lab = document.createElementNS(NS, "text");
    lab.setAttribute("x", x + bw / 2);
    lab.setAttribute("y", baseY + 22);
    lab.setAttribute("text-anchor", "middle");
    lab.setAttribute("fill", "#e9f0fa");
    lab.setAttribute("font-size", "12.5");
    lab.setAttribute("font-family", "Space Grotesk, Inter, sans-serif");
    lab.textContent = d.label;
    g.appendChild(lab);
    const sub = document.createElementNS(NS, "text");
    sub.setAttribute("x", x + bw / 2);
    sub.setAttribute("y", baseY + 42);
    sub.setAttribute("text-anchor", "middle");
    sub.setAttribute("fill", "#9fb0c8");
    sub.setAttribute("font-size", "10");
    sub.setAttribute("font-family", "JetBrains Mono, monospace");
    sub.textContent = d.sub;
    g.appendChild(sub);
    bindTip(g, () => `<b>${d.value.toLocaleString("en-US")} ${d.label}</b><small>${d.sub} — source-tagged in DESIGN_NOTES.md</small>`);
    svg.appendChild(g);
  });
  holder.appendChild(svg);
  observeArm(svg);
}

function buildSyllabus(holder, course) {
  if (!holder) return;
  const NS = "http://www.w3.org/2000/svg";
  const items = course.sessions.map((s) => ({ ...s, tag: s.n === 0 ? "intro" : `s${s.n}` }));
  const extras = course.extras.map((e) => ({ ...e, n: 9.5, tag: e.tag }));
  const all = items.concat(extras);
  const W = 660;
  const H = 190;
  const padX = 34;
  const maxViews = Math.max(...all.map((d) => d.views));
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Course session bubbles sized by view counts");
  const line = document.createElementNS(NS, "line");
  line.setAttribute("x1", padX - 10);
  line.setAttribute("x2", W - padX + 10);
  line.setAttribute("y1", H / 2 + 4);
  line.setAttribute("y2", H / 2 + 4);
  line.setAttribute("stroke", "rgba(148,178,255,.3)");
  line.setAttribute("stroke-dasharray", "3 6");
  svg.appendChild(line);
  all.forEach((d, i) => {
    const x = padX + ((W - padX * 2) / (all.length - 1)) * i;
    const r = 7 + Math.sqrt(d.views / maxViews) * 21;
    const isExtra = d.tag === "project" || d.tag === "explainer";
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", H / 2 + 4);
    c.setAttribute("r", 0);
    c.setAttribute("fill", isExtra ? "rgba(251,113,133,.2)" : "rgba(139,92,246,.2)");
    c.setAttribute("stroke", isExtra ? ACC.rose : ACC.violet);
    c.setAttribute("stroke-width", "1.6");
    c.style.transition = `r .8s cubic-bezier(.3,1.3,.4,1) ${i * 0.07}s`;
    const g = document.createElementNS(NS, "g");
    g.setAttribute("class", "sess-bubble");
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "listitem");
    g.appendChild(c);
    const t = document.createElementNS(NS, "text");
    t.setAttribute("x", x);
    t.setAttribute("y", H / 2 + 8);
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("fill", isExtra ? ACC.rose : "#b79df8");
    t.setAttribute("font-size", "10.5");
    t.setAttribute("font-family", "JetBrains Mono, monospace");
    t.setAttribute("pointer-events", "none");
    t.textContent = d.tag;
    g.appendChild(t);
    const v = document.createElementNS(NS, "text");
    v.setAttribute("x", x);
    v.setAttribute("y", H / 2 - 4 - r - 6);
    v.setAttribute("text-anchor", "middle");
    v.setAttribute("fill", "#9fb0c8");
    v.setAttribute("font-size", "10");
    v.setAttribute("font-family", "JetBrains Mono, monospace");
    v.setAttribute("pointer-events", "none");
    v.textContent = `${d.views}`;
    g.appendChild(v);
    bindTip(g, () => `<b>${d.tag}</b> · ${d.views} views<small><span dir="rtl">${d.fa}</span><br>${d.en}</small>`);
    svg.appendChild(g);
  });
  holder.appendChild(svg);
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          svg.querySelectorAll("circle").forEach((c, i) => {
            c.setAttribute("r", String(7 + Math.sqrt(all[i].views / maxViews) * 21));
          });
          io.disconnect();
        }
      });
    },
    { threshold: 0.35 }
  );
  io.observe(svg);
}

export function initViz() {
  buildLadder(document.getElementById("viz-ladder"), VIZ.ladder);
  buildKidney(document.getElementById("viz-kidney"), VIZ.kidney);
  buildSyllabus(document.getElementById("viz-syllabus"), COURSE);
}
