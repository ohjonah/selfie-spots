'use strict';

var app = app || {};

page('/', app.mainController.index);
page('/favorites', app.favoritesController.index);
page('/settings', app.settingsController.index);
page('/spots/:id', app.spotsController.index);
page();