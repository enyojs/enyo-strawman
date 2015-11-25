require('garnet');

var
	kind = require('enyo/kind'),
	Collection = require('enyo/Collection.js'),
	EmptyBinding = require('enyo/EmptyBinding.js'),
	Item = require('garnet/Item'),
	DataList = require('garnet/DataList'),
	Panel = require('garnet/Panel'),
	Title = require('garnet/Title'),
	SelectionOverlaySupport = require('garnet/SelectionOverlaySupport'),
	MarqueeSupport = require('garnet/MarqueeSupport');

var CheckboxItemBase = kind({
	name: 'g.sample.CheckboxItemBase',
	kind: Item,
	classes: 'g-sample-datalist-checkboxes-checkbox-item',
	published: {
		title: '',
		selected: false
	},
	components: [
		{name: 'title', classes: 'checkbox-item-title', mixins: [MarqueeSupport]}
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

var CheckboxItem = kind({
	name: 'g.sample.CheckboxItem',
	kind: CheckboxItemBase,
	mixins: [SelectionOverlaySupport],
	selectionOverlayVerticalOffset: 53,
	selectionOverlayHorizontalOffset: 12,
	bindings: [
		{from: '.model.albumTitle', to: '.title'}
	]
});

var CheckableDataListPanel = kind({
	name: 'g.sample.CheckableDataListPanel',
	kind: Panel,
	events: {
		onResult: ''
	},
	components: [
		{
			name: 'list',
			kind: DataList,
			controlsPerPage: 4,
			selection: true,
			selectionType: 'multi',
			headerComponents: [{kind: Title, content: 'Title', classes: 'g-sample-datalist-checkboxes-header'}],
			components: [
				{kind: CheckboxItem, ontap: 'tapItem'}
			],
			footerComponents: [{classes: 'g-sample-datalist-checkboxes-footer'}]
		}
	],
	commandBarComponents: [
		{name: 'cancel', classes: 'g-common-cancel', ontap: 'tapCancel'},
		{name: 'ok', classes: 'g-common-ok', ontap: 'tapOK', disabled: true}
	],
	bindings: [
		{from: '.collection', to: '.$.list.collection'}
	],
	getCheckedItems: function() {
		return this.$.list.get('selected');
	},
	tapCancel: function() {
		this.doResult({msg: 'Cancel button is pressed.'});
	},
	tapOK: function() {
		var items = this.getCheckedItems();
		if (items.length > 0) {
			var names = '';
			for (var i=0; i<items.length; i++) {
				names += items[i].attributes.albumTitle;
				names += ', ';
			}
			this.doResult({msg: 'OK button is pressed.: ' + names});
		} else {
			this.doResult({msg: 'OK button is pressed.'});
		}
	},
	tapItem: function(inSender, inEvent) {
		var
			items = this.getCheckedItems(),
			control = inEvent.originator.parent;
		if (control.selected || control.parent.selected) {
			this.doResult({msg: 'The ' + inEvent.index + ' th item in the list is selected.'});
			if (items.length > 0) {
				this.$.ok.setDisabled(false);
			}
		} else {
			this.doResult({msg: 'The ' + inEvent.index + ' th item in the list is deselected.'});
			if (items.length === 0) {
				this.$.ok.setDisabled(true);
			}
		}
	}
});

module.exports = kind({
	name: 'g.sample.DataListwithCheckboxesSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< Data List with Checkboxes Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Data List with Checkboxes', classes: 'g-sample-subheader'},
		{name: 'checkableListPanel', kind: CheckableDataListPanel, classes: 'g-sample-panel', onResult: 'result'},

		{src: '@../assets/btn_command_next.svg', classes: 'g-sample-result', components: [
			{content: 'Result', classes: 'g-sample-subheader'},
			{name: 'result', allowHtml: true, content: 'No item selected yet.', classes: 'g-sample-description'}
		]}
	],
	bindings: [
		{from: '.collection', to: '.$.checkableListPanel.collection'}
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
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Looooooooooooong Title', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Looooooooooooong Title', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Looooooooooooong Title', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Looooooooooooong Title', albumGenre: 'Ballad'},
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
