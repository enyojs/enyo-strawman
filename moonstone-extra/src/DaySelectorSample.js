var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows');

var
	Scroller = require('moonstone/Scroller'),
	DaySelector = require('moonstone-extra/DaySelector'),
	Divider = require('moonstone/Divider'),
	BodyText = require('moonstone/BodyText');

module.exports = kind({
	name: 'moons.sample.DaySelectorSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, fit: true, components: [
			{kind: Divider, content: 'Normal Selector'},
			{kind: DaySelector, content: 'Normal Selector', noneText: 'Pick a Day', onChange: 'changed'},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Pre-loaded Selector'},
			{kind: DaySelector, content: 'Pre-loaded Selector', noneText: 'Pick a Day', selectedIndex: [0,2,5], onChange: 'changed'}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'result', content: 'No change yet'}
	],
	changed: function (sender, ev) {
		var selector = ev.originator.getContent();
		if (this.$.result && ev.content){
			this.$.result.setContent(selector + ' changed to "' + ev.content + '"');
		}
	}
});
