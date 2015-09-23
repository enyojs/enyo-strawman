require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Group = require('enyo/Group'),
	IconButton = require('garnet/IconButton'),
	Panel = require('garnet/Panel');

var IconButtonPanel = kind({
	name: "g.sample.IconButtonPanel",
	kind: Panel,
	events: {
		onResult: ""
	},
	classes: "g-layout-absolute-wrapper",
	style: "border-radius: 50%; background-color: #000000;",
	components: [
		{classes: "g-layout-absolute-center", style: "width: " + ri.scale(255) + "px; height: " + ri.scale(230) + "px;", components: [
			{content: "Icon Buttons : ", style: "margin-left: " + ri.scale(10) + "px; font-size: " + ri.scale(20) + "px; display: inline-block; margin-right: " + ri.scale(10) + "px; color: #FFFFFF;"},
			{tag: "br"},
			{kind: IconButton, src: "@../assets/btn_done.svg", ontap: "tapButton"},
			{kind: IconButton, src: "@../assets/btn_done.svg", disabled: true, ontap: "tapButton"},
			{content: "Grouped Icon Buttons : ", style: "font-size: " + ri.scale(20) + "px; display: inline-block; margin-right: " + ri.scale(10) + "px; color: #FFFFFF;"},
			{kind: Group, onActivate:"iconGroupActivated", components: [
				{kind: IconButton, src: "@../assets/btn_done.svg", classes: "g-common-button-size-small", active: true},
				{kind: IconButton, src: "@../assets/btn_done.svg", classes: "g-common-button-size-normal"},
				{kind: IconButton, src: "@../assets/btn_done.svg", classes: "g-common-button-size-large"}
			]}
		]}
	],
	tapButton: function(inSender, inEvent) {
		this.doResult({msg: '"'+inSender.name+'" ' + 'selected.'});
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
	name: "g.sample.IconButtonSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Icon Button Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Icon Buttons", classes: "g-sample-subheader"},
		{kind: IconButtonPanel, style: "position: relative;", onResult: "result"},

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
