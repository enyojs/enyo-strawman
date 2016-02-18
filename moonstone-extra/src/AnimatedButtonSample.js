var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	FittableRows = require('layout/FittableRows');

var
	Scroller = require('moonstone/Scroller'),
	Divider = require('moonstone/Divider'),
	Icon = require('moonstone/Icon'),
	BodyText = require('moonstone/BodyText');

var
	AnimatedButton = require('moonstone-extra/AnimatedButton');

module.exports = kind({
	name: 'moon.sample.AnimatedButtonSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit moon-button-animated-sample',
	components: [
		{kind: Scroller, fit: true, components: [
			{kind: Control, classes: 'moon-button-animated-sample-wrapper', components: [
				{kind: Divider, content: 'Animated Buttons:'},
				{name: 'animButton', kind: AnimatedButton, minWidth: false, content: 'Animated!', ontap: 'buttonTapped'},
				{name: 'animButton2', kind: AnimatedButton, minWidth: false, content: 'Animated!', ontap: 'buttonTapped', components: [
					{kind: Icon, icon: 'play'},
					{content: 'animation'}
				]},
				{name: 'animButton3', kind: AnimatedButton, ontap: 'buttonTapped', components: [
					{content: 'Expand!'},
					{kind: Icon, icon: 'fullscreen'}
				]},
				{name: 'animButton4', kind: AnimatedButton, minWidth: false, content: 'The most longest AnimatedButton everest!', ontap: 'buttonTapped'}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'result', allowHtml: true, content: 'No button pressed yet.'}
	],
	buttonTapped: function(sender, ev) {
		this.$.result.setContent('&quot;' + sender.name + '&quot; pressed.');
	}
});

module.exports.badgeClasses = 'new wip';
