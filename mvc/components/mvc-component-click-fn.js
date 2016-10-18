; (function(w, d, undefined) {
'use strict';
	var name = 'click-fn';

	var ClickComponent = function(viewElement, model) {
		var clicks = viewElement.querySelectorAll('[' + name + ']');

		for (var i = 0; i < clicks.length; ++i) {
			(function () {
				var c = clicks[i];
				var attr = c.getAttribute(name);
				c.onclick = model.fn[attr];
				c.removeAttribute(name);
			}());
		}
	}

	window['jhmvc'].getModule('ComponentManager').set(name, ClickComponent);

}(window, document));