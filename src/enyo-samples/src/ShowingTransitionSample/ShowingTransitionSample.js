var
	kind = require('enyo/kind'),
	Img = require('enyo/Image');

var
	Scroller = require('enyo/Scroller'),
	Button = require('enyo/Button'),
	ShowingTransitionSupport = require('enyo/ShowingTransitionSupport');

var Pane = kind({
	name: 'Pane',
	classes: 'pane',
	showingDuration: 1000,
	hidingDuration: 500,
	mixins: [ ShowingTransitionSupport ],
	components: [
		{name: 'client', classes: 'glass'}
	]
});

var PopupMockup = kind({
	name: 'PopupMockup',
	classes: 'popup-mockup',
	showingDuration: 500,
	hidingDuration: 500,
	showing: false,
	showingClass: 'shown',
	shownClass: 'shown',
	mixins: [ ShowingTransitionSupport ]
});

module.exports = kind({
	name: 'enyo.sample.ShowingTransitionSample',
	classes: 'enyo-unselectable enyo-fit showing-transition-sample',
	components: [
		{kind: Scroller, classes: 'enyo-fill', components: [
			{tag: 'h1', content: 'Showing Transitions'},
			{components: [
				{kind: Button, content: 'Toggle Pane', ontap: 'togglePane'},
				{kind: Button, content: 'Toggle Popup', ontap: 'togglePopup'}
			]},
			{components: [
				{name: 'pane', kind: Pane, components: [{content: 'This card has different out and in transitions.'}]}
			]}
		]},
		{name: 'popup', kind: PopupMockup, components: [
			{tag: 'h1', content: 'Commense the jiggling!'},
			{kind: Img, src: 'http://static.fjcdn.com/gifs/Shake+it_945873_5126044.gif'}
		]}
	],
	togglePane: function (sender, ev) {
		this.$.pane.set('showing', !this.$.pane.get('showing'));
	},
	togglePopup: function (sender, ev) {
		this.$.popup.set('showing', !this.$.popup.get('showing'));
	}
});

module.exports.badgeClasses = 'new wip';
