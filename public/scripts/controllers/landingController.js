'use strict';

var app = app || {};

(function(module) {
  const landingController = {};

  landingController.index = function(ctx, next) {
    if (app.User.id || app.User.loadLocal()) {
      $('#landing').addClass('hidden');
      $('#name').text(app.User.name);
      next();
      return;
    }

    $('#login-button').on('click', function(event) {
      let name = $('#login-name').val();
      let email = $('#login-email').val();
      app.User.loadRemote(name, email, function() {
        $('#landing').addClass('hidden');
        $('#name').text(app.User.name);
        next();
      });
      event.preventDefault();
    });
  };

  module.landingController = landingController;
})(app);
