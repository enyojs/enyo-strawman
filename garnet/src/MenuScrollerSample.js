var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	dom = require('enyo/dom.js'),
	ri = require('enyo/resolution'),

	g = require('garnet'),
	MenuCheckbox = require('garnet/MenuCheckbox'),
	MenuItem = require('garnet/MenuItem'),
	MenuItem = require('garnet/MenuItem'),
	MenuScroller = require('garnet/MenuScroller'),
	MenuToggleIconButton = require('garnet/MenuToggleIconButton'),
	Panel = require('garnet/Panel'),
	Popup = require('garnet/Popup');

kind({
	name: "g.sample.MenuScrollerPanel",
	kind: Panel,
	handlers: {
		onTitleTap: "showMenu"
	},
	events: {
		onResult: ""
	},
	title: true,
	titleIcon: true,
	titleContent: "Title: long text will fade out",
	components: [
		{content: "Please tap a title", style: "position: absolute; width: 100%; margin-top: " + ri.scale(60) + "px; text-align: center;"},
		{name: "menuScrollerPopup", kind: Popup, effect: "depth-transition", components: [
			{kind: MenuScroller, components: [
				{name: "item1", kind: MenuItem, singleLine: true, content: "This item is single line item.", ontap: "tapItem"},
				{name: "item2", kind: MenuItem, allowHtml: true, content: "This item supports<br>2 line. It will clip the text", ontap: "tapItem"},
				{name: "item3", kind: MenuCheckbox, content: "This is long check item", onchange: "tapItem"},
				{name: "item4", kind: MenuToggleIconButton, content: "Edit", ontap: "tapItem"}
			]}
		]}
	],
	showMenu: function(inSender, inEvent) {
		this.$.menuScrollerPopup.show();
		this.doResult({msg: "Title tapped !!"});
		return;
	},
	tapItem: function(inSender, inEvent) {
		var name = inSender.name;

		if (name === "item3") {
			this.doResult({msg: name + " is checked : " + inSender.checked});
		} else if (name === "item4") {
			this.doResult({msg: name + " is toggled : " + inSender.value});
		} else {
			this.doResult({msg: name + " is selected"});
			this.$.menuScrollerPopup.hide();
		}
	}
});

module.exports = kind({
	name: "g.sample.MenuScrollerSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Menu Scroller Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Menu Scroller", classes: "g-sample-subheader"},
		{kind: "g.sample.MenuScrollerPanel", style: "position: relative;", onResult: "result"},

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
