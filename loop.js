// loop.js — ritar de tre skärmarna och driver spelet
let confetti = [];

function burstConfetti(x, y) {
  for (let i = 0; i < 30; i++) {
    confetti.push({
      x: x, y: y, vx: (Math.random() - 0.5) * 420, vy: -Math.random() * 420 - 80,
      life: 1.2 + Math.random(), rot: Math.random() * 6,
      col: [C.mint, C.coral, C.yellow, C.plum][i % 4], sz: 6 + Math.random() * 6
    });
  }
}

function update(dt) {
  time += dt;
  if (rim) {
    if (rim.wrongT > 0) rim.wrongT -= dt;
    if (rim.solved) {
      rim.solvedT += dt;
      if (rim.solvedT > 1.5) nextRimma();
    }
  }
  if (ljud) {
    if (ljud.wrongT > 0) ljud.wrongT -= dt;
    if (ljud.solved) {
      ljud.solvedT += dt;
      if (ljud.solvedT > 1.6) nextLjud();
    }
  }
  if (syl) {
    if (syl.wrongT > 0) syl.wrongT -= dt;
    if (syl.solved) {
      syl.solvedT += dt;
      if (syl.solvedT > 1.6) nextStavelse();
    }
  }
  for (let i = confetti.length - 1; i >= 0; i--) {
    const c = confetti[i];
    c.life -= dt; c.vy += 900 * dt;
    c.x += c.vx * dt; c.y += c.vy * dt; c.rot += dt * 7;
    if (c.life <= 0) confetti.splice(i, 1);
  }
}

function drawTopBar(withBack) {
  if (withBack) drawRoundBtn(58, 58, 36, C.mint, 'back');
  drawStars(stars, 760, 58);
  ctx.save();
  ctx.restore();
  drawKotten(78, 690, mood, 0.62);
}

function drawMenu() {
  drawBg();
  drawTitle('Ljudkvartetten', 88);
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = C.brown2;
  ctx.font = '24px "Trebuchet MS", sans-serif';
  ctx.fillText('Lyssna — och hitta det som låter likadant', DW / 2, 132);
  ctx.restore();
  drawMenuButton(55, 205, 300, 355, C.mint, 'rim', 'Rimma');
  drawMenuButton(370, 205, 300, 355, C.coral, 'syl', 'Långt eller kort?');
  drawMenuButton(685, 205, 300, 355, C.plum, 'ljud', 'Första ljudet');
  drawKotten(66, 668, 'happy', 0.74);
  drawStars(stars, 780, 636);
}

function drawRimma() {
  drawBg();
  drawTopBar(true);
  if (!rim) return;
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = C.brown;
  ctx.font = 'bold 30px "Trebuchet MS", sans-serif';
  ctx.fillText('Vilket rimmar på ' + rim.target + '?', 500, 342);
  ctx.restore();

  const shake = rim.wrongT > 0 ? Math.sin(rim.wrongT * 40) * 6 : 0;
  const solvedZoom = rim.solved ? Math.min(1, rim.solvedT * 2) : 0;
  drawCard(rim.target, 400 - solvedZoom * 6, 62 - solvedZoom * 4, 200, 250, {
    hi: rim.solved, scale: 1 + solvedZoom * 0.06, lift: solvedZoom * 6
  });
  drawSpeaker(666, 150, 38, !rim.solved && rim.solvedT === 0);

  for (let i = 0; i < 3; i++) {
    const w = rim.choices[i];
    const cx = [95, 400, 705][i];
    let x = cx, y = 366, sc = 1, lift = 0;
    if (rim.solved && rim.pick !== undefined) {
      if (i === rim.pick) {
        const t = Math.min(1, rim.solvedT / 0.5);
        const e = 1 - Math.pow(1 - t, 3);
        x = cx + (400 - cx) * e;
        y = 366 + (62 - 366) * e;
        sc = 1 - 0.15 * e;
        lift = Math.sin(t * Math.PI) * 40;
      } else {
        sc = 1 - Math.min(0.12, rim.solvedT * 0.2);
      }
    }
    if (rim.wrong === i && rim.wrongT > 0) x += shake;
    drawCard(w, x, y, 200, 240, {
      scale: sc, lift: lift,
      wrong: rim.wrong === i && rim.wrongT > 0,
      hi: rim.solved && i === rim.pick
    });
  }
}

function drawLjud() {
  drawBg();
  drawTopBar(true);
  if (!ljud) return;
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = C.brown;
  ctx.font = 'bold 30px "Trebuchet MS", sans-serif';
  ctx.fillText('Vilket ord börjar med samma ljud?', 500, 342);
  ctx.restore();

  const shake = ljud.wrongT > 0 ? Math.sin(ljud.wrongT * 40) * 6 : 0;
  const solvedZoom = ljud.solved ? Math.min(1, ljud.solvedT * 2) : 0;
  drawCard(ljud.target, 400 - solvedZoom * 6, 62 - solvedZoom * 4, 200, 250, {
    hi: ljud.solved, scale: 1 + solvedZoom * 0.06, lift: solvedZoom * 6
  });
  drawSpeaker(666, 150, 38, !ljud.solved && ljud.solvedT === 0);

  for (let i = 0; i < 3; i++) {
    const w = ljud.choices[i];
    const cx = [95, 400, 705][i];
    let x = cx, y = 366, sc = 1, lift = 0;
    if (ljud.solved && ljud.pick === i) {
      const t = Math.min(1, ljud.solvedT / 0.5);
      const e = 1 - Math.pow(1 - t, 3);
      x = cx + (400 - cx) * e;
      y = 366 + (62 - 366) * e;
      sc = 1 - 0.15 * e;
      lift = Math.sin(t * Math.PI) * 40;
    } else if (ljud.solved) {
      sc = 1 - Math.min(0.12, ljud.solvedT * 0.2);
    }
    if (ljud.wrong === i && ljud.wrongT > 0) x += shake;
    drawCard(w, x, y, 200, 240, {
      scale: sc, lift: lift,
      wrong: ljud.wrong === i && ljud.wrongT > 0,
      hi: ljud.solved && i === ljud.pick
    });
  }
}

function drawStavelse() {
  drawBg();
  drawTopBar(true);
  if (!syl) return;
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = C.brown;
  ctx.font = 'bold 30px "Trebuchet MS", sans-serif';
  ctx.fillText('Hur många klappar? Dra kortet till rätt korg.', 500, 78);
  ctx.restore();

  for (let i = 0; i < 3; i++) {
    const st = (syl.solved && syl.placed === i) ? 'ok' : (syl.wrong === i && syl.wrongT > 0 ? 'fel' : null);
    drawBasket(i + 1, BASKET_X[i], BASKET_Y, BASKET_W, BASKET_H, st);
  }
  drawSpeaker(660, 280, 38, !syl.solved);
  const bx = syl.drag ? syl.x : CARD_HOME_X;
  const by = syl.drag ? syl.y : CARD_HOME_Y;
  const lift = syl.solved ? Math.min(14, syl.solvedT * 30) : (syl.drag ? 10 : 0);
  drawCard(syl.word, bx, by, CARD_W, CARD_H, { lift: lift, hi: syl.solved });
}

function drawDone() {
  drawBg();
  const bob = Math.sin(time * 3) * 8;
  ctx.save();
  ctx.textAlign = 'center';
  star(500, 250 + bob, 90, C.yellow);
  ctx.fillStyle = C.brown;
  ctx.font = 'bold 56px "Trebuchet MS", sans-serif';
  ctx.fillText('Vilken bra lyssnare!', 500, 415);

  // stor rund "igen"-knapp — ett barn ska se att det går att trycka
  const k = 1 + 0.035 * Math.sin(time * 6.2), R = 58 * k;
  ctx.fillStyle = 'rgba(0,0,0,.10)';
  ctx.beginPath(); ctx.ellipse(500, 560 + R * 0.14, R * 2.08, R * 2.0, 0, 0, 6.3); ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(500, 560, R * 2.2, 0, 6.3); ctx.fill();
  ctx.fillStyle = C.mint || '#63bda8';
  ctx.beginPath(); ctx.arc(500, 560, R * 2.0, 0, 6.3); ctx.fill();
  ctx.strokeStyle = '#fff'; ctx.lineWidth = R * 0.2; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(500, 560, R * 0.66, -2.9, 2.0); ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(500 + R * 0.22, 560 - R * 0.86);
  ctx.lineTo(500 + R * 1.0, 560 - R * 0.6);
  ctx.lineTo(500 + R * 0.42, 560 - R * 0.16);
  ctx.closePath(); ctx.fill();
  ctx.restore();
  drawKotten(160, 660, 'happy', 1.0);
  drawKotten(840, 660, 'happy', 0.85);
}

function draw() {
  if (screen === 'menu') drawMenu();
  else if (screen === 'rimma') drawRimma();
  else if (screen === 'stavelse') drawStavelse();
  else if (screen === 'ljud') drawLjud();
  else drawDone();

  for (let i = 0; i < confetti.length; i++) {
    const c = confetti[i];
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, c.life));
    ctx.translate(c.x, c.y); ctx.rotate(c.rot);
    ctx.fillStyle = c.col;
    rr(-c.sz / 2, -c.sz / 2, c.sz, c.sz * 0.7, 2); ctx.fill();
    ctx.restore();
  }
}

let last = performance.now();
function frame(now) {
  let dt = (now - last) / 1000; last = now;
  if (dt > 0.05) dt = 0.05;
  const wasSolved = (rim && rim.solved) || (syl && syl.solved) || (ljud && ljud.solved);
  update(dt);
  if (rim && rim.solved && wasSolved && rim.solvedT < dt * 2) burstConfetti(500, 300);
  if (syl && syl.solved && syl.solvedT < dt * 2) burstConfetti(BASKET_X[syl.placed] + 90, BASKET_Y + 40);
  if (ljud && ljud.solved && ljud.solvedT < dt * 2) burstConfetti(500, 300);
  draw();
  requestAnimationFrame(frame);
}

resize();
preload();
requestAnimationFrame(frame);