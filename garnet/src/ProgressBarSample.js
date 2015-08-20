var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	dom = require('enyo/dom.js'),
	ri = require('enyo/resolution'),

	g = require('garnet'),
	ConfirmPopup = require('garnet/ConfirmPopup'),
	Popup = require('garnet/Popup'),
	FormButton = require('garnet/FormButton'),
	FormInput = require('garnet/FormInput'),
	FormLabel = require('garnet/FormLabel'),
	FormToolDecorator = require('garnet/FormToolDecorator'),
	IconButton = require('garnet/IconButton'),
	Panel = require('garnet/Panel'),
	ProgressBar = require('garnet/ProgressBar');

var ProgressBarPanel = kind({
	name: "g.sample.ProgressBarPanel",
	kind: Panel,
	handlers: {
		onCancel: "hidePopup",
		onPopUpAnimationEnd: "popupAnimationFinished"
	},
	style: "border-radius: 50%; background-color: #000000;",
	components: [
		{style: "width: 100%; height: " + ri.scale(10) + "px;"},
		{name: "popupButton", kind: FormButton, ontap: "showPopup", content: "Popup", style: "width: " + ri.scale(140) + "px; margin: auto; display: block;"},
		{
			name: "confirmPopupWithOnlyCancelButton",
			kind: ConfirmPopup,
			buttonComponents: [
				{name: "cancel", kind: IconButton, ontap: "hidePopup", classes: "g-cancel-image"}
			],
			components: [
				{classes: "g-common-width-height-fit", style: "overflow: hidden; top: 28%;", components: [
					{name: "percentage", style:"font-size: " + ri.scale(28) + "px; width: " + ri.scale(240) + "px; margin: " + ri.scale(97) + "px " + ri.scale(20) + "px " + ri.scale(15) + "px " + ri.scale(20) + "px; text-align: center; display: inline-block; color: #FAFAFA;", content: "Loading..."},
					{kind: ProgressBar, name: "popupProgress", style:"left: 12%; width: " + ri.scale(240) + "px;", progress: 0, max: 100, onChange: "updateProgressP"},
					{name: "percentageP", style:"font-size: " + ri.scale(26) + "px; width: " + ri.scale(240) + "px; margin: " + ri.scale(15) + "px " + ri.scale(30) + "px 0; line-height: " + ri.scale(26) + "px; text-align: center; display: inline-block; color: #1CD2D2;"}
				]}
			]
		},
		{kind: FormLabel, content: "Progress Bar: set value "},
		{name: "progressBar1", kind: ProgressBar, progress: 25, max: 100, style: "margin: " + ri.scale(10) + "px " + ri.scale(18) + "px " + ri.scale(12) + "px;"},
		{name: "progressBar2", kind: ProgressBar, progress: 25, bgProgress: 75, max: 100, style: "margin: " + ri.scale(10) + "px " + ri.scale(18) + "px " + ri.scale(12) + "px;"},
		{kind: FormToolDecorator, style: "text-align: center;", components: [
			{name: "input" ,kind: FormInput, value: 25, style: "width: " + ri.scale(150) + "px; margin-right: " + ri.scale(10) + "px;"},
			{kind: FormButton, content:"Set", ontap: "changeValue", style: "width: " + ri.scale(80) + "px;"}
		]},
		{kind: FormToolDecorator, style: "text-align: center;", components: [
			{kind: FormButton, content:"-", ontap: "decValue", style: "width: " + ri.scale(70) + "px; margin: 0 " + ri.scale(4) + "px 0 " + ri.scale(45) + "px;"},
			{kind: FormButton, content:"+", ontap: "incValue", style: "width: " + ri.scale(70) + "px; margin-right: " + ri.scale(45) + "px;"}
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
		this.$.percentageP.setContent(value + " %");
		return false;
	},
	popupAnimationFinished: function(inSender, inEvent) {
		if (inEvent.originator.name === "confirmPopupWithOnlyCancelButton") {
			this.$.popupProgress.animateProgressTo(100);
		}
	},
	showPopup: function(inSender, inEvent) {
		if (inSender.name === "popupButton") {
			this.$.confirmPopupWithOnlyCancelButton.show();
		}
	},
	hidePopup: function(inSender, inEvent) {
		if (inEvent.originator.name === "cancel") {
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
	name: "g.sample.ProgressBarSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Progress Bar Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "ProgressBars", classes: "g-sample-subheader"},
		{kind: ProgressBarPanel, style: "position: relative;"}
	],
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
