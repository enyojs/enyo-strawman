var
	kind = require('enyo/kind');

var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	Input = require('enyo/Input'),
	ToolDecorator = require('enyo/ToolDecorator');

module.exports = kind({
	name: 'enyo.sample.FittableAppLayout1',
	kind: FittableRows,
	classes: 'enyo-fit',
	components: [
		{kind: Control, classes: 'layout-sample-toolbar', components: [
			{content: 'Header'},
			{kind: Button, content: 'Button'},
			{kind: ToolDecorator, tag: 'label', components: [
				{kind: Input}
			]}
		]},
		{kind: FittableColumns, fit: true, components: [
			{classes: 'fittable-sample-column'},
			{kind: FittableRows, fit: true, classes: 'fittable-sample-shadow', components: [
				{classes: 'fittable-sample-row fittable-sample-shadow2'},
				{fit: true, classes: 'fittable-sample-fitting-color'}
			]}
		]}
	]
});