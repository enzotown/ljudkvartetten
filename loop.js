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
  drawEnzo(78, 690, mood, 0.62);
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
  drawMenuButton(80, 200, 380, 370, C.mint, 'rim', 'Rimma');
  drawMenuButton(540, 200, 380, 370, C.coral, 'syl', 'Långt eller kort?');
  drawEnzo(80, 665, 'happy', 0.8);
  drawStars(stars, 760, 630);
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
  ctx.fillText('Vilken bra lyssnare!', 500, 410);
  ctx.fillStyle = C.brown2;
  ctx.font = '26px "Trebuchet MS", sans-serif';
  ctx.fillText('Tryck var som helst för att leka igen', 500, 460);
  ctx.restore();
  drawEnzo(160, 660, 'happy', 1.0);
  drawEnzo(840, 660, 'happy', 0.85);
}

function draw() {
  if (screen === 'menu') drawMenu();
  else if (screen === 'rimma') drawRimma();
  else if (screen === 'stavelse') drawStavelse();
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
  const wasSolved = (rim && rim.solved) || (syl && syl.solved);
  update(dt);
  if (rim && rim.solved && wasSolved && rim.solvedT < dt * 2) burstConfetti(500, 300);
  if (syl && syl.solved && syl.solvedT < dt * 2) burstConfetti(BASKET_X[syl.placed] + 90, BASKET_Y + 40);
  draw();
  requestAnimationFrame(frame);
}

resize();
preload();
requestAnimationFrame(frame);