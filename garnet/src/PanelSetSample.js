var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	dom = require('enyo/dom.js'),
	ri = require('enyo/resolution'),
	Collection = require('enyo/Collection.js'),

	g = require('garnet'),
	Panel = require('garnet/Panel'),
	TimePickerPanel = require('garnet/TimePickerPanel'),
	DatePickerPanel = require('garnet/DatePickerPanel'),
	PanelSet = require('garnet/PanelSet'),

	SampleDataListPanel = require('./DataListSample').DataListPanel,
	SampleDataGridListPanel = require('./DataGridListSample').DataGridListPanel,
	SampleWheelSliderController = require('./WheelSliderControllerSample').WheelSliderControllerPanel;

module.exports = kind({
	name: "g.sample.PanelSetSample",
	horizontal: "hidden",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< PanelSet with transform effects Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "depth-transition", classes: "g-sample-subheader"},
		{
			style: "width: " + ri.scale(320) + "px; height: " + ri.scale(320) + "px",
			components: [
				{
					name: "panelSet2",
					kind: PanelSet,
					effect: "depth-transition",
					style: "position: relative; background-color: #000000;",
					components: [
						{kind: Panel, name: "panel1", style: "background-color: #000000;", components: [
							{content: "Text 1", style: "padding-top: " + ri.scale(23) + "px; text-align: center;"},
							{content: "Text 2", style: "text-align: center;"},
							{content: "Text 3", style: "text-align: center;"},
							{content: "Text 4", style: "text-align: center;"},
							{content: "Text 5", style: "text-align: center;"}
						]},
						{name: "panel2", kind: SampleDataListPanel, style: "background-color: #000000;"},
						{name: "panel3", kind: SampleDataGridListPanel, style: "background-color: #000000;"},
						{name: "panel4", kind: TimePickerPanel},
						{name: "panel5", kind : DatePickerPanel},
						{kind: SampleWheelSliderController}
					]
				}
			]
		},
		{content: ": Drag a panel to the left or to the right.", classes: "g-sample-description"},

		{content: "move-transition", classes: "g-sample-subheader"},
		{
			style: "width: " + ri.scale(320) + "px; height: " + ri.scale(320) + "px",
			components: [
			{
				name: "panelSet1",
				kind: PanelSet,
				pageIndicator: true,
				effect: "move-transition",
				style: "position: relative; background-color: #000000;",
				components: [
					{kind: Panel, name: "panelName4", style: "background-color: #000000;", components: [
						{content: "Text 1", style: "padding-top: " + ri.scale(23) + "px; text-align: center;"},
						{content: "Text 2", style: "text-align: center;"},
						{content: "Text 3", style: "text-align: center;"},
						{content: "Text 4", style: "text-align: center;"},
						{content: "Text 5", style: "text-align: center;"}
					]},
					{name: "listPanel1", kind: SampleDataListPanel, style: "background-color: #000000;"},
					{name: "listPanel2", kind: SampleDataGridListPanel, style: "background-color: #000000;"},
					{name: "timePickerPanel1", kind: TimePickerPanel, pageIndicatorDisable: true},
					{name: "DatePickerPanel1", kind : DatePickerPanel, pageIndicatorDisable: true},
					{kind: SampleWheelSliderController, pageIndicatorDisable: true}
				]
			}
		]},
		{content: ": Drag a panel to the left or to the right.", classes: "g-sample-description"}
	],
	bindings: [
		{from: ".collection", to: ".$.listPanel1.collection"},
		{from: ".collection2", to: ".$.listPanel2.collection"},
		{from: ".collection", to: ".$.panel2.collection"},
		{from: ".collection2", to: ".$.panel3.collection"}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.set("collection", new Collection(this.generateRecords()));
			this.set("collection2", new Collection(this.generateRecords2()));
		};
	}),
	generateRecords: function () {
		var records = [],
			idx = 0,
			title = ["Alejandra", "Marquez", "Barr", "Everett", "Crane", "Raymond", "Petersen", "Kristina", "Barbra", "Tracey"],
			genre = ["Rock", "Pop", "Hiphop", "Rock", "Ballad"];

		for (; records.length < 500; ++idx) {
			records.push({
				iconUrl: "@../assets/ic_dialog_alert.svg",
				albumTitle: title[idx % title.length] + ((idx % 8 === 0) ? " with long title" : ""),
				albumGenre: genre[idx % genre.length]
			});
		}
		return records;
	},
	generateRecords2: function () {
		var records = [],
			idx = 0;
		for (; records.length < 500; ++idx) {
			var title = (idx % 8 === 0) ? " with long title" : "";
			records.push({
				text: "Item " + idx + title,
				url: "@../assets/photo.png"
			});
		}
		return records;
	},
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
