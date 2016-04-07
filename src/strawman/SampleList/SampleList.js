var
	kind = require('enyo/kind'),
	platform = require('enyo/platform');

var
	Link = require('../Link'),
	List = require('../List'),
	Title = require('../Title'),
	AppRouter = require('../AppRouter');

module.exports = kind({
	title: 'Samples',
	classes: 'strawman',
	published: {
		sample: null,
		locale: 'local'
	},
	handlers: {
		onRouteChange: 'handleRoute'
	},
	listComponents: [
		{name: 'title', kind: Title},
		{name: 'back', kind: Link, classes: 'back-button', content: 'Back', href: '../index.html'},
		{name: 'list', kind: List}
	],
	create: function () {
		this.inherited(arguments);
		this.createComponent({name: 'router', kind: AppRouter});
		if (this.libraryName && this.version) {
			// only display version information for individual libraries that are versioned
 			console.log('%c%s: %s', 'color:blue', this.libraryName, this.version);
 		}
 	},
 	handleRoute: function (sender, ev) {
		this.set('locale', ev.locale);
		this.set('sample', ev.sampleName);
	},
	sampleChanged: function (was, is) {
		if (was) {
			if(this.$[was]) { this.$[was].destroy(); }
		} else {
			if(this.$.title) { this.$.title.destroy(); }
			if(this.$.back) { this.$.back.destroy(); }
			if(this.$.list) { this.$.list.destroy(); }
		}
		if (is && this.samples[is]) {
			if(platform.webos && global.screen.width<=400 && this.libraryName!=='Garnet') {
				this.addClass('wearable-sample');
			}
			global.sample = this.createComponent({name:is, kind: this.samples[is], classes:'strawman-sample'});
		} else {
			// We have no sample, just render out the list.
			this.removeClass('wearable-sample');
			this.createComponents(this.listComponents);
			this.binding({from: 'title',       to: '$.title.content'});
			this.binding({from: 'samples',     to: '$.list.samples'});
			this.binding({from: 'listType',    to: '$.list.listType'});
			this.binding({from: 'libraryName', to: '$.list.libraryName'});

			// Don't show back if we're at home.
			this.$.back.set('showing', !!this.libraryName);
		}
		this.render();
	}
});
