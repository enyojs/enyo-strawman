var
	kind = require('enyo/kind');

 var
 	FittableRows = require('layout/FittableRows'),
 	BodyText = require('moonstone/BodyText'),
 	Divider = require('moonstone/Divider'),
 	Item = require('moonstone/Item'),
 	IconButton = require('moonstone/IconButton'),
 	InputHeader = require('moonstone/InputHeader'),
 	Panel = require('moonstone/Panel'),
 	Panels = require('moonstone/Panels');

module.exports = kind({
	name: 'moon.sample.InputHeaderSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit moon-input-header-sample',
	components: [
		{name: 'panels', kind: Panels, pattern: 'activity', fit: true, components: [
			{
				kind: Panel,
				headerOptions: {kind: InputHeader, components: [
					{kind: IconButton, icon: 'check'},
					{kind: IconButton, icon: 'arrowlargeright'}
				]},
				onInputHeaderInput: 'handleInput',
				onInputHeaderChange: 'handleChange',
				title:'Input Header',
				titleAbove: '01',
				titleBelow: 'Sub Header',
				subTitleBelow: 'Sub-sub Header',
				components: [
					{kind: Item, content: 'Small Header Panel', ontap: 'nextPanel'}
				]
			},
			{
				kind: Panel,
				headerOptions: {kind: InputHeader, components: [
					{kind: IconButton, icon: 'check'},
					{kind: IconButton, icon: 'arrowlargeright'}
				]},
				onInputHeaderInput: 'handleInput',
				onInputHeaderChange: 'handleChange',
				headerType: 'medium',
				title:'Small Input Header',
				titleAbove: '02',
				titleBelow: 'Sub Header',
				subTitleBelow: 'Sub-sub Header'
			}
		]},
		{classes: 'moon-input-header-sample-result', components: [
			{kind: Divider, content: 'Result'},
			{kind: BodyText, name: 'console', content: 'Input: '}
		]}
	],
	nextPanel: function () {
		this.$.panels.next();
	},
	handleInput: function (sender, ev) {
		this.$.console.setContent('Input: ' + ev.originator.getValue());
		return true;
	},
	handleChange: function (sender, ev) {
		this.$.console.setContent('Change: ' + ev.originator.getValue());
		return true;
	}
});

module.exports.badgeClasses = 'deprecated';
