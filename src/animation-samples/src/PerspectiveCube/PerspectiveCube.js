/*jslint white: true*/
var kind = require('enyo/kind'),
	image = require('enyo/Image'),
	scene = require('enyo/AnimationSupport/Scene'),
	Easings = require('enyo/AnimationSupport/Easings');

var spincube = scene({
	repeat: true,
	animation: [
		{ rotate: "0, 90, 0", ease: Easings.easeInOutQuad, duration: 1920 },
		{ rotate: "90, 90, 0", ease: Easings.easeInOutQuad, duration: 2040 },
		{ rotate: "0, 180, 90", ease: Easings.easeInOutQuad, duration: 2040 },
		{ rotate: "0, 270, 0", ease: Easings.easeInOutQuad, duration: 1920 },
		{ rotate: "-90, 270, 0", ease: Easings.easeInOutQuad, duration: 2040 },
		{ rotate: "0, 360, 0", ease: Easings.easeInOutQuad, duration: 2040}
	]
});

module.exports = kind({
	name: "cube",
	classes: "enyo-fit cube",
	components: [{
		name: "cubespinner",
		classes: "cubespinner container",
		scene: spincube,
		components: [{
			name: "face1",
			content: 1,
			scene: { translate: "0, 0, 60", duration: 50}
		}, {
			name: "face2",
			content: 2,
			scene: { rotate: "0, -90, 0", translate: "60, 0, 0", duration: 50}
		}, {
			name: "face3",
			content: 3,
			scene: { rotate: "0, -90, 90", translate: "0, -60, 0", duration: 50}
		}, {
			name: "face4",
			content: 4,
			scene: { rotate: "0, -180, 90", translate: "0, 0, -60", duration: 50}
		}, {
			name: "face5",
			content: 5,
			scene: { rotate: "0, -270, 0", translate: "-60, 0, 0", duration: 50}
		}, {
			name: "face6",
			content: 6,
			scene: { rotate: "-90, 0, 90", translate: "0, 60, 0", duration: 50}
		}]
	}],

	rendered: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.startAnimation();
		};
	}),

	startAnimation: function () {
		this.$.face1.scene.play();
		this.$.face2.scene.play();
		this.$.face3.scene.play();
		this.$.face4.scene.play();
		this.$.face5.scene.play();
		this.$.face6.scene.play();
		spincube.play();
	}
});