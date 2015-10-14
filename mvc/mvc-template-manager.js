; (function(w, d, undefined) {

	var TemplateManager = function() {
		var name = "TemplateManager";
		var templateMap = { };

		var templates = {};

		// TODO Make this use promises instead of callback
		templates.get = function get(key, cb) {
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
			get: templates.get
		};

		return api;
	}

	window['jhmvc'].addModule('TemplateManager', TemplateManager());

}(window, document));