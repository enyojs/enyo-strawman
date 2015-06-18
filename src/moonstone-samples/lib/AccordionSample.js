var
	kind = require('enyo/kind'),
	Group = require('enyo/Group');

var
	Scroller = require('moonstone/Scroller'),
	Divider = require('moonstone/Divider'),
	Accordion = require('moonstone/Accordion'),
	Item = require('moonstone/Item'),
	SelectableItem = require('moonstone/SelectableItem');

module.exports = kind({
	name: 'moon.sample.AccordionSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, classes: 'enyo-fill moon-8h', components: [
			{kind: Divider, content: 'Not In Group'},
			{components: [
				{kind: Accordion, content: 'This is an accordion', components: [
					{kind: Item, content: 'Item One'},
					{kind: Item, content: 'Item Two'}
				]},
				{kind: Accordion, content: 'Pre-expanded accordion', open:true, components: [
					{kind: Item, content: 'Item Three'},
					{kind: Item, content: 'Item Four'}
				]},
				{kind: Accordion, content: 'This is an lonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnng title accordion', components: [
					{kind: Item, content: 'Looooooooooooooooooooooooooooooooooooong Item One'},
					{kind: Item, content: 'Loooooooooooooooooooooooooooooong Item Two'}
				]},
				{kind: Accordion, content: 'Disabled accordion', disabled: true, components: [
					{kind: Item, content: 'Item One'},
					{kind: Item, content: 'Item Two'}
				]}
			]},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'In Group'},
			{kind: Group, highlander:true, components: [
				{kind: Accordion, content: 'This is a grouped accordion', components: [
					{kind: Item, content: 'Item One'},
					{kind: Item, content: 'Item Two'}
				]},
				{kind: Accordion, open:true, content: 'This is another grouped accordion', components: [
					{kind: Item, content: 'Item Three'},
					{kind: Item, content: 'Item Four'}
				]},
				{kind: Accordion, content: 'This is another grouped accordion', components: [
					{kind: Item, content: 'Item Five'},
					{kind: Item, content: 'Item Six'}
				]},
				{kind: Accordion, content: 'This is another lonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnng title accordion', components: [
					{kind: Item, content: 'Looooooooooooooooooooooooooooooooooooong Item Three'},
					{kind: Item, content: 'Loooooooooooooooooooooooooooooong Item Four'}
				]}
			]},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'In Group using Grouped Selectable Items'},
			{kind: Group, groupName: 'menuItems', components: [
				{kind: Group, groupName: 'accordions', highlander:true, components: [
					{kind: Accordion, groupName: 'accordions', content: 'This is a grouped accordion', defaultKind: SelectableItem, components: [
						{kind: Item, content: 'Item One', groupName: 'menuItems'},
						{kind: Item, content: 'Item Two', groupName: 'menuItems'}
					]},
					{kind: Accordion, groupName: 'accordions', open:true, content: 'This is another grouped accordion', defaultKind: SelectableItem, components: [
						{kind: Item, content: 'Item Three', groupName: 'menuItems'},
						{kind: Item, content: 'Item Four', groupName: 'menuItems'}
					]},
					{kind: Accordion, groupName: 'accordions', content: 'This is another grouped accordion', defaultKind: SelectableItem, components: [
						{kind: Item, content: 'Item Five', groupName: 'menuItems'},
						{kind: Item, content: 'Item Six', groupName: 'menuItems'}
					]},
					{kind: Accordion, groupName: 'accordions', content: 'This is another lonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnng title accordion', defaultKind: SelectableItem, components: [
						{kind: Item, content: 'Looooooooooooooooooooooooooooooooooooong Item Three', groupName: 'menuItems'},
						{kind: Item, content: 'Loooooooooooooooooooooooooooooong Item Four', groupName: 'menuItems'}
					]}
				]}
			]}
		]}
	]
});