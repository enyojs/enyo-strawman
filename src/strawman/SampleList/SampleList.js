var
	kind = require('enyo/kind'),
	platform = require('enyo/platform');

var
	Scroller = require('enyo/Scroller'),
	Link = require('../Link'),
	List = require('../List'),
	Title = require('../Title'),
	AppRouter = require('../AppRouter');

module.exports = kind({
	title: 'Samples',
	published: {
		sample: null,
		locale: 'local'
	},
	handlers: {
		onRouteChange: 'handleRoute'
	},
	components: [
		{name: 'router', kind: AppRouter}
	],
	listComponents: [
		{name: 'title', kind: Title},
		{name: 'back', kind: Link, classes: 'back-button', content: 'Back', href: '../index.html'},
		{name: 'list', kind: List}
	],
	create: function () {
		this.inherited(arguments);
		if (this.libraryName && this.version) { // only display version information for individual libraries that are versioned
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
				// For wearable, wrap samples in a scroller and add a back button
				// Garnet samples have their own scrollers/back buttons
				global.sample = this.createComponent({
					name:is,
					classes: 'enyo-fit strawman',
					style: 'background:white;',
					components: [
						{content: '<', classes: 'strawman-sample-back', ontap: 'goBack'},
						{kind:Scroller, style: 'width:100%; height:100%;', components:[
							{kind:this.samples[is], classes:'strawman-sample'}
						]}
					]
				});
			} else {
				global.sample = this.createComponent({name:is, kind: this.samples[is]});
			}
		} else {
			// We have no sample, just render out the list.
			this.addClass('strawman');
			this.createComponents(this.listComponents);
			this.binding({from: 'title',       to: '$.title.content'});
			this.binding({from: 'samples',     to: '$.list.samples'});
			this.binding({from: 'listType',    to: '$.list.listType'});
			this.binding({from: 'libraryName', to: '$.list.libraryName'});

			// Don't show back if we're at home.
			this.$.back.set('showing', !!this.libraryName);
		}
		this.render();
	},
	goBack: function() {
		global.history.go(-1);
		return false;
	}
});
