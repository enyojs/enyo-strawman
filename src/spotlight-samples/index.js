var
	kind = require('enyo/kind'),
	Spotlight = require('spotlight');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		ContainerSample			: require('./src/ContainerSample'),
		DisappearSample			: require('./src/DisappearSample'),
		HoldSample				: require('./src/HoldSample'),
		SandboxSample			: require('./src/SpotlightSandboxSample'),
		TestPage				: require('./src/TestPage')
	};

module.exports = kind({
	kind: ScrollingSampleList,
	title: 'Spotlight Samples',
	version: Spotlight.version,
	libraryName: 'Spotlight',
	samples: samples
});
