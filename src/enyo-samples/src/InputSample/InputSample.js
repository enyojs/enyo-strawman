var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	Input = require('enyo/Input');

module.exports = kind({
	name: 'enyo.sample.InputSample',
	classes: 'input-sample',
	kind: Control,
	components: [
		{tag: 'label', content: 'Text Input', classes: 'section', attributes: [{'for': 'inputText'}]},
		{kind: Input, name: 'inputText', type: 'text', placeholder: 'Text', value: 'Initial Value', onchange: 'inputChanged', oninput: 'inputOccurred'},
		{tag: 'label', content: 'Select On Focus Input', classes: 'section', attributes: [{'for': 'inputSelectOnFocus'}]},
		{kind: Input, name: 'inputSelectOnFocus', type: 'text', placeholder: 'Select On Focus', value: 'This text will be selected when focused', selectOnFocus: true, onchange: 'inputChanged', oninput: 'inputOccurred'},
		{tag: 'label', content: 'Password Input', classes: 'section', attributes: [{'for': 'inputPassword'}]},
		{kind: Input, name: 'inputPassword', type: 'password', placeholder: 'Password', onchange: 'inputChanged', oninput: 'inputOccurred'},
		{tag: 'label', content: 'Email Input', classes: 'section', attributes: [{'for': 'inputEmail'}]},
		{kind: Input, name: 'inputEmail', type: 'email', placeholder: 'Email', onchange: 'inputChanged', oninput: 'inputOccurred'},
		{tag: 'label', content: 'Search Input', classes: 'section', attributes: [{'for': 'inputSearch'}]},
		{kind: Input, name: 'inputSearch', type: 'search', placeholder: 'Search', onchange: 'inputChanged', oninput: 'inputOccurred'},
		{tag: 'label', content: 'Number Input', classes: 'section', attributes: [{'for': 'inputNumber'}]},
		{kind: Input, name: 'inputNumber', type: 'number', placeholder: 'Number', onchange: 'inputChanged', oninput: 'inputOccurred'},
		{tag: 'label', content: 'Disabled Input', classes: 'section', attributes: [{'for': 'inputDisabled'}]},
		{kind: Input, name: 'inputDisabled', disabled: true, value: 'Disabled', onchange: 'inputChanged', oninput: 'inputOccurred'},
		{kind: Button, name: 'buttonInputToggle', ontap: 'buttonInputToggleTapped', content: 'Toggle Input State'},
		{name: 'results', classes: 'results'}
	],
	inputChanged: function (sender, ev) {
		this.$.results.setContent('The value of \'' + sender.getName() + '\' has been changed to: \'' + sender.getValue() + '\'.');
	},
	inputOccurred: function (sender, ev) {
		this.$.results.setContent('The current value of \'' + sender.getName() + '\' is: \'' + sender.getValue() + '\'.');
	},
	buttonInputToggleTapped: function (sender, ev) {
		this.$.inputDisabled.setDisabled(!this.$.inputDisabled.getDisabled()).setValue(this.$.inputDisabled.getDisabled() ? 'Disabled' : 'Enabled');
		this.$.results.setContent('The current state of \'inputDisabled\' is \'' + (this.$.inputDisabled.getDisabled() ? 'disabled' : 'enabled') + '\'.');
	}
});
