var
	kind = require('enyo/kind');

var
	SampleList = require('../strawman/SampleList');

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

module.exports = kind({
	kind: SampleList,
	title: 'Layout Samples',
	libraryName: 'Layout',
	samples: samples
});
