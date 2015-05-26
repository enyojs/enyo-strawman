var
	ready = require('enyo/ready');

var
	Strawman = require('./src/Strawman');

var samples = {
	'Enyo': request('./src/enyo-samples'),
	'Layout': request('./src/layout-samples'),
	'Onyx': request('./src/onyx-samples'),
	'Moonstone': request('./src/moonstone-samples'),
	'Spotlight': request('./src/spotlight-samples'),
	'iLib': request('./src/enyo-ilib-samples'),
	'Canvas': request('./src/canvas-samples'),
	'Svg': request('./src/svg-samples')
};

ready(function () {
	global.Strawman = new Strawman({samples: samples});
});
