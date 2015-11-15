require('garnet');

var
	kind = require('enyo/kind'),
	Collection = require('enyo/Collection.js'),
	Item = require('garnet/Item'),
	Icon = require('garnet/Icon'),
	DataList = require('garnet/DataList'),
	Button = require('garnet/Button'),
	IconMenuPopup = require('garnet/IconMenuPopup'),
	Panel = require('garnet/Panel'),
	Title = require('garnet/Title'),
	MarqueeSupport = require('garnet/MarqueeSupport');

var DataListItem = kind({
	name: 'g.sample.DataListItem',
	kind: Item,
	classes: 'g-sample-datalist-item',
	components: [
		{name: 'iconUrl', kind: Icon, classes: 'g-sample-datalist-item-icon'},
		{name: 'albumTitle', mixins: [MarqueeSupport], classes: 'g-sample-datalist-item-title'},
		{name: 'albumGenre', mixins: [MarqueeSupport], classes: 'g-sample-datalist-item-genre'}
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
	knob: true,
	components: [
		{
			name: 'list',
			kind: DataList,
			controlsPerPage: 4,
			classes: 'g-sample-datalist',
			headerComponents: [{kind: Title, content: 'Title: long text will fade out', classes: 'g-sample-datalist-header'}],
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
		{from: '.collection', to: '.$.list.collection'}
	]
});

var DataListSample = module.exports = kind({
	name: 'g.sample.DataListSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< Data List Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Data List', classes: 'g-sample-subheader'},
		{name: 'listPanel', kind: DataListPanel, classes: 'g-sample-panel'}
	],
	bindings: [
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
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Looooooooooooong Title', albumGenre: 'Hiphop'}
	]
});

DataListSample.DataListPanel = DataListPanel;
