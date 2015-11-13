require('garnet');

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready'),
	Control = require('enyo/Control'),
	Title = require('garnet/Title');

var BareGarnet = enyo.kind({
	name: 'g.sample.BareGarnet',
	kind: Control,
	handlers: {
		onSwipe: 'eventHandler'
	},
	classes: 'enyo-unselectable garnet main-view',
	components: [
		{kind: Title, content: 'Bare Garnet'},
		{content: 'Drag right to close app', classes:'g-sample-text'}
	],
	eventHandler: function(inSender, inEvent) {
		if (inEvent.direction === 'right') {
			window.close();
		}
	}
});

ready(function () {
	new BareGarnet().renderInto(document.body);
});
