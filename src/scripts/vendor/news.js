'use strict';

function NewsCards(args) {
  Cards.call(this, args);
}

NewsCards.prototype = Object.create(Cards.prototype);
NewsCards.prototype.constructor = NewsCards;

NewsCards.prototype.showPanel = function(panel) {
  Cards.prototype.showPanel.call(this, panel);

  switch (panel) {
    case 'info':
      // set flag
      this.panel.panelOpen = true;

      // change text
      this.panel.triggerText.innerText = 'Close';

      // transform elements
      this.card.cardCTA.style.transform = 'translateY(-' + (this.card.cardInfoPanel.clientHeight / 2.5) + 'px)';
      this.card.cardContent.style.transform = 'translateY(-' + this.card.cardInfoPanel.clientHeight + 'px)';
      this.panel.container.style.transform = 'translateY(-' + this.card.cardInfoPanel.clientHeight + 'px)';

      break;
    case 'share':
      this.share.panelOpen = true;

      break;
  }
};
NewsCards.prototype.hidePanel = function(panel) {
  Cards.prototype.hidePanel.call(this, panel);

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
    self.card.cardCTA.style.transform = 'translateY(0px)';
    self.card.cardContent.style.transform = 'translateY(0px)';
    self.panel.container.style.transform = 'translateY(0px)';

  };
}
