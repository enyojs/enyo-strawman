var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	FittableRows = require('layout/FittableRows');

var
	BodyText = require('moonstone/BodyText'),
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
		{kind: Header, name: 'header', content: 'Accessibility', type: 'small', components: [
			{name: 'labelButton', kind: Button, small: true, minWidth: false, content: 'Set Label', ontap: 'labelButtonTapped'},
			{name: 'hintButton', kind: Button, small: true, minWidth: false, content: 'Set Hint', ontap: 'hintButtonTapped'},
			{name: 'toggle', kind: ToggleButton, small: true, toggleOnLabel: 'disabled is on', toggleOffLabel: 'disabled is off', ontap: 'disabledTapped'},
			{name: 'reload', kind: Button, small: true, content: 'Reload', ontap: 'reload'}
		]},
		{name: 'container', kind: Scroller, fit: true, components: [
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Icons: '},
			{kind: Icon, icon: 'play', small: false, ontap: 'buttonTapped', accessibilityLabel: 'play'},
			{kind: Icon, src: '@../assets/icon-list.png', ontap: 'buttonTapped', accessibilityLabel: 'icon List'},
			{kind: Item, classes: 'moon-hspacing', ontap: 'buttonTapped', accessibilityLabel: 'selectable icon List', components: [
				{content: 'Selectable Item', accessibilityDisabled: true},
				{kind: Icon, src: '@../assets/icon-list.png', ontap: 'buttonTapped'}
			]},
			{kind: Control, tag: 'br'},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Icon Buttons: '},
			{kind: IconButton, icon: 'drawer', small: false, ontap: 'buttonTapped', accessibilityLabel: 'drawer'},
			{kind: IconButton, src: '@../assets/icon-list.png', small: false, ontap: 'buttonTapped', accessibilityLabel: 'icon List'}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'console', content: 'No changes yet'}
	],
	buttonTapped: function (sender, event) {
		this.$.console.setContent(sender.get('accessibilityDisabled') ? 'accessibility disabled' : sender.getAttribute('aria-label') +' tapped.');
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
	},
	reload: function (sender, event) {
		window.location.reload();
	}
});
