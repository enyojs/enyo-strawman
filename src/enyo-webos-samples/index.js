var
	kind = require('enyo/kind'),
	enyo_webos = require('enyo-webos');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		LunaServiceSample: require('./src/LunaServiceSample')
	};

module.exports = kind({
	kind: SampleList,
	title: 'enyo-webos Samples',
	version: enyo_webos.version,
	libraryName: 'webOS',
	samples: samples
});
