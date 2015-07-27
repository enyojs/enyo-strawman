var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	Button = require('moonstone/Button'),
	Item = require('moonstone/Item'),
	LightPanels = require('moonstone/LightPanels'),
	Scroller = require('moonstone/Scroller');

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
			title: 'Panel ' + id,
			headerComponents: [
				{
					kind: Button,
					content: 'Back',
					small: true,
					ontap: 'prevTapped'
				}
			],
			clientComponents: [
				{kind: Scroller, style: 'height:800px', components: [
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
