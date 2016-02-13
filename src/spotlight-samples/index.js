require('enyo/options').accessibility = true;

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready'),
	Spotlight = require('spotlight');

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

var Sample = kind({
	kind: SampleList,
	title: 'Spotlight Samples',
	version: Spotlight.version,
	libraryName: 'Spotlight',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
});
