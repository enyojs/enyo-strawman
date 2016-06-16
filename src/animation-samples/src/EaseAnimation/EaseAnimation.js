var
	kind = require('enyo/kind'),
	easing = require('enyo/easing'),
	FittableColumns = require('layout/FittableColumns'),
	SceneSupport = require('enyo/SceneSupport');

var RedBalloon = kind({
	classes: "balloon",
	style: "background: url('./assets/balloon.png');",
	mixins : [SceneSupport]
});

var BlueBalloon = kind({
	classes: "balloon",
	style: "background: url('./assets/balloon-blue.png');",
	mixins : [SceneSupport]
});

module.exports = kind({
	name: "EasingSample",
	kind: FittableColumns,
	classes: "ease-sample",
	components: [
		{
			kind: RedBalloon,
			content: "linear",
			scene: { translate: "0,-480, 0", duration: 3000 }
		}, {
			kind: BlueBalloon,
			content: "easeInBounce",
			scene: { translate: "0,-480, 0", duration: 3000, ease: easing.easeInBounce }
		}, {
			kind: RedBalloon,
			content: "easeOutBounce",
			scene: { translate: "0,-480, 0", duration: 3000, ease: easing.easeOutBounce }
		}, {
			kind: BlueBalloon,
			content: "easeInOutBounce",
			scene: { translate: "0,-480, 0", duration: 3000, ease: easing.easeInOutBounce }
		}, {
			kind: RedBalloon,
			content: "easeInElastic",
			scene: { translate: "0,-480, 0", duration: 3000, ease: easing.easeInElastic }
		}, {
			kind: BlueBalloon,
			content: "easeOutElastic",
			scene: { translate: "0,-480, 0", duration: 3000, ease: easing.easeOutElastic }
		}, {
			kind: RedBalloon,
			content: "easeInOutElastic",
			scene: { translate: "0,-480, 0", duration: 3000, ease: easing.easeInOutElastic }
		}, {
			kind: BlueBalloon,
			content: "easeInExpo",
			scene: { translate: "0,-480, 0", duration: 3000, ease: easing.easeInExpo }
		}, {
			kind: RedBalloon,
			content: "easeOutExpo",
			scene: { translate: "0,-480, 0", duration: 3000, ease: easing.easeOutExpo }
		}, {
			kind: BlueBalloon,
			content: "easeInOutExpo",
			scene: { translate: "0,-480, 0", duration: 3000, ease: easing.easeInOutExpo }
		}, {
			kind: RedBalloon,
			content: "custom",
			/**
			* Points on bezier-curve as at x% of time y% of distance cover
			* Here, the bezier-curve should be as defined
			* On 30% of time, 50% of distance should cover
			* On 80% of time, 10% of distance in opposite direction should cover
			*/
			scene: { translate: "0,-480, 0", duration: 3000, ease: { 30: 50, 80: -10 } }
		}
	]
});