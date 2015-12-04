require('garnet');

var
	kind = require('enyo/kind'),
	Group = require('enyo/Group'),
	ToggleIconButton = require('garnet/ToggleIconButton'),
	Panel = require('garnet/Panel');

var ToggleIconButtonPanel = kind({
	name: 'g.sample.ToggleIconButtonPanel',
	kind: Panel,
	handlers: {
		onChange: 'valueChange'
	},
	events: {
		onResult: ''
	},
	classes: 'g-layout-absolute-wrapper',
	components: [
		{classes: 'g-sample-toggle-icon-button-container g-layout-absolute-center', components: [
			{content: 'Toggle Icon Buttons : ', classes: 'g-sample-toggle-icon-button-text'},
			{tag: 'br'},
			{kind: ToggleIconButton, src: '@../assets/switch_default_oi_transparent.svg', classes: 'g-sample-toggle-icon-button-size', active: true},
			{kind: ToggleIconButton, src: '@../assets/switch_default_transparent.svg', classes: 'g-sample-toggle-icon-button-size'},
			{kind: ToggleIconButton, src: '@../assets/switch_default_oi_transparent.svg', classes: 'g-sample-toggle-icon-button-size', pending: true, ontap: 'togglePending'},
			{kind: ToggleIconButton, src: '@../assets/switch_default_transparent.svg', classes: 'g-sample-toggle-icon-button-size', disabled: true},
 			{content: 'Grouped Icon Buttons : ', classes: 'g-sample-toggle-icon-button-group-text'},
			{kind: Group, onActivate:'iconGroupActivated', components: [
				{kind: ToggleIconButton, src: '@../assets/switch_default_transparent.svg', classes: 'g-common-toggle-icon-button-size-normal', active: true},
				{kind: ToggleIconButton, src: '@../assets/switch_default_oi_transparent.svg', classes: 'g-common-toggle-icon-button-size-normal'},
				{kind: ToggleIconButton, src: '@../assets/switch_list_transparent.svg', classes: 'g-common-toggle-icon-button-size-small'},
				{kind: ToggleIconButton, src: '@../assets/switch_list_oi_transparent.svg', classes: 'g-common-toggle-icon-button-size-small'}
			]}
		]}
	],
	valueChange: function(inSender, inEvent) {
		this.doResult({msg: inSender.name + ' is ' + (inEvent.originator.getValue() ? ' selected.' : 'deselected.')});
	},
	togglePending: function(inSender, inEvent) {
		// settting the state of toggle icon button from 'offPending/onPending' to 'off/on' - using timers for demo purpose
		var pendingValue = inSender.getPendingValue();
		if (pendingValue === 'onPending' || pendingValue === 'offPending') {
			setTimeout(function() {
				inEvent.originator.set('pendingValue', (pendingValue === 'onPending')? 'on' : 'off');
			}, 2000);
			this.doResult({msg: inSender.name + ' is ' + ((inSender.getValue()? 'selected,' : 'deselected,') + ' and pending to be toggled.')});
		}
	},
	iconGroupActivated: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			var ordinals = ['1st', '2nd', '3rd', '4th'],
				selected = inEvent.originator.indexInContainer();

			this.doResult({msg: 'The ' + ordinals[selected] + ' icon button in the group is selected.'});
		}
	}
});

module.exports = kind({
	name: 'g.sample.ToggleIconButtonSample',
	classes: 'enyo-unselectable garnet g-sample g-sample-toggle-icon-button',
	components: [
		{content: '< Toggle Icon Button Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Toggle Icon Buttons', classes: 'g-sample-subheader'},
		{kind: ToggleIconButtonPanel, classes: 'g-sample-circle-panel', onResult: 'result'},

		{src: '@../assets/btn_command_next.svg', classes: 'g-sample-result', components: [
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
