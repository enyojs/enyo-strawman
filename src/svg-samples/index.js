var
	kind = require('enyo/kind');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		BasicSample: require('./src/BasicSample')
	};

module.exports = kind({
	kind: SampleList,
	title: 'SVG Samples',
	libraryName: 'Svg',
	useScroller: true,
	samples: samples
});
