require('garnet');

var
	kind = require('enyo/kind'),
	FormButton = require('garnet/FormButton'),
	FormInput = require('garnet/FormInput'),
	FormLabel = require('garnet/FormLabel'),
	FormToolDecorator = require('garnet/FormToolDecorator'),
	FormInputDecorator = require('garnet/FormInputDecorator'),
	Panel = require('garnet/Panel'),
	ProgressBar = require('garnet/ProgressBar');

var ProgressBarPanel = kind({
	name: 'g.sample.ProgressBarPanel',
	kind: Panel,
	components: [
		{classes: 'g-sample-progressbar-header'},
		{kind: FormLabel, classes: 'g-sample-progressbar-top-label', content: 'Progress Bar: set value '},
		{name: 'progressBar1', kind: ProgressBar, progress: 25, max: 100, classes: 'g-sample-progressbar-progressbar1'},
		{name: 'progressBar2', kind: ProgressBar, progress: 25, bgProgress: 75, max: 100, classes: 'g-sample-progressbar-progressbar2'},
		{kind: FormToolDecorator, components: [
			{kind: FormInputDecorator, classes: 'g-sample-form-input', components: [
				{name: 'input', kind: FormInput, value: 25}
			]},
			{kind: FormButton, content:'Set', ontap: 'changeValue', classes: 'g-sample-form-value'}
		]},
		{kind: FormToolDecorator, classes: 'g-sample-probressbar-tooldecorator', components: [
			{kind: FormButton, content:'-', ontap: 'decValue', classes: 'g-sample-form-button-minus'},
			{kind: FormButton, content:'+', ontap: 'incValue', classes: 'g-sample-form-button-plus'}
		]}
	],
	changeValue: function(inSender, inEvent) {
		this.$.input.setValue(Math.min(parseInt(this.$.input.getValue() || 0, 10), 100));
		this.$.progressBar1.animateProgressTo(this.$.input.getValue());
		this.$.progressBar2.animateProgressTo(this.$.input.getValue());
	},
	incValue: function() {
		this.$.input.setValue(Math.min(parseInt(this.$.input.getValue() || 0, 10) + 10, 100));
		this.changeValue();
	},
	decValue: function() {
		this.$.input.setValue(Math.max(parseInt(this.$.input.getValue() || 0, 10) - 10, 0));
		this.changeValue();
	},
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});

module.exports = kind({
	name: 'g.sample.ProgressBarSample',
	classes: 'enyo-unselectable enyo-fit garnet g-sample g-sample-progressbar',
	components: [
		{content: '< Progress Bar Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'ProgressBars', classes: 'g-sample-subheader'},
		{kind: ProgressBarPanel, classes: 'g-sample-circle-panel'}
	],
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
