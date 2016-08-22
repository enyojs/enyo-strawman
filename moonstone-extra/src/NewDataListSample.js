var
	kind = require('enyo/kind');

var
	FittableColumns = require('layout/FittableColumns');

var
	GridListImageItem = require('moonstone/GridListImageItem'),
	Button = require('moonstone/Button'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	NewDataList = require('moonstone/NewDataList'),
	Overlay = require('moonstone/Overlay'),
	Panel = require('moonstone/Panel'),
	Scroller = require('moonstone/Scroller'),
	Collection = require('enyo/Collection'),
	Control = require('enyo/Control'),
	Img = require('enyo/Image');

var ImageItem = kind({
	kind: GridListImageItem,
	subCaption: 'Sub Caption',
	mixins: [Overlay.Selection],
	bindings: [
		{from: 'model.text', to: 'caption'},
		{from: 'model.subText', to: 'subCaption'},
		{from: 'model.url', to: 'source'}
	]
});

var NoImageItem = kind({
	kind: ImageItem,
	bindings: [
		{from: 'model.bgColor', to: 'bgColor'}
	],
	componentOverrides: {
		image: {kind: Control, mixins: [Overlay.Support, Overlay.Selection]}
	},
	imageSizingChanged: function () {},
	bgColorChanged: function () {
		this.$.image.applyStyle('background', this.bgColor);
	}
});

var
	buttonComponents = [
		{
			kind: Control,
			style: 'position: absolute;',
			bindings: [
				{from: 'model.text', to: '$.button.content'}
			],
			components: [
				{
					kind: Button,
					name: 'button',
					style: 'position: relative; height: 100%; width: 100%;',
					selectedClass: 'active'
				}
			]
		}
	],
	imageComponents = [
		{kind: ImageItem, style: 'position: absolute;'}
	],
	noImageComponents = [
		{kind: NoImageItem, style: 'position: absolute;'}
	],
	plainImageComponents = [
		{kind: Control, mixins: [Overlay.Support, Overlay.Selection], components: [
			{name: 'img', kind: Img, style: 'height: 100%; width: 100%;'}
		],bindings: [
			{from: 'model.url', to: '$.img.src'}
		]}
	];

function selectedValue (selected) {
	return selected && selected.value;
}

module.exports = kind({
	name: 'moon.sample.NewDataListSample',
	kind: FittableColumns,
	classes: 'moon enyo-fit enyo-unselectable',
	style: 'padding: 0', // offsetting margin added by .moon
	components: [
		{
			kind: Panel,
			classes:'moon-6h',
			title:'Menu',
			components: [
				{
					kind: Scroller,
					components: [
						{
							name: 'itemPicker',
							kind: ExpandablePicker,
							content: 'Items',
							components: [
								{content: 'Image Items', value: imageComponents, active: true},
								{content: 'No-Image Items', value: noImageComponents},
								{content: 'Plain Images', value: plainImageComponents},
								{content: 'Buttons', value: buttonComponents}
							]
						},
						{
							name: 'directionPicker',
							kind: ExpandablePicker,
							content: 'Direction',
							components: [
								{content: 'Vertical', value: 'vertical', active: true},
								{content: 'Horizontal', value: 'horizontal'}
							]
						},
						{
							name: 'dataTypePicker',
							kind: ExpandablePicker,
							content: 'Data',
							components: [
								{content: 'Collections/Models', value: 'EnyoData', active: true},
								{content: 'JS Arrays/Objects', value: 'JS'}
							]
						},
						{
							name: 'selectionPicker',
							kind: ExpandablePicker,
							content: 'Selection',
							components: [
								{content: 'On', value: true},
								{content: 'Off', value: false, active: true}
							]
						},
						{
							name: 'selectionTypePicker',
							kind: ExpandablePicker,
							content: 'Selection Type',
							components: [
								{content: 'Single', value: 'single', active: true},
								{content: 'Multiple', value: 'multi'},
								{content: 'Group', value: 'group'}
							]
						}
					]
				}
			]
		},
		{
			kind: Panel,
			fit: true,
			title:'New Data List',
			headerComponents: [
				{kind: Button, content:'Refresh', ontap:'refreshItems'}
			],
			components: [
				{
					name: 'list',
					kind: NewDataList,
					minItemHeight: 270,
					minItemWidth: 180,
					spacing: 20,
					columns: 6,
					rows: 1,
					components: imageComponents
				}
			]
		}
	],
	bindings: [
		{from: 'collection', to: '$.list.collection'},
		{from: '$.itemPicker.selected', to: '$.list.components', transform: selectedValue},
		{from: '$.directionPicker.selected', to: '$.list.direction', transform: selectedValue},
		{from: '$.dataTypePicker.selected', to: 'dataType', transform: selectedValue},
		{from: '$.selectionPicker.selected', to: '$.list.selection', transform: selectedValue},
		{from: '$.selectionPicker.selected', to: '$.selectionTypePicker.showing', transform: selectedValue},
		{from: '$.selectionTypePicker.selected', to: '$.list.selectionType', transform: selectedValue}
	],
	create: function () {
		FittableColumns.prototype.create.apply(this, arguments);
		this.refreshItems(500);
	},
	generateRecords: function () {
		var records = [],
			idx     = this.modelIndex || 0,
			title, subTitle, color;
		for (; records.length < 500; ++idx) {
			title = (idx % 8 === 0) ? ' with long title' : '';
			subTitle = (idx % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle';
			color = Math.floor((Math.random()*(0x1000000-0x101010))+0x101010).toString(16);

			records.push({
				selected: false,
				text: 'Item ' + idx + title,
				subText: subTitle,
				// url: 'http://placehold.it/300x300/9037ab/ffffff&text=Image'
				url: 'http://placehold.it/300x300/' + color + '/ffffff&text=Image ' + idx,
				bgColor: '#' + color
			});
		}
		// update our internal index so it will always generate unique values
		this.modelIndex = idx;
		return records;
	},
	refreshItems: function (num) {
		var data;

		num = (typeof num === 'number') ? num : 100;
		data = this.generateRecords(num);

		if (this.collection && this.collection.destroy) {
			this.collection.destroy();
		}
		this.set('collection', this.dataType === 'JS' ? data : new Collection(data));
	},
	dataTypeChanged: function (prev) {
		if (prev) {
			this.refreshItems(500);
		}
	}
});

module.exports.badgeClasses = 'new wip';