var
	kind = require('enyo/kind'),
	canvas = require('canvas');

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
	version: canvas.version,
	libraryName: 'Canvas',
	samples: samples
});
