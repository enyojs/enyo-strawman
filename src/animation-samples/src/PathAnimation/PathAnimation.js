var
	kind = require('enyo/kind'),
	Control = require('enyo/Control'),
	sceneActor = require('enyo/AnimationSupport/SceneActor'),
	scene = require('enyo/AnimationSupport/Scene');

var path = sceneActor({
	animation: [{
		path:[[0,0,0], [0,-200,0], [200,-200,0], [200,200,0], [0,200,0], [0,0,0]]
	}],
	duration: 1000,
	actorCompleted: function(actor) {
		this.stop(actor);
		actor.delay = 0;
		this.play(actor);
	}
});
	
module.exports = kind({
	name: "pathsample",
	kind: Control,
	classes: "enyo-fit path-sample",
	components: [
		{ name: 'dot1', classes: "dot", style: "background:black;", delay: 0   },
		{ name: 'dot2', classes: "dot", style: "background:blue;",  delay: 200 },
		{ name: 'dot3', classes: "dot", style: "background:red;",   delay: 400 },
		{ name: 'dot4', classes: "dot", style: "background:green;", delay: 600 }
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			for (var c, i = 0; (c = this.controls[i]); i++) {
				scene.link(c, path);
				path.play(c);
			}
		};
	})
});
