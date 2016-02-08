var
	kind = require('enyo/kind');

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
	libraryName: 'Canvas',
	useScroller: true,
	samples: samples
});
