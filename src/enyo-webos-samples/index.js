var
	kind = require('enyo/kind'),
	Enyo_webOS = require('enyo-webos');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		LunaServiceSample: require('./src/LunaServiceSample')
	};

module.exports = kind({
	kind: SampleList,
	title: 'enyo-webos Samples',
	version: Enyo_webOS.version,
	libraryName: 'webOS',
	samples: samples
});
