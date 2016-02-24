require('enyo/options').accessibility = true;

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready');

var
	Svg = require('svg');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		BasicSample: require('./src/BasicSample')
	};

var Sample = kind({
	kind: ScrollingSampleList,
	title: 'SVG Samples',
	version: Svg.version,
	libraryName: 'Svg',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
});

