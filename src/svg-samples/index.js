var
	kind = require('enyo/kind'),
	svg = require('svg');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		BasicSample: require('./src/BasicSample')
	};

module.exports = kind({
	kind: SampleList,
	title: 'SVG Samples',
	version: svg.version,
	libraryName: 'Svg',
	samples: samples
});
