'use strict';

var app = app || {};

(function(module) {
  const favoritesController = {};

  favoritesController.index = function(ctx) {
    app.favoritesView.index(ctx.favorites);
  };

  favoritesController.loadAll = function(ctx, next) {
    app.Spot.fetchFavorites(ctx.params.id, function(favorites) {
      ctx.favorites = favorites;
      next();
    });
  };

  module.favoritesController = favoritesController;
})(app);
