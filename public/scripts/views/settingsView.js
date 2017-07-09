'use strict';

var app = app || {};

(function(module) {

  var settingsView = {};

  settingsView.index = function() {
    $('section').addClass('hidden');
    $('#settings').removeClass('hidden');
    $('#settings-name').val(app.User.name);
    $('#settings-email').val(app.User.email);
    $('#submit-button').on('click', function(event) {
      $.ajax({
        method:'PUT',
        url:'/users/' + app.User.id,
        data: {
          name: $('#settings-name').val(),
          email: $('#settings-email').val()
        }

      }).done(
        function() {
          let name = $('#settings-name').val();
          let email = $('#settings-email').val();
          localStorage.setItem('name', name);
          localStorage.setItem('email', email);
          app.User.name = name;
          app.User.email = email;
          page('/');
        }
      );

      event.preventDefault();
    });

    $('#delete-button').on('click', function(event) {
      $.ajax({
        method:'DELETE',
        url:'/users/' + app.User.id
      }).done(
        function() {
          localStorage.removeItem('name');
          localStorage.removeItem('email');
          localStorage.removeItem('user_id');
          delete app.User.id;
          delete app.User.name;
          delete app.User.email;
          $('#settings').addClass('hidden');
          $('#main').removeClass('hidden');
          $('#landing').removeClass('hidden');
          $('#login-name').val('');
          $('#login-email').val('');
          $('#name').html('');
          page('/');
        }
      );

      event.preventDefault();
    });
  };

  module.settingsView = settingsView;

})(app);
