var
	kind = require('enyo/kind');
	
var	
	List = require('../List');

var
	samples = {
		Container			: request('./lib/ContainerSample'),
		Disappear			: request('./lib/DisappearSample'),
		Hold				: request('./lib/HoldSample'),
		Sandbox				: request('./lib/SpotlightSandboxSample'),
		TestPage			: request('./lib/TestPage')
	};

module.exports = kind({
	baseHref: 'Spotlight',
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