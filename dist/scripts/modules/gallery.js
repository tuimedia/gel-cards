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

  }

};