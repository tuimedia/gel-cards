'use strict';

var cards = [];
var templates = {};
var compiledTemplates = [];
var $grid = $('.js-example');


function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var dataID = getParameterByName('product') || 'core';
var tplID = getParameterByName('tpl') || null;
var allTemplates = [];

if (dataID !== 'core') {
  document.getElementsByTagName('body')[0].classList.add('gel-'+ dataID);
}

$.getJSON('./data/cards--' + dataID + '.json', function(result) {
  for (var i = 0; i < result.length; i++) {
    if(tplID) {
      if(result[i].template === tplID) {
        getTemplate(result[i], 0);
        return;
      }
    } else {
      getTemplate(result[i], i);
    }
  }
});


function getTemplate(item, index) {
  $.get('./templates/card--' + item.template + '.html#card', function(html) {
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

  $gridEl.addClass('gel-grid__item ' + data.gridClasses);
  $gridEl.append(tpl);
  $grid.append($gridEl);

  var theCard = document.querySelectorAll('.js-card')[index];

  var args = {
    card: theCard
  };
  try {
    switch (dataID) {
      case 'sport':
        if (typeof SportCards !== 'undefined') {
          cards[index] = new SportCards(args);
        } else {
          cards[index] = new Cards(args);
        }
        break;
      case 'news':
        if (typeof NewsCards !== 'undefined') {
          cards[index] = new NewsCards(args);
        } else {
          cards[index] = new Cards(args);
        }
        break;
      default:
        cards[index] = new Cards(args);
    }
  } catch (e) {
    if (typeof console !== 'undefined') {
      console.error(e.stack);
    }
  }
}
