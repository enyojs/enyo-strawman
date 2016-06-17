var
	kind = require('enyo/kind'),
	easing = require('enyo/easing'),
	SceneSupport = require('enyo/SceneSupport'),
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
			mixins:[SceneSupport],
			content: "linear",
			style: "left: 2%;",
			scene: { translate: "0,-500, 0", duration: 3000 },
			classes: "balloon red"
		}, {
			name: "bounceIn",
			mixins:[SceneSupport],
			content: "bounceIn",
			style: "left: 11%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: easing.bounceIn },
			classes: "balloon blue"
		}, {
			name: "bounceOut",
			mixins:[SceneSupport],
			content: "bounceOut",
			style: "left: 20%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: easing.bounceOut },
			classes: "balloon red"
		}, {
			name: "bounceInOut",
			mixins:[SceneSupport],
			content: "bounceInOut",
			style: "left: 29%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: easing.bounceInOut },
			classes: "balloon blue"
		}, {
			name: "elasticIn",
			mixins:[SceneSupport],
			content: "elasticIn",
			style: "left: 38%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: easing.elasticIn },
			classes: "balloon red"
		}, {
			name: "elasticOut",
			mixins:[SceneSupport],
			content: "elasticOut",
			style: "left: 47%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: easing.elasticOut },
			classes: "balloon blue"
		}, {
			name: "elasticInOut",
			mixins:[SceneSupport],
			content: "elasticInOut",
			style: "left: 56%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: easing.elasticInOut },
			classes: "balloon red"
		}, {
			name: "expoIn",
			mixins:[SceneSupport],
			content: "expoIn",
			style: "left: 65%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: easing.expoIn },
			classes: "balloon blue"
		}, {
			name: "expoOut",
			mixins:[SceneSupport],
			content: "expoOut",
			style: "left: 74%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: easing.expoOut },
			classes: "balloon red"
		}, {
			name: "expoInOut",
			mixins:[SceneSupport],
			content: "expoInOut",
			style: "left: 83%;",
			scene: { translate: "0,-500, 0", duration: 3000, ease: easing.expoInOut },
			classes: "balloon blue"
		}, {
			name: "cubicBezier",
			mixins:[SceneSupport],
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