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
};