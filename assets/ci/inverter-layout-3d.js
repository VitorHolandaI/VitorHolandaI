// Visualizador 3D do layout do inversor CMOS: camadas, canais e corrente.
// IIFE porque o script roda em uma pagina de post junto com outros scripts.
(function () {
const wrap = document.getElementById('inv-wrap'), lbl = document.getElementById('inv-lbl');
const W = () => wrap.clientWidth, H = 500;
const r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
r.setPixelRatio(devicePixelRatio); r.setSize(W(), H);
wrap.insertBefore(r.domElement, lbl);
const sc = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(40, W() / H, 0.1, 500);
const ctl = new THREE.OrbitControls(cam, r.domElement); ctl.enableDamping = true;
sc.add(new THREE.AmbientLight(0xffffff, 0.65));
const dl = new THREE.DirectionalLight(0xffffff, 0.6); dl.position.set(20, 40, 30); sc.add(dl);
const M = (c, o) => new THREE.MeshLambertMaterial({ color: c, transparent: o < 1, opacity: o, depthWrite: o >= 0.5 });
const L = { sub: [], well: [], diff: [], ch: [], gox: [], poly: [], cont: [], metal: [], sdg: [], cur: [] };
const lvl = { sub: 0, well: 0, diff: 0, ch: 0, gox: 1, poly: 2, metal: 3 };

function box(k, x0, x1, y0, y1, h0, h1, m, ec, eo) {
  const g = new THREE.BoxGeometry(x1 - x0, h1 - h0, y1 - y0);
  const me = new THREE.Mesh(g, m);
  me.position.set((x0 + x1) / 2 - 16, (h0 + h1) / 2, (y0 + y1) / 2 - 20);
  me.userData = { h0, h1 };
  sc.add(me);
  const e = new THREE.LineSegments(new THREE.EdgesGeometry(g),
    new THREE.LineBasicMaterial({ color: ec || 0x444441, transparent: true, opacity: eo || 0.35 }));
  me.add(e); L[k].push(me); return me;
}

box('sub', -4, 38, -6, 44, -5, -0.01, M(0x888780, 0.55));
box('well', 0, 30, 2, 17, -3.2, 0, M(0xAFA9EC, 0.7));

const pd = M(0xEF9F27, 1), nd = M(0x97C459, 1);
[[6, 16], [19, 29]].forEach(a => box('diff', a[0], a[1], 9, 14, -0.9, 0.02, pd));
[[6, 16], [19, 29]].forEach(a => box('diff', a[0], a[1], 27, 31, -0.9, 0.02, nd));
box('diff', 6, 16, 4, 8, -0.9, 0.02, nd);
box('diff', 6, 16, 33, 37, -0.9, 0.02, pd);

const chans = [];
const cmat = () => new THREE.MeshBasicMaterial({ color: 0xD4537E, transparent: true, opacity: 0.9 });
chans.push({ m: box('ch', 16, 19, 9, 14, -0.35, 0.04, cmat(), 0x72243E, 1), t: 'p' });
chans.push({ m: box('ch', 16, 19, 27, 31, -0.35, 0.04, cmat(), 0x72243E, 1), t: 'n' });

const gm = M(0x5DCAA5, 1);
box('gox', 16, 19, 9, 14, 0.04, 0.3, gm);
box('gox', 16, 19, 27, 31, 0.04, 0.3, gm);

const pm = M(0xE24B4A, 0.85);
box('poly', 16, 19, 6, 34, 0.3, 1.1, pm);
box('poly', 6, 16, 19, 23, 0.3, 1.1, pm);

const cm = M(0x2C2C2A, 1);
function contactRow(cx, cy, n, pitch, hs) {
  for (let i = 0; i < n; i++) {
    const x = cx + (i - (n - 1) / 2) * pitch;
    box('cont', x - hs, x + hs, cy - hs, cy + hs, 0.02, 3, cm);
  }
}
contactRow(11, 6, 5, 1.15, 0.42);
contactRow(11, 11.5, 5, 1.15, 0.42);
contactRow(24, 11.5, 5, 1.15, 0.42);
contactRow(11, 29, 5, 1.15, 0.42);
contactRow(24, 29, 5, 1.15, 0.42);
contactRow(11, 35, 5, 1.15, 0.42);
contactRow(11, 21, 3, 2.2, 0.42);

const mm = M(0x378ADD, 0.55);
[[0, 30, 0, 3], [5.5, 15.5, 0, 15],
 [0, 30, 37, 40], [5.5, 15.5, 26, 40],
 [21, 27, 10.2, 30.3], [27, 31.6, 18, 22],
 [2, 15, 19.5, 22.5]]
  .forEach(a => box('metal', a[0], a[1], a[2], a[3], 3, 3.8, mm));

const LB = [];
function lab(t, x, y, k, h, st, k2) {
  const s = document.createElement('div');
  s.textContent = t;
  s.style.cssText = 'position:absolute;transform:translate(-50%,-50%);white-space:nowrap;padding:1px 6px;border-radius:6px;border:0.5px solid var(--border);' +
    (st || 'color:var(--text-primary);background:var(--surface-2)');
  lbl.appendChild(s);
  const o = { s, x: x - 16, z: y - 20, k, h, k2 };
  LB.push(o); return o;
}
const gl = { A: lab('A', 4, 21, 'metal', 3.8) };
lab('VDD', 27, 2, 'metal', 3.8);
lab('GND', 27, 38, 'metal', 3.8);
lab('Y', 31.5, 20, 'metal', 3.8);
const sd = 'color:#3C3489;background:#EEEDFE', gs = 'color:#791F1F;background:#FCEBEB';
lab('S', 11, 11.5, 'sdg', 0.1, sd, 'diff');
lab('D', 24, 11.5, 'sdg', 0.1, sd, 'diff');
lab('S', 11, 29, 'sdg', 0.1, sd, 'diff');
lab('D', 24, 29, 'sdg', 0.1, sd, 'diff');
lab('tap N+', 11, 6, 'sdg', 0.1, sd, 'diff');
lab('tap P+', 11, 35, 'sdg', 0.1, sd, 'diff');
lab('Gate: A', 17.5, 22, 'sdg', 1.1, gs, 'poly');

let ex = 0.6;
const off = k => (lvl[k] || 0) * ex * 2.2;

const pmat = new THREE.MeshBasicMaterial({ color: 0xD85A30, depthTest: false, transparent: true });
const nmat = new THREE.MeshBasicMaterial({ color: 0x185FA5, depthTest: false, transparent: true });
const sg = new THREE.SphereGeometry(0.42, 12, 12);
const N = 14, flows = [];
for (let f = 0; f < 2; f++) {
  const arr = [];
  for (let i = 0; i < N; i++) {
    const s = new THREE.Mesh(sg, f === 0 ? pmat : nmat);
    s.renderOrder = 10; sc.add(s); L.cur.push(s); arr.push(s);
  }
  flows.push({ arr, pts: null });
}

const inp = { A: 0 };
const vis = {};
function paths() {
  const m = 3.4 + off('metal'), d = -0.15;
  flows[0].pts = inp.A === 0
    ? [[11, 2, m], [11, 11.5, m], [11, 11.5, d], [24, 11.5, d], [24, 11.5, m], [24, 20, m], [31, 20, m]]
    : null;
  flows[1].pts = inp.A === 1
    ? [[31, 20, m], [24, 20, m], [24, 29, m], [24, 29, d], [11, 29, d], [11, 29, m], [11, 38, m]]
    : null;
}
function logic() {
  const pOn = inp.A === 0, nOn = inp.A === 1;
  chans.forEach(c => { c.on = c.t === 'p' ? pOn : nOn; });
  chans.forEach(c => c.m.visible = vis.ch !== false && c.on);
  document.getElementById('inv-out').textContent = 'Y = ' + (inp.A === 0 ? 1 : 0);
  document.getElementById('inv-bA').textContent = 'A = ' + inp.A;
  gl.A.s.textContent = 'A = ' + inp.A;
  document.getElementById('inv-path').textContent = pOn
    ? 'A = 0: o pMOS conduz. A corrente sai do VDD, desce pelo source P⁺, cruza o channel e sobe pelo drain até o Y — carrega Y em 1.'
    : 'A = 1: o nMOS conduz. A corrente sai do Y, desce pelo drain N⁺, cruza o channel e vai pelo source até o GND — descarrega Y em 0.';
}
document.getElementById('inv-bA').onclick = () => { inp.A ^= 1; logic(); };

function upd() {
  for (const k in L) {
    if (k === 'cur' || k === 'sdg') continue;
    L[k].forEach(m => {
      if (k === 'cont') {
        const a = 0.02 + off('diff'), b = 3 + off('metal');
        m.scale.y = (b - a) / 2.98; m.position.y = (a + b) / 2;
      } else m.position.y = (m.userData.h0 + m.userData.h1) / 2 + off(k);
    });
  }
}
document.getElementById('inv-ex').oninput = e => { ex = +e.target.value; upd(); };
document.querySelectorAll('#inv-vis [data-l]').forEach(c => {
  const f = () => {
    vis[c.dataset.l] = c.checked;
    if (L[c.dataset.l] && c.dataset.l !== 'cur') L[c.dataset.l].forEach(m => m.visible = c.checked);
    if (c.dataset.l === 'ch') chans.forEach(h => h.m.visible = c.checked && h.on);
  };
  f(); c.onchange = f;
});
function view(t) {
  if (t) cam.position.set(0, 75, 0.01); else cam.position.set(-34, 38, 46);
  ctl.target.set(0, 0, 0); ctl.update();
}
document.getElementById('inv-top').onclick = () => view(1);
document.getElementById('inv-iso').onclick = () => view(0);
view(0); logic(); upd();

function along(pts, u) {
  const seg = []; let tot = 0;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    const l = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    seg.push(l); tot += l;
  }
  let s = u * tot;
  for (let i = 0; i < seg.length; i++) {
    if (s <= seg[i] || i === seg.length - 1) {
      const a = pts[i], b = pts[i + 1], f = Math.min(1, s / seg[i]);
      return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
    }
    s -= seg[i];
  }
}
const v = new THREE.Vector3();
(function loop(t) {
  requestAnimationFrame(loop);
  t = t || 0; ctl.update(); paths();
  const pu = 0.55 + 0.4 * Math.sin(t / 250);
  chans.forEach(c => c.m.material.opacity = pu);
  flows.forEach(fl => fl.arr.forEach((s, i) => {
    if (!fl.pts || vis.cur === false) { s.visible = false; return; }
    s.visible = true;
    const u = ((t / 5000) + i / N) % 1;
    const p = along(fl.pts, u);
    s.position.set(p[0] - 16, p[2], p[1] - 20);
  }));
  r.render(sc, cam);
  LB.forEach(l => {
    const y = l.h + off(l.k2 || l.k) + 0.8;
    v.set(l.x, y, l.z).project(cam);
    l.s.style.left = ((v.x + 1) / 2 * W()) + 'px';
    l.s.style.top = ((1 - v.y) / 2 * H) + 'px';
    l.s.style.display = (vis.rot !== false && v.z < 1 && vis[l.k] !== false) ? 'block' : 'none';
  });
})();
addEventListener('resize', () => {
  cam.aspect = W() / H; cam.updateProjectionMatrix(); r.setSize(W(), H);
});
})();
