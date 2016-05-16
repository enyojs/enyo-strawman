var
	kind = require('enyo/kind'),
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	Checkbox = require('enyo/Checkbox'),
	Input = require('enyo/Input'),
	Popup = require('enyo/Popup');
var
	VoiceReadout = require('enyo-webos/VoiceReadout');

module.exports = kind({
	kind: Control,
	classes: 'accessibility-sample',
	components: [
		{tag: 'h3', content: 'Fixed Examples'},
		{classes: 'aria-samples', components: [
			// only content
			{name: 'c', content: 'content'},
			// content + label
			{name: 'cl', content: 'content', accessibilityLabel: 'the label'},
			// content + hint
			{name: 'ch', content: 'content', accessibilityHint: 'the hint'},
			// prehint + content
			{name: 'pc', accessibilityPreHint: 'the prehint', content: 'content'},
			// prehint + content + label + hint
			{name: 'pclh', accessibilityPreHint: 'the prehint', content: 'content', accessibilityLabel: 'the label', accessibilityHint: 'the hint'},
			// prehint + content + label
			{name: 'pcl', accessibilityPreHint: 'the prehint', content: 'content', accessibilityLabel: 'the label'},
			// prehint + content + hint
			{name: 'pch', accessibilityPreHint: 'the prehint', content: 'content', accessibilityHint: 'the hint'},
			// content + label + hint
			{name: 'clh', content: 'content', accessibilityLabel: 'the label', accessibilityHint: 'the hint'},
			// prehint + label
			{name: 'pl', accessibilityPreHint: 'the prehint', accessibilityLabel: 'the label'},
			// prehint + hint
			{name: 'ph', accessibilityPreHint: 'the prehint', accessibilityHint: 'the hint'},
			// label + hint
			{name: 'lh', accessibilityLabel: 'the label', accessibilityHint: 'the hint'},
			// only prehint
			{name: 'p', accessibilityPreHint: 'the prehint'},
			// only label
			{name: 'l', accessibilityLabel: 'the label'},
			// only hint
			{name: 'h', accessibilityHint: 'the hint'}
		]},
		{tag: 'h3', content: 'Dynamic Example'},
		{classes: 'aria-samples', components: [
			{name: 'dyn', content: 'Content'}
		]},
		{kind: Button, content: 'Toggle Content', ontap: 'toggleContent'},
		{kind: Button, content: 'Toggle Label', ontap: 'toggleLabel'},
		{kind: Button, content: 'Toggle Hint', ontap: 'toggleHint'},
		{name: 'toggle1', kind: Button, content: 'Toggle Disabled', ontap: 'toggleDynDisabled'},
		{tag: 'h3', content: 'UI control accessibilityDisabled Example'},
		{components: [
			{kind: Popup, name: 'popup', autoDismiss: false, classes: 'popup', content: 'popup'},
			{tag: 'br'},
			{tag: 'br'},
			{classes: 'result', name: 'popup_result'},
			{tag: 'br'},
			{name: 'checkbox', kind: Checkbox, disabled: true, checked: true, content: 'simple checkbox'},
			{classes: 'result', name: 'checkbox_result'},
			{tag: 'br'},
			{name: 'btn', kind: Button, disabled: true, content: 'button'},
			{classes: 'result', name: 'btn_result'},
			{tag: 'br'}
		]},
		{name: 'toggle2', kind: Button, content: 'Toggle Disabled', ontap: 'toggleDisabled'},
		{tag: 'h3', content: 'readAlert API Example'},
		{kind: Input, name: "inputText", type: "text", value: "Initial Value"},
		{kind: Button, content: 'readAlert', ontap: 'readAlertText'}
	],
	/**
	* @private
	*/
	rendered: kind.inherit(function (sup) {
		return function (props) {
			sup.apply(this, arguments);
			this.$.popup.show();
			this.showAriaAttributes();
		};
	}),
	toggleContent: function () {
		this.$.dyn.set('content', this.$.dyn.content ? '' : 'Content');
	},
	toggleLabel: function () {
		this.$.dyn.set('accessibilityLabel', this.$.dyn.accessibilityLabel ? '' : 'Label');
	},
	toggleHint: function () {
		this.$.dyn.set('accessibilityHint', this.$.dyn.accessibilityHint ? '' : 'Hint');
	},
	toggleDynDisabled: function (sender, ev) {
		this.$.dyn.set('accessibilityDisabled', !this.$.dyn.accessibilityDisabled);
	},
	toggleDisabled: function (sender, ev) {
		this.$.popup.set('accessibilityDisabled', !this.$.popup.accessibilityDisabled);
		this.$.checkbox.set('accessibilityDisabled', !this.$.checkbox.accessibilityDisabled);
		this.$.btn.set('accessibilityDisabled', !this.$.btn.accessibilityDisabled);
		this.showAriaAttributes();
	},
	showAriaAttributes: function () {
		var role, label, checked, disabled, tabindex;

		label = this.$.popup.getAttribute('aria-label');
		role = this.$.popup.getAttribute('role');
		tabindex = this.$.popup.getAttribute('tabindex');
		this.$.popup_result.set('content', ' :: tabindex = ' + tabindex + ' :: role = ' + role + ' :: aria-label = ' + label);

		label = this.$.checkbox.getAttribute('aria-label');
		role = this.$.checkbox.getAttribute('role');
		checked = this.$.checkbox.getAttribute('aria-checked');
		disabled = this.$.checkbox.getAttribute('aria-disabled');
		tabindex = this.$.checkbox.getAttribute('tabindex');
		this.$.checkbox_result.set('content', ' :: tabindex = ' + tabindex + ' :: role = ' + role + ' :: aria-label = ' + label + ' :: aria-checked = ' + checked + ' :: aria-disabled = ' + disabled);

		label = this.$.btn.getAttribute('aria-label');
		role = this.$.btn.getAttribute('role');
		disabled = this.$.btn.getAttribute('aria-disabled');
		tabindex = this.$.btn.getAttribute('tabindex');
		this.$.btn_result.set('content', ' :: tabindex = ' + tabindex + ' :: role = ' + role + ' :: aria-label = ' + label + ' :: aria-disabled = ' + disabled);
	},
	readAlertText: function () {
		VoiceReadout.readAlert(this.$.inputText.getValue());
	}
});

module.exports.badgeClasses = 'new';
