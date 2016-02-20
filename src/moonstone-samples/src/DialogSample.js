var
	kind = require('enyo/kind');

var
	Divider = require('moonstone/Divider'),
	Button = require('moonstone/Button'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	InputDecorator = require('moonstone/InputDecorator'),
	Input = require('moonstone/Input'),
	Dialog = require('moonstone/Dialog');

module.exports = kind({
	name: 'moons.sample.DialogSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Divider, content: 'Dialog'},
		{kind: Button, content: 'Open Dialog', ontap: 'showDialog'},
		{classes: 'moon-1v'},
		{kind: Divider, content: 'Options'},
		{kind: CheckboxItem, content: 'Tap outside to close (autoDismiss)', name: 'autoDismissToggle'},
		{kind: CheckboxItem, content: 'Modal', name: 'modalToggle'},
		{kind: CheckboxItem, content: 'Show Close Button', name: 'showCloseButtonToggle'},
		{kind: CheckboxItem, content: 'Animate', name: 'animateToggle'},
		{kind: CheckboxItem, content: 'Lock 5-way inside popup (spotlightModal)', name: 'spotlightModalToggle'},
		{kind: CheckboxItem, content: 'Close by back key (allowBackKey)', name: 'allowBackKeyToggle'},
		{kind: CheckboxItem, content: 'Use divider to separate title from body', name: 'useDivider'},
		{classes: 'moon-1v'},
		{kind: Divider, content: 'Set a custom title, or remove the titles'},
		{kind: InputDecorator, components: [
			{kind: Input, placeholder: 'Title', value: 'Dialog Title', name: 'inputTitle'}
		]},
		{kind: InputDecorator, components: [
			{kind: Input, placeholder: 'Sub-Title', value: 'A subtitle for dialog.', name: 'inputSubTitle'}
		]},
		{
			name: 'dialog',
			kind: Dialog,
			title: 'You\'ve been watching TV for a very long time so let\'s do a quick check-in.',
			subTitle: 'This TV has been active for 10 hours.',
			message: 'Perhaps it is time to take a break and get some fresh air. There is a nice coffee shop around the corner',
			// message: [
			// 	{kind: Button, content: 'Fancy button'}
			// ],
			components: [
				{kind: Button, content: 'Go get a coffee', ontap: 'hideDialog'},
				{kind: Button, content: 'Keep watching TV', ontap: 'addMessage'}
			]
		}
	],
	bindings: [
		{from: '$.dialog.autoDismiss', to: '$.autoDismissToggle.checked', oneWay: false},
		{from: '$.dialog.modal', to: '$.modalToggle.checked', oneWay: false},
		{from: '$.dialog.showCloseButton', to: '$.showCloseButtonToggle.checked', oneWay: false},
		{from: '$.dialog.animate', to: '$.animateToggle.checked', oneWay: false},
		{from: '$.dialog.spotlightModal', to: '$.spotlightModalToggle.checked', oneWay: false},
		{from: '$.dialog.allowBackKey', to: '$.allowBackKeyToggle.checked', oneWay: false},
		{from: '$.dialog.useDivider', to: '$.useDivider.checked', oneWay: false},
		{from: '$.dialog.title', to: '$.inputTitle.value', oneWay: false},
		{from: '$.dialog.subTitle', to: '$.inputSubTitle.value', oneWay: false}
	],
	showDialog: function (sender) {
		this.$.dialog.show();
	},
	hideDialog: function (sender, ev) {
		this.$.dialog.hide();
	},
	addMessage: function () {
		this.$.dialog.setMessage(this.$.dialog.getMessage() + '<br> No, seriously, you should probably take a break.');
	}
});