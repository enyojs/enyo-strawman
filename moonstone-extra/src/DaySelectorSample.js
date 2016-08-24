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
			{name: 'normal', kind: DaySelector, content: 'Normal Selector', noneText: 'Pick a Day', onChange: 'normalChanged'},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Result'},
			{name: 'normalResult', kind: BodyText},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Pre-loaded Selector'},
			{name: 'pre', kind: DaySelector, content: 'Pre-loaded Selector', noneText: 'Pick a Day', selectedIndex: [0,2,5], onChange: 'preChanged'},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Result'},
			{name: 'preResult', kind: BodyText}
		]}
	],
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			var content = DaySelector.formatDayString(this.$.pre.selectedIndex);
			this.updateResult(this.$.preResult, this.$.pre, content);
		};
	}),
	preChanged: function (sender, ev) {
		this.updateResult(this.$.preResult, this.$.pre, ev.content);
	},
	normalChanged: function (sender, ev) {
		this.updateResult(this.$.normalResult, this.$.normal, ev.content);
	},
	updateResult: function (result, selector, content) {
		result.set('content', selector.content + ' changed to "' + content + '"');
	}
});
