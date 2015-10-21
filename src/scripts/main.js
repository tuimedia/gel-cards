'use strict';
var extend = require('extend');

var Cards = require('./cards');
var cardsSport = require('./modules/cards-sport');
var cardsNews = require('./modules/cards-news');
var cards = [];
var templates = {};
var compiledTemplates = [];
var $grid = $('.flexbox');


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
  case 'news':
    extend(Cards.prototype, cardsNews);
    break;
}

$.getJSON('../data/cards--' + dataID + '.json', function(result) {

  for (var i = 0; i < result.length; i++) {
    getTemplate(result[i], i);
  }

});


function getTemplate(item, index) {

  $.get('../templates/card--' + item.template + '.html#card', function(html) {
    templates[item.template] = $(html);
    templateStuff(item, index);
  });

};

function templateStuff(data, index) {

  var source = templates[data.template].html();
  var template = Handlebars.compile(source);
  var context = data;
  var html = template(context);

  renderComponent(html, index, data);

}

function renderComponent(tpl, index, data) {

  // create grid element
  var $gridEl = $('<div>');

  $gridEl.addClass('flexbox__item ' + data.gridClasses);

  $gridEl.append(tpl);

  $grid.append($gridEl);

  var theCard = document.querySelectorAll('.js-card')[index];

  var args = {
    card: theCard,
    modules: {
      sport: true
    }
  }
  try {
    cards[index] = new Cards(args);
  } catch (e) {
    if (typeof console !== 'undefined') {
      console.error(e.stack);
    }
  }
}