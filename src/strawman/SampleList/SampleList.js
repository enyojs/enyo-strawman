var
	kind = require('enyo/kind');

var
	Link = require('../Link'),
	List = require('../List'),
	Title = require('../Title');

module.exports = kind({
	title: 'Samples',
	listComponents: [
		{name: 'title', kind: Title},
		{name: 'back', kind: Link, classes: 'back-button', content: 'Back', href: 'index.html'},
		{name: 'list', kind: List}
	],
	_libList: false,
	create: function () {
		this.inherited(arguments);

		var names = window.document.location.search.substring(1).split('&'),
			name = names[1] || names[0];

		// Set whether we're looking at a list of libraries or the root
		this._libList = !name;

		if (this.samples[name]) {
			global.sample = this.createComponent({kind: this.samples[name]});
		} else {
			name = null; // not a valid sample name

			this.addClass('strawman');
			this.createComponents(this.listComponents);
			this.binding({from: 'title',       to: '$.title.content'});
			this.binding({from: 'samples',     to: '$.list.samples'});
			this.binding({from: 'listType',    to: '$.list.listType'});
			this.binding({from: 'libraryName', to: '$.list.libraryName'});

			// Don't show back if we're at home.
			this.$.back.set('showing', !this._libList);
		}

		if (!this._libList && this.version) { // only display version information for individual libraries that are versioned
			console.log('%c%s%s: %s', 'color:blue', (name ? name + ' - ' : ''), this.libraryName, this.version);
		}
	},
	ownerChanged: function () {
		var className = 'strawman';
		// move the "strawman" class to our new owner
		if (this.hasClass(className)) {
			this.removeClass(className);
			this.owner.addClass(className);
		}
	}
});
