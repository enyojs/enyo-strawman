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
	AudioPlaybackSample                  : require('./AudioPlaybackSample'),
	AudioPlaybackPlaylistSupportSample   : require('./AudioPlaybackPlaylistSupportSample'),
	ActivityPanelsSample                 : require('./ActivityPanelsSample'),
	ActivityPanelsWithVideoSample        : require('./ActivityPanelsWithVideoSample'),
	AlwaysViewingPanelsSample            : require('./AlwaysViewingPanelsSample'),
	AlwaysViewingPanelsWithVideoSample   : require('./AlwaysViewingPanelsWithVideoSample'),
	DrawerSample                         : require('./DrawerSample'),
	DynamicPanelsSample                  : require('./DynamicPanelsSample'),
	PanelsVideoPlayerSample              : require('./PanelsVideoPlayerSample'),
	PanelsWithCardArrangerSample         : require('./PanelsWithCardArrangerSample'),
	PanelsWithCarouselArrangerSample     : require('./PanelsWithCarouselArrangerSample'),
	VideoPlayerInlineSample              : require('./VideoPlayerInlineSample'),
	VideoPlayerSample                    : require('./VideoPlayerSample')
};

strawman.samples['MoonstoneExtra'] = newSampler;

module.exports = strawman;
