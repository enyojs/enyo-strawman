var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	ri = require('enyo/resolution'),

	g = require('garnet'),
	g_ri = require('garnet/resolution'),
	IconButton = require('garnet/IconButton'),
	Panel = require('garnet/Panel'),
	Popup = require('garnet/Popup'),
	WheelSliderController = require('garnet/WheelSliderController');

kind({
	name: "g.sample.WheelSliderControllerPopup",
	kind: Panel,
	events: {
		onResult: ""
	},
	classes: "enyo-unselectable garnet",
	style: "position: relative;",
	components: [
		{style: "position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
			{
				name: "panel",
				kind: WheelSliderController,
				style: "position: relative; border-radius: 50%; background-color: #000000;",
				onStopSliderAnimation: "stopDigitAnimation",
				minimumValue: -100,
				maximumValue: 100,
				stepValue: 10,
				value: 50,
				onChange: "changeEventHandler",
				onChanging: "changingEventHandler"
			}
		]}
	],
	changingEventHandler: function(inSender, inEvent) {
		this.doResult({msg: "changing inEvent.value : " + inEvent.value});
	},
	changeEventHandler: function(inSender, inEvent) {
		this.doResult({msg: "change inEvent.value : " + inEvent.value});
	}
});

kind({
	name: "g.sample.WheelSliderController",
	kind: Panel,
	events: {
		onResult: ""
	},
	isSplittedTextCreated: false,
	destroySplitedDivTimerID: undefined,
	classes: "enyo-unselectable garnet",
	style: "position: relative;",
	components: [
		{style: "position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
			{
				name: "panel",
				kind: WheelSliderController,
				style: "position: relative; border-radius: 50%; background-color: #000000;",
				onStopSliderAnimation: "stopDigitAnimation",
				minimumValue: -100,
				maximumValue: 100,
				stepValue: 10,
				value: 50,
				onChange: "changeEventHandler",
				onChanging: "changingEventHandler"
			},
			{style: "width: " + ri.scale(320) + "px; height: " + ri.scale(320) + "px; pointer-events: none;", onStartPanelAnimation: "hideContent", onEndPanelAnimation: "animateValue", onAnimationEnd: "animateValue", components: [
				{name: "sampleValue", content: "", style: "pointer-events: auto; margin-left: 20%; display: block; width: 60%; margin-top: " + ri.scale(60) + "px; height: " + ri.scale(99) + "px; text-align: center; font-weight: 400; font-size: " + ri.scale(100) + "px;"},
				{content: "Brightness", style: "pointer-events: auto; margin-left: 10%; display: block; width: 80%; text-align: center; color: #FFFFFF; font-weight: 800; font-size: " + ri.scale(22) + "px;"},
				{style:"margin-top: " + ri.scale(15) + "px;", components: [
					{name: "cancel", kind: IconButton, accessibilityLabel: "cancel", ontap: "tapCancel", classes: "g-sample-wheel-slider-cancel-image"},
					{name: "ok", kind: IconButton, accessibilityLabel: "ok", ontap: "tapOK", classes: "g-sample-wheel-slider-ok-image"}
				]}
			]}
		]},
		{
			name: "popup",
			kind: Popup,
			ignoreWheelControl: false,
			handlers: {
				onPopUpAnimationEnd: "popupAnimationFinished",
				onChange: "showPopup",
				onChanging: "showPopup"
			},
			components: [
				{kind: "g.sample.WheelSliderControllerPopup"}
			],
			popupAnimationFinished: function() {
				if (this.showing) {
					this.startJob("hidePopup", this.hidePopup, 3000);
				} else {
					this.stopJob("hidePopup");
				}
			},
			showPopup: function(inSender, inEvent) {
				this.stopJob("hidePopup");
				this.startJob("hidePopup", this.hidePopup, 3000);
			},
			hidePopup: function() {
				this.hide();
				this.stopJob("hidePopup");
			}
		}
	],
	bindings: [
		{from: ".$.panel.value", to: ".$.sampleValue.content"}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.animateValue();

			// Accessibility : add aria-live attribute to read value whenever it changes.
			this.$.sampleValue.setAttribute("aria-live", "assertive");
		};
	}),
	stopDigitAnimation : function(inSender, inEvent) {
		if (inEvent.originator.owner.name === this.$.panel.name) {
			this.destroyValueSubDiv();
		}
	},
	hideContent: function() {
		this.destroyValueSubDiv();
		this.$.sampleValue.setContent(" ");
	},
	destroyValueSubDiv:function() {
		if (this.isSplittedTextCreated) {
			clearTimeout(this.destroySplitedDivTimerID);
			this.destroySplitedDivTimerID =undefined;
			this.$.sampleValue.destroyClientControls();
			this.$.sampleValue.setContent("");
			this.$.sampleValue.setContent(this.$.panel.value.toString());
			this.isSplittedTextCreated = false;
		}
	},
	animateValue:function() {
		var time = this.createSplitedDiv();
		this.destroySplitedDiv(time);
	},
	createSplitedDiv: function() {
			var i, splitNum, length, maxAnimationTime;

			splitNum = this.splitDigit(this.$.panel.value);
			length = splitNum.length;
			for (i = 0; i < length; i++) {
				this.$.sampleValue.createComponent(
					{name: "g.sampleValueChild" + i, content: splitNum[i], style: "display: inline-block"}
				);
				this.$.sampleValue.children[i].addClass("g-sample-wheel-slider-text-animation");
				this.$.sampleValue.children[i].applyStyle("-webkit-animation-duration", 0.4 + (0.2 * i) + "s");
				this.$.sampleValue.children[i].applyStyle("animation-duration", 0.4 + (0.2 * i) + "s");
			}
			if (length > 0) {
				this.isSplittedTextCreated = true;
			}
			this.$.sampleValue.setContent("");
			maxAnimationTime = 0.4 + (0.2 * i);

			return maxAnimationTime;
	},
	destroySplitedDiv: function(time) {
		if (!this.isSplittedTextCreated) {
			return;
		}
		this.destroySplitedDivTimerID = setTimeout(utils.bind(this,this.destroyValueSubDiv), time * 1000);
	},
	splitDigit: function(num) {
		var digits = num.toString().split('');
		return digits;
	},
	tapCancel: function(inSender, inEvent) {
		this.doResult({msg: "Cancel button tapped !!"});
		this.$.popup.show();
	},
	tapOK: function(inSender, inEvent) {
		this.doResult({msg: "OK button tapped !!"});
		this.$.popup.show();
	},
	changingEventHandler: function(inSender, inEvent) {
		this.doResult({msg: "changing inEvent.value : " + inEvent.value});
	},
	changeEventHandler: function(inSender, inEvent) {
		this.doResult({msg: "change inEvent.value : " + inEvent.value});
	}
});

module.exports = kind({
	name: "g.sample.WheelSliderControllerSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Wheel Slider Controller Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Wheel Slider Panel", classes: "g-sample-subheader"},
		{kind: "g.sample.WheelSliderController", onResult: "result"},

		{src: "@../assets/btn_command_next.svg", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "Not tapped yet.", classes: "g-sample-description"}
		]}
	],
	result: function(inSender, inEvent) {
		this.$.result.setContent(inEvent.msg);
	},
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
