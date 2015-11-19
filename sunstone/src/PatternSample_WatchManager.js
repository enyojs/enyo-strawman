var
	kind = require('enyo/kind'),
	Image = require('enyo/Image');

var
	FittableRows = require('layout/FittableRows');

var
	Checkbox = require('sunstone/Checkbox'),
	Header = require('sunstone/Header'),
	Scroller = require('sunstone/Scroller'),
	ToastPopup = require('sunstone/ToastPopup'),
	ToggleButton = require('sunstone/ToggleButton'),
	IconButton = require('sunstone/IconButton');

module.exports = kind({
	name: 'sun.sample.WatchManagerSample',
	kind: FittableRows,
	classes: 'watchmanager-sample enyo-unselectable enyo-fit',
	components: [
		{kind: Header, title: 'Watch Manager'},
		{classes: 'imageArea', components: [
			{kind: Image, src: '@../assets/ic_list_ring.png'}
		]},
		{kind: Scroller, fit: true, classes: 'settingList', components: [
			{classes: 'general-index', content: 'CATEGORY 1'},
			{classes: 'setting-container', components: [
				{classes: 'content-area', components: [
					{content: 'Setting 1', classes: 'main-content'},
					{content: 'Description', classes: 'sub-content'}
				]},
				{classes: 'setting-checkbox', components: [
					{kind: Checkbox, checked: true, value: 'setting1', onchange: 'itemChanged'}
				]}
			]},
			{classes: 'divider'},
			{classes: 'setting-container', components: [
				{classes: 'content-area', components: [
					{content: 'Setting 2', classes: 'main-content'},
					{content: 'Description1', classes: 'sub-content'},
					{content: 'Description2', classes: 'sub-content'}
				]}
			]},

			{classes: 'general-index', content: 'CATEGORY 2'},
			{classes: 'setting-container', components: [
				{classes: 'content-area', components: [
					{content: 'Setting 3', classes: 'main-content'},
					{content: 'Description', classes: 'sub-content'}
				]},
				{classes: 'setting-toggle', components: [
					{kind: ToggleButton, active: true, value: 'setting3', onChange: 'toggleChanged'}
				]}
			]},
			{classes: 'divider'},
			{classes: 'setting-container', style: 'height: 64px;', components: [
				{classes: 'setting4-checkbox', components: [
					{kind: Checkbox, checked: true, value: 'setting3', onchange: 'itemChanged'}
				]},
				{classes: 'content-area', components: [
					{content: 'Setting 3', classes: 'main-content'}
				]},
				{classes: 'setting4-iconbutton', components: [
					{kind: IconButton, src: '@../assets/btn_setting.svg', value: 'setting3', ontap: 'buttonTapped'}
				]}
			]},

			{classes: 'general-index', content: 'CATEGORY 3'},
			{classes: 'setting-container', components: [
				{classes: 'content-area',components:[
					{content: 'Setting 4', classes: 'main-content'},
					{content: 'Setting Test ', classes: 'main-content'},
					{content: 'Description1', classes: 'sub-content'},
					{content: 'Description2', classes: 'sub-content'}
				]},
				{classes: 'setting-checkbox', components: [
					{kind: Checkbox, checked: true, value: 'setting4', onchange: 'itemChanged'}
				]}
			]}
		]},
		{name: 'toastpopup', kind: ToastPopup, showDuration: 2000, content: 'Hello toastpopup!'}
	],
	itemChanged: function (inSender, inEvent) {
		this.$.toastpopup.hide();
		this.$.toastpopup.setContent(inEvent.originator.value + ' changed.');
		this.$.toastpopup.show();
	},
	toggleChanged: function (inSender, inEvent) {
		if (inEvent.active && this.$.toastpopup) {
			this.$.toastpopup.hide();
			this.$.toastpopup.setContent(inEvent.originator.value + ' toggle on.');
			this.$.toastpopup.show();
		}
	},
	buttonTapped: function (inSender, inEvent) {
		this.$.toastpopup.hide();
		this.$.toastpopup.setContent(inEvent.originator.value + ' pressed.');
		this.$.toastpopup.show();
	}
});