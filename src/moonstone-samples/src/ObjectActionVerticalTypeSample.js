var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	Img = require('enyo/Image'),
	Repeater = require('enyo/Repeater'),
	FittableRows = require('layout/FittableRows'),
	Divider = require('moonstone/Divider'),
	Scroller = require('moonstone/Scroller'),
	Item = require('moonstone/Item'),
	Button = require('moonstone/Button'),
	ObjectActionDecorator = require('moonstone/ObjectActionDecorator'),
	BodyText = require('moonstone/BodyText');

module.exports = kind({
	name: 'moon.sample.ObjectActionVerticalTypeSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	handlers: {
		ontap: 'ontap'
	},
	components: [
		{kind: Divider, content: 'Object Action: vertical Type Sample'},
		{kind: Scroller, fit: true, components: [
			{kind: Repeater, count: 20, classes: 'moon-hspacing', onSetupItem: 'setupItem', components: [
				{
					kind: ObjectActionDecorator,
					orientation: 'vertical',
					components: [
						{kind: Item, components: [
							{name: 'image', kind: Img}
						]}
					],
					actionComponents: [
						{kind: Button, name: 'Play', small: true, content: 'PLAY'},
						{kind: Button, name: 'Favorite', small: true, content: 'FAVORITE'},
						{kind: Button, name: 'Share', small: true, content: 'SHARE'}
					]
				}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'result', content: 'No item tapped yet.'}
	],
	setupItem: function (sender, ev) {
		var imageUrl = 'http://placehold.it/%./' + Math.floor(Math.random()*0x1000000).toString(16) + '/ffffff&text=Image ' + ev.index;
		ev.item.$.image.setSrc({
			'hd' : utils.format(imageUrl, '132x132'),
			'fhd': utils.format(imageUrl, '198x198')
		});
	},
	ontap: function (sender, ev) {
		this.$.result.setContent(ev.originator.name + ' tapped.');
	}
});


