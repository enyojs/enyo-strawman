require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Collection = require('enyo/Collection.js'),
	EmptyBinding = require('enyo/EmptyBinding.js'),
	Item = require('garnet/Item'),
	DataList = require('garnet/DataList'),
	Panel = require('garnet/Panel'),
	Title = require('garnet/Title'),
	SelectionOverlaySupport = require('garnet/SelectionOverlaySupport');

var RadioButtonItemBase = kind({
	name: 'g.sample.RadioButtonItemBase',
	kind: Item,
	classes: 'g-datalist-radiobutton-item',
	published: {
		title: '',
		selected: false
	},
	components: [
		{name: 'title', classes: 'radiobutton-item-title'},
		{tag: 'hr', style: 'border: 0; color: #202328; height: ' + ri.scale(1) + 'px; background-color: #202328; bottom: 0;'}
	],
	bindings: [
		{from: '.title', to: '.$.title.content'},
		{from: '.title', to: '.$.title.showing', kind: EmptyBinding}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.selectedChanged();
		};
	}),
	selectedChanged: function() {
		this.addRemoveClass('selected', this.selected);
	},
	disabledChanged: function() {
		this.addRemoveClass('disabled', this.disabled);
	}
});

var RadioButtonItem = kind({
	name: 'g.sample.RadioButtonItem',
	kind: RadioButtonItemBase,
	mixins: [SelectionOverlaySupport],
	selectionScrimIcon: {
		'w320': 'garnet/images/320/btn_radio.svg',
		'w360': 'garnet/images/360/btn_radio.svg'
	},
	selectionOverlayVerticalOffset: 53,
	selectionOverlayHorizontalOffset: 80,
	bindings: [
		{from: '.model.albumTitle', to: '.title'}
	]
});

var RadioDataListPanel = kind({
	name: 'g.sample.RadioDataListPanel',
	kind: Panel,
	noDefer: true,
	events: {
		onResult: ''
	},
	components: [
		{
			name: 'list',
			kind: DataList,
			controlsPerPage: 4,
			groupSelection: true,
			selection: true,
			style: 'background-color: #000000;',
			headerComponents: [{kind: Title, content: 'DataList with Radio Buttons'}],
			components: [
				{kind: RadioButtonItem, ontap: 'tapItem'}
			],
			footerComponents: [
				{style: 'height: ' + ri.scale(116) + 'px;'}
			]
		}
	],
	commandBarComponents: [
		{name: 'cancel', classes: 'g-common-cancel', ontap: 'tapCancel'},
		{name: 'ok', classes: 'g-common-ok', ontap: 'tapOK', disabled: true}
	],
	bindings: [
		{from: '.collection', to: '.$.list.collection'},
		{from: '.title', to: '.$.listTitle.content'}
	],
	getSelectedItem: function() {
		if (this.$.list.get('selected')) {
			return this.$.list.get('selected').attributes.albumTitle;
		} else {
			return '';
		}
	},
	tapItem: function(inSender, inEvent) {
		if (inEvent.originator.owner.selected) {
			this.doResult({msg: 'The ' + inEvent.originator.owner.getTitle() + ' in the list is selected.'});
		}
		this.$.ok.setDisabled(false);
	},
	tapCancel: function() {
		this.doResult({msg: 'Cancel button is pressed.'});
	},
	tapOK: function() {
		this.doResult({msg: 'OK button is pressed: ' + this.getSelectedItem()});
	}
});

module.exports = kind({
	name: 'g.sample.DataListwithRadioButtonsSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< DataList with Radio Buttons Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'DataList with Radio Buttons', classes: 'g-sample-subheader'},
		{name: 'radioDataListPanel', kind: RadioDataListPanel, style: 'position: relative;', onResult: 'result'},

		{src: '@../assets/btn_command_next.svg', classes: 'g-sample-result', components: [
			{content: 'Result', classes: 'g-sample-subheader'},
			{name: 'result', allowHtml: true, content: 'No item selected yet.', classes: 'g-sample-description'}
		]}
	],
	bindings: [
		{from: '.collection', to: '.$.radioDataListPanel.collection'}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new Collection(this.data);
		};
	}),
	result: function(inSender, inEvent) {
		this.$.result.setContent(inEvent.msg);
	},
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	},
	data: [
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Looooooooooong Title', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Looooooooooong Title', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Kristina', albumGenre: 'Ballad'}
	]
});
