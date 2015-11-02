; (function(w, d, undefined) {
'use strict';

	var ComponentManager = function() {
		var name = "ComponentManager";
		var components = {};

		var api = {};

		api.all = function all() {
			return components;
		};

		api.set = function add(key, component) {
			components[key] = component;
		};

		api.get = function get(key) {
			return components[key];
		};

		api.delete = function set(key) {
			delete components[key];
		};

		api.handle = function handle(viewElement, model) {
			for (var key in components) {
				components[key](viewElement, model);
			}
		};

		return api;
	}

	window['jhmvc'].addModule('ComponentManager', ComponentManager());

}(window, document));