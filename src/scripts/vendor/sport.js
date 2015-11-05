'use strict';

function SportCards(args) {
  Cards.call(this, args);
}

SportCards.prototype = Object.create(Cards.prototype);
SportCards.prototype.constructor = SportCards;

SportCards.prototype.showPanel = function(panel) {
  Cards.prototype.showPanel.call(this, panel);

  switch (panel) {
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
};
SportCards.prototype.hidePanel = function(panel) {
  Cards.prototype.hidePanel.call(this, panel);

  var self = this;

  switch (panel) {
    case 'info':
      hideInfoPanel()
      break;
    case 'share':
      hideSharePanel();
      break;
    default:
      hideInfoPanel()
      hideSharePanel();
      break;
  }

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
};
