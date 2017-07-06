'use strict';

var app = app || {};

(function(module) {
  const spotsController = {};

  // spotsController.show = function() {
  //
  // };

  spotsController.load = function(ctx, next) {
    app.spotsView.searchByLocId(parseInt(ctx.params.id));
    next();

    //
  };

  module.spotsController = spotsController;
})(app);
