'use strict';

var app = app || {};

(function(module) {
  const spotsController = {};

  spotsController.load = function(ctx, next) {
    app.spotsView.searchByLocId(parseInt(ctx.params.id), function(spot) {
      ctx.spot = spot;
    });
    next();
  };

  spotsController.render = function(ctx, next) {
    app.spotsView.initSpotView(ctx.spot);
  };

  module.spotsController = spotsController;
})(app);
