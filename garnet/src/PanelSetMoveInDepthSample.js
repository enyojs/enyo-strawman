 require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Collection = require('enyo/Collection.js'),
	Scroller = require('garnet/Scroller'),
	Panel = require('garnet/Panel'),
	PanelSet = require('garnet/PanelSet'),

	SampleDataListPanel = require('./DataListSample').DataListPanel;

module.exports = kind({
	name: "g.sample.PanelSetMoveInDepthSample",
	horizontal: "hidden",
	classes: "enyo-unselectable garnet g-sample",
	kind: Scroller,
	components: [
		{content: "< PanelSet with transform effects Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "move-transition PanelSet in depth-transition PanelSet", classes: "g-sample-subheader"},
		{
			style: "width: " + ri.scale(320) + "px; height: " + ri.scale(320) + "px; position: relative; display: inline-block; margin-right: " + ri.scale(20) + "px;",
			components: [
				{
					name: "panelSetA",
					kind: PanelSet,
					components: [
						{kind: PanelSet, pageIndicator: true, effect: "move-transition", components: [
							{name: "panelA1-1", kind: SampleDataListPanel, title: true, titleContent: "1-1", commandBarComponents: [
								{name: "previousA1-1", src: "@../assets/btn_command_previous.svg", disabled: true, ontap: "previousTap"},
								{name: "nextA1-1", src: "@../assets/btn_command_next.svg", ontap: "nextTap"}
							]},
							{name: "panelA1-2", kind: SampleDataListPanel, title: true, titleContent: "1-2", commandBarComponents: [
								{name: "previousA1-2", src: "@../assets/btn_command_previous.svg", disabled: true, ontap: "previousTap"},
								{name: "nextA1-2", src: "@../assets/btn_command_next.svg", ontap: "nextTap"}
							]},
							{name: "panelA1-3", kind: SampleDataListPanel, title: true, titleContent: "1-3", commandBarComponents: [
								{name: "previousA1-3", src: "@../assets/btn_command_previous.svg", disabled: true, ontap: "previousTap"},
								{name: "nextA1-3", src: "@../assets/btn_command_next.svg", ontap: "nextTap"}
							]}
						]},
						{kind: PanelSet, pageIndicator: true, effect: "move-transition", components: [
							{name: "panelA2-1", kind: SampleDataListPanel, title: true, titleContent: "2-1", commandBarComponents: [
								{name: "previousA2-1", src: "@../assets/btn_command_previous.svg", ontap: "previousTap"},
								{name: "nextA2-1", src: "@../assets/btn_command_next.svg", ontap: "nextTap"}
							]},
							{name: "panelA2-2", kind: SampleDataListPanel, title: true, titleContent: "2-2", commandBarComponents: [
								{name: "previousA2-2", src: "@../assets/btn_command_previous.svg", ontap: "previousTap"},
								{name: "nextA2-2", src: "@../assets/btn_command_next.svg", ontap: "nextTap"}
							]},
							{name: "panelA2-3", kind: SampleDataListPanel, title: true, titleContent: "2-3", commandBarComponents: [
								{name: "previousA2-3", src: "@../assets/btn_command_previous.svg", ontap: "previousTap"},
								{name: "nextA2-3", src: "@../assets/btn_command_next.svg", ontap: "nextTap"}
							]}
						]},
						{kind: PanelSet, pageIndicator: true, effect: "move-transition", components: [
							{name: "panelA3-1", kind: SampleDataListPanel, title: true, titleContent: "3-1", commandBarComponents: [
								{name: "previousA3-1", src: "@../assets/btn_command_previous.svg", ontap: "previousTap"},
								{name: "nextA3-1", src: "@../assets/btn_command_next.svg", disabled: true, ontap: "nextTap"}
							]},
							{name: "panelA3-2", kind: SampleDataListPanel, title: true, titleContent: "3-2", commandBarComponents: [
								{name: "previousA3-2", src: "@../assets/btn_command_previous.svg", ontap: "previousTap"},
								{name: "nextA3-2", src: "@../assets/btn_command_next.svg", disabled: true, ontap: "nextTap"}
							]},
							{name: "panelA3-3", kind: SampleDataListPanel, title: true, titleContent: "3-3", commandBarComponents: [
								{name: "previousA3-3", src: "@../assets/btn_command_previous.svg", ontap: "previousTap"},
								{name: "nextA3-3", src: "@../assets/btn_command_next.svg", disabled: true, ontap: "nextTap"}
							]}
						]}
					]
				}
			]
		},
		{
			style: "width: " + ri.scale(320) + "px; height: " + ri.scale(320) + "px; position: relative; display: inline-block; margin-right: " + ri.scale(20) + "px;",
			components: [
				{
					name: "panelSetB",
					kind: PanelSet,
					components: [
						{kind: Panel, components: [
							{kind: PanelSet, pageIndicator: true, effect: "move-transition", components: [
								{name: "panelB1-1", kind: SampleDataListPanel, title: true, titleContent: "1-1", commandBarComponents: [
									{name: "previousB1-1", src: "@../assets/btn_command_previous.svg", disabled: true, ontap: "previousTap"},
									{name: "nextB1-1", src: "@../assets/btn_command_next.svg", ontap: "nextTap"}
								]},
								{name: "panelB1-2", kind: SampleDataListPanel, title: true, titleContent: "1-2", commandBarComponents: [
									{name: "previousB1-2", src: "@../assets/btn_command_previous.svg", disabled: true, ontap: "previousTap"},
									{name: "nextB1-2", src: "@../assets/btn_command_next.svg", ontap: "nextTap"}
								]},
								{name: "panelB1-3", kind: SampleDataListPanel, title: true, titleContent: "1-3", commandBarComponents: [
									{name: "previousB1-3", src: "@../assets/btn_command_previous.svg", disabled: true, ontap: "previousTap"},
									{name: "nextB1-3", src: "@../assets/btn_command_next.svg", ontap: "nextTap"}
								]}
							]}
						]},
						{king: Panel, components: [
							{kind: PanelSet, pageIndicator: true, effect: "move-transition", components: [
								{name: "panelB2-1", kind: SampleDataListPanel, title: true, titleContent: "2-1", commandBarComponents: [
									{name: "previousB2-1", src: "@../assets/btn_command_previous.svg", ontap: "previousTap"},
									{name: "nextB2-1", src: "@../assets/btn_command_next.svg", ontap: "nextTap"}
								]},
								{name: "panelB2-2", kind: SampleDataListPanel, title: true, titleContent: "2-2", commandBarComponents: [
									{name: "previousB2-2", src: "@../assets/btn_command_previous.svg", ontap: "previousTap"},
									{name: "nextB2-2", src: "@../assets/btn_command_next.svg", ontap: "nextTap"}
								]},
								{name: "panelB2-3", kind: SampleDataListPanel, title: true, titleContent: "2-3", commandBarComponents: [
									{name: "previousB2-3", src: "@../assets/btn_command_previous.svg", ontap: "previousTap"},
									{name: "nextB2-3", src: "@../assets/btn_command_next.svg", ontap: "nextTap"}
								]}
							]}
						]},
						{king: Panel, components: [
							{kind: PanelSet, pageIndicator: true, effect: "move-transition", components: [
								{name: "panelB3-1", kind: SampleDataListPanel, title: true, titleContent: "3-1", commandBarComponents: [
									{name: "previousB3-1", src: "@../assets/btn_command_previous.svg", ontap: "previousTap"},
									{name: "nextB3-1", src: "@../assets/btn_command_next.svg", disabled: true, ontap: "nextTap"}
								]},
								{name: "panelB3-2", kind: SampleDataListPanel, title: true, titleContent: "3-2", commandBarComponents: [
									{name: "previousB3-2", src: "@../assets/btn_command_previous.svg", ontap: "previousTap"},
									{name: "nextB3-2", src: "@../assets/btn_command_next.svg", disabled: true, ontap: "nextTap"}
								]},
								{name: "panelB3-3", kind: SampleDataListPanel, title: true, titleContent: "3-3", commandBarComponents: [
									{name: "previousB3-3", src: "@../assets/btn_command_previous.svg", ontap: "previousTap"},
									{name: "nextB3-3", src: "@../assets/btn_command_next.svg", disabled: true, ontap: "nextTap"}
								]}
							]}
						]}
					]
				}
			]
		},
		{
			style: "width: " + ri.scale(320) + "px; height: " + ri.scale(320) + "px; position: relative; display: inline-block; margin-right: " + ri.scale(20) + "px;",
			components: [
				{
					kind: Panel,
					components: [
						{name: "panelSetC", kind: PanelSet, components: [
							{kind: PanelSet, pageIndicator: true, effect: "move-transition", components: [
								{name: "panelC1-1", kind: SampleDataListPanel, title: true, titleContent: "1-1", commandBarComponents: [
									{name: "previousC1-1", src: "@../assets/btn_command_previous.svg", disabled: true, ontap: "previousTap"},
									{name: "nextC1-1", src: "@../assets/btn_command_next.svg", ontap: "nextTap"}
								]},
								{name: "panelC1-2", kind: SampleDataListPanel, title: true, titleContent: "1-2", commandBarComponents: [
									{name: "previousC1-2", src: "@../assets/btn_command_previous.svg", disabled: true, ontap: "previousTap"},
									{name: "nextC1-2", src: "@../assets/btn_command_next.svg", ontap: "nextTap"}
								]},
								{name: "panelC1-3", kind: SampleDataListPanel, title: true, titleContent: "1-3", commandBarComponents: [
									{name: "previousC1-3", src: "@../assets/btn_command_previous.svg", disabled: true, ontap: "previousTap"},
									{name: "nextC1-3", src: "@../assets/btn_command_next.svg", ontap: "nextTap"}
								]}
							]},
							{kind: PanelSet, pageIndicator: true, effect: "move-transition", components: [
								{name: "panelC2-1", kind: SampleDataListPanel, title: true, titleContent: "2-1", commandBarComponents: [
									{name: "previousC2-1", src: "@../assets/btn_command_previous.svg", ontap: "previousTap"},
									{name: "nextC2-1", src: "@../assets/btn_command_next.svg", ontap: "nextTap"}
								]},
								{name: "panelC2-2", kind: SampleDataListPanel, title: true, titleContent: "2-2", commandBarComponents: [
									{name: "previousC2-2", src: "@../assets/btn_command_previous.svg", ontap: "previousTap"},
									{name: "nextC2-2", src: "@../assets/btn_command_next.svg", ontap: "nextTap"}
								]},
								{name: "panelC2-3", kind: SampleDataListPanel, title: true, titleContent: "2-3", commandBarComponents: [
									{name: "previousC2-3", src: "@../assets/btn_command_previous.svg", ontap: "previousTap"},
									{name: "nextC2-3", src: "@../assets/btn_command_next.svg", ontap: "nextTap"}
								]}
							]},
							{kind: PanelSet, pageIndicator: true, effect: "move-transition", components: [
								{name: "panelC3-1", kind: SampleDataListPanel, title: true, titleContent: "3-1", commandBarComponents: [
									{name: "previousC3-1", src: "@../assets/btn_command_previous.svg", ontap: "previousTap"},
									{name: "nextC3-1", src: "@../assets/btn_command_next.svg", disabled: true, ontap: "nextTap"}
								]},
								{name: "panelC3-2", kind: SampleDataListPanel, title: true, titleContent: "3-2", commandBarComponents: [
									{name: "previousC3-2", src: "@../assets/btn_command_previous.svg", ontap: "previousTap"},
									{name: "nextC3-2", src: "@../assets/btn_command_next.svg", disabled: true, ontap: "nextTap"}
								]},
								{name: "panelC3-3", kind: SampleDataListPanel, title: true, titleContent: "3-3", commandBarComponents: [
									{name: "previousC3-3", src: "@../assets/btn_command_previous.svg", ontap: "previousTap"},
									{name: "nextC3-3", src: "@../assets/btn_command_next.svg", disabled: true, ontap: "nextTap"}
								]}
							]}
						]}
					]
				}
			]
		},
		{content: ": PanelSet-PanelSet-Panel / PanelSet-Panel-PanelSet / Panel-PanelSet-PanelSet ", classes: "g-sample-description"}
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
		{from: ".collection", to: ".$.panelA1-2.collection"},
		{from: ".collection", to: ".$.panelA1-3.collection"},
		{from: ".collection", to: ".$.panelA2-1.collection"},
		{from: ".collection", to: ".$.panelA2-2.collection"},
		{from: ".collection", to: ".$.panelA2-3.collection"},
		{from: ".collection", to: ".$.panelA3-1.collection"},
		{from: ".collection", to: ".$.panelA3-2.collection"},
		{from: ".collection", to: ".$.panelA3-3.collection"},
		{from: ".collection", to: ".$.panelB1-1.collection"},
		{from: ".collection", to: ".$.panelB1-2.collection"},
		{from: ".collection", to: ".$.panelB1-3.collection"},
		{from: ".collection", to: ".$.panelB2-1.collection"},
		{from: ".collection", to: ".$.panelB2-2.collection"},
		{from: ".collection", to: ".$.panelB2-3.collection"},
		{from: ".collection", to: ".$.panelB3-1.collection"},
		{from: ".collection", to: ".$.panelB3-2.collection"},
		{from: ".collection", to: ".$.panelB3-3.collection"},
		{from: ".collection", to: ".$.panelC1-1.collection"},
		{from: ".collection", to: ".$.panelC1-2.collection"},
		{from: ".collection", to: ".$.panelC1-3.collection"},
		{from: ".collection", to: ".$.panelC2-1.collection"},
		{from: ".collection", to: ".$.panelC2-2.collection"},
		{from: ".collection", to: ".$.panelC2-3.collection"},
		{from: ".collection", to: ".$.panelC3-1.collection"},
		{from: ".collection", to: ".$.panelC3-2.collection"},
		{from: ".collection", to: ".$.panelC3-3.collection"}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.set("collection", new Collection(this.generateRecords()));
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
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
