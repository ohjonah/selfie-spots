'use strict';

var app = app || {};

(function(module) {
  const mainController = {};

  mainController.index = function() {
    app.mainView.index();
  };

  module.mainController = mainController;
})(app);
