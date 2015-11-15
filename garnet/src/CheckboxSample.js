require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Group = require('enyo/Group'),
	Checkbox = require('garnet/Checkbox'),
	Panel = require('garnet/Panel');

var CheckboxPanel = kind({
	name: 'g.sample.CheckboxPanel',
	kind: Panel,
	events: {
		onResult: ''
	},
	classes: 'g-layout-absolute-wrapper',
	components: [
		{classes: 'g-layout-absolute-center g-sample-setting', classes: 'g-sample-checkbox-container', components: [
			{content: 'Checkboxes : ', classes: 'g-sample-text'},
			{tag: 'br'},
			{kind: Checkbox, onchange:'checkboxChanged'},
			{kind: Checkbox, onchange:'checkboxChanged', checked: true},
			{kind: Checkbox, onchange:'checkboxChanged', disabled: true},
			{kind: Checkbox, onchange:'checkboxChanged', checked: true, disabled: true},
			{content: 'Grouped Checkboxes : ', classes: 'g-sample-text'},
			{kind: Group, onActivate:'groupActivated', components: [
				{kind: Checkbox, checked: true},
				{kind: Checkbox},
				{kind: Checkbox}
			]}
		]}
	],
	checkboxChanged: function(inSender, inEvent) {
		this.doResult({msg: inSender.name + ' was ' + (inSender.getValue() ? ' selected.' : 'deselected.')});
	},
	groupActivated: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			var
				ordinals = ['1st', '2nd', '3rd'],
				selected = inEvent.originator.indexInContainer();
			this.doResult({msg: 'The ' + ordinals[selected] + ' checkbox in the group is selected.'});
		}
	}
});

module.exports = kind({
	name: 'g.sample.CheckboxSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< Checkbox Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Checkboxes', classes: 'g-sample-subheader'},
		{kind: CheckboxPanel, classes: 'g-sample-circle-panel', onResult: 'result'},

		{src: '@../assets/btn_command_next.svg', classes: 'g-sample-result', components: [
			{content: 'Result', classes: 'g-sample-subheader'},
			{name: 'result', allowHtml: true, content: 'No button pressed yet.', classes: 'g-sample-description'}
		]}
	],
	result: function(inSender, inEvent) {
		this.$.result.setContent(inEvent.msg);
	},
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
