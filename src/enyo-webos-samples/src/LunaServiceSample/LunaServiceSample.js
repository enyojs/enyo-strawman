var
	kind = require('enyo/kind'),
	platform = require('enyo/platform');

var
	LunaService = require('enyo-webos/LunaService');

var LunaServiceSample = kind({
	name: 'webos.sample.LunaServiceSample',
	classes: 'enyo-fit webos-sample',
	components: [
		{
			name: 'networkStatus',
			kind: LunaService,
			service: 'luna://com.palm.connectionmanager',
			method: 'getstatus',
			onResponse: 'serviceResponse',
			onError: 'serviceError'
		},
		{name: 'result', content: 'LunaService API not supported on this platform.', allowHtml: true}
	],
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			if(platform.webos) {
				this.request = this.$.networkStatus.send({}); //no parameters needed for this service call
				//in this example, can cancel the request from this.request.cancel()
			}
		};
	}),
	serviceResponse: function(sender, ev) {
		//Note: ev.originator will point to the request object (the same one set to this.request above)
		this.$.result.setContent('isInternetConnectionAvailable: ' + ev.isInternetConnectionAvailable + '<br><br>'
				+ 'Wired: ' + JSON.stringify(ev.wired, null, '\t') + '<br><br>'
				+ 'WiFi: ' + JSON.stringify(ev.wifi, null, '\t') + '<br><br>'
				+ 'WAN: ' + JSON.stringify(ev.wan, null, '\t'));
	},
	serviceError: function(sender, ev) {
		this.$.result.setContent('Error: ' + ev.errorText);
	}
});

module.exports = LunaServiceSample;