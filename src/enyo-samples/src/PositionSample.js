var
	kind = require('enyo/kind'),
	dispatcher = require('enyo/dispatcher');

var
	Control = require('enyo/Control');

var PositionSampleNested = kind({
	name: 'enyo.sample.PositionSampleNested',
	kind: Control,
	defaultProps: {style: 'padding: 10px; width: 100px; display: inline-block; text-align: right;'},
	text: '',
	create: function () {
		this.inherited(arguments);
		this.$.label.set('content', this.name);
	},
	components: [
		{name: 'label', tag: 'span'},
		{name: 'text', tag: 'span'}
	],
	bindings: [
		{from: '.text', to: '.$.text.content'}
	]
});

module.exports = kind({
	name: 'enyo.sample.PositionSample',
	defaultKind: PositionSampleNested,
	classes:'enyo-fit',
	components: [
		{name: 'clientX'},
		{name: 'clientY'},
		{name: 'pageX'},
		{name: 'pageY'},
		{name: 'screenX'},
		{name: 'screenY'}
	],
	handlers: {'onmove': 'moved'},
	rendered: function () {
		this.inherited(arguments);
	},
	moved: function () {
		var p = dispatcher.getPosition();
		for (var k in p) {
			this.$[k].set('text', p[k]);
		}
	}
});
