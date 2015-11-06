(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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
        getTemplate(result[i], i);
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
        cards[index] = new SportCards(args);
        break;
      case 'news':
        cards[index] = new NewsCards(args);
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

},{}],3:[function(require,module,exports){
'use strict';

Cards.prototype.initGallery = function() {

  var classes = [
    '.js-gallery',
    '.js-gallery-img',
    '.js-gallery-next',
    '.js-gallery-prev',
    '.js-gallery-play',
    '.js-gallery-pause',
    '.js-gallery-close'
  ];

  // check if all html classes are present and correct. If not, back the fuck out
  for (var i = 0; i < classes.length; i++) {
    if (!this.card.querySelectorAll(classes[i]).length) {
      return;
    }
  };

  this.gallery = {
    container: this.card.querySelectorAll('.js-gallery')[0],
    trigger: this.card.querySelectorAll('.js-gallery-cta')[0],
    images: this.card.querySelectorAll('.js-gallery-img'),
    next: this.card.querySelectorAll('.js-gallery-next')[0],
    prev: this.card.querySelectorAll('.js-gallery-prev')[0],
    play: this.card.querySelectorAll('.js-gallery-play')[0],
    pause: this.card.querySelectorAll('.js-gallery-pause')[0],
    close: this.card.querySelectorAll('.js-gallery-close')[0]
  };

  this.bindGalleryEvents();

};
Cards.prototype.bindGalleryEvents = function() {
  var _this = this;

  if (this.gallery) {

    this.gallery.trigger.addEventListener('click', function(event) {
      _this.handleGallery('open');
    }, false);

    this.gallery.prev.addEventListener('click', function(event) {
      _this.handleGallery('prev');
    }, false);

    this.gallery.next.addEventListener('click', function(event) {
      _this.handleGallery('next');
    }, false);

    this.gallery.play.addEventListener('click', function(event) {
      _this.handleGallery('play');
    }, false);

    this.gallery.pause.addEventListener('click', function(event) {
      _this.handleGallery('pause');
    }, false);

    this.gallery.close.addEventListener('click', function(event) {
      _this.handleGallery('close');
    }, false);

  }
};
Cards.prototype.handleGallery = function(action) {

  var _this = this;

  switch (action) {
    case 'open':

      this.card.classList.add('gallery-active');

      break;
    case 'prev':

      if (this.gallery.isAutoplaying) stopAutoPlay();

      changeImage('prev', this.gallery.images);

      break;
    case 'next':

      if (this.gallery.isAutoplaying) stopAutoPlay();

      changeImage('next', this.gallery.images);

      break;
    case 'play':

      if (!this.gallery.isAutoplaying) startAutoPlay();

      break;
    case 'pause':

      if (this.gallery.isAutoplaying) stopAutoPlay();

      break;
    case 'close':

      if (this.gallery.isAutoplaying) stopAutoPlay();

      this.card.classList.remove('gallery-active');

      break;
  }

  _this.autoPlay;

  function startAutoPlay() {

    _this.gallery.play.classList.add('is-hidden');
    _this.gallery.pause.classList.remove('is-hidden');

    _this.gallery.isAutoplaying = true;

    _this.autoPlay = setInterval(function() {
      changeImage('next', _this.gallery.images);
    }, 3000);

  }

  function stopAutoPlay() {

    _this.gallery.play.classList.remove('is-hidden');
    _this.gallery.pause.classList.add('is-hidden');

    _this.gallery.isAutoplaying = false;

    clearInterval(_this.autoPlay);

  }

  function changeImage(direction, images) {

    var activeImage;

    for (var i = 0; i < images.length; i++) {

      switch (direction) {

        case 'next':
          if (images[i].classList.contains('is-active') && i < images.length - 1) {
            images[i].classList.remove('is-active');
            images[i + 1].classList.add('is-active');
            return;
          } else if (images[i].classList.contains('is-active') && i === images.length - 1) {
            images[i].classList.remove('is-active');
            images[0].classList.add('is-active');
            return;
          }
          break;

        case 'prev':
          if (images[i].classList.contains('is-active') && i === 0) {
            images[i].classList.remove('is-active');
            images[images.length - 1].classList.add('is-active');
            return;
          } else if (images[i].classList.contains('is-active') && i > 0) {
            images[i].classList.remove('is-active');
            images[i - 1].classList.add('is-active');
          }
          break;

      }
    }

  }

};

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict';
var allCards = document.querySelectorAll('.js-card');

Cards.prototype.initVideo = function() {

  var classes = [
    '.js-play',
    '.js-pause',
    '.js-scrubber',
    '.js-poster',
    '.js-volume',
    '.js-volume-bar',
    '.js-volume-level',
    '.js-full-screen'
  ];

  // check if all html classes are present and correct. If not, back the fuck out
  for (var i = 0; i < classes.length; i++) {

    if (!this.card.querySelectorAll(classes[i]).length) {
      console.warn('Required class ' + classes[i] + ' not found');
      return;
    }

  };


  // Listen for the event.

  this.video = {
    player: this.card.querySelectorAll('video')[0],
    duration: this.card.querySelectorAll('.js-duration')[0],
    controls: {
      play: this.card.querySelectorAll('.js-play')[0],
      pause: this.card.querySelectorAll('.js-pause')[0],
      scrubber: this.card.querySelectorAll('.js-scrubber')[0],
      progress: this.card.querySelectorAll('.js-progress')[0],
      poster: this.card.querySelectorAll('.js-poster')[0],
      volume: this.card.querySelectorAll('.js-volume')[0],
      volumeBar: this.card.querySelectorAll('.js-volume-bar')[0],
      volumeLevel: this.card.querySelectorAll('.js-volume-level')[0],
      fullscreen: this.card.querySelectorAll('.js-full-screen')[0]
    },
    states: {
      isPlaying: false,
      isFinished: false,
      isMuted: false,
      isFullscreen: false
    }
  };

  this.bindVideoEvents();

};
Cards.prototype.bindVideoEvents = function() {

  var self = this;

  this.events.playVideo = new Event('playVideo');

  // hide info panel on video play
  this.card.addEventListener('playVideo', function(e) {

    self.hidePanel();

  }, false);

  // stop other videos playing first, then play selected video
  this.video.controls.play.addEventListener('click', function(event) {

    self.checkActiveVideos();

  }, false);


  this.video.controls.poster.addEventListener('click', function(event) {

    if (self.video.player.paused) {
      self.checkActiveVideos();
    }

  }, false);


  // pause active video
  this.video.controls.pause.addEventListener('click', function(event) {

    event.stopPropagation();

    self.handleVideo('pause');

  }, false);


  // mute active video
  this.video.controls.volume.addEventListener('click', function(event) {

    self.handleVideo('volume');

  }, false);


  this.video.controls.volumeBar.addEventListener('click', function(event) {

    event.stopPropagation();

    var volumeBarWidth = 100 * (event.offsetX / self.video.controls.volumeBar.clientWidth),
      volumeBarVolume = parseFloat(event.offsetX / self.video.controls.volumeBar.clientWidth).toFixed(1);

    self.video.controls.volumeLevel.style.width = volumeBarWidth + '%';
    self.video.player.volume = volumeBarVolume;

  }, false);


  // fullscren active video
  if (this.video.controls.fullscreen) {

    this.video.controls.fullscreen.addEventListener('click', function(event) {
      self.handleVideo('fullscreen');
    }, false);

  }


  // scrubber click - jump to time
  this.video.controls.scrubber.addEventListener('click', function(event) {

    var selectedTime = self.video.player.duration * (event.offsetX / self.video.controls.scrubber.offsetWidth);

    self.video.player.currentTime = selectedTime;

  }, false);


  this.video.player.addEventListener('canplay', function(event) {

    if (self.video.player.readyState === 4) {

      self.video.duration.innerText = parseInt(self.video.player.duration / 60) % 60 + ' mins';

    }

  }, false);


  // on video play event
  this.video.player.addEventListener('playing', function(event) {


  }, false);


  // on video end event - reset video
  this.video.player.addEventListener('ended', function(event) {

    self.handleVideo('ended');

  }, false);


  // on video time update event
  this.video.player.addEventListener('timeupdate', function(event) {

    var percentage = (100 / self.video.player.duration) * self.video.player.currentTime;

    self.video.controls.progress.style.width = percentage + '%';

  }, false);

};
Cards.prototype.checkActiveVideos = function() {

  // pause any videos currently playing
  for (var i = 0; i < allCards.length; i++) {

    var video = allCards[i].querySelectorAll('video')[0];

    if (video && !video.paused) {

      video.pause();

      allCards[i].classList.toggle('is-playing');

    }

  }

  this.handleVideo('play');

};
Cards.prototype.handleVideo = function(action) {

  switch (action) {

    case 'play':
      this.video.player.play();
      this.card.classList.toggle('is-playing');
      this.video.states.isPlaying = true;
      this.card.dispatchEvent(this.events.playVideo);
      break;
    case 'pause':
      this.video.player.pause();
      this.card.classList.remove('is-playing');
      this.video.states.isPlaying = false;
      break;
    case 'volume':
      this.video.player.muted = this.video.player.muted === true ? false : true;
      this.card.classList.toggle('is-muted');
      this.video.states.isMuted = this.video.player.muted === true ? false : true;
      break;
    case 'fullscreen':
      if (this.video.player.requestFullscreen) {
        this.video.player.requestFullscreen();
      } else if (this.video.player.msRequestFullscreen) {
        this.video.player.msRequestFullscreen();
      } else if (this.video.player.mozRequestFullScreen) {
        this.video.player.mozRequestFullScreen();
      } else if (this.video.player.webkitRequestFullscreen) {
        this.video.player.webkitRequestFullscreen();
      }
      break;
    case 'ended':
      this.card.classList.remove('is-playing');
      this.video.player.load();
      break;

  }

};

},{}]},{},[1,2,3,4,5]);
