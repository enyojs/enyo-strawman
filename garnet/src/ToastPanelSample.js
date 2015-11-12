require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),

	Button = require('garnet/Button'),
	ToastPanel = require('garnet/ToastPanel'),
	Panel = require('garnet/Panel'),
	PanelManager = require('garnet/PanelManager');

var
	panelStyle = 'width: ' + ri.scale(320) + 'px; height: ' + ri.scale(320) + 'px; position: relative; display: inline-block; ';

var SampleToast = kind({
	name: 'toast',
	kind: ToastPanel,
	allowHtml: true,
	duration: 5000,
	content: 'Toast<br><br>Saved'
});

var ToastBasePanel = kind({
	name: 'g.sample.ToastBasePanel',
	kind: Panel,
	classes: 'g-layout-absolute-wrapper', // for button
	components: [
		{kind: Button, style: 'position: absolute; width: ' + ri.scale(310) + 'px; margin: auto;', classes: 'g-layout-absolute-center g-layout-absolute-middle', ontap: 'showPanel', content: 'Click here'}
	],
	showPanel: function(inSender, inEvent) {
		this.bubbleUp('onPushPanel', {panelName: name, owner: this});
	}
});

var PanelManager = kind({
	name: 'fixedFloating',
	kind: PanelManager,
	handlers: {
		onPushPanel: 'pushPanel'
	},
	classes: 'enyo-fit',
	components: [
		{kind: ToastBasePanel}
	],
	pushPanel: function (inSender, inEvent) {
		this.pushFloatingPanel({
			name: 'toast',
			kind: SampleToast,
			owner: inEvent.owner ? inEvent.owner : this
		});
	}
});

module.exports = kind({
	name: 'g.sample.ToastPanelSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< Toast Panel Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Toast', classes: 'g-sample-subheader'},
		{style: panelStyle, kind: PanelManager}
	],
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
