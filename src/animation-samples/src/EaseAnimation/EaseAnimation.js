var
	kind = require('enyo/kind'),
	easing = require('enyo/easing'),
	sceneSupport = require('enyo/sceneSupport'),
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
			mixins:[sceneSupport],
			content: "linear",
			style: "left: 2%;",
			scene: { translate: "0,-500, 0", duration: 3000 },
			classes: "balloon red"
		}, {
			name: "easeInBounce",
			mixins:[sceneSupport],
			content: "easeInBounce",
			style: "left: 11%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: easing.easeInBounce },
			classes: "balloon blue"
		}, {
			name: "easeOutBounce",
			mixins:[sceneSupport],
			content: "easeOutBounce",
			style: "left: 20%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: easing.easeOutBounce },
			classes: "balloon red"
		}, {
			name: "easeInOutBounce",
			mixins:[sceneSupport],
			content: "easeInOutBounce",
			style: "left: 29%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: easing.easeInOutBounce },
			classes: "balloon blue"
		}, {
			name: "easeInElastic",
			mixins:[sceneSupport],
			content: "easeInElastic",
			style: "left: 38%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: easing.easeInElastic },
			classes: "balloon red"
		}, {
			name: "easeOutElastic",
			mixins:[sceneSupport],
			content: "easeOutElastic",
			style: "left: 47%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: easing.easeOutElastic },
			classes: "balloon blue"
		}, {
			name: "easeInOutElastic",
			mixins:[sceneSupport],
			content: "easeInOutElastic",
			style: "left: 56%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: easing.easeInOutElastic },
			classes: "balloon red"
		}, {
			name: "easeInExpo",
			mixins:[sceneSupport],
			content: "easeInExpo",
			style: "left: 65%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: easing.easeInExpo },
			classes: "balloon blue"
		}, {
			name: "easeOutExpo",
			mixins:[sceneSupport],
			content: "easeOutExpo",
			style: "left: 74%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: easing.easeOutExpo },
			classes: "balloon red"
		}, {
			name: "easeInOutExpo",
			mixins:[sceneSupport],
			content: "easeInOutExpo",
			style: "left: 83%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: easing.easeInOutExpo },
			classes: "balloon blue"
		}, {
			name: "cubicBezier",
			mixins:[sceneSupport],
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
});