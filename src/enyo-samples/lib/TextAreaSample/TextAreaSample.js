var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	TextArea = require('enyo/TextArea');

module.exports = kind({
	name: 'enyo.sample.TextAreaSample',
	classes: 'text-area-sample',
	components: [
		{tag: 'label', content: 'Text Area', classes: 'section', attributes: [{'for': 'inputTextArea'}]},
		{kind: TextArea, name: 'inputTextArea', type: 'text', placeholder: 'TextArea', value: 'Initial TextArea Value', onchange: 'inputChanged', oninput: 'inputOccurred'},
		{tag: 'label', content: 'Disabled Text Area', classes: 'section', attributes: [{'for': 'textAreaDisabled'}]},
		{kind: TextArea, name: 'textAreaDisabled', disabled: true, value: 'Disabled', onchange: 'inputChanged', oninput: 'inputOccurred'},
		{kind: Button, name: 'buttonTextAreaToggle', ontap: 'buttonTextAreaToggleTapped', content: 'Toggle Text Area State'},
		{name: 'results', classes: 'results'}
	],
	inputChanged: function (sender, ev) {
		this.$.results.setContent('The value of \'' + sender.getName() + '\' has been changed to: \'' + sender.getValue() + '\'.');
	},
	inputOccurred: function (sender, ev) {
		this.$.results.setContent('The current value of \'' + sender.getName() + '\' is: \'' + sender.getValue() + '\'.');
	},
	buttonTextAreaToggleTapped: function (sender, ev) {
		this.$.textAreaDisabled.setDisabled(!this.$.textAreaDisabled.getDisabled()).setValue(this.$.textAreaDisabled.getDisabled() ? 'Disabled' : 'Enabled');
		this.$.results.setContent('The current state of \'textAreaDisabled\' is \'' + (this.$.textAreaDisabled.getDisabled() ? 'disabled' : 'enabled') + '\'.');
	}
});