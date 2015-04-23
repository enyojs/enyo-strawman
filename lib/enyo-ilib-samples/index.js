// For simplicity, we'll require the full ilib since this is the root of the sample 'app'. The
// individual samples can then safely import the root enyo-ilib package knowing that the app
// registered which version it wanted.
// require('enyo-ilib/full');

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
		AddressFormatting	: require('./lib/AddressFormatting'),
		AddressParsing		: require('./lib/AddressParsing'),
		AdvDateFormatting	: require('./lib/AdvDateFormatting'), //still has onyx timepicker
		DateFormatting: require('./lib/DateFormatting'),
		LocaleInfo: require('./lib/LocaleInfo'),
		NameFormatting: require('./lib/NameFormatting'),
		NameParsing: require('./lib/NameParsing'),
		NumberFormatting: require('./lib/NumberFormatting')
	};

var List = kind({
	kind: Control,
	components: [
		{name: 'list', kind: DataRepeater, components: [
			{style: 'margin: 10px;', components: [
				{name: 'a', kind: Anchor}
			], bindings: [
				{from: 'model.name', to: '$.a.href', transform: function (v) { return '?iLib&' + v; }},
				{from: 'model.name', to: '$.a.content', transform: function (v) { return v + ' Sample'; }}
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

module.exports = kind({
	create: function() {
		
		this.inherited(arguments);
		
		var names = window.document.location.search.substring(1).split('&');
		var name = names[1] || names[0];
		
		var sample = samples[name] || List;
		
		this.createComponent({kind:sample});
	}
});