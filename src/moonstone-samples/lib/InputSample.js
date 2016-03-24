var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	Icon = require('moonstone/Icon'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	RichText = require('moonstone/RichText'),
	Scroller = require('moonstone/Scroller'),
	TextArea = require('moonstone/TextArea');

module.exports = kind({
	name: 'moon.sample.InputSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit moon-input-sample',
	components: [
		{kind: Divider, content: 'Inputs'},
		{kind: Scroller, horizontal: 'hidden', fit: true, components: [
			{components: [
				{kind: InputDecorator, components: [
					{kind: Input, placeholder: 'JUST TYPE', oninput:'handleInput', onchange:'handleChange'}
				]},
				{kind: InputDecorator, components: [
					{kind: Input, placeholder: 'Search term', oninput:'handleInput', onchange:'handleChange'},
					{kind: Icon, icon: 'search'}
				]}
			]},
			{components: [
				{kind: InputDecorator, components: [
					{kind: Input, type:'password', placeholder: 'Enter password', oninput:'handleInput', onchange:'handleChange'}
				]},
				{kind: InputDecorator, components: [
					{kind: Input, type:'number', placeholder: 'Enter number', oninput:'handleInput', onchange:'handleChange'}
				]},
				{kind: InputDecorator, components: [
					{kind: Input, placeholder: 'Placeholder for initial value', value: 'This is the initial value', oninput:'handleInput', onchange:'handleChange'}
				]}
			]},
			{components: [
				{kind: InputDecorator, components: [
					{kind: Input, placeholder: 'Placeholder for value with ellipsis', value: 'This is the initial value that is of a certain length to display an ellipsis.', oninput:'handleInput', onchange:'handleChange'}
				]},
				{kind: InputDecorator, components: [
					{kind: Input, placeholder: 'Dismiss on Enter', dismissOnEnter:true, oninput:'handleInput', onchange:'handleChange'}
				]},
				{kind: InputDecorator, disabled: true, components: [
					{kind: Input, disabled: true, placeholder: 'Disabled input'}
				]}
			]},
			{kind: Divider, content: 'TextAreas'},
			{kind: InputDecorator, components: [
				{kind: TextArea, placeholder: 'Enter text here', oninput: 'handleInput', onchange: 'handleChange'}
			]},
			{kind: InputDecorator, components: [
				{kind: TextArea, placeholder: 'JUST TYPE', oninput: 'handleInput', onchange: 'handleChange'}
			]},
			{kind: InputDecorator, disabled: true, components: [
				{kind: TextArea, disabled: true, placeholder: 'Deactivated TextArea', oninput: 'handleInput', onchange: 'handleChange'}
			]},

			{kind: Divider, content: 'RichTexts'},
			{kind: InputDecorator, components: [
				{kind: RichText, oninput: 'handleInput', onchange: 'handleChange'}
			]},
			{kind: InputDecorator, components: [
				{kind: RichText, style: 'width: 240px;', oninput: 'handleInput', onchange: 'handleChange'},
				{kind: Icon, icon: 'search'}
			]},
			{kind: InputDecorator, disabled: true, components: [
				{kind: RichText, disabled: true, style: 'width: 240px;'}
			]},

			{kind: Divider, content: 'Range Inputs'},
			{classes: 'range-inputs', components: [
				{name: 'rangeInput', kind: InputDecorator, invalidMessage: 'Please enter a number between 25 and 100.', components: [
					{kind: Input, placeholder: 'Enter a number', type: 'number', attributes: { min: 25, max: 100 }, style: 'width: 300px;', onchange:'handleChange', oninput:'handleRangeInput'}
				]},
				{name: 'zipCodeInput', kind: InputDecorator, invalidMessage: 'Please enter a 5 digit zip code.', components: [
					{kind: Input, placeholder: 'Enter a zip code', type: 'number', style: 'width: 300px;', onchange:'handleChange', oninput:'handleZipInput'}
				]},
				{name: 'nameInput', kind: InputDecorator, invalid: true, invalidMessage: 'Please enter a name.', components: [
					{kind: Input, style: 'width: 300px;', onchange:'handleChange', oninput:'handleNameInput'}
				]}
			]}
		]},
		{kind: Divider, content: 'Result', classes: 'moon-input-sample-result'},
		{kind: BodyText, name: 'console', allowHtml: false, content: 'Input: '},
		{kind: Divider, content: 'Bottom-aligned inputs', classes: 'moon-input-sample-result'},
		{components: [
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'Bottom', oninput: 'handleInput', onchange: 'handleChange'}
			]},
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'Aligned', oninput: 'handleInput', onchange: 'handleChange'}
			]},
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'Inputs', oninput: 'handleInput', onchange: 'handleChange'}
			]}
		]}
	],
	handleInput: function (sender, ev) {
		this.$.console.setContent('Input: ' + sender.getValue());
	},
	handleChange: function (sender, ev) {
		this.$.console.setContent('Changed: ' + sender.getValue());
	},
	handleRangeInput: function (sender, ev) {
		this.$.rangeInput.set('invalid', !ev.target.validity.valid);
	},
	handleZipInput: function (sender, ev) {
		var value = ev.target.value,
			length = value ? value.length : 0;
		this.$.zipCodeInput.set('invalid', length !== 0 && length !== 5);
	},
	handleNameInput: function (sender, ev) {
		var value = ev.target.value,
			length = value && value.length,
			control = this.$.nameInput;
		if (!value) {
			control.set('invalidMessage', 'Please enter a name.');
			control.set('invalid', true);
		} else if (length < 3) {
			control.set('invalidMessage', 'Please enter a name that is at least 3 characters.');
			control.set('invalid', true);
		} else {
			control.set('invalid', false);
		}
	}
});
