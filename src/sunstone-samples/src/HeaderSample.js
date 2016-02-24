var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows');

var
	Header = require('sunstone/Header'),
	Button = require('sunstone/Button'),
	ToggleButton = require('sunstone/ToggleButton'),
	ToastPopup = require('sunstone/ToastPopup');


module.exports = kind({
	name: "sun.sample.HeaderSample",
	kind: FittableRows,
	classes: "enyo-unselectable sun-header-sample enyo-fit",
	components: [
		{kind: Header, content: "Header"},
		{tag: "br"},
		{kind: Header, title: "Header", showBackButton: true, onBackButtonTapped: "buttonTapped", components: [
			{kind: ToggleButton, classes: "header-sample-toggle"},
			{kind: Button, content: "button", classes: "header-sample-button"}
		]},
		{name: "toastpopup", kind: ToastPopup, showDuration: 2000, content: "Hello toastpopup!"}
	],
	buttonTapped: function(inSender, inEvent){
		this.$.toastpopup.setContent("header backbutton Tapped !!");
		this.$.toastpopup.show();
	}
});