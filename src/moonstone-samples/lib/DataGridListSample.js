var
	kind = require('enyo/kind'),
	Collection = require('enyo/Collection'),
	EmptyBinding = require('enyo/EmptyBinding');

var
	CheckboxItem = require('moonstone/CheckboxItem'),
	ContextualPopup = require('moonstone/ContextualPopup'),
	ContextualPopupButton = require('moonstone/ContextualPopupButton'),
	ContextualPopupDecorator = require('moonstone/ContextualPopupDecorator'),
	DataList = require('moonstone/DataList'),
	DataGridList = require('moonstone/DataGridList'),
	GridListImageItem = require('moonstone/GridListImageItem'),
	IconButton = require('moonstone/IconButton'),
	MoonImage = require('moonstone/Image'),
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
		{from: 'model.selected', to: 'selected', oneWay: false},
		{from: 'model.overlayTransparent', to: 'overlayTransparent', oneWay: false}
	]
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

var HorizontalGridListImageItem = kind({
	name: 'moon.HorizontalGridListImageItem',
	kind: HorizontalGridListItem,
	classes: 'horizontal-gridList-image-item',
	components: [
		{name: 'img', kind: MoonImage},
		{name: 'caption', classes: 'caption'},
		{name: 'subCaption', classes: 'sub-caption'}
	],
	bindings: [
		{from: 'model.url', to: '$.img.src'}
	]
});

var itemTypes = [
	{content: 'ImageItem', value: 'GridListImageItem', selected: true},
	{content: 'HorizontalImageItem', value: 'HorizontalGridListImageItem'},
	{content: 'HorizontalItem', value: 'HorizontalGridListItem'}
];

var dataTypes = [
	{content: 'Collections/Models', value: 'EnyoData', selected: true},
	{content: 'JS Arrays/Objects', value: 'JS'}
];

module.exports = kind({
	name: 'moon.sample.DataGridListSample',
	kind: Panels,
	pattern: 'activity',
	classes: 'moon enyo-fit enyo-unselectable moon-datagridlist-sample',
	components: [
		{kind: Panel, name: 'listPanel', title: 'Data Grid List', headerComponents: [
			{kind: ToggleButton, content: 'Selection', name: 'selectionToggle', onChange: 'selectionChanged'},
			{kind: ToggleButton, content: 'Transparency', name: 'transparencyToggle', onChange: 'transparencyTypeChanged', value: true, disabled: true},
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
					{kind: RadioItemGroup, name: 'itemTypeGroup', onActiveChanged: 'itemTypeChanged'}
				]}
			]},
			{kind: ContextualPopupDecorator, components: [
				{kind: ContextualPopupButton, content:'Data Type'},
				{kind: ContextualPopup, classes:'moon-6h', components: [
					{kind: RadioItemGroup, name: 'dataTypeGroup', onActiveChanged: 'dataTypeMenuChanged'}
				]}
			]},
			{kind: ContextualPopupDecorator, components: [
				{kind: ContextualPopupButton, content: 'Popup List'},
				{kind: ContextualPopup, classes: 'moon-6h moon-8v', components: [
					{kind:DataList, components: [
						{kind:CheckboxItem, bindings: [
							{from: 'model.text', to: 'content'},
							{from: 'model.selected', to: 'checked', oneWay: false}
						]}
					]}
				]}
			]},
			{kind: IconButton, icon: 'rollforward', ontap: 'refreshItems'}
		], components: [
			{name: 'gridList', fit: true, spacing: 20, minWidth: 180, minHeight: 270, kind: DataGridList, scrollerOptions: { kind: Scroller, vertical: 'scroll', horizontal: 'hidden', spotlightPagingControls: true }, components: [
				{ kind: GridSampleItem }
			]}
		]}
	],
	bindings: [
		{from: 'collection', to: '$.dataList.collection'},
		{from: 'collection', to: '$.gridList.collection'}
	],
	create: function () {
		Panels.prototype.create.apply(this, arguments);

		this.computeInitialValue(itemTypes, 'itemKind');
		this.computeInitialValue(dataTypes, 'dataType');
		this.$.itemTypeGroup.createComponents(itemTypes);
		this.$.dataTypeGroup.createComponents(dataTypes);
		this.itemKindChanged();
		this.transparency = true;
	},
	computeInitialValue: function (arr, prop) {
		var idx, elem;
		for (idx = 0; idx < arr.length; idx++) {
			elem = arr[idx];
			if (elem.selected) {
				this[prop] = elem.value;
				break;
			}
		}
	},
	itemKindChanged: function () {
		this.generateDataGridList(this.itemKind);
	},
	dataTypeChanged: function () {
		this.refreshItems();
	},
	transparencyChanged: function () {
		var models = this.collection.models,
			model, idx;
		for (idx = 0; idx < models.length; idx++) {
			model = models[idx];
			model.set('overlayTransparent', this.transparency);
		}
	},
	generateRecords: function (amount) {
		var records = [],
			idx     = this.modelIndex || 0;
		for (; records.length < amount; ++idx) {
			var title = (idx % 8 === 0) ? ' with long title' : '';
			var subTitle = (idx % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle';
			records.push({
				selected: false,
				overlayTransparent: this.transparency,
				text: 'Item ' + idx + title,
				subText: subTitle,
				url: '//placehold.it/300x300/' + Math.floor((Math.random()*(0x1000000-0x101010))+0x101010).toString(16) + '/ffffff&text=Image ' + idx
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
				name: 'gridList',
				kind: DataGridList,
				selection: false,
				fit: true,
				spacing: 20,
				minHeight: 270,
				minWidth: 180,
				scrollerOptions: {
					kind: Scroller,
					vertical:'scroll',
					horizontal: 'hidden',
					spotlightPagingControls: true
				},
				components: [
					{kind: GridSampleItem, overlayTransparent: this.transparency}
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

		this.refreshItems(40);

		this.$.gridList.set('selection', this.$.selectionToggle.value);
		// this.$.gridList.set('overlayTransparent', this.$.transparencyToggle.value);
		if (this.$.selectionTypeGroup.active) {
			this.$.gridList.set('selectionType', this.$.selectionTypeGroup.active.value);
		}

		createdComponent.render();
	},
	selectionChanged: function (sender, ev) {
		this.$.transparencyToggle.set('disabled', !sender.value);
		this.$.gridList.set('selection', sender.value);
	},
	transparencyTypeChanged: function (sender, ev) {
		this.set('transparency', sender.value);
	},
	itemTypeChanged: function (sender, ev) {
		this.set('itemKind', sender.active.value);
	},
	dataTypeMenuChanged: function (sender, ev) {
		this.set('dataType', sender.active.value);
	},
	selectionTypeChanged: function (sender, ev) {
		this.$.gridList.set('selectionType', sender.active.value);
	},
	refreshItems: function (num) {
		var data;

		num = (typeof num === 'number') ? num : 100;
		data = this.generateRecords(num);

		if (this.collection && this.collection.destroy) {
			this.collection.destroy();
		}
		this.set('collection', this.dataType === 'JS' ? data : new Collection(data));
	}
});