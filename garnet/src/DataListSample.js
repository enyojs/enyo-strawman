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

var svg = 'data:image/svg+xml;base64,' +
	'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEF' +
	'kb2JlIElsbHVzdHJhdG9yIDE1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb2' +
	'46IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU' +
	'1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcx' +
	'MS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d' +
	'3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveG' +
	'xpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSI2MHB4IiBoZWlnaHQ9IjYwcHgiIHZpZXdCb' +
	'3g9IjAgMCA0OCA0OCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNDggNDgiIHhtbDpzcGFj' +
	'ZT0icHJlc2VydmUiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9' +
	'kZCIgZmlsbD0iIzc2NzY3NiIgZD0iTTQ0LjAwMSw0NUM0NC41NTMsNDUsNDUsNDQuNTUzLDQ1LD' +
	'Q0LjAwMVY0CgljMC0wLjU1Mi0wLjQ0Ny0xLTAuOTk5LTFINEMzLjQ0NywzLDMsMy40NDcsMyw0d' +
	'jQwLjAwMUMzLDQ0LjU1MywzLjQ0Nyw0NSw0LDQ1SDQ0LjAwMXoiLz4KPHJlY3QgeD0iNCIgeT0i' +
	'NCIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNGRkZGRkY' +
	'iIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIvPgo8cGF0aCBmaWxsPSIjQzBDMEMwIiBkPSJNMjQuOD' +
	'IyLDEyLjI5MWMtMC4xODctMC4yNjctMC40OS0wLjQyNS0wLjgxNi0wLjQyNmMtMC4zMjQsMC0wL' +
	'jYyOSwwLjE1OC0wLjgxNywwLjQyM0w0LjE4NSwzOQoJQzQuMDY1LDM5LjE2OCw0LDM5LjM3MSw0' +
	'LDM5LjU3N3YzLjQyMkM0LDQzLjU1Miw0LjQ0OCw0NCw1LDQ0aDM3Ljk5OUM0My41NTIsNDQsNDQ' +
	'sNDMuNTUyLDQ0LDQyLjk5OXYtMy40MjUKCWMwLTAuMjA3LTAuMDYzLTAuNDA2LTAuMTgzLTAuNT' +
	'c0TDI0LjgyMiwxMi4yOTF6Ii8+Cjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMjQuM' +
	'DA1LDEyLjg2NSA0LDQxIDQsNDQgNDQsNDQgNDQsNDEgIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZl' +
	'bm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjQUI4NDFBIiBkPSJNMjMuMjgsMzEuNDc' +
	'xTDMuMjcsMTAuNDMxQzMuMDkzLDEwLjI0NCwzLDkuOTk4LDMsOS43NDJWMy45OTUKCUMzLDMuND' +
	'QyLDMuNDQyLDMsMy45OTUsM2g0MC4wMUM0NC41NTgsMyw0NSwzLjQ0Miw0NSwzLjk5NXY1LjY0N' +
	'mMwLDAuMjU2LTAuMDk0LDAuNTAxLTAuMjY5LDAuNjg4TDI0LjczLDMxLjQ2OQoJYy0wLjE4OCww' +
	'LjE5OS0wLjQ0OSwwLjMxMy0wLjcyNSwwLjMxM0MyMy43MzEsMzEuNzgyLDIzLjQ2OSwzMS42Njk' +
	'sMjMuMjgsMzEuNDcxIi8+Cjxwb2x5Z29uIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPS' +
	'JldmVub2RkIiBmaWxsPSIjRkZDODM0IiBwb2ludHM9IjQ0LjAwNSw5LjY0MSAyNC4wMDUsMzAuN' +
	'zgxIDMuOTk1LDkuNzQyIDMuOTk1LDMuOTk1Cgk0NC4wMDUsMy45OTUgNDQuMDA1LDkuNjQxICIv' +
	'Pgo8L3N2Zz4=';

var DataListItem = kind({
	name: 'g.sample.DataListItem',
	kind: Item,
	border: true,
	classes: 'g-sample-datalist-item',
	components: [
		{name: 'icon', kind: Icon, style: 'background-image: url(' + svg + ');', classes: 'g-sample-datalist-item-icon', accessibilityLabel: 'message icon'},
		{name: 'subject', mixins: [MarqueeSupport], classes: 'g-sample-datalist-item-subject'},
		{name: 'time', mixins: [MarqueeSupport], classes: 'g-sample-datalist-item-time'}
	],
	bindings: [
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
			fixedChildSize: 137,
			classes: 'g-sample-datalist-list',
			headerComponents: [
				{name: 'title', kind: Title, content: 'Title'}
			],
			components: [
				{kind: DataListItem, ontap: 'itemTap'}
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
	],
	stopMarquee: function() {
		this.$.title.stopMarquee();
		this.$.list.stopMarquee();
	},
	itemTap: function() {
		if (data[arguments[1].index].subject === 'GoBack') {
			global.history.go(-1);
		}
		return true;
	}
});

var DataListSample = module.exports = kind({
	name: 'g.sample.DataListSample',
	classes: 'enyo-unselectable enyo-fit garnet g-sample g-sample-datalist',
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
			this.collection = new Collection(data);
		};
	}),
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});

var data = [
	{subject: 'Subj 1', time: '11:50 AM'},
	{subject: 'Subj 2', time: '11:50 AM'},
	{subject: 'Subj 3', time: '11:50 AM'},
	{subject: 'Subj 4', time: '11:50 AM'},
	{subject: 'GoBack', time: '11:50 AM'},
	{subject: 'Subj 6', time: '11:50 AM'},
	{subject: 'Subj 7', time: '11:50 AM'},
	{subject: 'Subj 8', time: '11:50 AM'},
	{subject: 'Subj 9', time: '11:50 AM'},
	{subject: 'Subj 10', time: '11:50 AM'},
	{subject: 'Subj 11', time: '11:50 AM'},
	{subject: 'Subj 12', time: '11:50 AM'},
	{subject: 'Subj 13', time: '11:50 AM'},
	{subject: 'Subj 14', time: '11:50 AM'},
	{subject: 'Subj 15', time: '11:50 AM'},
	{subject: 'Subj 16', time: '11:50 AM'},
	{subject: 'Subj 17', time: '11:50 AM'},
	{subject: 'Subj 18', time: '11:50 AM'},
	{subject: 'Subj 19', time: '11:50 AM'},
	{subject: 'Subj 20', time: '11:50 AM'},
	{subject: 'Subj 21', time: '11:50 AM'},
	{subject: 'Subj 22', time: '11:50 AM'},
	{subject: 'Subj 23', time: '11:50 AM'},
	{subject: 'Subj 24', time: '11:50 AM'},
	{subject: 'Subj 25', time: '11:50 AM'},
	{subject: 'Subj 26', time: '11:50 AM'},
	{subject: 'Subj 27', time: '11:50 AM'},
	{subject: 'Subj 28', time: '11:50 AM'},
	{subject: 'Subj 29', time: '11:50 AM'},
	{subject: 'Subj 30', time: '11:50 AM'},
	{subject: 'Subj 31', time: '11:50 AM'},
	{subject: 'Subj 32', time: '11:50 AM'},
	{subject: 'Subj 33', time: '11:50 AM'},
	{subject: 'Subj 34', time: '11:50 AM'},
	{subject: 'Subj 35', time: '11:50 AM'},
	{subject: 'Subj 36', time: '11:50 AM'},
	{subject: 'Subj 37', time: '11:50 AM'},
	{subject: 'Subj 38', time: '11:50 AM'},
	{subject: 'Subj 39', time: '11:50 AM'},
	{subject: 'Subj 40', time: '11:50 AM'},
	{subject: 'Subj 41', time: '11:50 AM'},
	{subject: 'Subj 42', time: '11:50 AM'},
	{subject: 'Subj 43', time: '11:50 AM'},
	{subject: 'Subj 44', time: '11:50 AM'},
	{subject: 'Subj 45', time: '11:50 AM'},
	{subject: 'Subj 46', time: '11:50 AM'},
	{subject: 'Subj 47', time: '11:50 AM'},
	{subject: 'Subj 48', time: '11:50 AM'},
	{subject: 'Subj 49', time: '11:50 AM'},
	{subject: 'Subj 50', time: '11:50 AM'},
	{subject: 'Subj 51', time: '11:50 AM'},
	{subject: 'Subj 52', time: '11:50 AM'},
	{subject: 'Subj 53', time: '11:50 AM'},
	{subject: 'Subj 54', time: '11:50 AM'},
	{subject: 'Subj 55', time: '11:50 AM'},
	{subject: 'Subj 56', time: '11:50 AM'},
	{subject: 'Subj 57', time: '11:50 AM'},
	{subject: 'Subj 58', time: '11:50 AM'},
	{subject: 'Subj 59', time: '11:50 AM'},
	{subject: 'Subj 60', time: '11:50 AM'},
	{subject: 'Subj 61', time: '11:50 AM'},
	{subject: 'Subj 62', time: '11:50 AM'},
	{subject: 'Subj 63', time: '11:50 AM'},
	{subject: 'Subj 64', time: '11:50 AM'},
	{subject: 'Subj 65', time: '11:50 AM'},
	{subject: 'Subj 66', time: '11:50 AM'},
	{subject: 'Subj 67', time: '11:50 AM'},
	{subject: 'Subj 68', time: '11:50 AM'},
	{subject: 'Subj 69', time: '11:50 AM'},
	{subject: 'Subj 70', time: '11:50 AM'},
	{subject: 'Subj 71', time: '11:50 AM'},
	{subject: 'Subj 72', time: '11:50 AM'},
	{subject: 'Subj 73', time: '11:50 AM'},
	{subject: 'Subj 74', time: '11:50 AM'},
	{subject: 'Subj 75', time: '11:50 AM'},
	{subject: 'Subj 76', time: '11:50 AM'},
	{subject: 'Subj 77', time: '11:50 AM'},
	{subject: 'Subj 78', time: '11:50 AM'},
	{subject: 'Subj 79', time: '11:50 AM'},
	{subject: 'Subj 80', time: '11:50 AM'},
	{subject: 'Subj 81', time: '11:50 AM'},
	{subject: 'Subj 82', time: '11:50 AM'},
	{subject: 'Subj 83', time: '11:50 AM'},
	{subject: 'Subj 84', time: '11:50 AM'},
	{subject: 'Subj 85', time: '11:50 AM'},
	{subject: 'Subj 86', time: '11:50 AM'},
	{subject: 'Subj 87', time: '11:50 AM'},
	{subject: 'Subj 88', time: '11:50 AM'},
	{subject: 'Subj 89', time: '11:50 AM'},
	{subject: 'Subj 90', time: '11:50 AM'},
	{subject: 'Subj 91', time: '11:50 AM'},
	{subject: 'Subj 92', time: '11:50 AM'},
	{subject: 'Subj 93', time: '11:50 AM'},
	{subject: 'Subj 94', time: '11:50 AM'},
	{subject: 'Subj 95', time: '11:50 AM'},
	{subject: 'Subj 96', time: '11:50 AM'},
	{subject: 'Subj 97', time: '11:50 AM'},
	{subject: 'Subj 98', time: '11:50 AM'},
	{subject: 'Subj 99', time: '11:50 AM'},
	{subject: 'Subj100', time: '11:50 AM'}
];

DataListSample.DataListPanel = DataListPanel;
