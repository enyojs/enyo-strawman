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
	return {'moonstone/options':[function (module,exports,global,require,request){
var
	utils = require('enyo/utils'),
	options = require('enyo/options');

var config = global.moon && global.moon.config;

/**
* Global *design-time* configuration options for Moonstone
*
* @param {Boolean} Set accelerate `false` to prefer position properties over CSS transforms.
* @module moonstone/options
*/
module.exports = utils.mixin({
	/** @lends module:moonstone/options */
	accelerate: true,
	renderOnShow: {
		expandableListDrawer: true
	}
}, options, config);

}],'moonstone/resolution':[function (module,exports,global,require,request){
/**
* Defines TV-specific resolution values. See {@link module:enyo/resolution} for more details.
* @module moonstone/resolution
*/
var
	ri = require('enyo/resolution');

ri.defineScreenTypes([
	{name: 'hd',      pxPerRem: 16, width: 1280, height: 720,  aspectRatioName: 'hdtv'},
	{name: 'fhd',     pxPerRem: 24, width: 1920, height: 1080, aspectRatioName: 'hdtv', base: true},
	{name: 'uw-uxga', pxPerRem: 24, width: 2560, height: 1080, aspectRatioName: 'cinema'},
	{name: 'uhd',     pxPerRem: 48, width: 3840, height: 2160, aspectRatioName: 'hdtv'}
]);

module.exports = ri;

}],'moonstone/i18n':[function (module,exports,global,require,request){
var
	ResBundle = require('enyo-ilib/ResBundle');

/**
* Localized strings from [iLib]{@link ilib} translations.
*
* @param {String} string - String to be localized.
* @returns {String} Localized string.
* @name moon.$L
* @public
*/
var $L = function (string) {
	if (!$L.rb) {
		return string;
	}
	var str = $L.rb.getString(string);
	return str.toString();
};
$L.rb = new ResBundle({
	loadParams: {
		root: 'moonstone/resources'
	}
});

/**
* Exports the `$L()` i18n function from [iLib]{@link ilib}.
* @module moonstone/i18n
*/
module.exports = $L;

}],'moonstone/fonts':[function (module,exports,global,require,request){
/**
* This module loads Moonstone specific fonts. It has no exports and is not inteded to be directly
* included by external developers.
*
* @private
* @module moonstone/fonts
*/

var
	i18n = require('enyo/i18n');

var
	Locale = require('enyo-ilib/Locale');

/**
* `moon-fonts` is the locale-specific font generator, allowing any locale to have its own custom
* font. Each locale-font from the configuration block (defined in this file) is generated at
* run-time. If the locale you're currently in is in the locale-font list an additional
* `@font-face` rule will be generated that will override the standard "Moonstone LG Display"
* font.
*
* Below is example genarated-output of the Urdu ("ur") locale-font.
*
* ```css
* &#64;font-face {
* 	font-family: 'Moonstone LG Display ur';
* 	font-weight: normal;
* 	src: local('LG Display_Urdu');
* 	unicode-range: U+0600-U+06FF, U+FE70-U+FEFE, U+FB50-U+FDFF;
* }
* &#64;font-face {
* 	font-family: 'Moonstone LG Display ur Bold';
* 	font-weight: normal;
* 	src: local('LG Display_Urdu');
* 	unicode-range: U+0600-U+06FF, U+FE70-U+FEFE, U+FB50-U+FDFF;
* }
* &#64;font-face {
* 	font-family: 'Moonstone LG Display ur Light';
* 	font-weight: normal;
* 	src: local('LG Display_Urdu');
* 	unicode-range: U+0600-U+06FF, U+FE70-U+FEFE, U+FB50-U+FDFF;
* }
* ```
*
* @name International Fonts
* @public
*/

function funLocaleSpecificFonts () {
	var loc = new Locale(),
		language = loc.getLanguage(),
		region = loc.getRegion(),
		styleId = 'enyo-localization-font-override',
		styleElem = document.getElementById(styleId),
		fontDefinitionCss = '',
		// Locale Configuration Block
		fonts = {
			'NonLatin': {
				regular: 'LG Display-Light',
				bold:    'LG Display-Regular'
			},
			'ja': {
				regular: 'LG Display_JP'
			},
			'en-JP': {
				regular: 'LG Display_JP'
			},
			'ur': {
				regular: 'LG Display_Urdu',
				unicodeRanges:
					'U+600-6FF,' +
					'U+FE70-FEFE,' +
					'U+FB50-FDFF'
			},
			'zh-HK': {
				regular: 'LG Display GP4_HK-Light',
				bold:    'LG Display GP4_HK-Regular',
				unicodeRanges:
					'U+0-FF,' +
					'U+2E80-2EFF,' +
					'U+3000-303F,' +
					'U+3200-33FF,' +
					'U+3400-4DBF,' +
					'U+4E00-9FFF,' +
					'U+E000-FAFF,' +
					'U+FF00-FFEF'
			}
		};

	// Duplications and alternate locale names
	fonts['zh-TW'] = fonts['zh-HK'];

	// Generate a single font-face rule
	this.buildFont = function(inOptions) {
		if (!inOptions && !inOptions.name) {
			return '';
		}
		var strOut = '@font-face { \n' +
			'  font-family: "' + inOptions.name + '";\n' +
			'  font-weight: ' + ( inOptions.weight || 'normal' ) + ';\n';

		if (inOptions.localName) {
			strOut+= '  src: local("' + inOptions.localName + '");\n';
		}
		if (inOptions.unicodeRanges) {
			strOut+= '  unicode-range: ' + inOptions.unicodeRanges + ';\n';
		}
		strOut+= '} \n';
		return strOut;
	};

	// Generate a collection of font-face rules, in multiple font-variants
	this.buildFontSet = function(strLang, bitDefault) {
		var strOut = '',
			name = (bitDefault) ? '' : ' ' + strLang;

		if (fonts[strLang].regular) {
			// Build Regular
			strOut+= this.buildFont({
				name: 'Moonstone LG Display' + name,
				localName: fonts[strLang].regular,
				unicodeRanges: fonts[strLang].unicodeRanges
			});

			// Build Bold
			strOut+= this.buildFont({
				name: 'Moonstone LG Display' + name + ' Bold',
				localName: fonts[strLang].bold || fonts[strLang].regular,
				unicodeRanges: fonts[strLang].unicodeRanges
			});

			// Build Light
			strOut+= this.buildFont({
				name: 'Moonstone LG Display' + name + ' Light',
				localName: fonts[strLang].light || fonts[strLang].regular,
				unicodeRanges: fonts[strLang].unicodeRanges
			});
		}
		return strOut;
	};

	if (!styleElem) {
		styleElem = document.createElement('style');
		styleElem.setAttribute('id', styleId);
		document.head.appendChild(styleElem);
	}

	// Build all the fonts so they could be explicitly called
	for (var lang in fonts) {
		fontDefinitionCss+= this.buildFontSet(lang);
	}

	// Set up the override so "Moonstone LG Display" becomes the local-specific font.
	if (language === 'ja') {
		fontDefinitionCss+= this.buildFontSet('ja', true);
	}
	else if (language === 'en' && region === 'JP') {
		fontDefinitionCss+= this.buildFontSet('en-JP', true);
	}
	else if (language === 'ur') {
		fontDefinitionCss+= this.buildFontSet('ur', true);
	}
	else if (language === 'zh' && region === 'HK') {
		fontDefinitionCss+= this.buildFontSet('zh-HK', true);
	}
	else if (language === 'zh' && region === 'TW') {
		fontDefinitionCss+= this.buildFontSet('zh-TW', true);
	}

	styleElem.innerHTML = fontDefinitionCss;
}

i18n.updateLocale.extend(function (sup) {
	return function() {
		sup.apply(this, arguments);
		funLocaleSpecificFonts();
	};
});

funLocaleSpecificFonts();

}],'moonstone/ExpandableListItem/ExpandableListItemDrawer':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/ExpandableListItem/ExpandableListItemDrawer~ExpandableListItemDrawer} kind.
* @module moonstone/ExpandableListItem/ExpandableListItemDrawer
*/

var
	kind = require('enyo/kind'),
	Drawer = require('enyo/Drawer');

var
	options = require('../options');

/**
* @class ExpandableListItemDrawer
* @extends module:enyo/Drawer~Drawer
* @ui
* @private
*/
module.exports = kind(
	/** @lends module:moonstone/ExpandableListItem/ExpandableListItemDrawer~ExpandableListItemDrawer.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ExpandableListItemDrawer',

	/**
	* @private
	*/
	kind: Drawer,

	/**
	* @private
	*/
	open: false,

	/**
	* @private
	*/
	spotlight: 'container',

	/**
	* @private
	*/
	spotlightRememberFocus: false,

	/**
	* @private
	*/
	renderOnShow: options.renderOnShow && options.renderOnShow.expandableListDrawer,

	/**
	* @private
	*/
	observers: [
		{path: 'generated', method: 'resetRendered'}
	],

	/**
	* @private
	*/
	openChanged: function () {
		if (this.open && this.renderOnShow && !this.showing && !this.generated) this.show();
		Drawer.prototype.openChanged.apply(this, arguments);
	},

	/**
	* Once the rendered phase completes, mark hasRendered to true. This helps work around
	* {@link module:enyo/Checkbox~Checkbox} firing onActivate events during it's rendered callback
	* that we don't want to interpret as user action.
	*
	* @private
	*/
	rendered: function () {
		Drawer.prototype.rendered.apply(this, arguments);
		this.hasRendered = true;
	},

	/**
	* When generated is set to false, reset hasRendered as well.
	*
	* @private
	*/
	resetRendered: function (was, is) {
		if (!is) this.hasRendered = false;
	},

	// Accessibility

	/**
	* @private
	*/	
	ariaObservers: [
		{from: 'open', method: function () {
			this.setAriaAttribute('aria-hidden', this.open ? null : 'true');
		}}
	]
});

},{'../options':'moonstone/options'}],'moonstone':[function (module,exports,global,require,request){
'use strict';

// Many moonstone controls require ilib components but do not directly require the base module which
// is necessary to include the locale assets.
require('enyo-ilib');

var
	platform = require('enyo/platform'),
	dispatcher = require('enyo/dispatcher'),
	gesture = require('enyo/gesture');

exports = module.exports = require('./src/options');
exports.version = '2.7.0';

// Override the default holdpulse config to account for greater delays between keydown and keyup
// events in Moonstone with certain input devices.
gesture.drag.configureHoldPulse({
	events: [{name: 'hold', time: 400}],
	endHold: 'onLeave'
});

/**
* Registers key mappings for webOS-specific device keys related to media control.
*
* @private
*/
if (platform.webos >= 4) {
	// Table of default keyCode mappings for webOS device
	dispatcher.registerKeyMap({
		415 : 'play',
		413 : 'stop',
		19  : 'pause',
		412 : 'rewind',
		417 : 'fastforward',
		461 : 'back'
	});
}

// ensure that these are registered
require('./src/resolution');
require('./src/fonts');

},{'./src/options':'moonstone/options','./src/resolution':'moonstone/resolution','./src/fonts':'moonstone/fonts'}],'moonstone/HighlightText':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/HighlightText~HighlightText} kind.
* @module moonstone/HighlightText
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	Control = require('enyo/Control'),
	HTMLStringDelegate = require('enyo/HTMLStringDelegate');

/**
* Event sent to {@link module:moonstone/HighlightText~HighlightText} to turn on highlighting.
*
* @event module:moonstone/HighlightText~HighlightText#onHighlight
* @type {Object}
* @property {String|RegExp} highlight - String or regular expression specifying the text or
*	pattern to highlight.
* @public
*/

/**
* Event sent to {@link module:moonstone/HighlightText~HighlightText} to turn off highlighting. No additional data
* is sent with this event.
*
* @event module:moonstone/HighlightText~HighlightText#onUnHighlight
* @type {Object}
* @public
*/

var HighlightTextDelegate = Object.create(HTMLStringDelegate);

HighlightTextDelegate.generateInnerHtml = function (control) {
	var i = 0, child;
	// flow can alter the way that html content is rendered inside
	// the container regardless of whether there are children.
	control.flow();
	if (control.children.length) {
		// If marqueeText is created inside of highlightText then it needs to pass search keyword to children
		for (; (child = control.children[i]); ++i) {
			child.search = control.search;
			child.highlightClasses = control.highlightClasses; // this is not included in search, so passing it
		}
		return this.generateChildHtml(control);
	}
	else {
		if (control.search && control.content) {
			return control.content.replace(control.search, control.bindSafely(function (s) {
				return '<span style=\'pointer-events:none;\' class=\'' + this.highlightClasses + '\'>' + dom.escape(s) + '</span>';
			}));
		} else {
			return dom.escape(control.get('content'));
		}
	}
};

/**
* {@link module:moonstone/HighlightText~HighlightText} is a control that displays highlighted text.  When
* the [highlight]{@link module:moonstone/HighlightText~HighlightText#highlight} property is set or an
* [onHighlight]{@link module:moonstone/HighlightText~HighlightText#onHighlight} event is received,
* it will highlight a specified string if that string is found within the
* control's content.
*
* For example, let's say we have the following control:
*
* ```
* 	var
* 		kind = require('enyo/kind'),
* 		HighlightText = require('moonstone/HighlightText');
*
* 	{kind: HighlightText, name: 'myHT', content: 'Hello World!'}
* ```
* In response to the event
*
* ```
* 	this.waterfall('onHighlight', {highlight: 'Hello'});
* ```
* or the direct API call
*
* ```
* 	this.$.myHT.set('highlight', 'Hello');
* ```
*
* the word "Hello" will be highlighted.
*
* The highlighting will be turned off when an
* [onUnHighlight]{@link module:moonstone/HighlightText~HighlightText#onUnHighlight} event is received
*
* ```
* 	this.waterfall('onUnHighlight');
* ```
* or when [highlight]{@link module:moonstone/HighlightText~HighlightText#highlight} is set to a **falsy** value.
*
* ```
* 	this.$.myHT.set('highlight', '');
* ```
*
* @class HighlightText
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/HighlightText~HighlightText.prototype */ {

	/**
	* @private
	*/
	name: 'moon.HighlightText',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	* @lends module:moonstone/HighlightText~HighlightText.prototype
	*/
	published: {

		/**
		* String or regular expression specifying the text or pattern to highlight.
		* Setting this to an empty string, a **falsy** value, or an empty regex
		* will disable highlighting.
		*
		* @type {String|RegExp}
		* @default ''
		* @public
		*/
		highlight: '',

		/**
		* If `true`, only case-sensitive matches of the string to highlight will be
		* highlighted.  This property will be ignored if the
		* [highlight]{@link module:moonstone/HighlightText~HighlightText#highlight} property is set to a regular
		* expression (you may use the `'i'` modifier to create a case-insensitive regex).
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		caseSensitive: false,

		/**
		* The default CSS class to apply to highlighted content.
		*
		* @type {String}
		* @default 'moon-highlight-text-highlighted'
		* @public
		*/
		highlightClasses: 'moon-highlight-text-highlighted'
	},

	/**
	* @private
	*/
	renderDelegate: HighlightTextDelegate,

	/**
	* @private
	*/
	handlers: {
		onHighlight: 'onHighlightHandler',
		onUnHighlight: 'unHighlightHandler'
	},

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.highlightChanged();
	},

	/**
	* @private
	*/
	highlightChanged: function () {
		if (this.highlight) {
			if (this.highlight instanceof RegExp) {
				// Make sure the regex isn't empty
				this.search = (''.match(this.highlight)) ? null : this.highlight;
			} else {
				// Escape string for use in regex (standard regex escape from google)
				var escaped = this.highlight.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
				this.search = new RegExp(escaped, this.caseSensitive ? 'g' : 'ig');
			}
		} else {
			this.search = false;
		}
		if (this.hasNode()) {
			this.contentChanged();
		}
	},

	/**
	* @private
	*/
	caseSensitiveChanged: function () {
		this.highlightChanged();
	},

	/**
	* @private
	*/
	onHighlightHandler: function (inSender, inEvent) {
		this.setHighlight(inEvent.highlight);
		return true;
	},

	/**
	* @private
	*/
	unHighlightHandler: function (inSender, inEvent) {
		this.setHighlight('');
		return true;
	}
});

}],'moonstone/Icon':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Icon~Icon} kind.
* @module moonstone/Icon
*/

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	path = require('enyo/pathResolver'),
	Control = require('enyo/Control');

// Static private hash of all of the valid moonstone icons
var icons = {
	plus              : '&#43;',      // \0002B plus
	minus             : '&#45;',      // \0002D hyphen
	arrowhookleft     : '&#8617;',    // \021A9 LeftArrowHook
	arrowhookright    : '&#8618;',    // \021AA RightArrowHook
	ellipsis          : '&#8943;',    // \022EF ellipsis
	check             : '&#10003;',   // \02713 checkmark
	circle            : '&#983003;',  // \0EFFDB record
	stop              : '&#983004;',  // \0EFFDC stop
	play              : '&#983005;',  // \0EFFDD play
	pause             : '&#983006;',  // \0EFFDE pause
	forward           : '&#983007;',  // \0EFFDF forward
	backward          : '&#983008;',  // \0EFFE0 rewind
	skipforward       : '&#983009;',  // \0EFFE1 skip_forward
	skipbackward      : '&#983010;',  // \0EFFE2 skip_backwards
	pauseforward      : '&#983011;',  // \0EFFE3 indicator_forward
	pausebackward     : '&#983012;',  // \0EFFE4 indicator_backward
	pausejumpforward  : '&#983013;',  // \0EFFE5 indicator_skip_forward
	pausejumpbackward : '&#983014;',  // \0EFFE6 indicator_skip_backward
	jumpforward       : '&#983015;',  // \0EFFE7 indicator_end
	jumpbackward      : '&#983016;',  // \0EFFE8 indicator_begin
	denselist         : '&#983017;',  // \0EFFE9 list_big
	bulletlist        : '&#983018;',  // \0EFFEA list_bullets
	list              : '&#983019;',  // \0EFFEB list_simple
	drawer            : '&#983020;',  // \0EFFEC list_actions
	arrowlargedown    : '&#983021;',  // \0EFFED caret_down_large
	arrowlargeup      : '&#983022;',  // \0EFFEE caret_up_large
	arrowlargeleft    : '&#983023;',  // \0EFFEF caret_left_large
	arrowlargeright   : '&#983024;',  // \0EFFF0 caret_right_large
	arrowsmallup      : '&#983025;',  // \0EFFF1 caret_up_small
	arrowsmalldown    : '&#983026;',  // \0EFFF2 caret_down_small
	arrowsmallleft    : '&#983027;',  // \0EFFF3 caret_left_small
	arrowsmallright   : '&#983028;',  // \0EFFF4 caret_right_small
	closex            : '&#983029;',  // \0EFFF5 close_x
	search            : '&#983030;',  // \0EFFF6 magnify
	rollforward       : '&#983031;',  // \0EFFF7 redo
	rollbackward      : '&#983032;',  // \0EFFF8 undo
	exitfullscreen    : '&#983033;',  // \0EFFF9 minimize
	fullscreen        : '&#983034;',  // \0EFFFA maximize
	arrowextend       : '&#983073;',  // \0F0021 arrow_left
	arrowshrink       : '&#983074;',  // \0F0022 arrow_right
	flag              : '&#983075;',  // \0F0023 flag
	funnel            : '&#983076;',  // \0F0024 filter
	trash             : '&#983077;',  // \0F0025 trash
	star              : '&#983080;',  // \0F0028 star_full
	hollowstar        : '&#983081;',  // \0F0029 star_empty
	halfstar          : '&#983082;',  // \0F002A star_half
	gear              : '&#983083;',  // \0F002B gear
	plug              : '&#983084;',  // \0F002C input
	lock              : '&#983085;'   // \0F002D lock
};

/**
* {@link module:moonstone/Icon~Icon} is a control that displays an icon image. You may specify the
* image by setting the [src]{@link module:moonstone/Icon~Icon#src} property to a URL indicating the
* image file's location.
*
* ```
* 	var
* 		kind = require('enyo/kind'),
* 		Icon = require('moonstone/Icon');
*
* 	{kind: Icon, src: 'moonstone/src/assets/search.png'}
* ```
*
* Moonstone also supports a second method for displaying icons; in addition to
* using traditional image assets specified in `src`, you may use icons that are
* stored as single characters in a special symbol font. To do this, set the
* value of the [icon]{@link module:moonstone/Icon~Icon#icon} property to a string representing an
* icon name, e.g.:
*
* ```
* 	{kind: Icon, icon: 'closex'}
* ```
*
* For image-based icons, two sizes are supported: large (45x45 pixels) and small
* (32x32 pixels). Icons are small by default. To specify a large icon, set the
* [small]{@link module:moonstone/Icon~Icon#small} property to `false`:
*
* ```
* 	{kind: Icon, src: 'moonstone/src/assets/search.png', small: false}
*
* 	{kind: Icon, icon: 'closex', small: false}
* ```
*
* In addition, both icon sizes support two states: a default (resting) state,
* and a pressed (active) state. Both states need to be included in the icon's
* associated image asset, with the resting state on top and the active state on
* the bottom.
*
* Image assets for large icons should be 75px wide and 150px high. This allows
* room for the two states, along with 15 pixels of transparent padding on all
* four sides of each 45x45 icon.
*
* Assets for small icons should be 50px wide and 100px high. This allows room
* for the two states, along with 9 pixels of transparent padding on all four
* sides of each 32x32 icon.
*
* Since asset-based icon images are applied as CSS backgrounds, the height and
* width of an icon must be set if an image of a non-standard size is used.
*
* For situations in which an icon should act like a button, use
* {@link module:moonstone/IconButton~IconButton}.
*
* @class Icon
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Icon~Icon.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Icon',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	allowHtml: true,

	/**
	* @private
	* @lends module:moonstone/Icon~Icon.prototype
	*/
	published: {

		/**
		* This property serves two purposes. One, it accepts one of the below Moonstone icon
		* names. Two, it also supports standard ascii characters or HTML entities, to directly
		* represent a glyph. By default, the font used when you specify a
		* character/entity/glyph, the font "LG Display_Dingbat" will be used. It is applied via
		* a `class`: "font-lg-icons". To apply your own dingbat font, override this class's
		* `font-family` property in your CSS.
		*
		* The following icon names are valid:
		*
		* `drawer`
		* `arrowlargedown`
		* `arrowlargeup`
		* `arrowlargeleft`
		* `arrowlargeright`
		* `arrowsmallup`
		* `arrowsmalldown`
		* `arrowsmallleft`
		* `arrowsmallright`
		* `closex`
		* `check`
		* `search`
		* `exitfullscreen`
		* `fullscreen`
		* `circle`
		* `stop`
		* `play`
		* `pause`
		* `forward`
		* `backward`
		* `skipforward`
		* `skipbackward`
		* `pauseforward`
		* `pausebackward`
		* `pausejumpforward`
		* `pausejumpbackward`
		* `jumpforward`
		* `jumpbackward`
		* `arrowextend`
		* `arrowshrink`
		*
		* @type {String}
		* @default ''
		* @public
		*/
		icon: '',

		/**
		* URL specifying path to icon image.
		*
		* @type {String|module:enyo/resolution#selectSrc~src}
		* @default ''
		* @public
		*/
		src: '',

		/**
		* If `true`, icon is shown as disabled.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false,

		/**
		* A boolean parameter affecting the size of the icon.
		* If `true`, the icon will be 32px by 32px. If `false`, the icon will be 45px
		* by 45px. When `small` is `true`, a larger, invisible tap area will be applied
		* around the icon.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		small: true
	},

	/**
	* @private
	*/
	handlers: {
		/**
		* This is a horrible hack to prevent event bubble caching from messing up
		* moon.Tooltip positioning (BHV-13377). In short, we don't need to do anything
		* with onenter ourselves, but we need it to pass through us on the way to
		* moon.TooltipDecorator, which uses inSender to figure out who the tooltip
		* activator should be.
		*
		* TODO: Something better.
		*
		* @private
		*/
		onenter: 'doNothing'
	},

	/**
	* @returns {String} The value of the [src]{@link module:moonstone/Icon~Icon#src} property.
	* @public
	*/
	getSrc: function () {
		return this.src;
	},

	/**
	* @private
	*/
	classes: 'moon-icon',

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);

		this.smallChanged();
		if (this.src) {
			this.srcChanged();
		}
		this.disabledChanged();
	},

	/**
	* @private
	*/
	getIconClass: function (inIconName) {
		return 'moon-icon-' + (inIconName || this.icon);
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
		var src = this.src || null;
		src = ri.selectSrc(src);
		if (src) {
			if (src != 'none' && src != 'inherit' && src != 'initial') {
				src = 'url(' + path.rewrite(src) + ')';
			}
		}
		this.applyStyle('background-image', src);
	},

	/**
	* @private
	*/
	iconChanged: function (old) {
		var icon = this.get('icon') || '',
			iconEntity = icons[icon] || icon;

		// If the icon isn't in our known set, apply our custom font class
		this.addRemoveClass('font-lg-icons', !icons[icon]);

		this.set('content', iconEntity);

		if (icons[old]) {
			this.removeClass(this.getIconClass(old));
		}
		if (icons[icon]) {
			this.addClass(this.getIconClass());
		}
	},

	/**
	* @private
	*/
	smallChanged: function () {
		this.addRemoveClass('small', this.small);
		// Now that our content area is ready, assign the icon
		this.iconChanged();
	},

	// Accessibility

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['accessibilityLabel', 'accessibilityHint'], method: function () {
			var label = this.accessibilityHint && this.accessibilityLabel && (this.accessibilityLabel + ' ' + this.accessibilityHint) ||
						this.accessibilityHint ||
						this.accessibilityLabel ||
						null;
			this.setAriaAttribute('aria-label', label);
		}}
	]
});

}],'moonstone/Scrim':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Scrim~Scrim} kind.
* @module moonstone/Scrim
*/

var
	kind = require('enyo/kind'),
	Scrim = require('enyo/Scrim');

/**
* {@link module:moonstone/Scrim~Scrim} is a Moonstone-styled
* {@link module:enyo/Scrim~Scrim}.
*
* @class Scrim
* @extends module:enyo/Scrim~Scrim
* @ui
* @public
*/
var MoonScrim = module.exports = kind(
	/** @lends module:moonstone/Scrim~Scrim.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Scrim',

	/**
	* @private
	*/
	kind: Scrim,

	/**
	* @private
	*/
	classes: 'moon-scrim'
});

new Scrim.ScrimSingleton(MoonScrim, 'scrim', {floating: true, classes: 'moon-scrim moon-scrim-translucent'});
new Scrim.ScrimSingleton(MoonScrim, 'scrimTransparent', {floating: true, classes: 'moon-scrim moon-scrim-transparent'});

}],'moonstone/HistorySupport':[function (module,exports,global,require,request){
require('moonstone');

/**
* Mixin that enables support for custom history.
*
* @module moonstone/HistorySupport
*/

var
	EnyoHistory = require('enyo/History'),
	kind = require('enyo/kind');

/**
* {@link module:moonstone/HistorySupport} is a {@glossary mixin} that enables
* support for custom history. In its current iteration, "back" actions are
* implemented, allowing controls to override and customize the behavior that
* occurs when the back key is pressed or the `window.history` is utilized.
*
* @mixin
* @public
*/
var HistorySupport = {

	/**
	* @private
	*/
	name: 'HistorySupport',

	/**
	* @private
	*/
	published: {

		/**
		* When `true`, pressing the back key will result in control-specific behavior that
		* corresponds to a "back" action.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		allowBackKey: true
	},

	/**
	* Pushes a default state to the back history, consisting of a reference to our
	* handler for any "back" actions.
	*
	* If the default `pushBackHistory()` behavior is to be overridden, make sure
	* that the control's implementation of `pushBackHistory()` signifies that it
	* has handled the necessary behavior by returning `true`, e.g.:
	*
	* ```javascript
	* 	pushBackHistory: function() {
	* 		// perform custom operations here
	* 		return true;
	* 	}
	* ```
	*
	* @method
	* @public
	*/
	pushBackHistory: kind.inherit(function (sup) {
		// When you use a mixin, it will override existing properties and methods. If a control
		// that uses `moonstone/HistorySupport` has implemented the `pushBackHistory()` method, the
		// method will be replaced with the following method. To ensure that the control's
		// implementation of `pushBackHistory()` is executed, we allow it to run and subsequently
		// examine its return value.
		return function () {
			// check whether this control's `pushBackHistroy` method has effectively handled
			// the call, or whether it wants the inherited method to execute
			if (!sup.apply(this, arguments)) {
				EnyoHistory.push({context: this, handler: this.backKeyHandler});
			}
			return true;
		};
	}),

	/**
	* Handler for whenever a "back" action is triggered. The default behavior is to hide the
	* control if it is showing.
	*
	* Most controls will want to override this behavior. If the default behavior should not be
	* executed, ensure that the `backKeyHandler()` method in the control signifies that it has
	* handled the necessary behavior by returning `true`.
	*
	* @method
	* @public
	*/
	backKeyHandler: kind.inherit(function (sup) {
		return function () {
			if (!sup.apply(this, arguments)) {
				if (this.showing) this.hide();
			}
			return true;
		};
	})
};

module.exports = HistorySupport;

}],'moonstone/ScrollThumb':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ScrollThumb~ScrollThumb} kind.
* @module moonstone/ScrollThumb
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	ScrollThumb = require('enyo/ScrollThumb');

/**
* {@link module:moonstone/ScrollThumb~ScrollThumb}, which extends
* {@link module:enyo/ScrollThumb~ScrollThumb}, is used to display a small visual
* scroll indicator.
*
* `moonstone/ScrollThumb` is not typically created in application code.
*
* @class ScrollThumb
* @extends module:enyo/ScrollThumb~ScrollThumb
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ScrollThumb~ScrollThumb.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ScrollThumb',

	/**
	* @private
	*/
	kind: ScrollThumb,

	/**
	* @private
	* @lends module:moonstone/ScrollThumb~ScrollThumb.prototype
	*/
	published: {
		/**
		* Ratio of size and position of thumb with respect to scroll bounds.
		*
		* @type {Number}
		* @default 1
		* @public
		*/
		sizeRatio: 1
	},

	/**
	* @private
	*/
	classes: 'moon-thumb matrix3dsurface',

	/**
	* @private
	*/
	minSize: 40,

	/**
	* @private
	*/
	create: function () {
		ScrollThumb.prototype.create.apply(this, arguments);
		var v = this.axis == 'v';
		this.offset = v ? 'top' : 'left';
		this.transform = dom.canTransform();
		this.accel = dom.canAccelerate();
		this.translation = this.accel ? 'matrix3d' : 'matrix';
		this.positionMethod = v ? 'getScrollTop' : 'getScrollLeft';
		this.sizeDimension = v ? 'clientHeight' : 'clientWidth';
		this.addClass('enyo-' + this.axis + 'thumb');
	},

	/**
	* @private
	*/
	update: function (inStrategy) {
		if (this.showing && this.scrollBounds) {
			var d = this.dimension;
			var bd = this.scrollBounds[this.sizeDimension], sbd = this.scrollBounds[d];
			var overs = 0, overp = 0, over = 0;
			var ratio = this.getSizeRatio();
			if (bd > sbd) {
				this.hide();
				return;
			}
			if (inStrategy.isOverscrolling()) {
				over = inStrategy.getOverScrollBounds()['over' + this.offset];
				overs = Math.abs(over);
				overp = Math.max(over, 0);
			}
			var sbo = inStrategy[this.positionMethod]() - over;
			// calc size & position
			var bdc = bd - this.cornerSize;
			var s = Math.floor((bd * bd / sbd) - overs);
			s = Math.max(this.minSize, s);
			var p = Math.floor((bdc * sbo / sbd) + overp);
			p = Math.max(0, Math.min(bdc - this.minSize, p));

			p *= ratio;
			s *= ratio;

			// apply thumb styling if needed
			this.needed = s < bd;
			if (this.needed && this.hasNode()) {
				dom.transformValue(this, this.translation, this.generateMatrix(p, s));
			} else {
				this.hide();
			}
		}
	},

	/**
	* @private
	*/
	generateMatrix: function (inPosition, inSize) {
		var x, y, w, h, node = this.hasNode();

		if (!node) {
			x = 0;
			y = 0;
			w = 1;
			h = 1;
		}
		else if (this.axis === 'v') {
			x = 0;
			y = inPosition;
			w = 1;
			h = inSize/node.offsetHeight;
		}
		else {
			x = inPosition;
			y = 0;
			w = inSize/node.offsetWidth;
			h = 1;
		}

		return (this.accel) ? this.assemble3dMatrix(x, y, w, h) : this.assemle2dMatrix(x, y, w, h);
	},

	/**
	* @private
	*/
	assemle2dMatrix: function (inX, inY, inWidth, inHeight) {
		return inWidth + ', 0, 0, ' + inHeight + ', ' + inX + ', ' + inY;
	},

	/**
	* @private
	*/
	assemble3dMatrix: function (inX, inY, inWidth, inHeight) {
		return inWidth + ', 0, 0, 0, 0, ' + inHeight + ', 0, 0, 0, 0, 1, 0, ' + inX + ', ' + inY + ', 1, 1';
	},

	/**
	* Override `show()` to give fade effect.
	*
	* @private
	*/
	show: function () {
		this.cancelDelayHide();
		this.removeClass('hidden');
	},

	/**
	* Hides the control.
	*
	* @private
	*/
	hide: function () {
		this.addClass('hidden');
	}
});

}],'moonstone/RichText':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/RichText~RichText} kind.
* @module moonstone/RichText
*/

var
	kind = require('enyo/kind'),
	RichText = require('enyo/RichText');

/**
* {@link module:moonstone/RichText~RichText} is a Moonstone-styled text input
* field with support for rich text formatting such as bold, italics, and
* underlining, derived from {@link module:enyo/RichText~RichText}. Typically, a
* `moonstone/RichText` is placed inside a
* {@link module:moonstone/InputDecorator~InputDecorator}, which provides
* styling, e.g.:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		InputDecorator = require('moonstone/InputDecorator'),
* 		RichText = require('moonstone/RichText');
*
* 	{kind: InputDecorator, components: [
* 		{kind: RichText, style: 'width: 240px;', onchange: 'inputChange'}
* 	]}
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
	/** @lends module:moonstone/RichText~RichText.prototype */ {

	/**
	* @private
	*/
	name: 'moon.RichText',

	/**
	* @private
	*/
	kind: RichText,

	/**
	* @private
	*/
	classes: 'moon-body-text moon-richtext',

	/**
	* @private
	*/
	create: function () {
		RichText.prototype.create.apply(this, arguments);
		this.disabledChanged();
	},

	/**
	* Sets the focus on the RichText.
	*
	* @public
	*/
	focus: function () {
		RichText.prototype.focus.apply(this, arguments);
		var node = this.hasNode();
		// We move the cursor to the end, because in 5-way
		// mode there is no way (other than backspacing) for
		// the user to move the caret within the text field
		this.moveCursorToEnd();
		node.scrollTop = node.scrollHeight;
	},

	/**
	* Removes focus from the RichText.
	*
	* @public
	*/
	blur: function () {
		if (this.hasNode()) {
			this.node.blur();
		}
	},

	/**
	* Piggyback onto {@link module:enyo/RichText~RichText#blurHandler}.
	*
	* @private
	* @method
	*/
	blurHandler: function () {
		RichText.prototype.blurHandler.apply(this, arguments);
		this.hasNode().scrollTop = 0;
	},

	/**
	* @private
	*/
	disabledChanged: function () {
		RichText.prototype.disabledChanged.apply(this, arguments);
		if (this.disabled) {
			this.attributes.contenteditable = false;
		}
	},

	/**
	* @private
	*/
	left: function () {
		var sel = this.getSelection();
		if (sel.rangeCount) {
			var selRange = sel.getRangeAt(0);
			var testRange = selRange.cloneRange();

			testRange.selectNodeContents(this.node);
			testRange.setEnd(selRange.startContainer, selRange.startOffset);

			if (testRange.toString() === '') {
				return false;
			}
		}
		return true;
	},

	/**
	* @private
	*/
	right: function () {
		var sel = this.getSelection();
		if (sel.rangeCount) {
			var selRange = sel.getRangeAt(0);
			var testRange = selRange.cloneRange();

			testRange.selectNodeContents(this.node);
			testRange.setStart(selRange.endContainer, selRange.endOffset);

			if (testRange.toString() === '') {
				return false;
			}
		}
		return true;
	},

	/**
	* @private
	*/
	up: function (inEvent) {
		return this.left();
	},

	/**
	* @private
	*/
	down: function (inEvent) {
		return this.right();
	}
});

}],'moonstone/TextArea':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/TextArea~TextArea} kind.
* @module moonstone/TextArea
*/

var
	kind = require('enyo/kind'),
	TextArea = require('enyo/TextArea');

/**
* {@link module:moonstone/TextArea~TextArea} is a Moonstone-styled text input
* field, derived from {@link module:enyo/TextArea~TextArea}. Typically, a
* `moonstone/TextArea` is placed inside a
* {@link module:moonstone/InputDecorator~InputDecorator}, which provides
* styling, e.g.:
*
* ```
* 	var
* 		kind = require('enyo/kind'),
* 		InputDecorator = require('moonstone/InputDecorator'),
* 		TextArea = require('moonstone/TextArea');
*
* 	{kind: InputDecorator, components: [
* 		{kind: TextArea, onchange: 'inputChange'}
* 	]}
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
	/** @lends module:moonstone/TextArea~TextArea.prototype */ {

	/**
	* @private
	*/
	name: 'moon.TextArea',

	/**
	* @private
	*/
	kind: TextArea,

	/**
	* @private
	*/
	classes: 'moon-body-text moon-textarea',

	/**
	* @private
	*/
	spotlightIgnoredKeys: [13, 16777221],	// 13==Enter, 16777221==KeypadEnter

	/**
	* @private
	*/
	handlers: {
		onblur: 'blurred'
	},

	/**
	* Sets the focus on the TextArea.
	*
	* @public
	*/
	focus: function () {
		TextArea.prototype.focus.apply(this, arguments);
		var node = this.hasNode();
		// We move the cursor to the end, because in 5-way
		// mode there is no way (other than backspacing) for
		// the user to move the caret within the text field
		node.selectionStart = this.value.length;
		node.scrollTop = node.scrollHeight;
	},

	/**
	* Removes focus from the TextArea.
	*
	* @public
	*/
	blur: function () {
		if (this.hasNode()) {
			this.node.blur();
		}
	},

	/**
	* @private
	*/
	blurred: function () {
		this.hasNode().scrollTop = 0;
	},

	/**
	* @private
	*/
	left: function (inEvent) {
		if (!this.hasNode() || this.node.selectionStart === 0) {
			return false;
		}
		return true;
	},

	/**
	* @private
	*/
	right: function (inEvent) {
		if (!this.hasNode() || this.node.selectionStart == this.node.value.length) {
			return false;
		}
		return true;
	},

	/**
	* @private
	*/
	up: function (inEvent) {
		return this.left(inEvent);
	},

	/**
	* @private
	*/
	down: function (inEvent) {
		return this.right(inEvent);
	}
});

}],'moonstone/Tooltip':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Tooltip~Tooltip} kind.
* @module moonstone/Tooltip
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	util = require('enyo/utils'),
	Control = require('enyo/Control'),
	Popup = require('enyo/Popup'),
	Component = require('enyo/Component'),
	Signals = require('enyo/Signals'),
	ri = require('enyo/resolution');

var pointerTemplate = '<path d="M0,5C0,3,1,0,3,0H0V5Z"/>';

// To prevent lingering tooltips, we're monitoring spotlight changes and tooltip display
// to ensure that only 1 tooltip is active.
// see BHV-14524, ENYO-247
var observer = new Component({

	/**
	* Last active tooltip
	* @private
	*/
	active: null,

	/**
	* @private
	*/
	components: [
		{kind: Signals, onSpotlightCurrentChanged: 'spotChanged'}
	],

	/**
	* @private
	*/
	activeChanged: function (was) {
		if(was) {
			was.waterfall('onRequestHideTooltip');
		}
	},

	/**
	* @private
	*/
	spotChanged: function (sender, event) {
		this.set('active', null);
	}
});

/**
* Provides uppercasing and checks text directionality for controls within a
* {@link module:moonstone/Tooltip~Tooltip}.
*
* @class TooltipContent
* @extends module:enyo/Control~Control
* @ui
* @public
*/
var TooltipContent = kind({
	/**
	* @private
	*/
	name: 'moon.TooltipContent',

	/**
	* @private
	*/
	kind: Control,

	/**
	* When `true`, the content will have locale-safe uppercasing applied.
	*
	* @type {Boolean}
	* @default true
	* @public
	*/
	uppercase: true,

	/**
	* @private
	*/
	create: function () {
		this._content = this.content;
		Control.prototype.create.apply(this, arguments);
	},

	/**
	* @private
	*/
	contentChanged: function (was, is) {
		if (arguments.length) this._content = is;
		this.content = this.uppercase ? util.toUpperCase(this._content) : this._content;
		Control.prototype.contentChanged.apply(this, arguments);
		this.detectTextDirectionality();
	},

	/**
	* @private
	*/
	uppercaseChanged: function (was, is) {
		this.contentChanged();
	}
});

/**
* {@link module:moonstone/Tooltip~Tooltip} is a popup that works in conjunction
* with {@link module:moonstone/TooltipDecorator~TooltipDecorator}. The tooltip
* is automatically displayed when the user hovers over the decorator for a given
* period of time. The tooltip is positioned around the decorator where there is
* available window space.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Button = require('moonstone/Button'),
* 		Tooltip = require('moonstone/Tooltip'),
* 		TooltipDecorator = require('moonstone/TooltipDecorator');
*
* 	{kind: TooltipDecorator, components: [
* 		{kind: Button, content: 'Tooltip'},
* 		{kind: Tooltip, content: 'I am a tooltip for a button.'}
* 	]}
* ```
*
* You may force the tooltip to appear by calling its
* [show()]{@link module:enyo/Control~Control#show} method.
*
* @class Tooltip
* @extends module:enyo/Popup~Popup
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Tooltip~Tooltip.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Tooltip',

	/**
	* @private
	*/
	kind: Popup,

	/**
	* @private
	*/
	defaultKind: TooltipContent,

	/**
	* @private
	*/
	classes: 'moon-tooltip below left-arrow',

	/**
	* @private
	* @lends module:moonstone/Tooltip~Tooltip.prototype
	*/
	published: {
		/**
		* This value overrides the default value of
		* [autoDismiss]{@link module:enyo/Popup~Popup#autoDismiss} inherited from
		* {@link module:enyo/Popup~Popup}.
		* If `true`, the tooltip will hide when the user taps outside of it or presses
		* ESC. Note that this property only affects behavior when the tooltip is used
		* independently, not when it is used with
		* [TooltipDecorator]{@link module:moonstone/TooltipDecorator~TooltipDecorator}.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		autoDismiss: false,

		/**
		* This value overrides the default value of
		* [floating]{@link module:enyo/Popup~Popup#floating} inherited from
		* {@link module:enyo/Popup~Popup}.
		* If 'false', the tooltip will not be rendered in a
		* [floating layer]{@link module:enyo/Control/floatingLayer~FloatingLayer} and can be ocluded
		* by other controls. Otherwise if `true`, the tooltip will be shown on top of other controls.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		floating: true,

		/**
		* Hovering over the decorator for this length of time (in milliseconds) causes the
		* tooltip to appear.
		*
		* @type {Number}
		* @default 500
		* @public
		*/
		showDelay: 500,

		/**
		* Position of the tooltip with respect to the activating control. Valid values are
		* `'above'`, `'below'`, `'left top'`, `'left bottom'`, `'right top'`, `'right bottom'`, and
		* `'auto'`. The values starting with `'left`' and `'right'` place the tooltip on the side
		* (sideways tooltip) with two additional positions available, `'top'` and `'bottom'`, which
		* places the tooltip content toward the top or bottom, with the tooltip pointer
		* middle-aligned to the activator.
		*
		* Note: The sideways tooltip does not automatically switch sides if it gets too close or
		* overlaps with the window bounds, as this may cause undesirable layout implications,
		* covering your other controls.
		*
		* @type {String}
		* @default 'auto'
		* @public
		*/
		position: 'auto',

		/**
		* Default `margin-left` value.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		defaultLeft: 0,

		/**
		* When `true`, the content will have locale-safe uppercasing applied.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		uppercase: true,

		/**
		* @deprecated Replaced by [uppercase]{@link module:moonstone/Tooltip~Tooltip#uppercase}.
		*
		* Formerly defaulted to `true`, now defaults to `null` and will only have
		* an effect when explicitly set (for complete backward compatibility).
		*
		* @type {Boolean}
		* @default null
		* @public
		*/
		contentUpperCase: null
	},

	/**
	* @private
	*/
	captureEvents: false,

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
	tools: [
		{name: 'point', kind: Control, classes: 'moon-tooltip-point', tag: 'svg', attributes: {viewBox: '0 0 3 5'}, allowHtml: true, content: pointerTemplate},
		{name: 'client', kind: Control, classes: 'moon-tooltip-label moon-header-font'}
	],

	/**
	* @private
	*/
	initComponents: function () {
		this.createChrome(this.tools);
		Popup.prototype.initComponents.apply(this, arguments);
	},

	/**
	* @private
	*/
	create: function () {
		Popup.prototype.create.apply(this, arguments);

		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// the contentUpperCase property is fully deprecated and removed. The legacy
		// property takes precedence if it exists.
		if (this.contentUpperCase !== null) this.uppercase = this.contentUpperCase;

		this.contentChanged();
	},

	/**
	* @private
	*/
	contentChanged: function () {
		this.detectTextDirectionality();
		var content = this.getContent();
		this.$.client.setContent( this.get('uppercase') ? util.toUpperCase(content) : content);
	},

	/**
	* @private
	*/
	uppercaseChanged: function () {
		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// contentUpperCase is fully deprecated and removed.
		if (this.contentUpperCase != this.uppercase) this.contentUpperCase = this.uppercase;
		this.contentChanged();
	},

	/**
	* @private
	*/
	contentUpperCaseChanged: function () {
		if (this.uppercase != this.contentUpperCase) this.uppercase = this.contentUpperCase;
		this.uppercaseChanged();
	},

	/**
	* @private
	*/
	positionChanged:function () {
		this.adjustPosition(true);
	},

	/**
	* @private
	*/
	requestShow: function (inSender, inEvent) {
		observer.set('active', this);
		this.activator = inEvent.originator;
		this.startJob('showJob', 'show', this.showDelay);
		return true;
	},

	/**
	* @private
	*/
	cancelShow: function () {
		this.stopJob('showJob');
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
			var b = this.node.getBoundingClientRect(),
				moonDefaultPadding = ri.scale(18),
				defaultMargin = ri.scale(21),
				floating = this.get('floating'),
				acNode = this.activator.hasNode(),
				pBounds = this.parent.getAbsoluteBounds(),
				acBounds = this.activator.getAbsoluteBounds(),
				acBorders;

			//* Calculate the difference between decorator and activating
			//* control's top, left, right differences, position tooltip against
			//* the activating control instead of the decorator accordingly.
			var paTopDiff = pBounds.top - acBounds.top,
				paLeftDiff =  acBounds.left - pBounds.left,
				paRightDiff = pBounds.left + pBounds.width - acBounds.left - acBounds.width,
				acRight = window.innerWidth - moonDefaultPadding - acBounds.left - acBounds.width,
				rtl = this.parent.rtl,	// Must check the parent because the text may have been auto-flipped due to content's direction
				anchorLeft, anchorSide, offset;

			if (this.position == 'auto') this.position = 'above';	// Choose a rational default

			// Restore to generic state
			this.removeClass('above');
			this.removeClass('below');
			this.removeClass('top');
			this.removeClass('bottom');
			this.removeClass('left-arrow');
			this.removeClass('right-arrow');

			if (rtl) {
				anchorLeft = pBounds.left + pBounds.width / 2 - moonDefaultPadding < b.width;
			} else {
				//* When there is not enough room on the left, using right-arrow for the tooltip
				anchorLeft = window.innerWidth - moonDefaultPadding - pBounds.left - pBounds.width / 2 >= b.width;
			}

			if (floating) {
				offset = acRight + moonDefaultPadding;
			} else {
				offset = paRightDiff;
				// we need to account for activator border widths if we are not floating
				acBorders = dom.calcBoxExtents(acNode, 'border');
			}

			//* Check if have a compound position, 2 words:
			if (this.position && this.position.indexOf(' ') >= 0) {
				anchorSide = true;
				var positions = this.position.split(' '),
					lr = positions[0],	// This should be either 'left' or 'right'
					tb = positions[1],	// This should be either 'top' or 'bottom'
					relTop = 0,
					relLeft = 0;

				this.addClass(tb);

				// Calculate the absolute top coordinate
				relTop = (acBounds.height / 2);
				if (tb == 'top') {
					// We're below, alter the absTop value as necessary
					relTop -= b.height;
				}

				// detrmine the side, and if RTL, just do the opposite.
				if ((lr == 'left' && !rtl) || (lr == 'right' && rtl)) {
					this.addClass('right-arrow');
					relLeft = -(b.width + defaultMargin + (floating ? 0 : acBorders.left));
				} else if ((lr == 'right' && !rtl) || (lr == 'left' && rtl)) {
					this.addClass('left-arrow');
					relLeft = acNode.clientWidth + defaultMargin + (floating ? acBounds.width - acNode.clientWidth : acBorders.right);
				}

				if (floating) {
					// Absolute (floating) measurements are based on the relative positions
					// Adjusting as needed.
					relTop = acBounds.top + relTop;
					relLeft = acBounds.left + relLeft;
				}

				this.applyPosition({'top': dom.unit(relTop, 'rem'), 'left': dom.unit(relLeft, 'rem'), 'right': 'auto'});

			} else {
				//* When there is not enough room in the bottom, move it above the
				//* decorator; when the tooltip bottom is within window height but
				//* set programmatically above, move it above
				if ((window.innerHeight - moonDefaultPadding) - (pBounds.top + pBounds.height) < b.height + defaultMargin || (this.position == 'above')) {
					this.addClass('above');
					if (floating) {
						this.applyPosition({'top': dom.unit((acBounds.top - b.height - defaultMargin),'rem'), 'left': dom.unit(acBounds.left + acBounds.width / 2, 'rem'), 'right': 'auto'});
					} else {
						this.applyPosition({'top': dom.unit(-(b.height + defaultMargin + paTopDiff + acBorders.top), 'rem'), 'left': dom.unit(acBounds.width / 2 + paLeftDiff, 'rem'), 'right': 'auto'});
					}
				}

				//* When there is not enough space above the parent container, move
				//* it below the decorator; when there is enough space above the
				//* parent container but is set programmatically, leave it below
				if (pBounds.top < (b.height + defaultMargin) || (this.position == 'below') || this.hasClass('below')) {
					this.removeClass('above');	// Above class may have been added in the `if` check above, then need to be removed because the tooltip didn't fit on the screen.
					this.addClass('below');
					if (floating) {
						this.applyPosition({'top': dom.unit(acBounds.top + acBounds.height + defaultMargin, 'rem'), 'left': dom.unit(acBounds.left + acBounds.width / 2, 'rem'), 'right': 'auto'});
					} else {
						this.applyPosition({'top': dom.unit(this.parent.node.clientHeight + defaultMargin + paTopDiff + acBorders.bottom, 'rem'), 'left': dom.unit(acBounds.width / 2 + paLeftDiff, 'rem'), 'right': 'auto'});
					}
				}

				if (anchorLeft) {
					this.addClass('left-arrow');
				} else {
					this.addClass('right-arrow');
					this.applyPosition({'margin-left': dom.unit(- b.width, 'rem'), 'left': 'auto'});
					this.applyStyle('right', dom.unit(acBounds.width / 2 + offset, 'rem'));
				}
			}
		}
	},

	/**
	* @private
	*/
	handleResize: function () {
		this.applyPosition({'margin-left': this.defaultLeft, 'bottom': 'auto'});
		this.adjustPosition(true);
		Popup.prototype.handleResize.apply(this, arguments);
	},

	// Accessibility

	/**
	* When `true`, the contents of the popup will be read when shown.
	*
	* @default true
	* @type {Boolean}
	* @public
	*/
	accessibilityReadAll: true,

	/**
	* @private
	*/
	accessibilityLive: 'off',

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['accessibilityReadAll', 'accessibilityRole', 'showing'], method: function () {
			this.startJob('alert', function () {
				this.setAriaAttribute('role', this.accessibilityReadAll && this.showing ? 'alert' : this.accessibilityRole);
			}, 100);
		}}
	]
});

module.exports.Content = TooltipContent;

}],'moonstone/StyleAnimator':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/StyleAnimator~StyleAnimator} kind.
* @module moonstone/StyleAnimator
* @deprecated
* @private
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	log = require('enyo/logger'),
	utils = require('enyo/utils'),
	Component = require('enyo/Component');

/**
* @typedef {Object} module:moonstone/StyleAnimator~StyleAnimator~AnimationDefinitionObject
* @property {String} name - An optional name for the animation. If not specified,
* a name will be generated.
* @property {Number} duration - An optional duration. If not specified, the
*	[default duration]{@link module:moonstone/StyleAnimator~StyleAnimator#defaultDuration} will be used.
* @property {Object} timingFunction - An optional timing function. If not specified, the
*	[default timing function]{@link module:moonstone/StyleAnimator~StyleAnimator#defaultTimingFunction} will be used.
* @property {String} direction - `'forward'` or `'backward'`. Currently unused.
* @property {Object[]} keyframes - Animation keyframes.
* @public
*/

/**
* Fires when an animation step occurs.
*
* @event module:moonstone/StyleAnimator~StyleAnimator#onStep
* @type {Object}
* @property {Object} animation - A reference to the animation that generated the event.
* @public
*/

/**
* Fires when the animation completes.
*
* @event module:moonstone/StyleAnimator~StyleAnimator#onComplete
* @type {Object}
* @property {Object} animation - A reference to the animation that completed.
* @public
*/

/**
* {@link module:moonstone/StyleAnimator~StyleAnimator} is a basic animation component.  Call
* [play()]{@link module:moonstone/StyleAnimator~StyleAnimator#play} to start the animation.  The animation will run for
* the period of time (in milliseconds) specified by its `duration`, subject to its
* `timingFunction` and `direction` (See: {@link module:moonstone/StyleAnimator~StyleAnimator~AnimationDefinitionObject}).
*
* @class StyleAnimator
* @extends module:enyo/Component~Component
* @private
* @deprecated
*/
module.exports = kind(
	/** @lends module:moonstone/StyleAnimator~StyleAnimator.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.StyleAnimator',

	/**
	* @private
	*/
	kind: Component,

	/**
	* @private
	*/
	events: {
		onStep: '',
		onComplete: ''
	},

	/**
	* @private
	* @lends module:moonstone/StyleAnimator~StyleAnimator.prototype
	*/
	published: {
		//* Default value used if the animation has no `duration` specified.
		defaultDuration: 1000,
		//* Default value used if the animation has no `timingFunction` specified.
		defaultTimingFunction: 'linear',
		//* Default value used if the animation has no `direction` specified.
		defaultDirection: 'forward'
	},

	/**
	* @private
	*/
	transitionProperty: dom.transition,

	/**
	* @private
	*/
	instructions: null,

	/**
	* @private
	*/
	stepInterval: null,

	/**
	* @private
	*/
	stepIntervalMS: 50,

	/**
	* @private
	*/
	startTime: null,

	/**
	* @private
	*/
	animations: null,

	/**
	* @private
	*/
	create: function () {
		Component.prototype.create.apply(this, arguments);
		this.animations = [];
	},

	/**
	* Returns animation object reflecting the passed-in properties, while also adding it to the
	* `animations` array.
	*
	* @param {module:moonstone/StyleAnimator~StyleAnimator~AnimationDefinitionObject} props - An animation definition hash.
	* @public
	*/
	newAnimation: function (props) {
		// TODO: Add documentation for the generated animation object
		if (this.animations && props.name && this.getAnimation(props.name)) {
			this.deleteAnimation(props.name);
		}

		props.keyframes = this.formatKeyframes(props.keyframes);
		props.instructions = this.generateInstructions(props.keyframes);

		var animation = {
			name:           props.name || this.generateAnimationName(),
			duration:       props.duration || this.defaultDuration,
			timingFunction: props.timingFunction ? this.updateTimingFunction (props.timingFunction) : this.updateTimingFunction (this.defaultTimingFunction),
			direction:      props.direction || this.defaultDirection,
			timeElapsed:    0,
			keyframes:      props.keyframes,
			instructions:   props.instructions,
			state:          'paused'
		};

		this.animations.push(animation);

		return animation;
	},

	/**
	* Resets transition properties to their pre-transition state for the specified animation.
	*
	* @param {String} name - Name of the animation.
	* @public
	*/
	reset: function (name) {
		this.getAnimation(name);
		this._reset(name);
	},

	/**
	* Plays the animation according to its properties.
	*
	* @param {String} name - Name of the animation.
	* @public
	*/
	play: function (name) {
		var animation = this.getAnimation(name);

		if (!animation) {
			return;
		}

		this.findStartAndEndValues(animation);
		this.applyValues(animation.startValues);
		this.cacheStartValues(animation.startValues);

		utils.asyncMethod(this.bindSafely(function () { this._play(name); }));
	},

	/**
	* Jumps directly to the end state of a given animation (without animating).
	*
	* @param {String} name - Name of the animation.
	* @public
	*/
	jumpToEnd: function (name) {
		var animation = this.getAnimation(name);

		if (!animation) {
			return;
		}

		this.findStartAndEndValues(animation);
		this.applyValues(animation.endValues);
	},

	/**
	* Pauses the animation, if it is currently playing.
	*
	* @param {String} name - Name of the animation.
	* @public
	*/
	pause: function (name) {
		var animation = this.getAnimation(name);
		if (animation.state === 'playing') {
			this._pause(name);
		}
	},

	/**
	* Looks up an animation by name in the animation list.
	*
	* @param {String} name - Name of the animation.
	* @public
	*/
	getAnimation: function (name) {
		var animation = null;
		for (var i = 0; i < this.animations.length; i++) {
			if (this.animations[i].name === name) {
				animation = this.animations[i];
				break;
			}
		}
		return animation;
	},

	/**
	* Removes an existing animation from `this.animations`, stopping it first, if necessary.
	*
	* @param {String} name - Name of the animation.
	* @public
	*/
	deleteAnimation: function (name) {
		var animation = this.getAnimation(name);

		if (!animation) {
			return false;
		}

		// Pause animation if necessary
		this._pause(name);

		// Splice out this animation
		this.animations.splice(this.animations.indexOf(animation), 1);
	},

	/**
	* Begins stepping through the animation.
	*
	* @public
	*/
	start: function () {
		this.beginStepping();
	},

	/**
	* Stops stepping through the animation.
	*
	* @public
	*/
	stop: function () {
		this.stopStepping();
	},

	/**
	* Generates a unique name based on the length of `this.animations`.
	*
	* @private
	*/
	generateAnimationName: function () {
		var count = this.animations.length,
			name = this.getName()+'_animation_'+count;
		while (this.getAnimation(name)) {
			name = this.getName()+'_animation_'+count;
		}
		return name;
	},

	/**
	* @private
	*/
	formatKeyframes: function (inKeyframes) {
		var frames = [];
		for (var index in inKeyframes) {
			frames.push({index: index, controls: inKeyframes[index]});
		}
		return frames;
	},

	/**
	* @private
	*/
	updateTimingFunction: function (inTimingFunction) {
		return inTimingFunction.match(/\bcubic-bezier/i) ? inTimingFunction : this.convertTimingFunctionToBezier(inTimingFunction);
	},

	/**
	* @private
	*/
	convertTimingFunctionToBezier: function (timing) {
		switch (timing) {
		case 'linear':
			return 'cubic-bezier(0, 0, 1, 1)';
		case 'ease':
			return 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';
		case 'ease-in':
			return 'cubic-bezier(.42, 0, 1, 1)';
		case 'ease-out':
			return 'cubic-bezier(0, 0, .58, 1)';
		case 'ease-in-out':
			return 'cubic-bezier(.42, 0, .58, 1)';
		}
		log.warn('Unknown timing function: ', timing);
		return timing;
	},

	/**
	* @private
	*/
	generateInstructions: function (inKeyframes) {
		var frames = inKeyframes,
			instructions = [],
			instruction,
			endValues;

		for (var i = 0; i < frames.length-1; i++) {
			for (var j = 0, control; (control = frames[i].controls[j]); j++) {
				for (var prop in control.properties) {

					instruction = {
						control: control.control,
						property: prop,
						startValue: control.properties[prop],
						startTime: frames[i].index
					};

					endValues = this.findInstructionEndValues(instruction, i+1, frames);

					// If no end values, skip this rule   TODO - is this right?
					if (!endValues) {
						continue;
					}

					// Mix in end values
					instructions.push(utils.mixin(instruction, endValues));
				}
			}
		}

		return instructions;
	},

	/**
	* @private
	*/
	findStartAndEndValues: function (inAnimation) {
		var frames = inAnimation.keyframes,
			startValues = {},
			endValues = {},
			c,
			cID;

		for (var i = 0; i < frames.length; i++) {
			for (var j = 0, control; (control = frames[i].controls[j]); j++) {
				c = control.control;
				cID = c.id;

				if (!startValues[cID]) {
					startValues[cID] = {
						control: c,
						properties: {}
					};
				}
				if (!endValues[cID]) {
					endValues[cID] = {
						control: c,
						properties: {}
					};
				}

				for (var prop in control.properties) {
					// If value is set to _current_, grab the computed value
					if (control.properties[prop] === 'current') {
						control.properties[prop] = dom.getComputedStyle(c.hasNode())[prop];
					}
					// at zero, every prop is a startvalue
					if (i === 0 || typeof startValues[cID]['properties'][prop] === 'undefined') {
						startValues[cID]['properties'][prop] = control.properties[prop];
					}

					endValues[cID]['properties'][prop] = control.properties[prop];
				}
			}
		}

		inAnimation.startValues = startValues;
		inAnimation.endValues = endValues;
	},

	/**
	* @private
	*/
	findInstructionEndValues: function (inInstruction, inFrameIndex, inFrames) {
		for (var i = inFrameIndex; i < inFrames.length; i++) {
			for (var j = 0, control; (control = inFrames[i].controls[j]); j++) {
				if (control.control !== inInstruction.control) {
					continue;
				}
				for (var prop in control.properties) {
					if (prop === inInstruction.property) {
						return {endValue: control.properties[prop], endTime: inFrames[i].index};
					}
				}
			}
		}
	},

	/**
	* @private
	*/
	_play: function (name) {
		this.startAnimation(name);
		this.beginStepping();
	},

	/**
	* @private
	*/
	startAnimation: function (name) {
		var animation = this.getAnimation(name);

		this.applyTransitions(name, 0);
		animation.state = 'playing';
		animation.timeElapsed = 0;
		animation.startTime = utils.perfNow();
	},

	/**
	* @private
	*/
	applyValues: function (inValues) {
		var item, prop, control;

		for(item in inValues) {
			control = inValues[item].control;

			for (prop in inValues[item].properties) {
				control.applyStyle(prop, inValues[item].properties[prop]);
			}
		}
	},

	/**
	* @private
	*/
	cacheStartValues: function (inStartValues) {
		var item, control;
		this.startValues = inStartValues;

		for(item in inStartValues) {
			control = inStartValues[item].control;
			inStartValues[item].properties[this.transitionProperty] = control[this.transitionProperty];
		}
	},

	/**
	* @private
	*/
	applyTransitions: function (name, inStartTime) {
		var animation = this.getAnimation(name),
			instructions = animation.instructions;
		for (var i = 0; i < instructions.length; i++) {
			if (instructions[i].startTime <= inStartTime && !instructions[i].started) {
				this.applyTransition(name, instructions[i]);
				instructions[i].started = true;
			}
		}
	},

	/**
	* @private
	*/
	applyTransition: function (name, inInstruction) {
		var animation = this.getAnimation(name),
			currentStyle = inInstruction.control[this.transitionProperty],
			transitionTime = (inInstruction.endTime - inInstruction.startTime)*animation.duration/(100*1000),
			newStyle = currentStyle ? currentStyle + ', ' : '',
			transitionProperty = this.transitionProperty;

		newStyle += inInstruction.property + ' ' + transitionTime + 's ' + animation.timingFunction + ' 0s';

		inInstruction.control.applyStyle(transitionProperty, newStyle);

		// we arbitrarily cache this value for cheaper lookup later
		inInstruction.control[transitionProperty] = newStyle;

		inInstruction.control.applyStyle(inInstruction.property, inInstruction.endValue);

		//  this.log(inInstruction.control.id+'.applyStyle('+transitionProperty+', '+newStyle+')');
		//  this.log(inInstruction.control.id+'.applyStyle('+inInstruction.property+', '+inInstruction.endValue+')');
	},

	/**
	* Begins stepping.
	*
	* @private
	*/
	beginStepping: function () {
		if (!this.stepInterval) {
			this.stepInterval = setInterval(this.bindSafely('_step'), this.stepIntervalMS);
		}
	},

	/**
	* Stops stepping.
	*
	* @private
	*/
	stopStepping: function () {
		if (this.stepInterval) {
			clearInterval(this.stepInterval);
			this.stepInterval = null;
		}
	},

	/**
	* Steps through each playing animation.
	*
	* @private
	*/
	_step: function () {
		var playingAnimations = false,
			now = utils.perfNow(),
			animation,
			elapsed,
			i;

		for (i = 0; (animation = this.animations[i]); i++) {
			if (animation.state === 'paused') {
				continue;
			}

			elapsed = now - animation.startTime;

			// If complete, bail
			if (elapsed > animation.duration) {
				if (animation.percentElapsed != 100) {
					this.applyTransitions(animation.name, 100);
				}
				animation.percentElapsed = 100;
				this.doStep({animation: animation});
				this.completeAnimation(animation.name);
				return;
			}

			animation.timeElapsed = elapsed;
			animation.percentElapsed = Math.round(elapsed*100/animation.duration);
			this.applyTransitions(animation.name, animation.percentElapsed);
			playingAnimations = true;

			// Bubble step event
			this.doStep({animation: animation});
		}

		if (!playingAnimations) {
			this.stop();
		}
	},

	/**
	* @private
	*/
	completeAnimation: function (name) {
		var animation = this.getAnimation(name);

		this._pause(name);
		this._reset(name);
		this.doComplete({animation: animation});
	},

	/**
	* Resets transition properties to their pre-transition values.
	*
	* @private
	*/
	_reset: function (name) {
		var animation = this.getAnimation(name);
		for(var item in animation.startValues) {
			animation.startValues[item].control.applyStyle(this.transitionProperty, animation.startValues[item].properties[this.transitionProperty]);
		}
	},

	/**
	* @private
	*/
	_pause: function (name) {
		var animation = this.getAnimation(name);
		animation.state = 'paused';
	}
});

}],'moonstone/MoonAnimator':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/MoonAnimator~MoonAnimator} kind.
* @module moonstone/MoonAnimator
*/

require('moonstone');

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	Animator = require('enyo/Animator'),
	animation = require('enyo/animation');



/**
* {@link module:moonstone/MoonAnimator~MoonAnimator} is an animation for breadcrumb panels.
*
* @class MoonAnimator
* @extends module:enyo/Animator~Animator
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/MoonAnimator~MoonAnimator.prototype */ {

	/**
	* A context in which to run the specified {@glossary event} handlers. If this is
	* not specified or is falsy, then the [window object]{@glossary window} is used.
	*
	* @name context
	* @type {Object}
	* @default undefined
	* @memberOf module:moonstone/MoonAnimator~MoonAnimator.prototype
	* @public
	*/

	/**
	* @private
	*/
	name: 'moon.MoonAnimator',

	/**
	* @private
	*/
	kind: Animator,

	/**
	* @private
	*/
	published: /** @lends module:moonstone/MoonAnimator~MoonAnimator.prototype */ {
		direction: 'forward',

		useBezier: false,

		configs: {}
	},

	/**
	* @private
	*/
	accuracy: 0.01,

	/**
	* @private
	*/
	values: {},

	/**
	* @private
	*/
	fractions: {},

	/**
	* @private
	*/
	debug: false,

	/**
	* @private
	*/
	constructed: function () {
		Animator.prototype.constructed.apply(this, arguments);
		this.buildBezierTable();
	},

	/**
	* @private
	*/
	bezier: function (t, x1, y1, x2, y2) {
		var p0 = {x: 0, y: 0}, p1 = {x: x1, y: y1}, p2 = {x: x2, y: y2}, p3 = {x: 1, y: 1};
		var cX = 3 * (p1.x - p0.x),
			bX = 3 * (p2.x - p1.x) - cX,
			aX = p3.x - p0.x - cX - bX;

		var cY = 3 * (p1.y - p0.y),
			bY = 3 * (p2.y - p1.y) - cY,
			aY = p3.y - p0.y - cY - bY;

		var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
		var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;

		return {x: x, y: y};
	},

	/**
	* Adds configuration for animation.
	*
	* The config can be specified for each object that needs to be animated.
	* Each config consists of two directions, forward and backward.
	*
	* ```javascript
	* panel: {
	* 	forward: { startValue: 0, endValue: 1, delay: 0, duration: 430, bezier: [.69,.01,.97,.59]},
	* 	backward: { startValue: 0, endValue: 1, delay: 0, duration: 500, bezier: [.06,.53,.38,.99] }
	* }
	* ```
	*
	* @param {Object} config
	* @public
	*/
	addConfig: function (config) {
		if (config) {
			util.mixin(this.configs, config);
		}
		this.buildBezierTable();
	},

	/**
	* Builds bezier curve table as a function of x and y.
	* Interpolates the intermediate values in the table.
	*
	* @private
	*/
	buildBezierTable: function () {
		if (!this.useBezier) return;

		var start = util.perfNow(), end;

		this.iterateConfig(this, function(obj, dir, config) {
			var last = {x:0, y:0},
				conf = config.bezier,	// Format: { x1, y1, x2, y2 }, values between 0 and 1
				ret, i, j;

			config.bezierTable = {};

			for (i = 0; i <= 1; i += this.accuracy){
				// Todo: Modify bezier function to have input as x and output as y.
				ret = this.bezier(i, conf[0], conf[1], conf[2], conf[3]);

				// Linear Interpolation
				//  - Bezier curve table which is having X as a key between 0 and 100.
				//  - Y value is having value between 0 and 1.
				for (j = last.x; j < ret.x; j += 0.01) {
					config.bezierTable[(j*100)<<0] = last.y + (j - last.x) * (ret.y-last.y) / (ret.x - last.x);
				}
				last = ret;
			}
			// Fill rest of table to 1
			for (i = (last.x*100)<<0; i <= 100; i++) {
				config.bezierTable[i] = 1;
			}
		});

		end = util.perfNow();

		if (this.debug) {
			this.log('Build Bezier Table takes', end - start, 'ms');
		}
	},


	/**
	* Plays the animation.
	*
	* @param {Object} props - As a convenience, this [hash]{@glossary Object} will be mixed
	*	directly into this [object]{@glossary Object}.
	* @public
	*/
	play: function (props) {
		var duration = 0;

		// Find maximum duration for the whole animation
		this.iterateConfig(this, function(obj, dir, config) {
			this.values[obj] = config.startValue;
			duration = Math.max(config.delay + config.duration, duration);
		}, this.direction);

		this.duration = duration;

		Animator.prototype.play.apply(this, arguments);

		return this;
	},

	/**
	* Reverses the direction of a running animation.
	*
	* @return {this} The callee for chaining.
	* @public
	*/
	reverse: function () {
		if (this.isAnimating()) {
			Animator.prototype.reverse.apply(this, arguments);
			this.iterateConfig(this, function(obj, dir, config) {
				// swap start and end values
				var startValue = config.startValue;
				config.startValue = config.endValue;
				config.endValue = startValue;
			}, this.direction);
			return this;
		}
	},

	/**
	* Runs the next step of the animation.
	*
	* @fires module:enyo/Animator~Animator#onStep
	* @fires module:enyo/Animator~Animator#onEnd
	* @private
	*/
	next: function () {
		this.t1 = util.perfNow();
		this.dt = this.t1 - this.t0;
		this.fraction = this.dt / this.duration;

		this.iterateConfig(this, function(obj, dir, config) {
			var fraction, f;

			if (this.dt - config.delay < 0) return;

			if (this.dt - config.delay >= config.duration) {
				this.values[obj] = config.endValue;
				this.fractions[obj] = 1;
				return;
			}

			if (this.useBezier) {
				// Use bezier function
				fraction = (this.dt - config.delay) / config.duration;
				f = this.fractions[obj] = config.bezierTable[(fraction*100)<<0];
				this.values[obj] = config.startValue + f * (config.endValue - config.startValue);
			} else {
				// Use easing function
				if (config.easing.length === 1) {
					// time independent
					this.fractions[obj] = animation.easedLerp(this.t0 + config.delay, config.duration, config.easing, this.reversed);
					this.values[obj] = config.startValue + this.fractions[obj] * (config.endValue - config.startValue);
				} else {
					this.values[obj] = animation.easedComplexLerp(this.t0 + config.delay, config.duration, config.easing, this.reversed,
						this.dt - config.delay, config.startValue, (config.endValue - config.startValue));
				}
			}
		}, this.direction);

		if (this.shouldEnd()) {
			this.fire('onStep');
			this.cancel();
			util.asyncMethod(this.bindSafely(function() {
				this.fire('onEnd');
			}));
		} else {
			this.fire('onStep');
			this.requestNext();
		}
	},

	/**
	* @private
	*/
	iterateConfig: function (scope, callback, direction) {
		var obj, dir;

		for (obj in this.configs) {
			if (direction) {
				// for specified direction
				callback.call(scope, obj, direction, this.configs[obj][direction]);
			} else {
				// for all directions
				for (dir in this.configs[obj]) {
					callback.call(scope, obj, dir, this.configs[obj][dir]);
				}
			}
		}
	}
});

}],'moonstone/MoonArranger':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/MoonArranger~MoonArranger} kind.
* @module moonstone/MoonArranger
*/

require('moonstone');

var
	kind = require('enyo/kind'),
	Arranger = require('layout/Arranger');

/**
*	{@link module:moonstone/MoonArranger~MoonArranger} is a
* {@link module:layout/Arranger~Arranger} that displays the active control.
* The active control is positioned on the right side of the container and the
* breadcrumbs are laid out to the left.
*
* For more information, see the documentation on
* [Arrangers](building-apps/layout/arrangers.html) in the Enyo Developer Guide.
*
* @class MoonArranger
* @extends module:layout/Arranger~Arranger
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/MoonArranger~MoonArranger.prototype */ {
	name: 'moon.MoonArranger',
	kind: Arranger,
	
	//* @protected
	size: function () {
		this.calcTransitionPositions();
	},
	/**
	* Called when panel is created dynamically.
	*
	* @protected
	*/
	calcTransitionPositions: function () {
		var container = this.container,
			panels = container.getPanels(),
			length = panels ? panels.length : 0;

		container.transitionPositions = {};

		for (var i=0; i<length; i++) {
			for (var j=0; j<length; j++) {
				container.transitionPositions[j + '.' + i] = (j - i);
			}
		}
	},
	arrange: function (controls, index) {
		var container = this.container,
			panels = container.getPanels(),
			active = container.clamp(index),
			control, xPos;

		for (var i=0; (control=panels[i]); i++) {
			xPos = container.transitionPositions[i + '.' + active];
			this.arrangeControl(control, {left: xPos*100});
		}
	},
	flowArrangement: function () {
		this.flowPanel();
		this.flowBreadcrumb();
	},
	flowPanel: function () {
		var container = this.container,
			arrangements = container.arrangement,
			panels = container.getPanels(),
			control, i;

		if (arrangements && arrangements.panel) {
			// Flow panel
			for (i=0; (control=panels[i]) && (arrangements.panel[i]); i++) {
				this.flowControl(control, arrangements.panel[i]);
			}
		}
	},
	flowBreadcrumb: function () {
		var container = this.container,
			arrangements = container.arrangement,
			range = this.container.getBreadcrumbRange(),
			arrangement, control, i;

		if (arrangements && arrangements.breadcrumb) {
			for (i=range.start; i<range.end; i++) {
				// Select breadcrumb to arrange for the given panel index
				// If we have a window of [2, 3] then we choose breadcrumb [0, 1].
				// If we have a window of [3, 4] then we choose breadcrumb [1, 0].
				control = container.getBreadcrumbForIndex(i);

				// For the first panel, we arrange all breadcrumb to offscreen area.
				arrangement = (i>=0) ? arrangements.breadcrumb[i] : {left: 0};
				
				this.flowControl(control, arrangement);
			}
		}
	},
	wrap: function (value, length) {
		return (value+length)%length;
	},
	flowControl: function (control, arrangement) {
		Arranger.positionControl(control, arrangement, '%');
	},
	destroy: function() {
		var panels = this.container.getPanels();
		for (var i=0, control; (control=panels[i]); i++) {
			Arranger.positionControl(control, {left: null, top: null});
			control.applyStyle('top', null);
			control.applyStyle('bottom', null);
			control.applyStyle('left', null);
			control.applyStyle('width', null);
		}
		Arranger.prototype.destroy.apply(this, arguments);
	},

	/**
	* Returns `true` if any panels will move in the transition from `fromIndex` to `toIndex`.
	* @private
	*/
	shouldArrange: function (fromIndex, toIndex) {
		if (!(fromIndex >= 0 && toIndex >= 0)) {
			return;
		}

		var transitionPositions = this.container.transitionPositions,
			panelCount = this.container.getPanels().length,
			panelIndex,
			from,
			to;

		if (transitionPositions) {
			for (panelIndex = 0; panelIndex < panelCount; panelIndex++) {
				from = transitionPositions[panelIndex + '.' + fromIndex];
				to = transitionPositions[panelIndex + '.' + toIndex];

				if (from !== to) {
					return true;
				}
			}
		}

		return false;
	}
});

}],'moonstone/BodyText':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/BodyText~BodyText} kind.
* @module moonstone/BodyText
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');
/**
* {@link module:moonstone/BodyText~BodyText} is a simple control for displaying body text in an app.
* It is designed to align with other text-based controls.
*
* @class BodyText
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/BodyText~BodyText.prototype */ {

	/**
	* @private
	*/
	name: 'moon.BodyText',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'moon-body-text moon-body-text-spacing moon-body-text-control',

	/**
	*
	* When `true`, HTML tags are allowed in the control's content.
	*
	* @type {Boolean}
	* @default true
	* @public
	*/
	allowHtml: true,

	/**
	* @private
	* @lends module:moonstone/BodyText~BodyText.prototype
	*/
	published: {

		/**
		* If `true`, text content is centered; otherwise, it is left-aligned.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		centered: false
	},

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.centeredChanged();
	},

	/**
	* @private
	*/
	contentChanged: function () {
		Control.prototype.contentChanged.apply(this, arguments);
		this.detectTextDirectionality();
		if (this.hasNode()) { this.bubble('onRequestSetupBounds'); }
	},

	/**
	* @private
	*/
	centeredChanged: function () {
		this.applyStyle('text-align', this.centered ? 'center' : null);
	}
});

}],'moonstone/Clock':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Clock~Clock} kind.
* @module moonstone/Clock
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control'),
	Signals = require('enyo/Signals');

var
	LocaleInfo = require('enyo-ilib/LocaleInfo'),
	Locale = require('enyo-ilib/Locale'),
	DateFmt = require('enyo-ilib/DateFmt'),
	dateFactory = require('enyo-ilib/DateFactory');

/**
* Used to set a static time for {@link module:moonstone/Clock~Clock} to display.
*
* @typedef {Object} module:moonstone/Clock~Clock~DateTimeObject
* @property {Number} year - The year to display.
* @property {Number} month - The month to display.
* @property {Number} day - The day to display.
* @property {Number} hour - The hour to display.
* @property {Number} minute - The minute to display.
* @property {Number} second - The second to display.
* @public
*/

/**
* {@link module:moonstone/Clock~Clock} is a control that displays clock information.
*
* Example:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Clock = require('moonstone/Clock');
*
* 	{kind: Clock}
* ```
*
* @class Clock
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Clock~Clock.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Clock',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'moon-clock',

	/**
	* @private
	* @lends module:moonstone/Clock~Clock.prototype
	*/
	published: {

		/**
		* Refresh time in milliseconds.
		*
		* @type {Number}
		* @default 1000
		* @public
		*/
		refresh: 1000,

		/**
		* A user-provided date; if `undefined`, system date is used. May be either a
		* JavaScript {@glossary Date} object or a {@link module:moonstone/Clock~Clock~DateTimeObject}
		* describing a static date/time to be displayed.
		*
		* @type {Date|module:moonstone/Clock~Clock~DateTimeObject}
		* @default undefined
		* @public
		*/
		date: undefined,

		/**
		* This property will be __private__ in the future and is deprecated as a __public__
		* property. It is used internally and _should not be used otherwise_.
		*
		* This is an [iLib]{@glossary ilib} Locale instance. Setting this directly may have
		* unexpected results. This class will automatically respond to application locale
		* changes that use the {@link module:enyo/i18n#updateLocale} method.
		*
		* @deprecated
		* @type {Locale}
		* @default null
		* @public
		*/
		locale: null
	},

	/**
	* @private
	*/
	observers: {
		modeChanged: ['mode']
	},

	/**
	* @private
	*/
	components: [
		{name: 'clock', kind: Control, classes: 'moon-bold-text'},
		{kind: Signals, onlocalechange: 'handleLocaleChangeEvent'}
	],

	/**
	* @private
	*/
	_timeDiff: 0,

	/**
	* [iLib]{@glossary ilib} locale info instance; it contains information about the
	* particular locale.
	*
	* @private
	*/
	ilibLocaleInfo: null,

	/**
	* Defines clock mode.
	* If `date` is assigned with JavaScript Date object or `null`, it will be `'normal'`.
	* If `date` is assigned with JavaScript object that indicates the exact time components
	* to be formatted into the clock, it will be `'static'`.
	*
	* @private
	*/
	mode: 'normal',

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.initILib();
		this.refreshJob();
	},

	/**
	* @private
	*/
	initILib: function () {
		this.locale = new Locale();
		this.ilibLocaleInfo = new LocaleInfo(this.locale);
		var clockPref = this.ilibLocaleInfo.getClock();
		var clock = clockPref !== 'locale' ? clockPref : undefined;

		var fmtParams = {
			locale: this.locale,
			type: 'time',
			time: 'hma',
			useNative: false,
			clock: clock,
			timezone: (this.mode === 'normal') ? 'local' : 'Etc/UTC'
		};

		this._tf = new DateFmt(fmtParams);
	},

	/**
	* @private
	*/
	refreshChanged: function () {
		this.startJob('refresh', this.bindSafely('refreshJob'), this.getRefresh());
	},

	/**
	* @private
	*/
	dateChanged: function () {
		if (this.date && !(this.date instanceof Date)) {
			this.set('mode', 'static');
		} else if(this.date && this.date instanceof Date) {
			this.set('mode', 'normal');
			this._timeDiff = (this.date.getTime() - Date.now()) || 0;
		} else {
			this.set('mode', 'normal');
			this._timeDiff = 0;
		}
		this.refreshJob();
	},

	/**
	* @private
	*/
	refreshJob: function () {
		this.updateDate();
		if (this.mode === 'normal') {
			this.startJob('refresh', this.bindSafely('refreshJob'), this.getRefresh());
		}
	},

	/**
	* @private
	*/
	modeChanged: function () {
		this._refresh();
	},

	/**
	* @private
	*/
	_refresh: function () {
		if (this._tf) {
			delete this._tf;
		}
		this.initILib();
	},

	/**
	* If user sets time without using a JavaScript Date object, this method
	* parses the object into an array for an `iLib.Date` object.
	*
	* @private
	*/
	parseStaticDate: function (date) {
		return {
			year: (date.year !== undefined) ? date.year : 0,
			month: (date.month !== undefined) ? date.month : 1,
			day: (date.day !== undefined) ? date.day : 0,
			hour: (date.hour !== undefined) ? date.hour : 0,
			minute: (date.min !== undefined) ? date.min : 0,
			second: (date.sec !== undefined) ? date.sec : 0,
			timezone: 'Etc/UTC'
		};
	},

	/**
	* @private
	*/
	updateDate: function () {
		var d, h;
		if (this.mode === 'normal') {
			d = new Date(Date.now() + this._timeDiff);
			h = d.getHours();
		} else {
			d = this.date;
			h = (this.date.hour) ? this.date.hour : 0;
		}
		this.updateTime(d, h);
	},

	/**
	* @private
	*/
	updateTime: function (inDate, inHour) {
		var date = (this.mode === 'normal') ? {unixtime: inDate.getTime(), timezone:'Etc/UTC'} : this.parseStaticDate(inDate),
			time = this._tf.format(dateFactory(date));
		this.$.clock.setContent(time);
	},

	/**
	* @private
	*/
	handleLocaleChangeEvent: function () {
		this._refresh();
		this.updateDate();
	}
});

}],'moonstone/VideoInfoBackground':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/VideoInfoBackground~VideoInfoBackground} kind.
* @module moonstone/VideoInfoBackground
*/

require('moonstone');

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

/**
* {@link module:moonstone/VideoInfoBackground~VideoInfoBackground} is a [control]{@link module:enyo/Control~Control} that provides a
* stylized background for [components]{@link module:enyo/Component~Component} placed in the
* [infoComponents]{@link module:moonstone/VideoPlayer~VideoPlayer#infoComponents} block of a {@link module:moonstone/VideoPlayer~VideoPlayer}.
* It is designed as a decorator, wrapping the components inside with the stylized background.
*
* Use the [orient]{@link module:moonstone/VideoInfoBackground~VideoInfoBackground#orient} property to set the orientation
* (`'left'` or `'right'`).
*
* For more details, see {@link module:moonstone/VideoPlayer~VideoPlayer}.
*
* @class VideoInfoBackground
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/VideoInfoBackground~VideoInfoBackground.prototype */ {

	/**
	* @private
	*/
	name: 'moon.VideoInfoBackground',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'moon-video-player-info-background',

	/**
	* @private
	* @lends module:moonstone/VideoInfoBackground~VideoInfoBackground.prototype
	*/
	published: {

		/**
		* Orientation of the control; valid values are `'left'` and `'right'`.
		*
		* @type {String}
		* @default 'left'
		* @public
		*/
		orient: 'left'
	},

	/**
	* @private
	*/
	initComponents: function() {
		Control.prototype.initComponents.apply(this, arguments);
		this.orientChanged();
	},

	/**
	* @private
	*/
	orientChanged: function() {
		this.addRemoveClass('right', this.orient != 'left');
		this.addRemoveClass('left', this.orient == 'left');
	}
});

}],'moonstone/ProgressBar':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ProgressBar~ProgressBar} kind.
* @module moonstone/ProgressBar
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control'),
	Animator = require('enyo/Animator');

var
	dom = require('enyo/dom'),
	ri = require('enyo/resolution'),
	util = require('enyo/utils'),
	log = require('enyo/logger'),
	Control = require('enyo/Control'),
	Popup = require('enyo/Popup');

var
	NumFmt = require('enyo-ilib/NumFmt');

/**
* Fires when progress bar finishes animating to a position. No event-specific data
* is sent with this event.
*
* @event module:moonstone/ProgressBar~ProgressBar#onAnimateProgressFinish
* @type {Object}
* @public
*/

/**
* {@link module:moonstone/ProgressBar~ProgressBar} is a [control]{@link module:enyo/Control~Control} that shows the current
* progress of a process in a horizontal bar.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		ProgressBar = require('moonstone/ProgressBar');
*
* 	{kind: ProgressBar, progress: 10}
* ```
*
* To animate a progress change, call the
* [animateProgressTo()]{@link module:moonstone/ProgressBar~ProgressBar#animateProgressTo} method:
*
* ```javascript
* 	this.$.progressBar.animateProgressTo(50);
* ```
*
* You may customize the color of the bar by applying a style via the
* [barClasses]{@link module:moonstone/ProgressBar~ProgressBar#barClasses} property, e.g.:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		ProgressBar = require('moonstone/ProgressBar');
*
* 	{kind: ProgressBar, barClasses: 'class-name'}
* ```
*
* For more information, see the documentation on [Progress
* Indicators]{@linkplain $dev-guide/building-apps/controls/progress-indicators.html}
* in the Enyo Developer Guide.
*
* @class ProgressBar
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ProgressBar~ProgressBar.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ProgressBar',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'moon-progress-bar',

	/**
	* @private
	* @lends module:moonstone/ProgressBar~ProgressBar.prototype
	*/
	published: {

		/**
		* Current position of progress bar.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		progress: 0,

		/**
		* Minimum progress value (i.e., no progress made).
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		min: 0,

		/**
		* Maximum progress value (i.e., process complete).
		*
		* @type {Number}
		* @default 100
		* @public
		*/
		max: 100,

		/**
		* CSS classes to apply to progress bar.
		*
		* @type {String}
		* @default 'moon-progress-bar-bar'
		* @public
		*/
		barClasses: 'moon-progress-bar-bar',

		/**
		* CSS classes to apply to background progress bar.
		*
		* @type {String}
		* @default 'moon-progress-bg-bar'
		* @public
		*/
		bgBarClasses: 'moon-progress-bg-bar',

		/**
		* Completion percentage for background process.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		bgProgress: 0,

		/**
		* CSS classes to apply to the popup label.
		*
		* @type {String}
		* @default 'moon-progress-bar-popup-label'
		* @public
		*/
		popupLabelClasses: 'moon-large-button-text moon-progress-bar-popup-label',

		/**
		* Color value of the popup.
		*
		* @type {String}
		* @default '#4d4d4d'
		* @public
		*/
		popupColor: '#4d4d4d',

		/**
		* When `true`, a popup bubble is displayed at the point of progress
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		popup: false,

		/**
		* When `true`, the popup displays a percentage value (rather than an absolute value).
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		showPercentage: true,

		/**
		* Popup width in pixels.
		*
		* @type {Number|String}
		* @default 'auto'
		* @public
		*/
		popupWidth: 'auto',

		/**
		* Popup height in pixels; value should be less than `72`.
		*
		* @type {Number|String}
		* @default 67
		* @public
		*/
		popupHeight: 67,

		/**
		* Popup offset in pixels.
		*
		* @type {Number}
		* @default 8
		* @public
		*/
		popupOffset: 8,

		/**
		* Custom popup content (ignored if `null`).
		*
		* @type {String|null}
		* @default null
		* @public
		*/
		popupContent: null,

		/**
		* When [orientation]{@link module:moonstone/ProgressBar~ProgressBar#orientation} is set to
		* 'vertical', the popup will show on the listed side.
		*
		* @type {String}
		* @default 'right'
		* @public
		*/
		popupSide: 'right',

		/**
		* When `true`, popup content will have locale-safe uppercasing applied.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		uppercase: true,

		/**
		* Sets the orientation of ProgressBar. Choices are: 'horizontal' (default) or 'vertical'.
		* Horizontal progressbars move right and left, vertical progressbars move up and down.
		*
		* @type {String}
		* @default 'horizontal'
		* @public
		*/
		orientation: 'horizontal',

		/**
		* @deprecated Replaced by [uppercase]{@link module:moonstone/Slider~Slider#uppercase}.
		*
		* Formerly defaulted to `true`, now defaults to `null` and will only have
		* an effect when explicitly set (for complete backward compatibility).
		*
		* @type {Boolean}
		* @default null
		* @public
		*/
		popupContentUpperCase: null
	},

	/**
	* @private
	*/
	events: {

		/**
		* {@link module:moonstone/ProgressBar~ProgressBar#onAnimateProgressFinish}
		*/
		onAnimateProgressFinish: ''
	},

	/**
	* @private
	*/
	components: [
		{name: 'progressAnimator', kind: Animator, onStep: 'progressAnimatorStep', onEnd: 'progressAnimatorComplete'},
		{name: 'bgbar', kind: Control},
		{name: 'bar', kind: Control}
	],

	/**
	* @private
	*/
	popupLeftCanvasWidth: 27, // Popup left canvas width in pixel

	/**
	* @private
	*/
	popupRightCanvasWidth: 27, // Popup right canvas width in pixel

	/**
	* @private
	*/
	popupComponents: [
		{name: 'popup', kind: Popup, classes: 'moon-progress-bar-popup above', accessibilityDisabled: true, components: [
			{name: 'drawingLeft', kind: Control, tag: 'canvas', classes: 'moon-progress-bar-popup-left'},
			{name: 'popupLabel', kind: Control, classes: 'moon-progress-bar-popup-center' },
			{name: 'drawingRight', kind: Control, tag: 'canvas', classes: 'moon-progress-bar-popup-right'}
		]}
	],

	/**
	* @private
	*/
	create: function () {
		this._nf = new NumFmt({type: 'percentage', useNative: false});
		Control.prototype.create.apply(this, arguments);
		this.initPopup();
		this.orientationChanged();
		this.progressChanged();
		this.barClassesChanged();
		this.bgBarClassesChanged();
		this.bgProgressChanged();
	},

	/**
	* @private
	*/
	initPopup: function () {
		if (this.popup) {
			// FIXME: Backwards-compatibility for deprecated property - can be removed when
			// the popupContentUpperCase property is fully deprecated and removed. The legacy
			// property takes precedence if it exists.
			if (this.popupContentUpperCase !== null) this.uppercase = this.popupContentUpperCase;
			this.createPopup();
			this.initPopupStyles();
		}
	},

	/**
	* @private
	*/
	createPopup: function () {
		this.createComponents(this.popupComponents, {owner: this});
		this.$.popup.setAutoDismiss(false);
		this.$.popup.show();
	},

	/**
	* @private
	*/
	initPopupStyles: function () {
		this.popupLabelClassesChanged();
		this.popupContentChanged();
		this.updatePopupLabelColor();
		this.updatePopupHeight();
		this.updatePopupOffset();
		this.popupWidthChanged();
	},

	/**
	* @private
	*/
	destroy: function () {
		if(this._nf){
			delete this._nf;
		}
		Control.prototype.destroy.apply(this, arguments);
	},

	rendered: function () {
		Control.prototype.rendered.apply(this, arguments);
		if(this.$.popup){
			this.drawToCanvas(this.popupColor);
		}
	},

	/**
	* @private
	*/
	orientationChanged: function () {
		var orient = this.get('orientation');
		this.addRemoveClass('moon-progress-bar-vertical', orient == 'vertical');
		this.addRemoveClass('moon-progress-bar-horizontal', orient == 'horizontal');
	},

	/**
	* @private
	*/
	popupSideChanged: function () {
		this.updatePopup(this.progress);
	},

	/**
	* @private
	*/
	barClassesChanged: function (inOld) {
		this.$.bar.removeClass(inOld);
		this.$.bar.addClass(this.barClasses);
	},

	/**
	* @private
	*/
	bgBarClassesChanged: function (inOld) {
		this.$.bgbar.removeClass(inOld);
		this.$.bgbar.addClass(this.bgBarClasses);
	},

	/**
	* @private
	*/
	bgProgressChanged: function () {
		this.bgProgress = this.clampValue(this.min, this.max, this.bgProgress);
		var p = this.calcPercent(this.bgProgress);
		this.updateBgBarPosition(p);
	},

	/**
	* @private
	*/
	progressChanged: function () {
		this.progress = this.clampValue(this.min, this.max, this.progress);
		this.updateBarPosition(this.calcPercent(this.progress));
		if (this.popup) {
			this.updatePopup(this.progress);
		}
	},

	/**
	* @private
	*/
	showPercentageChanged: function () {
		this.updatePopup(this.progress);
	},

	/**
	* @private
	*/
	clampValue: function (inMin, inMax, inValue) {
		return Math.max(inMin, Math.min(inValue, inMax));
	},

	/**
	* @private
	*/
	calcRatio: function (inValue) {
		return (inValue - this.min) / (this.max - this.min);
	},

	/**
	* @private
	*/
	calcPercent: function (inValue) {
		return this.calcRatio(inValue) * 100;
	},

	/**
	* @private
	*/
	updateBarPosition: function (inPercent) {
		this.$.bar.applyStyle(this.get('orientation') == 'vertical' ? 'height' : 'width', inPercent + '%');
	},

	/**
	* @private
	*/
	updateBgBarPosition: function (inPercent) {
		this.$.bgbar.applyStyle(this.get('orientation') == 'vertical' ? 'height' : 'width', inPercent + '%');
	},

	/**
	* Animates progress to the passed-in value.
	*
	* @param {Number} inValue  The destination number
	* @public
	*/
	animateProgressTo: function (inValue) {
		this.$.progressAnimator.play({
			startValue: this.progress,
			endValue: inValue,
			node: this.hasNode()
		});
	},

	/**
	* @private
	*/
	progressAnimatorStep: function (inSender) {
		this.setProgress(inSender.value);
		return true;
	},

	/**
	* @fires module:moonstone/ProgressBar~ProgressBar#onAnimateProgressFinish
	* @private
	*/
	progressAnimatorComplete: function (inSender) {
		this.doAnimateProgressFinish();
		return true;
	},

	/**
	* @private
	*/
	popupChanged: function () {
		if (this.popup && !this.$.popup) {
			this.createPopup();
			this.initPopupStyles();
			this.orientationChanged();
			this.render();
		} else if (!this.popup && this.$.popup) {
			this.$.popup.destroy();
		}
	},

	/**
	* @private
	*/
	updatePopup: function (val) {
		var usePercentage, percent, popupLabel, flip;
		if (this.popup) {
			usePercentage = this.showPercentage && this.popupContent === null;
			percent = this.calcPercent(val);
			popupLabel = usePercentage ? percent : val;
			flip = (this.get('orientation') == 'vertical') ? (this.get('popupSide') == 'left') : percent > 50;

			this.updatePopupPosition(percent);
			this.$.popup.addRemoveClass('moon-progress-bar-popup-flip-h', flip);
			this.$.popupLabel.addRemoveClass('moon-progress-bar-popup-flip-h', flip);

			this.updatePopupLabel(popupLabel);
		}
	},

	/**
	* Refactored out so that Slider can position the knob instead of the popup
	*
	* @private
	*/
	updatePopupPosition: function (percent) {
		if (this.popup) {
			this.$.popup.applyStyle(this.get('orientation') == 'vertical' ? 'bottom' : 'left', percent + '%');
		}
	},

	/**
	* @private
	*/
	popupLabelClassesChanged: function (was) {
		if (this.popup) {
			this.$.popupLabel.removeClass(was);
			this.$.popupLabel.addClass(this.popupLabelClasses);
		}
	},

	/**
	* @private
	*/
	updatePopupOffset: function () {
		if (this.popup) {
			this.$.popup.applyStyle('top', dom.unit(-(ri.scale(this.getPopupHeight() + this.getPopupOffset() + 5)), 'rem'));
		}
	},

	/**
	* Updates popup offset.
	*
	* @private
	*/
	popupOffsetChanged: function () {
		if (this.popup) {
			this.updatePopupOffset();
			this.drawToCanvas(this.popupColor);
		}
	},

	/**
	* Updates popup width.
	*
	* @private
	*/
	popupWidthChanged: function () {
		if (this.popup && this.popupWidth != 'auto') {
			this.$.popupLabel.applyStyle('width', dom.unit( this.getPopupWidth() - (this.popupLeftCanvasWidth + this.popupRightCanvasWidth) , 'rem'));
		}
	},

	/**
	* @private
	*/
	updatePopupHeight: function () {
		var h = this.getPopupHeight(),
			hRem = ri.scale(h);

		this.$.drawingLeft.setAttribute('height', hRem);
		this.$.drawingRight.setAttribute('height', hRem);
		this.$.popupLabel.applyStyle('height', dom.unit(ri.scale(h - 7), 'rem'));
		this.$.popup.applyStyle('height', dom.unit(hRem, 'rem'));
		this.$.popup.applyStyle('line-height', dom.unit(ri.scale(h - 6), 'rem'));
	},

	/**
	* Updates popup height.
	*
	* @private
	*/
	popupHeightChanged: function () {
		if (this.popup) {
			if (this.getPopupHeight() >= 72) {
				log.warn('This popupHeight API is designed for under 72 pixels.');
			}

			this.updatePopupHeight();
			this.popupOffsetChanged();
		}
	},

	/**
	* @private
	*/
	updatePopupLabelColor: function () {
		if (this.popup) {
			this.$.popupLabel.applyStyle('background-color', this.popupColor);
		}
	},

	/**
	* Updates popup color.
	*
	* @private
	*/
	popupColorChanged: function () {
		if (this.popup) {
			this.drawToCanvas(this.popupColor);
			this.updatePopupLabelColor();
		}
	},

	/**
	* Updates popup content.
	*
	* @private
	*/
	popupContentChanged: function () {
		var content;
		if (this.popup) {
			content = this.getPopupContent();
			this._popupContent = this.get('uppercase') ? util.toUpperCase(content) : content;
			// != null allows 0 but avoids undefined and null
			if (this._popupContent != null && this._popupContent !== '') {
				this.$.popupLabel.set('content', this._popupContent);
			}
		}
	},

	/**
	* @private
	*/
	uppercaseChanged: function () {
		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// popupContentUpperCase is fully deprecated and removed.
		if (this.popupContentUpperCase != this.uppercase) this.popupContentUpperCase = this.uppercase;
		this.popupContentChanged();
	},

	/**
	* @private
	*/
	popupContentUpperCaseChanged: function () {
		if (this.uppercase != this.popupContentUpperCase) this.uppercase = this.popupContentUpperCase;
		this.uppercaseChanged();
	},

	/**
	* @private
	*/
	updatePopupLabel: function (val) {
		var label;
		if (this.popup) {
			label = this._popupContent || this.calcPopupLabel(val);
			if (label != null && label !== '') {
				this.$.popupLabel.set('content', label);
			}
		}
	},

	/**
	* @private
	*/
	calcPopupLabel: function (val) {
		if (this.showPercentage) {
			val = this._nf.format(Math.round(val));
		}
		return val;
	},

		/**
	* @private
	*/
	drawToCanvas: function (bgColor) {
		bgColor = bgColor  || dom.getComputedStyleValue(this.$.knob.hasNode(), 'background-color');
		var h = ri.scale( this.getPopupHeight()+1 ), // height total
			hb = h - ri.scale(8), // height bubble
			hbc = (hb)/2, // height of bubble's center
			wre = ri.scale(26), // width's edge
			r = hbc, // radius is half the bubble height
			bcr = ri.scale(50), // bottom curve radius 50
			bcy = hb + bcr, //calculate the height of the center of the circle plus the radius to get the y coordinate of the circle to draw the bottom irregular arc
			lw = 1, // line width that will be tucked under the neighboring dom element's edge
			drawingLeft = this.$.drawingLeft,
			drawingRight = this.$.drawingRight,
			ctxLeft, ctxRight;

		if (drawingLeft) {
			ctxLeft = drawingLeft.hasNode().getContext('2d'),
			drawingLeft.setAttribute('width', ri.scale( this.popupLeftCanvasWidth) );

			// Set styles. Default color is knob's color
			ctxLeft.fillStyle = bgColor;
			// Draw shape with arrow on left
			ctxLeft.moveTo(0, h);
			// arc(x, y, radius, startAngle, endAngle, counterClockwise);
			ctxLeft.arc(wre, bcy, bcr, 1.35 * Math.PI, 1.485 * Math.PI, false);
			ctxLeft.lineTo(wre, hb);
			ctxLeft.lineTo(wre, 0);
			ctxLeft.arcTo(0, 0, 0, hbc, r);
			ctxLeft.lineTo(0, h);
			ctxLeft.fill();
			// Add a spacer line
			ctxLeft.beginPath();
			ctxLeft.lineWidth = lw+1;
			ctxLeft.strokeStyle = bgColor;
			ctxLeft.moveTo(wre+lw, 0);
			ctxLeft.lineTo(wre+lw, hb);
			ctxLeft.stroke();
		}

		if (drawingRight) {
			ctxRight = drawingRight.hasNode().getContext('2d');
			drawingRight.setAttribute('width', ri.scale( this.popupRightCanvasWidth) );

			// Set styles. Default color is knob's color
			ctxRight.fillStyle = bgColor;
			// Draw shape with arrow on right
			ctxRight.moveTo(lw, hb);
			ctxRight.arcTo(wre+lw, hb, wre+lw, hbc, r);

			ctxRight.arcTo(wre+lw, 0, lw, 0, r);
			ctxRight.lineTo(0, 0);
			ctxRight.fill();
			// Add a spacer line
			ctxRight.beginPath();
			ctxRight.lineWidth = lw+1;
			ctxRight.strokeStyle = bgColor;
			ctxRight.moveTo(0, 0);
			ctxRight.lineTo(0, hb);
			ctxRight.stroke();
		}
	},

	// Accessibility

	/**
	* @default progressbar
	* @type {String}
	* @see enyo/AccessibilitySupport~AccessibilitySupport#accessibilityRole
	* @public
	*/
	accessibilityRole: 'progressbar',

	/**
	* Custom value for accessibility (ignored if `null`).
	*
	* @type {String|null}
	* @default null
	* @public
	*/
	accessibilityValueText: null,

	/**
	* When `true`, VoiceReadout will be prevented.
	*
	* @default true
	* @type {Boolean}
	* @public
	*/
	accessibilityDisabled: true,

	/**
	* ProgressBar isn't spottable so we'll make it focusable manually
	*
	* @private
	*/
	tabIndex: -1,

	/**
	* @private
	*/
	ariaObservers: [
		// TODO: Observing $.popupLabel.content to minimize the observed members. Some refactoring
		// of the label determination could help here - rjd
		{path: ['accessibilityValueText', 'progress', 'popup', 'popupContent', 'showPercentage'], method: 'ariaValue'}
	],

	/**
	* Determines the text or value to set as the accessible value for the progress bar
	*
	* @private
	*/
	ariaValue: function () {
		var value = this.$.progressAnimator.isAnimating() ? this.$.progressAnimator.endValue : this.progress,
			usePercent = this.popup && this.showPercentage && !this.popupContent,
			text = this.accessibilityValueText ||
					this.popup && this.popupContent ||
					usePercent && this.calcPopupLabel(this.calcPercent(value)) ||
					value;
		this.setAriaAttribute('aria-valuetext', text);
	}
});

}],'moonstone/PlaylistSupport':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/PlaylistSupport~PlaylistSupport}
* mixin.
* @wip
* @module moonstone/PlaylistSupport
*/

var
	kind = require('enyo/kind');

/**
* The {@link module:moonstone/PlaylistSupport~PlaylistSupport} {@glossary mixin}
* should be used with player controls like audio player or video player, whose
* playback order is determined by various options.
*
* @mixin
* @wip
* @public
*/

var PlaylistSupport = {

	/**
	* @private
	*/
	name: 'PlaylistSupport',

	/**
	* Valid values are `'none'`, `'one'`, and `'all'`.  When `'none'`, audio is
	* played back with no repeating; when `'one'`, one audio track is repeated;
	* when `'all'`, the entire playlist is repeated.
	*
	* @type {String}
	* @default 'none'
	* @public
	*/
	repeat: undefined,

	/**
	* When `true`, audio tracks are shuffled for playback;
	* when `false`, audio tracks are played in queue order.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	shuffle: undefined,

	/**
	* After this amount of time, audio track is played from start.
	*
	* @type {Number}
	* @default 2
	* @public
	*/
	playPrevThreshold: undefined,

	/**
	* Playlist of tracks.
	*
	* @type {Collection}
	* @default null
	* @public
	*/
	collection: undefined,

	/**
	* Array of indices indicating playback order of tracks.
	*
	* @type {Array}
	* @default empty array
	* @private
	*/
	playOrder: [],

	/**
	* Whether to show jump controls by default.
	* Default jump control behavior is overridden for playlist.
	*
	* @type {Boolean}
	* @default true
	* @private
	*/
	showJumpControls: true,

	/**
	* When `true`, jump controls' default hold behavior is disabled.
	*
	* @type {Boolean}
	* @default true
	* @private
	*/
	jumpStartEnd: true,

	/**
	* Event handlers for playlist.
	* @private
	*/
	_playlist_Handlers: {
		onRequestAddAudio: '_addAudio',
		onRequestRemoveAudio: '_removeAudio',
		onPlayPrevious: 'previous',
		onPlayNext: 'next',
		onRequestShuffle: 'toggleShuffle',
		onRequestRepeat: 'toggleRepeat'
	},

	/**
	* @private
	*/
	observers: [
		{method: 'collectionChanged', path: ['collection']}
	],

	/**
	* Initializes properties.
	*
	* @method
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.repeat    = (this.repeat    === undefined) ? 'none' : this.repeat;
			this.shuffle    = (this.shuffle    === undefined) ? false : this.shuffle;
			this.collection   = (this.collection   === undefined) ? null : this.collection;
			this.autoPlayOnShuffle = (this.autoPlayOnShuffle === undefined) ? false : this.autoPlayOnShuffle;
			this.playPrevThreshold = (this.playPrevThreshold === undefined) ? 2 : this.playPrevThreshold;
		};
	}),

	/**
	* @method
	* @private
	*/
	dispatchEvent: kind.inherit(function (sup) {
		return function (sEventName, oEvent, oSender) {
			// Needed for proper onenter/onleave handling
			if (this.strictlyInternalEvents[sEventName] && this.isInternalEvent(oEvent)) {
				return true;
			}
			// FIXME: not sure why events can arrive without event objects, but we guard here for safety
			if (oEvent && !oEvent.delegate) {
				var handler = this._playlist_Handlers[sEventName];
				if (handler){
					this.cachePoint = true;
					if(this[handler](oSender, oEvent)) {
						return true;
					}
				}
			}
			return sup.apply(this, arguments);
		};
	}),

	/**
	* Returns a model containing information for next audio track.
	* The `repeat` and `shuffle` flags are referenced when determining the next
	* audio track to play.
	*
	* @public
	*/
	getNext: function (model) {
		var c = this.get('collection');
		if (this.repeat == 'one' || !c)
			return this.get('model');

		var	index = c.indexOf(model);
		if (index != -1) {
			index = this.shuffle ? this.playOrder.indexOf(index) : index;
			index++;
			index = this.repeat == 'all' ? index % c.length : Math.min(index, c.length-1);
		} else {
			// If it fails to find current on collection, we assume model is set directly by user.
			// We come back to collection by set first item from collection as next
			index = 0;
		}

		return this.getTrackAt(index);
	},

	/**
	* Returns a model containing information for previous audio track.
	* The `repeat` and `shuffle` flags are referenced when determining the next
	* audio track to play.
	*
	* @public
	*/
	getPrevious: function (model) {
		var c = this.get('collection');
		if (this.repeat == 'one' || !c)
			return this.get('model');

		var	index = c.indexOf(model);
		if (index != -1) {
			index = this.shuffle ? this.playOrder.indexOf(index) : index;
			index--;
			index = this.repeat == 'all' ? index % c.length : Math.max(index, 0);
		} else {
			// If it fails to find current on collection, we assume model is set directly by user.
			// We come back to collection by set first item from collection as previous
			index = 0;
		}

		return this.getTrackAt(index);
	},

	/**
	* Returns model containing information for audio track at specified index in
	* play order.
	*
	* @public
	*/
	getTrackAt: function (order) {
		var c = this.get('collection');
		return c ? c.at(this.shuffle ? this.playOrder[order] : order) : null;
	},

	/**
	* Adds audio track to playlist.
	*
	* @public
	*/
	addAudio: function (model) {
		var c = this.get('collection');
		if (c) c.add(model);
	},

	/**
	* @private
	*/
	_addAudio: function (sender, ev) {
		this.addAudio(ev.model);
	},

	/**
	* Removes audio track from playlist.
	*
	* @public
	*/
	removeAudio: function (model) {
		var c = this.get('collection');
		if (c) c.remove(model);
	},

	/**
	* @private
	*/
	_removeAudio: function (sender, ev) {
		this.removeAudio(ev.model);
	},

	/**
	* @private
	*/
	collectionChanged: function(prev, current) {
		this.shufflePlayOrder();
	},

	/**
	* Hook player default handler.
	*
	* @private
	*/
	jumpBackward: function (sender, ev) {
		this.previous(sender, ev);
	},

	/**
	* Hook player default handler.
	*
	* @private
	*/
	jumpForward: function (sender, ev) {
		this.next(sender, ev);
	},

	/**
	* Called when the Rewind or Previous button is pressed.
	* If `currentTime` is greater than `playPrevThreshold`, the play position
	* will be reset.
	*
	* @public
	*/
	previous: function (sender, ev) {
		if (this.getCurrentTime() > this.playPrevThreshold ||
			this.repeat == 'one' ||
			(this.repeat == 'none' && this.index === 0)) {
			this.seekTo(0);
			return;
		}
		var prevModel = this.getPrevious(this.get('model'));
		if (!prevModel || (this.repeat == 'none' && this.get('model') == prevModel)) {
			this.stop();
			return;
		}
		this.set('model', prevModel);
		this.play();
	},

	/**
	* Called when the Fast Forward or Next button is pressed.
	*
	* @public
	*/
	next: function (sender, ev) {
		var nextModel = this.getNext(this.get('model'));
		if (!nextModel || (this.repeat == 'none' && this.get('model') == nextModel)) {
			this.stop();
			this.emit('onPlaylistEnd', {playback: this, collection: this.collection});
			return;
		}
		this.set('model', nextModel);
		this.play();
	},

	/**
	* Called when the Shuffle button is pressed.  Toggles `shuffle` flag.
	* When the flag is set to `false`, tracks are played in queue order;
	* when it is set to `true`, tracks are played in shuffled order.
	*
	* @public
	*/
	toggleShuffle: function (shuffleOrder) {
		this.set('shuffle', !this.shuffle);
		if (this.shuffle) {
			this.shufflePlayOrder();
		}
	},

	/**
	* Shuffles play sequence.
	*
	* @protected
	*/
	shufflePlayOrder: function () {
		var c = this.get('collection'),
			length = c ? c.length : 0,
			idx = length,
			tmp, r;

		this.playOrder = [];
		for (var i=0; i<length; i++) {
			this.playOrder.push(i);
		}

		// While there remain elements to shuffle...
		while (0 !== idx) {

			// Pick a remaining element...
			r = Math.floor(Math.random() * idx);
			idx -= 1;

			// And swap it with the current element.
			tmp = this.playOrder[idx];
			this.playOrder[idx] = this.playOrder[r];
			this.playOrder[r] = tmp;
		}
	},

	/**
	* Changes value of `repeat` option referenced by `getPrevious()` and `getNext()`.
	* Valid values for `repeat`, in sequential order, are `'none'`, `'one'`, and `'all'`.
	*
	* @public
	*/
	toggleRepeat: function () {
		switch (this.repeat) {
			case 'none':
				this.set('repeat', 'one');
				break;
			case 'one':
				this.set('repeat', 'all');
				break;
			case 'all':
				this.set('repeat', 'none');
				break;
		}
	},

	/**
	* Called when playback of an audio track ends.
	* Determines whether to play next track, referencing the `repeat` flag.
	*
	* @public
	*/
	onPlayEnd: function (sender, ev) {
		if (!this.get('model')) return; // When set model as null, abort is call onEnd
		this.next();
	}
};

module.exports = PlaylistSupport;

}],'moonstone/CaptionDecorator':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/CaptionDecorator~CaptionDecorator} kind.
* @module moonstone/CaptionDecorator
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	utils = require('enyo/utils'),
	Control = require('enyo/Control');

/**
* {@link module:moonstone/CaptionDecorator~CaptionDecorator} wraps a control with a caption. The position of the
* caption is defined via the [side]{@link module:moonstone/CaptionDecorator~CaptionDecorator#side} property.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Button = require('moonstone/Button'),
* 		CaptionDecorator = require('moonstone/CaptionDecorator');
*
* 	{kind: CaptionDecorator, side: 'top', content: 'Top Label', components: [
* 		{kind: Button, content: 'My Button', ontap: 'buttonTapped'},
* 	]}
* ```
*
* @class CaptionDecorator
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/CaptionDecorator~CaptionDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'moon.CaptionDecorator',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	handlers: {
		onSpotlightFocus: 'spotFocus',
		onSpotlightBlur:  'spotBlur'
	},

	/**
	* @private
	* @lends module:moonstone/CaptionDecorator~CaptionDecorator.prototype
	*/
	published: {

		/**
		* The position of the caption with respect to the wrapped control; valid
		* values are `'top'`, `'bottom'`, `'left'`, and `'right'`.
		*
		* @type {String}
		* @default 'top'
		* @public
		*/
		side: 'top',

		/**
		* If `true`, the caption is only shown when the wrapped control has Spotlight
		* focus; otherwise, it is always visible.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		showOnFocus: false
	},

	/**
	* @private
	*/
	captionPositioned: false,

	/**
	* @private
	*/
	clientBounds: null,

	/**
	* @private
	*/
	captionBounds: null,

	/**
	* @private
	*/
	decoratorBounds: null,

	/**
	* @private
	*/
	classes: 'moon-button-caption-decorator',

	/**
	* @private
	*/
	components: [
		{kind: Control, name: 'leftCaption',     classes: 'moon-divider-text moon-caption left',   canGenerate: false},
		{kind: Control, name: 'topCaption',      classes: 'moon-divider-text moon-caption top',    canGenerate: false},
		{kind: Control, name: 'client',          classes: 'moon-divider-text moon-caption-client'},
		{kind: Control, name: 'rightCaption',    classes: 'moon-divider-text moon-caption right',  canGenerate: false},
		{kind: Control, name: 'bottomCaption',   classes: 'moon-divider-text moon-caption bottom', canGenerate: false}
	],

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.sideChanged();
		this.showOnFocusChanged();
	},

	/**
	* If [showOnFocus]{@link module:moonstone/CaptionDecorator~CaptionDecorator#showOnFocus} is `true`, caption
	* position is reset on reflow.
	*
	* @private
	*/
	reflow: function () {
		Control.prototype.reflow.apply(this, arguments);

		if (this.getShowOnFocus()) {
			this.resetCaptionPosition();
		}
	},

	/**
	* Retrieves [side]{@link module:moonstone/CaptionDecorator~CaptionDecorator#side} value.
	*
	* @private
	*/
	getSide: function () {
		return this.side || 'top';
	},

	// Change handlers

	/**
	* @private
	*/
	sideChanged: function () {
		var side = this.getSide();

		this.$.topCaption.canGenerate =     (side === 'top');
		this.$.rightCaption.canGenerate =   (side === 'right');
		this.$.bottomCaption.canGenerate =  (side === 'bottom');
		this.$.leftCaption.canGenerate =    (side === 'left');

		// Update the content, including position if needed
		this.contentChanged();

		// If this control has already been rendered, re-render to update caption side
		if (this.hasNode()) {
			// Re-render to display caption on proper side
			this.render();
		}
	},

	/**
	* @private
	*/
	showOnFocusChanged: function () {
		this.addRemoveClass('showOnFocus', this.getShowOnFocus());

		// If `showOnFocus` is `true`, reset caption position
		if (this.hasNode() && this.getShowOnFocus()) {
			this.resetCaptionPosition();
		}
	},

	/**
	* @private
	*/
	contentChanged: function () {
		this.$[this.getSide()+'Caption'].setContent(this.getContent());

		// If `showOnFocus` is `true`, reset caption position
		if (this.hasNode() && this.getShowOnFocus()) {
			this.resetCaptionPosition();
		}
	},

	// Event handlers

	/**
	* Adds `spotlight` class when button is focused, and calculates caption position
	* if required.
	*
	* @private
	*/
	spotFocus: function () {
		this.addClass('spotlight');

		if (this.hasNode() && this.getShowOnFocus()) {
			this.positionCaption();
		}
	},

	/**
	* Removes `spotlight` class when button is blurred.
	*
	* @private
	*/
	spotBlur: function () {
		this.removeClass('spotlight');
	},

	// Caption positioning

	/**
	* Returns current caption control.
	*
	* @private
	*/
	getCaptionControl: function () {
		return this.$[this.getSide()+'Caption'];
	},

	/**
	* Resets cached position values and repositions caption if currently spotted.
	*
	* @private
	*/
	resetCaptionPosition: function () {
		this.resetCachedBounds();
		this.captionPositioned = false;

		if (this.hasNode() && this.hasClass('spotlight')) {
			this.positionCaption();
		}
	},

	/**
	* Positions caption based on the value of [side]{@link module:moonstone/CaptionDecorator~CaptionDecorator#side}.
	*
	* @private
	*/
	positionCaption: function () {
		if (this.captionPositioned) {
			return;
		}

		var bounds = this.getDecoratorBounds(),
			clientBounds = this.getClientBounds(),
			captionBounds = this.getCaptionBounds();

		switch (this.getSide()) {
		case 'left':
			this.centerCaptionVertically(bounds, captionBounds);
			this.positionCaptionAtLeftEdge(bounds, clientBounds, captionBounds);
			break;
		case 'right':
			this.centerCaptionVertically(bounds, captionBounds);
			this.positionCaptionAtRightEdge(bounds, clientBounds, captionBounds);
			break;
		case 'top':
			this.centerCaptionHorizontally(bounds, captionBounds);
			this.positionCaptionAtTopEdge(bounds, clientBounds, captionBounds);
			break;
		case 'bottom':
			this.centerCaptionHorizontally(bounds, captionBounds);
			this.positionCaptionAtBottomEdge(bounds, clientBounds, captionBounds);
			break;
		}

		this.captionPositioned = true;
	},

	/**
	* Centers caption control vertically, relative to `this.decoratorBounds.height`.
	*
	* @private
	*/
	centerCaptionVertically: function (inBounds, inCaptionBounds) {
		this.getCaptionControl().applyStyle('top', dom.unit((inBounds.height - inCaptionBounds.height) / 2, 'rem'));
	},

	/**
	* Centers caption control horizontally, relative to `this.decoratorBounds.width`.
	*
	* @private
	*/
	centerCaptionHorizontally: function (inBounds, inCaptionBounds) {
		this.getCaptionControl().applyStyle('left', dom.unit((inBounds.width - inCaptionBounds.width) / 2, 'rem'));
	},

	/**
	* Positions caption at left edge of `this.$.client`.
	*
	* @private
	*/
	positionCaptionAtLeftEdge: function (inBounds, inClientBounds, inCaptionBounds) {
		var position = (-1 * inCaptionBounds.width) + ((inBounds.width - inClientBounds.width)/2) - inCaptionBounds.marginRight;
		this.getCaptionControl().applyStyle('left', dom.unit(position, 'rem'));
	},

	/**
	* Positions caption at right edge of `this.$.client`.
	*
	* @private
	*/
	positionCaptionAtRightEdge: function (inBounds, inClientBounds, inCaptionBounds) {
		var position = inBounds.width - ((inBounds.width - inClientBounds.width)/2);
		this.getCaptionControl().applyStyle('left', dom.unit(position, 'rem'));
	},

	/**
	* Positions caption at top edge of `this.$.client`.
	*
	* @private
	*/
	positionCaptionAtTopEdge: function (inBounds, inClientBounds, inCaptionBounds) {
		var position = (-1 * this.getCaptionBounds().height) + ((inBounds.height - inClientBounds.height)/2) - inCaptionBounds.marginBottom;
		this.getCaptionControl().applyStyle('top', dom.unit(position, 'rem'));
	},

	/**
	* Positions caption at bottom edge of `this.$.client`.
	*
	* @private
	*/
	positionCaptionAtBottomEdge: function (inBounds, inClientBounds, inCaptionBounds) {
		var position = inBounds.height - ((inBounds.height - inClientBounds.height)/2);
		this.getCaptionControl().applyStyle('top', dom.unit(position, 'rem'));
	},

	/**
	* Caches result from `this.getBounds()` call, saving in `this.decoratorBounds`.
	*
	* @private
	*/
	getDecoratorBounds: function () {
		this.decoratorBounds = this.decoratorBounds || this.getBounds();
		return this.decoratorBounds;
	},

	/**
	* Caches caption bounds, saving in `this.captionBounds`.
	*
	* @private
	*/
	getCaptionBounds: function () {
		this.captionBounds = this.captionBounds || utils.mixin(this.getCaptionControl().getBounds(), this.getCaptionMarginBounds());
		return this.captionBounds;
	},

	/**
	* Caches client bounds, saving in `this.clientBounds`.
	*
	* @private
	*/
	getClientBounds: function () {
		this.clientBounds = this.clientBounds || this.$.client.getBounds();
		return this.clientBounds;
	},

	/**
	* Clears cached bounds.
	*
	* @private
	*/
	resetCachedBounds: function () {
		this.clientBounds = null;
		this.captionBounds = null;
		this.decoratorBounds = null;
	},

	/**
	* Returns margins of caption control.
	*
	* @private
	*/
	getCaptionMarginBounds: function () {
		var margins = dom.calcMarginExtents(this.getCaptionControl().hasNode());
		return {
			marginTop:      margins.top,
			marginRight:    margins.right,
			marginBottom:   margins.bottom,
			marginLeft:     margins.left
		};
	}
});

}],'moonstone/ClampedText':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ClampedText~ClampedText} kind.
* @module moonstone/ClampedText
*/

var
	dom = require('enyo/dom'),
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

/**
* Limits the display of {@link module:enyo/Control~Control#content} to
* {@link module:moonstone/ClampedText~ClampedText#maxLines}.
*
* ```
* var
* 	kind = require('enyo/kind'),
* 	ClampedText = require('moonstone/ClampedText');
*
* {kind: ClampedText, content: 'some rather long content', maxLines: 3}
* ```
*
* @class ClampedText
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ClampedText~ClampedText.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ClampedText',
	
	/**
	* @private
	*/
	kind: Control,
	
	/**
	* @private
	*/
	classes: 'moon-clamped-text',

	/**
	* Maximum number of lines of content to show in collapsed state.
	*
	* @type {Number}
	* @default 3
	* @public
	*/
	maxLines: 3,

	/**
	* Determines if the text is clamped to `maxLines`. Setting 'always' will skip calculating if
	* the content can be clamped
	*
	* @type {Boolean|String}
	* @default true
	* @public
	*/
	clamped: true,

	/**
	* Read-only property indicating if the content length exceeds the `maxLines` to be
	* displayed. Only calculated if `clamped` is not 'always'.
	*
	* @type {Boolean|null}
	* @default null
	* @public
	*/
	canCollapse: null,

	/**
	* @private
	*/
	observers: [
		{method: 'clampPropertyChanged', path: ['content', 'maxLines', 'clamped']}
	],

	/**
	* Observer for content, maxLines, and clamped
	*
	* @private
	*/
	clampPropertyChanged: function (was, is, prop) {
		if (this.canCollapse !== null || this.calcCanCollapse()) {
			this.clamp();
		}
	},

	/**
	* @private
	*/
	calcContentHeight: function () {
		var node = this.hasNode();
		if (!this.contentHeight) {
			this.clamp(false);
			this.contentHeight = node.getBoundingClientRect().height;
		}
		return this.contentHeight;
	},

	/**
	* @private
	*/
	calcLineHeight: function () {
		if (!this.lineHeight) {
			this.lineHeight = parseInt(dom.getComputedStyleValue(this.hasNode(), 'line-height'), 10) || null;
		}
		return this.lineHeight;
	},

	/**
	* @private
	*/
	calcMaxHeight: function () {
		var lineHeight = this.calcLineHeight();
		return this.maxLines * lineHeight;
	},

	/**
	* @private
	*/
	calcCanCollapse: function () {
		if (this.hasNode()) {
			var contentHeight = this.calcContentHeight(),
				maxHeight = this.calcMaxHeight();
			this.set('canCollapse', contentHeight > maxHeight);
			return this.canCollapse;
		}
	},

	/**
	* @param {Boolean} force - Explicitly applies or removes line clamping style
	* @private
	*/
	clamp: function (force) {
		var clamp;
		if (this.clamped == 'always') {
			clamp = true;
		} else if (force === true || force === false) {
			clamp = force;
		} else {
			this.calcCanCollapse();
			clamp = this.clamped && this.canCollapse;
		}
		this.applyStyle('-webkit-line-clamp', clamp ? this.maxLines : null);
	},

	/**
	* @private
	*/
	rendered: function() {
		Control.prototype.rendered.apply(this, arguments);
		this.clampPropertyChanged();
	},

	/**
	* @private
	*/
	handleResize: function () {
		this.clampPropertyChanged();
	}
});
}],'moonstone/ItemOverlay':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ItemOverlay~ItemOverlay}
* kind and the {@link module:moonstone/ItemOverlay~ItemOverlaySupport} mixin.
* @module moonstone/ItemOverlay
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

/**
* {@link module:moonstone/ItemOverlay~ItemOverlay} is a supplementary control that helps to manage
* layout within a {@link module:moonstone/Item~Item}.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Icon = require('moonstone/Icon'),
* 		Item = require('moonstone/Item'),
* 		ItemOverlay = require('moonstone/ItemOverlay'),
* 		MarqueeText = require('moonstone/Marquee').Text;
*
* 	{kind: Item, components: [
* 		{kind: ItemOverlay, autoHide: false, right: true, components: [
* 			{kind: Icon, icon: 'arrowlargeup', small: true},
* 			{kind: Icon, icon: 'arrowlargedown', small: true}
* 		]},
* 		{kind: MarqueeText, content: 'Item   with   icons   auto   hides'}
* 	]}
* ```
*
* @class ItemOverlay
* @extends module:enyo/Control~Control
* @ui
* @public
*/
var ItemOverlay = module.exports = kind(
	/** @lends module:moonstone/ItemOverlay~ItemOverlay.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ItemOverlay',

	/**
	* @private
	*/
	kind: Control,

	/**
 	* @private
 	*/
	classes: 'moon-item-overlay',

	/**
	* @private
	*/
	published: /** @lends module:moonstone/ItemOverlay~ItemOverlay.prototype */ {

		/**
		* When `true`, the controls in the overlay are only shown on focus; in
		* other words, if the overlay is not focused, the controls will be hidden.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		autoHide: false,

		/**
		* When `true`, the controls in the overlay are right-aligned.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		right: false

	},

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.autoHideChanged();
		this.rightChanged();
	},

	/**
	* @private
	*/
	autoHideChanged: function() {
		this.addRemoveClass('auto-hide', this.get('autoHide'));
	},


	/**
	* @private
	*/
	rightChanged: function() {
		this.addRemoveClass('right', this.get('right'));
	}

});

/**
* The {@link module:moonstone/ItemOverlay~ItemOverlaySupport} {@glossary mixin}
* provides overlay layout support to {@link module:moonstone/Item~Item}.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Icon = require('moonstone/Icon'),
* 		Item = require('moonstone/Item'),
* 		ItemOverlaySupport = require('moonstone/ItemOverlay').ItemOverlaySupport,
* 		MarqueeText = require('moonstone/Marquee').Text;
*
* 	{kind: Item, mixins: [ItemOverlaySupport], beginningComponents: [
* 		{kind: Icon, icon: 'arrowlargeup', small: true},
* 		{kind: Icon, icon: 'arrowlargedown', small: true}
* 	],
* 	components: [
* 		{kind: MarqueeText, content: "Item   with   icons   auto   hides"}
* 	]}
* ```
*
* @mixin ItemOverlaySupport
* @public
*/
ItemOverlay.ItemOverlaySupport = {

	/**
	* @private
	*/
	name: 'moon.ItemOverlaySupport',

	/**
	* The components block to create left overlay. Only created in creation time.
	*
	* @type {Object}
	* @default null
	* @public
	*/
	beginningComponents: undefined,

	/**
	* The components block to create right overlay. Only created in creation time.
	*
	* @type {Object}
	* @default null
	* @public
	*/
	endingComponents: undefined,

	/**
	* When `true`, the beginning controls in the overlay are only shown on focus; in
	* other words, if the overlay is not focused, the controls will be hidden.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	autoHideBeginning: undefined,

	/**
	* When `true`, the ending controls in the overlay are only shown on focus; in
	* other words, if the overlay is not focused, the controls will be hidden.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	autoHideEnding: undefined,

	bindings: [
		{from: 'autoHideBeginning', to: '$.beginning.autoHide'},
		{from: 'autoHideEnding', to: '$.ending.autoHide'}
	],

	/**
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			this.beginningComponents = (this.beginningComponents === undefined) ? null : this.beginningComponents;
			this.endingComponents = (this.endingComponents === undefined) ? null : this.endingComponents;
			this.autoHideBeginning = (this.autoHideBeginning === undefined) ? false : this.autoHideBeginning;
			this.autoHideEnding = (this.autoHideEnding === undefined) ? false : this.autoHideEnding;
			sup.apply(this, arguments);
		};
	}),

	/**
	* @private
	*/
	initComponents: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.createComponents([{
				name: 'beginning', kind: ItemOverlay,
				classes: 'beginning', right: false, addBefore: this.controlParentName,
				components: this.beginningComponents
			},{
				name: 'ending', kind: ItemOverlay,
				classes: 'ending', right: true, addBefore: this.controlParentName,
				components: this.endingComponents
			}]);
		};
	})
};

}],'moonstone/ObjectActionDecorator':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/ObjectActionDecorator~ObjectActionDecorator} kind
* @module moonstone/ObjectActionDecorator
*/

require('moonstone');

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

/**
* {@link module:moonstone/ObjectActionDecorator~ObjectActionDecorator} is a
* decorator that wraps a spotlightable object. When the object is focused,
* additional controls are displayed, allowing the user to act on the object.
*
* The decorator supports two orientations: `'vertical'`, with object actions placed
* below the wrapped components, and `'horizontal'`, with object actions placed next to
* the components.
*
* The following is a vertical example:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Button = require('moonstone/Button'),
* 		Image = require('moonstone/Image'),
* 		Item = require('moonstone/Item'),
* 		ObjectActionDecorator = require('moonstone/ObjectActionDecorator');
*
* 	{
* 		kind: ObjectActionDecorator,
* 		orientation: 'vertical',
* 		components: [
* 			{kind: Item, components: [
* 				{name: 'image', kind: Image, src: 'moonstone/src/assets/default-music.png'}
* 			]}
* 		],
* 		actionComponents: [
* 			{kind: Button, name: 'Play', small: true, content: 'PLAY'},
* 			{kind: Button, name: 'Favorite', small: true, content: 'FAVORITE'},
* 			{kind: Button, name: 'Share', small: true, content: 'SHARE'}
* 		]
* 	}
* ```
*
* @class ObjectActionDecorator
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ObjectActionDecorator~ObjectActionDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ObjectActionDecorator',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'moon-objaction',

	/**
	* @private
	*/
	handlers: {
		onSpotlightFocused: 'spotFocused',
		onSpotlightBlur: 'spotBlur',
		onenter: 'enter',
		onleave: 'leave'
	},

	/**
	* @private
	* @lends module:moonstone/ObjectActionDecorator~ObjectActionDecorator.prototype
	*/
	published: {

		/**
		* Orientation of object actions in relation to focused components; `'vertical'` places
		* the object actions below the components, while `'horizontal'` places them next to the
		* components.
		*
		* @type {String}
		* @default 'vertical'
		* @public
		*/
		orientation: 'vertical',

		/**
		* When [orientation]{@link module:moonstone/ObjectActionDecorator~ObjectActionDecorator} is `'vertical'`, setting
		* `noStretch: false` causes the object actions to be stretched to fit the width of the
		* components above.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		noStretch: false
	},

	/**
	* @private
	*/
	components: [
		{name:'client', kind: Control, classes: 'moon-objaction-client'},
		{name:'actions', kind: Control, classes: 'moon-objaction-actions'}
	],

	/**
	* @private
	*/
	orientationChanged: function () {
		var vertical = this.getOrientation() == 'vertical';
		this.addRemoveClass('vertical', vertical);
		this.addRemoveClass('horizontal', !vertical);
	},

	/**
	* @private
	*/
	noStretchChanged: function() {
		this.$.actions.addRemoveClass('stretch', !this.noStretch);
	},

	/**
	* @private
	*/
	initComponents: function() {
		Control.prototype.initComponents.apply(this, arguments);
		if (this.actionComponents) {
			var owner = this.hasOwnProperty('actionComponents') ? this.getInstanceOwner() : this;
			this.$.actions.createComponents(this.actionComponents, {owner: owner});
		}
		this.orientationChanged();
		this.noStretchChanged();
	},

	/**
	* @private
	*/
	spotFocused: function(inSender, inEvent) {
		this.focused = true;
		this.updateActionsVisibility();
	},

	/**
	* @private
	*/
	spotBlur: function(inSender, inEvent) {
		this.focused = false;
		this.entered = false;
		this.updateActionsVisibility();
	},

	/**
	* @private
	*/
	enter: function(inSender, inEvent) {
		this.entered = true;
		this.updateActionsVisibility();
	},

	/**
	* @private
	*/
	leave: function(inSender, inEvent) {
		this.entered = false;
		this.updateActionsVisibility();
	},

	/**
	* @private
	*/
	updateActionsVisibility: function() {
		this.$.actions.applyStyle('opacity', (this.focused || this.entered) ? 1 : 0);
	}
});

}],'moonstone/Input':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Input~Input} kind.
* @module moonstone/Input
*/

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	Input = require('enyo/Input');

var
	Spotlight = require('spotlight');

/**
* {@link module:moonstone/Input~Input} is a Moonstone-styled input control, derived from
* {@link module:enyo/Input~Input}. Typically, a `moonstone/Input` is placed inside a
* {@link module:moonstone/InputDecorator~InputDecorator}, which provides styling, e.g.:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Input = require('moonstone/Input'),
* 		InputDecorator = require('moonstone/InputDecorator');
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
	/** @lends module:moonstone/Input~Input.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Input',

	/**
	* @private
	*/
	kind: Input,

	/**
	* @private
	*/
	classes: 'moon-body-text moon-input',

	/**
	* 13==Enter, 16777221==KeypadEnter
	*
	* @private
	*/
	spotlightIgnoredKeys: [13, 16777221],

	/**
	* @private
	* @lends module:moonstone/Input~Input.prototype
	*/
	published: {

		/**
		* When `true`, input blurs on Enter keypress (if focused).
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		dismissOnEnter: false
	},

	/**
	* @private
	*/
	handlers: {
		onkeyup    : 'onKeyUp',
		onblur     : 'onBlur',
		onfocus    : 'onFocus'
	},

	/**
	* Used only for [dismissOnEnter]{@link module:moonstone/Input~Input#dismissOnEnter} feature;
	* we cannot rely on `hasFocus()` in this case due to race condition.
	*
	* @private
	*/
	_bFocused: false,

	/**
	* @private
	*/
	onFocus: function () {
		var node = this.hasNode();

		if (this.dismissOnEnter) {
			var oThis = this;
			util.asyncMethod(this, function () {oThis._bFocused = true;});
		}
		// Force cursor to end of text during a generic focus event. Creating the input by compiling
		// a string of text with value="this.value" produces different initial caret position than
		// using node.setAttribute('value', this.value), which is what would happen any time after
		// the initial creation. The initial end-position of the caret is required to support
		// Virtual keyboards because without arrow-keys because normal left/right arrow navigation
		// in inputs is impossible, so the caret must be positioned at the end to allow for deletion
		// of the previous input. We are intentionally setting the value to force the cursor to the
		// end of the text. `selectionStart` is the obvious choice, but it is not supported in
		// certain types of fields (i.e. number, email).
		if (node) node.value = this.get('value');
	},

	/**
	* @private
	*/
	onBlur: function () {
		if (this.dismissOnEnter) {
			this._bFocused = false;
		}
	},

	/**
	* @private
	*/
	onKeyUp: function (oSender, oEvent) {
		if (this.dismissOnEnter) {
			if (oEvent.keyCode == 13 && this._bFocused) {
				this.blur();
				if (Spotlight.getPointerMode()) {
					Spotlight.unspot();
				}
			}
		}
	},

	/**
	* @private
	*/
	blur: function () {
		if (this.hasNode()) {
			this.node.blur();
		}
	},

	/**
	* @private
	*/
	left: function () {
		if (!this.hasNode() || this.node.selectionStart === 0) {
			return false;
		}
		return true;
	},

	/**
	* @private
	*/
	right: function () {
		if (!this.hasNode() || this.node.selectionStart == this.node.value.length) {
			return false;
		}
		return true;
	},

	/**
	* @private
	*/
	up: function () {
		return false;
	},

	/**
	* @private
	*/
	down: function () {
		return false;
	}
});

}],'moonstone/Scrollable':[function (module,exports,global,require,request){
/**
* Exports the {@link module:moonstone/Scrollable~Scrollable} mixin
* @wip
* @module moonstone/Scrollable
*/
var
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	ScrollMath = require('enyo/ScrollMath');

var
	Spotlight = require('spotlight');

/**
* The Scrollable mixin
* @wip
* @mixin
*/
var Scrollable = {
	// We make ourselves a Spotlight container so that 5-way
	// navigation stays within our bounds by default...
	spotlight: 'container',
	// But when focus enters us, we should spot the nearest
	// child, not whichever one was previously focused
	spotlightRememberFocus: false,

	suppressMouseEvents: true,

	/**
	* Specifies scrolling options to be used when scrolling an
	* item into view. Defaults:
	*
	*	{
	*		block: 'farthest',
	*		behavior: 'smooth'
	*	}
	*
	* @public
	*/
	scrollIntoViewOptions: null,

	// TODO: At least in the case of onSpotlightFocus, we
	// probably need to do something to ensure that we don't
	// have a conflict between the handler declared in the mixin
	// and any handler that might be declared in the kind that
	// uses the mixin. Possibilities include a) a hack like the
	// one currently employed in MarqueeSupport; b) a generalized
	// mechanism based on the same approach; or c) support in
	// general for multiple handlers for the same event, so that
	// base kinds, subkinds and instances can all register for
	// handlers independently.
	handlers: {
		onRequestScrollIntoView: 'handleRequestScrollIntoView',
		onSpotlightFocus: 'filterFocus'
	},

	// Override ScrollMath params
	scrollMath: {kind: ScrollMath, kFrictionDamping: 0.93},

	/**
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			var opts = {
				block: 'farthest',
				behavior: 'smooth'
			};

			sup.apply(this, arguments);

			this.scrollIntoViewOptions = this.scrollIntoViewOptions ? utils.mixin(opts, this.scrollIntoViewOptions) : opts;
			// Save original options so they can be restored after runtime changes
			this._scrollIntoViewOptions = utils.clone(this.scrollIntoViewOptions);
		};
	}),

	/**
	* Responds to child components' requests to be scrolled into view.
	*
	* @private
	*/
	handleRequestScrollIntoView: function (sender, event) {
		var bubble = false,
			def = this.scrollIntoViewOptions,
			opts;
		// Only scroll in 5-way mode or when explicitly requested to scroll in pointer mode
		if (!Spotlight.getPointerMode() || event.scrollInPointerMode === true) {
			if (this.canScrollX || this.canScrollY) {
				opts = {
					// If the event explicitly requests a full-page scroll, then we do so...
					block: event.scrollFullPage ? 'farthest' : (
						// ...otherwise, we honor the option set on the scroller for one-off
						// requests, but force smaller scroll increments when Spotlight
						// accelerating, since this produces smoother continuous scrolling
						// in 5-way mode.
						Spotlight.Accelerator.isAccelerating() ? 'nearest' : def.block
					),
					behavior: def.behavior
				};
				this.scrollToChild(event.originator, opts);
			} else {
				// If we don't need to scroll, bubble onRequestScrollIntoView so that
				// any scrollers above us in the control hierarchy can scroll as needed
				bubble = true;
			}
		}
		return !bubble;
	},

	/**
	* @private
	*/
	filterFocus: function (sender, event) {
		var prev,
			defBlock;

		switch (event.focusType) {
			case 'point':
				break;
			case '5-way':
				// If 5-way focus is coming from outside the scroller or from a scroll control,
				// we want to scroll the smallest distance possible to avoid a jarring experience;
				// otherwise, we respect the provided options
				if ((prev = event.previous)) {
					defBlock = this._scrollIntoViewOptions.block;
					this.scrollIntoViewOptions.block = (this.isScrollingChild(prev)) ? defBlock : 'nearest';
				}
				break;
			case 'default':
				// When focusType is 'default', Spotlight is trying to focus
				// a Control in response to something other than a point or a
				// 5-way move. For example, this can happen during
				// initialization, when the pointer is hidden, or when the app
				// regains focus.
				//
				// In the case where a scroller child is being focused by
				// default, we short-circuit the action because the child is
				// potentially not in view, and focusing would cause it to
				// scroll it into view for no reason apparent to the user.
				// Instead, we should focus a child we know to be visible.
				if (this.eventIsFromScrollingChild(event) && !this.eventIsFromVisibleChild(event)) {
					return this.spotFirstVisibleChild();
				}
				break;
			default:
				return false;
		}
	},

	/**
	* This check is factored out of `filterFocus()` so that the logic can be
	* overridden by the kind that includes the `Scrollable` mixin.
	*
	* @private
	*/
	eventIsFromVisibleChild: kind.inherit(function (sup) {
		return function (event) {
			if (sup === utils.nop) {
				return false;
			}
			else {
				return sup.apply(this, arguments);
			}			
		};
	}),

	/**
	* This check is factored out of `filterFocus()` so that the logic can be
	* overridden by the kind that includes the `Scrollable` mixin. For example,
	* NewDataList can perform this check more efficiently than we can do it here
	* in the general case.
	*
	* @private
	*/
	eventIsFromScrollingChild: kind.inherit(function (sup) {
		return function (event) {
			if (sup === utils.nop) {
				return this.isScrollingChild(event.originator);
			}
			else {
				return sup.apply(this, arguments);
			}
		};
	}),

	/**
	* This behavior is factored out of `filterFocus()` so that the logic can be
	* overridden by the kind that includes the `Scrollable` mixin. For example,
	* NewDataList can identify the first visible child more efficiently than we
	* can do it here in the general case.
	*
	* @private
	*/
	spotFirstVisibleChild: kind.inherit(function (sup) {
		return function () {
			if (sup === utils.nop) {
				// TODO: Implement. For now, only handling the more specific
				// case in moonstone/NewDataList.
				return false;
			}
			else {
				return sup.apply(this, arguments);
			}
		};
	}),

	/**
	* Extends the base implementation provided by the enyo Scrollable mixin
	* with Moonstone-specific functionality.
	*
	* @private
	*/
	_suppressMouseEvents: kind.inherit(function (sup) {
		return function () {
			var c;

			sup.apply(this, arguments);

			if (
				// If we're in pointer mode...
				Spotlight.getPointerMode() &&
				// ...and something is currently spotted...
				(c = Spotlight.getCurrent()) &&
				// ...and that thing is a scrolling child of ours...
				this.isScrollingChild(c)
			) {
				// ...then we unspot it, since the fact that we're suppressing
				// mouse events will prevent it from unspotting on its own
				Spotlight.unspot();
			}
		};
	})
};

module.exports = Scrollable;

}],'moonstone/AnimatedButton/AnimatedButtonSvg':[function (module,exports,global,require,request){
require('moonstone');

var
	kind = require('enyo/kind'),
	EventEmitter = require('enyo/EventEmitter');

var
	SvgRoot = require('svg/Root'),
	SvgPath = require('svg/Path'),
	SvgAnimate = require('svg/Animate');

module.exports = kind({
	name: 'moon.AnimatedButtonSvg',
	kind: SvgRoot,
	mixins: [EventEmitter],
	viewBox: '0 0 100 100',
	classes: 'moon-button-animated-root',
	_focused: false,
	components: [
		// Path to be animated
		{name: 'path', kind: SvgPath, classes: 'moon-button-animated-path', components: [
			// Animation
			{name: 'animation', kind: SvgAnimate, fill: 'freeze', keyframeLibrary: {
				focus: [
					'M-10,60c0.6-3.3,2.3,0.7,0-10c-1.3-5.9-4-15.5,0-20c6.5-7.4,10,30,10,30v40h2c0,0-17,0.6-12-10 C-6.7,83-10.9,65-10,60z',
					'M40,60c-2.3-14.3-2.3-13.9-10-30C22.8,15,12.3-1.3-7,0c-9.8,0.7,7,60,7,60v40h20c0,0,1.9-1.4,10-10 C35,84.7,42,72.2,40,60z',
					'M70,60c-9.3-17.2-24.4-30.5-40-40C17.7,12.5,4.8,8.2-7,10c-9.7,1.5,7,50,7,50v40h60c0,0,3.7,0,10-10 C75.2,81.8,75.8,70.6,70,60z',
					'M90,60c-16.8-25.2-30.5-5.2-50-10C27.6,46.9,10,15.7-7,20c-9.5,2.4,7,40,7,40v40h100c0,0,1-2.8,0-10 C99,82.8,96.9,70.3,90,60z',
					'M80,20c-6.6,36.3-26.3,51-40,40C30,52,14.8,13.5-7,20c-9.4,2.8,7,40,7,40v40h100c0,0,1-82.8,0-90 C99,2.8,83.8-1.2,80,20z',
					'M60,20c-2.7,13.2-10.2,27-20,40c-4.8,6.3-12.7,10.3-20,10C10.2,69.6,0,60,0,60v40h100c0,0,2.6-83.2,0-90 C94.5-4.5,64.3-1.1,60,20z',
					'M50,30c-4.1,7.2-11.2,9-20,10C11.8,42,5.5,26.6,0,30c-8.3,5.2,0,30,0,30v40h100c0,0,1.7-63,0-70 C95,8.8,64.2,4.8,50,30z',
					'M50,0c-7.3-1-21-1-30,0C16.2,0.4,5.7-0.8,0,0c-10.4,1.5,0,10,0,10v90h100c0,0,0-90.8,0-100 C100-15.6,53.9,0.5,50,0z'
				],
				blur: [
					'M100,0c0,0-40-0.3-50,0C40.1,0.3,0,0,0,0v100h100V0z',
					'M100,0C80.5,13.6,71.1,21.2,50,20C33.5,19.1,22.9,14.9,0,0v100h100V0z',
					'M100,10C74.2,71.1,68.9,35.2,50,40C26.3,46,26,77,0,10v90h100V10z',
					'M100,70C86.3,87.1,68.6,93.5,50,90C26.9,85.6,7.8,92,0,70v30h100V70z',
					'M100,99c0,0-39.9-0.2-50,0c-9.8,0.2-50,0-50,0v1h100V99z'
				]
			}}
		]}
	],
	events: {
		onEnd: ''
	},
	bindings: [
		{from: 'pathStyle', to: '$.path.style'},
		{from: 'duration', to: '$.animation.dur'}
	],
	create: function () {
		this.inherited(arguments);
		this.$.animation.on('end', function() { this.doEnd({focused: this._focused}); }, this);
	},
	startFocus: function () {
		this.$.animation.checkout('focus');
		this._focused = true;
		this.$.animation.start();
	},
	startBlur: function () {
		this.$.animation.checkout('blur');
		this._focused = false;
		this.$.animation.start();
	}
});

}],'moonstone/Table':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Table~Table},
* {@link module:moonstone/Table~TableCell}, and {@link module:moonstone/Table~TableRow} kinds.
* @module moonstone/Table
*/

var
	kind = require('enyo/kind'),
	Table = require('enyo/Table'),
	TableRow = require('enyo/TableRow'),
	TableCell = require('enyo/TableCell');

/**
* {@link module:moonstone/Table~TableCell} extends {@link module:enyo/TableCell~TableCell},
* adding Moonstone visual styling.
*
* @class TableCell
* @extends module:enyo/TableCell~TableCell
* @ui
* @public
*/
var TableCell = kind(
	/** @lends module:moonstone/Table~TableCell.prototype */ {

	/**
	* @private
	*/
	name: 'moon.TableCell',

	/**
	* @private
	*/
	kind: TableCell,

	/**
	* @private
	*/
	classes: 'moon-table-cell'
});

/**
* {@link module:moonstone/Table~TableRow} extends {@link module:enyo/TableRow~TableRow},
* adding Moonstone visual styling.
*
* @class TableRow
* @extends module:enyo/TableRow~TableRow
* @ui
* @public
*/
var TableRow = kind(
	/** @lends module:moonstone/Table~TableRow.prototype */ {

	/**
	* @private
	*/
	name: 'moon.TableRow',

	/**
	* @private
	*/
	kind: TableRow,

	/**
	* @private
	*/
	classes: 'moon-table-row',

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	*/
	defaultKind: TableCell
});

/**
* {@link module:moonstone/Table~Table} extends {@link module:enyo/Table~Table}, adding Moonstone visual styling.
*
* @class Table
* @extends module:enyo/Table~Table
* @ui
* @public
*/
var Table = module.exports = kind(
	/** @lends module:moonstone/Table~Table.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Table',

	/**
	* @private
	*/
	kind: Table,

	/**
	* @private
	*/
	classes: 'moon-table',

	/**
	* @private
	*/
	defaultKind: TableRow
});

/**
* Exports {@link module:moonstone/Table~TableRow}
*/
Table.Row = TableRow;

/**
* Exports {@link module:moonstone/Table~TableCell}
*/
Table.Cell = TableCell;

}],'moonstone/Marquee':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Marquee~MarqueeSupport} mixin and the {@link module:moonstone/Marquee~MarqueeText} &
* {@link module:moonstone/Marquee~MarqueeDecorator} kinds.
* @module moonstone/Marquee
*/

var kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	platform = require('enyo/platform'),
	util = require('enyo/utils'),
	Control = require('enyo/Control'),
	Component = require('enyo/Component'),
	Signals = require('enyo/Signals');

var
	options = require('../options'),
	HighlightText = require('../HighlightText');

var exports = module.exports = {};

/**
* There are a couple scenarios (window blurs and changing from pointer mode to 5-way) in which
* we'd like to stop an actively on-hover marqueeing control. This private instance manages
* those events centrally to minimize unnecessary Signal's subscribers.
*
* @private
*/
var observer = new Component({

	/**
	* @private
	*/
	hoverControl: null,

	/**
	* @private
	*/
	components: [
		{kind: Signals, onSpotlightModeChanged: 'handleModeChanged', onblur: 'handleBlur'}
	],

	/**
	* @private
	*/
	_setMarqueeOnHoverControl: function(oControl) {
		this.hoverControl = oControl;
	},

	/**
	* @private
	*/
	_getMarqueeOnHoverControl: function() {
		return this.hoverControl;
	},

	/**
	* @private
	*/
	handleModeChanged: function (sender, event) {
		if (!event.pointerMode && this.hoverControl) {
			this.hoverControl._marquee_leave();
		}
	},

	/**
	* @private
	*/
	handleBlur: function (sender, event) {
		if (this.hoverControl) {
			this.hoverControl._marquee_leave();
		}
	}
});

/**
* Fires to queue up a list of child animations.
*
* @event module:moonstone/Marquee~MarqueeSupport#onRequestMarquee
* @type {Object}
* @property {Object} originator - A reference to the originator of this event.
* @property {Boolean} marqueePause - The desired duration in milliseconds that the
* marquee will pause at the end of the animation, before resetting to the beginning.
* @property {Number} marqueeSpeed - The desired speed for the marquee animation,
* in pixels per second.
* @private
*/

/**
* Fires to start marquee animation in a child marquee.
*
* @event module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeStart
* @type {Object}
* @property {Object} originator - A reference to the originator of this event.
* @private
*/

/**
* Fires to halt marquee animation in a child marquee.
*
* @event module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeStop
* @type {Object}
* @property {Object} originator - A reference to the originator of this event.
* @private
*/

/**
* Fires to enable animation in a child marquee. No additional data is sent with this event.
*
* @event module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeEnable
* @type {Object}
* @private
*/

/**
* Fires to disable animation in a child marquee. No additional data is sent with this event.
*
* @event module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeDisable
* @type {Object}
* @private
*/

/**
* Fires when marquee ends. No additional data is sent with this event.
*
* @event module:moonstone/Marquee~MarqueeItem#onMarqueeEnded
* @type {Object}
* @private
*/

/**
* The {@link module:moonstone/Marquee~MarqueeSupport} [mixin]{@glossary mixin} should be used with controls
* that contain multiple marquees whose animation behavior should be synchronized. Calling
* [this.startMarquee()]{@link module:moonstone/Marquee~MarqueeSupport#startMarquee} or
* [this.stopMarquee()]{@link module:moonstone/Marquee~MarqueeSupport#stopMarquee} will start or stop all
* contained marquees.
*
* The following properties, defined on the base kind to which the mixin is applied,
* control the marquee behavior:
*
* [marqueeOnSpotlight]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnSpotlight}: When `true`, marquee
* starts when control is spotlight focused and ends when it is spotlight blurred.
*
* [marqueeOnHover]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnHover}: When `true`, marquee runs
* while control is hovered over with the mouse. This property is ignored if
* `marqueeOnSpotlight` is `true`.
*
* [marqueeOnRender]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnRender}: When `true`, marquee starts
* running as soon as control is rendered, and runs continuously.
*
* [marqueeSpeed]{@link module:moonstone/Marquee~MarqueeSupport#marqueeSpeed}: The speed of the marquee animation,
* in pixels per second.
*
* [marqueeDelay]{@link module:moonstone/Marquee~MarqueeSupport#marqueeDelay}: The delay between spotlight
* focus/hover and the start of the animation. (This is only used when either
* `marqueeOnSpotlight` or `marqueeOnHover` is `true`).
*
* [marqueeOnRenderDelay]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnRenderDelay}: Used when you want
* the marquee to run on render, after a specified delay.
*
* [marqueePause]{@link module:moonstone/Marquee~MarqueeSupport#marqueePause}: The duration in milliseconds that
* the marquee will pause at the end of the animation, before resetting to the beginning.
*
* @mixin
* @public
*/
var MarqueeSupport = {

	/**
	* @private
	*/
	name: 'MarqueeSupport',

	/**
	* @private
	*/
	_marquee_Handlers: {
		onRequestStartMarquee: '_marquee_requestStartMarquee',
		onSpotlightFocused: '_marquee_spotlightFocused',
		onSpotlightBlur: '_marquee_spotlightBlur',
		onenter: '_marquee_enter',
		onleave: '_marquee_leave',
		onMarqueeEnded: '_marquee_marqueeEnded',
		onresize: '_marquee_resize',

		// Stop propagation of requests coming from parent MarqueeSupport's, since
		// only this MarqueeSupport should be controlling its subordinate children
		onRequestMarquee: '_marquee_stopPropagation',
		onRequestMarqueeStart: '_marquee_stopPropagation',
		onRequestMarqueeStop: '_marquee_stopPropagation'
	},

	/**
	* @private
	*/
	_marquee_active: false,

	/**
	* When `true`, marquee starts when the control is {@link Spotlight} focused and ends
	* when it is spotlight blurred.
	*
	* @type {Boolean}
	* @default undefined
	* @public
	*/
	marqueeOnSpotlight: undefined,

	/**
	* When `true`, marquee runs while the control is hovered over with the mouse. This
	* property is ignored if [marqueeOnSpotlight]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnSpotlight}
	* is `true`.
	*
	* @type {Boolean}
	* @default undefined
	* @public
	*/
	marqueeOnHover: undefined,

	/**
	* When `true`, marquee starts running as soon as the control is rendered, and runs
	* continuously.
	*
	* @type {Boolean}
	* @default undefined
	* @public
	*/
	marqueeOnRender: undefined,

	/**
	* The speed of the marquee animation, in pixels per second.
	*
	* @type {Number}
	* @default undefined
	* @public
	*/
	marqueeSpeed: undefined,

	/**
	* The delay between spotlight focus/hover and the start of the animation. (This is only
	* used when either [marqueeOnSpotlight]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnSpotlight} or
	* [marqueeOnHover]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnHover} is `true`.)
	*
	* @type {Number}
	* @default undefined
	* @public
	*/
	marqueeDelay: undefined,

	/**
	* Used when you want the marquee to run on render, after a specified delay.
	*
	* @type {Number}
	* @default undefined
	* @public
	*/
	marqueeOnRenderDelay: undefined,

	/**
	* The duration in milliseconds that the marquee will pause at the end of the
	* animation, before resetting to the beginning.
	*
	* @type {Number}
	* @default undefined
	* @public
	*/
	marqueePause: undefined,

	/**
	* Initializes marquee timings.
	*
	* @method
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.marqueeOnSpotlight = (this.marqueeOnSpotlight === undefined) ? true : this.marqueeOnSpotlight;
			this.marqueeOnHover =  (this.marqueeOnHover ===   undefined) ? false :  this.marqueeOnHover;
			this.marqueeSpeed =    (this.marqueeSpeed ===     undefined) ? 60 :    this.marqueeSpeed;
			this.marqueeDelay =    (this.marqueeDelay ===     undefined) ? 1000 :  this.marqueeDelay;
			this.marqueePause =    (this.marqueePause ===     undefined) ? 1000 :  this.marqueePause;
			this.marqueeHold  =    (this.marqueeHold  ===     undefined) ? 2000 :  this.marqueeHold;
			this.marqueeOnRender = (this.marqueeOnRender  === undefined) ? false : this.marqueeOnRender;
			this.marqueeOnRenderDelay = (this.marqueeOnRenderDelay === undefined) ? this.marqueeDelay : this.marqueeOnRenderDelay;
		};
	}),

	/**
	* If {@link module:moonstone/Marquee~MarqueeSupport#marqueeOnRender} is `true`, kicks off marquee animation.
	*
	* @method
	* @private
	*/
	rendered: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			if (this.marqueeOnRender && !this.disabled) {
				this.startMarqueeCustomDelay(this.marqueeOnRenderDelay);
			}
		};
	}),

	/**
	* @method
	* @private
	*/
	teardownRender: kind.inherit(function (sup) {
		return function (caching) {
			if (caching && this._marquee_active) {
				this.stopMarquee();
			}
			sup.apply(this, arguments);
		};
	}),

	/**
	* @method
	* @private
	*/
	destroy: kind.inherit(function (sup) {
		return function () {
			if (this === observer._getMarqueeOnHoverControl()) {
				observer._setMarqueeOnHoverControl(null);
			}
			sup.apply(this, arguments);
		};
	}),

	/**
	* @method
	* @private
	*/
	dispatchEvent: kind.inherit(function (sup) {
		return function (sEventName, oEvent, oSender) {
			// Needed for proper onenter/onleave handling
			if (this.strictlyInternalEvents[sEventName] && this.isInternalEvent(oEvent)) {
				return true;
			}
			// FIXME: not sure why events can arrive without event objects, but we guard here for safety
			if (oEvent && !oEvent.delegate) {
				var handler = this._marquee_Handlers[sEventName];
				if (handler){
					this.cachePoint = true;
					if(this[handler](oSender, oEvent)) {
						return true;
					}
				}
			}
			return sup.apply(this, arguments);
		};
	}),

	/**
	* Handles external requests to kick off {@link module:moonstone/Marquee~MarqueeSupport#marqueeStart}.
	*
	* @private
	*/
	_marquee_requestStartMarquee: function () {
		if (this.marqueeOnRender) {
			this.stopMarquee();
			this.startMarquee();
			return true;
		}
	},

	/**
	* On focus, starts child marquees.
	*
	* @private
	*/
	_marquee_spotlightFocused: function (sender, ev) {
		this._marquee_isFocused = true;
		if (this.marqueeOnSpotlight) {
			this.startMarquee();
		}
	},

	/**
	* On blur, halts child marquees.
	*
	* @private
	*/
	_marquee_spotlightBlur: function (sender, ev) {
		this._marquee_isFocused = false;
		if (this.marqueeOnSpotlight && !this.marqueeOnRender) {
			this.stopMarquee();
		}
	},

	/**
	* @private
	*/
	_marquee_enter: function (sender, ev) {
		this._marquee_isHovered = true;
		if ((this.marqueeOnHover && !this.marqueeOnSpotlight) ||
		(this.disabled && this.marqueeOnSpotlight)) {
			if (this.marqueeOnHover) {
				observer._setMarqueeOnHoverControl(this);
			}
			this.startMarquee();
		}
	},

	/**
	* @private
	*/
	_marquee_leave: function (sender, ev) {
		this._marquee_isHovered = false;
		if ((this.marqueeOnHover && !this.marqueeOnSpotlight) || (this.disabled && this.marqueeOnSpotlight)) {
			if (this.marqueeOnHover) {
				observer._setMarqueeOnHoverControl(null);
			}
			if (!this.marqueeOnRender) {
				this.stopMarquee();
			}
		}
	},

	/**
	* @private
	*/
	_marquee_stopPropagation: function (sender, ev) {
		if (ev.originator != this) {
			return true;
		}
	},

	/**
	* When a child marquee animation completes, removes the child from
	* [marqueeWaitList]{@link module:moonstone/Marquee~MarqueeSupport#marqueeWaitList}.
	*
	* @private
	*/
	_marquee_marqueeEnded: function (sender, ev) {
		if (this._marquee_active) {
			util.remove(ev.originator, this.marqueeWaitList);
			if (this.marqueeWaitList.length === 0) {
				this._marquee_startHold();
				this._marquee_active = false;
			}
		}
		return true;
	},

	/**
	* @private
	*/
	_marquee_resize: function (sender, ev) {
		if (this.marqueeOnSpotlight && this._marquee_active) {
			this._marquee_active = false;
			this._marquee_startHold();
		}
	},

	/**
	* Starts timer to waterfall an
	* [onRequestMarqueeStart]{@link module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeStart} event
	* that kicks off marquee animation on all child marquees.
	*
	* @public
	*/
	startMarquee: function () {
		this.startMarqueeCustomDelay(this.marqueeDelay);
	},

	/**
	* Waterfalls an [onRequestMarqueeStop]{@link module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeStop}
	* event to halt all running child marquees.
	*
	* @public
	*/
	stopMarquee: function () {
		this.stopJob('marqueeSupportJob');
		this.stopJob('resetMarquee');
		this._marquee_active = false;
		this._marquee_stopChildMarquees();
	},

	/**
	* @public
	*/
	enableMarquee: function () {
		this._marquee_enableChildMarquees();
	},

	/**
	* @public
	*/
	disableMarquee: function () {
		this.stopMarquee();
		this._marquee_disableChildMarquees();
	},

	/**
	* Adds the passed-in [control]{@link module:enyo/Control~Control} to the list of marquee items.
	*
	* @param {Object} control  The [control]{@link module:enyo/Control~Control} to add.
	* @public
	*/
	addMarqueeItem: function (control) {
		this.marqueeWaitList.push(control);
	},

	/**
	* Restarts marquee if needed (depending on the
	* [marqueeOnSpotlight]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnSpotlight} and
	* [marqueeOnRender]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnRender} settings).
	*
	* @public
	*/
	resetMarquee: function () {
		if ((this.marqueeOnSpotlight && this._marquee_isFocused) ||
			(this.marqueeOnHover && this._marquee_isHovered) ||
			this.marqueeOnRender) {
			// Batch multiple requests to reset from children being hidden/shown
			this.startJob('resetMarquee', '_resetMarquee', 10);
		}
	},

	/**
	* Starts Marquee after a specified delay. Used to provide different delays for `onRender`
	* and `onSpotlight/Hover`.
	*
	* @param {Number} delay  Length of delay in milliseconds
	* @public
	*/
	startMarqueeCustomDelay: function (delay) {
		this._marquee_buildWaitList();

		if (this.marqueeWaitList.length === 0) {
			return;
		}

		this._marquee_active = true;
		this.startJob('marqueeSupportJob', '_marquee_startChildMarquees', delay);
	},

	/**
	* Stops and restarts the marquee animations.
	*
	* @private
	*/
	_resetMarquee: function () {
		this.stopMarquee();
		if (this.marqueeOnRender) { this.startMarqueeCustomDelay(this.marqueeOnRenderDelay); }
		else { this.startMarquee(); }
	},

	/**
	* Waterfalls request for child animations to build up
	* [marqueeWaitList]{@link module:moonstone/Marquee~MarqueeSupport#marqueeWaitList}.
	*
	* @fires module:moonstone/Marquee~MarqueeSupport#onRequestMarquee
	* @private
	*/
	_marquee_buildWaitList: function () {
		this.marqueeWaitList = [];
		this.waterfall('onRequestMarquee', {originator: this, marqueePause: this.marqueePause, marqueeSpeed: this.marqueeSpeed});
	},

	/**
	* Waterfalls event to kick off child marquee animations.
	*
	* @fires module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeStart
	* @private
	*/
	_marquee_startChildMarquees: function () {
		this.waterfall('onRequestMarqueeStart', {originator: this});
	},

	/**
	* Waterfalls event to halt child marquee animations.
	*
	* @fires module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeStop
	* @private
	*/
	_marquee_stopChildMarquees: function () {
		this.waterfall('onRequestMarqueeStop', {originator: this});
	},

	/**
	* Waterfalls event to enable child marquee animations.
	*
	* @fires module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeEnable
	* @private
	*/
	_marquee_enableChildMarquees: function () {
		this.waterfall('onRequestMarqueeEnable');
	},

	/**
	* Waterfalls event to disable child marquee animations.
	*
	* @fires module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeDisable
	* @private
	*/
	_marquee_disableChildMarquees: function () {
		this.waterfall('onRequestMarqueeDisable');
	},

	/**
	* Begins delayed restart of child marquee animations.
	*
	* @private
	*/
	_marquee_startHold: function () {
		this.startJob('marqueeSupportJob', 'startMarquee', this.marqueeHold);
	}
};

exports.Support = MarqueeSupport;

/**
* The {@link module:moonstone/Marquee~MarqueeItem} mixin is used to add marquee animation functionality
* to a control.
*
* @mixin
* @public
*/
var MarqueeItem = {

	/**
	* @private
	*/
	events: {

		/**
		* {@link module:moonstone/Marquee~MarqueeItem#onMarqueeEnded}
		*/
		onMarqueeEnded:''
	},

	/**
	* @private
	*/
	_marqueeItem_Handlers: {
		onRequestMarquee: '_marquee_requestMarquee',
		onRequestMarqueeStart: '_marquee_startAnimation',
		onRequestMarqueeStop: '_marquee_stopAnimation',
		onRequestMarqueeEnable: '_marquee_enable',
		onRequestMarqueeDisable: '_marquee_disable',
		ontransitionend: '_marquee_animationEnded'
	},

	/**
	* @private
	*/
	observers: {
		_marquee_contentChanged: ['content'],
		_marquee_centeredChanged: ['centered'],
		_marquee_wrapInsteadOfMarqueeChanged: ['wrapInsteadOfMarquee']
	},

	/**
	* @private
	*/
	bindings: [
		{from: '.allowHtml', to:'.$.marqueeText.allowHtml'}
	],

	/**
	* @private
	*/
	classes: 'moon-marquee',

	/**
	* @method
	* @private
	*/
	dispatchEvent: kind.inherit(function (sup) {
		return function (sEventName, oEvent, oSender) {
			if (sup.apply(this, arguments)) {
				return true;
			}
			if (oEvent && !oEvent.delegate) {
				var handler = this._marqueeItem_Handlers[sEventName];
				if (handler && this[handler](oSender, oEvent)) {
					return true;
				}
			}
		};
	}),

	/**
	* @private
	*/
	_marquee_enabled: true,

	/**
	* @private
	*/
	_marquee_distance: null,

	/**
	* @private
	*/
	_marquee_fits: null,

	/**
	* @private
	*/
	_marquee_puppetMaster: null,

	/**
	* @method
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.detectTextDirectionality();
			this._marquee_wrapInsteadOfMarqueeChanged();
		};
	}),

	/**
	* @method
	* @private
	*/
	rendered: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			// There is a known issue where a parent control that modifies the layout will
			// invalidate the measurements used to detect the proper alignment, which can
			// result in the appropriate text-align rule not being applied. For example, this
			// can occur with a moon.Header that is located inside a moon.Scroller which has
			// vertical scrollbars visible.
			this._marquee_detectAlignment();
			setTimeout(util.bindSafely(this, this._marquee_calcDistance), platform.firefox ? 100 : 16);
		};
	}),

	/**
	* @method
	* @private
	*/
	reflow: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this._marquee_invalidateMetrics();
			this._marquee_calcDistance();
		};
	}),

	/**
	* @method
	* @private
	*/
	showingChangedHandler: kind.inherit(function (sup) {
		return function (sender, event) {
			sup.apply(this, arguments);
			this._marquee_reset();
			if(this.showing && event.showing){
				this._marquee_calcDistance();
			} else {
				//if the marquee isn't showing we should reset its spotlight focus
				if (this._marquee_puppetMaster) {
					this._marquee_puppetMaster._marquee_spotlightBlur();
				} else if (this._marquee_spotlightBlur) {
					this._marquee_spotlightBlur();
				}
			}
		};
	}),

	/**
	* We must measure the content (after render) to determine if it's marqueeable, then to set
	* its alignment to left if the content was explicitly set to LTR earlier. This happens when
	* the locale is set to a RTL language, but your string contains no RTL characters in it.
	* Therefore it's LTR, and if it's marqueeable, should be left aligned, so it marquees in the
	* natural marqueeing direction.
	*
	* @param {Boolean} [forceAnimate]  Override the animation check (only accepts `true`). Use
	*	this if you know already, because you've already measured that you will need to marquee.
	* @param {Boolean} [forceRtl]  Override the internal RTL property, in case you know better.
	* @private
	*/
	_marquee_detectAlignment: function (forceAnimate, forceRtl) {
		var alignment = null,
			rtl = forceRtl || this.rtl;

		// We only attempt to set the alignment of this control if the locale's directionality
		// differs from the directionality of our current marqueeable control (as determined by
		// the control's content or is explicitly specified).
		if (Control.prototype.rtl != rtl || this.centered) {
			// If we will be marqueeing, we know the alignment needs to be set based on directionality.
			if (forceAnimate || this._marquee_shouldAnimate()) {
				if (rtl) {
					alignment = 'right';
				} else {
					alignment = 'left';
				}
			}
			// Alignment wasn't set yet, so we know we don't need to animate. Now we can center the text if we're supposed to.
			if (!alignment && this.centered) {
				alignment = 'center';
			}
		}

		this.set('_marquee_alignment', alignment);
	},

	/**
	* Reset the marquee distance if the alignment changes, since now we'll have to calculate the
	* size again.
	*
	* @private
	*/
	_marquee_alignmentChanged: function () {
		this.applyStyle('text-align', this._marquee_alignment);
		this._marquee_invalidateMetrics();
	},

	/**
	* @private
	*/
	_marquee_invalidateMetrics: function () {
		this._marquee_distance = null;
		this._marquee_fits = null;
	},

	/**
	* When the content of this control changes, updates the content of
	* `this.$.marqueeText` (if it exists).
	*
	* @private
	*/
	_marquee_contentChanged: function () {
		this.detectTextDirectionality();
		if (this.$.marqueeText) {
			this.$.marqueeText.setContent(this.content);
		}
		if (this.generated) {
			this._marquee_invalidateMetrics();
			this._marquee_detectAlignment();
			this._marquee_calcDistance();
		}
		this._marquee_reset();
	},

	/**
	* If this control needs to marquee, lets the event originator know.
	*
	* @private
	*/
	_marquee_requestMarquee: function (sender, ev) {
		if (!ev || !this.showing || this._marquee_fits) {
			return;
		}

		this._marquee_puppetMaster = ev.originator;
		ev.originator.addMarqueeItem(this);

		this.marqueePause = ev.marqueePause || 1000;
		this.marqueeSpeed = ev.marqueeSpeed || 60;
	},

	/**
	* Starts marquee animation.
	*
	* @private
	*/
	_marquee_startAnimation: function (sender, ev) {
		var distance;

		// if this control hasn't been generated, there's no need to follow through on
		// marquee requests as we'll be unable to correctly measure the distance delta yet
		if (!this.generated) return;

		// Lazy creation of _this.$.marqueeText_
		if (!this.$.marqueeText) {
			this._marquee_createMarquee();
		}

		distance = this._marquee_calcDistance();

		// If there is no need to animate, return early
		if (!this._marquee_shouldAnimate(distance)) {
			this._marquee_fits = true;
			this.doMarqueeEnded();
			return;
		}

		this._marquee_addAnimationStyles(distance);

		if (this.$.marqueeText) { return true; }
		//if we should animate marquee (distance > 0) but can`t do this
		//(this.$.marqueeText == undefined (marquee has children)) we fire doMarqueeEnded
		//to remove marquee from marquee wait list
		else { this.doMarqueeEnded(); }
	},

	/**
	* @private
	*/
	_marquee_enable: function () {
		this.set('_marquee_enabled', true);
	},

	/**
	* @private
	*/
	_marquee_disable: function () {
		this.set('_marquee_enabled', false);
		this._marquee_stopAnimation();
	},

	/**
	* Stops marquee animation.
	*
	* @fires module:moonstone/Marquee~MarqueeItem#onMarqueeEnded
	* @private
	*/
	_marquee_stopAnimation: function (sender, ev) {
		this.stopJob('stopMarquee');
		this._marquee_removeAnimationStyles();
		this.doMarqueeEnded();
	},

	/**
	* When animation ends, starts `this.stopMarquee` job.
	*
	* @private
	*/
	_marquee_animationEnded: function (sender, ev) {
		if (ev.originator !== this.$.marqueeText) {
			return;
		}

		this.startJob('stopMarquee', '_marquee_stopAnimation', this.marqueePause);
		return true;
	},

	/**
	* Returns `true` if this control has enough content to animate.
	*
	* @private
	*/
	_marquee_shouldAnimate: function (distance) {
		distance = (distance && distance >= 0) ? distance : this._marquee_calcDistance();
		return (distance > 0);
	},

	/**
	* Determines how far the marquee needs to scroll.
	*
	* @private
	*/
	_marquee_calcDistance: function () {
		var node, rect;

		if (this.$.marqueeText) {
			node = this.$.marqueeText.hasNode();
			if (node && this._marquee_distance == null && this.getAbsoluteShowing()) {
				rect = node.getBoundingClientRect();
				this._marquee_distance = Math.floor(Math.abs(node.scrollWidth - rect.width));

				//if the distance is exactly 0, then the ellipsis
				//most likely are hiding the content, and marquee does not
				//need to animate
				if(this._marquee_distance === 0) {
					this.applyStyle('text-overflow', 'clip');
					this.$.marqueeText && this.$.marqueeText.applyStyle('text-overflow', 'clip');
				} else {
					this.applyStyle('text-overflow', 'ellipsis');
					this.$.marqueeText && this.$.marqueeText.applyStyle('text-overflow', 'ellipsis');
				}
			}
		}

		return this._marquee_distance;
	},

	/**
	* Returns duration based on `distance` and `this.marqueeSpeed`.
	*
	* @private
	*/
	_marquee_calcDuration: function (distance) {
		return distance / this.marqueeSpeed;
	},

	/**
	* Creates a marquee-able `div` inside of `this`.
	*
	* @private
	*/
	_marquee_createMarquee: function () {
		// Do not create marqueeText when there are children
		// because we don't know what should be the controlParent
		if (this.children && this.children.length > 0) return;
		var marqueeText = {name: 'marqueeText', kind: Control, classes: 'moon-marquee-text', allowHtml: this.allowHtml, content: this.content},
			highlightText = null,
			wrapper;

		if (this instanceof HighlightText) {
			dom.setInnerHtml(this.hasNode(), '');
			highlightText = {renderDelegate: this.renderDelegate, highlightClasses: this.highlightClasses, search: this.search};
			marqueeText = util.mixin(marqueeText, highlightText);
		}
		wrapper = this.createComponent({name: 'marqueeTextWrapper', kind: Control, classes: 'moon-marquee-text-wrapper', components: [marqueeText]});
		wrapper.renderInto(this.hasNode());
		return true;
	},

	/**
	* @private
	*/
	_marquee_addAnimationStyles: function (distance) {
		if (!this.$.marqueeText) return;
		var duration = this._marquee_calcDuration(distance);

		this.$.marqueeText.addClass('animate-marquee');

		if (options.accelerate) {
			dom.transform(this.$.marqueeText, {translateZ: 0});
			this.$.marqueeText.applyStyle('transition', 'transform ' + duration + 's linear');
			this.$.marqueeText.applyStyle('-webkit-transition', '-webkit-transform ' + duration + 's linear');
		} else {
			this.$.marqueeText.applyStyle('transition', 'left ' + duration + 's linear');
			this.$.marqueeText.applyStyle('-webkit-transition', 'left ' + duration + 's linear');
		}

		// Need this timeout for FF!
		setTimeout(this.bindSafely(function () {
			if (options.accelerate) {
				dom.transform(this.$.marqueeText, {translateX: this._marquee_adjustDistanceForRTL(distance) + 'px'});
			} else {
				this.$.marqueeText.applyStyle('left', this._marquee_adjustDistanceForRTL(distance) + 'px');
			}
		}), platform.firefox ? 100 : 16);
	},

	/**
	* @private
	*/
	_marquee_removeAnimationStyles: function () {
		if (!this.$.marqueeText) {
			return;
		}

		this.$.marqueeText.applyStyle('transition-duration', '0s');
		this.$.marqueeText.applyStyle('-webkit-transition-duration', '0s');

		// Need this timeout for FF!
		/**
		* @private
		*/
		setTimeout(this.bindSafely(function () {
			this.$.marqueeText.removeClass('animate-marquee');
			if (options.accelerate) {
				dom.transform(this.$.marqueeText, {translateX: null, translateZ: null});
			} else {
				this.$.marqueeText.applyStyle('left', null);
			}
		}), platform.firefox ? 100 : 0);
	},

	/**
	* Flips distance value for RTL support.
	*
	* @private
	*/
	_marquee_adjustDistanceForRTL: function (distance) {
		return this.rtl ? distance : distance * -1;
	},

	/**
	* @private
	*/
	_marquee_reset: function () {
		this._marquee_invalidateMetrics();
		if (this._marquee_puppetMaster) {
			this._marquee_puppetMaster.resetMarquee();
		}
	},

	/**
	* @private
	*/
	_marquee_centeredChanged: function () {
		this._marquee_detectAlignment();
	},

	/**
	* @private
	*/
	_marquee_wrapInsteadOfMarqueeChanged: function(old) {
		if (this.wrapInsteadOfMarquee) {
			this.addClass('allow-wrap');
			if (this.$.marqueeText) {
				this.$.marqueeTextWrapper.destroy();
				this.render();
			}
		}
		if (old && !this.wrapInsteadOfMarquee) {
			this.removeClass('allow-wrap');
			// FIXME: Performing creation here to workaround potential WebKit measuring issue
			// with scrollWidth (under-measures by 10px when marquee components are destroyed
			// when we switch wrapInsteadofMarquee from `false` to `true`, and back to `false`).
			this._marquee_createMarquee();
		}
	}
};

exports.Item = MarqueeItem;

/**
* {@link module:moonstone/Marquee~MarqueeText} is a basic text control that supports marquee animation.
* When MarqueeText objects are used inside a
* [MarqueeDecorator]{@link module:moonstone/Marquee~MarqueeDecorator}, the decorator synchronizes
* their start times; the user may start a marquee programmatically by calling
* [startMarquee()]{@link module:moonstone/Marquee~MarqueeSupport#startMarquee}.
*
* ```
* 	var
* 		kind = require('enyo/kind'),
* 		Header = require('moonstone/Header'),
* 		MarqueeSupport = require('moonstone/Marquee').Support,
* 		MarqueeText = require('moonstone/Marquee').Text;
*
* 	module.exports = kind({
* 		name: Header,
* 		mixins: [MarqueeSupport],
* 		marqueeSpeed: 100,
* 		components: [
* 			{kind: MarqueeText, content: 'longText+longText'},
* 			{kind: MarqueeText, content: 'longText'}
* 		],
* 		rendered: function () {
* 			this.startMarquee();
* 		}
* 	});
* ```
*
* To add the marquee feature to a kind, simply use the
* [MarqueeSupport]{@link module:moonstone/Marquee~MarqueeSupport} mixin:
*
* ```
* 	var
* 		kind = require('enyo/kind'),
* 		Button = require('enyo/Button'),
* 		MarqueeSupport = require('moonstone/Marquee').Support,
* 		MarqueeText = require('moonstone/Marquee').Text;
*
* 	module.exports = kind({
* 		name: 'MarqueeButton',
* 		kind: Button,
* 		mixins: [MarqueeSupport],
* 		components: [
* 			{kind: MarqueeText}
* 		],
* 		contentChanged: function () {
* 			this.$.marqueeText.setContent(this.content);
* 		}
* 	});
* ```
*
* @class MarqueeText
* @extends module:enyo/Control~Control
* @mixes module:moonstone/Marquee~MarqueeItem
* @ui
* @public
*/
exports.Text = kind(
	/** @lends module:moonstone/Marquee~MarqueeText.prototype */ {

	/**
	* @private
	*/
	name: 'moon.MarqueeText',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	mixins: [MarqueeItem],

	/**
	* @private
	* @lends module:moonstone/Marquee~MarqueeText.prototype
	*/
	published: {

		/**
		* The speed of the marquee animation, in pixels per second.
		*
		* @type {Number}
		* @default 60
		* @public
		*/
		marqueeSpeed: 60,

		/**
		* The duration in milliseconds that the marquee will pause at the end of the
		* animation, before resetting to the beginning.
		*
		* @type {Number}
		* @default 1000
		* @public
		*/
		marqueePause: 1000,

		/**
		* When `true`, marqueeing will not occur.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false,

		/**
		* When `true`, text is centered; otherwise, it is left-aligned.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		centered: false,

		/**
		* When `true`, element wraps instead of marqueeing.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		wrapInsteadOfMarquee: false
	}
});

/**
* {@link module:moonstone/Marquee~MarqueeDecorator} is a wrapper for {@link module:moonstone/Marquee~MarqueeText} objects.
*
* @class MarqueeDecorator
* @extends module:enyo/Control~Control
* @mixes module:moonstone/Marquee~MarqueeSupport
* @ui
* @public
*/
var MarqueeDecorator = kind(
	/** @lends module:moonstone/Marquee~MarqueeDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'moon.MarqueeDecorator',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	mixins: [MarqueeSupport],

	/**
	* @private
	*/
	style: 'overflow: hidden;'
});

/**
* The {@link module:moonstone/Marquee~MarqueeDecorator} export
* @public
*/
exports.Decorator = MarqueeDecorator;

},{'../options':'moonstone/options','../HighlightText':'moonstone/HighlightText'}],'moonstone/IconButton':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/IconButton~IconButton} kind.
* @module moonstone/IconButton
*/

var
	kind = require('enyo/kind');

var
	Icon = require('../Icon');

/**
* {@link module:moonstone/IconButton~IconButton} is a {@link module:moonstone/Icon~Icon} that acts like a button. Specify
* the icon image by setting the [src]{@link module:moonstone/Icon~Icon#src} property to a URL
* indicating the image file's location.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		IconButton = require('moonstone/IconButton');
*
* 	{kind: IconButton, src: 'moonstone/src/assets/search.png'}
* ```
*
* If you want to combine an icon with text inside of a button, use a
* {@link module:moonstone/Icon~Icon} inside a
* {@link module:moonstone/Button~Button}.
*
* Moonstone supports two methods for displaying icons; in addition to specifying
* traditional image assets in `src`, you may use icons that are stored as single
* characters in a special symbol font. To do this, set the value of the
* [icon]{@link module:moonstone/Icon~Icon#icon} property to a string representing
* an icon name, e.g.:
*
* ```javascript
* 	{kind: IconButton, icon: 'closex'}
* ```
*
* See {@link module:moonstone/Icon~Icon} for more information on the available font-based icons,
* as well as specifications for icon image assets.
*
* @class IconButton
* @extends module:moonstone/Icon~Icon
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/IconButton~IconButton.prototype */ {

	/**
	* @private
	*/
	name: 'moon.IconButton',

	/**
	* @private
	*/
	kind: Icon,

	/**
	* @private
	* @lends module:moonstone/IconButton~IconButton.prototype
	*/
	published: {

		/**
		* Used when the IconButton is part of an {@link module:enyo/Group~Group}. A value of `true`
		* indicates that this is the active button of the group; `false`, that it is not
		* the active button.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		active: false,

		/**
		* A boolean parameter affecting the size of the button.
		* If `true`, the button will have a diameter of 60px.
		* However, the button's tap target will still have a diameter of 78px, with
		* invisible DOM wrapping the small button to provide the larger tap zone.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		small: true,

		/**
		* @deprecated Replaced by [backgroundOpacity]{@link module:moonstone/IconButton~IconButton#backgroundOpacity}.
		*
		* If `true`, the button will have no rounded background color/border.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		noBackground: false,

		/**
		* The background-color opacity of this button; valid values are `'opaque'`, `'translucent'`,
		* and `'transparent'`.
		*
		* @type {String}
		* @default opaque
		* @public
		*/
		backgroundOpacity: 'opaque'
	},

	/**
	* @private
	*/
	classes: 'moon-icon-button',

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	*/
	handlers: {

		/**
		* Simulates mousedown.
		*/
		onSpotlightKeyDown: 'depress',

		/**
		* Simulates mouseup.
		*/
		onSpotlightKeyUp: 'undepress',

		/**
		* Used to request it is in view in scrollers.
		*/
		onSpotlightFocused: 'spotlightFocused',

		onSpotlightBlur: 'spotlightBlurred'
	},

	/**
	* @private
	*/
	create: function () {
		Icon.prototype.create.apply(this, arguments);
		if (this.noBackground) {
			this.noBackgroundChanged();
		}
		this.backgroundOpacityChanged();
	},

	/**
	* @private
	*/
	rendered: function () {
		Icon.prototype.rendered.apply(this, arguments);
		this.activeChanged();
	},

	/**
	* @private
	*/
	noBackgroundChanged: function () {
		this.set('backgroundOpacity', this.noBackground ? 'transparent' : 'opaque');
	},

	/**
	* @private
	*/
	tap: function () {
		if (this.disabled) {
			return true;
		}
		this.setActive(true);
	},

	/**
	* @fires module:enyo/GroupItem~GroupItem#onActivate
	* @private
	*/
	activeChanged: function () {
		this.bubble('onActivate');
	},

	/**
	* Adds `pressed` CSS class.
	* @private
	*/
	depress: function (inSender, inEvent) {
		if (inEvent.keyCode === 13) {
			this.addClass('pressed');
		}
	},

	/**
	* Removes `pressed` CSS class.
	* @private
	*/
	undepress: function () {
		this.removeClass('pressed');
	},

	/**
	* @fires module:moonstone/Scroller~Scroller#onRequestScrollIntoView
	* @private
	*/
	spotlightFocused: function (inSender, inEvent) {
		if (inEvent.originator === this) {
			this.bubble('onRequestScrollIntoView');
		}
	},

	/**
	* @private
	*/
	spotlightBlurred: function (sender, event) {
		this.removeClass('pressed');
	},

	/**
	* @private
	*/
	backgroundOpacityChanged: function (old) {
		var opacity = this.backgroundOpacity;
		if (old) this.removeClass(old);
		if (opacity == 'translucent' || opacity == 'transparent') {
			this.addClass(opacity);
		}
	},

	// Accessibility

	/**
	* @default 'button'
	* @type {String}
	* @see {@link module:enyo/AccessibilitySupport~AccessibilitySupport#accessibilityRole}
	* @public
	*/
	accessibilityRole: 'button'
});

},{'../Icon':'moonstone/Icon'}],'moonstone/Checkbox':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Checkbox~Checkbox} kind.
* @module moonstone/Checkbox
*/

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Checkbox = require('enyo/Checkbox');

var
	Icon = require('../Icon');

/**
* {@link module:moonstone/Checkbox~Checkbox} is a box that, when tapped, shows or hides a checkmark
* and fires an [onChange]{@link module:enyo/Checkbox~Checkbox#onChange} event. It derives from
* {@link module:enyo/Checkbox~Checkbox} and is designed to be used with {@link module:moonstone/CheckboxItem~CheckboxItem}.
*
* @class Checkbox
* @extends module:enyo/Checkbox~Checkbox
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Checkbox~Checkbox.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Checkbox',

	/**
	* @private
	*/
	kind: Checkbox,

	/**
	* @private
	*/
	classes: 'moon-checkbox',

	/**
	* @private
	* @lends module:moonstone/Checkbox~Checkbox.prototype
	*/
	published: {
		/**
		* If `true`, the `checked` property cannot be changed through user input.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		locked: false,

		/**
		* Name of a font-based icon to use when displaying the checkbox. Consult
		* {@link module:moonstone/Icon~Icon} for valid values.
		*
		* @type {String}
		* @default 'check'
		* @public
		*/
		icon: 'check',

		/**
		* Optional path to an image asset. May be used to customize checkbox appearance.
		*
		* @type {String|module:enyo/resolution#selectSrc~src}
		* @default ''
		* @public
		*/
		src: ''
	},

	/**
	* @private
	*/
	tag: 'div',

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	*/
	components: [
		{name: 'checkboxIcon', kind: Icon, accessibilityDisabled: true, icon: 'check'}
	],

	/**
	* @private
	*/
	rendered: function () {
		Checkbox.prototype.rendered.apply(this, arguments);
		this.srcChanged();
		this.iconChanged();
	},

	/**
	* @fires module:enyo/Checkbox~Checkbox#onChange
	* @private
	*/
	tap: function (inSender, e) {
		if (!this.disabled && !this.locked) {
			this.setChecked(!this.getChecked());
			this.bubble('onchange');
		} else {
			return true;
		}
	},

	/**
	* @private
	*/
	dragstart: function () {
		// Override enyo.Input dragstart handler, to allow drags to propagate for Checkbox
	},

	/**
	* @private
	*/
	iconChanged: function() {
		this.$.checkboxIcon.setIcon(this.icon);
	},

	/**
	* @private
	*/
	srcChanged: function() {
		this.$.checkboxIcon.setSrc(ri.selectSrc(this.src));
	}
});

},{'../Icon':'moonstone/Icon'}],'moonstone/VideoFeedback':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/VideoFeedback~VideoFeedback} kind.
* @module moonstone/VideoFeedback
*/

require('moonstone');

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	job = require('enyo/job'),
	Control = require('enyo/Control');

var
	Icon = require('moonstone/Icon');

/**
* {@link module:moonstone/VideoFeedback~VideoFeedback} is a control used by {@link module:moonstone/VideoPlayer~VideoPlayer} to display
* feedback in response to input from video playback controls. It may also be used to
* display custom messages. The {@link module:moonstone/VideoTransportSlider~VideoTransportSlider} control typically
* communicates directly with this one.
*
* @class VideoFeedback
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/VideoFeedback~VideoFeedback */ {

	/**
	* @private
	*/
	name: 'moon.VideoFeedback',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'moon-video-player-feedback',

	/**
	* @private
	* @lends module:moonstone/VideoFeedback~VideoFeedback.prototype
	*/
	published: {

		/**
		* Length of time (in milliseconds) after which the on-screen feedback will automatically
		* disappear.
		*
		* @type {Number}
		* @default 2000
		* @public
		*/
		autoTimeoutMS: 2000,

		/**
		* When `true`, the content will have locale-safe uppercasing applied.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		uppercase: true
	},

	/**
	* @private
	*/
	_showingFeedback: false,

	/**
	* @private
	*/
	_imagePath:				'images/video-player/',

	/**
	* @private
	*/
	_jumpBackImg:			'jumpbackward',

	/**
	* @private
	*/
	_rewindImg:				'backward',

	/**
	* @private
	*/
	_playImg:				'play',

	/**
	* @private
	*/
	_pauseImg:				'pause',

	/**
	* @private
	*/
	_fastForwardImg:		'forward',

	/**
	* @private
	*/
	_jumpForwardImg:		'jumpforward',

	/**
	* @private
	*/
	_pauseBackImg:			'pausebackward',

	/**
	* @private
	*/
	_pauseForwardImg:		'pauseforward',

	/**
	* @private
	*/
	_pauseJumpBackImg:		'pausejumpbackward',

	/**
	* @private
	*/
	_pauseJumpForwardImg:	'pausejumpforward',

	/**
	* @private
	*/
	_autoTimer: null,

	/**
	* @private
	*/
	components: [
		{name: 'leftIcon', kind: Icon, classes: 'moon-video-feedback-icon-left', allowHtml: true, showing: false},
		{name: 'feedText', kind: Control, classes: 'moon-video-feedback-text', allowHtml: true, showing: false},
		{name: 'rightIcon', kind: Icon, classes: 'moon-video-feedback-icon-right', allowHtml: true, showing: false}
	],

	/**
	* Updates [IconButton]{@link module:moonstone/IconButton~IconButton} image and [Slider]{@link module:moonstone/Slider~Slider}
	* message with current state and playback rate when any of the playback controls are
	* triggered.
	*
	* Playback states are mapped to `playbackRate` values according to the following hash:
	*
	* ```javascript
	* {
	*	'fastForward': ['2', '4', '8', '16'],
	*	'rewind': ['-2', '-4', '-8', '-16'],
	*	'slowForward': ['1/4', '1/2'],
	*	'slowRewind': ['-1/2', '-1']
	* }
	* ```
	*
	* @private
	*/
	checkIconType: function(icon) {
		var imagesrcRegex = /\.(jpg|jpeg|png|gif)$/i;
		return imagesrcRegex.test(icon) ? 'image' : 'iconfont';
	},

	/**
	* @private
	*/
	retrieveImgOrIconPath:function(icon){
		return this.checkIconType(icon) == 'image' ? this._imagePath + icon : icon;
	},

	/**
	* Sets the current state for a {@link module:moonstone/VideoFeedback~VideoFeedback} control.
	*
	* @param {String} msg - The string to display.
	* @param {module:moonstone/VideoTransportSlider~VideoTransportSlider~FeedbackParameterObject} params - A
	*	[hash]{@glossary Object} of parameters accompanying the message.
	* @param {Boolean} persist - If `true`, the [feedback]{@link module:moonstone/VideoFeedback~VideoFeedback}
	* control will not be automatically hidden.
	* @param {String} leftSrc - The source url for the image displayed on the left side
	*	of the feedback control.
	* @param {String} rightSrc - The source url for the image displayed on the right
	*	side of the feedback control.
	* @param {Boolean} preview - Specify `true` to put the
	* [video player]{@link module:moonstone/VideoPlayer~VideoPlayer} in preview mode; otherwise, `false`.
	* @public
	*/
	feedback: function(msg, params, persist, leftSrc, rightSrc, preview) {
		var customMessage = false;
		msg = msg || '';
		params = params || {};

		switch (msg) {
		case 'Play':
			msg = '';
			rightSrc = this.retrieveImgOrIconPath(this._playImg);
			break;

		case 'Pause':
			msg = '';
			rightSrc = this.retrieveImgOrIconPath(this._pauseImg);
			break;

		case 'Rewind':
			msg = Math.abs(params.playbackRate) + 'x';
			leftSrc = this.retrieveImgOrIconPath(this._rewindImg);
			break;

		case 'Slowrewind':
			msg = params.playbackRate.split('-')[1] + 'x';
			leftSrc = this.retrieveImgOrIconPath(this._pauseBackImg);
			break;

		case 'Fastforward':
			msg = params.playbackRate + 'x';
			rightSrc = this.retrieveImgOrIconPath(this._fastForwardImg);
			break;

		case 'Slowforward':
			msg = params.playbackRate + 'x';
			rightSrc = this.retrieveImgOrIconPath(this._pauseForwardImg);
			break;

		case 'JumpBackward':
			msg = '';
			leftSrc = this.retrieveImgOrIconPath(this._pauseJumpBackImg);
			break;

		case 'JumpForward':
			msg = '';
			rightSrc = this.retrieveImgOrIconPath(this._pauseJumpForwardImg);
			break;

		case 'JumpToStart':
			msg = '';
			leftSrc = this.retrieveImgOrIconPath(this._pauseJumpBackImg);
			break;

		case 'JumpToEnd':
			msg = '';
			rightSrc = this.retrieveImgOrIconPath(this._pauseJumpForwardImg);
			break;

		case 'Stop':
			msg = '';
			rightSrc = '';
			break;

		// If the user sends in a custom message, block other messages until it's hidden
		default:
			customMessage = true;
			this._showingFeedback = true;
			break;
		}

		// Don't show feedback if we are showing custom feedback already, unless this is a new custom message
		if (!customMessage && this._showingFeedback) return;
		// If msg is '', we do not need to show
		this.$.feedText.set('showing', !!msg);
		// Set content as _inMessage_
		this.$.feedText.setContent( this.get('uppercase') ? util.toUpperCase(msg) : msg);

		// Show output controls when video player is not preview mode
		if (!preview) this.showFeedback();

		// Show icons as appropriate
		this.updateIcons(leftSrc, rightSrc);

		//* Don't set up hide timer if _inPersistShowing_ is true
		if (persist) this.resetAutoTimer();
		else this.setAutoTimer();

		this.inPersistShowing = persist;
	},

	/**
	* Determines whether the current feedback message is persistent (i.e., it has no
	* timeout).
	*
	* @returns {Boolean} `true` if the current feedback message has no timeout;
	* otherwise, `false`, meaning that the feedback message has a timeout and is not
	* persistent.
	* @public
	*/
	isPersistShowing: function() {
		return this.inPersistShowing;
	},

	/**
	* Shows this control.
	*
	* @public
	*/
	showFeedback: function() {
		this.setShowing(true);
	},

	/**
	* Hides this control and sets internal `_showingFeedback` flag to `false`.
	*
	* @public
	*/
	hideFeedback: function() {
		this.setShowing(false);
		this._showingFeedback = false;
	},

	/**
	* Starts job that will hide this control.
	*
	* @private
	*/
	setAutoTimer: function() {
		this.hideJob = job(this.id + 'hide', this.bindSafely('hideFeedback'), this.getAutoTimeoutMS());
	},

	/**
	* Clears job that will hide this control.
	*
	* @private
	*/
	resetAutoTimer: function() {
		job.stop(this.id + 'hide');
	},

	/**
	* Shows or hides icons, and sets sources.
	*
	* @private
	*/
	updateIcons: function(leftSrc, rightSrc) {
		if (leftSrc) {
			this.$.leftIcon.show();
			this.displayIconSrcOrFont(this.$.leftIcon, leftSrc);
			this.$.leftIcon.addRemoveClass('moon-video-feedback-icon-only', !this.$.feedText.get('showing'));
		} else {
			this.$.leftIcon.hide();
		}

		if (rightSrc) {
			this.$.rightIcon.show();
			this.displayIconSrcOrFont(this.$.rightIcon, rightSrc);
			this.$.rightIcon.addRemoveClass('moon-video-feedback-icon-only', !this.$.feedText.get('showing'));
		} else {
			this.$.rightIcon.hide();
		}

	},

	/**
	* @private
	*/
	displayIconSrcOrFont: function(iconKind, icon) {
		if (this.checkIconType(icon) == 'image') {
			iconKind.set('icon', '');
			iconKind.set('src', icon);
		} else {
			iconKind.set('src', '');
			iconKind.set('icon', icon);
		}
	}
});

}],'moonstone/Drawers/Drawer':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Drawers/Drawer~Drawer} kind.
* @module moonstone/Drawers/Drawer
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	utils = require('enyo/utils'),
	Animator = require('enyo/Animator'),
	Control = require('enyo/Control');

var
	FittableRows = require('layout/FittableRows');

var
	Spotlight = require('spotlight');

var
	options = require('../options'),
	HistorySupport = require('../HistorySupport');

/**
* Fires when either the main drawer or the control drawer is activated. No event-specific
* data is sent with this event.
*
* @event module:moonstone/Drawers/Drawer~Drawer#onActivate
* @type {Object}
* @public
*/

/**
* Fires when either the main drawer or the control drawer is deactivated. No event-specific
* data is sent with this event.
*
* @event module:moonstone/Drawers/Drawer~Drawer#onDeactivate
* @type {Object}
* @public
*/

/**
* Fires when either the main drawer or the control drawer completes it animation. No event-specific
* data is sent with this event.
*
* @event module:moonstone/Drawers/Drawer~Drawer#onDrawerAnimationEnd
* @type {Object}
* @public
*/

/**
* {@link module:moonstone/Drawers/Drawer~Drawer}, a control designed for use with
* {@link module:moonstone/Drawers~Drawers}, consists of two drawers and a handle.
* The main drawer is populated with any child components that are specified in
* the constructor; the optional second drawer (control drawer) is populated
* with components passed into the
* [controlDrawerComponents]{@link module:moonstone/Drawers/Drawer~Drawer#controlDrawerComponents}
* property.
*
* If the second drawer has no components, the main drawer will take up the full
* height of the containing view; otherwise, its height will be equal to the
* height of the containing view minus the height of the `controlDrawerComponents`.
*
* A call to [toggleDrawer()]{@link module:moonstone/Drawers/Drawer~Drawer#toggleDrawer}
* will open or close the control drawer if `controlDrawerComponents` is
* non-empty; otherwise, it will open or close the main drawer.
*
* The control's child components may be of any kind.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Drawer = require('moonstone/Drawers').Drawer;
*
* 	{
* 		name: 'musicDrawer',
* 		kind: Drawer,
* 		handle: {name: 'handleButton', content: 'Handle'},
* 		components: [
* 			{content: 'Drawer Content'}
* 		],
* 		controlDrawerComponents: [
* 			{content: 'Controls'}
* 		]
* 	}
* ```
*
* @class Drawer
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Drawers/Drawer~Drawer.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Drawer',

	/**
	* @private
	*/
	kind: FittableRows,

	/**
	* @private
	*/
	mixins: [HistorySupport],

	/**
	* @private
	*/
	classes: 'moon-drawer moon-neutral enyo-fit',

	/**
	* Components that are to be placed in the control drawer.
	*
	* @type {Object}
	* @default null
	* @public
	*/
	controlDrawerComponents: null,

	/**
	* Control that acts a "handle" for the drawer.
	*
	* @type {Object}
	* @default null
	* @public
	*/
	handle: null,

	/**
	* Visibility state of the main drawer.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	open: false,

	/**
	* Visibility state of the control drawer.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	controlsOpen: false,

	/**
	* Available height for a fully displayed drawer
	*
	* @type {Number}
	* @default 0
	* @public
	*/
	fullHeight: 0,

	/**
	* @private
	*/
	events: {

		/**
		* {@link module:moonstone/Drawers/Drawer~Drawer#onActivate}
		*/
		onActivate: '',

		/**
		* {@link module:moonstone/Drawers/Drawer~Drawer#onDeactivate}
		*/
		onDeactivate: '',

		/**
		* {@link module:moonstone/Drawers/Drawer~Drawer#onDrawerAnimationEnd}
		*/
		onDrawerAnimationEnd: ''
	},

	/**
	* @private
	*/
	handlers: {
		ontransitionend: 'transitionEnded',
		onwebkittransitionend: 'transitionEnded'
	},

	/**
	* @private
	*/
	components: [
		{name: 'client', kind: Control, fit: true, classes: 'moon-drawer-client', spotlightDisabled: true},
		{name: 'controlDrawer', kind: Control, classes: 'moon-drawer-partial-client', spotlightDisabled: true}
	],

	/**
	* @private
	*/
	initComponents: function () {
		FittableRows.prototype.initComponents.apply(this, arguments);
		this.$.controlDrawer.createComponents(this.controlDrawerComponents, {owner: this.owner});
		if (!options.accelerate) this.createComponent({name: 'animator', kind: Animator, onStep: 'animationStep', onEnd: 'animationComplete'});
	},

	/**
	* @private
	*/
	reflow: function () {
		FittableRows.prototype.reflow.apply(this, arguments);
		this.calcDrawerHeight();
		this.updatePosition();
	},

	/**
	* If [controlDrawerComponents]{@link module:moonstone/Drawers/Drawer~Drawer#controlDrawerComponents}
	* is non-empty, toggles the visibility state of the control drawer; otherwise,
	* toggles the visibility state of the main drawer.
	*
	* @public
	*/
	toggleDrawer: function () {
		if (this.controlDrawerComponents == null) {
			this.set('open', !this.open);
		} else {
			this.set('controlsOpen', !this.controlsOpen);
		}
		return true;
	},

	/**
	* @fires module:moonstone/Drawers/Drawer~Drawer#onActivate
	* @fires module:moonstone/Drawers/Drawer~Drawer#onDeactivate
	* @private
	*/
	openChanged: function () {
		if (this.open) {
			this.doActivate({height: this.fullHeight});
			this.$.client.spotlightDisabled = false;
			Spotlight.spot(this.$.client);
			if (this.allowBackKey) {
				this.pushBackHistory();
			}
		} else {
			this.$.client.spotlightDisabled = true;
			this.doDeactivate({height: this.controlsOpen ? this.controlDrawerHeight : 0});
		}
		this.animatePosition();
	},

	/**
	* @fires module:moonstone/Drawers/Drawer~Drawer#onActivate
	* @fires module:moonstone/Drawers/Drawer~Drawer#onDeactivate
	* @private
	*/
	controlsOpenChanged: function () {
		if (this.controlsOpen) {
			this.doActivate({height: this.controlDrawerHeight});
			this.$.controlDrawer.spotlightDisabled = false;
			Spotlight.spot(this.$.controlDrawer);
			if (this.allowBackKey) {
				this.pushBackHistory();
			}
		} else {
			this.$.controlDrawer.spotlightDisabled = true;
			this.doDeactivate({height: 0});
		}
		this.animatePosition();
	},

	/**
	* @protected
	*/
	fullHeightChanged: function (was, is) {
		this.applyStyle('height', is + 'px');
		this.reflow();
		if (options.accelerate) {
			// first remove the class, so changes in fullHeight during resize aren't animated
			this.removeClass('moon-drawer-rendered');
			// then defer adding the rendered class so the initial transform isn't animated
			utils.asyncMethod(this, 'addClass', 'moon-drawer-rendered');
		}
	},

	/**
	* @private
	*/
	calcDrawerHeight: function () {
		var clientHeight = this.fullHeight,
			node = this.$.controlDrawer.hasNode();
		if (this.controlDrawerComponents != null && node) {
			this.controlDrawerHeight = this.controlDrawerHeight || node.getBoundingClientRect().height;
			clientHeight -= this.controlDrawerHeight;
		}
		return clientHeight;
	},

	/**
	* @private
	*/
	calcTopPosition: function () {
		var top = this.fullHeight;
		if (this.open) {
			top = 0;
		} else if (this.controlsOpen) {
			top = this.fullHeight - this.controlDrawerHeight;
		}

		return -top;
	},

	/**
	* Updates the drawer position without animation. This does not prevent CSS transitions if used.
	*
	* @private
	*/
	updatePosition: function () {
		var top = this.calcTopPosition();
		this.updateTop(top);
	},

	/**
	* Called after {@link module:moonstone/Drawers/Drawer~Drawer#open} or
	* {@link moonstone/Drawers/Drawer~Drawer#controlsOpen) changes to animate the
	* drawer's position.
	*
	* @private
	*/
	animatePosition: function () {
		var bounds,
			top = this.calcTopPosition();

		// not accelerated and drawer has been rendered
		if (options.accelerate) {
			// The drawer may have just been shown in this frame so we need to delay applying the
			// CSS transform until the next frame so the CSS animation takes effect.
			utils.asyncMethod(this, 'updateTop', top);
		} else {
			bounds = this.getBounds();
			this.$.animator.play({
				startValue: bounds.top,
				endValue: top
			});
		}
	},

	/**
	* @private
	*/
	animationStep: function (sender, event) {
		this.updateTop(sender.value);
	},

	/**
	* @private
	*/
	animationComplete: function (sender, event) {
		this.doDrawerAnimationEnd();
	},

	/**
	* Updates the top position of the drawer, either by CSS transform or CSS position
	*
	* @param  {Number} top Position where negative values push the drawer offscreen
	* @private
	*/
	updateTop: function (top) {
		if (options.accelerate) {
			dom.transformValue(this, 'translateY', top + 'px');
		} else {
			this.setBounds({
				top: top + 'px'
			});
		}
	},

	/**
	* Handles the ontransitionend event to fire the onDrawerAnimationEnd event
	*
	* @private
	*/
	transitionEnded: function (sender, event) {
		if (event.originator === this) this.doDrawerAnimationEnd();
	},

	/**
	* @private
	*/
	backKeyHandler: function () {
		if (this.open) {
			this.set('open', false);
		} else if (this.controlsOpen) {
			this.set('controlsOpen', false);
		}
		return true;
	},

	/**
	* @deprecated Backwards compatibility
	* @public
	*/
	setOpen: function (open) { this.set('open', open); },

	/**
	* @deprecated Backwards compatibility
	* @public
	*/
	getOpen: function () { return this.open; },

	/**
	* @deprecated Backwards compatibility
	* @public
	*/
	setControlsOpen: function (controlsOpen) { this.set('controlsOpen', controlsOpen); },

	/**
	* @deprecated Backwards compatibility
	* @public
	*/
	getControlsOpen: function () { return this.controlsOpen; }
});

},{'../options':'moonstone/options','../HistorySupport':'moonstone/HistorySupport'}],'moonstone/ExpandableText':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ExpandableText~ExpandableText} kind.
* @module moonstone/ExpandableText
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	$L = require('../i18n'),
	ClampedText = require('../ClampedText');


/**
* {@link module:moonstone/ExpandableText~ExpandableTextButton} is a control used inside of {@link module:moonstone/ExpandableText~ExpandableText}.
*
* @class ExpandableTextButton
* @extends module:enyo/Control~Control
* @ui
* @private
*/
var ExpandableTextButton = kind(
	/** @lends module:moonstone/ExpandableText~ExpandableTextButton.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ExpandableTextButton',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	* @lends module:moonstone/ExpandableText~ExpandableTextButton.prototype
	*/
	published: {

		/**
		* Button text when [collapsed]{@link module:moonstone/ExpandableText~ExpandableTextButton#collapsed} is `true`.
		*
		* @type {String}
		* @default 'more'
		* @public
		*/
		moreContent: $L('more'),		// i18n 'MORE' label in moon.ExpandableTextButton widget

		/**
		* Button text when [collapsed]{@link module:moonstone/ExpandableText~ExpandableTextButton#collapsed} is `false`.
		*
		* @type {String}
		* @default 'less'
		* @public
		*/
		lessContent: $L('less'),		// i18n 'LESS' label in moon.ExpandableTextButton widget

		/**
		* Boolean value that causes content/class changes.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		collapsed: true
	},

	/**
	* @private
	*/
	handlers: {

		/**
		* {@link module:enyo/Spotlight~Spotlight#onSpotlightFocus}, the handler bubbles a
		* [requestScrollIntoView]{@link module:moonstone/Scroller~Scroller#requestScrollIntoView} event.
		*/
		onSpotlightFocused	: 'spotFocused'

	},

	/**
	* @private
	*/
	classes: 'moon-body-text moon-expandable-text-button',

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.updateContent();
	},

	/**
	* Bubbles a [requestScrollIntoView]{@link module:moonstone/Scroller~Scroller#requestScrollIntoView}
	* event.
	*
	* @fires module:moonstone/Scroller~Scroller#requestScrollIntoView
	* @private
	*/
	spotFocused: function (inSender, inEvent) {
		if (inEvent.originator === this) {
			this.bubble('onRequestScrollIntoView');
		}
	},

	/**
	* @private
	*/
	moreContentChanged: function () {
		this.updateContent();
	},

	/**
	* @private
	*/
	lessContentChanged: function () {
		this.updateContent();
	},

	/**
	* @private
	*/
	collapsedChanged: function () {
		this.updateContent();
	},

	/**
	* If control is collapsed, sets [content]{@link module:moonstone/ExpandableText~ExpandableTextButton#content} to
	* [moreContent]{@link module:moonstone/ExpandableText~ExpandableTextButton#moreContent} and adds `collapsed` CSS class;
	* otherwise, sets content to [lessContent]{@link module:moonstone/ExpandableText~ExpandableTextButton#lessContent} and
	* removes `collapsed` CSS class.
	*
	* @private
	*/
	updateContent: function () {
		if (this.collapsed) {
			this.setContent(this.moreContent);
			this.addClass('collapsed');
		} else {
			this.setContent(this.lessContent);
			this.removeClass('collapsed');
		}
	}
});

/**
* Fires when this control expands or collapses.
*
* @event module:moonstone/ExpandableText~ExpandableText#onExpandCollapse
* @type {Object}
* @property {Boolean} collapsed - Whether the control is currently collapsed.
* @public
*/

/**
* {@link module:moonstone/ExpandableText~ExpandableText} is a control that allows long bodies of
* text to be expanded and collapsed. Note that this control only works properly in WebKit browsers.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		ExpandableText = require('moonstone/ExpandableText');
*
* 	{kind: ExpandableText, collapsed: true, maxLines: 3,
* 		content: 'I left my heart in San Francisco.'}
* ```
*
* The [onExpandCollapse]{@link module:moonstone/ExpandableText~ExpandableText#onExpandCollapse}
* event is fired when the control is either expanded or collapsed.
*
* @class ExpandableText
* @extends module:enyo/Control~Control
* @ui
* @public
*/

var ExpandableText = module.exports = kind(
	/** @lends module:moonstone/ExpandableText~ExpandableText.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ExpandableText',

	/**
	* @private
	*/
	kind: Control,

	//* @protected
	/**
	* @private
	*/
	classes: 'moon-expandable-text',

	/**
	* @private
	* @lends module:moonstone/ExpandableText~ExpandableText.prototype
	*/
	published: {
		/**
		* Maximum number of lines of content to show in collapsed state.
		*
		* @type {Number}
		* @default 3
		* @public
		*/
		maxLines: 3,

		/**
		* When `true`, content is collapsed.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		collapsed: true,

		/**
		* Button text when content is collapsed (i.e., 'more' label). Default is
		* locale-aware.
		* @type {String}
		* @default 'more'
		* @public
		*/
		moreContent: $L('more'),

		/**
		* Button text when content is expanded (i.e., 'less' label). Default is
		* locale-aware.
		*
		* @type {String}
		* @default 'less'
		* @public
		*/
		lessContent: $L('less')
	},

	/**
	* @private
	*/
	events: {

		/**
		* {@link module:moonstone/ExpandableText~ExpandableText#onExpandCollapse}
		*/
		onExpandCollapse: ''
	},

	/**
	* @private
	*/
	components:[
		{name: 'client', kind: ClampedText, classes: 'moon-body-text moon-expandable-text-content'},
		{name: 'button', kind: ExpandableTextButton, ontap: 'expandContract'}
	],

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.moreContentChanged();
		this.lessContentChanged();
		this.maxLinesChanged();
		this.collapsedChanged();
		this.observe('$.client.canCollapse', 'canCollapseChanged');
	},

	/**
	* Toggles value of [collapsed]{@link module:moonstone/ExpandableText~ExpandableText#collapsed} when
	* `this.$.button` is tapped.
	*
	* @private
	*/
	expandContract: function () {
		this.set('collapsed', !this.collapsed);
	},

	/**
	* Facades `this.$.button.moreContent`.
	*
	* @private
	*/
	moreContentChanged: function () {
		this.$.button.setMoreContent(this.moreContent);
	},

	/**
	* Facades `this.$.button.lessContent`.
	*
	* @private
	*/
	lessContentChanged: function () {
		this.$.button.setLessContent(this.lessContent);
	},

	/**
	* Recalculates [maxHeight]{@link module:moonstone/ExpandableText~ExpandableText#maxHeight} when
	* [maxLines]{@link module:moonstone/ExpandableText~ExpandableText#maxLines} changes.
	*
	* @private
	*/
	maxLinesChanged: function () {
		this.$.client.set('maxLines', this.maxLines);
	},

	contentChanged: function () {
		this.$.client.set('content', this.content);
	},

	/**
	* When [collapsed]{@link module:moonstone/ExpandableText~ExpandableText#collapsed} changes, adds/removes the
	* line clamp, and pushes state to `this.$.button`. If the node has rendered, bubbles
	* [onExpandCollapse]{@link module:moonstone/ExpandableText~ExpandableText#onExpandCollapse} event.
	*
	* @fires module:moonstone/ExpandableText~ExpandableText#onExpandCollapse
	* @fires module:moonstone/Scroller~Scroller#onRequestScrollIntoView
	* @private
	*/
	collapsedChanged: function () {
		this.$.client.set('clamped', this.collapsed);
		this.$.button.setCollapsed(this.collapsed);
		if (this.hasNode()) {
			this.doExpandCollapse({collapsed: this.collapsed});
		}
		this.bubble('onRequestScrollIntoView', {scrollInPointerMode: true});
	},

	/**
	* Updates `this.$.button.showing` when
	* [canCollapse]{@link module:moonstone/ExpandableText~ExpandableText#canCollapse} changes.
	*
	* @private
	*/
	canCollapseChanged: function (was, is) {
		this.$.button.setShowing(is);
	},

	// Accessibility

	/**
	* @private
	*/
	ariaObservers: [
		{path: 'generated', method: function () {
			this.$.button.setAriaAttribute('aria-labelledby', this.$.client.id);
		}}
	]
});

/**
* Kind definition for {@link module:moonstone/ExpandableText~ExpandableTextButton}
*/
ExpandableText.ExpandableTextButton = ExpandableTextButton;

},{'../i18n':'moonstone/i18n','../ClampedText':'moonstone/ClampedText'}],'moonstone/InputDecorator':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/InputDecorator~InputDecorator} kind.
* @module moonstone/InputDecorator
*/

var
	kind = require('enyo/kind'),
	ToolDecorator = require('enyo/ToolDecorator');

var
	Spotlight = require('spotlight');

var
	$L = require('../i18n'),
	Input = require('../Input'),
	RichText = require('../RichText'),
	TextArea = require('../TextArea'),
	Tooltip = require('../Tooltip');

/**
* {@link module:moonstone/InputDecorator~InputDecorator} is a control that provides input styling. Any controls
* in the InputDecorator will appear to be inside an area styled as an input. Usually,
* an InputDecorator surrounds a {@link module:moonstone/Input~Input}:
*
* ```
* 	var
* 		kind = require('enyo/kind'),
* 		Input = require('moonstone/Input'),
* 		InputDecorator = require('moonstone/InputDecorator');
*
* 	{kind: InputDecorator, components: [
* 		{kind: Input}
* 	]}
* ```
*
* Other controls, such as buttons, may be placed to the right or left of the
* input control, e.g.:
*
* ```
* 	var
* 		IconButton = require('moonstone/IconButton');
*
* 	{kind: InputDecorator, components: [
* 		{kind: IconButton, src: 'moonstone/src/assets/search.png'},
* 		{kind: Input},
* 		{kind: IconButton, src: 'moonstone/src/assets/cancel.png'}
* 	]}
* ```
*
* Note that the InputDecorator fits around the content inside it. If the
* decorator is sized, then its contents will likely need to be sized as well.
*
* ```
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
	/** @lends module:moonstone/InputDecorator~InputDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'moon.InputDecorator',

	/**
	* @private
	*/
	kind: ToolDecorator,

	/**
	* When `true`, the message tooltip is shown if it exists.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	invalid: false,

	/**
	* The tooltip text to be displayed when the contents of the input are invalid. If this value is
	* falsy, the tooltip will not be shown.
	*
	* @type {String}
	* @default ''
	* @public
	*/
	invalidMessage: '',

	/**
	* @private
	*/
	tag: 'label',

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	*/
	spotlightDecorate: false,

	/**
	* @private
	*/
	handlers: {
		onDisabledChange    : 'disabledChangeHandler',
		onfocus             : 'focusHandler',
		onblur              : 'blurHandler',
		onSpotlightFocused  : 'spotlightFocusedHandler',
		onSpotlightSelect   : 'spotlightSelectHandler',
		onSpotlightBlur     : 'spotlightBlurHandler',
		onSpotlightLeft     : 'spotlightLeftHandler',
		onSpotlightRight    : 'spotlightRightHandler',
		onSpotlightUp       : 'spotlightUpHandler',
		onSpotlightDown     : 'spotlightDownHandler'
	},

	/**
	* @private
	*/
	tools: [
		{name: 'tooltip', kind: Tooltip, floating: false, position: 'right top'}
	],

	/**
	* @private
	*/
	observers: [
		{path: ['invalid', 'invalidMessage'], method: 'updateValidity'}
	],

	/**
	* @private
	*/
	_oInputControl: null,

	/**
	* Returns boolean indicating whether passed-in control is an input field.
	*
	* @private
	*/
	_isInput: function (oControl) {
		return (
			oControl instanceof Input		||
			oControl instanceof RichText	||
			oControl instanceof TextArea
		);
	},

	/**
	* Traverses tree of children to find input control.
	*
	* @private
	*/
	_findInputControl: function (oControl) {
		oControl = oControl || this;

		var oInputControl = null;

		for (var n=0; n<oControl.children.length; n++) {
			if (this._isInput(oControl.children[n])) {
				return oControl.children[n];
			}
			if ((oInputControl = this._findInputControl(oControl.children[n]))) {
				return oInputControl;
			}
		}
	},

	/**
	* @private
	*/
	create: function () {
		ToolDecorator.prototype.create.apply(this, arguments);
		this.updateFocus(false);
		this._oInputControl = this._findInputControl();
		if (this._oInputControl instanceof Input) {
			this.addClass('moon-divider-text moon-input-decorator');
		}
		if (this._oInputControl instanceof TextArea || this._oInputControl instanceof RichText) {
			this.addClass('moon-divider-text moon-textarea-decorator');
		}

		this.updateValidity();
	},

	/**
	* @private
	*/
	createComponent: function () {
		var ret = ToolDecorator.prototype.createComponent.apply(this, arguments);
		this._oInputControl = this._findInputControl();
		return ret;
	},

	/**
	* @private
	*/
	createComponents: function () {
		var ret = ToolDecorator.prototype.createComponents.apply(this, arguments);
		this._oInputControl = this._findInputControl();
		return ret;
	},

	/**
	* Updates styling based on focus state.
	*
	* @param {Boolean} bFocus - Whether to add/remove `moon-focused` class.
	* @public
	*/
	updateFocus: function (bFocus) {
		this.set('focused', bFocus);
		this.addRemoveClass('moon-focused', this.alwaysLooksFocused || this.focused);
	},

	/**
	* Retrieves the child input control.
	*
	* @returns {Object} A reference to the child input control.
	* @public
	*/
	getInputControl: function () {
		return this._oInputControl;
	},

	// Event handlers:
	/**************************************************/

	/**
	* @private
	*/
	focusHandler: function (oSender, oEvent) {
		if (Spotlight.getCurrent() != this) {
			// Force a spot here, even when we're in pointer mode,
			// to ensure that clicks inside us (e.g. to position
			// the cursor) don't cause Spotlight to unfreeze
			Spotlight.spot(this, {focusType: 'point'});
		}
		Spotlight.freeze();
		this.updateFocus(true);
	},

	/**
	* @private
	*/
	blurHandler: function () {
		Spotlight.unfreeze();
		this.updateFocus(false);
	},

	/**
	* @private
	*/
	disabledChangeHandler: function (oSender, oEvent) {
		this.addRemoveClass('moon-disabled', oEvent.originator.disabled);
	},

	// Spotlight Event handlers:
	/**************************************************/

	/**
	* @fires module:moonstone/Scroller~Scroller#onRequestScrollIntoView
	* @private
	*/
	spotlightFocusedHandler: function () {
		this.set('spotted', true);
		this.bubble('onRequestScrollIntoView');
	},

	/**
	* @private
	*/
	spotlightSelectHandler: function (oSender, oEvent) {
		var oInput = this.getInputControl();
		if (oInput) {
			if (oInput.hasFocus() && oEvent) {
				return true;
			} else {
				oInput.focus();
			}
			return false;
		}
	},

	/**
	* @private
	*/
	spotlightBlurHandler: function (oSender, oEvent) {
		this.set('spotted', false);
		this.blur();
	},

	/**
	* @private
	*/
	spotlightLeftHandler: function (oSender, oEvent) {
		var oInput = this.getInputControl();
		if (oInput && oInput.hasFocus() && oInput.left) {
			if (oInput.left()) {
				oEvent.allowDomDefault();       // Allow keydown to bubble
				return true;                    // Prevent onSpotlightLeft to bubble
			} else {
				this.blur();
				oInput.blur();
			}
		}
	},

	/**
	* @private
	*/
	spotlightRightHandler: function (oSender, oEvent) {
		var oInput = this.getInputControl();
		if (oInput && oInput.hasFocus() && oInput.right) {
			if (oInput.right()) {
				oEvent.allowDomDefault();       // Allow keydown to bubble
				return true;                    // Prevent onSpotlightRight to bubble
			} else {
				this.blur();
				oInput.blur();
			}
		}
	},

	/**
	* @private
	*/
	spotlightUpHandler: function (oSender, oEvent) {
		var oInput = this.getInputControl();
		if (oInput && oInput.hasFocus() && oInput.up) {
			if (oInput.up()) {
				oEvent.allowDomDefault();       // Allow keydown to bubble
				return true;                    // Prevent onSpotlightUp to bubble
			} else {
				this.blur();
				oInput.blur();
			}
		}
	},

	/**
	* @private
	*/
	spotlightDownHandler: function (oSender, oEvent) {
		var oInput = this.getInputControl();
		if (oInput && oInput.hasFocus() && oInput.down) {
			if (oInput.down()) {
				oEvent.allowDomDefault();       // Allow keydown to bubble
				return true;                    // Prevent onSpotlightLeft to bubble
			} else {
				this.blur();
				oInput.blur();
			}
		}
	},

	// Change handlers

	/**
	* @private
	*/
	updateValidity: function () {
		var comps, length, i;
		// we want the ability to add the 'moon-invalid' class even if there is no invalid message
		this.addRemoveClass('moon-invalid', this.invalid);
		if (this.invalid && this.invalidMessage) {
			if (!this.$.tooltip) { // lazy creation of tooltip
				comps = this.createComponents(this.tools);
				if (this.hasNode()) {
					// rendering only the created tools, to prevent loss of focus on the input
					for (i = 0, length = comps.length; i < length; i++) {
						comps[i].render();
					}
				}
				this.$.tooltip.activator = this;
			}
			this.$.tooltip.set('content', this.invalidMessage);
			this.$.tooltip.set('showing', true);
		} else if (this.$.tooltip) {
			this.$.tooltip.set('showing', false);
		}
	},

	// Accessibility

	/**
	* spotted and focused can change in sequence but within the same cycle causing the TV to read
	* changes when spotting a different control. Enabling this will batch up those changes into
	* one DOM update thereby avoiding this behavior.
	*
	* @type {Boolean}
	* @default true
	* @private
	*/
	accessibilityDefer: true,

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['spotted', 'focused'], method: function () {
			var text = '',
				oInput = this.getInputControl();

			this.set('accessibilityLive', this.focused || !this.spotted ? null : 'polite');
			if (oInput) {
				if (oInput instanceof RichText && oInput.hasNode()) {
					text = (oInput.hasNode().innerText || oInput.getPlaceholder()) + ' ' + $L('edit box');
				} else if (oInput.type == 'password' && oInput.getValue()) {
					var character = (oInput.getValue().length > 1) ? $L('characters') : $L('character');
					text = oInput.getValue().length + ' ' + character + ' ' + $L('edit box');
				} else {
					text = (oInput.getValue() || oInput.getPlaceholder()) + ' ' + $L('edit box');
				}
			}
			this.set('accessibilityLabel', this.spotted && !this.focused ? text : null);
		}}
	]
});

},{'../i18n':'moonstone/i18n','../Input':'moonstone/Input','../RichText':'moonstone/RichText','../TextArea':'moonstone/TextArea','../Tooltip':'moonstone/Tooltip'}],'moonstone/Button':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Button~Button} kind.
* @module moonstone/Button
*/

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	Button = require('enyo/Button');

var
	Marquee = require('../Marquee'),
	MarqueeSupport = Marquee.Support,
	MarqueeText = Marquee.Text;

/**
* {@link module:moonstone/Button~Button} is an {@link module:enyo/Button~Button} with Moonstone styling applied.
* The color of the button may be customized by specifying a background color.
*
* For more information, see the documentation on
* [Buttons]{@linkplain $dev-guide/building-apps/controls/buttons.html} in the
* Enyo Developer Guide.
*
* @class Button
* @extends module:enyo/Button~Button
* @mixes module:moonstone/MarqueeSupport~MarqueeSupport
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Button~Button.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Button',

	/**
	* @private
	*/
	kind: Button,

	/**
	* @private
	*/
	tag: 'span',

	/**
	* @private
	*/
	mixins: [MarqueeSupport],

	/**
	* @private
	* @lends module:moonstone/Button~Button.prototype
	*/
	published: {

		/**
		* A boolean parameter affecting the size of the button. If `true`, the
		* button's diameter will be set to 60px. However, the button's tap target
		* will still have a diameter of 78px, with an invisible DOM element
		* wrapping the small button to provide the larger tap zone.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		small: false,

		/**
		* A boolean parameter affecting the minimum width of the button. When `true`,
		* the minimum width will be set to 180px (or 130px if [small]{@link module:moonstone/Button~Button#small}
		* is `true`). If `false`, the minimum width will be set to the current value of
		* `@moon-button-height` (thus forcing the button to be no smaller than a circle with
		* diameter `@moon-button-height`).
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		minWidth: true,

		/**
		* When `true`, the content will have locale-safe uppercasing applied.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		uppercase: true,

		/**
		* @deprecated Replaced by [uppercase]{@link module:moonstone/Button~Button#uppercase}.
		*
		* Formerly defaulted to `true`, now defaults to `null` and will only have
		* an effect when explicitly set (for complete backward compatibility).
		*
		* @type {Boolean}
		* @default null
		* @public
		*/
		contentUpperCase: null,

		/**
		* The background-color opacity of this button; valid values are `'opaque'`, `'translucent'`,
		* and `'transparent'`.
		*
		* @type {String}
		* @default 'opaque'
		* @public
		*/
		backgroundOpacity: 'opaque'
	},

	/**
	* @private
	*/
	classes: 'moon-large-button-text moon-button enyo-unselectable moon-composite',

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	*/
	handlers: {

		/**
		* `onSpotlightSelect` simulates `mousedown`.
		*
		* @private
		*/
		onSpotlightKeyDown	: 'depress',

		/**
		* `onSpotlightKeyUp` simulates `mouseup`.
		*
		* @private
		*/
		onSpotlightKeyUp	: 'undepress',

		/**
		* Also make sure we remove the pressed class if focus is removed from
		* this item before it receives a keyup.
		*
		* @private
		*/
		onSpotlightBlur		: 'undepress',

		/**
		* The handler for `onSpotlightFocused` bubbles a `requestScrollIntoView` event.
		*
		* @private
		*/
		onSpotlightFocused	: 'spotFocused'
	},

	/**
	* On creation, updates based on value of `this.small`.
	*
	* @private
	*/
	initComponents: function () {
		if (!(this.components && this.components.length > 0)) {
			this.createComponent({name: 'client', kind: MarqueeText, classes: 'button-client', isChrome: true});
		}
		if (this.small) this.smallChanged();
		if (this.minWidth) this.minWidthChanged();

		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// the contentUpperCase property is fully deprecated and removed. The legacy
		// property takes precedence if it exists.
		if (this.contentUpperCase !== null) this.uppercase = this.contentUpperCase;

		this.contentChanged();
		this.backgroundOpacityChanged();
		Button.prototype.initComponents.apply(this, arguments);
	},

	/**
	* Adds `pressed` CSS class.
	*
	* @private
	*/
	depress: function (inSender, inEvent) {
		if (inEvent.keyCode === 13) {
			this.addClass('pressed');
		}
	},

	/**
	* Bubbles `requestScrollIntoView` event.
	*
	* @fires module:moonstone/Scroller~Scroller#onRequestScrollIntoView
	* @private
	*/
	spotFocused: function (inSender, inEvent) {
		if (inEvent.originator === this) {
			this.bubble('onRequestScrollIntoView');
		}
	},

	/**
	* Removes `pressed` CSS class.
	*
	* @private
	*/
	undepress: function () {
		this.removeClass('pressed');
	},

	/**
	* If `this.small` is `true`, `taparea` dimensions are increased.
	*
	* @private
	*/
	smallChanged: function () {
		if (this.small) {
			this.addClass('small');
			this.addClass('moon-small-button-text');
		} else {
			this.removeClass('small');
			this.removeClass('moon-small-button-text');
		}
	},

	/**
	* Override to handle potential child components.
	*
	* @private
	*/
	contentChanged: function () {
		var content = this.getContent();
		if (this.$.client) {
			this.$.client.setContent( this.get('uppercase') ? util.toUpperCase(content) : content );
		} else {
			Button.prototype.contentChanged.apply(this, arguments);
		}
	},

	/**
	* @private
	*/
	uppercaseChanged: function () {
		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// contentUpperCase is fully deprecated and removed.
		if (this.contentUpperCase != this.uppercase) this.contentUpperCase = this.uppercase;
		this.contentChanged();
	},

	/**
	* @private
	*/
	contentUpperCaseChanged: function () {
		if (this.uppercase != this.contentUpperCase) this.uppercase = this.contentUpperCase;
		this.uppercaseChanged();
	},

	/**
	* @private
	*/
	minWidthChanged: function () {
		if (this.minWidth) {
			this.addClass('min-width');
		} else {
			this.removeClass('min-width');
		}
	},

	/**
	* @private
	*/
	showingChanged: function () {
		Button.prototype.showingChanged.apply(this, arguments);
		if (!this.showing && this.hasClass('pressed')) {
			this.undepress();
		}
	},

	/**
	* @private
	*/
	backgroundOpacityChanged: function (old) {
		var opacity = this.backgroundOpacity;
		if (old) this.removeClass(old);
		if (opacity == 'translucent' || opacity == 'transparent') {
			this.addClass(opacity);
		}
	}
});

},{'../Marquee':'moonstone/Marquee'}],'moonstone/Divider':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Divider~Divider} kind.
* @module moonstone/Divider
*/

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	Control = require('enyo/Control');

var
	Marquee = require('../Marquee'),
	MarqueeItem = Marquee.Item,
	MarqueeSupport = Marquee.Support;

/**
* {@link module:moonstone/Divider~Divider} is a simply styled component that may be used as a separator
* between groups of components.
*
* @class Divider
* @mixes module:moonstone/MarqueeSupport~MarqueeSupport
* @mixes module:moonstone/MarqueeItem~MarqueeItem
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Divider~Divider.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Divider',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'moon-divider moon-divider-text',

	/**
	* @private
	*/
	mixins: [MarqueeSupport, MarqueeItem],

	/**
	* @private
	*/
	marqueeOnSpotlight: false,

	/**
	* @private
	*/
	marqueeOnRender: true,

	/**
	* @private
	*/
	contentChanged: function () {
		this.content = this.content.split(' ').map(utils.cap).join(' ');
		Control.prototype.contentChanged.apply(this, arguments);
	}
});

},{'../Marquee':'moonstone/Marquee'}],'moonstone/Item':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Item~Item} kind.
* @module moonstone/Item
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	Marquee = require('../Marquee'),
	MarqueeSupport = Marquee.Support,
	MarqueeItem = Marquee.Item;

/**
* {@link module:moonstone/Item~Item} is a focusable Moonstone-styled control that can display
* simple text or a set of controls.
*
* @class Item
* @extends module:enyo/Control~Control
* @mixes module:moonstone/MarqueeSupport~MarqueeSupport
* @mixes module:moonstone/MarqueeItem~MarqueeItem
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Item~Item.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Item',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'moon-item',

	/**
	* @private
	*/
	mixins: [MarqueeSupport, MarqueeItem],

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	*/
	handlers: {
		onSpotlightFocused: 'spotlightFocused'
	},

	/**
	* @private
	* @lends module:moonstone/Item~Item.prototype
	*/
	published: {

		/**
		* If `true`, the control is shown as disabled and does not generate tap events.
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
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.disabledChanged();
		if (this.children.length) {
			this.addClass('allow-wrap');
		}
	},

	/**
	* @private
	*/
	disabledChanged: function (inOld) {
		this.addRemoveClass('disabled', this.disabled);
	},

	/**
	* @fires module:moonstone/Scroller~Scroller#onRequestScrollIntoView
	* @private
	*/
	spotlightFocused: function (inSender, inEvent) {
		if (inEvent.originator === this) {
			this.bubble('onRequestScrollIntoView');
		}
	},

	/**
	* @private
	*/
	tap: function () {
		return this.disabled;
	}
});

},{'../Marquee':'moonstone/Marquee'}],'moonstone/ChannelInfo':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/ChannelInfo~ChannelInfo} and
* {@link module:moonstone/ChannelInfo~ChannelInfoBadge} kinds.
* @module moonstone/ChannelInfo
*/

require('moonstone');

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	Control = require('enyo/Control');

var
	Marquee = require('moonstone/Marquee'),
	MarqueeText = Marquee.Text,
	MarqueeSupport = Marquee.Support;


/**
* {@link module:moonstone/ChannelInfo~ChannelInfoBadge} is a simple kind used to display a badge
* containing channel information. It is the default kind for components added
* to {@link module:moonstone/ChannelInfo~ChannelInfo}.
*
* @class ChannelInfoBadge
* @extends module:enyo/Control~Control
* @ui
* @public
*/
var ChannelInfoBadge = kind(
	/** @lends module:moonstone/ChannelInfo~ChannelInfoBadge.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ChannelInfoBadge',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'moon-video-badge-text channel-info-text-icon'
});

/**
* {@link module:moonstone/ChannelInfo~ChannelInfo} is a control that displays channel information.  It is
* designed to be used within the [infoComponents]{@link module:moonstone/VideoPlayer~VideoPlayer#infoComponents}
* block of a {@link module:moonstone/VideoPlayer~VideoPlayer}.
*
* Example:
* ```
* var ChannelInfo = require('moonstone/ChannelInfo');
*
* {
*	kind: ChannelInfo,
*	no: 36,
*	name: 'AMC',
*	components: [
*		{content: '3D'},
*		{content: 'Live'},
*		{content: 'REC 08:22', classes: 'redicon'}
*	]
* }
* ```
*
* @class ChannelInfo
* @extends module:enyo/Control~Control
* @mixes module:moonstone/MarqueeSupport~MarqueeSupport
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ChannelInfo~ChannelInfo.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ChannelInfo',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'moon-video-player-channel-info',

	/**
	* @private
	*/
	mixins: [MarqueeSupport],

	/**
	* @private
	*/
	marqueeOnSpotlight: false,

	/**
	* @private
	*/
	marqueeOnHover: true,

	/**
	* @private
	* @lends module:moonstone/ChannelInfo~ChannelInfo.prototype
	*/
	published: {

		/**
		* The channel number.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		channelNo: '',

		/**
		* The name of the channel.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		channelName: '',

		/**
		* A description of the channel.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		channelDesc: '',

		/**
		* A more detailed description of the channel.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		channelMoreDesc: '',

		/**
		* When `true`, [channelNo]{@link module:moonstone/ChannelInfo~ChannelInfo#channelNo} will have locale-safe
		* uppercasing applied.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		uppercaseChannelNo: true,

		/**
		* @deprecated Replaced by [uppercaseChannelNo]{@link module:moonstone/ChannelInfo~ChannelInfo#uppercaseChannelNo}.
		*
		* Formerly defaulted to `true`, now defaults to `null` and will only have
		* an effect when explicitly set (for complete backward compatibility).
		*
		* @type {Boolean}
		* @default null
		* @public
		*/
		channelNoUpperCase: null
	},

	/**
	* @private
	*/
	defaultKind: ChannelInfoBadge,

	/**
	* @private
	*/
	components: [
		{kind: MarqueeText, name: 'channelNo', classes: 'channel-info-number moon-header-font'},
		{kind: MarqueeText, name: 'channelName', classes: 'channel-info-text'},
		{kind: MarqueeText, name: 'channelDesc', classes: 'channel-info-text'},
		{kind: MarqueeText, name: 'channelMoreDesc', classes: 'channel-info-text'},
		{kind: Control, name: 'client', classes: 'channel-info-badges'}
	],

	/**
	* @private
	*/
	bindings: [
		{from: 'channelName', to: '$.channelName.content'},
		{from: 'channelDesc', to: '$.channelDesc.content'},
		{from: 'channelMoreDesc', to: '$.channelMoreDesc.content'}
	],

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);

		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// the channelNoUpperCase property is fully deprecated and removed. The legacy
		// property takes precedence if it exists.
		if (this.channelNoUpperCase !== null) this.uppercaseChannelNo = this.channelNoUpperCase;

		this.channelNoChanged();
	},

	/**
	* @private
	*/
	channelNoChanged: function () {
		var channelNo = this.getChannelNo();
		this.$.channelNo.setContent(this.get('uppercaseChannelNo') ? util.toUpperCase(channelNo) : channelNo);
	},

	/**
	* @private
	*/
	uppercaseChannelNoChanged: function () {
		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// channelNoUpperCase is fully deprecated and removed.
		if (this.channelNoUpperCase != this.uppercaseChannelNo) this.channelNoUpperCase = this.uppercaseChannelNo;
		this.channelNoChanged();
	},

	/**
	* @private
	*/
	channelNoUpperCaseChanged: function () {
		if (this.uppercaseChannelNo != this.channelNoUpperCase) this.uppercaseChannelNo = this.channelNoUpperCase;
		this.uppercaseChannelNoChanged();
	}
});

/**
* The {@link module:moonstone/ChannelInfo~ChannelInfoBadge} definition
*/
module.exports.ChannelInfoBadge = ChannelInfoBadge;

}],'moonstone/VideoInfoHeader':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/VideoInfoHeader~VideoInfoHeader} kind.
* @module moonstone/VideoInfoHeader
*/

require('moonstone');

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	ri = require('enyo/resolution'),
	Control = require('enyo/Control'),
	Img = require('enyo/Image');

var
	Marquee = require('moonstone/Marquee'),
	MarqueeText = Marquee.Text,
	MarqueeSupport = Marquee.Support;

/**
* {@link module:moonstone/VideoInfoHeader~VideoInfoHeader} is a [control]{@link module:enyo/Control~Control} that displays
* various information about a video. It is designed to be used within the
* [infoComponents]{@link module:moonstone/VideoPlayer~VideoPlayer#infoComponents} block of a {@link module:moonstone/VideoPlayer~VideoPlayer}.
*
* Example:
* ```javascript
* var
*	VideoInfoHeader = require('moonstone/VideoInfoHeader');
*
* {
*		kind: VideoInfoHeader,
*		title: 'Breaking Bad - Live Free Or Die',
*	description: 'As Walt deals with the aftermath of the Casa Tranquila explosion, '
*			+ 'Hank works to wrap up his investigation of Gus\' empire.',
*	components: [
*			{content: '3D'},
*			{content: 'Live'}
*	]
* }
* ```
*
* @class VideoInfoHeader
* @extends module:enyo/Control~Control
* @mixes module:moonstone/MarqueeSupport~MarqueeSupport
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/VideoInfoHeader~VideoInfoHeader.prototype */ {

	/**
	* @private
	*/
	name: 'moon.VideoInfoHeader',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'moon-video-player-info-header',

	/**
	* @private
	*/
	mixins: [MarqueeSupport],

	/**
	* @private
	*/
	marqueeOnSpotlight: false,

	/**
	* @private
	*/
	marqueeOnRender: true,

	/**
	* @private
	* @lends module:moonstone/VideoInfoHeader~VideoInfoHeader.prototype
	*/
	published: {

		/**
		* Title of the `VideoInfoHeader`.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		title: '',

		/**
		* Main content of the `VideoInfoHeader`.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		description: '',

		/**
		* When `true`, the title text will have locale-safe uppercasing applied.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		uppercase: true,

		/**
		* @deprecated Replaced by [uppercase]{@link module:moonstone/VideoInfoHeader~VideoInfoHeader#uppercase}.
		*
		* Formerly defaulted to `true`, now defaults to `null` and will only have
		* an effect when explicitly set (for complete backward compatibility).
		*
		* @type {Boolean}
		* @default null
		* @public
		*/
		titleUpperCase: null,

		/**
		* URL of image file.
		*
		* @type {String}
		* @default null
		* @public
		*/
		src: null
	},

	/**
	* @private
	*/
	components: [
		{name: 'videoInfoText', classes: 'info-header-text', components :[
			{kind: MarqueeText, name: 'title', classes: 'info-header-title'},
			{name: 'description', classes: 'info-header-description'}
		]}
	],

	/**
	* @private
	*/
	bindings: [
		{from: 'description', to: '$.description.content'}
	],

	/**
	* @private
	*/
	create: function() {
		Control.prototype.create.apply(this, arguments);

		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// the contentUpperCase property is fully deprecated and removed. The legacy
		// property takes precedence if it exists.
		if (this.titleUpperCase !== null) { this.uppercase = this.titleUpperCase; }
		this.srcChanged();
		this.titleChanged();
	},

	/**
	* @private
	*/
	titleChanged: function() {
		this.$.title.set('content', this.get('uppercase') ? util.toUpperCase(this.get('title')) : this.get('title') );
	},

	/**
	* @private
	*/
	uppercaseChanged: function() {
		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// titleUpperCase is fully deprecated and removed.
		if (this.titleUpperCase != this.uppercase) { this.titleUpperCase = this.uppercase; }
		this.titleChanged();
	},

	/**
	* @private
	*/
	titleUpperCaseChanged: function() {
		if (this.uppercase != this.titleUpperCase) { this.uppercase = this.titleUpperCase; }
		this.uppercaseChanged();
	},

	/**
	* @private
	*/
	srcChanged: function() {
		var img = this.$.videoInfoImage;

		if (this.src) {
			if (img) {
				img.set('src', this.src);
			} else {
				img = this.createComponent({
					name: 'videoInfoImage',
					kind: Img,
					classes: 'info-header-image',
					src: this.src,
					sizing: 'contain',
					style: util.format('width: %.px; height: %.px', ri.scale(96), ri.scale(96)),
					addBefore: this.$.videoInfoText
				});
				if (this.generated) {
					img.render();
				}
			}
		} else if (img) {
			img.destroy();
		}
	}
});

}],'moonstone/Spinner':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Spinner~Spinner} kind.
* @module moonstone/Spinner
*/

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	Control = require('enyo/Control');

var
	Marquee = require('../Marquee'),
	MarqueeText = Marquee.Text,
	MarqueeSupport = Marquee.Support;

/**
* {@link module:moonstone/Spinner~Spinner} is a [control]{@link module:enyo/Control~Control}
* that shows a spinning animation to indicate that activity is taking place. By
* default, the spinner is light-colored and suitable for displaying against a
* dark background. To get a dark spinner (to be shown on a lighter background),
* apply the `moon-light` CSS class:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Spinner = require('moonstone/Spinner');
*
* 	// Normal
* 	{kind: Spinner}
* 	// Light
* 	{kind: Spinner, classes: 'moon-light'}
* 	// Normal with a message
* 	{kind: Spinner, content: 'Loading...'}
* 	// Transparent background
* 	{kind: Spinner, transparent: true}
* ```
*
* Typically, a spinner is shown to indicate activity and hidden to indicate that the activity
* has ended. The animation automatically starts when the spinner is shown. If you wish, you
* may control the animation directly by calling the [start()]{@link module:moonstone/Spinner~Spinner#start},
* [stop()]{@link module:moonstone/Spinner~Spinner#stop}, and [toggle()]{@link module:moonstone/Spinner~Spinner#toggle} methods.
*
* `moonstone/Spinner` supports both `content` text and a `components` block. Note that you
* may only use one of these at a time. Using a `components` block may be desirable if,
* for example, the text in the content section needs [marquee]{@link module:moonstone/Marquee~MarqueeSupport}
* functionality or you'd like to include an [icon]{@link module:moonstone/Icon~Icon} in the message.
*
* @class Spinner
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Spinner~Spinner.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Spinner',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'moon-spinner',

	/**
	* Determines whether spinner's background is transparent.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	transparent: false,

	/**
	* Sets the spinner to be horizontally centered, relative to its containing control. Use in
	* combination with [moon/Spinner#center]{@link module:moonstone/Spinner~Spinner#middle} to center this spinner
	* both horizontally and vertically, or just horizontally.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	center: false,

	/**
	* When `true`, sets the spinner to be vertically centered inside its container. This option
	* has no effect if [moon/Spinner#center]{@link module:moonstone/Spinner~Spinner#center} is `false`. Setting this
	* to false allows the spinner to only be horizontally centered, and not vertically centered.
	*
	* @type {Boolean}
	* @default true
	* @public
	*/
	middle: true,

	/**
	* @private
	*/
	components: [
		{name: 'decorator', kind: Control, classes: 'moon-spinner-ball-decorator spin-ball-animation', components: [
			{kind: Control, classes: 'moon-spinner-ball moon-spinner-ball1'},
			{kind: Control, classes: 'moon-spinner-ball moon-spinner-ball2'},
			{kind: Control, classes: 'moon-spinner-ball moon-spinner-ball3'}
		]}
	],

	/**
	* @private
	*/
	spinnerTools: [
		{name: 'client', kind: Control, classes: 'moon-spinner-client'}
	],

	/**
	* @private
	*/
	initComponents: function() {
		Control.prototype.initComponents.apply(this, arguments);
		this.createTools();
	},

	/**
	* @private
	*/
	createTools: function() {
		// This allows for the spinner instances with child components to not have
		// MarqueeText kind on the client container.
		var tools = util.clone(this.spinnerTools);
		if (!(this.components && this.components.length > 0)) {
			// If there are no components in the spinner, convert its client area to a MarqueeText kind
			util.mixin(tools[0], {
				kind: MarqueeText,
				mixins: [MarqueeSupport],
				marqueeOnSpotlight: false,
				marqueeOnHover: true,
				marqueeOnRender: true,
				marqueeOnRenderDelay: 1000
			});
		}
		this.createChrome(tools);
	},

	/**
	* @private
	*/
	create: function() {
		Control.prototype.create.apply(this, arguments);
		this.contentChanged();
		this.transparentChanged();
		this.centerChanged();
		this.middleChanged();
		this.addClass('running');
	},

	/**
	* Hides the animating spinner.
	*
	* @public
	*/
	stop: function() {
		this.set('showing', false);
	},

	/**
	* Shows the spinner with animation.
	*
	* @public
	*/
	start: function() {
		this.set('showing', true);
	},

	/**
	* Toggles the spinner's visibility state.
	*
	* @public
	*/
	toggle: function() {
		this.set('showing', !this.get('showing'));
	},

	/**
	* @private
	*/
	hasContent: function() {
		// true if this.content is set to something OR if there are more than zero components
		return (!!this.content || (this.components && this.components.length > 0));
	},

	/**
	* @private
	*/
	contentChanged: function(old) {
		Control.prototype.contentChanged.apply(this, arguments);
		if (this.content || old) {
			this.$.client.set('content', this.content);
		}
		this.$.client.set('showing', !!this.content);
		this.addRemoveClass('content', this.hasContent());
	},

	/**
	* @private
	*/
	centerChanged: function(old) {
		this.addRemoveClass('center',this.get('center'));
	},

	/**
	* @private
	*/
	middleChanged: function(old) {
		this.addRemoveClass('middle',this.get('middle'));
	},

	/**
	* @private
	*/
	transparentChanged: function() {
		this.addRemoveClass('moon-spinner-transparent-background', !!this.get('transparent'));
	},

	// Accessibility

	/**
	* @default true
	* @type {Boolean}
	* @see enyo/AccessibilitySupport~AccessibilitySupport#accessibilityAlert
	* @public
	*/
	accessibilityAlert: true,

	/**
	* @default off
	* @type {String}
	* @see enyo/AccessibilitySupport~AccessibilitySupport#accessibilityLive
	* @public
	*/
	accessibilityLive: 'off'
});

},{'../Marquee':'moonstone/Marquee'}],'moonstone/Overlay':[function (module,exports,global,require,request){
require('moonstone');

/**
* {@link module:moonstone/Overlay} contains a set of mixins that support
* providing a layer of controls contextually displayed over another control.
*
* {@link module:moonstone/Overlay~OverlaySupport} provides generic support for overlays.
* With it, you can add arbitrary
* {@link module:moonstone/Overlay~OverlaySupport#overlayComponents} and configure their
* position and formatting.
*
* There are the supplementary mixins for common use cases:
* ({@link module:moonstone/Overlay~SelectionOverlaySupport},
* {@link module:moonstone/Overlay~TextOverlaySupport}, and
* {@link module:moonstone/Overlay~MarqueeOverlaySupport}). These mixins
* preconfigure the overlay with components and expose additional properties to
* further configure the mixin. Unlike most mixins, these three do little on
* their own and must be used in conjunction with
* {@link module:moonstone/Overlay~OverlaySupport}.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Control = require('enyo/Control'),
* 		Overlay = require('moonstone/Overlay');
*
* 	// A control with a default Selection overlay
* 	{kind: Control, mixins: [Overlay.Support, Overlay.Selection]}
*
* 	// A control with a Selection overlay and customized position and components
* 	{kind: Control, mixins: [Overlay.Support, Overlay.Selection],
* 		overlayPosition: 'left', overlayComponents: [
*				{kind: Icon, icon: 'check', small: true}
*			]
* 	}
* ```
*
* @module moonstone/Overlay
*/

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	Binding = require('enyo/Binding');

var
	Icon = require('moonstone/Icon'),
	Marquee = require('moonstone/Marquee');

/**
* Maps the value of `overlayAlign` to the appropriate CSS class
*
* @param	{String}	value	Alignment value
* @return	{String}			CSS Class
*
* @private
*/
function mapAlign (value) {
	return	value == 'left' && 'align-left' ||
			value == 'right' && 'align-right' ||
			value == 'start' && (this.rtl ? 'align-right' : 'align-left') ||
			value == 'end' && (this.rtl ? 'align-left' : 'align-right') ||
			'';
}

/**
* Maps the value of `overlayTransparent` to the appropriate CSS class
*
* @param	{String}	value	Transparency value
* @return	{String}			'transparent'
*
* @private
*/
function mapTransparent (value) {
	return 'transparent';
}

/**
* Maps the value of `overlayPosition` to the appropriate CSS class
*
* @param	{String}	value	Position value
* @return	{String}			CSS Class
*
* @private
*/
function mapPosition (value) {
	return value == 'centered' ? value : 'position-' + value;
}

/**
* Does nothing but used to enable a single observer for property -> class changes
*
* @param	{String}	value	CSS classes
* @return	{String}			The same CSS classes
*
* @private
*/
function mapClasses (value) {
	return value;
}

/**
* Maps the value of `overlayShowing` to the appropriate CSS class
*
* @param	{String}	value	Showing value
* @return	{String}			CSS Class
*
* @private
*/
function mapShowing (showing) {
	return	(showing === true || showing === false) && 'show' ||
			showing == 'spotlight' && 'show-on-spotlight' ||
			showing == 'hover' && 'show-on-hover' ||
			'';
}

/**
* Bound to an overlay container, forwards a changed property value to the container's
* {@link module:moonstone/Overlay~OverlayContainerSupport#overlayTarget}.
*
* @param  {Any}		was		Previous property value
* @param  {Any}		is		Current property value
* @param  {String}	prop	Property name
*
* @private
*/
function forwardPropertyChange (was, is, prop) {
	var target = this.$[this.overlayTarget];
	if (target) {
		// Special handling for overlayComponents to ensure the component ownership is correct
		if (prop == 'overlayComponents') {
			is = updateOwnership(is, this.getInstanceOwner());
		}
		target.set(prop, is);
	}
}

/**
* Iterates over `components` to update the `owner`. Note that `components` is not cloned and is
* updated in place and returned.
*
* @param  {Object[]}		components	Component configs
* @param  {module:enyo/Control~Control}	owner		Owner of components
* @return {Object[]}					Updated component configs
*
* @private
*/
function updateOwnership (components, owner) {
	var control, i;
	if (components) {
		for (i = components.length - 1; i >= 0; --i) {
			control = components[i];
			control.owner = control.owner || owner;
		}
	}
	return components;
}

/**
* {@link module:moonstone/Overlay~OverlaySupport} adds an overlay to show additional
* controls over the control using the mixin. Display of the overlay is controlled
* by {@link module:moonstone/Overlay~OverlaySupport#overlayShowing}, which supports
* displaying the overlay manually, on spotlight, or on hover.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Icon = require('moonstone/Icon'),
* 		Image = require('moonstone/Image'),
* 		Overlay = require('moonstone/Overlay');
*
* 	{kind: Image, src: 'moonstone/src/assets/movie.png', mixins: [Overlay.Support],
* 		overlayShowing: 'hover', overlayPosition: 'bottom', overlayAlign: 'right', overlayComponents: [
*				{kind: Icon, src: 'moonstone/src/assets/icon-recommended.png'},
*				{kind: Icon, icon: 'star'},
*				{kind: Icon, src: 'moonstone/src/assets/icon-new.png'}
* 		]
* 	}
* ```
*
* @mixin OverlaySupport
* @public
*/
module.exports.Support = {

	/**
	* @private
	*/
	name: 'moon.OverlaySupport',

	/**
	* Controls display of the overlay.
	*
	* `true`		Showing
	* `false`		Not showing
	* `'spotlight'`	Showing when an ancestor control is spotted
	* `'hover'`		Showing when its parent is hovered by the pointer
	*
	* @name overlayShowing
	* @type {String|Boolean}
	* @default undefined
	* @public
	*/

	/**
	* The overlay is absolutely positioned over the control on which it is applied. By default, it
	* will cover the entire area but can be configured using this property or by overriding the CSS
	* class `moon-overlay-container`.
	*
	* * `centered`
	*   Contents are vertically and horizontally centered
	* * `top`
	*   Anchored to the top of the container with the natural height of its contents
	* * `bottom`
	*   Anchored to the bottom of the container with the natural height of its contents
	* * `left`
	*   Anchored to the left of the container with the natural width of its contents
	* * `right`
	*   Anchored to the right of the container with the natural width of its contents
	*
	* @name overlayPosition
	* @type {String}
	* @default undefined
	* @public
	*/

	/**
	* Aligns the contents of the overlay.
	*
	* * `left`
	*   Controls are aligned to the left
	* * `right`
	*   Controls are aligned to the left
	* * `start`
	*   Same as `left` for left-to-right languages and `right` for right-to-left languages
	* * `end`
	*   Same as `right` for left-to-right languages and `left` for right-to-left languages
	*
	* @name overlayAlign
	* @type {String}
	* @default undefined
	* @public
	*/

	/**
	* By default, the background of the overlay is black at 50% opacity. Setting this property to
	* `true` makes it transparent.
	*
	* @name overlayTransparent
	* @type {Boolean}
	* @default false
	* @public
	*/

	/**
	* Additional CSS classes that will be applied to the overlay container.
	*
	* @name overlayClasses
	* @type {String}
	* @default undefined
	* @public
	*/

	/**
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.addClass('moon-overlay');
			this.overlayShowing = utils.exists(this.overlayShowing) ? this.overlayShowing : false;

			this.overlayComponentsChanged();

			// Property observers that map property changes to CSS classes
			this.observe('overlayClasses', this.bindSafely(this.overlayPropertyToClass, mapClasses));
			this.observe('overlayPosition', this.bindSafely(this.overlayPropertyToClass, mapPosition));
			this.observe('overlayAlign', this.bindSafely(this.overlayPropertyToClass, mapAlign));
			this.observe('overlayTransparent', this.bindSafely(this.overlayPropertyToClass, mapTransparent));
			this.observe('overlayShowing', this.bindSafely(this.overlayPropertyToClass, mapShowing));
		};
	}),

	/**
	* @private
	*/
	overlayComponentsChanged: function () {
		if (!this.overlayComponents) {
			if (this.$.overlayContainer) this.$.overlayContainer.destroy();
			return;
		}

		if (!this.$.overlayContainer) {
			var classes = ['moon-overlay-container'];
			if (this.overlayClasses) classes.push(this.overlayClasses);
			if (this.overlayPosition) classes.push(mapPosition(this.overlayPosition));
			if (this.overlayAlign) classes.push(mapAlign(this.overlayAlign));
			if (this.overlayTransparent) classes.push(mapTransparent(this.overlayTransparent));
			if (this.overlayShowing) classes.push(mapShowing(this.overlayShowing));

			this.createComponent({name: 'overlayContainer', classes: classes.join(' ')});
		}

		// wrapper should be owned by this but client controls should be owned by the instance owner
		this.$.overlayContainer.createComponent({
			classes: 'moon-overlay-component',
			components: updateOwnership(this.overlayComponents, this.getInstanceOwner()),
			owner: this
		});
	},

	/**
	* Observer that maps a property value to a CSS class and adds or removes it as necessary
	*
	* @private
	*/
	overlayPropertyToClass: function (map, was, is) {
		var c = this.$.overlayContainer;
		if (c) {
			if (was) c.removeClass(map.call(this, was));
			if (is) c.addClass(map.call(this, is));
		}
	}
};

/**
* Binding that expects an array of component configs which will be updated during transform to be
* owned by the binding owner's instance owner.
*
* @class OverlayComponentsBinding
* @public
*/
module.exports.ComponentsBinding = kind({

	/**
	* @private
	*/
	name: 'moon.OverlayComponentsBinding',

	/**
	* @private
	*/
	kind: Binding,

	/**
	* @private
	*/
	transform: function (overlayComponents) {
		return updateOwnership(overlayComponents, this.getInstanceOwner());
	}
});

/**
* Adds observers for the known overlay properties which forward the property changes to the
* contained control with {@link module:moonstone/Overlay~OverlaySupport} identified by
* {@link module:moonstone/Overlay~OverlayContainerSupport#overlayTarget}
*
* @mixin OverlayContainerSupport
* @public
*/
module.exports.Container = {

	/**
	* @private
	*/
	name: 'moon.OverlayContainerSupport',

	/**
	* Name of the contained control with {@link module:moonstone/Overlay~OverlaySupport}
	*
	* @name overlayTarget
	* @type {String}
	* @default undefined
	* @public
	*/

	/**
	* List of overlay properties to forward to this container's
	* {@link module:moonstone/Overlay~OverlayContainerSupport#overlayTarget}
	*
	* @private
	*/
	overlayPropertyBindings: [
		'overlayComponents',
		'overlayShowing',
		'overlayClasses',
		'overlayIcon',
		'overlayTitle',
		'overlaySubtitle',
		'overlayPosition',
		'overlayAlign',
		'overlayTransparent'
	],

	/**
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			var i, prop;
			sup.apply(this, arguments);

			var fn = this.bindSafely(forwardPropertyChange);
			for (i = this.overlayPropertyBindings.length - 1; i >= 0; --i) {
				prop = this.overlayPropertyBindings[i];
				this.observe(prop, fn);
				if (utils.exists(this[prop])) fn(null, this[prop], prop);
			}
		};
	})
};

/**
* Sets the default configuration and components for selection overlay. Requires that the control to
* which it is applied also apply {@link module:moonstone/Overlay~OverlaySupport} or contain a control that
* applies {@link module:moonstone/Overlay~OverlayContainerSupport}.
*
* SelectionOverlaySupport adds the styling for a centered icon that can be shown when the `selected`
* class is applied to the overlaid control.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Icon = require('moonstone/Icon'),
* 		Image = require('moonstone/Image'),
* 		Overlay = require('moonstone/Overlay');
*
* 	{kind: Image, src: 'moonstone/src/assets/movie.png', mixins: [Overlay.Support, Overlay.Selection],
* 		overlayShowing: 'spotlight', overlayComponents: [
*				{kind: Icon, icon: 'check'}
* 		]
* 	}
* ```
*
* @mixin SelectionOverlaySupport
* @public
*/
module.exports.Selection = {

	/**
	* @private
	*/
	name: 'moon.SelectionOverlaySupport',

	/**
	* @private
	*/
	overlayClasses: 'moon-overlay-selection',

	/**
	* @private
	*/
	_selectionOverlay_Handlers: {
		onSpotlightFocused: '_selectionOverlay_spotlightFocused'
	},

	/**
	* @private
	*/
	overlayTransparent: true,

	/**
	* @private
	*/
	overlayPosition: 'centered',

	/**
	* Icon to be displayed when selected. May either be a URL to an image or the valid name of a
	* {@link module:moonstone/Icon~Icon#icon}.
	*
	* @name overlayIcon
	* @type {String}
	* @default undefined
	* @public
	*/
	overlayIcon: 'check',

	/**
	* @private
	*/
	bindings: [
		// to reduce API surface area, we'll only expose overlayIcon and map that to both src and
		// icon ensuring that only 1 is valued based on the presence of a `.` to indicate a URL
		{from: 'overlayIcon', to: '$.overlayIcon.icon', transform: function (icon) {
			return (!icon || icon.indexOf('.') >= 0) ? null : icon;
		}},
		{from: 'overlayIcon', to: '$.overlayIcon.src', transform: function (icon) {
			return (!icon || icon.indexOf('.') == -1) ? null : icon;
		}}
	],

	/**
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			this.overlayComponents = this.overlayComponents || [
				{name: 'overlayIcon', kind: Icon, small: false, owner: this}
			];
			sup.apply(this, arguments);
		};
	}),

	// Accessibility

	/**
	* @private
	*/
	dispatchEvent: kind.inherit(function (sup) {
		return function (sEventName, oEvent, oSender) {
			if (oEvent && !oEvent.delegate) {
				var handler = this._selectionOverlay_Handlers[sEventName];
				if (handler) {
					this[handler](oSender, oEvent);
				}
			}
			return sup.apply(this, arguments);
		};
	}),

	/**
	* @private
	*/
	_selectionOverlay_spotlightFocused: function() {
		if (this.$.overlayIcon && this.$.overlayIcon.getAbsoluteShowing()) {
			this.set('accessibilityRole', 'checkbox');
		} else {
			this.set('accessibilityRole', null);
		}
	},

	/**
	* @private
	*/
	ariaObservers: [
		{from: 'selected', to: 'aria-checked'}
	]
};

/**
* Sets the default configuration and components for fixed text overlay. Requires
* that the control to which it is applied also apply {@link module:moonstone/Overlay~OverlaySupport}
* or contain a control that does and applies {@link module:moonstone/Overlay~OverlayContainerSupport}.
*
* TextOverlaySupport styles controls with the `moon-overlay-text-title` and
* `moon-overlay-text-subtitle` classes
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Image = require('moonstone/Image'),
* 		Marquee = require('moonstone/Marquee'),
* 		Overlay = require('moonstone/Overlay);
*
* 	{kind: Image, src: 'moonstone/src/assets/movie.png', mixins: [Overlay.Support, Overlay.Selection],
* 		overlayShowing: 'spotlight', overlayComponents: [
*				{kind: Marquee.Text, content: 'Title', classes: 'moon-overlay-text-title'},
*				{kind: Marquee.Text, content: '12', classes: 'moon-overlay-text-subtitle'}
* 		]
* 	}
* ```
*
* @mixin TextOverlaySupport
* @public
*/
module.exports.Text = {

	/**
	* @private
	*/
	name: 'moon.TextOverlaySupport',

	/**
	* @private
	*/
	overlayClasses: 'moon-overlay-text',

	/**
	* @private
	*/
	overlayPosition: 'centered',

	/**
	* Text to be displayed on top of the overlay with the `moon-overlay-text-title` class applied
	*
	* @name overlayTitle
	* @type {String}
	* @default undefined
	* @public
	*/

	/**
	* Text to be displayed on bottom of the overlay with the `moon-overlay-text-subtitle` class
	* applied
	*
	* @name overlaySubtitle
	* @type {String}
	* @default undefined
	* @public
	*/

	/**
	* @private
	*/
	bindings: [
		{from: 'overlayTitle', to: '$.overlayTitle.content'},
		{from: 'overlaySubtitle', to: '$.overlaySubtitle.content'}
	],

	/**
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			this.overlayComponents = this.overlayComponents || [
				{name: 'overlayTitle', classes: 'moon-overlay-text-title', owner: this},
				{name: 'overlaySubtitle', classes: 'moon-overlay-text-subtitle', owner: this}
			];
			sup.apply(this, arguments);
		};
	})
};


/**
* Sets the default configuration and components for marqueed text overlay.
* Requires that the control to which it is applied also apply
* {@link module:moonstone/Overlay~OverlaySupport} or contain a control that does
* and applies {@link module:moonstone/Overlay~OverlayContainerSupport}.
*
* @mixin MarqueeOverlaySupport
* @public
*/
module.exports.Marquee = {

	/**
	* @private
	*/
	name: 'moon.MarqueeOverlaySupport',

	/**
	* @private
	*/
	overlayClasses: 'moon-overlay-text',

	/**
	* @private
	*/
	overlayPosition: 'centered',

	/**
	* Text to be displayed on top of the overlay with the `moon-overlay-text-title` class applied
	*
	* @name overlayTitle
	* @type {String}
	* @default undefined
	* @public
	*/

	/**
	* Text to be displayed on bottom of the overlay with the `moon-overlay-text-subtitle` class
	* applied
	*
	* @name overlaySubtitle
	* @type {String}
	* @default undefined
	* @public
	*/

	/**
	* @private
	*/
	bindings: [
		{from: 'overlayTitle', to: '$.overlayTitle.content'},
		{from: 'overlaySubtitle', to: '$.overlaySubtitle.content'}
	],

	/**
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			this.overlayComponents = this.overlayComponents || [
				{name: 'overlayTitle', kind: Marquee.Text, centered: true, classes: 'moon-overlay-text-title', owner: this},
				{name: 'overlaySubtitle', kind: Marquee.Text, centered: true, classes: 'moon-overlay-text-subtitle', owner: this}
			];
			sup.apply(this, arguments);
		};
	})
};

}],'moonstone/ContextualPopup':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ContextualPopup~ContextualPopup} kind.
* @module moonstone/ContextualPopup
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	ri = require('enyo/resolution'),
	util = require('enyo/utils'),
	Control = require('enyo/Control'),
	EnyoHistory = require('enyo/History'),
	Popup = require('enyo/Popup');

var
	ContextualLayout = require('layout/ContextualLayout');

var
	Spotlight = require('spotlight');

var
	$L = require('../i18n'),
	IconButton = require('../IconButton'),
	Scrim = require('moonstone/Scrim'),
	HistorySupport = require('../HistorySupport');

/**
* Fires when the contextual popup is to be shown.
*
* @event module:moonstone/ContextualPopup~ContextualPopup#onRequestShowPopup
* @type {Object}
* @property {Object} activator - A reference to the activating object.
* @public
*/

/**
* Fires when the contextual popup is to be hidden. No additional data is included
* with this event.
*
* @event module:moonstone/ContextualPopup~ContextualPopup#onRequestHidePopup
* @type {Object}
* @public
*/

/**
* Fires when the contextual popup is activated. Extends {@link module:enyo/Popup~Popup#onActivate}.
*
* @event module:moonstone/ContextualPopup~ContextualPopup#onActivate
* @type {Object}
* @property {Object} sentFromPopup - A reference to the popup.
* @public
*/

/**
* {@link module:moonstone/ContextualPopup~ContextualPopup} is a popup window control with Moonstone visual
* styling applied. It extends {@link module:enyo/Popup~Popup} and is designed to be used with
* {@link module:moonstone/ContextualPopupDecorator~ContextualPopupDecorator}.
*
* @class ContextualPopup
* @extends module:enyo/Popup~Popup
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ContextualPopup~ContextualPopup.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ContextualPopup',

	/**
	* @private
	*/
	kind: Popup,

	/**
	* @private
	*/
	mixins: [HistorySupport],

	/**
	* @private
	*/
	layoutKind: ContextualLayout,

	/**
	* @private
	*/
	classes: 'moon-body-text moon-contextual-popup moon-neutral',

	/**
	* @private
	*/
	events: {
		onRequestSpot: ''
	},

	/**
	* @private
	*/
	handlers: {
		onRequestShowPopup: 'requestShow',
		onRequestHidePopup: 'requestHide',
		onActivate: 'decorateActivateEvent',
		onRequestScrollIntoView: '_preventEventBubble',
		onSpotlightContainerLeave: 'onLeave'
	},

	/**
	* @private
	*/
	eventsToCapture: {
		onSpotlightKeyDown: 'capturedKeyDown',
		onSpotlightFocus: 'capturedFocus'
	},

	/**
	* @private
	*/
	modal: true,

	/**
	* @private
	* @lends module:moonstone/ContextualPopup~ContextualPopup.prototype
	*/
	published: {

		/**
		* If `true`, focus cannot leave the constraints of the popup unless the
		* popup is explicitly closed. This property's value is copied to
		* [modal]{@link module:enyo/Popup~Popup#modal} at initialization time.
		* Additionally, these two properties are synced whenever one of the following properties changes:
		* [spotlightModal]{@link module:moonstone/ContextualPopup~ContextualPopup#spotlightModal},
		* [modal]{@link module:enyo/Popup~Popup#modal},
		* [modal]{@link module:enyo/Popup~Popup#scrim},
		* [modal]{@link module:enyo/Popup~Popup#scrimWhenModal},
		* [modal]{@link module:enyo/Popup~Popup#floating}.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		spotlightModal: false,

		/**
		* When `true`, the close button is shown; when `false`, it is hidden.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		showCloseButton: false
	},

	/**
	* @private
	*/
	spotlight: 'container',

	/**
	* @private
	*/
	floating: true,

	/**
	* Determines whether a scrim will appear when the popup is modal.
	* Note that modal scrims are transparent, so you won't see them.
	*
	* @private
	*/
	scrimWhenModal: true,

	// Layout parameters

	/**
	* Vertical flush layout margin.
	*
	* @private
	*/
	vertFlushMargin:0,

	/**
	* Horizontal flush layout margin.
	*
	* @private
	*/
	horizFlushMargin:0,

	/**
	* Popups wider than this value are considered wide (for layout purposes).
	*
	* @private
	*/
	widePopup: ri.scale(210),

	/**
	* Popups longer than this value are considered long (for layout purposes).
	*
	* @private
	*/
	longPopup: ri.scale(210),

	/**
	* Do not allow horizontal flush popups past spec'd amount of buffer space on left/right
	* screen edge.
	*
	* @private
	*/
	horizBuffer: ri.scale(15),

	/**
	* @private
	*/
	activator: null,

	/**
	* @private
	*/
	observers: [
		{method: 'updateScrim', path: [ 'modal', 'spotlightModal', 'floating', 'scrim', 'scrimWhenModal' ]}
	],

	/**
	* @private
	*/
	tools: [
		{name: 'client', kind: Control, classes: 'moon-contextual-popup-client'},
		{name: 'closeButton', kind: IconButton, icon: 'closex', classes: 'moon-popup-close', ontap: 'closePopup', backgroundOpacity: 'transparent', accessibilityLabel: $L('Close'), tabIndex: -1, spotlight: false}
	],

	/**
	* Creates chrome components.
	*
	* @private
	*/
	initComponents: function () {
		this.createChrome(this.tools);
		Popup.prototype.initComponents.apply(this, arguments);
		this.modal = this.spotlightModal;
	},

	/**
	* @private
	*/
	create: function () {
		Popup.prototype.create.apply(this, arguments);
		this.showCloseButtonChanged();
	},

	/**
	* Renders the contextual popup.
	*
	* @private
	*/
	render: function () {
		this.allowHtmlChanged();
		this.contentChanged();
		Popup.prototype.render.apply(this, arguments);
	},

	/**
	FixMe: overriding the control's default hide method to support the existing sequential tapping
	and the dependent decorator code inorder to handle some special cases.
	*/
	hide: function(inSender, e) {

		if (this.tapCaptured) {
			this.tapCaptured = false;
			this.popupActivated = true;
		} else {
			this.popupActivated = false;
		}
		Popup.prototype.hide.apply(this, arguments);

	},

	/**
	* Performs control-specific tasks before/after showing {@link module:moonstone/ContextualPopup~ContextualPopup}.
	*
	* @private
	*/
	requestShow: function (inSender, inEvent) {
		var n = inEvent.activator.hasNode();
		this.activator = inEvent.activator;
		if (n) {
			this.activatorOffset = this.getPageOffset(n);
		}
		this.show();
		if (Spotlight.isSpottable(this)) {
			Spotlight.spot(this);
		}
		return true;
	},

	/**
	* @fires module:enyo/Popup~Popup#onActivate
	* @private
	*/
	decorateActivateEvent: function (inSender, inEvent) {
		inEvent.sentFromPopup = this;
	},

	/**
	* @private
	*/
	getPageOffset: function (inNode) {
		// getBoundingClientRect returns top/left values which are relative to the viewport and
		// not absolute
		var r = inNode.getBoundingClientRect(),
			pageYOffset = window.pageYOffset,
			pageXOffset = window.pageXOffset,
			rHeight = r.height,
			rWidth = r.width;

		return {top: r.top + pageYOffset, left: r.left + pageXOffset, height: rHeight, width: rWidth, bottom: r.top + pageYOffset + rHeight, right: r.left + pageXOffset + rWidth};
	},

	/**
	* @private
	*/
	resetDirection: function () {
		this.removeClass('right');
		this.removeClass('left');
		this.removeClass('high');
		this.removeClass('low');
		this.removeClass('below');
		this.removeClass('above');
	},

	/**
	* Alters the direction of the popup.
	*
	* @private
	*/
	alterDirection: function () {
		if (this.showing) {
			var clientRect = this.getBoundingRect(this.node);
			var viewPortHeight = dom.getWindowHeight();
			var viewPortWidth = dom.getWindowWidth();
			var offsetHeight = (clientRect.height - this.activatorOffset.height) / 2;
			var offsetWidth = (clientRect.width - this.activatorOffset.width) / 2;
			var popupMargin = 20;

			var bounds = {top: null, left: null};

			if(this.direction === 'left') {
				if(clientRect.width + popupMargin < this.activatorOffset.left) {
					this.resetDirection();
					this.addClass('right');

					if(this.activatorOffset.top < offsetHeight) {
						this.addClass('high');
						bounds.top = this.activatorOffset.top;
					} else if(viewPortHeight - this.activatorOffset.bottom < offsetHeight) {
						this.addClass('low');
						bounds.top = this.activatorOffset.bottom - clientRect.height;
					} else {
						bounds.top = this.activatorOffset.top - offsetHeight;
					}

					bounds.left = this.activatorOffset.left - clientRect.width;
				}
			} else if(this.direction === 'right') {
				if(viewPortWidth > this.activatorOffset.right + clientRect.width + popupMargin) {
					this.resetDirection();
					this.addClass('left');

					if(this.activatorOffset.top < offsetHeight) {
						this.addClass('high');
						bounds.top = this.activatorOffset.top;
					} else if(viewPortHeight - this.activatorOffset.bottom < offsetHeight) {
						this.addClass('low');
						bounds.top = this.activatorOffset.bottom - clientRect.height;
					} else {
						bounds.top = this.activatorOffset.top - offsetHeight;
					}

					bounds.left = this.activatorOffset.right;
				}
			} else if(this.direction === 'top') {
				if(clientRect.height + popupMargin < this.activatorOffset.top) {
					this.resetDirection();
					this.addClass('above');

					if(this.activatorOffset.left < offsetWidth) {
						this.addClass('right');
						bounds.left = this.activatorOffset.left;
					} else if(viewPortWidth - this.activatorOffset.right < offsetWidth) {
						this.addClass('left');
						bounds.left = this.activatorOffset.right - clientRect.width;
					} else {
						bounds.left = this.activatorOffset.left - offsetWidth;
					}

					bounds.top = this.activatorOffset.top - clientRect.height;
				}
			} else if(this.direction === 'bottom') {
				if(viewPortHeight > this.activatorOffset.bottom + clientRect.height + popupMargin) {
					this.resetDirection();
					this.addClass('below');

					if(this.activatorOffset.left < offsetWidth) {
						this.addClass('right');
						bounds.left = this.activatorOffset.left;
					} else if(viewPortWidth - this.activatorOffset.right < offsetWidth) {
						this.addClass('left');
						bounds.left = this.activatorOffset.right - clientRect.width;
					} else {
						bounds.left = this.activatorOffset.left - offsetWidth;
					}

					bounds.top = this.activatorOffset.bottom;
				}
			}

			this.setBounds(bounds);
		}
	},

	/**
	* @private
	*/
	getBoundingRect: function (node) {
		// getBoundingClientRect returns top/left values which are relative to the viewport and not absolute
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
	* Dismisses popup if Escape keypress is detected.
	*
	* @private
	*/
	keydown: function (inSender, inEvent) {
		if (this.showing && this.autoDismiss && inEvent.keyCode == 27 /* escape */) {
			this.hide();
			Spotlight.spot(this.activator);
		}
	},

	/**
	* @private
	*/
	closePopup: function (inSender, inEvent) {
		this.$.closeButton.removeClass('pressed');
		this.hide();
		Spotlight.spot(this.activator);
		return true;
	},

	/**
	* @private
	*/
	contentChanged: function () {
		this.$.client.set('content', this.content);
	},

	/**
	* @private
	*/
	allowHtmlChanged: function () {
		this.$.client.set('allowHtml', this.allowHtml);
	},

	/**
	* Called when [showCloseButton]{@link module:moonstone/ContextualPopup~ContextualPopup#showCloseButton} changes.
	*
	* @private
	*/
	showCloseButtonChanged: function () {
		this.$.closeButton.set('showing', this.showCloseButton);
		this.$.closeButton.spotlight = this.showCloseButton;
		this.addRemoveClass('reserve-close', this.showCloseButton);
	},

	/**
	* @private
	*/
	capturedKeyDown: function (inSender, inEvent) {
		if (inEvent.keyCode == 13) {
			this.downEvent = inEvent;
		}
		return this.modal && this.spotlightModal;
	},

	/**
	* @private
	*/
	capturedFocus: function(inSender, inEvent) {
		if(this.modal && this.spotlightModal) {
			Spotlight.spot(this);
			return true;
		}
	},

	/**
	* @private
	*/
	capturedTap: function (inSender, inEvent) {
		// If same activator tapped sequentially, the state of the popup is remembered.
		if (this.downEvent && this.downEvent.dispatchTarget.isDescendantOf(this.activator)) {
			this.popupActivated = true;
			this.tapCaptured = true;
		}
		Popup.prototype.capturedTap.apply(this, arguments);
	},

	/**
	* @private
	*/
	onLeave: function (oSender, oEvent) {
		if (oEvent.originator == this && !Spotlight.getPointerMode()) {
			this.popupActivated = false;
			this.hide();
			Spotlight.spot(this.activator);
		}
	},

	/**
	* @private
	*/
	_preventEventBubble: function (inSender, inEvent) {
		return true;
	},

	/**
	* @private
	*/
	updateScrim: function (old, value, source) {
		if (this._updateScrimMutex) return;
		this._updateScrimMutex = true;

		// We sync modal and spotlightModal here because binding doesn't
		// guarantee sequence when it is used with observers.
		if (source == 'modal') this.set('spotlightModal', this.modal);
		if (source == 'spotlightModal') this.set('modal', this.spotlightModal);
		this.showHideScrim(this.showing);

		this._updateScrimMutex = false;
	},

	/**
	* @private
	*/
	showHideScrim: function (show) {
		var scrim = this.getScrim();

		if (this._scrim && scrim != this._scrim) {
			// hide if there was different kind of scrim
			this._scrim.hideAtZIndex(this._scrimZ);
			if (this.scrimClassName) this._scrim.removeClass(this.scrimClassName);
		}

		if (show && this.floating && (this.scrim || (this.modal && this.scrimWhenModal))) {
			// move scrim to just under the popup to obscure rest of screen
			var i = this.getScrimZIndex();
			this._scrimZ = i;
			scrim.showAtZIndex(i);
		} else {
			scrim.hideAtZIndex(this._scrimZ);
		}
		util.call(scrim, 'addRemoveClass', [this.scrimClassName, scrim.showing]);
		this._scrim = scrim;
	},

	/**
	* @private
	*/
	getScrimZIndex: function () {
		// Position scrim directly below popup
		return this.findZIndex()-1;
	},

	/**
	* @private
	*/
	getScrim: function () {
		// show a transparent scrim for modal popups if
		// {@link module:moonstone/ContextualPopup~ContextualPopup#scrimWhenModal} is `true`, else show a
		// regular scrim.
		if (this.modal && this.scrimWhenModal && !this.scrim) {
			return Scrim.scrimTransparent.make();
		}
		return Scrim.scrim.make();
	},

	/**
	* @private
	*/
	showingChanged: function () {
		Popup.prototype.showingChanged.apply(this, arguments);
		this.alterDirection();

		if (this.allowBackKey) {
			if (this.showing) {
				this.pushBackHistory();
			} else if(!this.showing && !EnyoHistory.isProcessing()) {
				EnyoHistory.drop();
			}
		}
	},

	/**
	* @private
	*/
	backKeyHandler: function() {
		if (this.showing) {
			this.hide();
		}

		if (this.spotlight && !this.spotlightDisabled) {
			this.doRequestSpot();
		}
		return true;
	},

	/**
	* @private
	*/
	directionChanged: function () {
		this.alterDirection();
	},

	// Accessibility

	/**
	* When `true`, the contents of the popup will be read when shown.
	*
	* @default true
	* @type {Boolean}
	* @public
	*/
	accessibilityReadAll: true,

	/**
	* @private
	*/
	accessibilityLive: 'off',

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['accessibilityReadAll', 'accessibilityRole', 'showing'], method: function () {
			this.startJob('alert', function () {
				this.setAriaAttribute('role', this.accessibilityReadAll && this.showing ? 'alert' : this.accessibilityRole);
			}, 100);
		}}
	]
});

},{'../i18n':'moonstone/i18n','../IconButton':'moonstone/IconButton','../HistorySupport':'moonstone/HistorySupport'}],'moonstone/PagingControl':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/PagingControl~PagingControl} kind.
* @module moonstone/PagingControl
*/

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	animation = require('enyo/animation');

var
	Spotlight = require('spotlight'),
	$L = require('../i18n');

var
	IconButton = require('../IconButton');

/**
* Fires when page boundary is reached.
*
* @event module:moonstone/PagingControl~PagingControl#onPaginate
* @type {Object}
* @property {Number} scrollDelta - The distance of the scroll.
* @public
*/

/**
* Fires when we've determined how large the bounceback effect should be.
*
* @event module:moonstone/PagingControl~PagingControl#onPaginateScroll
* @type {Object}
* @property {Number} scrollDelta - The magnitude of the scroll bounceback.
* @public
*/

/**
* {@link module:moonstone/PagingControl~PagingControl} is a paging control button derived from
* {@link module:moonstone/IconButton~IconButton}. This control is not intended for use outside of
* {@link module:moonstone/Scroller~Scroller}.
*
* @class PagingControl
* @extends module:moonstone/IconButton~IconButton
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/PagingControl~PagingControl.prototype */ {

	/**
	* @private
	*/
	name: 'moon.PagingControl',

	/**
	* @private
	*/
	kind: IconButton,

	/**
	* @private
	*/
	classes: 'moon-paging-button no-background',

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	* @lends module:moonstone/PagingControl~PagingControl.prototype
	*/
	published: {
		/**
		* The side of the control where the button will be.
		*
		* Supported values are `'top'`, `'right'`, `'bottom'`, and `'left'`.
		*
		* @type {String}
		* @default null
		* @public
		*/
		side: null
	},

	/**
	* @private
	*/
	backgroundOpacity: 'transparent',

	/**
	* @private
	*/
	handlers: {
		ondown: 'down',
		onup: 'endHold',
		onleave: 'endHold',
		onhold: 'hold',
		onActivate: 'noop'
	},

	/**
	* @private
	*/
	events: {
		/**
		* {@link module:moonstone/PagingControl~PagingControl#onPaginate}
		*/
		onPaginate: '',

		/**
		* {@link module:moonstone/PagingControl~PagingControl#onPaginateScroll}
		*/
		onPaginateScroll: ''
	},

	/**
	* @private
	*/
	downTime: 0,

	/**
	* @private
	*/
	initialDelta: 2.5,

	/**
	* @private
	*/
	delta: 0,

	/**
	* @private
	*/
	maxDelta: 45,

	/**
	* @private
	*/
	tapDelta: 15,

	/**
	* @private
	*/
	bumpDeltaMultiplier: 3,

	/**
	* @private
	*/
	create: function () {
		IconButton.prototype.create.apply(this, arguments);
		this.sideChanged();
	},

	/**
	* Stops scrolling animation and triggers
	* [onPaginate]{@link module:moonstone/PagingControl~PagingControl#onPaginate} event with a delta
	* value for the bounceback effect.
	*
	* @fires module:moonstone/PagingControl~PagingControl#onPaginate
	* @public
	*/
	hitBoundary: function () {
		this.stopHoldJob();
		this.downTime = null;
		this.doPaginate({scrollDelta: this.delta * this.bumpDeltaMultiplier});
		Spotlight.Accelerator.cancel();
	},

	/**
	* @private
	*/
	_iconMappings: {
		'top': 'arrowlargeup',
		'bottom': 'arrowlargedown',
		'left': 'arrowlargeleft',
		'right': 'arrowlargeright'
	},

	/**
	* Set this control's CSS class based on its [side]{@link module:moonstone/PagingControl~PagingControl#side}
	* value.
	*
	* @private
	*/
	sideChanged: function (old) {
		var s = this.side;
		if(old) {
			this.removeClass(old);
		}
		this.addClass(s);
		this.setIcon(this._iconMappings[s]);
	},

	/**
	* @private
	*/
	down: function (sender, event) {
		if (this.disabled) {
			return;
		}

		this.downTime = utils.perfNow();
		this.delta = this.initialDelta;
	},

	/**
	* @private
	*/
	hold: function (sender, event) {
		if (this.disabled) {
			return;
		}

		this.startHoldJob();
	},

	/**
	* @private
	*/
	depress: function (sender, event) {
		IconButton.prototype.depress.apply(this, arguments);
		// keydown events repeat (while mousedown/hold does not); simulate
		// hold behavior with mouse by catching the second keydown event
		if (event.keyCode === 13) {
			this.set('pressed', true);
			if (!this.downCount) {
				this.down();
				this.downCount = 1;
			} else {
				this.downCount++;
			}
			if (this.downCount == 2) {
				this.hold();
			}
		}
	},

	/**
	* @private
	*/
	undepress: function (sender, event) {
		this.set('pressed', false);
		IconButton.prototype.undepress.apply(this, arguments);
		this.endHold(sender, event);
	},

	/**
	* @private
	*/
	endHold: function (sender, event) {
		if (!this.downTime) {
			return;
		}

		this.downCount = 0;
		this.stopHoldJob();
		this.sendPaginateEvent();
		this.downTime = null;
	},

	/**
	* @fires module:moonstone/PagingControl~PagingControl#onPaginateScroll
	* @private
	*/
	startHoldJob: function () {
		this.stopHoldJob();

		var t0 = utils.perfNow(),
			t = 0
		;

		var fn = this.bindSafely(function () {
			this.job = animation.requestAnimationFrame(fn);

			t = (utils.perfNow() - t0)/1000;
			this.delta = Math.min(this.maxDelta, this.delta + (0.1 * Math.pow(t, 1.1)));

			this.doPaginateScroll({scrollDelta: this.delta});
		});

		this.job = animation.requestAnimationFrame(fn);
	},

	/**
	* @private
	*/
	stopHoldJob: function () {
		this.job = animation.cancelAnimationFrame(this.job);
	},

	/**
	* @fires module:moonstone/PagingControl~PagingControl#onPaginate
	* @private
	*/
	sendPaginateEvent: function () {
		var tapThreshold = 200,
			timeElapsed = utils.perfNow() - this.downTime,
			delta = (timeElapsed <= tapThreshold) ? this.tapDelta : this.delta;

		this.doPaginate({scrollDelta: delta});
	},

	/**
	* Overrides default focused handling to make sure scroller doesn't scroll to
	* this button.
	*
	* @private
	*/
	spotlightFocused: function () {
		this.set('spotted', true);
	},

	/**
	* @private
	*/
	spotlightBlurred: function (sender, event) {
		IconButton.prototype.spotlightBlurred.apply(this, arguments);
		this.set('spotted', false);
		this.endHold(sender, event);
	},

	/**
	* @private
	*/
	noop: function () { return true; },

	// Accessibility

	/*
	* @private
	*/
	spotted: false,

	/*
	* @private
	*/
	pressed: false,

	/**
	* @private
	*/
	accessibilityLive: 'off',

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['side', 'spotted'], method: function () {
			var side = this.get('side');
			if (this.spotted) {
				switch(side) {
					case 'top':
						this.set('accessibilityLabel', $L('scroll up'));
						break;
					case 'bottom':
						this.set('accessibilityLabel', $L('scroll down'));
						break;
					case 'left':
						this.set('accessibilityLabel', $L('scroll left'));
						break;
					case 'right':
						this.set('accessibilityLabel', $L('scroll right'));
						break;
				}
			}
		}},
		{path: 'pressed', method: function () {
			var side = this.get('side');
			if (this.pressed) {
				switch(side) {
					case 'top':
						this.set('accessibilityLabel', $L('UP'));
						break;
					case 'bottom':
						this.set('accessibilityLabel', $L('DOWN'));
						break;
					case 'left':
						this.set('accessibilityLabel', $L('LEFT'));
						break;
					case 'right':
						this.set('accessibilityLabel', $L('RIGHT'));
						break;
				}
				this.set('accessibilityAlert', true);
			} else {
				this.set('accessibilityAlert', null);
				this.set('accessibilityLabel', null);
			}
		}}
	]
});

},{'../i18n':'moonstone/i18n','../IconButton':'moonstone/IconButton'}],'moonstone/VideoFullscreenToggleButton':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/VideoFullscreenToggleButton~VideoFullscreenToggleButton} kind.
* @module moonstone/VideoFullscreenToggleButton
*/

require('moonstone');

var
	kind = require('enyo/kind');

var
	$L = require('../i18n'),
	IconButton = require('moonstone/IconButton');

/**
* {@link module:moonstone/VideoFullscreenToggleButton~VideoFullscreenToggleButton} is a specialized {@link module:moonstone/IconButton~IconButton};
* when placed inside a {@link module:moonstone/VideoPlayer~VideoPlayer}, the button may be tapped to toggle
* the video player's fullscreen state.
*
* @class VideoFullscreenToggleButton
* @extends module:moonstone/IconButton~IconButton
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/VideoFullscreenToggleButton~VideoFullscreenToggleButton */ {

	/**
	* @private
	*/
	name: 'moon.VideoFullscreenToggleButton',

	/**
	* @private
	*/
	kind: IconButton,

	/**
	* @private
	*/
	icon : 'exitfullscreen',

	/**
	* @private
	*/
	small: false,

	/**
	* @private
	*/
	classes : 'moon-icon-exitfullscreen-font-style',

	/**
	* @private
	*/
	events: {
		/**
		* {@link module:moonstone/VideoPlayer~VideoPlayer#onRequestToggleFullscreen}
		*/
		onRequestToggleFullscreen:''
	},

	/**
	* @private
	*/
	handlers: {
		/**
		* @fires module:moonstone/VideoPlayer~VideoPlayer#onRequestToggleFullscreen
		*/
		ontap: 'doRequestToggleFullscreen'
	},

	// Accessibility

	/**
	* @private
	*/
	ariaObservers: [
		{path: 'icon', method: function () {
			if (this.icon === 'exitfullscreen') {
				this.set('accessibilityLabel', $L('original screen'));
			} else {
				this.set('accessibilityLabel', $L('full screen'));
			}
		}}
	]
});

},{'../i18n':'moonstone/i18n'}],'moonstone/Slider':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Slider~Slider} kind.
* @module moonstone/Slider
*/

var
	kind = require('enyo/kind'),
	gesture = require('enyo/gesture'),
	Control = require('enyo/Control'),
	Animator = require('enyo/Animator');

var
	Spotlight = require('spotlight');

var
	ProgressBar = require('../ProgressBar'),
	IconButton = require('../IconButton');

var
	$L = require('../i18n');

/**
* Fires when bar position is set.
*
* @event module:moonstone/Slider~Slider#onChange
* @type {Object}
* @property {Number} value - The value of the current position.
* @public
*/

/**
* Fires while control knob is being dragged.
*
* @event module:moonstone/Slider~Slider#onChanging
* @type {Object}
* @property {Number} value - The value of the current position.
* @public
*/

/**
* Fires when animation to a position finishes. No additional information is passed with this
* event.
*
* @event module:moonstone/Slider~Slider#onAnimateFinish
* @type {Object}
* @public
*/

/**
* {@link module:moonstone/Slider~Slider} is a [control]{@link module:enyo/Control~Control}
* that presents a range of selection options in the form of a horizontal slider
* with a control knob. The knob may be tapped and dragged to the desired location.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Slider = require('moonstone/Slider');
*
* 	{kind: Slider, value: 30}
* ```
*
* @class Slider
* @extends module:moonstone/ProgressBar~ProgressBar
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Slider~Slider.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Slider',

	/**
	* @private
	*/
	kind: ProgressBar,

	/**
	* @private
	*/
	classes: 'moon-slider',

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	* @lends module:moonstone/Slider~Slider.prototype
	*/
	published: {

		/**
		* Position of slider, expressed as an integer between `0` and `100`, inclusive.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		value: 0,

		/**
		* Sliders may "snap" to multiples of this value in either direction.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		increment: 0,

		/**
		* When `true`, current progress is styled differently from rest of bar.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		lockBar: true,

		/**
		* When `true`, tapping on bar will change current position.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		tappable: true,

		/**
		* When `true`, jumpIncrement button will be displayed in both side of slider.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		enableJumpIncrement: false,

		/**
		* Sliders will increase or decrease as much as this percentage or value in either direction
		* when jumpIncrement button is tapped.
		*
		* @type {Number|String}
		* @default '10%'
		* @public
		*/
		jumpIncrement: '10%',

		/**
		* Sliders will use this icon name for the button that decreases the value. Another good
		* alternative would be 'minus'.
		*
		* @type {String}
		* @default 'arrowlargeleft'
		* @public
		*/
		decrementIcon: 'arrowlargeleft',

		/**
		* Sliders will use this icon name for the button that increases the value. Another good
		* alternative would be 'plus'.
		*
		* @type {String}
		* @default 'arrowlargeright'
		* @public
		*/
		incrementIcon: 'arrowlargeright',

		/**
		* CSS classes to apply to the knob.
		*
		* @type {String}
		* @default 'moon-slider-knob'
		* @public
		*/
		knobClasses: 'moon-slider-knob',

		/**
		* CSS classes to apply to the tap area.
		*
		* @type {String}
		* @default 'moon-slider-taparea'
		* @deprecated This control no longer uses a DOM element as a tap area and relies on a
		* 	runtime pseudo-class to capture taps.
		* @public
		*/
		tapAreaClasses: 'moon-slider-taparea',

		/**
		* If set to `true`, button is shown as disabled and does not generate tap events.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false,

		/**
		* When `true`, knob and progress move with animation when left or right direction
		* key is pressed, or when bar is tapped.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		animate: true,

		/**
		* When `false`, knob may be moved past the
		* [bgProgress]{@link module:moonstone/ProgressBar~ProgressBar#bgProgress} value.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		constrainToBgProgress: false,

		/**
		* Overriding the default value of popup to `true`
		*
		* @see module:moonstone/ProgressBar~ProgressBar#popup
		* @type {Boolean}
		* @default true
		* @public
		*/
		popup: true,

		/**
		* When `false`, the popup bubble is displayed while the slider is being adjusted.
		*
		* @type {Boolean}
		* @default false
		* @deprecated Replaced by {@link module:moonstone/ProgressBar~ProgressBar#popup}
		* @public
		*/
		noPopup: false,

		/**
		* If set to `true`, an elastic visual effect is seen when the knob is dragged past
		* the [bgProgress]{@link module:moonstone/ProgressBar~ProgressBar#bgProgress} value.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		elasticEffect: false
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
	* @private
	*/
	handlers: {
		ondragstart: 'dragstart',
		ondrag: 'drag',
		ondragfinish: 'dragfinish',
		onSpotlightFocused: 'spotFocused',
		onSpotlightSelect: 'spotSelect',
		onSpotlightBlur: 'spotBlur',
		onSpotlightUp: 'spotUp',
		onSpotlightDown: 'spotDown',
		onSpotlightLeft: 'spotLeft',
		onSpotlightRight: 'spotRight'
	},

	/**
	* @private
	*/
	moreComponents: [
		{name: 'animator', kind: Animator, onStep: 'animatorStep', onEnd: 'animatorComplete'},
		{name: 'knob', kind: Control, ondown: 'handleKnobDown', onup: 'handleKnobUp'}
	],

	/**
	* @private
	*/
	jumpWrapperComponents: [
		{
			name: 'buttonLeft',
			kind: IconButton,
			backgroundOpacity: 'transparent',
			classes: 'moon-slider-button left',
			icon: 'arrowlargeleft',
			onSpotlightSelect: 'preventEvent',
			onSpotlightKeyDown: 'jumpButtonTriggered',
			onSpotlightKeyUp: 'jumpButtonReleased',
			ondown: 'jumpButtonTriggered',
			onup: 'jumpButtonReleased',
			onholdpulse: 'jumpButtonTriggered',
			onrelease: 'jumpButtonReleased',
			ondragstart: 'preventEvent',
			defaultSpotlightDisappear: 'buttonRight'
		},
		{name: 'slider', classes: 'moon-slider', spotlight: true, accessibilityLive: 'polite'},
		{
			name: 'buttonRight',
			kind: IconButton,
			backgroundOpacity: 'transparent',
			classes: 'moon-slider-button right',
			icon: 'arrowlargeright',
			onSpotlightSelect: 'preventEvent',
			onSpotlightKeyDown: 'jumpButtonTriggered',
			onSpotlightKeyUp: 'jumpButtonReleased',
			ondown: 'jumpButtonTriggered',
			onup: 'jumpButtonReleased',
			onholdpulse: 'jumpButtonTriggered',
			onrelease: 'jumpButtonReleased',
			ondragstart: 'preventEvent',
			defaultSpotlightDisappear: 'buttonLeft'
		}
	],

	/**
	*/
	animatingTo: null,

	/**
	* Spotlight state of slider
	*
	* @type {Boolean}
	* @private
	*/
	selected: false,

	/**
	* @private
	*/
	selectedChanged: function (was, is) {
		this.$.knob.addRemoveClass('spotselect', this.selected);
		this.set('knobSelected', this.selected);
	},

	/**
	* Knob selected state set by either via tap, drag, or spot
	*
	* @type {Boolean}
	* @private
	*/
	knobSelected: false,

	/**
	* @private
	*/
	knobSelectedChanged: function (was, is) {
		this.$.bar.addRemoveClass('selected', this.knobSelected);
	},

	/**
	* Drag state of slider
	*
	* @type {Boolean}
	* @private
	*/
	dragging: false,

	/**
	* @private
	*/
	draggingChanged: function (was, is) {
		this.$.knob.addRemoveClass('active', this.dragging);
		this.set('knobSelected', this.dragging);
	},

	/**
	* Animates to the given value.
	*
	* @param {Number} start - The start position, as an integer between `0` and `100`.
	* @param {Number} end - The end position, as an integer between `0` and `100`.
	* @public
	*/
	animateTo: function (start, end) {
		start = this.clampValue(this.min, this.max, start);
		end = this.clampValue(this.min, this.max, end); // Moved from animatorStep
		this.animatingTo = end;

		this.$.animator.play({
			startValue: start,
			endValue: end,
			node: this.hasNode()
		});
	},

	/**
	* Determines whether the slider is currently being dragged.
	*
	* @returns {Boolean} `true` if the slider is currently being dragged; otherwise, `false`.
	* @public
	*/
	isDragging: function () {
		return this.dragging;
	},

	/**
	* @private
	*/
	create: function () {
		ProgressBar.prototype.create.apply(this, arguments);
		// Compatibility code for noPopup. Intentionally updating after the super call because this
		// control assumes the popup will be created and `popup` will only affect its display
		if (this.hasOwnProperty('noPopup')) this.popup = !this.noPopup;

		this.initValue();
		this.disabledChanged();
		this.knobClassesChanged();
		this.enableJumpIncrementChanged();
		this.jumpIncrementChanged();
	},

	/**
	* @private
	*/
	initComponents: function () {
		if (this.enableJumpIncrement) this.createJumpIncrementButton();
		ProgressBar.prototype.initComponents.apply(this, arguments);
		this.createChrome(this.moreComponents);
	},

	/**
	* Overriding {@link module:moonstone/ProgressBar~ProgressBar#createPopup} to change the
	* container of the popup as well as skip the logic to make it persistently shown.
	*
	* @private
	*/
	createPopup: function () {
		this.$.knob.createComponents(this.popupComponents, {owner: this});
		this.$.popup.set('autoDismiss', false);
	},

	/**
	* @private
	*/
	createJumpIncrementButton: function () {
		this.createComponents(this.jumpWrapperComponents, {owner: this});
		this.controlParent = this.$.slider;
		this.addClass('moon-slider-wrapper');

		this.set('spotlight', false);
		this.$.buttonLeft.set('icon', this.get('decrementIcon'));
		this.$.buttonRight.set('icon', this.get('incrementIcon'));
	},

	/**
	* @private
	*/
	rendered: function () {
		ProgressBar.prototype.rendered.apply(this, arguments);
		this._setValue(this.value);
	},

	/**
	* @private
	*/
	enableJumpIncrementChanged: function () {
		this.addRemoveClass('incrementable', this.enableJumpIncrement);
	},

	/**
	* @private
	*/
	disabledChanged: function () {
		if (this.enableJumpIncrement) {
			this.updateButtonStatus();
			this.$.slider.set('disabled', this.disabled);
		}
		this.addRemoveClass('disabled', this.disabled);
		this.$.knob.addRemoveClass('disabled', this.disabled);
		this.setTappable(!this.disabled);
	},

	/**
	* @private
	*/
	knobClassesChanged: function (was) {
		this.$.knob.removeClass(was);
		this.$.knob.addClass(this.knobClasses);
	},

	/**
	* @private
	*/
	jumpIncrementChanged: function () {
		var range = this.max - this.min,
			incrementBy;
		if (typeof this.jumpIncrement == 'string' && this.jumpIncrement.substr(-1) == '%') {
			// jumpIncrement is a percent value
			incrementBy = range * parseFloat(this.jumpIncrement.slice(0,-1)) / 100;
		} else {
			// jumpIncrement is a plain number
			incrementBy = this.jumpIncrement;
		}
		this._jumpIncrementAmount = incrementBy;
	},

	/**
	* Slider will snap to multiples of this value.
	*
	* @private
	*/
	calcIncrement: function (val) {
		return (Math.round(val / this.increment) * this.increment);
	},

	/**
	* Called only when [constrainToBgProgress]{@link module:moonstone/Slider~Slider#constrainToBgProgress} is
	* `true`.
	*
	* @private
	*/
	calcConstrainedIncrement: function (val) {
		return (Math.floor(val / this.increment) * this.increment);
	},

	/**
	* Initializes [value]{@link module:moonstone/Slider~Slider#value} at creation time.
	*
	* @private
	*/
	initValue: function () {
		if (this.constrainToBgProgress) {
			this.value = this.clampValue(this.min, this.bgProgress, this.value);
			this.value = (this.increment) ? this.calcConstrainedIncrement(this.value) : this.value;
		}

		this.updateValues(this.getValue());
	},

	/**
	* @private
	*/
	updateValues: function (value) {
		if (this.lockBar) {
			this.setProgress(value);
		} else {
			if (this.popup) {
				this.updatePopup(value);
			}
			this.updateKnobPosition(this.calcPercent(value));
		}
	},

	/**
	* @private
	*/
	progressChanged: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.updateKnobPosition(this.calcPercent(this.progress));
		};
	}),

	/**
	* @override
	* @private
	*/
	showPercentageChanged: function () {
		this.updatePopup(this.value);
	},

	/**
	* @override
	* @private
	*/
	popupSideChanged: function () {
		this.updatePopup(this.value);
	},

	/**
	* @private
	*/
	valueChanged: function (was, is) {
		if (!this.dragging) {
			var allowAnimation = this.constrainToBgProgress && is <= this.bgProgress || !this.constrainToBgProgress;
			if (this.constrainToBgProgress) {
				is = this.clampValue(this.min, this.bgProgress, is); // Moved from animatorStep
				is = (this.increment) ? this.calcConstrainedIncrement(is) : is;
			}
			if (this.animate && allowAnimation) {
				this.animateTo(was, is);
			} else {
				this._setValue(is);
			}
		}
	},

	/**
	* @private
	*/
	minChanged: function (was, is) {
		this.initValue();
		this.progressChanged();
		this.bgProgressChanged();
	},

	/**
	* @private
	*/
	maxChanged: function (was, is) {
		this.initValue();
		this.progressChanged();
		this.bgProgressChanged();
	},

	/**
	 * @deprecated To be removed when noPopup removed
	 * @private
	 */
	noPopupChanged: function () {
		this.set('popup', !this.noPopup);
	},

	/**
	* @private
	*/
	_setValue: function (val) {
		var v = this.clampValue(this.min, this.max, val);

		this.value = v;
		this.updateButtonStatus();

		this.updateValues(v);

		this.sendChangeEvent({value: v});
	},

	/**
	* @private
	*/
	getValue: function () {
		return (this.animatingTo !== null) ? this.animatingTo : this.value;
	},

	/**
	* @private
	*/
	updateButtonStatus: function () {
		if (this.enableJumpIncrement) {
			this.$.buttonLeft.set('disabled', this.disabled || this.value <= this.min);
			this.$.buttonRight.set('disabled', this.disabled || this.value >= this.max);
		}
	},

	/**
	* @private
	*/
	updateKnobPosition: function (percent) {
		this.$.knob.applyStyle(this.get('orientation') == 'vertical' ? 'bottom' : 'left', percent + '%');
	},

	/**
	* @private
	*/
	updatePopupPosition: function () {
		// Override ProgressBar.updatePopupPosition to prevent unwanted changes
	},

	/**
	* @private
	*/
	calcKnobPosition: function (e) {
		var node = this.enableJumpIncrement ? this.$.slider.hasNode() : this.hasNode(),
			rect = node.getBoundingClientRect(),
			dist;

		if (this.get('orientation') == 'vertical') {
			dist = ((rect.height - (e.clientY - rect.top)) / rect.height);
		} else {
			// default to horizontal
			dist = ((e.clientX - rect.left) / rect.width);
		}
		return (dist * (this.max - this.min) + this.min);
	},

	/**
	* @private
	*/
	dragstart: function (sender, e) {
		if (this.disabled) {
			return; // return nothing
		}

		e.preventDefault();
		this.set('dragging', true);
		Spotlight.freeze();
		return true;
	},

	/**
	* @private
	*/
	drag: function (sender, e) {
		if (this.dragging) {
			var v = this.calcKnobPosition(e), ev;

			if (this.constrainToBgProgress === true) {
				v = (this.increment) ? this.calcConstrainedIncrement(v) : v;
				ev = this.bgProgress + (v-this.bgProgress)*0.4;
				v = this.clampValue(this.min, this.bgProgress, v);
				this.elasticFrom = (this.elasticEffect === false || this.bgProgress > v) ? v : ev;
				this.elasticTo = v;
			} else {
				v = (this.increment) ? this.calcIncrement(v) : v;
				v = this.clampValue(this.min, this.max, v);
				this.elasticFrom = this.elasticTo = v;
			}

			this.set('value', v);

			this.updateValues(v);

			this.sendChangingEvent({value: v});

			return true;
		}
	},

	/**
	* @private
	*/
	dragfinish: function (sender, e) {
		if (this.disabled || !this.dragging) {
			return; // return nothing
		}

		var v = this.elasticTo;
		if (this.constrainToBgProgress === true) {
			v = (this.increment) ? this.calcConstrainedIncrement(v) : v;
		} else {
			v = this.calcKnobPosition(e);
			v = (this.increment) ? this.calcIncrement(v) : v;
			v = this.clampValue(this.min, this.max, v);
		}

		this.set('dragging', false);
		Spotlight.unfreeze();
		this.set('value', v);

		this.updateButtonStatus();
		this.sendChangeEvent({value: this.getValue()});
		e.preventTap();
		return true;
	},

	/**
	* @private
	*/
	tap: function (sender, e) {
		if (this.tappable && !this.disabled && (e.originator === this || e.originator === this.$.slider || e.originator === this.$.bar || e.originator === this.$.bgbar)) {
			var v = this.calcKnobPosition(e);
			v = (this.increment) ? this.calcIncrement(v) : v;
			v = (this.constrainToBgProgress && v>this.bgProgress) ? this.bgProgress : v;
			this.set('value',v);
			return true;
		}
	},

	/**
	* @private
	*/
	animatorStep: function (sender) {
		var	v = sender.value;

		this.updateValues(v);

		this.sendChangingEvent({value: v});
		return true;
	},

	/**
	* @fires module:moonstone/Slider~Slider#onAnimateFinish
	* @private
	*/
	animatorComplete: function (sender) {
		if (!sender.isAnimating()) {
			this._setValue(sender.value);
			this.animatingTo = null;
			this.doAnimateFinish(sender);
		}
		return true;
	},

	/**
	* @private
	*/
	spotFocused: function (sender, e) {
		if ((this.enableJumpIncrement && e.originator.owner === this) || e.originator === this) {
			this.bubble('onRequestScrollIntoView');
		}
		this.showKnobStatus();
	},

	/**
	* @private
	*/
	spotSelect: function () {
		this.set('selected', !this.selected);
		if (this.popup) {
			if (this.selected) {
				this.$.popup.bubble('onRequestScrollIntoView');
			}
			this.updatePopup(this.getValue());
		}
		return true;
	},

	/**
	* @private
	*/
	spotBlur: function () {
		if (!this.dragging) {
			if (this.$.popup) {
				this.$.popup.hide();
			}
			this.set('selected', false);
		}
	},

	/**
	* @private
	*/
	spotUp: function (sender, e) {
		if (this.get('orientation') == 'vertical' && this.selected && !this.dragging && (!this.enableJumpIncrement || sender == this.$.slider)) {
			// If in the process of animating, work from the previously set value
			var v = this.getValue() + (this.increment || 1);

			this.set('value', v);
			return true;
		}
	},

	/**
	* @private
	*/
	spotDown: function (sender, e) {
		if (this.get('orientation') == 'vertical' && this.selected && !this.dragging && (!this.enableJumpIncrement || sender == this.$.slider)) {
			// If in the process of animating, work from the previously set value
			var v = this.getValue() - (this.increment || 1);

			this.set('value', v);
			return true;
		}
	},

	/**
	* @private
	*/
	spotLeft: function (sender, e) {
		if (this.get('orientation') == 'horizontal' && this.selected && !this.dragging && (!this.enableJumpIncrement || sender == this.$.slider)) {
			// If in the process of animating, work from the previously set value
			var v = this.getValue() - (this.increment || 1);

			this.set('value', v);
			return true;
		}
	},

	/**
	* @private
	*/
	spotRight: function (sender, e) {
		if (this.get('orientation') == 'horizontal' && this.selected && !this.dragging && (!this.enableJumpIncrement || sender == this.$.slider)) {
			var	v = this.getValue() + (this.increment || 1);

			this.set('value', v);
			return true;
		}
	},

	/**
	* @private
	*/
	handleKnobDown: function (sender, e) {
		if (!this.disabled) {
			e.configureHoldPulse({endHold: 'onMove'});
			this.set('knobSelected', true);
		}
	},

	/**
	* @private
	*/
	showKnobStatus: function () {
		if (this.popup) {
			this.$.popup.show();
			this.updatePopup(this.getValue());
		}
	},

	/**
	* @private
	*/
	handleKnobUp: function (sender, e) {
		if (!this.disabled) {
			this.set('knobSelected', false);
		}
	},

	/**
	* @private
	*/
	changeDelayMS: 50,

	/**
	* @fires module:moonstone/Slider~Slider#onChange
	* @private
	*/
	sendChangeEvent: function (data) {
		var value = this.value;
		this.throttleJob('sliderChange', function () {
			this.doChange(data);
			this.startJob('sliderChangePost', function () {
				if (this.value !== value) this.doChange({value: this.value});
			}, this.changeDelayMS);
		}, this.changeDelayMS);
	},

	/**
	* @fires module:moonstone/Slider~Slider#onChanging
	* @private
	*/
	sendChangingEvent: function (data) {
		this.throttleJob('sliderChanging', function () { this.doChanging(data); }, this.changeDelayMS);
	},

	/**
	* @private
	*/
	jumpButtonTriggered: function (sender, ev) {
		var isValidEvent = true;
		if (!sender.disabled && (!this._jumpSender || this._jumpSender == sender)) {
			if (ev.keyCode != 13 && ev.type == 'onSpotlightKeyDown') {
				isValidEvent = false;
			}
			if (isValidEvent) {
				if (sender === this.$.buttonLeft) this.previous();
				else this.next();
				this._jumpSender = sender;
			}
		} else {
			Spotlight.Accelerator.cancel();
			gesture.drag.endHold();
		}
	},

	/**
	* @private
	*/
	jumpButtonReleased: function (sender, e) {
		this._jumpSender = null;
	},

	/**
	* Prevent events that start on the left and right jump buttons
	*
	* @private
	*/
	preventEvent: function (sender, event) {
		return true;
	},

	/**
	* Decrement slider by jumpIncrement value.
	*
	* @public
	*/
	previous: function () {
		this.set('value', this.value - this._jumpIncrementAmount);
	},

	/**
	* Increment slider by jumpIncrement value.
	*
	* @public
	*/
	next: function () {
		this.set('value', this.value + this._jumpIncrementAmount);
	},

	// Accessibility

	/**
	* @default slider
	* @type {String}
	* @see enyo/AccessibilitySupport~AccessibilitySupport#accessibilityRole
	* @public
	*/
	accessibilityRole: 'slider',

	/**
	* Custom value for accessibility (ignored if `null`).
	*
	* @type {String|null}
	* @default null
	* @public
	*/
	accessibilityValueText: null,

	/**
	* When `true`, VoiceReadout will be prevented.
	*
	* @default false
	* @type {Boolean}
	* @public
	*/
	accessibilityDisabled: false,

	/**
	* @private
	*/
	ariaObservers: [
		{to: 'aria-atomic', value: true},
		{from: 'disabled', method: function () {
			this.setAriaAttribute('aria-disabled', this.disabled || null);
		}},
		{path: 'enableJumpIncrement', method: function () {
			// if enableJumpIncrement is true we set the spinbutton role to this.$.slider to be able to
			// read accessibilityHint of buttons.
			if (this.enableJumpIncrement) {
				this.$.slider.set('accessibilityRole', 'slider');
				this.$.buttonLeft.set('accessibilityHint', $L('press ok button to decrease the value'));
				this.$.buttonRight.set('accessibilityHint', $L('press ok button to increase the value'));
			}
		}},
		{path: 'selected', method: function () {
			if (this.selected) {
				// avoid using readAlert api, temporary set accessibilityRole to alert
				// this will be reset on resetAccessibilityProperties
				var hint = (this.get('orientation') == 'horizontal') ?
								$L('change a value with left right button') : $L('change a value with up down button');
				this.set('accessibilityRole', 'alert');
				this.set('accessibilityLive', 'off');
				this.set('accessibilityHint', hint);
			} else {
				this.resetAccessibilityProperties();
			}
		}},
		// moonstone/ProgressBar observes accessibilityValueText and the popup label so this kind
		// need only observe its unique properties for updating aria-valuetext
		{path: ['value', 'dragging'], method: 'ariaValue'}
	],

	/**
	* @private
	*/
	resetAccessibilityProperties: function () {
		this.set('accessibilityRole', !this.enableJumpIncrement ? 'spinbutton' : null);
		this.set('accessibilityLive', null);
		this.set('accessibilityHint', null);
	},

	/**
	* Overriding {@link module:moonstone/ProgressBar~ProgressBar#ariaValue} to guard updating value
	* when dragging.
	*
	* @private
	*/
	ariaValue: function () {
		var value = this.$.animator.isAnimating() ? this.$.animator.endValue : this.value,
			usePercent = this.popup && this.showPercentage && !this.popupContent,
			text = this.accessibilityValueText ||
					this.popup && this.popupContent ||
					usePercent && this.calcPopupLabel(this.calcPercent(value)) ||
					value;

		if (!this.dragging) {
			this.resetAccessibilityProperties();
			this.setAriaAttribute('aria-valuetext', text);
			if (this.enableJumpIncrement) {
				this.$.slider.setAriaAttribute('aria-valuetext', text);
				this.$.buttonLeft.set('accessibilityLabel', String(text));
				this.$.buttonRight.set('accessibilityLabel', String(text));
			}
		}
	}
});

},{'../ProgressBar':'moonstone/ProgressBar','../IconButton':'moonstone/IconButton','../i18n':'moonstone/i18n'}],'moonstone/SimplePicker':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/SimplePicker~SimplePicker} kind.
* @module moonstone/SimplePicker
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	Control = require('enyo/Control');

var
	$L = require('../i18n'),
	IconButton = require('../IconButton'),
	Marquee = require('../Marquee'),
	MarqueeSupport = Marquee.Support,
	MarqueeText	= Marquee.Text;

/**
* Fires when the currently selected item changes.
*
* @event module:moonstone/SimplePicker~SimplePicker#onChange
* @type {Object}
* @property {module:enyo/Control~Control} selected - A reference to the currently selected item.
* @property {String} content - The content of the currently selected item.
* @property {Number} index - The index of the currently selected item.
* @public
*/

/**
* {@link module:moonstone/SimplePicker~SimplePicker} is a [control]{@link module:enyo/Control~Control} that solicits a
* choice from the user by cycling through a list of options. The picker's child
* [components]{@link module:enyo/Component~Component}, {@link module:moonstone/Marquee~MarqueeText}
* [objects]{@glossary Object} by default, become the options for the picker.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		SimplePicker = require('moonstone/SimplePicker');
*
* 	{kind: SimplePicker, onChange: 'changed', selectedIndex: 1, components: [
* 		{content: 'San Francisco'},
* 		{content: 'Boston'},
* 		{content: 'Tokyo'}
* 	]}
* ```
*
* The picker may be changed programmatically by calling
* [previous()]{@link module:moonstone/SimplePicker~SimplePicker#previous} or
* [next()]{@link module:moonstone/SimplePicker~SimplePicker#next}, or by
* modifying the [selectedIndex]{@link module:moonstone/SimplePicker~SimplePicker#selectedIndex}
* property by calling `set('selectedIndex', <value>)`.
*
* The picker options may be modified programmatically in the standard manner, by calling
* `createComponent().render()` or `destroy()`.
*
* ```javascript
* 	// Add new items to picker
* 	this.$.simplePicker.createComponent({'New York'}).render();
* 	this.$.simplePicker.createComponent({'London'}).render();
*
* 	// Remove currently selected item from picker
* 	this.$.simplePicker.getSelected().destroy();
* ```
*
* @class SimplePicker
* @extends module:enyo/Control~Control
* @mixes module:moonstone/Marquee~MarqueeSupport
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/SimplePicker~SimplePicker.prototype */ {

	/**
	* @private
	*/
	name: 'moon.SimplePicker',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'moon-simple-picker',

	/**
	* @private
	*/
	mixins: [MarqueeSupport],

	/**
	* @private
	*/
	events: {
		onChange: ''
	},

	/**
	* @private
	* @lends module:moonstone/SimplePicker~SimplePicker.prototype
	*/
	published: {

		/**
		* Reference to currently selected item, if any.
		*
		* @type {module:enyo/Control~Control}
		* @default ''
		* @public
		*/
		selected: '',

		/**
		* Index of currently selected item, if any.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		selectedIndex: 0,

		/**
		* When `true`, picker transitions animate left/right.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		animate: true,

		/**
		* When `true`, buttons are shown as disabled and do not generate tap events.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false,

		/**
		* When `true`, picker will wrap around from last item to first.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		wrap: false,

		/**
		* By default, {@link module:moonstone/SimplePicker~SimplePicker} is an inline-block element;
		* setting `block: true` makes it a block element.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		block: false
	},

	/**
	* @private
	*/
	defaultKind: MarqueeText,

	/**
	* @private
	*/
	handlers: {
		onSpotlightFocused: 'scrollIntoView'
	},

	/**
	* @private
	*/
	components: [
		{name: 'buttonLeft',  kind: IconButton, backgroundOpacity: 'transparent', classes: 'moon-simple-picker-button left', icon:'arrowlargeleft', onSpotlightSelect: 'left', ondown: 'downLeft', onholdpulse:'left', defaultSpotlightDisappear: 'buttonRight', accessibilityHint: $L('press ok button to change the value'), accessibilityLabel: ' '}, // note: single space accessibilityLabel used to suppress icon in aria-label
		{name: 'clientWrapper', kind: Control, classes:'moon-simple-picker-client-wrapper', components: [
			{name: 'client', kind: Control, classes: 'moon-simple-picker-client', accessibilityRole: 'spinbutton'}
		]},
		{name: 'buttonRight', kind: IconButton, backgroundOpacity: 'transparent', classes: 'moon-simple-picker-button right', icon:'arrowlargeright', onSpotlightSelect: 'right', ondown: 'downRight', onholdpulse:'right', defaultSpotlightDisappear: 'buttonLeft', accessibilityHint: $L('press ok button to change the value'), accessibilityLabel: ' '}
	],

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this._created = true;
		this.animateChanged();
		this.initializeActiveItem();
		this.disabledChanged();
		this.selectedIndexChanged();
		this.updateMarqueeDisable();
		this.blockChanged();
		this.showHideNavButtons();
	},

	/**
	* @private
	*/
	scrollIntoView: function() {
		this.bubble('onRequestScrollIntoView');
	},

	/**
	* @fires module:moonstone/SimplePicker~SimplePicker#onChange
	* @private
	*/
	fireChangedEvent: function() {
		if (!this.generated) {
			return;
		}

		this.doChange({
			selected:   this.selected,
			content:    this.selected && this.selected.content,
			index:      this.selected && this.selectedIndex
		});
	},

	/**
	* @private
	*/
	blockChanged: function() {
		this.addRemoveClass('block', this.block);
	},

	/**
	* Shows/hides previous/next buttons based on current index.
	*
	* @private
	*/
	showHideNavButtons: function() {
		var index = this.getSelectedIndex(),
			maxIndex = this.getClientControls().length - 1;
		var prevButton = this.$.buttonLeft;
		var nextButton = this.$.buttonRight;

		if (this.disabled) {
			this.hideNavButton(prevButton);
			this.hideNavButton(nextButton);
		// Always show buttons if _this.wrap_ is _true_
		} else if (this.wrap) {
			this.showNavButton(prevButton);
			this.showNavButton(nextButton);
		// If we have one or less options, always show no buttons
		} else if (maxIndex <= 0) {
			this.hideNavButton(prevButton);
			this.hideNavButton(nextButton);
		// If we are on the first option, hide the left button
		} else if (index <= 0) {
			this.showNavButton(nextButton);
			this.hideNavButton(prevButton);
		// If we are on the last item, hide the right button
		} else if (index >= maxIndex) {
			this.showNavButton(prevButton);
			this.hideNavButton(nextButton);
		// Otherwise show both buttons
		} else {
			this.showNavButton(prevButton);
			this.showNavButton(nextButton);
		}
	},

	/**
	* @private
	*/
	destroy: function() {
		this.destroying = true;
		Control.prototype.destroy.apply(this, arguments);
	},

	/**
	* @private
	*/
	addControl: function(ctl) {
		Control.prototype.addControl.apply(this, arguments);
		var addedIdx = this.getClientControls().indexOf(ctl),
			selectedIdx = this.selectedIndex;
		if (this._created) {
			if ((selectedIdx < 0) || (addedIdx < selectedIdx)) {
				this.setSelectedIndex(selectedIdx + 1);
			} else if (selectedIdx == addedIdx) {
				// Force change handler, since the currently selected item actually changed
				this.selectedIndexChanged();
			}
			this.showHideNavButtons();
		}
	},

	/**
	* @private
	*/
	removeControl: function(ctl) {
		if (!this.destroying) {
			var removedIdx = this.getClientControls().indexOf(ctl),
				selectedIdx = this.selectedIndex,
				wasLast = (removedIdx == this.getClientControls().length-1);

			Control.prototype.removeControl.apply(this, arguments);

			// If removedIdx is -1, that means that the Control being removed is
			// not one of our picker items, so we don't need to update our state.
			// Probably, we're being torn down.
			if (removedIdx !== -1) {
				if ((removedIdx < selectedIdx) || ((selectedIdx == removedIdx) && wasLast)) {
					this.setSelectedIndex(selectedIdx - 1);
				} else if (selectedIdx == removedIdx) {
					// Force change handler, since the currently selected item actually changed
					this.selectedIndexChanged();
				}
				this.showHideNavButtons();
			}
		} else {
			this.inherited(arguments);
		}
	},

	/**
	* Hides passed-in [control]{@link module:enyo/Control~Control} and disables {@glossary Spotlight}
	* functionality.
	*
	* @private
	*/
	hideNavButton: function(ctl) {
		ctl.setDisabled(true);
	},

	/**
	* Shows passed-in [control]{@link module:enyo/Control~Control} and enables {@glossary Spotlight}
	* functionality.
	*
	* @private
	*/
	showNavButton: function(ctl) {
		ctl.setDisabled(false);
	},

	/**
	* @private
	*/
	disabledChanged: function() {
		this.$.client.addRemoveClass('disabled', this.disabled);
		if (this.generated) {
			this.showHideNavButtons();
		}
	},

	/**
	* @private
	*/
	animateChanged: function() {
		this.$.client.addRemoveClass('animated', this.animate);
	},

	/**
	* @private
	*/
	selectedChanged: function (was, is) {
		var idx = this.getClientControls().indexOf(this.selected);
		if (idx >= 0) {
			this.setSelectedIndex(idx);
		}
	},

	/*
	* When the picker is initialized, looks for any items with the `active` flag set to
	* `true`; if one is found, it is set as the currently selected item. This is done
	* without triggering an [onChange]{@link module:moonstone/SimplePicker~SimplePicker#onChange} event, as
	* it happens during initialization.
	*
	* @private
	*/
	initializeActiveItem: function() {
		var i,
			controls = this.getClientControls();
		for (i = 0; i < controls.length; i++) {
			if (controls[i].active) {
				this.set('selectedIndex', i);
				return;
			}
		}
	},

	/**
	* @private
	*/
	selectedIndexChanged: function() {
		dom.transform(this.$.client, {translateX: (this.selectedIndex * -100) + '%'});
		this.updateMarqueeDisable();
		this.setSelected(this.getClientControls()[this.selectedIndex]);
		this.fireChangedEvent();
		this.showHideNavButtons();
		this.startMarquee();
	},

	/**
	* @private
	*/
	updateMarqueeDisable: function() {
		this.stopMarquee();
		var i,
			c = this.getClientControls();
		for (i = 0; i < c.length; i++) {
			if (i == this.selectedIndex) {
				c[i].disabled = false;
			} else {
				c[i].disabled = true;
			}
		}
	},

	/**
	* @private
	*/
	left: function(sender, e) {
		if (e && e.sentHold) { return; }
		this.previous(sender, e);
	},

	/**
	* @private
	*/
	right: function(sender, e) {
		if (e && e.sentHold) { return; }
		this.next(sender, e);
	},

	/**
	* @private
	*/
	downLeft: function(sender, e) {
		this.left(sender, e);
	},

	/**
	* @private
	*/
	downRight: function(sender, e) {
		this.right(sender, e);
	},

	/**
	* Cycles the selected item to the one before the currently selected item. If chained from
	* an event, {@link Spotlight} hold pulse events will be canceled once the first item is
	* reached, unless [wrap]{@link module:moonstone/SimplePicker~SimplePicker#wrap} is `true`. When calling this method
	* directly, no arguments are required.
	*
	* @param {Object} sender - (unused) Sender, if chained from event.
	* @param {Object} e - Event object, if chained from event.
	* @public
	*/
	previous: function(sender, e) {
		if (!this.disabled) {
			var idx = this.selectedIndex - 1;
			if (idx < 0) {
				idx = this.wrap ? this.getClientControls().length - 1 : 0;
			}
			if (!this.wrap && idx === 0 && e && e.cancelHoldPulse) {
				e.cancelHoldPulse();
			}
			this.setSelectedIndex(idx);
		}
	},

	/**
	* Cycles the selected item to the one after the currently selected item. If chained from
	* an event, {@link Spotlight} hold pulse events will be canceled once the last item is
	* reached, unless [wrap]{@link module:moonstone/SimplePicker~SimplePicker#wrap} is `true`. When
	* calling this method directly, no arguments are required.
	*
	* @param {Object} sender - (unused) Sender, if chained from event.
	* @param {Object} e - Event object, if chained from event.
	* @public
	*/
	next: function(sender, e) {
		if (!this.disabled) {
			var idx = this.selectedIndex + 1;
			if (idx > this.getClientControls().length - 1) {
				idx = this.wrap ? 0 : this.getClientControls().length - 1;
			}
			if (!this.wrap && idx === this.getClientControls().length - 1
				&& e && e.cancelHoldPulse) {
				e.cancelHoldPulse();
			}
			this.setSelectedIndex(idx);
		}
	},

	// Accessibility

	/**
	* @private
	*/
	ariaObservers: [
		// update slected content on button left/right and client
		{path: 'selected', method: function () {
			if (this.selected) {
				this.$.buttonLeft.set('accessibilityLabel', this.selected.content);
				this.$.buttonRight.set('accessibilityLabel', this.selected.content);
				this.$.client.setAttribute('aria-valuetext', this.selected.content);
			}
		}}
	]
});

},{'../i18n':'moonstone/i18n','../IconButton':'moonstone/IconButton','../Marquee':'moonstone/Marquee'}],'moonstone/NewPagingControl':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/NewPagingControl~PagingControl} kind.
* @wip
* @module moonstone/NewPagingControl
*/

var
	animation = require('enyo/animation'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	Spotlight = require('spotlight'),
	$L = require('../i18n');

var
	IconButton = require('../IconButton');

// TODO: Document the fact that this sends simulated mousewheel events

/**
* {@link module:moonstone/NewPagingControl~PagingControl} is a paging control button derived from
* {@link module:moonstone/IconButton~IconButton}. This control is not intended for use outside of
* {@link module:moonstone/Scroller~Scroller}.
*
* @class PagingControl
* @extends module:moonstone/IconButton~IconButton
* @wip
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/NewPagingControl~PagingControl.prototype */ {

	/**
	* @private
	*/
	name: 'moon.NewPagingControl',

	/**
	* @private
	*/
	kind: IconButton,

	/**
	* @private
	*/
	classes: 'moon-paging-button no-background',

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	* @lends module:moonstone/NewPagingControl~PagingControl.prototype
	*/
	published: {
		/**
		* The side of the control where the button will be.
		*
		* Supported values are `'top'`, `'right'`, `'bottom'`, and `'left'`.
		*
		* @type {String}
		* @default null
		* @public
		*/
		side: null
	},

	/**
	* @private
	*/
	backgroundOpacity: 'transparent',

	/**
	* @private
	*/
	handlers: {
		onSpotlightKeyDown: 'down',
		onSpotlightKeyUp: 'release',
		ondown: 'down',
		onhold: 'hold',
		onrelease: 'release',
		onActivate: 'noop'
	},

	/**
	* @private
	*/
	initialDelta: 2.5,

	/**
	* @private
	*/
	delta: 0,

	/**
	* @private
	*/
	maxDelta: 45,

	/**
	* @private
	*/
	create: function() {
		IconButton.prototype.create.apply(this, arguments);
		this.sideChanged();
	},

	/**
	* @private
	*/
	disabledChanged: function () {
		if (this.disabled && Spotlight.Accelerator.isAccelerating()) {
			this.stopHoldJob();
			Spotlight.Accelerator.cancel();
		}
		IconButton.prototype.disabledChanged.apply(this, arguments);
	},

	/**
	* @private
	*/
	_iconMappings: {
		'top': 'arrowlargeup',
		'bottom': 'arrowlargedown',
		'left': 'arrowlargeleft',
		'right': 'arrowlargeright'
	},

	/**
	* Set this control's CSS class based on its [side]{@link module:moonstone/NewPagingControl~PagingControl#side}
	* value.
	*
	* @private
	*/
	sideChanged: function (old) {
		var s = this.side;
		if(old) {
			this.removeClass(old);
		}
		this.addClass(s);
		this.setIcon(this._iconMappings[s]);
		this.deltaProp = (s === 'top' || s === 'bottom') ? 'wheelDeltaY' : 'wheelDeltaX';
	},

	/**
	* @private
	*/
	down: function (sender, event) {
		if (this.disabled) {
			return;
		}

		if (event.keyCode === undefined || event.keyCode === 13) {
			this.set('pressed', true);
			event.configureHoldPulse({
				endHold: 'onLeave',
				preventTap: true
			});
		}
	},

	/**
	* @private
	*/
	hold: function (sender, event) {
		if (this.disabled) {
			return;
		}
		this.delta = this.initialDelta;
		this.startHoldJob();
	},

	/**
	* @private
	*/
	release: function (sender, event) {
		this.set('pressed', false);
		this.endHold(sender, event);
	},

	/**
	* @private
	*/
	endHold: function (sender, event) {
		this.stopHoldJob();
		// Restore the scroller's previous setting `suppressMouseEvents`
		// setting -- see startHoldJob() for an explanation.
		this.scroller.suppressMouseEvents = this._suppressMouseEvents;
	},

	/**
	* @private
	*/
	startHoldJob: function () {
		// Scroller may be set up to suppress mouse events during
		// scrolling, but we don't want that when scrolling is driven
		// by holding a paging control, since we rely on mouse
		// movements to detect whether the hold is still in progress.
		//
		// We therefore use the scroller's `suppressMouseEvents` API
		// to disable event suppression for the duration of the hold.
		// We store the previous value of `suppressMouseEvents` so that
		// we can restore it when the hold is done.
		this._suppressMouseEvents = this.scroller.suppressMouseEvents;
		this.scroller.suppressMouseEvents = false;

		this.stopHoldJob();

		var t0 = utils.perfNow(),
			t = 0
		;

		var fn = this.bindSafely(function () {
			var evt = {
					simulated: true,
					preventDefault: this.noop
				},
				side = this.side,
				dir = (side === 'top' || side === 'left') ? 1 : -1;

			if (this.rtl && (side === 'left' || side === 'right')) {
				dir = -dir;
			}

			this.job = animation.requestAnimationFrame(fn);

			t = (utils.perfNow() - t0)/1000;
			this.delta = Math.min(this.maxDelta, this.delta + (0.1 * Math.pow(t, 1.1)));

			evt[this.deltaProp] = dir * this.delta;

			this.bubble('onmousewheel', evt);

		});

		this.job = animation.requestAnimationFrame(fn);
	},

	/**
	* @private
	*/
	stopHoldJob: function () {
		this.job = animation.cancelAnimationFrame(this.job);
	},

	/**
	* @private
	*/
	spotlightFocused: function () {
		this.set('spotted', true);
	},

	/**
	* @private
	*/
	spotlightBlurred: function () {
		IconButton.prototype.spotlightBlurred.apply(this, arguments);
		this.set('spotted', false);
	},

	/**
	* Overrides default focused handling to make sure scroller doesn't scroll to
	* this button.
	*
	* @private
	*/
	noop: function () { return true; },

	// Accessibility

	/*
	* @private
	*/
	spotted: false,

	/*
	* @private
	*/
	pressed: false,

	/**
	* @private
	*/
	accessibilityLive: 'off',

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['side', 'spotted'], method: function () {
			var side = this.get('side');
			if (this.spotted) {
				switch(side) {
					case 'top':
						this.set('accessibilityLabel', $L('scroll up'));
						break;
					case 'bottom':
						this.set('accessibilityLabel', $L('scroll down'));
						break;
					case 'left':
						this.set('accessibilityLabel', $L('scroll left'));
						break;
					case 'right':
						this.set('accessibilityLabel', $L('scroll right'));
						break;
				}
			}
		}},
		{path: 'pressed', method: function () {
			var side = this.get('side');
			if (this.pressed) {
				this.set('accessibilityAlert', true);
				switch(side) {
					case 'top':
						this.set('accessibilityLabel', $L('UP'));
						break;
					case 'bottom':
						this.set('accessibilityLabel', $L('DOWN'));
						break;
					case 'left':
						this.set('accessibilityLabel', $L('LEFT'));
						break;
					case 'right':
						this.set('accessibilityLabel', $L('RIGHT'));
						break;
				}
			} else {
				this.set('accessibilityAlert', null);
				this.set('accessibilityLabel', null);
			}
		}}
	]
});

},{'../i18n':'moonstone/i18n','../IconButton':'moonstone/IconButton'}],'moonstone/ToggleSwitch':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ToggleSwitch~ToggleSwitch} kind.
* @module moonstone/ToggleSwitch
*/

var
	kind = require('enyo/kind'),
	util = require('enyo/utils');

var
	Checkbox = require('../Checkbox');

/**
* {@link module:moonstone/ToggleSwitch~ToggleSwitch}, which extends {@link module:moonstone/Checkbox~Checkbox}, is a control
* that looks like a switch with 'on' and 'off' states. When the toggle switch is
* tapped, it switches its state and fires an
* [onChange]{@link module:enyo/Checkbox~Checkbox#onChange} event.
*
* @class ToggleSwitch
* @extends module:moonstone/Checkbox~Checkbox
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ToggleSwitch~ToggleSwitch.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ToggleSwitch',

	/**
	* @private
	*/
	kind: Checkbox,

	/**
	* @private
	*/
	icon: 'circle',

	/**
	* @private
	*/
	classes: 'moon-toggle-switch',

	/**
	* @private
	*/
	rendered: function () {
		Checkbox.prototype.rendered.apply(this, arguments);
		// wait until after we're rendered to allow animation.
		util.asyncMethod(this, function () {
			this.addClass('animated');
		});
	}
});

},{'../Checkbox':'moonstone/Checkbox'}],'moonstone/Header':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Header~Header} kind.
* @module moonstone/Header
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	ri = require('enyo/resolution'),
	util = require('enyo/utils'),
	Control = require('enyo/Control');

var
	Input = require('../Input'),
	InputDecorator = require('../InputDecorator'),
	StyleAnimator = require('../StyleAnimator'),
	Marquee = require('../Marquee'),
	MarqueeSupport = Marquee.Support,
	MarqueeText = Marquee.Text;

var _delayedMeasurementFinished;

/**
* Custom input event to allow apps to distinguish header inputs from regular inputs.
*
* @event module:moonstone/Header~Header#onInputHeaderInput
* @type {Object}
* @property {Object} originalEvent - The original event fired from the input. See
*	{@link module:enyo/Input~Input#oninput} for more event information.
* @public
*/

/**
* Custom input change event to allow apps to distinguish header input changes from
* regular input changes.
*
* @event module:moonstone/Header~Header#onInputHeaderChange
* @type {Object}
* @property {Object} originalEvent - The original event fired from the input. See
*	{@link module:enyo/Input~Input#onchange} for more event information.
* @public
*/

/**
* {@link module:moonstone/Header~Header} is a Moonstone-styled control with a large title and an area for
* additional controls.
*
* @class Header
* @extends module:enyo/Control~Control
* @mixes module:moonstone/MarqueeSupport~MarqueeSupport
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Header~Header.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Header',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'moon-header',

	/**
	* @private
	* @lends module:moonstone/Header~Header.prototype
	*/
	published: {

		/**
		* Title of the header.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		title: '',

		/**
		* Text above the header.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		titleAbove: '',

		/**
		* Text below the header.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		titleBelow: '',

		/**
		* Sub-text below the header.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		subTitleBelow: '',

		/**
		* Size of the header, for styling purposes. Will be one of `'large'` (the default),
		* `'medium'`, or `'small'`. If `'large'`, the `moon-header` CSS class will be applied
		* to this header; if `'medium'`, the `moon-medium-header` class will be applied; if
		* `'small'`, the `moon-small-header` class will be applied.
		*
		* @type {String}
		* @default 'large'
		* @public
		*/
		type: 'large',

		/**
		* If `true`, the `moon-medium-header` CSS class will be applied to this header.
		*
		* Note that this property will be deprecated soon. For now, it is being left in
		* for backward compatibility. Until it is removed, `small: true` refers to the
		* historical header size, which is now equivalent to `type: 'medium'`.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		small: false,

		/**
		* URL(s) of background image(s).
		* This may be a string referring a single background image, or an array of strings
		* referring to multiple background images. To support multiple background images at
		* multiple resolutions, this property accepts data in several formats:
		*
		* 1. A string `src` value
		* 2. An array of string `src` values
		* 3. A [multi-resolution hash]{@link module:enyo/resolution#selectSrc~src}
		* 4. An array of [multi-resolution hashes]{@link module:enyo/resolution#selectSrc~src}
		*
		* @type {(String|String[]|module:enyo/resolution#selectSrc~src|module:enyo/resolution#selectSrc~src[])}
		* @default null
		* @public
		*/
		backgroundSrc: null,

		/**
		* Position of background image, defined as a string of the form
		* `'<vertical> <horizontal>'`, with a space separating the `<vertical>`
		* and `<horizontal>` values (e.g., `'top right'`). If no second property
		* is specified, the `<horizontal>` value will default to `'right'`. As
		* with [backgroundSrc]{@link module:moonstone/Header~Header#backgroundSrc}, an array of strings
		* may be supplied to position multiple background images. The order of items
		* should be the same as in `backgroundSrc`.
		*
		* @type {(String|String[])}
		* @default 'top right'
		* @public
		*/
		backgroundPosition: 'top right',

		/**
		* When using a full-bleed background image, set this property to `true` to indent
		* the header text/controls and remove the header lines.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		fullBleedBackground: false,

		/**
		* If `true`, title will be an input.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		inputMode: false,

		/**
		* When `true`, input will be blurred on Enter keypress, if it was previously
		* focused.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		dismissOnEnter: false,

		/**
		* Text to display when the input is empty.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		placeholder: '',

		/**
		* The value of the input.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		value: '',

		/**
		* When `true`, the title text will have locale-safe uppercasing applied.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		uppercase: true,

		/**
		* @deprecated Replaced by [uppercase]{@link module:moonstone/Header~Header#uppercase}.
		*
		* Formerly defaulted to `true`, now defaults to `null` and will only have
		* an effect when explicitly set (for complete backward compatibility).
		*
		* @type {Boolean}
		* @default null
		* @public
		*/
		titleUpperCase: null
	},

	/**
	* @private
	*/
	mixins: [MarqueeSupport],

	/**
	* @private
	*/
	marqueeOnSpotlight: false,

	/**
	* @private
	*/
	marqueeOnHover: true,

	/**
	* @private
	*/
	marqueeOnRender: true,

	/**
	* @private
	*/
	marqueeOnRenderDelay: 10000,

	/**
	* Described in .moon-header class
	*
	* @private
	*/
	standardHeight: 360,

	/**
	* @private
	*/
	handlers: {
		oninput: 'handleInput',
		onchange: 'handleChange'
	},

	/**
	* @private
	*/
	events: {

		/**
		* Custom input event to allow apps to distinguish header inputs from regular inputs.
		*/
		onInputHeaderInput: '',

		/**
		* Custom input change event to allow apps to distinguish header input changes from
		* regular input changes.
		*/
		onInputHeaderChange: ''
	},

	/**
	* @private
	*/
	components: [
		{name: 'titleAbove', kind: Control, classes: 'moon-super-header-text moon-header-title-above'},
		{name: 'titleWrapper', kind: Control, classes: 'moon-header-title-wrapper', components: [
			{name: 'title', kind: MarqueeText, classes: 'moon-header-text moon-header-title', canGenerate: false},
			{name: 'inputDecorator', kind: InputDecorator, classes: 'moon-input-header-input-decorator',canGenerate: false, components: [
				{name: 'titleInput', kind: Input, classes: 'moon-header-text moon-header-title'}
			]}
		]},
		{name: 'titleBelow', kind: MarqueeText, classes: 'moon-sub-header-text moon-header-title-below'},
		{name: 'subTitleBelow', kind: MarqueeText, classes: 'moon-sub-header-text moon-header-sub-title-below'},
		{name: 'client', kind: Control, classes: 'moon-hspacing moon-header-client'},
		{name: 'animator', kind: StyleAnimator, onComplete: 'animationComplete'}
	],

	/**
	* @private
	*/
	bindings: [
		{from: '.value', to: '.$.titleInput.value', oneWay: false},
		{from: '.dismissOnEnter', to: '.$.titleInput.dismissOnEnter'}
	],

	/**
	* @private
	*/
	create: function () {
		this.inherited(arguments);

		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// the titleUpperCase property is fully deprecated and removed. The legacy
		// property takes precedence if it exists.
		if (this.titleUpperCase !== null) this.uppercase = this.titleUpperCase;

		// Note: This smallchanged() line will be deprecated soon. For backward compatiblity, I leave it for a
		// while.
		this.smallChanged();
		this.typeChanged();
		this.titleChanged();
		this.titleAboveChanged();
		this.titleBelowChanged();
		this.subTitleBelowChanged();
		this.allowHtmlChanged();
		this.backgroundSrcChanged();
		this.backgroundPositionChanged();
		this.inputModeChanged();
		this.placeholderChanged();
		this.fullBleedBackgroundChanged();
	},

	rendered: function() {
		this.inherited(arguments);
		// At the first render, the fonts may not have finished loading yet. We delay the first
		// time using an async method, and set a flag so we know the deed is done at subsequent calls.
		if (_delayedMeasurementFinished) {
			this.adjustTitleWidth();
		} else {
			util.asyncMethod(this, function () {
				this.adjustTitleWidth();
				_delayedMeasurementFinished = true;
			});
		}
	},

	/**
	* @private
	*/
	allowHtmlChanged: function () {
		this.$.title.setAllowHtml( this.get('type') == 'small' ? true : this.allowHtml );
		this.$.titleBelow.setAllowHtml(this.allowHtml);
		this.$.subTitleBelow.setAllowHtml(this.allowHtml);
	},

	/**
	* @private
	*/
	backgroundSrcChanged: function () {
		var bgs = (util.isArray(this.backgroundSrc)) ? this.backgroundSrc : [this.backgroundSrc];
		bgs = util.map(bgs, this.bindSafely(function (inBackgroundSource) {
				return inBackgroundSource ? 'url(' + ri.selectSrc(inBackgroundSource) + ')' : null;
			}));
		this.applyStyle('background-image', (bgs.length) ? bgs.join(', ') : null);
	},

	/**
	* @private
	*/
	backgroundPositionChanged: function () {
		var bgp = this.backgroundPosition;
		if (util.isArray(bgp)) {
			bgp = (bgp.length) ? bgp.join(', ') : null;
		}
		// If `this.backgroundPosition` is set explicitly to inherit or initial, apply that
		// instead of assuming a position.
		if (bgp == 'inherit' || bgp == 'initial') {
			this.applyStyle('background-position', bgp);
			return;
		}
		var posArray = bgp && bgp.split(' ') || [],
			posStr = (posArray.length === 0) ? 'top right'
					: (posArray.length === 1) ? posArray[0] + ' right' : bgp;
		this.applyStyle('background-position', posStr);
	},

	/**
	* @private
	*/
	fullBleedBackgroundChanged: function () {
		this.addRemoveClass('full-bleed', this.fullBleedBackground);
	},

	/**
	* Collapses the drawer, hiding its contents.
	*
	* @public
	*/
	collapseToSmall: function () {
		if (this.collapsed) {
			return;
		}

		var myStyle = dom.getComputedStyle(this.hasNode());
		var titleWrapperStyle = dom.getComputedStyle(this.$.titleWrapper.hasNode());
		var titleBelowStyle = dom.getComputedStyle(this.$.titleBelow.hasNode());
		var subTitleBelowStyle = dom.getComputedStyle(this.$.subTitleBelow.hasNode());
		var titleAboveStyle = dom.getComputedStyle(this.$.titleAbove.hasNode());

		// TODO - animator should track initial positions so we don't have to store these if we
		// want to reverse the animation
		this.smallAnimProps = {
			'height': myStyle['height']
		};
		this.$.titleWrapper.smallAnimProps = {
			'padding-left': titleWrapperStyle['padding-left'],
			'top': titleWrapperStyle['top']
		};
		this.$.title.smallAnimProps = {};
		this.$.titleAbove.smallAnimProps = {
			'height': titleAboveStyle['height'],
			'opacity': titleAboveStyle['opacity']
		};
		this.$.titleBelow.smallAnimProps = {
			'top': titleBelowStyle['top']
		};
		this.$.subTitleBelow.smallAnimProps = {
			'top': subTitleBelowStyle['top']
		};

		this.$.animator.newAnimation({
			name: 'collapseToSmall',
			duration: 200,
			timingFunction: 'linear',
			keyframes: {
				0: [{
					control: this,
					properties: {
						'height': 'current'
					}
				}, {
					control: this.$.titleWrapper,
					properties: {
						'padding-left': 'current',
						'top': 'current'
					}
				}, {
					control: this.$.titleAbove,
					properties: {
						'height': 'current',
						'opacity': 'current',
						'margin-top': 'current'
					}
				}, {
					control: this.$.title,
					properties: {}
				}, {
					control: this.$.titleBelow,
					properties: {
						'top': 'current'
					}
				}, {
					control: this.$.subTitleBelow,
					properties: {
						'top': 'current'
					}
				}],
				70: [],
				100: [{
					control: this,
					properties: {
						'height': dom.unit(ri.scale(260), 'rem')
					}
				}, {
					control: this.$.titleWrapper,
					properties: {}
				}, {
					control: this.$.titleAbove,
					properties: {
						'height': 0,
						'opacity': 0,
						'margin-top': 0
					}
				}, {
					control: this.$.title,
					properties: {}
				}, {
					control: this.$.titleBelow,
					properties: {}
				}, {
					control: this.$.subTitleBelow,
					properties: {}
				}]

			}
		});
		this.$.animator.play('collapseToSmall');
		this.collapsed = true;
	},

	/**
	* Expands the drawer, showing its contents.
	*
	* @public
	*/
	expandToLarge: function () {
		if (!this.collapsed) {
			return;
		}

		this.$.animator.newAnimation({
			name: 'expandToLarge',
			duration: 200,
			timingFunction: 'linear',
			keyframes: {
				0: [{
					control: this,
					properties: {
						'height': 'current'
					}
				}, {
					control: this.$.titleWrapper,
					properties: {
						'padding-left': 'current',
						'top': 'current'
					}
				}, {
					control: this.$.titleAbove,
					properties: {
						'height': 'current',
						'opacity': 'current',
						'margin-top': 'current'
					}
				}, {
					control: this.$.title,
					properties: {}
				}, {
					control: this.$.titleBelow,
					properties: {
						'top': 'current'
					}
				}, {
					control: this.$.subTitleBelow,
					properties: {
						'top': 'current'
					}
				}],
				30: [],
				100: [{
					control: this,
					properties: {
						'height': this.smallAnimProps.height
					}
				}, {
					control: this.$.titleWrapper,
					properties: {
						'padding-left': this.$.titleWrapper.smallAnimProps['padding-left'],
						'top': this.$.titleWrapper.smallAnimProps['top']
					}
				}, {
					control: this.$.titleAbove,
					properties: {
						'height': this.$.titleAbove.smallAnimProps['height'],
						'opacity': this.$.titleAbove.smallAnimProps['opacity'],
						'margin-top': this.$.titleAbove.smallAnimProps['margin-top']
					}
				}, {
					control: this.$.title,
					properties: {}
				}, {
					control: this.$.titleBelow,
					properties: {
						'top': this.$.titleBelow.smallAnimProps['top']
					}
				}, {
					control: this.$.subTitleBelow,
					properties: {
						'top': this.$.subTitleBelow.smallAnimProps['top']
					}
				}]
			}
		});
		this.$.animator.play('expandToLarge');
		this.collapsed = false;
	},

	/**
	* @private
	*/
	typeChanged: function () {
		this.addRemoveClass('moon-large-header', this.get('type') == 'large');
		this.addRemoveClass('moon-medium-header', this.get('type') == 'medium');
		this.addRemoveClass('moon-small-header', this.get('type') == 'small');
		this.contentChanged();
		if (this.generated) this.adjustTitleWidth();
	},

	/**
	* @private
	*/
	valueChanged: function () {
		this.$.titleInput.detectTextDirectionality((this.$.titleInput.value || this.$.titleInput.value === 0 || this.$.titleInput.value === '0') ? this.$.titleInput.value : this.$.titleInput.get('placeholder'));
	},

	/**
	* @private
	*/
	adjustTitleWidth: function() {
		var type = this.get('type'),
			// Measure client area's width + 40px of spacing
			client = this.$.client ? this.$.client.hasNode() : null,
			clientWidth = client ? client.offsetWidth : null,
			clientStyle = client ? (client.currentStyle || dom.getComputedStyle(client)) : null,		// Originally by YuC @ http://stackoverflow.com/questions/349257/detecting-true-border-padding-and-margin-from-javascript
			clientMargin = client ? (parseInt(clientStyle.marginLeft, 10) + parseInt(clientStyle.marginRight, 10)) : null,
			clientSpaceSmall = dom.unit(clientWidth + clientMargin + ri.scale(36), 'rem'),
			clientSpace = dom.unit(clientWidth + ri.scale(36), 'rem'),
			rtl = this.rtl;

		if (client) {
			// Set the margin on the correct side for the correct control, otherwise set it to nothing
			this.$.title.applyStyle('margin-right', (type == 'small' && !rtl && clientWidth) ? clientSpaceSmall : null);
			this.$.title.applyStyle('margin-left', (type == 'small' && rtl && clientWidth) ? clientSpaceSmall : null);

			this.$.titleBelow.applyStyle('margin-right', (type == 'medium' && !rtl && clientWidth) ? clientSpace : null);
			this.$.titleBelow.applyStyle('margin-left', (type == 'medium' && rtl && clientWidth) ? clientSpace : null);

			this.$.subTitleBelow.applyStyle('margin-right', (type == 'medium' && !rtl && clientWidth) ? clientSpace : null);
			this.$.subTitleBelow.applyStyle('margin-left', (type == 'medium' && rtl && clientWidth) ? clientSpace : null);
		}
	},

	/**
	* Note that this method will be deprecated soon. For now, it is being left in for
	* backward compatibility.
	*
	* @private
	*/
	smallChanged: function () {
		this.addRemoveClass('moon-medium-header', this.get('small'));
	},

	/**
	* @private
	*/
	contentChanged: function () {
		var title = this.get('uppercase')
					? util.toUpperCase(this.get('title') || this.get('content'))
					: (this.get('title') || this.get('content')),
			subtitle = this.get('titleBelow');
		if ((this.get('type') == 'small') && subtitle) {
			this.$.title.set('allowHtml', true);
			if (!this.allowHtml) {
				title = dom.escape(title);
				subtitle = dom.escape(subtitle);
			}
			this.$.title.set('content', Control.prototype.rtl && !util.isRtl(subtitle + title) ?
				'<span class="moon-sub-header-text moon-header-sub-title">' + subtitle + '</span>' + '   ' + title :
				title + '   ' + '<span class="moon-sub-header-text moon-header-sub-title">' + subtitle + '</span>');
		} else {
			this.$.title.set('allowHtml', this.get('allowHtml') );
			this.$.title.set('content', title);
		}
		this.placeholderChanged();
	},

	/**
	* For backward-compatibility with original API.
	*
	* @private
	*/
	titleChanged: function () {
		this.contentChanged();
	},

	/**
	* @private
	*/
	placeholderChanged: function () {
		// For backward-compatibility with original API
		this.$.titleInput.set('placeholder', this.getTitleUpperCase()
				? util.toUpperCase(this.placeholder || this.title || this.content)
				: (this.placeholder || this.title || this.content) );
		this.valueChanged();
	},

	/**
	* @private
	*/
	uppercaseChanged: function () {
		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// titleUpperCase is fully deprecated and removed.
		if (this.titleUpperCase != this.uppercase) this.titleUpperCase = this.uppercase;
		this.titleChanged();
	},

	/**
	* @private
	*/
	titleUpperCaseChanged: function () {
		if (this.uppercase != this.titleUpperCase) this.uppercase = this.titleUpperCase;
		this.uppercaseChanged();
	},

	/**
	* @private
	*/
	titleAboveChanged: function () {
		this.$.titleAbove.addRemoveClass('no-border', this.titleAbove === '');
		this.$.titleAbove.set('content', this.titleAbove);
	},

	/**
	* @private
	*/
	titleBelowChanged: function () {
		this.$.titleBelow.set('content', this.titleBelow || '');
		this.contentChanged();
	},

	/**
	* @private
	*/
	subTitleBelowChanged: function () {
		this.$.subTitleBelow.set('content', this.subTitleBelow || '');
	},

	/**
	* Placeholder
	*
	* @private
	*/
	// animationComplete: function (inSender, inEvent) {
		// Do something?
	// },

	/**
	* @private
	*/
	inputModeChanged: function () {
		this.$.title.canGenerate = !this.inputMode;
		this.$.title.setShowing(!this.inputMode);
		this.$.inputDecorator.canGenerate = this.inputMode;
		this.$.inputDecorator.setShowing(this.inputMode);

		if (!this.inputMode) {
			if (!this.$.title.hasNode()) {
				this.$.title.render();
			}
			// Reset marquees when coming back to static text
			if (this.generated) {
				this.stopMarquee();
				this.startMarquee();
			}
		}
		if (this.inputMode && !this.$.inputDecorator.hasNode()) {
			this.$.inputDecorator.render();
		}
		this.addRemoveClass('moon-input-header', this.inputMode);
	},

	/**
	* Handles `input` event, firing custom
	* [onInputHeaderInput]{@link module:moonstone/Header~Header#onInputHeaderInput} event.
	*
	* @fires module:moonstone/Header~Header#onInputHeaderInput
	* @private
	*/
	handleInput: function (inSender, inEvent) {
		this.doInputHeaderInput({originalEvent: util.clone(inEvent, true)});
	},

	/**
	* Handles `change` event, firing custom
	* [onInputHeaderChange]{@link module:moonstone/Header~Header#onInputHeaderChange} event.
	*
	* @fires module:moonstone/Header~Header#onInputHeaderChange
	* @private
	*/
	handleChange: function (inSender, inEvent) {
		this.doInputHeaderChange({originalEvent: util.clone(inEvent, true)});
	}
});

},{'../Input':'moonstone/Input','../InputDecorator':'moonstone/InputDecorator','../StyleAnimator':'moonstone/StyleAnimator','../Marquee':'moonstone/Marquee'}],'moonstone/ContextualPopupDecorator':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ContextualPopupDecorator~ContextualPopupDecorator} kind.
* @module moonstone/ContextualPopupDecorator
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	Spotlight = require('spotlight');

var
	Button = require('../Button');

/**
* {@link module:moonstone/ContextualPopupDecorator~ContextualPopupDecorator} is a control that loosely couples a
* {@link module:moonstone/ContextualPopup~ContextualPopup} with an activating control, which may be a button
* or any other control that fires an [onActivate]{@link module:enyo/Control~Control#onActivate}
* event. The decorator surrounds both the activating control and the contextual popup.
*
* When the control is activated, the popup shows itself in the correct position
* relative to the activator.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		ContextualPopup = require('moonstone/ContextualPopup'),
* 		ContextualPopupDecorator = require('moonstone/ContextualPopupDecorator');
*
* 	{kind: ContextualPopupDecorator, components: [
* 		{content: 'Show Popup'},
* 		{kind: ContextualPopup,
* 			components: [
* 				{content:'Sample component in popup'}
* 			]
* 		}
* 	]}
* ```
*
* @class ContextualPopupDecorator
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ContextualPopupDecorator~ContextualPopupDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ContextualPopupDecorator',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	defaultKind: Button,

	/**
	* Selection on iOS prevents tap events, so avoid.
	*
	* @private
	*/
	classes: 'moon-contextual-popup-decorator',

	/**
	* @private
	*/
	spotlight: 'container',

	/**
	* @private
	*/
	spotlightRememberFocus: false,

	/**
	* @private
	*/
	handlers: {
		onActivate: 'activated',
		onShow: 'popupShown',
		onHide: 'popupHidden',
		onRequestSpot: 'requestSpot'
	},

	/**
	* @fires module:enyo/Control~Control#onActivate
	* @private
	*/
	activated: function (inSender, inEvent) {
		// Don't process activate events that came from inside this decorator
		if (inEvent.sentFromPopup && inEvent.sentFromPopup.isDescendantOf(this)) {
			return;
		}

		if (inEvent.originator.active) {
			this.activator = inEvent.originator;
			// if this ContextualPopup is already activated
			if (this.popupActivated) {
				this.requestHidePopup();
				inEvent.originator.active = false;
				this.popupActivated = false;
			} else {
				this.activator.addClass('active');
				this.requestShowPopup();
			}
		} else {
			this.requestHidePopup();
		}
	},

	/**
	* Handles `onShow` event.  Since the popup is a 'client control' of the decorator,
	* we should provide a connector between them.
	*
	* @param {Object} inSender - The component that most recently propagated the `onShow` event.
	* @param {Object} inEvent - An object containing event information.
	* @private
	*/
	popupShown: function (inSender, inEvent) {
		if (this.popup === undefined) {
			this.popup = inEvent.originator;
		}
	},

	/**
	* Handles `onHide` event. If you tap outside of the popup, it will close.
	*
	* @private
	*/
	popupHidden: function () {
		if (this.activator) {
			this.popupActivated = this.popup.popupActivated;
			this.activator.active = false;
			this.activator.removeClass('active');
			this.activator.removeClass('pressed');
		}
	},

	/**
	* Event waterfalls down.
	* @fires module:moonstone/ContextualPopup~ContextualPopup#onRequestShowPopup
	* @private
	*/
	requestShowPopup: function () {
		this.waterfallDown('onRequestShowPopup', {activator: this.activator});
	},

	/**
	* Event waterfalls down.
	* @fires module:moonstone/ContextualPopup~ContextualPopup#onRequestHidePopup
	* @private
	*/
	requestHidePopup: function () {
		this.waterfallDown('onRequestHidePopup');
	},

	/**
	* When back key is pressed, return spotlight focus to popup button
	*
	* @private
	*/
	requestSpot: function (inSender, inEvent) {
		Spotlight.spot(this);
		return true;
	}
});

},{'../Button':'moonstone/Button'}],'moonstone/TooltipDecorator':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/TooltipDecorator~TooltipDecorator} kind.
* @module moonstone/TooltipDecorator
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	Spotlight = require('spotlight');

var
	Button = require('../Button');

/**
* Bubble this event from a contained [control]{@link module:enyo/Control~Control} to mute tooltips. No data
* needs be passed with this event.
*
* @event module:moonstone/TooltipDecorator~TooltipDecorator#onRequestMuteTooltip
* @type {Object}
* @public
*/

/**
* Bubble this event from a contained [control]{@link module:enyo/Control~Control} to unmute tooltips. No data
* needs be passed with this event.
*
* @event module:moonstone/TooltipDecorator~TooltipDecorator#onRequestUnmuteTooltip
* @type {Object}
* @public
*/

/**
* {@link module:moonstone/TooltipDecorator~TooltipDecorator} is a control that
* activates a {@link module:moonstone/Tooltip~Tooltip}. It surrounds a control
* such as a button and displays the tooltip when the control generates an
* `onenter` event:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Button = require('moonstone/Button'),
* 		Tooltip = require('moonstone/Tooltip'),
* 		TooltipDecorator = require('moonstone/TooltipDecorator');
*
* 	{kind: TooltipDecorator, components: [
* 		{kind: Button, content: 'Tooltip'},
* 		{kind: Tooltip, content: 'I am a tooltip for a button.'}
* 	]}
* ```
*
* Here is an example with a {@link module:moonstone/Input~Input} control and a decorator around the input:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Input = require('moonstone/Input'),
* 		InputDecorator = require('moonstone/InputDecorator'),
* 		Tooltip = require('moonstone/Tooltip'),
* 		TooltipDecorator = require('moonstone/TooltipDecorator');
*
* 	{kind: TooltipDecorator, components: [
* 		{kind: InputDecorator, components: [
* 			{kind: Input, placeholder: 'Just an input...'}
* 		]},
* 		{kind: Tooltip, content: 'I am just a tooltip for an input.'}
* 	]}
* ```
*
* Automatic hiding and showing of tooltips may be disabled by calling
* [mute()]{@link module:moonstone/TooltipDecorator~TooltipDecorator#mute} or by bubbling the
* [onRequestMuteTooltip]{@link module:moonstone/TooltipDecorator~TooltipDecorator#onRequestMuteTooltip} event;
* it may be re-enabled by calling [unmute()]{@link module:moonstone/TooltipDecorator~TooltipDecorator#unmute}
* or by bubbling the
* [onRequestUnmuteTooltip]{@link module:moonstone/TooltipDecorator~TooltipDecorator#onRequestUnmuteTooltip} event.
*
* @class TooltipDecorator
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/TooltipDecorator~TooltipDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'moon.TooltipDecorator',

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
	classes: 'moon-tooltip-decorator',

	/**
	* @private
	*/
	handlers: {
		onenter: 'requestShowTooltip',
		onleave: 'requestHideTooltip',
		onSpotlightFocused: 'requestShowTooltip',
		onSpotlightBlur: 'requestHideTooltip',
		onRequestMuteTooltip: 'mute',
		onRequestUnmuteTooltip: 'unmute'
	},

	/**
	* @private
	* @lends module:moonstone/TooltipDecorator~TooltipDecorator.prototype
	*/
	published: {
		/**
		* Boolean indicating whether tooltips are automatically shown when the activator is
		* hovered over.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		autoShow: true
	},

	/**
	* Disables automatic tooltip showing and hiding.
	*
	* @public
	*/
	mute: function () {
		this.setAutoShow(false);
	},

	/**
	* Re-enables automatic tooltip showing and hiding after being muted.
	*
	* @public
	*/
	unmute: function () {
		this.setAutoShow(true);
	},

	/**
	* @private
	*/
	autoShowChanged: function () {
		if (!this.autoShow) {
			this.requestHideTooltip();
		}
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
	requestShowTooltip: function (inSender, inEvent) {
		if (this.autoShow && !Spotlight.isFrozen()) {
			if (inEvent.type == 'onSpotlightFocused' || Spotlight.getPointerMode()) {
				this.waterfallDown('onRequestShowTooltip', {originator: inSender}, this);
			}
		}
	},

	/**
	* @private
	*/
	requestHideTooltip: function () {
		this.waterfallDown('onRequestHideTooltip');
	},

	/**
	* Cancel any pending tooltip showing if the decorator or one of its ancestors is hidden
	*
	* @private
	*/
	showingChangedHandler: function (sender, event) {
		Control.prototype.showingChangedHandler.apply(this, arguments);
		if (!event.showing) {
			this.requestHideTooltip();
		}
	}
});

},{'../Button':'moonstone/Button'}],'moonstone/ToggleButton':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ToggleButton~ToggleButton} kind.
* @module moonstone/ToggleButton
*/

var
	kind = require('enyo/kind'),
	util = require('enyo/utils');

var
	Button = require('../Button');

/**
* Fires when the value of the toggle button changes.
*
* @event module:moonstone/ToggleButton~ToggleButton:onChange
* @type {Object}
* @property {Boolean} value - Current state of the ToggleButton.
* @public
*/

/**
* {@link module:moonstone/ToggleButton~ToggleButton}, which extends {@link module:moonstone/Button~Button}, is a button with two
* states, 'on' and 'off'. When the toggle button is tapped, it switches its state
* and fires an [onChange]{@link module:moonstone/ToggleButton~ToggleButton#onChange} event.
*
* You may show the same text for both toggle states (via the
* [content]{@link module:enyo/Control~Control#content} property), or different text for each state,
* using the [toggleOnLabel]{@link module:moonstone/ToggleButton~ToggleButton#toggleOnLabel} and
* [toggleOffLabel]{@link module:moonstone/ToggleButton~ToggleButton#toggleOffLabel} properties. Note that both
* `toggleOnLabel` and `toggleOffLabel` must be set in order to display different labels;
* otherwise, the `content` property will be used.
*
* @class ToggleButton
* @extends module:moonstone/Button~Button
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ToggleButton~ToggleButton.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ToggleButton',

	/**
	* @private
	*/
	kind: Button,

	/**
	* @private
	* @lends module:moonstone/ToggleButton~ToggleButton.prototype
	*/
	published: {

		/**
		* Boolean indicating whether toggle button is currently in the 'on' state.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		value: false,

		/**
		* Button text displayed in the 'on' state. If not specified, the
		* [content]{@link module:enyo/Control~Control#content} property will be used as button text.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		toggleOnLabel: '',

		/**
		* Button text displayed in the 'off' state. If not specified, the
		* [content]{@link module:enyo/Control~Control#content} property will be used as button text.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		toggleOffLabel: ''
	},

	/*
	* @private
	*/
	events: {
		onChange: ''
	},

	/*
	* @private
	*/
	_rendered: false,

	/*
	* @private
	*/
	classes: 'moon-toggle-button',

	/*
	* @private
	*/
	create: function () {
		Button.prototype.create.apply(this, arguments);
		this.updateContent();
		this.updateVisualState();
	},

	/*
	* @private
	*/
	rendered: function () {
		Button.prototype.rendered.apply(this, arguments);
		this.setActive(this.value);
		this.fireChangeEvent();
		this._rendered = true;
	},

	/*
	* @private
	*/
	updateVisualState: function () {
		this.addRemoveClass('moon-toggle-button-on', this.value && !this.disabled);
	},

	/*
	* @private
	*/
	disabledChanged: function () {
		Button.prototype.disabledChanged.apply(this, arguments);
		this.updateVisualState();
	},

	/*
	* @private
	*/
	valueChanged: function () {
		this.updateContent();
		this.updateVisualState();
		this.setActive(this.value);
		this.fireChangeEvent();
	},

	/*
	* @private
	*/
	toggleOnLabelChanged: function () {
		this.updateContent();
	},

	/*
	* @private
	*/
	toggleOffLabelChanged: function () {
		this.updateContent();
	},

	/*
	* We override the inherited `activeChanged()` method.
	*
	* @private
	*/
	activeChanged: function () {
		if (this._rendered) {
			this.active = util.isTrue(this.active);
			this.setValue(this.active);
		}
		this.bubble('onActivate');
	},

	/*
	* we override the inherited `tap()` method.
	*
	* @private
	*/
	tap: function () {
		if (this.disabled) {
			return true;
		} else {
			this.setValue(!this.value);
		}
	},

	/*
	* @private
	*/
	updateContent: function () {
		if (!this.toggleOnLabel || !this.toggleOffLabel) {
			this.setContent(this.content);
		} else {
			this.setContent(this.value ? this.toggleOnLabel : this.toggleOffLabel);
		}
	},

	/*
	* @private
	*/
	fireChangeEvent: function () {
		this.doChange({value: this.value});
	},

	// Accessibility

	/**
	* The active state for a ToggleButton is relevant so we want to use `aria-pressed`
	*
	* @type {Boolean}
	* @default true
	* @public
	*/
	accessibilityPressed: true
});

},{'../Button':'moonstone/Button'}],'moonstone/AnimatedButton':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/AnimatedButton~AnimatedButton} kind.
* @wip
* @module moonstone/AnimatedButton
*/

require('moonstone');

var
	kind = require('enyo/kind'),
	util = require('enyo/utils');

var
	Button = require('moonstone/Button'),
	AnimatedButtonSvg = require('./AnimatedButtonSvg');

/**
* {@link module:moonstone/AnimatedButton~AnimatedButton} is a
* {@link module:moonstone/Button~Button} with Moonstone styling applied. The color of the button may
* be customized by specifying a background color.
*
* For more information, see the documentation on
* [Buttons]{@linkplain $dev-guide/building-apps/controls/buttons.html} in the
* Enyo Developer Guide.
*
* @class AnimatedButton
* @extends module:enyo/AnimatedButton~AnimatedButton
* @mixes module:moonstone/MarqueeSupport~MarqueeSupport
* @ui
* @wip
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/AnimatedButton~AnimatedButton.prototype */ {

	/**
	* @private
	*/
	name: 'moon.AnimatedButton',

	/**
	* @private
	*/
	kind: Button,

	/**
	* @private
	* @lends module:moonstone/AnimatedButton~AnimatedButton.prototype
	*/
	published: {

		/**
		* The length of time, in milliseconds, that the animation will run.
		*
		* @type {Number}
		* @default 400
		* @public
		*/
		duration: 400
	},

	/**
	* @private
	*/
	classes: 'moon-button-animated',

	/**
	* @private
	*/
	handlers: {
		onSpotlightFocus: 'animateSpotlightFocus',
		onSpotlightBlur: 'animateSpotlightBlur'
	},

	/**
	* @private
	*/
	bindings: [
		{from: 'duration', to: '$.animation.duration'}
	],

	/**
	* @private
	*/
	initComponents: function () {
		// Always add an SVG element, unless one already exists
		this.createChrome([
			{classes: 'moon-button-animated-frame', components: [
				{name: 'animation', kind: AnimatedButtonSvg, onEnd: 'animDone'}
			]}
		]);

		Button.prototype.initComponents.apply(this, arguments);

		if (this.$.client) {
			this.$.client.addClass('button-client');
		} else {
			// No client? Drop all the components into a client frame to keep them safe from evil.
			this.createComponent({name: 'client', classes: 'button-client', isChrome: true});
			var i,
				newClient = this.$.client,
				children = this.getClientControls();
			for (i = 0; i < children.length; i++) {
				children[i].set('container', newClient);
			}
		}
	},

	/**
	* @private
	*/
	animateSpotlightFocus: function () {
		this.$.animation.startFocus();
		util.asyncMethod(this, function () {
			this.removeClass('spotlight');
		});
		this.startJob('textTransition', function () {
			this.addClass('nearly-spotlight');
		}, this.get('duration') / 2);
	},

	/**
	* @private
	*/
	animateSpotlightBlur: function () {
		this.stopJob('textTransition');
		this.removeClass('nearly-spotlight');
		this.$.animation.startBlur();
	},

	/**
	* @private
	*/
	animDone: function (sender, ev) {
		this.addRemoveClass('spotlight', ev.focused);
		this.removeClass('nearly-spotlight');
		return true;
	}
});

},{'./AnimatedButtonSvg':'moonstone/AnimatedButton/AnimatedButtonSvg'}],'moonstone/Popup':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Popup~Popup} kind.
* @module moonstone/Popup
*/

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	Control = require('enyo/Control'),
	EnyoHistory = require('enyo/History'),
	Popup = require('enyo/Popup');

var
	Spotlight = require('spotlight');

var
	$L = require('../i18n'),
	Scrim = require('../Scrim'),
	Button = require('../Button'),
	IconButton = require('../IconButton'),
	HistorySupport = require('../HistorySupport');

/**
* {@link module:moonstone/Popup~Popup} is an {@link module:enyo/Popup~Popup} that appears at the bottom of the
* screen and takes up the full screen width.
*
* @class Popup
* @extends module:enyo/Popup~Popup
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Popup~Popup.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Popup',

	/**
	* @private
	*/
	kind: Popup,

	/**
	* @private
	*/
	mixins: [HistorySupport],

	/**
	* @private
	*/
	modal: true,

	/**
	* @private
	*/
	classes: 'moon moon-neutral enyo-unselectable moon-popup',

	/**
	* @private
	*/
	floating: true,

	/**
	* @private
	*/
	_bounds: null,

	/**
	* @private
	*/
	spotlight: 'container',

	/**
	* @private
	*/
	spotlightRememberFocus: false,

	/**
	* @private
	*/
	allowDefault: true,

	/**
	* @private
	*/
	handlers: {
		onRequestScrollIntoView   : '_preventEventBubble',
		ontransitionend           : 'animationEnd',
		onSpotlightSelect         : 'handleSpotlightSelect'
	},

	/**
	* @private
	*/
	eventsToCapture: {
		onSpotlightFocus: 'capturedFocus',
		onkeydown: 'captureKeyDown'
	},

	/**
	* @private
	* @lends module:moonstone/Popup~Popup.prototype
	*/
	published: {
		/**
		* Determines whether a scrim will appear when the dialog is modal. If `true`,
		* a transparent (i.e., invisible) overlay prevents the propagation of tap events.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		scrimWhenModal: true,

		/**
		* Determines whether or not to display a scrim. Only displays scrims when floating. When
		* the scrim is in the floating state (`floating: true`), it covers the entire viewport
		* (i.e., it is displayed on top of other controls).
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		scrim: true,

		/**
		* Optional class name to apply to the scrim. Be aware that the scrim is a singleton and
		* you will be modifying the scrim instance used for other popups.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		scrimClassName: '',

		/**
		* If `true`, {@glossary Spotlight} (focus) cannot leave the area of the popup unless the
		* popup is explicitly closed; if `false`, spotlight may be moved anywhere within the
		* viewport.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		spotlightModal: true,

		/**
		* When `true`, the close button is shown; when `false`, it is hidden.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		showCloseButton: false,

		/**
		* When `true`, popups will animate on/off screen.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		animate: true
	},

	/**
	* @private
	*/
	tools: [
		{name: 'client', kind: Control, classes: 'enyo-fill'},
		{name: 'closeButton', kind: IconButton, icon: 'closex', classes: 'moon-popup-close', ontap: 'closePopup', backgroundOpacity: 'transparent', accessibilityLabel: $L('Close'), showing: false}
	],

	/**
	* @private
	*/
	statics: { count: 0 },

	/**
	* @private
	*/
	defaultZ: 120,

	/**
	* @private
	*/
	activator: null,

	/**
	* Creates chrome components.
	*
	* @private
	*/
	initComponents: function() {
		this.createComponents(this.tools, {owner: this});
		Popup.prototype.initComponents.apply(this, arguments);
	},

	/**
	* @private
	*/
	create: function () {
		Popup.prototype.create.apply(this, arguments);
		this.animateChanged();
		this.showCloseButtonChanged();
	},

	/**
	* @private
	*/
	animateChanged: function() {
		this.addRemoveClass('animate', this.animate);
		if (!this.animate) {
			this.applyStyle('bottom', null);
		}
	},

	/**
	* Renders {@link module:moonstone/Popup~Popup}, extending {@link module:enyo/Popup~Popup}
	*
	* @private
	*/
	render: function() {
		this.allowHtmlChanged();
		this.contentChanged();
		Popup.prototype.render.apply(this, arguments);
	},

	/**
	* @private
	*/
	contentChanged: function() {
		this.$.client.setContent(this.content);
	},

	/**
	* @private
	*/
	allowHtmlChanged: function() {
		this.$.client.setAllowHtml(this.allowHtml);
	},

	/**
	* Sets `this.downEvent` on `onSpotlightSelect` event.
	*
	* @private
	*/
	handleSpotlightSelect: function(sender, event) {
		this.downEvent = event;
	},

	/**
	* If `this.downEvent` is set to a {@glossary Spotlight} event, skips normal popup
	* `capturedTap()` code.
	*
	* @private
	*/
	capturedTap: function(sender, event) {
		if (!this.downEvent || (this.downEvent.type != 'onSpotlightSelect')) {
			Popup.prototype.capturedTap.apply(this, arguments);
		}
	},

	/**
	* If the popup has no spottable children, an [Enter] key down will cause it to be hidden
	* because Spotlight will try to spot the nearest or last control for a 5-way key down.
	* Since there isn't a spottable child, a control outside the popup is focused which triggers
	* `capturedFocus` which hides the Popup.
	*
	* @private
	*/
	captureKeyDown: function (sender, event) {
		this.preventHide = (event.keyCode == 13 || event.keyCode == 16777221) && !Spotlight.isSpottable(this);
	},

	/**
	* @private
	*/
	capturedFocus: function (sender, event) {
		// While we're open, we hijack Spotlight focus events. In all cases, we want
		// to prevent the default 5-way behavior (which is to focus on the control nearest
		// to the pointer in the chosen direction)...
		var last = Spotlight.getLastControl(),
			cur = Spotlight.getCurrent(),
			focusCapturedControl = event.originator;
		// There are two cases where we want to focus back on ourselves...
		// NOTE: The logic used here to detect these cases is highly dependent on certain
		// nuances of how Spotlight currently tracks the "last" and "current" focus. It will
		// probably need to be updated if / when Spotlight gets some love in this area.
		if (
			// Case 1: We were probably just opened in pointer mode. The pointer is outside
			// the popup, which means a 5-way press will likely focus some control outside the
			// popup, unless we prevent it by re-spotting ourselves.
			//(last === this && !cur.isDescendantOf(this)) ||
			(last === this && !focusCapturedControl.isDescendantOf(this)) ||
			// Case 2: We were probably opened in 5-way mode and then the pointer was moved
			// (likely due to incidental movement of the magic remote). It's possible that the
			// user actually wants to exit the popup by focusing on something outside, but more
			// likely that they have accidentally wiggled the remote and intend to be moving
			// around within the popup -- so, again, we re-spot ourselves.
			(last.isDescendantOf(this) && cur !== this)

		) {
			Spotlight.spot(this);
		}
		// In all other cases, the user probably means to exit the popup by moving out, so we
		// close ourselves.
		else if (!this.preventHide) {
			this.hide();
		}
		return true;
	},

	/**
	* Called if [showCloseButton]{@link module:moonstone/Popup~Popup#showCloseButton} changes and
	* determines whether to display close button.
	*
	* @private
	*/
	showCloseButtonChanged: function() {
		if (this.showCloseButton != this.$.closeButton.get('showing')) {
			this.$.closeButton.set('showing', this.showCloseButton);
			this.addRemoveClass('reserve-close', this.showCloseButton);
			if (this.generated) {
				this.resize();
			}
		}
	},

	/**
	* @private
	*/
	showingChanged: function() {
		// reset flag to prevent hiding popup when Enter pressed on unspottable popup
		this.preventHide = false;

		if (this.showing) {
			if (this.isAnimatingHide) {
				// need to call this early to prevent race condition where animationEnd
				// originated from a "hide" context but we are already in a "show" context
				this.animationEnd = util.nop;
				Popup.count--;
				// if we are currently animating the hide transition, release
				// the events captured when popup was initially shown
				if (this.captureEvents) {
					this.release();
				}
				this.isAnimatingHide = false;
			}
			this.activator = Spotlight.getCurrent();
		}
		else {
			if (this.generated) {
				this.respotActivator();
			}
		}

		if (this.showing) {
			// Run inherited immediately
			Popup.prototype.showingChanged.apply(this, arguments);
			this.show();
		} else {
			this.hide();
			if (this.animate) {
				this.isAnimatingHide = true;
				// Instead of hiding the scrim with the inherited enyo method, when the
				// animation is finished, fire it now, so interactive control is returned to the
				// applicaiton while our popup is animating to the closed position.
				this.showHideScrim(this.showing);
				var args = arguments;
				this.animationEnd = this.bindSafely(function (sender, ev) {
					if (ev.originator === this) {
						// Delay inherited until animationEnd
						Popup.prototype.showingChanged.apply(this, args);
						this.animationEnd = util.nop;
						this.isAnimatingHide = false;
					}
				});
			} else {
				// Run inherited immediately
				Popup.prototype.showingChanged.apply(this, arguments);
			}
		}

		if (this.showing) {
			// Spot ourselves, unless we're already spotted
			var current = Spotlight.getCurrent();
			if (!current || !current.isDescendantOf(this)) {
				if (Spotlight.isSpottable(this)) {
					Spotlight.spot(this);
				}
				// If we're not spottable, just unspot whatever was previously spotted
				else {
					Spotlight.unspot();
				}
			}
		}

		if (this.allowBackKey) {
			if (this.showing) {
				this.pushBackHistory();
			} else if(!this.showing && !EnyoHistory.isProcessing()) {
				EnyoHistory.drop();
			}
		}
	},

	/**
	* Show the popup. This respects the current state of the
	* [animate]{@link module:moonstone/Popup~Popup#animate} property, showing with or without animation.
	*
	* @public
	*/
	show: function() {
		Popup.prototype.show.apply(this, arguments);
		this.addClass('showing');
	},

	/**
	* Hide the popup. This respects the current state of the
	* [animate]{@link module:moonstone/Popup~Popup#animate} property, hiding with or without animation.
	*
	* @public
	*/
	hide: function() {
		Popup.prototype.hide.apply(this, arguments);
		this.removeClass('showing');
	},

	/**
	* Overrides the default `getShowing()` behavior to avoid setting `this.showing` based on the
	* CSS `display` property.
	*
	* @private
	*/
	getShowing: function() {
		if (this.animate) {
			return this.showing;
		} else {
			return Popup.prototype.getShowing.apply(this, arguments);
		}
	},

	/**
	* Skips animation and jumps to the final shown state.
	*
	* @public
	*/
	showDirect: function() {
		var anim = this.animate;
		if (anim) {
			this.set('animate', false);
		}
		this.show();
		if (anim) {
			// getComputedStyleValue forces the browser to update the style rules before
			// proceeding. Otherwise the removal and addition of the "animate" class happens in
			// one rendering-pass, which will have no visual difference.
			this.getComputedStyleValue('display');
			this.set('animate', anim);
		}
	},

	/**
	* Skips animation and jumps to the final hidden state.
	*
	* @public
	*/
	hideDirect: function() {
		var anim = this.animate;
		if (anim) {
			this.set('animate', false);
		}
		this.hide();
		if (anim) {
			this.set('animate', anim);
		}
	},

	/**
	* @private
	*/
	showHideScrim: function(show) {
		if (this.floating && (this.scrim || (this.modal && this.scrimWhenModal))) {
			var scrim = this.getScrim();
			if (show && this.modal && this.scrimWhenModal) {
				// move scrim to just under the popup to obscure rest of screen
				var i = this.getScrimZIndex();
				this._scrimZ = i;
				scrim.showAtZIndex(i);
			} else {
				scrim.hideAtZIndex(this._scrimZ);
			}
			scrim.addRemoveClass(this.scrimClassName, scrim.showing);
		}
	},

	/**
	* @private
	*/
	getScrimZIndex: function() {
		// Position scrim directly below popup
		return this.findZIndex()-1;
	},

	/**
	* @private
	*/
	getScrim: function() {
		// show a transparent scrim for modal popups if scrimWhenModal is true
		// if scrim is true, then show a regular scrim.
		if (this.modal && this.scrimWhenModal && !this.scrim) {
			return Scrim.scrimTransparent.make();
		}
		return Scrim.scrim.make();
	},

	/**
	* @private
	*/

	/**
	* Removes focused style from close button and hides the popup.
	*
	* @private
	*/
	closePopup: function(sender, event) {
		if (this.$.closeButton) {
			this.$.closeButton.removeClass('pressed');
		}
		this.hide();
	},

	/**
	* Attempts to respot the activating control when the popup is hidden.
	*
	* @private
	*/
	respotActivator: function() {
		var a = this.activator;
		// We're about to spot something, so we first call release() to avoid capturing
		// (and preventing) the resulting SpotlightFocus event.
		this.release();
		// Attempt to identify and re-spot the activator if present
		if (a && !a.destroyed) {
			Spotlight.spot(a);
			if (a instanceof Button) {
				a.removeClass('pressed');
			}
		} else {
			// As a failsafe, attempt to spot the container if no activator is present
			Spotlight.spot(Spotlight.getFirstChild(this.container));
		}
		this.activator = null;
	},

	/**
	* @private
	*/
	_preventEventBubble: function(sender, event) {
		return true;
	},

	/**
	* @private
	*/
	destroy: function() {
		this.showHideScrim(false);
		Popup.prototype.destroy.apply(this, arguments);
	},

	/**
	* When `true`, the contents of the popup will be read when shown.
	*
	* @default true
	* @type {Boolean}
	* @public
	*/
	accessibilityReadAll: true,

	/**
	* @private
	*/
	accessibilityLive: 'off',

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['accessibilityReadAll', 'accessibilityRole', 'showing'], method: function () {
			this.startJob('alert', function () {
				this.setAriaAttribute('role', this.accessibilityReadAll && this.showing ? 'alert' : this.accessibilityRole);
			}, 100);
		}}
	]
});

},{'../i18n':'moonstone/i18n','../Scrim':'moonstone/Scrim','../Button':'moonstone/Button','../IconButton':'moonstone/IconButton','../HistorySupport':'moonstone/HistorySupport'}],'moonstone/ProgressButton':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ProgressButton~ProgressButton} kind.
* @module moonstone/ProgressButton
*/

var
	kind = require('enyo/kind'),
	Animator = require('enyo/Animator'),
	Control = require('enyo/Control');

var
	Button = require('../Button');

/**
* Fires when progress button finishes animating to a position. No event-specific data is sent 
* with this event.
*
* @event module:moonstone/ProgressButton~ProgressButton#onButtonProgressFinish
* @type {Object}
* @public
*/

/**
* {@link module:moonstone/ProgressButton~ProgressButton} is an animated button
* that shows progress from one state to another.
*
* ```
* 	var
* 		kind = require('enyo/kind'),
* 		ProgressButton = require('moonstone/ProgressButton');
*
* 	{kind: ProgressButton, progress: 10, content: 'Download', postContent: 'Launch'}
* ```
*
* To animate progress changes, call the {@link module:moonstone/ProgressButton~ProgressButton#animateProgressTo} method:
*
* ```
* 	this.$.progressButton.animateProgressTo(50);
* ```
*
* You may customize the color of the bar by applying a style via the
* {@link module:moonstone/ProgressButton~ProgressButton#barClasses} property, e.g.:
*
* ```
* 	{kind: ProgressButton, barClasses: 'class-name'}
* ```
*
* For more information, see the documentation on [Progress Button
* Indicators](building-apps/controls/progress-button-indicators.html) in the Enyo
* Developer Guide
*
* @class ProgressButton
* @extends module:moonstone/Button~Button
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ProgressButton~ProgressButton.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ProgressButton',

	/**
	* @private
	*/
	kind: Button,

	/**
	* @private
	*/
	classes: 'moon-progress-button',

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	* @lends module:moonstone/ProgressButton~ProgressButton.prototype
	*/
	published: {

		/**
		* Current position of progress button.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		progress: 0,

		/**
		* Minimum progress value (i.e., no progress made).
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		min: 0,

		/**
		* Maximum progress value (i.e., process complete).
		*
		* @type {Number}
		* @default 100
		* @public
		*/
		max: 100,

		/**
		* Optional CSS classes to apply to progress button bar.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		barClasses: '',

		/**
		* The text to display after the progress has been completed.
		*
		* @type {String}
		* @default 'Completed'
		* @public
		*/
		postContent: 'Completed',

		/**
		* Toggle whether there will be animation on the progress updates
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		animated: true,

		/**
		* The amount of fixed-steps the progress bar should increment to. 4 steps would step to
		* 25%, 50%, 75%, and 100%. 5 steps would step to 20%, 40%, 60%, 80%, and 100%. etc.
		*
		* @type {Number}
		* @default 4
		* @public
		*/
		steps: 4
	},

	/**
	* @private
	*/
	events: {

		/**
		* {@link module:moonstone/ProgressButton~ProgressButton#onButtonProgressFinish}
		*/
		onButtonProgressFinish: ''
	},

	/**
	* @private
	*/
	components: [
		{name: 'progressAnimator', kind: Animator, onStep: 'progressAnimatorStep', onEnd: 'progressAnimatorComplete'},
		{name: 'bar', kind: Control, classes: 'moon-progress-button-bar'},
		{name: 'progressPercent', kind: Control, classes: 'moon-progress-button-progresspercent'}
	],

	/**
	* @private
	*/
	create: function () {
		Button.prototype.create.apply(this, arguments);
		this.preContent = this.content;
		this.addRemoveClass('moon-progress-button-rtl', this.rtl);
		this.progressChanged();
		this.animatedChanged();
		this.barClassesChanged();
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
	progressChanged: function () {
		this.progress = this.clampValue(this.min, this.max, this.progress);

		var progress,
			percent = this.calcPercent(this.progress),
			offset = -10,
			minimumVisibleProgress = 10,
			increment = parseInt(100 / this.get('steps'), 10);
		if (percent < 100) {
			this.removeClass('completed');
		}
		if (percent < 5) {
			if (percent === 0) {
				this._inProgress(false);
				this.set('content', this.preContent);
				this.$.progressPercent.set('content', '');
				this.removeClass('in-progress');
			} else {
				this._inProgress(true);
				this.updateProgressPercent(percent);
			}
			// The value is so small that it should not be visible.
			this.$.bar.applyStyle('transform', 'translateX(-100%)');
			this.$.bar.applyStyle('-webkit-transform', 'translateX(-100%)');
			progress = 0;
		} else if (percent >= 5 && percent < 100) {
			// Disable spotlight: you can't click a button once it's in progress
			this._inProgress(true);
			if (percent < increment) {
				// Statically set the size of the progress bar if it's less than 1 increment.
				progress = minimumVisibleProgress;
			} else {
				// Calculate how many increments we should use
				progress = parseInt(percent / increment, 10) * increment;
			}
			this.updateProgressPercent(percent);
			// Only change the progress bar if it's different from the last time this was run
			if (progress != this._visibleProgress) {
				this.$.bar.applyStyle('transform', 'translateX(-' + (100 + offset - progress) + '%)');
				this.$.bar.applyStyle('-webkit-transform', 'translateX(-' + (100 + offset - progress) + '%)');
			}
		} else if (percent >= 100) {
			// Make it spottable again, now that it's finished.
			this.$.bar.applyStyle('transform', null);
			this.$.bar.applyStyle('-webkit-transform', null);
			this.setPostContent();
			progress = 100;
		}
		// Remember the last progress state
		this._visibleProgress = progress;
	},

	/**
	* @private
	*/
	_inProgress: function (state) {
		this.addRemoveClass('in-progress', state);
		this.set('spotlight', !state);
	},

	/**
	* @private
	*/
	clampValue: function (min, max, value) {
		return Math.max(min, Math.min(value, max));
	},

	/**
	* @private
	*/
	animatedChanged: function () {
		this.addRemoveClass('animated', this.get('animated'));
	},

	/**
	* @private
	*/
	calcRatio: function (value) {
		return (value - this.min) / (this.max - this.min);
	},

	/**
	* @private
	*/
	calcPercent: function (value) {
		return this.calcRatio(value) * 100;
	},

	/**
	* @private
	*/
	updateBarPosition: function (percent) {
		this.$.bar.applyStyle('width', percent + '%');
	},

	/**
	* @private
	*/
	updateProgressPercent: function(percent) {
		this.set('content', '');
		this.$.progressPercent.set('content', Math.round(percent) + '%');
	},

	/**
	* @private
	*/
	setPostContent: function(){
		this.startJob('completeProgress', function () {
			this.$.progressPercent.set('content', '');
			this.addClass('completed');
			this.set('content', this.get('postContent'));

			// When the animation is done, we are finally no longer in-progress.
			this.startJob('completeProgressDone', function () {
				this._inProgress(false);
			}, 200); // Same as the CSS transition duration
		}, 1000);
	},

	/**
	* Animates progress to the passed-in value.
	*
	* @param {Number} value  The destination number
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
	* @private
	*/
	progressAnimatorStep: function (sender) {
		this.setProgress(sender.value);
		return true;
	},

	/**
	* @fires module:moonstone/ProgressBar~ProgressBar#onButtonProgressFinish
	* @private
	*/
	progressAnimatorComplete: function (sender) {
		this.doButtonProgressFinish();
		return true;
	}
});

},{'../Button':'moonstone/Button'}],'moonstone/CheckboxItem':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/CheckboxItem~CheckboxItem} kind.
* @module moonstone/CheckboxItem
*/

var
	kind = require('enyo/kind');

var
	Checkbox = require('../Checkbox'),
	Item = require('../Item'),
	Marquee = require('../Marquee'),
	MarqueeItem = Marquee.Item;

/**
* Fires when the control is either checked or unchecked.
*
* @event module:moonstone/CheckboxItem~CheckboxItem#onActivate
* @type {Object}
* @property {Boolean} checked - Whether the checkbox is currently checked.
* @property {Object} toggledControl - A reference to the
*	{@link module:moonstone/CheckboxItem~CheckboxItem} whose state changed. (Note that the
*	originator of this event is actually the {@link module:moonstone/Checkbox~Checkbox} contained
*	within the CheckboxItem, so use this property
* to reference the CheckboxItem itself.)
*
* @public
*/

/**
* {@link module:moonstone/CheckboxItem~CheckboxItem} is a control that combines a
* {@link module:moonstone/Checkbox~Checkbox} with a text label. The label text may be set via the
* [content]{@link module:enyo/Control~Control#content} property. The state of the checkbox may be
* retrieved by querying the [checked]{@link module:moonstone/CheckboxItem~CheckboxItem#checked}
* property.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		CheckboxItem = require('moonstone/CheckboxItem');
*
* 	{kind: CheckboxItem, content: 'San Francisco',
* 		onchange: 'checkedChanged'},
*
* 	checkedChanged: function (sender, ev) {
* 		var checked = sender.get('checked');
* 	}
* ```
*
* You may place CheckboxItem objects inside an {@link module:enyo/Group~Group} to create a group
* of checkboxes in which only one may be checked at any given time (similar to how a
* [RadioItemGroup]{@link module:moonstone/RadioItemGroup~RadioItemGroup} behaves):
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Group = require('enyo/Group'),
* 		CheckboxItem = require('moonstone/CheckboxItem');
*
* 	{kind: Group, components: [
* 		{kind: CheckboxItem, content: 'New York'},
* 		{kind: CheckboxItem, content: 'London'},
* 		{kind: CheckboxItem, content: 'San Francisco'},
* 		{kind: CheckboxItem, content: 'Beijing'}
* 	]}
* ```
*
* @class CheckboxItem
* @extends module:enyo/Control~Control
* @mixes moonstone/CheckboxItem/CheckboxItemAccessibilitySupport~CheckboxItemAccessibilitySupport
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/CheckboxItem~CheckboxItem.prototype */ {

	/**
	* @private
	*/
	name: 'moon.CheckboxItem',

	/**
	* @private
	*/
	kind: Item,

	/**
	* @private
	* @lends module:moonstone/CheckboxItem~CheckboxItem.prototype
	*/
	published: {

		/**
		* Boolean value indicating whether checkbox is currently checked.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		checked: false,

		/**
		* Boolean value indicating whether checkbox is currently active item in group.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		active: false,

		/**
		* If `true`, checkbox will be displayed on the right side of the checkbox item;
		* otherwise, it will be displayed on the left side.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		checkboxOnRight: false,

		/**
		* If `true`, the value of the
		* [checked]{@link module:moonstone/CheckboxItem~CheckboxItem#checked} property cannot be
		* changed through user input.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		locked: false,

		/**
		* Name of a font-based icon to use when displaying the checkbox. Consult
		* {@link module:moonstone/Icon~Icon} for valid values.
		*
		* @type {String}
		* @default 'check'
		* @public
		*/
		icon: 'check',

		/**
		* Optional path to an image asset. May be used to customize checkbox appearance.
		*
		* @type {String|module:enyo/resolution#selectSrc~src}
		* @default ''
		* @public
		*/
		src: '',

		/**
		* If used as the base control within a {@link module:moonstone/DataList~DataList} or
		* {@glossary subkind}, this should be set to `false` so that selection support can be
		* synchronized to the checked state of this control.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		handleTapEvent: true
	},

	/**
	* @private
	*/
	events: {

		/**
		* {@link module:moonstone/CheckboxItem~CheckboxItem#onActivate}
		*/
		onActivate: ''
	},

	/**
	* @private
	*/
	classes: 'moon-checkbox-item',

	/**
	* @private
	*/
	handlers: {
		ontap: 'tap',
		onActivate: 'decorateActivateEvent'
	},

	/**
	* @private
	*/
	components: [
		{name: 'client', mixins: [MarqueeItem], classes: 'moon-checkbox-item-label-wrapper'},
		{name: 'input', kind: Checkbox, accessibilityDisabled: true, spotlight: false}
	],

	/**
	* @private
	*/
	bindings: [
		{from: 'allowHtml', to: '$.client.allowHtml'},
		{from: 'active', to: '$.input.active', oneWay: false}
	],

	/**
	* @private
	*/
	create: function () {
		Item.prototype.create.apply(this, arguments);
		this.disabledChanged();
		this.checkboxOnRightChanged();
		this.lockedChanged();
	},

	/**
	* @private
	*/
	rendered: function () {
		Item.prototype.rendered.apply(this, arguments);
		if (this.get('src') != null || this.get('icon') != null) {
			this.srcChanged();
			this.iconChanged();
		}
		this.checkedChanged();
	},

	/**
	* @private
	*/
	disabledChanged: function () {
		Item.prototype.disabledChanged.apply(this, arguments);
		this.$.input.set('disabled', this.disabled);
	},

	/**
	* @private
	*/
	checkedChanged: function () {
		this.$.input.set('checked', this.checked);
	},

	/**
	* @private
	*/
	checkboxOnRightChanged: function () {
		this.addRemoveClass('left-handed', !this.checkboxOnRight);
	},

	/**
	* waterfall event
	* @fires module:enyo/Control~Control#ontap
	* @private
	*/
	tap: function (sender, ev) {
		if (this.disabled) return true;
		if (this.handleTapEvent) {
			if (sender != this.$.input) {
				this.waterfallDown('ontap', ev, sender);
			}
		}
	},

	/**
	* @fires module:moonstone/CheckboxItem~CheckboxItem#onActivate
	* @private
	*/
	decorateActivateEvent: function (sender, ev) {
		ev.toggledControl = this;
		this.set('checked', this.$.input.checked);
		ev.checked = this.checked;
	},

	/**
	* @private
	*/
	contentChanged: function () {
		this.$.client.set('content', this.content);
	},

	/**
	* @private
	*/
	lockedChanged: function() {
		this.$.input.set('locked', this.locked);
	},

	/**
	* @private
	*/
	iconChanged: function() {
		this.$.input.set('icon', this.icon);
	},

	/**
	* @private
	*/
	srcChanged: function() {
		this.$.input.set('src', this.src);
	},

	// Accessibility

	/**
	* @default checkbox
	* @type {String}
	* @see enyo/AccessibilitySupport~AccessibilitySupport#accessibilityRole
	* @public
	*/
	accessibilityRole: 'checkbox',

	/**
	* @private
	*/
	ariaObservers: [
		{from: 'checked', to: 'aria-checked'}
	]
});

},{'../Checkbox':'moonstone/Checkbox','../Item':'moonstone/Item','../Marquee':'moonstone/Marquee'}],'moonstone/LabeledTextItem':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/LabeledTextItem~LabeledTextItem} kind.
* @module moonstone/LabeledTextItem
*/

var
	kind = require('enyo/kind');

var
	Item = require('../Item'),
	Marquee = require('../Marquee');

/**
* {@link module:moonstone/LabeledTextItem~LabeledTextItem}, which extends {@link module:moonstone/Item~Item}, is a
* [control]{@link module:enyo/Control~Control} that combines text content with a text label and
* marquees it.
*
* @class LabeledTextItem
* @extends module:moonstone/Item~Item
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/LabeledTextItem~LabeledTextItem.prototype */ {

	/**
	* @private
	*/
	name: 'moon.LabeledTextItem',

	/**
	* @private
	*/
	kind: Item,

	/**
	* @private
	*/
	mixins: [Marquee.Support],

	/**
	* @private
	*/
	classes: 'moon-labeledtextitem',

	/**
	* @private
	* @lends module:moonstone/LabeledTextItem~LabeledTextItem.prototype
	*/
	published: {

		/**
		* The label to be displayed along with the text.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		label: '',

		/**
		* The text to be displayed in the item.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		text: ''
	},

	/**
	* @private
	*/
	bindings: [
		{from: 'label', to: '$.header.content'},

		// Accessibility
		{from: '_accessibilityText', to: '$.text.accessibilityLabel'}
	],

	/**
	* @private
	*/
	components:[
		{name: 'header', kind: Marquee.Text, classes: 'moon-labeledtextitem-header'},
		{name: 'text', classes: 'moon-labeledtextitem-text'}
	],

	/**
	* @private
	*/
	create: function () {
		Item.prototype.create.apply(this, arguments);
		this.textChanged();
	},

	/**
	/* @private
	*/
	textChanged: function () {
		var validValue = this.text || this.text === 0;
		this.addRemoveClass('with-text', validValue);
		this.$.text.set('content', this.text);
		if (validValue) this.$.text.detectTextDirectionality(this.text);
	},

	// Accessibility

	/**
	* @private
	*/
	_accessibilityText: '',

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['label', 'text', 'accessibilityHint', 'accessibilityLabel'], method: function () {
			var text = this._accessibilityText ? this._accessibilityText : this.text,
				content = this.label + ' ' + text ,
				prefix = this.accessibilityLabel || content || null,
				label = this.accessibilityHint && prefix && (prefix + ' ' + this.accessibilityHint) ||
						this.accessibilityHint ||
						this.accessibilityLabel ||
						null;

				this.setAriaAttribute('aria-label', label);
		}}
	]
});

},{'../Item':'moonstone/Item','../Marquee':'moonstone/Marquee'}],'moonstone/SelectableItem':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/SelectableItem~SelectableItem} kind.
* @module moonstone/SelectableItem
*/

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	Item = require('../Item');

/**
* Fires when the item is tapped. No event-specific data is sent with this event.
*
* @event module:moonstone/SelectableItem~SelectableItem#onActivate
* @type {Object}
* @public
*/

/**
* {@link module:moonstone/SelectableItem~SelectableItem} is a {@link module:moonstone/Item~Item} with a flag to track
* selection state.  It is particularly useful within the context of the
* [Enyo Group API]{@link module:enyo/Group~Group}.
*
* When selected, the item appears as underlined.
*
* If multiple SelectableItem objects are used in a group, only one of them
* may be in the selected state at a given time.
*
* @class SelectableItem
* @extends module:moonstone/Item~Item
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/SelectableItem~SelectableItem.prototype */ {

	/**
	* @private
	*/
	name: 'moon.SelectableItem',

	/**
	* @private
	*/
	kind: Item,
	
	/**
	* @private
	*/
	classes: 'moon-selectable-item',
	
	/**
	* @private
	*/
	events: {
		onActivate: ''
	},

	/**
	* @private
	* @lends module:moonstone/SelectableItem~SelectableItem.prototype
	*/
	published: {

		/**
		* Will be `true` if this item is currently selected; otherwise, `false`.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		selected: false,

		/**
		* For use with the [Enyo Group API]{@link module:enyo/Group~Group}. Will be `true` if this item
		* is the selected item in the group. Within this kind, the
		* [selected]{@link module:moonstone/SelectableItem~SelectableItem#selected} and `active` properties appear to
		* behave similarly; however, `active` is meant to be used by {@link module:enyo/Group~Group},
		* while `selected` is to be used for changing selection state.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		active: false,
		
		/**
		* If used as the base control within a {@link module:moonstone/DataList~DataList} or {@glossary subkind},
		* this should be set to `false` so that selection support can be synchronized to the
		* checked state of this control.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		handleTapEvent: true
	},
	
	/**
	* @method
	* @private
	*/
	create: function() {
		Item.prototype.create.apply(this, arguments);
		this.contentChanged();
		this.updateSelectedValue();
	},

	/**
	* @private
	*/
	rendered: function() {
		Item.prototype.rendered.apply(this, arguments);
		this.updateActiveValue();
	},

	/**
	* @private
	*/
	shouldDoTransition: function(selected) {
		return selected === true;
	},

	/**
	* @private
	*/
	tap: function(sender, e) {
		if (this.disabled) {
			return true;
		}
		if (this.handleTapEvent) {
			this.setActive(!this.getActive());
			this.bubble('onchange');
		}
	},

	/**
	* @private
	*/
	updateSelectedValue: function() {
		var selected = this.getSelected();
		this.addRemoveClass('selected', selected);
		this.setNodeProperty('selected', selected);
		this.setAttribute('selected', selected ? 'selected' : '');
		this.reflow();
	},

	/**
	* @private
	*/
	updateActiveValue: function() {
		this.setActive(this.getSelected());
	},

	/**
	* @private
	*/
	selectedChanged: function() {
		this.updateSelectedValue();
		this.updateActiveValue();
	},

	/**
	* For use with the [Enyo Group API]{@link module:enyo/Group~Group}, which is supported by this object.
	* Called when the active item within the group changes. The
	* [active]{@link module:moonstone/SelectableItem~SelectableItem#active} property and
	* [onActivate]{@link module:moonstone/SelectableItem~SelectableItem#onActivate} event are both part of the
	* Group API.
	*
	* @private
	*/
	activeChanged: function() {
		this.active = utils.isTrue(this.active);
		this.setSelected(this.active);
		this.resetMarquee();
		this.bubble('onActivate');
	},

	// Accessibility

	/**
	* @default radio
	* @type {String}
	* @see enyo/AccessibilitySupport~AccessibilitySupport#accessibilityRole
	* @public
	*/
	accessibilityRole: 'radio',

	/**
	* @private
	*/
	ariaObservers: [
		{from: 'selected', to: 'aria-checked'}
	]
});

},{'../Item':'moonstone/Item'}],'moonstone/Drawers':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Drawers~Drawers} kind.
* @module moonstone/Drawers
*/

var
	kind = require('enyo/kind'),
	dispatcher = require('enyo/dispatcher'),
	Animator = require('enyo/Animator'),
	Control = require('enyo/Control'),
	Drawer = require('enyo/Drawer'),
	EnyoHistory = require('enyo/History'),
	dom = require('enyo/dom');

var
	options = require('../options'),
	Icon = require('../Icon'),
	Item = require('../Item'),
	HistorySupport = require('../HistorySupport');

var
	$L = require('../i18n'),
	MoonDrawer = require('./Drawer');

/**
* {@link module:moonstone/Drawers~Drawers} is a container kind designed to hold
* a set of {@link module:moonstone/Drawers/Drawer~Drawer} objects and client content.
* The [drawers]{@link module:moonstone/Drawers~Drawers#drawers} property accepts
* an array of Drawer controls. The associated handles are positioned in their
* own small drawer, centered at the top of the "dresser" (the region containing
* the array of Drawer controls and the activator nub).
*
* When a handle is selected, it opens the corresponding Drawer object's main
* drawer or control drawer, depending on how the Drawer object is configured.
* The control's child components may be of any kind.
*
* ```
* var
* 	kind = require('enyo/kind'),
* 	Drawers = require('moonstone/Drawers'),
* 	Drawer = Drawers.Drawer;
*
* {
*	kind: Drawers,
*	drawers: [
*		{
*			name: 'musicDrawer',
*			kind: Drawer,
*			handle: {content: 'Handle'},
*			components: [
*				{content: 'Drawer Content'}
*			],
*			controlDrawerComponents: [
*				{content: 'Controls'}
*			]
*		}
*	],
*	components: [
*		{content: 'Content Area'}
*	]
* }
* ```
*
* @class Drawers
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Drawers~Drawers.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Drawers',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	mixins : [HistorySupport],

	/**
	* @private
	*/
	classes: 'moon-drawers enyo-fit',

	/**
	* @private
	* @lends module:moonstone/Drawers~Drawers.prototype
	*/
	published: {

		/**
		* Populate with an array of {@link module:moonstone/Drawers/Drawer~Drawer} components.
		*
		* @type {Object[]}
		* @default null
		* @public
		*/
		drawers: null,

		/**
		* When using a font-based icon, the name of the icon to be used.
		* The following icon names are valid:
		*
		* 'drawer'
		* 'arrowlargeup'
		* 'arrowlargedown'
		* 'arrowlargeleft'
		* 'arrowlargeright'
		* 'arrowsmallup'
		* 'arrowsmalldown'
		* 'arrowsmallleft'
		* 'arrowsmallright'
		* 'closex'
		* 'check'
		* 'search'
		*
		* @type {String}
		* @default ''
		* @public
		*/
		icon: '',

		/**
		* URL specifying path to icon image.
		*
		* @type {String|module:enyo/resolution#selectSrc~src}
		* @default ''
		* @public
		*/
		src: ''
	},

	/**
	* Default icon displayed on drawer handle when open
	*
	* @type {String}
	* @default 'arrowsmalldown'
	* @private
	*/
	iconClosed: 'arrowsmalldown',

	/**
	* Default icon displayed on drawer handle when closed
	*
	* @type {String}
	* @default 'arrowsmallup'
	* @private
	*/
	iconOpen: 'arrowsmallup',

	/**
	* Cached value of the top position of the client area. Used for non-accelerated animation.
	*
	* @type {Number}
	* @default 0
	* @private
	*/
	clientTop: 0,

	/**
	* Value for Drawer open or close state
	*
	* @type {Boolean}
	* @default false
	* @private
	*/
	_activated: false,


	/**
	* @private
	*/
	accessibilityPreventScroll: true,

	/**
	* @private
	*/
	handlers: {
		//* Handlers to update the activator when the state of the contained drawers changes
		onActivate: 'drawerActivated',
		onDeactivate: 'drawerDeactivated',
		onDrawerAnimationEnd: 'drawerAnimationComplete',
		onSpotlightDown: 'spotDown',
		onSpotlightUp: 'spotUp'
	},

	/**
	* @private
	*/
	components: [
		{name: 'activator', kind: Control, classes: 'moon-drawers-activator', spotlight: true, ontap: 'activatorTapped', components: [
			{name: 'activatorIcon', kind: Icon, classes: 'moon-drawers-activator-icon', small: false}
		]},
		{name: 'handleContainer', kind: Drawer, classes: 'moon-drawers-handle-container', resizeContainer: false, open: false, spotlightDisabled: true, components: [
			{name: 'handles', kind: Control, classes: 'moon-neutral moon-drawers-handles'}
		]},
		{name: 'drawers', kind: Control, classes: 'moon-drawers-drawer-container'},
		{name: 'client', kind: Control, classes: 'moon-drawers-client'}
	],

	/**
	* @private
	*/
	eventsToCapture: {
		ontap: 'captureTapSelect',
		onSpotlightFocus: 'captureSpotFocus',
		onSpotlightSelect: 'captureTapSelect'
	},

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.drawers = this.$.drawers.createComponents(this.drawers, {kind: MoonDrawer, owner: this.owner});
		if (!options.accelerate) this.createComponent({name: 'animator', kind: Animator, onStep: 'animationStep'});
		this.setupHandles();
		this._activatedChanged();
	},

	/**
	* @private
	*/
	rendered: function () {
		Control.prototype.rendered.apply(this, arguments);
		this.updateDrawerHeight();
	},

	/**
	* @private
	*/
	destroy: function () {
		var i,
			c$ = this.drawers;
		dispatcher.release(this.$.handleContainer);
		for (i = 0; i < c$.length; i++) {
			dispatcher.release(c$[i]);
		}
		Control.prototype.destroy.apply(this, arguments);
	},

	/**
	* @private
	*/
	srcChanged: function () {
		this.updateActivator();
	},

	/**
	* @private
	*/
	iconChanged: function () {
		this.updateActivator();
	},

	/**
	* @private
	*/
	setupHandles: function () {
		var i, len, handle,
			def = {kind: Item, owner: this},
			tap = this.bindSafely(this.handleTapped);

		for (i = 0, len = this.drawers.length; i < len; i++) {
			handle = this.$.handles.createComponent(this.drawers[i].handle || {}, def);
			handle.addClass('moon-drawers-handle');
			handle.tap = tap;
		}
	},

	/**
	* Updates the icon and styling of the activator for the state of the drawer
	*
	* @param {Boolean} open Drawer state
	* @private
	*/
	updateActivator: function (open) {
		this.set('_activated', !!open, {force: true});
	},

	/**
	* @private
	*/
	_activatedChanged: function () {
		var icon, src;

		if (this._activated) {
			src = '';
			icon = this.iconOpen;
		} else {
			src = this.src;
			icon = (src && !this.icon) ? '' : (this.icon || this.iconClosed);
		}

		this.$.activator.addRemoveClass('open', this._activated);
		this.$.activatorIcon.set('src', src);
		this.$.activatorIcon.set('icon', icon);
	},

	/**
	* Inform each drawer of the total available height
	*
	* @private
	*/
	updateDrawerHeight: function () {
		var dh = document.body.getBoundingClientRect().height,
			drawer, i;
		for (i = this.drawers.length - 1; i >= 0; --i) {
			drawer = this.drawers[i];
			if (drawer instanceof MoonDrawer) drawer.set('fullHeight', dh);
		}
	},

	/**
	* @private
	*/
	activatorTapped: function () {
		var handles;
		if (this.isDrawerOpen()) {
			this.closeDrawers();
		} else {
			handles = this.$.handles.getControls();
			if (handles.length == 1) {
				this.openDrawer(handles[0]);
				this.updateActivator(true);
			} else if (this.$.handleContainer.getOpen()) {
				this.closeHandleContainer();
			} else {
				this.openHandleContainer();
			}
		}
	},

	/**
	* @private
	*/
	openHandleContainer: function () {
		this.$.handleContainer.spotlightDisabled = false;
		this.$.handleContainer.setOpen(true);
		this.updateActivator(true);
		dispatcher.capture(this.$.handleContainer, this.eventsToCapture, this);
		if (this.allowBackKey) {
			this.pushBackHistory();
		}
	},

	/**
	* @private
	*/
	closeHandleContainer: function () {
		dispatcher.release(this.$.handleContainer);
		this.$.handleContainer.spotlightDisabled = true;
		this.$.handleContainer.setOpen(false);
		this.updateActivator(this.isDrawerOpen());
	},

	/**
	* @private
	*/
	handleTapped: function (sender, ev) {
		EnyoHistory.drop();
		this.openDrawer(ev.originator);
		return true;
	},

	/**
	* @private
	*/
	openDrawer: function (handle) {
		var drawer,
			handles = this.$.handles.getControls();
		for (var index = 0; index < handles.length; ++index) {
			if (handle.isDescendantOf(handles[index])) {
				drawer = this.$.drawers.getControls()[index];
				drawer.show();
				drawer.toggleDrawer();
				this.closeHandleContainer();
				dispatcher.capture(drawer, this.eventsToCapture, this);
				return;
			}
		}
	},

	/**
	* @private
	*/
	isDrawerOpen: function () {
		var drawers = this.$.drawers.getControls();
		for (var index = 0; index < drawers.length; ++index) {
			if (drawers[index].get('open') || drawers[index].get('controlsOpen')) {
				return true;
			}
		}
		return false;
	},

	/**
	* @private
	*/
	closeDrawers: function () {
		var drawers = this.$.drawers.getControls();
		for (var index = 0; index < drawers.length; ++index) {
			var drawer = drawers[index];
			if (drawer.get('open') || drawer.get('controlsOpen')) {
				dispatcher.release(drawer);
				drawer.set('open', false);
				drawer.set('controlsOpen', false);
			}
		}
		this.$.client.spotlightDisabled = false;
		this.updateActivator(false);
	},

	/**
	* @private
	*/
	captureSpotFocus: function (sender, ev) {
		// Only close drawers on 5-way focus in the client (not pointer focus)
		if (ev.dir && ev.dispatchTarget.isDescendantOf(this.$.client)) {
			this.closeDrawers();
			this.closeHandleContainer();
		}
	},

	/**
	* @private
	*/
	captureTapSelect: function (sender, ev) {
		// Any tap or select in the client area closes the dresser/drawer
		if (ev.dispatchTarget.isDescendantOf(this.$.client)) {
			this.closeDrawers();
			this.closeHandleContainer();
		}
	},

	/**
	* Animates the position of the client area when a drawer is opened or closed
	*
	* @private
	*/
	animate: function (height) {
		if (options.accelerate) {
			dom.transformValue(this.$.client, 'translateY', height + 'px');
		} else {
			this.$.animator.play({
				startValue: this.clientTop,
				endValue: height
			});
		}
	},

	/**
	* When `!options.accelerate`, this handles {@link module:enyo/Animator~Animator#onStep}
	* to update the position of the client area.
	*
	* @private
	*/
	animationStep: function (sender, event) {
		// cache the last top value to be reused by animate() as the startValue
		this.clientTop = sender.value;
		this.$.client.setBounds({top: this.clientTop + 'px'});
	},

	/**
	* @private
	*/
	drawerActivated: function (sender, ev) {
		var drawer = ev.originator instanceof MoonDrawer ? ev.originator : null;
		if (drawer) {
			this.updateActivator(true);
			// show/hide() is expensive. Use spotlightDisabled feature instead
			this.$.client.spotlightDisabled = drawer.open;
			this.animate(ev.height);
		}
	},

	/**
	* @private
	*/
	drawerDeactivated: function (sender, ev) {
		var drawer = ev.originator instanceof MoonDrawer ? ev.originator : null;
		if (drawer) {
			if (!drawer.open && !drawer.controlsOpen) this.updateActivator(false);
			// show/hide() is expensive. Use spotlightDisabled feature instead
			this.$.client.spotlightDisabled = drawer.open;
			this.animate(ev.height);
		}
	},

	drawerAnimationComplete: function (sender, ev) {
		var drawer = ev.originator instanceof MoonDrawer ? ev.originator : null;
		if (drawer && !drawer.open && !drawer.controlsOpen) {
			drawer.hide();
		}
	},

	/**
	* @private
	*/
	handleResize: function () {
		Control.prototype.handleResize.apply(this, arguments);
		this.updateDrawerHeight();
		this.updateActivator(false);
	},

	/**
	* @private
	*/
	backKeyHandler: function () {
		this.closeHandleContainer();
		return true;
	},

	// Accessibility

	ariaObservers: [
		{path: ['accessibilityLabel', 'accessibilityHint', '_activated'], method: function() {
			// According to drawer is open or close or handleContainer state, drawers activator label is defined.
			// In addition, if user add accessibilityLabel, label is determined with accessibilityLabel instead of default string.
			// However, if user add only accessibilityHint, hint text is appended to default string.
			var defaultLabel = (this._activated || this.$.handleContainer.getOpen()) ? $L('Close drawer') : $L('Open drawer'),
				prefix = this.accessibilityLabel || defaultLabel,
				label = this.accessibilityHint && (prefix + ' ' + this.accessibilityHint) ||
						prefix;
			this.$.activator.set('accessibilityLabel', label);
		}}
	]
});

module.exports.Drawer = MoonDrawer;

},{'../options':'moonstone/options','../Icon':'moonstone/Icon','../Item':'moonstone/Item','../HistorySupport':'moonstone/HistorySupport','../i18n':'moonstone/i18n','./Drawer':'moonstone/Drawers/Drawer'}],'moonstone/Image':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Image~Image} kind.
* @module moonstone/Image
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control'),
	Img = require('enyo/Image');

var
	Icon = require('../Icon'),
	Overlay = require('../Overlay');

/**
* {@link module:moonstone/Image~Image} is a simple control that wraps an {@link module:enyo/Image~Image} to provide proper
* alignment with text-based controls.
*
* In addition, `moonstone/Image` adds [overlay]{@link module:moonstone/Overlay} support to show controls over the image. This
* can be used to add action icons as in the example below.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Image = require('moonstone/Image'),
* 		Icon = require('moonstone/Icon');
*
* 	{kind: Image, src: 'moonstone/src/assets/movie.png',
* 		overlayShowing: 'spotlight', overlayPosition: 'bottom', overlayComponents: [
* 			{kind: Icon, src: 'moonstone/src/assets/icon-recommended.png'},
* 			{kind: Icon, icon: 'star'},
* 			{kind: Icon, src: 'moonstone/src/assets/icon-new.png'}
* 		]
* 	}
* ```
*
* For backwards compatibility, component configurations specified using the `components` block
* within a `moonstone/Image` will be mapped to `overlayComponents` and will default the `kind` to be
* {@link module:moonstone/Icon~Icon}. This behavior is considered deprecated and will be removed in a future release.
*
* @class Image
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Image~Image.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Image',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	mixins: [Overlay.Support],

	/**
	* @private
	*/
	classes: 'moon-image',

	/**
	* @private
	* @lends module:moonstone/Image~Image.prototype
	*/
	published: {

		/**
		* The URL of the image.
		*
		* @type {String|module:enyo/resolution#selectSrc~src}
		* @default ''
		* @public
		*/
		src: '',

		/**
		* The `alt` text for the image.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		alt: '',

		/**
		* If `true`, badges will only be shown when the image is within a
		* spotlightable component that has focus.  Otherwise, any badges provided
		* will always be shown.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		showBadgesOnSpotlight: false,

		/**
		* The image sizing strategy. See {@link module:enyo/Image~Image} for details.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		sizing: '',

		/**
		* The image position when [sizing]{@link module:moonstone/Image~Image#sizing} is used.  See
		* {@link module:enyo/Image~Image} for details.
		*
		* @type {Object}
		* @default ''
		* @public
		*/
		position: '',

		/**
		* See {@link module:enyo/Image~Image#placeholder}
		*
		* @type {String}
		* @default ''
		* @public
		*/
		placeholder: ''
	},

	/**
	* @private
	*/
	components: [
		{name: 'image', kind: Img}
	],

	/**
	* @private
	*/
	bindings: [
		{from: 'src', to: '$.image.src'},
		{from: 'alt', to: '$.image.alt'},
		{from: 'sizing', to: '$.image.sizing'},
		{from: 'position', to: '$.image.position'},
		{from: 'placeholder', to: '$.image.placeholder'}
	],

	/**
	* @private
	*/
	create: function () {
		this.adaptComponentsBlock();
		Control.prototype.create.apply(this, arguments);
	},

	/**
	* Adapting from the prior API. We'll assume that the presence of components but not
	* overlayComponents means the consumer is expecting the former ImageBadge-style overlay.
	*
	* @deprecated Backwards compatibility for `moon/ImageBadge`s within components block
	* @private
	*/
	adaptComponentsBlock: function () {
		var i, c;
		if (this.components && !this.overlayComponents) {
			this.overlayComponents = this.components;
			this.components = null;
			for (i = this.overlayComponents.length - 1; i >= 0; --i) {
				c = this.overlayComponents[i];
				c.kind = c.kind || Icon;
			}
			this.overlayPosition = this.overlayPosition || 'bottom';
			this.showBadgesOnSpotlightChanged();
		}
	},

	/**
	* @private
	*/
	showBadgesOnSpotlightChanged: function (was, is) {
		this.set('overlayShowing', this.showBadgesOnSpotlight ? 'spotlight' : true);
	}
});

},{'../Icon':'moonstone/Icon','../Overlay':'moonstone/Overlay'}],'moonstone/ScrollStrategy':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ScrollStrategy~ScrollStrategy} kind.
* @module moonstone/ScrollStrategy
*/

var
	kind = require('enyo/kind'),
	dispatcher = require('enyo/dispatcher'),
	dom = require('enyo/dom'),
	util = require('enyo/utils'),
	platform = require('enyo/platform'),
	Control = require('enyo/Control'),
	ScrollStrategy = require('enyo/ScrollStrategy'),
	TouchScrollStrategy = require('enyo/TouchScrollStrategy'),
	ScrollMath = require('enyo/ScrollMath'),
	Signals = require('enyo/Signals');

var
	Spotlight = require('spotlight');

var
	config = require('../options'),
	PagingControl = require('../PagingControl'),
	ScrollThumb = require('../ScrollThumb');

function calcNodeVisibility (nodePos, nodeSize, scrollPos, scrollSize) {
	return (nodePos >= scrollPos && nodePos + nodeSize <= scrollPos + scrollSize)
		? 0
		: nodePos - scrollPos > 0
			? 1
			: nodePos - scrollPos < 0
				? -1
				: 0;
}

/**
* {@link module:moonstone/ScrollStrategy~ScrollStrategy} inherits from {@link module:enyo/TouchScrollStrategy~TouchScrollStrategy}.
* Its main purpose is to handle scroller paging for {@link module:moonstone/Scroller~Scroller} and
* {@link module:moonstone/DataList~DataList}.
*
* @class ScrollStrategy
* @extends module:enyo/TouchScrollStrategy~TouchScrollStrategy
* @public
*/
var MoonScrollStrategy = module.exports = kind(
	/** @lends module:moonstone/ScrollStrategy~ScrollStrategy.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ScrollStrategy',

	/**
	* @private
	*/
	kind: TouchScrollStrategy,

	/**
	* @private
	* @lends module:moonstone/ScrollStrategy~ScrollStrategy.prototype
	*/
	published: {

		/**
		* The ratio of mousewheel "delta" units to pixels scrolled. Increase this value to
		* increase the distance scrolled by the scroll wheel. Note that mice/trackpads do not
		* emit the same delta units per "notch" or flick of the scroll wheel/trackpad; that
		* can vary based on intensity and momentum.
		*
		* @type {Number}
		* @default 2
		* @public
		*/
		scrollWheelMultiplier: 2,

		/**
		* The ratio of the maximum distance scrolled by each scroll wheel event to the
		* height/width of the viewport. Setting a value larger than `1` is not advised since,
		* in that scenario, a single scroll event could potentially move more than one
		* viewport's worth of content (depending on the delta received), resulting in skipped
		* content.
		*
		* @type {Number}
		* @default 0.2
		* @public
		*/
		scrollWheelPageMultiplier: 0.2,

		/**
		* The ratio of the distance scrolled per tap of the paging button to the height/width
		* of the viewport. Setting a value larger than `1` is not advised since, in that
		* scenario, a single paging button tap would move more than one viewport's worth of
		* content, resulting in skipped content.
		*
		* @type {Number}
		* @default 0.8
		* @public
		*/
		paginationPageMultiplier: 0.8,

		/**
		* The ratio of continuous-scrolling "delta" units to pixels scrolled. Increase this
		* value to increase the distance scrolled when the pagination buttons are held.
		*
		* @type {Number}
		* @default 8
		* @public
		*/
		paginationScrollMultiplier: 8,

		/**
		* If 'true', paging controls are hidden when content fit in scroller
		* even when spotlightPagingControls is true.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		hideScrollColumnsWhenFit: false
	},

	/**
	* If `true`, measure the size of the scroll columns on initial render.
	* See {@link module:moonstone/ScrollStrategy~ScrollStrategy#measureScrollColumns} for details.
	*
	* @private
	*/
	measureScrollColumns: false,

	// The scrollToBoundary configuration parameters below
	// are considered private for now, but have been factored
	// this way and are facaded by Scroller so that they can
	// be changed in one place and could be overridden in case
	// of emergency.

	/**
	* @private
	*/
	scrollToBoundaryDelay: 100,

	/**
	* @private
	*/
	scrollToBoundaryAnimate: true,

	/**
	* @private
	*/
	handlers: {
		onRequestScrollIntoView : 'requestScrollIntoView',
		onRequestSetupBounds	: 'requestSetupBounds',
		onenter                 : 'enter',
		onleave                 : 'leave',
		onSpotlightFocused      : 'manageSpotlightFocus',
		onSpotlightBlur         : 'manageSpotlightFocus',
		onSpotlightFocus        : 'store5WayFocusInfo'
	},

	/**
	* @private
	*/
	tools: [
		{kind: ScrollMath, onScrollStart: 'scrollMathStart', onScroll: 'scrollMathScroll', onScrollStop: 'scrollMathStop', onStabilize: 'scrollMathStabilize'}
	],

	/**
	* @private
	*/
	components: [
		{name: 'clientContainer', kind: Control, classes: 'moon-scroller-client-wrapper', components: [
			{name: 'viewport', kind: Control, classes:'moon-scroller-viewport', components: [
				{name: 'client', kind: Control, classes: 'enyo-touch-scroller enyo-touch-scroller-client matrix-scroll-client matrix3dsurface'}
			]}
		]},
		{name: 'vColumn', kind: Control, classes: 'moon-scroller-v-column', components: [
			{name: 'pageUpControl', kind: PagingControl, defaultSpotlightDisappear: 'pageDownControl', defaultSpotlightDown: 'pageDownControl', side: 'top', onPaginateScroll: 'paginateScroll', onPaginate: 'paginate', onSpotlightUp: 'spotPaging'},
			{name: 'vthumbContainer', kind: Control, classes: 'moon-scroller-thumb-container moon-scroller-vthumb-container', components: [
				{name: 'vthumb', kind: ScrollThumb, classes: 'moon-scroller-vthumb hidden', axis: 'v'}
			]},
			{name: 'pageDownControl', kind: PagingControl, defaultSpotlightDisappear: 'pageUpControl', defaultSpotlightUp: 'pageUpControl', side: 'bottom', onPaginateScroll: 'paginateScroll', onPaginate: 'paginate', onSpotlightDown: 'spotPaging'}
		]},
		{name: 'hColumn', kind: Control, classes: 'moon-scroller-h-column', components: [
			{name: 'pageLeftControl', kind: PagingControl, defaultSpotlightDisappear: 'pageRightControl', defaultSpotlightRight: 'pageRightControl', side: 'left', onPaginateScroll: 'paginateScroll', onPaginate: 'paginate', onSpotlightLeft: 'spotPaging'},
			{name: 'hthumbContainer', kind: Control, classes: 'moon-scroller-thumb-container moon-scroller-hthumb-container', components: [
				{name: 'hthumb', kind: ScrollThumb, classes: 'moon-scroller-hthumb hidden', axis: 'h'}
			]},
			{name: 'pageRightControl', kind: PagingControl, defaultSpotlightDisappear: 'pageLeftControl', defaultSpotlightLeft: 'pageLeftControl', side: 'right', onPaginateScroll: 'paginateScroll', onPaginate: 'paginate', onSpotlightRight: 'spotPaging'}
		]},
		{kind: Signals, onSpotlightModeChanged: 'spotlightModeChanged', isChrome: true}
	],

	/**
	* @private
	*/
	create: function() {
		TouchScrollStrategy.prototype.create.apply(this, arguments);
		this.transform = dom.canTransform();
		this.accel = dom.canAccelerate();
		this.container.addClass('enyo-touch-strategy-container');
		this.translation = this.accel ? 'matrix3d' : 'matrix';
		this.showHideScrollColumns(this.spotlightPagingControls);
	},

	/**
	* Calls super-super-inherited (i.e., skips {@link module:enyo/TouchScrollStrategy~TouchScrollStrategy}'s) `rendered()`
	* function to avoid thumb flicker at render time. Then shows or hides page controls.
	*
	* @private
	*/
	rendered: function() {
		var measure = this.measureScrollColumns && !ScrollStrategy._scrollColumnsMeasured;

		if (measure) {
			// We temporarily add the v-scroll-enabled class so that
			// we can measure the width of the vertical scroll column
			// after rendering and store it as a static property -- see
			// _measureScrollColumns().
			//
			// The v-scroll-enabled class will automatically be removed
			// after we measure, when we call setupBounds() (which in
			// turn calls enableDisableScrollColumns()).
			this.$.clientContainer.addClass('v-scroll-enabled');
		}

		ScrollStrategy.prototype.rendered.apply(this, arguments);

		if (measure) {
			this._measureScrollColumns();
		}
		this.setupBounds();
		this.spotlightPagingControlsChanged();
	},

	/**
	* Moonstone's data grid list delegate uses scroll column metrics to calculate
	* available space for list controls. These metrics are derived via some LESS
	* calculations, so to avoid brittleness we choose to measure them from the DOM
	* rather than mirror the calculations in JavaScript.
	*
	* Upon request, we do the measurement here (the first time a scroller is rendered)
	* and cache the values in static properties, to avoid re-measuring each time we need
	* the metrics.
	*
	* @private
	*/
	_measureScrollColumns: function() {
		var cs;
		cs = dom.getComputedStyle(this.$.clientContainer.hasNode());
		MoonScrollStrategy.vScrollColumnSize =
			parseInt(cs['padding-left'], 10) +
			parseInt(cs['padding-right'], 10);
		MoonScrollStrategy.hScrollColumnSize = this.$.hColumn.hasNode().offsetHeight;
		MoonScrollStrategy._scrollColumnsMeasured = true;
	},

	/**
	* @private
	*/
	handleResize: function() {
		this.resizing = true;
		this.resetCachedValues();
		this.setupBounds();
		this.resizing = false;
	},

	/**
	* @private
	*/
	setupBounds: function() {
		this.calcBoundaries();
		this.syncScrollMath();
		this.enableDisableScrollColumns();
		this.remeasure();
		this.setThumbSizeRatio();
		this.clampScrollPosition();
	},

	/**
	* Gets the left scroll position within the scroller.
	*
	* @returns {Number} The left scroll position.
	* @public
	*/
	getScrollLeft: function() {
		return this.scrollLeft;
	},

	/**
	* Gets the top scroll position within the scroller.
	*
	* @returns {Number} The top scroll position.
	* @public
	*/
	getScrollTop: function() {
		return this.scrollTop;
	},

	/**
	* Sets the left scroll position within the scroller.
	*
	* @param {Number} left - The desired scroll-left measurement (in pixels).
	* @public
	*/
	setScrollLeft: function(left) {
		var m = this.$.scrollMath,
			p = this.scrollLeft;
		m.setScrollX(-left);
		m.stabilize();
		if (p != -m.x) {
			// We won't get a native scroll event,
			// so need to make one ourselves
			m.doScroll();
		}
	},

	/**
	* Sets the top scroll position within the scroller.
	*
	* @param {Number} top - The desired scroll-top measurement (in pixels).
	* @public
	*/
	setScrollTop: function(top) {
		var m = this.$.scrollMath,
			p = this.scrollTop;
		m.setScrollY(-top);
		m.stabilize();
		if (p != -m.y) {
			// We won't get a native scroll event,
			// so need to make one ourselves
			m.doScroll();
		}
	},

	/**
	* Scrolls to specific x/y positions within the scroll area.
	*
	* @param {Number} x - The horizontal position.
	* @param {Number} y - The vertical position.
	* @param {Boolean} [animate=true] - Whether to animate to the new scroll position.
	* @public
	*/
	scrollTo: function(x, y, animate) {
		this.stop();
		if (this.resizing || animate === false) {
			var b = this.getScrollBounds();
			x = Math.max(Math.min(x, b.maxLeft), 0);
			y = Math.max(Math.min(y, b.maxTop),  0);
			this.effectScroll(x, y);
			this.syncScrollMath();
			this.bubble('onScroll');
		} else {
			this._scrollTo(x, y);
		}
	},

	/**
	* Overrides {@link module:enyo/TouchScrollStrategy~TouchScrollStrategy#maxHeightChanged}.
	*
	* @private
	*/
	maxHeightChanged: function() {
		// content should cover scroller at a minimum if there's no max-height.
		this.$.client.applyStyle('min-height', this.maxHeight ? null : '100%');
		this.$.client.applyStyle('max-height', this.maxHeight);
		this.$.clientContainer.addRemoveClass('enyo-scrollee-fit', !this.maxHeight);
	},

	// Event handling

	/**
	* Disables dragging on non-touch devices.
	*
	* @private
	*/
	shouldDrag: function(sender, event) {
		if (platform.touch) {
			event.dragger = this;
		}
		return true;
	},

	/**
	* @private
	*/
	scrollMathStart: function () {
		if (platform.touch) {
			Spotlight.mute(this);
		}
		return TouchScrollStrategy.prototype.scrollMathStart.apply(this, arguments);
	},

	/**
	* @private
	*/
	scrollMathStop: function () {
		var r = TouchScrollStrategy.prototype.scrollMathStop.apply(this, arguments);
		if (platform.touch) {
			Spotlight.unmute(this);
		}
		return r;
	},

	/**
	* On `hold` event, stops scrolling.
	*
	* @private
	*/
	hold: function(sender, event) {
		if (!this.isPageControl(event.originator)) {
			TouchScrollStrategy.prototype.hold.apply(this, arguments);
		}
	},

	/**
	* On `down` event, stops scrolling.
	*
	* @private
	*/
	down: function(sender, event) {
		if (platform.touch) {
			event.configureHoldPulse({
				endHold: 'onMove'
			});
		}
		if (!this.isPageControl(event.originator) && this.isScrolling() && !this.isOverscrolling()) {
			event.preventTap();
			this.stop();
		}
	},

	/**
	* On `mousewheel` event, scrolls a fixed amount.
	*
	* @private
	*/
	mousewheel: function(sender, event) {
		if (this.useMouseWheel) {
			var isScrolling = this.isScrolling();
			this.setupBounds();
			this.scrollBounds = this._getScrollBounds();

			var x = null,
				y = null,
				wheelDelta = null,
				showVertical = this.showVertical(),
				showHorizontal = this.showHorizontal(),
				dir = null,
				val = null,
				max = null,
				delta = null
			;

			//* If we don't have to scroll, allow mousewheel event to bubble
			if (!showVertical && !showHorizontal) {
				this.scrollBounds = null;
				return false;
			}

			if (showVertical) {
				dir = event.wheelDeltaY >= 0 ? 1 : -1;
				val = Math.abs(event.wheelDeltaY * this.scrollWheelMultiplier);
				max = this.scrollBounds.clientHeight * this.scrollWheelPageMultiplier;
				delta = Math.min(val, max);
				y = (isScrolling ? this.lastScrollToY : this.scrollTop) + -dir * delta;
			}

			if (showHorizontal) {
				var intDirection = 1;
				// Reverse the direction for RTL
				if (this.$.pageLeftControl.rtl) {
					intDirection = -1;
				}
				// only use vertical wheel for horizontal scrolling when no vertical bars shown
				wheelDelta = !showVertical && event.wheelDeltaY || event.wheelDeltaX;
				dir = (wheelDelta >= 0 ? 1 : -1) * intDirection;
				val = Math.abs(wheelDelta * this.scrollWheelMultiplier);
				max = this.scrollBounds.clientWidth * this.scrollWheelPageMultiplier;
				delta = Math.min(val, max);
				x = (isScrolling ? this.lastScrollToX : this.scrollLeft) + -dir * delta;
			}

			this.scrollTo(x, y);
			if (!isScrolling && this.thumb) {
				this.showThumbs();
				this.delayHideThumbs(100);
			}
			event.preventDefault();
			this.scrollBounds = null;
			return true;
		}
	},

	/**
	* On `enter` event, sets `this.hovering` to `true` and shows pagination controls.
	*
	* @private
	*/
	enter: function(sender, event) {
		this.hovering = true;
		this.calcBoundaries();
		this.enableDisableScrollColumns();
		this.showHideScrollColumns(true);
		this.updateHoverOnPagingControls(true);
	},

	/**
	* On `leave` event, sets `this.hovering` to `false` and hides pagination controls.
	*
	* @private
	*/
	leave: function(sender, event) {
		this.hovering = false;
		this.showHideScrollColumns(false);
	},

	/**
	* Show / hide pagination controls in response to 5-way focus / blur events.
	*
	* @private
	*/
	manageSpotlightFocus: function(sender, event) {
		if (!Spotlight.getPointerMode()) {
			this.showHideScrollColumns(event.type == 'onSpotlightFocused');
		}
	},

	/**
	* Handles `paginate` events sent from [paging control]{@link module:moonstone/PagingControl~PagingControl} buttons.
	*
	* @private
	*/
	paginate: function(sender, event) {
		var sb = this.getScrollBounds(),
			scrollYDelta = sb.clientHeight * this.paginationPageMultiplier,
			scrollXDelta = sb.clientWidth * this.paginationPageMultiplier,
			side = event.originator.side,
			x = this.getScrollLeft(),
			y = this.getScrollTop()
		;

		switch (side) {
		case 'left':
			x -= scrollXDelta;
			break;
		case 'top':
			y -= scrollYDelta;
			break;
		case 'right':
			x += scrollXDelta;
			break;
		case 'bottom':
			y += scrollYDelta;
			break;
		}

		x = Math.max(0, Math.min(x, sb.maxLeft));
		y = Math.max(0, Math.min(y, sb.maxTop));

		this._scrollTo(x, y);

		return true;
	},

	/**
	* Handles `paginateScroll` events sent from [paging control]{@link module:moonstone/PagingControl~PagingControl}
	* buttons.
	*
	* @private
	*/
	paginateScroll: function(sender, event) {
		if (!event || !event.scrollDelta) {
			return;
		}

		var delta = event.scrollDelta * this.paginationScrollMultiplier,
			side = event.originator.side,
			val
		;

		switch (side) {
			case 'left':
				val = this.scrollLeft - delta;
				// When we hit the left, bounce and end scrolling
				if (val <= -this.$.scrollMath.leftBoundary) {
					this.setScrollLeft(-this.$.scrollMath.leftBoundary);
					this.$.pageLeftControl.hitBoundary();
				} else {
					this.setScrollLeft(val);
				}
				break;
			case 'top':
				val = this.scrollTop - delta;
				// When we hit the top, bounce and end scrolling
				if (val <= -this.$.scrollMath.topBoundary) {
					this.setScrollTop(-this.$.scrollMath.topBoundary);
					this.$.pageUpControl.hitBoundary();
				} else {
					this.setScrollTop(val);
				}
				break;
			case 'right':
				val = this.scrollLeft + delta;
				// When we hit the right, bounce and end scrolling
				if (val >= -this.$.scrollMath.rightBoundary) {
					this.setScrollLeft(-this.$.scrollMath.rightBoundary);
					this.$.pageRightControl.hitBoundary();
				} else {
					this.setScrollLeft(val);
				}

				break;
			case 'bottom':
				val = this.scrollTop + delta;
				// When we hit the bottom, bounce and end scrolling
				if (val >= -this.$.scrollMath.bottomBoundary) {
					this.setScrollTop(-this.$.scrollMath.bottomBoundary);
					this.$.pageDownControl.hitBoundary();
				} else {
					this.setScrollTop(val);
				}
				break;
		}

		return true;
	},

	/**
	* Scrolls to specific x/y positions within the scroll area.
	*
	* @private
	*/
	_scrollTo: function(x, y) {
		this.lastScrollToX = x;
		this.lastScrollToY = y;
		this.$.scrollMath.scrollTo(x, y);
	},

	/**
	* Returns `true` if passed-in [control]{@link module:enyo/Control~Control} is one of four page controls.
	*
	* @private
	*/
	isPageControl: function(control) {
		return (
			control === this.$.pageUpControl ||
			control === this.$.pageDownControl ||
			control === this.$.pageLeftControl ||
			control === this.$.pageRightControl
		);
	},

	/**
	* @private
	*/
	calcBoundaries: function() {
		var s = this.$.scrollMath || this,
			b = this._getScrollBounds()
		;
		s.bottomBoundary = -1 * b.maxTop;
		s.rightBoundary = -1 * b.maxLeft;

		this.updatePagingControlState();
	},

	/**
	* @private
	*/
	effectScroll: function(x, y) {
		this.scrollLeft = (x !== null && !isNaN(x))? x: (this.scrollLeft || 0);
		this.scrollTop  = (y !== null && !isNaN(y))? y: (this.scrollTop  || 0);
		dom.transformValue(this.$.client, this.translation, this.generateMatrix());

		// since effectScroll will happen frequently but paging control status changes
		// infrequently, fire it immediately and then throttle the next update
		if (!this._updatePagingJob) {
			this.updatePagingControlState();
		} else {
			clearTimeout(this._updatePagingJob);
		}

		this._updatePagingJob = setTimeout(this.bindSafely(function () {
			this.updatePagingControlState();
			this._updatePagingJob = null;
		}), 32);
	},

	/**
	* @private
	*/
	generateMatrix: function() {
		var x = -1 * this.scrollLeft,
			y = -1 * this.scrollTop
		;

		/// Reverse the direction for RTL
		if (this.$.pageLeftControl.rtl) {
			x*= -1;
		}

		return (this.accel)
			?   '1,         0,     0,  0, '
			+   '0,         1,     0,  0, '
			+   '0,         0,     1,  0, '
			+    x + ', ' + y + ', 0,  1'

			:   '1, 0, 0, 1, ' + x + ', ' + y
		;
	},

	/**
	* @private
	*/
	effectScrollStop: function() { },

	/**
	* @private
	*/
	effectOverscroll: function() { },

	/**
	* @private
	*/
	spotlightPagingControlsChanged: function() {
		this.updateHoverOnPagingControls(!this.spotlightPagingControls);
		this.showHideScrollColumns(this.spotlightPagingControls);
		if (this.generated) {
			this.setupBounds();
		}
	},

	/**
	* @private
	*/
	updateHoverOnPagingControls: function(hover) {
		this.$.pageLeftControl.addRemoveClass('hover', hover);
		this.$.pageRightControl.addRemoveClass('hover', hover);
		this.$.pageUpControl.addRemoveClass('hover', hover);
		this.$.pageDownControl.addRemoveClass('hover', hover);
	},

	/**
	* @private
	*/
	updatePagingControlState: function () {
		// Update disabled state of paging controls based on bounds
		var m = this.$.scrollMath,
			b = this._getScrollBounds(),
			canVScroll = b.height > b.clientHeight,
			canHScroll = b.width > b.clientWidth,
			disablePageUp = (b.top <= 0) || !canVScroll,
			disablePageDown = (b.top >= -1 * m.bottomBoundary) || !canVScroll,
			disablePageLeft = (b.left <= 0) || !canHScroll,
			disablePageRight = (b.left >= -1 * m.rightBoundary) || !canHScroll;

		// Enable all of the paging controls (which are not already enabled) first, so that we
		// are not beholden to any ordering issues that can cause erratic Spotlight behavior.
		if (!disablePageUp) this.$.pageUpControl.set('disabled', false);
		if (!disablePageDown) this.$.pageDownControl.set('disabled', false);
		if (!disablePageLeft) this.$.pageLeftControl.set('disabled', false);
		if (!disablePageRight) this.$.pageRightControl.set('disabled', false);

		if (disablePageUp) this.$.pageUpControl.set('disabled', true);
		if (disablePageDown) this.$.pageDownControl.set('disabled', true);
		if (disablePageLeft) this.$.pageLeftControl.set('disabled', true);
		if (disablePageRight) this.$.pageRightControl.set('disabled', true);
	},

	/**
	* Decorate spotlight events from paging controls so user can 5-way out of container
	*
	* @private
	*/
	spotPaging: function (sender, event) {
		event.requestLeaveContainer = true;
	},

	/**
	* Because the thumb columns are a fixed size that impacts the scroll bounds, we capture
	* the difference for use in thumb rendering math.
	*
	* @private
	*/
	setThumbSizeRatio: function() {
		var scrollBounds = this.getScrollBounds();
		this.$.vthumb.setSizeRatio(this.getVerticalThumbBounds().height/scrollBounds.clientHeight);
		this.$.hthumb.setSizeRatio(this.getHorizontalThumbBounds().width/scrollBounds.clientWidth);
	},

	/**
	* Store information about the most recent Spotlight focus event on a child of the scroller.
	* This information is used in `requestScrollIntoView()` to capture the direction of the
	* 5-way move (if any) that is associated with the request to scroll, since we can use the
	* direction to help us figure out whether we should scroll all the way to the nearest
	* boundary.
	*
	* Ideally, we'd get information about the direction from the `onRequestScrollIntoView` event
	* itself, but passing the direction with the event would require changes to Spotlight and to
	* many individual Moonstone controls, so we're trying this approach for now.
	*
	* @private
	*/
	store5WayFocusInfo: function (sender, event) {
		if (event.direction) {
			this._focusTarget = event.originator;
			this._focusDirection = event.direction;
		}
		else if (event.focusType === '5-way bounce') {
			this._focusTarget = event.originator;
			this._focusBounce = true;
		}
	},

	/**
	* Responds to child components' requests to be scrolled into view.
	*
	* @private
	*/
	requestScrollIntoView: function(sender, event) {
		var originator, showVertical, showHorizontal, bounce, direction,
			bubble = false;
		if (!Spotlight.getPointerMode() || event.scrollInPointerMode === true) {
			originator = event.originator;
			if (originator === this._focusTarget) {
				bounce = this._focusBounce;
				direction = this._focusDirection;
				this._focusTarget = this._focusDirection = this._focusBounce = null;
			}
			if (!bounce) {
				this.scrollBounds = this._getScrollBounds();
				this.setupBounds();
				showVertical = this.showVertical();
				showHorizontal = this.showHorizontal();
				this.scrollBounds = null;
				if ((showVertical || showHorizontal) && (originator.getAbsoluteShowing())) {
					this.animateToControl(originator, event.scrollFullPage, event.scrollInPointerMode || false, direction);
					if ((showVertical && this.$.scrollMath.bottomBoundary) || (showHorizontal && this.$.scrollMath.rightBoundary)) {
						this.alertThumbs();
					}
				} else {
					// Scrollers that don't need to scroll bubble their onRequestScrollIntoView,
					// to allow items in nested scrollers to be scrolled
					bubble = true;
				}
			}
		}
		return !bubble;
	},

	/**
	* Responds to child components' requests to update scroll bounds without
	* scrolling into view.
	*
	* @private
	*/
	requestSetupBounds: function(sender, event) {
		if (this.generated) {
			this.scrollBounds = this._getScrollBounds();
			this.setupBounds();
			this.scrollBounds = null;
			if ((this.showVertical() && this.$.scrollMath.bottomBoundary) || (this.showHorizontal() && this.$.scrollMath.rightBoundary)) {
				this.alertThumbs();
			}
		}
		return true;
	},

	/**
	* @private
	*/
	spotlightModeChanged: function(sender, event) {
		var activatePageControls = this.shouldShowPageControls();
		this.showHideScrollColumns(activatePageControls);
		this.updateHoverOnPagingControls(activatePageControls);
	},

	/**
	* Enables or disables scroll columns.
	*
	* @private
	*/
	enableDisableScrollColumns: function() {
		var vWas = this.verticalScrollEnabled,
			hWas = this.horizontalScrollEnabled;
		this.enableDisableVerticalScrollControls(this.showVertical());
		this.enableDisableHorizontalScrollControls(this.showHorizontal());
		if ((vWas !== this.verticalScrollEnabled || hWas !== this.horizontalScrollEnabled) && !this.resizing) {
			this.resize();
		}
	},

	/**
	* Enables or disables vertical scroll column.
	*
	* @private
	*/
	enableDisableVerticalScrollControls: function(enabled) {
		this.$.clientContainer.addRemoveClass('v-scroll-enabled', enabled);
		this.$.vColumn.addRemoveClass('v-scroll-enabled', enabled);
		this.$.hColumn.addRemoveClass('v-scroll-enabled', enabled);
		this.$.pageUpControl.spotlight = enabled && this.spotlightPagingControls;
		this.$.pageDownControl.spotlight = enabled && this.spotlightPagingControls;
		this.verticalScrollEnabled = enabled;
	},

	/**
	* Enables or disables horizontal scroll column.
	*
	* @private
	*/
	enableDisableHorizontalScrollControls: function(enabled) {
		this.$.clientContainer.addRemoveClass('h-scroll-enabled', enabled);
		this.$.vColumn.addRemoveClass('h-scroll-enabled', enabled);
		this.$.hColumn.addRemoveClass('h-scroll-enabled', enabled);
		this.$.pageLeftControl.spotlight = enabled && this.spotlightPagingControls;
		this.$.pageRightControl.spotlight = enabled && this.spotlightPagingControls;
		this.horizontalScrollEnabled = enabled;
	},

	/**
	* Shows or hides scroll columns.
	*
	* @private
	*/
	showHideScrollColumns: function(show) {
		this.showHideVerticalScrollColumns(show);
		this.showHideHorizontalScrollColumns(show);
	},

	/**
	* Shows or hides vertical scroll columns.
	*
	* @private
	*/
	showHideVerticalScrollColumns: function(show) {
		this.$.vColumn.addRemoveClass('visible', show || this.spotlightPagingControls);
	},

	/**
	* Shows or hides horizontal scroll columns.
	*
	* @private
	*/
	showHideHorizontalScrollColumns: function(show) {
		this.$.hColumn.addRemoveClass('visible', show || this.spotlightPagingControls);
	},

	/**
	* Returns boolean indicating whether page controls should be shown at all for this scroller.
	*
	* @private
	*/
	shouldShowPageControls: function() {
		return (Spotlight.getPointerMode() && this.hovering && !this.spotlightPagingControls);
	},

	/**
	* Determines whether we should be showing the vertical scroll column.
	*
	* @private
	*/
	showVertical: function() {
		return (this.getVertical() == 'scroll' ||
				(this.getVertical() !== 'hidden' &&
				((-1 * this.$.scrollMath.bottomBoundary > 0) ||
				(this.spotlightPagingControls && !this.hideScrollColumnsWhenFit))));
	},

	/**
	* Determines whether we should be showing the horizontal scroll column.
	*
	* @private
	*/
	showHorizontal: function() {
		return (this.getHorizontal() == 'scroll' ||
				(this.getHorizontal() !== 'hidden' &&
				((-1 * this.$.scrollMath.rightBoundary > 0) ||
				(this.spotlightPagingControls && !this.hideScrollColumnsWhenFit))));
	},

	/**
	* Update bounds after change hideScrollColumnsWhenFit option changes.
	*
	* @private
	*/
	hideScrollColumnsWhenFitChanged: function(old) {
		this.requestSetupBounds();
	},

	/**
	* @private
	*/
	_getScrollBounds: function() {
		if (this.scrollBounds) {
			return this.scrollBounds;
		}
		var containerBounds = this.getContainerBounds(),
			s = this.getScrollSize(),
			b = {
				top: this.getScrollTop(),
				left: this.getScrollLeft(),
				clientHeight: containerBounds.height,
				clientWidth: containerBounds.width,
				height: s.height,
				width: s.width
			};

		b.maxLeft = Math.max(0, b.width - b.clientWidth);
		b.maxTop = Math.max(0, b.height - b.clientHeight);

		util.mixin(b, this.getOverScrollBounds());

		return b;
	},

	/**
	* @private
	*/
	getContainerBounds: function() {
		var containerBounds = this.$.clientContainer.getBounds();
		if(containerBounds) {
			var paddingExtents = dom.calcPaddingExtents(this.$.clientContainer.hasNode());
			containerBounds.width  -= (paddingExtents.left + paddingExtents.right);
			containerBounds.height -= (paddingExtents.top  + paddingExtents.bottom);
		}
		return containerBounds;
	},

	/**
	* @private
	*/
	getVerticalThumbBounds: function() {
		return this.vBounds ? this.vBounds : this.$.vthumbContainer.getBounds();
	},

	/**
	* @private
	*/
	getHorizontalThumbBounds: function() {
		return this.hBounds ? this.hBounds : this.$.hthumbContainer.getBounds();
	},

	/**
	* @private
	*/
	resetCachedValues: function() {
		this.vBounds = null;
		this.hBounds = null;
		this.scrollBounds = null;
	},

	/**
	* Helper function for `animateToControl()`
	*
	* @private
	*/
	at5WayLimit: function (control, direction) {
		return !Spotlight.NearestNeighbor.getNearestNeighbor(direction, control, {root: Spotlight.getParent(control)});
	},

	/**
	* Helper function for `animateToControl()`
	*
	* @private
	*/
	getOffsets: function (control) {
		var offsets  = control.getAbsoluteBounds(),
			viewportBounds = this.$.viewport.getAbsoluteBounds(),
			scrollBounds   = this._getScrollBounds();

		offsets.right = document.body.offsetWidth - offsets.right;
		viewportBounds.right = document.body.offsetWidth - viewportBounds.right;

		// Make absolute controlBounds relative to scroll position
		offsets.top += scrollBounds.top;
		if (this.rtl) {
			offsets.right += scrollBounds.left;
		} else {
			offsets.left += scrollBounds.left;
		}

		offsets.top = offsets.top - viewportBounds.top;
		offsets.left = (this.rtl ? offsets.right : offsets.left) - (this.rtl ? viewportBounds.right : viewportBounds.left);

		return offsets;
	},

	/**
	* Scrolls until the passed-in [control]{@link module:enyo/Control~Control} is in view.
	* If `scrollFullPage` is set, scrolls until the edge of `control` is aligned
	* with the edge of the visible scroll area.
	*
	* @param {Control} control - The [control]{@link module:enyo/Control~Control} to scroll into view.
	* @param {Boolean} [scrollFullPage] - If `true`, scrolls until the edge of `control` is
	*	aligned with the edge of the visible scroll area. If `undefined`, the value in the
	*	container's `scrollFullPage` property is used.
	* @param {Boolean} [animate=true] - Set to `false` to prevent animation.
	* @param {String} direction - If the [control]{@link module:enyo/Control~Control} is being
	*   animated to as a result of a 5-way move, the direction of the 5-way move should be passed
	*   via this parameter. This information is used to scroll all the way to the scroller's boundary
	*   if there are no focusable elements between the control and the boundary, and the control is
	*   close enough to the boundary that it will be in view. This parameter is used internally; app
	*   code calling `animateToControl()` should generaly not need to use it.
	*
	* @private
	*/
	animateToControl: function(control, scrollFullPage, animate, direction) {
		var offsets = this.getOffsets(control),
			scrollBounds = this._getScrollBounds(),
			xDir,
			yDir,
			x,
			y;

		// Allow local scrollFullPage param to override scroller property
		scrollFullPage = (typeof scrollFullPage === 'undefined') ? this.container.getScrollFullPage() : scrollFullPage;

		// 0: currently visible, 1: right of viewport, -1: left of viewport
		xDir = calcNodeVisibility(offsets.left, offsets.width, scrollBounds.left, scrollBounds.clientWidth);
		// 0: currently visible, 1: below viewport, -1: above viewport
		yDir = calcNodeVisibility(offsets.top, offsets.height, scrollBounds.top, scrollBounds.clientHeight);

		switch (xDir) {
			case 0:
				x = this.getScrollLeft();
				break;
			case 1:
				// If control requested to be scrolled all the way to the viewport's left, or if the control
				// is larger than the viewport, scroll to the control's left edge. Otherwise, scroll just
				// far enough to get the control into view.
				if (scrollFullPage || offsets.width > scrollBounds.clientWidth) {
					x = offsets.left;
				} else {
					x = offsets.left - scrollBounds.clientWidth + offsets.width;
					// If nodeStyle exists, add the _marginRight_ to the scroll value.
					x += dom.getComputedBoxValue(control.hasNode(), 'margin', 'right');
				}
				break;
			case -1:
				// If control requested to be scrolled all the way to the viewport's right, or if the control
				// is larger than the viewport, scroll to the control's right edge. Otherwise, scroll just
				// far enough to get the control into view.
				if (scrollFullPage || offsets.width > scrollBounds.clientWidth) {
					x = offsets.left - scrollBounds.clientWidth + offsets.width;
				} else {
					x = offsets.left;
					// If nodeStyle exists, subtract the _marginLeft_ to the scroll value.
					x -= dom.getComputedBoxValue(control.hasNode(), 'margin', 'left');
				}
				break;
		}

		switch (yDir) {
			case 0:
				y = this.getScrollTop();
				break;
			case 1:
				// If control requested to be scrolled all the way to the viewport's top, or if the control
				// is larger than the viewport, scroll to the control's top edge. Otherwise, scroll just
				// far enough to get the control into view.
				if (scrollFullPage || offsets.height > scrollBounds.clientHeight) {
					y = offsets.top;
					// If nodeStyle exists, add the _marginBottom_ to the scroll value.
					y -= dom.getComputedBoxValue(control.hasNode(), 'margin', 'top');
				} else {
					y = offsets.top - scrollBounds.clientHeight + offsets.height;
					// If nodeStyle exists, add the _marginBottom_ to the scroll value.
					y += dom.getComputedBoxValue(control.hasNode(), 'margin', 'bottom');
				}
				break;
			case -1:
				// If control requested to be scrolled all the way to the viewport's bottom, or if the control
				// is larger than the viewport, scroll to the control's bottom edge. Otherwise, scroll just
				// far enough to get the control into view.
				if (scrollFullPage || offsets.height > scrollBounds.clientHeight) {
					y = offsets.top - scrollBounds.clientHeight + offsets.height;
				} else {
					y = offsets.top;
					// If nodeStyle exists, subtract the _marginTop_ to the scroll value.
					y -= dom.getComputedBoxValue(control.hasNode(), 'margin', 'bottom');
				}
				break;
		}

		// First, scroll as far as needed to bring the element into view, respecting
		// the requested scroll options
		this.scrollIfChanged(x, y, animate);

		// Then, if we're in 5-way mode, check to see if we should scroll all the way
		// to a scroller boundary along either axis. We scroll all the way to boundary
		// if a) there are no more focusable elements between the control we're scrolling
		// to and the boundary; and b) the control we're scrolling to is close enough to
		// the boundary that it will still be in view. The main purpose of this logic is
		// to ensure that users scrolling via 5-way remotes can still scroll to the edges
		// of the scroller's contents, even if there are no focusable elements immediately
		// adjacent to the scroller boundaries. This can happen in app layouts where there
		// are inherently non-focusable elements (e.g. headers) or in layouts where normally
		// focusable elements near the scroller boundaries have been disabled and therefore
		// can't be focused.
		if (!Spotlight.getPointerMode()) {
			// Do this in a job, since we don't want to perform the expensive Spotlight check
			// when the user is holding down a 5-way key to scroll rapidly; this way, we'll
			// only check when scrolling is finished.
			this.startJob('scrollToBoundary', this.bindSafely(function () {
				var hDir, hLimit, vDir, vLimit, pos, size, scrollSize;

				// We check the left boundary if we are explicitly moving
				// left, but also if the algorithm above has determined that
				// we need to scroll left. Same thing goes for the other three
				// boundaries. We consider implicit direction because if the scroller
				// is scrolling in two dimensions, there may be cases where (for
				// example) an element reached via a vertical move happens to be
				// the closest element to a horizontal boundary. 
				if (direction === 'LEFT' || xDir === -1) {
					hDir = 'LEFT';
					hLimit = 0;
				}
				else if (direction === 'RIGHT' || xDir === 1) {
					hDir = 'RIGHT';
					hLimit = scrollBounds.maxLeft;
				}

				// If we've determined that we're moving right or left, check
				// the corresponding boundary and see whether we're at the limit
				// of 5-way navigation in that direction.
				if (hDir && this.at5WayLimit(control, hDir)) {
					// If we are at the limit, we need to make sure that the control
					// we're scrolling to will still be in view if we scroll all the
					// way to the boundary
					pos = offsets.left;
					size = offsets.width;
					scrollSize = scrollBounds.clientWidth;
					if (calcNodeVisibility(pos, size, hLimit, scrollSize) === 0) {
						x = hLimit;
					}
				}

				// Same logic as above, but applied to vertical moves
				if (direction === 'UP' || yDir === -1) {
					vDir = 'UP';
					vLimit = 0;
				}
				else if (direction === 'DOWN' || yDir === 1) {
					vDir = 'DOWN';
					vLimit = scrollBounds.maxTop;
				}
				
				if (vDir && this.at5WayLimit(control, vDir)) {
					pos = offsets.top;
					size = offsets.height;
					scrollSize = scrollBounds.clientHeight;
					if (calcNodeVisibility(pos, size, vLimit, scrollSize) === 0) {
						y = vLimit;
					}
				}

				// If we have determined we should scroll to the boundary, do it now
				this.scrollIfChanged(x, y, this.scrollToBoundaryAnimate);
			}), this.scrollToBoundaryDelay);
		}
	},

	/**
	* @private
	*/
	scrollIfChanged: function (x, y, animate) {
		// If x or y changed, scroll to new position
		if (x !== this.getScrollLeft() || y !== this.getScrollTop()) {
			this.scrollTo(x, y, animate);
		}
	},

	/**
	* @private
	*/
	clampScrollPosition: function() {
		var x = this.clampX(),
			y = this.clampY();

		if (x !== this.getScrollLeft() || y !== this.getScrollTop()) {
			this.scrollTo(x, y);
		}
	},

	/**
	* @private
	*/
	clampX: function() {
		var m = this.$.scrollMath;
		return Math.min(Math.max(this.getScrollLeft(), -1*m.leftBoundary), -1*m.rightBoundary);
	},

	/**
	* @private
	*/
	clampY: function() {
		var m = this.$.scrollMath;
		return Math.min(Math.max(this.getScrollTop(), -1*m.topBoundary), -1*m.bottomBoundary);
	}
});

// FIXME: Webkit will change the scrollTop value of the scroller viewport to keep the current
// tab-focused control onscreen if we allow it to handle tabs itself, so we defeat native
// TAB focus movement here.
dispatcher.features.push(function(e) {
	if ((e.type == 'keydown') && (e.keyCode == 9)) {
		e.preventDefault();
	}
});

MoonScrollStrategy.Touch = kind({
	name: 'moon.TouchScrollStrategy',
	kind: TouchScrollStrategy,
	create: function () {
		TouchScrollStrategy.prototype.create.apply(this, arguments);
		if (!config.accelerate) {
			this.transform = false;
			this.accel = false;

			if(this.overscroll) {
				//so we can adjust top/left if browser can't handle translations
				this.$.client.applyStyle('position', 'relative');
			}
		}
	}
});

},{'../options':'moonstone/options','../PagingControl':'moonstone/PagingControl','../ScrollThumb':'moonstone/ScrollThumb'}],'moonstone/VideoTransportSlider':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/VideoTransportSlider~VideoTransportSlider} kind.
* @module moonstone/VideoTransportSlider
*/

require('moonstone');

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	ri = require('enyo/resolution'),
	Control = require('enyo/Control'),
	Popup = require('enyo/Popup');

var
	Spotlight = require('spotlight');

var
	DurationFmt = require('enyo-ilib/DurationFmt'),
	Locale = require('enyo-ilib/Locale');

var
	Slider = require('moonstone/Slider'),
	VideoFeedback = require('../VideoFeedback');

var
	$L = require('../i18n'),
	defaultKnobIncrement = '5%';

/**
* The parameter [object]{@glossary Object} used when displaying a {@link module:moonstone/VideoFeedback~VideoFeedback}
* control.
*
* @typedef {Object} module:moonstone/VideoTransportSlider~VideoTransportSlider~FeedbackParameterObject
* @property {Number} [playbackRate] - The playback rate.
* @property {Number} [jumpSize] - The jump size.
* @public
*/

/**
* Fires when user starts dragging the video position knob. No additional data is
* provided in this event.
*
* @event module:moonstone/VideoTransportSlider~VideoTransportSlider#onSeekStart
* @type {Object}
* @public
*/

/**
* Fires when user changes the video position by tapping the bar.
*
* @event module:moonstone/VideoTransportSlider~VideoTransportSlider#onSeek
* @type {Object}
* @property {Number} value - The position to seek to.
* @public
*/

/**
* Fires when user stops dragging the video position knob.
*
* @event module:moonstone/VideoTransportSlider~VideoTransportSlider#onSeekFinish
* @type {Object}
* @property {Number} value - The position to seek to.
* @public
*/

/**
* Fires when cursor enters the tap area.
* Note. this event will be deprecated and replaced with #onSpotlightFocused
*
* @event module:moonstone/VideoTransportSlider~VideoTransportSlider#onEnterTapArea
* @type {Object}
* @public
*/

/**
* Fires when cursor leaves the tap area.
* Note. this event will be deprecated and replaced with #onSpotlightBlur
*
* @event module:moonstone/VideoTransportSlider~VideoTransportSlider#onLeaveTapArea
* @type {Object}
* @public
*/

/**
* {@link module:moonstone/VideoTransportSlider~VideoTransportSlider} extends {@link module:moonstone/Slider~Slider}, adding specialized
* behavior related to video playback.
*
* ```javascript
* var VideoTransportSlider = require('moonstone/VideoTransportSlider');
*
* {kind: VideoTransportSlider, value: 30}
* ```
*
* The [onSeekStart]{@link module:moonstone/VideoTransportSlider~VideoTransportSlider#onSeekStart} event is fired while
* the control knob is being dragged, the
* [onSeekFinish]{@link module:moonstone/VideoTransportSlider~VideoTransportSlider#onSeekFinish} event is fired when the
* drag finishes, and the [onSeek]{@link module:moonstone/VideoTransportSlider~VideoTransportSlider#onSeek} event is fired
* when the position is set by tapping the bar.
*
* @class VideoTransportSlider
* @extends module:moonstone/Slider~Slider
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/VideoTransportSlider~VideoTransportSlider.prototype */ {

	/**
	* @private
	*/
	name: 'moon.VideoTransportSlider',

	/**
	* @private
	*/
	kind: Slider,

	/**
	* @private
	*/
	classes: 'moon-video-player-transport-slider',

	/**
	* @private
	* @lends module:moonstone/VideoTransportSlider~VideoTransportSlider.prototype
	*/
	published: {

		/**
		* Starting point of slider.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		rangeStart: 0,

		/**
		* Ending point of slider.
		*
		* @type {Number}
		* @default 100
		* @public
		*/
		rangeEnd: 100,

		/**
		* Controls the slider draw.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		syncTick: true,

		/**
		* When `true`, label is shown at the start and end positions.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		showTickText: true,

		/**
		* When `true`, progress may extend past the hour markers.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		liveMode: false,

		/**
		* CSS classes to apply to background progress bar.
		*
		* @type {String}
		* @default 'bg-bar'
		* @public
		*/
		bgBarClasses: 'bg-bar',

		/**
		* CSS classes to apply to progress bar.
		*
		* @type {String}
		* @default 'bar-bar'
		* @public
		*/
		barClasses: 'bar-bar',

		/**
		* CSS classes to apply to popup label.
		*
		* @type {String}
		* @default 'popup-label'
		* @public
		*/
		popupLabelClasses: 'popup-label',

		/**
		* CSS classes to apply to knob.
		*
		* @type {String}
		* @default 'knob'
		* @public
		*/
		knobClasses: 'knob',

		/**
		* Color of value popup
		*
		* @type {String}
		* @default '#fff'
		* @public
		*/
		popupColor: '#4B4B4B',

		/**
		* Popup offset in pixels.
		*
		* @type {Number}
		* @default 144 - controls height(132) + margin (12)
		* @public
		*/
		popupOffset: 144,

		/**
		* Threshold value (percentage) for using animation effect on slider progress change.
		*
		* @type {Number}
		* @default 1
		* @public
		*/
		smallVariation: 1,

		/**
		* Popup height in pixels.
		*
		* @type {Number}
		* @default 67
		* @public
		*/
		popupHeight: 48,

		/**
		* Sliders will increase or decrease as much as knobIncrement in either direction
		* when left or right key is pressed in 5-way mode.
		* If you'd like to use a specific value instead of a percentage,
		* specify the value in this property when you instantiate the VideoPlayer.
		*
		* @type {Number|String}
		* @default '5%'
		* @public
		*/
		knobIncrement: defaultKnobIncrement
	},

	/**
	* @private
	*/
	handlers: {
		onresize: 'handleResize',
		onSpotlightKeyDown: 'spotlightKeyDownHandler',
		onmove: 'preview'
	},

	/**
	* @private
	*/
	events: {
		onSeekStart: '',
		onSeek: '',
		onSeekFinish: '',
		onEnterTapArea: '',
		onLeaveTapArea: ''
	},

	/**
	* @private
	*/
	tickComponents: [
		{name: 'startWrapper', classes: 'indicator-wrapper start', components: [
			{name: 'beginTickText', classes: 'indicator-text left', content: '00:00'}
		]},
		{name: 'endWrapper', classes: 'indicator-wrapper end', components: [
			{name: 'endTickText', classes: 'indicator-text right', content: '00:00'}
		]}
	],

	/**
	* @private
	*/
	popupComponents: [
		{name: 'popup', kind: Popup, classes: 'moon-slider-popup above status-indicator', accessibilityDisabled: true, components: [
			{name: 'popupLabel', classes: 'moon-slider-popup-center' }
		]}
	],
	/**
	* @private
	*/
	popupLabelComponents: [
		{name: 'feedback', kind: VideoFeedback, showing:false},
		{name: 'popupLabelText', kind: Control}
	],

	/**
	* @private
	*/
	_previewMode: false,

	/**
	* @private
	*/
	_enterEnable: false,

	/**
	* @private
	*/
	createPopup: function () {
		this.createComponents(this.popupComponents);
	},

	/**
	* @private
	*/
	create: function () {
		Slider.prototype.create.apply(this, arguments);
		this.$.popup.setAutoDismiss(false);		//* Always showing popup
		this.$.popup.captureEvents = false;		//* Hot fix for bad originator on tap, drag ...

		//* Extend components
		this.createTickComponents();
		this.createPopupLabelComponents();
		this.showTickTextChanged();
		this.knobIncrementChanged();

		this.durfmt = new DurationFmt({length: 'medium', style: 'clock', useNative: false});
		this.$.beginTickText.setContent(this.formatTime(0));

		var loc = new Locale(),
			language = loc.getLanguage(),
			// Hash of languages and the additional % widths they'll need to not run off the edge.
			langWidths = {
				ja: 0.05,
				pt: 0.05,
				vi: 0.02
			};

		if (langWidths[language]) {
			//Todo. Instead of adjust begin or end postion, find proper way tpo conpensate language matter
			//move begin position to right as much as langWidths[language]
			//move end position to left as much as langWidths[language] );
		}
	},

	/**
	* Ugly to need to do this but avoid the overhead of calculations used wastefully by this
	* method in ProgressBar (not needed since this kind overloads the child components).
	*
	* @private
	*/
	drawToCanvas: function () {
		// nop
	},

	/**
	* @private
	*/
	createTickComponents: function () {
		this.createComponents(this.tickComponents, {owner: this, addBefore: this.$.knob});
	},

	/**
	* @private
	*/
	createPopupLabelComponents: function () {
		this.$.popupLabel.createComponents(this.popupLabelComponents, {owner: this});
		this.currentTime = 0;
	},

	/**
	* If user presses enter on `this.$.tapArea`, seeks to that point.
	*
	* @private
	*/
	spotlightKeyDownHandler: function (sender, e) {
		var val;
		if (this.tappable && !this.disabled && e.keyCode == 13) {
			this.set('knobSelected', true);
			this.startJob('simulateTapEnd', function () {
				this.set('knobSelected', false);
			}, 200);
			val = this.transformToVideo(this.knobPosValue);
			this.sendSeekEvent(val);
			this.set('_enterEnable', true);
			return true;
		}
	},

	/**
	* @private
	*/
	spotFocused: function (sender, e) {
		Slider.prototype.spotFocused.apply(this, arguments);
		if (!this.disabled) {
			this.spotSelect();
			// this.knobPosValue will be used for knob positioning.
			this.knobPosValue = this.get('value');
			// Todo: visible does not mean slider is visible. it means knob is visible
			// we'd better change its name to preview or more intuitive name
			this.addClass('visible');
			//fires enyo.VideoTransportSlider#onEnterTapArea
			this.doEnterTapArea();
		}

		// if slider is in preview mode, preview() will update knobPosition
		if (!Spotlight.getPointerMode()) {
			this._updateKnobPosition(this.knobPosValue);
		}
		this.startPreview();
	},

	/**
	* @private
	*/
	spotSelect: function () {
		this.selected = true;
		return true;
	},

	/**
	* @private
	*/
	spotBlur: function () {
		this.set('_enterEnable', false);
		this.selected = false;
		this.removeClass('visible');
		this.endPreview();
		//fires enyo.VideoTransportSlider#onLeaveTapArea
		this.doLeaveTapArea();
	},

	/**
	* @private
	*/
	spotLeft: function (sender, e) {
		if (this.selected && this.knobPosValue > this.min) {
			// If in the process of animating, work from the previously set value
			var v = this.clampValue(this.min, this.max, this.knobPosValue || this.getValue());
			v = (v - this._knobIncrement < this.min) ? this.min : v - this._knobIncrement;
			this._updateKnobPosition(v);
			this.set('knobPosValue', v);
			this.set('_enterEnable', false);
		}
		return true;
	},

	/**
	* @private
	*/
	spotRight: function (sender, e) {
		if (this.selected && this.knobPosValue < this.max - 1) {
			var value = (typeof this.knobPosValue != 'undefined') ? this.knobPosValue : this.getValue(),
				v = this.clampValue(this.min, this.max, value);
			v = (v + this._knobIncrement > this.max) ? this.max - 1 : v + this._knobIncrement;
			this._updateKnobPosition(v);
			this.set('knobPosValue', v);
			this.set('_enterEnable', false);
		}
		return true;
	},

	/**
	* @private
	*/
	knobIncrementChanged: function () {
		var increment = this.knobIncrement || defaultKnobIncrement;

		if (typeof increment == 'number' && increment > 0) {
			this._knobIncrement = increment;
		} else {
			if (typeof increment != 'string' || increment.charAt(increment.length - 1) != '%') {
				increment = defaultKnobIncrement;
			}
			this._knobIncrement = (this.max - this.min) * increment.substr(0, increment.length - 1) / 100;
		}
	},

	/**
	* onmove event handler. When mouse moves on slider, it will update knob's position
	*
	* @private
	*/
	preview: function (sender, e) {
		if (!this.disabled && !this.dragging) {
			if (!this._previewMode) {
				this.startPreview();
			}
			var v = this.knobPosValue = this.calcKnobPosition(e);
			this.currentTime = this.transformToVideo(v);
			this._updateKnobPosition(this.currentTime);
		}
	},

	/**
	* @private
	*/
	startPreview: function (sender, e) {
		this._previewMode = true;
		this.$.feedback.setShowing(false);
	},

	/**
	* @private
	*/
	endPreview: function (sender, e) {
		this._previewMode = false;
		this.updatePopupLabel(this.value);
		if (this.$.feedback.isPersistShowing()) {
			this.$.feedback.setShowing(true);
		}
	},

	/**
	* @private
	*/
	isInPreview: function (sender, e) {
		return this._previewMode;
	},

	/**
	* @private
	*/
	handleResize: function () {
		Slider.prototype.handleResize.apply(this, arguments);
		this.updateSliderRange();
	},

	/**
	* @private
	*/
	updateSliderRange: function () {
		this.setRangeStart(this.min);
		this.setRangeEnd(this.max);

		if (this.dragging || !this.isInPreview()) {
			this._updateKnobPosition(this.value);
		}
	},

	/**
	* @private
	*/
	setMin: function () {
		Slider.prototype.setMin.apply(this, arguments);
		this.knobIncrementChanged();
		this.updateSliderRange();
	},

	/**
	* @private
	*/
	setMax: function () {
		Slider.prototype.setMax.apply(this, arguments);
		this.knobIncrementChanged();
		this.updateSliderRange();
	},

	/**
	* @private
	*/
	setRangeStart: function (val) {
		this.rangeStart = this.clampValue(this.getMin(), this.getMax(), val);
		this.rangeStartChanged();
	},

	/**
	* @private
	*/
	setRangeEnd: function (val) {
		this.rangeEnd = this.clampValue(this.getMin(), this.getMax(), val);
		this.rangeEndChanged();
	},

	/**
	* @private
	*/
	knobSelectedChanged: function () {
		Slider.prototype.knobSelectedChanged.apply(this, arguments);
		this.addRemoveClass('pressed', this.knobSelected);
	},

	/**
	* @private
	*/
	showTickTextChanged: function () {
		this.$.beginTickText.setShowing(this.getShowTickText());
		this.$.endTickText.setShowing(this.getShowTickText());
	},

	/**
	* @private
	*/
	rangeStartChanged: function () {
		this.updateInternalProperty();
		var p = this._calcPercent(this.rangeStart),
			property = 'margin-left';
		if (this.liveMode) {
			property = 'padding-left';
		}
		this.$.bar.applyStyle(property, p + '%');
		this.$.bgbar.applyStyle(property, p + '%');
	},

	/**
	* @private
	*/
	rangeEndChanged: function () {
		this.updateInternalProperty();
	},

	/**
	* @private
	*/
	updateInternalProperty: function () {
		this.updateScale();
		this.progressChanged();
		this.bgProgressChanged();
	},
	//* Sets value of hidden variable, _scaleFactor_.
	updateScale: function () {
		this.scaleFactor = (this.rangeEnd-this.rangeStart)/(this.max-this.min);
	},

	/**
	* @private
	*/
	calcPercent: function (val) {
		return (this.calcRatio(val) * 100) * this.scaleFactor;
	},

	/**
	* @private
	*/
	_calcPercent: function (val) {
		return this.calcRatio(val) * 100;
	},

	/**
	* @private
	*/
	calcVariationRatio: function (val, currentVal) {
		return (val - currentVal) / (this.max - this.min);
	},

	/**
	* @private
	*/
	calcVariationPercent: function (val, currentVal) {
		return this.calcVariationRatio(val, currentVal) * 100;
	},

	/**
	* Override Slider.updateKnobPosition to only update the popupLabelText
	*
	* @private
	*/
	updateKnobPosition: function (val) {
		if (this.dragging) {
			this.updatePopupLabel(this.currentTime);
		} else if (!this.isInPreview()) {
			this.updatePopupLabel(val);
		}
	},

	/**
	* Calculate slider knob's position and apply it.
	*
	* @private
	*/
	_updateKnobPosition: function (val) {
		// If knob is visible, we need update its current position
		if (this.hasClass('visible')) {
			var p = this.clampValue(this.min, this.max, val);
			p = this._calcPercent(p);
			var slider = this.inverseToSlider(p);
			this.$.knob.applyStyle('left', slider + '%');
		}

		this.updatePopupLabel(val);
	},

	/**
	* Override default behavior
	*
	* @private
	*/
	updatePopupLabel: function (timeVal) {
		if (Spotlight.getCurrent() === this) {
			this.$.popupLabelText.setContent(this.formatTime(timeVal));
		} else if (this.currentTime !== undefined) {
			this.$.popupLabelText.setContent(this.formatTime(this.currentTime));
		}
	},

	/**
	* @private
	*/
	inverseToSlider: function (percent) {
		var val = this.scaleFactor * percent + this._calcPercent(this.rangeStart);
		return val;
	},

	/**
	* @private
	*/
	transformToVideo: function (val) {
		val = this.clampValue(this.getMin(), this.getMax(), val);
		return (val - this.rangeStart) / this.scaleFactor;
	},

	/**
	* If user presses `slider`, seeks to that point.
	*
	* @private
	*/
	tap: function (sender, e) {
		var val;
		if (this.tappable && !this.disabled) {
			val = this.transformToVideo(this.calcKnobPosition(e));
			this.sendSeekEvent(val);
			return true;
		}
	},

	/**
	* @private
	*/
	setValue: function (val) {
		this.currentTime = val;
		if (Math.abs(this.calcVariationPercent(val, this.value)) > this.smallVariation ||
			this.calcVariationPercent(this.max, val) < this.smallVariation) {
			Slider.prototype.setValue.apply(this, arguments);
		} else {
			this._setValue(val);
		}
		this._updateBeginText(val);
	},

	/**
	* @private
	*/
	_updateBeginText: function (val) {
		var v = this.clampValue(this.min, this.max, val);
		this.$.beginTickText.setContent(this.formatTime(v));
	},

	/**
	* If `dragstart`, bubbles [onSeekStart]{@link module:moonstone/VideoTransportSlider~VideoTransportSlider#onSeekStart}
	* event.
	*
	* @fires module:moonstone/VideoTransportSlider~VideoTransportSlider#onSeekStart
	* @private
	*/
	dragstart: function (sender, e) {
		if (this.disabled) {
			return; // return nothing
		}

		// the call to the super class freezes spotlight, so it needs to be unfrozen in dragfinish
		var dragstart = Slider.prototype.dragstart.apply(this, arguments);
		if (dragstart) {
			this.doSeekStart();
		}

		return true;
	},

	/**
	* If `drag`, bubbles [onSeek]{@link module:moonstone/VideoTransportSlider~VideoTransportSlider#onSeek} event and
	* overrides parent `drag` handler.
	*
	* @private
	*/
	drag: function (sender, e) {
		if (this.dragging) {
			var v = this.calcKnobPosition(e);

			//* Default behavior to support elastic effect
			v = this.transformToVideo(v);
			if (this.constrainToBgProgress === true) {
				v = (this.increment) ? this.calcConstrainedIncrement(v) : v;
				var ev = this.bgProgress + (v-this.bgProgress)*0.4;
				v = this.clampValue(this.min, this.bgProgress, v);
				this.elasticFrom = (this.elasticEffect === false || this.bgProgress > v) ? v : ev;
				this.elasticTo = v;
			} else {
				v = (this.increment) ? this.calcIncrement(v) : v;
				v = this.clampValue(this.min, this.max, v);
				this.elasticFrom = this.elasticTo = v;
			}
			this.currentTime = v;
			this._updateKnobPosition(this.elasticFrom);

			if (this.lockBar) {
				this.setProgress(this.elasticFrom);
				this.sendChangingEvent({value: this.elasticFrom});
				this.sendSeekEvent(this.elasticFrom);
			}
			return true;
		}
	},

	/**
	* @private
	*/
	dragfinish: function (sender, e) {
		if (this.disabled) {
			return;
		}
		this.cleanUpDrag(e);
		e.preventTap();
		return true;
	},

	/**
	* @fires module:moonstone/VideoTransportSlider~VideoTransportSlider#onSeekFinish
	* @private
	*/
	cleanUpDrag: function (ev) {
		var v, z;
		if (this.get('dragging')) {
			if (ev) {
				v = this.calcKnobPosition(ev);
				v = this.transformToVideo(v);
			} else { // use the last known-good time value (i.e. from the last drag event)
				v = this.currentTime;
			}
			z = this.elasticTo;
			if (this.constrainToBgProgress === true) {
				z = (this.increment) ? this.calcConstrainedIncrement(z) : z;
				this.animateTo(this.elasticFrom, z);
				v = z;
			} else {
				v = (this.increment) ? this.calcIncrement(v) : v;
				this._setValue(v);
			}
			this.doSeekFinish({value: v});
			Spotlight.unfreeze();

			this.endPreview();

			this.$.knob.removeClass('active');
			this.set('dragging', false);
		}
	},

	/**
	* @private
	*/
	showingChangedHandler: function (sender, ev) {
		Slider.prototype.showingChangedHandler.apply(this, arguments);
		if (!ev.showing) {
			this.cleanUpDrag(); // clean-up any in-progress drags, if we (or an ancestor) is hidden
		}
	},

	/**
	* Sends [onSeek]{@link module:moonstone/VideoTransportSlider~VideoTransportSlider#onSeek} event.
	*
	* @fires module:moonstone/VideoTransportSlider~VideoTransportSlider#onSeek
	* @private
	*/
	sendSeekEvent: function (val) {
		this.doSeek({value: val});
	},

	/**
	* During time update, updates buffered progress, canvas and video currentTime
	*
	* @private
	*/
	timeUpdate: function (val) {
		if (!this.dragging && this.isInPreview()) { return; }
		this.currentTime = val;
	},

	/**
	* @private
	*/
	durationUpdate: function (val) {
		this.duration = val;
		this.$.endTickText.setContent(this.formatTime(this.duration));
	},

	/**
	* Properly formats time.
	*
	* @private
	*/
	formatTime: function (val) {
		var hour = Math.floor(val / (60*60));
		var min = Math.floor((val / 60) % 60);
		var sec = Math.floor(val % 60);
		var time = {minute: min, second: sec};
		if (hour) {
			time.hour = hour;
		}
		return this.durfmt.format(time);
	},

	/**
	* Time formatting helper.
	*
	* @private
	*/
	padDigit: function (val) {
		return (val) ? (String(val).length < 2) ? '0'+val : val : '00';
	},

	/**
	* Sends current status to [feedback]{@link module:moonstone/VideoFeedback~VideoFeedback} control in response to
	* user input.
	*
	* @param {String} msg - The string to display.
	* @param {module:moonstone/VideoTransportSlider~VideoTransportSlider~FeedbackParameterObject} params - A
	*	[hash]{@glossary Object} of parameters that accompany the message.
	* @param {Boolean} persist - If `true`, the [feedback]{@link module:moonstone/VideoFeedback~VideoFeedback} control will
	*	not be automatically hidden.
	* @param {String} leftSrc - The source url for the image displayed on the left side of
	*	the feedback control.
	* @param {String} rightSrc - The source url for the image displayed on the right side
	*	of the feedback control.
	* @public
	*/
	feedback: function (msg, params, persist, leftSrc, rightSrc) {
		this.showKnobStatus();
		this.$.feedback.feedback(msg, params, persist, leftSrc, rightSrc, this.isInPreview());
	},

	/**
	* Override of [updatePopup]{@link module:moonstone/ProgressBar~ProgressBar#updatePopup}
	* this method is called when progess updated but from Slider, we use value instead of progress
	*
	* @private
	*/
	updatePopup: function (val) {
		return true;
	},

	/**
	* @private
	*/
	updatePopupHeight: function () {
		var h = this.getPopupHeight();
		this.$.popupLabel.applyStyle('height', dom.unit(ri.scale(h), 'rem'));
	},

	/**
	* @private
	*/
	updatePopupOffset: function () {
		this.$.popup.applyStyle('top', dom.unit(-(ri.scale(this.getPopupHeight() + this.getPopupOffset())), 'rem'));
	},

	// Accessibility

	/**
	* When `true`, VoiceReadout will be prevented.
	*
	* @default true
	* @type {Boolean}
	* @public
	*/
	accessibilityDisabled: true,

	/**
	* @private
	*/
	ariaObservers: [
		{path: 'selected', method: function() {
			if (this.selected) {
				this.set('accessibilityRole', 'slider');
				this.set('accessibilityLive', null);
				this.set('accessibilityHint', null);
			} else {
				this.setAriaAttribute('aria-valuetext', null);
			}
		}},
		{path: ['$.popupLabelText.content', '_enterEnable'], method: 'ariaValue'}
	],

	/**
	* Overriding {@link module:moonstone/ProgressBar~ProgressBar#ariaValue} to guard updating value
	* when dragging.
	*
	* @private
	*/
	ariaValue: function () {
		var valueText;
		if (this.showing && !Spotlight.getPointerMode() && this.$.popupLabelText && this.$.popupLabelText.content && this.selected) {
			valueText = this._enterEnable ? this.$.popupLabelText.content : $L('jump to ') + this.$.popupLabelText.content;
			// Screen reader should read valueText when slider is only spotlight focused, but there is a timing issue between spotlight focus and observed
			// popupLabelText's content, so Screen reader reads valueText twice. We added below timer code for preventing this issue.
			setTimeout(this.bindSafely(function(){
				this.set('accessibilityDisabled', false);
				this.setAriaAttribute('aria-valuetext', valueText);
			}), 0);
		} else {
			this.set('accessibilityDisabled', true);
		}
	}
});

},{'../VideoFeedback':'moonstone/VideoFeedback','../i18n':'moonstone/i18n'}],'moonstone/Calendar':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Calendar~Calendar} kind.
* @deprecated Since 2.6
* @module moonstone/Calendar
*/

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	Control = require('enyo/Control'),
	Group = require('enyo/Group');

var
	ilib = require('enyo-ilib'),
	calendarFactory = require('enyo-ilib/CalendarFactory'),
	dateFactory = require('enyo-ilib/DateFactory'),
	DateFmt = require('enyo-ilib/DateFmt'),
	LocaleInfo = require('enyo-ilib/LocaleInfo');

var
	SimplePicker = require('../SimplePicker');

/**
* Fires when a date is selected. No additional data is passed in this event.
*
* @event module:moonstone/Calendar~CalendarDate#onDateSelected
* @type {Object}
* @public
*/

/**
* Fires when [value]{@link module:moonstone/Calendar~Calendar#value} changes.
*
* @event module:moonstone/Calendar~Calendar#onChange
* @type {Object}
* @property {Date} value - A standard JavaScript {@glossary Date} object
* @public
*/

/**
* {@link module:moonstone/Calendar~CalendarDate} implements a control representing a single day, used by
* the monthly calendar kind {@link module:moonstone/Calendar~Calendar}.
*
* @class CalendarDate
* @extends module:enyo/Control~Control
* @ui
* @deprecated Since 2.6
* @public
*/
var CalendarDate = kind(
	/** @lends module:moonstone/Calendar~CalendarDate.prototype */ {

	/**
	* @private
	*/
	name: 'moon.CalendarDate',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	* @lends module:moonstone/Calendar~CalendarDate.prototype
	*/
	published: {

		/**
		* {@glossary Date} object
		*
		* @type {Date}
		* @default null
		* @public
		*/
		value: null,

		/**
		* Whether this date's coloring should be different from normal.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		color: false,

		/**
		* Used when the CalendarDate is part of an {@link module:enyo/Group~Group}.
		* A value of `true` indicates that this is the active button of the group;
		* `false`, that it is not the active button.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		active: false
	},

	/**
	* @private
	*/
	events: {
		onDateSelected:''
	},

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	*/
	small: true,

	/**
	* @private
	*/
	marquee: false,

	/**
	* @private
	*/
	minWidth: false,

	/**
	* @private
	*/
	classes: 'moon-calendar-picker-date enyo-unselectable',

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		if (arguments.length > 0 && typeof(arguments[0].formatter) !== 'undefined') {
			// re-use this formatter to avoid creating a new one for each calendar date instance
			this._dateFmt = arguments[0].formatter;
		}
	},

	/**
	* @private
	*/
	colorChanged: function () {
		this.addRemoveClass('moon-calendar-picker-date-shadow', this.color);
	},

	/**
	* @private
	*/
	valueChanged: function () {
		if (this.value) {
			this.localeValue = dateFactory({
				unixtime: this.value.getTime(),
				timezone: 'local'
			});
			this.setContent(this._dateFmt.format(this.localeValue));
		}
	},

	/**
	* Allows the same formatter to be shared across all calendar date instances,
	* which is more efficient than having each one make its own formatter.
	* @private
	*/
	setDateFormatter: function (formatter) {
		this._dateFmt = formatter;		// need to recreate the local value because
		// the new locale may have a different time
		// zone or calendar, so the date components
		// (year/month/day) may be different than before
		this.valueChanged();
	},

	/**
	* @private
	* @fires module:moonstone/Calendar~CalendarDate#onDateSelected
	*/
	tap: function () {
		this.doDateSelected();
	}
});

/**
* {@link module:moonstone/Calendar~SimpleMonthPicker} implements a month picker
* control with support for internationalized months. This picker is used by the
* monthly calendar kind {@link module:moonstone/Calendar~Calendar}.
*
* @class SimpleMonthPicker
* @extends module:moonstone/SimplePicker~SimplePicker
* @ui
* @deprecated Since 2.6
* @public
*/
var SimpleMonthPicker = kind(
	/** @lends module:moonstone/Calendar~SimpleMonthPicker.prototype */ {

	/**
	* @private
	*/
	name: 'moon.SimpleMonthPicker',

	/**
	* @private
	*/
	kind: SimplePicker,

	/**
	* @private
	*/
	published: /** @lends module:moonstone/Calendar~SimpleMonthPicker.prototype */ {

		/**
		* The number of months to show. A few international calendars have more than
		* 12 months in some years, but we default to the Gregorian calendar's value
		* of 12.
		*
		* @type {Number}
		* @default 12
		* @public
		*/
		months: 12
	},

	/**
	* Shows/hides previous/next buttons based on current index.
	*
	* @private
	* @override
	*/
	showHideNavButtons: function() {
		var index = this.getSelectedIndex(),
			maxIndex = Math.max(this.months, this.getClientControls().filter(function(val, idx, arr) { return val.content; }).length) - 1;
		var prevButton = this.rtl ? this.$.buttonRight : this.$.buttonLeft;
		var nextButton = this.rtl ? this.$.buttonLeft : this.$.buttonRight;

		if (this.disabled) {
			this.hideNavButton(prevButton);
			this.hideNavButton(nextButton);
		// Always show buttons if _this.wrap_ is _true_
		} else if (this.wrap) {
			this.showNavButton(prevButton);
			this.showNavButton(nextButton);
		// If we have one or less options, always show no buttons
		} else if (maxIndex <= 0) {
			this.hideNavButton(prevButton);
			this.hideNavButton(nextButton);
		// If we are on the first option, hide the left button
		} else if (index <= 0) {
			this.showNavButton(nextButton);
			this.hideNavButton(prevButton);
		// If we are on the last item, hide the right button
		} else if (index >= maxIndex) {
			this.showNavButton(prevButton);
			this.hideNavButton(nextButton);
		// Otherwise show both buttons
		} else {
			this.showNavButton(prevButton);
			this.showNavButton(nextButton);
		}
	},

	/**
	* Cycles the selected item to the one after the currently selected item.
	* Make sure not to cycle past the last month in the picker for this
	* calendar.
	*
	* @public
	* @override
	*/
	next: function(sender, e) {
		if (!this.disabled) {
			var idx = this.selectedIndex + 1;
			var max = Math.min(this.getClientControls().length, this.months);
			if (idx > max - 1) {
				idx = this.wrap ? 0 : max - 1;
			}
			if (!this.wrap && idx === max - 1
				&& e && e.cancelHoldPulse) {
				e.cancelHoldPulse();
			}
			this.setSelectedIndex(idx);
		}
	}

});

/**
* THIS KIND IS DEPRECATED.
* {@link module:moonstone/Calendar~Calendar} is a control that displays a monthly calendar, with the
* month name at the top and a grid of days, grouped into rows by week, below.
*
* The header buttons are used to navigate to the desired month; the desired day
* is selected by tapping on it.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Calendar = require('moonstone/Calendar');
*
* 	{kind: Calendar, content: 'Calendar Title'}
* ```
*
* @deprecated Since 2.6
* @class Calendar
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Calendar~Calendar.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Calendar',


	/**
	* @private
	* @lends module:moonstone/Calendar~Calendar.prototype
	*/
	published: {

		/**
		*
		* Current locale used for formatting. May be set after the control is
		* created, in which case the control will be updated to reflect the
		* new value.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		locale: '',

		/**
		*
		* The current {@glossary Date} object.
		*
		* @type {Date}
		* @default null
		* @public
		*/
		value: null,

		/**
		*
		* The first day of the week in the current locale.
		* Valid values are `0` (i.e., Sunday) through `6` (Saturday). Default is `0`.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		firstDayOfWeek: 0,

		/**
		*
		* Maximum number of weeks to display on a screen.
		* If this value is greater than `9`, dates two months in the future may be
		* shown. Unexpected input may result in errors.
		*
		* @type {Number}
		* @default 6
		* @public
		*/
		maxWeeks: 6,

		/**
		*
		* Start value for range of years displayed in year picker.
		*
		* @type {Number}
		* @default 1900
		* @public
		*/
		startYear: 1900,

		/**
		*
		* End value for range of years displayed in year picker.
		*
		* @type {Number}
		* @default 2200
		* @public
		*/
		endYear: 2200,

		/**
		* When `true`, the days will have locale-safe uppercasing applied.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		uppercaseDays: true,

		/**
		*
		* CSS classes used to decorate day labels (e.g., `'moon-divider'`).
		*
		* @type {String}
		* @default ''
		* @public
		*/
		dayOfWeekClasses: '',

		/**
		*
		* Length of abbreviation to use for day of the week.
		* Accepted values are `'short'`, `'medium'`, `'long'`, and `'full'`.
		* You may also use the first character of the desired value, since
		* [iLib]{@glossary ilib} stores the first character only.
		*
		* @type {String}
		* @default 'short' || 's'
		* @public
		*/
		dayOfWeekLength: 's'	//short
	},

	/**
	* @private
	*/
	events: {
		/**
			Fires when the date changes.

			`inEvent.value` contains a standard JavaScript Date object representing
			the current date.
		*/
		onChange: ''
	},

	/**
	* @private
	*/
	months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

	/**
	* @private
	*/
	days: ['S','M','T','W','T','F','S'],

	/**
	* @private
	*/
	classes: 'moon-calendar-picker',

	/**
	* @private
	*/
	components: [
		{name: 'monthPicker', kind: SimpleMonthPicker, classes: 'moon-calendar-picker-month', onChange: 'selectMonthPicker'},
		{name: 'yearPicker', kind: SimplePicker, classes: 'moon-calendar-picker-year', onChange: 'selectYearPicker'},
		{name: 'days', classes: 'moon-calendar-picker-days moon-neutral', kind: Group},
		{name: 'dates', kind: Group}
	],

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.initCalendar();
		this.set('value', this.value || new Date(), true);
		this.setLocale(new LocaleInfo().locale);
	},

	/**
	* Creates picker contents with default `(en-US)` values.
	*
	* @private
	*/
	initCalendar: function () {
		var i;
		var startYear = this.getStartYear(),
			endYear = this.getEndYear(),
			// Create 13 months components in the month picker to take care of
			// the Hebrew calendar, but only show the last month in those Hebrew
			// years that actually have 13 months
			numberOfMonths = 13;

		this.cal = calendarFactory();
		this.localeValue = dateFactory({timezone: 'local'});
		this._dateFmt = new DateFmt({
			type: 'date',	// only format the date component, not the time
			date: 'd',		// 'd' is the date of month
			useNative: false,
			length: 'short',	//it uses 2 chars to abbreviate properly
			timezone: 'local'
		});

		//Populates SimplePicker with years.
		for (i = startYear; i <= endYear; i++) {
			this.$.yearPicker.createComponent({content: i, classes: 'picker-content'});
		}
		//Populates SimplePicker with months of the year, from JAN to DEC.
		var months = this.months;
		for (i = 0; i < numberOfMonths; i++) {
			this.$.monthPicker.createComponent({content: months[i], classes: 'picker-content'});
		}
		//Initializes days of the week. SUN is the first and SAT is the last.
		for(i = 0; i < 7; i++) {
			this.$.days.createComponent({
				content: this.days[i],
				classes: 'moon-calendar-picker-day-base ' + (this.dayOfWeekClasses || 'moon-calendar-picker-day'),
				disabled: true
			});
		}
		//Populates Calendar with CalendarDate objects.
		if (!this.$.dates.controls.length) {
			for (i = 1; i <= this.maxWeeks * 7; i++) {
				this.$.dates.createComponent({
					kind: CalendarDate,
					onDateSelected:'selectDate',
					formatter: this._dateFmt
				}, {owner:this});
			}
		}
	},

	/**
	* According to the value, adjusts the year bounds and updates the year picker.
	*
	* @private
	*/
	adjustYearBounds: function(){
		var i, yearDiff,
			count = this.$.yearPicker.getClientControls().length,
			year = this.value instanceof Date ? this.value.getFullYear() : this.startYear;

		this.startYear = year < this.startYear ? year : this.startYear;
		this.endYear = year > this.endYear ? year : this.endYear;
		yearDiff = this.endYear - this.startYear;
		if(count <= yearDiff){
			for(i = count; i <= yearDiff; i++) {
				this.$.yearPicker.createComponent({classes: 'picker-content'});
			}
			this.updateYearPicker();
			this.$.yearPicker.render();
		}
	},

	/**
	 * Calculates the start year in the current calendar.
	 *
	 * @private
	 */
	getStartYear: function() {
		var greg = dateFactory({
			type: "gregorian",
			year: this.startYear,
			month: 1,
			day: 1,
			timezone: 'local'
		});
		var localCalendarDate = dateFactory({
			julianday: greg.getJulianDay(),
			timezone: "local"
		});
		return localCalendarDate.getYears();
	},

	/**
	 * Calculates the end year in the current calendar.
	 *
	 * @private
	 */
	getEndYear: function() {
		var greg = dateFactory({
			type: "gregorian",
			year: this.endYear,
			month: 1,
			day: 1,
			timezone: 'local'
		});
		var localCalendarDate = dateFactory({
			julianday: greg.getJulianDay(),
			timezone: "local"
		});
		return localCalendarDate.getYears();
	},

	/**
	* Sets locale to value passed in at Calendar instantiation time, sending
	* appropriate notifications.
	*
	* @fires module:moonstone/Calendar~Calendar#onChange
	* @private
	*/
	localeChanged: function () {
		ilib.setLocale(this.locale);
		// the new locale may use a different calendar,
		// so redo the local date in that new calendar
		// The this.value does not change, but the local date does.
		this.localeValue = dateFactory({
			unixtime: this.value.getTime(),
			timezone: 'local'
		});

		this._monthFmt = undefined; // force it to recreate the formatter
		this._dayFmt = undefined;
		this.calendarChanged();
		this.firstDayOfWeek = -1; // Force change handler when locale changes
		this.setFirstDayOfWeek(new LocaleInfo(this.locale).getFirstDayOfWeek());

		// notify each date instance as well
		var dates = this.$.dates.getControls();
		this._dateFmt = new DateFmt({
			type: 'date',	// only format the date component, not the time
			date: 'd',		// 'd' is the date of month
			useNative: false,
			length: 's',	//"short" uses 2 chars to abbreviate properly
			timezone: 'local'
		});
		for (var i = 0; i < this.$.dates.controls.length; i++) {
			dates[i].setDateFormatter(this._dateFmt);
		}
		this.updateYearPicker();
		this.updateMonthPicker();
		this.setDayOfWeekLength(this._dateFmt.length);
		this.doChange({value: this.value});
	},

	/**
	* Sometimes the first day of week changes because of a locale change.
	* When this happens, we destroy the day label and reconstruct it.
	* We create a new `ilib.Date` instance with the time of the given day, and
	* get a Gregorian date instance that represents the first day of the week.
	*
	* @private
	*/
	firstDayOfWeekChanged: function () {
		this.updateDays();
		this.updateDates();
	},

	/**
	* We were previously relying on a non-guaranteed ordering of calls (change handlers
	* on bindings, transformation of binding values) to perform validation on the
	* Date value before updating a control with this value. Though this ordering was
	* non-guaranteed, it has since changed and can possibly affect any code that is
	* improperly relying on the specific ordering of these calls. We instead handle the
	* validation in the generic setter and facade this via the `setValue()` method.
	*
	* @private
	*/
	setValue: function (inValue) {
		this.set('value', inValue);
	},

	/**
	* @method
	* @private
	*/
	set: function (path, value) {
		if (path == 'value') {
			if(isNaN(value) || value === null) {
				value = new Date();
			}
		}
		Control.prototype.set.apply(this, arguments);
	},

	/**
	* @fires module:moonstone/Calendar~Calendar#onChange
	* @private
	*/
	valueChanged: function (inOld) {
		var month, year;
		this.localeValue = dateFactory({
			unixtime: this.value.getTime(),
			timezone: 'local'
		});
		month = this.localeValue.getMonths() - 1;
		year = this.localeValue.getYears();
		this.adjustYearBounds();
		if (!this.generated || this.$.monthPicker.getSelectedIndex() != month) {
			this.$.monthPicker.setSelectedIndex(month);
		}
		if (!this.generated || this.$.yearPicker.getSelected().getContent() != year) {
			this.$.yearPicker.setSelectedIndex(year - this.getStartYear());
		}
		this.updateDates();
		if (this.value) {
			this.doChange({value: this.value});
		}
	},

	/**
	* Updates year picker.
	*
	* @private
	*/
	updateYearPicker: function () {
		var i, l,
			yearPickerControls = this.$.yearPicker.getClientControls(),
			startYear = this.getStartYear(),
			endYear = this.getEndYear();
		for (i = 0, l = endYear - startYear; i <= l; i++) {
			yearPickerControls[i].setContent(i + startYear);
		}
		var year = this.localeValue.getYears();
		this.$.yearPicker.setSelectedIndex(year - this.getStartYear());
	},

	/**
	* Updates month name displayed in month picker.
	*
	* @private
	*/
	updateMonthPicker: function () {
		var month;
		if (typeof(this._monthFmt) === 'undefined') {
			this._monthFmt = new DateFmt({
				locale: this.locale,
				type: 'date',	//only format the date component, not the time
				date: 'm',		//'m' is the month of year
				useNative: false,
				length: 'long'
			});
		}
		var numberOfMonths = this.cal.getNumMonths(this.localeValue.getYears());
		var monthPickerControls = this.$.monthPicker.getClientControls();

		// show the 13th month for those calendars that use it, and only in those
		// years that use it
		this.$.monthPicker.setMonths(numberOfMonths);

		// this depends on the year because some calendars have 12 or 13 months,
		// depending on which year it is
		var monthNames = this._monthFmt.getMonthsOfYear({
			year: this.localeValue.getYears(),
			length: 'long'
		});
		for (var i = 0; i < monthNames.length - 1; i++) {
			monthPickerControls[i].setContent(monthNames[i+1]);
		}
		month = this.localeValue.getMonths() - 1;
		this.$.monthPicker.setSelectedIndex(month);
	},

	/**
	* Updates days of the week from first day to last day.
	* A `'0'` value for `this.firstDayOfweek` means Sunday and `'1'` means Monday.
	*
	* @private
	*/
	updateDays: function () {
		if (typeof(this._dayFmt) === 'undefined' && ilib) {
			this._dayFmt = new DateFmt({
				type: 'date',	//only format the date component, not the time
				date: 'w',		//'w' is the day of the week
				useNative: false,
				length: this.dayOfWeekLength,
				locale: this.locale
			});
		}

		var daysControls = this.$.days.getClientControls(),
			daysOfWeek = this._dayFmt.getDaysOfWeek(),
			dayOfWeek;
		for(var i = 0; i < 7; i++) {
			dayOfWeek = (this.firstDayOfWeek + i) % 7;
			daysControls[i].setContent(this.get('uppercaseDays') ? util.toUpperCase(daysOfWeek[dayOfWeek]) : daysOfWeek[dayOfWeek]);
		}
	},

	/**
	* Sets up first week of this month.
	* Before the first day of this month, days from the previous month will be
	* used to fill the calendar.
	*
	* @private
	*/
	updatePrevMonth: function () {
		var dates,
			i,
			// get the first of this month
			dt = dateFactory({
				year: this.localeValue.getYears(),
				month: this.localeValue.getMonths(),
				day: 1,
				timezone: 'local'
			});

		// find the week-start day on or before the first of the month
		var sunday = dt.onOrBefore(this.firstDayOfWeek);

		// if the sunday is before the current date
		var sunJD = sunday.getJulianDay();
		var daysBefore = Math.floor(dt.getJulianDay() - sunJD);
		if (daysBefore > 0) {
			dates = this.$.dates.getControls();
			var temp;
			for (i = 0; i <= daysBefore; i++) {
				temp = dateFactory({
					julianday: sunJD + i,
					timezone: 'local'
				});
				dates[i].setValue(temp.getJSDate());
				dates[i].setColor(true);
			}
			return daysBefore;
		}
		return 0;
	},

	/**
	* Sets up last week of this month.
	* After the last day of this month, days from the next month will be used to
	* fill the calendar.
	*
	* @private
	*/
	updateNextMonth: function (datesOfPrevMonth, monthLength) {
		var startIndex = datesOfPrevMonth + monthLength,
			dates = this.$.dates.getControls(),
			i;

		var lastDay = dateFactory({
			year: this.localeValue.getYears(),
			month: this.localeValue.getMonths(),
			day: monthLength,
			timezone: 'local'
		});

		// get the first day of the next month
		var jd = lastDay.getJulianDay() + 1;
		var temp;
		for (i = 0; i < this.$.dates.controls.length - startIndex; i++) {
			temp = dateFactory({
				julianday: jd + i,
				timezone: 'local'
			});
			dates[startIndex + i].setValue(temp.getJSDate());
			dates[startIndex + i].setColor(true);
		}
	},

	/**
	* @private
	*/
	updateDates: function () {
		var datesOfPrevMonth = this.updatePrevMonth(),
			thisYear = this.localeValue.getYears(),
			thisMonth = this.localeValue.getMonths(),
			monthLength = this.getMonthLength(thisYear, thisMonth),
			dates = this.$.dates.getControls(),
			temp,
			i;

		for (i = 0; i < monthLength; i++) {
			temp = dateFactory({
				year: thisYear,
				month: thisMonth,
				day: i + 1,
				timezone: 'local'
			});
			dates[datesOfPrevMonth + i].setValue(temp.getJSDate());
			dates[datesOfPrevMonth + i].setColor(false);
		}
		this.$.dates.setActive(dates[datesOfPrevMonth - 1 + this.localeValue.getDays()]);
		this.updateNextMonth(datesOfPrevMonth, monthLength);
	},

	/**
	* @private
	*/
	setYear: function (newYear) {
		var month,
			day,
			newMonthLength;

		if (this.localeValue.getYears() != newYear) {
			month = this.localeValue.getMonths();
			day = this.localeValue.getDays();

			newMonthLength = this.getMonthLength(newYear, month);

			this.localeValue = dateFactory({
				year: newYear,
				month: month,
				day: (day > newMonthLength) ? newMonthLength : day,
				timezone: 'local'
			});

			this.setValue(this.localeValue.getJSDate());

			// Some years have a different number of months in other calendars,
			// so we need to make sure to update the month names in the picker
			this.updateMonthPicker();
		}
	},

	/**
	* @private
	*/
	setMonth: function (newMonth) {
		var year,
			day,
			newMonthLength;

		newMonth++; // convert to ilib month
		if (this.localeValue.getMonths() != newMonth) {
			year = this.localeValue.getYears();
			day = this.localeValue.getDays();

			newMonthLength = this.getMonthLength(year, newMonth);

			this.localeValue = dateFactory({
				year: year,
				month: newMonth,
				day: (day > newMonthLength) ? newMonthLength : day,
				timezone: 'local'
			});

			this.setValue(this.localeValue.getJSDate());
		}
	},

	/**
	* @private
	*/
	setDate: function (newDate) {
		var year = this.localeValue.getYears(),
			month = this.localeValue.getMonths(),
			newMonthLength = this.getMonthLength(year, month);

			this.localeValue = dateFactory({
				year: year,
				month: month,
				day: (newDate > newMonthLength) ? newMonthLength : newDate,
				timezone: 'local'
			});

			this.setValue(this.localeValue.getJSDate());
	},

	/**
	* Responds to selection of a particular [CalendarDate]{@link module:moonstone/Calendar~CalendarDate}.
	*
	* @private
	*/
	selectDate: function (inSender, inEvent) {
		var newValue = inEvent.originator.value;
		this.setValue(newValue);
		this.localeValue = dateFactory({
			unixtime: newValue.getTime(),
			timezone: 'local'
		});
		return true;
	},

	/**
	* Responds to change of year in year picker.
	*
	* @private
	*/
	selectYearPicker: function (inSender, inEvent) {
		var year = this.$.yearPicker.getSelected().getContent();
		this.setYear(year);
		// some calendars have a different number of months and different
		// names of months depending on the year
		this.updateMonthPicker();
	},

	/**
	* Responds to change of month in month picker.
	*
	* @private
	*/
	selectMonthPicker: function (inSender, inEvent) {
		var month = this.$.monthPicker.getSelectedIndex();
		this.setMonth(month);
	},

	/**
	* Returns number of days in a particular month/year.
	*
	* @private
	*/
	getMonthLength: function (inYear, inMonth) {
		return this.cal.getMonLength(inMonth, inYear);
	},

	/**
	* When type of calendar is changed (e.g., from `gregorian` to `thaisolar`,
	* `julian`, `arabic`, `hebrew`, or `chinese`), checks for differences in year,
	* month, and day.
	*
	* @private
	*/
	calendarChanged: function () {
		var newCalendar = calendarFactory();
		if (newCalendar.getType() !== this.cal.getType()) {
			this.cal = newCalendar;
			this._monthFmt = undefined; // force it to recreate the formatter
			this.updateMonthPicker();
			this.updateYearPicker();
		}
	},

	/**
	* Switches CSS classes when the user (or developer) changes the day label
	* style dynamically.
	*
	* @private
	*/
	dayOfWeekClassesChanged: function (inOld) {
		var dayControls = this.$.days.getClientControls();
		for (var i = 0; i < dayControls.length; i++) {
			dayControls[i].removeClass(inOld || 'moon-calendar-picker-day');
			dayControls[i].addClass(this.dayOfWeekClasses || 'moon-calendar-picker-day');
		}
	},

	/**
	* @private
	*/
	dayOfWeekLengthChanged: function () {
		this._dayFmt = undefined;
		this.updateDays();
	}
});

},{'../SimplePicker':'moonstone/SimplePicker'}],'moonstone/ScrollControls':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/ScrollControls~ScrollControls} kind.
* @wip
* @module moonstone/ScrollControls
*/
var
	dom = require('enyo/dom'),
	kind = require('enyo/kind'),
	Control = require('enyo/Control'),
	NewScrollThumb = require('enyo/NewThumb'),
	Signals = require('enyo/Signals');

var
	Spotlight = require('spotlight');

var
	NewPagingControl = require('../NewPagingControl');

/**
* TODO: {@link module:moonstone/ScrollControls~ScrollControls} needs to be documented.
*
* @class ScrollControls
* @wip
* @ui
* @public
*/
var ScrollControls = module.exports = kind(
	/** @lends module:moonstone/ScrollControls~ScrollControls.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ScrollControls',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	tag: null,

	/**
	* If `true`, paging controls are focusable (in 5-way mode).  Normally, this
	* is not required, since the scroller will automatically scroll to ensure
	* most focusable items are in view.  It is intended to be used when the
	* scroller contents have no spotlightable controls, such as the case of a
	* scroller with a long body of text.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	spotlightPagingControls: true,

	/**
	* If `true`, measure the size of the scroll columns on initial render.
	* See {@link module:moonstone/ScrollControls~ScrollControls#measureScrollColumns} for details.
	*
	* @private
	*/
	measureScrollColumns: true,


	/**
	* @private
	*/
	components: [
		{name: 'vColumn', classes: 'moon-scroller-v-column', components: [
			{name: 'pageUpControl', kind: NewPagingControl, disabled: true, ontap: 'pageUp', defaultSpotlightDisappear: 'pageDownControl', defaultSpotlightDown: 'pageDownControl', side: 'top', onSpotlightUp: 'spotPaging'},
			{name: 'vthumbContainer', classes: 'moon-scroller-thumb-container moon-scroller-vthumb-container', components: [
				{name: 'vthumb', kind: NewScrollThumb, classes: 'moon-scroller-vthumb hidden', axis: 'v', minSize: 20}
			]},
			{name: 'pageDownControl', kind: NewPagingControl, disabled: true, ontap: 'pageDown', defaultSpotlightDisappear: 'pageUpControl', defaultSpotlightUp: 'pageUpControl', side: 'bottom', onSpotlightDown: 'spotPaging'}
		]},
		{name: 'hColumn', classes: 'moon-scroller-h-column', components: [
			{name: 'pageLeftControl', kind: NewPagingControl, disabled: true, ontap: 'pageLeft', defaultSpotlightDisappear: 'pageRightControl', defaultSpotlightRight: 'pageRightControl', side: 'left', onSpotlightLeft: 'spotPaging'},
			{name: 'hthumbContainer', classes: 'moon-scroller-thumb-container moon-scroller-hthumb-container', components: [
				{name: 'hthumb', kind: NewScrollThumb, classes: 'moon-scroller-hthumb hidden', axis: 'h', minSize: 20}
			]},
			{name: 'pageRightControl', kind: NewPagingControl, disabled: true, ontap: 'pageRight', defaultSpotlightDisappear: 'pageLeftControl', defaultSpotlightLeft: 'pageLeftControl', side: 'right', onSpotlightRight: 'spotPaging'}
		]},
		{kind: Signals, onSpotlightModeChanged: 'spotlightModeChanged', isChrome: true}
	],

	/**
	* @private
	*/
	create: function() {
		Control.prototype.create.apply(this, arguments);

		// TODO: Figure out how not to use parent here and elsewhere -- should be able to get there from scroller
		this.parent.addClass('moon-scroller-client-wrapper');

		this._updateScrollability = this.bindSafely(this.updateScrollability);
		this.scrollerChanged();
	},

	scrollerChanged: function(was) {
		if (was) {
			was.off('scrollabilityChanged', this._updateScrollability);
		}
		if (this.scroller) {
			this.scroller.on('scrollabilityChanged', this._updateScrollability);
			this.$.vthumb.set('scroller', this.scroller);
			this.$.hthumb.set('scroller', this.scroller);
			this.$.pageUpControl.set('scroller', this.scroller);
			this.$.pageDownControl.set('scroller', this.scroller);
			this.$.pageLeftControl.set('scroller', this.scroller);
			this.$.pageRightControl.set('scroller', this.scroller);
		}
	},

	updateScrollability: function() {
		var s = this.scroller;

		this.enableDisableHorizontalScrollControls(s.hEnabled);
		this.enableDisableVerticalScrollControls(s.vEnabled);
		this.showHideHorizontalScrollColumns(s.canScrollX);
		this.showHideVerticalScrollColumns(s.canScrollY);
		this.$.pageUpControl.set('disabled', !s.canScrollUp);
		this.$.pageDownControl.set('disabled', !s.canScrollDown);
		this.$.pageLeftControl.set('disabled', !s.canScrollLeft);
		this.$.pageRightControl.set('disabled', !s.canScrollRight);
	},

	pageUp: function() {
		this.scroller.pageUp();
	},

	pageDown: function() {
		this.scroller.pageDown();
	},

	pageLeft: function() {
		this.scroller.pageLeft();
	},

	pageRight: function() {
		this.scroller.pageRight();
	},

	/**
	* Measures scroll columns as needed, then shows or hides page controls.
	*
	* @private
	*/
	rendered: function() {
		var measure = this.measureScrollColumns && !ScrollControls._scrollColumnsMeasured;

		if (measure) {
			// We temporarily add the v-scroll-enabled class so that
			// we can measure the width of the vertical scroll column
			// after rendering and store it as a static property -- see
			// _measureScrollColumns().
			//
			// The v-scroll-enabled class will automatically be removed
			// after we measure, when we call setupBounds() (which in
			// turn calls enableDisableScrollColumns()).
			this.parent.addClass('v-scroll-enabled');
		}

		Control.prototype.rendered.apply(this, arguments);
		
		if (measure) {
			this._measureScrollColumns();
		}

		this.spotlightPagingControlsChanged();
	},

	/**
	* Moonstone's data grid list delegate uses scroll column metrics to calculate
	* available space for list controls. These metrics are derived via some LESS
	* calculations, so to avoid brittleness we choose to measure them from the DOM
	* rather than mirror the calculations in JavaScript.
	* 
	* Upon request, we do the measurement here (the first time a scroller is rendered)
	* and cache the values in static properties, to avoid re-measuring each time we need
	* the metrics.
	* 
	* @private
	*/
	_measureScrollColumns: function() {
		var cs;
		cs = dom.getComputedStyle(this.parent.hasNode());
		ScrollControls.vScrollColumnSize =
			parseInt(cs['padding-left'], 10) +
			parseInt(cs['padding-right'], 10);
		ScrollControls.hScrollColumnSize = this.$.hColumn.hasNode().offsetHeight;
		ScrollControls._scrollColumnsMeasured = true;
	},

	/**
	* @private
	*/
	spotlightPagingControlsChanged: function() {
		this.updateHoverOnPagingControls(!this.spotlightPagingControls);
		this.showHideScrollColumns(this.spotlightPagingControls);
		// if (this.generated) {
		// 	this.setupBounds();
		// }
	},

	/**
	* @private
	*/
	updateHoverOnPagingControls: function(hover) {
		this.$.pageLeftControl.addRemoveClass('hover', hover);
		this.$.pageRightControl.addRemoveClass('hover', hover);
		this.$.pageUpControl.addRemoveClass('hover', hover);
		this.$.pageDownControl.addRemoveClass('hover', hover);
	},

	/**
	* Decorate spotlight events from paging controls so user can 5-way out of container
	* 
	* @private
	*/
	spotPaging: function (sender, event) {
		event.requestLeaveContainer = true;
	},

	/**
	* @private
	*/
	spotlightModeChanged: function(sender, event) {
		var activatePageControls = this.shouldShowPageControls();
		this.showHideScrollColumns(activatePageControls);
		this.updateHoverOnPagingControls(activatePageControls);
	},

	/**
	* Enables or disables vertical scroll column.
	*
	* @private
	*/
	enableDisableVerticalScrollControls: function(enabled) {
		var hOffProp = this.rtl ? 'leftOffset' : 'rightOffset',
			hOffVal = enabled ? ScrollControls.vScrollColumnSize : 0;

		this.scroller.set(hOffProp, hOffVal);
		this.parent.addRemoveClass('v-scroll-enabled', enabled);
		this.$.vColumn.addRemoveClass('v-scroll-enabled', enabled);
		this.$.hColumn.addRemoveClass('v-scroll-enabled', enabled);
		this.$.pageUpControl.spotlight = enabled && this.spotlightPagingControls;
		this.$.pageDownControl.spotlight = enabled && this.spotlightPagingControls;
	},

	/**
	* Enables or disables horizontal scroll column.
	*
	* @private
	*/
	enableDisableHorizontalScrollControls: function(enabled) {
		var bOffVal = enabled ? ScrollControls.hScrollColumnSize : 0;

		this.scroller.set('bottomOffset', bOffVal);
		this.parent.addRemoveClass('h-scroll-enabled', enabled);
		this.$.vColumn.addRemoveClass('h-scroll-enabled', enabled);
		this.$.hColumn.addRemoveClass('h-scroll-enabled', enabled);
		this.$.pageLeftControl.spotlight = enabled && this.spotlightPagingControls;
		this.$.pageRightControl.spotlight = enabled && this.spotlightPagingControls;
	},

	/**
	* Shows or hides scroll columns.
	*
	* @private
	*/
	showHideScrollColumns: function(show) {
		this.showHideVerticalScrollColumns(show);
		this.showHideHorizontalScrollColumns(show);
	},

	/**
	* Shows or hides vertical scroll columns.
	*
	* @private
	*/
	showHideVerticalScrollColumns: function(show) {
		this.$.vColumn.addRemoveClass('visible', show || this.spotlightPagingControls);
	},

	/**
	* Shows or hides horizontal scroll columns.
	*
	* @private
	*/
	showHideHorizontalScrollColumns: function(show) {
		this.$.hColumn.addRemoveClass('visible', show || this.spotlightPagingControls);
	},

	/**
	* Returns boolean indicating whether page controls should be shown at all for this scroller.
	*
	* @private
	*/
	shouldShowPageControls: function() {
		return (Spotlight.getPointerMode() && this.hovering && !this.spotlightPagingControls);
	}
});

},{'../NewPagingControl':'moonstone/NewPagingControl'}],'moonstone/Panel':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/Panel~Panel} kind.
* @module moonstone/Panel
*/

require('moonstone');

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	dom = require('enyo/dom'),
	Control = require('enyo/Control');

var
	FittableLayout = require('layout/FittableLayout'),
	FittableRows = require('layout/FittableRows'),
	FittableRowsLayout = FittableLayout.Rows;

var
	Spotlight = require('spotlight');

var
	Header = require('moonstone/Header');

/**
* Fires when this [panel]{@link module:moonstone/Panel~Panel} has completed its pre-arrangement transition.
* No additional data is passed with this event.
*
* @event module:moonstone/Panel~Panel#onPreTransitionComplete
* @type {Object}
* @public
*/

/**
* Fires when this [panel]{@link module:moonstone/Panel~Panel} has completed its post-arrangement transition.
* No additional data is passed with this event.
*
* @event module:moonstone/Panel~Panel#onPostTransitionComplete
* @type {Object}
* @public
*/

/**
* {@link module:moonstone/Panel~Panel} is the default kind for controls
* created inside a {@link module:moonstone/Panels~Panels} container. A
* Panels container will typically contain several instances of Panel.
*
* The built-in features include an embedded {@link module:moonstone/Header~Header}
* and a {@link module:layout/FittableRows~FittableRows} layout for the main body
* content.
*
* @class Panel
* @extends module:enyo/Control~Control
* @ui
* @public
*/

module.exports = kind(
	/** @lends module:moonstone/Panel~Panel.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Panel',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	* @lends module:moonstone/Panel~Panel.prototype
	*/
	published: {
		/**
		* Facade for the [title]{@link module:moonstone/Header~Header#title} property of the embedded
		* {@link module:moonstone/Header~Header}.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		title: '',

		/**
		* Facade for the [titleAbove]{@link module:moonstone/Header~Header#titleAbove} property of the
		* embedded {@link module:moonstone/Header~Header}.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		titleAbove: '',

		/**
		* Facade for the [titleBelow]{@link module:moonstone/Header~Header#titleBelow} property of the
		* embedded {@link module:moonstone/Header~Header}.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		titleBelow: '',

		/**
		* Facade for the [subTitleBelow]{@link module:moonstone/Header~Header#subTitleBelow} property
		* of the embedded {@link module:moonstone/Header~Header}.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		subTitleBelow: '',

		/**
		* When `true`, the header's [titleAbove]{@link module:moonstone/Header~Header#titleAbove} property
		* is automatically populated with the panel index.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		autoNumber: true,

		/**
		* Facade for the [type]{@link module:moonstone/Header~Header#type} property of the embedded
		* {@link module:moonstone/Header~Header}.
		* Valid values are: `'large'`, `'small'`, and `'medium'`.
		*
		* @type {String}
		* @default 'large'
		* @public
		*/
		headerType: 'large',

		/**
		* Facade for the [allowHtml]{@link module:enyo/Control~Control#allowHtml} property of the
		* embedded {@link module:moonstone/Header~Header}.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		allowHtmlHeader: false,

		/**
		* Facade for the [backgroundSrc]{@link module:moonstone/Header~Header#backgroundSrc} property
		* of the embedded {@link module:moonstone/Header~Header}.
		*
		* @type {(String|String[]|module:enyo/resolution#selectSrc~src|module:enyo/resolution#selectSrc~src[])}
		* @default null
		* @public
		*/
		headerBackgroundSrc: null,

		/**
		* Facade for the [backgroundPosition]{@link module:moonstone/Header~Header#backgroundPosition}
		* property of the embedded {@link module:moonstone/Header~Header}.
		*
		* @type {(String|String[])}
		* @default 'top right'
		* @public
		*/
		headerBackgroundPosition: 'top right',

		/**
		* An object containing additional settings for the {@link module:moonstone/Header~Header}. Any
		* values specified here will be mixed into the header definition.
		*
		* @type {Object}
		* @default null
		* @public
		*/
		headerOptions: null,

		/**
		* Facade for the [titleUpperCase]{@link module:moonstone/Header~Header#titleUpperCase} property
		* of the embedded {@link module:moonstone/Header~Header}.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		titleUpperCase: true
	},

	/**
	* @private
	*/
	handlers: {
		onSpotlightFocus: 'disableSpotlightDummy'
	},

	/**
	* @private
	*/
	spotlight: 'container',

	/**
	* @private
	*/
	classes: 'moon-panel',

	/**
	* @private
	*/
	layoutKind: FittableRowsLayout,

	/**
	* @private
	*/
	useFlex: true,

	/**
	* @private
	*/
	panelTools : [
		/* header will be created here programmatically in createTools after mixing-in headerOptions */
		{name: 'panelBody', kind: FittableRows, fit: true, classes: 'moon-panel-body'},
		{name: 'spotlightDummy', kind: Control, spotlight: false, style: 'width:0; height:0;'}
	],

	/**
	* @private
	*/
	headerConfig : {name: 'header', kind: Header, isChrome: true},

	/**
	* @private
	*/
	bindings: [
		{from: 'title', to: '$.header.title'},
		{from: 'title', to: '$.breadcrumbText.content'},
		{from: 'titleAbove', to: '$.header.titleAbove'},
		{from: 'titleAbove', to: '$.breadcrumbTitleAbove.content'},
		{from: 'titleBelow', to: '$.header.titleBelow'},
		{from: 'subTitleBelow', to: '$.header.subTitleBelow'},
		{from: 'allowHtmlHeader', to: '$.header.allowHtml'},
		{from: 'allowHtmlHeader', to: '$.breadcrumbText.allowHtml'},
		{from: 'headerBackgroundSrc', to: '$.header.backgroundSrc'},
		{from: 'headerBackgroundPosition', to: '$.header.backgroundPosition'},
		{from: 'titleUpperCase', to: '$.header.titleUpperCase'},
		{from: 'headerType', to: '$.header.type', oneWay: false}
	],

	/**
	* @private
	*/
	headerComponents: [],

	/**
	* @private
	*/
	isOffscreen: false,

	/**
	* @private
	*/
	events: {
		onPanelOnscreen: '',
		onPanelOffscreen: ''
	},

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		// FIXME: Need to determine whether headerComponents was passed on the instance or kind to get the ownership correct
		if (this.headerComponents) {
			var owner = this.hasOwnProperty('headerComponents') ? this.getInstanceOwner() : this;
			this.$.header.createComponents(this.headerComponents, {owner: owner});
		}
		this.autoNumberChanged();
		this.headerTypeChanged();
	},

	/**
	* @private
	*/
	initComponents: function () {
		this.createTools();
		this.controlParentName = 'panelBody';
		this.discoverControlParent();
		Control.prototype.initComponents.apply(this, arguments);
	},

	/**
	* @private
	*/
	createTools: function () {
		// Create everything but the header
		this.createChrome(this.panelTools);
		// Special-handling for header, which can have its options modified by the instance
		var hc = util.clone(this.headerConfig || {});
		hc.addBefore = this.$.panelBody;
		util.mixin(hc, this.headerOptions || this.headerOption);
		this.createComponent(hc, {owner:this});
	},

	/**
	* On reflow, updates `this.$.contentWrapper` bounds.
	* @private
	*/
	reflow: function () {
		Control.prototype.reflow.apply(this, arguments);
		this.getInitAnimationValues();
		this.updatePanelBodySize();
	},

	/**
	* Updates `this.$.contentWrapper` to have the height/width of `this`.
	* @private
	*/
	updatePanelBodySize: function () {
		var node = this.hasNode();

		if (!node) {
			return;
		}

		this.$.panelBody.applyStyle('height', this.initialHeight + 'px');
	},

	/**
	* Forcibly applies layout kind changes to `this.$.panelBody`.
	* @private
	*/
	layoutKindChanged: function () {
		this.$.panelBody.setLayoutKind(this.layoutKind);
	},

	/**
	* If spottable controls are added to the Panel instance after initial creation, we need to
	* disable the spotlightDummy. Unfortunately, there's no other reliable way to detect when
	* controls are added *anywhere* within a control's component tree so we have to watch for
	* onSpotlightFocus events to disable the spotlightDummy.
	*
	* @private
	*/
	disableSpotlightDummy: function (sender, event) {
		if (this.$.spotlightDummy.spotlight && event.originator !== this && event.originator !== this.$.spotlightDummy) {
			this.$.spotlightDummy.spotlight = false;
		}
	},

	/**
	* @private
	*/
	updateSpotability: function () {
		if (this.isOffscreen) {
			this.spotlightDisabled = true;
		} else {
			this.spotlightDisabled = false;
			this.$.spotlightDummy.spotlight = false;
			if (!Spotlight.isSpottable(this)) {
				// make dummy div spottable if there is no spottable child
				this.$.spotlightDummy.spotlight = true;
			}
		}
	},

	/**
	* @private
	*/
	headerTypeChanged: function () {
		this.$.header.setType(this.headerType);
		this.$.header.adjustTitleWidth();
		if (this.generated) {
			this.resize();
		}
	},

	/**
	* Updates [titleAbove]{@link module:moonstone/Panel~Panel#titleAbove} when
	* [autoNumber]{@link module:moonstone/Panel~Panel#autoNumber} changes.
	* @private
	*/
	autoNumberChanged: function () {
		if (this.getAutoNumber() === true && this.container) {
			// This gets the index regardless of whether the panel is client or chome
			var n = this.parent.indexOfChild(this) + 1;
			n = ((n < 10) ? '0' : '') + n;
			this.setTitleAbove(n);
		}
	},

	/**
	* @private
	*/
	enableMarquees: function () {
		this.$.header.enableMarquee();
	},

	/**
	* @private
	*/
	disableMarquees: function () {
		this.$.header.disableMarquee();
	},

	/**
	* @private
	*/
	startMarqueeAsNeeded: function (info) {
		var onscreen = !info.isOffscreen;
		if (onscreen) {
			this.$.header.enableMarquee();
			this.$.header.startMarquee();
		}
	},

	/**
	* @private
	*/
	getHeader: function () {
		return this.$.header;
	},

	/**
	* Called directly by {@link module:moonstone/Panels~Panels}.
	* @private
	*/
	initPanel: function (info) {
		this.set('isOffscreen', info.isOffscreen);
		this.updateSpotability();
		this.disableMarquees();
		this.startMarqueeAsNeeded(info);
	},

	/**
	* Called directly by {@link module:moonstone/Panels~Panels}.
	* @private
	*/
	updatePanel: function (info) {
		if (!info.animate) {
			this.disableMarquees();
		}

		this.set('isOffscreen', info.isOffscreen);
		this.updateSpotability();
		this.startMarqueeAsNeeded(info);
	},

	/**
	* Called directly on the panel by {@link module:moonstone/Panels~Panels} when the panel has completed a
	* transition. You may override this function in a panel subkind to perform
	* post-transition work (e.g., loading data for the panel).
	*
	* @param {Object} info - Information from the [Panels]{@link module:moonstone/Panels~Panels} component.
	* Additional information may be supplied by the arranger, such as breadcrumb and
	* offscreen status.
	* @param {Number} info.from - The index the parent Panels was moving from for this transition.
	* @param {Number} info.to - The index the parent Panels was moving to for this transition.
	* @param {Number} info.index - The current index of this [panel]{@link module:moonstone/Panel~Panel}.
	* @param {Boolean} info.animate - Whether the parent Panels is set to animate.
	* @public
	*/
	transitionFinished: function (info) {
		this.updatePanel(info);
	},

	/**
	* @private
	*/
	isOffscreenChanged: function () {
		// Tell the children we're on or off screen
		if (this.isOffscreen) {
			this.waterfallDown('onPanelOffscreen');
		} else {
			this.waterfallDown('onPanelOnscreen');
		}
	},

	/**
	* Was protected
	* @private
	*/
	getInitAnimationValues: function () {
		var panelNode = this.hasNode(), headerNode = this.$.header.hasNode(), bodyNode = this.$.panelBody.hasNode(),
			panelPaddingT = parseInt(dom.getComputedStyleValue(panelNode, 'padding-top'), 10),
			panelPaddingB = parseInt(dom.getComputedStyleValue(panelNode, 'padding-bottom'), 10),
			bodyPaddingT = parseInt(dom.getComputedStyleValue(bodyNode, 'padding-top'), 10),
			panelHeight = panelNode.getBoundingClientRect().height,
			headerHeight = headerNode.getBoundingClientRect().height;
		this.initialHeight = panelHeight - headerHeight - (panelPaddingT + panelPaddingB + bodyPaddingT);
	},

	// Accessibility

	/**
	* @private
	*/
	accessibilityRole: 'region',

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['title', 'accessibilityLabel', 'accessibilityHint'], method: function () {
			var content = this.title,
				prefix = this.accessibilityLabel || content || null,
				label = this.accessibilityHint && prefix && (prefix + ' ' + this.accessibilityHint) ||
						this.accessibilityHint ||
						this.accessibilityLabel ||
						prefix ||
						null;

			this.setAriaAttribute('aria-label', label);
		}}
	],

	/**
	* @private
	*/
	accessibilityLive: 'off'
});

}],'moonstone/InputHeader':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/InputHeader~InputHeader} kind.
* @module moonstone/InputHeader
* @deprecated
*/

var
	kind = require('enyo/kind');

var
	Header = require('./Header');

/**
* {@link module:moonstone/InputHeader~InputHeader} is a header that uses an input for the title. While this
* was initially created as an independent subkind of {@link module:moonstone/Header~Header}, its unique
* functionality has since been folded back into the latter kind, making the current
* incarnation of `InputHeader` simply a `Header` whose
* [inputMode]{@link module:moonstone/Header~Header#inputMode} is set to `true`. This kind
* is now deprecated.
*
* The [title]{@link module:moonstone/Header~Header#title} property is used as the input placeholder,
* while the [value]{@link module:moonstone/Header~Header#value} property contains the contents of the
* input. Developers may listen for
* [onInputHeaderInput]{@link module:moonstone/Header~Header#onInputHeaderInput} and
* [onInputHeaderChange]{@link module:moonstone/Header~Header#onInputHeaderChange} events from the
* embedded input to respond to changes.
*
* ```
* 	var
* 		kind = require('enyo/kind'),
* 		InputHeader = require('moonstone/InputHeader'),
* 		IconButton = require('moonstone/IconButton');
*
* 	{
* 		kind: InputHeader,
* 		title: 'Input Header',
* 		titleAbove: '02',
* 		titleBelow: 'Sub Header',
* 		subTitleBelow: 'Sub-sub Header',
* 		components: [
* 			{kind: IconButton, src: 'moonstone/assets/icon-like.png'},
* 			{kind: IconButton, src: 'moonstone/assets/icon-next.png'}
* 		]
* 	}
* ```
*
* @class InputHeader
* @extends module:moonstone/Header~Header
* @ui
* @public
* @deprecated
*/
module.exports = kind(
	/** @lends module:moonstone/InputHeader~InputHeader.prototype */ {

	/**
	* @private
	*/
	name: 'moon.InputHeader',

	/**
	* @private
	*/
	kind: Header,

	/**
	* @private
	*/
	inputMode: true
});

},{'./Header':'moonstone/Header'}],'moonstone/LightPanels/LightPanel':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/LightPanels~LightPanel} kind.
*
* Note: LightPanel is exported from {@link module:moonstone/LightPanels}. This module should not be
* required directly.
* @wip
* @ignore
* @module moonstone/LightPanels
*/

var
	kind = require('enyo/kind'),
	LightPanel = require('enyo/LightPanels').Panel,
	States = LightPanel.States;

var
	Spotlight = require('spotlight');

var
	Header = require('../Header');

/**
* A lightweight panels implementation that has basic support for side-to-side transitions
* between child components.
*
* @class LightPanel
* @name module:moonstone/LightPanels~LightPanel
* @extends module:enyo/LightPanels~LightPanel
* @wip
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/LightPanels~LightPanel.prototype */ {

	/**
	* @private
	*/
	name: 'moon.LightPanel',

	/**
	* @private
	*/
	kind: LightPanel,

	/**
	* @private
	*/
	classes: 'moon-light-panel',

	/**
	* @private
	*/
	spotlight: 'container',

		/**
	* The title of this panel.
	*
	* @type {String}
	* @default ''
	* @public
	*/
	title: '',

	/**
	* Components that are part of the header.
	*
	* @type {Object}
	* @default {}
	* @public
	*/
	headerComponents: {},

	/**
	* The amount of time, in milliseconds, to run the fade-in animation for the panel body.
	*
	* @type {Number}
	* @default 500
	* @public
	*/
	clientDuration: 500,

	/**
	* The timing function to be applied to the fade-in animation for the panel body.
	*
	* @type {String}
	* @default 'ease-out'
	* @public
	*/
	clientTimingFunction: 'ease-out',

	/**
	* Facade for the [titleUpperCase]{@link module:moonstone/Header~Header#titleUpperCase} property
	* of the embedded {@link module:moonstone/Header~Header}.
	*
	* @type {Boolean}
	* @default true
	* @public
	*/
	titleUpperCase: true,

	/**
	* @private
	*/
	handlers: {
		onSpotlightFocus: 'disableSpotlightPlaceholder'
	},

	/**
	* @private
	*/
	components: [
		{kind: Header, name: 'header', type: 'medium', marqueeOnRenderDelay: 1000},
		{name: 'client', classes: 'client', spotlight: 'container'},
		{name: 'spotlightPlaceholder', spotlight: false, style: 'width:0;height:0;'}
	],

	/**
	* @private
	*/
	bindings: [
		{from: 'title', to: '$.header.title'},
		{from: 'titleUpperCase', to: '$.header.titleUpperCase'}
	],

	/**
	* @method
	* @private
	*/
	create: function () {
		LightPanel.prototype.create.apply(this, arguments);

		var transValue = 'opacity ' + this.clientDuration + 'ms ' + this.clientTimingFunction;
		this.$.client.applyStyle('-webkit-transition', transValue);
		this.$.client.applyStyle('transition', transValue);

		if (this.headerComponents) {
			var owner = this.hasOwnProperty('headerComponents') ? this.getInstanceOwner() : this;
			this.$.header.createComponents(this.headerComponents, {owner: owner});
		}
	},

	/**
	* This overridable method is called before a transition.
	*
	* @public
	*/
	preTransition: function () {
		LightPanel.prototype.preTransition.apply(this, arguments);

		var current = Spotlight.getCurrent(),
			currentSpottable = current && Spotlight.isSpottable(current),
			isChild = current && current.isDescendantOf(this);

		this.$.header.stopMarquee();

		// This is highly related to the order in which "preTransition" is fired for the outgoing
		// and the incoming panel. The outgoing panel's method is fired before that of the incoming
		// panel.
		if (this.state == States.ACTIVATING && !currentSpottable) {
			// We pause Spotlight to prevent re-spotting of the last control in the outgoing panel.
			if (!Spotlight.getPointerMode()) Spotlight.pause();
		} else if (this.state == States.DEACTIVATING && (isChild || !currentSpottable)) {
			Spotlight.unfreeze();
			Spotlight.unspot();
		}

		this.spotlightDisabled = true; // we do not want to allow 5-way spotting during transition
	},

	/**
	* This overridable (or extendable) method is called after a transition.
	*
	* @public
	*/
	postTransition: function () {
		LightPanel.prototype.postTransition.apply(this, arguments);

		if (this.state == States.ACTIVE) this.spotlightDisabled = false;

		if (!this.$.client.children.length) {
			var owner = this.hasOwnProperty('clientComponents') ? this.getInstanceOwner() : this;
			this.createComponents(this.clientComponents, {owner: owner});
			this.$.client.render();
			this.didClientRender();
		}

		if (this.state == States.ACTIVE) {
			this.checkSpottability();
			this.$.header.startMarquee();
		}
	},

	/**
	* @private
	*/
	checkSpottability: function () {
		if (!Spotlight.getPointerMode()) {
			// Now we need to spot a spottable element (other than the dummy element), if it exists.
			var spotlightPlaceholder = this.$.spotlightPlaceholder,
				current = Spotlight.getCurrent();

			Spotlight.resume();
			spotlightPlaceholder.spotlight = false;
			if (!Spotlight.isSpottable(this)) spotlightPlaceholder.spotlight = true;
			if (!current || current === spotlightPlaceholder) {
				setTimeout(this.bindSafely(function () {
					Spotlight.spot(this);
				}), 0);
			}
		}
	},

	/**
	* @private
	*/
	disableSpotlightPlaceholder: function (sender, event) {
		if (this.$.spotlightPlaceholder.spotlight && event.originator !== this && event.originator !== this.$.spotlightPlaceholder) {
			this.$.spotlightPlaceholder.spotlight = false;
		}
	},

	/**
	* This overridable (extendable) method is called when the client area has been rendered. This
	* can be used to perform any actions that should occur once the client components, for example,
	* of the {@link module:moonstone/LightPanels~LightPanel} have been created and rendered, such as custom focusing logic.
	*
	* @public
	*/
	didClientRender: function () {
		this.$.client.addClass('populated');
	},

	// Accessibility

	/**
	* @private
	*/
	accessibilityRole: 'region',

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['title', 'accessibilityLabel', 'accessibilityHint'], method: function () {
			var content = this.title,
				prefix = this.accessibilityLabel || content || null,
				label = this.accessibilityHint && prefix && (prefix + ' ' + this.accessibilityHint) ||
						this.accessibilityHint ||
						this.accessibilityLabel ||
						prefix ||
						null;

			this.setAriaAttribute('aria-label', label);
		}}
	],

	/**
	* @private
	*/
	accessibilityLive: 'off'
});

module.exports.States = States;

},{'../Header':'moonstone/Header'}],'moonstone/ListActions':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declarations for the {@link module:moonstone/ListActions~ListActions}
* and {@link module:moonstone/ListActions~ListActionsPopup} kinds, and the
* {@link module:moonstone/ListActions~ListActionActivationSupport} mixin.
* @module moonstone/ListActions
*/

var
	dom = require('enyo/dom'),
	ri = require('enyo/resolution');

var
	ContextualPopup = require('moonstone/ContextualPopup'),
	ContextualPopupDecorator = require('moonstone/ContextualPopupDecorator'),
	IconButton = require('moonstone/IconButton');

/**
* An internally-used support mixin added to a {@link module:moonstone/ListActions~ListActions}
* menu, which decorates `activate` events with the menu's `action` property.
*
* @mixin ListActionActivationSupport
* @private
*/
var ListActionActivationSupport = {

	/**
	* @private
	*/
	name: 'ListActionActivationSupport',

	/**
	* @private
	*/
	handlers: {
		onActivate: 'activate'
	},

	/**
	* @private
	*/
	activate: function (sender, e) {
		e.action = this.action;
	}
};

/**
* {@link module:moonstone/ListActions~ListActionsPopup} is a
* [control]{@link module:moonstone/ContextualPopup~ContextualPopup} used by
* {@link module:moonstone/ListActions~ListActions} to house a menu of selectable options.
*
* @class ListActionsPopup
* @extends module:moonstone/ContextualPopup~ContextualPopup
* @ui
* @private
*/
var ListActionsPopup = ContextualPopup.kind(
	/** @lends module:moonstone/ListActions~ListActionsPopup */ {

	/**
	* @private
	*/
	classes: 'moon-list-actions-popup below',

	/**
	* @see moonstone/ContextualPopup~ContextualPopup#spotlightModal
	*/
	spotlightModal: true,

	/**
	* @see moonstone/ContextualPopup~ContextualPopup#showCloseButton
	*/
	showCloseButton: true,

	/**
	* @private
	*/
	resetDirection: function () {
		this.removeClass(this.arrowClasses);
		this.removeClass('right');
		this.removeClass('left');
	},

	/**
	* Adjust popup direction, anchor to the edge of screen if it goes over, and adjust arrow
	* positions.
	*
	* @private
	* @override
	*/
	alterDirection: function () {
		if (this.showing) {
			var clientRect = this.getBoundingRect(this.node),
				viewPortWidth = dom.getWindowWidth(),
				offsetWidth = (clientRect.width - this.activatorOffset.width) / 2,
				popupMargin = ri.scale(24),
				iconButtonWidth = this.activatorOffset.width + popupMargin,
				bounds = {top: null, left: null},
				c;

			this.resetDirection();

			if(this.activatorOffset.left < offsetWidth) {
				// flip towards right-side
				this.addClass('right');

				// adjust arrow position
				c = Math.round((this.activatorOffset.left - popupMargin) / iconButtonWidth);
				this.arrowClasses = 'list-actions-' + (c + 1) + 'h';
				this.addClass(this.arrowClasses);

				// anchor to the far left
				bounds.left = popupMargin;
			} else if(viewPortWidth - this.activatorOffset.right < offsetWidth) {
				// flip towards left-side
				this.addClass('left');

				// adjust arrow position
				c = Math.round((viewPortWidth - this.activatorOffset.right - popupMargin) / iconButtonWidth);
				this.arrowClasses = 'list-actions-' + (c + 1) + 'h';
				this.addClass(this.arrowClasses);

				// anchor to the far right
				bounds.left = viewPortWidth - clientRect.width - popupMargin;
			} else {
				bounds.left = this.activatorOffset.left - offsetWidth;
			}

			bounds.top = this.activatorOffset.bottom;

			this.setBounds(bounds);
		}
	}
});

/**
* {@link module:moonstone/ListActions~ListActions} is a [control]{@link module:enyo/Control~Control}
* designed to live within a {@link module:moonstone/Header~Header}. It is used to perform actions on
* an associated list of items. A ListActions [object]{@glossary Object} combines an activating
* control with a drawer containing a user-defined menu of selectable options for acting on items in
* the list. When a menu item is selected, an action--such as filtering, sorting, moving, or
* deleting--may be invoked in the application by handling change events from the selected
* items.
*
* @class ListActions
* @extends module:moonstone/ContextualPopupDecorator~ContextualPopupDecorator
* @ui
* @public
*/
var ListActions = ContextualPopupDecorator.kind({

	/**
	* @private
	*/
	classes: 'moon-list-actions',

	/**
	* If `true`, the popup will automatically close when the user selects a menu item.
	*
	* Note: There is a known issue where {@link module:enyo/DataList~DataList} is used in
	* `listActions` block and want to set `autoCollapse` to `true`, it will close the popup as it
	* resizes. In case you need to use the data-bound list in `listActions` block, please use
	* {@link module:enyo/DataRepeater~DataRepeater} instead.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	autoCollapse: false,

	/**
	* A block of one or more controls to be displayed inside the list actions menu. It should
	* typically contain a {@link module:moonstone/Divider~Divider} identifying the category and a
	* {@link module:moonstone/Scroller~Scroller}, containing instances of
	* {@link module:moonstone/CheckboxItem~CheckboxItem}, 
	* {@link module:moonstone/ToggleItem~ToggleItem}, or
	* {@link module:moonstone/SelectableItem~SelectableItem} for setting options for the underlying
	* [panel]{@link module:moonstone/Panel~Panel}. Alternatively, a
	* {@link module:enyo/DataRepeater~DataRepeater} or a {@link module:moonstone/DataList~DataList}
	* may be used for populating a data-bound list of options.
	* {@link module:enyo/DataRepeater~DataRepeater} is preferrable as performance gain from
	* pagination starts when you have more than two pages worth of items, 11 or more in ListActions
	* case, in the list.
	*
	* More than one option group may be added to the `listActions` block, in which options
	* are laid out horizontally.
	*
	* Each group should have a string value set for the `action` property, as this will
	* be passed in all events that bubble from the `ListActions`, to allow the user to
	* identify which category changed.
	*
	* @type {Object[]}
	* @default null
	* @public
	*/
	listActions: null,

	/**
	* Icon name to be used by the activator button (as in {@link module:moonstone/Icon~Icon} and
	* {@link module:moonstone/IconButton~IconButton}).
	*
	* @type {String}
	* @default ''
	* @public
	*/
	icon: '',

	/**
	* Source URL for icon image.
	*
	* @type {String|module:enyo/resolution#selectSrc~src}
	* @default ''
	* @public
	*/
	iconSrc: '',

	/**
	* The background-color opacity of the {@link module:moonstone/ListActions~ListActions}' activator
	* (which is a {@link module:moonstone/IconButton~IconButton}). Please see the valid values defined by
	* {@link module:moonstone/Button~Button#backgroundOpacity}.
	*
	* @type {String}
	* @default 'opaque'
	* @public
	*/
	backgroundOpacity: 'opaque',

	/**
	* @private
	*/
	components: [
		{name: 'activator', kind: IconButton},
		{name: 'listActionsPopup', kind: ListActionsPopup, accessibilityReadAll: false, components: [
			{name: 'listActionsWrapper', classes: 'moon-hspacing top moon-list-actions-scroller', controlClasses: 'moon-list-actions-popup-width', onActivate: 'optionSelected'}
		]}
	],

	/**
	* @private
	*/
	bindings: [
		{from: 'iconSrc', to: '$.activator.src'},
		{from: 'icon', to: '$.activator.icon'},
		{from: 'disabled', to: '$.activator.disabled', oneWay: false},
		{from: 'backgroundOpacity', to: '$.activator.backgroundOpacity'}
	],

	/**
	* @private
	*/
	create: function() {
		ContextualPopupDecorator.prototype.create.apply(this, arguments);
		this.disabledChanged();
		this.listActionsChanged();
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
	listActionsChanged: function() {
		var i,
			listAction;

		for (i = 0; (listAction = this.listActions[i]); i++) {
			listAction.mixins = this.addListActionMixin(listAction);
			this.$.listActionsWrapper.createComponent(
				listAction, {
					owner: this.hasOwnProperty('listActions') ? this.getInstanceOwner() : this
				});
		}

		if (this.hasNode()) {
			this.$.listActionsWrapper.render();
		}
	},

	/**
	* Adds a mixin to each list action menu that decorates `activate` events with the menu's
	* `action` property.
	*
	* @private
	*/
	addListActionMixin: function (listAction) {
		var mixins = listAction.mixins || [];
		if (mixins.indexOf(ListActionActivationSupport) === -1) {
			mixins.push(ListActionActivationSupport);
		}
		return mixins;
	},

	/**
	* @private
	*/
	optionSelected: function() {
		if (this.autoCollapse && this.$.listActionsPopup.getAbsoluteShowing()) {
			this.startJob('hidePopupJob', function() {
				this.$.listActionsPopup.hide();
			}, 300);
		}
	},

	/**
	* @override
	* @private
	*/
	popupShown: function() {
		ContextualPopupDecorator.prototype.popupShown.apply(this,arguments);
		this.bubble('onRequestMuteTooltip');
	},

	/**
	* @override
	* @private
	*/
	popupHidden: function() {
		ContextualPopupDecorator.prototype.popupHidden.apply(this,arguments);
		this.bubble('onRequestUnmuteTooltip');
	}
});

module.exports = ListActions;
}],'moonstone/ApplicationCloseButton':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ApplicationCloseButton~ApplicationCloseButton} kind.
* @module moonstone/ApplicationCloseButton
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	ri = require('enyo/resolution');

var
	$L = require('../i18n'),
	TooltipDecorator = require('moonstone/TooltipDecorator'),
	Tooltip = require('moonstone/Tooltip'),
	IconButton = require('moonstone/IconButton');

var buttonDescription = $L('Exit app');

/**
* {@link module:moonstone/ApplicationCloseButton~ApplicationCloseButton}
* may be added to {@link module:moonstone/Panels~Panels}, or other
* full-screen controls. It includes basic positioning styles that may require
* adjustment for your particular usage. When activated, an `onApplicationClose`
* event is emitted. On its own, an ApplicationCloseButton has no function; you
* must provide your own event handler to close the application. The recommended
* action to take in response to the event is `window.close()`, but you may also
* want to also perform operations such as saving user work or closing database
* connections.
*
* @class ApplicationCloseButton
* @extends module:moonstone/TooltipDecorator~TooltipDecorator
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ApplicationCloseButton~ApplicationCloseButton.prototype */ {
	/**
	* @private
	*/
	name: 'moon.ApplicationCloseButton',

	/**
	* @private
	*/
	kind: TooltipDecorator,

	/**
	* @private
	*/
	classes: 'moon-application-close-button',

	/**
	* Boolean indicating whether the tooltip is shown soon after the button is focused.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	autoShow: false,

	/**
	* @private
	*/
	events: {
		onApplicationClose: ''
	},

	/**
	* @private
	*/
	components: [
		{name: 'button', kind: IconButton, icon: 'closex', small: true, backgroundOpacity: 'transparent', ontap: 'handleButtonTap'},
		{kind: Tooltip, content: buttonDescription, floating: true, position: 'below'}
	],

	handlers: {
		onCustomizeCloseButton: 'handleCustomizeCloseButton'
	},

	/**
	* @private
	*/
	customizeCloseButton: function (properties) {
		var prop, style;

		if (properties && typeof properties == 'object') {
			for (prop in properties) {
				if (prop == 'styles' && typeof properties[prop] == 'object') {
					for (style in properties[prop]) {
						this.$.button.applyStyle(style, properties[prop][style]);
					}
				} else {
					this.$.button.set(prop, properties[prop]);
				}
			}
		}
	},

	/**
	* This takes action when the CustomizeCloseButton event is received. It accepts several event
	* properties, and in their absence resets each to its original value.
	*
	* Possible `ev` object members:
	*   x - (Number|String), positive or negative measurement to offset the X from its natural position.
	*       This value is automatically inverted in RtL mode.
	*   y - (Number|String), positive or negative measurement to offset the X from its natural position.
	*   properties {Object} An object containing key/value pairs to be `set` on the close button.
	*   For example, this can be used to set the `showing` property of the close button. If present
	*   and an object, the `styles` member will be iterated through and each style will be applied
	*   individually and those styles with a `null` value will be removed.
	*
	* Ex:
	*    this.doCustomizeCloseButton({parameters: {showing: false});
	*
	* @private
	*/
	handleCustomizeCloseButton: function (sender, ev) {
		var shiftX = ev.x,
			shiftY = typeof ev.y == 'number' ? dom.unit(ri.scale(ev.y), 'rem') : ev.y;

		switch (typeof shiftX) {
			case 'number':
				shiftX = dom.unit(ri.scale( this.rtl ? shiftX * -1 : shiftX ), 'rem');
				break;
			case 'string':
				if (this.rtl) {
					if (shiftX.indexOf('-') === 0) {
						shiftX = shiftX.substring(1);
					} else {
						shiftX = '-' + shiftX;
					}
				}
				break;
		}
		// Only apply changes that are present. (Undef means don't change me.) dom.transform preserves successive assignments.
		if (typeof shiftX != 'undefined') dom.transform(this, {translateX: shiftX});
		if (typeof shiftY != 'undefined') dom.transform(this, {translateY: shiftY});

		this.customizeCloseButton(ev.properties);
		return true;
	},

	/**
	* @private
	*/
	create: function () {
		TooltipDecorator.prototype.create.apply(this, arguments);
		this.autoShowChanged();
	},

	/**
	* @private
	*/
	autoShowChanged: function () {
		TooltipDecorator.prototype.autoShowChanged.apply(this, arguments);
		// Only add an accessibilityLabel to the button if we aren't displaying a tooltip, so the
		// accessibility system doesn't read the label twice, once for the button, and again for the tooltip.
		this.$.button.set('accessibilityLabel', this.autoShow ? null : buttonDescription);
	},

	/**
	* @private
	*/
	handleButtonTap: function (sender, ev) {
		this.doApplicationClose();
	}
});

},{'../i18n':'moonstone/i18n'}],'moonstone/Dialog':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Dialog~Dialog} kind.
* @module moonstone/Dialog
*/

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	ContentAreaSupport = require('enyo/ContentAreaSupport'),
	Control = require('enyo/Control');

var
	$L = require('../i18n'),
	Popup = require('../Popup'),
	IconButton = require('../IconButton'),
	BodyText = require('../BodyText'),
	HistorySupport = require('../HistorySupport'),
	Marquee = require('../Marquee'),
	MarqueeText = Marquee.Text,
	MarqueeSupport = Marquee.Support;

/**
* {@link module:moonstone/Dialog~Dialog} is a {@link module:moonstone/Popup~Popup} with a title, a subtitle, a
* message, and an area for additional controls.
*
* @class Dialog
* @extends module:moonstone/Popup~Popup
* @mixes module:moonstone/MarqueeSupport~MarqueeSupport
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Dialog~Dialog.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Dialog',

	/**
	* @private
	*/
	kind: Popup,

	/**
	* @private
	*/
	classes: 'moon-dialog',

	/**
	* @private
	* @lends module:moonstone/Dialog~Dialog.prototype
	*/
	published: {

		/**
		* The title for the dialog.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		title: '',

		/**
		* The subtitle for the dialog.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		subTitle: '',

		/**
		* Should the dialog use a divider line to separate the titles from the dialog body?
		*
		* @type {String}
		* @default false
		* @public
		*/
		useDivider: false,

		/**
		* The message for the dialog. May either be a string or component configuration block.
		*
		* @type {String|Object[]}
		* @default ''
		* @public
		*/
		message: '',

		/**
		* When `true`, the title text will have locale-safe uppercasing applied.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		uppercase: true,

		/**
		* @deprecated Replaced by [uppercase]{@link module:moonstone/Dialog~Dialog#uppercase}.
		*
		* Formerly defaulted to `true`, now defaults to `null` and will only have
		* an effect when explicitly set (for complete backward compatibility).
		*
		* @type {Boolean}
		* @default null
		* @public
		*/
		titleUpperCase: null
	},

	/**
	* @private
	*/
	mixins: [MarqueeSupport, HistorySupport, ContentAreaSupport],

	/**
	* @private
	*/
	marqueeOnSpotlight: false,

	/**
	* @private
	*/
	marqueeOnHover: true,

	/**
	* @private
	*/
	marqueeOnRender: true,

	/**
	* @private
	*/
	marqueeOnRenderDelay: 5000,

	/**
	* When {@link module:moonstone/Dialog~Dialog#message} is a string, it will be set as content
	* within a component configured by this member.
	*
	* @type {Object}
	* @protected
	*/
	bodyConfig: {name: 'messageBody', kind: BodyText, classes: 'moon-dialog-content'},

	/**
	* @private
	*/
	tools: [
		{name: 'closeButton', kind: IconButton, icon: 'closex', classes: 'moon-popup-close', ontap: 'closePopup', accessibilityLabel: $L('Close'), backgroundOpacity: 'transparent', showing: false},
		{name: 'titleWrapper', classes: 'moon-dialog-title-wrapper', components: [
			{name: 'title', kind: MarqueeText, classes: 'moon-popup-header-text moon-dialog-title'},
			{name: 'subTitle', kind: Control, classes: 'moon-dialog-sub-title'}
		]},
		{name: 'message'},
		{name: 'client', kind: Control, classes: 'moon-hspacing moon-dialog-client'},
		{name: 'spotlightDummy', kind: Control, spotlight: false}
	],

	/**
	* @private
	*/
	contentAreas: [
		{target: 'message', content: '_messageBody'}
	],

	/**
	* @private
	*/
	create: function () {
		Popup.prototype.create.apply(this, arguments);

		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// the titleUpperCase property is fully deprecated and removed. The legacy
		// property takes precedence if it exists.
		if (this.titleUpperCase !== null) this.uppercase = this.titleUpperCase;

		this.titleChanged();
		this.subTitleChanged();
		this.useDividerChanged();
		this.messageChanged();
	},

	/**
	* @private
	*/
	titleChanged: function () {
		var title = this.get('title');
		// Logic so we don't show the divider and an empty title
		if (!title) {
			this.$.title.hide();
			this.$.titleWrapper.removeClass('use-divider');
		} else {
			this.$.title.show();
			this.useDividerChanged();
			this.$.title.set('content', this.get('uppercase') ? util.toUpperCase(title) : title );
		}
	},

	/**
	* @private
	*/
	uppercaseChanged: function () {
		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// titleUpperCase is fully deprecated and removed.
		if (this.titleUpperCase != this.uppercase) this.titleUpperCase = this.uppercase;
		this.titleChanged();
	},

	/**
	* @private
	*/
	titleUpperCaseChanged: function () {
		if (this.uppercase != this.titleUpperCase) this.uppercase = this.titleUpperCase;
		this.uppercaseChanged();
	},

	/**
	* @private
	*/
	subTitleChanged: function () {
		// Technically we shouldn't show the subtitle if there's no title, but this is an edge case for the app developer
		this.$.subTitle.set('showing', !!this.subTitle);
		if (!this.subTitle) return;
		this.$.subTitle.set('content', this.subTitle);
	},

	/**
	* @private
	*/
	useDividerChanged: function () {
		this.$.titleWrapper.addRemoveClass('use-divider', this.get('useDivider'));
	},

	/**
	* If `message` is a string, we want it to be BodyText. Otherwise, it can pass through with the
	* user-defined kinds.
	*
	* @private
	*/
	messageChanged: function () {
		var body = this.message;
		if (this.message && util.isString(this.message)) {
			// optimization - it's a string and the previous value was a string too. no need to
			// rerender, just update the content and return.
			if (this.$.messageBody) {
				this.$.messageBody.set('content', this.message);
				return;
			}
			// it's a string and wasn't before or we haven't set it up yet, set up the BodyText
			else {
				body = util.clone(this.bodyConfig);
				body.content = this.message;
				body.owner = this;
			}
		}
		this.set('_messageBody', body);
	},

	ariaObservers: [
		{from: 'generated', method: function () {
			if (!this.generated) return;

			this.setAriaAttribute('aria-labelledBy',
				this.$.title.id + ' ' +
				this.$.subTitle.id + ' ' +
				this.$.message.id + ' ' +
				this.$.client.id
			);
		}}
	]
});

},{'../i18n':'moonstone/i18n','../Popup':'moonstone/Popup','../IconButton':'moonstone/IconButton','../BodyText':'moonstone/BodyText','../HistorySupport':'moonstone/HistorySupport','../Marquee':'moonstone/Marquee'}],'moonstone/ToggleItem':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ToggleItem~ToggleItem} kind.
* @module moonstone/ToggleItem
*/

var
	kind = require('enyo/kind');

var
	CheckboxItem = require('../CheckboxItem'),
	ToggleSwitch = require('../ToggleSwitch');

/**
* {@link module:moonstone/ToggleItem~ToggleItem} is a control that combines a {@link module:moonstone/ToggleSwitch~ToggleSwitch}
* with a text label.
*
* @class ToggleItem
* @extends module:moonstone/CheckboxItem~CheckboxItem
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ToggleItem~ToggleItem.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ToggleItem',

	/**
	* @private
	*/
	kind: CheckboxItem,

	/**
	* @private
	*/
	icon: 'circle',

	/**
	* @private
	*/
	classes: 'moon-toggle-item',

	/**
	* @private
	*/
	checkboxOnRight: true,

	/**
	* @private
	*/
	componentOverrides: {
		client: {classes: 'moon-toggle-item-label-wrapper'},
		input: {kind: ToggleSwitch, spotlight: false}
	}
});

},{'../CheckboxItem':'moonstone/CheckboxItem','../ToggleSwitch':'moonstone/ToggleSwitch'}],'moonstone/FormCheckbox':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/FormCheckbox~FormCheckbox} kind.
* @module moonstone/FormCheckbox
*/

var
	kind = require('enyo/kind');

var
	CheckboxItem = require('../CheckboxItem');

/**
* {@link module:moonstone/FormCheckbox~FormCheckbox} is a labeled checkbox
* designed for use in form layouts. Unlike {@link module:moonstone/CheckboxItem~CheckboxItem},
* which it extends, `moonstone/FormCheckbox` provides a circular "hit target"
* that is always visible, regardless of whether the checkbox is currently checked.
*
* @class FormCheckbox
* @extends module:moonstone/CheckboxItem~CheckboxItem
* @ui
* @public
*/

module.exports = kind(
	/** @lends module:moonstone/FormCheckbox~FormCheckbox.prototype */ {

	/**
	* @private
	*/
	name: 'moon.FormCheckbox',

	/**
	* @private
	*/
	kind: CheckboxItem,

	/**
	* @private
	*/
	classes: 'moon-formcheckbox-item'
});

},{'../CheckboxItem':'moonstone/CheckboxItem'}],'moonstone/ExpandableListItem/ExpandableListItemHeader':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/ExpandableListItem/ExpandableListItemHeader~ExpandableListItemHeader} kind.
* @module moonstone/ExpandableListItem/ExpandableListItemHeader
*/

var
	kind = require('enyo/kind'),
	Component = require('enyo/Component');

var
	Marquee = require('../Marquee'),
	LabeledTextItem = require('../LabeledTextItem');

/**
* @class ExpandableListItemHeader
* @extends module:moonstone/LabeledTextItem~LabeledTextItem
* @ui
* @private
*/
module.exports = kind(
	/** @lends module:moonstone/ExpandableListItem/ExpandableListItemHeader~ExpandableListItemHeader.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ExpandableListItemHeader',

	/**
	* @private
	*/
	kind: LabeledTextItem,

	/**
	* When `true`, the value of {@link module:moonstone/LabeledTextItem~LabeledTextItem#text}
	* will be displayed
	*
	* @type {Boolean}
	* @default true
	* @public
	*/
	textShowing: true,

	/**
	* @private
	*/
	bindings: [
		{from: 'textShowing', to: '$.text.showing'},
		{from: 'allowHtml', to: '$.text.allowHtml'}
	],

	/**
	* @private
	*/
	initComponents: function () {
		this.kindComponents = Component.overrideComponents(this.kindComponents, {text: {kind: Marquee.Text}});
		LabeledTextItem.prototype.initComponents.apply(this, arguments);
	},

	// Accessibility

	/**
	* @private
	*/	
	ariaObservers: [
		{from: 'textShowing', method: function () {
			this.$.text.set('accessibilityDisabled', !this.textShowing);
		}}
	]
});

},{'../Marquee':'moonstone/Marquee','../LabeledTextItem':'moonstone/LabeledTextItem'}],'moonstone/ImageItem':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ImageItem~ImageItem} kind.
* @module moonstone/ImageItem
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control'),
	Img = require('enyo/Image');

var
	Item = require('../Item'),
	LabeledTextItem = require('../LabeledTextItem');

/**
* {@link module:moonstone/ImageItem~ImageItem}, which derives from {@link module:moonstone/Item~Item}, is a control that combines an
* {@link module:enyo/Image~Image} with a {@link module:moonstone/LabeledTextItem~LabeledTextItem}. By default, the image is displayed to
* the left of the text; to display the image on the right, set
* [imageAlignRight]{@link module:moonstone/ImageItem~ImageItem#imageAlignRight} to `true`.
*
* @class ImageItem
* @extends module:moonstone/Item~Item
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ImageItem~ImageItem.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ImageItem',

	/**
	* @private
	*/
	classes: 'moon-imageitem',

	/**
	* @private
	*/
	kind: Item,

	/**
	* @private
	*/
	components:[
		{name: 'image', kind: Img},
		{name: 'textItem', kind: LabeledTextItem, spotlight: false}
	],

	/**
	* @private
	* @lends module:moonstone/ImageItem~ImageItem.prototype
	*/
	published: {

		/**
		* The absolute URL path to the image.
		*
		* @type {String|module:enyo/resolution#selectSrc~src}
		* @default ''
		* @public
		*/
		source: '',

		/**
		* The label to be displayed along with the text.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		label: '',

		/**
		* The text to be displayed in the item.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		text: '',

		/**
		* Set to `true` to align image to right of text.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		imageAlignRight: false
	},

	/**
	* @private
	*/
	bindings: [
		{from: 'allowHtml', to: '$.textItem.allowHtml'},
		{from: 'source', to: '$.image.src'}
	],

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.labelChanged();
		this.textChanged();
		this.imageAlignRightChanged();
	},

	/**
	* @private
	*/
	labelChanged: function () {
		this.$.textItem.setLabel(this.label);
	},

	/**
	* @private
	*/
	textChanged: function () {
		this.$.textItem.setText(this.text);
	},

	/**
	* @private
	*/
	imageAlignRightChanged: function () {
		this.addRemoveClass('align-right', this.imageAlignRight);
	},

	// Accessibility

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['label', 'text', 'accessibilityHint', 'accessibilityLabel'], method: function () {
			var content = this.label + ' ' + this.text ,
				prefix = this.accessibilityLabel || content || null,
				label = this.accessibilityHint && prefix && (prefix + ' ' + this.accessibilityHint) ||
						this.accessibilityHint ||
						this.accessibilityLabel ||
						null;

				this.setAriaAttribute('aria-label', label);
		}}
	]
});

},{'../Item':'moonstone/Item','../LabeledTextItem':'moonstone/LabeledTextItem'}],'moonstone/RadioItem':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/RadioItem~RadioItem} kind.
* @module moonstone/RadioItem
*/

var
	kind = require('enyo/kind');

var
	SelectableItem = require('../SelectableItem');

/**
* {@link module:moonstone/RadioItem~RadioItem} is a modified {@link module:moonstone/Item~Item} designed for use inside
* a {@link module:moonstone/RadioItemGroup~RadioItemGroup}.
*
* For more information, see the documentation on
* [Radio Items]{@linkplain $dev-guide/building-apps/controls/radio-items.html}
* in the Enyo Developer Guide.
*
* @class RadioItem
* @extends module:moonstone/SelectableItem~SelectableItem
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/RadioItem~RadioItem.prototype */ {

	/**
	* @private
	*/
	name: 'moon.RadioItem',

	/**
	* @private
	*/
	kind: SelectableItem,

	/**
	* @private
	*/
	create: function() {
		SelectableItem.prototype.create.apply(this, arguments);
		this.removeClass('moon-selectable-item');
		this.addClass('moon-radio-item');
	}
});

},{'../SelectableItem':'moonstone/SelectableItem'}],'moonstone/AudioPlayback':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/AudioPlayback~AudioPlayback}
* kind.
* @wip
* @module moonstone/AudioPlayback
*/

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	EnyoAudio = require('enyo/Audio'),
	Signals = require('enyo/Signals'),
	EventEmitter = require('enyo/EventEmitter');


var
	Drawer = require('moonstone/Drawers').Drawer,
	IconButton = require('moonstone/IconButton'),
	MoonImage = require('moonstone/Image'),
	Slider = require('moonstone/Slider'),
	Marquee = require('moonstone/Marquee');

/**
* Fires when an audio track is added to the list
*
* @event module:moonstone/AudioPlayback~AudioPlayback#onAddAudio
* @type {Object}
* @property {Object} tracks - contains a reference to the collection of tracks
* @public
*/

/**
* Fires when an audio list item is to be removed. The list event data is passed through.
* TODO: When fixed with right list component be sure to link to event data.
*
* @event module:moonstone/AudioPlayback~AudioPlayback#onRemove
* @type {Object}
* @public
*/

/**
* {@link module:moonstone/AudioPlayback~AudioPlayback} is meant to be used
* with {@link module:moonstone/Drawers~Drawers}. It extends
* {@link module:moonstone/Drawers/Drawer~Drawer} by adding an audio playback control
* and playlist for the imported audio.
*
* ```
* var
* 	kind = require('enyo/kind'),
* 	AudioPlayback = require('moonstone/AudioPlayback'),
* 	Drawers = require('moonstone/Drawers');
*
* {kind: Drawers,
* 	drawers: [
* 		{kind: AudioPlayback}
* 	],
* 	components: [
*			{content: 'Page Content'}
* 	]
* }
* ```
*
* @class AudioPlayback
* @extends module:moonstone/Drawers~Drawer
* @ui
* @wip
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/AudioPlayback~AudioPlayback.prototype */ {

	/**
	* @private
	*/
	name: 'moon.AudioPlayback',

	/**
	* @private
	*/
	kind: Drawer,

	/**
	* @private
	*/
	mixins: [ EventEmitter ],

	/**
	* @private
	*/
	classes: 'moon-audio-playback',

	/**
	* @private
	*/
	open: false,

	/**
	* @private
	*/
	controlsOpen: false,

	/**
	* @private
	*/
	controlDrawerComponents:[],

	/**
	* @private
	*/
	playheadJob: null,

	/**
	* @protected
	*/
	playheadUpdateInterval: 200,

	/**
	* @private
	*/
	previewMode: false,

	/**
	* @private
	*/
	model: null,

	/**
	* @private
	* @lends module:moonstone/AudioPlayback~AudioPlayback.prototype
	*/
	published: {
		/**
		* When 'false', audio player doesn't respond to remote controller
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		handleRemoteControlKey: true,

		/**
		* When 'true', update current time on every drag or key event on slider.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		liveSeekMode: false,

		/**
		* Amount of increment (in percentage) on seek by 5way key press.
		*
		* @type {number}
		* @default 5
		* @public
		*/
		increment: 5,

		/**
		* Amount of time (in seconds) to jump in response to jump buttons. This value is ignored
		* when [jumpStartEnd]{@link module:moonstone/VideoPlayer~VideoPlayer#jumpStartEnd}
		* is `true`.
		*
		* @type {Number}
		* @default 3
		* @public
		*/
		jumpSec: 3,

		/**
		* If `true`, the "jump forward" and "jump back" buttons jump to the start and end of the
		* video, respectively.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		jumpStartEnd: false,

		/**
		* If `false`, the "jump forward" and "jump back" buttons are hidden.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		showJumpControls: true,

		/**
		* When `true`, the fast-forward and rewind buttons are visible.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		showFFRewindControls: true,

		/**
		* If `true`, the slider is disabled and will not be enabled when video data has
		* loaded.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disableSlider: false,

		/**
		* If `true`, the slider and playback controls are disabled. If the user taps the
		* controls, an
		* [onPlaybackControlsTapped]{@link module:moonstone/VideoPlayer~VideoPlayer#onPlaybackControlsTapped}
		* event will be bubbled.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disablePlaybackControls: false,

		/**
		* When `true`, playback controls are hidden when the slider is hovered over.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		hideButtonsOnSlider: false,

		/**
		* Default hash of playback states and their associated playback rates.
		*
		* @type {Object}
		* @default
		*	fastForward: ['2', '4', '8', '16'],
		*	rewind: ['-2', '-4', '-8', '-16'],
		*	slowForward: ['1/4', '1/2'],
		*	slowRewind: ['-1/2', '-1']
		* @public
		*/
		playbackRateHash: {
			fastForward: ['2', '4', '8', '16'],
			rewind: ['-2', '-4', '-8', '-16'],
			slowForward: ['1/4', '1/2', '1'],
			slowRewind: ['-1/2', '-1']
		}
	},

	/**
	* @private
	*/
	mediaComponents: [
		{name: 'media', kind: EnyoAudio, onStart: 'onPlayStart', onEnded: 'onPlayEnd', onError: 'onPlayError',
			onSlowforward: 'updateFeedback', onFastforward: 'updateFeedback', onSlowrewind: 'updateFeedback', onRewind: 'updateFeedback', onPlay: 'updateFeedback'},
		{kind: Signals, onkeyup: 'remoteKeyHandler', onSpotlightModeChanged: 'spotlightModeChanged'},
		{name: 'playbackControls', rtl: false, spotlight: 'container', classes: 'moon-audio-playback-top moon-hspacing', components: [
			{name: 'trackIcon', kind: MoonImage, sizing: 'cover', classes: 'moon-audio-track-icon'},
			{name: 'trackInfo', mixins: [ Marquee.Support ], marqueeOnRender: true, classes: 'moon-audio-track-info', components: [
				{name: 'trackName', publish: true, kind: Marquee.Text, classes: 'moon-audio-playback-track'},
				{name: 'artistName', publish: true, kind: Marquee.Text, classes: 'moon-audio-playback-artist'}
			]},
			{name: 'commandControls', classes: 'moon-audio-control-buttons', components: [
				{name: 'btnJumpBackward', kind: IconButton, publish: true, icon: 'skipbackward', small: false, command: 'jumpBackward', classes: 'moon-audio-icon-button left', ontap: 'commandHandler', onholdpulse: 'holdBackwardHandler', onrelease: 'releaseHandler'},
				{name: 'btnRewind', kind: IconButton, publish: true, icon: 'backward', small: false, command: 'rewind', classes: 'moon-audio-icon-button left', ontap: 'commandHandler'},
				{name: 'btnPlay',  kind: IconButton, publish: true, icon: 'play', small: false, command: 'togglePlay', classes: 'moon-audio-icon-button left', ontap: 'commandHandler'},
				{name: 'btnFastForward', kind: IconButton, publish: true, icon: 'forward', small: false, command: 'fastForward', classes: 'moon-audio-icon-button left', ontap: 'commandHandler'},
				{name: 'btnJumpForward', kind: IconButton, publish: true, icon: 'skipforward', small: false, command: 'jumpForward', classes: 'moon-audio-icon-button left', ontap: 'commandHandler', onholdpulse: 'holdForwardHandler', onrelease: 'releaseHandler'}
			]},
			{name: 'moreControls', classes: 'moon-audio-more-buttons moon-hspacing'}
		]},
		{rtl: false, classes: 'moon-audio-playback-bottom', components: [
			{kind: Slider, name: 'slider', classes: 'moon-audio-slider',
			knobClasses: 'moon-audio-slider-knob', bgBarClasses: 'moon-audio-slider-bg-bar',
			barClasses: 'moon-audio-slider-bar-bar', tapAreaClasses: 'moon-audio-slider-taparea',
			rtl: false, noPopup: true, lockBar: true, onChanging: 'sliderChanging', onAnimateFinish: 'sliderChanging',
			onmove: 'preview', onenter: 'enterTapArea', onleave: 'leaveTapArea'},
			{name: 'timePlayed', classes: 'moon-audio-play-time left', content: '0:00'},
			{name: 'timeRemaining', classes: 'moon-audio-play-time right', content: '0:00'}
		]}
	],

	/**
	* @private
	*/
	observers: [
		{method: 'modelChanged', path: ['model']}
	],

	/**
	* @private
	*/
	bindings: [
		{from: 'autoplay', to: '$.media.autoplay'},
		{from: '$.media.src', to: 'src'}, // This is for detecting media src status from playback
		{from: 'showJumpControls', to: '$.btnJumpBackward.showing'},
		{from: 'showJumpControls', to: '$.btnJumpForward.showing'},
		{from: 'showFFRewindControls', to: '$.btnRewind.showing'},
		{from: 'showFFRewindControls', to: '$.btnFastForward.showing'},
		{from: 'disableSlider', to: '$.slider.disabled'},
		{from: 'disablePlaybackControls', to: '$.btnJumpBackward.disabled'},
		{from: 'disablePlaybackControls', to: '$.btnJumpForward.disabled'},
		{from: 'disablePlaybackControls', to: '$.btnRewind.disabled'},
		{from: 'disablePlaybackControls', to: '$.btnFastForward.disabled'},
		{from: 'disablePlaybackControls', to: '$.btnPlay.disabled'},
		{from: 'jumpSec', to: '$.media.jumpSec'},
		{from: 'increment', to: '$.slider.increment'}
	],

	/**
	* @private
	*/
	create: function () {
		this.inherited(arguments);
		this.$.controlDrawer.createComponents(this.mediaComponents, {owner: this});
		if (this.moreComponents) {
			var owner = this.hasOwnProperty('moreComponents') ? this.getInstanceOwner() : this;
			this.$.moreControls.createComponents(this.moreComponents, {owner: owner, ontap: 'commandHandler'});
		}
		this.playbackRateHashChanged();
		this.enable5waySeek();
	},

	/**
	* Enable seek by left and right key press on slider
	* @private
	*/
	enable5waySeek: function () {
		this.$.slider.spotFocused = utils.nop;
		this.$.slider.spotSelect = utils.nop;
		this.$.slider.spotBlur = utils.nop;
		this.$.slider.selected = true;
	},

	/**
	* Facade playbackRateHash.
	* @private
	*/
	playbackRateHashChanged: function() {
		this.$.media.playbackRateHash = this.playbackRateHash;
	},

	/** preview mode */

	/**
	* @private
	*/
	enterTapArea: function (sender, ev) {
		if (ev.originator.name == 'tapArea') {
			this.startPreview();
			if (!this.$.slider.disabled && this.hideButtonsOnSlider) {
				this.$.playbackControls.set('showing', false);
			}
		}
	},

	/**
	* @private
	*/
	leaveTapArea: function (sender, ev) {
		if (ev.originator.name == 'tapArea') {
			this.endPreview();
			if (!this.$.slider.disabled && this.hideButtonsOnSlider) {
				this.$.playbackControls.set('showing', true);
			}
		}
	},

	/**
	* @private
	*/
	startPreview: function () {
		this.previewMode = true;
	},

	/**
	* @private
	*/
	endPreview: function () {
		this.previewMode = false;
		this.updatePlayhead();
	},

	/**
	* @private
	*/
	preview: function (sender, ev) {
		if (!this.$.slider.disabled) {
			if (!this.previewMode) {
				this.startPreview();
			}
			this.previewPos = this.$.slider.calcKnobPosition(ev);
			this.updatePlayhead();
		}
	},

	/**
	* Force end preview mode when user press 5way while dragging
	* @private
	*/
	spotlightModeChanged: function (sender, ev) {
		if (this.dragging && !ev.pointerMode) {
			this.endPreview();
			this.updatePlayhead();
		}
	},

	/**
	* @private
	*/
	startPlayheadJob: function () {
		if (this.playheadJob === null) {
			this.playheadJob = setInterval(this.bindSafely('updatePlayhead'), this.playheadUpdateInterval);
		}
	},

	/**
	* @private
	*/
	endPlayheadJob: function () {
		clearInterval(this.playheadJob);
		this.playheadJob = null;
		this.updatePlayhead();
	},

	/**
	* Setup playing property
	*
	* Use this property to show now playing item on datalist
	*
	* @private
	*/
	modelChanged: function (prev, curr) {
		if (prev) prev.set('playing', false);
		if (curr) {
			curr.set('playing', true);
			this.setTrack(curr.get('src'), curr.get('albumArt'), curr.get('trackName'), curr.get('artistName'));
		} else {
			this.setTrack('', '', '', '');
		}
		this.emit('trackChanged', {prev: prev, current: curr});
	},

	/**
	* Update disabled status from src
	*
	* @private
	*/
	srcChanged: function (prev, curr) {
		this.set('disableSlider', !curr);
		this.set('disablePlaybackControls', !curr);
	},

	/**
	* @public
	*/
	getDuration: function () {
		return this.$.media.getDuration();
	},

	/**
	* @public
	*/
	getCurrentTime: function () {
		return this.$.media.getCurrentTime();
	},

	/**
	* @private
	*/
	updatePlayhead: function () {
		var totalTime = this.getDuration(),
			currentTime = this.getCurrentTime(),
			bufferTime = this.getBufferedTime(),
			playheadPos, bufferheadPos;

		totalTime = isNaN(totalTime) ? 0 : totalTime;
		currentTime = isNaN(currentTime) ? 0 : currentTime;

		playheadPos = (!totalTime) ? 0 : (currentTime * 100) / totalTime;
		bufferheadPos = (!bufferTime) ? 0 : (bufferTime * 100) / totalTime;

		this.$.slider.set('progress', playheadPos);
		this.$.slider.set('bgProgress', bufferheadPos);

		// Calculate currentTime from cursor position in previewMode
		if (!this.$.slider.disabled && this.previewMode) {
			playheadPos = this.previewPos;
			currentTime = (playheadPos / 100) * totalTime;
		}

		this.updatePlayTime(this.toReadableTime(currentTime), this.toReadableTime(totalTime));
		this.$.slider.updateKnobPosition(playheadPos);
	},

	/**
	* @private
	*/
	getBufferedTime: function() {
		var bufferData = this.$.media.getBuffered(),
			numberOfBuffers = bufferData.length,
			highestBufferPoint = 0,
			duration = this.getDuration() || 0,
			endPoint = 0,
			i
		;

		if (!duration || isNaN(duration)) {
			return 0;
		}

		// Find furthest along buffer end point and use that (only supporting one buffer range for now)
		for (i = 0; i < numberOfBuffers; i++) {
			endPoint = bufferData.end(i);
			highestBufferPoint = (endPoint > highestBufferPoint) ? endPoint : highestBufferPoint;
		}
		return highestBufferPoint;
	},

	/**
	* @private
	*/
	updatePlayTime: function (start, end) {
		this.$.timePlayed.set('content', start);
		this.$.timeRemaining.set('content', end);
	},

	/**
	* @private
	*/
	sliderChanging: function (sender, ev) {
		if (!this.liveSeekMode && ev.type == 'onChanging') return;
		var totalTime = this.getDuration();
		var currentTime = (totalTime / 100) * ev.value;
		this.updatePlayTime(this.toReadableTime(currentTime), this.toReadableTime(totalTime));
		this.seekTo(currentTime);
	},


	/**
	* Setup track information.
	* Use model to set media instead of this.
	*
	* @private
	*/
	setTrack: function (src, albumArt, trackName, artistName) {
		this.$.media.set('src', src);
		this.$.trackIcon.set('src', albumArt);
		this.$.trackName.set('content', trackName);
		this.$.artistName.set('content', artistName);
		this.updatePlayhead();
		this.updatePlayTime('0:00', '0:00');
		this.$.btnPlay.set('icon', 'play');
	},



	/*******      Public APIs      ******/


	/**
	* pauses audio if is playing, and plays it if it is paused
	*
	* @public
	*/
	togglePlay: function () {
		if (!this.$.media.getPaused()) {
			this.pause();
		} else {
			this.play();
		}
	},

	/**
	* plays audio
	*
	* @public
	*/
	play: function () {
		if (!this.$.media.get('src')) return;
		this.$.media.play();
		this.startPlayheadJob();
		this.$.btnPlay.set('icon', 'pause');
	},

	/**
	* pauses audio
	*
	* @public
	*/
	pause: function () {
		if (!this.$.media.get('src')) return;
		this.$.media.pause();
		this.endPlayheadJob();
		this.$.btnPlay.set('icon', 'play');
	},

	/**
	* stop audio
	*
	* @public
	*/
	stop: function () {
		if (!this.$.media.get('src')) return;
		this.$.media.pause();
		this.seekTo(0);
		this.endPlayheadJob();
		this.updatePlayhead();
		this.$.btnPlay.set('icon', 'play');
	},

	/**
	* seek position
	*
	* @public
	*/
	seekTo: function (value) {
		this.$.media.seekTo(value);
	},

	/**
	* plays the track previous to current track
	*
	* @public
	*/
	rewind: function () {
		if (!this.$.media.get('src')) return;
		this.$.btnPlay.set('icon', 'play');
		this.$.media.rewind();
		this.startPlayheadJob();
	},

	/**
	* plays the track after the current track
	*
	* @public
	*/
	fastForward: function () {
		if (!this.$.media.get('src')) return;
		this.$.btnPlay.set('icon', 'pause'); // Fix-me: rewind and fastForward behavior is different.
		this.$.media.fastForward();
		this.startPlayheadJob();
	},

	/**
	* @public
	*/
	jumpBackward: function(sender, e) {
		if (!this.$.media.get('src')) return;
		if (this.jumpStartEnd) {
			this.jumpToStart(sender, e);
		} else {
			if (!sender._holding || (sender._holding && sender._sentHold !== true)) {
				this._jumpBackward(sender, e);
			}
			sender._holding = false;
		}
	},

	/**
	* @public
	*/
	jumpForward: function(sender, e) {
		if (!this.$.media.get('src')) return;
		if (this.jumpStartEnd) {
			this.jumpToEnd(sender, e);
		} else {
			if (!sender._holding || (sender._holding && sender._sentHold !== true)) {
				this._jumpForward(sender, e);
			}
			sender._holding = false;
		}
	},

	/**
	* Jumps to beginning of media [source]{@link module:moonstone/VideoPlayer~VideoPlayer#src}
	* and sets [playbackRate]{@link module:enyo/Video~Video#playbackRate} to `1`.
	*
	* @public
	*/
	jumpToStart: function() {
		if (!this.$.media.get('src')) return;
		this.$.media.jumpToStart();
		this.pause();
	},

	/**
	* Jumps to end of media [source]{@link module:moonstone/VideoPlayer~VideoPlayer#src}
	* and sets [playbackRate]{@link module:enyo/Video~Video#playbackRate} to `1`.
	*
	* @public
	*/
	jumpToEnd: function() {
		if (!this.$.media.get('src')) return;
		this.$.media.jumpToEnd();
		this.pause();
	},

	/********      Private functions      *******/

	/**
	* @private
	*/
	_jumpBackward: function (sender, e) {
		this.$.media.jumpBackward();
		if (this.$.media.isPaused()) this.updatePlayhead();	// Force update playhead
	},

	/**
	* @private
	*/
	_jumpForward: function (sender, e) {
		this.$.media.jumpForward();
		if (this.$.media.isPaused()) this.updatePlayhead();	// Force update playhead
	},

	/**
	* @private
	*/
	_holdPulseThreadhold: 400,

	/**
	* @private
	*/
	_holding: false,

	/**
	* @private
	*/
	_sentHold: false,

	/**
	* @private
	*/
	holdBackwardHandler: function (sender, e) {
		if (!this.jumpStartEnd) {
			if (e.holdTime > this._holdPulseThreadhold) {
				if (sender._sentHold !== true) {
					this.jumpToStart(sender, e);
					sender._sentHold = true;
					return true;
				}
			} else {
				sender._holding = true;
				sender._sentHold = false;
			}
		}
	},

	/**
	* @private
	*/
	holdForwardHandler: function (sender, e) {
		if (!this.jumpStartEnd) {
			if (e.holdTime > this._holdPulseThreadhold) {
				if (sender._sentHold !== true) {
					this.jumpToEnd(sender, e);
					sender._sentHold = true;
					return true;
				}
			} else {
				sender._holding = true;
				sender._sentHold = false;
			}
		}
	},

	/**
	* @private
	*/
	releaseHandler: function (sender, e) {
		if (sender._sentHold && sender._sentHold === true) sender._sentHold = false;
	},



	/********    Protected functions    *******/

	/**
	* Convert time to readable format
	*
	* @protected
	*/
	toReadableTime: function (sec) {
		var minutes = Math.floor(sec / 60).toString();
		var seconds = Math.floor(sec - minutes * 60).toString();
		if (seconds < 10) {
			seconds = '0' + seconds;
		} else if (seconds.length === 1) {
			seconds += '0';
		}
		return minutes + ':' + seconds;
	},

	/**
	* @protected
	*/
	remoteKeyHandler: function (sender, ev) {
		var command;
		if (this.handleRemoteControlKey) {
			switch (ev.keySymbol) {
				case 'playpause':
					command = 'togglePlay';
					break;
				case 'rewind':
					command = 'rewind';
					break;
				case 'fastforward':
					command = 'fastForward';
					break;
				default:
					command = ev.keySymbol;
					break;
			}
			this.commandHandler(utils.mixin(sender, {command: command}), ev );
		}
		return true;
	},

	/**
	* Decide behavior of playback command.
	* User can simply give command property on their button to change the behavior.
	*
	* @protected
	*/
	commandHandler: function (sender, ev) {
		var command = sender.command;
		if (this[command]) this[command](sender, ev);
		return true;
	},

	/**
	* Stop if reached start while rewind
	* @protected
	*/
	onPlayStart: function (sender, ev) {
		if (sender.getPlaybackRate() < 0) {
			this.pause();
		}
	},

	/**
	* Stop when play ends
	* @protected
	*/
	onPlayEnd: function (sender, ev) {
		this.pause();
	},

	/**
	* Handling error
	* @protected
	*/
	onPlayError: function(sender, ev) {
		this.warn(ev);
	}
});

}],'moonstone/GridListImageItem':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/GridListImageItem~GridListImageItem} kind.
* @module moonstone/GridListImageItem
*/

var
	kind = require('enyo/kind'),
	EnyoImage = require('enyo/Image');

var
	GridListImageItem = require('layout/GridListImageItem');

var
	Img = require('../Image'),
	Marquee = require('../Marquee'),
	MarqueeSupport = Marquee.Support,
	MarqueeText = Marquee.Text,
	Overlay = require('../Overlay');

/**
* {@link module:moonstone/GridListImageItem~GridListImageItem} extends {@link module:layout/GridListImageItem~GridListImageItem}, adding
* Moonstone-specific configuration, styling, decorators, and focus-state management.
*
* You may create an image grid by adding instances of this kind as components of a
* {@link module:moonstone/DataGridList~DataGridList}.
*
* @class GridListImageItem
* @extends module:layout/GridListImageItem~GridListImageItem
* @mixes module:moonstone/MarqueeSupport~MarqueeSupport
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/GridListImageItem~GridListImageItem.prototype */ {

	/**
	* @private
	*/
	name: 'moon.GridListImageItem',

	/**
	* @private
	*/
	kind: GridListImageItem,

	/**
	* @private
	*/
	mixins: [MarqueeSupport, Overlay.Container],

	/**
	* @private
	*/
	overlayTarget: 'image',

	/**
	* Placeholder image used while [source]{@link module:moonstone/GridListImageItem~GridListImageItem#source} is loaded
	*
	* @see module:enyo/Image~Image#placeholder
	* @type {String}
	* @default module:enyo/Image~Image#placeholder
	* @public
	*/
	placeholder: EnyoImage.placeholder,

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	*/
	centered: true,

	/**
	* @private
	*/
	classes: 'moon-gridlist-imageitem',

	/**
	* @private
	*/
	componentOverrides: {
		caption: {kind: MarqueeText},
		subCaption: {kind: MarqueeText},
		image: {kind: Img}
	},

	/**
	* @private
	*/
	bindings: [
		{from: '.allowHtml', to: '.$.caption.allowHtml'},
		{from: '.allowHtml', to: '.$.subCaption.allowHtml'}
	],

	/**
	* @private
	*/
	handlers: {
		onSpotlightFocused: 'focused'
	},

	/**
	* @fires module:moonstone/Scroller~Scroller#onRequestScrollIntoView
	* @private
	*/
	focused: function (inSender, inEvent) {
		if (inEvent.originator === this) {
			this.bubble('onRequestScrollIntoView');
		}
	},

	// Accessibility

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['caption', 'subCaption', 'accessibilityHint', 'accessibilityLabel'], method: function () {
			var content = this.caption + ' ' + this.subCaption,
				prefix = this.accessibilityLabel || content || null,
				label = this.accessibilityHint && prefix && (prefix + ' ' + this.accessibilityHint) ||
						this.accessibilityHint ||
						this.accessibilityLabel ||
						null;

				this.setAriaAttribute('aria-label', label);
		}}
	]
});

},{'../Image':'moonstone/Image','../Marquee':'moonstone/Marquee','../Overlay':'moonstone/Overlay'}],'moonstone/Scroller':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Scroller~Scroller}
* kind. On platforms with touch support, it will return
* {@link module:enyo/Scroller~Scroller}.
* @module moonstone/Scroller
*/

var
	kind = require('enyo/kind'),
	platform = require('enyo/platform'),
	Scroller = require('enyo/Scroller'),
	Signals = require('enyo/Signals');

var
	Spotlight = require('spotlight');

var
	ScrollStrategy = require('../ScrollStrategy');

/**
* On non-webOS touch platforms, revert to using Enyo scroller, which picks an appropriate
* scroll strategy for the given platform.
*
* @private
*/
if (platform.touch && !platform.webos) {
	module.exports = Scroller;
} else {
	/**
	* Fires when a control explicitly requests to be scrolled into view. Handled by the
	* [scroll strategy]{@link module:enyo/Scroller~Scroller#strategyKind}.
	*
	* @event module:moonstone/Scroller~Scroller#onRequestScrollIntoView
	* @type {Object}
	* @property {Boolean} scrollInPointerMode - Whether to allow scrolling in pointer mode.
	* @property {Boolean} scrollFullPage - If defined, overrides the scroller's
	*	[scrollFullPage]{@link module:moonstone/Scroller~Scroller#scrollFullPage} property.
	* @public
	*/

	/**
	* {@link module:moonstone/Scroller~Scroller} extends {@link module:enyo/Scroller~Scroller}, adding support for 5-way focus
	* (Spotlight) and pagination buttons.
	*
	* It responds when controls explicitly request to be scrolled into view by emitting the
	* [onRequestScrollIntoView]{@link module:enyo/Scroller~Scroller#onRequestScrollIntoView} event. This
	* typically happens when a control handles an `onSpotlightFocused` event, ensuring that
	* 5-way ({@glossary Spotlight}) focused controls remain in view.
	*
	* For more information, see the documentation on
	* [Scrollers]{@linkplain $dev-guide/building-apps/layout/scrollers.html} in the
	* Enyo Developer Guide.
	*
	* @class Scroller
	* @extends module:enyo/Scroller~Scroller
	* @ui
	* @public
	*/
	module.exports = kind(
		/** @lends module:moonstone/Scroller~Scroller.prototype */ {

		/**
		* @private
		*/
		name:      'moon.Scroller',

		/**
		* @private
		*/
		kind:      Scroller,

		/**
		* @private
		* @lends module:moonstone/Scroller~Scroller.prototype
		*/
		published: {

			/**
			* If `true`, when scrolling to focused child controls, the scroller will
			* scroll as far as possible, until its edge meets the next item's edge.
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			scrollFullPage: false,

			/**
			* If `true`, paging controls are focusable (in 5-way mode).  Normally, this
			* is not required, since the scroller will automatically scroll to ensure
			* most focusable items are in view.  It is intended to be used when the
			* scroller contents have no spotlightable controls, such as the case of a
			* scroller with a long body of text.
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			spotlightPagingControls: false,

			/**
			* If 'true', paging controls are hidden when content fit in scroller
			* even when spotlightPagingControls is true.
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			hideScrollColumnsWhenFit: false,

			/**
			* Relative parameter used to determine scroll speed.
			*
			* @type {Number}
			* @default 75
			* @public
			*/
			scrollInterval: 75,

			/**
			* The ratio of mousewheel 'delta' units to pixels scrolled. Increase this
			* value to increase the distance scrolled by the scroll wheel. Note that
			* mice/trackpads do not emit the same 'delta' units per 'notch' or flick of
			* the scroll wheel/trackpad; that can vary based on intensity and momentum.
			*
			*
			* @type {Number}
			* @default 2
			* @public
			*/
			scrollWheelMultiplier: 2,

			/**
			* The ratio of the maximum distance scrolled by each scroll wheel event to
			* the height/width of the viewport. Setting a value larger than `1` is not
			* advised, since a single scroll event could move more than one viewport's
			* worth of content (depending on the delta received), resulting in skipped
			* content.
			*
			* @type {Number}
			* @default 0.2
			* @public
			*/
			scrollWheelPageMultiplier: 0.2,

			/**
			* The ratio of the distance scrolled per tap of the paging button to the
			* height/width of the viewport. Setting a value larger than `1` is not
			* advised, since a paging button tap will move more than one viewport's
			* worth of content, resulting in skipped content.
			*
			*
			* @type {Number}
			* @default 0.8
			* @public
			*/
			paginationPageMultiplier: 0.8,

			/**
			* The ratio of continuous-scrolling delta units to pixels scrolled. Increase
			* this value to increase the distance scrolled when the pagination buttons
			* are held.
			*
			* @type {Number}
			* @default 8
			* @public
			*/
			paginationScrollMultiplier: 8,

			/**
			* When `true`, the scroll wheel moves spotlight focus up/down through the
			* scroller when in 5-way mode. (In pointer mode, the scroll wheel always
			* scrolls the viewport without modifying focus position.) When `false`, the
			* scroll wheel works the same in 5-way mode as in pointer mode, where the
			* wheel moves the position of the scroller viewport.
			*
			* @type {Boolean}
			* @default true
			* @public
			*/
			scrollWheelMovesFocus: true
		},

		/**
		* @private
		*/
		handlers: {
			onSpotlightScrollUp:'spotlightWheel',
			onSpotlightScrollDown:'spotlightWheel',
			onSpotlightContainerEnter:'enablePageUpDownKey',
			onSpotlightFocus: 'checkBounce',
			onSpotlightContainerLeave:'containerLeaveHandler',
			onenter:'enablePageUpDownKey',
			onleave:'disablePageUpDownKey',
			onmove:'move'
		},

		/**
		* Need this to prevent the web engine from adjusting the native
		* scrollTop / scrollLeft props behind our backs under certain
		* circumstances (when an element inside the scroller is
		* programatically focused).
		*
		* @private
		*/
		accessibilityPreventScroll: true,

		// The scrollToBoundary configuration parameters below
		// are considered private for now, but have been factored
		// this way and are sync'd with moonstone/ScrollStrategy so that
		// they can be changed in one place and could be overridden in case
		// of emergency.

		/**
		* @private
		*/
		scrollToBoundaryDelay: 100,

		/**
		* @private
		*/
		scrollToBoundaryAnimate: true,


		/**
		* If `true`, scroll events are not allowed to propagate.
		*
		* @private
		*/
		preventScrollPropagation: false,

		/**
		* If `true`, measure the size of the scroll columns on initial render.
		* See {@link module:moonstone/ScrollStrategy~ScrollStrategy#_measureScrollColumns} for details.
		*
		* @private
		*/
		measureScrollColumns: false,

		/**
		* Default to {@link module:moonstone/ScrollStrategy~ScrollStrategy}
		*
		* @private
		*/
		strategyKind: ScrollStrategy,

		/**
		* @private
		*/
		spotlight: 'container',

		/**
		* @private
		*/
		handlePageUpDownKey: false,

		/**
		* Scrolls until the specified [control]{@link module:enyo/Control~Control} is in view. If
		* `scrollFullPage` is set, scrolls until the edge of `control` is aligned with
		* the edge of the visible scroll area. Optional third parameter indicates
		* whether or not the scroll should be animated. If `setLastFocusedChild` is
		* `true`, scroller will set up `control` to be the spotted child when the
		* scroller is spotted.
		*
		* @param {Object} control - The [control]{@link module:enyo/Control~Control} to scroll into view.
		* @param {Boolean} [scrollFullPage] - If `true`, scrolls until the edge of `control`
		* is aligned with the edge of the visible scroll area. If `undefined`, the value in
		*	[scrollFullPage]{@link module:moonstone/Scroller~Scroller#scrollFullPage} is used.
		* @param {Boolean} [animate=true] - If `true`, animates the scroll.
		* @param {Boolean} [setLastFocusedChild=false] - If `true`, scroller will set up
		* `control` to be the spotted child when the scroller is spotted.
		* @public
		*/
		scrollToControl: function (control, scrollFullPage, animate, setLastFocusedChild) {
			if (setLastFocusedChild) {
				this.setLastFocusedChild(control);
			}
			this.$.strategy.animateToControl(control, scrollFullPage, animate);
		},

		/**
		* Scrolls to the specified `x` and `y` coordinates. The optional third parameter
		* may be set to `false` to disable animation for the scroll.
		*
		* @param {Number} x - Horizontal position in pixels
		* @param {Number} y - Vertical position in pixels
		* @param {Boolean} [animate=true] - If `true`, animates the scroll.
		* @public
		*/
		scrollTo: function (x, y, animate) {
			this.$.strategy.scrollTo(x, y, animate);
		},

		/**
		* @private
		*/
		bindings: [
			{from: 'scrollInterval',				to:'$.strategy.interval'},
			{from: 'scrollWheelMultiplier',			to:'$.strategy.scrollWheelMultiplier'},
			{from: 'scrollWheelPageMultiplier',		to:'$.strategy.scrollWheelPageMultiplier'},
			{from: 'paginationPageMultiplier',		to:'$.strategy.paginationPageMultiplier'},
			{from: 'paginationScrollMultiplier',	to:'$.strategy.paginationScrollMultiplier'},
			{from: 'hideScrollColumnsWhenFit',		to:'$.strategy.hideScrollColumnsWhenFit'},
			{from: 'scrollToBoundaryDelay',			to:'$.strategy.scrollToBoundaryDelay'},
			{from: 'scrollToBoundaryAnimate',		to:'$.strategy.scrollToBoundaryAnimate'}
		],

		/**
		* @private
		*/
		create: function () {
			Scroller.prototype.create.apply(this, arguments);
			this.spotlightPagingControlsChanged();
			this.scrollWheelMovesFocusChanged();
			this.createChrome([{kind: Signals, onkeyup: 'keyup'}]);

			this.$.strategy.measureScrollColumns = this.measureScrollColumns;

			// workaround because the bootstrapping code isn't attached to constructors that have
			// finished setup before the hook is declared
			if(Spotlight && this.spotlight === 'container') {
				Spotlight.Container.initContainer(this);
			}
		},

		/**
		* @private
		*/
		setLastFocusedChild: function(control) {
			Spotlight.Container.setLastFocusedChild(this, control);
		},

		/**
		* @private
		*/
		spotlightPagingControlsChanged: function () {
			this.$.strategy.set('spotlightPagingControls', this.spotlightPagingControls);
		},

		/**
		* @private
		*/
		scrollWheelMovesFocusChanged: function () {
			if (!this.scrollWheelMovesFocus) {
				this.setUseMouseWheel(true);
			}
		},

		/**
		* @private
		*/
		spotlightWheel: function (inSender, inEvent) {
			if (this.scrollWheelMovesFocus) {
				if (!Spotlight.getPointerMode()) {
					var curr = Spotlight.getCurrent();
					if (curr && curr.isDescendantOf(this)) {
						var dir = inEvent.type == 'onSpotlightScrollUp' ? 'onSpotlightUp' : 'onSpotlightDown';
						this._spotlightModal = this.spotlightModal;
						this.spotlightModal = true;	// Trap focus inside scroller while wheeling
						Spotlight.Util.dispatchEvent(dir, {type: dir}, curr);
						this.spotlightModal = this._spotlightModal;
						return true;
					}
				}
			}
		},

		/**
		* @private
		*/
		getHandlePageUpDownKey: function () {
			return this.handlePageUpDownKey;
		},

		/**
		* @private
		*/
		enablePageUpDownKey: function () {
			this.handlePageUpDownKey = true;
		},

		/**
		* @private
		*/
		disablePageUpDownKey: function () {
			this.handlePageUpDownKey = false;
		},

		/**
		* @private
		*/
		checkBounce: function (sender, event) {
			if (event.focusType === '5-way bounce') {
				this.stopJob('scrollToBoundary');
			}
		},

		/**
		* @private
		*/
		containerLeaveHandler: function (sender, event) {
			// We want to scroll to the boundary when 5-way focus leaves the scroller,
			// but we do this in a job to prevent scrolling in the case where focus
			// immediately "bounces" back into the scroller because there's nothing
			// spottable in the given direction
			if (event.originator === this) {
				this.scrollToBoundary();
			}

			this.disablePageUpDownKey();
		},

		/**
		* If 5-way focus is leaving the scroller, we scroll to the scroller's
		* boundary in the direction of the move. This logic works in
		* conjunction with related logic in moonstone/ScrollStrategy to allow users
		* to 5-way scroll all the way to the edge of a scroller, even when
		* the controls nearest the scroller boundary are disabled or otherwise
		* unfocusable.
		*
		* @private
		*/
		scrollToBoundary: function () {
			var strategy = this.getStrategy(),
				b = strategy.getScrollBounds(),
				o5WayEvent = Spotlight.getLast5WayEvent(),
				lastControl = Spotlight.getLastControl(),
				top = strategy.getScrollTop(),
				left = strategy.getScrollLeft(),
				animate = this.scrollToBoundaryAnimate;

			if (o5WayEvent && (!strategy.isPageControl || !strategy.isPageControl(lastControl))) {
				this.startJob('scrollToBoundary', function () {
					switch (o5WayEvent.type) {
						case 'onSpotlightUp':
							if (top > 0) strategy.scrollTo(left, 0, animate);
							break;
						case 'onSpotlightDown':
							if (top < b.maxTop) strategy.scrollTo(left, b.maxTop, animate);
							break;
						case 'onSpotlightLeft':
							if (left > 0) strategy.scrollTo(0, top, animate);
							break;
						case 'onSpotlightRight':
								if (left < b.maxLeft) strategy.scrollTo(b.maxLeft, top, animate);
								break;
					}
				}, this.scrollToBoundaryDelay);
			}
		},

		/**
		* @private
		*/
		move: function (inSender, inEvent) {
			if (!this.getHandlePageUpDownKey()) {
				this.enablePageUpDownKey();
			}
		},

		/**
		* @private
		*/
		keyup: function (inSender, inEvent) {
			var KEY_POINTER_PAGE_UP = 33,
				KEY_POINTER_PAGE_DOWN = 34;

			if (!this.getHandlePageUpDownKey()) {
				return;
			}

			var strategy = this.getStrategy(),
				showVertical = strategy.showVertical(),
				viewportBounds = strategy.$.viewport.getAbsoluteBounds(),
				oSpotControl = Spotlight.getCurrent(),
				direction,
				rDirection,
				pageKeyCtr;

			switch (inEvent.keyCode) {
				case KEY_POINTER_PAGE_UP:
					direction = showVertical ? 'Up' : 'Left';
					rDirection = showVertical ? 'Down' : 'Right';
					break;
				case KEY_POINTER_PAGE_DOWN:
					direction = showVertical ? 'Down' : 'Right';
					rDirection = showVertical ? 'Up' : 'Left';
					break;
				default:
					return;
			}

			pageKeyCtr = strategy.$['page' + direction + 'Control'];

			if (!Spotlight.getPointerMode() && oSpotControl) {
				var oSpotBounds = oSpotControl.getAbsoluteBounds(),
					oEndPoint = this.getEndPoint(direction, oSpotBounds, viewportBounds);

				var oControl = Spotlight.
								NearestNeighbor.
								getNearestPointerNeighbor(this, rDirection.toUpperCase(), oEndPoint.x, oEndPoint.y);
				if (oControl && oControl.id === oSpotControl.id) {
					oEndPoint = this.getEndPoint(direction, oSpotBounds, this.getNextViewport(direction, viewportBounds));
					oControl = Spotlight.
								NearestNeighbor.
								getNearestPointerNeighbor(this, rDirection.toUpperCase(), oEndPoint.x, oEndPoint.y);
				}
				if (oControl !== oSpotControl) {
					Spotlight.spot(oControl);
				} else {
					pageKeyCtr.sendPaginateEvent();
				}
			}
			else {
				if (pageKeyCtr.getDisabled()) {
					strategy.alertThumbs();
				} else {
					pageKeyCtr.sendPaginateEvent();
				}
			}
		},

		/**
		* @private
		*/
		getEndPoint: function (direction, oSpotBounds, viewportBounds) {
			var oPoint = {};
			switch (direction) {
				case 'Up':
					oPoint.x = oSpotBounds.left + oSpotBounds.width/2;
					oPoint.y = viewportBounds.top;
					break;
				case 'Left':
					oPoint.x = viewportBounds.left;
					oPoint.y = oSpotBounds.top + oSpotBounds.height/2;
					break;
				case 'Down':
					oPoint.x = oSpotBounds.left + oSpotBounds.width/2;
					oPoint.y = viewportBounds.top + viewportBounds.height;
					break;
				case 'Right':
					oPoint.x = viewportBounds.left + viewportBounds.width;
					oPoint.y = oSpotBounds.top + oSpotBounds.height/2;
					break;
			}
			return oPoint;
		},

		/**
		* @private
		*/
		getNextViewport: function (direction, viewportBounds) {
			switch (direction) {
				case 'Up':
					viewportBounds.top = viewportBounds.top - viewportBounds.height;
					return viewportBounds;
				case 'Left':
					viewportBounds.left = viewportBounds.left - viewportBounds.width;
					return viewportBounds;
				case 'Down':
					viewportBounds.top = viewportBounds.top + viewportBounds.height;
					return viewportBounds;
				case 'Right':
					viewportBounds.left = viewportBounds.left + viewportBounds.width;
					return viewportBounds;
			}
		},

		/**
		* @private
		*/
		previewDomEvent: function (inEvent) {
			if (this.scrollWheelMovesFocus) {
				if (inEvent.type == 'mousewheel') {
					this.setUseMouseWheel(Spotlight.getPointerMode());
				}
			}
		}
	});
}

},{'../ScrollStrategy':'moonstone/ScrollStrategy'}],'moonstone/IntegerPicker':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/IntegerPicker~IntegerPicker} kind.
* @module moonstone/IntegerPicker
*/

var
	animation = require('enyo/animation'),
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	Control = require('enyo/Control'),
	Scroller = require('enyo/Scroller');

var
	FlyweightRepeater = require('layout/FlyweightRepeater');

var
	ScrollStrategy = require('../ScrollStrategy'),
	TouchScrollStrategy = ScrollStrategy.Touch;

var
	$L = require('../i18n');

/**
* Fires when the currently selected value changes.
*
* @event module:moonstone/IntegerPicker~IntegerPicker#onChange
* @type {Object}
* @property {Number} value - The currently selected value.
* @property {String} name - The name of the picker instance.
* @public
*/

/**
* {@link module:moonstone/IntegerPicker~IntegerPicker} is a control that displays a list of integers
* ranging from [min]{@link module:moonstone/IntegerPicker~IntegerPicker#min} to [max]{@link module:moonstone/IntegerPicker~IntegerPicker#max},
* soliciting a choice from the user. To initialize the picker to a particular integer,
* set the [value]{@link module:moonstone/IntegerPicker~IntegerPicker#value} property to that integer:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		IntegerPicker = require('moonstone/IntegerPicker');
*
* 	{kind: IntegerPicker, noneText: 'None Selected',
* 		content: 'Choose a Number', min: 0, max: 25, value: 5}
* ```
*
* The picker may be changed programmatically by modifying the `value`, `min`,
* and `max` properties in the normal manner, by calling [set()]{@link module:enyo/CoreObject~Object#set}.
*
* @class IntegerPicker
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/IntegerPicker~IntegerPicker.prototype */ {

	/**
	* @private
	*/
	name: 'moon.IntegerPicker',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'moon-scroll-picker-container',

	/**
	* @private
	* @lends module:moonstone/IntegerPicker~IntegerPicker.prototype
	*/
	published: {
		/**
		* When `true`, button is shown as disabled and does not generate tap events.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false,

		/**
		* When `true`, picker transitions animate left/right.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		animate: true,

		/**
		* Current value of the picker.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		value: 0,

		/**
		* Minimum value of the picker.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		min: 0,

		/**
		* Maximum value of the picker.
		*
		* @type {Number}
		* @default 9
		* @public
		*/
		max: 9,

		/**
		* Amount by which to increment or decrement when moving picker between
		* [min]{@link module:moonstone/IntegerPicker~IntegerPicker#min} and [max]{@link module:moonstone/IntegerPicker~IntegerPicker#max}.
		*
		* @type {Number}
		* @default 1
		* @public
		*/
		step: 1,

		/**
		* If a number is specified, the picker value is displayed as this many
		* zero-filled digits.
		*
		* @type {Number}
		* @default null
		* @public
		*/
		digits: null,

		/**
		* When `true`, incrementing beyond [max]{@link module:moonstone/IntegerPicker~IntegerPicker#max} will wrap to
		* [min]{@link module:moonstone/IntegerPicker~IntegerPicker#min}, and decrementing beyond `min` will wrap to
		* `max`.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		wrap: false,

		/**
		* The minimum width of the picker. If not set, or set to a low value, the width
		* of the picker will fluctuate slightly depending on the rendered width of the value.
		*
		* @type {Number}
		* @default 50
		* @public
		*/
		minWidth: 50

	},

	/**
	* @private
	*/
	handlers: {
		onSpotlightUp: 'next',
		onSpotlightDown: 'previous',
		onSpotlightFocused: 'spotlightFocused',
		onSpotlightBlur: 'spotlightBlur',
		onSpotlightScrollUp: 'next',
		onSpotlightScrollDown: 'previous',
		onmousewheel: 'mousewheel'
	},

	/**
	* @private
	*/
	events: {
		/**
		* {@link module:moonstone/IntegerPicker~IntegerPicker#onChange}
		*/
		onChange: ''
	},

	/**
	* @private
	*/
	spotlight: true,

	/**
	* Cache scroll bounds so we don't have to run {@link module:enyo/Scroller~Scroller#stop} every time we
	* need them.
	*
	* @private
	*/
	scrollBounds: {},

	/**
	* @private
	*/
	components: [
		{name:'nextOverlay', kind: Control, ondown: 'downNext', onholdpulse: 'next', classes: 'moon-scroll-picker-overlay-container next', components:[
			{kind: Control, classes: 'moon-scroll-picker-overlay next'},
			{kind: Control, classes: 'moon-scroll-picker-taparea'}
		]},
		// FIXME: TranslateScrollStrategy doesn't work with the current design of this component so
		// we're forcing TouchScrollStrategy
		{kind: Scroller, strategyKind: TouchScrollStrategy, thumb: false, touch: true, useMouseWheel: false, classes: 'moon-scroll-picker', components:[
			{name: 'repeater', kind: FlyweightRepeater, classes: 'moon-scroll-picker-repeater', ondragstart: 'dragstart', onSetupItem: 'setupItem', noSelect: true, components: [
				{name: 'item', kind: Control, classes: 'moon-scroll-picker-item'}
			]},
			{name: 'buffer', kind: Control, accessibilityDisabled: true, classes: 'moon-scroll-picker-buffer'}
		]},
		{name:'previousOverlay', kind: Control, ondown: 'downPrevious', onholdpulse: 'previous', classes: 'moon-scroll-picker-overlay-container previous', components:[
			{kind: Control, classes: 'moon-scroll-picker-overlay previous'},
			{kind: Control, classes: 'moon-scroll-picker-taparea'}
		]}
	],

	/**
	* Parameter that determines scroll math simulation speed.
	*
	* @private
	*/
	scrollFrame: 3,

	/**
	* Indicates direction of change from user. Necessary to support proper wrapping
	* when `range == 2`.
	*
	* @private
	*/
	direction: 0,

	/**
	* Range of possible values `max - min`.
	*
	* @private
	*/
	range: 0,

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.rangeChanged();
		this.updateOverlays();
	},

	/**
	* @private
	*/
	rendered: function () {
		Control.prototype.rendered.apply(this, arguments);
		this.width = null;
		this.minWidthChanged();
		this.scrollToValue();
		this.$.scroller.getStrategy().setFixedTime(false);
		this.$.scroller.getStrategy().setFrame(this.scrollFrame);
	},

	/**
	* Snap to current value on a reflow.
	*
	* @private
	*/
	reflow: function () {
		Control.prototype.reflow.apply(this, arguments);
		this.scrollToValue();
	},

	/**
	* @private
	*/
	getVerifiedValue: function () {
		return this.value >= this.min && this.value <= this.max ? this.value : this.min;
	},

	/**
	* @private
	*/
	verifyValue: function () {
		var animate = this.animate;
		this.animate = false;
		this.set('value', this.getVerifiedValue());
		this.animate = animate;
	},

	/**
	* @private
	*/
	setupItem: function (inSender, inEvent) {
		var index = inEvent.index;
		var content = this.labelForValue(this.indexToValue(index % this.range));
		this.$.item.setContent(content);
	},

	/**
	* Formats passed-in value for display. If [digits]{@link module:moonstone/IntegerPicker~IntegerPicker#digits}
	* is **truthy**, zeros will be prepended to reach that number of digits.
	*
	* @param  {Number} value - Value to format.
	* @return {String}       - Formatted value.
	* @private
	*/
	labelForValue: function(value) {
		if (this.digits) {
			value = (value < 0? '-' : '') + ('00000000000000000000' + Math.abs(value)).slice(-this.digits);
		}

		return value;
	},

	/**
	* @private
	*/
	setupBuffer: function() {
		var bmin = ('' + this.min).length,
			bmax = Math.max(bmin, ('' + this.max).length),
			digits = this.digits + (this.min < 0 ? 1 : 0),
			buffer = Math.max(bmax, digits),
			content = '00000000000000000000'.substring(0, buffer);
		this.$.buffer.setContent(content);
	},

	/**
	* @private
	*/
	digitsChanged: function () {
		this.setupBuffer();
	},

	/**
	* @private
	*/
	prepareRange: function () {
		this.range = this.valueToIndex(this.max) - this.valueToIndex(this.min) + 1;
		this.setupBuffer();
	},

	/**
	* @private
	*/
	rangeChanged: function () {
		this.verifyValue();
		this.prepareRange();
	},

	/**
	* Fail-safe design.
	* If out-of-boundary value is assigned, adjust boundary.
	*
	* @private
	*/
	valueChanged: function (old) {
		this.value -= (this.value-this.min)%this.step;
		if (this.value < this.min) {
			this.setMin(this.value);
		} else if (this.value > this.max) {
			this.setMax(this.value);
		}

		this.scrollToValue(old);
		this.updateOverlays();
		this.fireChangeEvent();
	},

	stepChanged: function (old) {
		var step = parseInt(this.step, 10);
		this.step = isNaN(step)? 1 : step;
		this.prepareRange();
		this.valueChanged(this.value);
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
	wrapChanged: function () {
		this.updateOverlays();
	},

	/**
	* Prevent scroller dragging
	*
	* @private
	*/
	dragstart: function (inSender, inEvent) {
		return true;
	},

	/**
	* @private
	*/
	minChanged: function () {
		this.rangeChanged();
	},

	/**
	* @private
	*/
	maxChanged: function () {
		this.rangeChanged();
	},

	/**
	* @private
	*/
	previous: function (inSender, inEvent) {
		if(this.disabled) {
			return;
		}

		this.direction = -1;

		if (this.value - this.step >= this.min) {
			this.setValue(this.value - this.step);
		} else if (this.wrap) {
			this.setValue(this.max);
		} else {
			return;
		}
		this.$.previousOverlay.addClass('selected');
		if (inEvent.originator != this.$.upArrow) {
			this.startJob('hideBottomOverlay', 'hideBottomOverlay', 350);
		}

		this.direction = 0;
		return true;
	},

	/**
	* @private
	*/
	next: function (inSender, inEvent) {
		if(this.disabled) {
			return;
		}

		this.direction = 1;

		if (this.value + this.step <= this.max) {
			this.setValue(this.value + this.step);
		} else if (this.wrap) {
			this.setValue(this.min);
		} else {
			return;
		}
		this.$.nextOverlay.addClass('selected');
		if (inEvent.originator != this.$.downArrow) {
			this.startJob('hideTopOverlay', 'hideTopOverlay', 350);
		}

		this.direction = 0;
		return true;
	},

	/**
	* @private
	*/
	downPrevious: function (inSender, inEvent) {
		this.previous(inSender, inEvent);
	},

	/**
	* @private
	*/
	downNext: function (inSender, inEvent) {
		this.next(inSender, inEvent);
	},

	/**
	* @private
	*/
	updateOverlays: function () {
		this.$.previousOverlay.applyStyle('visibility', (this.wrap || this.value - this.step >= this.min) ? 'visible' : 'hidden');
		this.$.nextOverlay.applyStyle('visibility', (this.wrap || this.value + this.step <= this.max) ? 'visible' : 'hidden');
	},

	/**
	* Renders the repeater.
	*
	* @param {Number} index - Index of row.
	* @param {Number} count - Number of rows to render.
	* @private
	*/
	updateRepeater: function(index, count) {
		this.$.repeater.set('rowOffset', index);
		this.$.repeater.set('count', count || 1);
		this.$.repeater.render();
		this.$.scroller.remeasure();
	},

	/**
	* Scrolls to the node at `index` if it exists.
	*
	* @param  {Number} index    - Index of row.
	* @param  {Boolean} animate - If `true`, scroll is animated.
	* @private
	*/
	scrollToIndex: function(index, animate) {
		var node = this.$.repeater.fetchRowNode(index);
		if (node) {
			if(animate) {
				this.$.scroller.scrollTo(node.offsetLeft, node.offsetTop);
			} else {
				this.$.scroller.setScrollTop(node.offsetTop);
				this.$.scroller.setScrollLeft(node.offsetLeft);
			}
		}
	},

	/**
	* Converts `value` to its index in the repeater.
	*
	* @param  {Number} value - Integer value.
	* @return {Number}       - Repeater index.
	* @private
	*/
	valueToIndex: function(value) {
		return Math.floor((value - this.min) / this.step);
	},

	/**
	* Converts a repeater `index` to its value.
	*
	* @param  {Number} index - Repeater index
	* @return {Number}       - Integer value
	* @private
	*/
	indexToValue: function(index) {
		return index * this.step + this.min;
	},

	/**
	* Sets up the repeater to render the rows between `old` and
	* [value]{@link module:moonstone/IntegerPicker~IntegerPicker#value} and scrolls to reveal the current value. If `old`
	* is specified, the scroll will be animated. If [wrap]{@link module:moonstone/IntegerPicker~IntegerPicker#wrap} is
	* `true`, the scroll will travel the shortest distance to `value`, which may result in
	* wrapping.
	*
	* @param  {Number} [old] - Prior value from which to scroll.
	* @private
	*/
	scrollToValue: function(old) {
		var newIndex = this.valueToIndex(this.value);

		if(this.animate && old !== undefined) {
			var oldIndex = this.valueToIndex(old);
			var delta = newIndex - oldIndex;

			if(this.wrap && Math.abs(delta) >= this.range/2) {

				// when range is 2, we need special logic so scrolling matches the user's action
				// (e.g. tapping the up arrow always scrolls up). If direction (set in next()
				// and previous()) === delta (which will always be +/- 1), the natural rendering
				// is correct even though we're wrapping around the boundary so don't adjust.
				if(!(this.range === 2 && this.direction !== delta)) {
					// if wrapping and wrapping is a shorter distance, adjust the lesser index by the
					// range so the distance is the shortest possible
					if(newIndex > oldIndex) {
						oldIndex += this.range;
					} else {
						newIndex += this.range;
					}
				}
			}

			// rowOffset should be the lesser of the indices and count is the difference + 1
			var index = Math.min(oldIndex, newIndex);
			var count = Math.abs(newIndex - oldIndex) + 1;
			this.updateRepeater(index, count);

			if (this._rAF) animation.cancelAnimationFrame(this._rAF);
			this._rAF = animation.requestAnimationFrame(function () {
				this.scrollToIndex(oldIndex, false);
				this._rAF = animation.requestAnimationFrame(function () {
					this.scrollToIndex(newIndex, true);
				}.bind(this));
			}.bind(this));
		} else {
			// if old isn't specified, setup the repeater with only this.value and jump to it
			this.updateRepeater(newIndex);
			this.scrollToIndex(newIndex, false);
		}
	},

	/**
	* @private
	*/
	hideTopOverlay: function () {
		this.$.nextOverlay.removeClass('selected');
	},

	/**
	* @private
	*/
	hideBottomOverlay: function () {
		this.$.previousOverlay.removeClass('selected');
	},

	/**
	* @fires module:moonstone/IntegerPicker~IntegerPicker#onChange
	* @private
	*/
	fireChangeEvent: function () {
		this.doChange({
			name: this.name,
			value: this.value,
			content: this.labelForValue(this.value)
		});
	},

	/**
	* @private
	*/
	resetOverlay: function () {
		this.hideTopOverlay();
		this.hideBottomOverlay();
	},

	/**
	* @fires module:moonstone/Scroller~Scroller#onRequestScrollIntoView
	* @private
	*/
	spotlightFocused: function () {
		this.set('spotted', true);
		this.bubble('onRequestScrollIntoView');
	},

	/**
	* @private
	*/
	spotlightBlur: function () {
		this.set('spotted', false);
		this.hideTopOverlay();
		this.hideBottomOverlay();
	},

	/**
	* Cache scroll bounds in [scrollBounds]{@link module:moonstone/IntegerPicker~IntegerPicker#scrollBounds} so we
	* don't have to call {@link module:enyo/Scroller~Scroller#stop} to retrieve them later.
	*
	* @private
	*/
	updateScrollBounds: function () {
		this.scrollBounds = this.$.scroller.getStrategy()._getScrollBounds();
	},

	/**
	* Silently scrolls to the `inValue` y-position without animating.
	*
	* @private
	*/
	setScrollTop: function (inValue) {
		this.$.scroller.setScrollTop(inValue);
	},

	/**
	* Ensures scroll position is in bounds.
	*
	* @private
	*/
	stabilize: function () {
		this.$.scroller.stabilize();
	},

	/**
	* @private
	*/
	mousewheel: function (inSender, inEvent) {
		// Make sure scrollers that container integer pickers don't scroll
		inEvent.preventDefault();
		return true;
	},

	/**
	* @private
	*/
	minWidthChanged: function() {
		this.applyStyle('min-width', dom.unit(this.minWidth));
	},

	/**
	* @method
	* @private
	*/
	showingChangedHandler: function () {
		Control.prototype.showingChangedHandler.apply(this, arguments);

		// Only force a scroll to the item corresponding to the current value if it is not
		// already displayed.
		if (this.showing && !this.$.repeater.fetchRowNode(this.valueToIndex(this.value))) {
			this.scrollToValue();
		}
	},

	// Accessibility

	/**
	* @default 'spinbutton'
	* @type {String}
	* @see enyo/AccessibilitySupport~AccessibilitySupport#accessibilityRole
	* @public
	*/
	accessibilityRole: 'spinbutton',

	/**
	* Custom value for accessibility (ignored if `null`).
	*
	* @type {String|null}
	* @default null
	* @public
	*/
	accessibilityValueText: null,

	/**
	* @private
	*/
	ariaObservers: [
		{from: 'min', to: 'aria-valuemin'},
		{from: 'max', to: 'aria-valuemax'},
		{path: ['accessibilityValueText', 'value'], method: function () {
			this.set('accessibilityHint', null);
			this.ariaValue();
		}},
		{path: 'spotted',  method: function () {
			// When spotlight is focused, it reads value with hint
			if (this.spotted) {
				if (!this.wrap && this.value == this.min) {
					this.set('accessibilityHint', $L('change a value with up button'));
				} else if (!this.wrap && this.value == this.max) {
					this.set('accessibilityHint', $L('change a value with down button'));
				} else {
					this.set('accessibilityHint', $L('change a value with up down button'));
				}
			}
		}}
	],

	/**
	* @private
	*/
	ariaValue: function () {
		var text = this.accessibilityValueText || this.value;
		this.setAriaAttribute('aria-valuetext', text);
	}
});

},{'../ScrollStrategy':'moonstone/ScrollStrategy','../i18n':'moonstone/i18n'}],'moonstone/VideoPlayer':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/VideoPlayer~VideoPlayer} kind.
* @module moonstone/VideoPlayer
*/

require('moonstone');

var
	dispatcher = require('enyo/dispatcher'),
	dom = require('enyo/dom'),
	gesture = require('enyo/gesture'),
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	Animator = require('enyo/Animator'),
	Control = require('enyo/Control'),
	EnyoHistory = require('enyo/History'),
	Signals = require('enyo/Signals'),
	Video = require('enyo/Video');

var
	Spotlight = require('spotlight');

var
	FittableColumns = require('layout/FittableColumns'),
	Panels = require('enyo/LightPanels');

var
	DurationFmt = require('enyo-ilib/DurationFmt');

var
	$L = require('../i18n'),
	IconButton = require('moonstone/IconButton'),
	HistorySupport = require('moonstone/HistorySupport'),
	Spinner = require('moonstone/Spinner'),
	VideoFullscreenToggleButton = require('../VideoFullscreenToggleButton'),
	VideoTransportSlider = require('../VideoTransportSlider');

/**
* Fires when [disablePlaybackControls]{@link module:moonstone/VideoPlayer~VideoPlayer#disablePlaybackControls}
* is `true` and the user taps one of the [controls]{@link module:enyo/Control~Control}; may be handled to
* re-enable the controls, if desired. No event-specific information is sent with this event.
*
* @event module:moonstone/VideoPlayer~VideoPlayer#onPlaybackControlsTapped
* @type {Object}
* @public
*/

/**
* Child controls may bubble this event to toggle the fullscreen state of the video player.
* No additional data needs to be sent with this event.
*
* @event module:moonstone/VideoPlayer~VideoPlayer#onRequestToggleFullscreen
* @type {Object}
* @public
*/

/**
* Child controls may bubble this event to request an update to the current video position.
*
* @event module:moonstone/VideoPlayer~VideoPlayer#onRequestTimeChange
* @type {Object}
* @property {Number} value - Requested time index.
* @public
*/

/**
* {@link module:moonstone/VideoPlayer~VideoPlayer} is an HTML5 [video]{@glossary video} player control.  It wraps
* an {@link module:enyo/Video~Video} [object]{@glossary Object} to provide Moonstone-styled standard
* transport [controls]{@link module:enyo/Control~Control}, optional app-specific controls, and an information
* bar for displaying video information and player feedback.
*
* All of the standard HTML5 media [events]{@glossary event} bubbled from `enyo/Video` will
* also bubble from this control.
*
* Client [components]{@link module:enyo/Component~Component} added to the `components` block are rendered into
* the video player's transport control area, and should generally be limited to instances of
* {@link module:moonstone/IconButton~IconButton}. If more than two client components are specified, they will be
* rendered into an "overflow" screen, reached by activating a button to the right of the
* controls.
*
* Client components addded to the [infoComponents]{@link module:moonstone/VideoPlayer~VideoPlayer#infoComponents}
* block will be created as a header for the video.
*
* ```javascript
* var VideoPlayer = require('moonstone/VideoPlayer');
*
* {
*		kind: VideoPlayer,
*		src: 'http://www.w3schools.com/html/mov_bbb.mp4',
*		components: [
*			// Custom icons for app-specific features
*			{kind: IconButton, src: 'moonstone/src/assets/feature1.png', ontap: 'feature1'},
*			{kind: IconButton, src: 'moonstone/src/assets/feature2.png', ontap: 'feature2'},
*			{kind: IconButton, src: 'moonstone/src/assets/feature3.png', ontap: 'feature3'}
*		],
*		infoComponents: [
*			{kind: VideoHeaderBackground, components: [
*				{kind: VideoInfoHeader, ... }
*			]
*		]
* }
* ```
*
* @class VideoPlayer
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/VideoPlayer~VideoPlayer.prototype */ {

	/**
	* @private
	*/
	name: 'moon.VideoPlayer',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	mixins: [HistorySupport],

	/**
	* @private
	*/
	spotlight: true,

	// Fixme: When enyo-fit is used than the background image does not fit to video while dragging.
	/**
	* @private
	*/
	classes: 'moon-video-player enyo-unselectable',

	/**
	* @private
	*/
	events: {
		onPlaybackControlsTapped: ''
	},

	/**
	* @private
	* @lends module:moonstone/VideoPlayer~VideoPlayer.prototype
	*/
	published: {

		/**
		* URL of HTML5 video file.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		src: '',

		/**
		* Array for setting multiple sources for the same video.
		*
		* @type {String[]}
		* @default null
		* @public
		*/
		sources: null,

		/**
		* A [component]{@link module:enyo/Component~Component} definition block describing components to
		* be created as an information block above the video. Usually, this contains a
		* [moon/VideoInfoBackground]{@link module:moonstone/VideoInfoBackground~VideoInfoBackground} with a
		* [moon/VideoInfoHeader]{@link module:moonstone/VideoInfoHeader~VideoInfoHeader} in it.
		*
		* @type {Object[]}
		* @default null
		* @public
		*/
		infoComponents: null,

		/**
		* If `true`, the video player is resized after metadata is loaded, based on the
		* [aspectRatio]{@link module:moonstone/VideoPlayer~VideoPlayer#aspectRatio} contained in the metadata. This
		* applies only to [inline]{@link module:moonstone/VideoPlayer~VideoPlayer#inline} mode (i.e., when
		* `inline` is `true`).
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		autoResize: false,

		/**
		* Video aspect ratio, specified as `'width:height'`, or `'none'`.  When an aspect ratio
		* is specified at render time, the player's height or width will be updated to respect
		* the ratio, depending on whether [fixedHeight]{@link module:moonstone/VideoPlayer~VideoPlayer#fixedHeight} is
		* `true` or `false`. If [autoResize]{@link module:moonstone/VideoPlayer~VideoPlayer#autoResize} is `true`, the
		* `aspectRatio` will be updated based on the metadata for the current video and the
		* player will be resized accordingly. This applies only to
		* [inline]{@link module:moonstone/VideoPlayer~VideoPlayer#inline} mode.
		*
		* @type {String}
		* @default '16:9'
		* @public
		*/
		aspectRatio: '16:9',

		/**
		* When `true`, the width will be adjusted at render time based on the observed height
		* and the aspect ratio. When `false` (the default), the height will be adjusted at
		* render time based on the observed width and the aspect ratio. This property is ignored
		* if [aspectRatio]{@link module:moonstone/VideoPlayer~VideoPlayer#aspectRatio} is `'none'` or a **falsy**
		* value.  In addition, this applies only to [inline]{@link module:moonstone/VideoPlayer~VideoPlayer#inline} mode.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		fixedHeight: false,

		/**
		* Amount of time (in milliseconds) after which control buttons are automatically hidden.
		*
		* @type {Number}
		* @default 7000
		* @public
		*/
		autoCloseTimeout: 7000,

		/**
		* Duration of the video.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		duration: 0,

		/**
		* If `true`, playback starts automatically when video is loaded.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		autoplay: false,

		/**
		* If `false`, fullscreen video control overlays (info or transport) are not shown
		* or hidden automatically in response to `up` or `down` events.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		autoShowOverlay: true,

		/**
		* If `true`, the overlay will be shown in response to pointer movement (in addition to
		* `up` and `down` events).
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		shakeAndWake: false,

		/**
		* If `false`, the top [infoComponents]{@link module:moonstone/VideoPlayer~VideoPlayer#infoComponents} are
		* not automatically shown or hidden in response to `up` events.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		autoShowInfo: true,

		/**
		* If `false`, the bottom slider/controls are not automatically shown or hidden in
		* response to `down` events.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		autoShowControls: true,

		/**
		* When `true`, the top [infoComponents]{@link module:moonstone/VideoPlayer~VideoPlayer#infoComponents} are
		* shown with no timeout; when `false` (the default), they are shown based on the
		* value of the [autoShowInfo]{@link module:moonstone/VideoPlayer~VideoPlayer#autoShowInfo} property.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		showInfo: false,

		/**
		* When `false`, the player starts in fullscreen mode; when `true`, it starts in
		* inline mode. As this is meant to be initialized on startup, fire the
		* [onRequestToggleFullscreen]{@link module:moonstone/VideoPlayer~VideoPlayer#onRequestToggleFullscreen}
		* event from a child control or call
		* [toggleFullscreen()]{@link module:moonstone/VideoPlayer~VideoPlayer#toggleFullscreen} to dynamically
		* toggle between fullscreen and inline mode.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		inline: false,

		/**
		* Amount of time (in seconds) to jump in response to jump buttons. This value is ignored
		* when [jumpStartEnd]{@link module:moonstone/VideoPlayer~VideoPlayer#jumpStartEnd} is `true`.
		*
		* @type {Number}
		* @default 30
		* @public
		*/
		jumpSec: 30,

		/**
		* If `true`, the "jump forward" and "jump back" buttons jump to the start and end of the
		* video, respectively.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		jumpStartEnd: false,

		/**
		* When `true`, popups opened from the video player's client controls are automatically
		* hidden.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		autoHidePopups: true,

		/**
		* If `false`, the progress bar is removed and any additional controls are moved
		* downward.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		showProgressBar: true,

		/**
		* If `false`, the transport controls are removed, but the icon button area is kept.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		showPlaybackControls: true,

		/**
		* When `true`, playback controls are hidden when the slider is hovered over.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		hideButtonsOnSlider: false,

		/**
		* If `true`, the slider is disabled and will not be enabled when video data has
		* loaded.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disableSlider: false,

		/**
		* If `false`, the "jump forward" and "jump back" buttons are hidden.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		showJumpControls: true,

		/**
		* When `true`, the fast-forward and rewind buttons are visible.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		showFFRewindControls: true,

		/**
		* If `true`, the slider and playback controls are disabled. If the user taps the
		* controls, an
		* [onPlaybackControlsTapped]{@link module:moonstone/VideoPlayer~VideoPlayer#onPlaybackControlsTapped}
		* event will be bubbled.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disablePlaybackControls: false,

		/**
		* When `true`, playback controls are only active when the video player has a valid
		* source URL and no errors occur during video loading.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		disablePlaybackControlsOnUnload: true,

		/**
		* If `false`, the Play/Pause control is hidden.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		showPlayPauseControl: true,

		/**
		* If `false`, the video element is hidden.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		showVideo: true,

		/**
		* When `true`, a spinner is automatically shown when video is in the play state but
		* is still loading/buffering.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		autoShowSpinner: true,

		/**
		* Source of image file to show when video isn't available or user has not yet tapped the
		* play button.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		poster: '',

		/**
		* If `false`, video player won't respond to remote control.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		handleRemoteControlKey: true,

		/**
		* Sliders will increase or decrease as much as this percentage value in either direction
		* when left or right key is pressed in 5-Way mode.
		*
		* @type {Number|String}
		* @default '5%'
		* @public
		*/
		knobIncrement: '5%',

		/**
		* Base URL for icons
		*
		* @private
		*/
		iconPath: 'images/video-player/',

		/**
		* Name of font-based icon or image file.
		*
		* @private
		*/
		jumpBackIcon: 'skipbackward',

		/**
		* Name of font-based icon or image file.
		*
		* @private
		*/
		rewindIcon: 'backward',

		/**
		* Name of font-based icon or image file.
		*
		* @private
		*/
		playIcon: 'play',

		/**
		* Name of font-based icon or image file.
		*
		* @private
		*/
		pauseIcon: 'pause',

		/**
		* Name of font-based icon or image file.
		*
		* @private
		*/
		fastForwardIcon: 'forward',

		/**
		* Name of font-based icon or image file.
		*
		* @private
		*/
		jumpForwardIcon: 'skipforward',

		/**
		* Name of font-based icon or image file.
		*
		* @private
		*/
		moreControlsIcon: 'ellipsis',

		/**
		* Name of font-based icon or image file.
		*
		* @private
		*/
		lessControlsIcon: 'arrowhookleft',

		/**
		* Name of font-based icon or image file.
		*
		* @private
		*/
		inlinePlayIcon: 'play',

		/**
		* Name of font-based icon or image file.
		*
		* @private
		*/
		inlinePauseIcon: 'pause',

		/**
		* Name of font-based icon or image file.
		*
		* @private
		*/
		inlineFullscreenIcon: 'fullscreen',

		/**
		* Default hash of playback states and their associated playback rates.
		* playbackRateHash: {
		*	fastForward: ['2', '4', '8', '16'],
		*	rewind: ['-2', '-4', '-8', '-16'],
		*	slowForward: ['1/4', '1/2'],
		*	slowRewind: ['-1/2', '-1']
		* }
		*
		* @private
		*/
		playbackRateHash: {
			fastForward: ['2', '4', '8', '16'],
			rewind: ['-2', '-4', '-8', '-16'],
			slowForward: ['1/4', '1/2'],
			slowRewind: ['-1/2', '-1']
		}
	},

	/**
	* @private
	*/
	handlers: {
		onRequestTimeChange: 'timeChange',
		onRequestToggleFullscreen: 'toggleFullscreen',
		onSpotlightKeyUp: 'spotlightKeyUpHandler',
		onSpotlightKeyDown: 'spotlightKeyDownHandler',
		onSpotlightUp: 'spotlightUpHandler',
		onSpotlightDown: 'spotlightDownHandler',
		onSpotlightLeft: 'spotlightLeftRightFilter',
		onSpotlightRight: 'spotlightLeftRightFilter',
		onresize: 'handleResize',
		onholdpulse: 'onHoldPulseHandler',
		onrelease: 'onReleaseHandler'
	},

	/**
	* @private
	*/
	eventsToCapture: {
		onSpotlightFocus: 'capturedFocus'
	},

	/**
	* @private
	*/
	bindings: [
		{from: 'src',						to:'$.video.src'},
		{from: 'sources',					to:'$.video.sourceComponents'},
		{from: 'playbackRateHash',			to:'$.video.playbackRateHash'},
		{from: 'poster',					to:'$.video.poster'},
		{from: 'constrainToBgProgress',		to:'$.slider.constrainToBgProgress'},
		{from: 'elasticEffect',				to:'$.slider.elasticEffect'},
		{from: 'knobIncrement',				to:'$.slider.knobIncrement'},
		{from: 'showJumpControls',			to:'$.jumpForward.showing'},
		{from: 'showJumpControls',			to:'$.jumpBack.showing'},
		{from: 'showFFRewindControls',		to:'$.fastForward.showing'},
		{from: 'showFFRewindControls',		to:'$.rewind.showing'},
		{from: 'showPlayPauseControl',		to:'$.fsPlayPause.showing'},
		{from: 'showVideo',					to:'$.videoContainer.showing'}
	],

	/**
	* @private
	*/
	observers: {
		updateSource: ['src', 'sources']
	},

	/**
	* @private
	*/
	_isPlaying: false,

	/**
	* @private
	*/
	_canPlay: false,

	/**
	* @private
	*/
	_autoCloseTimer: null,

	/**
	* @private
	*/
	_currentTime: 0,

	/**
	* @private
	*/
	_panelsShowing: false,

	/**
	* @private
	*/
	components: [
		{kind: Signals, onPanelsShown: 'panelsShown', onPanelsHidden: 'panelsHidden', onPanelsHandleFocused: 'panelsHandleFocused', onPanelsHandleBlurred: 'panelsHandleBlurred', onFullscreenChange: 'fullscreenChanged', onkeyup:'remoteKeyHandler', onlocalechange: 'updateMoreButton'},
		{name: 'videoContainer', kind: Control, classes: 'moon-video-player-container', components: [
			{name: 'video', kind: Video, classes: 'moon-video-player-video',
				ontimeupdate: 'timeUpdate', onloadedmetadata: 'metadataLoaded', durationchange: 'durationUpdate', onloadeddata: 'dataloaded', onprogress: '_progress', onPlay: '_play', onpause: '_pause', onStart: '_start',  onended: '_stop',
				onFastforward: '_fastforward', onSlowforward: '_slowforward', onRewind: '_rewind', onSlowrewind: '_slowrewind',
				onJumpForward: '_jumpForward', onJumpBackward: '_jumpBackward', onratechange: 'playbackRateChange', ontap: 'videoTapped', oncanplay: '_setCanPlay', onwaiting: '_waiting', onerror: '_error'
			},
			{name: 'spinner', kind: Spinner, accessibilityLabel: $L('Loading'), classes: 'moon-video-player-spinner'}
		]},

		//* Fullscreen controls
		{name: 'fullscreenControl', kind: Control, classes: 'moon-video-player-fullscreen enyo-fit scrim', onmousemove: 'mousemove', components: [

			{name: 'videoInfoHeaderClient', kind: Control, showing: false, classes: 'moon-video-player-top'},

			{name: 'playerControl', kind: Control, classes: 'moon-video-player-bottom', showing: false, components: [
				{name: 'controls', kind: FittableColumns, classes: 'moon-video-player-controls-frame', ontap: 'resetAutoTimeout', components: [

					{name: 'leftPremiumPlaceHolder', kind: Control, classes: 'moon-video-player-premium-placeholder-left'},
					{classes: 'moon-video-player-controls-frame-center', fit: true, components: [

						{name: 'controlsContainer', kind: Panels, reverseForRtl: true, index: 0, popOnBack: false, cacheViews: false, classes: 'moon-video-player-controls-container', components: [
							{name: 'trickPlay', kind: Control, ontap:'playbackControlsTapped', components: [
								{name: 'playbackControls', kind: Control, rtl: false, classes: 'moon-video-player-control-buttons', components: [
									{name: 'jumpBack',		kind: IconButton, small: false, backgroundOpacity: 'translucent', ontap: 'onjumpBackward', accessibilityLabel: $L('Previous')},
									{name: 'rewind',		kind: IconButton, small: false, backgroundOpacity: 'translucent', ontap: 'rewind', accessibilityLabel: $L('Rewind')},
									{name: 'fsPlayPause',	kind: IconButton, small: false, backgroundOpacity: 'translucent', ontap: 'playPause'},
									{name: 'fastForward',	kind: IconButton, small: false, backgroundOpacity: 'translucent', ontap: 'fastForward', accessibilityLabel: $L('Fast Forward')},
									{name: 'jumpForward',	kind: IconButton, small: false, backgroundOpacity: 'translucent', ontap: 'onjumpForward', accessibilityLabel: $L('Next')}
								]}
							]},
							{name: 'client', kind: Control, rtl: false,  classes: 'moon-video-player-more-controls'}
						]}
					]},

					{name: 'rightPremiumPlaceHolder', kind: Control, classes: 'moon-video-player-premium-placeholder-right', components: [
						{name: 'moreButton', kind: IconButton, small: false, backgroundOpacity: 'translucent', ontap: 'moreButtonTapped', accessibilityLabel: $L('More')}
					]}
				]},

				{name: 'sliderContainer', kind: Control, classes: 'moon-video-player-slider-frame', components: [
					{name: 'slider', kind: VideoTransportSlider, rtl: false, disabled: true, onSeekStart: 'sliderSeekStart', onSeek: 'sliderSeek', onSeekFinish: 'sliderSeekFinish',
						onEnterTapArea: 'onEnterSlider', onLeaveTapArea: 'onLeaveSlider', ontap:'playbackControlsTapped'
					}
				]}
			]}
		]},
		//* Inline controls
		{name: 'inlineControl', kind: Control, classes: 'moon-video-player-inline-control', components: [
			{name: 'currPosAnimator', kind: Animator, onStep: 'currPosAnimatorStep', onEnd: 'currPosAnimatorComplete'},
			{name: 'bgProgressStatus', kind: Control, classes: 'moon-video-player-inline-control-bgprogress'},
			{name: 'progressStatus', kind: Control, classes: 'moon-video-player-inline-control-progress'},
			{kind: Control, classes: 'moon-video-player-inline-control-text', components: [
				{name: 'currTime', kind: Control, content: '00:00 / 00:00'}
			]},
			{name: 'ilPlayPause', kind: IconButton, ontap: 'playPause', classes: 'moon-icon-playpause'},
			{name: 'ilFullscreen', kind: VideoFullscreenToggleButton, small: true}
		]}
	],

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.durfmt = new DurationFmt({length: 'medium', style: 'clock', useNative: false});
		this.updateSource();
		this.createInfoControls();
		this.inlineChanged();
		this.showInfoChanged();
		this.autoShowInfoChanged();
		this.autoShowControlsChanged();
		this.autoplayChanged();
		this.updateMoreButton();
		this.showPlaybackControlsChanged();
		this.showProgressBarChanged();
		this.jumpSecChanged();
		this.updatePlaybackControlState();
		this.retrieveIconsSrcOrFont(this.$.jumpBack, this.jumpBackIcon);
		this.retrieveIconsSrcOrFont(this.$.rewind, this.rewindIcon);
		this.retrieveIconsSrcOrFont(this.$.fsPlayPause, this.pauseIcon);
		this.retrieveIconsSrcOrFont(this.$.fastForward, this.fastForwardIcon);
		this.retrieveIconsSrcOrFont(this.$.jumpForward, this.jumpForwardIcon);
		this.retrieveIconsSrcOrFont(this.$.ilFullscreen, this.inlineFullscreenIcon);
		this.$.ilFullscreen.removeClass('moon-icon-exitfullscreen-font-style');
	},

	/**
	* @private
	*/
	checkIconType: function (icon) {
		var imagesrcRegex=/\.(jpg|jpeg|png|gif|svg)$/i;
		var iconType=imagesrcRegex.test(icon)?'image':'iconfont';
		return iconType;
	},

	/**
	* @private
	*/
	disablePlaybackControlsChanged: function () {
		this.updatePlaybackControlState();
	},

	/**
	* @private
	*/
	disablePlaybackControlsOnUnloadChanged: function () {
		this.updatePlaybackControlState();
	},

	/**
	* @private
	*/
	updatePlaybackControlState: function () {
		var disabled = this.disablePlaybackControls ||
			this._panelsShowing ||
			(this.disablePlaybackControlsOnUnload && (this._errorCode || (!this.getSrc() && !this.getSources()) ));
		this.updateSliderState();
		this.$.playbackControls.addRemoveClass('disabled', disabled);
		this.$.jumpBack.setDisabled(disabled);
		this.$.rewind.setDisabled(disabled);
		this.$.fsPlayPause.setDisabled(disabled);
		this.$.fastForward.setDisabled(disabled);
		this.$.jumpForward.setDisabled(disabled);
		this.$.ilPlayPause.setDisabled(disabled);
		var currentSpot = Spotlight.getCurrent();
		if (currentSpot && currentSpot.disabled) {
			if (this.isFullscreen() || !this.getInline()) {
				this.spotFSBottomControls();
			} else {
				Spotlight.spot(this.$.ilFullscreen);
			}
		}
	},

	/**
	* @private
	*/
	playbackControlsTapped: function () {
		if (this.disablePlaybackControls) {
			this.bubble('onPlaybackControlsTapped');
		}
	},

	/**
	* @private
	*/
	rendered: function () {
		Control.prototype.rendered.apply(this, arguments);
		//* Change aspect ratio based on initialAspectRatio
		this.aspectRatioChanged();
	},

	/**
	* @private
	*/
	showPlaybackControlsChanged: function (was) {
		this.$.trickPlay.set('showing', this.showPlaybackControls);
		this.$.moreButton.set('showing', this.showPlaybackControls && this.clientComponentsCount > 2);
		this.toggleSpotlightForMoreControls(!this.showPlaybackControls);
		this.$.client.addRemoveClass('moon-video-player-more-controls', this.showPlaybackControls);
	},

	/**
	* @private
	*/
	showProgressBarChanged: function (was) {
		this.$.sliderContainer.setShowing(this.showProgressBar);
	},

	/**
	* @private
	*/
	updateSource: function (old, value, source) {
		this._canPlay = false;
		this.set('_isPlaying', this.autoplay);
		this._errorCode = null;
		this.updatePlayPauseButtons();
		this.updateSpinner();
		this.updatePlaybackControlState();
		this._resetTime();

		// since src and sources are mutually exclusive, clear the other property
		// when one changes
		if (source === 'src') {
			this.sources = null;
		} else if (source === 'sources') {
			this.src = '';
		}
	},

	/**
	* Returns the underlying {@link module:enyo/Video~Video} control (wrapping the HTML5 video node).
	*
	* @returns {enyo/Video~Video} - An {@link module:enyo/Video~Video} control.
	* @public
	*/
	getVideo: function () {
		return this.$.video;
	},

	/**
	* @private
	*/
	createInfoControls: function () {
		var owner = this.hasOwnProperty('infoComponents') ? this.getInstanceOwner() : this;
		this.$.videoInfoHeaderClient.createComponents(this.infoComponents, {owner: owner});
	},

	/**
	* @private
	*/
	createClientComponents: function (comps) {
		comps = (comps) ? util.clone(comps) : [];
		this.clientComponentsCount = comps.length;
		if (!this._buttonsSetup) {
			this._buttonsSetup = true;
			if (!comps || comps.length === 0) {
				// No components - destroy more button
				this.$.leftPremiumPlaceHolder.hide();
				this.$.rightPremiumPlaceHolder.hide();
			} else if (comps.length <= 2) {
				// One or two components - destroy more button and utilize left/right premium placeholders
				this.$.leftPremiumPlaceHolder.createComponent(comps.shift(), {owner: this.getInstanceOwner()});
				if (comps.length === 1) {
					this.$.rightPremiumPlaceHolder.createComponent(comps.shift(), {owner: this.getInstanceOwner()});
				}
			} else {
				// More than two components - use extra panel, with left premium plaeholder for first component
				this.$.leftPremiumPlaceHolder.createComponent(comps.shift(), {owner: this.getInstanceOwner()});
			}
			// Create the rest of the components in the client (panels)
			this.createComponents(comps, {owner: this.getInstanceOwner()});
		} else {
			Control.prototype.createClientComponents.apply(this, arguments);
		}
	},

	/**
	* @private
	*/
	playIconChanged: function () {
		this.updatePlayPauseButtons();
	},

	/**
	* @private
	*/
	pauseIconChanged: function () {
		this.updatePlayPauseButtons();
	},

	/**
	* @private
	*/
	inlinePlayIconChanged: function () {
		this.updatePlayPauseButtons();
	},

	/**
	* @private
	*/
	inlinePauseIconChanged: function () {
		this.updatePlayPauseButtons();
	},

	/**
	* @private
	*/
	moreControlsIconChanged: function () {
		this.updateMoreButton();
	},

	/**
	* @private
	*/
	lessControlsIconChanged: function () {
		this.updateMoreButton();
	},

	/**
	* @private
	*/
	autoplayChanged: function () {
		this.$.video.setAutoplay(this.autoplay);
		this.set('_isPlaying', this.autoplay);
		this.updatePlayPauseButtons();
		this.updateSpinner();
	},

	/**
	* @private
	*/
	jumpSecChanged: function () {
		this.$.video.setJumpSec(this.jumpSec);
	},

	/**
	* @private
	*/
	disableSliderChanged: function () {
		this.updateSliderState();
	},

	/**
	* @private
	*/
	updateSliderState: function () {
		//* this should be be called on create because default slider status should be disabled.
		var disabled =
			this.disableSlider ||
			this.disablePlaybackControls ||
			!this._loaded ||
			(this.disablePlaybackControlsOnUnload && (this._errorCode || (!this.getSrc() && !this.getSources()) ));
		this.$.slider.setDisabled(disabled);
		// We need an explicit call to showKnobStatus as moon.Slider's disabledChanged method
		// only handles hiding of the knob status. This behavior should not be changed in
		// disabledChanged, as the normal behavior of moon.Slider is to display the knob status
		// upon dragging, whereas moon.VideoPlayer is forcing the knob status to be shown when
		// the slider is visible.
		if (!disabled) {
			this.$.slider.showKnobStatus();
		}
	},

	/**
	* @private
	*/
	autoShowOverlayChanged: function () {
		this.autoShowInfoChanged();
		this.autoShowControlsChanged();
		if (this.autoShowOverlay) {
			this.resetAutoTimeout();
		}
	},

	/**
	* @private
	*/
	autoShowInfoChanged: function () {
		if (this.$.videoInfoHeaderClient.getShowing() && !this.autoShowInfo && !this.showInfo) {
			this.$.videoInfoHeaderClient.hide();
		}
		if (this.autoShowInfo) {
			this.resetAutoTimeout();
		}
	},

	/**
	* @private
	*/
	autoShowControlsChanged: function () {
		if (this.$.playerControl.getShowing() && !this.autoShowControls) {
			this.$.playerControl.hide();
		}
		if (this.autoShowControls) {
			this.resetAutoTimeout();
		}
	},

	/**
	* @private
	*/
	showInfoChanged: function () {
		this.$.videoInfoHeaderClient.setShowing(this.showInfo);

		if (this.showInfo) {
			// Kick off any marquees in the video info header
			this.$.videoInfoHeaderClient.waterfallDown('onRequestStartMarquee');
		}
	},

	/**
	* @private
	*/
	inlineChanged: function () {
		// Force fullscreen
		this.addRemoveClass('enyo-fullscreen enyo-fit', !this.inline);
		// Padding-bottom contains inline controls
		this.addRemoveClass('moon-video-player-inline', this.inline);
		// show hide controls visibility
		this.$.inlineControl.setShowing(this.inline);
		this.$.fullscreenControl.setShowing(!this.inline);
		if (!this.inline) {
			this.$.inlineControl.canGenerate = false;
		}
		this.spotlight = !this.inline;
	},

	/**
	* Unloads the current video source, stopping all playback and buffering.
	*
	* @public
	*/
	unload: function () {
		this.$.video.unload();
		this._resetTime();
		this._loaded = false;
		this.set('_isPlaying', false);
		this._canPlay = false;
		this._errorCode = null;
		this.src = '';
		this.sources = null;
		this.updatePlaybackControlState();
		this.updateSpinner();
	},
	showScrim: function (show) {
		this.$.fullscreenControl.addRemoveClass('scrim', !show);
	},

	/**
	* @private
	*/
	updateSpotability: function () {
		var spotState = this._panelsShowing ? false : (this._controlsShowing ? 'container' : true);
		this.updatePlaybackControlState();
		this.set('spotlight', spotState);
		this.$.leftPremiumPlaceHolder.spotlightDisabled = this._panelsShowing;
		this.$.rightPremiumPlaceHolder.spotlightDisabled = this._panelsShowing;
	},

	/**
	* @private
	*/
	panelsShown: function (sender, e) {
		if (this.isDescendantOf(e.panels)) return;
		this._panelsShowing = true;
		this._controlsShowing = false;
		this._infoShowing = false;
		this.updateSpotability();
		if (e.initialization) {
			return;
		}

		if ((this.isFullscreen() || !this.getInline()) && this.isOverlayShowing()) {
			this.hideFSControls();
			Spotlight.unspot();
		}
	},

	/**
	* @private
	*/
	panelsHidden: function (sender, e) {
		var current;
		if (this.isDescendantOf(e.panels)) return;

		this._panelsShowing = false;
		this.updateSpotability();

		current = Spotlight.getCurrent();
		if (!current || !current.isDescendantOf(this)) {
			Spotlight.spot(this);
		}
	},

	/**
	* @private
	*/
	panelsHandleFocused: function (sender, e) {
		this._infoShowing = this.$.videoInfoHeaderClient.getShowing();
		this._controlsShowing = this.$.playerControl.getShowing();
		this.hideFSControls(true);
	},

	/**
	* @private
	*/
	panelsHandleBlurred: function (sender, e) {
		if (this.isLarge() && !this.isOverlayShowing()) {
			if (this._infoShowing) {
				this.showFSInfo();
			}
			if (this._controlsShowing) {
				util.asyncMethod(this, 'showFSBottomControls');
			}
		}
	},

	/**
	* @private
	*/
	isLarge: function () {
		return this.isFullscreen() || !this.get('inline');
	},

	///// Fullscreen controls /////

	/**
	* @private
	*/
	_holdPulseThreadhold: 400,

	/**
	* @private
	*/
	_holding: false,

	/**
	* @private
	*/
	_sentHold: false,

	/**
	* @private
	*/
	spotlightLeftRightFilter: function (sender, e) {
		if (this._sentHold) return;

		return this.spotlightModal && e.originator === this;
	},

	/**
	* @private
	*/
	spotlightUpHandler: function (sender, e) {
		if (this._sentHold) return;

		if (this.hasClass('spotlight-5way-mode')) this.removeClass('spotlight-5way-mode');
		if (this._shouldHandleUpDown) {
			var current = Spotlight.getCurrent();

			if (current.isDescendantOf(this.$.slider)) {
				if (this.$.controlsContainer.get('index')) return false;
				else Spotlight.spot(this.$.fsPlayPause);
			}
			else if (current == this || current.isDescendantOf(this.$.controls)) {
				// Toggle info header on 'up' press
				if (!this.$.videoInfoHeaderClient.getShowing()) {
					this.showFSInfo();
				} else {
					if (this.allowBackKey) EnyoHistory.drop();
					this.hideFSInfo();
				}
			}
			return true;
		}
	},

	/**
	* @private
	*/
	spotlightKeyUpHandler: function(sender, e) {
		this.resetAutoTimeout();
		gesture.drag.endHold();
	},

	/**
	* @private
	*/
	spotlightDownHandler: function (sender, e) {
		if (this._sentHold) return;

		if (this._shouldHandleUpDown) {
			var current = Spotlight.getCurrent();

			if (current == this) this.showFSBottomControls();
			else if (current.isDescendantOf(this.$.controls)) {
				this.addClass('spotlight-5way-mode');
				Spotlight.spot(this.$.slider);
			}
			else if (current.isDescendantOf(this.$.slider)) {
				if (this.allowBackKey) EnyoHistory.drop();
				this.hideFSBottomControls();
			}
			return true;
		}
	},

	/**
	* @private
	*/
	spotlightKeyDownHandler: function (sender, e) {
		if (!Spotlight.Accelerator.isAccelerating()) {
			gesture.drag.beginHold(e);
		}
		this._shouldHandleUpDown = this.isLarge() && (e.originator === this || Spotlight.getParent(e.originator) === this);
	},

	/**
	* Returns `true` if any piece of the overlay is showing.
	*
	* @private
	*/
	isOverlayShowing: function () {
		return this.$.videoInfoHeaderClient.getShowing() || this.$.playerControl.getShowing();
	},

	/**
	* Resets the timeout, or wakes the overlay.
	*
	* @private
	*/
	mousemove: function (sender, e) {
		if (this.isOverlayShowing()) {
			this.resetAutoTimeout();
		} else if (this.shakeAndWake) {
			this.showFSControls();
		}
	},

	/**
	* Sets `this.visible` to `true` and clears hide job.
	*
	* @private
	*/
	showFSControls: function (sender, e) {
		this.showFSInfo();
		this.showFSBottomControls();
	},

	/**
	* @private
	*/
	hideFSControls: function (spottingHandled) {
		var dropCount;
		if (this.isOverlayShowing()) {
			if (this.allowBackKey) {
				dropCount = 0;
				if (this.$.videoInfoHeaderClient.get('showing')) dropCount++;
				if (this.$.playerControl.get('showing')) dropCount++;
				EnyoHistory.drop(dropCount);
			}

			this.hideFSInfo();
			this.hideFSBottomControls();
		}
		if (!spottingHandled) {
			Spotlight.setPointerMode(false);
			Spotlight.spot(this);
		}
		this.stopJob('autoHide');
	},

	/**
	* Sets `this.visible` to `true` and clears hide job.
	*
	* @private
	*/
	showFSBottomControls: function (sender, e) {
		if (this.autoShowOverlay && this.autoShowControls) {
			this.resetAutoTimeout();
			this.showScrim(true);
			this.$.playerControl.setShowing(true);
			this.$.playerControl.resize();
			if (!this.showPlaybackControls) {
				//* Fixed index
				this.$.controlsContainer.set('index', 1);
			}

			//* Initial spot
			this.spotFSBottomControls();

			this.$.slider.showKnobStatus();
			if (this.$.video.isPaused()) {
				this.updateFullscreenPosition();
			}
			// When controls are visible, set as container to remember last focused control
			this.set('spotlight', 'container');
			if (this.allowBackKey) {
				this.pushBackHistory();
			}
		}
	},

	/**
	* @private
	*/
	spotFSBottomControls: function () {
		if (this.showPlaybackControls) {
			if (this.$.controlsContainer.get('index') === 0) {
				if (Spotlight.spot(this.$.fsPlayPause) === false) {
					if(Spotlight.spot(this.$.fastForward) === false){
						if(Spotlight.spot(this.$.jumpForward) === false) {
							Spotlight.spot(Spotlight.getFirstChild(this.$.controls));
						}
					}
				}
			} else {
				Spotlight.spot(Spotlight.getFirstChild(this.$.controlsContainer.getActivePanel()));
			}
		} else {
			var oTarget = Spotlight.getFirstChild(this.$.leftPremiumPlaceHolder);
			Spotlight.spot(oTarget);
		}
	},

	/**
	* Sets `this.visible` to `false`.
	*
	* @private
	*/
	hideFSBottomControls: function () {
		// When controls are hidden, set as just a spotlight true component,
		// so that it is spottable (since it won't have any spottable children),
		// and then spot itself
		this.set('spotlight', true);
		// when FSBottomControls is closed with timeout, we should recover to get mouse event
		if (this.hasClass('spotlight-5way-mode')) this.removeClass('spotlight-5way-mode');
		// Only spot the player if hiding is triggered from player control
		if (Spotlight.hasCurrent() && Spotlight.getParent(Spotlight.getCurrent()) === this) {
			Spotlight.spot(this);
		}
		if (this.autoHidePopups) {
			// Hide enyo/Popup-based popups (including moon/Popup)
			this.$.playerControl.waterfall('onRequestHide');
			// Hide moon/ContextualPopups
			this.$.playerControl.waterfall('onRequestHidePopup');
		}
		this.showScrim(false);
		this.$.playerControl.setShowing(false);
	},

	/**
	* Sets `this.visible` to `true` and clears hide job.
	*
	* @private
	*/
	showFSInfo: function () {
		if (this.autoShowOverlay && this.autoShowInfo) {
			this.resetAutoTimeout();
			this.$.videoInfoHeaderClient.setShowing(true);
			this.$.videoInfoHeaderClient.resize();

			// Kick off any marquees in the video info header
			this.$.videoInfoHeaderClient.waterfallDown('onRequestStartMarquee');
			if (this.allowBackKey) {
				this.pushBackHistory();
			}
		}
	},

	/**
	* Sets `this.visible` to `false`.
	*
	* @private
	*/
	hideFSInfo: function () {
		if (!this.showInfo) {
			this.$.videoInfoHeaderClient.setShowing(false);
		}
	},

	/**
	* @private
	*/
	resetAutoTimeout: function () {
		if (this.isFullscreen() || !this.getInline()) {
			this.startJob('autoHide', this.bindSafely('hideFSControls'), this.getAutoCloseTimeout());
		}
	},

	/**
	* Toggles play/pause state based on `this.playing`.
	*
	* @private
	*/
	playPause: function (sender, e) {
		if (this._isPlaying) {
			this.pause(sender, e);
		} else {
			this.play(sender, e);
		}
		this.resetAutoTimeout();
		return true;
	},

	/**
	* @private
	*/
	onHoldPulseHandler: function (sender, e) {
		this.stopJob('autoHide');
		if (!this.jumpStartEnd) {
			if (e.holdTime > this._holdPulseThreadhold) {
				if (sender._sentHold !== true) {
					if (sender == this.$.jumpBack) {
						this.jumpToStart(sender, e);
						sender._sentHold = true;
					}
					else if (sender == this.$.jumpForward) {
						this.jumpToEnd(sender, e);
						sender._sentHold = true;
					}
					else this._sentHold = true;
					return true;
				}
			} else {
				if (sender == this.$.jumpBack || sender == this.$.jumpForward) {
					sender._holding = true;
					sender._sentHold = false;
				} else {
					this._holding = true;
					this._sentHold = false;
				}
			}
		}
	},

	/**
	* @private
	*/
	onReleaseHandler: function (sender, e) {
		if (sender == this.$.jumpBack || sender == this.$.jumpForward) {
			if (sender._sentHold && sender._sentHold === true) sender._sentHold = false;
		} else {
			if (this._sentHold && this._sentHold === true) this._sentHold = false;
		}
		this.resetAutoTimeout();
	},

	/**
	* @private
	*/
	onEnterSlider: function (sender, e) {
		if (this.hideButtonsOnSlider) {
			this.$.controls.setShowing(false);
		}
	},

	/**
	* @private
	*/
	onLeaveSlider: function (sender, e) {
		if (this.hideButtonsOnSlider && !this.$.slider.isDragging()) {
			this.$.controls.setShowing(true);
		}
		if (this.hasClass('spotlight-5way-mode')) this.removeClass('spotlight-5way-mode');
	},

	/**
	* @private
	*/
	onjumpBackward: function (sender, e) {
		if (this.jumpStartEnd) {
			this.jumpToStart(sender, e);
		} else {
			if (!sender._holding || (sender._holding && sender._sentHold !== true)) {
				this.jumpBackward(sender, e);
			}
			sender._holding = false;
		}
	},

	/**
	* @private
	*/
	onjumpForward: function (sender, e) {
		if (this.jumpStartEnd) {
			this.jumpToEnd(sender, e);
		} else {
			if (!sender._holding || (sender._holding && sender._sentHold !== true)) {
				this.jumpForward(sender, e);
			}
			sender._holding = false;
		}
	},

	/**
	* @private
	*/
	sendFeedback: function (msg, params, persist, leftSrc, rightSrc) {
		params = params || {};
		this.$.slider.feedback(msg, params, persist, leftSrc, rightSrc);
	},

	////// Slider event handling //////

	/**
	* When seeking starts, pauses video.
	*
	* @private
	*/
	sliderSeekStart: function (sender, e) {
		this._isPausedBeforeDrag = this.$.video.isPaused();
		this.pause();
		return true;
	},

	/**
	* When seeking completes, plays video.
	*
	* @private
	*/
	sliderSeekFinish: function (sender, e) {
		if (e.value < this.duration - 1) {
			if (!this._isPausedBeforeDrag) {
				this.play();
			} else {
				this.pause();
			}
			this._isPausedBeforeDrag = this.$.video.isPaused();
		}
		if (!this.$.slider.isInPreview()) {
			this.$.controls.show();
		}
		this.setCurrentTime(e.value);
		return true;
	},

	/**
	* When seeking, sets video time.
	*
	* @private
	*/
	sliderSeek: function (sender, e) {
		this.setCurrentTime(e.value);
		return true;
	},

	/**
	* Programatically updates slider position to match `this.currentTime`/`this.duration`.
	*
	* @private
	*/
	updateFullscreenPosition: function () {
		if (this.$.slider.isDragging()) {
			return;
		}
		this.$.slider.setValue(this._currentTime);
	},

	/**
	* @private
	*/
	capture: function () {
		dispatcher.capture(this, this.eventsToCapture);
	},

	/**
	* @private
	*/
	release: function () {
		dispatcher.release(this);
	},

	/**
	* @private
	*/
	capturedFocus: function (sender, event) {
		Spotlight.spot(this);
		return true;
	},

	///// Inline controls /////

	/**
	* @private
	*/
	updateInlinePosition: function () {
		var percentComplete = this.duration ? Math.round(this._currentTime * 1000 / this.duration) / 10 : 0;
		this.$.progressStatus.applyStyle('width', percentComplete + '%');
		this.$.currTime.setContent(this.formatTime(this._currentTime) + ' / ' + this.formatTime(this.duration));
	},

	/**
	* @private
	*/
	videoTapped: function () {
		if (this.getInline() && !this.isFullscreen()) {
			this.playPause();
		}
	},

	/**
	* Toggles fullscreen state.
	*
	* @public
	*/
	toggleFullscreen: function () {
		if (this.isFullscreen()) {
			if (this.allowBackKey) EnyoHistory.drop();
			this.cancelFullscreen();
		} else {
			if (this.allowBackKey) this.pushBackHistory();
			this.requestFullscreen();
		}
	},

	/**
	* @private
	*/
	fullscreenChanged: function (sender, e) {
		Spotlight.unspot();
		if (this.isFullscreen()) {
			this.$.ilFullscreen.undepress();
			this.$.ilFullscreen.removeClass('moon-icon-exitfullscreen-font-style');
			this.spotlight = true;
			this.spotlightModal = true;
			this.removeClass('inline');
			this.$.inlineControl.setShowing(false);
			this.$.fullscreenControl.setShowing(true);
			this.showFSControls();
			this.$.controlsContainer.resize();
			this.capture();
		} else {
			this.release();
			this.stopJob('autoHide');
			this.addClass('inline');
			this.$.inlineControl.setShowing(true);
			this.$.fullscreenControl.setShowing(false);
			Spotlight.spot(this.$.ilFullscreen);
			this.spotlight = false;
			this.spotlightModal = false;
		}
		this.updatePosition();
	},

	/**
	* Plays the video.
	*
	* @public
	*/
	play: function () {
		this.currTimeSync = true;
		this.set('_isPlaying', true);
		this.$.video.play();
		this.updatePlayPauseButtons();
		this.updateSpinner();
	},

	/**
	* Pauses the video.
	*
	* @public
	*/
	pause: function () {
		this.set('_isPlaying', false);
		this.$.video.pause();
		this.updatePlayPauseButtons();
		this.updateSpinner();
	},

	/**
	* Changes the playback speed based on the previous playback setting, by cycling through
	* the appropriate speeds.
	*
	* @public
	*/
	rewind: function () {
		this.set('_isPlaying', false);
		this.$.video.rewind();
		this.updatePlayPauseButtons();
		this.updateSpinner();
	},

	/**
	* Jumps to beginning of media [source]{@link module:moonstone/VideoPlayer~VideoPlayer#src} and sets
	* [playbackRate]{@link module:enyo/Video~Video#playbackRate} to `1`.
	*
	* @public
	*/
	jumpToStart: function () {
		this.$.video.jumpToStart();
		this.updatePlayPauseButtons();
		this.updateSpinner();
		if(this._isPlaying){
			this.$.video.play();
		}
	},

	/**
	* Jumps backward [jumpSec]{@link module:moonstone/VideoPlayer~VideoPlayer#jumpSec} seconds from the current time.
	*
	* @public
	*/
	jumpBackward: function () {
		this.$.video.jumpBackward();
		this.updatePlayPauseButtons();
		this.updateSpinner();
	},

	/**
	* Changes the playback speed based on the previous playback setting, by cycling through
	* the appropriate speeds.
	*
	* @public
	*/
	fastForward: function () {
		this.set('_isPlaying', false);
		this.$.video.fastForward();
		this.updatePlayPauseButtons();
		this.updateSpinner();
	},

	/**
	* Jumps to end of media [source]{@link module:moonstone/VideoPlayer~VideoPlayer#src} and sets
	* [playbackRate]{@link module:enyo/Video~Video#playbackRate} to `1`.
	*
	* @public
	*/
	jumpToEnd: function () {
		this.set('_isPlaying', false);
		if ( this.$.video.isPaused() ) {
			//* Make video able to go futher than the buffer
			this.$.video.play();
		}
		this.$.video.jumpToEnd();
		this.updatePlayPauseButtons();
		this.updateSpinner();
	},

	/**
	* Jumps forward [jumpSec]{@link module:moonstone/VideoPlayer~VideoPlayer#jumpSec} seconds from the current time.
	*
	* @public
	*/
	jumpForward: function () {
		this.$.video.jumpForward();
		this.updatePlayPauseButtons();
		this.updateSpinner();
	},

	/**
	* Sets the current time in the video.
	*
	* @param {Number} val - The current time to set the video to, in seconds.
	* @public
	*/
	setCurrentTime: function (val) {
		this.$.video.setCurrentTime(val);
	},

	/**
	* Responds to `onRequestTimeChange` event by setting current video time.
	*
	* @private
	*/
	timeChange: function (sender, e) {
		this.setCurrentTime(e.value);
	},

	/**
	* Refreshes size of video player.
	*
	* @private
	*/
	handleResize: function () {
		this.aspectRatioChanged();
	},

	/**
	* Updates the height/width based on the video's aspect ratio.
	*
	* @private
	*/
	aspectRatioChanged: function () {
		// Case 5: Fixed size provided by user
		if (!this.inline || this.aspectRatio == 'none' || !this.aspectRatio) { return; }

		var videoAspectRatio = null,
			width = this.getComputedStyleValue('width'),
			height = this.getComputedStyleValue('height'),
			ratio = 1;

		videoAspectRatio = this.aspectRatio.split(':');

		// If fixedHeight is true, update width based on aspect ratio
		if (this.fixedHeight) {
			// Case 2: Automatic resize based on video aspect ratio (fixed height):
			// Case 4: Fixed aspect ratio provided by user (fixed-height):
			ratio = videoAspectRatio[0] / videoAspectRatio[1];
			this.applyStyle('width', dom.unit(parseInt(height, 10) * ratio, 'rem'));
		// If fixedHeight is false, update height based on aspect ratio
		} else if (!this.fixedHeight) {
			// Case 1: Automatic resize based on video aspect ratio (fixed width):
			// Case 3: Fixed aspect ratio provided by user (fixed-width):
			ratio = videoAspectRatio[1] / videoAspectRatio[0];
			this.applyStyle('height', dom.unit(parseInt(width, 10) * ratio, 'rem'));
		}
	},

	/**
	* @private
	*/
	updatePosition: function () {
		if (this.isFullscreen() || !this.getInline()) {
			this.updateFullscreenPosition();
		} else {
			this.updateInlinePosition();
		}
	},

	/**
	* Properly formats time.
	*
	* @private
	*/
	formatTime: function (val) {
		var hour = Math.floor(val / (60*60));
		var min = Math.floor((val / 60) % 60);
		var sec = Math.floor(val % 60);
		var time = {minute: min, second: sec};
		if (hour) {
			time.hour = hour;
		}
		return this.durfmt.format(time);
	},

	/**
	* Time formatting helper.
	*
	* @private
	*/
	padDigit: function (val) {
		return (val) ? (String(val).length < 2) ? '0'+val : val : '00';
	},

	/**
	* Switches play/pause buttons as appropriate.
	*
	* @private
	*/
	updatePlayPauseButtons: function () {
		if (this._isPlaying) {
			this.retrieveIconsSrcOrFont(this.$.fsPlayPause, this.pauseIcon);
		} else {
			this.retrieveIconsSrcOrFont(this.$.fsPlayPause, this.playIcon);
		}
		if (this._isPlaying) {
			this.retrieveIconsSrcOrFont(this.$.ilPlayPause, this.inlinePauseIcon);
		} else {
			this.retrieveIconsSrcOrFont(this.$.ilPlayPause, this.inlinePlayIcon);
		}
	},

	/**
	* Retrieves icons through either `setSrc()` or `setIcon()`, depending on the icon type.
	*
	* @private
	*/
	retrieveIconsSrcOrFont:function (src, icon) {
		var iconType = this.checkIconType(icon);

		if (iconType == 'image') {
			src.set('icon', null);
			src.set('src', this.iconPath + icon);
		} else {
			src.set('src', null);
			src.set('icon', icon);
		}
	},

	/**
	* Turns spinner on or off, as appropriate.
	*
	* @private
	*/
	updateSpinner: function () {
		var spinner = this.$.spinner;
		if (this.autoShowSpinner && this._isPlaying && !this._canPlay && !this._errorCode) {
			spinner.start();
			this.addClass("spinner-showing");
		} else if (spinner.getShowing()) {
			this.removeClass("spinner-showing");
			spinner.stop();
		}
	},

	/**
	* @private
	*/
	autoShowSpinnerChanged: function () {
		this.updateSpinner();
	},

	/**
	* When `moreButton` is tapped, toggles visibility of player controls and extra
	* functionality.
	*
	* @private
	*/
	moreButtonTapped: function (sender, e) {
		if (this.$.controlsContainer.isTransitioning()) return true;

		var index = this.$.controlsContainer.get('index');
		if (index === 0) {
			this.retrieveIconsSrcOrFont(this.$.moreButton, this.lessControlsIcon);
			this.toggleSpotlightForMoreControls(true);
			this.$.controlsContainer.next();
		} else {
			this.retrieveIconsSrcOrFont(this.$.moreButton, this.moreControlsIcon);
			this.toggleSpotlightForMoreControls(false);
			this.$.controlsContainer.previous();
		}
	},

	/**
	* @private
	*/
	updateMoreButton: function () {
		var index = this.$.controlsContainer.get('index');
		if (index === 0) {
			this.retrieveIconsSrcOrFont(this.$.moreButton, this.moreControlsIcon);
		} else {
			this.retrieveIconsSrcOrFont(this.$.moreButton, this.lessControlsIcon);
		}
	},

	/**
	* @private
	*/
	toggleSpotlightForMoreControls: function (moreControlsSpottable) {
		this.$.playbackControls.spotlightDisabled = moreControlsSpottable;
		this.$.client.spotlightDisabled = !moreControlsSpottable;
	},

	///////// VIDEO EVENT HANDLERS /////////

	/**
	* Updates the video time.
	*
	* @private
	*/
	timeUpdate: function (sender, e) {
		//* Update _this.duration_ and _this.currentTime_
		if (!e && e.target || e.currentTime === null) {
			return;
		}

		this.duration = e.duration;
		this._currentTime = e.currentTime;

		this.updatePosition();

		this.$.slider.timeUpdate(this._currentTime);
	},

	/**
	* Called when video successfully loads video metadata.
	*
	* @private
	*/
	metadataLoaded: function (sender, e) {
		//* Update aspect ratio based on actual video aspect ratio when autoResize is true.
		if (this.autoResize && this.$.video) {
			this.setAspectRatio(this.$.video.getAspectRatio());
		}
		this.durationUpdate(sender, e);
	},

	/**
	* @private
	*/
	durationUpdate: function (sender, e) {
		this.duration = this.$.video.getDuration();
		this._currentTime = this.$.video.getCurrentTime();

		this.$.slider.setMin(0);
		this.$.slider.setMax(this.duration);

		this.updatePosition();

		this.$.slider.durationUpdate(this.duration);
	},

	/**
	* @private
	*/
	_loaded: false,

	/**
	* @private
	*/
	dataloaded: function (sender, e) {
		this._loaded = true;
		this.updateSliderState();
		this.durationUpdate(sender, e);
	},

	/**
	* @private
	*/
	_getBufferedProgress: function (node) {
		var bufferData = node.buffered,
			numberOfBuffers = bufferData.length,
			highestBufferPoint = 0,
			duration = node.duration || 0,
			endPoint = 0,
			i
		;

		if (duration === 0 || isNaN(duration)) {
			return {value: 0, percent: 0};
		}

		// Find furthest along buffer end point and use that (only supporting one buffer range for now)
		for (i = 0; i < numberOfBuffers; i++) {
			endPoint = bufferData.end(i);
			highestBufferPoint = (endPoint > highestBufferPoint) ? endPoint : highestBufferPoint;
		}
		return {value: highestBufferPoint, percent: highestBufferPoint/duration*100};
	},

	/**
	* We get this event while buffering is in progress.
	*
	* @private
	*/
	_progress: function (sender, e) {
		var buffered = this._getBufferedProgress(e.target);
		if (this.isFullscreen() || !this.getInline()) {
			this.$.slider.setBgProgress(buffered.value);
		} else {
			this.$.bgProgressStatus.applyStyle('width', buffered.percent + '%');
		}
	},

	/**
	* @private
	*/
	_resetTime: function () {
		this._currentTime = 0;
		this.duration = 0;
		this.updatePosition();
		this.$.slider.setBgProgress(0);
		this.$.bgProgressStatus.applyStyle('width', 0);
	},

	/**
	* @private
	*/
	_play: function (sender, e) {
		if(e.playbackRate != this.playbackRateHash.slowRewind[0] && e.playbackRate != this.playbackRateHash.slowForward[0]){
			this.sendFeedback('Play');
		}
	},

	/**
	* @private
	*/
	_pause: function (sender, e) {
		// Don't send pause feedback if we are rewinding
		if (e.target.playbackRate < 0) {
			return;
		}
		if (e.target.currentTime === 0) {
			this.sendFeedback('Stop', {}, true);
			return;
		}
		this.sendFeedback('Pause', {}, true);
	},

	/**
	* @private
	*/
	_stop: function (sender, e) {
		this.pause();
		this.updatePlayPauseButtons();
		this.updateSpinner();
		this.sendFeedback('Stop');
	},

	/**
	* @private
	*/
	_fastforward: function (sender, e) {
		this.sendFeedback('Fastforward', {playbackRate: e.playbackRate}, true);
	},

	/**
	* @private
	*/
	_slowforward: function (sender, e) {
		this.sendFeedback('Slowforward', {playbackRate: e.playbackRate}, true);
	},

	/**
	* @private
	*/
	_rewind: function (sender, e) {
		this.sendFeedback('Rewind', {playbackRate: e.playbackRate}, true);
	},

	/**
	* @private
	*/
	_slowrewind: function (sender, e) {
		this.sendFeedback('Slowrewind', {playbackRate: e.playbackRate}, true);
	},

	/**
	* @private
	*/
	_jumpForward: function (sender, e) {
		this.sendFeedback('JumpForward', {jumpSize: e.jumpSize}, false);
	},

	/**
	* @private
	*/
	_jumpBackward: function (sender, e) {
		this.sendFeedback('JumpBackward', {jumpSize: e.jumpSize}, false);
	},

	/**
	* @private
	*/
	_waiting: function (sender, e) {
		this._canPlay = false;
		this.updateSpinner();
	},

	/**
	* @private
	*/
	_setCanPlay: function (sender, e) {
		this._canPlay = true;
		this.updateSpinner();
	},

	/**
	* @private
	*/
	_error: function (sender, e) {
		// Error codes in e.currentTarget.error.code
		// 1: MEDIA_ERR_ABORTED, 2: MEDIA_ERR_NETWORK, 3: MEDIA_ERR_DECODE,
		// 4: MEDIA_ERR_SRC_NOT_SUPPORTED
		this._errorCode = e.currentTarget.error.code;
		this._loaded = false;
		this.set('_isPlaying', false);
		this._canPlay = false;
		this.$.currTime.setContent($L('Error'));
		this._stop();
		this.updateSpinner();
		this.updatePlaybackControlState();
	},

	/**
	* @private
	*/
	remoteKeyHandler: function (sender, e) {
		if (this.handleRemoteControlKey && !this.disablePlaybackControls) {
			var showControls = false;
			switch (e.keySymbol) {
			case 'play':
				this.play(sender, e);
				showControls = true;
				break;
			case 'pause':
				this.pause(sender, e);
				showControls = true;
				break;
			case 'rewind':
				if (this.showFFRewindControls) {
					this.rewind(sender, e);
					showControls = true;
				}
				break;
			case 'fastforward':
				if (this.showFFRewindControls) {
					this.fastForward(sender, e);
					showControls = true;
				}
				break;
			case 'stop':
				this.set('_isPlaying', false);
				this.jumpToStart();
				this.$.slider.setValue(0);
				this.sendFeedback('Stop');
				showControls = true;
				break;
			}
			if (showControls) {
				if(!this.$.playerControl.getShowing()) {
					this.showFSBottomControls();
				} else {
					this.resetAutoTimeout();
				}
			}
		}
		return true;
	},

	/**
	* @private
	*/
	backKeyHandler: function () {
		var visibleUp = this.$.videoInfoHeaderClient.getShowing(),
			visibleDown = this.$.playerControl.getShowing();

		// if videoInfoHeaderClient and playerControl are visible
		// it means that we pushed video player into history stack twice.
		// to set correct target for next back key, we should pop one instance.
		if (visibleUp && visibleDown) {
			EnyoHistory.drop();
		}

		if (visibleUp) this.hideFSInfo();
		if (visibleDown) this.hideFSBottomControls();

		// if both the videoInfoHeaderClient and playerControl are hidden, then the remaining action
		// to "reverse" is fullscreen mode
		if (!visibleUp && !visibleDown && this.isFullscreen()) {
			this.cancelFullscreen();
		}

		return true;
	},

	// Accessibility

	/**
	* @private
	*/
	ariaObservers: [
		{path: '_isPlaying', method: function () {
			var label = this._isPlaying ? $L('Pause') : $L('Play');
			this.$.fsPlayPause.set('accessibilityLabel', label);
			this.$.ilPlayPause.set('accessibilityLabel', label);
		}},
		{path: '$.controlsContainer.index', method: function () {
			var index = this.$.controlsContainer.index,
				label = index === 0 ? $L('More') : $L('Back');
			this.$.moreButton.set('accessibilityLabel', label);
		}},
		{path: '$.videoInfoHeaderClient.showing', method: function () {
			var client = this.$.videoInfoHeaderClient,
				showing = client.get('showing');

			client.set('accessibilityAlert', showing);
			client.setAriaAttribute('aria-live', showing ? 'off' : null);
			if (!showing) {
				client.set('accessibilityDisabled', false);
			}
		}},
		{path: '$.playerControl.showing', method: function () {
			var client = this.$.videoInfoHeaderClient;
			if (client.get('showing')) {
				client.set('accessibilityDisabled', true);
			}
		}}
	]
});

},{'../i18n':'moonstone/i18n','../VideoFullscreenToggleButton':'moonstone/VideoFullscreenToggleButton','../VideoTransportSlider':'moonstone/VideoTransportSlider'}],'moonstone/NewDataList':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/NewDataList~NewDataList} kind.
* @wip
* @module moonstone/NewDataList
*/

require('moonstone');

var
	kind = require('enyo/kind'),
	NewDataList = require('enyo/NewDataList');

var
	Spotlight = require('spotlight'),
	VDRSpotlightSupport = require('spotlight/VDRSpotlightSupport');

var
	Scrollable = require('../Scrollable'),
	ScrollControls = require('../ScrollControls');

/**
* A Moonstone NewDataList implementation. Currently under development.
*
* @class NewDataList
* @extends module:enyo/NewDataList~NewDataList
* @ui
* @wip
* @public
*/
module.exports = kind({
	name: 'moon.NewDataList',
	kind: NewDataList,
	scrollControls: [{kind: ScrollControls}],
	touch: false,
	mixins: [Scrollable, VDRSpotlightSupport],
	handlers: {
		onSpotlightUp: 'guard5way',
		onSpotlightRight: 'guard5way',
		onSpotlightDown: 'guard5way',
		onSpotlightLeft: 'guard5way'
	},
	/**
	* Prevent accelerating 5-way focus events from trying
	* to spot elements that don't yet have DOM nodes.
	*
	* @private
	*/
	guard5way: function (sender, event) {
		var e, limit, idx, d2x, row, limitRow, movingInScrollDimension;

		e = event.type;
		movingInScrollDimension =
			(this.direction === 'vertical' && (e === 'onSpotlightUp' || e === 'onSpotlightDown')) ||
			(this.direction === 'horizontal' && (e === 'onSpotlightRight' || e === 'onSpotlightLeft'));

		// If we're not accelerating, or not moving along
		// our scrollable dimension, then we don't need to guard
		if (!Spotlight.Accelerator.isAccelerating() || !movingInScrollDimension) return false;

		// Figure out the index of the last de-virtualized element
		// in the direction we're currently scrolling; anything
		// further out doesn't yet have a DOM node
		limit = (e === 'onSpotlightUp' || e === (this.rtl ? 'onSpotlightRight' : 'onSpotlightLeft')) ?
			this.first :
			this._last;

		// Get the index of the currently focused element
		idx = event.index;

		// In case we're in a grid layout, we need to translate
		// these indices into the corresponding row / column
		d2x = this.dim2extent;
		row = Math.floor(idx / d2x);
		limitRow = Math.floor(limit / d2x);

		// If we're in the last de-virtualized row, the element we
		// would focus from here doesn't yet have a DOM node, so
		// we return true to prevent an attempt to focus. We'll wait
		// for the next accelerated 5-way event and try again...
		return (row === limitRow);
	},
	/**
	* Scrolls to a list item (specified by index).
	*
	* In addition to the standard scrolling options, you can specify
	* `focus: true` if you want the item you're scrolling to to be
	* Spotlight focused. Currently, setting `focus: true` forces the
	* scroll behavior to be `instant`, meaning that the scroller will
	* jump to the item (with no animation).
	*
	* @see module:enyo/NewDataList~NewDataList.scrollToItem
	* @param {number} index - The (zero-based) index of the item to scroll to
	* @param {Object} opts - Scrolling options (see module:enyo/Scrollable~Scrollable.scrollTo)
	* @public
	*/
	scrollToItem: function(index, opts) {
		var item;

		if (opts && opts.focus) {
			opts.behavior = 'instant';
		}

		NewDataList.prototype.scrollToItem.apply(this, arguments);

		if (opts && opts.focus && !Spotlight.getPointerMode()) {
			item = this.childForIndex(index);
			if (item) Spotlight.spot(item);
		}
	},
	/**
	* Called by moonstone/Scrollable.filterFocus()
	* @private
	*/
	eventIsFromScrollingChild: function (event) {
		return (typeof event.index === 'number');
	},
	/**
	* Called by moonstone/Scrollable.filterFocus()
	* @private
	*/
	spotFirstVisibleChild: function() {
		var fv = this.getFullyVisibleItems()[0] || this.getVisibleItems()[0];
		if (fv) {
			Spotlight.spot(fv);
			return true;
		}
	},
	/**
	* Called by moonstone/Scrollable.filterFocus()
	* @private
	*/
	eventIsFromVisibleChild: function (event) {
		var control = event.originator,
			controls = this.orderedChildren.slice(this.firstFullyVisibleI, this.lastFullyVisibleI + 1),
			i;

		for (i = 0; i < controls.length; i++) {
			if (control.isDescendantOf(controls[i])) {
				return true;
			}
		}

		return false;
	}
});

},{'../Scrollable':'moonstone/Scrollable','../ScrollControls':'moonstone/ScrollControls'}],'moonstone/LightPanels':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/LightPanels~LightPanels} kind.
* @wip
* @module moonstone/LightPanels
*/

var
	kind = require('enyo/kind'),
	LightPanels = require('enyo/LightPanels');

var
	LightPanel = require('./LightPanel');

/**
* A lightweight panels implementation that has basic support for side-to-side transitions
* between child components.
*
* @class LightPanels
* @extends module:enyo/LightPanels~LightPanels
* @wip
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/LightPanels~LightPanels.prototype */ {

	/**
	* @private
	*/
	name: 'moon.LightPanels',

	/**
	* @private
	*/
	kind: LightPanels,

	/**
	* @private
	*/
	classes: 'moon-light-panels',

	/**
	* @private
	*/
	defaultKind: LightPanel,

	/**
	* @private
	*/
	addChild: function (control) {
		LightPanels.prototype.addChild.apply(this, arguments);
		if (control.parent === this.$.client) control.spotlightDisabled = true;
	},

	/**
	* @private
	*/
	setupTransitions: function (was) {
		this.updateSpottability(was, this.index);
		LightPanels.prototype.setupTransitions.apply(this, arguments);
	},

	/**
	* @private
	*/
	updateSpottability: function (from, to) {
		var panels = this.getPanels(),
			panelPrev = panels[from],
			panelNext = panels[to];

		if (panelPrev) panelPrev.spotlightDisabled = true;
		if (panelNext) panelNext.spotlightDisabled = false;
	},

	// Accessibility

	ariaObservers: [
		{path: 'index', method: function () {
			var panels = this.getPanels(),
				active = panels[this.index],
				l = panels.length,
				panel;

			while (--l >= 0) {
				panel = panels[l];
				if (panel instanceof LightPanel && panel.title) {
					panel.set('accessibilityRole', panel === active ? 'alert' : 'region');
				}
			}
		}}
	]

});

/**
* The {@link module:moonstone/LightPanels~LightPanel} kind export.
* @public
*/
module.exports.Panel = LightPanel;
module.exports.Direction = LightPanels.Direction;
module.exports.Orientation = LightPanels.Orientation;

},{'./LightPanel':'moonstone/LightPanels/LightPanel'}],'moonstone/Panels':[function (module,exports,global,require,request){
/**
* Contains the declaration for {@link module:moonstone/Panels~Panels} and supporting kinds.
* @module moonstone/Panels
*/

require('moonstone');

var
	kind = require('enyo/kind'),
	dispatcher = require('enyo/dispatcher'),
	dom = require('enyo/dom'),
	util = require('enyo/utils'),
	Control = require('enyo/Control'),
	EnyoHistory = require('enyo/History'),
	Signals = require('enyo/Signals'),
	ri = require('enyo/resolution'),
	ViewPreloadSupport = require('enyo/ViewPreloadSupport');

var
	Panels = require('layout/Panels');

var
	Spotlight = require('spotlight');

var
	$L = require('../i18n');

var
	ApplicationCloseButton = require('../ApplicationCloseButton'),
	HistorySupport = require('../HistorySupport'),
	MoonAnimator = require('../MoonAnimator'),
	MoonArranger = require('../MoonArranger'),
	MoonOptions = require('../options'),
	Panel = require('../Panel'),
	StyleAnimator = require('../StyleAnimator');

/**
* {@link module:moonstone/Panels~PanelsHandle} is a helper kind for
* {@link module:moonstone/Panels~Panels}. It implements a spottable handle
* that the user may interact with to hide and show the `moonstone/Panels`
* control.
*
* @class PanelsHandle
* @extends module:enyo/Control~Control
* @ui
* @public
*/
var PanelsHandle = kind(
	/** @lends module:moonstone/Panels~PanelsHandle.prototype */ {

	/**
	* @private
	*/
	name: 'moon.PanelsHandle',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	mixins: [HistorySupport],

	/*
	* @private
	*/
	classes: 'moon-panels-handle',

	/**
	* @private
	*/
	handlers: {
		ontap: 'handleTap'
	},

	/**
	* @private
	*/
	handleTap: function () {
		if (!EnyoHistory.isProcessing()) {
			this.pushBackHistory();
		}
	},

	/**
	* @private
	*/
	backKeyHandler: function () {
		this.bubble('ontap');
		return true;
	},

	/**
	* We override getAbsoluteShowing so that the handle's spottability is not dependent on the
	* showing state of its parent, the {@link module:moonstone/Panels~Panels} control.
	*
	* @private
	*/
	getAbsoluteShowing: function (ignoreBounds) {
		var bounds = !ignoreBounds ? this.getBounds() : null;

		if (!this.generated || this.destroyed || !this.showing || (bounds &&
			bounds.height === 0 && bounds.width === 0)) {
			return false;
		}

		return true;
	}
});

/**
* {@link module:moonstone/Panels~Breadcrumb} is a helper kind for
* {@link module:moonstone/Panels~Panels}. It implements a breadcrumb that
* displays the panel index.
*
* @class Breadcrumb
* @extends module:enyo/Control~Control
* @ui
* @public
*/
var Breadcrumb = kind(
	/** @lends module:moonstone/Panels~Breadcrumb.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Breadcrumb',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	* @lends module:moonstone/Panels~Breadcrumb.prototype
	*/
	published: {
		/*
		* @private
		*/
		index: 0
	},

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	*/
	isOffscreen: false,

	/**
	* @private
	*/
	accessibilityLabel: $L('go to previous'),

	/**
	* @private
	*/
	handlers: {
		ontap: 'tapHandler',
		onSpotlightRight: 'rightHandler'
	},

	/**
	* @private
	*/
	classes: 'moon-panels-breadcrumb',

	/**
	* @private
	*/
	components: [
		{name: 'number', kind: Control, classes: 'moon-panels-breadcrumb-header'}
	],

	/**
	* @private
	*/
	bindings: [
		{from: 'index', to: '$.number.content', transform: 'formatNumber'}
	],

	/**
	* @private
	*/
	formatNumber: function (n) {
		var i=n+1;
		return '< ' + ((i < 10) ? '0' : '') + i;
	},

	/**
	* @private
	*/
	tapHandler: function (sender, event) {
		// decorate
		event.breadcrumbTap = true;
		event.index = this.index;
	},

	/**
	* @private
	*/
	rightHandler: function(sender, event) {
		var panels = this.owner;
		if (this.index+1 ==	panels.index) {
			Spotlight.spot(panels.getActive());
			return true;
		}
	},

	/**
	* @private
	*/
	updateSpotability: function () {
		this.spotlightDisabled = this.isOffscreen;
	},

	/**
	* @private
	*/
	updateBreadcrumb: function (info) {
		this.set('isOffscreen', info.isOffscreen);
		this.updateSpotability();
	}
});


/**
* {@link module:moonstone/Panels~Panels} extends {@link module:layout/Panels~Panels},
* adding support for 5-way focus (Spotlight) and pre-configured Moonstone panels
* design patterns. By default, controls added to a Panels container are instances
* of {@link module:moonstone/Panel~Panel}.
*
* `moonstone/Panels` introduces the concept of patterns for panel display.
* Set [pattern]{@link module:moonstone/Panels~Panels#pattern} to `'activity'`
* or `'alwaysViewing'` to use one of two patterns designed for apps on Smart TV systems.
*
* @class Panels
* @extends module:layout/Panels~Panels
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Panels~Panels.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Panels',

	/**
	* @private
	*/
	kind : Panels,

	/**
	* @private
	*/
	mixins : [HistorySupport, ViewPreloadSupport],

	/**
	* @private
	*/
	classes : 'moon-panels enyo-fit',

	/**
	* @private
	*/
	spotlightDecorate : false,

	/**
	* @private
	* @lends module:moonstone/Panels~Panels.prototype
	*/
	published: {
		/**
		* A convenience property for configuring {@link module:moonstone/Panels~Panels} according to a
		* particular design pattern.  Valid values are `'none'` (default), `'activity'`,
		* and `'alwaysviewing'`. Note that this property may only be set at creation
		* time, and should not be changed at runtime.
		*
		* The `'alwaysviewing'` pattern uses the {@link module:moonstone/BreadcrumbArranger~BreadcrumbArranger} with
		* semi-transparent panels (depending on the color theme) over the right half
		* of the screen, allowing multiple breadcrumbs to accumulate on the left
		* half of the screen.
		*
		* The `'activity'` pattern  uses the `BreadcrumbArranger` with opaque
		* panels over the full screen and only one breadcrumb showing onscreen.
		*
		* The `'none'` pattern should be used when selecting other arrangers, such as
		* {@link module:layout/CarouselArranger~CarouselArranger} or {@link module:layout/CardArranger~CardArranger}.
		*
		* @type {String}
		* @default 'none'
		* @public
		*/
		pattern: 'none',

		/**
		* When [useHandle]{@link module:moonstone/Panels~Panels#useHandle} is used, it is automatically
		* hidden after this amount of time (in milliseconds).
		*
		* @type {Number}
		* @default 4000
		* @public
		*/
		autoHideTimeout: 4000,

		/**
		* When `true`, a handle is created to allow the user to control the showing
		* state of the panels using animation. When `false`, no handle is created and
		* panels may only be hidden/shown programmatically with no animation.
		* When `'auto'` (the default), `useHandle` is set to `true` if the
		* [pattern]{@link module:moonstone/Panels~Panels#pattern} is `'alwaysviewing'` and to `false` if
		* the `pattern` is `'activity'`. Note that this property may only be set at
		* creation time, and should not be changed at runtime. This property
		* only has an effect when using the `'activity'` or `'alwaysviewing'` pattern.
		*
		* @type {String|Boolean}
		* @default 'auto'
		* @public
		*/
		useHandle: 'auto',

		/**
		* Dynamically controls whether the handle is showing.
		* When `true` (the default), the handle is shown and panels may be shown by
		* activating the handle and hidden by re-activating the handle or by tapping
		* outside the panel area. When `false`, the handle is hidden and panels may
		* only be shown or hidden programmatically using the
		* [showing]{@link module:enyo/Control~Control#showing} property or the
		* [show()]{@link module:enyo/Control~Control#show}/[hide()]{@link module:enyo/Control~Control#hide} API.
		* This property only has an effect when [useHandle]{@link module:moonstone/Panels~Panels#useHandle}
		* is `true` (or `'auto'`, resulting in `true`).
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		handleShowing: true,

		/**
		* When `true`, panels are automatically popped when the user moves back.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		popOnBack: false,

		/**
		* When `true`, an ApplicationCloseButton is added to ActivityPanels arranger's Panel Headers.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		hasCloseButton: true,

		/**
		* When `true`, navigating the panel-stack (forward and backward) by 5-way key is disabled.
		* This feature may be helpful to prevent accidental navigation in "wizard" interface
		* scenarios where the user must take explicit action to advance or regress.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		preventKeyNavigation: false,

		/**
		* When `true`, focus can move from panel to breadcrumb when press left key.
		*
		* @type {Boolean}
		* @default true
		* @deprecated This property will be removed in the future.
		* @public
		*/
		leftKeyToBreadcrumb: true,

		/**
		* When `true`, existing views are cached for reuse; otherwise, they are destroyed.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		cacheViews: false
	},

	/**
	* @private
	*/
	narrowFit: false,

	/**
	* @private
	*/
	fractions: {panel: 1, breadcrumb: 1},

	/**
	* @private
	*/
	handlers: {
		ontap:						'tapped',
		onSpotlightUp:				'spotlightUp',
		onSpotlightDown:			'spotlightDown',
		onSpotlightRight:			'spotlightRight',
		onSpotlightLeft:			'spotlightLeft',
		onSpotlightFocus:			'spotlightFocus',
		onSpotlightContainerLeave:	'onSpotlightPanelLeave',
		onSpotlightContainerEnter:	'onSpotlightPanelEnter',
		onCustomizeCloseButton:		'handleCustomizeCloseButton'
	},

	/**
	* @private
	*/
	applicationTools: [
		{name: 'appClose', kind: ApplicationCloseButton, onSpotlightUp: 'spotlightFromCloseButton', onSpotlightDown: 'spotlightFromCloseButton', onSpotlightRight: 'spotlightFromCloseButton', onSpotlightLeft: 'spotlightFromCloseButton'}
	],

	/**
	* @private
	*/
	handleTools: [
		{name: 'backgroundScrim', kind: Control, classes: 'moon-panels-background-scrim'},
		{name: 'clientWrapper', kind: Control, classes: 'enyo-fill moon-panels-client-wrapper', components: [
			{name: 'scrim', kind: Control, classes: 'moon-panels-panel-scrim'},
			{name: 'breadcrumbs', kind: Control, classes: 'moon-panels-breadcrumbs'},
			{name: 'panelsViewport', kind: Control, classes: 'moon-panels-viewport', components: [
				{name: 'client', kind: Control, tag: null}
			]}
		]},
		{name: 'showHideHandle', kind: PanelsHandle, classes: 'hidden', canGenerate: false, ontap: 'handleTap', onSpotlightLeft: 'handleSpotLeft', onSpotlightRight: 'handleSpotRight', onSpotlightFocused: 'handleFocused', onSpotlightBlur: 'handleBlur', tabIndex: -1},
		{name: 'showHideAnimator', kind: StyleAnimator, onComplete: 'showHideAnimationComplete'}
	],

	/**
	* @private
	*/
	animatorTools: [
		{name: 'animator', kind: MoonAnimator, onStep: 'step', useBezier: true, onEnd: 'animationEnded', configs: {
			panel: {
				forward: { startValue: 0, endValue: 1, delay: 0, duration: 230, bezier: [0.69,0.01,0.97,0.59]},
				backward: { startValue: 0, endValue: 1, delay: 0, duration: 300, bezier: [0.06,0.53,0.38,0.99] }
			},
			breadcrumb: {
				forward: { startValue: 0, endValue: 1, delay: 230, duration: 70, bezier: [0.46,0.28,0.76,0.57] },
				backward: { startValue: 0, endValue: 1, delay: 150, duration: 150, bezier: [0.08,0.51,0.24,0.99] }
			}
		}}
	],

	/**
	* @private
	*/
	defaultKind: Panel,

	/**
	* When `false`, dragging is disabled.
	*
	* @private
	*/
	draggable: false,

	/**
	* Default to using `BreadcrumbArranger`.
	*
	* @private
	*/
	arrangerKind: MoonArranger,

	/**
	* Index of panel set in the middle of transition.
	*
	* @private
	*/
	queuedIndex: null,

	/**
	* Flag for blocking consecutive push/pop/replace panel actions to protect
	* create/render/destroy time.
	*
	* @private
	*/
	isModifyingPanels: false,

	/**
	* Flag to indicate if the Panels are currently transitioning to a new index.
	*
	* @private
	*/
	transitioning: false,

	/**
	* Width of breadcrumb.
	*
	* @private
	*/
	breadcrumbWidth: 96,

	/**
	* Checks the state of panel transitions.
	*
	* @return {Boolean} `true` if a transition between panels is currently in progress;
	* otherwise, `false`.
	* @public
	*/
	inTransition: function () {
		return this.transitioning;
	},

	/**
	* Returns list of breadcrumb objects
	*
	* @return {Array} List of breadcrumbs.
	* @public
	*/
	getBreadcrumbs: function () {
		return this.$.breadcrumbs ? this.$.breadcrumbs.children : [];
	},

	/**
	* Returns reference to breadcrumb at the specified index.
	*
	* @public
	*/
	getBreadcrumbForIndex: function (index) {
		var breadcrumbs = this.getBreadcrumbs();
		return breadcrumbs[(index + breadcrumbs.length) % breadcrumbs.length];
	},

	/**
	* Returns maximum number of breadcrumbs that can be fit in the breadcrumb area.
	*
	* @return {Number} Number of breadcrumbs.
	* @public
	*/
	getBreadcrumbMax: function () {
		if (this.pattern == 'activity') return 1;
		// Always viewing pattern is using half screen to show breadcrumbs
		return Math.round(window.innerWidth / 2 / ri.scale(this.breadcrumbWidth));
	},

	/**
	* Returns range of breadcrumb index.
	*
	* @return {Object} Object contains start and end value as a hash. '{start: start, end: end}'
	* @public
	*/
	getBreadcrumbRange: function () {
		/** To support fly weight pattern, we use a concept of a window.
		*	If we are seeing maximum 1 breadcrumb on screen (case of activity pattern),
		*	we arrange 2 breadcrumbs at a time (current and previous) to show animation.
		*	If we move forward from index 2 to 3 (active is 3), the window can be [2, 3].
		*/
		var end = this.index,
			start = end - this.getBreadcrumbs().length;

		// If we move backward from index 4 to 3 (active is 3), the window can be [3, 4].
		if (this.fromIndex > this.toIndex) {
			start = start+1;
			end = end+1;
		}
		return {start: start, end: end};
	},

	/**
	* We just recalculate transition position on pushPanel, because reflow is high cost operation.
	* @private
	*/
	recalcLayout: function () {
		if (this.layout && this.layout.calcTransitionPositions) {
			this.arrangements = [];
			this.layout.calcTransitionPositions();
		} else {
			this.reflow();
		}
	},

	/**
	* Determines the id of the given view.
	*
	* @param {Object} view - The view whose id we will determine.
	* @return {String} The id of the given view.
	* @public
	*/
	getViewId: function (view) {
		return view.id;
	},

	/**
	* Retrieves an array of either cached panels, if found, or creates a new array of panels
	*
	* @param {Object[]} info - The declarative {@glossary kind} definitions.
	* @param {Object} moreInfo - Additional properties to be applied (defaults).
	* @return {Array} List of found or created controls
	* @private
	*/
	createPanels: function (info, moreInfo) {
		var newPanels = [],
			newPanel, idx;

		for (idx = 0; idx < info.length; idx++) {
			newPanel = this.createPanel(info[idx], moreInfo);
			newPanels.push(newPanel);
		}

		return newPanels;
	},

	/**
	* Retrieves a cached panel or, if not found, creates a new panel
	*
	* @param {Object} info - The declarative {@glossary kind} definition.
	* @param {Object} moreInfo - Additional properties to be applied (defaults).
	* @return {Object} - Found or created control
	* @private
	*/
	createPanel: function (info, moreInfo) {
		var panel,
			panelId = this.getViewId(info);

		if (this.cacheViews && panelId) {
			panel = this.restoreView(panelId);
		}

		panel = panel || this.createComponent(info, moreInfo);
		return panel;
	},

	/**
	* Creates a panel on top of the stack and increments index to select that component.
	*
	* @param {Object} info - The declarative {@glossary kind} definition.
	* @param {Object} moreInfo - Additional properties to be applied (defaults).
	* @return {Object} The instance of the panel that was created on top of the stack.
	* @public
	*/
	pushPanel: function (info, moreInfo) { // added
		var startingPanelCount, lastIndex, panel;

		if (this.transitioning || this.isModifyingPanels) return null;

		this.isModifyingPanels = true;

		startingPanelCount = this.getPanels().length;
		lastIndex = startingPanelCount - 1;
		panel = this.createPanel(info, moreInfo);

		panel.render();
		this.addBreadcrumb(true);
		this.recalcLayout();
		panel.resize();
		this.setIndex(lastIndex+1);

		// when we push the first panel, we need to explicitly let our observers know about this as
		// there would not be a change in actual index value
		if (startingPanelCount === 0) {
			// Accessibility - when we push the first panel, we need to set alert role for reading title.
			if (MoonOptions.accessibility) {
				this.setAlertRole();
			}
			this.notifyObservers('index');
		}

		this.isModifyingPanels = false;

		return panel;
	},

	/**
	* Options for the [Panels.pushPanels()]{@link module:moonstone/Panels~Panels.pushPanels} method.
	*
	* @typedef {Object} module:moonstone/Panels~Panels.pushPanels~options
	* @property {Number} targetIndex - The panel index number to immediately switch to. Leaving
	*	this blank or not setting it will perform the default action, which transitions to the
	*	first of the new panels. Setting this to a negative and other 'out of bounds' values
	*	work in conjunction with the `wrap: true` property. Negative values count backward from
	*	the end, while indices greater than the total Panels' panel length wrap around and start
	*	counting again from the beginning.
	* @property {Boolean} transition - Whether to transition or jump directly to the next panel.
	* @public
	*/

	/**
	* Creates multiple panels on top of the stack and updates index to select the last one
	* created. Supports an optional `options` object as the third parameter.
	*
	* @param {Object[]} info - The declarative {@glossary kind} definitions.
	* @param {Object} commonInfo - Additional properties to be applied (defaults).
	* @param {Object} options - Additional options for pushPanels.
	* @return {null|Object[]} Array of the panels that were created on top of the stack, or
	*	`null` if panels could not be created.
	* @public
	*/
	pushPanels: function (info, commonInfo, options) { // added
		var startingPanelCount, lastIndex, panels, panel;

		if (this.transitioning || this.isModifyingPanels) return null;

		this.isModifyingPanels = true;

		if (!options) options = {};

		startingPanelCount = this.getPanels().length;
		lastIndex = startingPanelCount;
		panels = this.createPanels(info, commonInfo);

		for (panel = 0; panel < panels.length; ++panel) {
			panels[panel].render();
		}
		this.addBreadcrumb(true);
		this.recalcLayout();
		if (options.targetIndex || options.targetIndex === 0) {
			lastIndex = options.targetIndex;
		}
		lastIndex = this.clamp(lastIndex);
		for (panel = 0; panel < panels.length; ++panel) {
			panels[panel].resize();
		}
		// If transition was explicitly set to false, since null or undefined indicate 'never set' or unset
		if (options.transition === false) {
			this.setIndexDirect(lastIndex);
		} else {
			this.setIndex(lastIndex);
		}

		// when we push the first panel, we need to explicitly let our observers know about this as
		// there would not be a change in actual index value
		if (startingPanelCount === 0) {
			// Accessibility - when we push the first panel, we need to set alert role for reading title.
			if (MoonOptions.accessibility) {
				this.setAlertRole();
			}
			this.notifyObservers('index');
		}

		this.isModifyingPanels = false;

		return panels;
	},

	/**
	* Destroys panels whose index is greater than or equal to a specified value.
	*
	* @param {Number} index - Index at which to start removing panels.
	* @param {Number} [direction] - The direction in which we are changing indices. A negative
	*	value signifies that we are moving backwards, and want to remove panels whose indices are
	*	greater than the current index. Conversely, a positive value signifies that we are moving
	*	forwards, and panels whose indices are less than the current index should be removed. To
	*	maintain backwards-compatibility with the existing API, this parameter is optional and, if
	*	not specified, will default to the popOnBack behavior.
	* @public
	*/
	popPanels: function (index, direction) {
		if (this.transitioning || this.isModifyingPanels) return;

		var panels = this.getPanels(),
			i;

		this.isModifyingPanels = true;

		if (direction > 0) {
			for (i = 0; i <= index; ++i) {
				this.removePanel(panels[i], true);
			}
		} else {
			index = index || panels.length - 1;

			for (i = panels.length - 1; i >= index; i--) {
				this.removePanel(panels[i]);
			}
		}

		this.removeBreadcrumb();
		this.recalcLayout();
		this.isModifyingPanels = false;
	},

	/**
	* Removes an individual panel.
	*
	* @param {Object} panel - The panel to remove.
	* @param {Boolean} [preserve] - If {@link module:moonstone/Panels~Panels#cacheViews} is `true`,
	*	this value is used to determine whether or not to preserve the current panel's position in
	*	the component hierarchy and on the screen, when caching.
	* @private
	*/
	removePanel: function (panel, preserve) {
		if (panel) {
			if (this.cacheViews) {
				this.cacheView(panel, preserve);
			} else {
				panel.destroy();
			}
		}
	},

	/**
	* Destroys specified panel and creates new panel in-place without transition effect.
	*
	* @param {Number} index - Index of panel to destroy.
	* @param {Object} info - The declarative {@glossary kind} definition.
	* @param {Object} moreInfo - Additional properties to be applied (defaults).
	* @public
	*/
	replacePanel: function (index, info, moreInfo) {
		if (this.transitioning || this.isModifyingPanels) {return;}
		this.isModifyingPanels = true;
		var oPanel = null;

		if (this.getPanels().length > index) {
			this.getPanels()[index].destroy();
			if (this.getPanels().length > index) {
				moreInfo = util.mixin({addBefore: this.getPanels()[index]}, moreInfo);
			}
		}
		oPanel = this.createPanel(info, moreInfo);
		oPanel.render();
		this.resize();
		this.isModifyingPanels = false;
	},

	/**
	* Finds and returns the panel index of the passed-in control. Returns `-1` if
	* panel is not found.
	*
	* @param {Object} oControl - A control to look for.
	* @return {Number} Panel index of control, or `-1` if panel is not found.
	* @public
	*/
	getPanelIndex: function (oControl) {
		var oPanel = null;

		while (oControl && oControl.parent) {
			// Parent of a panel can be a client or a panels.
			if (oControl.parent === this.$.client || oControl.parent === this) {
				oPanel = oControl;
				break;
			}
			oControl = oControl.parent;
		}

		if (oPanel) {
			for (var n=0; n<this.getPanels().length; n++) {
				if (this.getPanels()[n] == oPanel) {
					return n;
				}
			}
		}

		return -1;
	},

	/**
	* Returns `true` if the passed-in control is a child panel of this Panels instance.
	*
	* @param {Object} control - A panel control.
	* @return {Boolean} `true` if the specified control is a child panel of this Panels
	* instance.
	* @public
	*/
	isPanel: function (control) {
		for (var n=0; n<this.getPanels().length; n++) {
			if (this.getPanels()[n] == control) {
				return true;
			}
		}
	},

	/**
	* @private
	*/
	refresh: function () {
		if (this.isMoonAnimatorUsed) {
			for(var k in this.$.animator.configs) {
				this.fractions[k] = 1;
			}
		}
		Panels.prototype.refresh.apply(this, arguments);
	},

	/**
	* @private
	*/
	step: function (sender) {
		if (this.isMoonAnimatorUsed) {
			for(var k in this.$.animator.configs) {
				this.fractions[k] = sender.values[k];
			}
		}
		Panels.prototype.step.apply(this, arguments);
		return true;
	},

	/**
	* @private
	*/
	stepTransition: function () {
		if (!this.hasNode()) return;

		if (this.isMoonAnimatorUsed) {
			this.arrangement = this.arrangement ? this.arrangement : {};
			for(var k in this.$.animator.configs) {
				this.arrangement[k] = this.interpolatesArrangement(this.fractions[k]);
			}
			if (this.layout && this.arrangement.panel && this.arrangement.breadcrumb) {
				this.layout.flowArrangement();
			}
		} else {
			Panels.prototype.stepTransition.apply(this, arguments);
		}
	},

	/**
	* Interpolates between arrangements as needed.
	*
	* @param {Number} [fraction] - A value between 0 to 1.
	* @private
	*/
	interpolatesArrangement: function (fraction) {
		// select correct transition points and normalize fraction.
		var t$ = this.transitionPoints;
		var r = (fraction || 0) * (t$.length-1);
		var i = Math.floor(r);
		r = r - i;
		var s = t$[i], f = t$[i+1];
		// get arrangements and lerp between them
		var s0 = this.fetchArrangement(s);
		var s1 = this.fetchArrangement(f);
		return s0 && s1 ? Panels.lerp(s0, s1, r) : (s0 || s1);
	},

	/**
	* @method
	* @private
	*/
	create: function () {
		Panels.prototype.create.apply(this, arguments);
		this.set('animate', this.animate && MoonOptions.accelerate, true);

		// we need to ensure our handler has the opportunity to modify the flow during
		// initialization
		this.showingChanged();
		// make other panel to spotlightDisabled without the initialPanel;
		this.notifyPanels('initPanel');
	},

	/**
	* @private
	*/
	initComponents: function () {
		this.applyPattern();
		Panels.prototype.initComponents.apply(this, arguments);
		this.isMoonAnimatorUsed = (this.$.animator instanceof MoonAnimator);
		this.addBreadcrumb();
		this.initializeShowHideHandle();
		this.handleShowingChanged();
	},

	/**
	* @private
	*/
	rendered: function () {
		Panels.prototype.rendered.apply(this, arguments);

		this.notifyBreadcrumbs('updateBreadcrumb');

		// Direct hide if not showing and using handle
		if (this.useHandle === true) {
			if (this.showing) {
				this._directShow();
			} else {
				this._directHide();
			}
		}
	},

	/**
	* @private
	*/
	tapped: function (oSender, oEvent) {
		if (oEvent.originator === this.$.showHideHandle || this.pattern === 'none' ||
			this.transitioning === true || this.isModifyingPanels === true) {
			return;
		}

		// If tapped on breadcrambs area (which is located in the left side of panel)
		if (oEvent.originator === this.$.breadcrumbs) {
			if (this.showing && (this.useHandle === true) && this.handleShowing) {
				this.hide();
			}
		} else {
			// If tapped on breadcrumb, go to that panel
			if (oEvent.breadcrumbTap && oEvent.index !== this.getIndex()) {
				this.setIndex(oEvent.index);
			}
		}
	},

	/**
	* This takes action when the CustomizeCloseButton event is received. It accepts several event
	* properties, and in their absence resets each to its original value.
	*
	* Values:
	*   x - (Number|String), positive or negative measurement to offset the X from its natural position.
	*       This value is automatically inverted in RtL mode.
	*   y - (Number|String), positive or negative measurement to offset the X from its natural position.
	*   properties {Object} An object containing key/value pairs to be `set` on the close button.
	*   For example, this can be used to set the `showing` property of the close button. If present
	*   and an object, the `styles` member will be iterated through and each style will be applied
	*   individually and those styles with a `null` value will be removed.
	*
	* Ex:
	*    this.doCustomizeCloseButton({parameters: {showing: false});
	*
	* @private
	*/
	handleCustomizeCloseButton: function (sender, ev) {
		if (this.$.appClose) {
			this.$.appClose.handleCustomizeCloseButton.apply(this.$.appClose, arguments);
		}
	},

	/**
	* Given a direction and starting control, walks up the lineage chain until a suitable control to
	* spot has been found.
	*
	* @param {String} dir - The direction of movement.
	* @param {Object} control - The starting control.
	* @returns {Object} The target that should be spotted.
	* @private
	*/
	getSpotlightTarget: function (dir, control) {
		var ref = control,
			target,
			parent,
			ext;

		// Look at all of the NearestNeighbors up the lineage chain, until we find a good one.
		while (!target) {
			if (!ref || ref instanceof Panel) break;
			parent = Spotlight.getParent(ref);
			// Add app close button as a child of Panel
			if (this.hasCloseButton && parent instanceof Panel) {
				ext = {extraCandidates: this.$.appClose};
			}
			target = Spotlight.NearestNeighbor.getNearestNeighbor(dir, ref, ext);
			ref = parent;
			ext = null;
		}

		return target;
	},

	/**
	* Considers whether or not the application close button should be spotted, and spots
	* accordingly, based on the given movement direction and originating control.
	*
	* @param {String} dir - The direction of movement.
	* @param {Object} orig - The originating control.
	* @returns {Boolean} If `true`, the application close button has been spotted; otherwise,
	*	`false` is returned.
	* @private
	*/
	considerSpottingCloseButton: function (dir, orig) {
		var target;

		target = this.getSpotlightTarget(dir, orig);

		if (target && target.parent instanceof ApplicationCloseButton) {
			Spotlight.spot(target);
			return true;
		}

		return false;
	},

	/**
	* @private
	*/
	spotlightUp: function (sender, ev) {
		return this.considerSpottingCloseButton('UP', ev.originator);
	},

	/**
	* @private
	*/
	spotlightDown: function (sender, ev) {
		return this.considerSpottingCloseButton('DOWN', ev.originator);
	},

	/**
	* @private
	*/
	spotlightLeft: function (sender, ev) {
		if (!this.preventKeyNavigation && !this.leftKeyToBreadcrumb && this.toIndex !== null) {
			this.queuedIndex = this.toIndex - 1;
			//queuedIndex could have out boundary value. It will be managed in setIndex()
		}
		var orig = ev.originator,
			idx = this.getPanelIndex(orig);

		if (this.considerSpottingCloseButton('LEFT', orig)) {
			return true;
		} else if (orig instanceof Panel) {
			if (idx === 0) {
				if (!this.preventKeyNavigation && this.showing && (this.useHandle === true)
						&& this.handleShowing) {
					this.hide();
					return true;
				}
			} else if (!this.leftKeyToBreadcrumb) {
				if (!this.preventKeyNavigation) {
					this.previous();
				} else {
					Spotlight.spot(Spotlight.getLastControl());
				}
				return true;
			} else if (sender instanceof ApplicationCloseButton && this.$.breadcrumbs) {
				Spotlight.spot(this.$.breadcrumbs);
				return true;
			}
		}
	},

	/**
	* @private
	*/
	spotlightRight: function (sender, ev) {
		if (!this.preventKeyNavigation && this.toIndex !== null) {
			this.queuedIndex = this.toIndex + 1;
			//queuedIndex could have out boundary value. It will be managed in setIndex()
		}
		var orig = ev.originator,
			idx = this.getPanelIndex(orig),
			next = this.getPanels()[idx + 1];

		if (this.considerSpottingCloseButton('RIGHT', orig)) {
			return true;
		} else if (next && orig instanceof Panel) {
			if (this.useHandle === true && this.handleShowing && idx == this.index) {
				Spotlight.spot(this.$.showHideHandle);
				return true;
			}
			else {
				if (!this.preventKeyNavigation) {
					this.next();
					return true;
				}
			}
		}
	},

	/**
	* @private
	*/
	spotlightFromCloseButton: function (sender, ev) {
		var p = this.getActive(),
			idx = this.getPanelIndex(p),
			direction = ev.type.substring(11).toUpperCase(),		// Derive direction from type
			target = Spotlight.NearestNeighbor.getNearestNeighbor(direction, ev.originator, {root: p});

		if (target) {
			Spotlight.spot(target);
			return true;
		} else if (direction == 'RIGHT') {
			if (this.useHandle === true && this.handleShowing && idx == this.index) {
				Spotlight.spot(this.$.showHideHandle);
				return true;
			}
		} else if (direction == 'LEFT') {
			this.spotlightLeft(sender, {originator: p});
			return true;
		}
	},

	/**
	* @private
	*/
	spotlightFocus: function (oSender, oEvent) {
		var orig = oEvent.originator;
		var idx = this.getPanelIndex(orig);
		if (orig.owner === this.$.appClose) {
			Spotlight.Container.setLastFocusedChild(this.getActive(), orig);
		}
		if (this.index !== idx && idx !== -1) {
			this.setIndex(idx);
		}
	},

	/**
	* Responds to tap on show/hide handle.
	*
	* @private
	*/
	handleTap: function () {
		this.setShowing(!this.showing);
	},

	/**
	* @private
	*/
	handleSpotLeft: function () {
		if (this.showing) {
			Spotlight.spot(this.getActive());
		} else {
			Spotlight.unspot();
		}
		return true;
	},

	/**
	* @private
	*/
	handleSpotRight: function (sender, event) {
		if (this.showing) {
			return true;
		}
	},

	/**
	* @private
	*/
	handleBlur: function (sender, event) {
		if (this.isHandleFocused) {
			this.set('isHandleFocused', false);
			if (!Spotlight.getPointerMode()) {
				if (!this.showing) {
					this.sendPanelsHiddenSignal();
				}
			}
		}
		this.resetHandleAutoHide();
		if (!this.showing) {
			Signals.send('onPanelsHandleBlurred');
		}
	},

	/**
	* @private
	*/
	sendPanelsHiddenSignal: function () {
		Signals.send('onPanelsHidden', {panels: this});
	},

	/**
	* @private
	*/
	resetHandleAutoHide: function (sender, event) {
		this.startJob('autoHide', 'stashHandle', this.getAutoHideTimeout());
	},

	/**
	* @private
	*/
	stopHandleAutoHide: function (sender, event) {
		this.stopJob('autoHide');
	},

	/**
	* @private
	*/
	stashHandle: function () {
		this.$.showHideHandle.addRemoveClass('stashed', !this.showing);
	},

	/**
	* @private
	*/
	unstashHandle: function () {
		this.stopHandleAutoHide();
		this.$.showHideHandle.removeClass('stashed');
	},

	/**
	* @private
	*/
	handleFocused: function () {
		this.unstashHandle();
		this.startJob('autoHide', 'handleSpotLeft', this.getAutoHideTimeout());
		this.set('isHandleFocused', true);
		Signals.send('onPanelsHandleFocused');
	},

	/**
	* @private
	*/
	handleShowingChanged: function () {
		//* show handle only when useHandle is true
		if (this.useHandle !== true) { return; }
		this.$.showHideHandle.addRemoveClass('hidden', !this.handleShowing);
		this.$.showHideHandle.spotlight = this.handleShowing;
	},

	/**
	* Called when focus enters one of the panels. If currently hiding and
	* `this.useHandle` is `true`, shows handle.
	*
	* @private
	*/
	onSpotlightPanelEnter: function () {
		if (!this.showing && (this.useHandle === true) && this.handleShowing ) {
			Spotlight.spot(this.$.showHideHandle);
			return true;
		}
	},

	/**
	* Sets the index of the active panel, possibly transitioning the panel into view.
	*
	* @param {number} index - Index of the panel to make active.
	* @public
	*/
	setIndex: function (index) {
		var willAnimate = this.shouldAnimate();

		// Normally this.index cannot be smaller than 0 and larger than panels.length
		// However, if panels uses handle and there is sequential key input during transition
		// then index could have -1. It means that panels will be hidden.
		if (this.toIndex === null || this.useHandle === false) {
			index = this.clamp(index);
		}

		if (index === this.index || this.toIndex != null) {
			return;
		}

		var panels, toPanel;

		// Clear before start
		this.queuedIndex = null;
		this._willMove = null;

		// Set indexes before notify panels
		this.fromIndex = this.index;
		this.toIndex = index;

		// Turn on the close-x so it's ready for the next panel; if hasCloseButton is true
		// and remove spottability of close button during transitions.
		if (this.$.appClose) {
			if (this.hasNode()) this.$.appClose.customizeCloseButton({'spotlight': false});
			this.$.appClose.set('showing', this.hasCloseButton);
		}
		this.notifyPanels('initPanel');
		this.notifyBreadcrumbs('updateBreadcrumb');

		// Ensure any VKB is closed when transitioning panels
		this.blurActiveElementIfHiding(index);

		if (this.cacheViews) {
			panels = this.getPanels();
			toPanel = panels[this.toIndex];

			if (!toPanel.generated) {
				if (this.toIndex < this.fromIndex) toPanel.addBefore = panels[this.fromIndex];
				toPanel.render();
			}
		}

		// If panels will move for this index change, kickoff animation. Otherwise skip it.
		if (willAnimate) {
			Spotlight.mute(this);
			this.startTransition();
			this.addClass('transitioning');
		}

		this._setIndex(this.toIndex);
	},

	/**
	* @private
	*/
	blurActiveElementIfHiding: function (index) {
		var activeElement = document.activeElement,
			activeComponent = activeElement ? dispatcher.$[activeElement.id] : null,
			panels = this.getPanels(),
			panel,
			panelInfo;
		if (activeComponent) {
			for (var i = 0; i < panels.length; i++) {
				panel = panels[i];
				if (activeComponent.isDescendantOf(panel)) {
					panelInfo = this.getTransitionInfo(i, index);
					if (panelInfo.isOffscreen) {
						document.activeElement.blur();
					}
					break;
				}
			}
		}
	},

	/**
	* Returns `true` if the panels should animate in the transition from `fromIndex` to
	* `toIndex`.
	*
	* @private
	*/
	shouldAnimate: function () {
		if (this._willMove === null) {
			/*jshint -W093 */
			return (this._willMove = this.animate && this.shouldArrange() && this.getAbsoluteShowing());
			/*jshint +W093 */
		}
		else {
			return this._willMove;
		}
	},

	/**
	* Returns `true` if any panels will move in the transition from `fromIndex` to `toIndex`.
	*
	* @private
	*/
	shouldArrange: function () {
		return this.layout.shouldArrange ? this.layout.shouldArrange(this.fromIndex, this.toIndex) : true;
	},

	/**
	*
	* @private
	*/
	_setIndex: function (index) {
		var prev = this.get('index');
		this.index = this.clamp(index);
		// Accessibility - Before reading the focused item, it must have a alert role for reading the title,
		// so setAlertRole() must be called before notifyObservers('index', prev, index).
		if (MoonOptions.accessibility) {
			this.setAlertRole();
		}
		this.notifyObservers('index', prev, index);
	},

	/**
	* Called when the arranger animation completes.
	*
	* @private
	*/
	animationEnded: function () {
		if (this.animate) {
			this.removeClass('transitioning');
			this.completed();
		} else {
			Panels.prototype.animationEnded.apply(this, arguments);
		}

		return true;
	},

	/**
	* @private
	*/
	getTransitionInfo: function (inPanelIndex) {
		var to = (this.toIndex || this.toIndex === 0) ? this.toIndex : this.index,
			info = {};
		info.isOffscreen = (inPanelIndex != to);
		info.from = this.fromIndex;
		info.to = this.toIndex;
		info.index = inPanelIndex;
		info.animate = this.animate;
		return info;
	},

	/**
	* @private
	*/
	getBreadcrumbPositionInfo: function (bounds, containerBounds) {
		var right = bounds ? bounds.right : null,
			left = bounds ? bounds.left : null,
			panelEdge = containerBounds ? containerBounds.right : null;

		return {isOffscreen: (right == null || left == null || panelEdge == null || right <= 0 || left >= panelEdge)};
	},

	/**
	* Set index to breadcrumb to display number
	*
	* @private
	*/
	assignBreadcrumbIndex: function() {
		var range = this.getBreadcrumbRange(),
			control, i;

		if (this.pattern != 'none') {
			for (i=range.start; i<range.end; i++) {
				control = this.getBreadcrumbForIndex(i);
				control.set('index', i);
			}
		}
	},

	/**
	* @private
	*/
	addBreadcrumb: function (forceRender) {
		if (this.pattern == 'none' || !this.$.breadcrumbs) return;

		// If we have 1 panel then we don't need breadcrumb.
		// If we have more then 1 panel then we need panel - 1 number of breadcrumbs.
		// But, if we can only see 1 breadcrumb on screen like activity pattern
		// then we need 2 breadcrumbs to show animation.
		var len = Math.max(2, Math.min(this.getPanels().length-1, this.getBreadcrumbMax()+1)),
			defs = [],
			prevLen = this.getBreadcrumbs().length,
			breadcrumbs, i;

		for(i=0; i<len-prevLen; i++) {
			defs[i] = {kind: Breadcrumb};
		}
		this.$.breadcrumbs.createComponents(defs, {owner: this});
		if (forceRender) {
			breadcrumbs = this.getBreadcrumbs();
			for (i=prevLen; i<len; i++) {
				breadcrumbs[i].render();
			}
		}
	},

	/**
	* @private
	*/
	removeBreadcrumb: function () {
		if (this.pattern == 'none' || !this.$.breadcrumbs) return;

		// If we have 1 panel then we don't need breadcrumb.
		// If we have more then 1 panel then we need panel - 1 number of breadcrumbs.
		// But, if we can only see 1 breadcrumb on screen like activity pattern
		// then we need 2 breadcrumbs to show animation.
		var len = Math.max(2, Math.min(this.getPanels().length-1, this.getBreadcrumbMax()+1));

		// If we have more than the number of necessary breadcrumb then destroy.
		while (this.getBreadcrumbs().length > len) {
			this.getBreadcrumbs()[this.getBreadcrumbs().length-1].destroy();
		}
	},

	/**
	* Assign direction property on animator to select proper timing function.
	*
	* @private
	*/
	getDirection: function() {
		return  (this.fromIndex == this.toIndex) ? 'none' :
				(this.fromIndex < this.toIndex) ? 'forward' : 'backward';
	},

	/**
	* @private
	*/
	adjustFirstPanelBeforeTransition: function() {
		var idx = this.index,
			from = this.fromIndex,
			trans = this.transitioning;
		if (this.pattern == 'activity') {
			// Show breadcrumbs if we're landing on any panel besides the first
			this.$.breadcrumbs.set('showing', idx > 0);
			// Adjust viewport to show full-width panel if we're landing on OR transitioning from the first panel
			this.addRemoveClass('first', idx === 0 || (trans && from === 0));
		}
	},

	/**
	* @private
	*/
	adjustFirstPanelAfterTransition: function() {
		// Keep viewport adjusted for full-width panel only if we've landed on the first panel
		if (this.pattern == 'activity' && this.index !== 0) {
			this.removeClass('first');
		}
	},

	/**
	* When index changes, make sure to update the breadcrumbed panel's `spotlight` property
	* (to avoid {@glossary Spotlight} issues).
	*
	* @private
	*/
	indexChanged: function (was) {
		var current, delta, deltaAbs, idx;

		this.adjustFirstPanelBeforeTransition();

		if (this.getPanels().length > 0) {
			this.assignBreadcrumbIndex();

			// Set animation direction to use proper timing function before start animation
			// This direction is only consumed by MoonAnimator.
			this.$.animator.direction = this.getDirection();

			// Push or drop history, based on the direction of the index change
			if (this.allowBackKey) {
				was = was || 0;
				delta = this.index - was;
				deltaAbs = Math.abs(delta);

				if (delta > 0) {
					for (idx = 0; idx < deltaAbs; idx++) {
						this.pushBackHistory(idx + was);
					}
				} else {
					current = EnyoHistory.peek();

					// ensure we have history to drop - if the first history entry's index corresponds
					// to the index prior to our current index, we assume the other entries exist
					if (current && current.index + 1 == was) {
						EnyoHistory.drop(deltaAbs);
					}
				}
			}
		}

		Panels.prototype.indexChanged.apply(this, arguments);
	},

	/**
	* @private
	*/
	notifyPanels: function (method) {
		var panels = this.getPanels(),
			panel, info, i;
		for (i = 0; (panel = panels[i]); i++) {
			info = this.getTransitionInfo(i);
			if (panel[method]) {
				panel[method](info);
			}
		}
	},

	/**
	* @private
	*/
	notifyBreadcrumbs: function (method) {
		if (this.pattern == 'none' || !this.$.breadcrumbs) return;

		var range = this.getBreadcrumbRange(),
			containerBounds = this.$.breadcrumbs.getAbsoluteBounds(),
			control, bounds, info, i;
		for (i=range.start; i<range.end; i++) {
			control = this.getBreadcrumbForIndex(i);
			bounds = control.getAbsoluteBounds();
			info = this.getBreadcrumbPositionInfo(bounds, containerBounds);
			if (control[method]) {
				control[method](info);
			}
		}
	},

	/**
	* @private
	*/
	processPanelsToRemove: function(fromIndex, toIndex) {
		var direction = toIndex < fromIndex ? -1 : 1,
			removeFrom;

		// Remove panels that are no longer on screen
		if (this.cacheViews || (direction < 0 && this.popOnBack)) {
			removeFrom = toIndex - direction;
			this.popPanels(removeFrom, direction);
		}
	},

	processQueuedKey: function() {
		// queuedIndex becomes -1 when left key input is occurred
		// during transition from index 1 to 0.
		// We can hide panels if we use handle.
		if (this.queuedIndex === -1 && this.useHandle) {
			this.hide();
		} else if (this.queuedIndex !== null) {
			this.setIndex(this.queuedIndex);
		}
	},

	/**
	* @private
	*/
	finishTransition: function () {
		var fromIndex = this.fromIndex,
			toIndex = this.toIndex;

		this.adjustFirstPanelAfterTransition();
		this.notifyPanels('transitionFinished');
		this.notifyBreadcrumbs('updateBreadcrumb');
		Panels.prototype.finishTransition.apply(this, arguments);
		this.processPanelsToRemove(fromIndex, toIndex);
		this.processQueuedKey();
		Spotlight.unmute(this);
		Spotlight.spot(this.getActive());
		this.$.appClose && this.$.appClose.customizeCloseButton({'spotlight': true});  // Restore spotlightability of close button.
	},

	/**
	* Override the default `getShowing()` behavior to avoid setting `this.showing` based on the
	* CSS `display` property.
	*
	* @private
	*/
	getShowing: function () {
		return this.showing;
	},

	/**
	* @private
	*/
	showingChanged: function (inOldValue) {
		// Accessibility - Before reading the focused item, it must have a alert role for reading the title,
		// so setAlertRole() must be called before Spotlight.spot
		if (MoonOptions.accessibility) {
			this.setAlertRole();
		}
		if (this.$.backgroundScrim) {
			this.$.backgroundScrim.addRemoveClass('visible', this.showing);
		}
		if (this.useHandle === true) {
			if (this.showing) {
				this.unstashHandle();
				this._show();
				Spotlight.spot(this.getActive());
			}
			else {
				// in this case, our display flag will have been set to none so we need to clear
				// that even though the showing flag will remain false
				this.applyStyle('display', null);
				this.resetHandleAutoHide();
				this._hide();
			}
			this.sendShowingChangedEvent(inOldValue);

			if (this.$.appClose) this.$.appClose.set('showing', (this.showing && this.hasCloseButton));
		}
		else {
			Panels.prototype.showingChanged.apply(this, arguments);
		}
	},

	/**
	* @private
	*/
	applyPattern: function () {
		if (this.pattern != 'alwaysviewing') {
			this.createChrome(this.applicationTools);
			this.hasCloseButtonChanged();
		}
		switch (this.pattern) {
		case 'alwaysviewing':
		case 'activity':
			this.addClass(this.pattern);
			this.useHandle = (this.useHandle === 'auto') ? (this.pattern == 'activity' ? false : true) : this.useHandle;
			this.createChrome(this.handleTools);
			this.tools = this.animatorTools;
			break;
		default:
			this.useHandle = false;
			this.createChrome([{name: 'client', kind: Control, tag: null}]);
			break;
		}
	},

	/**
	* @private
	*/
	initializeShowHideHandle: function () {
		if (this.useHandle === true) {
			this.$.showHideHandle.canGenerate = true;
			this.$.showHideHandle.spotlight = true;
		}
	},

	/**
	* Shows panels with transition from right.
	*
	* @private
	*/
	_show: function () {
		var init = false;
		if (!this.hasNode()) {
			init = true;
		} else {
			this.$.showHideHandle.addClass('right');
			this.applyShowAnimation();
		}
		Signals.send('onPanelsShown', {initialization: init, panels: this});
	},

	/**
	* Hides panels with transition to right.
	*
	* @private
	*/
	_hide: function () {
		if (!this.hasNode()) {
			return;
		}
		this.$.showHideHandle.removeClass('right');
		this.applyHideAnimation();
		this.sendPanelsHiddenSignal();
	},

	/**
	* Sets show state without animation.
	*
	* @private
	*/
	_directShow: function () {
		this.$.showHideHandle.addClass('right');
		if (this.handleShowing) {
			this.$.showHideHandle.removeClass('hidden');
		}
		this.applyShowAnimation(true);
	},

	/**
	* Sets hide state without animation.
	*
	* @private
	*/
	_directHide: function () {
		this.$.showHideHandle.addClass('hidden');
		this.$.showHideHandle.removeClass('right');
		this.applyHideAnimation(true);
		this.hideAnimationComplete();
	},

	/**
	* @private
	*/
	applyShowAnimation: function (direct) {
		this.$.clientWrapper.applyStyle('transition', direct ? null : 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)');
		this.$.clientWrapper.applyStyle('-webkit-transition', direct ? null : '-webkit-transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)');
		dom.transform(this.$.clientWrapper, {translateX: 0});
	},

	/**
	* @private
	*/
	applyHideAnimation: function (direct) {
		this.$.clientWrapper.applyStyle('transition', direct ? null : 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)');
		this.$.clientWrapper.applyStyle('-webkit-transition', direct ? null : '-webkit-transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)');
		dom.transform(this.$.clientWrapper, {translateX: '100%'});
	},

	/**
	* Hide/show animation complete.
	*
	* @private
	*/
	showHideAnimationComplete: function (sender, event) {
		switch (event.animation.name) {
		case 'show':
			this.showAnimationComplete();
			return true;
		case 'hide':
			this.hideAnimationComplete();
			return true;
		}
	},

	/**
	* @private
	*/
	showAnimationComplete: function () {
		if (this.handleShowing) {
			this.$.showHideHandle.removeClass('hidden');
		}
	},

	/**
	* @private
	*/
	hideAnimationComplete: function () {
		if (this.handleShowing) {
			this.$.showHideHandle.removeClass('hidden');
		}
	},

	/**
	* @private
	*/
	animateChanged: function () {
		this.addRemoveClass('moon-composite', this.animate);
	},

	/**
	* @private
	*/
	backKeyHandler: function (entry) {
		var index = entry.index;

		if (this.transitioning) this.queuedIndex = index;
		else this.setIndex(index);

		return true;
	},

	/**
	* @private
	*/
	hasCloseButtonChanged: function () {
		if (!this.$.appClose) return;
		this.$.appClose.set('showing', (this.showing && this.hasCloseButton));
		this.addRemoveClass('has-close-button', this.hasCloseButton);
	},

	/**
	* @private
	*/
	pushBackHistory: function (index) {
		EnyoHistory.push({
			context: this,
			handler: this.backKeyHandler,
			index: index
		});

		return true;
	},

	// Accessibility

	/**
	* @private
	*/
	ariaObservers: [
		// If panels is hidden and panelsHandle is spotlight blured, also make panelsHandle's dom blur.
		{path: 'isHandleFocused', method: function () {
			if (this.$.showHideHandle && this.$.showHideHandle.hasNode() && !this.isHandleFocused) {
				this.$.showHideHandle.hasNode().blur();
			}
		}}
	],

	/**
	* @private
	*/
	setAlertRole: function () {
		var panels = this.getPanels(),
			active = this.getActive(),
			l = panels.length,
			panel;

		if (this.$.showHideHandle) {
			if (active && active.title) {
				this.$.showHideHandle.set('accessibilityLabel', (this.showing ? $L('Close') : $L('Open')) + ' ' + active.title);
			} else {
				this.$.showHideHandle.set('accessibilityLabel', this.showing ? $L('Close') : $L('Open'));
			}
		}

		while (--l >= 0) {
			panel = panels[l];
			if (panel instanceof Panel && panel.title) {
				panel.set('accessibilityRole', (panel === active) && this.get('showing') ? 'alert' : 'region');
			}
		}
	}

});

},{'../i18n':'moonstone/i18n','../ApplicationCloseButton':'moonstone/ApplicationCloseButton','../HistorySupport':'moonstone/HistorySupport','../MoonAnimator':'moonstone/MoonAnimator','../MoonArranger':'moonstone/MoonArranger','../options':'moonstone/options','../Panel':'moonstone/Panel','../StyleAnimator':'moonstone/StyleAnimator'}],'moonstone/ExpandableListItem':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ExpandableListItem~ExpandableListItem} kind.
* @module moonstone/ExpandableListItem
*/

var
	kind = require('enyo/kind'),
	Component = require('enyo/Component'),
	Control = require('enyo/Control'),
	EnyoHistory = require('enyo/History'),
	Group = require('enyo/Group');

var
	Spotlight = require('spotlight');

var
	HistorySupport = require('../HistorySupport'),
	Item = require('../Item');

var
	ExpandableListItemHeader = require('./ExpandableListItemHeader'),
	ExpandableListItemDrawer = require('./ExpandableListItemDrawer');

/**
* {@link module:moonstone/ExpandableListItem~ExpandableListItem}, which extends {@link module:moonstone/Item~Item}, displays a header
* while also allowing additional content to be stored in an {@link module:enyo/Drawer~Drawer}. When
* the header is selected, the drawer opens below. To close the drawer, tap on the
* header text or navigate (via 5-way) back to the top of the drawer.
*
* The control's child components may be of any kind; by default, they are
* instances of `moonstone/Item`.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		ExpandableListItem = require('moonstone/ExpandableListItem');
*
* 	{kind: ExpandableListItem, content: 'A Countries', components: [
* 		{content: 'Algeria'},
* 		{content: 'Argentina'},
* 		{content: 'Australia'}
* 	]},
* 	{kind: ExpandableListItem, content: 'B Countries', components: [
* 		{content: 'Belgium'},
* 		{content: 'Bolivia'},
* 		{content: 'Brazil'}
* 	]}
* ```
*
* When multiple ExpandableListItems are used in a group, only one may be open at
* a given time.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Group = require('enyo/Group'),
* 		ExpandableListItem = require('moonstone/ExpandableListItem');
*
* 	{kind: Group, highlander: true, components: [
* 		{kind: ExpandableListItem,  open: true,
* 			content: 'This is a grouped ExpandableListItem', components: [
* 				{content: 'Item One'},
* 				{content: 'Item Two'}
* 		]
* 	},
* 	{kind: ExpandableListItem,
* 		content: 'This is another grouped ExpandableListItem', components: [
* 			{content: 'Item Three'},
* 			{content: 'Item Four'}
* 		]
* 	},
* 	{kind: ExpandableListItem,
* 		content: 'This is yet another grouped ExpandableListItem', components: [
* 			{content: 'Item Five'},
* 			{content: 'Item Six'}
* 		]
* 	}
* ```
*
* @class ExpandableListItem
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ExpandableListItem~ExpandableListItem.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ExpandableListItem',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	mixins: [HistorySupport],

	/**
	* @private
	* @lends module:moonstone/ExpandableListItem~ExpandableListItem.prototype
	*/
	published: {

		/**
		* If `true`, the drawer automatically closes when the user navigates to the top of the
		* control; if `false`, the user must select/tap the header to close the drawer.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		autoCollapse: false,

		/**
		* If `true`, the drawer is expanded, showing this item's contents. Use this property
		* (rather than [active]{@link module:moonstone/ExpandableListItem~ExpandableListItem#active}) to set the item's
		* initial state.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		open: false,

		/**
		* Boolean that reflects the value of the [open]{@link module:moonstone/ExpandableListItem~ExpandableListItem#open}
		* property; it is used to support the {@link module:enyo/Group~Group} API for grouping a set of
		* ExpandableListItems in which only one is expanded at a time. Note that the `open`
		* property (not the `active` property) controls the initial state of the picker.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		active: false,

		/**
		* If `true`, the user is prevented from moving {@glossary Spotlight} past the bottom
		* of the drawer (when open) using 5-way controls.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		lockBottom: false,

		/**
		* If `true`, item is shown as disabled and does not generate tap events.
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
	classes: 'moon-expandable-list-item',

	/**
	* @private
	*/
	spotlight: 'container',

	/**
	* @private
	*/
	defaultKind: Item,

	/**
	* This is used to track whether or not we have pushed a history entry for ourselves.
	*
	* @private
	*/
	hasHistoryEntry: false,

	/**
	* @private
	*/
	handlers: {
		onSpotlightContainerEnter: 'addHistoryEntry',
		onSpotlightContainerLeave: 'removeHistoryEntry'
	},

	/**
	* @private
	*/
	drawerComponents: [
		{name: 'client', kind: Group, tag: null}
	],

	/**
	* @private
	*/
	components: [
		{name: 'header', kind: ExpandableListItemHeader, ontap: 'headerTapped'},
		{name: 'drawer', kind: ExpandableListItemDrawer, resizeContainer: false, classes: 'moon-expandable-list-item-client', defaultSpotlightUp: 'header', onSpotlightUp: 'drawerSpotUp', onSpotlightDown: 'drawerSpotDown', onDrawerAnimationEnd: 'drawerAnimationEnd'}
	],

	/**
	* @private
	*/
	bindings: [
		{from: 'active', to: 'open'},
		{from: 'allowHtml', to: '$.header.allowHtml'},
		{from: 'disabled', to: '$.header.disabled'},
		{from: 'content', to: '$.header.label'},
		{from: 'currentValueShowing', to: '$.header.textShowing'},
		{from: 'currentValueText', to: '$.header.text'},

		// Accessibility
		{from: 'accessibilityHint', to: '$.header.accessibilityHint'},
		{from: 'accessibilityLabel', to: '$.header.accessibilityLabel'},
		{from: 'accessibilityDisabled', to: '$.header.accessibilityDisabled'}
	],

	/**
	* @private
	*/
	computed: {
		'currentValueShowing': ['open', 'currentValueText'],
		'currentValueText': ['value']
	},

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.openChanged();
		this.disabledChanged();
		this.notifyObservers('value');
	},

	/**
	* @private
	*/
	initComponents: function () {
		var override = {drawer: {components: this.drawerComponents}};
		this.kindComponents = Component.overrideComponents(this.kindComponents, override);
		Control.prototype.initComponents.apply(this, arguments);
	},

	/**
	* Facade for drawer.
	*
	* @private
	*/
	openChanged: function () {
		var open = this.open;
		this.bubble('onActivate', {allowHighlanderDeactivate: true});
		this.addRemoveClass('open', open);
		this.$.drawer.set('open', open);
		this.$.drawer.spotlightDisabled = !open;
		this.set('active', open);
	},

	/**
	* @fires module:enyo/GroupItem~GroupItem#onActivate
	* @private
	*/
	activeChanged: function () {
		this.bubble('onActivate', {allowHighlanderDeactivate:true});
		this.set('open', this.active);
	},

	/**
	* @private
	*/
	disabledChanged: function () {
		var disabled = this.disabled;

		this.addRemoveClass('disabled', disabled);
		if (disabled) {
			this.set('active', false);
		}
	},

	/**
	* Returns `true` if the current value control should be displayed.
	*
	* Note: ExpandableListItem doesn't support currentValue but its subkinds do
	*
	* @private
	*/
	currentValueShowing: function () {
		var text = this.get('currentValueText');
		// If drawer is open or value is blank, don't bother to show the value.
		return (!this.open && (text || text === 0));
	},

	/**
	* Returns the text to be displayed within the current value control
	*
	* Note: ExpandableListItem doesn't support currentValue but its subkinds do
	*
	* @private
	*/
	currentValueText: function () {
		return '';
	},

	/**
	* If closed, opens drawer and highlights first spottable child.
	*
	* @private
	*/
	expandContract: function () {
		if (this.open) {
			this.closeDrawerAndHighlightHeader();
		} else {
			this.toggleActive();
			if (!Spotlight.getPointerMode() && !Spotlight.isFrozen()) {
				var first = Spotlight.getFirstChild(this.$.drawer);
				Spotlight.spot(first);
			}
			// As we could have entered the expandable when it was closed, we need to explicitly add
			// the history entry when it is opened.
			this.addHistoryEntry();
		}
	},

	/**
	* @private
	*/
	toggleActive: function () {
		this.set('active', !this.open);
	},

	/**
	* @private
	*/
	closeDrawerAndHighlightHeader: function () {
		var current = Spotlight.getPointerMode() ? Spotlight.getLastControl() : Spotlight.getCurrent();

		this.removeHistoryEntry();

		// If the spotlight is elsewhere, we don't want to hijack it (e.g. after the delay in
		// ExpandablePicker)
		if (!current || current.isDescendantOf(this)) {
			Spotlight.spot(this.$.header);
		}
		this.set('active', false);
	},

	/**
	* @private
	*/
	drawerSpotUp: function (sender, ev) {
		if (this.autoCollapse && ev.originator == this.$.drawer) {
			this.closeDrawerAndHighlightHeader();
			return true;
		}
	},

	/**
	* @private
	*/
	drawerSpotDown: function (sender, ev) {
		if (this.lockBottom && ev.originator == this.$.drawer && ev._originator) {
			// Spotlight containers redispatch 5-way events with the original event originator
			// saved as _originator which we'll use to respot if lockBottom === true
			Spotlight.spot(ev._originator, {direction: 'DOWN'});
			return true;
		}
	},

	/**
	* @protected
	*/
	addHistoryEntry: function () {
		if (this.allowBackKey && !this.hasHistoryEntry && this.open) {
			this.pushBackHistory();
			this.hasHistoryEntry = true;
		}
	},

	/**
	* @protected
	*/
	removeHistoryEntry: function () {
		if (this.allowBackKey && this.hasHistoryEntry) {
			EnyoHistory.drop();
			this.hasHistoryEntry = false;
		}
	},

	/**
	* @private
	*/
	headerTapped: function (sender, ev) {
		this.expandContract();
	},

	/**
	* When an expandable is in a group, we only want the opening control to scroll into view so that
	* event only fires when the drawer is open. Otherwise, we just request the scroller update its
	* bounds so that an expandable at the bottom of a scroller does not leave extra whitespace when
	* it closes.
	*
	* @fires module:moonstone/Scroller~Scroller#onRequestScrollIntoView
	* @fires module:moonstone/Scroller~Scroller#onRequestSetupBounds
	* @private
	*/
	drawerAnimationEnd: function () {
		if (this.$.drawer.open) {
			this.bubble('onRequestScrollIntoView', {scrollInPointerMode: true});
		} else {
			this.bubble('onRequestSetupBounds');
		}
		return true;
	},

	/**
	* @private
	*/
	backKeyHandler: function () {
		var current = Spotlight.getCurrent();

		this.hasHistoryEntry = false;

		// In the case where Spotlight focus is not on one of the items in the expandable, but there
		// was still an entry history from this control, we must be in a situation where the pointer
		// has moved away from the control and we have yet to spot another item. We should then
		// effectively "pass on" the back action by calling the "pop" method of History.
		if (current && current.isDescendantOf(this)) {
			this.closeDrawerAndHighlightHeader();
		} else {
			EnyoHistory.pop();
		}

		return true;
	},

	// Accessibility

	/**
	* ExpandableListItem has not spotlight, its child (this.$.header) is spottable item,
	* so we remove unneccessary aria-related attributes.
	*
	* @private
	*/
	ariaObservers: [
		{path: ['accessibilityLabel', 'accessibilityHint'], method: function () {
			this.setAriaAttribute('aria-label', null);
		}}
	]
});

},{'../HistorySupport':'moonstone/HistorySupport','../Item':'moonstone/Item','./ExpandableListItemHeader':'moonstone/ExpandableListItem/ExpandableListItemHeader','./ExpandableListItemDrawer':'moonstone/ExpandableListItem/ExpandableListItemDrawer'}],'moonstone/RadioItemGroup':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/RadioItemGroup~RadioItemGroup} kind.
* @module moonstone/RadioItemGroup
*/

var
	kind = require('enyo/kind'),
	Group = require('enyo/Group');

var
	RadioItem = require('../RadioItem');

/**
* {@link module:moonstone/RadioItemGroup~RadioItemGroup} is a container in which
* a group of {@link module:moonstone/RadioItem~RadioItem} objects are laid out
* horizontally. Within a group, only one item may be active at a time; tapping
* on an item will deactivate any previously-tapped item.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		RadioItemGroup = require('moonstone/RadioItemGroup');
*
* 	{kind: RadioItemGroup, onActivate: 'buttonActivated', components: [
* 		{content: 'Lions', selected: true},
* 		{content: 'Tigers'},
* 		{content: 'Bears'}
* 	]}
* ```
*
* @class RadioItemGroup
* @extends module:enyo/Group~Group
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/RadioItemGroup~RadioItemGroup.prototype */ {

	/**
	* @private
	*/
	name: 'moon.RadioItemGroup',

	/**
	* @private
	*/
	kind: Group,

	/**
	* @private
	*/
	classes: 'moon-radio-item-group',

	/**
	* @private
	*/
	defaultKind: RadioItem
});

},{'../RadioItem':'moonstone/RadioItem'}],'moonstone/DataList':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/DataList~DataList} kind.
* @module moonstone/DataList
*/

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	DataList = require('enyo/DataList');

var
	Spotlight = require('spotlight');

var
	Scroller = require('../Scroller');

/**
* {@link module:moonstone/DataList~DataListSpotlightSupport} is a {@glossary mixin} that provides
* {@glossary Spotlight} handling code for use by {@link module:moonstone/DataList~DataList} and
* {@link module:moonstone/DataGridList~DataGridList}. Since both of these [kinds]{@glossary kind} inherit
* from their respective Enyo counterparts, this mixin provides the common add-on
* code needed for proper spotlight handling.
*
* @mixin
* @private
*/
var DataListSpotlightSupport = {

	/**
	* @private
	* @lends module:moonstone/DataList~DataListSpotlightSupport.prototype
	*/
	published: {
		/**
		* The index of the item to focus at render time, or `-1` for no focused item.
		*
		* @type {Number}
		* @default -1
		* @public
		*/
		initialFocusIndex: -1,

		/**
		* Restores scroll position and focus when the DataList is re-rendered.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		restoreStateOnRender: false
	},

	/**
	* @private
	*/
	handlers: {
		onSpotlightUp    : '_spotlightPrev',
		onSpotlightLeft  : '_spotlightPrev',
		onSpotlightDown  : '_spotlightNext',
		onSpotlightRight : '_spotlightNext',
		onSpotlightBlur  : '_spotlightBlur'
	},

	/**
	* @private
	*/
	focusOnIndex: function (inIndex, inSubChild) {
		var c = this.collection,
			child,
			subChild;
		if (c && c.length && this.hasRendered) {  // Give focus if list is rendered
			inIndex = inIndex < 0 ? 0 : (inIndex >= c.length ? c.length - 1 : inIndex);
			child = this.childForIndex(inIndex);
			if (!child) {
				this.scrollToIndex(inIndex);
				child = this.childForIndex(inIndex);
			}
			subChild = inSubChild ? Spotlight.getChildren(child)[inSubChild] : child;
			Spotlight.spot(subChild) || Spotlight.spot(this);
		} else {
			this._indexToFocus = inIndex;
			this._subChildToFocus = inSubChild;
		}
	},

	/**
	* @private
	*/
	getFocusedIndex: function () {
		var focusedChild = this.getFocusedChild();
		return focusedChild ? this.getIndexFromChild(focusedChild) : -1;
	},

	/**
	* @private
	*/
	getFocusedChild: function () {
		var current = Spotlight.getCurrent();
		return (current && current.isDescendantOf(this.$.active)) ? current : null;
	},

	/**
	* @private
	*/
	_indexToFocus: -1,

	/**
	* @private
	*/
	_maxVisibleIndex: -1,

	/**
	* @private
	*/
	_subChildToFocus: null,

	/**
	* @private
	*/
	render: function () {
		// Need to do this here because enyo/DataList (our superkind) forcibly tears down our
		// scroller, thereby altering the normal teardown sequence and preventing our main mechanism
		// for saving scroll state (in teardownChildren()) from working in the case where we are
		// explicitly re-rendered via a call to our own render() method. We also guard against
		// attempting to remember scroll state if our metrics have not yet been initialized.
		if (this.restoreStateOnRender && this.hasReset) {
			this.rememberScrollState();
		}
		DataList.prototype.render.apply(this, arguments);
	},

	/**
	* @private
	*/
	didRender: function () {
		var current;
		// Lists are set to spotlight:true by default, which allows them to receive focus before
		// children are rendered; once rendred, it becomes spotlight:false, and the code below
		// ensures spotlight is transferred inside the list once rendering is complete
		this.spotlight = false;
		// If there is a queued index to focus (or an initialFocusIndex), focus that item now that
		// the list is rendered
		this._indexToFocus = (this._indexToFocus > -1) ? this._indexToFocus : this.initialFocusIndex;
		if (this._indexToFocus > -1 || this._maxVisibleIndex > -1) {
			this.restoreState();
		} else {
			// Otherwise, check if the list was focused and if so, transfer focus to the first
			// spottable child inside
			current = Spotlight.getCurrent();
			if (current && current.isDescendantOf(this)) {
				Spotlight.spot(Spotlight.getFirstChild(this.$.active));
			}
		}
	},

	/**
	* @private
	* @method
	*/
	didScroll: kind.inherit(function (sup) {
		return function () {
			// When scrolling in pointer mode, we unspot the last focused child, to prevent it from
			// looping as new pages come up
			var spot;
			if (Spotlight.getPointerMode() &&
				((spot = Spotlight.getCurrent()) && (spot === this || spot.isDescendantOf(this.$.active)))) {
				Spotlight.unspot();
				this._unspotSinceSpot = true;
			}
			return sup.apply(this, arguments);
		};
	}),

	/**
	* @private
	*/
	_spotlightNext: function (inSender, inEvent) {
		return this._spotlightSelect(inEvent, 1);
	},

	/**
	* @private
	*/
	_spotlightPrev: function (inSender, inEvent) {
		return this._spotlightSelect(inEvent, -1);
	},

	/**
	* @private
	*/
	_spotlightBlur: function (sender, event) {
		if (this.restoreStateOnRender && !event.next) {
			this.rememberFocus();
		}
	},

	/**
	* Spots the next/previous control. Handles the case where this control may not be
	* generated yet; otherwise, the default behavior occurs and is handled by Spotlight.
	*
	* @private
	*/
	_spotlightSelect: function (inEvent, inDirection) {
		var pages = this.delegate.pagesByPosition(this),
			spottableControl;

		// If there are no spottable items generated in the current pages, generate the subsequent page(s)
		// based on the current direction
		if (!this.getNextSpottableChild(inDirection)) {
			// Find the next spottable control in the appropriate direction
			if (inDirection === 1) {
				spottableControl = this.findSpottableControl(inDirection, pages.firstPage, pages.lastPage.index + 1);
			} else if (inDirection === -1) {
				spottableControl = this.findSpottableControl(inDirection, pages.lastPage, pages.firstPage.index - 1);
			}

			if (spottableControl) {
				// Explicitly handle spotting of the control we found
				Spotlight.spot(spottableControl);
				return true;
			}
		} else if (this.needToAdjustPages) {
			// Sometimes after models added, page adjustment might be required.
			var pagesForIndex = this.delegate.pageForIndex(this, inEvent.index),
				pageCount = this.delegate.pageCount(this),
				lastPageIndex = pages.lastPage.index;

			// If current selected index is lastPage and there is no page
			// then lower bound of scrollThreshold is undefined because it is useless
			// However after models are added then more pages could be generated
			// We need to check whether current list's position passes scrollThreshold or not.
			if (pagesForIndex === lastPageIndex && pageCount -1 !== lastPageIndex) {
				this.didScroll(this, {scrollBounds: {left: null, top: null, xDir: 1, yDir: 1}});
				this.needToAdjustPages = false;
			}
		}
	},

	/**
	* Finds the next/previous spottable control, the page to generate the next
	* page worth of controls in, and the index of the next page to generate.
	*
	* @private
	*/
	findSpottableControl: function (inDirection, inPage, inPageIndex) {
		if ((inPageIndex > this.delegate.pageCount(this) - 1) || inPageIndex < 0) {
			return null;
		}
		this.delegate.generatePage(this, inPage, inPageIndex);
		this.delegate.adjustPagePositions(this);
		this.delegate.adjustBuffer(this);

		var pages = this.delegate.pagesByPosition(this),
			control = this.getNextSpottableChild(inDirection);

		if (!control) {
			if (inDirection === 1) {
				return this.findSpottableControl(inDirection, inPage === pages.firstPage ? pages.lastPage : pages.firstPage, inPageIndex + 1);
			} else if (inDirection === -1) {
				return this.findSpottableControl(inDirection, inPage === pages.firstPage ? pages.lastPage : pages.firstPage, inPageIndex - 1);
			}
		}
		return control;
	},

	/**
	* @private
	*/
	previewDomEvent: function (inEvent) {
		// When spotlight is being applied back to the list after being unspotted, check that the child being
		// focused is visible and if not, spot the first visible child that is
		if ((inEvent.type == 'onSpotlightFocus') && this._unspotSinceSpot) {
			if (Spotlight.getPointerMode()) {
				this._unspotSinceSpot = false;
			} else {
				var target = inEvent.originator;
				if (target != this) {
					// Calculate the target bounds, relative to the scrollBounds
					var tb = target.getBounds();
					var p = target.isDescendantOf(this.$.page1) ? this.$.page1 : this.$.page2;
					var pb = p.getBounds();
					// Need to add page offset to target bounds
					tb.top += pb.top;
					tb.left += pb.left;
					var sb = this.$.scroller.getScrollBounds();
					// Check if target is inside the current scrollBounds
					if ((tb.top < sb.top) ||
						(tb.left < sb.left) ||
						((tb.top + tb.height) > (sb.top + sb.clientHeight)) ||
						((tb.left + tb.width) > (sb.left + sb.clientWidth))) {
						// Not in view, so find and spot the first visible child
						var vc = this.getFirstVisibleChild(sb);
						if (vc) {
							this._unspotSinceSpot = false;
							Spotlight.spot(vc);
						}
						return true;
					} else {
						this._unspotSinceSpot = false;
					}
				}
			}
		}
	},

	/**
	* @private
	*/
	getFirstVisibleChild: function (inScrollBounds) {
		// Loop through the pages in top-down order
		var pages = (this.$.page1.index < this.$.page2.index) ?
			[this.$.page1, this.$.page2] :
			[this.$.page2, this.$.page1],
			pageIdx,
			page,
			pb,
			i,
			c,
			cb;

		for (pageIdx = 0; pageIdx < pages.length; pageIdx++) {
			page = pages[pageIdx];
			pb = page.getBounds();
			// Loop through children in each page top-down
			for (i=0; i<page.children.length; i++) {
				c = page.children[i];
				cb = c.getBounds();
				// Need to add page offset to target bounds
				cb.top += pb.top;
				cb.left += pb.left;
				// Return the first spottable child whose top/left are inside the viewport
				if ((cb.top >= inScrollBounds.top) && ((this.rtl ? (inScrollBounds.width - (cb.left + cb.width)) : cb.left) >= inScrollBounds.left)) {
					if (Spotlight.isSpottable(c)) {
						return c;
					}
					c = Spotlight.getFirstChild(c);
					if (c) {
						return c;
					}
				}
			}
		}

		return null;
	},

	/**
	* Retrieves the next/previous spottable child from the generated controls,
	* starting from the given index.
	*
	* @private
	*/
	getNextSpottableChild: function (inDirection, inFocusedIndex) {
		var i,
			page,
			pageIndex,
			control,
			controlIndex,
			focusedIndex = this.getFocusedIndex(),
			pages = (inDirection === 1 && this.$.page1.index < this.$.page2.index || inDirection === -1 && this.$.page1.index > this.$.page2.index)
				? [this.$.page1, this.$.page2] : [this.$.page2, this.$.page1];

		// Explore the controls in the current pages
		for (pageIndex = 0; pageIndex < pages.length; pageIndex++) {
			page = pages[pageIndex];
			if (inDirection === 1) {
				// Loop through children in each page top-down
				for (i = 0; i < page.children.length; i++) {
					control = page.children[i];
					controlIndex = this.getIndexFromChild(control);
					// If we have already passed our current item or no item is selected, we can return the next spottable control
					if (controlIndex > focusedIndex || focusedIndex < 0) {
						if (Spotlight.isSpottable(control, false)) {
							return control;
						}
						control = Spotlight.getFirstChild(control);
						if (control) {
							return control;
						}
					}
				}
			} else if (inDirection === -1) {
				// Loop through children in each page bottom-up
				for (i = page.children.length - 1; i >= 0; i--) {
					control = page.children[i];
					controlIndex = this.getIndexFromChild(control);
					// If we have already passed our current item or no item is selected, we can return the next spottable control
					if (controlIndex < focusedIndex || focusedIndex < 0) {
						if (Spotlight.isSpottable(control, false)) {
							return control;
						}
						control = Spotlight.getFirstChild(control);
						if (control) {
							return control;
						}
					}
				}
			}
		}
		return null;
	},

	/**
	* @private
	*/
	getItemFromChild: function (oControl) {
		while (oControl) {
			if (oControl.index !== undefined) {
				return oControl;
			}
			oControl = oControl.parent;
		}
		return null;
	},

	/**
	* @private
	*/
	getIndexFromChild: function (oControl) {
		var item = this.getItemFromChild(oControl);
		return item ? item.index : -1;
	},

	/**
	* @private
	*/
	unspotAndRememberFocus: function () {
		if (this.rememberFocus()) {
			Spotlight.unspot();
		}
	},

	/**
	* @private
	*/
	rememberFocus: function () {
		var current = this.getFocusedChild(),
			focusedItem;
		if (current) {
			focusedItem = this.getItemFromChild(current);
			this._indexToFocus = focusedItem.index;
			this._subChildToFocus = focusedItem === current ? null : Spotlight.getChildren(focusedItem).indexOf(current);
			return true;
		}
	},

	/**
	* @private
	*/
	clearState: function () {
		this._indexToFocus = -1;
		this._maxVisibleIndex = -1;
		this._subChildToFocus = null;
	},

	/**
	* @private
	*/
	restoreState: function () {
		var index = this._indexToFocus,
			maxVisibleIndex = this._maxVisibleIndex,
			subChild = this._subChildToFocus,
			c = this.collection,
			callback;
		if (c && c.length && (index > -1 || maxVisibleIndex > -1)) {
			// If there's a valid maxVisibleIndex, we've saved a scroll position so we need to
			// restore it and then update spotlight.
			if (maxVisibleIndex > -1) {
				callback = (index > -1) ?
					this.bindSafely(this.focusOnIndex, index, subChild) :
					// This ugly hack is required because scrolling to a control
					// in Moonstone by default sets that control to be the last focused
					// child (even if we don't actually focus it). In this case, we
					// don't want that, so we need to clean up after ourselves.
					util.bind(Spotlight.Container, 'setLastFocusedChild', this.$.scroller, null);

				this.scrollToIndex(maxVisibleIndex, callback);
			}
			// If we aren't restoring scroll position, we just need to update spotlight
			else {
				this.focusOnIndex(index, subChild);
			}
			this.clearState();
		}
	},

	/**
	* @private
	*/
	rememberScrollState: function () {
		var maxVisibleIndex = this.getVisibleControlRange().end;

		if (!isNaN(maxVisibleIndex)) {
			this._maxVisibleIndex = maxVisibleIndex;
		}
	},

	/**
	* Implement the `beforeTeardown()` lifecycle method so that we
	* can remember which controls were on screen and restore them
	* upon re-rendering
	*
	* @private
	*/
	beforeTeardown: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			if (this.restoreStateOnRender) {
				this.rememberScrollState();
			}
			else {
				this.clearState();
			}
		};
	}),

	/**
	* @method
	* @private
	*/
	didResize: kind.inherit(function (sup) {
		return function (sender, event) {
			this.unspotAndRememberFocus();
			sup.apply(this, arguments);
			this.restoreState();
		};
	}),

	/**
	* @method
	* @private
	*/
	modelsAdded: kind.inherit(function (sup) {
		return function (c, e, props) {
			this.unspotAndRememberFocus();
			sup.apply(this, arguments);
			this.restoreState();
			// For specific case, page adjusting is required after models added
			this.needToAdjustPages = true;
		};
	}),

	/**
	* @method
	* @private
	*/
	modelsRemoved: kind.inherit(function (sup) {
		return function (c, e, props) {
			this.unspotAndRememberFocus();
			sup.apply(this, arguments);
			this.restoreState();
		};
	})
};

/**
* {@link module:moonstone/DataList~DataList} is an {@link module:enyo/DataList~DataList} with Moonstone styling
* applied.  It uses {@link module:moonstone/Scroller~Scroller} as its default scroller.
*
* @class DataList
* @extends module:enyo/DataList~DataList
* @mixes module:moonstone/DataList~DataListSpotlightSupport
* @ui
* @public
*/
var MoonDataList = module.exports = kind(
	/** @lends module:moonstone/DataList~DataList.prototype */ {

	/**
	* @private
	*/
	name: 'moon.DataList',

	/**
	* @private
	*/
	kind: DataList,

	/**
	* @private
	*/
	mixins: [DataListSpotlightSupport],

	/**
	* @private
	*/
	noDefer: true,

	/**
	* @private
	*/
	allowTransitions: false,

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	*/
	scrollerOptions: { kind: Scroller, horizontal: 'hidden' }
});

/**
* Spotlight support
*/
MoonDataList.SpotlightSupport = DataListSpotlightSupport;

/**
* Overload the delegate strategy to incorporate measurements for our scrollers
* when they are visible.
*
* @private
*/
MoonDataList.delegates.vertical   = util.clone(DataList.delegates.vertical);
MoonDataList.delegates.horizontal = util.clone(DataList.delegates.horizontal);
var exts = {
	/**
	* Overriding refresh() to stop scroller and stop scrolling.
	*
	* @method
	* @private
	*/
	refresh: kind.inherit(function (sup) {
		return function (list) {
			sup.apply(this, arguments);
			list.$.scroller.stop();
		};
	}),

	/**
	* Overriding reset() to prevent unnecessary generation of initial set of pages.
	*
	* @method
	* @private
	*/
	reset: kind.inherit(function (sup) {
		return function (list) {
			var index = list._indexToFocus = (list._indexToFocus > -1) ? list._indexToFocus : list.initialFocusIndex,
				maxVisibleIndex = list._maxVisibleIndex,
				p;

			// generate specific page that corresponds to desired index
			if (maxVisibleIndex > -1 || index > -1) {
				list.metrics.pages = {};
				p = this.pageForIndex(list, maxVisibleIndex == -1 ? index : maxVisibleIndex);
				this.resetToPosition(list, this.pagePosition(list, p));
			} else {
				sup.apply(this, arguments);
			}
		};
	}),

	/**	Overriding scrollToControl() to specify Moonstone-specific scroller options.
	* No need to call the super method, so we don't wrap in enyo.inherit().
	*
	* @method
	* @private
	*/
	scrollToControl: function(list, control) {
		list.$.scroller.scrollToControl(control, false, false, true);
	},

	/**
	* Overriding scrollTo() to specify Moonstone-specific scroller options.
	* No need to call the super method, so we don't wrap in enyo.inherit().
	*
	* @method
	* @private
	*/
	scrollTo: function(list, x, y) {
		list.$.scroller.scrollTo(x, y, false);
	}
};
kind.extendMethods(MoonDataList.delegates.vertical, exts, true);
kind.extendMethods(MoonDataList.delegates.horizontal, exts, true);

},{'../Scroller':'moonstone/Scroller'}],'moonstone/SimpleIntegerPicker':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/SimpleIntegerPicker~SimpleIntegerPicker} kind.
* @module moonstone/SimpleIntegerPicker
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom');

var
	IntegerPicker = require('../IntegerPicker');

var
	$L = require('../i18n');

/**
* Fires when the currently selected item changes.
*
* @event module:moonstone/SimpleIntegerPicker~SimpleIntegerPicker#onChange
* @type {Object}
* @property {Number} value - The value of the currently selected item.
* @property {String} content - The content of the currently selected item.
* @public
*/

/**
* Fires in response to Return keypress while the picker has focus in
* {@glossary Spotlight} 5-way mode.
*
* @event module:moonstone/SimpleIntegerPicker~SimpleIntegerPicker#onSelect
* @type {Object}
* @property {Number} value - The value of the currently selected item.
* @property {String} content - The content of the currently selected item.
* @public
*/

/**
* Fires when the picker is rebuilt, allowing other controls the opportunity to reflow
* the picker as necessary (e.g., a child of a {@link module:moonstone/ExpandableIntegerPicker~ExpandableIntegerPicker} may
* need to be reflowed when the picker is opened, as it may not be currently visible).
* No event-specific data is sent with this event.
*
* @event module:moonstone/SimpleIntegerPicker~SimpleIntegerPicker#onRebuilt
* @type {Object}
* @public
*/

/**
* {@link module:moonstone/SimpleIntegerPicker~SimpleIntegerPicker} is a [control]{@link module:enyo/Control~Control} that prompts the
* user to make a selection from a range of integer-based options.
*
* The picker may be changed programmatically by calling
* [previous()]{@link module:moonstone/IntegerPicker~IntegerPicker#previous} or
* [next()]{@link module:moonstone/IntegerPicker~IntegerPicker#next}, or by modifying the published property
* [value]{@link module:moonstone/IntegerPicker~IntegerPicker#value}.
*
* @class SimpleIntegerPicker
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/SimpleIntegerPicker~SimpleIntegerPicker.prototype */ {

	/**
	* @private
	*/
	name: 'moon.SimpleIntegerPicker',

	/**
	* @private
	*/
	kind: IntegerPicker,

	/**
	* @private
	*/
	classes: 'moon-simple-integer-picker',

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	*/
	events: {
		onSelect: ''
	},

	/**
	* @private
	*/
	handlers: {
		onSpotlightUp: null,
		onSpotlightDown: null,
		onSpotlightRight: 'next',
		onSpotlightLeft: 'previous',
		onSpotlightSelect: 'fireSelectEvent'
	},

	/**
	* @lends module:moonstone/SimpleIntegerPicker~SimpleIntegerPicker.prototype
	* @private
	* @lends module:moonstone/SimpleIntegerPicker~SimpleIntegerPicker.prototype
	*/
	published: {

		/**
		* Unit label to be appended to the value for display.
		*
		* @type {String}
		* @default 'sec'
		* @public
		*/
		unit: 'sec'
	},

	/**
	* Number of pixels added to the width of each picker item as padding. Note that this
	* is not a CSS padding value.
	*
	* @type {Number}
	* @default 60
	* @public
	*/
	itemPadding: 60,

	/**
	* Appends unit to content, forming label for display.
	*
	* @see module:moonstone/IntegerPicker~IntegerPicker.labelForValue
	* @private
	* @method
	*/
	labelForValue: function (value) {
		var content = IntegerPicker.prototype.labelForValue.apply(this, arguments);
		return this.unit? content + ' ' + this.unit : content;
	},

	/**
	* @private
	*/
	unitChanged: function(){
		this.valueChanged();
	},

	/**
	* Calculates width of the picker when the first item is rendered.
	*
	* @see module:moonstone/IntegerPicker~IntegerPicker.updateRepeater
	* @private
	* @method
	*/
	updateRepeater: function () {
		IntegerPicker.prototype.updateRepeater.apply(this, arguments);

		if(!this.width) {
			var ib;
			this.$.repeater.performOnRow(this.$.repeater.rowOffset, function() {
				// have to reset to natural width before getting bounds
				this.$.item.setStyle('width: auto');
				ib = this.$.item.getBounds();
			}, this);

			this.width = ib.width + this.itemPadding;
			this.applyStyle('width', dom.unit(this.width, 'rem'));
			this.$.item.setStyle('width: ' + dom.unit(this.width, 'rem'));
		}
	},

	/**
	* @fires module:moonstone/SimpleIntegerPicker~SimpleIntegerPicker#onSelect
	* @private
	*/
	fireSelectEvent: function () {
		if (this.hasNode()) {
			this.doSelect({
				content: this.labelForValue(this.value),
				value: this.value
			});
		}
	},

	/**
	* Forces recalculation of the width of the picker.
	*
	* @see module:enyo/UiComponent~UiComponent.reflow
	* @private
	* @method
	*/
	reflow: function () {
		this.width = 0;
		IntegerPicker.prototype.reflow.apply(this, arguments);
	},

	// Accessibility

	/**
	* @private
	*/
	ariaObservers: [
		{path: 'unit',  method: function () {
			this.set('accessibilityHint', null);
			this.ariaValue();
		}},
		{path: 'spotted',  method: function () {
			// When spotlight is focused, it reads value with hint
			if (this.spotted) {
				if (!this.wrap && this.value == this.min) {
					this.set('accessibilityHint', $L('change a value with right button'));
				} else if (!this.wrap && this.value == this.max) {
					this.set('accessibilityHint', $L('change a value with left button'));
				} else {
					this.set('accessibilityHint', $L('change a value with left right button'));
				}
			}
		}}
	],

	/**
	* @private
	*/
	ariaValue: function () {
		var text = this.accessibilityValueText || 
					(this.unit ? this.value + ' ' + this.unit : this.value);
		this.setAriaAttribute('aria-valuetext', text);
	}
});

},{'../IntegerPicker':'moonstone/IntegerPicker','../i18n':'moonstone/i18n'}],'moonstone/Accordion':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Accordion~Accordion} kind.
* @module moonstone/Accordion
*/

var
	kind = require('enyo/kind');

var
	ExpandableListItem = require('./ExpandableListItem');

/**
* [Please note that `moonstone/Accordion` has been deprecated because of its
* similarity to `moonstone/ExpandableListItem`.]
*
* {@link module:moonstone/Accordion~Accordion} is a {@link module:moonstone/ExpandableListItem~ExpandableListItem} with an arrow button
* to the right of the header and additional margin space to the left of the item list.
*
* To open or close the drawer, tap on the header text or navigate (via 5-way)
* back to the top of the drawer.
*
* The control's child components may be of any kind; by default, they are
* instances of {@link module:moonstone/Item~Item}.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Accordion = require('moonstone/Accordion');
*
* 	{kind: Accordion, content: 'This is an accordion', components: [
* 		{content: 'Item One'},
* 		{content: 'Item Two'}
* 	]},
* 	{kind: Accordion, content: 'This is another accordion', components: [
* 		{content: 'Item Three'},
* 		{content: 'Item Four'}
* 	]}
* ```
*
* When multiple Accordions are used in a group, only one may be open at a given time.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Group = require('enyo/Group'),
* 		Accordion = require('moonstone/Accordion');
*
* 	{kind: Group, highlander: true, components: [
* 		{kind: Accordion, open: true, content: 'This is a grouped accordion', components: [
* 			{content: 'Item One'},
* 			{content: 'Item Two'}
* 		]},
* 		{kind: Accordion, content: 'This is another grouped accordion', components: [
* 			{content: 'Item Three'},
* 			{content: 'Item Four'}
* 		]},
* 		{kind: Accordion, content: 'This is yet another grouped accordion', components: [
* 			{content: 'Item Five'},
* 			{content: 'Item Six'}
* 		]}
* 	]}
* ```
*
* @class Accordion
* @extends module:moonstone/ExpandableListItem~ExpandableListItem
* @ui
* @public
* @deprecated Identical to {@link module:moonstone/ExpandableListItem~ExpandableListItem}
*/
module.exports = kind(
	/** @lends module:moonstone/Accordion~Accordion.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Accordion',

	/**
	* @private
	*/
	kind: ExpandableListItem,

	/**
	* @private
	*/
	classes: 'moon-accordion'
});

},{'./ExpandableListItem':'moonstone/ExpandableListItem'}],'moonstone/DateTimePickerBase':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/DateTimePickerBase~DateTimePickerBase} kind.
* @module moonstone/DateTimePickerBase
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control'),
	Signals = require('enyo/Signals');

var
	ilib = require('enyo-ilib'),
	dateFactory = require('enyo-ilib/DateFactory'),
	DateFmt = require('enyo-ilib/DateFmt'),
	Locale = require('enyo-ilib/Locale');

var
	ExpandableListItem = require('../ExpandableListItem');

/**
* Fires when the picker's value changes.
*
* @event module:moonstone/DateTimePickerBase~DateTimePickerBase#onChange
* @type {Object}
* @property {String} name - The name of this control.
* @property {Date} value - A standard JavaScript {@glossary Date} object representing
* the picker's current value.
* @public
*/

/**
* {@link module:moonstone/DateTimePickerBase~DateTimePickerBase} is a base kind implementing
* fuctionality shared by {@link module:moonstone/DatePicker~DatePicker} and
* {@link module:moonstone/TimePicker~TimePicker}. It is not intended to be used directly.
*
* @class DateTimePickerBase
* @extends module:moonstone/ExpandableListItem~ExpandableListItem
* @ui
* @protected
*/

module.exports = kind(
	/** @lends module:moonstone/DateTimePickerBase~DateTimePickerBase.prototype */ {

	/**
	* @private
	*/
	name: 'moon.DateTimePickerBase',

	/**
	* @private
	*/
	kind: ExpandableListItem,

	/**
	* @private
	*/
	defaultKind: Control,

	/**
	* @private
	*/
	classes: 'moon-date-picker',

	/**
	* @private
	*/
	events: {

		/**
		* {@link module:moonstone/DateTimePickerBase~DateTimePickerBase#onChange}
		*/
		onChange: ''
	},

	/**
	* @private
	* @lends module:moonstone/DateTimePickerBase~DateTimePickerBase.prototype
	*/
	published: {

		/**
		* Text to be displayed as the current value if no item is currently selected.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		noneText: '',

		/**
		* This property will be __private__ in the future and is deprecated as a __public__
		* property. It is used internally and _should not be used otherwise_.
		*
		* This is an [iLib]{@glossary ilib} Locale instance. Setting this directly may have
		* unexpected results. This class will automatically respond to application locale
		* changes that use the {@link module:enyo/i18n#updateLocale} method.
		*
		* @deprecated
		* @type {Locale}
		* @default null
		* @public
		*/
		locale: null,

		/**
		* The value of the picker, expressed as a standard JavaScript {@glossary Date}
		* object.
		*
		* @type {Date}
		* @default null
		* @public
		*/
		value: null,

		/**
		* If `true`, the picker will use a 12-hour clock (this value is ignored when
		* `iLib` is loaded, since the meridiem will be set by the current locale).
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		meridiemEnable: false
	},

	/**
	* Set in subkind.
	*
	* @private
	*/
	iLibFormatType: null,

	/**
	* Set in subkind.
	*
	* @private
	*/
	defaultOrdering: null,

	/**
	* @private
	*/
	drawerComponents: [
		{name: 'client', kind: Control, classes: 'moon-date-time-picker-client', onSpotlightLeft:'closePicker', onSpotlightSelect: 'closePicker'},
		{kind: Signals, onlocalechange: 'handleLocaleChangeEvent'}
	],

	computed: {
		'currentValueText': ['value', 'noneText']
	},

	/**
	* @private
	*/
	initComponents: function () {
		ExpandableListItem.prototype.initComponents.apply(this, arguments);
		this.initDefaults();
		this.$.drawer.addClass('indented');
	},

	/**
	* @private
	*/
	initILib: function () {
		this.locale = new Locale();
		var fmtParams = {
			type: this.iLibFormatType,
			useNative: false,
			timezone: 'local',
			length: 'full',
			date: 'dmwy'
		};

		fmtParams.locale = this.locale;
		this.iLibLocale = ilib.getLocale();
		this._tf = new DateFmt(fmtParams);
	},

	/**
	* @private
	*/
	initDefaults: function () {
		this.initILib();
		this.setupPickers(this._tf.getTemplate());
	},

	/**
	* @private
	*/
	setupPickers: function (ordering) {
		// implement in subkind
	},

	/**
	* @private
	*/
	formatValue: function () {
		// implement in subkind
	},

	/**
	* @fires module:moonstone/DateTimePickerBase~DateTimePickerBase#onChange
	* @private
	*/
	valueChanged: function (inOld) {
		this.syncingPickers = true;
		this.setChildPickers(inOld);
		this.syncingPickers = false;
		if (this.generated) this.doChange({name:this.name, value:this.value});
	},

	/**
	* @private
	*/
	setChildPickers: function (inOld) {
		// implement in subkind
	},

	/**
	* If no item is selected, sets [noneText]{@link module:moonstone/DateTimePickerBase~DateTimePickerBase#noneText}
	* as current value.
	*
	* @private
	*/
	currentValueText: function () {
		return this.value ? this.formatValue() : this.noneText;
	},

	/**
	* @private
	*/
	currentValueShowing: function () {
		return true;
	},

	/**
	* When [open]{@link module:moonstone/ExpandableListItem~ExpandableListItem#open} changes, shows/hides the current value.
	*
	* @private
	*/
	openChanged: function () {
		ExpandableListItem.prototype.openChanged.apply(this, arguments);
		var pickers = this.pickers,
			i, p;
		if (pickers && this.open) {
			for (i = 0; i < pickers.length; i++) {
				p = pickers[i];
				if (p.getClientControls().length > 0) {
					p = p.getClientControls()[0];
				}
				p.reflow();
			}
		}
	},

	/**
	* @private
	*/
	expandContract: function () {
		if (!this.open) {
			// if currently closed and handling the back key, keep track of the initial value in
			// case we need to restore this value
			if (this.allowBackKey) this._initialValue = this.value && new Date(this.value.getTime());

			// if currently closed and without a value, set it to now before opening
			if (!this.value) this.set('value', new Date());
		}
		ExpandableListItem.prototype.expandContract.apply(this, arguments);
	},

	/**
	* @private
	*/
	closePicker: function (inSender, inEvent) {
		/**
		* If select/enter is pressed on any date picker item or the left key is pressed on the
		* first item, close the drawer
		*/
		if (inEvent.type == 'onSpotlightSelect' ||
			this.$.client.children[0].id == inEvent.originator.id) {
			this.expandContract();
			return true;
		}
	},

	/**
	* @private
	*/
	handleLocaleChangeEvent: function () {
		// We've received a localechange event from the system, which means either the system
		// locale or the timezone may have changed.
		if (ilib.getLocale() !== this.iLibLocale) {
			// We're using iLib locale, and it has changed, so we'll rebuild the child pickers
			// entirely
			this.refresh();
		} else {
			// We don't care about the iLib locale or it hasn't changed, but timezone might have
			// changed, so we'll just update the child pickers
			this.setChildPickers();
		}
		this.notify('currentValueText');
	},

	/**
	* @private
	*/
	refresh: function () {
		this.destroyClientControls();
		this.pickers = null;
		delete this._tf;
		if (this.value) {
			this.localeValue = dateFactory({unixtime: this.value.getTime(), timezone: 'local'});
		}
		this.set('open', false);
		this.initDefaults();
		this.render();
	},

	/**
	* @private
	*/
	backKeyHandler: function () {
		if (this.open) this.set('value', this._initialValue);
		ExpandableListItem.prototype.backKeyHandler.apply(this, arguments);
	}
});

},{'../ExpandableListItem':'moonstone/ExpandableListItem'}],'moonstone/ExpandablePicker':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ExpandablePicker~ExpandablePicker} kind.
* @module moonstone/ExpandablePicker
*/

var
	kind = require('enyo/kind'),
	Component = require('enyo/Component'),
	Group = require('enyo/Group');

var
	BodyText = require('../BodyText'),
	CheckboxItem = require('../CheckboxItem'),
	ExpandableListItem = require('../ExpandableListItem');

/**
* Fires when the currently selected item changes.
*
* @event module:moonstone/ExpandablePicker~ExpandablePicker#onChange
* @type {Object}
* @property {Object|Object[]} selected - A reference to the currently selected item,
*	or (if [multipleSelection]{@link module:moonstone/ExpandablePicker~ExpandablePicker#multipleSelection} is `true`),
*	an array of selected items.
* @property {String} content - The content of the currently selected item, or (if
*	[multipleSelection]{@link module:moonstone/ExpandablePicker~ExpandablePicker#multipleSelection} is `true`), a comma
*	(plus space) separated list of the selected items' content.
* @property {Number} index - The index of the currently selected item, or (if
*	[multipleSelection]{@link module:moonstone/ExpandablePicker~ExpandablePicker#multipleSelection} is `true`), an array
* of the index values of the selected items.
* @public
*/

/**
* {@link module:moonstone/ExpandablePicker~ExpandablePicker}, which extends
* {@link module:moonstone/ExpandableListItem~ExpandableListItem}, is a drop-down
* picker menu that solicits a choice from the user. The picker's child
* components, which are instances of {@link module:moonstone/CheckboxItem~CheckboxItem}
* by default, provide the options for the picker.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		ExpandablePicker = require('moonstone/ExpandablePicker');
*
* 	{kind: ExpandablePicker, noneText: 'None Selected', content: 'Choose City',
* 		components: [
* 			{content: 'San Francisco'},
* 			{content: 'Boston'},
* 			{content: 'Tokyo'}
* 		]
* 	}
* ```
*
* The currently selected item is available in the picker's
* [selected]{@link module:moonstone/ExpandablePicker~ExpandablePicker#selected} property and may be accessed in
* the normal manner, by calling `get('selected')` and `set('selected', <value>)`.
* Similarly, the index of the current selection is available in
* [selectedIndex]{@link module:moonstone/ExpandablePicker~ExpandablePicker#selectedIndex}. When the
* [multipleSelection]{@link module:moonstone/ExpandablePicker~ExpandablePicker#multipleSelection} property is set
* to `true`, `selected` contains an array of selected items, and `selectedIndex`
* contains an array of the selected items' index values.
*
* The [onChange]{@link module:moonstone/ExpandablePicker~ExpandablePicker#onChange} event is fired when the
* selected item changes.
*
* The picker's options may be modified programmatically in the standard manner, by
* calling `createComponent().render()` or `destroy()`.
*
* ```javascript
* 	// Add new items to picker
* 	this.$.expandablePicker.createComponent({'New York'}).render();
* 	this.$.expandablePicker.createComponent({'London'}).render();
*
* 	// Remove currently selected item from picker
* 	this.$.expandablePicker.getSelected().destroy();
* ```
*
* When the picker is minimized, the content of the currently selected item is
* displayed as subtext below the picker label. If multiple selection is enabled,
* the content of all selected items will be displayed as a comma-separated list.
*
* @class ExpandablePicker
* @extends module:moonstone/ExpandableListItem~ExpandableListItem
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ExpandablePicker~ExpandablePicker.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ExpandablePicker',

	/**
	* @private
	*/
	kind: ExpandableListItem,

	/**
	* @private
	*/
	classes: 'moon-expandable-picker',

	/**
	* @private
	*/
	events: {
		/**
		* {@link module:moonstone/ExpandablePicker~ExpandablePicker#onChange}
		*/
		onChange: ''
	},

	/**
	* @private
	* @lends module:moonstone/ExpandablePicker~ExpandablePicker.prototype
	*/
	published: {

		/**
		* Reference to currently selected item, if any, or (when
		* [multipleSelection]{@link module:moonstone/ExpandablePicker~ExpandablePicker#multipleSelection} is `true`),
		* an array of selected items.
		*
		* @type {Object | Object[]}
		* @default null
		* @public
		*/
		selected: null,

		/**
		* Index of the currently selected item, or `-1` if nothing is selected. If
		* [multipleSelection]{@link module:moonstone/ExpandablePicker~ExpandablePicker#multipleSelection} is `true`,
		* this will be array of the selected items' index values, or an empty array if
		* nothing is selected.
		*
		* @type {Number | Number[]}
		* @default -1
		* @public
		*/
		selectedIndex: -1,

		/**
		* Text to be displayed as the current value if no item is currently selected.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		noneText: '',

		/**
		* Text to be displayed when the drawer is opened.
		*
		* @type {String}
		* @default null
		* @public
		*/
		helpText: null,

		/**
		* If `true`, picker auto-collapses when an item is selected.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		autoCollapseOnSelect: true,

		/**
		* If `true`, multiple selection is allowed.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		multipleSelection: false
	},

	/**
	* @private
	*/
	autoCollapse: true,

	/**
	* @private
	*/
	lockBottom: true,

	/**
	* @private
	*/
	defaultKind: CheckboxItem,

	/**
	* @private
	*/
	selectAndCloseDelayMS: 600,

	/**
	* @private
	*/
	drawerComponents: [
		{name: 'client', tag: null, kind: Group, onActivate: 'activated', highlander: true},
		{name: 'helpText', kind: BodyText, canGenerate: false, classes: 'moon-expandable-picker-help-text'}
	],

	bindings: [
		{from: 'selected.content', to: 'selectedText'},

		// Accessibility
		{from: 'selected.accessibilityLabel', to: '$.header._accessibilityText'}
	],

	computed: {
		'currentValueText': ['selected', 'noneText', 'selectedText']
	},

	/**
	* @private
	*/
	create: function() {
		if (this.multipleSelection) {
			this.selected = (this.selected) ? this.selected : [];
			this.selectedIndex = (this.selectedIndex != -1) ? this.selectedIndex : [];
		}
		// super initialization
		ExpandableListItem.prototype.create.apply(this, arguments);

		this.selectedIndexChanged();
		this.helpTextChanged();
	},

	/**
	* @private
	*/
	initComponents: function() {
		var override = {client: {highlander: !this.multipleSelection}};
		this.drawerComponents = Component.overrideComponents(this.drawerComponents, override);
		ExpandableListItem.prototype.initComponents.apply(this, arguments);
	},

	/**
	*  'multiSelectCurrentValue()' can be overridden by subkinds, such as moon.DayPicker
	*
	* @protected
	*/
	multiSelectCurrentValue: function () {
		if (!this.multipleSelection) {
			return;
		}
		var controls = this.getCheckboxControls();
		var str = '';
		this.selectedIndex.sort();
		for (var i=0; i < this.selectedIndex.length; i++) {
			if (!str) {
				str = controls[this.selectedIndex[i]].getContent();
			} else {
				str = str + ', ' + controls[this.selectedIndex[i]].getContent();
			}
		}
		if (!str) {
			str = this.getNoneText();
		}
		return str;
	},

	/**
	* When the [selected]{@link module:moonstone/ExpandablePicker~ExpandablePicker#selected} control changes,
	* updates [checked]{@link module:moonstone/CheckboxItem~CheckboxItem#checked} values appropriately and
	* fires an [onChange]{@link module:moonstone/ExpandablePicker~ExpandablePicker#onChange} event.
	*
	* @fires module:moonstone/ExpandablePicker~ExpandablePicker#onChange
	* @private
	*/
	selectedChanged: function (inOldValue) {
		var selected = this.getSelected(),
		controls = this.getCheckboxControls(),
		index = -1,
		i; //declaring i here to fix travis error

		if (this.multipleSelection) {
			this.rebuildSelectedIndices(selected, controls);
			if(this.hasNode()) {
				this.fireChangeEvent();
			}
		} else {
			for (i=0;i<controls.length;i++) {
				if(controls[i] === selected) {
					controls[i].setChecked(true);
					index = i;
				} else if (controls[i].checked) {
					controls[i].silence();
					controls[i].setChecked(false);
					controls[i].unsilence();
				}
			}
			if (index > -1 && selected !== inOldValue) {
				this.setSelectedIndex(index);
				if(this.hasNode()) {
					this.fireChangeEvent();
				}
			}
		}
	},

	/**
	* When the {@link module:moonstone/ExpandablePicker~ExpandablePicker#selectedIndex} changes, calls
	* `setChecked()` on the appropriate control.
	*
	* @private
	*/
	selectedIndexChanged: function () {
		var controls = this.getCheckboxControls(),
			index = this.getSelectedIndex(),
			checked;

		if (this.multipleSelection) {
			for (var i = 0; i < controls.length; i++) {
				checked = index.indexOf(i) >= 0;
				controls[i].setChecked(checked);
			}
		} else {
			this.set('selected', index >= 0 ? controls[index] : null);
		}
	},

	/**
	* If there is no selected item, uses [noneText]{link @moon.ExpandablePicker#noneText}
	* as current value.
	*
	* @private
	*/
	currentValueText: function () {
		var multi = this.multipleSelection,
			sel = this.get('selected'),
			selIdx = this.get('selectedIndex');

		if (multi && sel.length && selIdx.length) {
			return this.multiSelectCurrentValue();
		}
		else if (!multi && sel && selIdx !== -1) {
			return sel.get('content');
		}
		return this.noneText;
	},

	/**
	* When drawer is opened/closed, shows/hides `this.$.helpText`.
	*
	* @private
	*/
	helpTextChanged: function () {
		if (this.helpText !== null && !this.$.helpText.canGenerate) {
			this.generateHelpText();
		}
		this.$.helpText.setContent(this.helpText);
		this.$.helpText.setShowing(!!this.helpText);
	},

	/**
	* @method
	* @private
	*/
	destroy: function () {
		// When the expandablePicker itself is going away, take note so we don't try and do
		// single-picker option remove logic such as setting some properties to default
		// value when each picker option is destroyed
		this.destroying = true;
		ExpandableListItem.prototype.destroy.apply(this, arguments);
	},

	/**
	* @method
	* @private
	*/
	rebuildSelectedIndices: function(selected, controls) {
		this.selectedIndex = [];
		selected = selected || this.getSelected();
		controls = controls || this.getCheckboxControls();

		for (var i = 0; i < controls.length; i++) {
			if (selected.indexOf(controls[i]) >= 0) {
				controls[i].setChecked(true);
				this.selectedIndex.push(i);
			} else {
				controls[i].silence();
				controls[i].setChecked(false);
				controls[i].unsilence();
			}
		}
	},

	/**
	* @method
	* @private
	*/
	removeControl: function (inControl) {
		var selectedChanged = false;
		// Skip extra work during panel destruction.
		if (!this.destroying) {
			// set currentValue, selected and selectedIndex to defaults value
			if (this.multipleSelection) {
				for (var i = 0; i < this.selected.length; i++) {
					if (this.selected[i] === inControl) {
						this.selected.splice(i, 1);
						selectedChanged = true;
						break;
					}
				}
				if (selectedChanged) {
					this.notifyObservers('selected');
				}
			} else {
				if (this.selected === inControl) {
					this.setSelected(null);
					this.setSelectedIndex(-1);
				}
			}
		}
		ExpandableListItem.prototype.removeControl.apply(this, arguments);
	},

	/**
	* @private
	*/
	generateHelpText: function () {
		this.$.helpText.canGenerate = true;
		this.$.helpText.render();
	},

	/**
	* When an item is chosen, marks it as checked and closes the picker.
	*
	* @private
	*/
	activated: function (inSender, inEvent) {
		var toggledControl = inEvent && inEvent.toggledControl, index;

		if (!toggledControl) {
			return;
		}

		index = this.getCheckboxControls().indexOf(toggledControl);

		if (this.multipleSelection) {
			if (index >= 0) {
				// if toggledControl is checked but it is out of this.selected, them push it
				if (inEvent.checked && (this.selected.indexOf(toggledControl) == -1)) {
					this.selected.push(toggledControl);
					this.notifyObservers('selected');
				}
				// if toggledControl is not checked but it is in this.selected, them pull it out
				if (!inEvent.checked && (this.selected.indexOf(toggledControl) >= 0)) {
					this.selected.splice(this.selected.indexOf(toggledControl), 1);
					this.notifyObservers('selected');
				}
			}
		} else {
			if (inEvent.checked && index >= 0) {
				this.setSelected(toggledControl);
			}
		}

		if (this.getAutoCollapseOnSelect() && this.$.drawer.hasRendered && this.getOpen()) {
			// this is needed due to the select and close delay, during which other history entries
			// could have been pushed - we drop the entry immediately to prevent dropping the wrong
			// entry later
			this.removeHistoryEntry();

			this.startJob('selectAndClose', 'expandContract', this.selectAndCloseDelayMS);
		}

		return true;
	},

	/**
	* @private
	*/
	openChanged: function () {
		ExpandableListItem.prototype.openChanged.apply(this, arguments);
		// cancel the job so the drawer isn't opened/closed inadvertently
		this.stopJob('selectAndClose');
	},

	/**
	* Returns the picker items. Override point for child kinds altering the source of the items.
	*
	* @private
	*/
	getCheckboxControls: function () {
		return this.getClientControls();
	},

	/**
	* Fires an `onChange` event.
	*
	* @fires module:moonstone/ExpandablePicker~ExpandablePicker#onChange
	* @private
	*/
	fireChangeEvent: function () {
		var contentStr = (this.multipleSelection) ? this.multiSelectCurrentValue() : this.getSelected().getContent();
		this.doChange({
			selected: this.getSelected(),
			content: contentStr,
			index: this.getSelectedIndex()
		});
	},

	/**
	* @private
	*/
	multipleSelectionChanged: function (inOldValue) {
		if (this.multipleSelection) {
			if (this.selected) {
				this.selected = [this.selected];
			} else {
				this.selected = [];
			}
			this.selectedIndex = [];
		} else {
			this.selected = (this.selected.length) ? this.selected[0] : null;
			this.selectedIndex = -1;
		}
		this.$.client.setHighlander(!this.multipleSelection);
		this.notifyObservers('selected');
	},

	// Accessibility

	/**
	* @private
	*/
	ariaObservers: [
		{path: 'multipleSelection', method: function () {
			this.$.header.setAriaAttribute('aria-multiselectable', this.multipleSelection);
		}}
	]
});

},{'../BodyText':'moonstone/BodyText','../CheckboxItem':'moonstone/CheckboxItem','../ExpandableListItem':'moonstone/ExpandableListItem'}],'moonstone/ExpandableInput':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ExpandableInput~ExpandableInput} kind.
* @module moonstone/ExpandableInput
*/

var
	kind = require('enyo/kind');

var
	Spotlight = require('spotlight');

var
	$L = require('../i18n'),
	ExpandableListItem = require('../ExpandableListItem'),
	Input = require('../Input'),
	InputDecorator = require('../InputDecorator');

/**
* Fires when the current text changes. This passes through {@link module:enyo/Input~Input#onChange}.
*
* @event module:moonstone/ExpandableInput~ExpandableInput#onChange
* @type {Object}
* @property {String} value - The value of the input.
* @public
*/

/**
* {@link module:moonstone/ExpandableInput~ExpandableInput}, which extends {@link module:moonstone/ExpandableListItem~ExpandableListItem}, is a
* drop-down input that prompts the user to enter text.
*
* @class ExpandableInput
* @extends module:moonstone/ExpandableListItem~ExpandableListItem
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ExpandableInput~ExpandableInput.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ExpandableInput',

	/**
	* @private
	*/
	kind: ExpandableListItem,

	/**
	* @private
	*/
	classes: 'moon-expandable-input',

	/**
	* @private
	*/
	events: {

		/** {@link module:moonstone/ExpandableInput~ExpandableInput#onChange} */
		onChange: ''
	},

	/**
	* @private
	* @lends module:moonstone/ExpandableInput~ExpandableInput.prototype
	*/
	published: {

		/**
		* Text to be displayed as the current value if no item is currently selected.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		noneText: '',

		/**
		* Text to be displayed in the input if no text has been entered.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		placeholder: '',

		/**
		* Type of [input]{@link module:enyo/Input~Input}; if not specified, it's treated as `'text'`.
		* This may be anything specified for the `type` attribute in the HTML
		* specification, including `'url'`, `'email'`, `'search'`, or `'number'`.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		type: '',

		/**
		* Initial value of the input.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		value: ''
	},

	/**
	* @private
	*/
	autoCollapse: true,

	/**
	* @private
	*/
	lockBottom: false,

	/**
	* @private
	*/
	drawerComponents: [
		{name: 'inputDecorator', kind: InputDecorator, onSpotlightBlur: 'inputSpotBlurred', onSpotlightFocus: 'inputFocus', onSpotlightDown: 'inputSpotDown', onkeyup: 'inputKeyUp', defaultSpotlightUp: 'drawer', components: [
			{name: 'clientInput', kind: Input, onchange: 'doChange', dismissOnEnter: true}
		]}
	],

	/**
	* @private
	*/
	bindings: [
		{from: 'value', to: '$.clientInput.value', oneWay: false},
		{from: 'placeholder', to: '$.clientInput.placeholder'},
		{from: 'type', to: '$.clientInput.type'}
	],

	/**
	* @private
	*/
	computed: {
		'currentValueShowing': ['open', 'currentValueText', 'type'],
		'currentValueText': ['value', 'noneText']
	},

	/**
	* @private
	*/
	create: function () {
		ExpandableListItem.prototype.create.apply(this, arguments);
		// attach an ondown handler to unfreeze Spotlight
		this.$.header.ondown = 'headerDown';
	},

	/**
	* Computed property
	*
	* @private
	*/
	currentValueShowing: function () {
		return !this.open && this.currentValueText() !== '' && this.type != 'password';
	},

	/**
	* Assigns an attribute to a {@link module:moonstone/Input~Input}
	* @param {String} name - Attribute name to assign/remove.
	* @param {(String|Number|null)} value - The value to assign to `name`
	* @public
	*/
	setInputAttribute: function (name, value) {
		this.$.clientInput.setAttribute(name, value);
	},

	/**
	* Computed property
	*
	* @private
	*/
	currentValueText: function () {
		return (this.value === '') ? this.noneText : this.value;
	},

	/**
	* @private
	*/
	openChanged: function () {
		ExpandableListItem.prototype.openChanged.apply(this, arguments);
		if (this.open) {
			// keep track of initial value in case we need to restore it later
			if (this.allowBackKey) this._initialValue = this.value;

			Spotlight.unspot();
			this.focusInput();
		} else {
			this.$.clientInput.blur();
		}
	},

	/**
	* Focuses the {@link module:moonstone/Input~Input} when the input decorator receives focus.
	*
	* @private
	*/
	inputFocus: function (inSender, inEvent) {
		var direction = inEvent && inEvent.dir;
		if (this.open && direction) {
			this.focusInput();
		}
	},

	/**
	* Value should be submitted if user clicks outside control. We check for
	* `onSpotlightFocus` and `mouseover` to avoid contracting the input on an event
	* fired from itself.
	*
	* @private
	*/
	inputSpotBlurred: function (inSender, inEvent) {
		var eventType;
		if (this.open && Spotlight.getPointerMode()) {
			eventType = Spotlight.getLastEvent().type;
			if (eventType !== 'onSpotlightFocus' && eventType !== 'mouseover') {
				this.closeDrawerAndHighlightHeader();
			}
		}
	},

	/**
	* @private
	*/
	inputKeyUp: function (sender, event) {
		if (event.keyCode == 13) {
			this.closeDrawerAndHighlightHeader();
			return true;
		}
	},

	/**
	* @private
	*/
	headerDown: function () {
		Spotlight.unfreeze();
	},

	/**
	* Focuses the input field.
	*
	* @private
	*/
	focusInput: function () {
		this.$.clientInput.focus();
	},

	/**
	* If [lockBottom]{@link module:moonstone/ExpandableInput~ExpandableInput#lockBottom} is `true`, don't allow user
	* to navigate down from the input field; if `false`, close the drawer and return
	* `true` to keep {@glossary Spotlight} on header.
	*
	* @private
	*/
	inputSpotDown: function (inSender, inEvent) {
		if (this.lockBottom) {
			this.focusInput();
		} else {
			this.closeDrawerAndHighlightHeader();
		}
		return true;
	},

	/**
	* @private
	*/
	backKeyHandler: function () {
		if (this.open) this.set('value', this._initialValue);
		ExpandableListItem.prototype.backKeyHandler.apply(this, arguments);
	},

	// Accessibility

	/**
	* @default $L('edit box')
	* @type {String}
	* @see enyo/AccessibilitySupport~AccessibilitySupport#accessibilityHint
	* @public
	*/
	accessibilityHint: $L('edit box'),

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['type', 'value'], method: function () {
			if ( this.$.header && this.type == 'password' && this.value) {
				var character = (this.value.length > 1) ? $L('characters') : $L('character');
				this.$.header._accessibilityText = this.value.length + ' ' + character;
			}
		}}
	]
});

},{'../i18n':'moonstone/i18n','../ExpandableListItem':'moonstone/ExpandableListItem','../Input':'moonstone/Input','../InputDecorator':'moonstone/InputDecorator'}],'moonstone/DataGridList':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/DataGridList~DataGridList} kind.
* @module moonstone/DataGridList
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	util = require('enyo/utils'),
	ri = require('enyo/resolution'),
	DataGridList = require('enyo/DataGridList');

var
	Spotlight = require('spotlight');

var
	DataList = require('../DataList'),
	DataListSpotlightSupport = DataList.SpotlightSupport,
	Scroller = require('../Scroller'),
	ScrollStrategy = require('../ScrollStrategy');

/**
* {@link module:moonstone/DataGridList~DataGridList} is an {@link module:enyo/DataGridList~DataGridList} with Moonstone visual
* styling applied.
*
* @class DataGridList
* @extends module:enyo/DataGridList~DataGridList
* @mixes module:moonstone/DataListSpotlightSupport~DataListSpotlightSupport
* @ui
* @public
*/
var MoonDataGridList = module.exports = kind(
	/** @lends module:moonstone/DataGridList~DataGridList.prototype */ {

	/**
	* @private
	*/
	name: 'moon.DataGridList',

	/**
	* @private
	*/
	kind: DataGridList,

	/**
	* @private
	*/
	mixins: [DataListSpotlightSupport],

	/**
	* @private
	*/
	noDefer: true,

	/**
	* @private
	*/
	allowTransitions: false,

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	*/
	scrollerOptions: { kind: Scroller, vertical:'scroll', horizontal: 'hidden' },

	/**
	* @private
	*/
	handlers: {
		onSpotlightFocus   : 'handleSpotlightFocus',
		onSpotlightBlur    : 'handleSpotlightBlur',
		onSpotlightFocused : 'handleSpotlightFocused'
	},

	/**
	* @private
	*/
	initContainer: function() {
		// Our delegate relies on scroll column metrics, so we
		// need to ask the scroller to measure the columns for us
		this.scrollerOptions.measureScrollColumns = true;
		DataGridList.prototype.initContainer.apply(this, arguments);
	},

	/**
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			// scale px values for current resolution
			this.spacing = ri.scale(this.spacing);	// TODO: Spacing should only be even whole numbers!
			this.minWidth = ri.scale(this.minWidth);
			this.minHeight = ri.scale(this.minHeight);
		};
	}),

	/**
	* @private
	*/
	handleSpotlightFocus: function (inSender, inEvent) {
		var c = inEvent.originator;
		var isClientControl = this.getClientControls().indexOf(c) >= 0;
		if(isClientControl) {
			var zIndex = parseInt(dom.getComputedStyleValue(c.hasNode(), 'z-index'), 10) || 0;
			c.applyStyle('z-index', zIndex + 1);
		}
	},

	/**
	* @private
	*/
	handleSpotlightBlur: function (inSender, inEvent) {
		var c = inEvent.originator;
		var isClientControl = this.getClientControls().indexOf(c) >= 0;
		if(isClientControl) {
			setTimeout(this.bindSafely(function () {
				c.applyStyle('z-index', null);
			}), 0);
		}
	},

	/**
	* @private
	*/
	handleSpotlightFocused: function (inSender, inEvent) {
		if (!Spotlight.getPointerMode()) {
			if (inEvent.index < this.indexBoundFirstRow) {
				this.$.scroller.scrollToTop();
			} else if (inEvent.index > this.indexBoundLastRow) {
				this.$.scroller.scrollToBottom();
			}
		}
	}
});

/**
* Overload the delegate strategy to incorporate measurements for our scrollers
* when they are visible.
*
* @private
*/
var p = MoonDataGridList.delegates.verticalGrid = util.clone(DataGridList.delegates.verticalGrid);
kind.extendMethods(p, {
	/**
	* Overriding refresh() to stop scroller and stop scrolling.
	*
	* @method
	* @private
	*/
	refresh: kind.inherit(function (sup) {
		return function (list) {
			sup.apply(this, arguments);
			list.$.scroller.stop();
		};
	}),

	/**
	* Overriding scrollToControl() to specify Moonstone-specific scroller options.
	* No need to call the super method, so we don't wrap in enyo.inherit().
	*
	* @method
	* @private
	*/
	scrollToControl: function(list, control) {
		list.$.scroller.scrollToControl(control, false, false, true);
	},

	/**
	* Overriding scrollTo() to specify Moonstone-specific scroller options.
	* No need to call the super method, so we don't wrap in enyo.inherit().
	*
	* @method
	* @private
	*/
	scrollTo: function(list, x, y) {
		list.$.scroller.scrollTo(x, y, false);
	},

	/**
	* moon.ScrollStrategy dynamically shows / hides scroll controls
	* depending on whether there's enough content to scroll. It also
	* "steals" space from the scrollable content area to make room
	* for the controls. This means we need to calculate whether scroll
	* controls will be required before generating list pages so that we
	* can adjust our metrics accordingly.
	*
	* We do this by overriding the width() method, so that we can
	* subtract the width of the scroll column in cases where we
	* calculate that we'll need to scroll.
	*
	* @method
	* @private
	*/
	width: kind.inherit(function (sup) {
		return function (list) {
			var w = sup.apply(this, arguments),
				s = list.$.scroller,
				v = s.getVertical(),
				a, b, r, h;
			if (s.spotlightPagingControls) {
				a = true;
			}
			else if (v === 'auto') {
				b = s.getScrollBounds();
				this.calculateMetrics(list, w);
				r = Math.ceil(list.collection.length / list.columns);
				h = r * this.childSize(list);
				a = (h > b.clientHeight);
			}
			else {
				a = (v === 'scroll');
			}
			if (a) {
				w = w - ScrollStrategy.vScrollColumnSize;
				this.calculateMetrics(list, w);
			}
			return w;
		};
	})
}, true);

},{'../DataList':'moonstone/DataList','../Scroller':'moonstone/Scroller','../ScrollStrategy':'moonstone/ScrollStrategy'}],'moonstone/ExpandableIntegerPicker':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ExpandableIntegerPicker~ExpandableIntegerPicker} kind.
* @module moonstone/ExpandableIntegerPicker
*/

var
	kind = require('enyo/kind');

var
	ExpandableListItem = require('../ExpandableListItem'),
	SimpleIntegerPicker = require('../SimpleIntegerPicker');

/**
* Fires when the currently selected item changes.
*
* @event module:moonstone/ExpandableIntegerPicker~ExpandableIntegerPicker#onChange
* @type {Object}
* @property {Number} value - The value of the currently selected item.
* @property {String} content -  The content of the currently selected item.
*
* @public
*/

/**
* {@link module:moonstone/ExpandableIntegerPicker~ExpandableIntegerPicker}, which extends {@link module:moonstone/ExpandableListItem~ExpandableListItem},
* is a drop-down picker menu that prompts the user to make a selection from a range of
* integer-based options.
*
* The value of the currently selected item is available in the picker's
* [value]{@link module:moonstone/ExpandableIntegerPicker~ExpandableIntegerPicker#value} property.
*
* When the picker is minimized, the content of the currently selected item is
* displayed as subtext below the picker label.
*
* @class ExpandableIntegerPicker
* @extends module:moonstone/ExpandableListItem~ExpandableListItem
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ExpandableIntegerPicker~ExpandableIntegerPicker.prototype */ {

	/**
	* @private
	*/
	name: 'moon.ExpandableIntegerPicker',

	/**
	* @private
	*/
	kind: ExpandableListItem,

	/**
	* @private
	*/
	classes: 'moon-expandable-integer-picker',

	/**
	* @private
	*/
	events: {

		/**
		* {@link module:moonstone/ExpandableIntegerPicker~ExpandableIntegerPicker#onChange}
		*/
		onChange: ''
	},

	/**
	* @private
	* @lends module:moonstone/ExpandableIntegerPicker~ExpandableIntegerPicker.prototype
	*/
	published: {
		/**
		* Initial value of the picker.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		value: 0,

		/**
		* Minimum value of the picker.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		min: 0,

		/**
		* Maximum value of the picker.
		*
		* @type {Number}
		* @default 9
		* @public
		*/
		max: 9,

		/**
		* Amount by which to increment/decrement.
		*
		* @type {Number}
		* @default 1
		* @public
		*/
		step: 1,

		/**
		* Unit/label to be appended to the end of the number.
		*
		* @type {String}
		* @default 'sec'
		* @public
		*/
		unit: 'sec'
	},

	/**
	* @private
	*/
	lockBottom: true,

	/**
	* @private
	*/
	autoCollapse: true,

	/**
	* @private
	*/
	handlers: {
		requestScrollIntoView: 'requestScrollIntoView'
	},

	/**
	* @private
	*/
	drawerComponents: [
		{name: 'picker', kind: SimpleIntegerPicker, deferInitialization: true, onSelect: 'closeDrawerAndHighlightHeader', onChange: 'pickerValueChanged'}
	],

	/**
	* @private
	*/
	bindings: [
		{from: '.min', to: '.$.picker.min', oneWay: false},
		{from: '.max', to: '.$.picker.max', oneWay: false},
		{from: '.step', to: '.$.picker.step'},
		{from: '.unit', to: '.$.picker.unit'}
	],

	/**
	* @private
	*/
	create: function () {
		ExpandableListItem.prototype.create.apply(this, arguments);
		this.requestPickerReflow();
		this.valueChanged();
	},

	/**
	* @private
	*/
	requestPickerReflow: function () {
		this._needsPickerReflow = true;
	},

	/**
	* Intentionally using an observer instead of a binding since the order of applying `value`,
	* `min`, and `max` is important. Bindings are processed after `create()` so calling this
	* in `create()` guarantees it runs first.
	*
	* @private
	*/
	valueChanged: function () {
		this.$.picker.set('value', this.value);
	},

	/**
	* @see module:moonstone/ExpandableListItem~ExpandableListItem#currentValueShowing
	* @private
	*/
	currentValueShowing: function () {
		return !this.open;
	},

	/**
	* @see module:moonstone/ExpandableListItem~ExpandableListItem#currentValueText
	* @private
	*/
	currentValueText: function () {
		return this.unit? this.value + ' ' + this.unit : this.value;
	},

	/**
	* Change handler
	*
	* @private
	*/
	openChanged: function () {
		ExpandableListItem.prototype.openChanged.apply(this, arguments);
		if (this.open && this._needsPickerReflow) {
			this.$.picker.reflow();
			this._needsPickerReflow = false;
		}
	},

	/**
	* Catch onChange events from the picker and update the value as it may have been clamped
	* by the picker's `step` property. Firing its own event so `content` can be fixed because
	* it may not have synced to SimpleIntegerPicker before this fires (e.g. the first time).
	*
	* @private
	*/
	pickerValueChanged: function (sender, event) {
		var content = this.unit? event.value + ' ' + this.unit : event.value;
		this.set('value', event.value);

		this.doChange({
			value: this.value,
			content: content
		});

		return true;
	},

	/**
	* @private
	*/
	spotlightDown: function (inSender, inEvent) {
		if (this.getLockBottom() && (inEvent.originator === this.$.picker) && this.getOpen()) {
			return true;
		}
	}
});

},{'../ExpandableListItem':'moonstone/ExpandableListItem','../SimpleIntegerPicker':'moonstone/SimpleIntegerPicker'}],'moonstone/DatePicker':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/DatePicker~DatePicker} kind.
* @module moonstone/DatePicker
*/

var
	kind = require('enyo/kind');

var
	dateFactory = require('enyo-ilib/DateFactory');

var
	DateTimePickerBase = require('../DateTimePickerBase'),
	$L = require('../i18n'),
	IntegerPicker = require('../IntegerPicker');

/**
* {@link module:moonstone/DatePicker~DatePicker} is a control used to allow the selection of (or simply
* display) a day, month, and year.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		DatePicker = require('moonstone/DatePicker');
*
* 	{kind: DatePicker, noneText: 'Pick a Date', content: 'Date',
* 		onChange: 'changed'}
* ```
*
* Set the [value]{@link module:moonstone/DatePicker~DatePicker#value} property to a standard JavaScript
* {@glossary Date} object to initialize the picker, or to change it programmatically
* at runtime.
*
* @class DatePicker
* @extends module:moonstone/DateTimePickerBase~DateTimePickerBase
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/DatePicker~DatePicker.prototype */ {

	/**
	* @private
	*/
	name: 'moon.DatePicker',

	/**
	* @private
	*/
	kind: DateTimePickerBase,

	/**
	* @private
	* @lends module:moonstone/DatePicker~DatePicker.prototype
	*/
	published: {

		/**
		* Optional minimum year value. Must be specified using the Gregorian
		* calendar, regardless of the calendar type used by the specified locale.
		*
		* @type {Number}
		* @default 1900
		* @public
		*/
		minYear: 1900,

		/**
		* Optional maximum year value. Must be specified using the Gregorian
		* calendar, regardless of the calendar type used by the specified locale.
		*
		* @type {Number}
		* @default 2099
		* @public
		*/
		maxYear: 2099,

		/**
		* Optional label for day.
		*
		* @type {String}
		* @default 'day'
		* @public
		*/
		dayText: $L('day'),			// i18n 'DAY' label in moon.DatePicker widget

		/**
		* Optional label for month.
		*
		* @type {String}
		* @default 'month'
		* @public
		*/
		monthText: $L('month'),		// i18n 'MONTH' label in moon.DatePicker widget

		/**
		* Optional label for year.
		*
		* @type {String}
		* @default 'year'
		* @public
		*/
		yearText: $L('year')			// i18n 'YEAR' label in Moon.DatePicker widget
	},

	/**
	* @private
	*/
	iLibFormatType: 'date',

	/**
	* @private
	*/
	defaultOrdering: 'Mdy',

	/**
	* @private
	*/
	initILib: function () {
		DateTimePickerBase.prototype.initILib.apply(this, arguments);
		if (this.value) {
			this.localeValue = dateFactory({unixtime: this.value.getTime(), timezone: 'local'});
		}
	},

	/**
	 * When [iLib]{@glossary ilib} is supported, calculates the minimum year in the
	 * current calendar. Otherwise, returns the value of the published property
	 * [minYear]{@link module:moonstone/DatePicker~DatePicker#minYear}.
	 *
	 * @private
	 */
	getMinYear: function() {
		var greg = dateFactory({
			type: 'gregorian',
			year: this.minYear,
			month: 1,
			day: 1,
			timezone: 'local'
		});
		var localCalendarDate = dateFactory({
			julianday: greg.getJulianDay(),
			timezone: 'local'
		});
		return localCalendarDate.getYears();
	},

	/**
	 * When [iLib]{@glossary ilib} is supported, calculates the maximum year in the
	 * current calendar. Otherwise, returns the value of the published property
	 * [maxYear]{@link module:moonstone/DatePicker~DatePicker#maxYear}.
	 *
	 * @private
	 */
	getMaxYear: function() {
		var greg = dateFactory({
			type: 'gregorian',
			year: this.maxYear,
			month: 1,
			day: 1,
			timezone: 'local'
		});
		var localCalendarDate = dateFactory({
			julianday: greg.getJulianDay(),
			timezone: 'local'
		});
		return localCalendarDate.getYears();
	},


	/**
	* @private
	*/
	setupPickers: function (ordering) {
		var pickers = [];
		var orderingArr = ordering.split('');
		var doneArr = [];
		var o, f, l, digits, values;
		for(f = 0, l = orderingArr.length; f < l; f++) {
			o = orderingArr[f];
			if (doneArr.indexOf(o) < 0) {
				doneArr.push(o);
			}
		}

		values = this.calcPickerValues();
		this.silence();

		for(f = 0, l = doneArr.length; f < l; f++) {
			o = doneArr[f];

			switch (o) {
			case 'd':
				digits = (ordering.indexOf('dd') > -1) ? 2 : null;
				pickers.push(this.createComponent(
					{classes: 'moon-date-time-picker-wrap', components:[
						{kind: IntegerPicker, name:'day', classes:'moon-date-picker-field', wrap:true, digits:digits, min:1,
						max: values.maxDays, value: values.date, onChange: 'pickerChanged'},
						{name: 'dayLabel', content: this.dayText, classes: 'moon-date-time-picker-label moon-divider-text'}
					]}
				));
				break;
			case 'M':
				digits = (ordering.indexOf('MM') > -1) ? 2 : null;
				pickers.push(this.createComponent(
					{classes: 'moon-date-time-picker-wrap', components:[
						{kind: IntegerPicker, name:'month', classes:'moon-date-picker-field', wrap:true, min:1, max:values.maxMonths, value:values.month, onChange: 'pickerChanged'},
						{name: 'monthLabel', content: this.monthText, classes: 'moon-date-time-picker-label moon-divider-text'}
					]}
				));
				break;
			case 'y':
				pickers.push(this.createComponent(
					{classes: 'moon-date-time-picker-wrap year', components:[
						{kind: IntegerPicker, name:'year', classes:'moon-date-picker-field year', value:values.fullYear, min:this.getMinYear(), max:this.getMaxYear(), onChange: 'pickerChanged'},
						{name: 'yearLabel', content: this.yearText, classes: 'moon-date-time-picker-label moon-divider-text'}
					]}
				));
				break;
			default:
				break;
			}
		}

		this.unsilence();
		this.pickers = pickers;
	},

	/**
	* @private
	*/
	formatValue: function () {
		if (!this.value) {
			return (this.noneText);
		}
		return this._tf.format(this.value);
	},

	/**
	* @private
	*/
	pickerChanged: function (inSender, inEvent) {
		if(this.syncingPickers) return true;

		var day = this.$.day.getValue(),
			month = this.$.month.getValue(),
			year = this.$.year.getValue(),
			maxDays,
			value = this.localeValue || this.value;
		var valueHours = value ? value.getHours() : 0;
		var valueMinutes = value ? value.getMinutes() : 0;
		var valueSeconds = value ? value.getSeconds() : 0;
		var valueMilliseconds = value ? value.getMilliseconds() : 0;

		maxDays = this.monthLength(year, month);
		this.localeValue = dateFactory({
			day: (day <= maxDays) ? day : maxDays,
			month: month,
			year: year,
			hour: valueHours,
			minute: valueMinutes,
			second: valueSeconds,
			millisecond: valueMilliseconds,
			timezone: 'local'
		});
		this.setValue(this.localeValue.getJSDate());

		return true;
	},

	/**
	* @private
	*/
	setChildPickers: function (inOld) {
		if (this.value) {
			this.localeValue = dateFactory({unixtime: this.value.getTime(), timezone: 'local'});
		} else {
			this.localeValue = null;
		}

		if (this.localeValue || this.value) {
			var values = this.calcPickerValues();

			this.$.year.set('value', values.fullYear);
			this.$.month.set('value', values.month);
			this.$.day.set('value', values.date);
			this.$.month.set('max', values.maxMonths);
			this.$.day.set('max', values.maxDays);
		}
	},

	/**
	* @private
	*/
	calcPickerValues: function () {
		var values = {
			maxMonths: 12,
			maxDays: 31
		};

		if (this.localeValue) {
			values.fullYear = this.localeValue.getYears();
			values.month = this.localeValue.getMonths();
			values.date = this.localeValue.getDays();
			if (values.fullYear) {
				values.maxMonths = this._tf.cal.getNumMonths(values.fullYear);
				values.maxDays = this.monthLength(values.fullYear, values.month);
			}
		}

		return values;
	},

	/**
	* Returns number of days in a particular month/year.
	*
	* @private
	*/
	monthLength: function (inYear, inMonth) {
		return this._tf.cal.getMonLength(inMonth, inYear);
	},

	/**
	* @private
	*/
	yearTextChanged: function (inOldvalue, inNewValue) {
		this.$.yearLabel.setContent(inNewValue);
	},

	/**
	* @private
	*/
	monthTextChanged: function (inOldvalue, inNewValue) {
		this.$.monthLabel.setContent(inNewValue);
	},

	/**
	* @private
	*/
	dayTextChanged: function (inOldvalue, inNewValue) {
		this.$.dayLabel.setContent(inNewValue);
	},

	// Accessibility

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['dayText', 'monthText', 'yearText'], method: function () {
			this.$.day.set('accessibilityLabel', this.dayText);
			this.$.month.set('accessibilityLabel', this.monthText);
			this.$.year.set('accessibilityLabel', this.yearText);
		}}
	]
});

},{'../DateTimePickerBase':'moonstone/DateTimePickerBase','../i18n':'moonstone/i18n','../IntegerPicker':'moonstone/IntegerPicker'}],'moonstone/TimePicker':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/TimePicker~TimePicker} kind.
* @module moonstone/TimePicker
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	dateFactory = require('enyo-ilib/DateFactory'),
	DateFmt = require('enyo-ilib/DateFmt'),
	LocaleInfo = require('enyo-ilib/LocaleInfo');

var
	DateTimePickerBase = require('../DateTimePickerBase'),
	$L = require('../i18n'),
	IntegerPicker = require('../IntegerPicker');

/**
* {@link module:moonstone/TimePicker~MeridiemPicker} is a helper kind used by {@link module:moonstone/TimePicker~TimePicker}.
* It is not intended for use in other contexts.
*
* @class MeridiemPicker
* @extends module:moonstone/IntegerPicker~IntegerPicker
* @ui
* @protected
*/
var MeridiemPicker = kind(
	/** @lends module:moonstone/TimePicker~MeridiemPicker.prototype */ {

	/**
	* @private
	*/
	name: 'moon.MeridiemPicker',

	/**
	* @private
	*/
	kind: IntegerPicker,

	/**
	* @private
	*/
	classes: 'moon-date-picker-month',

	/**
	* @private
	*/
	min: 0,

	/**
	* @private
	*/
	max: 1,

	/**
	* @private
	*/
	wrap: true,

	/**
	* @private
	*/
	locale: null,

	/**
	* @private
	* @lends module:moonstone/TimePicker~MeridiemPicker.prototype
	*/
	published: {
		/**
		* The meridiem names and time ranges to use if
		* [meridiemEnable]{@link module:moonstone/TimePicker~TimePicker#meridiemEnable}
		* is `true`.
		*
		* @type {Object[]}
		* @default [{name: 'AM', start: '00:00', end: '11:59'}, {name: 'PM', start: '12:00', end: '23:59'}]
		* @public
		*/
		meridiems: [{name: 'AM', start: '00:00', end: '11:59'}, {name: 'PM', start: '12:00', end: '23:59'}]
	},

	/**
	* @private
	*/
	initILib: function () {
		// Get localized meridiem values
		var fmtParams = {
			template: 'a',
			useNative: false,
			timezone: 'local'
		};

		if (this.locale) fmtParams.locale = this.locale;

		var merFormatter = new DateFmt(fmtParams);
		this.meridiems = merFormatter.getMeridiemsRange(fmtParams);
	},

	/**
	* @private
	*/
	create: function () {
		this.initILib();
		this.max = this.meridiems.length - 1;
		IntegerPicker.prototype.create.apply(this, arguments);
	},

	/**
	* Set meridiem value based on given hour and minute
	*
	* @param  {Number} hour - hour between 0 to 23
	* @param  {Number} minute - minute between 0 to 59
	*
	* @public
	*/
	setValueByTime: function (hour, minute) {
		var meridiems = this.meridiems,
			start, end, time;
		for (var i = 0; i < meridiems.length; i++) {
			start = parseInt(meridiems[i].start.substring(0,2) + meridiems[i].start.substring(3,5), 10);
			end = parseInt(meridiems[i].end.substring(0,2) + meridiems[i].end.substring(3,5), 10);
			time = hour * 100 + minute;

			if ( start <= time && time <= end) this.set('value', i);
		}
		this.offset = hour - parseInt(meridiems[this.value].start, 10);
	},

	/**
	* Get meridiem based on given value
	*
	* @param  {Number} value - value between min to max
	* @return {Object} meridiem - element of meridiems
	*
	* @public
	*/
	getMeridiemByValue: function (value) {
		if (value < this.min || value > this.max) return null;
		return this.meridiems[value];
	},

	/**
	* @private
	*/
	valueChanged: function () {
		IntegerPicker.prototype.valueChanged.apply(this, arguments);
		this.updateOverlays();
	},

	/**
	* @private
	*/
	setupItem: function (inSender, inEvent) {
		var index = inEvent.index % this.range || 0;
		this.$.item.setContent(this.meridiems[index].name);
	},

	// Accessibility

	ariaValue: function () {
		this.setAriaAttribute('aria-valuetext', this.meridiems[this.value].name);
	}
});

/**
* {@link module:moonstone/TimePicker~HourMinutePickerBase} is a helper kind used by {@link module:moonstone/TimePicker~TimePicker}.
*  It is not intended for use in other contexts.
*
* @class HourMinutePickerBase
* @extends module:moonstone/IntegerPicker~IntegerPicker
* @ui
* @protected
*/
var HourMinutePickerBase = kind(
	/** @lends module:moonstone/TimePicker~HourMinutePickerBase.prototype */ {

	/**
	* @private
	*/
	name: 'moon.HourMinutePickerBase',

	/**
	* @private
	*/
	kind: IntegerPicker,

	/**
	* @private
	*/
	classes: 'moon-date-picker-field',

	/**
	* @private
	*/
	formatter: null,

	/**
	* @private
	*/
	wrap: true,

	/**
	* @private
	*/
	create: function () {
		IntegerPicker.prototype.create.apply(this, arguments);
		// Create ilib Date object used for formatting hours
		this.date = dateFactory();
	},

	/**
	* @private
	*/
	setupItem: function (inSender, inEvent) {
		var value = this.format(inEvent.index % this.range || 0);
		this.$.item.setContent(value);
	},

	// Accessibility

	ariaValue: function () {
		if (this.date && this.range) {
			var value = this.format(this.value % this.range);
			if (this.getAttribute('aria-valuenow') != value) {
				this.setAriaAttribute('aria-valuenow', value);
			}
		}
	}
});

/**
* {@link module:moonstone/TimePicker~MinutePicker} is a helper kind used by {@link module:moonstone/TimePicker~TimePicker}.
*  It is not intended for use in other contexts.
*
* @class MinutePicker
* @extends module:moonstone/TimePicker~HourMinutePickerBase
* @ui
* @protected
*/
var MinutePicker = kind(
	/** @lends module:moonstone/TimePicker~MinutePicker.prototype */ {

	/**
	* @private
	*/
	name: 'moon.MinutePicker',
	/**
	* @private
	*/
	kind: HourMinutePickerBase,

	/**
	* @private
	*/
	min: 0,

	/**
	* @private
	*/
	max: 59,

	/**
	 * Formats the minute at `index` for the current locale
	 *
	 * @param  {Number} index - Minute between 0 and 59
	 * @return {String}       - Formatted minute
	 * @private
	 */
	format: function (index) {
		this.date.minute = index;
		return this.formatter.format(this.date);
	}
});

/**
* {@link module:moonstone/TimePicker~HourPicker} is a helper kind used by {@link module:moonstone/TimePicker~TimePicker}. It is
*  not intended for use in other contexts.
*
* @class HourPicker
* @extends module:moonstone/TimePicker~HourMinutePickerBase
* @ui
* @protected
*/
var HourPicker = kind(
	/** @lends module:moonstone/TimePicker~HourPicker.prototype */ {

	/**
	* @private
	*/
	name: 'moon.HourPicker',

	/**
	* @private
	*/
	kind: HourMinutePickerBase,

	/**
	* @private
	*/
	min: 0,

	/**
	* @private
	*/
	max: 23,

	/**
	* @private
	*/
	valueChanged: function (old) {
		this.offset = this.value - old;
		IntegerPicker.prototype.valueChanged.apply(this, arguments);
	},

	/**
	 * Formats the hour at `index` for the current locale
	 *
	 * @param  {Number} index - Hour between 0 and 24
	 * @return {String}       - Formatted hour
	 * @private
	 */
	format: function (index) {
		this.date.hour = index;
		return this.formatter.format(this.date);
	},

	/**
	 * If the formatted new and old values are the same, skip animating by not passing
	 * the old value to `IntegerPicker.scrollToValue`.
	 *
	 * If the hour is changed by more than 12 but the locale is using 12 hour formatting, this
	 * will not prevent a big scroll through all intermediate values (e.g. from 3pm to 2am) even
	 * though it only has to scroll 1 index. This can be seen most easily by selecting a time
	 * between 2 and 3 pm on day when DST springs forward and then changing the meridiem to AM.
	 *
	 * @see module:moonstone/IntegerPicker~IntegerPicker.scrollToValue
	 * @private
	 */
	scrollToValue: function (old) {
		// try to avoid the format calls if the old and current values
		// don't mod to the same value
		var maybeSame = old !== undefined && old%12 === this.value%12;
		if (maybeSame && this.format(old) === this.format(this.value)) {
			HourMinutePickerBase.prototype.scrollToValue.call(this);
		} else {
			HourMinutePickerBase.prototype.scrollToValue.apply(this, arguments);
		}
	}
});
/**
* {@link module:moonstone/TimePicker~TimePicker} is a
* [control]{@link module:enyo/Control~Control} used to allow the selection of
* (or to simply display) a time expressed in hours and minutes, with an optional
* meridiem indicator ('am' or 'pm').
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		TimePicker = require('moonstone/TimePicker');
*
* 	{kind: TimePicker, content: 'Time', meridiemEnable: true,
* 		onChange: 'changed'}
* ```
*
* Set the [value]{@link module:moonstone/TimePicker~TimePicker#value} property to a standard JavaScript
* {@glossary Date} object to initialize the picker, or to change it programmatically at
* runtime.
*
* @class TimePicker
* @extends module:moonstone/DateTimePickerBase~DateTimePickerBase
* @ui
* @public
*/
var TimePicker = module.exports = kind(
	/** @lends module:moonstone/TimePicker~TimePicker.prototype */ {

	/**
	* @private
	*/
	name: 'moon.TimePicker',

	/**
	* @private
	*/
	kind: DateTimePickerBase,

	/**
	* @private
	* @lends module:moonstone/TimePicker~TimePicker.prototype
	*/
	published: {

		/**
		* When `true`, the picker will use a 12-hour clock. (When [iLib]{@glossary ilib} is loaded,
		* this value will be ignored and the current locale's rules will determine whether a
		* 12-hour or 24-hour clock is used.)
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		meridiemEnable: false,

		/**
		* Optional label for hour.
		*
		* @type {String}
		* @default 'moonstone/i18n.$L('hour')'
		* @public
		*/
		hourText: $L('hour'),			// i18n 'HOUR' label in moonstone/TimePicker widget

		/**
		* Optional label for minute.
		*
		* @type {String}
		* @default 'moonstone/i18n.$L('minute')'
		* @public
		*/
		minuteText: $L('minute'),		// i18n 'MINUTE' label in moonstone/TimePicker widget

		/**
		* Optional label for meridiem.
		*
		* @type {String}
		* @default 'moonstone/i18n.$L('meridiem')'
		* @public
		*/

		meridiemText: $L('meridiem'),	// i18n 'MERIDIEM' label in moonstone/TimePicker widget
		/**
		* When `true`, midnight (and noon, if `meridiemEnable: true`) will be represented as `0`
		* instead of `24` (and `12`). (When [iLib]{@glossary ilib} is loaded, this value will be
		* ignored and the current locale's rules will determine whether `0` is used.)
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		hoursStartAtZero: false,

		/**
		* When `true`, hours will be zero-padded. (When [iLib]{@glosary ilib} is loaded, this
		* value will be ignored and the current locale's rules will determine whether
		* zero-padding is used.)
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		hoursZeroPadded: false,

		/**
		* When `true`, bottom text will be displayed
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		showPickerLabels: true
	},

	/**
	* @private
	*/
	observers: {
		refresh: ['hoursStartAtZero', 'meridiemEnable', 'hoursZeroPadded']
	},

	/**
	* @private
	*/
	iLibFormatType  : 'time',

	/**
	* @private
	*/
	defaultOrdering : 'hma',


	/**
	* @private
	*/
	initILib: function () {
		DateTimePickerBase.prototype.initILib.apply(this, arguments);

		// Set picker format 12 vs 24 hour clock
		var li = new LocaleInfo(this.locale || undefined);
		var clockPref = li.getClock();
		this.meridiemEnable = (clockPref == '12');

		var fmtParams = {
			type: 'time',
			time: 'h',
			clock: clockPref !== 'locale' ? clockPref : undefined,
			useNative: false,
			timezone: 'local'
		};
		if (this.locale) fmtParams.locale = this.locale;
		this.hourFormatter = new DateFmt(fmtParams);

		fmtParams.time = 'm';
		this.minuteFormatter = new DateFmt(fmtParams);
	},

	/**
	* @private
	*/
	setupPickers: function (ordering) {
		var pickers = [];
		var orderingArr = ordering.toLowerCase().split('');
		var doneArr = [];
		var o, f, l, values;
		for(f = 0, l = orderingArr.length; f < l; f++) {
			o = orderingArr[f];
			if (doneArr.indexOf(o) < 0) doneArr.push(o);
		}

		values = this.calcPickerValues();
		this.silence();

		for(f = 0, l = doneArr.length; f < l; f++) {
			o = doneArr[f];

			switch (o){
			case 'h':
			case 'k':
				pickers.push(this.wrapComponent(
					{name: 'timeWrapper', kind: Control, classes: 'moon-time-picker-wrap'},
					{kind: Control, classes: 'moon-date-time-picker-wrap', components:[
						{name: 'hour', kind: HourPicker, formatter: this.hourFormatter || this, value: values.hour, onChange: 'hourPickerChanged'},
						{name: 'hourLabel', kind: Control, content: this.hourText, classes: 'moon-date-time-picker-label moon-divider-text', renderOnShow: true}
					]},
					this
				));
				break;
			case 'm':
				pickers.push(this.wrapComponent(
					{name: 'timeWrapper', kind: Control, classes: 'moon-time-picker-wrap'},
					{kind: Control, classes: 'moon-date-time-picker-wrap', components:[
						{name: 'minute', kind: MinutePicker, formatter: this.minuteFormatter || this, value: values.minute, onChange: 'minutePickerChanged'},
						{name: 'minuteLabel', kind: Control, content: this.minuteText, classes: 'moon-date-time-picker-label moon-divider-text', renderOnShow: true}
					]},
					this
				));
				break;
			case 'a':
				if (this.meridiemEnable === true) {
					pickers.push(this.createComponent(
						{kind: Control, classes: 'moon-date-time-picker-wrap', components:[
							{name: 'meridiem', kind: MeridiemPicker, classes: 'moon-date-picker-field', locale: this.locale, onChange: 'meridiemPickerChanged'},
							{name: 'meridiemLabel', kind: Control, content: this.meridiemText, classes: 'moon-date-time-picker-label moon-divider-text', renderOnShow: true}
						]}
					));
					this.$.meridiem.setValueByTime(values.hour, values.minute);
				}
				break;
			default:
				break;
			}

		}
		this.showPickerLabelsChanged();
		this.unsilence();
		this.pickers = pickers;
		DateTimePickerBase.prototype.setupPickers.apply(this, arguments);
	},

	/**
	* @private
	*/
	wrapComponent: function (wrapperProps, compProps, owner) {
		var wrapper = this.$[wrapperProps.name];
		if (!wrapper) wrapper = this.createComponent(wrapperProps);
		return wrapper.createComponent(compProps, {owner: owner});
	},

	/**
	* @private
	*/
	formatValue: function () {
		if (!this.value) return (this.noneText);
		return this._tf.format(dateFactory({unixtime: this.value.getTime(), timezone:'Etc/UTC'}));
	},

	/**
	* @private
	*/
	formatHour: function (hour) {
		if (this.meridiemEnable) {
			if (hour > 12) hour -= 12;
			if (this.hoursStartAtZero) {
				if (hour == 12) hour = 0;
			} else hour = hour || 12;
		} else {
			if (!this.hoursStartAtZero) hour = hour || 24;
		}
		if (this.hoursZeroPadded) hour = ('0' + hour).slice(-2);

		return hour;
	},

	/**
	* @private
	*/
	formatMinute: function (minute) {
		return minute;
	},

	/**
	* @private
	*/
	hourPickerChanged: function (sender, event) {
		if (this.syncingPickers) return true;

		var hour = this.value.getHours() + (event.originator.offset);

		if (this.value) this.updateValue(hour);

		return true;
	},

	/**
	* @private
	*/
	minutePickerChanged: function (sender, event) {
		if (this.syncingPickers) return true;

		var minutes = event.value;

		if (this.value) {
			this.value.setMinutes(minutes);
			this.set('value', this.value, {force: true});
		}

		return true;
	},

	/**
	* @private
	*/
	meridiemPickerChanged: function (sender, event) {
		if (this.syncingPickers) return true;

		var meridiemPicker = event.originator,
			meridiems = meridiemPicker.get('meridiems'),
			meridiem = meridiemPicker.getMeridiemByValue(event.value),
			start = meridiem.start.split(':'),
			startHour = parseInt(start[0], 10),
			offset = meridiemPicker.offset,
			newHour = startHour + offset;

		if (meridiems.length == 2) this.updateValue(newHour);
		else {
			var end = meridiem.end.split(':'),
				endHour = parseInt(end[0], 10),
				startMinute = parseInt(start[1], 10),
				endMinute = parseInt(end[1], 10),
				oldMinute = this.$.minute.get('value'),
				newMinute;

			if (startHour * 100 + startMinute > newHour * 100 + oldMinute) {
				newHour = startHour;
				newMinute = startMinute;
			} else if (endHour * 100 + endMinute < newHour * 100 + oldMinute) {
				newHour = endHour;
				newMinute = endMinute;
			}
			offset = newHour - this.$.hour.get('value');
			this.updateValue(this.value.getHours() + offset, newMinute);
		}

		return true;
	},

	/**
	* @private
	*/
	updateValue: function (newHour, newMinute) {
		var valueTime = this.value.getTime(),
			value = new Date(valueTime);

		if (newHour != null) value.setHours(newHour);
		if (newMinute != null) value.setMinutes(newMinute);

		// in the rare case that the value didn't change because it was snapped back to the
		// same value due to DST rules, push it back another hour.
		if (valueTime == value.getTime()) {
			value = new Date(valueTime - 3600000);
		}

		this.set('value', value, {force: true});
	},

	/**
	* @private
	*/
	setChildPickers: function (inOld) {
		if (this.value) {
			var values = this.calcPickerValues();
			this.$.hour.set('value', values.hour);
			this.$.minute.set('value',values.minute);
			if (this.meridiemEnable) this.$.meridiem.setValueByTime(values.hour, values.minute);
		}
	},

	/**
	* @private
	*/
	calcPickerValues: function () {
		var values = {},
			value = this.localeValue || this.value;

		if (value) {
			values.hour = value.getHours();
			values.minute = value.getMinutes();
		} else values.hour = values.minute = 0;

		return values;
	},

	/**
	* @private
	*/
	valueChanged: function (old) {
		if (this.value) this.localeValue = dateFactory({unixtime: this.value.getTime(), timezone: 'local'});
		else this.localeValue = null;

		DateTimePickerBase.prototype.valueChanged.apply(this, arguments);
	},

	/**
	* @private
	*/
	hourTextChanged: function (inOldvalue, inNewValue) {
		this.$.hourLabel.set('content', inNewValue);
	},

	/**
	* @private
	*/
	minuteTextChanged: function (inOldvalue, inNewValue) {
		this.$.minuteLabel.set('content', inNewValue);
	},

	/**
	* @private
	*/
	meridiemTextChanged: function (inOldvalue, inNewValue) {
		this.$.meridiemLabel.set('content', inNewValue);
	},

	/**
	* @private
	*/
	showPickerLabelsChanged: function (inOldvalue, inNewValue) {
		this.$.hourLabel.set('showing', this.showPickerLabels);
		this.$.minuteLabel.set('showing', this.showPickerLabels);
		if (this.meridiemEnable) this.$.meridiemLabel.set('showing', this.showPickerLabels);
 	},

	// Accessibility

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['hourText', 'minuteText', 'meridiemText'], method: function () {
			this.$.hour.set('accessibilityLabel', this.hourText);
			this.$.minute.set('accessibilityLabel', this.minuteText);
			if (this.$.meridiem && this.meridiemText != $L('meridiem')) {
				this.$.meridiem.set('accessibilityLabel', this.meridiemText);
			}
		}}
	]
});

TimePicker.HourPicker = HourPicker;
TimePicker.MinutePicker = MinutePicker;
TimePicker.MeridiemPicker = MeridiemPicker;

},{'../DateTimePickerBase':'moonstone/DateTimePickerBase','../i18n':'moonstone/i18n','../IntegerPicker':'moonstone/IntegerPicker'}],'moonstone/ExpandableDataPicker':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ExpandableDataPicker~ExpandableDataPicker} kind.
* @module moonstone/ExpandableDataPicker
*/

var
	kind = require('enyo/kind'),
	DataRepeater = require('enyo/DataRepeater');

var
	ExpandablePicker = require('../ExpandablePicker');

/**
* {@link module:moonstone/ExpandableDataPicker~ExpandableDataPicker}, which
* extends {@link module:moonstone/ExpandablePicker~ExpandablePicker}, is
* a data-driven drop-down picker menu that solicits a choice from the user. The picker's child
* components, which are instances of {@link module:moonstone/CheckboxItem~CheckboxItem} by default, provide
* the options for the picker. The child controls are generated from the picker's
* [collection]{@link module:moonstone/ExpandableDataPicker~ExpandableDataPicker#collection}.
* 
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		ExpandableDataPicker = require('moonstone/ExpandableDataPicker');
*
*	 {name: 'picker', kind: ExpandableDataPicker, content: 'Data Picker', components: [
* 		{bindings: [
* 			{from: '.model.label', to: '.content'}
* 		]}
* 	]}
* ```
*
* @class ExpandableDataPicker
* @extends module:moonstone/ExpandablePicker~ExpandablePicker
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ExpandableDataPicker~ExpandableDataPicker.prototype */ {
	
	/**
	* @private
	*/
	name: 'moon.ExpandableDataPicker',
	
	/**
	* @private
	*/
	kind: ExpandablePicker,
	
	/**
	* @lends module:moonstone/ExpandableDataPicker~ExpandableDataPicker.prototype
	* @private
	*/
	published: {
		/**
		* Collection of models to render as picker items
		*
		* @type {module:enyo/Collection~Collection}
		* @default null
		* @public
		*/
		collection: null
	},
	
	/**
	* @private
	*/
	collectionChanged: function () {
		this.$.list.set('collection', this.collection);
		if (this.collection && !this.$.list.hasNode()) this.$.list.refresh();
	},
	
	/**
	* @method
	* @private
	*/
	create: function () {
		ExpandablePicker.prototype.create.apply(this, arguments);
		this.collectionChanged();
	},
	
	/**
	* @method
	* @private
	*/
	initComponents: function () {
		var comps = this.components || this.kindComponents;
		this.components = null;

		ExpandablePicker.prototype.initComponents.apply(this, arguments);

		var list = this.getListComponent(comps);
		this.createComponent(list);
	},
	
	/**
	* Creates the configuration for the {@link module:enyo/DataRepeater~DataRepeater} that will generate the picker
	* items
	*
	* @param {Object[]} comps 	- Component configurations that will be each picker item
	* @return {Object} 			- List component configuration
	* @protected
	*/
	getListComponent: function (comps) {
		var list = {
			name: 'list',
			kind: DataRepeater,
			components: comps,
			owner: this
		};

		// could use defaultProps on the repeater but they'll also get added to the repeater's
		// container which may not be desirable
		if(comps.length === 1 && !comps[0].kind) {
			comps[0].kind = this.defaultKind;
		}

		return list;
	},
	
	/**
	* @private
	*/
	getCheckboxControls: function () {
		return this.$.list.getClientControls();
	}
});

},{'../ExpandablePicker':'moonstone/ExpandablePicker'}],'moonstone/DayPicker':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/DayPicker~DayPicker} kind.
* @module moonstone/DayPicker
*/

require('moonstone');

var
	kind = require('enyo/kind'),
	Signals = require('enyo/Signals');

var
	ilib = require('enyo-ilib'),
	DateFmt = require('enyo-ilib/DateFmt'),
	LocaleInfo = require('enyo-ilib/LocaleInfo');

var
	ExpandablePicker = require('../ExpandablePicker'),
	$L = require('../i18n');

/**
* {@link module:moonstone/DayPicker~DayPicker}, which extends
* {@link module:moonstone/ExpandablePicker~ExpandablePicker}, is a drop-down
* picker menu allowing the user to choose day(s) of the week.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		DayPicker = require('moonstone/DayPicker');
*
* 	{kind: DayPicker}
* ```
*
* When the picker is minimized, the currently selected day is displayed as
* subtext below the picker label. The subtext will be updated automatically if
* a new value is selected.  The content of the subtext strings may be customized
* by the user.
*
* ```javascript
* 	{kind: DayPicker, everyWeekdayText: 'Weekdays', everyWeekendText: 'Weekends',
* 		everyDayText:'Daily'}
* ```
*
* @class DayPicker
* @extends module:moonstone/ExpandablePicker~ExpandablePicker
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/DayPicker~DayPicker.prototype */ {

	/**
	* @private
	*/
	name: 'moon.DayPicker',

	/**
	* @private
	*/
	kind: ExpandablePicker,

	/**
	* @private
	*/
	autoCollapseOnSelect: false,

	/**
	* @private
	*/
	multipleSelection: true,

	/**
	* @private
	*/
	content: $L('Select days'),

	/**
	* @private
	* @lends module:moonstone/DayPicker~DayPicker.prototype
	*/
	published: {

		/**
		* Text to be displayed when all of the days are selected.
		*
		* @type {String}
		* @default 'Every Day'
		* @public
		*/
		everyDayText: $L('Every Day'),

		/**
		* Text to be displayed when all of the weekdays are selected.
		*
		* @type {String}
		* @default 'Every Weekday'
		* @public
		*/
		everyWeekdayText: $L('Every Weekday'),

		/**
		* Text to be displayed when all of the weekend days are selected.
		*
		* @type {String}
		* @default 'Every Weekend'
		* @public
		*/
		everyWeekendText: $L('Every Weekend'),

		/**
		* Text to be displayed if no item is currently selected.
		*
		* @type {String}
		* @default 'Nothing selected'
		* @public
		*/
		noneText: $L('Nothing selected')
	},

	/**
	* @private
	*/
	firstDayOfWeek: 0,

	/**
	* @private
	*/
	weekEndStart: 6,

	/**
	* @private
	*/
	weekEndEnd: 0,

	/**
	* @private
	*/
	tools: [
		{kind: Signals, onlocalechange: 'handleLocaleChangeEvent'}
	],

	/**
	* @private
	*/
	daysComponents: [
		{content: 'Sunday'},
		{content: 'Monday'},
		{content: 'Tuesday'},
		{content: 'Wednesday'},
		{content: 'Thursday'},
		{content: 'Friday'},
		{content: 'Saturday'}
	],

	/**
	* @private
	*/
	days: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],

	/**
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function() {
			// super initialization
			sup.apply(this, arguments);
			this.createChrome(this.tools);
			this.initILib();
			this.createComponents(this.daysComponents);
		};
	}),

	/**
	* @private
	*/
	initILib: function () {
		var i, index;
		if (typeof ilib !== 'undefined') {
			var df = new DateFmt({length: 'full'});
			var sdf = new DateFmt({length: 'long'});
			var li = new LocaleInfo(ilib.getLocale());
			var daysOfWeek = df.getDaysOfWeek();
			var days = sdf.getDaysOfWeek();

			this.firstDayOfWeek = li.getFirstDayOfWeek();
			this.weekEndStart = li.getWeekEndStart ? li.getWeekEndStart() : this.weekEndStart;
			this.weekEndEnd = li.getWeekEndEnd ? li.getWeekEndEnd() : this.getWeekEndEnd;

			// adjust order of days
			this.daysComponents = [];
			this.days = [];
			for (i = 0; i < 7; i++) {
				index = (i + this.firstDayOfWeek) % 7;
				this.daysComponents[i] = {content: daysOfWeek[index]};
				this.days[i] = days[index];
			}
		}
	},

	/**
	* @private
	*/
	handleLocaleChangeEvent: function () {
		this.destroyClientControls();
		this.initILib();
		this.createComponents(this.daysComponents);
		this.render();
	},

	/**
	* @private
	*/
	multiSelectCurrentValue: function () {
		var str = this.getRepresentativeString();
		if (str) {
			return str;
		}

		for (var i=0; i < this.selectedIndex.length; i++) {
			if (!str) {
				str = this.days[this.selectedIndex[i]];
			} else {
				str = str + ', ' + this.days[this.selectedIndex[i]];
			}
		}
		return str || this.getNoneText();
	},

	/**
	* @private
	*/
	getRepresentativeString: function () {
		var bWeekEndStart = false,
			bWeekEndEnd = false,
			length = this.selectedIndex.length,
			weekendLength = this.weekEndStart === this.weekEndEnd ? 1 : 2,
			index, i;

		if (length == 7) return this.everyDayText;

		for (i = 0; i < 7; i++) {
			// convert the control index to day index
			index = (this.selectedIndex[i] + this.firstDayOfWeek) % 7;
			bWeekEndStart = bWeekEndStart || this.weekEndStart == index;
			bWeekEndEnd = bWeekEndEnd || this.weekEndEnd == index;
		}

		if (bWeekEndStart && bWeekEndEnd && length == weekendLength) {
			return this.everyWeekendText;
		} else if (!bWeekEndStart && !bWeekEndEnd && length == 7 - weekendLength) {
			return this.everyWeekdayText;
		}
	}
});

},{'../ExpandablePicker':'moonstone/ExpandablePicker','../i18n':'moonstone/i18n'}]
	};

});
//# sourceMappingURL=moonstone.js.map