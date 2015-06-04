var
	kind = require('enyo/kind');

var
	strawman = require('../../src');

var
	oldSampler = require('../../src/moonstone-samples/lib/All');

var
	newSampler = kind({
		kind: oldSampler,
		title: 'Moonstone Extra Samples'
	});

newSampler.samples = {
};

strawman.samples['MoonstoneExtra'] = newSampler;

module.exports = strawman;
