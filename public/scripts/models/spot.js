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
    })
  }

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

  // app.Spot.prototype.toHtml = function() {
  //   let template = Handlebars.compile($('#spot-template').text());
  //   return template(this);
  // };

  module.Spot = Spot;
})(app);
