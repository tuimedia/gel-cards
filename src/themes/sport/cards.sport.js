(function() {

  'use strict';

  if (Cards) {

    Cards.prototype.showMoreInfoPanel = function() {

      // set flag
      this.panel.panelOpen = true;

      // change text
      this.panel.triggerText.innerText = 'Close';

      // transform elements

      console.log('add custom sport transitions')

    };

    Cards.prototype.hideMoreInfoPanel = function() {

      // set flag
      this.panel.panelOpen = false;

      // change text
      this.panel.triggerText.innerText = 'More info';

      // transform elements
      console.log('add custom sport transitions')

    };

  }

}());