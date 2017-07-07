'use strict';

var app = app || {};

(function(module) {
  var User = {};

  User.favorites = [];

  User.loadLocal = function() {
    app.User.id = localStorage.getItem('user_id');
    app.User.name = localStorage.getItem('name');
    app.User.email = localStorage.getItem('email');

    return Boolean(app.User.id);
  };

  User.loadRemote = function(name, email, callback) {
    app.User.name = name;
    app.User.email = email;

    $.getJSON(`/users/search?name=${app.User.name}&email=${app.User.email}`, function(userData) {
      if (userData.length > 0) {
        app.User.id = userData[0].user_id;
        app.User.save();
        callback();
      } else {
        app.User.create(callback);
      }
    });
  };

  User.create = function(callback) {
    $.post('/users', {
      name: app.User.name,
      email: app.User.email
    }).done(function() {
      $.getJSON(`/users/search?name=${app.User.name}&email=${app.User.email}`, function(userData) {
        app.User.id = userData[0].user_id;
        app.User.save();
        callback();
      });
   });
  }

  User.save = function() {
    localStorage.setItem('user_id', app.User.id);
    localStorage.setItem('name', app.User.name);
    localStorage.setItem('email', app.User.email);
  };

  module.User = User;
})(app);
