var 
	kind = require('enyo/kind');

var 
	Control = require('enyo/Control'),
	Signals = require('enyo/Signals');

require('enyo/pageVisibility');

module.exports = kind({
	name: "enyo.sample.PageVisibilitySample",
	kind: Control,
	components: [
		{kind: Signals, onvisibilitychange: "visibilitychanged"},
		{name: "text", allowHtml: true}
	],
	rendered: function () {
		this.inherited(arguments);
		this.visibilitychanged(undefined, {hidden:false});
	},
	visibilitychanged: function(inSender, inEvent){
		this.$.text.setContent(this.$.text.content + (Date().toString()) + (inEvent.hidden ? ": hidden" : ": visible") + "<br>");
	}
});