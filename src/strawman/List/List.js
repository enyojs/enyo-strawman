var
	kind = require('enyo/kind');

var
	// Control = require('enyo/Control'),
	Collection = require('enyo/Collection'),
	Scroller = require('enyo/Scroller'),
	Anchor = require('enyo/Anchor'),
	DataRepeater = require('enyo/DataRepeater');

module.exports = kind({
	kind: Scroller,
	classes: 'strawman-list enyo-fit',
	samples: null,
	libraryName: '',
	listType: '',
	components: [
		{name: 'repeater', classes: 'list-frame', kind: DataRepeater, components: [
			{classes: 'item', components: [
				{name: 'a', kind: Anchor}
			], bindings: [
				// {from: 'model.name', to: '$.a.href', transform: 'buildLink'},
				{from: 'model.name', to: '$.a.href', transform: function (v) {
						var lib = this.owner.libraryName || '';
						if (lib) { lib+= '&'; }
						// console.log("this:", this, lib);
						return '?' + lib + v;
					}
				},
				{from: 'model.name', to: '$.a.content', transform: function (v) { return v + ' Sample'; }}
			]
			// buildLink: function (v) {
			// 	var lib = this.owner.libraryName;
			// 	if (lib) { lib+= '&'; }
			// 	// console.log("this:", this, lib);
			// 	return '?' + lib + v;
			// }}
			}
		]}
	],
	bindings: [
		{from: 'samples', to: '$.repeater.collection', transform: function (v) {
				if (!v) { return v; }
				return (v instanceof Collection) ? v : new Collection(Object.keys(v).map(function (key) {
					return {name: key};
				}));
			}
		}
	],
	create: function () {
		this.inherited(arguments);
		// Control.prototype.create.apply(this, arguments);
		console.log("List:", this, this.samples);
		// this.$.repeater.set('collection', (this.samples instanceof Collection) ? this.samples : new Collection(Object.keys(this.samples).map(function (key) {
		// 	return {name: key};
		// })));
		this.listTypeChanged();
	},
	listTypeChanged: function (old) {
		this.$.repeater.removeClass(old);
		this.$.repeater.addClass(this.get('listType'));
	}
});
