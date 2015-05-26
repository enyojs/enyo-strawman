
var
	kind = require('enyo/kind');

var
	Anchor = require('enyo/Anchor'),
	Collection = require('enyo/Collection'),
	Scroller = require('enyo/Scroller'),
	DataRepeater = require('enyo/DataRepeater');

module.exports = kind({
	kind: Scroller,
	components: [
		{name: 'list', kind: DataRepeater, components: [
			{style: 'margin: 10px;', components: [
				{name: 'a', kind: Anchor}
			], bindings: [
				{from: 'model.name', to: '$.a.href', transform: 'getHref'},
				{from: 'model.name', to: '$.a.content', transform: 'getLabel'}
			]}
		]}
	],
	getHref: function (value) {
		return '#' + (this.baseHref ? (this.baseHref + '/') : '') + value;
	},
	getLabel: function (value) {
		return value;
	},
	create: kind.inherit(function (sup) {
		return function () {
			// @bug another work-around for bad implementation around ownership and context under
			// which binding transforms fire
			this.getHref = this.getHref.bind(this);
			this.getLabel = this.getLabel.bind(this);
			sup.apply(this, arguments);
			// another work-around for inconsistent application of ownership and the inability for
			// bindings to find their real transform owner in this case
			this.$.list.defaultProps.bindingTransformOwner = this;
			this.$.list.set('collection', new Collection(this.samples.map(function (key) {
				return {name: key};
			})));
		};
	})
});