'use strict';

var app = app || {};

(function(module) {
  const landingController = {};

  landingController.index = function(ctx, next) {
    if (app.User.loadLocal()) {
      next();
      return;
    }

    $('#login-button').on('click', function(event) {
      let name = $('#login-name').val();
      let email = $('#login-email').val();
      app.User.loadRemote(name, email, next);
      event.preventDefault();
    });
  };

  module.landingController = landingController;
})(app);
