"use strict";var Cards=function a(b){return this instanceof a?(this.events={},this.card=b.card,void(this.card&&this.init())):new a(b)};Cards.prototype.init=function(){this.attrs=this.card.dataset,this.card.cardCTA=this.card.querySelectorAll(".card__cta")[0],this.card.cardMedia=this.card.querySelectorAll(".card__media")[0],this.card.cardContent=this.card.querySelectorAll(".card__content")[0],this.card.cardToolbar=this.card.querySelectorAll(".card__toolbar")[0],this.card.cardMoreCTA=this.card.querySelectorAll(".card__more-cta")[0],this.card.cardInfoPanel=this.card.querySelectorAll(".card__panel--info")[0],this.card.cardLovePanel=this.card.querySelectorAll(".card__panel--love")[0],this.card.cardAddPanel=this.card.querySelectorAll(".card__panel--add")[0];try{this.initPoll()}catch(a){"undefined"!=typeof console&&console.error(a.stack)}try{this.initGallery()}catch(a){"undefined"!=typeof console&&console.error(a.stack)}try{this.initVideo()}catch(a){"undefined"!=typeof console&&console.error(a.stack)}this.card.querySelectorAll(".js-share-cta")[0]&&(this.hasShareCTA=!0,this.share={shareCTA:this.card.querySelectorAll(".js-share-cta")[0],states:{panelOpen:!1}}),this.card.querySelectorAll(".js-love-cta")[0]&&(this.hasLoveCTA=!0,this.love={trigger:this.card.querySelectorAll(".js-love-cta")[0],triggerText:this.card.querySelectorAll(".js-love-trigger-label")[0],addText:"You love this",removeText:"You don't love this",states:{isLoved:!1}}),this.card.querySelectorAll(".js-add-cta")[0]&&(this.hasAddCTA=!0,this.add={trigger:this.card.querySelectorAll(".js-add-cta")[0],container:this.card.querySelectorAll(".js-add")[0],triggerText:this.card.querySelectorAll(".js-add-trigger-label")[0],addText:"Added to favourites",removeText:"Remove from favourites",states:{isAdded:!1}}),this.card.querySelectorAll(".js-panel")[0]&&this.card.querySelectorAll(".js-more")[0]&&(this.hasPanel=!0,this.panel={container:this.card.querySelectorAll(".js-panel")[0],trigger:this.card.querySelectorAll(".js-more")[0],triggerText:this.card.querySelectorAll(".js-panel-trigger-label")[0],states:{panelOpen:!1}}),this.card.dataset.cardBgUrl&&(this.hasBackgroundImage=!0,this.card.classList.add("trans-bg"),this.card.style.background="url("+this.card.dataset.cardBgUrl+")",this.card.style.backgroundSize="cover"),this.bindEvents()},Cards.prototype.bindEvents=function(){var a=this;this.hasShareCTA&&this.share.shareCTA.addEventListener("click",function(){a.handlePanels("share")}),this.hasPanel&&this.panel.trigger.addEventListener("click",function(){a.handlePanels("info")}),this.hasLoveCTA&&this.love.trigger.addEventListener("click",function(){a.handlePanels("love")}),this.hasAddCTA&&this.add.trigger.addEventListener("click",function(){a.handlePanels("add")})},Cards.prototype.handlePanels=function(a){function b(a){var b=a=a?!1:!0;return b}var c=this;switch(a){case"love":c.love.states.isLoved=b(c.love.states.isLoved),c.love.states.isLoved?(c.love.trigger.classList.add("is-loved"),c.love.triggerText.innerText=c.love.addText):(c.love.trigger.classList.remove("is-loved"),c.love.triggerText.innerText=c.love.removeText),c.love.panelOpen?c.hidePanel(a):c.showPanel(a);break;case"add":c.add.states.isAdded=b(c.add.states.isAdded),this.add.states.isAdded?(c.add.trigger.classList.add("is-added"),c.add.triggerText.innerText=c.add.addText):(c.add.trigger.classList.remove("is-added"),c.add.triggerText.innerText=c.add.removeText),c.add.panelOpen?c.hidePanel(a):c.showPanel(a);break;case"info":c.panel.panelOpen?c.hidePanel(a):c.showPanel(a),c.card.classList.toggle("is-active");break;case"share":c.share.panelOpen?c.hidePanel(a):c.showPanel(a),c.card.classList.toggle("share-panel-active")}},Cards.prototype.showPanel=function(a){function b(a){setTimeout(function(){c.hidePanel(a)},1e3)}var c=this;switch(a){case"love":c.love.panelOpen=!0,c.add.panelOpen=!1,c.card.cardMoreCTA&&c.card.cardMoreCTA.classList.add("is-hidden"),c.card.cardLovePanel&&c.card.cardLovePanel.classList.remove("is-hidden"),c.card.cardAddPanel&&c.card.cardAddPanel.classList.add("is-hidden"),b(a);break;case"add":c.add.panelOpen=!0,c.love.panelOpen=!1,c.card.cardMoreCTA&&c.card.cardMoreCTA.classList.add("is-hidden"),c.card.cardAddPanel&&c.card.cardAddPanel.classList.remove("is-hidden"),c.card.cardLovePanel&&c.card.cardLovePanel.classList.add("is-hidden"),b(a);break;case"info":c.panel.panelOpen=!0,c.panel.triggerText.innerText="Close",c.card.cardContent&&c.card.cardMedia&&(c.card.cardContent.style.transform="translateY(-"+c.card.cardMedia.clientHeight+"px)"),c.panel.container&&(c.panel.container.style.transform="translateY(-"+c.card.cardMedia.clientHeight+"px)");break;case"share":c.share.panelOpen=!0}},Cards.prototype.hidePanel=function(a){function b(){f.love.panelOpen=!1,f.card.cardMoreCTA&&f.card.cardMoreCTA.classList.remove("is-hidden"),f.card.cardLovePanel&&f.card.cardLovePanel.classList.add("is-hidden")}function c(){f.add.panelOpen=!1,f.card.cardMoreCTA&&f.card.cardMoreCTA.classList.remove("is-hidden"),f.card.cardAddPanel&&f.card.cardAddPanel.classList.add("is-hidden")}function d(){f.panel.panelOpen=!1,f.panel.triggerText.innerText="More info",f.card.cardContent&&(f.card.cardContent.style.transform="translateY(0px)"),f.panel.container&&(f.panel.container.style.transform="translateY(0px)")}function e(){f.share.panelOpen=!1}var f=this;switch(a){case"love":b();break;case"add":c();break;case"info":d();break;case"share":e();break;default:b(),c(),d(),e()}},Cards.prototype.initGallery=function(){for(var a=[".js-gallery",".js-gallery-img",".js-gallery-next",".js-gallery-prev",".js-gallery-play",".js-gallery-pause",".js-gallery-close"],b=0;b<a.length;b++)if(!this.card.querySelectorAll(a[b]).length)return;this.gallery={container:this.card.querySelectorAll(".js-gallery")[0],trigger:this.card.querySelectorAll(".js-gallery-cta")[0],images:this.card.querySelectorAll(".js-gallery-img"),next:this.card.querySelectorAll(".js-gallery-next")[0],prev:this.card.querySelectorAll(".js-gallery-prev")[0],play:this.card.querySelectorAll(".js-gallery-play")[0],pause:this.card.querySelectorAll(".js-gallery-pause")[0],close:this.card.querySelectorAll(".js-gallery-close")[0]},this.bindGalleryEvents()},Cards.prototype.bindGalleryEvents=function(){var a=this;this.gallery&&(this.gallery.trigger.addEventListener("click",function(){a.handleGallery("open")},!1),this.gallery.prev.addEventListener("click",function(){a.handleGallery("prev")},!1),this.gallery.next.addEventListener("click",function(){a.handleGallery("next")},!1),this.gallery.play.addEventListener("click",function(){a.handleGallery("play")},!1),this.gallery.pause.addEventListener("click",function(){a.handleGallery("pause")},!1),this.gallery.close.addEventListener("click",function(){a.handleGallery("close")},!1))},Cards.prototype.handleGallery=function(a){function b(){e.gallery.play.classList.add("is-hidden"),e.gallery.pause.classList.remove("is-hidden"),e.gallery.isAutoplaying=!0,e.autoPlay=setInterval(function(){d("next",e.gallery.images)},3e3)}function c(){e.gallery.play.classList.remove("is-hidden"),e.gallery.pause.classList.add("is-hidden"),e.gallery.isAutoplaying=!1,clearInterval(e.autoPlay)}function d(a,b){for(var c=0;c<b.length;c++)switch(a){case"next":if(b[c].classList.contains("is-active")&&c<b.length-1)return b[c].classList.remove("is-active"),void b[c+1].classList.add("is-active");if(b[c].classList.contains("is-active")&&c===b.length-1)return b[c].classList.remove("is-active"),void b[0].classList.add("is-active");break;case"prev":if(b[c].classList.contains("is-active")&&0===c)return b[c].classList.remove("is-active"),void b[b.length-1].classList.add("is-active");b[c].classList.contains("is-active")&&c>0&&(b[c].classList.remove("is-active"),b[c-1].classList.add("is-active"))}}var e=this;switch(a){case"open":this.card.classList.add("gallery-active");break;case"prev":this.gallery.isAutoplaying&&c(),d("prev",this.gallery.images);break;case"next":this.gallery.isAutoplaying&&c(),d("next",this.gallery.images);break;case"play":this.gallery.isAutoplaying||b();break;case"pause":this.gallery.isAutoplaying&&c();break;case"close":this.gallery.isAutoplaying&&c(),this.card.classList.remove("gallery-active")}e.autoPlay},Cards.prototype.initPoll=function(){for(var a=[".js-poll",".js-poll-option"],b=0;b<a.length;b++)if(!this.card.querySelectorAll(a[b]).length)return;this.poll={container:this.card.querySelectorAll(".js-poll")[0],options:this.card.querySelectorAll(".js-poll-option"),states:{isAnswered:!1,isCorrect:!1}}};var allCards=document.querySelectorAll(".js-card");Cards.prototype.initVideo=function(){for(var a=[".js-play",".js-pause",".js-scrubber",".js-poster",".js-volume",".js-volume-bar",".js-volume-level",".js-full-screen"],b=0;b<a.length;b++)if(!this.card.querySelectorAll(a[b]).length)return void console.warn("Required class "+a[b]+" not found");this.video={player:this.card.querySelectorAll("video")[0],duration:this.card.querySelectorAll(".js-duration")[0],controls:{play:this.card.querySelectorAll(".js-play")[0],pause:this.card.querySelectorAll(".js-pause")[0],scrubber:this.card.querySelectorAll(".js-scrubber")[0],progress:this.card.querySelectorAll(".js-progress")[0],poster:this.card.querySelectorAll(".js-poster")[0],volume:this.card.querySelectorAll(".js-volume")[0],volumeBar:this.card.querySelectorAll(".js-volume-bar")[0],volumeLevel:this.card.querySelectorAll(".js-volume-level")[0],fullscreen:this.card.querySelectorAll(".js-full-screen")[0]},states:{isPlaying:!1,isFinished:!1,isMuted:!1,isFullscreen:!1}},this.bindVideoEvents()},Cards.prototype.bindVideoEvents=function(){var a=this;this.events.playVideo=new Event("playVideo"),this.card.addEventListener("playVideo",function(){a.hidePanel()},!1),this.video.controls.play.addEventListener("click",function(){a.checkActiveVideos()},!1),this.video.controls.poster.addEventListener("click",function(){a.video.player.paused&&a.checkActiveVideos()},!1),this.video.controls.pause.addEventListener("click",function(b){b.stopPropagation(),a.handleVideo("pause")},!1),this.video.controls.volume.addEventListener("click",function(){a.handleVideo("volume")},!1),this.video.controls.volumeBar.addEventListener("click",function(b){b.stopPropagation();var c=100*(b.offsetX/a.video.controls.volumeBar.clientWidth),d=parseFloat(b.offsetX/a.video.controls.volumeBar.clientWidth).toFixed(1);a.video.controls.volumeLevel.style.width=c+"%",a.video.player.volume=d},!1),this.video.controls.fullscreen&&this.video.controls.fullscreen.addEventListener("click",function(){a.handleVideo("fullscreen")},!1),this.video.controls.scrubber.addEventListener("click",function(b){var c=a.video.player.duration*(b.offsetX/a.video.controls.scrubber.offsetWidth);a.video.player.currentTime=c},!1),this.video.player.addEventListener("canplay",function(){4===a.video.player.readyState&&(a.video.duration.innerText=parseInt(a.video.player.duration/60)%60+" mins")},!1),this.video.player.addEventListener("playing",function(){},!1),this.video.player.addEventListener("ended",function(){a.handleVideo("ended")},!1),this.video.player.addEventListener("timeupdate",function(){var b=100/a.video.player.duration*a.video.player.currentTime;a.video.controls.progress.style.width=b+"%"},!1)},Cards.prototype.checkActiveVideos=function(){for(var a=0;a<allCards.length;a++){var b=allCards[a].querySelectorAll("video")[0];b&&!b.paused&&(b.pause(),allCards[a].classList.toggle("is-playing"))}this.handleVideo("play")},Cards.prototype.handleVideo=function(a){switch(a){case"play":this.video.player.play(),this.card.classList.toggle("is-playing"),this.video.states.isPlaying=!0,this.card.dispatchEvent(this.events.playVideo);break;case"pause":this.video.player.pause(),this.card.classList.remove("is-playing"),this.video.states.isPlaying=!1;break;case"volume":this.video.player.muted=this.video.player.muted===!0?!1:!0,this.card.classList.toggle("is-muted"),this.video.states.isMuted=this.video.player.muted===!0?!1:!0;break;case"fullscreen":this.video.player.requestFullscreen?this.video.player.requestFullscreen():this.video.player.msRequestFullscreen?this.video.player.msRequestFullscreen():this.video.player.mozRequestFullScreen?this.video.player.mozRequestFullScreen():this.video.player.webkitRequestFullscreen&&this.video.player.webkitRequestFullscreen();break;case"ended":this.card.classList.remove("is-playing"),this.video.player.load()}};