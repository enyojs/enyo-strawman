require('garnet');

var
	kind = require('enyo/kind'),
	Collection = require('enyo/Collection.js'),

	FormPickerButton = require('garnet/FormPickerButton'),
	Panel = require('garnet/Panel'),
	PickerPanel = require('garnet/PickerPanel'),
	PanelManager = require('garnet/PanelManager');

var SamplePickerPanel = kind({
	name: 'g.sample.SamplePickerPanel',
	kind: PickerPanel,
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new Collection(data);
		};
	})
});

var FormPanel = kind({
	name: 'g.sample.FormPanel',
	kind: Panel,
	events: {
		onResult: ''
	},
	components: [
		{name: 'pickerButton', kind: FormPickerButton, classes: 'g-sample-picker-panel-button', ontap: 'showPanel', content: 'Click here!'}
	],
	popPanels: {
		pickerButton: {
			name: 'pickerPanel',
			kind: SamplePickerPanel,
			title: true,
			titleContent: 'PickerTitle',
			selectedIndex: 2,
			onUpdate: 'updateContent'

		}
	},
	initComponents: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.$.pickerButton.setContent(data[2].item);
		};
	}),
	showPanel: function(inSender, inEvent) {
		var
			name = inSender.name,
			panel = this.popPanels[name];

		if (panel) {
			this.bubbleUp('onPushPanel', {panel: panel, owner: this});
		}
	},
	updateContent: function(inSender, inEvent) {
		var content = this.formattingValueToText(inEvent.value);
		this.$.pickerButton.setContent(content);
		this.doResult({msg: content + ' tapped'});
	},
	formattingValueToText: function(val, data) {
		var
			item = val,
			name = 'No item';

		if (typeof val === 'number') {
			return data[val].item;
		}
		if (!!item) {
			name = item.attributes.item;
		}

		return name;
	}
});

var PanelManager = kind({
	kind: PanelManager,
	handlers: {
		onPushPanel: 'pushPanel',
		onPopPanel: 'popPanel'
	},
	components: [
		{kind: FormPanel, classes: 'g-sample-panel'}
	],
	pushPanel: function (inSender, inEvent) {
		this.pushFloatingPanel(inEvent.panel, {owner: inEvent.owner});
	},
	popPanel: function (inSender, inEvent) {
		this.popFloatingPanel();
	}
});

module.exports = kind({
	name: 'g.sample.PickerPanelSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< PickerPanel Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'PickerPanel', classes: 'g-sample-subheader'},
		{kind: PanelManager, classes: 'g-sample-panel-manager', onResult: 'result'},
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

var data = [
	{item: 'This item title is very long'},
	{item: 'Marquez'},
	{item: 'Barr'},
	{item: 'Everett'},
	{item: 'Crane'},
	{item: 'Raymond'},
	{item: 'Petersen'},
	{item: 'Kristina'},
	{item: 'Barbra'},
	{item: 'Tracey'},
	{item: 'Alejandra'},
	{item: 'Marquez'},
	{item: 'Barr'},
	{item: 'Everett'},
	{item: 'Crane'}
];
