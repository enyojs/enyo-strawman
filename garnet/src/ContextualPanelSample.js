require('garnet');

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control'),

	Button = require('garnet/Button'),
	Panel = require('garnet/Panel'),
	ContextualPanel = require('garnet/ContextualPanel'),
	PanelManager = require('garnet/PanelManager');

var ContextualBasePanel = kind({
	name: 'g.sample.ContextualBasePanel',
	kind: Panel,
	events: {
		onResult: ''
	},
	components: [
		{name: 'oneButton', kind: Button, classes: 'g-sample-contextual-panel-button', ontap: 'showPanel', content: 'Click here to show panel!'},
		{name: 'twoButton', kind: Button, classes: 'g-sample-contextual-panel-button', ontap: 'showPanel', content: 'Click here to show panel!'},
		{name: 'threeButton', kind: Button, classes: 'g-sample-contextual-panel-button', ontap: 'showPanel', content: 'Click here to show panel!'}
	],
	popUpAndPickerPanelComponents: {
		oneButton: {
			name: 'g.sample.OneButtonPanel',
			kind: ContextualPanel,
			buttonComponents: [
				{
					name: '1rd Contextual 1st button',
					ontap: 'tapHandler',
					src: '@../assets/btn_context_delete.svg',
					title: 'Delete'
				}
			]
		},
		twoButton: {
			name: 'g.sample.TwoButtonPanel',
			kind: ContextualPanel,
			buttonComponents: [
				{
					name: '2rd Contextual 1st button',
					ontap: 'tapHandler',
					src: '@../assets/btn_context_edit.svg',
					title: 'Edit'
				},
				{
					name: '2nd Contextual 2nd button',
					ontap: 'tapHandler',
					src: '@../assets/btn_context_delete.svg',
					title: 'Delete'
				}
			]
		},
		threeButton: {
			name: 'g.sample.ThreeButtonPanel',
			kind: ContextualPanel,
			buttonComponents: [
				{
					name: '3rd Contextual 1st button',
					ontap: 'tapHandler',
					src: '@../assets/btn_context_favorite.svg',
					title: 'Favorite'
				},
				{
					name: '3nd Contextual 2nd button',
					ontap: 'tapHandler',
					src: '@../assets/btn_context_edit.svg',
					title: 'Edit'
				},
				{
					name: '3rd Contextual 3rd button',
					ontap: 'tapHandler',
					src: '@../assets/btn_context_delete.svg',
					title: 'Delete'
				}
			]
		}
	},
	showPanel: function(inSender, inEvent) {
		var
			name = inSender.name,
			panel = this.popUpAndPickerPanelComponents[name];

		if (panel) {
			this.bubbleUp('onPushPanel', {panel: panel, owner: this});
		}
	},
	tapHandler: function(inSender, inEvent) {
		var name = inSender.name;
		this.bubbleUp('onPopPanel');
		this.doResult({msg: name + ' tapped'});
	}
});

var PanelManager = kind({
	name: 'fixedFloating',
	kind: PanelManager,
	handlers: {
		onPushPanel: 'pushPanel',
		onPopPanel: 'popPanel'
	},
	components: [
		{kind: ContextualBasePanel, classes: 'g-sample-panel'}
	],
	pushPanel: function (inSender, inEvent) {
		this.pushFloatingPanel(inEvent.panel, {owner: inEvent.owner});
	},
	popPanel: function (inSender, inEvent) {
		this.popFloatingPanel();
	}
});

module.exports = kind({
	name: 'g.sample.ContextualPanelSample',
	kind: Control,
	handlers: {
		onResult: "result",
		onPopPanel: "result"
	},
	classes: 'enyo-unselectable enyo-fit garnet g-sample',
	components: [
		{content: '< ContextualPanel Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Contextual with 1 button / 2 buttons / 3 buttons', classes: 'g-sample-subheader'},
		{kind: PanelManager, classes: 'g-sample-panel-manager'},
		{classes: 'g-sample-result', components: [
			{content: 'Result', classes: 'g-sample-subheader'},
			{name: 'result', allowHtml: true, content: 'No button pressed yet.', classes: 'g-sample-description'}
		]}
	],
	result: function (inSender, inEvent) {
		this.$.result.setContent(inEvent.msg);
	},
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
