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
	listType: '',
	components: [
		{name: 'repeater', classes: 'list-frame', kind: DataRepeater, components: [
			{kind: Link, classes: 'item', bindings: [
				{from: 'model.name', to: 'href', transform: function (v) {
						var lib = this.owner.libraryName || '';
						if (lib) { lib+= '&'; }
						return '?' + lib + v;
					}
				},
				{from: 'model.name', to: 'content'}
			]
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
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.listTypeChanged();
		}
	}),
	listTypeChanged: function (old) {
		this.$.repeater.removeClass(old);
		this.$.repeater.addClass(this.get('listType'));
	}
});
