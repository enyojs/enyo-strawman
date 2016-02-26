require('enyo/options').accessibility = true;

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready'),
	Enyo_webOS = require('enyo-webos');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		LunaServiceSample: require('./src/LunaServiceSample')
	};

var Sample = kind({
	kind: ScrollingSampleList,
	title: 'webOS Samples',
	version: Enyo_webOS.version,
	libraryName: 'webOS',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
});

