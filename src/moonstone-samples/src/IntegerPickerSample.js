var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	FormCheckbox = require('moonstone/FormCheckbox'),
	IntegerPicker = require('moonstone/IntegerPicker'),
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.IntegerPickerSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, fit: true, components: [
			{kind: Divider, content: 'Integer Picker'},
			{name: 'picker', kind: IntegerPicker, value: 2016, min: 1900, max: 2100, minWidth: 84, onChange: 'changed'},

			{kind: Divider, content: 'Options'},
			{kind: FormCheckbox, content: 'Animate', checked: true, prop: 'animate', onchange: 'checked'},
			{kind: FormCheckbox, content: 'Wrap', prop: 'wrap', onchange: 'checked'},
			{kind: FormCheckbox, content: 'Padding (5 digits)', onchange: 'paddingChecked'},
			{kind: FormCheckbox, content: 'Disabled', prop: 'disabled', onchange: 'checked'}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'value', content: 'No change yet'}
	],
	changed: function (sender, ev) {
		if (this.$.value) {
			this.$.value.setContent(ev.name + ' changed to ' + ev.value);
		}
	},
	checked: function (sender, ev) {
		this.$.picker.set(sender.prop, sender.checked);
	},
	paddingChecked: function (sender, ev) {
		this.$.picker.set('digits', sender.checked? 5 : null);
		this.$.picker.render();
	}
});