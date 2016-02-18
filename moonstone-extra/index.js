require('enyo/options').accessibility = true;

var
	ready = require('enyo/ready'),
	kind = require('enyo/kind'),
	platform = require('enyo/platform');

var
	strawman = require('../src');

require('../src/moonstone-samples');	// Included for its assets and CSS

var
	samples = {
		Enyo: require('../src/enyo-samples'),
		Moonstone: require('./src'), //router blocking
		Layout: require('../src/layout-samples'),
		Spotlight: require('../src/spotlight-samples'),
		iLib: require('../src/enyo-ilib-samples'),
		Onyx: require('../src/onyx-samples'),
		Canvas: require('../src/canvas-samples'),
		Svg: require('../src/svg-samples')
	},
	webOS = require('../src/enyo-webos-samples');

if (platform.webos) {
	samples.webOS = webOS;
}

var
	List = kind({
		kind: strawman.List,
		samples: samples
	});

ready(function () {
	var names = window.document.location.search.substring(1).split('&'),
		name = names[0],
		Sample = samples[name] || List;

	new Sample().renderInto(document.body);
});

module.exports = {
	samples: samples,
	List: List
};
