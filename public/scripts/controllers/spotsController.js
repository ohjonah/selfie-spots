'use strict';

var app = app || {};

(function(module) {
  const spotsController = {};

  spotsController.load = function(ctx, next) {
    if (app.Spot.all.length === 0) {
      document.getElementById('map').addEventListener('initialized', function() {
        app.spotsView.searchByLocId(parseInt(ctx.params.id), function(spot) {
          ctx.spot = spot;
        });

        next();
      });
    } else {
      app.spotsView.searchByLocId(parseInt(ctx.params.id), function(spot) {
        ctx.spot = spot;
      });

      next();
    }
  };

  spotsController.render = function(ctx, next) {
    app.spotsView.initSpotView(ctx.spot);

    next();
  };

  spotsController.show = function() {
    $('#spots').removeClass('hidden');
  };

  module.spotsController = spotsController;
})(app);
