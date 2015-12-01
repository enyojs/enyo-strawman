require('garnet');

var
	kind = require('enyo/kind'),
	Group = require('enyo/Group'),
	Button = require('garnet/Button'),
	Panel = require('garnet/Panel');

var ButtonPanel = kind({
	name: 'g.sample.ButtonPanel',
	kind: Panel,
	events: {
		onResult: ''
	},
	classes: 'g-layout-absolute-wrapper',
	components: [
		{classes: 'g-sample-button-container g-layout-absolute-center', components: [
			{name: 'Button', kind: Button, content: 'Btn A', ontap: 'tapButton'},
			{name: 'B Button Disabled', kind: Button, content: 'Disabled', classes: 'g-sample-button-disable', disabled: true, ontap: 'tapButton'},
			{content: 'Fixed Button : ', classes: 'g-sample-text'},
			{name: 'Fixed Button', kind: Button, content: 'Fixed Button', classes: 'g-sample-button-fixed', ontap: 'tapButton'},
			{content: 'Grouped Buttons : ', classes: 'g-sample-text'},
			{kind: Group, components: [
				{name: 'Apple Button', kind: Button, active: true, content: 'AA', ontap: 'tapButton'},
				{name: 'Banana Button', kind: Button, content: 'BB', ontap: 'tapButton'}
			]}
		]}
	],
	tapButton: function(inSender, inEvent) {
		this.doResult({msg: '&quot;' + inSender.name + '&quot; pressed.'});
	}
});

module.exports = kind({
	name: 'g.sample.ButtonSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< Button Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Buttons', classes: 'g-sample-subheader'},
		{kind: ButtonPanel, classes: 'g-sample-circle-panel', onResult: 'result'},

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
