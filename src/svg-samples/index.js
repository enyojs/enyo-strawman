require('enyo/options').accessibility = true;

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready');

var
	Svg = require('svg');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		BasicSample: require('./src/BasicSample')
	};

var Sample = kind({
	kind: SampleList,
	title: 'SVG Samples',
	version: Svg.version,
	libraryName: 'Svg',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
});
