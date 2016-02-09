var
	kind = require('enyo/kind');

var
	Canvas = require('canvas');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		CanvasBallsSample: require('./src/CanvasBallsSample')
		// CanvasPrimitivesSample: require('./src/CanvasPrimitivesSample')
	};

module.exports = kind({
	kind: SampleList,
	title: 'Canvas Samples',
	version: Canvas.version,
	libraryName: 'Canvas',
	samples: samples
});
