var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	Button = require('moonstone/Button'),
	IconButton = require('moonstone/IconButton'),
	Item = require('moonstone/Item'),
	LightPanels = require('moonstone/LightPanels'),
	Scroller = require('moonstone/Scroller');

var controls = [
	{kind: Item, content: 'Control Item 1'},
	{kind: Item, content: 'Control Item 2'},
	{kind: Item, content: 'Control Item 3'},
	{kind: Item, content: 'Control Item 4'},
	{kind: Item, content: 'Control Item 5'},
	{kind: Item, content: 'Control Item 6'},
	{kind: Item, content: 'Control Item 7'},
	{kind: Item, content: 'Control Item 8'},
	{kind: Item, content: 'Control Item 9'}
];

var ControlPanel = kind({
	kind: LightPanels,
	cacheViews: false,
	popOnBack: false,
	wrap: true,
	orientation: LightPanels.Orientation.VERTICAL,
	direction: LightPanels.Direction.BACKWARDS,
	components: controls
});

var ControlContainer = kind({
	kind: Control,
	classes: 'control-container',
	panelId: 0,
	components: [
		{kind: Control, components: [
			{kind: IconButton, icon: 'arrowlargedown', ontap: 'prevIconTapped'},
			{kind: IconButton, icon: 'arrowlargeup', ontap: 'nextIconTapped'}
		]},
		{kind: ControlPanel, name: 'controlPanel', classes: 'control-panel'}
	],
	bindings: [
		{from: 'panelId', to: '$.controlPanel.index', transform: function (id) {
			// clamping id such that we have a valid value
			return id < controls.length ? id : controls.length - 1;
		}}
	],
	prevIconTapped: function (sender, ev) {
		this.$.controlPanel.previous();
		return true;
	},
	nextIconTapped: function (sender, ev) {
		this.$.controlPanel.next();
		return true;
	}
});

module.exports = kind({
	name: 'moon.sample.LightPanelsSample',
	classes: 'moon enyo-fit enyo-unselectable moon-light-panels-sample',
	kind: Control,
	components: [
		{kind: LightPanels, name: 'panels'}
	],
	rendered: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.pushSinglePanel(true);
		};
	}),
	pushSinglePanel: function (direct) {
		var panels = this.$.panels,
			id = panels.getPanels().length;

		panels.pushPanel({
			classes: 'light-panel',
			panelId: 'panel-' + id,
			title: 'This is the extended and long title of panel ' + id,
			headerComponents: [
				{
					kind: Button,
					content: 'Back',
					small: true,
					ontap: 'prevTapped'
				}
			],
			clientComponents: [
				{kind: ControlContainer, panelId: id},
				{kind: Scroller, classes: 'panel-scroller', components: [
					{kind: Item, content: 'Item One', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Two', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Three', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Four', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Five', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Six', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Seven', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Eight', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Nine', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Eleven', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Twelve', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Thirteen', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Fourteen', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Fifteen', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Sixteen', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Seventeen', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Eighteen', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Nineteen', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Twenty', ontap: 'nextTapped'}
				]}
			]
		}, {owner: this}, {direct: direct});
	},
	prevTapped: function (sender, ev) {
		this.$.panels.previous();
		return true;
	},
	nextTapped: function (sender, ev) {
		this.pushSinglePanel();
		return true;
	}
});
