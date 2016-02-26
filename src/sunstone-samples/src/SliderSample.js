var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows');

var
	Slider = require('sunstone/Slider'),
	Button = require('sunstone/Button'),
	Input = require('sunstone/Input'),
	InputDecorator = require('sunstone/InputDecorator'),
	Scroller = require('sunstone/Scroller');

module.exports = kind({
	name: 'sun.sample.SliderSample',
	kind: FittableRows,
	classes: 'sun enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, horizontal: 'hidden', fit: true, components: [
			{tag:'br'},
			{content: 'Slider 1: Default'},
			{name: 'slider1', kind: Slider, value: 20, onChanging: 'sliderChanging', onChange: 'sliderChanged'},
			{tag:'br'},
			{content: 'Change Value'},
			{classes: 'sun-hspacing', components: [
				{kind: InputDecorator, style: 'width: 300px;', components: [
					{name: 'valueInput', kind: Input, placeholder: 'Value', classes: 'sun-1h', value: 20}
				]},
				{kind: Button, style:'margin-left: 30px;', small: true, content: 'Set', ontap: 'changeValue'},
				{kind: Button, style:'margin-left: 30px;', small: true, content: '-', ontap: 'decValue'},
				{kind: Button, style:'margin-left: 30px;', small: true, content: '+', ontap: 'incValue'}
			]}
		]},
		{content: 'Result'},
		{name: 'result', content: 'No slider moved yet.'}
	],
	//* @protected
	changeValue: function (inSender, inEvent) {
		var v = this.$.valueInput.getValue();

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].setValue(v);
			}
		}
	},
	incValue: function () {
		this.$.valueInput.setValue(Math.min(parseInt(this.$.valueInput.getValue() || 0, 10) + 10, 100));
		this.changeValue();
	},
	decValue: function () {
		this.$.valueInput.setValue(Math.max(parseInt(this.$.valueInput.getValue() || 0, 10) - 10, 0));
		this.changeValue();
	},
	sliderChanging: function (inSender, inEvent) {
		this.$.result.setContent(inSender.name + ' changing: ' + Math.round(inEvent.value));
	},
	sliderChanged: function (inSender, inEvent) {
		this.$.result.setContent(inSender.name + ' changed to ' + Math.round(inSender.getValue()) + '.');
	}
});
