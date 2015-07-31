/*
 * LinkSupport
 *
 * Add automatic on-tap support for controls with a href attribute
 */

module.exports = {
	name: 'LinkSupport',
	tap: function (sender, ev) {
		this.inherited(arguments);
		var link = this.get('href') || ev.originator.get('href') || ev.originator.parent.get('href');
		if (link) {
			window.location.href = link;
		}
	}
};
