var
	kind = require('enyo/kind'),
	pageVisibility = require('enyo/pageVisibility');

var
	Control = require('enyo/Control'),
	Signals = require('enyo/Signals');

module.exports = kind({
	name: 'enyo.sample.PageVisibilitySample',
	kind: Control,
	components: [
		{kind: Signals, onvisibilitychange: 'visibilitychanged'},
		{name: 'text', allowHtml: true}
	],
	rendered: function () {
		this.inherited(arguments);
		this.visibilitychanged();
	},
	visibilitychanged: function (){
		this.$.text.setContent(this.$.text.content + (Date().toString()) + (pageVisibility.hidden ? ': hidden' : ': visible') + '<br>');
	}
});