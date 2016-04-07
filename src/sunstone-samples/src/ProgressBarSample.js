var
	kind = require('enyo/kind');

var
	Input = require('sunstone/Input'),
	InputDecorator = require('sunstone/InputDecorator'),
	Button = require('sunstone/Button'),
	CheckboxItem = require('sunstone/CheckboxItem'),
	ProgressBar = require('sunstone/ProgressBar');


module.exports = kind({
	name: 'sun.sample.ProgressSample',
	classes: 'sun enyo-unselectable enyo-fit',
	components: [
		{content: 'Progress Bars'},
		{tag: 'br'},
		{name:'progress', kind: ProgressBar, progress: 30},
		{tag: 'br'},
		{kind: InputDecorator, style: 'margin-right: 10px; width: 300px;', components: [
			{kind: Input, value: 30, placeholder: 'Value'}
		]},
		{kind: Button, content: 'Set', classes: 'sun-sample-spaced-button', ontap: 'changeValue'},
		{kind: Button, content: '-', classes: 'sun-sample-spaced-button', ontap: 'decValue'},
		{kind: Button, content: '+', classes: 'sun-sample-spaced-button', ontap: 'incValue'},
		{tag: 'br'},
		{content: 'Progress Background Bars', style: 'font-size: 18px'},
		{kind: InputDecorator, style: 'margin-right: 10px; width: 300px;', components: [
			{name: 'bgInput', kind: Input, value: 0, placeholder: 'Value'}
		]},
		{kind: Button, content: 'Set', classes: 'sun-sample-spaced-button', ontap: 'changeBgValue'},
		{style: 'width: 480px;', components: [
			{name: 'animateSetting', kind: CheckboxItem, checked: true, content: 'Animated'}
		]}
	],
	changeValue: function (inSender, inEvent) {
		if (this.$.animateSetting.getChecked()) {
			this.$.progress.animateProgressTo(this.$.input.getValue());
		} else {
			this.$.progress.setProgress(this.$.input.getValue());
		}
	},
	changeBgValue: function (inSender, inEvent) {
		this.$.progress.setBgProgress(this.$.bgInput.getValue());
	},
	incValue: function (inSender, inEvent) {
		this.$.input.setValue(Math.min(parseInt(this.$.input.getValue() || 0, 10) + 10, this.$.progress.getMax()));
		this.changeValue(inSender, inEvent);
	},
	decValue: function (inSender, inEvent) {
		this.$.input.setValue(Math.max(parseInt(this.$.input.getValue() || 0, 10) - 10, this.$.progress.getMin()));
		this.changeValue(inSender, inEvent);
	}
});
