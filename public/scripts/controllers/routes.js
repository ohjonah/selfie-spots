'use strict';

var app = app || {};

page('/', app.landingController.index, app.mainController.index);
page('/favorites', app.landingController.index, app.favoritesController.loadAll, app.favoritesController.index);
page('/settings', app.landingController.index, app.settingsController.index);
page('/spots/:id', app.landingController.index, app.spotsController.load, app.spotsController.render, app.spotsController.show);

page();
