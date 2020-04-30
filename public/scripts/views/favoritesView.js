'use strict';

var app = app || {};

(function(module) {

  var favoritesView = {};

  favoritesView.index = function(favorites) {
    let $favorites = $('#favorites');
    $('section').addClass('hidden');
    $favorites.removeClass('hidden');
    $favorites.empty();
    let template = Handlebars.compile($('#favorite-template').html());
    favorites.forEach(f => $favorites.append(template(f)));

    $favorites.find('.favorite').find('a').on('click', function(e) {
      e.preventDefault();
      $.ajax({
<<<<<<< HEAD
        method: 'DELETE',
        url: `users/${app.User.id}/favorites`,
=======
        method: "DELETE",
        url: `/users/${app.User.id}/favorites`,
>>>>>>> 6ff73a1f09ae182f1d609bf14262adf17211fd16
        data: {
          location_id: Number($(this).data('id'))
        }
      }).done(() => {
        $(this).parent().remove();
      });
    });
  };

  module.favoritesView = favoritesView;

})(app);
