require('garnet');

var
	kind = require('enyo/kind'),
	Arc = require('garnet/Arc'),
	Panel = require('garnet/Panel');

var ArcPanel = kind({
	name: 'g.sample.ArcPanel',
	kind: Panel,
	style: 'position: relative; border-radius: 50%; background-color: #000000;',
	components: [
		{name: 'arc1', kind: Arc, color: '#FF3300', width: 10, diameter: 30},
		{name: 'arc2', kind: Arc, color: '#FF6600', width: 11, diameter: 70},
		{name: 'arc3', kind: Arc, color: '#FF9900', width: 12, diameter: 110},
		{name: 'arc4', kind: Arc, color: '#FFFF00', width: 13, diameter: 150},
		{name: 'arc5', kind: Arc, color: '#CCFF00', width: 14, diameter: 190},
		{name: 'arc6', kind: Arc, color: '#99FF00', width: 15, diameter: 230},
		{name: 'arc7', kind: Arc, color: '#66FF00', width: 16, diameter: 270},
		{name: 'arc8', kind: Arc, color: '#33FF00', width: 17, diameter: 310}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);

			this.$.arc1.draw(-2.5,3.5);
			this.$.arc2.draw(-2.2,3.1);
			this.$.arc3.draw(-1.9,2.7);
			this.$.arc4.draw(-1.6,2.3);
			this.$.arc5.draw(-1.3,1.9);
			this.$.arc6.draw(-1.0,1.5);
			this.$.arc7.draw(-0.7,1.1);
			this.$.arc8.draw(-0.4,0.7);
		};
	})
});

module.exports = kind({
	name: 'g.sample.ArcSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< Arc Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Arc', classes: 'g-sample-subheader'},
		{kind: ArcPanel}
	],
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
