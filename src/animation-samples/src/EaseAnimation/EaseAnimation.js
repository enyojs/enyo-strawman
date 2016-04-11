var
	kind = require('enyo/kind'),
	anim = require('enyo/animation'),
	control = require('enyo/Control');

module.exports = kind({
	name: "EasingSample",
	kind: control,
	isAnimated: false,
	classes: "enyo-fit ease-sample",
	handlers: {
		onmouseover: "easingAnim"
	},
	components: [
		{
			name: "linear",
			content: "linear",
			style: "left: 2%;",
			scene: { translate: "0,-500, 0", duration: 3000 },
			classes: "balloon red"
		}, {
			name: "easeInBounce",
			content: "easeInBounce",
			style: "left: 11%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: anim.easing.easeInBounce },
			classes: "balloon blue"
		}, {
			name: "easeOutBounce",
			content: "easeOutBounce",
			style: "left: 20%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: anim.easing.easeOutBounce },
			classes: "balloon red"
		}, {
			name: "easeInOutBounce",
			content: "easeInOutBounce",
			style: "left: 29%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: anim.easing.easeInOutBounce },
			classes: "balloon blue"
		}, {
			name: "easeInElastic",
			content: "easeInElastic",
			style: "left: 38%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: anim.easing.easeInElastic },
			classes: "balloon red"
		}, {
			name: "easeOutElastic",
			content: "easeOutElastic",
			style: "left: 47%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: anim.easing.easeOutElastic },
			classes: "balloon blue"
		}, {
			name: "easeInOutElastic",
			content: "easeInOutElastic",
			style: "left: 56%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: anim.easing.easeInOutElastic },
			classes: "balloon red"
		}, {
			name: "easeInExpo",
			content: "easeInExpo",
			style: "left: 65%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: anim.easing.easeInExpo },
			classes: "balloon blue"
		}, {
			name: "easeOutExpo",
			content: "easeOutExpo",
			style: "left: 74%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: anim.easing.easeOutExpo },
			classes: "balloon red"
		}, {
			name: "easeInOutExpo",
			content: "easeInOutExpo",
			style: "left: 83%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: anim.easing.easeInOutExpo },
			classes: "balloon blue"
		}, {
			name: "cubicBezier",
			content: "custom",
			style: "left: 92%;",
			/**
			* Points on bezier-curve as at x% of time y% of distance cover
			* Here, the bezier-curve should be as defined
			* On 30% of time, 50% of distance should cover
			* On 80% of time, 10% of distance in opposite direction should cover
			*/
			scene: { translate: "0,-500, 0", duration: 3000, ease: { 30: 50, 80: -10 } },
			classes: "balloon red"
		}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			if (!this.isAnimated) {
				for (var c, i = 0; (c = this.controls[i]); i++) {
					c.scene.play();
				}
				this.isAnimated = true;
			}
		};
	}),
	/**
	* Add duration and animation to each balloons to fly
	* Ease property is already defined with each balloons
	*/
	easingAnim: function () {
		
	}
});