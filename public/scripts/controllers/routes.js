'use strict';

var app = app || {};

page('/', app.landingController.index, app.landingController.proceed);
page('/favorites', app.favoritesController.loadAll, app.favoritesController.index);
page('/settings', app.settingsController.index);
page('/spots/:id', app.spotsController.index);
page();