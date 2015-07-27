var
	kind = require('enyo/kind'),
	Repeater = require('enyo/Repeater');

var
	IconButton = require('moonstone/IconButton'),
	Item = require('moonstone/Item'),
	Panel = require('moonstone-extra/Panel'),
	Panels = require('moonstone-extra/Panels'),
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.HeaderAutoCollapsingSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Panels, classes: 'enyo-fit', pattern: 'activity', components: [
			{kind: Panel, collapsingHeader: true, title: 'Scroll Me', titleBelow: 'To test the auto-collapsing', subTitleBelow: 'Feature of moon.Panel', headerComponents: [
				{kind: IconButton, icon: 'check'},
				{kind: IconButton, icon: 'arrowlargeright'}
			], components: [
				{kind: Scroller, fit: true, components: [
					{kind: Repeater, count: 50, onSetupItem: 'setupItem', components: [
						{kind: Item, ontap: 'next'}
					]}
				]}
			]},
			{kind: Panel, collapsingHeader: true, title: 'Me too', titleBelow: 'Another header', subTitleBelow: 'That collapses on scroll', headerComponents: [
				{kind: IconButton, icon: 'check'},
				{kind: IconButton, icon: 'arrowlargeright'}
			], components: [
				{kind: Scroller, fit: true, components: [
					{kind: Repeater, count: 50, onSetupItem: 'setupItem', components: [
						{kind: Item, ontap: 'next'}
					]}
				]}
			]},
			{kind: Panel, collapsingHeader: true, title: 'Yet another', headerComponents: [
				{kind: IconButton, icon: 'check'},
				{kind: IconButton, icon: 'arrowlargeright'}
			], components: [
				{kind: Scroller, fit: true, components: [
					{kind: Repeater, count: 50, onSetupItem: 'setupItem', components: [
						{kind: Item, ontap: 'next'}
					]}
				]}
			]}
		]}
	],
	setupItem: function (sender, event) {
		event.item.$.item.setContent('Scrolling content ' + event.index);
	},
	next: function (sender) {
		this.$.panels.setIndex(this.$.panels.getPanelIndex(sender)+1);
	}
});