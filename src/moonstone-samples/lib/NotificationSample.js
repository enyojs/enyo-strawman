var
	kind = require('enyo/kind');

var
	Notify = require('moonstone/Notification'),
	Button = require('moonstone/Button'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	Tooltip = require('moonstone/Tooltip'),
	TooltipDecorator = require('moonstone/TooltipDecorator'),
	Divider = require('moonstone/Divider');

module.exports = kind({
	name: 'moon.sample.NotificationSample',
	classes: 'moon enyo-unselectable enyo-fit moon-notification-sample',
	components: [
		{classes: 'button-container', components: [
			{kind: Divider, content: 'Small Notifications'},
			{classes: 'moon-hspacing moon-vspacing-s', components: [
				{kind: Button, content: 'Say Hello', ontap: 'showPopup', popup: 'greetingNotification'},
				{kind: Button, content: 'Basic', ontap: 'showPopup', popup: 'basicNotification'}
			]},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Large Notifications'},
			{classes: 'moon-hspacing moon-vspacing-s', components: [
				{kind: Button, content: 'Many buttons', ontap: 'showPopup', popup: 'componentNotification'}
			]},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Animate Notifications'},
			{classes: 'moon-hspacing moon-vspacing-s', components: [
				{kind: Button, content: 'Basic', ontap: 'showPopup', popup: 'animateNotification'}
			]},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Immediate Notifications'},
			{classes: 'moon-hspacing moon-vspacing-s', components: [
				{kind: Button, content: 'Basic', ontap: 'showPopup', popup: 'immediateNotification', direct: true}
			]},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Customize Notifications\' Contents'},
			{kind: InputDecorator, spotlight: true, components: [
				{name: 'contentsField', kind: Input, placeholder: 'Notification Contents', value: 'I\'m a notification...'}
			]}
		]},

		{name: 'greetingNotification', kind: Notify, content: 'Hello', components: [
			{kind: Button, content: 'Howdy', ontap: 'hidePopup', popup: 'greetingNotification'}
		]},
		{name: 'basicNotification', kind: Notify, content: 'Small notification', components: [
			{kind: Button, content: 'Close', ontap: 'hidePopup', popup: 'basicNotification'}
		]},
		{name: 'componentNotification', kind: Notify, wide: true, content: 'Not to worry, this message isn\'t going to be very long. It just has to be long enough to show what a long message looks like. That\'s all; have a nice day.' , components: [
			{kind: Button, content: 'First Button!'},
			{kind: Button, content: 'Oh my yes, kittens'},
			{kind: TooltipDecorator, classes: 'right', components: [
				{kind: Button, content: 'hide and show', ontap: 'hideshow'},
				{name: 'toolTip', kind: Tooltip, uppercase: false, content: 'To show tooltip case.'}
			]},
			{kind: Button, content: 'Close', ontap: 'hidePopup', popup: 'componentNotification'}
		]},
		{name: 'animateNotification', kind: Notify, animate: true, content: 'Animate notification', components: [
			{kind: Button, content: 'Close', ontap: 'hidePopup', popup: 'animateNotification'}
		]},
		{name: 'immediateNotification', kind: Notify, content: 'Immediate notification', components: [
			{kind: Button, content: 'Close', ontap: 'hidePopup', popup: 'immediateNotification', direct: true}
		]}
	],
	bindings: [
		{from: '$.contentsField.value', to: '$.basicNotification.content'},
		{from: '$.contentsField.value', to: '$.bodyTextContent.content'}
	],
	hideshow: function () {
		this.$.componentNotification.hide();
		this.$.greetingNotification.show();
	},
	showPopup: function (sender) {
		var p = this.$[sender.popup];
		if (p) {
			if (sender.direct) {
				p.showDirect();
			} else {
				p.show();
			}
		}
	},
	hidePopup: function (sender) {
		var p = this.$[sender.popup];
		if (p) {
			if(sender.direct) {
				p.hideDirect();
			} else {
				p.hide();
			}
		}
	}
});

module.exports.badgeClasses = 'new wip';