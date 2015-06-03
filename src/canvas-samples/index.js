var
	kind = require('enyo/kind');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		CanvasBalls: require('./lib/CanvasBallsSample')
		// CanvasPrimitives: require('./lib/CanvasPrimitivesSample')
	};

module.exports = kind({
	kind: SampleList,
	title: 'Canvas Samples',
	libraryName: 'Canvas',
	samples: samples
});
