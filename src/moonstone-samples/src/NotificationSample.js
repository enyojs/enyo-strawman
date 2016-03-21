var
	kind = require('enyo/kind');

var
	Notify = require('moonstone/Notification'),
	BodyText = require('moonstone/BodyText'),
	Button = require('moonstone/Button'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	Divider = require('moonstone/Divider');

module.exports = kind({
	name: 'moon.sample.NotificationSample',
	classes: 'moon enyo-unselectable enyo-fit moon-notification-sample',
	components: [
		{kind: Divider, content: 'Notifications'},

		{classes: 'moon-hspacing moon-vspacing-s', components: [
			{kind: Button, content: 'Plain Text', ontap: 'showPopup', popup: 'basicNotification'},
			{kind: Button, content: 'Hide', ontap: 'hidePopup', popup: 'basicNotification'}
		]},
		{classes: 'moon-1v'},
		{classes: 'moon-hspacing moon-vspacing-s', components: [
			{kind: Button, content: 'Components', ontap: 'showPopup', popup: 'componentNotification'}
		]},
		{classes: 'moon-1v'},
		{classes: 'moon-hspacing moon-vspacing-s', components: [
			{kind: Button, content: 'Non-Animating', ontap: 'showPopup', popup: 'basicNotification', direct: true},
			{kind: Button, content: 'Hide', ontap: 'hidePopup', popup: 'basicNotification', direct: true}
		]},
		{classes: 'moon-1v'},
		{kind: Divider, content: 'Customize Notifications\' Contents'},
		{kind: InputDecorator, spotlight: true, components: [
			{name: 'contentsField', kind: Input, placeholder: 'Notification Contents', value: 'I\'m a notification...'}
		]},

		{name: 'basicNotification', kind: Notify},
		{name: 'componentNotification', kind: Notify, classes: 'moon-hspacing', components: [
			{name: 'bodyTextContent', kind: BodyText, styles: 'white-space: wrap'},
			{kind: Button, content: 'Close', small: true, ontap: 'hidePopup', popup: 'componentNotification'}
		]}
	],
	bindings: [
		{from: '$.contentsField.value', to: '$.basicNotification.content'},
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
