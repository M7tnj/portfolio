import { SHOWPIECE } from "./data.js";

const canvas = document.getElementById("capsid");
if (canvas) {
  const ctx = canvas.getContext("2d");
  const MODES = SHOWPIECE.modes;
  const N = 150;
  const r = (() => { let s = 424242; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; })();
  const seeds = Array.from({ length: N }, () => r() * 2 - 1);
  const SUBS = ["Ia", "Ib1", "Ib2", "Ic", "II", "III", "IV"];
  const RES = [
    ["VP1 · 81-83", "subtype-diagnostic loop"],
    ["VP1 · 145-149", "BC-loop · host attachment"],
    ["VP1 · 61-65", "Ia/Ib discriminator"],
    ["VP1 · 216", "C-terminal anchor"],
    ["VP1 · 55-58", "II/III/IV branch mark"]
  ];
  const TISSUE = [];
  for (let ty = 0; ty < 3; ty++) for (let tx = 0; tx < 4; tx++) {
    const nuc = Array.from({ length: 10 }, () => ({ x: 0.1 + r() * 0.8, y: 0.12 + r() * 0.76, s: 1.3 + r() * 2.4, c: r() > 0.5 ? "255,143,177" : "139,92,246", ph: r() * 6.28 }));
    TISSUE.push({ tx, ty, nuc, hot: tx === 2 && ty === 1 });
  }
  const KM = [[0.1, 0.16], [0.22, 0.24], [0.34, 0.31], [0.45, 0.42], [0.56, 0.5], [0.68, 0.62], [0.8, 0.74], [0.92, 0.8]];
  const KM2 = [[0.1, 0.16], [0.2, 0.36], [0.3, 0.46], [0.42, 0.6], [0.52, 0.68], [0.64, 0.78], [0.76, 0.85], [0.92, 0.9]];

  let W = 0, H = 0, dpr = 1;
  let mode = 0;
  let pts = [];
  let from = [], to = [], morphT = 1;
  const mouse = { x: -999, y: -999, active: false, down: false };
  let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let subIdx = 0;
  let heatOn = true;
  let scanX = 0;
  let hoverPent = -1;
  let raf = null;
  let autoTimer = null;
  let t0 = performance.now();

  const panel = document.getElementById("instrument-info");
  const hud = canvas.parentElement.querySelector(".mode");
  const hint = canvas.parentElement.querySelector(".hint");

  function size() {
    const rect = canvas.parentElement.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width;
    H = rect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function pentCenters() {
    const out = [];
    const cx = W / 2, cy = H / 2 - 10;
    const R = Math.min(W, H) * 0.335;
    for (let i = 0; i < 10; i++) out.push([cx + Math.cos((i / 10) * 6.283) * R, cy + Math.sin((i / 10) * 6.283) * R * 0.96]);
    for (let i = 0; i < 5; i++) out.push([cx + Math.cos((i / 5) * 6.283 + 0.63) * R * 0.52, cy + Math.sin((i / 5) * 6.283 + 0.63) * R * 0.5]);
    out.push([cx, cy]);
    return out;
  }

  function targets(m) {
    const T = [];
    const cx = W / 2, cy = H / 2 - 10;
    for (let i = 0; i < N; i++) {
      let x = cx, y = cy;
      if (m === 0) {
        const a = seeds[i] * Math.PI;
        const rr = (0.14 + Math.abs(seeds[(i * 7 + 3) % N]) * 0.36) * Math.min(W, H) * 0.92;
        x = cx + Math.cos(a) * rr * 1.3;
        y = cy + Math.sin(a) * rr;
      } else if (m === 1) {
        const t = i / N;
        const strand = i % 2;
        const ph = strand ? Math.PI : 0;
        x = W * 0.14 + t * W * 0.72;
        y = cy + Math.sin(t * Math.PI * 4.6 + ph) * H * 0.21;
        if (i % 7 === 3) y = cy;
      } else if (m === 2) {
        const p = pentCenters();
        const pc = p[i % p.length];
        const ang = (i / p.length) * 6.283;
        x = pc[0] + Math.cos(ang) * 9;
        y = pc[1] + Math.sin(ang) * 9;
      } else if (m === 3) {
        const tl = TISSUE[i % TISSUE.length];
        const nu = tl.nuc[i % tl.nuc.length];
        const tw = W / 4, th = H / 3;
        x = tl.tx * tw + nu.x * tw;
        y = tl.ty * th + nu.y * th;
      } else if (m === 4) {
        const path = i % 2 ? KM : KM2;
        const t = (i / N) * 0.94 + 0.03;
        const seg = Math.min(path.length - 2, Math.floor(t * (path.length - 1)));
        const fr = t * (path.length - 1) - seg;
        x = W * 0.12 + (path[seg][0] + (path[seg + 1][0] - path[seg][0]) * fr) * W * 0.76;
        y = H * 0.16 + (path[seg][1] + (path[seg + 1][1] - path[seg][1]) * fr) * H * 0.66;
      } else {
        const off = document.createElement("canvas");
        off.width = 300; off.height = 160;
        const o = off.getContext("2d");
        o.fillStyle = "#000";
        o.font = "900 128px 'Space Grotesk', sans-serif";
        o.textAlign = "center";
        o.textBaseline = "middle";
        o.fillText("MT", 150, 84);
        const img = o.getImageData(0, 0, 300, 160).data;
        let found = false;
        for (let tries = 0; tries < 900; tries++) {
          const px = Math.floor(r() * 300);
          const py = Math.floor(r() * 160);
          if (img[(py * 300 + px) * 4] > 120) {
            x = cx + (px - 150) / 300 * Math.min(W * 0.66, 400);
            y = cy + (py - 80) / 160 * Math.min(H * 0.5, 190);
            found = true;
            break;
          }
        }
        if (!found) { x = cx + seeds[i] * W * 0.3; y = cy + seeds[(i * 5) % N] * H * 0.3; }
      }
      T.push([x, y]);
    }
    return T;
  }

  function curTargets() { return to.length ? to : pts; }

  function ease(t) { return 1 - Math.pow(1 - t, 3); }

  function setMode(i, instant) {
    mode = ((i % MODES.length) + MODES.length) % MODES.length;
    const T = targets(mode);
    if (instant || reduced) {
      pts = T.map((p) => [p[0], p[1]]);
      from = []; to = []; morphT = 1;
    } else {
      from = curTargets().map((p) => [p[0], p[1]]);
      to = T;
      morphT = 0;
    }
    if (hud) hud.textContent = MODES[mode].label;
    if (hint) hint.textContent = mode === 2 ? "drag to disturb · ← → mode · ⏎ type a subtype" : mode === 3 ? "drag to disturb · ← → mode · ⏎ toggle heatmap" : "drag to disturb · ← → to change mode";
    renderPanel();
  }

  function renderPanel() {
    if (!panel) return;
    const m = MODES[mode];
    panel.innerHTML = `
      <div class="ins-head"><span class="ins-k">${m.label}</span><h3>${m.title}</h3><p>${m.line}</p></div>
      <div class="ins-facts">${m.facts.map((f) => `<div class="ins-fact"><b>${f[0]}</b><span>${f[1]}</span></div>`).join("")}</div>
      <a class="ins-link" href="${m.link.href}" ${m.link.href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>${m.link.text}</a>`;
  }

  function drawCapsidLinks(x, y, k) {
    const P = pentCenters();
    const col = `rgba(${SUBS.indexOf(SUBS[subIdx % SUBS.length]) >= 0 ? "45,212,191" : "139,92,246"},`;
    ctx.lineWidth = 1;
    for (let i = 0; i < P.length; i++) {
      const a = P[i];
      for (let j = i + 1; j < P.length; j++) {
        const b = P[j];
        const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
        if (d < Math.min(W, H) * 0.21) {
          ctx.strokeStyle = `rgba(148,178,255,${0.13 * k})`;
          ctx.beginPath();
          ctx.moveTo(a[0], a[1]);
          ctx.lineTo(b[0], b[1]);
          ctx.stroke();
        }
      }
    }
    const lab = SUBS[subIdx % SUBS.length];
    ctx.font = "600 12px 'JetBrains Mono', monospace";
    ctx.fillStyle = `rgba(213,200,255,${0.9 * k})`;
    ctx.fillText("typed · " + lab, P[10][0] - 34, P[10][1] - Math.min(W, H) * 0.41);
  }

  function drawSlideLayer(k, time) {
    const tw = W / 4, th = H / 3;
    TISSUE.forEach((tl) => {
      const x = tl.tx * tw, y = tl.ty * th;
      ctx.strokeStyle = `rgba(255,143,177,${0.1 * k})`;
      ctx.strokeRect(x + 2, y + 2, tw - 4, th - 4);
      tl.nuc.forEach((n) => {
        ctx.fillStyle = `rgba(${n.c},${(0.3 + n.s * 0.05) * (0.6 + Math.sin(time * 1.4 + n.ph) * 0.3) * k})`;
        ctx.beginPath();
        ctx.arc(x + n.x * tw, y + n.y * th, n.s, 0, 6.283);
        ctx.fill();
      });
    });
    scanX = (scanX + 1.6) % (W + 120);
    if (scanX < W) {
      const gl = ctx.createLinearGradient(scanX - 80, 0, scanX + 4, 0);
      gl.addColorStop(0, "rgba(45,212,191,0)");
      gl.addColorStop(1, `rgba(45,212,191,${0.16 * k})`);
      ctx.fillStyle = gl;
      ctx.fillRect(scanX - 80, 0, 84, H);
      ctx.fillStyle = `rgba(160,255,225,${0.7 * k})`;
      ctx.fillRect(scanX, 0, 1.6, H);
    }
    if (heatOn) {
      TISSUE.forEach((tl) => {
        if (!tl.hot && !(tl.tx === 1 && tl.ty === 0)) return;
        const x = tl.tx * tw + tw / 2, y = tl.ty * th + th / 2;
        const rr = Math.max(tw, th) * (tl.hot ? 0.6 : 0.38);
        const g = ctx.createRadialGradient(x, y, 0, x, y, rr);
        const col = tl.hot ? "245,90,90" : "245,184,75";
        g.addColorStop(0, `rgba(${col},${0.34 * (0.7 + Math.sin(time * 2) * 0.24) * k})`);
        g.addColorStop(1, `rgba(${col},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(x - rr, y - rr, rr * 2, rr * 2);
      });
      const hx = 2 * tw, hy = th;
      ctx.setLineDash([6, 5]);
      ctx.strokeStyle = `rgba(245,90,90,${0.9 * k})`;
      ctx.lineWidth = 1.4;
      ctx.strokeRect(hx, hy, tw - 4, th - 4);
      ctx.setLineDash([]);
      ctx.font = "500 10px 'JetBrains Mono', monospace";
      ctx.fillStyle = `rgba(255,178,178,${0.9 * k})`;
      ctx.fillText("VLM attention · 0.94", hx, hy - 6);
    }
  }

  function draw(time) {
    ctx.clearRect(0, 0, W, H);
    const palette = ["45,212,191", "139,92,246", "45,212,191", "255,143,177", "245,184,75", "233,240,250"];
    const col = palette[mode];
    const T = curTargets();
    for (let i = 0; i < N; i++) {
      let x, y;
      if (morphT < 1 && to.length) {
        const local = Math.min(1, Math.max(0, morphT * 1.7 - (i % 12) * 0.055));
        const e = ease(local);
        x = from[i][0] + (to[i][0] - from[i][0]) * e;
        y = from[i][1] + (to[i][1] - from[i][1]) * e;
        pts[i][0] = x; pts[i][1] = y;
      } else {
        x = pts[i][0]; y = pts[i][1];
      }
      if (mouse.active) {
        const dx = x - mouse.x, dy = y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 3600 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = ((60 - d) / 60) * (mouse.down ? 2.4 : 1);
          x += (dx / d) * f * 22;
          y += (dy / d) * f * 22;
        }
      }
      const s = 1.35 + (i % 5) * 0.28;
      ctx.beginPath();
      ctx.arc(x, y, s, 0, 6.283);
      ctx.fillStyle = `rgba(${col},${0.5 + (i % 7) * 0.07})`;
      ctx.fill();
    }
    const kk = reduced ? 1 : Math.min(1, morphT * 1.4);
    if (mode === 2) drawCapsidLinks(W / 2, H / 2, kk);
    if (mode === 3) drawSlideLayer(kk, time / 1000);
    if (mode === 4) {
      ctx.setLineDash([5, 6]);
      ctx.strokeStyle = `rgba(159,176,200,${0.5 * kk})`;
      ctx.beginPath();
      ctx.moveTo(W * 0.52, H * 0.12);
      ctx.lineTo(W * 0.52, H * 0.85);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = "500 10px 'JetBrains Mono', monospace";
      ctx.fillStyle = `rgba(159,176,200,${0.8 * kk})`;
      ctx.fillText("median", W * 0.52 + 8, H * 0.14);
    }
    if (mode === 2 && hoverPent >= 0) {
      const P = pentCenters();
      const pc = P[hoverPent % P.length];
      const info = RES[hoverPent % RES.length];
      ctx.fillStyle = "rgba(24,34,52,0.92)";
      ctx.beginPath();
      ctx.roundRect(pc[0] - 92, pc[1] - 44, 184, 34, 7);
      ctx.fill();
      ctx.strokeStyle = "rgba(45,212,191,0.6)";
      ctx.stroke();
      ctx.font = "500 11px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(213,244,238,0.95)";
      ctx.fillText(info[0] + " · " + info[1], pc[0] - 84, pc[1] - 22);
    }
  }

  function tick(now) {
    morphT = Math.min(1, morphT + 0.016);
    draw(now);
    raf = requestAnimationFrame(tick);
  }

  function startAuto() {
    stopAuto();
    if (reduced) return;
    autoTimer = setInterval(() => setMode(mode + 1), 9000);
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
  }

  size();
  pts = targets(0).map((p) => [p[0] + seeds[0] * 20, p[1] + seeds[1] * 20]);
  setMode(0, true);
  if (reduced) {
    setMode(2, true);
    draw(0);
  } else {
    raf = requestAnimationFrame(tick);
    startAuto();
  }

  const ro = new ResizeObserver(() => {
    size();
    setMode(mode, true);
    if (reduced) draw(0);
  });
  ro.observe(canvas.parentElement);

  canvas.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
    if (mode === 2) {
      const P = pentCenters();
      hoverPent = -1;
      P.forEach((p, i) => {
        if (Math.hypot(p[0] - mouse.x, p[1] - mouse.y) < 26) hoverPent = i;
      });
    }
    stopAuto();
  });
  canvas.addEventListener("pointerleave", () => {
    mouse.active = false;
    hoverPent = -1;
    startAuto();
  });
  canvas.addEventListener("pointerdown", (e) => {
    mouse.down = true;
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
    stopAuto();
    if (mode === 2 && hoverPent >= 0) draw(performance.now());
    if (mode === 3) { heatOn = !heatOn; draw(performance.now()); }
  });
  window.addEventListener("pointerup", () => { mouse.down = false; });
  canvas.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { setMode(mode + 1); stopAuto(); e.preventDefault(); }
    if (e.key === "ArrowLeft") { setMode(mode - 1); stopAuto(); e.preventDefault(); }
    if (e.key === "Enter" || e.key === " ") {
      if (mode === 2) { subIdx++; draw(performance.now()); }
      if (mode === 3) { heatOn = !heatOn; draw(performance.now()); }
      e.preventDefault();
    }
  });
  canvas.setAttribute("tabindex", "0");
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", "The multimodal instrument: six data formations from the research practice — cohort, sequence, capsid, slide, survival, person. Arrow keys change mode; Enter activates the mode's interaction.");

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      stopAuto();
    } else if (!reduced) {
      raf = requestAnimationFrame(tick);
      startAuto();
    }
  });
}
