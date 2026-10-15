// Visualizador 3D do transistor: planar, FinFET (tri-gate) e GAA (nanosheet).
// Mostra quantas faces do canal a porta controla em cada geracao (1, 3 e 4) e
// deixa passar corrente fonte -> dreno conforme Vgs/Vds. IIFE porque roda numa
// pagina de post junto com outros scripts.
(function () {
const wrap = document.getElementById('t3-wrap'), lbl = document.getElementById('t3-lbl');
const H = 500, W = () => wrap.clientWidth;
const rnd = (a, b) => a + Math.random() * (b - a);
const PLANAR_X = 0, FIN_X = 11, GAA_X = 22, VTH = 0.34;

const r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
r.setPixelRatio(devicePixelRatio); r.localClippingEnabled = true;
r.setSize(W(), H); wrap.insertBefore(r.domElement, lbl);

const sc = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(45, W() / H, 0.1, 400);
const ctl = new THREE.OrbitControls(cam, r.domElement);
ctl.enableDamping = true; ctl.minDistance = 6; ctl.maxDistance = 90;
ctl.maxPolarAngle = Math.PI * 0.52;
sc.add(new THREE.AmbientLight(0xffffff, 0.72));
const dl = new THREE.DirectionalLight(0xffffff, 0.7); dl.position.set(14, 26, 18); sc.add(dl);

const lam = (c, o) => new THREE.MeshLambertMaterial({ color: c, transparent: o < 1, opacity: o, depthWrite: o >= 0.5 });
const MAT = {
  si: lam(0x888780, 1), sd: lam(0x97C459, 1), ox: lam(0x5DCAA5, 0.45),
  gate: lam(0xE24B4A, 0.35),
  chan: new THREE.MeshBasicMaterial({ color: 0xD4537E, transparent: true, opacity: 0.85 }),
  carrier: new THREE.MeshBasicMaterial({ color: 0x185FA5, depthTest: false, transparent: true })
};
MAT.gate.depthWrite = false;

function slab(w, h, d, mat, x, y, z) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  const e = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry),
    new THREE.LineBasicMaterial({ color: 0x444441, transparent: true, opacity: 0.3 }));
  m.add(e); return m;
}

const cGeo = new THREE.SphereGeometry(0.075, 10, 10);
function carriers(group, specs) {
  return specs.map(s => {
    const m = new THREE.Mesh(cGeo, MAT.carrier);
    m.position.set(s[0], s[1], s[2]); m.renderOrder = 10; group.add(m);
    return { m, x: s[0], y: s[1], z: s[2] };
  });
}
function planarSpecs() {
  const s = []; for (let i = 0; i < 24; i++) s.push([rnd(-2.7, 2.7), 0.075, rnd(-1.4, 1.4)]); return s;
}
function finSpecs() {
  const s = [];
  for (let i = 0; i < 30; i++) {
    const r = Math.random(), x = rnd(-2.7, 2.7);
    if (r < 0.42) s.push([x, rnd(0.08, 1.42), 0.27]);
    else if (r < 0.84) s.push([x, rnd(0.08, 1.42), -0.27]);
    else s.push([x, 1.56, rnd(-0.16, 0.16)]);
  }
  return s;
}
function gaaSpecs() {
  const s = [], sheets = [0.35, 0.85, 1.35];
  for (const ys of sheets)
    for (let k = 0; k < 3; k++) {
      s.push([rnd(-2.7, 2.7), ys + 0.1, rnd(-0.6, 0.6)]);
      s.push([rnd(-2.7, 2.7), ys - 0.1, rnd(-0.6, 0.6)]);
      s.push([rnd(-2.7, 2.7), ys + rnd(-0.05, 0.05), 0.6]);
      s.push([rnd(-2.7, 2.7), ys + rnd(-0.05, 0.05), -0.6]);
    }
  return s;
}

const gates = [];
function buildPlanar(dx) {
  const g = new THREE.Group(); g.position.x = dx;
  g.add(slab(5.4, 1, 3, MAT.si, 0, -0.5, 0));
  g.add(slab(1.3, 0.5, 3, MAT.sd, -2.05, -0.25, 0), slab(1.3, 0.5, 3, MAT.sd, 2.05, -0.25, 0));
  const chan = slab(1.7, 0.06, 3, MAT.chan, 0, 0.02, 0);
  const gate = slab(1.9, 0.5, 3, MAT.gate, 0, 0.34, 0);
  g.add(slab(1.9, 0.05, 3, MAT.ox, 0, 0.07, 0), gate, chan);
  gates.push(gate); sc.add(g);
  return { name: 'planar', group: g, chan, carriers: carriers(g, planarSpecs()) };
}
function buildFinFET(dx) {
  const g = new THREE.Group(); g.position.x = dx;
  g.add(slab(5.4, 1, 3, MAT.si, 0, -0.5, 0));
  g.add(slab(5.4, 1.5, 0.45, MAT.si, 0, 0.75, 0));
  g.add(slab(1.3, 1.5, 0.47, MAT.sd, -2.05, 0.75, 0), slab(1.3, 1.5, 0.47, MAT.sd, 2.05, 0.75, 0));
  const chan = slab(1.1, 1.5, 0.48, MAT.chan, 0, 0.75, 0);
  const top = slab(1.1, 0.35, 3, MAT.gate, 0, 1.675, 0);
  const zA = slab(1.1, 1.6, 0.35, MAT.gate, 0, 0.8, 0.4);
  const zB = slab(1.1, 1.6, 0.35, MAT.gate, 0, 0.8, -0.4);
  g.add(slab(1.1, 1.52, 0.5, MAT.ox, 0, 0.76, 0), top, zA, zB, chan);
  gates.push(top, zA, zB); sc.add(g);
  return { name: 'finfet', group: g, chan, carriers: carriers(g, finSpecs()) };
}
function buildGAA(dx) {
  const g = new THREE.Group(); g.position.x = dx;
  const sheets = [0.35, 0.85, 1.35];
  g.add(slab(5.4, 1, 3, MAT.si, 0, -0.5, 0));
  g.add(slab(0.9, 1.5, 1.5, MAT.sd, -2.25, 0.85, 0), slab(0.9, 1.5, 1.5, MAT.sd, 2.25, 0.85, 0));
  sheets.forEach(ys => g.add(slab(5.4, 0.17, 1.4, MAT.si, 0, ys, 0)));
  const chan = slab(1.1, 1.68, 1.44, MAT.chan, 0, 0.85, 0);
  const gate = slab(1.1, 1.78, 1.86, MAT.gate, 0, 0.85, 0);
  g.add(gate, chan); gates.push(gate); sc.add(g);
  return { name: 'gaa', group: g, chan, carriers: carriers(g, gaaSpecs()) };
}

const DEV = [buildPlanar(PLANAR_X), buildFinFET(FIN_X), buildGAA(GAA_X)];

const labels = [];
function lab(text, x, y, z) {
  const s = document.createElement('div');
  s.textContent = text;
  s.style.cssText = 'position:absolute;transform:translate(-50%,-50%);white-space:nowrap;padding:1px 6px;' +
    'border-radius:6px;border:0.5px solid var(--border);color:var(--text-primary);background:var(--surface-2)';
  lbl.appendChild(s); labels.push({ s, x, y, z });
}
function deviceLabels(dx, name, top, gateY, sdY, sdX, faces) {
  lab(name, dx, top, 0);
  lab('fonte', dx - sdX, sdY, 1.7); lab('dreno', dx + sdX, sdY, 1.7);
  lab('porta', dx, gateY, 1.6);
  lab(faces, dx, -0.2, 1.7);
}
deviceLabels(PLANAR_X, 'planar', 1.35, 0.85, 0.5, 2.05, '1 face');
deviceLabels(FIN_X, 'FinFET (tri-gate)', 2.25, 1.95, 1.85, 2.05, '3 faces');
deviceLabels(GAA_X, 'GAA (nanosheet)', 2.45, 2.05, 1.8, 2.25, '4 faces por sheet');

const state = { vgs: 0, vds: 0 };
function gateControl() {
  const t = (state.vgs - VTH) / (1 - VTH);
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return t * t * (3 - 2 * t);
}
function refresh() {
  const c = gateControl(), on = c > 0.04, i = c * state.vds;
  DEV.forEach(d => {
    d.chan.visible = on;
    d.chan.material.opacity = 0.25 + 0.6 * c;
    d.carriers.forEach(k => { k.m.visible = on; });
  });
  document.getElementById('t3-out').textContent = '|I| ' + (i * 100).toFixed(0) + '%';
  document.getElementById('t3-path').textContent = on
    ? 'Canal ' + (on ? 'ligado' : '') + ': a porta formou o canal e as cargas atravessam da fonte pro dreno. O GAA liga nas 4 faces de cada sheet, entao conduz com o menor Vgs.'
    : 'Canal desligado: a porta ainda nao venceu a barreira (Vgs < Vth). Nenhuma carga cruza o canal.';
}

const VIEWS = {
  all: { p: [11, 13, 30], t: [11, 0.9, 0] },
  planar: { p: [2, 4.5, 11], t: [0, 0.5, 0] },
  finfet: { p: [13, 5, 12], t: [11, 0.85, 0] },
  gaa: { p: [24, 5, 13], t: [22, 0.9, 0] },
  cross: { p: [33, 4.5, 5], t: [22, 0.95, 0] },
  top: { p: [11, 34, 0.01], t: [11, 0.5, 0] }
};
const clip = new THREE.Plane(new THREE.Vector3(-1, 0, 0), GAA_X);
const clipMats = [MAT.si, MAT.sd, MAT.ox, MAT.gate, MAT.chan];
function setClip(on) {
  const planes = on ? [clip] : [];
  clipMats.forEach(m => { m.clippingPlanes = planes; m.needsUpdate = true; });
}
function setFocus(v) {
  DEV.forEach(d => {
    if (v === 'all' || v === 'top') d.group.visible = true;
    else if (v === 'cross') d.group.visible = d.name === 'gaa';
    else d.group.visible = d.name === v;
  });
}
function view(name) {
  const V = VIEWS[name]; if (!V) return;
  cam.position.set(V.p[0], V.p[1], V.p[2]);
  ctl.target.set(V.t[0], V.t[1], V.t[2]); ctl.update();
  setFocus(name); setClip(name === 'cross');
}

const vis = { gate: true, lbl: true };
function bindToggles() {
  document.querySelectorAll('#t3-vis [data-l]').forEach(c => {
    const apply = () => {
      vis[c.dataset.l] = c.checked;
      if (c.dataset.l === 'gate') gates.forEach(g => { g.visible = c.checked; });
    };
    apply(); c.onchange = apply;
  });
}
function bindRanges() {
  const vgs = document.getElementById('t3-vgs'), vds = document.getElementById('t3-vds');
  const sync = () => { state.vgs = +vgs.value; state.vds = +vds.value; refresh(); };
  vgs.oninput = sync; vds.oninput = sync;
  document.querySelectorAll('#t3-vis [data-preset]').forEach(b => {
    b.onclick = () => {
      const p = b.dataset.preset.split(',');
      vgs.value = p[0]; vds.value = p[1]; sync();
    };
  });
  document.querySelectorAll('#t3-vis [data-view]').forEach(b => { b.onclick = () => view(b.dataset.view); });
  sync();
}

function updateCarriers(speed, dt) {
  DEV.forEach(d => d.carriers.forEach(k => {
    k.x += speed * dt;
    if (k.x > 2.75) k.x = -2.75;
    k.m.position.x = k.x;
  }));
}
function updateLabels() {
  const v = new THREE.Vector3();
  labels.forEach(l => {
    v.set(l.x, l.y, l.z).project(cam);
    l.s.style.left = ((v.x + 1) / 2 * W()) + 'px';
    l.s.style.top = ((1 - v.y) / 2 * H) + 'px';
    l.s.style.display = (vis.lbl && v.z < 1) ? 'block' : 'none';
  });
}

let last = performance.now();
(function loop(now) {
  requestAnimationFrame(loop);
  const dt = Math.min((now - last) / 1000, 0.05); last = now;
  const c = gateControl();
  updateCarriers(c * (0.4 + 2.2 * state.vds) * 1.6, dt);
  MAT.chan.opacity = 0.35 + 0.5 * c * (0.6 + 0.4 * Math.sin(now / 300));
  ctl.update(); updateLabels();
  r.render(sc, cam);
})(last);
addEventListener('resize', () => { cam.aspect = W() / H; cam.updateProjectionMatrix(); r.setSize(W(), H); });

bindToggles(); bindRanges();
view('all'); refresh();
})();
