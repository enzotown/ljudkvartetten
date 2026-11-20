// pics.js — bilderna till orden, ritade i samma stil som de andra spelen
function drawPic(w, x, y, s) {
  const f = PICS[w];
  if (!f) return;
  ctx.save();
  ctx.translate(x, y); ctx.scale(s / 100, s / 100);
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  f();
  ctx.restore();
}
function ellipse(x, y, rx, ry, col) {
  ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.3); ctx.fill();
}
function circle(x, y, r, col) { ellipse(x, y, r, r, col); }
function box(x, y, w, h, col, r) { ctx.fillStyle = col; rr(x, y, w, h, r || 4); ctx.fill(); }
function tri(x1, y1, x2, y2, x3, y3, col) {
  ctx.fillStyle = col; ctx.beginPath();
  ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3); ctx.closePath(); ctx.fill();
}
function line(x1, y1, x2, y2, col, w) {
  ctx.strokeStyle = col; ctx.lineWidth = w || 4;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
}

const PICS = {
  mus: function () {
    ellipse(30, 62, 26, 18, '#b9b3ab');
    circle(66, 46, 21, '#c8c2ba');
    circle(52, 32, 12, '#a8a29a'); circle(52, 32, 6, '#e7a9a2');
    circle(58, 20, 12, '#a8a29a'); circle(58, 20, 6, '#e7a9a2');
    circle(74, 42, 3.4, '#3b3833'); circle(86, 50, 4, '#f0a49c');
    ctx.strokeStyle = '#b9b3ab'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(6, 64); ctx.quadraticCurveTo(-6, 46, 14, 38); ctx.stroke();
  },
  hus: function () {
    box(20, 46, 60, 40, '#f6e2c4', 4);
    tri(10, 48, 50, 12, 90, 48, '#ef8064');
    box(42, 62, 16, 24, '#a8722f', 3);
    box(26, 54, 12, 12, '#9fdcf3', 2); box(64, 54, 12, 12, '#9fdcf3', 2);
    box(62, 16, 8, 16, '#c9553f', 2);
  },
  katt: function () {
    circle(50, 56, 30, '#e8b06a');
    tri(24, 34, 30, 10, 46, 26, '#e8b06a');
    tri(76, 34, 70, 10, 54, 26, '#e8b06a');
    circle(39, 52, 5, '#3b3833'); circle(61, 52, 5, '#3b3833');
    tri(46, 62, 54, 62, 50, 68, '#c9553f');
    line(20, 60, 36, 62, '#3b3833', 2.5); line(20, 68, 36, 66, '#3b3833', 2.5);
    line(80, 60, 64, 62, '#3b3833', 2.5); line(80, 68, 64, 66, '#3b3833', 2.5);
  },
  hatt: function () {
    ellipse(50, 74, 42, 9, '#3b3a44');
    box(28, 20, 44, 52, '#3b3a44', 6);
    box(28, 56, 44, 10, '#ef8064', 2);
    ellipse(50, 76, 42, 6, '#2c2b33');
  },
  sol: function () {
    ctx.strokeStyle = '#f6c33d'; ctx.lineWidth = 6;
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6;
      line(50 + Math.cos(a) * 30, 50 + Math.sin(a) * 30, 50 + Math.cos(a) * 44, 50 + Math.sin(a) * 44, '#f6c33d', 6);
    }
    circle(50, 50, 28, '#ffd44d'); circle(42, 42, 9, '#ffe9a3');
  },
  stol: function () {
    box(34, 8, 12, 56, '#c98b4b', 4);
    box(30, 52, 46, 10, '#d9a35f', 4);
    box(34, 10, 38, 8, '#d9a35f', 3);
    box(34, 62, 8, 28, '#b07c3e', 3); box(68, 62, 8, 28, '#b07c3e', 3);
  },
  bil: function () {
    box(10, 54, 80, 20, '#ef8064', 8);
    rr(26, 34, 44, 22, 8); ctx.fillStyle = '#ef8064'; ctx.fill();
    box(32, 38, 16, 14, '#cfe9f6', 3); box(52, 38, 14, 14, '#cfe9f6', 3);
    circle(28, 76, 9, '#3b3a44'); circle(72, 76, 9, '#3b3a44');
    circle(28, 76, 4, '#d8dbe2'); circle(72, 76, 4, '#d8dbe2');
  },
  pil: function () {
    line(14, 86, 78, 22, '#b07c3e', 7);
    tri(86, 10, 88, 34, 62, 14, '#3b3a44');
    tri(14, 86, 10, 62, 34, 80, '#7bcbb6');
    tri(14, 86, 34, 92, 22, 74, '#7bcbb6');
  },
  boll: function () {
    circle(50, 52, 32, '#fffaf3');
    ctx.strokeStyle = '#4a3f39'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(50, 52, 32, 0, 6.3); ctx.stroke();
    circle(50, 52, 11, '#4a3f39');
    tri(40, 26, 60, 26, 50, 38, '#4a3f39');
    tri(18, 60, 30, 74, 16, 76, '#4a3f39');
    tri(82, 60, 70, 74, 84, 76, '#4a3f39');
  },
  troll: function () {
    circle(50, 56, 30, '#7fbf8a');
    circle(50, 60, 13, '#e3c894');
    circle(38, 40, 7, '#ffd44d'); circle(62, 40, 7, '#ffd44d');
    circle(38, 40, 3, '#3b3a44'); circle(62, 40, 3, '#3b3a44');
    ctx.fillStyle = '#4f8a5c';
    ctx.beginPath(); ctx.moveTo(24, 34); ctx.quadraticCurveTo(34, 8, 52, 24); ctx.quadraticCurveTo(66, 6, 78, 34); ctx.fill();
    circle(43, 86, 5, '#e3c894'); circle(57, 86, 5, '#e3c894');
  },
  gris: function () {
    ellipse(46, 58, 34, 24, '#f0a8bb');
    circle(80, 48, 18, '#f5bccb');
    ellipse(86, 50, 9, 7, '#e88ba4');
    circle(84, 50, 2.4, '#3b3a44'); circle(90, 50, 2.4, '#3b3a44');
    tri(66, 34, 74, 20, 80, 36, '#f0a8bb');
    circle(74, 42, 3, '#3b3a44');
    ctx.strokeStyle = '#e88ba4'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(10, 56, 7, 0, 5); ctx.stroke();
    line(30, 80, 30, 92, '#e88ba4', 5); line(58, 80, 58, 92, '#e88ba4', 5);
  },
  spis: function () {
    box(14, 20, 72, 68, '#d8dde3', 6);
    box(14, 34, 72, 10, '#b7bec7', 2);
    circle(34, 28, 8, '#3b3a44'); circle(66, 28, 8, '#3b3a44');
    circle(34, 28, 4, '#ef8064');
    box(26, 52, 48, 26, '#4a3f39', 4);
    box(30, 56, 40, 12, '#cfe9f6', 3);
    box(30, 76, 40, 5, '#b7bec7', 2);
  },
  kaka: function () {
    circle(50, 52, 32, '#d9a05f');
    circle(50, 50, 32, '#e8b878');
    circle(40, 40, 5, '#6b4326'); circle(60, 46, 5, '#6b4326');
    circle(46, 64, 4.5, '#6b4326'); circle(64, 66, 4, '#6b4326');
    circle(34, 56, 3.6, '#6b4326');
  },
  blomma: function () {
    line(50, 58, 50, 92, '#4f8a5c', 5);
    ctx.fillStyle = '#5bb07a';
    ctx.beginPath(); ctx.ellipse(64, 78, 13, 7, -0.5, 0, 6.3); ctx.fill();
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 3;
      ellipse(50 + Math.cos(a) * 18, 42 + Math.sin(a) * 18, 12, 12, '#ef8064');
    }
    circle(50, 42, 11, '#ffd44d');
  }
};