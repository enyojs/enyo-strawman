var
	kind = require('enyo/kind'),
	Anchor = require('enyo/Anchor');

module.exports = kind({
	name: 'Link',
	kind: Anchor,
	classes: 'link',
	spotlight: true,
	handlers: {
		ontap: 'handleLink'
	},
	handleLink: function (sender, ev) {
		var link = this.get('href') || ev.originator.get('href') || ev.originator.parent.get('href');
		if (link) {
			window.location.href = link;
		}
	}
});
