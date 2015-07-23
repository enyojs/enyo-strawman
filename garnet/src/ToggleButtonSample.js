var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	dom = require('enyo/dom.js'),
	ri = require('enyo/resolution'),
	Group = require('enyo/Group'),

	g = require('garnet'),
	ToggleButton = require('garnet/ToggleButton'),
	Panel = require('garnet/Panel');

kind({
	name: "g.sample.ToggleButtonPanel",
	kind: Panel,
	events: {
		onResult: ""
	},
	classes: "g-layout-absolute-wrapper",
	style: "border-radius: 50%; background-color: #000000;",
	components: [
		{classes: "g-layout-absolute-center", style: "width: " + ri.scale(280) + "px; height: " + ri.scale(230) + "px;", components: [
			{kind: ToggleButton, value: true, content: "1", ontap: "tapButton"},
			{kind: ToggleButton, content: "2", ontap: "tapButton"},
			{kind: ToggleButton, disabled: true, content: "Disabled", ontap: "tapButton"},
			{content: "Grouped ToggleButtons : ", style: "font-size: " + ri.scale(20) + "px; display: inline-block; margin-right: " + ri.scale(10) + "px; color: #FFFFFF;"},
			{kind: Group, components: [
				{kind: ToggleButton, active: true, content: "AA", ontap: "tapButton"},
				{kind: ToggleButton, content: "BB", ontap: "tapButton"},
				{kind: ToggleButton, content: "CC", ontap: "tapButton"}
			]}
		]}
	],
	tapButton: function(inSender, inEvent) {
		var str = '"'+inSender.content+'" ' + (inSender.getActive() ? 'selected' : 'unselected') + '.';
		this.doResult({msg: str});
	}
});

module.exports = kind({
	name: "g.sample.ToggleButtonSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Toggle Button Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Toggle Buttons", classes: "g-sample-subheader"},
		{kind: "g.sample.ToggleButtonPanel", style: "position: relative;", onResult: "result"},

		{style: "position: fixed; width: 100%; min-height: +" + ri.scale(160) + "px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "No action yet", classes: "g-sample-description"}
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
