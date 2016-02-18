require('spotlight');

var
	kind = require('enyo/kind'),
	platform = require('enyo/platform');

var
	SampleList = require('./strawman/SampleList');

var
	samples = {
		Enyo: request('./enyo-samples'),
		Moonstone: request('./moonstone-samples'), //router blocking
		Layout: request('./layout-samples'),
		Spotlight: request('./spotlight-samples'),
		iLib: request('./enyo-ilib-samples'),
		Onyx: request('./onyx-samples'),
		Canvas: request('./canvas-samples'),
		Svg: request('./svg-samples')
	},
	webOS = request('./enyo-webos-samples');

if (platform.webos) {
	require('enyo-webos');
	samples.webOS = webOS;
}

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
	List: List
};
