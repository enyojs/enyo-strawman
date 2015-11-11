require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),

	Button = require('garnet/Button'),
	ToastPanel = require('garnet/ToastPanel'),
	Panel = require('garnet/Panel'),
	PanelManager = require('garnet/PanelManager');

var
	panelStyle = 'width: ' + ri.scale(320) + 'px; height: ' + ri.scale(320) + 'px; position: relative; display: inline-block; margin: ';

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
	events: {
		onShow: ''
	},
	classes: 'g-layout-absolute-wrapper', // for button
	components: [
		{kind: Button, style: 'position: absolute; width: ' + ri.scale(310) + 'px; margin: auto;', classes: 'g-layout-absolute-center g-layout-absolute-middle', ontap: 'showPopup', content: 'Click here'}
	],
	showPopup: function(inSender, inEvent) {
		this.doShow({panelType: name, panelName: name});
	}
});

module.exports = kind({
	name: 'g.sample.ToastPanelSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< Toast Panel Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Toast', classes: 'g-sample-subheader'},
		{style: panelStyle, components: [
			{name: 'fixedFloating', kind: PanelManager, classes: 'enyo-fit', components: [
				{name: 'fixedFloatingPanel', kind: ToastBasePanel, onShow: 'handleShow'}
			]}
		]}
	],
	handleShow: function (inSender, inEvent) {
		this.$.fixedFloating.pushFloatingPanel({
			name: 'toast',
			kind: SampleToast,
			owner: this
		});
	},
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
