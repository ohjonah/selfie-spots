'use strict'

var app = app || {};

(function(module) {

  var mainView = {}

  mainView.initializeMap = function() {
    var coordinates = {lat: 47.6182, lng: -122.3519};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: coordinates
    });

    var marker = new google.maps.Marker({
      position: coordinates,
      map: map
    });
  }

  module.mainView = mainView;

})(app);