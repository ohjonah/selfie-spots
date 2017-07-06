'use strict';

var app = app || {};

(function(module) {
  const spotsController = {};

  // spotsController.show = function() {
  //
  // };

  spotsController.load = function(ctx, next) {
    console.log(ctx.params.id);
    app.spotsView.searchByLocId(ctx.params.id);
    next();

    //
  };

  module.spotsController = spotsController;
})(app);
