const film = document.getElementById("film");
if (film) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const seen = sessionStorage.getItem("mt_intro_seen");

  function finish() {
    sessionStorage.setItem("mt_intro_seen", "1");
    film.classList.add("gone");
    document.body.classList.remove("locked");
    document.body.classList.add("loaded");
    document.dispatchEvent(new CustomEvent("mt:loaded"));
    setTimeout(() => film.remove(), 1100);
  }

  if (reduced || seen) {
    film.remove();
    document.body.classList.add("loaded");
    document.dispatchEvent(new CustomEvent("mt:loaded"));
  } else {
    document.body.classList.add("locked");
    const canvas = document.getElementById("film-canvas");
    const ctx = canvas.getContext("2d");
    const caps = Array.from(film.querySelectorAll(".film-cap"));
    const prog = document.getElementById("film-prog");
    let W = 0, H = 0, dpr = 1;

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    window.addEventListener("resize", size);

    const TAU = Math.PI * 2;
    const clamp01 = (x) => Math.min(1, Math.max(0, x));
    const outCubic = (x) => 1 - Math.pow(1 - x, 3);
    const inOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    const outBack = (x) => 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2);
    const fadeIn = (x) => clamp01(x * 2.6);
    const fadeOut = (x) => clamp01((1 - x) * 2.6);

    function rng(seed) {
      let s = seed >>> 0;
      return () => {
        s = (s * 1664525 + 1013904223) >>> 0;
        return s / 4294967296;
      };
    }

    const branches = [];
    {
      const r = rng(90210);
      const stack = [{ x: 0.5, y: 1.02, a: -Math.PI / 2, len: 0.22, w: 5, depth: 0 }];
      while (stack.length && branches.length < 130) {
        const b = stack.pop();
        const x2 = b.x + Math.cos(b.a) * b.len;
        const y2 = b.y + Math.sin(b.a) * b.len * 0.62;
        branches.push({ x1: b.x, y1: b.y, x2, y2, w: Math.max(1, b.w), depth: b.depth });
        if (b.depth < 4) {
          const n = r() > 0.72 ? 3 : 2;
          for (let i = 0; i < n; i++) {
            stack.push({
              x: x2, y: y2,
              a: b.a + (i - (n - 1) / 2) * (0.42 + r() * 0.34),
              len: b.len * (0.62 + r() * 0.16),
              w: b.w * 0.62,
              depth: b.depth + 1
            });
          }
        }
      }
    }
    const flies = Array.from({ length: 14 }, (_, i) => {
      const r = rng(1000 + i * 37);
      return { x: 0.1 + r() * 0.8, y: 0.25 + r() * 0.6, ph: r() * TAU, sp: 0.5 + r() };
    });

    const kf = Array.from({ length: 7 }, (_, i) => ({ x: 0.16 + i * 0.11, y: 0.5 + Math.sin(i * 2.3) * 0.16 }));
    const playX = { v: 0 };

    const worlds = Array.from({ length: 84 }, (_, i) => {
      const r = rng(7000 + i * 53);
      const side = i % 2;
      return {
        x0: side ? 0.94 + r() * 0.14 : -0.1 - r() * 0.1,
        y0: 0.2 + r() * 0.6,
        x1: 0.34 + r() * 0.32,
        y1: 0.3 + r() * 0.42,
        side, ph: r() * TAU, s: 1 + r() * 2
      };
    });

    const tiles = [];
    for (let ty = 0; ty < 3; ty++) {
      for (let tx = 0; tx < 4; tx++) {
        const r = rng(3000 + ty * 40 + tx);
        const nuc = Array.from({ length: 9 + Math.floor(r() * 8) }, () => ({
          x: 0.12 + r() * 0.76, y: 0.14 + r() * 0.72, s: 1.4 + r() * 2.6,
          c: r() > 0.5 ? "255,143,177" : "139,92,246", ph: r() * TAU
        }));
        tiles.push({ tx, ty, nuc, hot: tx === 2 && ty === 1, warm: tx === 1 && ty === 0 });
      }
    }

    const letters = "ACGT";
    const rain = Array.from({ length: 26 }, (_, i) => {
      const r = rng(5000 + i * 29);
      return { x: 0.04 + (i / 26) * 0.92, v: 0.28 + r() * 0.4, txt: Array.from({ length: 14 }, () => letters[Math.floor(r() * 4)]).join("") };
    });
    const KMERS = ["ATG·GCC", "CGT·AAC", "TTA·GGG", "AAG·CTG", "GCA·TTA", "TTC·AGG"];
    const pent = [];
    {
      const layout = [];
      for (let i = 0; i < 10; i++) layout.push({ a: (i / 10) * TAU, R: 0.30, n: 5 });
      for (let i = 0; i < 5; i++) layout.push({ a: (i / 5) * TAU + 0.314, R: 0.155, n: 5 });
      layout.push({ a: 0, R: 0, n: 5 });
      const r = rng(8899);
      layout.forEach((L, li) => {
        for (let k = 0; k < L.n; k++) {
          pent.push({
            a: L.a + (k / 5) * TAU, R: L.R, off: 0.028,
            sx: (r() - 0.5) * 2.4, sy: (r() - 0.5) * 2.2, d: li * 0.055 + k * 0.012, li
          });
        }
      });
    }
    const SUBS = ["Ia", "Ib1", "Ib2", "Ic"];

    const kmPts = [];
    {
      const mk = (start, drop, col) => {
        const pts = [];
        let x = 0.1, y = 0.16;
        const steps = [0, 0.09, 0.2, 0.3, 0.42, 0.5, 0.63, 0.72, 0.85, 1.0];
        steps.forEach((sx, i) => {
          const sy = 0.16 + (0.62 * (1 - Math.pow(1 - (i + 1) / steps.length, 1.6))) * drop;
          pts.push([0.1 + sx * 0.8 * (0.9 + col * 0.06), y]);
          y = sy;
        });
        return pts;
      };
      kmPts.push({ pts: mk(0, 1, 0), col: "45,212,191", label: "arm A · on care" });
      kmPts.push({ pts: mk(0, 1.35, 1), col: "245,184,75", label: "arm B · standard" });
    }

    function grain() {
      ctx.save();
      for (let i = 0; i < 70; i++) {
        ctx.fillStyle = `rgba(255,255,255,${0.012 + Math.random() * 0.022})`;
        ctx.fillRect(Math.random() * W, Math.random() * H, 1.4, 1.4);
      }
      ctx.restore();
    }

    function vignette(alpha) {
      const g = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.34, W / 2, H / 2, Math.max(W, H) * 0.75);
      g.addColorStop(0, "rgba(7,11,20,0)");
      g.addColorStop(1, `rgba(2,4,9,${alpha})`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    const S = [6.0, 6.0, 6.6, 7.6, 6.8, 6.2, 6.6];
    const TOTAL = S.reduce((a, b) => a + b, 0);

    function drawBranches(p) {
      const a = fadeOut(p);
      const n = Math.floor(branches.length * outCubic(clamp01(p * 1.15)));
      for (let i = 0; i < n; i++) {
        const b = branches[i];
        const dep = 1 - b.depth * 0.14;
        ctx.strokeStyle = `rgba(64,220,190,${(0.2 + b.depth * 0.11) * a})`;
        ctx.lineWidth = b.w * dep;
        ctx.beginPath();
        ctx.moveTo(b.x1 * W, b.y1 * H);
        ctx.lineTo(b.x2 * W, b.y2 * H);
        ctx.stroke();
      }
      flies.forEach((f) => {
        const t = p * 12 + f.ph;
        const x = (f.x + Math.sin(t * f.sp) * 0.03) * W;
        const y = (f.y + Math.cos(t * 0.8 * f.sp) * 0.04) * H;
        const glow = 0.35 + Math.sin(t * 2.1) * 0.3;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
        g.addColorStop(0, `rgba(160,255,225,${0.75 * glow * a})`);
        g.addColorStop(1, "rgba(160,255,225,0)");
        ctx.fillStyle = g;
        ctx.fillRect(x - 9, y - 9, 18, 18);
      });
    }

    function drawFrames(p) {
      const a = fadeIn(p) * fadeOut(p);
      const cx = W / 2, cy = H / 2;
      const cw = Math.min(W * 0.6, 640), ch = Math.min(H * 0.42, 300);
      ctx.strokeStyle = `rgba(148,178,255,${0.22 * a})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(cx - cw / 2, cy - ch / 2, cw, ch);
      kf.forEach((k, i) => {
        const kk = clamp01((p - 0.08 - i * 0.045) * 6);
        if (kk <= 0) return;
        const e = outBack(kk);
        const x = cx - cw / 2 + k.x * cw;
        const y = cy - ch / 2 + (0.5 + (k.y - 0.5) * Math.cos((1 - e) * 1.4)) * ch * 0.9;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = `rgba(139,92,246,${0.9 * a})`;
        ctx.fillRect(-5, -5, 10, 10);
        ctx.restore();
        if (i > 0) {
          const px = cx - cw / 2 + kf[i - 1].x * cw;
          const py = cy - ch / 2 + kf[i - 1].y * ch * 0.9;
          ctx.strokeStyle = `rgba(139,92,246,${0.4 * a})`;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.bezierCurveTo((px + x) / 2, py, (px + x) / 2, y, x, y);
          ctx.stroke();
          const hx = (px + x) / 2;
          ctx.fillStyle = `rgba(160,255,225,${0.8 * a})`;
          ctx.beginPath();
          ctx.arc(hx, y, 3.4, 0, TAU);
          ctx.fill();
        }
      });
      const phx = cx - cw / 2 + inOut(clamp01(p * 1.06)) * cw;
      ctx.strokeStyle = `rgba(245,184,75,${0.85 * a})`;
      ctx.beginPath();
      ctx.moveTo(phx, cy - ch / 2 - 12);
      ctx.lineTo(phx, cy + ch / 2 + 12);
      ctx.stroke();
      ctx.fillStyle = `rgba(245,184,75,${0.9 * a})`;
      ctx.beginPath();
      ctx.moveTo(phx - 5, cy - ch / 2 - 12);
      ctx.lineTo(phx + 5, cy - ch / 2 - 12);
      ctx.lineTo(phx, cy - ch / 2 - 4);
      ctx.closePath();
      ctx.fill();
      ctx.font = "500 11px 'JetBrains Mono', monospace";
      ctx.fillStyle = `rgba(159,176,200,${0.75 * a})`;
      ctx.fillText("comp 01 · motion.aep", cx - cw / 2, cy + ch / 2 + 24);
    }

    function drawWorlds(p) {
      const a = fadeIn(p) * fadeOut(p);
      const t = inOut(p);
      worlds.forEach((w) => {
        const x = (w.x0 + (w.x1 - w.x0) * t + Math.sin(p * 9 + w.ph) * 0.008) * W;
        const y = (w.y0 + (w.y1 - w.y0) * t + Math.cos(p * 7 + w.ph) * 0.01) * H;
        const c = w.side ? "139,92,246" : "64,220,190";
        ctx.fillStyle = `rgba(${c},${(0.35 + w.s * 0.18) * a})`;
        ctx.beginPath();
        ctx.arc(x, y, w.s * 1.9, 0, TAU);
        ctx.fill();
      });
      if (p > 0.62) {
        const la = clamp01((p - 0.62) * 2.6) * a;
        ctx.lineWidth = 0.7;
        for (let i = 0; i < worlds.length - 2; i += 3) {
          const w1 = worlds[i], w2 = worlds[i + 2];
          const x1 = (w1.x0 + (w1.x1 - w1.x0) * t) * W;
          const y1 = (w1.y0 + (w1.y1 - w1.y0) * t) * H;
          const x2 = (w2.x0 + (w2.x1 - w2.x0) * t) * W;
          const y2 = (w2.y0 + (w2.y1 - w2.y0) * t) * H;
          if (Math.abs(x1 - x2) < W * 0.22) {
            ctx.strokeStyle = `rgba(148,178,255,${0.14 * la})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }
    }

    function drawLens(p) {
      const a = fadeIn(p) * fadeOut(p);
      const gx = W * 0.5, gy = H * 0.5;
      const tw = Math.min(W * 0.84, 760), th = Math.min(H * 0.5, 400);
      const tlw = tw / 4, tlh = th / 3;
      tiles.forEach((tl) => {
        const x = gx - tw / 2 + tl.tx * tlw;
        const y = gy - th / 2 + tl.ty * tlh;
        const ta = clamp01((p - 0.06 - (tl.tx + tl.ty) * 0.045) * 3) * a;
        ctx.fillStyle = `rgba(244,227,232,${0.1 * ta})`;
        ctx.beginPath();
        ctx.roundRect(x + 3, y + 3, tlw - 6, tlh - 6, 7);
        ctx.fill();
        ctx.strokeStyle = `rgba(255,143,177,${0.14 * ta})`;
        ctx.stroke();
        tl.nuc.forEach((n) => {
          const na = clamp01((p - 0.1 - (tl.tx + tl.ty) * 0.05) * 2.4) * a;
          const pulse = 0.6 + Math.sin(p * 8 + n.ph) * 0.25;
          ctx.fillStyle = `rgba(${n.c},${(0.32 + n.s * 0.06) * pulse * na})`;
          ctx.beginPath();
          ctx.arc(x + n.x * tlw, y + n.y * tlh, n.s, 0, TAU);
          ctx.fill();
        });
      });
      const scan = inOut(clamp01((p - 0.16) / 0.42));
      if (scan > 0 && scan < 1) {
        const sx = gx - tw / 2 + scan * tw;
        const gl = ctx.createLinearGradient(sx - 70, 0, sx + 6, 0);
        gl.addColorStop(0, "rgba(45,212,191,0)");
        gl.addColorStop(1, "rgba(45,212,191,0.2)");
        ctx.fillStyle = gl;
        ctx.fillRect(sx - 70, gy - th / 2, 76, th);
        ctx.fillStyle = "rgba(160,255,225,0.85)";
        ctx.fillRect(sx, gy - th / 2, 1.6, th);
      }
      if (p > 0.58) {
        const ha = clamp01((p - 0.58) * 2.2) * a;
        tiles.forEach((tl) => {
          if (!tl.hot && !tl.warm) return;
          const x = gx - tw / 2 + tl.tx * tlw;
          const y = gy - th / 2 + tl.ty * tlh;
          const cx0 = x + tlw / 2, cy0 = y + tlh / 2;
          const rr = Math.max(tlw, tlh) * (tl.hot ? 0.62 : 0.4);
          const g = ctx.createRadialGradient(cx0, cy0, 0, cx0, cy0, rr);
          const col = tl.hot ? "245,90,90" : "245,184,75";
          const pulse = 0.7 + Math.sin(p * 9) * 0.28;
          g.addColorStop(0, `rgba(${col},${0.4 * pulse * ha})`);
          g.addColorStop(1, `rgba(${col},0)`);
          ctx.fillStyle = g;
          ctx.fillRect(cx0 - rr, cy0 - rr, rr * 2, rr * 2);
        });
        const hx = gx - tw / 2 + 2 * tlw, hy = gy - th / 2 + 1 * tlh;
        const bw = clamp01((p - 0.7) * 3);
        ctx.strokeStyle = `rgba(245,90,90,${0.95 * bw})`;
        ctx.lineWidth = 1.6;
        ctx.setLineDash([6, 5]);
        ctx.strokeRect(hx, hy, tlw - 6, tlh - 6);
        ctx.setLineDash([]);
        ctx.font = "500 11px 'JetBrains Mono', monospace";
        ctx.fillStyle = `rgba(255,178,178,${0.95 * bw})`;
        ctx.fillText("VLM · BK-suspect · attn 0.94", hx, hy - 8);
      }
    }

    function drawSubtype(p) {
      const a = fadeIn(p) * fadeOut(p);
      if (p < 0.3) {
        const ra = clamp01(p * 3) * (1 - clamp01((p - 0.24) * 5));
        rain.forEach((r) => {
          ctx.font = "500 11px 'JetBrains Mono', monospace";
          for (let k = 0; k < 14; k++) {
            const yy = ((p * r.v * 3 + k / 14) % 1) * H;
            ctx.fillStyle = `rgba(64,220,190,${(0.42 - k * 0.02) * ra * a})`;
            ctx.fillText(r.txt[k], r.x * W, yy);
          }
        });
      }
      if (p >= 0.26 && p < 0.6) {
        const ka = clamp01((p - 0.26) * 4) * (1 - clamp01((p - 0.5) * 5));
        KMERS.forEach((k, i) => {
          const ke = outBack(clamp01((p - 0.26 - i * 0.035) * 5));
          const cw = 92, chh = 30;
          const x = W / 2 + ((i % 3) - 1) * (cw + 14) - cw / 2;
          const y = H / 2 - 52 + Math.floor(i / 3) * (chh + 12);
          ctx.globalAlpha = ka * a;
          ctx.fillStyle = `rgba(24,34,52,${0.9 * ke})`;
          ctx.beginPath();
          ctx.roundRect(x, y, cw * ke, chh, 8);
          ctx.fill();
          ctx.strokeStyle = `rgba(139,92,246,${0.5 * ke})`;
          ctx.stroke();
          ctx.fillStyle = `rgba(213,200,255,${ke})`;
          ctx.font = "500 12px 'JetBrains Mono', monospace";
          ctx.fillText(k, x + 14, y + 20);
          ctx.globalAlpha = 1;
        });
      }
      if (p > 0.52) {
        const ca = clamp01((p - 0.52) * 3.4) * a;
        const R = Math.min(W, H) * 0.31;
        const cx = W / 2, cy = H / 2;
        pent.forEach((d) => {
          const e = outBack(clamp01((p - 0.52 - d.d) * 2.2));
          if (e <= 0) return;
          const rr = d.R * R + d.off * R * Math.sin(p * 10 + d.li * 2);
          const tx = cx + Math.cos(d.a) * rr;
          const ty = cy + Math.sin(d.a) * rr * 0.94;
          const x = (cx + d.sx * W * 0.55) + (tx - (cx + d.sx * W * 0.55)) * e;
          const y = (cy + d.sy * H * 0.55) + (ty - (cy + d.sy * H * 0.55)) * e;
          ctx.fillStyle = `rgba(64,220,190,${0.6 * ca})`;
          ctx.beginPath();
          ctx.arc(x, y, 2.6, 0, TAU);
          ctx.fill();
        });
        const la = clamp01((p - 0.8) * 3);
        ctx.font = "600 13px 'JetBrains Mono', monospace";
        SUBS.forEach((s, i) => {
          const ang = -0.9 + i * 0.6 + p * 0.22;
          const x = cx + Math.cos(ang) * R * 1.22;
          const y = cy + Math.sin(ang) * R * 1.14;
          ctx.fillStyle = `rgba(213,200,255,${0.9 * la * a})`;
          ctx.fillText(s, x, y);
        });
      }
    }

    function drawSurvival(p) {
      const a = fadeIn(p) * fadeOut(p);
      const x0 = W * 0.12, x1 = W * 0.88, y0 = H * 0.2, y1 = H * 0.78;
      ctx.strokeStyle = `rgba(148,178,255,${0.25 * a})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x0, y1);
      ctx.lineTo(x1, y1);
      ctx.moveTo(x0, y0 - 14);
      ctx.lineTo(x0, y1);
      ctx.stroke();
      ctx.font = "500 11px 'JetBrains Mono', monospace";
      ctx.fillStyle = `rgba(159,176,200,${0.8 * a})`;
      ctx.fillText("time →", x1 - 52, y1 + 22);
      ctx.fillText("event-free", x0, y0 - 22);
      kmPts.forEach((arm) => {
        const pa = clamp01(p * 1.25 - 0.1);
        ctx.strokeStyle = `rgba(${arm.col},${0.95 * a})`;
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        const n = arm.pts.length;
        const full = (n - 1) * Math.min(1, pa * 1.15);
        const fi = Math.floor(full);
        for (let i = 0; i <= Math.min(fi, n - 1); i++) {
          const px = x0 + arm.pts[i][0] * (x1 - x0);
          const py = y0 + arm.pts[i][1] * (y1 - y0);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        if (fi < n - 1) {
          const fr = full - fi;
          const px1 = x0 + arm.pts[fi][0] * (x1 - x0);
          const py1 = y0 + arm.pts[fi][1] * (y1 - y0);
          const px2 = x0 + arm.pts[Math.min(fi + 1, n - 1)][0] * (x1 - x0);
          const py2 = y0 + arm.pts[Math.min(fi + 1, n - 1)][1] * (y1 - y0);
          ctx.lineTo(px1 + (px2 - px1) * fr, py1 + (py2 - py1) * fr);
        }
        ctx.stroke();
        arm.pts.forEach((pt, i) => {
          if (i === 0 || i / (n - 1) > pa) return;
          const px = x0 + pt[0] * (x1 - x0);
          const py = y0 + pt[1] * (y1 - y0);
          ctx.fillStyle = `rgba(${arm.col},${0.9 * a})`;
          ctx.beginPath();
          ctx.arc(px, py, 3.4, 0, TAU);
          ctx.fill();
        });
      });
      if (p > 0.66) {
        const ma = clamp01((p - 0.66) * 2.4) * a;
        ctx.setLineDash([5, 6]);
        ctx.strokeStyle = `rgba(159,176,200,${0.6 * ma})`;
        ctx.beginPath();
        ctx.moveTo(W * 0.52, y0 - 14);
        ctx.lineTo(W * 0.52, y1);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = `rgba(159,176,200,${0.85 * ma})`;
        ctx.fillText("median", W * 0.52 + 8, y0 + 2);
      }
    }

    function drawTitle(p) {
      const a = fadeIn(p);
      const t = p * 22;
      for (let i = 0; i < 26; i++) {
        const x = ((i * 137.5) % 100) / 100 * W;
        const y = (((i * 91.3) % 100) / 100 + Math.sin(t * 0.05 + i) * 0.02) * H;
        ctx.fillStyle = `rgba(148,178,255,${0.14 * a})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, TAU);
        ctx.fill();
      }
      ctx.strokeStyle = `rgba(45,212,191,${0.4 * a})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(W / 2, H * 0.24, 30 + Math.sin(p * 6) * 2, p * 2, p * 2 + Math.PI * 1.2);
      ctx.stroke();
    }

    const SCENES = [drawBranches, drawFrames, drawWorlds, drawLens, drawSubtype, drawSurvival, drawTitle];
    let cur = 0;
    let t0 = null;
    let done = false;

    function setCaption(i) {
      caps.forEach((c, k) => {
        c.classList.toggle("on", k === i);
        c.classList.toggle("past", k < i);
      });
    }

    function frame(ts) {
      if (done) return;
      if (t0 === null) t0 = ts;
      const el = (ts - t0) / 1000;
      let acc = 0, i = 0;
      while (i < S.length - 1 && el >= acc + S[i]) { acc += S[i]; i++; }
      if (i !== cur) { cur = i; setCaption(i); }
      const p = clamp01((el - acc) / S[i]);
      ctx.clearRect(0, 0, W, H);
      ctx.save();
      const z = 1.045 + Math.sin(cur * 1.7) * 0.02;
      ctx.translate(W / 2, H / 2);
      ctx.scale(z, z);
      ctx.translate(-W / 2, -H / 2);
      SCENES[i](p);
      ctx.restore();
      vignette(0.42);
      grain();
      if (prog) prog.style.width = `${Math.min(100, (el / TOTAL) * 100)}%`;
      if (el >= TOTAL) { done = true; finish(); return; }
      requestAnimationFrame(frame);
    }

    setCaption(0);
    requestAnimationFrame(frame);

    let paused = false;
    document.addEventListener("visibilitychange", () => {
      paused = document.hidden;
    });

    const skipBtn = film.querySelector(".skip");
    if (skipBtn) skipBtn.addEventListener("click", finish);
    document.addEventListener("keydown", function esc(e) {
      if (e.key === "Escape" && document.body.contains(film)) {
        finish();
        document.removeEventListener("keydown", esc);
      }
    });
  }
}
