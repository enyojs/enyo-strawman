var
	kind = require('enyo/kind');

var
	Group = require('enyo/Group');

var
	FittableRows = require('layout/FittableRows');

var
	RadioItem = require('sunstone/RadioItem'),
	Scroller = require('sunstone/Scroller');

module.exports = kind({
	name: 'sun.sample.RadioItemSample',
	kind: FittableRows,
	classes: 'sun enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, fit: true, components: [
			{components: [
				{kind: Group, onActivate: 'groupChanged', components: [
					{kind: RadioItem, content: 'Group Option 1', subContent: 'google@gmail.com'},
					{tag:'br'},
					{kind: RadioItem, content: 'Group Option 2', checked: true},
					{tag:'br'},
					{kind: RadioItem, disabled: true, content: 'Disabled'},
					{tag:'br'},
					{kind: RadioItem, content: 'Group Option 3', subContent: 'lge@lge.com'}
				]}
			]},
			{tag:'br'},
			{components: [
				{name:'result', content:'Nothing selected'}
			]}
		]}
	],
	groupChanged: function(inSender, inEvent) {
		if (inEvent.toggledControl.getChecked()) {
			var selected = inEvent.toggledControl.getContent();
			this.$.result.setContent(selected + ' was selected.');
		}
	}
});