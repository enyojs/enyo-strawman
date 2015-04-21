var 
	kind = require('enyo/kind'),
	ready = require('enyo/ready');

var
	Anchor = require('enyo/Anchor'),
	Collection = require('enyo/Collection'),
	Control = require('enyo/Control'),
	DataRepeater = require('enyo/DataRepeater');

var
	samples = {
		Enyo: require('enyo-samples'),
		Layout: require('layout-samples')
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

ready(function(){
	var names = window.document.location.search.substring(1).split('&');
	var name = names[0];
	var sample = samples[name] || List;

	new sample().renderInto(document.body);
});
