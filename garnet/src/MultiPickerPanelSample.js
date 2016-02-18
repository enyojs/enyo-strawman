require('garnet');

var
	kind = require('enyo/kind'),
	Collection = require('enyo/Collection.js'),

	FormPickerButton = require('garnet/FormPickerButton'),
	Panel = require('garnet/Panel'),
	MultiPickerPanel = require('garnet/MultiPickerPanel'),
	PanelManager = require('garnet/PanelManager');

var SampleMultiPickerPanel = kind({
	name: 'g.sample.SampleMultiPickerPanel',
	kind: MultiPickerPanel,
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
		{name: 'multiPickerButton', kind: FormPickerButton, classes: 'g-sample-multipicker-panel-button', ontap: 'showPanel', content: 'Click here!'}
	],
	popUpAndPickerPanelComponents: {
		multiPickerButton: {
			name: 'multiPickerPanel',
			kind: SampleMultiPickerPanel,
			onCancel: 'popPanel',
			onOK: 'popPanel',
			onValueChange: 'updateContent',
			title: true,
			titleContent: 'MultiPickerPanel',
			selectedIndex: [1, 2]
		}
	},
	initComponents: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.$.multiPickerButton.setContent(data[1].item + ', ' + data[2].item);
		};
	}),
	showPanel: function(inSender, inEvent) {
		var
			name = inSender.name,
			panel = this.popUpAndPickerPanelComponents[name];

		if (panel) {
			this.bubbleUp('onPushPanel', {panel: panel, owner: this});
		}
	},
	popPanel: function(inSender, inEvent) {
		this.bubbleUp('onPopPanel');
		this.updateContent(inSender, inEvent.originalEvent);
	},
	updateContent: function(inSender, inEvent) {
		var content = this.formattingValue(inEvent.value);
		this.$.multiPickerButton.setContent(content);
		this.doResult({msg: content + ' selected'});
	},
	formattingValue: function(val, data) {
		var
			items = val,
			names = '',
			i;

		if (val instanceof Array && val.length && typeof val[0] === 'number') {
			var multipleSelection = [];

			for (i = 0; i <val.length; i++) {
				multipleSelection[i] = data[val[i]].item;
			}
			return multipleSelection.join(', ');
		}
		if (!!items && items.length > 0) {
			for (i = 0; i < items.length; i++) {
				names += ', ' + items[i].attributes.item;
			}
			names = names.slice(2);
		} else {
			names = 'No items';
		}

		return names;
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
	name: 'g.sample.MultiPickerPanelSample',
	classes: 'enyo-unselectable enyo-fit garnet g-sample g-sample-multipicker-panel',
	components: [
		{content: '< MultiPickerPanel Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'MultiPickerPanel', classes: 'g-sample-subheader'},
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
