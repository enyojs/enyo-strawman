var
	kind = require('enyo/kind');

var
	Canvas = require('canvas');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		CanvasBallsSample: require('./src/CanvasBallsSample')
		// CanvasPrimitivesSample: require('./src/CanvasPrimitivesSample')
	};

module.exports = kind({
	kind: ScrollingSampleList,
	title: 'Canvas Samples',
	version: Canvas.version,
	libraryName: 'Canvas',
	samples: samples
});
