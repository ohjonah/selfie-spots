'use strict';

var app = app || {};

page('/', app.landingController.index, app.mainController.index);
page('/favorites', app.favoritesController.loadAll, app.favoritesController.index);
page('/settings', app.settingsController.index);
page('/spots/:id', app.spotsController.load, app.spotsController.render);

page();
