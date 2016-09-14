var
	kind = require('enyo/kind');

var
	Divider = require('moonstone/Divider'),
	BodyText = require('moonstone/BodyText'),
	SimpleIntegerPicker = require('moonstone-extra/SimpleIntegerPicker');

module.exports = kind({
	name: 'moon.sample.SimpleIntegerPickerSample',
	classes: 'moon-simple-integer-picker-sample',
	components: [
		{kind: Divider, content: 'SimpleIntegerPicker'},
		{kind: BodyText, content: 'Clicking the Enter/Ok button or directly the number keys on the component will enable the "Input field" of the component.<br />After the value is inputted, confirm the number by pressing Enter/Ok button.'},
		{classes: 'sample-row moon-hspacing', components: [
			{content: 'Audio offset:', tag: 'label'},
			{kind: SimpleIntegerPicker, min: -10, value: -4, max: 10, onChange: 'change'},
			{kind: BodyText, content: '(-10 to +10)', classes: 'range'}
		]},
		{classes: 'sample-row moon-hspacing', components: [
			{content: 'Brightnesss:', tag: 'label'},
			{kind: SimpleIntegerPicker, min: 1, value: 50, max: 100, unit: 'lumens', onChange: 'change'},
			{kind: BodyText, content: '(1 to 100)', classes: 'range'}
		]},
		{classes: 'sample-row moon-hspacing', components: [
			{content: 'Volume:', tag: 'label'},
			{kind: SimpleIntegerPicker, value: 45, min: 1, max: 100, unit: '', onChange: 'change'},
			{kind: BodyText, content: '(1 to 100)', classes: 'range'}
		]},
		{classes: 'moon-3v'},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'result', content: 'No action yet.'}
	],
	change: function (sender, event) {
		this.$.result.setContent(sender.name + ' changed to ' + event.content + ' (' + event.value + ')');
	}
});

module.exports.badgeClasses = 'new';
