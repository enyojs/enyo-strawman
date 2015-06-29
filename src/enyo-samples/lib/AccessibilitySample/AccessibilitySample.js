var
	kind = require('enyo/kind');

var
	AccessibilitySupport = require('enyo/AccessibilitySupport'),
	Button = require('enyo/Button'),
	Control = require('enyo/Control');

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
		{kind: Button, content: 'Toggle Hint', ontap: 'toggleHint'}
	],
	toggleContent: function () {
		this.$.dyn.set('content', this.$.dyn.content ? '' : 'Content');
	},
	toggleLabel: function () {
		this.$.dyn.set('accessibilityLabel', this.$.dyn.accessibilityLabel ? '' : 'Label');
	},
	toggleHint: function () {
		this.$.dyn.set('accessibilityHint', this.$.dyn.accessibilityHint ? '' : 'Hint');
	}
});