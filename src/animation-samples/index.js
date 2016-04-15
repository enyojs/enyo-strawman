var
	kind = require('enyo/kind'),
	ready = require('enyo/ready');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		EaseAnimation: require('./src/EaseAnimation'),
		ControlAnimation: require('./src/HeartAnimation'),
		// LinkedAnimation: require('./src/TrampolineEffect'),
		// ColorAnimation: require('./src/SolarEclipse'),
		// PerspectiveAnimation: require('./src/PerspectiveCube'),
		// PathAnimation: require('./src/PathAnimation')
		//yet to be added 
		// HierarchicalAnimation: require('./src/HierarchicalAnimation')
		// EqualizerAnimation: require('./src/EqualizerAnimation')
	};

var Sample = kind({
	kind: ScrollingSampleList,
	title: 'Animation Samples',
	version: '1.0.0',
	libraryName: 'enyo',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
});

