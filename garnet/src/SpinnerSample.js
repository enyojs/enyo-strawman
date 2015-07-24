var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	dom = require('enyo/dom.js'),
	ri = require('enyo/resolution'),

	g = require('garnet'),
	Spinner = require('garnet/Spinner'),
	Panel = require('garnet/Panel');

kind({
	name: "g.sample.SpinnerPanel",
	kind: Panel,
	style: "border-radius: 50%; background-color: #000000;",
	components: [
		{classes: "g-layout-absolute-center", style: "width: " + ri.scale(244) + "px; height: " + ri.scale(110) + "px;", components: [
			{kind: Spinner, style: "width: 100%", content: "Connecting to the server"}
		]}
	]
});

kind({
	name: "g.sample.TextSpinnerPanel",
	kind: Panel,
	style: "border-radius: 50%; background-color: #000000;",
	components: [
		{kind: Spinner, classes: "g-layout-absolute-center", style: "position: absolute;"}
	]
});

module.exports = kind({
	name: "g.sample.SpinnerSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Spinner Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Spinners", classes: "g-sample-subheader"},
		{style: "position: relative; height: 100%", components: [
			{
				name: "spinnerPanel",
				kind: "g.sample.SpinnerPanel",
				style: "background-color: #000000; position: relative; display: inline-block; overflow: hidden;"
			},
			{
				name: "textSpinnerPanel",
				kind: "g.sample.TextSpinnerPanel",
				style: "background-color: #000000; position: relative; display: inline-block; overflow: hidden;"
			}
		]}
	],
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
