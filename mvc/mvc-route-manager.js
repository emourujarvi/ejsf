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

		return routes;
	}

	window['jhmvc'].addModule('RouteManager', RouteManager());

}(window, document));