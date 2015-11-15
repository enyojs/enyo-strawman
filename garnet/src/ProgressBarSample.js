require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	ConfirmPopup = require('garnet/ConfirmPopup'),
	FormButton = require('garnet/FormButton'),
	FormInput = require('garnet/FormInput'),
	FormLabel = require('garnet/FormLabel'),
	FormToolDecorator = require('garnet/FormToolDecorator'),
	IconButton = require('garnet/IconButton'),
	Panel = require('garnet/Panel'),
	ProgressBar = require('garnet/ProgressBar');

var ProgressBarPanel = kind({
	name: 'g.sample.ProgressBarPanel',
	kind: Panel,
	handlers: {
		onCancel: 'hidePopup',
		onPopUpAnimationEnd: 'popupAnimationFinished'
	},
	components: [
		{classes: 'g-sample-progressbar-header'},
		{name: 'popupButton', kind: FormButton, ontap: 'showPopup', content: 'Popup', classes: 'g-sample-progressbar-popup-button'},
		{
			name: 'confirmPopupWithOnlyCancelButton',
			kind: ConfirmPopup,
			buttonComponents: [
				{name: 'cancel', kind: IconButton, ontap: 'hidePopup', classes: 'g-cancel-image'}
			],
			components: [
				{classes: 'g-common-width-height-fit', classes: 'g-sample-progressbar-popup', components: [
					{name: 'percentage', classes:'g-sample-progressbar-popup-loading', content: 'Loading...'},
					{kind: ProgressBar, name: 'popupProgress', classes:'g-sample-progressbar-popup-progressbar', progress: 0, max: 100, onChange: 'updateProgressP'},
					{name: 'percentageP', classes:'g-sample-progressbar-popup-text'}
				]}
			]
		},
		{kind: FormLabel, content: 'Progress Bar: set value '},
		{name: 'progressBar1', kind: ProgressBar, progress: 25, max: 100, classes: 'g-sample-progressbar-progressbar1'},
		{name: 'progressBar2', kind: ProgressBar, progress: 25, bgProgress: 75, max: 100, classes: 'g-sample-progressbar-progressbar2'},
		{kind: FormToolDecorator, classes: '', components: [
			{name: 'input' ,kind: FormInput, value: 25, classes: 'g-sample-form-input'},
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
	updateProgressP: function(inSender, inEvent) {
		var value = Math.round(this.$.popupProgress.getProgress());
		this.$.percentageP.setContent(value + ' %');
		return false;
	},
	popupAnimationFinished: function(inSender, inEvent) {
		if (inEvent.originator.name === 'confirmPopupWithOnlyCancelButton') {
			this.$.popupProgress.animateProgressTo(100);
		}
	},
	showPopup: function(inSender, inEvent) {
		if (inSender.name === 'popupButton') {
			this.$.confirmPopupWithOnlyCancelButton.show();
		}
	},
	hidePopup: function(inSender, inEvent) {
		if (inEvent.originator.name === 'cancel') {
			this.$.confirmPopupWithOnlyCancelButton.hide();
			this.$.popupProgress.setProgress(0);
		}
	},
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});

module.exports = kind({
	name: 'g.sample.ProgressBarSample',
	classes: 'enyo-unselectable garnet g-sample',
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
