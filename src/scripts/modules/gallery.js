'use strict';
define('modules/gallery', ['Cards'], function(Cards) {

  var classes = [
    '.js-gallery',
    '.js-gallery-img',
    '.js-gallery-next',
    '.js-gallery-prev',
    '.js-gallery-play',
    '.js-gallery-pause',
    '.js-gallery-close'
  ];

  Cards.prototype.initGallery = function() {

    // check if all html classes are present and correct. If not, back the fuck out
    for (var i = 0; i < classes.length; i++) {

      if (!this.card.querySelectorAll(classes[i]).length) {
        console.warn('Required class ' + classes[i] + ' not found');
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

    console.log('gallery')
    var _this = this;

    switch (action) {
      case 'open':
        console.log('opening gallery')
        break;
      case 'prev':
        if (this.gallery.isAutoplaying) {
          stopAutoPlay();
        }
        changeImage('prev', this.gallery.images);
        break;
      case 'next':
        if (this.gallery.isAutoplaying) {
          stopAutoPlay();
        }
        changeImage('next', this.gallery.images);
        break;
      case 'play':
        startAutoPlay();
        break;
      case 'pause':
        if (this.isAutoplaying) {
          stopAutoPlay();
        }
        break;
      case 'close':
        break;
    }

    var autoPlay;

    function startAutoPlay() {

      _this.gallery.isAutoplaying = true;

      autoPlay = setInterval(function() {
        changeImage('next', _this.gallery.images);
      }, 3000);

    }

    function stopAutoPlay() {
      clearInterval(autoPlay);
      return;
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

  return Cards;
});