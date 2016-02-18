var
	kind = require('enyo/kind'),
	job = require('enyo/job'),
	utils = require('enyo/utils');

var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	List = require('layout/List'),
	Button = require('enyo/Button'),
	Checkbox = require('enyo/Checkbox'),
	Img = require('enyo/Image'),
	Input = require('enyo/Input'),
	Popup = require('enyo/Popup'),
	NameGenerator = require('../NameGenerator');


// It's convenient to create a kind for the item we'll render in the contacts list.
var ContactItem = kind({
	events: {
		onRemove: ''
	},
	published: {
		importance: 0
	},
	components: [
		{name: 'avatar', kind: Img, classes: 'list-sample-contacts-avatar'},
		{components: [
			{name: 'name'},
			{name: 'title', classes: 'list-sample-contacts-description'},
			{content: '(415) 711-1234', classes: 'list-sample-contacts-description'}
		]},
		{name: 'remove', classes: 'list-sample-contacts-remove-button', ontap: 'removeTap'}
	],
	setContact: function (contact) {
		this.$.name.setContent(contact.name);
		this.$.avatar.setSrc(contact.avatar);
		this.$.title.setContent(contact.title);
	},
	setSelected: function (selected) {
		this.addRemoveClass('list-sample-contacts-item-selected', selected);
		this.$.remove.applyStyle('display', selected ? 'inline-block' : 'none');
	},
	renderImportance: function () {
		switch(this.importance) {
		case 0:
			this.$.importance.setContent('not important');
			break;
		case -1:
			this.$.importance.setContent('important');
			break;
		case -2:
			this.$.importance.setContent('very important');
			break;
		default:
			window.alert(this.importance+' - wowzer');
			break;
		}
	},
	removeTap: function (sender, ev) {
		this.doRemove({index: ev.index});
		return true;
	}
});

module.exports = kind({
	name: 'enyo.sample.ListContactsSample',
	kind: FittableRows,
	classes: 'list-sample-contacts enyo-fit',
	components: [
		{
			kind: FittableColumns,
			classes: 'layout-sample-toolbar',
			style: 'height: 55px;',
			components: [
				{kind: Button, content: 'setup', ontap: 'showSetupPopup'},
				{tag: 'label', components: [
					{name: 'newContactInput', kind: Input, value: 'Frankie Fu'}
				]},
				{kind: Button, content: 'new contact', ontap: 'addItem'},
				{fit: true},
				{tag: 'label', components: [
					{kind: Input, placeholder: 'Search...', style: 'width: 140px;', oninput: 'searchInputChange'},
					{kind: Img, src: '@../../assets/search-input-search.png', style: 'width: 20px;'}
				]},
				{kind: Button, content: 'remove selected', ontap: 'removeSelected'}
			]
		},
		{
			kind: List,
			classes: 'list-sample-contacts-list enyo-unselectable',
			fit: true,
			multiSelect: true,
			onSetupItem: 'setupItem',
			components: [
				{name: 'divider', classes: 'list-sample-contacts-divider'},
				{name: 'item', kind: ContactItem, classes: 'list-sample-contacts-item enyo-border-box', onRemove: 'removeTap'}
			]
		},
		{
			name: 'popup',
			kind: Popup,
			modal: true,
			centered: true,
			classes: 'list-sample-contacts-popup',
			components: [
				{
					components: [
						{style: 'display:inline-block', components:[
							{content: 'count:', classes: 'list-sample-contacts-label'},
							{name: 'countOutput', kind: Input, type: 'number', value: 200, onchange: 'countChanging'}
						]}
					]
				},
				{
					components: [
						{content: 'rowsPerPage:', classes: 'list-sample-contacts-label'},
						{name: 'rowsPerPageOutput', kind: Input, type: 'number', value: 50, onchange: 'rowsChanging'}
					]
				},
				{
					components: [
						{content: 'hide divider:', classes: 'list-sample-contacts-label'},
						{name: 'hideDividerCheckbox', kind: Checkbox}
					]
				},
				{
					components: [
						{kind: Button, content: 'populate list', classes: 'list-sample-contacts-populate-button', ontap: 'populateList'}
					]
				}
			]
		}
	],
	rendered: kind.inherit (function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.populateList();
		};
	}),
	setupItem: function (sender, ev) {
		var i = ev.index;
		var data = this.filter ? this.filtered : this.db;
		var item = data[i];
		// content
		this.$.item.setContact(item);
		// selection
		this.$.item.setSelected(sender.isSelected(i));
		// divider
		if (!this.hideDivider) {
			var d = item.name[0];
			var prev = data[i-1];
			var showd = d != (prev && prev.name[0]);
			this.$.divider.setContent(d);
			this.$.divider.canGenerate = showd;
			this.$.item.applyStyle('border-top', showd ? 'none' : null);
		}
		return true;
	},
	refreshList: function () {
		if (this.filter) {
			this.filtered = this.generateFilteredData(this.filter);
			this.$.list.setCount(this.filtered.length);
		} else {
			this.$.list.setCount(this.db.length);
		}
		this.$.list.refresh();
	},
	addItem: function () {
		var item = this.generateItem(utils.cap(this.$.newContactInput.getValue()));
		var i = 0;
		for (var di; (di=this.db[i]); i++) {
			if (di.name > item.name) {
				this.db.splice(i, 0, item);
				break;
			}
		}
		// if we hit end of for-loop, add to end of list
		if (!di) {
			this.db.push(item);
		}
		this.refreshList();
		this.$.list.scrollToRow(i);
	},
	removeItem: function (index) {
		this._removeItem(index);
		this.$.list.getSelection().remove(index);
		this.refreshList();
	},
	_removeItem: function (index) {
		var i = this.filter ? this.filtered[index].dbIndex : index;
		this.db.splice(i, 1);
	},
	removeTap: function (sender, ev) {
		this.removeItem(ev.index);
		return true;
	},
	removeSelected: function () {
		// get selected items, sort numerically in decending order
		var selected = utils.keys(this.$.list.getSelection().getSelected());
		selected.sort(function (a,b) { return b-a; });
		// remove items one-by-one, starting with last in the list
		for (var i=0; i < selected.length; i++) {
			this._removeItem(selected[i]);
		}
		// clear selection, since all selected items are now gone
		this.$.list.getSelection().clear();
		// re-render list in current position
		this.refreshList();
	},
	populateList: function () {
		this.$.popup.hide();
		this.createDb(this.$.countOutput.getValue());
		this.$.list.setCount(this.db.length);
		this.$.list.setRowsPerPage(this.$.rowsPerPageOutput.getValue());
		//
		this.hideDivider = this.$.hideDividerCheckbox.getValue();
		//this.$.divider.canGenerate = !this.hideDivider;
		//
		this.$.list.reset();
	},
	createDb: function (count) {
		this.db = [];
		for (var i=0; i<count; i++) {
			this.db.push(this.generateItem(NameGenerator.makeName(4, 6) + ' ' + NameGenerator.makeName(5, 10)));
		}
		this.sortDb();
	},
	generateItem: function (name) {
		return {
			name: name,
			avatar: '@../../assets/avatars/' + avatars[utils.irand(avatars.length)],
			title: titles[utils.irand(titles.length)],
			importance: 0
		};
	},
	sortDb: function () {
		this.db.sort(function (a, b) {
			if (a.name < b.name) {
				return -1;
			}
			else if (a.name > b.name) {
				return 1;
			}
			else {
				return 0;
			}
		});
	},
	showSetupPopup: function () {
		this.$.popup.show();
	},
	searchInputChange: function (sender) {
		job(this.id + ':search', this.bindSafely('filterList', sender.getValue()), 200);
	},
	filterList: function (filter) {
		if (filter != this.filter) {
			this.filter = filter;
			this.filtered = this.generateFilteredData(filter);
			this.$.list.setCount(this.filtered.length);
			this.$.list.reset();
		}
	},
	generateFilteredData: function (filter) {
		var re = new RegExp('^' + filter, 'i');
		var r = [];
		for (var i=0, d; (d=this.db[i]); i++) {
			if (d.name.match(re)) {
				d.dbIndex = i;
				r.push(d);
			}
		}
		return r;
	},
	countChanging: function (sender, ev) {
		this.$.countOutput.setContent(Math.round(sender.getValue()) * 50);
	},
	rowsChanging: function (sender, ev) {
		this.$.rowsPerPageOutput.setContent(Math.round(sender.getValue()) * 5);
	}
});

var avatars = [
	'angel.png',
	'astrologer.png',
	'athlete.png',
	'baby.png',
	'clown.png',
	'devil.png',
	'doctor.png',
	'dude.png',
	'dude2.png',
	'dude3.png',
	'dude4.png',
	'dude5.png',
	'dude6.png'
];
var titles = [
	'Regional Data Producer',
	'Internal Markets Administrator',
	'Central Solutions Producer',
	'Dynamic Program Executive',
	'Direct Configuration Executive',
	'International Marketing Assistant',
	'District Research Consultant',
	'Lead Intranet Coordinator',
	'Central Accountability Director',
	'Product Web Assistant'
];