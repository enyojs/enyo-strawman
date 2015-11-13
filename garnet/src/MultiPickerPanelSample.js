require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Collection = require('enyo/Collection.js'),
	FormPickerButton = require('garnet/FormPickerButton'),
	Panel = require('garnet/Panel'),
	MultiPickerPanel = require('garnet/MultiPickerPanel'),
	PanelManager = require('garnet/PanelManager'),

	panelStyle = 'width: ' + ri.scale(320) + 'px; height: ' + ri.scale(320) + 'px; position: relative; display: inline-block;';

var Formatter = kind.singleton({
	/*
	* From multiPickerPanel.value to FormPickerButton.content
	*/
	MultiPickerPanel: function(val, data) {
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
	valueChanged: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			if (this.fromPanel) {
				this.fromPanel.triggerHandler('onUpdate', {
					name: this.name,
					value: this.value
				});
			}
		};
	}),
	popPanel: function() {
		this.bubbleUp('onPopPanel');
	}
});

var FormPanel = kind({
	name: 'g.sample.FormPanel',
	kind: Panel,
	events: {
		onResult: ''
	},
	handlers: {
		onUpdate: 'updateContent'
	},
	components: [
		{name: 'multiPickerButton', kind: FormPickerButton, style: 'top: ' + ri.scale(130) + 'px;', ontap: 'showPanel', content: 'Click here!'}
	],
	initComponents: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.$.multiPickerButton.setContent(data[1].item + ', ' + data[2].item);
		};
	}),
	showPanel: function(inSender, inEvent) {
		var init = true;
		if (this.$.multiPickerPanel) {
			init = false;
		}
		this.bubbleUp('onPushPanel', {panel: {name: 'multiPickerPanel', kind: SampleMultiPickerPanel}, options: {owner: this, fromPanel: this}});
		if (init) {
			this.$.multiPickerPanel.select(1);
			this.$.multiPickerPanel.select(2);
		}
	},
	updateContent: function(inSender, inEvent) {
		var content = Formatter.MultiPickerPanel(inEvent.value);
		this.$.multiPickerButton.setContent(content);
		this.doResult({msg: content});
	}
});

var PanelManager = kind({
	kind: PanelManager,
	handlers: {
		onPushPanel: 'pushPanel',
		onPopPanel: 'popPanel'
	},
	components: [
		{kind: FormPanel, style: 'position: relative;', onResult: 'result'}
	],
	pushPanel: function (inSender, inEvent) {
		this.pushFloatingPanel(inEvent.panel, inEvent.options);
	},
	popPanel: function (inSender, inEvent) {
		this.popFloatingPanel();
	}
});

module.exports = kind({
	name: 'g.sample.MultiPickerPanelSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< MultiPickerPanel Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'MultiPickerPanel', classes: 'g-sample-subheader'},
		{style: panelStyle, kind: PanelManager},

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
