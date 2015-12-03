require('garnet');

var
	kind = require('enyo/kind'),
	Collection = require('enyo/Collection.js'),
	Item = require('garnet/Item'),
	Icon = require('garnet/Icon'),
	DataList = require('garnet/DataList'),
	Button = require('garnet/Button'),
	Panel = require('garnet/Panel'),
	Title = require('garnet/Title'),
	MarqueeSupport = require('garnet/MarqueeSupport');

var DataListItem = kind({
	name: 'g.sample.DataListItem',
	kind: Item,
	border: true,
	classes: 'g-sample-datalist-item',
	components: [
		{name: 'icon', kind: Icon, classes: 'g-sample-datalist-item-icon'},
		{name: 'subject', mixins: [MarqueeSupport], classes: 'g-sample-datalist-item-title'},
		{name: 'time', mixins: [MarqueeSupport], classes: 'g-sample-datalist-item-genre'}
	],
	bindings: [
		{from: '.model.icon', to: '.$.icon.src'},
		{from: '.model.subject', to: '.$.subject.content'},
		{from: '.model.time', to: '.$.time.content'},
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
	components: [
		{
			name: 'list',
			kind: DataList,
			classes: 'g-sample-datalist',
			headerComponents: [
				{kind: Title, content: 'Title: long text will fade out'}
			],
			components: [
				{kind: DataListItem}
			],
			footerComponents: [
				{classes: 'g-sample-datalist-footer', components: [
					{kind: Button, content: 'Text'}
				]}
			]
		}
	],
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
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 1', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 2', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Disabled', time: '11:50 AM', disabled: true},
		{icon: '@../assets/ic_list_message.svg', subject: 'Looooooooong text', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 5', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 6', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 7', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 8', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 9', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 10', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 11', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 12', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 13', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 14', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 15', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 16', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 17', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 18', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 19', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 20', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 21', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 22', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 23', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 24', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 25', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 26', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 27', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 28', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 29', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 30', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 31', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 32', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 33', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 34', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 35', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 36', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 37', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 38', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 39', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 40', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 41', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 42', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 43', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 44', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 45', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 46', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 47', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 48', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 49', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 50', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 51', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 52', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 53', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 54', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 55', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 56', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 57', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 58', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 59', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 60', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 61', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 62', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 63', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 64', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 65', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 66', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 67', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 68', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 69', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 70', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 71', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 72', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 73', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 74', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 75', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 76', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 77', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 78', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 79', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 80', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 81', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 82', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 83', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 84', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 85', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 86', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 87', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 88', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 89', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 90', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 91', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 92', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 93', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 94', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 95', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 96', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 97', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 98', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 99', time: '11:50 AM'},
		{icon: '@../assets/ic_list_message.svg', subject: 'Subject 100', time: '11:50 AM'}
	]
});

DataListSample.DataListPanel = DataListPanel;
