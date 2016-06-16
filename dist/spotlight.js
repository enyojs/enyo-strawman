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
	return {'spotlight/accelerator':[function (module,exports,global,require,request){
/**
* Accelerator provides logic for accelerating and throttling cursor movement.
*
* Returns a generator function that accepts the [Spotlight]{@link module:spotlight}
* instance as an argument.
*
* @module spotlight/accelerator
* @public
*/
module.exports = function (Spotlight) {

    //* @protected
    /*************************************************************/

    var _isAccelerating = false,
        _nSkipped = 0,
        _nTime = 0,
        _nKey = 0,
        _bCanceled = false;

    /**
    * Controls the frequency with which the cursor will "freeze". While frozen,
    * the current spotted item cannot change, and all events are directed to it.
    *
    * @type {Array}
    * @default [3, 3, 3, 2, 2, 2, 1]
    * @public
    */
    this.frequency = [3, 3, 3, 2, 2, 2, 1];

    /**
    * Called from {@link module:spotlight}, with the current keydown event and
    * Spotlight's callback, which will be called when the event is allowed
    * through.
    *
    * @param  {Object} oEvent - The current event to validate.
    * @param  {Function} fCallback - The callback to execute.
    * @param  {Object} oContext - The callback's execution context.
    * @returns {Boolean}
    * @public
    */
    this.processKey = function(oEvent, fCallback, oContext) {
        switch (oEvent.type) {
            case 'keydown':
            case 'pagehold':
            case 'pageholdpulse':
                if (oEvent.keyCode != _nKey) {
                    this.reset();
                    _nTime = (new Date()).getTime();
                    _nKey = oEvent.keyCode;
                    return fCallback.apply(oContext, [oEvent]);
                } else if (_bCanceled) {

                    // Prevent skipped keydown events from bubbling
                    oEvent.preventDefault();
                    return true;
                } else {
                    var nElapsedTime = (new Date()).getTime() - _nTime,
                        nSeconds = Math.floor(nElapsedTime / 1000),
                        nToSkip = 0;

                    nSeconds = nSeconds > this.frequency.length - 1 ? this.frequency.length - 1 : nSeconds;

                    nToSkip = this.frequency[nSeconds] - 1;
                    if (nToSkip < 0) {
                        nToSkip = 0;
                    }

                    _isAccelerating = !(nSeconds === 0 && _nSkipped === 0);

                    if (_nSkipped >= nToSkip) {
                        _nSkipped = 0;
                        return fCallback.apply(oContext, [oEvent]);
                    } else {
                        _nSkipped++;
                        oEvent.preventDefault(); // Prevent skipped keydown events from bubbling
                        return true;
                    }
                }
                break;
            case 'keyup':
            case 'pagerelease':
                this.reset();
                return fCallback.apply(oContext, [oEvent]);
        }
    };


    /**
    * Resets values for Spotlight.
    *
    * @public
    */
    this.reset = function() {
        _nSkipped = 0;
        _nTime = 0;
        _nKey = 0;
        _bCanceled = false;
        _isAccelerating = false;
    };

    /**
    * Cancels the accelerator.
    *
    * @public
    */
    this.cancel = function() {
        _bCanceled = true;
    };

    /**
    * Verifies that the accelerator is active.
    *
    * @returns {Boolean} `true` if the accelerator is active; otherwise, `false`.
    * @public
    */
    this.isAccelerating = function() {
        return _isAccelerating;
    };
};

}],'spotlight/muter':[function (module,exports,global,require,request){
/**
* Methods for working with muted controls. By default, when a control is muted, it does not have the
* `'spotlight'` CSS class applied to its DOM node, and does not appear as highlighted when it has
* Spotlight focus.
*
* Returns a generator function that accepts the [Spotlight]{@link module:spotlight}
* instance as an argument.
*
* @module spotlight/muter
* @public
*/
module.exports = function (Spotlight) {
    var _oMutes = {},
        _nMutes = 0;

    /**
    * Mutes a control.
    *
    * @param  {Object} oSender - The control to be muted.
    * @public
    */
    this.addMuteReason = function(oSender) {
        var id = typeof oSender == 'string' ? oSender : oSender.id;
        if (_oMutes[id]) return;

        if (_nMutes === 0) {
            var oCurrent = Spotlight.getCurrent();
            if (oCurrent) {
                Spotlight.unhighlight(oCurrent);
            }
        }

        _oMutes[id] = true;
        _nMutes++;
    };

    /**
    * Un-mutes a muted control.
    *
    * @param  {Object} oSender - The control to be un-muted.
    * @public
    */
    this.removeMuteReason = function(oSender) {
        var id = typeof oSender == 'string' ? oSender : oSender.id;
        if (!_oMutes[id]) return;

        _oMutes[id] = null;
        _nMutes--;

        if (_nMutes === 0) {
            var oCurrent = Spotlight.getCurrent();
            if (oCurrent) {
                Spotlight.highlight(oCurrent, true);
            }
        }
    };

    /**
    * Determines whether Spotlight muter is currently in use.
    *
    * @type {Function}
    * @returns {Boolean} `true` if there is at least one currently muted control;
    * otherwise, `false`.
    * @public
    */
    this.isMuted = function() {
        return _nMutes > 0;
    };
};

}],'spotlight/neighbor':[function (module,exports,global,require,request){
/**
* Logic to identify the nearest neighboring object for the object that currently has focus.
*
* Returns a generator function that accepts the [Spotlight]{@link module:spotlight}
* instance as an argument.
*
* @module spotlight/neighbor
* @public
*/

/**
* The configurable options used by {@link module:spotlight/neighbor~neighbor} when performing
* nearest-neighbor calculations.
*
* @typedef {Object} spotlight/neighbor~neighbor~NeighborOptions
* @property {Object} [root] - The optional root control whose children will be considered as
*   candidates for nearest-neighbor calculations.
* @property {Object} [extraCandidates] - The optional set of additional candidates (whose siblings
*   will also be included) that should be considered for nearest-neighbor calculations.
*/

module.exports = function (Spotlight) {

    /**
    * Determines whether a control overlaps multiple planes.
    *
    * @param  {String} sDirection - The direction of acceleration.
    * @param  {Object} oBounds1 - Initial bounds.
    * @param  {Object} oBounds2 - Final bounds.
    * @param  {Boolean} bCenterCheck - Whether to check for the center of the bounds.
    * @returns {Boolean}
    * @private
    */
    var _isInHalfPlane = function(sDirection, oBounds1, oBounds2, bCenterCheck) {
            if (bCenterCheck) {
                switch (sDirection) {
                    case 'UP':
                        return oBounds1.top + oBounds1.height / 2 > oBounds2.top + oBounds2.height / 2;
                    case 'DOWN':
                        return oBounds1.top + oBounds1.height / 2 < oBounds2.top + oBounds2.height / 2;
                    case 'LEFT':
                        return oBounds1.left + oBounds1.width / 2 > oBounds2.left + oBounds2.width / 2;
                    case 'RIGHT':
                        return oBounds1.left + oBounds1.width / 2 < oBounds2.left + oBounds2.width / 2;
                }
            } else {
                switch (sDirection) {
                    case 'UP':
                        return oBounds1.top >= oBounds2.top + oBounds2.height - 1;
                    case 'DOWN':
                        return oBounds1.top + oBounds1.height - 1 <= oBounds2.top;
                    case 'LEFT':
                        return oBounds1.left >= oBounds2.left + oBounds2.width - 1;
                    case 'RIGHT':
                        return oBounds1.left + oBounds1.width - 1 <= oBounds2.left;
                }
            }
        },

        /**
        * Checks to see which control has higher precedence for spottability.
        *
        * @param  {String} sDirection - The direction of acceleration.
        * @param  {Object} oBounds1 - Initial bounds.
        * @param  {Object} oBounds2 - Final bounds.
        * @returns {Number}
        * @private
        */
        _getAdjacentControlPrecedence = function(sDirection, oBounds1, oBounds2) {
            var oPoints = _getAdjacentControlPoints(sDirection, oBounds1, oBounds2);
            return _getPrecedenceValue(oPoints, sDirection);
        },

        /**
        * Retrieves the adjacent axis control points based on direction of acceleration.
        *
        * @param  {String} sDirection - The direction of acceleration.
        * @param  {Object} oBounds1 - Initial bounds.
        * @param  {Object} oBounds2 - Final bounds.
        * @returns {Number}
        * @private
        */
        _getAdjacentControlPoints = function(sDirection, oBounds1, oBounds2) {
            switch (sDirection) {
                case 'UP':
                case 'DOWN':
                    return _getYAxisPoints(sDirection, oBounds1, oBounds2);
                case 'LEFT':
                case 'RIGHT':
                    return _getXAxisPoints(sDirection, oBounds1, oBounds2);
            }
        },

        /**
        * Retrieves the `y`-axis points for the specified bounds, dependent on
        * direction of acceleration.
        *
        * @param  {String} sDirection - The direction of acceleration.
        * @param  {Object} oBounds1 - Initial bounds.
        * @param  {Object} oBounds2 - Final bounds.
        * @returns {Number}
        * @private
        */
        _getYAxisPoints = function(sDirection, oBounds1, oBounds2) {
            var x1, x2, y1, y2;

            y1 = (sDirection === 'UP') ? oBounds1.top : oBounds1.top + oBounds1.height;

            y2 = (sDirection === 'UP') ? oBounds2.top + oBounds2.height : oBounds2.top;

            if (oBounds1.left < oBounds2.left) {
                if (oBounds1.left + oBounds1.width <= oBounds2.left) {
                    x1 = oBounds1.left + oBounds1.width + 1;
                    x2 = oBounds2.left;
                } else {
                    x1 = oBounds2.left;
                    x2 = oBounds2.left;
                }
            } else {
                if (oBounds1.left >= oBounds2.left + oBounds2.width) {
                    x1 = oBounds1.left;
                    x2 = oBounds2.left + oBounds2.width + 1;
                } else {
                    x1 = oBounds1.left;
                    x2 = oBounds1.left;
                }
            }

            return [{
                x: x1,
                y: y1
            }, {
                x: x2,
                y: y2
            }];
        },

        /**
        * Retrieves the `x`-axis points for the specified bounds, dependent on
        * direction of acceleration.
        *
        * @param  {String} sDirection - The direction of acceleration.
        * @param  {Object} oBounds1 - Initial bounds.
        * @param  {Object} oBounds2 - Final bounds.
        * @returns {Number}
        * @private
        */
        _getXAxisPoints = function(sDirection, oBounds1, oBounds2) {
            var x1, x2, y1, y2;

            x1 = (sDirection === 'LEFT') ? oBounds1.left : oBounds1.left + oBounds1.width;

            x2 = (sDirection === 'LEFT') ? oBounds2.left + oBounds2.width : oBounds2.left;

            if (oBounds1.top < oBounds2.top) {
                if (oBounds1.top + oBounds1.height <= oBounds2.top) {
                    y1 = oBounds1.top + oBounds1.height + 1;
                    y2 = oBounds2.top;
                } else {
                    y1 = oBounds2.top;
                    y2 = oBounds2.top;
                }
            } else {
                if (oBounds1.top >= oBounds2.top + oBounds2.height) {
                    y1 = oBounds1.top;
                    y2 = oBounds2.top + oBounds2.height + 1;
                } else {
                    y1 = oBounds1.top;
                    y2 = oBounds1.top;
                }
            }

            return [{
                x: x1,
                y: y1
            }, {
                x: x2,
                y: y2
            }];
        },

        /**
        * Calculates precedence value for the given set of axis points and
        * direction of acceleration.
        *
        * @param  {Object} oPoints - Axis points to be evaluated.
        * @param  {Object} sDirection - The direction of acceleration.
        * @returns {Number} The precedence value.
        * @private
        */
        _getPrecedenceValue = function(oPoints, sDirection) {
            var delta = _getDelta(oPoints[0], oPoints[1]),
                slope = _getSlope(delta, sDirection),
                angle = _getAngle(slope),
                distance = _getDistance(delta);

            return angle > 90 ? 0 : 1 / (angle * Math.pow(distance, 4));
        },

        /**
        * Retrieves the difference between points.
        *
        * @param  {Object} point1 - Initial point.
        * @param  {Object} point2 - Destination point.
        * @returns {Object}
        * @private
        */
        _getDelta = function(point1, point2) {
            return {
                dx: Math.abs(point2.x - point1.x),
                dy: Math.abs(point2.y - point1.y)
            };
        },

        /**
        * Retrieves the distance from the specified bounds to the center point.
        *
        * @param  {Object} oBounds1 - Initial bounds.
        * @param  {Object} oBounds2 - Destination bounds.
        * @returns {Object}
        * @private
        */
        _getCenterToCenterDistance = function(oBounds1, oBounds2) {
            var oCenter1 = {
                    x: oBounds1.left + oBounds1.width / 2,
                    y: oBounds1.top + oBounds1.height / 2
                },
                oCenter2 = {
                    x: oBounds2.left + oBounds2.width / 2,
                    y: oBounds2.top + oBounds2.height / 2
                },
                oDelta = _getDelta(oCenter1, oCenter2),
                nDistance = _getDistance(oDelta);

            return nDistance;
        },

        /**
        * Retrieves the slope of the angle.
        *
        * @param  {Object} delta - Initial bounds.
        * @param  {String} sDirection - Destination bounds.
        * @returns {Number} The slope value.
        * @private
        */
        _getSlope = function(delta, sDirection) {
            switch (sDirection) {
                case 'UP':
                case 'DOWN':
                    return delta.dx / delta.dy;
                case 'LEFT':
                case 'RIGHT':
                    return delta.dy / delta.dx;
            }
        },

        /**
        * Retrieves the distance between delta points.
        *
        * @param  {Object} delta - Initial bounds.
        * @returns {Number}
        * @private
        */
        _getDistance = function(delta) {
            return Math.pow(delta.dx * delta.dx + delta.dy * delta.dy, 0.5) || 0.1;
        },

        /**
        * Retrieves the distance between angle based on slope.
        *
        * @param  {Number} nSlope - Slope used to determine angle.
        * @returns {Number}
        * @private
        */
        _getAngle = function(nSlope) {
            return Math.atan(nSlope) * 180 / Math.PI || 0.1;
        },

        /**
        * Calculates nearest neighbor based on bounds and acceleration direction.
        *
        * @param  {Object} o - Object used to determine if it is a neighbor.
        * @param  {Number} sDirection - The direction of acceleration
        * @param  {Number} oBounds1 - Originating bounds.
        * @param  {Number} oControl - The current control.
        * @returns {Number}
        * @private
        */
        _calculateNearestNeighbor = function(o, sDirection, oBounds1, oControl) {
            var n,
                oBounds2,
                nPrecedence,
                nDistance,
                oSibling = null,
                oBestMatch = null,
                nBestMatch = 0,
                nBestDistance = sDirection ? 0 : Infinity,
                nLen = o.length;

            for (n = 0; n < nLen; n++) {
                oSibling = o[n];
                if (oControl && oSibling === oControl) {
                    continue;
                }

                oBounds2 = oSibling.getAbsoluteBounds();

                if (sDirection) {
                    // If control is in half plane specified by direction
                    if (_isInHalfPlane(sDirection, oBounds1, oBounds2)) {
                        // Find control with highest precedence to the direction
                        nPrecedence = _getAdjacentControlPrecedence(sDirection, oBounds1, oBounds2);
                        if (nPrecedence > nBestMatch) {
                            nBestMatch = nPrecedence;
                            oBestMatch = oSibling;
                            nBestDistance = _getCenterToCenterDistance(oBounds1, oBounds2);
                        } else if (nPrecedence == nBestMatch) {
                            nDistance = _getCenterToCenterDistance(oBounds1, oBounds2);
                            if (nBestDistance > nDistance) {
                                nBestMatch = nPrecedence;
                                oBestMatch = oSibling;
                                nBestDistance = nDistance;
                            }
                        }
                    }
                }
                else {
                    nDistance = _getCenterToCenterDistance(oBounds1, oBounds2);
                    if (nDistance < nBestDistance) {
                        nBestDistance = nDistance;
                        oBestMatch = oSibling;
                    }
                }

            }
            return oBestMatch;
        };

    // TODO: Deprecate both `getNearestPointerNeighbor()` and `getNearestNeighbor()`
    //       and replace with a new `getNearestNeighbor()` in Spotlight. Motivation:
    //
    //         * Create a single unified API for finding the neighbor of an arbitrary
    //           Control, the currently focused Control, the location of the pointer,
    //           an arbitrary point, etc.
    //
    //         * Remove Spotlight dependency from NearestNeighbor module, keeping
    //           NearestNeighbor focused on the basic algorithm and decoupled from
    //           details like container vs. not, the existence of 'last focused
    //           child', etc.

    /**
    * Gets the nearest neighbor of the pointer.
    *
    * @param  {Object} oRoot - The root component.
    * @param  {String} sDirection - The direction in which to spot the next control.
    * @param  {Number} nPositionX - The `x` coordinate of the pointer.
    * @param  {Number} nPositionY - The `y` coordinate of the pointer.
    * @returns {Object} The nearest neighbor of the pointer.
    * @public
    */
    this.getNearestPointerNeighbor = function(oRoot, sDirection, nPositionX, nPositionY) {
        var oBounds = {
                left: nPositionX,
                top: nPositionY,
                width: 1,
                height: 1
            },
            o = Spotlight.getChildren(oRoot, true);

        return _calculateNearestNeighbor(o, sDirection, oBounds);
    };

    /**
    * Gets the nearest neighbor of a control.
    *
    * @param  {String} sDirection - The direction in which to spot the next control.
    * @param  {Object} oControl - The control whose nearest neighbor is to be
    * determined.
    * @param  {module:spotlight/neighbor~NeighborOptions} [oOpts] - Additional options to be used
    *   when determining the nearest neighbor.
    * @returns {Object} The nearest neighbor of the control.
    * @public
    */
    this.getNearestNeighbor = function(sDirection, oControl, oOpts) {
        var oRoot = oOpts && oOpts.root,
            oExtraCandidates = oOpts && oOpts.extraCandidates,
            oCandidates,
            oNonContainer,
            oBounds;

        sDirection = sDirection.toUpperCase();
        oControl = oControl || Spotlight.getCurrent();

        // If we've been passed a root, find the best match among its children;
        // otherwise, find the best match among siblings of the reference control
        oCandidates = oRoot ?
            Spotlight.getChildren(oRoot) :
            Spotlight.getSiblings(oControl).siblings;

        // Add extra candidates if exists
        oCandidates = oExtraCandidates ?
            oCandidates.concat(Spotlight.getSiblings(oExtraCandidates).siblings) : oCandidates;

        // If the control is container, the nearest neighbor is calculated based on the bounds
        // of last focused child of container.
        oNonContainer = oControl;
        while (Spotlight.isContainer(oNonContainer)) {
            oNonContainer = Spotlight.Container.getLastFocusedChild(oNonContainer);
        }
        oControl = oNonContainer || oControl;

        oBounds = oControl.getAbsoluteBounds();

        return _calculateNearestNeighbor(oCandidates, sDirection, oBounds, oControl);
    };
};

}],'spotlight/scrolling':[function (module,exports,global,require,request){
/**
* Logic relating to mousewheel events.
*
* Returns a generator function that accepts the [Spotlight]{@link module:spotlight}
* instance as an argument.
*
* @module spotlight/scrolling
* @public
*/
module.exports = function (Spotlight) {
    //* @protected
    /*************************************************************/

    var _nDelta = 0;

    /**
    * Scroll event is fired every `this.frequency` mousewheel points.
    *
    * @type {Number}
    * @public
    */
    this.frequency = 40;

    /**
    * Determines string component id to push.
    *
    * @param  {Object} oEvent - The current event.
    * @param  {Function} fCallback - The callback function.
    * @param  {Object} oContext - The execution context for the callback.
    * @public
    */
    this.processMouseWheel = function(oEvent, fCallback, oContext) {
        _nDelta += oEvent.wheelDeltaY;

        if (_nDelta >= this.frequency) {
            _nDelta = 0;
            return fCallback.apply(oContext, [oEvent, true]);
        } else if (_nDelta <= -this.frequency) {
            _nDelta = 0;
            return fCallback.apply(oContext, [oEvent, false]);
        }
    };
};

}],'spotlight/testmode':[function (module,exports,global,require,request){
var
    roots = require('enyo/roots');

/**
* A collection of Spotlight utilities for use in testing.
*
* Returns a generator function that accepts the [Spotlight]{@link module:spotlight}
* instance as an argument.
*
* @module spotlight/testmode
* @public
*/
module.exports = function (Spotlight) {

    /********************* PRIVATE ********************/

    var _aNodes = [],
        _bEnabled = false;

    var

        /**
        * Destroys all highlight elements.
        *
        * @type {Function}
        * @private
        */
        _destroyExistingHighlightNodes = function() {
            var n;
            for (n = 0; n < _aNodes.length; n++) {
                if (_aNodes[n]) {
                    _aNodes[n].destroy();
                }
            }
            _aNodes = [];
        },

        /**
        * Highlights the current spotted control and adds it to `_aNodes`.
        *
        * @private
        */
        _highlightCurrentControl = function() {
            _aNodes.push(_addConrolHighlightNode({
                control: Spotlight.getCurrent(),
                str: 'C'
            }));
        },

        /**
        * Highlights controls adjacent to the current spotted control and adds
        * them to `_aNodes`.
        *
        * @private
        */
        _highlightAdjacentControls = function() {
            if (!Spotlight.getCurrent()) {
                return;
            }
            var controls = _removeDuplicateHighlightNodes([{
                control: Spotlight.NearestNeighbor.getNearestNeighbor('UP'),
                str: 'U'
            }, {
                control: Spotlight.NearestNeighbor.getNearestNeighbor('DOWN'),
                str: 'D'
            }, {
                control: Spotlight.NearestNeighbor.getNearestNeighbor('LEFT'),
                str: 'L'
            }, {
                control: Spotlight.NearestNeighbor.getNearestNeighbor('RIGHT'),
                str: 'R'
            }]);

            for (var i = 0; i < controls.length; i++) {
                if (!controls[i]) {
                    continue;
                }
                _aNodes.push(_addConrolHighlightNode(controls[i]));
            }
        },

        /**
        * Combines duplicate highlight nodes (created for the same control).
        * This happens when a given control can be reached via multiple 5-way
        * directions (e.g., up and left).
        *
        * @private
        */
        _removeDuplicateHighlightNodes = function(inControls) {
            var returnControls = [],
                dupeOf = -1;

            for (var i = 0; i < inControls.length; i++) {
                dupeOf = -1;

                for (var j = 0; j < inControls.length; j++) {
                    if (inControls[i].control === inControls[j].control && inControls[i].str !== inControls[j].str) {
                        dupeOf = j;
                        break;
                    }
                }

                if (dupeOf > -1) {
                    inControls[i].str += ',' + inControls[dupeOf].str;
                    inControls.splice(dupeOf, 1);
                }

                returnControls.push(inControls[i]);
            }

            return returnControls;
        },

        /**
        * Creates a new control with styling to highlight current or adjacent
        * Spotlight nodes.
        *
        * @private
        */
        _addConrolHighlightNode = function(inObj) {
            if (!inObj || !inObj.control || !inObj.control.hasNode()) {
                return null;
            }

            var bounds = Spotlight.Util.getAbsoluteBounds(inObj.control),
                className = (inObj.str === 'C') ? 'spotlight-current-item' : 'spotlight-adjacent-item',
                highlightNode = roots.roots[0].createComponent({
                    classes: 'spotlight-highlight ' + className,
                    style: 'height:' + bounds.height + 'px;width:' + bounds.width + 'px;top:' + bounds.top + 'px;left:' + bounds.left + 'px;line-height:' + bounds.height + 'px;',
                    content: inObj.str
                });

            highlightNode.render();

            return highlightNode;
        };

    /**
    * Enables test mode.
    *
    * @public
    */
    this.enable = function() {
        _bEnabled = true;
        this.highlight();
    };

    /**
    * Disables test mode.
    *
    * @public
    */
    this.disable = function() {
        _bEnabled = false;
        _destroyExistingHighlightNodes();
    };

    /**
    * Destroys existing highlight nodes and highlights the currently spotted
    * control and adjacent controls.
    *
    * @public
    */
    this.highlight = function() {
        if (!_bEnabled) {
            return;
        }
        _destroyExistingHighlightNodes();
        _highlightCurrentControl();
        _highlightAdjacentControls();
    };

    /**
    * Determines whether test mode is enabled.
    *
    * @returns {Boolean} `true` if test mode is enabled; otherwise, `false`.
    * @public
    */
    this.isEnabled = function() {
        return _bEnabled;
    };
};

}],'spotlight/container':[function (module,exports,global,require,request){
var
    logger = require('enyo/logger');

/**
* Provides the Spotlight Container
*
* Returns a generator function that accepts the [Spotlight]{@link module:spotlight}
* instance as an argument.
*
* @module spotlight/container
* @public
*/
module.exports = function (Spotlight) {

    //* @protected
    /************************************************************/

    var _oThis = this;

    /**
    * Creates `oSender._spotlight` object.
    *
    * @param  {Object} oSender - The object that will be initalized for Spotlight.
    * @private
    */
    var _initComponent = function(oSender) {
            var oLastFocusedChild;
            if (!_isInitialized(oSender)) {
                if (oSender.defaultSpotlightControl) {
                    if (oSender.$[oSender.defaultSpotlightControl]) {
                        oLastFocusedChild = oSender.$[oSender.defaultSpotlightControl];
                    } else if (oSender.owner.$[oSender.defaultSpotlightControl]) {
                        oLastFocusedChild = oSender.owner.$[oSender.defaultSpotlightControl];
                    } else {
                        throw 'Invalid default spotlight control specified in ' + oSender.name;
                    }
                } else {
                    oLastFocusedChild = Spotlight.getFirstChild(oSender);
                }

                if (oLastFocusedChild && oLastFocusedChild.isDescendantOf(oSender)) {
                    _oThis.setLastFocusedChild(oSender, oLastFocusedChild);
                }
            }
        },

        /**
        * Determines whether Spotlight has been initialized.
        *
        * @param  {Object} oSender - The object that will be checked for
        * Spotlight initalization.
        * @return {Boolean} `true` if Spotlight has been initialized; otherwise, `false`.
        * @private
        */
        _isInitialized = function(oSender) {
            return typeof oSender._spotlight.lastFocusedChild != 'undefined';
        },

        /**
        * Handles events bubbling from within the container.
        *
        * @param  {Object} oSender - The object that is sending the event.
        * @param  {Object} oEvent - The event to bubble.
        * @private
        */
        _handleEvent = function(oSender, oEvent) {
            oSender.cachePoint = true;
            switch (oEvent.type) {
                case 'onSpotlightFocus':
                    if (oEvent.originator !== oSender) {
                        _oThis.setLastFocusedChild(oSender, oEvent.originator);
                    }
                    break;
                case 'onSpotlightKeyDown':
                    // Inform other controls that spotlight 5-way event was generated within a container
                    oEvent.spotSentFromContainer = true;
                    break;
                case 'onSpotlightContainerEnter':
                    if(oEvent.last && oEvent.last !== oSender && oEvent.last.isDescendantOf(oSender)) {
                        return true;
                    }
                    break;
                case 'onSpotlightContainerLeave':
                    if(oEvent.commonAncestor && oEvent.commonAncestor.isDescendantOf(oSender)) {
                        return true;
                    }
                    break;
            }
        },

        /**
        * Determines whether last spotted control was the container's child.
        *
        * @param  {Object} oSender
        * @returns {Object}
        * @private
        */
        _hadFocus = function(oSender) {
            var oLastControl = Spotlight.getLastControl();
            if (oSender._spotlight.bEnorceOutsideIn) {
                return false;
            } // Programmatically spotted containers are always treated as not having focus
            if (!Spotlight.isSpottable(oLastControl)) {
                return false;
            } // Because oLastControl might have been DHD'd
            return Spotlight.Util.isChild(oSender, oLastControl);
        };

    /**
    * Starts intercepting events to keep track of last focus for container.
    * Call this API after dynamically setting Spotlight as "container".
    *
    * @param  {Object} control
    * @public
    */
    this.initContainer = function(control) {
        if (!control._spotlight || (control._spotlight && !control._spotlight.interceptEvents)) {
            control._spotlight = control._spotlight || {};
            control._spotlight.interceptEvents = true;
            Spotlight.Util.interceptEvents(control, _handleEvent);
        }
    };

    /**
    * Handles Spotlight focus event.
    *
    * @param  {Object} oSender - The sender of the event.
    * @param  {Object} oEvent - The focus event.
    * @public
    */
    this.onSpotlightFocus = function(oSender, oEvent) {
        oSender._spotlight = oSender._spotlight || {};
        oSender._spotlight.bEnorceOutsideIn = !oEvent.dir;
    };

    /**
    * Handles Spotlight focused event.
    *
    * @param  {Object} oSender - The sender of the event.
    * @param  {Object} oEvent - The focused event.
    * @returns {Boolean}
    * @public
    */
    this.onSpotlightFocused = function(oSender, oEvent) {
        var o5WayEvent,
            s5WayEventType,
            s5WayEventDir,
            o5WayEventOriginator,
            oChildToFocus;

        if (Spotlight.isInitialized() && Spotlight.getPointerMode()) {
            return true;
        }
        _initComponent(oSender);

        // Extract info from the 5-way event that got us here. We
        // may need this info to focus the proper child, or to
        // redispatch the event for procssing by other containers
        o5WayEvent = Spotlight.getLast5WayEvent();
        if (o5WayEvent) {
            s5WayEventType = o5WayEvent.type;
            s5WayEventDir = s5WayEventType.replace('onSpotlight', '').toUpperCase();
            // Containers with `spotlightRememberFocus: false` need to know about
            // the 'original' (non-container) originator of the event, so we pass
            // it around using the `_originator` property
            o5WayEventOriginator = o5WayEvent._originator ?
                o5WayEvent._originator :
                o5WayEvent.originator;
        }

        // Focus came from inside AND this was a 5-way move
        if (_hadFocus(oSender)) {
            if (s5WayEventType) {

                // Re-dispatch 5 way event
                Spotlight.Util.dispatchEvent(
                    s5WayEventType, {
                        spotSentFromContainer: true,
                        _originator: o5WayEventOriginator
                    },
                    oSender
                );
            }

            // Focus came from outside or this was a programmatic spot
        } else {
            // Default container behavior is to refocus the last-focused child, but
            // some containers may prefer to focus the child nearest the originator
            // of the 5-way event
            if (o5WayEvent && oSender.spotlightRememberFocus === false) {
                oChildToFocus = Spotlight.NearestNeighbor.getNearestNeighbor(
                    // 5-way direction
                    s5WayEventDir,
                    // The true (non-container) originator of the 5-way event
                    o5WayEventOriginator,
                    // To scope our search to children of the container, we
                    // designate it as the root
                    {root: oSender}
                );
            }
            if (!oChildToFocus) {
                oChildToFocus = this.getLastFocusedChild(oSender);
            }
            if (oChildToFocus) {
                Spotlight.spot(oChildToFocus, {direction: s5WayEventDir});
            } else {
                if (s5WayEventType) {

                    // Re-dispatch 5 way event
                    Spotlight.Util.dispatchEvent(
                        s5WayEventType, {
                            spotSentFromContainer: true,
                            _originator: o5WayEventOriginator
                        },
                        oSender
                    );
                    return true;
                }
            }
        }

        return true;
    };

    /**
    * Returns last focused child of the container.
    *
    * @param  {Object} oSender
    * @returns {Object} - The last focused child of the container.
    * @public
    */
    this.getLastFocusedChild = function(oSender) {
        oSender._spotlight = oSender._spotlight || {};
        if (!oSender._spotlight.lastFocusedChild || !Spotlight.isSpottable(oSender._spotlight.lastFocusedChild)) {
            oSender._spotlight.lastFocusedChild = Spotlight.getChildren(oSender)[0];
        }
        return oSender._spotlight.lastFocusedChild;
    };

    /**
    * Sets last focused child for the container.
    *
    * @param  {Object} oSender
    * @param  {Object} oChild - The child to set as the last focused child. Set to `null`
    *   to clear the last focused child.
    * @public
    */
    this.setLastFocusedChild = function(oSender, oChild) {
        if (oSender.spotlightRememberFocus === false || oChild === null) {
            oSender._spotlight.lastFocusedChild = null;
            return;
        }
        if (!Spotlight.isSpottable(oChild)) {
            oChild = Spotlight.getFirstChild(oChild);
        }
        if (oChild) {
            oSender._spotlight = oSender._spotlight || {};
            oSender._spotlight.lastFocusedChild = oChild;
        } else {
            logger.warn('Spotlight Container attempting to set non-spottable lastFocusedChild');
        }
    };

    this.fireContainerEvents = function (blurredControl, focusedControl) {
        if(blurredControl && blurredControl.hasNode()) {
            var to = focusedControl.hasNode(),
                from = blurredControl,
                position = 0;

            // find common ancestor
            do {
                // skip over tagless Controls (e.g. enyo/ScrollStrategy)
                if (!from.hasNode()) {
                    from = from.parent;
                    continue;
                }
                position = to.compareDocumentPosition(from.hasNode());
                if(from == focusedControl || (position & Node.DOCUMENT_POSITION_CONTAINS)) {
                    Spotlight.Util.dispatchEvent('onSpotlightContainerLeave', {
                        commonAncestor: from
                    }, blurredControl);
                    break;
                } else {
                    from = from.parent;
                }
            } while (from);
        }

        if(focusedControl) {
            Spotlight.Util.dispatchEvent('onSpotlightContainerEnter', {
                last: blurredControl,
                current: focusedControl
            }, focusedControl);
        }
    };
};

}],'spotlight/util':[function (module,exports,global,require,request){
var
    dispatcher = require('enyo/dispatcher'),
    dom = require('enyo/dom'),
    utils = require('enyo/utils'),
    Control = require('enyo/Control');

/**
* A collection of utility methods for use with Spotlight.
*
* Returns a generator function that accepts the [Spotlight]{@link module:spotlight}
* instance as an argument.
*
* @module spotlight/util
* @public
*/
var Util = module.exports = function (Spotlight) {

    /**
    * Attempts to dispatch all Spotlight events through the low-level dispatcher
    * or directly through the originating control.
    *
    * @param  {String} sEvent - The current event to validate.
    * @param  {Object} oInData - The callback to be executed.
    * @param  {Object} oControl - The dispatch originator.
    * @public
    */
    this.dispatchEvent = function(sEvent, oInData, oControl) {
        var oData;

        if (!oControl || oControl.destroyed) {
            return;
        }

        if (Spotlight.isFrozen()) {
            if (sEvent == 'onSpotlightBlur') {
                return;
            }
            oControl = Spotlight.getCurrent();
        }

        if (oInData) {
            oData = utils.clone(oInData);
        } else {
            oData = {};
        }

        oData.type = sEvent;
        oData.originator = oControl;
        oData.originator.timestamp = oData.timeStamp;
        oData.target = oControl.hasNode();
        oData.customEvent = (oData.customEvent === undefined) ? true : oData.customEvent;

        if (oData.target) {
            // We attempt to dispatch all spotlight events through the low-level dispatcher,
            // so that they can be filtered through features like the modal/capture feature
            return dispatcher.dispatch(oData);
        } else {
            // However, if a control has been teardownRendered (and has no node) we still
            // need to ensure it gets lifecycle events like onSpotlightBlur, so we dispatch
            // directly to the control
            return dispatcher.dispatchBubble(oData, oControl);
        }
    };

    /**
    * Attaches event hook to capture events coming from within the container.
    *
    * @param  {Object} oControl - The dispatch originator.
    * @param  {Function} fHandler - The event handler function.
    * @public
    */
    this.interceptEvents = function(oControl, fHandler) {
        var f = oControl.dispatchEvent;

        oControl.dispatchEvent = function(sEventName, oEvent, oEventSender) {
            // If handler returns true - prevent default
            if (!oEvent.delegate && fHandler(oControl, oEvent)) {
                oEvent.type = null;
                return true;
            } else {
                // If handler returns false - call original dispatcher and allow bubbling
                return f.apply(oControl, [sEventName, oEvent, oEventSender]);
            }
        };
    };

    /**
    * Determines whether one control is a child of another control.
    *
    * @param  {Object} oParent - The parent control.
    * @param  {Object} oChild - The potential child control.
    * @return {Boolean} `true` if `oChild` is a child of `oParent`; otherwise,
    * `false`.
    * @public
    */
    this.isChild = function(oParent, oChild) {
        if (!oParent) {
            return false;
        }
        if (!oChild) {
            return false;
        }

        while (oChild.parent) {
            oChild = oChild.parent;
            if (oChild === oParent) {
                return true;
            }
        }
        return false;
    };

    /**
    * Preserved for backward compatibility; users should instead call
    * [getAbsoluteBounds()]{@link module:enyo/Control~Control#getAbsoluteBounds} on the
    * {@link module:enyo/Control~Control} instance (or
    * [enyo/dom.getAbsoluteBounds()]{@link module:enyo/dom#getAbsoluteBounds} for the
    * node).
    *
    * @param  {Object} oControl - The control to query for bounds.
    * @public
    */
    this.getAbsoluteBounds = function(oControl) {
        var node = oControl instanceof Control ? oControl.hasNode() : oControl;
        return dom.getAbsoluteBounds(node);
    };

    /**
    * Determines whether a control has a given CSS class applied.
    *
    * @param  {module:enyo/Control~Control} o - The control to query.
    * @param  {String} s - The name of the CSS class.
    * @return {Boolean} `true` if the class is applied to the control; otherwise, `false`.
    * @public
    */
    this.hasClass = function(o, s) {
        if (!o || !o.className) {
            return;
        }
        return (' ' + o.className + ' ').indexOf(' ' + s + ' ') >= 0;
    };

    /**
    * Applies a CSS class to a control.
    *
    * @param  {module:enyo/Control~Control} o - The control to be styled.
    * @param  {String} s - The name of the CSS class to apply.
    * @public
    */
    this.addClass = function(o, s) {
        if (o && !this.hasClass(o, s)) {
            var ss = o.className;
            o.className = (ss + (ss ? ' ' : '') + s);
        }
    };

    /**
    * Removes a CSS class from a control.
    *
    * @param  {Object} o - The control from which to remove the class.
    * @param  {String} s - The name of the CSS class name to remove.
    * @public
    */
    this.removeClass = function(o, s) {
        if (o && this.hasClass(o, s)) {
            var ss = o.className;
            o.className = (' ' + ss + ' ').replace(' ' + s + ' ', ' ').slice(1, -1);
        }
    };

    /**
    * Queries a string for the presence of a given suffix.
    *
    * @param  {String} s - The string to query.
    * @param  {String} sSuffix - The suffix to look for.
    * @return {Boolean} `true` if the string ends in the specified suffix;
    * otherwise, `false`.
    * @public
    */
    this.stringEndsWith = function(s, sSuffix) {
        return s.indexOf(sSuffix, s.length - sSuffix.length) !== -1;
    };

    /**
    * Translates a direction to an appropriate Spotlight event.
    *
    * @param  {String} sDirection - The direction of acceleration.
    * @return {String} The name of the corresponding Spotlight event.
    * @public
    */
    this.directionToEvent = function(sDirection) {
        return 'onSpotlight' + sDirection.charAt(0).toUpperCase() + sDirection.substr(1).toLowerCase();
    };

    /**
    * Gets the default control to move to in a particular direction.
    *
    * @param  {String} sDirection - The direction of movement.
    * @param  {Object} oControl - The control from which movement will occur.
    * @public
    */
    this.getDefaultDirectionControl = function(sDirection, oControl) {
        var sProperty = 'defaultSpotlight' + sDirection.charAt(0).toUpperCase() + sDirection.substr(1).toLowerCase(),
            oNeighbor;
        if (typeof oControl[sProperty] == 'string') {
            oNeighbor = oControl.owner.$[oControl[sProperty]];
            if (typeof oNeighbor != 'undefined') {
                return oNeighbor;
            }
        }
        return null;
    };

    /**
    * Determines whether the given event is a simulated click.
    * We use the same check as in dispatcher to know when it's simulated: looking for x/y == 0.
    *
    * @param  {Object} oEvent - The current event.
    * @return {Boolean} `true` if event is a simulated click; otherwise, `false`.
    * @public
    */
    this.isSimulatedClick = function(oEvent) {
        return (
            oEvent.clientX === 0 && oEvent.clientY === 0 && !oEvent.detail &&
            (oEvent.type == 'click' || oEvent.type == 'tap')
        );
    };
};

// use faster classList interface if it exists
if (document.createElement('div').classList) {
    Util.hasClass = function(o, s) {
        if (o) {
            return o.classList.contains(s);
        }
    };
    Util.addClass = function(o, s) {
        if (o) {
            return o.classList.add(s);
        }
    };
    Util.removeClass = function(o, s) {
        if (o) {
            return o.classList.remove(s);
        }
    };
}

}],'spotlight/spotlight':[function (module,exports,global,require,request){
var
    dispatcher = require('enyo/dispatcher'),
    gesture = require('enyo/gesture'),
    logger = require('enyo/logger'),
    master = require('enyo/master'),
    options = require('enyo/options'),
    roots = require('enyo/roots'),
    utils = require('enyo/utils'),
    Component = require('enyo/Component'),
    Control = require('enyo/Control'),
    Signals = require('enyo/Signals');

var
    Accelerator = require('./accelerator'),
    Container = require('./container'),
    Muter = require('./muter'),
    NearestNeighbor = require('./neighbor'),
    Scrolling = require('./scrolling'),
    TestMode = require('./testmode'),
    Util = require('./util');

/**
* Spotlight is an extensible utility that enables users to navigate
* Enyo applications using a keyboard or television remote control.
*
* @module spotlight
*/
var Spotlight = module.exports = new function () {

    /**
    * Reference to this to be inherited by private closures below.
    * @type {Object}
    * @private
    */
    var _oThis = this,

        /**
        * Topmost component instance where Spotlight events are caught.
        * @type {Object}
        * @default null
        * @private
        */
        _oRoot = null,

        /**
        * Is set by `spot()` if it is called before `initialize()`, will be
        * spotted in `initialize()`.
        * @type {Object}
        * @default null
        * @private
        */
        _oDefaultControl = null,

        /**
        * Whether Spotlight is in pointer mode (as opposed to 5-way mode).
        * @type {Boolean}
        * @default true
        * @private
        */
        _bPointerMode = true,

        /**
        * Whether Spotlight has `_oCurrent`.
        * @type {Boolean}
        * @default false
        * @private
        */
        _bInitialized = false,

        /**
        * State variable allowing us to suppress Spotlight select on
        * keyup in the specific case where a press of the [Enter] key
        * has just triggered a switch from pointer mode to 5-way mode
        * (since we only want to switch modes in this case, not perform
        * a selection)
        * @type {Boolean}
        * @default false
        * @private
        */
        _bSuppressSelectOnNextKeyUp = false,

        /**
        * The currently spotted element.
        * @type {Object}
        * @default null
        * @private
        */
        _oCurrent = null,

        /**
        * The last event received by Spotlight.
        * @type {Object}
        * @default null
        * @private
        */
        _oLastEvent = null,

        /**
        * The last 5-way event received by Spotlight.
        * @type {Object}
        * @default null
        * @private
        */
        _oLast5WayEvent = null,

        /**
        * The last non-container `(spotlight: true)` control that was `_oCurrent`.
        * @type {Object}
        * @default null
        * @private
        */
        _oLastControl = null,

        /**
        * For things like input boxes, we need a way to disable pointer mode while
        * cursor is inside.
        * @type {Boolean}
        * @default true
        * @private
        */
        _bEnablePointerMode = true,

        /**
        * For keeping state consistency between `onMouseDown()` and `onMouseUp()`,
        * if focus has been moved in between.
        * @type {Object}
        * @default null
        * @private
        */
        _oDepressedControl = null,

        /**
        * When the user presses Enter to perform a Spotlight select, we keep track
        * of the target on keydown. If the target disappears before keyup, we end
        * the hold gesture immediately and suppress the selection when the keyup
        * occurs.
        * @type {Object}
        * @default null
        * @private
        */
       _o5WaySelectTarget = null,

       /**
        * When the user presses Enter to perform a Spotlight select, we keep track
        * of the original keydown event, since the event exposes an API allowing the
        * developer to prevent the tap that normally fires on Spotlight select. We
        * check the cached event on keyup to see whether the tap has been prevented.
        * @type {Object}
        * @default null
        * @private
        */
       _oDownEvent = null,

        /**
        * In verbose mode, Spotlight prints 1) Current 2) Pointer mode change to `enyo.log`.
        * @type {Boolean}
        * @default false
        * @private
        */
        _bVerbose = false,

        /**
        * While frozen, current cannot change and all events are directed to it.
        * @type {Boolean}
        * @default false
        * @private
        */
        _bFrozen = false,

        /**
        * While paused, Spotlight movement is effectively disabled and the state is locked, so
        * nothing can be spotted or unspotted.
        *
        * @type {Boolean}
        * @default false
        * @private
        */
        _bPaused = false,

        /**
        * Contains the control specified in `defaultSpotlightDisappear` property of
        * `_oCurrent`.
        * @type {Object}
        * @default null
        * @private
        */
        _oDefaultDisappear = null,

        /**
        * Whether focus is currently visible onscreen `(hasCurrent && !pointingAway)`.
        * @type {Boolean}
        * @default false
        * @private
        */
        _bFocusOnScreen = false,

        /**
        * Number of consecutive mousemoves; `>1` is required to switch to pointer mode.
        * @type {Number}
        * @default 0
        * @private
        */
        _nMouseMoveCount = 0,

        /**
        * @type {Number}
        * @default null
        * @private
        */
        _nPrevClientX = null,

        /**
        * @type {Number}
        * @default null
        * @private
        */
        _nPrevClientY = null,

        /**
        * @type {Object}
        * @default null
        * @private
        */
        _oLastMouseMoveTarget = null,

        /**
        * Timestamp at the last point the pointer was hidden.
        * @type {Number}
        * @default 0
        * @private
        */
        _nPointerHiddenTime = 0,

        /**
        * Length of time in milliseconds required after hiding pointer before 5-way keys
        * are processed.
        * @type {Number}
        * @default 300
        * @private
        */
        _nPointerHiddenToKeyTimeout = 300,

        /**
        * If a key down was ignored, be sure to ignore the following key up. Specifically, this
        * works around the different target keyup for Enter for inputs (input on down, body on up).
        *
        * @type {Number}
        * @default 0
        * @private
        */
        _nIgnoredKeyDown = 0,

        /**
        * Timeout ID for observeDisappearance used to ensure only 1 timeout is scheduled at a time
        *
        * @type {Number}
        * @default 0
        * @private
        */
        _disappearTimeout = 0;

        /**
        * @constant
        * @type {Number}
        * @default 1536
        */
    var KEY_POINTER_SHOW = 1536,

        /**
        * @constant
        * @type {Number}
        * @default 1537
        */
        KEY_POINTER_HIDE = 1537;


    var
        /**
        * Event hook to the owner to catch Spotlight events.
        *
        * @private
        */
        _interceptEvents = function() {
            _oThis.rootDispatchFunction = master.dispatchEvent;
            master.dispatchEvent = function(sEventName, oEvent, oSender) {
                if (_oThis.rootDispatchFunction.apply(master, [sEventName, oEvent, oSender])) {
                    return true;
                }
                if (!oEvent.delegate && !_oThis.isPaused()) {
                    return _oThis.onSpotlightEvent(oEvent);
                }
            };
        },

        /**
        * Creates control-specific Spotlight state storage.
        *
        * @param {Object} oControl - The control to be initialized.
        * @private
        */
        _initializeControl = function(oControl) {
            if (typeof oControl._spotlight == 'undefined') {
                oControl._spotlight = {};
            }
        },

        /**
        * Gets control specified in `defaultSpotlightDisappear` property
        * of the specified control. Gotta get it before it disappears :)
        *
        * @param {Object} oControl
        * @private
        */
        _setDefaultDisappearControl = function(oControl) {
            _oDefaultDisappear = _oThis.Util.getDefaultDirectionControl(
                'disappear',
                oControl
            );
        },

        /**
        * Observer
        *
        * @param {Object} oControl
        * @private
        */
        _onDisappear = function() {

            if (_oThis.isPaused()) return;

            // Only handle disappearance once
            if (_onDisappear.isOff) {
                return;
            }

            // Ignore if control is still spotable
            if (_oThis.isSpottable(_oCurrent)) {
                return;
            }
            _onDisappear.isOff = true;

            if (_oCurrent === _o5WaySelectTarget) {
                gesture.drag.endHold();
                _oDownEvent = null;
                _o5WaySelectTarget = null;
            }

            // If there's a defaultDisappear control, pick that
            var oControl = _oDefaultDisappear;

            // Nothing is set in defaultSpotlightDisappear
            if (!oControl || !_oThis.isSpottable(oControl)) {

                // Find spottable parent or first spottable in the app as a fallback
                oControl = _oThis.getParent() || _oThis.getFirstChild(_oRoot);
                if (!oControl) {
                    _unhighlight(_oLastControl);
                    _oLastControl = null;

                    _observeDisappearance(false, _oCurrent);
                    // NULL CASE :(, just like when no spottable children found on init
                    _oCurrent = null;
                    return;
                }
            }

            _oThis.spot(oControl, {focusType: 'default'});
        },

        /**
        * Adds observers on control's parent chain.
        *
        * @param {Boolean} bObserve
        * @param {Object} oControl
        * @param {Boolean} bInAncestor
        * @private
        */
        _observeDisappearance = function(bObserve, oControl, bInAncestor) {

            // Terminal case
            if (!oControl) {
                return;
            }
            var sMethod = bObserve ? 'addObserver' : 'removeObserver';

            // When processing _oCurrent itself
            if (!bInAncestor) {

                // When adding observer to _oCurrent itself
                if (bObserve) {

                    // Set one-time-call flag of _onDisappear function
                    _onDisappear.isOff = false;

                    // Capture defaultSpotlightDisappear control
                    _setDefaultDisappearControl(oControl);

                    // since this is called asynchronously, the control could have been made
                    // unspottable after but within the same frame as the spot()
                    if (oControl.disabled || oControl.destroyed || !oControl.spotlight || !oControl.generated) {
                        _onDisappear();
                        return;
                    }
                }

                // Enough to check in _oCurrent only, no ancestors
                oControl[sMethod]('disabled', _onDisappear);

                // Enough to check in _oCurrent only, no ancestors
                oControl[sMethod]('destroyed', _onDisappear);

                // Enough to check in _oCurrent only, no ancestors
                oControl[sMethod]('spotlight', _onDisappear);

                // Enough to check in _oCurrent only, no ancestors
                oControl[sMethod]('generated', _onDisappear);
            }

            // ensure the original control is still visible and spottable
            if (bObserve && !oControl.showing) {
                _onDisappear();
                return;
            }

            // Have to add-remove hadler to all ancestors for showing
            oControl[sMethod]('showing', _onDisappear);

            _observeDisappearance(bObserve, oControl.parent, true);
        },

        /**
        * Sets currently spotted control.
        *
        * @param {Object} oControl - The control to be spotted.
        * @private
        */
        _setCurrent = function(oControl) {
            _initializeControl(oControl);

            if (!_oThis.isSpottable(oControl)) {
                throw 'Attempting to spot not-spottable control: ' + oControl.toString();
            }

            var oExCurrent = _oCurrent,
                oPrevious = _oLastControl;

            // Remove spotlight class and Blur
            _oThis.unspot(oControl);

            // Add spotlight class
            _highlight(oControl);

            _oCurrent = oControl;

            // Set observers asynchronously to allow painting to happen faster. Only schedule the
            // job if there isn't a pending timeout (when _disappearTimeout would be 0)
            _disappearTimeout = _disappearTimeout || setTimeout(utils.bind(_oThis, function (was) {
                _disappearTimeout = 0;
                _observeDisappearance(false, was);
                _observeDisappearance(true, _oCurrent);
            }, oExCurrent), 1);

            _oThis.Container.fireContainerEvents(oExCurrent || _oLastControl, _oCurrent);

            _log('CURRENT =', _oCurrent.toString());
            Signals.send('onSpotlightCurrentChanged', {
                current: oControl
            });

            if (oControl.spotlight === true) {
                _oLastControl = oControl;
            }

            _dispatchEvent('onSpotlightFocused', {previous: oPrevious});

            _oThis.TestMode.highlight();

            return true;
        },

        /**
        * Artificially triggers events (e.g., `click`) on current control.
        *
        * @private
        */
        _dispatchEvent = function(sEvent, oData, oControl) {
            oControl = oControl || _oThis.getCurrent();
            return _oThis.Util.dispatchEvent(sEvent, oData, oControl);
        },

        /**
        * Get the default 5-way move target (if any) when moving in a
        * given direction from a given control
        *
        * @private
        */
        _getDefault5WayMoveTarget = function(sDirection, oControl) {
            var oTarget;

            sDirection = sDirection.toUpperCase();
            oControl = oControl || _oThis.getCurrent();

            oTarget = _oThis.Util.getDefaultDirectionControl(sDirection, oControl);
            if (oTarget) {
                if (_oThis.isSpottable(oTarget)) {
                    return oTarget;
                } else {
                    oTarget = _oThis.getFirstChild(oTarget);
                    if (oTarget && _oThis.isSpottable(oTarget)) {
                        return oTarget;
                    }
                }
            }

            return null;
        },

        /**
        * Moves to nearest neighbor based on 5-way Spotlight event.
        *
        * @param {Object} oEvent - The current 5-way event.
        * @private
        */
        _5WayMove = function(oEvent) {
            var sDirection = oEvent.type.replace('onSpotlight', '').toUpperCase(),
                leave = oEvent.requestLeaveContainer,
                oControl =
                    // If we've been asked to exit the current container,
                    // no need to look for a target. Setting `oControl` to `null`
                    // will land us in the `else` block below and force the event
                    // to propagate up the container chain.
                    leave ? null : (
                        // If there's a default target specified, use that...
                        _getDefault5WayMoveTarget(sDirection) ||
                        // Otherwise, find one using the nearest-neighbor algorithm
                        _oThis.NearestNeighbor.getNearestNeighbor(sDirection)

                    );

            // If oEvent.allowDomDefault() was not called
            // this will preventDefault on dom keydown event
            _preventDomDefault(oEvent);
            _oLast5WayEvent = oEvent;

            // If we have _o5WaySelectTarget, that means we have a Spotlight-managed
            // hold gesture in progress. We need to end it.
            if (_o5WaySelectTarget) {
                gesture.drag.endHold();
                _oDownEvent = null;
                _o5WaySelectTarget = null;
            }

            if (oControl) {
                _oThis.spot(oControl, {direction: sDirection});
            } else {
                if (_oThis.Accelerator.isAccelerating()) {
                    _oThis.Accelerator.cancel();
                } else {
                    var oParent = _oThis.getParent();

                    // Reached the end of spottable world
                    if (!oParent || oParent.spotlightModal) {
                        _spotLastControl({focusType: '5-way bounce'});
                    } else {
                        _oThis.spot(oParent, {direction: sDirection});
                    }
                }
            }
        },

        /**
        * Determines whether `oEvent.keyCode` represents a 5-way key.
        *
        * @param {Object} oEvent - The current 5-way event.
        * @return {Boolean} `true` if `keyCode` is a 5-way key (i.e., a directional arrow
        * or Enter); otherwise, `false`.
        * @private
        */
        _is5WayKey = function(oEvent) {

            // 13==Enter, 16777221==KeypadEnter
            return (utils.indexOf(oEvent.keyCode, [37, 38, 39, 40, 13, 16777221]) > -1);
        },

        /**
        * Determines whether the key that was pressed is supposed to be ignored by the
        * event's originator.  Checks whether the originator of the event had any keyCodes
        * specified as ones to ignore, returning `true` if it was supposed to ignore the
        * `oEvent.keyCode`, or `false` if not.
        *
        * @param {Object} oEvent - The current 5-way event.
        * @return {Boolean} `true` if the keyCode should be ignored; otherwise, `false`.
        * @private
        */
        _isIgnoredKey = function(oEvent) {
            var oOriginator = dispatcher.$[oEvent.target.id];
            if (oOriginator && oOriginator.spotlightIgnoredKeys) {
                var aKeys = oOriginator.spotlightIgnoredKeys;
                if (!utils.isArray(aKeys)) {
                    aKeys = [aKeys];
                }
                if (utils.indexOf(oEvent.keyCode, aKeys) > -1) {
                    return true;
                }
            }
            return false;
        },

        /**
        * Prevents default on DOM event associated with Spotlight event.
        * This is only for 5-way keydown events.
        *
        * @param {Object} oEvent - The current 5-way event.
        * @private
        */
        _preventDomDefault = function(oSpotlightEvent) {

            // Prevent default to keep the browser from scrolling the page, etc.,
            if (_is5WayKey(oSpotlightEvent)) {

                // unless Event.allowDomDefault is explicitly called on the event
                oSpotlightEvent.domEvent.preventDefault();
            }
        },

        /**
        * If originator is container, delegates processing of event
        * to `spotlight/container.onSpotlight*`. If delegate method is
        * found, its return value is returned; otherwise, `true` is returned.
        *
        * @param {Object} oEvent - The current 5-way event.
        * @return {Boolean}
        * @private
        */
        _delegateContainerEvent = function(oEvent) {
            if (oEvent.type && oEvent.type.indexOf('onSpotlight') === 0) {
                if (_oThis.isContainer(oEvent.originator)) {
                    if (typeof _oThis.Container[oEvent.type] == 'function') {
                        return _oThis.Container[oEvent.type](oEvent.originator, oEvent);
                    }
                }
            }
            return false;
        },

        /**
        * Gets spottable target for pointer events.
        *
        * @param {Object} oDomTarget - The target node to start from.
        * @return {Object} - The spottable target.
        * @private
        */
        _getSpottableTarget = function(oDomTarget) {
            var oTarget;

            do {
                oTarget = oDomTarget && dispatcher.$[oDomTarget.id];
                oDomTarget = oDomTarget && oDomTarget.parentNode;
            } while (!oTarget && oDomTarget);

            if (oTarget) {
                if (_oThis.isSpottable(oTarget)) {
                    return oTarget;
                } else {
                    return _oThis.getParent(oTarget);
                }
            }
        },

        /**
        * Highlights the specified control.
        *
        * @param {Object} oControl - The control to be highlighted.
        * @param {Boolean} bIgnoreMute - Whether muting should be ignored.
        * @private
        */
        _highlight = function(oControl, bIgnoreMute) {

            // Not highlighting when muted
            if (_oThis.isMuted() && !bIgnoreMute) {
                return;
            }

            // Not highlighting containers
            if (_oThis.isContainer(oControl)) {
                return;
            }

            // Not highlighting first non-container control - see this.initialize()
            if (!_oThis.isInitialized()) {
                return;
            }

            // enyo.Spotlight.bench.stop();
            oControl.addClass('spotlight');
            _bFocusOnScreen = true;
        },

        /**
        * Unhighlights a control.
        *
        * @param {Object} oControl - The control to be unhighlighted.
        * @private
        */
        _unhighlight = function(oControl) {
            oControl.removeClass('spotlight');
            _bFocusOnScreen = false;
        },

        /**
        * Determines whether pointer is pointing away.
        *
        * @return {Boolean} `true` if pointer is pointing away; otherwise, `false`.
        * @private
        */
        _isPointingAway = function() {
            return _oThis.getPointerMode() && !_oLastMouseMoveTarget;
        },

        /**
        * Determines whether timestamp is expired.
        *
        * @return {Boolean} `true` if timestamp is expired; otherwise, `false`.
        * @private
        */
        _isTimestampExpired = function() {
            return utils.perfNow() >= (_nPointerHiddenTime + _nPointerHiddenToKeyTimeout);
        },

        /**
        * Sets the timestamp.
        *
        * @private
        */
        _setTimestamp = function() {
            _nPointerHiddenTime = utils.perfNow();
        },

        /**
        * Logs messages if verbose mode is enabled.
        *
        * @private
        */
        _log = function() {
            if (_bVerbose) {
                logger.log('SPOTLIGHT: ' + Array.prototype.slice.call(arguments, 0).join(' '));
            }
        },

        /**
        * Emits warning messages.
        *
        * @type {Function}
        * @private
        */
        _warn = function() {
            logger.warn('SPOTLIGHT: ' + Array.prototype.slice.call(arguments, 0).join(' '));
        },

        /**
        * Spots the last control.
        *
        * @private
        */
        _spotLastControl = function(info) {
            var focusType = (info && info.focusType) || 'default';

            if (_oThis.isSpottable(_oLastControl)) {
                return _oThis.spot(_oLastControl, {focusType: focusType});
            } else {
                return _spotFirstChild();
            }
        },

        /**
        * Spots the first child of the Spotlight root.
        *
        * @private
        */
        _spotFirstChild = function() {
            return _oThis.spot(_oThis.getFirstChild(_oRoot), {focusType: 'default'});
        },

        /**
        * Attempts to spot the control nearest the current pointer position.
        * If no nearest control is found, the previous control is spotted.
        *
        * @param {Object} oEvent - The current event.
        * @private
        */
        _spotNearestToPointer = function(oEvent) {
            var sDir = oEvent && _getSpotDirection(oEvent),
                oNearest = _oThis.
                    NearestNeighbor.
                    getNearestPointerNeighbor(_oRoot,
                        sDir,
                        _nPrevClientX,
                        _nPrevClientY
                    );
            if (oNearest) {
                _oThis.spot(oNearest, {direction: sDir});
            } else {
                _spotLastControl();
            }
        },

        /**
        * Determines the intended direction of a keypress, given a keydown event.
        *
        * @param {Object} oEvent - The event whose direction is to be determined.
        * @private
        */
        _getSpotDirection = function(oEvent) {
            switch (oEvent.keyCode) {
                case 37:
                    return "LEFT";
                case 38:
                    return "UP";
                case 39:
                    return "RIGHT";
                case 40:
                    return "DOWN";
            }
        };

    //* Generic event handlers
    /***************************************************/

    // Events dispatched to the spotlighted controls
    this.onEvent = function(oEvent) {

        // Events only processed when Spotlight initialized with a root
        if (this.isInitialized()) {
            switch (oEvent.type) {
                case 'keyboardStateChange':
                    // webOSMouse event comes only when pointer mode
                    if (oEvent && oEvent.detail) {
                        if (!oEvent.detail.visibility) {
                            this.unmute('window.focus');
                        }
                    }
                    break;
                case 'webOSMouse':
                    // webOSMouse event comes only when pointer mode
                    if (oEvent && oEvent.detail) {
                        if (oEvent.detail.type == 'Leave') {
                            this.unspot();
                            this.mute('window.focus');
                        }
                        if (oEvent.detail.type == 'Enter') {
                            this.unmute('window.focus');
                        }
                    }
                    break;
                case 'focus':
                    if (oEvent.target === window) {
                        this.unmute('window.focus');
                        // Update pointer mode from cursor visibility platform API
                        if (window.PalmSystem && window.PalmSystem.cursor) {
                            this.setPointerMode( window.PalmSystem.cursor.visibility );
                        }
                        // Whenever app goes to foreground, refocus on last focused control
                        _spotLastControl();
                    }
                    break;
                case 'blur':
                    if (oEvent.target === window) {
                        // Whenever app goes to background, unspot focus
                        this.unspot();
                        this.setPointerMode(false);

                        // Stop any hold/holdpulses that may currently be active
                        gesture.drag.endHold();
                        // the "downEvent" property is a private implementation detail of gesture,
                        // but making the fix here as it is by far the simplest and least impactful
                        if (gesture.downEvent) {
                            gesture.up(gesture.downEvent);
                        }

                        this.mute('window.focus');
                    }
                    break;
                case 'move':

                    // Only register mousemove if the x/y actually changed,
                    // avoid mousemove while scrolling, etc.
                    // We require two mousemove events to switch to pointer
                    // mode, since the device can send an errant mousemove
                    // when pressing a 5-way key for the first time
                    if (this.clientXYChanged(oEvent) && (_nMouseMoveCount++ > 1)) {
                        return this.onMouseMove(oEvent);
                    }
                    break;
                case 'mousedown':
                case 'touchstart':
                    return this.onMouseDown(oEvent);
                case 'mouseup':
                    return this.onMouseUp(oEvent);
                case 'click':
                case 'tap':
                case 'ontap':
                    return this.onClick(oEvent);
                case 'mousewheel':
                    // Don't dispatch spotlight mousewheel events if pointing away
                    if (_isPointingAway()) {
                        return false;
                    }
                    return this.Scrolling.processMouseWheel(oEvent, this.onScroll, this);
                case 'keydown':
                    return this.onKeyDown(oEvent);
                case 'keyup':
                    return this.onKeyUp(oEvent);
            }
        }
        return false; // Because we like to be explicit
    };

    /**
    * Receives accelerated keyup and keydown from accelerator.
    *
    * @method
    * @param {Object} oEvent - The event to interpret.
    * @public
    */
    this.onAcceleratedKey = function(oEvent) {
        oEvent.domEvent = oEvent;
        oEvent.allowDomDefault = function() {
            oEvent.preventDefault = function() {
                //logger.log('Dummy function');
            };
        };
        gesture.drag.prepareHold(oEvent);
        if (oEvent.keyCode === 13) {
            oEvent.preventTap = function () {
                this._tapPrevented = true;
            };
        }
        switch (oEvent.type) {
            case 'keydown':
                return _dispatchEvent('onSpotlightKeyDown', oEvent);
            case 'keyup':
                return _dispatchEvent('onSpotlightKeyUp', oEvent);
        }

        return true; // Should never get here
    };

    // Spotlight events bubbled back up to the App
    this.onSpotlightEvent = function(oEvent) {
        _oLastEvent = oEvent;

        if (!_delegateContainerEvent(oEvent)) {
            switch (oEvent.type) {

                /**
                * @event module:spotlight#onSpotlightKeyUp
                * @public
                */
                case 'onSpotlightKeyUp':
                    return this.onSpotlightKeyUp(oEvent);

                /**
                * @event module:spotlight#onSpotlightKeyDown
                * @public
                */
                case 'onSpotlightKeyDown':
                    return this.onSpotlightKeyDown(oEvent);

                /**
                * @event module:spotlight#onSpotlightFocus
                * @public
                */
                case 'onSpotlightFocus':
                    return this.onSpotlightFocus(oEvent);

                /**
                * @event module:spotlight#onSpotlightFocused
                * @public
                */
                case 'onSpotlightFocused':
                    return this.onSpotlightFocused(oEvent);

                /**
                * @event module:spotlight#onSpotlightBlur
                * @public
                */
                case 'onSpotlightBlur':
                    return this.onSpotlightBlur(oEvent);

                /**
                * @event module:spotlight#onSpotlightLeft
                * @public
                */
                case 'onSpotlightLeft':
                    return this.onSpotlightLeft(oEvent);

                /**
                * @event module:spotlight#onSpotlightRight
                * @public
                */
                case 'onSpotlightRight':
                    return this.onSpotlightRight(oEvent);

                /**
                * @event module:spotlight#onSpotlightUp
                * @public
                */
                case 'onSpotlightUp':
                    return this.onSpotlightUp(oEvent);

                /**
                * @event module:spotlight#onSpotlightDown
                * @public
                */
                case 'onSpotlightDown':
                    return this.onSpotlightDown(oEvent);

                /**
                * @event module:spotlight#onSpotlightSelect
                * @public
                */
                case 'onSpotlightSelect':
                    return this.onSpotlightSelect(oEvent);
            }
        }
    };

    /**
    * Called by `onEvent()` (via Spotlight scrolling) to process scroll events.
    *
    * @method
    * @param {Object} oEvent - The current event.
    * @param {Boolean} bUp - Whether scroll is in upward direction.
    * @public
    */
    this.onScroll = function(oEvent, bUp) {
        var sEventName = 'onSpotlightScroll' + (bUp ? 'Up' : 'Down');
        return _dispatchEvent(sEventName, {
            domEvent: oEvent
        });
    };

    // Called by `onEvent()` to process mousemove events.
    this.onMouseMove = function(oEvent) {
        if (!_bEnablePointerMode) {
            return;
        }

        // Preserving explicit setting of mode for future features
        this.setPointerMode(true);
        if (this.getPointerMode()) {
            var oTarget = _getSpottableTarget(oEvent.target);
            if (oTarget && !this.isContainer(oTarget)) {

                if (
                    oTarget === _oLastMouseMoveTarget && (
                        oEvent.index === undefined ||
                        oEvent.index === _oLastMouseMoveTarget._nCurrentSpotlightItem
                    )
                ) {
                    return;
                } // ignore consecutive mouse moves on same target
                this.spot(oTarget, {focusType: 'point'});
                _oLastMouseMoveTarget = oTarget;

            } else {
                _oLastMouseMoveTarget = null;
                this.unspot();
            }
        }
    };

    // Called by `onEvent()` to process mousedown events.
    this.onMouseDown = function(oEvent) {

        // Run mousemove logic first, in case content beneath cursor changed since
        // last mousemove, e.g. animating controls
        this.onMouseMove(oEvent);

        // Logic to exit frozen mode when depressing control other than current
        // And transfer spotlight directly to it
        if (this.isFrozen()) {
            var oTarget = _getSpottableTarget(oEvent.target);
            if (oTarget != _oCurrent && !oEvent.defaultPrevented) {
                this.unfreeze();
                this.unspot();
                if (oTarget) {
                    this.spot(oTarget, {focusType: 'point'});
                }
                return true;
            }
        }

        if (this.getPointerMode()) {
            return false;
        } // Allow mousedown to bubble

        // Simulate an Enter key from Magic Remote click in 5Way mode
        oEvent.preventDefault();

        var oEventClone = utils.clone(oEvent);
        oEventClone.keyCode = 13;
        oEventClone.domEvent = oEvent;
        oEventClone.allowDomDefault = utils.nop;

        _oDepressedControl = this.getCurrent();
        _dispatchEvent('onSpotlightKeyDown', oEventClone, _oDepressedControl);

        // Because we should never see mouse events in 5way mode
        return true;
    };

    // Called by `onEvent()` to process mouseup events.
    this.onMouseUp = function(oEvent) {
        if (this.getPointerMode()) {
            return false;
        } // Allow mouseup to bubble

        // Simulate an Enter key from Magic Remote click in 5Way mode
        oEvent.preventDefault();

        var oEventClone = utils.clone(oEvent);
        oEventClone.keyCode = 13;
        oEventClone.domEvent = oEvent;

        _dispatchEvent('onSpotlightKeyUp', oEventClone, _oDepressedControl);
        return true; // Because we should never see mouse events in 5way mode
    };

    // Called by `onEvent()` to process tap and click events.
    this.onClick = function(oEvent) {
        // Prevent browser-simulated "click" events when pressing enter
        // on a focused form control from being processed;

        // Prevent browser-simulated "click" events when pressing enter
        // on a focused form control
        if (this.Util.isSimulatedClick(oEvent)) {
            return true;
        }

        // Allow click to bubble
        if (this.getPointerMode()) {
            return false;
        }

        // In 5Way mode we are simulating enter key down/up based
        // on mousedown/up, so suppress click
        oEvent.preventDefault();

        // Because we should never see mouse events in 5way mode unles we simulated them
        return !oEvent.fromSpotlight;
    };

    // Called by `onEvent()` to process keydown.
    this.onKeyDown = function(oEvent) {

        _bSuppressSelectOnNextKeyUp = false;

        if (_isIgnoredKey(oEvent)) {
            _nIgnoredKeyDown = oEvent.which;
            return false;
        } else {
            _nIgnoredKeyDown = 0;
        }

        // Update pointer mode based on special keycode from
        // Input Manager for magic remote show/hide
        switch (oEvent.keyCode) {

            // Pointer shown event; set pointer mode true
            case KEY_POINTER_SHOW:
                this.setPointerMode(true);
                return false;

                // Pointer hidden event; set pointer mode false
            case KEY_POINTER_HIDE:

                this.unmute('window.focus');

                setTimeout(function() {
                    if (this.getPointerMode()) {
                        this.setPointerMode(false);

                        // Spot last 5-way control, only if there's not already focus on screen
                        if (!_oLastMouseMoveTarget) {
                            utils.asyncMethod(this, function() {
                                _spotLastControl();
                            });
                        }
                        _setTimestamp();
                    }
                }.bind(this), 30);
                return false;
        }

        // Arrow keys immediately switch to 5-way mode, and
        // re-spot focus on screen if it wasn't already
        if (_is5WayKey(oEvent)) {
            var bWasPointerMode = this.getPointerMode();
            this.setPointerMode(false);

            this.unmute('window.focus');

            // Spot first available control on bootstrap
            if (!this.isSpottable(this.getCurrent()) ||
                // Or does this immediately follow KEY_POINTER_HIDE
                (!_isTimestampExpired() && !_oLastMouseMoveTarget) ||
                // Or spot last 5-way control, only if there's not already focus on screen
                (bWasPointerMode && !_oLastMouseMoveTarget && !this.isFrozen())) {

                _spotNearestToPointer(oEvent);
                _bSuppressSelectOnNextKeyUp = oEvent.keyCode == 13;
                return false;
            }
        }

        // Don't dispatch spotlight key events if we're in pointer
        // mode and not currently spotting something
        if (_isPointingAway()) {
            return false;
        }

        this.Accelerator.processKey(oEvent, this.onAcceleratedKey, this);

        // Always allow key events to bubble regardless of what onSpotlight** handlers return
        return false;
    };

    this.onKeyUp = function(oEvent) {
        if (_nIgnoredKeyDown === oEvent.which || _isIgnoredKey(oEvent)) {
            return false;
        }

        if (_bSuppressSelectOnNextKeyUp) {
            _bSuppressSelectOnNextKeyUp = false;
            return false;
        }

        this.Accelerator.processKey(oEvent, this.onAcceleratedKey, this);

        // Always allow key events to bubble regardless of what onSpotlight** handlers return
        return false;
    };

    //* Spotlight event handlers
    /************************************************************/

    this.onSpotlightRight = function(oEvent) {
        _5WayMove(oEvent);
    };
    this.onSpotlightLeft = function(oEvent) {
        _5WayMove(oEvent);
    };
    this.onSpotlightDown = function(oEvent) {
        _5WayMove(oEvent);
    };
    this.onSpotlightUp = function(oEvent) {
        _5WayMove(oEvent);
    };

    this.onSpotlightKeyUp = function(oEvent) {
        var ret = true;

        switch (oEvent.keyCode) {
            case 13:
                if (oEvent.originator === _o5WaySelectTarget) {
                    oEvent._tapPrevented = oEvent._tapPrevented || _oDownEvent._tapPrevented;
                    ret = _dispatchEvent('onSpotlightSelect', oEvent);
                    gesture.drag.endHold();
                    _oDownEvent = null;
                }
                _o5WaySelectTarget = null;
        }

        // Should never get here
        return ret;
    };
    this.onSpotlightKeyDown = function(oEvent) {

        switch (oEvent.keyCode) {
            case 13:
                if (!this.Accelerator.isAccelerating()) {
                    _o5WaySelectTarget = oEvent.originator;
                    gesture.drag.beginHold(oEvent);
                    _oDownEvent = oEvent;
                }
                return true;
            case 37:
                return _dispatchEvent('onSpotlightLeft', oEvent);
            case 38:
                return _dispatchEvent('onSpotlightUp', oEvent);
            case 39:
                return _dispatchEvent('onSpotlightRight', oEvent);
            case 40:
                return _dispatchEvent('onSpotlightDown', oEvent);
        }

        // Should never get here
        return true;
    };

    this.onSpotlightSelect = function(oEvent) {

        // If oEvent.allowDomDefault() was not called
        // this will preventDefault on dom keydown event
        _preventDomDefault(oEvent);
        var aChildren,
            oNeighbor = this.Util.getDefaultDirectionControl('SELECT', this.getCurrent());

        // clear last 5way event
        _oLast5WayEvent = null;

        if (oNeighbor) {
            return this.spot(oNeighbor);
        }

        aChildren = this.getChildren(oEvent.originator);
        if (aChildren.length === 0) {
            if (oEvent._tapPrevented) {
                return true;
            }
            else {
                return _dispatchEvent('tap', {
                        customEvent: false,
                        preventDefault: utils.nop,
                        fromSpotlight: true
                    },
                    oEvent.originator);
            }
        } else {
            return this.spot(aChildren[0], {focusType: 'default'});
        }
    };

    /**
    * Called when Spotlight is focusing on a control.
    *
    * @method
    * @param {Object} oEvent - The current event.
    * @public
    */
    this.onSpotlightFocus = function(oEvent) {
        _setCurrent(oEvent.originator);
    };

    /**
    * Called after Spotlight has focused on a control.
    *
    * @method
    * @param {Object} oEvent - The current event.
    * @public
    */
    this.onSpotlightFocused = function(oEvent) {
        var c = oEvent.originator;

        // Accessibility - Set focus to read aria label.
        // Do not focus labels (e.g. moonstone/InputDecorator) since the default behavior is to
        // transfer focus to its internal input.
        if (options.accessibility && !this.getPointerMode()) {
            if (c && !c.accessibilityDisabled && c.tag != 'label') {
                c.focus();
            }
            else if (oEvent.previous) {
                oEvent.previous.blur();
            }
        }
    };

    /**
    * Called when control's focus is blurred.
    *
    * @method
    * @param {Object} oEvent - The current event.
    * @public
    */
    this.onSpotlightBlur = function(oEvent) {};

    /**
    * Initializes Spotlight's flags and root.
    *
    * @method
    * @param {Object} oRoot - The root container.
    * @public
    */
    this.initialize = function(oRoot) {

        // Prevent double init'ion, for example, it
        // may be init'd in app.rendered before enyo.rendered.
        if (this.isInitialized()) {
            return false;
        }

        // Set root
        _oRoot = oRoot;

        // Capture spotlight events at root level of the app
        _interceptEvents();

        // From this point on, isInitialized() returns true.
        // Need it to be true for spot() to spot
        _bInitialized = true;

        if (_oDefaultControl) {
            if (this.spot(_oDefaultControl, {focusType: 'default'})) {
                return true;
            }
        }

        if (_spotFirstChild()) {
            return true;
        }
    };

    /**
    * Determines whether Spotlight has been initialized (i.e., it has `_oCurrent` and
    * `last5waycontrol`).
    *
    * @method
    * @return {Boolean} `true` if Spotlight has been initialized; otherwise, `false`.
    * @public
    */
    this.isInitialized = function() {
        return _bInitialized;
    };

    /**
    * Sets pointer mode.
    *
    * @method
    * @param {Boolean} bPointerMode - Whether pointer mode should be enabled.
    * @public
    */
    this.setPointerMode = function(bPointerMode) {
        if (!this.isPaused() && (_bPointerMode != bPointerMode)) {
            _bPointerMode = bPointerMode;
            _log('Pointer mode', _bPointerMode);
            _nMouseMoveCount = 0;
            Signals.send('onSpotlightModeChanged', {
                pointerMode: bPointerMode
            });
        }
    };

    /**
    * Gets the current pointer mode
    * @return {Boolean} `true` if pointer mode
    */
    this.getPointerMode = function() {
        return _bPointerMode;
    };
    this.getCurrent = function() {
        return _oCurrent;
    };
    this.setCurrent = function(oControl) {
        if (this.isPaused()) return false;
        return _setCurrent(oControl);
    };
    this.hasCurrent = function() {
        return _oCurrent !== null;
    };
    this.getLastEvent = function() {
        return _oLastEvent;
    };
    this.getLastControl = function() {
        return _oLastControl;
    };
    this.getLast5WayEvent = function() {
        return _oLast5WayEvent;
    };

    // Deprecated; provided for backward-compatibility.
    this.setLast5WayControl = function(oControl) {
        if (this.isPaused()) return false;
        _oLastControl = oControl;
    };

    this.isSpottable = function(oControl, bSkipContainers) {
        oControl = oControl || this.getCurrent();
        if (!oControl) {
            return false;
        }
        var bSpottable = false;

        if (this.isContainer(oControl)) {
            if (!bSkipContainers) {

                // Are there spotlight=true descendants?
                bSpottable = this.hasChildren(oControl);
            }
        } else {
            bSpottable = (

                // Control has been destroyed, but not yet garbage collected
                !oControl.destroyed &&

                // Control has spotlight property set
                typeof oControl.spotlight != 'undefined' &&

                // Control has spotlight=true or 'container'
                oControl.spotlight &&

                // Control is visible
                oControl.getAbsoluteShowing(true) &&

                // Control is not disabled
                !oControl.disabled &&

                // Control is rendered
                oControl.generated &&

                // Control does not have spotlight disabled
                !oControl.spotlightDisabled
            );
        }
        return bSpottable;
    };

    // Is oControl.spotlight == "container"
    this.isContainer = function(oControl) {
        if (!oControl) {
            return false;
        }
        return oControl.spotlight == 'container';
    };

    // Is there at least one descendant of oControl
    // (or oControl itself) that has spotlight = "true"
    this.hasChildren = function(oControl) {
        if (!oControl || oControl.spotlightDisabled) {
            return false;
        }
        if (!this.isContainer(oControl) && this.isSpottable(oControl)) {
            return true;
        }
        var n, aChildren = oControl.children;
        for (n = 0; n < aChildren.length; n++) {
            if (this.hasChildren(aChildren[n])) {
                return true;
            }
        }
        return false;
    };

    /**
    * Returns spottable children along with position of self.
    *
    * @param {Object} oControl - The control whose siblings are to be retrieved.
    * @private
    */
    this.getSiblings = function(oControl) {
        oControl = oControl || this.getCurrent();
        if (!oControl) {
            return;
        }
        var n,
            o = {},
            oParent = this.getParent(oControl) || _oRoot;

        o.siblings = this.getChildren(oParent);

        for (n = 0; n < o.siblings.length; n++) {
            if (oControl === o.siblings[n]) {
                o.selfPosition = n;
            }
        }

        return o;
    };

    /**
    * Dispatches focus event to the control or its first spottable child.
    *
    * @param {Object} oControl - The control whose children are to be retrieved.
    * @param {Boolean} bSpotlightTrueOnly - Whether to retrieve only spottable children.
    * @private
    */
    this.getChildren = function(oControl, bSpotlightTrueOnly) {
        oControl = oControl || this.getCurrent();
        if (!oControl) {
            return;
        }
        var n,
            aChildren = [],
            oNext;

        if (!oControl.spotlightDisabled) {
            for (n = 0; n < oControl.children.length; n++) {
                oNext = oControl.children[n];
                if (this.isSpottable(oNext, bSpotlightTrueOnly)) {
                    aChildren.push(oNext);
                } else {
                    aChildren = aChildren.concat(this.getChildren(oNext, bSpotlightTrueOnly));
                }
            }
        }
        return aChildren;
    };

    /**
    * Returns closest spottable parent, or `null` if there is none.
    *
    * @param {Object} oControl - The control whose parent is to be retrieved.
    * @return {module:enyo/Control~Control} - The control's closest spottable parent.
    * @private
    */
    this.getParent = function(oControl) {
        oControl = oControl || this.getCurrent();
        if (!oControl) {
            return;
        }
        var oSpottableParent = null;
        while (oControl.parent) {
            oControl = oControl.parent;
            if (this.isSpottable(oControl)) {
                oSpottableParent = oControl;
                break;
            }
        }
        return oSpottableParent;
    };

    /**
    * Dispatches focus event to the control or its first spottable child. This method has no effect if
    * Spotlight is [frozen]{@link module:spotlight#isFrozen} or
    * [pointer mode]{@link module:spotlight#getPointerMode} is true.
    *
    * @param {module:enyo/Control~Control} oControl - The control to be focused.
    * @param {Object} info - Information about the nature of the focus operation.
    *   The properties of the `info` object are utilized by the logic in the `spot()`
    *   and included in the payload of the resulting `onSpotlightFocus` event. The
    *   `info` parameter is intended primarily for Spotlight's internal use; application
    *   code should generally not need to use it.
    * @return {Boolean} - `true` if control was focused successfully; otherwise, `false`.
    * @public
    */
    this.spot = function(oControl, info) {
        if (this.isPaused()) {
            _warn('can\'t spot in paused mode');
            return false;
        }

        // Support for legacy 2nd and 3rd arguments (sDirection, bWasPoint)
        if (arguments.length > 2 || typeof arguments[1] === 'string') {
            _warn('Spotlight.spot(): Agruments have changed. See docs.');
            info = {
                direction: arguments[1],
                focusType: arguments[2] ? 'point' : (arguments[1] ? '5-way' : 'explicit')
            };
        }

        info = info || {};

        info.previous = _oLastControl;

        if (info.direction) {
            info.focusType = '5-way';
            // Support legacy 'dir' property
            info.dir = info.direction;
        }
        else if (!info.focusType) {
            info.focusType = 'explicit';
        }

        // If spotlight is not yet initialized
        // Preserve control to be spotted on initialize
        if (!this.isInitialized()) {
            _oDefaultControl = oControl;
            return true;
        }

        // Cannot spot falsy values
        if (!oControl) {
            return false;
        }

        // Can only spot enyo/Controls
        if (!(oControl instanceof Control)) {
            _warn('argument is not enyo.Control');
            return false;
        }

        // Current cannot change while in frozen mode
        if (this.isFrozen()) {
            _warn('can\'t spot in frozen mode');
            return false;
        }

        // If control is not spottable, find its spottable child
        var oOriginal = oControl;
        if (!this.isSpottable(oControl)) {
            oControl = this.getFirstChild(oControl);
        }

        // If already spotted, nothing to do
        if (oControl) {
            if (_oCurrent === oControl) {
                return true;
            }

            // In pointer mode, we only spot in response to pointer events
            // (where focusType === 'point'). For other types of focus requests
            // (e.g. an explicit call to `spot()` or a request from within
            // Spotlight to focus a default Control), we just unspot and set
            // the _oLastControl variable, which is used to
            // set focus when re-entering 5-way mode.
            if (this.getPointerMode() && info.focusType !== 'point') {
                this.unspot();

                _oLastControl = oControl;

                _oLastMouseMoveTarget = null;
                _log("Spot called in pointer mode; 5-way will resume from: " + oControl.id);
            } else {

                // Dispatch focus to new control
                _dispatchEvent('onSpotlightFocus', info, oControl);
            }
            return true;
        }
        _warn('can\'t spot: ' + oOriginal.toString() +
            ' is not spottable and has no spottable descendants');

        return false;
    };

    /**
    * Dispatches Spotlight blur event to current control.
    *
    * @param {Object} oControl - The control to be blurred.
    * @return {Boolean} - `true` if control was successfully blurred; otherwise, `false`.
    * @public
    */
    this.unspot = function(oNext) {
        // Current cannot change while paused or in frozen mode
        if (this.isPaused() || this.isFrozen()) {
            return false;
        }

        if (this.hasCurrent() && _bFocusOnScreen) {
            _unhighlight(_oCurrent);
            _oLastMouseMoveTarget = null;
            _dispatchEvent('onSpotlightBlur', {next: oNext}, _oCurrent);
            _observeDisappearance(false, _oCurrent);
            _oCurrent = null;
            return true;
        }
        return false;
    };

    /**
    * Gets first spottable child of a control.
    *
    * @param {Object} oControl - The control whose child is to be retrieved.
    * @return {module:enyo/Control~Control} - The first spottable child.
    * @private
    */
    this.getFirstChild = function(oControl) {
        oControl = oControl || this.getCurrent();
        if (!oControl) {
            return null;
        }
        return this.getChildren(oControl)[0];
    };

    /**
    * Determines whether X or Y value has changed since last mousemove event.
    *
    * @param {Object} oEvent - The current event.
    * @return {Boolean} - `true` if either X or Y has changed; otherwise, `false`.
    * @private
    */
    this.clientXYChanged = function(oEvent) {
        var bChanged = (
            _nPrevClientX !== oEvent.clientX ||
            _nPrevClientY !== oEvent.clientY
        );

        if (this.getPointerMode()) {
            _nPrevClientX = oEvent.clientX;
            _nPrevClientY = oEvent.clientY;
        }

        return bChanged;
    };

    /**
    * Disables pointer mode.
    *
    * @public
    */
    this.disablePointerMode = function() {
        _bEnablePointerMode = false;
    };

    /**
    * Enables pointer mode.
    *
    * @public
    */
    this.enablePointerMode = function() {
        _bEnablePointerMode = true;
    };

    /**
    * Switches to muted mode (no `'spotlight'` CSS class set in DOM).
    *
    * @private
    */
    this.mute = function(oSender) {
        this.Muter.addMuteReason(oSender);
    };
    this.unmute = function(oSender) {
        this.Muter.removeMuteReason(oSender);
    };
    this.isMuted = function() {
        return this.Muter.isMuted();
    };

    /**
    * Sets verbose mode.
    *
    * @param {Boolean} bVerbose - Whether verbose mode should be enabled.
    * @return {String} Feedback message for logging.
    * @private
    */
    this.verbose = function(bVerbose) {
        _bVerbose = (typeof bVerbose == 'undefined') ? !_bVerbose : bVerbose;
        return 'SPOTLIGHT: Verbose mode set to ' + _bVerbose;
    };

    /**
    * Switches to frozen mode (current cannot change while frozen).
    *
    * @public
    */
    this.freeze = function() {
		if (!this.isPaused() && this.hasCurrent()) {
			_bFrozen = true;
		} else {
			_warn('Can not enter frozen mode until something is spotted and/or we are not paused');
		}
    };

    /**
    * Switches to unfrozen mode.
    *
    * @public
    */
    this.unfreeze = function() {
        _bFrozen = false;
    };

    /**
    * Determines whether frozen mode is currently enabled.
    *
    * @return {Boolean} `true` if frozen mode is currently enabled; otherwise, `false`.
    * @public
    */
    this.isFrozen = function() {
        return _bFrozen;
    };

    /**
    * Switches to paused mode (Spotlight movement is effectively disabled and state is locked, so
    * nothing can be spotted/unspotted).
    *
    * @public
    */
    this.pause = function() {
        _bPaused = true;
    };

    /**
    * Switches back to normal Spotlight behavior.
    *
    * @public
    */
    this.resume = function() {
        _bPaused = false;
    };

    /**
    * Determines whether Spotlight is currently paused.
    *
    * @return {Boolean} `true` if Spotlight is currently paused; otherwise, `false`.
    * @public
    */
    this.isPaused = function() {
        return _bPaused;
    };

    /**
    * Highlights the specified control.
    *
    * @param {module:enyo/Control~Control} oControl - The control to highlight.
    * @param {Boolean} bIgnoreMute - Whether to ignore muting.
    * @private
    */
    this.highlight = function(oControl, bIgnoreMute) {
        _highlight(oControl, bIgnoreMute);
    };

    /**
    * Unhighlights the specified control.
    *
    * @param {module:enyo/Control~Control} oControl - The control to unhighlight.
    * @private
    */
    this.unhighlight = function(oControl) {
        _unhighlight(oControl);
    };

    /**
     * @type {module:spotlight/accelerator}
     */
    this.Accelerator = new Accelerator(this);
    /**
     * @type {module:spotlight/container}
     */
    this.Container = new Container(this);
    /**
     * @type {module:spotlight/muter}
     */
    this.Muter = new Muter(this);
    /**
     * @type {module:spotlight/neighbor}
     */
    this.NearestNeighbor = new NearestNeighbor(this);
    /**
     * @type {module:spotlight/scrolling}
     */
    this.Scrolling = new Scrolling(this);
    /**
     * @type {module:spotlight/testmode}
     */
    this.TestMode = new TestMode(this);
    /**
     * @type {module:spotlight/util}
     */
    this.Util = new Util(this);
};

// Event hook to all system events to catch keypress and mouse events.
dispatcher.features.push(function(oEvent) {
    if (!Spotlight.isPaused()) return Spotlight.onEvent(oEvent);
});

// Initialization
roots.rendered(function(oRoot) {
    // Spotlight.verbose();
    Spotlight.initialize(oRoot);
});

/*
Using the hack below to ensure that statically declared Spotlight containers are
initialized upon creation. Our previous pass at this used enyo/Control.extend(),
which meant it failed to work for Control subkinds whose constructors were created
immediately (vs. being deferred). Unfortunately, this caused big problems in webOS,
where the "container" app systematically disables the deferral of constructor
creation.

There is some discussion ongoing as to whether we need a nicer mechanism for
extending functionality in cases like this (see comments in BHV-15323), but in
the meantime we need to proceed with a quick fix for this issue.
*/

var originalEnyoComponentCreate = Component.create;

Component.create = function () {
    var component = originalEnyoComponentCreate.apply(Component, arguments);
    if (component.spotlight == 'container') {
        Spotlight.Container.initContainer(component);
    }
    // When accessibility is enabled, set the tabindex for any control that is
    // spottable and doesn't have a valid tabindex.
    if (component.spotlight === true && options.accessibility && !component.tabIndex && component.tabIndex !== 0) {
        component.set('tabIndex', '-1');
    }
    return component;
};

// Spotlight.bench = new function() {
//     var _oBench = null;
//
//     this.start = function() {
//         if (!_oBench) {
//             _oBench = enyo.dev.bench({name: 'bench1', average: true});
//         }
//         _oBench.start();
//     }
//
//     this.stop = function() {
//         _oBench.stop();
//     }
// }

},{'./accelerator':'spotlight/accelerator','./container':'spotlight/container','./muter':'spotlight/muter','./neighbor':'spotlight/neighbor','./scrolling':'spotlight/scrolling','./testmode':'spotlight/testmode','./util':'spotlight/util'}],'spotlight':[function (module,exports,global,require,request){
var
	Spotlight = require('./src/spotlight');

Spotlight.version = '2.7.0';

module.exports = Spotlight;

},{'./src/spotlight':'spotlight/spotlight'}]
	};

});
//# sourceMappingURL=spotlight.js.map