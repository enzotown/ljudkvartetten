// art.js — kort, korgar, Kotten och skärmens prylar
const EMOJI_FONT = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';

function drawBg() {
  const g = ctx.createLinearGradient(0, 0, 0, DH);
  g.addColorStop(0, C.sky2); g.addColorStop(0.55, '#fdf3e4'); g.addColorStop(1, C.sand);
  ctx.fillStyle = g; ctx.fillRect(0, 0, DW, DH);
  // mjuka bubblor
  ctx.save();
  const cols = ['rgba(123,203,182,.16)', 'rgba(255,224,138,.22)', 'rgba(239,128,100,.12)'];
  for (let i = 0; i < 9; i++) {
    const bx = 60 + (i * 137) % 900, by = 60 + (i * 211) % 600;
    ctx.fillStyle = cols[i % 3];
    ctx.beginPath(); ctx.arc(bx, by, 40 + (i % 4) * 22, 0, 6.3); ctx.fill();
  }
  ctx.restore();
}

function drawCard(word, x, y, w, h, opts) {
  opts = opts || {};
  const lift = opts.lift || 0;
  const scale = opts.scale || 1;
  const cx = x + w / 2, cy = y + h / 2;
  ctx.save();
  ctx.translate(cx, cy - lift);
  ctx.scale(scale, scale);
  ctx.rotate(opts.rot || 0);
  ctx.translate(-w / 2, -h / 2);

  // skugga
  ctx.fillStyle = 'rgba(74,63,57,.18)';
  rr(4, 8, w, h, 26); ctx.fill();

  // kortet
  ctx.fillStyle = opts.wrong ? '#ffe9e3' : C.cream;
  rr(0, 0, w, h, 26); ctx.fill();
  ctx.strokeStyle = opts.hi ? C.mint : (opts.wrong ? C.coral : 'rgba(74,63,57,.16)');
  ctx.lineWidth = opts.hi ? 7 : 4;
  rr(0, 0, w, h, 26); ctx.stroke();

  // texten i kortet ska alltid vara centrerad, oavsett vad som ritats innan
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // bild
  drawPic(word, w / 2, h * 0.335, Math.min(w * 0.72, h * 0.42));

  // ordet under bilden (för vuxna och för den som vill se)
  let fs = Math.floor(h * 0.135);
  const maxW = w - 34;
  ctx.font = 'bold ' + fs + 'px "Trebuchet MS", sans-serif';
  const tw = ctx.measureText(word).width;
  if (tw > maxW) {
    fs = Math.max(11, Math.floor(fs * maxW / tw));
    ctx.font = 'bold ' + fs + 'px "Trebuchet MS", sans-serif';
  }
  ctx.fillStyle = C.brown2;
  ctx.fillText(word, w / 2, h * 0.775);

  // prickar = antal stavelser
  const n = WORDS[word].syl;
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = opts.hi ? C.mintDark : 'rgba(74,63,57,.28)';
    ctx.beginPath();
    ctx.arc(w / 2 + (i - (n - 1) / 2) * 20, h * 0.925, 5, 0, 6.3);
    ctx.fill();
  }
  ctx.restore();
}

function drawSpeaker(x, y, r, pulse) {
  ctx.save();
  ctx.translate(x, y);
  const s = 1 + (pulse ? Math.sin(time * 6) * 0.06 : 0);
  ctx.scale(s, s);
  ctx.fillStyle = 'rgba(74,63,57,.16)';
  ctx.beginPath(); ctx.arc(2, 4, r, 0, 6.3); ctx.fill();
  ctx.fillStyle = C.mint;
  ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.3); ctx.fill();
  ctx.fillStyle = C.cream;
  ctx.beginPath();
  ctx.moveTo(-r * 0.34, -r * 0.22); ctx.lineTo(-r * 0.10, -r * 0.22);
  ctx.lineTo(r * 0.20, -r * 0.52); ctx.lineTo(r * 0.20, r * 0.52);
  ctx.lineTo(-r * 0.10, r * 0.22); ctx.lineTo(-r * 0.34, r * 0.22);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,250,243,.85)'; ctx.lineWidth = r * 0.12; ctx.lineCap = 'round';
  for (let i = 0; i < 2; i++) {
    ctx.beginPath();
    ctx.arc(r * 0.28, 0, r * (0.30 + i * 0.22), -0.7, 0.7);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBasket(n, x, y, w, h, state) {
  ctx.save();
  ctx.translate(x, y);
  // korg — handtag överst
  ctx.strokeStyle = 'rgba(217,163,95,.85)'; ctx.lineWidth = 7; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(w / 2, h * 0.06, w * 0.26, Math.PI, Math.PI * 2); ctx.stroke();
  // korg
  ctx.fillStyle = 'rgba(74,63,57,.15)';
  rr(4, 8, w, h, 22); ctx.fill();
  ctx.fillStyle = state === 'ok' ? '#d8f0e6' : (state === 'fel' ? '#ffe2da' : C.cream);
  rr(0, 0, w, h, 22); ctx.fill();
  ctx.strokeStyle = state === 'ok' ? C.mint : (state === 'fel' ? C.coral : 'rgba(74,63,57,.16)');
  ctx.lineWidth = state ? 6 : 4;
  rr(0, 0, w, h, 22); ctx.stroke();
  // flätat mönster
  ctx.strokeStyle = 'rgba(217,163,95,.35)'; ctx.lineWidth = 3;
  for (let i = 1; i < 4; i++) {
    ctx.beginPath(); ctx.moveTo(10, h * i / 4); ctx.lineTo(w - 10, h * i / 4); ctx.stroke();
  }
  // prickar = antalet stavelser
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = C.coral;
    ctx.beginPath();
    ctx.arc(w / 2 + (i - (n - 1) / 2) * 26, h * 0.56, 9, 0, 6.3);
    ctx.fill();
  }
  // siffra
  ctx.fillStyle = C.brown;
  ctx.font = 'bold 34px "Trebuchet MS", sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(String(n), w / 2, h * 0.20);
  ctx.restore();
}

function drawStars(n, x, y) {
  ctx.save();
  ctx.translate(x, y);
  for (let i = 0; i < 5; i++) {
    const on = i < n;
    star(0 + i * 34, 0, 13, on ? C.yellow : 'rgba(74,63,57,.14)');
  }
  ctx.restore();
}
function star(x, y, r, col) {
  ctx.save(); ctx.translate(x, y); ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5;
    const rr2 = i % 2 ? r * 0.46 : r;
    const px = Math.cos(a) * rr2, py = Math.sin(a) * rr2;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  ctx.restore();
}

function drawRoundBtn(x, y, r, col, icon) {
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = 'rgba(74,63,57,.16)';
  ctx.beginPath(); ctx.arc(2, 4, r, 0, 6.3); ctx.fill();
  ctx.fillStyle = col;
  ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.3); ctx.fill();
  ctx.restore();
  ctx.save(); ctx.translate(x, y);
  ctx.strokeStyle = C.cream; ctx.lineWidth = 5; ctx.lineCap = 'round';
  if (icon === 'home') {
    ctx.beginPath();
    ctx.moveTo(-13, 2); ctx.lineTo(0, -12); ctx.lineTo(13, 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-8, 2); ctx.lineTo(-8, 14); ctx.lineTo(8, 14); ctx.lineTo(8, 2); ctx.stroke();
  } else if (icon === 'back') {
    ctx.beginPath(); ctx.moveTo(8, -12); ctx.lineTo(-6, 0); ctx.lineTo(8, 12); ctx.stroke();
  }
  ctx.restore();
}