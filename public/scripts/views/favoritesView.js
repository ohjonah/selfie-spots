'use strict';

var app = app || {};

(function(module) {

  var favoritesView = {};
  
  favoritesView.index = function(favorites) {
    let $favorites = $('#favorites');
    $('section').addClass('hidden');
    $favorites.removeClass('hidden');

    let template = Handlebars.compile($('#favorite-template').html());
    favorites.forEach(f => $favorites.append(template(f)));
  };

  module.favoritesView = favoritesView;

})(app);
