var
	kind = require('enyo/kind');

var
	Control = require('enyo/Control'),
	EnyoImage = require('enyo/Image');

module.exports = kind({
	name: 'enyo.sample.ImageSample',
	classes: 'image-sample',
	kind: Control,
	components: [
		{content: 'Image - No Sizing', classes: 'section'},
		{
			kind: EnyoImage,
			/** style: 'width:165px; height:55px', */
			src: 'http://enyojs.com/img/enyo-logo.png',
			placeholder: EnyoImage.placeholder,
			alt: 'Enyo Logo'
		},
		{content: 'Sizing - Contain', classes: 'section'},
		{
			kind: EnyoImage,
			style: 'width:200px; height:100px; background-color:rgba(200,100,0,0.3); border: 1px dashed orange; margin-right: 1em;',
			sizing: 'contain',
			placeholder: EnyoImage.placeholder,
			//src: 'http://enyojs.com/img/enyo-logo.png',
			alt: 'Enyo Logo'
		},
		{
			kind: EnyoImage,
			style: 'width:200px; height:100px; background-color:rgba(0,200,0,0.3); border: 1px dashed green;',
			sizing: 'contain',
			position: 'left top',
			src: 'http://enyojs.com/img/enyo-logo.png',
			alt: 'Enyo Logo'
		},
		{content: 'Sizing - Cover', classes: 'section'},
		{
			kind: EnyoImage,
			style: 'width:200px; height:100px; background-color:rgba(0,0,200,0.3); border: 1px dashed blue; margin-right: 1em;',
			sizing: 'cover',
			src: 'http://enyojs.com/img/enyo-logo.png',
			alt: 'Enyo Logo'
		},
		{
			kind: EnyoImage,
			style: 'width:200px; height:100px; background-color:rgba(200,200,0,0.3); border: 1px dashed yellow;',
			sizing: 'cover',
			position: 'left top',
			src: 'http://enyojs.com/img/enyo-logo.png',
			alt: 'Enyo Logo'
		},
		{content: 'Placeholder Image', classes: 'section'},
		{kind: EnyoImage, src: EnyoImage.placeholder, alt: 'Placeholder Image', classes: 'placeholder'}
	]
});