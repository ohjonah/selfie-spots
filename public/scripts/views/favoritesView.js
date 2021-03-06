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
        method: "DELETE",
        url: `/users/${app.User.id}/favorites`,
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
