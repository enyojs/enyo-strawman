var
	kind = require('enyo/kind');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		HeartAnimation: require('./src/HeartAnimation'),
		PathAnimation: require('./src/PathAnimation')
		// CanvasPrimitivesSample: require('./src/CanvasPrimitivesSample')
	};

module.exports = kind({
	kind: ScrollingSampleList,
	title: 'Animation Samples',
	libraryName: 'Animation',
	samples: samples
});
