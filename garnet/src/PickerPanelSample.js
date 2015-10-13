require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Collection = require('enyo/Collection.js'),
	FormPickerButton = require('garnet/FormPickerButton'),
	Panel = require('garnet/Panel'),
	GarnetPickerPanel = require('garnet/PickerPanel'),
	Popup = require('garnet/Popup');

var SamplePickerPanel = kind({
	name: "g.sample.PickerPanel",
	kind: Panel,
	events: {
		onResult: ""
	},
	components: [
		{style: "position: relative; background-color: #000000;", classes: "g-common-width-height-fit", components: [
			{name: "pickerButton", kind: FormPickerButton, style: "top: " + ri.scale(134) + "px;", ontap: "showPopup", content: "Click here!"},
			{name: "pickerPopup", kind: Popup, effect: "depth-transition", components: [
				{style: "background-color: #000000;position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
					{name: "pickerPanel", kind: GarnetPickerPanel, title: true, titleContent: "PickerTitle", ontap: "tapItem"}
				]}
			]}
		]}
	],
	bindings: [
		{from: ".collection", to: ".$.pickerPanel.collection"}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new Collection(this.data);
		};
	}),
	rendered: function() {
		// default index
		this.$.pickerPanel.setIndex(2);
		this.doResult({msg: "The item index #" + this.$.pickerPanel.getIndex() + " is selected."});
	},
	showPopup: function(inSender, inEvent) {
		if (inSender.name === "pickerButton") {
			this.$.pickerPopup.show();
		}
	},
	tapItem: function(inSender, inEvent) {
		var index = this.$.pickerPanel.getIndex();

		this.doResult({msg: "The item index #" + index + " is selected."});
		this.$.pickerPopup.hide();
		this.$.pickerButton.setContent((this.data[index]).item);
	},
	data: [
		{item: "This item title is very long"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"}
	]
});

module.exports = kind({
	name: "g.sample.PickerPanelSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< PickerPanel Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "PickerPanel", classes: "g-sample-subheader"},
		{kind: SamplePickerPanel, style: "position: relative;", onResult: "result"},

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
