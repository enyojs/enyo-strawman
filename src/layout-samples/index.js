var
	kind = require('enyo/kind');

var
	Anchor = require('enyo/Anchor'),
	Collection = require('enyo/Collection'),
	Control = require('enyo/Control'),
	DataRepeater = require('enyo/DataRepeater');

var
	samples = {
		ContextualLayout			: require('./lib/ContextualLayoutSample'),
		Easing						: require('./lib/EasingSample'),
		FittableAppLayout1			: require('./lib/FittableAppLayout1'),
		FittableAppLayout2			: require('./lib/FittableAppLayout2'),
		FittableAppLayout3			: require('./lib/FittableAppLayout3'),
		FittableAppLayout4			: require('./lib/FittableAppLayout4'),
		FittableDescription			: require('./lib/FittableDescription'),
		FittableTests				: require('./lib/FittableTests'),
		Fittable					: require('./lib/FittableSample'),
		FlyweightRepeater			: require('./lib/FlyweightRepeaterSample'),
		ImageCarousel				: require('./lib/ImageCarouselSample'),
		ImageView					: require('./lib/ImageViewSample'),
		ListAround					: require('./lib/ListAroundSample'),
		ListBasic					: require('./lib/ListBasicSample'),
		ListContacts				: require('./lib/ListContactsSample'),
		ListHorizontalFlickr		: require('./lib/ListHorizontalFlickrSample'),
		ListLanguages				: require('./lib/ListLanguagesSample'),
		ListNoSelect				: require('./lib/ListNoSelectSample'),
		ListPulldown				: require('./lib/ListPulldownSample'),
		PersistentSwipeableItem		: require('./lib/PersistentSwipeableItemSample'),
		Panels						: require('./lib/PanelsSample'),
		PanelsFlickr				: require('./lib/PanelsFlickrSample'),		
		PanelsSliding				: require('./lib/PanelsSlidingSample'),
		PanZoomView1				: require('./lib/PanZoomViewSample'),
		PanZoomView2				: require('./lib/PanZoomViewSample2'),
		PanZoomView3				: require('./lib/PanZoomViewSample3'),
		Slideable					: require('./lib/SlideableSample'),
		Tree						: require('./lib/TreeSample')
	};

var List = kind({
	kind: Control,
	components: [
		{name: 'list', kind: DataRepeater, components: [
			{style: 'margin: 10px;', components: [
				{name: 'a', kind: Anchor}
			], bindings: [
				{from: 'model.name', to: '$.a.href', transform: function (v) { return '?Layout&' + v; }},
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