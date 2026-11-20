// art2.js — Enzo, pratbubbla och meny
function drawEnzo(x, y, mood, s) {
  s = s || 1;
  ctx.save();
  ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(74,63,57,.14)';
  ctx.beginPath(); ctx.ellipse(0, 2, 30, 7, 0, 0, 6.3); ctx.fill();
  ctx.strokeStyle = '#5c6b7a'; ctx.lineWidth = 11; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-11, -34); ctx.lineTo(-13, -4); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(11, -34); ctx.lineTo(13, -4); ctx.stroke();
  ctx.fillStyle = C.brown;
  rr(-22, -8, 20, 9, 4); ctx.fill();
  rr(4, -8, 20, 9, 4); ctx.fill();
  ctx.fillStyle = C.mint;
  rr(-25, -84, 50, 54, 16); ctx.fill();
  ctx.fillStyle = C.mintDark;
  rr(-25, -46, 50, 16, 8); ctx.fill();
  ctx.strokeStyle = C.mint; ctx.lineWidth = 12; ctx.lineCap = 'round';
  const wave = mood === 'happy' ? Math.sin(time * 9) * 0.45 : 0;
  ctx.save(); ctx.translate(-24, -76); ctx.rotate(-0.5 + wave);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 32); ctx.stroke(); ctx.restore();
  ctx.save(); ctx.translate(24, -76); ctx.rotate(0.5 - wave);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 32); ctx.stroke(); ctx.restore();
  ctx.fillStyle = '#f3e1cf';
  ctx.beginPath(); ctx.arc(-30 - wave * 12, -44, 7.5, 0, 6.3); ctx.fill();
  ctx.beginPath(); ctx.arc(30 + wave * 12, -44, 7.5, 0, 6.3); ctx.fill();
  rr(-8, -92, 16, 12, 5); ctx.fill();
  ctx.beginPath(); ctx.arc(0, -110, 25, 0, 6.3); ctx.fill();
  ctx.beginPath(); ctx.arc(-24, -110, 6, 0, 6.3); ctx.fill();
  ctx.beginPath(); ctx.arc(24, -110, 6, 0, 6.3); ctx.fill();
  ctx.fillStyle = '#ef8064';
  ctx.beginPath(); ctx.arc(0, -118, 25, Math.PI * 0.95, Math.PI * 2.05); ctx.fill();
  ctx.beginPath(); ctx.arc(0, -132, 6, 0, 6.3); ctx.fill();
  ctx.fillStyle = C.brown;
  const blink = (Math.floor(time * 0.9) % 7 === 0) ? 0.3 : 1;
  ctx.beginPath(); ctx.ellipse(-9, -114, 3.4, 3.4 * blink, 0, 0, 6.3); ctx.fill();
  ctx.beginPath(); ctx.ellipse(9, -114, 3.4, 3.4 * blink, 0, 0, 6.3); ctx.fill();
  ctx.strokeStyle = '#b0573f'; ctx.lineWidth = 2.6;
  ctx.beginPath();
  if (mood === 'happy') ctx.arc(0, -104, 8, 0.2, Math.PI - 0.2);
  else ctx.arc(0, -100, 6, Math.PI * 0.25, Math.PI * 0.75);
  ctx.stroke();
  ctx.fillStyle = 'rgba(239,128,100,.30)';
  ctx.beginPath(); ctx.arc(-16, -106, 5, 0, 6.3); ctx.fill();
  ctx.beginPath(); ctx.arc(16, -106, 5, 0, 6.3); ctx.fill();
  ctx.restore();
}

function drawTitle(txt, y) {
  ctx.save();
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = 'bold 52px "Trebuchet MS", sans-serif';
  ctx.fillStyle = 'rgba(74,63,57,.16)';
  ctx.fillText(txt, DW / 2 + 2, y + 4);
  ctx.fillStyle = C.brown;
  ctx.fillText(txt, DW / 2, y);
  ctx.restore();
}

function drawMenuButton(x, y, w, h, col, icon, label) {
  ctx.save();
  ctx.fillStyle = 'rgba(74,63,57,.16)';
  rr(x + 4, y + 8, w, h, 30); ctx.fill();
  ctx.fillStyle = C.cream;
  rr(x, y, w, h, 30); ctx.fill();
  ctx.strokeStyle = col; ctx.lineWidth = 7;
  rr(x, y, w, h, 30); ctx.stroke();
  const cx = x + w / 2, cy = y + h * 0.40;
  if (icon === 'rim') {
    drawCard('mus', cx - 78, cy - 70, 118, 148, { rot: -0.12 });
    drawCard('hus', cx + 4, cy - 62, 118, 148, { rot: 0.10 });
  } else {
    drawBasket(2, cx - 96, cy - 62, 92, 124, null);
    drawBasket(3, cx + 4, cy - 62, 92, 124, null);
  }
  ctx.fillStyle = C.brown;
  ctx.font = 'bold 30px "Trebuchet MS", sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(label, cx, y + h - 38);
  ctx.restore();
}