var Cards = (function() {

    'use strict';

    function Cards(card) {

        if (!(this instanceof Cards)) {
            return new Cards(card);
        }

        this.card = card;

        if (this.card) {
            this.init();
        }

    }

    Cards.prototype.init = function(args) {

        var _this = this;

        // store attributes
        this.attrs = this.card.dataset;

        // card section wrappers - used for transforms
        this.card.cardMedia = this.card.querySelectorAll('.card__media')[0];
        this.card.cardContent = this.card.querySelectorAll('.card__content')[0];
        this.card.cardToolbar = this.card.querySelectorAll('.card__toolbar')[0];

        if (this.card.querySelectorAll('.js-share-cta')[0]) {

            this.hasShareCTA = true;

            this.share = {
                shareCTA: this.card.querySelectorAll('.js-share-cta')[0],
                states: {
                    panelOpen: false
                }
            };

        }

        if (this.card.querySelectorAll('.js-poll')[0]) {

            this.hasPoll = true;

            this.poll = {
                container: this.card.querySelectorAll('.js-poll')[0],
                options: this.card.querySelectorAll('.js-poll-option'),
                states: {
                    isAnswered: false,
                    isCorrect: false
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

        if (this.card.querySelectorAll('.js-gallery')[0]) {

            this.hasGallery = true;

            this.gallery = {
                container: this.card.querySelectorAll('.js-gallery')[0],
                images: this.card.querySelectorAll('.js-gallery-img'),
                next: this.card.querySelectorAll('.js-gallery-next')[0],
                prev: this.card.querySelectorAll('.js-gallery-prev')[0],
                play: this.card.querySelectorAll('.js-gallery-play')[0],
                pause: this.card.querySelectorAll('.js-gallery-pause')[0],
                close: this.card.querySelectorAll('.js-gallery-close')[0]
            };

        }

        if (this.card.dataset.cardBgUrl) {

            this.hasBackgroundImage = true;
            this.card.style.background = 'url(' + this.card.dataset.cardBgUrl + ')';
            this.card.style.backgroundSize = 'cover';

        }

        // setup video if there is a video tag
        if (this.card.querySelectorAll('video')[0]) {

            this.hasVideo = true;

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

        }

        // bind events to card elements
        this.bindEvents();

    };

    Cards.prototype.handleGallery = function(action) {

        var _this = this;

        switch (action) {
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

    Cards.prototype.bindEvents = function() {

        var _this = this;

        if (this.hasGallery) {

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

        if (this.hasShareCTA) {

            this.share.shareCTA.addEventListener('click', function(event) {

                _this.handleSharePanel();

            });

        }

        // if we have both a CTA and a video then bind video events
        if (this.hasVideo) {

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

        }

        if (this.hasPanel) {

            this.panel.trigger.addEventListener('click', function(event) {

                _this.handleMoreInfoPanel(this);

            });

        }

    };

    Cards.prototype.showSharePanel = function() {

        var _this = this;

        this.share.panelOpen = true;

    };

    Cards.prototype.hideSharePanel = function() {

        this.share.panelOpen = false;

    };

    Cards.prototype.handleSharePanel = function() {

        var _this = this;

        this.share.panelOpen ? this.hideSharePanel() : this.showSharePanel();

        this.card.classList.toggle('share-panel-active');

    };


    Cards.prototype.showMoreInfoPanel = function() {

        // set flag
        this.panel.panelOpen = true;

        // change text
        this.panel.triggerText.innerText = 'Close';

        // transform elements
        // this.card.cardMedia.style.transform = 'translateY(-' + this.card.cardMedia.clientHeight + 'px)';
        this.card.cardContent.style.transform = 'translateY(-' + this.card.cardMedia.clientHeight + 'px)';
        this.panel.container.style.transform = 'translateY(-' + this.card.cardMedia.clientHeight + 'px)';

    };

    Cards.prototype.hideMoreInfoPanel = function() {

        // set flag
        this.panel.panelOpen = false;

        // change text
        this.panel.triggerText.innerText = 'More info';

        // transform elements
        // this.card.cardMedia.style.transform = 'translateY(0px)';
        this.card.cardContent.style.transform = 'translateY(0px)';
        this.panel.container.style.transform = 'translateY(0px)';

    };

    Cards.prototype.handleMoreInfoPanel = function(el) {

        var _this = this;

        this.panel.panelOpen ? this.hideMoreInfoPanel() : this.showMoreInfoPanel();

        this.card.classList.toggle('is-active');

    };

    Cards.prototype.checkActiveVideos = function() {

        var _this = this;

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

        var _this = this;

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

    };
    return Cards;

}());