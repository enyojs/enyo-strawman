var
	kind = require('enyo/kind');

var
	Checkbox = require('enyo/Checkbox'),
	Group = require('enyo/Group');

module.exports = kind({
	name: 'enyo.sample.CheckboxSample',
	classes: 'checkbox-sample',
	components: [
		{content: 'Checkboxes', classes: 'section'},
		{kind: Checkbox, content: 'Checkbox 1', onchange: 'checkboxChanged'},
		{kind: Checkbox, content: 'Checkbox 2', onchange: 'checkboxChanged'},
		{kind: Checkbox, content: 'Checkbox 3', onchange: 'checkboxChanged'},
		{content: 'Grouped Checkboxes', classes: 'section'},
		{kind: Group, onActivate: 'groupActivated', components: [
			{kind: Checkbox, content: 'Grouped Checkbox 1'},
			{kind: Checkbox, content: 'Grouped Checkbox 2'},
			{kind: Checkbox, content: 'Grouped Checkbox 3'}
		]},
		{name: 'results', classes: 'results'}
	],
	checkboxChanged: function (sender, ev) {
		this.updateResult({content: 'The \'' + ev.originator.getContent() + '\' checkbox is ' + (sender.getChecked() ? 'checked': 'unchecked') + '.'});
	},
	groupActivated: function (sender, ev) {
		if (ev.originator.getActive()) {
			this.updateResult({content: 'The \'' + ev.originator.getContent() + '\' checkbox is selected.'});
		}
	},
	updateResult: function (comps) {
		this.$.results.destroyClientControls();
		this.$.results.createComponent(comps);
		this.$.results.render();
	}
});
