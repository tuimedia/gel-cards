'use strict';

module.exports = {

  showPanel: function(panel) {

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
        this.card.cardMedia.style.transform = 'translateY(-100px)';
        this.card.cardContent.style.transform = 'translateY(-100px)';
        this.panel.container.style.transform = 'translateY(-100px)';

        this.card.cardMedia.style.transform = 'translateY(-' + this.card.cardInfoPanel.clientHeight + 'px)';
        this.card.cardContent.style.transform = 'translateY(-' + this.card.cardInfoPanel.clientHeight + 'px)';
        this.panel.container.style.transform = 'translateY(-' + this.card.cardInfoPanel.clientHeight + 'px)';

        break;
      case 'share':

        this.share.panelOpen = true;

        break;
    }

  },
  hidePanel: function(panel) {

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
        this.card.cardMedia.style.transform = 'translateY(0px)';
        this.card.cardContent.style.transform = 'translateY(0px)';
        this.panel.container.style.transform = 'translateY(0px)';

        break;
      case 'share':

        this.share.panelOpen = false;

        break;
    }

  }

};