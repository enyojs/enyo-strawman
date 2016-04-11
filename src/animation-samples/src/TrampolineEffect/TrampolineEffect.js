var
	kind = require("enyo/kind"),
	anim = require('enyo/animation'),
	scene = require('enyo/AnimationSupport/Scene'),
	fittableRows = require("layout/FittableRows");

var biggerBox = scene({
	repeat: true,
	animation: [
		{ translate: "0,200,0", rotate: "0,0,180", ease: anim.easing.easeInQuad, duration: 1000 },
		{ translate: "0,250,0", scale: "2,0.5,1", duration: 500 },
		{ translate: "0,200,0", scale: "1,1,1", duration: 500 },
		{ translate: "0,0,0", rotate: "0,0,360", ease: anim.easing.easeOutQuad, duration: 1000 }
	]
});

var smallerBox = scene({
	repeat: true,
	animation: [
		{ translate: "0,300,0", rotate: "0,0,180", ease: anim.easing.easeInQuad, duration: 1000 },
		{ translate: "0,425,0", scale: "2,0.5,1", duration: 500 },
		{ translate: "0,300,0", scale: "1,1,1", duration: 500 },
		{ translate: "0,0,0", rotate: "0,0,405", ease: anim.easing.easeOutQuad, duration: 1000 }
	]
});


module.exports = kind({
	name: "outer",
	classes: "enyo-fit trampoline-sample",
	components: [
		{classes: "container", components:[
			{ name: "smaller", classes: "smaller", scene: smallerBox },
			{ name: "bigger", classes: "bigger", scene: biggerBox}
		]}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			biggerBox.play();
			smallerBox.play();
		};
	})
});
