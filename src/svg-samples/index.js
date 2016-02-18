var
	kind = require('enyo/kind');

var
	Svg = require('svg');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		BasicSample: require('./src/BasicSample')
	};

module.exports = kind({
	kind: ScrollingSampleList,
	title: 'SVG Samples',
	version: Svg.version,
	libraryName: 'Svg',
	samples: samples
});
