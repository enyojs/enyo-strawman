require('garnet');

var
	kind = require('enyo/kind'),

	Button = require('garnet/Button'),
	Panel = require('garnet/Panel'),
	ToastPanel = require('garnet/ToastPanel'),
	PanelManager = require('garnet/PanelManager');

var ToastBasePanel = kind({
	name: 'g.sample.ToastBasePanel',
	kind: Panel,
	classes: 'g-layout-absolute-wrapper', // for button
	components: [
		{name: 'button', kind: Button, classes: 'g-sample-toast-panel-container g-layout-absolute-center g-layout-absolute-middle', ontap: 'showPanel', content: 'Click here'}
	],
	popPanels: {
		button: {
			name: 'toast',
			kind: ToastPanel,
			allowHtml: true,
			duration: 5000,
			content: 'Toast<br><br>Saved'
		}
	},
	showPanel: function(inSender, inEvent) {
		var
			name = inSender.name,
			panel = this.popPanels[name];

		if (panel) {
			this.bubbleUp('onPushPanel', {panel: panel, owner: this});
		}
	}
});

var PanelManager = kind({
	name: 'fixedFloating',
	kind: PanelManager,
	handlers: {
		onPushPanel: 'pushPanel'
	},
	components: [
		{kind: ToastBasePanel, classes: 'g-sample-panel'}
	],
	pushPanel: function (inSender, inEvent) {
		this.pushFloatingPanel(inEvent.panel, {owner: inEvent.owner});
	},
	popPanel: function (inSender, inEvent) {
		this.popFloatingPanel();
	}
});

module.exports = kind({
	name: 'g.sample.ToastPanelSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< Toast Panel Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Toast', classes: 'g-sample-subheader'},
		{kind: PanelManager, classes: 'g-sample-panel-manager'}
	],
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
