var
	kind = require('enyo/kind');

var
	List = require('layout/List'),
	NameGenerator = require('./NameGenerator');

module.exports = kind({
	name: 'enyo.sample.ListNoSelectSample',
	classes: 'list-sample enyo-fit',
	components: [
		{name: 'list', kind: List, count: 20000, noSelect: true, multiSelect: false, classes: 'enyo-fit list-sample-list',
			onSetupItem: 'setupItem', components: [
			{name: 'item', classes: 'list-sample-item enyo-border-box', components: [
				{name: 'index', classes: 'list-sample-index'},
				{name: 'name'}
			]}
		]}
	],
	NameGenerator: [],
	setupItem: function (sender, ev) {
		// this is the row we're setting up
		var i = ev.index;
		// make some mock data if we have none for this row
		if (!this.NameGenerator[i]) {
			this.NameGenerator[i] = NameGenerator.makeName(5, 10, '', '');
		}
		var n = this.NameGenerator[i];
		var ni = ('00000000' + i).slice(-7);
		this.$.name.setContent(n);
		this.$.index.setContent(ni);
		return true;
	}
});
