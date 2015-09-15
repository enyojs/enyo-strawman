var
	kind = require('enyo/kind'),
	Collection = require('enyo/Collection');

var
	DataGridList = require('sunstone/DataGridList'),
	GridListImageItem = require('sunstone/GridListImageItem'),
	playFeedback = require('sunstone/feedback');

module.exports = kind({
	name: 'sun.sample.DataGridListSample',
	classes: 'enyo-fit data-grid-sample',
	components: [
		{name: 'gridList', spacing: 6, minWidth: 100, minHeight: 150, kind: DataGridList, components: [
			{
				ondown: 'pressed',
				onup: 'unpressed',
				onleave: 'unpressed',
				ontap: 'itemTapped',
				kind: GridListImageItem,
				source: '@../assets/default-music.png',
				bindings: [
					{from: '.model.text', to: '.caption'}
				]
			}
		]}
	],
	pressed: function(inSender, e) {
		inSender.addClass('pressed');
	},
	unpressed: function(inSender, e) {
		inSender.removeClass('pressed');
	},
	itemTapped: function() {
		playFeedback();
	},
	create: function () {
		this.inherited(arguments);
		var c = new Collection();
		for (var $i=0, r$=[]; r$.length<300; ++$i) {
			r$.push({text: 'Item ' + $i});
		}
		c.add(r$);
		this.$.gridList.set('collection', c);
	}
});
