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

var CustomCheckboxItem = kind({
	kind: Item,
	checked: true,
	classes: 'moon-hspacing',
	bindings: [
		{from: 'content', to: '$.client.content'},
		{from: 'checked', to: '$.checkbox.checked'}
	],
	components: [
		{name: 'client'},
		{name: 'checkbox', kind: Checkbox, spotlight: false, checked: true}
	],
	tap: function () {
		var ret = Item.prototype.tap.apply(this, arguments),
			checked = this.$.checkbox.checked;

		if (!ret) {
			this.set('checked', !checked);
		}

		return ret;
	},

	// Accessibility

	accessibilityRole: 'checkbox',
	ariaObservers: [
		{from: 'checked', to: 'aria-checked'}
	]
});

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
			{name: 'checkItem', kind: CustomCheckboxItem, content: 'Content and Checkbox', ontap: 'buttonTapped'},
			{classes: 'moon-1v'},
			{kind: Control, tag: 'br'},
			{kind: Divider, content: 'Case 3: Non content'},
			{kind: IconButton, icon: 'drawer', small: false, ontap: 'buttonTapped', accessibilityLabel: 'drawer'},
			{kind: IconButton, src: '@../assets/icon-list.png', small: false, ontap: 'buttonTapped', accessibilityLabel: 'icon list'}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'console', content: 'No changes yet'}
	],
	buttonTapped: function (sender, event) {
		var result;
		if (sender.get('accessibilityDisabled')) {
			result = 'accessibility disabled';
		} else if (sender.getAttribute('aria-label')) {
			result = sender.getAttribute('aria-label') + ' tapped.';
		} else {
			result = sender.getContent();
		}
		this.$.console.setContent(result);
	},
	labelButtonTapped: function (sender, event) {
		this.$.header.setTitleBelow('Set all control\'s accessibilityLabel to \'Label\'');
		var i,
			control = Object.keys(this.$);
		for (i = 0; i < control.length; ++i) {
			this.$[control[i]].set('accessibilityLabel', this.labelText);
		}
	},
	hintButtonTapped: function (sender, event) {
		this.$.header.setTitleBelow('Set all control\'s accessibilityHint to \'Hint\'');
		var i,
			control = Object.keys(this.$);
		for (i = 0; i < control.length; ++i) {
			this.$[control[i]].set('accessibilityHint', this.hintText);
		}
	},
	disabledTapped: function (sender, event) {
		this.$.header.setTitleBelow('Set all control\'s accessibilityDisabled to ' + sender.value);
		var i,
			control = Object.keys(this.$);
		for (i = 0; i < control.length; ++i) {
			this.$[control[i]].set('accessibilityDisabled', sender.value ? true : false);
		}
	}
});
