'use strict';
var extend = require('extend'),
  gallery = require('./modules/gallery'),
  poll = require('./modules/poll'),
  video = require('./modules/video'),
  modules;

var Cards = module.exports = function Cards(args) {

  if (!(this instanceof Cards)) {
    return new Cards(args);
  }

  modules = args.modules;
  this.events = {};

  this.card = args.card;
  if (this.card) {
    this.init();
  }

};

extend(Cards.prototype, gallery, poll, video);

Cards.prototype.init = function(args) {

  console.log(this)

  var _this = this;

  // store attributes
  this.attrs = this.card.dataset;

  // card section wrappers - used for transforms
  this.card.cardCTA = this.card.querySelectorAll('.card__cta')[0];
  this.card.cardMedia = this.card.querySelectorAll('.card__media')[0];
  this.card.cardContent = this.card.querySelectorAll('.card__content')[0];
  this.card.cardToolbar = this.card.querySelectorAll('.card__toolbar')[0];
  this.card.cardMoreCTA = this.card.querySelectorAll('.card__more-cta')[0];
  this.card.cardInfoPanel = this.card.querySelectorAll('.card__panel--info')[0];
  this.card.cardLovePanel = this.card.querySelectorAll('.card__panel--love')[0];
  this.card.cardAddPanel = this.card.querySelectorAll('.card__panel--add')[0];

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
    console.log('this.hasLoveCTA', this.hasLoveCTA);
    this.love = {
      trigger: this.card.querySelectorAll('.js-love-cta')[0],
      triggerText: this.card.querySelectorAll('.js-love-trigger-label')[0],
      addText: 'You love this',
      removeText: 'You don\'t love this',
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
      triggerText: this.card.querySelectorAll('.js-add-trigger-label')[0],
      addText: 'Added to favourites',
      removeText: 'Remove from favourites',
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

      this.love.states.isLoved = toggleState(this.love.states.isLoved);

      if(this.love.states.isLoved) {
        this.love.trigger.classList.add('is-loved');
        this.love.triggerText.innerText = this.love.addText;
      } else {
        this.love.trigger.classList.remove('is-loved');
        this.love.triggerText.innerText = this.love.removeText;
      }

      this.love.panelOpen ? this.hidePanel(panel) : this.showPanel(panel);

      break;
    case 'add':

      this.add.states.isAdded = toggleState(this.add.states.isAdded);

      if(this.add.states.isAdded) {
        this.add.trigger.classList.add('is-added');
        this.add.triggerText.innerText = this.add.addText;
      } else {
        this.add.trigger.classList.remove('is-added');
        this.add.triggerText.innerText = this.add.removeText;
      }

      this.add.panelOpen ? this.hidePanel(panel) : this.showPanel(panel);

      break;
    case 'info':

      this.panel.panelOpen ? this.hidePanel(panel) : this.showPanel(panel);

      console.log('info panel')
      this.card.classList.toggle('is-active');

      break;
    case 'share':

      this.share.panelOpen ? this.hidePanel(panel) : this.showPanel(panel);

      this.card.classList.toggle('share-panel-active');

      break;
  }

  function toggleState(state) {
    var ret = state ? state = false : state = true;
    return ret;
  }
};


Cards.prototype.showPanel = function(panel) {

  var self = this;

  switch (panel) {
    case 'love':
      console.log('this.love', this.love);

      this.love.panelOpen = true;
      this.add.panelOpen = false;
      this.card.cardMoreCTA.classList.add('is-hidden');
      this.card.cardLovePanel.classList.remove('is-hidden');
      this.card.cardAddPanel.classList.add('is-hidden');
      closePanel(panel);
      break;
    case 'add':
      this.add.panelOpen = true;
      this.love.panelOpen = false;
      this.card.cardMoreCTA.classList.add('is-hidden');
      this.card.cardAddPanel.classList.remove('is-hidden');
      this.card.cardLovePanel.classList.add('is-hidden');
      closePanel(panel);
      break;
    case 'info':
      this.panel.panelOpen = true;
      this.panel.triggerText.innerText = 'Close';
      this.card.cardContent.style.transform = 'translateY(-' + this.card.cardMedia.clientHeight + 'px)';
      this.panel.container.style.transform = 'translateY(-' + this.card.cardMedia.clientHeight + 'px)';
      break;
    case 'share':
      this.share.panelOpen = true;
      break;
  }

  function closePanel(panel) {
    setTimeout(function() {
      self.hidePanel(panel);
    }, 1000);
  }
};

Cards.prototype.hidePanel = function(panel) {

    var self = this;

    switch (panel) {
      case 'love':
      console.log('this.love', this.love);
        this.love.panelOpen = false;
        this.card.cardMoreCTA.classList.remove('is-hidden');
        this.card.cardLovePanel.classList.add('is-hidden');
        break;
      case 'add':
        this.add.panelOpen = false;
        this.card.cardMoreCTA.classList.remove('is-hidden');
        this.card.cardAddPanel.classList.add('is-hidden');
        break;
      case 'info':
        hideInfoPanel()
        break;
      case 'share':
        hideSharePanel();
        break;
      default:
        hideLovePanel()
        hideAddPanel()
        hideInfoPanel()
        hideSharePanel();
        break;
    }

    function hideLovePanel() {
      console.log('hiding love panel')
    };

    function hideAddPanel() {
      console.log('hiding add panel')
    };

    function hideSharePanel() {
      self.share.panelOpen = false;
    };

    function hideInfoPanel() {

      // set flag
      self.panel.panelOpen = false;

      // change text
      self.panel.triggerText.innerText = 'More info';

        // transform elements
      self.card.cardContent.style.transform = 'translateY(0px)';
      self.panel.container.style.transform = 'translateY(0px)';

    };


};