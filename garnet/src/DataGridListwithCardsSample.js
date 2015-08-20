require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Collection = require('enyo/Collection.js'),
	EnyoImage = require('enyo/Image'),
	DataGridList = require('garnet/DataGridList'),
	Panel = require('garnet/Panel'),
	SelectionOverlaySupport = require('garnet/SelectionOverlaySupport');

var DataGridListCardsImageItem = kind({
	name: "g.sample.DataGridListCardsImageItem",
	classes: "g-sample-gridlistcards-imageitem",
	components: [
		{name: "image", kind: EnyoImage},
		{name: "caption", classes: "caption"}
	],
	published: {
		source: "",
		caption: "",
		selected: false
	},
	bindings: [
		{from: ".source", to: ".$.image.src"},
		{from: ".caption", to: ".$.caption.content"}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.selectedChanged();
		};
	}),
	selectedChanged: function() {
		this.addRemoveClass("selected", this.selected);
	},
	disabledChanged: function() {
		this.addRemoveClass("disabled", this.disabled);
	}
});

var DataGridListCardsItem = kind({
	name: "g.sample.DataGridListCardsItem",
	kind: DataGridListCardsImageItem,
	mixins: [SelectionOverlaySupport],
	selectionScrimIcon: {
		"w320": "garnet/images/320/badge_check.png",
		"w360": "garnet/images/360/badge_check.png"
	},
	selectionOverlayVerticalOffset: 0,
	selectionOverlayHorizontalOffset: 0,
	bindings: [
		{from: ".model.url", to: ".source"}
	]
});

var DataGridListCardsCircleImageItem = kind({
	name: "g.sample.DataGridListCardsCircleImageItem",
	kind: DataGridListCardsImageItem,
	classes: "g-sample-gridlistcards-circle-imageitem"
});

var DataGridListCardsCircleItem = kind({
	name: "g.sample.DataGridListCardsCircleItem",
	kind: DataGridListCardsCircleImageItem,
	mixins: [SelectionOverlaySupport],
	selectionScrimIcon: {
		"w320": "garnet/images/320/badge_check.png",
		"w360": "garnet/images/360/badge_check.png"
	},
	selectionOverlayVerticalOffset: 0,
	selectionOverlayHorizontalOffset: 0,
	bindings: [
		{from: ".model.text", to: ".caption"},
		{from: ".model.url", to: ".source"}
	]
});

var DataGridListCardsPanel = kind({
	name: "g.sample.DataGridListCardsPanel",
	kind: Panel,
	title: true,
	titleContent: "Title",
	knob: true,
	classes: "g-layout-absolute-wrapper",
	style: "width: " + ri.scale(320) + "px; height: " + ri.scale(320) + "px; background-color: #000000;",
	components: [
		{
			name: "list",
			kind: DataGridList,
			controlsPerPage: 3,
			selection: true,
			multipleSelection: false,
			spacing: 0,
			minHeight: ri.scale(232),
			minWidth: ri.scale(212),
			scrollerOptions: {maxHeight: ri.scale(370) + "px"},
			style: "width: " + ri.scale(212) + "px; height: " + ri.scale(320) + "px; padding-top: " + ri.scale(6) + "px; margin: auto; background-color: #000000;",
			components: [
				{kind: DataGridListCardsItem}
			]
		}
	],
	bindings: [
		{from: ".collection", to: ".$.list.collection"}
	]
});

var DataGridListCardsCirclePanel = kind({
	name: "g.sample.DataGridListCardsCirclePanel",
	kind: Panel,
	title: true,
	titleContent: "Title",
	knob: true,
	classes: "g-layout-absolute-wrapper",
	style: "width: " + ri.scale(320) + "px; height: " + ri.scale(320) + "px; background-color: #000000;",
	components: [
		{
			name: "list",
			kind: DataGridList,
			controlsPerPage: 3,
			selection: true,
			multipleSelection: false,
			spacing: 0,
			minHeight: ri.scale(252),
			minWidth: ri.scale(212),
			scrollerOptions: {maxHeight: ri.scale(370) + "px"},
			style: "width: " + ri.scale(212) + "px; height: " + ri.scale(320) + "px; padding-top: " + ri.scale(6) + "px; margin: auto; background-color: #000000;",
			components: [
				{kind: DataGridListCardsCircleItem}
			]
		}
	],
	bindings: [
		{from: ".collection", to: ".$.list.collection"}
	]
});

module.exports = kind({
	name: "g.sample.DataGridListwithCardsSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Data Grid List with Cards Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Data Grid List with Cards", classes: "g-sample-subheader"},
		{name: "gridList", kind: DataGridListCardsPanel, style: "position: relative; display: inline-block; margin-right: " + ri.scale(10) + "px"},
		{name: "gridListCircle", kind: DataGridListCardsCirclePanel, style: "position: relative; display: inline-block;"}
	],
	bindings: [
		{from: ".collection", to: ".$.gridList.collection"},
		{from: ".collection", to: ".$.gridListCircle.collection"}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.set("collection", new Collection(this.generateRecords()));
		};
	}),
	generateRecords: function () {
		var records	= [],
			idx     = this.index || 0;
		for (; records.length < 500; ++idx) {
			var title = (idx % 8 === 0) ? " with long title" : "";
			records.push({
				text: "Item " + idx + title,
				url: {
					"w320": "@../assets/320/photocard.png",
					"w360": "@../assets/360/photocard.png"
				}
			});
		}
		// update our internal index so it will always generate unique values
		this.index = idx;
		return records;
	},
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
