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
	style: 'border-radius: 50%; background-color: #000000;',
	components: [
		{classes: 'g-layout-absolute-center g-sample-setting', style: 'width: ' + ri.scale(255) + 'px; height: ' + ri.scale(230) + 'px;', components: [
			{content: 'Checkboxes : ', style: 'margin-left: ' + ri.scale(10) + 'px; font-size: ' + ri.scale(20) + 'px; display: inline-block; margin-right: ' + ri.scale(10) + 'px; color: #FFFFFF;'},
			{tag: 'br'},
			{kind: Checkbox, onchange:'checkboxChanged'},
			{kind: Checkbox, onchange:'checkboxChanged', checked: true},
			{kind: Checkbox, onchange:'checkboxChanged', disabled: true},
			{kind: Checkbox, onchange:'checkboxChanged', checked: true, disabled: true},
			{content: 'Grouped Checkboxes : ', style: 'font-size: ' + ri.scale(20) + 'px; display: inline-block; margin-right: ' + ri.scale(10) + 'px; color: #FFFFFF;'},
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
			var ordinals = ['1st', '2nd', '3rd'],
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
		{kind: CheckboxPanel, style: 'position: relative;', onResult: 'result'},

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
