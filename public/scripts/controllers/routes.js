'use strict';

var app = app || {};

page('/home', app.mainController.index);
page('/favorites', app.favoritesController.index);
page('/settings', app.settingsController.index);
page('/spots/:id', app.spotsController.index);
page();
