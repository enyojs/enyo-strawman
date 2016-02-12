/*
 * A collection of Strawman utilities
 */

var
	Scroller = require('enyo/Scroller');

module.exports = {
	renderSample: function (Sample) {
		var sample = new Sample(),
			container;

		if (sample.useScroller) {
			container = new Scroller();
			container.addChild(sample);
			sample.set('owner', container);
		}
		(container || sample).renderInto(document.body);
	}
};