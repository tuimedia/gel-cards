# Usage

var cards = [];

(function() {

  'use strict';

  allCards = document.querySelectorAll('.js-card');

  for (var i = 0; i < allCards.length; i++) {
    try {
      cards[i] = new Cards(allCards[i]);
    } catch (e) {
      if (typeof console !== 'undefined') {
        console.error(e.stack);
      }
    }
  }

}());