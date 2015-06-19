var
	kind = require('enyo/kind');

var
	SampleList = require('./strawman/SampleList'),
	History = require('moonstone/History');

var
	samples = {
		// Enyo: require('./enyo-samples'),
		// Layout: require('./layout-samples'),
		// Onyx: require('./onyx-samples'),
		// Moonstone: require('./moonstone-samples'), //router blocking
		// Spotlight: require('./spotlight-samples'),
	  	// iLib: require('./enyo-ilib-samples'),
	  	// Canvas: require('./canvas-samples'),
	  	// Svg: require('./svg-samples')
	};

var
	List = kind({
		kind: SampleList,
		title: 'Enyo Strawman - Samples Gallery',
		classes: 'home',
		listType: 'grid',
		samples: samples
	});

History.set('enableBackHistoryAPI', false);

module.exports = {
	samples: samples,
	List: List
};
