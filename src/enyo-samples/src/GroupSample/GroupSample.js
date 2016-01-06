var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Checkbox = require('enyo/Checkbox'),
	Control = require('enyo/Control'),
	Group = require('enyo/Group');

module.exports = kind({
	name: 'enyo.sample.GroupSample',
	classes: 'group-sample',
	kind: Control,
	components: [
		{content: 'Grouped Buttons', classes: 'section'},
		{kind: Group, onActiveChanged: 'handleActiveChanged', classes: 'grouping', components: [
			{kind: Button, content: 'Button 1'},
			{kind: Button, content: 'Button 2'},
			{kind: Button, content: 'Button 3'}
		]},
		{content: 'Grouped Checkboxes', classes: 'section'},
		{kind: Group, onActiveChanged: 'handleActiveChanged', classes: 'grouping', components: [
			{tag: 'label', components: [
				{kind: Checkbox, content: 'Checkbox 1'}
			]},
			{tag: 'label', components: [
				{kind: Checkbox, content: 'Checkbox 2'}
			]},
			{tag: 'label', components: [
				{kind: Checkbox, content: 'Checkbox 3'}
			]}
		]},
		{content: 'Named Grouped Buttons', classes: 'section'},
		{kind: Group, onActiveChanged: 'handleActiveChanged', classes: 'grouping', groupName: 'buttonGroup', components: [
			{kind: Button, content: 'Named Button 1', groupName: 'buttonGroup'},
			{kind: Button, content: 'Named Button 2 (excluded)'},
			{kind: Button, content: 'Named Button 3', groupName: 'buttonGroup'}
		]},
		{content: 'Multiple Active Grouped Checkboxes', classes: 'section'},
		{kind: Group, onActivate: 'handleActivate', classes: 'grouping', highlander: false, components: [
			{tag: 'label', components: [
				{kind: Checkbox, content: 'Multi Checkbox 1'}
			]},
			{tag: 'label', components: [
				{kind: Checkbox, content: 'Multi Checkbox 2'}
			]},
			{tag: 'label', components: [
				{kind: Checkbox, content: 'Multi Checkbox 3'}
			]}
		]},
		{content: 'Multiple Active Grouped Buttons', classes: 'section'},
		{kind: Group, onActivate: 'handleActivate', classes: 'grouping', highlander: false, components: [
			{kind: Button, content: 'Multi Button 1'},
			{kind: Button, content: 'Multi Button 2'},
			{kind: Button, content: 'Multi Button 3'}
		]},
		{name: 'results', classes: 'results'}
	],
	handleActiveChanged: function (sender, ev) {
		this.updateResults([
			{content: 'The \'' + ev.active.getContent() + '\' control is active.'}
		]);
		return true;
	},
	handleActivate: function (sender, ev) {
		if (ev.originator.getActive()) {
			this.updateResults([
				{content: 'The \'' + ev.originator.getContent() + '\' control is newly active in the group.'}
			]);
		}
		return true;
	},
	updateResults: function (comps) {
		this.$.results.destroyClientControls();
		this.$.results.createComponents(comps);
		this.$.results.render();
	}
});
