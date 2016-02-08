require('enyo/options').accessibility = true;

var
	ready = require('enyo/ready'),
	kind = require('enyo/kind');

var
	strawman = require('../src');

var
	samples = {
		Enyo: require('../src/enyo-samples'),
		Garnet: require('./src'),
		Layout: require('../src/layout-samples'),
		Spotlight: require('../src/spotlight-samples'),
		iLib: require('../src/enyo-ilib-samples'),
		Onyx: require('../src/onyx-samples'),
		Canvas: require('../src/canvas-samples'),
		Svg: require('../src/svg-samples')
	};

var
	List = kind({
		kind: strawman.List,
		samples: samples
	});

ready(function () {
	var names = window.document.location.search.substring(1).split('&'),
		name = names[0],
		Sample = samples[name] || List;

	strawman.utils.renderSample(Sample);
});

module.exports = {
	samples: samples,
	List: List
};
