'use strict';

var app = app || {};

(function(module) {
  const settingsController = {};

  settingsController.index = function() {
    app.settingsView.index();
  };

  module.settingsController = settingsController;
})(app);
