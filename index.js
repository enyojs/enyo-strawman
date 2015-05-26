var
	strawman = require('./src');

var 
	ready = require('enyo/ready');

ready(function(){
	var names = window.document.location.search.substring(1).split('&');
	var name = names[0];
	var sample = strawman.samples[name] || strawman.List;
	new sample().renderInto(document.body);
});
