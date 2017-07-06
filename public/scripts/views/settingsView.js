'use strict';

var app = app || {};

(function(module) {

  var settingsView = {};

  settingsView.index = function() {
    $('section').addClass('hidden');
    $('#settings').removeClass('hidden');
  };

  module.settingsView = settingsView;

})(app);
