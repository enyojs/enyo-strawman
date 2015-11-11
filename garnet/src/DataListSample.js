require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Collection = require('enyo/Collection.js'),
	ToolDecorator = require('enyo/ToolDecorator'),
	Item = require('garnet/Item'),
	Icon = require('garnet/Icon'),
	DataList = require('garnet/DataList'),
	Checkbox = require('garnet/Checkbox'),
	Button = require('garnet/Button'),
	IconMenuPopup = require('garnet/IconMenuPopup'),
	Panel = require('garnet/Panel');

var DataListItem = kind({
	name: 'g.sample.DataListItem',
	kind: Item,
	classes: 'g-sample-datalist-item',
	components: [
		{name: 'iconUrl', kind: Icon, classes: 'g-sample-datalist-item-icon'},
		{name: 'albumTitle', classes: 'g-sample-datalist-item-title'},
		{name: 'albumGenre', classes: 'g-sample-datalist-item-genre'}
	],
	bindings: [
		{from: '.model.iconUrl', to: '.$.iconUrl.src'},
		{from: '.model.albumTitle', to: '.$.albumTitle.content'},
		{from: '.model.albumGenre', to: '.$.albumGenre.content'},
		{from: '.model.disabled', to: '.disabled'}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.disabledChanged();
		};
	}),
	disabledChanged: function() {
		this.addRemoveClass('disabled', this.disabled);
	}
});

var DataListPanel = kind({
	name: 'g.sample.DataListPanel',
	kind: Panel,
	title: true,
	titleContent: 'Title',
	knob: true,
	components: [
		{
			name: 'list',
			kind: DataList,
			controlsPerPage: 4,
			classes: 'g-sample-datalist',
			headerComponents: [
				{style: 'height: ' + ri.scale(60) + 'px;'},
				{kind: ToolDecorator, style: 'width: ' + ri.scale(320) + 'px; height: ' + ri.scale(71) + 'px; border-bottom: ' + ri.scale(1) + 'px solid #202328; ', ontap: 'preventSound', components: [
					{content: 'Activated', style: 'width: ' + ri.scale(151) + 'px; padding: 0 ' + ri.scale(5) + 'px 0 ' + ri.scale(58) + 'px; line-height: ' + ri.scale(71) + 'px;'},
					{kind: Checkbox, style: 'width: ' + ri.scale(48) + 'px;'}
				]}
			],
			components: [
				{kind: DataListItem, onlongpress: 'showPopup'}
			],
			footerComponents: [
				{kind: Button, content: 'Text', classes: 'g-sample-datalist-footer'}
			]
		},
		{
			name: 'popup',
			kind: IconMenuPopup,
			buttonComponents: [
				{
					name: 'First button2',
					ontap: 'hidePopup',
					src: '@../assets/btn_delete.svg'
				},
				{
					name: 'Second button2',
					ontap: 'hidePopup',
					src: '@../assets/btn_share.svg'
				},
				{
					name: 'Third button2',
					ontap: 'hidePopup',
					src: '@../assets/btn_delete.svg'
				},
				{
					name: 'Firth button2',
					ontap: 'hidePopup',
					src: '@../assets/btn_share.svg'
				}
			]
		}
	],
	preventSound: function(inSender, inEvent) {
		inEvent.preventSound = true;
	},
	showPopup: function(inSender, inEvent) {
		this.$.popup.show();
	},
	bindings: [
		{from: '.collection', to: '.$.list.collection'},
		{from: '.circle', to: '.$.list.circle'}
	]
});

var DataListSample = module.exports = kind({
	name: 'g.sample.DataListSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< Data List Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Data List', classes: 'g-sample-subheader'},
		{style: 'position: relative; height: 100%;', components: [
			{name: 'circleListPanel', kind: DataListPanel, circle: true, classes: 'g-sample-datalist-panel'},
			{name: 'listPanel', kind: DataListPanel, classes: 'g-sample-datalist-panel'}
		]}
	],
	bindings: [
		{from: '.collection', to: '.$.circleListPanel.collection'},
		{from: '.collection', to: '.$.listPanel.collection'}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new Collection(this.data);
		};
	}),
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	},
	data: [
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Looooooooooooong Title', albumGenre: 'Rock', disabled: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Looooooooooooong Title', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Looooooooooooong Title', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Looooooooooooong Title', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Looooooooooooong Title', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop'}
	]
});

DataListSample.DataListPanel = DataListPanel;
