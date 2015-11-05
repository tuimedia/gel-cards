'use strict';

var Cards = function Cards(args) {
  if (!(this instanceof Cards)) {
    return new Cards(args);
  }

  this.events = {};

  this.card = args.card;
  if (this.card) {
    this.init();
  }
};

Cards.prototype.init = function(args) {

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
  var self = this;

  switch (panel) {
    case 'love':

      self.love.states.isLoved = toggleState(self.love.states.isLoved);

      if (self.love.states.isLoved) {
        self.love.trigger.classList.add('is-loved');
        self.love.triggerText.innerText = self.love.addText;
      } else {
        self.love.trigger.classList.remove('is-loved');
        self.love.triggerText.innerText = self.love.removeText;
      }

      self.love.panelOpen ? self.hidePanel(panel) : self.showPanel(panel);

      break;
    case 'add':

      self.add.states.isAdded = toggleState(self.add.states.isAdded);

      if (this.add.states.isAdded) {
        self.add.trigger.classList.add('is-added');
        self.add.triggerText.innerText = self.add.addText;
      } else {
        self.add.trigger.classList.remove('is-added');
        self.add.triggerText.innerText = self.add.removeText;
      }

      self.add.panelOpen ? self.hidePanel(panel) : self.showPanel(panel);

      break;
    case 'info':

      self.panel.panelOpen ? self.hidePanel(panel) : self.showPanel(panel);
      self.card.classList.toggle('is-active');

      break;
    case 'share':

      self.share.panelOpen ? self.hidePanel(panel) : self.showPanel(panel);

      self.card.classList.toggle('share-panel-active');

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
      self.love.panelOpen = true;
      self.add.panelOpen = false;
      self.card.cardMoreCTA.classList.add('is-hidden');
      self.card.cardLovePanel.classList.remove('is-hidden');
      self.card.cardAddPanel.classList.add('is-hidden');
      closePanel(panel);
      break;
    case 'add':
      self.add.panelOpen = true;
      self.love.panelOpen = false;
      self.card.cardMoreCTA.classList.add('is-hidden');
      self.card.cardAddPanel.classList.remove('is-hidden');
      self.card.cardLovePanel.classList.add('is-hidden');
      closePanel(panel);
      break;
    case 'info':
      self.panel.panelOpen = true;
      self.panel.triggerText.innerText = 'Close';
      self.card.cardContent.style.transform = 'translateY(-' + self.card.cardMedia.clientHeight + 'px)';
      self.panel.container.style.transform = 'translateY(-' + self.card.cardMedia.clientHeight + 'px)';
      break;
    case 'share':
      self.share.panelOpen = true;
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
      hideLovePanel();
      break;
    case 'add':
      hideAddPanel();
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
    self.love.panelOpen = false;
    self.card.cardMoreCTA.classList.remove('is-hidden');
    self.card.cardLovePanel.classList.add('is-hidden');
  };

  function hideAddPanel() {
    self.add.panelOpen = false;
    self.card.cardMoreCTA.classList.remove('is-hidden');
    self.card.cardAddPanel.classList.add('is-hidden');
  };

  function hideInfoPanel() {
    self.panel.panelOpen = false;
    self.panel.triggerText.innerText = 'More info';

    self.card.cardContent.style.transform = 'translateY(0px)';
    self.panel.container.style.transform = 'translateY(0px)';
  };

  function hideSharePanel() {
    self.share.panelOpen = false;
  }
};
