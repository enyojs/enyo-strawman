require('enyo/options').accessibility = true;

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready'),
	Enyo_webOS = require('enyo-webos');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		LunaServiceSample: require('./src/LunaServiceSample')
	};

var Sample = kind({
	kind: SampleList,
	title: 'enyo-webos Samples',
	version: Enyo_webOS.version,
	libraryName: 'webOS',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
});
