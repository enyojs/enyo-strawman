require('enyo/options').accessibility = true;

var
	ready = require('enyo/ready');

var
	strawman = require('./src');

ready(function () {
	
	var names = window.document.location.search.substring(1).split('&'),
		name = names[0],
		Sample = strawman.samples[name] || strawman.List;
	
	if(Sample instanceof window.request) {
	
		//check to see if the sample is wrapped in
		//request instead of being required into the build
		
		//do something with moonstone history now
		strawman.History.then(function(history){
			history.set('enableBackHistoryAPI', false);
		});
		
		Sample.then(function(res){
			new res().renderInto(document.body);
		});
		
		
	} else {
		
		new Sample().renderInto(document.body);
	}
});
