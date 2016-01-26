var
	kind = require('enyo/kind');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		LunaServiceSample: require('./src/LunaServiceSample')
	};

module.exports = kind({
	kind: SampleList,
	title: 'enyo-webos Samples',
	libraryName: 'webOS',
	samples: samples
});
