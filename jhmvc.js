; (function(w, d, undefined) {

	var RouteManager = function() {
		var name = "RouteManager";
		var routeMap = {};

		var routes = {};

		routes.create = function create(c, r, t) {
			return {
				controller: c,
				route: r,
				template: t
			}
		};

		routes.add = function add(c, r, t) {
			var rr = routes.create(c, r, t);
			routeMap[r] = rr;
		};

		routes.get = function get(r) {
			return routeMap[r];
		};

		routes.set = function set(r) {
			routeMap[r.route] = r;
		};

		routes.getIndex = function getIndex(index) {
			return routeMap[Object.getOwnPropertyNames(routeMap)[index]];
		};

		var api = {
			routes: routes,
		}

		return api;
	}

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

	console.log('Loading mvc...');

	var _routeManager = RouteManager();
	var _templateManager = TemplateManager();
	var _viewElement = null;
	var _defaultRoute = null;

	function mvc() {

	};

	mvc.prototype.routeManager = _routeManager;
	mvc.prototype.templateManager = _templateManager;

	var bootstrap = function() {
		var pageHash = w.location.hash.replace('#', '');
		var routeName = pageHash.replace('/', '');
		var route = _routeManager.routes.get(routeName);

		if (!route) {
			route = _defaultRoute;
		}

		loadTemplate(route, _viewElement, pageHash);
	}

	mvc.prototype.init = function() {
		var delegate = bootstrap.bind(this);

		_viewElement = d.querySelector('[view]');
		if (!_viewElement) {
			console.log("'view' attribute not found...");
			return;
		}

		_defaultRoute = _routeManager.routes.getIndex(0);

		window.onhashchange = delegate;
		delegate();
	};

	var loadTemplate = function(route, element) {
		_templateManager.get(route.template, function(template) {
			loadView(route, element, template);
		});
	};

	var loadView = function(route, viewElement, viewHtml) {
		var model = {};

		route.controller(model);
		viewHtml = replaceToken(viewHtml, model);
		viewElement.innerHTML = viewHtml;
	};

	var replaceToken = function(viewHtml, model) {
		var modelProps = Object.getOwnPropertyNames(model);

		modelProps.forEach(function (element, index, array) {
			viewHtml = viewHtml.replace('{{' + element + '}}', model[element]);
		});

		return viewHtml;
	};

	window['jhmvc'] = new mvc();

}(window, document));