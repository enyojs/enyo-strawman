require('enyo/options').accessibility = true;

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready'),
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

var Sample = kind({
	kind: ScrollingSampleList,
	title: 'Spotlight Samples',
	version: Spotlight.version,
	libraryName: 'Spotlight',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
});

