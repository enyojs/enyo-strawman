var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	platform = require('enyo/platform');

var
	Control = require('enyo/Control');

module.exports = kind({
	name: 'enyo.sample.PlatformSample',
	kind: Control,
	classes: 'enyo-fit platform-sample',
	components: [
		{classes: 'platform-sample-divider', content: 'Enyo Platform Detection'},
		{components: [
			{content: 'User-Agent String'},
			{name: 'uaString', content: '', style: 'padding: 8px;'}
		]},
		{tag: 'br'},
		{components: [
			{content: 'Window'},
			{name: 'windowAttr', content: '', style: 'padding: 8px;'}
		]},
		{tag: 'br'},
		{components: [
			{content: 'enyo.platform'},
			{name: 'enyoPlatformJSON', content: '', style: 'padding: 8px;'}
		]},
		{tag: 'br'},
		{components: [
			{content: 'enyo.version'},
			{name: 'enyoVersionJSON', content: '', style: 'padding: 8px;'}
		]}
	],
	updateWindowSize: function () {
		var width = window.innerWidth;
		if (width === undefined) {
			width = document.documentElement.clientWidth;
		}
		var height = window.innerHeight;
		if (height === undefined) {
			height = document.documentElement.clientHeight;
		}
		this.$.windowAttr.setContent('size: ' + width + 'x' + height +
			', devicePixelRatio: ' + window.devicePixelRatio);
	},
	create: function () {
		this.inherited(arguments);
		this.$.uaString.setContent(navigator.userAgent);
		this.$.enyoPlatformJSON.setContent(JSON.stringify(platform, null, 1));
		this.$.enyoVersionJSON.setContent(JSON.stringify(enyo.version, null, 1));
		this.updateWindowSize();
	},
	handleResize: function () {
		this.inherited(arguments);
		this.updateWindowSize();
	}
});