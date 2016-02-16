require('enyo/options').accessibility = true;

var
	ready = require('enyo/ready');

var
	strawman = require('./src');

function renderSample (Sample) {
	new Sample().renderInto(document.body);
}

ready(function () {

	var names = window.document.location.search.substring(1).split('&'),
		name = names[0],
		Sample = strawman.samples[name] || strawman.List;

	if (request.isRequest(Sample)) {
		//check to see if the sample is wrapped in
		//request instead of being required into the build
		Sample.then(renderSample);
	} else {
		renderSample(Sample);
	}
});
