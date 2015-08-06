var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	dom = require('enyo/dom.js'),
	ri = require('enyo/resolution'),
	Collection = require('enyo/Collection.js'),
	ToolDecorator = require('enyo/ToolDecorator'),

	g = require('garnet'),
	g_ri = require('garnet/resolution'),
	Item = require('garnet/Item'),
	Icon = require('garnet/Icon'),
	DataList = require('garnet/DataList'),
	Checkbox = require('garnet/Checkbox'),
	Button = require('garnet/Button'),
	IconMenuPopup = require('garnet/IconMenuPopup'),
	Panel = require('garnet/Panel');

kind({
	name: "g.DataListSampleItem",
	kind: Item,
	classes: "g-sample-datalist-item",
	handlers: {
		onItemDown: "itemDown"
	},
	published: {
		selected: false
	},
	components: [
		{name: "iconUrl", kind: Icon, classes: "g-sample-datalist-item-icon"},
		{name: "albumTitle", classes: "g-sample-datalist-item-title"},
		{name: "albumGenre", classes: "g-sample-datalist-item-genre"},
		{tag: "hr", style: "border: 0; color: #202328; height: " + ri.scale(1) + "px; background-color: #202328; bottom: 0;"}
	],
	bindings: [
		{from: ".model.iconUrl", to: ".$.iconUrl.src"},
		{from: ".model.albumTitle", to: ".$.albumTitle.content"},
		{from: ".model.albumGenre", to: ".$.albumGenre.content"},
		{from: ".model.disabled", to: ".disabled"}
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
	},
	itemDown: function(inSender, inEvent) {
	}
});

kind({
	name: "g.sample.DataListPanel",
	kind: Panel,
	title: true,
	titleContent: "Title",
	knob: true,
	components: [
		{
			name: "list",
			kind: DataList,
			controlsPerPage: 4,
			style: "background-color: #000000;",
			headerComponents: [
				{style: "height: " + ri.scale(60) + "px;"},
				{kind: ToolDecorator, style: "width: " + ri.scale(320) + "px; height: " + ri.scale(71) + "px; border-bottom: " + ri.scale(1) + "px solid #202328; ", ontap: "preventSound", components: [
					{content: "Activated", style: "width: " + ri.scale(151) + "px; padding: 0 " + ri.scale(5) + "px 0 " + ri.scale(58) + "px; line-height: " + ri.scale(71) + "px;"},
					{kind: Checkbox, style: "width: " + ri.scale(48) + "px;"}
				]}
			],
			components: [
				{kind: "g.DataListSampleItem", onlongpress: "showPopup"}
			],
			footerComponents: [
				{kind: Button, content: "Text", style: "width: " + ri.scale(122) + "px; height: " + ri.scale(52) + "px; margin: " + ri.scale(21) + "px " + ri.scale(99) +"px " + ri.scale(21) +"px;"}
			]
		},
		{
			name: "popup",
			kind: IconMenuPopup,
			buttonComponents: [
				{
					name: "First button2",
					ontap: "hidePopup",
					src: "@../assets/btn_delete.svg"
				},
				{
					name: "Second button2",
					ontap: "hidePopup",
					src: "@../assets/btn_share.svg"
				},
				{
					name: "Third button2",
					ontap: "hidePopup",
					src: "@../assets/btn_delete.svg"
				},
				{
					name: "Firth button2",
					ontap: "hidePopup",
					src: "@../assets/btn_share.svg"
				}
			]
		}
	],
	preventSound: function(inSender, inEvent) {
		inEvent.preventSound = true;
	},
	showPopup: function(inSender, inEvent) {
		this.$.popup.show();
	},
	bindings: [
		{from: ".collection", to: ".$.list.collection"}
	]
});

module.exports = kind({
	name: "g.sample.DataListSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Data List Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Data List", classes: "g-sample-subheader"},
		{name: "listPanel", kind: "g.sample.DataListPanel", style: "position: relative;"}
	],
	bindings: [
		{from: ".collection", to: ".$.listPanel.collection"}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new Collection(this.data);
		};
	}),
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	},
	data: [
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Looooooooooooong Title", albumGenre: "Rock", disabled: true},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Looooooooooooong Title", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Looooooooooooong Title", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Looooooooooooong Title", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "@../assets/ic_dialog_alert.svg", albumTitle: "Looooooooooooong Title", albumGenre: "Hiphop"},
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
