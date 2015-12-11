require('garnet');

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control'),

	Button = require('garnet/Button'),
	PopupPanelScroller = require('garnet/PopupPanelScroller'),
	Panel = require('garnet/Panel'),
	ConfirmPanel = require('garnet/ConfirmPanel'),
	ToastPanel = require('garnet/ToastPanel'),
	PanelManager = require('garnet/PanelManager');

var ConfirmToastBasePanel = kind({
	name: 'g.sample.ConfirmToastBasePanel',
	kind: Panel,
	events: {
		onResult: ''
	},
	handlers: {
		onOK: 'okHandler',
		onCancel: 'cancelHandler'
	},
	components: [
		{name: 'button1', kind: Button, classes: 'g-sample-confirm-toast-panel-container g-layout-absolute-center g-layout-absolute-middle', ontap: 'showPanel', content: 'Click here'}
	],
	popUpAndPickerPanelComponents: {
		button1: {
			name: 'confirmPanelNoScrollNoIcon',
			kind: ConfirmPanel,
			onCancel: 'cancelHandler',
			onOK: 'okHandler',
			components: [
				{
					kind: PopupPanelScroller,
					components: [
						{content: 'All the labels follow guideline.'}
					]
				}
			]
		}
	},
	toastPanel: {
		name: 'toast',
		kind: ToastPanel,
		allowHtml: true,
		content: 'Toast<br><br>Saved'
	},
	isOkTapped: false,
	showPanel: function(inSender, inEvent) {
		var
			name = inSender.name,
			panel = this.popUpAndPickerPanelComponents[name];

		if (panel) {
			this.bubbleUp('onPushPanel', {panel: panel, owner: this});
		}
	},
	activated: function(inEvent) {
		if (this.isOkTapped) {
			this.bubbleUp('onPushPanel', {panel: this.toastPanel, owner: this});
			this.isOkTapped = false;
		}
	},
	cancelHandler: function(inSender, inEvent) {
		this.bubbleUp('onPopPanel');
		this.doResult({msg: 'Confirm panel is hidden by Cancel button'});
		this.isOkTapped = false;
	},
	okHandler: function(inSender, inEvent) {
		this.bubbleUp('onPopPanel');
		this.doResult({msg: 'Confirm panel is hidden by OK button'});
		this.isOkTapped = true;
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
		{kind: ConfirmToastBasePanel, classes: 'g-sample-panel'}
	],
	pushPanel: function (inSender, inEvent) {
		this.pushFloatingPanel(inEvent.panel, {owner: inEvent.owner});
	},
	popPanel: function (inSender, inEvent) {
		this.popFloatingPanel();
	}
});

module.exports = kind({
	name: 'g.sample.ConfirmToastPanelSample',
	kind: Control,
	classes: 'enyo-unselectable enyo-fit enyo-fit garnet g-sample g-sample-confirm-toast-panel',
	handlers: {
		onResult: "result",
		onPopPanel: "result"
	},
	components: [
		{content: '< Confirm Toast Panel Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Confirm Toast Panel', classes: 'g-sample-subheader'},
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
