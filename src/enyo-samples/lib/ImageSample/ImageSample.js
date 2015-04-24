var 
	kind = require('enyo/kind');

var
	Control = require('enyo/Control'),
	Image = require('enyo/Image');

module.exports = kind({
	name: "enyo.sample.ImageSample",
	classes: "image-sample",
	kind: Control,
	components: [
		{content: "Image", classes: "section"},
		{kind: Image, src: "http://enyojs.com/img/enyo-logo.png", alt: "Enyo Logo"},
		{content: "Background Image", classes: "section"},
		{kind: Image, style: "width:200px;height:75px;background-color:gray", sizing: "constrain", position: "left top", src: "http://enyojs.com/img/enyo-logo.png", alt: "Enyo Logo"},
		{content: "Placeholder Image", classes: "section"},
		{kind: Image, src: Image.placeholder, alt: "Placeholder Image", classes: "placeholder"}
	]
});
