var
	kind = require('enyo/kind'),
	Enyo_webOS = require('enyo-webos');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		LunaServiceSample: require('./src/LunaServiceSample')
	};

module.exports = kind({
	kind: ScrollingSampleList,
	title: 'enyo-webos Samples',
	version: Enyo_webOS.version,
	libraryName: 'webOS',
	samples: samples
});
