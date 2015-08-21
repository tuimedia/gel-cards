'use strict';

var Cards = require('./cards'),
  cards = [],
  allCards,
  html = document.querySelectorAll('html');

html[0].classList.remove('no-js');

allCards = document.querySelectorAll('.js-card');

console.dir(Cards);

for (var i = 0; i < allCards.length; i++) {
  try {
    cards[i] = new Cards(allCards[i]);
  } catch (e) {
    if (typeof console !== 'undefined') {
      console.error(e.stack);
    }
  }
}