var
	kind = require('enyo/kind');

var
	CardArranger = require('layout/CardArranger');

var
	Panels = require('moonstone-extra/Panels'),
	Item = require('moonstone/Item');

module.exports = kind({
	name: 'moon.sample.PanelsWithCardArrangerSample',
	classes: 'moon enyo-fit',
	components: [
		{name: 'panels', kind: Panels, arrangerKind: CardArranger, animate: false, classes: 'enyo-fit', components: [
			{title: 'First', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Second', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Third', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Fourth', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Fifth', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Sixth Panel with a very long title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Seventh', components: [
				{kind: Item, content: 'Item One'},
				{kind: Item, content: 'Item Two'},
				{kind: Item, content: 'Item Three'},
				{kind: Item, content: 'Item Four'},
				{kind: Item, content: 'Item Five'}
			]}
		]}
	],
	next: function (sender, ev) {
		this.$.panels.next();
		return true;
	}
});