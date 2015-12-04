require('garnet');

var
	kind = require('enyo/kind'),
	Group = require('enyo/Group'),
	ToggleButton = require('garnet/ToggleButton'),
	Panel = require('garnet/Panel');

var ToggleButtonPanel = kind({
	name: 'g.sample.ToggleButtonPanel',
	kind: Panel,
	events: {
		onResult: ''
	},
	classes: 'g-layout-absolute-wrapper',
	components: [
		{classes: 'g-layout-absolute-center g-sample-toggle-button-container', components: [
			{kind: ToggleButton, value: true, content: 'Toggle', ontap: 'tapButton'},
			{kind: ToggleButton, disabled: true, content: 'Disabled', ontap: 'tapButton'},
			{content: 'Grouped ToggleButtons : ', classes: 'g-sample-text'},
			{kind: Group, components: [
				{kind: ToggleButton, active: true, content: 'AA', ontap: 'tapButton'},
				{kind: ToggleButton, content: 'BB', ontap: 'tapButton'}
			]}
		]}
	],
	tapButton: function(inSender, inEvent) {
		var str = '"'+inSender.content+'" ' + (inSender.getActive() ? 'selected' : 'unselected') + '.';
		this.doResult({msg: str});
	}
});

module.exports = kind({
	name: 'g.sample.ToggleButtonSample',
	classes: 'enyo-unselectable garnet g-sample g-sample-toggle-button',
	components: [
		{content: '< Toggle Button Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Toggle Buttons', classes: 'g-sample-subheader'},
		{kind: ToggleButtonPanel, classes: 'g-sample-circle-panel', onResult: 'result'},

		{classes: 'g-sample-result', components: [
			{content: 'Result', classes: 'g-sample-subheader'},
			{name: 'result', allowHtml: true, content: 'No action yet', classes: 'g-sample-description'}
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
