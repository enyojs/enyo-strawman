require('enyo/options').accessibility = true;

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready');

var
	Canvas = require('canvas');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		CanvasBallsSample: require('./src/CanvasBallsSample')
		// CanvasPrimitivesSample: require('./src/CanvasPrimitivesSample')
	};

var Sample = kind({
	kind: ScrollingSampleList,
	title: 'Canvas Samples',
	version: Canvas.version,
	libraryName: 'Canvas',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
});

