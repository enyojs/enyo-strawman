var
	kind = require('enyo/kind'),
	easings = require('enyo/AnimationSupport/Easings'),
	scene = require('enyo/AnimationSupport/Scene'),
	control = require('enyo/Control');


var easeAnim = scene({ animation: [{ translate: "0,-500, 0" }], duration: 3000 });

module.exports = kind({
	name: "EasingSample",
	kind: control,
	isAnimated: false,
	classes: "ease-sample",
	handlers: {
		onmouseover: "easingAnim"
	},
	components: [
	// {
	// content: "Easing Animation Sample"
	// }, 
		{
			//No ease define, i.e. linear animation
			name: "linear",
			animate: true,
			content: "linear",
			style: "left: 2%;",
			classes: "balloon red"
		}, {
			name: "easeInBounce",
			animate: true,
			ease: easings.easeInBounce,
			content: "easeInBounce",
			style: "left: 11%;",
			classes: "balloon blue"
		}, {
			name: "easeOutBounce",
			animate: true,
			ease: easings.easeOutBounce,
			content: "easeOutBounce",
			style: "left: 20%;",
			classes: "balloon red"
		}, {
			name: "easeInOutBounce",
			animate: true,
			ease: easings.easeInOutBounce,
			content: "easeInOutBounce",
			style: "left: 29%;",
			classes: "balloon blue"
		}, {
			name: "easeInElastic",
			animate: true,
			ease: easings.easeInElastic,
			content: "easeInElastic",
			style: "left: 38%;",
			classes: "balloon red"
		}, {
			name: "easeOutElastic",
			animate: true,
			ease: easings.easeOutElastic,
			content: "easeOutElastic",
			style: "left: 47%;",
			classes: "balloon blue"
		}, {
			name: "easeInOutElastic",
			animate: true,
			ease: easings.easeInOutElastic,
			content: "easeInOutElastic",
			style: "left: 56%;",
			classes: "balloon red"
		}, {
			name: "easeInExpo",
			animate: true,
			ease: easings.easeInExpo,
			content: "easeInExpo",
			style: "left: 65%;",
			classes: "balloon blue"
		}, {
			name: "easeOutExpo",
			animate: true,
			ease: easings.easeOutExpo,
			content: "easeOutExpo",
			style: "left: 74%;",
			classes: "balloon red"
		}, {
			name: "easeInOutExpo",
			animate: true,
			ease: easings.easeInOutExpo,
			content: "easeInOutExpo",
			style: "left: 83%;",
			classes: "balloon blue"
		}, {
			name: "cubicBezier",
			animate: true,
			/**
			* Points on bezier-curve as at x% of time y% of distance cover
			* Here, the bezier-curve should be as defined
			* On 30% of time, 50% of distance should cover
			* On 80% of time, 10% of distance in opposite direction should cover
			*/
			ease: {
				30: 50,
				80: -10
			},
			content: "custom",
			style: "left: 92%;",
			classes: "balloon red"
		}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			for (var c, i = 0; (c = this.controls[i]); i++) {
				scene.link(c, easeAnim);
			}
		};
	}),
	/**
	* Add duration and animation to each balloons to fly
	* Ease property is already defined with each balloons
	*/
	easingAnim: function () {
		if (!this.isAnimated) {
			easeAnim.play();
			this.isAnimated = true;
		}
	}
});
