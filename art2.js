// art2.js — Kotten (skolappars maskot), pratbubbla och meny
function drawKotten(x, y, mood, s) {
  s = s || 1;
  // skugga under fötterna, samma plats som den gamla gubben hade
  ctx.save();
  ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(74,63,57,.14)';
  ctx.beginPath(); ctx.ellipse(0, 2, 34, 8, 0, 0, 6.3); ctx.fill();
  ctx.restore();
  KOTTEN.drawAtFeet(ctx, x, y, 126 * s, {
    wave: mood === 'happy' ? Math.max(0, Math.sin(time * 9)) : 0.35
  });
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
  } else if (icon === 'ljud') {
    // högtalare + ett kort: "lyssna på ordet"
    drawSpeaker(cx - 74, cy - 6, 44, true);
    drawCard('apelsin', cx + 4, cy - 74, 92, 118, { rot: 0.06 });
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