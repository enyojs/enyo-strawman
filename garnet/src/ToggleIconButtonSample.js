var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	dom = require('enyo/dom.js'),
	ri = require('enyo/resolution'),
	Group = require('enyo/Group'),

	g = require('garnet'),
	g_ri = require('garnet/resolution'),
	ToggleIconButton = require('garnet/ToggleIconButton'),
	Panel = require('garnet/Panel');

var ToggleIconButtonPanel = kind({
	name: "g.sample.ToggleIconButtonPanel",
	kind: Panel,
	handlers: {
		onChange: "valueChange"
	},
	events: {
		onResult: ""
	},
	classes: "g-layout-absolute-wrapper",
	style: "border-radius: 50%; background-color: #000000;",
	components: [
		{classes: "g-layout-absolute-center", style: "width: " + ri.scale(280) + "px; height: " + ri.scale(230) + "px;", components: [
			{content: "Toggle Icon Buttons : ", style: "margin-left: " + ri.scale(10) + "px; font-size: " + ri.scale(20) + "px; display: inline-block; margin-right: " + ri.scale(10) + "px; color: #FFFFFF;"},
			{tag: "br"},
			{kind: ToggleIconButton, src: "@../assets/switch_default_oi_transparent.svg", classes: "g-common-toggle-icon-button-size-normal", active: true},
			{kind: ToggleIconButton, src: "@../assets/switch_default_transparent.svg", classes: "g-common-toggle-icon-button-size-normal"},
			{kind: ToggleIconButton, src: "@../assets/switch_default_oi_transparent.svg", classes: "g-common-toggle-icon-button-size-normal", pending: true, ontap: "togglePending"},
			{kind: ToggleIconButton, src: "@../assets/switch_default_transparent.svg", classes: "g-common-toggle-icon-button-size-normal", disabled: true},
			{content: "Grouped Icon Buttons : ", style: "font-size: " + ri.scale(20) + "px; display: inline-block; margin-right: " + ri.scale(10) + "px; color: #FFFFFF;"},
			{kind: Group, onActivate:"iconGroupActivated", components: [
				{kind: ToggleIconButton, src: "@../assets/switch_default_transparent.svg", classes: "g-common-toggle-icon-button-size-normal", active: true},
				{kind: ToggleIconButton, src: "@../assets/switch_default_oi_transparent.svg", classes: "g-common-toggle-icon-button-size-normal"},
				{kind: ToggleIconButton, src: "@../assets/switch_list_transparent.svg", classes: "g-common-toggle-icon-button-size-small"},
				{kind: ToggleIconButton, src: "@../assets/switch_list_oi_transparent.svg", classes: "g-common-toggle-icon-button-size-small"}
			]}
		]}
	],
	valueChange: function(inSender, inEvent) {
		this.doResult({msg: inSender.name + " is " + (inEvent.originator.getValue() ? " selected." : "deselected.")});
	},
	togglePending: function(inSender, inEvent) {
		// settting the state of toggle icon button from 'offPending/onPending' to 'off/on' - using timers for demo purpose
		var pendingValue = inSender.getPendingValue();
		if (pendingValue === "onPending" || pendingValue === "offPending") {
			setTimeout(function() {
				inEvent.originator.set("pendingValue", (pendingValue === "onPending")? "on" : "off");
			}, 2000);
			this.doResult({msg: inSender.name + " is " + ((inSender.getValue()? "selected," : "deselected,") + " and pending to be toggled.")});
		}
	},
	iconGroupActivated: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			var ordinals = ["1st", "2nd", "3rd", "4th"],
				selected = inEvent.originator.indexInContainer();

			this.doResult({msg: "The " + ordinals[selected] + " icon button in the group is selected."});
		}
	}
});

module.exports = kind({
	name: "g.sample.ToggleIconButtonSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Toggle Icon Button Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Toggle Icon Buttons", classes: "g-sample-subheader"},
		{kind: ToggleIconButtonPanel, style: "position: relative;", onResult: "result"},

		{src: "@../assets/btn_command_next.svg", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "No action yet", classes: "g-sample-description"}
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
