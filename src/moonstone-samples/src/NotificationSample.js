var
	kind = require('enyo/kind');

var
	Notify = require('moonstone/Notification'),
	Button = require('moonstone/Button'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
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
				{kind: Button, content: 'Many buttons', ontap: 'showPopup', popup: 'componentNotification'},
				{kind: Button, content: 'No buttons', ontap: 'showPopup', popup: 'emptyNotification'},
				{kind: Button, content: 'Hide', ontap: 'hidePopup', popup: 'emptyNotification'}
			]},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Immediete Notifications'},
			{classes: 'moon-hspacing moon-vspacing-s', components: [
				{kind: Button, content: 'Show', ontap: 'showPopup', popup: 'basicNotification', direct: true},
				{kind: Button, content: 'Hide', ontap: 'hidePopup', popup: 'basicNotification', direct: true}
			]},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Customize Notifications\' Contents'},
			{kind: InputDecorator, spotlight: true, components: [
				{name: 'contentsField', kind: Input, placeholder: 'Notification Contents', value: 'I\'m a notification...'}
			]}
		]},

		{name: 'greetingNotification', kind: Notify, content: 'Hello', components: [
			{kind: Button, content: 'Howdy', small: true, ontap: 'hidePopup', popup: 'greetingNotification'}
		]},
		{name: 'basicNotification', kind: Notify, content: 'Small notification', components: [
			{kind: Button, content: 'Close', small: true, ontap: 'hidePopup', popup: 'basicNotification'}
		]},
		{name: 'emptyNotification', kind: Notify, content: 'Not even any buttons'},
		{name: 'componentNotification', kind: Notify, content: 'Not to worry, this message isn\'t going to be very long. It just has to be long enough to show what a long message looks like. That\'s all; have a nice day.' , components: [
			{kind: Button, content: 'First Button!', small: true},
			{kind: Button, content: 'Kittens', small: true},
			{kind: Button, content: 'Oh my yes, kittens', small: true},
			{kind: Button, content: 'Close', small: true, ontap: 'hidePopup', popup: 'componentNotification'}
		]}
	],
	bindings: [
		{from: '$.contentsField.value', to: '$.basicNotification.content'},
		{from: '$.contentsField.value', to: '$.emptyNotification.content'},
		{from: '$.contentsField.value', to: '$.bodyTextContent.content'}
	],
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
