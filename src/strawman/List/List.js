var
	kind = require('enyo/kind');

var
	Collection = require('enyo/Collection'),
	Scroller = require('enyo/Scroller'),
	DataRepeater = require('enyo/DataRepeater');

var
	Link = require('../Link');

module.exports = kind({
	kind: Scroller,
	classes: 'strawman-list enyo-fit',
	samples: null,
	libraryName: '',
	listType: 'list',
	components: [
		{name: 'repeater', classes: 'list-frame', kind: DataRepeater, components: [
			{kind: Link, classes: 'item', bindings: [
				{from: 'model.name', to: 'href', transform: function (v) {
						var lib = this.owner.libraryName || '';
						if (lib) { lib+= '&'; }
						return '?' + lib + v;
					}
				},
				{from: 'model.name', to: 'content', transform: function (name) {
					return name.replace(/Sample$/i, '');
				}},
				{from: 'model.badgeClasses', to: 'badgeClasses'}
			]}
		]}
	],
	bindings: [
		{from: 'samples', to: '$.repeater.collection', transform: function (v) {
				if (!v) { return v; }
				return (v instanceof Collection) ? v : new Collection(Object.keys(v).map(function (key) {
					// Make an object that contains all of the strings and booleans etc that we can use as a model for our sample collection.
					var sampleModel = {name: key};
					for (var prop in v[key]) {
						// Don't bother copying functions
						if (typeof v[key][prop] != 'function') {
							sampleModel[prop] = v[key][prop];
						}
					}
					return sampleModel;
				}));
			}
		}
	],
	create: function () {
		this.inherited(arguments);
		this.listTypeChanged();
	},
	listTypeChanged: function (old) {
		this.$.repeater.removeClass(old);
		this.$.repeater.addClass(this.get('listType'));
	}
});
