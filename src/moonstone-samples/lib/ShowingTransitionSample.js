var
	kind = require('enyo/kind'),
	Image = require('enyo/Image');

var
	Scroller = require('moonstone/Scroller'),
	Divider = require('moonstone/Divider'),
	Button = require('moonstone/Button'),
	ShowingTransitionSupport = require('moonstone/ShowingTransitionSupport');

var Pane = kind({
	name: 'Pane',
	classes: 'pane',
	showingDuration: 1000,
	hidingDuration: 500,
	mixins: [ ShowingTransitionSupport ],
	components: [
		{name: 'client', classes: 'glass moon-neutral moon-3v moon-5h'}
	]
});

var PopupMockup = kind({
	name: 'PopupMockup',
	classes: 'popup-mockup moon-neutral',
	showingDuration: 500,
	hidingDuration: 500,
	showing: false,
	showingClass: 'shown',
	shownClass: 'shown',
	mixins: [ ShowingTransitionSupport ]
});

module.exports = kind({
	name: 'moon.sample.ShowingTransitionSample',
	classes: 'moon enyo-unselectable enyo-fit showing-transition-sample',
	components: [
		{kind: Scroller, classes: 'enyo-fill', components: [
			{kind: Divider, content: 'Showing Transitions'},
			{kind: Button, content: 'Toggle Pane', ontap: 'togglePane'},
			{kind: Button, content: 'Toggle Popup', ontap: 'togglePopup'},
			{classes: 'moon-1v'},
			{components: [
				{name: 'pane', kind: Pane, components: [{content: 'This looks like a card'}]}
			]}
		]},
		{name: 'popup', kind: PopupMockup, components: [
			{content: 'Commense the jiggling!'},
			{kind: Image, src: 'http://static.fjcdn.com/gifs/Shake+it_945873_5126044.gif'}
		]}
	],
	togglePane: function (sender, ev) {
		this.$.pane.set('showing', !this.$.pane.get('showing'));
	},
	togglePopup: function (sender, ev) {
		this.$.popup.set('showing', !this.$.popup.get('showing'));
	}
});
