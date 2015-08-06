var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	FittableRows = require('layout/FittableRows');

var
	BodyText = require('moonstone/BodyText'),
	Checkbox = require('moonstone/Checkbox'),
	Divider = require('moonstone/Divider'),
	Icon = require('moonstone/Icon'),
	Item = require('moonstone/Item'),
	Button = require('moonstone/Button'),
	Header = require('moonstone/Header'),
	ToggleButton = require('moonstone/ToggleButton'),
	IconButton = require('moonstone/IconButton'),
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.AccessibilitySample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	labelText : 'Label',
	hintText : 'Hint',
	components: [
		{kind: Header, name: 'header', content: 'Accessibility', titleBelow: 'Unusual case sample for Accessibility', type: 'small', components: [
			{name: 'labelButton', kind: Button, small: true, minWidth: false, content: 'Set Label', ontap: 'labelButtonTapped'},
			{name: 'hintButton', kind: Button, small: true, minWidth: false, content: 'Set Hint', ontap: 'hintButtonTapped'},
			{name: 'toggle', kind: ToggleButton, small: true, toggleOnLabel: 'disabled is on', toggleOffLabel: 'disabled is off', ontap: 'disabledTapped'}
		]},
		{name: 'container', kind: Scroller, fit: true, components: [
			{classes: 'moon-1v'},
			{kind: Control, tag: 'br'},
			{kind: Divider, content: 'Case 1: Non spotlight'},
			{kind: Icon, icon: 'play', small: false, ontap: 'buttonTapped'},
			{kind: Icon, src: '@../assets/icon-list.png', ontap: 'buttonTapped'},
			{classes: 'moon-1v'},
			{kind: Control, tag: 'br'},
			{kind: Divider, content: 'Case 2: User defined'},
			{kind: Item, classes: 'moon-hspacing', ontap: 'buttonTapped', components: [
				{content: 'Content and Icon'},
				{kind: Icon, src: '@../assets/icon-list.png', ontap: 'buttonTapped'}
			]},
			{name: 'checkItem', kind: Item, classes: 'moon-hspacing', ontap: 'buttonTapped', components: [
				{content: 'Content and Checkbox'},
				{name: 'checkbox', kind: Checkbox, spotlight:false, checked: true}
			]},
			{classes: 'moon-1v'},
			{kind: Control, tag: 'br'},
			{kind: Divider, content: 'Case 3: Non content'},
			{kind: IconButton, icon: 'drawer', small: false, ontap: 'buttonTapped'},
			{kind: IconButton, src: '@../assets/icon-list.png', small: false, ontap: 'buttonTapped'}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'console', content: 'No changes yet'}
	],
	rendered: function () {
		Control.prototype.rendered.apply(this, arguments);
		this.$.checkItem.setAttribute('role', 'checkbox');
		this.$.checkItem.setAttribute('aria-checked', this.$.checkbox.getChecked());
	},
	buttonTapped: function (sender, event) {
		this.$.console.setContent(sender.get('accessibilityDisabled') ? 'accessibility disabled' : sender.getAttribute('aria-label') +' tapped.');
		this.$.checkbox.setChecked(!this.$.checkbox.getChecked());
		this.$.checkItem.setAttribute('aria-checked', this.$.checkbox.getChecked());
	},
	labelButtonTapped: function (sender, event) {
		this.$.header.setTitleBelow('Set all control\'s accessibilityLabel to \'Label\'');
		var i,
			control = Object.keys(this.$);
		for (i = 0; i < control.length; ++i) {
			this.$[control[i]].set('accessibilityLabel', this.labelText);
			if (this.$[control[i]] == this.$.checkItem) {
				this.$[control[i]].setAttribute('role', 'checkbox');
			}
		}
	},
	hintButtonTapped: function (sender, event) {
		this.$.header.setTitleBelow('Set all control\'s accessibilityHint to \'Hint\'');
		var i,
			control = Object.keys(this.$);
		for (i = 0; i < control.length; ++i) {
			this.$[control[i]].set('accessibilityHint', this.hintText);
			if (this.$[control[i]] == this.$.checkItem) {
				this.$[control[i]].setAttribute('role', 'checkbox');
			}
		}
	},
	disabledTapped: function (sender, event) {
		this.$.header.setTitleBelow('Set all control\'s accessibilityDisabled to ' + sender.value);
		var i,
			control = Object.keys(this.$);
		for (i = 0; i < control.length; ++i) {
			this.$[control[i]].set('accessibilityDisabled', sender.value ? true : false);
			if (this.$[control[i]] == this.$.checkItem) {
				this.$[control[i]].setAttribute('role', 'checkbox');
			}
		}
	}
});
