var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	ri = require('enyo/resolution'),
	Group = require('enyo/Group'),

	g = require('garnet'),
	Button = require('garnet/Button'),
	Panel = require('garnet/Panel');

var ButtonPanel = kind({
	name: "g.sample.ButtonPanel",
	kind: Panel,
	events: {
		onResult: ""
	},
	classes: "g-layout-absolute-wrapper",
	style: "border-radius: 50%; background-color: #000000;",
	components: [
		{classes: "g-layout-absolute-center", style: "width: " + ri.scale(280) + "px; height: " + ri.scale(230) + "px;", components: [
			{name: "B Button", kind: Button, content: "B", ontap: "tapButton"},
			{name: "Button", kind: Button, content: "Btn A", ontap: "tapButton"},
			{name: "B Button Disabled", kind: Button, content: "Disabled", style: "width: " + ri.scale(100) + "px", disabled: true, ontap: "tapButton"},
			{content: "Fixed Button : ", style: "font-size: " + ri.scale(20) + "px; display: inline-block; margin-right: " + ri.scale(10) + "px; color: #FFFFFF;"},
			{name: "Fixed Button", kind: Button, content: "Fixed Button", style: "width: " + ri.scale(280) + "px;", ontap: "tapButton"},
			{content: "Grouped Buttons : ", style: "font-size: " + ri.scale(20) + "px; display: inline-block; margin-right: " + ri.scale(10) + "px; color: #FFFFFF;"},
			{kind: Group, components: [
				{name: "Apple Button", kind: Button, active: true, content: "AA", ontap: "tapButton"},
				{name: "Banana Button", kind: Button, content: "BB", ontap: "tapButton"},
				{name: "Saskatoonberry Button", kind: Button,  content: "CC", ontap: "tapButton"}
			]}
		]}
	],
	tapButton: function(inSender, inEvent) {
		this.doResult({msg: "&quot;" + inSender.name + "&quot; pressed."});
	}
});

module.exports = kind({
	name: "g.sample.ButtonSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Button Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Buttons", classes: "g-sample-subheader"},
		{kind: ButtonPanel, style: "position: relative;", onResult: "result"},

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
