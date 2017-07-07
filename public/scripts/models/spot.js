'use strict';

var app = app || {};

(function (module) {

  function Spot(spotData) {
    Object.keys(spotData).forEach(k => this[k] = spotData[k]);
  }

  Spot.all = [];

  Spot.fetchNearby = function(coordinates, callback) {
    $.getJSON(`/ig/media/search?lat=${coordinates.lat}&lng=${coordinates.lng}&distance=5000`, function(spotData) {
      Spot.all = spotData.data.map(s => {
        s.location.images = [s.images.low_resolution.url];
        return s.location;
      }).reduce(groupBySpot, [])
        .map(s => new Spot(s));
      callback(Spot.all);
    });
  };

  Spot.fetchFavorites = function (userId, callback) {
    if (app.User.favorites.length > 0) {
      callback(app.User.favorites);
      return;
    }

    $.getJSON(`/users/${userId}/favorites`, function (favoritesData) {
      for (var index = 0; index < favoritesData.length; index++) {
        var favorite = favoritesData[index];
        var loadedFavorite = app.Spot.all.find(s => s.id === favorite.location_id);

        if (loadedFavorite) {
          app.User.favorites.push(loadedFavorite);
        } else {
          $.getJSON(`/ig/locations/${favorite.location_id}`, function (locationData) {
            favorite.name = locationData.data.name;
            favorite.count = 1;
            favorite.id = favorite.location_id;
            delete favorite.location_id;

            let spot = new Spot(favorite);

            app.Spot.all.push(spot);
            app.User.favorites.push(spot);

            if (app.User.favorites.length === favoritesData.length) {
              callback(app.User.favorites);
              return;
            }
          });
        }
      }

      if (app.User.favorites.length === favoritesData.length) {
        callback(app.User.favorites);
      }
    });
  };

  function groupBySpot(acc, cur) {
    var spot = acc.find(l => l.id === cur.id);

    if (spot) {
      spot.count++;
      spot.images = spot.images.concat(cur.images);
    } else {
      cur.count = 1;
      acc.push(cur);
    }

    return acc;
  }

  Spot.sumSelfieCount = function () {
    var sum = Spot.all.map(spot => spot.count)
      .reduce((acc, curr) => acc + curr);

    return sum;
  };

  Spot.calcPopScore = function (spotIdMatch) {
    var popScore = spotIdMatch.count / app.Spot.sumSelfieCount();


    if (popScore > 0.2) {
      return 'Awesome Spot!';
    } else if (popScore > 0.11 && popScore <= 0.20) {
      return 'Acceptable Spot';
    } else {
      return 'Meh Spot...';
    }
  };
  
  module.Spot = Spot;
})(app);
