An attempt to learn javascript by building a framework.
Work in progress.

An ugly demo can be found from index.html ( which uses demo/ folder ).

###Currently has:###
- XRH Template Loading with lazy cache
- Template compile for static values

###Usage###

#####index.html#####
```html
<!-- element with 'view' attribute will have its content replaced by routed template -->
<div view>this will be replaced</div>

<!-- the path after #/ is used to identify navigation route name -->
<a href="#/defaultPage">default page</a>

<!-- mvc -->
<script type="text/javascript" src="mvc/mvc.js"></script>
<script type="text/javascript" src="mvc/mvc-route-manager.js"></script>
<script type="text/javascript" src="mvc/mvc-template-manager.js"></script>

<!-- app -->
<script type="text/javascript" src="demo/app.js"></script>
```

#####app.js#####
```js
(function(){
	jhmvc.getModule('RouteManager').add(function(model) {
		model.message = "Hello world";
		model.fn = {
			hi: function() { alert(model.message); }
		};
	}, 'defaultPage', 'default.html');

	jhmvc.init();
})();
```

#####default.html#####
```html
<!-- {{message}} will be replaced by controller's model.message -->
Hi? {{message}}<br/>
<span click-fn="hi">Click me for alert</span>
```
