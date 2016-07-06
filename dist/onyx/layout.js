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
	return {'layout/Arranger':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/Arranger~Arranger} kind.
* @module layout/Arranger
*/

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	platform = require('enyo/platform');

var
	Layout = require('enyo/Layout'),
	Dom = require('enyo/dom');

/**
* {@link module:layout/Arranger~Arranger} is an {@link module:enyo/Layout~Layout} that considers one of the
* controls it lays out as active. The other controls are placed relative to
* the active control as makes sense for the layout.
*
* `layout/Arranger` supports dynamic layouts, meaning it's possible to transition
* between an arranger's layouts	via animation. Typically, arrangers should lay out
* controls using CSS transforms, since these are optimized for animation. To
* support this, the controls in an arranger are absolutely positioned, and
* the Arranger kind has an [accelerated]{@link module:layout/Arranger~Arranger#accelerated} property,
* which marks controls for CSS compositing. The default setting of `'auto'` ensures
* that this will occur if enabled by the platform.
*
* For more information, see the documentation on
* [Arrangers]{@linkplain $dev-guide/building-apps/layout/arrangers.html} in the
* Enyo Developer Guide.
*
* @class Arranger
* @extends module:enyo/Layout~Layout
* @public
*/
var Arranger = module.exports = kind(
	/** @lends module:layout/Arranger~Arranger.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.Arranger',

	/**
	* @private
	*/
	kind: Layout,

	/**
	* @private
	*/
	layoutClass: 'enyo-arranger',

	/**
	* Flag indicating whether the Arranger should lay out controls using CSS
	* compositing. The default setting `('auto')` will mark controls for compositing
	* if the platform supports it.
	*
	* @type {String|Boolean}
	* @default 'auto'
	* @protected
	*/
	accelerated: 'auto',

	/**
	* A property of the drag event, used to calculate the amount that a drag will
	* move the layout.
	*
	* @type {String}
	* @default 'ddx'
	* @private
	*/
	dragProp: 'ddx',

	/**
	* A property of the drag event, used to calculate the direction of the drag.
	*
	* @type {String}
	* @default 'xDirection'
	* @private
	*/
	dragDirectionProp: 'xDirection',

	/**
	* A property of the drag event, used to calculate whether a drag should occur.
	*
	* @type {String}
	* @default 'horizontal'
	* @private
	*/
	canDragProp: 'horizontal',

	/**
	* If set to `true`, transitions between non-adjacent arrangements will go
	* through the intermediate arrangements. This is useful when direct
	* transitions between arrangements would be visually jarring.
	*
	* @type {Boolean}
	* @default false
	* @protected
	*/
	incrementalPoints: false,

	/**
	* Called when removing an arranger (e.g., when switching a Panels control to a
	* different `arrangerKind`). Subkinds should implement this function to reset
	* whatever properties they've changed on child controls. Note that you **must**
	* call the superkind implementation in your subkind's `destroy()` function.
	*
	* @method
	* @private
	*/
	destroy: kind.inherit(function (sup) {
		return function () {
			var c$ = this.container.getPanels();
			for (var i=0, c; (c=c$[i]); i++) {
				c._arranger = null;
			}
			sup.apply(this, arguments);
		};
	}),

	/**
	* Arranges the given array of `controls` in the layout specified by `index`. When
	* implementing this method, rather than applying styling directly to controls, call
	* [arrangeControl()]{@link module:layout/Arranger~Arranger#arrangeControl} and pass in an arrangement
	* object with styling settings. The styles will then be applied via
	* [flowControl()]{@link module:layout/Arranger~Arranger#flowControl}.
	*
	* @param {module:enyo/Control~Control[]} controls
	* @param {Number} index
	* @virtual
	* @protected
	*/
	arrange: function (controls, index) {
	},

	/**
	* Sizes the controls in the layout. This method is called only at reflow time.
	* Note that the sizing operation has been separated from the layout done in
	* [arrange()]{@link module:layout/Arranger~Arranger#arrange} because it is expensive and not suitable
	* for dynamic layout.
	*
	* @virtual
	* @protected
	*/
	size: function () {
	},

	/**
	* Called when a layout transition begins. Implement this method to perform
	* tasks that should only occur when a transition starts; for example, some
	* controls might be shown or hidden. In addition, the `transitionPoints`
	* array may be set on the container to dictate the named arrangements
	* between which the transition occurs.
	*
	* @protected
	*/
	start: function () {
		var f = this.container.fromIndex, t = this.container.toIndex;
		var p$ = this.container.transitionPoints = [f];
		// optionally add a transition point for each index between from and to.
		if (this.incrementalPoints) {
			var d = Math.abs(t - f) - 2;
			var i = f;
			while (d >= 0) {
				i = i + (t < f ? -1 : 1);
				p$.push(i);
				d--;
			}
		}
		p$.push(this.container.toIndex);
	},

	/**
	* Called when a layout transition completes. Implement this method to
	* perform tasks that should only occur when a transition ends; for
	* example, some controls might be shown or hidden.
	*
	* @virtual
	* @protected
	*/
	finish: function () {
	},

	/**
	* Called when dragging the layout, this method returns the difference in
	* pixels between the arrangement `a0` for layout setting `i0`	and
	* arrangement `a1` for layout setting `i1`. This data is used to calculate
	* the percentage that a drag should move the layout between two active states.
	*
	* @param {Number} i0 - The initial layout setting.
	* @param {Object} a0 - The initial arrangement.
	* @param {Number} i1 - The target layout setting.
	* @param {Object} a1 - The target arrangement.
	* @virtual
	* @protected
	*/
	calcArrangementDifference: function (i0, a0, i1, a1) {
	},

	/**
	* @private
	*/
	canDragEvent: function (event) {
		return event[this.canDragProp];
	},

	/**
	* @private
	*/
	calcDragDirection: function (event) {
		return event[this.dragDirectionProp];
	},

	/**
	* @private
	*/
	calcDrag: function (event) {
		return event[this.dragProp];
	},

	/**
	* @private
	*/
	drag: function (dp, an, a, bn, b) {
		var f = this.measureArrangementDelta(-dp, an, a, bn, b);
		return f;
	},

	/**
	* @private
	*/
	measureArrangementDelta: function (x, i0, a0, i1, a1) {
		var d = this.calcArrangementDifference(i0, a0, i1, a1);
		var s = d ? x / Math.abs(d) : 0;
		s = s * (this.container.fromIndex > this.container.toIndex ? -1 : 1);
		return s;
	},

	/**
	* Arranges the panels, with the panel at `index` being designated as active.
	*
	* @param  {Number} index - The index of the active panel.
	* @private
	*/
	_arrange: function (index) {
		// guard against being called before we've been rendered
		if (!this.containerBounds) {
			this.reflow();
		}
		var c$ = this.getOrderedControls(index);
		this.arrange(c$, index);
	},

	/**
	* Arranges `control` according to the specified `arrangement`.
	*
	* Note that this method doesn't actually modify `control` but rather sets the
	* arrangement on a private member of the control to be retrieved by
	* {@link module:layout/Panels~Panels}.
	*
	* @param  {module:enyo/Control~Control} control
	* @param  {Object} arrangement
	* @private
	*/
	arrangeControl: function (control, arrangement) {
		control._arranger = utils.mixin(control._arranger || {}, arrangement);
	},

	/**
	* Called before HTML is rendered. Applies CSS to panels to ensure GPU acceleration if
	* [accelerated]{@link module:layout/Arranger~Arranger#accelerated} is `true`.
	*
	* @private
	*/
	flow: function () {
		this.c$ = [].concat(this.container.getPanels());
		this.controlsIndex = 0;
		for (var i=0, c$=this.container.getPanels(), c; (c=c$[i]); i++) {
			Dom.accelerate(c, !c.preventAccelerate && this.accelerated);
			if (platform.safari) {
				// On Safari-desktop, sometimes having the panel's direct child set to accelerate isn't sufficient
				// this is most often the case with Lists contained inside another control, inside a Panels
				var grands=c.children;
				for (var j=0, kid; (kid=grands[j]); j++) {
					Dom.accelerate(kid, this.accelerated);
				}
			}
		}
	},

	/**
	* Called during "rendered" phase to [size]{@link module:layout/Arranger~Arranger#size} the controls.
	*
	* @private
	*/
	reflow: function () {
		var cn = this.container.hasNode();
		this.containerBounds = cn ? {width: cn.clientWidth, height: cn.clientHeight} : {};
		this.size();
	},

	/**
	* If the {@link module:layout/Panels~Panels} has an arrangement, flows each control according to that
	* arrangement.
	*
	* @private
	*/
	flowArrangement: function () {
		var a = this.container.arrangement;
		if (a) {
			for (var i=0, c$=this.container.getPanels(), c; (c=c$[i]) && (a[i]); i++) {
				this.flowControl(c, a[i]);
			}
		}
	},
	/**
	* Lays out the given `control` according to the settings stored in the
	* `arrangement` object. By default, `flowControl()` will apply settings for
	* `left`, `top`, and `opacity`. This method should only be implemented to apply
	* other settings made via [arrangeControl()]{@link module:layout/Arranger~Arranger#arrangeControl}.
	*
	* @param {module:enyo/Control~Control} control - The control to be laid out.
	* @param {Object} arrangement - An object whose members specify the layout settings.
	* @protected
	*/
	flowControl: function (control, arrangement) {
		Arranger.positionControl(control, arrangement);
		var o = arrangement.opacity;
		if (o != null) {
			Arranger.opacifyControl(control, o);
		}
	},

	/**
	* Gets an array of controls arranged in state order.
	* note: optimization, dial around a single array.
	*
	* @param  {Number} index     - The index of the active panel.
	* @return {module:enyo/Control~Control[]}   - Ordered array of controls.
	* @private
	*/
	getOrderedControls: function (index) {
		var whole = Math.floor(index);
		var a = whole - this.controlsIndex;
		var sign = a > 0;
		var c$ = this.c$ || [];
		for (var i=0; i<Math.abs(a); i++) {
			if (sign) {
				c$.push(c$.shift());
			} else {
				c$.unshift(c$.pop());
			}
		}
		this.controlsIndex = whole;
		return c$;
	}
});

/**
* Positions a control via transform--`translateX/translateY` if supported,
* falling back to `left/top` if not.
*
* @lends module:layout/Arranger~Arranger
* @param  {module:enyo/Control~Control} control - The control to position.
* @param  {Object} bounds        - The new bounds for `control`.
* @param  {String} unit          - The unit for `bounds` members.
* @public
*/
Arranger.positionControl = function (control, bounds, unit) {
	unit = unit || 'px';
	if (!this.updating) {
		// IE10 uses setBounds because of control hit caching problems seem in some apps
		if (Dom.canTransform() && !control.preventTransform && platform.ie !== 10) {
			var l = bounds.left, t = bounds.top;
			l = utils.isString(l) ? l : l && (l + unit);
			t = utils.isString(t) ? t : t && (t + unit);
			Dom.transform(control, {translateX: l || null, translateY: t || null});
		} else {
			// If a previously positioned control has subsequently been marked with
			// preventTransform, we need to clear out any old translation values.
			if (Dom.canTransform() && control.preventTransform) {
				Dom.transform(control, {translateX: null, translateY: null});
			}
			control.setBounds(bounds, unit);
		}
	}
};

/**
* Sets the opacity value for a given control.
*
* @lends module:layout/Arranger~Arranger
* @param {module:enyo/Control~Control} inControl - The control whose opacity is to be set.
* @param {Number} inOpacity - The new opacity value for the control.
* @public
*/
Arranger.opacifyControl = function (inControl, inOpacity) {
	// FIXME: very high/low settings of opacity can cause a control to
	// blink so cap this here.
	inControl.applyStyle('opacity', inOpacity > 0.99 ? 1 : (inOpacity < 0.01 ? 0 : inOpacity));
};

}],'layout/CardArranger':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/CardArranger~CardArranger} kind.
* @module layout/CardArranger
*/

var
	kind = require('enyo/kind');

var
	Arranger = require('./Arranger');


/**
* {@link module:layout/CardArranger~CardArranger} is a {@link module:layout/Arranger~Arranger}
* that displays only one active control. The non-active controls are hidden with
* `setShowing(false)`. Transitions between arrangements are handled by fading
* from one control to the next.
*
* For more information, see the documentation on
* [Arrangers]{@linkplain $dev-guide/building-apps/layout/arrangers.html} in the
* Enyo Developer Guide.
*
* @class CardArranger
* @extends module:layout/Arranger~Arranger
* @public
*/
module.exports = kind(
	/** @lends module:layout/CardArranger~CardArranger.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.CardArranger',

	/**
	* @private
	*/
	kind: Arranger,

	/**
	* @private
	*/
	layoutClass: 'enyo-arranger enyo-arranger-fit',

	/**
	* @see {@link module:layout/Arranger~Arranger#calcArrangementDifference}
	* @protected
	*/
	calcArrangementDifference: function (i0, a0, i1, a1) {
		return this.containerBounds.width;
	},

	/**
	* Applies opacity to the activation and deactivation of panels. Expects the passed-in
	* array of controls to be ordered such that the first control in the array is the active
	* panel.
	*
	* @see {@link module:layout/Arranger~Arranger#arrange}
	* @protected
	*/
	arrange: function (controls, arrangement) {
		for (var i=0, c, v; (c=controls[i]); i++) {
			v = (i === 0) ? 1 : 0;
			this.arrangeControl(c, {opacity: v});
		}
	},

	/**
	* Shows the active panel at the start of transition. Also triggers a resize on
	* the active panel if it wasn't previously showing.
	*
	* @see {@link module:layout/Arranger~Arranger#start}
	* @method
	* @protected
	*/
	start: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			var c$ = this.container.getPanels();
			for (var i=0, c; (c=c$[i]); i++) {
				var wasShowing=c.showing;
				c.setShowing(i == this.container.fromIndex || i == (this.container.toIndex));
				if (c.showing && !wasShowing) {
					c.resize();
				}
			}
		};
	}),

	/**
	* Hides all non-active panels when the transition completes.
	*
	* @see {@link module:layout/Arranger~Arranger#finish}
	* @method
	* @protected
	*/
	finish: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			var c$ = this.container.getPanels();
			for (var i=0, c; (c=c$[i]); i++) {
				c.setShowing(i == this.container.toIndex);
			}
		};
	}),

	/**
	* Ensures all panels are showing and visible when the arranger is destroyed.
	*
	* @method
	* @private
	*/
	destroy: kind.inherit(function (sup) {
		return function () {
			var c$ = this.container.getPanels();
			for (var i=0, c; (c=c$[i]); i++) {
				Arranger.opacifyControl(c, 1);
				if (!c.showing) {
					c.setShowing(true);
				}
			}
			sup.apply(this, arguments);
		};
	})
});

},{'./Arranger':'layout/Arranger'}],'layout/Panels':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/Panels~Panels} kind.
* @module layout/Panels
*/

var
	kind = require('enyo/kind'),
	dispatcher = require('enyo/dispatcher'),
	dom = require('enyo/dom'),
	platform = require('enyo/platform'),
	utils = require('enyo/utils'),
	Animator = require('enyo/Animator');

var
	CardArranger = require('../CardArranger');

/**
* Fires at the start of a panel transition, when [setIndex()]{@link module:layout/Panels~Panels#setIndex}
* is called, and also during dragging.
*
* @event module:layout/Panels~Panels#onTransitionStart
* @type {Object}
* @property {Number} fromIndex - The index of the old panel.
* @property {Number} toIndex   - The index of the new panel.
* @public
*/

/**
* Fires at the end of a panel transition, when [setIndex()]{@link module:layout/Panels~Panels#setIndex}
* is called, and also during dragging.
*
* @event module:layout/Panels~Panels#onTransitionFinish
* @type {Object}
* @property {Number} fromIndex - The index of the old panel.
* @property {Number} toIndex   - The index of the new panel.
* @public
*/

/**
* The {@link module:layout/Panels~Panels} kind is designed to satisfy a variety of common use cases
* for application layout. Using `Panels`, controls may be arranged as (among
* other things) a carousel, a set of collapsing panels, a card stack that fades
* between panels, or a grid.
*
* Any Enyo control may be placed inside a `Panels`, but by convention we
* refer to each of these controls as a "panel". From the set of panels in a
* `Panels`, one is considered to be active. The active panel is set by index
* using the [setIndex()]{@link module:layout/Panels~Panels#setIndex} method. The actual layout of
* the panels typically changes each time the active panel is set, such that the new
* active panel has the most prominent position.
*
* For more information, see the documentation on
* [Panels]{@linkplain $dev-guide/building-apps/layout/panels.html} in the
* Enyo Developer Guide.
*
* @class Panels
* @extends module:enyo/Control~Control
* @ui
* @public
*/
var Panels = module.exports = kind(
	/** @lends module:layout/Panels~Panels.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.Panels',

	/**
	* @private
	*/
	classes: 'enyo-panels',

	/**
	* @lends module:layout/Panels~Panels.prototype
	* @private
	*/
	published: {
		/**
		* The index of the active panel. The layout of panels is controlled by the
		* [layoutKind]{@link module:layout/Panels~Panels#layoutKind}, but as a rule, the active panel
		* is displayed in the most prominent position. For example, in the (default)
		* {@link module:layout/CardArranger~CardArranger} layout, the active panel is shown and the other
		* panels are hidden.
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		index: 0,

		/**
		* Indicates whether the user may drag between panels.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		draggable: true,

		/**
		* Indicates whether the panels animate when transitioning, e.g., when
		* [setIndex()]{@link module:layout/Panels~Panels#setIndex} is called.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		animate: true,

		/**
		* Indicates whether panels "wrap around" when moving past the end.
		* The actual effect depends upon the arranger in use.
		*
		* @type {Boolean}
		* @default  false
		* @public
		*/
		wrap: false,

		/**
		* The arranger kind to be used for dynamic layout.
		*
		* @type {String}
		* @default  'CardArranger'
		* @public
		*/
		arrangerKind: CardArranger,

		/**
		* By default, each panel will be sized to fit the Panels' width when the
		* screen size is sufficiently narrow (less than 800px). Set to `false` to
		* avoid this behavior.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		narrowFit: true
	},

	/**
	* @private
	*/
	events: {
		onTransitionStart: '',
		onTransitionFinish: ''
	},

	/**
	* @private
	*/
	handlers: {
		ondragstart: 'dragstart',
		ondrag: 'drag',
		ondragfinish: 'dragfinish',
		onscroll: 'domScroll'
	},

	/**
	* @private
	*/
	tools: [
		{kind: Animator, onStep: 'step', onEnd: 'animationEnded'}
	],

	/**
	* Tracks completion percentage for a transition between two panels.
	*
	* @private
	*/
	fraction: 0,

	/**
	* @method
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			this.transitionPoints = [];
			sup.apply(this, arguments);
			this.arrangerKindChanged();
			this.narrowFitChanged();
			this.indexChanged();
		};
	}),

	/**
	* @method
	* @private
	*/
	rendered: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			dispatcher.makeBubble(this, 'scroll');
		};
	}),

	/**
	* @private
	*/
	domScroll: function (sender, event) {
		if (this.hasNode()) {
			if (this.node.scrollLeft > 0) {
				// Reset scrollLeft position
				this.node.scrollLeft = 0;
			}
		}
	},

	/**
	* @method
	* @private
	*/
	initComponents: kind.inherit(function (sup) {
		return function () {
			this.createChrome(this.tools);
			sup.apply(this, arguments);
		};
	}),

	/**
	* @private
	*/
	arrangerKindChanged: function () {
		this.setLayoutKind(this.arrangerKind);
	},

	/**
	* @private
	*/
	narrowFitChanged: function () {
		this.addRemoveClass(Panels.getNarrowClass(), this.narrowFit);
	},

	/**
	* @method
	* @private
	*/
	destroy: kind.inherit(function (sup) {
		return function () {
			// When the entire panels is going away, take note so we don't try and do single-panel
			// remove logic such as changing the index and reflowing when each panel is destroyed
			this.destroying = true;
			sup.apply(this, arguments);
		};
	}),

	/**
	* Adjusts the index if the removed control is the active panel and reflows the layout.
	*
	* @method
	* @private
	*/
	removeControl: kind.inherit(function (sup) {
		return function (control) {
			// Skip extra work during panel destruction.
			if (this.destroying) {
				return sup.apply(this, arguments);
			}
			// adjust index if the current panel is being removed
			// so it's either the previous panel or the first one.
			var newIndex = -1;
			var controlIndex = utils.indexOf(control, this.controls);
			if (controlIndex === this.index) {
				newIndex = Math.max(controlIndex - 1, 0);
			}
			sup.apply(this, arguments);
			if (newIndex !== -1 && this.controls.length > 0) {
				this.setIndex(newIndex);
				this.flow();
				this.reflow();
			}
		};
	}),

	/**
	* Designed to be overridden in kinds derived from Panels that have
	* non-panel client controls.
	*
	* @return {Boolean} [description]
	* @protected
	* @todo  Assume that this should take a control as a parameter.
	*/
	isPanel: function () {
		return true;
	},

	/**
	* @method
	* @private
	*/
	flow: kind.inherit(function (sup) {
		return function () {
			this.arrangements = [];
			sup.apply(this, arguments);
		};
	}),

	/**
	* @method
	* @private
	*/
	reflow: kind.inherit(function (sup) {
		return function () {
			this.arrangements = [];
			sup.apply(this, arguments);
			this.refresh();
		};
	}),

	/**
	* Returns the array of contained panels. Subclasses may override this if they
	* don't want the arranger to lay out all of their children.
	*
	* @return {module:enyo/Control~Control[]} - The array of contained panels.
	*/
	getPanels: function () {
		var p = this.controlParent || this;
		return p.children;
	},

	/**
	* Returns a reference to the active panel--i.e., the panel at the specified index.
	*
	* @return {module:enyo/Control~Control} - The active panel.
	*/
	getActive: function () {
		var p$ = this.getPanels();
		//Constrain the index within the array of panels, needed if wrapping is enabled
		var index = this.index % p$.length;
		if (index < 0) {
			index += p$.length;
		}
		return p$[index];
	},

	/**
	* Returns a reference to the {@link module:enyo/Animator~Animator} instance used to
	* animate panel transitions. The Panels' animator may be used to set the
	* duration of panel transitions, e.g.:
	*
	* ```
	* this.getAnimator().setDuration(1000);
	* ```
	*
	* @return {module:enyo/Animator~Animator} - The {@link module:enyo/Animator~Animator} instance used to animate
	* panel transitions.
	* @public
	*/
	getAnimator: function () {
		return this.$.animator;
	},

	/**
	* Sets the active panel to the panel specified by the given index.
	* Note that if the [animate]{@link module:layout/Panels~Panels#animate} property is set to
	* `true`, the active panel will animate into view.
	*
	* @param {Number} index - The index of the panel to activate.
	* @public
	*/
	setIndex: function (index) {
		// override setIndex so that indexChanged is called
		// whether this.index has actually changed or not. Also, do
		// index clamping here.
		var prevIndex = this.get('index'),
			newIndex = this.clamp(index);
		this.index = newIndex;
		this.notifyObservers('index', prevIndex, newIndex);
	},

	/**
	* Sets the active panel to the panel specified by the given index.
	* The transition to the next panel will be immediate and will not be animated,
	* regardless of the value of the [animate]{@link module:layout/Panels~Panels#animate} property.
	*
	* @param {Number} index - The index of the panel to activate.
	* @public
	*/
	setIndexDirect: function (index) {
		if (this.animate) {
			this.animate = false;
			this.setIndex(index);
			this.animate = true;
		} else {
			this.setIndex(index);
		}
	},

	/**
	* Selects the named component owned by the Panels and returns its index.
	*
	* @param  {String} name - The name of the panel to activate.
	* @return {Number} The index of the newly activated panel.
	* @public
	*/
	selectPanelByName: function (name) {
		if (!name) {
			return;
		}
		var idx = 0;
		var panels = this.getPanels();
		var len = panels.length;
		for (; idx < len; ++idx) {
			if (name === panels[idx].name) {
				this.setIndex(idx);
				return idx;
			}
		}
	},

	/**
	* Transitions to the previous panel--i.e., the panel whose index value is one
	* less than that of the current active panel.
	*
	* @public
	*/
	previous: function () {
		var prevIndex = this.index - 1;
		if (this.wrap && prevIndex < 0) {
			prevIndex = this.getPanels().length - 1;
		}
		this.setIndex(prevIndex);
	},

	/**
	* Transitions to the next panel--i.e., the panel whose index value is one
	* greater than that of the current active panel.
	*
	* @public
	*/
	next: function () {
		var nextIndex = this.index+1;
		if (this.wrap && nextIndex >= this.getPanels().length) {
			nextIndex = 0;
		}
		this.setIndex(nextIndex);
	},

	/**
	* Ensures that `value` references a valid panel, accounting for
	* [wrapping]{@link module:layout/Panels~Panels#wrap}.
	*
	* @param  {Number} value - The index of a panel.
	* @return {Number}       - The valid index of a panel.
	* @private
	*/
	clamp: function (value) {
		var l = this.getPanels().length;
		if (this.wrap) {
			// FIXME: dragging makes assumptions about direction and from->start indexes.
			//return value < 0 ? l : (value > l ? 0 : value);
			value %= l;
			return (value < 0) ? value + l : value;
		} else {
			return Math.max(0, Math.min(value, l - 1));
		}
	},

	/**
	* @private
	*/
	indexChanged: function (old) {
		this.lastIndex = old;
		if (!this.dragging && this.$.animator && this.hasNode()) {
			if (this.shouldAnimate()) {
				// If we're mid-transition, complete it and indicate we need to transition
				if (this.$.animator.isAnimating()) {
					this.transitionOnComplete = true;
					this.$.animator.complete();
				} else {
					this.animateTransition();
				}
			} else {
				this.directTransition();
			}
		}
	},

	/**
	* Returns `true` if the panels should animate in the transition from `fromIndex` to
	* `toIndex`. This can be overridden in a {@glossary subkind} for greater customization.
	*
	* @protected
	*/
	shouldAnimate: function () {
		return this.animate;
	},

	/**
	* @private
	*/
	step: function (sender) {
		this.fraction = sender.value;
		this.stepTransition();
		return true;
	},

	/**
	* @private
	*/
	animationEnded: function (sender, event) {
		this.completed();
		return true;
	},

	/**
	* @private
	*/
	completed: function () {
		this.finishTransition();

		// Animator.onEnd fires asynchronously so we need an internal flag to indicate we need
		// to start the next transition when the previous completes
		if (this.transitionOnComplete) {
			this.transitionOnComplete = false;
			this.animateTransition();
		}

		return true;
	},

	/**
	* @private
	*/
	dragstart: function (sender, event) {
		if (this.draggable && this.layout && this.layout.canDragEvent(event)) {
			event.preventDefault();
			this.dragstartTransition(event);
			this.dragging = true;
			this.$.animator.stop();
			return true;
		}
	},

	/**
	* @private
	*/
	drag: function (sender, event) {
		if (this.dragging) {
			event.preventDefault();
			this.dragTransition(event);
			return true;
		}
	},

	/**
	* @private
	*/
	dragfinish: function (sender, event) {
		if (this.dragging) {
			this.dragging = false;
			event.preventTap();
			this.dragfinishTransition(event);
			return true;
		}
	},

	/**
	* @private
	*/
	dragstartTransition: function (event) {
		if (!this.$.animator.isAnimating()) {
			var f = this.fromIndex = this.index;
			this.toIndex = f - (this.layout ? this.layout.calcDragDirection(event) : 0);
		} else {
			this.verifyDragTransition(event);
		}
		this.fromIndex = this.clamp(this.fromIndex);
		this.toIndex = this.clamp(this.toIndex);
		//this.log(this.fromIndex, this.toIndex);
		this.fireTransitionStart();
		if (this.layout) {
			this.layout.start();
		}
	},

	/**
	* @private
	*/
	dragTransition: function (event) {
		// note: for simplicity we choose to calculate the distance directly between
		// the first and last transition point.
		var d = this.layout ? this.layout.calcDrag(event) : 0;
		var t$ = this.transitionPoints, s = t$[0], f = t$[t$.length-1];
		var as = this.fetchArrangement(s);
		var af = this.fetchArrangement(f);
		var dx = this.layout ? this.layout.drag(d, s, as, f, af) : 0;
		var dragFail = d && !dx;
		if (dragFail) {
			//this.log(dx, s, as, f, af);
		}
		this.fraction += dx;
		var fr = this.fraction;
		if (fr > 1 || fr < 0 || dragFail) {
			if (fr > 0 || dragFail) {
				this.dragfinishTransition(event);
			}
			this.dragstartTransition(event);
			this.fraction = 0;
			// FIXME: account for lost fraction
			//this.dragTransition(event);
		}
		this.stepTransition();
	},

	/**
	* @private
	*/
	dragfinishTransition: function (event) {
		this.verifyDragTransition(event);
		this.setIndex(this.toIndex);
		// note: if we're still dragging, then we're at a transition boundary
		// and should fire the finish event
		if (this.dragging) {
			this.fireTransitionFinish();
		}
	},

	/**
	* @private
	*/
	verifyDragTransition: function (event) {
		var d = this.layout ? this.layout.calcDragDirection(event) : 0;
		var f = Math.min(this.fromIndex, this.toIndex);
		var t = Math.max(this.fromIndex, this.toIndex);
		if (d > 0) {
			var s = f;
			f = t;
			t = s;
		}
		if (f != this.fromIndex) {
			this.fraction = 1 - this.fraction;
		}
		//this.log('old', this.fromIndex, this.toIndex, 'new', f, t);
		this.fromIndex = f;
		this.toIndex = t;
	},

	/**
	* Resets the panels without sending any events.
	*
	* @private
	*/
	refresh: function () {
		if (this.$.animator && this.$.animator.isAnimating()) {
			this.$.animator.stop();
		}
		this.setupTransition();
		this.fraction = 1;
		this.stepTransition();
		this.transitioning = false;
		this.completeTransition();
		this.dragging = false;
	},

	/**
	* Transitions to the new index without animation
	*
	* @private
	*/
	directTransition: function () {
		this.startTransition();
		this.fraction = 1;
		this.stepTransition();
		this.finishTransition();
	},

	/**
	* Animates the transition to the new index
	*
	* @private
	*/
	animateTransition: function () {
		this.startTransition();
		this.$.animator.play({
			startValue: this.fraction
		});
	},

	/**
	* Starts the transition between two panels. if a transition is already in progress, this is
	* a no-op.
	*
	* @private
	*/
	startTransition: function () {
		if (!this.transitioning) {
			this.transitioning = true;
			this.setupTransition();
			this.fireTransitionStart();
		}
	},

	/**
	* Sets up transition state
	*
	* @private
	*/
	setupTransition: function () {
		this.fromIndex = this.fromIndex != null ? this.fromIndex : this.lastIndex || 0;
		this.toIndex = this.toIndex != null ? this.toIndex : this.index;
		if (this.layout) {
			this.layout.start();
		}
	},

	/**
	* Completes the transition between two panels.
	*
	* @private
	*/
	finishTransition: function () {
		this.transitioning = false;
		this.completeTransition(true);
	},

	/**
	* Completes the transition by performing any tasks to be run when the transition ends,
	* including firing events and clean-up.
	*
	* @param {Boolean} [fire] - If `true`, will fire the {@link module:layout/Panels~Panels#onTransitionFinish}
	*	event if deemed necessary.
	* @private
	*/
	completeTransition: function (fire) {
		if (this.layout) {
			this.layout.finish();
		}

		if (fire) {
			this.fireTransitionFinish(true);
		} else {
			this.clearTransitionData();
		}
	},

	/**
	* Clears transition-related data.
	*
	* @private
	*/
	clearTransitionData: function() {
		this.transitionPoints = [];
		this.fraction = 0;
		this.fromIndex = this.toIndex = null;
	},

	/**
	* @fires module:layout/Panels~Panels#onTransitionStart
	* @private
	*/
	fireTransitionStart: function () {
		var t = this.startTransitionInfo;
		if (this.hasNode() && (!t || (t.fromIndex != this.fromIndex || t.toIndex != this.toIndex))) {
			this.startTransitionInfo = {fromIndex: this.fromIndex, toIndex: this.toIndex};
			this.doTransitionStart(utils.clone(this.startTransitionInfo));
		}
	},

	/**
	* @fires module:layout/Panels~Panels#onTransitionFinish
	* @param {Boolean} [clearData] - If `true`, {@link module:layout/Panels~Panels#clearTransitionData} will be
	*	called after recording the values needed for the callback.
	* @private
	*/
	fireTransitionFinish: function (clearData) {
		var t = this.finishTransitionInfo,
			fromIndex = t ? t.fromIndex : null,
			toIndex = t ? t.toIndex : null;
		if (this.hasNode() && (!t || (fromIndex != this.fromIndex || toIndex != this.toIndex))) {
				if (this.transitionOnComplete) {
				this.finishTransitionInfo = {fromIndex: toIndex, toIndex: this.lastIndex};
				} else {
					this.finishTransitionInfo = {fromIndex: this.lastIndex, toIndex: this.index};
				}
			if (clearData) {
				this.clearTransitionData();
			}
				this.doTransitionFinish(utils.clone(this.finishTransitionInfo));
		} else if (clearData) {
			this.clearTransitionData();
		}
	},

	/**
	* Interpolates between arrangements as needed.
	*
	* @private
	*/
	stepTransition: function () {
		if (this.hasNode()) {
			// select correct transition points and normalize fraction.
			var t$ = this.transitionPoints;
			var r = (this.fraction || 0) * (t$.length-1);
			var i = Math.floor(r);
			r = r - i;
			var s = t$[i], f = t$[i+1];
			// get arrangements and lerp between them
			var s0 = this.fetchArrangement(s);
			var s1 = this.fetchArrangement(f);
			this.arrangement = s0 && s1 ? Panels.lerp(s0, s1, r) : (s0 || s1);
			if (this.arrangement && this.layout) {
				this.layout.flowArrangement();
			}
		}
	},

	/**
	* Fetches the arrangement at a specified index, initializing it if necessary.
	*
	* @param  {Number} index - The index of the desired arrangement from `transitionPoints`.
	* @return {Object} The desired arrangement object.
	* @private
	*/
	fetchArrangement: function (index) {
		if ((index != null) && !this.arrangements[index] && this.layout) {
			this.layout._arrange(index);
			this.arrangements[index] = this.readArrangement(this.getPanels());
		}
		return this.arrangements[index];
	},

	/**
	* Iterates over `panels` and retrieves a copy of each panel's `_arranger`.
	*
	* @param  {module:enyo/Control~Control[]} panels - The array of panels.
	* @return {Object[]}              - The array of arrangement objects.
	*/
	readArrangement: function (panels) {
		var r = [];
		for (var i=0, c$=panels, c; (c=c$[i]); i++) {
			r.push(utils.clone(c._arranger));
		}
		return r;
	},

	/**
	* @lends module:layout/Panels~Panels
	* @private
	*/
	statics: {
		/**
		* Returns `true` for iOS and Android phone form factors, or when window width
		* is 800px or less. Approximates work done using media queries in `Panels.css`.
		*
		* @return {Boolean} `true` for narrow devices or viewports; otherwise, `false`.
		* @public
		*/
		isScreenNarrow: function () {
			if(Panels.isNarrowDevice()) {
				return true;
			} else {
				return dom.getWindowWidth() <= 800;
			}
		},

		/**
		* Returns the class name to apply for narrow fitting. See media queries
		* in `Panels.css`.
		*
		* @return {String} The CSS class name to apply.
		*/
		getNarrowClass: function () {
			if(Panels.isNarrowDevice()) {
				return 'enyo-panels-force-narrow';
			} else {
				return 'enyo-panels-fit-narrow';
			}
		},

		/**
		* Lerps between arrangements.
		*
		* @param  {Object[]} a0     - Array of current arrangement objects.
		* @param  {Object[]} a1     - Array of target arrangement object.
		* @param  {Number} fraction - The fraction (between 0 and 1) with which to lerp.
		* @return {Object[]}        - Array of arrangements that is `fraction` between
		* 	`a0` and `a1`.
		* @private
		*/
		lerp: function (a0, a1, fraction) {
			var r = [];
			for (var i=0, k$=utils.keys(a0), k; (k=k$[i]); i++) {
				r.push(this.lerpObject(a0[k], a1[k], fraction));
			}
			return r;
		},

		/**
		* Lerps between the values of arrangement objects.
		*
		* @param  {Object} a0       - The source arragement.
		* @param  {Object} a1       - The destination arragement.
		* @param  {Number} fraction - The fraction (between 0 and 1) with which to lerp.
		*
		* @return {Object}          - The lerped arrangement.
		* @private
		*/
		lerpObject: function (a0, a1, fraction) {
			var b = utils.clone(a0), n, o;
			// a1 might be undefined when deleting panels
			if (a1) {
				for (var i in a0) {
					n = a0[i];
					o = a1[i];
					if (n != o) {
						b[i] = n - (n - o) * fraction;
					}
				}
			}
			return b;
		},

		/**
		* Tests User Agent strings to identify narrow devices.
		*
		* @return {Boolean} `true` if the current device is a narrow device;
		* otherwise, `false`.
		*/
		isNarrowDevice: function () {
			var ua = navigator.userAgent;
			switch (platform.platformName) {
				case 'ios':
					return (/iP(?:hone|od;(?: U;)? CPU) OS (\d+)/).test(ua);
				case 'android':
					return (/Mobile/).test(ua) && (platform.android > 2);
				case 'androidChrome':
					return (/Mobile/).test(ua);
			}
			return false;
		}
	}
});

},{'../CardArranger':'layout/CardArranger'}],'layout/FittableLayout':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/FittableLayout~FittableLayout}, {@link module:layout/FittableLayout~FittableColumnsLayout}
* and {@link module:layout/FittableLayout~FittableRowsLayout} kinds.
* @module layout/FittableLayout
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	Control = require('enyo/Control'),
	Layout = require('enyo/Layout');

var detector = document.createElement('div'),
	flexAvailable =
		(detector.style.flexBasis !== undefined) ||
		(detector.style.webkitFlexBasis !== undefined) ||
		(detector.style.mozFlexBasis !== undefined) ||
		(detector.style.msFlexBasis !== undefined);

/**
* {@link module:layout/FittableLayout~FittableLayout} provides the base
* positioning and boundary logic for the fittable layout strategy. The fittable
* layout strategy is based on laying out items in either a set of rows or a set
* of columns, with most of the items having natural size, but one item expanding
* to fill the remaining space. The item that expands is labeled with the
* attribute `fit: true`.
*
* The subkinds {@link module:layout/FittableLayout~FittableColumnsLayout} and
* {@link module:layout/FittableLayout~FittableRowsLayout} (or _their_ subkinds)
* are used for layout rather than `FittableLayout` because they specify
* properties that the framework expects to be available when laying items out.
*
* When available on the platform, you can opt-in to have `FittableLayout` use
* CSS flexible box (flexbox) to implement fitting behavior on the platform for
* better performance; Enyo will fall back to JavaScript-based layout on older
* platforms. Three subtle differences between the flexbox and JavaScript
* implementations should be noted:

* - When using flexbox, vertical margins (i.e., `margin-top`, `margin-bottom`) will
* not collapse; when using JavaScript layout, vertical margins will collapse according
* to static layout rules.
*
* - When using flexbox, non-fitting children of the Fittable must not be sized
* using percentages of the container (even if set to `position: relative`);
* this is explicitly not supported by the flexbox 2013 spec.
*
* - The flexbox-based Fittable implementation will respect multiple children
* with `fit: true` (the fitting space will be divided equally between them).
* This is NOT supported by the JavaScript implementation, and you should not rely
* upon this behavior if you are deploying to platforms without flexbox support.
*
* The flexbox implementation was added to Enyo 2.5.0 as an optional performance
* optimization; to use the optimization, set `useFlex: true` on the Fittable
* container.  This will cause flexbox to be used when possible.
*
* @class FittableLayout
* @extends module:enyo/Layout~Layout
* @public
*/
var FittableLayout = module.exports = kind(/** @lends module:layout/FittableLayout~FittableLayout.prototype */{
	name: 'enyo.FittableLayout',

	/**
	* @private
	*/
	kind: Layout,

	/**
	* @private
	*/
	noDefer: true,

	/**
	* @method
	* @private
	*/
	constructor: function () {
		Layout.prototype._constructor.apply(this, arguments);

		// Add the force-ltr class if we're in RTL mode, but this control is set explicitly to NOT be in RTL mode.
		this.container.addRemoveClass('force-left-to-right', (Control.prototype.rtl && !this.container.get('rtl')) );

		// Flexbox optimization is determined by global flexAvailable and per-instance opt-in useFlex flag
		this.useFlex = flexAvailable && (this.container.useFlex === true);
		if (this.useFlex) {
			this.container.addClass(this.flexLayoutClass);
		} else {
			this.container.addClass(this.fitLayoutClass);
		}
	},

	/**
	* @private
	*/
	calcFitIndex: function () {
		var aChildren = this.container.children,
			oChild,
			n;

		for (n=0; n<aChildren.length; n++) {
			oChild = aChildren[n];
			if (oChild.fit && oChild.showing) {
				return n;
			}
		}
	},

	/**
	* @private
	*/
	getFitControl: function () {
		var aChildren = this.container.children,
			oFitChild = aChildren[this.fitIndex];

		if (!(oFitChild && oFitChild.fit && oFitChild.showing)) {
			this.fitIndex = this.calcFitIndex();
			oFitChild = aChildren[this.fitIndex];
		}
		return oFitChild;
	},

	/**
	* @private
	*/
	shouldReverse: function () {
		return this.container.rtl && this.orient === 'h';
	},
	
	/**
	* @private
	*/
	destroy: function () {
		Layout.prototype.destroy.apply(this, arguments);
		
		if (this.container) {
			this.container.removeClass(this.useFlex ? this.flexLayoutClass : this.fitLayoutClass);
		}
	},

	/**
	* @private
	*/
	getFirstChild: function() {
		var aChildren = this.getShowingChildren();

		if (this.shouldReverse()) {
			return aChildren[aChildren.length - 1];
		} else {
			return aChildren[0];
		}
	},

	/**
	* @private
	*/
	getLastChild: function() {
		var aChildren = this.getShowingChildren();

		if (this.shouldReverse()) {
			return aChildren[0];
		} else {
			return aChildren[aChildren.length - 1];
		}
	},

	/**
	* @private
	*/
	getShowingChildren: function() {
		var a = [],
			n = 0,
			aChildren = this.container.children,
			nLength   = aChildren.length;

		for (;n<nLength; n++) {
			if (aChildren[n].showing) {
				a.push(aChildren[n]);
			}
		}

		return a;
	},

	/**
	* @private
	*/
	_reflow: function(sMeasureName, sClienMeasure, sAttrBefore, sAttrAfter) {
		this.container.addRemoveClass('enyo-stretch', !this.container.noStretch);
		
		var oFitChild       = this.getFitControl(),
			oContainerNode  = this.container.hasNode(),  // Container node
			nTotalSize     = 0,                          // Total container width or height without padding
			nBeforeOffset   = 0,                         // Offset before fit child
			nAfterOffset    = 0,                         // Offset after fit child
			oPadding,                                    // Object containing t,b,r,l paddings
			oBounds,                                     // Bounds object of fit control
			oLastChild,
			oFirstChild,
			nFitSize;

		if (!oFitChild || !oContainerNode) { return true; }

		oPadding   = dom.calcPaddingExtents(oContainerNode);
		oBounds    = oFitChild.getBounds();
		nTotalSize = oContainerNode[sClienMeasure] - (oPadding[sAttrBefore] + oPadding[sAttrAfter]);

		// If total size is zero, there's nothing for us to do (and the Control
		// we're doing layout for is probably hidden). In this case, we
		// short-circuit and return `true` to signify that we want to reflow
		// again the next time the Control is shown.
		if (nTotalSize === 0) {
			return true;
		}

		if (this.shouldReverse()) {
			oFirstChild  = this.getFirstChild();
			nAfterOffset = nTotalSize - (oBounds[sAttrBefore] + oBounds[sMeasureName]);

			var nMarginBeforeFirstChild = dom.getComputedBoxValue(oFirstChild.hasNode(), 'margin', sAttrBefore) || 0;

			if (oFirstChild == oFitChild) {
				nBeforeOffset = nMarginBeforeFirstChild;
			} else {
				var oFirstChildBounds      = oFirstChild.getBounds(),
					nSpaceBeforeFirstChild = oFirstChildBounds[sAttrBefore] - (oPadding[sAttrBefore] || 0);

				nBeforeOffset = oBounds[sAttrBefore] + nMarginBeforeFirstChild - nSpaceBeforeFirstChild;
			}
		} else {
			oLastChild    = this.getLastChild();
			nBeforeOffset = oBounds[sAttrBefore] - (oPadding[sAttrBefore] || 0);

			var nMarginAfterLastChild = dom.getComputedBoxValue(oLastChild.hasNode(), 'margin', sAttrAfter) || 0;

			if (oLastChild == oFitChild) {
				nAfterOffset = nMarginAfterLastChild;
			} else {
				var oLastChildBounds = oLastChild.getBounds(),
					nFitChildEnd     = oBounds[sAttrBefore] + oBounds[sMeasureName],
					nLastChildEnd    = oLastChildBounds[sAttrBefore] + oLastChildBounds[sMeasureName] +  nMarginAfterLastChild;

				nAfterOffset = nLastChildEnd - nFitChildEnd;
			}
		}

		nFitSize = nTotalSize - (nBeforeOffset + nAfterOffset);
		oFitChild.applyStyle(sMeasureName, nFitSize + 'px');
	},

	/**
	* Assigns any static layout properties not dependent on changes to the
	* rendered component or container sizes, etc.
	* 
	* @public
	*/
	flow: function() {
		if (this.useFlex) {
			var i,
				children = this.container.children,
				child;
			this.container.addClass(this.flexLayoutClass);
			this.container.addRemoveClass('nostretch', this.container.noStretch);
			for (i=0; i<children.length; i++) {
				child = children[i];
				child.addClass('enyo-flex-item');
				child.addRemoveClass('flex', child.fit);
			}
		}
	},

	/**
	* Updates the layout to reflect any changes made to the layout container or
	* the contained components.
	*
	* @public
	*/
	reflow: function() {
		if (!this.useFlex) {
			if (this.orient == 'h') {
				return this._reflow('width', 'clientWidth', 'left', 'right');
			} else {
				return this._reflow('height', 'clientHeight', 'top', 'bottom');
			}
		}
	},

	/**
	* @private
	* @lends module:layout/FittableLayout~FittableLayout.prototype
	*/
	statics: {
		/**
		* Indicates whether flexbox optimization can be used.
		*
		* @type {Boolean}
		* @default  false
		* @private
		*/
		flexAvailable: flexAvailable
	}
});

/**
* {@link module:layout/FittableLayout~FittableColumnsLayout} provides a
* container in which items are laid out in a set of vertical columns, with most
* of the items having natural size, but one expanding to fill the remaining
* space. The one that expands is labeled with the attribute `fit: true`.
*
* `FittableColumnsLayout` is meant to be used as a value for the `layoutKind`
* property of other kinds. `layoutKind` provides a way to add layout behavior in
* a pluggable fashion while retaining the ability to use a specific base kind.
*
* For more information, see the documentation on
* [Fittables]{@linkplain $dev-guide/building-apps/layout/fittables.html} in the
* Enyo Developer Guide.
*
* @class FittableColumnsLayout
* @extends module:layout/FittableLayout~FittableLayout
* @public
*/

/**
* The declaration for {@link module:layout/FittableLayout~FittableColumnsLayout}
*/
module.exports.Columns = kind(/** @lends module:layout/FittableLayout~FittableColumnsLayout.prototype */{
	name        : 'enyo.FittableColumnsLayout',
	kind        : FittableLayout,
	orient      : 'h',
	fitLayoutClass : 'enyo-fittable-columns-layout',
	flexLayoutClass: 'enyo-flex-container columns'
});


/**
* {@link module:layout/FittableLayout~FittableRowsLayout} provides a container
* in which items are laid out in a set of horizontal rows, with most of the
* items having natural size, but one expanding to fill the remaining space. The
* one that expands is labeled with the attribute `fit: true`.
*
* `FittableRowsLayout` is meant to be used as a value for the `layoutKind`
* property of other kinds. `layoutKind` provides a way to add layout behavior in
* a pluggable fashion while retaining the ability to use a specific base kind.
*
* For more information, see the documentation on
* [Fittables]{@linkplain $dev-guide/building-apps/layout/fittables.html} in the
* Enyo Developer Guide.
*
* @class FittableRowsLayout
* @extends module:layout/FittableLayout~FittableLayout
* @public
*/

/**
* The declaration for {@link module:layout/FittableLayout~FittableRowsLayout}
*/
module.exports.Rows = kind(
	/** @lends module:layout/FittableLayout~FittableRowsLayout.prototype */ {

	/**
	* @private
	*/
	name        : 'enyo.FittableRowsLayout',

	/**
	* @private
	*/
	kind        : FittableLayout,

	/**
	* Layout CSS class used to fit rows.
	*
	* @type {String}
	* @default 'enyo-fittable-rows-layout'
	* @public
	*/
	fitLayoutClass : 'enyo-fittable-rows-layout',

	/**
	* The orientation of the layout.
	*
	* @type {String}
	* @default 'v'
	* @public
	*/
	orient      : 'v',

	/**
	* @private
	*/
	flexLayoutClass: 'enyo-flex-container rows'
});

}],'layout/FlyweightRepeater':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/FlyweightRepeater~FlyweightRepeater} kind.
* @module layout/FlyweightRepeater
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	utils = require('enyo/utils'),
	Control = require('enyo/Control'),
	HTMLStringDelegate = require('enyo/HTMLStringDelegate'),
	Selection = require('enyo/Selection');

var FlyweightRepeaterDelegate = Object.create(HTMLStringDelegate);

FlyweightRepeaterDelegate.generateInnerHtml = function (control) {
	var h = '';
	control.index = null;
	// note: can supply a rowOffset
	// and indicate if rows should be rendered top down or bottomUp
	for (var i=0, r=0; i<control.count; i++) {
		r = control.rowOffset + (this.bottomUp ? control.count - i-1 : i);
		control.setupItem(r);
		control.$.client.setAttribute('data-enyo-index', r);
		if (control.orient == 'h') {
			control.$.client.setStyle('display:inline-block;');
		}
		h += HTMLStringDelegate.generateChildHtml(control);
		control.$.client.teardownRender();
	}
	return h;
};

/**
* Fires once per row at render time.
*
* @event module:layout/FlyweightRepeater~FlyweightRepeater#onSetupItem
* @type {Object}
* @property {Number} index     - The index of the row being rendered.
* @property {Boolean} selected - `true` if the row is selected; otherwise, `false`.
* @public
*/

/**
* Fires after an individual row has been rendered.
*
* @event module:layout/FlyweightRepeater~FlyweightRepeater#onRenderRow
* @type {Object}
* @property {Number} rowIndex - The index of the row that was rendered.
* @public
*/

/**
* {@link module:layout/FlyweightRepeater~FlyweightRepeater} is a control that displays a repeating list of
* rows, suitable for displaying medium-sized lists (up to ~100 items). A
* flyweight strategy is employed to render one set of row controls, as needed,
* for as many rows as are contained in the repeater.
*
* The FlyweightRepeater's `components` block contains the controls to be used
* for a single row. This set of controls will be rendered for each row. You
* may customize row rendering by handling the
* [onSetupItem]{@link module:layout/FlyweightRepeater~FlyweightRepeater#onSetupItem} event.
*
* The controls inside a FlyweightRepeater are non-interactive. This means that
* calling methods that would normally cause rendering to occur (e.g.,
* `set('content', <value>)`) will not do so. However, you may force a row to
* render by calling [renderRow()]{@link module:layout/FlyweightRepeater~FlyweightRepeater#renderRow}.
*
* In addition, you may force a row to be temporarily interactive by calling
* [prepareRow()]{@link module:layout/FlyweightRepeater~FlyweightRepeater#prepareRow}. Call
* [lockRow()]{@link module:layout/FlyweightRepeater~FlyweightRepeater#lockRow} when the interaction
* is complete.
*
* For more information, see the documentation on
* [Lists]{@linkplain $dev-guide/building-apps/layout/lists.html} in the
* Enyo Developer Guide.
*
* @class FlyweightRepeater
* @extends module:enyo/Control~Control
* @ui
* @public
*/
var FlyweightRepeater = module.exports = kind(
	/** @lends module:layout/FlyweightRepeater~FlyweightRepeater.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.FlyweightRepeater',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @lends module:layout/FlyweightRepeater~FlyweightRepeater.prototype
	* @private
	*/
	published: {
		/**
		 * The number of rows to render.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		count: 0,

		/**
		* If `true`, the selection mechanism is disabled. Tap events are still
		* sent, but items won't be automatically re-rendered when tapped.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		noSelect: false,

		/**
		 * If `true`, multiple selection is allowed.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		multiSelect: false,

		/**
		 * If `true`, the selected item will toggle.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		toggleSelected: false,

		/**
		* Used to specify CSS classes for the repeater's wrapper component (client).
		* Input is identical to that of {@link module:enyo/Control~Control#setClasses}.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		clientClasses: '',

		/**
		* Used to specify custom styling for the repeater's wrapper component
		* (client). Input is identical to that of {@link module:enyo/Control~Control#setStyle}.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		clientStyle: '',

		/**
		* Numerical offset applied to row number during row generation. Allows items
		* to have natural indices instead of `0`-based ones. This value must be
		* positive, as row number `-1` is used to represent undefined rows in the
		* event system.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		rowOffset: 0,

		/**
		* Direction in which items will be laid out. Valid values are `'v'` for
		* vertical or `'h'` for horizontal.
		*
		* @type {String}
		* @default 'h'
		* @public
		*/
		orient: 'v'
	},

	/**
	* @private
	*/
	events: {
		onSetupItem: '',
		onRenderRow: ''
	},

	/**
	* Setting cachePoint: true ensures that events from the repeater's subtree will
	* always bubble up through the repeater, allowing the events to be decorated with repeater-
	* related metadata and references.
	*
	* @type {Boolean}
	* @default true
	* @private
	*/
	cachePoint: true,

	/**
	* Design-time attribute indicating whether row indices run
	* from `0` to [`count`]{@link module:layout/FlyweightRepeater~FlyweightRepeater#count}`-1` `(false)` or
	* from [`count`]{@link module:layout/FlyweightRepeater~FlyweightRepeater#count}`-1` to `0` `(true)`.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	bottomUp: false,

	/**
	* @private
	*/
	renderDelegate: FlyweightRepeaterDelegate,

	/**
	* @private
	*/
	components: [
		{kind: Selection, onSelect: 'selectDeselect', onDeselect: 'selectDeselect'},
		{name: 'client'}
	],

	/**
	* @method
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.noSelectChanged();
		this.multiSelectChanged();
		this.clientClassesChanged();
		this.clientStyleChanged();
	},

	/**
	* @private
	*/
	noSelectChanged: function () {
		if (this.noSelect) {
			this.$.selection.clear();
		}
	},

	/**
	* @private
	*/
	multiSelectChanged: function () {
		this.$.selection.setMulti(this.multiSelect);
	},

	/**
	* @private
	*/
	clientClassesChanged: function () {
		this.$.client.setClasses(this.clientClasses);
	},

	/**
	* @private
	*/
	clientStyleChanged: function () {
		this.$.client.setStyle(this.clientStyle);
	},

	/**
	* @fires module:layout/FlyweightRepeater~FlyweightRepeater#onSetupItem
	* @private
	*/
	setupItem: function (index) {
		this.doSetupItem({index: index, selected: this.isSelected(index)});
	},

	/**
	* Renders the list.
	*
	* @private
	*/
	generateChildHtml: function () {
		return this.renderDelegate.generateInnerHtml(this);
	},

	/**
	* @todo add link to preview.js
	* @private
	*/
	previewDomEvent: function (event) {
		var i = this.index = this.rowForEvent(event);
		event.rowIndex = event.index = i;
		event.flyweight = this;
	},

	/**
	* @method
	* @private
	*/
	decorateEvent: function (eventName, event, sender) {
		// decorate event with index found via dom iff event does not already contain an index.
		var i = (event && event.index != null) ? event.index : this.index;
		if (event && i != null) {
			event.index = i;
			event.flyweight = this;
		}
		Control.prototype.decorateEvent.apply(this, arguments);
	},

	/**
	* @private
	*/
	tap: function (sender, event) {
		// ignore taps if selecting is disabled or if they don't target a row
		if (this.noSelect || event.index === -1) {
			return;
		}
		if (this.toggleSelected) {
			this.$.selection.toggle(event.index);
		} else {
			this.$.selection.select(event.index);
		}
	},

	/**
	* Handler for selection and deselection.
	*
	* @private
	*/
	selectDeselect: function (sender, event) {
		this.renderRow(event.key);
	},

	/**
	* Returns the repeater's [selection]{@link module:enyo/Selection~Selection} component.
	*
	* @return {module:enyo/Selection~Selection} The repeater's selection component.
	* @public
	*/
	getSelection: function () {
		return this.$.selection;
	},

	/**
	* Gets the selection state for the given row index.
	*
	* @return {Boolean} `true` if the row is currently selected; otherwise, `false`.
	* @public
	*/
	isSelected: function (index) {
		return this.getSelection().isSelected(index);
	},

	/**
	* Renders the row with the specified index.
	*
	* @param {Number} index - The index of the row to render.
	* @fires module:layout/FlyweightRepeater~FlyweightRepeater#onRenderRow
	* @public
	*/
	renderRow: function (index) {
		// do nothing if index is out-of-range
		if (index < this.rowOffset || index >= this.count + this.rowOffset) {
			return;
		}
		//this.index = null;
		// always call the setupItem callback, as we may rely on the post-render state
		this.setupItem(index);
		var node = this.fetchRowNode(index);
		if (node) {
			// hack to keep this working...
			var delegate = HTMLStringDelegate;

			dom.setInnerHtml(node, delegate.generateChildHtml(this.$.client));
			this.$.client.teardownChildren();
			this.doRenderRow({rowIndex: index});
		}
	},

	/**
	* Fetches the DOM node for the given row index.
	*
	* @param {Number} index - The index of the row whose DOM node is to be fetched.
	* @return {Node} The DOM node for the specified row.
	* @public
	*/
	fetchRowNode: function (index) {
		if (this.hasNode()) {
			return this.node.querySelector('[data-enyo-index="' + index + '"]');
		}
	},

	/**
	* Fetches the row number corresponding to the target of a given event.
	*
	* @param {Object} event - Event object.
	* @return {Number} The index of the row corresponding to the event's target.
	* @public
	*/
	rowForEvent: function (event) {
		if (!this.hasNode()) {
			return -1;
		}
		var n = event.target;
		while (n && n !== this.node) {
			var i = n.getAttribute && n.getAttribute('data-enyo-index');
			if (i !== null) {
				return Number(i);
			}
			n = n.parentNode;
		}
		return -1;
	},

	/**
	* Prepares the specified row such that changes made to the controls inside
	* the repeater will be rendered for the row.
	*
	* @param {Number} index - The index of the row to be prepared.
	* @public
	*/
	prepareRow: function (index) {
		// do nothing if index is out-of-range
		if (index < this.rowOffset || index >= this.count + this.rowOffset) {
			return;
		}
		// update row internals to match model
		this.setupItem(index);
		var n = this.fetchRowNode(index);
		FlyweightRepeater.claimNode(this.$.client, n);
	},

	/**
	* Prevents rendering of changes made to controls inside the repeater.
	*
	* @public
	*/
	lockRow: function () {
		this.$.client.teardownChildren();
	},

	/**
	* Prepares the specified row such that changes made to the controls in the
	* repeater will be rendered in the row; then performs the function `func`
	* and, finally, locks the row.
	*
	* @param {Number} index   - The index of the row to be acted upon.
	* @param {Function} func  - The function to perform.
	* @param {Object} context - The context to which `func` is bound.
	* @private
	*/
	performOnRow: function (index, func, context) {
		// do nothing if index is out-of-range
		if (index < this.rowOffset || index >= this.count + this.rowOffset) {
			return;
		}
		if (func) {
			this.prepareRow(index);
			utils.call(context || null, func);
			this.lockRow();
		}
	},

	/**
	* @lends module:layout/FlyweightRepeater~FlyweightRepeater
	* @private
	*/
	statics: {
		/**
		* Associates a flyweight rendered control (`control`) with a
		* rendering context specified by `node`.
		*
		* @param {module:enyo/Control~Control} control - A flyweight-rendered control.
		* @param {Node} node - The DOM node to be associated with `control`.
		* @public
		*/
		claimNode: function (control, node) {
			var n;
			if (node) {
				if (node.id !== control.id) {
					n = node.querySelector('#' + control.id);
				} else {
					// node is already the right node, so just use it
					n = node;
				}
			}
			// FIXME: consider controls generated if we found a node or tag: null, the later so can teardown render
			control.generated = Boolean(n || !control.tag);
			control.node = n;
			if (control.node) {
				control.rendered();
			} else {
				//enyo.log('Failed to find node for',  control.id, control.generated);
			}
			// update control's class cache based on the node contents
			for (var i=0, c$=control.children, c; (c=c$[i]); i++) {
				this.claimNode(c, node);
			}
		}
	}
});

}],'layout/FittableRows':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/FittableRows~FittableRows} kind.
* @module layout/FittableRows
*/

var
	kind = require('enyo/kind')	;

var
	FittableLayout = require('./FittableLayout'),
	FittableRowsLayout = FittableLayout.Rows;

/**
* {@link module:layout/FittableRows~FittableRows} provides a container in which items are laid out in a
* set	of horizontal rows, with most of the items having natural size, but one
* expanding to fill the remaining space. The one that expands is labeled with
* the attribute `fit: true`.
*
* For more information, see the documentation on
* [Fittables]{@linkplain $dev-guide/building-apps/layout/fittables.html} in the
* Enyo Developer Guide.
*
* @class FittableRows
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(/** @lends module:layout/FittableRows~FittableRows.prototype */{

	/**
	* @private
	*/
	name: 'enyo.FittableRows',

	/**
	* A {@glossary kind} used to manage the size and placement of child
	* [components]{@link module:enyo/Component~Component}.
	*
	* @type {String}
	* @default ''
	* @private
	*/
	layoutKind: FittableRowsLayout,

	/**
	* By default, items in columns stretch to fit horizontally; set to `true` to
	* avoid this behavior.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	noStretch: false
});

},{'./FittableLayout':'layout/FittableLayout'}],'layout/FittableColumns':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/FittableColumns~FittableColumns} kind.
* @module layout/FittableColumns
*/

var
	kind = require('enyo/kind');

var
	FittableLayout = require('./FittableLayout'),
	FittableColumnsLayout = FittableLayout.Columns;

/**
* {@link module:layout/FittableColumns~FittableColumns} provides a container in which items are laid out in a
* set of vertical columns, with most items having natural size, but one
* expanding to fill the remaining space. The one that expands is labeled with
* the attribute `fit: true`.
*
* For more information, see the documentation on
* [Fittables]{@linkplain $dev-guide/building-apps/layout/fittables.html} in the
* Enyo Developer Guide.
*
* @class FittableColumns
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(/** @lends module:layout/FittableColumns~FittableColumns.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.FittableColumns',

	/**
	* A {@glossary kind} used to manage the size and placement of child
	* [components]{@link module:enyo/Component~Component}.
	*
	* @type {String}
	* @default ''
	* @private
	*/
	layoutKind: FittableColumnsLayout,

	/**
	* By default, items in columns stretch to fit vertically; set to `true` to
	* avoid this behavior.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	noStretch: false
});

},{'./FittableLayout':'layout/FittableLayout'}]
	};

});
//# sourceMappingURL=layout.js.map