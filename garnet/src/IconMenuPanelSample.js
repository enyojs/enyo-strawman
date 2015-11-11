require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution');

var
	Button = require('garnet/Button'),
	Panel = require('garnet/Panel'),
	IconMenuPanel = require('garnet/IconMenuPanel'),
	Scroller = require('garnet/Scroller'),
	PanelManager = require('garnet/PanelManager');

var
	panelStyle = 'width: ' + ri.scale(320) + 'px; height: ' + ri.scale(320) + 'px; position: relative; display: inline-block; margin: ';

var OneButtonPanel = kind({
	name: 'g.sample.OneButtonPanel',
	kind: IconMenuPanel,
	events: {
		onHidePanel: ''
	},
	buttonComponents: [
		{
			name: 'button1',
			ontap: 'hidePanel',
			src: '@../assets/btn_delete.svg',
			title: 'delete'
		}
	],
	hidePanel: function(inSender, inEvent) {
		var name = inEvent.originator.name;

		if (inEvent.originator.active === true && (name === 'button1')) {
			this.doHidePanel({msg: name + ' is selected.'});
		}
	}
});

var TwoButtonPanel = kind({
	name: 'g.sample.TwoButtonPanel',
	kind: IconMenuPanel,
	events: {
		onHidePanel: ''
	},
	buttonComponents: [
		{
			name: '1st 2 buttons',
			ontap: 'hidePanel',
			src: '@../assets/btn_delete.svg',
			title: 'delete'
		},
		{
			name: '2nd 2 buttons',
			ontap: 'hidePanel',
			src: '@../assets/btn_share.svg',
			disabled: true,
			title: 'share'
		}
	],
	hidePanel: function(inSender, inEvent) {
		var name = inEvent.originator.name;

		if (inEvent.originator.active === true && (name === '1st 2 buttons' || name === '2nd 2 buttons')) {
			this.doHidePanel({msg: name + ' is selected.'});
		}
	}
});

var ThreeButtonPanel = kind({
	name: 'g.sample.ThreeButtonPanel',
	kind: IconMenuPanel,
	events: {
		onHidePanel: ''
	},
	buttonComponents: [
		{
			name: '1st 3 buttons',
			ontap: 'hidePanel',
			src: '@../assets/btn_delete.svg',
			title: 'delete'
		},
		{
			name: '2nd 3 buttons',
			ontap: 'hidePanel',
			src: '@../assets/btn_share.svg',
			title: 'share',
			disabled: true
		},
		{
			name: '3rd 3 buttons',
			ontap: 'hidePanel',
			src: '@../assets/btn_share.svg',
			title: 'share'
		}
	],
	hidePanel: function(inSender, inEvent) {
		var name = inEvent.originator.name;

		if (inEvent.originator.active === true && (name === '1st 3 buttons' || name === '2nd 3 buttons'  || name === '3rd 3 buttons')) {
			this.doHidePanel({msg: name + ' is selected.'});
		}
	}
});

var IconMenuBasePanel = kind({
	name: 'g.sample.IconMenuBasePanel',
	kind: Panel,
	events: {
		onShowPanel: ''
	},
	components: [
		{name: 'oneButton', kind: Button, style: 'margin: ' + ri.scale(55)+ 'px ' + ri.scale(5) + 'px ' + ri.scale(5)+ 'px; width: ' + ri.scale(310) + 'px;', ontap: 'showPanel', content: 'Click here to show panel!'},
		{name: 'twoButton', kind: Button, style: 'margin: ' + ri.scale(5) + 'px; width: ' + ri.scale(310) + 'px;', ontap: 'showPanel', content: 'Click here to show panel!'},
		{name: 'threeButton', kind: Button, style: 'margin: ' + ri.scale(5) + 'px; width: ' + ri.scale(310) + 'px;', ontap: 'showPanel', content: 'Click here to show panel!'}
	],
	showPanel: function(inSender, inEvent) {
		var name = inSender.name;

		if (name == 'oneButton' || name == 'twoButton' || name == 'threeButton' ) {
			this.doShowPanel({panelType: name, panelName: name});
		}
	}
});

module.exports = kind({
	name: 'g.sample.IconMenuPanelSample',
	horizontal: 'hidden',
	classes: 'enyo-unselectable enyo-fit garnet g-sample',
	kind: Scroller,
	components: [
		{content: '< IconMenuPanel Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'IconMenu with 1 button / 2 buttons / 3 buttons', classes: 'g-sample-subheader'},
		{style: panelStyle, components: [
			{name: 'fixedFloating', kind: PanelManager, classes: 'enyo-fit', components: [
				{name: 'fixedFloatingPanel', kind: IconMenuBasePanel, onShowPanel: 'handleShow'}
			]}
		]},
		{style: 'position: fixed; width: 100%; min-height: +' + ri.scale(160) + 'px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;', classes: 'g-sample-result', components: [
			{content: 'Result', classes: 'g-sample-subheader'},
			{name: 'result', allowHtml: true, content: 'No button pressed yet.', classes: 'g-sample-description'}
		]}
	],
	handleShow: function (inSender, inEvent) {
		var type = {
			oneButton: {kind: OneButtonPanel, name: 'OneButtonPanel'},
			twoButton: {kind: TwoButtonPanel, name: 'TwoButtonPanel'},
			threeButton: {kind: ThreeButtonPanel, name: 'ThreeButtonPanel'}
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
