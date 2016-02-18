var
	kind = require('enyo/kind'),
	Button = require('enyo/Button'),
	SceneActor = require('enyo/AnimationSupport/SceneActor'),
	Scene = require('enyo/AnimationSupport/Scene');

var path = SceneActor({
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
				Scene.link(c, path);
				path.play(c);
			}
		};
	})
});
