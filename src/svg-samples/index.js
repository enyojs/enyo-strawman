var
	kind = require('enyo/kind');

var
	Svg = require('svg');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		BasicSample: require('./src/BasicSample')
	};

module.exports = kind({
	kind: SampleList,
	title: 'SVG Samples',
	version: Svg.version,
	libraryName: 'Svg',
	samples: samples
});
