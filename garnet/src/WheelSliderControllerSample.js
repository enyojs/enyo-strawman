require('garnet');

var
	kind = require('enyo/kind'),
	WheelSliderController = require('garnet/WheelSliderController');

var WheelSliderPanel = kind({
	name: 'g.sample.WheelSliderPanel',
	kind: WheelSliderController,
	events: {
		onResult: ''
	},
	minimumValue: 0,
	maximumValue: 100,
	stepValue: 5,
	value: 50,
	classes: 'g-sample-circle-panel',
	components: [
		{classes: 'g-common-width-height-fit g-sample-pointer-events-none', components: [
			{name: 'sampleValue', content: '', classes: 'g-sample-wheelslider-value'},
			{content: 'Brightness', classes: 'g-sample-wheelslider-text'}
		]}
	],
	bindings: [
		{from: '.value', to: '.$.sampleValue.content'}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);

			// Accessibility : add aria-live attribute to read value whenever it changes.
			this.$.sampleValue.setAttribute('aria-live', 'assertive');
		};
	}),
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
		{kind: WheelSliderPanel, classes: 'g-sample-panel', onResult: 'result'},

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

WheelSliderControllerSample.WheelSliderPanel = WheelSliderPanel;
