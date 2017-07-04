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



  module.Spot = Spot;
})(app);
