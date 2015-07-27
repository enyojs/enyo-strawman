var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	ri = require('enyo/resolution'),
	Collection = require('enyo/Collection.js'),
	Image = require('enyo/Image'),

	g = require('garnet'),
	DataList = require('garnet/DataList'),
	Panel = require('garnet/Panel');

kind({
	name: "g.sample.DataListCardsPanel",
	kind: Panel,
	knob: true,
	classes: "g-layout-absolute-wrapper",
	components: [
		{
			name: "list",
			kind: DataList,
			controlsPerPage: 2,
			cards: true,
			style: "background-color: #000000;",
			components: [
				{ontap: "showPopup", components: [
					{name: "listItem", classes: "g-sample-datalistcards-item", components: [
						{name: "iconUrl", kind: Image, style: "width: " + ri.scale(320) + "px; height: " + ri.scale(320) + "px;"}
					]}
				], bindings: [
					{from: ".model.iconUrl", to: ".$.iconUrl.src"}
				]}
			]
		}
	],
	bindings: [
		{from: ".collection", to: ".$.list.collection"}
	]
});

kind({
	name: "g.sample.DataListSmallCardsPanel",
	kind: Panel,
	knob: true,
	classes: "g-layout-absolute-wrapper",
	components: [
		{
			name: "list",
			kind: DataList,
			controlsPerPage: 2,
			cards: true,
			itemHeight: ri.scale(216),
			style: "height: " + ri.scale(320) + "px; width: " + ri.scale(240) + "px; margin-left: " + ri.scale(40) + "px;",
			headerComponents: [
				{style: "height: " + ri.scale(70) + "px;"}
			],
			footerComponents: [
				{style: "height: " + ri.scale(34) + "px;"}
			],
			components: [
				{ontap: "showPopup", components: [
					{name: "listItem", classes: "g-sample-datalistsmallcards-item", components: [
						{name: "iconUrl", kind: Image},
						{classes: "g-sample-datalistsmallcards-title", content: "title"}
					]}
				], bindings: [
					{from: ".model.iconUrl", to: ".$.iconUrl.src"}
				]}
			]
		}
	],
	bindings: [
		{from: ".collection", to: ".$.list.collection"}
	]
});

module.exports = kind({
	name: "g.sample.DataListwithCardsSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Data List with Cards Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Data List with Cards", classes: "g-sample-subheader"},
		{name: "listPanel", kind: "g.sample.DataListCardsPanel", style: "position: relative; display: inline-block;"},
		{name: "listPanel2", kind: "g.sample.DataListSmallCardsPanel", style: "border-radius: 100%; position: relative; display: inline-block; margin-left: " + ri.scale(10) + "px;"}
	],
	bindings: [
		{from: ".collection", to: ".$.listPanel.collection"},
		{from: ".collection", to: ".$.listPanel2.collection"}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new Collection(this.data);
		};
	}),
	goBack: function(inSender, inEvent) {
		global.location.href = "./index.html?Garnet"; // global.history.go(-1);
		return false;
	},
	data: [
		{iconUrl: "@../assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"}
	]
});
