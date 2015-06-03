var
	kind = require('enyo/kind');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		Basic: require('./lib/BasicSample')
	};

module.exports = kind({
	kind: SampleList,
	title: 'SVG Samples',
	libraryName: 'Svg',
	samples: samples
});
