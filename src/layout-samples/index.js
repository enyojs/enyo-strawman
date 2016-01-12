var
	kind = require('enyo/kind');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		ContextualLayout			: require('./src/ContextualLayoutSample'),
		Easing						: require('./src/EasingSample'),
		FittableAppLayout1			: require('./src/FittableAppLayout1'),
		FittableAppLayout2			: require('./src/FittableAppLayout2'),
		FittableAppLayout3			: require('./src/FittableAppLayout3'),
		FittableAppLayout4			: require('./src/FittableAppLayout4'),
		FittableDescription			: require('./src/FittableDescription'),
		FittableTests				: require('./src/FittableTests'),
		Fittable					: require('./src/FittableSample'),
		FlyweightRepeater			: require('./src/FlyweightRepeaterSample'),
		ImageCarousel				: require('./src/ImageCarouselSample'),
		ImageView					: require('./src/ImageViewSample'),
		ListAround					: require('./src/ListAroundSample'),
		ListBasic					: require('./src/ListBasicSample'),
		ListContacts				: require('./src/ListContactsSample'),
		ListHorizontalFlickr		: require('./src/ListHorizontalFlickrSample'),
		ListLanguages				: require('./src/ListLanguagesSample'),
		ListNoSelect				: require('./src/ListNoSelectSample'),
		ListPulldown				: require('./src/ListPulldownSample'),
		PersistentSwipeableItem		: require('./src/PersistentSwipeableItemSample'),
		Panels						: require('./src/PanelsSample'),
		PanelsFlickr				: require('./src/PanelsFlickrSample'),
		PanelsSliding				: require('./src/PanelsSlidingSample'),
		PanZoomView1				: require('./src/PanZoomViewSample'),
		PanZoomView2				: require('./src/PanZoomViewSample2'),
		PanZoomView3				: require('./src/PanZoomViewSample3'),
		Slideable					: require('./src/SlideableSample'),
		Tree						: require('./src/TreeSample')
	};

module.exports = kind({
	kind: SampleList,
	title: 'Layout Samples',
	libraryName: 'Layout',
	samples: samples
});
