require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Button = require('enyo/Button'),
	Collection = require('enyo/Collection');

var
	Item = require('garnet/Item'),
	Scroller = require('garnet/Scroller'),
	PanelManager = require('garnet/PanelManager');

var
	SampleDataListPanel = require('./DataListSample').DataListPanel;

var
	panelStyle = 'width: ' + ri.scale(320) + 'px; height: ' + ri.scale(320) + 'px; position: relative; display: inline-block; margin: ' + ri.scale(20) + 'px',
	buttonStyle = 'margin: ' + ri.scale(30) + 'px ' + ri.scale(10) + 'px;';

module.exports = kind({
	name: 'g.sample.PanelManagerSample',
	horizontal: 'hidden',
	classes: 'enyo-unselectable enyo-fit garnet g-sample',
	kind: Scroller,
	components: [
		{content: '< PanelManager Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Fixed + Push Floating', classes: 'g-sample-subheader'},
		{style: panelStyle, components: [
			{name: 'fixedFloating', kind: PanelManager, classes: 'enyo-fit', pageIndicator: true, components: [
				{name: 'fixedFloatingList', kind: SampleDataListPanel, title: true, titleContent: 'Fixed Floating', commandBarComponents: [
					{src: '@../assets/btn_share.svg', ontap: 'handleShareTapped'}
				]},
				{components: [
					{kind: Scroller, classes: 'enyo-fit', components: [
						{kind: Button, content: 'Push Another Panel', style: buttonStyle, ontap: 'handlePushTapped'}
					]}
				]}
			]}
		]}
	],
	bindings: [
		{from: 'collection', to: '$.fixedFloatingList.collection'}
	],
	handleShareTapped: function (sender, event) {
		this.$.fixedFloating.pushFloatingPanel({
			name: 'share',
			owner: this,
			components: [
				{kind: Item, content: 'Facebook', ontap: 'handleMethodTapped'},
				{kind: Item, content: 'Twitter', ontap: 'handleMethodTapped'},
				{kind: Item, content: 'Email', ontap: 'handleMethodTapped'},
				{kind: Item, content: 'More ... (Replace View)', ontap: 'handleMoreTapped'}
			]
		});
	},
	handleMethodTapped: function (sender, event) {
		this.$.fixedFloating.pushFloatingPanel({
			name: 'method',
			owner: this,
			components: [
				{content: 'Enter message here ...'}
			]
		});
	},
	handleMoreTapped: function (sender, event) {
		this.$.fixedFloating.replaceFloatingPanel({
			name: 'more',
			owner: this,
			components: [
				{kind: Item, content: 'LinkedIn', ontap: 'handleMethodTapped'},
				{kind: Item, content: 'Instagram', ontap: 'handleMethodTapped'},
				{kind: Item, content: 'Friendster', ontap: 'handleMethodTapped'},
				{kind: Item, content: 'MySpace', ontap: 'handleMethodTapped'}
			]
		});
	},
	handlePushTapped: function (sender, event) {
		var panel = this.$.fixedFloating.createComponent({
			owner: this,
			components: [
				{kind: Scroller, classes: 'enyo-fit', components: [
					{kind: Button, content: 'Remove This Panel', style: buttonStyle, ontap: 'handleRemoveTapped'}
				]}
			]
		});
		this.$.fixedFloating.activate(panel.name);
	},
	handleRemoveTapped: function (sender, event) {
		// This decoupling of the tap on the button and removal is only required because the view
		// to be removed was active so we transition it off, flag it for removal, and then remove it
		// in the deactivated handler.
		this.$.fixedFloating.previous();
		this.$.fixedFloating.getClientControls().forEach(function (view) {
			if (event.originator.isDescendantOf(view)) {
				this.removedView = view;
			}
		}, this);
	},
	handleViewDeactivate: function (sender, name, event) {
		if (this.removedView == event.view) {
			this.removedView.destroy();
			this.removedView = null;
		}
	},
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.set('collection', new Collection(this.generateRecords()));
			this.$.fixedFloating.on('deactivated', this.handleViewDeactivate, this);
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
