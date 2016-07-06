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
	return {'webOS/webOS':[function (module,exports,global,require,request){
!function(){window.webOS=window.webOS||{}}(),function(){if(webOS.platform={},window.PalmSystem)if(navigator.userAgent.indexOf("SmartWatch")>-1)webOS.platform.watch=!0;else if(navigator.userAgent.indexOf("SmartTV")>-1||navigator.userAgent.indexOf("Large Screen")>-1)webOS.platform.tv=!0;else{try{var e=JSON.parse(PalmSystem.deviceInfo||"{}");if(e.platformVersionMajor&&e.platformVersionMinor){var t=parseInt(e.platformVersionMajor),o=parseInt(e.platformVersionMinor);3>t||3==t&&0>=o?webOS.platform.legacy=!0:webOS.platform.open=!0}}catch(i){webOS.platform.open=!0}window.Mojo=window.Mojo||{relaunch:function(e){}},window.PalmSystem&&PalmSystem.stageReady&&PalmSystem.stageReady()}else webOS.platform.unknown=!0}(),function(){webOS.fetchAppId=function(){return window.PalmSystem&&PalmSystem.identifier?PalmSystem.identifier.split(" ")[0]:void 0},webOS.fetchAppInfo=function(e,t){if(webOS.appInfo)e&&e(webOS.appInfo);else{var o=function(t,o){if(!t&&o)try{webOS.appInfo=JSON.parse(o),e&&e(webOS.appInfo)}catch(i){console.error("Unable to parse appinfo.json file for "+appID),e&&e()}else e&&e()},i=new XMLHttpRequest;i.onreadystatechange=function(){4==i.readyState&&(i.status>=200&&i.status<300||0===i.status?o(void 0,i.responseText):o({status:404}))};try{i.open("GET",t||"appinfo.json",!0),i.send(null)}catch(s){o({status:404})}}},webOS.fetchAppRootPath=function(){var e=window.location.href;if("baseURI"in window.document)e=window.document.baseURI;else{var t=window.document.getElementsByTagName("base");t.length>0&&(e=t[0].href)}var o=e.match(new RegExp(".*://[^#]*/"));return o?o[0]:""},webOS.platformBack=function(){return window.PalmSystem&&PalmSystem.platformBack?PalmSystem.platformBack():void 0}}(),function(){webOS.deviceInfo=function(e){if(this.device)e(this.device);else{this.device={};try{var t=JSON.parse(PalmSystem.deviceInfo);this.device.modelName=t.modelName,this.device.modelNameAscii=t.modelNameAscii,this.device.version=t.platformVersion,this.device.versionMajor=t.platformVersionMajor,this.device.versionMinor=t.platformVersionMinor,this.device.versionDot=t.platformVersionDot,this.device.sdkVersion=t.platformVersion,this.device.screenWidth=t.screenWidth,this.device.screenHeight=t.screenHeight}catch(o){this.device.modelName=this.device.modelNameAscii="webOS Device"}this.device.screenHeight=this.device.screenHeight||screen.height,this.device.screenWidth=this.device.screenWidth||screen.width;var i=this;webOS.platform.tv?webOS.service.request("luna://com.webos.service.tv.systemproperty",{method:"getSystemInfo",parameters:{keys:["firmwareVersion","modelName","sdkVersion","UHD"]},onSuccess:function(t){if(i.device.modelName=t.modelName||i.device.modelName,i.device.modelNameAscii=t.modelName||i.device.modelNameAscii,i.device.sdkVersion=t.sdkVersion||i.device.sdkVersion,i.device.uhd="true"===t.UHD,t.firmwareVersion&&"0.0.0"!==t.firmwareVersion||(t.firmwareVersion=t.sdkVersion),t.firmwareVersion){i.device.version=t.firmwareVersion;for(var o=i.device.version.split("."),s=["versionMajor","versionMinor","versionDot"],n=0;n<s.length;n++)try{i.device[s[n]]=parseInt(o[n])}catch(r){i.device[s[n]]=o[n]}}e(i.device)},onFailure:function(t){e(i.device)}}):(webOS.platform.watch&&(this.device.modelName=this.device.modelNameAscii="webOS Watch"),e(this.device))}}}(),function(){webOS.feedback={play:function(e){if(webOS&&webOS.platform&&webOS.platform.watch){var t={name:e||"touch",sink:"pfeedback"};if(!window.PalmServiceBridge)return;webOS.service.request("luna://com.palm.audio/systemsounds",{method:"playFeedback",parameters:t,subscribe:!1,resubscribe:!1})}}}}(),function(){webOS.keyboard={isShowing:function(){return!!(PalmSystem&&PalmSystem.isKeyboardVisible&&PalmSystem.isKeyboardVisible())}}}(),function(){webOS.notification={showToast:function(e,t){var o=e.message||"",i=e.icon||"",s=webOS.fetchAppId(),n=e.appId||s,r=e.appParams||{},a=e.target,c=e.noaction,l=e.stale||!1,m=e.soundClass||"",u=e.soundFile||"",d=e.soundDurationMs||"";if(webOS.platform.legacy||webOS.platform.open){var f=(e.response||{banner:!0},PalmSystem.addBannerMessage(o,JSON.stringify(r),i,m,u,d));t&&t(f)}else{o.length>60&&console.warn("Toast notification message is longer than recommended. May not display as intended");var b={sourceId:s,message:o,stale:l,noaction:c};i&&i.length>0&&(b.iconUrl=i),c||(a?b.onclick={target:a}:b.onclick={appId:n,params:r}),this.showToastRequest=webOS.service.request("palm://com.webos.notification",{method:"createToast",parameters:b,onSuccess:function(e){t&&t(e.toastId)},onFailure:function(e){console.error("Failed to create toast: "+JSON.stringify(e)),t&&t()}})}},removeToast:function(e){if(webOS.platform.legacy||webOS.platform.open)try{PalmSystem.removeBannerMessage(e)}catch(t){console.warn(t),PalmSystem.clearBannerMessage()}else this.removeToastRequest=webOS.service.request("palm://com.webos.notification",{method:"closeToast",parameters:{toastId:e}})},supportsDashboard:function(){return webOS.platform.legacy||webOS.platform.open},showDashboard:function(e,t){if(webOS.platform.legacy||webOS.platform.open){var o=window.open(e,"_blank",'attributes={"window":"dashboard"}');return t&&o.document.write(t),o.PalmSystem&&o.PalmSystem.stageReady(),o}console.warn("Dashboards are not supported on this version of webOS.")}}}(),function(){var e=0,t=1,o=2,i=3,s=4,n=5,r=6,a=7,c=function(e){return!!e&&"object"==typeof e&&"[object Array]"!==Object.prototype.toString.call(e)},l=function(e,t,o,s){window.PalmSystem&&(o&&!c(o)&&(e=i,o={msgid:t},t="MISMATCHED_FMT",s=null,console.warn("webOSLog called with invalid format: keyVals must be an object")),t||e==a||console.warn("webOSLog called with invalid format: messageId was empty"),o&&(o=JSON.stringify(o)),window.PalmSystem.PmLogString?e==a?window.PalmSystem.PmLogString(e,null,null,s):window.PalmSystem.PmLogString(e,t,o,s):console.error("Unable to send log; PmLogString not found in this version of PalmSystem"))};webOS.emergency=function(t,o,i){l(e,t,o,i)},webOS.alert=function(e,o,i){l(t,e,o,i)},webOS.critical=function(e,t,i){l(o,e,t,i)},webOS.error=function(e,t,o){l(i,e,t,o)},webOS.warning=function(e,t,o){l(s,e,t,o)},webOS.notice=function(e,t,o){l(n,e,t,o)},webOS.info=function(e,t,o){l(r,e,t,o)},webOS.debug=function(e){l(a,"","",e)}}(),function(){function e(e,t){this.uri=e,t=t||{},t.method&&("/"!=this.uri.charAt(this.uri.length-1)&&(this.uri+="/"),this.uri+=t.method),"function"==typeof t.onSuccess&&(this.onSuccess=t.onSuccess),"function"==typeof t.onFailure&&(this.onFailure=t.onFailure),"function"==typeof t.onComplete&&(this.onComplete=t.onComplete),this.params="object"==typeof t.parameters?t.parameters:{},this.subscribe=t.subscribe||!1,this.subscribe&&(this.params.subscribe=t.subscribe),this.params.subscribe&&(this.subscribe=this.params.subscribe),this.resubscribe=t.resubscribe||!1,this.send()}e.prototype.send=function(){if(!window.PalmServiceBridge)return this.onFailure&&this.onFailure({errorCode:-1,errorText:"PalmServiceBridge not found.",returnValue:!1}),this.onComplete&&this.onComplete({errorCode:-1,errorText:"PalmServiceBridge not found.",returnValue:!1}),void console.error("PalmServiceBridge not found.");this.bridge=new PalmServiceBridge;var t=this;this.bridge.onservicecallback=this.callback=function(o){var i;if(!t.cancelled){try{i=JSON.parse(o)}catch(s){i={errorCode:-1,errorText:o,returnValue:!1}}(i.errorCode||0==i.returnValue)&&t.onFailure?(t.onFailure(i),t.resubscribe&&t.subscribe&&(t.delayID=setTimeout(function(){t.send()},e.resubscribeDelay))):t.onSuccess&&t.onSuccess(i),t.onComplete&&t.onComplete(i),t.subscribe||t.cancel()}},this.bridge.call(this.uri,JSON.stringify(this.params))},e.prototype.cancel=function(){this.cancelled=!0,this.resubscribeJob&&clearTimeout(this.delayID),this.bridge&&(this.bridge.cancel(),this.bridge=void 0)},e.prototype.toString=function(){return"[LS2Request]"},e.resubscribeDelay=1e4,webOS.service={request:function(t,o){return new e(t,o)},systemPrefix:"com.webos.",protocol:"luna://"},navigator.service={request:webOS.service.request},navigator.service.Request=navigator.service.request}(),function(){webOS.libVersion="0.1.0"}(),function(){webOS.voicereadout={readAlert:function(e){if(webOS&&webOS.platform&&webOS.platform.watch){var t,o,i=function(e){webOS.service.request("luna://com.webos.settingsservice",{method:"getSystemSettings",parameters:{category:"VoiceReadOut"},onSuccess:function(t){t&&t.settings.talkbackEnable&&e()},onFailure:function(e){console.error("Failed to get system VoiceReadOut settings: "+JSON.stringify(e))}})},s=function(e){webOS.service.request("luna://com.webos.settingsservice",{method:"getSystemSettings",parameters:{keys:["localeInfo"]},onSuccess:function(o){t=o.settings.localeInfo.locales.TTS,e()},onFailure:function(e){console.error("Failed to get system localeInfo settings: "+JSON.stringify(e))}})},n=function(e){webOS.service.request("luna://com.webos.settingsservice",{method:"getSystemSettings",parameters:{category:"option",key:"ttsSpeechRate"},onSuccess:function(t){o=Number(t.settings.ttsSpeechRate),e()},onFailure:function(e){console.error("Failed to get system speechRate settings: "+JSON.stringify(e))}})},r=function(){webOS.service.request("luna://com.lge.service.tts",{method:"speak",parameters:{locale:t,text:e,speechRate:o}})};i(function(){s(function(){n(r)})})}else if(webOS&&webOS.platform&&webOS.platform.tv){var a=function(e){webOS.service.request("luna://com.webos.settingsservice",{method:"getSystemSettings",parameters:{keys:["audioGuidance"],category:"option"},onSuccess:function(t){t&&"on"===t.settings.audioGuidance&&e()},onFailure:function(e){console.error("Failed to get system AudioGuidance settings: "+JSON.stringify(e))}})},r=function(){webOS.service.request("luna://com.webos.service.tts",{method:"speak",parameters:{text:e,clear:!0},onFailure:function(e){console.error("Failed to readAlertMessage: "+JSON.stringify(e))}})};a(r)}else console.warn("Platform doesn't support TTS api.")}}}();
}],'enyo-webos/MockRequest':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:enyo-webos/MockRequest~MockRequest} kind.
* @module enyo-webos/MockRequest
*/

var
	kind = require('enyo/kind');

var
	Ajax = require('enyo/Ajax'),
	Xhr = require('enyo/xhr');

/**
* An mock version of {@link module:enyo-webos/ServiceRequest~ServiceRequest}
* designed for webOS service request simulation.
*
* It will read mock results from a JSON file and return the results in a manner
* similar to real service requests.
*
* For example, a call to service `palm://com.palm.systemservice/time` with method
* `getSystemTime` will automatically try to read the file
* `mock/com.palm.systemservice/time/getSystemTime.json`. Alternatively, the
* [mockFile]{@link module:enyo-webos/MockRequest~MockRequest#mockFile} property
* may be used to specify a specific JSON file to be read.
*
* @class MockRequest
* @extends module:enyo/Ajax~Ajax
* @public
*/
module.exports = kind(
	/** @lends module:enyo-webos/MockRequest~MockRequest.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.MockRequest',

	/**
	* @private
	*/
	kind: Ajax,

	/**
	* @private
	*/
	mimeType: 'application/json',

	/**
	* @lends module:enyo-webos/MockRequest~MockRequest.prototype
	* @private
	*/
	published: {
		/**
		* The Palm service URI.  Starts with `palm://` and will be used to create
		* the autogenerated mock filepath directory.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		service: '',

		/**
		* The service method to be called.  It will be used to create the
		* autogenerated mock filename (with '.json' appended)
		*
		* @type {String}
		* @default ''
		* @public
		*/
		method: '',

		/**
		* Optionally specifies a JSON file to read for mock results, rather than the
		* specified service and method.
		*
		* @type {String}
		* @default `undefined`
		* @public
		*/
		mockFile: undefined
	},

	/**
	* @public
	*/
	go: function() {
		if(this.mockFile) {
			this.url = this.mockFile;
		} else {
			this.url = this.service;
			var i = this.url.indexOf('://');
			if(i>-1) {
				this.url = this.url.substring(i+3);
			}
			this.url = 'mock/' + this.url;
			if(this.method && this.method.length>0) {
				if(this.url.charAt(this.url.length-1) != '/') {
					this.url += '/';
				}
				this.url += this.method;
			}
			this.url += '.json';
		}
		var serviceMethod = this.method;
		this.method = 'GET';
		var request = this.inherited(arguments);
		this.method = serviceMethod;
		return request;
	},

	/**
	* @public
	*/
	cancel: function() {
		if(this.xhr) {
			Xhr.cancel(this.xhr);
			this.endTimer();
			this.xhr = null;
		}
	},

	/**
	* @private
	*/
	respond: function(value) {
		if(value.errorCode || value.returnValue === false) {
			this.fail(value);
		} else {
			this.inherited(arguments);
		}
	}
});
}],'enyo-webos/Events':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:enyo-webos/Events} module.
* @module enyo-webos/Events
*/

var
	utils = require('enyo/utils'),
	platform = require('enyo/platform');

var
	Signals = require('enyo/Signals');

/**
* Events are exposed through the {@link module:enyo/Signals~Signals} kind by
* adding callback handlers.
*
* ```javascript
* var
* 	kind = require('enyo/kind'),
* 	Signals = require('enyo/Signals');
*
* module.exports = kind({
* 	name: 'App',
* 	components: [
* 		{kind: Signals, onwebOSRelaunch: 'relaunch'},
* 		// ...
* 	],
* 	relaunch: function(inSender, inEvent) {
* 		// Launch parameters json can be found within inEvent.detail
* 	}
* });
* ```
*/

/**
* @event module:enyo-webos/Events#onwebOSLaunch
* @see external:webOS-Event
* @public
*/

/**
* @event module:enyo-webos/Events#onwebOSRelaunch
* @see external:webOS-Event
* @public
*/

/**
* @event module:enyo-webos/Events#onwebOSLocaleChange
* @see external:webOS-Event
* @public
*/

/**
* Listens for webOS-specific events
*/
if (platform.webos || window.PalmSystem) {
	var wev = [
		'webOSLaunch',
		'webOSRelaunch',
		'webOSLocaleChange',
		'webOSThemeChange'
	];
	for (var i=0, e; (e=wev[i]); i++) {
		document.addEventListener(e, utils.bind(Signals, 'send', 'on' + e), false);
	}
}
}],'enyo-webos/AppInfo':[function (module,exports,global,require,request){
/**
* Loads the application's appInfo.json file and configures Enyo
* 
* @module enyo-webos/AppInfo
* @private
*/

var
	EnyoHistory = require('enyo/History');

global.webOS.fetchAppInfo(function (appInfo) {
	if (appInfo) {
		EnyoHistory.set('updateHistory', !appInfo.disableBackHistoryAPI);
	}
});
}],'enyo-webos':[function (module,exports,global,require,request){
var
	platform = require('enyo/platform'),
	logger = require('enyo/logger'),
	utils = require('enyo/utils'),
	dispatcher = require('enyo/dispatcher');

var
	Signals = require('enyo/Signals');

require('./src/Events');
require('./webOS/webOS');
require('./src/AppInfo');
if (!global.cordova) {
	// if Cordova not used, add signal generation for the "menubutton" event used
	// in webOS.js for legacy webOS and Open webOS for the appmenu
	document.addEventListener('menubutton', utils.bind(Signals, 'send', 'onmenubutton'), false);
}
dispatcher.listen(document, 'webOSMouse');
dispatcher.listen(document, 'keyboardStateChange');

exports.version = '2.7.0';

},{'./src/Events':'enyo-webos/Events','./webOS/webOS':'webOS/webOS','./src/AppInfo':'enyo-webos/AppInfo'}],'enyo-webos/ServiceRequest':[function (module,exports,global,require,request){
require('enyo-webos');

/**
* Contains the declaration for the {@link module:enyo-webos/ServiceRequest~ServiceRequest} kind.
* @module enyo-webos/ServiceRequest
*/

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	Async = require('enyo/Async');

/**
* An extension of the {@link module:enyo/Async~Async} object designed for webOS
* service requests.
*
* @class ServiceRequest
* @extends module:enyo/Async~Async
* @public
*/
module.exports = kind(
	/** @lends module:enyo-webos/ServiceRequest~ServiceRequest.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.ServiceRequest',

	/**
	* @private
	*/
	kind: Async,

	/**
	* @private
	*/
	published: {

		/**
		* The Luna service URI.  Starts with `luna://`.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		service: '',

		/**
		* The service method to call.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		method: '',

		/**
		* Whether or not to subscribe to the service.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		subscribe: false,

		/**
		* Whether or not the request should resubscribe when an error is returned.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		resubscribe: false
	},

	/**
	* Executes the service request with an optional object containing parameters
	* to be sent.
	*
	* @param {Object} [params]
	* @return {Object}
	* @public
	*/
	go: function(params) {
		if(!window.PalmServiceBridge) {
			this.fail({
				errorCode: -1,
				errorText: 'Invalid device for Palm services. PalmServiceBridge not found.'
			});
			return undefined;
		}
		this.startTimer();
		this.params = params || {};
		this.request = navigator.service.request(this.service, {
			method: this.method,
			parameters: this.params,
			subscribe: this.subscribe,
			resubscribe: this.resubscribe,
			onSuccess: utils.bind(this, this.serviceSuccess),
			onFailure: utils.bind(this, this.serviceFailure)
		});
		return this.request;
	},

	/**
	* Cancels the request/subscription.
	*
	* @public
	*/
	cancel: function() {
		if(this.request) {
			this.request.cancel();
			this.request = undefined;
		}
	},

	/**
	* @private
	*/
	serviceSuccess: function(response) {
		var successCallback;
		if(this.responders.length>0) {
			successCallback = this.responders[0];
		}
		this.respond(response);
		if(this.subscribe && successCallback) {
			this.response(successCallback);
		}
	},

	/**
	* @private
	*/
	serviceFailure: function(error) {
		var failureCallback;
		if(this.errorHandlers.length>0) {
			failureCallback = this.errorHandlers[0];
		}
		this.fail(error);
		if(this.resubscribe && this.subscribe) {
			if(failureCallback) {
				this.error(failureCallback);
			}
		}
	},
	
	/**
	* @private
	*/
	timeoutComplete: function () {
		this.timedout = true;
		this.fail({
			errorCode: -2,
			errorText: "Service request timeout"
		});
		this.cancel();
	}
});
}],'enyo-webos/LunaService':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:enyo-webos/LunaService~LunaService} kind.
* @module enyo-webos/LunaService
*/

var
	utils = require('enyo/utils'),
	kind = require('enyo/kind');

var
	Component = require('enyo/Component'),
	MockRequest = require('./MockRequest'),
	ServiceRequest = require('./ServiceRequest');

/**
* Fires when a response is received. Event data contains the returned response. The `originator`
* property will contain the calling {@link module:enyo-webos/ServiceRequest~ServiceRequest}.
*
* @event module:enyo-webos/LunaService~LunaService#onResponse
* @type {Object}
* @public
*/

/**
* Fires when an error is received. Event data contains the error data. The `originator` property
* will contain the calling {@link module:enyo-webos/ServiceRequest~ServiceRequest}.
*
* @event module:enyo-webos/LunaService~LunaService#onError
* @type {Object}
* @public
*/

/**
* Fires when a service request is complete (regardless of success or failure). Event data
* contains the response data and/or error data. The `originator` property will contain the
* calling {@link module:enyo-webos/ServiceRequest~ServiceRequest}.
*
* @event module:enyo-webos/LunaService~LunaService#onComplete
* @type {Object}
* @public
*/

/**
* {@link module:enyo-webos/LunaService~LunaService} is a component similar to
* {@link module:enyo/WebService~WebService}, but for LS2 service requests.
*
* Internally, it generates a new {@link module:enyo-webos/ServiceRequest~ServiceRequest}
* for each `[send()]{@link module:enyo-webos/LunaService~LunaService#send}` call,
* keeping track of each request made and sending out resulting events as they
* occur. This allows multiple concurrent request calls to be sent without any
* potential overlap or garbage collection issues.
*
* @class LunaService
* @extends module:enyo/Component~Component
* @public
*/
module.exports = kind(
	/** @lends module:enyo-webos/LunaService~LunaService.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.LunaService',

	/**
	* @private
	*/
	kind: Component,

	/**
	* @lends module:enyo-webos/LunaService~LunaService.prototype
	* @private
	*/
	published: {

		/**
		* The Luna service URI.  Starts with `luna://`.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		service: '',

		/**
		* The service method to call.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		method: '',

		/**
		* Whether or not to subscribe to the service.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		subscribe: false,

		/**
		* Whether or not the request should resubscribe when an error is returned.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		resubscribe: false,
		
		/**
		* The number of milliseconds to wait before failing with a _timeout_ error. This only
		* takes effect for non-zero values.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		timeout: 0
	},

	/**
	* If true, {@link module:enyo-webos/MockRequest~MockRequest} will be used in
	* place of {@link module:enyo-webos/ServiceRequest~ServiceRequest}.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	mock: false,

	/**
	* Optionally specifies a JSON file to read for mock results, rather than
	* autogenerating the filepath.
	*
	* @type {String}
	* @default `undefined`
	* @public
	*/
	mockFile: undefined,

	/**
	* @private
	*/
	events: {
		onResponse: '',
		onError: '',
		onComplete: ''
	},

	/**
	* Needed for referencing to `enyo-webos/PalmService` for compatability.
	*
	* @private
	*/
	noDefer: true,

	/**
	* @private
	*/
	create: function () {
		this.inherited(arguments);
		this.activeRequests = [];
		this.activeSubscriptionRequests = [];
	},

	/**
	* Sends a webOS service request with the passed-in parameters, returning the associated
	* {@link module:enyo-webos/ServiceRequest~ServiceRequest} instance.
	*
	* @param {Object} params - Hash of parameters for the request
	* @return {module:enyo-webos/ServiceRequest~ServiceRequest}
	* @public
	*/
	send: function (params) {
		params = params || {};
		var request = this.createComponent({
			kind: ((this.mock) ? MockRequest : ServiceRequest),
			service: this.service,
			method: this.method,
			subscribe: this.subscribe,
			resubscribe: this.resubscribe,
			timeout: this.timeout
		});
		if(this.mock && this.mockFile) {
			request.mockFile = this.mockFile;
		}
		request.originalCancel = request.cancel;
		request.cancel = utils.bind(this, 'cancel', request);
		request.response(this, 'requestSuccess');
		request.error(this, 'requestFailure');
		if(this.subscribe && !this.mock) {
			this.activeSubscriptionRequests.push(request);
		} else {
			this.activeRequests.push(request);
		}
		request.go(params);
		return request;
	},

	/**
	* Cancels the specified request.  The equivalent of
	* `[request.cancel()]{@link module:enyo-webos/ServiceRequest~ServiceRequest#cancel}`.
	*
	* @param {module:enyo-webos/ServiceRequest~ServiceRequest} request - The request to cancel
	* @public
	*/
	cancel: function (request) {
		this.removeRequest(request);
		request.originalCancel();
	},

	/**
	* Removes the specified request from the active request arrays.
	*
	* @param {module:enyo-webos/ServiceRequest~ServiceRequest} request - The request to remove
	* @private
	*/
	removeRequest: function (request) {
		var i = -1;
		i = this.activeRequests.indexOf(request);
		if (i !== -1) {
			this.activeRequests.splice(i, 1);
		} else {
			i = this.activeSubscriptionRequests.indexOf(request);
			if (i !== -1) {
				this.activeSubscriptionRequests.splice(i, 1);
			}
		}
	},

	/**
	* @fires {@link module:enyo-webos/LunaService~LunaService#onResponse}
	* @private
	*/
	requestSuccess: function (request, response) {
		response.originator = request;
		this.doResponse(response);
		this.requestComplete(request, response);
	},

	/**
	* @fires {@link module:enyo-webos/LunaService~LunaService#onError}
	* @private
	*/
	requestFailure: function (request, error) {
		error.originator = request;
		this.doError(error);
		this.requestComplete(request, error);
	},

	/**
	* @fires {@link module:enyo-webos/LunaService~LunaService#onComplete}
	* @private
	*/
	requestComplete: function (request, data) {
		var i = -1;
		i = this.activeRequests.indexOf(request);
		if (i !== -1) {
			this.activeRequests.splice(i, 1);
		}
		this.doComplete(data);
	},

	/**
	* Cancels any active requests.
	*
	* @see {@link module:enyo/CoreObject~Object#destroy}
	* @private
	*/
	destroy: function () {
		var i;
		for(i=0; i<this.activeRequests.length; i++) {
			this.activeRequests[i].originalCancel();
		}
		delete this.activeRequests;

		for(i=0; i<this.activeSubscriptionRequests.length; i++) {
			this.activeSubscriptionRequests[i].originalCancel();
		}
		delete this.activeSubscriptionRequests;
		this.inherited(arguments);
	}
});
},{'./MockRequest':'enyo-webos/MockRequest','./ServiceRequest':'enyo-webos/ServiceRequest'}]
	};

});
//# sourceMappingURL=enyo-webos.js.map