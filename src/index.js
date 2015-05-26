var
	kind = require('enyo/kind');

var
	Anchor = require('enyo/Anchor'),
	Collection = require('enyo/Collection'),
	Control = require('enyo/Control'),
	DataRepeater = require('enyo/DataRepeater'),
	History = require('moonstone/History');

var
	samples = {
		Enyo: require('./enyo-samples'),
		Layout: require('./layout-samples'),
		Onyx: require('./onyx-samples'),
		Moonstone: require('./moonstone-samples'), //router blocking
		Spotlight: require('./spotlight-samples'),
	  	iLib: require('./enyo-ilib-samples'),
	  	Canvas: require('./canvas-samples'),
	  	Svg: require('./svg-samples')
	};

var
	List = kind({
		components: [
			{name: 'list', kind: DataRepeater, components: [
				{style: 'margin: 10px;', components: [
					{name: 'a', kind: Anchor}
				], bindings: [
					{from: 'model.name', to: '$.a.href', transform: function (v) { return '?' + v; }},
					{from: 'model.name', to: '$.a.content', transform: function (v) { return v + ' Samples'; }}
				]}
			]}
		],
		create: function () {
			Control.prototype.create.apply(this, arguments);
			this.$.list.set('collection', new Collection(Object.keys(samples).map(function (key) {
				return {name: key};
			})));
		}
	});

History.set('enableBackHistoryAPI', false);

module.exports = {
	samples: samples,
	List: List
};
