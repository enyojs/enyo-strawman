var
	kind = require('enyo/kind');

var
	List = require('../List');

var
	samples = {
		ContextualLayout			: request('./lib/ContextualLayoutSample'),
		Easing						: request('./lib/EasingSample'),
		FittableAppLayout1			: request('./lib/FittableAppLayout1'),
		FittableAppLayout2			: request('./lib/FittableAppLayout2'),
		FittableAppLayout3			: request('./lib/FittableAppLayout3'),
		FittableAppLayout4			: request('./lib/FittableAppLayout4'),
		FittableDescription			: request('./lib/FittableDescription'),
		FittableTests				: request('./lib/FittableTests'),
		Fittable					: request('./lib/FittableSample'),
		FlyweightRepeater			: request('./lib/FlyweightRepeaterSample'),
		ImageCarousel				: request('./lib/ImageCarouselSample'),
		ImageView					: request('./lib/ImageViewSample'),
		ListAround					: request('./lib/ListAroundSample'),
		ListBasic					: request('./lib/ListBasicSample'),
		ListContacts				: request('./lib/ListContactsSample'),
		ListHorizontalFlickr		: request('./lib/ListHorizontalFlickrSample'),
		ListLanguages				: request('./lib/ListLanguagesSample'),
		ListNoSelect				: request('./lib/ListNoSelectSample'),
		ListPulldown				: request('./lib/ListPulldownSample'),
		PersistentSwipeableItem		: request('./lib/PersistentSwipeableItemSample'),
		Panels						: request('./lib/PanelsSample'),
		PanelsFlickr				: request('./lib/PanelsFlickrSample'),		
		PanelsSliding				: request('./lib/PanelsSlidingSample'),
		PanZoomView1				: request('./lib/PanZoomViewSample'),
		PanZoomView2				: request('./lib/PanZoomViewSample2'),
		PanZoomView3				: request('./lib/PanZoomViewSample3'),
		Slideable					: request('./lib/SlideableSample'),
		Tree						: request('./lib/TreeSample')
	};

module.exports = kind({
	baseHref: 'Layout',
	kind: List,
	classes: 'enyo-fit',
	samples: Object.keys(samples),
	sampleChanged: function () {
		this.log(this.sample);
		
		var app = this.app;
		samples[this.sample].then(function (Sample) {
			app.setupView(Sample, function () { app.reRender(); });
		});
	}
});