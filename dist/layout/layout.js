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
	return {'layout':[function (module,exports,global,require,request){
module.exports = {
	version: '2.7.0'
};

}],'layout/easing':[function (module,exports,global,require,request){
var
    animation = require('enyo/animation'),
    utils = require('enyo/utils');

/**
* Provides static methods for easing calculations.
*
* @module layout/easing
* @ui
* @public
* @todo verify this combines with enyo.easing definition
* @todo verify all these methods need to be documented
*/

var easing = module.exports = utils.mixin(animation.easing, /** @lends module:layout/easing */ {

    /**
    * @type {Number}
    * @public
    */
    easeInQuad: function (n, t, b, c, d) {
        return c*(t /= d)*t + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeOutQuad: function (n, t, b, c, d) {
        return -c *(t /= d)*(t-2) + b;
    },


    /**
    * @type {Number}
    * @public
    */
    easeInOutQuad: function (n, t, b, c, d) {
        if ((t /= d/2) < 1) { return c/2*t*t + b; }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },


    /**
    * @type {Number}
    * @public
    */
    easeInCubic: function (n, t, b, c, d) {
        return c*(t /= d)*t*t + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeOutCubic: function (n, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeInOutCubic: function (n, t, b, c, d) {
        if ((t /= d/2) < 1) { return c/2*t*t*t + b; }
        return c/2*((t-=2)*t*t + 2) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeInQuart: function (n, t, b, c, d) {
        return c*(t /= d)*t*t*t + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeOutQuart: function (n, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeInOutQuart: function (n, t, b, c, d) {
        if ((t /= d/2) < 1) { return c/2*t*t*t*t + b; }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeInQuint: function (n, t, b, c, d) {
        return c*(t /= d)*t*t*t*t + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeOutQuint: function (n, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeInOutQuint: function (n, t, b, c, d) {
        if ((t /= d/2) < 1) { return c/2*t*t*t*t*t + b; }
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeInSine: function (n, t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeOutSine: function (n, t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeInOutSine: function (n, t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeInExpo: function (n, t, b, c, d) {
        return (t===0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeOutExpo: function (n, t, b, c, d) {
        return (t===d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeInOutExpo: function (n, t, b, c, d) {
        if (t===0) { return b; }
        if (t===d) { return b+c; }
        if ((t /= d/2) < 1) { return c/2 * Math.pow(2, 10 * (t - 1)) + b; }
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeInCirc: function (n, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d)*t) - 1) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeOutCirc: function (n, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeInOutCirc: function (n, t, b, c, d) {
        if ((t /= d/2) < 1) { return -c/2 * (Math.sqrt(1 - t*t) - 1) + b; }
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeInElastic: function (n, t, b, c, d) {
        var s = 1.70158;
        var a = c;
        var p = 0;
        if (t===0) { return b; }
        if ((t /= d)==1) { return b+c; }
        if (!p) { p=d*0.3; }
        if (a < Math.abs(c)) { a=c; s=p/4; }
        else { s = p/(2*Math.PI) * Math.asin (c/a); }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeOutElastic: function (n, t, b, c, d) {
        var s = 1.70158;
        var a = c;
        var p = 0;
        if (t===0) { return b; }
        if ((t /= d)==1) { return b+c; }
        if (!p) { p=d*0.3; }
        if (a < Math.abs(c)) { a=c; s=p/4; }
        else { s = p/(2*Math.PI) * Math.asin (c/a); }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeInOutElastic: function (n, t, b, c, d) {
        var s = 1.70158;
        var a = c;
        var p = 0;
        if (t===0) { return b; }
        if ((t /= d/2)===2) { return b+c; }
        if (!p) { p=d*(0.3*1.5); }
        if (a < Math.abs(c)) { a=c; s=p/4; }
        else { s = p/(2*Math.PI) * Math.asin (c/a); }
        if (t < 1) { return -0.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b; }
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeInBack: function (n, t, b, c, d) {
        var s = 1.70158;
        return c*(t /= d)*t*((s+1)*t - s) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeOutBack: function (n, t, b, c, d) {
        var s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeInOutBack: function (n, t, b, c, d) {
        var s = 1.70158;
        if ((t /= d/2) < 1) { return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b; }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeInBounce: function (n, t, b, c, d) {
        return c - easing.easeOutBounce (n, d-t, 0, c, d) + b;
    },

    /**
    * @type {Number}
    * @public
    */
    easeOutBounce: function (n, t, b, c, d) {
        if ((t /= d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
        }
    },

    /**
    * @type {Number}
    * @public
    */
    easeInOutBounce: function (n, t, b, c, d) {
        if (t < d/2) { return easing.easeInBounce (n, t*2, 0, c, d) * 0.5 + b; }
        return easing.easeOutBounce (n, t*2-d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
});

/*

TERMS OF USE - EASING EQUATIONS

Open source under the BSD License.

Copyright © 2001 Robert Penner
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list
of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright notice, this list
of conditions and the following disclaimer in the documentation and/or other materials
provided with the distribution.

Neither the name of the author nor the names of contributors may be used to endorse
or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT
OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

}],'layout/List/methods':[function (module,exports,global,require,request){
var
	animation = require('enyo/animation'),
	dom = require('enyo/dom'),
	kind = require('enyo/kind'),
	logger = require('enyo/logger'),
	platform = require('enyo/platform'),
	utils = require('enyo/utils');

/**
* layout/List was too large for the parser so we have to split it up. For now, we're arbitrarily
* splitting the methods into another file. A more appropriate refactoring is required.
* @module layout/List
* @private
*/

module.exports = /** @lends module:layout/List~List.prototype */ {
	/**
	* @method
	* @private
	*/
	importProps: kind.inherit(function (sup) {
		return function (props) {
			// force touch on desktop when we have reorderable items to work around
			// problems with native scroller
			if (props && props.reorderable) {
				this.touch = true;
			}
			sup.apply(this, arguments);
		};
	}),

	/**
	* @method
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			this.pageSizes = [];
			this.orientV = this.orient == 'v';
			this.vertical = this.orientV ? 'default' : 'hidden';
			sup.apply(this, arguments);
			this.$.generator.orient = this.orient;
			this.getStrategy().translateOptimized = true;
			this.$.port.addRemoveClass('horizontal',!this.orientV);
			this.$.port.addRemoveClass('vertical',this.orientV);
			this.$.page0.addRemoveClass('vertical',this.orientV);
			this.$.page1.addRemoveClass('vertical',this.orientV);
			this.bottomUpChanged();  // Initializes pageBound also
			this.noSelectChanged();
			this.multiSelectChanged();
			this.toggleSelectedChanged();
			// setup generator to default to 'full-list' values
			this.$.generator.setRowOffset(0);
			this.$.generator.setCount(this.count);
		};
	}),

	/**
	* @method
	* @private
	*/
	initComponents: kind.inherit(function (sup) {
		return function () {
			this.createReorderTools();
			sup.apply(this, arguments);
			this.createSwipeableComponents();
		};
	}),

	/**
	* @private
	*/
	createReorderTools: function () {
		this.createComponent({
			name: 'reorderContainer',
			classes: 'enyo-list-reorder-container',
			ondown: 'sendToStrategy',
			ondrag: 'sendToStrategy',
			ondragstart: 'sendToStrategy',
			ondragfinish: 'sendToStrategy',
			onflick: 'sendToStrategy'
		});
	},

	/**
	* Adjusts the parent control so [listTools]{@link module:layout/List~List#listTools} are
	* created inside the strategy. This is necessary for strategies like
	* {@link module:enyo/TouchScrollStrategy~TouchScrollStrategy}, which wrap their contents with
	* additional DOM nodes.
	*
	* @see {@link module:enyo/Scroller~Scroller#createStrategy}
	* @method
	* @private
	*/
	createStrategy: kind.inherit(function (sup) {
		return function () {
			this.controlParentName = 'strategy';
			sup.apply(this, arguments);
			this.createChrome(this.listTools);
			this.controlParentName = 'client';
			this.discoverControlParent();
		};
	}),

	/**
	* @private
	*/
	createSwipeableComponents: function () {
		for (var i=0;i<this.swipeableComponents.length;i++) {
			this.$.swipeableComponents.createComponent(this.swipeableComponents[i], {owner: this.owner});
		}
	},

	/**
	* @method
	* @private
	*/
	rendered: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.$.generator.node = this.$.port.hasNode();
			this.$.generator.generated = true;
			this.reset();
		};
	}),

	/**
	* @method
	* @private
	*/
	handleResize: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.refresh();
		};
	}),

	/**
	* @private
	*/
	bottomUpChanged: function () {
		this.$.generator.bottomUp = this.bottomUp;
		this.$.page0.applyStyle(this.pageBound, null);
		this.$.page1.applyStyle(this.pageBound, null);

		if (this.orientV) {
			this.pageBound = this.bottomUp ? 'bottom' : 'top';
		} else {
			if (this.rtl) {
				this.pageBound = this.bottomUp ? 'left' : 'right';
			} else {
				this.pageBound = this.bottomUp ? 'right' : 'left';
			}
		}

		if (!this.orientV && this.bottomUp){
			this.$.page0.applyStyle('left', 'auto');
			this.$.page1.applyStyle('left', 'auto');
		}

		if (this.hasNode()) {
			this.reset();
		}
	},

	/**
	* @private
	*/
	noSelectChanged: function () {
		this.$.generator.setNoSelect(this.noSelect);
	},

	/**
	* @private
	*/
	multiSelectChanged: function () {
		this.$.generator.setMultiSelect(this.multiSelect);
	},

	/**
	* @private
	*/
	toggleSelectedChanged: function () {
		this.$.generator.setToggleSelected(this.toggleSelected);
	},

	/**
	* @private
	*/
	countChanged: function () {
		if (this.hasNode()) {
			this.updateMetrics();
		}
	},

	/**
	* Re-dispatches events from the reorder tools to the scroll strategy.
	*
	* @private
	*/
	sendToStrategy: function (sender, event) {
		this.$.strategy.dispatchEvent('on' + event.type, event, sender);
	},

	/**
	* Calculates page metrics (size, number of pages) and resizes the port.
	*
	* @private
	*/
	updateMetrics: function () {
		this.defaultPageSize = this.rowsPerPage * (this.rowSize || 100);
		this.pageCount = Math.ceil(this.count / this.rowsPerPage);
		this.portSize = 0;
		for (var i=0; i < this.pageCount; i++) {
			this.portSize += this.getPageSize(i);
		}
		this.adjustPortSize();
	},

	/**
	* Handles hold pulse events. Used to delay before running hold logic.
	*
	* @private
	*/
	holdpulse: function (sender, event) {
		// don't activate if we're not supporting reordering or if we've already
		// activated the reorder logic
		if (!this.getReorderable() || this.isReordering()) {
			return;
		}
		// first pulse event that exceeds our minimum hold time activates
		if (event.holdTime >= this.reorderHoldTimeMS) {
			// determine if we should handle the hold event
			if (this.shouldStartReordering(sender, event)) {
				this.startReordering(event);
				return false;
			}
		}
	},

	/**
	* Handles DragStart events.
	*
	* @private
	*/
	dragstart: function (sender, event) {
		// stop dragstart from propagating if we're in reorder mode
		if (this.isReordering()) {
			return true;
		}
		if (this.isSwipeable()) {
			return this.swipeDragStart(sender, event);
		}
	},

	/**
	* Determines whether we should handle the drag event.
	*
	* @private
	*/
	drag: function (sender, event) {
		if (this.shouldDoReorderDrag(event)) {
			event.preventDefault();
			this.reorderDrag(event);
			return true;
		} else if (this.isSwipeable()) {
			event.preventDefault();
			this.swipeDrag(sender, event);
			return true;
		}
	},

	/**
	* Handles DragFinish events.
	*
	* @private
	*/
	dragfinish: function (sender, event) {
		if (this.isReordering()) {
			this.finishReordering(sender, event);
		} else if (this.isSwipeable()) {
			this.swipeDragFinish(sender, event);
		}
	},

	/**
	* Handles up events.
	*
	* @private
	*/
	up: function (sender, event) {
		if (this.isReordering()) {
			this.finishReordering(sender, event);
		}
	},

	/**
	* Calculates the record indices for `pageNumber` and generates the markup
	* for that page.
	*
	* @private
	*/
	generatePage: function (pageNumber, target) {
		this.page = pageNumber;
		var r = this.rowsPerPage * this.page;
		this.$.generator.setRowOffset(r);
		var rpp = Math.min(this.count - r, this.rowsPerPage);
		this.$.generator.setCount(rpp);
		var html = this.$.generator.generateChildHtml();
		target.setContent(html);
		// prevent reordering row from being draw twice
		if (this.getReorderable() && this.draggingRowIndex > -1) {
			this.hideReorderingRow();
		}
		var bounds = target.getBounds();
		var pageSize = this.orientV ? bounds.height : bounds.width;
		// if rowSize is not set, use the height or width from the first generated page
		if (!this.rowSize && pageSize > 0) {
			this.rowSize = Math.floor(pageSize / rpp);
			this.updateMetrics();
		}
		// update known page sizes
		if (!this.fixedSize) {
			var s0 = this.getPageSize(pageNumber);
			if (s0 != pageSize && pageSize > 0) {
				this.pageSizes[pageNumber] = pageSize;
				this.portSize += pageSize - s0;
			}
		}
	},

	/**
	* Maps a row index number to the page number where it would be found.
	*
	* @private
	*/
	pageForRow: function (index) {
		return Math.floor(index / this.rowsPerPage);
	},

	/**
	 * Updates the list pages to show the correct rows for the requested `top` position.
	 *
	 * @param  {Number} top - Position in pixels from the top.
	 * @private
	 */
	update: function (top) {
		var updated = false;
		// get page info for position
		var pi = this.positionToPageInfo(top);
		// zone line position
		var pos = pi.pos + this.scrollerSize/2;
		// leap-frog zone position
		var k = Math.floor(pos/Math.max(pi.size, this.scrollerSize) + 1/2) + pi.no;
		// which page number for page0 (even number pages)?
		var p = (k % 2 === 0) ? k : k-1;
		if (this.p0 != p && this.isPageInRange(p)) {
			this.removedInitialPage = this.removedInitialPage || (this.draggingRowPage == this.p0);
			this.generatePage(p, this.$.page0);
			this.positionPage(p, this.$.page0);
			this.p0 = p;
			updated = true;
			this.p0RowBounds = this.getPageRowSizes(this.$.page0);
		}
		// which page number for page1 (odd number pages)?
		p = (k % 2 === 0) ? Math.max(1, k-1) : k;
		// position data page 1
		if (this.p1 != p && this.isPageInRange(p)) {
			this.removedInitialPage = this.removedInitialPage || (this.draggingRowPage == this.p1);
			this.generatePage(p, this.$.page1);
			this.positionPage(p, this.$.page1);
			this.p1 = p;
			updated = true;
			this.p1RowBounds = this.getPageRowSizes(this.$.page1);
		}
		if (updated) {
			// reset generator back to 'full-list' values
			this.$.generator.setRowOffset(0);
			this.$.generator.setCount(this.count);
			if (!this.fixedSize) {
				this.adjustBottomPage();
				this.adjustPortSize();
			}
		}
	},

	/**
	* Calculates the height and width of each row for a page.
	*
	* @param {module:enyo/Control~Control} page - Page control.
	* @private
	*/
	getPageRowSizes: function (page) {
		var rows = {};
		var allDivs = page.hasNode().querySelectorAll('div[data-enyo-index]');
		for (var i=0, index, bounds; i < allDivs.length; i++) {
			index = allDivs[i].getAttribute('data-enyo-index');
			if (index !== null) {
				bounds = dom.getBounds(allDivs[i]);
				rows[parseInt(index, 10)] = {height: bounds.height, width: bounds.width};
			}
		}
		return rows;
	},

	/**
	* Updates row bounds when rows are re-rendered.
	*
	* @private
	*/
	updateRowBounds: function (index) {
		if (this.p0RowBounds[index]) {
			this.updateRowBoundsAtIndex(index, this.p0RowBounds, this.$.page0);
		} else if (this.p1RowBounds[index]) {
			this.updateRowBoundsAtIndex(index, this.p1RowBounds, this.$.page1);
		}
	},

	/**
	* @private
	*/
	updateRowBoundsAtIndex: function (index, rows, page) {
		var rowDiv = page.hasNode().querySelector('div[data-enyo-index="' + index + '"]');
		var bounds = dom.getBounds(rowDiv);
		rows[index].height = bounds.height;
		rows[index].width = bounds.width;
	},

	/**
	* Updates the list for the given `position`.
	*
	* @param {Number} position - Position in pixels.
	* @private
	*/
	updateForPosition: function (position) {
		this.update(this.calcPos(position));
	},

	/**
	* Adjusts the position if the list is [bottomUp]{@link module:layout/List~List#bottomUp}.
	*
	* @param {Number} position - Position in pixels.
	* @private
	*/
	calcPos: function (position) {
		return (this.bottomUp ? (this.portSize - this.scrollerSize - position) : position);
	},

	/**
	* Determines which page is on the bottom and positions it appropriately.
	*
	* @private
	*/
	adjustBottomPage: function () {
		var bp = this.p0 >= this.p1 ? this.$.page0 : this.$.page1;
		this.positionPage(bp.pageNo, bp);
	},

	/**
	* Updates the size of the port to be the greater of the size of the scroller or
	* the `portSize`.
	*
	* @private
	*/
	adjustPortSize: function () {
		this.scrollerSize = this.orientV ? this.getBounds().height : this.getBounds().width;
		var s = Math.max(this.scrollerSize, this.portSize);
		this.$.port.applyStyle((this.orientV ? 'height' : 'width'), s + 'px');
		if (!this.orientV) {
			this.$.port.applyStyle('height', this.getBounds().height + 'px');
		}
	},

	/**
	* @private
	*/
	positionPage: function (pageNumber, target) {
		target.pageNo = pageNumber;
		var p = this.pageToPosition(pageNumber);
		target.applyStyle(this.pageBound, p + 'px');
	},

	/**
	* Calculates the position of `page`.
	*
	* @param {Number} page - Page number.
	* @private
	*/
	pageToPosition: function (page) {
		var p = 0;
		while (page > 0) {
			page--;
			p += this.getPageSize(page);
		}
		return p;
	},

	/**
	 * Retrieves the metrics for a page covering `position`.
	 *
	 * @param  {Number} position - Position in pixels.
	 * @return {module:layout/List~List~PageInfo}
	 * @private
	 */
	positionToPageInfo: function (position) {
		var page = -1;
		var p = this.calcPos(position);
		var s = this.defaultPageSize;
		while (p >= 0) {
			page++;
			s = this.getPageSize(page);
			p -= s;
		}
		page = Math.max(page, 0);
		return {
			no: page,
			size: s,
			pos: p + s,
			startRow: (page * this.rowsPerPage),
			endRow: Math.min((page + 1) * this.rowsPerPage - 1, this.count - 1)
		};
	},

	/**
	* Determines if `page` is a valid page number.
	*
	* @param {Number} page - Page number.
	* @private
	*/
	isPageInRange: function (page) {
		return page == Math.max(0, Math.min(this.pageCount-1, page));
	},

	/**
	* Calculates the size of a page. The size is estimated if the page has not
	* yet been rendered.
	*
	* @private
	*/
	getPageSize: function (pageNumber) {
		var size = this.pageSizes[pageNumber];
		// estimate the size based on how many rows are in this page
		if (!size) {
			var firstRow = this.rowsPerPage * pageNumber;
			var numRows = Math.min(this.count - firstRow, this.rowsPerPage);
			size = this.defaultPageSize * (numRows / this.rowsPerPage);
		}
		// can never return size of 0, as that would lead to infinite loops
		return Math.max(1, size);
	},

	/**
	* Resets pages and removes all rendered rows.
	*
	* @private
	*/
	invalidatePages: function () {
		this.p0 = this.p1 = null;
		this.p0RowBounds = {};
		this.p1RowBounds = {};
		// clear the html in our render targets
		this.$.page0.setContent('');
		this.$.page1.setContent('');
	},

	/**
	* Resets page and row sizes.
	*
	* @private
	*/
	invalidateMetrics: function () {
		this.pageSizes = [];
		this.rowSize = 0;
		this.updateMetrics();
	},

	/**
	* When the list is scrolled, ensures that the correct rows are rendered and
	* that the reordering controls are positioned correctly.
	*
	* @see {@link module:enyo/Scroller~Scroller#scroll}
	* @method
	* @private
	*/
	scroll: kind.inherit(function (sup) {
		return function (sender, event) {
			var r = sup.apply(this, arguments);
			var pos = this.orientV ? this.getScrollTop() : this.getScrollLeft();
			if (this.lastPos === pos) {
				return r;
			}
			this.lastPos = pos;
			this.update(pos);
			if (this.pinnedReorderMode) {
				this.reorderScroll(sender, event);
			}
			return r;
		};
	}),

	/**
	* Updates the list rows when the scroll top is set explicitly.
	*
	* @see {@link module:enyo/Scroller~Scroller#setScrollTop}
	* @method
	* @public
	*/
	setScrollTop: kind.inherit(function (sup) {
		return function (scrollTop) {
			this.update(scrollTop);
			sup.apply(this, arguments);
			this.twiddle();
		};
	}),

	/**
	* @private
	*/
	getScrollPosition: function () {
		return this.calcPos(this[(this.orientV ? 'getScrollTop' : 'getScrollLeft')]());
	},

	/**
	* @private
	*/
	setScrollPosition: function (position) {
		this[(this.orientV ? 'setScrollTop' : 'setScrollLeft')](this.calcPos(position));
	},

	/**
	* Scrolls the list so that the last item is visible.
	*
	* @method
	* @public
	*/
	scrollToBottom: kind.inherit(function (sup) {
		return function () {
			this.update(this.getScrollBounds().maxTop);
			sup.apply(this, arguments);
		};
	}),

	/**
	* Scrolls to the specified row.
	*
	* @param {Number} row - The index of the row to scroll to.
	* @public
	*/
	scrollToRow: function (row) {
		var page = this.pageForRow(row);
		var h = this.pageToPosition(page);
		// update the page
		this.updateForPosition(h);
		// call pageToPosition again and this time should return the right pos since the page info is populated
		h = this.pageToPosition(page);
		this.setScrollPosition(h);
		if (page == this.p0 || page == this.p1) {
			var rowNode = this.$.generator.fetchRowNode(row);
			if (rowNode) {
				// calc row offset
				var offset = (this.orientV ? rowNode.offsetTop : rowNode.offsetLeft);
				if (this.bottomUp) {
					offset = this.getPageSize(page) - (this.orientV ? rowNode.offsetHeight : rowNode.offsetWidth) - offset;
				}
				var p = this.getScrollPosition() + offset;
				this.setScrollPosition(p);
			}
		}
	},

	/**
	* Scrolls to the beginning of the list.
	*
	* @public
	*/
	scrollToStart: function () {
		this[this.bottomUp ? (this.orientV ? 'scrollToBottom' : 'scrollToRight') : 'scrollToTop']();
	},

	/**
	* Scrolls to the end of the list.
	*
	* @public
	*/
	scrollToEnd: function () {
		this[this.bottomUp ? (this.orientV ? 'scrollToTop' : 'scrollToLeft') : (this.orientV ? 'scrollToBottom' : 'scrollToRight')]();
	},

	/**
	* Re-renders the list at the current position.
	*
	* @public
	*/
	refresh: function () {
		this.invalidatePages();
		this.update(this[(this.orientV ? 'getScrollTop' : 'getScrollLeft')]());
		this.stabilize();

		//FIXME: Necessary evil for Android 4.0.4 refresh bug
		if (platform.android === 4) {
			this.twiddle();
		}
	},

	/**
	* Re-renders the list from the beginning.  This is used when changing the
	* data model for the list.  This also clears the selection state.
	*
	* @public
	*/
	reset: function () {
		this.getSelection().clear();
		this.invalidateMetrics();
		this.invalidatePages();
		this.stabilize();
		this.scrollToStart();
	},

	/**
	* Returns the {@link module:enyo/Selection~Selection} component that
	* manages the selection state for this list.
	*
	* @return {module:enyo/Selection~Selection} - The component that manages selection state for this list.
	* @public
	*/
	getSelection: function () {
		return this.$.generator.getSelection();
	},

	/**
	* Sets the selection state for the given row index.
	*
	* Modifying selection will not automatically re-render the row, so call
	* [renderRow()]{@link module:layout/List~List#renderRow} or [refresh()]{@link module:layout/List~List#refresh}
	* to update the view.
	*
	* @param {Number} index - The index of the row whose selection state is to be set.
	* @param {*} [data]     - Data value stored in the selection object.
	* @public
	*/
	select: function (index, data) {
		return this.getSelection().select(index, data);
	},

	/**
	* Clears the selection state for the given row index.
	*
	* Modifying selection will not automatically re-render the row, so call
	* [renderRow()]{@link module:layout/List~List#renderRow} or [refresh()]{@link module:layout/List~List#refresh}
	* to update the view.
	*
	* @param {Number} index - The index of the row whose selection state is to be cleared.
	* @public
	*/
	deselect: function (index) {
		return this.getSelection().deselect(index);
	},

	/**
	* Gets the selection state for the given row index.
	*
	* @param {Number} index - The index of the row whose selection state is
	* to be retrieved.
	* @return {Boolean} `true` if the given row is currently selected; otherwise, `false`.
	* @public
	*/
	isSelected: function (index) {
		return this.$.generator.isSelected(index);
	},

	/**
	* Re-renders the specified row. Call this method after making
	* modifications to a row, to force it to render.
	*
	* @param {Number} index - The index of the row to be re-rendered.
	* @public
    */
    renderRow: function (index) {
		this.$.generator.renderRow(index);
    },

	/**
 	* Handler for `onRenderRow` events. Updates row bounds when rows are re-rendered.
	*
	* @private
	*/
	rowRendered: function (sender, event) {
		this.updateRowBounds(event.rowIndex);
	},

	/**
	* Prepares a row to become interactive.
	*
	* @param {Number} index - The index of the row to be prepared.
	* @public
	*/
	prepareRow: function (index) {
		this.$.generator.prepareRow(index);
	},

	/**
	* Restores the row to being non-interactive.
	*
	* @public
	*/
	lockRow: function () {
		this.$.generator.lockRow();
	},

	/**
	* Performs a set of tasks by running the function `func` on a row (which
	* must be interactive at the time the tasks are performed). Locks the	row
	* when done.
	*
	* @param {Number} index   - The index of the row to be acted upon.
	* @param {function} func  - The function to perform.
	* @param {Object} context - The context to which the function is bound.
	* @public
	*/
	performOnRow: function (index, func, context) {
		this.$.generator.performOnRow(index, func, context);
	},

	/**
	* @private
	*/
	animateFinish: function (sender) {
		this.twiddle();
		return true;
	},
	/**
	* FIXME: Android 4.04 has issues with nested composited elements; for example, a
	* SwipeableItem, can incorrectly generate taps on its content when it has slid off the
	* screen; we address this BUG here by forcing the Scroller to 'twiddle' which corrects the
	* bug by provoking a dom update.
	*
	* @private
	*/
	twiddle: function () {
		var s = this.getStrategy();
		utils.call(s, 'twiddle');
	},

	/**
	* Returns page0 or page1 control depending on pageNumber odd/even status
	*
	* @param {Number} pageNumber  - Index of page.
	* @param {Boolean} checkRange - Whether to force checking `pageNumber` against
	* currently active pages.
	* @return {module:enyo/Control~Control}      - Page control for `pageNumber`.
	* @private
	*/
	pageForPageNumber: function (pageNumber, checkRange) {
		if (pageNumber % 2 === 0) {
			return (!checkRange || (pageNumber === this.p0)) ? this.$.page0 : null;
		}
		else {
			return (!checkRange || (pageNumber === this.p1)) ? this.$.page1 : null;
		}
		return null;
	},
	/**
		---- Reorder functionality ------------
	*/

	/**
	* Determines whether the hold event should be handled as a reorder hold.
	*
	* @private
	*/
	shouldStartReordering: function (sender, event) {
		if (!this.getReorderable() ||
			event.rowIndex == null ||
			event.rowIndex < 0 ||
			this.pinnedReorderMode ||
			event.index == null ||
			event.index < 0) {
			return false;
		}
		return true;
	},

	/**
	* Processes hold event and prepares for reordering.
	*
	* @fires module:layout/List~List#onSetupReorderComponents
	* @private
	*/
	startReordering: function (event) {
		// disable drag to scroll on strategy
		this.$.strategy.listReordering = true;

		this.buildReorderContainer();
		this.doSetupReorderComponents({index: event.index});
		this.styleReorderContainer(event);

		this.draggingRowIndex = this.placeholderRowIndex = event.rowIndex;
		this.draggingRowPage = this.pageForRow(this.draggingRowIndex);
		this.removeDraggingRowNode = event.dispatchTarget.retainNode(event.target);
		this.removedInitialPage = false;
		this.itemMoved = false;
		this.initialPageNumber = this.currentPageNumber = this.pageForRow(event.rowIndex);
		this.prevScrollTop = this.getScrollTop();

		// fill row being reordered with placeholder
		this.replaceNodeWithPlaceholder(event.rowIndex);
	},

	/**
	* Fills reorder container with draggable reorder components defined by the
	* application.
	*
	* @private
	*/
	buildReorderContainer: function () {
		this.$.reorderContainer.destroyClientControls();
		for (var i=0;i<this.reorderComponents.length;i++) {
			this.$.reorderContainer.createComponent(this.reorderComponents[i], {owner:this.owner});
		}
		this.$.reorderContainer.render();
	},

	/**
	* Prepares floating reorder container.
	*
	* @param {Object} e - Event object.
	* @private
	*/
	styleReorderContainer: function (e) {
		this.setItemPosition(this.$.reorderContainer, e.rowIndex);
		this.setItemBounds(this.$.reorderContainer, e.rowIndex);
		this.$.reorderContainer.setShowing(true);
		if (this.centerReorderContainer) {
			this.centerReorderContainerOnPointer(e);
		}
	},

	/**
	* Copies the innerHTML of `node` into a new component inside of
	* `reorderContainer`.
	*
	* @param {Node} node - The source node.
	* @private
	*/
	appendNodeToReorderContainer: function (node) {
		this.$.reorderContainer.createComponent({allowHtml: true, content: node.innerHTML}).render();
	},

	/**
	* Centers the floating reorder container on the user's pointer.
	*
	* @param {Object} e - Event object.
	* @private
	*/
	centerReorderContainerOnPointer: function (e) {
		var containerPosition = dom.calcNodePosition(this.hasNode());
		var bounds = this.$.reorderContainer.getBounds();
		var x = e.pageX - containerPosition.left - parseInt(bounds.width, 10)/2;
		var y = e.pageY - containerPosition.top + this.getScrollTop() - parseInt(bounds.height, 10)/2;
		if (this.getStrategyKind() != 'ScrollStrategy') {
			x -= this.getScrollLeft();
			y -= this.getScrollTop();
		}
		this.positionReorderContainer(x, y);
	},

	/**
	* Moves the reorder container to the specified `x` and `y` coordinates.
	* Animates and kicks off timer to turn off animation.
	*
	* @param {Number} x - The `left` position.
	* @param {Number} y - The `top` position.
	* @private
	*/
	positionReorderContainer: function (x,y) {
		this.$.reorderContainer.addClass('enyo-animatedTopAndLeft');
		this.$.reorderContainer.addStyles('left:'+x+'px;top:'+y+'px;');
		this.setPositionReorderContainerTimeout();
	},

	/**
	* Sets a timeout to remove animation class from reorder container.
	*
	* @private
	*/
	setPositionReorderContainerTimeout: function () {
		this.clearPositionReorderContainerTimeout();
		this.positionReorderContainerTimeout = setTimeout(this.bindSafely(
			function () {
				this.$.reorderContainer.removeClass('enyo-animatedTopAndLeft');
				this.clearPositionReorderContainerTimeout();
			}), 100);
	},

	/**
	* @private
	*/
	clearPositionReorderContainerTimeout: function () {
		if (this.positionReorderContainerTimeout) {
			clearTimeout(this.positionReorderContainerTimeout);
			this.positionReorderContainerTimeout = null;
		}
	},

	/**
	* Determines whether we should handle the drag event.
	*
	* @private
	*/
	shouldDoReorderDrag: function () {
		if (!this.getReorderable() || this.draggingRowIndex < 0 || this.pinnedReorderMode) {
			return false;
		}
		return true;
	},

	/**
	* Handles the drag event as a reorder drag.
	*
	* @private
	*/
	reorderDrag: function (event) {
		// position reorder node under mouse/pointer
		this.positionReorderNode(event);

		// determine if we need to auto-scroll the list
		this.checkForAutoScroll(event);

		// if the current index the user is dragging over has changed, move the placeholder
		this.updatePlaceholderPosition(event.pageY);
	},

	/**
	* Determines the row index at `pageY` (if it exists) and moves the placeholder
	* to that index.
	*
	* @param {Number} pageY - Position from top in pixels.
	* @private
	*/
	updatePlaceholderPosition: function (pageY) {
		var index = this.getRowIndexFromCoordinate(pageY);
		if (index !== -1) {
			// cursor moved over a new row, so determine direction of movement
			if (index >= this.placeholderRowIndex) {
				this.movePlaceholderToIndex(Math.min(this.count, index + 1));
			}
			else {
				this.movePlaceholderToIndex(index);
			}
		}
	},

	/**
	* Positions the reorder node based on the `dx` and `dy` of the drag event.
	*
	* @private
	*/
	positionReorderNode: function (e) {
		var reorderNodeBounds = this.$.reorderContainer.getBounds();
		var left = reorderNodeBounds.left + e.ddx;
		var top = reorderNodeBounds.top + e.ddy;
		top = (this.getStrategyKind() == 'ScrollStrategy') ? top + (this.getScrollTop() - this.prevScrollTop) : top;
		this.$.reorderContainer.addStyles('top: '+top+'px ; left: '+left+'px');
		this.prevScrollTop = this.getScrollTop();
	},

	/**
	* Checks whether the list should scroll when dragging and, if so, starts the
	* scroll timeout timer. Auto-scrolling happens when the user drags an item
	* within the top/bottom boundary percentage defined in
	* [dragToScrollThreshold]{@link module:layout/List~List#dragToScrollThreshold}.
	*
	* @param {Object} event - Drag event.
	* @private
	*/
	checkForAutoScroll: function (event) {
		var position = dom.calcNodePosition(this.hasNode());
		var bounds = this.getBounds();
		var perc;
		this.autoscrollPageY = event.pageY;
		if (event.pageY - position.top < bounds.height * this.dragToScrollThreshold) {
			perc = 100*(1 - ((event.pageY - position.top) / (bounds.height * this.dragToScrollThreshold)));
			this.scrollDistance = -1*perc;
		} else if (event.pageY - position.top > bounds.height * (1 - this.dragToScrollThreshold)) {
			perc = 100*((event.pageY - position.top - bounds.height*(1 - this.dragToScrollThreshold)) / (bounds.height - (bounds.height * (1 - this.dragToScrollThreshold))));
			this.scrollDistance = 1*perc;
		} else {
			this.scrollDistance = 0;
		}
		// stop scrolling if distance is zero (i.e., user isn't scrolling to the edges of
		// the list); otherwise, start it if not already started
		if (this.scrollDistance === 0) {
			this.stopAutoScrolling();
		} else {
			if (!this.autoScrollTimeout) {
				this.startAutoScrolling();
			}
		}
	},

	/**
	* Stops auto-scrolling.
	*
	* @private
	*/
	stopAutoScrolling: function () {
		if (this.autoScrollTimeout) {
			clearTimeout(this.autoScrollTimeout);
			this.autoScrollTimeout = null;
		}
	},

	/**
	* Starts auto-scrolling.
	*
	* @private
	*/
	startAutoScrolling: function () {
		this.autoScrollTimeout = setInterval(this.bindSafely(this.autoScroll), this.autoScrollTimeoutMS);
	},

	/**
	* Scrolls the list by the distance specified in
	* [scrollDistance]{@link module:layout/List~List#scrollDistance}.
	*
	* @private
	*/
	autoScroll: function () {
		if (this.scrollDistance === 0) {
			this.stopAutoScrolling();
		} else {
			if (!this.autoScrollTimeout) {
				this.startAutoScrolling();
			}
		}
		this.setScrollPosition(this.getScrollPosition() + this.scrollDistance);
		this.positionReorderNode({ddx: 0, ddy: 0});

		// if the current index the user is dragging over has changed, move the placeholder
		this.updatePlaceholderPosition(this.autoscrollPageY);
	},

	/**
	* Moves the placeholder (i.e., the gap between rows) to the row currently
	* under the user's pointer. This provides a visual cue, showing the user
	* where the item being dragged will go if it is dropped.
	*
	* @param {Number} index - The row index.
	*/
	movePlaceholderToIndex: function (index) {
		var node, nodeParent;
		if (index < 0) {
			return;
		}
		else if (index >= this.count) {
			node = null;
			nodeParent = this.pageForPageNumber(this.pageForRow(this.count - 1)).hasNode();
		}
		else {
			node = this.$.generator.fetchRowNode(index);
			nodeParent = node.parentNode;
		}
		// figure next page for placeholder
		var nextPageNumber = this.pageForRow(index);

		// don't add pages beyond the original page count
		if (nextPageNumber >= this.pageCount) {
			nextPageNumber = this.currentPageNumber;
		}

		// move the placeholder to just after our 'index' node
		nodeParent.insertBefore(
			this.placeholderNode,
			node);

		if (this.currentPageNumber !== nextPageNumber) {
			// if moving to different page, recalculate page sizes and reposition pages
			this.updatePageSize(this.currentPageNumber);
			this.updatePageSize(nextPageNumber);
			this.updatePagePositions(nextPageNumber);
		}

		// save updated state
		this.placeholderRowIndex = index;
		this.currentPageNumber = nextPageNumber;

		// remember that we moved an item (to prevent pinning at the wrong time)
		this.itemMoved = true;
	},

	/**
	* Turns off reordering. If the user didn't drag the item being reordered
	* outside of its original position, enters pinned reorder mode.
	*
	* @private
	*/
	finishReordering: function (sender, event) {
		if (!this.isReordering() || this.pinnedReorderMode || this.completeReorderTimeout) {
			return;
		}
		this.stopAutoScrolling();
		// enable drag-scrolling on strategy
		this.$.strategy.listReordering = false;
		// animate reorder container to proper position and then complete
		// reordering actions
		this.moveReorderedContainerToDroppedPosition(event);
		this.completeReorderTimeout = setTimeout(
			this.bindSafely(this.completeFinishReordering, event), 100);

		event.preventDefault();
		return true;
	},

	/**
	* @private
	*/
	moveReorderedContainerToDroppedPosition: function () {
		var offset = this.getRelativeOffset(this.placeholderNode, this.hasNode());
		var top = (this.getStrategyKind() == 'ScrollStrategy') ? offset.top : offset.top - this.getScrollTop();
		var left = offset.left - this.getScrollLeft();
		this.positionReorderContainer(left, top);
	},

	/**
	* After the reordered item has been animated to its position, completes
	* the reordering logic.
	*
	* @private
	*/
	completeFinishReordering: function (event) {
		this.completeReorderTimeout = null;
		// adjust placeholderRowIndex to now be the final resting place
		if (this.placeholderRowIndex > this.draggingRowIndex) {
			this.placeholderRowIndex = Math.max(0, this.placeholderRowIndex - 1);
		}
		// if the user dropped the item in the same location where it was picked up, and they
		// didn't move any other items in the process, pin the item and go into pinned reorder mode
		if (this.draggingRowIndex == this.placeholderRowIndex &&
			this.pinnedReorderComponents.length && !this.pinnedReorderMode && !this.itemMoved) {
			this.beginPinnedReorder(event);
			return;
		}
		this.removeDraggingRowNode();
		this.removePlaceholderNode();
		this.emptyAndHideReorderContainer();
		// clear this early to prevent scroller code from using disappeared placeholder
		this.pinnedReorderMode = false;
		this.reorderRows(event);
		this.draggingRowIndex = this.placeholderRowIndex = -1;
		this.refresh();
	},

	/**
	* Enters pinned reorder mode.
	*
	* @fires module:layout/List~List#onSetupPinnedReorderComponents
	* @private
	*/
	beginPinnedReorder: function (event) {
		this.buildPinnedReorderContainer();
		this.doSetupPinnedReorderComponents(utils.mixin(event, {index: this.draggingRowIndex}));
		this.pinnedReorderMode = true;
		this.initialPinPosition = event.pageY;
	},

	/**
	* Clears contents of reorder container, then hides.
	*
	* @private
	*/
	emptyAndHideReorderContainer: function () {
		this.$.reorderContainer.destroyComponents();
		this.$.reorderContainer.setShowing(false);
	},

	/**
	* Fills reorder container with pinned controls.
	*
	* @private
	*/
	buildPinnedReorderContainer: function () {
		this.$.reorderContainer.destroyClientControls();
		for (var i=0;i<this.pinnedReorderComponents.length;i++) {
			this.$.reorderContainer.createComponent(this.pinnedReorderComponents[i], {owner:this.owner});
		}
		this.$.reorderContainer.render();
	},

	/**
	* Swaps the rows that were reordered, and sends up reorder event.
	*
	* @fires module:layout/List~List#onReorder
	* @private
	*/
	reorderRows: function (event) {
		// send reorder event
		this.doReorder(this.makeReorderEvent(event));
		// update display
		this.positionReorderedNode();
		// fix indices for reordered rows
		this.updateListIndices();
	},

	/**
	* Adds `reorderTo` and `reorderFrom` properties to the reorder event.
	*
	* @private
	*/
	makeReorderEvent: function (event) {
		event.reorderFrom = this.draggingRowIndex;
		event.reorderTo = this.placeholderRowIndex;
		return event;
	},

	/**
	* Moves the node being reordered to its new position and shows it.
	*
	* @private
	*/
	positionReorderedNode: function () {
		// only do this if the page with the initial item is still rendered
		if (!this.removedInitialPage) {
			var insertNode = this.$.generator.fetchRowNode(this.placeholderRowIndex);
			if (insertNode) {
				insertNode.parentNode.insertBefore(this.hiddenNode, insertNode);
				this.showNode(this.hiddenNode);
			}
			this.hiddenNode = null;
			if (this.currentPageNumber != this.initialPageNumber) {
				var mover, movee;
				var currentPage = this.pageForPageNumber(this.currentPageNumber);
				var otherPage = this.pageForPageNumber(this.currentPageNumber + 1);
				// if moved down, move current page's firstChild to the end of previous page
				if (this.initialPageNumber < this.currentPageNumber) {
					mover = currentPage.hasNode().firstChild;
					otherPage.hasNode().appendChild(mover);
				// if moved up, move current page's lastChild before previous page's firstChild
				} else {
					mover = currentPage.hasNode().lastChild;
					movee = otherPage.hasNode().firstChild;
					otherPage.hasNode().insertBefore(mover, movee);
				}
				this.correctPageSizes();
				this.updatePagePositions(this.initialPageNumber);
			}
		}
	},

	/**
	* Updates indices of list items as needed to preserve reordering.
	*
	* @private
	*/
	updateListIndices: function () {
		// don't do update if we've moved further than one page, refresh instead
		if (this.shouldDoRefresh()) {
			this.refresh();
			this.correctPageSizes();
			return;
		}

		var from = Math.min(this.draggingRowIndex, this.placeholderRowIndex);
		var to = Math.max(this.draggingRowIndex, this.placeholderRowIndex);
		var direction = (this.draggingRowIndex - this.placeholderRowIndex > 0) ? 1 : -1;
		var node, i, newIndex, currentIndex;

		if (direction === 1) {
			node = this.$.generator.fetchRowNode(this.draggingRowIndex);
			if (node) {
				node.setAttribute('data-enyo-index', 'reordered');
			}
			for (i=(to-1),newIndex=to;i>=from;i--) {
				node = this.$.generator.fetchRowNode(i);
				if (!node) {
					continue;
				}
				currentIndex = parseInt(node.getAttribute('data-enyo-index'), 10);
				newIndex = currentIndex + 1;
				node.setAttribute('data-enyo-index', newIndex);
			}
			node = this.hasNode().querySelector('[data-enyo-index="reordered"]');
			node.setAttribute('data-enyo-index', this.placeholderRowIndex);

		} else {
			node = this.$.generator.fetchRowNode(this.draggingRowIndex);
			if (node) {
				node.setAttribute('data-enyo-index', this.placeholderRowIndex);
			}
			for (i=(from+1), newIndex=from;i<=to;i++) {
				node = this.$.generator.fetchRowNode(i);
				if (!node) {
					continue;
				}
				currentIndex = parseInt(node.getAttribute('data-enyo-index'), 10);
				newIndex = currentIndex - 1;
				node.setAttribute('data-enyo-index', newIndex);
			}
		}
	},

	/**
	* Determines whether an item was reordered far enough that it warrants a refresh.
	*
	* @private
	*/
	shouldDoRefresh: function () {
		return (Math.abs(this.initialPageNumber - this.currentPageNumber) > 1);
	},

	/**
	* Gets node height, width, top, and left values.
	*
	* @private
	*/
	getNodeStyle: function (index) {
		var node = this.$.generator.fetchRowNode(index);
		if (!node) {
			return;
		}
		var offset = this.getRelativeOffset(node, this.hasNode());
		var dimensions = dom.getBounds(node);
		return {h: dimensions.height, w: dimensions.width, left: offset.left, top: offset.top};
	},

	/**
	* Gets offset relative to a positioned ancestor node.
	*
	* @private
	*/
	getRelativeOffset: function (n, p) {
		var ro = {top: 0, left: 0};
		if (n !== p && n.parentNode) {
			do {
				ro.top += n.offsetTop || 0;
				ro.left += n.offsetLeft || 0;
				n = n.offsetParent;
			} while (n && n !== p);
		}
		return ro;
	},

	/**
	* Hides the DOM node for the row at `index` and inserts the placeholder node before it.
	*
	* @param {Number} index - The index of the row whose DOM node will be hidden.
	* @private
	*/
	replaceNodeWithPlaceholder: function (index) {
		var node = this.$.generator.fetchRowNode(index);
		if (!node) {
			logger.log('No node - ' + index);
			return;
		}
		// create and style placeholder node
		this.placeholderNode = this.createPlaceholderNode(node);
		// hide existing node
		this.hiddenNode = this.hideNode(node);
		// insert placeholder node where original node was
		var currentPage = this.pageForPageNumber(this.currentPageNumber);
		currentPage.hasNode().insertBefore(this.placeholderNode, this.hiddenNode);
	},

	/**
	* Creates and returns a placeholder node with dimensions matching those of
	* the passed-in node.
	*
	* @param {Node} node - Node on which to base the placeholder dimensions.
	* @private
	*/
	createPlaceholderNode: function (node) {
		var placeholderNode = this.$.placeholder.hasNode().cloneNode(true);
		var nodeDimensions = dom.getBounds(node);
		placeholderNode.style.height = nodeDimensions.height + 'px';
		placeholderNode.style.width = nodeDimensions.width + 'px';
		return placeholderNode;
	},

	/**
	* Removes the placeholder node from the DOM.
	*
	* @private
	*/
	removePlaceholderNode: function () {
		this.removeNode(this.placeholderNode);
		this.placeholderNode = null;
	},

	/**
	* Removes the passed-in node from the DOM.
	*
	* @private
	*/
	removeNode: function (node) {
		if (!node || !node.parentNode) {
			return;
		}
		node.parentNode.removeChild(node);
	},

	/**
	* Updates `this.pageSizes` to support the placeholder node's jumping
	* from one page to the next.
	*
	* @param {Number} pageNumber
	* @private
	*/
	updatePageSize: function (pageNumber) {
		if (pageNumber < 0) {
			return;
		}
		var pageControl = this.pageForPageNumber(pageNumber, true);
		if (pageControl) {
			var s0 = this.pageSizes[pageNumber];
			// FIXME: use height/width depending on orientation
			var pageSize = Math.max(1, pageControl.getBounds().height);
			this.pageSizes[pageNumber] = pageSize;
			this.portSize += pageSize - s0;
		}
	},

	/**
	* Repositions [currentPageNumber]{@link module:layout/List~List#currentPageNumber} and
	* `nextPageNumber` pages to support the placeholder node's jumping from one
	* page to the next.
	*
	* @param {Number} nextPageNumber [description]
	* @private
	*/
	updatePagePositions: function (nextPageNumber) {
		this.positionPage(this.currentPageNumber, this.pageForPageNumber(this.currentPageNumber));
		this.positionPage(nextPageNumber, this.pageForPageNumber(nextPageNumber));
	},

	/**
	* Corrects page sizes array after reorder is complete.
	*
	* @private
	*/
	correctPageSizes: function () {
		var initPageNumber = this.initialPageNumber%2;
		this.updatePageSize(this.currentPageNumber, this.$['page'+this.currentPage]);
		if (initPageNumber != this.currentPageNumber) {
			this.updatePageSize(this.initialPageNumber, this.$['page'+initPageNumber]);
		}
	},

	/**
	* Hides a DOM node.
	*
	* @private
	*/
	hideNode: function (node) {
		node.style.display = 'none';
		return node;
	},

	/**
	* Shows a DOM node.
	*
	* @private
	*/
	showNode: function (node) {
		node.style.display = 'block';
		return node;
	},

	/**
	* Called by client code to finalize a pinned mode reordering, e.g., when the "Drop"
	* button is pressed on the pinned placeholder row.
	*
	* @todo Seems incorrect to have an event on the signature for a public API
	* @param {Object} event - A mouse/touch event.
	* @public
	*/
	dropPinnedRow: function (event) {
		// animate reorder container to proper position and then complete reording actions
		this.moveReorderedContainerToDroppedPosition(event);
		this.completeReorderTimeout = setTimeout(
			this.bindSafely(this.completeFinishReordering, event), 100);
		return;
	},

	/**
	* Called by client code to cancel a pinned mode reordering.
	*
	* @todo Seems incorrect to have an event on the signature for a public API
	* @param {Object} event - A mouse/touch event.
	* @public
	*/
	cancelPinnedMode: function (event) {
		// make it look like we're dropping in original location
		this.placeholderRowIndex = this.draggingRowIndex;
		this.dropPinnedRow(event);
	},

	/**
	* Returns the row index that is under the given `y`-position on the page.  If the
	* position is off the end of the list, `this.count` is returned. If the position
	* is before the start of the list, `-1` is returned.
	*
	* @param {Number} y - `y` position in pixels in relation to the page.
	* @return {Number}  - The index of the row at the specified position.
	* @private
	*/
	getRowIndexFromCoordinate: function (y) {
		// FIXME: this code only works with vertical lists
		var cursorPosition = this.getScrollTop() + y - dom.calcNodePosition(this.hasNode()).top;
		// happens if we try to drag past top of list
		if (cursorPosition < 0) {
			return -1;
		}
		var pageInfo = this.positionToPageInfo(cursorPosition);
		var rows = (pageInfo.no == this.p0) ? this.p0RowBounds : this.p1RowBounds;
		// might have only rendered one page, so catch that here
		if (!rows) {
			return this.count;
		}
		var posOnPage = pageInfo.pos;
		var placeholderHeight = this.placeholderNode ? dom.getBounds(this.placeholderNode).height : 0;
		var totalHeight = 0;
		for (var i=pageInfo.startRow; i <= pageInfo.endRow; ++i) {
			// do extra check for row that has placeholder as we'll return -1 here for no match
			if (i === this.placeholderRowIndex) {
				// for placeholder
				totalHeight += placeholderHeight;
				if (totalHeight >= posOnPage) {
					return -1;
				}
			}
			// originally dragged row is hidden, so don't count it
			if (i !== this.draggingRowIndex) {
				totalHeight += rows[i].height;
				if (totalHeight >= posOnPage) {
					return i;
				}
			}
		}
		return i;
	},

	/**
	* Gets the position of a node (identified via index) on the page.
	*
	* @return {Object} The position of the row node.
	* @private
	*/
	getIndexPosition: function (index) {
		return dom.calcNodePosition(this.$.generator.fetchRowNode(index));
	},

	/**
	* Sets the specified control's position to match that of the list row at `index`.
	*
	* @param {module:enyo/Control~Control} item - The control to reposition.
	* @param {Number} index      - The index of the row whose position is to be matched.
	* @private
	*/
	setItemPosition: function (item, index) {
		var clonedNodeStyle = this.getNodeStyle(index);
		var top = (this.getStrategyKind() == 'ScrollStrategy') ? clonedNodeStyle.top : clonedNodeStyle.top - this.getScrollTop();
		var styleStr = 'top:'+top+'px; left:'+clonedNodeStyle.left+'px;';
		item.addStyles(styleStr);
	},

	/**
	* Sets the specified control's width and height to match those of the list row at `index`.
	*
	* @param {module:enyo/Control~Control} item - The control to reposition.
	* @param {Number} index      - The index of the row whose width and height are to be matched.
	* @private
	*/
	setItemBounds: function (item, index) {
		var clonedNodeStyle = this.getNodeStyle(index);
		var styleStr = 'width:'+clonedNodeStyle.w+'px; height:'+clonedNodeStyle.h+'px;';
		item.addStyles(styleStr);
	},

	/**
	* When in pinned reorder mode, repositions the pinned placeholder when the
	* user has scrolled far enough.
	*
	* @private
	*/
	reorderScroll: function (sender, e) {
		// if we are using the standard scroll strategy, we have to move the pinned row with the scrolling
		if (this.getStrategyKind() == 'ScrollStrategy') {
			this.$.reorderContainer.addStyles('top:'+(this.initialPinPosition+this.getScrollTop()-this.rowSize)+'px;');
		}
		// y coordinate on screen of the pinned item doesn't change as we scroll things
		this.updatePlaceholderPosition(this.initialPinPosition);
	},

	/**
	* @private
	*/
	hideReorderingRow: function () {
		var hiddenNode = this.hasNode().querySelector('[data-enyo-index="' + this.draggingRowIndex + '"]');
		// hide existing node
		if (hiddenNode) {
			this.hiddenNode = this.hideNode(hiddenNode);
		}
	},

	/**
	* @private
	*/
	isReordering: function () {
		return (this.draggingRowIndex > -1);
	},

	/**
		---- Swipeable functionality ------------
	*/

	/**
	* @private
	*/
	isSwiping: function () {
		// we're swiping when the index is set and we're not in the middle of completing or backing out a swipe
		return (this.swipeIndex != null && !this.swipeComplete && this.swipeDirection != null);
	},

	/**
	* When a drag starts, gets the direction of the drag as well as the index
	* of the item being dragged, and resets any pertinent values. Then kicks
	* off the swipe sequence.
	*
	* @private
	*/
	swipeDragStart: function (sender, event) {
		// if we're not on a row or the swipe is vertical or if we're in the middle of reordering, just say no
		if (event.index == null || event.vertical) {
			return true;
		}

		// if we are waiting to complete a swipe, complete it
		if (this.completeSwipeTimeout) {
			this.completeSwipe(event);
		}

		// reset swipe complete flag
		this.swipeComplete = false;

		if (this.swipeIndex != event.index) {
			this.clearSwipeables();
			this.swipeIndex = event.index;
		}
		this.swipeDirection = event.xDirection;

		// start swipe sequence only if we are not currently showing a persistent item
		if (!this.persistentItemVisible) {
			this.startSwipe(event);
		}

		// reset dragged distance (for dragfinish)
		this.draggedXDistance = 0;
		this.draggedYDistance = 0;

		return true;
	},

	/**
	* When a drag is in progress, updates the position of the swipeable
	* container based on the `ddx` of the event.
	*
	* @private
	*/
	swipeDrag: function (sender, event) {
		// if a persistent swipeableItem is still showing, handle it separately
		if (this.persistentItemVisible) {
			this.dragPersistentItem(event);
			return this.preventDragPropagation;
		}
		// early exit if there's no matching dragStart to set item
		if (!this.isSwiping()) {
			return false;
		}
		// apply new position
		this.dragSwipeableComponents(this.calcNewDragPosition(event.ddx));
		// save dragged distance (for dragfinish)
		this.draggedXDistance = event.dx;
		this.draggedYDistance = event.dy;
		// save last meaningful (non-zero) and new direction (for swipeDragFinish)
		if (event.xDirection != this.lastSwipeDirection && event.xDirection) {
			this.lastSwipeDirection = event.xDirection;
		}
		return true;
	},

	/*
	* When the current drag completes, decides whether to complete the swipe
	* based on how far the user pulled the swipeable container.
	*
	* @private
	*/
	swipeDragFinish: function (sender, event) {
		// if a persistent swipeableItem is still showing, complete drag away or bounce
		if (this.persistentItemVisible) {
			this.dragFinishPersistentItem(event);
		// early exit if there's no matching dragStart to set item
		} else if (!this.isSwiping()) {
			return false;
		// otherwise if user dragged more than 20% of the width, complete the swipe. if not, back out.
		} else {
			var percentageDragged = this.calcPercentageDragged(this.draggedXDistance);
			if ((percentageDragged > this.percentageDraggedThreshold) && (this.lastSwipeDirection === this.swipeDirection)) {
				this.swipe(this.fastSwipeSpeedMS);
			} else {
				this.backOutSwipe(event);
			}
		}

		return this.preventDragPropagation;
	},

	/**
	* Reorder takes precedence over swipes, and not having it turned on or swipeable controls
	* defined also disables this.
	*
	* @private
	*/
	isSwipeable: function () {
		return this.enableSwipe && this.$.swipeableComponents.controls.length !== 0 &&
			!this.isReordering() && !this.pinnedReorderMode;
	},

	/**
	* Positions the swipeable components block at the current row.
	*
	* @param {Number} index      - The row index.
	* @param {Number} xDirection - Value of `xDirection` from drag event (`1` = right,
	* `-1` = left).
	* @private
	*/
	positionSwipeableContainer: function (index, xDirection) {
		var node = this.$.generator.fetchRowNode(index);
		if (!node) {
			return;
		}
		var offset = this.getRelativeOffset(node, this.hasNode());
		var dimensions = dom.getBounds(node);
		var x = (xDirection == 1) ? -1*dimensions.width : dimensions.width;
		this.$.swipeableComponents.addStyles('top: '+offset.top+'px; left: '+x+'px; height: '+dimensions.height+'px; width: '+dimensions.width+'px;');
	},

	/**
	* Calculates new position for the swipeable container based on the user's
	* drag action. Don't allow the container to drag beyond either edge.
	*
	* @param {Number} dx - Amount of change in `x` position.
	* @return {Number}
	* @private
	*/
	calcNewDragPosition: function (dx) {
		var parentBounds = this.$.swipeableComponents.getBounds();
		var xPos = parentBounds.left;
		var dimensions = this.$.swipeableComponents.getBounds();
		var xlimit = (this.swipeDirection == 1) ? 0 : -1*dimensions.width;
		var x = (this.swipeDirection == 1)
			? (xPos + dx > xlimit)
				? xlimit
				: xPos + dx
			: (xPos + dx < xlimit)
				? xlimit
				: xPos + dx;
		return x;
	},

	/**
	* Positions the swipeable components.
	*
	* @param {Number} x - New `left` position.
	* @private
	*/
	dragSwipeableComponents: function (x) {
		this.$.swipeableComponents.applyStyle('left',x+'px');
	},

	/**
	* Begins swiping sequence by positioning the swipeable container and
	* bubbling the `setupSwipeItem` event.
	*
	* @param {Object} e - Event
	* @fires module:layout/List~List#onSetupSwipeItem
	* @private
	*/
	startSwipe: function (e) {
		// modify event index to always have this swipeItem value
		e.index = this.swipeIndex;
		this.positionSwipeableContainer(this.swipeIndex, e.xDirection);
		this.$.swipeableComponents.setShowing(true);
		this.setPersistentItemOrigin(e.xDirection);
		this.doSetupSwipeItem(e);
	},

	/**
	* If a persistent swipeableItem is still showing, drags it away or bounces it.
	*
	* @param {Object} e - Event
	* @private
	*/
	dragPersistentItem: function (e) {
		var xPos = 0;
		var x = (this.persistentItemOrigin == 'right')
			? Math.max(xPos, (xPos + e.dx))
			: Math.min(xPos, (xPos + e.dx));
		this.$.swipeableComponents.applyStyle('left',x+'px');
	},

	/**
	* If a persistent swipeableItem is still showing, completes drag away or bounce.
	*
	* @param {Object} e - Event
	* @private
	*/
	dragFinishPersistentItem: function (e) {
		var completeSwipe = (this.calcPercentageDragged(e.dx) > 0.2);
		var dir = (e.dx > 0) ? 'right' : (e.dx < 0) ? 'left' : null;
		if (this.persistentItemOrigin == dir) {
			if (completeSwipe) {
				this.slideAwayItem();
			} else {
				this.bounceItem(e);
			}
		} else {
			this.bounceItem(e);
		}
	},

	/**
	* @private
	*/
	setPersistentItemOrigin: function (xDirection) {
		this.persistentItemOrigin = xDirection == 1 ? 'left' : 'right';
	},

	/**
	* @private
	*/
	calcPercentageDragged: function (dx) {
		return Math.abs(dx/this.$.swipeableComponents.getBounds().width);
	},

	/**
	* Completes a swipe animation in the specified number of milliseconds.
	*
	* @param {Number} speed - Time in milliseconds.
	* @private
	*/
	swipe: function (speed) {
		this.swipeComplete = true;
		this.animateSwipe(0, speed);
	},

	/**
	* @private
	*/
	backOutSwipe: function () {
		var dimensions = this.$.swipeableComponents.getBounds();
		var x = (this.swipeDirection == 1) ? -1*dimensions.width : dimensions.width;
		this.animateSwipe(x, this.fastSwipeSpeedMS);
		this.swipeDirection = null;
	},

	/**
	* Returns persisted swipeable components to being visible if not dragged back
	* beyond threshold.
	*
	* @private
	*/
	bounceItem: function () {
		var bounds = this.$.swipeableComponents.getBounds();
		if (bounds.left != bounds.width) {
			this.animateSwipe(0, this.normalSwipeSpeedMS);
		}
	},

	/**
	* Animates the swipeable components away starting from their current position.
	*
	* @private
	*/
	slideAwayItem: function () {
		var $item = this.$.swipeableComponents;
		var parentWidth = $item.getBounds().width;
		var xPos = (this.persistentItemOrigin == 'left') ? -1*parentWidth : parentWidth;
		this.animateSwipe(xPos, this.normalSwipeSpeedMS);
		this.persistentItemVisible = false;
		this.setPersistSwipeableItem(false);
	},

	/**
	* Hides the swipeable components.
	*
	* @private
	*/
	clearSwipeables: function () {
		this.$.swipeableComponents.setShowing(false);
		this.persistentItemVisible = false;
		this.setPersistSwipeableItem(false);
	},

	/**
	* Completes swipe and hides active swipeable item.
	*
	* @fires module:layout/List~List#onSwipeComplete
	* @private
	*/
	completeSwipe: function () {
		if (this.completeSwipeTimeout) {
			clearTimeout(this.completeSwipeTimeout);
			this.completeSwipeTimeout = null;
		}
		// if this wasn't a persistent item, hide it upon completion and send swipe complete event
		if (!this.getPersistSwipeableItem()) {
			this.$.swipeableComponents.setShowing(false);
			// if the swipe was completed, update the current row and bubble swipeComplete event
			if (this.swipeComplete) {
				this.doSwipeComplete({index: this.swipeIndex, xDirection: this.swipeDirection});
			}
		} else {
			// persistent item will only be visible if the swipe was completed
			if (this.swipeComplete) {
				this.persistentItemVisible = true;
			}
		}
		this.swipeIndex = null;
		this.swipeDirection = null;
	},

	/**
	* Animates a swipe starting from the current position to the specified new
	* position `(targetX)` over the specified length of time `(totalTimeMS)`.
	*
	* @param {Number} targetX     - The target `left` position.
	* @param {Number} totalTimeMS - Time in milliseconds.
	* @private
	*/
	animateSwipe: function (targetX, totalTimeMS) {
		var t0 = utils.now();
		var $item = this.$.swipeableComponents;
		var origX = parseInt($item.getBounds().left, 10);
		var xDelta = targetX - origX;

		this.stopAnimateSwipe();

		var fn = this.bindSafely(function () {
			var t = utils.now() - t0;
			var percTimeElapsed = t/totalTimeMS;
			var currentX = origX + (xDelta)*Math.min(percTimeElapsed,1);

			// set new left
			$item.applyStyle('left', currentX+'px');

			// schedule next frame
			this.job = animation.requestAnimationFrame(fn);

			// potentially override animation TODO

			// go until we've hit our total time
			if (t/totalTimeMS >= 1) {
				this.stopAnimateSwipe();
				this.completeSwipeTimeout = setTimeout(this.bindSafely(function () {
					this.completeSwipe();
				}), this.completeSwipeDelayMS);
			}
		});

		this.job = animation.requestAnimationFrame(fn);
	},

	/**
	* Cancels the active swipe animation.
	*
	* @private
	*/
	stopAnimateSwipe: function () {
		if (this.job) {
			this.job = animation.cancelAnimationFrame(this.job);
		}
	}
};

}],'layout/ContextualLayout':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/ContextualLayout~ContextualLayout} kind.
* @module layout/ContextualLayout
*/

var
    kind = require('enyo/kind'),
    Layout = require('enyo/Layout');

/**
* {@link module:layout/ContextualLayout~ContextualLayout} provides the base
* positioning logic for a contextual layout strategy. This layout strategy is
* intended for use with a popup in a decorator/activator scenario, in which the
* popup is positioned relative to the activator, e.g.:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		ContextualPopup = require('onyx/ContextualPopup'),
* 		ContextualPopupDecorator = require('onyx/ContextualPopupDecorator');
*
* 	{kind: ContextualPopupDecorator, components: [
* 		{content: 'Show Popup'},
* 		{kind: ContextualPopup,
* 			title: 'Sample Popup',
* 			actionButtons: [
* 				{content: 'Button 1', classes: 'onyx-button-warning'},
* 				{content: 'Button 2'}
* 			],
* 			components: [
* 				{content: 'Sample component in popup'}
* 			]
* 		}
* 	]}
* ```
*
* The decorator contains the popup and activator, with the activator being the
* first child component (i.e., the "Show Popup" button). The contextual layout
* strategy is applied because, in the definition of `onyx/ContextualPopup`,
* its `layoutKind` property is set to `onyx/ContextualLayout`.
*
* Note that a popup using ContextualLayout as its `layoutKind` is expected to
* declare several specific properties:
*
* - `vertFlushMargin` - The vertical flush layout margin, i.e., how close the
* popup's edge may come to the vertical screen edge (in pixels) before
* being laid out "flush" style.
* - `horizFlushMargin` - The horizontal flush layout margin, i.e., how close
* the popup's edge may come to the horizontal screen edge (in pixels)
* before being laid out "flush" style.
* - `widePopup` - A popup wider than this value (in pixels) is considered wide
* for layout calculation purposes.
* - `longPopup` - A popup longer than this value (in pixels) is considered long
* for layout calculation purposes.
* - `horizBuffer` - Horizontal flush popups are not allowed within this buffer
* area (in pixels) on the left or right screen edge.
* - `activatorOffset` - The popup activator's offset on the page (in pixels);
* this should be calculated whenever the popup is to be shown.
*
* @class ContextualLayout
* @extends module:enyo/Layout~Layout
* @public
*/

module.exports = kind(
    /** @lends module:layout/ContextualLayout~ContextualLayout.prototype */ {

    /**
    * @private
    */
    name: 'enyo.ContextualLayout',

    /**
	* @private
	*/
    kind: Layout,

    /**
    * Adjusts the popup's position, as well as the nub location and direction.
    *
    * @public
    */
    adjustPosition: function () {
        if (this.container.showing && this.container.hasNode()) {
            /****ContextualPopup positioning rules:
                1. Activator Location:
                    a. If activator is located in a corner then position using a flush style.
                        i.  Attempt vertical first.
                        ii. Horizontal if vertical doesn't fit.
                    b. If not in a corner then check if the activator is located in one of the 4 "edges" of the view & position the
                        following way if so:
                        i.   Activator is in top edge, position popup below it.
                        ii.  Activator is in bottom edge, position popup above it.
                        iii. Activator is in left edge, position popup to the right of it.
                        iv.  Activator is in right edge, position popup to the left of it.

                2. Screen Size - the pop-up should generally extend in the direction where there’s room for it.
                    Note: no specific logic below for this rule since it is built into the positioning functions, ie we attempt to never
                    position a popup where there isn't enough room for it.

                3. Popup Size:
                    i.  If popup content is wide, use top or bottom positioning.
                    ii. If popup content is long, use horizontal positioning.

                4. Favor top or bottom:
                    If all the above rules have been followed and location can still vary then favor top or bottom positioning.

                5. If top or bottom will work, favor bottom.
                    Note: no specific logic below for this rule since it is built into the vertical position functions, ie we attempt to
                    use a bottom position for the popup as much possible. Additionally within the vetical position function we center the
                    popup if the activator is at the vertical center of the view.
            ****/
            this.resetPositioning();
            var innerWidth = this.getViewWidth();
            var innerHeight = this.getViewHeight();

            //These are the view "flush boundaries"
            var topFlushPt = this.container.vertFlushMargin;
            var bottomFlushPt = innerHeight - this.container.vertFlushMargin;
            var leftFlushPt = this.container.horizFlushMargin;
            var rightFlushPt = innerWidth - this.container.horizFlushMargin;

            //Rule 1 - Activator Location based positioning
            //if the activator is in the top or bottom edges of the view, check if the popup needs flush positioning
            if ((this.offset.top + this.offset.height) < topFlushPt || this.offset.top > bottomFlushPt) {
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
            } else if ((this.offset.left + this.offset.width) < leftFlushPt || this.offset.left > rightFlushPt) {
                //if flush positioning didn't work then try just positioning horizontally (rule 1.b.iii & rule 1.b.iv)
                if (this.applyHorizontalPositioning()){
                    return;
                }
            }

            //Rule 2 - no specific logic below for this rule since it is inheritent to the positioning functions, ie we attempt to never
            //position a popup where there isn't enough room for it.

            //Rule 3 - Popup Size based positioning
            var clientRect = this.getBoundingRect(this.container.node);

            //if the popup is wide then use vertical positioning
            if (clientRect.width > this.container.widePopup) {
                if (this.applyVerticalPositioning()){
                    return;
                }
            }
            //if the popup is long then use horizontal positioning
            else if (clientRect.height > this.container.longPopup) {
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
    //

    /**
    * Determines whether the popup will fit onscreen if moved below or above the activator.
    *
    * @return {Boolean} `true` if popup will fit onscreen; otherwise, `false`.
    * @public
    */
    initVerticalPositioning: function () {
        this.resetPositioning();
        this.container.addClass('vertical');

        var clientRect = this.getBoundingRect(this.container.node);
        var innerHeight = this.getViewHeight();

        if (this.container.floating){
            if (this.offset.top < (innerHeight / 2)) {
                this.applyPosition({top: this.offset.top + this.offset.height, bottom: 'auto'});
                this.container.addClass('below');
            } else {
                this.applyPosition({top: this.offset.top - clientRect.height, bottom: 'auto'});
                this.container.addClass('above');
            }
        } else {
            //if the popup's bottom goes off the screen then put it on the top of the invoking control
            if ((clientRect.top + clientRect.height > innerHeight) && ((innerHeight - clientRect.bottom) < (clientRect.top - clientRect.height))){
                this.container.addClass('above');
            } else {
                this.container.addClass('below');
            }
        }

        //if moving the popup above or below the activator puts it past the edge of the screen then vertical doesn't work
        clientRect = this.getBoundingRect(this.container.node);
        if ((clientRect.top + clientRect.height) > innerHeight || clientRect.top < 0){
            return false;
        }

        return true;
    },

    /**
    * Moves the popup below or above the activating control.
    *
    * @return {Boolean} `false` if popup was not moved because it would not fit onscreen
    * in the new position; otherwise, `true`.
    * @public
    */
    applyVerticalPositioning: function () {
        //if we can't fit the popup above or below the activator then forget vertical positioning
        if (!this.initVerticalPositioning()) {
            return false;
        }

        var clientRect = this.getBoundingRect(this.container.node);
        var innerWidth = this.getViewWidth();

        if (this.container.floating){
            //Get the left edge delta to horizontally center the popup
            var centeredLeft = this.offset.left + this.offset.width/2 - clientRect.width/2;
            if (centeredLeft + clientRect.width > innerWidth) {//popup goes off right edge of the screen if centered
                this.applyPosition({left: this.offset.left + this.offset.width - clientRect.width});
                this.container.addClass('left');
            } else if (centeredLeft < 0) {//popup goes off left edge of the screen if centered
                this.applyPosition({left:this.offset.left});
                this.container.addClass('right');
            } else {//center the popup
                this.applyPosition({left: centeredLeft});
            }

        } else {
            //Get the left edge delta to horizontally center the popup
            var centeredLeftDelta = this.offset.left + this.offset.width/2 - clientRect.left - clientRect.width/2;
            if (clientRect.right + centeredLeftDelta > innerWidth) {//popup goes off right edge of the screen if centered
                this.applyPosition({left: this.offset.left + this.offset.width - clientRect.right});
                this.container.addRemoveClass('left', true);
            } else if (clientRect.left + centeredLeftDelta < 0) {//popup goes off left edge of the screen if centered
                this.container.addRemoveClass('right', true);
            } else {//center the popup
                this.applyPosition({left: centeredLeftDelta});
            }
        }

        return true;
    },

    /**
    * Positions the popup vertically flush with the activating control.
    *
    * @param {Number} leftFlushPt - Left side cutoff.
    * @param {Number} rightFlushPt - Right side cutoff.
    * @return {Boolean} `false` if popup will not fit onscreen in new position;
    * otherwise, `true`.
    * @public
    */
    applyVerticalFlushPositioning: function (leftFlushPt, rightFlushPt) {
        //if we can't fit the popup above or below the activator then forget vertical positioning
        if (!this.initVerticalPositioning()) {
            return false;
        }

        var clientRect = this.getBoundingRect(this.container.node);
        var innerWidth = this.getViewWidth();

        //If the activator's right side is within our left side cut off use flush positioning
        if ((this.offset.left + this.offset.width/2) < leftFlushPt){
            //if the activator's left edge is too close or past the screen left edge
            if (this.offset.left + this.offset.width/2 < this.container.horizBuffer){
                this.applyPosition({left:this.container.horizBuffer + (this.container.floating ? 0 : -clientRect.left)});
            } else {
                this.applyPosition({left:this.offset.width/2  + (this.container.floating ? this.offset.left : 0)});
            }

            this.container.addClass('right');
            this.container.addClass('corner');
            return true;
        }
        //If the activator's left side is within our right side cut off use flush positioning
        else if (this.offset.left + this.offset.width/2 > rightFlushPt) {
            if ((this.offset.left+this.offset.width/2) > (innerWidth-this.container.horizBuffer)){
                this.applyPosition({left:innerWidth - this.container.horizBuffer - clientRect.right});
            } else {
                this.applyPosition({left: (this.offset.left + this.offset.width/2) - clientRect.right});
            }
            this.container.addClass('left');
            this.container.addClass('corner');
            return true;
        }

        return false;
    },

    /**
    * Determines whether popup will fit onscreen if moved to the left or right of the
    * activator.
    *
    * @return {Boolean} `true` if the popup will fit onscreen; otherwise, `false`.
    * @public
    */
    initHorizontalPositioning: function () {
        this.resetPositioning();

        var clientRect = this.getBoundingRect(this.container.node);
        var innerWidth = this.getViewWidth();

        //adjust horizontal positioning of the popup & nub vertical positioning
        if (this.container.floating){
            if ((this.offset.left + this.offset.width) < innerWidth/2) {
                this.applyPosition({left: this.offset.left + this.offset.width});
                this.container.addRemoveClass('left', true);
            } else {
                this.applyPosition({left: this.offset.left - clientRect.width});
                this.container.addRemoveClass('right', true);
            }
        } else {
            if (this.offset.left - clientRect.width > 0) {
                this.applyPosition({left: this.offset.left - clientRect.left - clientRect.width});
                this.container.addRemoveClass('right', true);
            } else {
                this.applyPosition({left: this.offset.width});
                this.container.addRemoveClass('left', true);
            }
        }
        this.container.addRemoveClass('horizontal', true);

        //if moving the popup left or right of the activator puts it past the edge of the screen then horizontal won't work
        clientRect = this.getBoundingRect(this.container.node);
        if (clientRect.left < 0 || (clientRect.left + clientRect.width) > innerWidth){
            return false;
        }
        return true;

    },

    /**
    * Moves the popup to the left or right of the activating control.
    *
    * @return {Boolean} `false` if popup was not moved because it would not fit onscreen
    * in the new position; otherwise, `true`.
    * @public
    */
    applyHorizontalPositioning: function () {
        //if we can't fit the popup left or right of the activator then forget horizontal positioning
        if (!this.initHorizontalPositioning()) {
            return false;
        }

        var clientRect = this.getBoundingRect(this.container.node);
        var innerHeight = this.getViewHeight();
        var activatorCenter = this.offset.top + this.offset.height/2;

        if (this.container.floating){
            //if the activator's center is within 10% of the center of the view, vertically center the popup
            if ((activatorCenter >= (innerHeight/2 - 0.05 * innerHeight)) && (activatorCenter <= (innerHeight/2 + 0.05 * innerHeight))) {
                this.applyPosition({top: this.offset.top + this.offset.height/2 - clientRect.height/2, bottom: 'auto'});
            } else if (this.offset.top + this.offset.height < innerHeight/2) { //the activator is in the top 1/2 of the screen
                this.applyPosition({top: this.offset.top, bottom: 'auto'});
                this.container.addRemoveClass('high', true);
            } else { //otherwise the popup will be positioned in the bottom 1/2 of the screen
                this.applyPosition({top: this.offset.top - clientRect.height + this.offset.height*2, bottom: 'auto'});
                this.container.addRemoveClass('low', true);
            }
        } else {
            //if the activator's center is within 10% of the center of the view, vertically center the popup
            if ((activatorCenter >= (innerHeight/2 - 0.05 * innerHeight)) && (activatorCenter <= (innerHeight/2 + 0.05 * innerHeight))) {
                this.applyPosition({top: (this.offset.height - clientRect.height)/2});
            } else if (this.offset.top + this.offset.height < innerHeight/2) { //the activator is in the top 1/2 of the screen
                this.applyPosition({top: -this.offset.height});
                this.container.addRemoveClass('high', true);
            } else { //otherwise the popup will be positioned in the bottom 1/2 of the screen
                this.applyPosition({top: clientRect.top - clientRect.height - this.offset.top + this.offset.height});
                this.container.addRemoveClass('low', true);
            }
        }
        return true;
    },


    /**
    * Positions the popup horizontally flush with the activating control.
    *
    * @param {Number} leftFlushPt - Left side cutoff.
    * @param {Number} rightFlushPt - Right side cutoff.
    * @return {Boolean} `false` if popup will not fit onscreen in new position;
    * otherwise, `true`.
    * @public
    */
    applyHorizontalFlushPositioning: function (leftFlushPt, rightFlushPt) {
        //if we can't fit the popup left or right of the activator then forget horizontal positioning
        if (!this.initHorizontalPositioning()) {
            return false;
        }

        var clientRect = this.getBoundingRect(this.container.node);
        var innerHeight = this.getViewHeight();

        //adjust vertical positioning (high or low nub & popup position)
        if (this.container.floating){
            if (this.offset.top < (innerHeight/2)){
                this.applyPosition({top: this.offset.top + this.offset.height/2});
                this.container.addRemoveClass('high', true);
            } else {
                this.applyPosition({top:this.offset.top + this.offset.height/2 - clientRect.height});
                this.container.addRemoveClass('low', true);
            }
        } else {
            if (((clientRect.top + clientRect.height) > innerHeight) && ((innerHeight - clientRect.bottom) < (clientRect.top - clientRect.height))) {
                this.applyPosition({top: clientRect.top - clientRect.height - this.offset.top - this.offset.height/2});
                this.container.addRemoveClass('low', true);
            } else {
                this.applyPosition({top: this.offset.height/2});
                this.container.addRemoveClass('high', true);
            }
        }

        //If the activator's right side is within our left side cut off use flush positioning
        if ((this.offset.left + this.offset.width) < leftFlushPt){
            this.container.addClass('left');
            this.container.addClass('corner');
            return true;
        }
        //If the activator's left side is within our right side cut off use flush positioning
        else if (this.offset.left > rightFlushPt) {
            this.container.addClass('right');
            this.container.addClass('corner');
            return true;
        }

        return false;
    },

    /**
    * Retrieves an object with properties describing the bounding rectangle for the
    * passed-in DOM node.
    *
    * @param  {String} inNode - DOM node for which to retrieve the bounding rectangle.
    * @return {Object} Object with properties describing the DOM node's bounding rectangle.
    * @private
    */
    getBoundingRect:  function (inNode){
        // getBoundingClientRect returns top/left values which are relative to the viewport and not absolute
        var o = inNode.getBoundingClientRect();
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
    * @private
    */
    getViewHeight: function () {
        return (window.innerHeight === undefined) ? document.documentElement.clientHeight : window.innerHeight;
    },

    /**
    * @private
    */
    getViewWidth: function () {
        return (window.innerWidth === undefined) ? document.documentElement.clientWidth : window.innerWidth;
    },

    /**
    * @private
    */
    applyPosition: function (inRect) {
        var s = '';
        for (var n in inRect) {
            s += (n + ':' + inRect[n] + (isNaN(inRect[n]) ? '; ' : 'px; '));
        }
        this.container.addStyles(s);
    },

    /**
    * @private
    */
    resetPositioning: function () {
        this.container.removeClass('right');
        this.container.removeClass('left');
        this.container.removeClass('high');
        this.container.removeClass('low');
        this.container.removeClass('corner');
        this.container.removeClass('below');
        this.container.removeClass('above');
        this.container.removeClass('vertical');
        this.container.removeClass('horizontal');

        this.applyPosition({left: 'auto'});
        this.applyPosition({top: 'auto'});
    },

    /**
    * @private
    */
    reflow: function () {
        this.offset = this.container.activatorOffset;
        this.adjustPosition();
    }
});

}],'layout/Arranger':[function (module,exports,global,require,request){
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

},{'./Arranger':'layout/Arranger'}],'layout/CarouselArranger':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/CarouselArranger~CarouselArranger} kind.
* @module layout/CarouselArranger
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom');

var
	Arranger = require('./Arranger');

/**
* {@link module:layout/CarouselArranger~CarouselArranger} is a
* {@link module:layout/Arranger~Arranger} that displays the active control,
* along with some number of inactive controls to fill the available space. The
* active control is positioned on the left side of the container, and the rest
* of the views are laid out to the right.
*
* One of the controls may have `fit: true` set, in which case it will take up
* any remaining space after all of the other controls have been sized.
*
* For best results with CarouselArranger, you should set a minimum width for
* each control via a CSS style, e.g., `min-width: 25%` or `min-width: 250px`.
*
* Transitions between arrangements are handled by sliding the new controls in
* from the right and sliding the old controls off to the left.
*
* For more information, see the documentation on
* [Arrangers]{@linkplain $dev-guide/building-apps/layout/arrangers.html} in the
* Enyo Developer Guide.
*
* @class CarouselArranger
* @extends module:layout/Arranger~Arranger
* @public
*/
module.exports = kind(
	/** @lends module:layout/CarouselArranger~CarouselArranger */ {

	/**
	* @private
	*/
	name: 'enyo.CarouselArranger',

	/**
	* @private
	*/
	kind: Arranger,

	/**
	* Calculates the size of each panel. Considers the padding of the container by calling
	* {@link module:enyo/dom#calcPaddingExtents} and control margin by calling
	* {@link module:enyo/dom#calcMarginExtents}. If the container is larger than the combined sizes of
	* the controls, one control may be set to fill the remaining space by setting its `fit`
	* property to `true`. If multiple controls have `fit: true` set, the last control to be so
	* marked will have precedence.
	*
	* @protected
	*/
	size: function () {
		var c$ = this.container.getPanels();
		var padding = this.containerPadding = this.container.hasNode() ? dom.calcPaddingExtents(this.container.node) : {};
		var pb = this.containerBounds;
		var i, e, s, m, c;
		pb.height -= padding.top + padding.bottom;
		pb.width -= padding.left + padding.right;
		// used space
		var fit;
		for (i=0, s=0; (c=c$[i]); i++) {
			m = dom.calcMarginExtents(c.hasNode());
			c.width = c.getBounds().width;
			c.marginWidth = m.right + m.left;
			s += (c.fit ? 0 : c.width) + c.marginWidth;
			if (c.fit) {
				fit = c;
			}
		}
		if (fit) {
			var w = pb.width - s;
			fit.width = w >= 0 ? w : fit.width;
		}
		for (i=0, e=padding.left; (c=c$[i]); i++) {
			c.setBounds({top: padding.top, bottom: padding.bottom, width: c.fit ? c.width : null});
		}
	},

	/**
	* @see {@link module:layout/Arranger~Arranger#arrange}
	* @protected
	*/
	arrange: function (controls, arrangement) {
		if (this.container.wrap) {
			this.arrangeWrap(controls, arrangement);
		} else {
			this.arrangeNoWrap(controls, arrangement);
		}
	},

	/**
	* A non-wrapping carousel arranges the controls from left to right without regard to the
	* ordered array passed via `controls`. `arrangement` will contain the index of the active
	* panel.
	*
	* @private
	*/
	arrangeNoWrap: function (controls, arrangement) {
		var i, aw, cw, c;
		var c$ = this.container.getPanels();
		var s = this.container.clamp(arrangement);
		var nw = this.containerBounds.width;
		// do we have enough content to fill the width?
		for (i=s, cw=0; (c=c$[i]); i++) {
			cw += c.width + c.marginWidth;
			if (cw > nw) {
				break;
			}
		}
		// if content width is less than needed, adjust starting point index and offset
		var n = nw - cw;
		var o = 0;
		if (n > 0) {
			for (i=s-1, aw=0; (c=c$[i]); i--) {
				aw += c.width + c.marginWidth;
				if (n - aw <= 0) {
					o = (n - aw);
					s = i;
					break;
				}
			}
		}
		// arrange starting from needed index with detected offset so we fill space
		var w, e;
		for (i=0, e=this.containerPadding.left + o; (c=c$[i]); i++) {
			w = c.width + c.marginWidth;
			if (i < s) {
				this.arrangeControl(c, {left: -w});
			} else {
				this.arrangeControl(c, {left: Math.floor(e)});
				e += w;
			}
		}
	},

	/**
	* Arranges `controls` from left to right such that the active panel is always the
	* leftmost, with subsequent panels positioned to its right.
	*
	* @private
	*/
	arrangeWrap: function (controls, arrangement) {
		for (var i=0, e=this.containerPadding.left, c; (c=controls[i]); i++) {
			this.arrangeControl(c, {left: e});
			e += c.width + c.marginWidth;
		}
	},

	/**
	* Calculates the change in `left` position between the two arrangements `a0` and `a1`.
	* @protected
	*/
	calcArrangementDifference: function (i0, a0, i1, a1) {
		var i = Math.abs(i0 % this.c$.length);
		return a0[i].left - a1[i].left;
	},

	/**
	* Resets the size and position of all panels.
	*
	* @method
	* @private
	*/
	destroy: kind.inherit(function (sup) {
		return function () {
			var c$ = this.container.getPanels();
			for (var i=0, c; (c=c$[i]); i++) {
				Arranger.positionControl(c, {left: null, top: null});
				c.applyStyle('top', null);
				c.applyStyle('bottom', null);
				c.applyStyle('left', null);
				c.applyStyle('width', null);
			}
			sup.apply(this, arguments);
		};
	})
});

},{'./Arranger':'layout/Arranger'}],'layout/DockRightArranger':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/DockRightArranger~DockRightArranger} kind.
* @module layout/DockRightArranger
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom');

var
	Arranger = require('./Arranger');

/**
* {@link module:layout/DockRightArranger~DockRightArranger} is a
* {@link module:layout/Arranger~Arranger} that displays the active control,
* along with some number of inactive controls to fill the available space. The
* active control is positioned on the right side of the container and the rest
* of the views are laid out to the right.
*
* For best results with DockRightArranger, you should set a minimum width
* for each control via a CSS style, e.g., `min-width: 25%` or
* `min-width: 250px`.
*
* Transitions between arrangements are handled by sliding the new control	in
* from the right. If the width of the old control(s) can fit within the
* container, they will slide to the left. If not, they will collapse to the left.
*
* For more information, see the documentation on
* [Arrangers]{@linkplain $dev-guide/building-apps/layout/arrangers.html} in the
* Enyo Developer Guide.
*
* @class DockRightArranger
* @extends module:layout/Arranger~Arranger
* @public
*/
module.exports = kind(
	/** @lends module:layout/DockRightArranger~DockRightArranger.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.DockRightArranger',

	/**
	* @private
	*/
	kind: Arranger,

	/**
	* If `true`, the base panel (i.e., the panel at index `0`) will fill the width
	* of the container, while newer controls will slide in and collapse on top of it.
	*
	* @type {Boolean}
	* @default  false
	* @public
	*/
	basePanel: false,

	/**
	* Panels will overlap by this number of pixels.
	*
	* Note that this is imported from the container at construction time.
	*
	* @type {Number}
	* @default  0
	* @public
	*/
	overlap: 0,

	/**
	* The column width in pixels.
	*
	* Note that this is imported from the container at construction time.
	*
	* @type {Number}
	* @default  0
	* @public
	*/
	layoutWidth: 0,

	/**
	* @method
	* @private
	*/
	constructor: function () {
		Arranger.prototype._constructor.apply(this, arguments);
		this.overlap = this.container.overlap != null ? this.container.overlap : this.overlap;
		this.layoutWidth = this.container.layoutWidth != null ? this.container.layoutWidth : this.layoutWidth;
	},

	/**
	* @see {@link module:layout/Arranger~Arranger#size}
	* @protected
	*/
	size: function () {
		var c$ = this.container.getPanels();
		var padding = this.containerPadding = this.container.hasNode() ? dom.calcPaddingExtents(this.container.node) : {};
		var pb = this.containerBounds;
		var i, m, c;
		pb.width -= padding.left + padding.right;
		var nw = pb.width;
		var len = c$.length;
		var offset;
		// panel arrangement positions
		this.container.transitionPositions = {};

		for (i=0; (c=c$[i]); i++) {
			c.width = ((i===0) && (this.container.basePanel)) ? nw : c.getBounds().width;
		}

		for (i=0; (c=c$[i]); i++) {

			if ((i===0) && (this.container.basePanel)) {
				c.setBounds({width: nw});
			}
			c.setBounds({top: padding.top, bottom: padding.bottom});

			for (var j=0; (c=c$[j]); j++) {
				var xPos;
				// index 0 always should always be left-aligned at 0px
				if ((i===0) && (this.container.basePanel)) {
					xPos = 0;
				// else newer panels should be positioned off the viewport
				} else if (j < i) {
					xPos = nw;
				// else active panel should be right-aligned
				} else if (i === j) {
					offset = nw > this.layoutWidth ? this.overlap : 0;
					xPos = (nw - c$[i].width) + offset;
				} else {
					break;
				}
				this.container.transitionPositions[i + '.' + j] = xPos;
			}

			if (j < len) {
				var leftAlign = false;
				for (var k=i+1; k<len; k++) {
					offset = 0;
					// position panel to left: 0px
					if (leftAlign) {
						offset = 0;
					// else if next panel cannot fit within container
					} else if ( (c$[i].width + c$[k].width - this.overlap) > nw ) {
					//} else if ( (c$[i].width + c$[k].width) > nw ) {
						offset = 0;
						leftAlign = true;
					} else {
						offset = c$[i].width - this.overlap;
						for (m=i; m<k; m++) {
							var _w = offset + c$[m+1].width - this.overlap;
							if (_w < nw) {
								offset = _w;
							} else {
								offset = nw;
								break;
							}
						}
						offset = nw - offset;
					}
					this.container.transitionPositions[i + '.' + k] = offset;
				}
			}

		}
	},

	/**
	* Sets the `left` position for each panel according to the `arrangement`.
	*
	* @see {@link module:layout/Arranger~Arranger#arrange}
	* @protected
	*/
	arrange: function (controls, arrangement) {
		var i, c;
		var c$ = this.container.getPanels();
		var s = this.container.clamp(arrangement);

		for (i=0; (c=c$[i]); i++) {
			var xPos = this.container.transitionPositions[i + '.' + s];
			this.arrangeControl(c, {left: xPos});
		}
	},

	/**
	* Calculates the difference in width between the panels at `i0` and `i1`.
	*
	* @see {@link module:layout/Arranger~Arranger#calcArrangementDifference}
	* @protected
	*/
	calcArrangementDifference: function (i0, a0, i1, a1) {
		var p = this.container.getPanels();
		var w = (i0 < i1) ? p[i1].width : p[i0].width;
		return w;
	},

	/**
	* Resets the position of the panels.
	*
	* @method
	* @private
	*/
	destroy: function () {
		var c$ = this.container.getPanels();
		for (var i=0, c; (c=c$[i]); i++) {
			Arranger.positionControl(c, {left: null, top: null});
			c.applyStyle('top', null);
			c.applyStyle('bottom', null);
			c.applyStyle('left', null);
			c.applyStyle('width', null);
		}
		Arranger.prototype.destroy.apply(this, arguments);
	}
});

},{'./Arranger':'layout/Arranger'}],'layout/GridArranger':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/GridArranger~GridArranger} kind.
* @module layout/GridArranger
*/

var
	kind = require('enyo/kind');

var
	Arranger = require('./Arranger');

/**
* {@link module:layout/GridArranger~GridArranger} is a
* {@link module:layout/Arranger~Arranger} that arranges controls in a grid. The
* active control is positioned at the top-left of the grid and the other
* controls are laid out from left to right and then from top to bottom.
*
* Transitions between arrangements are handled by moving the active control to
* the end of the grid and shifting the other controls	to the left, or by moving
* it up to the previous row, to fill the space.
*
* For more information, see the documentation on
* [Arrangers]{@linkplain $dev-guide/building-apps/layout/arrangers.html} in the
* Enyo Developer Guide.
* @class GridArranger
* @extends module:layout/Arranger~Arranger
* @public
*/
module.exports = kind(
	/** @lends module:layout/GridArranger~GridArranger.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.GridArranger',

	/**
	* @private
	*/
	kind: Arranger,

	/**
	* @see {@link module:layout/Arranger~Arranger#incrementalPoints}
	* @private
	*/
	incrementalPoints: true,

	/**
	 * The column width in pixels.
	 *
	 * @type {Number}
	 * @default 100
	 * @public
	 */
	colWidth: 100,

	/**
	 * The column height in pixels.
	 *
	 * @type {Number}
	 * @default 100
	 * @public
	 */
	colHeight: 100,

	/**
	* Sizes each panel to be [colWidth]{@link module:layout/GridArranger~GridArranger#colWidth} pixels wide
	* and [colHeight]{@link module:layout/GridArranger~GridArranger#colHeight} pixels high.
	*
	* @see {@link module:layout/Arranger~Arranger#size}
	* @protected
	*/
	size: function () {
		var c$ = this.container.getPanels();
		var w=this.colWidth, h=this.colHeight;
		for (var i=0, c; (c=c$[i]); i++) {
			c.setBounds({width: w, height: h});
		}
	},

	/**
	* Calculates the number of columns based on the container's width and
	* [colWidth]{@link module:layout/GridArranger~GridArranger#colWidth}. Each row is positioned
	* starting at the top-left of the container.
	*
	* @see {@link module:layout/Arranger~Arranger#arrange}
	* @protected
	*/
	arrange: function (controls, arrangement) {
		var w=this.colWidth, h=this.colHeight;
		var cols = Math.max(1, Math.floor(this.containerBounds.width / w));
		var c;
		for (var y=0, i=0; i<controls.length; y++) {
			for (var x=0; (x<cols) && (c=controls[i]); x++, i++) {
				this.arrangeControl(c, {left: w*x, top: h*y});
			}
		}
	},

	/**
	* If the control is moving between rows, adjusts its opacity during the transition.
	*
	* @see {@link module:layout/Arranger~Arranger#flowControl}
	* @method
	* @protected
	*/
	flowControl: kind.inherit(function (sup) {
		return function (inControl, inA) {
			sup.apply(this, arguments);
			Arranger.opacifyControl(inControl, inA.top % this.colHeight !== 0 ? 0.25 : 1);
		};
	}),

	/**
	* @see {@link module:layout/Arranger~Arranger#calcArrangementDifference}
	* @protected
	*/
	calcArrangementDifference: function (inI0, inA0, inI1, inA1) {
		return this.colWidth;
	},

	/**
	* Resets position of panels.
	*
	* @method
	* @private
	*/
	destroy: kind.inherit(function (sup) {
		return function () {
			var c$ = this.container.getPanels();
			for (var i=0, c; (c=c$[i]); i++) {
				Arranger.positionControl(c, {left: null, top: null});
				c.applyStyle('left', null);
				c.applyStyle('top', null);
				c.applyStyle('height', null);
				c.applyStyle('width', null);
			}
			sup.apply(this, arguments);
		};
	})
});

},{'./Arranger':'layout/Arranger'}],'layout/LeftRightArranger':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/LeftRightArranger~LeftRightArranger} kind.
* @module layout/LeftRightArranger
*/

var
	kind = require('enyo/kind');

var
	Arranger = require('./Arranger');

/**
* {@link module:layout/LeftRightArranger~LeftRightArranger} is a
* {@link module:layout/Arranger~Arranger} that displays the active control and
* some of the previous and next controls. The active control is centered
* horizontally in the container, and the previous and next controls are laid out
* to the left and right, respectively.
*
* Transitions between arrangements are handled by sliding the new control in
* from the right and sliding the active control out to the left.
*
* For more information, see the documentation on
* [Arrangers]{@linkplain $dev-guide/building-apps/layout/arrangers.html} in the
* Enyo Developer Guide.
*
* @class LeftRightArranger
* @extends module:layout/Arranger~Arranger
* @public
*/
module.exports = kind(
	/** @lends module:layout/LeftRightArranger~LeftRightArranger.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.LeftRightArranger',

	/**
	* @private
	*/
	kind: Arranger,

	/**
	 * The margin width (i.e., how much of the previous and next controls
	 * are visible) in pixels.
	 *
	 * Note that this is imported from the container at construction time.
	 *
	 * @type {Number}
	 * @default 40
	 * @public
	 */
	margin: 40,

	/**
	 * The axis along which the panels will animate.
	 *
	 * @type {String}
	 * @readOnly
	 * @default 'width'
	 * @protected
	 */
	axisSize: 'width',

	/**
	 * The axis along which the panels will **not** animate.
	 *
	 * @type {String}
	 * @readOnly
	 * @default 'height'
	 * @protected
	 */
	offAxisSize: 'height',

	/**
	 * The axis position at which the panel will animate.
	 *
	 * @type {String}
	 * @readOnly
	 * @default 'left'
	 * @protected
	 */
	axisPosition: 'left',

	/**
	* @method
	* @private
	*/
	constructor: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.margin = this.container.margin != null ? this.container.margin : this.margin;
		};
	}),

	/**
	* Sizes the panels such that they fill [offAxisSize]{@link module:layout/LeftRightArranger~LeftRightArranger#offAxisSize}
	* and yield [margin]{@link module:layout/LeftRightArranger~LeftRightArranger#margin} pixels on each side of
	* [axisSize]{@link module:layout/LeftRightArranger~LeftRightArranger#axisSize}.
	*
	* @see {@link module:layout/Arranger~Arranger#size}
	* @protected
	*/
	size: function () {
		var c$ = this.container.getPanels();
		var port = this.containerBounds[this.axisSize];
		var box = port - this.margin -this.margin;
		for (var i=0, b, c; (c=c$[i]); i++) {
			b = {};
			b[this.axisSize] = box;
			b[this.offAxisSize] = '100%';
			c.setBounds(b);
		}
	},

	/**
	* To prevent a panel that is switching sides (to maintain the balance) from overlapping
	* the active panel during the animation, updates the `z-index` of the switching panel
	* to ensure that it stays behind the other panels.
	*
	* @todo Could use some optimization in its `for` loop (e.g. .length lookup and calc)
	* @see {@link module:layout/Arranger~Arranger#start}
	* @method
	* @protected
	*/
	start: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);

			var s = this.container.fromIndex;
			var f = this.container.toIndex;
			var c$ = this.getOrderedControls(f);
			var o = Math.floor(c$.length/2);

			for (var i=0, c; (c=c$[i]); i++) {
				if (s > f){
					if (i == (c$.length - o)){
						c.applyStyle('z-index', 0);
					} else {
						c.applyStyle('z-index', 1);
					}
				} else {
					if (i == (c$.length-1 - o)){
						c.applyStyle('z-index', 0);
					} else {
						c.applyStyle('z-index', 1);
					}
				}
			}
		};
	}),

	/**
	* Balances the panels laid out to each side of the active panel
	* such that, for a set of `n` panels, `floor(n/2)` are before and `ceil(n/2)` are after
	* the active panel.
	*
	* @protected
	*/
	arrange: function (controls, arrangement) {
		var i,c,b;
		if (this.container.getPanels().length==1){
			b = {};
			b[this.axisPosition] = this.margin;
			this.arrangeControl(this.container.getPanels()[0], b);
			return;
		}
		var o = Math.floor(this.container.getPanels().length/2);
		var c$ = this.getOrderedControls(Math.floor(arrangement)-o);
		var box = this.containerBounds[this.axisSize] - this.margin - this.margin;
		var e = this.margin - box * o;
		for (i=0; (c=c$[i]); i++) {
			b = {};
			b[this.axisPosition] = e;
			this.arrangeControl(c, b);
			e += box;
		}
	},

	/**
	* Calculates the difference along the
	* [axisPosition]{@link module:layout/LeftRightArranger~LeftRightArranger#axisPosition} (e.g., `'left'`).
	*
	* @param {Number} inI0 - The initial layout setting.
	* @param {Object} inA0 - The initial arrangement.
	* @param {Number} inI1 - The target layout setting.
	* @param {Object} inA1 - The target arrangement.
	* @protected
	*/
	calcArrangementDifference: function (inI0, inA0, inI1, inA1) {
		if (this.container.getPanels().length==1){
			return 0;
		}

		var i = Math.abs(inI0 % this.c$.length);
		//enyo.log(inI0, inI1);
		return inA0[i][this.axisPosition] - inA1[i][this.axisPosition];
	},

	/**
	* Resets the positioning and opacity of panels.
	*
	* @method
	* @private
	*/
	destroy: kind.inherit(function (sup) {
		return function () {
			var c$ = this.container.getPanels();
			for (var i=0, c; (c=c$[i]); i++) {
				Arranger.positionControl(c, {left: null, top: null});
				Arranger.opacifyControl(c, 1);
				c.applyStyle('left', null);
				c.applyStyle('top', null);
				c.applyStyle('height', null);
				c.applyStyle('width', null);
			}
			sup.apply(this, arguments);
		};
	})
});

},{'./Arranger':'layout/Arranger'}],'layout/SpiralArranger':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/SpiralArranger~SpiralArranger} kind.
* @module layout/SpiralArranger
*/

var
	kind = require('enyo/kind');

var
	Arranger = require('./Arranger');

/**
* {@link module:layout/SpiralArranger~SpiralArranger} is a
* {@link module:layout/Arranger~Arranger} that arranges controls in a spiral.
* The active control is positioned on top and the other controls are laid out in
* a spiral pattern below.
*
* Transitions between arrangements are handled by rotating the new control up
* from below and rotating the active control down to the end of the spiral.
*
* For more information, see the documentation on
* [Arrangers]{@linkplain $dev-guide/building-apps/layout/arrangers.html} in the
* Enyo Developer Guide.
*
* @class SpiralArranger
* @extends module:layout/Arranger~Arranger
* @public
*/
module.exports = kind(
	/** @lends module:layout/SpiralArranger~SpiralArranger.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.SpiralArranger',

	/**
	* @private
	*/
	kind: Arranger,

	/**
	* @see {@link module:layout/Arranger~Arranger#incrementalPoints}
	* @private
	*/
	incrementalPoints: true,

	/**
	* The amount of space between successive controls
	*
	* @private
	*/
	inc: 20,

	/**
	* Sizes each panel to one third of the container.
	*
	* @see  {@link module:layout/Arranger~Arranger#size}
	* @protected
	*/
	size: function () {
		var c$ = this.container.getPanels();
		var b = this.containerBounds;
		var w = this.controlWidth = b.width/3;
		var h = this.controlHeight = b.height/3;
		for (var i=0, c; (c=c$[i]); i++) {
			c.setBounds({width: w, height: h});
		}
	},

	/**
	* Arranges panels in a spiral with the active panel at the center.
	*
	* @see {@link module:layout/Arranger~Arranger#arrange}
	* @protected
	*/
	arrange: function (controls, arrangement) {
		var s = this.inc;
		for (var i=0, l=controls.length, c; (c=controls[i]); i++) {
			var x = Math.cos(i/l * 2*Math.PI) * i * s + this.controlWidth;
			var y = Math.sin(i/l * 2*Math.PI) * i * s + this.controlHeight;
			this.arrangeControl(c, {left: x, top: y});
		}
	},

	/**
	* Applies descending `z-index` values to each panel, starting with the active panel.
	*
	* @see {@link module:layout/Arranger~Arranger#start}
	* @method
	* @protected
	*/
	start: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			var c$ = this.getOrderedControls(this.container.toIndex);
			for (var i=0, c; (c=c$[i]); i++) {
				c.applyStyle('z-index', c$.length - i);
			}
		};
	}),

	/**
	* @see {@link module:layout/Arranger~Arranger#calcArrangementDifference}
	* @protected
	*/
	calcArrangementDifference: function (inI0, inA0, inI1, inA1) {
		return this.controlWidth;
	},

	/**
	* Resets position and z-index of all panels.
	*
	* @method
	* @private
	*/
	destroy: kind.inherit(function (sup) {
		return function () {
			var c$ = this.container.getPanels();
			for (var i=0, c; (c=c$[i]); i++) {
				c.applyStyle('z-index', null);
				Arranger.positionControl(c, {left: null, top: null});
				c.applyStyle('left', null);
				c.applyStyle('top', null);
				c.applyStyle('height', null);
				c.applyStyle('width', null);
			}
			sup.apply(this, arguments);
		};
	})
});

},{'./Arranger':'layout/Arranger'}],'layout/CardSlideInArranger':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/CardSlideInArranger~CardSlideInArranger} kind.
* @module layout/CardSlideInArranger
*/

var
	kind = require('enyo/kind');

var
	Arranger = require('./Arranger'),
	CardArranger = require('./CardArranger');

/**
* {@link module:layout/CardSlideInArranger~CardSlideInArranger} is a
* {@link module:layout/Arranger~Arranger} that displays only one active control.
* The non-active controls are hidden with `setShowing(false)`. Transitions
* between arrangements are handled by sliding the new control	over the current
* one.
*
* Note that CardSlideInArranger always slides controls in from the right. If
* you want an arranger that slides to the right and left, try
* {@link module:layout/LeftRightArranger~LeftRightArranger}.
*
* For more information, see the documentation on
* [Arrangers]{@linkplain $dev-guide/building-apps/layout/arrangers.html} in the
* Enyo Developer Guide.
*
* @class CardSlideInArranger
* @extends module:layout/CardArranger~CardArranger
* @public
*/
module.exports = kind(
	/** @lends module:layout/CardSlideInArranger~CardSlideInArranger.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.CardSlideInArranger',

	/**
	* @private
	*/
	kind: CardArranger,

	/**
	* Shows the active panel at the start of transition. Also triggers a resize on
	* the active panel if it wasn't previously showing.
	*
	* @todo Seems like poor variable reuse of `i`
	* @todo Should inherit from super and omit the `for` block
	* @see {@link module:layout/Arranger~Arranger#start}
	* @protected
	*/
	start: function () {
		var c$ = this.container.getPanels();
		for (var i=0, c; (c=c$[i]); i++) {
			var wasShowing=c.showing;
			c.setShowing(i == this.container.fromIndex || i == (this.container.toIndex));
			if (c.showing && !wasShowing) {
				c.resize();
			}
		}
		var l = this.container.fromIndex;
		i = this.container.toIndex;
		this.container.transitionPoints = [
			i + '.' + l + '.s',
			i + '.' + l + '.f'
		];
	},

	/**
	* @todo  This method is an exact copy of CardArranger. Since it's calling the super,
	* 	the work is being done twice, so this method should be removed.
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
	* Parses the transition point value to position the panels to slide in from the right.
	*
	* @see {@link module:layout/Arranger~Arranger#arrange}
	* @protected
	*/
	arrange: function (controls, arrangement) {
		var p = arrangement.split('.'),
			f = p[0],
			s = p[1],
			starting = (p[2] == 's'),
			b = this.containerBounds.width;

		for (var i=0, c$=this.container.getPanels(), c, v; (c=c$[i]); i++) {
			v = b;
			if (s == i) {
				v = starting ? 0 : -b;
			}
			if (f == i) {
				v = starting ? b : 0;
			}
			if (s == i && s == f) {
				v = 0;
			}
			this.arrangeControl(c, {left: v});
		}
	},

	/**
	* Resets the `left` position of all panels.
	*
	* @method
	* @private
	*/
	destroy: kind.inherit(function (sup) {
		return function () {
			var c$ = this.container.getPanels();
			for (var i=0, c; (c=c$[i]); i++) {
				Arranger.positionControl(c, {left: null});
			}
			sup.apply(this, arguments);
		};
	})
});

},{'./Arranger':'layout/Arranger','./CardArranger':'layout/CardArranger'}],'layout/CollapsingArranger':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/CollapsingArranger~CollapsingArranger} kind.
* @module layout/CollapsingArranger
*/

var
	kind = require('enyo/kind');

var
	CarouselArranger = require('./CarouselArranger');

/**
* {@link module:layout/CollapsingArranger~CollapsingArranger} is a
* {@link module:layout/Arranger~Arranger} that displays the active control,
* along with some number of inactive controls to fill the available space. The
* active control is positioned on the left side of the container and the rest of
* the views are laid out to the right. The last control, if visible, will expand
* to fill whatever space is not taken up by the previous controls.
*
* For best results with CollapsingArranger, you should set a minimum width
* for each control via a CSS style, e.g., `min-width: 25%` or
* `min-width: 250px`.
*
* Transitions between arrangements are handled by sliding the new control	in
* from the right and collapsing the old control to the left.
*
* For more information, see the documentation on
* [Arrangers]{@linkplain $dev-guide/building-apps/layout/arrangers.html} in the
* Enyo Developer Guide.
*
* @class CollapsingArranger
* @extends module:enyo/CarouselArranger~CarouselArranger
* @public
*/
module.exports = kind(
	/** @lends module:layout/CollapsingArranger~CollapsingArranger.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.CollapsingArranger',

	/**
	* @private
	*/
	kind: CarouselArranger,

	/**
	* The distance (in pixels) that each panel should be offset from the left
	* when it is selected. This allows controls on the underlying panel to the
	* left of the selected one to be partially revealed.
	*
	* Note that this is imported from the container at construction time.
	*
	* @public
	*/
	peekWidth: 0,

	/**
	* If a panel is added or removed after construction, ensures that any control
	* marked to fill remaining space (via its `_fit` member) is reset.
	*
	* @see {@link module:layout/Arranger~Arranger#size}
	* @method
	* @protected
	*/
	size: kind.inherit(function (sup) {
		return function () {
			this.clearLastSize();
			sup.apply(this, arguments);
		};
	}),

	/**
	* Resets any panel marked to fill remaining space that isn't, in fact, the last panel.
	*
	* @private
	*/
	clearLastSize: function () {
		for (var i=0, c$=this.container.getPanels(), c; (c=c$[i]); i++) {
			if (c._fit && i != c$.length-1) {
				c.applyStyle('width', null);
				c._fit = null;
			}
		}
	},

	/**
	* @method
	* @private
	*/
	constructor: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.peekWidth = this.container.peekWidth != null ? this.container.peekWidth : this.peekWidth;
		};
	}),

	/**
	* Arranges controls from left to right starting with first panel. If
	* [peekWidth]{@link module:layout/CollapsingArranger~CollapsingArranger#peekWidth} is set, any visible control
	* whose index is less than `arrangement` (the active panel's index) will be revealed
	* by `peekWidth` pixels.
	*
	* @see {@link module:layout/Arranger~Arranger#arrange}
	* @protected
	*/
	arrange: function (controls, arrangement) {
		var c$ = this.container.getPanels();
		for (var i=0, e=this.containerPadding.left, c, n=0; (c=c$[i]); i++) {
			if(c.getShowing()){
				this.arrangeControl(c, {left: e + n * this.peekWidth});
				if (i >= arrangement) {
					e += c.width + c.marginWidth - this.peekWidth;
				}
				n++;
			} else {
				this.arrangeControl(c, {left: e});
				if (i >= arrangement) {
					e += c.width + c.marginWidth;
				}
			}
			// FIXME: overdragging-ish
			if (i == c$.length - 1 && arrangement < 0) {
				this.arrangeControl(c, {left: e - arrangement});
			}
		}
	},

	/**
	* Calculates the change in `left` position of the last panel between the two
	* arrangements `a0` and `a1`.
	*
	* @see {@link module:layout/Arranger~Arranger#calcArrangementDifference}
	* @private
	*/
	calcArrangementDifference: function (i0, a0, i1, a1) {
		var i = this.container.getPanels().length-1;
		return Math.abs(a1[i].left - a0[i].left);
	},

	/**
	* If the container's `realtimeFit` property is `true`, resizes the last panel to
	* fill the space. This ensures that when dragging or animating to the last index,
	* there is never blank space to the right of the last panel. If `realtimeFit` is
	* falsy, the last panel is not resized until the
	* [finish()]{@link module:layout/CollapsingArranger~CollapsingArranger#finish} method is called.
	*
	* @see {@link module:layout/Arranger~Arranger#flowControls}
	* @method
	* @private
	*/
	flowControl: kind.inherit(function (sup) {
		return function (inControl, inA) {
			sup.apply(this, arguments);
			if (this.container.realtimeFit) {
				var c$ = this.container.getPanels();
				var l = c$.length-1;
				var last = c$[l];
				if (inControl == last) {
					this.fitControl(inControl, inA.left);
				}
			}

		};
	}),

	/**
	* Ensures that the last panel fills the remaining space when a transition completes.
	*
	* @see {@link module:layout/Arranger~Arranger#finish}
	* @method
	* @private
	*/
	finish: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			if (!this.container.realtimeFit && this.containerBounds) {
				var c$ = this.container.getPanels();
				var a$ = this.container.arrangement;
				var l = c$.length-1;
				var c = c$[l];
				this.fitControl(c, a$[l].left);
			}
		};
	}),

	/**
	* Resizes the given `control` to match the width of the container minus the
	* given `offset`.
	*
	* @param {module:enyo/Control~Control} control - The control that should fit in the remaining space.
	* @param {Number} offset        - The left offset of the control with respect to the
	* container.
	* @private
	*/
	fitControl: function (control, offset) {
		control._fit = true;
		control.applyStyle('width', (this.containerBounds.width - offset) + 'px');
		control.resize();
	}
});

},{'./CarouselArranger':'layout/CarouselArranger'}],'layout/TopBottomArranger':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/TopBottomArranger~TopBottomArranger} kind.
* @module layout/TopBottomArranger
*/

var
	kind = require('enyo/kind');

var
	LeftRightArranger = require('./LeftRightArranger');

/**
* {@link module:layout/TopBottomArranger~TopBottomArranger} is a
* {@link module:layout/Arranger~Arranger} that displays the active control and
* some of the previous and next controls. The active control is centered
* vertically in the container, and the previous and next controls are laid out
* above and below, respectively.
*
* Transitions between arrangements are handled by sliding the new control in
* from the bottom and sliding the active control out the top.
*
* For more information, see the documentation on
* [Arrangers]{@linkplain $dev-guide/building-apps/layout/arrangers.html} in the
* Enyo Developer Guide.
*
* @class TopBottomArranger
* @extends module:layout/LeftRightArranger~LeftRightArranger
* @public
*/
module.exports = kind(
	/** @lends module:layout/TopBottomArranger~TopBottomArranger.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.TopBottomArranger',

	/**
	* @private
	*/
	kind: LeftRightArranger,

	/**
	* @see {@link module:layout/Arranger~Arranger#dragProp}
	* @private
	*/
	dragProp: 'ddy',

	/**
	* @see {@link module:layout/Arranger~Arranger#dragDirectionProp}
	* @private
	*/
	dragDirectionProp: 'yDirection',

	/**
	* @see {@link module:layout/Arranger~Arranger#canDragProp}
	* @private
	*/
	canDragProp: 'vertical',

	/**
	* @see {@link module:layout/LeftRightArranger~LeftRightArranger#axisSize}
	* @protected
	*/
	axisSize: 'height',

	/**
	* @see {@link module:layout/LeftRightArranger~LeftRightArranger#offAxisSize}
	* @protected
	*/
	offAxisSize: 'width',

	/**
	* @see {@link module:layout/LeftRightArranger~LeftRightArranger#axisPosition}
	* @protected
	*/
	axisPosition: 'top'
});

},{'./LeftRightArranger':'layout/LeftRightArranger'}],'layout/Panels':[function (module,exports,global,require,request){
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

}],'layout/ImageViewPin':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/ImageViewPin~ImageViewPin} kind.
* @module layout/ImageViewPin
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

/**
* {@link module:layout/ImageViewPin~ImageViewPin} is a control that can be used to display
* non-zooming content inside of a zoomable {@link module:layout/ImageView~ImageView} control. The
* [anchor]{@link module:layout/ImageViewPin~ImageViewPin#anchor} and
* [position]{@link module:layout/ImageViewPin~ImageViewPin#position} properties may be used to
* position both the ImageViewPin and its content in a specific location within
* the ImageView.
*
* @class ImageViewPin
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:layout/ImageViewPin~ImageViewPin.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.ImageViewPin',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @lends module:layout/ImageViewPin~ImageViewPin.prototype
	* @private
	*/
	published: {
		/**
		* If `true`, the anchor point for this pin will be highlighted in yellow,
		* which can be useful for debugging. Defaults to `false`.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		highlightAnchorPoint: false,

		/**
		* The coordinates at which this control should be anchored inside
		* of the parent ImageView control. This position is relative to the
		* ImageView control's original size. Works like standard CSS positioning,
		* and accepts both px and percentage values.
		*
		* * `top`: Distance from the parent's top edge.
		* * `bottom`: Distance from the parent's bottom edge (overrides `top`).
		* * `left`: Distance from the parent's left edge.
		* * `right`: Distance from the parent's right edge (overrides `left`).
		*
		* @type {Object}
		* @default {top: 0px, left: 0px}
		* @public
		*/
		anchor: {
			top: 0,
			left: 0
		},

		/**
		* The coordinates at which the contents of this control should be
		* positioned relative to the ImageViewPin itself. Works like standard
		* CSS positioning. Only accepts px values. Defaults to
		* `{top: 0px, left: 0px}`.
		*
		* * `top`: Distance from the ImageViewPin's top edge.
		* * `bottom`: Distance from the ImageViewPin's bottom edge.
		* * `left`: Distance from the ImageViewPin's left edge.
		* * `right`: Distance from the ImageViewPin's right edge.
		*
		* @type {Object}
		* @default {top: 0px, left: 0px}
		* @public
		*/
		position: {
			top: 0,
			left: 0
		}
	},

	/**
	* @private
	*/
	style: 'position:absolute;z-index:1000;width:0px;height:0px;',

	/**
	* @private
	*/
	handlers: {
		onPositionPin: 'reAnchor'
	},

	/**
	* @method
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.styleClientControls();
		this.positionClientControls();
		this.highlightAnchorPointChanged();
		this.anchorChanged();
	},

	/**
	* Absolutely positions client controls.
	*
	* @private
	*/
	styleClientControls: function () {
		var controls = this.getClientControls();
		for (var i = 0; i < controls.length; i++) {
			controls[i].applyStyle('position','absolute');
		}
	},

	/**
	* Applies specified positioning to client controls.
	*
	* @private
	*/
	positionClientControls: function () {
		var controls = this.getClientControls();
		for (var i = 0; i < controls.length; i++) {
			for (var p in this.position) {
				controls[i].applyStyle(p, this.position[p]+'px');
			}
		}
	},

	/**
	* Updates styling of anchor point.
	*
	* @private
	*/
	highlightAnchorPointChanged: function () {
		this.addRemoveClass('pinDebug', this.highlightAnchorPoint);
	},

	/**
	* Creates `coords` object for each anchor, containing value and units.
	*
	* @private
	*/
	anchorChanged: function () {
		var coords = null, a = null;
		for (a in this.anchor) {
			coords = this.anchor[a].toString().match(/^(\d+(?:\.\d+)?)(.*)$/);
			if (!coords) {
				continue;
			}
			this.anchor[a+'Coords'] = {
				value: coords[1],
				units: coords[2] || 'px'
			};
		}
	},

	/*
	* Applies positioning to ImageViewPin specified in `this.anchor`.
	* Called anytime the parent ImageView is rescaled. If `right/bottom`
	* are specified, they override `top/left`.
	*
	* @private
	*/
	reAnchor: function (sender, event) {
		var scale = event.scale;
		var bounds = event.bounds;
		var left = (this.anchor.right)
			// Right
			? (this.anchor.rightCoords.units == 'px')
				? (bounds.width + bounds.x - this.anchor.rightCoords.value*scale)
				: (bounds.width*(100-this.anchor.rightCoords.value)/100 + bounds.x)
			// Left
			: (this.anchor.leftCoords.units == 'px')
				? (this.anchor.leftCoords.value*scale + bounds.x)
				: (bounds.width*this.anchor.leftCoords.value/100 + bounds.x);
		var top = (this.anchor.bottom)
			// Bottom
			? (this.anchor.bottomCoords.units == 'px')
				? (bounds.height + bounds.y - this.anchor.bottomCoords.value*scale)
				: (bounds.height*(100-this.anchor.bottomCoords.value)/100 + bounds.y)
			// Top
			: (this.anchor.topCoords.units == 'px')
				? (this.anchor.topCoords.value*scale + bounds.y)
				: (bounds.height*this.anchor.topCoords.value/100 + bounds.y);
		this.applyStyle('left', left+'px');
		this.applyStyle('top', top+'px');
	}
});

}],'layout/PulldownList/Puller':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/PulldownList/Puller~Puller} kind.
* This module is automatically included by {@link module:layout/PulldownList}.
* @module layout/PulldownList/Puller
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

/**
* Fires when the Puller is created.
*
* @event module:layout/PulldownList/Puller~Puller#onCreate
* @type {Object}
* @public
*/

/**
* {@link module:layout/PulldownList/Puller~Puller} is a control displayed within
* a {@link module:layout/PulldownList~PulldownList} to indicate that the list is
* refreshing in response to a pull-to-refresh action.
*
* @class Puller
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:layout/PulldownList/Puller~Puller.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.Puller',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'enyo-puller',

	/**
	* @lends module:layout/PulldownList/Puller~Puller.prototype
	* @private
	*/
	published: {
		/**
		* Text to display below icon.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		text: '',

		/**
		* CSS classes to apply to the icon control.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		iconClass: ''
	},

	/**
	* @private
	*/
	events: {
		onCreate: ''
	},

	/**
	* @private
	*/
	components: [
		{name: 'icon'},
		{name: 'text', tag: 'span', classes: 'enyo-puller-text'}
	],

	/**
	* @method
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.doCreate();
		this.textChanged();
		this.iconClassChanged();
	},

	/**
	* @private
	*/
	textChanged: function () {
		this.$.text.setContent(this.text);
	},

	/**
	* @private
	*/
	iconClassChanged: function () {
		this.$.icon.setClasses(this.iconClass);
	}
});

}],'layout/Slideable':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/Slideable~Slideable} kind.
* @module layout/Slideable
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	platform = require('enyo/platform'),
	Animator = require('enyo/Animator'),
	Control = require('enyo/Control');

/**
* Fires when the Slideable finishes animating.
*
* @event module:layout/Slideable~Slideable#onAnimateFinish
* @type {enyo.Animator}
* @public
*/

/**
* Fires when the position (i.e., [value]{@link module:layout/Slideable~Slideable#value}) of the
* Slideable changes.
*
* @event module:layout/Slideable~Slideable#onChange
* @type {Object}
* @public
*/

/**
* {@link module:layout/Slideable~Slideable} is a control that may be dragged either horizontally
* or vertically between a minimum and a maximum value. When released from
* dragging, a Slideable will animate to its minimum or maximum position,
* depending on the direction of the drag.
*
* The [min]{@link module:layout/Slideable~Slideable#min} value specifies a position to the left of,
* or above, the initial position, to which the Slideable may be dragged.
* The [max]{@link module:layout/Slideable~Slideable#max} value specifies a position to the right of,
* or below, the initial position, to which the Slideable may be dragged.
* The [value]{@link module:layout/Slideable~Slideable#value} property specifies the current position
* of the Slideable, between the minimum and maximum positions.
*
* `min`, `max`, and `value` may be specified in units of 'px' or '%'.
*
* The [axis]{@link module:layout/Slideable~Slideable#axis} property determines whether the Slideable
* slides left-to-right ('h') or up-and-down ('v').
*
* The following control is placed 90% off the screen to the right, and slides
* to its natural position:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Slideable = require('layout/Slideable');
*
* 	{kind: Slideable, value: -90, min: -90, unit: '%',
* 		classes: 'enyo-fit', style: 'width: 300px;',
* 		components: [
* 			{content: 'stuff'}
* 		]
* 	}
* ```
*
* NOTE: If Slideable is used with [Accessibility]{@link module:enyo/AccessibilitySupport} the focus
* event can cause the screen to scroll as the browser attempts to position the contents on the
* screen. To prevent this, in the container of the Slideable set the `accessibilityPreventScroll`
* property to `true`:
*
* ```javascript
* 	accessibilityPreventScroll: true
* ```
*
* This issue is not unique to Slideable and can occur with other controls that extend beyond the
* viewport.
*
* @class Slideable
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:layout/Slideable~Slideable.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.Slideable',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @lends module:layout/Slideable~Slideable.prototype
	* @private
	*/
	published: {
		/**
		* Direction of sliding; valid values are `'h'` for horizonal or `'v'` for vertical.
		*
		* @type {String}
		* @default 'h'
		* @public
		*/
		axis: 'h',

		/**
		* Current position of the Slideable (a value between
		* [min]{@link module:layout/Slideable~Slideable#min} and [max]{@link module:layout/Slideable~Slideable#max}).
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		value: 0,

		/**
		* Unit for [min]{@link module:layout/Slideable~Slideable#min}, [max]{@link module:layout/Slideable~Slideable#max},
		* and [value]{@link module:layout/Slideable~Slideable#value}; valid values are `'px'` or `'%'`.
		*
		* @type {String}
		* @default  'px'
		* @public
		*/
		unit: 'px',

		/**
		* The minimum value to slide to.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		min: 0,

		/**
		* The maximum value to slide to.
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		max: 0,

		/**
		* When truthy, applies CSS styles to allow GPU compositing of slideable
		* content, if allowed by the platform.
		*
		* @type {String}
		* @default  'auto'
		* @public
		*/
		accelerated: 'auto',

		/**
		* Set to `false` to prevent the Slideable from dragging with elasticity
		* past its [min]{@link module:layout/Slideable~Slideable#min} or [max]{@link module:layout/Slideable~Slideable#max}
		* value.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		overMoving: true,

		/**
		* Indicates whether dragging is allowed. Set to `false` to disable dragging.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		draggable: true
	},

	/**
	* @private
	*/
	events: {
		onAnimateFinish: '',
		onChange: ''
	},

	/**
	* Set to `true` to prevent drag events from bubbling beyond the Slideable.
	*
	* @private
	*/
	preventDragPropagation: false,

	/**
	* @private
	*/
	tools: [
		{kind: Animator, onStep: 'animatorStep', onEnd: 'animatorComplete'}
	],

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
	kDragScalar: 1,

	/**
	* @private
	*/
	dragEventProp: 'dx',

	/**
	* @private
	*/
	unitModifier: false,

	/**
	* @private
	*/
	canTransform: false,

	/**
	* Indicates which property of the drag event is used to position the control.
	*
	* @private
	*/
	dragMoveProp: 'dx',

	/**
	* Indicates which property of the drag event is used to allow dragging.
	*
	* @private
	*/
	shouldDragProp: 'horizontal',

	/**
	* The transform property to modify, provided that
	* [canTransform]{@link module:layout/Slideable~Slideable#canTransform} is `true`.
	*
	* @private
	*/
	transform: 'translateX',

	/**
	* The dimension attribute to modify; will be either `'height'` or `'width'`.
	*
	* @private
	*/
	dimension: 'width',

	/**
	* The position attribute to modify; will be either `'top'` or `'left'`.
	*
	* @private
	*/
	boundary: 'left',

	/**
	* @method
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.acceleratedChanged();
			this.transformChanged();
			this.axisChanged();
			this.valueChanged();
			this.addClass('enyo-slideable');
		};
	}),

	/**
	* @method
	* @private
	*/
	initComponents: kind.inherit(function (sup) {
		return function () {
			this.createComponents(this.tools);
			sup.apply(this, arguments);
		};
	}),

	/**
	* @method
	* @private
	*/
	rendered: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.canModifyUnit();
			this.updateDragScalar();
		};
	}),

	/**
	* @method
	* @private
	*/
	handleResize: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.updateDragScalar();
		};
	}),

	/**
	* If transforms can't be used and inline style is using 'px' while
	* [unit]{@link module:layout/Slideable~Slideable#unit} is `'%'`, this sets the
	* [unitModifier]{@link module:layout/Slideable~Slideable#unitModifier} property to the current
	* value of [dimension]{@link module:layout/Slideable~Slideable#dimension}.
	*
	* @private
	*/
	canModifyUnit: function () {
		if (!this.canTransform) {
			var b = this.getInitialStyleValue(this.hasNode(), this.boundary);
			// If inline style of 'px' exists, while unit is '%'
			if (b.match(/px/i) && (this.unit === '%')) {
				// Set unitModifier - used to over-ride '%'
				this.unitModifier = this.getBounds()[this.dimension];
			}
		}
	},

	/**
	* @private
	*/
	getInitialStyleValue: function (node, boundary) {
		var s = dom.getComputedStyle(node);
		if (s) {
			return s.getPropertyValue(boundary);
		}
		return '0';
	},

	/**
	* @private
	*/
	updateBounds: function (value, dimensions) {
		var bounds = {};
		bounds[this.boundary] = value;
		this.setBounds(bounds, this.unit);

		this.setInlineStyles(value, dimensions);
	},

	/**
	* @private
	*/
	updateDragScalar: function () {
		if (this.unit == '%') {
			var d = this.getBounds()[this.dimension];
			this.kDragScalar = d ? 100 / d : 1;

			if (!this.canTransform) {
				this.updateBounds(this.value, 100);
			}
		}
	},

	/**
	* @private
	*/
	transformChanged: function () {
		this.canTransform = dom.canTransform();
	},

	/**
	* @private
	*/
	acceleratedChanged: function () {
		if (!platform.android || platform.android <= 2) {
			dom.accelerate(this, this.accelerated);
		}
	},

	/**
	* @private
	*/
	axisChanged: function () {
		var h = this.axis == 'h';
		this.dragMoveProp = h ? 'dx' : 'dy';
		this.shouldDragProp = h ? 'horizontal' : 'vertical';
		this.transform = h ? 'translateX' : 'translateY';
		this.dimension = h ? 'width' : 'height';
		this.boundary = h ? 'left' : 'top';
	},

	/**
	* @private
	*/
	setInlineStyles: function (value, dimensions) {
		var inBounds = {};

		if (this.unitModifier) {
			inBounds[this.boundary] = this.percentToPixels(value, this.unitModifier);
			inBounds[this.dimension] = this.unitModifier;
			this.setBounds(inBounds);
		} else {
			if (dimensions) {
				inBounds[this.dimension] = dimensions;
			} else {
				inBounds[this.boundary] = value;
			}
			this.setBounds(inBounds, this.unit);
		}
	},

	/**
	* @fires module:layout/Slideable~Slideable#onChange
	* @private
	*/
	valueChanged: function (last) {
		var v = this.value;
		if (this.isOob(v) && !this.isAnimating()) {
			this.value = this.overMoving ? this.dampValue(v) : this.clampValue(v);
		}
		// FIXME: android cannot handle nested compositing well so apply acceleration only if needed
		// desktop chrome doesn't like this code path so avoid...
		if (platform.android > 2) {
			if (this.value) {
				if (last === 0 || last === undefined) {
					dom.accelerate(this, this.accelerated);
				}
			} else {
				dom.accelerate(this, false);
			}
		}

		// If platform supports transforms
		if (this.canTransform) {
			dom.transformValue(this, this.transform, this.value + this.unit);
		// else update inline styles
		} else {
			this.setInlineStyles(this.value, false);
		}
		this.doChange();
	},

	/**
	* @private
	*/
	getAnimator: function () {
		return this.$.animator;
	},

	/**
	* @private
	*/
	isAtMin: function () {
		return this.value <= this.calcMin();
	},

	/**
	* @private
	*/
	isAtMax: function () {
		return this.value >= this.calcMax();
	},

	/**
	* @private
	*/
	calcMin: function () {
		return this.min;
	},

	/**
	* @private
	*/
	calcMax: function () {
		return this.max;
	},

	/**
	* @private
	*/
	clampValue: function (value) {
		var min = this.calcMin();
		var max = this.calcMax();
		return Math.max(min, Math.min(value, max));
	},

	/**
	* @private
	*/
	dampValue: function (value) {
		return this.dampBound(this.dampBound(value, this.min, 1), this.max, -1);
	},

	/**
	* @private
	*/
	dampBound: function (value, boundary, sign) {
		var v = value;
		if (v * sign < boundary * sign) {
			v = boundary + (v - boundary) / 4;
		}
		return v;
	},

	/**
	* Calculates the pixel value corresponding to the specified `percent` and
	* `dimension`.
	*
	* @param  {Number} percent
	* @param  {Number} dimension
	*
	* @return {Number}
	* @private
	*/
	percentToPixels: function (percent, dimension) {
		return Math.floor((dimension / 100) * percent);
	},

	/**
	* @private
	*/
	pixelsToPercent: function (value) {
		var boundary = this.unitModifier ? this.getBounds()[this.dimension] : this.container.getBounds()[this.dimension];
		return (value / boundary) * 100;
	},

	/**
	* @private
	*/
	shouldDrag: function (event) {
		return this.draggable && event[this.shouldDragProp];
	},

	/**
	* Determines whether the specified value is out of bounds (i.e., greater than
	* [max]{@link module:layout/Slideable~Slideable#max} or less than [min]{@link module:layout/Slideable~Slideable#min}).
	*
	* @param {Number} value - The value to check.
	* @return {Boolean} `true` if `value` is out of bounds; otherwise, `false`.
	* @private
	*/
	isOob: function (value) {
		return value > this.calcMax() || value < this.calcMin();
	},

	/**
	* @private
	*/
	dragstart: function (sender, event) {
		if (this.shouldDrag(event)) {
			event.preventDefault();
			this.$.animator.stop();
			event.dragInfo = {};
			this.dragging = true;
			this.drag0 = this.value;
			this.dragd0 = 0;
			return this.preventDragPropagation;
		}
	},

	/**
	* Updates [value]{@link module:layout/Slideable~Slideable#value} during a drag and determines the
	* direction of the drag.
	*
	* @private
	*/
	drag: function (sender, event) {
		if (this.dragging) {
			event.preventDefault();
			var d = this.canTransform ? event[this.dragMoveProp] * this.kDragScalar : this.pixelsToPercent(event[this.dragMoveProp]);
			var v = this.drag0 + d;
			var dd = d - this.dragd0;
			this.dragd0 = d;
			if (dd) {
				event.dragInfo.minimizing = dd < 0;
			}
			this.setValue(v);
			return this.preventDragPropagation;
		}
	},

	/**
	* @private
	*/
	dragfinish: function (sender, event) {
		if (this.dragging) {
			this.dragging = false;
			this.completeDrag(event);
			event.preventTap();
			return this.preventDragPropagation;
		}
	},

	/**
	* Animates the control to either the [min]{@link module:layout/Slideable~Slideable#min} or
	* [max]{@link module:layout/Slideable~Slideable#max} value when dragging completes, based on the
	* direction of the drag (determined in [drag()]{@link module:layout/Slideable~Slideable#drag}).
	*
	* @private
	*/
	completeDrag: function (event) {
		if (this.value !== this.calcMax() && this.value != this.calcMin()) {
			this.animateToMinMax(event.dragInfo.minimizing);
		}
	},

	/**
	* @private
	*/
	isAnimating: function () {
		return this.$.animator.isAnimating();
	},

	/**
	* @private
	*/
	play: function (start, end) {
		this.$.animator.play({
			startValue: start,
			endValue: end,
			node: this.hasNode()
		});
	},

	/**
	* Animates to the given value.
	*
	* @param   {Number} value - The value to animate to.
	* @public
	*/
	animateTo: function (value) {
		this.play(this.value, value);
	},

	/**
	* Animates to the [minimum]{@link module:layout/Slideable~Slideable#min} value.
	*
	* @public
	*/
	animateToMin: function () {
		this.animateTo(this.calcMin());
	},

	/**
	* Animates to the [maximum]{@link module:layout/Slideable~Slideable#max} value.
	*
	* @public
	*/
	animateToMax: function () {
		this.animateTo(this.calcMax());
	},

	/**
	* Helper method to toggle animation to either the [min]{@link module:layout/Slideable~Slideable#min}
	* or [max]{@link module:layout/Slideable~Slideable#max} value.
	*
	* @param  {Boolean} min - Whether to animate to the minimum value.
	* @private
	*/
	animateToMinMax: function (min) {
		if (min) {
			this.animateToMin();
		} else {
			this.animateToMax();
		}
	},

	/**
	* Updates the [value]{@link module:layout/Slideable~Slideable#value} property during animation.
	*
	* @private
	*/
	animatorStep: function (sender) {
		this.setValue(sender.value);
		return true;
	},

	/**
	* @fires module:layout/Slideable~Slideable#onAnimateFinish
	* @private
	*/
	animatorComplete: function (sender) {
		this.doAnimateFinish(sender);
		return true;
	},

	/**
	* Toggles animation to either the [min]{@link module:layout/Slideable~Slideable#min} or
	* [max]{@link module:layout/Slideable~Slideable#max} value.
	*
	* @public
	*/
	toggleMinMax: function () {
		this.animateToMinMax(!this.isAtMin());
	}
});

}],'layout/FittableColumns':[function (module,exports,global,require,request){
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

},{'./FittableLayout':'layout/FittableLayout'}],'layout/FittableRows':[function (module,exports,global,require,request){
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

},{'./FittableLayout':'layout/FittableLayout'}],'layout/FittableHeaderLayout':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/FittableHeaderLayout~FittableHeaderLayout} kind.
* @module layout/FittableHeaderLayout
*/

var
	kind = require('enyo/kind');

var
	FittableLayout = require('./FittableLayout'),
	FittableColumnsLayout = FittableLayout.Columns;

/**
* {@link module:layout/FittableHeaderLayout~FittableHeaderLayout} extends {@link module:layout/FittableLayout~FittableColumnsLayout},
* providing a container in which items are laid out in a set of vertical columns,
* with most items having natural size, but one expanding to fill the remaining
* space. The one that expands is labeled with the attribute `fit: true`.
*
* For more information, see the documentation on
* [Fittables]{@linkplain $dev-guide/building-apps/layout/fittables.html} in the
* Enyo Developer Guide.
*
* @class FittableHeaderLayout
* @extends module:layout/FittableColumnsLayout~FittableColumnsLayout
* @public
*/
module.exports = kind(/** @lends module:layout/FittableHeaderLayout~FittableHeaderLayout.prototype */{

	/**
	* @private
	*/
	name: 'enyo.FittableHeaderLayout',

	/**
	* @private
	*/
	kind: FittableColumnsLayout,

	/**
	* @private
	*/
	applyFitSize: function(measure, total, before, after) {
		var padding = before - after;
		var f = this.getFitControl();

		if (padding < 0) {
			f.applyStyle('padding-left', Math.abs(padding) + 'px');
			f.applyStyle('padding-right', null);
		} else if (padding > 0) {
			f.applyStyle('padding-left', null);
			f.applyStyle('padding-right', Math.abs(padding) + 'px');
		} else {
			f.applyStyle('padding-left', null);
			f.applyStyle('padding-right', null);
		}

		FittableColumnsLayout.prototype.applyFitSize.apply(this, arguments);
	}
});

},{'./FittableLayout':'layout/FittableLayout'}],'layout/Node':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/Node~Node} kind.
* @module layout/Node
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control'),
	Img = require('enyo/Image');

/**
* Fires when the Node is tapped. No additional data is sent with this event.
*
* @event module:layout/Node~Node#onNodeTap
* @type {Object}
* @public
*/

/**
* Fires when the Node is double-clicked. No additional data is sent with this event.
*
* @event module:layout/Node~Node#onNodeDblClick
* @type {Object}
* @public
*/

/**
* Fires when the Node expands or contracts, as indicated by the
* `expanded` property in the event data.
*
* @event module:layout/Node~Node#onExpand
* @type {Object}
* @property {Boolean} expanded - `true` if the node is currently expanded;
* otherwise, `false`.
* @public
*/

/**
* Fires when the Node is destroyed. No additional data is sent with this event.
*
* @event module:layout/Node~Node#onDestroyed
* @type {Object}
* @public
*/

/**
* {@link module:layout/Node~Node} is a control that creates structured trees based on Enyo's child
* component hierarchy format, e.g.:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Node = require('layout/Node');
*
* 	{kind: Node, icon: 'layout/src/assets/folder-open.png', content: 'Tree',
* 		expandable: true, expanded: true, components: [
* 			{icon: 'layout/src/assets/file.png', content: 'Alpha'},
* 			{icon: 'layout/src/assets/folder-open.png', content: 'Bravo',
* 				expandable: true, expanded: false, components: [
* 					{icon: 'layout/src/assets/file.png', content: 'Bravo-Alpha'},
* 					{icon: 'layout/src/assets/file.png', content: 'Bravo-Bravo'},
* 					{icon: 'layout/src/assets/file.png', content: 'Bravo-Charlie'}
* 					]
* 				]
* 			}
* 		]
* 	}
* ```
*
* The default kind of components within a node is itself {@link module:layout/Node~Node}, so only
* the top-level node of the tree needs to be explicitly defined as such.
*
* When an expandable tree node expands, an [onExpand]{@link module:layout/Node~Node#onExpand}
* event is sent; when it is tapped, an [onNodeTap]{@link module:layout/Node~Node#onNodeTap}
* event is sent.
*
* When the optional [onlyIconExpands]{@link module:layout/Node~Node#onlyIconExpands} property is
* set to `true`, expandable nodes may only be opened by tapping the icon; tapping the
* content label will fire the `onNodeTap` event, but will not expand the node.
*
* @class Node
* @extends module:enyo/Control~Control
* @ui
* @public
*/
var TreeNode = module.exports = kind(
	/** @lends module:layout/Node~Node.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.Node',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @lends module:layout/Node~Node.prototype
	* @private
	*/
	published: {
		/***
		* Indicates whether the Node is expandable and has child branches.
		*
		* @type {Boolean}
		* @default  false
		* @public
		*/
		expandable: false,

		/**
		* Indicates whether the Node is currently expanded (open).
		*
		* @type {Boolean}
		* @default  false
		* @public
		*/
		expanded: false,

		/**
		* Path to an image to be used as the icon for this Node.
		*
		* @type {String}
		* @default  ''
		* @public
		*/
		icon: '',

		/**
		* Optional flag that, when `true`, causes the Node to expand only when
		* the icon is tapped (not when the contents are tapped).
		*
		* @type {Boolean}
		*/
		onlyIconExpands: false,

		/**
		* If `true`, adds the `'enyo-selected'` CSS class; changing value from `true`
		* to `false` removes the class.
		*
		* @type {Boolean}
		* @default  false
		* @public
		*/
		selected: false
	},

	/**
	* @todo remove inline styles
	* @private
	*/
	style: 'padding: 0 0 0 16px;',

	/**
	* @private
	*/
	content: 'Node',

	/**
	* @private
	*/
	defaultKind: null, // set after the fact

	/**
	* @private
	*/
	classes: 'enyo-node',

	/**
	* @private
	*/
	components: [
		{name: 'icon', kind: Img, showing: false},
		{name: 'caption', kind: Control, Xtag: 'span', style: 'display: inline-block; padding: 4px;', allowHtml: true},
		{name: 'extra', kind: Control, tag: 'span', allowHtml: true}
	],

	/**
	* @private
	*/
	childClient: [
		{name: 'box', kind: Control, classes: 'enyo-node-box', Xstyle: 'border: 1px solid orange;', components: [
			{name: 'client', kind: Control, classes: 'enyo-node-client', Xstyle: 'border: 1px solid lightblue;'}
		]}
	],

	/**
	* @private
	*/
	handlers: {
		ondblclick: 'dblclick'
	},

	/**
	* @private
	*/
	events: {
		onNodeTap: 'nodeTap',
		onNodeDblClick: 'nodeDblClick',
		onExpand: 'nodeExpand',
		onDestroyed: 'nodeDestroyed'
	},

	/**
	* @method
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			//this.expandedChanged();
			//this.levelChanged();
			this.selectedChanged();
			this.iconChanged();
		};
	}),

	/**
	* @method
	* @fires module:layout/Node~Node#onDestroyed
	* @private
	*/
	destroy: kind.inherit(function (sup) {
		return function () {
			this.doDestroyed();
			sup.apply(this, arguments);
		};
	}),

	/**
	* @method
	* @private
	*/
	initComponents: kind.inherit(function (sup) {
		return function () {
			// TODO: optimize to create the childClient on demand
			//this.hasChildren = this.components;
			if (this.expandable) {
				this.kindComponents = this.kindComponents.concat(this.childClient);
			}
			sup.apply(this, arguments);
		};
	}),

	/**
	* @private
	*/
	contentChanged: function () {
		//this.$.caption.setContent((this.expandable ? (this.expanded ? '-' : '+') : '') + this.content);
		this.$.caption.setContent(this.content);
	},

	/**
	* @private
	*/
	iconChanged: function () {
		this.$.icon.setSrc(this.icon);
		this.$.icon.setShowing(Boolean(this.icon));
	},

	/**
	* @private
	*/
	selectedChanged: function () {
		this.addRemoveClass('enyo-selected', this.selected);
	},

	/**
	* @method
	* @private
	*/
	rendered: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			if (this.expandable && !this.expanded) {
				this.quickCollapse();
			}
		};
	}),

	/**
	* Adds nodes as children of this control.
	*
	* @param {Object[]} nodes - An array of component configurations.
	* @public
	*/
	addNodes: function (nodes) {
		this.destroyClientControls();
		for (var i=0, n; (n=nodes[i]); i++) {
			this.createComponent(n);
		}
		this.$.client.render();
	},

	/**
	* Adds new Nodes as children of this Node; each value in the `nodes` array
	* becomes the content of a new child Node.
	*
	* @param {String[]} nodes - An array of strings.
	* @public
	*/
	addTextNodes: function (nodes) {
		this.destroyClientControls();
		for (var i=0, n; (n=nodes[i]); i++) {
			this.createComponent({content: n});
		}
		this.$.client.render();
	},

	/**
	* @fires module:layout/Node~Node#onNodeTap
	* @private
	*/
	tap: function (sender, event) {
		if(!this.onlyIconExpands) {
			this.toggleExpanded();
			this.doNodeTap();
		} else {
			if((event.target==this.$.icon.hasNode())) {
				this.toggleExpanded();
			} else {
				this.doNodeTap();
			}
		}
		return true;
	},

	/**
	* @fires module:layout/Node~Node#onNodeDblClick
	* @private
	*/
	dblclick: function (sender, event) {
		this.doNodeDblClick();
		return true;
	},

	/**
	* Toggles the value of [expanded]{@link module:layout/Node~Node#expanded}.
	*
	* @public
	*/
	toggleExpanded: function () {
		this.setExpanded(!this.expanded);
	},

	/**
	* Immediately collapses the control's children.
	*
	* @private
	*/
	quickCollapse: function () {
		this.removeClass('enyo-animate');
		this.$.box.applyStyle('height', '0');
		var h = this.$.client.getBounds().height;
		this.$.client.setBounds({top: -h});
	},

	/**
	* Animates the expansion (using CSS transitions).
	*
	* @private
	*/
	_expand: function () {
		this.addClass('enyo-animate');
		var h = this.$.client.getBounds().height;
		this.$.box.setBounds({height: h});
		this.$.client.setBounds({top: 0});
		setTimeout(this.bindSafely(function () {
			// things may have happened in the interim, make sure
			// we only fix height if we are still expanded
			if (this.expanded) {
				this.removeClass('enyo-animate');
				this.$.box.applyStyle('height', 'auto');
			}
		}), 225);
	},

	/**
	* Animates the collapsing (using CSS transitions).
	*
	* @private
	*/
	_collapse: function () {
		// disable transitions
		this.removeClass('enyo-animate');
		// fix the height of our box (rather than 'auto'), this
		// gives webkit something to lerp from
		var h = this.$.client.getBounds().height;
		this.$.box.setBounds({height: h});
		// yield the thead so DOM can make those changes (without transitions)
		setTimeout(this.bindSafely(function () {
			// enable transitions
			this.addClass('enyo-animate');
			// shrink our box to 0
			this.$.box.applyStyle('height', '0');
			// slide the contents up
			this.$.client.setBounds({top: -h});
		}), 25);
	},

	/**
	* @fires module:layout/Node~Node#onExpand
	* @private
	*/
	expandedChanged: function (old) {
		if (!this.expandable) {
			this.expanded = false;
		} else {
			var event = {expanded: this.expanded};
			this.doExpand(event);
			if (!event.wait) {
				this.effectExpanded();
			}
		}
	},

	/**
	* @private
	*/
	effectExpanded: function () {
		if (this.$.client) {
			if (!this.expanded) {
				this._collapse();
			} else {
				this._expand();
			}
		}
		//this.contentChanged();
	}
});

TreeNode.prototype.defaultKind = TreeNode;

}],'layout/PanZoomView':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/PanZoomView~PanZoomView} kind.
* @module layout/PanZoomView
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	utils = require('enyo/utils'),
	Animator = require('enyo/Animator'),
	Scroller = require('enyo/Scroller');

/**
* Fires whenever the user adjusts the zoom via double-tap/double-click, mousewheel,
* or pinch-zoom.
*
* @event module:layout/PanZoomView~PanZoomView#onZoom
* @type {Object}
* @property {Number} scale - The new scaling factor.
* @public
*/

/**
* Fires after a zoom to notify children to position non-zooming controls.
*
* @event module:layout/PanZoomView~PanZoomView#onPositionPin
* @type {Object}
* @property {Numer} scale   - The new scaling factor.
* @property {Object} bounds - An object containing the current viewport bounds.
* @public
*/

/**
* {@link module:layout/PanZoomView~PanZoomView} is a control that displays arbitrary content at a given
* scaling factor, with enhanced support for double-tap/double-click to zoom,
* panning, mousewheel zooming and pinch-zoom (on touchscreen devices that
* support it).
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		PanZoomView = require('layout/PanZoomView');
*
* 	{kind: PanZoomView, scale: 'auto', contentWidth: 500, contentHeight: 500,
* 		style: 'width: 500px; height: 400px;',
* 		components: [{content: 'Hello World'}]
* 	}
* ```
*
* An [onZoom]{@link module:layout/PanZoomView~PanZoomView#onZoom} event is triggered when the
* user changes the zoom level.
*
* If you wish, you may add {@link module:enyo/ScrollThumb~ScrollThumb} indicators, disable zoom
* animation, allow panning overscroll (with a bounce-back effect), and control
* the propagation of drag events, all via Boolean properties.
*
* For the PanZoomView to work, you must either specify the width and height of
* the scaled content (via the `contentWidth` and `contentHeight` properties) or
* bubble an `onSetDimensions` event from one of the underlying components.
*
* Note that it's best to specify a size for the PanZoomView in order to avoid
* complications.
*
* @class PanZoomView
* @extends module:enyo/Scroller~Scroller
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:layout/PanZoomView~PanZoomView.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.PanZoomView',

	/**
	* @private
	*/
	kind: Scroller,

	/**
	* If `true`, allows overscrolling during panning, with a bounce-back effect.
	*
	* @type {Boolean}
	* @default false
	* @see {@link module:enyo/Scroller~Scroller#touchOverscroll}
	* @public
	*/
	touchOverscroll: false,

	/**
	* If `true`, a ScrollThumb is used to indicate scroll position/bounds.
	*
	* @type {Boolean}
	* @default false
	* @see {@link module:enyo/Scroller~Scroller#thumb}
	* @public
	*/
	thumb: false,

	/**
	* If `true` (the default), animates the zoom action triggered by a double-tap
	* (or double-click).
	*
	* @type {Boolean}
	* @default true
	* @see {@link module:enyo/Scroller~Scroller#animate}
	* @public
	*/
	animate: true,

	/**
	* If `true` (the default), allows propagation of vertical drag events when
	* already at the top or bottom of the pannable area.
	*
	* @type {Boolean}
	* @default true
	* @see {@link module:enyo/Scroller~Scroller#verticalDragPropagation}
	* @public
	*/
	verticalDragPropagation: true,

	/**
	* If `true` (the default), allows propagation of horizontal drag events when
	* already at the left or right edge of the pannable area.
	*
	* @type {Boolean}
	* @default true
	* @see {@link module:enyo/Scroller~Scroller#horizontalDragPropagation}
	* @public
	*/
	horizontalDragPropagation: true,

	/**
	* @lends module:layout/PanZoomViews~PanZoomViews.prototype
	* @public
	*/
	published: {
		/**
		* The scale at which the content should be displayed. This may be any
		* positive numeric value or one of the following key words (which will
		* be resolved to a value dynamically):
		*
		* * `'auto'`: Fits the content to the size of the PanZoomView.
		* * `'width'`: Fits the content to the width of the PanZoomView.
		* * `'height'`: Fits the content to the height of the PanZoomView.
		* * `'fit'`: Fits the content to the height and width of the PanZoomView; the
		* 	overflow of the larger dimension is cropped and the content is centered
		* 	along that axis.
		*
		* @type {String}
		* @default 'auto'
		* @public
		*/
		scale: 'auto',

		/**
		* If `true`, zoom functionality is disabled.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disableZoom: false,

		/**
		* Width of the scaled content.
		*
		* @type {Number}
		* @default null
		* @private
		*/
		contentWidth: null,

		/**
		* Height of the scaled content.
		*
		* @type {Number}
		* @default null
		* @public
		*/
		contentHeight: null
	},

	/**
	* @private
	*/
	events: {
		onZoom: ''
	},

	/**
	* @private
	*/
	touch: true,

	/**
	* @private
	*/
	preventDragPropagation: false,

	/**
	* @private
	*/
	handlers: {
		ondragstart: 'dragPropagation',
		onSetDimensions: 'setDimensions'
	},

	/**
	* @private
	*/
	components: [
		{name: 'animator', kind: Animator, onStep: 'zoomAnimationStep', onEnd: 'zoomAnimationEnd'},
		{name: 'viewport', style: 'overflow:hidden;min-height:100%;min-width:100%;', classes: 'enyo-fit', ongesturechange: 'gestureTransform', ongestureend: 'saveState', ontap: 'singleTap', onmousewheel: 'mousewheel', ondown: 'handleDown', components: [
			{name: 'content'}
		]}
	],

	/**
	* @method
	* @private
	*/
	create: function () {
		// remember scale keyword
		this.scaleKeyword = this.scale;

		// Cache instance components
		var instanceComponents = this.components;
		this.components = [];
		Scroller.prototype.create.apply(this, arguments);
		this.$.content.applyStyle('width', this.contentWidth + 'px');
		this.$.content.applyStyle('height', this.contentHeight + 'px');

		if (this.unscaledComponents){
			var owner = this.hasOwnProperty('unscaledComponents') ? this.getInstanceOwner() : this;
			this.createComponents(this.unscaledComponents, {owner: owner});
		}

		// Change controlParentName so PanZoomView instance components are created into viewport
		this.controlParentName = 'content';
		this.discoverControlParent();
		this.createComponents(instanceComponents);

		this.canTransform = dom.canTransform();
		if (!this.canTransform) {
			this.$.content.applyStyle('position', 'relative');
		}
		this.canAccelerate = dom.canAccelerate();

		//	For panzoomview, disable drags during gesture (to fix flicker: ENYO-1208)
		this.getStrategy().setDragDuringGesture(false);
	},

	/**
	* @method
	* @private
	*/
	rendered: function () {
		Scroller.prototype.rendered.apply(this, arguments);
		this.getOriginalScale();
	},

	/**
	* @private
	*/
	dragPropagation: function (sender, event) {
		// Propagate drag events at the edges of the content as desired by the
		// verticalDragPropagation and horizontalDragPropagation properties
		var bounds = this.getStrategy().getScrollBounds();
		var verticalEdge = ((bounds.top===0 && event.dy>0) || (bounds.top>=bounds.maxTop-2 && event.dy<0));
		var horizontalEdge = ((bounds.left===0 && event.dx>0) || (bounds.left>=bounds.maxLeft-2 && event.dx<0));
		return !((verticalEdge && this.verticalDragPropagation) || (horizontalEdge && this.horizontalDragPropagation));
	},

	/**
	* @private
	*/
	mousewheel: function (sender, event) {
		event.pageX |= (event.clientX + event.target.scrollLeft);
		event.pageY |= (event.clientY + event.target.scrollTop);
		var zoomInc = (this.maxScale - this.minScale)/10;
		var oldScale = this.scale;
		if ((event.wheelDelta > 0) || (event.detail < 0)) { //zoom in
			this.scale = this.limitScale(this.scale + zoomInc);
		} else if ((event.wheelDelta < 0) || (event.detail > 0)) { //zoom out
			this.scale = this.limitScale(this.scale - zoomInc);
		}
		this.eventPt = this.calcEventLocation(event);
		this.transform(this.scale);
		if (oldScale != this.scale) {
			this.doZoom({scale:this.scale});
		}
		this.ratioX = this.ratioY = null;
		// Prevent default scroll wheel action and prevent event from bubbling up to to touch scroller
		event.preventDefault();
		return true;
	},

	/**
	* Ensure that hold is canceled onMove (vs onLeave) so drag event occur as expected
	*
	* @private
	*/
	handleDown: function (sender, event) {
		event.configureHoldPulse({
			endHold: 'onMove'
		});
	},

	/**
	* @method
	* @private
	*/
	handleResize: function () {
		Scroller.prototype.handleResize.apply(this, arguments);
		this.scaleChanged();
	},

	/**
	* @private
	*/
	setDimensions: function (sender, event) {
		this.$.content.applyStyle('width', event.width + 'px');
		this.$.content.applyStyle('height', event.height + 'px');
		this.originalWidth = event.width;
		this.originalHeight = event.height;
		this.scale = this.scaleKeyword;
		this.scaleChanged();
		return true;
	},

	/**
	* Caches the initial height and width of the component (in `originalHeight`
	* and `originalWidth`, respectively) at render time.
	*
	* @private
	*/
	getOriginalScale : function () {
		if (this.$.content.hasNode()){
			this.originalWidth  = this.$.content.node.clientWidth;
			this.originalHeight = this.$.content.node.clientHeight;
			this.scale = this.scaleKeyword;
			this.scaleChanged();
		}
	},

	/**
	* Calculates the `minScale` and `maxScale` and zooms the content according to the
	* clamped scale value.
	*
	* @private
	*/
	scaleChanged: function () {
		var containerNode = this.hasNode();
		if (containerNode) {
			this.containerWidth = containerNode.clientWidth;
			this.containerHeight = containerNode.clientHeight;
			var widthScale = this.containerWidth / this.originalWidth;
			var heightScale = this.containerHeight / this.originalHeight;
			this.minScale = Math.min(widthScale, heightScale);
			this.maxScale = (this.minScale*3 < 1) ? 1 : this.minScale*3;
			//resolve any keyword scale values to solid numeric values
			if (this.scale == 'auto') {
				this.scale = this.minScale;
			} else if (this.scale == 'width') {
				this.scale = widthScale;
			} else if (this.scale == 'height') {
				this.scale = heightScale;
			} else if (this.scale == 'fit') {
				this.fitAlignment = 'center';
				this.scale = Math.max(widthScale, heightScale);
			} else {
				this.maxScale = Math.max(this.maxScale, this.scale);
				this.scale = this.limitScale(this.scale);
			}
		}
		this.eventPt = this.calcEventLocation();
		this.transform(this.scale);
		// start scroller
		if (this.getStrategy().$.scrollMath) {
			this.getStrategy().$.scrollMath.start();
		}
		this.align();
	},

	/**
	* Centers the content in the scroller.
	*
	* @private
	*/
	align: function () {
		if (this.fitAlignment && this.fitAlignment === 'center') {
			var sb = this.getScrollBounds();
			this.setScrollLeft(sb.maxLeft / 2);
			this.setScrollTop(sb.maxTop / 2);
		}
	},

	/**
	* @private
	*/
	gestureTransform: function (sender, event) {
		this.eventPt = this.calcEventLocation(event);
		this.transform(this.limitScale(this.scale * event.scale));
	},

	/**
	* Determines the target coordinates on the PanZoomView from an event.
	*
	* @private
	*/
	calcEventLocation: function (event) {
		var eventPt = {x: 0, y:0};
		if (event && this.hasNode()) {
			var rect = this.node.getBoundingClientRect();
			eventPt.x = Math.round((event.pageX - rect.left) - this.bounds.x);
			eventPt.x = Math.max(0, Math.min(this.bounds.width, eventPt.x));
			eventPt.y = Math.round((event.pageY - rect.top) - this.bounds.y);
			eventPt.y = Math.max(0, Math.min(this.bounds.height, eventPt.y));
		}
		return eventPt;
	},

	/**
	* Scales the content.
	*
	* @param {Number} scale - The scaling factor.
	* @private
	*/
	transform: function (scale) {
		this.tapped = false;

		var prevBounds = this.bounds || this.innerBounds(scale);
		this.bounds = this.innerBounds(scale);

		//style cursor if needed to indicate the content is movable
		if (this.scale>this.minScale) {
			this.$.viewport.applyStyle('cursor', 'move');
		} else {
			this.$.viewport.applyStyle('cursor', null);
		}
		this.$.viewport.setBounds({width: this.bounds.width + 'px', height: this.bounds.height + 'px'});

		//determine the exact ratio where on the content was tapped
		this.ratioX = this.ratioX || (this.eventPt.x + this.getScrollLeft()) / prevBounds.width;
		this.ratioY = this.ratioY || (this.eventPt.y + this.getScrollTop()) / prevBounds.height;
		var scrollLeft, scrollTop;
		if (this.$.animator.ratioLock) { //locked for smartzoom
			scrollLeft = (this.$.animator.ratioLock.x * this.bounds.width) - (this.containerWidth / 2);
			scrollTop = (this.$.animator.ratioLock.y * this.bounds.height) - (this.containerHeight / 2);
		} else {
			scrollLeft = (this.ratioX * this.bounds.width) - this.eventPt.x;
			scrollTop = (this.ratioY * this.bounds.height) - this.eventPt.y;
		}
		scrollLeft = Math.max(0, Math.min((this.bounds.width - this.containerWidth), scrollLeft));
		scrollTop = Math.max(0, Math.min((this.bounds.height - this.containerHeight), scrollTop));

		if (this.canTransform) {
			var params = {scale: scale};
			// translate needs to be first, or scale and rotation will not be in the correct spot
			if (this.canAccelerate) {
				//translate3d rounded values to avoid distortion; ref: http://martinkool.com/post/27618832225/beware-of-half-pixels-in-css
				params = utils.mixin({translate3d: Math.round(this.bounds.left) + 'px, ' + Math.round(this.bounds.top) + 'px, 0px'}, params);
			} else {
				params = utils.mixin({translate: this.bounds.left + 'px, ' + this.bounds.top + 'px'}, params);
			}
			dom.transform(this.$.content, params);
		} else {
			// ...no transforms means there's nothin' I can do.
		}

		//adjust scroller to new position that keeps ratio with the new content size
		this.setScrollLeft(scrollLeft);
		this.setScrollTop(scrollTop);

		this.positionClientControls(scale);

		//this.stabilize();
	},

	/**
	* Clamps the scaling factor between `minScale` and `maxScale`.
	*
	* @private
	*/
	limitScale: function (scale) {
		if (this.disableZoom) {
			scale = this.scale;
		} else if (scale > this.maxScale) {
			scale = this.maxScale;
		} else if (scale < this.minScale) {
			scale = this.minScale;
		}
		return scale;
	},

	/**
	* Calculates the offsets for the content for the given scaling factor.
	*
	* @param {Number} scale - The scaling factor.
	* @return {Object}      - Object containing offsets for content (in its `left`, `top`,
	* `width`, `height`, `x`, and `y` properties).
	* @private
	*/
	innerBounds: function (scale) {
		var width = this.originalWidth * scale;
		var height = this.originalHeight * scale;
		var offset = {x:0, y:0, transX:0, transY:0};
		if (width < this.containerWidth) {
			offset.x += (this.containerWidth - width)/2;
		}
		if (height < this.containerHeight) {
			offset.y += (this.containerHeight - height)/2;
		}
		if (this.canTransform) { //adjust for the css translate, which doesn't alter content offsetWidth and offsetHeight
			offset.transX -= (this.originalWidth - width)/2;
			offset.transY -= (this.originalHeight - height)/2;
		}
		return {left:offset.x + offset.transX, top:offset.y + offset.transY, width:width, height:height, x:offset.x, y:offset.y};
	},

	/**
	* Persists the scaling factor when a gesture finishes.
	*
	* @fires module:layout/PanZoomView~PanZoomView#onZoom
	* @private
	*/
	saveState: function (sender, event) {
		var oldScale = this.scale;
		this.scale *= event.scale;
		this.scale = this.limitScale(this.scale);
		if (oldScale != this.scale) {
			this.doZoom({scale:this.scale});
		}
		this.ratioX = this.ratioY = null;
	},

	/**
	* Simulates double-tap by watching for two taps within 300ms of each other.
	*
	* @private
	*/
	singleTap: function (sender, event) {
		setTimeout(this.bindSafely(function () {
			this.tapped = false;
		}), 300);
		if (this.tapped) { //dbltap
			this.tapped = false;
			this.smartZoom(sender, event);
		} else {
			this.tapped = true;
		}
	},

	/**
	* Zooms at the event location.
	*
	* @private
	*/
	smartZoom: function (sender, event) {
		var containerNode = this.hasNode();
		var imgNode = this.$.content.hasNode();
		if (containerNode && imgNode && this.hasNode() && !this.disableZoom) {
			var prevScale = this.scale;
			if (this.scale != this.minScale) { //zoom out
				this.scale = this.minScale;
			} else { //zoom in
				this.scale = this.maxScale;
			}
			this.eventPt = this.calcEventLocation(event);
			if (this.animate) {
				//lock ratio position of event, and animate the scale change
				var ratioLock = {
					x: ((this.eventPt.x + this.getScrollLeft()) / this.bounds.width),
					y: ((this.eventPt.y + this.getScrollTop()) / this.bounds.height)
				};
				this.$.animator.play({
					duration: 350,
					ratioLock: ratioLock,
					baseScale: prevScale,
					deltaScale: this.scale - prevScale
				});
			} else {
				this.transform(this.scale);
				this.doZoom({scale:this.scale});
			}
		}
	},

	/**
	* @private
	*/
	zoomAnimationStep: function (inSender, inEvent) {
		var currScale = this.$.animator.baseScale + (this.$.animator.deltaScale * this.$.animator.value);
		this.transform(currScale);
		return true;
	},

	/**
	* @private
	*/
	zoomAnimationEnd: function (inSender, inEvent) {
		this.stabilize();
		this.doZoom({scale:this.scale});
		this.$.animator.ratioLock = undefined;
		return true;
	},

	/**
	* @fires module:layout/PanZoomView~PanZoomView#onPositionPin
	* @private
	*/
	positionClientControls: function (scale) {
		this.waterfallDown('onPositionPin', {
			scale: scale,
			bounds: this.bounds
		});
	}
});

}],'layout/List':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/List~List} kind.
* @module layout/List
*/

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	Scroller = require('enyo/Scroller');

var
	FlyweightRepeater = require('layout/FlyweightRepeater');

var
	methods = require('./methods');

/**
* A collection of useful metrics about a page.
*
* @typedef {Object} module:layout/List~List~PageInfo
* @property {Number} no       - The page number.
* @property {Number} size     - The page size.
* @property {Number} pos      - The page position.
* @property {Number} startRow - The index of the page's first row.
* @property {Number} endRow   - The index of the page's last row.
*/

/**
* Fires once per row at render time.
*
* @event module:layout/List~List#onSetupItem
* @type {Object}
* @property {Number} index - The current row index.
* @public
*/

/**
* Fires when reordering starts, to setup reordering components. No additional
* data is included with this event.
*
* @event module:layout/List~List#onSetupReorderComponents
* @type {Object}
* @property {Number} index - The current row index.
* @public
*/

/**
* Fires when reordering completes.
*
* @event module:layout/List~List#onReorder
* @type {Object}
* @property {Number} reorderTo   - The index of the destination row.
* @property {Number} reorderFrom - The index of the source row.
* @public
*/

/**
* Fires when pinned reordering starts. No additional data is included with
* this event.
*
* @event module:layout/List~List#onSetupPinnedReorderComponents
* @type {Object}
* @public
*/

/**
* Fires when swiping starts, to set up swipeable components. No additional
* data is included with this event.
*
* @event module:layout/List~List#onSetupSwipeItem
* @type {Object}
* @public
*/

/**
* @todo onSwipeDrag is never fired
* @event module:layout/List~List#onSwipeDrag
* @type {Object}
* @public
*/

/**
* @todo onSwipe is never fired
* @event module:layout/List~List#onSwipe
* @type {Object}
* @public
*/

/**
* Fires when a swipe completes.
*
* @event module:layout/List~List#onSwipeComplete
* @type {Object}
* @property {Number} index      - The index of the row that was swiped.
* @property {Number} xDirection - The direction of the swipe.
* @public
*/

/**
* {@link module:layout/List~List} is a control that displays a scrolling list of rows,
* suitable for displaying very large lists. It is optimized such that only a
* small portion of the list is rendered at a given time. A flyweight pattern
* is employed, in which controls placed inside the list are created once, but
* rendered for each list item. For this reason, it's best to use only simple
* controls in	a List, such as {@link module:enyo/Control~Control} and {@link module:enyo/Image~Image}.
*
* A List's `components` block contains the controls to be used for a single
* row. This set of controls will be rendered for each row. You may customize
* row rendering by handling the [onSetupItem]{@link module:layout/List~List#onSetupItem}
* event.
*
* Events fired from within list rows contain the `index` property, which may
* be used to identify the row from which the event originated.
*
* Beginning with Enyo 2.2, lists have built-in support for swipeable and
* reorderable list items.  Individual list items are swipeable by default; to
* enable reorderability, set the [reorderable]{@link module:layout/List~List#reorderable}
* property to `true`.
*
* For more information, see the documentation on
* [Lists]{@linkplain $dev-guide/building-apps/layout/lists.html} in the
* Enyo Developer Guide.
*
* @class List
* @extends module:enyo/Scroller~Scroller
* @ui
* @public
*/
module.exports = kind(utils.mixin(methods,
	/** @lends module:layout/List~List.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.List',

	/**
	* @private
	*/
	kind: Scroller,

	/**
	* @private
	*/
	classes: 'enyo-list',

	/**
	* @lends module:layout/List~List.prototype
	* @private
	*/
	published: {
		/**
		* The number of rows contained in the list. Note that as the amount of
		* list data changes, `setRows()` may be called to adjust the number of
		* rows. To re-render the list at the current position when the count has
		* changed, call the [refresh()]{@link module:layout/List~List#refresh} method.  If the
		* whole data model of the list has changed and you want to redisplay it
		* from the top, call [reset()]{@link module:layout/List~List#reset}.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		count: 0,
		/**
		* The number of rows to be shown in a given list page segment. There is
		* generally no need to adjust this value.
		*
		* @type {Number}
		* @default 50
		* @public
		*/
		rowsPerPage: 50,
		/**
		* Direction in which the list will be rendered and in which it will be
		* scrollable. Valid values are `'v'` for vertical or `'h'` for horizontal.
		*
		* @type {String}
		* @default 'v'
		* @public
		*/
		orient: 'v',
		/**
		* If `true`, the list is rendered such that row `0` is at the bottom of
		* the viewport and the beginning position of the list is scrolled to the
		* bottom.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		bottomUp: false,
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
		* If `true`, the list will assume that all rows have the same size to
		* optimize performance.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		fixedSize: false,

		/**
		* If `true`, the list will allow the user to reorder list items.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		reorderable: false,

		/**
		* If `true` and `reorderable` is true, a reorderable item will be centered
		* on finger when created. If `false`, it will be created over the old item
		* and will then track finger.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		centerReorderContainer: true,

		/**
		* An array containing components to be shown as a placeholder when
		* reordering list items.
		*
		* @type {module:enyo/Control~Control[]}
		* @public
		*/
		reorderComponents: [],

		/**
		* An array containing components for the pinned version of a row. If not
		* specified, reordering will not support pinned mode.
		*
		* @type {module:enyo/Control~Control[]}
		* @public
		*/
		pinnedReorderComponents: [],

		/**
		* An array containing any swipeable components that will be used.
		*
		* @type {module:enyo/Control~Control[]}
		* @public
		*/
		swipeableComponents: [],

		/**
		* If `true`, swipe functionality is enabled.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		enableSwipe: false,

		/**
		* If `true`, the list will persist the current swipeable item.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		persistSwipeableItem: false
	},

	/**
	* @private
	*/
	events: {
		onSetupItem: '',
		onSetupReorderComponents: '',
		onSetupPinnedReorderComponents: '',
		onReorder: '',
		onSetupSwipeItem: '',
		onSwipeDrag: '',
		onSwipe: '',
		onSwipeComplete: ''
	},

	/**
	* @private
	*/
	handlers: {
		onAnimateFinish: 'animateFinish',
		onRenderRow: 'rowRendered',
		ondragstart: 'dragstart',
		ondrag: 'drag',
		ondragfinish: 'dragfinish',
		onup: 'up',
		onholdpulse: 'holdpulse',
		onflick: 'flick'
	},

	/**
	* Average row size (in pixels), calculated as `(page size / number of rows per page)`.
	*
	* @private
	*/
	rowSize: 0,

	/**
	* @private
	*/
	listTools: [
		{name: 'port', classes: 'enyo-list-port enyo-border-box', components: [
			{name: 'generator', kind: FlyweightRepeater, canGenerate: false, components: [
				{tag: null, name: 'client'}
			]},
			{name: 'holdingarea', allowHtml: true, classes: 'enyo-list-holdingarea'},
			{name: 'page0', allowHtml: true, classes: 'enyo-list-page'},
			{name: 'page1', allowHtml: true, classes: 'enyo-list-page'},
			{name: 'placeholder', classes: 'enyo-list-placeholder'},
			{name: 'swipeableComponents', style: 'position:absolute; display:block; top:-1000px; left:0;'}
		]}
	],

	//* Reorder vars

	/**
	* Length of time, in milliseconds, to wait for to active reordering.
	*
	* @type {Number}
	* @default 600
	* @private
	*/
	reorderHoldTimeMS: 600,

	/**
	* Index of the row that we're moving.
	*
	* @type {Number}
	* @default -1
	* @private
	*/
	draggingRowIndex: -1,

	/**
	* @todo Seems to be cruft ... can't find any references to it in layout.
	* @private
	*/
	initHoldCounter: 3,

	/**
	* @todo Seems to be cruft ... can't find any references to it in layout.
	* @private
	*/
	holdCounter: 3,

	/**
	* @todo Seems to be cruft ... can't find any references to it in layout.
	* @private
	*/
	holding: false,

	/**
	* Index of the row before which the placeholder item will be shown. If the
	* placeholder is at the end of the list, this value will be one larger than
	* the row count.
	*
	* @type {Number}
	* @private
	*/
	placeholderRowIndex: -1,

	/**
	* Determines scroll height at top/bottom of list where dragging will cause scroll.
	*
	* @type {Number}
	* @default 0.1
	* @private
	*/
	dragToScrollThreshold: 0.1,

	/**
	 * Amount to scroll during autoscroll.
	 *
	 * @type {Number}
	 * @default 0
	 * @private
	 */
	scrollDistance: 0,

	/**
	* Used to determine direction of scrolling during reordering.
	*
	* @private
	*/
	prevScrollTop: 0,

	/**
	* Number of milliseconds between scroll events when autoscrolling.
	*
	* @type {Number}
	* @default 20
	* @private
	*/
	autoScrollTimeoutMS: 20,

	/**
	* Holds timeout ID for autoscroll.
	*
	* @private
	*/
	autoScrollTimeout: null,

	/**
	* Keep last event Y coordinate to update placeholder position during autoscroll.
	*
	* @type {Number}
	* @private
	*/
	autoscrollPageY: 0,

	/**
	* Set to `true` to indicate that we're in pinned reordering mode.
	*
	* @type {Boolean}
	* @default false
	* @private
	*/
	pinnedReorderMode: false,

	/**
	* y-coordinate of the original location of the pinned row.
	*
	* @type {Number}
	* @private
	*/
	initialPinPosition: -1,

	/**
	* Set to `true` after drag-and-drop has moved the item to reorder at least
	* one space. Used to activate pin mode if item is dropped immediately.
	*
	* @type {Boolean}
	* @default false
	* @private
	*/
	itemMoved: false,

	/**
	* Tracks the page where the item being dragged is, so we can detect when we
	* switch pages and need to adjust rendering.
	*
	* @type {Number}
	* @private
	*/
	currentPageNumber: -1,

	/**
	* Timeout for completing reorder operation.
	*
	* @private
	*/
	completeReorderTimeout: null,

	//* Swipeable vars

	/**
	* Index of swiped item.
	*
	* @type {Number}
	* @private
	*/
	swipeIndex: null,

	/**
	* Direction of swipe.
	*
	* @type {Number}
	* @private
	*/
	swipeDirection: null,

	/**
	* `true` if a persistent item is currently persisting.
	*
	* @type {Boolean}
	* @default false
	* @private
	*/
	persistentItemVisible: false,

	/**
	* Side from which the persisting item came.
	*
	* @type {String}
	* @private
	*/
	persistentItemOrigin: null,

	/**
	* `true` if swipe was completed.
	*
	* @type {Boolean}
	* @private
	*/
	swipeComplete: false,

	/**
	* Timeout when waiting for swipe action to complete.
	*
	* @private
	*/
	completeSwipeTimeout: null,

	/**
	* Length of time (in milliseconds) to wait before completing swipe action.
	*
	* @type {Number}
	* @default 500
	* @private
	*/
	completeSwipeDelayMS: 500,

	/**
	* Duration (in milliseconds) of normal swipe animation.
	*
	* @type {Number}
	* @default 200
	* @private
	*/
	normalSwipeSpeedMS: 200,

	/**
	* Duration (in milliseconds) of fast swipe animation.
	*
	* @type {Number}
	* @default 100
	* @private
	*/
	fastSwipeSpeedMS: 100,

	/**
	* Percentage of a swipe needed to force completion of the swipe.
	*
	* @type {Number}
	* @default 0.2
	* @private
	*/
	percentageDraggedThreshold: 0.2
}));

},{'./methods':'layout/List/methods'}],'layout/ImageView':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/ImageView~ImageView} kind.
* @module layout/ImageView
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	logger = require('enyo/logger'),
	platform = require('enyo/platform'),
	Img = require('enyo/Image');

var
	PanZoomView = require('./PanZoomView');

/**
* {@link module:layout/ImageView~ImageView} is a control that displays an image
* at a given scaling factor, with enhanced support for double-tap/double-click
* to zoom, panning, mousewheel zooming and pinch-zoom (on touchscreen devices
* that support it).
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		ImageView = require('layout/ImageView');
*
* 	{kind: ImageView, src: 'layout/assets/globe.jpg', scale: 'auto',
* 		style: 'width: 500px; height: 400px;'}
* ```
*
* The `onload` and `onerror` events bubble up from the underlying image
* element and an [onZoom]{@link module:layout/PanZoomView~PanZoomView#onZoom} event is triggered
* when the user changes the zoom level of the image.
*
* If you wish, you may add {@link module:enyo/ScrollThumb~ScrollThumb} indicators, disable zoom
* animation, allow panning overscroll (with a bounce-back effect), and control
* the propagation of drag events, all using this kind's Boolean properties.
*
* Note that it's best to specify a size for the ImageView in order to avoid
* complications.
*
* @class ImageView
* @extends module:layout/PanZoomView~PanZoomView
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:layout/ImageView~ImageView.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.ImageView',

	/**
	* @private
	*/
	kind: PanZoomView,

	/**
	* @private
	*/
	subKindComponents: [
		{kind: Img, ondown: 'down', style: 'vertical-align: text-top;'}
	],

	/**
	* @method
	* @private
	*/
	create: function () {
		// move components (most likely imageViewPins) to unscaledComponents
		this.unscaledComponents = this.components;
		this.components = [];

		//amend kindComponents
		this.kindComponents[1].components[0].components = this.subKindComponents;

		PanZoomView.prototype.create.apply(this, arguments);

		// set content as inline-block to mimic behaviour of an image
		this.$.content.applyStyle('display', 'inline-block');

		//offscreen buffer image to get initial image dimensions
		//before displaying a scaled down image that can fit in the container
		this.bufferImage = new Image();
		this.bufferImage.onload = this.bindSafely('imageLoaded');
		this.bufferImage.onerror = this.bindSafely('imageError');
		this.srcChanged();
		//	Needed to kickoff pin redrawing (otherwise they won't redraw on intitial scroll)
		if(this.getStrategy().$.scrollMath) {
			this.getStrategy().$.scrollMath.start();
		}
	},

	/**
	* @method
	* @private
	*/
	destroy: function () {
		if (this.bufferImage) {
			this.bufferImage.onerror = undefined;
			this.bufferImage.onerror = undefined;
			delete this.bufferImage;
		}
		PanZoomView.prototype.destroy.apply(this, arguments);
	},

	/**
	* @private
	*/
	down: function (sender, event) {
		// Fix to prevent image drag in Firefox
		event.preventDefault();
	},

	/**
	* @private
	*/
	srcChanged: function () {
		if(this.src && this.src.length>0 && this.bufferImage && this.src!=this.bufferImage.src) {
			this.bufferImage.src = this.src;
		}
	},

	/**
	* Handles `onload` events bubbled up from children to reset the scale when
	* the image changes.
	*
	* @private
	*/
	imageLoaded: function (event) {
		this.scale = this.scaleKeyword;
		this.originalWidth = this.contentWidth = this.bufferImage.width;
		this.originalHeight = this.contentHeight = this.bufferImage.height;

		//scale to fit before setting src, so unscaled image isn't visible
		this.scaleChanged();
		this.$.image.setSrc(this.bufferImage.src);

		// There appears to be a bug in Safari where due to the translation of these elements it
		// doesn't correctly render unless prodded
		if (platform.safari) {
			var n = this.$.image.hasNode(),
				src = this.bufferImage.src;

			if (n) {
				setTimeout(function () { n.src = src; }, 100);
			}
		}

		// Needed to ensure scroller contents height/width is calculated correctly when contents use enyo-fit
		dom.transformValue(this.getStrategy().$.client, 'translate3d', '0px, 0px, 0');

		this.positionClientControls(this.scale);
		this.align();
	},

	/**
	* @private
	*/
	imageError: function (event) {
		logger.error('Error loading image: ' + this.src);
		//bubble up the error event
		this.bubble('onerror', event);
	}
});

},{'./PanZoomView':'layout/PanZoomView'}],'layout/AroundList':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/AroundList~AroundList} kind.
* @module layout/AroundList
*/

var
	kind = require('enyo/kind');

var
	List = require('./List'),
	FlyweightRepeater = require('./FlyweightRepeater');

/**
* {@link module:layout/AroundList~AroundList} is a {@link module:layout/List~List}
* that allows content to be displayed around its rows.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		AroundList = require('layout/AroundList');
*
* 	{kind: AroundList, onSetupItem: 'setupItem',
* 		aboveComponents: [
* 			{content: 'Content above the list'}
* 		],
* 		components: [
* 			{content: 'List item'}
* 		]
* 	}
* ```
*
* @class AroundList
* @extends module:layout/List~List
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:layout/AroundList~AroundList.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.AroundList',

	/**
	* @private
	*/
	kind: List,

	/**
	* @private
	*/
	listTools: [
		{name: 'port', classes: 'enyo-list-port enyo-border-box', components: [
			{name: 'aboveClient'},
			{name: 'generator', kind: FlyweightRepeater, canGenerate: false, components: [
				{tag: null, name: 'client'}
			]},
			{name: 'holdingarea', allowHtml: true, classes: 'enyo-list-holdingarea'},
			{name: 'page0', allowHtml: true, classes: 'enyo-list-page'},
			{name: 'page1', allowHtml: true, classes: 'enyo-list-page'},
			{name: 'belowClient'},
			{name: 'placeholder'},
			{name: 'swipeableComponents', style: 'position:absolute; display:block; top:-1000px; left:0px;'}
		]}
	],

	/**
	* A block of components to be rendered above the list.
	*
	* @type {Object[]}
	* @default null
	* @public
	*/
	aboveComponents: null,

	/**
	* A block of components to be rendered below the list.
	*
	* @type {Object[]}
	* @default null
	* @public
	*/
	belowComponents: null,

	/**
	* @method
	* @private
	*/
	initComponents: function () {
		List.prototype.initComponents.apply(this, arguments);
		if (this.aboveComponents) {
			this.$.aboveClient.createComponents(this.aboveComponents, {owner: this.owner});
		}
		if (this.belowComponents) {
			this.$.belowClient.createComponents(this.belowComponents, {owner: this.owner});
		}
	},

	/**
	* @see module:layout/List~List#updateMetrics
	* @private
	*/
	updateMetrics: function () {
		this.defaultPageSize = this.rowsPerPage * (this.rowSize || 100);
		this.pageCount = Math.ceil(this.count / this.rowsPerPage);
		this.aboveHeight = this.$.aboveClient.getBounds().height;
		this.belowHeight = this.$.belowClient.getBounds().height;
		this.portSize = this.aboveHeight + this.belowHeight;
		for (var i=0; i < this.pageCount; i++) {
			this.portSize += this.getPageSize(i);
		}
		this.adjustPortSize();
	},

	/**
	* @see module:layout/List~List#positionPage
	* @private
	*/
	positionPage: function (pageNumber, target) {
		target.pageNo = pageNumber;
		var y = this.pageToPosition(pageNumber);
		var o = this.bottomUp ? this.belowHeight : this.aboveHeight;
		y += o;
		target.applyStyle(this.pageBound, y + 'px');
	},

	/**
	* Scrolls past the [aboveComponents]{@link module:layout/AroundList~AroundList#aboveComponents}
	* or [belowComponents]{@link module:layout/AroundList~AroundList#belowComponents} components to
	* reveal the list.
	*
	* @public
	*/
	scrollToContentStart: function () {
		var y = this.bottomUp ? this.belowHeight : this.aboveHeight;
		this.setScrollPosition(y);
	}
});

},{'./List':'layout/List','./FlyweightRepeater':'layout/FlyweightRepeater'}],'layout/PulldownList':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/PulldownList~PulldownList} kind.
* @module layout/PulldownList
*/

var
	dom = require('enyo/dom'),
	kind = require('enyo/kind'),
	platform = require('enyo/platform'),
	TouchScrollStrategy = require('enyo/TouchScrollStrategy'),
	TranslateScrollStrategy = require('enyo/TranslateScrollStrategy');

var
	List = require('../List'),
	Puller = require('./Puller');

/**
* Fires when user initiates a pull action. No additional data is included with
* this event.
*
* @event module:layout/PulldownList~PulldownList#onPullStart
* @type {Object}
* @public
*/

/**
* Fires when user cancels a pull action. No additional data is included with
* this event.
*
* @event module:layout/PulldownList~PulldownList#onPullCancel
* @type {Object}
* @public
*/

/**
* Fires while a pull action is in progress. No additional data is included with
* this event.
*
* @event module:layout/PulldownList~PulldownList#onPull
* @type {Object}
* @public
*/

/**
* Fires when the list is released following a pull action, indicating
* that we are ready to retrieve data. No additional data is included with
* this event.
*
* @event module:layout/PulldownList~PulldownList#onPullRelease
* @type {Object}
* @public
*/

/**
* Fires when data retrieval is complete, indicating that the data is
* is ready to be displayed. No additional data is included with
* this event.
*
* @event module:layout/PulldownList~PulldownList#onPullComplete
* @type {Object}
* @public
*/

/**
* {@link module:layout/PulldownList~PulldownList} is a list that provides a
* pull-to-refresh feature, which allows new data to be retrieved and updated in
* the list.
*
* PulldownList provides the [onPullRelease]{@link module:layout/PulldownList~PulldownList#onPullRelease}
* event to allow an application to start retrieving new data.  The
* [onPullComplete]{@link module:layout/PulldownList~PulldownList#onPullComplete}
* event indicates that the pull is complete and it's time to update the list
* with the new data.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		PulldownList = require('layout/PulldownList');
*
* 	{name: 'list', kind: PulldownList, onSetupItem: 'setupItem',
* 		onPullRelease: 'pullRelease', onPullComplete: 'pullComplete',
* 		components: [
* 			{name: 'item'}
* 		]
* 	}
*
* 	pullRelease: function () {
* 		this.search();
* 	},
* 	processSearchResults: function (inRequest, inResponse) {
* 		this.results = inResponse.results;
* 		this.$.list.setCount(this.results.length);
* 		this.$.list.completePull();
* 	},
* 	pullComplete: function () {
* 		this.$.list.reset();
* 	}
* ```
*
* @class PulldownList
* @extends module:layout/List~List
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:layout/PulldownList~PulldownList.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.PulldownList',

	/**
	* @private
	*/
	kind: List,

	/**
	* Sets `touch` to `true` in inherited Scroller kind for touch-based scrolling strategy.
	*
	* @see {@link module:enyo/Scroller~Scroller#touch}
	* @type {Boolean}
	* @default true
	* @public
	*/
	touch: true,

	/**
	* The pull notification area at the top of the list.
	*
	* @type {module:enyo/Control~Control}
	* @default null
	* @private
	*/
	pully: null,

	/**
	* @private
	*/
	pulldownTools: [
		{name: 'pulldown', classes: 'enyo-list-pulldown', components: [
			{name: 'puller', kind: Puller}
		]}
	],

	/**
	* @private
	*/
	events: {
		//* Fires when user initiates a pull action.
		onPullStart: '',
		//* Fires when user cancels a pull action.
		onPullCancel: '',
		//* Fires while a pull action is in progress.
		onPull: '',
		//* Fires when the list is released following a pull action, indicating
		//* that we are ready to retrieve data.
		onPullRelease: '',
		//* Fires when data retrieval is complete, indicating that the data is
		//* is ready to be displayed.
		onPullComplete: ''
	},

	/**
	* @private
	*/
	handlers: {
		onScrollStart: 'scrollStartHandler',
		onScrollStop: 'scrollStopHandler',
		ondragfinish: 'dragfinish'
	},

	/**
	* Message displayed when list is not being pulled.
	*
	* @type {String}
	* @default 'Pull down to refresh...'
	* @public
	*/
	pullingMessage: 'Pull down to refresh...',

	/**
	* Message displayed while a pull action is in progress.
	*
	* @type {String}
	* @default 'Release to refresh...'
	* @public
	*/
	pulledMessage: 'Release to refresh...',

	/**
	* Message displayed while data is being retrieved.
	*
	* @type {String}
	* @default 'Loading...'
	* @public
	*/
	loadingMessage: 'Loading...',

	/**
	* @private
	*/
	pullingIconClass: 'enyo-puller-arrow enyo-puller-arrow-down',

	/**
	* @private
	*/
	pulledIconClass: 'enyo-puller-arrow enyo-puller-arrow-up',

	/**
	* @private
	*/
	loadingIconClass: '',

	/**
	* @method
	* @private
	*/
	create: function () {
		var p = {kind: Puller, showing: false, text: this.loadingMessage, iconClass: this.loadingIconClass, onCreate: 'setPully'};
		this.listTools.splice(0, 0, p);
		List.prototype.create.apply(this, arguments);
		this.setPulling();
	},

	/**
	* @method
	* @private
	*/
	initComponents: function () {
		this.createChrome(this.pulldownTools);
		this.accel = dom.canAccelerate();
		this.translation = this.accel ? 'translate3d' : 'translate';
		this.strategyKind = this.resetStrategyKind();
		List.prototype.initComponents.apply(this, arguments);
	},

	/**
	* Temporarily use TouchScrollStrategy on iOS devices (see ENYO-1714).
	*
	* @private
	*/
	resetStrategyKind: function () {
		return (platform.android >= 3)
			? TranslateScrollStrategy
			: TouchScrollStrategy;
	},

	/**
	* @private
	*/
	setPully: function (sender, event) {
		this.pully = event.originator;
	},

	/**
	* @private
	*/
	scrollStartHandler: function () {
		this.firedPullStart = false;
		this.firedPull = false;
		this.firedPullCancel = false;
	},

	/**
	* Monitors the scroll position to display and position the
	* [pully]{@link module:layout/PulldownList~PulldownList#pully}.
	*
	* @see {@link module:enyo/Scroller~Scroller#scroll}
	* @method
	* @private
	*/
	scroll: function (sender, event) {
		var r = List.prototype.scroll.apply(this, arguments);
		if (this.completingPull) {
			this.pully.setShowing(false);
		}
		var s = this.getStrategy().$.scrollMath || this.getStrategy();
		var over = -1*this.getScrollTop();
		if (s.isInOverScroll() && over > 0) {
			dom.transformValue(this.$.pulldown, this.translation, '0,' + over + 'px' + (this.accel ? ',0' : ''));
			if (!this.firedPullStart) {
				this.firedPullStart = true;
				this.pullStart();
				this.pullHeight = this.$.pulldown.getBounds().height;
			}
			if (over > this.pullHeight && !this.firedPull) {
				this.firedPull = true;
				this.firedPullCancel = false;
				this.pull();
			}
			if (this.firedPull && !this.firedPullCancel && over < this.pullHeight) {
				this.firedPullCancel = true;
				this.firedPull = false;
				this.pullCancel();
			}
		}
		return r;
	},

	/**
	* @private
	*/
	scrollStopHandler: function () {
		if (this.completingPull) {
			this.completingPull = false;
			this.doPullComplete();
		}
	},

	/**
	* If the pull has been fired, offset the scroll top by the height of the
	* [pully]{@link module:layout/PulldownList~PulldownList#pully} until
	* [completePull()]{@link module:layout/PulldownList~PulldownList#completePull} is called.
	*
	* @private
	*/
	dragfinish: function () {
		if (this.firedPull) {
			var s = this.getStrategy().$.scrollMath || this.getStrategy();
			s.setScrollY(-1*this.getScrollTop() - this.pullHeight);
			this.pullRelease();
		}
		else {
			// if base list is configured for swipe, ensure
			// has a chance to process swipe
			List.prototype.dragfinish.apply(this, arguments);
		}
	},

	/**
	* Signals that the list should execute pull completion. This is usually
	* called after the application has received new data.
	*
	* @public
	*/
	completePull: function () {
		this.completingPull = true;
		var s = this.getStrategy().$.scrollMath || this.getStrategy();
		s.setScrollY(this.pullHeight);
		s.start();
	},

	/**
	* @fires module:layout/PulldownList~PulldownList#onPullStart
	* @private
	*/
	pullStart: function () {
		this.setPulling();
		this.pully.setShowing(false);
		this.$.puller.setShowing(true);
		this.doPullStart();
	},

	/**
	* @fires module:layout/PulldownList~PulldownList#onPull
	* @private
	*/
	pull: function () {
		this.setPulled();
		this.doPull();
	},

	/**
	* @fires module:layout/PulldownList~PulldownList#onPullCancel
	* @private
	*/
	pullCancel: function () {
		this.setPulling();
		this.doPullCancel();
	},

	/**
	* @fires module:layout/PulldownList~PulldownList#onPullRelease
	* @private
	*/
	pullRelease: function () {
		this.$.puller.setShowing(false);
		this.pully.setShowing(true);
		this.doPullRelease();
	},

	/**
	* @private
	*/
	setPulling: function () {
		this.$.puller.setText(this.pullingMessage);
		this.$.puller.setIconClass(this.pullingIconClass);
	},

	/**
	* @private
	*/
	setPulled: function () {
		this.$.puller.setText(this.pulledMessage);
		this.$.puller.setIconClass(this.pulledIconClass);
	},

	/**
	* Prevent swiping while pully is showing as the swipe gets rendered one row off
	*
	* @private
	*/
	isSwipeable: function () {
		return !this.pully.get('showing') && List.prototype.isSwipeable.apply(this, arguments);
	},

	/**
	* Prevent reordering while pully is showing
	*
	* @private
	*/
	shouldStartReordering: function () {
		return !this.pully.get('showing') && List.prototype.shouldStartReordering.apply(this, arguments);
	}
});

/**
* The {@link module:layout/PulldownList/Puller~Puller} declaration used by the PulldownList.
* @public
*/
module.exports.Puller = Puller;

},{'../List':'layout/List','./Puller':'layout/PulldownList/Puller'}],'layout/ImageCarousel':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:layout/ImageCarousel~ImageCarousel} kind.
* @module layout/ImageCarousel
*/

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	ImageView = require('./ImageView'),
	Panels = require('./Panels'),
	CarouselArranger = require('./CarouselArranger');

/**
* {@link module:layout/ImageCarousel~ImageCarousel} is a
* {@link module:layout/Panels~Panels} that uses
* {@link module:layout/CarouselArranger~CarouselArranger} as its arrangerKind.
* An ImageCarousel dynamically creates and loads instances of
* {@link module:layout/ImageView~ImageView} as needed, creating a gallery of images.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		ImageCarousel = require('layout/ImageCarousel');
*
* 	{kind: ImageCarousel, images: [
* 		'layout/assets/mercury.jpg',
* 		'layout/assets/venus.jpg',
* 		'layout/assets/earth.jpg',
* 		'layout/assets/mars.jpg',
* 		'layout/assets/jupiter.jpg',
* 		'layout/assets/saturn.jpg',
* 		'layout/assets/uranus.jpg',
* 		'layout/assets/neptune.jpg'
* 	], defaultScale: 'auto'},
* ```
*
* All of the events (`onload`, `onerror`, and `onZoom`) from the contained
* ImageView objects are bubbled up to the ImageCarousel, which also inherits
* the [onTransitionStart]{@link module:layout/Panels~Panels#onTransitionStart} and
* [onTransitionFinish]{@link module:layout/Panels~Panels#onTransitionFinish} events from
* {@link module:layout/Panels~Panels}.
*
* The [images]{@link module:layout/ImageCarousel~ImageCarousel#images} property is an array containing the
* file paths of the images in the gallery.  The `images` array may be altered and
* updated at any time, and the current index may be manipulated at runtime via the
* inherited functions [getIndex()]{@link module:layout/Panels~Panels#getIndex} and
* [setIndex()]{@link module:layout/Panels~Panels#setIndex}.
*
* Note that it's best to specify a size for the ImageCarousel in order to
* avoid complications.
*
* @class ImageCarousel
* @extends module:layout/Panels~Panels
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:layout/ImageCarousel~ImageCarousel.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.ImageCarousel',

	/**
	* @private
	*/
	kind: Panels,

	/**
	* @private
	*/
	arrangerKind: CarouselArranger,

	/**
	* The default scaling to be applied to each ImageView. Can be `'auto'`,
	* `'width'`, `'height'`, or any positive numeric value.
	*
	* @type {String|Number}
	* @default 'auto'
	* @public
	*/
	defaultScale: 'auto',

	/**
	* If `true`, ImageView instances are created with zooming disabled.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	disableZoom:  false,

	/**
	* If `true`, any ImageViews that are not in the immediate viewing area
	* (i.e., any images other than the currently active image and the first image
	* on either side of it) will be destroyed to free up memory. This has the
	* benefit of minimizing memory usage (which is good for mobile devices), but
	* also has the downside that, if you want to view the images again, you'll need
	* to recreate the ImageViews refetch the images (thus increasing the number of
	* image-related GET calls). Defaults to `false`.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	lowMemory: false,

	/**
	* @lends module:layout/ImageCarousel~ImageCarousel.prototype
	* @private
	*/
	published: {

		/**
		* Array of paths to image files.
		*
		* @type {String[]}
		* @default `[]`
		* @public
		*/
		images: []
	},

	/**
	* @private
	*/
	handlers: {
		onTransitionStart: 'transitionStart',
		onTransitionFinish: 'transitionFinish'
	},

	/**
	* @method
	* @private
	*/
	create: function () {
		Panels.prototype.create.apply(this, arguments);
		this.imageCount = this.images.length;
		if (this.images.length > 0) {
			this.initContainers();
			this.loadNearby();
		}
	},

	/**
	* Builds a container for each image and destroys any extra containers and images.
	*
	* @private
	*/
	initContainers: function () {
		for (var i=0; i<this.images.length; i++) {
			if (!this.$['container' + i]) {
				this.createComponent({
					name: 'container' + i,
					style: 'height:100%; width:100%;'
				});
				this.$['container' + i].render();
			}
		}
		for (i=this.images.length; i<this.imageCount; i++) {
			if (this.$['image' + i]) {
				this.$['image' + i].destroy();
			}
			this.$['container' + i].destroy();
		}
		this.imageCount = this.images.length;
	},

	/**
	* Loads images that are in view or may come into view soon.
	*
	* @private
	*/
	loadNearby: function () {
		var range = this.getBufferRange();
		for (var i in range) {
			this.loadImageView(range[i]);
		}
	},

	/**
	* Determines which image indices are `'near'` the active image.
	*
	* @private
	*/
	getBufferRange: function () {
		var range = [];
		if (this.layout.containerBounds) {
			var prefetchRange = 1;
			var bounds = this.layout.containerBounds;
			var c, i, x, xEnd;
			// get the lower range
			i=this.index-1;
			x=0;
			xEnd = bounds.width * prefetchRange;
			while (i>=0 && x<=xEnd) {
				c = this.$['container' + i];
				x+= c.width + c.marginWidth;
				range.unshift(i);
				i--;
			}
			// get the upper range
			i=this.index;
			x=0;
			xEnd = bounds.width * (prefetchRange + 1);
			while (i<this.images.length && x<=xEnd) {
				c = this.$['container' + i];
				x+= c.width + c.marginWidth;
				range.push(i);
				i++;
			}
		}
		return range;
	},

	/**
	* @method
	* @private
	*/
	reflow: function () {
		Panels.prototype.reflow.apply(this, arguments);
		this.loadNearby();
	},

	/**
	* Loads the image whose path is found at the specified index in the
	* [images]{@link module:layout/ImageCarousel~ImageCarousel#images} array.
	*
	* @param {Number} index - The index of the image to load.
	* @private
	*/
	loadImageView: function (index) {
		// NOTE: wrap bugged in enyo.CarouselArranger, but once fixed, wrap should work in this
		if (this.wrap) {
			// Used this modulo technique to get around javascript issue with negative values
			// ref: http://javascript.about.com/od/problemsolving/a/modulobug.htm
			index = ((index % this.images.length)+this.images.length)%this.images.length;
		}
		if (index>=0 && index<=this.images.length-1) {
			if (!this.$['image' + index]) {
				this.$['container' + index].createComponent({
					name: 'image' + index,
					kind: ImageView,
					scale: this.defaultScale,
					disableZoom: this.disableZoom,
					src: this.images[index],
					verticalDragPropagation: false,
					style: 'height:100%; width:100%;'
				}, {owner: this});
				this.$['image' + index].render();
			} else {
				if (this.$['image' + index].src != this.images[index]) {
					this.$['image' + index].setSrc(this.images[index]);
					this.$['image' + index].setScale(this.defaultScale);
					this.$['image' + index].setDisableZoom(this.disableZoom);
				}
			}
		}
		return this.$['image' + index];
	},

	/**
	* Updates the array of images.
	*
	* @todo Probably a defect here. Simply calling `set()` won't force the observer to fire
	* if `images` is a ref to the same array. Need to add the `force` parameter.
	* @public
	*/
	setImages: function (images) {
		// always invoke imagesChanged because this is an array property
		// which might otherwise seem to be the same object
		this.set('images', images);
	},

	/**
	* @private
	*/
	imagesChanged: function () {
		this.initContainers();
		this.loadNearby();
	},

	/**
	* @method
	* @private
	*/
	indexChanged: function () {
		this.loadNearby();
		if (this.lowMemory) {
			this.cleanupMemory();
		}
		Panels.prototype.indexChanged.apply(this, arguments);
	},

	/**
	* @private
	*/
	transitionStart: function (sender, event) {
		if (event.fromIndex==event.toIndex) {
			return true; //prevent from bubbling if there's no change
		}
	},

	/**
	* @private
	*/
	transitionFinish: function (sender, event) {
		this.loadNearby();
		if (this.lowMemory) {
			this.cleanupMemory();
		}
	},

	/**
	* Returns the currently displayed ImageView.
	*
	* @return {module:enyo/Control~Control} - The active image control.
	* @public
	*/
	getActiveImage: function () {
		return this.getImageByIndex(this.index);
	},

	/**
	* Returns the ImageView with the specified index.
	*
	* @param {Number} index  - The index of the image to be retrieved.
	* @return {module:enyo/Control~Control} - The image control at `index`.
	* @public
	*/
	getImageByIndex: function (index) {
		return this.$['image' + index] || this.loadImageView(index);
	},

	/**
	* Destroys any ImageView objects that are not in the immediate viewing area
	* (i.e., any images other than the currently active image and the first
	* image on either side of it) to free up memory. If you set the ImageCarousel's
	* [lowMemory]{@link module:layout/ImageCarousel~ImageCarousel#lowMemory} property to `true`, this
	* function will be called automatically as needed.
	*
	* @public
	*/
	cleanupMemory: function () {
		var buffer = this.getBufferRange();
		for (var i=0; i<this.images.length; i++) {
			if (utils.indexOf(i, buffer) ===-1) {
				if (this.$['image' + i]) {
					this.$['image' + i].destroy();
				}
			}
		}
	}
});

},{'./ImageView':'layout/ImageView','./Panels':'layout/Panels','./CarouselArranger':'layout/CarouselArranger'}]
	};

});
//# sourceMappingURL=layout.js.map