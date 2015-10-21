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

    var self = this;

    switch (panel) {
      case 'love':
        hideLovePanel()
        break;
      case 'add':
        hideAddPanel()
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
        self.card.cardMedia.style.transform = 'translateY(0px)';
        self.card.cardContent.style.transform = 'translateY(0px)';
        self.panel.container.style.transform = 'translateY(0px)';

    };

  }

};