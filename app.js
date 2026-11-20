// app.js — skärmar, meny och rimövningen
let screen = 'menu', stars = 0, round = 0, time = 0;
let rim = null, syl = null, fly = null, flash = 0, mood = 'calm';

function toMenu() {
  screen = 'menu'; rim = null; syl = null; fly = null; round = 0;
  speakQueue.length = 0; speaking = false;
}

function startRimma() {
  screen = 'rimma'; round = 0; rim = null; syl = null; fly = null;
  nextRimma();
}

function nextRimma() {
  round++;
  if (round > 6) { screen = 'done'; mood = 'happy'; chime(); say('p-bra'); return; }
  const pairs = shuffle(PAIRS.slice());
  const pair = pairs[0];
  const target = pair[0], answer = pair[1];
  const others = ALL_WORDS.filter(function (w) { return w !== target && w !== answer; });
  shuffle(others);
  const choices = shuffle([answer, others[0], others[1]]);
  rim = {
    target: target, answer: answer, choices: choices,
    wrong: -1, wrongT: 0, solved: false, solvedT: 0, pop: 0, cardAnim: [0, 0, 0]
  };
  say('q-' + target);
}

function pickRimma(i) {
  if (!rim || rim.solved) return;
  const w = rim.choices[i];
  if (w === rim.answer) {
    rim.solved = true; rim.solvedT = 0; rim.pick = i;
    stars = Math.min(5, stars + 1); mood = 'happy';
    chime(); say('p-ratt');
    fly = { i: i, t: 0 };
  } else {
    rim.wrong = i; rim.wrongT = 0;
    bleepNo(); say('p-nej');
    setTimeout(function () { if (rim && !rim.solved) say('w-' + rim.target); }, 1400);
  }
}

// ---------------------------------------------------------------- stavelser
function startStavelse() {
  screen = 'stavelse'; round = 0; syl = null; rim = null; fly = null;
  nextStavelse();
}

function nextStavelse() {
  round++;
  if (round > 8) { screen = 'done'; mood = 'happy'; chime(); say('p-bra'); return; }
  const pool = shuffle(SYL_WORDS.slice());
  const word = pool[0];
  syl = {
    word: word, drag: false, x: 0, y: 0, dx: 0, dy: 0,
    wrong: -1, wrongT: 0, solved: false, solvedT: 0, pop: 0, placed: -1
  };
  say('w-' + word);
}

const BASKET_X = [90, 410, 730], BASKET_Y = 470, BASKET_W = 180, BASKET_H = 175;
const CARD_W = 200, CARD_H = 250, CARD_HOME_X = 400, CARD_HOME_Y = 105;

function basketAt(x, y) {
  for (let i = 0; i < 3; i++) {
    if (x > BASKET_X[i] - 10 && x < BASKET_X[i] + BASKET_W + 10 &&
        y > BASKET_Y - 40 && y < BASKET_Y + BASKET_H) return i;
  }
  return -1;
}

function dropSyl(x, y) {
  if (!syl || syl.solved) return;
  const b = basketAt(x, y);
  if (b < 0) { syl.drag = false; return; }
  const n = WORDS[syl.word].syl;
  if (b + 1 === n) {
    syl.solved = true; syl.solvedT = 0; syl.placed = b; syl.drag = false;
    stars = Math.min(5, stars + 1); mood = 'happy';
    drumSound(n); say('p-ratt');
  } else {
    syl.wrong = b; syl.wrongT = 0; syl.drag = false;
    bleepNo(); say('p-nej');
    setTimeout(function () { if (syl && !syl.solved) say('w-' + syl.word); }, 1500);
  }
}

// ---------------------------------------------------------------- inmatning
function onDown(e) {
  e.preventDefault();
  audio();
  const p = toDesign(e);

  if (screen === 'menu') {
    if (p.x > 80 && p.x < 460 && p.y > 200 && p.y < 560) { startRimma(); return; }
    if (p.x > 540 && p.x < 920 && p.y > 200 && p.y < 560) { startStavelse(); return; }
    return;
  }
  if (screen === 'done') { toMenu(); return; }
  if (p.x < 80 && p.y < 100) { toMenu(); return; }

  if (screen === 'rimma' && rim) {
    if (!rim.solved) {
      if (Math.hypot(p.x - 660, p.y - 150) < 46) { say('q-' + rim.target); return; }
      for (let i = 0; i < 3; i++) {
        const cx = [95, 400, 705][i];
        if (p.x > cx - 10 && p.x < cx + CARD_W + 10 && p.y > 360 && p.y < 620) { pickRimma(i); return; }
      }
    }
    return;
  }
  if (screen === 'stavelse' && syl) {
    if (syl.solved) return;
    if (p.x > CARD_HOME_X && p.x < CARD_HOME_X + CARD_W && p.y > CARD_HOME_Y && p.y < CARD_HOME_Y + CARD_H) {
      syl.drag = true; syl.dx = p.x - CARD_HOME_X; syl.dy = p.y - CARD_HOME_Y;
      syl.x = CARD_HOME_X; syl.y = CARD_HOME_Y;
      return;
    }
    if (Math.hypot(p.x - 660, p.y - 280) < 46) { say('w-' + syl.word); return; }
    const b = basketAt(p.x, p.y);
    if (b >= 0) { dropSyl(p.x, p.y); }
  }
}

function onMove(e) {
  e.preventDefault();
  if (!syl || !syl.drag) return;
  const p = toDesign(e);
  syl.x = p.x - syl.dx; syl.y = p.y - syl.dy;
}

function onUp(e) {
  e.preventDefault();
  if (!syl || !syl.drag) return;
  const p = toDesign(e);
  dropSyl(p.x, p.y);
  if (!syl.solved) { syl.drag = false; syl.x = CARD_HOME_X; syl.y = CARD_HOME_Y; }
}

cv.addEventListener('pointerdown', onDown);
cv.addEventListener('pointermove', onMove);
cv.addEventListener('pointerup', onUp);
cv.addEventListener('pointercancel', onUp);