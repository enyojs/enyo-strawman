var 
	kind = require('enyo/kind');

var 
	Anchor = require('enyo/Anchor'),
	Collection = require('enyo/Collection'),
	Component = require('enyo/Component'),
	Control = require('enyo/Control'),
	DataListSample = require('./DataListSample'),
	DataRepeater = require('enyo/DataRepeater'),
	ScrollStrategy = require('enyo/ScrollStrategy'),
	TouchScrollStrategy = require('enyo/TouchScrollStrategy'),
	TranslateScrollStrategy = require('enyo/TranslateScrollStrategy'),
	TransitionScrollStrategy = require('enyo/TransitionScrollStrategy'),
	Select = require('enyo/Select');

var TestMixin = {
	classes: 'enyo-unselectable',
	strategy: 'Native',
	strategies: {
		'Native' : {strategyKind: ScrollStrategy},
		'Touch' : {strategyKind: TouchScrollStrategy},
		'Translate' : {strategyKind: TranslateScrollStrategy},
		'Translate (Optimized)' : {strategyKind: TranslateScrollStrategy, translateOptimized: true},
		'Transition' : {strategyKind: TransitionScrollStrategy}
	},
	samples: {
		'DataList' : 'enyo.sample.DataListScrollTestbed',
		'DataGridList' : 'enyo.sample.DataGridListScrollTestbed'
	},
	addTestControls: function() {
		this.createComponent({
			style: 'position: absolute; top: 0; left: 0; right: 0; padding: 0.5em', defaultKind: 'enyo.Button', components: [
				{kind: Select, onchange: 'sampleChanged', components: this.buildMenu('samples', 'sample')},
				{kind: Select, onchange: 'strategyChanged', components: this.buildMenu('strategies', 'strategy')},
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
			var ov = {repeater: {scrollerOptions: this.strategies[this.strategy]}};
			this.kindComponents = Component.overrideComponents(this.kindComponents, ov, Control);
			sup.apply(this,arguments);
			this.r = this.$.repeater;
			this.s = this.r.$.scroller;
			// global reference for easier console testing
			window._sample = this;
			//hack
			if (this.strategy == 'Translate (Optimized)') {
				this.s.$.strategy.translateOptimized = true;
			}
			this.addTestControls();
		};
	}),
	strategyChanged: function(sender, event) {
		this.rebuild({strategy: event.originator.value});
	},
	sampleChanged: function(sender, event) {
		this.rebuild({strategy: this.strategy}, this.samples[event.originator.value]);
	},
	rebuild: function(props, kindName) {
		var pn = this.hasNode().parentNode, Ctor = kind.constructorForKind(kindName || this.kindName);
		this.destroy();
		new Ctor(props).renderInto(pn);
	},
	buildMenu: function(opts, val) {
		var ss = Object.keys(this[opts]), c = [], i, s;
		for (i = 0; !!(s = ss[i]); i++) {
			c.push({content: s, selected: s == this[val]});
		}
		return c;
	}
};

var	
	samples = {
		DataListScrollTestbed : kind({
			name: 'enyo.sample.DataListScrollTestbed',
			kind: DataListSample,
			sample: 'DataList',
			mixins: [TestMixin]
		}),
		DataGridListScrollTestbed : kind({
			name: 'enyo.sample.DataGridListScrollTestbed',
			kind: DataListSample,
			sample: 'DataGridList',
			mixins: [TestMixin]
		})
	};

var List = kind({
	components: [
		{name: 'list', kind: DataRepeater, components: [
			{style: 'margin: 10px;', components: [
				{name: 'a', kind: Anchor}
			], bindings: [
				{from: 'model.name', to: '$.a.href', transform: function (v) { return '?Enyo&DataListScrollTestbed&' + v; }},
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
		var name = names[2] || names[0];
		
		var sample = samples[name] || List;
		
		this.createComponent({kind:sample});
	}
});
