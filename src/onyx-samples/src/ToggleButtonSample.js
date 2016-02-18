var
	kind = require('enyo/kind');

var
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	ToggleButton = require('onyx/ToggleButton'),
	Group = require('enyo/Group');

module.exports = kind({
	name: 'onyx.sample.ToggleButtonSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Toggle Buttons'},
		{classes: 'onyx-sample-tools', components: [
			{kind: ToggleButton, onChange: 'toggleChanged', value: true},
			{kind: ToggleButton, onChange: 'toggleChanged'},
			{kind: ToggleButton, onChange: 'toggleChanged'},
			{kind: ToggleButton, onChange: 'toggleChanged', value: true, disabled: true}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Toggle Buttons Group'},
		{kind: Group, classes: 'onyx-sample-tools group', onActivate: 'groupActivated', highlander: true, components: [
			{kind: ToggleButton},
			{kind: ToggleButton, value: true},
			{kind: ToggleButton}
		]},
		{tag: 'br'},
		{kind: Groupbox, classes: 'onyx-sample-result-box', components: [
			{kind: GroupboxHeader, content: 'Result'},
			{name: 'result', classes: 'onyx-sample-result', content: 'No button tapped yet.'}
		]}
	],
	toggleChanged: function (sender, ev) {
		this.$.result.setContent(sender.name + ' was ' + (sender.getValue() ? ' selected.' : 'deselected.'));
	},
	ordinals: ['1st', '2nd', '3rd'],
	groupActivated: function (sender, ev) {
		if (ev.originator.getActive()) {
			var selected = ev.originator.indexInContainer();
			this.$.result.setContent('The ' + this.ordinals[selected] + ' toggle button in the group is selected.');
		}
	}
});
