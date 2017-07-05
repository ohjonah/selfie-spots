'use strict';

var app = app || {};

(function(module) {

  let spotsView = {};

  spotsView.searchByLocId = function(locId) {
    var spotIdMatch = app.Spot.all.find((spot) => spot.id === locId);
    spotIdMatch.popScore = app.Spot.calcPopScore(spotIdMatch);

    spotsView.initSpotView(spotIdMatch);
  };

  spotsView.initSpotView = function(spotIdMatch) {
    $('#spot-overlay').empty().append(render(spotIdMatch));
    spotsView.infowindowHandler();
    spotsView.favoritesHandler();
  };

  spotsView.infowindowHandler = function() {
    $('#exit-overlay').on('click', function() {
      $('.infowindow').remove();
    });
  };

  spotsView.favoritesHandler = function() {
    $('#favorite-btn').on('click', function() {
      $('#favorite-btn').toggleClass('icon-star-full icon-star-empty');
    })
  }

  // private helper function to render to DOM
  var template = $('#spot-template').html();
  let render = Handlebars.compile(template);

  module.spotsView = spotsView;
})(app);
