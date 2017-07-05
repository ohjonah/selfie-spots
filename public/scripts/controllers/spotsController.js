'use strict';

var app = app || {};

(function(module) {
  const spotsController = {};

  // spotsController.show = function() {
  //
  // };

  spotsController.load = function(ctx, next) {
    console.log(ctx.params.id);
    next();

    // app.spotsView.searchByLocId(id);
  };

  module.spotsController = spotsController;
})(app);
