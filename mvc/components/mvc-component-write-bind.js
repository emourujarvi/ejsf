; (function(w, d, undefined) {
'use strict';
	var name = 'write-bind';

	var updateModel = function(model, attr, value) {
		var a = attr.split('.');
		
		if (a.length > 1) {
			if (!model.hasOwnProperty(a[0])) {
				model[a[0]] = {};
			}
		} else {
			model[attr] = value;
			return;
		}

		a.reduce(function(previousValue, currentValue, index, array) {
			if (index == 1) {
				if (a.length == 2) {
					model[previousValue][currentValue] = value;
				} else {
					model[previousValue][currentValue] = {};
					return model[previousValue][currentValue];
				}
			} else {
				if (!previousValue.hasOwnProperty(currentValue)) {
					if (index + 1 < a.length) {
						previousValue[currentValue] = {};
					} else {
						previousValue[currentValue] = value;
					}
				} else {
					if (index + 1 == a.length) {
						previousValue[currentValue] = value;
					}
				}

				return previousValue[currentValue];
			}
		});
	};

	var WriteBindComponent = function(viewElement, model) {
		var elems = viewElement.querySelectorAll('[' + name + ']');

		for (var i = 0; i < elems.length; ++i) {
			(function () {
				var e = elems[i];
				var attr = e.getAttribute(name);
				e.onchange = e.oninput = function() {
					updateModel(model, attr, e.value);
				};
			}());
		}
	}

	window['jhmvc'].getModule('ComponentManager').set(name, WriteBindComponent);

}(window, document));