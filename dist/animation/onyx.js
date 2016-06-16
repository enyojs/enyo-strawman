(function (scope, bundled) {
	
	var   enyo     = scope.enyo || (scope.enyo = {})
		, manifest = enyo.__manifest__ || (defineProperty(enyo, '__manifest__', {value: {}}) && enyo.__manifest__)
		, exported = enyo.__exported__ || (defineProperty(enyo, '__exported__', {value: {}}) && enyo.__exported__)
		, require  = enyo.require || (defineProperty(enyo, 'require', {value: enyoRequire}) && enyo.require)
		, local    = bundled()
		, entries;

	// below is where the generated entries list will be assigned if there is one
	entries = null;


	if (local) {
		Object.keys(local).forEach(function (name) {
			var value = local[name];
			if (manifest.hasOwnProperty(name)) {
				if (!value || !(value instanceof Array)) return;
			}
			manifest[name] = value;
		});
	}

	function defineProperty (o, p, d) {
		if (Object.defineProperty) return Object.defineProperty(o, p, d);
		o[p] = d.value;
		return o;
	}
	
	function enyoRequire (target) {
		if (!target || typeof target != 'string') return undefined;
		if (exported.hasOwnProperty(target))      return exported[target];
		var   request = enyo.request
			, entry   = manifest[target]
			, exec
			, map
			, ctx
			, reqs
			, reqr;
		if (!entry) throw new Error('Could not find module "' + target + '"');
		if (!(entry instanceof Array)) {
			if (typeof entry == 'object' && (entry.source || entry.style)) {
				throw new Error('Attempt to require an asynchronous module "' + target + '"');
			} else if (typeof entry == 'string') {
				throw new Error('Attempt to require a bundle entry "' + target + '"');
			} else {
				throw new Error('The shared module manifest has been corrupted, the module is invalid "' + target + '"');
			}
		}
		exec = entry[0];
		map  = entry[1];
		if (typeof exec != 'function') throw new Error('The shared module manifest has been corrupted, the module is invalid "' + target + '"');
		ctx  = {exports: {}};
		if (request) {
			if (map) {
				reqs = function (name) {
					return request(map.hasOwnProperty(name) ? map[name] : name);
				};
				defineProperty(reqs, 'isRequest', {value: request.isRequest});
			} else reqs = request;
		}
		reqr = !map ? require : function (name) {
			return require(map.hasOwnProperty(name) ? map[name] : name);
		};
		exec(
			ctx,
			ctx.exports,
			scope,
			reqr,
			reqs
		);
		return exported[target] = ctx.exports;
	}

	// in occassions where requests api are being used, below this comment that implementation will
	// be injected
	

	// if there are entries go ahead and execute them
	if (entries && entries.forEach) entries.forEach(function (name) { require(name); });
})(this, function () {
	// this allows us to protect the scope of the modules from the wrapper/env code
	return {'onyx':[function (module,exports,global,require,request){
/**
* Features a variety of commonly used widgets, including toolbars, text inputs, checkboxes, groups
* and multiple types of buttons.
*
* @namespace onyx
*/
module.exports.version = "2.7.0";

var dom = require('enyo/dom');
dom.addBodyClass('onyx');

}],'onyx/ProgressBar':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/ProgressBar~ProgressBar} kind.
* @module onyx/ProgressBar
*/

var
	kind = require('enyo/kind'),
	Animator = require('enyo/Animator'),
	Control = require('enyo/Control');

/**
* Fires when progress bar finishes animating to a position.
*
* @event module:onyx/ProgressBar~ProgressBar#onAnimateProgressFinish
* @type {module:enyo/Animator~Animator}
* @todo Not sure why the animator is passed as the payload to the event ...
* @public
*/

/**
* {@link module:onyx/ProgressBar~ProgressBar} is a control that shows the current progress of a
* process in a horizontal bar.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		ProgressBar = require('onyx/ProgressBar');
*
* 	{kind: ProgressBar, progress: 10}
* ```
*
* To animate a progress change, call the
* [animateProgressTo()]{@link module:onyx/ProgressBar~ProgressBar#animateProgressTo} method:
*
* ```javascript
* 	this.$.progressBar.animateProgressTo(50);
* ```
*
* You may customize the color of the bar by applying a style via the
* [barClasses]{@link module:onyx/ProgressBar~ProgressBar#barClasses} property, e.g.:
*
* ```
* 	var
* 		kind = require('enyo/kind'),
* 		ProgressBar = require('onyx/ProgressBar');
*
* 	{kind: ProgressBar, barClasses: 'onyx-dark'}
* ```
*
* @class ProgressBar
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/ProgressBar~ProgressBar.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.ProgressBar',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-progress-bar',

	/**
	* @lends module:onyx/ProgressBar~ProgressBar.prototype
	* @private
	*/
	published: {
		/**
		* Current position of progress bar.
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		progress: 0,

		/**
		* Minimum progress value (i.e., no progress made).
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		min: 0,

		/**
		* Maximum progress value (i.e., process complete).
		*
		* @type {Number}
		* @default  100
		* @public
		*/
		max: 100,

		/**
		* CSS classes to apply to progress bar.
		*
		* @type {String}
		* @default  ''
		* @public
		*/
		barClasses: '',

		/**
		* When `true`, stripes are shown in progress bar.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		showStripes: true,

		/**
		* If `true` (and [showStripes]{@link module:onyx/ProgressBar~ProgressBar#showStripes} is `true`),
		* stripes shown in progress bar are animated.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		animateStripes: true,

		/**
		* Sliders may be "snapped to" multiples of this value in either direction.
		*
		* @type {Number}
		* @default  0
		* @public
		* @todo  This doesn't appear to be supported. Only referenced by a method which
		* 	itself isn't called by anthing
		*/
		increment: 0
	},

	/**
	* @private
	*/
	events: {
		onAnimateProgressFinish: ''
	},

	/**
	* @private
	*/
	components: [
		{name: 'progressAnimator', kind: Animator, onStep: 'progressAnimatorStep', onEnd: 'progressAnimatorComplete'},
		{name: 'bar', classes: 'onyx-progress-bar-bar'}
	],

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.progressChanged();
		this.barClassesChanged();
		this.showStripesChanged();
		this.animateStripesChanged();
	},

	/**
	* @private
	*/
	barClassesChanged: function (old) {
		this.$.bar.removeClass(old);
		this.$.bar.addClass(this.barClasses);
	},

	/**
	* @private
	*/
	showStripesChanged: function () {
		this.$.bar.addRemoveClass('striped', this.showStripes);
	},

	/**
	* @private
	*/
	animateStripesChanged: function () {
		this.$.bar.addRemoveClass('animated', this.animateStripes);
	},

	/**
	* @private
	*/
	progressChanged: function () {
		this.progress = this.clampValue(this.min, this.max, this.progress);
		var p = this.calcPercent(this.progress);
		this.updateBarPosition(p);
	},

	/**
	* Clamps a specified value to the nearest [increment]{@link module:onyx/ProgressBar~ProgressBar#increment}
	* value.
	*
	* @param  {Number} value - The value to clamp.
	* @return {Number}         - The clamped value.
	* @private
	*/
	calcIncrement: function (value) {
		return (Math.round(value / this.increment) * this.increment);
	},

	/**
	* Ensures that passed-in value is between the specified minimum and maximum.
	*
	* @param  {Number} min   - Minimum value.
	* @param  {Number} max   - Maximum value.
	* @param  {Number} value - The value to clamp.
	* @return {Number}         - The clamped value.
	* @private
	*/
	clampValue: function (min, max, value) {
		return Math.max(min, Math.min(value, max));
	},

	/**
	* Calculates the completion ratio.
	*
	* @param  {Number} value - Value between `min` and `max`.
	* @return {Number}         - Completion ratio (between `0` and `1`).
	* @private
	*/
	calcRatio: function (value) {
		return (value - this.min) / (this.max - this.min);
	},

	/**
	* Calculates the completion percentage.
	*
	* @param  {Number} value - Value between `min` and `max`.
	* @return {Number}         - Completion percentage (between `0` and `100`).
	* @private
	*/
	calcPercent: function (value) {
		return this.calcRatio(value) * 100;
	},

	/**
	* Positions the progress bar at specified completion percentage.
	*
	* @param  {Number} percent - Completion percentage corresponding to desired position.
	* @private
	*/
	updateBarPosition: function (percent) {
		this.$.bar.applyStyle('width', percent + '%');
	},

	/**
	* Animates progress to the given value.
	*
	* @param  {Number} value - The desired value. Will be clamped between
	* 	[min]{@link module:onyx/ProgressBar~ProgressBar#min} and [max]{@link module:onyx/ProgressBar~ProgressBar#max}.
	* @public
	*/
	animateProgressTo: function (value) {
		this.$.progressAnimator.play({
			startValue: this.progress,
			endValue: value,
			node: this.hasNode()
		});
	},

	/**
	* Handles [onStep]{@link module:enyo/Animator~Animator#onStep} animation events.
	*
	* @private
	*/
	progressAnimatorStep: function (sender) {
		this.setProgress(sender.value);
		return true;
	},

	/**
	* Handles [onEnd]{@link module:enyo/Animator~Animator#onEnd} animation events.
	*
	* @fires module:onyx/ProgressBar~ProgressBar#onAnimateProgressFinish
	* @private
	*/
	progressAnimatorComplete: function (sender) {
		this.doAnimateProgressFinish(sender);
		return true;
	}
});

}],'onyx/Slider':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Slider~Slider} kind.
* @module onyx/Slider
*/

var
	kind = require('enyo/kind'),
	Animator = require('enyo/Animator');

var
	ProgressBar = require('onyx/ProgressBar');

/**
* Fires when bar position is set.
*
* @event module:onyx/Slider~Slider#onChange
* @type {Object}
* @property {Number} value - The new bar position.
* @public
*/

/**
* Fires while control knob is being dragged.
*
* @event module:onyx/Slider~Slider#onChanging
* @type {Object}
* @property {Number} value - The current bar position.
* @public
*/

/**
* Fires when animation to a position finishes.
*
* @event module:onyx/Slider~Slider#onAnimateFinish
* @type {module:enyo/Animator~Animator}
* @public
* @todo  Animator as the payload; overlap with
* 	{@link module:onyx/ProgressBar~ProgressBar#onAnimateProgressFinish}
*/

/**
* {@link module:onyx/Slider~Slider} is a control that presents a range of selection options
* in the form of a horizontal slider with a control knob. The knob may be
* tapped and dragged to the desired location.
*
* ```
* var
* 	Slider = require('onyx.Slider');
*
* {kind: Slider, value: 30}
* ```
*
* [onChanging]{@link module:onyx/Slider~Slider#onChanging} events are fired while the
* control knob is being dragged, and an [onChange]{@link module:onyx/Slider~Slider#onChange}
* event is fired when the position is set, either by finishing a drag or by tapping
* the bar.
*
* @class Slider
* @extends module:onyx/ProgressBar~ProgressBar
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Slider~Slider.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Slider',

	/**
	* @private
	*/
	kind: ProgressBar,

	/**
	* @private
	*/
	classes: 'onyx-slider',

	/**
	* @lends module:onyx/Slider~Slider.prototype
	* @private
	*/
	published: {
		/**
		* Position of slider, expressed as an integer between `0` and `100`, inclusive.
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		value: 0,

		/**
		* When `true`, current progress will be styled differently from rest of bar.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		lockBar: true,

		/**
		* When `true`, tapping on bar will change current position.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		tappable: true
	},

	/**
	* @private
	*/
	events: {
		onChange: '',
		onChanging: '',
		onAnimateFinish: ''
	},

	/**
	* If `true`, stripes are shown in the slider bar.
	*
	* @type {Boolean}
	* @default  false
	* @public
	*/
	showStripes: false,

	/**
	* @private
	*/
	handlers: {
		ondragstart: 'dragstart',
		ondrag: 'drag',
		ondragfinish: 'dragfinish'
	},

	/**
	* @private
	*/
	moreComponents: [
		{kind: Animator, onStep: 'animatorStep', onEnd: 'animatorComplete'},
		{classes: 'onyx-slider-taparea'},
		{name: 'knob', classes: 'onyx-slider-knob'}
	],

	/**
	* @private
	*/
	create: function () {
		ProgressBar.prototype.create.apply(this, arguments);

		// add handlers for up/down events on knob for pressed state (workaround for inconsistent (timing-wise) active:hover styling)
		this.moreComponents[2].ondown = 'knobDown';
		this.moreComponents[2].onup = 'knobUp';

		this.createComponents(this.moreComponents);
		this.valueChanged();
	},

	/**
	* @private
	*/
	valueChanged: function () {
		this.value = this.clampValue(this.min, this.max, this.value);
		if (!this.$.animator.isAnimating()) {
			this.updateBar(this.value);
		}
	},

	/**
	* @private
	*/
	updateBar: function (value) {
		var p = this.calcPercent(value);
		this.updateKnobPosition(p);
		if (this.lockBar) {
			this.setProgress(value);
		}
	},

	/**
	* @private
	*/
	updateKnobPosition: function (percent) {
		this.$.knob.applyStyle('left', percent + '%');
	},

	/**
	* @private
	*/
	calcKnobPosition: function (event) {
		var x = event.clientX - this.hasNode().getBoundingClientRect().left;
		return (x / this.getBounds().width) * (this.max - this.min) + this.min;
	},

	/**
	* @private
	*/
	dragstart: function (sender, event) {
		if (event.horizontal) {
			event.preventDefault();
			this.dragging = true;
			sender.addClass('pressed');
			return true;
		}
	},

	/**
	* @fires module:onyx/Slider~Slider#onChanging
	* @private
	*/
	drag: function (sender, event) {
		if (this.dragging) {
			var v = this.calcKnobPosition(event);
			v = (this.increment) ? this.calcIncrement(v) : v;
			this.setValue(this.clampValue(this.min, this.max, v));
			this.doChanging({value: this.value});
			return true;
		}
	},

	/**
	* @fires module:onyx/Slider~Slider#onChange
	* @private
	*/
	dragfinish: function (sender, event) {
		this.dragging = false;
		event.preventTap();
		this.doChange({value: this.value});
		sender.removeClass('pressed');
		return true;
	},

	/**
	* @private
	*/
	tap: function (sender, event) {
		if (this.tappable) {
			var v = this.calcKnobPosition(event);
			v = (this.increment) ? this.calcIncrement(v) : v;
			this.tapped = true;
			this.animateTo(v);
			return true;
		}
	},

	/**
	* @private
	*/
	knobDown: function (sender, event) {
		this.$.knob.addClass('pressed');
	},

	/**
	* @private
	*/
	knobUp: function (sender, event) {
		this.$.knob.removeClass('pressed');
	},

	/**
	* Animates to the given value.
	*
	* @param  {Number} value - The value to animate to.
	* @public
	* @todo  functional overlap with {@link module:onyx/ProgressBar~ProgressBar#animateProgressTo}
	*/
	animateTo: function (value) {
		this.$.animator.play({
			startValue: this.value,
			endValue: value,
			node: this.hasNode()
		});

		this.setValue(value);
	},

	/**
	* @private
	*/
	animatorStep: function (sender) {
		this.updateBar(sender.value);
		return true;
	},

	/**
	* @fires module:onyx/Slider~Slider#onChange
	* @fires module:onyx/Slider~Slider#onAnimateFinish
	* @private
	*/
	animatorComplete: function (sender) {
		if (this.tapped) {
			this.tapped = false;
			this.doChange({value: this.value});
		}
		this.doAnimateFinish(sender);
		return true;
	}
});

}]
	};

});
//# sourceMappingURL=onyx.js.map