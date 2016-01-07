var
	kind = require('enyo/kind');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		ContainerSample			: require('./lib/ContainerSample'),
		DisappearSample			: require('./lib/DisappearSample'),
		HoldSample				: require('./lib/HoldSample'),
		SandboxSample			: require('./lib/SpotlightSandboxSample'),
		TestPage				: require('./lib/TestPage')
	};

module.exports = kind({
	kind: SampleList,
	title: 'Spotlight Samples',
	libraryName: 'Spotlight',
	samples: samples
});
