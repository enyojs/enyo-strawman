var
	kind = require('enyo/kind');

var
	Button = require('moonstone/Button'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	Divider = require('moonstone/Divider'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	ProgressBar = require('moonstone/ProgressBar');

module.exports = kind({
	name: 'moon.sample.ProgressSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Divider, content: 'Progress Bars'},
		{kind: ProgressBar, progress: 25},
		{kind: ProgressBar, progress: 25, bgProgress: 75},
		{kind: ProgressBar, progress: 50, barClasses: 'moon-sample-green'},
		{kind: ProgressBar, progress: 50, barClasses: 'moon-sample-red'},

		{kind: Divider, content: 'Progress Bars with Popup'},
		{kind: ProgressBar, progress: 25, popup: true},

		{kind: Divider, content: 'Vertical Orientation Progress Bars'},
		{classes: 'moon-hspacing', components: [
			{kind: ProgressBar, progress: 25, orientation: 'vertical', popup: true},
			{classes: 'moon-3h'},
			{kind: ProgressBar, progress: 25, orientation: 'vertical', style: 'height: 200px'},
			{classes: 'moon-3h'},
			{kind: ProgressBar, progress: 25, orientation: 'vertical', popup: true, popupSide: 'left', style: 'width: 60px; '}
		]},
		{classes: 'moon-1v'},

		{kind: InputDecorator, style: 'margin-right:10px;', components: [
			{kind: Input, placeholder: 'Value'}
		]},
		{kind: Button, content: 'Set', small: true, classes: 'moon-sample-spaced-button', ontap: 'changeValue'},
		{kind: Button, content: '-', small: true, classes: 'moon-sample-spaced-button', ontap: 'decValue'},
		{kind: Button, content: '+', small: true, classes: 'moon-sample-spaced-button', ontap: 'incValue'},
		{classes: 'moon-2v'},

		{style: 'width:240px;', components: [
			{name: 'animateSetting', kind: CheckboxItem, checked: true, content: 'Animated'}
		]}
	],
	changeValue: function (sender, ev) {
		for (var i in this.$) {
			if (this.$[i].kind == ProgressBar) {
				if (this.$.animateSetting.getChecked()) {
					this.$[i].animateProgressTo(this.$.input.getValue());
				} else {
					this.$[i].setProgress(this.$.input.getValue());
				}
			}
		}
	},
	incValue: function () {
		this.$.input.setValue(Math.min(parseInt(this.$.input.getValue() || 0, 10) + 10, 100));
		this.changeValue();
	},
	decValue: function () {
		this.$.input.setValue(Math.max(parseInt(this.$.input.getValue() || 0, 10) - 10, 0));
		this.changeValue();
	}
});
