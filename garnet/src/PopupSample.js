var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	dom = require('enyo/dom.js'),
	ri = require('enyo/resolution'),
	Image = require('enyo/Image'),

	g = require('garnet'),
	g_ri = require('garnet/resolution'),
	Button = require('garnet/Button'),
	Panel = require('garnet/Panel'),
	Popup = require('garnet/Popup'),
	Scroller = require('garnet/Scroller');

var PopupPanel = kind({
	name: "g.sample.PopupPanel",
	kind: Panel,
	events: {
		onResult: ""
	},
	okTapped: false,
	classes: "g-layout-absolute-wrapper", // for button
	components: [
		{name: "popupBtn", kind: Button, classes: "g-layout-absolute-center g-layout-absolute-middle", style: "position: absolute; width: " + ri.scale(310) + "px; margin: auto;", ontap: "showPopup", content: "Click here to show popup!"},
		{
			name: "popup",
			kind: Popup,
			style: "overflow: hidden;",
			popupEffect: true,
			onPopUpAnimationEnd: "popUpEnd",
			onPopDownAnimationEnd: "popDownEnd",
			onHide: "hidePopup",
			components: [
				{classes: "g-common-width-height-fit", style: "overflow: hidden;", components: [
					{
						name: "scroller",
						kind: Scroller,
						scrollIndicatorEnabled: true,
						classes: "enyo-fit garnet g-layout-text-center",
						components: [
							{ style: "padding: " + ri.scale(15)+ "px 0 0; height: " + ri.scale(82)+ "px;", components: [
								{classes: "g-sample-popup-icon"},
								{content: "Warning", style: "font-size: " + ri.scale(22)+ "px; font-weight: 800;"}
							]},
							{style: "width: " + ri.scale(200) + "px; margin: auto;", content: "Garnet is a UI library built for wearable devices and is based on Enyo. Garnet supports LG smart watch as well as the emulator provided. Browser-wise, Garnet supports the browser on LG smart watch, Firefox 16, Opera 15, Safari 3.1, Chrome 27 and their higher versions."},
							{name: "button", kind: Button, content: "OK!!!", ontap: "tapOK", style: "margin: " + ri.scale(20) + "px 0 " + ri.scale(70) + "px;"}
						]
					}
				]}
			]
		}
	],
	showPopup: function(inSender, inEvent) {
		if (inSender.name === "popupBtn") {
			this.$.popup.show();
		}
	},
	hidePopup: function(inSender, inEvent) {
		if (this.okTapped) {
			this.doResult({msg: "Popup is hidden by OK button"});
			this.okTapped = false;
		} else {
			this.doResult({msg: "Popup is hidden by flick"});
		}
	},
	tapOK: function(inSender, inEvent) {
		this.okTapped = true;
		this.$.popup.hide();
	},
	popUpEnd: function(inSender, inEvent) {
		// Function to be handled after PopUp Animation End
	},
	popDownEnd: function(inSender, inEvent) {
		// Function to be handled after PopDown Animation End
	}
});

module.exports = kind({
	name: "g.sample.PopupSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Popup Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Popup with contents", classes: "g-sample-subheader"},
		{kind: PopupPanel, style: "position: relative;", onResult: "result"},

		{src: "@../assets/btn_command_next.svg", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "No button pressed yet.", classes: "g-sample-description"}
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
