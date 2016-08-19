var
	kind = require('enyo/kind');

var
	Divider = require('moonstone/Divider'),
	BodyText = require('moonstone/BodyText'),
	SimpleIntegerPicker = require('moonstone-extra/SimpleIntegerPicker');

module.exports = kind({
	name: 'containerMain',
	classes: 'wrapperClass',
	components: [
		{kind: Divider, content: 'SimpleIntegerPicker'},
		{kind: BodyText, content: 'Clicking the Enter/Ok button on the component enables "Input field" in the component.<br />After the value is inputted, confirm the number by pressing Enter/Ok button again.'},
		{components: [
			{content: 'Audio offset:', tag: 'span'},
			{kind: SimpleIntegerPicker, min: -10, value: -4, max: 10, onChange: 'change'}
		]},
		{components: [
			{content: 'Brightnesss:', tag: 'label'},
			{kind: SimpleIntegerPicker, min: 1, value: 50, max: 100, unit: 'lumens', onChange: 'change'}
		]},
		{components: [
			{content: 'Volume:', tag: 'label'},
			{kind: SimpleIntegerPicker, value: 45, min: 1, max: 100, unit: '', onChange: 'change'}
		]},
		{classes: 'moon-3v'},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'result', content: 'No action yet.'}
	],
	change: function (sender, event) {
		this.$.result.setContent(sender.name + ' changed to ' + event.content + ' (' + event.value + ')');
	}
});
