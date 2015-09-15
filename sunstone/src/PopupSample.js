var
	kind = require('enyo/kind');

var
	Group = require('enyo/Group');

var
	RadioItem = require('sunstone/RadioItem'),
	Button = require('sunstone/Button'),
	Popup = require('sunstone/Popup');


module.exports = kind({
	name: "sun.sample.PopupSample",
	classes: "sun enyo-unselectable enyo-fit",
	components: [
		{content: "Popup"},
		{tag:'br'},
		{kind: Button, content: "Show Popup", ontap: "showPopup", popup: "basicPopup"},
		{name: "basicPopup", kind: Popup, classes: "sun-sample-popup", centered: true, components: [
			{classes: "dialog_title", content: "Confirmation"},
			{kind: Group, onActivate: "groupChanged", components: [
				{kind: RadioItem, classes: "dialog_radioitem", radioOnRight: true, content: "Group Option 1"},
				{classes: "dialog_divider"},
				{kind: RadioItem, classes: "dialog_radioitem", radioOnRight: true, content: "Group Option 2", checked: true},
				{classes: "dialog_divider"},
				{kind: RadioItem, classes: "dialog_radioitem", radioOnRight: true, disabled: true, content: "Disabled"},
				{classes: "dialog_divider"},
				{kind: RadioItem, classes: "dialog_radioitem sub", radioOnRight: true, content: "Group Option 3", subContent:"google@gmail.com"},
				{classes: "dialog_divider"}
			]},
			{classes: "command_buttons_wrapper", components: [
				{classes: "command_buttons", components: [
					{kind: Button, content: "OK", classes: "bottom-okcancle-button", ontap: "hidePopups"},
					{kind: Button, content: "CANCEL", classes: "bottom-okcancle-button", ontap: "hidePopups"}
				]}
			]}
		]}
	],
	popupActivator: null,
	showPopup: function(inSender) {
		this.hidePopups();
		var p = this.$[inSender.popup];
		if (p) {
			p.show();
		}
	},
	hidePopups: function() {
		this.$.basicPopup.hide();
	}
});