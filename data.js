// data.js — orden, rimmen och stavelserna
const WORDS = {
  mus:      { e: '🐭', syl: 1 },
  hus:      { e: '🏠', syl: 1 },
  katt:     { e: '🐱', syl: 1 },
  hatt:     { e: '🎩', syl: 1 },
  sol:      { e: '☀️', syl: 1 },
  stol:     { e: '🪑', syl: 1 },
  bil:      { e: '🚗', syl: 1 },
  pil:      { e: '🏹', syl: 1 },
  boll:     { e: '⚽', syl: 1 },
  troll:    { e: '🧌', syl: 1 },
  gris:     { e: '🐷', syl: 1 },
  spis:     { e: '🍳', syl: 1 },
  kaka:     { e: '🍪', syl: 2 },
  blomma:   { e: '🌸', syl: 2 },
  bilar:    { e: '🚙', syl: 2 },
  kaninen:  { e: '🐰', syl: 3 },
  fjärilen: { e: '🦋', syl: 3 },
  apelsin:  { e: '🍊', syl: 3 }
};

// rimpar: samma ändelse, olika betydelse
const PAIRS = [
  ['mus', 'hus'], ['katt', 'hatt'], ['sol', 'stol'],
  ['bil', 'pil'], ['boll', 'troll'], ['gris', 'spis']
];

const ALL_WORDS = Object.keys(WORDS);
const SYL_WORDS = ALL_WORDS.slice();