require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Icon = require('garnet/Icon'),
	Panel = require('garnet/Panel');

var IconPanel = kind({
	name: "g.sample.IconPanel",
	kind: Panel,
	classes: "g-layout-absolute-wrapper",
	style: "border-radius: 50%; background-color: #000000;",
	components: [
		{classes: "g-layout-absolute-center", style: "width: " + ri.scale(255) + "px; height: " + ri.scale(230) + "px;", components: [
			{content: "Icons : ", style: "margin-left: " + ri.scale(10) + "px; font-size: " + ri.scale(20) + "px; display: inline-block; margin-right: " + ri.scale(10) + "px; color: #FFFFFF;"},
			{tag: "br"},
			{kind: Icon, src: "@../assets/btn_cancel.svg", classes: "g-common-button-size-small"},
			{kind: Icon, src: "@../assets/btn_cancel.svg", classes: "g-common-button-size-normal"},
			{kind: Icon, src: "@../assets/btn_cancel.svg", classes: "g-common-button-size-large"},
			{tag: "br"},
			{kind: Icon, src: "@../assets/btn_cancel.svg", classes: "g-common-button-size-large", disabled: true},
			{kind: Icon, src: "@../assets/ic_warning.svg", classes: "g-sample-button-warning"}
		]}
	]
});

module.exports = kind({
	name: "g.sample.IconSample",
	classes: "enyo-unselectable garnet g-sample g-sample-icon",
	components: [
		{content: "< Icon Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Icons", classes: "g-sample-subheader"},
		{kind: IconPanel, style: "position: relative;"}
	],
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
