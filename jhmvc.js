; (function(w, d, undefined) {

	var RouteManager = function() {
		var name = "routemanager";
		var _routeMap = {};

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
			_routeMap[r] = rr;
		};

		routes.get = function get(r) {
			return _routeMap[r];
		};

		routes.set = function set(r) {
			_routeMap[r.route] = r;
		};

		routes.getIndex = function getIndex(index) {
			return _routeMap[Object.getOwnPropertyNames(_routeMap)[index]];
		};

		var api = {
			routes: routes,
		}

		return api;
	}

	console.log('Loading mvc...');

	var _routeManager = RouteManager();
	var _viewElement = null;
	var _defaultRoute = null;

	function mvc() {

	};

	mvc.prototype.routeManager = _routeManager;

	var bootstrap = function() {
		var pageHash = w.location.hash.replace('#', '');
		var routeName = pageHash.replace('/', '');
		var route = _routeManager.routes.get(routeName);

		if (!route) {
			route = _defaultRoute;
			console.log("Route with name: '" + routeName + "' was not found.");
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
		var xmlHttp = new XMLHttpRequest();

		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				loadView(route, element, xmlHttp.responseText);
			}
		}

		xmlHttp.open('GET', route.template, true);
		xmlHttp.send();
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