(function(){

	// console.log('Creating default controller...');
	var defaultController = function(model) {
		model.message = "Hello world";
	}

	var aboutController = function(model) {
		model.creator = "Esa-Matti Mourujärvi";
		model.year = "2015";
	}

	var rm = jhmvc.getModule('RouteManager');
	rm.routes.add(defaultController, 'default', 'views/default.html');
	rm.routes.add(aboutController, 'about', 'views/about.html');

	jhmvc.init();
})();