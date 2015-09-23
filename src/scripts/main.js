'use strict';
var extend = require('extend');

var Cards = require('./cards');

var cards = [];

var templates = {};
var compiledTemplates = [];
var $grid = $('.flexbox');

var cardsSport = require('./modules/cards-sport');


// get data based on query string param

// build tpl uid array. rm dupes

// get templates

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var dataID = getParameterByName('product') || 'core';
var allTemplates = [];

switch (dataID) {
  case 'sport':
    extend(Cards.prototype, cardsSport);
    break;
}

$.getJSON('../data/cards--' + dataID + '.json', function(result) {

  for (var i = 0; i < result.length; i++) {
    getTemplate(result[i]);
  }

});


function getTemplate(item) {

  $.get('../templates/card--' + item.template + '.html#card', function(html) {
    templates[item.template] = $(html);
    templateStuff(item);
  });

};

function templateStuff(data) {

  var source = templates[data.template].html();
  var template = Handlebars.compile(source);
  var context = data;
  var html = template(context);

  renderComponent(html);

}

function renderComponent(tpl) {
  console.log(compiledTemplates)


  // create grid element
  var $gridEl = $('<div>');

  $gridEl.addClass('flexbox__item palm-one-whole lap-one-whole desk-one-half desk-wide-one-third');
  $gridEl.append(tpl);

  $grid.append($gridEl);

  var allCards = document.querySelectorAll('.js-card');

  for (var i = 0; i < allCards.length; i++) {
    var args = {
      card: allCards[i],
      modules: {
        sport: true
      }
    }
    try {
      cards[i] = new Cards(args);
    } catch (e) {
      if (typeof console !== 'undefined') {
        console.error(e.stack);
      }
    }

  }
}