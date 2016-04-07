require('spotlight');

var
	kind = require('enyo/kind'),
	platform = require('enyo/platform');

var
	SampleList = require('./strawman/SampleList');

var
	samples = window.strawmanConfig || require('./strawman/default-config');

if(samples['enyo-webos'] && !platform.webos) {
	delete samples['enyo-webos'];
}

var
	List = kind({
		kind: SampleList,
		title: 'Enyo Strawman - Samples Gallery',
		classes: 'home',
		listType: 'grid',
		samples: samples,
		components: [{
			classes: 'warning',
			content: 'Moonstone samples were meant to be rendered at TV resolutions. The samples may not render correctly at lower resolutions.'
		}]
	});

module.exports = {
	samples: samples,
	List: List
};
