'use strict';

Cards.prototype.initPoll = function() {

  var classes = [
    '.js-poll',
    '.js-poll-option'
  ];

  // check if all html classes are present and correct. If not, back the fuck out
  for (var i = 0; i < classes.length; i++) {
    if (!this.card.querySelectorAll(classes[i]).length) return;
  };

  this.poll = {
    container: this.card.querySelectorAll('.js-poll')[0],
    options: this.card.querySelectorAll('.js-poll-option'),
    states: {
      isAnswered: false,
      isCorrect: false
    }
  };

};
