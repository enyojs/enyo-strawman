var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows');

var
	Button = require('moonstone/Button'),
	IconButton = require('moonstone/IconButton'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	Tooltip = require('moonstone/Tooltip'),
	TooltipDecorator = require('moonstone/TooltipDecorator');

module.exports = kind({
	name: 'moon.sample.TooltipSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		//Top row of buttons
		{classes: 'moon-5v', components:[
			{kind: TooltipDecorator, components: [
				{kind: Button, disabled: true, centered: true, content: 'Left Tooltip'},
				{kind: Tooltip, content: 'I\'m a left tooltip.', position: 'above'}
			]},

			{kind: TooltipDecorator, classes: 'right', components: [
				{kind: Button, content: 'Right Tooltip'},
				{name: 'toolTip', kind: Tooltip, uppercase: false, content: 'I\'m a right tooltip.'}
			]}
		]},
		//Second row of buttons
		{classes: 'moon-5v', components:[
			{kind: TooltipDecorator, components: [
				{kind: Button, small: true, content: 'Multiline Left Tooltip'},
				{kind: Tooltip, components: [
					{content: 'I\'m a left tooltip.'},
					{content: 'With a second line of content'}
				]}
			]},

			{kind: TooltipDecorator, classes: 'right', components: [
				{kind: Button, small: true, content: 'Multiline Right'},
				{kind: Tooltip, position: 'above', components: [
					{content: 'I\'m a right tooltip that is rather long and forces a line break.', style: 'width: 300px; white-space: normal'}
				]}
			]}
		]},
		//Third row of buttons
		{classes: 'moon-5v', components:[
			{kind: TooltipDecorator, components: [
				{kind: Button, small: true, content: 'Item with Left Floating Tooltip'},
				{kind: Tooltip, floating: true, content: 'I\'m a left floating tooltip.'}
			]},

			{kind: TooltipDecorator, classes: 'right', components: [
				{kind: Button, disabled: true, small: true, content: 'Item with Right Floating Tooltip'},
				{name: 'toolTipFloating', floating: true, kind: Tooltip, position: 'above', content: 'I\'m a right floating tooltip.'}
			]}
		]},
		//Fourth row of buttons
		{fit: true, components:[
			{kind: TooltipDecorator, components: [
				{kind: InputDecorator, components: [
					{kind: Input, style: 'width: 130px;', placeholder: 'Above'}
				]},
				{kind: Tooltip, floating: true, content: 'I\'m a tooltip for an input.', position: 'above'}
			]},

			{kind: TooltipDecorator, classes: 'right', components: [
				{kind: InputDecorator, components: [
					{kind: Input, style: 'width: 130px;', placeholder: 'Below'}
				]},
				{kind: Tooltip, content: 'I\'m a tooltip for an input.', position: 'below'}
			]}
		]},
		//Bottom row of buttons
		{components:[
			{kind: TooltipDecorator, components: [
				{kind: IconButton, src: '@../assets/icon-button-enyo-logo.png'},
				{kind: Tooltip, floating: true, content: 'Floating tooltip for an IconButton.'}
			]},

			{kind: TooltipDecorator, classes: 'right', components: [
				{kind: IconButton, src: '@../assets/icon-button-enyo-logo.png'},
				{kind: Tooltip, floating: false, content: 'I\'m a tooltip for an IconButton.'}
			]}
		]}
	]
});