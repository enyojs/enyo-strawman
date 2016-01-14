var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Input = require('enyo/Input'),
	FittableRows = require('layout/FittableRows'),
	ImageCarousel = require('layout/ImageCarousel');

module.exports = kind({
	name: 'enyo.sample.ImageCarouselSample',
	kind: FittableRows,
	classes: 'enyo-fit',
	components: [
		{classes: 'layout-sample-toolbar', style: 'text-align:center;', components: [
			{kind: Button, content: '&larr;', allowHtml: true, ontap: 'previous'},
			{kind: Button, content: '&rarr;', allowHtml: true, ontap: 'next'},
			{tag: 'label', classes: 'imagecarousel-sample-input', components: [
				{name: 'carouselIndexInput', kind: Input, value: '0', onchange: 'updateIndex'}
			]}
		]},
		{name: 'carousel', kind: ImageCarousel, fit:true, onload: 'load', onZoom: 'zoom', onerror: 'error', onTransitionStart: 'transitionStart', onTransitionFinish: 'transitionFinish'}
	],
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.urls = [
				'@../../assets/mercury.jpg',
				'@../../assets/venus.jpg',
				'@../../assets/earth.jpg',
				'@../../assets/mars.jpg',
				'@../../assets/jupiter.jpg',
				'@../../assets/saturn.jpg',
				'@../../assets/uranus.jpg',
				'@../../assets/neptune.jpg'
			];
			// although we're specifying all the image urls now, the images themselves
			// only get created/loaded as needed
			this.$.carousel.setImages(this.urls);
		};
	}),
	load: function (sender, ev) {
		//enyo.log('image loaded: ' + ev.originator.src);
	},
	zoom: function (sender, ev) {
		//enyo.log('image zoomed: ' + ev.scale + ' scale on ' + ev.originator.src);
	},
	error: function (sender, ev) {
		//enyo.log('image error: ' + ev.originator.src);
	},
	transitionStart: function (sender, ev) {
		//enyo.log('image now transitioning from: ' + this.$.carousel.getImageByIndex(ev.fromIndex).src
		//		+ ' to ' + this.$.carousel.getImageByIndex(ev.toIndex).src);
	},
	transitionFinish: function (sender, ev) {
		//enyo.log('image transitioned to: ' + this.$.carousel.getActiveImage().src);
		if (this.$.carouselIndexInput) {
			this.$.carouselIndexInput.setValue(ev.toIndex);
		}
	},
	previous: function (sender, ev) {
		this.$.carousel.previous();
	},
	next: function (sender, ev) {
		this.$.carousel.next();
	},
	getRandomIndex: function () {
		var i = Math.floor(Math.random()*this.$.carousel.images.length);
		while(i==this.$.carousel.index) { //make sure it isn't the active index
			i = Math.floor(Math.random()*this.$.carousel.images.length);
		}
		return i;
	},
	updateIndex: function (sender, ev) {
		var index = this.trimWhitespace(this.$.carouselIndexInput.getValue());
		if (index === '' || isNaN(index)) {
			//enyo.log('Numbers only please.')
			return;
		}
		this.$.carousel.setIndex(parseInt(index, 10));
	},
	trimWhitespace: function (str) {
		return str.replace(/^\s+|\s+$/g,'');
	}
});