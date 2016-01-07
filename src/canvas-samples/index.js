var
	kind = require('enyo/kind');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		CanvasBallsSample: require('./lib/CanvasBallsSample')
		// CanvasPrimitivesSample: require('./lib/CanvasPrimitivesSample')
	};

module.exports = kind({
	kind: SampleList,
	title: 'Canvas Samples',
	libraryName: 'Canvas',
	samples: samples
});
