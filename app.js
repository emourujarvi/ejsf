(function(){

	// console.log('Creating default controller...');
	var defaultController = function(model) {
		model.message = "Hello world";
	}

	var aboutController = function(model) {
		model.creator = "Esa-Matti Mourujärvi";
		model.year = "2015";
	}

	// console.log('Adding default route...');
	jhmvc.addRoute(defaultController, 'default', 'views/default.html');
	jhmvc.addRoute(aboutController, 'about', 'views/about.html');
	// console.log('Initializing emvc...');

	jhmvc.init();
})();