'use strict';

var app = app || {};

(function(module) {

  let spotsView = {};

  spotsView.searchByLocId = function(locId, callback) {
    var spotIdMatch = app.Spot.all.find(spot => spot.id === locId);

    spotIdMatch.popScore = app.Spot.calcPopScore(spotIdMatch);

    callback(spotIdMatch);
  };

  spotsView.initSpotView = function(spotIdMatch) {
    $('#spots').empty().append(render(spotIdMatch));

    $.get(`/users/${app.User.id}/favorites`)
     .then(data => {
       if (data.includes(spotIdMatch.id)) {
         $('#favorite-btn').toggleClass('icon-star-full icon-star-empty');
       }
     });

    spotsView.infowindowHandler();
    spotsView.favoritesHandler(spotIdMatch.id);
  };

  spotsView.infowindowHandler = function() {
    $('#exit-overlay').on('click', function() {
      page('/');
    });
  };

  spotsView.favoritesHandler = function(spotId) {
    $('#favorite-btn').on('click', e => {
      $.get(`/users/${app.User.id}/favorites`)
      .then(data => data.includes(spotId))
      .toggleClass('icon-star-full')




      e.preventDefault();
      $.ajax({
        method: "POST",
        url: `/users/${app.User.id}/favorites`,

        data: {
          location_id: spotId;
        }
      }).done( () => {
        $('#favorite-btn').toggleClass('icon-star-full icon-star-empty');
      })
    })
  }

  // private helper function to render to DOM
  var template = $('#spot-template').html();
  let render = Handlebars.compile(template);

  module.spotsView = spotsView;
})(app);
