var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Input = require('enyo/Input'),
	Popup = require('enyo/Popup'),
	Select = require('enyo/Select'),
	TextArea = require('enyo/TextArea'),
	WebService = require('enyo/WebService');

module.exports = kind({
	name: 'enyo.sample.WebServiceSample',
	classes: 'enyo-fit webservice-sample',
	components: [
		{kind: WebService, name:'yql', url: 'http://query.yahooapis.com/v1/public/yql?format=json', onResponse:'processResponse', onError: 'processError', callbackName: 'callback'},
		{classes:'onyx-toolbar-inline', components: [
			{content: 'YQL: '},
			{kind: Input, name:'query', fit:true, value:'select * from weather.forecast where woeid in (select woeid from geo.places where text=\'san francisco, ca\')'},
			{content:'Choose Scroller', style:'width:100px;'},
			{name: 'picker', kind: Select, components: [
				{content:'AJAX', active:true},
				{content:'JSON-P'}
			]},
			{kind: Button, content:'Fetch', ontap:'fetch'}
		]},
		{kind: TextArea, fit:true, classes:'webservice-sample-source'},
		{name: 'basicPopup', kind: Popup, centered: true, floating: true, classes:'onyx-sample-popup', style: 'padding: 10px;', content: 'Popup...'}
	],
	fetch: function () {
		// send parameters the remote service using the 'send()' method
		this.$.yql.send({
			q: this.$.query.getValue(),
			jsonp: (this.$.picker.getSelected()=='JSON-P')
		});
	},
	processResponse: function (sender, ev) {
		// do something with it
		this.$.textArea.setValue(JSON.stringify(ev.data, null, 2));
	},
	processError: function (sender, ev) {
		var errorLog = 'Error' + ': ' + ev.data + '! ' + (JSON.parse(ev.ajax.xhrResponse.body)).error.description;
		this.$.textArea.setValue(JSON.stringify(ev.ajax.xhrResponse, null, 2));
		this.$.basicPopup.setContent(errorLog);
		this.$.basicPopup.show();
	}
});