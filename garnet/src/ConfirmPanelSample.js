require('garnet');

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	ri = require('enyo/resolution');

var
	Button = require('garnet/Button'),
	Panel = require('garnet/Panel'),
	ConfirmPanel = require('garnet/ConfirmPanel'),
	Scroller = require('garnet/Scroller'),
	PopupPanelScroller = require('garnet/PopupPanelScroller'),
	IconButton = require('garnet/IconButton'),
	PanelManager = require('garnet/PanelManager'),

	panelStyle = 'width: ' + ri.scale(320) + 'px; height: ' + ri.scale(320) + 'px; position: relative; display: inline-block;';

var OneTextPanel = kind({
	name: 'confirmPanelNoScrollNoIcon',
	kind: ConfirmPanel,
	handlers: {
		onHide: 'hidePanel',
		onOK: 'tapOK',
		onCancel: 'tapCancel'
	},
	components: [
		{
			kind: PopupPanelScroller,
			components: [
				{content: 'All the labels follow guideline.'}
			]
		}
	],
	hidePanel: function(inSender, inEvent) {
		this.fromPanel.triggerHandler('onHide2', {originalEvent: utils.clone(inEvent, true)});
		return true;
	},
	tapOK: function(inSender, inEvent) {
		this.fromPanel.triggerHandler('onOK', {originalEvent: utils.clone(inEvent, true)});
		return true;
	},
	tapCancel: function(inSender, inEvent) {
		this.fromPanel.triggerHandler('onCancel', {originalEvent: utils.clone(inEvent, true)});
		return true;
	}
});

var ScrollTextPanel = kind({
	name: 'confirmPanelWithScrollNoIcon',
	kind: ConfirmPanel,
	handlers: {
		onHide: 'hidePanel'
	},
	buttonComponents: [
		{name: 'ok', kind: IconButton, ontap: 'tapOK', classes: 'g-ok-image'}
	],
	components: [
		{
			kind: PopupPanelScroller,
			components: [
				{content: 'Garnet is a UI library built for wearable devices and is based on Enyo. Garnet supports LG smart watch'}
			]
		}
	],
	hidePanel: function(inSender, inEvent) {
		this.fromPanel.triggerHandler('onHide2', {originalEvent: utils.clone(inEvent, true)});
		return true;
	},
	tapOK: function(inSender, inEvent) {
		this.fromPanel.triggerHandler('onOK', {originalEvent: {originator: this, type: 'onOK'}});
		return true;
	}
});

var IconTitleTextPanel = kind({
	name: 'confirmPanelWithIconNoScroll',
	kind: ConfirmPanel,
	handlers: {
		onHide: 'hidePanel'
	},
	buttonComponents: [
		{name: 'ok2', kind: IconButton, ontap: 'tapOK', classes: 'g-ok-image'}
	],
	components: [
		{
			kind: PopupPanelScroller,
			icon: true,
			iconSrc: '@../assets/ic_warning.svg',
			title: true,
			titleContent: 'test',
			components: [
				{content: 'All the labels follow guideline.'}
			]
		}
	],
	hidePanel: function(inSender, inEvent) {
		this.fromPanel.triggerHandler('onHide2', {originalEvent: utils.clone(inEvent, true)});
		return true;
	},
	tapOK: function(inSender, inEvent) {
		this.fromPanel.triggerHandler('onOK', {originalEvent: {originator: this, type: 'onOK'}});
		return true;
	}
});

var ScrollIconTitleTextPanel = kind({
	name: 'confirmPanelWithIconAndScroll',
	kind: ConfirmPanel,
	handlers: {
		onHide: 'hidePanel',
		onOK: 'tapOK',
		onCancel: 'tapCancel'
	},
	components: [
		{
			kind: PopupPanelScroller,
			icon: true,
			iconSrc: '@../assets/ic_warning.svg',
			title: true,
			titleContent: 'ScrollIconTitleTextPanelTitle',
			components: [
				{content: 'Garnet is a UI library built for wearable devices and is based on Enyo. Garnet supports LG smart watch as well as the emulator provided. Browser-wise, Garnet supports the browser on LG smart watch, Firefox 16, Opera 15, Safari 3.1, Chrome 27 and their higher versions.et Quad-Core Processor, 1080p resolution screen, 13-megapixel rear'}
			]
		}
	],
	hidePanel: function(inSender, inEvent) {
		this.fromPanel.triggerHandler('onHide2', {originalEvent: utils.clone(inEvent, true)});
		return true;
	},
	tapOK: function(inSender, inEvent) {
		this.fromPanel.triggerHandler('onOK', {originalEvent: utils.clone(inEvent, true)});
		return true;
	},
	tapCancel: function(inSender, inEvent) {
		this.fromPanel.triggerHandler('onCancel', {originalEvent: utils.clone(inEvent, true)});
		return true;
	}
});

var ConfirmBasePanel = kind({
	name: 'g.sample.ConfirmBasePanel',
	kind: Panel,
	handlers: {
		onHide2: 'result',
		onOK: 'result',
		onCancel: 'result'
	},
	components: [
		{name: 'button1', kind: Button, style: 'margin:' + ri.scale(20) + 'px ' + ri.scale(5) +'px ' + ri.scale(5) +'px; width:' + ri.scale(310) + 'px', ontap: 'showPanel', content: 'Only text'},
		{name: 'button2', kind: Button, style: 'margin:' + ri.scale(5) + 'px; width:' + ri.scale(310) + 'px', ontap: 'showPanel', content: 'Scroll + Text'},
		{name: 'button3', kind: Button, style: 'margin:' + ri.scale(5) + 'px; width:' + ri.scale(310) + 'px', ontap: 'showPanel', content: 'Icon + Title + Text'},
		{name: 'button4', kind: Button, style: 'margin:' + ri.scale(5) + 'px; width:' + ri.scale(310) + 'px', ontap: 'showPanel', content: 'Scroll+Icon+Title+Text'}
	],
	showPanel: function(inSender, inEvent) {
		var name = inSender.name;

		if (name == 'button1' || name == 'button2' || name == 'button3' || name == 'button4') {
			this.bubbleUp('onPushPanel', {panelName: name, owner: this});
		}
	},
	result: function(inSender, inEvent) {
		var
			name = inEvent.originalEvent.originator.name,
			msg = '"' + name + '" PopupPanel closed ',
			type = inEvent.originalEvent.type;

		if (type == 'onOK') {
			msg += 'by OK button';
		} else if (type == 'onCancel') {
			msg += 'by Cancel button';
		}

		this.bubbleUp((type == 'onOK' || type == 'onCancel') ? 'onPopPanel' : 'onResult', {msg: msg});
	}
});

var PanelManager = kind({
	name: 'fixedFloating',
	kind: PanelManager,
	handlers: {
		onPushPanel: 'pushPanel',
		onPopPanel: 'popPanel'
	},
	classes: 'enyo-fit',
	components: [
		{kind: ConfirmBasePanel}
	],
	pushPanel: function (inSender, inEvent) {
		var type = {
			button1: {name: 'confirmPanelNoScrollNoIcon', kind: OneTextPanel},
			button2: {name: 'confirmPopupWithScrollNoIcon', kind: ScrollTextPanel},
			button3: {name: 'confirmPopupWithIconNoScroll', kind: IconTitleTextPanel},
			button4: {name: 'confirmPopupWithIconAndScroll', kind: ScrollIconTitleTextPanel}
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
	name: 'g.sample.ConfirmPanelSample',
	kind: Scroller,
	horizontal: 'hidden',
	classes: 'enyo-unselectable enyo-fit garnet g-sample',
	handlers: {
		onResult: "result",
		onPopPanel: "result"
	},
	components: [
		{content: '< Confirm Panel Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Confirm with only Text/Scroll + Text /Icon+Title+Text/ Scorll + Icon + Title+ Text ', classes: 'g-sample-subheader'},
		{style: panelStyle, kind: PanelManager},
		{style: 'position: fixed; width: 100%; min-height: +' + ri.scale(160) + 'px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;', classes: 'g-sample-result', components: [
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
