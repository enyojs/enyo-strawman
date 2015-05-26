// For simplicity, we'll require the full ilib since this is the root of the sample 'app'. The
// individual samples can then safely import the root enyo-ilib package knowing that the app
// registered which version it wanted.
// require('enyo-ilib/full');

var
	kind = require('enyo/kind');

var
	List = require('../List');

var
	samples = {
		AddressFormatting	: request('./lib/AddressFormatting'),
		AddressParsing		: request('./lib/AddressParsing'),
		// AdvDateFormatting	: request('./lib/AdvDateFormatting'), //still has onyx timepicker
		// DateFormatting: request('./lib/DateFormatting'),
		LocaleInfo: request('./lib/LocaleInfo'),
		NameFormatting: request('./lib/NameFormatting'),
		NameParsing: request('./lib/NameParsing'),
		NumberFormatting: request('./lib/NumberFormatting')
	};

module.exports = kind({
	baseHref: 'iLib',
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