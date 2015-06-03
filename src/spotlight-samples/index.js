var
	kind = require('enyo/kind');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		Container			: require('./lib/ContainerSample'),
		Disappear			: require('./lib/DisappearSample'),
		Hold				: require('./lib/HoldSample'),
		Sandbox				: require('./lib/SpotlightSandboxSample'),
		TestPage			: require('./lib/TestPage')
	};

module.exports = kind({
	kind: SampleList,
	title: 'Spotlight Samples',
	libraryName: 'Spotlight',
	samples: samples
});
