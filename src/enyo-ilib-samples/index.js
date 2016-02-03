// For simplicity, we'll require the full ilib since this is the root of the sample 'app'. The
// individual samples can then safely import the root enyo-ilib package knowing that the app
// registered which version it wanted.
// require('enyo-ilib/full');

var
	kind = require('enyo/kind'),
	enyo_ilib = require('enyo-ilib');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		AddressFormatting	: require('./src/AddressFormatting'),
		AddressParsing		: require('./src/AddressParsing'),
		// AdvDateFormatting	: require('./src/AdvDateFormatting'), //still has onyx timepicker
		// DateFormatting: require('./src/DateFormatting'),
		LocaleInfo: require('./src/LocaleInfo'),
		NameFormatting: require('./src/NameFormatting'),
		NameParsing: require('./src/NameParsing'),
		NumberFormatting: require('./src/NumberFormatting')
	};

module.exports = kind({
	kind: SampleList,
	title: 'iLib Samples',
	version: enyo_ilib.enyo.version,
	libraryName: 'iLib',
	samples: samples
});
