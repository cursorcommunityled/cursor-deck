/*!
 * cursor-meetup-roma / globe.js
 * Self-contained animated dotted-Earth globe for a Reveal.js slide.
 *
 * - Pure HTML5 Canvas 2D. No WebGL, no three.js, no framework, no build step.
 * - Zero runtime network: the landmask is Natural Earth 110m land, rasterized
 *   at build time to a 720x360 equirectangular 1-bit PNG and base64-embedded
 *   below as a data URI. Nothing is fetched at runtime.
 * - Mounts into #cursor-globe, fills the container, retina-aware, re-renders
 *   on resize (ResizeObserver). Transparent background (slide ink shows
 *   through). Pause on document.hidden. Static tilt for prefers-reduced-motion.
 *
 * Palette (Cursor brand):
 *   --line   #E6E5DD  230,229,221  near / cream land dots
 *   --subtle #9E9C90  158,156,144  far / grey land dots
 *   --paper  #F7F7F4  247,247,244  city nodes + connection arcs
 */
(function () {
  'use strict';

  var MOUNT_ID = 'cursor-globe';
  var TAU = Math.PI * 2;
  var DEG = Math.PI / 180;

  /* ---- embedded equirectangular landmask (land = white) ----------------- */
  var MASK_W = 720, MASK_H = 360;
  var MASK_URI = 'data:image/png;base64,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';

  /* ---- palette ---------------------------------------------------------- */
  var COL_NEAR = [230, 229, 221]; // --line
  var COL_FAR  = [158, 156, 144]; // --subtle
  var ARC = 'rgba(247,247,244,'; // --paper, append "a)"

  /* ---- cities (lat, lng) ------------------------------------------------ */
  var CITIES = [
    { name: 'Roma',           lat: 41.90, lng: 12.50, hero: true },
    { name: 'San Francisco',  lat: 37.77, lng: -122.42 },
    { name: 'New York',       lat: 40.71, lng: -74.01 },
    { name: 'London',         lat: 51.51, lng: -0.13 },
    { name: 'Berlin',         lat: 52.52, lng: 13.40 },
    { name: 'Lagos',          lat: 6.52,  lng: 3.38 },
    { name: 'Nairobi',        lat: -1.29, lng: 36.82 },
    { name: 'Sao Paulo',      lat: -23.55, lng: -46.63 },
    { name: 'Bangalore',      lat: 12.97, lng: 77.59 },
    { name: 'Tokyo',          lat: 35.68, lng: 139.69 },
    { name: 'Singapore',      lat: 1.35,  lng: 103.82 },
    { name: 'Dubai',          lat: 25.20, lng: 55.27 },
    { name: 'Buenos Aires',   lat: -34.60, lng: -58.38 }
  ];
  // arc pairs (city indices) — radiate from Roma (0) + a few cross-links
  var ARC_PAIRS = [
    [0, 1], [0, 2], [0, 3], [0, 9], [0, 7], [0, 11],
    [2, 1], [3, 4], [8, 9], [5, 7], [10, 9]
  ];

  /* ---- module state ----------------------------------------------------- */
  var mount, canvas, ctx, raf = 0;
  var cssW = 0, cssH = 0, dpr = 1, cx = 0, cy = 0, R = 0;

  var landDots = null, landCount = 0;  // Float32Array [x,y,z,...] unit vectors
  var cityVecs = [];
  var arcs = [];

  var rot = -75 * DEG;   // spin (front-centre lng = rot + 90 -> ~Europe/Africa)
  var tilt = 0.42;       // tilt north toward viewer
  var spinVel = 0.0020;  // base auto-spin (per ~16.7ms)
  var dragVel = 0;       // drag inertia
  var dragging = false, lastPX = 0, lastPY = 0;
  var reduced = false;
  var lastTime = 0;
  var COMET_SPEED = 0.00009;

  /* ---- depth buckets for batched land-dot fills ------------------------- */
  var NB = 11;
  var bucketX = [], bucketY = [], bucketStyle = new Array(NB), bucketRad = new Array(NB);
  for (var _b = 0; _b < NB; _b++) { bucketX.push([]); bucketY.push([]); }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function computeBucketStyles() {
    for (var b = 0; b < NB; b++) {
      var t = (b + 0.5) / NB;
      var rr = Math.round(lerp(COL_FAR[0], COL_NEAR[0], t));
      var gg = Math.round(lerp(COL_FAR[1], COL_NEAR[1], t));
      var bb = Math.round(lerp(COL_FAR[2], COL_NEAR[2], t));
      var al = lerp(0.15, 0.80, t);
      bucketStyle[b] = 'rgba(' + rr + ',' + gg + ',' + bb + ',' + al.toFixed(3) + ')';
      bucketRad[b] = lerp(0.8, 1.55, t);
    }
  }

  /* ---- geometry --------------------------------------------------------- */
  function latLngToVec(lat, lng) {
    var la = lat * DEG, lo = lng * DEG, cl = Math.cos(la);
    return [cl * Math.cos(lo), Math.sin(la), cl * Math.sin(lo)];
  }

  var _o = [0, 0, 0];
  // rotate (spin about Y, tilt about X), orthographic project. out=[px,py,depth]
  function proj(x0, y0, z0, cR, sR, cT, sT, out) {
    var x1 = x0 * cR + z0 * sR;
    var z1 = -x0 * sR + z0 * cR;
    var y2 = y0 * cT - z1 * sT;
    var z2 = y0 * sT + z1 * cT;
    out[0] = cx + x1 * R;
    out[1] = cy - y2 * R;
    out[2] = z2; // >0 = front hemisphere (toward viewer)
  }

  function buildCityVecs() {
    cityVecs = [];
    for (var i = 0; i < CITIES.length; i++) {
      var c = CITIES[i];
      cityVecs.push({ v: latLngToVec(c.lat, c.lng), hero: !!c.hero });
    }
  }

  function buildArcs() {
    arcs = [];
    var N = 64;
    for (var p = 0; p < ARC_PAIRS.length; p++) {
      var A = latLngToVec(CITIES[ARC_PAIRS[p][0]].lat, CITIES[ARC_PAIRS[p][0]].lng);
      var B = latLngToVec(CITIES[ARC_PAIRS[p][1]].lat, CITIES[ARC_PAIRS[p][1]].lng);
      var d = A[0] * B[0] + A[1] * B[1] + A[2] * B[2];
      if (d > 1) d = 1; else if (d < -1) d = -1;
      var om = Math.acos(d), so = Math.sin(om);
      var lift = 0.16 + 0.16 * (om / Math.PI); // longer arcs bulge more
      var pts = new Float32Array(N * 3);
      for (var k = 0; k < N; k++) {
        var f = k / (N - 1), w1, w2;
        if (so < 1e-6) { w1 = 1 - f; w2 = f; }
        else { w1 = Math.sin((1 - f) * om) / so; w2 = Math.sin(f * om) / so; }
        var x = w1 * A[0] + w2 * B[0];
        var y = w1 * A[1] + w2 * B[1];
        var z = w1 * A[2] + w2 * B[2];
        var s = 1 + lift * Math.sin(Math.PI * f); // lift off the surface
        pts[k * 3] = x * s; pts[k * 3 + 1] = y * s; pts[k * 3 + 2] = z * s;
      }
      arcs.push({ pts: pts, n: N, phase: (p * 0.137) % 1, speed: 0.6 + (p % 4) * 0.22 });
    }
  }

  /* ---- land dots: Fibonacci sphere, filtered by the landmask ------------ */
  function buildDots(landTest) {
    var target = 9000, maxN = 34000, tmp = [];
    var GA = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < maxN; i++) {
      var y = 1 - (i + 0.5) / maxN * 2;
      var r = Math.sqrt(Math.max(0, 1 - y * y));
      var th = i * GA;
      var x = Math.cos(th) * r, z = Math.sin(th) * r;
      var lat = Math.asin(y) / DEG;
      var lng = Math.atan2(z, x) / DEG;
      if (landTest(lat, lng)) {
        tmp.push(x, y, z);
        if (tmp.length >= target * 3) break;
      }
    }
    landDots = new Float32Array(tmp);
    landCount = landDots.length / 3;
    if (reduced) draw(0);
  }

  function buildDotsProcedural() {
    // fallback: evenly distributed full-sphere dots (no recognizable land)
    var N = 5200, GA = Math.PI * (3 - Math.sqrt(5));
    var arr = new Float32Array(N * 3);
    for (var i = 0; i < N; i++) {
      var y = 1 - (i + 0.5) / N * 2;
      var r = Math.sqrt(Math.max(0, 1 - y * y));
      var th = i * GA;
      arr[i * 3] = Math.cos(th) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(th) * r;
    }
    landDots = arr; landCount = N;
    if (reduced) draw(0);
  }

  function makeLandTest(data, mw, mh) {
    return function (lat, lng) {
      var ix = ((lng + 180) / 360 * mw) | 0;
      var iy = ((90 - lat) / 180 * mh) | 0;
      if (ix < 0) ix = 0; else if (ix >= mw) ix = mw - 1;
      if (iy < 0) iy = 0; else if (iy >= mh) iy = mh - 1;
      return data[(iy * mw + ix) * 4] > 127; // red channel: white = land
    };
  }

  function loadMask() {
    var img = new Image();
    img.onload = function () {
      try {
        var oc = document.createElement('canvas');
        oc.width = MASK_W; oc.height = MASK_H;
        var octx = oc.getContext('2d');
        octx.drawImage(img, 0, 0, MASK_W, MASK_H);
        var id = octx.getImageData(0, 0, MASK_W, MASK_H).data;
        buildDots(makeLandTest(id, MASK_W, MASK_H));
      } catch (e) { buildDotsProcedural(); }
    };
    img.onerror = function () { buildDotsProcedural(); };
    img.src = MASK_URI;
  }

  /* ---- drawing ---------------------------------------------------------- */
  function drawArcFull(arc, cR, sR, cT, sT) {
    var n = arc.n, pts = arc.pts, started = false;
    ctx.beginPath();
    for (var k = 0; k < n; k++) {
      var b = k * 3;
      proj(pts[b], pts[b + 1], pts[b + 2], cR, sR, cT, sT, _o);
      if (_o[2] < 0) { started = false; continue; } // behind globe
      if (!started) { ctx.moveTo(_o[0], _o[1]); started = true; }
      else ctx.lineTo(_o[0], _o[1]);
    }
    ctx.strokeStyle = ARC + '0.13)';
    ctx.lineWidth = 1.0;
    ctx.stroke();
  }

  function drawComet(arc, now, cR, sR, cT, sT) {
    var n = arc.n, pts = arc.pts;
    var headF = (now * COMET_SPEED * arc.speed + arc.phase) % 1;
    var TR = 10, dstep = 0.020;
    var prevX = 0, prevY = 0, havep = false;
    for (var j = TR; j >= 0; j--) {
      var f = headF - j * dstep;
      if (f < 0) { havep = false; continue; }
      var fi = f * (n - 1), i0 = fi | 0, fr = fi - i0, i1 = i0 + 1;
      if (i1 > n - 1) i1 = n - 1;
      var b0 = i0 * 3, b1 = i1 * 3;
      var vx = pts[b0] + (pts[b1] - pts[b0]) * fr;
      var vy = pts[b0 + 1] + (pts[b1 + 1] - pts[b0 + 1]) * fr;
      var vz = pts[b0 + 2] + (pts[b1 + 2] - pts[b0 + 2]) * fr;
      proj(vx, vy, vz, cR, sR, cT, sT, _o);
      var px = _o[0], py = _o[1], z2 = _o[2];
      if (z2 < 0) { havep = false; continue; } // behind globe
      if (havep) {
        var a = 0.5 * (1 - j / TR) * Math.min(1, z2 + 0.3);
        ctx.strokeStyle = ARC + a.toFixed(3) + ')';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
      prevX = px; prevY = py; havep = true;
      if (j === 0) {
        var g = ctx.createRadialGradient(px, py, 0, px, py, 6);
        g.addColorStop(0, ARC + '0.55)');
        g.addColorStop(1, ARC + '0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(px, py, 6, 0, TAU); ctx.fill();
        ctx.fillStyle = ARC + '0.95)';
        ctx.beginPath(); ctx.arc(px, py, 1.6, 0, TAU); ctx.fill();
      }
    }
  }

  function drawCities(now, cR, sR, cT, sT) {
    var pulse = 0.5 + 0.5 * Math.sin(now * 0.0035);
    for (var i = 0; i < cityVecs.length; i++) {
      var c = cityVecs[i];
      proj(c.v[0], c.v[1], c.v[2], cR, sR, cT, sT, _o);
      var px = _o[0], py = _o[1], z2 = _o[2];
      if (z2 < -0.05) continue; // hidden on far side
      var fz = z2 < 0 ? 0 : z2;
      var gr = c.hero ? 10 : 6.5;
      var g = ctx.createRadialGradient(px, py, 0, px, py, gr);
      g.addColorStop(0, ARC + (0.5 * (0.4 + 0.6 * fz)).toFixed(3) + ')');
      g.addColorStop(1, ARC + '0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(px, py, gr, 0, TAU); ctx.fill();
      ctx.fillStyle = ARC + Math.min(1, 0.65 + 0.35 * fz).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(px, py, c.hero ? 2.7 : 1.9, 0, TAU); ctx.fill();
      if (c.hero) {
        var rr = 4 + 9 * pulse;
        ctx.strokeStyle = ARC + (0.45 * (1 - pulse) * (0.4 + 0.6 * fz)).toFixed(3) + ')';
        ctx.lineWidth = 1.3;
        ctx.beginPath(); ctx.arc(px, py, rr, 0, TAU); ctx.stroke();
      }
    }
  }

  function draw(now) {
    if (!ctx) return;
    ctx.clearRect(0, 0, cssW, cssH); // transparent — never paint a background
    if (R <= 0) return;
    var cR = Math.cos(rot), sR = Math.sin(rot);
    var cT = Math.cos(tilt), sT = Math.sin(tilt);

    // --- land dots, bucketed by depth and batched into NB fills ---
    if (landDots) {
      for (var b = 0; b < NB; b++) { bucketX[b].length = 0; bucketY[b].length = 0; }
      var n = landCount;
      for (var i = 0; i < n; i++) {
        var ix = i * 3;
        var x0 = landDots[ix], y0 = landDots[ix + 1], z0 = landDots[ix + 2];
        var x1 = x0 * cR + z0 * sR;
        var z1 = -x0 * sR + z0 * cR;
        var y2 = y0 * cT - z1 * sT;
        var z2 = y0 * sT + z1 * cT;
        if (z2 <= 0.015) continue; // cull back hemisphere
        var bk = (z2 * NB) | 0; if (bk >= NB) bk = NB - 1;
        bucketX[bk].push(cx + x1 * R);
        bucketY[bk].push(cy - y2 * R);
      }
      for (var bb = 0; bb < NB; bb++) {
        var xs = bucketX[bb]; if (!xs.length) continue;
        var ys = bucketY[bb], rad = bucketRad[bb];
        ctx.fillStyle = bucketStyle[bb];
        ctx.beginPath();
        for (var k = 0; k < xs.length; k++) {
          ctx.moveTo(xs[k] + rad, ys[k]);
          ctx.arc(xs[k], ys[k], rad, 0, TAU);
        }
        ctx.fill();
      }
    }

    // --- arcs (under nodes) ---
    ctx.lineCap = 'round';
    for (var a1 = 0; a1 < arcs.length; a1++) drawArcFull(arcs[a1], cR, sR, cT, sT);
    for (var a2 = 0; a2 < arcs.length; a2++) drawComet(arcs[a2], now, cR, sR, cT, sT);

    // --- city nodes (on top) ---
    drawCities(now, cR, sR, cT, sT);
  }

  /* ---- animation loop --------------------------------------------------- */
  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (document.hidden) { lastTime = now; return; } // pause work when hidden
    var dt = now - lastTime; if (dt > 60) dt = 60; lastTime = now;
    var f = dt / 16.667;
    if (!dragging) {
      rot += spinVel * f;
      rot += dragVel;
      dragVel *= 0.94;
      if (Math.abs(dragVel) < 1e-5) dragVel = 0;
    }
    draw(now);
  }

  /* ---- layout / resize -------------------------------------------------- */
  function layout() {
    if (!mount) return;
    var rect = mount.getBoundingClientRect();
    cssW = Math.max(1, Math.round(rect.width));
    cssH = Math.max(1, Math.round(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // work in CSS pixels, retina-crisp
    cx = cssW / 2;
    cy = cssH / 2;
    R = Math.min(cssW, cssH) * 0.46;
    if (reduced) draw(0);
  }

  /* ---- pointer drag with inertia ---------------------------------------- */
  function attachDrag() {
    canvas.addEventListener('pointerdown', function (e) {
      dragging = true; lastPX = e.clientX; lastPY = e.clientY;
      canvas.style.cursor = 'grabbing';
      if (canvas.setPointerCapture) { try { canvas.setPointerCapture(e.pointerId); } catch (x) {} }
    });
    window.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - lastPX, dy = e.clientY - lastPY;
      lastPX = e.clientX; lastPY = e.clientY;
      var dr = dx * 0.005;
      rot += dr;
      dragVel = dr;
      tilt = Math.max(0.05, Math.min(0.95, tilt - dy * 0.003));
      if (reduced) draw(0);
    });
    window.addEventListener('pointerup', function () {
      dragging = false; canvas.style.cursor = 'grab';
    });
  }

  /* ---- bootstrap -------------------------------------------------------- */
  function start() {
    mount = document.getElementById(MOUNT_ID);
    if (!mount) return;
    canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.touchAction = 'none';
    canvas.style.cursor = 'grab';
    mount.appendChild(canvas);
    ctx = canvas.getContext('2d');
    if (!ctx) return;

    reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    computeBucketStyles();
    buildCityVecs();
    buildArcs();
    layout();

    if (window.ResizeObserver) { new ResizeObserver(layout).observe(mount); }
    else { window.addEventListener('resize', layout); }

    attachDrag();
    loadMask();

    if (reduced) {
      draw(0); // static, nicely-tilted globe; no rAF loop
    } else {
      lastTime = (window.performance && performance.now) ? performance.now() : Date.now();
      raf = requestAnimationFrame(frame);
      document.addEventListener('visibilitychange', function () {
        if (!document.hidden) {
          lastTime = (window.performance && performance.now) ? performance.now() : Date.now();
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
