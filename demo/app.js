(function(){

	jhmvc.getModule('TemplateManager').rootLocation('demo/views/');

	// console.log('Creating default controller...');
	var defaultController = function(model) {
		model.message = "Hello world";
	}

	var aboutController = function(model) {
		model.creator = "Esa-Matti Mourujärvi";
		model.year = "2015";
	}

	var rm = jhmvc.getModule('RouteManager');
	rm.add(defaultController, 'default', 'default.html');
	rm.add(aboutController, 'about', 'about.html');

	jhmvc.init();
})();