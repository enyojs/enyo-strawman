var 
	kind = require('enyo/kind');

var 
	Anchor = require('enyo/Anchor'),
	Button = require('enyo/Button'),
	Collection = require('enyo/Collection'),
	Component = require('enyo/Component'),
	Control = require('enyo/Control'),
	DataRepeater = require('enyo/DataRepeater'),
	ScrollStrategy = require('enyo/ScrollStrategy'),
	TouchScrollStrategy = require('enyo/TouchScrollStrategy'),
	TranslateScrollStrategy = require('enyo/TranslateScrollStrategy'),
	TransitionScrollStrategy = require('enyo/TransitionScrollStrategy'),
	Select = require('enyo/Select');

var
	DataListSample = require('./DataListSample'),
	DataGridListSample = require('./DataGridListSample');

var samples = {
	'DataList' : null,
	'DataGridList' : null
};

var strategies = {
	'Native' : {strategyKind: ScrollStrategy},
	'Touch' : {strategyKind: TouchScrollStrategy},
	'Translate' : {strategyKind: TranslateScrollStrategy},
	'Translate (Optimized)' : {strategyKind: TranslateScrollStrategy, translateOptimized: true},
	'Transition' : {strategyKind: TransitionScrollStrategy}
};

var TestMixin = {
	classes: 'enyo-unselectable',
	strategy: 'Native',
	addTestControls: function() {
		this.createComponent({
			style: 'position: absolute; top: 0; left: 0; right: 0; padding: 0.5em', defaultKind: Button, components: [
				{kind: Select, onchange: 'sampleChanged', components: this.buildMenu(samples, 'sample')},
				{kind: Select, onchange: 'strategyChanged', components: this.buildMenu(strategies, 'strategy')},
				{content: 'Scroll to Random Pos', ontap: 'scrollToRandomPos'},
				{content: 'Scroll to Top', ontap: 'scrollToTop'},
				{content: 'Scroll to Bottom', ontap: 'scrollToBottom'},
				{content: 'Scroll to Random Item', ontap: 'scrollToRandomItem'}
			]
		});
	},
	scrollToRandomPos: function() {
		var max = this.s.getScrollBounds().maxTop,
			pos = Math.random() * max;
		this.s.scrollTo(0, pos);
	},
	scrollToTop: function() {
		this.s.scrollToTop();
	},
	scrollToBottom: function() {
		this.s.scrollToBottom();
	},
	scrollToRandomItem: function() {
		var n = this.r.collection.length,
			i = Math.floor(Math.random() * n);
		this.r.scrollToIndex(i);
	},
	create: kind.inherit(function(sup) {
		return function() {
			var ov = {repeater: {scrollerOptions: strategies[this.strategy]}};
			this.kindComponents = Component.overrideComponents(this.kindComponents, ov, Control);
			sup.apply(this, arguments);
			this.r = this.$.repeater;
			this.s = this.r.$.scroller;
			// global reference for easier console testing
			global._sample = this;
			//hack
			if (this.strategy == 'Translate (Optimized)') {
				this.s.$.strategy.translateOptimized = true;
			}
			this.addTestControls();
		};
	}),
	strategyChanged: function(sender, event) {
		this.rebuild({strategy: event.originator.value}, samples[this.sample]);
	},
	sampleChanged: function(sender, event) {
		this.rebuild({strategy: this.strategy}, samples[event.originator.value]);
	},
	rebuild: function(props, Ctor) {
		var pn = this.hasNode().parentNode;
		this.destroy();
		new Ctor(props).renderInto(pn);
	},
	buildMenu: function(opts, val) {
		var ss = Object.keys(opts), c = [], i, s;
		for (i = 0; !!(s = ss[i]); i++) {
			c.push({content: s, selected: s == this[val]});
		}
		return c;
	}
};

samples.DataList = kind({
	name: 'enyo.sample.DataListScrollTestbed',
	kind: DataListSample,
	sample: 'DataList',
	mixins: [TestMixin]
});

samples.DataGridList = kind({
	name: 'enyo.sample.DataGridListScrollTestbed',
	kind: DataGridListSample,
	sample: 'DataGridList',
	mixins: [TestMixin]
});

module.exports = samples.DataList;