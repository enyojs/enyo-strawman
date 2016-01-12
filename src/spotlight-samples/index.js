var
	kind = require('enyo/kind');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		Container			: require('./src/ContainerSample'),
		Disappear			: require('./src/DisappearSample'),
		Hold				: require('./src/HoldSample'),
		Sandbox				: require('./src/SpotlightSandboxSample'),
		TestPage			: require('./src/TestPage')
	};

module.exports = kind({
	kind: SampleList,
	title: 'Spotlight Samples',
	libraryName: 'Spotlight',
	samples: samples
});
