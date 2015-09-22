'use strict';

var Cards = require('./cards');

var cards = [];

var templates = {};
var compiledTemplates = [];
var $grid = $('.flexbox');

$.when(

  $.get("../templates/card--video.html#card", function(html) {
    templates.video = $(html);
  }),
  $.get("../templates/card--gallery.html#card", function(html) {
    templates.gallery = $(html);
  }),
  $.get("../templates/card--audio.html#card", function(html) {
    templates.audio = $(html);
  })

).then(function() {

  $.getJSON('../data/cards--basic.json', function(result) {
    templateStuff(result);
  });

});


function templateStuff(data) {

  for (var i = 0; i < data.length; i++) {
    console.log(data[i])
    var source = templates[data[i].template].html();
    var template = Handlebars.compile(source);
    var context = data[i];
    var html = template(context);
    compiledTemplates.push(html);
  }

  renderComponents();

}

function renderComponents() {

  for (var i = 0; i < compiledTemplates.length; i++) {

    // create grid element
    var $gridEl = $('<div>');

    $gridEl.addClass('flexbox__item one-whole lap-and-up-one-half desk-one-third');
    $gridEl.append(compiledTemplates[i]);

    $grid.append($gridEl);

  }

  var allCards = document.querySelectorAll('.js-card');

  for (var i = 0; i < allCards.length; i++) {

    try {
      cards[i] = new Cards(allCards[i]);
    } catch (e) {
      if (typeof console !== 'undefined') {
        console.error(e.stack);
      }
    }

  }
}