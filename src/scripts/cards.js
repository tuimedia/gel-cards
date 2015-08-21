'use strict';
var extend = require('extend'),
  gallery = require('./modules/gallery'),
  poll = require('./modules/poll'),
  video = require('./modules/video');

var Cards = module.exports = function Cards(card) {

  if (!(this instanceof Cards)) {
    return new Cards(card);
  }

  this.card = card;

  if (this.card) {
    this.init();
  }

};

extend(Cards.prototype, gallery, poll, video);

Cards.prototype.init = function(args) {

  var _this = this;

  // store attributes
  this.attrs = this.card.dataset;

  // card section wrappers - used for transforms
  this.card.cardMedia = this.card.querySelectorAll('.card__media')[0];
  this.card.cardContent = this.card.querySelectorAll('.card__content')[0];
  this.card.cardToolbar = this.card.querySelectorAll('.card__toolbar')[0];


  try {
    this.initPoll();
  } catch (e) {
    if (typeof console !== 'undefined') {
      console.error(e.stack);
    }
  }

  try {
    this.initGallery();
  } catch (e) {
    if (typeof console !== 'undefined') {
      console.error(e.stack);
    }
  }

  try {
    this.initVideo();
  } catch (e) {
    if (typeof console !== 'undefined') {
      console.error(e.stack);
    }
  }

  if (this.card.querySelectorAll('.js-share-cta')[0]) {

    this.hasShareCTA = true;

    this.share = {
      shareCTA: this.card.querySelectorAll('.js-share-cta')[0],
      states: {
        panelOpen: false
      }
    };

  }

  if (this.card.querySelectorAll('.js-love-cta')[0]) {

    this.hasLoveCTA = true;

    this.love = {
      trigger: this.card.querySelectorAll('.js-love-cta')[0],
      container: this.card.querySelectorAll('.js-love')[0],
      states: {
        isLoved: false
      }
    };

  }

  if (this.card.querySelectorAll('.js-add-cta')[0]) {

    this.hasAddCTA = true;

    this.add = {
      trigger: this.card.querySelectorAll('.js-add-cta')[0],
      container: this.card.querySelectorAll('.js-add')[0],
      states: {
        isAdded: false
      }
    };

  }

  // hidden panel overlay thing
  if (this.card.querySelectorAll('.js-panel')[0] && this.card.querySelectorAll('.js-more')[0]) {

    this.hasPanel = true;

    // store panel element
    this.panel = {
      container: this.card.querySelectorAll('.js-panel')[0],
      trigger: this.card.querySelectorAll('.js-more')[0],
      triggerText: this.card.querySelectorAll('.js-panel-trigger-label')[0],
      states: {
        panelOpen: false
      }
    };

  }


  if (this.card.dataset.cardBgUrl) {

    this.hasBackgroundImage = true;
    this.card.classList.add('trans-bg');
    this.card.style.background = 'url(' + this.card.dataset.cardBgUrl + ')';
    this.card.style.backgroundSize = 'cover';

  }


  // bind events to card elements
  this.bindEvents();

};

Cards.prototype.bindEvents = function() {

  var _this = this;


  if (this.hasShareCTA) {

    this.share.shareCTA.addEventListener('click', function(event) {

      _this.handlePanels('share');

    });

  }


  if (this.hasPanel) {

    this.panel.trigger.addEventListener('click', function(event) {

      _this.handlePanels('info');

    });

  }

  if (this.hasLoveCTA) {

    this.love.trigger.addEventListener('click', function(event) {

      _this.handlePanels('love');

    });

  }


  if (this.hasAddCTA) {

    this.add.trigger.addEventListener('click', function(event) {

      _this.handlePanels('add');

    });

  }

};

Cards.prototype.handlePanels = function(panel) {

  switch (panel) {
    case 'love':

      this.love.panelOpen ? this.hidePanel(panel) : this.showPanel(panel);

      this.card.classList.toggle('love-panel-active');

      break;
    case 'add':

      this.add.panelOpen ? this.hidePanel(panel) : this.showPanel(panel);

      this.card.classList.toggle('add-panel-active');

      break;
    case 'info':

      this.panel.panelOpen ? this.hidePanel(panel) : this.showPanel(panel);

      this.card.classList.toggle('is-active');

      break;
    case 'share':

      this.share.panelOpen ? this.hidePanel(panel) : this.showPanel(panel);

      this.card.classList.toggle('share-panel-active');

      break;
  }

};


Cards.prototype.showPanel = function(panel) {

  switch (panel) {
    case 'love':

      break;
    case 'add':

      break;
    case 'info':

      // set flag
      this.panel.panelOpen = true;

      // change text
      this.panel.triggerText.innerText = 'Close';

      // transform elements
      this.card.cardContent.style.transform = 'translateY(-' + this.card.cardMedia.clientHeight + 'px)';
      this.panel.container.style.transform = 'translateY(-' + this.card.cardMedia.clientHeight + 'px)';

      break;
    case 'share':

      this.share.panelOpen = true;

      break;
  }

};

Cards.prototype.hidePanel = function(panel) {

  switch (panel) {
    case 'love':

      break;
    case 'add':

      break;
    case 'info':

      // set flag
      this.panel.panelOpen = false;

      // change text
      this.panel.triggerText.innerText = 'More info';

      // transform elements
      this.card.cardContent.style.transform = 'translateY(0px)';
      this.panel.container.style.transform = 'translateY(0px)';

      break;
    case 'share':

      this.share.panelOpen = false;

      break;
  }

};