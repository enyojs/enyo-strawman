var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	dom = require('enyo/dom.js'),
	ri = require('enyo/resolution'),

	g = require('garnet'),
	TimePickerPanel = require('garnet/TimePickerPanel'),
	Panel = require('garnet/Panel');

kind({
	name: "g.sample.TimePicker12Panel",
	kind: TimePickerPanel,
	handlers: {
		onOK: "tapOK",
		onCancel: "tapCancel"
	},
	events: {
		onResult: ""
	},
	hourValue: 12,
	minuteValue: 30,
	meridiemValue: "PM",
	tapOK: function(inSender, inEvent) {
		this.doResult({msg: "Time is " + this.getHourValue() + " : " + this.getMinuteValue() + " " + this.meridiemValue});
	},
	tapCancel: function() {
		this.doResult({msg: "Cancel!"});
	}
});

kind({
	name: "g.sample.TimePicker24Panel",
	kind: TimePickerPanel,
	handlers: {
		onOK: "onOK",
		onCancel: "onCancel"
	},
	events: {
		onResult: ""
	},
	hourValue: 17,
	minuteValue: 45,
	meridiemValue: "24",
	onOK: function(inSender, inEvent) {
		this.doResult({msg: "Time is " + this.getHourValue() + " : " + this.getMinuteValue()});
	},
	onCancel: function() {
		this.doResult({msg: "Cancel!"});
	}
});

module.exports = kind({
	name: "g.sample.TimePickerPanelSample",
	handlers: {
		onResult: "result"
	},
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Time Picker Panel Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Time Picker Panel", classes: "g-sample-subheader"},
		{style: "position: relative; height: 100%", components: [
			{
				name: "timePicker12Panel",
				kind: "g.sample.TimePicker12Panel",
				style: "background-color: #000000; position: relative; display: inline-block; overflow: hidden;"
			},
			{
				name: "timePicker24Panel",
				kind: "g.sample.TimePicker24Panel",
				style: "background-color: #000000; position: relative; display: inline-block; margin-left: " + ri.scale(10) + "px; overflow: hidden;"
			}
		]},

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
