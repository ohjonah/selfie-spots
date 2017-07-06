'use strict';

var app = app || {};

(function(module) {

  function Spot(spotData) {
    Object.keys(spotData).forEach(k => this[k] = spotData[k]);
  }

  Spot.all = [];

  Spot.fetchNearby = function(coordinates, callback) {
    $.getJSON(`/ig/media/search?lat=${coordinates.lat}&lng=${coordinates.lng}&distance=5000`, function(spotData) {
      Spot.all = spotData.data.map(s => s.location)
                              .reduce(groupBySpot, [])
                              .map(s => new Spot(s));

      callback(Spot.all);
    });
  };

  Spot.fetchFavorites = function(userId, callback) {
    $.getJSON(`/users/${userId}/favorites`, function(favoritesData) {
      var favoriteSpots = favoritesData.filter(f => app.Spot.all.any(s => f.location_id === s.location_id))
                   .reduce(groupBySpot, [])
                   .map(s => new Spot(s));
      
      favoriteSpots.forEach(Spot.all.push);

      callback(favoriteSpots);
    });
  };

  function groupBySpot(acc, cur) {
    var spot = acc.find(l => l.id === cur.id);

    if (spot) {
      spot.count++;
    } else {
      cur.count = 1;
      acc.push(cur);
    }

    return acc;
  }

  Spot.sumSelfieCount = function() {
    var sum = Spot.all.map(spot => spot.count)
                      .reduce((acc, curr) => acc + curr);

    return sum;
  };

  Spot.calcPopScore = function(spotIdMatch) {
    var popScore = spotIdMatch.count/app.Spot.sumSelfieCount();


    if (popScore > 0.2) {
      return 'Awesome Spot!';
    } else if (popScore > 0.11 && popScore <= 0.20) {
      return 'Acceptable Spot';
    } else {
      return 'Meh Spot...';
    }
  };

  // Spot.prototype.addToFavorites = function(callback)
  //   {
  //     $.post('/favorites', {name: this.name, count: this.count, popScore: this.popScore})
  //     .then(console.log)
  //     .then(callback);
  //   }



  module.Spot = Spot;
})(app);
