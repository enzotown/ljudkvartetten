// pics2.js — de sista bilderna
Object.assign(PICS, {
  bilar: function () {
    ctx.save(); ctx.translate(2, 8); ctx.scale(0.55, 0.55);
    box(6, 46, 78, 20, '#7bcbb6', 8);
    rr(22, 26, 44, 22, 8); ctx.fillStyle = '#7bcbb6'; ctx.fill();
    box(28, 30, 14, 14, '#cfe9f6', 3); box(48, 30, 12, 14, '#cfe9f6', 3);
    circle(24, 68, 9, '#3b3a44'); circle(66, 68, 9, '#3b3a44');
    ctx.restore();
    ctx.save(); ctx.translate(34, 40); ctx.scale(0.6, 0.6);
    box(6, 46, 78, 20, '#ef8064', 8);
    rr(22, 26, 44, 22, 8); ctx.fillStyle = '#ef8064'; ctx.fill();
    box(28, 30, 14, 14, '#cfe9f6', 3); box(48, 30, 12, 14, '#cfe9f6', 3);
    circle(24, 68, 9, '#3b3a44'); circle(66, 68, 9, '#3b3a44');
    ctx.restore();
  },
  kaninen: function () {
    ellipse(52, 66, 26, 24, '#f5f0e8');
    circle(64, 38, 18, '#f5f0e8');
    ellipse(58, 14, 7, 22, '#f5f0e8'); ellipse(58, 14, 3.5, 15, '#f0b5b5');
    ellipse(74, 16, 7, 20, '#f5f0e8'); ellipse(74, 16, 3.5, 14, '#f0b5b5');
    circle(70, 36, 3, '#3b3a44'); circle(80, 40, 3, '#e88ba4');
    line(16, 62, 30, 64, '#c9c2b8', 2.5); line(16, 70, 30, 68, '#c9c2b8', 2.5);
    circle(26, 74, 8, '#f5f0e8');
  },
  fjärilen: function () {
    ellipse(30, 34, 20, 16, '#8f7bbf');
    ellipse(70, 34, 20, 16, '#8f7bbf');
    ellipse(28, 64, 16, 13, '#b3a3d9');
    ellipse(72, 64, 16, 13, '#b3a3d9');
    box(46, 24, 8, 56, '#4a3f39', 4);
    ctx.strokeStyle = '#4a3f39'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(50, 24); ctx.quadraticCurveTo(42, 8, 34, 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(50, 24); ctx.quadraticCurveTo(58, 8, 66, 12); ctx.stroke();
    circle(34, 12, 3, '#4a3f39'); circle(66, 12, 3, '#4a3f39');
    circle(30, 34, 6, '#ffd44d'); circle(70, 34, 6, '#ffd44d');
  },
  apelsin: function () {
    circle(50, 54, 32, '#f0913a');
    circle(50, 54, 32, '#f7a34d');
    circle(38, 42, 10, '#f9bd80');
    ctx.fillStyle = '#5bb07a';
    ctx.beginPath(); ctx.ellipse(66, 20, 14, 8, -0.5, 0, 6.3); ctx.fill();
    line(50, 28, 52, 22, '#4f8a5c', 4);
  }
});