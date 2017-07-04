'use strict';

var app = app || {};

(function(module) {

  let spotView = {};

  spotView.searchByLocId = function(locId) {
    var spotIdMatch = app.Spot.all.find((spot) => spot.id === locId);
    spotIdMatch.popScore = app.Spot.calcPopScore(spotIdMatch);

    spotView.initSpotView(spotIdMatch);
  };
  //
  // spotView.toggleClass = function(callback) {
  //
  // }

  spotView.initSpotView = function(spotIdMatch) {
    $('#spot-overlay').append(render(spotIdMatch));
  }

  // private helper function to render to DOM
  var template = $('#spot-template').html();
  let render = Handlebars.compile(template);

  module.spotView = spotView;
})(app);
