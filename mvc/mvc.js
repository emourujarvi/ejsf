; (function(w, d, undefined) {
'use strict';

	console.log('Loading mvc...');

	var _viewElement = null;
	var _defaultRoute = null;
	var modules = {};

	function mvc() {

	};

	function addModule(key, module) {
		modules[key] = module;
	};

	function getModule(key) {
		if (key in modules) {
			return modules[key];
		} else {
			throw "Module '" + key + "' not found.";
		}
	};

	mvc.prototype.addModule = addModule;
	mvc.prototype.getModule = getModule;


	/** Base logic **/
	// TODO Move this somewhere? Or change how routes & templates are accessed & views are compiled?

	var bootstrap = function() {
		var pageHash = w.location.hash.replace('#', '');
		var routeName = pageHash.replace('/', '');
		var route = getModule('RouteManager').get(routeName);

		if (!route) {
			route = _defaultRoute;
		}

		loadTemplate(route, _viewElement, pageHash);
	};

	mvc.prototype.init = function() {
		var delegate = bootstrap.bind(this);

		_viewElement = d.querySelector('[view]');
		if (!_viewElement) {
			console.log("'view' attribute not found...");
			return;
		}

		_viewElement.removeAttribute('view');

		_defaultRoute = getModule('RouteManager').getIndex(0);

		window.onhashchange = delegate;
		delegate();
	};

	var loadTemplate = function(route, element) {
		getModule('TemplateManager').get(route.template, function(template) {
			loadView(route, element, template);
		});
	};

	var loadView = function(route, viewElement, viewHtml) {
		var model = {};

		route.controller(model);
		viewHtml = replaceToken(viewHtml, model);
		viewElement.innerHTML = viewHtml;

		getModule('ComponentManager').handle(viewElement, model);
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