var
	kind = require('enyo/kind');

var
	Layout = require('layout');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		ContextualLayoutSample			: require('./src/ContextualLayoutSample'),
		EasingSample					: require('./src/EasingSample'),
		FittableAppLayout1				: require('./src/FittableAppLayout1'),
		FittableAppLayout2				: require('./src/FittableAppLayout2'),
		FittableAppLayout3				: require('./src/FittableAppLayout3'),
		FittableAppLayout4				: require('./src/FittableAppLayout4'),
		FittableDescription				: require('./src/FittableDescription'),
		FittableTests					: require('./src/FittableTests'),
		FittableSample					: require('./src/FittableSample'),
		FlyweightRepeaterSample			: require('./src/FlyweightRepeaterSample'),
		ImageCarouselSample				: require('./src/ImageCarouselSample'),
		ImageViewSample					: require('./src/ImageViewSample'),
		ListAroundSample				: require('./src/ListAroundSample'),
		ListBasicSample					: require('./src/ListBasicSample'),
		ListContactsSample				: require('./src/ListContactsSample'),
		ListHorizontalFlickrSample		: require('./src/ListHorizontalFlickrSample'),
		ListLanguagesSample				: require('./src/ListLanguagesSample'),
		ListNoSelectSample				: require('./src/ListNoSelectSample'),
		ListPulldownSample				: require('./src/ListPulldownSample'),
		PersistentSwipeableItemSample	: require('./src/PersistentSwipeableItemSample'),
		PanelsSample					: require('./src/PanelsSample'),
		PanelsFlickrSample				: require('./src/PanelsFlickrSample'),
		PanelsSlidingSample				: require('./src/PanelsSlidingSample'),
		PanZoomView1Sample				: require('./src/PanZoomViewSample'),
		PanZoomView2Sample				: require('./src/PanZoomViewSample2'),
		PanZoomView3Sample				: require('./src/PanZoomViewSample3'),
		SlideableSample					: require('./src/SlideableSample'),
		TreeSample						: require('./src/TreeSample')
	};

module.exports = kind({
	kind: SampleList,
	title: 'Layout Samples',
	version: Layout.version,
	libraryName: 'Layout',
	samples: samples
});
