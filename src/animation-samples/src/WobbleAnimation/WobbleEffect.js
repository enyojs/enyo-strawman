var
	kind = require("enyo/kind"),
	Control = require("enyo/Control"),
	image = require('enyo/image');
var wobble = [
	{ translate: "-2,2,0", rotate: "-2,-4,0", duration: 0 },
	{ translate: "-2,-2,0", rotate: "2,-4,0", duration:500 },
	{ translate: "2,-2,0", rotate: "2,4,0", duration:500 },
	{ translate: "2,2,0", rotate: "-2,4,0",duration:500 },
	{ translate: "0,0,0", rotate: "0,0,0", duration:500 }
];

module.exports = kind({
	name:"Wobble",
	kind: Control,
	imagePath:"assets/image.png",
	classes: "enyo-fit wobble-sample",
	components: [
	{classes:"container", components: [
		{ name: "imageHolder", classes: "image-container", components: [
			{kind:image, name: "img"}
		]}
	]}],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.$.img.set("src",this.imagePath);
			kind.animate(this.$.imageHolder, wobble).play().repeat = true;
		};
	})
});
