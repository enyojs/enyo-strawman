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
	return {'enyo-ilib/ilib':[function (module,exports,global,require,request){
/*
 * ilib.js - define the ilib name space
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @namespace The global namespace that contains general ilib functions useful
 * to all of ilib
 * 
 * @version // !macro ilibVersion
 */
var ilib = ilib || {};

/** @private */
ilib._ver = function() {
    return // !macro ilibVersion
    ;
};

/**
 * Return the current version of ilib.
 * 
 * @static
 * @return {string} a version string for this instance of ilib
 */
ilib.getVersion = function () {
	// TODO: need some way of getting the version number under dynamic load code
    return ilib._ver() || "11.0"; 
};

/**
 * Place where resources and such are eventually assigned.
 */
ilib.data = {
	/** @type {{ccc:Object.<string,number>,nfd:Object.<string,string>,nfc:Object.<string,string>,nfkd:Object.<string,string>,nfkc:Object.<string,string>}} */
    norm: {
    	ccc: {},
    	nfd: {},
    	nfc: {},
    	nfkd: {},
    	nfkc: {}
    },
    zoneinfo: {
        "Etc/UTC":{"o":"0:0","f":"UTC"},
        "local":{"f":"local"}
    },
    /** @type {null|Object.<string,Array.<Array.<number>>>} */ ctype: null,
    /** @type {null|Object.<string,Array.<Array.<number>>>} */ ctype_c: null,
    /** @type {null|Object.<string,Array.<Array.<number>>>} */ ctype_l: null,
    /** @type {null|Object.<string,Array.<Array.<number>>>} */ ctype_m: null,
    /** @type {null|Object.<string,Array.<Array.<number>>>} */ ctype_p: null,
    /** @type {null|Object.<string,Array.<Array.<number>>>} */ ctype_z: null,
    /** @type {null|Object.<string,Array.<Array.<number>>>} */ scriptToRange: null,
    /** @type {null|Object.<string,string|Object.<string|Object.<string,string>>>} */ dateformats: null,
    /** @type {null|Array.<string>} */ timezones: []
};

/*
if (typeof(window) !== 'undefined') {
    window["ilib"] = ilib;
}
*/

// export ilib for use as a module in nodejs
if (typeof(module) !== 'undefined') {
    module.exports = ilib;
    module.exports.ilib = ilib;  // for backwards compatibility with older versions of ilib
}

/**
 * Sets the pseudo locale. Pseudolocalization (or pseudo-localization) is used for testing
 * internationalization aspects of software. Instead of translating the text of the software
 * into a foreign language, as in the process of localization, the textual elements of an application
 * are replaced with an altered version of the original language.These specific alterations make
 * the original words appear readable, but include the most problematic characteristics of 
 * the world's languages: varying length of text or characters, language direction, and so on.
 * Regular Latin pseudo locale: eu-ES and RTL pseudo locale: ps-AF
 * 
 * @param {string|undefined|null} localename the locale specifier for the pseudo locale
 */
ilib.setAsPseudoLocale = function (localename) {
   if (localename) {
	   ilib.pseudoLocales.push(localename)
   }
};

/**
 * Reset the list of pseudo locales back to the default single locale of zxx-XX.
 * @static
 */
ilib.clearPseudoLocales = function() {
	ilib.pseudoLocales = [
        "zxx-XX",
        "zxx-Cyrl-XX",
        "zxx-Hans-XX",
        "zxx-Hebr-XX"
    ];
};

ilib.clearPseudoLocales();

/**
 * Return the name of the platform
 * @private
 * @static
 * @return {string} string naming the platform
 */
ilib._getPlatform = function () {
    if (!ilib._platform) {
    	try {
    		if (typeof(java.lang.Object) !== 'undefined') {
    			ilib._platform = (typeof(process) !== 'undefined') ? "trireme" : "rhino";
    			return ilib._platform;
    		}
    	} catch (e) {}
    	
        if (typeof(process) !== 'undefined' && typeof(module) !== 'undefined') {
            ilib._platform = "nodejs";
        } else if (typeof(Qt) !== 'undefined') {
            ilib._platform = "qt";
        } else if (typeof(window) !== 'undefined') {
            ilib._platform = (typeof(PalmSystem) !== 'undefined') ? "webos" : "browser";
        } else {
            ilib._platform = "unknown";
        }
    }    
    return ilib._platform;
};

/**
 * If this ilib is running in a browser, return the name of that browser.
 * @private
 * @static
 * @return {string|undefined} the name of the browser that this is running in ("firefox", "chrome", "ie", 
 * "safari", or "opera"), or undefined if this is not running in a browser or if
 * the browser name could not be determined 
 */
ilib._getBrowser = function () {
	var browser = undefined;
	if (ilib._getPlatform() === "browser") {
		if (navigator && navigator.userAgent) {
			if (navigator.userAgent.indexOf("Firefox") > -1) {
				browser = "firefox";
			}
			if (navigator.userAgent.indexOf("Opera") > -1) {
				browser = "opera";
			}
			if (navigator.userAgent.indexOf("Chrome") > -1) {
				browser = "chrome";
			}
			if (navigator.userAgent.indexOf(" .NET") > -1) {
				browser = "ie";
			}
			if (navigator.userAgent.indexOf("Safari") > -1) {
				// chrome also has the string Safari in its userAgent, but the chrome case is 
				// already taken care of above
				browser = "safari";
			}
		}
	}
	return browser;
};

/**
 * Return true if the global variable is defined on this platform.
 * @private
 * @static
 * @param {string} name the name of the variable to check
 * @return {boolean} true if the global variable is defined on this platform, false otherwise
 */
ilib._isGlobal = function(name) {
    switch (ilib._getPlatform()) {
        case "rhino":
            var top = (function() {
              return (typeof global === 'object') ? global : this;
            })();
            return typeof(top[name]) !== 'undefined';
        case "nodejs":
        case "trireme":
            var root = typeof(global) !== 'undefined' ? global : this;
            return root && typeof(root[name]) !== 'undefined';
        case "qt":
        	return false;
        default:
        	try {
        		return window && typeof(window[name]) !== 'undefined';
        	} catch (e) {
        		return false;
        	}
    }
};

/**
 * Sets the default locale for all of ilib. This locale will be used
 * when no explicit locale is passed to any ilib class. If the default
 * locale is not set, ilib will attempt to use the locale of the
 * environment it is running in, if it can find that. If not, it will
 * default to the locale "en-US". If a type of parameter is string, 
 * ilib will take only well-formed BCP-47 tag  <p>
 * 
 * 
 * @static
 * @param {string|undefined|null} spec the locale specifier for the default locale
 */
ilib.setLocale = function (spec) {
    if (typeof(spec) === 'string' || !spec) {
        ilib.locale = spec;
    }
    // else ignore other data types, as we don't have the dependencies
    // to look into them to find a locale
};

/**
 * Return the default locale for all of ilib if one has been set. This 
 * locale will be used when no explicit locale is passed to any ilib 
 * class. If the default
 * locale is not set, ilib will attempt to use the locale of the
 * environment it is running in, if it can find that. If not, it will
 * default to the locale "en-US".<p>
 * 
 * 
 * @static
 * @return {string} the locale specifier for the default locale
 */
ilib.getLocale = function () {
    if (typeof(ilib.locale) !== 'string') {
    	var plat = ilib._getPlatform();
    	switch (plat) {
    		case 'browser':
            	// running in a browser
                if(typeof(navigator.language) !== 'undefined'){
                    ilib.locale = navigator.language.substring(0,3) + navigator.language.substring(3,5).toUpperCase();  // FF/Opera/Chrome/Webkit
                }
                if (!ilib.locale) {
                    // IE on Windows
                    var lang = typeof(navigator.browserLanguage) !== 'undefined' ? 
                        navigator.browserLanguage :
                        (typeof(navigator.userLanguage) !== 'undefined' ? 
                            navigator.userLanguage :
                            (typeof(navigator.systemLanguage) !== 'undefined' ?
                                navigator.systemLanguage :
                                undefined));
                    if (typeof(lang) !== 'undefined' && lang) {
                        // for some reason, MS uses lower case region tags
                        ilib.locale = lang.substring(0,3) + lang.substring(3,5).toUpperCase();
                    }
                }
                break;
    		case 'webos':
                // webOS
                if (typeof(PalmSystem.locales) !== 'undefined' && 
                		typeof(PalmSystem.locales.UI) != 'undefined' && 
                		PalmSystem.locales.UI.length > 0) {
                    ilib.locale = PalmSystem.locales.UI;
                } else if (typeof(PalmSystem.locale) !== 'undefined') {
                	ilib.locale = PalmSystem.locale;
                }
    			break;
    		case 'rhino':
                if (typeof(environment) !== 'undefined' && environment.user && typeof(environment.user.language) === 'string' && environment.user.language.length > 0) {
                	// running under plain rhino
                    ilib.locale = environment.user.language;
                    if (typeof(environment.user.country) === 'string' && environment.user.country.length > 0) {
                        ilib.locale += '-' + environment.user.country;
                    }
                }
                break;
    		case "trireme":
            	// under trireme on rhino emulating nodejs
            	var lang = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL;
                // the LANG variable on unix is in the form "lang_REGION.CHARSET"
                // where language and region are the correct ISO codes separated by
                // an underscore. This translate it back to the BCP-47 form.
                if (lang && typeof(lang) !== 'undefined') {
                    ilib.locale = lang.substring(0,2).toLowerCase() + '-' + lang.substring(3,5).toUpperCase();
                }
            	break;
    		case 'nodejs':
                // running under nodejs
                var lang = process.env.LANG || process.env.LC_ALL;
                // the LANG variable on unix is in the form "lang_REGION.CHARSET"
                // where language and region are the correct ISO codes separated by
                // an underscore. This translate it back to the BCP-47 form.
                if (lang && typeof(lang) !== 'undefined') {
                    ilib.locale = lang.substring(0,2).toLowerCase() + '-' + lang.substring(3,5).toUpperCase();
                }
    			break;
    		case 'qt':
            	// running in the Javascript engine under Qt/QML
            	var locobj = Qt.locale();
            	var lang = locobj.name && locobj.name.replace("_", "-") || "en-US";
    			break;
    	}
        ilib.locale = typeof(ilib.locale) === 'string' ? ilib.locale : 'en-US';
    }
    return ilib.locale;
};

/**
 * Sets the default time zone for all of ilib. This time zone will be used when
 * no explicit time zone is passed to any ilib class. If the default time zone
 * is not set, ilib will attempt to use the time zone of the
 * environment it is running in, if it can find that. If not, it will
 * default to the the UTC zone "Etc/UTC".<p>
 * 
 * 
 * @static
 * @param {string} tz the name of the time zone to set as the default time zone
 */
ilib.setTimeZone = function (tz) {
    ilib.tz = tz || ilib.tz;
};

/**
 * Return the default time zone for all of ilib if one has been set. This 
 * time zone will be used when no explicit time zone is passed to any ilib 
 * class. If the default time zone
 * is not set, ilib will attempt to use the locale of the
 * environment it is running in, if it can find that. If not, it will
 * default to the the zone "local".<p>
 * 
 * 
 * @static
 * @return {string} the default time zone for ilib
 */
ilib.getTimeZone = function() {
    if (typeof(ilib.tz) === 'undefined') {
        if (typeof(navigator) !== 'undefined' && typeof(navigator.timezone) !== 'undefined') {
            // running in a browser
            if (navigator.timezone.length > 0) {
                ilib.tz = navigator.timezone;
            }
        } else if (typeof(PalmSystem) !== 'undefined' && typeof(PalmSystem.timezone) !== 'undefined') {
            // running in webkit on webOS
            if (PalmSystem.timezone.length > 0) {
                ilib.tz = PalmSystem.timezone;
            }
        } else if (typeof(environment) !== 'undefined' && typeof(environment.user) !== 'undefined') {
            // running under rhino
            if (typeof(environment.user.timezone) !== 'undefined' && environment.user.timezone.length > 0) {
                ilib.tz = environment.user.timezone;
            }
        } else if (typeof(process) !== 'undefined' && typeof(process.env) !== 'undefined') {
            // running in nodejs
            if (process.env.TZ && typeof(process.env.TZ) !== "undefined") {
                ilib.tz = process.env.TZ;
            }
        }
        
        ilib.tz = ilib.tz || "local"; 
    }

    return ilib.tz;
};

/**
 * @class
 * Defines the interface for the loader class for ilib. The main method of the
 * loader object is loadFiles(), which loads a set of requested locale data files
 * from where-ever it is stored.
 * @interface
 */
ilib.Loader = function() {};

/**
 * Load a set of files from where-ever it is stored.<p>
 * 
 * This is the main function define a callback function for loading missing locale 
 * data or resources.
 * If this copy of ilib is assembled without including the required locale data
 * or resources, then that data can be lazy loaded dynamically when it is 
 * needed by calling this method. Each ilib class will first
 * check for the existence of data under ilib.data, and if it is not there, 
 * it will attempt to load it by calling this method of the laoder, and then place
 * it there.<p>
 * 
 * Suggested implementations of this method might load files 
 * directly from disk under nodejs or rhino, or within web pages, to load 
 * files from the server with XHR calls.<p>
 * 
 * The first parameter to this method, paths, is an array of relative paths within 
 * the ilib dir structure for the 
 * requested data. These paths will already have the locale spec integrated 
 * into them, so no further tweaking needs to happen to load the data. Simply
 * load the named files. The second
 * parameter tells the loader whether to load the files synchronously or asynchronously.
 * If the sync parameters is false, then the onLoad function must also be specified.
 * The third parameter gives extra parameters to the loader passed from the calling
 * code. This may contain any property/value pairs.  The last parameter, callback,
 * is a callback function to call when all of the data is finishing loading. Make
 * sure to call the callback with the context of "this" so that the caller has their 
 * context back again.<p>
 * 
 * The loader function must be able to operate either synchronously or asychronously. 
 * If the loader function is called with an undefined callback function, it is
 * expected to load the data synchronously, convert it to javascript
 * objects, and return the array of json objects as the return value of the 
 * function. If the loader 
 * function is called with a callback function, it may load the data 
 * synchronously or asynchronously (doesn't matter which) as long as it calls
 * the callback function with the data converted to a javascript objects
 * when it becomes available. If a particular file could not be loaded, the 
 * loader function should put undefined into the corresponding entry in the
 * results array. 
 * Note that it is important that all the data is loaded before the callback
 * is called.<p>
 * 
 * An example implementation for nodejs might be:
 * 
 * <pre>
 * var fs = require("fs");
 * 
 * var myLoader = function() {};
 * myLoader.prototype = new Loader();
 * myLoader.prototype.constructor = myLoader;
 * myLoader.prototype.loadFiles = function(paths, sync, params, callback) {
 *    if (sync) {
 *        var ret = [];
 *        // synchronous load -- just return the result
 *        paths.forEach(function (path) {
 *            var json = fs.readFileSync(path, "utf-8");
 *            ret.push(json ? JSON.parse(json) : undefined);
 *        });
 *        
 *        return ret;
 *    }
 *    this.callback = callback;
 *
 *    // asynchronous
 *    this.results = [];
 *    this._loadFilesAsync(paths);
 * }
 * myLoader.prototype._loadFilesAsync = function (paths) {
 *    if (paths.length > 0) {
 *        var file = paths.shift();
 *        fs.readFile(file, "utf-8", function(err, json) {
 *            this.results.push(err ? undefined : JSON.parse(json));
 *            // call self recursively so that the callback is only called at the end
 *            // when all the files are loaded sequentially
 *            if (paths.length > 0) {
 *                this._loadFilesAsync(paths);
 *            } else {
 *                this.callback(this.results);
 *            }
 *        });
 *     }
 * }
 * 
 * // bind to "this" so that "this" is relative to your own instance
 * ilib.setLoaderCallback(new myLoader());
 * </pre>

 * @param {Array.<string>} paths An array of paths to load from wherever the files are stored 
 * @param {Boolean} sync if true, load the files synchronously, and false means asynchronously
 * @param {Object} params an object with any extra parameters for the loader. These can be 
 * anything. The caller of the ilib class passes these parameters in. Presumably, the code that
 * calls ilib and the code that provides the loader are together and can have a private 
 * agreement between them about what the parameters should contain.
 * @param {function(Object)} callback function to call when the files are all loaded. The 
 * parameter of the callback function is the contents of the files.
 */
ilib.Loader.prototype.loadFiles = function (paths, sync, params, callback) {};

/**
 * Return all files available for loading using this loader instance.
 * This method returns an object where the properties are the paths to
 * directories where files are loaded from and the values are an array
 * of strings containing the relative paths under the directory of each
 * file that can be loaded.<p>
 * 
 * Example:
 *  <pre>
 *  {
 *      "/usr/share/javascript/ilib/locale": [
 *          "dateformats.json",
 *          "aa/dateformats.json",
 *          "af/dateformats.json",
 *          "agq/dateformats.json",
 *          "ak/dateformats.json",
 *          ...
 *          "zxx/dateformats.json"
 *      ]
 *  }
 *  </pre>
 * @returns {Object} a hash containing directory names and
 * paths to file that can be loaded by this loader 
 */
ilib.Loader.prototype.listAvailableFiles = function() {};

/**
 * Return true if the file in the named path is available for loading using
 * this loader. The path may be given as an absolute path, in which case
 * only that file is checked, or as a relative path, in which case, the
 * relative path may appear underneath any of the directories that the loader
 * knows about.
 * @returns {boolean} true if the file in the named path is available for loading, and
 * false otherwise
 */
ilib.Loader.prototype.isAvailable = function(path) {};

/**
 * Set the custom loader used to load ilib's locale data in your environment. 
 * The instance passed in must implement the Loader interface. See the
 * Loader class documentation for more information about loaders. 
 * 
 * @static
 * @param {ilib.Loader} loader class to call to access the requested data.
 * @return {boolean} true if the loader was installed correctly, or false
 * if not
 */
ilib.setLoaderCallback = function(loader) {
    // only a basic check
    if ((typeof(loader) === 'object' && typeof(loader.loadFiles) === 'function') || 
            typeof(loader) === 'function' || typeof(loader) === 'undefined') {
        //console.log("setting callback loader to " + (loader ? loader.name : "undefined"));
        ilib._load = loader;
        return true;
    }
    return false;
};

/**
 * Return the custom Loader instance currently in use with this instance 
 * of ilib. If there is no loader, this method returns undefined.
 * 
 * @protected
 * @static
 * @return {ilib.Loader|undefined} the loader instance currently in use, or 
 * undefined if there is no such loader
 */
ilib.getLoader = function() {
	return ilib._load;
};

/**
 * Test whether an object in an javascript array. 
 * 
 * @static
 * @param {*} object The object to test
 * @return {boolean} return true if the object is an array
 * and false otherwise
 */
ilib.isArray = function(object) {
	var o;
	if (typeof(object) === 'object') {
		o = /** @type {Object|null|undefined} */ object;
		return Object.prototype.toString.call(o) === '[object Array]';
	}
	return false; 
};

/**
 * Extend object1 by mixing in everything from object2 into it. The objects
 * are deeply extended, meaning that this method recursively descends the
 * tree in the objects and mixes them in at each level. Arrays are extended
 * by concatenating the elements of object2 onto those of object1.  
 * 
 * @static
 * @param {Object} object1 the target object to extend
 * @param {Object=} object2 the object to mix in to object1
 * @return {Object} returns object1
 */
ilib.extend = function (object1, object2) {
	var prop = undefined;
	if (object2) {
		for (prop in object2) {
			if (prop && typeof(object2[prop]) !== 'undefined') {
				if (ilib.isArray(object1[prop]) && ilib.isArray(object2[prop])) {
					//console.log("Merging array prop " + prop);
					object1[prop] = object1[prop].concat(object2[prop]);
				} else if (typeof(object1[prop]) === 'object' && typeof(object2[prop]) === 'object') {
					//console.log("Merging object prop " + prop);
					if (prop !== "ilib") {
						object1[prop] = ilib.extend(object1[prop], object2[prop]);
					}
				} else {
					//console.log("Copying prop " + prop);
					// for debugging. Used to determine whether or not json files are overriding their parents unnecessarily
					object1[prop] = object2[prop];
				}
			}
		}
	}
	return object1;
};

/**
 * If Function.prototype.bind does not exist in this JS engine, this
 * function reimplements it in terms of older JS functions.
 * bind() doesn't exist in many older browsers.
 * 
 * @static
 * @param {Object} scope object that the method should operate on
 * @param {function(...)} method method to call
 * @return {function(...)|undefined} function that calls the given method 
 * in the given scope with all of its arguments properly attached, or
 * undefined if there was a problem with the arguments
 */
ilib.bind = function(scope, method/*, bound arguments*/){
	if (!scope || !method) {
		return undefined;
	}
	
	/** @protected 
	 * @param {Arguments} inArrayLike
	 * @param {number=} inOffset
	 */
	function cloneArray(inArrayLike, inOffset) {
		var arr = [];
		for(var i = inOffset || 0, l = inArrayLike.length; i<l; i++){
			arr.push(inArrayLike[i]);
		}
		return arr;
	}

	if (typeof(method) === 'function') {
		var func, args = cloneArray(arguments, 2);
		if (typeof(method.bind) === 'function') {
			func = method.bind.apply(method, [scope].concat(args));
		} else {
			func = function() {
				var nargs = cloneArray(arguments);
				// invoke with collected args
				return method.apply(scope, args.concat(nargs));
			};
		}
		return func;
	}
	return undefined;
};

/**
 * @private
 */
ilib._dyncode = false;

/**
 * Return true if this copy of ilib is using dynamically loaded code. It returns
 * false for pre-assembled code.
 * 
 * @static
 * @return {boolean} true if this ilib uses dynamically loaded code, and false otherwise
 */
ilib.isDynCode = function() {
	return ilib._dyncode;
};

/**
 * @private
 */
ilib._dyndata = false;

/**
 * Return true if this copy of ilib is using dynamically loaded locale data. It returns
 * false for pre-assembled data.
 * 
 * @static
 * @return {boolean} true if this ilib uses dynamically loaded locale data, and false otherwise
 */
ilib.isDynData = function() {
	return ilib._dyndata;
};

ilib._loadtime = new Date().getTime();

}],'enyo-ilib/MathUtils':[function (module,exports,global,require,request){
/*
 * MathUtils.js - Misc math utility routines
 * 
 * Copyright © 2013-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var MathUtils = {};

/**
 * Return the sign of the given number. If the sign is negative, this function
 * returns -1. If the sign is positive or zero, this function returns 1.
 * @static
 * @param {number} num the number to test
 * @return {number} -1 if the number is negative, and 1 otherwise
 */
MathUtils.signum = function (num) {
	var n = num;
	if (typeof(num) === 'string') {
		n = parseInt(num, 10);
	} else if (typeof(num) !== 'number') {
		return 1;
	}
	return (n < 0) ? -1 : 1;
};

/**
 * @static
 * @protected
 * @param {number} num number to round
 * @return {number} rounded number
 */
MathUtils.floor = function (num) {
	return Math.floor(num);
};

/**
 * @static
 * @protected
 * @param {number} num number to round
 * @return {number} rounded number
 */
MathUtils.ceiling = function (num) {
	return Math.ceil(num);
};

/**
 * @static
 * @protected
 * @param {number} num number to round
 * @return {number} rounded number
 */
MathUtils.down = function (num) {
	return (num < 0) ? Math.ceil(num) : Math.floor(num);
};

/**
 * @static
 * @protected
 * @param {number} num number to round
 * @return {number} rounded number
 */
MathUtils.up = function (num) {
	return (num < 0) ? Math.floor(num) : Math.ceil(num);
};

/**
 * @static
 * @protected
 * @param {number} num number to round
 * @return {number} rounded number
 */
MathUtils.halfup = function (num) {
	return (num < 0) ? Math.ceil(num - 0.5) : Math.floor(num + 0.5);
};

/**
 * @static
 * @protected
 * @param {number} num number to round
 * @return {number} rounded number
 */
MathUtils.halfdown = function (num) {
	return (num < 0) ? Math.floor(num + 0.5) : Math.ceil(num - 0.5);
};

/**
 * @static
 * @protected
 * @param {number} num number to round
 * @return {number} rounded number
 */
MathUtils.halfeven = function (num) {
	return (Math.floor(num) % 2 === 0) ? Math.ceil(num - 0.5) : Math.floor(num + 0.5);
};

/**
 * @static
 * @protected
 * @param {number} num number to round
 * @return {number} rounded number
 */
MathUtils.halfodd = function (num) {
	return (Math.floor(num) % 2 !== 0) ? Math.ceil(num - 0.5) : Math.floor(num + 0.5);
};

/**
 * Do a proper modulo function. The Javascript % operator will give the truncated
 * division algorithm, but for calendrical calculations, we need the Euclidean
 * division algorithm where the remainder of any division, whether the dividend
 * is negative or not, is always a positive number in the range [0, modulus).<p>
 * 
 * 
 * @static
 * @param {number} dividend the number being divided
 * @param {number} modulus the number dividing the dividend. This should always be a positive number.
 * @return the remainder of dividing the dividend by the modulus.  
 */
MathUtils.mod = function (dividend, modulus) {
	if (modulus == 0) {
		return 0;
	}
	var x = dividend % modulus;
	return (x < 0) ? x + modulus : x;
};

/**
 * Do a proper adjusted modulo function. The Javascript % operator will give the truncated
 * division algorithm, but for calendrical calculations, we need the Euclidean
 * division algorithm where the remainder of any division, whether the dividend
 * is negative or not, is always a positive number in the range (0, modulus]. The adjusted
 * modulo function differs from the regular modulo function in that when the remainder is
 * zero, the modulus should be returned instead.<p>
 * 
 * 
 * @static
 * @param {number} dividend the number being divided
 * @param {number} modulus the number dividing the dividend. This should always be a positive number.
 * @return the remainder of dividing the dividend by the modulus.  
 */
MathUtils.amod = function (dividend, modulus) {
	if (modulus == 0) {
		return 0;
	}
	var x = dividend % modulus;
	return (x <= 0) ? x + modulus : x;
};

module.exports = MathUtils;

}],'enyo-ilib/Path':[function (module,exports,global,require,request){
/*
 * Path.js - minimal pure js implementation of the nodejs path module
 * 
 * Copyright © 2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Path = {
	/**
	 * Return the parent directory of the given pathname
	 * similar to the dirname shell function.  
	 * @static
	 * @param {string} pathname path to check
	 * @return {string} the parent dir of the given pathname
	 */
	dirname: function(pathname) {
		pathname = pathname.replace(/\\/g, "/");
		var i = pathname.lastIndexOf("/");
		return i !== -1 ? pathname.substring(0,i) : pathname;
	},
	
	/**
	 * Return the normalized version of the given pathname. This
	 * cleans up things like double directory separators and such.
	 * @static
	 * @param {string} pathname path to check
	 * @return {string} the normalized version of the given pathname
	 */
	normalize: function(pathname) {
		if (pathname) {
			pathname = pathname.replace(/\\/g, "/");
			pathname = pathname.replace(/\/\//g, "/");
			pathname = pathname.replace(/\/[^/]*[^\./]\/\.\./g, "/.");
			pathname = pathname.replace(/\/\//g, "/");
			pathname = pathname.replace(/\/\.\//g, "/");
			pathname = pathname.replace(/^\.\//, "");
			pathname = pathname.replace(/\/\//g, "/");
			pathname = pathname.replace(/\/\.$/, "/");
			pathname = pathname.replace(/\/\//g, "/");
			if (pathname.length > 1) pathname = pathname.replace(/\/$/, "");
			if (pathname.length === 0) pathname = '.';
		}
		return pathname;
	},
	
	/**
	 * Return a path that is the concatenation of all the of the arguments
	 * which each name a path segment.
	 * @static
	 * @param {...string} var_args
	 * @return {string} the concatenated pathname
	 */
	join: function(var_args) {
		var arr = [];
		for (var i = 0; i < arguments.length; i++) {
			arr.push(arguments[i] && arguments[i].length > 0 ? arguments[i] : ".");
		}
		return Path.normalize(arr.join("/"));
	}
};

module.exports = Path;

}],'../src/packedbuffer':[function (module,exports,global,require,request){
/*
 * packedbuffer.js - represent a packed buffer of bytes
 * 
 * Copyright © 2014 LG Electronics, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * @constructor
 * Represents a binary buffer of unsigned bytes that will be parsed in various ways. The buffer 
 * can be decoded by reading various lengths of bytes and interpretting them as longs
 * or unsigned bytes, etc. The bytes are interpretted in big-endian (network) format.
 * @param {string} buffer the binary buffer represented as a string
 */
var PackedBuffer = function (buffer) {
	this.buffer = buffer;
	this.index = 0;
};

/**
 * Return the specified number of signed long integers from the current location in
 * the buffer as an array of numbers and advance the current pointer in the buffer.
 * This method will only return as many longs as are available in the rest of the
 * buffer.
 * 
 * @param {number} num The number of longs to return
 * @returns {Array.<number>} the array of signed long integers
 */
PackedBuffer.prototype.getLongs = function(num) {
	var result = undefined;
	if (this.buffer && this.index < this.buffer.length) {
		result = [];
		for (var i = 0; i < num && this.index+3 < this.buffer.length; i++) {
			var longnum = this.buffer[this.index] << 24 | 
				this.buffer[this.index+1] << 16 | 
				this.buffer[this.index+2] << 8 | 
				this.buffer[this.index+3];
			result.push(longnum);
			this.index += 4;
		}
	}
	return result;
};

/**
 * Return a signed long integer from the current location in
 * the buffer as an array of numbers and advance the current pointer in the buffer.
 * This method will only return a long if it is available in the buffer, otherwise
 * it will return undefined.
 * 
 * @returns {number} the long at the current point in the buffer, or undefined if
 * there is not enough bytes left in the buffer to form a long
 */
PackedBuffer.prototype.getLong = function() {
	var longs = this.getLongs(1);
	if (longs && longs.length > 0) {
		return longs[0];
	}
	return undefined;
};

/**
 * Return the specified number of signed byte integers from the current location in
 * the buffer as an array of numbers and advance the current pointer in the buffer.
 * This method will only return as many bytes as are available in the rest of the
 * buffer.
 * 
 * @param {number|undefined} num The number of bytes to return
 * @returns {Array.<number>} the array of signed byte integers
 */
PackedBuffer.prototype.getBytes = function(num) {
	var result = undefined;
	if (this.buffer && this.index < this.buffer.length) {
		result = [];
		for (var i = 0; i < num && this.index < this.buffer.length; i++) {
			var bytenum = this.buffer[this.index++];
			if (bytenum & 0x80) {
				bytenum -= 0x100;
			}
			result.push(bytenum);
		}
	}
	return result;
};

/**
 * Return a signed byte integer from the current location in
 * the buffer as an array of numbers and advance the current pointer in the buffer.
 * This method will only return a byte if it is available in the buffer, otherwise
 * it will return undefined.
 * 
 * @returns {number} the byte at the current point in the buffer, or undefined if
 * there is not enough bytes left in the buffer to form a byte
 */
PackedBuffer.prototype.getByte = function() {
	var bytes = this.getBytes(1);
	if (bytes && bytes.length > 0) {
		return bytes[0];
	}
	return undefined;
};

/**
 * Return the specified number of unsigned byte integers from the current location in
 * the buffer as an array of numbers and advance the current pointer in the buffer.
 * This method will only return as many bytes as are available in the rest of the
 * buffer.
 * 
 * @param {number} num The number of bytes to return
 * @returns {Array.<number>} the array of unsigned byte integers
 */
PackedBuffer.prototype.getUnsignedBytes = function(num) {
	var result = undefined;
	if (this.buffer && this.index < this.buffer.length) {
		result = [];
		for (var i = 0; i < num && this.index < this.buffer.length; i++) {
			result.push(this.buffer[this.index++]);
		}
	}
	return result;
	
};

/**
 * Return a string made out of the given number of bytes and convert
 * from UTF-8 to UTF-16.
 * 
 * @param {number} num The number of bytes to make a string out of
 * @returns {string} a string made out of the given bytes
 */
PackedBuffer.prototype.getString = function(num) {
	var arr = this.getUnsignedBytes(num);
	var str = "";
	for (var i = 0; i < arr.length; i++) {
		str += String.fromCharCode(arr[i]);
	}
	return str;
	
};

/**
 * Advance the current pointer in the buffer by the specified number of
 * bytes in the string.
 * 
 * @param {number} num The number of bytes to skip
 */
PackedBuffer.prototype.skip = function(num) {
	this.index += num;
};

module.exports = PackedBuffer;
}],'enyo-ilib/SearchUtils':[function (module,exports,global,require,request){
/*
 * SearchUtils.js - Misc search utility routines
 * 
 * Copyright © 2013-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var SearchUtils = {};

/**
 * Binary search a sorted array for a particular target value.
 * If the exact value is not found, it returns the index of the smallest 
 * entry that is greater than the given target value.<p> 
 * 
 * The comparator
 * parameter is a function that knows how to compare elements of the 
 * array and the target. The function should return a value greater than 0
 * if the array element is greater than the target, a value less than 0 if
 * the array element is less than the target, and 0 if the array element 
 * and the target are equivalent.<p>
 * 
 * If the comparator function is not specified, this function assumes
 * the array and the target are numeric values and should be compared 
 * as such.<p>
 * 
 * 
 * @static
 * @param {*} target element being sought 
 * @param {Array} arr the array being searched
 * @param {?function(*,*)=} comparator a comparator that is appropriate for comparing two entries
 * in the array  
 * @return the index of the array into which the value would fit if 
 * inserted, or -1 if given array is not an array or the target is not 
 * a number
 */
SearchUtils.bsearch = function(target, arr, comparator) {
	if (typeof(arr) === 'undefined' || !arr || typeof(target) === 'undefined') {
		return -1;
	}
	
	var high = arr.length - 1,
		low = 0,
		mid = 0,
		value,
		cmp = comparator || SearchUtils.bsearch.numbers;
	
	while (low <= high) {
		mid = Math.floor((high+low)/2);
		value = cmp(arr[mid], target);
		if (value > 0) {
			high = mid - 1;
		} else if (value < 0) {
			low = mid + 1;
		} else {
			return mid;
		}
	}
	
	return low;
};

/**
 * Returns whether or not the given element is greater than, less than,
 * or equal to the given target.<p>
 * 
 * @private
 * @static
 * @param {number} element the element being tested
 * @param {number} target the target being sought
 */
SearchUtils.bsearch.numbers = function(element, target) {
	return element - target;
};

/**
 * Do a bisection search of a function for a particular target value.<p> 
 * 
 * The function to search is a function that takes a numeric parameter, 
 * does calculations, and returns gives a numeric result. The 
 * function should should be smooth and not have any discontinuities 
 * between the low and high values of the parameter.
 *  
 * 
 * @static
 * @param {number} target value being sought
 * @param {number} low the lower bounds to start searching
 * @param {number} high the upper bounds to start searching
 * @param {number} precision minimum precision to support. Use 0 if you want to use the default.
 * @param {?function(number)=} func function to search 
 * @return an approximation of the input value to the function that gives the desired
 * target output value, correct to within the error range of Javascript floating point 
 * arithmetic, or NaN if there was some error
 */
SearchUtils.bisectionSearch = function(target, low, high, precision, func) {
	if (typeof(target) !== 'number' || 
			typeof(low) !== 'number' || 
			typeof(high) !== 'number' || 
			typeof(func) !== 'function') {
		return NaN;
	}
	
	var mid = 0,
		value,
		pre = precision > 0 ? precision : 1e-13;
	
	do {
		mid = (high+low)/2;
		value = func(mid);
		if (value > target) {
			high = mid;
		} else if (value < target) {
			low = mid;
		}
	} while (high - low > pre);
	
	return mid;
};

module.exports = SearchUtils;

}],'enyo-ilib/JulianDay':[function (module,exports,global,require,request){
/*
 * JulianDay.js - A Julian Day object.
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @class
 * A Julian Day class. A Julian Day is a date based on the Julian Day count
 * of time invented by Joseph Scaliger in 1583 for use with astronomical calculations. 
 * Do not confuse it with a date in the Julian calendar, which it has very
 * little in common with. The naming is unfortunately close, and comes from history.<p>
 * 
 * 
 * @constructor
 * @param {number} num the Julian Day expressed as a floating point number 
 */
var JulianDay = function(num) {
	this.jd = num;
	this.days = Math.floor(this.jd);
	this.frac = num - this.days;
};

JulianDay.prototype = {
	/**
	 * Return the integral portion of this Julian Day instance. This corresponds to
	 * the number of days since the beginning of the epoch.
	 * 
	 * @return {number} the integral portion of this Julian Day
	 */
	getDays: function() {
		return this.days;
	},
	
	/**
	 * Set the date of this Julian Day instance.
	 * 
	 * @param {number} days the julian date expressed as a floating point number
	 */
	setDays: function(days) {
		this.days = Math.floor(days);
		this.jd = this.days + this.frac;
	},
	
	/**
	 * Return the fractional portion of this Julian Day instance. This portion 
	 * corresponds to the time of day for the instance.
	 */
	getDayFraction: function() {
		return this.frac;
	},
	
	/**
	 * Set the fractional part of the Julian Day. The fractional part represents
	 * the portion of a fully day. Julian dates start at noon, and proceed until
	 * noon of the next day. That would mean midnight is represented as a fractional
	 * part of 0.5.
	 * 
	 * @param {number} fraction The fractional part of the Julian date
	 */
	setDayFraction: function(fraction) {
		var t = Math.floor(fraction);
		this.frac = fraction - t;
		this.jd = this.days + this.frac;
	},
	
	/** 
	 * Return the Julian Day expressed as a floating point number.
	 * @return {number} the Julian Day as a number
	 */
	getDate: function () {
		return this.jd;
	},
	
	/**
	 * Set the date of this Julian Day instance.
	 * 
	 * @param {number} num the numeric Julian Day to set into this instance
	 */
	setDate: function (num) {
		this.jd = num;
	},
	
	/**
	 * Add an offset to the current date instance. The offset should be expressed in
	 * terms of Julian days. That is, each integral unit represents one day of time, and
	 * fractional part represents a fraction of a regular 24-hour day.
	 * 
	 * @param {number} offset an amount to add (or subtract) to the current result instance.
	 */
	addDate: function(offset) {
		if (typeof(offset) === 'number') {
			this.jd += offset;
			this.days = Math.floor(this.jd);
			this.frac = this.jd - this.days;
		}
	}
};

module.exports = JulianDay;

}],'enyo-ilib/Calendar':[function (module,exports,global,require,request){
/*
 * Calendar.js - Represent a calendar object.
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @class
 * Superclass for all calendar subclasses that contains shared 
 * functionality. This class is never instantiated on its own. Instead,
 * you should use the {@link CalendarFactory} function to manufacture a new
 * instance of a subclass of Calendar. 
 * 
 * @private
 * @constructor
 */
var Calendar = function() {
};

/* place for the subclasses to put their constructors so that the factory method
 * can find them. Do this to add your calendar after it's defined: 
 * Calendar._constructors["mytype"] = Calendar.MyTypeConstructor;
 */
Calendar._constructors = {};

Calendar.prototype = {
	/**
	 * Return the type of this calendar.
	 * 
	 * @return {string} the name of the type of this calendar 
	 */
	getType: function() {
		throw "Cannot call methods of abstract class Calendar";
	},
	
	/**
	 * Return the number of months in the given year. The number of months in a year varies
	 * for some luni-solar calendars because in some years, an extra month is needed to extend the 
	 * days in a year to an entire solar year. The month is represented as a 1-based number
	 * where 1=first month, 2=second month, etc.
	 * 
	 * @param {number} year a year for which the number of months is sought
	 * @return {number} The number of months in the given year
	 */
	getNumMonths: function(year) {
		throw "Cannot call methods of abstract class Calendar";
	},
	
	/**
	 * Return the number of days in a particular month in a particular year. This function
	 * can return a different number for a month depending on the year because of things
	 * like leap years.
	 * 
	 * @param {number} month the month for which the length is sought
	 * @param {number} year the year within which that month can be found
	 * @return {number} the number of days within the given month in the given year
	 */
	getMonLength: function(month, year) {
		throw "Cannot call methods of abstract class Calendar";
	},
	
	/**
	 * Return true if the given year is a leap year in this calendar.
	 * The year parameter may be given as a number.
	 * 
	 * @param {number} year the year for which the leap year information is being sought
	 * @return {boolean} true if the given year is a leap year
	 */
	isLeapYear: function(year) {
		throw "Cannot call methods of abstract class Calendar";
	}
};

module.exports = Calendar;
}],'enyo-ilib/JSUtils':[function (module,exports,global,require,request){
/*
 * JSUtils.js - Misc utilities to work around Javascript engine differences
 * 
 * Copyright © 2013-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// !depends ilib.js

var ilib = require("./ilib.js");

var JSUtils = {};

/**
 * Perform a shallow copy of the source object to the target object. This only 
 * copies the assignments of the source properties to the target properties, 
 * but not recursively from there.<p>
 * 
 * 
 * @static
 * @param {Object} source the source object to copy properties from
 * @param {Object} target the target object to copy properties into
 */
JSUtils.shallowCopy = function (source, target) {
	var prop = undefined;
	if (source && target) {
		for (prop in source) {
			if (prop !== undefined && typeof(source[prop]) !== 'undefined') {
				target[prop] = source[prop];
			}
		}
	}
};

/**
 * Perform a recursive deep copy from the "from" object to the "deep" object.
 * 
 * @static
 * @param {Object} from the object to copy from
 * @param {Object} to the object to copy to
 * @return {Object} a reference to the the "to" object
 */
JSUtils.deepCopy = function(from, to) {
	var prop;

	for (prop in from) {
		if (prop) {
			if (typeof(from[prop]) === 'object') {
				to[prop] = {};
				JSUtils.deepCopy(from[prop], to[prop]);
			} else {
				to[prop] = from[prop];
			}
		}
	}
	return to;
};

/**
 * Map a string to the given set of alternate characters. If the target set
 * does not contain a particular character in the input string, then that
 * character will be copied to the output unmapped.
 * 
 * @static
 * @param {string} str a string to map to an alternate set of characters
 * @param {Array.<string>|Object} map a mapping to alternate characters
 * @return {string} the source string where each character is mapped to alternate characters
 */
JSUtils.mapString = function (str, map) {
	var mapped = "";
	if (map && str) {
		for (var i = 0; i < str.length; i++) {
			var c = str.charAt(i); // TODO use a char iterator?
			mapped += map[c] || c; 
		}
	} else {
		mapped = str;
	}
	return mapped;
};

/**
 * Check if an object is a member of the given array. If this javascript engine
 * support indexOf, it is used directly. Otherwise, this function implements it
 * itself. The idea is to make sure that you can use the quick indexOf if it is
 * available, but use a slower implementation in older engines as well.
 * 
 * @static
 * @param {Array.<Object>} array array to search
 * @param {Object} obj object being sought. This should be of the same type as the
 * members of the array being searched. If not, this function will not return
 * any results.
 * @return {number} index of the object in the array, or -1 if it is not in the array.
 */
JSUtils.indexOf = function(array, obj) {
	if (!array || !obj) {
		return -1;
	}
	if (typeof(array.indexOf) === 'function') {
		return array.indexOf(obj);
	} else {
		for (var i = 0; i < array.length; i++) {
	        if (array[i] === obj) {
	            return i;
	        }
	    }
	    return -1;
	}
};

/**
 * Convert a string into the hexadecimal representation
 * of the Unicode characters in that string.
 * 
 * @static
 * @param {string} string The string to convert
 * @param {number=} limit the number of digits to use to represent the character (1 to 8)
 * @return {string} a hexadecimal representation of the
 * Unicode characters in the input string
 */
JSUtils.toHexString = function(string, limit) {
	var i, 
		result = "", 
		lim = (limit && limit < 9) ? limit : 4;
	
	if (!string) {
		return "";
	}
	for (i = 0; i < string.length; i++) {
		var ch = string.charCodeAt(i).toString(16);
		result += "00000000".substring(0, lim-ch.length) + ch;
	}
	return result.toUpperCase();
};

/**
 * Test whether an object in a Javascript Date. 
 * 
 * @static
 * @param {*} object The object to test
 * @return {boolean} return true if the object is a Date
 * and false otherwise
 */
JSUtils.isDate = function(object) {
	var o;
	if (typeof(object) === 'object') {
		o = /** @type {Object|null|undefined} */ object;
		return Object.prototype.toString.call(o) === '[object Date]';
	}
	return false; 
};

/**
 * Merge the properties of object2 into object1 in a deep manner and return a merged
 * object. If the property exists in both objects, the value in object2 will overwrite 
 * the value in object1. If a property exists in object1, but not in object2, its value
 * will not be touched. If a property exists in object2, but not in object1, it will be 
 * added to the merged result.<p>
 * 
 * Name1 and name2 are for creating debug output only. They are not necessary.<p>
 * 
 * 
 * @static
 * @param {*} object1 the object to merge into
 * @param {*} object2 the object to merge
 * @param {boolean=} replace if true, replace the array elements in object1 with those in object2.
 * If false, concatenate array elements in object1 with items in object2.
 * @param {string=} name1 name of the object being merged into
 * @param {string=} name2 name of the object being merged in
 * @return {Object} the merged object
 */
JSUtils.merge = function (object1, object2, replace, name1, name2) {
	var prop = undefined,
		newObj = {};
	for (prop in object1) {
		if (prop && typeof(object1[prop]) !== 'undefined') {
			newObj[prop] = object1[prop];
		}
	}
	for (prop in object2) {
		if (prop && typeof(object2[prop]) !== 'undefined') {
			if (ilib.isArray(object1[prop]) && ilib.isArray(object2[prop])) {
				if (typeof(replace) !== 'boolean' || !replace) {
					newObj[prop] = [].concat(object1[prop]);
					newObj[prop] = newObj[prop].concat(object2[prop]);
				} else {
					newObj[prop] = object2[prop];
				}
			} else if (typeof(object1[prop]) === 'object' && typeof(object2[prop]) === 'object') {
				newObj[prop] = JSUtils.merge(object1[prop], object2[prop], replace);
			} else {
				// for debugging. Used to determine whether or not json files are overriding their parents unnecessarily
				if (name1 && name2 && newObj[prop] == object2[prop]) {
					console.log("Property " + prop + " in " + name1 + " is being overridden by the same value in " + name2);
				}
				newObj[prop] = object2[prop];
			}
		}
	}
	return newObj;
};

/**
 * Return true if the given object has no properties.<p>
 * 
 * 
 * @static
 * @param {Object} obj the object to check
 * @return {boolean} true if the given object has no properties, false otherwise
 */
JSUtils.isEmpty = function (obj) {
	var prop = undefined;
	
	if (!obj) {
		return true;
	}
	
	for (prop in obj) {
		if (prop && typeof(obj[prop]) !== 'undefined') {
			return false;
		}
	}
	return true;
};

/**
 * @static
 */
JSUtils.hashCode = function(obj) {
	var hash = 0;
	
	function addHash(hash, newValue) {
		// co-prime numbers creates a nicely distributed hash
		hash *= 65543;
		hash += newValue;
		hash %= 2147483647; 
		return hash;
	}
	
	function stringHash(str) {
		var hash = 0;
		for (var i = 0; i < str.length; i++) {
			hash = addHash(hash, str.charCodeAt(i));
		}
		return hash;
	}
	
	switch (typeof(obj)) {
		case 'undefined':
			hash = 0;
			break;
		case 'string':
			hash = stringHash(obj);
			break;
		case 'function':
		case 'number':
		case 'xml':
			hash = stringHash(String(obj));
			break;
		case 'boolean':
			hash = obj ? 1 : 0;
			break;
		case 'object':
			var props = [];
			for (var p in obj) {
				if (obj.hasOwnProperty(p)) {
					props.push(p);
				}
			}
			// make sure the order of the properties doesn't matter
			props.sort();
			for (var i = 0; i < props.length; i++) {
				hash = addHash(hash, stringHash(props[i]));
				hash = addHash(hash, JSUtils.hashCode(obj[props[i]]));
			}
			break;
	}
	
	return hash;
};


module.exports = JSUtils;

},{'./ilib.js':'enyo-ilib/ilib'}],'enyo-ilib/Loader':[function (module,exports,global,require,request){
/*
 * Loader.js - shared loader implementation
 * 
 * Copyright © 2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Path = require("./Path.js");
var ilib = require("./ilib.js");

/** 
 * @class
 * Superclass of the loader classes that contains shared functionality.
 * 
 * @private
 * @constructor
 */
var Loader = function() {
	// console.log("new Loader instance");

	this.protocol = "file://";
	this.includePath = [];
};

Loader.prototype = new ilib.Loader();
Loader.prototype.parent = ilib.Loader;
Loader.prototype.constructor = Loader;

/** @abstract */
Loader.prototype._loadFile = function (pathname, sync, cb) {};

Loader.prototype._exists = function(dir, file) {
	var fullpath = Path.normalize(Path.join(dir, file));
	if (this.protocol !== "http://") {
		var text = this._loadFile(fullpath, true);
		if (text) {
			this.includePath.push(dir);
		}
	} else {
		// put the dir on the list now assuming it exists, and check for its availability 
		// later so we can avoid the 404 errors eventually
		this.includePath.push(dir);
		this._loadFile(fullpath, false, ilib.bind(this, function(text) {
			if (!text) {
				//console.log("Loader._exists: removing " + dir + " from the include path because it doesn't exist.");
				this.includePath = this.includePath.slice(-1);
			}
		}));
	}
};

Loader.prototype._loadFileAlongIncludePath = function(includePath, pathname) {
	for (var i = 0; i < includePath.length; i++) {
		var manifest = this.manifest[includePath[i]];
		if (!manifest || Loader.indexOf(manifest, pathname) > -1) {
			var filepath = Path.join(includePath[i], pathname);
			//console.log("Loader._loadFileAlongIncludePath: attempting sync load " + filepath);
			var text = this._loadFile(filepath, true);
			if (text) {
				//console.log("Loader._loadFileAlongIncludePath: succeeded");
				return text;
			} 
			//else {
				//console.log("Loader._loadFileAlongIncludePath: failed");
			//} 
		} 
		//else {
			//console.log("Loader._loadFileAlongIncludePath: " + pathname + " not in manifest for " + this.includePath[i]);
		//}
	}
	
	//console.log("Loader._loadFileAlongIncludePath: file not found anywhere along the path.");
	return undefined;
};

Loader.prototype.loadFiles = function(paths, sync, params, callback) {
	var includePath = params && params.base ? [params.base].concat(this.includePath) : this.includePath;

	//console.log("Loader loadFiles called");
	// make sure we know what we can load
	if (!paths) {
		// nothing to load
		//console.log("nothing to load");
		return;
	}
	
	if (params && params.returnOne) {
		// Only return the most locale-specific data. Do this by searching backwards
		// in the list of paths.
		var pathname;
		var tmp = [];
		while ((pathname = paths.pop()) !== undefined) {
			tmp.push(pathname);
		}
		paths = tmp;
	}
	
	//console.log("generic loader: attempting to load these files: " + JSON.stringify(paths) + "\n");
	if (sync) {
		var ret = [];
		
		// synchronous
		this._loadManifests(true);
		
		for (var i = 0; i < paths.length; i++) {
			var text = this._loadFileAlongIncludePath(includePath, Path.normalize(paths[i]));
			ret.push(text ? JSON.parse(text) : undefined);
			if (params && params.returnOne && text) {
				break;
			}
		};

		// only call the callback at the end of the chain of files
		if (typeof(callback) === 'function') {
			callback(ret);
		}

		return ret;
	}

	// asynchronous
	this._loadManifests(false, ilib.bind(this, function() {
		//console.log("Loader.loadFiles: now loading files asynchronously");
		this.results = [];
		this._loadFilesAsync(includePath, paths, callback);
	}));
};

Loader.prototype._loadFilesAsyncAlongIncludePath = function (includes, filename, cb) {
	var text = undefined;
	
	if (includes.length > 0) {
		var root = includes[0];
		includes = includes.slice(1);
		
		var manifest = this.manifest[root];
		if (!manifest || Loader.indexOf(manifest, filename) > -1) {
			var filepath = Path.join(root, filename);
			this._loadFile(filepath, false, ilib.bind(this, function(t) {
				//console.log("Loader._loadFilesAsyncAlongIncludePath: loading " + (t ? " success" : " failed"));
				if (t) {
					cb(t);
				} else {
					this._loadFilesAsyncAlongIncludePath(includes, filename, cb);
				}
			}));
		} else {
			//console.log("Loader._loadFilesAsyncAlongIncludePath: " + filepath + " not in manifest for " + root);
			this._loadFilesAsyncAlongIncludePath(includes, filename, cb);
		}
	} else {
		cb();
	}
};

Loader.prototype._loadFilesAsync = function (includePath, paths, callback) {
	if (paths.length > 0) {
		var filename = paths[0];
		paths = paths.slice(1);
		
		//console.log("Loader._loadFilesAsync: attempting to load " + filename + " along the include path.");
		this._loadFilesAsyncAlongIncludePath(includePath, filename, ilib.bind(this, function (json) {
			this.results.push(json ? JSON.parse(json) : undefined);
			this._loadFilesAsync(includePath, paths, callback);
		}));
	} else {
		// only call the callback at the end of the chain of files
		if (typeof(callback) === 'function') {
			callback(this.results);
		}
	}
};

Loader.prototype._loadManifestFile = function(i, sync, cb) {
	//console.log("Loader._loadManifestFile: Checking include path " + i + " " + this.includePath[i]);
	if (i < this.includePath.length) {
		var filepath = Path.join(this.includePath[i], "ilibmanifest.json");
		//console.log("Loader._loadManifestFile: Loading manifest file " + filepath);
		var text = this._loadFile(filepath, sync, ilib.bind(this, function(text) {
			if (text) {
				//console.log("Loader._loadManifestFile: success!");
				this.manifest[this.includePath[i]] = JSON.parse(text).files;
			}
			//else console.log("Loader._loadManifestFile: failed...");
			this._loadManifestFile(i+1, sync, cb);
		}));
	} else {
		if (typeof(cb) === 'function') {
			//console.log("Loader._loadManifestFile: now calling callback function");
			cb();
		}
	}
};

Loader.prototype._loadManifests = function(sync, cb) {
	//console.log("Loader._loadManifests: called " + (sync ? "synchronously" : "asychronously."));
	if (!this.manifest) {
		//console.log("Loader._loadManifests: attempting to find manifests");
		this.manifest = {};
		if (typeof(sync) !== 'boolean') {
			sync = true;
		}
			
		this._loadManifestFile(0, sync, cb);
	} else {
		//console.log("Loader._loadManifests: already loaded");
		if (typeof(cb) === 'function') {
			//console.log("Loader._loadManifests: now calling callback function");
			cb();
		}
	}
};

Loader.prototype.listAvailableFiles = function(sync, cb) {
	//console.log("generic loader: list available files called");
	this._loadManifests(sync, ilib.bind(this, function () {
		if (typeof(cb) === 'function') {
			//console.log("generic loader: now calling caller's callback function");
			cb(this.manifest);
		}
	}));
	return this.manifest;
};

Loader.indexOf = function(array, obj) {
	if (!array || !obj) {
		return -1;
	}
	if (typeof(array.indexOf) === 'function') {
		return array.indexOf(obj);
	} else {
		for (var i = 0; i < array.length; i++) {
	        if (array[i] === obj) {
	            return i;
	        }
	    }
	    return -1;
	}
};

Loader.prototype.checkAvailability = function(file) {
	for (var dir in this.manifest) {
		if (Loader.indexOf(this.manifest[dir], file) !== -1) {
			return true;
		}
	}
	
	return false;
};

Loader.prototype.isAvailable = function(file, sync, cb) {
	//console.log("Loader.isAvailable: called");
	if (typeof(sync) !== 'boolean') {
		sync = true;
	}
	if (sync) {
		this._loadManifests(sync);
		return this.checkAvailability(file);
	}
	
	this._loadManifests(false, ilib.bind(this, function () {
		// console.log("generic loader: isAvailable " + path + "? ");
		if (typeof(cb) === 'function') {
			cb(this.checkAvailability(file));
		}
	}));
};

module.exports = Loader;
},{'./Path.js':'enyo-ilib/Path','./ilib.js':'enyo-ilib/ilib'}],'enyo-ilib/HebrewCal':[function (module,exports,global,require,request){
/*
 * hebrew.js - Represent a Hebrew calendar object.
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/* !depends ilib.js Calendar.js MathUtils.js */

var ilib = require("./ilib.js");
var MathUtils = require("./MathUtils.js");
var Calendar = require("./Calendar.js");

/**
 * @class
 * Construct a new Hebrew calendar object. This class encodes information about
 * the Hebrew (Jewish) calendar. The Hebrew calendar is a tabular hebrew 
 * calendar where the dates are calculated by arithmetic rules. This differs from 
 * the religious Hebrew calendar which is used to mark the beginning of particular 
 * holidays. The religious calendar depends on the first sighting of the new 
 * crescent moon to determine the first day of the new month. Because humans and 
 * weather are both involved, the actual time of sighting varies, so it is not 
 * really possible to precalculate the religious calendar. Certain groups, such 
 * as the Hebrew Society of North America, decreed in in 2007 that they will use
 * a calendar based on calculations rather than observations to determine the 
 * beginning of lunar months, and therefore the dates of holidays.<p>
 * 
 * 
 * @constructor
 * @extends Calendar
 */
var HebrewCal = function() {
	this.type = "hebrew";
};

/**
 * Return the number of days elapsed in the Hebrew calendar before the
 * given year starts.
 * @private
 * @param {number} year the year for which the number of days is sought
 * @return {number} the number of days elapsed in the Hebrew calendar before the
 * given year starts
 */
HebrewCal.elapsedDays = function(year) {
	var months = Math.floor(((235*year) - 234)/19);
	var parts = 204 + 793 * MathUtils.mod(months, 1080);
	var hours = 11 + 12 * months + 793 * Math.floor(months/1080) + 
		Math.floor(parts/1080);
	var days = 29 * months + Math.floor(hours/24);
	return (MathUtils.mod(3 * (days + 1), 7) < 3) ? days + 1 : days;
};

/**
 * Return the number of days that the New Year's (Rosh HaShanah) in the Hebrew 
 * calendar will be corrected for the given year. Corrections are caused because New 
 * Year's is not allowed to start on certain days of the week. To deal with 
 * it, the start of the new year is corrected for the next year by adding a 
 * day to the 8th month (Heshvan) and/or the 9th month (Kislev) in the current
 * year to make them 30 days long instead of 29.
 * 
 * @private
 * @param {number} year the year for which the correction is sought
 * @param {number} elapsed number of days elapsed up to this year
 * @return {number} the number of days correction in the current year to make sure
 * Rosh HaShanah does not fall on undesirable days of the week
 */
HebrewCal.newYearsCorrection = function(year, elapsed) {
	var lastYear = HebrewCal.elapsedDays(year-1),
		thisYear = elapsed,
		nextYear = HebrewCal.elapsedDays(year+1);
	
	return (nextYear - thisYear) == 356 ? 2 : ((thisYear - lastYear) == 382 ? 1 : 0);
};

/**
 * Return the rata die date of the new year for the given hebrew year.
 * @private
 * @param {number} year the year for which the new year is needed
 * @return {number} the rata die date of the new year
 */
HebrewCal.newYear = function(year) {
	var elapsed = HebrewCal.elapsedDays(year); 
	
	return elapsed + HebrewCal.newYearsCorrection(year, elapsed);
};

/**
 * Return the number of days in the given year. Years contain a variable number of
 * days because the date of Rosh HaShanah (New Year's) changes so that it doesn't
 * fall on particular days of the week. Days are added to the months of Heshvan
 * and/or Kislev in the previous year in order to prevent the current year's New
 * Year from being on Sunday, Wednesday, or Friday.
 * 
 * @param {number} year the year for which the length is sought
 * @return {number} number of days in the given year
 */
HebrewCal.daysInYear = function(year) {
	return HebrewCal.newYear(year+1) - HebrewCal.newYear(year);
};

/**
 * Return true if the given year contains a long month of Heshvan. That is,
 * it is 30 days instead of 29.
 * 
 * @private
 * @param {number} year the year in which that month is questioned
 * @return {boolean} true if the given year contains a long month of Heshvan
 */
HebrewCal.longHeshvan = function(year) {
	return MathUtils.mod(HebrewCal.daysInYear(year), 10) === 5;
};

/**
 * Return true if the given year contains a long month of Kislev. That is,
 * it is 30 days instead of 29.
 * 
 * @private
 * @param {number} year the year in which that month is questioned
 * @return {boolean} true if the given year contains a short month of Kislev
 */
HebrewCal.longKislev = function(year) {
	return MathUtils.mod(HebrewCal.daysInYear(year), 10) !== 3;
};

/**
 * Return the date of the last day of the month for the given year. The date of
 * the last day of the month is variable because a number of months gain an extra 
 * day in leap years, and it is variable which months gain a day for each leap 
 * year and which do not.
 * 
 * @param {number} month the month for which the number of days is sought
 * @param {number} year the year in which that month is
 * @return {number} the number of days in the given month and year
 */
HebrewCal.prototype.lastDayOfMonth = function(month, year) {
	switch (month) {
		case 2: 
		case 4: 
		case 6: 
		case 10: 
			return 29;
		case 13:
			return this.isLeapYear(year) ? 29 : 0;
		case 8:
			return HebrewCal.longHeshvan(year) ? 30 : 29;
		case 9:
			return HebrewCal.longKislev(year) ? 30 : 29;
		case 12:
		case 1:
		case 3:
		case 5:
		case 7:
		case 11:
			return 30;
		default:
			return 0;
	}
};

/**
 * Return the number of months in the given year. The number of months in a year varies
 * for luni-solar calendars because in some years, an extra month is needed to extend the 
 * days in a year to an entire solar year. The month is represented as a 1-based number
 * where 1=first month, 2=second month, etc.
 * 
 * @param {number} year a year for which the number of months is sought
 */
HebrewCal.prototype.getNumMonths = function(year) {
	return this.isLeapYear(year) ? 13 : 12;
};

/**
 * Return the number of days in a particular month in a particular year. This function
 * can return a different number for a month depending on the year because of leap years.
 *
 * @param {number} month the month for which the length is sought
 * @param {number} year the year within which that month can be found
 * @returns {number} the number of days within the given month in the given year, or
 * 0 for an invalid month in the year
 */
HebrewCal.prototype.getMonLength = function(month, year) {
	if (month < 1 || month > 13 || (month == 13 && !this.isLeapYear(year))) {
		return 0;
	}
	return this.lastDayOfMonth(month, year);
};

/**
 * Return true if the given year is a leap year in the Hebrew calendar.
 * The year parameter may be given as a number, or as a HebrewDate object.
 * @param {number|Object} year the year for which the leap year information is being sought
 * @returns {boolean} true if the given year is a leap year
 */
HebrewCal.prototype.isLeapYear = function(year) {
	var y = (typeof(year) == 'number') ? year : year.year;
	return (MathUtils.mod(1 + 7 * y, 19) < 7);
};

/**
 * Return the type of this calendar.
 * 
 * @returns {string} the name of the type of this calendar 
 */
HebrewCal.prototype.getType = function() {
	return this.type;
};


/*register this calendar for the factory method */
Calendar._constructors["hebrew"] = HebrewCal;

module.exports = HebrewCal;

},{'./ilib.js':'enyo-ilib/ilib','./MathUtils.js':'enyo-ilib/MathUtils','./Calendar.js':'enyo-ilib/Calendar'}],'enyo-ilib/IslamicCal':[function (module,exports,global,require,request){
/*
 * islamic.js - Represent a Islamic calendar object.
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/* !depends 
ilib.js
Calendar.js 
MathUtils.js 
*/

var ilib = require("./ilib.js");
var MathUtils = require("./MathUtils.js");
var Calendar = require("./Calendar.js");

/**
 * @class
 * Construct a new Islamic calendar object. This class encodes information about
 * the civil Islamic calendar. The civil Islamic calendar is a tabular islamic 
 * calendar where the dates are calculated by arithmetic rules. This differs from 
 * the religious Islamic calendar which is used to mark the beginning of particular 
 * holidays. The religious calendar depends on the first sighting of the new 
 * crescent moon to determine the first day of the new month. Because humans and 
 * weather are both involved, the actual time of sighting varies, so it is not 
 * really possible to precalculate the religious calendar. Certain groups, such 
 * as the Islamic Society of North America, decreed in in 2007 that they will use
 * a calendar based on calculations rather than observations to determine the 
 * beginning of lunar months, and therefore the dates of holidays.<p>
 * 
 * 
 * @constructor
 * @extends Calendar
 */
var IslamicCal = function() {
	this.type = "islamic";
};

/**
 * the lengths of each month 
 * @private
 * @const
 * @type Array.<number>
 */
IslamicCal.monthLengths = [
	30,  /* Muharram */
	29,  /* Saffar */
	30,  /* Rabi'I */
	29,  /* Rabi'II */
	30,  /* Jumada I */
	29,  /* Jumada II */
	30,  /* Rajab */
	29,  /* Sha'ban */
	30,  /* Ramadan */
	29,  /* Shawwal */
	30,  /* Dhu al-Qa'da */
	29   /* Dhu al-Hijja */
];


/**
 * Return the number of months in the given year. The number of months in a year varies
 * for luni-solar calendars because in some years, an extra month is needed to extend the 
 * days in a year to an entire solar year. The month is represented as a 1-based number
 * where 1=first month, 2=second month, etc.
 * 
 * @param {number} year a year for which the number of months is sought
 */
IslamicCal.prototype.getNumMonths = function(year) {
	return 12;
};

/**
 * Return the number of days in a particular month in a particular year. This function
 * can return a different number for a month depending on the year because of things
 * like leap years.
 *
 * @param {number} month the month for which the length is sought
 * @param {number} year the year within which that month can be found
 * @return {number} the number of days within the given month in the given year
 */
IslamicCal.prototype.getMonLength = function(month, year) {
	if (month !== 12) {
		return IslamicCal.monthLengths[month-1];
	} else {
		return this.isLeapYear(year) ? 30 : 29;
	}
};

/**
 * Return true if the given year is a leap year in the Islamic calendar.
 * The year parameter may be given as a number, or as a IslamicDate object.
 * @param {number} year the year for which the leap year information is being sought
 * @return {boolean} true if the given year is a leap year
 */
IslamicCal.prototype.isLeapYear = function(year) {
	return (MathUtils.mod((14 + 11 * year), 30) < 11);
};

/**
 * Return the type of this calendar.
 * 
 * @return {string} the name of the type of this calendar 
 */
IslamicCal.prototype.getType = function() {
	return this.type;
};


/*register this calendar for the factory method */
Calendar._constructors["islamic"] = IslamicCal;

module.exports = IslamicCal;
},{'./ilib.js':'enyo-ilib/ilib','./MathUtils.js':'enyo-ilib/MathUtils','./Calendar.js':'enyo-ilib/Calendar'}],'enyo-ilib/JulianCal':[function (module,exports,global,require,request){
/*
 * julian.js - Represent a Julian calendar object.
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/* !depends ilib.js Calendar.js MathUtils.js */

var ilib = require("./ilib.js");
var MathUtils = require("./MathUtils.js");
var Calendar = require("./Calendar.js");

/**
 * @class
 * Construct a new Julian calendar object. This class encodes information about
 * a Julian calendar.<p>
 * 
 * 
 * @constructor
 * @extends Calendar
 */
var JulianCal = function() {
	this.type = "julian";
};

/* the lengths of each month */
JulianCal.monthLengths = [
	31,  /* Jan */
	28,  /* Feb */
	31,  /* Mar */
	30,  /* Apr */
	31,  /* May */
	30,  /* Jun */
	31,  /* Jul */
	31,  /* Aug */
	30,  /* Sep */
	31,  /* Oct */
	30,  /* Nov */
	31   /* Dec */
];

/**
 * the cumulative lengths of each month, for a non-leap year 
 * @private
 * @const
 * @type Array.<number>
 */
JulianCal.cumMonthLengths = [
    0,   /* Jan */
	31,  /* Feb */
	59,  /* Mar */
	90,  /* Apr */
	120, /* May */
	151, /* Jun */
	181, /* Jul */
	212, /* Aug */
	243, /* Sep */
	273, /* Oct */
	304, /* Nov */
	334, /* Dec */
	365
];

/**
 * the cumulative lengths of each month, for a leap year 
 * @private
 * @const
 * @type Array.<number>
 */
JulianCal.cumMonthLengthsLeap = [
	0,   /* Jan */
	31,  /* Feb */
	60,  /* Mar */
	91,  /* Apr */
	121, /* May */
	152, /* Jun */
	182, /* Jul */
	213, /* Aug */
	244, /* Sep */
	274, /* Oct */
	305, /* Nov */
	335, /* Dec */
	366
];

/**
 * Return the number of months in the given year. The number of months in a year varies
 * for lunar calendars because in some years, an extra month is needed to extend the 
 * days in a year to an entire solar year. The month is represented as a 1-based number
 * where 1=Jaunary, 2=February, etc. until 12=December.
 * 
 * @param {number} year a year for which the number of months is sought
 */
JulianCal.prototype.getNumMonths = function(year) {
	return 12;
};

/**
 * Return the number of days in a particular month in a particular year. This function
 * can return a different number for a month depending on the year because of things
 * like leap years.
 * 
 * @param {number} month the month for which the length is sought
 * @param {number} year the year within which that month can be found
 * @return {number} the number of days within the given month in the given year
 */
JulianCal.prototype.getMonLength = function(month, year) {
	if (month !== 2 || !this.isLeapYear(year)) {
		return JulianCal.monthLengths[month-1];
	} else {
		return 29;
	}
};

/**
 * Return true if the given year is a leap year in the Julian calendar.
 * The year parameter may be given as a number, or as a JulDate object.
 * @param {number|JulianDate} year the year for which the leap year information is being sought
 * @return {boolean} true if the given year is a leap year
 */
JulianCal.prototype.isLeapYear = function(year) {
	var y = (typeof(year) === 'number' ? year : year.year);
	return MathUtils.mod(y, 4) === ((year > 0) ? 0 : 3);
};

/**
 * Return the type of this calendar.
 * 
 * @return {string} the name of the type of this calendar 
 */
JulianCal.prototype.getType = function() {
	return this.type;
};


/* register this calendar for the factory method */
Calendar._constructors["julian"] = JulianCal;

module.exports = JulianCal;
},{'./ilib.js':'enyo-ilib/ilib','./MathUtils.js':'enyo-ilib/MathUtils','./Calendar.js':'enyo-ilib/Calendar'}],'enyo-ilib/PersianAlgoCal':[function (module,exports,global,require,request){
/*
 * persian.js - Represent a Persian algorithmic calendar object.
 * 
 * Copyright © 2014-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/* !depends ilib.js Calendar.js MathUtils.js */

var ilib = require("./ilib.js");
var MathUtils = require("./MathUtils.js");
var Calendar = require("./Calendar.js");

/**
 * @class
 * Construct a new Persian algorithmic calendar object. This class encodes information about
 * a Persian algorithmic calendar.<p>
 * 
 * 
 * @constructor
 * @extends Calendar
 */
var PersianAlgoCal = function() {
	this.type = "persian-algo";
};

/**
 * @private
 * @const
 * @type Array.<number> 
 * the lengths of each month 
 */
PersianAlgoCal.monthLengths = [
	31,  // Farvardin
	31,  // Ordibehesht
	31,  // Khordad
	31,  // Tir
	31,  // Mordad
	31,  // Shahrivar
	30,  // Mehr
	30,  // Aban
	30,  // Azar
	30,  // Dey
	30,  // Bahman
	29   // Esfand
];

/**
 * Return the number of months in the given year. The number of months in a year varies
 * for some luni-solar calendars because in some years, an extra month is needed to extend the 
 * days in a year to an entire solar year. The month is represented as a 1-based number
 * where 1=first month, 2=second month, etc.
 * 
 * @param {number} year a year for which the number of months is sought
 * @return {number} The number of months in the given year
 */
PersianAlgoCal.prototype.getNumMonths = function(year) {
	return 12;
};

/**
 * Return the number of days in a particular month in a particular year. This function
 * can return a different number for a month depending on the year because of things
 * like leap years.
 * 
 * @param {number} month the month for which the length is sought
 * @param {number} year the year within which that month can be found
 * @return {number} the number of days within the given month in the given year
 */
PersianAlgoCal.prototype.getMonLength = function(month, year) {
	if (month !== 12 || !this.isLeapYear(year)) {
		return PersianAlgoCal.monthLengths[month-1];
	} else {
		// Month 12, Esfand, has 30 days instead of 29 in leap years
		return 30;
	}
};

/**
 * Return the equivalent year in the 2820 year cycle that begins on 
 * Far 1, 474. This particular cycle obeys the cycle-of-years formula 
 * whereas the others do not specifically. This cycle can be used as
 * a proxy for other years outside of the cycle by shifting them into 
 * the cycle.   
 * @param {number} year year to find the equivalent cycle year for
 * @returns {number} the equivalent cycle year
 */
PersianAlgoCal.prototype.equivalentCycleYear = function(year) {
	var y = year - (year >= 0 ? 474 : 473);
	return MathUtils.mod(y, 2820) + 474;
};

/**
 * Return true if the given year is a leap year in the Persian calendar.
 * The year parameter may be given as a number, or as a PersAlgoDate object.
 * @param {number} year the year for which the leap year information is being sought
 * @return {boolean} true if the given year is a leap year
 */
PersianAlgoCal.prototype.isLeapYear = function(year) {
	return (MathUtils.mod((this.equivalentCycleYear(year) + 38) * 682, 2816) < 682);
};

/**
 * Return the type of this calendar.
 * 
 * @return {string} the name of the type of this calendar 
 */
PersianAlgoCal.prototype.getType = function() {
	return this.type;
};


/* register this calendar for the factory method */
Calendar._constructors["persian-algo"] = PersianAlgoCal;

module.exports = PersianAlgoCal;
},{'./ilib.js':'enyo-ilib/ilib','./MathUtils.js':'enyo-ilib/MathUtils','./Calendar.js':'enyo-ilib/Calendar'}],'../src/zoneinfo':[function (module,exports,global,require,request){
/*
 * zoneinfo.js - represent a binary zone info file
 *
 * Copyright © 2014 LG Electronics, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * The portion of this code that parses the zone info file format is derived
 * from the code in the node-zoneinfo project by Gregory McWhirter licensed
 * under the MIT license:
 *
 * Copyright (c) 2013 Gregory McWhirter
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject
 * to the following conditions:

 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

var
	PackedBuffer = require("./packedbuffer.js");

var _platform = "unknown";

(function () {
	if (typeof(require) !== 'undefined') {
		try {
			if(typeof(require('enyo')) !== 'undefined') {
				_platform = "enyo";
			} else {
				_platform = "nodejs";
			}
		} catch(e) {
			_platform = "nodejs";
		}
	} else if (typeof(environment) !== 'undefined') {
		_platform = "rhino";
	} else if (typeof(process) !== 'undefined') {
		_platform = "nodejs";
	} else if (typeof(window) !== 'undefined') {
		_platform = (typeof(PalmSystem) !== 'undefined') ? "webos" : "browser";
	}
})();

/**
 * @constructor
 * Represents a binary zone info file of the sort that the Unix Zone Info Compiler
 * produces.
 * @param {string} path path to the file to be loaded
 * @param {number} year year of the zone info rules needed
 */
var ZoneInfoFile = function (path) {
	var that = this;
	switch (_platform) {
		/*
		Uncomment and use this when enyo works for binary load.
		case "enyo":
			var ajax = new enyo.Ajax({
				xhrFields: {
					responseType:"arraybuffer"
				},
				cacheBust: false,
				sync: true,
				handleAs: "binary",
				url: "file://" + path
			});
			ajax.response(this, function(s, r) {
				var byteArray = new Uint8Array(r);
				// console.log("ZoneInfoFile bytes received: " + byteArray.length);
				that._parseInfo(byteArray);
			});
			//ajax.error(this, function(s, r) {
			//	console.log("ZoneInfoFile: failed to load files " + JSON.stringify(s) + " " + r);
			//});
			ajax.go();
			break;
		*/
		
		case "nodejs":
			// console.log("ZoneInfoFile: loading zoneinfo path " + path + "\n");
			
			var bytes = new Buffer(fs.readFileSync(path));
			var byteArray = new Uint8Array(bytes);
			this._parseInfo(byteArray);
			break;
			
		default:
			// use normal web techniques for sync binary data fetching
			// see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data
			var req = new XMLHttpRequest();
			req.open("GET", "file:" + path, false);
			req.overrideMimeType('text\/plain; charset=x-user-defined');
			req.onload = function(e) {
				var byteArray = new Uint8Array(req.response.length);
				for (var i=0; i<req.response.length; i++) {
					byteArray[i] = req.response.charCodeAt(i) & 0xff;
				}
				// console.log("ZoneInfoFile bytes received: " + byteArray.length);
				that._parseInfo(byteArray);
			};
			req.onerror = function(e) {
				throw "Cannot load file " + path;
			};
			req.send();
			break;
	}
};

/**
 * @private
 * Parse the binary buffer to find the zone info
 * @param buffer
 */
ZoneInfoFile.prototype._parseInfo = function(buffer) {
	var packed = new PackedBuffer(buffer);

	// The time zone information files used by tzset(3)
	// begin with the magic characters "TZif" to identify
	// them as time zone information files, followed by
	// sixteen bytes reserved for future use, followed by
	// six four-byte values of type long, written in a
	// ''standard'' byte order (the high-order byte
	// of the value is written first).
	if (packed.getString(4) != "TZif") {
		throw "file format not recognized";
	} else {
		// ignore 16 bytes
		packed.skip(16);

		// The number of UTC/local indicators stored in the file.
		var tzh_ttisgmtcnt = packed.getLong();
		// The number of standard/wall indicators stored in the file.
		var tzh_ttisstdcnt = packed.getLong();
		// The number of leap seconds for which data is stored in the file.
		var tzh_leapcnt = packed.getLong();
		// The number of "transition times" for which data is stored in the file.
		var tzh_timecnt = packed.getLong();
		// The number of "local time types" for which data is stored in the file (must not be zero).
		var tzh_typecnt = packed.getLong();
		// The number of characters of "time zone abbreviation strings" stored in the file.
		var tzh_charcnt = packed.getLong();

		this.transitionTimes = tzh_timecnt ? packed.getLongs(tzh_timecnt) : [];

		this.transitionTimes = this.transitionTimes.map(function (item) {
			return item * 1000;
		});

		// these are indexes into the zonesInfo that correspond to each transition time
		this.ruleIndex = tzh_timecnt ? packed.getUnsignedBytes(tzh_timecnt) : [];

		this.zoneInfo = [];
		for (var i = 0; i < tzh_typecnt; i++) {
			this.zoneInfo.push({
				offset: Math.floor(packed.getLong()/60),  // offset in seconds, so convert to minutes
				isdst: !!packed.getByte(),
				abbreviationIndex: packed.getByte()
			});
		}

		var allAbbreviations = packed.getString(tzh_charcnt);

		for (var i = 0; i < tzh_typecnt; i++) {
			var abbreviation = allAbbreviations.substring(this.zoneInfo[i].abbreviationIndex);
			this.zoneInfo[i].abbreviation = abbreviation.substring(0, abbreviation.indexOf('\x00'));
		}

		// ignore the leap seconds
		if (tzh_leapcnt) {
			packed.skip(tzh_leapcnt * 2);
		}

		// skip the standard/wall time indicators
		if (tzh_ttisstdcnt) {
			packed.skip(tzh_ttisstdcnt);
		}

		// ignore the UTC/local time indicators -- everything should be UTC
		if (tzh_ttisgmtcnt) {
			packed.skip(tzh_ttisgmtcnt);
		}

		// finished reading

		// Replace ttinfo indexes for ttinfo objects.
		var that = this;
		this.ruleIndex = this.ruleIndex.map(function (item) {
			return {
				offset: that.zoneInfo[item].offset,
				isdst: that.zoneInfo[item].isdst,
				abbreviation: that.zoneInfo[item].abbreviation
			};
		});

		// calculate the dst savings for each daylight time
		for (var i = 0; i < tzh_timecnt; i++) {
			if (i > 0 && this.ruleIndex[i].isdst) {
				this.ruleIndex[i].savings = this.ruleIndex[i].offset - this.ruleIndex[i-1].offset;
			}
		}

		// Set standard, dst, and before ttinfos. before will be
		// used when a given time is before any transitions,
		// and will be set to the first non-dst ttinfo, or to
		// the first dst, if all of them are dst.
		if (!this.transitionTimes.length) {
			this.standardTime = this.zoneInfo[0];
		} else {
			for (var j = tzh_timecnt - 1; j > -1; j--) {
				var tti = this.ruleIndex[j];
				if (!this.standardTime && !tti.isdst) {
					this.standardTime = tti;
				} else if (!this.daylightTime && tti.isdst) {
					this.daylightTime = tti;
				}

				if (this.daylightTime && this.standardTime)
					break;
			}

			if (this.daylightTime && !this.standardTime) {
				this.standardTime = this.daylightTime;
			}

			for (var k = this.zoneInfo.length-1; k > 0; k--) {
				if (!this.zoneInfo[k].isdst) {
					this.defaultTime = this.zoneInfo[k];
					break;
				}
			}
		}
		if (!this.defaultTime) {
			this.defaultTime = this.zoneInfo[this.zoneInfo.length-1];
		}
	}
};

/**
 * Binary search a sorted array of numbers for a particular target value.
 * If the exact value is not found, it returns the index of the largest
 * entry that is smaller than the given target value.<p>
 *
 * @param {number} target element being sought
 * @param {Array} arr the array being searched
 * @return the index of the array into which the value would fit if
 * inserted, or -1 if given array is not an array or the target is not
 * a number
 */
ZoneInfoFile.prototype.bsearch = function(target, arr) {
	if (typeof(arr) === 'undefined' || !arr || typeof(target) === 'undefined' || target < arr[0]) {
		return -1;
	}

	// greater than the end of the array
	if (target > arr[arr.length-1]) {
		return arr.length - 1;
	}

	var high = arr.length - 1,
		low = 0,
		mid = 0,
		value;

	while (low <= high) {
		mid = Math.floor((high+low)/2);
		value = arr[mid] - target;
		if (value > 0) {
			high = mid - 1;
		} else if (value < 0) {
			low = mid + 1;
		} else {
			return mid;
		}
	}

	return high;
};

/**
 * Return whether or not this zone uses DST in the given year.
 *
 * @param {Date} date the Gregorian date to test
 * @returns {boolean} true if the zone uses DST in the given year
 */
ZoneInfoFile.prototype.usesDST = function(date) {
	var thisYear = date.getTime();
	var nextYear = thisYear + 31536000000; // this is the number of ms in 1 Gregorian year

	// search for the zone that was effective Jan 1 of this year
	// to Jan 1 of next year, and if any of the infos is DST, then
	// this zone supports DST in the given year.

	var index = this.bsearch(thisYear, this.transitionTimes);
	if (index !== -1) {
		while (index < this.transitionTimes.length && this.transitionTimes[index] < nextYear) {
			if (this.ruleIndex[index++].isdst) {
				return true;
			}
		}
	}

	return false;
};

/**
 * Return the raw offset from UTC that this zone uses at the given time.
 *
 * @param {Date} date the Gregorian date to test
 * @returns {number} offset from from UTC in number of minutes. Negative
 * numbers are west of Greenwich, positive are east of Greenwich
 */
ZoneInfoFile.prototype.getRawOffset = function(date) {
	var thisYear = date.getTime();
	var nextYear = thisYear + 31536000000; // this is the number of ms in 1 Gregorian year

	var index = this.bsearch(thisYear, this.transitionTimes);

	var offset = this.defaultTime.offset;
	if (index > -1) {
		while (index < this.transitionTimes.length && this.ruleIndex[index].isdst && this.transitionTimes[index+1] < nextYear) {
			index++;
		}

		if (index < this.transitionTimes.length && !this.ruleIndex[index].isdst) {
			offset = this.ruleIndex[index].offset;
		}
	}

	return offset;
};

/**
 * If this zone uses DST in the given year, return the DST savings
 * in use. If the zone does not use DST in the given year, this
 * method will return 0.
 *
 * @param {Date} date the Gregorian date to test
 * @returns {number} number of minutes in DST savings if the zone
 * uses DST in the given year, or zero otherwise
 */
ZoneInfoFile.prototype.getDSTSavings = function(date) {
	var thisYear = date.getTime();
	var nextYear = thisYear + 31536000000; // this is the number of ms in 1 Gregorian year

	// search for all transitions between now and one year 
	// from now, and calculate the difference in DST (if any)

	var index = this.bsearch(thisYear, this.transitionTimes);
	var savings = 0;
	if (index > -1) {
		while (index < this.transitionTimes.length && !this.ruleIndex[index].isdst && this.transitionTimes[index+1] < nextYear) {
			index++;
		}

		if (index < this.transitionTimes.length && this.ruleIndex[index].isdst) {
			savings = this.ruleIndex[index].savings;
		}
	}

	return savings;
};

/**
 * Return the start date/time of DST if this zone uses
 * DST in the given year.
 *
 * @param {Date} date the Gregorian date to test
 * @returns {number} unixtime representation of the start
 * of DST in the given year, or -1 if the zone does not
 * use DST in the given year
 */
ZoneInfoFile.prototype.getDSTStartDate = function(date) {
	var year = date.getFullYear();
	var thisYear = new Date(year, 0, 1).getTime();
	var nextYear = new Date(year+1, 0, 1).getTime();

	// search for all transitions between Jan 1 of this year
	// to Jan 1 of next year, and calculate the difference
	// in DST (if any)

	var index = this.bsearch(thisYear, this.transitionTimes);
	var startDate = -1;
	if (index > -1) {
		if (this.transitionTimes[index] < thisYear) {
			index++; // start in this year instead of the previous year
		}
		while (index < this.transitionTimes.length && !this.ruleIndex[index].isdst && this.transitionTimes[index+1] < nextYear) {
			index++;
		}

		if (index < this.transitionTimes.length && this.ruleIndex[index].isdst) {
			startDate = this.transitionTimes[index];
		}
	}

	return startDate;
};

/**
 * Return the end date/time of DST if this zone uses
 * DST in the given year.
 *
 * @param {Date} date the Gregorian date to test
 * @returns {number} unixtime representation of the end
 * of DST in the given year, or -1 if the zone does not
 * use DST in the given year
 */
ZoneInfoFile.prototype.getDSTEndDate = function(date) {
	var year = date.getFullYear();
	var thisYear = new Date(year, 0, 1).getTime();
	var nextYear = new Date(year+1, 0, 1).getTime();

	// search for all transitions between Jan 1 of this year
	// to Jan 1 of next year, and calculate the difference
	// in DST (if any)

	var index = this.bsearch(thisYear, this.transitionTimes);
	var endDate = -1;
	if (index > -1) {
		if (this.transitionTimes[index] < thisYear) {
			index++; // start in this year instead of the previous year
		}
		while (index < this.transitionTimes.length && this.ruleIndex[index].isdst && this.transitionTimes[index+1] < nextYear) {
			index++;
		}

		if (index < this.transitionTimes.length && !this.ruleIndex[index].isdst) {
			endDate = this.transitionTimes[index];
		}
	}

	return endDate;
};

/**
 * Return the abbreviation used by this zone in standard
 * time.
 *
 * @param {Date} date the Gregorian date to test
 * @returns {string} a string representing the abbreviation
 * used in this time zone during standard time
 */
ZoneInfoFile.prototype.getAbbreviation = function(date) {
	var thisYear = date.getTime();
	var nextYear = thisYear + 31536000000; // this is the number of ms in 1 Gregorian year

	// search for all transitions between now and one year from now, and calculate the difference
	// in DST (if any)
	var abbr;
	if (this.transitionTimes.length > 0) {
		var index = this.bsearch(thisYear, this.transitionTimes);
		abbr = this.ruleIndex[index].abbreviation;
		if (index > -1) {
			while (index < this.transitionTimes.length && this.ruleIndex[index].isdst && this.transitionTimes[index+1] < nextYear) {
				index++;
			}

			if (index < this.transitionTimes.length && !this.ruleIndex[index].isdst) {
				abbr = this.ruleIndex[index].abbreviation;
			}
		}
	} else {
		abbr = this.standardTime.abbreviation;
	}

	return abbr;
};

/**
 * Return the abbreviation used by this zone in daylight
 * time. If the zone does not use DST in the given year,
 * this returns the same thing as getAbbreviation().
 *
 * @param {Date} date the Gregorian date to test
 * @returns {string} a string representing the abbreviation
 * used in this time zone during daylight time
 */
ZoneInfoFile.prototype.getDSTAbbreviation = function(date) {
	var thisYear = date.getTime();
	var nextYear = thisYear + 31536000000; // this is the number of ms in 1 Gregorian year

	// search for all transitions between now and one year from now, and calculate the difference
	// in DST (if any)

	var abbr;
	if (this.transitionTimes.length > 0) {
		var index = this.bsearch(thisYear, this.transitionTimes);
		abbr = this.ruleIndex[index].abbreviation;
		if (index > -1) {
			while (index < this.transitionTimes.length && !this.ruleIndex[index].isdst && this.transitionTimes[index+1] < nextYear) {
				index++;
			}

			if (index < this.transitionTimes.length && this.ruleIndex[index].isdst) {
				abbr = this.ruleIndex[index].abbreviation;
			}
		}
	} else {
		abbr = this.standardTime.abbreviation;
	}

	return abbr;
};

/**
 * Return the zone information for the given date in ilib
 * format.
 *
 * @param {Date} date the Gregorian date to test
 * @returns {Object} an object containing the zone information
 * for the given date in the format that ilib can use directly
 */
ZoneInfoFile.prototype.getIlibZoneInfo = function(date) {
	function minutesToStr(min) {
		var hours = Math.floor(min / 60);
		var minutes = min - hours * 60;

		return hours + ":" + minutes;
	}

	function unixtimeToJD(millis) {
		return 2440587.5 + millis / 86400000;
	}
	var res = {
		"o": minutesToStr(this.getRawOffset(date))
	};
	if (this.usesDST(date)) {
		res.f = "{c}";
		res.e = {
			"c": this.getAbbreviation(date),
			"j": unixtimeToJD(this.getDSTEndDate(date))
		};
		res.s = {
			"c": this.getDSTAbbreviation(date),
			"j": unixtimeToJD(this.getDSTStartDate(date)),
			"v": minutesToStr(this.getDSTSavings(date))
		};
	} else {
		res.f = this.getAbbreviation(date);
	}

	return res;
};

module.exports = ZoneInfoFile;

},{'./packedbuffer.js':'../src/packedbuffer'}],'enyo-ilib/Locale':[function (module,exports,global,require,request){
/*
 * Locale.js - Locale specifier definition
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// !depends ilib.js JSUtils.js

var ilib = require("./ilib.js");
var JSUtils = require("./JSUtils.js");

/**
 * @class
 * Create a new locale instance. Locales are specified either with a specifier string 
 * that follows the BCP-47 convention (roughly: "language-region-script-variant") or 
 * with 4 parameters that specify the language, region, variant, and script individually.<p>
 * 
 * The language is given as an ISO 639-1 two-letter, lower-case language code. You
 * can find a full list of these codes at 
 * <a href="http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes">http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes</a><p>
 * 
 * The region is given as an ISO 3166-1 two-letter, upper-case region code. You can
 * find a full list of these codes at 
 * <a href="http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2</a>.<p>
 * 
 * The variant is any string that does not contain a dash which further differentiates
 * locales from each other.<p>
 * 
 * The script is given as the ISO 15924 four-letter script code. In some locales,
 * text may be validly written in more than one script. For example, Serbian is often
 * written in both Latin and Cyrillic, though not usually mixed together. You can find a
 * full list of these codes at 
 * <a href="http://en.wikipedia.org/wiki/ISO_15924#List_of_codes">http://en.wikipedia.org/wiki/ISO_15924#List_of_codes</a>.<p>
 * 
 * As an example in ilib, the script can be used in the date formatter. Dates formatted 
 * in Serbian could have day-of-week names or month names written in the Latin
 * or Cyrillic script. Often one script is default such that sr-SR-Latn is the same
 * as sr-SR so the script code "Latn" can be left off of the locale spec.<p> 
 * 
 * Each part is optional, and an empty string in the specifier before or after a 
 * dash or as a parameter to the constructor denotes an unspecified value. In this
 * case, many of the ilib functions will treat the locale as generic. For example
 * the locale "en-" is equivalent to "en" and to "en--" and denotes a locale
 * of "English" with an unspecified region and variant, which typically matches
 * any region or variant.<p>
 * 
 * Without any arguments to the constructor, this function returns the locale of
 * the host Javascript engine.<p>
 * 
 * 
 * @constructor
 * @param {?string|Locale=} language the ISO 639 2-letter code for the language, or a full 
 * locale spec in BCP-47 format, or another Locale instance to copy from
 * @param {string=} region the ISO 3166 2-letter code for the region
 * @param {string=} variant the name of the variant of this locale, if any
 * @param {string=} script the ISO 15924 code of the script for this locale, if any
 */
var Locale = function(language, region, variant, script) {
	if (typeof(region) === 'undefined') {
		var spec = language || ilib.getLocale();
		if (typeof(spec) === 'string') {
			var parts = spec.split('-');
	        for ( var i = 0; i < parts.length; i++ ) {
	        	if (Locale._isLanguageCode(parts[i])) {
	    			/** 
	    			 * @private
	    			 * @type {string|undefined}
	    			 */
	        		this.language = parts[i];
	        	} else if (Locale._isRegionCode(parts[i])) {
	    			/** 
	    			 * @private
	    			 * @type {string|undefined}
	    			 */
	        		this.region = parts[i];
	        	} else if (Locale._isScriptCode(parts[i])) {
	    			/** 
	    			 * @private
	    			 * @type {string|undefined}
	    			 */
	        		this.script = parts[i];
	        	} else {
	    			/** 
	    			 * @private
	    			 * @type {string|undefined}
	    			 */
	        		this.variant = parts[i];
	        	}
	        }
	        this.language = this.language || undefined;
	        this.region = this.region || undefined;
	        this.script = this.script || undefined;
	        this.variant = this.variant || undefined;
		} else if (typeof(spec) === 'object') {
	        this.language = spec.language || undefined;
	        this.region = spec.region || undefined;
	        this.script = spec.script || undefined;
	        this.variant = spec.variant || undefined;
		}
	} else {
		if (language) {
			language = language.trim();
			this.language = language.length > 0 ? language.toLowerCase() : undefined;
		} else {
			this.language = undefined;
		}
		if (region) {
			region = region.trim();
			this.region = region.length > 0 ? region.toUpperCase() : undefined;
		} else {
			this.region = undefined;
		}
		if (variant) {
			variant = variant.trim();
			this.variant = variant.length > 0 ? variant : undefined;
		} else {
			this.variant = undefined;
		}
		if (script) {
			script = script.trim();
			this.script = script.length > 0 ? script : undefined;
		} else {
			this.script = undefined;
		}
	}
	this._genSpec();
};

// from http://en.wikipedia.org/wiki/ISO_3166-1
Locale.a2toa3regmap = {
	"AF": "AFG",
	"AX": "ALA",
	"AL": "ALB",
	"DZ": "DZA",
	"AS": "ASM",
	"AD": "AND",
	"AO": "AGO",
	"AI": "AIA",
	"AQ": "ATA",
	"AG": "ATG",
	"AR": "ARG",
	"AM": "ARM",
	"AW": "ABW",
	"AU": "AUS",
	"AT": "AUT",
	"AZ": "AZE",
	"BS": "BHS",
	"BH": "BHR",
	"BD": "BGD",
	"BB": "BRB",
	"BY": "BLR",
	"BE": "BEL",
	"BZ": "BLZ",
	"BJ": "BEN",
	"BM": "BMU",
	"BT": "BTN",
	"BO": "BOL",
	"BQ": "BES",
	"BA": "BIH",
	"BW": "BWA",
	"BV": "BVT",
	"BR": "BRA",
	"IO": "IOT",
	"BN": "BRN",
	"BG": "BGR",
	"BF": "BFA",
	"BI": "BDI",
	"KH": "KHM",
	"CM": "CMR",
	"CA": "CAN",
	"CV": "CPV",
	"KY": "CYM",
	"CF": "CAF",
	"TD": "TCD",
	"CL": "CHL",
	"CN": "CHN",
	"CX": "CXR",
	"CC": "CCK",
	"CO": "COL",
	"KM": "COM",
	"CG": "COG",
	"CD": "COD",
	"CK": "COK",
	"CR": "CRI",
	"CI": "CIV",
	"HR": "HRV",
	"CU": "CUB",
	"CW": "CUW",
	"CY": "CYP",
	"CZ": "CZE",
	"DK": "DNK",
	"DJ": "DJI",
	"DM": "DMA",
	"DO": "DOM",
	"EC": "ECU",
	"EG": "EGY",
	"SV": "SLV",
	"GQ": "GNQ",
	"ER": "ERI",
	"EE": "EST",
	"ET": "ETH",
	"FK": "FLK",
	"FO": "FRO",
	"FJ": "FJI",
	"FI": "FIN",
	"FR": "FRA",
	"GF": "GUF",
	"PF": "PYF",
	"TF": "ATF",
	"GA": "GAB",
	"GM": "GMB",
	"GE": "GEO",
	"DE": "DEU",
	"GH": "GHA",
	"GI": "GIB",
	"GR": "GRC",
	"GL": "GRL",
	"GD": "GRD",
	"GP": "GLP",
	"GU": "GUM",
	"GT": "GTM",
	"GG": "GGY",
	"GN": "GIN",
	"GW": "GNB",
	"GY": "GUY",
	"HT": "HTI",
	"HM": "HMD",
	"VA": "VAT",
	"HN": "HND",
	"HK": "HKG",
	"HU": "HUN",
	"IS": "ISL",
	"IN": "IND",
	"ID": "IDN",
	"IR": "IRN",
	"IQ": "IRQ",
	"IE": "IRL",
	"IM": "IMN",
	"IL": "ISR",
	"IT": "ITA",
	"JM": "JAM",
	"JP": "JPN",
	"JE": "JEY",
	"JO": "JOR",
	"KZ": "KAZ",
	"KE": "KEN",
	"KI": "KIR",
	"KP": "PRK",
	"KR": "KOR",
	"KW": "KWT",
	"KG": "KGZ",
	"LA": "LAO",
	"LV": "LVA",
	"LB": "LBN",
	"LS": "LSO",
	"LR": "LBR",
	"LY": "LBY",
	"LI": "LIE",
	"LT": "LTU",
	"LU": "LUX",
	"MO": "MAC",
	"MK": "MKD",
	"MG": "MDG",
	"MW": "MWI",
	"MY": "MYS",
	"MV": "MDV",
	"ML": "MLI",
	"MT": "MLT",
	"MH": "MHL",
	"MQ": "MTQ",
	"MR": "MRT",
	"MU": "MUS",
	"YT": "MYT",
	"MX": "MEX",
	"FM": "FSM",
	"MD": "MDA",
	"MC": "MCO",
	"MN": "MNG",
	"ME": "MNE",
	"MS": "MSR",
	"MA": "MAR",
	"MZ": "MOZ",
	"MM": "MMR",
	"NA": "NAM",
	"NR": "NRU",
	"NP": "NPL",
	"NL": "NLD",
	"NC": "NCL",
	"NZ": "NZL",
	"NI": "NIC",
	"NE": "NER",
	"NG": "NGA",
	"NU": "NIU",
	"NF": "NFK",
	"MP": "MNP",
	"NO": "NOR",
	"OM": "OMN",
	"PK": "PAK",
	"PW": "PLW",
	"PS": "PSE",
	"PA": "PAN",
	"PG": "PNG",
	"PY": "PRY",
	"PE": "PER",
	"PH": "PHL",
	"PN": "PCN",
	"PL": "POL",
	"PT": "PRT",
	"PR": "PRI",
	"QA": "QAT",
	"RE": "REU",
	"RO": "ROU",
	"RU": "RUS",
	"RW": "RWA",
	"BL": "BLM",
	"SH": "SHN",
	"KN": "KNA",
	"LC": "LCA",
	"MF": "MAF",
	"PM": "SPM",
	"VC": "VCT",
	"WS": "WSM",
	"SM": "SMR",
	"ST": "STP",
	"SA": "SAU",
	"SN": "SEN",
	"RS": "SRB",
	"SC": "SYC",
	"SL": "SLE",
	"SG": "SGP",
	"SX": "SXM",
	"SK": "SVK",
	"SI": "SVN",
	"SB": "SLB",
	"SO": "SOM",
	"ZA": "ZAF",
	"GS": "SGS",
	"SS": "SSD",
	"ES": "ESP",
	"LK": "LKA",
	"SD": "SDN",
	"SR": "SUR",
	"SJ": "SJM",
	"SZ": "SWZ",
	"SE": "SWE",
	"CH": "CHE",
	"SY": "SYR",
	"TW": "TWN",
	"TJ": "TJK",
	"TZ": "TZA",
	"TH": "THA",
	"TL": "TLS",
	"TG": "TGO",
	"TK": "TKL",
	"TO": "TON",
	"TT": "TTO",
	"TN": "TUN",
	"TR": "TUR",
	"TM": "TKM",
	"TC": "TCA",
	"TV": "TUV",
	"UG": "UGA",
	"UA": "UKR",
	"AE": "ARE",
	"GB": "GBR",
	"US": "USA",
	"UM": "UMI",
	"UY": "URY",
	"UZ": "UZB",
	"VU": "VUT",
	"VE": "VEN",
	"VN": "VNM",
	"VG": "VGB",
	"VI": "VIR",
	"WF": "WLF",
	"EH": "ESH",
	"YE": "YEM",
	"ZM": "ZMB",
	"ZW": "ZWE"
};


Locale.a1toa3langmap = {
	"ab": "abk",
	"aa": "aar",
	"af": "afr",
	"ak": "aka",
	"sq": "sqi",
	"am": "amh",
	"ar": "ara",
	"an": "arg",
	"hy": "hye",
	"as": "asm",
	"av": "ava",
	"ae": "ave",
	"ay": "aym",
	"az": "aze",
	"bm": "bam",
	"ba": "bak",
	"eu": "eus",
	"be": "bel",
	"bn": "ben",
	"bh": "bih",
	"bi": "bis",
	"bs": "bos",
	"br": "bre",
	"bg": "bul",
	"my": "mya",
	"ca": "cat",
	"ch": "cha",
	"ce": "che",
	"ny": "nya",
	"zh": "zho",
	"cv": "chv",
	"kw": "cor",
	"co": "cos",
	"cr": "cre",
	"hr": "hrv",
	"cs": "ces",
	"da": "dan",
	"dv": "div",
	"nl": "nld",
	"dz": "dzo",
	"en": "eng",
	"eo": "epo",
	"et": "est",
	"ee": "ewe",
	"fo": "fao",
	"fj": "fij",
	"fi": "fin",
	"fr": "fra",
	"ff": "ful",
	"gl": "glg",
	"ka": "kat",
	"de": "deu",
	"el": "ell",
	"gn": "grn",
	"gu": "guj",
	"ht": "hat",
	"ha": "hau",
	"he": "heb",
	"hz": "her",
	"hi": "hin",
	"ho": "hmo",
	"hu": "hun",
	"ia": "ina",
	"id": "ind",
	"ie": "ile",
	"ga": "gle",
	"ig": "ibo",
	"ik": "ipk",
	"io": "ido",
	"is": "isl",
	"it": "ita",
	"iu": "iku",
	"ja": "jpn",
	"jv": "jav",
	"kl": "kal",
	"kn": "kan",
	"kr": "kau",
	"ks": "kas",
	"kk": "kaz",
	"km": "khm",
	"ki": "kik",
	"rw": "kin",
	"ky": "kir",
	"kv": "kom",
	"kg": "kon",
	"ko": "kor",
	"ku": "kur",
	"kj": "kua",
	"la": "lat",
	"lb": "ltz",
	"lg": "lug",
	"li": "lim",
	"ln": "lin",
	"lo": "lao",
	"lt": "lit",
	"lu": "lub",
	"lv": "lav",
	"gv": "glv",
	"mk": "mkd",
	"mg": "mlg",
	"ms": "msa",
	"ml": "mal",
	"mt": "mlt",
	"mi": "mri",
	"mr": "mar",
	"mh": "mah",
	"mn": "mon",
	"na": "nau",
	"nv": "nav",
	"nb": "nob",
	"nd": "nde",
	"ne": "nep",
	"ng": "ndo",
	"nn": "nno",
	"no": "nor",
	"ii": "iii",
	"nr": "nbl",
	"oc": "oci",
	"oj": "oji",
	"cu": "chu",
	"om": "orm",
	"or": "ori",
	"os": "oss",
	"pa": "pan",
	"pi": "pli",
	"fa": "fas",
	"pl": "pol",
	"ps": "pus",
	"pt": "por",
	"qu": "que",
	"rm": "roh",
	"rn": "run",
	"ro": "ron",
	"ru": "rus",
	"sa": "san",
	"sc": "srd",
	"sd": "snd",
	"se": "sme",
	"sm": "smo",
	"sg": "sag",
	"sr": "srp",
	"gd": "gla",
	"sn": "sna",
	"si": "sin",
	"sk": "slk",
	"sl": "slv",
	"so": "som",
	"st": "sot",
	"es": "spa",
	"su": "sun",
	"sw": "swa",
	"ss": "ssw",
	"sv": "swe",
	"ta": "tam",
	"te": "tel",
	"tg": "tgk",
	"th": "tha",
	"ti": "tir",
	"bo": "bod",
	"tk": "tuk",
	"tl": "tgl",
	"tn": "tsn",
	"to": "ton",
	"tr": "tur",
	"ts": "tso",
	"tt": "tat",
	"tw": "twi",
	"ty": "tah",
	"ug": "uig",
	"uk": "ukr",
	"ur": "urd",
	"uz": "uzb",
	"ve": "ven",
	"vi": "vie",
	"vo": "vol",
	"wa": "wln",
	"cy": "cym",
	"wo": "wol",
	"fy": "fry",
	"xh": "xho",
	"yi": "yid",
	"yo": "yor",
	"za": "zha",
	"zu": "zul"
};

/**
 * Tell whether or not the str does not start with a lower case ASCII char.
 * @private
 * @param {string} str the char to check
 * @return {boolean} true if the char is not a lower case ASCII char
 */
Locale._notLower = function(str) {
	// do this with ASCII only so we don't have to depend on the CType functions
	var ch = str.charCodeAt(0);
	return ch < 97 || ch > 122;
};

/**
 * Tell whether or not the str does not start with an upper case ASCII char.
 * @private
 * @param {string} str the char to check
 * @return {boolean} true if the char is a not an upper case ASCII char
 */
Locale._notUpper = function(str) {
	// do this with ASCII only so we don't have to depend on the CType functions
	var ch = str.charCodeAt(0);
	return ch < 65 || ch > 90;
};

/**
 * Tell whether or not the str does not start with a digit char.
 * @private
 * @param {string} str the char to check
 * @return {boolean} true if the char is a not an upper case ASCII char
 */
Locale._notDigit = function(str) {
	// do this with ASCII only so we don't have to depend on the CType functions
	var ch = str.charCodeAt(0);
	return ch < 48 || ch > 57;
};

/**
 * Tell whether or not the given string has the correct syntax to be 
 * an ISO 639 language code.
 * 
 * @private
 * @param {string} str the string to parse
 * @return {boolean} true if the string could syntactically be a language code.
 */
Locale._isLanguageCode = function(str) {
	if (typeof(str) === 'undefined' || str.length < 2 || str.length > 3) {
		return false;
	}

	for (var i = 0; i < str.length; i++) {
		if (Locale._notLower(str.charAt(i))) {
			return false;
		}
	}
	
	return true;
};

/**
 * Tell whether or not the given string has the correct syntax to be 
 * an ISO 3166 2-letter region code or M.49 3-digit region code.
 * 
 * @private
 * @param {string} str the string to parse
 * @return {boolean} true if the string could syntactically be a language code.
 */
Locale._isRegionCode = function (str) {
	if (typeof(str) === 'undefined' || str.length < 2 || str.length > 3) {
		return false;
	}
	
	if (str.length === 2) {
		for (var i = 0; i < str.length; i++) {
			if (Locale._notUpper(str.charAt(i))) {
				return false;
			}
		}
	} else {
		for (var i = 0; i < str.length; i++) {
			if (Locale._notDigit(str.charAt(i))) {
				return false;
			}
		}
	}
	
	return true;
};

/**
 * Tell whether or not the given string has the correct syntax to be 
 * an ISO 639 language code.
 * 
 * @private
 * @param {string} str the string to parse
 * @return {boolean} true if the string could syntactically be a language code.
 */
Locale._isScriptCode = function(str) {
	if (typeof(str) === 'undefined' || str.length !== 4 || Locale._notUpper(str.charAt(0))) {
		return false;
	}
	
	for (var i = 1; i < 4; i++) {
		if (Locale._notLower(str.charAt(i))) {
			return false;
		}
	}
	
	return true;
};

/**
 * Return the ISO-3166 alpha3 equivalent region code for the given ISO 3166 alpha2
 * region code. If the given alpha2 code is not found, this function returns its
 * argument unchanged.
 * @static
 * @param {string|undefined} alpha2 the alpha2 code to map
 * @return {string|undefined} the alpha3 equivalent of the given alpha2 code, or the alpha2
 * parameter if the alpha2 value is not found
 */
Locale.regionAlpha2ToAlpha3 = function(alpha2) {
	return Locale.a2toa3regmap[alpha2] || alpha2;
};

/**
 * Return the ISO-639 alpha3 equivalent language code for the given ISO 639 alpha1
 * language code. If the given alpha1 code is not found, this function returns its
 * argument unchanged.
 * @static
 * @param {string|undefined} alpha1 the alpha1 code to map
 * @return {string|undefined} the alpha3 equivalent of the given alpha1 code, or the alpha1
 * parameter if the alpha1 value is not found
 */
Locale.languageAlpha1ToAlpha3 = function(alpha1) {
	return Locale.a1toa3langmap[alpha1] || alpha1;
};

Locale.prototype = {
	/**
	 * @private
	 */
	_genSpec: function () {
		this.spec = this.language || "";
		
		if (this.script) {
			if (this.spec.length > 0) {
				this.spec += "-";
			}
			this.spec += this.script;
		}
		
		if (this.region) {
			if (this.spec.length > 0) {
				this.spec += "-";
			}
			this.spec += this.region;
		}
		
		if (this.variant) {
			if (this.spec.length > 0) {
				this.spec += "-";
			}
			this.spec += this.variant;
		}
	},

	/**
	 * Return the ISO 639 language code for this locale. 
	 * @return {string|undefined} the language code for this locale 
	 */
	getLanguage: function() {
		return this.language;
	},
	
	/**
	 * Return the language of this locale as an ISO-639-alpha3 language code
	 * @return {string|undefined} the alpha3 language code of this locale
	 */
	getLanguageAlpha3: function() {
		return Locale.languageAlpha1ToAlpha3(this.language);
	},
	
	/**
	 * Return the ISO 3166 region code for this locale.
	 * @return {string|undefined} the region code of this locale
	 */
	getRegion: function() {
		return this.region;
	},
	
	/**
	 * Return the region of this locale as an ISO-3166-alpha3 region code
	 * @return {string|undefined} the alpha3 region code of this locale
	 */
	getRegionAlpha3: function() {
		return Locale.regionAlpha2ToAlpha3(this.region);
	},
	
	/**
	 * Return the ISO 15924 script code for this locale
	 * @return {string|undefined} the script code of this locale
	 */
	getScript: function () {
		return this.script;
	},
	
	/**
	 * Return the variant code for this locale
	 * @return {string|undefined} the variant code of this locale, if any
	 */
	getVariant: function() {
		return this.variant;
	},
	
	/**
	 * Return the whole locale specifier as a string.
	 * @return {string} the locale specifier
	 */
	getSpec: function() {
		return this.spec;
	},
	
	/**
	 * Express this locale object as a string. Currently, this simply calls the getSpec
	 * function to represent the locale as its specifier.
	 * 
	 * @return {string} the locale specifier
	 */
	toString: function() {
		return this.getSpec();
	},
	
	/**
	 * Return true if the the other locale is exactly equal to the current one.
	 * @return {boolean} whether or not the other locale is equal to the current one 
	 */
	equals: function(other) {
		return this.language === other.language &&
			this.region === other.region &&
			this.script === other.script &&
			this.variant === other.variant;
	},

	/**
	 * Return true if the current locale is the special pseudo locale.
	 * @return {boolean} true if the current locale is the special pseudo locale
	 */
	isPseudo: function () {
		return JSUtils.indexOf(ilib.pseudoLocales, this.spec) > -1;
	}
};

// static functions
/**
 * @private
 */
Locale.locales = [
	// !macro localelist
];

/**
 * Return the list of available locales that this iLib file supports.
 * If this copy of ilib is pre-assembled with locale data, then the 
 * list locales may be much smaller
 * than the list of all available locales in the iLib repository. The
 * assembly tool will automatically fill in the list for an assembled
 * copy of iLib. If this copy is being used with dynamically loaded 
 * data, then you 
 * can load any locale that iLib supports. You can form a locale with any 
 * combination of a language and region tags that exist in the locale
 * data directory. Language tags are in the root of the locale data dir,
 * and region tags can be found underneath the "und" directory. (The 
 * region tags are separated into a different dir because the region names 
 * conflict with language names on file systems that are case-insensitive.) 
 * If you have culled the locale data directory to limit the size of
 * your app, then this function should return only those files that actually exist
 * according to the ilibmanifest.json file in the root of that locale
 * data dir. Make sure your ilibmanifest.json file is up-to-date with
 * respect to the list of files that exist in the locale data dir.
 * 
 * @param {boolean} sync if false, load the list of available files from disk
 * asynchronously, otherwise load them synchronously. (Default: true/synchronously)
 * @param {Function} onLoad a callback function to call if asynchronous
 * load was requested and the list of files have been loaded.
 * @return {Array.<string>} this is an array of locale specs for which 
 * this iLib file has locale data for
 */
Locale.getAvailableLocales = function (sync, onLoad) {
	var locales = [];
	if (Locale.locales.length || typeof(ilib._load.listAvailableFiles) !== 'function') {
		locales = Locale.locales;
		if (onLoad && typeof(onLoad) === 'function') {
			onLoad(locales);
		}
	} else {
		if (typeof(sync) === 'undefined') {
			sync = true;
		}
		ilib._load.listAvailableFiles(sync, function(manifest) {
			if (manifest) {
				for (var dir in manifest) {
					var filelist = manifest[dir];
					for (var i = 0; i < filelist.length; i++) {
						if (filelist[i].length > 15 && filelist[i].substr(-15) === "localeinfo.json") {
							locales.push(filelist[i].substring(0,filelist[i].length-16).replace(/\//g, "-"));
						}
					}
				}
			}
			if (onLoad && typeof(onLoad) === 'function') {
				onLoad(locales);
			}
		});
	}
	return locales;
};

module.exports = Locale;

},{'./ilib.js':'enyo-ilib/ilib','./JSUtils.js':'enyo-ilib/JSUtils'}],'enyo-ilib/RataDie':[function (module,exports,global,require,request){
/*
 * ratadie.js - Represent the RD date number in the calendar
 * 
 * Copyright © 2014-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
ilib.js
JulianDay.js
MathUtils.js
JSUtils.js
*/

var ilib = require("./ilib.js");
var MathUtils = require("./MathUtils.js");
var JSUtils = require("./JSUtils.js");
var JulianDay = require("./JulianDay.js");

/**
 * @class
 * Construct a new RD date number object. The constructor parameters can 
 * contain any of the following properties:
 * 
 * <ul>
 * <li><i>unixtime<i> - sets the time of this instance according to the given 
 * unix time. Unix time is the number of milliseconds since midnight on Jan 1, 1970.
 * 
 * <li><i>julianday</i> - sets the time of this instance according to the given
 * Julian Day instance or the Julian Day given as a float
 * 
 * <li><i>cycle</i> - any integer giving the number of 60-year cycle in which the date is located.
 * If the cycle is not given but the year is, it is assumed that the year parameter is a fictitious 
 * linear count of years since the beginning of the epoch, much like other calendars. This linear
 * count is never used. If both the cycle and year are given, the year is wrapped to the range 0 
 * to 60 and treated as if it were a year in the regular 60-year cycle.
 * 
 * <li><i>year</i> - any integer, including 0
 * 
 * <li><i>month</i> - 1 to 12, where 1 means January, 2 means February, etc.
 * 
 * <li><i>day</i> - 1 to 31
 * 
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * 
 * <li><i>minute</i> - 0 to 59
 * 
 * <li><i>second</i> - 0 to 59
 * 
 * <li><i>millisecond</i> - 0 to 999
 * 
 * <li><i>parts</i> - 0 to 1079. Specify the halaqim parts of an hour. Either specify 
 * the parts or specify the minutes, seconds, and milliseconds, but not both. This is only used
 * in the Hebrew calendar. 
 * 
 * <li><i>minute</i> - 0 to 59
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 *
 * If the constructor is called with another date instance instead of
 * a parameter block, the other instance acts as a parameter block and its
 * settings are copied into the current instance.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above are present, then the RD is calculate based on 
 * the current date at the time of instantiation. <p>
 * 
 * If any of the properties from <i>year</i> through <i>millisecond</i> are not
 * specified in the params, it is assumed that they have the smallest possible
 * value in the range for the property (zero or one).<p>
 * 
 * 
 * @private
 * @constructor
 * @param {Object=} params parameters that govern the settings and behaviour of this RD date
 */
var RataDie = function(params) {
	if (params) {
		if (typeof(params.date) !== 'undefined') {
			// accept JS Date classes or strings
			var date = params.date;
			if (!(JSUtils.isDate(date))) {
				date = new Date(date); // maybe a string initializer?
			}
			this._setTime(date.getTime());
		} else if (typeof(params.unixtime) !== 'undefined') {
			this._setTime(parseInt(params.unixtime, 10));
		} else if (typeof(params.julianday) !== 'undefined') {
			// JD time is defined to be UTC
			this._setJulianDay(parseFloat(params.julianday));
		} else if (params.year || params.month || params.day || params.hour ||
				params.minute || params.second || params.millisecond || params.parts || params.cycle) {
			this._setDateComponents(params);
		} else if (typeof(params.rd) !== 'undefined') {
			this.rd = (typeof(params.rd) === 'object' && params.rd instanceof RataDie) ? params.rd.rd : params.rd;
		}
	}
	
	/**
	 * @type {number} the Rata Die number of this date for this calendar type
	 */
	if (typeof(this.rd) === 'undefined') {
		var now = new Date();
		this._setTime(now.getTime());
	}
};

/**
 * @private
 * @const
 * @type {number}
 */
RataDie.gregorianEpoch = 1721424.5;

RataDie.prototype = {
	/**
	 * @protected
	 * @const
	 * @type {number}
	 * the difference between a zero Julian day and the zero Gregorian date. 
	 */
	epoch: RataDie.gregorianEpoch,
	
	/**
	 * Set the RD of this instance according to the given unix time. Unix time is
	 * the number of milliseconds since midnight on Jan 1, 1970.
	 *
	 * @protected
	 * @param {number} millis the unix time to set this date to in milliseconds 
	 */
	_setTime: function(millis) {
		// 2440587.5 is the julian day of midnight Jan 1, 1970, UTC (Gregorian)
		this._setJulianDay(2440587.5 + millis / 86400000);
	},

	/**
	 * Set the date of this instance using a Julian Day.
	 * @protected
	 * @param {number} date the Julian Day to use to set this date
	 */
	_setJulianDay: function (date) {
		var jd = (typeof(date) === 'number') ? new JulianDay(date) : date;
		// round to the nearest millisecond
		this.rd = MathUtils.halfup((jd.getDate() - this.epoch) * 86400000) / 86400000;
	},

	/**
	 * Return the rd number of the particular day of the week on or before the 
	 * given rd. eg. The Sunday on or before the given rd.
	 * @protected
	 * @param {number} rd the rata die date of the reference date
	 * @param {number} dayOfWeek the day of the week that is being sought relative 
	 * to the current date
	 * @return {number} the rd of the day of the week
	 */
	_onOrBefore: function(rd, dayOfWeek) {
		return rd - MathUtils.mod(Math.floor(rd) - dayOfWeek - 2, 7);
	},
	
	/**
	 * Return the rd number of the particular day of the week on or before the current rd.
	 * eg. The Sunday on or before the current rd. If the offset is given, the calculation
	 * happens in wall time instead of UTC. UTC time may be a day before or day behind 
	 * wall time, so it it would give the wrong day of the week if this calculation was
	 * done in UTC time when the caller really wanted wall time. Even though the calculation
	 * may be done in wall time, the return value is nonetheless always given in UTC.
	 * @param {number} dayOfWeek the day of the week that is being sought relative 
	 * to the current date
	 * @param {number=} offset RD offset for the time zone. Zero is assumed if this param is
	 * not given
	 * @return {number} the rd of the day of the week
	 */
	onOrBefore: function(dayOfWeek, offset) {
		offset = offset || 0;
		return this._onOrBefore(this.rd + offset, dayOfWeek) - offset;
	},
	
	/**
	 * Return the rd number of the particular day of the week on or before the current rd.
	 * eg. The Sunday on or before the current rd. If the offset is given, the calculation
	 * happens in wall time instead of UTC. UTC time may be a day before or day behind 
	 * wall time, so it it would give the wrong day of the week if this calculation was
	 * done in UTC time when the caller really wanted wall time. Even though the calculation
	 * may be done in wall time, the return value is nonetheless always given in UTC.
	 * @param {number} dayOfWeek the day of the week that is being sought relative 
	 * to the reference date
	 * @param {number=} offset RD offset for the time zone. Zero is assumed if this param is
	 * not given
	 * @return {number} the day of the week
	 */
	onOrAfter: function(dayOfWeek, offset) {
		offset = offset || 0;
		return this._onOrBefore(this.rd+6+offset, dayOfWeek) - offset;
	},
	
	/**
	 * Return the rd number of the particular day of the week before the current rd.
	 * eg. The Sunday before the current rd. If the offset is given, the calculation
	 * happens in wall time instead of UTC. UTC time may be a day before or day behind 
	 * wall time, so it it would give the wrong day of the week if this calculation was
	 * done in UTC time when the caller really wanted wall time. Even though the calculation
	 * may be done in wall time, the return value is nonetheless always given in UTC.
	 * @param {number} dayOfWeek the day of the week that is being sought relative 
	 * to the reference date
	 * @param {number=} offset RD offset for the time zone. Zero is assumed if this param is
	 * not given
	 * @return {number} the day of the week
	 */
	before: function(dayOfWeek, offset) {
		offset = offset || 0;
		return this._onOrBefore(this.rd-1+offset, dayOfWeek) - offset;
	},
	
	/**
	 * Return the rd number of the particular day of the week after the current rd.
	 * eg. The Sunday after the current rd. If the offset is given, the calculation
	 * happens in wall time instead of UTC. UTC time may be a day before or day behind 
	 * wall time, so it it would give the wrong day of the week if this calculation was
	 * done in UTC time when the caller really wanted wall time. Even though the calculation
	 * may be done in wall time, the return value is nonetheless always given in UTC.
	 * @param {number} dayOfWeek the day of the week that is being sought relative 
	 * to the reference date
	 * @param {number=} offset RD offset for the time zone. Zero is assumed if this param is
	 * not given
	 * @return {number} the day of the week
	 */
	after: function(dayOfWeek, offset) {
		offset = offset || 0;
		return this._onOrBefore(this.rd+7+offset, dayOfWeek) - offset;
	},

	/**
	 * Return the unix time equivalent to this Gregorian date instance. Unix time is
	 * the number of milliseconds since midnight on Jan 1, 1970 UTC. This method only
	 * returns a valid number for dates between midnight, Jan 1, 1970 and  
	 * Jan 19, 2038 at 3:14:07am when the unix time runs out. If this instance 
	 * encodes a date outside of that range, this method will return -1.
	 * 
	 * @return {number} a number giving the unix time, or -1 if the date is outside the
	 * valid unix time range
	 */
	getTime: function() {
		// earlier than Jan 1, 1970
		// or later than Jan 19, 2038 at 3:14:07am
		var jd = this.getJulianDay();
		if (jd < 2440587.5 || jd > 2465442.634803241) { 
			return -1;
		}
	
		// avoid the rounding errors in the floating point math by only using
		// the whole days from the rd, and then calculating the milliseconds directly
		return Math.round((jd - 2440587.5) * 86400000);
	},

	/**
	 * Return the extended unix time equivalent to this Gregorian date instance. Unix time is
	 * the number of milliseconds since midnight on Jan 1, 1970 UTC. Traditionally unix time
	 * (or the type "time_t" in C/C++) is only encoded with a unsigned 32 bit integer, and thus 
	 * runs out on Jan 19, 2038. However, most Javascript engines encode numbers well above 
	 * 32 bits and the Date object allows you to encode up to 100 million days worth of time 
	 * after Jan 1, 1970, and even more interestingly 100 million days worth of time before
	 * Jan 1, 1970 as well. This method returns the number of milliseconds in that extended 
	 * range. If this instance encodes a date outside of that range, this method will return
	 * NaN.
	 * 
	 * @return {number} a number giving the extended unix time, or NaN if the date is outside 
	 * the valid extended unix time range
	 */
	getTimeExtended: function() {
		var jd = this.getJulianDay();
		
		// test if earlier than Jan 1, 1970 - 100 million days
		// or later than Jan 1, 1970 + 100 million days
		if (jd < -97559412.5 || jd > 102440587.5) { 
			return NaN;
		}
	
		// avoid the rounding errors in the floating point math by only using
		// the whole days from the rd, and then calculating the milliseconds directly
		return Math.round((jd - 2440587.5) * 86400000);
	},

	/**
	 * Return the Julian Day equivalent to this calendar date as a number.
	 * This returns the julian day in UTC.
	 * 
	 * @return {number} the julian date equivalent of this date
	 */
	getJulianDay: function() {
		return this.rd + this.epoch;
	},

	/**
	 * Return the Rata Die (fixed day) number of this RD date.
	 * 
	 * @return {number} the rd date as a number
	 */
	getRataDie: function() {
		return this.rd;
	}
};

module.exports = RataDie;
},{'./ilib.js':'enyo-ilib/ilib','./MathUtils.js':'enyo-ilib/MathUtils','./JSUtils.js':'enyo-ilib/JSUtils','./JulianDay.js':'enyo-ilib/JulianDay'}],'enyo-ilib/Utils':[function (module,exports,global,require,request){
/*
 * Utils.js - Core utility routines
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// !depends ilib.js Locale.js JSUtils.js

var ilib = require("./ilib.js");
var Locale = require("./Locale.js");
var JSUtils = require("./JSUtils.js");

var Utils = {};

/**
 * Find and merge all the locale data for a particular prefix in the given locale
 * and return it as a single javascript object. This merges the data in the 
 * correct order:
 * 
 * <ol>
 * <li>shared data (usually English)
 * <li>data for language
 * <li>data for language + region
 * <li>data for language + region + script
 * <li>data for language + region + script + variant
 * </ol>
 * 
 * It is okay for any of the above to be missing. This function will just skip the 
 * missing data. However, if everything except the shared data is missing, this 
 * function returns undefined, allowing the caller to go and dynamically load the
 * data instead.
 * 
 * @static
 * @param {string} prefix prefix under ilib.data of the data to merge
 * @param {Locale} locale locale of the data being sought
 * @param {boolean=} replaceArrays if true, replace the array elements in object1 with those in object2.
 * If false, concatenate array elements in object1 with items in object2.
 * @param {boolean=} returnOne if true, only return the most locale-specific data. If false,
 * merge all the relevant locale data together.
 * @return {Object?} the merged locale data
 */
Utils.mergeLocData = function (prefix, locale, replaceArrays, returnOne) {
	var data = undefined;
	var loc = locale || new Locale();
	var foundLocaleData = false;
	var property = prefix;
	var mostSpecific;

	data = ilib.data[prefix] || {};

	mostSpecific = data;

	if (loc.getLanguage()) {
		property = prefix + '_' + loc.getLanguage();
		if (ilib.data[property]) {
			foundLocaleData = true;
			data = JSUtils.merge(data, ilib.data[property], replaceArrays);
			mostSpecific = ilib.data[property];
		}
	}
	
	if (loc.getRegion()) {
		property = prefix + '_' + loc.getRegion();
		if (ilib.data[property]) {
			foundLocaleData = true;
			data = JSUtils.merge(data, ilib.data[property], replaceArrays);
			mostSpecific = ilib.data[property];
		}
	}
	
	if (loc.getLanguage()) {
		property = prefix + '_' + loc.getLanguage();
		
		if (loc.getScript()) {
			property = prefix + '_' + loc.getLanguage() + '_' + loc.getScript();
			if (ilib.data[property]) {
				foundLocaleData = true;
				data = JSUtils.merge(data, ilib.data[property], replaceArrays);
				mostSpecific = ilib.data[property];
			}
		}
		
		if (loc.getRegion()) {
			property = prefix + '_' + loc.getLanguage() + '_' + loc.getRegion();
			if (ilib.data[property]) {
				foundLocaleData = true;
				data = JSUtils.merge(data, ilib.data[property], replaceArrays);
				mostSpecific = ilib.data[property];
			}
		}		
	}
	
	if (loc.getRegion() && loc.getVariant()) {
		property = prefix + '_' + loc.getLanguage() + '_' + loc.getVariant();
		if (ilib.data[property]) {
			foundLocaleData = true;
			data = JSUtils.merge(data, ilib.data[property], replaceArrays);
			mostSpecific = ilib.data[property];
		}
	}

	if (loc.getLanguage() && loc.getScript() && loc.getRegion()) {
		property = prefix + '_' + loc.getLanguage() + '_' + loc.getScript() + '_' + loc.getRegion();
		if (ilib.data[property]) {
			foundLocaleData = true;
			data = JSUtils.merge(data, ilib.data[property], replaceArrays);
			mostSpecific = ilib.data[property];
		}
	}

	if (loc.getLanguage() && loc.getRegion() && loc.getVariant()) {
		property = prefix + '_' + loc.getLanguage() + '_' + loc.getRegion() + '_' + loc.getVariant();
		if (ilib.data[property]) {
			foundLocaleData = true;
			data = JSUtils.merge(data, ilib.data[property], replaceArrays);
			mostSpecific = ilib.data[property];
		}
	}

	if (loc.getLanguage() && loc.getScript() && loc.getRegion() && loc.getVariant()) {
		property = prefix + '_' + loc.getLanguage() + '_' + loc.getScript() + '_' + loc.getRegion() + '_' + loc.getVariant();
		if (ilib.data[property]) {
			foundLocaleData = true;
			data = JSUtils.merge(data, ilib.data[property], replaceArrays);
			mostSpecific = ilib.data[property];
		}
	}
	
	return foundLocaleData ? (returnOne ? mostSpecific : data) : undefined;
};

/**
 * Return an array of relative path names for the
 * files that represent the data for the given locale.<p>
 * 
 * Note that to prevent the situation where a directory for
 * a language exists next to the directory for a region where
 * the language code and region code differ only by case, the 
 * plain region directories are located under the special 
 * "undefined" language directory which has the ISO code "und".
 * The reason is that some platforms have case-insensitive 
 * file systems, and you cannot have 2 directories with the 
 * same name which only differ by case. For example, "es" is
 * the ISO 639 code for the language "Spanish" and "ES" is
 * the ISO 3166 code for the region "Spain", so both the
 * directories cannot exist underneath "locale". The region
 * therefore will be loaded from "und/ES" instead.<p>  
 * 
 * <h4>Variations</h4>
 * 
 * With only language and region specified, the following
 * sequence of paths will be generated:<p>
 * 
 * <pre>
 * language
 * und/region
 * language/region
 * </pre>
 * 
 * With only language and script specified:<p>
 * 
 * <pre>
 * language
 * language/script
 * </pre>
 * 
 * With only script and region specified:<p>
 * 
 * <pre>
 * und/region  
 * </pre>
 * 
 * With only region and variant specified:<p>
 * 
 * <pre>
 * und/region
 * region/variant
 * </pre>
 * 
 * With only language, script, and region specified:<p>
 * 
 * <pre>
 * language
 * und/region
 * language/script
 * language/region
 * language/script/region
 * </pre>
 * 
 * With only language, region, and variant specified:<p>
 * 
 * <pre>
 * language
 * und/region
 * language/region
 * region/variant
 * language/region/variant
 * </pre>
 * 
 * With all parts specified:<p>
 * 
 * <pre>
 * language
 * und/region
 * language/script
 * language/region
 * region/variant
 * language/script/region
 * language/region/variant
 * language/script/region/variant
 * </pre>
 * 
 * @static
 * @param {Locale} locale load the files for this locale
 * @param {string?} name the file name of each file to load without
 * any path
 * @return {Array.<string>} An array of relative path names
 * for the files that contain the locale data
 */
Utils.getLocFiles = function(locale, name) {
	var dir = "";
	var files = [];
	var filename = name || "resources.json";
	var loc = locale || new Locale();
	
	var language = loc.getLanguage();
	var region = loc.getRegion();
	var script = loc.getScript();
	var variant = loc.getVariant();
	
	files.push(filename); // generic shared file
	
	if (language) {
		dir = language + "/";
		files.push(dir + filename);
	}
	
	if (region) {
		dir = "und/" + region + "/";
		files.push(dir + filename);
	}
	
	if (language) {
		if (script) {
			dir = language + "/" + script + "/";
			files.push(dir + filename);
		}
		if (region) {
			dir = language + "/" + region + "/";
			files.push(dir + filename);
		}
	}
	
	if (region && variant) {
		dir = "und/" + region + "/" + variant + "/";
		files.push(dir + filename);
	}

	if (language && script && region) {
		dir = language + "/" + script + "/" + region + "/";
		files.push(dir + filename);
	}

	if (language && region && variant) {
		dir = language + "/" + region + "/" + variant + "/";
		files.push(dir + filename);
	}

	if (language && script && region && variant) {
		dir = language + "/" + script + "/" + region + "/" + variant + "/";
		files.push(dir + filename);
	}
	
	return files;
};

/**
 * Load data using the new loader object or via the old function callback.
 * @static
 * @private
 */
Utils._callLoadData = function (files, sync, params, callback) {
	// console.log("Utils._callLoadData called");
	if (typeof(ilib._load) === 'function') {
		// console.log("Utils._callLoadData: calling as a regular function");
		return ilib._load(files, sync, params, callback);
	} else if (typeof(ilib._load) === 'object' && typeof(ilib._load.loadFiles) === 'function') {
		// console.log("Utils._callLoadData: calling as an object");
		return ilib._load.loadFiles(files, sync, params, callback);
	}
	
	// console.log("Utils._callLoadData: not calling. Type is " + typeof(ilib._load) + " and instanceof says " + (ilib._load instanceof Loader));
	return undefined;
};

/**
 * Find locale data or load it in. If the data with the given name is preassembled, it will
 * find the data in ilib.data. If the data is not preassembled but there is a loader function,
 * this function will call it to load the data. Otherwise, the callback will be called with
 * undefined as the data. This function will create a cache under the given class object.
 * If data was successfully loaded, it will be set into the cache so that future access to 
 * the same data for the same locale is much quicker.<p>
 * 
 * The parameters can specify any of the following properties:<p>
 * 
 * <ul>
 * <li><i>name</i> - String. The name of the file being loaded. Default: ResBundle.json
 * <li><i>object</i> - Object. The class attempting to load data. The cache is stored inside of here.
 * <li><i>locale</i> - Locale. The locale for which data is loaded. Default is the current locale.
 * <li><i>nonlocale</i> - boolean. If true, the data being loaded is not locale-specific.
 * <li><i>type</i> - String. Type of file to load. This can be "json" or "other" type. Default: "json" 
 * <li><i>replace</i> - boolean. When merging json objects, this parameter controls whether to merge arrays
 * or have arrays replace each other. If true, arrays in child objects replace the arrays in parent 
 * objects. When false, the arrays in child objects are concatenated with the arrays in parent objects.  
 * <li><i>loadParams</i> - Object. An object with parameters to pass to the loader function
 * <li><i>sync</i> - boolean. Whether or not to load the data synchronously
 * <li><i>callback</i> - function(?)=. callback Call back function to call when the data is available.
 * Data is not returned from this method, so a callback function is mandatory.
 * </ul>
 * 
 * @static
 * @param {Object} params Parameters configuring how to load the files (see above)
 */
Utils.loadData = function(params) {
	var name = "resources.json",
		object = undefined, 
		locale = new Locale(ilib.getLocale()), 
		sync = false, 
		type = undefined,
		loadParams = {},
		callback = undefined,
		nonlocale = false,
		replace = false,
		basename;
	
	if (!params || typeof(params.callback) !== 'function') {
		return;
	}

	if (params.name) {
		name = params.name;
	}
	if (params.object) {
		object = params.object;
	}
	if (params.locale) {
		locale = (typeof(params.locale) === 'string') ? new Locale(params.locale) : params.locale;
	}			
	if (params.type) {
		type = params.type;
	}
	if (params.loadParams) {
		loadParams = params.loadParams;
	}
	if (params.sync) {
		sync = params.sync;
	}
	if (params.nonlocale) {
		nonlocale = !!params.nonlocale;
	}
	if (typeof(params.replace) === 'boolean') {
		replace = params.replace;
	}
	
	callback = params.callback;
	
	if (object && !object.cache) {
		object.cache = {};
	}
	
	if (!type) {
		var dot = name.lastIndexOf(".");
		type = (dot !== -1) ? name.substring(dot+1) : "text";
	}

	var spec = ((!nonlocale && locale.getSpec().replace(/-/g, '_')) || "root") + "," + name + "," + String(JSUtils.hashCode(loadParams));
	if (!object || typeof(object.cache[spec]) === 'undefined') {
		var data, returnOne = (loadParams && loadParams.returnOne);
		
		if (type === "json") {
			// console.log("type is json");
			basename = name.substring(0, name.lastIndexOf("."));
			if (nonlocale) {
				basename = basename.replace(/\//g, '.').replace(/[\\\+\-]/g, "_");
				data = ilib.data[basename];
			} else {
				data = Utils.mergeLocData(basename, locale, replace, returnOne);
			}
			if (data) {
				// console.log("found assembled data");
				if (object) {
					object.cache[spec] = data;
				}
				callback(data);
				return;
			}
		}
		
		// console.log("ilib._load is " + typeof(ilib._load));
		if (typeof(ilib._load) !== 'undefined') {
			// the data is not preassembled, so attempt to load it dynamically
			var files = nonlocale ? [ name || "resources.json" ] : Utils.getLocFiles(locale, name);
			if (type !== "json") {
				loadParams.returnOne = true;
			}
			
			Utils._callLoadData(files, sync, loadParams, ilib.bind(this, function(arr) {
				if (type === "json") {
					data = ilib.data[basename] || {};
					for (var i = 0; i < arr.length; i++) {
						if (typeof(arr[i]) !== 'undefined') {
							data = loadParams.returnOne ? arr[i] : JSUtils.merge(data, arr[i], replace);
						}
					}
					
					if (object) {
						object.cache[spec] = data;
					}
					callback(data);
				} else {
					var i = arr.length-1; 
					while (i > -1 && !arr[i]) {
						i--;
					}
					if (i > -1) {
						if (object) {
							object.cache[spec] = arr[i];
						}
						callback(arr[i]);
					} else {
						callback(undefined);
					}
				}
			}));
		} else {
			// no data other than the generic shared data
			if (type === "json") {
				data = ilib.data[basename];
			}
			if (object && data) {
				object.cache[spec] = data;
			}
			callback(data);
		}
	} else {
		callback(object.cache[spec]);
	}
};

module.exports = Utils;
},{'./ilib.js':'enyo-ilib/ilib','./Locale.js':'enyo-ilib/Locale','./JSUtils.js':'enyo-ilib/JSUtils'}],'enyo-ilib/HebrewRataDie':[function (module,exports,global,require,request){
/*
 * HebrewRataDie.js - Represent an RD date in the Hebrew calendar
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
MathUtils.js
HebrewCal.js
RataDie.js
*/

var HebrewCal = require("./HebrewCal.js");
var MathUtils = require("./MathUtils.js");
var RataDie = require("./RataDie.js");

/**
 * @class
 * Construct a new Hebrew RD date number object. The constructor parameters can 
 * contain any of the following properties:
 * 
 * <ul>
 * <li><i>unixtime<i> - sets the time of this instance according to the given 
 * unix time. Unix time is the number of milliseconds since midnight on Jan 1, 1970.
 * 
 * <li><i>julianday</i> - sets the time of this instance according to the given
 * Julian Day instance or the Julian Day given as a float
 * 
 * <li><i>year</i> - any integer, including 0
 * 
 * <li><i>month</i> - 1 to 12, where 1 means January, 2 means February, etc.
 * 
 * <li><i>day</i> - 1 to 31
 * 
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * 
 * <li><i>parts</i> - 0 to 1079. Specify the halaqim parts of an hour. Either specify 
 * the parts or specify the minutes, seconds, and milliseconds, but not both. 
 * 
 * <li><i>minute</i> - 0 to 59
 * 
 * <li><i>second</i> - 0 to 59
 * 
 * <li><i>millisecond</i> - 0 to 999
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 *
 * If the constructor is called with another Hebrew date instance instead of
 * a parameter block, the other instance acts as a parameter block and its
 * settings are copied into the current instance.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above are present, then the RD is calculate based on 
 * the current date at the time of instantiation. <p>
 * 
 * If any of the properties from <i>year</i> through <i>millisecond</i> are not
 * specified in the params, it is assumed that they have the smallest possible
 * value in the range for the property (zero or one).<p>
 * 
 * 
 * @private
 * @constructor
 * @extends RataDie
 * @param {Object=} params parameters that govern the settings and behaviour of this Hebrew RD date
 */
var HebrewRataDie = function(params) {
	this.cal = params && params.cal || new HebrewCal();
	this.rd = undefined;
	RataDie.call(this, params);
};

HebrewRataDie.prototype = new RataDie();
HebrewRataDie.prototype.parent = RataDie;
HebrewRataDie.prototype.constructor = HebrewRataDie;

/**
 * The difference between a zero Julian day and the first day of the Hebrew 
 * calendar: sunset on Monday, Tishri 1, 1 = September 7, 3760 BC Gregorian = JD 347997.25
 * @private
 * @const
 * @type number
 */
HebrewRataDie.prototype.epoch = 347997.25;

/**
 * the cumulative lengths of each month for a non-leap year, without new years corrections
 * @private
 * @const
 * @type Array.<number>
 */
HebrewRataDie.cumMonthLengths = [
	176,  /* Nisan */
	206,  /* Iyyar */
	235,  /* Sivan */
	265,  /* Tammuz */
	294,  /* Av */
	324,  /* Elul */
	0,    /* Tishri - Jewish New Year (Rosh HaShanah) starts in month 7 */
	30,   /* Heshvan */
	59,   /* Kislev */
	88,   /* Teveth */
	117,  /* Shevat */
	147   /* Adar I */
];

/**
 * the cumulative lengths of each month for a leap year, without new years corrections 
 * @private
 * @const
 * @type Array.<number>
 */
HebrewRataDie.cumMonthLengthsLeap = [
	206,  /* Nisan */
	236,  /* Iyyar */
	265,  /* Sivan */
	295,  /* Tammuz */
	324,  /* Av */
	354,  /* Elul */
	0,    /* Tishri - Jewish New Year (Rosh HaShanah) starts in month 7 */
	30,   /* Heshvan */
	59,   /* Kislev */
	88,   /* Teveth */
	117,  /* Shevat */
	147,  /* Adar I */
	177   /* Adar II */
];

/**
 * Calculate the Rata Die (fixed day) number of the given date from the
 * date components.
 * 
 * @private
 * @param {Object} date the date components to calculate the RD from
 */
HebrewRataDie.prototype._setDateComponents = function(date) {
	var elapsed = HebrewCal.elapsedDays(date.year);
	var days = elapsed +
		HebrewCal.newYearsCorrection(date.year, elapsed) +
		date.day - 1;
	var sum = 0, table;
	
	//console.log("getRataDie: converting " +  JSON.stringify(date));
	//console.log("getRataDie: days is " +  days);
	//console.log("getRataDie: new years correction is " +  HebrewCal.newYearsCorrection(date.year, elapsed));
	
	table = this.cal.isLeapYear(date.year) ? 
		HebrewRataDie.cumMonthLengthsLeap :
		HebrewRataDie.cumMonthLengths;
	sum = table[date.month-1];
	
	// gets cumulative without correction, so now add in the correction
	if ((date.month < 7 || date.month > 8) && HebrewCal.longHeshvan(date.year)) {
		sum++;
	}
	if ((date.month < 7 || date.month > 9) && HebrewCal.longKislev(date.year)) {
		sum++;
	}
	// console.log("getRataDie: cum days is now " +  sum);
	
	days += sum;
	
	// the date starts at sunset, which we take as 18:00, so the hours from
	// midnight to 18:00 are on the current Gregorian day, and the hours from
	// 18:00 to midnight are on the previous Gregorian day. So to calculate the 
	// number of hours into the current day that this time represents, we have
	// to count from 18:00 to midnight first, and add in 6 hours if the time is
	// less than 18:00
	var minute, second, millisecond;
	
	if (typeof(date.parts) !== 'undefined') {
		// The parts (halaqim) of the hour. This can be a number from 0 to 1079.
		var parts = parseInt(date.parts, 10);
		var seconds = parseInt(parts, 10) * 3.333333333333;
		minute = Math.floor(seconds / 60);
		seconds -= minute * 60;
		second = Math.floor(seconds);
		millisecond = (seconds - second);	
	} else {
		minute = parseInt(date.minute, 10) || 0;
		second = parseInt(date.second, 10) || 0;
		millisecond = parseInt(date.millisecond, 10) || 0;
	}
		
	var time;
	if (date.hour >= 18) {
		time = ((date.hour - 18 || 0) * 3600000 +
			(minute || 0) * 60000 +
			(second || 0) * 1000 +
			(millisecond || 0)) / 
			86400000;
	} else {
		time = 0.25 +	// 6 hours from 18:00 to midnight on the previous gregorian day
				((date.hour || 0) * 3600000 +
				(minute || 0) * 60000 +
				(second || 0) * 1000 +
				(millisecond || 0)) / 
				86400000;
	}
	
	//console.log("getRataDie: rd is " +  (days + time));
	this.rd = days + time;
};
	
/**
 * Return the rd number of the particular day of the week on or before the 
 * given rd. eg. The Sunday on or before the given rd.
 * @private
 * @param {number} rd the rata die date of the reference date
 * @param {number} dayOfWeek the day of the week that is being sought relative 
 * to the current date
 * @return {number} the rd of the day of the week
 */
HebrewRataDie.prototype._onOrBefore = function(rd, dayOfWeek) {
	return rd - MathUtils.mod(Math.floor(rd) - dayOfWeek + 1, 7);
};

module.exports = HebrewRataDie;

},{'./HebrewCal.js':'enyo-ilib/HebrewCal','./MathUtils.js':'enyo-ilib/MathUtils','./RataDie.js':'enyo-ilib/RataDie'}],'enyo-ilib/IslamicRataDie':[function (module,exports,global,require,request){
/*
 * IslamicRataDie.js - Represent an RD date in the Islamic calendar
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
IslamicCal.js
RataDie.js
*/

var RataDie = require("./RataDie.js");
var IslamicCal = require("./IslamicCal.js");

/**
 * @class
 * Construct a new Islamic RD date number object. The constructor parameters can 
 * contain any of the following properties:
 * 
 * <ul>
 * <li><i>unixtime<i> - sets the time of this instance according to the given 
 * unix time. Unix time is the number of milliseconds since midnight on Jan 1, 1970.
 * 
 * <li><i>julianday</i> - sets the time of this instance according to the given
 * Julian Day instance or the Julian Day given as a float
 * 
 * <li><i>year</i> - any integer, including 0
 * 
 * <li><i>month</i> - 1 to 12, where 1 means January, 2 means February, etc.
 * 
 * <li><i>day</i> - 1 to 31
 * 
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * 
 * <li><i>minute</i> - 0 to 59
 * 
 * <li><i>second</i> - 0 to 59
 * 
 * <li><i>millisecond</i> - 0 to 999
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 *
 * If the constructor is called with another Islamic date instance instead of
 * a parameter block, the other instance acts as a parameter block and its
 * settings are copied into the current instance.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above are present, then the RD is calculate based on 
 * the current date at the time of instantiation. <p>
 * 
 * If any of the properties from <i>year</i> through <i>millisecond</i> are not
 * specified in the params, it is assumed that they have the smallest possible
 * value in the range for the property (zero or one).<p>
 * 
 * 
 * @private
 * @constructor
 * @extends RataDie
 * @param {Object=} params parameters that govern the settings and behaviour of this Islamic RD date
 */
var IslamicRataDie = function(params) {
	this.cal = params && params.cal || new IslamicCal();
	this.rd = undefined;
	RataDie.call(this, params);
};

IslamicRataDie.prototype = new RataDie();
IslamicRataDie.prototype.parent = RataDie;
IslamicRataDie.prototype.constructor = IslamicRataDie;

/**
 * The difference between a zero Julian day and the first Islamic date
 * of Friday, July 16, 622 CE Julian. 
 * @private
 * @const
 * @type number
 */
IslamicRataDie.prototype.epoch = 1948439.5;

/**
 * Calculate the Rata Die (fixed day) number of the given date from the
 * date components.
 *
 * @protected
 * @param {Object} date the date components to calculate the RD from
 */
IslamicRataDie.prototype._setDateComponents = function(date) {
	var days = (date.year - 1) * 354 +
		Math.ceil(29.5 * (date.month - 1)) +
		date.day +
		Math.floor((3 + 11 * date.year) / 30) - 1;
	var time = (date.hour * 3600000 +
		date.minute * 60000 +
		date.second * 1000 +
		date.millisecond) / 
		86400000; 
	
	//console.log("getRataDie: converting " +  JSON.stringify(date));
	//console.log("getRataDie: days is " +  days);
	//console.log("getRataDie: time is " +  time);
	//console.log("getRataDie: rd is " +  (days + time));

	this.rd = days + time;
};
	
module.exports = IslamicRataDie;
},{'./RataDie.js':'enyo-ilib/RataDie','./IslamicCal.js':'enyo-ilib/IslamicCal'}],'enyo-ilib/JulianRataDie':[function (module,exports,global,require,request){
/*
 * julianDate.js - Represent a date in the Julian calendar
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
JulianCal.js 
RataDie.js
*/

var RataDie = require("./RataDie.js");
var JulianCal = require("./JulianCal.js");

/**
 * @class
 * Construct a new Julian RD date number object. The constructor parameters can 
 * contain any of the following properties:
 * 
 * <ul>
 * <li><i>unixtime<i> - sets the time of this instance according to the given 
 * unix time. Unix time is the number of milliseconds since midnight on Jan 1, 1970.
 * 
 * <li><i>julianday</i> - sets the time of this instance according to the given
 * Julian Day instance or the Julian Day given as a float
 * 
 * <li><i>year</i> - any integer, including 0
 * 
 * <li><i>month</i> - 1 to 12, where 1 means January, 2 means February, etc.
 * 
 * <li><i>day</i> - 1 to 31
 * 
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * 
 * <li><i>minute</i> - 0 to 59
 * 
 * <li><i>second</i> - 0 to 59
 * 
 * <li><i>millisecond</i> - 0 to 999
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 *
 * If the constructor is called with another Julian date instance instead of
 * a parameter block, the other instance acts as a parameter block and its
 * settings are copied into the current instance.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above are present, then the RD is calculate based on 
 * the current date at the time of instantiation. <p>
 * 
 * If any of the properties from <i>year</i> through <i>millisecond</i> are not
 * specified in the params, it is assumed that they have the smallest possible
 * value in the range for the property (zero or one).<p>
 * 
 * 
 * @private
 * @constructor
 * @extends RataDie
 * @param {Object=} params parameters that govern the settings and behaviour of this Julian RD date
 */
var JulianRataDie = function(params) {
	this.cal = params && params.cal || new JulianCal();
	this.rd = undefined;
	RataDie.call(this, params);
};

JulianRataDie.prototype = new RataDie();
JulianRataDie.prototype.parent = RataDie;
JulianRataDie.prototype.constructor = JulianRataDie;

/**
 * The difference between a zero Julian day and the first Julian date
 * of Friday, July 16, 622 CE Julian. 
 * @private
 * @const
 * @type number
 */
JulianRataDie.prototype.epoch = 1721422.5;

/**
 * Calculate the Rata Die (fixed day) number of the given date from the
 * date components.
 * 
 * @protected
 * @param {Object} date the date components to calculate the RD from
 */
JulianRataDie.prototype._setDateComponents = function(date) {
	var year = date.year + ((date.year < 0) ? 1 : 0);
	var years = 365 * (year - 1) + Math.floor((year-1)/4);
	var dayInYear = (date.month > 1 ? JulianCal.cumMonthLengths[date.month-1] : 0) +
		date.day +
		(this.cal.isLeapYear(date.year) && date.month > 2 ? 1 : 0);
	var rdtime = (date.hour * 3600000 +
		date.minute * 60000 +
		date.second * 1000 +
		date.millisecond) / 
		86400000;
	
	/*
	console.log("calcRataDie: converting " +  JSON.stringify(parts));
	console.log("getRataDie: year is " +  years);
	console.log("getRataDie: day in year is " +  dayInYear);
	console.log("getRataDie: rdtime is " +  rdtime);
	console.log("getRataDie: rd is " +  (years + dayInYear + rdtime));
	*/
	
	this.rd = years + dayInYear + rdtime;
};

module.exports = JulianRataDie;
},{'./RataDie.js':'enyo-ilib/RataDie','./JulianCal.js':'enyo-ilib/JulianCal'}],'enyo-ilib/PersAlgoRataDie':[function (module,exports,global,require,request){
/*
 * PersAlsoRataDie.js - Represent an RD date in the Persian algorithmic calendar
 * 
 * Copyright © 2014-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
PersianAlgoCal.js 
MathUtils.js
RataDie.js
*/

var MathUtils = require("./MathUtils.js");
var PersianAlgoCal = require("./PersianAlgoCal.js");
var RataDie = require("./RataDie.js");

/**
 * @class
 * Construct a new Persian RD date number object. The constructor parameters can 
 * contain any of the following properties:
 * 
 * <ul>
 * <li><i>unixtime<i> - sets the time of this instance according to the given 
 * unix time. Unix time is the number of milliseconds since midnight on Jan 1, 1970, Gregorian
 * 
 * <li><i>julianday</i> - sets the time of this instance according to the given
 * Julian Day instance or the Julian Day given as a float
 * 
 * <li><i>year</i> - any integer, including 0
 * 
 * <li><i>month</i> - 1 to 12, where 1 means Farvardin, 2 means Ordibehesht, etc.
 * 
 * <li><i>day</i> - 1 to 31
 * 
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * 
 * <li><i>minute</i> - 0 to 59
 * 
 * <li><i>second</i> - 0 to 59
 * 
 * <li><i>millisecond</i> - 0 to 999
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 *
 * If the constructor is called with another Persian date instance instead of
 * a parameter block, the other instance acts as a parameter block and its
 * settings are copied into the current instance.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above are present, then the RD is calculate based on 
 * the current date at the time of instantiation. <p>
 * 
 * If any of the properties from <i>year</i> through <i>millisecond</i> are not
 * specified in the params, it is assumed that they have the smallest possible
 * value in the range for the property (zero or one).<p>
 * 
 * 
 * @private
 * @constructor
 * @extends RataDie
 * @param {Object=} params parameters that govern the settings and behaviour of this Persian RD date
 */
var PersAlgoRataDie = function(params) {
	this.cal = params && params.cal || new PersianAlgoCal();
	this.rd = undefined;
	RataDie.call(this, params);
};

PersAlgoRataDie.prototype = new RataDie();
PersAlgoRataDie.prototype.parent = RataDie;
PersAlgoRataDie.prototype.constructor = PersAlgoRataDie;

/**
 * The difference between a zero Julian day and the first Persian date
 * @private
 * @const
 * @type number
 */
PersAlgoRataDie.prototype.epoch = 1948319.5;

/**
 * @private
 * @const
 * @type Array.<number>
 * the cumulative lengths of each month, for a non-leap year 
 */
PersAlgoRataDie.cumMonthLengths = [
    0,    // Farvardin
	31,   // Ordibehesht
	62,   // Khordad
	93,   // Tir
	124,  // Mordad
	155,  // Shahrivar
	186,  // Mehr
	216,  // Aban
	246,  // Azar
	276,  // Dey
	306,  // Bahman
	336,  // Esfand
	365
];

/**
 * Calculate the Rata Die (fixed day) number of the given date from the
 * date components.
 *
 * @protected
 * @param {Object} date the date components to calculate the RD from
 */
PersAlgoRataDie.prototype._setDateComponents = function(date) {
	var year = this.cal.equivalentCycleYear(date.year);
	var y = date.year - (date.year >= 0 ? 474 : 473);
	var rdOfYears = 1029983 * Math.floor(y/2820) + 365 * (year - 1) + Math.floor((682 * year - 110) / 2816);
	var dayInYear = (date.month > 1 ? PersAlgoRataDie.cumMonthLengths[date.month-1] : 0) + date.day;
	var rdtime = (date.hour * 3600000 +
		date.minute * 60000 +
		date.second * 1000 +
		date.millisecond) /
		86400000;
	
	/*
	// console.log("getRataDie: converting " +  JSON.stringify(this));
	console.log("getRataDie: year is " +  year);
	console.log("getRataDie: rd of years is " +  rdOfYears);
	console.log("getRataDie: day in year is " +  dayInYear);
	console.log("getRataDie: rdtime is " +  rdtime);
	console.log("getRataDie: rd is " +  (rdOfYears + dayInYear + rdtime));
	*/
	
	this.rd = rdOfYears + dayInYear + rdtime;
};

/**
 * Return the rd number of the particular day of the week on or before the 
 * given rd. eg. The Sunday on or before the given rd.
 * @private
 * @param {number} rd the rata die date of the reference date
 * @param {number} dayOfWeek the day of the week that is being sought relative 
 * to the current date
 * @return {number} the rd of the day of the week
 */
PersAlgoRataDie.prototype._onOrBefore = function(rd, dayOfWeek) {
	return rd - MathUtils.mod(Math.floor(rd) - dayOfWeek - 3, 7);
};

module.exports = PersAlgoRataDie;
},{'./MathUtils.js':'enyo-ilib/MathUtils','./PersianAlgoCal.js':'enyo-ilib/PersianAlgoCal','./RataDie.js':'enyo-ilib/RataDie'}],'enyo-ilib/LocaleInfo':[function (module,exports,global,require,request){
/*
 * LocaleInfo.js - Encode locale-specific defaults
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// !depends ilib.js Locale.js Utils.js

// !data localeinfo

var ilib = require("./ilib.js");
var Utils = require("./Utils.js");
var Locale = require("./Locale.js");

/**
 * @class
 * Create a new locale info instance. Locale info instances give information about
 * the default settings for a particular locale. These settings may be overridden
 * by various parts of the code, and should be used as a fall-back setting of last
 * resort. <p>
 * 
 * The optional options object holds extra parameters if they are necessary. The
 * current list of supported options are:
 * 
 * <ul>
 * <li><i>onLoad</i> - a callback function to call when the locale info object is fully 
 * loaded. When the onLoad option is given, the localeinfo object will attempt to
 * load any missing locale data using the ilib loader callback.
 * When the constructor is done (even if the data is already preassembled), the 
 * onLoad function is called with the current instance as a parameter, so this
 * callback can be used with preassembled or dynamic loading or a mix of the two.
 * 
 * <li><i>sync</i> - tell whether to load any missing locale data synchronously or 
 * asynchronously. If this option is given as "false", then the "onLoad"
 * callback must be given, as the instance returned from this constructor will
 * not be usable for a while. 
 *
 * <li><i>loadParams</i> - an object containing parameters to pass to the 
 * loader callback function when locale data is missing. The parameters are not
 * interpretted or modified in any way. They are simply passed along. The object 
 * may contain any property/value pairs as long as the calling code is in
 * agreement with the loader callback function as to what those parameters mean.
 * </ul>
 * 
 * If this copy of ilib is pre-assembled and all the data is already available, 
 * or if the data was already previously loaded, then this constructor will call
 * the onLoad callback immediately when the initialization is done. 
 * If the onLoad option is not given, this class will only attempt to load any
 * missing locale data synchronously.
 * 
 * 
 * @constructor
 * @see {ilib.setLoaderCallback} for information about registering a loader callback
 * function
 * @param {Locale|string=} locale the locale for which the info is sought, or undefined for
 * @param {Object=} options the locale for which the info is sought, or undefined for
 * the current locale
 */
var LocaleInfo = function(locale, options) {
	var sync = true,
	    loadParams = undefined;
	
	/* these are all the defaults. Essentially, en-US */
	/**
	  @private 
	  @type {{
		scripts:Array.<string>,
		timezone:string,
		units:string,
		calendar:string,
		clock:string,
		currency:string,
		firstDayOfWeek:number,
		weekendStart:number,
		weekendEnd:number,
		meridiems:string,
		unitfmt: {long:string,short:string},
		numfmt:Object.<{
			currencyFormats:Object.<{common:string,commonNegative:string,iso:string,isoNegative:string}>,
			script:string,
			decimalChar:string,
			groupChar:string,
			prigroupSize:number,
			secgroupSize:number,
			negativenumFmt:string,
			pctFmt:string,
			negativepctFmt:string,
			pctChar:string,
			roundingMode:string,
			exponential:string,
			digits:string
		}>
	  }}
	*/
	this.info = LocaleInfo.defaultInfo;
	
	switch (typeof(locale)) {
		case "string":
			this.locale = new Locale(locale);
			break;
		default:
		case "undefined":
			this.locale = new Locale();
			break;
		case "object":
			this.locale = locale;
			break;
	}
	
	if (options) {
		if (typeof(options.sync) !== 'undefined') {
			sync = (options.sync == true);
		}
		
		if (typeof(options.loadParams) !== 'undefined') {
			loadParams = options.loadParams;
		}
	}

	if (!LocaleInfo.cache) {
		LocaleInfo.cache = {};
	}

	Utils.loadData({
		object: LocaleInfo, 
		locale: this.locale, 
		name: "localeinfo.json", 
		sync: sync, 
		loadParams: loadParams, 
		callback: ilib.bind(this, function (info) {
			if (!info) {
				info = LocaleInfo.defaultInfo;
				var spec = this.locale.getSpec().replace(/-/g, "_");
				LocaleInfo.cache[spec] = info;
			}
			this.info = info;
			if (options && typeof(options.onLoad) === 'function') {
				options.onLoad(this);
			}
		})
	});
};

LocaleInfo.defaultInfo = /** @type {{
	scripts:Array.<string>,
	timezone:string,
	units:string,
	calendar:string,
	clock:string,
	currency:string,
	firstDayOfWeek:number,
	weekendStart:number,
	weekendEnd:number,
	meridiems:string,
	unitfmt: {long:string,short:string},
	numfmt:Object.<{
		currencyFormats:Object.<{
			common:string,
			commonNegative:string,
			iso:string,
			isoNegative:string
		}>,
		script:string,
		decimalChar:string,
		groupChar:string,
		prigroupSize:number,
		secgroupSize:number,
		negativenumFmt:string,
		pctFmt:string,
		negativepctFmt:string,
		pctChar:string,
		roundingMode:string,
		exponential:string,
		digits:string
	}>
}}*/ ilib.data.localeinfo;
LocaleInfo.defaultInfo = LocaleInfo.defaultInfo || {
	"scripts": ["Latn"],
    "timezone": "Etc/UTC",
    "units": "metric",
    "calendar": "gregorian",
    "clock": "24",
    "currency": "USD",
    "firstDayOfWeek": 1,
    "meridiems": "gregorian",
    "numfmt": {
        "currencyFormats": {
            "common": "{s}{n}",
            "commonNegative": "{s}-{n}",
            "iso": "{s}{n}",
            "isoNegative": "{s}-{n}"
        },
        "script": "Latn",
        "decimalChar": ",",
        "groupChar": ".",
        "prigroupSize": 3,
        "secgroupSize": 0,
        "pctFmt": "{n}%",
        "negativepctFmt": "-{n}%",
        "pctChar": "%",
        "roundingMode": "halfdown",
        "exponential": "e",
        "digits": ""
    }
};

LocaleInfo.prototype = {
    /**
     * Return the name of the locale's language in English.
     * @returns {string} the name of the locale's language in English
     */
    getLanguageName: function () {
    	return this.info["language.name"];	
    },
    
    /**
     * Return the name of the locale's region in English. If the locale
     * has no region, this returns undefined.
     * 
     * @returns {string|undefined} the name of the locale's region in English
     */
    getRegionName: function () {
    	return this.info["region.name"];	
    },

    /**
	 * Return whether this locale commonly uses the 12- or the 24-hour clock.
	 *  
	 * @returns {string} "12" if the locale commonly uses a 12-hour clock, or "24"
	 * if the locale commonly uses a 24-hour clock. 
	 */
	getClock: function() {
		return this.info.clock;
	},

	/**
	 * Return the locale that this info object was created with.
	 * @returns {Locale} The locale spec of the locale used to construct this info instance
	 */
	getLocale: function () {
		return this.locale;
	},
	
	/**
	 * Return the name of the measuring system that is commonly used in the given locale.
	 * Valid values are "uscustomary", "imperial", and "metric".
	 * 
	 * @returns {string} The name of the measuring system commonly used in the locale
	 */
	getUnits: function () {
		return this.info.units;
	},
        
        getUnitFormat: function () {
                return this.info.unitfmt;
        },
	
	/**
	 * Return the name of the calendar that is commonly used in the given locale.
	 * 
	 * @returns {string} The name of the calendar commonly used in the locale
	 */
	getCalendar: function () {
		return this.info.calendar;
	},
	
	/**
	 * Return the day of week that starts weeks in the current locale. Days are still
	 * numbered the standard way with 0 for Sunday through 6 for Saturday, but calendars 
	 * should be displayed and weeks calculated with the day of week returned from this 
	 * function as the first day of the week.
	 * 
	 * @returns {number} the day of the week that starts weeks in the current locale.
	 */
	getFirstDayOfWeek: function () {
		return this.info.firstDayOfWeek;
	},
	
	/**
	 * Return the day of week that starts weekend in the current locale. Days are still
	 * numbered the standard way with 0 for Sunday through 6 for Saturday.
	 * 
	 * @returns {number} the day of the week that starts weeks in the current locale.
	 */
	getWeekEndStart: function () {
		return this.info.weekendStart;
	},

	/**
	 * Return the day of week that starts weekend in the current locale. Days are still
	 * numbered the standard way with 0 for Sunday through 6 for Saturday.
	 * 
	 * @returns {number} the day of the week that starts weeks in the current locale.
	 */
	getWeekEndEnd: function () {
		return this.info.weekendEnd;
	},

	/**
	 * Return the default time zone for this locale. Many locales span across multiple
	 * time zones. In this case, the time zone with the largest population is chosen
	 * to represent the locale. This is obviously not that accurate, but then again,
	 * this method's return value should only be used as a default anyways.
	 * @returns {string} the default time zone for this locale.
	 */
	getTimeZone: function () {
		return this.info.timezone;
	},
	
	/**
	 * Return the decimal separator for formatted numbers in this locale.
	 * @returns {string} the decimal separator char
	 */
	getDecimalSeparator: function () {
		return this.info.numfmt.decimalChar;
	},
	
	/**
	 * Return the decimal separator for formatted numbers in this locale for native script.
	 * @returns {string} the decimal separator char
	 */
	getNativeDecimalSeparator: function () {
		return (this.info.native_numfmt && this.info.native_numfmt.decimalChar) || this.info.numfmt.decimalChar;
	},
	
	/**
	 * Return the separator character used to separate groups of digits on the 
	 * integer side of the decimal character.
	 * @returns {string} the grouping separator char
	 */
	getGroupingSeparator: function () {
		return this.info.numfmt.groupChar;
	},

	/**
	 * Return the separator character used to separate groups of digits on the 
	 * integer side of the decimal character for the native script if present other than the default script.
	 * @returns {string} the grouping separator char
	 */
	getNativeGroupingSeparator: function () {
		return (this.info.native_numfmt && this.info.native_numfmt.groupChar) || this.info.numfmt.groupChar;
	},
	
	/**
	 * Return the minimum number of digits grouped together on the integer side 
	 * for the first (primary) group. 
	 * In western European cultures, groupings are in 1000s, so the number of digits
	 * is 3. 
	 * @returns {number} the number of digits in a primary grouping, or 0 for no grouping
	 */
	getPrimaryGroupingDigits: function () {
		return (typeof(this.info.numfmt.prigroupSize) !== 'undefined' && this.info.numfmt.prigroupSize) || 0;
	},

	/**
	 * Return the minimum number of digits grouped together on the integer side
	 * for the second or more (secondary) group.<p>
	 *   
	 * In western European cultures, all groupings are by 1000s, so the secondary
	 * size should be 0 because there is no secondary size. In general, if this 
	 * method returns 0, then all groupings are of the primary size.<p> 
	 * 
	 * For some other cultures, the first grouping (primary)
	 * is 3 and any subsequent groupings (secondary) are two. So, 100000 would be
	 * written as: "1,00,000".
	 * 
	 * @returns {number} the number of digits in a secondary grouping, or 0 for no 
	 * secondary grouping. 
	 */
	getSecondaryGroupingDigits: function () {
		return this.info.numfmt.secgroupSize || 0;
	},

	/**
	 * Return the format template used to format percentages in this locale.
	 * @returns {string} the format template for formatting percentages
	 */
	getPercentageFormat: function () {
		return this.info.numfmt.pctFmt;
	},

	/**
	 * Return the format template used to format percentages in this locale
	 * with negative amounts.
	 * @returns {string} the format template for formatting percentages
	 */
	getNegativePercentageFormat: function () {
		return this.info.numfmt.negativepctFmt;
	},

	/**
	 * Return the symbol used for percentages in this locale.
	 * @returns {string} the symbol used for percentages in this locale
	 */
	getPercentageSymbol: function () {
		return this.info.numfmt.pctChar || "%";
	},

	/**
	 * Return the symbol used for exponential in this locale.
	 * @returns {string} the symbol used for exponential in this locale
	 */
	getExponential: function () {
		return this.info.numfmt.exponential;
	},

	/**
	 * Return the symbol used for exponential in this locale for native script.
	 * @returns {string} the symbol used for exponential in this locale for native script
	 */
	getNativeExponential: function () {
		return (this.info.native_numfmt && this.info.native_numfmt.exponential) || this.info.numfmt.exponential;
	},

	/**
	 * Return the symbol used for percentages in this locale for native script.
	 * @returns {string} the symbol used for percentages in this locale for native script
	 */
	getNativePercentageSymbol: function () {
		return (this.info.native_numfmt && this.info.native_numfmt.pctChar) || this.info.numfmt.pctChar || "%";
	
	},
	/**
	 * Return the format template used to format negative numbers in this locale.
	 * @returns {string} the format template for formatting negative numbers
	 */
	getNegativeNumberFormat: function () { 
		return this.info.numfmt.negativenumFmt;
	},
	
	/**
	 * Return an object containing the format templates for formatting currencies
	 * in this locale. The object has a number of properties in it that each are
	 * a particular style of format. Normally, this contains a "common" and an "iso"
	 * style, but may contain others in the future.
	 * @returns {Object} an object containing the format templates for currencies
	 */
	getCurrencyFormats: function () {
		return this.info.numfmt.currencyFormats;
	},
	
	/**
	 * Return the currency that is legal in the locale, or which is most commonly 
	 * used in regular commerce.
	 * @returns {string} the ISO 4217 code for the currency of this locale
	 */
	getCurrency: function () {
		return this.info.currency;
	},
	
	/**
	 * Return a string that describes the style of digits used by this locale.
	 * Possible return values are:
	 * <ul>
	 * <li><i>western</i> - uses the regular western 10-based digits 0 through 9
	 * <li><i>optional</i> - native 10-based digits exist, but in modern usage,
	 * this locale most often uses western digits
	 * <li><i>native</i> - native 10-based native digits exist and are used
	 * regularly by this locale
	 * <li><i>custom</i> - uses native digits by default that are not 10-based
	 * </ul>
	 * @returns {string} string that describes the style of digits used in this locale
	 */
	getDigitsStyle: function () {
		if (this.info.numfmt.useNative) {
			return "native";
		}
		if (typeof(this.info.native_numfmt) !== 'undefined') {
			return "optional";
		}
		return "western";
	},
	
	/**
	 * Return the digits of the default script if they are defined.
	 * If not defined, the default should be the regular "Arabic numerals"
	 * used in the Latin script. (0-9)
	 * @returns {string|undefined} the digits used in the default script 
	 */
	getDigits: function () {
		return this.info.numfmt.digits;
	},
	
	/**
	 * Return the digits of the native script if they are defined. 
	 * @returns {string|undefined} the digits used in the default script 
	 */
	getNativeDigits: function () {
		return (this.info.numfmt.useNative && this.info.numfmt.digits) || (this.info.native_numfmt && this.info.native_numfmt.digits);
	},
	
	/**
	 * If this locale typically uses a different type of rounding for numeric
	 * formatting other than halfdown, especially for currency, then it can be 
	 * specified in the localeinfo. If the locale uses the default, then this 
	 * method returns undefined. The locale's rounding method overrides the 
	 * rounding method for the currency itself, which can sometimes shared 
	 * between various locales so it is less specific.
	 * @returns {string} the name of the rounding mode typically used in this
	 * locale, or "halfdown" if the locale does not override the default
	 */
	getRoundingMode: function () {
		return this.info.numfmt.roundingMode;
	},
	
	/**
	 * Return the default script used to write text in the language of this 
	 * locale. Text for most languages is written in only one script, but there
	 * are some languages where the text can be written in a number of scripts,
	 * depending on a variety of things such as the region, ethnicity, religion, 
	 * etc. of the author. This method returns the default script for the
	 * locale, in which the language is most commonly written.<p> 
	 * 
	 * The script is returned as an ISO 15924 4-letter code.
	 * 
	 * @returns {string} the ISO 15924 code for the default script used to write
	 * text in this locale 
	 */
	getDefaultScript: function() {
		return (this.info.scripts) ? this.info.scripts[0] : "Latn";
	},
	
	/**
	 * Return the script used for the current locale. If the current locale
	 * explicitly defines a script, then this script is returned. If not, then 
	 * the default script for the locale is returned.
	 * 
	 * @see LocaleInfo.getDefaultScript
	 * @returns {string} the ISO 15924 code for the script used to write
	 * text in this locale
	 */
	getScript: function() {
		return this.locale.getScript() || this.getDefaultScript(); 
	},
	
	/**
	 * Return an array of script codes which are used to write text in the current
	 * language. Text for most languages is written in only one script, but there
	 * are some languages where the text can be written in a number of scripts,
	 * depending on a variety of things such as the region, ethnicity, religion, 
	 * etc. of the author. This method returns an array of script codes in which 
	 * the language is commonly written.
	 * 
	 * @returns {Array.<string>} an array of ISO 15924 codes for the scripts used 
	 * to write text in this language
	 */
	getAllScripts: function() {
		return this.info.scripts || ["Latn"];
	},
	
	/**
	 * Return the default style of meridiems used in this locale. Meridiems are 
	 * times of day like AM/PM. In a few locales with some calendars, for example
	 * Amharic/Ethiopia using the Ethiopic calendar, the times of day may be
	 * split into different segments than simple AM/PM as in the Gregorian 
	 * calendar. Only a few locales are like that. For most locales, formatting 
	 * a Gregorian date will use the regular Gregorian AM/PM meridiems.
	 *  
	 * @returns {string} the default meridiems style used in this locale. Possible
	 * values are "gregorian", "chinese", and "ethiopic"
	 */
	getMeridiemsStyle: function () {
		return this.info.meridiems || "gregorian";
	}	
};

module.exports = LocaleInfo;

},{'./ilib.js':'enyo-ilib/ilib','./Utils.js':'enyo-ilib/Utils','./Locale.js':'enyo-ilib/Locale'}],'enyo-ilib/IString':[function (module,exports,global,require,request){
/*
 * IString.js - ilib string subclass definition
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// !depends ilib.js Utils.js Locale.js MathUtils.js

// !data plurals

var ilib = require("./ilib.js");
var Utils = require("./Utils.js");
var MathUtils = require("./MathUtils.js");
var Locale = require("./Locale.js");

/**
 * @class
 * Create a new ilib string instance. This string inherits from and
 * extends the Javascript String class. It can be
 * used almost anywhere that a normal Javascript string is used, though in
 * some instances you will need to call the {@link #toString} method when
 * a built-in Javascript string is needed. The formatting methods are 
 * methods that are not in the intrinsic String class and are most useful
 * when localizing strings in an app or web site in combination with 
 * the ResBundle class.<p>
 * 
 * This class is named IString ("ilib string") so as not to conflict with the 
 * built-in Javascript String class.
 * 
 * @constructor
 * @param {string|IString=} string initialize this instance with this string 
 */
var IString = function (string) {
	if (typeof(string) === 'object') {
		if (string instanceof IString) {
			this.str = string.str;	
		} else {
			this.str = string.toString();
		}
	} else if (typeof(string) === 'string') {
		this.str = new String(string);
	} else {
		this.str = "";
	}
	this.length = this.str.length;
	this.cpLength = -1;
	this.localeSpec = ilib.getLocale();
};

/**
 * Return true if the given character is a Unicode surrogate character,
 * either high or low.
 * 
 * @private
 * @static
 * @param {string} ch character to check
 * @return {boolean} true if the character is a surrogate
 */
IString._isSurrogate = function (ch) {
	var n = ch.charCodeAt(0);
	return ((n >= 0xDC00 && n <= 0xDFFF) || (n >= 0xD800 && n <= 0xDBFF));
};

/**
 * Convert a UCS-4 code point to a Javascript string. The codepoint can be any valid 
 * UCS-4 Unicode character, including supplementary characters. Standard Javascript
 * only supports supplementary characters using the UTF-16 encoding, which has 
 * values in the range 0x0000-0xFFFF. String.fromCharCode() will only
 * give you a string containing 16-bit characters, and will not properly convert 
 * the code point for a supplementary character (which has a value > 0xFFFF) into 
 * two UTF-16 surrogate characters. Instead, it will just just give you whatever
 * single character happens to be the same as your code point modulo 0x10000, which
 * is almost never what you want.<p> 
 * 
 * Similarly, that means if you use String.charCodeAt()
 * you will only retrieve a 16-bit value, which may possibly be a single
 * surrogate character that is part of a surrogate pair representing a character
 * in the supplementary plane. It will not give you a code point. Use 
 * IString.codePointAt() to access code points in a string, or use 
 * an iterator to walk through the code points in a string. 
 * 
 * @static
 * @param {number} codepoint UCS-4 code point to convert to a character
 * @return {string} a string containing the character represented by the codepoint
 */
IString.fromCodePoint = function (codepoint) {
	if (codepoint < 0x10000) {
		return String.fromCharCode(codepoint);
	} else {
		var high = Math.floor(codepoint / 0x10000) - 1;
		var low = codepoint & 0xFFFF;
		
		return String.fromCharCode(0xD800 | ((high & 0x000F) << 6) |  ((low & 0xFC00) >> 10)) +
			String.fromCharCode(0xDC00 | (low & 0x3FF));
	}
};

/**
 * Convert the character or the surrogate pair at the given
 * index into the intrinsic Javascript string to a Unicode 
 * UCS-4 code point.
 * 
 * @param {string} str string to get the code point from
 * @param {number} index index into the string
 * @return {number} code point of the character at the
 * given index into the string
 */
IString.toCodePoint = function(str, index) {
	if (!str || str.length === 0) {
		return -1;
	}
	var code = -1, high = str.charCodeAt(index);
	if (high >= 0xD800 && high <= 0xDBFF) {
		if (str.length > index+1) {
			var low = str.charCodeAt(index+1);
			if (low >= 0xDC00 && low <= 0xDFFF) {
				code = (((high & 0x3C0) >> 6) + 1) << 16 |
					(((high & 0x3F) << 10) | (low & 0x3FF));
			}
		}
	} else {
		code = high;
	}
	
	return code;
};

/**
 * Load the plural the definitions of plurals for the locale.
 * @param {boolean=} sync
 * @param {Locale|string=} locale
 * @param {Object=} loadParams
 * @param {function(*)=} onLoad
 */
IString.loadPlurals = function (sync, locale, loadParams, onLoad) {
	var loc;
	if (locale) {
		loc = (typeof(locale) === 'string') ? new Locale(locale) : locale;
	} else {
		loc = new Locale(ilib.getLocale());
	}
	var spec = loc.getLanguage();
	if (!ilib.data["plurals_" + spec]) {
		Utils.loadData({
			name: "plurals.json",
			object: IString,
			locale: loc,
			sync: sync,
			loadParams: loadParams,
			callback: /** @type function(Object=):undefined */ ilib.bind(this, /** @type function() */ function(plurals) {
				if (!plurals) {
					IString.cache[spec] = {};
				}
				ilib.data["plurals_" + spec] = plurals || {};
				if (onLoad && typeof(onLoad) === 'function') {
					onLoad(ilib.data["plurals_" + spec]);
				}
			})
		});
	} else {
		if (onLoad && typeof(onLoad) === 'function') {
			onLoad(ilib.data["plurals_" + spec]);
		}
	}
};

/**
 * @private
 * @static
 */
IString._fncs = {
	/**
	 * @private
	 * @param {Object} obj
	 * @return {string|undefined}
	 */
	firstProp: function (obj) {
		for (var p in obj) {
			if (p && obj[p]) {
				return p;
			}
		}
		return undefined; // should never get here
	},
	
	/**
	 * @private
	 * @param {Object} obj
	 * @param {number} n
	 * @return {?}
	 */
	getValue: function (obj, n) {
		if (typeof(obj) === 'object') {
			var subrule = IString._fncs.firstProp(obj);
			return IString._fncs[subrule](obj[subrule], n);
		} else if (typeof(obj) === 'string') {
			return n;
		} else {
			return obj;
		}
	},
	
	/**
	 * @private
	 * @param {number} n
	 * @param {Array.<number|Array.<number>>} range
	 * @return {boolean}
	 */
	matchRangeContinuous: function(n, range) {
		for (var num in range) {
			if (typeof(num) !== 'undefined' && typeof(range[num]) !== 'undefined') {
				var obj = /** @type {Object|null|undefined} */ range[num];
				if (typeof(obj) === 'number') {
					if (n === range[num]) {
						return true;
					}
				} else if (Object.prototype.toString.call(obj) === '[object Array]') {
					if (n >= obj[0] && n <= obj[1]) {
						return true;
					}
				}
			}
		}
		return false;
	},

	/**
	 * @private
	 * @param {number} n
	 * @param {Array.<number|Array.<number>>} range
	 * @return {boolean}
	 */
	matchRange: function(n, range) {
		if (Math.floor(n) !== n) {
			return false;
		}
		return IString._fncs.matchRangeContinuous(n, range);
	},
	
	/**
	 * @private
	 * @param {Object} rule
	 * @param {number} n
	 * @return {boolean}
	 */
	is: function(rule, n) {
		var left = IString._fncs.getValue(rule[0], n);
		var right = IString._fncs.getValue(rule[1], n);
		return left == right;
		// return IString._fncs.getValue(rule[0]) == IString._fncs.getValue(rule[1]);
	},
	
	/**
	 * @private
	 * @param {Object} rule
	 * @param {number} n
	 * @return {boolean}
	 */
	isnot: function(rule, n) {
		return IString._fncs.getValue(rule[0], n) != IString._fncs.getValue(rule[1], n);
	},
	
	/**
	 * @private
	 * @param {Object} rule
	 * @param {number} n
	 * @return {boolean}
	 */
	inrange: function(rule, n) {
		return IString._fncs.matchRange(IString._fncs.getValue(rule[0], n), rule[1]);
	},
	
	/**
	 * @private
	 * @param {Object} rule
	 * @param {number} n
	 * @return {boolean}
	 */
	notin: function(rule, n) {
		return !IString._fncs.matchRange(IString._fncs.getValue(rule[0], n), rule[1]);
	},
	
	/**
	 * @private
	 * @param {Object} rule
	 * @param {number} n
	 * @return {boolean}
	 */
	within: function(rule, n) {
		return IString._fncs.matchRangeContinuous(IString._fncs.getValue(rule[0], n), rule[1]);		
	},
	
	/**
	 * @private
	 * @param {Object} rule
	 * @param {number} n
	 * @return {number}
	 */
	mod: function(rule, n) {
		return MathUtils.mod(IString._fncs.getValue(rule[0], n), IString._fncs.getValue(rule[1], n));
	},
	
	/**
	 * @private
	 * @param {Object} rule
	 * @param {number} n
	 * @return {number}
	 */
	n: function(rule, n) {
		return n;
	},
	
	/**
	 * @private
	 * @param {Object} rule
	 * @param {number} n
	 * @return {boolean}
	 */
	or: function(rule, n) {
		return IString._fncs.getValue(rule[0], n) || IString._fncs.getValue(rule[1], n);
	},
	
	/**
	 * @private
	 * @param {Object} rule
	 * @param {number} n
	 * @return {boolean}
	 */
	and: function(rule, n) {
		return IString._fncs.getValue(rule[0], n) && IString._fncs.getValue(rule[1], n);
	}
};

IString.prototype = {
	/**
	 * Return the length of this string in characters. This function defers to the regular
	 * Javascript string class in order to perform the length function. Please note that this
	 * method is a real method, whereas the length property of Javascript strings is 
	 * implemented by native code and appears as a property.<p>
	 * 
	 * Example:
	 * 
	 * <pre>
	 * var str = new IString("this is a string");
	 * console.log("String is " + str._length() + " characters long.");
	 * </pre>
	 * @private
	 */
	_length: function () {
		return this.str.length;
	},
	
	/**
	 * Format this string instance as a message, replacing the parameters with 
	 * the given values.<p>
	 * 
	 * The string can contain any text that a regular Javascript string can
	 * contain. Replacement parameters have the syntax:
	 * 
	 * <pre>
	 * {name}
	 * </pre>
	 * 
	 * Where "name" can be any string surrounded by curly brackets. The value of 
	 * "name" is taken from the parameters argument.<p>
	 * 
	 * Example:
	 * 
	 * <pre>
	 * var str = new IString("There are {num} objects.");
	 * console.log(str.format({
	 *   num: 12
	 * });
	 * </pre>
	 * 
	 * Would give the output:
	 * 
	 * <pre>
	 * There are 12 objects.
	 * </pre>
	 * 
	 * If a property is missing from the parameter block, the replacement
	 * parameter substring is left untouched in the string, and a different
	 * set of parameters may be applied a second time. This way, different
	 * parts of the code may format different parts of the message that they
	 * happen to know about.<p>
	 * 
	 * Example:
	 * 
	 * <pre>
	 * var str = new IString("There are {num} objects in the {container}.");
	 * console.log(str.format({
	 *   num: 12
	 * });
	 * </pre>
	 * 
	 * Would give the output:<p>
	 * 
	 * <pre>
	 * There are 12 objects in the {container}.
	 * </pre>
	 * 
	 * The result can then be formatted again with a different parameter block that
	 * specifies a value for the container property.
	 * 
	 * @param params a Javascript object containing values for the replacement 
	 * parameters in the current string
	 * @return a new IString instance with as many replacement parameters filled
	 * out as possible with real values.
	 */
	format: function (params) {
		var formatted = this.str;
		if (params) {
			var regex;
			for (var p in params) {
				if (typeof(params[p]) !== 'undefined') {
					regex = new RegExp("\{"+p+"\}", "g");
					formatted = formatted.replace(regex, params[p]);
				}
			}
		}
		return formatted.toString();
	},
	
	/**
	 * Format a string as one of a choice of strings dependent on the value of
	 * a particular argument index.<p>
	 * 
	 * The syntax of the choice string is as follows. The string contains a
	 * series of choices separated by a vertical bar character "|". Each choice
	 * has a value or range of values to match followed by a hash character "#"
	 * followed by the string to use if the variable matches the criteria.<p>
	 * 
	 * Example string:
	 * 
	 * <pre>
	 * var num = 2;
	 * var str = new IString("0#There are no objects.|1#There is one object.|2#There are {number} objects.");
	 * console.log(str.formatChoice(num, {
	 *   number: num
	 * }));
	 * </pre>
	 * 
	 * Gives the output:
	 * 
	 * <pre>
	 * "There are 2 objects."
	 * </pre>
	 * 
	 * The strings to format may contain replacement variables that will be formatted
	 * using the format() method above and the params argument as a source of values
	 * to use while formatting those variables.<p>
	 * 
	 * If the criterion for a particular choice is empty, that choice will be used
	 * as the default one for use when none of the other choice's criteria match.<p>
	 * 
	 * Example string:
	 * 
	 * <pre>
	 * var num = 22;
	 * var str = new IString("0#There are no objects.|1#There is one object.|#There are {number} objects.");
	 * console.log(str.formatChoice(num, {
	 *   number: num
	 * }));
	 * </pre>
	 * 
	 * Gives the output:
	 * 
	 * <pre>
	 * "There are 22 objects."
	 * </pre>
	 * 
	 * If multiple choice patterns can match a given argument index, the first one 
	 * encountered in the string will be used. If no choice patterns match the 
	 * argument index, then the default choice will be used. If there is no default
	 * choice defined, then this method will return an empty string.<p>
	 * 
	 * <b>Special Syntax</b><p>
	 * 
	 * For any choice format string, all of the patterns in the string should be
	 * of a single type: numeric, boolean, or string/regexp. The type of the 
	 * patterns is determined by the type of the argument index parameter.<p>
	 * 
	 * If the argument index is numeric, then some special syntax can be used 
	 * in the patterns to match numeric ranges.<p>
	 * 
	 * <ul>
	 * <li><i>&gt;x</i> - match any number that is greater than x 
	 * <li><i>&gt;=x</i> - match any number that is greater than or equal to x
	 * <li><i>&lt;x</i> - match any number that is less than x
	 * <li><i>&lt;=x</i> - match any number that is less than or equal to x
	 * <li><i>start-end</i> - match any number in the range [start,end)
	 * <li><i>zero</i> - match any number in the class "zero". (See below for
	 * a description of number classes.)
	 * <li><i>one</i> - match any number in the class "one"
	 * <li><i>two</i> - match any number in the class "two"
	 * <li><i>few</i> - match any number in the class "few"
	 * <li><i>many</i> - match any number in the class "many"
	 * </ul>
	 * 
	 * A number class defines a set of numbers that receive a particular syntax
	 * in the strings. For example, in Slovenian, integers ending in the digit
	 * "1" are in the "one" class, including 1, 21, 31, ... 101, 111, etc.
	 * Similarly, integers ending in the digit "2" are in the "two" class. 
	 * Integers ending in the digits "3" or "4" are in the "few" class, and
	 * every other integer is handled by the default string.<p>
	 * 
	 * The definition of what numbers are included in a class is locale-dependent.
	 * They are defined in the data file plurals.json. If your string is in a
	 * different locale than the default for ilib, you should call the setLocale()
	 * method of the string instance before calling this method.<p> 
	 * 
	 * <b>Other Pattern Types</b><p>
	 * 
	 * If the argument index is a boolean, the string values "true" and "false" 
	 * may appear as the choice patterns.<p>
	 * 
	 * If the argument index is of type string, then the choice patterns may contain
	 * regular expressions, or static strings as degenerate regexps.
	 * 
	 * @param {*} argIndex The index into the choice array of the current parameter
	 * @param {Object} params The hash of parameter values that replace the replacement 
	 * variables in the string
	 * @throws "syntax error in choice format pattern: " if there is a syntax error
	 * @return {string} the formatted string
	 */
	formatChoice: function(argIndex, params) {
		var choices = this.str.split("|");
		var type = typeof(argIndex);
		var limits = [];
		var strings = [];
		var i;
		var parts;
		var limit;
		var arg;
		var result = undefined;
		var defaultCase = "";
	
		if (this.str.length === 0) {
			// nothing to do
			return "";
		}
		
		// first parse all the choices
		for (i = 0; i < choices.length; i++) {		
			parts = choices[i].split("#");		
			if (parts.length > 2) {
				limits[i] = parts[0];
				parts = parts.shift();			
				strings[i] = parts.join("#");
			} else if (parts.length === 2) {
				limits[i] = parts[0];
				strings[i] = parts[1];
			} else {
				// syntax error
				throw "syntax error in choice format pattern: " + choices[i];
			}		
		}
		
		// then apply the argument index
		for (i = 0; i < limits.length; i++) {
			if (limits[i].length === 0) {
				// this is default case
				defaultCase = new IString(strings[i]);			
			} else {
				switch (type) {
					case 'number':
						arg = parseInt(argIndex, 10);
											
						if (limits[i].substring(0,2) === "<=") {						
							limit = parseFloat(limits[i].substring(2));
							if (arg <= limit) {
								result = new IString(strings[i]);
								i = limits.length;
							}
						} else if (limits[i].substring(0,2) === ">=") {						
							limit = parseFloat(limits[i].substring(2));
							if (arg >= limit) {
								result = new IString(strings[i]);
								i = limits.length;
							}
						} else if (limits[i].charAt(0) === "<") {						
							limit = parseFloat(limits[i].substring(1));
							if (arg < limit) {
								result = new IString(strings[i]);
								i = limits.length;
							}
						} else if (limits[i].charAt(0) === ">") {						
							limit = parseFloat(limits[i].substring(1));
							if (arg > limit) {
								result = new IString(strings[i]);
								i = limits.length;
							}
						} else {
							this.locale = this.locale || new Locale(this.localeSpec);
							switch (limits[i]) {
								case "zero":
								case "one":
								case "two":
								case "few":
								case "many":
									// CLDR locale-dependent number classes
									var ruleset = ilib.data["plurals_" + this.locale.getLanguage()];
									if (ruleset) {
										var rule = ruleset[limits[i]];
										if (IString._fncs.getValue(rule, arg)) {
											result = new IString(strings[i]);
											i = limits.length;
										}
									}
									break;
								default:
									var dash = limits[i].indexOf("-");
									if (dash !== -1) {							
										// range
										var start = limits[i].substring(0, dash);
										var end = limits[i].substring(dash+1);							
										if (arg >= parseInt(start, 10) && arg <= parseInt(end, 10)) {								
											result = new IString(strings[i]);
											i = limits.length;
										}
									} else if (arg === parseInt(limits[i], 10)) {							
										// exact amount
										result = new IString(strings[i]);
										i = limits.length;
									}
									break;
							}
						}
						break;
					case 'boolean':					
						if (limits[i] === "true" && argIndex === true) {						
							result = new IString(strings[i]);
							i = limits.length;
						} else if (limits[i] === "false" && argIndex === false) {						
							result = new IString(strings[i]);
							i = limits.length;
						}
						break;
					case 'string':					
						var regexp = new RegExp(limits[i], "i");
						if (regexp.test(argIndex)) {
							result = new IString(strings[i]);
							i = limits.length;
						}
						break;
					case 'object':
						throw "syntax error: fmtChoice parameter for the argument index cannot be an object";
				}
			}
		}
		
		if (!result) {		
			result = defaultCase || new IString("");
		}
		
		result = result.format(params);
		
		return result.toString();
	},
	
	// delegates
	/**
	 * Same as String.toString()
	 * @return {string} this instance as regular Javascript string
	 */
	toString: function () {
		return this.str.toString();
	},
	
	/**
	 * Same as String.valueOf()
	 * @return {string} this instance as a regular Javascript string
	 */
	valueOf: function () {
		return this.str.valueOf();
	},
	
	/**
	 * Same as String.charAt()
	 * @param {number} index the index of the character being sought
	 * @return {IString} the character at the given index
	 */
	charAt: function(index) {
		return new IString(this.str.charAt(index));
	},
	
	/**
	 * Same as String.charCodeAt(). This only reports on 
	 * 2-byte UCS-2 Unicode values, and does not take into
	 * account supplementary characters encoded in UTF-16.
	 * If you would like to take account of those characters,
	 * use codePointAt() instead.
	 * @param {number} index the index of the character being sought
	 * @return {number} the character code of the character at the 
	 * given index in the string 
	 */
	charCodeAt: function(index) {
		return this.str.charCodeAt(index);
	},
	
	/**
	 * Same as String.concat()
	 * @param {string} strings strings to concatenate to the current one
	 * @return {IString} a concatenation of the given strings
	 */
	concat: function(strings) {
		return new IString(this.str.concat(strings));
	},
	
	/**
	 * Same as String.indexOf()
	 * @param {string} searchValue string to search for
	 * @param {number} start index into the string to start searching, or
	 * undefined to search the entire string
	 * @return {number} index into the string of the string being sought,
	 * or -1 if the string is not found 
	 */
	indexOf: function(searchValue, start) {
		return this.str.indexOf(searchValue, start);
	},
	
	/**
	 * Same as String.lastIndexOf()
	 * @param {string} searchValue string to search for
	 * @param {number} start index into the string to start searching, or
	 * undefined to search the entire string
	 * @return {number} index into the string of the string being sought,
	 * or -1 if the string is not found 
	 */
	lastIndexOf: function(searchValue, start) {
		return this.str.lastIndexOf(searchValue, start);
	},
	
	/**
	 * Same as String.match()
	 * @param {string} regexp the regular expression to match
	 * @return {Array.<string>} an array of matches
	 */
	match: function(regexp) {
		return this.str.match(regexp);
	},
	
	/**
	 * Same as String.replace()
	 * @param {string} searchValue a regular expression to search for
	 * @param {string} newValue the string to replace the matches with
	 * @return {IString} a new string with all the matches replaced
	 * with the new value
	 */
	replace: function(searchValue, newValue) {
		return new IString(this.str.replace(searchValue, newValue));
	},
	
	/**
	 * Same as String.search()
	 * @param {string} regexp the regular expression to search for
	 * @return {number} position of the match, or -1 for no match
	 */
	search: function(regexp) {
		return this.str.search(regexp);
	},
	
	/**
	 * Same as String.slice()
	 * @param {number} start first character to include in the string
	 * @param {number} end include all characters up to, but not including
	 * the end character
	 * @return {IString} a slice of the current string
	 */
	slice: function(start, end) {
		return new IString(this.str.slice(start, end));
	},
	
	/**
	 * Same as String.split()
	 * @param {string} separator regular expression to match to find
	 * separations between the parts of the text
	 * @param {number} limit maximum number of items in the final 
	 * output array. Any items beyond that limit will be ignored.
	 * @return {Array.<string>} the parts of the current string split 
	 * by the separator
	 */
	split: function(separator, limit) {
		return this.str.split(separator, limit);
	},
	
	/**
	 * Same as String.substr()
	 * @param {number} start the index of the character that should 
	 * begin the returned substring
	 * @param {number} length the number of characters to return after
	 * the start character.
	 * @return {IString} the requested substring 
	 */
	substr: function(start, length) {
		var plat = ilib._getPlatform();
		if (plat === "qt" || plat === "rhino" || plat === "trireme") {
			// qt and rhino have a broken implementation of substr(), so
			// work around it
			if (typeof(length) === "undefined") {
				length = this.str.length - start;
			}
		}
		return new IString(this.str.substr(start, length));
	},
	
	/**
	 * Same as String.substring()
	 * @param {number} from the index of the character that should 
	 * begin the returned substring
	 * @param {number} to the index where to stop the extraction. If
	 * omitted, extracts the rest of the string
	 * @return {IString} the requested substring 
	 */
	substring: function(from, to) {
		return this.str.substring(from, to);
	},
	
	/**
	 * Same as String.toLowerCase(). Note that this method is
	 * not locale-sensitive. 
	 * @return {IString} a string with the first character
	 * lower-cased
	 */
	toLowerCase: function() {
		return this.str.toLowerCase();
	},
	
	/**
	 * Same as String.toUpperCase(). Note that this method is
	 * not locale-sensitive. Use toLocaleUpperCase() instead
	 * to get locale-sensitive behaviour. 
	 * @return {IString} a string with the first character
	 * upper-cased
	 */
	toUpperCase: function() {
		return this.str.toUpperCase();
	},
	
	/**
	 * Convert the character or the surrogate pair at the given
	 * index into the string to a Unicode UCS-4 code point.
	 * @protected
	 * @param {number} index index into the string
	 * @return {number} code point of the character at the
	 * given index into the string
	 */
	_toCodePoint: function (index) {
		return IString.toCodePoint(this.str, index);
	},
	
	/**
	 * Call the callback with each character in the string one at 
	 * a time, taking care to step through the surrogate pairs in 
	 * the UTF-16 encoding properly.<p>
	 * 
	 * The standard Javascript String's charAt() method only
	 * returns a particular 16-bit character in the 
	 * UTF-16 encoding scheme.
	 * If the index to charAt() is pointing to a low- or 
	 * high-surrogate character,
	 * it will return the surrogate character rather 
	 * than the the character 
	 * in the supplementary planes that the two surrogates together 
	 * encode. This function will call the callback with the full
	 * character, making sure to join two  
	 * surrogates into one character in the supplementary planes
	 * where necessary.<p>
	 * 
	 * @param {function(string)} callback a callback function to call with each
	 * full character in the current string
	 */
	forEach: function(callback) {
		if (typeof(callback) === 'function') {
			var it = this.charIterator();
			while (it.hasNext()) {
				callback(it.next());
			}
		}
	},

	/**
	 * Call the callback with each numeric code point in the string one at 
	 * a time, taking care to step through the surrogate pairs in 
	 * the UTF-16 encoding properly.<p>
	 * 
	 * The standard Javascript String's charCodeAt() method only
	 * returns information about a particular 16-bit character in the 
	 * UTF-16 encoding scheme.
	 * If the index to charCodeAt() is pointing to a low- or 
	 * high-surrogate character,
	 * it will return the code point of the surrogate character rather 
	 * than the code point of the character 
	 * in the supplementary planes that the two surrogates together 
	 * encode. This function will call the callback with the full
	 * code point of each character, making sure to join two  
	 * surrogates into one code point in the supplementary planes.<p>
	 * 
	 * @param {function(string)} callback a callback function to call with each
	 * code point in the current string
	 */
	forEachCodePoint: function(callback) {
		if (typeof(callback) === 'function') {
			var it = this.iterator();
			while (it.hasNext()) {
				callback(it.next());
			}
		}
	},

	/**
	 * Return an iterator that will step through all of the characters
	 * in the string one at a time and return their code points, taking 
	 * care to step through the surrogate pairs in UTF-16 encoding 
	 * properly.<p>
	 * 
	 * The standard Javascript String's charCodeAt() method only
	 * returns information about a particular 16-bit character in the 
	 * UTF-16 encoding scheme.
	 * If the index is pointing to a low- or high-surrogate character,
	 * it will return a code point of the surrogate character rather 
	 * than the code point of the character 
	 * in the supplementary planes that the two surrogates together 
	 * encode.<p>
	 * 
	 * The iterator instance returned has two methods, hasNext() which
	 * returns true if the iterator has more code points to iterate through,
	 * and next() which returns the next code point as a number.<p>
	 * 
	 * @return {Object} an iterator 
	 * that iterates through all the code points in the string
	 */
	iterator: function() {
		/**
		 * @constructor
		 */
		function _iterator (istring) {
			this.index = 0;
			this.hasNext = function () {
				return (this.index < istring.str.length);
			};
			this.next = function () {
				if (this.index < istring.str.length) {
					var num = istring._toCodePoint(this.index);
					this.index += ((num > 0xFFFF) ? 2 : 1);
				} else {
					num = -1;
				}
				return num;
			};
		};
		return new _iterator(this);
	},

	/**
	 * Return an iterator that will step through all of the characters
	 * in the string one at a time, taking 
	 * care to step through the surrogate pairs in UTF-16 encoding 
	 * properly.<p>
	 * 
	 * The standard Javascript String's charAt() method only
	 * returns information about a particular 16-bit character in the 
	 * UTF-16 encoding scheme.
	 * If the index is pointing to a low- or high-surrogate character,
	 * it will return that surrogate character rather 
	 * than the surrogate pair which represents a character 
	 * in the supplementary planes.<p>
	 * 
	 * The iterator instance returned has two methods, hasNext() which
	 * returns true if the iterator has more characters to iterate through,
	 * and next() which returns the next character.<p>
	 * 
	 * @return {Object} an iterator 
	 * that iterates through all the characters in the string
	 */
	charIterator: function() {
		/**
		 * @constructor
		 */
		function _chiterator (istring) {
			this.index = 0;
			this.hasNext = function () {
				return (this.index < istring.str.length);
			};
			this.next = function () {
				var ch;
				if (this.index < istring.str.length) {
					ch = istring.str.charAt(this.index);
					if (IString._isSurrogate(ch) && 
							this.index+1 < istring.str.length && 
							IString._isSurrogate(istring.str.charAt(this.index+1))) {
						this.index++;
						ch += istring.str.charAt(this.index);
					}
					this.index++;
				}
				return ch;
			};
		};
		return new _chiterator(this);
	},
	
	/**
	 * Return the code point at the given index when the string is viewed 
	 * as an array of code points. If the index is beyond the end of the
	 * array of code points or if the index is negative, -1 is returned.
	 * @param {number} index index of the code point 
	 * @return {number} code point of the character at the given index into
	 * the string
	 */
	codePointAt: function (index) {
		if (index < 0) {
			return -1;
		}
		var count,
			it = this.iterator(),
			ch;
		for (count = index; count >= 0 && it.hasNext(); count--) {
			ch = it.next();
		}
		return (count < 0) ? ch : -1;
	},
	
	/**
	 * Set the locale to use when processing choice formats. The locale
	 * affects how number classes are interpretted. In some cultures,
	 * the limit "few" maps to "any integer that ends in the digits 2 to 9" and
	 * in yet others, "few" maps to "any integer that ends in the digits
	 * 3 or 4".
	 * @param {Locale|string} locale locale to use when processing choice
	 * formats with this string
	 * @param {boolean=} sync [optional] whether to load the locale data synchronously 
	 * or not
	 * @param {Object=} loadParams [optional] parameters to pass to the loader function
	 * @param {function(*)=} onLoad [optional] function to call when the loading is done
	 */
	setLocale: function (locale, sync, loadParams, onLoad) {
		if (typeof(locale) === 'object') {
			this.locale = locale;
		} else {
			this.localeSpec = locale;
			this.locale = new Locale(locale);
		}
		
		IString.loadPlurals(typeof(sync) !== 'undefined' ? sync : true, this.locale, loadParams, onLoad);
	},

	/**
	 * Return the locale to use when processing choice formats. The locale
	 * affects how number classes are interpretted. In some cultures,
	 * the limit "few" maps to "any integer that ends in the digits 2 to 9" and
	 * in yet others, "few" maps to "any integer that ends in the digits
	 * 3 or 4".
	 * @return {string} localespec to use when processing choice
	 * formats with this string
	 */
	getLocale: function () {
		return (this.locale ? this.locale.getSpec() : this.localeSpec) || ilib.getLocale();
	},

	/**
	 * Return the number of code points in this string. This may be different
	 * than the number of characters, as the UTF-16 encoding that Javascript
	 * uses for its basis returns surrogate pairs separately. Two 2-byte 
	 * surrogate characters together make up one character/code point in 
	 * the supplementary character planes. If your string contains no
	 * characters in the supplementary planes, this method will return the
	 * same thing as the length() method.
	 * @return {number} the number of code points in this string
	 */
	codePointLength: function () {
		if (this.cpLength === -1) {
			var it = this.iterator();
			this.cpLength = 0;
			while (it.hasNext()) { 
				this.cpLength++;
				it.next();
			};
		}
		return this.cpLength;	
	}
};

module.exports = IString;
},{'./ilib.js':'enyo-ilib/ilib','./Utils.js':'enyo-ilib/Utils','./MathUtils.js':'enyo-ilib/MathUtils','./Locale.js':'enyo-ilib/Locale'}],'enyo-ilib/GregorianCal':[function (module,exports,global,require,request){
/*
 * gregorian.js - Represent a Gregorian calendar object.
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/* !depends ilib.js Calendar.js Utils.js MathUtils.js */

var ilib = require("./ilib.js");
var Utils = require("./Utils.js");
var MathUtils = require("./MathUtils.js");
var Calendar = require("./Calendar.js");

/**
 * @class
 * Construct a new Gregorian calendar object. This class encodes information about
 * a Gregorian calendar.<p>
 * 
 * 
 * @constructor
 * @param {{noinstance:boolean}=} options
 * @extends Calendar
 */
var GregorianCal = function(options) {
	if (!options || !options.noinstance) {
		this.type = "gregorian";
	}
};

/**
 * the lengths of each month 
 * @private
 * @const
 * @type Array.<number> 
 */
GregorianCal.monthLengths = [
	31,  /* Jan */
	28,  /* Feb */
	31,  /* Mar */
	30,  /* Apr */
	31,  /* May */
	30,  /* Jun */
	31,  /* Jul */
	31,  /* Aug */
	30,  /* Sep */
	31,  /* Oct */
	30,  /* Nov */
	31   /* Dec */
];

/**
 * Return the number of months in the given year. The number of months in a year varies
 * for some luni-solar calendars because in some years, an extra month is needed to extend the 
 * days in a year to an entire solar year. The month is represented as a 1-based number
 * where 1=first month, 2=second month, etc.
 * 
 * @param {number} year a year for which the number of months is sought
 * @return {number} The number of months in the given year
 */
GregorianCal.prototype.getNumMonths = function(year) {
	return 12;
};

/**
 * Return the number of days in a particular month in a particular year. This function
 * can return a different number for a month depending on the year because of things
 * like leap years.
 * 
 * @param {number} month the month for which the length is sought
 * @param {number} year the year within which that month can be found
 * @return {number} the number of days within the given month in the given year
 */
GregorianCal.prototype.getMonLength = function(month, year) {
	if (month !== 2 || !this.isLeapYear(year)) {
		return GregorianCal.monthLengths[month-1];
	} else {
		return 29;
	}
};

/**
 * Return true if the given year is a leap year in the Gregorian calendar.
 * The year parameter may be given as a number, or as a GregDate object.
 * @param {number|GregorianDate} year the year for which the leap year information is being sought
 * @return {boolean} true if the given year is a leap year
 */
GregorianCal.prototype.isLeapYear = function(year) {
	var y = (typeof(year) === 'number' ? year : year.getYears());
	var centuries = MathUtils.mod(y, 400);
	return (MathUtils.mod(y, 4) === 0 && centuries !== 100 && centuries !== 200 && centuries !== 300);
};

/**
 * Return the type of this calendar.
 * 
 * @return {string} the name of the type of this calendar 
 */
GregorianCal.prototype.getType = function() {
	return this.type;
};

/* register this calendar for the factory method */
Calendar._constructors["gregorian"] = GregorianCal;

module.exports = GregorianCal;
},{'./ilib.js':'enyo-ilib/ilib','./Utils.js':'enyo-ilib/Utils','./MathUtils.js':'enyo-ilib/MathUtils','./Calendar.js':'enyo-ilib/Calendar'}],'enyo-ilib/ScriptInfo':[function (module,exports,global,require,request){
/*
 * ScriptInfo.js - information about scripts
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// !depends ilib.js Utils.js

// !data scripts

var ilib = require("./ilib.js");
var Utils = require("./Utils.js");

/**
 * @class
 * Create a new script info instance. This class encodes information about
 * scripts, which are sets of characters used in a writing system.<p>
 * 
 * The options object may contain any of the following properties:
 * 
 * <ul>
 * <li><i>onLoad</i> - a callback function to call when the script info object is fully 
 * loaded. When the onLoad option is given, the script info object will attempt to
 * load any missing locale data using the ilib loader callback.
 * When the constructor is done (even if the data is already preassembled), the 
 * onLoad function is called with the current instance as a parameter, so this
 * callback can be used with preassembled or dynamic loading or a mix of the two.
 * 
 * <li><i>sync</i> - tell whether to load any missing locale data synchronously or 
 * asynchronously. If this option is given as "false", then the "onLoad"
 * callback must be given, as the instance returned from this constructor will
 * not be usable for a while. 
 *
 * <li><i>loadParams</i> - an object containing parameters to pass to the 
 * loader callback function when locale data is missing. The parameters are not
 * interpretted or modified in any way. They are simply passed along. The object 
 * may contain any property/value pairs as long as the calling code is in
 * agreement with the loader callback function as to what those parameters mean.
 * </ul>
 * 
 * 
 * @constructor
 * @param {string} script The ISO 15924 4-letter identifier for the script
 * @param {Object} options parameters to initialize this matcher 
 */
var ScriptInfo = function(script, options) {
	var sync = true,
	    loadParams = undefined;
	
	this.script = script;
	
	if (options) {
		if (typeof(options.sync) !== 'undefined') {
			sync = (options.sync == true);
		}
		
		if (typeof(options.loadParams) !== 'undefined') {
			loadParams = options.loadParams;
		}
	}

	if (!ScriptInfo.cache) {
		ScriptInfo.cache = {};
	}

	if (!ilib.data.scripts) {
		Utils.loadData({
			object: ScriptInfo, 
			locale: "-", 
			name: "scripts.json", 
			sync: sync, 
			loadParams: loadParams, 
			callback: ilib.bind(this, function (info) {
				if (!info) {
					info = {"Latn":{"nb":215,"nm":"Latin","lid":"Latin","rtl":false,"ime":false,"casing":true}};
					var spec = this.locale.getSpec().replace(/-/g, "_");
					ScriptInfo.cache[spec] = info;
				}
				ilib.data.scripts = info;
				this.info = script && ilib.data.scripts[script];
				if (options && typeof(options.onLoad) === 'function') {
					options.onLoad(this);
				}
			})
		});
	} else {
		this.info = ilib.data.scripts[script];
	}

};

/**
 * @private
 */
ScriptInfo._getScriptsArray = function() {
	var ret = [],
		script = undefined,
		scripts = ilib.data.scripts;

	for (script in scripts) {
		if (script && scripts[script]) {
			ret.push(script);
		}
	}
	
	return ret;
};

/**
 * Return an array of all ISO 15924 4-letter identifier script identifiers that
 * this copy of ilib knows about.
 * @static
 * @param {boolean} sync whether to find the available ids synchronously (true) or asynchronously (false)
 * @param {Object} loadParams arbitrary object full of properties to pass to the loader
 * @param {function(Array.<string>)} onLoad callback function to call when the data is finished loading
 * @return {Array.<string>} an array of all script identifiers that this copy of
 * ilib knows about
 */
ScriptInfo.getAllScripts = function(sync, loadParams, onLoad) {
	if (!ilib.data.scripts) {
		Utils.loadData({
			object: ScriptInfo, 
			locale: "-", 
			name: "scripts.json", 
			sync: sync, 
			loadParams: loadParams, 
			callback: ilib.bind(this, function (info) {
				ilib.data.scripts = info;
				
				if (typeof(onLoad) === 'function') {
					onLoad(ScriptInfo._getScriptsArray());
				}
			})
		});
	}
	
	return ScriptInfo._getScriptsArray();
};

ScriptInfo.prototype = {
	/**
	 * Return the 4-letter ISO 15924 identifier associated
	 * with this script.
	 * @return {string} the 4-letter ISO code for this script
	 */
	getCode: function () {
		return this.info && this.script;
	},
	
	/**
	 * Get the ISO 15924 code number associated with this
	 * script.
	 * 
	 * @return {number} the ISO 15924 code number
	 */
	getCodeNumber: function () {
		return this.info && this.info.nb || 0;
	},
	
	/**
	 * Get the name of this script in English.
	 * 
	 * @return {string} the name of this script in English
	 */
	getName: function () {
		return this.info && this.info.nm;
	},
	
	/**
	 * Get the long identifier assciated with this script.
	 * 
	 * @return {string} the long identifier of this script
	 */
	getLongCode: function () {
		return this.info && this.info.lid;
	},
	
	/**
	 * Return the usual direction that text in this script is written
	 * in. Possible return values are "rtl" for right-to-left,
	 * "ltr" for left-to-right, and "ttb" for top-to-bottom.
	 * 
	 * @return {string} the usual direction that text in this script is
	 * written in
	 */
	getScriptDirection: function() {
		return (this.info && typeof(this.info.rtl) !== 'undefined' && this.info.rtl) ? "rtl" : "ltr";
	},
	
	/**
	 * Return true if this script typically requires an input method engine
	 * to enter its characters.
	 * 
	 * @return {boolean} true if this script typically requires an IME
	 */
	getNeedsIME: function () {
		return this.info && this.info.ime ? true : false; // converts undefined to false
	},
	
	/**
	 * Return true if this script uses lower- and upper-case characters.
	 * 
	 * @return {boolean} true if this script uses letter case
	 */
	getCasing: function () {
		return this.info && this.info.casing ? true : false; // converts undefined to false
	}
};

module.exports = ScriptInfo;
},{'./ilib.js':'enyo-ilib/ilib','./Utils.js':'enyo-ilib/Utils'}],'enyo-ilib/EthiopicCal':[function (module,exports,global,require,request){
/*
 * ethiopic.js - Represent a Ethiopic calendar object.
 * 
 * Copyright © 2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends ilib.js Calendar.js Utils.js MathUtils.js */

var ilib = require("./ilib.js");
var Utils = require("./Utils.js");
var MathUtils = require("./MathUtils.js");

var Calendar = require("./Calendar.js");

/**
 * @class
 * Construct a new Ethiopic calendar object. This class encodes information about
 * a Ethiopic calendar.<p>
 * 
 * 
 * @constructor
 * @extends Calendar
 */
var EthiopicCal = function() {
	this.type = "ethiopic";
};

/**
 * Return the number of months in the given year. The number of months in a year varies
 * for lunar calendars because in some years, an extra month is needed to extend the 
 * days in a year to an entire solar year. The month is represented as a 1-based number
 * where 1=Maskaram, 2=Teqemt, etc. until 13=Paguemen.
 * 
 * @param {number} year a year for which the number of months is sought
 */
EthiopicCal.prototype.getNumMonths = function(year) {
	return 13;
};

/**
 * Return the number of days in a particular month in a particular year. This function
 * can return a different number for a month depending on the year because of things
 * like leap years.
 * 
 * @param {number|string} month the month for which the length is sought
 * @param {number} year the year within which that month can be found
 * @return {number} the number of days within the given month in the given year
 */
EthiopicCal.prototype.getMonLength = function(month, year) {
	var m = month;
	switch (typeof(m)) {
        case "string": 
            m = parseInt(m, 10); 
            break;
        case "function":
        case "object":
        case "undefined":
            return 30;
            break;
    }    
	if (m < 13) {
		return 30;
	} else {
		return this.isLeapYear(year) ? 6 : 5;
	}
};

/**
 * Return true if the given year is a leap year in the Ethiopic calendar.
 * The year parameter may be given as a number, or as a JulDate object.
 * @param {number|EthiopicDate|string} year the year for which the leap year information is being sought
 * @return {boolean} true if the given year is a leap year
 */
EthiopicCal.prototype.isLeapYear = function(year) {
	var y = year;
	 switch (typeof(y)) {
        case "string":
            y = parseInt(y, 10);
            break;
        case "object":
            if (typeof(y.year) !== "number") { // in case it is an ilib.Date object
                return false;
            }
            y = y.year;
            break;
        case "function":
        case "undefined":
            return false;
            break;
    }
	return MathUtils.mod(y, 4) === 3;
};

/**
 * Return the type of this calendar.
 * 
 * @return {string} the name of the type of this calendar 
 */
EthiopicCal.prototype.getType = function() {
	return this.type;
};


/* register this calendar for the factory method */
Calendar._constructors["ethiopic"] = EthiopicCal;

module.exports = EthiopicCal;
},{'./ilib.js':'enyo-ilib/ilib','./Utils.js':'enyo-ilib/Utils','./MathUtils.js':'enyo-ilib/MathUtils','./Calendar.js':'enyo-ilib/Calendar'}],'enyo-ilib/IDate':[function (module,exports,global,require,request){
/*
 * IDate.js - Represent a date in any calendar. This class is subclassed for each 
 * calendar and includes some shared functionality.
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends LocaleInfo.js */

var LocaleInfo = require("./LocaleInfo.js");

/**
 * @class
 * Superclass for all the calendar date classes that contains shared 
 * functionality. This class is never instantiated on its own. Instead,
 * you should use the {@link DateFactory} function to manufacture a new
 * instance of a subclass of IDate. This class is called IDate for "ilib
 * date" so that it does not conflict with the built-in Javascript Date
 * class.
 * 
 * @private
 * @constructor
 * @param {Object=} options The date components to initialize this date with
 */
var IDate = function(options) {
};

/* place for the subclasses to put their constructors so that the factory method
 * can find them. Do this to add your date after it's defined: 
 * IDate._constructors["mytype"] = IDate.MyTypeConstructor;
 */
IDate._constructors = {};

IDate.prototype = {
	getType: function() {
		return "date";
	},
	
	/**
	 * Return the unix time equivalent to this date instance. Unix time is
	 * the number of milliseconds since midnight on Jan 1, 1970 UTC (Gregorian). This 
	 * method only returns a valid number for dates between midnight, 
	 * Jan 1, 1970 UTC (Gregorian) and Jan 19, 2038 at 3:14:07am UTC (Gregorian) when 
	 * the unix time runs out. If this instance encodes a date outside of that range, 
	 * this method will return -1. For date types that are not Gregorian, the point 
	 * in time represented by this date object will only give a return value if it
	 * is in the correct range in the Gregorian calendar as given previously.
	 * 
	 * @return {number} a number giving the unix time, or -1 if the date is outside the
	 * valid unix time range
	 */
	getTime: function() {
		return this.rd.getTime(); 
	},
	
	/**
	 * Return the extended unix time equivalent to this Gregorian date instance. Unix time is
	 * the number of milliseconds since midnight on Jan 1, 1970 UTC. Traditionally unix time
	 * (or the type "time_t" in C/C++) is only encoded with an unsigned 32 bit integer, and thus 
	 * runs out on Jan 19, 2038. However, most Javascript engines encode numbers well above 
	 * 32 bits and the Date object allows you to encode up to 100 million days worth of time 
	 * after Jan 1, 1970, and even more interestingly, 100 million days worth of time before
	 * Jan 1, 1970 as well. This method returns the number of milliseconds in that extended 
	 * range. If this instance encodes a date outside of that range, this method will return
	 * NaN.
	 * 
	 * @return {number} a number giving the extended unix time, or Nan if the date is outside 
	 * the valid extended unix time range
	 */
	getTimeExtended: function() {
		return this.rd.getTimeExtended();
	},

	/**
	 * Set the time of this instance according to the given unix time. Unix time is
	 * the number of milliseconds since midnight on Jan 1, 1970.
	 * 
	 * @param {number} millis the unix time to set this date to in milliseconds 
	 */
	setTime: function(millis) {
		this.rd = this.newRd({
			unixtime: millis,
			cal: this.cal
		});
		this._calcDateComponents();
	},
	
	getDays: function() {
		return this.day;
	},
	getMonths: function() {
		return this.month;
	},
	getYears: function() {
		return this.year;
	},
	getHours: function() {
		return this.hour;
	},
	getMinutes: function() {
		return this.minute;
	},
	getSeconds: function() {
		return this.second;
	},
	getMilliseconds: function() {
		return this.millisecond;
	},
	getEra: function() {
		return (this.year < 1) ? -1 : 1;
	},

	setDays: function(day) {
		this.day = parseInt(day, 10) || 1;
		this.rd._setDateComponents(this);
	},
	setMonths: function(month) {
		this.month = parseInt(month, 10) || 1;
		this.rd._setDateComponents(this);
	},
	setYears: function(year) {
		this.year = parseInt(year, 10) || 0;
		this.rd._setDateComponents(this);
	},
	
	setHours: function(hour) {
		this.hour = parseInt(hour, 10) || 0;
		this.rd._setDateComponents(this);
	},
	setMinutes: function(minute) {
		this.minute = parseInt(minute, 10) || 0;
		this.rd._setDateComponents(this);
	},
	setSeconds: function(second) {
		this.second = parseInt(second, 10) || 0;
		this.rd._setDateComponents(this);
	},
	setMilliseconds: function(milli) {
		this.millisecond = parseInt(milli, 10) || 0;
		this.rd._setDateComponents(this);
	},
	
	/**
	 * Return a new date instance in the current calendar that represents the first instance 
	 * of the given day of the week before the current date. The day of the week is encoded
	 * as a number where 0 = Sunday, 1 = Monday, etc.
	 * 
	 * @param {number} dow the day of the week before the current date that is being sought
	 * @return {IDate} the date being sought
	 */
	before: function (dow) {
		return new this.constructor({
			rd: this.rd.before(dow, this.offset),
			timezone: this.timezone
		});
	},
	
	/**
	 * Return a new date instance in the current calendar that represents the first instance 
	 * of the given day of the week after the current date. The day of the week is encoded
	 * as a number where 0 = Sunday, 1 = Monday, etc.
	 * 
	 * @param {number} dow the day of the week after the current date that is being sought
	 * @return {IDate} the date being sought
	 */
	after: function (dow) {
		return new this.constructor({
			rd: this.rd.after(dow, this.offset),
			timezone: this.timezone
		});
	},

	/**
	 * Return a new Gregorian date instance that represents the first instance of the 
	 * given day of the week on or before the current date. The day of the week is encoded
	 * as a number where 0 = Sunday, 1 = Monday, etc.
	 * 
	 * @param {number} dow the day of the week on or before the current date that is being sought
	 * @return {IDate} the date being sought
	 */
	onOrBefore: function (dow) {
		return new this.constructor({
			rd: this.rd.onOrBefore(dow, this.offset),
			timezone: this.timezone
		});
	},

	/**
	 * Return a new Gregorian date instance that represents the first instance of the 
	 * given day of the week on or after the current date. The day of the week is encoded
	 * as a number where 0 = Sunday, 1 = Monday, etc.
	 * 
	 * @param {number} dow the day of the week on or after the current date that is being sought
	 * @return {IDate} the date being sought
	 */
	onOrAfter: function (dow) {
		return new this.constructor({
			rd: this.rd.onOrAfter(dow, this.offset),
			timezone: this.timezone
		});
	},
	
	/**
	 * Return a Javascript Date object that is equivalent to this date
	 * object.
	 * 
	 * @return {Date|undefined} a javascript Date object
	 */
	getJSDate: function() {
		var unix = this.rd.getTimeExtended();
		return isNaN(unix) ? undefined : new Date(unix); 
	},
	
	/**
	 * Return the Rata Die (fixed day) number of this date.
	 * 
	 * @protected
	 * @return {number} the rd date as a number
	 */
	getRataDie: function() {
		return this.rd.getRataDie();
	},
	
	/**
	 * Set the date components of this instance based on the given rd.
	 * @protected
	 * @param {number} rd the rata die date to set
	 */
	setRd: function (rd) {
		this.rd = this.newRd({
			rd: rd,
			cal: this.cal
		});
		this._calcDateComponents();
	},
	
	/**
	 * Return the Julian Day equivalent to this calendar date as a number.
	 * 
	 * @return {number} the julian date equivalent of this date
	 */
	getJulianDay: function() {
		return this.rd.getJulianDay();
	},
	
	/**
	 * Set the date of this instance using a Julian Day.
	 * @param {number|JulianDay} date the Julian Day to use to set this date
	 */
	setJulianDay: function (date) {
		this.rd = this.newRd({
			julianday: (typeof(date) === 'object') ? date.getDate() : date,
			cal: this.cal
		});
		this._calcDateComponents();
	},

	/**
	 * Return the time zone associated with this date, or 
	 * undefined if none was specified in the constructor.
	 * 
	 * @return {string|undefined} the name of the time zone for this date instance
	 */
	getTimeZone: function() {
		return this.timezone || "local";
	},
	
	/**
	 * Set the time zone associated with this date.
	 * @param {string=} tzName the name of the time zone to set into this date instance,
	 * or "undefined" to unset the time zone 
	 */
	setTimeZone: function (tzName) {
		if (!tzName || tzName === "") {
			// same as undefining it
			this.timezone = undefined;
			this.tz = undefined;
		} else if (typeof(tzName) === 'string') {
			this.timezone = tzName;
			this.tz = undefined;
			// assuming the same UTC time, but a new time zone, now we have to 
			// recalculate what the date components are
			this._calcDateComponents();
		}
	},
	
	/**
	 * Return the rd number of the first Sunday of the given ISO year.
	 * @protected
	 * @param {number} year the year for which the first Sunday is being sought
	 * @return {number} the rd of the first Sunday of the ISO year
	 */
	firstSunday: function (year) {
		var firstDay = this.newRd({
			year: year,
			month: 1,
			day: 1,
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0,
			cal: this.cal
		});
		var firstThu = this.newRd({
			rd: firstDay.onOrAfter(4),
			cal: this.cal
		});
		return firstThu.before(0);
	},
	
	/**
	 * Return the ISO 8601 week number in the current year for the current date. The week
	 * number ranges from 0 to 55, as some years have 55 weeks assigned to them in some
	 * calendars.
	 * 
	 * @return {number} the week number for the current date
	 */
	getWeekOfYear: function() {
		var rd = Math.floor(this.rd.getRataDie());
		var year = this._calcYear(rd + this.offset);
		var yearStart = this.firstSunday(year);
		var nextYear;
		
		// if we have a January date, it may be in this ISO year or the previous year
		if (rd < yearStart) {
			yearStart = this.firstSunday(year-1);
		} else {
			// if we have a late December date, it may be in this ISO year, or the next year
			nextYear = this.firstSunday(year+1);
			if (rd >= nextYear) {
				yearStart = nextYear;
			}
		}
		
		return Math.floor((rd-yearStart)/7) + 1;
	},
	
	/**
	 * Return the ordinal number of the week within the month. The first week of a month is
	 * the first one that contains 4 or more days in that month. If any days precede this
	 * first week, they are marked as being in week 0. This function returns values from 0
	 * through 6.<p>
	 * 
	 * The locale is a required parameter because different locales that use the same 
	 * Gregorian calendar consider different days of the week to be the beginning of
	 * the week. This can affect the week of the month in which some days are located.
	 * 
	 * @param {Locale|string} locale the locale or locale spec to use when figuring out 
	 * the first day of the week
	 * @return {number} the ordinal number of the week within the current month
	 */
	getWeekOfMonth: function(locale) {
		var li = new LocaleInfo(locale);
		
		var first = this.newRd({
			year: this._calcYear(this.rd.getRataDie()+this.offset),
			month: this.getMonths(),
			day: 1,
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0,
			cal: this.cal
		});
		var weekStart = first.onOrAfter(li.getFirstDayOfWeek());
		
		if (weekStart - first.getRataDie() > 3) {
			// if the first week has 4 or more days in it of the current month, then consider
			// that week 1. Otherwise, it is week 0. To make it week 1, move the week start
			// one week earlier.
			weekStart -= 7;
		}
		return Math.floor((this.rd.getRataDie() - weekStart) / 7) + 1;
	}
};

module.exports = IDate;
},{'./LocaleInfo.js':'enyo-ilib/LocaleInfo'}],'enyo-ilib/CalendarFactory':[function (module,exports,global,require,request){
/*
 * CalendarFactory.js - Constructs new instances of the right subclass of Calendar
 * 
 * Copyright © 2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends
ilib.js
Locale.js
LocaleInfo.js
Calendar.js
*/

var ilib = require("./ilib.js");
var Locale = require("./Locale.js");
var LocaleInfo = require("./LocaleInfo.js");
var Calendar = require("./Calendar.js");

/**
 * Factory method to create a new instance of a calendar subclass.<p>
 * 
 * The options parameter can be an object that contains the following
 * properties:
 * 
 * <ul>
 * <li><i>type</i> - specify the type of the calendar desired. The
 * list of valid values changes depending on which calendars are 
 * defined. When assembling your iliball.js, include those calendars 
 * you wish to use in your program or web page, and they will register 
 * themselves with this factory method. The "official", "gregorian",
 * and "julian" calendars are all included by default, as they are the
 * standard calendars for much of the world.
 * <li><i>locale</i> - some calendars vary depending on the locale.
 * For example, the "official" calendar transitions from a Julian-style
 * calendar to a Gregorian-style calendar on a different date for
 * each country, as the governments of those countries decided to
 * adopt the Gregorian calendar at different times.
 *  
 * <li><i>onLoad</i> - a callback function to call when the calendar object is fully 
 * loaded. When the onLoad option is given, the calendar factory will attempt to
 * load any missing locale data using the ilib loader callback.
 * When the constructor is done (even if the data is already preassembled), the 
 * onLoad function is called with the current instance as a parameter, so this
 * callback can be used with preassembled or dynamic loading or a mix of the two.
 * 
 * <li><i>sync</i> - tell whether to load any missing locale data synchronously or 
 * asynchronously. If this option is given as "false", then the "onLoad"
 * callback must be given, as the instance returned from this constructor will
 * not be usable for a while.
 *  
 * <li><i>loadParams</i> - an object containing parameters to pass to the 
 * loader callback function when locale data is missing. The parameters are not
 * interpretted or modified in any way. They are simply passed along. The object 
 * may contain any property/value pairs as long as the calling code is in
 * agreement with the loader callback function as to what those parameters mean.
 * </ul>
 * 
 * If a locale is specified, but no type, then the calendar that is default for
 * the locale will be instantiated and returned. If neither the type nor
 * the locale are specified, then the calendar for the default locale will
 * be used. 
 * 
 * @static
 * @param {Object=} options options controlling the construction of this instance, or
 * undefined to use the default options
 * @return {Calendar} an instance of a calendar object of the appropriate type
 */
var CalendarFactory = function (options) {
	var locale,
		type,
		sync = true,
		instance;

	if (options) {
		if (options.locale) {
			locale = (typeof(options.locale) === 'string') ? new Locale(options.locale) : options.locale;
		}
		
		type = options.type || options.calendar;
		
		if (typeof(options.sync) === 'boolean') {
			sync = options.sync;
		}
	}
	
	if (!locale) {
		locale = new Locale();	// default locale
	}
	
	if (!type) {
		new LocaleInfo(locale, {
			sync: sync,
			loadParams: options && options.loadParams,
			onLoad: ilib.bind(this, function(info) {
				type = info.getCalendar();
				
				instance = CalendarFactory._init(type, options);
				
				if (options && typeof(options.onLoad) === 'function') {
					options.onLoad(instance);
				}
			})
		});
	} else {
		instance = CalendarFactory._init(type, options);
	}
	
	return instance;
};

/**
 * Map calendar names to classes to initialize in the dynamic code model.
 * TODO: Need to figure out some way that this doesn't have to be updated by hand.
 * @private
 */
CalendarFactory._dynMap = {
	"coptic":       "Coptic",
	"ethiopic":     "Ethiopic",
	"gregorian":    "Gregorian",
	"han":          "Han",
	"hebrew":       "Hebrew",
	"islamic":      "Islamic",
	"julian":       "Julian",
	"persian":      "Persian",
	"persian-algo": "PersianAlgo",
	"thaisolar":    "ThaiSolar"
};

/**
 * Dynamically load the code for a calendar and calendar class if necessary.
 * @protected
 */
CalendarFactory._dynLoadCalendar = function (name) {
	if (!Calendar._constructors[name]) {
		var entry = CalendarFactory._dynMap[name];
		if (entry) {
			Calendar._constructors[name] = require("./" + entry + "Cal.js");
		}
	}
	return Calendar._constructors[name];
};

/** @private */
CalendarFactory._init = function(type, options) {
	var cons;
	
	if (ilib.isDynCode()) {
		CalendarFactory._dynLoadCalendar(type);
	}
	
	cons = Calendar._constructors[type];
	
	// pass the same options through to the constructor so the subclass
	// has the ability to do something with if it needs to
	return cons && new cons(options);
};

/**
 * Return an array of known calendar types that the factory method can instantiate.
 * 
 * @return {Array.<string>} an array of calendar types
 */
CalendarFactory.getCalendars = function () {
	var arr = [],
		c;
	
	if (ilib.isDynCode()) {
		for (c in CalendarFactory._dynMap) {
			CalendarFactory._dynLoadCalendar(c);
		}
	}
	
	for (c in Calendar._constructors) {
		if (c && Calendar._constructors[c]) {
			arr.push(c); // code like a pirate
		}
	}
	
	return arr;
};

module.exports = CalendarFactory;
},{'./ilib.js':'enyo-ilib/ilib','./Locale.js':'enyo-ilib/Locale','./LocaleInfo.js':'enyo-ilib/LocaleInfo','./Calendar.js':'enyo-ilib/Calendar'}],'enyo-ilib/ResBundle':[function (module,exports,global,require,request){
/*
 * ResBundle.js - Resource bundle definition
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// !depends ilib.js Locale.js LocaleInfo.js IString.js Utils.js JSUtils.js

// !data pseudomap

var ilib = require("./ilib.js");
var Utils = require("./Utils.js");
var JSUtils = require("./JSUtils.js");

var Locale = require("./Locale.js");
var LocaleInfo = require("./LocaleInfo.js");

var IString = require("./IString.js");

/**
 * @class
 * Create a new resource bundle instance. The resource bundle loads strings
 * appropriate for a particular locale and provides them via the getString 
 * method.<p>
 * 
 * The options object may contain any (or none) of the following properties:
 * 
 * <ul>
 * <li><i>locale</i> - The locale of the strings to load. If not specified, the default
 * locale is the the default for the web page or app in which the bundle is 
 * being loaded.
 * 
 * <li><i>name</i> - Base name of the resource bundle to load. If not specified the default
 * base name is "resources".
 * 
 * <li><i>type</i> - Name the type of strings this bundle contains. Valid values are 
 * "xml", "html", "text", or "raw". The default is "text". If the type is "xml" or "html",
 * then XML/HTML entities and tags are not pseudo-translated. During a real translation, 
 * HTML character entities are translated to their corresponding characters in a source
 * string before looking that string up in the translations. Also, the characters "<", ">",
 * and "&" are converted to entities again in the output, but characters are left as they
 * are. If the type is "xml", "html", or "text" types, then the replacement parameter names
 * are not pseudo-translated as well so that the output can be used for formatting with 
 * the IString class. If the type is raw, all characters are pseudo-translated, 
 * including replacement parameters as well as XML/HTML tags and entities.
 * 
 * <li><i>lengthen</i> - when pseudo-translating the string, tell whether or not to 
 * automatically lengthen the string to simulate "long" languages such as German
 * or French. This is a boolean value. Default is false.
 * 
 * <li><i>missing</i> - what to do when a resource is missing. The choices are:
 * <ul>
 *   <li><i>source</i> - return the source string unchanged
 *   <li><i>pseudo</i> - return the pseudo-translated source string, translated to the
 *   script of the locale if the mapping is available, or just the default Latin 
 *   pseudo-translation if not
 *   <li><i>empty</i> - return the empty string 
 * </ul>
 * The default behaviour is the same as before, which is to return the source string
 * unchanged.
 * 
 * <li><i>onLoad</i> - a callback function to call when the resources are fully 
 * loaded. When the onLoad option is given, this class will attempt to
 * load any missing locale data using the ilib loader callback.
 * When the constructor is done (even if the data is already preassembled), the 
 * onLoad function is called with the current instance as a parameter, so this
 * callback can be used with preassembled or dynamic loading or a mix of the two. 
 * 
 * <li>sync - tell whether to load any missing locale data synchronously or 
 * asynchronously. If this option is given as "false", then the "onLoad"
 * callback must be given, as the instance returned from this constructor will
 * not be usable for a while. 
 *
 * <li><i>loadParams</i> - an object containing parameters to pass to the 
 * loader callback function when locale data is missing. The parameters are not
 * interpretted or modified in any way. They are simply passed along. The object 
 * may contain any property/value pairs as long as the calling code is in
 * agreement with the loader callback function as to what those parameters mean.
 * </ul>
 * 
 * The locale option may be given as a locale spec string or as an 
 * Locale object. If the locale option is not specified, then strings for
 * the default locale will be loaded.<p> 
 * 
 * The name option can be used to put groups of strings together in a
 * single bundle. The strings will then appear together in a JS object in
 * a JS file that can be included before the ilib.<p>
 * 
 * A resource bundle with a particular name is actually a set of bundles
 * that are each specific to a language, a language plus a region, etc. 
 * All bundles with the same base name should
 * contain the same set of source strings, but with different translations for 
 * the given locale. The user of the bundle does not need to be aware of 
 * the locale of the bundle, as long as it contains values for the strings 
 * it needs.<p>
 * 
 * Strings in bundles for a particular locale are inherited from parent bundles
 * that are more generic. In general, the hierarchy is as follows (from 
 * least locale-specific to most locale-specific):
 * 
 * <ol>
 * <li> language
 * <li> region
 * <li> language_script
 * <li> language_region
 * <li> region_variant
 * <li> language_script_region
 * <li> language_region_variant
 * <li> language_script_region_variant
 * </ol>
 * 
 * That is, if the translation for a string does not exist in the current
 * locale, the more-generic parent locale is searched for the string. In the
 * worst case scenario, the string is not found in the base locale's strings. 
 * In this case, the missing option guides this class on what to do. If
 * the missing option is "source", then the original source is returned as 
 * the translation. If it is "empty", the empty string is returned. If it
 * is "pseudo", then the pseudo-translated string that is appropriate for
 * the default script of the locale is returned.<p> 
 * 
 * This allows developers to create code with new or changed strings in it and check in that
 * code without waiting for the translations to be done first. The translated
 * version of the app or web site will still function properly, but will show 
 * a spurious untranslated string here and there until the translations are 
 * done and also checked in.<p>   
 *  
 * The base is whatever language your developers use to code in. For
 * a German web site, strings in the source code may be written in German 
 * for example. Often this base is English, as many web sites are coded in
 * English, but that is not required.<p>
 * 
 * The strings can be extracted with the ilib localization tool (which will be
 * shipped at some future time.) Once the strings
 * have been translated, the set of translated files can be generated with the
 * same tool. The output from the tool can be used as input to the ResBundle
 * object. It is up to the web page or app to make sure the JS file that defines
 * the bundle is included before creating the ResBundle instance.<p>
 * 
 * A special locale "zxx-XX" is used as the pseudo-translation locale because
 * zxx means "no linguistic information" in the ISO 639 standard, and the region 
 * code XX is defined to be user-defined in the ISO 3166 standard. 
 * Pseudo-translation is a locale where the translations are generated on
 * the fly based on the contents of the source string. Characters in the source 
 * string are replaced with other characters and returned. 
 * 
 * Example. If the source string is:
 * 
 * <pre>
 * "This is a string"
 * </pre>
 * 
 * then the pseudo-translated version might look something like this: 
 * 
 * <pre>
 * "Ţħïş ïş á şţřïñĝ"
 * </pre>
 * <p>
 * 
 * Pseudo-translation can be used to test that your app or web site is translatable
 * before an actual translation has happened. These bugs can then be fixed 
 * before the translation starts, avoiding an explosion of bugs later when
 * each language's tester registers the same bug complaining that the same 
 * string is not translated. When pseudo-localizing with
 * the Latin script, this allows the strings to be readable in the UI in the 
 * source language (if somewhat funky-looking), 
 * so that a tester can easily verify that the string is properly externalized 
 * and loaded from a resource bundle without the need to be able to read a
 * foreign language.<p> 
 * 
 * If one of a list of script tags is given in the pseudo-locale specifier, then the
 * pseudo-localization can map characters to very rough transliterations of
 * characters in the given script. For example, zxx-Hebr-XX maps strings to
 * Hebrew characters, which can be used to test your UI in a right-to-left
 * language to catch bidi bugs before a translation is done. Currently, the
 * list of target scripts includes Hebrew (Hebr), Chinese Simplified Han (Hans),
 * and Cyrillic (Cyrl) with more to be added later. If no script is explicitly
 * specified in the locale spec, or if the script is not supported,
 * then the default mapping maps Latin base characters to accented versions of
 * those Latin characters as in the example above.
 *  
 * When the "lengthen" property is set to true in the options, the 
 * pseudotranslation code will add digits to the end of the string to simulate
 * the lengthening that occurs when translating to other languages. The above 
 * example will come out like this:
 * 
 * <pre>
 * "Ţħïş ïş á şţřïñĝ76543210"
 * </pre>
 * 
 * The string is lengthened according to the length of the source string. If
 * the source string is less than 20 characters long, the string is lengthened 
 * by 50%. If the source string is 20-40 
 * characters long, the string is lengthened by 33%. If te string is greater
 * than 40 characters long, the string is lengthened by 20%.<p>
 * 
 * The pseudotranslation always ends a string with the digit "0". If you do
 * not see the digit "0" in the UI for your app, you know that truncation
 * has occurred, and the number you see at the end of the string tells you 
 * how many characters were truncated.<p>
 * 
 * 
 * @constructor
 * @param {?Object} options Options controlling how the bundle is created
 */
var ResBundle = function (options) {
	var lookupLocale, spec;
	
	this.locale = new Locale();	// use the default locale
	this.baseName = "strings";
	this.type = "text";
	this.loadParams = {};
	this.missing = "source";
	this.sync = true;
	
	if (options) {
		if (options.locale) {
			this.locale = (typeof(options.locale) === 'string') ? 
					new Locale(options.locale) :
					options.locale;
		}
		if (options.name) {
			this.baseName = options.name;
		}
		if (options.type) {
			this.type = options.type;
		}
		this.lengthen = options.lengthen || false;
		
		if (typeof(options.sync) !== 'undefined') {
			this.sync = (options.sync == true);
		}
		
		if (typeof(options.loadParams) !== 'undefined') {
			this.loadParams = options.loadParams;
		}
		if (typeof(options.missing) !== 'undefined') {
			if (options.missing === "pseudo" || options.missing === "empty") {
				this.missing = options.missing;
			}
		}
	} else {
		options = {};
	}
	
	this.map = {};

	if (!ResBundle[this.baseName]) {
		ResBundle[this.baseName] = {};
	}

	lookupLocale = this.locale.isPseudo() ? new Locale("en-US") : this.locale;

	Utils.loadData({
		object: ResBundle[this.baseName], 
		locale: lookupLocale, 
		name: this.baseName + ".json", 
		sync: this.sync, 
		loadParams: this.loadParams, 
		callback: ilib.bind(this, function (map) {
			if (!map) {
				map = ilib.data[this.baseName] || {};
				spec = lookupLocale.getSpec().replace(/-/g, '_');
				ResBundle[this.baseName].cache[spec] = map;
			}
			this.map = map;
			if (this.locale.isPseudo()) {
				if (!ResBundle.pseudomap) {
					ResBundle.pseudomap = {};
				}
	
				this._loadPseudo(this.locale, options.onLoad);
			} else if (this.missing === "pseudo") {
				if (!ResBundle.pseudomap) {
					ResBundle.pseudomap = {};
				}
	
				new LocaleInfo(this.locale, {
					sync: this.sync,
					loadParams: this.loadParams,
					onLoad: ilib.bind(this, function (li) {
						var pseudoLocale = new Locale("zxx", "XX", undefined, li.getDefaultScript());
						this._loadPseudo(pseudoLocale, options.onLoad);
					})
				});
			} else {
				if (typeof(options.onLoad) === 'function') {
					options.onLoad(this);
				}
			}
		})
	});

	// console.log("Merged resources " + this.locale.toString() + " are: " + JSON.stringify(this.map));
	//if (!this.locale.isPseudo() && JSUtils.isEmpty(this.map)) {
	//	console.log("Resources for bundle " + this.baseName + " locale " + this.locale.toString() + " are not available.");
	//}
};

ResBundle.defaultPseudo = ilib.data.pseudomap || {
	"a": "à",
	"e": "ë",
	"i": "í",
	"o": "õ",
	"u": "ü",
	"y": "ÿ",
	"A": "Ã",
	"E": "Ë",
	"I": "Ï",
	"O": "Ø",
	"U": "Ú",
	"Y": "Ŷ"
};

ResBundle.prototype = {
    /**
     * @protected
     */
    _loadPseudo: function (pseudoLocale, onLoad) {
		Utils.loadData({
			object: ResBundle.pseudomap, 
			locale: pseudoLocale, 
			name: "pseudomap.json", 
			sync: this.sync, 
			loadParams: this.loadParams, 
			callback: ilib.bind(this, function (map) {
				if (!map || JSUtils.isEmpty(map)) {
					map = ResBundle.defaultPseudo;
					var spec = pseudoLocale.getSpec().replace(/-/g, '_');
					ResBundle.pseudomap.cache[spec] = map;
				}
				this.pseudomap = map;
				if (typeof(onLoad) === 'function') {
					onLoad(this);
				}	
			})
		});
    },
    
	/**
	 * Return the locale of this resource bundle.
	 * @return {Locale} the locale of this resource bundle object 
	 */
	getLocale: function () {
		return this.locale;
	},
	
	/**
	 * Return the name of this resource bundle. This corresponds to the name option
	 * given to the constructor.
	 * @return {string} name of the the current instance
	 */
	getName: function () {
		return this.baseName;
	},
	
	/**
	 * Return the type of this resource bundle. This corresponds to the type option
	 * given to the constructor.
	 * @return {string} type of the the current instance
	 */
	getType: function () {
		return this.type;
	},

	/*
	 * @private
	 * Pseudo-translate a string
	 */
	pseudo: function (str) {
		if (!str) {
			return undefined;
		}
		var ret = "", i;
		for (i = 0; i < str.length; i++) {
			if (this.type !== "raw") {
				if (this.type === "html" || this.type === "xml") {
					if (str.charAt(i) === '<') {
						ret += str.charAt(i++);
						while (i < str.length && str.charAt(i) !== '>') {
							ret += str.charAt(i++);
						}
						if (i < str.length) {
							ret += str.charAt(i++);
						}
					} else if (str.charAt(i) === '&') {
						ret += str.charAt(i++);
						while (i < str.length && str.charAt(i) !== ';' && str.charAt(i) !== ' ') {
							ret += str.charAt(i++);
						}
						if (i < str.length) {
							ret += str.charAt(i++);
						}
					}
				}
				if (i < str.length) { 
					if (str.charAt(i) === '{') {
						ret += str.charAt(i++);
						while (i < str.length && str.charAt(i) !== '}') {
							ret += str.charAt(i++);
						}
						if (i < str.length) {
							ret += str.charAt(i);
						}
					} else {
						ret += this.pseudomap[str.charAt(i)] || str.charAt(i);
					}
				}
			} else {
				ret += this.pseudomap[str.charAt(i)] || str.charAt(i);
			}
		}
		if (this.lengthen) {
			var add;
			if (ret.length <= 20) {
				add = Math.round(ret.length / 2);
			} else if (ret.length > 20 && ret.length <= 40) {
				add = Math.round(ret.length / 3);
			} else {
				add = Math.round(ret.length / 5);
			}
			for (i = add-1; i >= 0; i--) {
				ret += (i % 10);
			}
		}
		if (this.locale.getScript() === "Hans" || this.locale.getScript() === "Hant" ||
				this.locale.getScript() === "Hani" ||
				this.locale.getScript() === "Hrkt" || this.locale.getScript() === "Jpan" ||
				this.locale.getScript() === "Hira" || this.locale.getScript() === "Kana" ) {
			// simulate Asian languages by getting rid of all the spaces
			ret = ret.replace(/ /g, "");
		}
		return ret;
	},
	
	/*
	 * @private
	 * Escape html characters in the output.
	 */
	escapeXml: function (str) {
		str = str.replace(/&/g, '&amp;');
		str = str.replace(/</g, '&lt;');
		str = str.replace(/>/g, '&gt;');
		return str;
	},

	/*
	 * @private
	 * @param {string} str the string to unescape
	 */
	unescapeXml: function (str) {
		str = str.replace(/&amp;/g, '&');
		str = str.replace(/&lt;/g, '<');
		str = str.replace(/&gt;/g, '>');
		return str;
	},
	
	/*
	 * @private
	 * Create a key name out of a source string. All this does so far is 
	 * compress sequences of white space into a single space on the assumption
	 * that this doesn't really change the meaning of the string, and therefore
	 * all such strings that compress to the same thing should share the same
	 * translation.
	 * @param {string} source the source string to make a key out of
	 */
	makeKey: function (source) {
		var key = source.replace(/\s+/gm, ' ');
		return (this.type === "xml" || this.type === "html") ? this.unescapeXml(key) : key;
	},
	
	/**
	 * Return a localized string. If the string is not found in the loaded set of
	 * resources, the original source string is returned. If the key is not given,
	 * then the source string itself is used as the key. In the case where the 
	 * source string is used as the key, the whitespace is compressed down to 1 space
	 * each, and the whitespace at the beginning and end of the string is trimmed.<p>
	 * 
	 * The escape mode specifies what type of output you are escaping the returned
	 * string for. Modes are similar to the types: 
	 * 
	 * <ul>
	 * <li>"html" -- prevents HTML injection by escaping the characters &lt &gt; and &amp;
	 * <li>"xml" -- currently same as "html" mode
	 * <li>"js" -- prevents breaking Javascript syntax by backslash escaping all quote and 
	 * double-quote characters
	 * <li>"attribute" -- meant for HTML attribute values. Currently this is the same as
	 * "js" escape mode.
	 * <li>"default" -- use the type parameter from the constructor as the escape mode as well
	 * <li>"none" or undefined -- no escaping at all.
	 * </ul>
	 * 
	 * The type parameter of the constructor specifies what type of strings this bundle
	 * is operating upon. This allows pseudo-translation and automatic key generation
	 * to happen properly by telling this class how to parse the string. The escape mode 
	 * for this method is different in that it specifies how this string will be used in 
	 * the calling code and therefore how to escape it properly.<p> 
	 * 
	 * For example, a section of Javascript code may be constructing an HTML snippet in a 
	 * string to add to the web page. In this case, the type parameter in the constructor should
	 * be "html" so that the source string can be parsed properly, but the escape mode should
	 * be "js" so that the output string can be used in Javascript without causing syntax
	 * errors.
	 * 
	 * @param {?string=} source the source string to translate
	 * @param {?string=} key optional name of the key, if any
	 * @param {?string=} escapeMode escape mode, if any
	 * @return {IString|undefined} the translation of the given source/key or undefined 
	 * if the translation is not found and the source is undefined 
	 */
	getString: function (source, key, escapeMode) {
		if (!source && !key) return new IString("");

		var trans;
		if (this.locale.isPseudo()) {
			var str = source ? source : this.map[key];
			trans = this.pseudo(str || key);
		} else {
			var keyName = key || this.makeKey(source);
			if (typeof(this.map[keyName]) !== 'undefined') {
				trans = this.map[keyName];
			} else if (this.missing === "pseudo") {
				trans = this.pseudo(source || key);
			} else if (this.missing === "empty") {
				trans = "";
			} else {
				trans = source;
			}
		}

		if (escapeMode && escapeMode !== "none") {
			if (escapeMode == "default") {
				escapeMode = this.type;
			}
			if (escapeMode === "xml" || escapeMode === "html") {
				trans = this.escapeXml(trans);
			} else if (escapeMode == "js" || escapeMode === "attribute") {
				trans = trans.replace(/'/g, "\\\'").replace(/"/g, "\\\"");
			}
		}
		if (trans === undefined) {
			return undefined;
		} else {
			var ret = new IString(trans);
			ret.setLocale(this.locale.getSpec(), true, this.loadParams); // no callback
			return ret;
		}
	},
	
	/**
	 * Return a localized string as a Javascript object. This does the same thing as
	 * the getString() method, but it returns a regular Javascript string instead of
	 * and IString instance. This means it cannot be formatted with the format()
	 * method without being wrapped in an IString instance first.
	 * 
	 * @param {?string=} source the source string to translate
	 * @param {?string=} key optional name of the key, if any
	 * @param {?string=} escapeMode escape mode, if any
	 * @return {string|undefined} the translation of the given source/key or undefined 
	 * if the translation is not found and the source is undefined
	 */
	getStringJS: function(source, key, escapeMode) {
		return this.getString(source, key, escapeMode).toString();
	},
	
	/**
	 * Return true if the current bundle contains a translation for the given key and
	 * source. The
	 * getString method will always return a string for any given key and source 
	 * combination, so it cannot be used to tell if a translation exists. Either one
	 * or both of the source and key must be specified. If both are not specified,
	 * this method will return false.
	 * 
	 * @param {?string=} source source string to look up
	 * @param {?string=} key key to look up
	 * @return {boolean} true if this bundle contains a translation for the key, and 
	 * false otherwise
	 */
	containsKey: function(source, key) {
		if (typeof(source) === 'undefined' && typeof(key) === 'undefined') {
			return false;
		}
		
		var keyName = key || this.makeKey(source);
		return typeof(this.map[keyName]) !== 'undefined';
	},
	
	/**
	 * Return the merged resources as an entire object. When loading resources for a
	 * locale that are not just a set of translated strings, but instead an entire 
	 * structured javascript object, you can gain access to that object via this call. This method
	 * will ensure that all the of the parts of the object are correct for the locale.<p>
	 * 
	 * For pre-assembled data, it starts by loading <i>ilib.data[name]</i>, where 
	 * <i>name</i> is the base name for this set of resources. Then, it successively 
	 * merges objects in the base data using progressively more locale-specific data. 
	 * It loads it in this order from <i>ilib.data</i>:
	 * 
	 * <ol>
	 * <li> language
	 * <li> region
	 * <li> language_script
	 * <li> language_region
	 * <li> region_variant
	 * <li> language_script_region
	 * <li> language_region_variant
	 * <li> language_script_region_variant
	 * </ol>
	 * 
	 * For dynamically loaded data, the code attempts to load the same sequence as
	 * above, but with slash path separators instead of underscores.<p>
	 *  
	 * Loading the resources this way allows the program to share resources between all
	 * locales that share a common language, region, or script. As a 
	 * general rule-of-thumb, resources should be as generic as possible in order to
	 * cover as many locales as possible.
	 * 
	 * @return {Object} returns the object that is the basis for this resources instance
	 */
	getResObj: function () {
		return this.map;
	}
};

module.exports = ResBundle;
},{'./ilib.js':'enyo-ilib/ilib','./Utils.js':'enyo-ilib/Utils','./JSUtils.js':'enyo-ilib/JSUtils','./Locale.js':'enyo-ilib/Locale','./LocaleInfo.js':'enyo-ilib/LocaleInfo','./IString.js':'enyo-ilib/IString'}],'enyo-ilib/CaseMapper':[function (module,exports,global,require,request){
/*
 * caseMapper.js - define upper- and lower-case mapper
 * 
 * Copyright © 2014-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// !depends Locale.js IString.js

var ilib = require("./ilib.js");

var Locale = require("./Locale.js");
var IString = require("./IString.js");

/**
 * @class
 * Create a new string mapper instance that maps strings to upper or
 * lower case. This mapping will work for any string as characters 
 * that have no case will be returned unchanged.<p>
 * 
 * The options may contain any of the following properties:
 * 
 * <ul>
 * <li><i>locale</i> - locale to use when loading the mapper. Some maps are 
 * locale-dependent, and this locale selects the right one. Default if this is
 * not specified is the current locale.
 * 
 * <li><i>direction</i> - "toupper" for upper-casing, or "tolower" for lower-casing.
 * Default if not specified is "toupper".
 * </ul>
 * 
 * 
 * @constructor
 * @param {Object=} options options to initialize this mapper 
 */
var CaseMapper = function (options) {
	this.up = true;
	this.locale = new Locale();
	
	if (options) {
		if (typeof(options.locale) !== 'undefined') {
			this.locale = (typeof(options.locale) === 'string') ? new Locale(options.locale) : options.locale;
		}
		
		this.up = (!options.direction || options.direction === "toupper");
	}

	this.mapData = this.up ? {
		"ß": "SS",		// German
		'ΐ': 'Ι',		// Greek
		'ά': 'Α',
		'έ': 'Ε',
		'ή': 'Η',
		'ί': 'Ι',
		'ΰ': 'Υ',
		'ϊ': 'Ι',
		'ϋ': 'Υ',
		'ό': 'Ο',
		'ύ': 'Υ',
		'ώ': 'Ω',
		'Ӏ': 'Ӏ',		// Russian and slavic languages
		'ӏ': 'Ӏ'
	} : {
		'Ӏ': 'Ӏ'		// Russian and slavic languages
	};

	switch (this.locale.getLanguage()) {
		case "az":
		case "tr":
		case "crh":
		case "kk":
		case "krc":
		case "tt":
			var lower = "iı";
			var upper = "İI";
			this._setUpMap(lower, upper);
			break;
		case "fr":
			if (this.up && this.locale.getRegion() !== "CA") {
				this._setUpMap("àáâãäçèéêëìíîïñòóôöùúûü", "AAAAACEEEEIIIINOOOOUUUU");
			}
			break;
	}
	
	if (ilib._getBrowser() === "ie") {
		// IE is missing these mappings for some reason
		if (this.up) {
			this.mapData['ς'] = 'Σ';
		}
		this._setUpMap("ⲁⲃⲅⲇⲉⲋⲍⲏⲑⲓⲕⲗⲙⲛⲝⲟⲡⲣⲥⲧⲩⲫⲭⲯⲱⳁⳉⳋ", "ⲀⲂⲄⲆⲈⲊⲌⲎⲐⲒⲔⲖⲘⲚⲜⲞⲠⲢⲤⲦⲨⲪⲬⲮⲰⳀⳈⳊ"); // Coptic
		// Georgian Nuskhuri <-> Asomtavruli
		this._setUpMap("ⴀⴁⴂⴃⴄⴅⴆⴇⴈⴉⴊⴋⴌⴍⴎⴏⴐⴑⴒⴓⴔⴕⴖⴗⴘⴙⴚⴛⴜⴝⴞⴟⴠⴡⴢⴣⴤⴥ", "ႠႡႢႣႤႥႦႧႨႩႪႫႬႭႮႯႰႱႲႳႴႵႶႷႸႹႺႻႼႽႾႿჀჁჂჃჄჅ");	
	}
};

CaseMapper.prototype = {
	/** 
	 * @private 
	 */
	_charMapper: function(string) {
		if (!string) {
			return string;
		}
		var input = (typeof(string) === 'string') ? new IString(string) : string.toString();
		var ret = "";
		var it = input.charIterator();
		var c;
		
		while (it.hasNext()) {
			c = it.next();
			if (!this.up && c === 'Σ') {
				if (it.hasNext()) {
					c = it.next();
					var code = c.charCodeAt(0);
					// if the next char is not a greek letter, this is the end of the word so use the
					// final form of sigma. Otherwise, use the mid-word form.
					ret += ((code < 0x0388 && code !== 0x0386) || code > 0x03CE) ? 'ς' : 'σ';
					ret += c.toLowerCase();
				} else {
					// no next char means this is the end of the word, so use the final form of sigma
					ret += 'ς';
				}
			} else {
				if (this.mapData[c]) {
					ret += this.mapData[c];
				} else {
					ret += this.up ? c.toUpperCase() : c.toLowerCase();
				}
			}
		}
		
		return ret;
	},

	/** @private */
	_setUpMap: function(lower, upper) {
		var from, to;
		if (this.up) {
			from = lower;
			to = upper;
		} else {
			from = upper;
			to = lower;
		}
		for (var i = 0; i < upper.length; i++) {
			this.mapData[from[i]] = to[i];
		}
	},

	/**
	 * Return the locale that this mapper was constructed with. 
	 * @returns {Locale} the locale that this mapper was constructed with
	 */
	getLocale: function () {
		return this.locale;
	},
		
	/**
	 * Map a string to lower case in a locale-sensitive manner.
	 * 
	 * @param {string|undefined} string
	 * @return {string|undefined}
	 */
	map: function (string) {
		return this._charMapper(string);
	}
};

module.exports = CaseMapper;
},{'./ilib.js':'enyo-ilib/ilib','./Locale.js':'enyo-ilib/Locale','./IString.js':'enyo-ilib/IString'}],'enyo-ilib/CType':[function (module,exports,global,require,request){
/*
 * CType.js - Character type definitions
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// !depends ilib.js Locale.js SearchUtils.js Utils.js IString.js

// !data ctype

var ilib = require("./ilib.js");
var SearchUtils = require("./SearchUtils.js");
var Utils = require("./Utils.js");
var Locale = require("./Locale.js");
var IString = require("./IString.js");

/**
 * Provides a set of static routines that return information about characters.
 * These routines emulate the C-library ctype functions. The characters must be 
 * encoded in utf-16, as no other charsets are currently supported. Only the first
 * character of the given string is tested.
 * @namespace
 */
var CType = {};


/**
 * Actual implementation for withinRange. Searches the given object for ranges.
 * The range names are taken from the Unicode range names in 
 * http://www.unicode.org/Public/UNIDATA/extracted/DerivedGeneralCategory.txt
 * 
 * <ul>
 * <li>Cn - Unassigned
 * <li>Lu - Uppercase_Letter
 * <li>Ll - Lowercase_Letter
 * <li>Lt - Titlecase_Letter
 * <li>Lm - Modifier_Letter
 * <li>Lo - Other_Letter
 * <li>Mn - Nonspacing_Mark
 * <li>Me - Enclosing_Mark
 * <li>Mc - Spacing_Mark
 * <li>Nd - Decimal_Number
 * <li>Nl - Letter_Number
 * <li>No - Other_Number
 * <li>Zs - Space_Separator
 * <li>Zl - Line_Separator
 * <li>Zp - Paragraph_Separator
 * <li>Cc - Control
 * <li>Cf - Format
 * <li>Co - Private_Use
 * <li>Cs - Surrogate
 * <li>Pd - Dash_Punctuation
 * <li>Ps - Open_Punctuation
 * <li>Pe - Close_Punctuation
 * <li>Pc - Connector_Punctuation
 * <li>Po - Other_Punctuation
 * <li>Sm - Math_Symbol
 * <li>Sc - Currency_Symbol
 * <li>Sk - Modifier_Symbol
 * <li>So - Other_Symbol
 * <li>Pi - Initial_Punctuation
 * <li>Pf - Final_Punctuation
 * </ul>
 * 
 * @protected
 * @param {number} num code point of the character to examine
 * @param {string} rangeName the name of the range to check
 * @param {Object} obj object containing the character range data
 * @return {boolean} true if the first character is within the named
 * range
 */
CType._inRange = function(num, rangeName, obj) {
	var range, i;
	if (num < 0 || !rangeName || !obj) {
		return false;
	}
	
	range = obj[rangeName];
	if (!range) {
		return false;
	}
	
	var compare = function(singlerange, target) {
		if (singlerange.length === 1) {
			return singlerange[0] - target;
		} else {
			return target < singlerange[0] ? singlerange[0] - target :
				(target > singlerange[1] ? singlerange[1] - target : 0);
		}
	};
	var result = SearchUtils.bsearch(num, range, compare);
	return result < range.length && compare(range[result], num) === 0;
};

/**
 * Return whether or not the first character is within the named range
 * of Unicode characters. The valid list of range names are taken from 
 * the Unicode 6.0 spec. Characters in all ranges of Unicode are supported,
 * including those supported in Javascript via UTF-16. Currently, this method 
 * supports the following range names:
 * 
 * <ul>
 * <li><i>ascii</i> - basic ASCII
 * <li><i>latin</i> - Latin, Latin Extended Additional, Latin Extended-C, Latin Extended-D
 * <li><i>armenian</i>
 * <li><i>greek</i> - Greek, Greek Extended
 * <li><i>cyrillic</i> - Cyrillic, Cyrillic Extended-A, Cyrillic Extended-B
 * <li><i>georgian</i> - Georgian, Georgian Supplement
 * <li><i>glagolitic</i>
 * <li><i>gothic</i>
 * <li><i>ogham</i>
 * <li><i>oldpersian</i>
 * <li><i>runic</i>
 * <li><i>ipa</i> - IPA, Phonetic Extensions, Phonetic Extensions Supplement
 * <li><i>phonetic</i>
 * <li><i>modifiertone</i> - Modifier Tone Letters
 * <li><i>spacing</i>
 * <li><i>diacritics</i>
 * <li><i>halfmarks</i> - Combining Half Marks
 * <li><i>small</i> - Small Form Variants
 * <li><i>bamum</i> - Bamum, Bamum Supplement
 * <li><i>ethiopic</i> - Ethiopic, Ethiopic Extended, Ethiopic Extended-A
 * <li><i>nko</i>
 * <li><i>osmanya</i>
 * <li><i>tifinagh</i>
 * <li><i>val</i>
 * <li><i>arabic</i> - Arabic, Arabic Supplement, Arabic Presentation Forms-A, 
 * Arabic Presentation Forms-B
 * <li><i>carlan</i>
 * <li><i>hebrew</i>
 * <li><i>mandaic</i>
 * <li><i>samaritan</i>
 * <li><i>syriac</i>
 * <li><i>mongolian</i>
 * <li><i>phagspa</i>
 * <li><i>tibetan</i>
 * <li><i>bengali</i>
 * <li><i>devanagari</i> - Devanagari, Devanagari Extended
 * <li><i>gujarati</i>
 * <li><i>gurmukhi</i>
 * <li><i>kannada</i>
 * <li><i>lepcha</i>
 * <li><i>limbu</i>
 * <li><i>malayalam</i>
 * <li><i>meetaimayek</i>
 * <li><i>olchiki</i>
 * <li><i>oriya</i>
 * <li><i>saurashtra</i>
 * <li><i>sinhala</i>
 * <li><i>sylotinagri</i> - Syloti Nagri
 * <li><i>tamil</i>
 * <li><i>telugu</i>
 * <li><i>thaana</i>
 * <li><i>vedic</i>
 * <li><i>batak</i>
 * <li><i>balinese</i>
 * <li><i>buginese</i>
 * <li><i>cham</i>
 * <li><i>javanese</i>
 * <li><i>kayahli</i>
 * <li><i>khmer</i>
 * <li><i>lao</i>
 * <li><i>myanmar</i> - Myanmar, Myanmar Extended-A
 * <li><i>newtailue</i>
 * <li><i>rejang</i>
 * <li><i>sundanese</i>
 * <li><i>taile</i>
 * <li><i>taitham</i>
 * <li><i>taiviet</i>
 * <li><i>thai</i>
 * <li><i>buhld</i>
 * <li><i>hanunoo</i>
 * <li><i>tagalog</i>
 * <li><i>tagbanwa</i>
 * <li><i>bopomofo</i> - Bopomofo, Bopomofo Extended
 * <li><i>cjk</i> - the CJK unified ideographs (Han), CJK Unified Ideographs
 *  Extension A, CJK Unified Ideographs Extension B, CJK Unified Ideographs 
 *  Extension C, CJK Unified Ideographs Extension D, Ideographic Description 
 *  Characters (=isIdeo())
 * <li><i>cjkcompatibility</i> - CJK Compatibility, CJK Compatibility 
 * Ideographs, CJK Compatibility Forms, CJK Compatibility Ideographs Supplement
 * <li><i>cjkradicals</i> - the CJK radicals, KangXi radicals
 * <li><i>hangul</i> - Hangul Jamo, Hangul Syllables, Hangul Jamo Extended-A, 
 * Hangul Jamo Extended-B, Hangul Compatibility Jamo
 * <li><i>cjkpunct</i> - CJK symbols and punctuation
 * <li><i>cjkstrokes</i> - CJK strokes
 * <li><i>hiragana</i>
 * <li><i>katakana</i> - Katakana, Katakana Phonetic Extensions, Kana Supplement
 * <li><i>kanbun</i>
 * <li><i>lisu</i>
 * <li><i>yi</i> - Yi Syllables, Yi Radicals
 * <li><i>cherokee</i>
 * <li><i>canadian</i> - Unified Canadian Aboriginal Syllabics, Unified Canadian 
 * Aboriginal Syllabics Extended
 * <li><i>presentation</i> - Alphabetic presentation forms
 * <li><i>vertical</i> - Vertical Forms
 * <li><i>width</i> - Halfwidth and Fullwidth Forms
 * <li><i>punctuation</i> - General punctuation, Supplemental Punctuation
 * <li><i>box</i> - Box Drawing
 * <li><i>block</i> - Block Elements
 * <li><i>letterlike</i> - Letterlike symbols
 * <li><i>mathematical</i> - Mathematical alphanumeric symbols, Miscellaneous 
 * Mathematical Symbols-A, Miscellaneous Mathematical Symbols-B
 * <li><i>enclosedalpha</i> - Enclosed alphanumerics, Enclosed Alphanumeric Supplement
 * <li><i>enclosedcjk</i> - Enclosed CJK letters and months, Enclosed Ideographic Supplement
 * <li><i>cjkcompatibility</i> - CJK compatibility
 * <li><i>apl</i> - APL symbols
 * <li><i>controlpictures</i> - Control pictures
 * <li><i>misc</i> - Miscellaneous technical
 * <li><i>ocr</i> - Optical character recognition (OCR)
 * <li><i>combining</i> - Combining Diacritical Marks, Combining Diacritical Marks 
 * for Symbols, Combining Diacritical Marks Supplement
 * <li><i>digits</i> - ASCII digits (=isDigit())
 * <li><i>indicnumber</i> - Common Indic Number Forms
 * <li><i>numbers</i> - Number dorms
 * <li><i>supersub</i> - Super- and subscripts
 * <li><i>arrows</i> - Arrows, Miscellaneous Symbols and Arrows, Supplemental Arrows-A,
 * Supplemental Arrows-B
 * <li><i>operators</i> - Mathematical operators, supplemental 
 * mathematical operators 
 * <li><i>geometric</i> - Geometric shapes
 * <li><i>ancient</i> - Ancient symbols
 * <li><i>braille</i> - Braille patterns
 * <li><i>currency</i> - Currency symbols
 * <li><i>dingbats</i>
 * <li><i>gamesymbols</i>
 * <li><i>yijing</i> - Yijing Hexagram Symbols
 * <li><i>specials</i>
 * <li><i>variations</i> - Variation Selectors, Variation Selectors Supplement
 * <li><i>privateuse</i> - Private Use Area, Supplementary Private Use Area-A, 
 * Supplementary Private Use Area-B
 * <li><i>supplementarya</i> - Supplementary private use area-A
 * <li><i>supplementaryb</i> - Supplementary private use area-B
 * <li><i>highsurrogates</i> - High Surrogates, High Private Use Surrogates
 * <li><i>lowsurrogates</i>
 * <li><i>reserved</i>
 * <li><i>noncharacters</i>
 * </ul><p>
 * 
 * 
 * @protected
 * @param {string|IString|number} ch character or code point to examine
 * @param {string} rangeName the name of the range to check
 * @return {boolean} true if the first character is within the named
 * range
 */
CType.withinRange = function(ch, rangeName) {
	if (!rangeName) {
		return false;
	}
	var num;
	switch (typeof(ch)) {
		case 'number':
			num = ch;
			break;
		case 'string':
			num = IString.toCodePoint(ch, 0);
			break;
		case 'undefined':
			return false;
		default:
			num = ch._toCodePoint(0);
			break;
	}

	return CType._inRange(num, rangeName.toLowerCase(), ilib.data.ctype);
};

/**
 * @protected
 * @param {boolean} sync
 * @param {Object|undefined} loadParams
 * @param {function(*)|undefined} onLoad
 */
CType._init = function(sync, loadParams, onLoad) {
	CType._load("ctype", sync, loadParams, onLoad);
};

/**
 * @protected
 * @param {string} name
 * @param {boolean} sync
 * @param {Object|undefined} loadParams
 * @param {function(*)|undefined} onLoad
 */
CType._load = function (name, sync, loadParams, onLoad) {
	if (!ilib.data[name]) {
		var loadName = name ? name + ".json" : "CType.json";
		Utils.loadData({
			name: loadName,
			locale: "-",
			nonlocale: true,
			sync: sync,
			loadParams: loadParams, 
			callback: /** @type function(Object=):undefined */ ilib.bind(this, /** @type function() */ function(ct) {
				ilib.data[name] = ct;
				if (onLoad && typeof(onLoad) === 'function') {
					onLoad(ilib.data[name]);
				}
			})
		});
	} else {
		if (onLoad && typeof(onLoad) === 'function') {
			onLoad(ilib.data[name]);
		}
	}
};

module.exports = CType;

},{'./ilib.js':'enyo-ilib/ilib','./SearchUtils.js':'enyo-ilib/SearchUtils','./Utils.js':'enyo-ilib/Utils','./Locale.js':'enyo-ilib/Locale','./IString.js':'enyo-ilib/IString'}],'enyo-ilib/GregRataDie':[function (module,exports,global,require,request){
/*
 * gregratadie.js - Represent the RD date number in the Gregorian calendar
 * 
 * Copyright © 2014-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
ilib.js
GregorianCal.js
RataDie.js
MathUtils.js
*/

var ilib = require("./ilib.js");
var MathUtils = require("./MathUtils.js");
var GregorianCal = require("./GregorianCal.js");
var RataDie = require("./RataDie.js");

/**
 * @class
 * Construct a new Gregorian RD date number object. The constructor parameters can 
 * contain any of the following properties:
 * 
 * <ul>
 * <li><i>unixtime<i> - sets the time of this instance according to the given 
 * unix time. Unix time is the number of milliseconds since midnight on Jan 1, 1970.
 * 
 * <li><i>julianday</i> - sets the time of this instance according to the given
 * Julian Day instance or the Julian Day given as a float
 * 
 * <li><i>year</i> - any integer, including 0
 * 
 * <li><i>month</i> - 1 to 12, where 1 means January, 2 means February, etc.
 * 
 * <li><i>day</i> - 1 to 31
 * 
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * 
 * <li><i>minute</i> - 0 to 59
 * 
 * <li><i>second</i> - 0 to 59
 * 
 * <li><i>millisecond</i> - 0 to 999
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 *
 * If the constructor is called with another Gregorian date instance instead of
 * a parameter block, the other instance acts as a parameter block and its
 * settings are copied into the current instance.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above are present, then the RD is calculate based on 
 * the current date at the time of instantiation. <p>
 * 
 * If any of the properties from <i>year</i> through <i>millisecond</i> are not
 * specified in the params, it is assumed that they have the smallest possible
 * value in the range for the property (zero or one).<p>
 * 
 * 
 * @private
 * @constructor
 * @extends RataDie
 * @param {Object=} params parameters that govern the settings and behaviour of this Gregorian RD date
 */
var GregRataDie = function(params) {
	this.cal = params && params.cal || new GregorianCal();
	/** @type {number|undefined} */
	this.rd = undefined;
	RataDie.call(this, params);
};

GregRataDie.prototype = new RataDie();
GregRataDie.prototype.parent = RataDie;
GregRataDie.prototype.constructor = GregRataDie;

/**
 * the cumulative lengths of each month, for a non-leap year 
 * @private
 * @const
 * @type Array.<number>
 */
GregRataDie.cumMonthLengths = [
    0,   /* Jan */
	31,  /* Feb */
	59,  /* Mar */
	90,  /* Apr */
	120, /* May */
	151, /* Jun */
	181, /* Jul */
	212, /* Aug */
	243, /* Sep */
	273, /* Oct */
	304, /* Nov */
	334, /* Dec */
	365
];

/**
 * the cumulative lengths of each month, for a leap year 
 * @private
 * @const
 * @type Array.<number>
 */
GregRataDie.cumMonthLengthsLeap = [
	0,   /* Jan */
	31,  /* Feb */
	60,  /* Mar */
	91,  /* Apr */
	121, /* May */
	152, /* Jun */
	182, /* Jul */
	213, /* Aug */
	244, /* Sep */
	274, /* Oct */
	305, /* Nov */
	335, /* Dec */
	366
];

/**
 * Calculate the Rata Die (fixed day) number of the given date.
 * 
 * @private
 * @param {Object} date the date components to calculate the RD from
 */
GregRataDie.prototype._setDateComponents = function(date) {
	var year = parseInt(date.year, 10) || 0;
	var month = parseInt(date.month, 10) || 1;
	var day = parseInt(date.day, 10) || 1;
	var hour = parseInt(date.hour, 10) || 0;
	var minute = parseInt(date.minute, 10) || 0;
	var second = parseInt(date.second, 10) || 0;
	var millisecond = parseInt(date.millisecond, 10) || 0;

	var years = 365 * (year - 1) +
		Math.floor((year-1)/4) -
		Math.floor((year-1)/100) +
		Math.floor((year-1)/400);
	
	var dayInYear = (month > 1 ? GregRataDie.cumMonthLengths[month-1] : 0) +
		day +
		(GregorianCal.prototype.isLeapYear.call(this.cal, year) && month > 2 ? 1 : 0);
	var rdtime = (hour * 3600000 +
		minute * 60000 +
		second * 1000 +
		millisecond) / 
		86400000; 
	/*
	debug("getRataDie: converting " +  JSON.stringify(this));
	debug("getRataDie: year is " +  years);
	debug("getRataDie: day in year is " +  dayInYear);
	debug("getRataDie: rdtime is " +  rdtime);
	debug("getRataDie: rd is " +  (years + dayInYear + rdtime));
	*/
	
	/**
	 * @type {number|undefined} the RD number of this Gregorian date
	 */
	this.rd = years + dayInYear + rdtime;
};

/**
 * Return the rd number of the particular day of the week on or before the 
 * given rd. eg. The Sunday on or before the given rd.
 * @private
 * @param {number} rd the rata die date of the reference date
 * @param {number} dayOfWeek the day of the week that is being sought relative 
 * to the current date
 * @return {number} the rd of the day of the week
 */
GregRataDie.prototype._onOrBefore = function(rd, dayOfWeek) {
	return rd - MathUtils.mod(Math.floor(rd) - dayOfWeek, 7);
};

module.exports = GregRataDie;
},{'./ilib.js':'enyo-ilib/ilib','./MathUtils.js':'enyo-ilib/MathUtils','./GregorianCal.js':'enyo-ilib/GregorianCal','./RataDie.js':'enyo-ilib/RataDie'}],'enyo-ilib/ThaiSolarCal':[function (module,exports,global,require,request){
/*
 * thaisolar.js - Represent a Thai solar calendar object.
 *
 * Copyright © 2013-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/* !depends ilib.js Calendar.js GregorianCal.js MathUtils.js */

var ilib = require("./ilib.js");
var MathUtils = require("./MathUtils.js");
var Calendar = require("./Calendar.js");
var GregorianCal = require("./GregorianCal.js");

/**
 * @class
 * Construct a new Thai solar calendar object. This class encodes information about
 * a Thai solar calendar.<p>
 *
 *
 * @constructor
 * @extends Calendar
 */
var ThaiSolarCal = function() {
	this.type = "thaisolar";
};

ThaiSolarCal.prototype = new GregorianCal({noinstance: true});
ThaiSolarCal.prototype.parent = GregorianCal;
ThaiSolarCal.prototype.constructor = ThaiSolarCal;

/**
 * Return true if the given year is a leap year in the Thai solar calendar.
 * The year parameter may be given as a number, or as a ThaiSolarDate object.
 * @param {number|ThaiSolarDate} year the year for which the leap year information is being sought
 * @return {boolean} true if the given year is a leap year
 */
ThaiSolarCal.prototype.isLeapYear = function(year) {
	var y = (typeof(year) === 'number' ? year : year.getYears());
	y -= 543;
	var centuries = MathUtils.mod(y, 400);
	return (MathUtils.mod(y, 4) === 0 && centuries !== 100 && centuries !== 200 && centuries !== 300);
};


/* register this calendar for the factory method */
Calendar._constructors["thaisolar"] = ThaiSolarCal;

module.exports = ThaiSolarCal;
},{'./ilib.js':'enyo-ilib/ilib','./MathUtils.js':'enyo-ilib/MathUtils','./Calendar.js':'enyo-ilib/Calendar','./GregorianCal.js':'enyo-ilib/GregorianCal'}],'enyo-ilib/CopticCal':[function (module,exports,global,require,request){
/*
 * coptic.js - Represent a Coptic calendar object.
 * 
 * Copyright © 2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/* !depends ilib.js Calendar.js Locale.js Utils.js EthiopicCal.js */

var ilib = require("./ilib.js");
var Utils = require("./Utils.js");
var Locale = require("./Locale.js");
var Calendar = require("./Calendar.js");
var EthiopicCal = require("./EthiopicCal.js");

/**
 * @class
 * Construct a new Coptic calendar object. This class encodes information about
 * a Coptic calendar.<p>
 * 
 * 
 * @constructor
 * @extends EthiopicCal
 */
var CopticCal = function() {
	this.type = "coptic";
};

CopticCal.prototype = new EthiopicCal();
CopticCal.prototype.parent = EthiopicCal;
CopticCal.prototype.constructor = CopticCal;


/* register this calendar for the factory method */
Calendar._constructors["coptic"] = CopticCal;

module.exports = CopticCal;
},{'./ilib.js':'enyo-ilib/ilib','./Utils.js':'enyo-ilib/Utils','./Locale.js':'enyo-ilib/Locale','./Calendar.js':'enyo-ilib/Calendar','./EthiopicCal.js':'enyo-ilib/EthiopicCal'}],'enyo-ilib/EthiopicRataDie':[function (module,exports,global,require,request){
/*
 * EthiopicRataDie.js - Represent an RD date in the Ethiopic calendar
 * 
 * Copyright © 2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
ilib.js
EthiopicCal.js
RataDie.js
*/

var ilib = require("./ilib.js");
var EthiopicCal = require("./EthiopicCal.js");
var RataDie = require("./RataDie.js");

/**
 * @class
 * Construct a new Ethiopic RD date number object. The constructor parameters can 
 * contain any of the following properties:
 * 
 * <ul>
 * <li><i>unixtime<i> - sets the time of this instance according to the given 
 * unix time. Unix time is the number of milliseconds since midnight on Jan 1, 1970.
 * 
 * <li><i>julianday</i> - sets the time of this instance according to the given
 * Julian Day instance or the Julian Day given as a float
 * 
 * <li><i>year</i> - any integer, including 0
 * 
 * <li><i>month</i> - 1 to 12, where 1 means Maskaram, 2 means Teqemt, etc., and 13 means Paguemen
 * 
 * <li><i>day</i> - 1 to 30
 * 
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * 
 * <li><i>minute</i> - 0 to 59
 * 
 * <li><i>second</i> - 0 to 59
 * 
 * <li><i>millisecond</i> - 0 to 999
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 *
 * If the constructor is called with another Ethiopic date instance instead of
 * a parameter block, the other instance acts as a parameter block and its
 * settings are copied into the current instance.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above are present, then the RD is calculate based on 
 * the current date at the time of instantiation. <p>
 * 
 * If any of the properties from <i>year</i> through <i>millisecond</i> are not
 * specified in the params, it is assumed that they have the smallest possible
 * value in the range for the property (zero or one).<p>
 * 
 * 
 * @private
 * @constructor
 * @extends RataDie
 * @param {Object=} params parameters that govern the settings and behaviour of this Ethiopic RD date
 */
var EthiopicRataDie = function(params) {
	this.cal = params && params.cal || new EthiopicCal();
	this.rd = undefined;
	RataDie.call(this, params);
};

EthiopicRataDie.prototype = new RataDie();
EthiopicRataDie.prototype.parent = RataDie;
EthiopicRataDie.prototype.constructor = EthiopicRataDie;

/**
 * The difference between the zero Julian day and the first Ethiopic date
 * of Friday, August 29, 8 CE Julian at 6:00am UTC.<p> 
 * 
 * See <a href="http://us.wow.com/wiki/Time_in_Ethiopia?s_chn=90&s_pt=aolsem&v_t=aolsem"
 * Time in Ethiopia</a> for information about how time is handled in Ethiopia.
 * 
 * @protected
 * @type number
 */
EthiopicRataDie.prototype.epoch = 1724219.75;

/**
 * Calculate the Rata Die (fixed day) number of the given date from the
 * date components.
 * 
 * @protected
 * @param {Object} date the date components to calculate the RD from
 */
EthiopicRataDie.prototype._setDateComponents = function(date) {
	var year = date.year;
	var years = 365 * (year - 1) + Math.floor(year/4);
	var dayInYear = (date.month-1) * 30 + date.day;
	var rdtime = (date.hour * 3600000 +
		date.minute * 60000 +
		date.second * 1000 +
		date.millisecond) / 
		86400000;
	
	/*
	console.log("calcRataDie: converting " +  JSON.stringify(parts));
	console.log("getRataDie: year is " +  years);
	console.log("getRataDie: day in year is " +  dayInYear);
	console.log("getRataDie: rdtime is " +  rdtime);
	console.log("getRataDie: rd is " +  (years + dayInYear + rdtime));
	*/
	
	this.rd = years + dayInYear + rdtime;
};

module.exports = EthiopicRataDie;

},{'./ilib.js':'enyo-ilib/ilib','./EthiopicCal.js':'enyo-ilib/EthiopicCal','./RataDie.js':'enyo-ilib/RataDie'}],'enyo-ilib/Currency':[function (module,exports,global,require,request){
/*
 * Currency.js - Currency definition
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// !depends ilib.js Utils.js Locale.js LocaleInfo.js

// !data currency

var ilib = require("./ilib.js");
var Utils = require("./Utils.js");
var Locale = require("./Locale.js");
var LocaleInfo = require("./LocaleInfo.js");
var ResBundle = require("./ResBundle.js");

/**
 * @class
 * Create a new currency information instance. Instances of this class encode 
 * information about a particular currency.<p>
 * 
 * Note: that if you are looking to format currency for display, please see
 * the number formatting class {NumFmt}. This class only gives information
 * about currencies.<p> 
 * 
 * The options can contain any of the following properties:
 * 
 * <ul>
 * <li><i>locale</i> - specify the locale for this instance
 * <li><i>code</i> - find info on a specific currency with the given ISO 4217 code 
 * <li><i>sign</i> - search for a currency that uses this sign
 * <li><i>onLoad</i> - a callback function to call when the currency data is fully 
 * loaded. When the onLoad option is given, this class will attempt to
 * load any missing locale data using the ilib loader callback.
 * When the constructor is done (even if the data is already preassembled), the 
 * onLoad function is called with the current instance as a parameter, so this
 * callback can be used with preassembled or dynamic loading or a mix of the two. 
 * <li><i>sync</i> - tell whether to load any missing locale data synchronously or 
 * asynchronously. If this option is given as "false", then the "onLoad"
 * callback must be given, as the instance returned from this constructor will
 * not be usable for a while.
 * <li><i>loadParams</i> - an object containing parameters to pass to the 
 * loader callback function when locale data is missing. The parameters are not
 * interpretted or modified in any way. They are simply passed along. The object 
 * may contain any property/value pairs as long as the calling code is in
 * agreement with the loader callback function as to what those parameters mean.
 * </ul>
 * 
 * When searching for a currency by its sign, this class cannot guarantee 
 * that it will return info about a specific currency. The reason is that currency 
 * signs are sometimes shared between different currencies and the sign is 
 * therefore ambiguous. If you need a 
 * guarantee, find the currency using the code instead.<p>
 * 
 * The way this class finds a currency by sign is the following. If the sign is 
 * unambiguous, then
 * the currency is returned. If there are multiple currencies that use the same
 * sign, and the current locale uses that sign, then the default currency for
 * the current locale is returned. If there are multiple, but the current locale
 * does not use that sign, then the currency with the largest circulation is
 * returned. For example, if you are in the en-GB locale, and the sign is "$",
 * then this class will notice that there are multiple currencies with that
 * sign (USD, CAD, AUD, HKD, MXP, etc.) Since "$" is not used in en-GB, it will 
 * pick the one with the largest circulation, which in this case is the US Dollar
 * (USD).<p>
 * 
 * If neither the code or sign property is set, the currency that is most common 
 * for the locale
 * will be used instead. If the locale is not set, the default locale will be used.
 * If the code is given, but it is not found in the list of known currencies, this
 * constructor will throw an exception. If the sign is given, but it is not found,
 * this constructor will default to the currency for the current locale. If both
 * the code and sign properties are given, then the sign property will be ignored
 * and only the code property used. If the locale is given, but it is not a known
 * locale, this class will default to the default locale instead.<p>
 * 
 * 
 * @constructor
 * @param options {Object} a set of properties to govern how this instance is constructed.
 * @throws "currency xxx is unknown" when the given currency code is not in the list of 
 * known currencies. xxx is replaced with the requested code.
 */
var Currency = function (options) {
	this.sync = true;
	
	if (options) {
		if (options.code) {
			this.code = options.code;
		}
		if (options.locale) {
			this.locale = (typeof(options.locale) === 'string') ? new Locale(options.locale) : options.locale;
		}
		if (options.sign) {
			this.sign = options.sign;
		}
		if (typeof(options.sync) !== 'undefined') {
			this.sync = options.sync;
		}
		if (options.loadParams) {
			this.loadParams = options.loadParams;
		}
	}
	
	this.locale = this.locale || new Locale();
	if (typeof(ilib.data.currency) === 'undefined') {
		Utils.loadData({
			name: "currency.json",
			object: Currency, 
			locale: "-",
			sync: this.sync, 
			loadParams: this.loadParams, 
			callback: /** @type function(Object=):undefined */ ilib.bind(this, /** @type function() */ function(currency) {
				ilib.data.currency = currency;
				this._loadLocinfo(options && options.onLoad);
			})
		});
	} else {
		this._loadLocinfo(options && options.onLoad);
	}
};

/**
 * Return an array of the ids for all ISO 4217 currencies that
 * this copy of ilib knows about.
 * 
 * @static
 * @return {Array.<string>} an array of currency ids that this copy of ilib knows about.
 */
Currency.getAvailableCurrencies = function() {
	var ret = [],
		cur,
		currencies = new ResBundle({
			name: "currency"
		}).getResObj();
	
	for (cur in currencies) {
		if (cur && currencies[cur]) {
			ret.push(cur);
		}
	}
	
	return ret;
};

Currency.prototype = {
	/**
	 * @private
	 */
	_loadLocinfo: function(onLoad) {
		new LocaleInfo(this.locale, {
			onLoad: ilib.bind(this, function (li) {
				var currInfo;
				
				this.locinfo = li;
		    	if (this.code) {
		    		currInfo = ilib.data.currency[this.code];
		    		if (!currInfo) {
		    			throw "currency " + this.code + " is unknown";
		    		}
		    	} else if (this.sign) {
		    		currInfo = ilib.data.currency[this.sign]; // maybe it is really a code...
		    		if (typeof(currInfo) !== 'undefined') {
		    			this.code = this.sign;
		    		} else {
		    			this.code = this.locinfo.getCurrency();
		    			currInfo = ilib.data.currency[this.code];
		    			if (currInfo.sign !== this.sign) {
		    				// current locale does not use the sign, so search for it
		    				for (var cur in ilib.data.currency) {
		    					if (cur && ilib.data.currency[cur]) {
		    						currInfo = ilib.data.currency[cur];
		    						if (currInfo.sign === this.sign) {
		    							// currency data is already ordered so that the currency with the
		    							// largest circulation is at the beginning, so all we have to do
		    							// is take the first one in the list that matches
		    							this.code = cur;
		    							break;
		    						}
		    					}
		    				}
		    			}
		    		}
		    	}
		    	
		    	if (!currInfo || !this.code) {
		    		this.code = this.locinfo.getCurrency();
		    		currInfo = ilib.data.currency[this.code];
		    	}
		    	
		    	this.name = currInfo.name;
		    	this.fractionDigits = currInfo.decimals;
		    	this.sign = currInfo.sign;
		    	
				if (typeof(onLoad) === 'function') {
					onLoad(this);
				}
			})
		});
	},
	
	/**
	 * Return the ISO 4217 currency code for this instance.
	 * @return {string} the ISO 4217 currency code for this instance
	 */
	getCode: function () {
		return this.code;
	},
	
	/**
	 * Return the default number of fraction digits that is typically used
	 * with this type of currency.
	 * @return {number} the number of fraction digits for this currency
	 */
	getFractionDigits: function () {
		return this.fractionDigits;
	},
	
	/**
	 * Return the sign commonly used to represent this currency.
	 * @return {string} the sign commonly used to represent this currency
	 */
	getSign: function () {
		return this.sign;
	},
	
	/**
	 * Return the name of the currency in English.
	 * @return {string} the name of the currency in English
	 */
	getName: function () {
		return this.name;
	},
	
	/**
	 * Return the locale for this currency. If the options to the constructor 
	 * included a locale property in order to find the currency that is appropriate
	 * for that locale, then the locale is returned here. If the options did not
	 * include a locale, then this method returns undefined.
	 * @return {Locale} the locale used in the constructor of this instance,
	 * or undefined if no locale was given in the constructor
	 */
	getLocale: function () {
		return this.locale;
	}
};

module.exports = Currency;

},{'./ilib.js':'enyo-ilib/ilib','./Utils.js':'enyo-ilib/Utils','./Locale.js':'enyo-ilib/Locale','./LocaleInfo.js':'enyo-ilib/LocaleInfo','./ResBundle.js':'enyo-ilib/ResBundle'}],'enyo-ilib/isDigit':[function (module,exports,global,require,request){
/*
 * isDigit.js - Character type is digit
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// !depends CType.js IString.js ilib.js

// !data ctype

var ilib = require("./ilib.js");
var CType = require("./CType.js");
var IString = require("./IString.js");

/**
 * Return whether or not the first character is a digit character in the
 * Latin script.<p>
 * 
 * @static
 * @param {string|IString|number} ch character or code point to examine
 * @return {boolean} true if the first character is a digit character in the
 * Latin script. 
 */
var isDigit = function (ch) {
	var num;
	switch (typeof(ch)) {
		case 'number':
			num = ch;
			break;
		case 'string':
			num = IString.toCodePoint(ch, 0);
			break;
		case 'undefined':
			return false;
		default:
			num = ch._toCodePoint(0);
			break;
	}
	return CType._inRange(num, 'digit', ilib.data.ctype);
};

/**
 * @protected
 * @param {boolean} sync
 * @param {Object|undefined} loadParams
 * @param {function(*)|undefined} onLoad
 */
isDigit._init = function (sync, loadParams, onLoad) {
	CType._init(sync, loadParams, onLoad);
};

module.exports = isDigit;

},{'./ilib.js':'enyo-ilib/ilib','./CType.js':'enyo-ilib/CType','./IString.js':'enyo-ilib/IString'}],'enyo-ilib/isSpace':[function (module,exports,global,require,request){
/*
 * isSpace.js - Character type is space char
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// !depends CType.js IString.js

// !data ctype ctype_z

var ilib = require("./ilib.js");

var CType = require("./CType.js");
var IString = require("./IString.js");

/**
 * Return whether or not the first character is a whitespace character.<p>
 * 
 * @static
 * @param {string|IString|number} ch character or code point to examine
 * @return {boolean} true if the first character is a whitespace character.
 */
var isSpace = function (ch) {
	var num;
	switch (typeof(ch)) {
		case 'number':
			num = ch;
			break;
		case 'string':
			num = IString.toCodePoint(ch, 0);
			break;
		case 'undefined':
			return false;
		default:
			num = ch._toCodePoint(0);
			break;
	}

	return CType._inRange(num, 'space', ilib.data.ctype) ||
		CType._inRange(num, 'Zs', ilib.data.ctype_z) ||
		CType._inRange(num, 'Zl', ilib.data.ctype_z) ||
		CType._inRange(num, 'Zp', ilib.data.ctype_z);
};

/**
 * @protected
 * @param {boolean} sync
 * @param {Object|undefined} loadParams
 * @param {function(*)|undefined} onLoad
 */
isSpace._init = function (sync, loadParams, onLoad) {
	CType._load("ctype_z", sync, loadParams, function () {
		CType._init(sync, loadParams, onLoad);
	});
};

module.exports = isSpace;
},{'./ilib.js':'enyo-ilib/ilib','./CType.js':'enyo-ilib/CType','./IString.js':'enyo-ilib/IString'}],'enyo-ilib/TimeZone':[function (module,exports,global,require,request){
/*
 * TimeZone.js - Definition of a time zone class
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
!depends 
ilib.js 
Locale.js
LocaleInfo.js
Utils.js
MathUtils.js
JSUtils.js
GregRataDie.js
IString.js
CalendarFactory.js
*/

// !data localeinfo zoneinfo

var ilib = require("./ilib.js");
var Utils = require("./Utils.js");
var MathUtils = require("./MathUtils.js");
var JSUtils = require("./JSUtils.js");

var Locale = require("./Locale.js");
var LocaleInfo = require("./LocaleInfo.js");

var GregRataDie = require("./GregRataDie.js");
var CalendarFactory = require("./CalendarFactory.js");
var IString = require("./IString.js");

/**
 * @class
 * Create a time zone instance. 
 * 
 * This class reports and transforms
 * information about particular time zones.<p>
 * 
 * The options parameter may contain any of the following properties:
 * 
 * <ul>
 * <li><i>id</i> - The id of the requested time zone such as "Europe/London" or 
 * "America/Los_Angeles". These are taken from the IANA time zone database. (See
 * http://www.iana.org/time-zones for more information.) <p>
 * 
 * There is one special 
 * time zone that is not taken from the IANA database called simply "local". In
 * this case, this class will attempt to discover the current time zone and
 * daylight savings time settings by calling standard Javascript classes to 
 * determine the offsets from UTC. 
 * 
 * <li><i>locale</i> - The locale for this time zone.
 * 
 * <li><i>offset</i> - Choose the time zone based on the offset from UTC given in
 * number of minutes (negative is west, positive is east).
 * 
 * <li><i>onLoad</i> - a callback function to call when the data is fully 
 * loaded. When the onLoad option is given, this class will attempt to
 * load any missing locale data using the ilib loader callback.
 * When the data is loaded, the onLoad function is called with the current 
 * instance as a parameter. 
 * 
 * <li><i>sync</i> - tell whether to load any missing locale data synchronously or 
 * asynchronously. If this option is given as "false", then the "onLoad"
 * callback must be given, as the instance returned from this constructor will
 * not be usable for a while.
 *  
 * <li><i>loadParams</i> - an object containing parameters to pass to the 
 * loader callback function when locale data is missing. The parameters are not
 * interpretted or modified in any way. They are simply passed along. The object 
 * may contain any property/value pairs as long as the calling code is in
 * agreement with the loader callback function as to what those parameters mean.
 * </ul>
 * 
 * There is currently no way in the ECMAscript
 * standard to tell which exact time zone is currently in use. Choosing the
 * id "locale" or specifying an explicit offset will not give a specific time zone, 
 * as it is impossible to tell with certainty which zone the offsets 
 * match.<p>
 * 
 * When the id "local" is given or the offset option is specified, this class will
 * have the following behaviours:
 * <ul>
 * <li>The display name will always be given as the RFC822 style, no matter what
 * style is requested
 * <li>The id will also be returned as the RFC822 style display name
 * <li>When the offset is explicitly given, this class will assume the time zone 
 * does not support daylight savings time, and the offsets will be calculated 
 * the same way year round.
 * <li>When the offset is explicitly given, the inDaylightSavings() method will 
 * always return false.
 * <li>When the id "local" is given, this class will attempt to determine the 
 * daylight savings time settings by examining the offset from UTC on Jan 1
 * and June 1 of the current year. If they are different, this class assumes
 * that the local time zone uses DST. When the offset for a particular date is
 * requested, it will use the built-in Javascript support to determine the 
 * offset for that date.
 * </ul> 
 * 
 * If a more specific time zone is 
 * needed with display names and known start/stop times for DST, use the "id" 
 * property instead to specify the time zone exactly. You can perhaps ask the
 * user which time zone they prefer so that your app does not need to guess.<p>
 * 
 * If the id and the offset are both not given, the default time zone for the 
 * locale is retrieved from
 * the locale info. If the locale is not specified, the default locale for the
 * library is used.<p>
 * 
 * Because this class was designed for use in web sites, and the vast majority
 * of dates and times being formatted are recent date/times, this class is simplified
 * by not implementing historical time zones. That is, when governments change the 
 * time zone rules for a particular zone, only the latest such rule is implemented 
 * in this class. That means that determining the offset for a date that is prior 
 * to the last change may give the wrong result. Historical time zone calculations
 * may be implemented in a later version of iLib if there is enough demand for it,
 * but it would entail a much larger set of time zone data that would have to be
 * loaded.  
 * 
 * 
 * @constructor
 * @param {Object} options Options guiding the construction of this time zone instance
 */
var TimeZone = function(options) {
	this.sync = true;
	this.locale = new Locale();
	this.isLocal = false;
	
	if (options) {
		if (options.locale) {
			this.locale = (typeof(options.locale) === 'string') ? new Locale(options.locale) : options.locale;
		}
		
		if (options.id) {
			var id = options.id.toString();
			if (id === 'local') {
				this.isLocal = true;
				
				// use standard Javascript Date to figure out the time zone offsets
				var now = new Date(), 
					jan1 = new Date(now.getFullYear(), 0, 1),  // months in std JS Date object are 0-based
					jun1 = new Date(now.getFullYear(), 5, 1);
				
				// Javascript's method returns the offset backwards, so we have to
				// take the negative to get the correct offset
				this.offsetJan1 = -jan1.getTimezoneOffset();
				this.offsetJun1 = -jun1.getTimezoneOffset();
				// the offset of the standard time for the time zone is always the one that is closest 
				// to negative infinity of the two, no matter whether you are in the northern or southern 
				// hemisphere, east or west
				this.offset = Math.min(this.offsetJan1, this.offsetJun1);
			}
			this.id = id;
		} else if (options.offset) {
			this.offset = (typeof(options.offset) === 'string') ? parseInt(options.offset, 10) : options.offset;
			this.id = this.getDisplayName(undefined, undefined);
		}
		
		if (typeof(options.sync) !== 'undefined') {
			this.sync = !!options.sync;
		}
		
		this.loadParams = options.loadParams;
		this.onLoad = options.onLoad;
	}

	//console.log("timezone: locale is " + this.locale);
	
	if (!this.id) {
		new LocaleInfo(this.locale, {
			sync: this.sync,
			onLoad: ilib.bind(this, function (li) {
				this.id = li.getTimeZone() || "Etc/UTC";
				this._loadtzdata();
			})
		});
	} else {
		this._loadtzdata();
	}

	//console.log("localeinfo is: " + JSON.stringify(this.locinfo));
	//console.log("id is: " + JSON.stringify(this.id));
};

/*
 * Explanation of the compressed time zone info properties.
 * {
 *     "o": "8:0",      // offset from UTC
 *     "f": "W{c}T",    // standard abbreviation. For time zones that observe DST, the {c} replacement is replaced with the 
 *                      // letter in the e.c or s.c properties below 
 *     "e": {           // info about the end of DST
 *         "j": 78322.5 // Julian day when the transition happens. Either specify the "j" property or all of the "m", "r", and 
 *                      // "t" properties, but not both sets.
 *         "m": 3,      // month that it ends
 *         "r": "l0",   // rule for the day it ends "l" = "last", numbers are Sun=0 through Sat=6. Other syntax is "0>7". 
 *                      // This means the 0-day (Sun) after the 7th of the month. Other possible operators are <, >, <=, >=
 *         "t": "2:0",  // time of day that the DST turns off, hours:minutes
 *         "c": "S"     // character to replace into the abbreviation for standard time 
 *     },
 *     "s": {           // info about the start of DST
 *         "j": 78189.5 // Julian day when the transition happens. Either specify the "j" property or all of the "m", "r", and 
 *                      // "t" properties, but not both sets.
 *         "m": 10,     // month that it starts
 *         "r": "l0",   // rule for the day it starts "l" = "last", numbers are Sun=0 through Sat=6. Other syntax is "0>7".
 *                      // This means the 0-day (Sun) after the 7th of the month. Other possible operators are <, >, <=, >=
 *         "t": "2:0",  // time of day that the DST turns on, hours:minutes
 *         "v": "1:0",  // amount of time saved in hours:minutes
 *         "c": "D"     // character to replace into the abbreviation for daylight time
 *     },
 *     "c": "AU",       // ISO code for the country that contains this time zone
 *     "n": "W. Australia {c} Time"
 *                      // long English name of the zone. The {c} replacement is for the word "Standard" or "Daylight" as appropriate
 * }
 */
TimeZone.prototype._loadtzdata = function () {
	// console.log("id is: " + JSON.stringify(this.id));
	// console.log("zoneinfo is: " + JSON.stringify(ilib.data.zoneinfo[this.id]));
	if (!ilib.data.zoneinfo[this.id] && typeof(this.offset) === 'undefined') {
		Utils.loadData({
			object: TimeZone, 
			nonlocale: true,	// locale independent 
			name: "zoneinfo/" + this.id + ".json", 
			sync: this.sync, 
			loadParams: this.loadParams, 
			callback: ilib.bind(this, function (tzdata) {
				if (tzdata && !JSUtils.isEmpty(tzdata)) {
					ilib.data.zoneinfo[this.id] = tzdata;
				}
				this._initZone();
			})
		});
	} else {
		this._initZone();
	}
};

TimeZone.prototype._initZone = function() {
	/** 
	 * @private
	 * @type {{o:string,f:string,e:Object.<{m:number,r:string,t:string,z:string}>,s:Object.<{m:number,r:string,t:string,z:string,v:string,c:string}>,c:string,n:string}} 
	 */
	this.zone = ilib.data.zoneinfo[this.id];
	if (!this.zone && typeof(this.offset) === 'undefined') {
		this.id = "Etc/UTC";
		this.zone = ilib.data.zoneinfo[this.id];
	}
	
	this._calcDSTSavings();
	
	if (typeof(this.offset) === 'undefined' && this.zone.o) {
		var offsetParts = this._offsetStringToObj(this.zone.o);
		/**
		 * @private
		 * @type {number} raw offset from UTC without DST, in minutes
		 */
		this.offset = (Math.abs(offsetParts.h || 0) * 60 + (offsetParts.m || 0)) * MathUtils.signum(offsetParts.h || 0);
	}
	
	if (this.onLoad && typeof(this.onLoad) === 'function') {
		this.onLoad(this);
	}
};

/** @private */
TimeZone._marshallIds = function (country, sync, callback) {
	var tz, ids = [];
	
	if (!country) {
		// local is a special zone meaning "the local time zone according to the JS engine we are running upon"
		ids.push("local");
		for (tz in ilib.data.timezones) {
			if (ilib.data.timezones[tz]) {
				ids.push(ilib.data.timezones[tz]);
			}
		}
		if (typeof(callback) === 'function') {
			callback(ids);
		}
	} else {
		if (!ilib.data.zoneinfo.zonetab) {
			Utils.loadData({
				object: TimeZone, 
				nonlocale: true,	// locale independent 
				name: "zoneinfo/zonetab.json", 
				sync: sync, 
				callback: ilib.bind(this, function (tzdata) {
					if (tzdata) {
						ilib.data.zoneinfo.zonetab = tzdata;
					}
					
					ids = ilib.data.zoneinfo.zonetab[country];
					
					if (typeof(callback) === 'function') {
						callback(ids);
					}
				})
			});
		} else {
			ids = ilib.data.zoneinfo.zonetab[country];
			if (typeof(callback) === 'function') {
				callback(ids);
			}
		}
	}
	
	return ids;
};

/**
 * Return an array of available zone ids that the constructor knows about.
 * The country parameter is optional. If it is not given, all time zones will
 * be returned. If it specifies a country code, then only time zones for that
 * country will be returned.
 * 
 * @param {string|undefined} country country code for which time zones are being sought
 * @param {boolean} sync whether to find the available ids synchronously (true) or asynchronously (false)
 * @param {function(Array.<string>)} onLoad callback function to call when the data is finished loading
 * @return {Array.<string>} an array of zone id strings
 */
TimeZone.getAvailableIds = function (country, sync, onLoad) {
	var tz, ids = [];
	
	if (typeof(sync) !== 'boolean') {
		sync = true;
	}
	
	if (ilib.data.timezones.length === 0) {
		if (typeof(ilib._load) !== 'undefined' && typeof(ilib._load.listAvailableFiles) === 'function') {
			ilib._load.listAvailableFiles(sync, function(hash) {
				for (var dir in hash) {
					var files = hash[dir];
					if (ilib.isArray(files)) {
						files.forEach(function (filename) {
							if (filename && filename.match(/^zoneinfo/)) {
								ilib.data.timezones.push(filename.replace(/^zoneinfo\//, "").replace(/\.json$/, ""));
							}
						});
					}
				}
				ids = TimeZone._marshallIds(country, sync, onLoad);
			});
		} else {
			for (tz in ilib.data.zoneinfo) {
				if (ilib.data.zoneinfo[tz]) {
					ilib.data.timezones.push(tz);
				}
			}
			ids = TimeZone._marshallIds(country, sync, onLoad);
		}
	} else {
		ids = TimeZone._marshallIds(country, sync, onLoad);
	}
	
	return ids;
};

/**
 * Return the id used to uniquely identify this time zone.
 * @return {string} a unique id for this time zone
 */
TimeZone.prototype.getId = function () {
	return this.id.toString();
};

/**
 * Return the abbreviation that is used for the current time zone on the given date.
 * The date may be in DST or during standard time, and many zone names have different
 * abbreviations depending on whether or not the date is falls within DST.<p>
 * 
 * There are two styles that are supported:
 * 
 * <ol>
 * <li>standard - returns the 3 to 5 letter abbreviation of the time zone name such 
 * as "CET" for "Central European Time" or "PDT" for "Pacific Daylight Time"
 * <li>rfc822 - returns an RFC 822 style time zone specifier, which specifies more
 * explicitly what the offset is from UTC
 * <li>long - returns the long name of the zone in English
 * </ol>
 *  
 * @param {IDate=} date a date to determine if it is in daylight time or standard time
 * @param {string=} style one of "standard" or "rfc822". Default if not specified is "standard"
 * @return {string} the name of the time zone, abbreviated according to the style 
 */
TimeZone.prototype.getDisplayName = function (date, style) {
	style = (this.isLocal || typeof(this.zone) === 'undefined') ? "rfc822" : (style || "standard");
	switch (style) {
		default:
		case 'standard':
			if (this.zone.f && this.zone.f !== "zzz") {
				if (this.zone.f.indexOf("{c}") !== -1) {
					var letter = "";
					letter = this.inDaylightTime(date) ? this.zone.s && this.zone.s.c : this.zone.e && this.zone.e.c; 
					var temp = new IString(this.zone.f);
					return temp.format({c: letter || ""});
				}
				return this.zone.f;
			} 
			var temp = "GMT" + this.zone.o;
			if (this.inDaylightTime(date)) {
				temp += "+" + this.zone.s.v;
			}
			return temp;
			break;
		case 'rfc822':
			var offset = this.getOffset(date), // includes the DST if applicable
				ret = "UTC",
				hour = offset.h || 0,
				minute = offset.m || 0;
			
			if (hour !== 0) {
				ret += (hour > 0) ? "+" : "-";
				if (Math.abs(hour) < 10) {
					ret += "0";
				}
				ret += (hour < 0) ? -hour : hour;
				if (minute < 10) {
					ret += "0";
				}
				ret += minute;
			}
			return ret; 
		case 'long':
			if (this.zone.n) {
				if (this.zone.n.indexOf("{c}") !== -1) {
					var str = this.inDaylightTime(date) ? "Daylight" : "Standard"; 
					var temp = new IString(this.zone.n);
					return temp.format({c: str || ""});
				}
				return this.zone.n;
			}
			var temp = "GMT" + this.zone.o;
			if (this.inDaylightTime(date)) {
				temp += "+" + this.zone.s.v;
			}
			return temp;
			break;
	}
};

/**
 * Convert the offset string to an object with an h, m, and possibly s property
 * to indicate the hours, minutes, and seconds.
 * 
 * @private
 * @param {string} str the offset string to convert to an object
 * @return {Object.<{h:number,m:number,s:number}>} an object giving the offset for the zone at 
 * the given date/time, in hours, minutes, and seconds
 */
TimeZone.prototype._offsetStringToObj = function (str) {
	var offsetParts = (typeof(str) === 'string') ? str.split(":") : [],
		ret = {h:0},
		temp;
	
	if (offsetParts.length > 0) {
		ret.h = parseInt(offsetParts[0], 10);
		if (offsetParts.length > 1) {
			temp = parseInt(offsetParts[1], 10);
			if (temp) {
				ret.m = temp;
			}
			if (offsetParts.length > 2) {
				temp = parseInt(offsetParts[2], 10);
				if (temp) {
					ret.s = temp;
				}
			}
		}
	}

	return ret;
};

/**
 * Returns the offset of this time zone from UTC at the given date/time. If daylight saving 
 * time is in effect at the given date/time, this method will return the offset value 
 * adjusted by the amount of daylight saving.
 * @param {IDate=} date the date for which the offset is needed
 * @return {Object.<{h:number,m:number}>} an object giving the offset for the zone at 
 * the given date/time, in hours, minutes, and seconds  
 */
TimeZone.prototype.getOffset = function (date) {
	if (!date) {
		return this.getRawOffset();
	}
	var offset = this.getOffsetMillis(date)/60000;
	
	var hours = MathUtils.down(offset/60),
		minutes = Math.abs(offset) - Math.abs(hours)*60;

	var ret = {
		h: hours
	};
	if (minutes != 0) {
		ret.m = minutes;
	}
	return ret;
};

/**
 * Returns the offset of this time zone from UTC at the given date/time expressed in 
 * milliseconds. If daylight saving 
 * time is in effect at the given date/time, this method will return the offset value 
 * adjusted by the amount of daylight saving. Negative numbers indicate offsets west
 * of UTC and conversely, positive numbers indicate offset east of UTC.
 *  
 * @param {IDate=} date the date for which the offset is needed, or null for the
 * present date
 * @return {number} the number of milliseconds of offset from UTC that the given date is
 */
TimeZone.prototype.getOffsetMillis = function (date) {
	var ret;
	
	// check if the dst property is defined -- the intrinsic JS Date object doesn't work so
	// well if we are in the overlap time at the end of DST
	if (this.isLocal && typeof(date.dst) === 'undefined') {
		var d = (!date) ? new Date() : new Date(date.getTimeExtended());
		return -d.getTimezoneOffset() * 60000;
	} 
	
	ret = this.offset;
	
	if (date && this.inDaylightTime(date)) {
		ret += this.dstSavings;
	}
	
	return ret * 60000;
};

/**
 * Return the offset in milliseconds when the date has an RD number in wall
 * time rather than in UTC time.
 * @protected
 * @param date the date to check in wall time
 * @returns {number} the number of milliseconds of offset from UTC that the given date is
 */
TimeZone.prototype._getOffsetMillisWallTime = function (date) {
	var ret;
	
	ret = this.offset;
	
	if (date && this.inDaylightTime(date, true)) {
		ret += this.dstSavings;
	}
	
	return ret * 60000;
};

/**
 * Returns the offset of this time zone from UTC at the given date/time. If daylight saving 
 * time is in effect at the given date/time, this method will return the offset value 
 * adjusted by the amount of daylight saving.
 * @param {IDate=} date the date for which the offset is needed
 * @return {string} the offset for the zone at the given date/time as a string in the 
 * format "h:m:s" 
 */
TimeZone.prototype.getOffsetStr = function (date) {
	var offset = this.getOffset(date),
		ret;
	
	ret = offset.h;
	if (typeof(offset.m) !== 'undefined') {
		ret += ":" + offset.m;
		if (typeof(offset.s) !== 'undefined') {
			ret += ":" + offset.s;
		}
	} else {
		ret += ":0";
	}
	
	return ret;
};

/**
 * Gets the offset from UTC for this time zone.
 * @return {Object.<{h:number,m:number,s:number}>} an object giving the offset from 
 * UTC for this time zone, in hours, minutes, and seconds 
 */
TimeZone.prototype.getRawOffset = function () {
	var hours = MathUtils.down(this.offset/60),
		minutes = Math.abs(this.offset) - Math.abs(hours)*60;
	
	var ret = {
		h: hours
	};
	if (minutes != 0) {
		ret.m = minutes;
	}
	return ret;
};

/**
 * Gets the offset from UTC for this time zone expressed in milliseconds. Negative numbers
 * indicate zones west of UTC, and positive numbers indicate zones east of UTC.
 * 
 * @return {number} an number giving the offset from 
 * UTC for this time zone in milliseconds 
 */
TimeZone.prototype.getRawOffsetMillis = function () {
	return this.offset * 60000;
};

/**
 * Gets the offset from UTC for this time zone without DST savings.
 * @return {string} the offset from UTC for this time zone, in the format "h:m:s" 
 */
TimeZone.prototype.getRawOffsetStr = function () {
	var off = this.getRawOffset();
	return off.h + ":" + (off.m || "0");
};

/**
 * Return the amount of time in hours:minutes that the clock is advanced during
 * daylight savings time.
 * @return {Object.<{h:number,m:number,s:number}>} the amount of time that the 
 * clock advances for DST in hours, minutes, and seconds 
 */
TimeZone.prototype.getDSTSavings = function () {
	if (this.isLocal) {
		// take the absolute because the difference in the offsets may be positive or
		// negative, depending on the hemisphere
		var savings = Math.abs(this.offsetJan1 - this.offsetJun1);
		var hours = MathUtils.down(savings/60),
			minutes = savings - hours*60;
		return {
			h: hours,
			m: minutes
		};
	} else if (this.zone && this.zone.s) {
		return this._offsetStringToObj(this.zone.s.v);	// this.zone.start.savings
	}
	return {h:0};
};

/**
 * Return the amount of time in hours:minutes that the clock is advanced during
 * daylight savings time.
 * @return {string} the amount of time that the clock advances for DST in the
 * format "h:m:s"
 */
TimeZone.prototype.getDSTSavingsStr = function () {
	if (this.isLocal) {
		var savings = this.getDSTSavings();
		return savings.h + ":" + savings.m;
	} else if (typeof(this.offset) !== 'undefined' && this.zone && this.zone.s) {
		return this.zone.s.v;	// this.zone.start.savings
	}
	return "0:0";
};

/**
 * return the rd of the start of DST transition for the given year
 * @protected
 * @param {Object} rule set of rules
 * @param {number} year year to check
 * @return {number} the rd of the start of DST for the year
 */
TimeZone.prototype._calcRuleStart = function (rule, year) {
	var type = "=", 
		weekday = 0, 
		day, 
		refDay, 
		cal, 
		hour = 0, 
		minute = 0, 
		second = 0,
		time,
		i;
	
	if (typeof(rule.j) !== 'undefined') {
		refDay = new GregRataDie({
			julianday: rule.j
		});
	} else {
		if (rule.r.charAt(0) == 'l' || rule.r.charAt(0) == 'f') {
			cal = CalendarFactory({type: "gregorian"});
			type = rule.r.charAt(0);
			weekday = parseInt(rule.r.substring(1), 10);
			day = (type === 'l') ? cal.getMonLength(rule.m, year) : 1;
			//console.log("_calcRuleStart: Calculating the " + 
			//		(rule.r.charAt(0) == 'f' ? "first " : "last ") + weekday + 
			//		" of month " + rule.m);
		} else {
			i = rule.r.indexOf('<');
			if (i == -1) {
				i = rule.r.indexOf('>');
			}
			
			if (i != -1) {
				type = rule.r.charAt(i);
				weekday = parseInt(rule.r.substring(0, i), 10);
				day = parseInt(rule.r.substring(i+1), 10); 
				//console.log("_calcRuleStart: Calculating the " + weekday + 
				//		type + day + " of month " + rule.m);
			} else {
				day = parseInt(rule.r, 10);
				//console.log("_calcRuleStart: Calculating the " + day + " of month " + rule.m);
			}
		}
	
		if (rule.t) {
			time = rule.t.split(":");
			hour = parseInt(time[0], 10);
			if (time.length > 1) {
				minute = parseInt(time[1], 10);
				if (time.length > 2) {
					second = parseInt(time[2], 10);
				}
			}
		}
		//console.log("calculating rd of " + year + "/" + rule.m + "/" + day);
		refDay = new GregRataDie({
			year: year, 
			month: rule.m, 
			day: day, 
			hour: hour, 
			minute: minute, 
			second: second
		});
	}
	//console.log("refDay is " + JSON.stringify(refDay));
	var d = refDay.getRataDie();
	
	switch (type) {
		case 'l':
		case '<':
			//console.log("returning " + refDay.onOrBefore(rd, weekday));
			d = refDay.onOrBefore(weekday); 
			break;
		case 'f':
		case '>':
			//console.log("returning " + refDay.onOrAfterRd(rd, weekday));
			d = refDay.onOrAfter(weekday); 
			break;
	}
	return d;
};

/**
 * @private
 */
TimeZone.prototype._calcDSTSavings = function () {
	var saveParts = this.getDSTSavings();
	
	/**
	 * @private
	 * @type {number} savings in minutes when DST is in effect 
	 */
	this.dstSavings = (Math.abs(saveParts.h || 0) * 60 + (saveParts.m || 0)) * MathUtils.signum(saveParts.h || 0);
};

/**
 * @private
 */
TimeZone.prototype._getDSTStartRule = function (year) {
	// TODO: update this when historic/future zones are supported
	return this.zone.s;
};

/**
 * @private
 */
TimeZone.prototype._getDSTEndRule = function (year) {
	// TODO: update this when historic/future zones are supported
	return this.zone.e;
};

/**
 * Returns whether or not the given date is in daylight saving time for the current
 * zone. Note that daylight savings time is observed for the summer. Because
 * the seasons are reversed, daylight savings time in the southern hemisphere usually
 * runs from the end of the year through New Years into the first few months of the
 * next year. This method will correctly calculate the start and end of DST for any
 * location.
 * 
 * @param {IDate=} date a date for which the info about daylight time is being sought,
 * or undefined to tell whether we are currently in daylight savings time
 * @param {boolean=} wallTime if true, then the given date is in wall time. If false or
 * undefined, it is in the usual UTC time.
 * @return {boolean} true if the given date is in DST for the current zone, and false
 * otherwise.
 */
TimeZone.prototype.inDaylightTime = function (date, wallTime) {
	var rd, startRd, endRd, year;

	if (this.isLocal) {
		// check if the dst property is defined -- the intrinsic JS Date object doesn't work so
		// well if we are in the overlap time at the end of DST, so we have to work around that
		// problem by adding in the savings ourselves
		var offset = 0;
		if (typeof(date.dst) !== 'undefined' && !date.dst) {
			offset = this.dstSavings * 60000;
		}
		
		var d = new Date(date ? date.getTimeExtended() + offset: undefined);
		// the DST offset is always the one that is closest to positive infinity, no matter 
		// if you are in the northern or southern hemisphere, east or west
		var dst = Math.max(this.offsetJan1, this.offsetJun1);
		return (-d.getTimezoneOffset() === dst);
	}
	
	if (!date || !date.cal || date.cal.type !== "gregorian") {
		// convert to Gregorian so that we can tell if it is in DST or not
		var time = date && typeof(date.getTimeExtended) === 'function' ? date.getTimeExtended() : undefined;
		rd = new GregRataDie({unixtime: time}).getRataDie();
		year = new Date(time).getUTCFullYear();
	} else {
		rd = date.rd.getRataDie();
		year = date.year;
	}
	// rd should be a Gregorian RD number now, in UTC
	
	// if we aren't using daylight time in this zone for the given year, then we are 
	// not in daylight time
	if (!this.useDaylightTime(year)) {
		return false;
	}
	
	// these calculate the start/end in local wall time
	var startrule = this._getDSTStartRule(year);
	var endrule = this._getDSTEndRule(year);
	startRd = this._calcRuleStart(startrule, year);
	endRd = this._calcRuleStart(endrule, year);
	
	if (wallTime) {
		// rd is in wall time, so we have to make sure to skip the missing time
		// at the start of DST when standard time ends and daylight time begins
		startRd += this.dstSavings/1440;
	} else {
		// rd is in UTC, so we have to convert the start/end to UTC time so 
		// that they can be compared directly to the UTC rd number of the date
		
		// when DST starts, time is standard time already, so we only have
		// to subtract the offset to get to UTC and not worry about the DST savings
		startRd -= this.offset/1440;  
		
		// when DST ends, time is in daylight time already, so we have to
		// subtract the DST savings to get back to standard time, then the
		// offset to get to UTC
		endRd -= (this.offset + this.dstSavings)/1440;
	}
	
	// In the northern hemisphere, the start comes first some time in spring (Feb-Apr), 
	// then the end some time in the fall (Sept-Nov). In the southern
	// hemisphere, it is the other way around because the seasons are reversed. Standard
	// time is still in the winter, but the winter months are May-Aug, and daylight 
	// savings time usually starts Aug-Oct of one year and runs through Mar-May of the 
	// next year.
	if (rd < endRd && endRd - rd <= this.dstSavings/1440 && typeof(date.dst) === 'boolean') {
		// take care of the magic overlap time at the end of DST
		return date.dst;
	}
	if (startRd < endRd) {
		// northern hemisphere
		return (rd >= startRd && rd < endRd) ? true : false;
	} 
	// southern hemisphere
	return (rd >= startRd || rd < endRd) ? true : false;
};

/**
 * Returns true if this time zone switches to daylight savings time at some point
 * in the year, and false otherwise.
 * @param {number} year Whether or not the time zone uses daylight time in the given year. If
 * this parameter is not given, the current year is assumed.
 * @return {boolean} true if the time zone uses daylight savings time
 */
TimeZone.prototype.useDaylightTime = function (year) {
	
	// this zone uses daylight savings time iff there is a rule defining when to start
	// and when to stop the DST
	return (this.isLocal && this.offsetJan1 !== this.offsetJun1) ||
		(typeof(this.zone) !== 'undefined' && 
		typeof(this.zone.s) !== 'undefined' && 
		typeof(this.zone.e) !== 'undefined');
};

/**
 * Returns the ISO 3166 code of the country for which this time zone is defined.
 * @return {string} the ISO 3166 code of the country for this zone
 */
TimeZone.prototype.getCountry = function () {
	return this.zone.c;
};

module.exports = TimeZone;

},{'./ilib.js':'enyo-ilib/ilib','./Utils.js':'enyo-ilib/Utils','./MathUtils.js':'enyo-ilib/MathUtils','./JSUtils.js':'enyo-ilib/JSUtils','./Locale.js':'enyo-ilib/Locale','./LocaleInfo.js':'enyo-ilib/LocaleInfo','./GregRataDie.js':'enyo-ilib/GregRataDie','./CalendarFactory.js':'enyo-ilib/CalendarFactory','./IString.js':'enyo-ilib/IString'}],'enyo-ilib/CopticRataDie':[function (module,exports,global,require,request){
/*
 * CopticRataDie.js - Represent an RD date in the Coptic calendar
 * 
 * Copyright © 2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
ilib.js
CopticCal.js 
JSUtils.js
EthiopicRataDie.js
*/

var ilib = require("./ilib.js");
var JSUtils = require("./JSUtils.js");
var CopticCal = require("./CopticCal.js");
var EthiopicRataDie = require("./EthiopicRataDie.js");

/**
 * @class
 * Construct a new Coptic RD date number object. The constructor parameters can 
 * contain any of the following properties:
 * 
 * <ul>
 * <li><i>unixtime<i> - sets the time of this instance according to the given 
 * unix time. Unix time is the number of milliseconds since midnight on Jan 1, 1970.
 * 
 * <li><i>julianday</i> - sets the time of this instance according to the given
 * Julian Day instance or the Julian Day given as a float
 * 
 * <li><i>year</i> - any integer, including 0
 * 
 * <li><i>month</i> - 1 to 13, where 1 means Thoout, 2 means Paope, etc., and 13 means Epagomene
 * 
 * <li><i>day</i> - 1 to 30
 * 
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * 
 * <li><i>minute</i> - 0 to 59
 * 
 * <li><i>second</i> - 0 to 59
 * 
 * <li><i>millisecond</i> - 0 to 999
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 *
 * If the constructor is called with another Coptic date instance instead of
 * a parameter block, the other instance acts as a parameter block and its
 * settings are copied into the current instance.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above are present, then the RD is calculate based on 
 * the current date at the time of instantiation. <p>
 * 
 * If any of the properties from <i>year</i> through <i>millisecond</i> are not
 * specified in the params, it is assumed that they have the smallest possible
 * value in the range for the property (zero or one).<p>
 * 
 * 
 * @private
 * @constructor
 * @extends EthiopicRataDie
 * @param {Object=} params parameters that govern the settings and behaviour of this Coptic RD date
 */
var CopticRataDie = function(params) {
	this.cal = params && params.cal || new CopticCal();
	this.rd = undefined;
	/**
	 * The difference between the zero Julian day and the first Coptic date
	 * of Friday, August 29, 284 CE Julian at 7:00am UTC. 
	 * @private
	 * @const
	 * @type number
	 */
	this.epoch = 1825028.5;

	var tmp = {};
	if (params) {
		JSUtils.shallowCopy(params, tmp);
	}
	tmp.cal = this.cal; // override the cal parameter that may be passed in
	EthiopicRataDie.call(this, tmp);
};

CopticRataDie.prototype = new EthiopicRataDie();
CopticRataDie.prototype.parent = EthiopicRataDie;
CopticRataDie.prototype.constructor = CopticRataDie;

module.exports = CopticRataDie;
},{'./ilib.js':'enyo-ilib/ilib','./JSUtils.js':'enyo-ilib/JSUtils','./CopticCal.js':'enyo-ilib/CopticCal','./EthiopicRataDie.js':'enyo-ilib/EthiopicRataDie'}],'enyo-ilib/INumber':[function (module,exports,global,require,request){
/*
 * INumber.js - Parse a number in any locale
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
!depends 
ilib.js 
Locale.js 
isDigit.js 
isSpace.js
LocaleInfo.js
Utils.js
Currency.js
*/

var ilib = require("./ilib.js");
var Utils = require("./Utils.js");

var Locale = require("./Locale.js");
var LocaleInfo = require("./LocaleInfo.js");

var CType = require("./CType.js");
var isDigit = require("./isDigit.js");
var isSpace = require("./isSpace.js");

var Currency = require("./Currency.js");


/**
 * @class
 * Parse a string as a number, ignoring all locale-specific formatting.<p>
 * 
 * This class is different from the standard Javascript parseInt() and parseFloat() 
 * functions in that the number to be parsed can have formatting characters in it 
 * that are not supported by those two
 * functions, and it handles numbers written in other locales properly. For example, 
 * if you pass the string "203,231.23" to the parseFloat() function in Javascript, it 
 * will return you the number 203. The INumber class will parse it correctly and 
 * the value() function will return the number 203231.23. If you pass parseFloat() the 
 * string "203.231,23" with the locale set to de-DE, it will return you 203 again. This
 * class will return the correct number 203231.23 again.<p>
 * 
 * The options object may contain any of the following properties:
 * 
 * <ul>
 * <li><i>locale</i> - specify the locale of the string to parse. This is used to
 * figure out what the decimal point character is. If not specified, the default locale
 * for the app or browser is used.
 * <li><i>type</i> - specify whether this string should be interpretted as a number,
 * currency, or percentage amount. When the number is interpretted as a currency
 * amount, the getCurrency() method will return something useful, otherwise it will
 * return undefined. If
 * the number is to be interpretted as percentage amount and there is a percentage sign
 * in the string, then the number will be returned
 * as a fraction from the valueOf() method. If there is no percentage sign, then the 
 * number will be returned as a regular number. That is "58.3%" will be returned as the 
 * number 0.583 but "58.3" will be returned as 58.3. Valid values for this property 
 * are "number", "currency", and "percentage". Default if this is not specified is
 * "number".
 * <li><i>onLoad</i> - a callback function to call when the locale data is fully 
 * loaded. When the onLoad option is given, this class will attempt to
 * load any missing locale data using the ilib loader callback.
 * When the constructor is done (even if the data is already preassembled), the 
 * onLoad function is called with the current instance as a parameter, so this
 * callback can be used with preassembled or dynamic loading or a mix of the two. 
 * 
 * <li><i>sync</i> - tell whether to load any missing locale data synchronously or 
 * asynchronously. If this option is given as "false", then the "onLoad"
 * callback must be given, as the instance returned from this constructor will
 * not be usable for a while.
 *  
 * <li><i>loadParams</i> - an object containing parameters to pass to the 
 * loader callback function when locale data is missing. The parameters are not
 * interpretted or modified in any way. They are simply passed along. The object 
 * may contain any property/value pairs as long as the calling code is in
 * agreement with the loader callback function as to what those parameters mean.
 * </ul>
 * <p>
 * 
 * This class is named INumber ("ilib number") so as not to conflict with the 
 * built-in Javascript Number class.
 * 
 * @constructor
 * @param {string|number|INumber|Number|undefined} str a string to parse as a number, or a number value
 * @param {Object=} options Options controlling how the instance should be created 
 */
var INumber = function (str, options) {
	var i, stripped = "", 
		sync = true,
		loadParams,
		onLoad;
	
	this.locale = new Locale();
	this.type = "number";
	
	if (options) {
		if (options.locale) {
			this.locale = (typeof(options.locale) === 'string') ? new Locale(options.locale) : options.locale;
		}
		if (options.type) {
			switch (options.type) {
				case "number":
				case "currency":
				case "percentage":
					this.type = options.type;
					break;
				default:
					break;
			}
		}
		if (typeof(options.sync) !== 'undefined') {
			sync = (options.sync == true);
		}
		loadParams = options.loadParams;
		onLoad = options.onLoad;
	}
	
	isDigit._init(sync, loadParams, /** @type {function()|undefined} */ ilib.bind(this, function() {
		isSpace._init(sync, loadParams, /** @type {function()|undefined} */ ilib.bind(this, function() {
			new LocaleInfo(this.locale, {
				sync: sync,
				onLoad: ilib.bind(this, function (li) {
					this.decimal = li.getDecimalSeparator();
					
					switch (typeof(str)) {
					case 'string':
						// stripping should work for all locales, because you just ignore all the
						// formatting except the decimal char
						var unary = true; // looking for the unary minus still?
						var lastNumericChar = 0;
						this.str = str || "0";
						i = 0;
						for (i = 0; i < this.str.length; i++) {
							if (unary && this.str.charAt(i) === '-') {
								unary = false;
								stripped += this.str.charAt(i);
								lastNumericChar = i;
							} else if (isDigit(this.str.charAt(i))) {
								stripped += this.str.charAt(i);
								unary = false;
								lastNumericChar = i;
							} else if (this.str.charAt(i) === this.decimal) {
								stripped += "."; // always convert to period
								unary = false;
								lastNumericChar = i;
							} // else ignore
						}
						// record what we actually parsed
						this.parsed = this.str.substring(0, lastNumericChar+1);
						this.value = parseFloat(stripped);
						break;
					case 'number':
						this.str = "" + str;
						this.value = str;
						break;
						
					case 'object':
						this.value = /** @type {number} */ str.valueOf();
						this.str = "" + this.value;
						break;
						
					case 'undefined':
						this.value = 0;
						this.str = "0";
						break;
					}
					
					switch (this.type) {
						default:
							// don't need to do anything special for other types
							break;
						case "percentage":
							if (this.str.indexOf(li.getPercentageSymbol()) !== -1) {
								this.value /= 100;
							}
							break;
						case "currency":
							stripped = "";
							i = 0;
							while (i < this.str.length &&
								   !isDigit(this.str.charAt(i)) &&
								   !isSpace(this.str.charAt(i))) {
								stripped += this.str.charAt(i++);
							}
							if (stripped.length === 0) {
								while (i < this.str.length && 
									   isDigit(this.str.charAt(i)) ||
									   isSpace(this.str.charAt(i)) ||
									   this.str.charAt(i) === '.' ||
									   this.str.charAt(i) === ',' ) {
									i++;
								}
								while (i < this.str.length && 
									   !isDigit(this.str.charAt(i)) &&
									   !isSpace(this.str.charAt(i))) {
									stripped += this.str.charAt(i++);
								}
							}
							new Currency({
								locale: this.locale, 
								sign: stripped,
								sync: sync,
								onLoad: ilib.bind(this, function (cur) {
									this.currency = cur;
									if (options && typeof(options.onLoad) === 'function') {
										options.onLoad(this);
									}				
								})
							});
							return;
					}
					
					if (options && typeof(options.onLoad) === 'function') {
						options.onLoad(this);
					}
				})
			});
		}));
	}));
};

INumber.prototype = {
	/**
	 * Return the locale for this formatter instance.
	 * @return {Locale} the locale instance for this formatter
	 */
	getLocale: function () {
		return this.locale;
	},
	
	/**
	 * Return the original string that this number instance was created with.
	 * @return {string} the original string
	 */
	toString: function () {
		return this.str;
	},
	
	/**
	 * If the type of this INumber instance is "currency", then the parser will attempt
	 * to figure out which currency this amount represents. The amount can be written
	 * with any of the currency signs or ISO 4217 codes that are currently
	 * recognized by ilib, and the currency signs may occur before or after the
	 * numeric portion of the string. If no currency can be recognized, then the 
	 * default currency for the locale is returned. If multiple currencies can be
	 * recognized (for example if the currency sign is "$"), then this method 
	 * will prefer the one for the current locale. If multiple currencies can be
	 * recognized, but none are used in the current locale, then the first currency
	 * encountered will be used. This may produce random results, though the larger
	 * currencies occur earlier in the list. For example, if the sign found in the
	 * string is "$" and that is not the sign of the currency of the current locale
	 * then the US dollar will be recognized, as it is the largest currency that uses
	 * the "$" as its sign.
	 * 
	 * @return {Currency|undefined} the currency instance for this amount, or 
	 * undefined if this INumber object is not of type currency
	 */
	getCurrency: function () {
		return this.currency;
	},
	
	/**
	 * Return the value of this INumber object as a primitive number instance.
	 * @return {number} the value of this number instance
	 */
	valueOf: function () {
		return this.value;
	}
};

module.exports = INumber;
},{'./ilib.js':'enyo-ilib/ilib','./Utils.js':'enyo-ilib/Utils','./Locale.js':'enyo-ilib/Locale','./LocaleInfo.js':'enyo-ilib/LocaleInfo','./CType.js':'enyo-ilib/CType','./isDigit.js':'enyo-ilib/isDigit','./isSpace.js':'enyo-ilib/isSpace','./Currency.js':'enyo-ilib/Currency'}],'enyo-ilib/GregorianDate':[function (module,exports,global,require,request){
/*
 * GregorianDate.js - Represent a date in the Gregorian calendar
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
ilib.js
IDate.js 
GregorianCal.js 
SearchUtils.js
MathUtils.js
Locale.js
LocaleInfo.js 
JulianDay.js
GregRataDie.js
TimeZone.js
*/

var ilib = require("./ilib.js");
var SearchUtils = require("./SearchUtils.js");
var MathUtils = require("./MathUtils.js");

var Locale = require("./Locale.js");
var LocaleInfo = require("./LocaleInfo.js");
var JulianDay = require("./JulianDay.js");
var IDate = require("./IDate.js");
var TimeZone = require("./TimeZone.js");
var Calendar = require("./Calendar.js");

var GregorianCal = require("./GregorianCal.js");
var GregRataDie = require("./GregRataDie.js");

/**
 * @class
 * Construct a new Gregorian date object. The constructor parameters can 
 * contain any of the following properties:
 * 
 * <ul>
 * <li><i>unixtime<i> - sets the time of this instance according to the given 
 * unix time. Unix time is the number of milliseconds since midnight on Jan 1, 1970.
 * 
 * <li><i>julianday</i> - sets the time of this instance according to the given
 * Julian Day instance or the Julian Day given as a float
 * 
 * <li><i>year</i> - any integer, including 0
 * 
 * <li><i>month</i> - 1 to 12, where 1 means January, 2 means February, etc.
 * 
 * <li><i>day</i> - 1 to 31
 * 
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * 
 * <li><i>minute</i> - 0 to 59
 * 
 * <li><i>second</i> - 0 to 59
 * 
 * <li><i>millisecond</i> - 0 to 999
 * 
 * <li><i>dst</i> - boolean used to specify whether the given time components are
 * intended to be in daylight time or not. This is only used in the overlap
 * time when transitioning from DST to standard time, and the time components are 
 * ambiguous. Otherwise at all other times of the year, this flag is ignored.
 * If you specify the date using unix time (UTC) or a julian day, then the time is
 * already unambiguous and this flag does not need to be specified.
 * <p>
 * For example, in the US, the transition out of daylight savings time 
 * in 2014 happens at Nov 2, 2014 2:00am Daylight Time, when the time falls 
 * back to Nov 2, 2014 1:00am Standard Time. If you give a date/time components as 
 * "Nov 2, 2014 1:30am", then there are two 1:30am times in that day, and you would 
 * have to give the standard flag to indicate which of those two you mean. 
 * (dst=true means daylight time, dst=false means standard time).   
 * 
 * <li><i>timezone</i> - the TimeZone instance or time zone name as a string 
 * of this gregorian date. The date/time is kept in the local time. The time zone
 * is used later if this date is formatted according to a different time zone and
 * the difference has to be calculated, or when the date format has a time zone
 * component in it.
 * 
 * <li><i>locale</i> - locale for this gregorian date. If the time zone is not 
 * given, it can be inferred from this locale. For locales that span multiple
 * time zones, the one with the largest population is chosen as the one that 
 * represents the locale.
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 *
 * If the constructor is called with another Gregorian date instance instead of
 * a parameter block, the other instance acts as a parameter block and its
 * settings are copied into the current instance.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above 
 * from <i>unixtime</i> through <i>millisecond</i> are present, then the date 
 * components are 
 * filled in with the current date at the time of instantiation. Note that if
 * you do not give the time zone when defaulting to the current time and the 
 * time zone for all of ilib was not set with <i>ilib.setTimeZone()</i>, then the
 * time zone will default to UTC ("Universal Time, Coordinated" or "Greenwich 
 * Mean Time").<p>
 * 
 * If any of the properties from <i>year</i> through <i>millisecond</i> are not
 * specified in the params, it is assumed that they have the smallest possible
 * value in the range for the property (zero or one).<p>
 * 
 * 
 * @constructor
 * @extends IDate
 * @param {Object=} params parameters that govern the settings and behaviour of this Gregorian date
 */
var GregorianDate = function(params) {
	this.cal = new GregorianCal();
	this.timezone = "local";

	if (params) {
		if (typeof(params.noinstance) === 'boolean' && params.noinstance) {
			// for doing inheritance, so don't need to fill in the data. The inheriting class only wants the methods.
			return;
		}
		if (params.locale) {
			this.locale = (typeof(params.locale) === 'string') ? new Locale(params.locale) : params.locale;
			var li = new LocaleInfo(this.locale);
			this.timezone = li.getTimeZone(); 
		}
		if (params.timezone) {
			this.timezone = params.timezone.toString();
		}
		
		if (params.year || params.month || params.day || params.hour ||
				params.minute || params.second || params.millisecond ) {
			this.year = parseInt(params.year, 10) || 0;
			this.month = parseInt(params.month, 10) || 1;
			this.day = parseInt(params.day, 10) || 1;
			this.hour = parseInt(params.hour, 10) || 0;
			this.minute = parseInt(params.minute, 10) || 0;
			this.second = parseInt(params.second, 10) || 0;
			this.millisecond = parseInt(params.millisecond, 10) || 0;
			if (typeof(params.dst) === 'boolean') {
				this.dst = params.dst;
			}
			this.rd = this.newRd(params);
			
			// add the time zone offset to the rd to convert to UTC
			this.offset = 0;
			if (this.timezone === "local" && typeof(params.dst) === 'undefined') {
				// if dst is defined, the intrinsic Date object has no way of specifying which version of a time you mean
				// in the overlap time at the end of DST. Do you mean the daylight 1:30am or the standard 1:30am? In this
				// case, use the ilib calculations below, which can distinguish between the two properly
				var d = new Date(this.year, this.month-1, this.day, this.hour, this.minute, this.second, this.millisecond);
				this.offset = -d.getTimezoneOffset() / 1440;
			} else {
				if (!this.tz) {
					this.tz = new TimeZone({id: this.timezone});
				}
				// getOffsetMillis requires that this.year, this.rd, and this.dst 
				// are set in order to figure out which time zone rules apply and 
				// what the offset is at that point in the year
				this.offset = this.tz._getOffsetMillisWallTime(this) / 86400000;
			}
			if (this.offset !== 0) {
				this.rd = this.newRd({
					rd: this.rd.getRataDie() - this.offset
				});
			}
		}
	} 

	if (!this.rd) {
		this.rd = this.newRd(params);
		this._calcDateComponents();
	}
};

GregorianDate.prototype = new IDate({noinstance: true});
GregorianDate.prototype.parent = IDate;
GregorianDate.prototype.constructor = GregorianDate;

/**
 * Return a new RD for this date type using the given params.
 * @private
 * @param {Object=} params the parameters used to create this rata die instance
 * @returns {RataDie} the new RD instance for the given params
 */
GregorianDate.prototype.newRd = function (params) {
	return new GregRataDie(params);
};

/**
 * Calculates the Gregorian year for a given rd number.
 * @private
 * @static
 */
GregorianDate._calcYear = function(rd) {
	var days400,
		days100,
		days4,
		years400,
		years100,
		years4,
		years1,
		year;

	years400 = Math.floor((rd - 1) / 146097);
	days400 = MathUtils.mod((rd - 1), 146097);
	years100 = Math.floor(days400 / 36524);
	days100 = MathUtils.mod(days400, 36524);
	years4 = Math.floor(days100 / 1461);
	days4 = MathUtils.mod(days100, 1461);
	years1 = Math.floor(days4 / 365);
	
	year = 400 * years400 + 100 * years100 + 4 * years4 + years1;
	if (years100 !== 4 && years1 !== 4) {
		year++;
	}
	return year;
};

/**
 * @private
 */
GregorianDate.prototype._calcYear = function(rd) {
	return GregorianDate._calcYear(rd);
};

/**
 * Calculate the date components for the current time zone
 * @private
 */
GregorianDate.prototype._calcDateComponents = function () {
	if (this.timezone === "local" && this.rd.getRataDie() >= -99280837 && this.rd.getRataDie() <= 100719163) {
		// console.log("using js Date to calculate offset");
		// use the intrinsic JS Date object to do the tz conversion for us, which 
		// guarantees that it follows the system tz database settings 
		var d = new Date(this.rd.getTimeExtended());
	
		/**
		 * Year in the Gregorian calendar.
		 * @type number
		 */
		this.year = d.getFullYear();
		
		/**
		 * The month number, ranging from 1 (January) to 12 (December).
		 * @type number
		 */
		this.month = d.getMonth()+1;
		
		/**
		 * The day of the month. This ranges from 1 to 31.
		 * @type number
		 */
		this.day = d.getDate();
		
		/**
		 * The hour of the day. This can be a number from 0 to 23, as times are
		 * stored unambiguously in the 24-hour clock.
		 * @type number
		 */
		this.hour = d.getHours();
		
		/**
		 * The minute of the hours. Ranges from 0 to 59.
		 * @type number
		 */
		this.minute = d.getMinutes();
		
		/**
		 * The second of the minute. Ranges from 0 to 59.
		 * @type number
		 */
		this.second = d.getSeconds();
		
		/**
		 * The millisecond of the second. Ranges from 0 to 999.
		 * @type number
		 */
		this.millisecond = d.getMilliseconds();
		
		this.offset = -d.getTimezoneOffset() / 1440;
	} else {
		// console.log("using ilib to calculate offset. tz is " + this.timezone);
		// console.log("GregDate._calcDateComponents: date is " + JSON.stringify(this) + " parent is " + JSON.stringify(this.parent) + " and parent.parent is " + JSON.stringify(this.parent.parent));
		if (typeof(this.offset) === "undefined") {
			// console.log("calculating offset");
			this.year = this._calcYear(this.rd.getRataDie());
			
			// now offset the RD by the time zone, then recalculate in case we were 
			// near the year boundary
			if (!this.tz) {
				this.tz = new TimeZone({id: this.timezone});
			}
			this.offset = this.tz.getOffsetMillis(this) / 86400000;
		// } else {
			// console.log("offset is already defined somehow. type is " + typeof(this.offset));
			// console.trace("Stack is this one");
		}
		// console.log("offset is " + this.offset);
		var rd = this.rd.getRataDie();
		if (this.offset !== 0) {
			rd += this.offset;
		}
		this.year = this._calcYear(rd);
		
		var yearStartRd = this.newRd({
			year: this.year,
			month: 1,
			day: 1,
			cal: this.cal
		});
		
		// remainder is days into the year
		var remainder = rd - yearStartRd.getRataDie() + 1;
		
		var cumulative = GregorianCal.prototype.isLeapYear.call(this.cal, this.year) ? 
			GregRataDie.cumMonthLengthsLeap : 
			GregRataDie.cumMonthLengths; 
		
		this.month = SearchUtils.bsearch(Math.floor(remainder), cumulative);
		remainder = remainder - cumulative[this.month-1];
		
		this.day = Math.floor(remainder);
		remainder -= this.day;
		// now convert to milliseconds for the rest of the calculation
		remainder = Math.round(remainder * 86400000);
		
		this.hour = Math.floor(remainder/3600000);
		remainder -= this.hour * 3600000;
		
		this.minute = Math.floor(remainder/60000);
		remainder -= this.minute * 60000;
		
		this.second = Math.floor(remainder/1000);
		remainder -= this.second * 1000;
		
		this.millisecond = Math.floor(remainder);
	}
};

/**
 * Return the day of the week of this date. The day of the week is encoded
 * as number from 0 to 6, with 0=Sunday, 1=Monday, etc., until 6=Saturday.
 * 
 * @return {number} the day of the week
 */
GregorianDate.prototype.getDayOfWeek = function() {
	var rd = Math.floor(this.rd.getRataDie() + (this.offset || 0));
	return MathUtils.mod(rd, 7);
};

/**
 * Return the ordinal day of the year. Days are counted from 1 and proceed linearly up to 
 * 365, regardless of months or weeks, etc. That is, January 1st is day 1, and 
 * December 31st is 365 in regular years, or 366 in leap years.
 * @return {number} the ordinal day of the year
 */
GregorianDate.prototype.getDayOfYear = function() {
	var cumulativeMap = this.cal.isLeapYear(this.year) ? 
		GregRataDie.cumMonthLengthsLeap : 
		GregRataDie.cumMonthLengths; 
		
	return cumulativeMap[this.month-1] + this.day;
};

/**
 * Return the era for this date as a number. The value for the era for Gregorian 
 * calendars is -1 for "before the common era" (BCE) and 1 for "the common era" (CE). 
 * BCE dates are any date before Jan 1, 1 CE. In the proleptic Gregorian calendar, 
 * there is a year 0, so any years that are negative or zero are BCE. In the Julian
 * calendar, there is no year 0. Instead, the calendar goes straight from year -1 to 
 * 1.
 * @return {number} 1 if this date is in the common era, -1 if it is before the 
 * common era 
 */
GregorianDate.prototype.getEra = function() {
	return (this.year < 1) ? -1 : 1;
};

/**
 * Return the name of the calendar that governs this date.
 * 
 * @return {string} a string giving the name of the calendar
 */
GregorianDate.prototype.getCalendar = function() {
	return "gregorian";
};

// register with the factory method
IDate._constructors["gregorian"] = GregorianDate;

module.exports = GregorianDate;
},{'./ilib.js':'enyo-ilib/ilib','./SearchUtils.js':'enyo-ilib/SearchUtils','./MathUtils.js':'enyo-ilib/MathUtils','./Locale.js':'enyo-ilib/Locale','./LocaleInfo.js':'enyo-ilib/LocaleInfo','./JulianDay.js':'enyo-ilib/JulianDay','./IDate.js':'enyo-ilib/IDate','./TimeZone.js':'enyo-ilib/TimeZone','./Calendar.js':'enyo-ilib/Calendar','./GregorianCal.js':'enyo-ilib/GregorianCal','./GregRataDie.js':'enyo-ilib/GregRataDie'}],'enyo-ilib/EthiopicDate':[function (module,exports,global,require,request){
/*
 * EthiopicDate.js - Represent a date in the Ethiopic calendar
 * 
 * Copyright © 2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
ilib.js
IDate.js 
EthiopicCal.js 
MathUtils.js
Locale.js
LocaleInfo.js 
TimeZone.js
EthiopicRataDie.js
*/

var ilib = require("./ilib.js");
var MathUtils = require("./MathUtils.js");

var EthiopicRataDie = require("./EthiopicRataDie.js");
var Locale = require("./Locale.js");
var LocaleInfo = require("./LocaleInfo.js");
var IDate = require("./IDate.js");
var TimeZone = require("./TimeZone.js");
var Calendar = require("./Calendar.js");
var EthiopicCal = require("./EthiopicCal.js");

/**
 * @class
 * Construct a new date object for the Ethiopic Calendar. The constructor can be called
 * with a parameter object that contains any of the following properties:
 * 
 * <ul>
 * <li><i>unixtime<i> - sets the time of this instance according to the given 
 * unix time. Unix time is the number of milliseconds since midnight on Jan 1, 1970 (Gregorian).
 * <li><i>julianday</i> - the Julian Day to set into this date
 * <li><i>year</i> - any integer
 * <li><i>month</i> - 1 to 13, where 1 means Maskaram, 2 means Teqemt, etc., and 13 means Paguemen
 * <li><i>day</i> - 1 to 30
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * <li><i>minute</i> - 0 to 59
 * <li><i>second</i> - 0 to 59
 * <li><i>millisecond<i> - 0 to 999
 * <li><i>locale</i> - the TimeZone instance or time zone name as a string 
 * of this ethiopic date. The date/time is kept in the local time. The time zone
 * is used later if this date is formatted according to a different time zone and
 * the difference has to be calculated, or when the date format has a time zone
 * component in it.
 * <li><i>timezone</i> - the time zone of this instance. If the time zone is not 
 * given, it can be inferred from this locale. For locales that span multiple
 * time zones, the one with the largest population is chosen as the one that 
 * represents the locale. 
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 *  
 * If called with another Ethiopic date argument, the date components of the given
 * date are copied into the current one.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above 
 * from <i>unixtime</i> through <i>millisecond</i> are present, then the date 
 * components are 
 * filled in with the current date at the time of instantiation. Note that if
 * you do not give the time zone when defaulting to the current time and the 
 * time zone for all of ilib was not set with <i>ilib.setTimeZone()</i>, then the
 * time zone will default to UTC ("Universal Time, Coordinated" or "Greenwich 
 * Mean Time").<p>
 * 
 * 
 * @constructor
 * @extends IDate
 * @param {Object=} params parameters that govern the settings and behaviour of this Ethiopic date
 */
var EthiopicDate = function(params) {
	this.cal = new EthiopicCal();
	
	if (params) {
		if (typeof(params.noinstance) === 'boolean' && params.noinstance) {
			// for doing inheritance, so don't need to fill in the data. The inheriting class only wants the methods.
			return;
		}
		if (params.locale) {
			this.locale = (typeof(params.locale) === 'string') ? new Locale(params.locale) : params.locale;
			var li = new LocaleInfo(this.locale);
			this.timezone = li.getTimeZone(); 
		}
		if (params.timezone) {
			this.timezone = params.timezone;
		}
		
		if (params.year || params.month || params.day || params.hour ||
				params.minute || params.second || params.millisecond ) {
			/**
			 * Year in the Ethiopic calendar.
			 * @type number
			 */
			this.year = parseInt(params.year, 10) || 0;
			/**
			 * The month number, ranging from 1 (Maskaram) to 13 (Paguemen).
			 * @type number
			 */
			this.month = parseInt(params.month, 10) || 1;
			/**
			 * The day of the month. This ranges from 1 to 30.
			 * @type number
			 */
			this.day = parseInt(params.day, 10) || 1;
			/**
			 * The hour of the day. This can be a number from 0 to 23, as times are
			 * stored unambiguously in the 24-hour clock.
			 * @type number
			 */
			this.hour = parseInt(params.hour, 10) || 0;
			/**
			 * The minute of the hours. Ranges from 0 to 59.
			 * @type number
			 */
			this.minute = parseInt(params.minute, 10) || 0;
			/**
			 * The second of the minute. Ranges from 0 to 59.
			 * @type number
			 */
			this.second = parseInt(params.second, 10) || 0;
			/**
			 * The millisecond of the second. Ranges from 0 to 999.
			 * @type number
			 */
			this.millisecond = parseInt(params.millisecond, 10) || 0;
			
			/**
			 * The day of the year. Ranges from 1 to 366.
			 * @type number
			 */
			this.dayOfYear = parseInt(params.dayOfYear, 10);
			
			if (typeof(params.dst) === 'boolean') {
				this.dst = params.dst;
			}
			
			this.rd = this.newRd(this);
			
			// add the time zone offset to the rd to convert to UTC
			if (!this.tz) {
				this.tz = new TimeZone({id: this.timezone});
			}
			// getOffsetMillis requires that this.year, this.rd, and this.dst 
			// are set in order to figure out which time zone rules apply and 
			// what the offset is at that point in the year
			this.offset = this.tz._getOffsetMillisWallTime(this) / 86400000;
			if (this.offset !== 0) {
				this.rd = this.newRd({
					rd: this.rd.getRataDie() - this.offset
				});
			}
		}
	}
	
	if (!this.rd) {
		this.rd = this.newRd(params);
		this._calcDateComponents();
	}
};

EthiopicDate.prototype = new IDate({ noinstance: true });
EthiopicDate.prototype.parent = IDate;
EthiopicDate.prototype.constructor = EthiopicDate;

/**
 * Return a new RD for this date type using the given params.
 * @protected
 * @param {Object=} params the parameters used to create this rata die instance
 * @returns {RataDie} the new RD instance for the given params
 */
EthiopicDate.prototype.newRd = function (params) {
	return new EthiopicRataDie(params);
};

/**
 * Return the year for the given RD
 * @protected
 * @param {number} rd RD to calculate from 
 * @returns {number} the year for the RD
 */
EthiopicDate.prototype._calcYear = function(rd) {
	var year = Math.floor((4*(Math.floor(rd)-1) + 1463)/1461);
	
	return year;
};

/**
 * Calculate date components for the given RD date.
 * @protected
 */
EthiopicDate.prototype._calcDateComponents = function () {
	var remainder,
		cumulative,
		rd = this.rd.getRataDie();
	
	this.year = this._calcYear(rd);

	if (typeof(this.offset) === "undefined") {
		this.year = this._calcYear(rd);
		
		// now offset the RD by the time zone, then recalculate in case we were 
		// near the year boundary
		if (!this.tz) {
			this.tz = new TimeZone({id: this.timezone});
		}
		this.offset = this.tz.getOffsetMillis(this) / 86400000;
	}

	if (this.offset !== 0) {
		rd += this.offset;
		this.year = this._calcYear(rd);
	}
	
	var jan1 = this.newRd({
		year: this.year,
		month: 1,
		day: 1,
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0
	});
	remainder = rd + 1 - jan1.getRataDie();
	
	this.month = Math.floor((remainder-1)/30) + 1;
	remainder = remainder - (this.month-1) * 30;
	
	this.day = Math.floor(remainder);
	remainder -= this.day;
	// now convert to milliseconds for the rest of the calculation
	remainder = Math.round(remainder * 86400000);
	
	this.hour = Math.floor(remainder/3600000);
	remainder -= this.hour * 3600000;
	
	this.minute = Math.floor(remainder/60000);
	remainder -= this.minute * 60000;
	
	this.second = Math.floor(remainder/1000);
	remainder -= this.second * 1000;
	
	this.millisecond = remainder;
};

/**
 * Return the day of the week of this date. The day of the week is encoded
 * as number from 0 to 6, with 0=Sunday, 1=Monday, etc., until 6=Saturday.
 * 
 * @return {number} the day of the week
 */
EthiopicDate.prototype.getDayOfWeek = function() {
	var rd = Math.floor(this.rd.getRataDie() + (this.offset || 0));
	return MathUtils.mod(rd-4, 7);
};

/**
 * Return the name of the calendar that governs this date.
 * 
 * @return {string} a string giving the name of the calendar
 */
EthiopicDate.prototype.getCalendar = function() {
	return "ethiopic";
};

//register with the factory method
IDate._constructors["ethiopic"] = EthiopicDate;

module.exports = EthiopicDate;

},{'./ilib.js':'enyo-ilib/ilib','./MathUtils.js':'enyo-ilib/MathUtils','./EthiopicRataDie.js':'enyo-ilib/EthiopicRataDie','./Locale.js':'enyo-ilib/Locale','./LocaleInfo.js':'enyo-ilib/LocaleInfo','./IDate.js':'enyo-ilib/IDate','./TimeZone.js':'enyo-ilib/TimeZone','./Calendar.js':'enyo-ilib/Calendar','./EthiopicCal.js':'enyo-ilib/EthiopicCal'}],'enyo-ilib/HebrewDate':[function (module,exports,global,require,request){
/*
 * HebrewDate.js - Represent a date in the Hebrew calendar
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
ilib.js
Locale.js
LocaleInfo.js
TimeZone.js
IDate.js
MathUtils.js
Calendar.js
HebrewCal.js
HebrewRataDie.js
*/

var ilib = require("./ilib.js");
var MathUtils = require("./MathUtils.js");

var Locale = require("./Locale.js");
var LocaleInfo = require("./LocaleInfo.js");
var IDate = require("./IDate.js");
var TimeZone = require("./TimeZone.js");
var Calendar = require("./Calendar.js");

var HebrewCal = require("./HebrewCal.js");
var HebrewRataDie = require("./HebrewRataDie.js");

/**
 * @class
 * Construct a new civil Hebrew date object. The constructor can be called
 * with a params object that can contain the following properties:<p>
 * 
 * <ul>
 * <li><i>julianday</i> - the Julian Day to set into this date
 * <li><i>year</i> - any integer except 0. Years go from -1 (BCE) to 1 (CE), skipping the zero year
 * <li><i>month</i> - 1 to 12, where 1 means Nisan, 2 means Iyyar, etc.
 * <li><i>day</i> - 1 to 30
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * <li><i>parts</i> - 0 to 1079. Specify the halaqim parts of an hour. Either specify 
 * the parts or specify the minutes, seconds, and milliseconds, but not both. 
 * <li><i>minute</i> - 0 to 59
 * <li><i>second</i> - 0 to 59
 * <li><i>millisecond</i> - 0 to 999
 * <li><i>locale</i> - the TimeZone instance or time zone name as a string 
 * of this julian date. The date/time is kept in the local time. The time zone
 * is used later if this date is formatted according to a different time zone and
 * the difference has to be calculated, or when the date format has a time zone
 * component in it.
 * <li><i>timezone</i> - the time zone of this instance. If the time zone is not 
 * given, it can be inferred from this locale. For locales that span multiple
 * time zones, the one with the largest population is chosen as the one that 
 * represents the locale. 
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 * 
 * If called with another Hebrew date argument, the date components of the given
 * date are copied into the current one.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above 
 * from <i>julianday</i> through <i>millisecond</i> are present, then the date 
 * components are 
 * filled in with the current date at the time of instantiation. Note that if
 * you do not give the time zone when defaulting to the current time and the 
 * time zone for all of ilib was not set with <i>ilib.setTimeZone()</i>, then the
 * time zone will default to UTC ("Universal Time, Coordinated" or "Greenwich 
 * Mean Time").<p>
 * 
 * 
 * @constructor
 * @extends IDate
 * @param {Object=} params parameters that govern the settings and behaviour of this Hebrew date
 */
var HebrewDate = function(params) {
	this.cal = new HebrewCal();
	
	if (params) {
		if (params.timezone) {
			this.timezone = params.timezone;
		}
		if (params.locale) {
			this.locale = (typeof(params.locale) === 'string') ? new Locale(params.locale) : params.locale;
			if (!this.timezone) {
				var li = new LocaleInfo(this.locale);
				this.timezone = li.getTimeZone(); 
			}
		}

		if (params.year || params.month || params.day || params.hour ||
				params.minute || params.second || params.millisecond || params.parts ) {
			/**
			 * Year in the Hebrew calendar.
			 * @type number
			 */
			this.year = parseInt(params.year, 10) || 0;

			/**
			 * The month number, ranging from 1 to 13.
			 * @type number
			 */
			this.month = parseInt(params.month, 10) || 1;

			/**
			 * The day of the month. This ranges from 1 to 30.
			 * @type number
			 */
			this.day = parseInt(params.day, 10) || 1;
			
			/**
			 * The hour of the day. This can be a number from 0 to 23, as times are
			 * stored unambiguously in the 24-hour clock.
			 * @type number
			 */
			this.hour = parseInt(params.hour, 10) || 0;

			if (typeof(params.parts) !== 'undefined') {
				/**
				 * The parts (halaqim) of the hour. This can be a number from 0 to 1079.
				 * @type number
				 */
				this.parts = parseInt(params.parts, 10);
				var seconds = parseInt(params.parts, 10) * 3.333333333333;
				this.minute = Math.floor(seconds / 60);
				seconds -= this.minute * 60;
				this.second = Math.floor(seconds);
				this.millisecond = (seconds - this.second);	
			} else {
				/**
				 * The minute of the hours. Ranges from 0 to 59.
				 * @type number
				 */
				this.minute = parseInt(params.minute, 10) || 0;
	
				/**
				 * The second of the minute. Ranges from 0 to 59.
				 * @type number
				 */
				this.second = parseInt(params.second, 10) || 0;
	
				/**
				 * The millisecond of the second. Ranges from 0 to 999.
				 * @type number
				 */
				this.millisecond = parseInt(params.millisecond, 10) || 0;
			}
				
			/**
			 * The day of the year. Ranges from 1 to 383.
			 * @type number
			 */
			this.dayOfYear = parseInt(params.dayOfYear, 10);
			
			if (typeof(params.dst) === 'boolean') {
				this.dst = params.dst;
			}
			
			this.rd = this.newRd(this);
			
			// add the time zone offset to the rd to convert to UTC
			if (!this.tz) {
				this.tz = new TimeZone({id: this.timezone});
			}
			// getOffsetMillis requires that this.year, this.rd, and this.dst 
			// are set in order to figure out which time zone rules apply and 
			// what the offset is at that point in the year
			this.offset = this.tz._getOffsetMillisWallTime(this) / 86400000;
			if (this.offset !== 0) {
				this.rd = this.newRd({
					rd: this.rd.getRataDie() - this.offset
				});
			}
		}
	} 
	
	if (!this.rd) {
		this.rd = this.newRd(params);
		this._calcDateComponents();
	}
};

HebrewDate.prototype = new IDate({noinstance: true});
HebrewDate.prototype.parent = IDate;
HebrewDate.prototype.constructor = HebrewDate;

/**
 * the cumulative lengths of each month for a non-leap year, without new years corrections,
 * that can be used in reverse to map days to months
 * @private
 * @const
 * @type Array.<number>
 */
HebrewDate.cumMonthLengthsReverse = [
//  [days, monthnumber],                                                
	[0,   7],  /* Tishri - Jewish New Year (Rosh HaShanah) starts in month 7 */
	[30,  8],  /* Heshvan */
	[59,  9],  /* Kislev */
	[88,  10], /* Teveth */
	[117, 11], /* Shevat */
	[147, 12], /* Adar I */
	[176, 1],  /* Nisan */
	[206, 2],  /* Iyyar */
	[235, 3],  /* Sivan */
	[265, 4],  /* Tammuz */
	[294, 5],  /* Av */
	[324, 6],  /* Elul */
	[354, 7]   /* end of year sentinel value */
];

/**
 * the cumulative lengths of each month for a leap year, without new years corrections
 * that can be used in reverse to map days to months 
 * 
 * @private
 * @const
 * @type Array.<number>
 */
HebrewDate.cumMonthLengthsLeapReverse = [
//  [days, monthnumber],                                                
	[0,   7],  /* Tishri - Jewish New Year (Rosh HaShanah) starts in month 7 */
	[30,  8],  /* Heshvan */
	[59,  9],  /* Kislev */
	[88,  10], /* Teveth */
	[117, 11], /* Shevat */
	[147, 12], /* Adar I */
	[177, 13], /* Adar II */
	[206, 1],  /* Nisan */
	[236, 2],  /* Iyyar */
	[265, 3],  /* Sivan */
	[295, 4],  /* Tammuz */
	[324, 5],  /* Av */
	[354, 6],  /* Elul */
	[384, 7]   /* end of year sentinel value */
];

/**
 * Number of days difference between RD 0 of the Hebrew calendar 
 * (Jan 1, 1 Gregorian = JD 1721057.5) and RD 0 of the Hebrew calendar
 * (September 7, -3760 Gregorian = JD 347997.25)
 * @private
 * @const
 * @type number
 */
HebrewDate.GregorianDiff = 1373060.25;

/**
 * Return a new RD for this date type using the given params.
 * @private
 * @param {Object=} params the parameters used to create this rata die instance
 * @returns {RataDie} the new RD instance for the given params
 */
HebrewDate.prototype.newRd = function (params) {
	return new HebrewRataDie(params);
};

/**
 * Return the year for the given RD
 * @protected
 * @param {number} rd RD to calculate from 
 * @returns {number} the year for the RD
 */
HebrewDate.prototype._calcYear = function(rd) {
	var year, approximation, nextNewYear;
	
	// divide by the average number of days per year in the Hebrew calendar
	// to approximate the year, then tweak it to get the real year
	approximation = Math.floor(rd / 365.246822206) + 1;
	
	// console.log("HebrewDate._calcYear: approx is " + approximation);
	
	// search forward from approximation-1 for the year that actually contains this rd
	year = approximation;
	nextNewYear = HebrewCal.newYear(year);
	while (rd >= nextNewYear) {
		year++;
		nextNewYear = HebrewCal.newYear(year);
	}
	return year - 1;
};

/**
 * Calculate date components for the given RD date.
 * @protected
 */
HebrewDate.prototype._calcDateComponents = function () {
	var remainder,
		i,
		table,
		target,
		rd = this.rd.getRataDie();
	
	// console.log("HebrewDate.calcComponents: calculating for rd " + rd);

	if (typeof(this.offset) === "undefined") {
		this.year = this._calcYear(rd);
		
		// now offset the RD by the time zone, then recalculate in case we were 
		// near the year boundary
		if (!this.tz) {
			this.tz = new TimeZone({id: this.timezone});
		}
		this.offset = this.tz.getOffsetMillis(this) / 86400000;
	}

	if (this.offset !== 0) {
		rd += this.offset;
		this.year = this._calcYear(rd);
	}
	
	// console.log("HebrewDate.calcComponents: year is " + this.year + " with starting rd " + thisNewYear);
	
	remainder = rd - HebrewCal.newYear(this.year);
	// console.log("HebrewDate.calcComponents: remainder is " + remainder);

	// take out new years corrections so we get the right month when we look it up in the table
	if (remainder >= 59) {
		if (remainder >= 88) {
			if (HebrewCal.longKislev(this.year)) {
				remainder--;
			}
		}
		if (HebrewCal.longHeshvan(this.year)) {
			remainder--;
		}
	}
	
	// console.log("HebrewDate.calcComponents: after new years corrections, remainder is " + remainder);
	
	table = this.cal.isLeapYear(this.year) ? 
			HebrewDate.cumMonthLengthsLeapReverse :
			HebrewDate.cumMonthLengthsReverse;
	
	i = 0;
	target = Math.floor(remainder);
	while (i+1 < table.length && target >= table[i+1][0]) {
		i++;
	}
	
	this.month = table[i][1];
	// console.log("HebrewDate.calcComponents: remainder is " + remainder);
	remainder -= table[i][0];
	
	// console.log("HebrewDate.calcComponents: month is " + this.month + " and remainder is " + remainder);
	
	this.day = Math.floor(remainder);
	remainder -= this.day;
	this.day++; // days are 1-based
	
	// console.log("HebrewDate.calcComponents: day is " + this.day + " and remainder is " + remainder);

	// now convert to milliseconds for the rest of the calculation
	remainder = Math.round(remainder * 86400000);
	
	this.hour = Math.floor(remainder/3600000);
	remainder -= this.hour * 3600000;
	
	// the hours from 0 to 6 are actually 18:00 to midnight of the previous
	// gregorian day, so we have to adjust for that
	if (this.hour >= 6) {
		this.hour -= 6;
	} else {
		this.hour += 18;
	}
		
	this.minute = Math.floor(remainder/60000);
	remainder -= this.minute * 60000;
	
	this.second = Math.floor(remainder/1000);
	remainder -= this.second * 1000;
	
	this.millisecond = Math.floor(remainder);
};

/**
 * Return the day of the week of this date. The day of the week is encoded
 * as number from 0 to 6, with 0=Sunday, 1=Monday, etc., until 6=Saturday.
 * 
 * @return {number} the day of the week
 */
HebrewDate.prototype.getDayOfWeek = function() {
	var rd = Math.floor(this.rd.getRataDie() + (this.offset || 0));
	return MathUtils.mod(rd+1, 7);
};

/**
 * Get the Halaqim (parts) of an hour. There are 1080 parts in an hour, which means
 * each part is 3.33333333 seconds long. This means the number returned may not
 * be an integer.
 * 
 * @return {number} the halaqim parts of the current hour
 */
HebrewDate.prototype.getHalaqim = function() {
	if (this.parts < 0) {
		// convert to ms first, then to parts
		var h = this.minute * 60000 + this.second * 1000 + this.millisecond;
		this.parts = (h * 0.0003);
	}
	return this.parts;
};

/**
 * Return the rd number of the first Sunday of the given ISO year.
 * @protected
 * @return the rd of the first Sunday of the ISO year
 */
HebrewDate.prototype.firstSunday = function (year) {
	var tishri1 = this.newRd({
		year: year,
		month: 7,
		day: 1,
		hour: 18,
		minute: 0,
		second: 0,
		millisecond: 0,
		cal: this.cal
	});
	var firstThu = this.newRd({
		rd: tishri1.onOrAfter(4),
		cal: this.cal
	});
	return firstThu.before(0);
};

/**
 * Return the ordinal day of the year. Days are counted from 1 and proceed linearly up to 
 * 385, regardless of months or weeks, etc. That is, Tishri 1st is day 1, and 
 * Elul 29 is 385 for a leap year with a long Heshvan and long Kislev.
 * @return {number} the ordinal day of the year
 */
HebrewDate.prototype.getDayOfYear = function() {
	var table = this.cal.isLeapYear(this.year) ? 
				HebrewRataDie.cumMonthLengthsLeap : 
				HebrewRataDie.cumMonthLengths;
	var days = table[this.month-1];
	if ((this.month < 7 || this.month > 8) && HebrewCal.longHeshvan(this.year)) {
		days++;
	}
	if ((this.month < 7 || this.month > 9) && HebrewCal.longKislev(this.year)) {
		days++;
	}

	return days + this.day;
};

/**
 * Return the ordinal number of the week within the month. The first week of a month is
 * the first one that contains 4 or more days in that month. If any days precede this
 * first week, they are marked as being in week 0. This function returns values from 0
 * through 6.<p>
 * 
 * The locale is a required parameter because different locales that use the same 
 * Hebrew calendar consider different days of the week to be the beginning of
 * the week. This can affect the week of the month in which some days are located.
 * 
 * @param {Locale|string} locale the locale or locale spec to use when figuring out 
 * the first day of the week
 * @return {number} the ordinal number of the week within the current month
 */
HebrewDate.prototype.getWeekOfMonth = function(locale) {
	var li = new LocaleInfo(locale),
		first = this.newRd({
			year: this.year,
			month: this.month,
			day: 1,
			hour: 18,
			minute: 0,
			second: 0,
			millisecond: 0
		}),
		rd = this.rd.getRataDie(),
		weekStart = first.onOrAfter(li.getFirstDayOfWeek());
	
	if (weekStart - first.getRataDie() > 3) {
		// if the first week has 4 or more days in it of the current month, then consider
		// that week 1. Otherwise, it is week 0. To make it week 1, move the week start
		// one week earlier.
		weekStart -= 7;
	}
	return (rd < weekStart) ? 0 : Math.floor((rd - weekStart) / 7) + 1;
};

/**
 * Return the era for this date as a number. The value for the era for Hebrew 
 * calendars is -1 for "before the Hebrew era" and 1 for "the Hebrew era". 
 * Hebrew era dates are any date after Tishri 1, 1, which is the same as
 * September 7, 3760 BC in the Gregorian calendar. 
 * 
 * @return {number} 1 if this date is in the Hebrew era, -1 if it is before the 
 * Hebrew era 
 */
HebrewDate.prototype.getEra = function() {
	return (this.year < 1) ? -1 : 1;
};

/**
 * Return the name of the calendar that governs this date.
 * 
 * @return {string} a string giving the name of the calendar
 */
HebrewDate.prototype.getCalendar = function() {
	return "hebrew";
};

// register with the factory method
IDate._constructors["hebrew"] = HebrewDate;

module.exports = HebrewDate;

},{'./ilib.js':'enyo-ilib/ilib','./MathUtils.js':'enyo-ilib/MathUtils','./Locale.js':'enyo-ilib/Locale','./LocaleInfo.js':'enyo-ilib/LocaleInfo','./IDate.js':'enyo-ilib/IDate','./TimeZone.js':'enyo-ilib/TimeZone','./Calendar.js':'enyo-ilib/Calendar','./HebrewCal.js':'enyo-ilib/HebrewCal','./HebrewRataDie.js':'enyo-ilib/HebrewRataDie'}],'enyo-ilib/IslamicDate':[function (module,exports,global,require,request){
/*
 * islamicDate.js - Represent a date in the Islamic calendar
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
ilib.js
Locale.js
LocaleInfo.js
TimeZone.js
IDate.js
MathUtils.js
SearchUtils.js
Calendar.js
IslamicCal.js
IslamicRataDie.js
*/

var ilib = require("./ilib.js");
var SearchUtils = require("./SearchUtils.js");
var MathUtils = require("./MathUtils.js");

var Locale = require("./Locale.js");
var LocaleInfo = require("./LocaleInfo.js");
var TimeZone = require("./TimeZone.js");
var IDate = require("./IDate.js");
var Calendar = require("./Calendar.js");

var IslamicRataDie = require("./IslamicRataDie.js");
var IslamicCal = require("./IslamicCal.js");

/**
 * @class
 * Construct a new civil Islamic date object. The constructor can be called
 * with a params object that can contain the following properties:<p>
 * 
 * <ul>
 * <li><i>julianday</i> - the Julian Day to set into this date
 * <li><i>year</i> - any integer except 0. Years go from -1 (BCE) to 1 (CE), skipping the zero year
 * <li><i>month</i> - 1 to 12, where 1 means Muharram, 2 means Saffar, etc.
 * <li><i>day</i> - 1 to 30
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * <li><i>minute</i> - 0 to 59
 * <li><i>second</i> - 0 to 59
 * <li><i>millisecond</i> - 0 to 999
 * <li><i>locale</i> - the TimeZone instance or time zone name as a string 
 * of this julian date. The date/time is kept in the local time. The time zone
 * is used later if this date is formatted according to a different time zone and
 * the difference has to be calculated, or when the date format has a time zone
 * component in it.
 * <li><i>timezone</i> - the time zone of this instance. If the time zone is not 
 * given, it can be inferred from this locale. For locales that span multiple
 * time zones, the one with the largest population is chosen as the one that 
 * represents the locale. 
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 * 
 * If called with another Islamic date argument, the date components of the given
 * date are copied into the current one.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above 
 * from <i>julianday</i> through <i>millisecond</i> are present, then the date 
 * components are 
 * filled in with the current date at the time of instantiation. Note that if
 * you do not give the time zone when defaulting to the current time and the 
 * time zone for all of ilib was not set with <i>ilib.setTimeZone()</i>, then the
 * time zone will default to UTC ("Universal Time, Coordinated" or "Greenwich 
 * Mean Time").<p>
 * 
 * 
 * @constructor
 * @extends IDate
 * @param {Object=} params parameters that govern the settings and behaviour of this Islamic date
 */
var IslamicDate = function(params) {
	this.cal = new IslamicCal();
	
	if (params) {
		if (params.locale) {
			this.locale = (typeof(params.locale) === 'string') ? new Locale(params.locale) : params.locale;
			var li = new LocaleInfo(this.locale);
			this.timezone = li.getTimeZone(); 
		}
		if (params.timezone) {
			this.timezone = params.timezone;
		}
		
		if (params.year || params.month || params.day || params.hour ||
				params.minute || params.second || params.millisecond ) {
			/**
			 * Year in the Islamic calendar.
			 * @type number
			 */
			this.year = parseInt(params.year, 10) || 0;

			/**
			 * The month number, ranging from 1 to 12 (December).
			 * @type number
			 */
			this.month = parseInt(params.month, 10) || 1;

			/**
			 * The day of the month. This ranges from 1 to 30.
			 * @type number
			 */
			this.day = parseInt(params.day, 10) || 1;
			
			/**
			 * The hour of the day. This can be a number from 0 to 23, as times are
			 * stored unambiguously in the 24-hour clock.
			 * @type number
			 */
			this.hour = parseInt(params.hour, 10) || 0;

			/**
			 * The minute of the hours. Ranges from 0 to 59.
			 * @type number
			 */
			this.minute = parseInt(params.minute, 10) || 0;

			/**
			 * The second of the minute. Ranges from 0 to 59.
			 * @type number
			 */
			this.second = parseInt(params.second, 10) || 0;

			/**
			 * The millisecond of the second. Ranges from 0 to 999.
			 * @type number
			 */
			this.millisecond = parseInt(params.millisecond, 10) || 0;
			
			/**
			 * The day of the year. Ranges from 1 to 355.
			 * @type number
			 */
			this.dayOfYear = parseInt(params.dayOfYear, 10);

			if (typeof(params.dst) === 'boolean') {
				this.dst = params.dst;
			}
			
			this.rd = this.newRd(this);
			
			// add the time zone offset to the rd to convert to UTC
			if (!this.tz) {
				this.tz = new TimeZone({id: this.timezone});
			}
			// getOffsetMillis requires that this.year, this.rd, and this.dst 
			// are set in order to figure out which time zone rules apply and 
			// what the offset is at that point in the year
			this.offset = this.tz._getOffsetMillisWallTime(this) / 86400000;
			if (this.offset !== 0) {
				this.rd = this.newRd({
					rd: this.rd.getRataDie() - this.offset
				});
			}
		}
	}

	if (!this.rd) {
		this.rd = this.newRd(params);
		this._calcDateComponents();
	}
};

IslamicDate.prototype = new IDate({noinstance: true});
IslamicDate.prototype.parent = IDate;
IslamicDate.prototype.constructor = IslamicDate;

/**
 * the cumulative lengths of each month, for a non-leap year 
 * @private
 * @const
 * @type Array.<number>
 */
IslamicDate.cumMonthLengths = [
	0,  /* Muharram */
	30,  /* Saffar */
	59,  /* Rabi'I */
	89,  /* Rabi'II */
	118,  /* Jumada I */
	148,  /* Jumada II */
	177,  /* Rajab */
	207,  /* Sha'ban */
	236,  /* Ramadan */
	266,  /* Shawwal */
	295,  /* Dhu al-Qa'da */
	325,  /* Dhu al-Hijja */
	354
];

/**
 * Number of days difference between RD 0 of the Gregorian calendar and
 * RD 0 of the Islamic calendar. 
 * @private
 * @const
 * @type number
 */
IslamicDate.GregorianDiff = 227015;

/**
 * Return a new RD for this date type using the given params.
 * @protected
 * @param {Object=} params the parameters used to create this rata die instance
 * @returns {RataDie} the new RD instance for the given params
 */
IslamicDate.prototype.newRd = function (params) {
	return new IslamicRataDie(params);
};

/**
 * Return the year for the given RD
 * @protected
 * @param {number} rd RD to calculate from 
 * @returns {number} the year for the RD
 */
IslamicDate.prototype._calcYear = function(rd) {
	return Math.floor((30 * rd + 10646) / 10631);
};

/**
 * Calculate date components for the given RD date.
 * @protected
 */
IslamicDate.prototype._calcDateComponents = function () {
	var remainder,
		rd = this.rd.getRataDie();
	
	this.year = this._calcYear(rd);

	if (typeof(this.offset) === "undefined") {
		this.year = this._calcYear(rd);
		
		// now offset the RD by the time zone, then recalculate in case we were 
		// near the year boundary
		if (!this.tz) {
			this.tz = new TimeZone({id: this.timezone});
		}
		this.offset = this.tz.getOffsetMillis(this) / 86400000;
	}

	if (this.offset !== 0) {
		rd += this.offset;
		this.year = this._calcYear(rd);
	}

	//console.log("IslamicDate.calcComponent: calculating for rd " + rd);
	//console.log("IslamicDate.calcComponent: year is " + ret.year);
	var yearStart = this.newRd({
		year: this.year,
		month: 1,
		day: 1,
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0
	});
	remainder = rd - yearStart.getRataDie() + 1;
	
	this.dayOfYear = remainder;
	
	//console.log("IslamicDate.calcComponent: remainder is " + remainder);
	
	this.month = SearchUtils.bsearch(remainder, IslamicDate.cumMonthLengths);
	remainder -= IslamicDate.cumMonthLengths[this.month-1];

	//console.log("IslamicDate.calcComponent: month is " + this.month + " and remainder is " + remainder);
	
	this.day = Math.floor(remainder);
	remainder -= this.day;

	//console.log("IslamicDate.calcComponent: day is " + this.day + " and remainder is " + remainder);

	// now convert to milliseconds for the rest of the calculation
	remainder = Math.round(remainder * 86400000);
	
	this.hour = Math.floor(remainder/3600000);
	remainder -= this.hour * 3600000;
	
	this.minute = Math.floor(remainder/60000);
	remainder -= this.minute * 60000;
	
	this.second = Math.floor(remainder/1000);
	remainder -= this.second * 1000;
	
	this.millisecond = remainder;
};

/**
 * Return the day of the week of this date. The day of the week is encoded
 * as number from 0 to 6, with 0=Sunday, 1=Monday, etc., until 6=Saturday.
 * 
 * @return {number} the day of the week
 */
IslamicDate.prototype.getDayOfWeek = function() {
	var rd = Math.floor(this.rd.getRataDie() + (this.offset || 0));
	return MathUtils.mod(rd-2, 7);
};

/**
 * Return the ordinal day of the year. Days are counted from 1 and proceed linearly up to 
 * 354 or 355, regardless of months or weeks, etc. That is, Muharran 1st is day 1, and 
 * Dhu al-Hijja 29 is 354.
 * @return {number} the ordinal day of the year
 */
IslamicDate.prototype.getDayOfYear = function() {
	return IslamicDate.cumMonthLengths[this.month-1] + this.day;
};

/**
 * Return the era for this date as a number. The value for the era for Islamic 
 * calendars is -1 for "before the Islamic era" and 1 for "the Islamic era". 
 * Islamic era dates are any date after Muharran 1, 1, which is the same as
 * July 16, 622 CE in the Gregorian calendar. 
 * 
 * @return {number} 1 if this date is in the common era, -1 if it is before the 
 * common era 
 */
IslamicDate.prototype.getEra = function() {
	return (this.year < 1) ? -1 : 1;
};

/**
 * Return the name of the calendar that governs this date.
 * 
 * @return {string} a string giving the name of the calendar
 */
IslamicDate.prototype.getCalendar = function() {
	return "islamic";
};

//register with the factory method
IDate._constructors["islamic"] = IslamicDate;

module.exports = IslamicDate;
},{'./ilib.js':'enyo-ilib/ilib','./SearchUtils.js':'enyo-ilib/SearchUtils','./MathUtils.js':'enyo-ilib/MathUtils','./Locale.js':'enyo-ilib/Locale','./LocaleInfo.js':'enyo-ilib/LocaleInfo','./TimeZone.js':'enyo-ilib/TimeZone','./IDate.js':'enyo-ilib/IDate','./Calendar.js':'enyo-ilib/Calendar','./IslamicRataDie.js':'enyo-ilib/IslamicRataDie','./IslamicCal.js':'enyo-ilib/IslamicCal'}],'enyo-ilib/JulianDate':[function (module,exports,global,require,request){
/*
 * JulianDate.js - Represent a date in the Julian calendar
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
ilib.js
Locale.js
IDate.js 
TimeZone.js
Calendar.js 
JulianCal.js 
SearchUtils.js 
MathUtils.js
LocaleInfo.js 
JulianRataDie.js
*/

var ilib = require("./ilib.js");
var SearchUtils = require("./SearchUtils.js");
var MathUtils = require("./MathUtils.js");

var Locale = require("./Locale.js");
var LocaleInfo = require("./LocaleInfo.js");
var TimeZone = require("./TimeZone.js");
var IDate = require("./IDate.js");
var Calendar = require("./Calendar.js");

var JulianRataDie = require("./JulianRataDie.js");
var JulianCal = require("./JulianCal.js");

/**
 * @class
 * Construct a new date object for the Julian Calendar. The constructor can be called
 * with a parameter object that contains any of the following properties:
 * 
 * <ul>
 * <li><i>unixtime<i> - sets the time of this instance according to the given 
 * unix time. Unix time is the number of milliseconds since midnight on Jan 1, 1970 (Gregorian).
 * <li><i>julianday</i> - the Julian Day to set into this date
 * <li><i>year</i> - any integer except 0. Years go from -1 (BCE) to 1 (CE), skipping the zero 
 * year which doesn't exist in the Julian calendar
 * <li><i>month</i> - 1 to 12, where 1 means January, 2 means February, etc.
 * <li><i>day</i> - 1 to 31
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * <li><i>minute</i> - 0 to 59
 * <li><i>second</i> - 0 to 59
 * <li><i>millisecond<i> - 0 to 999
 * <li><i>locale</i> - the TimeZone instance or time zone name as a string 
 * of this julian date. The date/time is kept in the local time. The time zone
 * is used later if this date is formatted according to a different time zone and
 * the difference has to be calculated, or when the date format has a time zone
 * component in it.
 * <li><i>timezone</i> - the time zone of this instance. If the time zone is not 
 * given, it can be inferred from this locale. For locales that span multiple
 * time zones, the one with the largest population is chosen as the one that 
 * represents the locale. 
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 * 
 * NB. The <a href="http://en.wikipedia.org/wiki/Julian_date">Julian Day</a> 
 * (JulianDay) object is a <i>different</i> object than a 
 * <a href="http://en.wikipedia.org/wiki/Julian_calendar">date in
 * the Julian calendar</a> and the two are not to be confused. The Julian Day 
 * object represents time as a number of whole and fractional days since the 
 * beginning of the epoch, whereas a date in the Julian 
 * calendar is a regular date that signifies year, month, day, etc. using the rules
 * of the Julian calendar. The naming of Julian Days and the Julian calendar are
 * unfortunately close, and come from history.<p>
 *  
 * If called with another Julian date argument, the date components of the given
 * date are copied into the current one.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above 
 * from <i>unixtime</i> through <i>millisecond</i> are present, then the date 
 * components are 
 * filled in with the current date at the time of instantiation. Note that if
 * you do not give the time zone when defaulting to the current time and the 
 * time zone for all of ilib was not set with <i>ilib.setTimeZone()</i>, then the
 * time zone will default to UTC ("Universal Time, Coordinated" or "Greenwich 
 * Mean Time").<p>
 * 
 * 
 * @constructor
 * @extends IDate
 * @param {Object=} params parameters that govern the settings and behaviour of this Julian date
 */
var JulianDate = function(params) {
	this.cal = new JulianCal();
	
	if (params) {
		if (params.locale) {
			this.locale = (typeof(params.locale) === 'string') ? new Locale(params.locale) : params.locale;
			var li = new LocaleInfo(this.locale);
			this.timezone = li.getTimeZone(); 
		}
		if (params.timezone) {
			this.timezone = params.timezone;
		}
		
		if (params.year || params.month || params.day || params.hour ||
				params.minute || params.second || params.millisecond ) {
			/**
			 * Year in the Julian calendar.
			 * @type number
			 */
			this.year = parseInt(params.year, 10) || 0;
			/**
			 * The month number, ranging from 1 (January) to 12 (December).
			 * @type number
			 */
			this.month = parseInt(params.month, 10) || 1;
			/**
			 * The day of the month. This ranges from 1 to 31.
			 * @type number
			 */
			this.day = parseInt(params.day, 10) || 1;
			/**
			 * The hour of the day. This can be a number from 0 to 23, as times are
			 * stored unambiguously in the 24-hour clock.
			 * @type number
			 */
			this.hour = parseInt(params.hour, 10) || 0;
			/**
			 * The minute of the hours. Ranges from 0 to 59.
			 * @type number
			 */
			this.minute = parseInt(params.minute, 10) || 0;
			/**
			 * The second of the minute. Ranges from 0 to 59.
			 * @type number
			 */
			this.second = parseInt(params.second, 10) || 0;
			/**
			 * The millisecond of the second. Ranges from 0 to 999.
			 * @type number
			 */
			this.millisecond = parseInt(params.millisecond, 10) || 0;
			
			/**
			 * The day of the year. Ranges from 1 to 383.
			 * @type number
			 */
			this.dayOfYear = parseInt(params.dayOfYear, 10);
			
			if (typeof(params.dst) === 'boolean') {
				this.dst = params.dst;
			}
			
			this.rd = this.newRd(this);
			
			// add the time zone offset to the rd to convert to UTC
			if (!this.tz) {
				this.tz = new TimeZone({id: this.timezone});
			}
			// getOffsetMillis requires that this.year, this.rd, and this.dst 
			// are set in order to figure out which time zone rules apply and 
			// what the offset is at that point in the year
			this.offset = this.tz._getOffsetMillisWallTime(this) / 86400000;
			if (this.offset !== 0) {
				this.rd = this.newRd({
					rd: this.rd.getRataDie() - this.offset
				});
			}
		}
	}
	
	if (!this.rd) {
		this.rd = this.newRd(params);
		this._calcDateComponents();
	}
};

JulianDate.prototype = new IDate({noinstance: true});
JulianDate.prototype.parent = IDate;
JulianDate.prototype.constructor = JulianDate;

/**
 * Return a new RD for this date type using the given params.
 * @protected
 * @param {Object=} params the parameters used to create this rata die instance
 * @returns {RataDie} the new RD instance for the given params
 */
JulianDate.prototype.newRd = function (params) {
	return new JulianRataDie(params);
};

/**
 * Return the year for the given RD
 * @protected
 * @param {number} rd RD to calculate from 
 * @returns {number} the year for the RD
 */
JulianDate.prototype._calcYear = function(rd) {
	var year = Math.floor((4*(Math.floor(rd)-1) + 1464)/1461);
	
	return (year <= 0) ? year - 1 : year;
};

/**
 * Calculate date components for the given RD date.
 * @protected
 */
JulianDate.prototype._calcDateComponents = function () {
	var remainder,
		cumulative,
		rd = this.rd.getRataDie();
	
	this.year = this._calcYear(rd);

	if (typeof(this.offset) === "undefined") {
		this.year = this._calcYear(rd);
		
		// now offset the RD by the time zone, then recalculate in case we were 
		// near the year boundary
		if (!this.tz) {
			this.tz = new TimeZone({id: this.timezone});
		}
		this.offset = this.tz.getOffsetMillis(this) / 86400000;
	}

	if (this.offset !== 0) {
		rd += this.offset;
		this.year = this._calcYear(rd);
	}
	
	var jan1 = this.newRd({
		year: this.year,
		month: 1,
		day: 1,
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0
	});
	remainder = rd + 1 - jan1.getRataDie();
	
	cumulative = this.cal.isLeapYear(this.year) ? 
		JulianCal.cumMonthLengthsLeap : 
		JulianCal.cumMonthLengths; 
	
	this.month = SearchUtils.bsearch(Math.floor(remainder), cumulative);
	remainder = remainder - cumulative[this.month-1];
	
	this.day = Math.floor(remainder);
	remainder -= this.day;
	// now convert to milliseconds for the rest of the calculation
	remainder = Math.round(remainder * 86400000);
	
	this.hour = Math.floor(remainder/3600000);
	remainder -= this.hour * 3600000;
	
	this.minute = Math.floor(remainder/60000);
	remainder -= this.minute * 60000;
	
	this.second = Math.floor(remainder/1000);
	remainder -= this.second * 1000;
	
	this.millisecond = remainder;
};

/**
 * Return the day of the week of this date. The day of the week is encoded
 * as number from 0 to 6, with 0=Sunday, 1=Monday, etc., until 6=Saturday.
 * 
 * @return {number} the day of the week
 */
JulianDate.prototype.getDayOfWeek = function() {
	var rd = Math.floor(this.rd.getRataDie() + (this.offset || 0));
	return MathUtils.mod(rd-2, 7);
};

/**
 * Return the name of the calendar that governs this date.
 * 
 * @return {string} a string giving the name of the calendar
 */
JulianDate.prototype.getCalendar = function() {
	return "julian";
};

//register with the factory method
IDate._constructors["julian"] = JulianDate;

module.exports = JulianDate;
},{'./ilib.js':'enyo-ilib/ilib','./SearchUtils.js':'enyo-ilib/SearchUtils','./MathUtils.js':'enyo-ilib/MathUtils','./Locale.js':'enyo-ilib/Locale','./LocaleInfo.js':'enyo-ilib/LocaleInfo','./TimeZone.js':'enyo-ilib/TimeZone','./IDate.js':'enyo-ilib/IDate','./Calendar.js':'enyo-ilib/Calendar','./JulianRataDie.js':'enyo-ilib/JulianRataDie','./JulianCal.js':'enyo-ilib/JulianCal'}],'enyo-ilib/PersianAlgoDate':[function (module,exports,global,require,request){
/*
 * PersianAlgoDate.js - Represent a date in the Persian algorithmic calendar
 * 
 * Copyright © 2014-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
ilib.js
Locale.js
LocaleInfo.js
TimeZone.js
IDate.js
PersianAlgoCal.js 
SearchUtils.js
MathUtils.js
PersAlgoRataDie.js
*/

var ilib = require("./ilib.js");
var SearchUtils = require("./SearchUtils.js");
var MathUtils = require("./MathUtils.js");

var Locale = require("./Locale.js");
var LocaleInfo = require("./LocaleInfo.js");
var TimeZone = require("./TimeZone.js");
var IDate = require("./IDate.js");
var Calendar = require("./Calendar.js");

var PersianAlgoCal = require("./PersianAlgoCal.js");
var PersAlgoRataDie = require("./PersAlgoRataDie.js");

/**
 * @class
 * 
 * Construct a new Persian date object. The constructor parameters can 
 * contain any of the following properties:
 * 
 * <ul>
 * <li><i>unixtime<i> - sets the time of this instance according to the given 
 * unix time. Unix time is the number of milliseconds since midnight on Jan 1, 1970, Gregorian
 * 
 * <li><i>julianday</i> - sets the time of this instance according to the given
 * Julian Day instance or the Julian Day given as a float
 * 
 * <li><i>year</i> - any integer, including 0
 * 
 * <li><i>month</i> - 1 to 12, where 1 means Farvardin, 2 means Ordibehesht, etc.
 * 
 * <li><i>day</i> - 1 to 31
 * 
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * 
 * <li><i>minute</i> - 0 to 59
 * 
 * <li><i>second</i> - 0 to 59
 * 
 * <li><i>millisecond</i> - 0 to 999
 * 
 * <li><i>timezone</i> - the TimeZone instance or time zone name as a string 
 * of this persian date. The date/time is kept in the local time. The time zone
 * is used later if this date is formatted according to a different time zone and
 * the difference has to be calculated, or when the date format has a time zone
 * component in it.
 * 
 * <li><i>locale</i> - locale for this persian date. If the time zone is not 
 * given, it can be inferred from this locale. For locales that span multiple
 * time zones, the one with the largest population is chosen as the one that 
 * represents the locale.
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 *
 * If the constructor is called with another Persian date instance instead of
 * a parameter block, the other instance acts as a parameter block and its
 * settings are copied into the current instance.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above 
 * from <i>unixtime</i> through <i>millisecond</i> are present, then the date 
 * components are 
 * filled in with the current date at the time of instantiation. Note that if
 * you do not give the time zone when defaulting to the current time and the 
 * time zone for all of ilib was not set with <i>ilib.setTimeZone()</i>, then the
 * time zone will default to UTC ("Universal Time, Coordinated" or "Greenwich 
 * Mean Time").<p>
 * 
 * If any of the properties from <i>year</i> through <i>millisecond</i> are not
 * specified in the params, it is assumed that they have the smallest possible
 * value in the range for the property (zero or one).<p>
 * 
 * 
 * @constructor
 * @extends IDate
 * @param {Object=} params parameters that govern the settings and behaviour of this Persian date
 */
var PersianAlgoDate = function(params) {
	this.cal = new PersianAlgoCal();
	this.timezone = "local";
	
	if (params) {
		if (params.locale) {
			this.locale = (typeof(params.locale) === 'string') ? new Locale(params.locale) : params.locale;
			var li = new LocaleInfo(this.locale);
			this.timezone = li.getTimeZone(); 
		}
		if (params.timezone) {
			this.timezone = params.timezone;
		}
		
		if (params.year || params.month || params.day || params.hour ||
				params.minute || params.second || params.millisecond ) {
			/**
			 * Year in the Persian calendar.
			 * @type number
			 */
			this.year = parseInt(params.year, 10) || 0;

			/**
			 * The month number, ranging from 1 to 12
			 * @type number
			 */
			this.month = parseInt(params.month, 10) || 1;

			/**
			 * The day of the month. This ranges from 1 to 31.
			 * @type number
			 */
			this.day = parseInt(params.day, 10) || 1;
			
			/**
			 * The hour of the day. This can be a number from 0 to 23, as times are
			 * stored unambiguously in the 24-hour clock.
			 * @type number
			 */
			this.hour = parseInt(params.hour, 10) || 0;

			/**
			 * The minute of the hours. Ranges from 0 to 59.
			 * @type number
			 */
			this.minute = parseInt(params.minute, 10) || 0;

			/**
			 * The second of the minute. Ranges from 0 to 59.
			 * @type number
			 */
			this.second = parseInt(params.second, 10) || 0;

			/**
			 * The millisecond of the second. Ranges from 0 to 999.
			 * @type number
			 */
			this.millisecond = parseInt(params.millisecond, 10) || 0;
			
			/**
			 * The day of the year. Ranges from 1 to 366.
			 * @type number
			 */
			this.dayOfYear = parseInt(params.dayOfYear, 10);

			if (typeof(params.dst) === 'boolean') {
				this.dst = params.dst;
			}
			
			this.rd = this.newRd(this);
			
			// add the time zone offset to the rd to convert to UTC
			if (!this.tz) {
				this.tz = new TimeZone({id: this.timezone});
			}
			// getOffsetMillis requires that this.year, this.rd, and this.dst 
			// are set in order to figure out which time zone rules apply and 
			// what the offset is at that point in the year
			this.offset = this.tz._getOffsetMillisWallTime(this) / 86400000;
			if (this.offset !== 0) {
				this.rd = this.newRd({
					rd: this.rd.getRataDie() - this.offset
				});
			}
		}
	}

	if (!this.rd) {
		this.rd = this.newRd(params);
		this._calcDateComponents();
	}
};

PersianAlgoDate.prototype = new IDate({noinstance: true});
PersianAlgoDate.prototype.parent = IDate;
PersianAlgoDate.prototype.constructor = PersianAlgoDate;

/**
 * Return a new RD for this date type using the given params.
 * @protected
 * @param {Object=} params the parameters used to create this rata die instance
 * @returns {RataDie} the new RD instance for the given params
 */
PersianAlgoDate.prototype.newRd = function (params) {
	return new PersAlgoRataDie(params);
};

/**
 * Return the year for the given RD
 * @protected
 * @param {number} rd RD to calculate from 
 * @returns {number} the year for the RD
 */
PersianAlgoDate.prototype._calcYear = function(rd) {
	var shiftedRd = rd - 173126;
	var numberOfCycles = Math.floor(shiftedRd / 1029983);
	var shiftedDayInCycle = MathUtils.mod(shiftedRd, 1029983);
	var yearInCycle = (shiftedDayInCycle === 1029982) ? 2820 : Math.floor((2816 * shiftedDayInCycle + 1031337) / 1028522);
	var year = 474 + 2820 * numberOfCycles + yearInCycle;
	return (year > 0) ? year : year - 1;
};

/**
 * @private
 * Calculate date components for the given RD date.
 */
PersianAlgoDate.prototype._calcDateComponents = function () {
	var remainder,
		rd = this.rd.getRataDie();
	
	this.year = this._calcYear(rd);
	
	if (typeof(this.offset) === "undefined") {
		// now offset the RD by the time zone, then recalculate in case we were 
		// near the year boundary
		if (!this.tz) {
			this.tz = new TimeZone({id: this.timezone});
		}
		this.offset = this.tz.getOffsetMillis(this) / 86400000;
	}
	
	if (this.offset !== 0) {
		rd += this.offset;
		this.year = this._calcYear(rd);
	}
	
	//console.log("PersAlgoDate.calcComponent: calculating for rd " + rd);
	//console.log("PersAlgoDate.calcComponent: year is " + ret.year);
	var yearStart = this.newRd({
		year: this.year,
		month: 1,
		day: 1,
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0
	});
	remainder = rd - yearStart.getRataDie() + 1;
	
	this.dayOfYear = remainder;
	
	//console.log("PersAlgoDate.calcComponent: remainder is " + remainder);
	
	this.month = SearchUtils.bsearch(remainder, PersAlgoRataDie.cumMonthLengths);
	remainder -= PersAlgoRataDie.cumMonthLengths[this.month-1];
	
	//console.log("PersAlgoDate.calcComponent: month is " + this.month + " and remainder is " + remainder);
	
	this.day = Math.floor(remainder);
	remainder -= this.day;
	
	//console.log("PersAlgoDate.calcComponent: day is " + this.day + " and remainder is " + remainder);
	
	// now convert to milliseconds for the rest of the calculation
	remainder = Math.round(remainder * 86400000);
	
	this.hour = Math.floor(remainder/3600000);
	remainder -= this.hour * 3600000;
	
	this.minute = Math.floor(remainder/60000);
	remainder -= this.minute * 60000;
	
	this.second = Math.floor(remainder/1000);
	remainder -= this.second * 1000;
	
	this.millisecond = remainder;
};

/**
 * Return the day of the week of this date. The day of the week is encoded
 * as number from 0 to 6, with 0=Sunday, 1=Monday, etc., until 6=Saturday.
 * 
 * @return {number} the day of the week
 */
PersianAlgoDate.prototype.getDayOfWeek = function() {
	var rd = Math.floor(this.getRataDie());
	return MathUtils.mod(rd-3, 7);
};

/**
 * Return the ordinal day of the year. Days are counted from 1 and proceed linearly up to 
 * 365, regardless of months or weeks, etc. That is, Farvardin 1st is day 1, and 
 * December 31st is 365 in regular years, or 366 in leap years.
 * @return {number} the ordinal day of the year
 */
PersianAlgoDate.prototype.getDayOfYear = function() {
	return PersAlgoRataDie.cumMonthLengths[this.month-1] + this.day;
};

/**
 * Return the era for this date as a number. The value for the era for Persian 
 * calendars is -1 for "before the persian era" (BP) and 1 for "the persian era" (anno 
 * persico or AP). 
 * BP dates are any date before Farvardin 1, 1 AP. In the proleptic Persian calendar, 
 * there is a year 0, so any years that are negative or zero are BP.
 * @return {number} 1 if this date is in the common era, -1 if it is before the 
 * common era 
 */
PersianAlgoDate.prototype.getEra = function() {
	return (this.year < 1) ? -1 : 1;
};

/**
 * Return the name of the calendar that governs this date.
 * 
 * @return {string} a string giving the name of the calendar
 */
PersianAlgoDate.prototype.getCalendar = function() {
	return "persian-algo";
};

// register with the factory method
IDate._constructors["persian-algo"] = PersianAlgoDate;

module.exports = PersianAlgoDate;
},{'./ilib.js':'enyo-ilib/ilib','./SearchUtils.js':'enyo-ilib/SearchUtils','./MathUtils.js':'enyo-ilib/MathUtils','./Locale.js':'enyo-ilib/Locale','./LocaleInfo.js':'enyo-ilib/LocaleInfo','./TimeZone.js':'enyo-ilib/TimeZone','./IDate.js':'enyo-ilib/IDate','./Calendar.js':'enyo-ilib/Calendar','./PersianAlgoCal.js':'enyo-ilib/PersianAlgoCal','./PersAlgoRataDie.js':'enyo-ilib/PersAlgoRataDie'}],'enyo-ilib/NumFmt':[function (module,exports,global,require,request){
/*
 * NumFmt.js - Number formatter definition
 *
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
!depends 
ilib.js 
Locale.js
LocaleInfo.js
Utils.js
MathUtils.js
Currency.js
IString.js
JSUtils.js
INumber.js
*/

// !data localeinfo currency

var ilib = require("./ilib.js");
var Utils = require("./Utils.js");
var JSUtils = require("./JSUtils.js");
var MathUtils = require("./MathUtils.js");

var Locale = require("./Locale.js");
var LocaleInfo = require("./LocaleInfo.js");
var Currency = require("./Currency.js");
var IString = require("./IString.js");
var INumber = require("./INumber.js");

/**
 * @class
 * Create a new number formatter instance. Locales differ in the way that digits
 * in a formatted number are grouped, in the way the decimal character is represented,
 * etc. Use this formatter to get it right for any locale.<p>
 *
 * This formatter can format plain numbers, currency amounts, and percentage amounts.<p>
 *
 * As with all formatters, the recommended
 * practice is to create one formatter and use it multiple times to format various
 * numbers.<p>
 *
 * The options can contain any of the following properties:
 *
 * <ul>
 * <li><i>locale</i> - use the conventions of the specified locale when figuring out how to
 * format a number.
 * <li><i>type</i> - the type of this formatter. Valid values are "number", "currency", or
 * "percentage". If this property is not specified, the default is "number".
 * <li><i>currency</i> - the ISO 4217 3-letter currency code to use when the formatter type
 * is "currency". This property is required for currency formatting. If the type property
 * is "currency" and the currency property is not specified, the constructor will throw a
 * an exception.
 * <li><i>maxFractionDigits</i> - the maximum number of digits that should appear in the
 * formatted output after the decimal. A value of -1 means unlimited, and 0 means only print
 * the integral part of the number.
 * <li><i>minFractionDigits</i> - the minimum number of fractional digits that should
 * appear in the formatted output. If the number does not have enough fractional digits
 * to reach this minimum, the number will be zero-padded at the end to get to the limit.
 * If the type of the formatter is "currency" and this
 * property is not specified, then the minimum fraction digits is set to the normal number
 * of digits used with that currency, which is almost always 0, 2, or 3 digits.
 * <li><i>useNative</i> - the flag used to determaine whether to use the native script settings
 * for formatting the numbers .
 * <li><i>roundingMode</i> - When the maxFractionDigits or maxIntegerDigits is specified,
 * this property governs how the least significant digits are rounded to conform to that
 * maximum. The value of this property is a string with one of the following values:
 * <ul>
 *   <li><i>up</i> - round away from zero
 *   <li><i>down</i> - round towards zero. This has the effect of truncating the number
 *   <li><i>ceiling</i> - round towards positive infinity
 *   <li><i>floor</i> - round towards negative infinity
 *   <li><i>halfup</i> - round towards nearest neighbour. If equidistant, round up.
 *   <li><i>halfdown</i> - round towards nearest neighbour. If equidistant, round down.
 *   <li><i>halfeven</i> - round towards nearest neighbour. If equidistant, round towards the even neighbour
 *   <li><i>halfodd</i> - round towards nearest neighbour. If equidistant, round towards the odd neighbour
 * </ul>
 * When the type of the formatter is "currency" and the <i>roundingMode</i> property is not
 * set, then the standard legal rounding rules for the locale are followed. If the type
 * is "number" or "percentage" and the <i>roundingMode</i> property is not set, then the
 * default mode is "halfdown".</i>.
 *
 * <li><i>style</i> - When the type of this formatter is "currency", the currency amount
 * can be formatted in the following styles: "common" and "iso". The common style is the
 * one commonly used in every day writing where the currency unit is represented using a
 * symbol. eg. "$57.35" for fifty-seven dollars and thirty five cents. The iso style is
 * the international style where the currency unit is represented using the ISO 4217 code.
 * eg. "USD 57.35" for the same amount. The default is "common" style if the style is
 * not specified.<p>
 *
 * When the type of this formatter is "number", the style can be one of the following:
 * <ul>
 *   <li><i>standard - format a fully specified floating point number properly for the locale
 *   <li><i>scientific</i> - use scientific notation for all numbers. That is, 1 integral 
 *   digit, followed by a number of fractional digits, followed by an "e" which denotes 
 *   exponentiation, followed digits which give the power of 10 in the exponent. 
 *   <li><i>native</i> - format a floating point number using the native digits and 
 *   formatting symbols for the script of the locale. 
 *   <li><i>nogrouping</i> - format a floating point number without grouping digits for
 *   the integral portion of the number
 * </ul>
 * Note that if you specify a maximum number
 * of integral digits, the formatter with a standard style will give you standard
 * formatting for smaller numbers and scientific notation for larger numbers. The default
 * is standard style if this is not specified.
 *
 * <li><i>onLoad</i> - a callback function to call when the format data is fully
 * loaded. When the onLoad option is given, this class will attempt to
 * load any missing locale data using the ilib loader callback.
 * When the constructor is done (even if the data is already preassembled), the
 * onLoad function is called with the current instance as a parameter, so this
 * callback can be used with preassembled or dynamic loading or a mix of the two.
 *
 * <li>sync - tell whether to load any missing locale data synchronously or
 * asynchronously. If this option is given as "false", then the "onLoad"
 * callback must be given, as the instance returned from this constructor will
 * not be usable for a while.
 *
 * <li><i>loadParams</i> - an object containing parameters to pass to the
 * loader callback function when locale data is missing. The parameters are not
 * interpretted or modified in any way. They are simply passed along. The object
 * may contain any property/value pairs as long as the calling code is in
 * agreement with the loader callback function as to what those parameters mean.
 * </ul>
 * <p>
 *
 *
 * @constructor
 * @param {Object.<string,*>} options A set of options that govern how the formatter will behave
 */
var NumFmt = function (options) {
	var sync = true;
	this.locale = new Locale();
	/** 
	 * @private
	 * @type {string} 
	 */
	this.type = "number";
	var loadParams = undefined;

	if (options) {
		if (options.locale) {
			this.locale = (typeof (options.locale) === 'string') ? new Locale(options.locale) : options.locale;
		}

		if (options.type) {
			if (options.type === 'number' ||
				options.type === 'currency' ||
				options.type === 'percentage') {
				this.type = options.type;
			}
		}

		if (options.currency) {
			/** 
			 * @private 
			 * @type {string} 
			 */
			this.currency = options.currency;
		}

		if (typeof (options.maxFractionDigits) === 'number') {
			/** 
			 * @private 
			 * @type {number|undefined} 
			 */
			this.maxFractionDigits = this._toPrimitive(options.maxFractionDigits);
		}
		if (typeof (options.minFractionDigits) === 'number') {
			/** 
			 * @private 
			 * @type {number|undefined} 
			 */
			this.minFractionDigits = this._toPrimitive(options.minFractionDigits);
			// enforce the limits to avoid JS exceptions
			if (this.minFractionDigits < 0) {
				this.minFractionDigits = 0;
			}
			if (this.minFractionDigits > 20) {
				this.minFractionDigits = 20;
			}
		}
		if (options.style) {
			/** 
			 * @private 
			 * @type {string} 
			 */
			this.style = options.style;
		}
		if (typeof(options.useNative) === 'boolean') {
			/** 
			 * @private 
			 * @type {boolean} 
			 * */
			this.useNative = options.useNative;
		}
		/** 
		 * @private 
		 * @type {string} 
		 */
		this.roundingMode = options.roundingMode;

		if (typeof (options.sync) !== 'undefined') {
			/** @type {boolean} */
			sync = (options.sync == true);
		}
		
		loadParams = options.loadParams;
	}

	/** 
	 * @private 
	 * @type {LocaleInfo|undefined} 
	 */
	this.localeInfo = undefined;
	
	new LocaleInfo(this.locale, {
		sync: sync,
		loadParams: loadParams,
		onLoad: ilib.bind(this, function (li) {
			/** 
			 * @private 
			 * @type {LocaleInfo|undefined} 
			 */
			this.localeInfo = li;

			if (this.type === "number") {
				this.templateNegative = new IString(this.localeInfo.getNegativeNumberFormat() || "-{n}");
			} else if (this.type === "currency") {
				var templates;

				if (!this.currency || typeof (this.currency) != 'string') {
					throw "A currency property is required in the options to the number formatter constructor when the type property is set to currency.";
				}

				new Currency({
					locale: this.locale,
					code: this.currency,
					sync: sync,
					loadParams: loadParams,
					onLoad: ilib.bind(this, function (cur) {
						this.currencyInfo = cur;
						if (this.style !== "common" && this.style !== "iso") {
							this.style = "common";
						}
						
						if (typeof(this.maxFractionDigits) !== 'number' && typeof(this.minFractionDigits) !== 'number') {
							this.minFractionDigits = this.maxFractionDigits = this.currencyInfo.getFractionDigits();
						}

						templates = this.localeInfo.getCurrencyFormats();
						this.template = new IString(templates[this.style] || templates.common);
						this.templateNegative = new IString(templates[this.style + "Negative"] || templates["commonNegative"]);
						this.sign = (this.style === "iso") ? this.currencyInfo.getCode() : this.currencyInfo.getSign();
						
						if (!this.roundingMode) {
							this.roundingMode = this.currencyInfo && this.currencyInfo.roundingMode;
						}

						this._init();

						if (options && typeof (options.onLoad) === 'function') {
							options.onLoad(this);
						}
					})
				});
				return;
			} else if (this.type === "percentage") {
				this.template =  new IString(this.localeInfo.getPercentageFormat() || "{n}%");
				this.templateNegative = new IString(this.localeInfo.getNegativePercentageFormat() || this.localeInfo.getNegativeNumberFormat() + "%");
			}

			this._init();

			if (options && typeof (options.onLoad) === 'function') {
				options.onLoad(this);
			}
		})
	});
};

/**
 * Return an array of available locales that this formatter can format
 * @static
 * @return {Array.<Locale>|undefined} an array of available locales
 */
NumFmt.getAvailableLocales = function () {
	return undefined;
};

/**
 * @private
 * @const
 * @type string
 */
NumFmt.zeros = "0000000000000000000000000000000000000000000000000000000000000000000000";

NumFmt.prototype = {
	/**
	 * Return true if this formatter uses native digits to format the number. If the useNative
	 * option is given to the constructor, then this flag will be honoured. If the useNative
	 * option is not given to the constructor, this this formatter will use native digits if
	 * the locale typically uses native digits.
	 * 
	 *  @return {boolean} true if this formatter will format with native digits, false otherwise
	 */
	getUseNative: function() {
		if (typeof(this.useNative) === "boolean") {
			return this.useNative;
		} 
		return (this.localeInfo.getDigitsStyle() === "native");
	},
	
	/**
	 * @private
	 */
	_init: function () {
		if (this.maxFractionDigits < this.minFractionDigits) {
			this.minFractionDigits = this.maxFractionDigits;
		}

		if (!this.roundingMode) {
			this.roundingMode = this.localeInfo.getRoundingMode();
		}

		if (!this.roundingMode) {
			this.roundingMode = "halfdown";
		}

		// set up the function, so we only have to figure it out once
		// and not every time we do format()
		this.round = MathUtils[this.roundingMode];
		if (!this.round) {
			this.roundingMode = "halfdown";
			this.round = MathUtils[this.roundingMode];
		}
		
		if (this.style === "nogrouping") {
			this.prigroupSize = this.secgroupSize = 0;
		} else {
			this.prigroupSize = this.localeInfo.getPrimaryGroupingDigits();
			this.secgroupSize = this.localeInfo.getSecondaryGroupingDigits();
			this.groupingSeparator = this.getUseNative() ? this.localeInfo.getNativeGroupingSeparator() : this.localeInfo.getGroupingSeparator();
		} 
		this.decimalSeparator = this.getUseNative() ? this.localeInfo.getNativeDecimalSeparator() : this.localeInfo.getDecimalSeparator();
		
		if (this.getUseNative()) {
			var nd = this.localeInfo.getNativeDigits() || this.localeInfo.getDigits();
			if (nd) {
				this.digits = nd.split("");
			}
		}
		
		this.exponentSymbol = this.localeInfo.getExponential() || "e";
	},

	/*
	 * @private
	 */
	_pad: function (str, length, left) {
		return (str.length >= length) ?
			str :
			(left ?
			NumFmt.zeros.substring(0, length - str.length) + str :
			str + NumFmt.zeros.substring(0, length - str.length));
	},

	/**
	 * @private
	 * @param {INumber|Number|string|number} num object, string, or number to convert to a primitive number
	 * @return {number} the primitive number equivalent of the argument
	 */
	_toPrimitive: function (num) {
		var n = 0;

		switch (typeof (num)) {
		case 'number':
			n = num;
			break;
		case 'string':
			n = parseFloat(num);
			break;
		case 'object':
			// Number.valueOf() is incorrectly documented as being of type "string" rather than "number", so coerse 
			// the type here to shut the type checker up
			n = /** @type {number} */ num.valueOf();
			break;
		}

		return n;
	},

	/**
	 * Format the number using scientific notation as a positive number. Negative
	 * formatting to be applied later.
	 * @private
	 * @param {number} num the number to format
	 * @return {string} the formatted number
	 */
	_formatScientific: function (num) {
		var n = new Number(num);
		var formatted;
		
		var factor,
			str = n.toExponential(),
			parts = str.split("e"),
			significant = parts[0],
			exponent = parts[1],
			numparts,
			integral,
			fraction;

		if (this.maxFractionDigits > 0) {
			// if there is a max fraction digits setting, round the fraction to 
			// the right length first by dividing or multiplying by powers of 10. 
			// manipulate the fraction digits so as to
			// avoid the rounding errors of floating point numbers
			factor = Math.pow(10, this.maxFractionDigits);
			significant = this.round(significant * factor) / factor;
		}
		numparts = ("" + significant).split(".");
		integral = numparts[0];
		fraction = numparts[1];
		
		if (typeof(this.maxFractionDigits) !== 'undefined') {
			fraction = fraction.substring(0, this.maxFractionDigits);
		}
		if (typeof(this.minFractionDigits) !== 'undefined') {
			fraction = this._pad(fraction || "", this.minFractionDigits, false);
		}
		formatted = integral;
		if (fraction.length) {
			formatted += this.decimalSeparator + fraction;	
		} 
		formatted += this.exponentSymbol + exponent;
		return formatted;
	},

	/**
	 * Formats the number as a positive number. Negative formatting to be applied later.
	 * @private
	 * @param {number} num the number to format
	 * @return {string} the formatted number
	 */
	_formatStandard: function (num) {
		var i;
		var k;
		
		if (typeof(this.maxFractionDigits) !== 'undefined' && this.maxFractionDigits > -1) {
			var factor = Math.pow(10, this.maxFractionDigits);
			num = this.round(num * factor) / factor;
		}

		num = Math.abs(num);

		var parts = ("" + num).split("."),
			integral = parts[0],
			fraction = parts[1],
			cycle,
			formatted;
		
		integral = integral.toString();

		if (this.minFractionDigits > 0) {
			fraction = this._pad(fraction || "", this.minFractionDigits, false);
		}

		if (this.secgroupSize > 0) {
			if (integral.length > this.prigroupSize) {
				var size1 = this.prigroupSize;
				var size2 = integral.length;
				var size3 = size2 - size1;
				integral = integral.slice(0, size3) + this.groupingSeparator + integral.slice(size3);
				var num_sec = integral.substring(0, integral.indexOf(this.groupingSeparator));
				k = num_sec.length;
				while (k > this.secgroupSize) {
					var secsize1 = this.secgroupSize;
					var secsize2 = num_sec.length;
					var secsize3 = secsize2 - secsize1;
					integral = integral.slice(0, secsize3) + this.groupingSeparator + integral.slice(secsize3);
					num_sec = integral.substring(0, integral.indexOf(this.groupingSeparator));
					k = num_sec.length;
				}
			}

			formatted = integral;
		} else if (this.prigroupSize !== 0) {
			cycle = MathUtils.mod(integral.length - 1, this.prigroupSize);

			formatted = "";

			for (i = 0; i < integral.length - 1; i++) {
				formatted += integral.charAt(i);
				if (cycle === 0) {
					formatted += this.groupingSeparator;
				}
				cycle = MathUtils.mod(cycle - 1, this.prigroupSize);
			}
			formatted += integral.charAt(integral.length - 1);
		} else {
			formatted = integral;
		}

		if (fraction && (typeof(this.maxFractionDigits) === 'undefined' || this.maxFractionDigits > 0)) {
			formatted += this.decimalSeparator;
			formatted += fraction;
		}
		
		if (this.digits) {
			formatted = JSUtils.mapString(formatted, this.digits);
		}
		
		return formatted;
	},

	/**
	 * Format a number according to the settings of this number formatter instance.
	 * @param num {number|string|INumber|Number} a floating point number to format
	 * @return {string} a string containing the formatted number
	 */
	format: function (num) {
		var formatted, n;

		if (typeof (num) === 'undefined') {
			return "";
		}

		// convert to a real primitive number type
		n = this._toPrimitive(num);

		if (this.type === "number") {
			formatted = (this.style === "scientific") ?
				this._formatScientific(n) :
				this._formatStandard(n);

			if (num < 0) {
				formatted = this.templateNegative.format({n: formatted});
			}
		} else {
			formatted = this._formatStandard(n);
			var template = (n < 0) ? this.templateNegative : this.template;
			formatted = template.format({
				n: formatted,
				s: this.sign
			});
		}

		return formatted;
	},

	/**
	 * Return the type of formatter. Valid values are "number", "currency", and
	 * "percentage".
	 *
	 * @return {string} the type of formatter
	 */
	getType: function () {
		return this.type;
	},

	/**
	 * Return the locale for this formatter instance.
	 * @return {Locale} the locale instance for this formatter
	 */
	getLocale: function () {
		return this.locale;
	},

	/**
	 * Returns true if this formatter groups together digits in the integral
	 * portion of a number, based on the options set up in the constructor. In
	 * most western European cultures, this means separating every 3 digits
	 * of the integral portion of a number with a particular character.
	 *
	 * @return {boolean} true if this formatter groups digits in the integral
	 * portion of the number
	 */
	isGroupingUsed: function () {
		return (this.groupingSeparator !== 'undefined' && this.groupingSeparator.length > 0);
	},

	/**
	 * Returns the maximum fraction digits set up in the constructor.
	 *
	 * @return {number} the maximum number of fractional digits this
	 * formatter will format, or -1 for no maximum
	 */
	getMaxFractionDigits: function () {
		return typeof (this.maxFractionDigits) !== 'undefined' ? this.maxFractionDigits : -1;
	},

	/**
	 * Returns the minimum fraction digits set up in the constructor. If
	 * the formatter has the type "currency", then the minimum fraction
	 * digits is the amount of digits that is standard for the currency
	 * in question unless overridden in the options to the constructor.
	 *
	 * @return {number} the minimum number of fractional digits this
	 * formatter will format, or -1 for no minimum
	 */
	getMinFractionDigits: function () {
		return typeof (this.minFractionDigits) !== 'undefined' ? this.minFractionDigits : -1;
	},

	/**
	 * Returns the ISO 4217 code for the currency that this formatter formats.
	 * IF the typeof this formatter is not "currency", then this method will
	 * return undefined.
	 *
	 * @return {string} the ISO 4217 code for the currency that this formatter
	 * formats, or undefined if this not a currency formatter
	 */
	getCurrency: function () {
		return this.currencyInfo && this.currencyInfo.getCode();
	},

	/**
	 * Returns the rounding mode set up in the constructor. The rounding mode
	 * controls how numbers are rounded when the integral or fraction digits
	 * of a number are limited.
	 *
	 * @return {string} the name of the rounding mode used in this formatter
	 */
	getRoundingMode: function () {
		return this.roundingMode;
	},

	/**
	 * If this formatter is a currency formatter, then the style determines how the
	 * currency is denoted in the formatted output. This method returns the style
	 * that this formatter will produce. (See the constructor comment for more about
	 * the styles.)
	 * @return {string} the name of the style this formatter will use to format
	 * currency amounts, or "undefined" if this formatter is not a currency formatter
	 */
	getStyle: function () {
		return this.style;
	}
};

module.exports = NumFmt;
},{'./ilib.js':'enyo-ilib/ilib','./Utils.js':'enyo-ilib/Utils','./JSUtils.js':'enyo-ilib/JSUtils','./MathUtils.js':'enyo-ilib/MathUtils','./Locale.js':'enyo-ilib/Locale','./LocaleInfo.js':'enyo-ilib/LocaleInfo','./Currency.js':'enyo-ilib/Currency','./IString.js':'enyo-ilib/IString','./INumber.js':'enyo-ilib/INumber'}],'enyo-ilib/DateFactory':[function (module,exports,global,require,request){
/*
 * DateFactory.js - Factory class to create the right subclasses of a date for any 
 * calendar or locale.
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends ilib.js Locale.js LocaleInfo.js JulianDay.js JSUtils.js CalendarFactory.js IDate.js GregorianDate.js*/

var ilib = require("./ilib.js");
var JSUtils = require("./JSUtils.js");

var Locale = require("./Locale.js");
var LocaleInfo = require("./LocaleInfo.js");
var JulianDay = require("./JulianDay.js");
var CalendarFactory = require("./CalendarFactory.js");

// Statically depend on these even though we don't use them
// to guarantee they are loaded into the cache already.
var IDate = require("./IDate.js");
var GregorianDate = require("./GregorianDate.js");

/**
 * Factory method to create a new instance of a date subclass.<p>
 * 
 * The options parameter can be an object that contains the following
 * properties:
 * 
 * <ul>
 * <li><i>type</i> - specify the type/calendar of the date desired. The
 * list of valid values changes depending on which calendars are 
 * defined. When assembling your iliball.js, include those date type 
 * you wish to use in your program or web page, and they will register 
 * themselves with this factory method. The "gregorian",
 * and "julian" calendars are all included by default, as they are the
 * standard calendars for much of the world. If not specified, the type
 * of the date returned is the one that is appropriate for the locale.
 * This property may also be given as "calendar" instead of "type".
 * 
 * <li><i>onLoad</i> - a callback function to call when the date object is fully 
 * loaded. When the onLoad option is given, the date factory will attempt to
 * load any missing locale data using the ilib loader callback.
 * When the constructor is done (even if the data is already preassembled), the 
 * onLoad function is called with the current instance as a parameter, so this
 * callback can be used with preassembled or dynamic loading or a mix of the two.
 * 
 * <li><i>sync</i> - tell whether to load any missing locale data synchronously or 
 * asynchronously. If this option is given as "false", then the "onLoad"
 * callback must be given, as the instance returned from this constructor will
 * not be usable for a while.
 *  
 * <li><i>loadParams</i> - an object containing parameters to pass to the 
 * loader callback function when locale data is missing. The parameters are not
 * interpretted or modified in any way. They are simply passed along. The object 
 * may contain any property/value pairs as long as the calling code is in
 * agreement with the loader callback function as to what those parameters mean.
 * </ul>
 * 
 * The options object is also passed down to the date constructor, and 
 * thus can contain the the properties as the date object being instantiated.
 * See the documentation for {@link GregorianDate}, and other
 * subclasses for more details on other parameter that may be passed in.<p>
 * 
 * Please note that if you do not give the type parameter, this factory
 * method will create a date object that is appropriate for the calendar
 * that is most commonly used in the specified or current ilib locale. 
 * For example, in Thailand, the most common calendar is the Thai solar 
 * calendar. If the current locale is "th-TH" (Thai for Thailand) and you 
 * use this factory method to construct a new date without specifying the
 * type, it will automatically give you back an instance of 
 * {@link ThaiSolarDate}. This is convenient because you do not 
 * need to know which locales use which types of dates. In fact, you 
 * should always use this factory method to make new date instances unless
 * you know that you specifically need a date in a particular calendar.<p>
 * 
 * Also note that when you pass in the date components such as year, month,
 * day, etc., these components should be appropriate for the given date
 * being instantiated. That is, in our Thai example in the previous
 * paragraph, the year and such should be given as a Thai solar year, not
 * the Gregorian year that you get from the Javascript Date class. In
 * order to initialize a date instance when you don't know what subclass
 * will be instantiated for the locale, use a parameter such as "unixtime" 
 * or "julianday" which are unambiguous and based on UTC time, instead of
 * the year/month/date date components. The date components for that UTC 
 * time will be calculated and the time zone offset will be automatically 
 * factored in.
 * 
 * @static
 * @param {Object=} options options controlling the construction of this instance, or
 * undefined to use the default options
 * @return {IDate} an instance of a calendar object of the appropriate type 
 */
var DateFactory = function(options) {
	var locale,
		type,
		cons,
		sync = true,
		obj;

	if (options) {
		if (options.locale) {
			locale = (typeof(options.locale) === 'string') ? new Locale(options.locale) : options.locale;
		}
		
		type = options.type || options.calendar;
		
		if (typeof(options.sync) === 'boolean') {
			sync = options.sync;
		}
	}
	
	if (!locale) {
		locale = new Locale();	// default locale
	}

	if (!type) {
		new LocaleInfo(locale, {
			sync: sync,
			loadParams: options && options.loadParams,
			onLoad: ilib.bind(this, function(info) {
				type = info.getCalendar();
				
				obj = DateFactory._init(type, options);
				
				if (options && typeof(options.onLoad) === 'function') {
					options.onLoad(obj);
				}
			})
		});
	} else {
		obj = DateFactory._init(type, options);
	}
	
	return obj
};

/**
 * Map calendar names to classes to initialize in the dynamic code model.
 * TODO: Need to figure out some way that this doesn't have to be updated by hand.
 * @private
 */
DateFactory._dynMap = {
	"coptic":       "Coptic",
	"ethiopic":     "Ethiopic",
	"gregorian":    "Gregorian",
	"han":          "Han",
	"hebrew":       "Hebrew",
	"islamic":      "Islamic",
	"julian":       "Julian",
	"persian":      "Persian",
	"persian-algo": "PersianAlgo",
	"thaisolar":    "ThaiSolar"
};

/**
 * Dynamically load the code for a calendar and calendar class if necessary.
 * @protected
 */
DateFactory._dynLoadDate = function (name) {
	if (!IDate._constructors[name]) {
		var entry = DateFactory._dynMap[name];
		if (entry) {
			IDate._constructors[name] = require("./" + entry + "Date.js");
		}
	}
	return IDate._constructors[name];
};

/** 
 * @protected
 * @static 
 */
DateFactory._init = function(type, options) {
	var cons;
	
	if (ilib.isDynCode()) {
		DateFactory._dynLoadDate(type);
		CalendarFactory._dynLoadCalendar(type);
	}
	
	cons = IDate._constructors[type];
	
	// pass the same options through to the constructor so the subclass
	// has the ability to do something with if it needs to
	return cons && new cons(options);
};

/**
 * Convert JavaScript Date objects and other types into native Dates. This accepts any
 * string or number that can be translated by the JavaScript Date class,
 * (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)
 * any JavaScript Date classed object, any IDate subclass, an JulianDay object, an object
 * containing the normal options to initialize an IDate instance, or null (will 
 * return null or undefined if input is null or undefined). Normal output is 
 * a standard native subclass of the IDate object as appropriate for the locale.
 * 
 * @static
 * @protected
 * @param {IDate|Object|JulianDay|Date|string|number=} inDate The input date object, string or Number.
 * @param {IString|string=} timezone timezone to use if a new date object is created
 * @param {Locale|string=} locale locale to use when constructing an IDate
 * @return {IDate|null|undefined} an IDate subclass equivalent to the given inDate
 */
DateFactory._dateToIlib = function(inDate, timezone, locale) {
	if (typeof(inDate) === 'undefined' || inDate === null) {
		return inDate;
	}
	if (inDate instanceof IDate) {
		return inDate;
	}
	if (JSUtils.isDate(inDate)) {
		return DateFactory({
			unixtime: inDate.getTime(),
			timezone: timezone,
			locale: locale
		});
	}
	if (inDate instanceof JulianDay) {
		return DateFactory({
			jd: inDate,
			timezone: timezone,
			locale: locale
		});
	}
	if (typeof(inDate) === 'number') {
		return DateFactory({
			unixtime: inDate,
			timezone: timezone,
			locale: locale
		});
	}
	if (typeof(inDate) === 'object') {
		return DateFactory(inDate);
	}
	if (typeof(inDate) === 'string') {
		inDate = new Date(inDate);
	}
	return DateFactory({
		unixtime: inDate.getTime(),
		timezone: timezone,
		locale: locale
	});
};

module.exports = DateFactory;
},{'./ilib.js':'enyo-ilib/ilib','./JSUtils.js':'enyo-ilib/JSUtils','./Locale.js':'enyo-ilib/Locale','./LocaleInfo.js':'enyo-ilib/LocaleInfo','./JulianDay.js':'enyo-ilib/JulianDay','./CalendarFactory.js':'enyo-ilib/CalendarFactory','./IDate.js':'enyo-ilib/IDate','./GregorianDate.js':'enyo-ilib/GregorianDate'}],'enyo-ilib/ThaiSolarDate':[function (module,exports,global,require,request){
/*
 * ThaiSolarDate.js - Represent a date in the ThaiSolar calendar
 * 
 * Copyright © 2013-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
ilib.js
IDate.js 
JSUtils.js
GregorianDate.js
ThaiSolarCal.js
*/

var ilib = require("./ilib.js");
var JSUtils = require("./JSUtils.js");

var Calendar = require("./Calendar.js");
var IDate = require("./IDate.js");

var ThaiSolarCal = require("./ThaiSolarCal.js");
var GregorianDate = require("./GregorianDate.js");
var GregRataDie = require("./GregRataDie.js");

/**
 * @class
 * Construct a new Thai solar date object. The constructor parameters can 
 * contain any of the following properties:
 * 
 * <ul>
 * <li><i>unixtime<i> - sets the time of this instance according to the given 
 * unix time. Unix time is the number of milliseconds since midnight on Jan 1, 1970.
 * 
 * <li><i>julianday</i> - sets the time of this instance according to the given
 * Julian Day instance or the Julian Day given as a float
 * 
 * <li><i>year</i> - any integer, including 0
 * 
 * <li><i>month</i> - 1 to 12, where 1 means January, 2 means February, etc.
 * 
 * <li><i>day</i> - 1 to 31
 * 
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * 
 * <li><i>minute</i> - 0 to 59
 * 
 * <li><i>second</i> - 0 to 59
 * 
 * <li><i>millisecond</i> - 0 to 999
 * 
 * <li><i>timezone</i> - the TimeZone instance or time zone name as a string 
 * of this Thai solar date. The date/time is kept in the local time. The time zone
 * is used later if this date is formatted according to a different time zone and
 * the difference has to be calculated, or when the date format has a time zone
 * component in it.
 * 
 * <li><i>locale</i> - locale for this Thai solar date. If the time zone is not 
 * given, it can be inferred from this locale. For locales that span multiple
 * time zones, the one with the largest population is chosen as the one that 
 * represents the locale. 
 * </ul>
 *
 * If the constructor is called with another Thai solar date instance instead of
 * a parameter block, the other instance acts as a parameter block and its
 * settings are copied into the current instance.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above 
 * from <i>unixtime</i> through <i>millisecond</i> are present, then the date 
 * components are 
 * filled in with the current date at the time of instantiation. Note that if
 * you do not give the time zone when defaulting to the current time and the 
 * time zone for all of ilib was not set with <i>ilib.setTimeZone()</i>, then the
 * time zone will default to UTC ("Universal Time, Coordinated" or "Greenwich 
 * Mean Time").<p>
 * 
 * If any of the properties from <i>year</i> through <i>millisecond</i> are not
 * specified in the params, it is assumed that they have the smallest possible
 * value in the range for the property (zero or one).<p>
 * 
 * 
 * @constructor
 * @extends GregorianDate
 * @param {Object=} params parameters that govern the settings and behaviour of this Thai solar date
 */
var ThaiSolarDate = function(params) {
	var p = params;
	if (params) {
		// there is 198327 days difference between the Thai solar and 
		// Gregorian epochs which is equivalent to 543 years
		p = {};
		JSUtils.shallowCopy(params, p);
		if (typeof(p.year) !== 'undefined') {
			p.year -= 543;	
		}
		if (typeof(p.rd) !== 'undefined') {
			p.rd -= 198327;
		}
	}
	this.rd = undefined; // clear these out so that the GregorianDate constructor can set it
	this.offset = undefined;
	//console.log("ThaiSolarDate.constructor: date is " + JSON.stringify(this) + " parent is " + JSON.stringify(this.parent) + " and parent.parent is " + JSON.stringify(this.parent.parent));
	GregorianDate.call(this, p);
	this.cal = new ThaiSolarCal();
	// make sure the year is set correctly
	if (params && typeof(params.year) !== 'undefined') {
		this.year = parseInt(params.year, 10);
	}
};

ThaiSolarDate.prototype = new GregorianDate({noinstance: true});
ThaiSolarDate.prototype.parent = GregorianDate.prototype;
ThaiSolarDate.prototype.constructor = ThaiSolarDate;

/**
 * the difference between a zero Julian day and the zero Thai Solar date.
 * This is some 543 years before the start of the Gregorian epoch. 
 * @private
 * @const
 * @type number
 */
ThaiSolarDate.epoch = 1523097.5;

/**
 * Calculate the date components for the current time zone
 * @protected
 */
ThaiSolarDate.prototype._calcDateComponents = function () {
	// there is 198327 days difference between the Thai solar and 
	// Gregorian epochs which is equivalent to 543 years
	// console.log("ThaiSolarDate._calcDateComponents: date is " + JSON.stringify(this) + " parent is " + JSON.stringify(this.parent) + " and parent.parent is " + JSON.stringify(this.parent.parent));
	this.parent._calcDateComponents.call(this);
	this.year += 543;
};

/**
 * Return the Rata Die (fixed day) number of this date.
 * 
 * @protected
 * @return {number} the rd date as a number
 */
ThaiSolarDate.prototype.getRataDie = function() {
	// there is 198327 days difference between the Thai solar and 
	// Gregorian epochs which is equivalent to 543 years
	return this.rd.getRataDie() + 198327;
};

/**
 * Return a new Gregorian date instance that represents the first instance of the 
 * given day of the week before the current date. The day of the week is encoded
 * as a number where 0 = Sunday, 1 = Monday, etc.
 * 
 * @param {number} dow the day of the week before the current date that is being sought
 * @return {IDate} the date being sought
 */
ThaiSolarDate.prototype.before = function (dow) {
	return new ThaiSolarDate({
		rd: this.rd.before(dow, this.offset) + 198327,
		timezone: this.timezone
	});
};

/**
 * Return a new Gregorian date instance that represents the first instance of the 
 * given day of the week after the current date. The day of the week is encoded
 * as a number where 0 = Sunday, 1 = Monday, etc.
 * 
 * @param {number} dow the day of the week after the current date that is being sought
 * @return {IDate} the date being sought
 */
ThaiSolarDate.prototype.after = function (dow) {
	return new ThaiSolarDate({
		rd: this.rd.after(dow, this.offset) + 198327,
		timezone: this.timezone
	});
};

/**
 * Return a new Gregorian date instance that represents the first instance of the 
 * given day of the week on or before the current date. The day of the week is encoded
 * as a number where 0 = Sunday, 1 = Monday, etc.
 * 
 * @param {number} dow the day of the week on or before the current date that is being sought
 * @return {IDate} the date being sought
 */
ThaiSolarDate.prototype.onOrBefore = function (dow) {
	return new ThaiSolarDate({
		rd: this.rd.onOrBefore(dow, this.offset) + 198327,
		timezone: this.timezone
	});
};

/**
 * Return a new Gregorian date instance that represents the first instance of the 
 * given day of the week on or after the current date. The day of the week is encoded
 * as a number where 0 = Sunday, 1 = Monday, etc.
 * 
 * @param {number} dow the day of the week on or after the current date that is being sought
 * @return {IDate} the date being sought
 */
ThaiSolarDate.prototype.onOrAfter = function (dow) {
	return new ThaiSolarDate({
		rd: this.rd.onOrAfter(dow, this.offset) + 198327,
		timezone: this.timezone
	});
};

/**
 * Return the name of the calendar that governs this date.
 * 
 * @return {string} a string giving the name of the calendar
 */
ThaiSolarDate.prototype.getCalendar = function() {
	return "thaisolar";
};

//register with the factory method
IDate._constructors["thaisolar"] = ThaiSolarDate;

module.exports = ThaiSolarDate;

},{'./ilib.js':'enyo-ilib/ilib','./JSUtils.js':'enyo-ilib/JSUtils','./Calendar.js':'enyo-ilib/Calendar','./IDate.js':'enyo-ilib/IDate','./ThaiSolarCal.js':'enyo-ilib/ThaiSolarCal','./GregorianDate.js':'enyo-ilib/GregorianDate','./GregRataDie.js':'enyo-ilib/GregRataDie'}],'enyo-ilib/Astro':[function (module,exports,global,require,request){
/*
 * astro.js - Static functions to support astronomical calculations
 * 
 * Copyright © 2014-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends
ilib.js
IDate.js
Utils.js
MathUtils.js
SearchUtils.js
GregorianDate.js
GregRataDie.js
*/

// !data astro

/*
 * These routines were derived from a public domain set of JavaScript 
 * functions for positional astronomy by John Walker of Fourmilab, 
 * September 1999.
 */

var ilib = require("./ilib.js");
var Utils = require("./Utils.js");
var MathUtils = require("./MathUtils.js");
var SearchUtils = require("./SearchUtils.js");

var GregorianDate = require("./GregorianDate.js");
var RataDie = require("./RataDie.js");
var GregRataDie = require("./GregRataDie.js");

var Astro = {};

/**
 * Load in all the data needed for astrological calculations.
 * 
 * @private
 * @param {boolean} sync
 * @param {*} loadParams
 * @param {function(*)|undefined} callback
 */
Astro.initAstro = function(sync, loadParams, callback) {
	if (!ilib.data.astro) {
		Utils.loadData({
			name: "astro.json", // countries in their own language 
			locale: "-", // only need to load the root file 
			nonLocale: true,
			sync: sync, 
			loadParams: loadParams, 
			callback: ilib.bind(this, /** @type function() */ function(astroData) {
				/** 
				 * @type {{
				 *  	_EquinoxpTerms:Array.<number>, 
				 *  	_JDE0tab1000:Array.<number>, 
				 *  	_JDE0tab2000:Array.<number>, 
				 *  	_deltaTtab:Array.<number>,
				 *  	_oterms:Array.<number>,
				 *  	_nutArgMult:Array.<number>, 
				 *  	_nutArgCoeff:Array.<number>, 
				 *  	_nutCoeffA:Array.<number>,
				 *  	_nutCoeffB:Array.<number>,
				 *  	_coeff19th:Array.<number>,
				 *  	_coeff18th:Array.<number>,
				 *  	_solarLongCoeff:Array.<number>, 
				 *  	_solarLongMultipliers:Array.<number>, 
				 *  	_solarLongAddends:Array.<number>, 
				 *  	_meanMoonCoeff:Array.<number>,
				 *  	_elongationCoeff:Array.<number>,
				 *  	_solarAnomalyCoeff:Array.<number>,
				 *  	_lunarAnomalyCoeff:Array.<number>,
				 *  	_moonFromNodeCoeff:Array.<number>,
				 *  	_eCoeff:Array.<number>,
				 *  	_lunarElongationLongCoeff:Array.<number>,
				 *  	_solarAnomalyLongCoeff:Array.<number>,
				 *  	_lunarAnomalyLongCoeff:Array.<number>,
				 *  	_moonFromNodeLongCoeff:Array.<number>,
				 *  	_sineCoeff:Array.<number>,
				 *  	_nmApproxCoeff:Array.<number>,
				 *  	_nmCapECoeff:Array.<number>,
				 *  	_nmSolarAnomalyCoeff:Array.<number>,
				 *  	_nmLunarAnomalyCoeff:Array.<number>,
				 *  	_nmMoonArgumentCoeff:Array.<number>,
				 *  	_nmCapOmegaCoeff:Array.<number>,
				 *  	_nmEFactor:Array.<number>,
				 *  	_nmSolarCoeff:Array.<number>,
				 *  	_nmLunarCoeff:Array.<number>,
				 *  	_nmMoonCoeff:Array.<number>,
				 *  	_nmSineCoeff:Array.<number>,
				 *  	_nmAddConst:Array.<number>,
				 *  	_nmAddCoeff:Array.<number>,
				 *  	_nmAddFactor:Array.<number>,
				 *  	_nmExtra:Array.<number>
				 *  }}
				 */ 	
			 	ilib.data.astro = astroData;
				if (callback && typeof(callback) === 'function') {
					callback(astroData);
				}
			})
		});
	} else {
		if (callback && typeof(callback) === 'function') {
			callback(ilib.data.astro);
		}
	}
};

/**
 * Convert degrees to radians.
 * 
 * @static
 * @protected
 * @param {number} d angle in degrees
 * @return {number} angle in radians 
 */
Astro._dtr = function(d) {
	return (d * Math.PI) / 180.0;
};

/**
 * Convert radians to degrees.
 * 
 * @static
 * @protected
 * @param {number} r angle in radians
 * @return {number} angle in degrees 
 */
Astro._rtd = function(r) {
	return (r * 180.0) / Math.PI;
};

/**
 * Return the cosine of an angle given in degrees.
 * @static
 * @protected
 * @param {number} d angle in degrees
 * @return {number} cosine of the angle.
 */  
Astro._dcos = function(d) {
	return Math.cos(Astro._dtr(d));
};

/**
 * Return the sine of an angle given in degrees.
 * @static
 * @protected
 * @param {number} d angle in degrees
 * @return {number} sine of the angle.
 */  
Astro._dsin = function(d) {
	return Math.sin(Astro._dtr(d));
};

/**
 * Return the tan of an angle given in degrees.
 * @static
 * @protected
 * @param {number} d angle in degrees
 * @return {number} tan of the angle.
 */  
Astro._dtan = function(d) {
	return Math.tan(Astro._dtr(d));
};

/**
 * Range reduce angle in degrees.
 * 
 * @static
 * @param {number} a angle to reduce
 * @return {number} the reduced angle  
 */
Astro._fixangle = function(a) {
	return a - 360.0 * (Math.floor(a / 360.0));
};

/**
 * Range reduce angle in radians.
 * 
 * @static
 * @protected
 * @param {number} a angle to reduce
 * @return {number} the reduced angle  
 */
Astro._fixangr = function(a) {
	return a - (2 * Math.PI) * (Math.floor(a / (2 * Math.PI)));
};

/**
 * Determine the Julian Ephemeris Day of an equinox or solstice.  The "which" 
 * argument selects the item to be computed:
 * 
 * <ul>
 * <li>0   March equinox
 * <li>1   June solstice
 * <li>2   September equinox
 * <li>3   December solstice
 * </ul>
 * 
 * @static
 * @protected
 * @param {number} year Gregorian year to calculate for
 * @param {number} which Which equinox or solstice to calculate
 */
Astro._equinox = function(year, which) {
	var deltaL, i, j, JDE0, JDE, JDE0tab, S, T, W, Y;

	/*  Initialize terms for mean equinox and solstices.  We
	    have two sets: one for years prior to 1000 and a second
	    for subsequent years.  */

	if (year < 1000) {
		JDE0tab = ilib.data.astro._JDE0tab1000;
		Y = year / 1000;
	} else {
		JDE0tab = ilib.data.astro._JDE0tab2000;
		Y = (year - 2000) / 1000;
	}

	JDE0 = JDE0tab[which][0] + (JDE0tab[which][1] * Y)
			+ (JDE0tab[which][2] * Y * Y) + (JDE0tab[which][3] * Y * Y * Y)
			+ (JDE0tab[which][4] * Y * Y * Y * Y);

	//document.debug.log.value += "JDE0 = " + JDE0 + "\n";

	T = (JDE0 - 2451545.0) / 36525;
	//document.debug.log.value += "T = " + T + "\n";
	W = (35999.373 * T) - 2.47;
	//document.debug.log.value += "W = " + W + "\n";
	deltaL = 1 + (0.0334 * Astro._dcos(W)) + (0.0007 * Astro._dcos(2 * W));
	//document.debug.log.value += "deltaL = " + deltaL + "\n";

	//  Sum the periodic terms for time T

	S = 0;
	j = 0;
	for (i = 0; i < 24; i++) {
		S += ilib.data.astro._EquinoxpTerms[j]
				* Astro._dcos(ilib.data.astro._EquinoxpTerms[j + 1] + (ilib.data.astro._EquinoxpTerms[j + 2] * T));
		j += 3;
	}

	//document.debug.log.value += "S = " + S + "\n";
	//document.debug.log.value += "Corr = " + ((S * 0.00001) / deltaL) + "\n";

	JDE = JDE0 + ((S * 0.00001) / deltaL);

	return JDE;
};

/* 
 * The table of observed Delta T values at the beginning of
 * years from 1620 through 2014 as found in astro.json is taken from
 * http://www.staff.science.uu.nl/~gent0113/deltat/deltat.htm
 * and
 * ftp://maia.usno.navy.mil/ser7/deltat.data
 */

/**  
 * Determine the difference, in seconds, between dynamical time and universal time.
 * 
 * @static
 * @protected
 * @param {number} year to calculate the difference for
 * @return {number} difference in seconds between dynamical time and universal time  
 */
Astro._deltat = function (year) {
	var dt, f, i, t;

	if ((year >= 1620) && (year <= 2014)) {
		i = Math.floor(year - 1620);
		f = (year - 1620) - i; /* Fractional part of year */
		dt = ilib.data.astro._deltaTtab[i] + ((ilib.data.astro._deltaTtab[i + 1] - ilib.data.astro._deltaTtab[i]) * f);
	} else {
		t = (year - 2000) / 100;
		if (year < 948) {
			dt = 2177 + (497 * t) + (44.1 * t * t);
		} else {
			dt = 102 + (102 * t) + (25.3 * t * t);
			if ((year > 2000) && (year < 2100)) {
				dt += 0.37 * (year - 2100);
			}
		}
	}
	return dt;
};

/**
 * Calculate the obliquity of the ecliptic for a given
 * Julian date.  This uses Laskar's tenth-degree
 * polynomial fit (J. Laskar, Astronomy and
 * Astrophysics, Vol. 157, page 68 [1986]) which is
 * accurate to within 0.01 arc second between AD 1000
 * and AD 3000, and within a few seconds of arc for
 * +/-10000 years around AD 2000.  If we're outside the
 * range in which this fit is valid (deep time) we
 * simply return the J2000 value of the obliquity, which
 * happens to be almost precisely the mean.
 * 
 * @static
 * @protected
 * @param {number} jd Julian Day to calculate the obliquity for
 * @return {number} the obliquity
 */
Astro._obliqeq = function (jd) {
	var eps, u, v, i;

 	v = u = (jd - 2451545.0) / 3652500.0;

 	eps = 23 + (26 / 60.0) + (21.448 / 3600.0);

 	if (Math.abs(u) < 1.0) {
 		for (i = 0; i < 10; i++) {
 			eps += (ilib.data.astro._oterms[i] / 3600.0) * v;
 			v *= u;
 		}
 	}
 	return eps;
};

/**
 * Return the position of the sun.  We return
 * intermediate values because they are useful in a
 * variety of other contexts.
 * @static
 * @protected
 * @param {number} jd find the position of sun on this Julian Day
 * @return {Object} the position of the sun and many intermediate
 * values
 */
Astro._sunpos = function(jd) {
	var ret = {}, 
		T, T2, T3, Omega, epsilon, epsilon0;

	T = (jd - 2451545.0) / 36525.0;
	//document.debug.log.value += "Sunpos.  T = " + T + "\n";
	T2 = T * T;
	T3 = T * T2;
	ret.meanLongitude = Astro._fixangle(280.46646 + 36000.76983 * T + 0.0003032 * T2);
	//document.debug.log.value += "ret.meanLongitude = " + ret.meanLongitude + "\n";
	ret.meanAnomaly = Astro._fixangle(357.52911 + (35999.05029 * T) - 0.0001537 * T2 - 0.00000048 * T3);
	//document.debug.log.value += "ret.meanAnomaly = " + ret.meanAnomaly + "\n";
	ret.eccentricity = 0.016708634 - 0.000042037 * T - 0.0000001267 * T2;
	//document.debug.log.value += "e = " + e + "\n";
	ret.equationOfCenter = ((1.914602 - 0.004817 * T - 0.000014 * T2) * Astro._dsin(ret.meanAnomaly))
			+ ((0.019993 - 0.000101 * T) * Astro._dsin(2 * ret.meanAnomaly))
			+ (0.000289 * Astro._dsin(3 * ret.meanAnomaly));
	//document.debug.log.value += "ret.equationOfCenter = " + ret.equationOfCenter + "\n";
	ret.sunLongitude = ret.meanLongitude + ret.equationOfCenter;
	//document.debug.log.value += "ret.sunLongitude = " + ret.sunLongitude + "\n";
	//ret.sunAnomaly = ret.meanAnomaly + ret.equationOfCenter;
	//document.debug.log.value += "ret.sunAnomaly = " + ret.sunAnomaly + "\n";
	// ret.sunRadius = (1.000001018 * (1 - (ret.eccentricity * ret.eccentricity))) / (1 + (ret.eccentricity * Astro._dcos(ret.sunAnomaly)));
	//document.debug.log.value += "ret.sunRadius = " + ret.sunRadius + "\n";
	Omega = 125.04 - (1934.136 * T);
	//document.debug.log.value += "Omega = " + Omega + "\n";
	ret.apparentLong = ret.sunLongitude + (-0.00569) + (-0.00478 * Astro._dsin(Omega));
	//document.debug.log.value += "ret.apparentLong = " + ret.apparentLong + "\n";
	epsilon0 = Astro._obliqeq(jd);
	//document.debug.log.value += "epsilon0 = " + epsilon0 + "\n";
	epsilon = epsilon0 + (0.00256 * Astro._dcos(Omega));
	//document.debug.log.value += "epsilon = " + epsilon + "\n";
	//ret.rightAscension = Astro._fixangle(Astro._rtd(Math.atan2(Astro._dcos(epsilon0) * Astro._dsin(ret.sunLongitude), Astro._dcos(ret.sunLongitude))));
	//document.debug.log.value += "ret.rightAscension = " + ret.rightAscension + "\n";
	// ret.declination = Astro._rtd(Math.asin(Astro._dsin(epsilon0) * Astro._dsin(ret.sunLongitude)));
	////document.debug.log.value += "ret.declination = " + ret.declination + "\n";
	ret.inclination = Astro._fixangle(23.4392911 - 0.013004167 * T - 0.00000016389 * T2 + 0.0000005036 * T3);
	ret.apparentRightAscension = Astro._fixangle(Astro._rtd(Math.atan2(Astro._dcos(epsilon) * Astro._dsin(ret.apparentLong), Astro._dcos(ret.apparentLong))));
	//document.debug.log.value += "ret.apparentRightAscension = " + ret.apparentRightAscension + "\n";
	//ret.apparentDeclination = Astro._rtd(Math.asin(Astro._dsin(epsilon) * Astro._dsin(ret.apparentLong)));
	//document.debug.log.value += "ret.apparentDecliation = " + ret.apparentDecliation + "\n";

	// Angular quantities are expressed in decimal degrees
	return ret;
};

/**
 * Calculate the nutation in longitude, deltaPsi, and obliquity, 
 * deltaEpsilon for a given Julian date jd. Results are returned as an object
 * giving deltaPsi and deltaEpsilon in degrees.
 * 
 * @static
 * @protected
 * @param {number} jd calculate the nutation of this Julian Day
 * @return {Object} the deltaPsi and deltaEpsilon of the nutation
 */
Astro._nutation = function(jd) {
	var i, j, 
		t = (jd - 2451545.0) / 36525.0, 
		t2, t3, to10, 
		ta = [], 
		dp = 0, 
		de = 0, 
		ang,
		ret = {};

	t3 = t * (t2 = t * t);

	/*
	 * Calculate angles. The correspondence between the elements of our array
	 * and the terms cited in Meeus are:
	 * 
	 * ta[0] = D ta[0] = M ta[2] = M' ta[3] = F ta[4] = \Omega
	 * 
	 */

	ta[0] = Astro._dtr(297.850363 + 445267.11148 * t - 0.0019142 * t2 + t3 / 189474.0);
	ta[1] = Astro._dtr(357.52772 + 35999.05034 * t - 0.0001603 * t2 - t3 / 300000.0);
	ta[2] = Astro._dtr(134.96298 + 477198.867398 * t + 0.0086972 * t2 + t3 / 56250.0);
	ta[3] = Astro._dtr(93.27191 + 483202.017538 * t - 0.0036825 * t2 + t3 / 327270);
	ta[4] = Astro._dtr(125.04452 - 1934.136261 * t + 0.0020708 * t2 + t3 / 450000.0);

	/*
	 * Range reduce the angles in case the sine and cosine functions don't do it
	 * as accurately or quickly.
	 */

	for (i = 0; i < 5; i++) {
		ta[i] = Astro._fixangr(ta[i]);
	}

	to10 = t / 10.0;
	for (i = 0; i < 63; i++) {
		ang = 0;
		for (j = 0; j < 5; j++) {
			if (ilib.data.astro._nutArgMult[(i * 5) + j] != 0) {
				ang += ilib.data.astro._nutArgMult[(i * 5) + j] * ta[j];
			}
		}
		dp += (ilib.data.astro._nutArgCoeff[(i * 4) + 0] + ilib.data.astro._nutArgCoeff[(i * 4) + 1] * to10) * Math.sin(ang);
		de += (ilib.data.astro._nutArgCoeff[(i * 4) + 2] + ilib.data.astro._nutArgCoeff[(i * 4) + 3] * to10) * Math.cos(ang);
	}

	/*
	 * Return the result, converting from ten thousandths of arc seconds to
	 * radians in the process.
	 */

	ret.deltaPsi = dp / (3600.0 * 10000.0);
	ret.deltaEpsilon = de / (3600.0 * 10000.0);

	return ret;
};

/**
 * Returns the equation of time as a fraction of a day.
 * 
 * @static
 * @protected
 * @param {number} jd the Julian Day of the day to calculate for
 * @return {number} the equation of time for the given day  
 */
Astro._equationOfTime = function(jd) {
	var alpha, deltaPsi, E, epsilon, L0, tau, pos;

	// 2451545.0 is the Julian day of J2000 epoch
	// 365250.0 is the number of days in a Julian millenium
	tau = (jd - 2451545.0) / 365250.0;
	//console.log("equationOfTime.  tau = " + tau);
	L0 = 280.4664567 + (360007.6982779 * tau) + (0.03032028 * tau * tau)
			+ ((tau * tau * tau) / 49931)
			+ (-((tau * tau * tau * tau) / 15300))
			+ (-((tau * tau * tau * tau * tau) / 2000000));
	//console.log("L0 = " + L0);
	L0 = Astro._fixangle(L0);
	//console.log("L0 = " + L0);
	pos = Astro._sunpos(jd);
	alpha = pos.apparentRightAscension;
	//console.log("alpha = " + alpha);
	var nut = Astro._nutation(jd);
	deltaPsi = nut.deltaPsi;
	//console.log("deltaPsi = " + deltaPsi);
	epsilon = Astro._obliqeq(jd) + nut.deltaEpsilon;
	//console.log("epsilon = " + epsilon);
	//console.log("L0 - 0.0057183 = " + (L0 - 0.0057183));
	//console.log("L0 - 0.0057183 - alpha = " + (L0 - 0.0057183 - alpha));
	//console.log("deltaPsi * cos(epsilon) = " + deltaPsi * Astro._dcos(epsilon));
	
	E = L0 - 0.0057183 - alpha + deltaPsi * Astro._dcos(epsilon);
	// if alpha and L0 are in different quadrants, then renormalize
	// so that the difference between them is in the right range
	if (E > 180) {
		E -= 360;
	}
	//console.log("E = " + E);
	// E = E - 20.0 * (Math.floor(E / 20.0));
	E = E * 4;
	//console.log("Efixed = " + E);
	E = E / (24 * 60);
	//console.log("Eday = " + E);

	return E;
};

/**
 * @private
 * @static
 */
Astro._poly = function(x, coefficients) {
	var result = coefficients[0];
	var xpow = x;
	for (var i = 1; i < coefficients.length; i++) {
		result += coefficients[i] * xpow;
		xpow *= x;
	}
	return result;
};

/**
 * Calculate the UTC RD from the local RD given "zone" number of minutes
 * worth of offset.
 * 
 * @static
 * @protected
 * @param {number} local RD of the locale time, given in any calendar
 * @param {number} zone number of minutes of offset from UTC for the time zone 
 * @return {number} the UTC equivalent of the local RD
 */
Astro._universalFromLocal = function(local, zone) {
	return local - zone / 1440;
};

/**
 * Calculate the local RD from the UTC RD given "zone" number of minutes
 * worth of offset.
 * 
 * @static
 * @protected
 * @param {number} local RD of the locale time, given in any calendar
 * @param {number} zone number of minutes of offset from UTC for the time zone 
 * @return {number} the UTC equivalent of the local RD
 */
Astro._localFromUniversal = function(local, zone) {
	return local + zone / 1440;
};

/**
 * @private
 * @static
 * @param {number} c julian centuries of the date to calculate
 * @return {number} the aberration
 */
Astro._aberration = function(c) {
	return 9.74e-05 * Astro._dcos(177.63 + 35999.01847999999 * c) - 0.005575;
};

/**
 * @private
 *
ilib.data.astro._nutCoeffA = [124.90, -1934.134, 0.002063];
ilib.data.astro._nutCoeffB q= [201.11, 72001.5377, 0.00057];
*/

/**
 * @private
 * @static
 * @param {number} c julian centuries of the date to calculate
 * @return {number} the nutation for the given julian century in radians
 */
Astro._nutation2 = function(c) {
	var a = Astro._poly(c, ilib.data.astro._nutCoeffA);
	var b = Astro._poly(c, ilib.data.astro._nutCoeffB);
	// return -0.0000834 * Astro._dsin(a) - 0.0000064 * Astro._dsin(b);
	return -0.004778 * Astro._dsin(a) - 0.0003667 * Astro._dsin(b);
};

/**
 * @static
 * @private
 */
Astro._ephemerisCorrection = function(jd) {
	var year = GregorianDate._calcYear(jd - 1721424.5);
	
	if (1988 <= year && year <= 2019) {
		return (year - 1933) / 86400;
	}
	
	if (1800 <= year && year <= 1987) {
		var jul1 = new GregRataDie({
			year: year,
			month: 7,
			day: 1,
			hour: 0,
			minute: 0,
			second: 0
		});
		// 693596 is the rd of Jan 1, 1900
		var theta = (jul1.getRataDie() - 693596) / 36525;
		return Astro._poly(theta, (1900 <= year) ? ilib.data.astro._coeff19th : ilib.data.astro._coeff18th);
	}
	
	if (1620 <= year && year <= 1799) {
		year -= 1600;
		return (196.58333 - 4.0675 * year + 0.0219167 * year * year) / 86400;
	}
	
	// 660724 is the rd of Jan 1, 1810
	var jan1 = new GregRataDie({
		year: year,
		month: 1,
		day: 1,
		hour: 0,
		minute: 0,
		second: 0
	});
	// var x = 0.5 + (jan1.getRataDie() - 660724);
	var x = 0.5 + (jan1.getRataDie() - 660724);
	
	return ((x * x / 41048480) - 15) / 86400;
};

/**
 * @static
 * @private
 */
Astro._ephemerisFromUniversal = function(jd) {
	return jd + Astro._ephemerisCorrection(jd);
};

/**
 * @static
 * @private
 */
Astro._universalFromEphemeris = function(jd) {
	return jd - Astro._ephemerisCorrection(jd);
};

/**
 * @static
 * @private
 */
Astro._julianCenturies = function(jd) {
	// 2451545.0 is the Julian day of J2000 epoch
	// 730119.5 is the Gregorian RD of J2000 epoch
	// 36525.0 is the number of days in a Julian century
	return (Astro._ephemerisFromUniversal(jd) - 2451545.0) / 36525.0;
};

/**
 * Calculate the solar longitude
 * 
 * @static
 * @protected
 * @param {number} jd julian day of the date to calculate the longitude for 
 * @return {number} the solar longitude in degrees
 */
Astro._solarLongitude = function(jd) {
	var c = Astro._julianCenturies(jd),
		longitude = 0,
		len = ilib.data.astro._solarLongCoeff.length,
		row;
	
	for (var i = 0; i < len; i++) {
		longitude += ilib.data.astro._solarLongCoeff[i] * 
			Astro._dsin(ilib.data.astro._solarLongAddends[i] + ilib.data.astro._solarLongMultipliers[i] * c);
	}
	longitude *= 5.729577951308232e-06;
	longitude += 282.77718340000001 + 36000.769537439999 * c;
	longitude += Astro._aberration(c) + Astro._nutation2(c);
	return Astro._fixangle(longitude);
};

/**
 * @static
 * @protected
 * @param {number} jd
 * @return {number}
 */
Astro._lunarLongitude = function (jd) {
	var c = Astro._julianCenturies(jd),
	    meanMoon = Astro._fixangle(Astro._poly(c, ilib.data.astro._meanMoonCoeff)),
	    elongation = Astro._fixangle(Astro._poly(c, ilib.data.astro._elongationCoeff)),
	    solarAnomaly = Astro._fixangle(Astro._poly(c, ilib.data.astro._solarAnomalyCoeff)),
	    lunarAnomaly = Astro._fixangle(Astro._poly(c, ilib.data.astro._lunarAnomalyCoeff)),
	    moonNode = Astro._fixangle(Astro._poly(c, ilib.data.astro._moonFromNodeCoeff)),
	    e = Astro._poly(c, ilib.data.astro._eCoeff);
	
	var sum = 0;
	for (var i = 0; i < ilib.data.astro._lunarElongationLongCoeff.length; i++) {
		var x = ilib.data.astro._solarAnomalyLongCoeff[i];

		sum += ilib.data.astro._sineCoeff[i] * Math.pow(e, Math.abs(x)) * 
			Astro._dsin(ilib.data.astro._lunarElongationLongCoeff[i] * elongation + x * solarAnomaly + 
				ilib.data.astro._lunarAnomalyLongCoeff[i] * lunarAnomaly + 
				ilib.data.astro._moonFromNodeLongCoeff[i] * moonNode);
	}
	var longitude = sum / 1000000;
	var venus = 3958.0 / 1000000 * Astro._dsin(119.75 + c * 131.84899999999999);
	var jupiter = 318.0 / 1000000 * Astro._dsin(53.090000000000003 + c * 479264.28999999998);
	var flatEarth = 1962.0 / 1000000 * Astro._dsin(meanMoon - moonNode);
	
	return Astro._fixangle(meanMoon + longitude + venus + jupiter + flatEarth + Astro._nutation2(c));
};

/**
 * @static
 * @protected
 * @param {number} n
 * @return {number} julian day of the n'th new moon
 */
Astro._newMoonTime = function(n) {
	var k = n - 24724;
	var c = k / 1236.8499999999999;
	var approx = Astro._poly(c, ilib.data.astro._nmApproxCoeff);
	var capE = Astro._poly(c, ilib.data.astro._nmCapECoeff);
	var solarAnomaly = Astro._poly(c, ilib.data.astro._nmSolarAnomalyCoeff);
	var lunarAnomaly = Astro._poly(c, ilib.data.astro._nmLunarAnomalyCoeff);
	var moonArgument = Astro._poly(c, ilib.data.astro._nmMoonArgumentCoeff);
	var capOmega = Astro._poly(c, ilib.data.astro._nmCapOmegaCoeff);
	var correction = -0.00017 * Astro._dsin(capOmega);
	for (var i = 0; i < ilib.data.astro._nmSineCoeff.length; i++) {
		correction = correction + ilib.data.astro._nmSineCoeff[i] * Math.pow(capE, ilib.data.astro._nmEFactor[i]) * 
		Astro._dsin(ilib.data.astro._nmSolarCoeff[i] * solarAnomaly + 
				ilib.data.astro._nmLunarCoeff[i] * lunarAnomaly + 
				ilib.data.astro._nmMoonCoeff[i] * moonArgument);
	}
	var additional = 0;
	for (var i = 0; i < ilib.data.astro._nmAddConst.length; i++) {
		additional = additional + ilib.data.astro._nmAddFactor[i] * 
		Astro._dsin(ilib.data.astro._nmAddConst[i] + ilib.data.astro._nmAddCoeff[i] * k);
	}
	var extra = 0.000325 * Astro._dsin(Astro._poly(c, ilib.data.astro._nmExtra));
	return Astro._universalFromEphemeris(approx + correction + extra + additional + RataDie.gregorianEpoch);
};

/**
 * @static
 * @protected
 * @param {number} jd
 * @return {number}
 */
Astro._lunarSolarAngle = function(jd) {
	var lunar = Astro._lunarLongitude(jd);
	var solar = Astro._solarLongitude(jd)
	return Astro._fixangle(lunar - solar);
};

/**
 * @static
 * @protected
 * @param {number} jd
 * @return {number}
 */
Astro._newMoonBefore = function (jd) {
	var phase = Astro._lunarSolarAngle(jd);
	// 11.450086114414322 is the julian day of the 0th full moon
	// 29.530588853000001 is the average length of a month
	var guess = Math.round((jd - 11.450086114414322 - RataDie.gregorianEpoch) / 29.530588853000001 - phase / 360) - 1;
	var current, last;
	current = last = Astro._newMoonTime(guess);
	while (current < jd) {
		guess++;
		last = current;
		current = Astro._newMoonTime(guess);
	}
	return last;
};

/**
 * @static
 * @protected
 * @param {number} jd
 * @return {number}
 */
Astro._newMoonAtOrAfter = function (jd) {
	var phase = Astro._lunarSolarAngle(jd);
	// 11.450086114414322 is the julian day of the 0th full moon
	// 29.530588853000001 is the average length of a month
	var guess = Math.round((jd - 11.450086114414322 - RataDie.gregorianEpoch) / 29.530588853000001 - phase / 360);
	var current;
	while ((current = Astro._newMoonTime(guess)) < jd) {
		guess++;
	}
	return current;
};

/**
 * @static
 * @protected
 * @param {number} jd JD to calculate from
 * @param {number} longitude longitude to seek 
 * @returns {number} the JD of the next time that the solar longitude 
 * is a multiple of the given longitude
 */
Astro._nextSolarLongitude = function(jd, longitude) {
	var rate = 365.242189 / 360.0;
	var tau = jd + rate * Astro._fixangle(longitude - Astro._solarLongitude(jd));
	var start = Math.max(jd, tau - 5.0);
	var end = tau + 5.0;
	
	return SearchUtils.bisectionSearch(0, start, end, 1e-6, function (l) {
		return 180 - Astro._fixangle(Astro._solarLongitude(l) - longitude);
	});
};

/**
 * Floor the julian day to midnight of the current julian day.
 * 
 * @static
 * @protected
 * @param {number} jd the julian to round
 * @return {number} the jd floored to the midnight of the julian day
 */
Astro._floorToJD = function(jd) {
	return Math.floor(jd - 0.5) + 0.5;
};

/**
 * Floor the julian day to midnight of the current julian day.
 * 
 * @static
 * @protected
 * @param {number} jd the julian to round
 * @return {number} the jd floored to the midnight of the julian day
 */
Astro._ceilToJD = function(jd) {
	return Math.ceil(jd + 0.5) - 0.5;
};

module.exports = Astro;

},{'./ilib.js':'enyo-ilib/ilib','./Utils.js':'enyo-ilib/Utils','./MathUtils.js':'enyo-ilib/MathUtils','./SearchUtils.js':'enyo-ilib/SearchUtils','./GregorianDate.js':'enyo-ilib/GregorianDate','./RataDie.js':'enyo-ilib/RataDie','./GregRataDie.js':'enyo-ilib/GregRataDie'}],'enyo-ilib/CopticDate':[function (module,exports,global,require,request){
/*
 * CopticDate.js - Represent a date in the Coptic calendar
 * 
 * Copyright © 2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
ilib.js
IDate.js 
CopticCal.js 
MathUtils.js
JSUtils.js
Locale.js
LocaleInfo.js 
TimeZone.js
EthiopicDate.js
CopticRataDie.js
*/

var ilib = require("./ilib.js");
var MathUtils = require("./MathUtils.js");
var JSUtils = require("./JSUtils.js");

var Locale = require("./Locale.js");
var LocaleInfo = require("./LocaleInfo.js");
var IDate = require("./IDate.js");
var TimeZone = require("./TimeZone.js");
var Calendar = require("./Calendar.js");

var EthiopicDate = require("./EthiopicDate.js");
var CopticCal = require("./CopticCal.js");
var CopticRataDie = require("./CopticRataDie.js");

/**
 * @class
 * Construct a new date object for the Coptic Calendar. The constructor can be called
 * with a parameter object that contains any of the following properties:
 * 
 * <ul>
 * <li><i>unixtime<i> - sets the time of this instance according to the given 
 * unix time. Unix time is the number of milliseconds since midnight on Jan 1, 1970 (Gregorian).
 * <li><i>julianday</i> - the Julian Day to set into this date
 * <li><i>year</i> - any integer
 * <li><i>month</i> - 1 to 13, where 1 means Thoout, 2 means Paope, etc., and 13 means Epagomene
 * <li><i>day</i> - 1 to 30
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * <li><i>minute</i> - 0 to 59
 * <li><i>second</i> - 0 to 59
 * <li><i>millisecond<i> - 0 to 999
 * <li><i>locale</i> - the TimeZone instance or time zone name as a string 
 * of this coptic date. The date/time is kept in the local time. The time zone
 * is used later if this date is formatted according to a different time zone and
 * the difference has to be calculated, or when the date format has a time zone
 * component in it.
 * <li><i>timezone</i> - the time zone of this instance. If the time zone is not 
 * given, it can be inferred from this locale. For locales that span multiple
 * time zones, the one with the largest population is chosen as the one that 
 * represents the locale. 
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 *  
 * If called with another Coptic date argument, the date components of the given
 * date are copied into the current one.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above 
 * from <i>unixtime</i> through <i>millisecond</i> are present, then the date 
 * components are 
 * filled in with the current date at the time of instantiation. Note that if
 * you do not give the time zone when defaulting to the current time and the 
 * time zone for all of ilib was not set with <i>ilib.setTimeZone()</i>, then the
 * time zone will default to UTC ("Universal Time, Coordinated" or "Greenwich 
 * Mean Time").<p>
 * 
 * 
 * @constructor
 * @extends EthiopicDate
 * @param {Object=} params parameters that govern the settings and behaviour of this Coptic date
 */
var CopticDate = function(params) {
	this.rd = undefined; // clear these out so that the EthiopicDate constructor can set it
	EthiopicDate.call(this, params);
	this.cal = new CopticCal();
};

CopticDate.prototype = new EthiopicDate({noinstance: true});
CopticDate.prototype.parent = EthiopicDate.prototype;
CopticDate.prototype.constructor = CopticDate;

/**
 * Return a new RD for this date type using the given params.
 * @protected
 * @param {Object=} params the parameters used to create this rata die instance
 * @returns {RataDie} the new RD instance for the given params
 */
CopticDate.prototype.newRd = function (params) {
	return new CopticRataDie(params);
};

/**
 * Return the day of the week of this date. The day of the week is encoded
 * as number from 0 to 6, with 0=Sunday, 1=Monday, etc., until 6=Saturday.
 * 
 * @return {number} the day of the week
 */
CopticDate.prototype.getDayOfWeek = function() {
	var rd = Math.floor(this.rd.getRataDie() + (this.offset || 0));
	return MathUtils.mod(rd-3, 7);
};

/**
 * Return the name of the calendar that governs this date.
 * 
 * @return {string} a string giving the name of the calendar
 */
CopticDate.prototype.getCalendar = function() {
	return "coptic";
};

//register with the factory method
IDate._constructors["coptic"] = CopticDate;

module.exports = CopticDate;
},{'./ilib.js':'enyo-ilib/ilib','./MathUtils.js':'enyo-ilib/MathUtils','./JSUtils.js':'enyo-ilib/JSUtils','./Locale.js':'enyo-ilib/Locale','./LocaleInfo.js':'enyo-ilib/LocaleInfo','./IDate.js':'enyo-ilib/IDate','./TimeZone.js':'enyo-ilib/TimeZone','./Calendar.js':'enyo-ilib/Calendar','./EthiopicDate.js':'enyo-ilib/EthiopicDate','./CopticCal.js':'enyo-ilib/CopticCal','./CopticRataDie.js':'enyo-ilib/CopticRataDie'}],'enyo-ilib/DateFmt':[function (module,exports,global,require,request){
/*
 * DateFmt.js - Date formatter definition
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
!depends 
ilib.js 
Locale.js 
IDate.js
DateFactory.js  
IString.js 
ResBundle.js 
Calendar.js
CalendarFactory.js
LocaleInfo.js
TimeZone.js
GregorianCal.js
JSUtils.js
Utils.js
*/

// !data dateformats sysres

var ilib = require("./ilib.js");
var Utils = require("./Utils.js");
var JSUtils = require("./JSUtils.js");

var Locale = require("./Locale.js");
var LocaleInfo = require("./LocaleInfo.js");

var IDate = require("./IDate.js");
var DateFactory = require("./DateFactory.js");
var Calendar = require("./Calendar.js");
var CalendarFactory = require("./CalendarFactory.js");

var IString = require("./IString.js");
var ResBundle = require("./ResBundle.js");
var TimeZone = require("./TimeZone.js");
var GregorianCal = require("./GregorianCal.js");

/**
 * @class
 * Create a new date formatter instance. The date formatter is immutable once
 * it is created, but can format as many different dates as needed with the same
 * options. Create different date formatter instances for different purposes
 * and then keep them cached for use later if you have more than one date to
 * format.<p>
 * 
 * The options may contain any of the following properties:
 * 
 * <ul>
 * <li><i>locale</i> - locale to use when formatting the date/time. If the locale is
 * not specified, then the default locale of the app or web page will be used.
 * 
 * <li><i>calendar</i> - the type of calendar to use for this format. The value should
 * be a sting containing the name of the calendar. Currently, the supported
 * types are "gregorian", "julian", "arabic", "hebrew", or "chinese". If the
 * calendar is not specified, then the default calendar for the locale is used. When the
 * calendar type is specified, then the format method must be called with an instance of
 * the appropriate date type. (eg. Gregorian calendar means that the format method must 
 * be called with a GregDate instance.)
 *  
 * <li><i>timezone</i> - time zone to use when formatting times. This may be a time zone
 * instance or a time zone specifier from the IANA list of time zone database names 
 * (eg. "America/Los_Angeles"), 
 * the string "local", or a string specifying the offset in RFC 822 format. The IANA
 * list of time zone names can be viewed at 
 * <a href="http://en.wikipedia.org/wiki/List_of_tz_database_time_zones">this page</a>.
 * If the time zone is given as "local", the offset from UTC as given by
 * the Javascript system is used. If the offset is given as an RFC 822 style offset
 * specifier, it will parse that string and use the resulting offset. If the time zone
 * is not specified, the
 * default time zone for the locale is used. If both the date object and this formatter
 * instance contain time zones and those time zones are different from each other, the 
 * formatter will calculate the offset between the time zones and subtract it from the 
 * date before formatting the result for the current time zone. The theory is that a date
 * object that contains a time zone specifies a specific instant in time that is valid
 * around the world, whereas a date object without one is a local time and can only be
 * used for doing things in the local time zone of the user.
 * 
 * <li><i>type</i> - Specify whether this formatter should format times only, dates only, or
 * both times and dates together. Valid values are "time", "date", and "datetime". Note that
 * in some locales, the standard format uses the order "time followed by date" and in others, 
 * the order is exactly opposite, so it is better to create a single "datetime" formatter 
 * than it is to create a time formatter and a date formatter separately and concatenate the 
 * results. A "datetime" formatter will get the order correct for the locale.<p>
 * 
 * The default type if none is specified in with the type option is "date".
 * 
 * <li><i>length</i> - Specify the length of the format to use. The length is the approximate size of the 
 * formatted string.
 * 
 * <ul>
 * <li><i>short</i> - use a short representation of the time. This is the most compact format possible for the locale.
 * <li><i>medium</i> - use a medium length representation of the time. This is a slightly longer format.
 * <li><i>long</i> - use a long representation of the time. This is a fully specified format, but some of the textual 
 * components may still be abbreviated
 * <li><i>full</i> - use a full representation of the time. This is a fully specified format where all the textual 
 * components are spelled out completely
 * </ul>
 * 
 * eg. The "short" format for an en_US date may be "MM/dd/yy", whereas the long format might be "d MMM, yyyy". In the long
 * format, the month name is textual instead of numeric and is longer, the year is 4 digits instead of 2, and the format 
 * contains slightly more spaces and formatting characters.<p>
 * 
 * Note that the length parameter does not specify which components are to be formatted. Use the "date" and the "time"
 * properties to specify the components. Also, very few of the components of a time format differ according to the length,
 * so this property has little to no affect on time formatting.
 * 
 * <li><i>date</i> - This property tells
 * which components of a date format to use. For example,
 * sometimes you may wish to format a date that only contains the month and date
 * without the year, such as when displaying a person's yearly birthday. The value
 * of this property allows you to specify only those components you want to see in the
 * final output, ordered correctly for the locale. <p>
 * 
 * Valid values are:
 * 
 * <ul>
 * <li><i>dmwy</i> - format all components, weekday, date, month, and year
 * <li><i>dmy</i> - format only date, month, and year
 * <li><i>dmw</i> - format only weekday, date, and month
 * <li><i>dm</i> - format only date and month
 * <li><i>my</i> - format only month and year
 * <li><i>dw</i> - format only the weekday and date
 * <li><i>d</i> - format only the date
 * <li><i>m</i> - format only the month, in numbers for shorter lengths, and letters for 
 * longer lengths
 * <li><i>n</i> - format only the month, in letters only for all lengths
 * <li><i>y</i> - format only the year
 * </ul>
 * Default components, if this property is not specified, is "dmy". This property may be specified
 * but has no affect if the current formatter is for times only.
 * 
 * <li><i>time</i> - This property gives which components of a time format to use. The time will be formatted 
 * correctly for the locale with only the time components requested. For example, a clock might only display 
 * the hour and minute and not need the seconds or the am/pm component. In this case, the time property should be set 
 * to "hm". <p>
 * 
 * Valid values for this property are:
 * 
 * <ul>
 * <li><i>ahmsz</i> - format the hours, minutes, seconds, am/pm (if using a 12 hour clock), and the time zone
 * <li><i>ahms</i> - format the hours, minutes, seconds, and am/pm (if using a 12 hour clock)
 * <li><i>hmsz</i> - format the hours, minutes, seconds, and the time zone
 * <li><i>hms</i> - format the hours, minutes, and seconds
 * <li><i>ahmz</i> - format the hours, minutes, am/pm (if using a 12 hour clock), and the time zone
 * <li><i>ahm</i> - format the hours, minutes, and am/pm (if using a 12 hour clock)
 * <li><i>hmz</i> - format the hours, minutes, and the time zone
 * <li><i>ah</i> - format only the hours and am/pm if using a 12 hour clock
 * <li><i>hm</i> - format only the hours and minutes
 * <li><i>ms</i> - format only the minutes and seconds
 * <li><i>h</i> - format only the hours
 * <li><i>m</i> - format only the minutes
 * <li><i>s</i> - format only the seconds
 * </ul>
 * 
 * If you want to format a length of time instead of a particular instant
 * in time, use the duration formatter object (DurationFmt) instead because this
 * formatter is geared towards instants. A date formatter will make sure that each component of the 
 * time is within the normal range
 * for that component. That is, the minutes will always be between 0 and 59, no matter
 * what is specified in the date to format. A duration format will allow the number
 * of minutes to exceed 59 if, for example, you were displaying the length of
 * a movie of 198 minutes.<p>
 * 
 * Default value if this property is not specified is "hma".
 * 
 * <li><i>clock</i> - specify that the time formatter should use a 12 or 24 hour clock. 
 * Valid values are "12" and "24".<p>
 * 
 * In some locales, both clocks are used. For example, in en_US, the general populace uses
 * a 12 hour clock with am/pm, but in the US military or in nautical or aeronautical or 
 * scientific writing, it is more common to use a 24 hour clock. This property allows you to
 * construct a formatter that overrides the default for the locale.<p>
 * 
 * If this property is not specified, the default is to use the most widely used convention
 * for the locale.
 *  
 * <li><i>template</i> - use the given template string as a fixed format when formatting 
 * the date/time. Valid codes to use in a template string are as follows:
 * 
 * <ul>
 * <li><i>a</i> - am/pm marker
 * <li><i>d</i> - 1 or 2 digit date of month, not padded
 * <li><i>dd</i> - 1 or 2 digit date of month, 0 padded to 2 digits
 * <li><i>O</i> - ordinal representation of the date of month (eg. "1st", "2nd", etc.)
 * <li><i>D</i> - 1 to 3 digit day of year
 * <li><i>DD</i> - 1 to 3 digit day of year, 0 padded to 2 digits
 * <li><i>DDD</i> - 1 to 3 digit day of year, 0 padded to 3 digits
 * <li><i>M</i> - 1 or 2 digit month number, not padded
 * <li><i>MM</i> - 1 or 2 digit month number, 0 padded to 2 digits
 * <li><i>N</i> - 1 character month name abbreviation
 * <li><i>NN</i> - 2 character month name abbreviation
 * <li><i>MMM</i> - 3 character month month name abbreviation
 * <li><i>MMMM</i> - fully spelled out month name
 * <li><i>yy</i> - 2 digit year
 * <li><i>yyyy</i> - 4 digit year
 * <li><i>E</i> - day-of-week name, abbreviated to a single character
 * <li><i>EE</i> - day-of-week name, abbreviated to a max of 2 characters
 * <li><i>EEE</i> - day-of-week name, abbreviated to a max of 3 characters
 * <li><i>EEEE</i> - day-of-week name fully spelled out 
 * <li><i>G</i> - era designator
 * <li><i>w</i> - week number in year
 * <li><i>ww</i> - week number in year, 0 padded to 2 digits
 * <li><i>W</i> - week in month
 * <li><i>h</i> - hour (12 followed by 1 to 11)
 * <li><i>hh</i> - hour (12, followed by 1 to 11), 0 padded to 2 digits
 * <li><i>k</i> - hour (1 to 24)
 * <li><i>kk</i> - hour (1 to 24), 0 padded to 2 digits
 * <li><i>H</i> - hour (0 to 23)
 * <li><i>HH</i> - hour (0 to 23), 0 padded to 2 digits
 * <li><i>K</i> - hour (0 to 11)
 * <li><i>KK</i> - hour (0 to 11), 0 padded to 2 digits
 * <li><i>m</i> - minute in hour
 * <li><i>mm</i> - minute in hour, 0 padded to 2 digits
 * <li><i>s</i> - second in minute
 * <li><i>ss</i> - second in minute, 0 padded to 2 digits
 * <li><i>S</i> - millisecond (1 to 3 digits)
 * <li><i>SSS</i> - millisecond, 0 padded to 3 digits
 * <li><i>z</i> - general time zone
 * <li><i>Z</i> - RFC 822 time zone
 * </ul>
 * 
 * <li><i>useNative</i> - the flag used to determine whether to use the native script settings 
 * for formatting the numbers.
 *
 * <li><i>meridiems</i> - string that specifies what style of meridiems to use with this 
 * format. The choices are "default", "gregorian", "ethiopic", and "chinese". The "default" 
 * style is often the simple Gregorian AM/PM, but the actual style is chosen by the locale. 
 * (For almost all locales, the Gregorian AM/PM style is most frequently used.)
 * The "ethiopic" style uses 5 different meridiems for "morning", "noon", "afternoon", 
 * "evening", and "night". The "chinese" style uses 7 different meridiems corresponding 
 * to the various parts of the day. N.B. Even for the Chinese locales, the default is "gregorian"
 * when formatting dates in the Gregorian calendar.
 *
 * <li><i>onLoad</i> - a callback function to call when the date format object is fully 
 * loaded. When the onLoad option is given, the DateFmt object will attempt to
 * load any missing locale data using the ilib loader callback.
 * When the constructor is done (even if the data is already preassembled), the 
 * onLoad function is called with the current instance as a parameter, so this
 * callback can be used with preassembled or dynamic loading or a mix of the two.
 * 
 * <li><i>sync</i> - tell whether to load any missing locale data synchronously or 
 * asynchronously. If this option is given as "false", then the "onLoad"
 * callback must be given, as the instance returned from this constructor will
 * not be usable for a while.
 *  
 * <li><i>loadParams</i> - an object containing parameters to pass to the 
 * loader callback function when locale data is missing. The parameters are not
 * interpretted or modified in any way. They are simply passed along. The object 
 * may contain any property/value pairs as long as the calling code is in
 * agreement with the loader callback function as to what those parameters mean.
 * </ul>
 * 
 * Any substring containing letters within single or double quotes will be used 
 * as-is in the final output and will not be interpretted for codes as above.<p>
 * 
 * Example: a date format in Spanish might be given as: "'El' d. 'de' MMMM", where
 * the 'El' and the 'de' are left as-is in the output because they are quoted. Typical 
 * output for this example template might be, "El 5. de Mayo".
 * 
 * The following options will be used when formatting a date/time with an explicit
 * template:
 * 
 * <ul>
 * <li>locale - the locale is only used for 
 * translations of things like month names or day-of-week names.
 * <li>calendar - used to translate a date instance into date/time component values 
 * that can be formatted into the template
 * <li>timezone - used to figure out the offset to add or subtract from the time to
 * get the final time component values
 * <li>clock - used to figure out whether to format times with a 12 or 24 hour clock.
 * If this option is specified, it will override the hours portion of a time format.
 * That is, "hh" is switched with "HH" and "kk" is switched with "KK" as appropriate. 
 * If this option is not specified, the 12/24 code in the template will dictate whether 
 * to use the 12 or 24 clock, and the 12/24 default in the locale will be ignored.
 * </ul>
 * 
 * All other options will be ignored and their corresponding getter methods will
 * return the empty string.<p>
 * 
 * 
 * @constructor
 * @param {Object} options options governing the way this date formatter instance works
 */
var DateFmt = function(options) {
	var arr, i, bad, 
		sync = true, 
		loadParams = undefined;
	
	this.locale = new Locale();
	this.type = "date";
	this.length = "s";
	this.dateComponents = "dmy";
	this.timeComponents = "ahm";
	this.meridiems = "default";
	
	if (options) {
		if (options.locale) {
			this.locale = (typeof(options.locale) === 'string') ? new Locale(options.locale) : options.locale;
		}
		
		if (options.type) {
			if (options.type === 'date' || options.type === 'time' || options.type === 'datetime') {
				this.type = options.type;
			}
		}
		
		if (options.calendar) {
			this.calName = options.calendar;
		}
		
		if (options.length) {
			if (options.length === 'short' ||
				options.length === 'medium' ||
				options.length === 'long' ||
				options.length === 'full') {
				// only use the first char to save space in the json files
				this.length = options.length.charAt(0);
			}
		}
		
		if (options.date) {
			arr = options.date.split("");
			arr.sort(function (left, right) {
				return (left < right) ? -1 : ((right < left) ? 1 : 0);
			});
			bad = false;
			for (i = 0; i < arr.length; i++) {
				if (arr[i] !== 'd' && arr[i] !== 'm' && arr[i] !== 'y' && arr[i] !== 'w' && arr[i] !== 'n') {
					bad = true;
					break;
				}
			}
			if (!bad) {
				this.dateComponents = arr.join("");
			}
		}

		if (options.time) {
			arr = options.time.split("");
			arr.sort(function (left, right) {
				return (left < right) ? -1 : ((right < left) ? 1 : 0);
			});
			this.badTime = false;
			for (i = 0; i < arr.length; i++) {
				if (arr[i] !== 'h' && arr[i] !== 'm' && arr[i] !== 's' && arr[i] !== 'a' && arr[i] !== 'z') {
					this.badTime = true;
					break;
				}
			}
			if (!this.badTime) {
				this.timeComponents = arr.join("");
			}
		}
		
		if (options.clock && (options.clock === '12' || options.clock === '24')) {
			this.clock = options.clock;
		}
		
		if (options.template) {
			// many options are not useful when specifying the template directly, so zero
			// them out.
			this.type = "";
			this.length = "";
			this.dateComponents = "";
			this.timeComponents = "";
			
			this.template = options.template;
		}
		
		if (options.timezone) {
			if (options.timezone instanceof TimeZone) {
				this.tz = options.timezone;
			} else {
				this.tz = new TimeZone({
					locale: this.locale, 
					id: options.timezone
				});
			}
		} else if (options.locale) {
			// if an explicit locale was given, then get the time zone for that locale
			this.tz = new TimeZone({
				locale: this.locale
			});
		} // else just assume time zone "local"
		
		if (typeof(options.useNative) === 'boolean') {
			this.useNative = options.useNative;
		}
		
		if (typeof(options.meridiems) !== 'undefined' && 
				(options.meridiems === "chinese" || 
				 options.meridiems === "gregorian" || 
				 options.meridiems === "ethiopic")) {
			this.meridiems = options.meridiems;
		}
		
		if (typeof(options.sync) !== 'undefined') {
			sync = (options.sync === true);
		}
		
		loadParams = options.loadParams;
	}

	if (!DateFmt.cache) {
		DateFmt.cache = {};
	}

	new LocaleInfo(this.locale, {
		sync: sync,
		loadParams: loadParams, 
		onLoad: ilib.bind(this, function (li) {
			this.locinfo = li;
			
			// get the default calendar name from the locale, and if the locale doesn't define
			// one, use the hard-coded gregorian as the last resort
			this.calName = this.calName || this.locinfo.getCalendar() || "gregorian";
			if (ilib.isDynCode()) {
				// If we are running in the dynamic code loading assembly of ilib, the following
				// will attempt to dynamically load the calendar date class for this calendar. If 
				// it doesn't work, this just goes on and it will use Gregorian instead.
				DateFactory._dynLoadDate(this.calName);
			}
			
			this.cal = CalendarFactory({
				type: this.calName
			});
			if (!this.cal) {
				this.cal = new GregorianCal();
			}
			if (this.meridiems === "default") {
				this.meridiems = li.getMeridiemsStyle();
			}

			/*
			if (this.timeComponents &&
					(this.clock === '24' || 
					(!this.clock && this.locinfo.getClock() === "24"))) {
				// make sure we don't have am/pm in 24 hour mode unless the user specifically
				// requested it in the time component option
				this.timeComponents = this.timeComponents.replace("a", "");
			}
			*/

			// load the strings used to translate the components
			new ResBundle({
				locale: this.locale,
				name: "sysres",
				sync: sync,
				loadParams: loadParams, 
				onLoad: ilib.bind(this, function (rb) {
					this.sysres = rb;
					
					if (!this.template) {
						Utils.loadData({
							object: DateFmt, 
							locale: this.locale, 
							name: "dateformats.json", 
							sync: sync, 
							loadParams: loadParams, 
							callback: ilib.bind(this, function (formats) {
								if (!formats) {
									formats = ilib.data.dateformats || DateFmt.defaultFmt;
									var spec = this.locale.getSpec().replace(/-/g, '_');
									DateFmt.cache[spec] = formats;
								}
								if (typeof(this.clock) === 'undefined') {
									// default to the locale instead
									this.clock = this.locinfo.getClock();
								}
								this._initTemplate(formats);
								this._massageTemplate();
								if (options && typeof(options.onLoad) === 'function') {
									options.onLoad(this);
								}
							})
						});
					} else {
						this._massageTemplate();
						if (options && typeof(options.onLoad) === 'function') {
							options.onLoad(this);
						}
					}
				})
			});	
		})
	});
};

// used in getLength
DateFmt.lenmap = {
	"s": "short",
	"m": "medium",
	"l": "long",
	"f": "full"
};

DateFmt.zeros = "0000";

DateFmt.defaultFmt = {
	"gregorian": {
		"order": "{date} {time}",
		"date": {
			"dmwy": "EEE d/MM/yyyy",
			"dmy": "d/MM/yyyy",
			"dmw": "EEE d/MM",
			"dm": "d/MM",
			"my": "MM/yyyy",
			"dw": "EEE d",
			"d": "dd",
			"m": "MM",
			"y": "yyyy",
			"n": "NN",
			"w": "EEE"
		},
		"time": {
			"12": "h:mm:ssa",
			"24": "H:mm:ss"
		},
		"range": {
			"c00": "{st} - {et}, {sd}/{sm}/{sy}",
			"c01": "{sd}/{sm} {st} - {ed}/{em} {et}, {sy}",
			"c02": "{sd}/{sm} {st} - {ed}/{em} {et}, {sy}",
			"c03": "{sd}/{sm}/{sy} {st} - {ed}/{em}/{ey} {et}",
			"c10": "{sd}-{ed}/{sm}/{sy}",
			"c11": "{sd}/{sm} - {ed}/{em} {sy}",
			"c12": "{sd}/{sm}/{sy} - {ed}/{em}/{ey}",
			"c20": "{sm}/{sy} - {em}/{ey}",
			"c30": "{sy} - {ey}"
		}
	},
	"islamic": "gregorian",
	"hebrew": "gregorian",
	"julian": "gregorian",
	"buddhist": "gregorian",
	"persian": "gregorian",
	"persian-algo": "gregorian",
	"han": "gregorian"
};

/**
* @static
* @private
*/
DateFmt.monthNameLenMap = {
	"short" : "N",
	"medium": "NN",
	"long":   "MMM",
	"full":   "MMMM"
};

/**
* @static
* @private
*/
DateFmt.weekDayLenMap = {
	"short" : "E",
	"medium": "EE",
	"long":   "EEE",
	"full":   "EEEE"
};

/**
 * Return the range of possible meridiems (times of day like "AM" or 
 * "PM") in this date formatter.<p>
 *
 * The options may contain any of the following properties:
 *
 * <ul>
 * <li><i>locale</i> - locale to use when formatting the date/time. If the locale is
 * not specified, then the default locale of the app or web page will be used.
 * 
 * <li><i>meridiems</i> - string that specifies what style of meridiems to use with this 
 * format. The choices are "default", "gregorian", "ethiopic", and "chinese". The "default" 
 * style is often the simple Gregorian AM/PM, but the actual style is chosen by the locale. 
 * (For almost all locales, the Gregorian AM/PM style is most frequently used.)
 * The "ethiopic" style uses 5 different meridiems for "morning", "noon", "afternoon", 
 * "evening", and "night". The "chinese" style uses 7 different meridiems corresponding 
 * to the various parts of the day. N.B. Even for the Chinese locales, the default is "gregorian"
 * when formatting dates in the Gregorian calendar.
 * </ul>
 *
 * @static
 * @public
 * @param {Object} options options governing the way this date formatter instance works for getting meridiems range
 * @return {Array.<{name:string,start:string,end:string}>}
 */
DateFmt.getMeridiemsRange = function (options) {
	options = options || {};
	var args = {};
	if (options.locale) {
		args.locale = options.locale;
	}

	if (options.meridiems) {
		args.meridiems = options.meridiems;
	}

	var fmt = new DateFmt(args);

	return fmt.getMeridiemsRange();
};

DateFmt.prototype = {
	/**
	 * @protected
	 */
	_initTemplate: function (formats) {
		if (formats[this.calName]) {
			/** 
			 * @private
			 * @type {{order:(string|{s:string,m:string,l:string,f:string}),date:Object.<string, (string|{s:string,m:string,l:string,f:string})>,time:Object.<string,(string|{s:string,m:string,l:string,f:string})>,range:Object.<string, (string|{s:string,m:string,l:string,f:string})>}}
			 */
			this.formats = formats[this.calName];
			if (typeof(this.formats) === "string") {
				// alias to another calendar type
				this.formats = formats[this.formats];
			}
			
			this.template = "";
			
			switch (this.type) {
				case "datetime":
					this.template = (this.formats && this._getLengthFormat(this.formats.order, this.length)) || "{date} {time}";
					this.template = this.template.replace("{date}", this._getFormat(this.formats.date, this.dateComponents, this.length) || "");
					this.template = this.template.replace("{time}", this._getFormat(this.formats.time[this.clock], this.timeComponents, this.length) || "");
					break;
				case "date":
					this.template = this._getFormat(this.formats.date, this.dateComponents, this.length);
					break;
				case "time":
					this.template = this._getFormat(this.formats.time[this.clock], this.timeComponents, this.length);
					break;
			}
		} else {
			throw "No formats available for calendar " + this.calName + " in locale " + this.locale.toString();
		}
	},
	
	/**
	 * @protected
	 */
	_massageTemplate: function () {
		var i;
		
		if (this.clock && this.template) {
			// explicitly set the hours to the requested type
			var temp = "";
			switch (this.clock) {
				case "24":
					for (i = 0; i < this.template.length; i++) {
						if (this.template.charAt(i) == "'") {
							temp += this.template.charAt(i++);
							while (i < this.template.length && this.template.charAt(i) !== "'") {
								temp += this.template.charAt(i++);
							}
							if (i < this.template.length) {
								temp += this.template.charAt(i);
							}
						} else if (this.template.charAt(i) == 'K') {
							temp += 'k';
						} else if (this.template.charAt(i) == 'h') {
							temp += 'H';
						} else {
							temp += this.template.charAt(i);
						}
					}
					this.template = temp;
					break;
				case "12":
					for (i = 0; i < this.template.length; i++) {
						if (this.template.charAt(i) == "'") {
							temp += this.template.charAt(i++);
							while (i < this.template.length && this.template.charAt(i) !== "'") {
								temp += this.template.charAt(i++);
							}
							if (i < this.template.length) {
								temp += this.template.charAt(i);
							}
						} else if (this.template.charAt(i) == 'k') {
							temp += 'K';
						} else if (this.template.charAt(i) == 'H') {
							temp += 'h';
						} else {
							temp += this.template.charAt(i);
						}
					}
					this.template = temp;
					break;
			}
		}
		
		// tokenize it now for easy formatting
		this.templateArr = this._tokenize(this.template);

		var digits;
		// set up the mapping to native or alternate digits if necessary
		if (typeof(this.useNative) === "boolean") {
			if (this.useNative) {
				digits = this.locinfo.getNativeDigits();
				if (digits) {
					this.digits = digits;
				}
			}
		} else if (this.locinfo.getDigitsStyle() === "native") {
			digits = this.locinfo.getNativeDigits();
			if (digits) {
				this.useNative = true;
				this.digits = digits;
			}
		}
	},
    
	/**
	 * Convert the template into an array of date components separated by formatting chars.
	 * @protected
	 * @param {string} template Format template to tokenize into components
	 * @return {Array.<string>} a tokenized array of date format components
	 */
	_tokenize: function (template) {
		var i = 0, start, ch, letter, arr = [];
		
		// console.log("_tokenize: tokenizing template " + template);
		if (template) {
			while (i < template.length) {
				ch = template.charAt(i);
				start = i;
				if (ch === "'") {
					// console.log("found quoted string");
					i++;
					// escaped string - push as-is, then dequote later
					while (i < template.length && template.charAt(i) !== "'") {
						i++;
					}
					if (i < template.length) {
						i++;	// grab the other quote too
					}
				} else if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
					letter = template.charAt(i);
					// console.log("found letters " + letter);
					while (i < template.length && ch === letter) {
						ch = template.charAt(++i);
					}
				} else {
					// console.log("found other");
					while (i < template.length && ch !== "'" && (ch < 'a' || ch > 'z') && (ch < 'A' || ch > 'Z')) {
						ch = template.charAt(++i);
					}
				}
				arr.push(template.substring(start,i));
				// console.log("start is " + start + " i is " + i + " and substr is " + template.substring(start,i));
			}
		}
		return arr;
	},
                          
	/**
	 * @protected
	 * @param {Object.<string, (string|{s:string,m:string,l:string,f:string})>} obj Object to search
	 * @param {string} components Format components to search
	 * @param {string} length Length of the requested format
	 * @return {string|undefined} the requested format
	 */
	_getFormat: function getFormat(obj, components, length) {
		if (typeof(components) !== 'undefined' && obj && obj[components]) {
			return this._getLengthFormat(obj[components], length);
		}
		return undefined;
	},

	/**
	 * @protected
	 * @param {(string|{s:string,m:string,l:string,f:string})} obj Object to search
	 * @param {string} length Length of the requested format
	 * @return {(string|undefined)} the requested format
	 */
	_getLengthFormat: function getLengthFormat(obj, length) {
		if (typeof(obj) === 'string') {
			return obj;
		} else if (obj[length]) {
			return obj[length];
		}
		return undefined;
	},

	/**
	 * Return the locale used with this formatter instance.
	 * @return {Locale} the Locale instance for this formatter
	 */
	getLocale: function() {
		return this.locale;
	},
	
	/**
	 * Return the template string that is used to format date/times for this
	 * formatter instance. This will work, even when the template property is not explicitly 
	 * given in the options to the constructor. Without the template option, the constructor 
	 * will build the appropriate template according to the options and use that template
	 * in the format method. 
	 * 
	 * @return {string} the format template for this formatter
	 */
	getTemplate: function() {
		return this.template;
	},
	
	/**
	 * Return the type of this formatter. The type is a string that has one of the following
	 * values: "time", "date", "datetime".
	 * @return {string} the type of the formatter
	 */
	getType: function() {
		return this.type;
	},
	
	/**
	 * Return the name of the calendar used to format date/times for this
	 * formatter instance.
	 * @return {string} the name of the calendar used by this formatter
	 */
	getCalendar: function () {
		return this.cal.getType();
	},
	
	/**
	 * Return the length used to format date/times in this formatter. This is either the
	 * value of the length option to the constructor, or the default value.
	 * 
	 * @return {string} the length of formats this formatter returns
	 */
	getLength: function () {
		return DateFmt.lenmap[this.length] || "";
	},
	
	/**
	 * Return the date components that this formatter formats. This is either the 
	 * value of the date option to the constructor, or the default value. If this
	 * formatter is a time-only formatter, this method will return the empty 
	 * string. The date component letters may be specified in any order in the 
	 * constructor, but this method will reorder the given components to a standard 
	 * order.
	 * 
	 * @return {string} the date components that this formatter formats
	 */
	getDateComponents: function () {
		return this.dateComponents || "";
	},

	/**
	 * Return the time components that this formatter formats. This is either the 
	 * value of the time option to the constructor, or the default value. If this
	 * formatter is a date-only formatter, this method will return the empty 
	 * string. The time component letters may be specified in any order in the 
	 * constructor, but this method will reorder the given components to a standard 
	 * order.
	 * 
	 * @return {string} the time components that this formatter formats
	 */
	getTimeComponents: function () {
		return this.timeComponents || "";
	},

	/**
	 * Return the time zone used to format date/times for this formatter
	 * instance.
	 * @return a string naming the time zone
	 */
	getTimeZone: function () {
		// Lazy load the time zone. If it wasn't explicitly set up before, set 
		// it up now, but use the 
		// default TZ for the locale. This way, if the caller never uses the
		// time zone in their format, we never have to load up a TimeZone
		// instance into this formatter.
		if (!this.tz) {
			this.tz = new TimeZone({id: ilib.getTimeZone()});
		}
		return this.tz;
	},
	/**
	 * Return the clock option set in the constructor. If the clock option was
	 * not given, the default from the locale is returned instead.
	 * @return {string} "12" or "24" depending on whether this formatter uses
	 * the 12-hour or 24-hour clock
	 */
	getClock: function () {
		return this.clock || this.locinfo.getClock();
	},
	/**
	 * Return the meridiems range in current locale. 
	 * @return {Array.<{name:string,start:string,end:string}>} the range of available meridiems
	 */
	getMeridiemsRange: function () {
		var result;
		var _getSysString = function (key) {
			return (this.sysres.getString(undefined, key + "-" + this.calName) || this.sysres.getString(undefined, key)).toString();
		};

		switch (this.meridiems) {
		case "chinese":
			result = [
				{
					name: _getSysString.call(this, "azh0"),
					start: "00:00",
					end: "05:59"
				},
				{
					name: _getSysString.call(this, "azh1"),
					start: "06:00",
					end: "08:59"
				},
				{
					name: _getSysString.call(this, "azh2"),
					start: "09:00",
					end: "11:59"
				},
				{
					name: _getSysString.call(this, "azh3"),
					start: "12:00",
					end: "12:59"
				},
				{
					name: _getSysString.call(this, "azh4"),
					start: "13:00",
					end: "17:59"
				},
				{
					name: _getSysString.call(this, "azh5"),
					start: "18:00",
					end: "20:59"
				},
				{
					name: _getSysString.call(this, "azh6"),
					start: "21:00",
					end: "23:59"
				}
			];
			break;
		case "ethiopic":
			result = [
				{
					name: _getSysString.call(this, "a0-ethiopic"),
					start: "00:00",
					end: "05:59"
				},
				{
					name: _getSysString.call(this, "a1-ethiopic"),
					start: "06:00",
					end: "06:00"
				},
				{
					name: _getSysString.call(this, "a2-ethiopic"),
					start: "06:01",
					end: "11:59"
				},
				{
					name: _getSysString.call(this, "a3-ethiopic"),
					start: "12:00",
					end: "17:59"
				},
				{
					name: _getSysString.call(this, "a4-ethiopic"),
					start: "18:00",
					end: "23:59"
				}
			];
			break;
		default:
			result = [
				{
					name: _getSysString.call(this, "a0"),
					start: "00:00",
					end: "11:59"
				},
				{
					name: _getSysString.call(this, "a1"),
					start: "12:00",
					end: "23:59"
				}
			];
			break;
		}

		return result;
	},
	
	/**
	 * @private
	 */
	_getTemplate: function (prefix, calendar) {
		if (calendar !== "gregorian") {
			return prefix + "-" + calendar;
		}
		return prefix;
	},

	/**
	 * Returns an array of the months of the year, formatted to the optional length specified.
	 * i.e. ...getMonthsOfYear() OR ...getMonthsOfYear({length: "short"})
	 * <p>
	 * The options parameter may contain any of the following properties:
	 * 
	 * <ul>
	 * <li><i>length</i> - length of the names of the months being sought. This may be one of
	 * "short", "medium", "long", or "full"
	 * <li><i>date</i> - retrieve the names of the months in the date of the given date
	 * <li><i>year</i> - retrieve the names of the months in the given year. In some calendars,
	 * the months have different names depending if that year is a leap year or not.
	 * </ul>
	 * 
	 * @param  {Object=} options an object-literal that contains any of the above properties
	 * @return {Array} an array of the names of all of the months of the year in the current calendar
	 */
	getMonthsOfYear: function(options) {
		var length = (options && options.length) || this.getLength(),
			template = DateFmt.monthNameLenMap[length],
			months = [undefined],
			date,
			monthCount;
		
		if (options) {
			if (options.date) {
				date = DateFactory._dateToIlib(options.date); 	
			}
			
			if (options.year) {
				date = DateFactory({year: options.year, month: 1, day: 1, type: this.cal.getType()});
			}
		}
		
		if (!date) {
			date = DateFactory({
				calendar: this.cal.getType()
			});
		}

		monthCount = this.cal.getNumMonths(date.getYears());
		for (var i = 1; i <= monthCount; i++) {
			months[i] = this.sysres.getString(this._getTemplate(template + i, this.cal.getType())).toString();
		}
		return months;
	},

	/**
	 * Returns an array of the days of the week, formatted to the optional length specified.
	 * i.e. ...getDaysOfWeek() OR ...getDaysOfWeek({length: "short"})
	 * <p>
	 * The options parameter may contain any of the following properties:
	 * 
	 * <ul>
	 * <li><i>length</i> - length of the names of the months being sought. This may be one of
	 * "short", "medium", "long", or "full"
	 * </ul>
	 * @param  {Object=} options an object-literal that contains one key 
	 *                   "length" with the standard length strings
	 * @return {Array} an array of all of the names of the days of the week
	 */
	getDaysOfWeek: function(options) {
		var length = (options && options.length) || this.getLength(),
			template = DateFmt.weekDayLenMap[length],
			days = [];
		for (var i = 0; i < 7; i++) {
			days[i] = this.sysres.getString(this._getTemplate(template + i, this.cal.getType())).toString();
		}
		return days;
	},

	
	/**
	 * Convert this formatter to a string representation by returning the
	 * format template. This method delegates to getTemplate.
	 * 
	 * @return {string} the format template
	 */
	toString: function() {
		return this.getTemplate();
	},
	
	/*
	 * @private
	 * Left pad the str to the given length of digits with zeros
	 * @param {string} str the string to pad
	 * @param {number} length the desired total length of the output string, padded 
	 */
	_pad: function (str, length) {
		if (typeof(str) !== 'string') {
			str = "" + str;
		}
		var start = 0;
		if (str.charAt(0) === '-') {
			start++;
		}
		return (str.length >= length+start) ? str : str.substring(0, start) + DateFmt.zeros.substring(0,length-str.length+start) + str.substring(start);
	},
	
	/*
	 * @private
	 * Format a date according to a sequence of components. 
	 * @param {IDate} date a date/time object to format
	 * @param {Array.<string>} templateArr an array of components to format
	 * @return {string} the formatted date
	 */
	_formatTemplate: function (date, templateArr) {
		var i, key, temp, tz, str = "";
		for (i = 0; i < templateArr.length; i++) {
			switch (templateArr[i]) {
				case 'd':
					str += (date.day || 1);
					break;
				case 'dd':
					str += this._pad(date.day || "1", 2);
					break;
				case 'yy':
					temp = "" + ((date.year || 0) % 100);
					str += this._pad(temp, 2);
					break;
				case 'yyyy':
					str += this._pad(date.year || "0", 4);
					break;
				case 'M':
					str += (date.month || 1);
					break;
				case 'MM':
					str += this._pad(date.month || "1", 2);
					break;
				case 'h':
					temp = (date.hour || 0) % 12;
					if (temp == 0) {
						temp = "12";
					}
					str += temp; 
					break;
				case 'hh':
					temp = (date.hour || 0) % 12;
					if (temp == 0) {
						temp = "12";
					}
					str += this._pad(temp, 2);
					break;
				/*
				case 'j':
					temp = (date.hour || 0) % 12 + 1;
					str += temp; 
					break;
				case 'jj':
					temp = (date.hour || 0) % 12 + 1;
					str += this._pad(temp, 2);
					break;
				*/
				case 'K':
					temp = (date.hour || 0) % 12;
					str += temp; 
					break;
				case 'KK':
					temp = (date.hour || 0) % 12;
					str += this._pad(temp, 2);
					break;

				case 'H':
					str += (date.hour || "0");
					break;
				case 'HH':
					str += this._pad(date.hour || "0", 2);
					break;
				case 'k':
					str += (date.hour == 0 ? "24" : date.hour);
					break;
				case 'kk':
					temp = (date.hour == 0 ? "24" : date.hour);
					str += this._pad(temp, 2);
					break;

				case 'm':
					str += (date.minute || "0");
					break;
				case 'mm':
					str += this._pad(date.minute || "0", 2);
					break;
				case 's':
					str += (date.minute || "0");
					break;
				case 'ss':
					str += this._pad(date.second || "0", 2);
					break;
				case 'S':
					str += (date.millisecond || "0");
					break;
				case 'SSS':
					str += this._pad(date.millisecond || "0", 3);
					break;

				case 'N':
				case 'NN':
				case 'MMM':
				case 'MMMM':
					key = templateArr[i] + (date.month || 1);
					str += (this.sysres.getString(undefined, key + "-" + this.calName) || this.sysres.getString(undefined, key));
					break;

				case 'E':
				case 'EE':
				case 'EEE':
				case 'EEEE':
					key = templateArr[i] + date.getDayOfWeek();
					//console.log("finding " + key + " in the resources");
					str += (this.sysres.getString(undefined, key + "-" + this.calName) || this.sysres.getString(undefined, key));
					break;
					
				case 'a':
					switch (this.meridiems) {
					case "chinese":
						if (date.hour < 6) {
							key = "azh0";	// before dawn
						} else if (date.hour < 9) {
							key = "azh1";	// morning
						} else if (date.hour < 12) {
							key = "azh2";	// late morning/day before noon
						} else if (date.hour < 13) {
							key = "azh3";	// noon hour/midday
						} else if (date.hour < 18) {
							key = "azh4";	// afternoon
						} else if (date.hour < 21) {
							key = "azh5";	// evening time/dusk
						} else {
							key = "azh6";	// night time
						}
						break;
					case "ethiopic":
						if (date.hour < 6) {
							key = "a0-ethiopic";	// morning
						} else if (date.hour === 6 && date.minute === 0) {
							key = "a1-ethiopic";	// noon
						} else if (date.hour >= 6 && date.hour < 12) {
							key = "a2-ethiopic";	// afternoon
						} else if (date.hour >= 12 && date.hour < 18) {
							key = "a3-ethiopic";	// evening
						} else if (date.hour >= 18) {
							key = "a4-ethiopic";	// night
						}
						break;
					default:
						key = date.hour < 12 ? "a0" : "a1";
						break;
					}
					//console.log("finding " + key + " in the resources");
					str += (this.sysres.getString(undefined, key + "-" + this.calName) || this.sysres.getString(undefined, key));
					break;
					
				case 'w':
					str += date.getWeekOfYear();
					break;
				case 'ww':
					str += this._pad(date.getWeekOfYear(), 2);
					break;

				case 'D':
					str += date.getDayOfYear();
					break;
				case 'DD':
					str += this._pad(date.getDayOfYear(), 2);
					break;
				case 'DDD':
					str += this._pad(date.getDayOfYear(), 3);
					break;
				case 'W':
					str += date.getWeekOfMonth(this.locale);
					break;

				case 'G':
					key = "G" + date.getEra();
					str += (this.sysres.getString(undefined, key + "-" + this.calName) || this.sysres.getString(undefined, key));
					break;

				case 'O':
					temp = this.sysres.getString("1#1st|2#2nd|3#3rd|21#21st|22#22nd|23#23rd|31#31st|#{num}th", "ordinalChoice");
					str += temp.formatChoice(date.day, {num: date.day});
					break;
					
				case 'z': // general time zone
					tz = this.getTimeZone(); // lazy-load the tz
					str += tz.getDisplayName(date, "standard");
					break;
				case 'Z': // RFC 822 time zone
					tz = this.getTimeZone(); // lazy-load the tz
					str += tz.getDisplayName(date, "rfc822");
					break;

				default:
					str += templateArr[i].replace(/'/g, "");
					break;
			}
		}

		if (this.digits) {
			str = JSUtils.mapString(str, this.digits);
		}
		return str;
	},
	
	/**
	 * Format a particular date instance according to the settings of this
	 * formatter object. The type of the date instance being formatted must 
	 * correspond exactly to the calendar type with which this formatter was 
	 * constructed. If the types are not compatible, this formatter will
	 * produce bogus results.
	 * 
	 * @param {IDate|Number|String|Date|JulianDay|null|undefined} dateLike a date-like object to format
	 * @return {string} the formatted version of the given date instance
	 */
	format: function (dateLike) {
		var thisZoneName = this.tz && this.tz.getId() || "local";

		var date = DateFactory._dateToIlib(dateLike, thisZoneName, this.locale);
		
		if (!date.getCalendar || !(date instanceof IDate)) {
			throw "Wrong date type passed to DateFmt.format()";
		}
		
		var dateZoneName = date.timezone || "local";
		
		// convert to the time zone of this formatter before formatting
		if (dateZoneName !== thisZoneName || date.getCalendar() !== this.calName) {
			// console.log("Differing time zones date: " + dateZoneName + " and fmt: " + thisZoneName + ". Converting...");
			// this will recalculate the date components based on the new time zone
			// and/or convert a date in another calendar to the current calendar before formatting it
			var newDate = DateFactory({
				type: this.calName,
				timezone: thisZoneName,
				julianday: date.getJulianDay()
			});
			
			date = newDate;
		}
		return this._formatTemplate(date, this.templateArr);
	},
	
	/**
	 * Return a string that describes a date relative to the given 
	 * reference date. The string returned is text that for the locale that
	 * was specified when the formatter instance was constructed.<p>
	 * 
	 * The date can be in the future relative to the reference date or in
	 * the past, and the formatter will generate the appropriate string.<p>
	 * 
	 * The text used to describe the relative reference depends on the length
	 * of time between the date and the reference. If the time was in the
	 * past, it will use the "ago" phrase, and in the future, it will use
	 * the "in" phrase. Examples:<p>
	 * 
	 * <ul>
	 * <li>within a minute: either "X seconds ago" or "in X seconds"
	 * <li>within an hour: either "X minutes ago" or "in X minutes"
	 * <li>within a day: either "X hours ago" or "in X hours"
	 * <li>within 2 weeks: either "X days ago" or "in X days"
	 * <li>within 12 weeks (~3 months): either "X weeks ago" or "in X weeks"
	 * <li>within two years: either "X months ago" or "in X months"
	 * <li>longer than 2 years: "X years ago" or "in X years"
	 * </ul>
	 * 
	 * @param {IDate|Number|String|Date|JulianDay|null|undefined} reference a date that the date parameter should be relative to
	 * @param {IDate|Number|String|Date|JulianDay|null|undefined} date a date being formatted
	 * @throws "Wrong calendar type" when the start or end dates are not the same
	 * calendar type as the formatter itself
	 * @return {string} the formatted relative date
	 */
	formatRelative: function(reference, date) {
		reference = DateFactory._dateToIlib(reference);
		date = DateFactory._dateToIlib(date);
		
		var referenceRd, dateRd, fmt, time, diff, num;
		
		if (typeof(reference) !== 'object' || !reference.getCalendar || reference.getCalendar() !== this.calName ||
			typeof(date) !== 'object' || !date.getCalendar || date.getCalendar() !== this.calName) {
			throw "Wrong calendar type";
		}
		
		referenceRd = reference.getRataDie();
		dateRd = date.getRataDie();
		
		if (dateRd < referenceRd) {
			diff = referenceRd - dateRd;
			fmt = this.sysres.getString("{duration} ago");
		} else {
			diff = dateRd - referenceRd;
			fmt = this.sysres.getString("in {duration}");
		}
		
		if (diff < 0.000694444) {
			num = Math.round(diff * 86400);
			switch (this.length) {
				case 's':
					time = this.sysres.getString("#{num}s");
					break;
				case 'm':
					time = this.sysres.getString("1#1 se|#{num} sec");
					break;
				case 'l':
					time = this.sysres.getString("1#1 sec|#{num} sec");
					break;
				default:
				case 'f':
					time = this.sysres.getString("1#1 second|#{num} seconds");
					break;
			}
		} else if (diff < 0.041666667) {
			num = Math.round(diff * 1440);
			switch (this.length) {
				case 's':
					time = this.sysres.getString("#{num}m", "durationShortMinutes");
					break;
				case 'm':
					time = this.sysres.getString("1#1 mi|#{num} min");
					break;
				case 'l':
					time = this.sysres.getString("1#1 min|#{num} min");
					break;
				default:
				case 'f':
					time = this.sysres.getString("1#1 minute|#{num} minutes");
					break;
			}
		} else if (diff < 1) {
			num = Math.round(diff * 24);
			switch (this.length) {
				case 's':
					time = this.sysres.getString("#{num}h");
					break;
				case 'm':
					time = this.sysres.getString("1#1 hr|#{num} hrs", "durationMediumHours");
					break;
				case 'l':
					time = this.sysres.getString("1#1 hr|#{num} hrs");
					break;
				default:
				case 'f':
					time = this.sysres.getString("1#1 hour|#{num} hours");
					break;
			}
		} else if (diff < 14) {
			num = Math.round(diff);
			switch (this.length) {
				case 's':
					time = this.sysres.getString("#{num}d");
					break;
				case 'm':
					time = this.sysres.getString("1#1 dy|#{num} dys");
					break;
				case 'l':
					time = this.sysres.getString("1#1 day|#{num} days", "durationLongDays");
					break;
				default:
				case 'f':
					time = this.sysres.getString("1#1 day|#{num} days");
					break;
			}
		} else if (diff < 84) {
			num = Math.round(diff/7);
			switch (this.length) {
				case 's':
					time = this.sysres.getString("#{num}w");
					break;
				case 'm':
					time = this.sysres.getString("1#1 wk|#{num} wks", "durationMediumWeeks");
					break;
				case 'l':
					time = this.sysres.getString("1#1 wk|#{num} wks");
					break;
				default:
				case 'f':
					time = this.sysres.getString("1#1 week|#{num} weeks");
					break;
			}
		} else if (diff < 730) {
			num = Math.round(diff/30.4);
			switch (this.length) {
				case 's':
					time = this.sysres.getString("#{num}m", "durationShortMonths");
					break;
				case 'm':
					time = this.sysres.getString("1#1 mo|#{num} mos");
					break;
				case 'l':
					time = this.sysres.getString("1#1 mon|#{num} mons");
					break;
				default:
				case 'f':
					time = this.sysres.getString("1#1 month|#{num} months");
					break;
			}
		} else {
			num = Math.round(diff/365);
			switch (this.length) {
				case 's':
					time = this.sysres.getString("#{num}y");
					break;
				case 'm':
					time = this.sysres.getString("1#1 yr|#{num} yrs", "durationMediumYears");
					break;
				case 'l':
					time = this.sysres.getString("1#1 yr|#{num} yrs");
					break;
				default:
				case 'f':
					time = this.sysres.getString("1#1 year|#{num} years");
					break;
			}
		}
		return fmt.format({duration: time.formatChoice(num, {num: num})});
	}
};

module.exports = DateFmt;

},{'./ilib.js':'enyo-ilib/ilib','./Utils.js':'enyo-ilib/Utils','./JSUtils.js':'enyo-ilib/JSUtils','./Locale.js':'enyo-ilib/Locale','./LocaleInfo.js':'enyo-ilib/LocaleInfo','./IDate.js':'enyo-ilib/IDate','./DateFactory.js':'enyo-ilib/DateFactory','./Calendar.js':'enyo-ilib/Calendar','./CalendarFactory.js':'enyo-ilib/CalendarFactory','./IString.js':'enyo-ilib/IString','./ResBundle.js':'enyo-ilib/ResBundle','./TimeZone.js':'enyo-ilib/TimeZone','./GregorianCal.js':'enyo-ilib/GregorianCal'}],'enyo-ilib/HanCal':[function (module,exports,global,require,request){
/*
 * han.js - Represent a Han Chinese Lunar calendar object.
 * 
 * Copyright © 2014-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
ilib.js 
Calendar.js 
MathUtils.js 
Astro.js
GregorianDate.js
GregRataDie.js
RataDie.js
*/

var ilib = require("./ilib.js");
var MathUtils = require("./MathUtils.js");

var Calendar = require("./Calendar.js");

var Astro = require("./Astro.js");
var RataDie = require("./RataDie.js");
var GregorianDate = require("./GregorianDate.js");
var GregRataDie = require("./GregRataDie.js");

/**
 * @class
 * Construct a new Han algorithmic calendar object. This class encodes information about
 * a Han algorithmic calendar.<p>
 * 
 * 
 * @constructor
 * @param {Object=} params optional parameters to load the calendrical data
 * @extends Calendar
 */
var HanCal = function(params) {
	this.type = "han";
	var sync = params && typeof(params.sync) === 'boolean' ? params.sync : true;
	
	Astro.initAstro(sync, params && params.loadParams, /** @type {function ((Object|null)=): ?} */ ilib.bind(this, function (x) {
		if (params && typeof(params.callback) === 'function') {
			params.callback(this);
		}
	}));
};

/**
 * @protected
 * @static
 * @param {number} year
 * @param {number=} cycle
 * @return {number}
 */
HanCal._getElapsedYear = function(year, cycle) {
	var elapsedYear = year || 0;
	if (typeof(year) !== 'undefined' && year < 61 && typeof(cycle) !== 'undefined') {
		elapsedYear = 60 * cycle + year;
	}
	return elapsedYear;
};

/**
 * @protected
 * @static
 * @param {number} jd julian day to calculate from
 * @param {number} longitude longitude to seek 
 * @returns {number} the julian day of the next time that the solar longitude 
 * is a multiple of the given longitude
 */
HanCal._hanNextSolarLongitude = function(jd, longitude) {
	var tz = HanCal._chineseTZ(jd);
	var uni = Astro._universalFromLocal(jd, tz);
	var sol = Astro._nextSolarLongitude(uni, longitude);
	return Astro._localFromUniversal(sol, tz);
};

/**
 * @protected
 * @static
 * @param {number} jd julian day to calculate from 
 * @returns {number} the major solar term for the julian day
 */
HanCal._majorSTOnOrAfter = function(jd) {
	var tz = HanCal._chineseTZ(jd);
	var uni = Astro._universalFromLocal(jd, tz);
	var next = Astro._fixangle(30 * Math.ceil(Astro._solarLongitude(uni)/30));
	return HanCal._hanNextSolarLongitude(jd, next);
};

/**
 * @protected
 * @static
 * @param {number} year the year for which the leap year information is being sought
 * @param {number=} cycle if the given year < 60, this can specify the cycle. If the
 * cycle is not given, then the year should be given as elapsed years since the beginning
 * of the epoch
 */
HanCal._solsticeBefore = function (year, cycle) {
	var elapsedYear = HanCal._getElapsedYear(year, cycle);
	var gregyear = elapsedYear - 2697;
	var rd = new GregRataDie({
		year: gregyear-1, 
		month: 12, 
		day: 15, 
		hour: 0, 
		minute: 0, 
		second: 0, 
		millisecond: 0
	});
	return HanCal._majorSTOnOrAfter(rd.getRataDie() + RataDie.gregorianEpoch);
};

/**
 * @protected
 * @static
 * @param {number} jd julian day to calculate from
 * @returns {number} the current major solar term
 */
HanCal._chineseTZ = function(jd) {
	var year = GregorianDate._calcYear(jd - RataDie.gregorianEpoch);
	return year < 1929 ? 465.6666666666666666 : 480;
};

/**
 * @protected
 * @static
 * @param {number} jd julian day to calculate from 
 * @returns {number} the julian day of next new moon on or after the given julian day date
 */
HanCal._newMoonOnOrAfter = function(jd) {
	var tz = HanCal._chineseTZ(jd);
	var uni = Astro._universalFromLocal(jd, tz);
	var moon = Astro._newMoonAtOrAfter(uni);
	// floor to the start of the julian day
	return Astro._floorToJD(Astro._localFromUniversal(moon, tz)); 
};

/**
 * @protected
 * @static
 * @param {number} jd julian day to calculate from 
 * @returns {number} the julian day of previous new moon before the given julian day date
 */
HanCal._newMoonBefore = function(jd) {
	var tz = HanCal._chineseTZ(jd);
	var uni = Astro._universalFromLocal(jd, tz);
	var moon = Astro._newMoonBefore(uni);
	// floor to the start of the julian day
	return Astro._floorToJD(Astro._localFromUniversal(moon, tz));
};

/**
 * @static
 * @protected
 * @param {number} year the year for which the leap year information is being sought
 * @param {number=} cycle if the given year < 60, this can specify the cycle. If the
 * cycle is not given, then the year should be given as elapsed years since the beginning
 * of the epoch
 */
HanCal._leapYearCalc = function(year, cycle) {
	var ret = {
		elapsedYear: HanCal._getElapsedYear(year, cycle)
	};
	ret.solstice1 = HanCal._solsticeBefore(ret.elapsedYear);
	ret.solstice2 = HanCal._solsticeBefore(ret.elapsedYear+1);
	// ceil to the end of the julian day
	ret.m1 = HanCal._newMoonOnOrAfter(Astro._ceilToJD(ret.solstice1));
	ret.m2 = HanCal._newMoonBefore(Astro._ceilToJD(ret.solstice2));
	
	return ret;
};

/**
 * @protected
 * @static
 * @param {number} jd julian day to calculate from
 * @returns {number} the current major solar term
 */
HanCal._currentMajorST = function(jd) {
	var s = Astro._solarLongitude(Astro._universalFromLocal(jd, HanCal._chineseTZ(jd)));
	return MathUtils.amod(2 + Math.floor(s/30), 12);
};

/**
 * @protected
 * @static
 * @param {number} jd julian day to calculate from
 * @returns {boolean} true if there is no major solar term in the same year
 */
HanCal._noMajorST = function(jd) {
	return HanCal._currentMajorST(jd) === HanCal._currentMajorST(HanCal._newMoonOnOrAfter(jd+1));
};

/**
 * Return the number of months in the given year. The number of months in a year varies
 * for some luni-solar calendars because in some years, an extra month is needed to extend the 
 * days in a year to an entire solar year. The month is represented as a 1-based number
 * where 1=first month, 2=second month, etc.
 * 
 * @param {number} year a year for which the number of months is sought
 * @param {number=} cycle if the given year < 60, this can specify the cycle. If the
 * cycle is not given, then the year should be given as elapsed years since the beginning
 * of the epoch
 * @return {number} The number of months in the given year
 */
HanCal.prototype.getNumMonths = function(year, cycle) {
	return this.isLeapYear(year, cycle) ? 13 : 12;
};

/**
 * Return the number of days in a particular month in a particular year. This function
 * can return a different number for a month depending on the year because of things
 * like leap years.
 * 
 * @param {number} month the elapsed month for which the length is sought
 * @param {number} year the elapsed year within which that month can be found
 * @return {number} the number of days within the given month in the given year
 */
HanCal.prototype.getMonLength = function(month, year) {
	// distance between two new moons in Nanjing China
	var calc = HanCal._leapYearCalc(year);
	var priorNewMoon = HanCal._newMoonOnOrAfter(calc.m1 + month * 29);
	var postNewMoon = HanCal._newMoonOnOrAfter(priorNewMoon + 1);
	return postNewMoon - priorNewMoon;
};

/**
 * Return the equivalent year in the 2820 year cycle that begins on 
 * Far 1, 474. This particular cycle obeys the cycle-of-years formula 
 * whereas the others do not specifically. This cycle can be used as
 * a proxy for other years outside of the cycle by shifting them into 
 * the cycle.   
 * @param {number} year year to find the equivalent cycle year for
 * @returns {number} the equivalent cycle year
 */
HanCal.prototype.equivalentCycleYear = function(year) {
	var y = year - (year >= 0 ? 474 : 473);
	return MathUtils.mod(y, 2820) + 474;
};

/**
 * Return true if the given year is a leap year in the Han calendar.
 * If the year is given as a year/cycle combination, then the year should be in the 
 * range [1,60] and the given cycle is the cycle in which the year is located. If 
 * the year is greater than 60, then
 * it represents the total number of years elapsed in the proleptic calendar since
 * the beginning of the Chinese epoch in on 15 Feb, -2636 (Gregorian). In this 
 * case, the cycle parameter is ignored.
 * 
 * @param {number} year the year for which the leap year information is being sought
 * @param {number=} cycle if the given year < 60, this can specify the cycle. If the
 * cycle is not given, then the year should be given as elapsed years since the beginning
 * of the epoch
 * @return {boolean} true if the given year is a leap year
 */
HanCal.prototype.isLeapYear = function(year, cycle) {
	var calc = HanCal._leapYearCalc(year, cycle);
	return Math.round((calc.m2 - calc.m1) / 29.530588853000001) === 12;
};

/**
 * Return the month of the year that is the leap month. If the given year is
 * not a leap year, then this method will return -1.
 * 
 * @param {number} year the year for which the leap year information is being sought
 * @param {number=} cycle if the given year < 60, this can specify the cycle. If the
 * cycle is not given, then the year should be given as elapsed years since the beginning
 * of the epoch
 * @return {number} the number of the month that is doubled in this leap year, or -1
 * if this is not a leap year
 */
HanCal.prototype.getLeapMonth = function(year, cycle) {
	var calc = HanCal._leapYearCalc(year, cycle);
	
	if (Math.round((calc.m2 - calc.m1) / 29.530588853000001) != 12) {
		return -1; // no leap month
	}
	
	// search between rd1 and rd2 for the first month with no major solar term. That is our leap month.
	var month = 0;
	var m = HanCal._newMoonOnOrAfter(calc.m1+1);
	while (!HanCal._noMajorST(m)) {
		month++;
		m = HanCal._newMoonOnOrAfter(m+1);
	}
	
	// return the number of the month that is doubled
	return month; 
};

/**
 * Return the date of Chinese New Years in the given calendar year.
 * 
 * @param {number} year the Chinese year for which the new year information is being sought
 * @param {number=} cycle if the given year < 60, this can specify the cycle. If the
 * cycle is not given, then the year should be given as elapsed years since the beginning
 * of the epoch
 * @return {number} the julian day of the beginning of the given year 
 */
HanCal.prototype.newYears = function(year, cycle) {
	var calc = HanCal._leapYearCalc(year, cycle);
	var m2 = HanCal._newMoonOnOrAfter(calc.m1+1);
	if (Math.round((calc.m2 - calc.m1) / 29.530588853000001) === 12 &&
			(HanCal._noMajorST(calc.m1) || HanCal._noMajorST(m2)) ) {
		return HanCal._newMoonOnOrAfter(m2+1);
	}
	return m2;
};

/**
 * Return the type of this calendar.
 * 
 * @return {string} the name of the type of this calendar 
 */
HanCal.prototype.getType = function() {
	return this.type;
};


/* register this calendar for the factory method */
Calendar._constructors["han"] = HanCal;

module.exports = HanCal;
},{'./ilib.js':'enyo-ilib/ilib','./MathUtils.js':'enyo-ilib/MathUtils','./Calendar.js':'enyo-ilib/Calendar','./Astro.js':'enyo-ilib/Astro','./RataDie.js':'enyo-ilib/RataDie','./GregorianDate.js':'enyo-ilib/GregorianDate','./GregRataDie.js':'enyo-ilib/GregRataDie'}],'enyo-ilib/PersRataDie':[function (module,exports,global,require,request){
/*
 * persratadie.js - Represent a rata die date in the Persian calendar
 * 
 * Copyright © 2014-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
ilib.js
MathUtils.js
RataDie.js
Astro.js
GregorianDate.js
*/

var ilib = require("./ilib.js");
var MathUtils = require("./MathUtils.js");

var Astro = require("./Astro.js");
var RataDie = require("./RataDie.js");
var GregorianDate = require("./GregorianDate.js");


/**
 * @class
 * Construct a new Persian RD date number object. The constructor parameters can 
 * contain any of the following properties:
 * 
 * <ul>
 * <li><i>unixtime<i> - sets the time of this instance according to the given 
 * unix time. Unix time is the number of milliseconds since midnight on Jan 1, 1970, Gregorian
 * 
 * <li><i>julianday</i> - sets the time of this instance according to the given
 * Julian Day instance or the Julian Day given as a float
 * 
 * <li><i>year</i> - any integer, including 0
 * 
 * <li><i>month</i> - 1 to 12, where 1 means Farvardin, 2 means Ordibehesht, etc.
 * 
 * <li><i>day</i> - 1 to 31
 * 
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * 
 * <li><i>minute</i> - 0 to 59
 * 
 * <li><i>second</i> - 0 to 59
 * 
 * <li><i>millisecond</i> - 0 to 999
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 *
 * If the constructor is called with another Persian date instance instead of
 * a parameter block, the other instance acts as a parameter block and its
 * settings are copied into the current instance.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above are present, then the RD is calculate based on 
 * the current date at the time of instantiation. <p>
 * 
 * If any of the properties from <i>year</i> through <i>millisecond</i> are not
 * specified in the params, it is assumed that they have the smallest possible
 * value in the range for the property (zero or one).<p>
 * 
 * 
 * @private
 * @constructor
 * @extends RataDie
 * @param {Object=} params parameters that govern the settings and behaviour of this Persian RD date
 */
var PersRataDie = function(params) {
	this.rd = undefined;
	Astro.initAstro(
		params && typeof(params.sync) === 'boolean' ? params.sync : true,
		params && params.loadParams,
		ilib.bind(this, function (x) {
			RataDie.call(this, params);
			if (params && typeof(params.callback) === 'function') {
				params.callback(this);
			}
		})
	);
};

PersRataDie.prototype = new RataDie();
PersRataDie.prototype.parent = RataDie;
PersRataDie.prototype.constructor = PersRataDie;

/**
 * The difference between a zero Julian day and the first Persian date
 * @private
 * @const
 * @type number
 */
PersRataDie.prototype.epoch = 1948319.5;

/**
 * @protected 
 */
PersRataDie.prototype._tehranEquinox = function(year) {
    var equJED, equJD, equAPP, equTehran, dtTehran, eot;

    //  March equinox in dynamical time
    equJED = Astro._equinox(year, 0);

    //  Correct for delta T to obtain Universal time
    equJD = equJED - (Astro._deltat(year) / (24 * 60 * 60));

    //  Apply the equation of time to yield the apparent time at Greenwich
    eot = Astro._equationOfTime(equJED) * 360;
    eot = (eot - 20 * Math.floor(eot/20)) / 360;
    equAPP = equJD + eot;

    /*  
     * Finally, we must correct for the constant difference between
     * the Greenwich meridian and the time zone standard for Iran 
     * Standard time, 52 degrees 30 minutes to the East.
     */

    dtTehran = 52.5 / 360;
    equTehran = equAPP + dtTehran;

    return equTehran;
};

/**
 * Calculate the year based on the given Julian day.
 * @protected
 * @param {number} jd the Julian day to get the year for
 * @return {{year:number,equinox:number}} the year and the last equinox
 */
PersRataDie.prototype._getYear = function(jd) {
	var gd = new GregorianDate({julianday: jd});
    var guess = gd.getYears() - 2,
    	nexteq,
    	ret = {};

    //ret.equinox = Math.floor(this._tehranEquinox(guess));
    ret.equinox = this._tehranEquinox(guess);
	while (ret.equinox > jd) {
	    guess--;
	    // ret.equinox = Math.floor(this._tehranEquinox(guess));
	    ret.equinox = this._tehranEquinox(guess);
	}
	nexteq = ret.equinox - 1;
	// if the equinox falls after noon, then the day after that is the start of the 
	// next year, so truncate the JD to get the noon of the day before the day with 
	//the equinox on it, then add 0.5 to get the midnight of that day 
	while (!(Math.floor(ret.equinox) + 0.5 <= jd && jd < Math.floor(nexteq) + 0.5)) {
	    ret.equinox = nexteq;
	    guess++;
	    // nexteq = Math.floor(this._tehranEquinox(guess));
	    nexteq = this._tehranEquinox(guess);
	}
	
	// Mean solar tropical year is 365.24219878 days
	ret.year = Math.round((ret.equinox - this.epoch - 1) / 365.24219878) + 1;
	
	return ret;
};

/**
 * Calculate the Rata Die (fixed day) number of the given date from the
 * date components.
 *
 * @protected
 * @param {Object} date the date components to calculate the RD from
 */
PersRataDie.prototype._setDateComponents = function(date) {
    var adr, guess, jd;

    // Mean solar tropical year is 365.24219878 days 
    guess = this.epoch + 1 + 365.24219878 * (date.year - 2);
    adr = {year: date.year - 1, equinox: 0};

    while (adr.year < date.year) {
        adr = this._getYear(guess);
        guess = adr.equinox + (365.24219878 + 2);
    }

    jd = Math.floor(adr.equinox) +
            ((date.month <= 7) ?
                ((date.month - 1) * 31) :
                (((date.month - 1) * 30) + 6)
            ) +
    	    (date.day - 1 + 0.5); // add 0.5 so that we convert JDs, which start at noon to RDs which start at midnight
    
	jd += (date.hour * 3600000 +
			date.minute * 60000 +
			date.second * 1000 +
			date.millisecond) /
			86400000;

    this.rd = jd - this.epoch;
};

/**
 * Return the rd number of the particular day of the week on or before the 
 * given rd. eg. The Sunday on or before the given rd.
 * @private
 * @param {number} rd the rata die date of the reference date
 * @param {number} dayOfWeek the day of the week that is being sought relative 
 * to the current date
 * @return {number} the rd of the day of the week
 */
PersRataDie.prototype._onOrBefore = function(rd, dayOfWeek) {
	return rd - MathUtils.mod(Math.floor(rd) - dayOfWeek - 3, 7);
};

module.exports = PersRataDie;
},{'./ilib.js':'enyo-ilib/ilib','./MathUtils.js':'enyo-ilib/MathUtils','./Astro.js':'enyo-ilib/Astro','./RataDie.js':'enyo-ilib/RataDie','./GregorianDate.js':'enyo-ilib/GregorianDate'}],'enyo-ilib/DurationFmt':[function (module,exports,global,require,request){
/*
 * DurFmt.js - Date formatter definition
 * 
 * Copyright © 2012-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
!depends 
ilib.js 
Locale.js 
DateFmt.js
IString.js 
ResBundle.js 
LocaleInfo.js
JSUtils.js
Utils.js
*/

// !data dateformats sysres
// !resbundle sysres

var ilib = require("./ilib.js");
var Utils = require("./Utils.js");
var JSUtils = require("./JSUtils.js");
var Locale = require("./Locale.js");
var LocaleInfo = require("./LocaleInfo.js");
var DateFmt = require("./DateFmt.js");
var IString = require("./IString.js");
var ResBundle = require("./ResBundle.js");

/**
 * @class
 * Create a new duration formatter instance. The duration formatter is immutable once
 * it is created, but can format as many different durations as needed with the same
 * options. Create different duration formatter instances for different purposes
 * and then keep them cached for use later if you have more than one duration to
 * format.<p>
 * 
 * Duration formatters format lengths of time. The duration formatter is meant to format 
 * durations of such things as the length of a song or a movie or a meeting, or the 
 * current position in that song or movie while playing it. If you wish to format a 
 * period of time that has a specific start and end date/time, then use a
 * [DateRngFmt] instance instead and call its format method.<p>
 *  
 * The options may contain any of the following properties:
 * 
 * <ul>
 * <li><i>locale</i> - locale to use when formatting the duration. If the locale is
 * not specified, then the default locale of the app or web page will be used.
 * 
 * <li><i>length</i> - Specify the length of the format to use. The length is the approximate size of the 
 * formatted string.
 * 
 * <ul>
 * <li><i>short</i> - use a short representation of the duration. This is the most compact format possible for the locale. eg. 1y 1m 1w 1d 1:01:01
 * <li><i>medium</i> - use a medium length representation of the duration. This is a slightly longer format. eg. 1 yr 1 mo 1 wk 1 dy 1 hr 1 mi 1 se
 * <li><i>long</i> - use a long representation of the duration. This is a fully specified format, but some of the textual 
 * parts may still be abbreviated. eg. 1 yr 1 mo 1 wk 1 day 1 hr 1 min 1 sec
 * <li><i>full</i> - use a full representation of the duration. This is a fully specified format where all the textual 
 * parts are spelled out completely. eg. 1 year, 1 month, 1 week, 1 day, 1 hour, 1 minute and 1 second
 * </ul>
 * 
 * <li><i>style<i> - whether hours, minutes, and seconds should be formatted as a text string
 * or as a regular time as on a clock. eg. text is "1 hour, 15 minutes", whereas clock is "1:15:00". Valid
 * values for this property are "text" or "clock". Default if this property is not specified
 * is "text".
 * 
 *<li><i>useNative</i> - the flag used to determaine whether to use the native script settings 
 * for formatting the numbers .
 * 
 * <li><i>onLoad</i> - a callback function to call when the format data is fully 
 * loaded. When the onLoad option is given, this class will attempt to
 * load any missing locale data using the ilib loader callback.
 * When the constructor is done (even if the data is already preassembled), the 
 * onLoad function is called with the current instance as a parameter, so this
 * callback can be used with preassembled or dynamic loading or a mix of the two. 
 * 
 * <li>sync - tell whether to load any missing locale data synchronously or 
 * asynchronously. If this option is given as "false", then the "onLoad"
 * callback must be given, as the instance returned from this constructor will
 * not be usable for a while.
 *  
 * <li><i>loadParams</i> - an object containing parameters to pass to the 
 * loader callback function when locale data is missing. The parameters are not
 * interpretted or modified in any way. They are simply passed along. The object 
 * may contain any property/value pairs as long as the calling code is in
 * agreement with the loader callback function as to what those parameters mean.
 * </ul>
 * <p>
 * 
 * 
 * @constructor
 * @param {?Object} options options governing the way this date formatter instance works
 */
var DurationFmt = function(options) {
	var sync = true;
	var loadParams = undefined;
	
	this.locale = new Locale();
	this.length = "short";
	this.style = "text";
	
	if (options) {
		if (options.locale) {
			this.locale = (typeof(options.locale) === 'string') ? new Locale(options.locale) : options.locale;
		}
		
		if (options.length) {
			if (options.length === 'short' ||
				options.length === 'medium' ||
				options.length === 'long' ||
				options.length === 'full') {
				this.length = options.length;
			}
		}
		
		if (options.style) {
			if (options.style === 'text' || options.style === 'clock') {
				this.style = options.style;
			}
		}
		
		if (typeof(options.sync) !== 'undefined') {
			sync = (options.sync == true);
		}
		
		if (typeof(options.useNative) === 'boolean') {
			this.useNative = options.useNative;
		}
		
		loadParams = options.loadParams;
	}
	
	new ResBundle({
		locale: this.locale,
		name: "sysres",
		sync: sync,
		loadParams: loadParams,
		onLoad: ilib.bind(this, function (sysres) {
			switch (this.length) {
				case 'short':
					this.components = {
						year: sysres.getString("#{num}y"),
						month: sysres.getString("#{num}m", "durationShortMonths"),
						week: sysres.getString("#{num}w"),
						day: sysres.getString("#{num}d"),
						hour: sysres.getString("#{num}h"),
						minute: sysres.getString("#{num}m", "durationShortMinutes"),
						second: sysres.getString("#{num}s"),
						millisecond: sysres.getString("#{num}m", "durationShortMillis"),
						separator: sysres.getString(" ", "separatorShort"),
						finalSeparator: "" // not used at this length
					};
					break;
					
				case 'medium':
					this.components = {
						year: sysres.getString("1#1 yr|#{num} yrs", "durationMediumYears"),
						month: sysres.getString("1#1 mo|#{num} mos"),
						week: sysres.getString("1#1 wk|#{num} wks", "durationMediumWeeks"),
						day: sysres.getString("1#1 dy|#{num} dys"),
						hour: sysres.getString("1#1 hr|#{num} hrs", "durationMediumHours"),
						minute: sysres.getString("1#1 mi|#{num} min"),
						second: sysres.getString("1#1 se|#{num} sec"),
						millisecond: sysres.getString("#{num} ms"),
						separator: sysres.getString(" ", "separatorMedium"),
						finalSeparator: "" // not used at this length
					};
					break;
					
				case 'long':
					this.components = {
						year: sysres.getString("1#1 yr|#{num} yrs"),
						month: sysres.getString("1#1 mon|#{num} mons"),
						week: sysres.getString("1#1 wk|#{num} wks"),
						day: sysres.getString("1#1 day|#{num} days", "durationLongDays"),
						hour: sysres.getString("1#1 hr|#{num} hrs"),
						minute: sysres.getString("1#1 min|#{num} min"),
						second: sysres.getString("1#1 sec|#{num} sec"),
						millisecond: sysres.getString("#{num} ms"),
						separator: sysres.getString(", ", "separatorLong"),
						finalSeparator: "" // not used at this length
					};
					break;
					
				case 'full':
					this.components = {
						year: sysres.getString("1#1 year|#{num} years"),
						month: sysres.getString("1#1 month|#{num} months"),
						week: sysres.getString("1#1 week|#{num} weeks"),
						day: sysres.getString("1#1 day|#{num} days"),
						hour: sysres.getString("1#1 hour|#{num} hours"),
						minute: sysres.getString("1#1 minute|#{num} minutes"),
						second: sysres.getString("1#1 second|#{num} seconds"),
						millisecond: sysres.getString("1#1 millisecond|#{num} milliseconds"),
						separator: sysres.getString(", ", "separatorFull"),
						finalSeparator: sysres.getString(" and ", "finalSeparatorFull")
					};
					break;
			}
			
			if (this.style === 'clock') {
				new DateFmt({
					locale: this.locale,
					calendar: "gregorian",
					type: "time",
					time: "ms",
					sync: sync,
					loadParams: loadParams,
					useNative: this.useNative,
					onLoad: ilib.bind(this, function (fmtMS) {
						this.timeFmtMS = fmtMS;
						new DateFmt({
							locale: this.locale,
							calendar: "gregorian",
							type: "time",
							time: "hm",
							sync: sync,
							loadParams: loadParams,
							useNative: this.useNative,
							onLoad: ilib.bind(this, function (fmtHM) {
								this.timeFmtHM = fmtHM;		
								new DateFmt({
									locale: this.locale,
									calendar: "gregorian",
									type: "time",
									time: "hms",
									sync: sync,
									loadParams: loadParams,
									useNative: this.useNative,
									onLoad: ilib.bind(this, function (fmtHMS) {
										this.timeFmtHMS = fmtHMS;		

										// munge with the template to make sure that the hours are not formatted mod 12
										this.timeFmtHM.template = this.timeFmtHM.template.replace(/hh?/, 'H');
										this.timeFmtHM.templateArr = this.timeFmtHM._tokenize(this.timeFmtHM.template);
										this.timeFmtHMS.template = this.timeFmtHMS.template.replace(/hh?/, 'H');
										this.timeFmtHMS.templateArr = this.timeFmtHMS._tokenize(this.timeFmtHMS.template);
										
										this._init(this.timeFmtHM.locinfo, options && options.onLoad);
									})
								});
							})
						});
					})
				});
				return;
			}

			new LocaleInfo(this.locale, {
				sync: sync,
				loadParams: loadParams,
				onLoad: ilib.bind(this, function (li) {
					this._init(li, options && options.onLoad);
				})
			});
		})
	});
};

/**
 * @private
 * @static
 */
DurationFmt.complist = {
	"text": ["year", "month", "week", "day", "hour", "minute", "second", "millisecond"],
	"clock": ["year", "month", "week", "day"]
};

/**
 * @private
 */
DurationFmt.prototype._mapDigits = function(str) {
	if (this.useNative && this.digits) {
		return JSUtils.mapString(str.toString(), this.digits);
	}
	return str;
};

/**
 * @private
 * @param {LocaleInfo} locinfo
 * @param {function(DurationFmt)|undefined} onLoad
 */
DurationFmt.prototype._init = function(locinfo, onLoad) {
	var digits;
	if (typeof(this.useNative) === 'boolean') {
		// if the caller explicitly said to use native or not, honour that despite what the locale data says...
		if (this.useNative) {
			digits = locinfo.getNativeDigits();
			if (digits) {
				this.digits = digits;
			}
		}
	} else if (locinfo.getDigitsStyle() === "native") {
		// else if the locale usually uses native digits, then use them 
		digits = locinfo.getNativeDigits();
		if (digits) {
			this.useNative = true;
			this.digits = digits;
		}
	} // else use western digits always

	if (typeof(onLoad) === 'function') {
		onLoad(this);
	}
};

/**
 * Format a duration according to the format template of this formatter instance.<p>
 * 
 * The components parameter should be an object that contains any or all of these 
 * numeric properties:
 * 
 * <ul>
 * <li>year
 * <li>month
 * <li>week
 * <li>day
 * <li>hour
 * <li>minute
 * <li>second
 * </ul>
 * <p>
 *
 * When a property is left out of the components parameter or has a value of 0, it will not
 * be formatted into the output string, except for times that include 0 minutes and 0 seconds.
 * 
 * This formatter will not ensure that numbers for each component property is within the
 * valid range for that component. This allows you to format durations that are longer
 * than normal range. For example, you could format a duration has being "33 hours" rather
 * than "1 day, 9 hours".
 * 
 * @param {Object} components date/time components to be formatted into a duration string
 * @return {IString} a string with the duration formatted according to the style and 
 * locale set up for this formatter instance. If the components parameter is empty or 
 * undefined, an empty string is returned.
 */
DurationFmt.prototype.format = function (components) {
	var i, list, temp, fmt, secondlast = true, str = "";
	
	list = DurationFmt.complist[this.style];
	//for (i = 0; i < list.length; i++) {
	for (i = list.length-1; i >= 0; i--) {
		//console.log("Now dealing with " + list[i]);
		if (typeof(components[list[i]]) !== 'undefined' && components[list[i]] != 0) {
			if (str.length > 0) {
				str = ((this.length === 'full' && secondlast) ? this.components.finalSeparator : this.components.separator) + str;
				secondlast = false;
			}
			str = this.components[list[i]].formatChoice(components[list[i]], {num: this._mapDigits(components[list[i]])}) + str;
		}
	}

	if (this.style === 'clock') {
		if (typeof(components.hour) !== 'undefined') {
			fmt = (typeof(components.second) !== 'undefined') ? this.timeFmtHMS : this.timeFmtHM;
		} else {
			fmt = this.timeFmtMS;
		}
				
		if (str.length > 0) {
			str += this.components.separator;
		}
		str += fmt._formatTemplate(components, fmt.templateArr);
	}
	
	return new IString(str);
};

/**
 * Return the locale that was used to construct this duration formatter object. If the
 * locale was not given as parameter to the constructor, this method returns the default
 * locale of the system.
 * 
 * @return {Locale} locale that this duration formatter was constructed with
 */
DurationFmt.prototype.getLocale = function () {
	return this.locale;
};

/**
 * Return the length that was used to construct this duration formatter object. If the
 * length was not given as parameter to the constructor, this method returns the default
 * length. Valid values are "short", "medium", "long", and "full".
 * 
 * @return {string} length that this duration formatter was constructed with
 */
DurationFmt.prototype.getLength = function () {
	return this.length;
};

/**
 * Return the style that was used to construct this duration formatter object. Returns
 * one of "text" or "clock".
 * 
 * @return {string} style that this duration formatter was constructed with
 */
DurationFmt.prototype.getStyle = function () {
	return this.style;
};

module.exports = DurationFmt;
},{'./ilib.js':'enyo-ilib/ilib','./Utils.js':'enyo-ilib/Utils','./JSUtils.js':'enyo-ilib/JSUtils','./Locale.js':'enyo-ilib/Locale','./LocaleInfo.js':'enyo-ilib/LocaleInfo','./DateFmt.js':'enyo-ilib/DateFmt','./IString.js':'enyo-ilib/IString','./ResBundle.js':'enyo-ilib/ResBundle'}],'enyo-ilib/HanRataDie':[function (module,exports,global,require,request){
/*
 * HanDate.js - Represent a date in the Han algorithmic calendar
 * 
 * Copyright © 2014-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends
ilib.js
HanCal.js
MathUtils.js
RataDie.js
*/

var ilib = require("./ilib.js");
var MathUtils = require("./MathUtils.js");
var HanCal = require("./HanCal.js");
var RataDie = require("./RataDie.js");

/**
 * Construct a new Han RD date number object. The constructor parameters can 
 * contain any of the following properties:
 * 
 * <ul>
 * <li><i>unixtime<i> - sets the time of this instance according to the given 
 * unix time. Unix time is the number of milliseconds since midnight on Jan 1, 1970, Gregorian
 * 
 * <li><i>julianday</i> - sets the time of this instance according to the given
 * Julian Day instance or the Julian Day given as a float
 * 
 * <li><i>cycle</i> - any integer giving the number of 60-year cycle in which the date is located.
 * If the cycle is not given but the year is, it is assumed that the year parameter is a fictitious 
 * linear count of years since the beginning of the epoch, much like other calendars. This linear
 * count is never used. If both the cycle and year are given, the year is wrapped to the range 0 
 * to 60 and treated as if it were a year in the regular 60-year cycle.
 * 
 * <li><i>year</i> - any integer, including 0
 * 
 * <li><i>month</i> - 1 to 12, where 1 means Farvardin, 2 means Ordibehesht, etc.
 * 
 * <li><i>day</i> - 1 to 31
 * 
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * 
 * <li><i>minute</i> - 0 to 59
 * 
 * <li><i>second</i> - 0 to 59
 * 
 * <li><i>millisecond</i> - 0 to 999
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 *
 * If the constructor is called with another Han date instance instead of
 * a parameter block, the other instance acts as a parameter block and its
 * settings are copied into the current instance.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above are present, then the RD is calculate based on 
 * the current date at the time of instantiation. <p>
 * 
 * If any of the properties from <i>year</i> through <i>millisecond</i> are not
 * specified in the params, it is assumed that they have the smallest possible
 * value in the range for the property (zero or one).<p>
 * 
 * 
 * @private
 * @class
 * @constructor
 * @extends RataDie
 * @param {Object=} params parameters that govern the settings and behaviour of this Han RD date
 */
var HanRataDie = function(params) {
	this.rd = undefined;
	if (params && params.cal) {
		this.cal = params.cal;
		RataDie.call(this, params);
		if (params && typeof(params.callback) === 'function') {
			params.callback(this);
		}
	} else {
		new HanCal({
			sync: params && params.sync,
			loadParams: params && params.loadParams,
			callback: ilib.bind(this, function(c) {
				this.cal = c;
				RataDie.call(this, params);
				if (params && typeof(params.callback) === 'function') {
					params.callback(this);
				}
			})
		});
	}
};

HanRataDie.prototype = new RataDie();
HanRataDie.prototype.parent = RataDie;
HanRataDie.prototype.constructor = HanRataDie;

/**
 * The difference between a zero Julian day and the first Han date
 * which is February 15, -2636 (Gregorian).
 * @private
 * @const
 * @type number
 */
HanRataDie.epoch = 758325.5;

/**
 * Calculate the Rata Die (fixed day) number of the given date from the
 * date components.
 *
 * @protected
 * @param {Object} date the date components to calculate the RD from
 */
HanRataDie.prototype._setDateComponents = function(date) {
	var calc = HanCal._leapYearCalc(date.year, date.cycle);
	var m2 = HanCal._newMoonOnOrAfter(calc.m1+1);
	var newYears;
	this.leapYear = (Math.round((calc.m2 - calc.m1) / 29.530588853000001) === 12);
	if (this.leapYear && (HanCal._noMajorST(calc.m1) || HanCal._noMajorST(m2)) ) {
		newYears = HanCal._newMoonOnOrAfter(m2+1);
	} else {
		newYears = m2;
	}

	var priorNewMoon = HanCal._newMoonOnOrAfter(calc.m1 + date.month * 29); // this is a julian day
	this.priorLeapMonth = HanRataDie._priorLeapMonth(newYears, HanCal._newMoonBefore(priorNewMoon));
	this.leapMonth = (this.leapYear && HanCal._noMajorST(priorNewMoon) && !this.priorLeapMonth);

	var rdtime = (date.hour * 3600000 +
		date.minute * 60000 +
		date.second * 1000 +
		date.millisecond) /
		86400000;
	
	/*
	console.log("getRataDie: converting " +  JSON.stringify(date) + " to an RD");
	console.log("getRataDie: year is " +  date.year + " plus cycle " + date.cycle);
	console.log("getRataDie: isLeapYear is " +  this.leapYear);
	console.log("getRataDie: priorNewMoon is " +  priorNewMoon);
	console.log("getRataDie: day in month is " +  date.day);
	console.log("getRataDie: rdtime is " +  rdtime);
	console.log("getRataDie: rd is " +  (priorNewMoon + date.day - 1 + rdtime));
	*/
	
	this.rd = priorNewMoon + date.day - 1 + rdtime - RataDie.gregorianEpoch;
};

/**
 * Return the rd number of the particular day of the week on or before the 
 * given rd. eg. The Sunday on or before the given rd.
 * @private
 * @param {number} rd the rata die date of the reference date
 * @param {number} dayOfWeek the day of the week that is being sought relative 
 * to the current date
 * @return {number} the rd of the day of the week
 */
HanRataDie.prototype._onOrBefore = function(rd, dayOfWeek) {
	return rd - MathUtils.mod(Math.floor(rd) - dayOfWeek, 7);
};

/**
 * @protected
 * @static
 * @param {number} jd1 first julian day
 * @param {number} jd2 second julian day
 * @returns {boolean} true if there is a leap month earlier in the same year 
 * as the given months 
 */
HanRataDie._priorLeapMonth = function(jd1, jd2) {
	return jd2 >= jd1 &&
		(HanRataDie._priorLeapMonth(jd1, HanCal._newMoonBefore(jd2)) ||
				HanCal._noMajorST(jd2));
};


module.exports = HanRataDie;
},{'./ilib.js':'enyo-ilib/ilib','./MathUtils.js':'enyo-ilib/MathUtils','./HanCal.js':'enyo-ilib/HanCal','./RataDie.js':'enyo-ilib/RataDie'}],'enyo-ilib/PersianCal':[function (module,exports,global,require,request){
/*
 * persianastro.js - Represent a Persian astronomical (Hijjri) calendar object.
 * 
 * Copyright © 2014-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/* !depends 
Calendar.js 
PersRataDie.js 
ilib.js
MathUtils.js
*/

var ilib = require("./ilib.js");
var MathUtils = require("./MathUtils.js");

var Calendar = require("./Calendar.js");

var PersRataDie = require("./PersRataDie.js");

/**
 * @class
 * Construct a new Persian astronomical (Hijjri) calendar object. This class encodes 
 * information about a Persian calendar. This class differs from the 
 * Persian calendar in that the leap years are calculated based on the
 * astronomical observations of the sun in Teheran, instead of calculating
 * the leap years based on a regular cyclical rhythm algorithm.<p>
 * 
 * 
 * @constructor
 * @extends Calendar
 */
var PersianCal = function() {
	this.type = "persian";
};

/**
 * @private
 * @const
 * @type Array.<number> 
 * the lengths of each month 
 */
PersianCal.monthLengths = [
	31,  // Farvardin
	31,  // Ordibehesht
	31,  // Khordad
	31,  // Tir
	31,  // Mordad
	31,  // Shahrivar
	30,  // Mehr
	30,  // Aban
	30,  // Azar
	30,  // Dey
	30,  // Bahman
	29   // Esfand
];

/**
 * Return the number of months in the given year. The number of months in a year varies
 * for some luni-solar calendars because in some years, an extra month is needed to extend the 
 * days in a year to an entire solar year. The month is represented as a 1-based number
 * where 1=first month, 2=second month, etc.
 * 
 * @param {number} year a year for which the number of months is sought
 * @return {number} The number of months in the given year
 */
PersianCal.prototype.getNumMonths = function(year) {
	return 12;
};

/**
 * Return the number of days in a particular month in a particular year. This function
 * can return a different number for a month depending on the year because of things
 * like leap years.
 * 
 * @param {number} month the month for which the length is sought
 * @param {number} year the year within which that month can be found
 * @return {number} the number of days within the given month in the given year
 */
PersianCal.prototype.getMonLength = function(month, year) {
	if (month !== 12 || !this.isLeapYear(year)) {
		return PersianCal.monthLengths[month-1];
	} else {
		// Month 12, Esfand, has 30 days instead of 29 in leap years
		return 30;
	}
};

/**
 * Return true if the given year is a leap year in the Persian astronomical calendar.
 * @param {number} year the year for which the leap year information is being sought
 * @return {boolean} true if the given year is a leap year
 */
PersianCal.prototype.isLeapYear = function(year) {
	var rdNextYear = new PersRataDie({
		cal: this,
		year: year + 1,
		month: 1,
		day: 1,
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0
	});
	var rdThisYear = new PersRataDie({
		cal: this,
		year: year,
		month: 1,
		day: 1,
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0
	}); 
    return (rdNextYear.getRataDie() - rdThisYear.getRataDie()) > 365;
};

/**
 * Return the type of this calendar.
 * 
 * @return {string} the name of the type of this calendar 
 */
PersianCal.prototype.getType = function() {
	return this.type;
};

/* register this calendar for the factory method */
Calendar._constructors["persian"] = PersianCal;

module.exports = PersianCal;
},{'./ilib.js':'enyo-ilib/ilib','./MathUtils.js':'enyo-ilib/MathUtils','./Calendar.js':'enyo-ilib/Calendar','./PersRataDie.js':'enyo-ilib/PersRataDie'}],'enyo-ilib/HanDate':[function (module,exports,global,require,request){
/*
 * HanDate.js - Represent a date in the Han algorithmic calendar
 * 
 * Copyright © 2014-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends
ilib.js
IDate.js
GregorianDate.js 
HanCal.js
Astro.js 
JSUtils.js
MathUtils.js
LocaleInfo.js 
Locale.js
TimeZone.js
HanRataDie.js
RataDie.js
*/

var ilib = require("./ilib.js");
var JSUtils = require("./JSUtils.js");
var MathUtils = require("./MathUtils.js");

var Locale = require("./Locale.js");
var LocaleInfo = require("./LocaleInfo.js");
var IDate = require("./IDate.js");
var TimeZone = require("./TimeZone.js");
var Calendar = require("./Calendar.js");

var Astro = require("./Astro.js");
var HanCal = require("./HanCal.js");
var GregorianDate = require("./GregorianDate.js");
var HanRataDie = require("./HanRataDie.js");
var RataDie = require("./RataDie.js");

/**
 * @class
 * 
 * Construct a new Han date object. The constructor parameters can 
 * contain any of the following properties:
 * 
 * <ul>
 * <li><i>unixtime<i> - sets the time of this instance according to the given 
 * unix time. Unix time is the number of milliseconds since midnight on Jan 1, 1970, Gregorian
 * 
 * <li><i>julianday</i> - sets the time of this instance according to the given
 * Julian Day instance or the Julian Day given as a float
 * 
 * <li><i>cycle</i> - any integer giving the number of 60-year cycle in which the date is located.
 * If the cycle is not given but the year is, it is assumed that the year parameter is a fictitious 
 * linear count of years since the beginning of the epoch, much like other calendars. This linear
 * count is never used. If both the cycle and year are given, the year is wrapped to the range 0 
 * to 60 and treated as if it were a year in the regular 60-year cycle.
 * 
 * <li><i>year</i> - any integer, including 0
 * 
 * <li><i>month</i> - 1 to 12, where 1 means Farvardin, 2 means Ordibehesht, etc.
 * 
 * <li><i>day</i> - 1 to 31
 * 
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * 
 * <li><i>minute</i> - 0 to 59
 * 
 * <li><i>second</i> - 0 to 59
 * 
 * <li><i>millisecond</i> - 0 to 999
 * 
 * <li><i>timezone</i> - the TimeZone instance or time zone name as a string 
 * of this han date. The date/time is kept in the local time. The time zone
 * is used later if this date is formatted according to a different time zone and
 * the difference has to be calculated, or when the date format has a time zone
 * component in it.
 * 
 * <li><i>locale</i> - locale for this han date. If the time zone is not 
 * given, it can be inferred from this locale. For locales that span multiple
 * time zones, the one with the largest population is chosen as the one that 
 * represents the locale.
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 *
 * If the constructor is called with another Han date instance instead of
 * a parameter block, the other instance acts as a parameter block and its
 * settings are copied into the current instance.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above 
 * from <i>unixtime</i> through <i>millisecond</i> are present, then the date 
 * components are 
 * filled in with the current date at the time of instantiation. Note that if
 * you do not give the time zone when defaulting to the current time and the 
 * time zone for all of ilib was not set with <i>ilib.setTimeZone()</i>, then the
 * time zone will default to UTC ("Universal Time, Coordinated" or "Greenwich 
 * Mean Time").<p>
 * 
 * If any of the properties from <i>year</i> through <i>millisecond</i> are not
 * specified in the params, it is assumed that they have the smallest possible
 * value in the range for the property (zero or one).<p>
 * 
 * 
 * @constructor
 * @extends Date
 * @param {Object=} params parameters that govern the settings and behaviour of this Han date
 */
var HanDate = function(params) {
	this.timezone = "local";
	if (params) {
		if (params.locale) {
			this.locale = (typeof(params.locale) === 'string') ? new Locale(params.locale) : params.locale;
			var li = new LocaleInfo(this.locale);
			this.timezone = li.getTimeZone(); 
		}
		if (params.timezone) {
			this.timezone = params.timezone;
		}
	}
	
	new HanCal({
		sync: params && typeof(params) === 'boolean' ? params.sync : true,
		loadParams: params && params.loadParams,
		callback: ilib.bind(this, function (cal) {
			this.cal = cal;
	
			if (params && (params.year || params.month || params.day || params.hour ||
				params.minute || params.second || params.millisecond || params.cycle || params.cycleYear)) {
				if (typeof(params.cycle) !== 'undefined') {
					/**
					 * Cycle number in the Han calendar.
					 * @type number
					 */
					this.cycle = parseInt(params.cycle, 10) || 0;
					
					var year = (typeof(params.year) !== 'undefined' ? parseInt(params.year, 10) : parseInt(params.cycleYear, 10)) || 0;
					
					/**
					 * Year in the Han calendar.
					 * @type number
					 */
					this.year = HanCal._getElapsedYear(year, this.cycle);
				} else {
					if (typeof(params.year) !== 'undefined') {
						this.year = parseInt(params.year, 10) || 0;
						this.cycle = Math.floor((this.year - 1) / 60);
					} else {
						this.year = this.cycle = 0;
					}
				}	
				
				/**
				 * The month number, ranging from 1 to 13
				 * @type number
				 */
				this.month = parseInt(params.month, 10) || 1;
	
				/**
				 * The day of the month. This ranges from 1 to 30.
				 * @type number
				 */
				this.day = parseInt(params.day, 10) || 1;
				
				/**
				 * The hour of the day. This can be a number from 0 to 23, as times are
				 * stored unambiguously in the 24-hour clock.
				 * @type number
				 */
				this.hour = parseInt(params.hour, 10) || 0;
	
				/**
				 * The minute of the hours. Ranges from 0 to 59.
				 * @type number
				 */
				this.minute = parseInt(params.minute, 10) || 0;
	
				/**
				 * The second of the minute. Ranges from 0 to 59.
				 * @type number
				 */
				this.second = parseInt(params.second, 10) || 0;
	
				/**
				 * The millisecond of the second. Ranges from 0 to 999.
				 * @type number
				 */
				this.millisecond = parseInt(params.millisecond, 10) || 0;
			
				// derived properties
				
				/**
				 * Year in the cycle of the Han calendar
				 * @type number
				 */
				this.cycleYear = MathUtils.amod(this.year, 60); 

				/**
				 * The day of the year. Ranges from 1 to 384.
				 * @type number
				 */
				this.dayOfYear = parseInt(params.dayOfYear, 10);
	
				if (typeof(params.dst) === 'boolean') {
					this.dst = params.dst;
				}
				
				this.newRd({
					cal: this.cal,
					cycle: this.cycle,
					year: this.year,
					month: this.month,
					day: this.day,
					hour: this.hour,
					minute: this.minute,
					second: this.second,
					millisecond: this.millisecond,
					sync: params && typeof(params.sync) === 'boolean' ? params.sync : true,
					loadParams: params && params.loadParams,
					callback: ilib.bind(this, function (rd) {
						if (rd) {
							this.rd = rd;
							
							// add the time zone offset to the rd to convert to UTC
							if (!this.tz) {
								this.tz = new TimeZone({id: this.timezone});
							}
							// getOffsetMillis requires that this.year, this.rd, and this.dst 
							// are set in order to figure out which time zone rules apply and 
							// what the offset is at that point in the year
							this.offset = this.tz._getOffsetMillisWallTime(this) / 86400000;
							if (this.offset !== 0) {
								this.rd = this.newRd({
									cal: this.cal,
									rd: this.rd.getRataDie() - this.offset
								});
								this._calcLeap();
							} else {
								// re-use the derived properties from the RD calculations
								this.leapMonth = this.rd.leapMonth;
								this.priorLeapMonth = this.rd.priorLeapMonth;
								this.leapYear = this.rd.leapYear;
							}
						}
						
						if (!this.rd) {
							this.rd = this.newRd(JSUtils.merge(params || {}, {
								cal: this.cal
							}));
							this._calcDateComponents();
						}
						
						if (params && typeof(params.onLoad) === 'function') {
							params.onLoad(this);
						}
					})
				});
			} else {
				if (!this.rd) {
					this.rd = this.newRd(JSUtils.merge(params || {}, {
						cal: this.cal
					}));
					this._calcDateComponents();
				}
				
				if (params && typeof(params.onLoad) === 'function') {
					params.onLoad(this);
				}
			}
		})
	});

};

HanDate.prototype = new IDate({noinstance: true});
HanDate.prototype.parent = IDate;
HanDate.prototype.constructor = HanDate;

/**
 * Return a new RD for this date type using the given params.
 * @protected
 * @param {Object=} params the parameters used to create this rata die instance
 * @returns {RataDie} the new RD instance for the given params
 */
HanDate.prototype.newRd = function (params) {
	return new HanRataDie(params);
};

/**
 * Return the year for the given RD
 * @protected
 * @param {number} rd RD to calculate from 
 * @returns {number} the year for the RD
 */
HanDate.prototype._calcYear = function(rd) {
	var gregdate = new GregorianDate({
		rd: rd,
		timezone: this.timezone
	});
	var hanyear = gregdate.year + 2697;
	var newYears = this.cal.newYears(hanyear);
	return hanyear - ((rd + RataDie.gregorianEpoch < newYears) ? 1 : 0);
};

/** 
 * @private 
 * Calculate the leap year and months from the RD.
 */
HanDate.prototype._calcLeap = function() {
	var jd = this.rd.getRataDie() + RataDie.gregorianEpoch;
	
	var calc = HanCal._leapYearCalc(this.year);
	var m2 = HanCal._newMoonOnOrAfter(calc.m1+1);
	this.leapYear = Math.round((calc.m2 - calc.m1) / 29.530588853000001) === 12;
	
	var newYears = (this.leapYear &&
		(HanCal._noMajorST(calc.m1) || HanCal._noMajorST(m2))) ?
				HanCal._newMoonOnOrAfter(m2+1) : m2;
	
	var m = HanCal._newMoonBefore(jd + 1);
	this.priorLeapMonth = HanRataDie._priorLeapMonth(newYears, HanCal._newMoonBefore(m));
	this.leapMonth = (this.leapYear && HanCal._noMajorST(m) && !this.priorLeapMonth);
};

/**
 * @private
 * Calculate date components for the given RD date.
 */
HanDate.prototype._calcDateComponents = function () {
	var remainder,
		jd = this.rd.getRataDie() + RataDie.gregorianEpoch;

	// console.log("HanDate._calcDateComponents: calculating for jd " + jd);

	if (typeof(this.offset) === "undefined") {
		// now offset the jd by the time zone, then recalculate in case we were 
		// near the year boundary
		if (!this.tz) {
			this.tz = new TimeZone({id: this.timezone});
		}
		this.offset = this.tz.getOffsetMillis(this) / 86400000;
	}
	
	if (this.offset !== 0) {
		jd += this.offset;
	}

	// use the Gregorian calendar objects as a convenient way to short-cut some
	// of the date calculations
	
	var gregyear = GregorianDate._calcYear(this.rd.getRataDie());
	this.year = gregyear + 2697;
	var calc = HanCal._leapYearCalc(this.year);
	var m2 = HanCal._newMoonOnOrAfter(calc.m1+1);
	this.leapYear = Math.round((calc.m2 - calc.m1) / 29.530588853000001) === 12;
	var newYears = (this.leapYear &&
		(HanCal._noMajorST(calc.m1) || HanCal._noMajorST(m2))) ?
				HanCal._newMoonOnOrAfter(m2+1) : m2;
	
	// See if it's between Jan 1 and the Chinese new years of that Gregorian year. If
	// so, then the Han year is actually the previous one
	if (jd < newYears) {
		this.year--;
		calc = HanCal._leapYearCalc(this.year);
		m2 = HanCal._newMoonOnOrAfter(calc.m1+1);
		this.leapYear = Math.round((calc.m2 - calc.m1) / 29.530588853000001) === 12;
		newYears = (this.leapYear &&
			(HanCal._noMajorST(calc.m1) || HanCal._noMajorST(m2))) ?
					HanCal._newMoonOnOrAfter(m2+1) : m2;
	}
	// month is elapsed month, not the month number + leap month boolean
	var m = HanCal._newMoonBefore(jd + 1);
	this.month = Math.round((m - calc.m1) / 29.530588853000001);
	
	this.priorLeapMonth = HanRataDie._priorLeapMonth(newYears, HanCal._newMoonBefore(m));
	this.leapMonth = (this.leapYear && HanCal._noMajorST(m) && !this.priorLeapMonth);
	
	this.cycle = Math.floor((this.year - 1) / 60);
	this.cycleYear = MathUtils.amod(this.year, 60);
	this.day = Astro._floorToJD(jd) - m + 1;

	/*
	console.log("HanDate._calcDateComponents: year is " + this.year);
	console.log("HanDate._calcDateComponents: isLeapYear is " + this.leapYear);
	console.log("HanDate._calcDateComponents: cycle is " + this.cycle);
	console.log("HanDate._calcDateComponents: cycleYear is " + this.cycleYear);
	console.log("HanDate._calcDateComponents: month is " + this.month);
	console.log("HanDate._calcDateComponents: isLeapMonth is " + this.leapMonth);
	console.log("HanDate._calcDateComponents: day is " + this.day);
	*/

	// floor to the start of the julian day
	remainder = jd - Astro._floorToJD(jd);
	
	// console.log("HanDate._calcDateComponents: time remainder is " + remainder);
	
	// now convert to milliseconds for the rest of the calculation
	remainder = Math.round(remainder * 86400000);
	
	this.hour = Math.floor(remainder/3600000);
	remainder -= this.hour * 3600000;
	
	this.minute = Math.floor(remainder/60000);
	remainder -= this.minute * 60000;
	
	this.second = Math.floor(remainder/1000);
	remainder -= this.second * 1000;
	
	this.millisecond = remainder;
};

/**
 * Return the year within the Chinese cycle of this date. Cycles are 60 
 * years long, and the value returned from this method is the number of the year 
 * within this cycle. The year returned from getYear() is the total elapsed 
 * years since the beginning of the Chinese epoch and does not include 
 * the cycles. 
 * 
 * @return {number} the year within the current Chinese cycle
 */
HanDate.prototype.getCycleYears = function() {
	return this.cycleYear;
};

/**
 * Return the Chinese cycle number of this date. Cycles are 60 years long,
 * and the value returned from getCycleYear() is the number of the year 
 * within this cycle. The year returned from getYear() is the total elapsed 
 * years since the beginning of the Chinese epoch and does not include 
 * the cycles. 
 * 
 * @return {number} the current Chinese cycle
 */
HanDate.prototype.getCycles = function() {
	return this.cycle;
};

/**
 * Return whether the year of this date is a leap year in the Chinese Han 
 * calendar. 
 * 
 * @return {boolean} true if the year of this date is a leap year in the 
 * Chinese Han calendar. 
 */
HanDate.prototype.isLeapYear = function() {
	return this.leapYear;
};

/**
 * Return whether the month of this date is a leap month in the Chinese Han 
 * calendar.
 * 
 * @return {boolean} true if the month of this date is a leap month in the 
 * Chinese Han calendar.
 */
HanDate.prototype.isLeapMonth = function() {
	return this.leapMonth;
};

/**
 * Return the day of the week of this date. The day of the week is encoded
 * as number from 0 to 6, with 0=Sunday, 1=Monday, etc., until 6=Saturday.
 * 
 * @return {number} the day of the week
 */
HanDate.prototype.getDayOfWeek = function() {
	var rd = Math.floor(this.rd.getRataDie() + (this.offset || 0));
	return MathUtils.mod(rd, 7);
};

/**
 * Return the ordinal day of the year. Days are counted from 1 and proceed linearly up to 
 * 365, regardless of months or weeks, etc. That is, Farvardin 1st is day 1, and 
 * December 31st is 365 in regular years, or 366 in leap years.
 * @return {number} the ordinal day of the year
 */
HanDate.prototype.getDayOfYear = function() {
	var newYears = this.cal.newYears(this.year);
	var priorNewMoon = HanCal._newMoonOnOrAfter(newYears + (this.month -1) * 29);
	return priorNewMoon - newYears + this.day;
};

/**
 * Return the era for this date as a number. The value for the era for Han 
 * calendars is -1 for "before the han era" (BP) and 1 for "the han era" (anno 
 * persico or AP). 
 * BP dates are any date before Farvardin 1, 1 AP. In the proleptic Han calendar, 
 * there is a year 0, so any years that are negative or zero are BP.
 * @return {number} 1 if this date is in the common era, -1 if it is before the 
 * common era 
 */
HanDate.prototype.getEra = function() {
	return (this.year < 1) ? -1 : 1;
};

/**
 * Return the name of the calendar that governs this date.
 * 
 * @return {string} a string giving the name of the calendar
 */
HanDate.prototype.getCalendar = function() {
	return "han";
};

// register with the factory method
IDate._constructors["han"] = HanDate;

module.exports = HanDate;
},{'./ilib.js':'enyo-ilib/ilib','./JSUtils.js':'enyo-ilib/JSUtils','./MathUtils.js':'enyo-ilib/MathUtils','./Locale.js':'enyo-ilib/Locale','./LocaleInfo.js':'enyo-ilib/LocaleInfo','./IDate.js':'enyo-ilib/IDate','./TimeZone.js':'enyo-ilib/TimeZone','./Calendar.js':'enyo-ilib/Calendar','./Astro.js':'enyo-ilib/Astro','./HanCal.js':'enyo-ilib/HanCal','./GregorianDate.js':'enyo-ilib/GregorianDate','./HanRataDie.js':'enyo-ilib/HanRataDie','./RataDie.js':'enyo-ilib/RataDie'}],'enyo-ilib/PersianDate':[function (module,exports,global,require,request){
/*
 * PersianDate.js - Represent a date in the Persian astronomical (Hijjri) calendar
 * 
 * Copyright © 2014-2015, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* !depends 
ilib.js
Locale.js
TimeZone.js
IDate.js
PersRataDie.js
PersianCal.js 
SearchUtils.js
MathUtils.js
LocaleInfo.js 
Astro.js
*/

// !data astro

var ilib = require("./ilib.js");
var SearchUtils = require("./SearchUtils.js");
var MathUtils = require("./MathUtils.js");

var Locale = require("./Locale.js");
var LocaleInfo = require("./LocaleInfo.js");
var TimeZone = require("./TimeZone.js");
var IDate = require("./IDate.js");
var Calendar = require("./Calendar.js");

var Astro = require("./Astro.js");
var PersianCal = require("./PersianCal.js");
var PersRataDie = require("./PersRataDie.js");

/**
 * @class
 * 
 * Construct a new Persian astronomical date object. The constructor parameters can 
 * contain any of the following properties:
 * 
 * <ul>
 * <li><i>unixtime<i> - sets the time of this instance according to the given 
 * unix time. Unix time is the number of milliseconds since midnight on Jan 1, 1970, Gregorian
 * 
 * <li><i>julianday</i> - sets the time of this instance according to the given
 * Julian Day instance or the Julian Day given as a float
 * 
 * <li><i>year</i> - any integer, including 0
 * 
 * <li><i>month</i> - 1 to 12, where 1 means Farvardin, 2 means Ordibehesht, etc.
 * 
 * <li><i>day</i> - 1 to 31
 * 
 * <li><i>hour</i> - 0 to 23. A formatter is used to display 12 hour clocks, but this representation 
 * is always done with an unambiguous 24 hour representation
 * 
 * <li><i>minute</i> - 0 to 59
 * 
 * <li><i>second</i> - 0 to 59
 * 
 * <li><i>millisecond</i> - 0 to 999
 * 
 * <li><i>timezone</i> - the TimeZone instance or time zone name as a string 
 * of this persian date. The date/time is kept in the local time. The time zone
 * is used later if this date is formatted according to a different time zone and
 * the difference has to be calculated, or when the date format has a time zone
 * component in it.
 * 
 * <li><i>locale</i> - locale for this persian date. If the time zone is not 
 * given, it can be inferred from this locale. For locales that span multiple
 * time zones, the one with the largest population is chosen as the one that 
 * represents the locale.
 * 
 * <li><i>date</i> - use the given intrinsic Javascript date to initialize this one.
 * </ul>
 *
 * If the constructor is called with another Persian date instance instead of
 * a parameter block, the other instance acts as a parameter block and its
 * settings are copied into the current instance.<p>
 * 
 * If the constructor is called with no arguments at all or if none of the 
 * properties listed above 
 * from <i>unixtime</i> through <i>millisecond</i> are present, then the date 
 * components are 
 * filled in with the current date at the time of instantiation. Note that if
 * you do not give the time zone when defaulting to the current time and the 
 * time zone for all of ilib was not set with <i>ilib.setTimeZone()</i>, then the
 * time zone will default to UTC ("Universal Time, Coordinated" or "Greenwich 
 * Mean Time").<p>
 * 
 * If any of the properties from <i>year</i> through <i>millisecond</i> are not
 * specified in the params, it is assumed that they have the smallest possible
 * value in the range for the property (zero or one).<p>
 * 
 * 
 * @constructor
 * @extends IDate
 * @param {Object=} params parameters that govern the settings and behaviour of this Persian date
 */
var PersianDate = function(params) {
	this.cal = new PersianCal();
	this.timezone = "local";
	
	if (params) {
		if (params.locale) {
			this.locale = (typeof(params.locale) === 'string') ? new Locale(params.locale) : params.locale;
			var li = new LocaleInfo(this.locale);
			this.timezone = li.getTimeZone(); 
		}
		if (params.timezone) {
			this.timezone = params.timezone;
		}
	}
	
	Astro.initAstro(
		params && typeof(params.sync) === 'boolean' ? params.sync : true,
		params && params.loadParams,
		ilib.bind(this, function (x) {
			if (params && (params.year || params.month || params.day || params.hour ||
					params.minute || params.second || params.millisecond)) {
				/**
				 * Year in the Persian calendar.
				 * @type number
				 */
				this.year = parseInt(params.year, 10) || 0;

				/**
				 * The month number, ranging from 1 to 12
				 * @type number
				 */
				this.month = parseInt(params.month, 10) || 1;

				/**
				 * The day of the month. This ranges from 1 to 31.
				 * @type number
				 */
				this.day = parseInt(params.day, 10) || 1;
				
				/**
				 * The hour of the day. This can be a number from 0 to 23, as times are
				 * stored unambiguously in the 24-hour clock.
				 * @type number
				 */
				this.hour = parseInt(params.hour, 10) || 0;

				/**
				 * The minute of the hours. Ranges from 0 to 59.
				 * @type number
				 */
				this.minute = parseInt(params.minute, 10) || 0;

				/**
				 * The second of the minute. Ranges from 0 to 59.
				 * @type number
				 */
				this.second = parseInt(params.second, 10) || 0;

				/**
				 * The millisecond of the second. Ranges from 0 to 999.
				 * @type number
				 */
				this.millisecond = parseInt(params.millisecond, 10) || 0;
				
				/**
				 * The day of the year. Ranges from 1 to 366.
				 * @type number
				 */
				this.dayOfYear = parseInt(params.dayOfYear, 10);

				if (typeof(params.dst) === 'boolean') {
					this.dst = params.dst;
				}
				
				this.rd = this.newRd(this);
				
				// add the time zone offset to the rd to convert to UTC
				if (!this.tz) {
					this.tz = new TimeZone({id: this.timezone});
				}
				// getOffsetMillis requires that this.year, this.rd, and this.dst 
				// are set in order to figure out which time zone rules apply and 
				// what the offset is at that point in the year
				this.offset = this.tz._getOffsetMillisWallTime(this) / 86400000;
				if (this.offset !== 0) {
					this.rd = this.newRd({
						rd: this.rd.getRataDie() - this.offset
					});
				}
			}
			
			if (!this.rd) {
				this.rd = this.newRd(params);
				this._calcDateComponents();
			}
			
			if (params && typeof(params.onLoad) === 'function') {
				params.onLoad(this);
			}
		})
	);
};

PersianDate.prototype = new IDate({noinstance: true});
PersianDate.prototype.parent = IDate;
PersianDate.prototype.constructor = PersianDate;

/**
 * @private
 * @const
 * @type Array.<number>
 * the cumulative lengths of each month, for a non-leap year 
 */
PersianDate.cumMonthLengths = [
    0,    // Farvardin
	31,   // Ordibehesht
	62,   // Khordad
	93,   // Tir
	124,  // Mordad
	155,  // Shahrivar
	186,  // Mehr
	216,  // Aban
	246,  // Azar
	276,  // Dey
	306,  // Bahman
	336,  // Esfand
	366
];

/**
 * Return a new RD for this date type using the given params.
 * @protected
 * @param {Object=} params the parameters used to create this rata die instance
 * @returns {RataDie} the new RD instance for the given params
 */
PersianDate.prototype.newRd = function (params) {
	return new PersRataDie(params);
};

/**
 * Return the year for the given RD
 * @protected
 * @param {number} rd RD to calculate from 
 * @returns {number} the year for the RD
 */
PersianDate.prototype._calcYear = function(rd) {
	var julianday = rd + this.rd.epoch;
	return this.rd._getYear(julianday).year;
};

/**
 * @private
 * Calculate date components for the given RD date.
 */
PersianDate.prototype._calcDateComponents = function () {
	var remainder,
		rd = this.rd.getRataDie();
	
	this.year = this._calcYear(rd);
	
	if (typeof(this.offset) === "undefined") {
		// now offset the RD by the time zone, then recalculate in case we were 
		// near the year boundary
		if (!this.tz) {
			this.tz = new TimeZone({id: this.timezone});
		}
		this.offset = this.tz.getOffsetMillis(this) / 86400000;
	}
	
	if (this.offset !== 0) {
		rd += this.offset;
		this.year = this._calcYear(rd);
	}
	
	//console.log("PersDate.calcComponent: calculating for rd " + rd);
	//console.log("PersDate.calcComponent: year is " + ret.year);
	var yearStart = this.newRd({
		year: this.year,
		month: 1,
		day: 1,
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0
	});
	remainder = rd - yearStart.getRataDie() + 1;
	
	this.dayOfYear = remainder;
	
	//console.log("PersDate.calcComponent: remainder is " + remainder);
	
	this.month = SearchUtils.bsearch(Math.floor(remainder), PersianDate.cumMonthLengths);
	remainder -= PersianDate.cumMonthLengths[this.month-1];
	
	//console.log("PersDate.calcComponent: month is " + this.month + " and remainder is " + remainder);
	
	this.day = Math.floor(remainder);
	remainder -= this.day;
	
	//console.log("PersDate.calcComponent: day is " + this.day + " and remainder is " + remainder);
	
	// now convert to milliseconds for the rest of the calculation
	remainder = Math.round(remainder * 86400000);
	
	this.hour = Math.floor(remainder/3600000);
	remainder -= this.hour * 3600000;
	
	this.minute = Math.floor(remainder/60000);
	remainder -= this.minute * 60000;
	
	this.second = Math.floor(remainder/1000);
	remainder -= this.second * 1000;
	
	this.millisecond = remainder;
};

/**
 * Return the day of the week of this date. The day of the week is encoded
 * as number from 0 to 6, with 0=Sunday, 1=Monday, etc., until 6=Saturday.
 * 
 * @return {number} the day of the week
 */
PersianDate.prototype.getDayOfWeek = function() {
	var rd = Math.floor(this.getRataDie());
	return MathUtils.mod(rd-3, 7);
};

/**
 * Return the ordinal day of the year. Days are counted from 1 and proceed linearly up to 
 * 365, regardless of months or weeks, etc. That is, Farvardin 1st is day 1, and 
 * December 31st is 365 in regular years, or 366 in leap years.
 * @return {number} the ordinal day of the year
 */
PersianDate.prototype.getDayOfYear = function() {
	return PersianDate.cumMonthLengths[this.month-1] + this.day;
};

/**
 * Return the era for this date as a number. The value for the era for Persian 
 * calendars is -1 for "before the persian era" (BP) and 1 for "the persian era" (anno 
 * persico or AP). 
 * BP dates are any date before Farvardin 1, 1 AP. In the proleptic Persian calendar, 
 * there is a year 0, so any years that are negative or zero are BP.
 * @return {number} 1 if this date is in the common era, -1 if it is before the 
 * common era 
 */
PersianDate.prototype.getEra = function() {
	return (this.year < 1) ? -1 : 1;
};

/**
 * Return the name of the calendar that governs this date.
 * 
 * @return {string} a string giving the name of the calendar
 */
PersianDate.prototype.getCalendar = function() {
	return "persian";
};

// register with the factory method
IDate._constructors["persian"] = PersianDate;

module.exports = PersianDate;
},{'./ilib.js':'enyo-ilib/ilib','./SearchUtils.js':'enyo-ilib/SearchUtils','./MathUtils.js':'enyo-ilib/MathUtils','./Locale.js':'enyo-ilib/Locale','./LocaleInfo.js':'enyo-ilib/LocaleInfo','./TimeZone.js':'enyo-ilib/TimeZone','./IDate.js':'enyo-ilib/IDate','./Calendar.js':'enyo-ilib/Calendar','./Astro.js':'enyo-ilib/Astro','./PersianCal.js':'enyo-ilib/PersianCal','./PersRataDie.js':'enyo-ilib/PersRataDie'}],'../src/dates':[function (module,exports,global,require,request){
// ilib doesn't load the non-Gregorian calendars and dates initially. To ensure they are packaged
// by enyo-dev, we've added explicit requires for each Date (which in turn requires the relevant
// Calendar). This is only necessary for builds not using the library-mode build of enyo-ilib which
// would have included everything

require('../ilib/lib/GregorianDate');   // not required (rimshot) but included for completeness
require('../ilib/lib/CopticDate');
require('../ilib/lib/EthiopicDate');
require('../ilib/lib/GregorianDate');
require('../ilib/lib/HanDate');
require('../ilib/lib/HebrewDate');
require('../ilib/lib/IslamicDate');
require('../ilib/lib/JulianDate');
require('../ilib/lib/PersianDate');
require('../ilib/lib/PersianAlgoDate');
require('../ilib/lib/ThaiSolarDate');
},{'../ilib/lib/GregorianDate':'enyo-ilib/GregorianDate','../ilib/lib/CopticDate':'enyo-ilib/CopticDate','../ilib/lib/EthiopicDate':'enyo-ilib/EthiopicDate','../ilib/lib/HanDate':'enyo-ilib/HanDate','../ilib/lib/HebrewDate':'enyo-ilib/HebrewDate','../ilib/lib/IslamicDate':'enyo-ilib/IslamicDate','../ilib/lib/JulianDate':'enyo-ilib/JulianDate','../ilib/lib/PersianDate':'enyo-ilib/PersianDate','../ilib/lib/PersianAlgoDate':'enyo-ilib/PersianAlgoDate','../ilib/lib/ThaiSolarDate':'enyo-ilib/ThaiSolarDate'}],'../src/glue':[function (module,exports,global,require,request){
/*
 * glue.js - glue code to fit ilib into enyo
 *
 * Copyright © 2013-2014 LG Electronics, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var
	dom = require('enyo/dom'),
	i18n = require('enyo/i18n'),
	platform = require('enyo/platform'),
	utils = require('enyo/utils'),
	Ajax = require('enyo/Ajax'),
	Control = require('enyo/Control');

var
	ilib = require('../ilib/lib/ilib'),
	CaseMapper = require('../ilib/lib/CaseMapper'),
	ResBundle = require('../ilib/lib/ResBundle'),
	Loader = require('../ilib/lib/Loader'),
	Locale = require('../ilib/lib/Locale'),
	LocaleInfo = require('../ilib/lib/LocaleInfo'),
	ScriptInfo = require('../ilib/lib/ScriptInfo'),
	ZoneInfoFile = require('./zoneinfo');

function enyoLoader () {
	this.base = '../moonstone/enyo-ilib/ilib/';
	if (platform.platformName === 'webos') {
		this.webos = true;
	}
};

enyoLoader.prototype = new Loader();
enyoLoader.prototype.constructor = enyoLoader;

enyoLoader.prototype._createZoneFile = function (path) {
	var zone = path.substring(path.indexOf('zoneinfo'));

	// remove the .json suffix to get the name of the zone
	zone = zone.substring(0, zone.length-5);

	try {
		var zif = new ZoneInfoFile('/usr/share/' + zone);

		// only get the info for this year. Later we can get the info
		// for any historical or future year too
		return zif.getIlibZoneInfo(new Date());
	} catch (e) {
		// no file, so just return nothing
		return undefined;
	}
};

enyoLoader.prototype._pathjoin = function (root, subpath) {
	if (!root || !root.length) {
		return subpath;
	}
	if (!subpath || !subpath.length) {
		return root;
	}
	return root + (root.charAt(root.length-1) !== '/' ? '/' : '') + subpath;
};

/**
 * Load the list of files asynchronously. This uses recursion in
 * order to create a queue of files that will be loaded serially.
 * Each layer, starting at the bottom, loads a file and then loads
 * the layer on top of it. The very top file on the stack will have
 * zero files to load, so instead it will be the one to call the
 * callback to notify the caller that all the content is loaded.
 *
 * @param {Object} context function to call this method in the context of
 * @param {Array.<string>} paths array of strings containing relative paths for required locale data files
 * @param {Array} results empty array in which to place the resulting json when it is loaded from a file
 * @param {Object} params An object full of parameters that the caller is passing to this function to help load the files
 * @param {function(Array.<Object>)} callback callback to call when this function is finished attempting
 * to load all the files that exist and can be loaded
 */
enyoLoader.prototype._loadFilesAsync = function (context, paths, results, params, callback) {
	var root = 'resources';
	if (params && typeof(params.root) !== 'undefined') {
		root = params.root;
	}
	if (paths.length > 0) {
		var path = paths.shift(),
			url;

		if (this.webos && path.indexOf('zoneinfo') !== -1) {
			results.push(this._createZoneFile(path));
		} else {
			if (this.isAvailable(root, path)) {
				url = this._pathjoin(root, path);
			} else if (this.isAvailable(this.base + 'locale', path)) {
				url = this._pathjoin(this._pathjoin(this.base, 'locale'), path);
			}

			var resultFunc = function(inSender, json) {
                // console.log('enyo-ilib/glue: ' + (!inSender.failed && json ? 'success' : 'failed'));
				results.push(!inSender.failed && (typeof(json) === 'object') ? json : undefined);
				if (paths.length > 0) {
					this._loadFilesAsync(context, paths, results, params, callback);
				} else {
					// only the bottom item on the stack will call
					// the callback
					callback.call(context, results);
				}
			};

			if (url) {
				var ajax = new Ajax({
					url: url,
					cacheBust: false
				});
				// console.log('enyo-ilib/glue: browser/async: attempting to load ' + url);
				ajax.response(this, resultFunc);
				ajax.error(this, resultFunc);
				ajax.go();
			} else {
				// nothing to load, so go to the next file
				resultFunc({}, undefined);
			}
		}
	}
};

enyoLoader.prototype.loadFiles = function(paths, sync, params, callback) {
	if (sync) {
		var ret = [];
		var root = 'resources';
		var locdata = this._pathjoin(this.base, 'locale');
		if (params && typeof(params.root) !== 'undefined') {
			root = params.root;
		}
		// synchronous
		utils.forEach(paths, function (path) {
			if (this.webos && path.indexOf('zoneinfo') !== -1) {
				ret.push(this._createZoneFile(path));
			} else {
				var found = false;

				var handler = function(inSender, json) {
                    // console.log((!inSender.failed && json ? 'success' : 'failed'));
					if (!inSender.failed && typeof(json) === 'object') {
						ret.push(json);
						found = true;
					}
				};

				// console.log('browser/sync: attempting to load lib/enyo-ilib/ilib/locale/' + path);
				if (this.isAvailable(root, path)) {
					var ajax = new Ajax({
						url: this._pathjoin(root, path),
						sync: true,
						cacheBust: false
					});

					ajax.response(this, handler);
					ajax.error(this, handler);
					ajax.go();
				}

				if (!found && this.isAvailable(locdata, path)) {
					var ajax = new Ajax({
						url: this._pathjoin(locdata, path),
						sync: true,
						cacheBust: false
					});

					ajax.response(this, handler);
					ajax.error(this, handler);
					ajax.go();
				}

				if (!found) {
					// not there, so fill in a blank entry in the array
					ret.push(undefined);
				}
			}
		}, this);

		if (typeof(callback) === 'function') {
			callback.call(this, ret);
		}
		return ret;
	}

	// asynchronous
	var results = [];
	this._loadFilesAsync(this, paths, results, params, callback);
};

enyoLoader.prototype._loadManifest = function (root, subpath) {
	if (!this.manifest) {
		this.manifest = {};
	}

	var dirpath = this._pathjoin(root, subpath);
	var filepath = this._pathjoin(dirpath, 'ilibmanifest.json');

	// util.print('enyo loader: loading manifest ' + filepath + '\n');
	var ajax = new Ajax({
		url: filepath,
		sync: true,
		cacheBust: false,
		handleAs: 'json'
	});

	var handler = function(inSender, json) {
        // console.log((!inSender.failed && json ? 'success' : 'failed'));
		// star indicates there was no ilibmanifest.json, so always try to load files from that dir
		this.manifest[dirpath] = (!inSender.failed && typeof(json) === 'object') ? json.files : '*';
	};

	ajax.response(this, handler);
	ajax.error(this, handler);
	ajax.go();
},

enyoLoader.prototype._loadStandardManifests = function() {
	// util.print('enyo loader: load manifests\n');
	if (!this.manifest) {
		this._loadManifest(this.base, 'locale'); // standard ilib locale data
		this._loadManifest('', 'resources');     // the app's resources dir
	}
};
enyoLoader.prototype.listAvailableFiles = function() {
	// util.print('enyo loader: list available files called\n');
	this._loadStandardManifests();
	return this.manifest;
};
enyoLoader.prototype.isAvailable = function(root, path) {
	this._loadStandardManifests();

	if (!this.manifest[root]) {
		// maybe it's a custom root? If so, try to load
		// the manifest file first in case it is there
		this._loadManifest(root, '');
	}

	// util.print('enyo loader: isAvailable ' + path + '? ');
	// star means attempt to load everything because there was no manifest in that dir
	if (this.manifest[root] === '*' || utils.indexOf(this.manifest[root], path) !== -1) {
		// util.print('true\n');
		return true;
	}

	// util.print('false\n');
	return false;
};

ilib.setLoaderCallback(new enyoLoader());

if (typeof(window.UILocale) !== 'undefined') {
	// this is a hack until GF-1581 is fixed
	ilib.setLocale(window.UILocale);
}

/*
 * Tell whether or not the given locale is considered a non-Latin locale for webOS purposes. This controls
 * which fonts are used in various places to show the various languages. An undefined spec parameter means
 * to test the current locale.
 *
 * @param {ilib.Locale|string|undefined} spec locale specifier or locale object of the locale to test, or undefined
 * to test the current locale
 */
function isNonLatinLocale (spec) {
	var li = new LocaleInfo(spec),
		locale = li.getLocale();

    // We use the non-latin fonts for these languages (even though their scripts are technically considered latin)
    var nonLatinLanguageOverrides = ['ha', 'hu', 'vi', 'en-JP'];
    // We use the latin fonts (with non-Latin fallback) for these languages (even though their scripts are non-latin)
    var latinLanguageOverrides = ['ko'];
	return (
		(
			li.getScript() !== 'Latn' ||                                              // the language actually is non-latin
			utils.indexOf(locale.getLanguage(), nonLatinLanguageOverrides) !== -1 ||  // the language is treated as non-latin
			utils.indexOf(locale.toString(), nonLatinLanguageOverrides) !== -1        // the combination of language and region is treated as non-latin
		) && (
			utils.indexOf(locale.getLanguage(), latinLanguageOverrides) < 0           // the non-latin language should be treated as latin
		)
	);
}

// enyo.updateI18NClasses should be called after every setLocale, but there isn't such a callback in current version
function updateI18NClasses () {
    var li = new LocaleInfo(); // for the current locale
    var locale = li.getLocale();
	var base = 'enyo-locale-';

    // Remove old style definitions (hack style becouse enyo.dom doesn't have methods like enyo.dom.getBodyClasses, enyo.dom.removeBodyClass)
    if (document && document.body && document.body.className) {
        document.body.className = document.body.className.replace(new RegExp('(^|\\s)'+ base +'\\S*', 'g'), '');
    }

	if (isNonLatinLocale(locale)) {
		// allow enyo to define other fonts for non-Latin languages, or for certain
		// Latin-based languages where the characters with some accents don't appear in the
		// regular fonts, creating a strange 'ransom note' look with a mix of fonts in the
		// same word. So, treat it like a non-Latin language in order to get all the characters
		// to display with the same font.
		dom.addBodyClass(base + 'non-latin');
	}

	var scriptName = li.getScript();
	if (scriptName !== 'Latn' && scriptName !== 'Cyrl' && scriptName !== 'Grek') {
		// GF-45884: allow enyo to avoid setting italic fonts for those scripts that do not
		// commonly use italics
		dom.addBodyClass(base + 'non-italic');
	}

	// allow enyo to apply right-to-left styles to the app and widgets if necessary
	var script = new ScriptInfo(scriptName);
	if (script.getScriptDirection() === 'rtl') {
		dom.addBodyClass(base + 'right-to-left');
		Control.prototype.rtl = true;
	} else {
		Control.prototype.rtl = false;
	}

	// allow enyo or the apps to give CSS classes that are specific to the language, country, or script
	if (locale.getLanguage()) {
		dom.addBodyClass(base + locale.getLanguage());
		if (locale.getScript()) {
			dom.addBodyClass(base + locale.getLanguage() + '-' + locale.getScript());
			if (locale.getRegion()) {
				dom.addBodyClass(base + locale.getLanguage() + '-' + locale.getScript() + '-' + locale.getRegion());
			}
		} else if (locale.getRegion()) {
			dom.addBodyClass(base + locale.getLanguage() + '-' + locale.getRegion());
		}
	}
	if (locale.getScript()) {
		dom.addBodyClass(base + locale.getScript());
	}
	if (locale.getRegion()) {
		dom.addBodyClass(base + locale.getRegion());
	}
	// Recreate the case mappers to use the just-recently-set locale
 	setCaseMappers();
}

// The ilib.ResBundle for the active locale used by $L
var resBundle;

/*
 * Reset the $L function to use ilib instead of the dummy function that enyo
 * comes with by default.
 */
i18n.$L.extend(function (sup) {
	return function (string) {
		var str;
		if (!resBundle) setLocale();
		if (typeof(string) === 'string') {
			str = resBundle ? resBundle.getString(string) : string;
		} else if (typeof(string) === 'object') {
			if (typeof(string.key) !== 'undefined' && typeof(string.value) !== 'undefined') {
				str = resBundle ? resBundle.getString(string.value, string.key) : string.value;
			} else {
				str = '';
			}
		} else {
			str = string;
		}
		return sup.call(this, str.toString());
	};
});

/**
 * Set the locale for the strings that $L loads. This may reload the
 * string resources if necessary.
 * @param {string} spec the locale specifier
 */
function setLocale (spec) {
	var locale = new Locale(spec);
	if (!resBundle || spec !== resBundle.getLocale().getSpec()) {
		resBundle = i18n.$L.rb = new ResBundle({
			locale: locale,
			type: 'html',
			name: 'strings',
			sync: true,
			lengthen: true		// if pseudo-localizing, this tells it to lengthen strings
		});
	}
}

var toLowerCaseMapper, toUpperCaseMapper;

/**
 * Set CaseMapper object references to ilib's current locale (its most recently set, by default)
 */
function setCaseMappers () {
	toLowerCaseMapper = new CaseMapper({direction: 'tolower'});
	toUpperCaseMapper = new CaseMapper({direction: 'toupper'});
}

/**
 * Override Enyo's toLowerCase and toUpperCase methods with these fancy ones
 * that call iLib's locale-safe case mapper.
 */
utils.toLowerCase.extend(function (sup) {
	return function (inString) {
		if (inString != null) {
			return toLowerCaseMapper.map(inString.toString());
		}
		return inString;
	};
});
utils.toUpperCase.extend(function (sup) {
	return function (inString) {
		if (inString != null) {
			return toUpperCaseMapper.map(inString.toString());
		}
		return inString;
	};
});

/**
 * This Enyo hook lets us know that the system locale has changed and gives
 * us a chance to update the iLib locale before Enyo broadcasts its
 * `onlocalechange` signal.
 * Provide an inLocale string, like 'en-US' or 'ja-JP', to conveniently set
 * that locale immediately. Provide nothing, and reset the locale back to the
 * browser's default language.
 */
i18n.updateLocale.extend(function (sup) {
	return function(inLocale) {
		// blow away the cache to force it to reload the manifest files for the new app
		if (ilib._load) ilib._load.manifest = undefined;
		// ilib handles falsy values and automatically uses local locale when encountered which
		// is expected and desired
		ilib.setLocale(inLocale);
		// we supply whatever ilib determined was actually the locale based on what was passed in
		setLocale(ilib.getLocale());
		updateI18NClasses();
		sup.call(this);
	};
});

/**
 * Invalidates the current locale's resource bundle, allowing for it to be reloaded.
 */
function invalidateResources() {
	delete ResBundle.strings;
	resBundle = i18n.$L.rb = undefined;
}

// we go ahead and run this once during loading of iLib settings are valid
// during the loads of later libraries.
i18n.updateLocale(null, true);

module.exports = {
	updateI18NClasses: updateI18NClasses,
	isNonLatinLocale: isNonLatinLocale,
	invalidateResources: invalidateResources
};

},{'../ilib/lib/ilib':'enyo-ilib/ilib','../ilib/lib/CaseMapper':'enyo-ilib/CaseMapper','../ilib/lib/ResBundle':'enyo-ilib/ResBundle','../ilib/lib/Loader':'enyo-ilib/Loader','../ilib/lib/Locale':'enyo-ilib/Locale','../ilib/lib/LocaleInfo':'enyo-ilib/LocaleInfo','../ilib/lib/ScriptInfo':'enyo-ilib/ScriptInfo','./zoneinfo':'../src/zoneinfo'}],'enyo-ilib':[function (module,exports,global,require,request){
var
	glue = require('./src/glue'),
	ilib = require('./ilib/lib/ilib');

// ensure the locale-specific date types are included
require('./src/dates');

ilib.enyo = glue;
ilib.enyo.version = '2.7.0';

module.exports = ilib;

},{'./src/glue':'../src/glue','./ilib/lib/ilib':'enyo-ilib/ilib','./src/dates':'../src/dates'}]
	};

});
//# sourceMappingURL=enyo-ilib.js.map