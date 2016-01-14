require('spotlight');

var
	kind = require('enyo/kind'),
	Button = require('enyo/Button');

module.exports = kind({
	name    : 'enyo.Spotlight.ContainerSample',
	classes : 'spotlight-sample',
	fit     : true,

	handlers: {
		onSpotlightFocused: 'buttonFocused'
	},

	components: [
		{name: 'c1', spotlight: 'container', onSpotlightContainerEnter: 'enterContainer', onSpotlightContainerLeave: 'leaveContainer', components: [
			{name: 'c1b1', kind: Button, spotlight: true, content: 'c1b1'},
			{name: 'c1b2', kind: Button, spotlight: true, content: 'c1b2'}
		]},
		{name: 'c2', spotlight: 'container', onSpotlightContainerEnter: 'enterContainer', onSpotlightContainerLeave: 'leaveContainer', components: [
			{name: 'c2b1', kind: Button, spotlight: true, content: 'c2b1'},
			{name: 'c2b2', kind: Button, spotlight: true, content: 'c2b2'},
			{name: 'c2c1', spotlight: 'container', onSpotlightContainerEnter: 'enterContainer', onSpotlightContainerLeave: 'leaveContainer', components: [
				{name: 'c2c1b1', kind: Button, spotlight: true, content: 'c2c1b1'},
				{name: 'c2c1b2', kind: Button, spotlight: true, content: 'c2c1b1'}
			]}
		]}
	],

	buttonFocused: function (sender, ev) {
		this.log('Button Focused', ev.originator.id);
	},

	enterContainer: function (sender, ev) {
		this.log('Container Entered:', ev.originator.id);
		sender.applyStyle('border', '2px solid red');
	},

	leaveContainer: function (sender, ev) {
		this.log('Container Left:', ev.originator.id);
		sender.applyStyle('border', null);
	}
});

// Spotlight.verbose();