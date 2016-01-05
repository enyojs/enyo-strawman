require('enyo/options').accessibility = true;

var
	ready = require('enyo/ready'),
	kind = require('enyo/kind');

var
	SampleList = require('../src/strawman/SampleList');

var
	resources = request('../src/moonstone-samples');	// Included for its assets and CSS

var
	samples = {
		Enyo: require('../src/enyo-samples'),
		Moonstone: request('./src'), //router blocking
		Layout: require('../src/layout-samples'),
		Spotlight: require('../src/spotlight-samples'),
		iLib: require('../src/enyo-ilib-samples'),
		Onyx: require('../src/onyx-samples'),
		Canvas: require('../src/canvas-samples'),
		Svg: require('../src/svg-samples')
	};

var
	List = kind({
		kind: SampleList,
		title: 'Enyo Strawman - Samples Gallery',
		classes: 'home',
		listType: 'grid',
		samples: samples
	});

function renderLazySample (sample) {
	sample.then(function (res) {
		new res().renderInto(document.body);
	});
}

ready(function () {
	var names = window.document.location.search.substring(1).split('&'),
		name = names[0],
		Sample = samples[name] || List;

	if (request.isRequest(Sample)) {
		//check to see if the sample is wrapped in
		//request instead of being required into the build

		if (name == 'Moonstone') {
			resources.then(function () { // load Moonstone resources, first
				renderLazySample(Sample);
			});
		} else {
			renderAsyncSample(Sample);
		}
	} else {
		new Sample().renderInto(document.body);
	}
});

module.exports = {
	samples: samples,
	List: List
};
