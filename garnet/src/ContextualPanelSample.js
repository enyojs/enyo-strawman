require('garnet');

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	Button = require('garnet/Button'),
	Panel = require('garnet/Panel'),
	ContextualPanel = require('garnet/ContextualPanel'),
	Scroller = require('garnet/Scroller'),
	PanelManager = require('garnet/PanelManager');

var OneButtonPanel = kind({
	name: 'g.sample.OneButtonPanel',
	kind: ContextualPanel,
	handlers: {
		onHide: 'hidePanel'
	},
	buttonComponents: [
		{
			name: 'button1',
			ontap: 'buttonTap',
			src: '@../assets/btn_delete.svg',
			title: 'Delete'
		}
	],
	hidePanel: function(inSender, inEvent) {
		this.fromPanel.triggerHandler('onHide2', {originalEvent: utils.clone(inEvent, true)});
	},
	buttonTap: function(inSender, inEvent) {
		this.fromPanel.triggerHandler('onButtonTap', {originalEvent: {originator: this, title: inEvent.originator.title}});
	}
});

var TwoButtonPanel = kind({
	name: 'g.sample.TwoButtonPanel',
	kind: ContextualPanel,
	handlers: {
		onHide: 'hidePanel'
	},
	buttonComponents: [
		{
			name: '1st 2 buttons',
			ontap: 'buttonTap',
			src: '@../assets/btn_delete.svg',
			title: 'Delete'
		},
		{
			name: '2nd 2 buttons',
			ontap: 'buttonTap',
			src: '@../assets/btn_share.svg',
			disabled: true,
			title: 'Share'
		}
	],
	hidePanel: function(inSender, inEvent) {
		this.fromPanel.triggerHandler('onHide2', {originalEvent: utils.clone(inEvent, true)});
	},
	buttonTap: function(inSender, inEvent) {
		this.fromPanel.triggerHandler('onButtonTap', {originalEvent: {originator: this, title: inEvent.originator.title}});
	}
});

var ThreeButtonPanel = kind({
	name: 'g.sample.ThreeButtonPanel',
	kind: ContextualPanel,
	handlers: {
		onHide: 'hidePanel'
	},
	buttonComponents: [
		{
			name: '1st 3 buttons',
			ontap: 'buttonTap',
			src: '@../assets/btn_delete.svg',
			title: 'Delete'
		},
		{
			name: '2nd 3 buttons',
			ontap: 'buttonTap',
			src: '@../assets/btn_share.svg',
			title: 'Share',
			disabled: true
		},
		{
			name: '3rd 3 buttons',
			ontap: 'buttonTap',
			src: '@../assets/btn_share.svg',
			title: 'Share'
		}
	],
	hidePanel: function(inSender, inEvent) {
		this.fromPanel.triggerHandler('onHide2', {originalEvent: utils.clone(inEvent, true)});
	},
	buttonTap: function(inSender, inEvent) {
		this.fromPanel.triggerHandler('onButtonTap', {originalEvent: {originator: this, title: inEvent.originator.title}});
	}
});

var ContextualBasePanel = kind({
	name: 'g.sample.ContextualBasePanel',
	kind: Panel,
	handlers: {
		onHide2: 'result',
		onButtonTap: 'result'
	},
	components: [
		{name: 'oneButton', kind: Button, classes: 'g-sample-contextual-panel-button:first-child', ontap: 'showPanel', content: 'Click here to show panel!'},
		{name: 'twoButton', kind: Button, classes: 'g-sample-contextual-panel-button', ontap: 'showPanel', content: 'Click here to show panel!'},
		{name: 'threeButton', kind: Button, classes: 'g-sample-contextual-panel-button', ontap: 'showPanel', content: 'Click here to show panel!'}
	],
	showPanel: function(inSender, inEvent) {
		var name = inSender.name;

		if (name == 'oneButton' || name == 'twoButton' || name == 'threeButton' ) {
			this.bubbleUp('onPushPanel', {panelName: name, owner: this});
		}
	},
	result: function(inSender, inEvent) {
		var
			name = inEvent.originalEvent.originator.name,
			msg = '"' + name + '" PopupPanel closed ',
			title = inEvent.originalEvent.title;

		if (title) {
			msg += ('by ' + title + ' button');
		}

		this.bubbleUp(title ? 'onPopPanel' : 'onResult', {msg: msg});
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
		{kind: ContextualBasePanel}
	],
	pushPanel: function (inSender, inEvent) {
		var type = {
			oneButton: {name: 'OneButtonPanel', kind: OneButtonPanel},
			twoButton: {name: 'TwoButtonPanel', kind: TwoButtonPanel},
			threeButton: {name: 'ThreeButtonPanel', kind: ThreeButtonPanel}
		};

		this.pushFloatingPanel({
			name: type[inEvent.panelName].name,
			kind: type[inEvent.panelName].kind,
			fromPanel: inEvent.owner ? inEvent.owner : this
		});
	},
	popPanel: function (inSender, inEvent) {
		this.popFloatingPanel();
	}
});

module.exports = kind({
	name: 'g.sample.ContextualPanelSample',
	kind: Scroller,
	horizontal: 'hidden',
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
