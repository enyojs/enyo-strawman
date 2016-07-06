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
	return {'svg':[function (module,exports,global,require,request){
'use strict';

exports.version = '2.7.0';

}],'svg/globalattributes':[function (module,exports,global,require,request){
//-- Shared Attribute Collections --//
module.exports = {
	// Animation attribute target attributes
	animationTarget: ['attributeType', 'attributeName'],

	// Animation timing attributes
	animationTiming: ['begin', 'dur', 'end', 'min', 'max', 'restart', 'repeatCount', 'repeatDur', 'fill'],

	// Animation value attributes
	animationValue: ['calcMode', 'values', 'keyTimes', 'keySplines', 'from', 'to', 'by', 'autoReverse', 'accelerate', 'decelerate'],

	// Animation addition attributes
	animationAddition: ['additive', 'accumulate'],

	// Conditional processing attributes
	conditionalProcessing: ['requiredExtensions', 'requiredFeatures', 'systemLanguage'],

	// Filter primitive attributes
	filterPrimitive: ['height', 'result', 'width', 'x', 'y'],

	// Presentation attributes
	presentation: [
		'alignment-baseline', 'baseline-shift', 'clip', 'clip-path', 'clip-rule', 'color',
		'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering',
		'cursor', 'direction', 'display', 'dominant-baseline', 'enable-background', 'fill',
		'fill-opacity', 'fill-rule', 'filter', 'flood-color', 'flood-opacity', 'font-family',
		'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant',
		'font-weight', 'glyph-orientation-horizontal', 'glyph-orientation-vertical',
		'image-rendering', 'kerning', 'letter-spacing', 'lighting-color', 'marker-end',
		'marker-mid', 'marker-start', 'mask', 'opacity', 'overflow', 'pointer-events',
		'shape-rendering', 'stop-color', 'stop-opacity', 'stroke', 'stroke-dasharray',
		'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit',
		'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering',
		'unicode-bidi', 'visibility', 'word-spacing', 'writing-mode'
	],

	// Transfer function attributes
	transferFunction: ['type', 'tableValues', 'slope', 'intercept', 'amplitude', 'exponent', 'offset']
};

}],'svg/utils':[function (module,exports,global,require,request){
require('svg');

// General utility functions
module.exports = {

	// Provide an Enyo control or a string containing an ID
	getId: function (control) {
		if (typeof control == 'string' && this.owner.$[control]) {
			control = this.owner.$[control];
		}
		if (control && control.id) {
			return control.id;
		}
	}
};

}],'svg/Element':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:svg/Element~Element} kind.
* @module svg/Element
*/
require('svg');

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	Control = require('enyo/Control'),
	EventEmitter = require('enyo/EventEmitter')
	;

var
	attrs = require('./globalattributes'),
	svgUtil = require('./utils')
	;

/**
* {@link module:svg/Element~Element} is a kind that serves as a Base-kind for all SVG kinds.
*
* ```javascript
* 	var
* 		Element = require('enyo/Element');
*
* 	var
* 		module.exports = kind({
* 			name: 'Pattern',
* 			kind: Element,
* 			tag: 'pattern',
* 			supportedAttributes: utils.merge(
* 			attrs.presentation,
* 				[
* 					'viewBox',
* 					'patternUnits',
* 					'patternContentUnits',
* 					'patternTransform',
* 					'x',
* 					'y',
* 					'width',
* 					'height',
* 					'preserveAspectRatio'
* 				]
* 			)
* 		});
* ```
*
* @class Element
* @extends module:enyo/Control~Control
* @ui
* @public
*/

// Base-kind for deriving all SVG kinds
module.exports = kind({
	/**
	* @private
	*/
	name: 'Element',
	/**
	* @private
	*/
	kind: Control,
	/**
	* @private
	*/
	tag: 'svg',
	/**
	* @private
	*/
	_allSupportedAttributes: null,
	/**
	* @private
	*/
	noDefer: true,
	/**
	* @private
	*/
	mixins: [EventEmitter],
	supportedAttributes: util.merge(
		attrs.conditionalProcessing,
		[
			'space',
			'target', // Synonym for xlink:href
			'transform',
			'externalResourcesRequired'
		]
	),
	transforms: {
		/**
	    * A property to define attributeName
	    *
	    * @type {String}
	    * @default 'd'
	    * @public
	    */
		target: function (controlName) {
			var control = this.bindSafely(svgUtil.getId)(controlName);
			if (control) {
				control = '#' + control;
			}
			// If we can't find the control is likely a URL, use it instead
			this.setAttribute('xlink:href', control || controlName);
		}
	},
	/**
	* @private
	*/
	create: function () {
		this.inherited(arguments);

		if (this.supportedAttributes) {
			this.supportedAttributes.forEach(this.bindSafely(function (attr) {
				// Specially cased and aliased attributes
				switch (attr) {
					case 'space':
						this.setAttribute('xml:space', this[attr]);
						break;
					default:
						this.set(attr, this[attr]);
					}
			}));
		}
	},
	/**
	* @private
	*/
	rendered: function () {
		var n = this.hasNode(),
			f = this;
		if (n) {
			// Setup all of the event emitters svgEvent->EventEmitter
			n.addEventListener('loadEvent', function (ev) {
				f.emit('load', ev);
			});
			n.addEventListener('beginEvent', function (ev) {
				f.emit('begin', ev);
			});
			n.addEventListener('endEvent', function (ev) {
				f.emit('end', ev);
			});
			n.addEventListener('repeatEvent', function (ev) {
				f.emit('repeat', ev);
			});
		}
		this.inherited(arguments);
	},
	/**
	* @private
	*/
	set: function (attr, value) {
		this.setSupportedAttribute(arguments);

		if (arguments.length > 1) {
			this.inherited(arguments);
		}
	},
	/**
	* @private
	*/
	setSupportedAttribute: function (args) {
		var attr = args && args[0],
			value = args && args[1],
			val = (args && args.length == 1) ? this[attr] : value,
			attrs = this.supportedAttributes;

		if (attrs && attrs.indexOf(attr) >= 0) {
			// Transforms are special conditioning for just the attribute conversion and application process.
			if (this.transforms && this.transforms[attr]) {
				val = this.bindSafely(this.transforms[attr])(val, attr);
			}
			this.setAttribute(attr, val);
		}

	}
});

/**
* This method provides a hook to merge the supportedAttributes object on derived kinds.
* @private
*/
module.exports.concat = function (ctor, props, instance) {
	var proto = ctor.prototype || ctor,
		attrs;
	if (props.supportedAttributes) {
		attrs = proto.supportedAttributes ? proto.supportedAttributes.slice() : [];
		proto.supportedAttributes = attrs.concat(props.supportedAttributes);
		delete props.supportedAttributes;
	}
};

},{'./globalattributes':'svg/globalattributes','./utils':'svg/utils'}],'svg/Root':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:svg/Root~Root} kind.
* @module svg/Root
*/
require('svg');

var
	kind = require('enyo/kind')
	;

var
	Element = require('./Element')
	;

/**
* {@link module:svg/Root~Root} is a Component that creates a SVG element.
* Enyo attributes will match up with the standard attributes
* https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
*		Root = require('svg/Root');
*
* 		{kind: Root, viewBox: '0 0 100 100', style: 'height: 250px; width: 250px;', components: [
* 			{kind: Root, width: 100, height: 100, x: 0, y: 0, style: 'fill: cyan;'}
* 		]}
* ```
*
* @class Root
* @extends module:svg/Element~Element
* @ui
* @public
*/


// Root element, container for all SVG nodes
module.exports = kind({
	/**
	* @private
	*/
	name: 'Root',
	/**
	* @private
	*/
	kind: Element,
	/**
	* @private
	*/
	tag: 'svg',
	classes: 'enyo-svg',
	preserveAspectRatio: 'none',
	supportedAttributes: [
		'viewBox',
		'preserveAspectRatio'
	],
	/**
	* @private
	*/
	create: function () {
		this.inherited(arguments);
		this.setAttribute('version', '1.1');
		this.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		this.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
	}
});

},{'./Element':'svg/Element'}],'svg/Animate':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:svg/Animate~Animate} kind.
* @module svg/Animate
*/
require('svg');


var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	macroize = require('enyo/macroize')
	;

var
	attrs = require('./globalattributes'),
	Element = require('./Element')
	;
/**
* {@link module:svg/Animate~Animate} is a Component that creates a SVG Animate element.
* Enyo attributes will match up with the standard attributes
* https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate
*
* There are a couple ways to do animations with Keyframes.
* One using keyframes, the other using keyframeLibrary
*
* Using keyframes
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
*		Root = require('svg/Root'),
*		Animate = require('svg/Animate');
*
* 		module.exports = kind({
* 			name: 'AnimWobbleInfromTopAndHide',
* 			kind: Animate,
* 			keyframes: [
* 				'M0,20v-1c0,0,18.8,0,25,0s25,0,25,0v1H0z',
*				'M0,20v-7c0,0,18.8,2,25,2s25-1,25-1v6H0z',
*				'M0,65V30c8.2-2.3,13.7-5,25-5s17.7,2.5,25,5v35H0z',
*				'M0,100V60c8.7,2.2,13.7,7,25,7s17.8-4.5,25-7v40H0z',
*				'M0,100V20c8.3-1.2,18.8-2,25-2s17.5,1,25,2v80H0z',
*				'M0,100V20c7.7-3.2,18.8-5,25-5s18.2,2,25,5v80H0z',
*				'M0,100V20c5,0,18.8,0,25,0s20.2,0,25,0v80H0z',
*				'M0,100v-1c5,0,18.8,0,25,0s20.2,0,25,0v1H0z'
*			],
*		});
* ```
*
* Using keyframeLibrary
*
* This allows us to name our animations
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
*		Root = require('svg/Root'),
*		Animate = require('svg/Animate');
*
* 		module.exports = kind({
* 			name: 'AnimWobbleInfromTopAndHide',
* 			kind: Animate,
* 			keyframeLibrary: {
* 				next: [
* 					'M0,20v-1c0,0,18.8,0,25,0s25,0,25,0v1H0z',
*	 				'M0,20v-7c0,0,18.8,2,25,2s25-1,25-1v6H0z',
*					'M0,65V30c8.2-2.3,13.7-5,25-5s17.7,2.5,25,5v35H0z',
*					'M0,100V60c8.7,2.2,13.7,7,25,7s17.8-4.5,25-7v40H0z',
*					'M0,100V20c8.3-1.2,18.8-2,25-2s17.5,1,25,2v80H0z',
*					'M0,100V20c7.7-3.2,18.8-5,25-5s18.2,2,25,5v80H0z',
*					'M0,100V20c5,0,18.8,0,25,0s20.2,0,25,0v80H0z',
*					'M0,100v-1c5,0,18.8,0,25,0s20.2,0,25,0v1H0z'
*				],
*				prev: [
*					'M0,80v1c7.7-0.3,18.8-1,25-1s17.5,0.5,25,1v-1H0z',
*					'M0,80v20c7.8-2.3,18.8-5,25-5s17.3,3.2,25,5V80H0z',
*					'M0,0v50c7.8-2.3,18.8-3,25-3s17.3,1.2,25,3V0H0z',
*					'M0,0v80c0,0,18.8,2,25,2s25-2,25-2V0H0z',
*					'M0,0v80c0,0,18.8,0,25,0s25,0,25,0V0H0z',
*					'M0,0v1c0,0,18.8,0,25,0s25,0,25,0V0H0z'
*				]
*			}
*		});
* ```
*
* @class Animate
* @extends module:svg/Element~Element
* @ui
* @public
*/

module.exports = kind({
	name: 'Animate',
	kind: Element,
	tag: 'animate',
	// Local defaults
	/**
    * A property to define attributeName
    *
    * @type {String}
    * @default 'd'
    * @public
    */
	attributeName: 'd',
	/**
    * A property to determine the repeat count of an animation
    *
    * @type {Number}
    * @default 1
    * @public
    */
	repeatCount: 1,
	/**
    * A property to determine the fill of an animation
    *
    * @type {String}
    * @default 'remove'
    * @public
    */
	fill: 'remove',
	/**
    * Property to determine start time for animations
    *
    * @type {String}
    * @default 'indefinite'
    * @public
    */
	begin: 'indefinite',
	supportedAttributes: util.merge(
		attrs.animationTarget,
		attrs.animationTiming,
		attrs.animationValue,
		attrs.animationAddition
	),
	/**
    * A property for the keyframes array you wish to animate
    *
    * @type {Array}
    * @default []
    * @public
    */
	keyframes: null,
	/**
    * Keyframe Library is a property that accpepts and object.
    * This object can contain keys and values with the values
    * being an array keyframe animations
    *
    * @type {Object}
    * @default null
    * @public
    */
	keyframeLibrary: null,
	/**
	* @private
	*/
	keyframeCount: function () {
		return this.get('keyframes').length;
	},
	/**
	* @private
	*/
	computed: {
		keyframeCount: ['keyframes']
	},
	/**
	* @private
	*/
	transforms: {
		dur: function (val) { return isNaN(val) ? val : val + 'ms'; }
	},
	// Methods
	/**
	* @private
	*/
	constructor: function() {
		this.keyframes = [];
		this.inherited(arguments);
    },
	/**
	* @private
	*/
	create: function () {
		this.inherited(arguments);
		this.keyframesChanged();
	},
	/**
	* @private
	*/
	timeAtFrame: function (frameIndex) {
		if (!frameIndex) { return 0; }
		return this.get('dur') * (frameIndex / this.get('keyframeCount'));
	},
	/**
	* @private
	*/
	timeAtEnd: function () {
		return this.get('dur');
	},
	/**
	* @private
	*/
	start: function () {
		var node = this.hasNode();
		if (node) {
			node.beginElement();
		}
	},
	/**
	* @private
	*/
	updateTokens: function () {
		this.keyframesChanged();
	},
	/**
	* @private
	*/
	checkout: function (name) {
		this.set('keyframes', util.clone(this.get('keyframeLibrary')[name]));
		return this.get('keyframes');
	},
	/**
	* @private
	*/
	keyframesChanged: function () {
		this.set('values', macroize.quickMacroize(this.get('keyframes').join('; '), this, /\$(\w+)/g ));
	}
});
},{'./globalattributes':'svg/globalattributes','./Element':'svg/Element'}],'svg/Shape':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:svg/Shape~Shape} kind.
* @module svg/Shape
*/
require('svg');

var
	kind = require('enyo/kind'),
	util = require('enyo/utils')
	;

var
	attrs = require('./globalattributes'),
	svgUtil = require('./utils'),
	Element = require('./Element')
	;

var targetLinker = function (control, attr) {
	control = svgUtil.getId(control);
	if (control) {
		this.setAttribute(attr, 'url(#' + control + ')');
	}
};

/**
* {@link module:svg/Shape~Shape} is a kind that serves as a Base-kind for all SVG shape elements.
*
* ```javascript
* 		var
* 			Shape = require('./Shape');
*
* 		module.exports = kind({
*	 		name: 'Rectangle',
* 			kind: Shape,
* 			tag: 'rect',
* 			supportedAttributes: [
* 			'x',
* 			'y',
* 			'width',
* 			'height',
* 			'rx',
* 			'ry'
* 		]});
* ```
*
* @class Shape
* @extends module:svg/Element~Element
* @ui
* @public
*/

// Base-kind for all shape elements
module.exports = kind({
	/**
	* @private
	*/
	name: 'Shape',
	/**
	* @private
	*/
	kind: Element,
	supportedAttributes: util.merge(
		attrs.presentation
	),
	transforms: {
		'marker-end': targetLinker,
		'marker-mid': targetLinker,
		'marker-start': targetLinker
	}
});

},{'./globalattributes':'svg/globalattributes','./utils':'svg/utils','./Element':'svg/Element'}],'svg/Path':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:svg/Path~Path} kind.
* @module svg/Path
*/
require('svg');

var
	kind = require('enyo/kind')
	;

var
	Shape = require('./Shape')
	;

/**
* {@link module:svg/Path~Path} is a Component that creates a SVG Path element.
* Enyo attributes will match up with the standard attributes
* https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
*		Root = require('svg/Root'),
*		Path = require('svg/Path');
*
*	{kind: Root, viewBox: '0 0 100 100', style: 'height: 250px; width: 250px; display: block;', components: [
*		{name: 'logo', kind: Path, classes: 'svg-sample-logo', spotlight: true, ontap: 'buttonTapped', d: 'M49.3,90c-5.7,0-11-1-15.9-3.1c-4.9-2.1-9.2-5-12.9-8.8c-3.8-3.7-6.7-7.9-8.9-12.9C9.6,60.3,8.5,55,8.5,49.3 c0-5.7,1.1-11,3.2-15.8c2.1-4.8,5.1-9.2,8.9-13c3.8-3.7,8.1-6.5,13-8.6c4.8-2.1,10.1-3.2,15.8-3.2c5.6,0,10.8,1.1,15.7,3.2 c4.9,2.1,9.3,5,13.1,8.6c3.7,3.8,6.6,8.1,8.7,13c2.1,4.8,3.2,10.1,3.2,15.8c0,5.7-1.1,11-3.2,15.9c-2.1,4.9-5,9.2-8.7,12.8 c-3.8,3.8-8.1,6.7-13,8.9C60.3,88.9,55,90,49.3,90z M50.9,15.3c-0.4-0.1-0.8-0.2-1.1-0.2c-4.8,0-9.4,0.9-13.6,2.7 c-4.2,1.8-7.9,4.3-11.1,7.4c-3.2,3.2-5.6,6.8-7.4,10.9c-1.8,4.1-2.7,8.5-2.7,13.2c0,4.7,0.9,9.1,2.8,13.2c1.9,4.1,4.4,7.7,7.6,10.9 c3.2,3.2,6.8,5.6,11,7.4c4.1,1.8,8.4,2.6,12.9,2.6c4.8,0,9.3-0.9,13.4-2.8c4.1-1.9,7.6-4.4,10.6-7.5c3-3.2,5.4-6.8,7.2-10.9 c1.8-4.1,2.8-8.4,2.9-12.9v-1.5H58.9v3.1h21.3v0.6c-0.3,4-1.3,7.8-3,11.3c-1.7,3.5-4,6.6-6.8,9.2c-2.8,2.6-6,4.7-9.6,6.2 c-3.6,1.5-7.4,2.3-11.4,2.3c-4.4,0-8.5-0.9-12.3-2.6c-3.8-1.7-7.1-4.1-9.8-7s-4.9-6.3-6.4-10c-1.5-3.7-2.3-7.5-2.3-11.5 c0-4.4,0.8-8.5,2.5-12.3c1.7-3.8,4-7,7-9.7s6.3-4.9,9.9-6.5c3.7-1.6,7.5-2.4,11.5-2.4h1.6V15.3z M36.4,41c1.2,0,2.3-0.4,3.3-1.3 c1-0.9,1.5-2,1.5-3.3c0-1.3-0.5-2.4-1.5-3.3c-1-0.9-2.1-1.4-3.3-1.4c-1.4,0-2.5,0.5-3.4,1.4c-0.9,0.9-1.3,2.1-1.3,3.3 c0,1.3,0.4,2.4,1.3,3.3C33.8,40.6,34.9,41,36.4,41z M47.6,67.2h11.3v-3.4h-8V31.6h-3.3V67.2z'}
*	]}
* ```
*
* @class Path
* @extends module:svg/Shape~Shape
* @ui
* @public
*/

module.exports = kind({
	/**
	* @private
	*/
	name: 'Path',
	/**
	* @private
	*/
	kind: Shape,
	/**
	* @private
	*/
	tag: 'path',
	/**
    * A property to determine the fill value of a path
    *
    * @type {String}
    * @default 'none'
    * @public
    */
	fill: 'none',
	supportedAttributes: [
		'd',
		'pathLength'
	]
});

},{'./Shape':'svg/Shape'}]
	};

});
//# sourceMappingURL=svg.js.map