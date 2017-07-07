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
        function(results) {
          console.log(results);
          localStorage.setItem('name', $('#settings-name').val());
          localStorage.setItem('email',
          $('#settings-email').val());
          page('/');
        }
      );
    });

    $('#delete-button').on('click', function(event) {
      $.ajax({
        method:'DELETE',
        url:'/users/' + app.User.id
      }).done(
        function(results) {
          console.log(results);
          localStorage.removeItem('name');
          localStorage.removeItem('email');
          localStorage.removeItem('user_id');
          $('#settings').addClass('hidden');
          $('#main').removeClass('hidden');
          $('#landing').removeClass('hidden');
          $('#login-name').val('');
          $('#login-email').val('');
          $('#name').html('');
          page('/');
        }
      );
    });
  };

  module.settingsView = settingsView;

})(app);
