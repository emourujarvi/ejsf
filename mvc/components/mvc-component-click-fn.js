; (function(w, d, undefined) {
'use strict';

	var ClickComponent = function(viewElement, model) {
		var name = 'click-fn';

		var clicks = viewElement.querySelectorAll('[' + name + ']');

		for (var i = 0; i < clicks.length; ++i) {
			var c = clicks[i];
			var attr = c.getAttribute(name);
			c.onclick = model.fn[attr];
			c.removeAttribute(name);
		}
	}

	window['jhmvc'].getModule('ComponentManager').set('click-fn', ClickComponent);

}(window, document));