var
	kind = require('enyo/kind');

var
	Img = require('enyo/Image'),
	Repeater = require('enyo/Repeater'),
	Divider = require('moonstone/Divider'),
	Item = require('moonstone/Item'),
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.ScrollerHorizontalSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Divider, content: 'Horizontal Scroller'},
		{kind: Scroller, vertical: 'hidden', spotlight: 'container', style: 'white-space: nowrap;', components: [
			{kind: Repeater, count: '50', components: [
				{kind: Item, classes: 'moon-scroller-sample-item enyo', style: 'display:inline-block;', components: [
					{kind: Img, src: 'moonstone/images/enyo-icon.png'}
				]}
			]}
		]}
	]
});
