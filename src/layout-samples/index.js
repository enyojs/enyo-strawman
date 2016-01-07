var
	kind = require('enyo/kind');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		ContextualLayoutSample			: require('./lib/ContextualLayoutSample'),
		EasingSample					: require('./lib/EasingSample'),
		FittableAppLayout1				: require('./lib/FittableAppLayout1'),
		FittableAppLayout2				: require('./lib/FittableAppLayout2'),
		FittableAppLayout3				: require('./lib/FittableAppLayout3'),
		FittableAppLayout4				: require('./lib/FittableAppLayout4'),
		FittableDescription				: require('./lib/FittableDescription'),
		FittableTests					: require('./lib/FittableTests'),
		FittableSample					: require('./lib/FittableSample'),
		FlyweightRepeaterSample			: require('./lib/FlyweightRepeaterSample'),
		ImageCarouselSample				: require('./lib/ImageCarouselSample'),
		ImageViewSample					: require('./lib/ImageViewSample'),
		ListAroundSample				: require('./lib/ListAroundSample'),
		ListBasicSample					: require('./lib/ListBasicSample'),
		ListContactsSample				: require('./lib/ListContactsSample'),
		ListHorizontalFlickrSample		: require('./lib/ListHorizontalFlickrSample'),
		ListLanguagesSample				: require('./lib/ListLanguagesSample'),
		ListNoSelectSample				: require('./lib/ListNoSelectSample'),
		ListPulldownSample				: require('./lib/ListPulldownSample'),
		PersistentSwipeableItemSample	: require('./lib/PersistentSwipeableItemSample'),
		PanelsSample					: require('./lib/PanelsSample'),
		PanelsFlickrSample				: require('./lib/PanelsFlickrSample'),
		PanelsSlidingSample				: require('./lib/PanelsSlidingSample'),
		PanZoomView1Sample				: require('./lib/PanZoomViewSample'),
		PanZoomView2Sample				: require('./lib/PanZoomViewSample2'),
		PanZoomView3Sample				: require('./lib/PanZoomViewSample3'),
		SlideableSample					: require('./lib/SlideableSample'),
		TreeSample						: require('./lib/TreeSample')
	};

module.exports = kind({
	kind: SampleList,
	title: 'Layout Samples',
	libraryName: 'Layout',
	samples: samples
});
