'use strict';

var app = app || {};

(function(module) {

  var mainView = {};

  const defaultCoordinates = {lat: 47.6182, lng: -122.3519};
  const mapInitializedEvent = new Event('initialized');

  var map;
  var coordinates;
  

  mainView.index = function() {
    $('section').addClass('hidden');
    $('#main').removeClass('hidden');

    app.view.menuToggle();
  };

  mainView.initializeMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showCurrentPosition, showDefaultPosition);
    } else {
      showDefaultPosition();
    }
  };

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
    mainView.setMarker(coordinates);
    showNearbySpots();
  }

  mainView.setMarker = function(coordinates, icon, id) {
    var marker = new google.maps.Marker({
      position: coordinates,
      map: map,
      icon: icon
    });

    marker.locId = id;

    marker.addListener('click', () => page(`/spots/${marker.locId}`));
  };

  function setSpotMarker(coordinates, selfieCount, id) {
    var icon = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 5 + selfieCount
    };

    mainView.setMarker(coordinates, icon, id);
  }

  function showNearbySpots() {
    app.Spot.fetchNearby(coordinates, function(spots) {
      spots.forEach(function(spot) {
        setSpotMarker({lat: spot.latitude, lng: spot.longitude}, spot.count, spot.id);
      });

      $('#map').trigger('initialized');
    });
  }

  module.mainView = mainView;

})(app);
