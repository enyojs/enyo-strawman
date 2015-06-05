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
	ActivityPanelsSample: require('./ActivityPanelsSample'),
	ActivityPanelsWithVideoSample: require('./ActivityPanelsWithVideoSample'),
	AlwaysViewingPanelsSample: require('./AlwaysViewingPanelsSample'),
	AlwaysViewingPanelsWithVideoSample: require('./AlwaysViewingPanelsWithVideoSample'),
	DynamicPanelsSample: require('./DynamicPanelsSample'),
	PanelsVideoPlayerSample: require('./PanelsVideoPlayerSample'),
	PanelsWithCardArrangerSample: require('./PanelsWithCardArrangerSample'),
	PanelsWithCarouselArrangerSample: require('./PanelsWithCarouselArrangerSample')
};

strawman.samples['MoonstoneExtra'] = newSampler;

module.exports = strawman;
