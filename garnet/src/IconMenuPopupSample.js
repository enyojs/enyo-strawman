var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	dom = require('enyo/dom.js'),
	ri = require('enyo/resolution'),

	g = require('garnet'),
	g_ri = require('garnet/resolution'),
	IconMenuPopup = require('garnet/IconMenuPopup'),
	Button = require('garnet/Button'),
	Panel = require('garnet/Panel');

kind({
	name: "g.sample.IconMenuPopupPanel",
	kind: Panel,
	events: {
		onResult: ""
	},
	components: [
		{name: "oneButton", kind: Button, style: "margin: " + ri.scale(55)+ "px " + ri.scale(5) + "px " + ri.scale(5)+ "px; width: " + ri.scale(310) + "px;", ontap: "showPopup", content: "Click here to show popup!"},
		{name: "twoButton", kind: Button, style: "margin: " + ri.scale(5) + "px; width: " + ri.scale(310) + "px;", ontap: "showPopup2", content: "Click here to show popup!"},
		{name: "threeButton", kind: Button, style: "margin: " + ri.scale(5) + "px; width: " + ri.scale(310) + "px;", ontap: "showPopup3", content: "Click here to show popup!"},

		{
			name: "oneButtonPopup",
			kind: IconMenuPopup,
			buttonComponents: [
				{
					name: "button1",
					ontap: "hidePopup",
					src: "@../assets/btn_delete.svg"
				}
			]
		},
		{
			name: "twoButtonPopup",
			kind: IconMenuPopup,
			buttonComponents: [
				{
					name: "1st 2 buttons",
					ontap: "hidePopup",
					src: "@../assets/btn_delete.svg"
				},
				{
					name: "2nd 2 buttons",
					ontap: "hidePopup",
					src: "@../assets/btn_share.svg",
					disabled: true
				}
			]
		},
		{
			name: "threeButtonPopup",
			kind: IconMenuPopup,
			buttonComponents: [
				{
					name: "1st 3 buttons",
					ontap: "hidePopup",
					src: "@../assets/btn_delete.svg"
				},
				{
					name: "2nd 3 buttons",
					ontap: "hidePopup",
					src: "@../assets/btn_share.svg",
					disabled: true
				},
				{
					name: "3rd 3 buttons",
					ontap: "hidePopup",
					src: "@../assets/btn_share.svg"
				}
			]
		}
	],
	showPopup: function(inSender, inEvent) {
		this.$.oneButtonPopup.show();
	},
	showPopup2: function(inSender, inEvent) {
		this.$.twoButtonPopup.show();
	},
	showPopup3: function(inSender, inEvent) {
		this.$.threeButtonPopup.show();
	},
	hidePopup: function(inSender, inEvent) {
		var name = inEvent.originator.name;

		if ( inEvent.originator.active === true &&
			(name === "button1" ||
			name === "1st 2 buttons" ||  name === "2nd 2 buttons" ||
			name === "1st 3 buttons" ||  name === "2nd 3 buttons" ||  name === "3rd 3 buttons")) {
			this.doResult({msg: name + " is selected."});
			this.$.oneButtonPopup.hide();
			this.$.twoButtonPopup.hide();
			this.$.threeButtonPopup.hide();
		}
	}
});

module.exports = kind({
	name: "g.sample.IconMenuPopupSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< IconMenu Popup Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "IconMenu with 1 button / 2 buttons / 3 buttons", classes: "g-sample-subheader"},
		{kind: "g.sample.IconMenuPopupPanel", style: "position: relative;", onResult: "result"},

		{src: "@../assets/btn_command_next.svg", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "No button pressed yet.", classes: "g-sample-description"}
		]}
	],
	result: function(inSender, inEvent) {
		this.$.result.setContent(inEvent.msg);
	},
	goBack: function(inSender, inEvent) {
		global.location.href = "./index.html?Garnet"; // global.history.go(-1);
		return false;
	}
});
