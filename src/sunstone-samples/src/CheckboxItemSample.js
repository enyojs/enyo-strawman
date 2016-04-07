var
	kind = require('enyo/kind'),
	Group = require('enyo/Group');

var
	FittableRows = require('layout/FittableRows');

var
	Scroller = require('sunstone/Scroller'),
	CheckboxItem = require('sunstone/CheckboxItem');

module.exports = kind({
	name: "sun.sample.CheckboxItemSample",
	kind: FittableRows,
	classes: 'enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, components: [
			{components: [
				{content: "Checkbox Items", classes: "checkbox-divider checkbox-sample"},
				{kind: CheckboxItem, classes: "checkbox-sample", content: "Option 1", subContent: "google@gmail.com", checked: true, onchange: "itemChanged"},
				{kind: CheckboxItem, classes: "checkbox-sample", content: "Option 2", onchange: "itemChanged"},
				{kind: CheckboxItem, classes: "checkbox-sample", disabled: true, content: "Disabled", onchange: "itemChanged"},
				{kind: CheckboxItem, classes: "checkbox-sample", content: "Option 3", subContent:"lge@lge.com", onchange: "itemChanged"}
			]},
			{components: [
				{content: "Checkbox Item Group", classes: "checkbox-divider checkbox-sample"},
				{kind: Group, onActivate: "groupChanged", components: [
					{kind: CheckboxItem, classes: "checkbox-sample", content: "Group Option 1"},
					{kind: CheckboxItem, classes: "checkbox-sample", subContent: "google@gmail.com", content: "Group Option 2", checked: true},
					{kind: CheckboxItem, classes: "checkbox-sample", disabled: true, content: "Disabled"},
					{kind: CheckboxItem, classes: "checkbox-sample", subContent: "lge@lge.com", content: "Group Option 3"}
				]}
			]},
			{components: [
				{tag: "br"},
				{content: "Result", classes: "checkbox-divider checkbox-sample"},
				{name: "result", classes: "checkbox-sample", content:"Nothing selected"}
			]}
		]}
	],
	itemChanged: function(inSender, inEvent) {
		this.$.result.setContent(inSender.getContent() + " was " + (inSender.getChecked() ? " selected." : "deselected."));
	},
	groupChanged: function(inSender, inEvent) {
		if (inEvent.toggledControl.getChecked()) {
			var selected = inEvent.toggledControl.getContent();
			this.$.result.setContent(selected + " was selected.");
		}
	}
});