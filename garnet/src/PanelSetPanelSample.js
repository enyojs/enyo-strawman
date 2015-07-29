var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	dom = require('enyo/dom.js'),
	ri = require('enyo/resolution'),
	Collection = require('enyo/Collection.js'),

	g = require('garnet'),
	Scroller = require('garnet/Scroller'),
	Panel = require('garnet/Panel'),
	PanelSet = require('garnet/PanelSet');

module.exports = kind({
	name: "g.sample.PanelSetPanelSample",
	horizontal: "hidden",
	classes: "enyo-unselectable garnet g-sample",
	kind: Scroller,
	components: [
		{content: "< PanelSet with transform effects Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "depth-transition PanelSet", classes: "g-sample-subheader"},
		{
			style: "width: " + ri.scale(320) + "px; height: " + ri.scale(320) + "px; position: relative; display: inline-block; margin-right: 20px;",
			components: [
				{
					kind: PanelSet,
					components: [
						{kind: Panel, name: "p3", components: [
							{name: "panelA1-1", kind: "g.sample.DataListPanel", title: true, titleContent: "1-1"}
						]},
						{name: "panelA2", kind: "g.sample.DataListPanel", title: true, titleContent: "2"},
						{name: "panelA3", kind: "g.sample.DataListPanel", title: true, titleContent: "3"}
					]
				}
			]
		},
		{
			style: "width: " + ri.scale(320) + "px; height: " + ri.scale(320) + "px; position: relative; display: inline-block; margin-right: 20px;",
			components: [
				{
					kind: Panel,
					components: [
						{kind: PanelSet, components: [
							{name: "panelB1-1", kind: "g.sample.DataListPanel", title: true, titleContent: "1-1"},
							{name: "panelB1-2", kind: "g.sample.DataListPanel", title: true, titleContent: "1-2"},
							{name: "panelB1-3", kind: "g.sample.DataListPanel", title: true, titleContent: "1-3"}
						]}
					]
				}
			]
		},
		{
			style: "width: " + ri.scale(320) + "px; height: " + ri.scale(320) + "px; position: relative; display: inline-block; margin-right: 20px;",
			components: [
				{
					kind: Panel,
					components: [
						{kind: Panel, components: [
							{kind: PanelSet, components: [
								{name: "panelC1-1", kind: "g.sample.DataListPanel", title: true, titleContent: "1-1"},
								{name: "panelC1-2", kind: "g.sample.DataListPanel", title: true, titleContent: "1-2"},
								{name: "panelC1-3", kind: "g.sample.DataListPanel", title: true, titleContent: "1-3"}
							]}
						]}
					]
				}
			]
		},
		{content: ": PanelSet-Panel-Panel / Panel-PanelSet-Panel / Panel-Panel-PanelSet ", classes: "g-sample-description"},

		{content: "move-transition PanelSet", classes: "g-sample-subheader"},
		{
			style: "width: " + ri.scale(320) + "px; height: " + ri.scale(320) + "px; position: relative; display: inline-block; margin-right: 20px;",
			components: [
				{
					kind: PanelSet,
					effect: "move-transition",
					pageIndicator: true,
					components: [
						{kind: Panel, pageIndicatorFadeOut: false, name: "p3", components: [
							{name: "panelD1-1", kind: "g.sample.DataListPanel", title: true, titleContent: "1-1"}
						]},
						{name: "panelD2", kind: "g.sample.DataListPanel", title: true, titleContent: "2"},
						{name: "panelD3", kind: "g.sample.DataListPanel", title: true, titleContent: "3"}
					]
				}
			]
		},
		{
			style: "width: " + ri.scale(320) + "px; height: " + ri.scale(320) + "px; position: relative; display: inline-block; margin-right: 20px;",
			components: [
				{
					kind: Panel,
					components: [
						{kind: PanelSet, effect: "move-transition", pageIndicator: true, components: [
							{name: "panelE1-1", kind: "g.sample.DataListPanel", title: true, titleContent: "1-1"},
							{name: "panelE1-2", kind: "g.sample.DataListPanel", title: true, titleContent: "1-2"},
							{name: "panelE1-3", kind: "g.sample.DataListPanel", title: true, titleContent: "1-3"}
						]}
					]
				}
			]
		},
		{
			style: "width: " + ri.scale(320) + "px; height: " + ri.scale(320) + "px; position: relative; display: inline-block; margin-right: 20px;",
			components: [
				{
					kind: Panel,
					components: [
						{kind: Panel, components: [
							{kind: PanelSet, effect: "move-transition", pageIndicator: true, components: [
								{name: "panelF1-1", kind: "g.sample.DataListPanel", title: true, titleContent: "1-1"},
								{name: "panelF1-2", kind: "g.sample.DataListPanel", title: true, titleContent: "1-2"},
								{name: "panelF1-3", kind: "g.sample.DataListPanel", title: true, titleContent: "1-3"}
							]}
						]}
					]
				}
			]
		},
		{content: ": PanelSet-Panel-Panel / Panel-PanelSet-Panel / Panel-Panel-PanelSet ", classes: "g-sample-description"}
	],
	previousTap: function(inSender, inEvent) {
		var namePrefix = inSender.name.substr(0,9);
		switch(namePrefix) {
		case "previousA":
			this.$.panelSetA.previous();
			break;
		case "previousB":
			this.$.panelSetB.previous();
			break;
		case "previousC":
			this.$.panelSetC.previous();
			break;
		}
	},
	nextTap: function(inSender, inEvent) {
		var namePrefix = inSender.name.substr(0,5);
		switch(namePrefix) {
		case "nextA":
			this.$.panelSetA.next();
			break;
		case "nextB":
			this.$.panelSetB.next();
			break;
		case "nextC":
			this.$.panelSetC.next();
			break;
		}
	},
	bindings: [
		{from: ".collection", to: ".$.panelA1-1.collection"},
		{from: ".collection", to: ".$.panelA2.collection"},
		{from: ".collection", to: ".$.panelA3.collection"},
		{from: ".collection", to: ".$.panelB1-1.collection"},
		{from: ".collection", to: ".$.panelB1-2.collection"},
		{from: ".collection", to: ".$.panelB1-3.collection"},
		{from: ".collection", to: ".$.panelC1-1.collection"},
		{from: ".collection", to: ".$.panelC1-2.collection"},
		{from: ".collection", to: ".$.panelC1-3.collection"},
		{from: ".collection", to: ".$.panelD1-1.collection"},
		{from: ".collection", to: ".$.panelD2.collection"},
		{from: ".collection", to: ".$.panelD3.collection"},
		{from: ".collection", to: ".$.panelE1-1.collection"},
		{from: ".collection", to: ".$.panelE1-2.collection"},
		{from: ".collection", to: ".$.panelE1-3.collection"},
		{from: ".collection", to: ".$.panelF1-1.collection"},
		{from: ".collection", to: ".$.panelF1-2.collection"},
		{from: ".collection", to: ".$.panelF1-3.collection"}
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
		global.history.go(-1);
		return false;
	},
	data: [
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock.collection"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop.collection"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop.collection"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock.collection"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad.collection"},
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
