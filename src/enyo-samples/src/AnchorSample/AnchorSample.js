var
	kind = require('enyo/kind');

var
	Anchor = require('enyo/Anchor'),
	EnyoImage = require('enyo/Image'),
	Input = require('enyo/Input');

module.exports = kind({
	name: 'enyo.sample.AnchorSample',
	classes: 'anchor-sample',
	components: [
		{content: 'Text Anchor', classes: 'section'},
		{kind: Anchor, name: 'anchorText', href: 'http://www.enyojs.com', title: 'EnyoJS Framework Website', content: 'Visit the EnyoJS website'},
		{kind: Input, name: 'inputTextHref', type: 'text', placeholder: 'Anchor URL'},
		{kind: Input, name: 'inputTextTitle', type: 'text', placeholder: 'Anchor Title'},
		{kind: Input, name: 'inputTextContent', type: 'text', placeholder: 'Anchor Content'},
		{content: 'Image Anchor', classes: 'section'},
		{kind: Anchor, name: 'anchorImage', href: 'http://www.enyojs.com', title: 'EnyoJS Framework Website', components: [
			{kind: EnyoImage, name: 'anchorImageItem', src: 'http://enyojs.com/img/enyo-logo.png', alt: 'Enyo Logo'}
		]},
		{kind: Input, name: 'inputImageHref', type: 'text', placeholder: 'Anchor URL'},
		{kind: Input, name: 'inputImageTitle', type: 'text', placeholder: 'Anchor Title'},
		{kind: Input, name: 'inputImageSrc', type: 'text', placeholder: 'Anchor Image URL'}
	],
	bindings: [
		{from: '.$.anchorText.href', to: '.$.inputTextHref.value', oneWay: false},
		{from: '.$.anchorText.title', to: '.$.inputTextTitle.value', oneWay: false},
		{from: '.$.anchorText.content', to: '.$.inputTextContent.value', oneWay: false},
		{from: '.$.anchorImage.href', to: '.$.inputImageHref.value', oneWay: false},
		{from: '.$.anchorImage.title', to: '.$.inputImageTitle.value', oneWay: false},
		{from: '.$.anchorImageItem.src', to: '.$.inputImageSrc.value', oneWay: false}
	]
});
