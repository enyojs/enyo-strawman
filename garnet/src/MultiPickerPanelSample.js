require('garnet');

var
	kind = require('enyo/kind'),
	Collection = require('enyo/Collection.js'),
	FormPickerButton = require('garnet/FormPickerButton'),
	Panel = require('garnet/Panel'),
	MultiPickerPanel = require('garnet/MultiPickerPanel'),
	PanelManager = require('garnet/PanelManager');

var SampleMultiPickerPanel = kind({
	name: 'g.sample.MultiPickerPanel',
	kind: MultiPickerPanel,
	handlers: {
		onCancel: 'popPanel',
		onOK: 'popPanel'
	},
	title: true,
	titleContent: 'MultiPickerPanel',
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new Collection(data);
		};
	}),
	popPanel: function() {
		this.container.popFloatingPanel();
	}
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
	initComponents: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.$.multiPickerButton.setContent(data[1].item + ', ' + data[2].item);
		};
	}),
	showPanel: function(inSender, inEvent) {
		this.container.pushFloatingPanel({name: 'multiPickerPanel', kind: SampleMultiPickerPanel, owner: this, selectedIndex: [1, 2], onUpdate: 'updateContent'});
	},
	updateContent: function(inSender, inEvent) {
		var content = this.formattingContent(inEvent.value);
		this.$.multiPickerButton.setContent(content);
		this.doResult({msg: content});
	},
	formattingContent: function(val, data) {
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

module.exports = kind({
	name: 'g.sample.MultiPickerPanelSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< MultiPickerPanel Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'MultiPickerPanel', classes: 'g-sample-subheader'},
		{kind: PanelManager, classes: 'g-sample-panel-manager', components: [
			{kind: FormPanel, classes: 'g-sample-panel;', onResult: 'result'}
		]},

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
