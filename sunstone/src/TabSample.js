var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows');

var
	Tab = require('sunstone/Tab'),
	Button = require('sunstone/Button');

module.exports = kind({
	name: 'sun.sample.TabSample',
	kind: FittableRows,
	classes: 'enyo-fit',
	components: [
		{kind: Tab, name:'sampleTab', classes: 'enyo-unselectable enyo-fit', components: [
			{tabName: 'TAB111111111111', components: [
				{tag: 'br'},
				{content: 'First Item'},
				{kind: Button, content: 'Hello'}
			]},
			{tabName: 'TAB2', components: [
				{tag:'br'},
				{content: 'Second Item'},
				{kind: Button, content: 'Hello'}
			]},
			{tabName: 'TAB3', components: [
				{tag: 'br'},
				{content: 'Third Item'},
				{kind: Button, content: 'Hello'}
			]},
			{tabName: 'TAB4', components: [
				{tag:'br'},
				{content: 'Fourth Item'},
				{kind: Button, content: 'Hello'}
			]}
		]}
	]
});