var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	Button = require('moonstone/Button'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	Divider = require('moonstone/Divider'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	Scroller = require('moonstone/Scroller'),
	Slider = require('moonstone/Slider');

module.exports = kind({
	kind: FittableRows,
	name: 'moon.sample.SliderSample',
	classes: 'moon enyo-unselectable enyo-fit',
	bindings: [
		{from: '.$.slider1.value', to: '.$.slider2.value'},
		{from: '.$.slider1.bgProgress', to: '.$.slider2.bgProgress'}
	],
	components: [
		{kind: Scroller, fit: true, components: [
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Slider 1: Default'},
			{name: 'slider1', kind: Slider, showPercentage: false, value: 25, bgProgress: 35, onChanging: 'sliderChanging', onChange: 'sliderChanged'},

			{kind: Divider, content: 'Slider 2: Disabled, Bound to Slider 1'},
			{name: 'slider2', kind: Slider, disabled: true},

			{kind: Divider, content: 'Slider 3: Enable JumpIncrement'},
			{name: 'slider3', kind: Slider, showPercentage: false, enableJumpIncrement: true, value: 25, bgProgress: 35, onChanging: 'sliderChanging', onChange: 'sliderChanged'},

			{kind: Divider, content: 'Slider 4: Custom Popup Content'},
			{name: 'slider4', kind: Slider, classes: 'rgb-sample-slider',
				popupColor: 'rgb(0, 0, 25)', value: 25, bgProgress: 150, min: 0, max: 255,
				onChanging: 'customChanging', onChange: 'customChanged', onAnimateFinish: 'customAnimateFinish'
			},

			{kind: Divider, content: 'Slider 5: Negative Values'},
			{name: 'slider5', kind: Slider,
				value: 0, min: -100, max: 100, showPercentage: false, enableJumpIncrement: true, onChanging: 'sliderChanging', onChange: 'sliderChanged'
			},

			{kind: Divider, content: 'Slider 6, 7, 8, 9: Vertical Orientation'},
			{classes: 'moon-hspacing', components: [
				{name: 'slider6', kind: Slider, orientation: 'vertical', style: 'height: 300px', onChanging: 'sliderChanging', onChange: 'sliderChanged'},
				{classes: 'moon-2h'},
				{name: 'slider7', kind: Slider,
					value: 0, min: -100, max: 100, orientation: 'vertical', style: 'height: 300px', enableJumpIncrement: true, decrementIcon: 'arrowlargedown', incrementIcon: 'arrowlargeup', showPercentage: false, onChanging: 'sliderChanging', onChange: 'sliderChanged'
				},
				{classes: 'moon-2h'},
				{name: 'slider8', kind: Slider,
					value: 5, min: 1, max: 10, orientation: 'vertical', style: 'height: 300px', enableJumpIncrement: true, jumpIncrement: '10%', decrementIcon: 'minus', incrementIcon: 'plus', popupSide: 'left', showPercentage: false, onChanging: 'sliderChanging', onChange: 'sliderChanged'
				},
				{classes: 'moon-2h'},
				{name: 'slider9', kind: Slider,
					value: 5, min: 0, max: 7, orientation: 'vertical', style: 'height: 300px', enableJumpIncrement: true, jumpIncrement: 2, decrementIcon: 'minus', incrementIcon: 'plus', onChanging: 'sliderChanging', onChange: 'sliderChanged'
				}
			]},

			{kind: Divider, content: 'Change Value'},
			{classes: 'moon-hspacing', components: [
				{kind: InputDecorator, components: [
					{name: 'valueInput', kind: Input, placeholder: 'Value', classes: 'moon-1h', value: 20}
				]},
				{kind: Button, small:true, content: 'Set', ontap: 'changeValue'},
				{kind: Button, small:true, content: '-', ontap: 'decValue'},
				{kind: Button, small:true, content: '+', ontap: 'incValue'}
			]},
			{classes: 'moon-1v'},

			{kind: Divider, content: 'Change Background Progress'},
			{classes: 'moon-hspacing', components: [
				{kind: InputDecorator, components: [
					{name: 'progressInput', kind: Input, placeholder: 'Progress', classes: 'moon-1h', value: 30}
				]},
				{kind: Button, small:true, content: 'Set', ontap: 'changeProgress'},
				{kind: Button, small:true, content: '-', ontap: 'decProgress'},
				{kind: Button, small:true, content: '+', ontap: 'incProgress'}
			]},
			{classes: 'moon-1v'},

			{kind: Divider, content: 'Change Increment (applies only to dragging, 0 for disable)'},
			{classes: 'moon-hspacing', components: [
				{kind: InputDecorator, components: [
					{name: 'incrementInput', kind: Input, placeholder: 'Increment', classes: 'moon-1h', value: 0}
				]},
				{kind: Button, small:true, content: 'Set', ontap: 'changeIncrement'}
			]},
			{classes: 'moon-1v'},

			{kind: Divider, content: 'Options'},
			{classes: 'moon-8h', defaultKind: CheckboxItem, components: [
				{name: 'lockBarSetting',        checked: true,     content: 'Lock Bar to Knob', onchange: 'changeLockbar'},
				{name: 'animateSetting',        checked: true,     content: 'Animated',        onchange: 'animateActivate'},
				{name: 'popupSetting',          checked: true,     content: 'Show Popup',      onchange: 'changeStatusBubble'},
				{name: 'tappableSetting',        checked: true,     content: 'Tappable',         onchange: 'changeTappable'},
				{name: 'constrainSetting',      checked: false,    content: 'Constrain to Background Progress', onchange: 'changeConstrain'},
				{name: 'elasticSetting',        checked: false,    content: 'Elastic Effect',  onchange: 'changeElastic'},
				{name: 'showPercentageSetting', checked: false,    content: 'Show Percentage', onchange: 'changePercentage'}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{name: 'result', content: 'No slider moved yet.'}
	],
	create: function () {
		FittableRows.prototype.create.apply(this, arguments);
		this.changeLockbar();
		this.animateActivate();
		this.changeStatusBubble();
		this.changeTappable();
		this.changeConstrain();
		this.changeElastic();
	},
	rendered: function () {
		FittableRows.prototype.rendered.apply(this, arguments);
		this.updateSlider4Popup(this.$.slider4.getValue());
	},
	//* @protected
	changeValue: function (sender, ev) {
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
	changeProgress: function (sender, ev) {
		var v = parseInt(this.$.progressInput.getValue(), 10);

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].setBgProgress(v);
			}
		}
	},
	changeIncrement: function (sender, ev) {
		var v = parseInt(this.$.incrementInput.getValue(), 10);

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].setIncrement(v);
			}
		}
	},
	incProgress: function () {
		this.$.progressInput.setValue(Math.min(parseInt(this.$.progressInput.getValue() || 0, 10) + 10, 100));
		this.changeProgress();
	},
	decProgress: function () {
		this.$.progressInput.setValue(Math.max(parseInt(this.$.progressInput.getValue() || 0, 10) - 10, 0));
		this.changeProgress();
	},
	sliderChanging: function (sender, ev) {
		this.$.result.setContent(sender.name + ' changing: ' + Math.round(ev.value));
	},
	sliderChanged: function (sender, ev) {
		this.$.result.setContent(sender.name + ' changed to ' + Math.round(sender.getValue()) + '.');
	},
	customChanging: function (sender, ev) {
		this.updateSlider4Popup(ev.value);
		this.sliderChanging(sender, ev);
	},
	customChanged: function (sender, ev) {
		this.updateSlider4Popup(sender.getValue());
		this.sliderChanged(sender, ev);
	},
	customAnimateFinish: function (sender, ev) {
		this.updateSlider4Popup(ev.value);
	},
	updateSlider4Popup: function (inValue) {
		var color = 'rgb(0, 0, ' + Math.round(inValue) + ')';
		this.$.slider4.setPopupContent(color);
		this.$.slider4.setPopupColor(color);
	},
	changeLockbar: function (sender, ev) {
		var ck = this.$.lockBarSetting.getChecked();

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].setLockBar(ck);
			}
		}
		return true;
	},
	animateActivate: function (sender, ev) {
		var ck = this.$.animateSetting.getChecked();

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].setAnimate(ck);
			}
		}
		return true;
	},
	changeStatusBubble: function (sender, ev) {
		var ck = this.$.popupSetting.getChecked();

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].set('popup', ck);
			}
		}
		return true;
	},
	changeTappable: function (sender, ev) {
		var ck = this.$.tappableSetting.getChecked();

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].setTappable(ck);
			}
		}
		return true;
	},
	changeConstrain: function (sender, ev) {
		var ck = this.$.constrainSetting.getChecked();

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].setConstrainToBgProgress(ck);
			}
		}
		return true;
	},
	changeElastic: function (sender, ev) {
		var ck = this.$.elasticSetting.getChecked();

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].setElasticEffect(ck);
			}
		}
		return true;
	},
	changePercentage: function (sender, ev) {
		var ck = this.$.showPercentageSetting.getChecked();

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].setShowPercentage(ck);
			}
		}
		return true;
	}
});
