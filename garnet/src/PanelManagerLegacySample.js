require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Collection = require('enyo/Collection');

var
	Scroller = require('garnet/Scroller'),
	PanelManager = require('garnet/PanelManager');

var
	SampleDataListPanel = require('./DataListSample').DataListPanel;

var panelStyle = 'width: ' + ri.scale(320) + 'px; height: ' + ri.scale(320) + 'px; position: relative; display: inline-block; margin: ' + ri.scale(20) + 'px';

function commandBarComponents (prevName, nextName, prevDisabled, nextDisabled) {
	return [
		{name: prevName, src: '@../assets/btn_command_previous.svg', disabled: !!prevDisabled, ontap: 'previousTap'},
		{name: nextName, src: '@../assets/btn_command_next.svg', disabled: !!nextDisabled, ontap: 'nextTap'}
	];
}

function panelSet (letter, number, layoutCover, prevDisabled, nextDisabled) {
	var prefix = letter + number;
	return {components: [
		{name: 'vm' + prefix, kind: PanelManager, layoutCover: layoutCover, classes: 'enyo-fit', components: [
			{name: 'panel' + prefix + '-1', kind: SampleDataListPanel, title: true, titleContent: number + '-1', commandBarComponents: commandBarComponents('previous' + prefix + '-1', 'next' + prefix + '-1', prevDisabled, nextDisabled)},
			{name: 'panel' + prefix + '-2', kind: SampleDataListPanel, title: true, titleContent: number + '-2', commandBarComponents: commandBarComponents('previous' + prefix + '-2', 'next' + prefix + '-2', prevDisabled, nextDisabled)},
			{name: 'panel' + prefix + '-3', kind: SampleDataListPanel, title: true, titleContent: number + '-3', commandBarComponents: commandBarComponents('previous' + prefix + '-3', 'next' + prefix + '-3', prevDisabled, nextDisabled)}
		]}
	]};
}

function viewSample (letter, outerCover, innerCover) {
	return {
		style: panelStyle,
		components: [
			{name: 'panelSet' + letter, kind: PanelManager, classes: 'enyo-fit', draggable: false, layoutCover: outerCover, pageIndicator: true, components: [
				panelSet(letter, '1', innerCover, true),
				panelSet(letter, '2', innerCover),
				panelSet(letter, '3', innerCover, false, true)
			]}
		]
	};
}

module.exports = kind({
	name: 'g.sample.PanelManagerLegacySample',
	horizontal: 'hidden',
	classes: 'enyo-unselectable enyo-fit enyo-fit garnet g-sample',
	kind: Scroller,
	components: [
		{content: '< PanelManager (Legacy PanelSet port) Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Move in Move = fixed+slide > fixed+slide', classes: 'g-sample-subheader'},
		viewSample('A', false, false),

		{content: 'Move in Depth = fixed+cover > fixed+slide', classes: 'g-sample-subheader'},
		viewSample('B', true, false),

		{content: 'Depth in Depth = fixed+cover > fixed+cover', classes: 'g-sample-subheader'},
		viewSample('C', true, true),

		{content: 'Depth in Move = fixed+slide > fixed+cover', classes: 'g-sample-subheader'},
		viewSample('D', false, true)
	],
	previousTap: function(inSender, inEvent) {
		var namePrefix = inSender.name.substr(8,1),
			vm = this.$['panelSet' + namePrefix];
		if (vm) vm.previous();
	},
	nextTap: function(inSender, inEvent) {
		var namePrefix = inSender.name.substr(4,1),
			vm = this.$['panelSet' + namePrefix];
		if (vm) vm.next();
	},
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.set('collection', new Collection(this.generateRecords()));

			// build bindings for all the DataLists
			['A', 'B', 'C', 'D'].forEach(function (letter) {
				var i = -1;
				while (++i < 9) {
					this.binding({
						from: 'collection',
						to: '$.panel' + letter + Math.ceil((i+1)/3) + '-' + (i%3+1) + '.collection'
					});
				}
			}, this);
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
