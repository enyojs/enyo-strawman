var
	kind = require('enyo/kind'),
	AccessibilitySupport = require('enyo/AccessibilitySupport'),
	Button = require('enyo/Button'),
	ButtonAccessibilitySupport = require('enyo/Button/ButtonAccessibilitySupport.js'),
	Checkbox = require('enyo/Checkbox'),
	CheckboxAccessibilitySupport = require('enyo/Checkbox/CheckboxAccessibilitySupport.js'),
	Control = require('enyo/Control'),
	InputAccessibilitySupport = require('enyo/Input/InputAccessibilitySupport.js'),
	Popup = require('enyo/Popup');
	PopupAccessibilitySupport = require('enyo/Popup/PopupAccessibilitySupport.js'),

module.exports = kind({
	components: [
		{tag: 'h3', content: 'Fixed Examples'},
		{classes: 'aria-samples', components: [
			// only content
			{name: 'c', content: 'content', mixins: [AccessibilitySupport]},
			// content + label
			{name: 'cl', content: 'content', accessibilityLabel: 'the label', mixins: [AccessibilitySupport]},
			// content + hint
			{name: 'ch', content: 'content', accessibilityHint: 'the hint', mixins: [AccessibilitySupport]},
			// content + label + hint
			{name: 'clh', content: 'content', accessibilityLabel: 'the label', accessibilityHint: 'the hint', mixins: [AccessibilitySupport]},
			// label + hint
			{name: 'lh', accessibilityLabel: 'the label', accessibilityHint: 'the hint', mixins: [AccessibilitySupport]},
			// only label
			{name: 'l', accessibilityLabel: 'the label', mixins: [AccessibilitySupport]},
			// only hint
			{name: 'h', accessibilityHint: 'the hint', mixins: [AccessibilitySupport]}
		]},
		{tag: 'h3', content: 'Dynamic Example'},
		{classes: 'aria-samples', components: [
			{name: 'dyn', content: 'Content', mixins: [AccessibilitySupport]}
		]},
		{kind: Button, content: 'Toggle Content', ontap: 'toggleContent'},
		{kind: Button, content: 'Toggle Label', ontap: 'toggleLabel'},
		{kind: Button, content: 'Toggle Hint', ontap: 'toggleHint'},
		{name: "toggle1", kind: Button, content: 'Toggle Disabled', ontap: 'toggleDisabled'},
		{tag: 'h3', content: 'UI control accessibilityDisabled Example'},
		{ components: [
			{kind: Popup, name: "popup", autoDismiss: false, classes: "popup", content: "popup", mixins: [AccessibilitySupport, PopupAccessibilitySupport]},
			{tag: 'br'},
			{tag: 'br'},
			{name: 'popup_result'},
			{tag: 'br'},
			{name: 'checkbox', kind: Checkbox, disabled: true, checked: true, content: 'simple checkbox', mixins: [AccessibilitySupport, InputAccessibilitySupport, CheckboxAccessibilitySupport]},
			{tag: 'br'},
			{name: 'checkbox_result'},
			{tag: 'br'},
			{name: 'btn', kind: Button, disabled: true, content: 'button', mixins: [AccessibilitySupport, ButtonAccessibilitySupport]},
			{tag: 'br'},
			{name: 'btn_result'},
			{tag: 'br'}
		]},
		{name: "toggle2", kind: Button, content: 'Toggle Disabled', ontap: 'toggleDisabled'}
	],
	/**
	* @private
	*/
	rendered: kind.inherit(function (sup) {
		return function (props) {
			sup.apply(this, arguments);
			this.$.popup.setShowing(true);
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
	toggleDisabled: function (sender, e) {
		if (sender.name === 'toggle1') {
			this.$.dyn.set('accessibilityDisabled', this.$.dyn.accessibilityDisabled ? false : true);
		} else if (sender.name === 'toggle2') {
			this.$.popup.set('accessibilityDisabled', this.$.popup.accessibilityDisabled ? false : true);
			this.$.checkbox.set('accessibilityDisabled', this.$.checkbox.accessibilityDisabled ? false : true);
			this.$.btn.set('accessibilityDisabled', this.$.btn.accessibilityDisabled ? false : true);
			this.showAriaAttributes();
		}
	},
	showAriaAttributes: function () {
		var role, label, checked, disabled, tabindex;

		label = this.$.popup.getAttribute('aria-label');
		role = this.$.popup.getAttribute('role');
		tabindex = this.$.popup.getAttribute('tabindex');
		this.$.popup_result.setContent(' :: tabindex = ' + tabindex + ' :: role = ' + role + ' :: aria-label = ' + label);

		label = this.$.checkbox.getAttribute('aria-label');
		role = this.$.checkbox.getAttribute('role');
		checked = this.$.checkbox.getAttribute('aria-checked');
		disabled = this.$.checkbox.getAttribute('aria-disabled');
		tabindex = this.$.checkbox.getAttribute('tabindex');
		this.$.checkbox_result.setContent(' :: tabindex = ' + tabindex + ' :: role = ' + role + ' :: aria-label = ' + label + ' :: aria-checked = ' + checked + ' :: aria-disabled = ' + disabled);
	
		label = this.$.btn.getAttribute('aria-label');
		role = this.$.btn.getAttribute('role');
		disabled = this.$.btn.getAttribute('aria-disabled');
		tabindex = this.$.btn.getAttribute('tabindex');
		this.$.btn_result.setContent(' :: tabindex = ' + tabindex + ' :: role = ' + role + ' :: aria-label = ' + label + ' :: aria-disabled = ' + disabled);
	}
});