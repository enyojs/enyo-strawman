var
	kind = require('enyo/kind');

var
	SampleList = require('./strawman/SampleList'),
	History = request('moonstone/History');

var
	samples = {
		Enyo: require('./enyo-samples'),
		Moonstone: request('./moonstone-samples'), //router blocking
		Layout: require('./layout-samples'),
		Spotlight: require('./spotlight-samples'),
		iLib: require('./enyo-ilib-samples'),
		Onyx: require('./onyx-samples'),
		Canvas: require('./canvas-samples'),
		Svg: require('./svg-samples')
	};

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
	List: List,
	History: History
};
