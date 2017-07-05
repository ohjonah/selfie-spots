'use strict';

var app = app || {};

(function(module) {

  var favoritesView = {};
  
  favoritesView.index = function(favorites) {
    let $favorites = $('#favorites');

    favorites = app.Spot.all;

    $favorites.fadeIn(100).siblings('section').hide();

    let template = Handlebars.compile($('#favorite-template').html());
    favorites.forEach(f => $favorites.append(template(f)));
  };

  module.favoritesView = favoritesView;

})(app);
