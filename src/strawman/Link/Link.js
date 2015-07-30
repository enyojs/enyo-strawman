var
	kind = require('enyo/kind'),
	Anchor = require('enyo/Anchor');

var
	LinkSupport = require('../LinkSupport');

module.exports = kind({
	name: 'Link',
	kind: Anchor,
	classes: 'link',
	spotlight: true,
	mixins: [LinkSupport]
});
