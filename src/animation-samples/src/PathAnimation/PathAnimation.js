var
	kind = require('enyo/kind'),
	Control = require('enyo/Control'),
	scene = require('enyo/scene');

var path = scene({
	animation: [{
		path:[[0,0,0], [0,-100,0], [100,-100,0], [100,100,0], [0,100,0], [0,0,0]],
		duration: 1000
	}],
	repeat: true
});
	
module.exports = kind({
	name: "pathsample",
	kind: Control,
	classes: "enyo-fit path-sample container",
	components: [
		{ name: 'dot1', classes: "dot", style: "background:black;", scene: path },
		{ name: 'dot2', classes: "dot", style: "background:blue;",  scene: path },
		{ name: 'dot3', classes: "dot", style: "background:red;",   scene: path },
		{ name: 'dot4', classes: "dot", style: "background:green;", scene: path }
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			for (var c, i = 0; (c = this.controls[i]); i++) {
				c.scene.delay = i * 200;
				c.scene.play();
			}
			// path.play();
		};
	})
});
