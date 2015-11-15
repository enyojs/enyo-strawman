require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	IconButton = require('garnet/IconButton'),
	Panel = require('garnet/Panel'),
	Popup = require('garnet/Popup'),
	WheelSliderController = require('garnet/WheelSliderController');

var WheelSliderControllerPanel = kind({
	name: 'g.sample.WheelSliderController',
	kind: Panel,
	events: {
		onResult: ''
	},
	classes: 'g-common-width-height-fit g-layout-absolute-wrapper',
	components: [
		{
			name: 'panel',
			kind: WheelSliderController,
			classes: 'g-sample-circle-panel',
			minimumValue: -100,
			maximumValue: 100,
			stepValue: 10,
			value: 50,
			onChange: 'changeEventHandler',
			onChanging: 'changingEventHandler'
		},
		{classes: 'g-common-width-height-fit g-sample-pointer-evetns-none', components: [
			{name: 'sampleValue', content: '', classes: 'g-sample-wheelslider-value'},
			{content: 'Brightness', classes: 'g-sample-wheelslider-text'},
			{classes:'g-sample-wheelslider-container', components: [
				{name: 'cancel', kind: IconButton, accessibilityLabel: 'cancel', ontap: 'tapCancel', classes: 'g-sample-wheelslider-cancel-image'},
				{name: 'ok', kind: IconButton, accessibilityLabel: 'ok', ontap: 'tapOK', classes: 'g-sample-wheelslider-ok-image'}
			]}
		]}
	],
	bindings: [
		{from: '.$.panel.value', to: '.$.sampleValue.content'}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);

			// Accessibility : add aria-live attribute to read value whenever it changes.
			this.$.sampleValue.setAttribute('aria-live', 'assertive');
		};
	}),
	tapCancel: function(inSender, inEvent) {
		this.doResult({msg: 'Cancel button tapped !!'});
	},
	tapOK: function(inSender, inEvent) {
		this.doResult({msg: 'OK button tapped !!'});
	},
	changingEventHandler: function(inSender, inEvent) {
		this.doResult({msg: 'changing inEvent.value : ' + inEvent.value});
	},
	changeEventHandler: function(inSender, inEvent) {
		this.doResult({msg: 'change inEvent.value : ' + inEvent.value});
	}
});

var WheelSliderControllerSample = module.exports = kind({
	name: 'g.sample.WheelSliderControllerSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< Wheel Slider Controller Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Wheel Slider Panel', classes: 'g-sample-subheader'},
		{kind: WheelSliderControllerPanel, classes: 'g-sample-panel', onResult: 'result'},

		{src: '@../assets/btn_command_next.svg', classes: 'g-sample-result', components: [
			{content: 'Result', classes: 'g-sample-subheader'},
			{name: 'result', allowHtml: true, content: 'Not tapped yet.', classes: 'g-sample-description'}
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

WheelSliderControllerSample.WheelSliderControllerPanel = WheelSliderControllerPanel;
