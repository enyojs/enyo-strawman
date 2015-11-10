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
	name: 'g.sample.PanelSetPanelSample',
	horizontal: 'hidden',
	classes: 'enyo-unselectable garnet g-sample',
	kind: Scroller,
	components: [
		{content: '< PanelSet with transform effects Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'depth-transition PanelSet', classes: 'g-sample-subheader'},
		{
			style: 'width: ' + ri.scale(320) + 'px; height: ' + ri.scale(320) + 'px; position: relative; display: inline-block; margin-right: 20px;',
			components: [
				{
					kind: PanelSet,
					components: [
						{kind: Panel, components: [
							{name: 'panelA1-1', kind: SampleDataListPanel, title: true, titleContent: '1-1'}
						]},
						{name: 'panelA2', kind: SampleDataListPanel, title: true, titleContent: '2'},
						{name: 'panelA3', kind: SampleDataListPanel, title: true, titleContent: '3'}
					]
				}
			]
		},
		{
			style: 'width: ' + ri.scale(320) + 'px; height: ' + ri.scale(320) + 'px; position: relative; display: inline-block; margin-right: 20px;',
			components: [
				{
					kind: Panel,
					components: [
						{kind: PanelSet, components: [
							{name: 'panelB1-1', kind: SampleDataListPanel, title: true, titleContent: '1-1'},
							{name: 'panelB1-2', kind: SampleDataListPanel, title: true, titleContent: '1-2'},
							{name: 'panelB1-3', kind: SampleDataListPanel, title: true, titleContent: '1-3'}
						]}
					]
				}
			]
		},
		{
			style: 'width: ' + ri.scale(320) + 'px; height: ' + ri.scale(320) + 'px; position: relative; display: inline-block; margin-right: 20px;',
			components: [
				{
					kind: Panel,
					components: [
						{kind: Panel, components: [
							{kind: PanelSet, components: [
								{name: 'panelC1-1', kind: SampleDataListPanel, title: true, titleContent: '1-1'},
								{name: 'panelC1-2', kind: SampleDataListPanel, title: true, titleContent: '1-2'},
								{name: 'panelC1-3', kind: SampleDataListPanel, title: true, titleContent: '1-3'}
							]}
						]}
					]
				}
			]
		},
		{content: ': PanelSet-Panel-Panel / Panel-PanelSet-Panel / Panel-Panel-PanelSet ', classes: 'g-sample-description'},

		{content: 'move-transition PanelSet', classes: 'g-sample-subheader'},
		{
			style: 'width: ' + ri.scale(320) + 'px; height: ' + ri.scale(320) + 'px; position: relative; display: inline-block; margin-right: 20px;',
			components: [
				{
					kind: PanelSet,
					effect: 'move-transition',
					pageIndicator: true,
					components: [
						{kind: Panel, pageIndicatorFadeOut: false, components: [
							{name: 'panelD1-1', kind: SampleDataListPanel, title: true, titleContent: '1-1'}
						]},
						{name: 'panelD2', kind: SampleDataListPanel, title: true, titleContent: '2'},
						{name: 'panelD3', kind: SampleDataListPanel, title: true, titleContent: '3'}
					]
				}
			]
		},
		{
			style: 'width: ' + ri.scale(320) + 'px; height: ' + ri.scale(320) + 'px; position: relative; display: inline-block; margin-right: 20px;',
			components: [
				{
					kind: Panel,
					components: [
						{kind: PanelSet, effect: 'move-transition', pageIndicator: true, components: [
							{name: 'panelE1-1', kind: SampleDataListPanel, title: true, titleContent: '1-1'},
							{name: 'panelE1-2', kind: SampleDataListPanel, title: true, titleContent: '1-2'},
							{name: 'panelE1-3', kind: SampleDataListPanel, title: true, titleContent: '1-3'}
						]}
					]
				}
			]
		},
		{
			style: 'width: ' + ri.scale(320) + 'px; height: ' + ri.scale(320) + 'px; position: relative; display: inline-block; margin-right: 20px;',
			components: [
				{
					kind: Panel,
					components: [
						{kind: Panel, components: [
							{kind: PanelSet, effect: 'move-transition', pageIndicator: true, components: [
								{name: 'panelF1-1', kind: SampleDataListPanel, title: true, titleContent: '1-1'},
								{name: 'panelF1-2', kind: SampleDataListPanel, title: true, titleContent: '1-2'},
								{name: 'panelF1-3', kind: SampleDataListPanel, title: true, titleContent: '1-3'}
							]}
						]}
					]
				}
			]
		},
		{content: ': PanelSet-Panel-Panel / Panel-PanelSet-Panel / Panel-Panel-PanelSet ', classes: 'g-sample-description'}
	],
	previousTap: function(inSender, inEvent) {
		var namePrefix = inSender.name.substr(0,9);
		switch(namePrefix) {
		case 'previousA':
			this.$.panelSetA.previous();
			break;
		case 'previousB':
			this.$.panelSetB.previous();
			break;
		case 'previousC':
			this.$.panelSetC.previous();
			break;
		}
	},
	nextTap: function(inSender, inEvent) {
		var namePrefix = inSender.name.substr(0,5);
		switch(namePrefix) {
		case 'nextA':
			this.$.panelSetA.next();
			break;
		case 'nextB':
			this.$.panelSetB.next();
			break;
		case 'nextC':
			this.$.panelSetC.next();
			break;
		}
	},
	bindings: [
		{from: '.collection', to: '.$.panelA1-1.collection'},
		{from: '.collection', to: '.$.panelA2.collection'},
		{from: '.collection', to: '.$.panelA3.collection'},
		{from: '.collection', to: '.$.panelB1-1.collection'},
		{from: '.collection', to: '.$.panelB1-2.collection'},
		{from: '.collection', to: '.$.panelB1-3.collection'},
		{from: '.collection', to: '.$.panelC1-1.collection'},
		{from: '.collection', to: '.$.panelC1-2.collection'},
		{from: '.collection', to: '.$.panelC1-3.collection'},
		{from: '.collection', to: '.$.panelD1-1.collection'},
		{from: '.collection', to: '.$.panelD2.collection'},
		{from: '.collection', to: '.$.panelD3.collection'},
		{from: '.collection', to: '.$.panelE1-1.collection'},
		{from: '.collection', to: '.$.panelE1-2.collection'},
		{from: '.collection', to: '.$.panelE1-3.collection'},
		{from: '.collection', to: '.$.panelF1-1.collection'},
		{from: '.collection', to: '.$.panelF1-2.collection'},
		{from: '.collection', to: '.$.panelF1-3.collection'}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.set('collection', new Collection(this.generateRecords()));
		};
	}),
	generateRecords: function () {
		var records = [],
			idx = 0,
			title = ['Alejandra', 'Marquez', 'Barr', 'Everett', 'Crane', 'Raymond', 'Petersen', 'Kristina', 'Barbra', 'Tracey'],
			genre = ['Rock', 'Pop', 'Hiphop', 'Rock', 'Ballad'];

		for (; records.length < 500; ++idx) {
			records.push({
				iconUrl: '@../assets/ic_dialog_alert.svg',
				albumTitle: title[idx % title.length] + ((idx % 8 === 0) ? ' with long title' : ''),
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
