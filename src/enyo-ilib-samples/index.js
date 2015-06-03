// For simplicity, we'll require the full ilib since this is the root of the sample 'app'. The
// individual samples can then safely import the root enyo-ilib package knowing that the app
// registered which version it wanted.
// require('enyo-ilib/full');

var
	kind = require('enyo/kind');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		AddressFormatting	: require('./lib/AddressFormatting'),
		AddressParsing		: require('./lib/AddressParsing'),
		// AdvDateFormatting	: require('./lib/AdvDateFormatting'), //still has onyx timepicker
		// DateFormatting: require('./lib/DateFormatting'),
		LocaleInfo: require('./lib/LocaleInfo'),
		NameFormatting: require('./lib/NameFormatting'),
		NameParsing: require('./lib/NameParsing'),
		NumberFormatting: require('./lib/NumberFormatting')
	};

module.exports = kind({
	kind: SampleList,
	title: 'iLib Samples',
	libraryName: 'iLib',
	samples: samples
});
