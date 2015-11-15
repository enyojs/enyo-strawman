require('garnet');

var
	kind = require('enyo/kind'),
	Group = require('enyo/Group'),
	IconButton = require('garnet/IconButton'),
	Panel = require('garnet/Panel');

var IconButtonPanel = kind({
	name: 'g.sample.IconButtonPanel',
	kind: Panel,
	events: {
		onResult: ''
	},
	classes: 'g-layout-absolute-wrapper',
	components: [
		{classes: 'g-sample-icon-button-container g-layout-absolute-center', components: [
			{content: 'Icon Buttons : ', accessibilityLabel: 'check icon', classes: 'g-sample-text'},
			{tag: 'br'},
			{kind: IconButton, accessibilityLabel: 'check icon', src: '@../assets/btn_done.svg', ontap: 'tapButton'},
			{kind: IconButton, accessibilityLabel: 'check icon', src: '@../assets/btn_done.svg', disabled: true, ontap: 'tapButton'},
			{content: 'Grouped Icon Buttons : ', classes: 'g-sample-text'},
			{kind: Group, onActivate:'iconGroupActivated', components: [
				{kind: IconButton, accessibilityLabel: 'check icon', src: '@../assets/btn_done.svg', classes: 'g-common-button-size-small', active: true},
				{kind: IconButton, accessibilityLabel: 'check icon', src: '@../assets/btn_done.svg', classes: 'g-common-button-size-normal'},
				{kind: IconButton, accessibilityLabel: 'check icon', src: '@../assets/btn_done.svg', classes: 'g-common-button-size-large'}
			]}
		]}
	],
	tapButton: function(inSender, inEvent) {
		this.doResult({msg: '"'+inSender.name+'" ' + 'selected.'});
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
	name: 'g.sample.IconButtonSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< Icon Button Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Icon Buttons', classes: 'g-sample-subheader'},
		{kind: IconButtonPanel, classes: 'g-sample-circle-panel', onResult: 'result'},

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
