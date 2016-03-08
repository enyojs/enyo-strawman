var
	kind = require('enyo/kind');

var
	FittableColumns = require('layout/FittableColumns');

var
	ToggleButton = require('sunstone/ToggleButton');

module.exports = kind({
	name: "sun.sample.ToggleButtonSample",
	classes: "sun enyo-unselectable enyo-fit",
	components: [
		{kind: FittableColumns, components: [
			{fit: true, classes: 'divider-content', content: "Default ToggleButton"},
			{kind: ToggleButton}
		]},
		{tag: "br"},
		{kind: FittableColumns, components: [
			{fit: true, classes: 'divider-content', content: "Disable ToggleButton"},
			{kind: ToggleButton, active: true, disabled: true},
			{kind: ToggleButton, disabled: true}
		]},
		{tag: "br"},
		{kind: FittableColumns, components: [
			{name:"result", fit: true, classes: 'divider-content'},
			{name:"toggle", kind: ToggleButton, onChange: "toggleChanged"}
		]}
	],
	toggleChanged: function (inSender, inEvent) {
		var aThis = this;
		if (inEvent.active) {
			this.$.toggle.setDisabled(true);
			this.$.result.setContent("Turning On...");
			setTimeout(function () {
				aThis.$.toggle.setDisabled(false);
				aThis.$.result.setContent("Connection available");
			}, 2000);
		} else {
			this.$.toggle.setDisabled(false);
			this.$.result.setContent("Connection not allowed");
		}
	}
});