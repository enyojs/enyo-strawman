var
	kind = require('enyo/kind');

var
	Collection = require('enyo/Collection'),
	Control = require('enyo/Control'),
	NewDrawer = require('enyo/NewDrawer'),
	DataRepeater = require('enyo/DataRepeater'),
	Scroller = require('enyo/Scroller');

module.exports = kind({
	name: 'enyo.sample.NewDrawerSample',
	kind: Control,
	components: [
		{kind: Scroller, classes: 'enyo-fit', components: [
			{
				kind: NewDrawer,
				components: [
					{
						name: 'r',
						kind: DataRepeater,
						components: [
							{
								bindings: [
									{from: 'model.label', to: 'content'}
								]
							}
						]
					}
				]
			},
			{content: 'foo'}
		]}
	],
	create: kind.inherit(function (sup) {
		return function () {
			var n = 50,
				d = [];

			sup.apply(this, arguments);

			for (var i = 0; i < n; i++) {
				d.push({label: 'Item ' + (i + 1)});
			}

			this.$.r.collection = new Collection(d);
		};
	})
});

module.exports.badgeClasses = 'wip';
