var
	Scroller = require('enyo/Scroller');

var
	SampleList = require('./SampleList');

module.exports = SampleList.kind({
	components: [
		{name: 'client', kind: Scroller, classes: 'enyo-fit'}
	]
});