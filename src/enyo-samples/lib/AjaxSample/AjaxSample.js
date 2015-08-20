var 
	kind = require('enyo/kind');

var
	Ajax = require('enyo/Ajax'),
	Button = require('enyo/Button'),
	Input = require('enyo/Input'),
	Popup = require('enyo/Popup'),
	TextArea = require('enyo/TextArea');

module.exports = kind({
	name: "enyo.sample.AjaxSample",
	classes: "enyo-fit ajax-sample",
	components: [
		{classes:"onyx-toolbar-inline", components: [
			{content: "YQL: "},
			{kind: Input, name:"query", fit:true, value:'select * from weather.forecast where woeid in (select woeid from geo.places where text="san francisco, ca")'},
			{kind: Button, content:"Fetch", ontap:"fetch"}
		]},
		{classes:"onyx-toolbar-inline", components: [
			{content: "URL: "},
			{kind: Input, name:"baseUrl", fit:true, value:'http://query.yahooapis.com/v1/public/yql?format=json'}
		]},
		{kind: TextArea, fit:true, classes:"ajax-sample-source"},
		{name: "basicPopup", kind: Popup, centered: true, floating: true, classes:"onyx-sample-popup", style: "padding: 10px;", content: "Popup..."}
	],
	fetch: function() {

		var ajax = new Ajax({
			url: this.$.baseUrl.getValue()
		});
		// send parameters the remote service using the 'go()' method
		ajax.go({
			q: this.$.query.getValue()
		});
		// attach responders to the transaction object
		ajax.response(this, "processResponse");
		// handle error
		ajax.error(this, "processError");
	},
	processResponse: function(inSender, inResponse) {
		// do something with it
		this.$.textArea.setValue(JSON.stringify(inResponse, null, 2));
	},
	processError: function(inSender, inResponse) {
		var errorLog = "Error" + ": " + inResponse + "! " + (JSON.parse(inSender.xhrResponse.body)).error.description;
		this.$.textArea.setValue(JSON.stringify(inSender.xhrResponse, null, 2));
		this.$.basicPopup.setContent(errorLog);
		this.$.basicPopup.show();
	}
});