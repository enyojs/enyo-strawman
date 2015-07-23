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
	PanelSet = require('garnet/PanelSet');

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
						{name: "panel2", kind: "g.sample.DataListPanel", style: "background-color: #000000;"},
						{name: "panel3", kind: "g.sample.DataGridListPanel", style: "background-color: #000000;"},
						{name: "panel4", kind: TimePickerPanel},
						{name: "panel5", kind : DatePickerPanel},
						{kind: "g.sample.WheelSliderController"}
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
					{name: "listPanel1", kind: "g.sample.DataListPanel", style: "background-color: #000000;"},
					{name: "listPanel2", kind: "g.sample.DataGridListPanel", style: "background-color: #000000;"},
					{name: "timePickerPanel1", kind: TimePickerPanel, pageIndicatorDisable: true},
					{name: "DatePickerPanel1", kind : DatePickerPanel, pageIndicatorDisable: true},
					{kind: "g.sample.WheelSliderController", pageIndicatorDisable: true}
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
			this.collection = new Collection(this.data);
			this.set("collection2", new Collection(this.generateRecords()));
		};
	}),
	generateRecords: function () {
		var records = [],
			idx     = this.index || 0;
		for (; records.length < 500; ++idx) {
			var title = (idx % 8 === 0) ? " with long title" : "";
			records.push({
				text: "Item " + idx + title,
				url: "@../assets/photo.png"
			});
		}
		// update our internal index so it will always generate unique values
		this.index = idx;
		return records;
	},
	goBack: function(inSender, inEvent) {
		global.location.href = "./index.html?Garnet"; // global.history.go(-1);
		return false;
	},
	data: [
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"}
	]
});
