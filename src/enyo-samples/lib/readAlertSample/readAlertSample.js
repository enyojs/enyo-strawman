var
	kind = require('enyo/kind'),
	options = require('enyo/options');
var
	Button = require('enyo/Button'),
	Input = require('enyo/Input'),
	readAlert = require('enyo/readAlert');

module.exports = kind({
	classes: 'readAlert-sample',
	components: [
		{tag: 'h3', content: 'readAlert Example'},
		{tag: "label", content: "Type alert text", classes: "section"},
		{kind: Input, name: "inputText", type: "text", value: "Initial Value"},
		{kind: Button, content: 'readAlert', ontap: 'readAlertText'},

	],

	readAlertText: function (sender, e) {
		options.accessibility = true;
		readAlert(this.$.inputText.getValue());
	}
});