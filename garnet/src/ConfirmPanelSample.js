require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution');

var
	Button = require('garnet/Button'),
	Panel = require('garnet/Panel'),
	ConfirmPanel = require('garnet/ConfirmPanel'),
	Scroller = require('garnet/Scroller'),
	BlurPanelScroller = require('garnet/BlurPanelScroller'),
	IconButton = require('garnet/IconButton'),
	PanelManager = require('garnet/PanelManager');

var
	panelStyle = 'width: ' + ri.scale(320) + 'px; height: ' + ri.scale(320) + 'px; position: relative; display: inline-block; margin: ';

var OneTextPanel = kind({
	name: 'confirmPanelNoScrollNoIcon',
	kind: ConfirmPanel,
	events: {
		onHidePanel: ''
	},
	handlers: {
		onHide: 'hidePanel',
		onCancel: 'hidePanel',
		onOK: 'tapOK'
	},
	components: [
		{
			kind: BlurPanelScroller,
			components: [
				{content: 'All the labels follow guideline.'}
			]
		}
	],
	hidePanel: function(inSender, inEvent) {
		this.doHidePanel({msg: inSender.name + ' is hidden'});
	},
	tapOK: function(inSender, inEvent) {
		this.doHidePanel({msg: inSender.name + ' is hidden by OK button'});
	}
});

var ScrollTextPanel = kind({
	name: 'confirmPanelWithScrollNoIcon',
	kind: ConfirmPanel,
	events: {
		onHidePanel: ''
	},
	handlers: {
		onHide: 'hidePanel'
	},
	buttonComponents: [
		{name: 'ok', kind: IconButton, ontap: 'tapOK', classes: 'g-ok-image'}
	],
	components: [
		{
			kind: BlurPanelScroller,
			components: [
				{content: 'Garnet is a UI library built for wearable devices and is based on Enyo. Garnet supports LG smart watch'}
			]
		}
	],
	hidePanel: function(inSender, inEvent) {
		this.doHidePanel({msg: inSender.name + ' is hidden'});
	},
	tapOK: function(inSender, inEvent) {
		this.doHidePanel({msg: inSender.owner.name + ' is hidden by OK button'});
	}
});

var IconTitleTextPanel = kind({
	name: 'confirmPanelWithIconNoScroll',
	kind: ConfirmPanel,
	events: {
		onHidePanel: ''
	},
	handlers: {
		onHide: 'hidePanel'
	},
	buttonComponents: [
		{name: 'ok2', kind: IconButton, ontap: 'tapOK', classes: 'g-ok-image'}
	],
	components: [
		{
			kind: BlurPanelScroller,
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
		this.doHidePanel({msg: inSender.name + ' is hidden'});
	},
	tapOK: function(inSender, inEvent) {
		this.doHidePanel({msg: inSender.owner.name + ' is hidden by OK button'});
	}
});

var ScrollIconTitleTextPanel = kind({
	name: 'confirmPanelWithIconAndScroll',
	kind: ConfirmPanel,
	events: {
		onHidePanel: ''
	},
	handlers: {
		onHide: 'hidePanel',
		onCancel: 'hidePanel',
		onOK: 'tapOK'
	},
	components: [
		{
			kind: BlurPanelScroller,
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
		this.doHidePanel({msg: inSender.name + ' is hidden'});
	},
	tapOK: function(inSender, inEvent) {
		this.doHidePanel({msg: inSender.owner.name + ' is hidden by OK button'});
	}
});

var ConfirmBasePanel = kind({
	name: 'g.sample.ConfirmBasePanel',
	kind: Panel,
	events: {
		onShow: ''
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
			this.doShow({panelType: name, panelName: name});
		}
	}
});

module.exports = kind({
	name: 'g.sample.ConfirmPanelSample',
	horizontal: 'hidden',
	classes: 'enyo-unselectable enyo-fit garnet g-sample',
	kind: Scroller,
	components: [
		{content: '< Confirm Panel Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Confirm with only Text/Scroll + Text /Icon+Title+Text/ Scorll + Icon + Title+ Text ', classes: 'g-sample-subheader'},
		{style: panelStyle, components: [
			{name: 'fixedFloating', kind: PanelManager, classes: 'enyo-fit', components: [
				{name: 'fixedFloatingPanel', kind: ConfirmBasePanel, onShow: 'handleShow'}
			]}
		]},
		{style: 'position: fixed; width: 100%; min-height: +' + ri.scale(160) + 'px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;', classes: 'g-sample-result', components: [
			{content: 'Result', classes: 'g-sample-subheader'},
			{name: 'result', allowHtml: true, content: 'No button pressed yet.', classes: 'g-sample-description'}
		]}
	],
	handleShow: function (inSender, inEvent) {
		var type = {
			button1: {kind: OneTextPanel, name: 'confirmPanelNoScrollNoIcon'},
			button2: {kind: ScrollTextPanel, name: 'confirmPopupWithScrollNoIcon'},
			button3: {kind: IconTitleTextPanel, name: 'confirmPopupWithIconNoScroll'},
			button4: {kind: ScrollIconTitleTextPanel, name: 'confirmPopupWithIconAndScroll'}
		};

		this.$.fixedFloating.pushFloatingPanel({
			name: type[inEvent.panelType].name,
			kind: type[inEvent.panelType].kind,
			owner: this,
			onHidePanel: 'handleHide'
		});
	},
	handleHide: function (inSender, inEvent) {
		this.$.fixedFloating.popFloatingPanel();
		this.$.result.setContent(inEvent.msg);
	},
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
