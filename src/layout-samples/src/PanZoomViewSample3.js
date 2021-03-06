var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	PanZoomView = require('layout/PanZoomView'),
	Button = require('enyo/Button'),
	Img = require('enyo/Image');

var ImagesView = kind({
	width: 0,
	height: 0,
	published: {
		src : ''
	},
	components:[
		{kind: Img, onload: 'load', ondown: 'down'},
		{kind: Img, onload: 'load', ondown: 'down'}
	],
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.srcChanged();
		};
	}),
	srcChanged: function () {
		this.height = this.width = 0;
		this.$.image.setSrc(this.src);
		this.$.image2.setSrc(this.src);
	},
	load: function (sender, ev) {
		this.width += ev.originator.node.clientWidth;
		this.height = Math.max(this.height, ev.originator.node.clientHeight);
		this.bubble('onSetDimensions', { width: this.width, height: this.height });
	},
	down: function (sender, ev) {
		// Fix to prevent image drag in Firefox
		ev.preventDefault();
	}
});

module.exports = kind({
	name: 'enyo.sample.PanZoomViewSample3',
	classes: 'enyo-unselectable',
	style: 'width: 600px; border: 1px solid #ccc; margin: auto;',
	components: [
		{kind: PanZoomView, style: 'width: 100%; height: 400px;', scale: 'fit', components: [
			{name: 'imagesView', kind: ImagesView, src: '@../assets/globe.jpg'}
		]},
		{kind: Button, content: 'change image', ontap: 'changeImage'}
	],
	planets: ['@../assets/globe.jpg', '@../assets/earth.jpg', '@../assets/jupiter.jpg', '@../assets/mars.jpg', '@../assets/mercury.jpg', '@../assets/neptune.jpg', '@../assets/saturn.jpg', '@../assets/uranus.jpg', '@../assets/venus.jpg'],
	changeImage: function (){
		var imageview = this.$.panZoomView.$.imagesView;
		imageview.setSrc( this.planets[ (utils.indexOf(imageview.src, this.planets)+1)%this.planets.length ] );
	}
});
