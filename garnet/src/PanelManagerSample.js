require('garnet');

var
	kind = require('enyo/kind'),
	Collection = require('enyo/Collection'),
	Dom = require('enyo/dom');

var
	Button = require('garnet/Button'),
	Item = require('garnet/Item'),
	Scroller = require('garnet/Scroller'),
	PanelManager = require('garnet/PanelManager');

var SampleDataListPanel = require('./DataListSample').DataListPanel;

var List = kind({
	kind: SampleDataListPanel,
	handlers: {
		ondragstart: 'dragstart'
	},
	events: {
		onShare: ''
	},
	commandBarComponents: [
		{src: '@../assets/btn_share.svg', ontap: 'doShare'}
	],
	// Illustrating the 4 lifecycle methods that are invoked by garnet/PanelManager on this panel
	activate: function (event) {
		this.log('Activating the List', event.dragging ? 'during drag' : '');
	},
	deactivate: function (event) {
		this.log('Deactivating the List', event.dragging ? 'during drag' : '');
	},
	activated: function (event) {
		this.log('List has been activated');
		if (this.children[0].$.scroller) {
			this.children[0].changeItemLayer(true);
			Dom.transformValue(this.children[0].$.scroller.$.strategy.$.client, 'translateZ', '0');
		}
		if (this.$.commandBar) this.$.commandBar.addClass('g-command-bar-3d');
	},
	deactivated: function (event) {
		this.log('List has been deactivated');
	},
	dragstart: function(sender, event) {
		if ( !event.vertical  ) {
			if (this.children[0].$.scroller) {
				this.children[0].changeItemLayer(false);
				Dom.transformValue(this.children[0].$.scroller.$.strategy.$.client, 'translateZ', null);
			}
			if (this.$.commandBar) this.$.commandBar.removeClass('g-command-bar-3d');
		}
	},
});

module.exports = kind({
	name: 'g.sample.PanelManagerSample',
	horizontal: 'hidden',
	classes: 'enyo-unselectable enyo-fit enyo-fit garnet g-sample g-sample-panelmanager',
	kind: Scroller,
	components: [
		{content: '< PanelManager Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Fixed + Push Floating', classes: 'g-sample-subheader'},
		{classes: 'g-sample-panel', components: [
			{name: 'fixedFloating', kind: PanelManager, classes: 'enyo-fit', pageIndicator: true, components: [
				{name: 'fixedFloatingList', kind: List, onShare: 'handleShareTapped', accessibilityLabel: 'Panel0'},
				{components: [
					{kind: Scroller, classes: 'enyo-fit', components: [
						{kind: Button, content: 'Push Another Panel', classes: 'g-sample-button', ontap: 'handlePushTapped'}
					]}
				], accessibilityLabel: 'Panel1'}
			]}
		]}
	],
	bindings: [
		{from: 'collection', to: '$.fixedFloatingList.collection'}
	],
	handleShareTapped: function (sender, event) {
		this.$.fixedFloatingList.stopMarquee();
		this.$.fixedFloating.pushFloatingPanel({
			name: 'share',
			owner: this,
			accessibilityLabel: 'PanelShare',
			components: [
				{kind: Item, classes: 'g-sample-submenu', content: 'Facebook', ontap: 'handleMethodTapped'},
				{kind: Item, classes: 'g-sample-submenu', content: 'Twitter', ontap: 'handleMethodTapped'},
				{kind: Item, classes: 'g-sample-submenu', content: 'Email', ontap: 'handleMethodTapped'},
				{kind: Item, classes: 'g-sample-submenu', content: 'More ... (Replace View)', ontap: 'handleMoreTapped'}
			]
		});
	},
	handleMethodTapped: function (sender, event) {
		this.$.fixedFloating.pushFloatingPanel({
			name: 'method',
			owner: this,
			accessibilityLabel: 'Message Panel',
			components: [
				{classes: 'g-sample-submenu', content: 'Enter message here ...'},
				{kind: Button, content: 'Done', ontap: 'handleDismissTapped'}
			]
		});
	},
	handleMoreTapped: function (sender, event) {
		this.$.fixedFloating.replaceFloatingPanel({
			name: 'more',
			owner: this,
			accessibilityLabel: 'PanelReplaced',
			components: [
				{kind: Item, classes: 'g-sample-submenu', content: 'LinkedIn', ontap: 'handleMethodTapped'},
				{kind: Item, classes: 'g-sample-submenu', content: 'Instagram', ontap: 'handleMethodTapped'},
				{kind: Item, classes: 'g-sample-submenu', content: 'Friendster', ontap: 'handleMethodTapped'},
				{kind: Item, classes: 'g-sample-submenu', content: 'MySpace', ontap: 'handleMethodTapped'}
			]
		});
	},
	handlePushTapped: function (sender, event) {
		var panel = this.$.fixedFloating.createComponent({
			owner: this,
			accessibilityLabel: 'Panel2',
			components: [
				{kind: Scroller, classes: 'enyo-fit', components: [
					{kind: Button, content: 'Remove This Panel', classes: 'g-sample-button', ontap: 'handleRemoveTapped'}
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
	handleDismissTapped: function () {
		this.$.fixedFloating.dismissFloatingPanels();
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
				subject: title[idx % title.length] + ((idx % 8 === 0) ? ' with long title' : ''),
				time: genre[idx % genre.length]
			});
		}
		return records;
	},
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
