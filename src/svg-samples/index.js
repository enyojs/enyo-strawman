var
	kind = require('enyo/kind');

var
	List = require('../List');

var
	samples = {
		Basic: request('./lib/BasicSample'),
//		CanvasPrimitives: require('./lib/CanvasPrimitivesSample')
	};

module.exports = kind({
	baseHref: 'Svg',
	kind: List,
	classes: 'enyo-fit',
	samples: Object.keys(samples),
	sampleChanged: function () {
		this.log(this.sample);
		
		var app = this.app;
		samples[this.sample].then(function (Sample) {
			app.setupView(Sample, function () { app.reRender(); });
		});
	}
});