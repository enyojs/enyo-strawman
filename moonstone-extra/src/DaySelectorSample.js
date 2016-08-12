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
			{kind: DaySelector, name: 'selector', noneText: 'Pick a Day', onChange: 'changed'}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'result', content: 'No change yet'}
	],
	changed: function (sender, ev) {
		if (this.$.result && ev.content){
			this.$.result.setContent('Selection changed to "' + ev.content + '"');
		}
	}
});