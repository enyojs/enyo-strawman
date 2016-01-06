var
	kind = require('enyo/kind');

var
	Control = require('enyo/Control'),
	Scroller = require('enyo/Scroller'),
	Select = require('enyo/Select'),
	TranslateScrollStrategy = require('enyo/TranslateScrollStrategy'),
	TransitionScrollStrategy = require('enyo/TransitionScrollStrategy'),
	TouchScrollStrategy = require('enyo/TouchScrollStrategy');

var text =  'Foo<br>Bar<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>' +
			'Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. <br>Foo<br>Bar<br>Bar<br>' +
			'Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>' +
			'Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. <br>Foo<br>Bar<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>' +
			'Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>' +
			'Foo<br>Bar<br>Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. <br>Foo<br>Bar<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>' +
			'Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. <br>';

module.exports = kind({
	name: 'enyo.sample.ScrollerSample',
	kind: Control,
	classes: 'enyo-fit enyo-unselectable',
	components: [
		{classes: 'scroller-sample-menu', components: [
			{content: 'Choose Scroller', style: 'width: 250px;'},
			{kind: Select, floating: true, maxHeight: 300, onchange: 'sampleChanged', components: [
				{value: '_default', content: 'Default scroller', active: true},
				{value: '_force', content: 'Force touch scroller'},
				{value: '_horizontal', content: 'Horizontal only'},
				{value: '_vertical', content: 'Vertical only'},
				{value: '_touchscroll', content: 'Force TouchScrollStrategy'},
				{value: '_transitionscroll', content: 'Force TransitionScrollStrategy'},
				{value: '_translatescroll', content: 'Force TranslateScrollStrategy'}
			]}
		]},
		{name: 'default', kind: Scroller, classes: 'scroller-sample-scroller', components: [
			{classes: 'scroller-sample-content', content: text, allowHtml: true}
		]},
		// Forces touch scrolling, even on desktop
		{name: 'force', kind: Scroller, touch: true, classes: 'scroller-sample-scroller', components: [
			{classes: 'scroller-sample-content', content: text, allowHtml: true}
		]},
		// Horizontal-only scrolling
		{name: 'horizontal', kind: Scroller, vertical: 'hidden', classes: 'scroller-sample-scroller', components: [
			{classes: 'scroller-sample-content', content: text, allowHtml: true}
		]},
		// Vertical-only scrolling
		{name: 'vertical', kind: Scroller, horizontal: 'hidden', classes: 'scroller-sample-scroller', onmousedown: 'mouseDown', ondragstart: 'dragStart', components: [
			{classes: 'scroller-sample-content', content: text, allowHtml: true}
		]},
		// Force specific strategies
		{name: 'touchscroll', kind: Scroller, classes: 'scroller-sample-scroller', strategyKind: TouchScrollStrategy, components: [
			{classes: 'scroller-sample-content', content: text, allowHtml: true}
		]},
		{name: 'transitionscroll', kind: Scroller, classes: 'scroller-sample-scroller', strategyKind: TransitionScrollStrategy, components: [
			{classes: 'scroller-sample-content', content: text, allowHtml: true}
		]},
		{name: 'translatescroll', kind: Scroller, classes: 'scroller-sample-scroller', strategyKind: TranslateScrollStrategy, components: [
			{classes: 'scroller-sample-content', content: text, allowHtml: true}
		]}
	],
	create: function () {
		this.inherited(arguments);

		//hide other scrollers
		this.$.force.hide();
		this.$.horizontal.hide();
		this.$.vertical.hide();
		this.$.touchscroll.hide();
		this.$.transitionscroll.hide();
		this.$.translatescroll.hide();
		this.lastScroller = 'default';
	},
	sampleChanged: function (sender, ev) {
		var lastScroller = this.lastScroller;
		var scrollerName = sender.getValue().substr(1);
		this.$[scrollerName].show();
		this.$[lastScroller].hide();
		this.lastScroller = scrollerName;
	},
	// The following are used when this sample is called from the Sampler app
	mouseDown: function (sender, ev) {
		ev.preventDefault();
	},
	dragStart: function (sender, ev) {
		if (ev.horizontal) {
			// Prevent drag propagation on horizontal drag events
			return true;
		}
	}
});