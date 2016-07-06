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

}],'onyx/Groupbox':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Groupbox~Groupbox} kind.
* @module onyx/Groupbox
*/

var
	kind = require('enyo/kind');

/**
* {@link module:onyx/Groupbox~Groupbox} displays rows of controls as a vertically-stacked group.
* It is designed to have container controls as its children, with each container
* representing a row in the Groupbox.
*
* To add a header, specify an {@link module:onyx/GroupboxHeader~GroupboxHeader} as the first control
* in the Groupbox, e.g.:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Groupbox = require('onyx/Groupbox'),
* 		GroupboxHeader = require('onyx/GroupboxHeader'),
* 		Input = require('onyx/Input'),
* 		InputDecorator = require('onyx/InputDecorator'),
* 		ToggleButton = require('onyx/ToggleButton');
*
* 	{kind: Groupbox, components: [
* 		{kind: GroupboxHeader, content: 'Sounds'},
* 		{
* 			components: [
* 				{content: 'System Sounds'},
* 				{kind: ToggleButton, value: true}
* 			]
* 		},
* 		{kind: InputDecorator, components: [
* 			{kind: Input}
* 		]}
* 	]}
* ```
*
* @class Groupbox
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Groupbox~Groupbox.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Groupbox',

	/**
	* @private
	*/
	classes: 'onyx-groupbox'
});

}],'onyx/GroupboxHeader':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/GroupboxHeader~GroupboxHeader} kind.
* @module onyx/GroupboxHeader
*/

var
	kind = require('enyo/kind');

/**
* {@link module:onyx/GroupboxHeader~GroupboxHeader} is a control designed to be placed inside an
* {@link module:onyx/Groupbox~Groupbox}. When a header is desired, make a GroupboxHeader the
* first control inside the Groupbox.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Groupbox = require('onyx/Groupbox'),
* 		GroupboxHeader = require('onyx/GroupboxHeader');
*
* 	{kind: Groupbox, components: [
* 		{kind: GroupboxHeader, content: 'Sounds'},
* 		{content: 'Yawn'},
* 		{content: 'Beep'}
* 	]}
* ```
*
* @class GroupboxHeader
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/GroupboxHeader~GroupboxHeader.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.GroupboxHeader',

	/**
	* @private
	*/
	classes: 'onyx-groupbox-header'
});

}],'onyx/Icon':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Icon~Icon} kind.
* @module onyx/Icon
*/

var
	kind = require('enyo/kind'),
	path = require('enyo/path'),
	Control = require('enyo/Control');

/**
* {@link module:onyx/Icon~Icon} is a control that displays an icon. To set the icon image,
* specify a URL for the image's location in the Icon's [src]{@link module:onyx/Icon~Icon#src}
* property.
*
* In Onyx, icons have a size of 32x32 pixels. Since the icon image is applied
* as a CSS background, the height and width of the icon must be set if an image
* of a different size is used.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Icon = require('onyx/Icon');
*
* 	{kind: Icon, src: '../layout/onyx/src/assets/search.png'}
* ```
*
* When an icon should act like a button, use an {@link module:onyx/IconButton~IconButton}.
*
* @class Icon
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Icon~Icon.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Icon',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-icon',

	/**
	* @lends module:onyx/Icon~Icon.prototype
	* @private
	*/
	published: {
		/**
		* URL specifying path to icon image.
		* @type {String}
		* @default  ''
		* @public
		*/
		src: '',

		/**
		* If `true`, icon is shown as disabled.
		* @type {Boolean}
		* @default  false
		* @public
		*/
		disabled: false
	},

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		if (this.src) {
			this.srcChanged();
		}
		this.disabledChanged();
	},

	/**
	* @private
	*/
	disabledChanged: function () {
		this.addRemoveClass('disabled', this.disabled);
	},

	/**
	* @private
	*/
	srcChanged: function () {
		this.applyStyle('background-image', 'url(' + path.rewrite(this.src) + ')');
	}
});

}],'onyx/Toolbar':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Toolbar~Toolbar} kind.
* @module onyx/Toolbar
*/

var
	kind = require('enyo/kind'),
	platform = require('enyo/platform'),
	Control = require('enyo/Control');

/**
* {@link module:onyx/Toolbar~Toolbar} is a horizontal bar containing controls used to perform
* common UI actions.
*
* A toolbar customizes the styling of the controls it hosts, including buttons,
* icons, and inputs.
*
* ```
* var
* 	Button = require('onyx/Button'),
* 	IconButton = require('onyx/IconButton'),
* 	Input = require('onyx/Input'),
* 	InputDecorator = require('onyx/InputDecorator'),
* 	Toolbar = require('onyx/Toolbar');
*
*	{kind: Toolbar, components: [
*		{kind: Button, content: 'Favorites'},
*		{kind: InputDecorator, components: [
*			{kind: Input, placeholder: 'Enter a search term...'}
*		]},
*		{kind: IconButton, src: 'onyx/src/assets/go.png'}
*	]}
* ```
*
* @class Toolbar
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Toolbar~Toolbar.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Toolbar',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx onyx-toolbar onyx-toolbar-inline',

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);

		//workaround for android 4.0.3 rendering glitch (ENYO-674)
		if (this.hasClass('onyx-menu-toolbar') && (platform.android >= 4)) {
			this.applyStyle('position', 'static');
		}
	}
});

}],'onyx/Spinner':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Spinner~Spinner} kind.
* @module onyx/Spinner
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

/**
* {@link module:onyx/Spinner~Spinner} is a control that displays a spinning animation to indicate
* that activity is taking place. By default, a light spinner, suitable for
* displaying against a dark background, is shown. To get a dark spinner
* (suitable for use on a lighter background), apply the `'onyx-light'` CSS class:
*
* ```
* var
* 	Spinner = require('onyx/Spinner');
*
* {kind: Spinner, classes: 'onyx-light'}
* ```
*
* Typically, a spinner is shown to indicate activity and hidden to indicate
* that the activity has ended. The spinning animation will automatically start
* when the spinner is shown. If you wish, you may control the animation directly
* by calling the [start()]{@link module:onyx/Spinner~Spinner#start}, [stop()]{@link module:onyx/Spinner~Spinner#stop},
* and [toggle()]{@link module:onyx/Spinner~Spinner#toggle} methods.
*
* @class Spinner
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Spinner~Spinner.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Spinner',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-spinner',

	/**
	* Stops the spinner animation.
	*
	* @public
	*/
	stop: function () {
		this.setShowing(false);
	},

	/**
	* Starts the spinner animation.
	*
	* @public
	*/
	start: function () {
		this.setShowing(true);
	},

	/**
	* Toggles the spinner animation on or off.
	*
	* @public
	*/
	toggle: function () {
		this.setShowing(!this.getShowing());
	}
});

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

}],'onyx/ToggleButton':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/ToggleButton~ToggleButton} kind.
* @module onyx/ToggleButton
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

/**
* Fires when the user changes the value of the toggle button, but not
* when the value is changed programmatically.
*
* @event module:onyx/ToggleButton~ToggleButton#onChange
* @type {Object}
* @property {Boolean} value - Current value of the button.
* @public
*/

/**
* {@link module:onyx/ToggleButton~ToggleButton} is a control that looks like a switch with labels for
* two states. Each time a	ToggleButton is tapped, it switches its value and fires
* an [onChange]{@link module:onyx/ToggleButton~ToggleButton#onChange} event.
*
* @ui
* @class ToggleButton
* @extends module:enyo/Control~Control
* @public
*/
module.exports = kind(
	/** @lends module:onyx/ToggleButton~ToggleButton.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.ToggleButton',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-toggle-button',

	/**
	* @lends module:onyx/ToggleButton~ToggleButton.prototype
	* @private
	*/
	published: {
		/**
		* Used when the ToggleButton is part of an {@link module:enyo/Group~Group}. A value
		* of `true` indicates that this is the active button of the group.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		active: false,

		/**
		* Indicates whether toggle button is currently in the `'on'` state.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		value: false,

		/**
		* Label for the `'on'` state.
		*
		* @type {String}
		* @default 'On'
		* @public
		*/
		onContent: 'On',

		/**
		* Label for the `'off'` state.
		*
		* @type {String}
		* @default 'Off'
		* @public
		*/
		offContent: 'Off',

		/**
		* If `true`, toggle button cannot be tapped and thus will not generate any
		* events.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false
	},

	/**
	* @private
	*/
	events: {
		onChange: ''
	},

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
	components: [
		{name: 'contentOn', classes: 'onyx-toggle-content on'},
		{name: 'contentOff', classes: 'onyx-toggle-content off'},
		{classes: 'onyx-toggle-button-knob'}
	],

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.value = Boolean(this.value || this.active);
		this.onContentChanged();
		this.offContentChanged();
		this.disabledChanged();
	},

	/**
	* @private
	*/
	rendered: function () {
		Control.prototype.rendered.apply(this, arguments);
		this.updateVisualState();
	},

	/**
	* @private
	*/
	updateVisualState: function () {
		this.addRemoveClass('off', !this.value);
		this.$.contentOn.setShowing(this.value);
		this.$.contentOff.setShowing(!this.value);
		this.setActive(this.value);
	},

	/**
	* @fires module:onyx/ToggleButton~ToggleButton#onChange
	* @private
	*/
	valueChanged: function () {
		this.updateVisualState();
		this.doChange({value: this.value});
	},

	/**
	* @private
	*/
	activeChanged: function () {
		this.setValue(this.active);
		this.bubble('onActivate');
	},

	/**
	* @private
	*/
	onContentChanged: function () {
		this.$.contentOn.setContent(this.onContent || '');
		this.$.contentOn.addRemoveClass('empty', !this.onContent);
	},

	/**
	* @private
	*/
	offContentChanged: function () {
		this.$.contentOff.setContent(this.offContent || '');
		this.$.contentOff.addRemoveClass('empty', !this.onContent);
	},

	/**
	* @private
	*/
	disabledChanged: function () {
		this.addRemoveClass('disabled', this.disabled);
	},

	/**
	* @private
	*/
	updateValue: function (value) {
		if (!this.disabled) {
			this.setValue(value);
		}
	},

	/**
	* Programmatically simulates a user tap of the toggle button.
	*
	* @public
	*/
	tap: function () {
		this.updateValue(!this.value);
	},

	/**
	* @private
	*/
	dragstart: function (sender, event) {
		if (event.horizontal) {
			event.preventDefault();
			this.dragging = true;
			this.dragged = false;
			return true;
		}
	},

	/**
	* @private
	*/
	drag: function (sender, event) {
		if (this.dragging) {
			var d = event.dx;
			if (Math.abs(d) > 10) {
				this.updateValue(d > 0);
				this.dragged = true;
			}
			return true;
		}
	},

	/**
	* @private
	*/
	dragfinish: function (sender, event) {
		this.dragging = false;
		if (this.dragged) {
			event.preventTap();
		}
	}
});

}],'onyx/Grabber':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Grabber~Grabber} kind.
* @module onyx/Grabber
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

/**
* {@link module:onyx/Grabber~Grabber} is a control styled to indicate that an object may be grabbed
* and moved. It should only be used in this limited context--to indicate that
* dragging an object will result in movement.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Button = require('onyx/Button'),
* 		Grabber = require('onyx/Grabber'),
* 		Toolbar = require('onyx/Toolbar');
*
* 	{kind: Toolbar, components: [
* 		{kind: Grabber, ondragstart: 'grabberDragstart',
* 			ondrag: 'grabberDrag', ondragfinish: 'grabberDragFinish'},
* 		{kind: Button, content: 'More stuff'}
* 	]}
* ```
*
* When using a Grabber inside a [Fittable]{@link module:layout/FittableLayout~FittableLayout} control,
* be sure to set `'noStretch: true'` on the Fittable, or else give it an explicit
* height. Otherwise, the Grabber may not be visible.
*
* @class Grabber
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Grabber~Grabber.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Grabber',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-grabber'
});

}],'onyx/IconButton':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/IconButton~IconButton} kind.
* @module onyx/IconButton
*/

var
	kind = require('enyo/kind');

var
	Icon = require('onyx/Icon');

/**
* {@link module:onyx/IconButton~IconButton} is an {@link module:onyx/Icon~Icon} that acts like a button. The
* icon image is specified by setting the [src]{@link module:onyx/Icon~Icon#src} property
* to a URL.
*
* If you want to combine an icon with text inside a button, use an
* {@link module:onyx/Icon~Icon} inside an {@link module:onyx/Button~Button}.
*
* The image associated with the `src` property of the IconButton is assumed to
* be a 32x64-pixel strip, with the top half showing the button's normal state
* and the bottom half showing its state when hovered-over or active.
*
* For more information, see the documentation on
* [Buttons]{@linkplain $dev-guide/building-apps/controls/buttons.html} in the
* Enyo Developer Guide.
*
* @class IconButton
* @extends module:onyx/Icon~Icon
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/IconButton~IconButton.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.IconButton',

	/**
	* @private
	*/
	kind: Icon,

	/**
	* @lends module:onyx/IconButton~IconButton.prototype
	* @private
	*/
	published: {
		/**
		* Used when the IconButton is part of an {@link module:enyo/Group~Group}; a value
		* of `true` indicates that this is the active button of the group.
		*
		* @type {Boolean}
		* @default  false
		* @public
		*/
		active: false
	},

	/**
	* @private
	*/
	classes: 'onyx-icon-button',

	/**
	* @private
	*/
	handlers: {
		ondown: 'down',
		onenter: 'enter',
		ondragfinish: 'dragfinish',
		onleave: 'leave',
		onup: 'up'
	},

	/**
	* @private
	*/
	rendered: function () {
		Icon.prototype.rendered.apply(this, arguments);
		this.activeChanged();
	},

	/**
	* Makes the control [active]{@link module:onyx/IconButton~IconButton#active} (if it is not
	* [disabled]{@link module:onyx/Icon~Icon#disabled}).
	*
	* @private
	*/
	tap: function () {
		if (this.disabled) {
			return true;
		}
		this.setActive(true);
	},

	/**
	* @private
	*/
	down: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		this.addClass('pressed');
		this._isPressed = true;
	},

	/**
	* @private
	*/
	enter: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		if(this._isPressed) {
			this.addClass('pressed');
		}
	},

	/**
	* @private
	*/
	dragfinish: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		this.removeClass('pressed');
		this._isPressed = false;
	},

	/**
	* @private
	*/
	leave: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		this.removeClass('pressed');
	},

	/**
	* @private
	*/
	up: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		this.removeClass('pressed');
		this._isPressed = false;
	},

	/**
	* @fires module:enyo/GroupItem~GroupItem#onActivate
	* @private
	*/
	activeChanged: function () {
		this.bubble('onActivate');
	}
});

}],'onyx/ToggleIconButton':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/ToggleIconButton~ToggleIconButton} kind.
* @module onyx/ToggleIconButton
*/

var
	kind = require('enyo/kind');

var
	Icon = require('onyx/Icon');

/**
* Fires when the user changes the value of the toggle button, but not
* when the value is changed programmatically.
*
* @event module:onyx/ToggleIconButton~ToggleIconButton#onChange
* @type {Object}
* @property {Boolean} value - The current value of the button.
* @public
*/

/**
* {@link module:onyx/ToggleIconButton~ToggleIconButton} is an icon that acts like a toggle switch. The icon
* image is specified by setting the [src]{@link module:onyx/Icon~Icon#src} property to a URL.
*
* ```
* var
* 	ToggleIconButton = require('onyx/ToggleIconButton');
*
* {kind: ToggleIconButton, src: 'onyx/assets/search.png', ontap: 'buttonTap'}
* ```
*
* The image associated with the `src` property is assumed	to be a 32x64-pixel
* strip, with the top half showing the button's normal state and the bottom
* half showing its state when hovered-over or active.
*
* @class ToggleIconButton
* @extends module:onyx/Icon~Icon
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/ToggleIconButton~ToggleIconButton.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.ToggleIconButton',

	/**
	* @private
	*/
	kind: Icon,

	/**
	* @lends module:onyx/ToggleIconButton~ToggleIconButton.prototype
	* @private
	*/
	published: {
		/**
		* Used when the ToggleIconButton is part of an {@link module:enyo/Group~Group}; set the
		* value to `true` to indicate that this is the active button in the group.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		active: false,

		/**
		* Indicates whether the button is currently in the `'on'` state.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		value: false
	},

	/**
	* @private
	*/
	events: {
		onChange: ''
	},

	/**
	* @private
	*/
	classes: 'onyx-icon-button onyx-icon-toggle',

	/**
	* @private
	*/
	activeChanged: function () {
		this.addRemoveClass('active', this.value);
		this.bubble('onActivate');
	},

	/**
	* @private
	*/
	updateValue: function (inValue) {
		if (!this.disabled) {
			this.setValue(inValue);
			this.doChange({value: this.value});
		}
	},

	/**
	* Programmatically simulates a user tap of the toggle button.
	*
	* @public
	*/
	tap: function () {
		this.updateValue(!this.value);
	},

	/**
	* @private
	*/
	valueChanged: function () {
		this.setActive(this.value);
	},

	/**
	* @private
	*/
	create: function () {
		Icon.prototype.create.apply(this, arguments);
		this.value = Boolean(this.value || this.active);
	},

	/**
	* @private
	*/
	rendered: function () {
		Icon.prototype.rendered.apply(this, arguments);
		this.valueChanged();
		this.removeClass('onyx-icon');
	}
});

}],'onyx/Input':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Input~Input} kind.
* @module onyx/Input
*/

var
	kind = require('enyo/kind'),
	Input = require('enyo/Input');

/**
* {@link module:onyx/Input~Input} is an Onyx-styled input control, derived from {@link module:enyo/Input~Input}.
* Typically, an `onyx/Input` is placed inside an {@link module:onyx/InputDecorator~InputDecorator}, which
* provides styling, e.g.:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Input = require('onyx/Input'),
* 		InputDecorator = require('onyx/InputDecorator');
*
* 	{kind: InputDecorator, components: [
* 		{kind: Input, placeholder: 'Enter some text...', onchange: 'inputChange'}
* 	]}
* ```
*
* For more information, see the documentation on
* [Text Fields]{@linkplain $dev-guide/building-apps/controls/text-fields.html}
* in the Enyo Developer Guide.
*
* @class Input
* @extends module:enyo/Input~Input
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Input~Input.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Input',

	/**
	* @private
	*/
	kind: Input,

	/**
	* @private
	*/
	classes: 'onyx-input'
});

}],'onyx/ProgressButton':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/ProgressButton~ProgressButton} kind.
* @module onyx/ProgressButton
*/

var
	kind = require('enyo/kind'),
	Animator = require('enyo/Animator');

var
	Icon = require('onyx/Icon'),
	ProgressBar = require('onyx/ProgressBar');

/**
* Fires when cancel button is tapped.
*
* @event module:onyx/ProgressButton~ProgressButton#event:onCancel
* @type {Object}
* @public
*/

/**
* {@link module:onyx/ProgressButton~ProgressButton} is an {@link module:onyx/ProgressBar~ProgressBar} with a cancel
* button on the right; there may also be other controls inside.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		ProgressButton = require('onyx/ProgressButton');
*
* 	{kind: ProgressButton},
* 	{kind: ProgressButton, barClasses: 'onyx-light', progress: 20, components: [
* 		{content: '0'},
* 		{content: '100', style: 'float: right;'}
* 	]}
* ```
*
* @class ProgressButton
* @extends module:onyx/ProgressBar~ProgressBar
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/ProgressButton~ProgressButton */ {

	/**
	* @private
	*/
	name: 'onyx.ProgressButton',

	/**
	* @private
	*/
	kind: ProgressBar,

	/**
	* @private
	*/
	classes: 'onyx-progress-button',

	/**
	* @private
	*/
	events: {
		onCancel: ''
	},

	/**
	* @private
	*/
	components: [
		{name: 'progressAnimator', kind: Animator, onStep: 'progressAnimatorStep', onEnd: 'progressAnimatorComplete'},
		{name: 'bar', classes: 'onyx-progress-bar-bar onyx-progress-button-bar'},
		{name: 'client', classes: 'onyx-progress-button-client'},
		{kind: Icon, src: 'onyx/images/progress-button-cancel.png', classes: 'onyx-progress-button-icon', ontap: 'cancelTap'}
	],

	/**
	* @fires module:onyx/ProgressButton~ProgressButton#event:onCancel
	* @private
	*/
	cancelTap: function () {
		this.doCancel();
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

}],'onyx/RangeSlider':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/RangeSlider~RangeSlider} and {@link module:onyx/RangeSlider~RangeSliderKnobLabel} kinds.
* @module onyx/RangeSlider
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	ProgressBar = require('onyx/ProgressBar');

/**
* {@link module:onyx/RangeSlider~RangeSliderKnobLabel} provides the labels for the knobs
* within a {@link module:onyx/RangeSlider~RangeSlider}.
*
* @class RangeSliderKnobLabel
* @extends module:enyo/Control~Control
* @ui
* @public
*/
var RangeSliderKnobLabel = kind(
	/** @lends module:onyx/RangeSlider~RangeSliderKnobLabel.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.RangeSliderKnobLabel',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-range-slider-label',

	/**
	* @private
	*/
	handlers: {
		onSetLabel: 'setLabel'
	},

	/**
	* Handles [onSetLabel]{@link module:onyx/RangeSlider~RangeSlider#onSetLabel} events.
	*
	* @private
	*/
	setLabel: function (sender, content) {
		this.setContent(content);
	}
});

/**
* Requests that the knob label be changed.
*
* @event module:onyx/RangeSlider~RangeSlider#onSetLabel
* @type {String}
* @public
* @todo  Event payload is a string rather than an object
*/

/**
* Fires when bar position is set.
*
* @event module:onyx/RangeSlider~RangeSlider#onChange
* @type {Object}
* @property {Number} value - The new bar position.
* @property {Boolean} startChanged - Indicates whether the first slider (`rangeStart`)
* 	triggered the event.
* @public
*/

/**
* Fires while control knob is being dragged.
*
* @event module:onyx/RangeSlider~RangeSlider#onChanging
* @type {Object}
* @property {Number} value - The current bar position.
* @public
*/

/**
* {@link module:onyx/RangeSlider~RangeSlider} is a control that combines a horizontal slider with
* two control knobs. The user may drag the knobs to select a desired range of
* values.
*
* ```
* var
* 	RangeSlider = require('onyx/RangeSlider');
*
* {kind: RangeSlider, rangeMin: 100, rangeMax: 500,
* 	rangeStart: 200, rangeEnd: 400, interval: 20}
* ```
*
* [onChanging]{@link module:onyx/RangeSlider~RangeSlider#onChanging} events are fired while
* the control knobs are being dragged, and an
* [onchange]{@link module:onyx/RangeSlider~RangeSlider#onChange} event is fired when the
* position is set by finishing a drag.
*
* @class RangeSlider
* @extends module:onyx/ProgressBar~ProgressBar
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/RangeSlider~RangeSlider.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.RangeSlider',

	/**
	* @private
	*/
	kind: ProgressBar,

	/**
	* @private
	*/
	classes: 'onyx-slider',

	/**
	* @lends module:onyx/RangeSlider~RangeSlider.prototype
	* @private
	*/
	published: {
		/**
		* Minimum slider value.
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		rangeMin: 0,

		/**
		* Maximum slider value.
		*
		* @type {Number}
		* @default  100
		* @public
		*/
		rangeMax: 100,

		/**
		* Value of first slider, expressed as an integer between
		* [rangeMin]{@link module:onyx/RangeSlider~RangeSlider#rangeMin} and
		* [rangeMax]{@link module:onyx/RangeSlider~RangeSlider#rangeMax}.
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		rangeStart: 0,

		/**
		* Value of second slider, expressed as an integer between
		* [rangeMin]{@link module:onyx/RangeSlider~RangeSlider#rangeMin} and
		* [rangeMax]{@link module:onyx/RangeSlider~RangeSlider#rangeMax}.
		*
		* @type {Number}
		* @default  100
		* @public
		*/
		rangeEnd: 100,

		/**
		* Position of first slider, expressed as an integer between `0` and `100`
		* (percentage).
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		beginValue: 0,

		/**
		* Position of second slider, expressed as an integer between `0` and `100`
		* (percentage).
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		endValue: 0
	},

	/**
	* @private
	*/
	events: {
		onChange: '',
		onChanging: ''
	},

	/**
	* If `true`, stripes are shown in the slider bar.
	*
	* @type {Boolean}
	* @private
	*/
	showStripes: false,

	/**
	* If `true`, a label is shown above each slider knob.
	*
	* Note that this is a design-time property and should not be set after object creation.
	*
	* @type {Boolean}
	* @public
	*/
	showLabels: false,

	/**
	* @private
	*/
	handlers: {
		ondragstart: 'dragstart',
		ondrag: 'drag',
		ondragfinish: 'dragfinish',
		ondown: 'down'
	},

	/**
	* @private
	*/
	moreComponents: [
		{name: 'startKnob', classes: 'onyx-slider-knob'},
		{name: 'endKnob', classes: 'onyx-slider-knob onyx-range-slider-knob'}
	],

	/**
	* @private
	*/
	create: function () {
		ProgressBar.prototype.create.apply(this, arguments);
		this.createComponents(this.moreComponents);
		this.initControls();
	},

	/**
	* @private
	*/
	rendered: function () {
		ProgressBar.prototype.rendered.apply(this, arguments);
		var p = this.calcPercent(this.beginValue);
		this.updateBarPosition(p);
	},

	/**
	* @private
	* @todo  Why are handlers for ondown/onup added here instead of in the components block?
	*/
	initControls: function () {
		this.$.bar.applyStyle('position', 'relative');
		this.refreshRangeSlider();
		if (this.showLabels) {
			this.$.startKnob.createComponent({name: 'startLabel', kind: RangeSliderKnobLabel});
			this.$.endKnob.createComponent({name: 'endLabel', kind: RangeSliderKnobLabel});
		}
		// add handlers for up/down events on knobs for pressed state (workaround for inconsistent (timing-wise) active:hover styling)
		this.$.startKnob.ondown = 'knobDown';
		this.$.startKnob.onup = 'knobUp';
		this.$.endKnob.ondown = 'knobDown';
		this.$.endKnob.onup = 'knobUp';
	},

	/**
	* Refreshes the knob positions.
	*
	* @private
	*/
	refreshRangeSlider: function () {
		// Calculate range percentages, in order to position sliders
		this.beginValue = this.calcKnobPercent(this.rangeStart);
		this.endValue = this.calcKnobPercent(this.rangeEnd);
		this.beginValueChanged();
		this.endValueChanged();
	},

	/**
	* Calculates the completion ratio for the passed-in value.
	*
	* @param  {Number} value - Value for which completion ratio will be calculated.
	* @return {Number}         - Completion ratio (between `0` and `1`).
	*/
	calcKnobRatio: function (value) {
		return (value - this.rangeMin) / (this.rangeMax - this.rangeMin);
	},

	/**
	* Calculates the completion percentage for the passed-in value.
	*
	* @param  {Number} value - Value for which completion percentage will be calculated.
	* @return {Number}         - Completion percentage (between `0` and `100`).
	*/
	calcKnobPercent: function (value) {
		return this.calcKnobRatio(value) * 100;
	},

	/**
	* @private
	*/
	beginValueChanged: function (sliderPos) {
		if (sliderPos === undefined) {
			var p = this.calcPercent(this.beginValue);
			this.updateKnobPosition(p, this.$.startKnob);
		}
	},

	/**
	* @private
	*/
	endValueChanged: function (sliderPos) {
		if (sliderPos === undefined) {
			var p = this.calcPercent(this.endValue);
			this.updateKnobPosition(p, this.$.endKnob);
		}
	},

	/**
	* Calculates the appropriate knob position during a drag event.
	* @param  {Event} event - The drag event.
	* @return {Number}        - The knob position.
	*/
	calcKnobPosition: function (event) {
		var x = event.clientX - this.hasNode().getBoundingClientRect().left;
		return (x / this.getBounds().width) * (this.max - this.min) + this.min;
	},

	/**
	* @private
	*/
	updateKnobPosition: function (percent, control) {
		control.applyStyle('left', percent + '%');
		this.updateBarPosition();
	},

	/**
	* Updates the position of the bar between the knobs.
	*
	* @private
	*/
	updateBarPosition: function () {
		if ((this.$.startKnob !== undefined) && (this.$.endKnob !== undefined)) {
			var barStart = this.calcKnobPercent(this.rangeStart);
			var barWidth = this.calcKnobPercent(this.rangeEnd) - barStart;
			this.$.bar.applyStyle('left', barStart + '%');
			this.$.bar.applyStyle('width', barWidth + '%');
		}
	},

	/**
	* Calculates the ratio of the value within the allowed range.
	*
	* @return {Number}
	* @private
	*/
	calcRangeRatio: function (value) {
		return ((value / 100) * (this.rangeMax - this.rangeMin) + this.rangeMin) - (this.increment/2);
	},

	/**
	* Ensures that the active knob is on top.
	*
	* @param {String} controlName - Name of active knob.
	* @private
	*/
	swapZIndex: function (controlName) {
		if (controlName === 'startKnob') {
			this.$.startKnob.applyStyle('z-index', 1);
			this.$.endKnob.applyStyle('z-index', 0);
		} else if (controlName === 'endKnob') {
			this.$.startKnob.applyStyle('z-index', 0);
			this.$.endKnob.applyStyle('z-index', 1);
		}
	},

	/**
	* @private
	*/
	down: function (sender, event) {
		this.swapZIndex(sender.name);
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
	* @fires module:onyx/RangeSlider~RangeSlider#onChanging
	* @private
	*/
	drag: function (sender, event) {
		if (this.dragging) {
			var knobPos = this.calcKnobPosition(event);
			var _val, val, p;

			if ((sender.name === 'startKnob') && (knobPos >= 0)) {
				if (((knobPos <= this.endValue) && (event.xDirection === -1)) || (knobPos <= this.endValue)) {
					this.setBeginValue(knobPos);
					_val = this.calcRangeRatio(this.beginValue);
					val = (this.increment) ? this.calcIncrement(_val+0.5*this.increment) : _val;
					p = this.calcKnobPercent(val);
					this.updateKnobPosition(p, this.$.startKnob);
					this.setRangeStart(val);
					this.doChanging({value: val});
				} else {
					return this.drag(this.$.endKnob, event);
				}
			} else if ((sender.name === 'endKnob') && (knobPos <= 100)) {
				if (((knobPos >= this.beginValue) && (event.xDirection === 1)) || (knobPos >= this.beginValue)) {
					this.setEndValue(knobPos);
					_val = this.calcRangeRatio(this.endValue);
					val = (this.increment) ? this.calcIncrement(_val+0.5*this.increment) : _val;
					p = this.calcKnobPercent(val);
					this.updateKnobPosition(p, this.$.endKnob);
					this.setRangeEnd(val);
					this.doChanging({value: val});
				} else {
					return this.drag(this.$.startKnob, event);
				}
			}
			return true;
		}
	},

	/**
	* @fires module:onyx/RangeSlider~RangeSlider#onChange
	* @private
	*/
	dragfinish: function (sender, event) {
		this.dragging = false;
		event.preventTap();
		var val;
		if (sender.name === 'startKnob') {
			val = this.calcRangeRatio(this.beginValue);
			this.doChange({value: val, startChanged: true});
		} else if (sender.name === 'endKnob') {
			val = this.calcRangeRatio(this.endValue);
			this.doChange({value: val, startChanged: false});
		}
		sender.removeClass('pressed');
		return true;
	},

	/**
	* @private
	*/
	knobDown: function (sender, event) {
		sender.addClass('pressed');
	},

	/**
	* @private
	*/
	knobUp: function (sender, event) {
		sender.removeClass('pressed');
	},

	/**
	* @private
	*/
	rangeMinChanged: function () {
		this.refreshRangeSlider();
	},

	/**
	* @private
	*/
	rangeMaxChanged: function () {
		this.refreshRangeSlider();
	},

	/**
	* @private
	*/
	rangeStartChanged: function () {
		this.refreshRangeSlider();
	},

	/**
	* @private
	*/
	rangeEndChanged: function () {
		this.refreshRangeSlider();
	},

	/**
	* Sets the label for the start knob.
	*
	* @param {String} content - New label for start knob.
	* @fires module:onyx/RangeSlider~RangeSlider#onSetLabel
	* @public
	*/
	setStartLabel: function (content) {
		this.$.startKnob.waterfallDown('onSetLabel', content);
	},

	/**
	* Sets the label for the end knob.
	*
	* @param {String} content - New label for end knob.
	* @fires module:onyx/RangeSlider~RangeSlider#onSetLabel
	* @public
	*/
	setEndLabel: function (content) {
		this.$.endKnob.waterfallDown('onSetLabel', content);
	}
});

/**
* The declaration for the {@link module:onyx/RangeSlider~RangeSliderKnobLabel} kind
*/
module.exports.KnobLabel = RangeSliderKnobLabel;

}],'onyx/Drawer':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Drawer~Drawer} kind.
* @module onyx/Drawer
*/

var
	kind = require('enyo/kind'),
	Drawer = require('enyo/Drawer');

/**
* {@link module:onyx/Drawer~Drawer} is now an empty kind derived from {@link module:enyo/Drawer~Drawer}.
* All of its functionality has been moved into the latter kind.
*
* For more information, see the documentation on
* [Drawers]{@linkplain $dev-guide/building-apps/layout/drawers.html} in the
* Enyo Developer Guide.
*
* @class Drawer
* @extends module:enyo/Drawer~Drawer
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Drawer~Drawer.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Drawer',

	/**
	* @private
	*/
	kind: Drawer
});

}],'onyx/InputDecorator':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/InputDecorator~InputDecorator} kind.
* @module onyx/InputDecorator
*/

var
	kind = require('enyo/kind'),
	ToolDecorator = require('enyo/ToolDecorator');

/**
* {@link module:onyx/InputDecorator~InputDecorator} is a control that provides input styling. Any
* controls in the InputDecorator will appear to be inside an area styled as an
* input. Usually, an InputDecorator surrounds an {@link module:onyx/Input~Input}.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Input = require('onyx/Input'),
* 		InputDecorator = require('onyx/InputDecorator');
*
* 	{kind: InputDecorator, components: [
* 		{kind: Input}
* 	]}
* ```
*
* Other controls, such as buttons, may be placed to the right or left of the
* input control, e.g.:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		IconButton = require('onyx/IconButton'),
* 		Input = require('onyx/Input'),
* 		InputDecorator = require('onyx/InputDecorator');
*
* 	{kind: InputDecorator, components: [
* 		{kind: IconButton, src: 'onyx/assets/search.png'},
* 		{kind: Input},
* 		{kind: IconButton, src: 'onyx/assets/cancel.png'}
* 	]}
* ```
*
* Note that the InputDecorator fits around the content inside it. If the
* decorator is sized, then its contents will likely need to be sized as well.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Input = require('onyx/Input'),
* 		InputDecorator = require('onyx/InputDecorator');
*
* 	{kind: InputDecorator, style: 'width: 500px;', components: [
* 		{kind: Input, style: 'width: 100%;'}
* 	]}
* ```
*
* @class InputDecorator
* @extends module:enyo/ToolDecorator~ToolDecorator
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/InputDecorator~InputDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.InputDecorator',

	/**
	* @private
	*/
	kind: ToolDecorator,

	/**
	* @private
	*/
	tag: 'label',

	/**
	* @private
	*/
	classes: 'onyx-input-decorator',

	/**
	* @lends module:onyx/InputDecorator~InputDecorator.prototype
	* @private
	*/
	published: {
		/**
		* If set to `true`, the input will look focused, even when it doesn't
		* actually have focus.
		* @type {Boolean}
		* @default  false
		* @public
		*/
		alwaysLooksFocused: false
	},

	/**
	* @private
	*/
	handlers: {
		onDisabledChange: 'disabledChange',
		onfocus: 'receiveFocus',
		onblur: 'receiveBlur'
	},

	/**
	* @private
	*/
	create: function () {
		ToolDecorator.prototype.create.apply(this, arguments);
		this.updateFocus(false);
	},

	/**
	* @private
	*/
	alwaysLooksFocusedChanged: function (oldValue) {
		this.updateFocus(this.focus);
	},

	/**
	* Updates the focus state of the control unless
	* [alwaysLooksFocused]{@link module:onyx/InputDecorator~InputDecorator#alwaysLooksFocused} is `true`.
	*
	* @param  {Boolean} focus - The requested focus state.
	* @private
	*/
	updateFocus: function (focus) {
		this.focused = focus;
		this.addRemoveClass('onyx-focused', this.alwaysLooksFocused || this.focused);
	},

	/**
	* Handles `onfocus` events triggered by child components.
	*
	* @private
	*/
	receiveFocus: function () {
		this.updateFocus(true);
	},

	/**
	* Handles `onblur` events triggered by child components.
	*
	* @private
	*/
	receiveBlur: function () {
		this.updateFocus(false);
	},

	/**
	* Handles `onDisabledChange` events triggered by child components.
	*
	* @private
	*/
	disabledChange: function (sender, event) {
		this.addRemoveClass('onyx-disabled', event.originator.disabled);
	}
});

}],'onyx/Checkbox':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Checkbox~Checkbox} kind.
* @module onyx/Checkbox
*/

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	Checkbox = require('enyo/Checkbox');

/**
* {@link module:onyx/Checkbox~Checkbox} is a box that shows or hides a checkmark when clicked. The
* [onActivate]{@link module:enyo/Checkbox~Checkbox#onActivate} event is fired when the box is clicked.
* Call `getValue()` to retrieve a boolean indicating whether the box is currently
* checked.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Checkbox = require('onyx/Checkbox');
*
* 	{kind: Checkbox, onchange: 'checkboxClicked'},
*
* 	checkboxClicked: function (sender) {
* 		if (sender.getValue()) {
* 			this.log('Someone checked me!');
* 		}
* 	}
* ```
*
* @class Checkbox
* @extends module:enyo/Checkbox~Checkbox
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Checkbox~Checkbox.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Checkbox',

	/**
	* @private
	*/
	classes: 'onyx-checkbox',

	/**
	* @private
	*/
	kind: Checkbox,

	/**
	* @private
	*/
	tag: 'div',

	/**
	* @private
	*/
	tap: function (sender, e) {
		if (!this.disabled) {
			this.setChecked(!this.getChecked());
			this.bubble('onchange');
		}
		return !this.disabled;
	},

	/**
	* Overrides {@link module:enyo/Input~Input} `dragstart` handler, to allow drags to propagate
	* for Checkbox.
	*
	* @private
	*/
	dragstart: utils.nop
});

}],'onyx/RichText':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/RichText~RichText} kind.
* @module onyx/RichText
*/

var
	kind = require('enyo/kind'),
	RichText = require('enyo/RichText');

/**
* {@link module:onyx/RichText~RichText} is an Onyx-styled rich text control, derived from
* {@link module:enyo/RichText~RichText}. Typically, an `onyx/RichText` is placed inside an
* {@link module:onyx/InputDecorator~InputDecorator}, which provides styling, e.g.:
*
* ```
* var
* 	InputDecorator = require('onyx/InputDecorator'),
* 	RichText = require('onyx/RichText');
*
* {kind: InputDecorator, components: [
* 	{kind: RichText, style: 'width: 100px;', onchange: 'inputChange'}
* ]}
* ```
*
* For more information, see the documentation on
* [Text Fields]{@linkplain $dev-guide/building-apps/controls/text-fields.html}
* in the Enyo Developer Guide.
*
* @class RichText
* @extends module:enyo/RichText~RichText
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/RichText~RichText.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.RichText',

	/**
	* @private
	*/
	kind: RichText,

	/**
	* @private
	*/
	classes: 'onyx-richtext'
});

}],'onyx/TextArea':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/TextArea~TextArea} kind.
* @module onyx/TextArea
*/

var
	kind = require('enyo/kind'),
	TextArea = require('enyo/TextArea');

/**
* {@link module:onyx/TextArea~TextArea} is an Onyx-styled TextArea control, derived from
* {@link module:enyo/TextArea~TextArea}. Typically, an `onyx/TextArea` is placed inside an
* {@link module:onyx/InputDecorator~InputDecorator}, which provides styling, e.g.:
*
* ```
* var
* 	InputDecorator = require('onyx/InputDecorator'),
* 	TextArea = require('onyx/TextArea');
*
* {kind: InputDecorator, components: [
* 	{kind: TextArea, onchange: 'inputChange'}
* ]}
* ```
*
* For more information, see the documentation on
* [Text Fields]{@linkplain $dev-guide/building-apps/controls/text-fields.html}
* in the Enyo Developer Guide.
*
* @class TextArea
* @extends module:enyo/TextArea~TextArea
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/TextArea~TextArea.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.TextArea',

	/**
	* @private
	*/
	kind: TextArea,

	/**
	* @private
	*/
	classes: 'onyx-textarea'
});

}],'onyx/Popup':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Popup~Popup} kind.
* @module onyx/Popup
*/

var
	kind = require('enyo/kind'),
	Popup = require('enyo/Popup');

/**
* {@link module:onyx/Popup~Popup} is an {@link module:enyo/Popup~Popup} with Onyx styling applied.
*
* For more information, see the documentation on
* [Popups]{@linkplain $dev-guide/building-apps/controls/popups.html} in the
* Enyo Developer Guide.
*
* @class Popup
* @extends module:enyo/Popup~Popup
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Popup~Popup.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Popup',

	/**
	* @private
	*/
	kind: Popup,

	/**
	* @private
	*/
	classes: 'onyx-popup'
});

}],'onyx/Button':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Button~Button} kind.
* @module onyx/Button
*/

var
	kind = require('enyo/kind'),
	Button = require('enyo/Button');

/**
* {@link module:onyx/Button~Button} is an {@link module:enyo/Button~Button} with Onyx styling applied. The
* color of the button may be customized by specifying a background color.
*
* The `'onyx-affirmative'`, `'onyx-negative'`, and `'onyx-blue'` classes provide
* some built-in presets.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Button = require('onyx/Button');
*
* 	{kind: Button, content: 'Button'},
* 	{kind: Button, content: 'Affirmative', classes: 'onyx-affirmative'},
* 	{kind: Button, content: 'Negative', classes: 'onyx-negative'},
* 	{kind: Button, content: 'Blue', classes: 'onyx-blue'},
* 	{kind: Button, content: 'Custom', style: 'background-color: purple; color: #F1F1F1;'}
* ```
* For more information, see the documentation on
* [Buttons]{@linkplain $dev-guide/building-apps/controls/buttons.html} in the
* Enyo Developer Guide.
*
* @class Button
* @extends module:enyo/Button~Button
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Button~Button.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Button',

	/**
	* @private
	*/
	kind: Button,

	/**
	* @private
	*/
	classes: 'onyx-button enyo-unselectable',

	/**
	* @private
	*/
	handlers: {
		ondown: 'down',
		onenter: 'enter',
		ondragfinish: 'dragfinish',
		onleave: 'leave',
		onup: 'up'
	},

	/**
	* @private
	*/
	down: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		this.addClass('pressed');
		this._isPressed = true;
	},

	/**
	* @private
	*/
	enter: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		if(this._isPressed) {
			this.addClass('pressed');
		}
	},

	/**
	* @private
	*/
	dragfinish: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		this.removeClass('pressed');
		this._isPressed = false;
	},

	/**
	* @private
	*/
	leave: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		this.removeClass('pressed');
	},

	/**
	* @private
	*/
	up: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		this.removeClass('pressed');
		this._isPressed = false;
	}
});

}],'onyx/RadioButton':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/RadioButton~RadioButton} kind.
* @module onyx/RadioButton
*/

var
	kind = require('enyo/kind'),
	Button = require('enyo/Button');

/**
* {@link module:onyx/RadioButton~RadioButton} is a radio button designed for use within an
* {@link module:onyx/RadioGroup~RadioGroup}.
*
* @class RadioButton
* @extends module:enyo/Button~Button
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/RadioButton~RadioButton.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.RadioButton',

	/**
	* @private
	*/
	kind: Button,

	/**
	* @private
	*/
	classes: 'onyx-radiobutton'
});

}],'onyx/MenuItem':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/MenuItem~MenuItem} kind.
* @module onyx/MenuItem
*/

var
	kind = require('enyo/kind'),
	Button = require('enyo/Button');

/**
* Fires when the menu item is selected.
*
* @event module:onyx/MenuItem~MenuItem#onSelect
* @type {Object}
* @property {module:enyo/Control~Control} selected - The selected menu item.
* @property {String} content - The selected menu item's content.
* @public
*/

/**
* Fires when the menu item's content changes.
*
* @event module:onyx/MenuItem~MenuItem#onItemContentChange
* @type {Object}
* @property {module:enyo/Control~Control} content - The menu item's content.
* @public
*/

/**
* {@link module:onyx/MenuItem~MenuItem} is a button styled to look like a menu
* item, designed for use in an {@link module:onyx/Menu~Menu}. When a component
* is created inside of a Menu, it will be a MenuItem by default.
*
* When a MenuItem is tapped, it tells the menu to hide itself and emits an
* [onSelect]{@link module:onyx/MenuItem~MenuItem#onSelect} event with its
* content and a reference to itself. This event and its properties may be
* handled by a client application to determine which MenuItem was selected.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind');
*
* 	var
* 		Menu = require('onyx/Menu'),
* 		MenuDecorator = require('onyx/MenuDecorator');
*
* 	module.exports = kind(
* 		name: 'onyx.MenuItemExample',
* 		handlers: {
* 			onSelect: 'itemSelected'
* 		},
* 		components: [
* 			{kind: MenuDecorator, components: [
* 				{content: 'Open Menu (floating)'},
* 				{kind: Menu, floating: true, components: [
* 					{content: '1'},
* 					{content: '2'},
* 					{classes: 'onyx-menu-divider'},
* 					{content: 'Label', classes: 'onyx-menu-label'},
* 					{content: '3'},
* 				]}
* 			]}
* 		],
* 		itemSelected: function (sender, event) {
* 			enyo.log('Menu Item Selected: ' + event.originator.content);
* 		}
* 	)
* ```
*
* @class MenuItem
* @extends module:enyo/Button~Button
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/MenuItem~MenuItem.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.MenuItem',

	/**
	* @private
	*/
	kind: Button,

	/**
	* @private
	*/
	events: {
		onSelect: '',
		onItemContentChange: ''
	},

	/**
	* @private
	*/
	classes: 'onyx-menu-item',

	/**
	* @private
	*/
	tag: 'div',

	/**
	* @private
	*/
	create: function () {
		this.silence();
		Button.prototype.create.apply(this, arguments);
		this.unsilence();
		if (this.active){
			this.bubble('onActivate');
		}
	},

	/**
	* Handles `ontap` events.
	*
	* @fires module:onyx/Menu~Menu#onRequestHideMenu
	* @fires module:onyx/MenuItem~MenuItem#onSelect
	* @private
	*/
	tap: function (sender) {
		Button.prototype.tap.apply(this, arguments);
		this.bubble('onRequestHideMenu');
		this.doSelect({selected:this, content:this.content});
	},

	/**
	* Sends notification that the item's content has changed.
	*
	* @fires module:onyx/MenuItem~MenuItem#onItemContentChange
	* @private
	*/
	contentChanged: function (old) {
		Button.prototype.contentChanged.apply(this, arguments);
		this.doItemContentChange({content: this.content});
	}
});

}],'onyx/TabBarItem':[function (module,exports,global,require,request){
﻿require('onyx');

/**
* Contains the declaration for the {@link module:onyx/TabBarItem~TabBarItem} kind.
* @wip
* @module onyx/TabBarItem
*/

var
	kind = require('enyo/kind'),
	Button = require('enyo/Button'),
	GroupItem = require('enyo/GroupItem');

/**
* onyx.TabBarItem is a special button for {@link module:onyx/TabBar~TabBar}. This widget is
* designed to be used only within TabBar.
*
* @class TabBarItem
* @extends module:enyo/GroupItem~GroupItem
* @wip
* @ui
* @private
*/
module.exports = kind(
	/** @lends module:onyx/TabBar~TabBar.Item */ {

	/**
	* @private
	*/
	name: 'onyx.TabBarItem',

	/**
	* @private
	*/
	kind: GroupItem,

	/**
	* @private
	*/
	classes: 'onyx-tab-item',

	/**
	* @private
	*/
	events: {
		onTabActivated: '',
		onTabCloseRequest: '',
		onTabSwitchRequest: '',
		onActivate: '',
		onShowTooltip: '',
		onHideTooltip: ''
	},

	/**
	* @private
	*/
	handlers: {
		onmouseover: 'navOver',
		onmouseout: 'navOut'
	},

	/**
	* @private
	*/
	navOver: function (item) {
		this.$.dissolve.addClass('onyx-tab-item-hovered');
	},

	/**
	* @private
	*/
	navOut: function (item) {
		this.$.dissolve.removeClass('onyx-tab-item-hovered');
	},

	/**
	* @private
	*/
	components: [
		{kind: Button, name: 'button', ontap: 'requestSwitch', onmouseover: 'showTooltipFromTab', onmouseout: 'doHideTooltip'},
		{classes: 'onyx-tab-item-dissolve', ontap: 'requestSwitch', name: 'dissolve', showing: false, onmouseover: 'showTooltipFromTab', onmouseout: 'doHideTooltip'},
		{classes: 'onyx-tab-item-close', name: 'closeButton' , ontap: 'requestClose'}
	],

	/**
	* @private
	*/
	create: function () {
		GroupItem.prototype.create.apply(this, arguments);
		this.$.button.setContent(this.content);
	},

	/**
	* @private
	*/
	raise: function () {
		this.addClass('active');
		this.$.dissolve.addClass('active');
	},

	/**
	* @private
	*/
	putBack: function () {
		this.removeClass('active');
		this.$.dissolve.removeClass('active');
	},

	/**
	* @private
	*/
	setActiveTrue: function () {
		this.setActive(true);
	},

	/**
	* @private
	*/
	activeChanged: function (inOldValue) {
		// called during destruction, hence the test on this.container
		if (this.container && this.hasNode()) {
			if (this.active) {
				this.raise();
			} else {
				this.putBack();
			}
			this.doActivate();
		}
		// do not return true;
		// activate event must be propagated to my RadioGroup owner
	},

	/**
	* @private
	*/
	_origWidth: null,

	/**
	* @private
	*/
	origWidth: function () {
		this._origWidth = this._origWidth || this.getBounds().width ;
		return this._origWidth;
	},

	/**
	* @private
	*/
	reduce: function (coeff) {
		var width = Math.floor(this.origWidth() * coeff) - this.$.closeButton.getBounds().width - 7;

		if (coeff === 1) {
			this.$.dissolve.hide();
		} else {
			this.$.dissolve.show();
		}

		this.$.button.applyStyle('width', width + 'px');
	},

	/**
	* @private
	*/
	requestSwitch: function (inSender, inEvent) {
		var i = this.indexInContainer();
		this.doTabSwitchRequest({
			index:    i,
			caption:  this.content,
			userData: this.userData,
			userId:   this.userId
		});
		return true;
	},

	/**
	* @private
	*/
	requestClose: function (inSender, inEvent) {
		this.doTabCloseRequest({ index: this.tabIndex });
		return true;
	},

	/**
	* @private
	*/
	showTooltipFromTab: function (inSender, inEvent){
		this.doShowTooltip({tooltipContent: this.tooltipMsg, bounds:this.getBounds()});
	}
});

}],'onyx/Tooltip':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Tooltip~Tooltip} kind.
* @module onyx/Tooltip
*/

var
	kind = require('enyo/kind');

var
	Popup = require('onyx/Popup');

/**
* {@link module:onyx/Tooltip~Tooltip} is a subkind of {@link module:onyx/Popup~Popup} that works in
* conjunction with an {@link module:onyx/TooltipDecorator~TooltipDecorator}. It automatically displays
* a tooltip when the user hovers over the decorator. The tooltip is positioned
* around the decorator where there is available window space.
*
* ```
* var
* 	Button = require('onyx/Button'),
* 	Tooltip = require('onyx/Tooltip'),
* 	TooltipDecorator = require('onyx/TooltipDecorator');
*
*	{kind: TooltipDecorator, components: [
*		{kind: Button, content: 'Tooltip'},
*		{kind: Tooltip, content: 'I am a tooltip for a button.'}
*	]}
* ```
*
* You may also force a tooltip to be displayed by calling its `show()` method.
*
* @class Tooltip
* @extends module:onyx/Popup~Popup
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Tooltip~Tooltip.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Tooltip',

	/**
	* @private
	*/
	kind: Popup,

	/**
	* @private
	*/
	classes: 'onyx-tooltip below left-arrow',

	/**
	* If `true`, the tooltip is automatically dismissed when user stops hovering
	* over the decorator.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	autoDismiss: false,

	/**
	* Hovering over the decorator for this length of time (in milliseconds)
	* causes the tooltip to appear.
	*
	* @type {Number}
	* @default 500
	* @public
	*/
	showDelay: 500,

	/**
	* Default `'margin-left'` value.
	*
	* @type {Number}
	* @default -6
	* @public
	*/
	defaultLeft: -6,

	/**
	* @private
	*/
	handlers: {
		onRequestShowTooltip: 'requestShow',
		onRequestHideTooltip: 'requestHide'
	},

	/**
	* @private
	*/
	requestShow: function () {
		this.showJob = setTimeout(this.bindSafely('show'), this.showDelay);
		return true;
	},

	/**
	* @private
	*/
	cancelShow: function () {
		clearTimeout(this.showJob);
	},

	/**
	* @private
	*/
	requestHide: function () {
		this.cancelShow();
		return Popup.prototype.requestHide.apply(this, arguments);
	},

	/**
	* @private
	*/
	showingChanged: function () {
		this.cancelShow();
		this.adjustPosition(true);
		Popup.prototype.showingChanged.apply(this, arguments);
	},

	/**
	* @private
	*/
	applyPosition: function (inRect) {
		var s = '';
		for (var n in inRect) {
			s += (n + ':' + inRect[n] + (isNaN(inRect[n]) ? '; ' : 'px; '));
		}
		this.addStyles(s);
	},

	/**
	* @private
	*/
	adjustPosition: function (belowActivator) {
		if (this.showing && this.hasNode()) {
			var b = this.node.getBoundingClientRect();

			//when the tooltip bottom goes below the window height move it above the decorator
			if (b.top + b.height > window.innerHeight) {
				this.addRemoveClass('below', false);
				this.addRemoveClass('above', true);
			} else {
				this.addRemoveClass('above', false);
				this.addRemoveClass('below', true);
			}

			// when the tooltip's right edge is out of the window, align its right edge with the decorator left
			// edge (approx)
			if (b.left + b.width > window.innerWidth){
				this.applyPosition({'margin-left': -b.width, bottom: 'auto'});
				//use the right-arrow
				this.addRemoveClass('left-arrow', false);
				this.addRemoveClass('right-arrow', true);
			}
		}
	},

	/**
	* @private
	*/
	handleResize: function () {
		//reset the tooltip to align its left edge with the decorator
		this.applyPosition({'margin-left': this.defaultLeft, bottom: 'auto'});
		this.addRemoveClass('left-arrow', true);
		this.addRemoveClass('right-arrow', false);

		this.adjustPosition(true);
		Popup.prototype.handleResize.apply(this, arguments);
	}
});

}],'onyx/ContextualPopup':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/ContextualPopup~ContextualPopup} kind.
* @module onyx/ContextualPopup
*/

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	Popup = require('enyo/Popup'),
	Scroller = require('enyo/Scroller'),
	TouchScrollStrategy = require('enyo/TouchScrollStrategy');

var
	Button = require('onyx/Button');

/**
* Fires when the popup is tapped.
* @todo  Should this be removed? Never triggered and duplicate of ontap
* @event module:onyx/ContextualPopup~ContextualPopup#onTap
* @public
*/

/**
* {@link module:onyx/ContextualPopup~ContextualPopup} is a subkind of {@link module:enyo/Popup~Popup}. Contextual
* popups serve as child windows that appear near the point of initiation. Use
* them to prompt users to make a selection from a defined set of options; to
* conduct other quick, single-step interactions in which context should be
* maintained; and to present simple views, such as previews.
*
* A contextual popup is meant to be used in conjunction with a decorator, such
* as an {@link module:onyx/MenuDecorator~MenuDecorator}. The decorator couples the popup with an
* activating control, which may be a button or any other control with an
* `onActivate` event. When the control is activated, the popup shows itself in
* the correct position relative to the activator.
*
* Note that, by default, the popup is not floating, so toolbars and controls
* with high z-index values may obscure it. You may set the `floating` property
* to `true` to have the popup always appear on top; however, the popup will not
* be in the containing document's flow and so will not scroll with the document.
*
* In addition, while contextual popups have their own positioning logic, they
* do not currently have their own sizing logic, so be sure to take this into
* account when using them.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		ContextualPopup = require('onyx/ContextualPopup'),
* 		MenuDecorator = require('onyx/MenuDecorator');
*
* 	{kind: MenuDecorator, components: [
* 		{content: 'Show Popup'},
* 		{kind: ContextualPopup,
* 			title: 'Sample Popup',
* 			actionButtons: [
* 				{content:'Button 1', classes: 'onyx-button-warning'},
* 				{content:'Button 2'}
* 			],
* 			components: [
* 				{content:'Sample component in popup'}
* 			]
* 		}
* 	]}
* ```
*
* @class ContextualPopup
* @extends module:enyo/Popup~Popup
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/ContextualPopup~ContextualPopup.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.ContextualPopup',

	/**
	* @private
	*/
	kind: Popup,

	/**
	* @private
	*/
	modal: true,

	/**
	* @private
	*/
	autoDismiss: true,

	/**
	* @private
	*/
	floating: false,

	/**
	* @private
	*/
	classes: 'onyx-contextual-popup enyo-unselectable',

	/**
	* @lends module:onyx/ContextualPopup~ContextualPopup.prototype
	* @private
	*/
	published: {
		/**
		* Maximum height of the menu, in pixels.
		*
		* @type {Number}
		* @default  100
		* @public
		*/
		maxHeight: 100,

		/**
		* Whether scrolling is enabled.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		scrolling: true,

		/**
		* Popup title content.
		*
		* @type {String}
		* @public
		*/
		title: undefined,

		/**
		* Buttons displayed at bottom of popup.
		*
		* @type {Array}
		* @public
		*/
		actionButtons: []
	},

	/** @lends module:onyx/ContextualPopup~ContextualPopup */
	statics: {
		/**
		* @private
		*/
		subclass: function (ctor, props) {
			var proto = ctor.prototype;
			if (props.actionButtons) {
				proto.kindActionButtons = props.actionButtons;
				delete proto.actionButtons;
			}
		}
	},

	/**
	* Vertical flush layout margin.
	*
	* @type {Number}
	* @private
	*/
	vertFlushMargin: 60,

	/**
	* Horizontal flush layout margin.
	*
	* @type {Number}
	* @private
	*/
	horizFlushMargin: 50,

	/**
	* Popups wider than this value are considered wide (for layout purposes).
	*
	* @type {Number}
	* @private
	*/
	widePopup: 200,

	/**
	* Popups longer than this value are considered long (for layout purposes).
	*
	* @type {Number}
	* @private
	*/
	longPopup: 200,

	/**
	* Do not allow horizontal flush popups past this amount of buffer space on
	* left/right screen edge.
	*
	* @type {Number}
	* @private
	*/
	horizBuffer: 16,

	/**
	* @private
	*/
	events: {
		onTap: ''
	},

	/**
	* @private
	*/
	handlers: {
		onActivate: 'childControlActivated',
		onRequestShowMenu: 'requestShow',
		onRequestHideMenu: 'requestHide'
	},

	/**
	* @private
	*/
	components: [
		{name: 'title', classes: 'onyx-contextual-popup-title'},
		{classes: 'onyx-contextual-popup-scroller', components:[
			{name: 'client', kind: Scroller, vertical: 'auto', classes: 'enyo-unselectable', thumb: false, strategyKind: TouchScrollStrategy}
		]},
		{name: 'actionButtons', classes: 'onyx-contextual-popup-action-buttons'}
	],

	/**
	* Name of the Scroller component.
	*
	* @private
	*/
	scrollerName: 'client',

	/**
	* @private
	*/
	create: function () {
		Popup.prototype.create.apply(this, arguments);
		this.maxHeightChanged();
		this.titleChanged();
		this.actionButtonsChanged();
	},

	/**
	* @private
	*/
	getScroller: function () {
		return this.$[this.scrollerName];
	},

	/**
	* @private
	*/
	titleChanged: function (){
		this.$.title.setContent(this.title);
	},

	/**
	* @private
	*/
	actionButtonsChanged: function () {
		if (this.actionButtons) {
			utils.forEach(this.actionButtons, function (button) {
				button.kind = Button;
				button.classes = button.classes + ' onyx-contextual-popup-action-button';
				button.popup = this;
				button.actionButton = true;
				this.$.actionButtons.createComponent(button, {
					owner: this.getInstanceOwner()
				});
			}, this);
		} else if (this.kindActionButtons) {
			utils.forEach(this.kindActionButtons, function (button) {
				button.kind = Button;
				button.classes = button.classes + ' onyx-contextual-popup-action-button';
				button.popup = this;
				button.actionButton = true;
				this.$.actionButtons.createComponent(button, {
					owner: this
				});
			}, this);
		}
		if(this.hasNode()) {
			this.$.actionButtons.render();
		}
	},

	/**
	* @private
	*/
	maxHeightChanged: function () {
		if (this.scrolling) {
			this.getScroller().setMaxHeight(this.maxHeight + 'px');
		}
	},

	/**
	* @private
	*/
	showingChanged: function () {
		Popup.prototype.showingChanged.apply(this, arguments);
		if (this.scrolling) {
			this.getScroller().setShowing(this.showing);
		}
		if (!this.showing) {
			this.activator = this.activatorOffset = null;
		}
		this.adjustPosition();
	},

	/**
	* @todo  document why bubbling is explicitly prevented
	* @private
	*/
	childControlActivated: function (sender, event) {
		return true;
	},

	/**
	* Handles `onRequestShowMenu` events.
	*
	* @private
	*/
	requestShow: function (sender, event) {
		this.activator = event.activator.hasNode();
		this.show();
		return true;
	},

	/**
	* Handles `onRequestHideMenu` events.
	*
	* @private
	*/
	requestHide: function (sender, event) {
		this.setShowing(false);
	},

	/**
	* Positions the popup.
	*
	* @todo seems to duplicate enyo.Control.setBounds()
	* @private
	*/
	applyPosition: function (rect) {
		var s = '';
		for (var n in rect) {
			s += (n + ':' + rect[n] + (isNaN(rect[n]) ? '; ' : 'px; '));
		}
		this.addStyles(s);
	},

	/**
	* Calculates the position of the popup relative to the page.
	*
	* @param {Element} node
	* @private
	*/
	getPageOffset: function (node) {
		var r = this.getBoundingRect(node);

		var pageYOffset = (window.pageYOffset === undefined) ? document.documentElement.scrollTop : window.pageYOffset;
		var pageXOffset = (window.pageXOffset === undefined) ? document.documentElement.scrollLeft : window.pageXOffset;
		var rHeight = (r.height === undefined) ? (r.bottom - r.top) : r.height;
		var rWidth = (r.width === undefined) ? (r.right - r.left) : r.width;

		return {top: r.top + pageYOffset, left: r.left + pageXOffset, height: rHeight, width: rWidth};
	},

	/**
	* Adjusts the popup position + nub location & direction.
	*
	* ContextualPopup positioning rules:
	*
	* 1. Activator Location:
	*    1. If activator is located in a corner then position using a flush style.
	*       1. Attempt vertical first.
	*       2. Horizontal if vertical doesn't fit.
	*    2. If not in a corner then check if the activator is located in one of the 4 "edges"
	*       of the view & position the following way if so:
	*       1.   Activator is in top edge, position popup below it.
	*       2.  Activator is in bottom edge, position popup above it.
	*       3. Activator is in left edge, position popup to the right of it.
	*       4.  Activator is in right edge, position popup to the left of it.
		*
	* 2. Screen Size - the popup should generally extend in the direction where there’s room
	*    for it.
	*
	*    Note: no specific logic below for this rule since it is built into the positioning
	*    functions, ie we attempt to never position a popup where there isn't enough room for
	*    it.
	*
	* 3. Popup Size:
	*
	*    1. If popup content is wide, use top or bottom positioning.
	*    2. If popup content is long, use horizontal positioning.
	*
	* 4. Favor top or bottom:
	*
	*    If all the above rules have been followed and location can still vary then favor top
	*    or bottom positioning.
	*
	* 5. If top or bottom will work, favor bottom.
	*
	*    Note: There is no specific logic below for this rule since it is built into the
	*    vertical position functions, i.e., we attempt to use a bottom position for the popup
	*    as much as possible. Additionally, within the vertical position function, we center
	*    the popup if the activator is at the vertical center of the view.
	*	
	* @private
	*/
	adjustPosition: function () {
		if (this.showing && this.hasNode() && this.activator) {
			this.resetPositioning();
			this.activatorOffset = this.getPageOffset(this.activator);
			var innerWidth = this.getViewWidth();
			var innerHeight = this.getViewHeight();

			//These are the view "flush boundaries"
			var topFlushPt = this.vertFlushMargin;
			var bottomFlushPt = innerHeight - this.vertFlushMargin;
			var leftFlushPt = this.horizFlushMargin;
			var rightFlushPt = innerWidth - this.horizFlushMargin;

			//Rule 1 - Activator Location based positioning
			//if the activator is in the top or bottom edges of the view, check if the popup needs flush positioning
			if ((this.activatorOffset.top + this.activatorOffset.height) < topFlushPt || this.activatorOffset.top > bottomFlushPt) {
				//check/try vertical flush positioning	(rule 1.a.i)
				if (this.applyVerticalFlushPositioning(leftFlushPt, rightFlushPt)) {
					return;
				}

				//if vertical doesn't fit then check/try horizontal flush (rule 1.a.ii)
				if (this.applyHorizontalFlushPositioning(leftFlushPt, rightFlushPt)) {
					return;
				}

				//if flush positioning didn't work then try just positioning vertically (rule 1.b.i & rule 1.b.ii)
				if (this.applyVerticalPositioning()){
					return;
				}
			//otherwise check if the activator is in the left or right edges of the view & if so try horizontal positioning
			} else if ((this.activatorOffset.left + this.activatorOffset.width) < leftFlushPt || this.activatorOffset.left > rightFlushPt) {
				//if flush positioning didn't work then try just positioning horizontally (rule 1.b.iii & rule 1.b.iv)
				if (this.applyHorizontalPositioning()){
					return;
				}
			}

			//Rule 2 - no specific logic below for this rule since it is inheritent to the positioning functions, ie we attempt to never
			//position a popup where there isn't enough room for it.

			//Rule 3 - Popup Size based positioning
			var clientRect = this.getBoundingRect(this.node);

			//if the popup is wide then use vertical positioning
			if (clientRect.width > this.widePopup) {
				if (this.applyVerticalPositioning()){
					return;
				}
			}
			//if the popup is long then use horizontal positioning
			else if (clientRect.height > this.longPopup) {
				if (this.applyHorizontalPositioning()){
					return;
				}
			}

			//Rule 4 - Favor top or bottom positioning
			if (this.applyVerticalPositioning()) {
				return;
			}
			//but if thats not possible try horizontal
			else if (this.applyHorizontalPositioning()){
				return;
			}

			//Rule 5 - no specific logic below for this rule since it is built into the vertical position functions, ie we attempt to
			//         use a bottom position for the popup as much possible.
		}
	},

	/**
	* Moves the popup below or above the activator and verifies that it fits onscreen.
	*
	* @return {Boolean} `true` if vertical positioning can be used; otherwise, `false`.
	* @private
	*/
	initVerticalPositioning: function () {
		this.resetPositioning();
		this.addClass('vertical');

		var clientRect = this.getBoundingRect(this.node);
		var innerHeight = this.getViewHeight();

		if (this.floating){
			if (this.activatorOffset.top < (innerHeight / 2)) {
				this.applyPosition({top: this.activatorOffset.top + this.activatorOffset.height, bottom: 'auto'});
				this.addClass('below');
			} else {
				this.applyPosition({top: this.activatorOffset.top - clientRect.height, bottom: 'auto'});
				this.addClass('above');
			}
		} else {
			//if the popup's bottom goes off the screen then put it on the top of the invoking control
			if ((clientRect.top + clientRect.height > innerHeight) && ((innerHeight - clientRect.bottom) < (clientRect.top - clientRect.height))){
				this.addClass('above');
			} else {
				this.addClass('below');
			}
		}

		//if moving the popup above or below the activator puts it past the edge of the screen then vertical doesn't work
		clientRect = this.getBoundingRect(this.node);
		if ((clientRect.top + clientRect.height) > innerHeight || clientRect.top < 0){
			return false;
		}

		return true;
	},

	/**
	* Implements positioning rules (rule 1.b.i & rule 1.b.ii).
	*
	* @return {Boolean} `true` if vertical positioning is used; otherwise, `false`.
	* @private
	*/
	applyVerticalPositioning: function () {
		//if we can't fit the popup above or below the activator then forget vertical positioning
		if (!this.initVerticalPositioning()) {
			return false;
		}

		var clientRect = this.getBoundingRect(this.node);
		var innerWidth = this.getViewWidth();

		if (this.floating){
			//Get the left edge delta to horizontally center the popup
			var centeredLeft = this.activatorOffset.left + this.activatorOffset.width/2 - clientRect.width/2;
			if (centeredLeft + clientRect.width > innerWidth) {//popup goes off right edge of the screen if centered
				this.applyPosition({left: this.activatorOffset.left + this.activatorOffset.width - clientRect.width});
				this.addClass('left');
			} else if (centeredLeft < 0) {//popup goes off left edge of the screen if centered
				this.applyPosition({left:this.activatorOffset.left});
				this.addClass('right');
			} else {//center the popup
				this.applyPosition({left: centeredLeft});
			}

		} else {
			//Get the left edge delta to horizontally center the popup
			var centeredLeftDelta = this.activatorOffset.left + this.activatorOffset.width/2 - clientRect.left - clientRect.width/2;
			if (clientRect.right + centeredLeftDelta > innerWidth) {//popup goes off right edge of the screen if centered
				this.applyPosition({left: this.activatorOffset.left + this.activatorOffset.width - clientRect.right});
				this.addRemoveClass('left', true);
			} else if (clientRect.left + centeredLeftDelta < 0) {//popup goes off left edge of the screen if centered
				this.addRemoveClass('right', true);
			} else {//center the popup
				this.applyPosition({left: centeredLeftDelta});
			}
		}

		return true;
	},

	/**
	* Implements positioning (rule 1.a.i).
	*
	* @return {Boolean} `true` if vertical flush positioning is used; otherwise, `false`.
	* @private
	*/
	applyVerticalFlushPositioning: function (leftFlushPt, rightFlushPt) {
		//if we can't fit the popup above or below the activator then forget vertical positioning
		if (!this.initVerticalPositioning()) {
			return false;
		}

		var clientRect = this.getBoundingRect(this.node);
		var innerWidth = this.getViewWidth();

		//If the activator's right side is within our left side cut off use flush positioning
		if ((this.activatorOffset.left + this.activatorOffset.width/2) < leftFlushPt){
			//if the activator's left edge is too close or past the screen left edge
			if (this.activatorOffset.left + this.activatorOffset.width/2 < this.horizBuffer){
				this.applyPosition({left:this.horizBuffer + (this.floating ? 0 : -clientRect.left)});
			} else {
				this.applyPosition({left:this.activatorOffset.width/2  + (this.floating ? this.activatorOffset.left : 0)});
			}

			this.addClass('right');
			this.addClass('corner');
			return true;
		}
		//If the activator's left side is within our right side cut off use flush positioning
		else if (this.activatorOffset.left + this.activatorOffset.width/2 > rightFlushPt) {
			if ((this.activatorOffset.left+this.activatorOffset.width/2) > (innerWidth-this.horizBuffer)){
				this.applyPosition({left:innerWidth - this.horizBuffer - clientRect.right});
			} else {
				this.applyPosition({left: (this.activatorOffset.left + this.activatorOffset.width/2) - clientRect.right});
			}
			this.addClass('left');
			this.addClass('corner');
			return true;
		}

		return false;
	},

	/**
	* Moves the popup left or right of the activator and verifies that it fits onscreen.
	* A return value of `true` is a precondition for using
	* [applyHorizontalPositioning()]{@link module:onyx/ContextualPopup~ContextualPopup#applyHorizontalPositioning} and
	* [applyHorizontalFlushPositioning()]{@link module:onyx/ContextualPopup~ContextualPopup#applyHorizontalFlushPositioning}.
	*
	* @return {Boolean} `true` if horizontal positioning can be used; otherwise, `false`.
	* @private
	*/
	initHorizontalPositioning: function () {
		this.resetPositioning();

		var clientRect = this.getBoundingRect(this.node);
		var innerWidth = this.getViewWidth();

		//adjust horizontal positioning of the popup & nub vertical positioning
		if (this.floating){
			if ((this.activatorOffset.left + this.activatorOffset.width) < innerWidth/2) {
				this.applyPosition({left: this.activatorOffset.left + this.activatorOffset.width});
				this.addRemoveClass('left', true);
			} else {
				this.applyPosition({left: this.activatorOffset.left - clientRect.width});
				this.addRemoveClass('right', true);
			}
		} else {
			if (this.activatorOffset.left - clientRect.width > 0) {
				this.applyPosition({left: this.activatorOffset.left - clientRect.left - clientRect.width});
				this.addRemoveClass('right', true);
			} else {
				this.applyPosition({left: this.activatorOffset.width});
				this.addRemoveClass('left', true);
			}
		}
		this.addRemoveClass('horizontal', true);

		//if moving the popup left or right of the activator puts it past the edge of the screen then horizontal won't work
		clientRect = this.getBoundingRect(this.node);
		if (clientRect.left < 0 || (clientRect.left + clientRect.width) > innerWidth){
			return false;
		}
		return true;

	},

	/**
	* Implements positioning (rule 1.b.iii & rule 1.b.iv).
	*
	* @return {Boolean} `true` if using horizontal positioning; otherwise, `false`.
	* @private
	*/
	applyHorizontalPositioning: function () {
		//if we can't fit the popup left or right of the activator then forget horizontal positioning
		if (!this.initHorizontalPositioning()) {
			return false;
		}

		var clientRect = this.getBoundingRect(this.node);
		var innerHeight = this.getViewHeight();
		var activatorCenter = this.activatorOffset.top + this.activatorOffset.height/2;

		if (this.floating){
			//if the activator's center is within 10% of the center of the view, vertically center the popup
			if ((activatorCenter >= (innerHeight/2 - 0.05 * innerHeight)) && (activatorCenter <= (innerHeight/2 + 0.05 * innerHeight))) {
				this.applyPosition({top: this.activatorOffset.top + this.activatorOffset.height/2 - clientRect.height/2, bottom: 'auto'});
			} else if (this.activatorOffset.top + this.activatorOffset.height < innerHeight/2) { //the activator is in the top 1/2 of the screen
				this.applyPosition({top: this.activatorOffset.top - this.activatorOffset.height, bottom: 'auto'});
				this.addRemoveClass('high', true);
			} else { //otherwise the popup will be positioned in the bottom 1/2 of the screen
				this.applyPosition({top: this.activatorOffset.top - clientRect.height + this.activatorOffset.height*2, bottom: 'auto'});
				this.addRemoveClass('low', true);
			}
		} else {
			//if the activator's center is within 10% of the center of the view, vertically center the popup
			if ((activatorCenter >= (innerHeight/2 - 0.05 * innerHeight)) && (activatorCenter <= (innerHeight/2 + 0.05 * innerHeight))) {
				this.applyPosition({top: (this.activatorOffset.height - clientRect.height)/2});
			} else if (this.activatorOffset.top + this.activatorOffset.height < innerHeight/2) { //the activator is in the top 1/2 of the screen
				this.applyPosition({top: -this.activatorOffset.height});
				this.addRemoveClass('high', true);
			} else { //otherwise the popup will be positioned in the bottom 1/2 of the screen
				this.applyPosition({top: clientRect.top - clientRect.height - this.activatorOffset.top + this.activatorOffset.height});
				this.addRemoveClass('low', true);
			}
		}
		return true;
	},

	/**
	* Implements positioning (rule 1.a.ii).
	*
	* @return {Boolean} `true` if using flush positioning; otherwise, `false`.
	* @private
	*/
	applyHorizontalFlushPositioning: function (leftFlushPt, rightFlushPt) {
		//if we can't fit the popup left or right of the activator then forget vertical positioning
		if (!this.initHorizontalPositioning()) {
			return false;
		}

		var clientRect = this.getBoundingRect(this.node);
		var innerHeight = this.getViewHeight();

		//adjust vertical positioning (high or low nub & popup position)
		if (this.floating){
			if (this.activatorOffset.top < (innerHeight/2)){
				this.applyPosition({top: this.activatorOffset.top + this.activatorOffset.height/2});
				this.addRemoveClass('high', true);
			} else {
				this.applyPosition({top:this.activatorOffset.top + this.activatorOffset.height/2 - clientRect.height});
				this.addRemoveClass('low', true);
			}
		} else {
			if (((clientRect.top + clientRect.height) > innerHeight) && ((innerHeight - clientRect.bottom) < (clientRect.top - clientRect.height))) {
				this.applyPosition({top: clientRect.top - clientRect.height - this.activatorOffset.top - this.activatorOffset.height/2});
				this.addRemoveClass('low', true);
			} else {
				this.applyPosition({top: this.activatorOffset.height/2});
				this.addRemoveClass('high', true);
			}
		}

		//If the activator's right side is within our left side cut off use flush positioning
		if ((this.activatorOffset.left + this.activatorOffset.width) < leftFlushPt){
			this.addClass('left');
			this.addClass('corner');
			return true;
		}
		//If the activator's left side is within our right side cut off use flush positioning
		else if (this.activatorOffset.left > rightFlushPt) {
			this.addClass('right');
			this.addClass('corner');
			return true;
		}

		return false;
	},

	/**
	* Calculates top/left values that are relative to the viewport and not absolute for the
	* provided Node.
	*
	* @param  {Element} Node.
	* @return {Object}  Object containing the top, bottom, left, right, height, and width of the
	* 	node.
	* @private
	*/
	getBoundingRect:  function (node){
		// getBoundingClientRect returns t
		var o = node.getBoundingClientRect();
		if (!o.width || !o.height) {
			return {
				left: o.left,
				right: o.right,
				top: o.top,
				bottom: o.bottom,
				width: o.right - o.left,
				height: o.bottom - o.top
			};
		}
		return o;
	},

	/**
	* Determines the view height.
	*
	* @return {Number} - Height of the view.
	* @private
	*/
	getViewHeight: function () {
		return (window.innerHeight === undefined) ? document.documentElement.clientHeight : window.innerHeight;
	},

	/**
	* Determines the view width.
	*
	* @return {Number} - Width of the view.
	* @private
	*/
	getViewWidth: function () {
		return (window.innerWidth === undefined) ? document.documentElement.clientWidth : window.innerWidth;
	},

	/**
	* Removes all positioning classes and resets the `'top'` and `'left'` CSS attributes.
	*
	* @private
	*/
	resetPositioning: function () {
		this.removeClass('right');
		this.removeClass('left');
		this.removeClass('high');
		this.removeClass('low');
		this.removeClass('corner');
		this.removeClass('below');
		this.removeClass('above');
		this.removeClass('vertical');
		this.removeClass('horizontal');

		this.applyPosition({left: 'auto'});
		this.applyPosition({top: 'auto'});
	},

	/**
	* Handles `resize` events to reposition the popup.
	*
	* @method
	* @private
	*/
	handleResize: function () {
		Popup.prototype.handleResize.apply(this, arguments);
		this.adjustPosition();
	}
});

}],'onyx/TooltipDecorator':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/TooltipDecorator~TooltipDecorator} kind.
* @module onyx/TooltipDecorator
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	Button = require('onyx/Button');

/**
* {@link module:onyx/TooltipDecorator~TooltipDecorator} is a control that couples an {@link module:onyx/Tooltip~Tooltip}
* with an activating control, such as a button. The tooltip is displayed when the
* activator generates an `onenter` event:
*
* ```
* var
* 	Button = require('onyx/Button'),
* 	Tooltip = require('onyx/Tooltip'),
* 	TooltipDecorator = require('onyx/TooltipDecorator');
*
* {kind: TooltipDecorator, components: [
* 	{kind: Button, content: 'Tooltip'},
* 	{kind: Tooltip, content: 'I am a tooltip for a button.'}
* ]}
* ```
*
* Here's an example with an {@link module:onyx/Input~Input} control and an
* {@link module:onyx/InputDecorator~InputDecorator} around the input:
*
* ```
* var
* 	Input = require('onyx/Input'),
* 	InputDecorator = require('onyx/InputDecorator'),
* 	Tooltip = require('onyx/Tooltip'),
* 	TooltipDecorator = require('onyx/TooltipDecorator');
*
* {kind: TooltipDecorator, components: [
* 	{kind: InputDecorator, components: [
* 		{kind: Input, placeholder: 'Just an input...'}
* 	]},
* 	{kind: Tooltip, content: 'I am a tooltip for an input.'}
* ]}
* ```
*
* @class TooltipDecorator
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/TooltipDecorator~TooltipDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.TooltipDecorator',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	defaultKind: Button,

	/**
	* @private
	*/
	classes: 'onyx-popup-decorator',

	/**
	* @private
	*/
	handlers: {
		onenter: 'enter',
		onleave: 'leave'
	},

	/**
	* @private
	*/
	enter: function () {
		this.requestShowTooltip();
	},

	/**
	* @private
	*/
	leave: function () {
		this.requestHideTooltip();
	},

	/**
	* @private
	*/
	tap: function () {
		this.requestHideTooltip();
	},

	/**
	* @private
	*/
	requestShowTooltip: function () {
		this.waterfallDown('onRequestShowTooltip');
	},

	/**
	* @private
	*/
	requestHideTooltip: function () {
		this.waterfallDown('onRequestHideTooltip');
	}
});

}],'onyx/PickerButton':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/PickerButton~PickerButton} kind.
* @module onyx/PickerButton
*/

var
	kind = require('enyo/kind');

var
	Button = require('onyx/Button');

/**
* {@link module:onyx/PickerButton~PickerButton} is a button that, when tapped, shows an
* {@link module:onyx/Picker~Picker}. Once an item is selected, the list of items closes, but
* the item stays selected and the PickerButton displays the choice that was made.
*
* @class PickerButton
* @extends module:onyx/Button~Button
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/PickerButton~PickerButton.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.PickerButton',

	/**
	* @private
	*/
	kind: Button,

	/**
	* @private
	*/
	handlers: {
		onChange: 'change'
	},

	/**
	* Handles [onChange]{@link module:onyx/Picker~Picker#onChange} event that is waterfalled
	* down from {@link module:onyx/PickerDecorator~PickerDecorator}.
	*
	* @private
	*/
	change: function (sender, event) {
		if (event.content !== undefined){
			this.setContent(event.content);
		}
	}
});

}],'onyx/RadioGroup':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/RadioGroup~RadioGroup} kind.
* @module onyx/RadioGroup
*/

var
	kind = require('enyo/kind'),
	Group = require('enyo/Group');

var
	RadioButton = require('onyx/RadioButton');

/**
* {@link module:onyx/RadioGroup~RadioGroup} is a group of {@link module:onyx/RadioButton~RadioButton} objects laid out
* horizontally. Within the same radio group, tapping on one radio button will
* release any previously-tapped radio button.
*
* ```
* var RadioGroup = require('onyx/RadioGroup');
*
* {kind: RadioGroup, components: [
* 	{content: 'foo', active: true},
* 	{content: 'bar'},
* 	{content: 'baz'}
* ]}
* ```
*
* @class RadioGroup
* @extends module:enyo/Group~Group
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/RadioGroup~RadioGroup.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.RadioGroup',

	/**
	* @private
	*/
	kind: Group,

	/**
	* @private
	*/
	defaultKind: RadioButton,

	/**
	* Set to `true` to provide radio button behavior.
	*
	* @private
	*/
	highlander: true
});

}],'onyx/Menu':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Menu~Menu} kind.
* @module onyx/Menu
*/

var
	kind = require('enyo/kind'),
	Scroller = require('enyo/Scroller'),
	TouchScrollStrategy = require('enyo/TouchScrollStrategy');

var
	MenuItem = require('onyx/MenuItem'),
	Popup = require('onyx/Popup');

/**
* Requests that a menu be displayed and positioned near an activating control.
*
* @event module:onyx/Menu~Menu#onRequestShowMenu
* @type {Object}
* @property {module:enyo/Control~Control} activator - Control near which the menu should be displayed.
* @public
*/

/**
* Requests that a menu be hidden.
*
* @event module:onyx/Menu~Menu#onRequestHideMenu
* @type {Object}
* @public
*/

/**
* {@link module:onyx/Menu~Menu} is a subkind of {@link module:onyx/Popup~Popup} that displays a list of
* {@link module:onyx/MenuItem~MenuItem} objects and looks like a popup menu. It is meant to be
* used together with an {@link module:onyx/MenuDecorator~MenuDecorator}. The decorator couples the
* menu with an activating control, which may be a button or any other control
* with an [onActivate]{@link module:enyo/GroupItem~GroupItem#onActivate} event. When the
* control is activated, the menu shows itself in the correct position relative
* to the activator.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Menu = require('onyx/Menu'),
* 		MenuDecorator = require('onyx/MenuDecorator');
*
* 	{kind: MenuDecorator, components: [
* 		{content: 'Show menu'},
* 		{kind: Menu, components: [
* 			{content: '1'},
* 			{content: '2'},
* 			{classes: 'onyx-menu-divider'},
* 			{content: 'Label', classes: 'onyx-menu-label'},
* 			{content: '3'},
* 		]}
* 	]}
* ```
*
* @class Menu
* @extends module:onyx/Popup~Popup
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Menu~Menu.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Menu',

	/**
	* @private
	*/
	kind: Popup,

	/**
	* When `true`, controls outside of the menu will not receive events while
	* the menu is showing.
	*
	* @private
	*/
	modal: true,

	/**
	* @private
	*/
	defaultKind: MenuItem,

	/**
	* @private
	*/
	classes: 'onyx-menu',

	/**
	* @lends module:onyx/Menu~Menu.prototype
	* @private
	*/
	published: {
		/**
		* Maximum height of the menu, in pixels.
		*
		* @type {Number}
		* @default  200
		* @public
		*/
		maxHeight: 200,

		/**
		* Indicates whether scrolling is enabled.
		*
		* Note that this is a design-time property and should not be set after creation.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		scrolling: true,

		/**
		* The current scroll strategy.
		*
		* @type {String}
		* @default  'TouchScrollStrategy'
		* @public
		*/
		scrollStrategyKind: TouchScrollStrategy
	},

	/**
	* @private
	*/
	handlers: {
		onActivate: 'itemActivated',
		onRequestShowMenu: 'requestMenuShow',
		onRequestHideMenu: 'requestHide'
	},

	/**
	* @private
	*/
	childComponents: [
		{name: 'client', kind: Scroller}
	],

	/**
	* If `true`, menu will be shown on top of activating control, if possible.
	*
	* @type {Boolean}
	* @private
	*/
	showOnTop: false,

	/**
	* @private
	*/
	scrollerName: 'client',

	/**
	* @private
	*/
	create: function () {
		Popup.prototype.create.apply(this, arguments);
		this.maxHeightChanged();
	},

	/**
	* @private
	*/
	initComponents: function () {
		if (this.scrolling) {
			this.createComponents(this.childComponents, {isChrome: true, strategyKind: this.scrollStrategyKind});
		}
		Popup.prototype.initComponents.apply(this, arguments);
	},

	/**
	* @private
	*/
	getScroller: function () {
		return this.$[this.scrollerName];
	},

	/**
	* @private
	*/
	maxHeightChanged: function () {
		if (this.scrolling) {
			this.getScroller().setMaxHeight(this.maxHeight + 'px');
		}
	},

	/**
	* Handles [onActivate]{@link module:enyo/GroupItem~GroupItem#onActivate} events.
	*
	* @private
	*/
	itemActivated: function (sender, event) {
		event.originator.setActive(false);
		return true;
	},

	/**
	* @private
	*/
	showingChanged: function () {
		Popup.prototype.showingChanged.apply(this, arguments);
		if (this.scrolling) {
			this.getScroller().setShowing(this.showing);
		}
		this.adjustPosition(true);
	},

	/**
	* Handles [onRequestShowMenu]{@link module:onyx/Menu~Menu#onRequestShowMenu} events.
	*
	* @private
	*/
	requestMenuShow: function (sender, event) {
		if (this.floating) {
			var n = event.activator.hasNode();
			if (n) {
				var r = this.activatorOffset = this.getPageOffset(n);
				this.applyPosition({top: r.top + (this.showOnTop ? 0 : r.height), left: r.left, width: r.width});
			}
		}
		this.show();
		return true;
	},

	/**
	* Applies CSS styles to position the menu.
	*
	* @param  {Object} rect - Object with at least one position attribute
	* 	(`'top'`, `'right'`, `'bottom'`, `'left'`).
	* @private
	* @todo Duplicate of {@link module:onyx/ContextualPopup~ContextualPopup#applyPosition} and possibly `setBounds()`
	*/
	applyPosition: function (rect) {
		var s = '';
		for (var n in rect) {
			s += (n + ':' + rect[n] + (isNaN(rect[n]) ? '; ' : 'px; '));
		}
		this.addStyles(s);
	},

	/**
	* Calculates the position of the popup relative to the page.
	*
	* @param {Element} node - The DOM node.
	* @return {Object} Object containing `'top'`, `'left'`, `'height'`, and
	* `'width'` values for the page.
	* @private
	* @todo  Duplicate of {@link module:onyx/ContextualPopup~ContextualPopup#getPageOffset}
	*/
	getPageOffset: function (node) {
		// getBoundingClientRect returns top/left values which are relative to the viewport and not absolute
		var r = node.getBoundingClientRect();

		return {top: r.top + window.pageYOffset, left: r.left + window.pageXOffset, height: r.height, width: r.width};
	},

	/**
	* Adjusts the menu position to fit inside the current window size.
	* Note that we aren't currently adjusting picker scroller heights.
	*
	* @private
	*/
	adjustPosition: function () {
		if (this.showing && this.hasNode()) {
			if (this.scrolling && !this.showOnTop) {
				this.getScroller().setMaxHeight(this.maxHeight+'px');
			}
			this.removeClass('onyx-menu-up');

			//reset the left position before we get the bounding rect for proper horizontal calculation
			if (!this.floating) {
				this.applyPosition({left: 'auto'});
			}

			var b = this.node.getBoundingClientRect();
			var bHeight = (b.height === undefined) ? (b.bottom - b.top) : b.height;
			var innerHeight = (window.innerHeight === undefined) ? document.documentElement.clientHeight : window.innerHeight;
			var innerWidth = (window.innerWidth === undefined) ? document.documentElement.clientWidth : window.innerWidth;

			//position the menu above the activator if it's getting cut off, but only if there's more room above than below
			this.menuUp = (b.top + bHeight > innerHeight) && ((innerHeight - b.bottom) < (b.top - bHeight));
			this.addRemoveClass('onyx-menu-up', this.menuUp);

			//if floating, adjust the vertical positioning
			if (this.floating) {
				var r = this.activatorOffset;
				//if the menu doesn't fit below the activator, move it up
				if (this.menuUp) {
					this.applyPosition({top: (r.top - bHeight + (this.showOnTop ? r.height : 0)), bottom: 'auto'});
				}
				else {
					//if the top of the menu is above the top of the activator and there's room to move it down, do so
					if ((b.top < r.top) && (r.top + (this.showOnTop ? 0 : r.height) + bHeight < innerHeight))
					{
						this.applyPosition({top: r.top + (this.showOnTop ? 0 : r.height), bottom: 'auto'});
					}
				}
			}

			//adjust the horizontal positioning to keep the menu from being cut off on the right
			if ((b.right) > innerWidth) {
				if (this.floating){
					this.applyPosition({left:innerWidth-b.width});
				} else {
					this.applyPosition({left: -(b.right - innerWidth)});
				}
			}

			//finally prevent the menu from being cut off on the left
			if (b.left < 0) {
				if (this.floating){
					this.applyPosition({left: 0, right:'auto'});
				} else {
					//handle the situation where a non-floating menu is right or left aligned
					if (this.getComputedStyleValue('right') == 'auto'){
						this.applyPosition({left:-b.left});
					} else {
						this.applyPosition({right:b.left});
					}
				}
			}

			//adjust the scroller height based on room available - only doing this for menus currently
			if (this.scrolling && !this.showOnTop){
				b = this.node.getBoundingClientRect(); //update to the current menu position
				var scrollerHeight;
				if (this.menuUp){
					scrollerHeight = (this.maxHeight < b.bottom) ? this.maxHeight : b.bottom;
				} else {
					scrollerHeight = ((b.top + this.maxHeight) < innerHeight) ? this.maxHeight : (innerHeight - b.top);
				}
				this.getScroller().setMaxHeight(scrollerHeight+'px');
			}
		}
	},

	/**
	* Handles `onresize` events, adjusting the position of the menu.
	*
	* @private
	*/
	handleResize: function () {
		Popup.prototype.handleResize.apply(this, arguments);
		this.adjustPosition();
	},

	/**
	* Handles [onRequestMenuHide]{@link module:onyx/Menu~Menu#onRequestMenuHide} events.
	*
	* @private
	*/
	requestHide: function (){
		this.setShowing(false);
	}
});

}],'onyx/Submenu':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Submenu~Submenu} kind.
* @module onyx/Submenu
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	Drawer = require('onyx/Drawer'),
	MenuItem = require('onyx/MenuItem');

/**
* {@link module:onyx/Submenu~Submenu} is a control that collapses several menu items into a drawer,
* which may be opened and closed by tapping on its label. It is meant to be placed
* inside an {@link module:onyx/Menu~Menu}.
*
* ```
* var
* 	Menu = require('onyx/Menu'),
* 	MenuDecorator = require('onyx/MenuDecorator'),
* 	Submenu = require('onyx/Submenu');
*
* {kind: MenuDecorator, components:[
* 	{content: 'Open menu'},
* 	{kind: Menu, components:[
* 		{content: 'One'},
* 		{content: 'Two'},
* 		{kind: Submenu, content: 'Sort by...', components: [
* 			{content: 'A'},
* 			{content: 'B'},
* 			{content: 'C'}
* 		]},
* 		{content: 'Three'}
* 	]}
* ]}
* ```
*
* @class Submenu
* @extends module:enyo/Control~Control
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Submenu~Submenu.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Submenu',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	defaultKind: MenuItem,

	/**
	* @private
	*/
	initComponents: function () {
		this.createChrome([
			{name: 'label', kind: Control, classes: 'onyx-menu-item', content: this.content || this.name, isChrome: true, ontap: 'toggleOpen'},
			{name: 'client', kind: Drawer, classes: 'client onyx-submenu', isChrome: true, open: false}
		]);

		Control.prototype.initComponents.apply(this, arguments);
	},

	/**
	* Toggles the submenu's open/closed state.
	*
	* @public
	*/
	toggleOpen: function () {
		this.setOpen(!this.getOpen());
	},

	/**
	* Opens or closes the submenu.
	*
	* @param {Boolean} open - `true` to open the submenu; `false` to close it.
	* @public
	*/
	setOpen: function (open) {
		this.$.client.setOpen(open);
	},

	/**
	* Determines whether the submenu is currently open.
	*
	* @return {Boolean} - `true` if submenu is currently open; otherwise, `false`.
	* @public
	*/
	getOpen: function () {
		return this.$.client.getOpen();
	}
});

}],'onyx/MenuDecorator':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/MenuDecorator~MenuDecorator} kind.
* @module onyx/MenuDecorator
*/

var
	kind = require('enyo/kind');

var
	Button = require('onyx/Button'),
	TooltipDecorator = require('onyx/TooltipDecorator');

/**
* {@link module:onyx/MenuDecorator~MenuDecorator} is a control that loosely couples an {@link module:onyx/Menu~Menu}
* with an activating control, which may be a button or any other control with an
* [onActivate]{@link module:enyo/GroupItem~GroupItem#onActivate} event. The decorator must
* surround both the activating control and the menu itself. When the menu is
* activated, it shows itself in the correct position relative to the activator.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Menu = require('onyx/Menu'),
* 		MenuDecorator = require('onyx/MenuDecorator');
*
* 	{kind: MenuDecorator, components: [
* 		{content: 'Show menu'},
* 		{kind: Menu, components: [
* 			{content: '1'},
* 			{content: '2'},
* 			{classes: 'onyx-menu-divider'},
* 			{content: 'Label', classes: 'onyx-menu-label'},
* 			{content: '3'},
* 		]}
* 	]}
* ```
*
* @class MenuDecorator
* @extends module:onyx/TooltipDecorator~TooltipDecorator
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/MenuDecorator~MenuDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.MenuDecorator',

	/**
	* @private
	*/
	kind: TooltipDecorator,

	/**
	* @private
	*/
	defaultKind: Button,

	/**
	* Selection on iOS prevents tap events, so avoid.
	*
	* @private
	*/
	classes: 'onyx-popup-decorator enyo-unselectable',

	/**
	* @private
	*/
	handlers: {
		onActivate: 'activated',
		onHide: 'menuHidden'
	},

	/**
	* Handles [onActivate]{@link module:enyo/GroupItem~GroupItem#onActivate} events.
	*
	* @private
	*/
	activated: function (sender, event) {
		this.requestHideTooltip();
		if (event.originator.active) {
			this.menuActive = true;
			this.activator = event.originator;
			this.activator.addClass('active');
			this.requestShowMenu();
		}
	},

	/**
	* Requests that the child menu be shown.
	*
	* @fires module:onyx/Menu~Menu#onRequestShowMenu
	* @private
	*/
	requestShowMenu: function () {
		this.waterfallDown('onRequestShowMenu', {activator: this.activator});
	},

	/**
	* Requests that the child menu be hidden.
	*
	* @fires module:onyx/Menu~Menu#onRequestHideMenu
	* @private
	*/
	requestHideMenu: function () {
		this.waterfallDown('onRequestHideMenu');
	},

	/**
	* Handles [onHide]{@link module:enyo/Popup~Popup#onHide} events.
	*
	* @private
	*/
	menuHidden: function () {
		this.menuActive = false;
		if (this.activator) {
			this.activator.setActive(false);
			this.activator.removeClass('active');
		}
	},

	/**
	* Handles `onenter` events. Suppresses default behavior if menu is not active.
	*
	* @private
	*/
	enter: function (sender) {
		if (!this.menuActive) {
			TooltipDecorator.prototype.enter.apply(this, arguments);
		}
	},

	/**
	* Handles `onleave` events. Suppresses default behavior if menu is not active.
	*
	* @private
	*/
	leave: function (sender, event) {
		if (!this.menuActive) {
			TooltipDecorator.prototype.leave.apply(this, arguments);
		}
	}
});

}],'onyx/Picker':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Picker~Picker} kind.
* @module onyx/Picker
*/

var
	kind = require('enyo/kind');

var
	Menu = require('onyx/Menu');

/**
* Fires when the currently selected item changes.
*
* @event module:onyx/Picker~Picker#onChange
* @type {Object}
* @property {module:enyo/Control~Control} selected - The currently selected item.`
* @property {String} content - The content of the currently selected item.
* @public
*/

/**
* {@link module:onyx/Picker~Picker}, a subkind of {@link module:onyx/Menu~Menu}, is used to display a
* list of items that may be selected. It is meant to be used together with an
* {@link module:onyx/PickerDecorator~PickerDecorator}. The decorator loosely couples the picker with
* an {@link module:onyx/PickerButton~PickerButton}--a button that, when tapped, shows the picker.
* Once an item is selected, the list of items closes, but the item stays
* selected and the PickerButton displays the choice that was made.
*
* To initialize the Picker to a particular value, set the `active` property to
* `true` for the item that should be selected.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Picker = require('onyx/Picker'),
* 		PickerDecorator = require('onyx/PickerDecorator');
*
* 	{kind: PickerDecorator, components: [
* 		{}, //this uses the defaultKind property of PickerDecorator to inherit from PickerButton
* 		{kind: Picker, components: [
* 			{content: 'Gmail', active: true},
* 			{content: 'Yahoo'},
* 			{content: 'Outlook'},
* 			{content: 'Hotmail'}
* 		]}
* 	]}
* ```
*
* Each item in the list is an {@link module:onyx/MenuItem~MenuItem}, so a client app may
* listen for an [onSelect]{@link module:onyx/MenuItem~MenuItem#onSelect} event with the
* item to determine which picker item was selected.
*
* @class Picker
* @extends module:onyx/Menu~Menu
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Picker~Picker.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Picker',

	/**
	* @private
	*/
	kind: Menu,

	/**
	* @private
	*/
	classes: 'onyx-picker enyo-unselectable',

	/**
	* @lends module:onyx/Picker~Picker.prototype
	* @private
	*/
	published: {
		/**
		* Currently selected item, if any
		* @type {module:onyx/MenuItem~MenuItem}
		* @default  null
		* @public
		*/
		selected: null
	},

	/**
	* @private
	*/
	events: {
		onChange: ''
	},

	/**
	* @private
	*/
	handlers: {
		onItemContentChange: 'itemContentChange'
	},

	/**
	* When `true`, the picker is rendered in a floating layer outside of other
	* controls. This can be used to guarantee that the picker will be shown on
	* top of other controls.
	*
	* @private
	*/
	floating: true,

	/**
	* Overrides default value from {@link module:onyx/Menu~Menu}.
	*
	* @private
	*/
	showOnTop: true,

	/**
	* @private
	*/
	initComponents: function () {
		this.setScrolling(true);
		Menu.prototype.initComponents.apply(this, arguments);
	},

	/**
	* @private
	*/
	showingChanged: function () {
		this.getScroller().setShowing(this.showing);
		Menu.prototype.showingChanged.apply(this, arguments);
		if (this.showing && this.selected) {
			this.scrollToSelected();
		}
	},

	/**
	* Ensures that the selected item is visible.
	*
	* @private
	*/
	scrollToSelected: function () {
		this.getScroller().scrollToControl(this.selected, !this.menuUp);
	},

	/**
	* Handles [onActivate]{@link module:enyo/GroupItem~GroupItem#onActivate} event,
	* selecting the activated item.
	*
	* @private
	*/
	itemActivated: function (sender, event) {
		this.processActivatedItem(event.originator);
		return Menu.prototype.itemActivated.apply(this, arguments);
	},

	/**
	* If passed-in control is `active`, selects it.
	* @param {module:enyo/Control~Control} item
	*
	* @private
	*/
	processActivatedItem: function (item) {
		if (item.active) {
			this.setSelected(item);
		}
	},

	/**
	* Highlights the selected item with the CSS class `'selected'`.
	*
	* @fires module:onyx/Picker~Picker#onChange
	* @private
	*/
	selectedChanged: function (old) {
		if (old) {
			old.removeClass('selected');
		}
		if (this.selected) {
			this.selected.addClass('selected');
			this.doChange({selected: this.selected, content: this.selected.content});
		}
	},

	/**
	* Handles [onItemContentChange]{@link module:onyx/MenuItem~MenuItem#onItemContentChange}
	* events.
	*
	* @fires module:onyx/Picker~Picker#onChange
	* @private
	*/
	itemContentChange: function (sender, event) {
		if (event.originator == this.selected) {
			this.doChange({selected: this.selected, content: this.selected.content});
		}
	},

	/**
	* Handles `onresize` events.
	*
	* @private
	*/
	handleResize: function () {
		Menu.prototype.handleResize.apply(this, arguments);
		this.adjustPosition();
	}
});

}],'onyx/PickerDecorator':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/PickerDecorator~PickerDecorator} kind.
* @module onyx/PickerDecorator
*/

var
	kind = require('enyo/kind');

var
	MenuDecorator = require('onyx/MenuDecorator'),
	PickerButton = require('onyx/PickerButton');

/**
* {@link module:onyx/PickerDecorator~PickerDecorator} is a control that loosely couples an
* {@link module:onyx/Picker~Picker} with an activating {@link module:onyx/PickerButton~PickerButton}. The
* decorator must surround both the activating button and the picker itself.
* When the button is activated, the picker shows itself in the correct
* position relative to the activator.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Picker = require('onyx/Picker'),
* 		PickerDecorator = require('onyx/PickerDecorator');
*
* 	{kind: PickerDecorator, components: [
* 		{}, // this uses the defaultKind property of PickerDecorator to inherit from PickerButton
* 		{kind: Picker, components: [
* 			{content: 'Gmail', active: true},
* 			{content: 'Yahoo'},
* 			{content: 'Outlook'},
* 			{content: 'Hotmail'}
* 		]}
* 	]}
* ```
*
* @class PickerDecorator
* @extends module:onyx/MenuDecorator~MenuDecorator
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/PickerDecorator~PickerDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.PickerDecorator',

	/**
	* @private
	*/
	kind: MenuDecorator,

	/**
	* @private
	*/
	classes: 'onyx-picker-decorator',

	/**
	* @private
	*/
	defaultKind: PickerButton,

	/**
	* @private
	*/
	handlers: {
		onChange: 'change'
	},

	/**
	* Handles [onChange]{@link module:onyx/Picker~Picker#onChange} event, waterfalling
	* it down to children.
	*
	* @private
	*/
	change: function (sender, event) {
		this.waterfallDown('onChange', event);
	}
});

}],'onyx/MoreToolbar':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/MoreToolbar~MoreToolbar} kind.
* @module onyx/MoreToolbar
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	FittableLayout = require('layout/FittableLayout'),
	FittableColumnsLayout = FittableLayout.Columns;

var
	IconButton = require('onyx/IconButton'),
	Menu = require('onyx/Menu'),
	MenuDecorator = require('onyx/MenuDecorator');

/**
* {@link module:onyx/MoreToolbar~MoreToolbar} extends {@link module:enyo/Control~Control}, providing a toolbar
* that can adapt to different screen sizes by moving overflowing controls and
* content into an {@link module:onyx/Menu~Menu}.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Button = require('onyx/Button'),
* 		MoreToolbar = require('onyx/MoreToolbar');
*
* 	{kind: MoreToolbar, components: [
* 		{content: 'More Toolbar', unmoveable: true},
* 		{kind: Button, content: 'Alpha'},
* 		{kind: Button, content: 'Beta'},
* 		{kind: Button, content: 'Gamma', unmoveable: true},
* 		{kind: Button, content: 'Epsilon'}
* 	]}
* ```
*
* You may prevent a control from being moved into the menu by setting its
* `unmoveable` property to `true` (the default is `false`).
*
* @class MoreToolbar
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/MoreToolbar~MoreToolbar.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.MoreToolbar',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-toolbar onyx-more-toolbar',

	/**
	* CSS class to be applied to the menu.
	*
	* Note that this is a design-time property and should not be set after object creation.
	*
	* @type {String}
	* @default  ''
	* @public
	*/
	menuClass: '',

	/**
	* CSS class to be applied to individual controls moved from the toolbar to the menu.
	*
	* Note that this is a design-time property and should not be set after object creation.
	*
	* @type {String}
	* @default  ''
	* @public
	*/
	movedClass: '',

	/**
	* @private
	*/
	layoutKind: FittableColumnsLayout,

	/**
	* @private
	*/
	noStretch: true,

	/**
	* @private
	*/
	handlers: {
		onHide: 'reflow'
	},

	/**
	* @lends module:onyx/MoreToolbar~MoreToolbar.prototype
	* @private
	*/
	published: {
		/**
		* Layout kind that will be applied to the client controls.
		*
		* @type {String}
		* @default  'FittableColumnsLayout'
		* @public
		*/
		clientLayoutKind: FittableColumnsLayout
	},

	/**
	* @private
	*/
	tools: [
		{name: 'client', noStretch: true, fit: true, classes: 'onyx-toolbar-inline'},
		{name: 'nard', kind: MenuDecorator, showing: false, onActivate: 'activated', components: [
			{kind: IconButton, classes: 'onyx-more-button'},
			{name: 'menu', kind: Menu, scrolling: false, classes: 'onyx-more-menu'}
		]}
	],

	/**
	* @private
	*/
	initComponents: function () {
		if (this.menuClass && this.menuClass.length>0 && !this.$.menu.hasClass(this.menuClass)) {
			this.$.menu.addClass(this.menuClass);
		}
		this.createChrome(this.tools);
		Control.prototype.initComponents.apply(this, arguments);
		this.$.client.setLayoutKind(this.clientLayoutKind);
	},

	/**
	* @private
	*/
	clientLayoutKindChanged: function () {
		this.$.client.setLayoutKind(this.clientLayoutKind);
	},

	/**
	* @private
	*/
	reflow: function () {
		Control.prototype.reflow.apply(this, arguments);
		if (this.isContentOverflowing()) {
			this.$.nard.show();
			if (this.popItem()) {
				this.reflow();
			}
		} else if (this.tryPushItem()) {
			this.reflow();
		} else if (!this.$.menu.children.length) {
			this.$.nard.hide();
			this.$.menu.hide();
		}
	},

	/**
	* Handles [onActivate]{@link module:enyo/GroupItem~GroupItem#onActivate} events.
	*
	* Adds the `'active'` CSS class to this control if the event's originator is active.
	*
	* @private
	*/
	activated: function (sender, event) {
		this.addRemoveClass('active', event.originator.active);
	},

	/**
	* Removes the next collapsible item from the toolbar and adds it to the menu.
	*
	* @private
	*/
	popItem: function () {
		var c = this.findCollapsibleItem();
		if (c) {
			//apply movedClass is needed
			if(this.movedClass && this.movedClass.length > 0 && !c.hasClass(this.movedClass)) {
				c.addClass(this.movedClass);
			}
			// passing null to add child to the front of the control list
			this.$.menu.addChild(c, null);
			var p = this.$.menu.hasNode();
			if (p && c.hasNode()) {
				c.insertNodeInParent(p);
			}
			return true;
		}
	},

	/**
	* Removes the first child of the menu and adds it back to the toolbar.
	*
	* @private
	*/
	pushItem: function () {
		var c$ = this.$.menu.children;
		var c = c$[0];
		if (c) {
			//remove any applied movedClass
			if (this.movedClass && this.movedClass.length > 0 && c.hasClass(this.movedClass)) {
				c.removeClass(this.movedClass);
			}
			this.$.client.addChild(c);
			var p = this.$.client.hasNode();
			if (p && c.hasNode()) {
				var nextChild;
				var currIndex;
				for (var i = 0; i < this.$.client.children.length; i++) {
					var curr = this.$.client.children[i];
					if(curr.toolbarIndex !== undefined && curr.toolbarIndex != i) {
						nextChild = curr;
						currIndex = i;
						break;
					}
				}
				if (nextChild && nextChild.hasNode()) {
					c.insertNodeInParent(p, nextChild.node);
					var newChild = this.$.client.children.pop();
					this.$.client.children.splice(currIndex, 0, newChild);
				} else {
					c.appendNodeToParent(p);
				}
			}
			return true;
		}
	},

	/**
	* Pushes an item back into the toolbar if doing so doesn't cause the content
	* to overflow.
	*
	* @return {Boolean} - Whether item was successfully pushed.
	* @private
	*/
	tryPushItem: function () {
		if (this.pushItem()) {
			if (!this.isContentOverflowing()) {
				return true;
			} else {
				this.popItem();
			}
		}
	},

	/**
	* Determines whether the toolbar has content that is not visible.
	*
	* @return {Boolean} `true` if some toolbar content is not visible.
	* @private
	*/
	isContentOverflowing: function () {
		if (this.$.client.hasNode()) {
			var c$ = this.$.client.children;
			var n = c$.length && c$[c$.length-1].hasNode();
			if (n) {
				this.$.client.reflow();
				//Workaround: scrollWidth value not working in Firefox, so manually compute
				//return (this.$.client.node.scrollWidth > this.$.client.node.clientWidth);
				return ((n.offsetLeft + n.offsetWidth) > this.$.client.node.clientWidth);
			}
		}
	},

	/**
	* Finds the next control (starting from the end) that can be pushed onto the menu.
	*
	* @private
	*/
	findCollapsibleItem: function () {
		var c$ = this.$.client.children;
		var c;
		for (var i = c$.length - 1; (c = c$[i]); i--) {
			if (!c.unmoveable) {
				return c;
			} else {
				if (c.toolbarIndex===undefined) {
					c.toolbarIndex = i;
				}
			}
		}
	}
});

}],'onyx/TabBar':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/TabBar~TabBar} kind.
* @wip
* @module onyx/TabBar
*/

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	Scroller = require('enyo/Scroller');

var
	FittableColumns = require('layout/FittableColumns');

var
	IconButton = require('onyx/IconButton'),
	Menu = require('onyx/Menu'),
	MenuDecorator = require('onyx/MenuDecorator'),
	RadioGroup = require('onyx/RadioGroup'),
	TabBarItem = require('onyx/TabBarItem'),
	Tooltip = require('onyx/Tooltip'),
	TooltipDecorator = require('onyx/TooltipDecorator');

/**
* {@link module:onyx/TabBar~TabBar} is a scrolled set of radio buttons that is used by
* {@link module:onyx/TabPanels~TabPanels}. This bar may also be used by other kinds to provide
* a similar layout. By default, a tap on a tab will immediately switch the
* tab and fire an `onTabChanged` event.
*
*
* Here's an example:
*
* ```javascript
* var
* 	kind = require('enyo/kind'),
* 	TabBar = require('onyx/TabBar');
*
* var myStuff = kind({
* 	name: 'myStuff'
* });
*
* kind({
* 	name: 'App',
* 	fit: true,
* 	components: [
* 		{name:'bar', kind: TabBar},
* 		{kind: MyStuff}
* 	],
*
* 	handlers: {
* 		onTabChanged: 'switchStuff'
* 	},
*
* 	rendered: function () {
* 		this.inherited(arguments);
* 		this.$.bar.addTab({
* 				'caption': 'greetings',
* 				'data' : { 'msg': 'Hello World !' } // arbitrary user data
* 			}
* 		) ;
* 	},
*
* 	switchStuff: function (inSender,inEvent) {
* 		this.log('Tapped tab with caption '+ inEvent.caption
* 			+ ' and message ' + inEvent.data.msg );
* 	}
* });
* ```
*
* Tabs must be created after construction, i.e. in rendered function. If tabs are created in
* 'create' function, the last created tabs will not be selected.
*
* You can also setup the TabBar so a tap on a tab will fire a
* 'onTabChangeRequest' event:
*
* ```javascript
* kind({
* 	name: 'App',
* 	fit: true,
* 	components: [
* 		{name:'bar', kind: TabBar, checkBeforeChanging: true },
* 		{kind: MyStuff}
* 	],
*
* 	handlers: {
* 		onTabChangeRequest: 'switchStuff'
* 	},
*
* 	// same rendered method as above
* 	switchStuff: function (inSender,inEvent) {
* 		this.log('Tapped tab with caption ' + inEvent.caption
* 			+ ' and message ' + inEvent.data.msg );
* 		// do switch
* 		inEvent.next();
* 	}
* });
* ```
*
* In this mode, no event is fired *after* the actual switch.
*
* @class TabBar
* @extends module:enyo/FittableColumns~FittableColumns
* @wip
* @ui
* @private
*/
module.exports = kind (
	/** @lends module:onyx/TabBar~TabBar.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.TabBar',

	/**
	* @private
	*/
	kind: FittableColumns,

	/**
	* @private
	*/
	isPanel: true,

	/**
	* @private
	*/
	classes: 'onyx-tab-bar',

	/**
	* @private
	*/
	checkBeforeClosing: false,

	/**
	* @private
	*/
	checkBeforeChanging: false,

	/**
	* @private
	*/
	debug: false,

	/**
	* @private
	*/
	events: {
		/*
		Fired when a tab different from the one currently selected is tapped.
		inEvent contains :

		{
			'index': 3, // index of tab in tab bar
			'userId': 1234, // unique id in tab managed by user
			'caption': 'bar.js', // tab label
			'data': { 'lang': 'javascript' },
			'next': callback // call with error message if problem
		}

		*/
		onTabChanged: '',

		/*
		Fired when a tab different from the one currently selected is tapped
		when checkBeforeChanging is true.
		inEvent contains the same structure as onTabChanged event. Call next()
		when the tab change can be completed.

		*/

		onTabChangeRequested: '',

		/*
		* Fired when a tab is about to be removed. inEvent
		* contains the same data as onTabChanged.
		*
		* if (removeOk) { inEvent.next() ;}
		* else ( inEvent.next('not now') ;}
		*
		* Once a tab is removed (by calling next() ), a replacement
		* tab will be activated and a doTabChanged event will be
		* fired.
		*/
		onTabRemoveRequested: '',

		/*
		* Fired when a tab is removed. inEvent contains the same
		* data as onTabChanged (minus the next callback)
		*/
		onTabRemoved: ''
	},

	/**
	* @lends module:onyx/TabBar~TabBar.prototype
	* @private
	*/
	published: {
		/**
		* Set a maximum height for the scrollable menu that can be raised on the right of
		* the tab bar.
		*
		* @type {Number}
		* @default 600
		* @public
		*/
		maxMenuHeight: 600
	},

	/**
	* @private
	*/
	handlers: {
		onShowTooltip: 'showTooltip',
		onHideTooltip: 'hideTooltip'
	},

	/**
	* @private
	*/
	components: [
		{fit: true, components: [
			{name: 'scroller', kind: Scroller, maxHeight: '100px', touch: true, thumb: false, vertical: 'hidden', horizontal: 'auto', classes: 'onyx-tab-bar-scroller', components: [
				{classes: 'onyx-tab-wrapper', components: [
					// double level of components is required to add padding
					// at this level. This avoid '> div' in selectors
					{components: [
						{name: 'tabs', classes: 'onyx-tab-holder', kind: RadioGroup, defaultKind: TabBarItem, style: 'text-align: left; white-space: nowrap;', onTabCloseRequest: 'requestTabClose', onTabSwitchRequest: 'requestTabSwitch'},
							{classes: 'onyx-tab-line'},
							{classes: 'onyx-tab-rug'}
						]}
					]}
				]},
				{kind: TooltipDecorator, components:[
					{kind: Tooltip, classes: 'onyx-tab-tooltip'}
				]}
			]

		},
		{kind: MenuDecorator, name: 'tabPicker', onSelect: 'popupButtonTapped', components: [
			{kind: IconButton, classes: 'onyx-more-button', ontap: 'showPopupAtEvent'},
			{kind: Menu, name: 'popup'}
		]}
	],

	/**
	* lastIndex is required to avoid duplicate index in the tab bar.
	*
	* @private
	*/
	lastIndex: 0,

	/**
	* @private
	*/
	clientTransitionStart: function (inSender, inEvent) {
		var i = inEvent.toIndex;
		var t = this.$.tabs.getClientControls()[i];
		if (t && t.hasNode()) {
			this.$.tabs.setActive(t);
			var tn = t.node;
			var tl = tn.offsetLeft;
			var tr = tl + tn.offsetWidth;
			var sb = this.$.scroller.getScrollBounds();
			if (tr < sb.left || tr > sb.left + sb.clientWidth) {
				this.$.scroller.scrollToControl(t);
			}
		}
		return true;
	},

	/**
	* @private
	*/
	create: function () {
		FittableColumns.prototype.create.apply(this, arguments);
		this.maxMenuHeightChanged();
	},

	/**
	* @private
	*/
	maxMenuHeightChanged: function () {
		this.$.popup.setMaxHeight(this.getMaxMenuHeight());
	},

	/**
	* @private
	*/
	rendered: function () {
		FittableColumns.prototype.rendered.apply(this, arguments);
		this.resetWidth();
	},

	/**
	* Append a new tab to the tab bar. inControl is an object
	* with optional caption and data attributes. When not
	* specified the tab will have a generated caption like
	* 'Tab 0', 'Tab 1'. etc... data is an arbitrary object that will
	* be given back with onTabChanged events
	*
	* @public
	*/
	addTab: function (inControl) {
		var c = inControl.caption || ('Tab ' + this.lastIndex);
		this.selectedId = this.lastIndex++ ;
		var t = this.$.tabs.createComponent(
			{
				content:  c,
				userData: inControl.data || { },
				tooltipMsg: inControl.tooltipMsg, //may be null
				userId:   inControl.userId, // may be null
				tabIndex: this.selectedId,
				addBefore: this.$.line
			}
		);

		t.render();
		this.resetWidth();
		t.raise();
		t.setActive(true);
		return t;
	},

	/**
	*
	* Remove a tab from the tab bar. target is an object with
	* either a caption attribute or an index. The tab(s) matching
	* the caption will be destroyed or the tab with matching
	* index will be destroyed.
	*
	* Example:
	*
	* ```
	*	myTab.removeTab({'index':0}); // remove the leftmost tab
	*	myTab.removeTab({'caption':'foo.js'});
	* ```
	*
	* @public
	*/
	removeTab: function (target) {
		var tab = this.resolveTab(target,'removeTab');

		if (! tab) { return; }

		var activeTab = this.$.tabs.active ;
		var keepActiveTab = activeTab !== tab ;
		var gonerIndex = tab.indexInContainer();
		var tabData = {
			index:   tab.tabIndex,
			caption: tab.content,
			userId:  tab.userId,
			data:    tab.userData
		} ;

		tab.destroy();
		this.resetWidth();

		var ctrls = this.$.tabs.controls;
		var ctrlLength = ctrls.length ;
		var replacementTab
				= keepActiveTab           ? activeTab
				: gonerIndex < ctrlLength ? ctrls[gonerIndex]
				:                           ctrls[ ctrlLength - 1 ];

		// replacementTab may be undef if all tabs were removed
		if (replacementTab) {
			replacementTab.setActive(true) ;
			replacementTab.raise();
			this.$.scroller.scrollIntoView(replacementTab);

			this.doTabChanged({
				index:   replacementTab.tabIndex,
				caption: replacementTab.content,
				tooltipMsg: replacementTab.tooltipMsg,
				data:    replacementTab.userData,
				userId:  replacementTab.userId
			});
		}

		this.doTabRemoved(tabData);
	},

	/**
	* Request to remove a tab from the tab bar. This is a bit
	* like removeTab, except that a onTabRemoveRequested event is
	* fired to let the application the possibility to cancel the
	* request.
	*
	* @public
	*/
	requestRemoveTab: function (target) {
		var tab = this.resolveTab(target,'removeTab');
		var tabData = {
			index:   tab.tabIndex,
			caption: tab.content,
			tooltipMsg: tab.tooltipMsg,
			userId:  tab.userId,
			data:    tab.userData
		} ;
		var that = this ;
		if (tab) {
			tabData.next = function (err) {
				if (err) { throw new Error(err);   }
				else     { that.removeTab(target); }
			} ;
			this.doTabRemoveRequested( tabData ) ;
		}
	},

	/**
	* @private
	*/
	resolveTab: function (target,action_name){
		var targetTab ;
		if (target.userId) {
			utils.forEach(
				this.$.tabs.controls,
				function (tab){
					if (tab.userId === target.userId) {
						targetTab = tab;
					}
				}
			);
		}
		else if (target.caption) {
			utils.forEach(
				this.$.tabs.controls,
				function (tab){
					if (tab.content === target.caption) {
						targetTab = tab;
					}
				}
			);
		}
		else if (typeof target.index !== 'undefined') {
			utils.forEach(
				this.$.tabs.controls,
				function (tab){
					if (tab.tabIndex === target.index) {
						targetTab = tab;
					}
				}
			);
		}
		else {
			throw new Error('internal: ' + action_name+ ' called without index or caption');
		}
		return targetTab ;
	},

	/**
	* @private
	*/
	requestTabClose: function (inSender,inEvent) {
		if (this.checkBeforeClosing) {
			this.requestRemoveTab(inEvent) ;
		}
		else {
			this.removeTab(inEvent);
		}
	},

	/**
	* Activate a tab in the tab bar. target is an object with
	* either a caption attribute or an index. The tab(s) matching
	* the caption will be activated or the tab with matching
	* index will be activated
	*
	* Example:
	*
	* ```
	* myTab.activate({'index':0}); // activate the leftmost tab
	* myTab.activate({'caption':'foo.js'});
	* ```
	*
	* Note that tabActivated event will be fired.
	*
	* @public
	*/
	activate: function (target) {
		var tab = this.resolveTab(target,'activate');
		if (tab) {
			this.raiseTab(tab);
		}
	},

	/**
	* @private
	*/
	raiseTab: function (tab) {
		tab.setActive(true) ;
		this.$.scroller.scrollIntoView(tab);
	},

	/**
	* @private
	*/
	requestTabSwitch: function (inSender, inEvent) {
		var tab = inEvent.originator;
		this._requestTabSwitch(tab);
	},

	/**
	* @private
	*/
	_requestTabSwitch: function (tab) {
		var event, next;

		if (this.checkBeforeChanging) {
			// polite mode, ask before
			event = 'onTabChangeRequested';
			// then change the tab
			next = utils.bind(tab, tab.setActiveTrue);
		} else {
			// rough mode, change the tab
			tab.setActiveTrue();
			event = 'onTabChanged';
			// and then undo if necessary
			next =  utils.bind(this, 'undoSwitchOnError', oldIndex);
		}

		var data = {
			index:   tab.tabIndex,
			caption: tab.content,
			tooltipMsg: tab.tooltipMsg,
			data:    tab.userData,
			userId:  tab.userId
		} ;

		var oldIndex = this.selectedId ;
		this.selectedId = data.index;

		if ( this.selectedId != oldIndex ) {
			data.next = next;
			this.bubble(event, data);
		}
		else {
			// when clicking on a tab, the tab is always deactivated even
			// if user clicks on the active tab. So the activation
			// must be put back.
			tab.setActiveTrue();
		}
		return true;
	},

	/**
	* @private
	*/
	showTooltip: function (inSender, inEvent) {
		var t = inEvent.tooltipContent;
		var bounds = inEvent.bounds;
		if(t){
			if(!this.$.tooltip.showing){
				this.$.tooltip.setContent(t);
				var leftSpace = bounds.left + ( bounds.width / 2 );
				this.$.tooltipDecorator.applyStyle('left', leftSpace + 'px');
				this.$.tooltip.show();
			}
		}
		return true ;
	},

	/**
	* @private
	*/
	hideTooltip: function () {
		this.$.tooltip.hide();
		return true ;
	},

	/**
	* @private
	*/
	undoSwitchOnError: function (oldIndex, err) {
		if (err) {
			this.activate({ 'index': oldIndex } ) ;
		}
	},

	/**
	* use scroller's getScrollBounds to get scroll boundaries
	*
	* @private
	*/
	handleResize: function () {
		FittableColumns.prototype.handleResize.apply(this, arguments);
		this.adjustTabWidth() ;
	},

	/**
	* compute tab width by adding width of tabs contained in tab bar.
	*
	* @private
	*/
	computeOrigTabWidth: function () {
		var result = 0;
		utils.forEach(
			this.$.tabs.getControls(),
			function (tab){
				var w = tab.origWidth() ;
				// must add margin and padding of inner button and outer tab-item
				result += w + 18 ;
			}
		);
		return result;
	},

	/**
	* @private
	*/
	origTabWidth: null,

	/**
	* @private
	*/
	adjustTabWidth: function (inSender, inEvent) {
		var scrolledWidth = this.$.scroller.getBounds().width;
		var tabsWidth = this.origTabWidth ;
		var coeff = scrolledWidth > tabsWidth ? 1 : scrolledWidth / tabsWidth ;
		coeff = coeff < 0.5 ? 0.5 : coeff;
		this.applyCoeff(coeff) ;
	},

	/**
	* @private
	*/
	applyCoeff: function (coeff) {
		utils.forEach(
			this.$.tabs.getControls(),
			function (tab){
				tab.reduce(coeff) ;
			}
		);
	},

	/**
	* @private
	*/
	resetWidth: function () {
		this.applyCoeff(1) ; // restore original size to all tabs
		this.origTabWidth = this.computeOrigTabWidth(); // measure tab width
		this.adjustTabWidth();
	},

	/**
	* @private
	*/
	isEmpty: function () {
		return ! this.$.tabs.getControls().length ;
	},

	/**
	* Since action buttons of Contextual Popups are not dynamic, this
	* kind is created on the fly and destroyed once the user clicks
	* on a button
	*
	* @private
	*/
	showPopupAtEvent: function (inSender, inEvent) {
		var that = this ;
		var popup = this.$.popup;

		for (var name in popup.$) {
			if (popup.$.hasOwnProperty(name) && /menuItem/.test(name)) {
				popup.$[name].destroy();
			}
		}

		//popup.render();
		utils.forEach(
			this.$.tabs.getControls(),
			function (tab) {
				that.$.popup.createComponent({
					content: tab.content,
					value: tab.tabIndex
				}) ;
			}
		);

		popup.maxHeightChanged();
		popup.showAtPosition({top: 30, right:30});
		this.render();
		this.resize(); // required for IE10 to work correctly
		return ;
	},

	/**
	* @private
	*/
	popupButtonTapped: function (inSender, inEvent) {
		var target = { index: inEvent.originator.value } ;
		var tab = this.resolveTab(target,'activate');
		if (tab) {
			this._requestTabSwitch(tab);
		}
	}
});

}],'onyx/FlyweightPicker':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/FlyweightPicker~FlyweightPicker} kind.
* @module onyx/FlyweightPicker
*/

var
	kind = require('enyo/kind'),
	Scroller = require('enyo/Scroller'),
	TouchScrollStrategy = require('enyo/TouchScrollStrategy');

var
	FlyweightRepeater = require('layout/FlyweightRepeater');

var
	Picker = require('onyx/Picker');

/**
* Fires when a row is being initialized.
*
* @event module:onyx/FlyweightPicker~FlyweightPicker#onSetupItem
* @type {Object}
* @property {Number} index - The row index.
* @property {module:enyo/Control~Control} flyweight - The row control, for decoration.
* @see module:enyo/FlyweightRepeater~FlyweightRepeater.onSetupItem
* @public
*/

/**
* Fires when an item is selected.
*
* @event module:onyx/FlyweightPicker~FlyweightPicker#onSelect
* @type {Object}
* @property {String} content - Content of the selected item.
* @property {Number} selected - Row index of the selected item.
* @public
*/

/**
* {@link module:onyx/FlyweightPicker~FlyweightPicker}, a subkind of
* {@link module:onyx/Picker~Picker}, is a picker that employs the flyweight
* pattern. It is used to display a large list of selectable items.	The
* [onSetupItem]{@link module:onyx/FlyweightPicker~FlyweightPicker#onSetupItem}
* event allows for customization of item rendering.
*
* To initialize the FlyweightPicker to a particular value, call `setSelected()`
* with the index of the item you wish to select, and call `setContent()` with
* the item that should be shown in the activator button.
*
* When an item is selected, FlyweightPicker sends an
* [onSelect]{@link module:onyx/FlyweightPicker~FlyweightPicker#onSelect} event
* with the selected item's information. This may be handled by a client
* application to determine which item was selected.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind');
*
* 	var
* 		FlyweightPicker = require('onyx/FlyweightPicker'),
* 		PickerDecorator = require('onyx/PickerDecorator');
*
* 	module.exports = kind(
* 		name: 'onyx.FlyweightPickerExample',
* 		handlers: {
* 			onSelect: 'itemSelected'
* 		},
* 		components: [
* 			{kind: PickerDecorator, components: [
* 				{},
* 				{name: 'yearPicker', kind: FlyweightPicker, count: 200,
* 					onSetupItem: 'setupYear', components: [
* 						{name: 'year'}
* 					]
* 				}
* 			]}
* 		],
* 		create: function () {
* 			var d = new Date();
* 			var y = d.getYear();
* 			this.$.yearPicker.setSelected(y);
* 			this.$.year.setContent(1900+y);
* 		},
* 		setupYear: function (sender, event) {
* 			this.$.year.setContent(1900+event.index);
* 		},
* 		itemSelected: function (sender, event) {
* 			enyo.log('Picker Item Selected: ' + event.selected.content);
* 		}
* 	)
* ```
*
* @class FlyweightPicker
* @extends module:onyx/Picker~Picker
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/FlyweightPicker~FlyweightPicker.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.FlyweightPicker',

	/**
	* @private
	*/
	kind: Picker,

	/**
	* @private
	*/
	classes: 'onyx-flyweight-picker',

	/**
	* @lends module:onyx/FlyweightPicker~FlyweightPicker.prototype
	* @private
	*/
	published: {
		/**
		* The number of rows to render.
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		count: 0
	},

	/**
	* @private
	*/
	events: {
		onSetupItem: '',
		onSelect: ''
	},

	/**
	* @private
	*/
	handlers: {
		onSelect: 'itemSelect'
	},

	/**
	* @private
	*/
	components: [
		{name: 'scroller', kind: Scroller, strategyKind: TouchScrollStrategy, components: [
			{name: 'flyweight', kind: FlyweightRepeater, noSelect: true, ontap: 'itemTap'}
		]}
	],

	/**
	* @private
	*/
	scrollerName: 'scroller',

	/**
	* Force the flyweight's client control ([MenuItem]{@link module:onyx/MenuItem~MenuItem} by default)
	* to activate. This will result in a call to `processActivatedItem()`, which preps
	* our picker selection logic. This is a workaround for changes caused by ENYO-1609
	* which resulted in ENYO-1611.
	*
	* @private
	*/
	initComponents: function () {
		this.controlParentName = 'flyweight';
        Picker.prototype.initComponents.apply(this, arguments);
		this.$.flyweight.$.client.children[0].setActive(true);
    },

	/**
	* @private
	*/
	create: function () {
		Picker.prototype.create.apply(this, arguments);
		this.countChanged();
	},

	/**
	* @private
	*/
	rendered: function () {
		Picker.prototype.rendered.apply(this, arguments);
		this.selectedChanged();
	},

	/**
	* Scrolls the [selected]{@link module:onyx/FlyweightPicker~FlyweightPicker#selected} control into view.
	*
	* @public
	*/
	scrollToSelected: function () {
		var n = this.$.flyweight.fetchRowNode(this.selected);
		this.getScroller().scrollToNode(n, !this.menuUp);
	},

	/**
	* @private
	*/
	countChanged: function () {
		this.$.flyweight.count = this.count;
	},

	/**
	* @private
	*/
	processActivatedItem: function (item) {
		this.item = item;
	},

	/**
	* @fires module:onyx/Picker~Picker#onChange
	* @private
	*/
	selectedChanged: function (old) {
		if (!this.item) {
			return;
		}
		if (old != null) {
			this.item.removeClass('selected');
			this.$.flyweight.renderRow(old);
		}
		var n;
		if (this.selected != null) {
			this.item.addClass('selected');
			this.$.flyweight.renderRow(this.selected);
			// need to remove the class from control to make sure it won't apply to other rows
			this.item.removeClass('selected');
			n = this.$.flyweight.fetchRowNode(this.selected);
		}
		this.doChange({selected: this.selected, content: n && n.textContent || this.item.content});
	},

	/**
	* @fires module:onyx/FlyweightPicker~FlyweightPicker#onSelect
	* @private
	*/
	itemTap: function (sender, event) {
		this.setSelected(event.rowIndex);
		//Send the select event that we want the client to receive.
		this.doSelect({selected: this.item, content: this.item.content});
	},

	/**
	* Blocks all `select` events that aren't coming from this control. This is to
	* prevent `select` events from MenuItems since they won't have the correct value
	* in a Flyweight context.
	*
	* @private
	*/
	itemSelect: function (sender, event) {
		if (event.originator != this) {
			return true;
		}
	}
});

}],'onyx/IntegerPicker':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/IntegerPicker~IntegerPicker} kind.
* @module onyx/IntegerPicker
*/

var
	kind = require('enyo/kind');

var
	Picker = require('onyx/Picker');

/**
* {@link module:onyx/IntegerPicker~IntegerPicker}, a subkind of {@link module:onyx/Picker~Picker}, is used to
* display a list of integers that may be selected, ranging from
* [min]{@link module:onyx/IntegerPicker~IntegerPicker#min} to [max]{@link module:onyx/IntegerPicker~IntegerPicker#max}.
* It is meant to be used in conjunction with an {@link module:onyx/PickerDecorator~PickerDecorator}.
* The decorator loosely couples the picker with an {@link module:onyx/PickerButton~PickerButton}--a
* button that, when tapped, shows the picker. Once an item is selected, the
* list of items closes,	but the item stays selected and the PickerButton
* displays the choice that was made.
*
* To initialize the IntegerPicker to a particular value, set the
* [value]{@link module:onyx/IntegerPicker~IntegerPicker#value} property to the integer that should
* be selected.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		IntegerPicker = require('onyx/IntegerPicker'),
* 		PickerDecorator = require('onyx/PickerDecorator');
*
* 	{kind: PickerDecorator, components: [
* 		{}, // this uses the defaultKind property of PickerDecorator to inherit from PickerButton
* 		{kind: IntegerPicker, min: 0, max: 25, value: 5}
* 	]}
* ```
*
* Each item in the list is an {@link module:onyx/MenuItem~MenuItem}, so an application may
* listen for an [onSelect]{@link module:onyx/MenuItem~MenuItem#onSelect} event with the
* item to determine which picker item was selected.
*
* @class IntegerPicker
* @extends module:onyx/Picker~Picker
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/IntegerPicker~IntegerPicker.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.IntegerPicker',

	/**
	* @private
	*/
	kind: Picker,

	/**
	* @lends module:onyx/IntegerPicker~IntegerPicker.prototype
	* @private
	*/
	published: {
		/**
		* Selected value of the picker.
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		value: 0,

		/**
		* Minimum value of the picker.
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		min: 0,

		/**
		* Maximum value of the picker.
		*
		* @type {Number}
		* @default  9
		* @public
		*/
		max: 9
	},

	/**
	* @private
	*/
	create: function () {
		Picker.prototype.create.apply(this, arguments);
		this.rangeChanged();
	},

	/**
	* @private
	*/
	minChanged: function () {
		this.destroyClientControls();
		this.rangeChanged();
		this.render();
	},

	/**
	* @private
	*/
	maxChanged: function () {
		this.destroyClientControls();
		this.rangeChanged();
		this.render();
	},

	/**
	* @private
	*/
	rangeChanged: function () {
		for (var i=this.min; i<=this.max; i++) {
			this.createComponent({content: i, active: (i===this.value) ? true : false});
		}
	},

	/**
	* @private
	*/
	valueChanged: function () {
		var controls = this.getClientControls();
		var len = controls.length;
		// Validate our value
		this.value = Math.min(this.max, Math.max(this.value, this.min));
		for (var i=0; i<len; i++) {
			if (this.value === parseInt(controls[i].content, 10)) {
				this.setSelected(controls[i]);
				break;
			}
		}
	},

	/**
	* @private
	*/
	selectedChanged: function (old) {
		if (old) {
			old.removeClass('selected');
		}
		if (this.selected) {
			this.selected.addClass('selected');
			this.doChange({selected: this.selected, content: this.selected.content});
		}
		this.setValue(parseInt(this.selected.content, 10));
	}
});

}],'onyx/TimePicker':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/TimePicker~TimePicker} kind.
* @module onyx/TimePicker
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	Picker = require('onyx/Picker'),
	PickerDecorator = require('onyx/PickerDecorator');

/**
* Fires when one of the [TimePicker]{@link module:onyx/TimePicker~TimePicker}'s fields is selected.
*
* @event module:onyx/TimePicker~TimePicker#onSelect
* @type {Object}
* @property {String} name - Name of the [TimePicker]{@link module:onyx/TimePicker~TimePicker} that
* generated the event.
* @property {Date} value  - Current {@glossary Date} value of the control.
* @public
*/

/**
* {@link module:onyx/TimePicker~TimePicker} is a group of {@link module:onyx/Picker~Picker} controls that,
* collectively, display the current time. The user may change the hour, minute,
* and meridiem (AM/PM) values.
*
* TimePicker uses U.S. time formatting. For a locale-aware version, see
* {@link module:onyx/i18n/TimePicker~TimePicker}.
*
* @ui
* @class TimePicker
* @extends module:enyo/Control~Control
* @public
*/
module.exports = kind(
	/** @lends module:onyx/TimePicker~TimePicker.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.TimePicker',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-toolbar-inline',

	/**
	* @lends module:onyx/TimePicker~TimePicker.prototype
	* @private
	*/
	published: {
		/**
		* If `true`, the control is shown as disabled and users cannot select new values.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false,

		/**
		* If `true`, 24-hour time is used.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		is24HrMode: false,

		/**
		* {@glossary Date} object representing the currently-selected date/time.
		* When a Date object is passed to `setValue()`, the object is stored here
		* and the control is updated to reflect the new date/time.
		*
		* @type {Object|null}
		* @default null
		* @public
		*/
		value: null
	},

	/**
	* @private
	*/
	events: {
		onSelect: ''
	},

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.initDefaults();
	},

	/**
	* @private
	*/
	initDefaults: function () {
		this.setupMeridiems();

		this.setupPickers(this.getTimeFormat());

		var d = this.value = this.value || new Date();

		// create hours
		var i;
		if (!this.is24HrMode) {
			var h = d.getHours();
			h = (h === 0) ? 12 : h;
			for (i=1; i<=12; i++) {
				this.$.hourPicker.createComponent({content: i, value:i, active: (i == (h>12 ? h%12 : h))});
			}
		} else {
			for (i=0; i<24; i++) {
				this.$.hourPicker.createComponent({content: i, value:i, active: (i == d.getHours())});
			}
		}

		// create minutes
		for (i=0; i<=59; i++) {
			this.$.minutePicker.createComponent({content: (i < 10) ? ('0'+i):i, value:i, active: i == d.getMinutes()});
		}

		// create am/pm
		if (d.getHours() >= 12) {
			this.$.ampmPicker.createComponents([{content: this._strAm},{content:this._strPm, active: true}]);
		} else {
			this.$.ampmPicker.createComponents([{content: this._strAm, active: true},{content:this._strPm}]);
		}
		this.$.ampmPicker.getParent().setShowing(!this.is24HrMode);
	},

	/**
	* Sets up meridiems for en-US.
	* @private
	*/
	setupMeridiems: function () {
		this._strAm = 'AM';
		this._strPm = 'PM';
	},

	/**
	* Returns the ordering of time components
	* @private
	*/
	getTimeFormat: function () {
		return 'hma';
	},

	/**
	* @private
	*/
	setupPickers: function (timeComponents) {
		// order is always fixed hours, minutes, am/pm
		if (timeComponents.indexOf('h') !== -1) {
			this.createHour();
		}
		if (timeComponents.indexOf('m') !== -1) {
			this.createMinute();
		}
		if (timeComponents.indexOf('a') !== -1) {
			this.createAmPm();
		}
	},

	/**
	* @private
	*/
	createHour: function () {
		this.createComponent(
			{kind: PickerDecorator, onSelect: 'updateHour', components: [
				{name: 'hourPickerButton', classes: 'onyx-timepicker-hour', disabled: this.disabled},
				{name: 'hourPicker', kind: Picker}
			]}
		);
	},

	/**
	* @private
	*/
	createMinute: function () {
		this.createComponent(
			{kind: PickerDecorator, onSelect: 'updateMinute', components: [
				{name: 'minutePickerButton', classes: 'onyx-timepicker-minute', disabled: this.disabled},
				{name: 'minutePicker', kind: Picker}
			]}
		);
	},

	/**
	* @private
	*/
	createAmPm: function () {
		this.createComponent(
			{kind: PickerDecorator, onSelect: 'updateAmPm', components: [
				{name: 'ampmPickerButton', classes: 'onyx-timepicker-ampm', disabled: this.disabled},
				{name: 'ampmPicker', kind: Picker}
			]}
		);
	},

	/**
	* @private
	*/
	disabledChanged: function () {
		this.$.hourPickerButton.setDisabled(this.disabled);
		this.$.minutePickerButton.setDisabled(this.disabled);
		this.$.ampmPickerButton.setDisabled(this.disabled);
	},

	/**
	* @private
	*/
	is24HrModeChanged: function () {
		this.refresh();
	},

	/**
	* @private
	*/
	valueChanged: function (){
		this.refresh();
	},

	/**
	* @fires module:onyx/TimePicker~TimePicker#onSelect
	* @private
	*/
	updateHour: function (inSender, inEvent){
		var h = inEvent.selected.value;
		if (!this.is24HrMode){
			var ampm = this.$.ampmPicker.getParent().controlAtIndex(0).content;
			h = h + (h == 12 ? -12 : 0) + (this.isAm(ampm) ? 0 : 12);
		}
		this.setValue(this.calcTime(h, this.value.getMinutes()));
		this.doSelect({name:this.name, value:this.value});
		return true;
	},

	/**
	* @fires module:onyx/TimePicker~TimePicker#onSelect
	* @private
	*/
	updateMinute: function (inSender, inEvent){
		this.setValue(this.calcTime(this.value.getHours(), inEvent.selected.value));
		this.doSelect({name:this.name, value:this.value});
		return true;
	},

	/**
	* @fires module:onyx/TimePicker~TimePicker#onSelect
	* @private
	*/
	updateAmPm: function (inSender, inEvent){
		var h = this.value.getHours();
		if (!this.is24HrMode){
			h = h + (h > 11 ? (this.isAm(inEvent.content) ? -12 : 0) : (this.isAm(inEvent.content) ? 0 : 12));
		}
		this.setValue(this.calcTime(h, this.value.getMinutes()));
		this.doSelect({name:this.name, value:this.value});
		return true;
	},

	/**
	* @private
	*/
	calcTime: function (hour, minute){
		return new Date(this.value.getFullYear(),
						this.value.getMonth(),
						this.value.getDate(),
						hour, minute,
						this.value.getSeconds(),
						this.value.getMilliseconds());
	},

	/**
	* @private
	*/
	isAm: function (value){
		return value == this._strAm;
	},

	/**
	* @private
	*/
	refresh: function (){
		this.destroyClientControls();
		this.initDefaults();
		this.render();
	}
});

}],'onyx/TabPanels':[function (module,exports,global,require,request){
﻿require('onyx');

/**
* Contains the declaration for the {@link module:onyx/TabPanels~TabPanels} kind.
* @wip
* @module onyx/TabPanels
*/

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	FittableLayout = require('layout/FittableLayout'),
	FittableRowsLayout = FittableLayout.Rows,
	Panels = require('layout/Panels');

var
	TabBar = require('onyx/TabBar');

/**
* onyx/TabPanels is a subkind of layout/Panels that displays a set of tabs,
* which allow navigation between the individual panels.  Unlike
* [layout/Panels]{@link module:layout/Panels~Panels}, by default, the user
* cannot drag between the panels of a TabPanels. This behavior may be enabled
* by setting [draggable]{@link module:onyx/TabPanels~TabPanels#draggable} to `true`.
*
* ```javascript
* var
*     kind = require('enyo/kind'),
*     TabPanels = require('onyx/TabPanels');
*
* kind({
*     name: 'App',
*     kind: TabPanels,
*     fit: true,
*     components: [
*         {name: 'MyStartPanel'},
*         {name: 'MyMiddlePanel'},
*         {name: 'MyLastPanel'}
*     ]
*    });
* ```
*
* @class TabPanels
* @extends module:enyo/Panels~Panels
* @wip
* @ui
* @private
*/
module.exports = kind(
	/** @lends module:onyx/TabPanels~TabPanels.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.TabPanels',

	/**
	* @private
	*/
	kind: Panels,

	/**
	* @see module:layout/Panels~Panels#draggable
	*
	* @type {Boolean}
	* @default false
	* @override
	* @public
	*/
	draggable: false,

	/**
	* @private
	*/
	handlers: {
		onTabChanged: 'switchPanel'
	},

	/**
	* @lends module:onyx/TabPanels~TabPanels.prototype
	* @private
	*/
	published: {
		/**
		* Set a maximum height for the scrollable menu that can be raised on the right of
		* the tab bar.
		*
		* @type {Number|null}
		* @default null
		* @public
		*/
		maxMenuHeight: null
	},

	/**
	* @private
	*/
	tabTools: [
		{kind: TabBar, isPanel: true, name: 'bar'},
		{name: 'client', isPanel: true, fit: true, kind: Panels, classes: 'enyo-tab-panels', onTransitionStart: 'clientTransitionStart'}
	],

	/**
	* @private
	*/
	create: function () {
		Panels.prototype.create.apply(this, arguments);

		if (this.getMaxMenuHeight()) {
			this.maxMenuHeightChanged();
		}

		// getPanels called on client will return panels of *this* kind
		this.$.client.getPanels = this.bindSafely('getClientPanels');

		// basically, set all these Panel parameters to false
		this.draggableChanged();
		this.animateChanged();
		this.wrapChanged();
	},

	/**
	* @private
	*/
	maxMenuHeightChanged: function () {
		this.$.bar.setMaxMenuHeight(this.getMaxMenuHeight()) ;
	},

	/**
	* @private
	*/
	initComponents: function () {
		this.createChrome(this.tabTools);
		Panels.prototype.initComponents.apply(this, arguments);
	},

	/**
	* @private
	*/
	getClientPanels: function () {
		return this.getPanels();
	},

	/**
	* @private
	*/
	flow: function () {
		Panels.prototype.flow.apply(this, arguments);
		this.$.client.flow();
	},

	/**
	* @private
	*/
	reflow: function () {
		Panels.prototype.reflow.apply(this, arguments);
		this.$.client.reflow();
	},

	/**
	* @private
	*/
	draggableChanged: function () {
		this.$.client.setDraggable(this.draggable);
		this.draggable = false;
	},

	/**
	* @private
	*/
	animateChanged: function () {
		this.$.client.setAnimate(this.animate);
		this.animate = false;
	},

	/**
	* @private
	*/
	wrapChanged: function () {
		this.$.client.setWrap(this.wrap);
		this.wrap = false;
	},

	/**
	* @private
	*/
	isClient: function (inControl) {
		return ! inControl.isPanel ;
	},

	/**
	* @private
	*/
	initDone: false,

	/**
	* @private
	*/
	rendered: function () {

		if (this.initDone) { return ;}

		var that = this ;
		utils.forEach(this.controls, function (c) {
			if (that.isClient(c)) {
				that.$.bar.addTab(c) ;
			}
		});

		this.setIndex(this.controls.length - 1);
		this.initDone = true;

		// must be called at the end otherwise kind size is weird
		Panels.prototype.rendered.apply(this, arguments);
	},

	/**
	* Add a new control managed by the tab bar. inControl is a
	* control with optional caption attribute. When not specified
	* the tab will have a generated caption like 'Tab 0', 'Tab
	* 1'. etc...
	*
	* @public
	*/
	addTab: function (inControl){
		this.$.bar.addTab(inControl);
		this.setIndex(this.controls.length - 1);
	},

	/**
	* Remove a tab from the tab bar. The control managed by the
	* tab will also be destroyed. target is an object with either
	* a caption attribute or an index. The tab(s) matching the
	* caption will be destroyed or the tab with matching index
	* will be destroyed.
	*
	* Example:
	*
	* ```
	*	myTab.removeTab({'index':0}); // remove the leftmost tab
	*	myTab.removeTab({'caption':'foo.js'});
	* ```
	*
	* @public
	*/
	removeTab: function (indexData) {
		this.$.bar.removeTab(indexData);
	},

	/**
	* @private
	*/
	layoutKindChanged: function () {
		if (!this.layout) {
			this.layout = new FittableRowsLayout(this);
		}
		this.$.client.setLayoutKind(this.layoutKind);
	},

	/**
	* @private
	*/
	indexChanged: function () {
		// FIXME: initialization order problem
		if (this.$.client.layout) {
			this.$.client.setIndex(this.index);
		}
		this.index = this.$.client.getIndex();
	},

	/**
	* @private
	*/
	switchPanel: function (inSender, inEvent) {
		if (this.hasNode()) {
			var i = inEvent.index;
			if (this.getIndex() != i) {
				this.setIndex(i);
			}
		}
	},

	/**
	* @private
	*/
	startTransition: utils.nop,

	/**
	* @private
	*/
	finishTransition: utils.nop,

	/**
	* @private
	*/
	stepTransition: utils.nop,

	/**
	* @private
	*/
	refresh: utils.nop
});

}],'onyx/DatePicker':[function (module,exports,global,require,request){
﻿require('onyx');

/**
* Contains the declaration for the {@link module:onyx/DatePicker~DatePicker} kind.
* @module onyx/DatePicker
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	FlyweightPicker = require('onyx/FlyweightPicker'),
	Picker = require('onyx/Picker'),
	PickerDecorator = require('onyx/PickerDecorator');

/**
* Fires when one of the [DatePicker]{@link module:onyx/DatePicker~DatePicker}'s fields is selected.
*
* @event module:onyx/DatePicker~DatePicker#onSelect
* @type {Object}
* @property {String} name - Name of the [DatePicker]{@link module:onyx/DatePicker~DatePicker} that
* generated the event.
* @property {Date} value - Current {@glossary Date} value of the control.
* @public
*/

/**
* {@link module:onyx/DatePicker~DatePicker} is a group of {@link module:onyx/Picker~Picker} controls
* used for displaying a date. The user may change the day, month, and year values.
*
* By default, the control uses standard U.S. date formatting. For a locale-aware version, see
* {@link module:onyx/i18n/DatePicker~DatePicker}.
*
* The `day` field is automatically populated with the proper number of days for
* the selected month and year.
*
* @class DatePicker
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/DatePicker~DatePicker.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.DatePicker',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-toolbar-inline',

	/**
	* @lends module:onyx/DatePicker~DatePicker.prototype
	* @private
	*/
	published: {
		/**
		* If `true`, the control is shown as disabled and the user cannot select
		* new values.
		*
		* @type {Boolean}
		* @default  false
		* @public
		*/
		disabled: false,

		/**
		* If `true`, the `day` field is hidden.
		*
		* @type {Boolean}
		* @default  false
		* @public
		*/
		dayHidden: false,

		/**
		* If `true`, the `month` field is hidden.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		monthHidden: false,

		/**
		* If `true`, the `year` field is hidden.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		yearHidden: false,

		/**
		* Optional minimum year value.
		*
		* @type {Number}
		* @default  1900
		* @public
		*/
		minYear: 1900,

		/**
		* Optional maximum year value.
		*
		* @type {Number}
		* @default 2099
		* @public
		*/
		maxYear: 2099,

		/**
		* Date object representing currently selected date. When a Date object is
		* passed to `setValue()`, the passed-in object is stored here and the
		* control is updated to reflect the new date.
		*
		* @type {Date}
		* @default  null
		* @public
		*/
		value: null
	},

	/**
	* @private
	*/
	events: {
		onSelect: ''
	},

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.initDefaults();
	},

	/**
	* Performs initial setup of the picker, including creation of the necessary
	* child controls.
	*
	* @override
	* @private
	*/
	initDefaults: function () {
		var months = this.getMonthList();

		this.setupPickers(this.getDateFormat());

		this.dayHiddenChanged();
		this.monthHiddenChanged();
		this.yearHiddenChanged();

		// Fill month, year & day pickers with values
		var d = this.value = this.value || new Date();
		for (var i=0,m; (m=months[i + 1]); i++) {
			this.$.monthPicker.createComponent({content: m, value:i, active: i==d.getMonth()});
		}

		var y = d.getFullYear();
		this.$.yearPicker.setSelected(y-this.minYear);

		for (i=1; i<=this.monthLength(d.getYear(), d.getMonth()); i++) {
			this.$.dayPicker.createComponent({content:i, value:i, active: i==d.getDate()});
		}
	},

	/**
	* Returns the list of month names
	* @protected
	*/
	getMonthList: function () {
		return [undefined, 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
	},

	/**
	* Returns the default date order format
	* @protected
	*/
	getDateFormat: function () {
		return 'mdy';
	},

	/**
	* Determines the number of days in a particular month/year.
	*
	* @param  {Number} year
	* @param  {Number} month
	* @return {Number} Number of days in the month/year
	* @private
	*/
	monthLength: function (year, month) {
		// determine number of days in a particular month/year
		return 32 - new Date(year, month, 32).getDate();
	},

	/**
	* Handler for year [onSetupItem]{@link module:onyx/FlyweightPicker~FlyweightPicker#onSetupItem} event.
	*
	* @private
	*/
	setupYear: function (sender, event) {
		this.$.year.setContent(this.minYear+event.index);
		return true;
	},

	/**
	* Builds the picker components.
	*
	* @param  {String} ordering - Representation of the picker order. Year, Month, and Day
	* are represented as `'y'`, `'m'`, and `'d'`, respectively. So, for example, if the
	* value of `ordering` is `'ymd'`, the pickers will be created in the order: Year, Month,
	* Day.
	* @private
	*/
	setupPickers: function (ordering) {
		var orderingArr = ordering.split('');
		var o,f,l;
		var createdYear = false, createdMonth = false, createdDay = false;
		for(f = 0, l = orderingArr.length; f < l; f++) {
			o = orderingArr[f];
			switch (o.toLowerCase()){
			case 'd':
				if (!createdDay) {
					this.createDay();
					createdDay = true;
				}
				break;
			case 'm':
				if (!createdMonth) {
					this.createMonth();
					createdMonth = true;
				}
				break;
			case 'y':
				if (!createdYear) {
					this.createYear();
					createdYear = true;
				}
				break;
			default:
				break;
			}
		}
	},

	/**
	* Creates the year picker.
	*
	* @private
	*/
	createYear: function () {
		var yearCount = this.maxYear - this.minYear;
		this.createComponent(
			{kind: PickerDecorator, onSelect: 'updateYear', components: [
				{name: 'yearPickerButton', classes: 'onyx-datepicker-year', disabled: this.disabled},
				{name: 'yearPicker', kind: FlyweightPicker, count: ++yearCount, onSetupItem: 'setupYear', components: [
					{name: 'year'}
				]}
			]}
		);
	},

	/**
	* Creates the month picker.
	*
	* @private
	*/
	createMonth: function () {
		this.createComponent(
			{kind: PickerDecorator, onSelect: 'updateMonth', components: [
				{name: 'monthPickerButton', classes: 'onyx-datepicker-month', disabled: this.disabled},
				{name: 'monthPicker', kind: Picker}
			]}
		);
	},

	/**
	* Creates the day picker.
	*
	* @private
	*/
	createDay: function () {
		this.createComponent(
			{kind: PickerDecorator, onSelect: 'updateDay', components: [
				{name: 'dayPickerButton', classes: 'onyx-datepicker-day', disabled: this.disabled},
				{name: 'dayPicker', kind: Picker}
			]}
		);
	},

	/**
	* @private
	*/
	dayHiddenChanged: function () {
		this.$.dayPicker.getParent().setShowing(this.dayHidden ? false : true);
	},

	/**
	* @private
	*/
	monthHiddenChanged: function () {
		this.$.monthPicker.getParent().setShowing(this.monthHidden ? false : true);
	},

	/**
	* @private
	*/
	yearHiddenChanged: function () {
		this.$.yearPicker.getParent().setShowing(this.yearHidden ? false : true);
	},

	/**
	* @private
	*/
	minYearChanged: function () {
		this.refresh();
	},

	/**
	* @private
	*/
	maxYearChanged: function () {
		this.refresh();
	},

	/**
	* @private
	*/
	valueChanged: function (){
		this.refresh();
	},

	/**
	* @private
	*/
	disabledChanged: function () {
		this.$.yearPickerButton.setDisabled(this.disabled);
		this.$.monthPickerButton.setDisabled(this.disabled);
		this.$.dayPickerButton.setDisabled(this.disabled);
	},

	/**
	* Handler for the day picker's [onSelect]{@link module:onyx/DatePicker~DatePicker#onSelect} event.
	*
	* @fires module:onyx/DatePicker~DatePicker#onSelect
	* @private
	*/
	updateDay: function (sender, event){
		var date = this.calcDate(this.value.getFullYear(),
								this.value.getMonth(),
								event.selected.value);
		this.doSelect({name:this.name, value:date});
		this.setValue(date);
		return true;
	},

	/**
	* Handler for the month picker's [onSelect]{@link module:onyx/DatePicker~DatePicker#onSelect} event.
	*
	* @fires module:onyx/DatePicker~DatePicker#onSelect
	* @private
	*/
	updateMonth: function (sender, event){
		var date = this.calcDate(this.value.getFullYear(),
								event.selected.value,
								this.value.getDate());
		this.doSelect({name:this.name, value:date});
		this.setValue(date);
		return true;
	},

	/**
	* Handler for the year picker's [onSelect]{@link module:onyx/DatePicker~DatePicker#onSelect} event.
	*
	* @fires module:onyx/DatePicker~DatePicker#onSelect
	* @private
	*/
	updateYear: function (sender, event){
		//if the node wasn't found (issue around FlyWeightRepeater/Picker) don't update the picker
		if (event.originator.selected != -1) {
			var date = this.calcDate(this.minYear + event.originator.selected,
									this.value.getMonth(),
									this.value.getDate());
			this.doSelect({name:this.name, value:date});
			this.setValue(date);
		}
		return true;
	},

	/**
	* Creates a {@glossary Date} object for the given `year`, `month`, and `date`. The
	* time component is pulled from the current [value]{@link module:onyx/DatePicker~DatePicker#value}.
	*
	* @param  {Number} year
	* @param  {Number} month
	* @param  {Number} day
	* @return {Date}
	* @private
	*/
	calcDate: function (year, month, day){
		return new Date(year,month,day,
						this.value.getHours(),
						this.value.getMinutes(),
						this.value.getSeconds(),
						this.value.getMilliseconds());
	},

	/**
	* Refreshes the pickers by destroying and rebuilding the components.
	*
	* @public
	*/
	refresh: function (){
		this.destroyClientControls();
		this.initDefaults();
		this.render();
	}
});

}],'onyx/i18n/TimePicker':[function (module,exports,global,require,request){
require('onyx');
require('enyo-ilib');

/**
* Contains the declaration for the {@link module:onyx/i18n/TimePicker~TimePicker} kind.
* @module onyx/i18n/TimePicker
*/

var
	kind = require('enyo/kind'),
	Signals = require('enyo/Signals');

var
	dateFactory = require('enyo-ilib/DateFactory'),
	DateFmt = require('enyo-ilib/DateFmt');

var
	TimePicker = require('onyx/TimePicker');

/**
* {@link module:onyx/i18n/TimePicker~TimePicker} is a locale-aware version of
* group of {@link module:onyx/TimePicker~TimePicker}. It uses the [iLib]{@glossary ilib} library
* to localize time display.
*
* @ui
* @class TimePicker
* @extends module:enyo/TimePicker~TimePicker
* @public
*/
module.exports = kind(
	/** @lends module:onyx/i18n/TimePicker~TimePicker.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.TimePicker',

	/**
	* @private
	*/
	kind: TimePicker,

	/**
	* @lends module:onyx/i18n/TimePicker~TimePicker.prototype
	* @private
	*/
	published: {
		/**
		* If `true`, 24-hour time is used. If `null` or when the locale is changed, this value is
		* updated to reflect the locale's rules.
		*
		* @type {Boolean|null}
		* @default null
		* @public
		*/
		is24HrMode: null
	},

	/**
	* @private
	*/
	create: function () {
		TimePicker.prototype.create.apply(this, arguments);
		this.createComponent({kind: Signals, onlocalechange: 'localeChanged'});
	},

	/**
	* @private
	*/
	initDefaults: function () {
		this._tf = new DateFmt({timezone: 'local'});
		TimePicker.prototype.initDefaults.apply(this, arguments);
	},

	/**
	* Sets meridiems and will set 24Hr mode based on locale if it was not specified
	* @private
	*/
	setupMeridiems: function () {
		var objAmPm = new DateFmt({type: 'time', template: 'a'}),
			timeobj = dateFactory({hour: 1});

		this._strAm = objAmPm.format(timeobj);
		// TODO: Does not support locales with more than two meridiems.  See moonstone/TimePicker
		timeobj.setHours(13);
		this._strPm = objAmPm.format(timeobj);

		if (this.is24HrMode == null) {
			this.is24HrMode = (this._tf.getClock() == '24');
		}
	},

	/**
	* Returns the locale-aware ordering of time components
	* @private
	*/
	getTimeFormat: function () {
		return this._tf.getTimeComponents();
	},

	/**
	* @private
	*/
	localeChanged: function () {
		//reset 24 hour mode when changing locales
		this.is24HrMode = null;
		this.refresh();
	}

});

}],'onyx/i18n/DatePicker':[function (module,exports,global,require,request){
﻿require('onyx');
require('enyo-ilib');

/**
* Contains the declaration for the {@link module:onyx/i18n/DatePicker~DatePicker} kind.
* @module onyx/i18n/DatePicker
*/

var
	kind = require('enyo/kind'),
	Signals = require('enyo/Signals');

var
	DateFmt = require('enyo-ilib/DateFmt');

var
	DatePicker = require('onyx/DatePicker');

/**
* {@link module:onyx/i18n/DatePicker~DatePicker} is a {@link module:onyx/DatePicker~DatePicker}
* that uses the [iLib]{@glossary ilib} library to tryi to determine the current locale and use that
* locale's rules to format the date (including the month name).
*
* The `day` field is automatically populated with the proper number of days for
* the selected month and year.
*
* @class DatePicker
* @extends module:enyo/DatePicker~DatePicker
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/i18n/DatePicker~DatePicker.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.DatePicker',

	/**
	* @private
	*/
	kind: DatePicker,

	/**
	* @private
	*/
	create: function () {
		DatePicker.prototype.create.apply(this, arguments);
		this.createComponent({kind: Signals, onlocalechange: 'localeChanged'});
	},

	/**
	* @private
	*/
	initDefaults: function () {
		this._tf = new DateFmt({timezone: 'local'});
		DatePicker.prototype.initDefaults.apply(this, arguments);
	},

	/**
	* Returns the iLib list of locale-appropriate month names
	* @protected
	*/
	getMonthList: function () {
		return this._tf.getMonthsOfYear({length: 'long'});
	},

	/**
	* Returns the iLib locale-appropriate date order format
	* @protected
	*/
	getDateFormat: function () {
		return this._tf.getTemplate();
	},

	/**
	* @private
	*/
	localeChanged: function () {
		this.refresh();
	}

});

}]
	};

});
//# sourceMappingURL=onyx.js.map