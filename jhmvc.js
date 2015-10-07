; (function(w, d, undefined) {
	console.log('Loading mvc...');

	var _viewElement = null;
	var _defaultRoute = null;

	var route = function(c, r, t) {
		this.controller = c;
		this.route = r;
		this.template = t;
	};

	var mvc = function() {
		this._routeMap = {};
	};

	var bootstrap = function() {
		var pageHash = w.location.hash.replace('#', '');
		var routeName = pageHash.replace('/', '');
		var route = this._routeMap[routeName];

		if (!route) {
			route = _defaultRoute;
			console.log("Route with name: '" + routeName + "' was not found.");
		}

		loadTemplate(route, _viewElement, pageHash);
	}

	mvc.prototype.addRoute = function(c, r, t) {
		var rr = new route(c, r, t);
		this._routeMap[r] = rr;
	};

	mvc.prototype.init = function() {
		var delegate = bootstrap.bind(this);

		_viewElement = d.querySelector('[view]');
		if (!_viewElement) {
			console.log("'view' attribute not found...");
			return;
		}

		_defaultRoute = this._routeMap[Object.getOwnPropertyNames(this._routeMap)[0]];

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