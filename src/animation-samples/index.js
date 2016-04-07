var
	kind = require('enyo/kind');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		EaseAnimation: require('./src/EaseAnimation'),
		ControlAnimation: require('./src/HeartAnimation'),
		LinkedAnimation: require('./src/TrampolineEffect'),
		ColorAnimation: require('./src/SolarEclipse'),
		PerspectiveAnimation: require('./src/PerspectiveCube'),
		PathAnimation: require('./src/PathAnimation')
		// HierarchicalAnimation: require('./src/HierarchicalAnimation')
		// EqualizerAnimation: require('./src/EqualizerAnimation')
		// CanvasPrimitivesSample: require('./src/CanvasPrimitivesSample')
	};

module.exports = kind({
	kind: ScrollingSampleList,
	title: 'Animation Samples',
	libraryName: 'Animation',
	samples: samples
});
