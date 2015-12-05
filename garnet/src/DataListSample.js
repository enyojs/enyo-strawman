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
		{name: 'subject', mixins: [MarqueeSupport], classes: 'g-sample-datalist-item-subject'},
		{name: 'time', mixins: [MarqueeSupport], classes: 'g-sample-datalist-item-time'}
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
			controlsPerPage: 3,
			classes: 'g-sample-datalist-list',
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
	classes: 'enyo-unselectable garnet g-sample g-sample-datalist',
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

var svg = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEF' + 
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

var data = [
	{icon: svg, subject: 'SubjectSubject 1', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 2', time: '11:50 AM'},
	{icon: svg, subject: 'Disabled', time: '11:50 AM', disabled: true},
	{icon: svg, subject: 'Looooooooong text', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 5', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 6', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 7', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 8', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 9', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 10', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 11', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 12', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 13', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 14', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 15', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 16', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 17', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 18', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 19', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 20', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 21', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 22', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 23', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 24', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 25', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 26', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 27', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 28', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 29', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 30', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 31', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 32', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 33', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 34', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 35', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 36', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 37', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 38', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 39', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 40', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 41', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 42', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 43', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 44', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 45', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 46', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 47', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 48', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 49', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 50', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 51', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 52', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 53', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 54', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 55', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 56', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 57', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 58', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 59', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 60', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 61', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 62', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 63', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 64', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 65', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 66', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 67', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 68', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 69', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 70', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 71', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 72', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 73', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 74', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 75', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 76', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 77', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 78', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 79', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 80', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 81', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 82', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 83', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 84', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 85', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 86', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 87', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 88', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 89', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 90', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 91', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 92', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 93', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 94', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 95', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 96', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 97', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 98', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 99', time: '11:50 AM'},
	{icon: svg, subject: 'SubjectSubject 100', time: '11:50 AM'}
];

DataListSample.DataListPanel = DataListPanel;
