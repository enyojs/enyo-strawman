var
	kind = require('enyo/kind');

var
	Router = require('enyo/Router');

module.exports = kind({
	kind: Router,
	history: true,
	triggerOnStart: true,
	routes: [
		{path: ':base/:sample', handler: 'goSample'},
		{path: ':base', handler: 'goSampler'}
	]
});

// var appRouter = kind({
// 	kind: Router,
// 	history: true,
// 	routes: [
// 		{path: ':sampleName/:locale', handler: 'handleRoute'},
// 		{path: ':sampleName', handler: 'handleRoute'},
// 		{path: '/:locale', handler: 'handleRouteLocaleOnly'}
// 	],
// 	events: {
// 		onRouteChange: ''
// 	},
// 	handleRoute: function (sampleName, locale) {
// 		this.doRouteChange({sampleName: sampleName, locale: locale || 'local'});
// 	},
// 	handleRouteLocaleOnly: function (locale) {
// 		this.handleRoute({sampleName: null, locale: locale});
// 	}
// });