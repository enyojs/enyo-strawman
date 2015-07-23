var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),

	g = require('garnet'),
	DatePickerPanel = require('garnet/DatePickerPanel');

kind({
	name: "g.sample.DatePickerPanel",
	kind: DatePickerPanel,
	handlers: {
		onOK: "tapOK",
		onCancel: "tapCancel"
	},
	events: {
		onResult: ""
	},
	locale: "en-US",
	style: "position: relative;",
	mode: "year",
	tapOK: function() {
		this.doResult({msg: "Date is " + this.getValue()});
	},
	tapCancel: function() {
		this.doResult({msg: "Cancel!"});
	}
});

module.exports = kind({
	name: "g.sample.DatePickerPanelSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Date Picker Panel Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Date Picker Panel", classes: "g-sample-subheader"},
		{kind: "g.sample.DatePickerPanel", style: "position: relative;", onResult: "result"},

		{style: "position: fixed; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
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
