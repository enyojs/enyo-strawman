var
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	Collection = require('enyo/Collection'),
	EmptyBinding = require('enyo/EmptyBinding');

var
	Button = require('moonstone/Button'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	ContextualPopup = require('moonstone/ContextualPopup'),
	ContextualPopupButton = require('moonstone/ContextualPopupButton'),
	ContextualPopupDecorator = require('moonstone/ContextualPopupDecorator'),
	DataList = require('moonstone/DataList'),
	DataGridList = require('moonstone/DataGridList'),
	GridListImageItem = require('moonstone/GridListImageItem'),
	Icon = require('moonstone/Icon'),
	Item = require('moonstone/Item'),
	Panel = require('moonstone/Panel'),
	Panels = require('moonstone/Panels'),
	RadioItemGroup = require('moonstone/RadioItemGroup'),
	Scroller = require('moonstone/Scroller'),
	Overlay = require('moonstone/Overlay'),
	ToggleButton = require('moonstone/ToggleButton');



var GridSampleItem = kind({
	name: 'moon.sample.GridSampleItem',
	kind: GridListImageItem,
	mixins: [Overlay.Selection],
	subCaption: 'Sub Caption',
	bindings: [
		{from: 'model.text', to: 'caption'},
		{from: 'model.subText', to: 'subCaption'},
		{from: 'model.url', to: 'source'},
		{from: 'model.selected', to: 'selected', oneWay: false}
	]
});

var HorizontalGridListImageItem = kind({
	name: 'moon.HorizontalGridListImageItem',
	kind: GridListImageItem,
	mixins: [Overlay.Selection],
	classes: 'horizontal-gridList-image-item',
});

var HorizontalGridListItem = kind({
	name: 'moon.HorizontalGridListItem',
	kind: Item,
	classes: 'moon-gridlist-imageitem horizontal-gridList-item',
	mixins: [Overlay.Support, Overlay.Selection],

	components: [
		{name: 'caption', classes: 'caption'},
		{name: 'subCaption', classes: 'sub-caption'}
	],

	published: {
		caption: '',
		subCaption: '',
		selected: false
	},

	bindings: [
		{from: 'caption', to: '$.caption.content'},
		{from: 'caption', to: '$.caption.showing', kind: EmptyBinding},
		{from: 'subCaption', to: '$.subCaption.content'},
		{from: 'subCaption', to: '$.subCaption.showing', kind: EmptyBinding}
	]
});

module.exports = kind({
	name: 'moon.sample.DataGridListSample',
	kind: Panels,
	pattern: 'activity',
	classes: 'moon enyo-fit enyo-unselectable',
	components: [
		{kind: Panel, name: 'listPanel', title: 'Data Grid List', headerComponents: [
			{kind: ToggleButton, content: 'Selection', name: 'selectionToggle', onChange: 'selectionChanged'},
			{kind: ContextualPopupDecorator, components: [
				{kind: ContextualPopupButton, content: 'Selection Type'},
				{kind: ContextualPopup, classes: 'moon-4h', components: [
					{kind: RadioItemGroup, name: 'selectionTypeGroup', onActiveChanged: 'selectionTypeChanged', components: [
						{content: 'Single', value: 'single', selected: true},
						{content: 'Multiple', value: 'multi'},
						{content: 'Group', value: 'group'}
					]}
				]}
			]},
			{kind: ContextualPopupDecorator, components: [
				{kind: ContextualPopupButton, content:'Item Type'},
				{kind: ContextualPopup, classes:'moon-6h', components: [
					{kind: RadioItemGroup, name: 'itemTypeGroup', onActiveChanged: 'itemTypeChanged', components: [
						{content: 'ImageItem', value: 'GridListImageItem', selected: true},
						{content: 'HorizontalImageItem', value: 'HorizontalGridListImageItem'},
						{content: 'HorizontalItem', value: 'HorizontalGridListItem'}
					]}
				]}
			]},
			{kind: Button, content: 'Refresh', ontap: 'refreshItems'},
			{kind: ContextualPopupDecorator, components: [
				{kind: ContextualPopupButton, content: 'Popup List'},
				{kind: ContextualPopup, classes: 'moon-6h moon-8v', components: [
					{kind:DataList, components: [
						{kind:CheckboxItem, bindings: [
							{from: '.model.text', to: '.content'},
							{from: '.model.selected', to: '.checked', oneWay: false}
						]}
					]}
				]}
			]}
		], components: [
			{name: 'gridList', fit: true, spacing: 20, minWidth: 180, minHeight: 270, kind: DataGridList, scrollerOptions: { kind: Scroller, vertical: 'scroll', horizontal: 'hidden', spotlightPagingControls: true }, components: [
				{ kind: GridSampleItem }
			]}
		]}
	],
	bindings: [
		{from: 'collection', to: '$.dataList.collection'}
	],
	create: function () {
		Panels.prototype.create.apply(this, arguments);
		// we set the collection that will fire the binding and add it to the list
		this.set('itemKind', 'GridListImageItem');
	},
	itemKindChanged: function () {
		this.generateDataGridList(this.itemKind);
	},
	generateRecords: function (amount) {
		var records = [],
			idx     = this.modelIndex || 0;
		for (; records.length < amount; ++idx) {
			var title = (idx % 8 === 0) ? ' with long title' : '';
			var subTitle = (idx % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle';
			records.push({
				selected: false,
				text: 'Item ' + idx + title,
				subText: subTitle,
				url: 'http://placehold.it/300x' + (this.itemKind == 'GridListImageItem' ? '300' : '100') + '/' + Math.floor(Math.random()*0x1000000).toString(16) + '/ffffff&text=Image ' + idx
			});
		}
		// update our internal index so it will always generate unique values
		this.modelIndex = idx;
		return records;
	},
	generateDataGridList: function (itemType) {
		if (this.$.gridList) {
			this.$.gridList.destroy();
		}

		var props = {
				name: 'gridList', kind: DataGridList, selection: false, fit: true, spacing: 20,
				minHeight: 270, minWidth: 180, scrollerOptions: {
					kind: Scroller, vertical:'scroll', horizontal: 'hidden', spotlightPagingControls: true
				}, components: [
					{kind: GridSampleItem}
				]
			},
			createdComponent;

		switch (itemType) {
		case 'HorizontalGridListImageItem':
			props.minWidth = 600;
			props.minHeight = 100;
			props.components[0] = {
				kind: HorizontalGridListImageItem,
				bindings: [
					{from: 'model.text', to: 'caption'},
					{from: 'model.subText', to: 'subCaption'},
					{from: 'model.url', to: 'source'},
					{from: 'model.selected', to: 'selected', oneWay: false}
				]
			};
			break;
		case 'HorizontalGridListItem':
			props.minWidth = 600;
			props.minHeight = 100;
			props.components[0] = {
				kind: HorizontalGridListItem,
				bindings: [
					{from: 'model.text', to: 'caption'},
					{from: 'model.subText', to: 'subCaption'},
					{from: 'model.selected', to: 'selected', oneWay: false}
				]
			};
			break;
		}

		createdComponent = this.$.listPanel.createComponent(props, {owner: this});
		createdComponent.render();
		this.set('collection', new Collection(this.generateRecords(40)));

		this.$.gridList.set('collection', this.collection);
		this.$.gridList.set('selection', this.$.selectionToggle.value);
		if (this.$.selectionTypeGroup.active) {
			this.$.gridList.set('selectionType', this.$.selectionTypeGroup.active.value);
		}
	},
	selectionChanged: function (sender, event) {
		this.$.gridList.set('selection', sender.value);
	},
	itemTypeChanged: function (sender, event) {
		this.set('itemKind', sender.active.value);
	},
	selectionTypeChanged: function (sender, event) {
		this.$.gridList.set('selectionType', sender.active.value);
	},
	refreshItems: function () {
		// we fetch our collection reference
		var collection = this.get('collection');
		// we now remove all of the current records from the collection
		collection.remove(collection.models);
		// and we insert all new records that will update the list
		collection.add(this.generateRecords(100));
	}
});