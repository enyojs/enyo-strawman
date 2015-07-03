var
	kind = require('enyo/kind'),
	Collection = require('enyo/Collection');

var
	BadgeOverlaySupport = require('moonstone/BadgeOverlaySupport'),
	Button = require('moonstone/Button'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	ContextualPopup = require('moonstone/ContextualPopup'),
	ContextualPopupButton = require('moonstone/ContextualPopupButton'),
	ContextualPopupDecorator = require('moonstone/ContextualPopupDecorator'),
	DataList = require('moonstone/DataList'),
	DataGridList = require('moonstone/DataGridList'),
	GridListImageItem = require('moonstone/GridListImageItem'),
	Item = require('moonstone/Item'),
	Panel = require('moonstone/Panel'),
	Panels = require('moonstone/Panels'),
	RadioItemGroup = require('moonstone/RadioItemGroup'),
	Scroller = require('moonstone/Scroller'),
	ToggleButton = require('moonstone/ToggleButton');

var GridSampleOverlayItem = kind({
	name: 'moon.sample.GridSampleOverlayItem',
	kind: GridListImageItem,
	mixins: [BadgeOverlaySupport],
	subCaption: 'Sub Caption',
	bindings: [
		{from: 'model.text', to: 'caption'},
		{from: 'model.subText', to: 'subCaption'},
		{from: 'model.url', to: 'source'},
		{from: 'model.badgeType', to: 'badgeType'},
		{from: 'model.position', to: 'position'},
		{from: 'model.badgeIconPosition', to: 'badgeIconPosition'},
		{from: 'model.transparency', to: 'transparency'}
	]
});

module.exports = kind({
	name: 'moon.sample.DataGridListOverlaySample',
	kind: Panels,
	pattern: 'activity',
	classes: 'moon enyo-fit enyo-unselectable',
	handlers: {
		onBadgeIconTap: 'badgeTap',
		onBadgeTap: 'badgeDetailTap'
	},
	components: [
		{kind: Panel, classes:'moon-6h', title:'Menu', components: [
			{kind: Item, content:'Selected item is:'},
			{name:'selectedItem', kind: Item, content:''}
		]},
		{kind: Panel, joinToPrev: true, title:'Data Grid List', headerComponents: [
			{kind: ToggleButton, content:'transparency', name:'badgeTransparent'},
			{kind: ContextualPopupDecorator, components: [
				{kind: ContextualPopupButton, content:'BadgeIcon'},
				{kind: ContextualPopup, classes:'moon-4h', components: [
					{name: 'badgeIconPosition', kind: RadioItemGroup, components: [
						{content: 'right', value: 'right', selected: true},
						{content: 'left', value: 'left'}
					]}
				]}
			]},
			{kind: ContextualPopupDecorator, components: [
				{kind: ContextualPopupButton, content:'Badge Type'},
				{kind: ContextualPopup, classes:'moon-4h', components: [
					{kind: RadioItemGroup, name: 'badgeTypeGroup', components: [
						{content: 'Image', value: 'image', selected: true},
						{content: 'Video', value: 'video'},
						{content: 'Audio', value: 'audio'}
					]}
				]}
			]},
			{kind: ContextualPopupDecorator, components: [
				{kind: ContextualPopupButton, content:'Badge Position'},
				{kind: ContextualPopup, classes:'moon-4h', components: [
					{kind: RadioItemGroup, name: 'badgePositionGroup', components: [
						{content: 'Top', value: 'top', selected: true},
						{content: 'Bottom', value: 'bottom'}
					]}
				]}
			]}
		], components: [
			{name: 'gridList', fit: true, spacing: 20, minWidth: 180, minHeight: 270, kind: DataGridList, scrollerOptions: { kind: Scroller, vertical:'scroll', horizontal: 'hidden', spotlightPagingControls: true }, components: [
				{ kind: GridSampleOverlayItem }
			]}
		]}
	],
	bindings: [
		{from: 'collection', to: '$.gridList.collection'},
		{from: '$.badgeTransparent.value', to: 'gridItemBadgeTransparency'},
		{from: '$.badgeIconPosition.active', to: 'gridItemBadgeIconPosition',
			transform: function (selected) {
				return selected && selected.value;
			}
		},
		{from: '$.badgeTypeGroup.active', to: 'gridItemBadgeType',
			transform: function (selected) {
				return selected && selected.value;
			}
		},
		{from: '$.badgePositionGroup.active', to: 'gridItemBadgePosition',
			transform: function (selected) {
				return selected && selected.value;
			}
		}
	],
	observers: {
		refreshItems: ['gridItemBadgeType', 'gridItemBadgePosition', 'gridItemBadgeIconPosition', 'gridItemBadgeTransparency']
	},
	create: function () {
		Panels.prototype.create.apply(this, arguments);
		// we set the collection that will fire the binding and add it to the list
		this.set('collection', new Collection(this.generateRecords()));
	},
	generateRecords: function () {
		var records = [],
			idx     = 0;
		for (; records.length < 500; ++idx) {
			var title = (idx % 8 === 0) ? ' with long title' : '';
			var subTitle = (idx % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle';
			records.push({
				selected: false,
				text: 'Item ' + idx + title,
				subText: subTitle,
				badgeType: this.gridItemBadgeType,
				position: this.gridItemBadgePosition,
				badgeIconPosition: this.gridItemBadgeIconPosition,
				transparency: this.gridItemBadgeTransparency,
				url: 'http://placehold.it/300x300/' + Math.floor(Math.random()*0x1000000).toString(16) + '/ffffff&text=Image ' + idx
			});
		}
		// update our internal index so it will always generate unique values
		this.modelIndex = idx;
		return records;
	},
	refreshItems: function () {
		// we fetch our collection reference
		var collection = this.get('collection');
		// we now remove all of the current records from the collection
		collection.remove(collection.models);
		// and we insert all new records that will update the list
		collection.add(this.generateRecords());
	},
	badgeTap: function(sender, ev) {
		this.$.selectedItem.setContent(ev.model.get('text') + ' played.');
	},
	badgeDetailTap: function(sender, ev) {
		this.$.selectedItem.setContent(ev.model.get('text') + ' details tapped.');
	}
});
