var
	strawman = require('../src');

var 
	ready = require('enyo/ready'),
	kind = require('enyo/kind');

var 

	oldSampler = require('../src/moonstone-samples/lib/All');

var
	newSampler = kind({
		kind: oldSampler
	});

newSampler.samples = {
	ButtonSample: require('./src/ButtonSample.js')
}

strawman.samples['MoonstoneExtra'] = newSampler;

ready(function(){
	var names = window.document.location.search.substring(1).split('&');
	var name = names[0];
	var sample = strawman.samples[name] || strawman.List;
	new sample().renderInto(document.body);
});