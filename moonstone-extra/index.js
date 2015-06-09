var
	ready = require('enyo/ready');

var
	strawman = require('./src');

ready(function () {
	var names = window.document.location.search.substring(1).split('&'),
		name = names[0],
		Sample = strawman.samples[name] || strawman.List;
	new Sample().renderInto(document.body);
});
