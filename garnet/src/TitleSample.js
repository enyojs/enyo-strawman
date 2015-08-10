var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	dom = require('enyo/dom.js'),
	ri = require('enyo/resolution'),

	g = require('garnet'),
	Button = require('garnet/Button'),
	Scroller = require('garnet/Scroller'),
	Panel = require('garnet/Panel');

var TitlePanel = kind({
	name: "g.sample.TitlePanel",
	kind: Panel,
	handlers: {
		onTitleTap: "tapTitle",
		onTitleClick: "clickTitle"
	},
	events: {
		onResult: ""
	},
	title: true,
	titleContent: "Title: long text will fade out",
	components: [
		{
			name: "scroller",
			kind: Scroller,
			classes: "enyo-fit g-layout-text-center",
			scrollIndicatorEnabled: true,
			components: [
				{style: "padding-top: " + ri.scale(60)+ "px; width: " + ri.scale(200) + "px; margin: auto;", content: "Garnet is a UI library built for wearable devices and is based on Enyo. Garnet supports LG smart watch as well as the emulator provided. Browser-wise, Garnet supports the browser on LG smart watch, Firefox 16, Opera 15, Safari 3.1, Chrome 27 and their higher versions."},
				{kind: Button, content: "OK!!!", ontap: "tapButton", style: "margin: " + ri.scale(20) + "px 0 " + ri.scale(70) + "px;"}
			]
		}
	],
	tapButton: function(inSender, inEvent) {
		this.doResult({msg: "Button tapped !!"});
	},
	tapTitle: function(inSender, inEvent) {
		this.doResult({msg: "Title tapped !!"});
	},
	clickTitle: function(inSender, inEvent) {
		this.doResult({msg: "Title clicked !!"});
	}
});

module.exports = kind({
	name: "g.sample.TitleSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Title ( + BodyText ) Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Title with a scrollable content area", classes: "g-sample-subheader"},
		{kind: TitlePanel, style: "position: relative;", onResult: "result"},

		{src: "@../assets/btn_command_next.svg", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "No tapped yet.", classes: "g-sample-description"}
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
