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
	return {'canvas':[function (module,exports,global,require,request){
exports.version = '2.7.0';

}],'canvas/Control':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:canvas/Control~Control} kind.
* @module canvas/Control
*/

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	UiComponent = require('enyo/UiComponent');

/**
* Fires when this control is to be rendered.
*
* @event module:canvas/Control~Control#onRender
* @param {Context} context - The active canvas context.
* @public
*/

/**
* {@link module:canvas/Control~Control} is the base kind for items that live
* inside a {@link module:canvas/Canvas~Canvas} control.
*
* If you're using this kind directly, you may implement an `onRender` event
* handler in the owner to handle drawing into the canvas.
*
* If you're deriving a new kind based on this one, override the
* `renderSelf()` method and use that for your drawing code.
*
* @class Control
* @extends module:enyo/UiComponent~UiComponent
* @ui
* @public
*/
var Control = module.exports = kind(
	/** @lends module:canvas/Control~Control.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.canvas.Control',

	/**
	* @private
	*/
	kind: UiComponent,

	/**
	* @lends module:canvas/Control~Control.prototype
	* @private
	*/
	published: {
		/**
		* Object with members `l` (left), `t` (top), `w` (width), and `h` (height).
		* The default constructor sets these properties to random values.
		*
		* @type {Object}
		* @public
		*/
		bounds: null
	},

	/**
	* @private
	*/
	events: {
		onRender: ''
	},

	/**
	* @private
	*/
	constructor: function () {
		this.bounds = {l: utils.irand(400), t: utils.irand(400), w: utils.irand(100), h: utils.irand(100)};
		this.inherited(arguments);
	},

	/**
	* @private
	*/
	importProps: function (props) {
		this.inherited(arguments);
		if (props && props.bounds) {
			utils.mixin(this.bounds, props.bounds);
			delete props.bounds;
		}
	},

	/**
	* Fires module:canvas/Control~Control#onRender
	* @protected
	*/
	renderSelf: function (context) {
		this.doRender({context: context});
	},

	/**
	* @private
	*/
	render: function (context) {
		if (this.children.length) {
			this.renderChildren(context);
		} else {
			this.renderSelf(context);
		}
	},

	/**
	* @private
	*/
	renderChildren: function (context) {
		for (var i=0, c; (c=this.children[i]); i++) {
			c.render(context);
		}
	}
});

Control.prototype.defaultKind = Control;

}],'canvas/Shape':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:canvas/Shape~Shape} kind.
* @module canvas/Shape
*/

var
	kind = require('enyo/kind');

var
	Control = require('./Control');

/**
* {@link module:canvas/Shape~Shape} is the base kind for shapes that can be drawn into the
* canvas. It doesn't have a default rendering, but an event handler may call its
* [draw()]{@link module:canvas/Shape~Shape#draw} method.
*
* Kinds derived from this one should provide their own implementation of
* `renderSelf()`. If more complex operations are needed for filled mode or
* outline mode, override the `fill()` method or the `outline()` method,
* respectively.
*
* @class Shape
* @extends module:canvas/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:canvas/Shape~Shape.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.canvas.Shape',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @lends module:canvas/Shape~Shape.prototype
	* @private
	*/
	published: {
		/**
		* Color used to draw the interior of the shape.
		*
		* @type {String}
		* @default 'red'
		* @private
		*/
		color: 'red',

		/**
		* Color used to draw the outline of the shape.
		*
		* @type {String}
		* @default ''
		* @private
		*/
		outlineColor: ''
	},

	/**
	* @private
	*/
	fill: function (context) {
		context.fill();
	},

	/**
	* @private
	*/
	outline: function (context) {
		context.stroke();
	},

	/**
	* Draws the shape by invoking its [fill()]{@link module:canvas/Shape~Shape#fill} or
	* [outline()]{@link module:canvas/Shape~Shape#outline} method. Usually
	* invoked by the derived shape's [renderSelf()]{@link module:canvas/Shape~Shape#renderSelf}
	* method in response to the rendering of the canvas control's parent.
	*
	* @param {Context} context - The canvas context.
	* @public
	*/
	draw: function (context) {
		if (this.color) {
			context.fillStyle = this.color;
			this.fill(context);
		}
		if (this.outlineColor) {
			context.strokeStyle = this.outlineColor;
			this.outline(context);
		}
	}
});

},{'./Control':'canvas/Control'}],'canvas/Circle':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:canvas/Circle~Circle} kind.
* @module canvas/Circle
*/

var
	kind = require('enyo/kind');

var
	Shape = require('./Shape');

/**
* {@link module:canvas/Circle~Circle} is a canvas control that draws a circle fitting
* the parameters specified by the [bounds]{@link module:canvas/Control~Control#bounds}
* property on {@link module:canvas/Control~Control}. 
*
* @class Circle
* @extends module:canvas/Shape~Shape
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:canvas/Circle~Circle.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.canvas.Circle',

	/**
	* @private
	*/
	kind: Shape,

	/**
	* @protected
	*/
	renderSelf: function (ctx) {
		ctx.beginPath();
		ctx.arc(this.bounds.l, this.bounds.t, this.bounds.w, 0, Math.PI*2);
		this.draw(ctx);
	}
});

},{'./Shape':'canvas/Shape'}],'canvas/Rectangle':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:canvas/Rectangle~Rectangle} kind.
* @module canvas/Rectangle
*/

var
	kind = require('enyo/kind');

var
	Shape = require('./Shape');

/**
* {@link module:canvas/Rectangle~Rectangle} is a canvas control that draws a rectangle
* fitting the parameters specified by the [bounds]{@link module:canvas/Control~Control#bounds}
* property.
*
* @class Rectangle
* @extends module:canvas/Shape~Shape
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:canvas/Rectangle~Rectangle.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.canvas.Rectangle',

	/**
	* @private
	*/
	kind: Shape,

	/**
	* @lends module:canvas/Rectangle~Rectangle.prototype
	* @private
	*/
	published: {
		/**
		* If `true`, the area of the rectangle is cleared instead of drawn.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		clear: false
	},

	/**
	* @protected
	*/
	renderSelf: function (ctx) {
		if (this.clear) {
			ctx.clearRect(this.bounds.l, this.bounds.t, this.bounds.w, this.bounds.h);
		} else {
			this.draw(ctx);
		}
	},

	/**
	* @private
	*/
	fill: function (ctx) {
		ctx.fillRect(this.bounds.l, this.bounds.t, this.bounds.w, this.bounds.h);
	},

	/**
	* @private
	*/
	outline: function (ctx) {
		ctx.strokeRect(this.bounds.l, this.bounds.t, this.bounds.w, this.bounds.h);
	}
});

},{'./Shape':'canvas/Shape'}],'canvas/Text':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:canvas/Text~Text} kind.
* @module canvas/Text
*/

var
	kind = require('enyo/kind');

var
	Shape = require('./Shape');

/**
* {@link module:canvas/Text~Text} is a canvas control that draws a text string.
*
* @class Text
* @extends module:canvas/Shape~Shape
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:canvas/Text~Text.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.canvas.Text',

	/**
	* @private
	*/
	kind: Shape,

	/**
	* @lends module:canvas/Text~Text.prototype
	* @private
	*/
	published: {
		/**
		 * The text to draw.
		 *
		 * @type {String}
		 * @default ''
		 * @public
		 */
		text: '',

		/**
		 * CSS font specification used to select a font for drawing.
		 *
		 * @type {String}
		 * @default '12pt Arial'
		 * @public
		 */
		font: '12pt Arial',

		/**
		 * Text alignment within the rectangle specified by the
		 * [bounds]{@link module:canvas/Control~Control#bounds} property.
		 *
		 * @type {String}
		 * @default 'left'
		 * @public
		 */
		align: 'left'
	},

	/**
	* @protected
	*/
	renderSelf: function (ctx) {
		ctx.textAlign = this.align;
		ctx.font = this.font;
		this.draw(ctx);
	},

	/**
	* @private
	*/
	fill: function (ctx) {
		ctx.fillText(this.text, this.bounds.l, this.bounds.t);
	},

	/**
	* @private
	*/
	outline: function (ctx) {
		ctx.strokeText(this.text, this.bounds.l, this.bounds.t);
	}
});

},{'./Shape':'canvas/Shape'}],'canvas/Canvas':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:canvas/Canvas~Canvas} kind.
* @module canvas/Canvas
*/

var
	kind = require('enyo/kind');

var
	Control = require('./Control'),
	UiComponent = require('enyo/UiComponent'),
	Control = require('enyo/Control');

/**
* {@link module:canvas/Canvas~Canvas} is a control that generates a &lt;canvas&gt; HTML tag.
* It may contain other canvas components derived not from {@link module:enyo/Control~Control},
* but from {@link module:canvas/Control~Control}. These components are not true controls
* in the sense of being DOM elements; they are, instead, shapes drawn into the
* canvas.
*
* @class Canvas
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:canvas/Canvas~Canvas.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.Canvas',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	tag: 'canvas',

	/**
	* Hash containing the default height `(500)` and width `(500)` for the canvas.
	*
	* @see {@link module:enyo/Control~Control#attributes}
	* @public
	*/
	attributes: {
		// Width of the canvas element
		width: 500,
		// Height of the canvas element
		height: 500
	},

	/**
	* @private
	*/
	defaultKind: Control,

	/**
	* Canvas tags do not have any content.
	*
	* @private
	*/
	generateInnerHtml: function () {
		return '';
	},

	/**
	* @private
	*/
	teardownChildren: function () {
	},

	/**
	* @private
	*/
	rendered: function () {
		this.renderChildren();
	},

	/*
	* The `addChild()` method of {@link module:enyo/Control~Control} assumes that the child
	* being added is an instance of `enyo/Control`. Because `canvas/Control` is not derived
	* from `enyo/Control`, we instead call the `addChild()` method on
	* {@link module:enyo/UiComponent~UiComponent}, the superkind of `enyo/Control`.
	*
	* @private
	*/
	addChild: function () {
		UiComponent.prototype.addChild.apply(this, arguments);
	},

	/*
	* The `removeChild()` method of {@link module:enyo/Control~Control} assumes that the child
	* being removed is an instance of `enyo/Control`. Because `canvas/Control` is not derived
	* from `enyo/Control`, we instead call the `removeChild()` method on
	* {@link module:enyo/UiComponent~UiComponent}, the superkind of `enyo/Control`.
	*
	* @private
	*/
	removeChild: function () {
		UiComponent.prototype.removeChild.apply(this, arguments);
	},

	/**
	* Iterates over the canvas's children, rendering each onto the canvas.
	*
	* @private
	*/
	renderChildren: function (ctx) {
		var canvas = this.hasNode();
		if (!ctx) {
			if (canvas.getContext) {
				ctx = canvas.getContext('2d');
			}
		}
		if (ctx) {
			for (var i=0, c; (c=this.children[i]); i++) {
				c.render(ctx);
			}
		}
	},

	/**
	* Refreshes the canvas context, clears existing drawings, and redraws all
	* of the children.
	*
	* @public
	*/
	update: function () {
		var canvas = this.hasNode();
		if (canvas.getContext) {
			var ctx = canvas.getContext('2d');
			var b = this.getBounds();
			// clear canvas
			ctx.clearRect(0, 0, b.width, b.height);
			this.renderChildren(ctx);
		}
	}
});

},{'./Control':'canvas/Control'}]
	};

});
//# sourceMappingURL=canvas.js.map