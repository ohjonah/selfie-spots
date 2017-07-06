'use strict';

var app = app || {};

(function(module){
  var view = {};

  view.menuToggle = () => {
    var $menu = $('#menu');
    var $hamburger = $('.icon-menu');

    $hamburger.on('click', function(){
      $menu.toggleClass('active');
      $hamburger.toggleClass('active');
    });
};

  module.view = view;
})(app);
