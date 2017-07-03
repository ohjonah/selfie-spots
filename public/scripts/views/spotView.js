'use strict';

var app = app || {};

(function(module) {
  //
  // var contentString = '<div id="content">'+
  //     '<div id="bodyContent">'+
  //     '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
  //     'sandstone rock formation in the southern part of the '+
  //     'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
  //     'south west of the nearest large town, Alice Springs; 450&#160;km '+
  //     '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
  //     'features of the Uluru - Kata Tjuta National Park. Uluru is '+
  //     'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
  //     'Aboriginal people of the area. It has many springs, waterholes, '+
  //     'rock caves and ancient paintings. Uluru is listed as a World '+
  //     'Heritage Site.</p>'+
  //     '</div>' +
  //     '</div>';
  //
  // var infowindow = new google.maps.InfoWindow({
  //   content: contentString
  // });

  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    title: 'Uluru (Ayers Rock)'
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

  module.markerView = markerView;
})(app);
