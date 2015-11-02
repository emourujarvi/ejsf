; (function(w, d, undefined) {
'use strict';

	var TemplateManager = function() {
		var name = "TemplateManager";
		var templateMap = { };
		var _rootLocation = '';

		var templates = {};

		templates.rootLocation = function rootLocation(root) {
			if (typeof root === 'undefined') {
				return _rootLocation;
			} else {
				_rootLocation = root;
				return _rootLocation;
			}
		}

		// TODO Make this use promises instead of callback
		// Should this use the same method as above?
		templates.get = function get(key, cb) {
			key = _rootLocation + key;
			if (key in templateMap) {
				cb(templateMap[key]);
			} else {
				templates.loadXHRTemplate(key, cb);
			}
		};

		// TODO Make this use promises instead of callback
		templates.loadXHRTemplate = function loadXHRTemplate(key, cb) {
			var xmlHttp = new XMLHttpRequest();

			xmlHttp.onreadystatechange = function() {
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
					var template = xmlHttp.responseText;
					templateMap[key] = template;
					cb(template);
				}
			}

			xmlHttp.open('GET', key, true);
			xmlHttp.send();
		};

		var api = {
			get: templates.get,
			rootLocation: templates.rootLocation
		};

		return api;
	}

	window['jhmvc'].addModule('TemplateManager', TemplateManager());

}(window, document));