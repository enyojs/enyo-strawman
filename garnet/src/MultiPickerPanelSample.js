require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Collection = require('enyo/Collection.js'),
	FormPickerButton = require('garnet/FormPickerButton'),
	GarnetMultiPickerPanel = require('garnet/MultiPickerPanel'),
	Panel = require('garnet/Panel'),
	Popup = require('garnet/Popup');

var SampleMultiPickerPanel = kind({
	name: 'g.sample.MultiPickerPanel',
	kind: Panel,
	handlers: {
		onOK: 'tapOK',
		onCancel: 'tapCancel'
	},
	events: {
		onResult: ''
	},
	components: [
		{name: 'pickerButton', kind: FormPickerButton, style: 'top: ' + ri.scale(130) + 'px;', ontap: 'showPopup', content: 'Click here!'},
		{name: 'pickerPopup', kind: Popup, effect: 'depth-transition', components: [
			{
				name: 'multipicker',
				kind: GarnetMultiPickerPanel,
				title: true,
				titleContent: 'MultiPickerTitle'
			}
		]}
	],
	bindings: [
		{from: '.collection', to: '.$.multipicker.collection'},
		{from: '.$.multipicker.value', to: '.$.pickerButton.content', transform: function(val) {
			var items = val,
				names = '';
			if (items !== null && items !== undefined && items.length > 0) {
				for (var i=0; i<items.length; i++) {
					names += ', ' + items[i].attributes.item;
				}
				names = names.slice(2);
			} else {
				names = 'None';
			}

			return names;
		}}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new Collection(this.data);
		};
	}),
	tapCancel: function() {
		this.$.pickerPopup.hide();
	},
	tapOK: function() {
		var items = this.$.multipicker.value,
			names = '';

		if (items !== null && items !== undefined && items.length > 0) {
			for (var i=0; i<items.length; i++) {
				names += ', ' + items[i].attributes.item;
			}
			names = names.slice(2);
		} else {
			names = 'None';
		}
		this.doResult({msg: names});
		this.$.pickerPopup.hide();
	},
	showPopup: function(inSender, inEvent) {
		this.$.pickerPopup.show();
	},
	data: [
		{item: 'Looooooooooong Title'},
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
	]
});

module.exports = kind({
	name: 'g.sample.MultiPickerPanelSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< MultiPickerPanel Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'MultiPickerPanel', classes: 'g-sample-subheader'},
		{kind: SampleMultiPickerPanel, style: 'position: relative;', onResult: 'result'},

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
