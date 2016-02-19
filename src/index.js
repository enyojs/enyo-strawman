require('spotlight');

var
	kind = require('enyo/kind');

var
	SampleList = require('./strawman/SampleList');

var
	samples = require('./strawman/config');

var
	List = kind({
		kind: SampleList,
		title: 'Enyo Strawman - Samples Gallery',
		classes: 'home',
		listType: 'grid',
		samples: samples
	});

module.exports = {
	samples: samples,
	List: List
};
