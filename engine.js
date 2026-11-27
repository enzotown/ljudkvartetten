// engine.js — yta, ljud, små hjälpare
const cv = document.getElementById('c');
const ctx = cv.getContext('2d');
const DW = 1000, DH = 700;
let vw = DW, vh = DH, SC = 1, OX = 0, OY = 0, DPR = 1;

const C = {
  cream: '#fffaf3', brown: '#4a3f39', brown2: '#6b5d54',
  mint: '#7bcbb6', mintDark: '#4fae94', coral: '#ef8064', coralDark: '#c9553f',
  yellow: '#ffe08a', yellowDark: '#e8b93d', sand: '#f3ddb4',
  wood: '#d9a35f', woodDark: '#a8722f', sky1: '#cfe9f6', sky2: '#eef8fc',
  leaf: '#5bb07a', leafDark: '#3f8a5c', plum: '#8f7bbf'
};

function resize() {
  DPR = Math.min(2, window.devicePixelRatio || 1);
  vw = window.innerWidth; vh = window.innerHeight;
  cv.width = Math.floor(vw * DPR); cv.height = Math.floor(vh * DPR);
  SC = Math.min(vw / DW, vh / DH);
  OX = (vw - DW * SC) / 2; OY = (vh - DH * SC) / 2;
  ctx.setTransform(DPR * SC, 0, 0, DPR * SC, DPR * OX, DPR * OY);
}
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', function () { setTimeout(resize, 200); });

function rr(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// ---------------------------------------------------------------- ljud
let actx = null, master = null;
function audio() {
  if (!actx) {
    try {
      actx = new (window.AudioContext || window.webkitAudioContext)();
      master = actx.createGain(); master.gain.value = 0.9;
      master.connect(actx.destination);
    } catch (e) {}
  }
  if (actx && actx.state === 'suspended') actx.resume();
  return actx;
}
function tone(f, dur, vol, type, delay) {
  const a = audio(); if (!a) return;
  const t0 = a.currentTime + (delay || 0);
  const o = a.createOscillator(), g = a.createGain();
  o.type = type || 'sine'; o.frequency.setValueAtTime(f, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol || 0.07, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g); g.connect(master);
  o.start(t0); o.stop(t0 + dur + 0.02);
}
function chime() { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, 0.32, 0.08, 'triangle', i * 0.09); }); }
function bleepNo() { tone(300, 0.16, 0.05, 'sine', 0); tone(230, 0.22, 0.05, 'sine', 0.14); }
function drumSound(n) { for (let i = 0; i < n; i++) tone(120, 0.14, 0.10, 'sine', i * 0.22); }

// röstinspelningar
const snd = {};
function preload() {
  ['w-mus', 'w-hus', 'w-katt', 'w-hatt', 'w-sol', 'w-stol', 'w-bil', 'w-pil',
    'w-boll', 'w-troll', 'w-gris', 'w-spis', 'w-kaka', 'w-blomma', 'w-bilar',
    'w-kaninen', 'w-fjärilen', 'w-apelsin',
    'q-mus', 'q-katt', 'q-sol', 'q-bil', 'q-boll', 'q-gris',
    'p-ratt', 'p-nej', 'p-bra', 'p-hej'].forEach(function (k) {
      const a = new Audio('snd/' + k + '.mp3');
      a.preload = 'auto'; a.volume = 1;
      snd[k] = a;
    });
}
let speakQueue = [];
let speaking = false;
let curSay = null;

// Stoppar allt som spelas och tömmer kön (används när barnet svarat).
function stopSay() {
  speakQueue.length = 0;
  if (curSay) {
    const a = curSay;
    try { a.onended = null; if (!a.paused) a.pause(); a.currentTime = 0; } catch (e) {}
  }
  curSay = null; speaking = false;
}

// say(key) lägger rösten sist i kön. say(key, {now:true}) avbryter det som spelas
// och spelar genast — så att beröm och "nej" hörs direkt, även om barnet svarar
// innan frågan hunnit spelas klart.
function say(key, opts) {
  opts = opts || {};
  const a = snd[key];
  if (!a) return;
  if (opts.now) { stopSay(); playSay(a); return; }
  if (speakQueue.length >= 2) speakQueue.shift();   // gamla rader hinner aldrig fram
  speakQueue.push(a);
  if (!speaking) nextSay();
}

function playSay(a) {
  speaking = true; curSay = a;
  try { if (!a.paused) a.pause(); a.currentTime = 0; } catch (e) {}
  a.onended = function () {
    if (curSay !== a) return;
    curSay = null; speaking = false;
    setTimeout(nextSay, 120);
  };
  startSay(a);
  // säkerhetsnät om onended inte kommer
  setTimeout(function () {
    if (curSay === a && a.ended) { curSay = null; speaking = false; nextSay(); }
  }, 4000);
}

// play() kan avvisas med AbortError när vi just pausat samma klipp — då försöker vi
// en gång till i stället för att tappa rösten (det var därför berömmet försvann).
function startSay(a) {
  let p = null;
  try { p = a.play(); } catch (e) { p = null; }
  if (p && p.catch) p.catch(function (err) {
    if (curSay !== a) return;
    if (err && err.name === 'AbortError') {
      setTimeout(function () { if (curSay === a) startSay(a); }, 70);
      return;
    }
    curSay = null; speaking = false; nextSay();
  });
}

function nextSay() {
  const a = speakQueue.shift();
  if (!a) { speaking = false; return; }
  playSay(a);
}
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}
function toDesign(e) {
  const r = cv.getBoundingClientRect();
  const t = e.touches && e.touches[0] ? e.touches[0] : e;
  const cx = (t.clientX - r.left) * (cv.width / DPR / r.width);
  const cy = (t.clientY - r.top) * (cv.height / DPR / r.height);
  return { x: (cx - OX) / SC, y: (cy - OY) / SC };
}