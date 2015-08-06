var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	dom = require('enyo/dom.js'),

	g = require('garnet'),
	Panel = require('garnet/Panel');

module.exports = kind({
	name: "g.sample.PreventTapOnDragSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Prevent Tap On Drag Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Drag inside the buttons", classes: "g-sample-subheader"},
		{style:"background:red; border-radius:10px; margin:10px; padding:40px; display:inline-block; color: white;", content:"Drag inside", ontap:"tap", name:"red"},
		{style:"background:blue; border-radius:10px; margin:10px; padding:40px; display:inline-block; color: white;", content:"Drag inside", ontap:"tap", name: "blue", ondragfinish: "dragfinish"},
		{name: "result", allowHtml: true, content: "", style: "color: black"}
	],
	dragfinish: function(inSender, inEvent) {
		inEvent.preventTap();
	},
	tap: function(inSender, inEvent) {
		this.$.result.setContent(this.$.result.getContent() + "<br>tapped !!");
	},
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
