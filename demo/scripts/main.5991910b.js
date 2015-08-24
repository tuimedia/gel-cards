(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) {/**/}

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0],
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


},{}],2:[function(require,module,exports){
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
},{"./modules/gallery":5,"./modules/poll":6,"./modules/video":7,"extend":1}],3:[function(require,module,exports){
'use strict';

var Cards = require('./cards'),
  cards = [],
  allCards,
  html = document.querySelectorAll('html');

html[0].classList.remove('no-js');

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
},{"./cards":2}],4:[function(require,module,exports){

},{}],5:[function(require,module,exports){
'use strict';

module.exports = {

  initGallery: function() {

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

        // console.warn('Required class ' + classes[i] + ' not found');

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

  },
  bindGalleryEvents: function() {

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
  },
  handleGallery: function(action) {

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
      console.log('starting')

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

      console.log('stopping', _this.autoPlay)

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

  }

}

// }());
},{}],6:[function(require,module,exports){
'use strict';

module.exports = {

	initPoll: function() {

		var classes = [
			'.js-poll',
			'.js-poll-option'
		];

		// check if all html classes are present and correct. If not, back the fuck out
		for (var i = 0; i < classes.length; i++) {

			if (!this.card.querySelectorAll(classes[i]).length) {
				// console.warn('Required class ' + classes[i] + ' not found');
				return;
			}

		};

		this.poll = {
			container: this.card.querySelectorAll('.js-poll')[0],
			options: this.card.querySelectorAll('.js-poll-option'),
			states: {
				isAnswered: false,
				isCorrect: false
			}
		};

	}

}
},{}],7:[function(require,module,exports){
'use strict';
var allCards = document.querySelectorAll('.js-card');

module.exports = {

  initVideo: function() {

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
        // console.warn('Required class ' + classes[i] + ' not found');
        return;
      }

    };

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

  },
  bindVideoEvents: function() {

    var _this = this;

    // stop other videos playing first, then play selected video
    this.video.controls.play.addEventListener('click', function(event) {

      _this.checkActiveVideos();

    }, false);


    this.video.controls.poster.addEventListener('click', function(event) {

      if (_this.video.player.paused) {
        _this.checkActiveVideos();
      }

    }, false);


    // pause active video
    this.video.controls.pause.addEventListener('click', function(event) {

      event.stopPropagation();

      _this.handleVideo('pause');

    }, false);


    // mute active video
    this.video.controls.volume.addEventListener('click', function(event) {

      _this.handleVideo('volume');

    }, false);


    this.video.controls.volumeBar.addEventListener('click', function(event) {

      event.stopPropagation();

      var volumeBarWidth = 100 * (event.offsetX / _this.video.controls.volumeBar.clientWidth),
        volumeBarVolume = parseFloat(event.offsetX / _this.video.controls.volumeBar.clientWidth).toFixed(1);

      _this.video.controls.volumeLevel.style.width = volumeBarWidth + '%';
      _this.video.player.volume = volumeBarVolume;

    }, false);


    // fullscren active video
    if (this.video.controls.fullscreen) {

      this.video.controls.fullscreen.addEventListener('click', function(event) {
        _this.handleVideo('fullscreen');
      }, false);

    }


    // scrubber click - jump to time
    this.video.controls.scrubber.addEventListener('click', function(event) {

      var selectedTime = _this.video.player.duration * (event.offsetX / _this.video.controls.scrubber.offsetWidth);

      _this.video.player.currentTime = selectedTime;

    }, false);


    this.video.player.addEventListener('canplay', function(event) {

      if (_this.video.player.readyState === 4) {

        _this.video.duration.innerText = parseInt(_this.video.player.duration / 60) % 60 + ' mins';

      }

    }, false);


    // on video play event
    this.video.player.addEventListener('playing', function(event) {


    }, false);


    // on video end event - reset video
    this.video.player.addEventListener('ended', function(event) {

      _this.handleVideo('ended');

    }, false);


    // on video time update event
    this.video.player.addEventListener('timeupdate', function(event) {

      var percentage = (100 / _this.video.player.duration) * _this.video.player.currentTime;

      _this.video.controls.progress.style.width = percentage + '%';

    }, false);

  },
  checkActiveVideos: function() {

    // pause any videos currently playing
    for (var i = 0; i < allCards.length; i++) {

      var video = allCards[i].querySelectorAll('video')[0];

      if (video && !video.paused) {

        video.pause();

        allCards[i].classList.toggle('is-playing');

      }

    }

    this.handleVideo('play');

  },
  handleVideo: function(action) {

    switch (action) {

      case 'play':
        this.video.player.play();
        this.card.classList.toggle('is-playing');
        this.video.states.isPlaying = true;
        break;
      case 'pause':
        this.video.player.pause();
        this.card.classList.toggle('is-playing');
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

  }
}
},{}],8:[function(require,module,exports){
// (function() {

//   'use strict';

//   if (Cards) {

//     Cards.prototype.showMoreInfoPanel = function() {

//       // set flag
//       this.panel.panelOpen = true;

//       // change text
//       this.panel.triggerText.innerText = 'Close';

//       // transform elements

//       console.log('add custom sport transitions')

//     };

//     Cards.prototype.hideMoreInfoPanel = function() {

//       // set flag
//       this.panel.panelOpen = false;

//       // change text
//       this.panel.triggerText.innerText = 'More info';

//       // transform elements
//       console.log('add custom sport transitions')

//     };

//   }

// }());
},{}]},{},[2,3,4,5,6,7,8]);
