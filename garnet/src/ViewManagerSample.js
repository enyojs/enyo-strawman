require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Collection = require('enyo/Collection');

var
	Item = require('garnet/Item'),
	Panel = require('garnet/Panel'),
	Scroller = require('garnet/Scroller'),
	ViewManager = require('garnet/ViewManager');

var
	SampleDataListPanel = require('./DataListSample').DataListPanel;

var panelStyle = 'width: ' + ri.scale(320) + 'px; height: ' + ri.scale(320) + 'px; position: relative; display: inline-block; margin: ' + ri.scale(20) + 'px';

module.exports = kind({
	name: 'g.sample.ViewManagerSample',
	horizontal: 'hidden',
	classes: 'enyo-unselectable enyo-fit garnet g-sample',
	kind: Scroller,
	components: [
		{content: '< ViewManager Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Fixed + Push Floating', classes: 'g-sample-subheader'},
		{style: panelStyle, components: [
			{name: 'fixedFloating', kind: ViewManager, classes: 'enyo-fit', pageIndicator: true, components: [
				{name: 'fixedFloatingList', kind: SampleDataListPanel, title: true, titleContent: 'Fixed Floating', commandBarComponents: [
					{src: '@../assets/btn_share.svg', ontap: 'handleShareTapped'}
				]},
				{kind: Panel, components: [
					{content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et ut, veritatis voluptas quibusdam alias consequatur incidunt distinctio dolores quos! Unde architecto fugit nam culpa, eum quaerat neque consectetur, ad nesciunt.'}
				]},
				{kind: Panel, components: [
					{content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et ut, veritatis voluptas quibusdam alias consequatur incidunt distinctio dolores quos! Unde architecto fugit nam culpa, eum quaerat neque consectetur, ad nesciunt.'}
				]},
				{kind: Panel, components: [
					{content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et ut, veritatis voluptas quibusdam alias consequatur incidunt distinctio dolores quos! Unde architecto fugit nam culpa, eum quaerat neque consectetur, ad nesciunt.'}
				]}
			]}
		]}
	],
	bindings: [
		{from: 'collection', to: '$.fixedFloatingList.collection'}
	],
	handleShareTapped: function (sender, event) {
		this.$.fixedFloating.pushFloatingView({
			name: 'share',
			kind: Panel,
			owner: this,
			components: [
				{kind: Item, content: 'Facebook', ontap: 'handleMethodTapped'},
				{kind: Item, content: 'Twitter', ontap: 'handleMethodTapped'},
				{kind: Item, content: 'Email', ontap: 'handleMethodTapped'}
			]
		});
	},
	handleMethodTapped: function (sender, event) {
		this.$.fixedFloating.replaceFloatingView({
			name: 'method',
			kind: Panel,
			owner: this,
			components: [
				{content: 'Enter message here ...'}
			]
		});
	},
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
