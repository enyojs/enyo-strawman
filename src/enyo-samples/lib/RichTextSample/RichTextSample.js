/*
	Implementation notes:
	-	The RichText methods involving selection (HTML5 selection object) require
		that the RichText object have focus first.
*/

var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	RichText = require('enyo/RichText');

module.exports = kind({
	name: 'enyo.sample.RichTextSample',
	classes: 'rich-text-sample',
	kind: Control,
	components: [
		{content: 'Rich Text', classes: 'section'},
		{kind: Button, ontap: 'buttonFormatTapped', action: 'bold', components: [
			{tag: 'strong', content: 'b'}
		]},
		{kind: Button, ontap: 'buttonFormatTapped', action: 'italic', components: [
			{tag: 'em', content: 'i'}
		]},
		{kind: Button, ontap: 'buttonFormatTapped', action: 'underline', components: [
			{tag: 'u', content: 'u'}
		]},
		{kind: Button, content: 'Select All', ontap: 'buttonSelectAllTapped'},
		{kind: Button, content: 'Deselect All', ontap: 'buttonDeselectAllTapped'},
		{kind: Button, content: 'Home', ontap: 'buttonHomeTapped'},
		{kind: Button, content: 'End', ontap: 'buttonEndTapped'},
		{kind: RichText, value: 'Input <em>any</em> text (HTML tags will be preserved)'},
		{kind: Button, content: 'Show RichText Value', classes: 'button-value', ontap: 'buttonValueTapped'},
		{name: 'results', classes: 'results'}
	],
	buttonSelectAllTapped: function (sender, ev) {
		this.$.richText.focus();
		this.$.richText.selectAll();
	},
	buttonDeselectAllTapped: function (sender, ev) {
		this.$.richText.focus();
		this.$.richText.removeSelection();
	},
	buttonHomeTapped: function (sender, ev) {
		this.$.richText.focus();
		this.$.richText.moveCursorToStart();
	},
	buttonEndTapped: function (sender, ev) {
		this.$.richText.focus();
		this.$.richText.moveCursorToEnd();
	},
	buttonFormatTapped: function (sender, ev) {
		this.$.richText.focus();
		document.execCommand(sender.action, false, this.$.richText.getSelection());
		this.$.richText.updateValue();
	},
	buttonValueTapped: function (sender, ev) {
		this.$.results.setContent(this.$.richText.getValue());
	}
});