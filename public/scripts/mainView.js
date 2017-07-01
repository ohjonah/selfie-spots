'use strict'

var app = app || {};

(function(module) {

  var mainView = {};
  const defaultCoordinates = {lat: 47.6182, lng: -122.3519};
  var map;
  var coordinates;

  mainView.initializeMap = function() {  
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showCurrentPosition, showDefaultPosition);
    } else {
      showDefaultPosition();
    }
  }

  function showDefaultPosition() {
    coordinates = defaultCoordinates;
    showPosition();
  }

  function showCurrentPosition(position) {
    coordinates = { lat: position.coords.latitude, lng: position.coords.longitude };
    showPosition();
  }

  function showPosition() {
    map.setCenter(coordinates);
    setMarker(coordinates);
  }

  function setMarker(coordinates) {
    var marker = new google.maps.Marker({
      position: coordinates,
      map: map
    });
  }

  module.mainView = mainView;

})(app);