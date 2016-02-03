var
	kind = require('enyo/kind'),
	spotlight = require('spotlight');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		ContainerSample			: require('./src/ContainerSample'),
		DisappearSample			: require('./src/DisappearSample'),
		HoldSample				: require('./src/HoldSample'),
		SandboxSample			: require('./src/SpotlightSandboxSample'),
		TestPage				: require('./src/TestPage')
	};

module.exports = kind({
	kind: SampleList,
	title: 'Spotlight Samples',
	version: spotlight.version,
	libraryName: 'Spotlight',
	samples: samples
});
