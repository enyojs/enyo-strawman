require('garnet');

var
	kind = require('enyo/kind'),
	WheelSliderPanel = require('garnet/WheelSliderPanel');

var WheelSliderPanelBrightness = kind({
	name: 'g.sample.WheelSliderPanel',
	kind: WheelSliderPanel,
	events: {
		onResult: ''
	},
	minimumValue: 0,
	maximumValue: 100,
	stepValue: 5,
	value: 50,
	components: [
		{classes: 'g-sample-pointer-events-none', components: [
			// Accessibility : Add tabIndex for reading value, which is zero.
			{name: 'sampleValue', tabIndex: -1, content: '', classes: 'g-sample-wheelslider-panel-value'},
			{content: 'Brightness', classes: 'g-sample-wheelslider-panel-text'}
		]}
	],
	bindings: [
		{from: '.value', to: '.$.sampleValue.content'}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);

			// Accessibility : Set accessibilityLive to true for reading value whenever it changes.
			this.$.sampleValue.set('accessibilityLive', true);
		};
	}),
	valueChanged: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.doResult({msg: 'wheel slider value : ' + this.value});
		};
	})
});

var WheelSliderPanelSample = module.exports = kind({
	name: 'g.sample.WheelSliderPanelSample',
	classes: 'enyo-unselectable enyo-fit garnet g-sample g-sample-wheelslider-panel',
	components: [
		{content: '< Wheel Slider Panel Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Wheel Slider Panel', classes: 'g-sample-subheader'},
		{kind: WheelSliderPanelBrightness, classes: 'g-sample-panel', onResult: 'result'},

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

WheelSliderPanelSample.WheelSliderPanel = WheelSliderPanelBrightness;
