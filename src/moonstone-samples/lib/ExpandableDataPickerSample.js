var
	kind = require('enyo/kind');

var
	Collection = require('enyo/Collection'),
	Divider = require('moonstone/Divider'),
	ExpandableDataPicker = require('moonstone/ExpandableDataPicker'),
	FormCheckbox = require('moonstone/FormCheckbox'),
	Scroller = require('moonstone/Scroller'),
	FittableRows = require('layout/FittableRows');

module.exports = kind({
	name: 'moon.sample.ExpandableDataPickerSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, fit: true, components: [
			{name: 'picker1', kind: ExpandableDataPicker, content: 'Expandable Data Picker', noneText: 'Nothing Selected', components: [
				{bindings: [
					{from: 'model.label', to: 'content'}
				]}
			]},
			{name: 'picker2', kind: ExpandableDataPicker, content: 'Pre-selected Data Picker', noneText: 'Nothing Selected', components: [
				{bindings: [
					{from: 'model.label', to: 'content'},
					{from: 'model.active', to: 'active'}
				]}
			]},
			{kind: Divider, content:'Options'},
			{kind: FormCheckbox, content: 'Multiple Selection', prop: 'multipleSelection', onchange: 'checked'},
			{kind: FormCheckbox, content: 'Auto Collapse', prop: 'autoCollapseOnSelect', checked: true, onchange: 'checked'}
		]}
	],
	create: function () {
		FittableRows.prototype.create.apply(this, arguments);

		var c = new Collection([
			{label: 'first'},
			{label: 'second', active: true},
			{label: 'third'}
		]);
		this.$.picker1.set('collection', c);
		this.$.picker2.set('collection', c);
	},
	checked: function (sender, ev) {
		this.$.picker1.set(sender.prop, sender.checked);
		this.$.picker2.set(sender.prop, sender.checked);
	}
});