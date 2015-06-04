var
	kind = require('enyo/kind');

var
	Anchor = require('enyo/Anchor'),
	List = require('../List'),
	Title = require('../Title');

module.exports = kind({
	title: 'Samples',
	classes: 'strawman',
	listComponents: [
		{name: 'title', kind: Title},
		{name: 'back', kind: Anchor, classes: 'back-button', content: 'Back', href: './'},
		{name: 'list', kind: List}
	],
	_libList: false,
	create: function () {
		this.inherited(arguments);

		var names = window.document.location.search.substring(1).split('&'),
			name = names[1] || names[0];

		// Set whether we're looking at a list of libraries or the root
		this._libList = !name;
		// debugger;

		if (this.samples[name]) {
			this.createComponent({kind: this.samples[name]});
		} else {
			this.createComponents(this.listComponents);
			this.binding({from: 'title',       to: '$.title.content'});
			this.binding({from: 'samples',     to: '$.list.samples'});
			this.binding({from: 'listType',    to: '$.list.listType'});
			this.binding({from: 'libraryName', to: '$.list.libraryName'});

			// Don't show back if we're at home.
			this.$.back.set('showing', !this._libList);
			// console.log("SampleList:", c, this);
			// debugger;
		}
	}
});